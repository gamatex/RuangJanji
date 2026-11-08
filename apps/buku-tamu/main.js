import {createClient} from 'https://esm.sh/@supabase/supabase-js@2.57.0';
import {SUPABASE_URL,SUPABASE_PUBLISHABLE_KEY,requirePublishableKey} from '../../packages/shared/src/config.js';
const $=s=>document.querySelector(s),msg=t=>$('#message').textContent=t;
const key=SUPABASE_PUBLISHABLE_KEY;let db,user,guests=[];
const safe=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
if(!key)msg('Publishable key Supabase belum dikonfigurasi.');else{db=createClient(SUPABASE_URL,requirePublishableKey(key));db.auth.getSession().then(({data})=>sessionChanged(data.session));db.auth.onAuthStateChange((_e,s)=>{void sessionChanged(s);});}
async function sessionChanged(s){user=s?.user||null;$('#auth').hidden=!!user;$('#app').hidden=!user;if(!user){void stopScan();return;}$('#account').textContent=user.email;const {data,error}=await db.from('events').select('id,title').eq('owner_id',user.id);if(error){msg(error.message);return;}$('#event').innerHTML=(data||[]).map(e=>'<option value="'+safe(e.id)+'">'+safe(e.title)+'</option>').join('');await load();}
$('#login').onsubmit=async e=>{e.preventDefault();if(!db)return;const {error}=await db.auth.signInWithPassword({email:$('#email').value,password:$('#password').value});msg(error?.message||'Berhasil masuk.');};$('#logout').onclick=()=>db.auth.signOut();$('#event').onchange=async()=>{await stopScan();importRows=[];$('#import-confirm').disabled=true;await load();};$('#search').oninput=render;
async function load(){if(!$('#event').value){guests=[];render();return;}const {data,error}=await db.from('guests').select('id,name,group_name,phone,quota,checkin_at,attendees,souvenir,token,rsvp').eq('event_id',$('#event').value).order('name');if(error){msg(error.message);return;}guests=data||[];render();}
function render(){const q=$('#search').value.toLowerCase();$('#total').textContent=guests.length;$('#checked').textContent=guests.filter(g=>g.checkin_at).length;$('#rsvp-yes').textContent=guests.filter(g=>g.rsvp==='hadir').length;$('#rsvp-no').textContent=guests.filter(g=>g.rsvp==='tidak_hadir').length;$('#attendees-total').textContent=guests.filter(g=>g.rsvp==='hadir').reduce((sum,g)=>sum+Number(g.attendees||0),0);$('#guests').innerHTML=guests.filter(g=>g.name.toLowerCase().includes(q)).map(g=>'<article class="panel"><h3>'+safe(g.name)+'</h3><small>'+safe(g.group_name)+' · Kuota '+g.quota+'</small><p>'+(g.checkin_at?'Sudah hadir':'Belum hadir')+'</p><button data-check="'+safe(g.id)+'" '+(g.checkin_at?'disabled':'')+'>Check-in</button> <button class="secondary" data-souvenir="'+safe(g.id)+'" '+(!g.checkin_at||g.souvenir?'disabled':'')+'>'+(g.souvenir?'Souvenir diambil':'Serahkan souvenir')+'</button></article>').join('')||'<p>Belum ada tamu.</p>';document.querySelectorAll('[data-check]').forEach(b=>b.onclick=()=>checkin(b.dataset.check));document.querySelectorAll('[data-souvenir]').forEach(b=>b.onclick=()=>souvenir(b.dataset.souvenir));}
$('#guest-form').onsubmit=async e=>{e.preventDefault();if(!$('#event').value)return msg('Pilih acara dahulu.');const f=new FormData(e.currentTarget);const o={event_id:$('#event').value,name:f.get('name'),group_name:f.get('group_name'),phone:f.get('phone'),quota:Number(f.get('quota'))};const {error}=await db.from('guests').insert(o);msg(error?.message||'Tamu ditambahkan.');if(!error){e.currentTarget.reset();await load();}};
async function checkin(id){const g=guests.find(x=>x.id===id);if(!g||g.checkin_at)return;const {error}=await db.from('guests').update({checkin_at:new Date().toISOString(),attendees:Math.max(1,Math.min(Number(g.quota)||1,Number(g.attendees)||1))}).eq('id',id).is('checkin_at',null);msg(error?.message||'Permintaan check-in diproses.');await load();}
async function souvenir(id){const {error}=await db.from('guests').update({souvenir:true}).eq('id',id).eq('souvenir',false).not('checkin_at','is',null);msg(error?.message||'Permintaan souvenir diproses.');await load();}

