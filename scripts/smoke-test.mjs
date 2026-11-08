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

const guestCss=readFileSync('apps/buku-tamu/guestbook.css','utf8');
assert(/\[hidden\]\s*\{\s*display\s*:\s*none\s*!important\s*\}/.test(guestCss),'Hidden welcome/auth screens must not remain visible');
console.log('PASS guestbook hidden-screen regression check.');

const {readdirSync}=await import('node:fs');
const demos=readdirSync('templates').filter(x=>/^(art|birthday|deluxe|minisite|syari)-\d+\.html$/.test(x));
assert.equal(demos.length,27,'Expected 27 invitation demos');
for(const name of demos){
 const source=readFileSync('templates/'+name,'utf8');
 assert(source.includes('../template-runtime.js'),name+' missing runtime');
 assert(source.includes('catalog-assets/'),name+' missing template assets');
 assert(source.includes('data-theme='),name+' missing theme identity');
}
for(const script of ['scripts/map-template-media.mjs','scripts/audit-template-assets.mjs','template-runtime.js']){
 const result=spawnSync(process.execPath,['--check',script],{encoding:'utf8'});
 assert.equal(result.status,0,script+': '+result.stderr);
}
const qa=readFileSync('demo/qa-27.html','utf8');
assert(qa.includes('Minisite:10')&&qa.includes('Deluxe:8'),'QA navigation must include all template categories');
console.log('PASS all 27 template files and demo QA navigation.');
