Berikut adalah **Product Requirement Document (PRD)** untuk pengembangan Web App "Doa Puja Yesus" (Jesus Prayer). Dokumen ini dirancang agar tim developer dan desainer memiliki panduan yang jelas dan terstruktur.

# **Product Requirement Document (PRD)**

## **Project Name: Web App Doa Puja Yesus (The Jesus Prayer Across Rites)**

## **1\. Executive Summary**

### **1.1 Project Overview**

Aplikasi web ini dirancang sebagai wadah spiritual digital bagi umat Kristen (Lintas Ritus: Katolik, Ortodoks, Timur) untuk mendaraskan **Doa Puja Yesus (The Jesus Prayer)**. Aplikasi ini menyediakan fleksibilitas jumlah hitungan doa (33, 50, 100, 200\) serta mendukung berbagai bahasa dan ritus, lengkap dengan teks, audio pelafalan (*pronunciation*), dan visualisasi ikon Yesus yang meditatif.

### **1.2 Core Value Proposition**

* **Multikultural & Multiritus:** Menyatukan tradisi doa kontemplatif dari berbagai bahasa dan tradisi gereja.  
* **User-Centric Counter:** Menggantikan tali doa fisik (*chotki/lestovka/rosario*) dengan penghitung digital yang intuitif.  
* **Keindahan Estetika Tradisional:** Menggunakan desain berbasis seni ikonografi Kristen klasik.

## **2\. Target Audience & User Persona**

* **Umat Katolik & Ortodoks:** Yang mempraktikkan doa kontemplatif atau Hesikasme.  
* **Praktisi Spiritual Tradisional:** Umat yang ingin mendalami akar doa Kristen kuno (Bahasa Yunani, Aramaik, Slavia, dll).  
* **Modern Believers:** Umat yang bermobilitas tinggi dan membutuhkan sarana doa digital yang khusyuk di mana saja.

## **3\. Product Features & Scope**

### **3.1 Feature Matrix**

| Feature | Description | Priority |
| :---- | :---- | :---- |
| **Ritus & Bahasa Selector** | Pengguna bisa memilih doa berdasarkan bahasa (Yunani, Latin, Aramaik, Slavia, Arab, Indonesia, dll) dan ritus (Ortodoks Bizantin, Katolik Roma, Siriak). | **P1 (Must Have)** |
| **Hitungan Doa (Chotki Digital)** | Pilihan jumlah repetisi doa: **33, 50, 100, atau 200 kali**. Sistem memiliki tombol *tap* besar untuk menghitung mundur/maju. | **P1 (Must Have)** |
| **Teks & Audio Pronunciation** | Menampilkan teks asli (misal alfabet Yunani/Sirilik), transliterasi Latin, arti, serta **audio pelafalan** yang benar. | **P1 (Must Have)** |
| **Ikon Yesus (Display)** | Setiap mode doa/ritus akan menampilkan visualisasi **Ikon Yesus** (seperti *Christ Pantocrator*, *The Savior Not Made by Hands*, dll) sebagai fokus meditasi. | **P1 (Must Have)** |
| **Haptic Feedback & Sound** | Getaran halus (*haptic*) pada smartphone atau suara ketukan kayu halus setiap kali tombol doa di-*tap*. | P2 (Should Have) |
| **History & Streak** | Catatan harian untuk melacak rutinitas doa pengguna. | P3 (Nice to Have) |

## **4\. User Journey & Flow**

1. **Landing Page / Home:** Pengguna disambut dengan visual minimalis dan langsung dihadapkan pada pengaturan doa.  
2. **Konfigurasi Doa:**  
   * Pilih Jumlah: **33 | 50 | 100 | 200**  
   * Pilih Bahasa/Ritus: (Contoh: *Yunani \- Kyrie Iesou Christe...*)  
3. **Mode Doa (Sesi Aktif):**  
   * Layar beralih ke mode penuh (*fullscreen/meditative mode*).  
   * Ikon Yesus terpampang di tengah sebagai fokus pandangan.  
   * Pengguna menekan tombol *tap* (atau area layar bawah) sambil mendaraskan doa.  
   * Angka sisa doa berkurang (misal dari 33 menuju 0).  
4. **Sesi Selesai:** Muncul kutipan ayat kitab suci atau perkataan Bapa Gurun/Orang Kudus sebagai penutup doa.

