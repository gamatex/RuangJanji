# Pemetaan terverifikasi dari HTML: 27 template

Diperiksa 2026-11-08 melalui file asli `templates/*.html` pada repositori. Kolom gambar menghitung tag gambar yang memiliki `src` (bukan gambar latar CSS); slot foto menghitung `data-photo-slot`. Animasi adalah kelas yang ditemukan di HTML, bukan bukti bahwa efeknya sudah berfungsi identik dengan referensi.

| Template | CSS di `catalog-assets` | Musik MP3 di `catalog-assets` | Gambar HTML | Slot foto | Kelas animasi |
|---|---|---|---:|---:|---|
| art-01 | `8c3dab4bf38efeb104c0.css` | `f261c59c701ffc6e05aa.mp3` | 11 | 4 | bounceIn,zoomIn,fadeInDown,fadeInUp |
| art-02 | `f2252c75ae1f24e6a659.css` | `7fc5c0dc864fc1c0b025.mp3` | 6 | 4 | bounceIn,zoomIn,fadeInDown |
| art-03 | `fcc1ee9cb87ba3c85f5d.css` | `f261c59c701ffc6e05aa.mp3` | 6 | 4 | bounceIn,zoomIn,fadeInDown |
| art-04 | `34193d93fd1255622e05.css` | `f37e6895f1b81f3ceb59.mp3` | 6 | 4 | bounceIn,zoomIn,fadeInDown,fadeInUp,fadeInLeft |
| birthday-01 | `0e61dc6a88c157a3c35a.css` | `7ef6bf609f0fe64d26a8.mp3` | 18 | 2 | fadeInUp |
| birthday-02 | `9751537d177e40de8fc0.css` | `7ef6bf609f0fe64d26a8.mp3` | 19 | 2 | fadeInUp |
| deluxe-01 | `a082ab9dae4201b14d2d.css` | `f9e772f0ef16f70e1cad.mp3` | 6 | 6 | bounceIn,zoomIn |
| deluxe-02 | `565ab1f3400c2f010c7a.css` | `c760b42350ddab0ddc9b.mp3` | 21 | 6 | bounceIn,zoomIn |
| deluxe-03 | `bc9a3c9227ce0783091c.css` | `3a7298689c8e9a8dd61d.mp3` | 4 | 8 | bounceIn,zoomIn |
| deluxe-04 | `a6acd4de20501db0302a.css` | `078e73dec401c9bc5795.mp3` | 4 | 11 | bounceIn,zoomIn |
| deluxe-05 | `3affc7c64b83b7d271f0.css` | `fa295899b9d4391f0ff0.mp3` | 4 | 8 | bounceIn,zoomIn |
| deluxe-06 | `1509689e8b18c4f0705b.css` | `1580ecd64020ec5885f3.mp3` | 4 | 7 | bounceIn,zoomIn |
| deluxe-07 | `91ea292699650cebeddc.css` | `a239b36723d4c08deb22.mp3` | 4 | 10 | bounceIn,zoomIn |
| deluxe-08 | `4d37ca9960dfdcefa172.css` | Tidak direferensikan | 4 | 6 | bounceIn,zoomIn |
| minisite-01 | `73e2e0b8e7b85de2a61a.css` | Tidak direferensikan | 46 | 1 | fadeInUp |
| minisite-02 | `4a13fdda90f92eb062d7.css` | `fa295899b9d4391f0ff0.mp3` | 27 | 0 | fadeInLeft,fadeInUp |
| minisite-03 | `7672c9ecc98305f09584.css` | `db691f9eb65ba1ee0c71.mp3` | 41 | 1 | fadeInDown,fadeInUp,zoomIn |
| minisite-04 | `b9f07807e417b27784ca.css` | `30fbe683edd7928ee065.mp3` | 41 | 1 | fadeInDown,fadeInUp |
| minisite-05 | `6817f3ab040504e122d0.css` | `e575b188922150b35f8a.mp3` | 41 | 3 | fadeInDown,fadeInUp,zoomIn |
| minisite-06 | `b65c8665a4188cd263f2.css` | `7ea8c59ceac49dfbf7c5.mp3` | 24 | 1 | fadeInDown,zoomIn,fadeInUp |
| minisite-07 | `4550532a5c6da77c1c8f.css` | `66b2b844ab38be6a91b6.mp3` | 26 | 3 | fadeInDown,fadeInUp,zoomIn |
| minisite-08 | `803abe658e56502a83b2.css` | `078e73dec401c9bc5795.mp3` | 31 | 3 | fadeInDown,fadeInUp,zoomIn |
| minisite-09 | `cae0982389071be7e53a.css` | `8d6e414913d4f379a551.mp3` | 31 | 1 | fadeInDown,fadeInUp,zoomIn |
| minisite-10 | `4b8dc394b6c7519915fb.css` | `f9e772f0ef16f70e1cad.mp3` | 31 | 3 | fadeInDown,fadeInUp,zoomIn |
| syari-01 | `01f22240cb279e1f7d55.css` | `d47543c7a779eb2ddd79.mp3` | 14 | 0 | none |
| syari-02 | `dae67f75c89ccb76432a.css` | `d47543c7a779eb2ddd79.mp3` | 14 | 0 | none |
| syari-03 | `dfbd6a1362b2fdfa65c3.css` | `d47543c7a779eb2ddd79.mp3` | 14 | 0 | none |

## Video
- Seluruh 27 HTML: **0 referensi `<video>` atau file MP4/WebM**.
- File video `motion.mp4` tersedia di root repositori (3.843.598 byte), tetapi tidak terhubung ke template tertentu dalam HTML yang diaudit. Jangan memasangnya secara acak.
- File MP3 pada HTML ditemukan untuk 25 dari 27 template. Dua pengecualian: `deluxe-08`, `minisite-01`.

## Batas cakupan dan pekerjaan tersisa
- CSS setiap template berukuran besar (sekitar 1–2 MB). Audit semua `url()` gambar latar dan efek animasi CSS masih harus dijalankan untuk membuktikan pemetaan lapisan dekorasi lengkap.
- File gambar pada CSS bisa tidak muncul sebagai tag `<img>` sehingga tabel ini **tidak** berarti seluruh gambar/latar sudah terpetakan.
- Periksa juga `srcset`, `data-src`, `data-settings`, CSS `background-image`, keyframes, pseudo-elements, serta video eksternal/iframe sebelum menyatakan pemetaan 100%.
- `scripts/map-template-media.mjs` tersedia untuk menghasilkan `reports/template-media-map.json` saat build, tetapi laporan tersebut belum diverifikasi dari hasil build pada sesi ini.
- Pengujian browser, aset HTTP, interaksi, dan pencocokan dengan demo Kekondangan tetap diperlukan.
