// template-runtime.js — Engine Undangan Interaktif RuangJanji
(function () {
  // Jika halaman sedang dibungkus oleh preview-stage.js (top-level), jangan jalankan runtime di outer frame
  if (document.documentElement.classList.contains('rj-staging')) return;

  const urlParams = new URLSearchParams(location.search);
  const guestParam = (urlParams.get('to') || urlParams.get('tamu') || '').trim();
  const guest = (guestParam || 'Nama Tamu').slice(0, 80);

  // Deteksi template Next.js terbaru (.pv-framed / main.uy / /_next/)
  const isNextTpl = Boolean(
    document.querySelector('.pv-framed, main.uy, .pv-head') ||
    document.querySelector('script[src*="/_next/"], link[href*="/_next/"]')
  );

  if (isNextTpl) {
    const slugMatch = location.pathname.match(/\/templates\/([a-z0-9-]+?)(?:\.html)?\/?$/i);
    const slug = slugMatch ? slugMatch[1] : '';

    function patchNextDom() {
      // Ubah tombol "Coba Gratis" -> "Pesan Tema" & arahkan ke checkout RuangJanji
      document.querySelectorAll('.pv-go').forEach(function (btn) {
        if (btn.dataset.rjPatched === '1') return;
        const firstNode = btn.firstChild;
        if (firstNode && firstNode.nodeType === 3 && /Coba Gratis/i.test(firstNode.textContent)) {
          firstNode.textContent = 'Pesan Tema';
        }
        btn.setAttribute('title', 'Pesan tema ini di RuangJanji');
        btn.dataset.rjPatched = '1';
      });

      // Pastikan tombol tutup kembali ke katalog RuangJanji
      document.querySelectorAll('.pvh-close').forEach(function (a) {
        if (a.getAttribute('href') !== '/#tema') {
          a.setAttribute('href', '/#tema');
        }
      });

      // Pastikan Prev/Next mengarah ke /templates/<slug>
      document.querySelectorAll('a.pv-step').forEach(function (a) {
        const href = a.getAttribute('href') || '';
        if (href.startsWith('/template/')) {
          const target = href.replace('/template/', '/templates/');
          a.setAttribute('href', target);
        }
      });

      // Suntikkan nama tamu ?to= bila dikirim via URL
      if (guestParam) {
        document.querySelectorAll('p').forEach(function (p) {
          if (p.textContent.trim() === 'Kepada Yth:' && p.nextElementSibling) {
            const sibText = p.nextElementSibling.textContent.replace(/\u200b/g, '').trim();
            if (/^Bapak\/Ibu\/Saudara/i.test(sibText)) {
              p.nextElementSibling.textContent = guest;
            }
          }
        });
      }
    }

    // Tangkap klik pada tombol Next.js di fase capture agar tidak membuka modal/rute UndangYuk
    document.addEventListener('click', function (e) {
      const goBtn = e.target.closest('.pv-go');
      if (goBtn) {
        e.preventDefault();
        e.stopImmediatePropagation();
        location.href = '/checkout.html?tema=' + encodeURIComponent(slug || 'paper-promise') + '&coupon=RUANG50';
        return;
      }
      const closeBtn = e.target.closest('.pvh-close');
      if (closeBtn) {
        e.preventDefault();
        e.stopImmediatePropagation();
        location.href = '/#tema';
        return;
      }
      const stepBtn = e.target.closest('a.pv-step');
      if (stepBtn) {
        const href = stepBtn.getAttribute('href') || '';
        if (href.startsWith('/template/') || href.startsWith('/templates/')) {
          e.preventDefault();
          e.stopImmediatePropagation();
          const fixed = href.replace('/template/', '/templates/');
          const sep = fixed.includes('?') ? '&' : '?';
          location.href = guestParam ? fixed + sep + 'to=' + encodeURIComponent(guest) : fixed;
        }
      }
    }, true);

    patchNextDom();
    const obs = new MutationObserver(patchNextDom);
    obs.observe(document.documentElement, { childList: true, subtree: true });
    setTimeout(function () { obs.disconnect(); }, 8000);
    return;
  }

  // ===== ENGINE KHUSUS 27 TEMPLATE ELEMENTOR =====
  if (urlParams.get('embed') === '1' || window.self !== window.top) {
    document.body.classList.add('rj-embed');
  }

  // Listen perintah Foto/Tanpa Foto & Palet Warna dari shell preview-stage.js
  window.addEventListener('message', function (ev) {
    const data = ev.data;
    if (!data || typeof data !== 'object') return;
    if (data.type === 'rj:no-photo') {
      document.body.classList.toggle('rj-no-photo', Boolean(data.value));
    } else if (data.type === 'rj:palette' && data.palette) {
      if (data.key === 'asli') {
        document.documentElement.style.removeProperty('--rj-accent-override');
        document.body.style.removeProperty('filter');
      } else {
        document.documentElement.style.setProperty('--rj-accent-override', data.palette.bg || '#717052');
      }
    }
  });

  // 1. Injeksi Nama Tamu Dinamis (?to=...)
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
    }).catch(() => {});
  }

  function pauseAudio() {
    if (!audio) return;
    audio.pause();
    setMusicPlayingState(false);
  }

  function toggleAudio() {
    if (!audio) return;
    if (audio.paused) playAudio();
    else pauseAudio();
  }

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

  if (musicBtn) musicBtn.onclick = toggleAudio;
  if (wdsPlay) wdsPlay.onclick = playAudio;
  if (wdsPause) wdsPause.onclick = pauseAudio;
  if (wdsWidget && !wdsPlay && !wdsPause) wdsWidget.onclick = toggleAudio;
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && audio && !audio.paused) pauseAudio();
  });

  // 3. Countdown Timer Real-time
  function initCountdown() {
    document.querySelectorAll('.jet-countdown-timer').forEach(timer => {
      let rawDue = timer.getAttribute('data-due-date');
      let targetTime = rawDue ? Number(rawDue) * 1000 : null;
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

  // 4. Salin Rekening
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

  // 5. Lightbox
  function initLightbox() {
    let lightbox = document.getElementById('rj-lightbox');
    if (!lightbox) {
      lightbox = document.createElement('div');
      lightbox.id = 'rj-lightbox';
      lightbox.className = 'rj-lightbox';
      lightbox.innerHTML = '<button class="rj-lightbox-close" aria-label="Tutup foto">✕</button><img src="" alt="Foto prewedding besar">';
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

  // 6. Modal QR Check-in Tamu
  function initQrPresensi() {
    let modal = document.getElementById('rj-qr-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'rj-qr-modal';
      modal.className = 'rj-qr-modal';
      const qrData = 'RJ-GUEST-' + encodeURIComponent(guest.toLowerCase().replace(/\s+/g, '-'));
      const qrUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&format=svg&data=' + encodeURIComponent(qrData);
      modal.innerHTML =
        '<div class="rj-qr-card">' +
          '<button class="rj-qr-close" aria-label="Tutup">✕</button>' +
          '<h3>Presensi Tamu</h3>' +
          '<p>Tunjukkan QR Code ini kepada penerima tamu saat tiba di lokasi resepsi.</p>' +
          '<img src="' + qrUrl + '" alt="QR Code Presensi Tamu">' +
          '<div class="rj-qr-guest-name">' + guest + '</div>' +
          '<div class="rj-qr-code-id">' + qrData + '</div>' +
        '</div>';
      document.body.appendChild(modal);
      modal.onclick = (e) => {
        if (e.target === modal || e.target.classList.contains('rj-qr-close')) {
          modal.classList.remove('is-open');
        }
      };
    }
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

  // 7. Sample Prewedding Gallery Photos
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

  // 8. Scroll Reveal
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

  // 9. Form RSVP Demo
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
        p.innerHTML = '<strong>' + (row.nama || 'Tamu') + '</strong> <span style="color:#8a7463">(' + (row.kehadiran || 'Hadir') + ')</span><br>' + (row.ucapan || '');
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
})();
