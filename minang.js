const cover=document.querySelector('#cover');
const guest=new URLSearchParams(location.search).get('to')?.trim().slice(0,80)||'Tamu Undangan';
document.querySelectorAll('[data-guest]').forEach(e=>e.textContent=guest);
document.body.classList.add('minang-locked');
const opener=document.querySelector('#minang-open');
if(opener)opener.onclick=e=>{
  e.preventDefault();cover?.classList.add('minang-opened');document.body.classList.remove('minang-locked');
  setTimeout(()=>{if(cover)cover.hidden=true},750);
};
else{cover?.remove();document.body.classList.remove('minang-locked')}
document.querySelectorAll('[data-copy]').forEach(a=>a.onclick=async e=>{
  e.preventDefault();
  try{await navigator.clipboard.writeText(a.dataset.copy);a.textContent='Tersalin'}
  catch{a.textContent=a.dataset.copy}
});
document.querySelectorAll('a[href="#"]').forEach(a=>{
  if(!a.hasAttribute('data-copy')&&a!==opener)a.onclick=e=>e.preventDefault();
});
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!reduced&&'IntersectionObserver'in window){
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('minang-revealed');observer.unobserve(entry.target)}
  }),{threshold:.12});
  document.querySelectorAll('[data-reveal]').forEach(e=>observer.observe(e));
}
const form=document.querySelector('#minang-rsvp');
const key='ruang-janji-minang-rsvp';
function render(rows){
  const target=document.querySelector('#minang-wishes');target.replaceChildren();
  rows.slice(-10).reverse().forEach(row=>{
    const p=document.createElement('p');p.textContent=row.nama+' · '+row.hadir+' · '+row.ucapan;target.append(p);
  });
}
if(form){
  form.elements.nama.value=guest==='Tamu Undangan'?'':guest;
  try{render(JSON.parse(localStorage.getItem(key)||'[]'))}catch{}
  form.onsubmit=e=>{
    e.preventDefault();
    const row=Object.fromEntries(new FormData(form));
    row.nama=row.nama.trim();row.ucapan=row.ucapan.trim();
    const status=form.querySelector('[role=status]');
    if(!row.nama||row.ucapan.length<2){status.textContent='Lengkapi nama dan ucapan.';return}
    try{
      const rows=JSON.parse(localStorage.getItem(key)||'[]');
      const next=[...rows.filter(v=>v.nama.toLowerCase()!==row.nama.toLowerCase()),row].slice(-100);
      localStorage.setItem(key,JSON.stringify(next));render(next);status.textContent='Ucapan tersimpan di browser ini.';
    }catch{status.textContent='Penyimpanan browser tidak tersedia.'}
  };
}
let scrolling=false,last=0;
const scrollButton=document.querySelector('.minang-scroll');
scrollButton.onclick=()=>{scrolling=!scrolling;scrollButton.setAttribute('aria-pressed',String(scrolling));scrollButton.textContent=scrolling?'Jeda gulir':'Gulir otomatis'};
function scrollFrame(time){
  const delta=Math.min(40,time-last);last=time;
  if(scrolling&&!document.body.classList.contains('minang-locked')){
    window.scrollBy(0,delta*.022);
    if(innerHeight+scrollY>=document.documentElement.scrollHeight-2){scrolling=false;scrollButton.textContent='Gulir otomatis';scrollButton.setAttribute('aria-pressed','false')}
  }
  requestAnimationFrame(scrollFrame);
}
requestAnimationFrame(scrollFrame);
