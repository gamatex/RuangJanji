# RuangJanji Native Android

Migrasi Android ke **Kotlin + Jetpack Compose**. Dua product flavors: `ruangjanji` dan `bukutamu`. Website undangan dan backend Supabase tetap dipertahankan.

Prototipe Android Studio fase fondasi telah dibuat sebagai ZIP dalam percakapan proyek. **Belum ditambahkan ke repositori** dan **belum lolos build/perangkat**; jangan menganggap ini APK final.

Prioritas implementasi: (1) build dan smoke test native; (2) token refresh + encrypted storage + OAuth native; (3) event/guestbook native lengkap termasuk QR, ekspor laporan, impor XLSX; (4) editor undangan dan checkout native; (5) uji dua akun, RLS, kamera, offline, dan pembayaran; (6) signing dua APK release.

Gunakan hanya publishable Supabase key di klien. Semua operasi sensitif melalui RPC dan RLS.
