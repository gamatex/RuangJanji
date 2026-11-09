import { previewImages } from './apps/ruangjanji/template-images.js';
import { interactiveDemo } from './interactive-demo.js';

// Rute statis sistem yang TIDAK BOLEH ditangkap sebagai slug undangan tamu
const RESERVED_ROUTES = new Set([
  'checkout',
  'invoice',
  'theme-preview',
  'invitation',
  'minang',
  'petualangan',
  'motion-jawa'
]);

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;
    const cleanPath = path.replace(/\/+$/, '');
    const bareSlug = cleanPath.slice(1);

    // 1. Health check diagnosis
    if (path === '/__ruangjanji_health') {
      return new Response(JSON.stringify({ ok: true, version: 'fixed-routing-v4', path, host: url.host }), {
        headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' }
      });
    }

    // 2. Demo interaktif
    if (path === '/theme-preview.html' || path === '/theme-preview') {
      return interactiveDemo(url.searchParams.get('tema') || '');
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
