const guest=new URLSearchParams(location.search).get('to')?.trim().slice(0,80)||'Tamu Undangan';
document.querySelectorAll('[data-guest]').forEach(e=>e.textContent=guest);
const opener=document.querySelector('[data-open]');
const cover=document.querySelector('.cover');
const audio=document.querySelector('#template-audio');
const music=document.querySelector('#template-music');
let startReveals=()=>{};
if(opener&&cover){
  document.body.classList.add('template-locked');
  opener.onclick=e=>{
    e.preventDefault();cover.classList.add('opened');document.body.classList.remove('template-locked');document.body.classList.add('rj-opened');startReveals();
    setTimeout(()=>{cover.hidden=true},800);
    if(audio?.getAttribute('src'))audio.play().then(()=>music.setAttribute('aria-pressed','true')).catch(()=>{});
  };
}
music.hidden=!audio?.getAttribute('src');
music.onclick=()=>{
  if(audio.paused)audio.play().then(()=>music.setAttribute('aria-pressed','true')).catch(()=>{});
  else{audio.pause();music.setAttribute('aria-pressed','false')}
};
document.addEventListener('visibilitychange',()=>{if(document.hidden){audio?.pause();music.setAttribute('aria-pressed','false')}});
document.querySelectorAll('[data-copy]').forEach(a=>a.onclick=async e=>{
  e.preventDefault();
  try{await navigator.clipboard.writeText(a.dataset.copy);a.textContent='Tersalin'}catch{a.textContent=a.dataset.copy}
});
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!reducedMotion&&'IntersectionObserver'in window){
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('entered');observer.unobserve(entry.target)}
  }),{threshold:.08});
  let started=false;
  startReveals=()=>{
    if(started)return;
    started=true;
    document.querySelectorAll('[data-enter]').forEach(element=>observer.observe(element));
  };
}
if(!opener||!cover){document.body.classList.add('rj-opened');startReveals();}
// All 27 templates share this runtime, but retain their own HTML/CSS assets.
// Select only likely transparent decorative PNGs within animated image widgets.
// Exclude covers, payment logos, brand images, and user photos.
if(!reducedMotion){
  const theme=document.body.dataset.theme||'';
  const category=theme.split('-')[0];
  const allowed={art:5,birthday:4,deluxe:7,minisite:6,syari:5};
  const limit=allowed[category]||4;
  let count=0;
  document.querySelectorAll('.elementor-widget-image.animated img').forEach(img=>{
    if(count>=limit||img.hasAttribute('data-rj-motion'))return;
    if(img.closest('.cover,.template-photo,.template-gallery-photo,.template-tools'))return;
    const src=img.getAttribute('src')||'';
    if(!/\\.png(?:$|[?#])/i.test(src)||!/catalog-assets\\//.test(src))return;
    const alt=(img.getAttribute('alt')||'').toLowerCase();
    if(/bca|mandiri|bank|rekening|logo|qr|barcode|brand/.test(alt))return;
    if(img.naturalWidth&&img.naturalWidth<80)return;
    img.setAttribute('data-rj-motion',['sway','float','drift'][count%3]);
    count++;
  });
}
// Template-specific decorative movement can be authored on original elements via
// data-rj-motion="float|sway|drift". Do not animate all images indiscriminately.
if(!reducedMotion){
  document.querySelectorAll('[data-rj-motion]').forEach((element,index)=>{
    const motion=element.getAttribute('data-rj-motion');
    if(!['float','sway','drift'].includes(motion))return;
    element.classList.add('rj-motion','rj-motion-'+motion);
    element.style.setProperty('--rj-phase',(-index*1.7)+'s');
  });
}
document.querySelectorAll('.template-rsvp').forEach(form=>{
  const key='ruang-janji-rsvp-'+document.body.dataset.theme;
  form.elements.nama.value=guest==='Tamu Undangan'?'':guest;
  const render=rows=>{
    const area=form.querySelector('.template-wishes');area.replaceChildren();
    rows.slice(-5).reverse().forEach(row=>{const p=document.createElement('p');p.textContent=row.nama+' · '+row.ucapan;area.append(p)});
  };
  try{render(JSON.parse(localStorage.getItem(key)||'[]'))}catch{}
  form.onsubmit=e=>{
    e.preventDefault();
    const row=Object.fromEntries(new FormData(form));row.nama=row.nama.trim();row.ucapan=row.ucapan.trim();
    if(!row.nama||!row.ucapan){form.querySelector('[role=status]').textContent='Lengkapi nama dan ucapan.';return}
    try{
      const rows=JSON.parse(localStorage.getItem(key)||'[]');rows.push(row);
      localStorage.setItem(key,JSON.stringify(rows.slice(-100)));render(rows);
      form.querySelector('[role=status]').textContent='Ucapan tersimpan di browser ini.';
    }catch{form.querySelector('[role=status]').textContent='Penyimpanan browser tidak tersedia.'}
  };
});

/* Published invitations: keep each template's own ornaments, CSS and cover.
   Receive only the public invitation data from the same-origin parent page. */
if(window.parent!==window){
 window.addEventListener('message',event=>{
  if(event.origin!==location.origin||event.source!==window.parent||event.data?.type!=='ruangjanji:published-invitation')return;
  const d=event.data.payload||{};
  document.querySelector('.template-tools')?.remove();
  const names=[d.bride,d.groom].filter(Boolean).join(' & ');
  const headings=[...document.querySelectorAll('.elementor-widget-heading .elementor-heading-title')];
  // Replace sample couple names in prominent title slots only, not every text widget.
  const title=headings.find(h=>/\s[&＆]\s/.test(h.textContent||'')&&h.textContent.trim().length<110);
  if(title&&names)title.textContent=names;
  const slots=[...document.querySelectorAll('[data-photo-slot]')];
  if(d.photo&&/^https:\/\//i.test(d.photo)&&slots.length){
   const first=slots[0];first.style.backgroundImage='url('+JSON.stringify(d.photo)+')';
   first.style.backgroundSize='cover';first.style.backgroundPosition='center';
  }
  document.title=(names||d.title||'Undangan')+' · RuangJanji';
 });
}
