# KIBI — Cinematic Digital Solutions

> **Tagline:** *We build digital experiences that make businesses work better.*

## Deskripsi Singkat

KIBI adalah prototype landing page company profile untuk studio digital yang memadukan desain editorial premium, interaksi sinematik, dan teknologi web modern. Halaman ini dirancang untuk memperlihatkan bagaimana KIBI mengubah kebutuhan bisnis yang kompleks menjadi pengalaman digital yang jelas, menarik, dan mudah digunakan.

## Project Overview

KIBI dikembangkan sebagai eksplorasi identitas digital untuk studio yang membantu bisnis menerjemahkan ide, masalah, dan peluang menjadi produk digital yang praktis—mulai dari website, sistem bisnis, hingga digital experience.

Fokus utama proyek ini adalah menciptakan first impression yang kuat tanpa mengorbankan kejelasan pesan. Karena itu, halaman menggunakan komposisi minimal dengan satu visual hero kubus 3D sebagai pusat perhatian. Kubus merespons posisi kursor pengunjung: bergerak maju saat kursor berada di sisi kanan layar dan mundur saat berada di sisi kiri.

Melalui perpaduan tampilan gelap sinematik, tipografi yang bersih, efek glassmorphism, dan animasi Canvas yang responsif, proyek ini merepresentasikan pendekatan KIBI: desain dan teknologi bekerja bersama untuk membuat bisnis bekerja lebih baik.


---

## Case Study

### Problem Statement

Banyak studio digital dan konsultan teknologi menghadapi tantangan saat menjelaskan layanan yang kompleks. Penawaran seperti website, sistem bisnis, dan pengalaman digital sering terasa terlalu teknis atau sulit dibedakan dari kompetitor hanya melalui copywriting biasa.

KIBI membutuhkan halaman pembuka yang mampu:

- Menyampaikan positioning bisnis secara singkat dan jelas.
- Menciptakan kesan premium, modern, dan berorientasi teknologi sejak interaksi pertama.
- Mengubah konsep abstrak “design + technology” menjadi pengalaman visual yang mudah dirasakan.
- Tetap ringan, responsif, dan dapat digunakan pada perangkat modern tanpa mengorbankan aksesibilitas.

### Design Process

#### 1. Menentukan arah visual dan pesan

Fondasi desain dimulai dari pesan utama: teknologi seharusnya membuat bisnis bekerja lebih baik. Pesan ini diterjemahkan menjadi desain yang minimal, editorial, dan berfokus pada satu objek visual utama agar perhatian pengunjung tidak terpecah.

#### 2. Membangun visual system

Sistem visual menggunakan latar gelap sinematik, tipografi Inter yang bersih, warna putih lembut, serta aksen ungu yang terkontrol. Kombinasi ini memberi nuansa futuristik tanpa membuat informasi inti sulit dibaca.

Elemen pendukung seperti panel kaca transparan, garis gelombang animatif, bayangan lembut, dan custom cursor digunakan untuk memperkuat kedalaman pengalaman.

#### 3. Merancang interaksi hero

Kubus 3D menjadi pusat narasi visual. Alih-alih memakai video yang diputar biasa, animasi dibagi menjadi rangkaian frame WebP dan dirender melalui Canvas 2D.

Interaksi dirancang sederhana dan intuitif:

- Kursor berada di sisi kanan viewport: animasi kubus bergerak maju.
- Kursor berada di sisi kiri viewport: animasi kubus bergerak mundur.
- Animasi berhenti pada frame awal atau akhir agar perubahan arah tetap stabil.

Pendekatan ini menciptakan pengalaman eksploratif yang terasa tactile, tanpa memerlukan kontrol video yang eksplisit.

#### 4. Menjaga performa dan aksesibilitas

Seluruh frame hero dimuat dan didekode lebih dulu sebelum interaksi aktif. Poster statis tetap ditampilkan selama proses pemuatan agar halaman tidak tampak kosong.

Desain juga mempertimbangkan kebutuhan pengguna dengan preferensi gerakan rendah melalui `prefers-reduced-motion`, serta memakai struktur HTML semantik, heading utama, teks alternatif gambar, dan label Canvas yang deskriptif.

