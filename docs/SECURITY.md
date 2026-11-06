# Keamanan dan akses

- Seluruh tabel yang diekspos melalui Data API harus menggunakan RLS.
- Pemilik hanya boleh membaca dan mengubah acara serta pesanan miliknya.
- Operator buku tamu hanya boleh mengakses acara yang diberikan kepadanya.
- QR dan kode souvenir harus divalidasi server-side agar tidak bisa dipakai ulang.
- Kunci service_role dan kredensial penyedia WhatsApp disimpan di server/secret manager, bukan APK.
- Verifikasi nomor WhatsApp wajib melalui provider nyata sebelum dinyatakan selesai.
- Audit aturan RLS dan fungsi SECURITY DEFINER sebelum rilis.
