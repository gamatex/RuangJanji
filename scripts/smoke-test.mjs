import {readFileSync,existsSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import assert from 'node:assert/strict';
const files=['apps/buku-tamu/main.js','apps/ruangjanji/main.js','invitation.js'];
for(const file of files){const result=spawnSync(process.execPath,['--check',file],{encoding:'utf8'});assert.equal(result.status,0,file+': '+result.stderr);console.log('PASS syntax',file);}
const guest=readFileSync('apps/buku-tamu/main.js','utf8');
const html=readFileSync('apps/buku-tamu/index.html','utf8');
for(const id of ['import-file','import-preview','import-confirm','download-attendance','scan-start','qr-video','staff-management','event']){
 assert(html.includes('id="'+id+'"'),'Missing UI '+id);
}
for(const marker of ["db.rpc('staff_checkin'","db.rpc('staff_souvenir'","db.rpc('staff_guest_list'","async function readXlsx","async function printGuestCard","$('#download-attendance')"]){
 assert(guest.includes(marker),'Missing integration '+marker);
}
assert(!guest.includes("db.from('guests').update({checkin_at"),'Unsafe direct checkin update');
assert(!guest.includes("db.from('guests').update({souvenir"),'Unsafe direct souvenir update');
console.log('PASS static integration checks. Live Supabase, camera, and APK device tests still required.');
