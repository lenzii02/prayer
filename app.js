/* =============================================
   DOA PUJA YESUS â€” App Logic
   ============================================= */

// â”€â”€ DATA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const PRAYER_EVENTS = [
  {
    title: 'Kristus Sang Terang',
    folder: '00_Christ_Icons',
    files: [
      '16_christ_pantocrator_sinai.jpg',
      '364baea6d4606a3482f8963d3f9f6190.jpg',
      '5f854ec01825a2a71a9b2e0691854df5.jpg',
      '7677141cbdf8d32afcbd91364f26c070.jpg',
      'c4d62d59386bcad49caa3deaabba6b41.jpg',
      'ca9a71abc35f05c18978f78fd63938c0.jpg',
    ],
  },
  {
    title: 'Kabar Sukacita',
    folder: '01_Annunciation',
    files: [
      '01_The_Annunciation,_Gladzor.jpg',
      '0a668bfb8376a5673a2501b81785d920.jpg',
      '35d70958f50735991e32f2dfbcaa90ca.jpg',
      '72bdc4690f882393ce88cabb8c908fe9.jpg',
      '89a2066a6310295833ea8ea69b2518ba.jpg',
      'a3f3e8f43b796762ded4f7006ff083e0.jpg',
    ],
  },
  {
    title: 'Kelahiran Kristus',
    folder: '02_Nativity',
    files: [
      '2b9b31e5c523a0e8ec8938fb9a5635ea.jpg',
      '484ac1acda21b0fbcf57d6950cab99c7.jpg',
      '9995f0b73cb1ac79f3b527e8e2ce7e9c.jpg',
      '9d26ae9fa0dcf0604213e7f495b9fbf8.jpg',
      'ffff1d47bc3e081114ea2388394cee25.jpg',
    ],
  },
  {
    title: 'Penyembahan Para Majus',
    folder: '03_Adoration_Magi',
    files: [
      '3383e4716075957317e609d1e339ae04.jpg',
      '3b434fbe17825e4fa12925435dee73e4.jpg',
      '4c195e33fc360bff1d111518bc8aba3f.jpg',
      '77f175f74a306b2aa76dfa8fdbb33d68.jpg',
      'fe88e33c89ee9f922d9d23bd58cd62b5.jpg',
    ],
  },
  {
    title: 'Yesus Dipersembahkan di Bait Allah',
    folder: '04_Presentation_Temple',
    files: [
      '06dbdf5323470d553e67d1fa9b0da004.jpg',
      '5f2604813a82d2a98dc0c462768a844e.jpg',
      'b5d09a64d8480a9a0ac815777de66d02.jpg',
      'cc0892d27b106193736515be5013d762.jpg',
    ],
  },
  {
    title: 'Pengungsian ke Mesir',
    folder: '05_Flight_Egypt',
    files: [
      '10fc5c08053870000ae4c77cfd99cd1b.jpg',
      '6c49ae57167f91408ba259b88b16f11e.jpg',
      '87b825e321c85691e1e99f4f374e5b37.jpg',
      'b05f0c2408f987c52c008092c82997a0.jpg',
      'be29600c9362e151f7b936d5c01deee3.jpg',
      'c9435a9c13890c804c601d9f85d152f6.jpg',
    ],
  },
  {
    title: 'Pembaptisan Yesus',
    folder: '06_Baptism',
    files: [
      '73775726c6ac164feb22fa154956e72a.jpg',
      '9c9ed219ddd785608ee7d372c014bf21.jpg',
      'b4ca6b8c797a4001644bbb9faf78b438.jpg',
      'cd21a1535e9fffc3c282d35d01c698ee.jpg',
    ],
  },
  {
    title: 'Pencobaan di Padang Gurun',
    folder: '07_Temptation',
    files: [
      'c4bd37e14c6dea8ee3ddd63ca0e570b2.jpg',
      'd079d976fc43b1004e4d1525728b4a45.jpg',
      'd3a50e92a4f5c6caa65219e3be73de58.jpg',
      'ef97839ec80070b9ee1e67f1932bacb5.jpg',
    ],
  },
  {
    title: 'Khotbah di Bukit',
    folder: '08_Sermon_Mount',
    files: [
      '0076be29bab42bb60ea7eb78a904f370.jpg',
      '0109b4c040f6bf35bf89730c9e03b012.jpg',
      '146111193a6cb7ffc5484bd9b351b831.jpg',
      '9f8b8180b131bebaeb18bd7b02634fd0.jpg',
    ],
  },
  {
    title: 'Transfigurasi',
    folder: '09_Transfiguration',
    files: [
      '2dd87bdfc2ade51ff57ff7ea6b3666b4.jpg',
      '2ddbb801617f14becf43bf96309849fb.jpg',
      'd7e0c1ed4373142e811c53077ac527a3.jpg',
      'f1cc637df752ed16763a828afeb3de11.jpg',
    ],
  },
  {
    title: 'Lazarus Dibangkitkan',
    folder: '10_Lazarus',
    files: [
      '06a7b077c79d803f5a1dc6631753a8b4.jpg',
      '2a9ef266f096aecd4d944638c4748e68.jpg',
      '2f4703ed303eec474bc212b923f4a393.jpg',
      '517de5a9a0cf156d8862865e906ccd27.jpg',
      'edc144cccc5b4719c6e5c6c06d9df28d.jpg',
    ],
  },
  {
    title: 'Minggu Palma',
    folder: '11_Palm_Sunday',
    files: [
      '490c503fff40abd12f73eb3c57f0de67.jpg',
      '8ea7ba73366dc63900aa94bbeb74cec0.jpg',
      'a6b24ec0bf7dc281658f296b69a4bb2c.jpg',
      'b3f87ed3c5ca46c43962621df3494ba4.jpg',
    ],
  },
  {
    title: 'Perjamuan Terakhir',
    folder: '12_Last_Supper',
    files: [
      '06_last_supper_icon.jpg',
      '363e367b28902188030301b26556eb5a.jpg',
      '6a35ef2e8beb30f72ae8cbde4c2be878.jpg',
      '706051b35c42dd85b08353bfce6958b0.jpg',
      '89acacbf1c74307f626387ad4e2a33f0.jpg',
    ],
  },
  {
    title: 'Getsemani',
    folder: '13_Gethsemane',
    files: [
      '4c7f28b632c8ea79f2bbb17ae1594725.jpg',
      'd4a2060c22a839ba92c8ecdbf1edbe07.jpg',
      'ec39c44f62d09478465a0bda72f0ba04.jpg',
      'fee3100ea877c88c689a3cabcd4d9bc1.jpg',
    ],
  },
  {
    title: 'Pengadilan dan Penyaliban',
    folder: '14_Trial_Crucifixion',
    files: [
      '0ccceca7d4000b741512d62aca18d12c.jpg',
      '634158a14c804505b68c908a8662a36d.jpg',
      '9eaf504a85abe7089c34693b30c08fdc.jpg',
      'e5f60b5686514f31797c48c523fe4f51.jpg',
      'extremehumility.jpg',
      'fcaf3be32e208e85a44fbe0362c952fa.jpg',
    ],
  },
  {
    title: 'Yesus Diturunkan dari Salib',
    folder: '15_Deposition',
    files: [
      '0f92c816339be936e23cf497e18b6ae6.jpg',
      '343ad8f3add6409a621148249813b508.jpg',
      '6e3cefb8951c727d0e3ae625575feeb6.jpg',
      '82ba80e0500825c70a6cc2fff05d0050.jpg',
      '94c1a3f795c348693f08ae189daa81e4.jpg',
    ],
  },
  {
    title: 'Pemakaman Yesus',
    folder: '16_Entombment',
    files: [
      '15b251c4141aae8f2f47a7b028923735.jpg',
      '4995fc522a45fa6646a86ffc2727ac1b.jpg',
      '7e00e102a321801e63870580996b0a39.jpg',
      'b7d7f9bfd4a6d30f6803904392df605a.jpg',
      'f6a5e46be78bd12648ec37207165b11b.jpg',
    ],
  },
  {
    title: 'Kebangkitan',
    folder: '17_Resurrection',
    files: [
      '35cb7af3fbb453e1af01ff3ceead24b5.jpg',
      '3910c30052277ca8f32221c51477e3b4.jpg',
      '52ecd688d702ce2409741f75552b4031.jpg',
      '55ad22f8fe89b8275f827ffaf42808e7.jpg',
      'a29f9fb62a72572af722ccdcf6d53619.jpg',
      'f3bac3cbb13dc620d57f68f5a9a21a6a.jpg',
    ],
  },
  {
    title: 'Penampakan Kristus',
    folder: '18_Appearances',
    files: [
      '86fb0796d933795081d1b292bbe6ba43.jpg',
      'a6b3ec7ae7d9df1a41a80e7762463c4c.jpg',
      'bd52f4f7d80ae68ca913a8310312092d.jpg',
    ],
  },
  {
    title: 'Kenaikan Tuhan',
    folder: '19_Ascension',
    files: [
      '2863df15724ba9ecfcf37e26d3aaa1aa.jpg',
      '91b680ffdcf3b438104faeaf882ed1a5.jpg',
      'ff47ad57fcaa3d8caf17ad5a394863b5.jpg',
    ],
  },
];

