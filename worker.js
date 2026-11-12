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
  'art-01', 'art-02', 'art-03', 'art-04',
  'birthday-01', 'birthday-02',
  'deluxe-01', 'deluxe-02', 'deluxe-03', 'deluxe-04', 'deluxe-05', 'deluxe-06', 'deluxe-07', 'deluxe-08',
  'minisite-01', 'minisite-02', 'minisite-03', 'minisite-04', 'minisite-05', 'minisite-06', 'minisite-07', 'minisite-08', 'minisite-09', 'minisite-10',
  'syari-01', 'syari-02', 'syari-03'
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
    if (/^\/templates\/[a-z0-9]+(?:-[a-z0-9]+)+\/?$/.test(path)) {
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
