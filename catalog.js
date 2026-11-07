const cards=[...document.querySelectorAll('[data-theme]')];
const categories=[...document.querySelectorAll('[data-kv-cat]')];
const more=document.querySelector('[data-kv-more]');
let currentCategory='all',limit=12;
function filterCards(){
  const matches=cards.filter(card=>currentCategory==='all'||card.dataset.kvCats===currentCategory);
  cards.forEach(card=>card.hidden=true);
  matches.slice(0,limit).forEach(card=>card.hidden=false);
  categories.forEach(button=>{
    const selected=button.dataset.kvCat===currentCategory;
    button.setAttribute('aria-selected',String(selected));button.classList.toggle('is-active',selected);
  });
  if(more)more.hidden=matches.length<=limit;
  const url=new URL(location.href);
  if(currentCategory==='all')url.searchParams.delete('kategori');else url.searchParams.set('kategori',currentCategory);
  history.replaceState(null,'',url);
}
const initial=new URLSearchParams(location.search).get('kategori');
if(categories.some(button=>button.dataset.kvCat===initial))currentCategory=initial;
categories.forEach(button=>button.onclick=()=>{currentCategory=button.dataset.kvCat;limit=12;filterCards()});
if(more)more.onclick=()=>{limit+=12;filterCards()};
filterCards();
document.querySelector('[data-kv-strip-close]')?.addEventListener('click',()=>document.documentElement.classList.add('kv-strip-off'));
const sheet=document.querySelector('#kv-sheet');
function toggleSheet(open){
  sheet?.classList.toggle('is-open',open);
  document.querySelectorAll('[data-kv-sheet-open]').forEach(button=>button.setAttribute('aria-expanded',String(open)));
}
document.querySelectorAll('[data-kv-sheet-open]').forEach(button=>button.onclick=()=>toggleSheet(!sheet?.classList.contains('is-open')));
document.querySelectorAll('[data-kv-sheet-close]').forEach(button=>button.onclick=()=>toggleSheet(false));
sheet?.addEventListener('click',e=>{if(e.target===sheet||e.target.closest('a'))toggleSheet(false)});
addEventListener('keydown',e=>{if(e.key==='Escape')toggleSheet(false)});
const notice=document.querySelector('[aria-controls="kv-notif-panel"]');
if(notice)notice.onclick=()=>{
  const panel=document.querySelector('#kv-notif-panel');if(!panel)return;
  const expanded=notice.getAttribute('aria-expanded')==='true';
  notice.setAttribute('aria-expanded',String(!expanded));panel.hidden=expanded;panel.classList.toggle('is-open',!expanded);
};
const info=document.querySelector('#catalog-info');
document.querySelectorAll('[data-info]').forEach(link=>link.onclick=event=>{
  event.preventDefault();
  info.querySelector('h2').textContent=link.dataset.info;
  const login=link.dataset.info.startsWith('Masuk');
  info.querySelector('p').textContent=login?'Dasbor akun Ruang Janji sedang disiapkan. Anda dapat mencoba pemesanan dan melihat invoice melalui halaman checkout.':'Bagian ini sedang disiapkan. Hubungi admin untuk informasi layanan Ruang Janji.';
  info.showModal();
});
document.querySelector('#close-info')?.addEventListener('click',()=>info.close());