const DEFAULT_PRAYER_IMAGE = {
  src: 'images/00_Christ_Icons/16_christ_pantocrator_sinai.jpg',
  caption: 'Kristus Sang Terang',
  alt: 'Ikon Kristus',
};

const RITES = {
  greek: {
    name: 'Yunani \u00B7 Ortodoks Bizantin',
    original: '&#922;&#973;&#961;&#953;&#949; &#7992;&#951;&#963;&#959;&#8166; &#935;&#961;&#953;&#963;&#964;&#941;, &#933;&#7985;&#8050; &#964;&#959;&#8166; &#920;&#949;&#959;&#8166;,<br/>&#7952;&#955;&#941;&#951;&#963;&#972;&#957; &#956;&#949; &#964;&#8056;&#957; &#7937;&#956;&#945;&#961;&#964;&#969;&#955;&#972;&#957;.',
    transliteration: 'Kyrie Iesou Christe, Yie tou Theou, eleison me ton hamartolon.',
    meaning: 'Tuhan Yesus Kristus, Putra Allah, kasihanilah aku, orang berdosa ini.',
    iconSrc: DEFAULT_PRAYER_IMAGE.src,
    iconCaption: 'Kristus Pantokrator \u00B7 Sinai, Abad VI',
    iconAlt: 'Ikon Kristus Pantokrator, Biara Santa Katarina, Sinai, abad ke-6',
  },
  latin: {
    name: 'Latin \u00B7 Katolik Roma',
    original: '<em>Domine Iesu Christe, Fili Dei,<br/>miserere mei, peccatoris.</em>',
    transliteration: 'Domine Iesu Christe, Fili Dei, miserere mei, peka-toris.',
    meaning: 'Tuhan Yesus Kristus, Putra Allah, kasihanilah aku, orang berdosa ini.',
    iconSrc: DEFAULT_PRAYER_IMAGE.src,
    iconCaption: 'Hati Kudus Yesus \u00B7 Seni Klasik Barat',
    iconAlt: 'Gambar Hati Kudus Yesus gaya klasik Katolik',
  },
  aramaic: {
    name: 'Aramaik \u00B7 Siriak Timur',
    original: '&#1815;&#1825;&#1808;&#1797; &#1810;&#1808;&#1791;&#1806;&#1797; &#1810;&#1808;&#1826;&#1809;&#1797;&#1795;&#1797;&#1816;&#1817;&#1797;&#1548;<br/>&#1813;&#1807;&#1812;&#1808;&#1798;&#1810;&#1814; &#1813;&#1814;&#1810; &#1808;&#1798;&#1805;&#1796;&#1810;&#1808;.',
    transliteration: "Mor Yeshue Mshicho, Breh d'Aloho, rachem alai chatoyo.",
    meaning: 'Tuhan Yesus Kristus, Putra Allah, kasihanilah aku, orang berdosa ini.',
    iconSrc: DEFAULT_PRAYER_IMAGE.src,
    iconCaption: 'Fresco Dura-Europos \u00B7 Gereja Siriak, Abad III',
    iconAlt: 'Fresco Baptisan Yesus dari Dura-Europos, gereja Kristen tertua, abad ke-3',
  },
  syriac: {
    name: 'Suriah \u00B7 Tradisi Aramaik Barat',
    original: '&#1815;&#1825;&#1808;&#1797; &#1810;&#1808;&#1791;&#1806;&#1797; &#1810;&#1808;&#1826;&#1809;&#1797;&#1795;&#1797;&#1816;&#1817;&#1797;&#1548;<br/>&#1813;&#1807;&#1812;&#1808;&#1798;&#1810;&#1814; &#1813;&#1814;&#1810; &#1808;&#1798;&#1805;&#1796;&#1810;&#1808;.',
    transliteration: 'Moran Yeshu Mshiho, breh d\'Aloho, etraham alain hatoye.',
    meaning: 'Tuhan kami Yesus Kristus, Putra Allah, kasihanilah kami, orang berdosa.',
    iconSrc: DEFAULT_PRAYER_IMAGE.src,
    iconCaption: 'Tradisi Siriak Barat \u00B7 Doa Yesus Aramaik',
    iconAlt: 'Fresco Baptisan Yesus dari Dura-Europos, tradisi Kristen Siria awal',
  },
  coptic: {
    name: 'Koptik \u00B7 Ortodoks Timur',
    original: 'Epchois Iesos Pikhristos,<br/>Pishiri em-Efnoti, nai nyi pirefernobi.',
    transliteration: 'Epchois Iesos Pikhristos, Pishiri em-Efnoti, nai nyi pirefernobi.',
    meaning: 'Tuhan Yesus Kristus, Putra Allah, kasihanilah aku, orang berdosa ini.',
    iconSrc: DEFAULT_PRAYER_IMAGE.src,
    iconCaption: 'Kristus & Abas Menas \u00B7 Koptik, Abad VI-VIII',
    iconAlt: 'Ikon Koptik Kristus dan Abas Menas dari Louvre, abad ke-6 hingga 8',
  },
  slavic: {
    name: 'Slavonik \u00B7 Ortodoks Rusia',
    original: '&#1043;&#1086;&#1089;&#1087;&#1086;&#1076;&#1080;, &#1048;&#1080;&#1089;&#1091;&#1089;&#1077; &#1061;&#1088;&#1080;&#1089;&#1090;&#1077;, &#1057;&#1099;&#1085;&#1077; &#1041;&#1086;&#1078;&#1080;&#1081;,<br/>&#1087;&#1086;&#1084;&#1080;&#1083;&#1091;&#1081; &#1084;&#1103;, &#1075;&#1088;&#1077;&#1096;&#1085;&#1072;&#1075;&#1086;.',
    transliteration: 'Gospodi, Iisuse Khriste, Syne Bozhiy, pomiluy mya, greshnago.',
    meaning: 'Tuhan Yesus Kristus, Putra Allah, kasihanilah aku, orang berdosa ini.',
    iconSrc: DEFAULT_PRAYER_IMAGE.src,
    iconCaption: 'Sang Juru Selamat \u00B7 Andrei Rublev, ~1410',
    iconAlt: 'Ikon Sang Juru Selamat karya Andrei Rublev, sekitar tahun 1410',
  },
  indonesia: {
    name: 'Indonesia \u00B7 Lintas Ritus',
    original: 'Tuhan Yesus Kristus, Putra Allah,<br/>kasihanilah aku, orang berdosa ini.',
    transliteration: '',
    meaning: 'Doa kontemplatif dalam bahasa Indonesia untuk semua ritus.',
    iconSrc: DEFAULT_PRAYER_IMAGE.src,
    iconCaption: 'Kristus Pantokrator \u00B7 Sinai, Abad VI',
    iconAlt: 'Ikon Kristus Pantokrator dari Sinai',
  },
  jawa: {
    name: 'Jawa \u00B7 Jawa',
    original: 'Dhuh Gusti Yesus Kristus Putraning Allah, Nyuwun Kawelasan Dhumateng Kawula Tiyang Dosa. ',
    transliteration: 'Dhuh Gusti Yesus Kristus Putraning Allah, Nyuwun Kawelasan Dhumateng Kawula Tiyang Dosa.',
    meaning: 'Tuhan Yesus Kristus, Putra Allah, kasihanilah aku, orang berdosa ini.',
    iconSrc: DEFAULT_PRAYER_IMAGE.src,
    iconCaption: 'Kristus Pantokrator \u00B7 Sinai, Abad VI',
    iconAlt: 'Ikon Kristus Pantokrator dari Sinai',
  },
  arabic: {
    name: 'Arab \u00B7 Bahasa Arab',
    original: 'يا رب يسوع المسيح، يا ابن الله، ارحمني أنا الخاطئ.',
    transliteration: "Ya Rabb Yasū' al-Masīḥ, yā ibn Allāh, irhamnī anā al-khāṭi'",
    meaning: 'Tuhan Yesus Kristus, Putra Allah, kasihanilah aku, orang berdosa ini.',
    iconSrc: DEFAULT_PRAYER_IMAGE.src,
    iconCaption: 'Ikon Kristus \u00B7 Tradisi Arab',
    iconAlt: 'Ikon Kristus untuk tradisi Arab',
  },
};

