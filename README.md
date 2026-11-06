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
