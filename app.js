/* =============================================
   DOA PUJA YESUS â€” App Logic
   ============================================= */

// â”€â”€ DATA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const PRAYER_IMAGES = [
  {
    src: 'images/06_last_supper_icon.jpg',
    caption: 'Perjamuan Terakhir \u00B7 Ikon Tradisi Timur',
    alt: 'Ikon Perjamuan Terakhir Yesus bersama para rasul',
  },
  {
    src: 'images/16_christ_pantocrator_sinai.jpg',
    caption: 'Kristus Pantokrator \u00B7 Sinai, Abad VI',
    alt: 'Ikon Kristus Pantokrator dari Sinai',
  },
];

const DEFAULT_PRAYER_IMAGE = PRAYER_IMAGES[0];

const RITES = {
  greek: {
    name: 'Yunani \u00B7 Ortodoks Bizantin',
    original: 'ÎšÏÏÎ¹Îµ á¼¸Î·ÏƒÎ¿á¿¦ Î§ÏÎ¹ÏƒÏ„Î­, Î¥á¼±á½² Ï„Î¿á¿¦ Î˜ÎµÎ¿á¿¦,<br/>á¼Î»Î­Î·ÏƒÏŒÎ½ Î¼Îµ Ï„á½¸Î½ á¼Î¼Î±ÏÏ„Ï‰Î»ÏŒÎ½.',
    transliteration: 'Kyrie Iesou Christe, Yie tou Theou, eleison me ton hamartolon.',
    meaning: 'Tuhan Yesus Kristus, Putra Allah, kasihanilah aku, orang berdosa ini.',
    iconSrc: PRAYER_IMAGES[1].src,
    iconCaption: 'Kristus Pantokrator \u00B7 Sinai, Abad VI',
    iconAlt: 'Ikon Kristus Pantokrator, Biara Santa Katarina, Sinai, abad ke-6',
  },
  latin: {
    name: 'Latin \u00B7 Katolik Roma',
    original: '<em>Domine Iesu Christe, Fili Dei,<br/>miserere mei, peccatoris.</em>',
    transliteration: 'Domine Iesu Christe, Fili Dei, miserere mei, peka-toris.',
    meaning: 'Tuhan Yesus Kristus, Putra Allah, kasihanilah aku, orang berdosa ini.',
    iconSrc: PRAYER_IMAGES[0].src,
    iconCaption: 'Hati Kudus Yesus \u00B7 Seni Klasik Barat',
    iconAlt: 'Gambar Hati Kudus Yesus gaya klasik Katolik',
  },
  aramaic: {
    name: 'Aramaik \u00B7 Siriak Timur',
    original: 'Ü¡Ü³ÜªÜ ÜÜ¶Ü«Ü½Ü˜Ü¥ Ü¡Ü«ÜºÜÜšÜ³Ü Ü’ÜªÜ¶Ü— Ü•ÜÜ°Ü Ü³Ü—Ü³Ü<br/>ÜªÜ°ÜšÜ¶Ü¡ Ü¥Ü Ü°Ü ÜšÜ°Ü›Ü³ÜÜ³Ü.',
    transliteration: "Mor Yeshue Mshicho, Breh d'Aloho, rachem alai chatoyo.",
    meaning: 'Tuhan Yesus Kristus, Putra Allah, kasihanilah aku, orang berdosa ini.',
    iconSrc: PRAYER_IMAGES[1].src,
    iconCaption: 'Fresco Dura-Europos \u00B7 Gereja Siriak, Abad III',
    iconAlt: 'Fresco Baptisan Yesus dari Dura-Europos, gereja Kristen tertua, abad ke-3',
  },
  syriac: {
    name: 'Suriah \u00B7 Tradisi Aramaik Barat',
    original: '&#1815;&#1825;&#1808;&#1797; &#1810;&#1808;&#1791;&#1806;&#1797; &#1810;&#1808;&#1826;&#1809;&#1797;&#1795;&#1797;&#1816;&#1817;&#1797;&#1548;<br/>&#1813;&#1807;&#1812;&#1808;&#1798;&#1810;&#1814; &#1813;&#1814;&#1810; &#1808;&#1798;&#1805;&#1796;&#1810;&#1808;.',
    transliteration: 'Moran Yeshu Mshiho, breh d\'Aloho, etraham alain hatoye.',
    meaning: 'Tuhan kami Yesus Kristus, Putra Allah, kasihanilah kami, orang berdosa.',
    iconSrc: PRAYER_IMAGES[1].src,
    iconCaption: 'Tradisi Siriak Barat \u00B7 Doa Yesus Aramaik',
    iconAlt: 'Fresco Baptisan Yesus dari Dura-Europos, tradisi Kristen Siria awal',
  },
  coptic: {
    name: 'Koptik \u00B7 Ortodoks Timur',
    original: 'â² Ì€Ï­â²Ÿâ²“â²¥ â²’â²â²¥â²Ÿâ²©â²¥ â² â²“â²­â²£â²“â²¥â²§â²Ÿâ²¥,<br/>â² Ì€Ï£â²â²£â²“ â²™Ì€â²ªâ²›â²Ÿâ²©Ï¯, â²›â²â²“ â²›â²â²“ â²¡â²“â²£â²‰Ï¥â²‰â²£â²›â²Ÿâ²ƒâ²“.',
    transliteration: 'Epchois Iesos Pikhristos, Pishiri em-Efnoti, nai nyi pirefernobi.',
    meaning: 'Tuhan Yesus Kristus, Putra Allah, kasihanilah aku, orang berdosa ini.',
    iconSrc: PRAYER_IMAGES[0].src,
    iconCaption: 'Kristus & Abas Menas \u00B7 Koptik, Abad VI-VIII',
    iconAlt: 'Ikon Koptik Kristus dan Abas Menas dari Louvre, abad ke-6 hingga 8',
  },
  slavic: {
    name: 'Slavonik \u00B7 Ortodoks Rusia',
    original: 'Ð“Ð¾ÌÑÐ¿Ð¾Ð´Ð¸, Ð˜Ð¸ÑÑƒÌÑÐµ Ð¥Ñ€Ð¸ÑÑ‚ÐµÌ, Ð¡Ñ‹ÌÐ½Ðµ Ð‘Ð¾ÌÐ¶Ð¸Ð¹,<br/>Ð¿Ð¾Ð¼Ð¸ÌÐ»ÑƒÐ¹ Ð¼Ñ, Ð³Ñ€ÐµÌÑˆÐ½Ð°Ð³Ð¾.',
    transliteration: 'Gospodi, Iisuse Khriste, Syne Bozhiy, pomiluy mya, greshnago.',
    meaning: 'Tuhan Yesus Kristus, Putra Allah, kasihanilah aku, orang berdosa ini.',
    iconSrc: PRAYER_IMAGES[0].src,
    iconCaption: 'Sang Juru Selamat \u00B7 Andrei Rublev, ~1410',
    iconAlt: 'Ikon Sang Juru Selamat karya Andrei Rublev, sekitar tahun 1410',
  },
  indonesia: {
    name: 'Indonesia \u00B7 Lintas Ritus',
    original: 'Tuhan Yesus Kristus, Putra Allah,<br/>kasihanilah aku, orang berdosa ini.',
    transliteration: '',
    meaning: 'Doa kontemplatif dalam bahasa Indonesia untuk semua ritus.',
    iconSrc: PRAYER_IMAGES[1].src,
    iconCaption: 'Kristus Pantokrator \u00B7 Sinai, Abad VI',
    iconAlt: 'Ikon Kristus Pantokrator dari Sinai',
  },
};

