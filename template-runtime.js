// template-runtime.js (Versi Penuh: Countdown, Musik, Amplop Digital & Galeri)
// 1. Injeksi Nama Tamu Dinamis (?to=...)
const guestParam = new URLSearchParams(location.search).get('to')?.trim() || 'Tamu Undangan';
const guest = guestParam.slice(0, 80);
document.querySelectorAll('[data-guest], .namatamu .elementor-heading-title').forEach(el => {
  el.textContent = guest;
});

// 2. Kontrol Buka Undangan & Autoplay Musik
const opener = document.querySelector('[data-open], #tombolbuka, #open');
const cover = document.querySelector('.cover, #cover');
const audio = document.querySelector('#template-audio');
const music = document.querySelector('#template-music');

let startReveals = () => {};

if (opener && cover) {
  document.body.classList.add('template-locked');
  opener.onclick = (e) => {
    e.preventDefault();
    cover.classList.add('opened');
    document.body.classList.remove('template-locked');
    document.body.classList.add('rj-opened');
    startReveals();

    setTimeout(() => { cover.hidden = true; }, 800);

    // Autoplay musik latar saat sampul dibuka
    if (audio && audio.getAttribute('src')) {
      audio.play().then(() => {
        if (music) {
          music.setAttribute('aria-pressed', 'true');
          music.classList.add('rj-music-spinning');
        }
      }).catch(() => {});
    }
  };
}

// Kontrol Tombol Musik
if (music) {
  music.hidden = !(audio && audio.getAttribute('src'));
  music.onclick = () => {
    if (!audio) return;
    if (audio.paused) {
      audio.play().then(() => {
        music.setAttribute('aria-pressed', 'true');
        music.classList.add('rj-music-spinning');
      }).catch(() => {});
    } else {
      audio.pause();
      music.setAttribute('aria-pressed', 'false');
      music.classList.remove('rj-music-spinning');
    }
  };
}

document.addEventListener('visibilitychange', () => {
  if (document.hidden && audio) {
    audio.pause();
    if (music) {
      music.setAttribute('aria-pressed', 'false');
      music.classList.remove('rj-music-spinning');
    }
  }
});

// 3. Countdown Timer Real-time (Menghidupkan .jet-countdown-timer)
function initCountdown() {
  document.querySelectorAll('.jet-countdown-timer').forEach(timer => {
    let rawDue = timer.getAttribute('data-due-date');
    let targetTime = rawDue ? Number(rawDue) * 1000 : null;

    // Jika expired atau demo tanpa tanggal, set 14 hari ke depan agar selalu berdetik aktif
    if (!targetTime || targetTime < Date.now()) {
      targetTime = Date.now() + (14 * 24 * 60 * 60 * 1000);
    }

    const updateTimer = () => {
      const diff = Math.max(0, targetTime - Date.now());
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      const setVal = (cls, val) => {
        const item = timer.querySelector(cls);
        if (item) {
          const str = String(val).padStart(2, '0');
          const digits = item.querySelectorAll('.jet-countdown-timer__digit');
          if (digits.length >= 2) {
            digits[0].textContent = str[0];
            digits[1].textContent = str[1];
          } else {
            item.textContent = str;
          }
        }
      };

      setVal('.item-days .jet-countdown-timer__item-value', days);
      setVal('.item-hours .jet-countdown-timer__item-value', hours);
      setVal('.item-minutes .jet-countdown-timer__item-value', minutes);
      setVal('.item-seconds .jet-countdown-timer__item-value', seconds);
    };

    updateTimer();
    setInterval(updateTimer, 1000);
  });
}
initCountdown();

// 4. Amplop Digital: Salin Nomor Rekening dengan Notifikasi Toast
function showToast(msg) {
  let toast = document.getElementById('rj-copy-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'rj-copy-toast';
    toast.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:#2C221E;color:#F5EBE6;padding:10px 20px;border-radius:50px;font:600 13px system-ui;z-index:9999;box-shadow:0 4px 20px rgba(0,0,0,0.3);transition:opacity 0.3s;pointer-events:none;';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.opacity = '1';
  setTimeout(() => { toast.style.opacity = '0'; }, 3000);
}

document.querySelectorAll('[data-copy], [data-clipboard-text], .elementor-widget-cobakekiri-copy a').forEach(btn => {
  btn.onclick = async (e) => {
    e.preventDefault();
    const textToCopy = btn.getAttribute('data-copy') || btn.getAttribute('data-clipboard-text') || '12345678';
    try {
      await navigator.clipboard.writeText(textToCopy);
      showToast('✓ Nomor rekening berhasil disalin!');
    } catch {
      showToast('Nomor rekening: ' + textToCopy);
    }
  };
});

// 5. Pengisian Foto Galeri Prewedding Demo (Mengganti Kotak Abu-abu Kosong)
const samplePhotos = [
  'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&auto=format&fit=crop&q=80'
];

document.querySelectorAll('.template-gallery-photo, .template-photo').forEach((slot, index) => {
  if (!slot.style.backgroundImage && !slot.querySelector('img')) {
    const photoUrl = samplePhotos[index % samplePhotos.length];
    slot.style.backgroundImage = 'url(' + photoUrl + ')';
    slot.style.backgroundSize = 'cover';
    slot.style.backgroundPosition = 'center';
  }
});

// 6. Animasi Scroll Reveal
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reducedMotion && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('entered');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  let started = false;
  startReveals = () => {
    if (started) return;
    started = true;
    document.querySelectorAll('[data-enter]').forEach(element => observer.observe(element));
  };
}

if (!opener || !cover) {
  document.body.classList.add('rj-opened');
  startReveals();
}

// 7. Form RSVP Demo (LocalStorage)
document.querySelectorAll('.template-rsvp').forEach(form => {
  const key = 'ruang-janji-rsvp-' + (document.body.dataset.theme || 'demo');
  if (form.elements.nama) {
    form.elements.nama.value = guest === 'Tamu Undangan' ? '' : guest;
  }
  const render = (rows) => {
    const area = form.querySelector('.template-wishes');
    if (!area) return;
    area.replaceChildren();
    rows.slice(-5).reverse().forEach(row => {
      const p = document.createElement('p');
      p.textContent = row.nama + ' · ' + row.ucapan;
      area.append(p);
    });
  };
  try { render(JSON.parse(localStorage.getItem(key) || '[]')); } catch {}

  form.onsubmit = (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const row = {
      nama: String(data.get('nama') || '').trim(),
      ucapan: String(data.get('ucapan') || '').trim()
    };
    if (!row.nama || !row.ucapan) return;
    try {
      const rows = JSON.parse(localStorage.getItem(key) || '[]');
      rows.push(row);
      localStorage.setItem(key, JSON.stringify(rows.slice(-100)));
      render(rows);
      showToast('✓ Ucapan dan doa Anda berhasil dikirim!');
    } catch {}
  };
});
