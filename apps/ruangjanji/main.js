import {previewImages} from './template-images.js';
import {createClient} from 'https://esm.sh/@supabase/supabase-js@2.57.0';
import {SUPABASE_URL,SUPABASE_PUBLISHABLE_KEY,requirePublishableKey} from '../../packages/shared/src/config.js';
const $=s=>document.querySelector(s), msg=t=>$('#message').textContent=t;
const key=SUPABASE_PUBLISHABLE_KEY;
let db;
if(!key){msg('Konfigurasi belum lengkap: isi publishable key Supabase pada config.js sebelum digunakan.');}else{db=createClient(SUPABASE_URL,requirePublishableKey(key));}
const safe=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let user=null, themes=[],mediaEventId=null, eventCache=[], orderCache=[],selectedOrderId=null;
async function init(){db.auth.onAuthStateChange((_event,s)=>{setTimeout(()=>{void sessionChanged(s);},0);});const {data,error}=await db.auth.getSession();if(error)msg(error.message);await sessionChanged(data?.session);}
async function sessionChanged(s){user=s?.user||null;const loggedIn=!!user;document.getElementById('auth').hidden=loggedIn;document.getElementById('app').hidden=!loggedIn;document.getElementById('bottom-nav').hidden=!loggedIn;if(!loggedIn)return;document.getElementById('account').textContent=user.email||'Pelanggan';msg('Dashboard siap.');try{await Promise.all([loadThemes(),loadEvents()]);await loadOrders();}catch(e){msg('Dashboard terbuka, tetapi data gagal dimuat: '+e.message);}}
$('#login').onsubmit=async e=>{e.preventDefault();if(!db)return;const {data,error}=await db.auth.signInWithPassword({email:$('#email').value,password:$('#password').value});if(error){msg(error.message);return;}if(!data?.session){msg('Sesi belum tersedia. Silakan periksa konfirmasi email.');return;}await sessionChanged(data.session);};
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
const categories=['Semua','Art','Birthday','Deluxe','MiniMotion','Minisite','Motion',"Syar'i"];
let activeCategory='Semua',searchTerm='';
function showTab(tab){if(tab==='guests')void loadGuestList();if(tab==='wishes')void loadWishList();closeThemeDetail();closeCheckout();closeOrderDetail();closeEventActions();closeDeleteEvent();closeInvitationSettings();hideEditor();for(const id of ['home','catalog','events','guests','wishes','account-view'])document.getElementById(id).hidden=id!==tab;document.querySelectorAll('[data-tab]').forEach(b=>{b.classList.toggle('active',b.dataset.tab===tab);b.setAttribute('aria-current',b.dataset.tab===tab?'page':'false');});window.scrollTo({top:0,behavior:'instant'});}
document.querySelectorAll('[data-tab],[data-go]').forEach(b=>b.onclick=()=>showTab(b.dataset.tab||b.dataset.go));
$('#explore').onclick=()=>showTab('catalog');
function themeCategory(slug){const s=slug.toLowerCase();if(s.startsWith('mini-motion')||s.startsWith('minimotion'))return 'MiniMotion';if(s.startsWith('minisite'))return 'Minisite';if(s.startsWith('birthday'))return 'Birthday';if(s.startsWith('deluxe'))return 'Deluxe';if(s.startsWith('motion'))return 'Motion';if(s.startsWith('syari')||s.startsWith('syar'))return "Syar'i";return 'Art';}
function categoryChips(){return categories.map(t=>'<button type="button" data-category="'+safe(t)+'" class="'+(t===activeCategory?'active':'')+'">'+safe(t)+'</button>').join('');}
function card(t){const name=t.slug.replace(/-/g,' ');const category=themeCategory(t.slug);const image=previewImages[t.slug];return '<article class="theme-card"><div class="theme-art">'+(image?'<img loading="lazy" alt="Pratinjau '+safe(name)+'" src="/'+safe(image)+'">':'<span>'+safe(name)+'</span>')+'</div><div class="theme-info"><strong>'+safe(name)+'</strong><small>'+safe(category)+'</small><p>Rp '+Number(t.amount).toLocaleString('id-ID')+'</p><div class="card-actions"><a class="preview-link" href="/theme-preview.html?tema='+encodeURIComponent(t.slug)+'" target="_blank" rel="noopener">Lihat demo</a><button type="button" data-detail="'+safe(t.slug)+'">Detail tema</button></div></div></article>';}
function renderThemes(){const filtered=themes.filter(t=>(activeCategory==='Semua'||themeCategory(t.slug)===activeCategory)&&t.slug.toLowerCase().includes(searchTerm));$('#categories').innerHTML=categoryChips();$('#category-home').innerHTML=categoryChips();$('#theme-count').textContent=filtered.length+' desain';$('#themes').innerHTML=filtered.map(card).join('')||'<p class="empty">Template tidak ditemukan.</p>';$('#featured').innerHTML=themes.slice(0,4).map(card).join('');document.querySelectorAll('[data-category]').forEach(b=>b.onclick=()=>{activeCategory=b.dataset.category;showTab('catalog');renderThemes();});document.querySelectorAll('[data-detail]').forEach(b=>b.onclick=()=>openThemeDetail(b.dataset.detail));}
let detailSlug=null;
function closeThemeDetail(){const el=$('#theme-detail');if(el)el.hidden=true;detailSlug=null;document.body.classList.remove('detail-open');}
function openThemeDetail(slug){
 const theme=themes.find(t=>t.slug===slug);if(!theme)return;
 detailSlug=slug;
 const name=slug.replace(/-/g,' '),image=previewImages[slug];
 $('#detail-name').textContent=name;
 $('#detail-title').textContent='Detail template';
 $('#detail-category').textContent=themeCategory(slug);
 $('#detail-price').textContent='Rp '+Number(theme.amount).toLocaleString('id-ID');
 $('#detail-status').textContent=theme.enabled?'Template dapat dipilih untuk membuat undangan.':'Template belum dibuka untuk pemesanan. Kamu tetap dapat melihat demonya.';
 $('#detail-image').hidden=!image;
 if(image)$('#detail-image').src='/'+image;
 $('#detail-demo').href='/theme-preview.html?tema='+encodeURIComponent(slug);
 $('#detail-select').disabled=!theme.enabled;
 $('#detail-select').textContent=theme.enabled?'Pilih template':'Belum tersedia';
 $('#theme-detail').hidden=false;document.body.classList.add('detail-open');
}
$('#close-detail').onclick=closeThemeDetail;
$('#theme-detail').addEventListener('click',e=>{if(e.target.id==='theme-detail')closeThemeDetail();});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeThemeDetail();});
$('#detail-select').onclick=()=>{if(!detailSlug)return;const theme=themes.find(t=>t.slug===detailSlug);if(!theme?.enabled)return;$('#theme-select').value=detailSlug;showTab('events');openEditor('all');};
$('#search').oninput=e=>{searchTerm=e.target.value.toLowerCase().trim();renderThemes();};$('#search-home').oninput=e=>{searchTerm=e.target.value.toLowerCase().trim();$('#search').value=e.target.value;showTab('catalog');renderThemes();};
async function loadThemes(){const {data,error}=await db.from('theme_prices').select('slug,amount,enabled').order('slug');if(error){msg(error.message);return;}themes=data||[];$('#theme-select').innerHTML=themes.filter(t=>t.enabled).map(t=>'<option value="'+safe(t.slug)+'">'+safe(t.slug)+'</option>').join('')||'<option value="">Belum ada template yang dapat dipesan</option>';$('#save-event').disabled=!themes.some(t=>t.enabled);renderThemes();}
const editFields=['title','groom','bride','slug','date','time','venue','address','story','theme'];
function clearEditor(){hideEditor();mediaEventId=null;document.querySelectorAll('[data-editor-group]').forEach(el=>el.hidden=false);const form=$('#event-form');form.reset();form.elements.event_id.value='';$('#save-event').textContent='Simpan draft undangan';$('#editor-title').textContent='Buat draft undangan';$('#cancel-edit').hidden=true;form.elements.slug.readOnly=false;form.elements.theme.disabled=false;}
$('#cancel-edit').onclick=clearEditor;
$('#close-editor').onclick=hideEditor;
function hideEditor(){$('#editor-sheet').hidden=true;$('#media-sheet').hidden=true;document.body.classList.remove('editor-open');}
function openEditor(group='all'){if(group!=='all'&&!$('#event-form').elements.event_id.value){msg('Pilih undangan draft terlebih dahulu.');return;}$('#media-sheet').hidden=true;$('#editor-sheet').hidden=false;document.body.classList.add('editor-open');document.querySelectorAll('[data-editor-group]').forEach(el=>{el.hidden=group!=='all'&&el.dataset.editorGroup!==group;});$('#editor-title').textContent=group==='all'?'Buat draft undangan':({couple:'Data pengantin',event:'Acara & lokasi',story:'Kisah cinta',settings:'Pengaturan undangan'}[group]||'Edit undangan');}
document.querySelectorAll('[data-editor]').forEach(b=>b.onclick=()=>openEditor(b.dataset.editor));

