# Panduan Publikasi Google Play Store: RuangJanji & Buku Tamu

Panduan langkah demi langkah untuk merilis **2 Aplikasi Android RuangJanji** ke Google Play Store menyerupai standar aplikasi **Kekondangan.id**.

---

## 1. Ringkasan Dua Aplikasi

| Detail | Aplikasi 1 (Mempelai) | Aplikasi 2 (Buku Tamu / Staff) |
| :--- | :--- | :--- |
| **Nama Aplikasi di Play Store** | **RuangJanji - Undangan Digital** | **RuangJanji Buku Tamu** |
| **Package ID** | `id.ruangjanji.customer` | `id.ruangjanji.guestbook` |
| **Kategori Play Store** | Gaya Hidup / Acara (*Lifestyle / Events*) | Bisnis / Acara (*Business / Events*) |
| **Format Berkas Rilis** | Android App Bundle (`.aab`) | Android App Bundle (`.aab`) |
| **Target Pengguna** | Calon Pengantin & Pemesan Undangan | Petugas Resepsi & Wedding Organizer |

---

## 2. Persiapan Berkas Signing (Release Keystore)

Sebelum membuat berkas `.aab`, Anda memerlukan kunci digital resmi (*keystore*):

1. Masuk ke folder `android/` di terminal:
   ```bash
   cd android
   ```
2. Jalankan skrip pembuat keystore otomatis:
   ```bash
   chmod +x generate-keystore.sh build-release.sh
   ./generate-keystore.sh
   ```
   *Skrip ini akan meminta Anda memasukkan password dan secara otomatis membuat `release-keystore.jks` serta `keystore.properties`.*
3. **PENTING**: Cadangkan (*backup*) berkas `release-keystore.jks` dan password-nya ke Google Drive atau tempat aman. Jika file ini hilang, Anda tidak akan bisa merilis pembaruan versi baru di Play Store.

---

## 3. Kompilasi Android App Bundle (.aab)

Untuk menghasilkan berkas `.aab` yang siap diunggah ke Google Play Console:

1. Jalankan perintah:
   ```bash
   ./build-release.sh
   ```
2. Berkas rilis akan terbentuk di lokasi:
   - **RuangJanji (Mempelai)**:
     `app/build/outputs/bundle/ruangjanjiRelease/app-ruangjanji-release.aab`
   - **RuangJanji Buku Tamu (Petugas Resepsi)**:
     `app/build/outputs/bundle/bukutamuRelease/app-bukutamu-release.aab`

---

## 4. Pengisian Data di Google Play Console

### A. Kebijakan Privasi (Privacy Policy)
Google mewajibkan tautan kebijakan privasi publik yang sah:
- **URL Kebijakan Privasi**: 
  `https://ruangjanji.dhjougkyha.workers.dev/privacy.html`
- *Catatan:* Halaman ini sudah mencakup deklarasi izin Kamera untuk pemindai barcode, getar haptik, dan enkripsi SSL/TLS sesuai UU PDP & Google Developer Policy.

### B. Kuesioner Keamanan Data (Data Safety)
Saat mengisi bagian **Keamanan Data (Data Safety)** di Play Console:
1. **Apakah aplikasi mengumpulkan data?** Ya (nama pemesan, nama tamu, email akun).
2. **Apakah data dienkripsi saat transit?** Ya (semua data menggunakan HTTPS / TLS 1.3).
3. **Apakah pengguna dapat meminta penghapusan data?** Ya (via email dukungan pengembang).
4. **Data Kamera (Khusus Buku Tamu):** 
   - Pilih: *Foto dan Video tidak dikumpulkan atau dibagikan secara permanen*.
   - Kamera hanya digunakan untuk *Ephemeral Processing* (membaca QR Code secara real-time di perangkat).

### C. Aset Grafis Wajib
Siapkan aset berikut untuk masing-masing aplikasi di Play Console:
- **Ikon Aplikasi**: 512 × 512 px, format PNG 32-bit (tanpa transparansi).
- **Grafis Fitur (Feature Graphic)**: 1024 × 500 px, format JPG atau PNG.
- **Tangkapan Layar Ponsel (Phone Screenshots)**: Minimal 4 screenshot (rasio 16:9 atau 9:16).

---

## 5. Teks Deskripsi Play Store (Siap Salin)

### Aplikasi 1: RuangJanji - Undangan Digital
- **Judul:** RuangJanji - Undangan Digital
- **Deskripsi Singkat:** Buat undangan pernikahan digital elegan, kelola tamu, dan kirim via WhatsApp.
- **Deskripsi Lengkap:**
  ```text
  Hari bahagia Anda, dimulai di sini.

  RuangJanji adalah aplikasi pembuatan dan pengelolaan undangan pernikahan digital modern yang elegan, responsif, dan mudah digunakan.

  Fitur Utama:
  • Pilihan Puluhan Tema Eksklusif: Motion, Deluxe, Art Floral, Minisite, dan Syar'i.
  • Personalisasi Lengkap: Foto prewedding, kisah cinta, waktu acara, dan peta lokasi Google Maps.
  • Manajemen Tamu & Kuota: Atur daftar tamu keluarga, sahabat, maupun rekan kerja.
  • Kirim Undangan WhatsApp 1-Klik: Tautan otomatis terpersonalisasi untuk setiap tamu.
  • Amplop Digital & Kado: Terima ucapan doa dan amplop digital langsung via transfer bank atau QRIS.
  • Live RSVP: Pantau konfirmasi kehadiran tamu secara langsung dari ponsel Anda.

  Rayakan momen sakral pernikahan Anda bersama RuangJanji.
  ```

### Aplikasi 2: RuangJanji Buku Tamu
- **Judul:** RuangJanji Buku Tamu
- **Deskripsi Singkat:** Scanner QR tamu undangan cepat, pencatatan souvenir, dan rekap kehadiran resepsi.
- **Deskripsi Lengkap:**
  ```text
  Solusi Meja Resepsi & Buku Tamu Pernikahan Digital Cepat dan Anti-Antre.

  RuangJanji Buku Tamu adalah aplikasi pendamping khusus untuk wedding organizer, panitia acara, dan petugas penerima tamu resepsi pernikahan.

  Fitur Unggulan:
  • Pemindai QR Super Cepat (CameraX 60 FPS): Scan kartu kehadiran tamu dalam hitungan milidetik.
  • Audio BEEP & Getaran Haptik: Umpan balik instan memberi kepastian scan berhasil tanpa jeda.
  • Informasi Tamu Lengkap: Menampilkan nama tamu, kategori (VIP / Keluarga / Teman), dan kuota kehadiran rombongan.
  • Pencatatan Souvenir Anti-Dobel: Tombol cepat serah-terima souvenir yang otomatis mengunci setelah diambil.
  • Mode Offline Buffer: Scan tetap berfungsi normal meski gedung resepsi atau basement hotel kehilangan sinyal internet.
  • Statistik Live Meja Resepsi: Pantau total tamu hadir, souvenir terdistribusi, dan sisa tamu secara real-time.

  Kelola meja penerima tamu acara pernikahan Anda secara profesional bersama RuangJanji Buku Tamu.
  ```

---

## 6. Jalur Rilis Rekomendasi
1. Unggah berkas `.aab` ke **Pengujian Internal (Internal Testing)** terlebih dahulu untuk uji coba di ponsel panitia.
2. Tambahkan email penguji (misal email Anda dan WO).
3. Setelah diverifikasi lancar, promosikan rilis ke jalur **Produksi (Production)** untuk peninjauan akhir oleh tim Google Play.
