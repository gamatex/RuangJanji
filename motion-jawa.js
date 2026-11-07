const guest = new URLSearchParams(location.search).get('to')?.trim().slice(0, 80) || 'Tamu Undangan';
const cover = document.querySelector('.cover');
const video = cover.querySelector('video');
const invitation = document.querySelector('#invitation');
const replay = document.querySelector('#replay');
const open = document.querySelector('#open');
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
const form = document.querySelector('#rsvp');
document.querySelector('[data-guest]').textContent = guest;
form.elements.nama.value = guest === 'Tamu Undangan' ? '' : guest;

function finishIntro() {
  cover.classList.remove('is-playing');
  video.hidden = true;
  replay.hidden = false;
}

function playIntro() {
  replay.hidden = true;
  video.hidden = false;
  video.currentTime = 0;
  cover.classList.add('is-playing');
  video.play().catch(finishIntro);
}

video.addEventListener('ended', finishIntro);
video.addEventListener('error', finishIntro);
replay.onclick = playIntro;
open.onclick = () => {
  open.closest('.guest').hidden = true;
  invitation.hidden = false;
  document.querySelector('.tools').hidden = false;
  cover.querySelector('.scroll').hidden = false;
  cover.classList.add('is-open');
  cover.querySelector('h1').setAttribute('tabindex', '-1');
  cover.querySelector('h1').focus({preventScroll: true});
  if (reduceMotion.matches) finishIntro();
  else playIntro();
};

const countdown = document.querySelector('#countdown');
const eventTime = Date.parse('2027-08-14T08:00:00+07:00');
const units = [['Hari', 86400], ['Jam', 3600], ['Menit', 60], ['Detik', 1]];
const values = units.map(([name]) => {
  const item = document.createElement('span');
  const number = document.createElement('b');
  item.append(number, name);
  countdown.append(item);
  return number;
});
function updateCountdown() {
  let left = Math.max(0, Math.floor((eventTime - Date.now()) / 1000));
  units.forEach(([, size], i) => {
    values[i].textContent = Math.floor(left / size);
    left %= size;
  });
}
updateCountdown();
setInterval(updateCountdown, 1000);

const storageKey = 'ruang-janji-motion-rsvp';
const wishes = document.querySelector('#wishes');
function renderWishes(rows) {
  wishes.replaceChildren();
  rows.slice(-5).reverse().forEach(row => {
    if (!row.ucapan) return;
    const item = document.createElement('li');
    item.textContent = row.nama + ' · ' + row.ucapan;
    wishes.append(item);
  });
}
try { renderWishes(JSON.parse(localStorage.getItem(storageKey) || '[]')); } catch {}
form.onsubmit = event => {
  event.preventDefault();
  const status = document.querySelector('#status');
  const row = Object.fromEntries(new FormData(form));
  row.nama = row.nama.trim();
  row.ucapan = row.ucapan.trim();
  if (!row.nama) { status.textContent = 'Isi nama terlebih dahulu.'; return; }
  try {
    const rows = JSON.parse(localStorage.getItem(storageKey) || '[]');
    const next = [...rows.filter(entry => entry.nama.toLowerCase() !== row.nama.toLowerCase()), row].slice(-100);
    localStorage.setItem(storageKey, JSON.stringify(next));
    renderWishes(next);
    status.textContent = 'Konfirmasi tersimpan di browser ini.';
  } catch {
    status.textContent = 'Penyimpanan browser tidak tersedia.';
  }
};

document.querySelector('#qr').onclick = () => document.querySelector('#qr-dialog').showModal();
const music = document.querySelector('#music');
let audio, loop;
function stopMusic() {
  clearInterval(loop);
  audio?.close();
  audio = undefined;
  music.setAttribute('aria-pressed', 'false');
  music.setAttribute('aria-label', 'Putar musik');
}
music.onclick = async () => {
  if (audio) { stopMusic(); return; }
  try {
    audio = new AudioContext();
    const context = audio;
    await context.resume();
    if (audio !== context) return;
    const melody = [293.66, 349.23, 440, 523.25, 440, 392, 349.23, 293.66];
    let note = 0;
    const strike = () => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      const now = context.currentTime;
      oscillator.type = 'sine';
      oscillator.frequency.value = melody[note++ % melody.length];
      gain.gain.setValueAtTime(.07, now);
      gain.gain.exponentialRampToValueAtTime(.001, now + .7);
      oscillator.connect(gain).connect(context.destination);
      oscillator.start(now);
      oscillator.stop(now + .71);
    };
    strike();
    loop = setInterval(strike, 610);
    music.setAttribute('aria-pressed', 'true');
    music.setAttribute('aria-label', 'Jeda musik');
  } catch { stopMusic(); }
};
window.addEventListener('pagehide', stopMusic);

if ('IntersectionObserver' in window && !reduceMotion.matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target);
    });
  }, {threshold: 0.15});
  document.querySelectorAll('[data-reveal]').forEach(element => observer.observe(element));
}

document.querySelectorAll('[data-photo]').forEach(slot => {
  const source = motionPhotos[slot.dataset.photo];
  if (!source) return;
  const photo = document.createElement('img');
  photo.alt = slot.getAttribute('aria-label').replace('Tempat foto ', 'Foto ');
  photo.loading = 'lazy';
  photo.decoding = 'async';
  photo.addEventListener('load', () => {
    slot.removeAttribute('role');
    slot.removeAttribute('aria-label');
  }, {once: true});
  photo.addEventListener('error', () => photo.remove(), {once: true});
  photo.src = source;
  slot.append(photo);
});
