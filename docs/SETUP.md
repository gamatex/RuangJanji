# Menjalankan aplikasi tahap awal

## Yang sudah tersedia
- `apps/ruangjanji/index.html`: login email, katalog harga template, membuat draft acara.
- `apps/buku-tamu/index.html`: login email, tamu per acara, check-in manual, souvenir.
- `packages/shared/style.css`: tema visual.

## Persiapan
1. Buka Supabase > Project Settings > API Keys.
2. Ambil **publishable key** (`sb_publishable_...`), bukan secret atau service_role.
3. Untuk pengembangan lokal, buka konsol browser pada origin aplikasi dan jalankan:
   `localStorage.setItem('rj_publishable_key', 'ISI_PUBLISHABLE_KEY')`
   lalu refresh. Ini hanya solusi pengembangan sementara, bukan konfigurasi rilis.
4. Jalankan server statis dari root repository, contoh: `python -m http.server 8080`.
5. Buka `http://localhost:8080/apps/ruangjanji/` atau `http://localhost:8080/apps/buku-tamu/`.
6. Pastikan redirect URL/email confirmation sesuai origin yang dipakai.

## Belum selesai
- Verifikasi WhatsApp, pembayaran dan konfirmasi pembayaran server-side.
- Editor undangan lengkap, halaman undangan publik, preview aset asli.
- Pemindai QR kamera, pencetakan, mode offline dan sinkronisasi.
- Akses petugas terdelegasi; saat ini daftar acara dibatasi pada pemilik akun.
- Pengujian RLS dan check-in atomik untuk mencegah pemakaian ulang saat dua perangkat bersamaan.
- Packaging Android, konfigurasi build, dan APK final.

**Penting:** Jangan gunakan prototipe ini untuk acara nyata sebelum alur check-in, pembayaran, otorisasi, dan keamanan diuji.