## **5\. Design & Assets Requirements (UI/UX)**

⚠️ **Catatan Penting untuk Tim Desain:** Aset visual berupa **Ikon Yesus tidak boleh menggunakan AI Generator**. Desainer wajib mencari, mengurasi, dan menggunakan reproduksi Ikon Kristen tradisional yang sah secara hak cipta/domain publik dari sumber otentik (seperti Wikimedia Commons, arsip museum, atau Pinterest untuk referensi gaya klasik).

### **5.1 Tema & Estetika UI**

* **Tone & Mood:** Sakral, tenang, meditatif, bersih, dan tidak banyak distraksi (*dark mode-friendly* untuk mendukung doa di malam hari).  
* **Warna Utama:** Emas tua (Gold), Merah Burgundy, Biru Dongker, dan Hitam/Arang (mencerminkan warna-warna ikonografi Bizantin tradisional).  
* **Tipografi:** Menggunakan font Serif yang elegan dan mudah dibaca (misal: *Cinzel*, *Playfair Display*, atau font bergaya *Uncial/Slavic* modern untuk judul).

### **5.2 Referensi Gaya Ikon Yesus (Untuk Riset di Pinterest/Google)**

1. **Ritus Bizantin/Ortodoks:** *Christ Pantocrator (Sinai)*, *Rublev's Saviour*.  
2. **Ritus Barat/Katolik:** *Sacred Heart of Jesus* (gaya klasik), *Christ in Majesty*.  
3. **Ritus Timur Tengah (Siriak/Koptik):** Ikonografi Koptik kuno yang khas dengan mata besar yang meditatif.

## **6\. Technical & Non-Functional Requirements**

* **Platform:** Responsive Web Application (dioptimalkan untuk Mobile Web/PWA agar bisa di-*install* di *home screen* HP tanpa lewat App Store).  
* **Teknologi (Rekomendasi):** React.js / Next.js (Frontend), Tailwind CSS (Styling), Web Audio API (untuk kelancaran audio *pronunciation* dan sound effect).  
* **Performa:** Sangat ringan, waktu muat halaman (\< 2 detik) karena mengutamakan kekhusyukan pengguna.  
* **Aksesibilitas:** Kontras teks yang tinggi dan ukuran tombol *tap* yang ramah untuk segala usia (termasuk lansia).

## **7\. Referensi Data Doa (Sampel Konten)**

| Ritus / Bahasa | Teks Asli | Transliterasi / Pelafalan | Arti (Indonesia) |
| :---- | :---- | :---- | :---- |
| **Yunani (Bizantin)** | Κύριε Ἰησοῦ Χριστέ, Υἱὲ τοῦ Θεοῦ, ἐλέησόν με τὸν ἁμαρτωλόν. | *Kyrie Iesou Christe, Yie tou Theou, eleison me ton hamartolon.* | "Tuhan Yesus Kristus, Putra Allah, kasihanilah aku, orang berdosa ini." |
| **Latin (Barat)** | *Domine Iesu Christe, Fili Dei, miserere mei, peccatoris.* | *Domine Iesu Christe, Fili Dei, miserere mei, peka-toris.* | "Tuhan Yesus Kristus, Putra Allah, kasihanilah aku, orang berdosa ini." |
| **Aramaik/Siriak** | ܡܳܪܝ ܝܶܫܽܘܥ ܡܫܺܝܚܳܐ ܒܪܶܗ ܕܐܰܠܳܗܳܐ ܪܰܚܶܡ ܥܠܰܝ ܚܰܛܳܝܳܐ. | *Mor Yeshue Mshicho, Breh d'Aloho, rachem alai chatoyo.* | "Tuhan Yesus Kristus, Putra Allah, kasihanilah aku, orang berdosa ini." |

## **8\. Key Metrics for Success (KPIs)**

* **Retention Rate:** Pengguna kembali membuka aplikasi setiap hari (membangun kebiasaan doa).  
* **Session Duration:** Pengguna menyelesaikan sesi doa mereka sesuai target angka yang dipilih (33-200) tanpa menutup aplikasi di tengah jalan.  
* **Audio Play Success Rate:** Audio pelafalan berputar dengan instan tanpa *buffering* yang mengganggu ritme doa.