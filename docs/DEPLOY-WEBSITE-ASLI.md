# Migrasi website asli RuangJanji

Sumber: arsip `Ruang-Janji-Paket-Domain(1).zip` (ekspor 5 November 2026).

**PENTING**: arsip website berisi 363 entri dengan aset biner (gambar/audio/video), dan belum sepenuhnya terunggah ke repository. Jangan mengubah Wrangler ke `public_html` sebelum folder tersebut diunggah.

1. Ekstrak ZIP website.
2. Salin folder `public_html/` secara utuh ke root repository (sejajar dengan `apps/`, `packages/` dan `wrangler.toml`). Jangan hapus folder aplikasi yang sudah ada.
3. Pastikan file `public_html/index.html` dan `public_html/catalog-data.js` serta `public_html/catalog-assets/` ikut tersimpan.
4. Setelah semua aset selesai terunggah, ubah `wrangler.toml` ke `[assets] directory = "./public_html"`.
5. Deploy dari GitHub `main` lewat Cloudflare Workers. Situs akan tampil dari root domain; katalog bisa dilihat tanpa login.
6. Periksa tautan template, checkout, gambar, audio dan video.

**Belum terintegrasi**: checkout dan invoice pada arsip masih memakai localStorage, belum ada pembayaran server-side dan sinkronisasi Supabase. Jangan menerima pembayaran produksi sebelum backend diverifikasi.

**Keamanan**: Konfigurasi lama `[assets] directory = "."` tidak cocok untuk produksi karena berisiko mempublikasikan file repository. Ganti ke `./public_html` segera setelah upload lengkap.
