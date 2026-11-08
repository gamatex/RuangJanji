const guest=new URLSearchParams(location.search).get('to')?.trim().slice(0,80)||'Tamu Undangan';
document.querySelectorAll('[data-guest]').forEach(e=>e.textContent=guest);
const opener=document.querySelector('[data-open]');
const cover=document.querySelector('.cover');
const audio=document.querySelector('#template-audio');
const music=document.querySelector('#template-music');
if(opener&&cover){
  document.body.classList.add('template-locked');
  opener.onclick=e=>{
    e.preventDefault();cover.classList.add('opened');document.body.classList.remove('template-locked');document.body.classList.add('rj-opened');
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
if('IntersectionObserver'in window&&!matchMedia('(prefers-reduced-motion:reduce)').matches){
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('entered');observer.unobserve(entry.target)}
  }),{threshold:.1});
  document.querySelectorAll('[data-enter]').forEach(e=>observer.observe(e));
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
