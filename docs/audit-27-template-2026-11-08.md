# Audit awal 27 template RuangJanji

Tanggal: 2026-11-08. Ini audit struktur file HTML di branch main, **bukan** klaim bahwa demo sudah identik dengan referensi.

| Template | img HTML | Slot foto | Penanda data-enter | Video HTML |
|---|---:|---:|---:|---:|
| art-01 | 11 | 4 | 61 | 0 |
| art-02 | 6 | 4 | 55 | 0 |
| art-03 | 6 | 4 | 56 | 0 |
| art-04 | 6 | 4 | 56 | 0 |
| birthday-01 | 18 | 2 | 25 | 0 |
| birthday-02 | 19 | 2 | 25 | 0 |
| deluxe-01 | 6 | 6 | 23 | 0 |
| deluxe-02 | 21 | 6 | 30 | 0 |
| deluxe-03 | 4 | 8 | 44 | 0 |
| deluxe-04 | 4 | 11 | 40 | 0 |
| deluxe-05 | 4 | 8 | 43 | 0 |
| deluxe-06 | 4 | 7 | 43 | 0 |
| deluxe-07 | 4 | 10 | 39 | 0 |
| deluxe-08 | 4 | 6 | 32 | 0 |
| minisite-01 | 46 | 1 | 41 | 0 |
| minisite-02 | 27 | 0 | 46 | 0 |
| minisite-03 | 41 | 1 | 76 | 0 |
| minisite-04 | 41 | 1 | 76 | 0 |
| minisite-05 | 41 | 3 | 76 | 0 |
| minisite-06 | 24 | 1 | 59 | 0 |
| minisite-07 | 26 | 3 | 61 | 0 |
| minisite-08 | 31 | 3 | 64 | 0 |
| minisite-09 | 31 | 1 | 66 | 0 |
| minisite-10 | 31 | 3 | 66 | 0 |
| syari-01 | 14 | 0 | 49 | 0 |
| syari-02 | 14 | 0 | 50 | 0 |
| syari-03 | 14 | 0 | 49 | 0 |

## Temuan
- Semua 27 HTML tidak mengandung tag `<video>`. `motion.mp4` ada di root, tetapi tidak boleh dipasangkan ke template tanpa memastikan kecocokan.
- Ada 283 entri di `catalog-assets`: 161 webp, 62 png, 28 css, 18 mp3, 9 jpg, 5 svg. Ketersediaan file bukan bukti bahwa semua referensi CSS valid atau animasi asli telah dipulihkan.
- `template-runtime.css`/`.js` menyediakan animasi generik, bukan rekonstruksi animasi Elementor/JavaScript asli per template.
- Slot `data-photo-slot` perlu ditautkan ke foto yang benar; jangan menggantikan dekorasi asli dengan placeholder.
- Referensi https://hi.kekondangan.id/art-04/?to=Nama+Tamu tidak berhasil diambil oleh pemeriksaan web (timeout); visual dan timing gerak belum bisa disahkan.

## Kriteria selesai per template
1. Semua aset dekorasi/background/font/audio teridentifikasi dan HTTP 200.
2. Screenshot sampul dan tiap section dibandingkan pada viewport mobile yang sama.
3. Transisi buka, parallax, scroll reveal, ornamen independen, audio, galeri, RSVP diperiksa.
4. Video hanya dipasang jika memang ada pada referensi dan aset berlisensi/diizinkan.
5. Perbaikan visual dilakukan per template, tidak memaksakan animasi generik ke semua desain.
6. Tes ulang di Cloudflare Workers dan WebView Android.

Status: 27/27 audit struktur; 0/27 lolos verifikasi kesamaan visual/interaksi.
