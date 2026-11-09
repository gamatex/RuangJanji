// Ganti baris penanganan theme-preview di worker.js:
if (path === '/theme-preview.html' || path === '/theme-preview') {
  const slug = url.searchParams.get('tema') || 'art-01';
  const to = url.searchParams.get('to') || 'Tamu Undangan';
  
  // Jika tema termasuk dalam 27 template yang tersedia, langsung layani template aslinya:
  const validThemes = [
    'art-01','art-02','art-03','art-04',
    'birthday-01','birthday-02',
    'deluxe-01','deluxe-02','deluxe-03','deluxe-04','deluxe-05','deluxe-06','deluxe-07','deluxe-08',
    'minisite-01','minisite-02','minisite-03','minisite-04','minisite-05','minisite-06','minisite-07','minisite-08','minisite-09','minisite-10',
    'syari-01','syari-02','syari-03'
  ];
  
  if (validThemes.includes(slug)) {
    const target = new URL(`/templates/${slug}.html?to=${encodeURIComponent(to)}`, url);
    return env.ASSETS.fetch(new Request(target, request));
  }
  
  return interactiveDemo(slug);
}