let importRows=[],scannerStream=null,scannerActive=false;
function parseCsv(text){
 const rows=[],row=[];let cell='',quoted=false;
 text=text.replace(/^\uFEFF/,'');
 for(let i=0;i<text.length;i++){const ch=text[i];if(quoted){if(ch==='"'&&text[i+1]==='"'){cell+='"';i++;}else if(ch==='"')quoted=false;else cell+=ch;}else if(ch==='"')quoted=true;else if(ch===','){row.push(cell);cell='';}else if(ch==='\n'){row.push(cell.replace(/\r$/,''));rows.push([...row]);row.length=0;cell='';}else cell+=ch;}
 if(quoted)throw Error('Tanda kutip CSV tidak lengkap');
 if(cell||row.length){row.push(cell.replace(/\r$/,''));rows.push([...row]);}
 return rows.filter(x=>x.some(v=>v.trim()));
}
$('#import-preview').onclick=async()=>{
 importRows=[];$('#import-confirm').disabled=true;
 const file=$('#import-file').files?.[0];if(!file)return msg('Pilih file CSV dahulu.');
 if(file.size>1024*1024)return msg('File maksimal 1 MB.');
 try{
 const rows=parseCsv(await file.text());if(rows.length<2)throw Error('CSV tidak memiliki data');
 const header=rows.shift().map(x=>x.trim().toLowerCase());
 const col=names=>header.findIndex(x=>names.includes(x));
 const indexes=[col(['nama','name']),col(['kelompok','group','group_name']),col(['whatsapp','telepon','phone']),col(['kuota','quota'])];
 if(indexes[0]<0||indexes[3]<0)throw Error('Kolom Nama dan Kuota wajib ada');
 if(rows.length>500)throw Error('Maksimal 500 tamu per impor');
 importRows=rows.map((r,i)=>{const name=(r[indexes[0]]||'').trim(),quota=Number(r[indexes[3]]);if(!name||name.length>120||!Number.isInteger(quota)||quota<1||quota>20)throw Error('Baris '+(i+2)+' tidak valid');return {name,quota,group_name:indexes[1]<0?'':(r[indexes[1]]||'').trim().slice(0,80),phone:indexes[2]<0?'':(r[indexes[2]]||'').trim().slice(0,30)};});
 $('#import-result').textContent=importRows.length+' tamu siap diimpor. Contoh: '+importRows.slice(0,3).map(x=>x.name).join(', ');
 $('#import-confirm').disabled=false;
 }catch(e){$('#import-result').textContent='Gagal membaca CSV: '+e.message;}
};
$('#import-confirm').onclick=async()=>{
 const eventId=$('#event').value;if(!eventId||!importRows.length)return;
 const button=$('#import-confirm');button.disabled=true;
 let inserted=0;
 for(let i=0;i<importRows.length;i+=50){const {error}=await db.from('guests').insert(importRows.slice(i,i+50).map(x=>({...x,event_id:eventId})));if(error){msg('Impor berhenti setelah '+inserted+' baris: '+error.message);await load();return;}inserted+=Math.min(50,importRows.length-i);}
 importRows=[];$('#import-result').textContent=inserted+' tamu berhasil diimpor.';msg('Impor selesai.');await load();
};
async function checkToken(value){
 const token=(value||'').trim().match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i)?.[0];
 if(!token)return msg('Token QR tidak valid');
 const guest=guests.find(g=>g.token.toLowerCase()===token.toLowerCase());
 if(!guest)return msg('Tamu tidak ditemukan pada acara ini');
 if(guest.checkin_at)return msg(guest.name+' sudah check-in');
 if(!window.confirm('Check-in '+guest.name+'?'))return;
 await checkin(guest.id);
}
$('#qr-checkin').onclick=()=>checkToken($('#qr-token').value);
async function stopScan(){scannerActive=false;scannerStream?.getTracks().forEach(t=>t.stop());scannerStream=null;$('#qr-video').style.display='none';}
$('#scan-stop').onclick=stopScan;
$('#scan-start').onclick=async()=>{
 if(!('BarcodeDetector' in window)||!navigator.mediaDevices?.getUserMedia)return msg('Pemindai kamera belum didukung browser ini. Gunakan token manual.');
 try{
 await stopScan();scannerStream=await navigator.mediaDevices.getUserMedia({video:{facingMode:'environment'}});
 const video=$('#qr-video');video.srcObject=scannerStream;video.style.display='block';await video.play();scannerActive=true;
 const detector=new BarcodeDetector({formats:['qr_code']});
 async function tick(){if(!scannerActive)return;try{const codes=await detector.detect(video);if(codes.length){await stopScan();await checkToken(codes[0].rawValue);return;}}catch(e){msg('Pemindaian gagal: '+e.message);await stopScan();return;}requestAnimationFrame(tick);}void tick();
 }catch(e){await stopScan();msg('Kamera tidak tersedia: '+e.message);}
};