const COUNT_DESC = {
  33: 'Usia Kristus saat wafat \u00B7 Tradisi devosi',
  50: 'Tradisi umum monastik \u00B7 Setara 1 dekade chotki',
  100: 'Satu rangkaian penuh chotki Ortodoks',
  200: 'Dua rangkaian \u00B7 Praktik pertapa',
};

const CLOSING_QUOTES = [
  // --- KELOMPOK 1: DOA, HESIKASME, & DOA YESUS ---
  {
    text: '"Jika kamu berdoa tanpa henti, kamu akan menemukan ketenangan jiwa dan persatuan dengan Allah."',
    source: 'St. Yohanes Klimakos, Tangga Ilahi'
  },
  {
    text: '"Doa Yesus adalah nafas jiwa. Ucapkanlah dengan bibir, pikiran, dan hati."',
    source: 'St. Theophan sang Pertapa'
  },
  {
    text: '"Nama Yesus mengandung semua kebaikan Allah dan segala kasih karunia yang kita butuhkan."',
    source: 'St. Hesychios dari Sinai'
  },
  {
    text: '"Teruslah memanggil nama Tuhan Yesus sampai nama itu berakar dalam hatimu dan tidak ada yang lain selain Dia."',
    source: 'St. Yohanes Krisostomus'
  },
  {
    text: '"Ketika pikiranmu terganggu oleh banyak pikiran, larilah ke dalam doa Yesus. Di sana kamu akan menemukan pelabuhan yang tenang."',
    source: 'St. Barsanuphius dari Gaza'
  },
  {
    text: '"Ingatan akan Allah harus lebih sering daripada nafas kita sendiri."',
    source: 'St. Gregorius dari Nazianzus'
  },
  {
    text: '"Janganlah melatih pikiranmu untuk memikirkan hal lain saat berdoa, melainkan ikatlah pikiran itu ke dalam kata-kata doa itu sendiri."',
    source: 'St. Nilus dari Sinai'
  },
  {
    text: '"Doa adalah obat kehidupan, penyembuh jiwa, dan benteng yang tak tergoyahkan bagi iman."',
    source: 'St. Kiprianus dari Kartago'
  },
  {
    text: '"Ketika engkau menutup pintu kamarmu untuk berdoa, ingatlah bahwa engkau juga harus menutup pintu hatimu dari segala pikiran duniawi."',
    source: 'St. Ambrosius dari Milan'
  },
  {
    text: '"Doa adalah cermin dari kemajuan rohani seseorang; jika engkau ingin melihat di mana jiwamu berada, lihatlah bagaimana engkau berdoa."',
    source: 'St. Ishak dari Niniwe'
  },

  // --- KELOMPOK 2: KEHENINGAN & KEMURNIAN HATI ---
  {
    text: '"Diam dalam doa adalah lebih bernilai dari seribu kata tanpa hati."',
    source: 'Amsal Para Bapa Gurun'
  },
  {
    text: '"Keheningan adalah bahasa abad yang akan datang, sementara kata-kata adalah instrumen dari dunia ini."',
    source: 'St. Ishak dari Niniwe'
  },
  {
    text: '"Sama seperti cermin yang bersih memantulkan cahaya matahari, demikian pula hati yang murni memantulkan terang Kristus."',
    source: 'St. Diadochos dari Photiki'
  },
  {
    text: '"Sama seperti lalat tidak akan hinggap di atas kuali yang mendidih, demikian pula iblis tidak mendekati jiwa yang membara oleh doa."',
    source: 'Abba Poemen'
  },
  {
    text: '"Jagalah hatimu dengan segala kewaspadaan, karena dari sanalah terpancar mata air kehidupan rohanimu."',
    source: 'St. Hesychios dari Sinai'
  },
  {
    text: '"Keheningan luar tanpa keheningan batin seperti kuburan yang dicat putih: tampak tenang di luar, penuh kekacauan di dalam."',
    source: 'St. Basil yang Agung'
  },
  {
    text: '"Pikiran yang murni adalah pikiran yang telah terbebas dari ketidaktahuan dan diterangi oleh cahaya ilahi."',
    source: 'St. Maksimus Pengaku Iman'
  },
  {
    text: '"Ketika badai emosi mereda di dalam hatimu, barulah engkau dapat mendengar bisikan lembut dari Roh Kudus."',
    source: 'St. Diadochos dari Photiki'
  },

  // --- KELOMPOK 3: KERENDAHAN HATI & PERJUANGAN ROHANI ---
  {
    text: '"Di mana ada kerendahan hati, di sana ada kasih; dan di mana ada kasih, di sana ada Allah."',
    source: 'St. Agustinus dari Hippo'
  },
  {
    text: '"Jika kamu ingin naik ke surga, turunlah terlebih dahulu dalam kerendahan hati. Sebab tangga menuju ke atas dibangun dari kerendahan hati."',
    source: 'St. Yohanes Krisostomus'
  },
  {
    text: '"Pergilah, duduklah di dalam kamarmu, dan kamarmu akan mengajarkan segala sesuatu kepadamu."',
    source: 'Abba Moses dari Gurun Scetis'
  },
  {
    text: '"Jika seorang manusia tidak berkata dalam hatinya, \\"Hanya ada aku dan Allah di dunia ini,\\" ia tidak akan menemukan kedamaian."',
    source: 'Abba Alonios'
  },
  {
    text: '"Kerendahan hati adalah satu-satunya jaring yang tidak dapat dirobek atau dilewati oleh musuh jiwa kita."',
    source: 'Abba Anthony yang Agung'
  },
  {
    text: '"Lebih baik seorang berdosa yang berjalan dengan kerendahan hati daripada seorang benar yang berjalan dengan kesombongan."',
    source: 'Abba Siluanus'
  },
  {
    text: '"Sama seperti garam yang memberikan rasa pada semua makanan, demikian pula kerendahan hati memberikan keindahan pada semua kebajikan."',
    source: 'St. Yohanes Klimakos'
  },
  {
    text: '"Jika engkau melihat seseorang jatuh ke dalam dosa, jangan menghakiminya; tetapi hakimilah dirimu sendiri yang mungkin akan jatuh esok hari."',
    source: 'Abba Poemen'
  },
  {
    text: '"Sifat malas adalah musuh bagi jiwa. Oleh karena itu, kita harus selalu menyibukkan diri dengan pekerjaan tangan atau doa."',
    source: 'St. Benediktus dari Nursia'
  },

  // --- KELOMPOK 4: KASIH, INKARNASI, & IMAN ---
  {
    text: '"Dia yang mengasihi Allah tidak dapat tidak mengasihi setiap manusia seperti dirinya sendiri."',
    source: 'St. Maksimus Pengaku Iman'
  },
  {
    text: '"Putra Allah menjadi manusia, agar kita, manusia, dapat menjadi anak-anak Allah."',
    source: 'St. Athanasius dari Aleksandria'
  },
  {
    text: '"Kau telah menciptakan kami untuk Diri-Mu, ya Tuhan, dan hati kami tidak akan tenang sampai ia beristirahat di dalam-Mu."',
    source: 'St. Agustinus dari Hippo'
  },
  {
    text: '"Doa adalah perisai bagi mereka yang melangkah maju, benteng bagi mereka yang bertahan, dan obat bagi mereka yang terluka."',
    source: 'St. Efraim dari Siria'
  },
  {
    text: '"Tuhan tidak meminta kita sukses dalam segala hal, Dia hanya meminta kita untuk setia dan mencoba."',
    source: 'St. Jerome'
  },
  {
    text: '"Kasih kepada musuh adalah tanda tertinggi bahwa seseorang telah memiliki Roh Kristus di dalam hatinya."',
    source: 'St. Silouan dari Gunung Athos'
  },
  {
    text: '"Satu jiwa yang diselamatkan lebih berharga daripada seluruh dunia materi dengan segala kekayaannya."',
    source: 'St. Makarios yang Agung'
  },
  {
    text: '"Salib Kristus adalah kunci yang membuka pintu surga; barangsiapa memikul salibnya dengan setia, ia akan masuk ke dalamnya."',
    source: 'St. Yohanes dari Damaskus'
  }
];

