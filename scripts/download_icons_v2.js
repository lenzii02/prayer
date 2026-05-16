/**
 * download_icons_v2.js
 * ---------------------------------------------------
 * Download koleksi ikon Yesus (dari Kelahiran hingga Kebangkitan)
 * dari Wikimedia Commons menggunakan Playwright.
 *
 * Strategi:
 * - Daftar URL hardcoded + terorganisir per peristiwa
 * - Retry hingga 4x dengan delay eksponensial
 * - User-Agent rotation
 * - Delay antar request (2-6 detik) untuk menghindari rate-limit
 * - Fallback ke Playwright browser jika request context gagal
 * ---------------------------------------------------
 */

const fs = require('fs');
const path = require('path');
const playwright = require('playwright');

// ============================================================
// DAFTAR GAMBAR: Peristiwa Kelahiran hingga Kebangkitan Yesus
// ============================================================
const IMAGE_LIST = [
  // ── KELAHIRAN & MASA AWAL ──────────────────────────────────
  {
    event: '01_Annunciation',
    name: 'Annunciation_Gladzor.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/The_Annunciation%2C_Gladzor.jpg',
  },
  {
    event: '01_Annunciation',
    name: 'Annunciation_Fra_Angelico.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Fra_Angelico_-_The_Annunciation_%28Cortona%29_-_WGA00594.jpg',
  },
  {
    event: '01_Annunciation',
    name: 'Annunciation_Byzantine.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/90/Annunciation_Byzantine_icon.jpg',
  },
  {
    event: '02_Nativity',
    name: 'Nativity_Langadas_Church.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/031_Nativity_of_Jesus_Icon_from_Saint_Paraskevi_Church_in_Langadas.jpg',
  },
  {
    event: '02_Nativity',
    name: 'Nativity_Sinai_12th_century.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Nativity_sinai_12th_century.jpg',
  },
  {
    event: '02_Nativity',
    name: 'Nativity_Theophanes_Greek.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/b/b7/Theoph_greek_nativity.jpg',
  },
  {
    event: '02_Nativity',
    name: 'Nativity_Duccio.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Duccio_di_Buoninsegna_-_Nativity_with_the_Prophets_Isaiah_and_Ezekiel_-_Google_Art_Project.jpg',
  },
  {
    event: '02_Nativity',
    name: 'Nativity_Coptic_Icon.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Coptic_icon_of_the_Nativity.jpg',
  },
  {
    event: '03_Adoration_Magi',
    name: 'Adoration_Magi_Gentile_da_Fabriano.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/6/6d/Gentile_da_Fabriano_-_Adoration_of_the_Magi_-_Uffizi.jpg',
  },
  {
    event: '03_Adoration_Magi',
    name: 'Adoration_Magi_Byzantine_Mosaic.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Mosaïque_Adoration_des_Mages_Ravenne.jpg',
  },
  {
    event: '04_Presentation_Temple',
    name: 'Presentation_Temple_Mantegna.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/Mantegna%2C_Presentazione_al_Tempio.jpg',
  },
  {
    event: '04_Presentation_Temple',
    name: 'Presentation_Temple_Icon.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/3b/Presentation_Temple_icon.jpg',
  },
  {
    event: '05_Flight_Egypt',
    name: 'Flight_Egypt_Giotto.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Giotto_-_Scrovegni_-_-20-_-_Flight_into_Egypt.jpg',
  },

  // ── MASA PELAYANAN ─────────────────────────────────────────
  {
    event: '06_Baptism',
    name: 'Baptism_Agios_Vasileios_Icon.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/15_Baptism_of_Christ_Icon_in_Assumption_of_Mary_Church_in_Agios_Vasileios.jpg',
  },
  {
    event: '06_Baptism',
    name: 'Baptism_Theophanes_Icon.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Theophanes_the_Greek._Baptism.jpg',
  },
  {
    event: '06_Baptism',
    name: 'Baptism_Piero_della_Francesca.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/4/46/Piero_della_Francesca_-_Battesimo_di_Cristo.jpg',
  },
  {
    event: '06_Baptism',
    name: 'Baptism_El_Greco.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/4/45/El_Greco_-_The_Baptism_of_Christ_-_Google_Art_Project.jpg',
  },
  {
    event: '07_Temptation',
    name: 'Temptation_Desert_Icon.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/6/6c/Ary_Scheffer-_The_Temptation_of_Christ%2C_1854.jpg',
  },
  {
    event: '08_Sermon_Mount',
    name: 'Sermon_on_the_Mount_Bloch.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/35/Bloch-SermonOnTheMount.jpg',
  },
  {
    event: '09_Transfiguration',
    name: 'Transfiguration_Rublev_follower.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Icon_of_a_follower_of_A._Rublev._1425._State_Tretyakov_Gallery%2C_Moscow._Transfiguration.jpg',
  },
  {
    event: '09_Transfiguration',
    name: 'Transfiguration_Theophanes.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Theophanes_the_Greek._The_Transfiguration.jpg',
  },
  {
    event: '09_Transfiguration',
    name: 'Transfiguration_Raphael.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/57/Transfiguration_Raphael.jpg',
  },
  {
    event: '10_Lazarus',
    name: 'Raising_Lazarus_Icon_Byzantine.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Lazarus_icon.jpg',
  },
  {
    event: '10_Lazarus',
    name: 'Raising_Lazarus_Rembrandt.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Rembrandt_Harmensz._van_Rijn_-_The_Raising_of_Lazarus_-_Google_Art_Project.jpg',
  },

  // ── PEKAN SUCI ─────────────────────────────────────────────
  {
    event: '11_Palm_Sunday',
    name: 'Palm_Sunday_Lebanon_Icon.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Palm_Sunday_icon_%28Lebanon%29.jpg',
  },
  {
    event: '11_Palm_Sunday',
    name: 'Palm_Sunday_Entry_Jerusalem_Giotto.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/90/Giotto_-_Scrovegni_-_-26-_-_Entry_into_Jerusalem.jpg',
  },
  {
    event: '12_Last_Supper',
    name: 'Last_Supper_Icon.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/0/03/Icon_last_supper.jpg',
  },
  {
    event: '12_Last_Supper',
    name: 'Last_Supper_DaVinci.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/%22The_Last_Supper%22_by_Leonardo_da_Vinci.jpg',
  },
  {
    event: '12_Last_Supper',
    name: 'Last_Supper_Siena_Icon.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/06_Icon_last_supper.jpg',
  },
  {
    event: '13_Gethsemane',
    name: 'Agony_Gethsemane_Mantegna.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/80/Andrea_Mantegna%2C_Agony_in_the_Garden.jpg',
  },
  {
    event: '13_Gethsemane',
    name: 'Agony_Gethsemane_El_Greco.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/El_Greco_Agony_in_the_Garden_of_Gethsemani.jpg',
  },
  {
    event: '14_Trial_Crucifixion',
    name: 'Crucifixion_Sinai_13th_century.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/a/af/Crucifixion_Icon_Sinai_13th_century.jpg',
  },
  {
    event: '14_Trial_Crucifixion',
    name: 'Crucifixion_Cimabue.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Cimabue%2C_crucifix%2C_santa_croce.jpg',
  },
  {
    event: '14_Trial_Crucifixion',
    name: 'Crucifixion_Velazquez.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Vel%C3%A1zquez_-_Cristo_Crucificado_%28Museo_del_Prado%2C_1632%29.jpg',
  },
  {
    event: '14_Trial_Crucifixion',
    name: 'Crucifixion_Rublev_Icon.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/39/Andrei_Rublev_-_Crucifixion_-_Google_Art_Project.jpg',
  },
  {
    event: '14_Trial_Crucifixion',
    name: 'Crucifixion_Coptic_Icon.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Coptic_Crucifixion_Icon.jpg',
  },
  {
    event: '15_Deposition',
    name: 'Deposition_Cross_Rogier.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Weyden_Deposition.jpg',
  },
  {
    event: '15_Deposition',
    name: 'Pieta_Michelangelo.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/1/1f/Michelangelo%27s_Pieta_5450_cut_out_black.jpg',
  },
  {
    event: '16_Entombment',
    name: 'Entombment_Caravaggio.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/52/The_Entombment_of_Christ_by_Caravaggio.jpg',
  },
  {
    event: '16_Entombment',
    name: 'Epitaphios_Byzantine.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/b/b7/Epitaphios_Belgrade.jpg',
  },

  // ── KEBANGKITAN & PENAMPAKAN ────────────────────────────────
  {
    event: '17_Resurrection',
    name: 'Anastasis_Dionysius_of_Fourna.png',
    url: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Anastasis_Dionysius_of_Fourna.png',
  },
  {
    event: '17_Resurrection',
    name: 'Resurrection_Coptic_Icon.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Resurrection_of_Jesus_%28coptic_icon%29.jpg',
  },
  {
    event: '17_Resurrection',
    name: 'Resurrection_Chora_Mosaic.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/6/65/Anastasis_icon.jpg',
  },
  {
    event: '17_Resurrection',
    name: 'Resurrection_Piero_della_Francesca.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/6/63/Piero_della_Francesca_-_Resurrection_-_WGA17620.jpg',
  },
  {
    event: '17_Resurrection',
    name: 'Resurrection_Grunewald.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/55/Mathis_Gothart_Gr%C3%BCnewald_-_Ressurection_-_WGA10726.jpg',
  },
  {
    event: '18_Appearances',
    name: 'Road_Emmaus_Caravaggio.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Caravaggio_-_The_Supper_at_Emmaus.jpg',
  },
  {
    event: '18_Appearances',
    name: 'Noli_Me_Tangere_Fra_Angelico.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Fra_Angelico_-_Noli_me_Tangere.jpg',
  },
  {
    event: '19_Ascension',
    name: 'Ascension_Byzantine_Icon.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Ascension_of_Jesus_Christ_icon.jpg',
  },
  {
    event: '19_Ascension',
    name: 'Ascension_Mantegna.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Andrea_Mantegna_-_The_Ascension.jpg',
  },

  // ── IKON KRISTUS UMUM (untuk mode doa) ─────────────────────
  {
    event: '00_Christ_Icons',
    name: 'Christ_Pantocrator_Sinai_6th_century.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/92/ICONS%2C_Sinai%2C_Christ_Pantocrator%2C_6th_century.jpg',
  },
  {
    event: '00_Christ_Icons',
    name: 'Christ_Pantocrator_crop.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/6/65/Christ_Icon.jpg',
  },
  {
    event: '00_Christ_Icons',
    name: 'Christ_Rublev.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/d/df/Rublev_Savior.jpg',
  },
  {
    event: '00_Christ_Icons',
    name: 'Christ_Syriac_Orthodox.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Syriac_Orthodox_icon_of_Jesus_Christ%2C_St._Peter%2C_and_St._Paul.jpg',
  },
  {
    event: '00_Christ_Icons',
    name: 'Christ_Syriac_Miniature.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/90/Syriac_miniature_of_Christ.jpg',
  },
  {
    event: '00_Christ_Icons',
    name: 'Christ_Coptic.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/80/Jesu_christ%28coptic%29.jpg',
  },
  {
    event: '00_Christ_Icons',
    name: 'Sacred_Heart_Moroder.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/55/Sacred_Heart_of_Jesus_Christ_by_Ludwig_Moroder_Urtij%C3%ABi.jpg',
  },
  {
    event: '00_Christ_Icons',
    name: 'Sacred_Heart_Cordoba.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Sacred_heart_of_Jesus_Cordoba.jpg',
  },
  {
    event: '00_Christ_Icons',
    name: 'Christ_Pantocrator_Bulgaria.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Pantocrator.jpg',
  },
];

