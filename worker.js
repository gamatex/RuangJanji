import { previewImages } from './apps/ruangjanji/template-images.js';

// Rute statis sistem yang TIDAK BOLEH ditangkap sebagai slug undangan tamu
const RESERVED_ROUTES = new Set([
  'checkout',
  'invoice',
  'theme-preview',
  'invitation',
  'minang',
  'petualangan',
  'motion-jawa',
  'privacy'
]);

// 27 Template yang valid dan siap dilayani langsung
const VALID_THEMES = new Set([
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

// Helper untuk mengambil asset dengan proteksi penuh dari 307 redirect loop
async function safeAssetFetch(env, targetUrl, originalRequest) {
  let res = await env.ASSETS.fetch(new Request(targetUrl, originalRequest));
  
  // Jika Cloudflare Assets mengembalikan redirect (301, 302, 307, 308), cegah loop dengan menyajikan body target langsung
  if (res.status >= 300 && res.status < 400) {
    const loc = res.headers.get('location');
    if (loc) {
      const redirectTarget = new URL(loc, targetUrl);
      const followedRes = await env.ASSETS.fetch(new Request(redirectTarget, originalRequest));
      if (followedRes.status === 200) {
        return followedRes;
      }
    }
    // Jika masih status redirect, kembalikan body sebagai 200 OK
    return new Response(res.body, {
      status: 200,
      headers: {
        'content-type': res.headers.get('content-type') || 'text/html; charset=utf-8',
        'cache-control': 'public, max-age=0, must-revalidate'
      }
    });
  }
  return res;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;
    const cleanPath = path.replace(/\/+$/, '');
    const bareSlug = cleanPath.slice(1);

    // 0. Transparent Proxy for Next.js and CDN assets from template engine
    if (path.startsWith('/_next/') || path.startsWith('/covers/') || path.startsWith('/covers-square/') || path.startsWith('/brand/')) {
      const upstreamUrl = 'https://undangyuk.id' + path + url.search;
      const upstreamRes = await fetch(upstreamUrl, {
        headers: {
          'User-Agent': request.headers.get('User-Agent') || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          'Accept': request.headers.get('Accept') || '*/*'
        }
      });
      const headers = new Headers(upstreamRes.headers);
      headers.set('access-control-allow-origin', '*');
      headers.set('cache-control', 'public, max-age=604800, immutable');
      return new Response(upstreamRes.body, { status: upstreamRes.status, headers });
    }

    // 0b. Redirect /template/<slug> -> /templates/<slug>
    if (path.startsWith('/template/')) {
      const target = '/templates/' + path.slice('/template/'.length) + url.search;
      return Response.redirect(url.origin + target, 302);
    }

    // 1. Health check diagnosis
    if (path === '/__ruangjanji_health') {
      return new Response(JSON.stringify({ ok: true, version: 'fixed-routing-v7-noloop', path, host: url.host }), {
        headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' }
      });
    }

    // 2. Demo interaktif & Theme Preview (redirect 302 ke template asli jika tema valid)
    if (path === '/theme-preview.html' || path === '/theme-preview') {
      const slug = (url.searchParams.get('tema') || '').trim();
      const to = (url.searchParams.get('to') || 'Tamu Undangan').trim();
      if (VALID_THEMES.has(slug)) {
        return Response.redirect(`${url.origin}/templates/${slug}?to=${encodeURIComponent(to)}`, 302);
      }
      return safeAssetFetch(env, new URL('/theme-preview' + url.search, url), request);
    }

    // 3. Layani clean URL halaman sistem tanpa memicu redirect 307 loop
    if (RESERVED_ROUTES.has(bareSlug)) {
      return safeAssetFetch(env, new URL(`/${bareSlug}${url.search}`, url), request);
    }

    // 4. Clean URLs untuk template (/templates/art-01)
    if (/^\/templates\/[a-z0-9-]+\/?$/.test(path)) {
      return safeAssetFetch(env, new URL(cleanPath + url.search, url), request);
    }

    // 5. Asset statis bawaan, folder apps, packages, dan file biner
    if (
      path === '/' ||
      path.startsWith('/apps/') ||
      path.startsWith('/packages/') ||
      path.startsWith('/catalog-assets/') ||
      path.startsWith('/templates/') ||
      path.startsWith('/demo/') ||
      path.includes('.')
    ) {
      return env.ASSETS.fetch(request);
    }

    // 6. Rute undangan publik pelanggan (hanya jika bukan reserved keyword)
    if (/^\/[a-z0-9-]{3,80}$/.test(cleanPath) && !RESERVED_ROUTES.has(bareSlug)) {
      const u = new URL('/invitation' + url.search, url);
      let invRes = await safeAssetFetch(env, u, request);
      return new Response(invRes.body, {
        status: 200,
        headers: {
          'content-type': 'text/html; charset=utf-8',
          'cache-control': 'public, max-age=0, must-revalidate'
        }
      });
    }

    return env.ASSETS.fetch(request);
  }
};
