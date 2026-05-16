/**
 * download_icons_browser.js
 * ---------------------------------------------------
 * Download ikon Yesus menggunakan Playwright BROWSER NYATA
 * (bukan HTTP request) — strategy ini jauh lebih susah diblokir
 * karena server melihat browser asli (Chromium).
 *
 * Strategy:
 * 1. Launch Chromium headless
 * 2. Navigate ke setiap URL gambar langsung
 * 3. Capture response body via page.on('response') atau evaluate blob
 * 4. Delay manusiawi antar gambar (8-15 detik)
 * 5. Jika URL file langsung gagal, fallback ke halaman Commons
 *    lalu download dari link "Original file"
 * ---------------------------------------------------
 */

const fs   = require('fs');
const path = require('path');
const { chromium } = require('playwright');

// ============================================================
// DAFTAR GAMBAR TERORGANISIR (Kelahiran → Kebangkitan)
// ============================================================
const IMAGE_LIST = [
  // ── KELAHIRAN & AWAL ──────────────────────────────────────
  { event: '01_Annunciation', name: 'Annunciation_Gladzor.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/The_Annunciation%2C_Gladzor.jpg' },
  { event: '01_Annunciation', name: 'Annunciation_Fra_Angelico.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Fra_Angelico_-_The_Annunciation_%28Cortona%29_-_WGA00594.jpg' },
  { event: '02_Nativity',    name: 'Nativity_Langadas.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/031_Nativity_of_Jesus_Icon_from_Saint_Paraskevi_Church_in_Langadas.jpg' },
  { event: '02_Nativity',    name: 'Nativity_Theophanes.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/b/b7/Theoph_greek_nativity.jpg' },
  { event: '02_Nativity',    name: 'Nativity_Duccio.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Duccio_di_Buoninsegna_-_Nativity_with_the_Prophets_Isaiah_and_Ezekiel_-_Google_Art_Project.jpg' },
  { event: '03_Adoration',   name: 'Adoration_Magi_Gentile.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/6/6d/Gentile_da_Fabriano_-_Adoration_of_the_Magi_-_Uffizi.jpg' },
  { event: '04_Presentation',name: 'Presentation_Temple_Mantegna.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/Mantegna%2C_Presentazione_al_Tempio.jpg' },
  { event: '05_Flight_Egypt',name: 'Flight_Egypt_Giotto.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Giotto_-_Scrovegni_-_-20-_-_Flight_into_Egypt.jpg' },

  // ── PELAYANAN ─────────────────────────────────────────────
  { event: '06_Baptism',     name: 'Baptism_Agios_Vasileios.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/15_Baptism_of_Christ_Icon_in_Assumption_of_Mary_Church_in_Agios_Vasileios.jpg' },
  { event: '06_Baptism',     name: 'Baptism_Theophanes.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Theophanes_the_Greek._Baptism.jpg' },
  { event: '06_Baptism',     name: 'Baptism_Piero_Francesca.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/4/46/Piero_della_Francesca_-_Battesimo_di_Cristo.jpg' },
  { event: '07_Sermon_Mount',name: 'Sermon_Mount_Bloch.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/35/Bloch-SermonOnTheMount.jpg' },
  { event: '08_Transfiguration', name: 'Transfiguration_Rublev.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Icon_of_a_follower_of_A._Rublev._1425._State_Tretyakov_Gallery%2C_Moscow._Transfiguration.jpg' },
  { event: '08_Transfiguration', name: 'Transfiguration_Theophanes.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Theophanes_the_Greek._The_Transfiguration.jpg' },
  { event: '08_Transfiguration', name: 'Transfiguration_Raphael.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/57/Transfiguration_Raphael.jpg' },
  { event: '09_Lazarus',     name: 'Raising_Lazarus_Rembrandt.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Rembrandt_Harmensz._van_Rijn_-_The_Raising_of_Lazarus_-_Google_Art_Project.jpg' },

  // ── PEKAN SUCI ─────────────────────────────────────────────
  { event: '10_Palm_Sunday', name: 'Palm_Sunday_Lebanon.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Palm_Sunday_icon_%28Lebanon%29.jpg' },
  { event: '10_Palm_Sunday', name: 'Palm_Sunday_Entry_Giotto.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/90/Giotto_-_Scrovegni_-_-26-_-_Entry_into_Jerusalem.jpg' },
  { event: '11_Last_Supper', name: 'Last_Supper_Icon.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/0/03/Icon_last_supper.jpg' },
  { event: '11_Last_Supper', name: 'Last_Supper_DaVinci.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/%22The_Last_Supper%22_by_Leonardo_da_Vinci.jpg' },
  { event: '12_Gethsemane', name: 'Gethsemane_Mantegna.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/80/Andrea_Mantegna%2C_Agony_in_the_Garden.jpg' },
  { event: '12_Gethsemane', name: 'Gethsemane_El_Greco.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/El_Greco_Agony_in_the_Garden_of_Gethsemani.jpg' },
  { event: '13_Crucifixion', name: 'Crucifixion_Sinai.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/a/af/Crucifixion_Icon_Sinai_13th_century.jpg' },
  { event: '13_Crucifixion', name: 'Crucifixion_Cimabue.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Cimabue%2C_crucifix%2C_santa_croce.jpg' },
  { event: '13_Crucifixion', name: 'Crucifixion_Velazquez.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Vel%C3%A1zquez_-_Cristo_Crucificado_%28Museo_del_Prado%2C_1632%29.jpg' },
  { event: '13_Crucifixion', name: 'Crucifixion_Coptic.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Coptic_Crucifixion_Icon.jpg' },
  { event: '14_Deposition',  name: 'Deposition_Rogier.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Weyden_Deposition.jpg' },
  { event: '14_Deposition',  name: 'Pieta_Michelangelo.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/1/1f/Michelangelo%27s_Pieta_5450_cut_out_black.jpg' },
  { event: '15_Entombment',  name: 'Entombment_Caravaggio.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/52/The_Entombment_of_Christ_by_Caravaggio.jpg' },

  // ── KEBANGKITAN ────────────────────────────────────────────
  { event: '16_Resurrection', name: 'Anastasis_Dionysius_Fourna.png',
    url: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Anastasis_Dionysius_of_Fourna.png' },
  { event: '16_Resurrection', name: 'Resurrection_Coptic.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Resurrection_of_Jesus_%28coptic_icon%29.jpg' },
  { event: '16_Resurrection', name: 'Resurrection_Piero_Francesca.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/6/63/Piero_della_Francesca_-_Resurrection_-_WGA17620.jpg' },
  { event: '17_Appearances',  name: 'Emmaus_Caravaggio.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Caravaggio_-_The_Supper_at_Emmaus.jpg' },
  { event: '17_Appearances',  name: 'Noli_Me_Tangere_Fra_Angelico.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Fra_Angelico_-_Noli_me_Tangere.jpg' },
  { event: '18_Ascension',    name: 'Ascension_Mantegna.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Andrea_Mantegna_-_The_Ascension.jpg' },

  // ── IKON KRISTUS UMUM ─────────────────────────────────────
  { event: '00_Christ_Icons', name: 'Christ_Pantocrator_Sinai_6thC.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/92/ICONS%2C_Sinai%2C_Christ_Pantocrator%2C_6th_century.jpg' },
  { event: '00_Christ_Icons', name: 'Christ_Syriac_Orthodox.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Syriac_Orthodox_icon_of_Jesus_Christ%2C_St._Peter%2C_and_St._Paul.jpg' },
  { event: '00_Christ_Icons', name: 'Christ_Syriac_Miniature.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/90/Syriac_miniature_of_Christ.jpg' },
  { event: '00_Christ_Icons', name: 'Sacred_Heart_Moroder.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/55/Sacred_Heart_of_Jesus_Christ_by_Ludwig_Moroder_Urtij%C3%ABi.jpg' },
  { event: '00_Christ_Icons', name: 'Christ_Coptic.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/80/Jesu_christ%28coptic%29.jpg' },
  { event: '00_Christ_Icons', name: 'Christ_Pantocrator_Bulgaria.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Pantocrator.jpg' },
];

// ============================================================
// HELPER
// ============================================================
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

// ============================================================
// MAIN — Browser mode
// ============================================================
(async () => {
  const repoRoot  = path.resolve(__dirname, '..');
  const imagesDir = path.join(repoRoot, 'images');

  // Buat subfolder per peristiwa
  const events = [...new Set(IMAGE_LIST.map(img => img.event))];
  for (const evt of events) {
    const d = path.join(imagesDir, evt);
    if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
  }

  console.log('='.repeat(60));
  console.log('  Prayer App — Icon Downloader (Browser Mode)');
  console.log(`  Total gambar: ${IMAGE_LIST.length}`);
  console.log('='.repeat(60));

  const browser = await chromium.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-blink-features=AutomationControlled',
      '--disable-infobars',
    ]
  });

  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    viewport: { width: 1280, height: 800 },
    extraHTTPHeaders: {
      'Accept-Language': 'en-US,en;q=0.9',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    }
  });

  // Kunjungi halaman awal untuk set cookies
  const page = await context.newPage();
  console.log('  Membuka Wikimedia Commons untuk set cookies...');
  await page.goto('https://commons.wikimedia.org/wiki/Main_Page', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await sleep(rand(2000, 4000));
  console.log('  Cookies siap!\n');

  const results = { success: 0, skipped: 0, failed: [] };

  for (let i = 0; i < IMAGE_LIST.length; i++) {
    const img     = IMAGE_LIST[i];
    const evtDir  = path.join(imagesDir, img.event);
    const outPath = path.join(evtDir, img.name);

    // Skip jika sudah ada dan valid
    if (fs.existsSync(outPath) && fs.statSync(outPath).size > 5000) {
      console.log(`[${i+1}/${IMAGE_LIST.length}] ⏭  SKIP: ${img.event}/${img.name}`);
      results.skipped++;
      continue;
    }

    console.log(`[${i+1}/${IMAGE_LIST.length}] ⬇  ${img.event}/${img.name}`);

    try {
      // Intercept the response untuk gambar ini
      let imageBuffer = null;
      let downloadError = null;

      // Method 1: Navigate langsung ke URL gambar & capture response
      const response = await page.goto(img.url, {
        waitUntil: 'networkidle',
        timeout: 40000
      });

      if (response && response.status() === 200) {
        const contentType = response.headers()['content-type'] || '';
        if (contentType.startsWith('image/') || img.url.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
          imageBuffer = await response.body();
        }
      } else if (response && response.status() === 429) {
        console.log(`       ⚠ Rate-limit 429 — menunggu 60 detik...`);
        await sleep(60000);
        // Retry sekali
        const retryResp = await page.goto(img.url, { waitUntil: 'networkidle', timeout: 40000 });
        if (retryResp && retryResp.status() === 200) {
          imageBuffer = await retryResp.body();
        }
      }

      if (imageBuffer && imageBuffer.length > 1000) {
        fs.writeFileSync(outPath, imageBuffer);
        console.log(`       ✅ ${(imageBuffer.length/1024).toFixed(1)} KB`);
        results.success++;
      } else {
        // Method 2: Fetch via page.evaluate (blob fetch di browser)
        console.log(`       🔄 Fallback ke blob fetch...`);
        const base64Data = await page.evaluate(async (url) => {
          try {
            const resp = await fetch(url, {
              credentials: 'include',
              headers: { 'Accept': 'image/*,*/*;q=0.8' }
            });
            if (!resp.ok) return null;
            const arr = await resp.arrayBuffer();
            const bytes = new Uint8Array(arr);
            let bin = '';
            for (let b of bytes) bin += String.fromCharCode(b);
            return btoa(bin);
          } catch (e) { return null; }
        }, img.url);

        if (base64Data) {
          const buf = Buffer.from(base64Data, 'base64');
          fs.writeFileSync(outPath, buf);
          console.log(`       ✅ (blob) ${(buf.length/1024).toFixed(1)} KB`);
          results.success++;
        } else {
          console.log(`       ❌ Gagal (status: ${response ? response.status() : 'no response'})`);
          results.failed.push({ ...img, reason: `Status: ${response ? response.status() : 'timeout'}` });
        }
      }

    } catch (err) {
      console.log(`       ❌ Error: ${err.message.split('\n')[0]}`);
      results.failed.push({ ...img, reason: err.message.split('\n')[0] });
    }

    // Delay manusiawi (6-12 detik)
    if (i < IMAGE_LIST.length - 1) {
      const delay = rand(6000, 12000);
      console.log(`       ⏱  Delay ${(delay/1000).toFixed(1)}s...\n`);
      await sleep(delay);
    }
  }

  await browser.close();

  // ── Ringkasan ─────────────────────────────────────────────
  console.log('\n' + '='.repeat(60));
  console.log('  HASIL DOWNLOAD');
  console.log('='.repeat(60));
  console.log(`  ✅ Berhasil  : ${results.success}`);
  console.log(`  ⏭  Di-skip   : ${results.skipped}`);
  console.log(`  ❌ Gagal     : ${results.failed.length}`);

  if (results.failed.length > 0) {
    const failLog = path.join(imagesDir, 'failed_downloads.md');
    const lines   = ['# Gambar yang Gagal\n\n',
      ...results.failed.map((f, i) =>
        `${i+1}. **${f.event}/${f.name}**\n   - URL: ${f.url}\n   - Alasan: ${f.reason}\n\n`)];
    fs.writeFileSync(failLog, lines.join(''));
    console.log(`\n  List gagal: images/failed_downloads.md`);
    results.failed.forEach(f => console.log(`  - ${f.event}/${f.name}: ${f.reason}`));
  }

  console.log('\n  Selesai! Folder: d:\\Prayer\\images\\');
  console.log('='.repeat(60));
})();
