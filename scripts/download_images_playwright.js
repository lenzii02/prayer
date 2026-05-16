const fs = require('fs');
const path = require('path');
const playwright = require('playwright');

const MAX_RETRIES = 6;
const BASE_DELAY_MS = 8000; // base delay between attempts

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function extractBasenameFromUploadUrl(u) {
  try {
    const urlObj = new URL(u);
    return path.basename(urlObj.pathname);
  } catch (e) {
    return null;
  }
}

(async () => {
  try {
    const repoRoot = path.resolve(__dirname, '..');
    const manifestPath = path.join(repoRoot, 'images', 'manifest.md');
    const imagesDir = path.join(repoRoot, 'images');
    if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, { recursive: true });

    if (!fs.existsSync(manifestPath)) {
      console.error('Manifest not found at', manifestPath);
      process.exit(1);
    }

    const manifest = fs.readFileSync(manifestPath, 'utf8');

    // gather commons file pages and upload URLs
    const filePageRegex = /https:\/\/commons\.wikimedia\.org\/wiki\/File:[^\s)]+/g;
    const uploadRegex = /https:\/\/upload\.wikimedia\.org\/[^\s)]+/g;
    const filePagesFound = manifest.match(filePageRegex) || [];
    const uploadUrlsFound = manifest.match(uploadRegex) || [];

    // create a preferred list of filePage URLs; if only upload url exists, convert to file page
    const filePageSet = new Set(filePagesFound.map((s) => s.trim()));
    for (const u of uploadUrlsFound) {
      const name = extractBasenameFromUploadUrl(u);
      if (!name) continue;
      const candidate = 'https://commons.wikimedia.org/wiki/File:' + encodeURIComponent(name);
      if (!filePageSet.has(candidate)) filePageSet.add(candidate);
    }

    const filePages = Array.from(filePageSet);
    if (filePages.length === 0) {
      console.error('No Commons file pages or upload URLs found in manifest.');
      process.exit(1);
    }

    console.log(`Found ${filePages.length} Commons file pages to process.`);

    const headless = process.env.HEADLESS !== 'false';
    const browser = await playwright.chromium.launch({
      headless: headless,
      args: ['--no-sandbox', '--disable-blink-features=AutomationControlled']
    });
    const context = await browser.newContext({
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) PrayerAppImageFetcher/1.0',
      viewport: { width: 1200, height: 800 }
    });
    const page = await context.newPage();

    const failed = [];
    let saved = 0;

    for (let i = 0; i < filePages.length; i++) {
      const filePage = filePages[i];
      const prefix = String(i + 1).padStart(2, '0');

      console.log(`\n[${i + 1}/${filePages.length}] Visiting file page: ${filePage}`);

      let attempt = 0;
      let success = false;

      while (attempt < MAX_RETRIES && !success) {
        attempt++;
        try {
          await page.goto(filePage, { waitUntil: 'networkidle', timeout: 60000 });

          // try to find the original file link
          const selectors = ['.fullImageLink a', 'a[href^="https://upload.wikimedia.org"]'];
          let href = null;
          for (const sel of selectors) {
            try {
              const el = await page.$(sel);
              if (el) {
                href = await el.getAttribute('href');
                if (href) break;
              }
            } catch (e) {
              // ignore
            }
          }

          if (!href) {
            console.warn(`Original file link not found on page (${filePage}). Marking failed.`);
            break;
          }

          // normalize href
          if (href.startsWith('//')) href = 'https:' + href;
          if (!href.startsWith('http')) href = 'https://commons.wikimedia.org' + href;

          console.log(`Found original file URL: ${href}`);

          // try downloading via the browser context request (keeps cookies/headers)
          try {
            const r = await context.request.get(href, { timeout: 60000 });
            const status = r.status();
            if (status === 200) {
              const buffer = await r.body();
              const basename = path.basename(new URL(href).pathname);
              const outName = `${prefix}_${basename}`;
              const outPath = path.join(imagesDir, outName);
              fs.writeFileSync(outPath, buffer);
              console.log(`Saved ${outPath} (${buffer.length} bytes) via context.request`);
              saved++;
              success = true;
              const pause = BASE_DELAY_MS + Math.floor(Math.random() * 5000);
              console.log(`Sleeping ${pause}ms before next download.`);
              await sleep(pause);
              try { await page.goto(filePage, { waitUntil: 'networkidle', timeout: 10000 }); } catch (e) { /* ignore */ }
              break;
            } else if (status === 429) {
              const backoff = BASE_DELAY_MS * attempt + Math.floor(Math.random() * 10000);
              console.warn(`HTTP 429 received from context.request. Backing off ${backoff}ms (attempt ${attempt}/${MAX_RETRIES}).`);
              await sleep(backoff);
              continue;
            } else {
              console.warn(`context.request returned HTTP ${status} for ${href}. Attempt ${attempt}/${MAX_RETRIES}.`);
              const backoff = BASE_DELAY_MS * attempt;
              await sleep(backoff);
              continue;
            }
          } catch (reqErr) {
            console.warn('context.request failed, falling back to page fetch:', reqErr && reqErr.message ? reqErr.message : reqErr);
            try {
              // navigate to the file URL and fetch via page.evaluate to avoid inspector cache eviction
              await page.goto(href, { waitUntil: 'domcontentloaded', timeout: 60000 });
              const arrayBuffer = await page.evaluate((u) => fetch(u).then(r => {
                if (!r.ok) throw new Error('Fetch failed: ' + r.status);
                return r.arrayBuffer();
              }), href);
              const buffer = Buffer.from(arrayBuffer);
              const basename = path.basename(new URL(href).pathname);
              const outName = `${prefix}_${basename}`;
              const outPath = path.join(imagesDir, outName);
              fs.writeFileSync(outPath, buffer);
              console.log(`Saved ${outPath} (${buffer.length} bytes) via page.fetch`);
              saved++;
              success = true;
              const pause = BASE_DELAY_MS + Math.floor(Math.random() * 5000);
              console.log(`Sleeping ${pause}ms before next download.`);
              await sleep(pause);
              try { await page.goto(filePage, { waitUntil: 'networkidle', timeout: 10000 }); } catch (e) { /* ignore */ }
              break;
            } catch (pageErr) {
              console.warn(`page fetch failed: ${pageErr && pageErr.message ? pageErr.message : pageErr}`);
              const backoff = BASE_DELAY_MS * attempt + Math.floor(Math.random() * 5000);
              await sleep(backoff);
              continue;
            }
          }
        } catch (err) {
          console.error(`Error on attempt ${attempt} for ${filePage}:`, err.message || err);
          const backoff = BASE_DELAY_MS * attempt + Math.floor(Math.random() * 5000);
          await sleep(backoff);
        }
      }

      if (!success) {
        failed.push(filePage);
        console.warn(`Failed to download from ${filePage} after ${attempt} attempts.`);
        // extra long pause before continuing to reduce chance of site-wide blocks
        await sleep(15000);
      }
    }

    await browser.close();
    console.log(`\nDone. Saved ${saved} files. ${failed.length} failed.`);
    if (failed.length) {
      fs.writeFileSync(path.join(repoRoot, 'images', 'failed_downloads.txt'), failed.join('\n'));
      console.log('Failed list written to images/failed_downloads.txt');
    }
  } catch (err) {
    console.error('Fatal error:', err);
    process.exit(1);
  }
})();
