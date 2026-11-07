import {createClient} from 'https://esm.sh/@supabase/supabase-js@2.57.0';
import {SUPABASE_URL,SUPABASE_PUBLISHABLE_KEY,requirePublishableKey} from '../../packages/shared/src/config.js';
const $=s=>document.querySelector(s), msg=t=>$('#message').textContent=t;
const key=SUPABASE_PUBLISHABLE_KEY;
let db;
if(!key){msg('Konfigurasi belum lengkap: isi publishable key Supabase pada config.js sebelum digunakan.');}else{db=createClient(SUPABASE_URL,requirePublishableKey(key));init();}
const safe=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let user=null, themes=[];
async function init(){const {data:{session},error}=await db.auth.getSession();if(error)msg(error.message);await sessionChanged(session);db.auth.onAuthStateChange((_event,s)=>{void sessionChanged(s);});}
async function sessionChanged(s){user=s?.user||null;$('#auth').hidden=!!user;$('#app').hidden=!user;if(!user)return;$('#account').textContent=user.email;await Promise.all([loadThemes(),loadEvents()]);}
$('#login').onsubmit=async e=>{e.preventDefault();if(!db)return;const {error}=await db.auth.signInWithPassword({email:$('#email').value,password:$('#password').value});msg(error?.message||'Berhasil masuk.');};
$('#signup').onclick=async()=>{
  if(!db)return;
  const form=$('#login');
  if(!form.reportValidity())return;
  const email=$('#email').value.trim(), password=$('#password').value;
  if(!email||!password){msg('Isi email dan kata sandi terlebih dahulu.');return;}
  const button=$('#signup');button.disabled=true;msg('Memproses pendaftaran...');
  try{
    const {data,error}=await db.auth.signUp({email,password,options:{emailRedirectTo:location.origin+'/apps/ruangjanji/'}});
    if(error){msg(error.message);return;}
    msg(data?.session?'Pendaftaran berhasil. Anda sudah masuk.':'Pendaftaran diterima. Periksa email untuk konfirmasi akun sebelum masuk.');
  }catch(error){msg('Pendaftaran gagal: '+error.message);}finally{button.disabled=false;}
};
$('#logout').onclick=()=>db.auth.signOut();
document.querySelectorAll('[data-tab]').forEach(b=>b.onclick=()=>{for(const t of ['catalog','events'])$('#'+t).hidden=t!==b.dataset.tab;});
async function loadThemes(){const {data,error}=await db.from('theme_prices').select('slug,amount,enabled').eq('enabled',true).order('slug');if(error){msg(error.message);return;}themes=data||[];$('#themes').innerHTML=themes.map(t=>'<article class="panel"><div class="preview">✦</div><h3>'+safe(t.slug)+'</h3><p>Rp '+Number(t.amount).toLocaleString('id-ID')+'</p><button data-theme="'+safe(t.slug)+'">Gunakan template</button></article>').join('')||'<p>Belum ada template aktif.</p>';$('#theme-select').innerHTML=themes.map(t=>'<option value="'+safe(t.slug)+'">'+safe(t.slug)+'</option>').join('');document.querySelectorAll('[data-theme]').forEach(b=>b.onclick=()=>{$('#theme-select').value=b.dataset.theme;document.querySelector('[data-tab="events"]').click();$('#event-form').scrollIntoView();});}
$('#event-form').onsubmit=async e=>{e.preventDefault();if(!user)return;const f=new FormData(e.currentTarget),o=Object.fromEntries(f.entries());o.owner_id=user.id;o.status='draft';const {error}=await db.from('events').insert(o);msg(error?(error.code==='23505'?'Alamat undangan sudah digunakan. Pilih alamat lain.':error.message):'Draft berhasil disimpan.');if(!error){e.currentTarget.reset();await loadEvents();}};
async function loadEvents(){const {data,error}=await db.from('events').select('id,title,slug,status,date,theme').eq('owner_id',user.id).order('created_at',{ascending:false});if(error){msg(error.message);return;}$('#event-list').innerHTML=(data||[]).map(x=>'<article class="panel"><h3>'+safe(x.title)+'</h3><p>'+safe(x.slug)+' · '+safe(x.status)+' · '+safe(x.theme)+'</p><small>'+safe(x.date)+'</small><p>'+(x.status==='published'?'<a target="_blank" rel="noopener" href="/'+encodeURIComponent(x.slug)+'">Lihat undangan</a>':'Alamat disiapkan: /'+safe(x.slug)+' (belum dipublikasikan)')+'</p></article>').join('')||'<p>Belum ada undangan.</p>';}
