import { previewImages } from './apps/ruangjanji/template-images.js';
import { interactiveDemo } from './interactive-demo.js';

// Rute statis sistem yang TIDAK BOLEH ditangkap sebagai slug undangan tamu (mencegah infinite 307 loop)
const RESERVED_ROUTES = new Set([
  'checkout',
  'invoice',
  'theme-preview',
  'invitation',
  'minang',
  'petualangan',
  'motion-jawa'
]);

// 27 Template yang valid dan siap dilayani langsung
const VALID_THEMES = new Set([
  'art-01', 'art-02', 'art-03', 'art-04',
  'birthday-01', 'birthday-02',
  'deluxe-01', 'deluxe-02', 'deluxe-03', 'deluxe-04', 'deluxe-05', 'deluxe-06', 'deluxe-07', 'deluxe-08',
  'minisite-01', 'minisite-02', 'minisite-03', 'minisite-04', 'minisite-05', 'minisite-06', 'minisite-07', 'minisite-08', 'minisite-09', 'minisite-10',
  'syari-01', 'syari-02', 'syari-03'
]);

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;
    const cleanPath = path.replace(/\/+$/, '');
    const bareSlug = cleanPath.slice(1);

    // 1. Health check diagnosis
    if (path === '/__ruangjanji_health') {
      return new Response(JSON.stringify({ ok: true, version: 'fixed-routing-v5', path, host: url.host }), {
        headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' }
      });
    }

    // 2. Demo interaktif & Theme Preview (layani template asli jika ada dalam daftar 27 template)
    if (path === '/theme-preview.html' || path === '/theme-preview') {
      const slug = url.searchParams.get('tema') || 'art-01';
      const to = url.searchParams.get('to') || 'Tamu Undangan';
      if (VALID_THEMES.has(slug)) {
        const target = new URL(`/templates/${slug}.html?to=${encodeURIComponent(to)}`, url);
        return env.ASSETS.fetch(new Request(target, request));
      }
      return interactiveDemo(slug);
    }

    // 3. Layani clean URL halaman sistem tanpa memicu redirect 307 loop
    if (RESERVED_ROUTES.has(bareSlug)) {
      const mappedUrl = new URL(`/${bareSlug}.html`, url);
      return env.ASSETS.fetch(new Request(mappedUrl, request));
    }

    // 4. Clean URLs untuk template (/templates/art-01 -> /templates/art-01.html)
    if (/^\/templates\/[a-z0-9]+(?:-[a-z0-9]+)+\/?$/.test(path)) {
      const templateName = path.split('/').filter(Boolean).pop();
      const target = new URL(`/templates/${templateName}.html`, url);
      return env.ASSETS.fetch(new Request(target, request));
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
      const u = new URL('/invitation.html', url);
      return env.ASSETS.fetch(new Request(u, request));
    }

    return env.ASSETS.fetch(request);
  }
};
