# Deploy Cloudflare Workers Static Assets

Repository: gamatex/RuangJanji, branch main.

Konfigurasi Cloudflare Builds (Workers):
- Root directory: /
- Build command: kosong / None
- Deploy command: npx wrangler deploy

File wrangler.toml di root mendefinisikan assets.directory = \".\" sehingga Wrangler mengetahui folder static assets. Root index.html mengarahkan ke /apps/ruangjanji/.

Alamat halaman:
- /apps/ruangjanji/
- /apps/buku-tamu/

Catatan: kedua halaman masih prototipe, belum APK. Jangan mengaktifkan pembayaran produksi sebelum audit RLS dan pengujian transaksi. Untuk Cloudflare Pages (bukan Workers Builds), gunakan build output directory = / dan jangan gunakan deploy command Workers.