const COUNT_DESC = {
  33: 'Usia Kristus saat wafat \u00B7 Tradisi devosi',
  50: 'Tradisi umum monastik \u00B7 Setara 1 dekade chotki',
  100: 'Satu rangkaian penuh chotki Ortodoks',
  200: 'Dua rangkaian \u00B7 Praktik pertapa',
};

const CLOSING_QUOTES = [
  { text: '"Jika kamu berdoa tanpa henti, kamu akan menemukan ketenangan jiwa dan persatuan dengan Allah."', source: 'â€” St. Yohanes Klimakos, Tangga Ilahi' },
  { text: '"Doa Yesus adalah nafas jiwa. Ucapkanlah dengan bibir, pikiran, dan hati."', source: 'â€” St. Theophan sang Pertapa' },
  { text: '"Nama Yesus mengandung semua kebaikan Allah dan segala kasih karunia yang kita butuhkan."', source: 'â€” St. Hesychios dari Sinai' },
  { text: '"Teruslah memanggil nama Tuhan Yesus sampai nama itu berakar dalam hatimu dan tidak ada yang lain selain Dia."', source: 'â€” St. Yohanes Krisostomus' },
  { text: '"Diam dalam doa adalah lebih bernilai dari seribu kata tanpa hati."', source: 'â€” Amsal Para Bapa Gurun' },
];

// â”€â”€ STATE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
let state = {
  rite: 'greek',
  count: 50,
  remaining: 50,
  visualIndex: 0,
  soundOn: false,
  audioCtx: null,
};