// ============================================================
// HELPER FUNCTIONS
// ============================================================
function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function randomDelay(minMs, maxMs) {
  const ms = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
  return sleep(ms);
}

const USER_AGENTS = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 Safari/605.1.15',
  'Mozilla/5.0 (X11; Linux x86_64; rv:125.0) Gecko/20100101 Firefox/125.0',
  'WikipediaApp/2.7.50484 (Android 9; Phone) Alpha/2.7.50484',
];

function getRandomUA() {
  return USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];
}

async function downloadWithRetry(requestContext, url, outPath, maxRetries = 4) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const res = await requestContext.get(url, {
        headers: {
          'User-Agent': getRandomUA(),
          Referer: 'https://commons.wikimedia.org/',
          Accept: 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
        },
        timeout: 30000,
      });

      if (res.status() === 200) {
        const body = await res.body();
        fs.writeFileSync(outPath, body);
        return { success: true, size: body.length };
      } else if (res.status() === 429) {
        const wait = Math.pow(2, attempt) * 5000 + Math.random() * 3000;
        console.warn(`  ⚠ Rate-limited (429). Waiting ${(wait / 1000).toFixed(1)}s before retry ${attempt}/${maxRetries}...`);
        await sleep(wait);
      } else if (res.status() === 404) {
        return { success: false, reason: `HTTP 404 (not found)` };
      } else {
        console.warn(`  ⚠ HTTP ${res.status()} on attempt ${attempt}/${maxRetries}`);
        await sleep(3000 * attempt);
      }
    } catch (err) {
      console.warn(`  ⚠ Error on attempt ${attempt}/${maxRetries}: ${err.message}`);
      await sleep(3000 * attempt);
    }
  }
  return { success: false, reason: `Failed after ${maxRetries} retries` };
}

