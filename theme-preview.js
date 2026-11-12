import { previewImages } from './apps/ruangjanji/template-images.js';

// 27 Template Interaktif Asli Cloned dari Elementor
const interactiveTemplates = new Set([
  "art-01",
  "art-02",
  "art-03",
  "art-04",
  "birthday-01",
  "birthday-02",
  "deluxe-01",
  "deluxe-02",
  "deluxe-03",
  "deluxe-04",
  "deluxe-05",
  "deluxe-06",
  "deluxe-07",
  "deluxe-08",
  "minisite-01",
  "minisite-02",
  "minisite-03",
  "minisite-04",
  "minisite-05",
  "minisite-06",
  "minisite-07",
  "minisite-08",
  "minisite-09",
  "minisite-10",
  "syari-01",
  "syari-02",
  "syari-03",
  "paper-promise",
  "doodle-vows",
  "matcha-strawberry",
  "letters-from-java",
  "editorial-sampul",
  "line-story",
  "sinema-cinta",
  "minang-saiyo-baru",
  "kamboja-bali-baru",
  "blush-confetti",
  "crescent-linen",
  "mendung-kasepuhan",
  "mandailing",
  "dino-picnic",
  "zaitun-morning",
  "panggung-betawi",
  "saung-padi",
  "little-crown-garden",
  "mihrab-khitan",
  "lawang-terakota",
  "gorga-emas-baru",
  "little-fire-station",
  "betawi-khitan",
  "telaga-cemara",
  "wayang-gunungan-baru",
  "little-hero-parade",
  "sunda-khitan",
  "sanding-emas-baru",
  "rumoh-seulawah",
  "moonbeam-mission",
  "minang-khitan",
  "melati-kemayoran",
  "garis-tangan-baru",
  "tiny-race-day",
  "melayu-khitan",
  "musim-gugur-baru",
  "mihrab-mawar",
  "under-the-sea",
  "aceh-khitan",
  "lili-gading-baru",
  "batak-karo",
  "woodland-camp",
  "bugis-khitan",
  "embun-pagi",
  "danau-kerinci",
  "little-garden-jubilee",
  "purnama-khitan",
  "biru-manten-baru",
  "tana-ugi",
  "little-meadow-scout",
  "jagoan-khitan",
  "sunda-watercolor",
  "bubungan-intan",
  "cherry-picnic",
  "balap-khitan",
  "kebun-zaitun",
  "secret-garden",
  "silk-and-ink",
  "antariksa-khitan",
  "pucuk-nilam",
  "editorial-lookbook",
  "limone-afterglow",
  "dino-khitan",
  "jawa-biru",
  "batak-toba",
  "taman-kaca-ultah",
  "pramuka-khitan",
  "kidung-dewata",
  "joglo-asri",
  "sakura-ultah",
  "rumah-gadang-baru",
  "bugis-makassar-baru",
  "marmer-ultah",
  "pintu-aceh-baru",
  "jawa-maroon",
  "salon-ultah",
  "gerbang-melati-baru",
  "bugis-pesisir-baru",
  "bunga-ceria-ultah",
  "ulos-saroha-baru",
  "ampera-senja",
  "beludru-ultah",
  "hitam-putih-baru",
  "editorial-noir",
  "merak-gala-ultah",
  "royal-garden",
  "bunga-subuh",
  "kupu-ultah",
  "album-kenangan",
  "bunga-rangkiang-baru",
  "renda-ultah",
  "kupu-langit-baru",
  "romansa-pantai",
  "noir-ultah",
  "siger-lampung",
  "biru-purnama-baru",
  "linen-ultah",
  "kasual-modern-baru",
  "sakura",
  "nila-ultah",
  "istana-bunga",
  "editorial-grid",
  "paspor-ultah",
  "rusa-kencana",
  "minang-gadang-baru",
  "zamrud-ultah",
  "wedding-post",
  "merah-delima",
  "cemara-ultah",
  "tatar-sunda",
  "balon-awan",
  "pantai-ultah",
  "cerita-ugi",
  "pendopo-jati",
  "gugur-ultah",
  "kartu-pos-baru",
  "kolam-marmer",
  "batik-ultah",
  "sekar-hening",
  "jawa-chinoiserie-baru",
  "bingkai-pualam-baru",
  "kawih-priangan",
  "gapura-parahyangan-baru",
  "sunda-kancana",
  "betang-borneo",
  "anggrek-senja-baru",
  "taman-pastel-baru",
  "serambi-melayu",
  "kidung-putih-baru",
  "melayu-jambi-baru",
  "merak-malam-baru",
  "merak-zamrud-baru",
  "pura-bali-baru",
  "sanggar-renda-baru",
  "selaso-kembar-baru",
  "songket-palembang-baru",
  "jawa-klasik",
  "bolon-merah",
  "mawar-nila",
  "classy-whimsical",
  "faded-garden-vows",
  "maroon-velvet",
  "plumline-parlour",
  "whimsy-bloom"
]);

