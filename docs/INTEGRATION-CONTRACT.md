# Kontrak Integrasi RuangJanji v1

## Produk
1. **Website**: katalog, kategori, detail template, preview, harga, checkout, akun pelanggan, editor undangan responsif.
2. **APK RuangJanji**: akun dan undangan milik pelanggan, pembelian, editor dan pengelolaan acara.
3. **APK Buku Tamu**: akses acara yang diberi izin, daftar tamu, scan QR, check-in, souvenir, laporan.

Semua klien menggunakan Supabase project `bfaarhffvylqqbxycuds`. Tidak ada reseller.

## Urutan transaksi
- Pengunjung anonim boleh membaca katalog template yang enabled.
- Checkout memerlukan login email dan verifikasi WhatsApp resmi.
- Harga dihitung di server dari theme_prices, tidak dari nilai yang dikirim klien.
- Payment gateway mengirim webhook terverifikasi untuk menetapkan status paid.
- Pembelian yang paid menerbitkan entitlement template dan fitur buku tamu sesuai paket.
- Hanya pemilik atau petugas yang diotorisasi dapat mengakses data acara dan tamu.

## Audit database 2026-11-07
Tabel tersedia: events, guests, theme_prices (98 baris), orders, account_verifications. RLS aktif.
Kebijakan existing `events_require_whatsapp`, `guests_require_whatsapp`, `orders_require_whatsapp` adalah policy permissive ALL. PostgreSQL menggabungkan policy permissive dengan OR, sehingga policy ini **tidak** secara otomatis memaksa verifikasi WhatsApp pada setiap operasi yang diizinkan policy lain. Jangan anggap syarat verifikasi aman sebelum restrukturisasi kebijakan dan pengujian.
Status orders hanya pending/paid/cancelled; jangan izinkan frontend mengubah status paid secara langsung.
Tidak ada alur pembayaran produksi atau integrasi provider OTP yang terverifikasi saat ini.

## Prioritas keamanan sebelum produksi
1. Rancang policy restrictive atau gabungkan syarat verifikasi dengan policy akses per operasi.
2. Pastikan pelanggan tidak dapat mengubah status paid dan harga pesanan.
3. Simpan kunci payment gateway dan WhatsApp hanya pada backend.
4. Gunakan operasi check-in atomik di server; jangan mengandalkan update timestamp langsung dari dua perangkat.
5. Tambahkan model penugasan petugas dan entitlement per acara.
6. Uji akses antar-akun serta kasus check-in ganda.

## Migrasi website asli
Website referensi asli: https://ruang-janji-undangan.dhjougkyha.chatgpt.site/
Jangan mengganti dengan storefront generik. Impor sumber dan aset asli setelah arsip proyek tersedia, lalu sesuaikan route, auth, katalog, dan deployment.
