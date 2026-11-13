import { previewImages } from './apps/ruangjanji/template-images.js';

// 27 Template Interaktif Asli Cloned dari Elementor
const interactiveTemplates = new Set([
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
  "whimsy-bloom",
  "motion-35",
  "motion-34",
  "motion-33",
  "motion-32",
  "motion-31",
  "minimotion-35",
  "minimotion-34",
  "minimotion-33",
  "minimotion-32",
  "minimotion-31",
  "minimotion-30",
  "minimotion-29",
  "minimotion-28",
  "minimotion-27",
  "minimotion-26",
  "minimotion-25",
  "minimotion-24",
  "minimotion-23",
  "minimotion-22",
  "minimotion-21",
  "minimotion-20",
  "minimotion-19",
  "minimotion-18",
  "minimotion-17",
  "minimotion-16",
  "minimotion-15",
  "minimotion-14",
  "minimotion-13",
  "minimotion-12",
  "minimotion-11",
  "minimotion-10",
  "minimotion-09",
  "minimotion-08",
  "minimotion-07",
  "minimotion-06",
  "minimotion-05",
  "minimotion-04",
  "minimotion-03",
  "minimotion-02",
  "minimotion-01",
  "deluxe-08",
  "deluxe-07",
  "deluxe-06",
  "deluxe-05",
  "deluxe-04",
  "deluxe-03",
  "deluxe-02",
  "deluxe-01",
  "birthday-02",
  "birthday-01",
  "art-04",
  "art-03",
  "art-02",
  "art-01",
  "motion-30",
  "motion-29",
  "motion-28",
  "motion-27",
  "motion-26",
  "motion-25",
  "motion-24",
  "motion-23",
  "motion-22",
  "motion-21",
  "motion-20",
  "motion-19",
  "motion-18",
  "motion-17",
  "motion-16",
  "motion-15",
  "motion-14",
  "motion-13",
  "motion-12",
  "motion-11",
  "motion-10",
  "motion-09",
  "motion-08",
  "motion-07",
  "motion-06",
  "motion-05",
  "motion-04",
  "motion-03",
  "motion-02",
  "motion-01",
  "minisite-10",
  "minisite-09",
  "minisite-08",
  "minisite-07",
  "minisite-06",
  "minisite-05",
  "minisite-04",
  "minisite-03",
  "minisite-02",
  "minisite-01",
  "syari-04",
  "syari-03",
  "syari-02",
  "syari-01"
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
