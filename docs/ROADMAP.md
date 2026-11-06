# Rencana implementasi

1. Audit skema Supabase: events, guests, theme_prices, orders, account_verifications; verifikasi RLS, fungsi dan migrasi.
2. Katalog: kategori, preview template, pencarian, detail, checkout dan riwayat order.
3. Autentikasi: email dan verifikasi nomor WhatsApp via penyedia resmi; jangan menganggap OTP sudah aktif sebelum diuji.
4. Editor: data mempelai, jadwal, lokasi, galeri, RSVP, musik, domain/slug undangan dan publikasi.
5. Buku tamu: daftar tamu per acara, QR check-in, deduplikasi, pengambilan souvenir, sinkronisasi dan laporan.
6. Integrasi template: 27 halaman lengkap, 70 preview-only, 1 asset-only (status audit terdahulu, perlu verifikasi).
7. Build Android terpisah dan pengujian end-to-end di perangkat fisik.

## Batasan
Tidak ada fitur reseller. Kedua aplikasi menggunakan satu backend dengan isolasi data per pemilik/acara. Jangan menyalin kode atau aset berhak cipta dari APK referensi.