### Result & Impact

Prototype ini menghasilkan company profile yang tidak hanya menjelaskan layanan KIBI, tetapi juga mendemonstrasikan kualitas pengalaman digital yang ingin ditawarkan.

**Dampak utama:**

- **Positioning lebih kuat:** headline dan deskripsi langsung menjelaskan nilai bisnis KIBI.
- **First impression yang berkesan:** interaksi kubus membuat landing page lebih memorable dibanding hero statis.
- **Demonstrasi kapabilitas:** perpaduan desain, motion, dan implementasi Canvas menunjukkan kompetensi design dan technology dalam satu pengalaman.
- **Interaksi yang stabil:** penggunaan image sequence menghindari masalah reverse video seeking dan perpindahan decoder saat arah animasi berubah.
- **Pengalaman yang inklusif:** animasi dan cursor tambahan tidak dipaksakan bagi pengguna yang memilih reduced motion.

> Catatan: proyek ini merupakan prototype, sehingga dampak di atas menggambarkan hasil desain dan teknis yang tervalidasi pada implementasi saat ini—bukan metrik konversi atau analitik pengguna produksi.

---

## Learning & Reflection

### Learning

- Interaksi yang sederhana dapat menciptakan kesan kuat ketika selaras dengan pesan brand.
- Rangkaian image sequence dan Canvas dapat menjadi alternatif yang lebih deterministik untuk kontrol animasi dua arah dibanding video yang di-seek secara berulang.
- Preloading dan decoding aset visual adalah bagian penting dari kualitas pengalaman, bukan sekadar optimasi tambahan.
- Aksesibilitas perlu dirancang sejak awal; efek motion harus selalu memiliki perilaku yang menghormati preferensi pengguna.
- Desain premium tidak selalu membutuhkan banyak elemen. Hierarki yang tegas, kontras yang baik, dan motion yang terarah dapat menghasilkan pengalaman yang lebih efektif.

### Reflection

KIBI menunjukkan bahwa halaman company profile dapat berperan sebagai produk pengalaman, bukan hanya halaman informasi. Ke depan, prototype ini dapat dikembangkan dengan halaman studi kasus, portofolio layanan, formulir kontak yang terhubung ke backend, dan pengukuran analitik untuk mengetahui efektivitas interaksi hero terhadap engagement maupun conversion.

Peluang penyempurnaan lainnya adalah menerapkan progressive loading untuk frame animasi pada koneksi yang lebih lambat, menambahkan navigasi yang berfungsi penuh, serta melakukan usability testing untuk memastikan interaksi berbasis posisi kursor tetap mudah dipahami oleh pengguna baru.

---

## Tech Stack

| Area | Technology | Peran |
| --- | --- | --- |
| Structure | HTML5 | Struktur konten semantik untuk landing page. |
| Styling | Vanilla CSS | Animasi, responsive behavior, visual treatment, dan preference reduced motion. |
| UI utilities | Tailwind CSS CDN | Utility class untuk layout dan styling cepat pada markup. |
| Interactivity | Vanilla JavaScript | Cursor interaction, preloading frame, serta kontrol arah animasi. |
| Hero animation | Canvas 2D + WebP image sequence | Rendering animasi kubus dua arah secara stabil. |
| Typography | Google Fonts — Inter | Tipografi utama antarmuka. |
| Asset preparation | FFmpeg | Mengekstrak dan mengoptimalkan sumber video menjadi frame WebP. |

## Project Structure

```text
.
├── index.html
├── CASE_STUDY.md
└── assets
    ├── css/styles.css
    ├── frames/cube-001.webp … cube-215.webp
    ├── images/hero-cube.jpg
    ├── js/script.js
    └── videos/
```

## Run Locally

Jalankan proyek melalui local HTTP server agar asset dapat dimuat dengan benar:

```powershell
python -m http.server 8000
```

Buka `http://localhost:8000` pada browser modern yang mendukung Canvas 2D dan WebP.