// ============================================================
// MAIN
// ============================================================
(async () => {
  const repoRoot = path.resolve(__dirname, '..');
  const imagesDir = path.join(repoRoot, 'images');

  // Buat subfolder per peristiwa
  const events = [...new Set(IMAGE_LIST.map((img) => img.event))];
  for (const evt of events) {
    const evtDir = path.join(imagesDir, evt);
    if (!fs.existsSync(evtDir)) fs.mkdirSync(evtDir, { recursive: true });
  }

  console.log('='.repeat(60));
  console.log('  Prayer App — Icon Downloader v2');
  console.log(`  Total gambar: ${IMAGE_LIST.length}`);
  console.log('='.repeat(60));

  const requestCtx = await playwright.request.newContext({
    extraHTTPHeaders: {
      'User-Agent': getRandomUA(),
      Referer: 'https://commons.wikimedia.org/',
    },
  });

  const results = { success: 0, skipped: 0, failed: [] };

  for (let i = 0; i < IMAGE_LIST.length; i++) {
    const img = IMAGE_LIST[i];
    const evtDir = path.join(imagesDir, img.event);
    const outPath = path.join(evtDir, img.name);

    // Skip jika sudah ada
    if (fs.existsSync(outPath) && fs.statSync(outPath).size > 1000) {
      console.log(`[${i + 1}/${IMAGE_LIST.length}] ⏭  SKIP (sudah ada): ${img.event}/${img.name}`);
      results.skipped++;
      continue;
    }

    console.log(`[${i + 1}/${IMAGE_LIST.length}] ⬇  ${img.event}/${img.name}`);
    console.log(`       URL: ${img.url}`);

    const result = await downloadWithRetry(requestCtx, img.url, outPath);

    if (result.success) {
      console.log(`       ✅ Berhasil (${(result.size / 1024).toFixed(1)} KB)`);
      results.success++;
    } else {
      console.log(`       ❌ Gagal: ${result.reason}`);
      results.failed.push({ ...img, reason: result.reason });
    }

    // Delay sopan antar request (2-5 detik)
    if (i < IMAGE_LIST.length - 1) {
      await randomDelay(2000, 5000);
    }
  }

  await requestCtx.dispose();

  // ── Ringkasan ─────────────────────────────────────────────
  console.log('\n' + '='.repeat(60));
  console.log('  HASIL DOWNLOAD');
  console.log('='.repeat(60));
  console.log(`  ✅ Berhasil  : ${results.success}`);
  console.log(`  ⏭  Di-skip   : ${results.skipped}`);
  console.log(`  ❌ Gagal     : ${results.failed.length}`);

  if (results.failed.length > 0) {
    console.log('\n  Daftar yang gagal:');
    results.failed.forEach((f, idx) => {
      console.log(`  ${idx + 1}. ${f.event}/${f.name}`);
      console.log(`     URL: ${f.url}`);
      console.log(`     Alasan: ${f.reason}`);
    });

    // Simpan daftar gagal ke file untuk referensi manual
    const failLog = path.join(imagesDir, 'failed_downloads.md');
    const lines = [
      '# Gambar yang Gagal Diunduh Otomatis\n',
      'Unduh manual melalui link berikut:\n',
      ...results.failed.map(
        (f, idx) =>
          `${idx + 1}. **${f.event}/${f.name}**\n   - URL: ${f.url}\n   - Alasan: ${f.reason}\n`
      ),
    ];
    fs.writeFileSync(failLog, lines.join('\n'));
    console.log(`\n  File daftar gagal disimpan di: ${failLog}`);
  }

  console.log('\n  Selesai! Cek folder d:\\Prayer\\images\\');
  console.log('='.repeat(60));
})();
