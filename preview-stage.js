/* preview-stage.js — Unified Phone-Framed Studio Shell & Interactive Engine (242 Themes) */
(function () {
  if (window.__RJ_PREVIEW_STAGE_LOADED) return;
  window.__RJ_PREVIEW_STAGE_LOADED = true;

  const CATALOG = [{"s":"paper-promise","n":"Paper & Promise","c":"modern","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/paper-promise.webp"},{"s":"doodle-vows","n":"Doodle Vows","c":"modern","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/doodle-vows.webp"},{"s":"matcha-strawberry","n":"Matcha Strawberry","c":"modern","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/matcha-strawberry.webp"},{"s":"letters-from-java","n":"Letters from Java","c":"modern","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/letters-from-java.webp"},{"s":"editorial-sampul","n":"Cover Story","c":"modern","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/editorial-sampul.webp"},{"s":"line-story","n":"Line Story","c":"modern","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/line-story.webp"},{"s":"sinema-cinta","n":"Sinema Cinta","c":"modern","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/sinema-cinta.webp"},{"s":"minang-saiyo-baru","n":"Minang Saiyo","c":"adat","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/minang-saiyo-baru.webp"},{"s":"kamboja-bali-baru","n":"Kamboja Bali","c":"adat","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/kamboja-bali-baru.webp"},{"s":"blush-confetti","n":"Blush Confetti","c":"birthday","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/blush-confetti.webp"},{"s":"crescent-linen","n":"Crescent Linen","c":"khitan","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/crescent-linen.webp"},{"s":"mendung-kasepuhan","n":"Mendung Kasepuhan","c":"modern","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/mendung-kasepuhan.webp"},{"s":"mandailing","n":"Mandailing","c":"modern","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/mandailing.webp"},{"s":"dino-picnic","n":"Dino Picnic","c":"birthday","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/dino-picnic.webp"},{"s":"zaitun-morning","n":"Zaitun Morning","c":"khitan","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/zaitun-morning.webp"},{"s":"panggung-betawi","n":"Panggung Betawi","c":"modern","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/panggung-betawi.webp"},{"s":"saung-padi","n":"Saung Padi","c":"modern","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/saung-padi.webp"},{"s":"little-crown-garden","n":"Little Crown Garden","c":"birthday","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/little-crown-garden.webp"},{"s":"mihrab-khitan","n":"Mihrab Cahaya","c":"khitan","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/mihrab-khitan.webp"},{"s":"lawang-terakota","n":"Lawang Terakota","c":"modern","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/lawang-terakota.webp"},{"s":"gorga-emas-baru","n":"Gorga Emas","c":"modern","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/gorga-emas-baru.webp"},{"s":"little-fire-station","n":"Little Fire Station","c":"birthday","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/little-fire-station.webp"},{"s":"betawi-khitan","n":"Sunatan Betawi","c":"khitan","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/betawi-khitan.webp"},{"s":"telaga-cemara","n":"Telaga Cemara","c":"modern","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/telaga-cemara.webp"},{"s":"wayang-gunungan-baru","n":"Wayang Gunungan","c":"modern","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/wayang-gunungan-baru.webp"},{"s":"little-hero-parade","n":"Little Hero Parade","c":"birthday","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/little-hero-parade.webp"},{"s":"sunda-khitan","n":"Sunatan Sunda","c":"khitan","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/sunda-khitan.webp"},{"s":"sanding-emas-baru","n":"Sanding Emas","c":"modern","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/sanding-emas-baru.webp"},{"s":"rumoh-seulawah","n":"Rumoh Seulawah","c":"modern","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/rumoh-seulawah.webp"},{"s":"moonbeam-mission","n":"Moonbeam Mission","c":"birthday","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/moonbeam-mission.webp"},{"s":"minang-khitan","n":"Sunat Rasul Minang","c":"khitan","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/minang-khitan.webp"},{"s":"melati-kemayoran","n":"Melati Kemayoran","c":"modern","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/melati-kemayoran.webp"},{"s":"garis-tangan-baru","n":"Garis Tangan","c":"modern","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/garis-tangan-baru.webp"},{"s":"tiny-race-day","n":"Tiny Race Day","c":"birthday","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/tiny-race-day.webp"},{"s":"melayu-khitan","n":"Berkhatan Melayu","c":"khitan","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/melayu-khitan.webp"},{"s":"musim-gugur-baru","n":"Musim Gugur","c":"modern","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/musim-gugur-baru.webp"},{"s":"mihrab-mawar","n":"Mihrab Mawar","c":"modern","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/mihrab-mawar.webp"},{"s":"under-the-sea","n":"Under the Sea","c":"birthday","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/under-the-sea.webp"},{"s":"aceh-khitan","n":"Khitan Aceh","c":"khitan","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/aceh-khitan.webp"},{"s":"lili-gading-baru","n":"Lili Gading","c":"modern","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/lili-gading-baru.webp"},{"s":"batak-karo","n":"Batak Karo","c":"adat","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/batak-karo.webp"},{"s":"woodland-camp","n":"Woodland Camp","c":"birthday","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/woodland-camp.webp"},{"s":"bugis-khitan","n":"Massunna Bugis","c":"khitan","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/bugis-khitan.webp"},{"s":"embun-pagi","n":"Embun Pagi","c":"modern","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/embun-pagi.webp"},{"s":"danau-kerinci","n":"Danau Kerinci","c":"modern","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/danau-kerinci.webp"},{"s":"little-garden-jubilee","n":"Little Garden Jubilee","c":"birthday","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/little-garden-jubilee.webp"},{"s":"purnama-khitan","n":"Malam Purnama","c":"khitan","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/purnama-khitan.webp"},{"s":"biru-manten-baru","n":"Biru Manten","c":"modern","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/biru-manten-baru.webp"},{"s":"tana-ugi","n":"Tana Ugi","c":"modern","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/tana-ugi.webp"},{"s":"little-meadow-scout","n":"Little Meadow Scout","c":"birthday","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/little-meadow-scout.webp"},{"s":"jagoan-khitan","n":"Jagoan Kecil","c":"khitan","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/jagoan-khitan.webp"},{"s":"sunda-watercolor","n":"Sunda Watercolor","c":"adat","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/sunda-watercolor.webp"},{"s":"bubungan-intan","n":"Bubungan Intan","c":"modern","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/bubungan-intan.webp"},{"s":"cherry-picnic","n":"Cherry Picnic","c":"birthday","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/cherry-picnic.webp"},{"s":"balap-khitan","n":"Si Pembalap","c":"khitan","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/balap-khitan.webp"},{"s":"kebun-zaitun","n":"Kebun Zaitun","c":"modern","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/kebun-zaitun.webp"},{"s":"secret-garden","n":"Secret Garden","c":"modern","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/secret-garden.webp"},{"s":"silk-and-ink","n":"Silk & Ink","c":"birthday","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/silk-and-ink.webp"},{"s":"antariksa-khitan","n":"Misi Antariksa","c":"khitan","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/antariksa-khitan.webp"},{"s":"pucuk-nilam","n":"Pucuk Nilam","c":"modern","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/pucuk-nilam.webp"},{"s":"editorial-lookbook","n":"Atelier","c":"modern","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/editorial-lookbook.webp"},{"s":"limone-afterglow","n":"Limone Afterglow","c":"birthday","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/limone-afterglow.webp"},{"s":"dino-khitan","n":"Dino Berani","c":"khitan","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/dino-khitan.webp"},{"s":"jawa-biru","n":"Laras Jawa","c":"adat","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/jawa-biru.webp"},{"s":"batak-toba","n":"Batak Toba","c":"adat","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/batak-toba.webp"},{"s":"taman-kaca-ultah","n":"Pesta Taman Kaca","c":"birthday","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/taman-kaca-ultah.webp"},{"s":"pramuka-khitan","n":"Petualang Kecil","c":"khitan","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/pramuka-khitan.webp"},{"s":"kidung-dewata","n":"Kidung Dewata","c":"modern","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/kidung-dewata.webp"},{"s":"joglo-asri","n":"Joglo Asri","c":"modern","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/joglo-asri.webp"},{"s":"sakura-ultah","n":"Brunch Sakura","c":"birthday","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/sakura-ultah.webp"},{"s":"rumah-gadang-baru","n":"Rumah Gadang","c":"modern","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/rumah-gadang-baru.webp"},{"s":"bugis-makassar-baru","n":"Bugis Makassar","c":"adat","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/bugis-makassar-baru.webp"},{"s":"marmer-ultah","n":"Soirée Marmer","c":"birthday","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/marmer-ultah.webp"},{"s":"pintu-aceh-baru","n":"Pintu Aceh","c":"adat","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/pintu-aceh-baru.webp"},{"s":"jawa-maroon","n":"Jawa Maroon","c":"adat","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/jawa-maroon.webp"},{"s":"salon-ultah","n":"Salon Kristal","c":"birthday","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/salon-ultah.webp"},{"s":"gerbang-melati-baru","n":"Gerbang Melati","c":"modern","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/gerbang-melati-baru.webp"},{"s":"bugis-pesisir-baru","n":"Bugis Pesisir","c":"adat","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/bugis-pesisir-baru.webp"},{"s":"bunga-ceria-ultah","n":"Bunga Ceria","c":"birthday","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/bunga-ceria-ultah.webp"},{"s":"ulos-saroha-baru","n":"Ulos Saroha","c":"modern","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/ulos-saroha-baru.webp"},{"s":"ampera-senja","n":"Ampera Senja","c":"modern","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/ampera-senja.webp"},{"s":"beludru-ultah","n":"Makan Malam Beludru","c":"birthday","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/beludru-ultah.webp"},{"s":"hitam-putih-baru","n":"Hitam Putih","c":"modern","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/hitam-putih-baru.webp"},{"s":"editorial-noir","n":"Monokrom","c":"modern","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/editorial-noir.webp"},{"s":"merak-gala-ultah","n":"Gala Merak","c":"birthday","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/merak-gala-ultah.webp"},{"s":"royal-garden","n":"Royal Garden","c":"modern","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/royal-garden.webp"},{"s":"bunga-subuh","n":"Bunga Subuh","c":"modern","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/bunga-subuh.webp"},{"s":"kupu-ultah","n":"Kupu Pastel","c":"birthday","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/kupu-ultah.webp"},{"s":"album-kenangan","n":"Album Kenangan","c":"modern","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/album-kenangan.webp"},{"s":"bunga-rangkiang-baru","n":"Bunga Rangkiang","c":"modern","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/bunga-rangkiang-baru.webp"},{"s":"renda-ultah","n":"Renda Antik","c":"birthday","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/renda-ultah.webp"},{"s":"kupu-langit-baru","n":"Kupu Langit","c":"modern","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/kupu-langit-baru.webp"},{"s":"romansa-pantai","n":"Romansa Pantai","c":"modern","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/romansa-pantai.webp"},{"s":"noir-ultah","n":"Noir","c":"birthday","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/noir-ultah.webp"},{"s":"siger-lampung","n":"Siger Lampung","c":"modern","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/siger-lampung.webp"},{"s":"biru-purnama-baru","n":"Biru Purnama","c":"modern","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/biru-purnama-baru.webp"},{"s":"linen-ultah","n":"Linen & Beton","c":"birthday","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/linen-ultah.webp"},{"s":"kasual-modern-baru","n":"Kasual Modern","c":"modern","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/kasual-modern-baru.webp"},{"s":"sakura","n":"Sakura","c":"modern","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/sakura.webp"},{"s":"nila-ultah","n":"Nila","c":"birthday","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/nila-ultah.webp"},{"s":"istana-bunga","n":"Istana Bunga","c":"modern","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/istana-bunga.webp"},{"s":"editorial-grid","n":"Kolase","c":"modern","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/editorial-grid.webp"},{"s":"paspor-ultah","n":"Paspor","c":"birthday","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/paspor-ultah.webp"},{"s":"rusa-kencana","n":"Rusa Kencana","c":"modern","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/rusa-kencana.webp"},{"s":"minang-gadang-baru","n":"Minang Gadang","c":"adat","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/minang-gadang-baru.webp"},{"s":"zamrud-ultah","n":"Gala Zamrud","c":"birthday","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/zamrud-ultah.webp"},{"s":"wedding-post","n":"Wedding Post","c":"modern","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/wedding-post.webp"},{"s":"merah-delima","n":"Merah Delima","c":"modern","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/merah-delima.webp"},{"s":"cemara-ultah","n":"Kemah Cemara","c":"birthday","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/cemara-ultah.webp"},{"s":"tatar-sunda","n":"Tatar Sunda","c":"adat","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/tatar-sunda.webp"},{"s":"balon-awan","n":"Balon Awan","c":"modern","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/balon-awan.webp"},{"s":"pantai-ultah","n":"Pesta Pantai","c":"birthday","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/pantai-ultah.webp"},{"s":"cerita-ugi","n":"Cerita Ugi","c":"modern","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/cerita-ugi.webp"},{"s":"pendopo-jati","n":"Pendopo Jati","c":"modern","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/pendopo-jati.webp"},{"s":"gugur-ultah","n":"Senja Musim Gugur","c":"birthday","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/gugur-ultah.webp"},{"s":"kartu-pos-baru","n":"Kartu Pos","c":"modern","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/kartu-pos-baru.webp"},{"s":"kolam-marmer","n":"Kolam Marmer","c":"modern","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/kolam-marmer.webp"},{"s":"batik-ultah","n":"Batik Priyayi","c":"birthday","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/batik-ultah.webp"},{"s":"sekar-hening","n":"Sekar Hening","c":"modern","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/sekar-hening.webp"},{"s":"jawa-chinoiserie-baru","n":"Jawa Chinoiserie","c":"adat","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/jawa-chinoiserie-baru.webp"},{"s":"bingkai-pualam-baru","n":"Bingkai Pualam","c":"modern","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/bingkai-pualam-baru.webp"},{"s":"kawih-priangan","n":"Kawih Priangan","c":"modern","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/kawih-priangan.webp"},{"s":"gapura-parahyangan-baru","n":"Gapura Parahyangan","c":"modern","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/gapura-parahyangan-baru.webp"},{"s":"sunda-kancana","n":"Sunda Kancana","c":"adat","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/sunda-kancana.webp"},{"s":"betang-borneo","n":"Betang Borneo","c":"modern","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/betang-borneo.webp"},{"s":"anggrek-senja-baru","n":"Anggrek Senja","c":"modern","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/anggrek-senja-baru.webp"},{"s":"taman-pastel-baru","n":"Taman Pastel","c":"modern","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/taman-pastel-baru.webp"},{"s":"serambi-melayu","n":"Serambi Melayu","c":"adat","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/serambi-melayu.webp"},{"s":"kidung-putih-baru","n":"Kidung Putih","c":"modern","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/kidung-putih-baru.webp"},{"s":"melayu-jambi-baru","n":"Melayu Jambi","c":"adat","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/melayu-jambi-baru.webp"},{"s":"merak-malam-baru","n":"Merak Malam","c":"modern","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/merak-malam-baru.webp"},{"s":"merak-zamrud-baru","n":"Merak Zamrud","c":"modern","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/merak-zamrud-baru.webp"},{"s":"pura-bali-baru","n":"Pura Bali","c":"adat","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/pura-bali-baru.webp"},{"s":"sanggar-renda-baru","n":"Sanggar Renda","c":"modern","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/sanggar-renda-baru.webp"},{"s":"selaso-kembar-baru","n":"Selaso Kembar","c":"modern","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/selaso-kembar-baru.webp"},{"s":"songket-palembang-baru","n":"Songket Palembang","c":"modern","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/songket-palembang-baru.webp"},{"s":"jawa-klasik","n":"Jawa Klasik","c":"adat","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/jawa-klasik.webp"},{"s":"bolon-merah","n":"Bolon Merah","c":"modern","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/bolon-merah.webp"},{"s":"mawar-nila","n":"Mawar Nila","c":"modern","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/mawar-nila.webp"},{"s":"classy-whimsical","n":"Classy Whimsical","c":"modern","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/classy-whimsical.webp"},{"s":"faded-garden-vows","n":"Faded Garden Vows","c":"modern","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/faded-garden-vows.webp"},{"s":"maroon-velvet","n":"Maroon Velvet","c":"modern","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/maroon-velvet.webp"},{"s":"plumline-parlour","n":"Plumline Parlour","c":"modern","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/plumline-parlour.webp"},{"s":"whimsy-bloom","n":"Whimsy Bloom","c":"modern","p":79000,"o":158000,"u":"RUANG50","t":"catalog-assets/covers/whimsy-bloom.webp"},{"s":"motion-35","n":"Motion – 35","c":"motion","p":249000,"o":498000,"u":"MOTION50","t":"catalog-assets/e8c5b69f08a891e36743.webp"},{"s":"motion-34","n":"Motion – 34","c":"motion","p":249000,"o":498000,"u":"MOTION50","t":"catalog-assets/c4270077be1ea0f7d190.webp"},{"s":"motion-33","n":"Motion – 33","c":"motion","p":249000,"o":498000,"u":"MOTION50","t":"catalog-assets/c4270077be1ea0f7d190.webp"},{"s":"motion-32","n":"Motion – 32","c":"motion","p":249000,"o":498000,"u":"MOTION50","t":"catalog-assets/213fb31550c7bfa1ba3a.webp"},{"s":"motion-31","n":"Motion – 31","c":"motion","p":249000,"o":498000,"u":"MOTION50","t":"catalog-assets/a557fc2b3b83e231a71e.webp"},{"s":"minimotion-35","n":"MiniMotion – 35","c":"minimotion","p":149000,"o":298000,"u":"MINIMOTION50","t":"catalog-assets/4231a1b47ac499c2f0ef.webp"},{"s":"minimotion-34","n":"MiniMotion – 34","c":"minimotion","p":149000,"o":298000,"u":"MINIMOTION50","t":"catalog-assets/7c1c395909459e8c1668.webp"},{"s":"minimotion-33","n":"MiniMotion – 33","c":"minimotion","p":149000,"o":298000,"u":"MINIMOTION50","t":"catalog-assets/067b3ea1ca83b39dcca4.webp"},{"s":"minimotion-32","n":"MiniMotion – 32","c":"minimotion","p":149000,"o":298000,"u":"MINIMOTION50","t":"catalog-assets/9ed832e64e9e5dfff42a.webp"},{"s":"minimotion-31","n":"MiniMotion – 31","c":"minimotion","p":149000,"o":298000,"u":"MINIMOTION50","t":"catalog-assets/a10fdf26e005170677b6.webp"},{"s":"minimotion-30","n":"MiniMotion – 30","c":"minimotion","p":149000,"o":298000,"u":"MINIMOTION50","t":"catalog-assets/609f08e2222fb6d515c9.webp"},{"s":"minimotion-29","n":"MiniMotion – 29","c":"minimotion","p":149000,"o":298000,"u":"MINIMOTION50","t":"catalog-assets/bcfdf39f71a1cbe91c30.webp"},{"s":"minimotion-28","n":"MiniMotion – 28","c":"minimotion","p":149000,"o":298000,"u":"MINIMOTION50","t":"catalog-assets/05518c9900bae934044a.webp"},{"s":"minimotion-27","n":"MiniMotion – 27","c":"minimotion","p":149000,"o":298000,"u":"MINIMOTION50","t":"catalog-assets/b2cfaa7a5a3344a08485.webp"},{"s":"minimotion-26","n":"MiniMotion – 26","c":"minimotion","p":149000,"o":298000,"u":"MINIMOTION50","t":"catalog-assets/30e3ab45ff65eaac8112.webp"},{"s":"minimotion-25","n":"MiniMotion – 25","c":"minimotion","p":149000,"o":298000,"u":"MINIMOTION50","t":"catalog-assets/dca4dba312e466372ee5.webp"},{"s":"minimotion-24","n":"MiniMotion – 24","c":"minimotion","p":149000,"o":298000,"u":"MINIMOTION50","t":"catalog-assets/2d848cd63403ef5852d9.webp"},{"s":"minimotion-23","n":"MiniMotion – 23","c":"minimotion","p":149000,"o":298000,"u":"MINIMOTION50","t":"catalog-assets/efd71552e52d33364ec1.webp"},{"s":"minimotion-22","n":"MiniMotion – 22","c":"minimotion","p":149000,"o":298000,"u":"MINIMOTION50","t":"catalog-assets/182bc4f3ee5f9c810cdf.webp"},{"s":"minimotion-21","n":"MiniMotion – 21","c":"minimotion","p":149000,"o":298000,"u":"MINIMOTION50","t":"catalog-assets/e5cd43f2ba2db663c63e.webp"},{"s":"minimotion-20","n":"MiniMotion – 20","c":"minimotion","p":149000,"o":298000,"u":"MINIMOTION50","t":"catalog-assets/1c862c2622d21199d18b.webp"},{"s":"minimotion-19","n":"MiniMotion – 19","c":"minimotion","p":149000,"o":298000,"u":"MINIMOTION50","t":"catalog-assets/cc9351c1a9726cdf4536.webp"},{"s":"minimotion-18","n":"MiniMotion – 18","c":"minimotion","p":149000,"o":298000,"u":"MINIMOTION50","t":"catalog-assets/f7fecda8c95b68aa5f3f.webp"},{"s":"minimotion-17","n":"MiniMotion – 17","c":"minimotion","p":149000,"o":298000,"u":"MINIMOTION50","t":"catalog-assets/9686a9648081d626a4ae.webp"},{"s":"minimotion-16","n":"MiniMotion – 16","c":"minimotion","p":149000,"o":298000,"u":"MINIMOTION50","t":"catalog-assets/4db1e7ffad78de82112d.webp"},{"s":"minimotion-15","n":"MiniMotion – 15","c":"minimotion","p":149000,"o":298000,"u":"MINIMOTION50","t":"catalog-assets/53ace12fd63cee60c6db.webp"},{"s":"minimotion-14","n":"MiniMotion – 14","c":"minimotion","p":149000,"o":298000,"u":"MINIMOTION50","t":"catalog-assets/04bade75b824e514980d.webp"},{"s":"minimotion-13","n":"MiniMotion – 13","c":"minimotion","p":149000,"o":298000,"u":"MINIMOTION50","t":"catalog-assets/cdd7ef2936ce227a703e.webp"},{"s":"minimotion-12","n":"MiniMotion – 12","c":"minimotion","p":149000,"o":298000,"u":"MINIMOTION50","t":"catalog-assets/880c50106b115287c7d1.webp"},{"s":"minimotion-11","n":"MiniMotion – 11","c":"minimotion","p":149000,"o":298000,"u":"MINIMOTION50","t":"catalog-assets/30f8be7dfa65a8943566.webp"},{"s":"minimotion-10","n":"MiniMotion – 10","c":"minimotion","p":149000,"o":298000,"u":"MINIMOTION50","t":"catalog-assets/acbd0e103bb477074f26.webp"},{"s":"minimotion-09","n":"MiniMotion – 09","c":"minimotion","p":99000,"o":158000,"u":"MINIMOTION50","t":"catalog-assets/1bad543b8e374c145aec.webp"},{"s":"minimotion-08","n":"MiniMotion – 08","c":"minimotion","p":149000,"o":298000,"u":"MINIMOTION50","t":"catalog-assets/d728aef6a1dc8249489f.webp"},{"s":"minimotion-07","n":"MiniMotion – 07","c":"minimotion","p":149000,"o":298000,"u":"MINIMOTION50","t":"catalog-assets/c728fda3cb3f91e97b6a.webp"},{"s":"minimotion-06","n":"MiniMotion – 06","c":"minimotion","p":149000,"o":298000,"u":"MINIMOTION50","t":"catalog-assets/23698e093a43d03d1d4e.webp"},{"s":"minimotion-05","n":"MiniMotion – 05","c":"minimotion","p":149000,"o":298000,"u":"MINIMOTION50","t":"catalog-assets/c9d4eadac37d7055c4e8.webp"},{"s":"minimotion-04","n":"MiniMotion – 04","c":"minimotion","p":149000,"o":298000,"u":"MINIMOTION50","t":"catalog-assets/a1506cd1148150034d0f.webp"},{"s":"minimotion-03","n":"MiniMotion – 03","c":"minimotion","p":149000,"o":298000,"u":"MINIMOTION50","t":"catalog-assets/ddeb898050eaadc8e200.webp"},{"s":"minimotion-02","n":"MiniMotion – 02","c":"minimotion","p":149000,"o":298000,"u":"MINIMOTION50","t":"catalog-assets/c8ad213fee2ab36b783e.webp"},{"s":"minimotion-01","n":"MiniMotion – 01","c":"minimotion","p":149000,"o":298000,"u":"MINIMOTION50","t":"catalog-assets/70ae484a55ac020a348d.webp"},{"s":"deluxe-08","n":"Deluxe – 08","c":"deluxe","p":99000,"o":198000,"u":"DELUXE49","t":"catalog-assets/4666b050ba0fe2bb2c54.webp"},{"s":"deluxe-07","n":"Deluxe – 07","c":"deluxe","p":99000,"o":198000,"u":"DELUXE49","t":"catalog-assets/1fde128e328cd4cbe99d.webp"},{"s":"deluxe-06","n":"Deluxe – 06","c":"deluxe","p":99000,"o":198000,"u":"DELUXE49","t":"catalog-assets/3213735644dc40bd0d9d.webp"},{"s":"deluxe-05","n":"Deluxe – 05","c":"deluxe","p":99000,"o":198000,"u":"DELUXE49","t":"catalog-assets/a835fe61802298c652c6.webp"},{"s":"deluxe-04","n":"Deluxe – 04","c":"deluxe","p":99000,"o":198000,"u":"DELUXE49","t":"catalog-assets/5aefa518ef0f2616c9c4.webp"},{"s":"deluxe-03","n":"Deluxe – 03","c":"deluxe","p":99000,"o":198000,"u":"DELUXE49","t":"catalog-assets/7f3385b9a2e45c3bf739.webp"},{"s":"deluxe-02","n":"Deluxe – 02","c":"deluxe","p":99000,"o":198000,"u":"DELUXE49","t":"catalog-assets/be7fb06b345e08b8a76a.webp"},{"s":"deluxe-01","n":"Deluxe – 01","c":"deluxe","p":99000,"o":198000,"u":"DELUXE49","t":"catalog-assets/2571781b118e8bdd4d86.webp"},{"s":"birthday-02","n":"Birthday – 02","c":"birthday","p":79000,"o":158000,"u":"BIRTHDAY50","t":"catalog-assets/be2f892661feb1e356e4.webp"},{"s":"birthday-01","n":"Birthday – 01","c":"birthday","p":79000,"o":158000,"u":"BIRTHDAY50","t":"catalog-assets/f12751285e9322bc1aef.webp"},{"s":"art-04","n":"Art – 04","c":"art","p":149000,"o":298000,"u":"ART50","t":"catalog-assets/3492e25f5b1279425c5d.webp"},{"s":"art-03","n":"Art – 03","c":"art","p":149000,"o":298000,"u":"ART50","t":"catalog-assets/fe0724eeafe400c9c8b8.webp"},{"s":"art-02","n":"Art – 02","c":"art","p":149000,"o":298000,"u":"ART50","t":"catalog-assets/6f26d8c063d51def60b5.webp"},{"s":"art-01","n":"Art – 01","c":"art","p":149000,"o":298000,"u":"ART50","t":"catalog-assets/bf9fb6f231b0536b61f6.webp"},{"s":"motion-30","n":"Motion – 30","c":"motion","p":249000,"o":498000,"u":"MOTION50","t":"catalog-assets/ea897f3d29b4447ad04d.webp"},{"s":"motion-29","n":"Motion – 29","c":"motion","p":249000,"o":498000,"u":"MOTION50","t":"catalog-assets/ba9789afb5a5164415eb.webp"},{"s":"motion-28","n":"Motion – 28","c":"motion","p":249000,"o":498000,"u":"MOTION50","t":"catalog-assets/d524efccc262e4c719df.webp"},{"s":"motion-27","n":"Motion – 27","c":"motion","p":249000,"o":498000,"u":"MOTION50","t":"catalog-assets/607dbad2a67d44b14594.webp"},{"s":"motion-26","n":"Motion – 26","c":"motion","p":249000,"o":498000,"u":"MOTION50","t":"catalog-assets/ccc7f660092d4e2a1d06.webp"},{"s":"motion-25","n":"Motion – 25","c":"motion","p":249000,"o":498000,"u":"MOTION50","t":"catalog-assets/5c6aa28ec1057ee4f58a.webp"},{"s":"motion-24","n":"Motion – 24","c":"motion","p":249000,"o":498000,"u":"MOTION50","t":"catalog-assets/74598110c673dc5f1df0.webp"},{"s":"motion-23","n":"Motion – 23","c":"motion","p":249000,"o":498000,"u":"MOTION50","t":"catalog-assets/1c6f3cab194ffb9cc14d.webp"},{"s":"motion-22","n":"Motion – 22","c":"motion","p":249000,"o":498000,"u":"MOTION50","t":"catalog-assets/9864313896802abe88f2.webp"},{"s":"motion-21","n":"Motion – 21","c":"motion","p":249000,"o":498000,"u":"MOTION50","t":"catalog-assets/602b76731439c3439801.webp"},{"s":"motion-20","n":"Motion – 20","c":"motion","p":249000,"o":498000,"u":"MOTION50","t":"catalog-assets/0e47ba335e2598f2d229.webp"},{"s":"motion-19","n":"Motion – 19","c":"motion","p":249000,"o":498000,"u":"MOTION50","t":"catalog-assets/46eb04bd7e8b66ed4785.webp"},{"s":"motion-18","n":"Motion – 18","c":"motion","p":249000,"o":498000,"u":"MOTION50","t":"catalog-assets/0605b2726d2a8c07e7a8.webp"},{"s":"motion-17","n":"Motion – 17","c":"motion","p":249000,"o":498000,"u":"MOTION50","t":"catalog-assets/74063d858d11be08052f.webp"},{"s":"motion-16","n":"Motion – 16","c":"motion","p":249000,"o":498000,"u":"MOTION50","t":"catalog-assets/bb9b4e7715a49e4b6d61.webp"},{"s":"motion-15","n":"Motion – 15","c":"motion","p":249000,"o":498000,"u":"MOTION50","t":"catalog-assets/acceef21f604ab54f4a5.webp"},{"s":"motion-14","n":"Motion – 14","c":"motion","p":249000,"o":498000,"u":"MOTION50","t":"catalog-assets/f426f56f7bb66b32e8ad.webp"},{"s":"motion-13","n":"Motion – 13","c":"motion","p":249000,"o":498000,"u":"MOTION50","t":"catalog-assets/0033c6a8586040deb566.webp"},{"s":"motion-12","n":"Motion – 12","c":"motion","p":249000,"o":498000,"u":"MOTION50","t":"catalog-assets/cc4788b13c471a55405e.webp"},{"s":"motion-11","n":"Motion – 11","c":"motion","p":249000,"o":498000,"u":"MOTION50","t":"catalog-assets/d074d1bc80d396e6269a.webp"},{"s":"motion-10","n":"Motion – 10","c":"motion","p":249000,"o":498000,"u":"MOTION50","t":"catalog-assets/819400890def52f63210.webp"},{"s":"motion-09","n":"Motion – 09","c":"motion","p":249000,"o":498000,"u":"MOTION50","t":"catalog-assets/b7ec96454bc7bb3fb5e0.webp"},{"s":"motion-08","n":"Motion – 08","c":"motion","p":249000,"o":498000,"u":"MOTION50","t":"catalog-assets/e44c0fc63ba22708da7f.webp"},{"s":"motion-07","n":"Motion – 07","c":"motion","p":249000,"o":498000,"u":"MOTION50","t":"catalog-assets/1c1b8ecc266a9b9ae9fa.webp"},{"s":"motion-06","n":"Motion – 06","c":"motion","p":249000,"o":498000,"u":"MOTION50","t":"catalog-assets/254a2a1370a33676eb63.webp"},{"s":"motion-05","n":"Motion – 05","c":"motion","p":249000,"o":498000,"u":"MOTION50","t":"catalog-assets/a9ad3aeb9b57783f2c25.webp"},{"s":"motion-04","n":"Motion – 04","c":"motion","p":249000,"o":498000,"u":"MOTION50","t":"catalog-assets/3492e25f5b1279425c5d.webp"},{"s":"motion-03","n":"Motion – 03","c":"motion","p":249000,"o":498000,"u":"MOTION50","t":"catalog-assets/fe0724eeafe400c9c8b8.webp"},{"s":"motion-02","n":"Motion – 02","c":"motion","p":249000,"o":498000,"u":"MOTION50","t":"catalog-assets/6f26d8c063d51def60b5.webp"},{"s":"motion-01","n":"Motion – 01","c":"motion","p":249000,"o":498000,"u":"MOTION50","t":"catalog-assets/bf9fb6f231b0536b61f6.webp"},{"s":"minisite-10","n":"MiniSite – 10","c":"minisite","p":79000,"o":158000,"u":"MINISITE79","t":"catalog-assets/5aff2335828bd203b75c.webp"},{"s":"minisite-09","n":"Minisite – 09","c":"minisite","p":79000,"o":158000,"u":"MINISITE79","t":"catalog-assets/6a2181dcb2f32282cca9.webp"},{"s":"minisite-08","n":"Minisite – 08","c":"minisite","p":79000,"o":158000,"u":"MINISITE79","t":"catalog-assets/77720f8fc898b47b250f.webp"},{"s":"minisite-07","n":"Minisite – 07","c":"minisite","p":79000,"o":158000,"u":"MINISITE79","t":"catalog-assets/b8ba701151f8e900a8e7.webp"},{"s":"minisite-06","n":"Minisite – 06","c":"minisite","p":79000,"o":158000,"u":"MINISITE79","t":"catalog-assets/d67d6476d0a468a36803.webp"},{"s":"minisite-05","n":"Minisite – 05","c":"minisite","p":79000,"o":158000,"u":"MINISITE79","t":"catalog-assets/44458beb62165b7bee1b.webp"},{"s":"minisite-04","n":"Minisite – 04","c":"minisite","p":79000,"o":158000,"u":"MINISITE79","t":"catalog-assets/c8674ff2b23081bf2770.webp"},{"s":"minisite-03","n":"Minisite – 03","c":"minisite","p":79000,"o":158000,"u":"MINISITE79","t":"catalog-assets/3390cbbbeb7386c9c261.webp"},{"s":"minisite-02","n":"MiniSite – 02","c":"minisite","p":79000,"o":158000,"u":"MINISITE79","t":"catalog-assets/f6284cee5abcb31012d2.webp"},{"s":"minisite-01","n":"MiniSite – 01","c":"minisite","p":79000,"o":158000,"u":"MINISITE79","t":"catalog-assets/4d021096adec1c8d922a.webp"},{"s":"syari-04","n":"Syar’i – 04","c":"syari","p":79000,"o":158000,"u":"SY50","t":"catalog-assets/91655820f98064bb54df.webp"},{"s":"syari-03","n":"Syar’i – 03","c":"syari","p":79000,"o":158000,"u":"SY50","t":"catalog-assets/2beebc7825ea5a46f18e.webp"},{"s":"syari-02","n":"Syar’i – 02","c":"syari","p":79000,"o":158000,"u":"SY50","t":"catalog-assets/0a5681408f68dc5b5356.webp"},{"s":"syari-01","n":"Syar’i – 01","c":"syari","p":79000,"o":158000,"u":"SY50","t":"catalog-assets/dca75ac2e0357330e93d.webp"}];

  const CAT_LABELS = {
    art: 'Art Premium',
    birthday: 'Birthday Party',
    deluxe: 'Deluxe Editorial',
    minimotion: 'MiniMotion (Tanpa Foto)',
    minisite: 'Minisite',
    motion: 'Motion 3D',
    syari: "Syar'i",
    modern: 'Modern Editorial',
    adat: 'Adat Nusantara',
    ulangtahun: 'Ulang Tahun',
    khitanan: 'Khitanan'
  };

  const PALETTES = [
    { key: 'asli', label: 'Asli', swatch: 'linear-gradient(135deg,#717052,#b49753)', bg: '', surface: '', accent: '', paper: '' },
    { key: 'zaitun', label: 'Zaitun', swatch: '#555c42', bg: '#454c35', surface: '#f5f4ec', accent: '#8f996e', paper: '#353a28' },
    { key: 'malam', label: 'Malam', swatch: '#1c2434', bg: '#182030', surface: '#f2f5fa', accent: '#c9a35b', paper: '#111722' },
    { key: 'marun', label: 'Marun', swatch: '#641e27', bg: '#5a1922', surface: '#fcf4f5', accent: '#c78b63', paper: '#3d1016' },
    { key: 'emas', label: 'Emas', swatch: '#6e5222', bg: '#584018', surface: '#fdf9ef', accent: '#c89d43', paper: '#3c2b10' },
    { key: 'terracotta', label: 'Terracotta', swatch: '#8b432b', bg: '#753520', surface: '#fbf3ee', accent: '#d27c55', paper: '#4d2315' },
    { key: 'sage', label: 'Sage', swatch: '#3f5a4d', bg: '#324a3f', surface: '#f2f7f4', accent: '#7ba690', paper: '#24352d' }
  ];

  const CATEGORY_BASE_PALETTE = {
    motion: { bg: '#5a1b0e', surface: '#fbf6ec', accent: '#b49753', paper: '#39120a' },
    minimotion: { bg: '#3f4936', surface: '#f7f5ee', accent: '#99895f', paper: '#2b3224' },
    syari: { bg: '#1e4234', surface: '#f5f8f4', accent: '#bfa15a', paper: '#142c22' },
    art: { bg: '#3a2d28', surface: '#fbf7f1', accent: '#b4875e', paper: '#261e1a' },
    deluxe: { bg: '#4e1f27', surface: '#fcf6f1', accent: '#c49a52', paper: '#321318' },
    minisite: { bg: '#2f3430', surface: '#f7f5ef', accent: '#a8925a', paper: '#202421' },
    birthday: { bg: '#4b2d56', surface: '#fdf7fb', accent: '#d47c9c', paper: '#311d38' }
  };

  function formatRupiah(n) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n || 0);
  }

  function resolveSlug() {
    const bodyTheme = (document.body && document.body.dataset.theme) || '';
    if (bodyTheme) return bodyTheme;
    const m = location.pathname.match(/\/templates\/([a-z0-9-]+?)(?:\.html)?\/?$/i);
    if (m) return m[1];
    return new URLSearchParams(location.search).get('tema') || 'motion-35';
  }

  function showToast(msg) {
    let t = document.getElementById('rj-stage-toast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'rj-stage-toast';
      t.style.cssText = 'position:fixed;bottom:26px;left:50%;transform:translateX(-50%);background:#231d18;color:#fefbf4;padding:10px 20px;border-radius:999px;font:600 13px "Plus Jakarta Sans",system-ui,sans-serif;z-index:99999;box-shadow:0 10px 30px rgba(0,0,0,0.35);opacity:0;transition:opacity 0.25s;pointer-events:none;';
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.style.opacity = '1';
    clearTimeout(t._timer);
    t._timer = setTimeout(function () { t.style.opacity = '0'; }, 2600);
  }

  function iconSvg(name) {
    switch (name) {
      case 'close':
        return '<svg width="16" height="16" viewBox="0 0 20 20" aria-hidden="true"><path d="M5 5l10 10M15 5L5 15" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" fill="none"/></svg>';
      case 'prev':
        return '<svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M9 1L3 7l6 6" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>';
      case 'next':
        return '<svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M5 1l6 6-6 6" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>';
      case 'share':
        return '<svg width="15" height="15" viewBox="0 0 18 18" aria-hidden="true"><circle cx="13.5" cy="4" r="2.2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="4.5" cy="9" r="2.2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="13.5" cy="14" r="2.2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M6.5 8l5-3M6.5 10l5 3" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>';
      case 'replay':
        return '<svg width="15" height="15" viewBox="0 0 18 18" aria-hidden="true"><path d="M3.5 8.5A5.5 5.5 0 1 1 5 12.8" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M3.5 4.2v4.3h4.3" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
      case 'arrow':
        return '<svg width="14" height="11" viewBox="0 0 15 11" aria-hidden="true"><path d="M1 5.5h12.5M9.5 1.5l4 4-4 4" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>';
      case 'foto':
        return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="8.5" cy="9.5" r="1.5"/><path d="M21 16l-5-5-6 6-3-3-4 4"/></svg>';
      case 'tanpa':
        return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>';
      case 'music':
        return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>';
      default:
        return '';
    }
  }

  function updateFitScale() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    if (w < 640) {
      document.documentElement.style.removeProperty('--pv-fit-js');
      return;
    }
    const availH = h - 62 - 24;
    const availW = w - 180;
    const fit = Math.min(1, availH / 858, Math.max(300, availW) / 404);
    document.documentElement.style.setProperty('--pv-fit-js', fit.toFixed(4));
  }

  function buildStudioShell(opts) {
    const slug = opts.slug;
    const idx = CATALOG.findIndex(function (x) { return x.s === slug; });
    const item = idx >= 0 ? CATALOG[idx] : {
      s: slug,
      n: document.title.replace(/\s*[·|].*$/, '').trim() || slug.toUpperCase(),
      c: slug.split('-')[0],
      p: 99000,
      u: '',
      t: ''
    };
    const prevItem = idx > 0 ? CATALOG[idx - 1] : CATALOG[CATALOG.length - 1];
    const nextItem = idx >= 0 && idx < CATALOG.length - 1 ? CATALOG[idx + 1] : CATALOG[0];
    const params = new URLSearchParams(location.search);
    const guest = (params.get('to') || 'Nama Tamu').trim().slice(0, 80);
    const basePalette = CATEGORY_BASE_PALETTE[item.c] || CATEGORY_BASE_PALETTE.motion;
    const coverSrc = item.t ? (item.t.startsWith('/') || item.t.startsWith('http') ? item.t : '/' + item.t) : '';

    const framed = document.createElement('div');
    framed.className = 'pv-framed';
    framed.style.setProperty('--pv-paper', basePalette.paper);

    const ambient = document.createElement('div');
    ambient.className = 'pv-ambient';
    if (coverSrc) {
      ambient.style.backgroundImage = 'url("' + coverSrc + '")';
    }
    framed.appendChild(ambient);

    // Header
    const head = document.createElement('header');
    head.className = 'pv-head';
    const catName = CAT_LABELS[item.c] || item.c;
    const couponQuery = item.u ? '&coupon=' + encodeURIComponent(item.u) : '';
    const checkoutUrl = '/checkout.html?tema=' + encodeURIComponent(slug) + couponQuery;
    const prevUrl = '/templates/' + encodeURIComponent(prevItem.s) + '?to=' + encodeURIComponent(guest);
    const nextUrl = '/templates/' + encodeURIComponent(nextItem.s) + '?to=' + encodeURIComponent(guest);

    head.innerHTML =
      '<div class="pv-head-left">' +
        '<a href="/#tema" class="pvh-round pvh-close" aria-label="Tutup" title="Kembali ke katalog">' + iconSvg('close') + '</a>' +
        '<div class="pvh-title-wrap">' +
          '<h1 class="pvh-title"></h1>' +
          '<div class="pv-head-sub"></div>' +
        '</div>' +
      '</div>' +
      '<div class="pv-head-right">' +
        '<a href="' + prevUrl + '" class="pv-icon pv-step" aria-label="Desain sebelumnya" title="Desain sebelumnya: ' + prevItem.n + '">' + iconSvg('prev') + '</a>' +
        '<a href="' + nextUrl + '" class="pv-icon pv-step" aria-label="Desain berikutnya" title="Desain berikutnya: ' + nextItem.n + '">' + iconSvg('next') + '</a>' +
        '<button type="button" class="pv-icon" id="rj-share-btn" aria-label="Bagikan pratinjau" title="Bagikan tautan pratinjau">' + iconSvg('share') + '</button>' +
        '<button type="button" class="pv-icon" id="rj-replay-btn" aria-label="Putar ulang" title="Putar ulang animasi pembuka">' + iconSvg('replay') + '</button>' +
        '<a href="' + checkoutUrl + '" class="pvh-action pv-go">Pesan Tema<span class="pv-go-tile" aria-hidden="true">' + iconSvg('arrow') + '</span></a>' +
      '</div>';

    head.querySelector('.pvh-title').textContent = item.n;
    head.querySelector('.pv-head-sub').textContent = catName + ' · Tamu: ' + guest + (item.p ? ' · ' + formatRupiah(item.p) : '');
    framed.appendChild(head);

    // Stage
    const stage = document.createElement('div');
    stage.className = 'pv-stage';

    // Foto / Tanpa Foto Toggle
    const defaultNoPhoto = item.c === 'minimotion' || slug.startsWith('minimotion-') || slug === 'syari-04';
    let photoMode = defaultNoPhoto ? 'tanpa' : 'foto';
    const photoWrap = document.createElement('div');
    photoWrap.className = 'pv-photo';
    photoWrap.innerHTML =
      '<button type="button" class="pv-photo-sw" data-on="' + photoMode + '" aria-label="Ganti mode foto">' +
        '<span class="pv-photo-word pv-photo-word--foto">' + iconSvg('foto') + '<span>Pakai<br>Foto</span></span>' +
        '<span class="pv-photo-word pv-photo-word--tanpa">' + iconSvg('tanpa') + '<span>Tanpa<br>Foto</span></span>' +
        '<span class="pv-photo-knob"></span>' +
      '</button>';
    const swBtn = photoWrap.querySelector('.pv-photo-sw');
    const knob = photoWrap.querySelector('.pv-photo-knob');
    function syncPhotoKnob() {
      swBtn.setAttribute('data-on', photoMode);
      knob.innerHTML = photoMode === 'foto'
        ? iconSvg('foto') + '<span>Pakai<br>Foto</span>'
        : iconSvg('tanpa') + '<span>Tanpa<br>Foto</span>';
    }
    syncPhotoKnob();
    stage.appendChild(photoWrap);

    // Phone container
    const phone = document.createElement('div');
    phone.className = 'pv-phone';
    const scaler = document.createElement('div');
    scaler.className = 'pv-phone-scaler';
    const screen = document.createElement('div');
    screen.className = 'pv-screen';
    scaler.appendChild(screen);
    phone.appendChild(scaler);
    stage.appendChild(phone);

    // Palette Switcher
    const warnaWrap = document.createElement('div');
    warnaWrap.className = 'pv-warna';
    const warnaPill = document.createElement('div');
    warnaPill.className = 'pv-warna-pill';
    PALETTES.forEach(function (pal, pIdx) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'pv-warna-cell';
      btn.setAttribute('data-on', pIdx === 0 ? '1' : '0');
      btn.setAttribute('data-palette', pal.key);
      btn.innerHTML =
        '<span class="pv-warna-swatch" style="background:' + pal.swatch + '"></span>' +
        '<span class="pv-warna-word">' + pal.label + '</span>';
      btn.onclick = function () {
        warnaPill.querySelectorAll('.pv-warna-cell').forEach(function (b) { b.setAttribute('data-on', '0'); });
        btn.setAttribute('data-on', '1');
        const active = pal.key === 'asli' ? basePalette : pal;
        framed.style.setProperty('--pv-paper', active.paper || basePalette.paper);
        if (typeof opts.onPaletteChange === 'function') {
          opts.onPaletteChange(active, pal.key);
        }
      };
      warnaPill.appendChild(btn);
    });
    warnaWrap.appendChild(warnaPill);
    stage.appendChild(warnaWrap);

    framed.appendChild(stage);

    // Share & Replay bindings
    head.querySelector('#rj-share-btn').onclick = async function () {
      const shareUrl = location.origin + '/templates/' + slug + '?to=' + encodeURIComponent(guest);
      if (navigator.share) {
        try {
          await navigator.share({ title: item.n + ' · RuangJanji', url: shareUrl });
          return;
        } catch (e) {}
      }
      try {
        await navigator.clipboard.writeText(shareUrl);
        showToast('✓ Tautan pratinjau berhasil disalin');
      } catch (e) {
        showToast('Salin tautan: ' + shareUrl);
      }
    };

    head.querySelector('#rj-replay-btn').onclick = function () {
      if (typeof opts.onReplay === 'function') opts.onReplay();
    };

    swBtn.onclick = function () {
      photoMode = photoMode === 'foto' ? 'tanpa' : 'foto';
      syncPhotoKnob();
      if (typeof opts.onPhotoToggle === 'function') {
        opts.onPhotoToggle(photoMode === 'tanpa');
      }
    };

    return { framed: framed, screen: screen, item: item, guest: guest, basePalette: basePalette, defaultNoPhoto: defaultNoPhoto };
  }

  // MODE A: Elementor Wrapper
  function initElementorStudio() {
    window.__RJ_STAGE_ACTIVE = true;
    const slug = resolveSlug();
    const params = new URLSearchParams(location.search);
    const to = (params.get('to') || 'Nama Tamu').trim();
    let currentNoPhoto = false;
    let currentPaletteKey = 'asli';
    let currentPaletteObj = null;

    const iframe = document.createElement('iframe');
    iframe.className = 'pv-embed-frame';
    const embedSrc = '/templates/' + encodeURIComponent(slug) + '.html?embed=1&to=' + encodeURIComponent(to);
    iframe.src = embedSrc;
    iframe.title = 'Pratinjau ' + slug;

    function syncIframeState() {
      try {
        iframe.contentWindow.postMessage({ type: 'rj:no-photo', value: currentNoPhoto }, '*');
        if (currentPaletteObj) {
          iframe.contentWindow.postMessage({ type: 'rj:palette', key: currentPaletteKey, palette: currentPaletteObj }, '*');
        }
      } catch (e) {}
    }

    iframe.addEventListener('load', syncIframeState);

    const shell = buildStudioShell({
      slug: slug,
      onReplay: function () {
        iframe.src = embedSrc + '&t=' + Date.now();
        showToast('Memutar ulang pembuka undangan');
      },
      onPhotoToggle: function (isNoPhoto) {
        currentNoPhoto = isNoPhoto;
        syncIframeState();
        showToast(isNoPhoto ? 'Mode Tanpa Foto aktif' : 'Mode Pakai Foto aktif');
      },
      onPaletteChange: function (pal, key) {
        currentPaletteKey = key;
        currentPaletteObj = pal;
        syncIframeState();
      }
    });

    shell.screen.appendChild(iframe);
    document.body.innerHTML = '';
    document.body.className = 'rj-preview-body';
    document.body.appendChild(shell.framed);
    document.documentElement.classList.remove('rj-staging');
    updateFitScale();
    window.addEventListener('resize', updateFitScale);
  }

  // MODE B: Native Interactive Engine
  function initNativeStudio() {
    window.__RJ_STAGE_ACTIVE = true;
    const inv = document.getElementById('rj-inv-root');
    if (!inv) return;

    const slug = resolveSlug();
    const params = new URLSearchParams(location.search);
    const guest = (params.get('to') || 'Nama Tamu').trim().slice(0, 80);

    let gate = inv.querySelector('.rj-gate');
    let audio = inv.querySelector('#rj-audio');
    let discBtn = inv.querySelector('#rj-disc-btn');

    const shell = buildStudioShell({
      slug: slug,
      onReplay: function () {
        if (gate) {
          gate.hidden = false;
          gate.classList.remove('is-opened');
        }
        inv.classList.add('is-locked');
        shell.screen.scrollTo({ top: 0, behavior: 'auto' });
        showToast('Memutar ulang pembuka undangan');
      },
      onPhotoToggle: function (isNoPhoto) {
        inv.classList.toggle('is-no-photo', isNoPhoto);
        showToast(isNoPhoto ? 'Mode Tanpa Foto aktif' : 'Mode Pakai Foto aktif');
      },
      onPaletteChange: function (pal) {
        inv.style.setProperty('--inv-bg', pal.bg || shell.basePalette.bg);
        inv.style.setProperty('--inv-surface', pal.surface || shell.basePalette.surface);
        inv.style.setProperty('--inv-accent', pal.accent || shell.basePalette.accent);
      }
    });

    inv.style.setProperty('--inv-bg', shell.basePalette.bg);
    inv.style.setProperty('--inv-surface', shell.basePalette.surface);
    inv.style.setProperty('--inv-accent', shell.basePalette.accent);
    if (shell.defaultNoPhoto) {
      inv.classList.add('is-no-photo');
    }

    inv.querySelectorAll('[data-guest]').forEach(function (el) {
      el.textContent = guest;
    });

    const particlesWrap = inv.querySelector('.rj-particles');
    if (particlesWrap && !particlesWrap.children.length) {
      const count = slug.startsWith('motion-') ? 18 : 10;
      for (let i = 0; i < count; i++) {
        const dot = document.createElement('span');
        dot.className = 'rj-particle';
        dot.style.left = ((i * 19 + 7) % 94) + '%';
        dot.style.animationDelay = ((i * 0.65) % 6).toFixed(2) + 's';
        dot.style.animationDuration = (5.5 + (i % 5) * 1.1).toFixed(2) + 's';
        particlesWrap.appendChild(dot);
      }
    }

    shell.screen.appendChild(inv);
    document.body.innerHTML = '';
    document.body.className = 'rj-preview-body';
    document.body.appendChild(shell.framed);
    updateFitScale();
    window.addEventListener('resize', updateFitScale);

    function setSpin(on) {
      if (discBtn) {
        discBtn.classList.toggle('is-spinning', on);
        discBtn.setAttribute('aria-pressed', on ? 'true' : 'false');
      }
    }
    function playMusic() {
      if (!audio) return;
      audio.play().then(function () { setSpin(true); }).catch(function () {});
    }
    function toggleMusic() {
      if (!audio) return;
      if (audio.paused) {
        playMusic();
      } else {
        audio.pause();
        setSpin(false);
      }
    }
    if (discBtn) discBtn.onclick = toggleMusic;

    const openBtn = inv.querySelector('.rj-open-btn');
    if (gate && openBtn) {
      inv.classList.add('is-locked');
      openBtn.onclick = function () {
        gate.classList.add('is-opened');
        inv.classList.remove('is-locked');
        playMusic();
      };
    }

    const targetTime = Date.now() + 14 * 24 * 60 * 60 * 1000;
    const dEl = inv.querySelector('[data-cd="d"]');
    const hEl = inv.querySelector('[data-cd="h"]');
    const mEl = inv.querySelector('[data-cd="m"]');
    const sEl = inv.querySelector('[data-cd="s"]');
    function tick() {
      if (!dEl) return;
      const diff = Math.max(0, targetTime - Date.now());
      dEl.textContent = String(Math.floor(diff / 86400000)).padStart(2, '0');
      hEl.textContent = String(Math.floor((diff / 3600000) % 24)).padStart(2, '0');
      mEl.textContent = String(Math.floor((diff / 60000) % 60)).padStart(2, '0');
      sEl.textContent = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');
    }
    tick();
    setInterval(tick, 1000);

    const icsBtn = inv.querySelector('#rj-save-ics');
    if (icsBtn) {
      icsBtn.onclick = function () {
        const dt = new Date(targetTime);
        const pad = function (n) { return String(n).padStart(2, '0'); };
        const y = dt.getUTCFullYear();
        const mo = pad(dt.getUTCMonth() + 1);
        const da = pad(dt.getUTCDate());
        const ics = [
          'BEGIN:VCALENDAR',
          'VERSION:2.0',
          'BEGIN:VEVENT',
          'SUMMARY:The Wedding of Adinda & Pratama',
          'DTSTART:' + y + mo + da + 'T020000Z',
          'DTEND:' + y + mo + da + 'T060000Z',
          'LOCATION:Grand Ballroom Heritage, Jakarta Selatan',
          'DESCRIPTION:Undangan Pernikahan Adinda & Pratama via RuangJanji',
          'END:VEVENT',
          'END:VCALENDAR'
        ].join('\r\n');
        const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'undangan-' + slug + '.ics';
        a.click();
        URL.revokeObjectURL(url);
        showToast('✓ Jadwal acara disimpan ke kalender');
      };
    }

    inv.querySelectorAll('[data-copy]').forEach(function (btn) {
      btn.onclick = async function () {
        const val = btn.getAttribute('data-copy');
        try {
          await navigator.clipboard.writeText(val);
          showToast('✓ Nomor rekening berhasil disalin!');
        } catch (e) {
          showToast('Nomor rekening: ' + val);
        }
      };
    });

    let lb = document.getElementById('rj-lightbox');
    if (!lb) {
      lb = document.createElement('div');
      lb.id = 'rj-lightbox';
      lb.className = 'rj-lightbox';
      lb.innerHTML = '<button type="button" class="rj-lightbox-close" aria-label="Tutup">✕</button><img src="" alt="Galeri Prewedding">';
      document.body.appendChild(lb);
      lb.onclick = function (e) {
        if (e.target === lb || e.target.classList.contains('rj-lightbox-close')) lb.classList.remove('is-open');
      };
    }
    inv.querySelectorAll('.rj-gallery-item img').forEach(function (img) {
      img.parentElement.onclick = function () {
        lb.querySelector('img').src = img.src;
        lb.classList.add('is-open');
      };
    });

    let qrModal = document.getElementById('rj-qr-modal');
    if (!qrModal) {
      qrModal = document.createElement('div');
      qrModal.id = 'rj-qr-modal';
      qrModal.className = 'rj-qr-modal';
      const qrCode = 'RJ-' + slug.toUpperCase() + '-' + encodeURIComponent(guest.toLowerCase().replace(/\s+/g, '-'));
      const qrImg = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&format=svg&data=' + encodeURIComponent(qrCode);
      qrModal.innerHTML =
        '<div class="rj-qr-card">' +
          '<button type="button" class="rj-qr-close" aria-label="Tutup">✕</button>' +
          '<h3 style="margin:0 0 6px;font-family:var(--hf-display);font-size:24px;">QR Presensi Tamu</h3>' +
          '<p style="margin:0 0 10px;font-family:var(--hf-ui);font-size:12px;color:#6c594d;">Tunjukkan QR ini saat check-in di buku tamu lokasi acara.</p>' +
          '<img src="' + qrImg + '" alt="QR Check-in Tamu">' +
          '<div style="font-weight:700;font-size:16px;margin-top:8px;">' + guest + '</div>' +
          '<div style="font-family:monospace;font-size:11px;color:#8e7c6d;margin-top:4px;">' + qrCode + '</div>' +
        '</div>';
      document.body.appendChild(qrModal);
      qrModal.onclick = function (e) {
        if (e.target === qrModal || e.target.classList.contains('rj-qr-close')) qrModal.classList.remove('is-open');
      };
    }
    const qrBtn = inv.querySelector('#rj-qr-btn');
    if (qrBtn) {
      qrBtn.onclick = function () { qrModal.classList.add('is-open'); };
    }

    const rsvpForm = inv.querySelector('#rj-rsvp-form');
    const wishesFeed = inv.querySelector('#rj-wishes-feed');
    const storageKey = 'ruangjanji-wishes-' + slug;
    const defaultWishes = [
      { nama: 'Raka & Nadia', status: 'Hadir', pesan: 'Selamat menempuh hidup baru! Semoga sakinah, mawaddah, warahmah selamanya.' },
      { nama: 'dr. Hendra Wijaya', status: 'Hadir', pesan: 'Barakallahu lakuma wa baraka alaikuma. Lancar sampai hari H ya!' },
      { nama: 'Siti Aminah', status: 'InsyaAllah Hadir', pesan: 'Turut berbahagia, semoga menjadi keluarga yang penuh berkah dan cinta.' }
    ];
    function renderWishes() {
      if (!wishesFeed) return;
      let saved = [];
      try { saved = JSON.parse(localStorage.getItem(storageKey) || '[]'); } catch (e) {}
      const list = saved.concat(defaultWishes);
      wishesFeed.replaceChildren();
      list.slice(0, 12).forEach(function (w) {
        const div = document.createElement('div');
        div.className = 'rj-wish-item';
        const strong = document.createElement('strong');
        strong.textContent = w.nama;
        const badge = document.createElement('span');
        badge.style.cssText = 'margin-left:6px;font-size:10.5px;color:var(--inv-accent);font-weight:700;';
        badge.textContent = '· ' + w.status;
        const p = document.createElement('div');
        p.style.marginTop = '4px';
        p.textContent = w.pesan;
        div.appendChild(strong);
        div.appendChild(badge);
        div.appendChild(p);
        wishesFeed.appendChild(div);
      });
    }
    if (rsvpForm) {
      if (rsvpForm.elements.nama && guest !== 'Nama Tamu') {
        rsvpForm.elements.nama.value = guest;
      }
      rsvpForm.onsubmit = function (e) {
        e.preventDefault();
        const fd = new FormData(rsvpForm);
        const entry = {
          nama: String(fd.get('nama') || guest).trim() || guest,
          status: String(fd.get('status') || 'Hadir').trim(),
          pesan: String(fd.get('pesan') || '').trim()
        };
        if (!entry.pesan) {
          showToast('Tulis ucapan & doa terlebih dahulu');
          return;
        }
        let saved = [];
        try { saved = JSON.parse(localStorage.getItem(storageKey) || '[]'); } catch (err) {}
        saved.unshift(entry);
        try { localStorage.setItem(storageKey, JSON.stringify(saved.slice(0, 30))); } catch (err) {}
        renderWishes();
        rsvpForm.reset();
        showToast('✓ Ucapan & konfirmasi kehadiran terkirim!');
      };
    }
    renderWishes();
  }

  function boot() {
    if (document.body && document.body.dataset.rjNative === '1') {
      initNativeStudio();
      return;
    }
    const isEmbed = location.search.includes('embed=1') || window.self !== window.top;
    if (!isEmbed && document.documentElement.classList.contains('rj-staging')) {
      initElementorStudio();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