// â”€â”€ DOM REFS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const screens = {
  setup: document.getElementById('screen-setup'),
  prayer: document.getElementById('screen-prayer'),
  done: document.getElementById('screen-done'),
};

// Setup screen
const riteGrid        = document.getElementById('rite-grid');
const countSelector   = document.getElementById('count-selector');
const countDesc       = document.getElementById('count-desc');
const previewOriginal = document.getElementById('preview-original');
const previewTranslit = document.getElementById('preview-transliteration');
const previewMeaning  = document.getElementById('preview-meaning');
const startBtn        = document.getElementById('start-btn');

// Prayer screen
const backBtn           = document.getElementById('back-btn');
const prayerRiteLabel   = document.getElementById('prayer-rite-label');
const iconFrame         = document.getElementById('icon-frame');
const jesusIcon         = document.getElementById('jesus-icon');
const jesusIconNext     = document.getElementById('jesus-icon-next');
const iconCaption       = document.getElementById('icon-caption');
const prayerOrigText    = document.getElementById('prayer-original-text');
const prayerTranslit    = document.getElementById('prayer-translit-text');
const counterNumber     = document.getElementById('counter-number');
const counterTotal      = document.getElementById('counter-total');
const progressCircle    = document.getElementById('progress-circle');
const tapBtn            = document.getElementById('tap-btn');
const tapRipple         = document.getElementById('tap-ripple');
const resetBtn          = document.getElementById('reset-btn');
const soundBtn          = document.getElementById('sound-btn');

// Done screen
const doneCount      = document.getElementById('done-count');
const doneSubtitle   = document.getElementById('done-subtitle');
const doneQuote      = document.getElementById('done-quote');
const doneRepeatBtn  = document.getElementById('done-repeat-btn');
const doneHomeBtn    = document.getElementById('done-home-btn');
let imageRevealTimer = null;

// â”€â”€ SCREEN NAVIGATION â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function showScreen(name) {
  Object.entries(screens).forEach(([key, el]) => {
    el.classList.toggle('active', key === name);
  });
}

function getCurrentRite() {
  return RITES[state.rite] || RITES.greek;
}

function getImageBySrc(src) {
  return PRAYER_IMAGES.find((image) => image.src === src) || DEFAULT_PRAYER_IMAGE;
}

function setPrayerImage(image, animate = true) {
  if (!image) return;
  if (imageRevealTimer) clearTimeout(imageRevealTimer);

  if (jesusIcon.getAttribute('src') === image.src) {
    iconFrame.classList.remove('revealing');
    iconCaption.textContent = image.caption;
    jesusIcon.alt = image.alt;
    return;
  }

  if (!animate || !jesusIconNext) {
    jesusIcon.src = image.src;
    jesusIcon.alt = image.alt;
    iconCaption.textContent = image.caption;
    iconFrame.classList.remove('revealing');
    return;
  }

  jesusIconNext.src = image.src;
  jesusIconNext.alt = '';
  iconFrame.classList.add('revealing');
  iconCaption.textContent = image.caption;

  imageRevealTimer = setTimeout(() => {
    jesusIcon.src = image.src;
    jesusIcon.alt = image.alt;
    iconFrame.classList.remove('revealing');
    imageRevealTimer = null;
  }, 1600);
}

function revealNextPrayerImage() {
  state.visualIndex = (state.visualIndex + 1) % PRAYER_IMAGES.length;
  setPrayerImage(PRAYER_IMAGES[state.visualIndex]);
}

function updateSoundButton() {
  soundBtn.textContent = state.soundOn ? 'Suara' : 'Bisu';
  soundBtn.classList.toggle('sound-on', state.soundOn);
}

// â”€â”€ UPDATE SETUP UI â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function updateSetupUI() {
  const rite = getCurrentRite();
  previewOriginal.innerHTML = rite.original;
  previewTranslit.textContent = rite.transliteration;
  previewMeaning.textContent = rite.meaning;
  countDesc.textContent = COUNT_DESC[state.count];
}

// â”€â”€ UPDATE PRAYER UI â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function updatePrayerUI() {
  const rite = getCurrentRite();
  const image = getImageBySrc(rite.iconSrc);
  prayerRiteLabel.textContent = rite.name;
  state.visualIndex = PRAYER_IMAGES.indexOf(image);
  setPrayerImage(image, false);
  prayerOrigText.innerHTML = rite.original;
  prayerTranslit.textContent = rite.transliteration;
  updateCounter();
}