$('#event-form').onsubmit=async e=>{
 e.preventDefault();if(!user)return;
 const form=e.currentTarget,f=new FormData(form),id=String(f.get('event_id')||'');
 const o={};for(const field of editFields)o[field]=String(form.elements[field]?.value||'').trim();
 if(!/^[a-z0-9-]{3,80}$/.test(o.slug)){msg('Alamat harus 3–80 karakter, huruf kecil, angka atau tanda -');return;}
 const button=$('#save-event');button.disabled=true;
 try{
 let error;
 if(id){const payload={...o};delete payload.slug;delete payload.theme;({error}=await db.from('events').update(payload).eq('id',id).eq('owner_id',user.id).eq('status','draft'));}
 else{({error}=await db.from('events').insert({...o,owner_id:user.id,status:'draft'}));}
 msg(error?(error.code==='23505'?'Alamat undangan sudah digunakan. Pilih alamat lain.':error.message):id?'Perubahan draft tersimpan.':'Draft berhasil dibuat.');
 if(!error){clearEditor();await loadEvents();}
 }finally{button.disabled=false;}
};
const rupiah=n=>'Rp '+Number(n).toLocaleString('id-ID');
let checkoutId=null;
function closeCheckout(){checkoutId=null;const el=$('#checkout-sheet');if(el)el.hidden=true;document.body.classList.remove('detail-open');}
function openCheckout(id){
 const event=eventCache.find(x=>x.id===id);if(!event||event.status!=='draft')return;
 const theme=themes.find(x=>x.slug===event.theme);
 checkoutId=id;$('#checkout-event').textContent=event.title;$('#checkout-theme').textContent=event.theme;
 $('#checkout-price').textContent=theme?rupiah(theme.amount):'Tidak tersedia';
 $('#checkout-total').textContent=theme?rupiah(theme.amount):'Tidak tersedia';
 $('#checkout-pay').disabled=true;
 $('#checkout-pay').textContent='Midtrans Sandbox belum dikonfigurasi';
 $('#checkout-sheet').hidden=false;document.body.classList.add('detail-open');
}
$('#close-checkout').onclick=closeCheckout;$('#checkout-cancel').onclick=closeCheckout;
$('#checkout-sheet').addEventListener('click',e=>{if(e.target.id==='checkout-sheet')closeCheckout();});
$('#refresh-orders').onclick=()=>loadOrders();
async function loadOrders(){
 if(!user)return;
 const {data,error}=await db.from('orders').select('id,event_id,theme,amount,status,created_at').eq('owner_id',user.id).order('created_at',{ascending:false}).limit(50);
 if(error){$('#order-list').textContent='Riwayat transaksi tidak dapat dimuat: '+error.message;return;}
 orderCache=data||[];
 const names=new Map(eventCache.map(x=>[x.id,x.title]));
 $('#order-list').innerHTML=(data||[]).map(o=>{
 const status={pending:'Menunggu pembayaran',paid:'Lunas',cancelled:'Dibatalkan'}[o.status]||'Perlu pemeriksaan';
 const date=new Date(o.created_at).toLocaleString('id-ID',{dateStyle:'medium',timeStyle:'short'});
 return '<article class="order-card"><div class="checkout-line"><strong>'+safe(names.get(o.event_id)||o.theme)+'</strong><span class="tag">'+safe(status)+'</span></div><p class="muted">'+safe(date)+' · '+safe(o.id.slice(0,8).toUpperCase())+'</p><div class="checkout-line"><span>'+safe(o.theme)+'</span><strong>'+rupiah(o.amount)+'</strong></div><button class="outline order-detail-button" type="button" data-order-detail="'+safe(o.id)+'">Detail transaksi</button></article>';
 }).join('')||'<div class="empty">Belum ada transaksi. Pesanan akan tampil di sini setelah checkout tersedia.</div>';
 document.querySelectorAll('[data-order-detail]').forEach(b=>b.onclick=()=>openOrderDetail(b.dataset.orderDetail));
}
function closeOrderDetail(){selectedOrderId=null;$('#order-detail-sheet').hidden=true;document.body.classList.remove('detail-open');}
function openOrderDetail(id){
 const o=orderCache.find(x=>x.id===id);if(!o)return;
 selectedOrderId=id;
 const event=eventCache.find(x=>x.id===o.event_id);
 const status={pending:'Menunggu pembayaran',paid:'Pembayaran terverifikasi',cancelled:'Dibatalkan'}[o.status]||'Perlu pemeriksaan';
 const row=(label,value)=>'<div class="checkout-line"><span>'+safe(label)+'</span><strong>'+safe(value)+'</strong></div>';
 $('#order-detail-content').innerHTML=row('Nomor pesanan','RJ-'+o.id)+row('Undangan',event?.title||'Undangan')+row('Template',o.theme)+row('Dibuat',new Date(o.created_at).toLocaleString('id-ID',{dateStyle:'long',timeStyle:'short'}))+row('Status',status)+row('Total',rupiah(o.amount))+'<p class="muted">Status pembayaran bersumber dari database. Bukti pembayaran resmi tersedia setelah integrasi Midtrans diuji.</p>';
 $('#order-detail-sheet').hidden=false;document.body.classList.add('detail-open');
}
$('#close-order-detail').onclick=closeOrderDetail;
$('#order-detail-sheet').addEventListener('click',e=>{if(e.target.id==='order-detail-sheet')closeOrderDetail();});
$('#order-detail-refresh').onclick=async()=>{const id=selectedOrderId;await loadOrders();if(id)openOrderDetail(id);};
let actionEventId=null,deleteEventId=null;
function closeEventActions(){$('#event-actions-sheet').hidden=true;actionEventId=null;}
function openEventActions(id){const e=eventCache.find(x=>x.id===id);if(!e)return;actionEventId=id;$('#event-actions-title').textContent=e.title;$('#event-actions-sheet').hidden=false;}
function closeDeleteEvent(){$('#delete-event-sheet').hidden=true;deleteEventId=null;$('#delete-event-confirm').value='';$('#confirm-delete-event').disabled=true;}
$('#close-event-actions').onclick=closeEventActions;
$('#event-actions-sheet').addEventListener('click',e=>{if(e.target.id==='event-actions-sheet')closeEventActions();});
$('#close-delete-event').onclick=closeDeleteEvent;$('#cancel-delete-event').onclick=closeDeleteEvent;
$('#delete-event-sheet').addEventListener('click',e=>{if(e.target.id==='delete-event-sheet')closeDeleteEvent();});
function requestDeleteEvent(id){const e=eventCache.find(x=>x.id===id);if(!e)return;deleteEventId=id;$('#delete-event-label').firstChild.textContent='Ketik '+e.slug+' untuk memastikan';$('#delete-event-confirm').placeholder=e.slug;$('#delete-event-confirm').value='';$('#confirm-delete-event').disabled=true;$('#delete-event-sheet').hidden=false;}
$('#delete-event-confirm').oninput=()=>{$('#confirm-delete-event').disabled=eventCache.find(x=>x.id===deleteEventId)?.slug!==$('#delete-event-confirm').value.trim();};
$('#confirm-delete-event').onclick=async()=>{const e=eventCache.find(x=>x.id===deleteEventId);if(!e||e.slug!==$('#delete-event-confirm').value.trim())return;const b=$('#confirm-delete-event');b.disabled=true;const {error}=await db.from('events').delete().eq('id',e.id).eq('owner_id',user.id).eq('status','draft');if(error){msg(error.message);b.disabled=false;return;}closeDeleteEvent();msg('Draft undangan dihapus.');await loadEvents();};
document.querySelectorAll('[data-event-action]').forEach(b=>b.onclick=async()=>{
 const id=actionEventId,e=eventCache.find(x=>x.id===id);if(!e)return;
 const a=b.dataset.eventAction;closeEventActions();
 if(a==='preview'){window.open('/theme-preview.html?tema='+encodeURIComponent(e.theme),'_blank','noopener');return;}
 if(a==='edit'){if(e.status!=='draft'){msg('Pengeditan undangan terbit memerlukan alur khusus.');return;}await editEvent(id);return;}
 if(a==='addon'){msg('Add-on belum tersedia. Tidak ada biaya yang diproses.');return;}
 if(a==='settings'){await openInvitationSettings(id);return;}
 if(a==='guests'||a==='rsvp')msg('Ekspor Excel belum tersedia. Tombol ini belum mengunduh data.');
});
let settingsEventId=null;
function closeInvitationSettings(){$('#invitation-settings-sheet').hidden=true;settingsEventId=null;}
$('#close-invitation-settings').onclick=closeInvitationSettings;
$('#invitation-settings-sheet').addEventListener('click',e=>{if(e.target.id==='invitation-settings-sheet')closeInvitationSettings();});
async function openInvitationSettings(id){
 const e=eventCache.find(x=>x.id===id);if(!e)return;
 if(e.status!=='draft'){msg('Pengaturan undangan terbit belum tersedia.');return;}
 settingsEventId=id;$('#settings-message').textContent='Memuat pengaturan...';
 $('#invitation-settings-sheet').hidden=false;
 const {data,error}=await db.from('invitation_settings').select('show_wishes,max_rsvp,rsvp_deadline,registered_guests_only').eq('event_id',id).maybeSingle();
 if(settingsEventId!==id)return;
 if(error){$('#settings-message').textContent=error.message;return;}
 $('#setting-wishes').checked=data?.show_wishes??true;
 $('#setting-max-rsvp').value=data?.max_rsvp??5;
 $('#setting-deadline').value=data?.rsvp_deadline||'';
 $('#setting-registered').checked=data?.registered_guests_only??false;
 $('#setting-registered').disabled=true;
 $('#settings-message').textContent='Pengaturan akses khusus tamu terdaftar belum aktif. Pengaturan RSVP tersimpan sebagai preferensi sampai formulir RSVP publik dihubungkan.';
}
$('#invitation-settings-form').onsubmit=async e=>{
 e.preventDefault();const id=settingsEventId,ev=eventCache.find(x=>x.id===id);if(!ev||ev.status!=='draft')return;
 const max=Number($('#setting-max-rsvp').value),deadline=$('#setting-deadline').value;
 if(!Number.isInteger(max)||max<1||max>20){$('#settings-message').textContent='Batas RSVP harus 1 sampai 20.';return;}
 const b=$('#save-invitation-settings');b.disabled=true;$('#settings-message').textContent='Menyimpan...';
 try{
 const payload={event_id:id,owner_id:user.id,show_wishes:$('#setting-wishes').checked,max_rsvp:max,rsvp_deadline:deadline||null,registered_guests_only:false,updated_at:new Date().toISOString()};
 const {error}=await db.from('invitation_settings').upsert(payload,{onConflict:'event_id'});
 $('#settings-message').textContent=error?'Gagal menyimpan: '+error.message:'Pengaturan draft tersimpan. Aturan publik akan diterapkan pada tahap integrasi RSVP.';
 }catch(error){$('#settings-message').textContent=error.message;}finally{b.disabled=false;}
};
async function checkoutEvent(button){
 if(!user)return;
 const id=button.dataset.checkout;button.disabled=true;const label=button.textContent;button.textContent='Menyiapkan checkout...';
 try{
 const {data:{session}}=await db.auth.getSession();
 if(!session?.access_token)throw new Error('Silakan masuk kembali.');
 const response=await fetch(SUPABASE_URL+'/functions/v1/midtrans-checkout',{method:'POST',headers:{'content-type':'application/json','authorization':'Bearer '+session.access_token,'apikey':key},body:JSON.stringify({event_id:id})});
 const result=await response.json();
 if(!response.ok)throw new Error(result.error||'Checkout tidak tersedia.');
 const url=new URL(result.redirect_url);
 if(url.protocol!=='https:'||url.hostname!=='app.sandbox.midtrans.com')throw new Error('Alamat pembayaran tidak valid.');
 location.assign(url.href);
 }catch(error){msg(error.message);button.disabled=false;button.textContent=label;}
}
async function editEvent(id){
 const {data,error}=await db.from('events').select('id,title,groom,bride,slug,date,time,venue,address,story,theme,status').eq('id',id).eq('owner_id',user.id).single();
 if(error){msg(error.message);return;}if(data.status!=='draft'){msg('Hanya undangan draft yang dapat diedit pada tahap ini.');return;}
 const form=$('#event-form');for(const field of editFields){if(form.elements[field])form.elements[field].value=data[field]||'';}
 form.elements.event_id.value=data.id;form.elements.slug.readOnly=true;form.elements.theme.disabled=true;
 $('#save-event').textContent='Simpan perubahan';$('#editor-actions').hidden=false;mediaEventId=data.id;showTab('events');openEditor('all');$('#cancel-edit').hidden=false;
}
async function loadEvents(){
 const {data,error}=await db.from('events').select('id,title,slug,status,date,theme').eq('owner_id',user.id).order('created_at',{ascending:false});
 if(error){msg(error.message);return;}
 eventCache=data||[];
 $('#editor-actions').hidden=!(data||[]).some(x=>x.status==='draft');
 const eventOptions=(data||[]).map(x=>'<option value="'+safe(x.id)+'">'+safe(x.title||x.slug)+'</option>').join('');for(const id of ['guest-event-select','wish-event-select']){const el=$('#'+id),previous=el.value;el.innerHTML=eventOptions||'<option value="">Belum ada undangan</option>';if((data||[]).some(x=>x.id===previous))el.value=previous;}
 $('#event-list').innerHTML=(data||[]).map(x=>'<article class="event-card"><button type="button" class="event-more" data-event-menu="'+safe(x.id)+'" aria-label="Menu undangan">⋮</button><span class="tag">'+safe(x.status)+'</span><h3>'+safe(x.title)+'</h3><p class="muted">'+safe(x.theme)+' · '+safe(x.date||'Tanggal belum ditentukan')+'</p><small>Alamat: /'+safe(x.slug)+'</small><p>'+(x.status==='published'?'<a target="_blank" rel="noopener" href="/'+encodeURIComponent(x.slug)+'">Lihat undangan</a>':'Undangan belum dipublikasikan')+'</p>'+(x.status==='draft'?'<button class="outline" type="button" data-edit="'+safe(x.id)+'">Edit undangan</button><button class="outline" type="button" data-media="'+safe(x.id)+'">Foto & galeri</button><button class="primary" type="button" data-checkout="'+safe(x.id)+'">Lihat checkout</button><button class="outline" type="button" data-request-delete="'+safe(x.id)+'">Hapus draft</button>':'')+'</article>').join('')||'<div class="empty">Belum ada undangan. Setelah template tersedia, kamu bisa membuat draft pertamamu.</div>';
 document.querySelectorAll('[data-request-delete]').forEach(b=>b.onclick=()=>requestDeleteEvent(b.dataset.requestDelete));document.querySelectorAll('[data-event-menu]').forEach(b=>b.onclick=()=>openEventActions(b.dataset.eventMenu));document.querySelectorAll('[data-checkout]').forEach(b=>b.onclick=()=>openCheckout(b.dataset.checkout));document.querySelectorAll('[data-edit]').forEach(b=>b.onclick=()=>editEvent(b.dataset.edit));document.querySelectorAll('[data-media]').forEach(b=>b.onclick=()=>openMedia(b.dataset.media));
}


