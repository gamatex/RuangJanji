import {createClient} from 'https://esm.sh/@supabase/supabase-js@2.57.0';
import {SUPABASE_URL,SUPABASE_PUBLISHABLE_KEY} from '/packages/shared/src/config.js';
const $=s=>document.querySelector(s);
const safe=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let templates=[],filter='all';
const db=createClient(SUPABASE_URL,SUPABASE_PUBLISHABLE_KEY,{auth:{persistSession:false,autoRefreshToken:false,detectSessionInUrl:false}});
async function load(){
  const {data,error}=await db.from('theme_prices').select('slug,amount,enabled').eq('enabled',true).order('slug');
  if(error){$('#status').textContent='Katalog belum dapat dimuat. Silakan coba beberapa saat lagi.';return;}
  templates=data||[];
  const cats=[...new Set(templates.map(x=>x.slug.split('-')[0]).filter(Boolean))];
  $('#filters').innerHTML='<button class="active" data-filter="all">Semua</button>'+cats.map(c=>'<button data-filter="'+safe(c)+'">'+safe(c)+'</button>').join('');
  $('#filters').querySelectorAll('button').forEach(b=>b.onclick=()=>{filter=b.dataset.filter;$('#filters').querySelectorAll('button').forEach(x=>x.classList.toggle('active',x===b));render();});
  render();
}
function render(){
 const q=$('#search').value.trim().toLowerCase();
 const list=templates.filter(t=>(filter==='all'||t.slug.split('-')[0]===filter)&&t.slug.toLowerCase().includes(q));
 $('#status').textContent=templates.length?list.length+' template ditemukan':'Belum ada template yang diaktifkan.';
 $('#catalog').innerHTML=list.map(t=>'<article class="panel"><div class="preview">✦</div><h3>'+safe(t.slug.replace(/-/g,' '))+'</h3><p class="muted">Undangan digital</p><div class="card-foot"><strong>Rp '+Number(t.amount).toLocaleString('id-ID')+'</strong><button type="button" data-slug="'+safe(t.slug)+'">Detail</button></div></article>').join('')||(templates.length?'<p class="empty">Tidak ada template yang cocok.</p>':'');
 $('#catalog').querySelectorAll('[data-slug]').forEach(b=>b.onclick=()=>{alert('Preview template '+b.dataset.slug+' sedang disiapkan. Katalog dapat dilihat tanpa akun.');});
}
$('#search').addEventListener('input',render);
load().catch(()=>{$('#status').textContent='Gagal memuat katalog.';});
