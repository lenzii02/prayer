const fs = require('fs');
const path = require('path');
const playwright = require('playwright');

const MANIFEST = path.resolve(__dirname, '..', 'images', 'manifest.md');
const IMAGES_DIR = path.resolve(__dirname, '..', 'images');

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function extractFileNamesFromManifest(text) {
  const filePageRegex = /https:\/\/commons\.wikimedia\.org\/wiki\/File:([^\s)]+)/g;
  const uploadRegex = /https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/[^\s)]+/g;
  const names = new Set();
  let m;
  while ((m = filePageRegex.exec(text)) !== null) {
    try { names.add(decodeURIComponent(m[1])); } catch(e) { names.add(m[1]); }
  }
  const uploads = text.match(uploadRegex) || [];
  for (const u of uploads) {
    try {
      const b = decodeURIComponent(path.basename(new URL(u).pathname));
      names.add(b);
    } catch (e) { /* ignore */ }
  }
  return Array.from(names);
}

async function fetchImageInfo(apiCtx, fileName) {
  const title = 'File:' + fileName;
  const params = new URLSearchParams({
    action: 'query',
    format: 'json',
    formatversion: '2',
    titles: title,
    prop: 'imageinfo',
    iiprop: 'url',
    iiurlwidth: '1200'
  });
  const url = `https://commons.wikimedia.org/w/api.php?${params.toString()}`;
  const res = await apiCtx.get(url, { timeout: 30000 });
  if (res.status() !== 200) throw new Error('API HTTP ' + res.status());
  const json = await res.json();
  if (json && json.query && json.query.pages && json.query.pages.length) {
    const page = json.query.pages[0];
    if (page.missing) return null;
    const ii = (page.imageinfo && page.imageinfo[0]) || null;
    return ii || null;
  }
  return null;
}

(async () => {
  if (!fs.existsSync(MANIFEST)) {
    console.error('Manifest not found at', MANIFEST);
    process.exit(1);
  }
  const manifest = fs.readFileSync(MANIFEST, 'utf8');
  const names = extractFileNamesFromManifest(manifest);
  if (names.length === 0) {
    console.error('No filenames found in manifest.');
    process.exit(1);
  }

  if (!fs.existsSync(IMAGES_DIR)) fs.mkdirSync(IMAGES_DIR, { recursive: true });

  const requestCtx = await playwright.request.newContext({
    extraHTTPHeaders: {
      'User-Agent': 'PrayerAppThumbnailFetcher/1.0',
      Referer: 'https://commons.wikimedia.org/'
    }
  });

  console.log(`Found ${names.length} files in manifest; requesting thumbnails via MediaWiki API.`);

  let saved = 0;
  const failed = [];

  for (let i = 0; i < names.length; i++) {
    const name = names[i];
    const prefix = String(i+1).padStart(2,'0');
    try {
      console.log(`[${i+1}/${names.length}] Querying API for File:${name}`);
      const info = await fetchImageInfo(requestCtx, name);
      if (!info) {
        console.warn('  No imageinfo for', name);
        failed.push({name, reason: 'no imageinfo'});
        await sleep(1000);
        continue;
      }
      const thumb = info.thumburl || info.url;
      if (!thumb) {
        console.warn('  No thumb/url for', name);
        failed.push({name, reason: 'no thumb/url'});
        continue;
      }
      const outName = `${prefix}_${name}`;
      const outPath = path.join(IMAGES_DIR, outName);
      console.log('  Downloading thumbnail:', thumb);
      // retry download
      let ok = false;
      for (let attempt=1; attempt<=5 && !ok; attempt++) {
        try {
          const r = await requestCtx.get(thumb, { timeout: 30000 });
          if (r.status() === 200) {
            const b = await r.body();
            fs.writeFileSync(outPath, b);
            console.log(`  Saved ${outPath} (${b.length} bytes)`);
            saved++;
            ok = true;
            break;
          } else if (r.status() === 429) {
            const wait = 5000 * attempt + Math.floor(Math.random()*3000);
            console.warn(`  429 rate-limited; waiting ${wait}ms (attempt ${attempt})`);
            await sleep(wait);
          } else {
            console.warn(`  HTTP ${r.status()} downloading thumbnail`);
            await sleep(2000*attempt);
          }
        } catch (err) {
          console.warn('  Download error:', err.message || err);
          await sleep(2000*attempt);
        }
      }
      if (!ok) {
        failed.push({name, reason: 'download failed'});
      }
      // polite pause
      await sleep(800 + Math.floor(Math.random()*1200));
    } catch (err) {
      console.error('Error processing', name, err.message || err);
      failed.push({name, reason: err.message});
    }
  }

  await requestCtx.dispose();

  console.log('\nSummary:');
  console.log('  Saved thumbnails:', saved);
  console.log('  Failed items:', failed.length);
  if (failed.length) {
    const failFile = path.join(IMAGES_DIR, 'failed_thumbs.md');
    fs.writeFileSync(failFile, failed.map(f=>`- ${f.name} — ${f.reason}`).join('\n'));
    console.log('  Fail list saved to', failFile);
  }

  process.exit(0);
})();
