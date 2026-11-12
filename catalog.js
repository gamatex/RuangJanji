// RuangJanji Catalog Controller (Enhanced Search & Multi-Category Engine)
const cards = [...document.querySelectorAll('[data-theme]')];
const categories = [...document.querySelectorAll('[data-kv-cat]')];
const catNotes = [...document.querySelectorAll('[data-kv-catnote]')];
const moreBtn = document.querySelector('[data-kv-more]');
const showAllBtn = document.querySelector('#kv-show-all');
const searchInput = document.querySelector('#kv-search-input');
const searchClearBtn = document.querySelector('#kv-search-clear');
const searchCountEl = document.querySelector('#kv-search-count');

let currentCategory = 'all';
let searchQuery = '';
let limit = 24;

function filterCards() {
  const q = searchQuery.toLowerCase().trim();

  const matches = cards.filter(card => {
    // 1. Category filter
    const matchesCategory = currentCategory === 'all' || card.dataset.kvCats === currentCategory;
    if (!matchesCategory) return false;

    // 2. Search filter
    if (!q) return true;
    const themeSlug = (card.dataset.theme || '').toLowerCase();
    const cardText = card.textContent.toLowerCase();
    return themeSlug.includes(q) || cardText.includes(q);
  });

  // Hide all cards, then reveal up to current limit
  cards.forEach(card => card.hidden = true);
  matches.slice(0, limit).forEach(card => card.hidden = false);

  // Update category buttons active state
  categories.forEach(button => {
    const isSelected = button.dataset.kvCat === currentCategory;
    button.setAttribute('aria-selected', String(isSelected));
    button.classList.toggle('is-active', isSelected);
  });

  // Update category specification notes
  catNotes.forEach(note => {
    note.hidden = note.dataset.kvCatnote !== currentCategory;
  });

  // Update More and Show All buttons
  if (moreBtn) {
    moreBtn.hidden = matches.length <= limit;
    moreBtn.textContent = `Muat 24 tema lainnya (${matches.length - limit} tersisa)`;
  }
  if (showAllBtn) {
    showAllBtn.hidden = matches.length <= limit;
    showAllBtn.textContent = `Tampilkan Semua (${matches.length} tema)`;
  }

  // Update search meta count text
  if (searchCountEl) {
    if (q) {
      searchCountEl.textContent = matches.length > 0
        ? `Ditemukan ${matches.length} tema untuk "${searchQuery}"`
        : `Tidak ada tema yang cocok dengan "${searchQuery}". Coba kata kunci lain.`;
    } else if (currentCategory === 'all') {
      searchCountEl.textContent = `Menampilkan ${matches.length} tema pilihan lengkap`;
    } else {
      const activeCatName = categories.find(b => b.dataset.kvCat === currentCategory)?.childNodes[0]?.textContent?.trim() || currentCategory;
      searchCountEl.textContent = `Kategori ${activeCatName}: ${matches.length} tema`;
    }
  }

  if (searchClearBtn) {
    searchClearBtn.hidden = !q;
  }

  // Update browser URL query params
  const url = new URL(location.href);
  if (currentCategory === 'all') url.searchParams.delete('kategori');
  else url.searchParams.set('kategori', currentCategory);

  if (!q) url.searchParams.delete('cari');
  else url.searchParams.set('cari', searchQuery);

  history.replaceState(null, '', url);
}

// Event Listeners for Categories
categories.forEach(button => {
  button.onclick = () => {
    currentCategory = button.dataset.kvCat;
    limit = 24;
    filterCards();
  };
});

// Search input listener
if (searchInput) {
  searchInput.addEventListener('input', e => {
    searchQuery = e.target.value;
    limit = 24;
    filterCards();
  });
}

// Clear search button
if (searchClearBtn) {
  searchClearBtn.onclick = () => {
    searchQuery = '';
    if (searchInput) {
      searchInput.value = '';
      searchInput.focus();
    }
    filterCards();
  };
}

// Load more & Show all
if (moreBtn) {
  moreBtn.onclick = () => {
    limit += 24;
    filterCards();
  };
}

if (showAllBtn) {
  showAllBtn.onclick = () => {
    limit = cards.length;
    filterCards();
  };
}

// Initialize from URL query parameters if present
const params = new URLSearchParams(location.search);
const initCategory = params.get('kategori');
if (initCategory && categories.some(b => b.dataset.kvCat === initCategory)) {
  currentCategory = initCategory;
}
const initSearch = params.get('cari');
if (initSearch && searchInput) {
  searchQuery = initSearch;
  searchInput.value = initSearch;
}

// Initial Run
filterCards();

// Close top strip banner
document.querySelector('[data-kv-strip-close]')?.addEventListener('click', () => {
  document.documentElement.classList.add('kv-strip-off');
});

// Mobile Bottom Sheet Navigation
const sheet = document.querySelector('#kv-sheet');
function toggleSheet(open) {
  sheet?.classList.toggle('is-open', open);
  document.querySelectorAll('[data-kv-sheet-open]').forEach(button => {
    button.setAttribute('aria-expanded', String(open));
  });
}
document.querySelectorAll('[data-kv-sheet-open]').forEach(button => {
  button.onclick = () => toggleSheet(!sheet?.classList.contains('is-open'));
});
document.querySelectorAll('[data-kv-sheet-close]').forEach(button => {
  button.onclick = () => toggleSheet(false);
});
sheet?.addEventListener('click', e => {
  if (e.target === sheet || e.target.closest('a')) toggleSheet(false);
});
addEventListener('keydown', e => {
  if (e.key === 'Escape') toggleSheet(false);
});

// Notification Panel
const notice = document.querySelector('[aria-controls="kv-notif-panel"]');
if (notice) {
  notice.onclick = () => {
    const panel = document.querySelector('#kv-notif-panel');
    if (!panel) return;
    const expanded = notice.getAttribute('aria-expanded') === 'true';
    notice.setAttribute('aria-expanded', String(!expanded));
    panel.hidden = expanded;
    panel.classList.toggle('is-open', !expanded);
  };
}

// Dialog Info Modal
const info = document.querySelector('#catalog-info');
document.querySelectorAll('[data-info]').forEach(link => {
  link.onclick = event => {
    event.preventDefault();
    info.querySelector('h2').textContent = link.dataset.info;
    const login = link.dataset.info.startsWith('Masuk');
    info.querySelector('p').textContent = login
      ? 'Dasbor akun Ruang Janji sedang disiapkan. Anda dapat mencoba pemesanan dan melihat invoice melalui halaman checkout.'
      : 'Bagian ini sedang disiapkan. Hubungi admin untuk informasi layanan Ruang Janji.';
    info.showModal();
  };
});
document.querySelector('#close-info')?.addEventListener('click', () => info.close());