const guestSelect=$('#guest-event-select'),wishSelect=$('#wish-event-select');
guestSelect.onchange=()=>loadGuestList();wishSelect.onchange=()=>loadWishList();
$('#guest-reload').onclick=()=>loadGuestList();$('#wish-reload').onclick=()=>loadWishList();
const guestStatus=v=>({yes:'Hadir',attending:'Hadir',hadir:'Hadir',no:'Tidak hadir',declined:'Tidak hadir',tidak_hadir:'Tidak hadir',maybe:'Belum pasti',pending:'Belum pasti',belum:'Belum menjawab'}[String(v||'').toLowerCase()]||'Belum menjawab');
function guestCounts(rows){const yes=rows.filter(x=>['yes','attending','hadir'].includes(String(x.rsvp||'').toLowerCase())).length;const no=rows.filter(x=>['no','declined','tidak_hadir'].includes(String(x.rsvp||'').toLowerCase())).length;const wishes=rows.filter(x=>String(x.wishes||'').trim()).length;return '<div><strong>'+rows.length+'</strong><small>Total tamu</small></div><div><strong>'+yes+'</strong><small>Hadir</small></div><div><strong>'+no+'</strong><small>Tidak hadir</small></div><div><strong>'+wishes+'</strong><small>Ucapan</small></div>';}
async function fetchGuests(id){if(!id)return [];const {data,error}=await db.from('guests').select('id,event_id,name,group_name,phone,quota,rsvp,attendees,wishes,checkin_at,created_at').eq('event_id',id).order('created_at',{ascending:false}).limit(500);if(error)throw error;return data||[];}
async function loadGuestList(){
 const id=guestSelect.value;if(!user||!id){$('#guest-list').textContent='Pilih undangan terlebih dahulu.';$('#guest-stats').innerHTML='';return;}
 try{const rows=await fetchGuests(id);if(guestSelect.value!==id)return;$('#guest-stats').innerHTML=guestCounts(rows);
 $('#guest-list').innerHTML=rows.map(g=>'<article class="guest-item"><div><strong>'+safe(g.name)+'</strong><p class="muted">'+safe(g.group_name||'Tanpa kelompok')+' · Kuota '+Number(g.quota||1)+' · '+safe(guestStatus(g.rsvp))+'</p></div><button type="button" class="outline" data-remove-guest="'+safe(g.id)+'">Hapus</button></article>').join('')||'<p class="empty">Belum ada tamu terdaftar.</p>';
 document.querySelectorAll('[data-remove-guest]').forEach(b=>b.onclick=()=>removeGuest(b.dataset.removeGuest,id));
 }catch(e){$('#guest-list').textContent='Gagal memuat tamu: '+e.message;}
}
$('#guest-form').onsubmit=async e=>{
 e.preventDefault();const id=guestSelect.value;if(!id)return;
 const name=$('#guest-name').value.trim(),group=$('#guest-group').value.trim(),phone=$('#guest-phone').value.trim(),quota=Number($('#guest-quota').value);
 if(!name||!Number.isInteger(quota)||quota<1||quota>20){msg('Periksa nama dan kuota 1–20.');return;}
 const b=$('#guest-add');b.disabled=true;
 try{const {error}=await db.from('guests').insert({event_id:id,name,group_name:group,phone:phone,quota});if(error)throw error;$('#guest-form').reset();$('#guest-quota').value=2;msg('Tamu berhasil ditambahkan.');await loadGuestList();}
 catch(error){msg('Gagal menambahkan tamu: '+error.message);}finally{b.disabled=false;}
};
async function removeGuest(id,eventId){
 if(!window.confirm('Hapus tamu ini dari daftar? Data RSVP dan ucapannya juga akan hilang.'))return;
 const {error}=await db.from('guests').delete().eq('id',id).eq('event_id',eventId);
 if(error){msg('Gagal menghapus tamu: '+error.message);return;}msg('Tamu dihapus.');await loadGuestList();
}
async function loadWishList(){
 const id=wishSelect.value;if(!user||!id){$('#wish-list').textContent='Pilih undangan terlebih dahulu.';$('#wish-stats').innerHTML='';return;}
 try{const rows=await fetchGuests(id);if(wishSelect.value!==id)return;$('#wish-stats').innerHTML=guestCounts(rows);
 $('#wish-list').innerHTML=rows.filter(g=>g.wishes||g.rsvp).map(g=>'<article class="guest-item"><div><strong>'+safe(g.name)+'</strong><p class="muted">'+safe(guestStatus(g.rsvp))+(g.attendees?' · '+Number(g.attendees)+' orang':'')+'</p>'+(g.wishes?'<p>'+safe(g.wishes)+'</p>':'')+'</div></article>').join('')||'<p class="empty">Belum ada konfirmasi atau ucapan dari tamu.</p>';
 }catch(e){$('#wish-list').textContent='Gagal memuat RSVP: '+e.message;}
}
const bucket='invitation-media';
const publicPhoto=path=>db.storage.from(bucket).getPublicUrl(path).data.publicUrl;
$('#close-media').onclick=hideEditor;
$('#open-media').onclick=()=>{if(!mediaEventId){msg('Pilih Edit undangan dari daftar draft terlebih dahulu.');return;}void openMedia(mediaEventId);};
async function openMedia(eventId){
 if(!user)return;
 const {data,error}=await db.from('events').select('id,title,photo,status').eq('id',eventId).eq('owner_id',user.id).single();
 if(error||data?.status!=='draft'){msg(error?.message||'Hanya draft milik Anda yang dapat diedit.');return;}
 mediaEventId=data.id;$('#editor-sheet').hidden=true;$('#media-sheet').hidden=false;document.body.classList.add('editor-open');
 $('#media-event-label').textContent=data.title;
 $('#media-cover').innerHTML=data.photo&&/^https:\/\//.test(data.photo)?'<h3>Foto sampul</h3><img class="cover-preview" alt="Foto sampul" src="'+safe(data.photo)+'">':'<p class="muted">Belum ada foto sampul.</p>';
 const {data:photos,error:galleryError}=await db.from('invitation_photos').select('id,storage_path').eq('event_id',eventId).order('created_at');
 if(galleryError){msg(galleryError.message);return;}
 $('#media-gallery').innerHTML=(photos||[]).map(p=>'<div class="gallery-item"><img alt="Foto galeri" loading="lazy" src="'+safe(publicPhoto(p.storage_path))+'"><button type="button" data-delete-photo="'+safe(p.id)+'">Hapus</button></div>').join('')||'<p class="muted">Belum ada foto galeri.</p>';
 document.querySelectorAll('[data-delete-photo]').forEach(b=>b.onclick=()=>removeGalleryPhoto(b.dataset.deletePhoto));
}
async function uploadMedia(kind){
 if(!user||!mediaEventId){msg('Pilih draft undangan terlebih dahulu.');return;}
 const input=$(kind==='cover'?'#cover-file':'#gallery-file'),file=input.files?.[0];
 if(!file){msg('Pilih foto terlebih dahulu.');return;}
 if(!['image/jpeg','image/png','image/webp'].includes(file.type)||file.size>5*1024*1024){msg('Gunakan JPG, PNG atau WebP maksimal 5 MB.');return;}
 const {data:event,error:checkError}=await db.from('events').select('id,photo,status').eq('id',mediaEventId).eq('owner_id',user.id).single();
 if(checkError||event?.status!=='draft'){msg('Draft tidak tersedia atau bukan milik Anda.');return;}
 const button=$(kind==='cover'?'#upload-cover':'#upload-gallery');button.disabled=true;
 try{
  const ext=file.type==='image/png'?'png':file.type==='image/webp'?'webp':'jpg';
  const path=user.id+'/'+mediaEventId+'/'+crypto.randomUUID()+'.'+ext;
  const {error:uploadError}=await db.storage.from(bucket).upload(path,file,{contentType:file.type,upsert:false});
  if(uploadError){msg(uploadError.message+' — Pastikan WhatsApp telah terverifikasi.');return;}
  let error;
  if(kind==='cover'){({error}=await db.from('events').update({photo:publicPhoto(path)}).eq('id',mediaEventId).eq('owner_id',user.id).eq('status','draft'));}
  else{({error}=await db.from('invitation_photos').insert({event_id:mediaEventId,owner_id:user.id,storage_path:path}));}
  if(error){await db.storage.from(bucket).remove([path]);msg('Gagal menyimpan foto: '+error.message);return;}
  input.value='';msg('Foto berhasil diunggah.');await openMedia(mediaEventId);
 }finally{button.disabled=false;}
}
$('#upload-cover').onclick=()=>uploadMedia('cover');
$('#upload-gallery').onclick=()=>uploadMedia('gallery');
async function removeGalleryPhoto(id){
 const {data,error}=await db.from('invitation_photos').select('id,storage_path').eq('id',id).eq('event_id',mediaEventId).eq('owner_id',user.id).single();
 if(error||!data){msg('Foto tidak ditemukan.');return;}
 const {error:storageError}=await db.storage.from(bucket).remove([data.storage_path]);
 if(storageError){msg(storageError.message);return;}
 const {error:deleteError}=await db.from('invitation_photos').delete().eq('id',id).eq('owner_id',user.id);
 if(deleteError){msg(deleteError.message);return;}
 msg('Foto galeri dihapus.');await openMedia(mediaEventId);
}

if(db){void init();}