function updateCounter() {
  counterNumber.textContent = state.remaining;
  counterTotal.textContent  = `dari ${state.count}`;

  // Progress ring â€” circumference = 2Ï€ Ã— 54 â‰ˆ 339.3
  const circumference = 339.3;
  const fraction = state.remaining / state.count;
  progressCircle.style.strokeDashoffset = circumference * (1 - fraction);
}

// â”€â”€ AUDIO â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function ensureAudioCtx() {
  if (!state.audioCtx) {
    state.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (state.audioCtx.state === 'suspended') state.audioCtx.resume();
}

function playTapSound() {
  if (!state.soundOn) return;
  try {
    ensureAudioCtx();
    const ctx = state.audioCtx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(660, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.35, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.3);
  } catch (e) { /* audio not critical */ }
}

function playDoneSound() {
  if (!state.soundOn) return;
  try {
    ensureAudioCtx();
    const ctx = state.audioCtx;
    const notes = [523, 659, 784, 1047];
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.type = 'sine';
      const t = ctx.currentTime + i * 0.18;
      osc.frequency.setValueAtTime(freq, t);
      gain.gain.setValueAtTime(0.25, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
      osc.start(t); osc.stop(t + 0.5);
    });
  } catch (e) { /* audio not critical */ }
}

// â”€â”€ HAPTIC â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function vibrate(pattern) {
  if ('vibrate' in navigator) navigator.vibrate(pattern);
}

// â”€â”€ RIPPLE ANIMATION â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function triggerRipple() {
  tapRipple.classList.remove('animate');
  void tapRipple.offsetWidth;
  tapRipple.classList.add('animate');
}

// â”€â”€ TAP HANDLER â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
let scaleTimer = null;
function handleTap() {
  if (state.remaining <= 0) return;

  state.remaining--;
  updateCounter();
  revealNextPrayerImage();
  triggerRipple();
  playTapSound();
  vibrate(30);

  // Animate counter number
  if (scaleTimer) clearTimeout(scaleTimer);
  counterNumber.style.transform = 'scale(1.2)';
  counterNumber.style.color = 'var(--gold-light)';
  scaleTimer = setTimeout(() => {
    counterNumber.style.transform = 'scale(1)';
    counterNumber.style.color = '';
  }, 150);

  if (state.remaining === 0) {
    setTimeout(showDoneScreen, 600);
  }
}

// â”€â”€ DONE SCREEN â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function showDoneScreen() {
  playDoneSound();
  vibrate([50, 50, 100]);

  doneCount.textContent = state.count;
  const q = CLOSING_QUOTES[Math.floor(Math.random() * CLOSING_QUOTES.length)];
  doneQuote.querySelector('.quote-text').textContent = q.text;
  doneQuote.querySelector('.quote-source').textContent = q.source;

  showScreen('done');
}

// â”€â”€ EVENT LISTENERS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

// Rite selector
riteGrid.addEventListener('click', (e) => {
  const card = e.target.closest('.rite-card');
  if (!card) return;
  const selectedRite = card.dataset.rite;
  if (!RITES[selectedRite]) return;
  document.querySelectorAll('.rite-card').forEach(c => c.classList.remove('active'));
  card.classList.add('active');
  state.rite = selectedRite;
  updateSetupUI();
});

// Count selector
countSelector.addEventListener('click', (e) => {
  const btn = e.target.closest('.count-btn');
  if (!btn) return;
  const selectedCount = parseInt(btn.dataset.count, 10);
  if (!COUNT_DESC[selectedCount]) return;
  document.querySelectorAll('.count-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  state.count = selectedCount;
  state.remaining = state.count;
  updateSetupUI();
});

// Start prayer
startBtn.addEventListener('click', () => {
  state.remaining = state.count;
  updatePrayerUI();
  showScreen('prayer');
  // Unlock audio on first user gesture
  ensureAudioCtx();
});

// Back button
backBtn.addEventListener('click', () => showScreen('setup'));

// Tap button
tapBtn.addEventListener('click', handleTap);

// Reset
resetBtn.addEventListener('click', () => {
  state.remaining = state.count;
  updateCounter();
  vibrate(20);
});

// Sound toggle
soundBtn.addEventListener('click', () => {
  state.soundOn = !state.soundOn;
  updateSoundButton();
  if (state.soundOn) {
    ensureAudioCtx();
    playTapSound(); // preview sound
  }
});

// Done â€” repeat
doneRepeatBtn.addEventListener('click', () => {
  state.remaining = state.count;
  updatePrayerUI();
  showScreen('prayer');
});

// Done â€” home
doneHomeBtn.addEventListener('click', () => showScreen('setup'));

// â”€â”€ INIT â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
updateSetupUI();
updateSoundButton();
showScreen('setup');
