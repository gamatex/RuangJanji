# RuangJanji

Platform undangan digital dengan dua aplikasi Android terpisah: **RuangJanji** (katalog, pemesanan, editor undangan) dan **RuangJanji Buku Tamu** (pengelolaan tamu, check-in QR, souvenir, laporan).

## Backend
Supabase project: `bfaarhffvylqqbxycuds`. Jangan pernah menaruh service-role key dalam APK, frontend, atau repository.

## Struktur awal
- `apps/ruangjanji/`: aplikasi penjualan dan pengelolaan undangan
- `apps/buku-tamu/`: aplikasi operasional buku tamu
- `packages/shared/`: konfigurasi dan tipe bersama
- `docs/`: spesifikasi dan checklist integrasi

## Status
Kerangka repository sedang disiapkan. Belum ada APK produksi. Skema dan kebijakan RLS harus diverifikasi terhadap database sebelum integrasi frontend.

## Identitas visual
Terracotta #C86D51, cream #F5EBE6, espresso #2C221E, sage #A3B18B.

## Website publik

Website RuangJanji asli sudah ditempatkan pada root repository (`index.html`, `catalog.js`, `catalog.css`, `catalog-assets/`). Cloudflare Workers saat ini menggunakan `[assets] directory = "."` pada `wrangler.toml`; deploy otomatis dari branch `main` bila integrasi Cloudflare GitHub aktif. Folder `apps/` dan `packages/` dipertahankan sebagai source aplikasi. Sebelum produksi, pindahkan aset publik ke direktori terpisah untuk menghindari publikasi file non-publik.
