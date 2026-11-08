import {createClient} from 'https://esm.sh/@supabase/supabase-js@2.57.0';
import {SUPABASE_URL,SUPABASE_PUBLISHABLE_KEY,requirePublishableKey} from '../../packages/shared/src/config.js';
const $=s=>document.querySelector(s),msg=t=>$('#message').textContent=t;
const key=SUPABASE_PUBLISHABLE_KEY;let db,user,guests=[],eventRoles=new Map();
const safe=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
if(!key)msg('Publishable key Supabase belum dikonfigurasi.');else{db=createClient(SUPABASE_URL,requirePublishableKey(key));db.auth.getSession().then(({data})=>sessionChanged(data.session));db.auth.onAuthStateChange((_e,s)=>{void sessionChanged(s);});}
async function sessionChanged(s){user=s?.user||null;$('#auth').hidden=!!user;$('#app').hidden=!user;if(!user){void stopScan();return;}$('#account').textContent=user.email;const {data,error}=await db.rpc('staff_events');if(error){msg(error.message);return;}eventRoles=new Map((data||[]).map(e=>[e.id,e.access_role]));$('#event').innerHTML=(data||[]).map(e=>'<option value="'+safe(e.id)+'">'+safe(e.title)+' ('+safe(e.access_role)+')</option>').join('');await load();}
$('#login').onsubmit=async e=>{e.preventDefault();if(!db)return;const {error}=await db.auth.signInWithPassword({email:$('#email').value,password:$('#password').value});msg(error?.message||'Berhasil masuk.');};$('#logout').onclick=()=>db.auth.signOut();$('#event').onchange=async()=>{await stopScan();importRows=[];$('#import-confirm').disabled=true;await load();};$('#search').oninput=render;
async function load(){const eventId=$('#event').value;$('#staff-management').hidden=eventRoles.get(eventId)!=='owner';$('#guest-form').hidden=eventRoles.get(eventId)!=='owner';$('#import-file').closest('section').hidden=eventRoles.get(eventId)!=='owner';if(!eventId){guests=[];render();return;}const {data,error}=await db.rpc('staff_guest_list',{p_event_id:eventId});if(error){msg(error.message);return;}if($('#event').value!==eventId)return;guests=data||[];render();if(eventRoles.get(eventId)==='owner')await loadStaff();}
function render(){const q=$('#search').value.toLowerCase();$('#total').textContent=guests.length;$('#checked').textContent=guests.filter(g=>g.checkin_at).length;$('#rsvp-yes').textContent=guests.filter(g=>g.rsvp==='hadir').length;$('#rsvp-no').textContent=guests.filter(g=>g.rsvp==='tidak').length;$('#attendees-total').textContent=guests.filter(g=>g.rsvp==='hadir').reduce((sum,g)=>sum+Number(g.attendees||0),0);$('#guests').innerHTML=guests.filter(g=>g.name.toLowerCase().includes(q)).map(g=>'<article class="panel"><h3>'+safe(g.name)+'</h3><small>'+safe(g.group_name)+' · Kuota '+g.quota+'</small><p>'+(g.checkin_at?'Sudah hadir':'Belum hadir')+'</p><button data-check="'+safe(g.id)+'" '+(g.checkin_at?'disabled':'')+'>Check-in</button> <button class="secondary" data-souvenir="'+safe(g.id)+'" '+(!g.checkin_at||g.souvenir?'disabled':'')+'>'+(g.souvenir?'Souvenir diambil':'Serahkan souvenir')+'</button> <button class="secondary" data-card="'+safe(g.id)+'">Kartu QR</button></article>').join('')||'<p>Belum ada tamu.</p>';document.querySelectorAll('[data-check]').forEach(b=>b.onclick=()=>checkin(b.dataset.check));document.querySelectorAll('[data-souvenir]').forEach(b=>b.onclick=()=>souvenir(b.dataset.souvenir));document.querySelectorAll('[data-card]').forEach(b=>b.onclick=()=>printGuestCard(b.dataset.card));}
$('#guest-form').onsubmit=async e=>{e.preventDefault();if(eventRoles.get($('#event').value)!=='owner')return msg('Hanya pemilik yang dapat menambah tamu.');if(!$('#event').value)return msg('Pilih acara dahulu.');const f=new FormData(e.currentTarget);const o={event_id:$('#event').value,name:f.get('name'),group_name:f.get('group_name'),phone:f.get('phone'),quota:Number(f.get('quota'))};const {error}=await db.from('guests').insert(o);msg(error?.message||'Tamu ditambahkan.');if(!error){e.currentTarget.reset();await load();}};
async function checkin(id){const g=guests.find(x=>x.id===id);if(!g||g.checkin_at)return;const count=Math.max(1,Math.min(Number(g.quota)||1,Number(g.attendees)||1));const {data,error}=await db.rpc('staff_checkin',{p_event_id:$('#event').value,p_guest_id:id,p_count:count});msg(error?.message||(data==='already_checked_in'?'Tamu sudah check-in.':'Check-in berhasil.'));await load();}
async function souvenir(id){const {data,error}=await db.rpc('staff_souvenir',{p_event_id:$('#event').value,p_guest_id:id});msg(error?.message||(data==='already_collected'?'Souvenir sudah diambil.':'Souvenir berhasil dicatat.'));await load();}

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
 const rows=file.name.toLowerCase().endsWith('.xlsx')?await readXlsx(file):parseCsv(await file.text());if(rows.length<2)throw Error('CSV tidak memiliki data');
 const header=rows.shift().map(x=>x.trim().toLowerCase());
 const col=names=>header.findIndex(x=>names.includes(x));
 const indexes=[col(['nama','name']),col(['kelompok','group','group_name']),col(['whatsapp','telepon','phone']),col(['kuota','quota'])];
 if(indexes[0]<0||indexes[3]<0)throw Error('Kolom Nama dan Kuota wajib ada');
 if(rows.length>500)throw Error('Maksimal 500 tamu per impor');
 importRows=rows.map((r,i)=>{const name=(r[indexes[0]]||'').trim(),quota=Number(r[indexes[3]]);if(!name||name.length>100||!Number.isInteger(quota)||quota<1||quota>20)throw Error('Baris '+(i+2)+' tidak valid');return {name,quota,group_name:indexes[1]<0?'':(r[indexes[1]]||'').trim().slice(0,60),phone:indexes[2]<0?'':(r[indexes[2]]||'').trim().slice(0,30)};});
 $('#import-result').textContent=importRows.length+' tamu siap diimpor. Contoh: '+importRows.slice(0,3).map(x=>x.name).join(', ');
 $('#import-confirm').disabled=false;
 }catch(e){$('#import-result').textContent='Gagal membaca CSV: '+e.message;}
};
$('#import-confirm').onclick=async()=>{
 const eventId=$('#event').value;if(eventRoles.get(eventId)!=='owner')return msg('Hanya pemilik yang dapat mengimpor tamu.');if(!eventId||!importRows.length)return;
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

async function loadStaff(){
 const eventId=$('#event').value;
 const {data,error}=await db.rpc('list_event_staff',{p_event_id:eventId});
 if(error){$('#staff-list').textContent=error.message;return;}
 if($('#event').value!==eventId)return;
 $('#staff-list').innerHTML=(data||[]).map(x=>'<div class="panel"><span>'+safe(x.email)+'</span> <button type="button" class="secondary" data-revoke="'+safe(x.email)+'">Cabut akses</button></div>').join('')||'<p>Belum ada petugas.</p>';
 document.querySelectorAll('[data-revoke]').forEach(b=>b.onclick=()=>changeStaff(b.dataset.revoke,false));
}
async function changeStaff(email,add){
 const eventId=$('#event').value;if(eventRoles.get(eventId)!=='owner')return;
 if(!add&&!window.confirm('Cabut akses petugas '+email+'?'))return;
 const {error}=await db.rpc('manage_event_staff',{p_event_id:eventId,p_email:email,p_add:add});
 msg(error?.message||(add?'Petugas ditambahkan.':'Akses petugas dicabut.'));
 if(!error)await loadStaff();
}
$('#staff-form').onsubmit=async e=>{e.preventDefault();const email=$('#staff-email').value.trim();if(!email)return;await changeStaff(email,true);};

async function readXlsx(file){
 if(file.size>1024*1024)throw Error('Excel maksimal 1 MB');
 const ExcelJS=(await import('https://esm.sh/exceljs@4.4.0?bundle')).default;
 const workbook=new ExcelJS.Workbook();
 await workbook.xlsx.load(await file.arrayBuffer());
 const sheet=workbook.worksheets[0];if(!sheet)throw Error('Lembar Excel kosong');
 if(sheet.rowCount>501)throw Error('Maksimal 500 tamu per impor');
 const rows=[];
 sheet.eachRow({includeEmpty:false},row=>{
  const values=[];for(let i=1;i<=Math.min(row.cellCount,20);i++){const v=row.getCell(i).value;values.push(v==null?'':typeof v==='object'?(v.text??v.result??''):String(v));}
  rows.push(values);
 });
 return rows;
}
function csvCell(value){let s=String(value??'').replace(/\r\n?/g,'\n');if(/^\s*[=+@-]/.test(s))s="'"+s;return '"'+s.replace(/"/g,'""')+'"';}
function downloadCsv(name,rows){const blob=new Blob(['\uFEFF'+rows.map(r=>r.map(csvCell).join(',')).join('\r\n')],{type:'text/csv;charset=utf-8'});const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),3000);}
$('#download-attendance').onclick=()=>{
 if(!$('#event').value)return msg('Pilih acara dahulu.');
 const rows=[['Nama','Kelompok','Kuota','RSVP','Jumlah orang','Waktu check-in','Souvenir'],...guests.map(g=>[g.name,g.group_name,g.quota,g.rsvp,g.attendees,g.checkin_at||'',g.souvenir?'Sudah':'Belum'])];
 downloadCsv('laporan-kehadiran-'+$('#event').value+'.csv',rows);msg('Laporan kehadiran disiapkan.');
};
async function printGuestCard(id){
 const g=guests.find(x=>x.id===id);if(!g)return;
 try{
  const QRCode=(await import('https://esm.sh/qrcode@1.5.4?bundle')).default;
  const qr=await QRCode.toDataURL(g.token,{width:320,margin:2,errorCorrectionLevel:'M'});
  const w=window.open('','_blank');if(!w){msg('Izinkan pop-up untuk mencetak kartu tamu.');return;}
  const name=safe(g.name),group=safe(g.group_name);
  w.document.write('<!doctype html><html lang="id"><meta charset="utf-8"><title>Kartu Tamu</title><style>body{font-family:Arial,sans-serif;text-align:center;margin:30px;color:#2C221E}.card{max-width:350px;margin:auto;border:2px solid #C86D51;border-radius:18px;padding:24px}img{width:240px}h1{font-size:22px}@media print{button{display:none}}</style><div class="card"><p>RUANGJANJI · BUKU TAMU</p><h1>'+name+'</h1><p>'+group+' · Kuota '+Number(g.quota)+'</p><img alt="Kode QR tamu" src="'+qr+'"><p>Tunjukkan QR kepada petugas</p></div><p><button onclick="window.print()">Cetak kartu</button></p></html>');
  w.document.close();
 }catch(e){msg('Gagal membuat QR: '+e.message);}
}