// â”€â”€ STATE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
let state = {
  rite: 'greek',
  count: 50,
  remaining: 50,
  sessionImages: [],
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
const bgAudio           = document.getElementById('bg-audio');

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
  manageBackgroundAudio();
}

function manageBackgroundAudio() {
  if (!ytPlayerReady || !ytPlayer) return;

  // Mainkan audio latar hanya jika suara ON dan sedang di layar doa
  if (state.soundOn && screens.prayer.classList.contains('active')) {
    ytPlayer.playVideo();
  } else {
    ytPlayer.pauseVideo();
  }
}

function getCurrentRite() {
  return RITES[state.rite] || RITES.greek;
}

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getEventImage(event, previousSrc = '') {
  if (!event || !event.files.length) return DEFAULT_PRAYER_IMAGE;

  let file = randomItem(event.files);
  if (event.files.length > 1) {
    let guard = 0;
    while (`images/${event.folder}/${file}` === previousSrc && guard < 8) {
      file = randomItem(event.files);
      guard++;
    }
  }

  return {
    src: `images/${event.folder}/${file}`,
    caption: event.title,
    alt: `Gambar peristiwa ${event.title}`,
  };
}

function getEventIndexForStep(step, total) {
  const safeTotal = Math.max(total, 1);
  const safeStep = Math.min(Math.max(step, 0), safeTotal - 1);
  return Math.min(
    PRAYER_EVENTS.length - 1,
    Math.floor((safeStep / safeTotal) * PRAYER_EVENTS.length)
  );
}

