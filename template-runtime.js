// template-runtime.js — Engine Undangan Interaktif RuangJanji (Paritas Penuh dengan Kekondangan.id)

// 1. Injeksi Nama Tamu Dinamis (?to=...)
const urlParams = new URLSearchParams(location.search);
const guestParam = urlParams.get('to')?.trim() || 'Nama Tamu';
const guest = guestParam.slice(0, 80);

document.querySelectorAll('[data-guest], .namatamu .elementor-heading-title, .elementor-heading-title.namatamu').forEach(el => {
  el.textContent = guest;
});

// 2. Kontrol Buka Undangan & Autoplay Musik
const cover = document.querySelector('.cover, #cover');
const audio = document.querySelector('#template-audio, #song') || document.querySelector('audio');
const musicBtn = document.querySelector('#template-music');
const wdsPlay = document.querySelector('#wds_audio_play');
const wdsPause = document.querySelector('#wds_audio_pause');
const wdsWidget = document.querySelector('.elementor-widget-wds_audio');

let startReveals = () => {};

function setMusicPlayingState(isPlaying) {
  if (musicBtn) {
    musicBtn.setAttribute('aria-pressed', isPlaying ? 'true' : 'false');
    musicBtn.classList.toggle('rj-music-spinning', isPlaying);
  }
  if (wdsWidget) {
    wdsWidget.classList.toggle('rj-playing', isPlaying);
  }
  if (wdsPlay && wdsPause) {
    wdsPlay.style.display = isPlaying ? 'none' : 'block';
    wdsPause.style.display = isPlaying ? 'block' : 'none';
    wdsPause.classList.toggle('rj-music-spinning', isPlaying);
  }
}

function playAudio() {
  if (!audio) return;
  audio.play().then(() => {
    setMusicPlayingState(true);
  }).catch(() => {
    // Autoplay might be blocked by browser until user gesture
  });
}

function pauseAudio() {
  if (!audio) return;
  audio.pause();
  setMusicPlayingState(false);
}

function toggleAudio() {
  if (!audio) return;
  if (audio.paused) {
    playAudio();
  } else {
    pauseAudio();
  }
}

// Buka Sampul
const openSelectors = '[data-open], #tombol-buka, #tombolbuka, #open, .tombol-buka, a.elementor-button[href="#"]';
const openButtons = document.querySelectorAll(openSelectors);

if (cover) {
  document.body.classList.add('template-locked');
  openButtons.forEach(btn => {
    btn.onclick = (e) => {
      e.preventDefault();
      cover.classList.add('opened');
      document.body.classList.remove('template-locked');
      document.body.classList.add('rj-opened');
      startReveals();
      playAudio();
      setTimeout(() => { cover.hidden = true; }, 900);
    };
  });
}

// Bind music toggling
if (musicBtn) musicBtn.onclick = toggleAudio;
if (wdsPlay) wdsPlay.onclick = playAudio;
if (wdsPause) wdsPause.onclick = pauseAudio;
if (wdsWidget && !wdsPlay && !wdsPause) wdsWidget.onclick = toggleAudio;

document.addEventListener('visibilitychange', () => {
  if (document.hidden && audio && !audio.paused) {
    pauseAudio();
  }
});

// 3. Countdown Timer Real-time (Menghidupkan .jet-countdown-timer)
function initCountdown() {
  document.querySelectorAll('.jet-countdown-timer').forEach(timer => {
    let rawDue = timer.getAttribute('data-due-date');
    let targetTime = rawDue ? Number(rawDue) * 1000 : null;
    // Jika tidak ada atau sudah lewat, set target 14 hari ke depan agar simulasi countdown selalu aktif
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
    toast.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:#2C221E;color:#F5EBE6;padding:12px 24px;border-radius:50px;font:600 13px system-ui;z-index:99999;box-shadow:0 4px 25px rgba(0,0,0,0.35);transition:opacity 0.3s;pointer-events:none;';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.opacity = '1';
  setTimeout(() => { toast.style.opacity = '0'; }, 3200);
}

document.querySelectorAll('[data-copy], [data-clipboard-text], .elementor-widget-cobakekiri-copy a, .salin-rekening').forEach(btn => {
  btn.onclick = async (e) => {
    e.preventDefault();
    const textToCopy = btn.getAttribute('data-copy') || btn.getAttribute('data-clipboard-text') || '1234567890';
    try {
      await navigator.clipboard.writeText(textToCopy);
      showToast('✓ Nomor rekening berhasil disalin!');
    } catch {
      showToast('Nomor rekening: ' + textToCopy);
    }
  };
});

// 5. Lightbox Foto Prewedding & Galeri Interaktif (Persis Kekondangan.id)
function initLightbox() {
  let lightbox = document.getElementById('rj-lightbox');
  if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.id = 'rj-lightbox';
    lightbox.className = 'rj-lightbox';
    lightbox.innerHTML = `
      <button class="rj-lightbox-close" aria-label="Tutup foto">✕</button>
      <img src="" alt="Foto prewedding besar">
    `;
    document.body.appendChild(lightbox);
    
    lightbox.onclick = (e) => {
      if (e.target === lightbox || e.target.classList.contains('rj-lightbox-close')) {
        lightbox.classList.remove('is-open');
      }
    };
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('is-open')) {
        lightbox.classList.remove('is-open');
      }
    });
  }

  const galleryItems = document.querySelectorAll(
    'a.e-gallery-item, a.elementor-gallery-item, .template-gallery-photo, .elementor-gallery__container a, .gallery-item img'
  );

  galleryItems.forEach(item => {
    item.onclick = (e) => {
      e.preventDefault();
      let src = item.getAttribute('href') || item.src;
      if (!src && item.style.backgroundImage) {
        src = item.style.backgroundImage.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
      }
      if (src && !src.startsWith('#')) {
        const img = lightbox.querySelector('img');
        if (img) img.src = src;
        lightbox.classList.add('is-open');
      }
    };
  });
}
initLightbox();