const params = new URLSearchParams(location.search);
const slug = (params.get('tema') || '').trim();
const to = (params.get('to') || 'Tamu Undangan').trim();

// 1. Jika tema merupakan salah satu dari 27 template Elementor interaktif, langsung alihkan ke demo interaktif
if (interactiveTemplates.has(slug)) {
  location.replace('/templates/' + slug + '?to=' + encodeURIComponent(to));
} else {
  // 2. Tampilkan pratinjau tema dengan detail pemesanan & link demo interaktif serupa
  const image = slug && Object.hasOwn(previewImages, slug) ? previewImages[slug] : null;
  const name = slug ? slug.replace(/-/g, ' ').replace(/\b\w/g, s => s.toUpperCase()) : 'Tema Undangan';

  const titleEl = document.querySelector('#title');
  if (titleEl) titleEl.textContent = name;
  document.title = name + ' · RuangJanji';

  const badgeEl = document.querySelector('#category-badge');
  if (badgeEl) {
    if (slug.startsWith('deluxe')) badgeEl.textContent = 'Koleksi Deluxe';
    else if (slug.startsWith('minisite')) badgeEl.textContent = 'Koleksi MiniSite';
    else if (slug.startsWith('art')) badgeEl.textContent = 'Koleksi Art';
    else if (slug.startsWith('birthday')) badgeEl.textContent = 'Koleksi Birthday';
    else if (slug.startsWith('syari')) badgeEl.textContent = "Koleksi Syar'i";
    else if (slug.startsWith('minimotion')) badgeEl.textContent = 'Koleksi MiniMotion';
    else if (slug.startsWith('motion')) badgeEl.textContent = 'Koleksi Motion';
    else badgeEl.textContent = 'Undangan Digital';
  }

  const isTier1 = slug.startsWith('deluxe') || slug.startsWith('minisite');
  const priceEl = document.querySelector('#price');
  const wasPriceEl = document.querySelector('#was-price');
  if (priceEl && wasPriceEl) {
    if (isTier1) {
      priceEl.childNodes[0].nodeValue = 'Rp 99.000 ';
      wasPriceEl.textContent = 'Rp 198.000';
    } else {
      priceEl.childNodes[0].nodeValue = 'Rp 49.000 ';
      wasPriceEl.textContent = 'Rp 98.000';
    }
  }

  const stateEl = document.querySelector('#state');
  if (stateEl) {
    stateEl.textContent = 'Desain premium dengan animasi memukau, tata letak responsif HP & desktop, musik latar otomatis, dan integrasi fitur terlengkap.';
  }

  const preview = document.querySelector('#image');
  if (preview) {
    if (image) {
      preview.src = '/' + image;
      preview.alt = 'Pratinjau ' + name;
    } else {
      preview.hidden = true;
    }
  }

  const btnOrder = document.querySelector('#btn-order');
  if (btnOrder) {
    btnOrder.href = '/checkout.html?tema=' + encodeURIComponent(slug || 'deluxe-01');
    btnOrder.textContent = 'Pesan ' + name + ' Sekarang →';
  }

  const btnLiveDemo = document.querySelector('#btn-live-demo');
  if (btnLiveDemo) {
    const demoSample = slug.startsWith('minisite') ? 'minisite-01' : (slug.startsWith('syari') ? 'syari-01' : 'deluxe-01');
    btnLiveDemo.href = '/templates/' + demoSample + '?to=' + encodeURIComponent(to);
    const span = btnLiveDemo.querySelector('span');
    if (span) {
      span.textContent = 'Lihat Demo Interaktif Serupa (' + demoSample.toUpperCase() + ') ↗';
    }
  }
}