function buildSessionImages(total) {
  const images = [];
  let previousSrc = '';

  for (let step = 0; step < total; step++) {
    const eventIndex = getEventIndexForStep(step, total);
    const event = PRAYER_EVENTS[eventIndex];
    const image = getEventImage(event, previousSrc);
    images.push(image);
    previousSrc = image.src;
  }

  return images.length ? images : [DEFAULT_PRAYER_IMAGE];
}

function getSessionImageForCurrentStep() {
  const completed = state.count - state.remaining;
  const index = Math.min(completed, state.sessionImages.length - 1);
  return state.sessionImages[index] || DEFAULT_PRAYER_IMAGE;
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

function revealPrayerImageForProgress() {
  setPrayerImage(getSessionImageForCurrentStep());
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
  // set direction for RTL languages (Arabic)
  if (state.rite === 'arabic') {
    previewOriginal.dir = 'rtl';
    previewTranslit.dir = 'ltr';
    previewMeaning.dir = 'ltr';
  } else {
    previewOriginal.dir = 'auto';
    previewTranslit.dir = 'auto';
    previewMeaning.dir = 'auto';
  }
  countDesc.textContent = COUNT_DESC[state.count];
}

// â”€â”€ UPDATE PRAYER UI â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function updatePrayerUI() {
  const rite = getCurrentRite();
  prayerRiteLabel.textContent = rite.name;
  if (state.sessionImages.length !== state.count) {
    state.sessionImages = buildSessionImages(state.count);
  }
  setPrayerImage(getSessionImageForCurrentStep(), false);
  prayerOrigText.innerHTML = rite.original;
  prayerTranslit.textContent = rite.transliteration;
  // set direction for Arabic prayer text
  if (state.rite === 'arabic') {
    prayerOrigText.dir = 'rtl';
    prayerTranslit.dir = 'ltr';
  } else {
    prayerOrigText.dir = 'auto';
    prayerTranslit.dir = 'auto';
  }
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
  revealPrayerImageForProgress();
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
  state.sessionImages = [];
  updateSetupUI();
});

// Start prayer
startBtn.addEventListener('click', () => {
  state.remaining = state.count;
  state.sessionImages = buildSessionImages(state.count);
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
  state.sessionImages = buildSessionImages(state.count);
  setPrayerImage(getSessionImageForCurrentStep(), false);
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
    manageBackgroundAudio();
  }
});

// Done â€” repeat
doneRepeatBtn.addEventListener('click', () => {
  state.remaining = state.count;
  state.sessionImages = buildSessionImages(state.count);
  updatePrayerUI();
  showScreen('prayer');
});

// Done â€” home
doneHomeBtn.addEventListener('click', () => showScreen('setup'));

// â”€â”€ INIT â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
updateSetupUI();
updateSoundButton();
showScreen('setup');