// 6. Modal QR Check-in Tamu untuk Di-scan Buku Tamu Android
function initQrPresensi() {
  let modal = document.getElementById('rj-qr-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'rj-qr-modal';
    modal.className = 'rj-qr-modal';
    const qrData = 'RJ-GUEST-' + encodeURIComponent(guest.toLowerCase().replace(/\s+/g, '-'));
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&format=svg&data=${encodeURIComponent(qrData)}`;
    modal.innerHTML = `
      <div class="rj-qr-card">
        <button class="rj-qr-close" aria-label="Tutup">✕</button>
        <h3>Presensi Tamu</h3>
        <p>Tunjukkan QR Code ini kepada penerima tamu saat tiba di lokasi resepsi.</p>
        <img src="${qrUrl}" alt="QR Code Presensi Tamu">
        <div class="rj-qr-guest-name">${guest}</div>
        <div class="rj-qr-code-id">${qrData}</div>
      </div>
    `;
    document.body.appendChild(modal);

    modal.onclick = (e) => {
      if (e.target === modal || e.target.classList.contains('rj-qr-close')) {
        modal.classList.remove('is-open');
      }
    };
  }

  // Tambahkan tombol QR ke .template-tools
  const tools = document.querySelector('.template-tools');
  if (tools && !document.getElementById('btn-qr-presensi')) {
    const btn = document.createElement('button');
    btn.id = 'btn-qr-presensi';
    btn.type = 'button';
    btn.textContent = '🎟 QR Tamu';
    btn.onclick = () => modal.classList.add('is-open');
    tools.insertBefore(btn, tools.lastElementChild);
  }
}
initQrPresensi();

// 7. Pengisian Foto Galeri Prewedding Demo
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

// 8. Animasi Scroll Reveal
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

if (!cover) {
  document.body.classList.add('rj-opened');
  startReveals();
}

// 9. Form RSVP Demo (LocalStorage)
document.querySelectorAll('.template-rsvp').forEach(form => {
  const key = 'ruang-janji-rsvp-' + (document.body.dataset.theme || 'demo');
  if (form.elements.nama) {
    form.elements.nama.value = (guest === 'Nama Tamu' || guest === 'Tamu Undangan') ? '' : guest;
  }
  const render = (rows) => {
    const area = form.querySelector('.template-wishes');
    if (!area) return;
    area.replaceChildren();
    rows.slice(-8).reverse().forEach(row => {
      const p = document.createElement('p');
      p.style.cssText = 'padding:6px 10px;background:#fbf6ef;border-radius:8px;margin:4px 0;font-size:12px;color:#45372c;';
      p.innerHTML = `<strong>${row.nama || 'Tamu'}</strong> <span style="color:#8a7463">(${row.kehadiran || 'Hadir'})</span><br>${row.ucapan || ''}`;
      area.append(p);
    });
  };
  try { render(JSON.parse(localStorage.getItem(key) || '[]')); } catch {}
  form.onsubmit = (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const row = {
      nama: String(data.get('nama') || '').trim() || guest,
      kehadiran: String(data.get('kehadiran') || 'Hadir').trim(),
      ucapan: String(data.get('ucapan') || data.get('pesan') || '').trim()
    };
    if (!row.ucapan) return;
    try {
      const rows = JSON.parse(localStorage.getItem(key) || '[]');
      rows.push(row);
      localStorage.setItem(key, JSON.stringify(rows.slice(-100)));
      render(rows);
      showToast('✓ Doa & ucapan Anda berhasil dikirim!');
      form.reset();
    } catch {}
  };
});
