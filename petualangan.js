const guest = new URLSearchParams(location.search).get('to')?.trim().slice(0, 80) || 'Tamu Undangan';
const canvas = document.querySelector('#world');
const ctx = canvas.getContext('2d');
const intro = document.querySelector('#intro');
const panel = document.querySelector('#panel');
const content = document.querySelector('#content');
const dock = document.querySelector('.dock');
const stick = document.querySelector('.stick');
const places = [
  {name:'Mempelai', icon:'♥', x:78,y:70, kind:'arch', color:'#ad566b'},
  {name:'Acara', icon:'✦', x:236,y:70, kind:'hall', color:'#895d3c'},
  {name:'Kisah Cinta', icon:'❦', x:78,y:177, kind:'bench', color:'#ae6c4f'},
  {name:'Galeri', icon:'▧', x:236,y:177, kind:'hall', color:'#7c698b'},
  {name:'Tanda Kasih', icon:'◆', x:243,y:211, kind:'stall', color:'#bf8c45'},
  {name:'Ucapan', icon:'✉', x:72,y:284, kind:'board', color:'#8f6244'},
  {name:'Video', icon:'▶', x:246,y:284, kind:'arch', color:'#7a577b'},
  {name:'Terima Kasih', icon:'✿', x:103,y:390, kind:'stall', color:'#a75a54'}
];
const found = new Set();
const keys = new Set();
const player = {x:157,y:426,avatar:0,step:0};
const camera = {x:0,y:0};
let scale = 1, started = false, stickVector = [0,0], pointer = null, last = 0;
let audio, musicLoop, effects = true;
const music = document.querySelector('#sound');
const world = document.createElement('canvas');
world.width = 314; world.height = 475;
const map = world.getContext('2d');

function box(g,x,y,w,h,color) { g.fillStyle=color; g.fillRect(Math.round(x),Math.round(y),w,h); }
function dot(g,x,y,r,color) { g.fillStyle=color;g.beginPath();g.arc(Math.round(x),Math.round(y),r,0,Math.PI*2);g.fill(); }
function flowers(g,x,y,seed) {
  box(g,x-6,y-2,12,6,'#416447');
  [[-4,-2],[0,0],[4,-3]].forEach(([a,b],i)=>{
    dot(g,x+a,y+b,2,(i+seed)%2?'#ef9f9b':'#f6d586');
    box(g,x+a,y+b,1,1,'#fff0b7');
  });
}
function shade(g,x,y,rx,ry) {
  g.fillStyle='#2f422c55';g.beginPath();g.ellipse(x,y,rx,ry,0,0,Math.PI*2);g.fill();
}
function grain(x,y,w,h,seed,palette,count) {
  let n=seed;
  for(let i=0;i<count;i++){
    n=(n*1664525+1013904223)>>>0;
    const dx=n%w,dy=(n>>>12)%h;
    box(map,x+dx,y+dy,1+i%3,1+i%2,palette[(n>>>20)%palette.length]);
  }
}
function tree(x,y,pink) {
  shade(map,x+2,y+12,17,5);
  box(map,x-4,y-6,8,18,'#573729');
  box(map,x-2,y-4,5,15,'#8d5638');
  box(map,x,y-3,2,12,'#bf8050');
  [-7,4].forEach((a,i)=>box(map,x+a,y+9-i,5,3,'#724632'));
  const colors=pink?['#7d4158','#a85272','#d87391','#ef9ca6','#ffd1bd']:['#254c36','#38673b','#55813d','#7a9c44','#b7b952'];
  const clusters=[[0,-11,18],[-10,-13,11],[11,-15,11],[0,-22,13]];
  clusters.forEach(([a,b,r])=>dot(map,x+a,y+b,r,colors[0]));
  clusters.forEach(([a,b,r])=>dot(map,x+a-1,y+b-2,r-2,colors[1]));
  let seed=x*321+y;
  for(let i=0;i<165;i++){
    seed=(seed*1664525+1013904223)>>>0;
    const dx=seed%43-21,dy=(seed>>>10)%31-35;
    if(!clusters.some(([a,b,r])=>Math.hypot(dx-a,dy-b+2)<r-3))continue;
    box(map,x+dx,y+dy,1+i%3,1+i%2,colors[1+(seed>>>25)%4]);
  }
}
function garland(x,y,span,curve) {
  for(let dx=-span;dx<=span;dx+=3){
    const dy=Math.round(curve*(dx/span)**2);
    dot(map,x+dx,y+dy,4,'#304933');
    dot(map,x+dx-1,y+dy-1,3,dx%2?'#577643':'#6f8748');
    if(dx%3===0&&dx%4!==0){
      dot(map,x+dx,y+dy,2,dx%2?'#e5a291':'#e2bd70');
      box(map,x+dx,y+dy,1,1,'#ffdfad');
    }
  }
}
function building(p) {
  const {x,y,kind,color}=p;
  shade(map,x,y+15,28,7);
  const tall=kind==='arch'||kind==='hall', width=tall?48:42, left=x-width/2, top=tall?y-19:y-14;
  box(map,left,top,width,y-top+17,'#543729');
  box(map,left+2,top+2,width-4,y-top+13,'#d9a86c');
  grain(left+3,top+3,width-7,y-top+9,x+y,['#c99863','#e5bb80','#ac744f'],115);
  box(map,left+2,y+12,width-4,3,'#855634');
  box(map,left-1,y+15,width+2,3,'#ab7950');
  box(map,left+2,top+1,3,y-top+13,'#855432');
  box(map,left+width-5,top+1,3,y-top+13,'#855432');
  if(tall){
    if(kind==='hall'){
      for(let i=0;i<7;i++)box(map,x-28+i*4,y-19-i*2,56-i*8,3,i%2?color:'#654338');
      for(let dx=-22;dx<=22;dx+=4)box(map,x+dx,y-19,2,3,'#cc9265');
      [-16,11].forEach(dx=>{box(map,x+dx,y-9,6,10,'#634435');box(map,x+dx+1,y-8,4,7,'#e8bf78')});
    }else{
      garland(x,y-29,25,15);
      for(let dx=-17;dx<=17;dx++){
        const drop=Math.round(8*(1-Math.abs(dx)/17));
        box(map,x+dx,y-17-drop,1,4,dx%3?'#ebd4ad':'#c0a382');
      }
    }
    box(map,x-8,y-9,16,23,'#634030');box(map,x-6,y-7,12,19,'#9c633d');
    [-5,1].forEach(dx=>{box(map,x+dx,y-6,4,14,'#bd8956');box(map,x+dx+1,y-5,2,7,'#d9b380')});
    box(map,x-1,y+2,2,2,'#f3cf7d');
  }else{
    garland(x,y-21,21,6);
    box(map,x-17,y-10,34,18,'#614431');
    if(kind==='board')[-14,-3,8].forEach(dx=>{
      box(map,x+dx,y-6,7,9,'#f5e1b9');
      box(map,x+dx+1,y-3,4,1,'#b9a17e');
      box(map,x+dx+1,y-1,3,1,'#b9a17e');
    });
    else{
      box(map,x-15,y+3,30,5,'#a96e47');
      [-12,0,12].forEach((dx,i)=>flowers(map,x+dx,y+2,i));
    }
  }
  [-1,1].forEach((side,i)=>{
    box(map,x+side*23-4,y+7,8,8,'#8d593b');
    box(map,x+side*23-3,y+9,2,5,'#c28658');
    flowers(map,x+side*23,y+6,i);
  });
}
box(map,0,0,314,475,'#7da952');
grain(0,0,314,475,310,['#729e4b','#8cb758','#97bb63','#638f46'],2700);
for(let i=0;i<95;i++){
  const x=(i*71+17)%314,y=(i*47+13)%475;
  for(let j=0;j<3;j++)box(map,x+j*2,y-j%2,1,2+j%2,'#628d44');
}
function path(points) {
  ['#b38a5a','#e3c48c'].forEach((color,i)=>{
    map.lineWidth= i?23:27;map.lineCap='round';map.lineJoin='round';map.strokeStyle=color;
    map.beginPath();points.forEach(([x,y],n)=>n?map.lineTo(x,y):map.moveTo(x,y));map.stroke();
  });
}
path([[157,0],[157,475]]);
path([[72,87],[72,305],[246,305],[246,87]]);
path([[72,198],[246,198]]);
path([[103,407],[103,363],[250,363],[250,400]]);
grain(148,0,18,475,24,['#d1af77','#ebcf9c'],155);
[[21,104],[292,98],[23,210],[293,222],[118,288],[202,279],[20,369],[291,347],[51,437],[292,423],[104,121],[204,125],[23,56],[291,52]].forEach(([x,y],i)=>tree(x,y,[3,5,9,11].includes(i)));
[[40,140],[270,156],[113,329],[199,332],[40,336],[281,386],[119,448],[202,409],[272,447]].forEach(([x,y],i)=>flowers(map,x,y,i));
[108,215,320].forEach(y=>[137,177].forEach(x=>{
  shade(map,x,y+16,5,2);box(map,x-1,y,3,16,'#674630');box(map,x,y+1,1,14,'#b9814c');
  box(map,x-4,y-5,9,9,'#715034');box(map,x-2,y-4,5,6,'#efb765');box(map,x-1,y-3,3,4,'#fff0a0');
  box(map,x-2,y-7,5,2,'#624531');box(map,x-3,y+14,7,3,'#69472f');
}));
shade(map,250,423,34,25);
dot(map,250,421,26,'#566556');dot(map,250,421,22,'#3e8393');dot(map,248,421,19,'#53a7a7');
for(let i=0;i<26;i++){
  const x=230+(i*13)%41,y=403+(i*11)%37;
  if(Math.hypot(x-250,y-421)<19)box(map,x,y,3+i%3,1,i%2?'#70c0b3':'#398d9e');
}
for(let i=0;i<12;i++){
  const a=i*Math.PI/6,x=250+Math.cos(a)*25,y=421+Math.sin(a)*24;
  dot(map,x,y,4+i%3,'#62665b');dot(map,x-1,y-1,3+i%3,'#a29a83');
}
for(let dx=-24;dx<=24;dx++){
  const y=409+Math.round(7*(dx/24)**2);
  box(map,250+dx,y,1,11,'#694732');
  box(map,250+dx,y+2,1,7,dx%3?'#ba834d':'#dfad6f');
}
places.forEach(building);

function avatar(g,x,y,variant,step=0) {
  const cloth=variant?'#a54e63':'#645279';
  box(g,x-6,y+5,12,3,'#526b45');
  box(g,x-4,y-1,8,6,cloth);
  box(g,x-3,y+4+(step%2),2,3,'#442f2b');box(g,x+1,y+5-(step%2),2,3,'#442f2b');
  box(g,x-4,y-7,8,6,'#edb182');
  box(g,x-5,y-9,10,3,cloth);box(g,x-6,y-7,12,1,'#4c373b');
  box(g,x-2,y-5,1,1,'#432e28');box(g,x+2,y-5,1,1,'#432e28');box(g,x-1,y+1,2,3,'#e6bc74');
}
document.querySelectorAll('.avatars canvas').forEach((c,i)=>avatar(c.getContext('2d'),11,14,i));
function resize() {
  scale=Math.max(1.55,Math.min(3,innerWidth/300));
  canvas.width=Math.ceil(canvas.clientWidth/scale);
  canvas.height=Math.ceil(canvas.clientHeight/scale);
  ctx.imageSmoothingEnabled=false;
}
addEventListener('resize',resize);resize();

function position(value,span,total) { return span>=total?Math.round((total-span)/2):Math.round(Math.max(0,Math.min(total-span,value-span/2))); }
function draw(now) {
  const w=canvas.width,h=canvas.height;
  camera.x=position(player.x,w,world.width);
  camera.y=position(player.y,h,world.height);
  box(ctx,0,0,w,h,'#7faa58');
  ctx.drawImage(world,-camera.x,-camera.y);
  places.forEach((p,i)=>{
    const x=p.x-camera.x,y=p.y-camera.y;
    const title=(found.has(i)?'✓ ':'')+p.name;
    ctx.font='bold 7px monospace';
    const label=Math.ceil(ctx.measureText(title).width)+8;
    box(ctx,x-label/2,y-40,label,11,'#664732');
    box(ctx,x-label/2+1,y-39,label-2,9,found.has(i)?'#e5eab3':'#fff0bd');
    ctx.fillStyle='#473125';ctx.textAlign='center';ctx.fillText(title,x,y-32);
  });
  const petX=199+Math.sin(now/2100)*11,petY=330;
  box(ctx,petX-camera.x,petY-camera.y,10,5,'#c99459');
  box(ctx,petX+7-camera.x,petY-3-camera.y,5,6,'#e6b474');
  box(ctx,petX+10-camera.x,petY-2-camera.y,1,1,'#543a29');
  box(ctx,petX+7-camera.x,petY-5-camera.y,2,3,'#b27e52');
  box(ctx,petX+1-camera.x,petY+4-camera.y,2,2,'#f3d2a3');
  box(ctx,petX+7-camera.x,petY+4-camera.y,2,2,'#f3d2a3');
  avatar(ctx,player.x-camera.x,player.y-camera.y,player.avatar,player.step);
}

function frame(now) {
  const dt=Math.min(.035,(now-last)/1000||0);last=now;
  if(started&&!panel.open) {
    const dx=stickVector[0]+Number(keys.has('arrowright')||keys.has('d'))-Number(keys.has('arrowleft')||keys.has('a'));
    const dy=stickVector[1]+Number(keys.has('arrowdown')||keys.has('s'))-Number(keys.has('arrowup')||keys.has('w'));
    const length=Math.hypot(dx,dy);
    if(length>.12) {
      player.x=Math.max(9,Math.min(305,player.x+dx/Math.max(1,length)*87*dt));
      player.y=Math.max(12,Math.min(464,player.y+dy/Math.max(1,length)*87*dt));
      player.step=Math.floor(now/135);
      const near=places.findIndex(p=>Math.hypot(player.x-p.x,player.y-(p.y+16))<10);
      if(near>=0&&!found.has(near)) visit(near);
    }
  }
  draw(now);requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

function show(title,body) {
  keys.clear();resetStick();
  content.innerHTML='<h2>'+title+'</h2>'+body;
  if(!panel.open)panel.showModal();
}
panel.querySelector('.close').onclick=()=>panel.close();
panel.addEventListener('close',()=>{if(!started&&!intro.open)intro.showModal()});
intro.addEventListener('cancel',e=>e.preventDefault());
document.querySelector('#guest').textContent=guest;
intro.showModal();
document.querySelector('#start').onclick=()=>{
  player.avatar=Number(document.querySelector('[name=avatar]:checked').value);
  intro.close();
  show('Selamat datang!', '<p>Geser joystick di HP atau gunakan WASD dan tombol panah. Dekati bangunan atau ketuk ikonnya untuk membuka isi undangan.</p><p class="help">Peta membuka semua tempat secara langsung.</p><button class="primary" id="go">Ayo mulai</button>');
  document.querySelector('#go').onclick=()=>{
    started=true;
    document.querySelectorAll('.hud,.stick,.dock').forEach(e=>e.hidden=false);
    panel.close();
  };
};

function photo(key,label) {
  const wrapper=document.createElement('div');wrapper.className='photo';wrapper.textContent=label;
  if(typeof motionPhotos!=='undefined'&&motionPhotos[key]){
    const img=document.createElement('img');img.src=motionPhotos[key];img.alt=label;wrapper.replaceChildren(img);
  }
  return wrapper.outerHTML;
}
const sections = [
  ()=>'<div class="pair">'+photo('mempelaiPria','Foto Arga')+photo('mempelaiWanita','Foto Laras')+'</div><p><b>Arga Pratama</b> &amp; <b>Laras Ayuningtyas</b></p>',
  ()=>'<p><b>Sabtu, 14 Agustus 2027</b></p><p>Akad 08.00–09.00 WIB<br>Resepsi 11.00–14.00 WIB</p><p>Bandung · lokasi contoh</p><a class="button" href="https://www.google.com/maps/search/?api=1&amp;query=Gedung+Sate+Bandung" target="_blank" rel="noopener">Buka peta lokasi</a> <a class="button" href="pernikahan-arga-laras.ics" download>Simpan kalender</a>',
  ()=>photo('kisah1','Foto pertama bertemu')+'<p>Kami berkenalan di sebuah pameran seni. Dari percakapan pertama itu, kami menemukan banyak hal kecil yang ingin kami jalani bersama.</p>',
  ()=>'<div class="pair">'+Array.from({length:10},(_,i)=>photo('galeri'+(i+1),'Foto galeri '+(i+1))).join('')+'</div>',
  ()=>'<p>Doa restu Anda adalah hadiah terindah. Informasi rekening dan alamat kado dapat ditambahkan untuk acara sebenarnya.</p>',
  ()=>'<form id="rsvp"><label class="field">Nama<input name="nama" required maxlength="80"></label><label class="field">Kehadiran<select name="hadir"><option>Hadir</option><option>Tidak bisa hadir</option><option>Belum pasti</option></select></label><label class="field">Ucapan<textarea name="ucapan" maxlength="400"></textarea></label><button class="primary">Simpan ucapan</button><p class="help" role="status">Data demo disimpan di browser ini.</p></form><ul id="wishes"></ul>',
  ()=>photo('posterVideo','Sampul video pra-wedding')+'<p>Tempat untuk cuplikan pra-wedding.</p>',
  ()=>photo('penutup','Foto penutup')+'<p>Terima kasih atas kehadiran dan doa restu Anda.</p><p class="badge">Arga &amp; Laras</p><a href="./">Kembali ke Ruang Janji</a>'
];
function visit(i) {
  const isNew=!found.has(i);
  found.add(i);
  document.querySelector('#progress').textContent='♥ '+found.size+'/8 ditemukan';
  dock.children[i].dataset.visited='';
  show(places[i].name,sections[i]());
  if(isNew&&effects) note(659,.18);
  if(i===5) setupRsvp();
}
places.forEach((p,i)=>{
  const b=document.createElement('button');b.textContent=p.icon+' '+p.name;b.onclick=()=>visit(i);dock.append(b);
});
document.querySelector('#map').onclick=()=>{
  show('Peta taman','<div class="map-list"></div>');
  const list=content.querySelector('.map-list');
  places.forEach((p,i)=>{
    const b=document.createElement('button');b.textContent=(found.has(i)?'✓ ':p.icon+' ')+p.name;
    b.onclick=()=>{player.x=p.x;player.y=p.y+25;visit(i)};list.append(b);
  });
};
document.querySelector('#qr').onclick=()=>show('QR undangan','<img src="quest-qr.svg" width="140" height="140" alt="Kode QR demo Petualangan"><p class="help">QR membuka halaman demo privat.</p>');
canvas.addEventListener('click',e=>{
  if(!started||panel.open)return;
  const r=canvas.getBoundingClientRect(),x=(e.clientX-r.left)*canvas.width/r.width+camera.x,y=(e.clientY-r.top)*canvas.height/r.height+camera.y;
  const i=places.findIndex(p=>Math.abs(p.x-x)<26&&y>p.y-41&&y<p.y+20);
  if(i>=0)visit(i);
});
const movement=['arrowleft','arrowright','arrowup','arrowdown','w','a','s','d'];
addEventListener('keydown',e=>{const key=e.key.toLowerCase();if(started&&!panel.open&&movement.includes(key)){e.preventDefault();keys.add(key)}});
addEventListener('keyup',e=>keys.delete(e.key.toLowerCase()));
addEventListener('blur',()=>{keys.clear();resetStick()});
function resetStick(){pointer=null;stickVector=[0,0];stick.querySelector('i').style.transform=''}
function steer(e) {
  const r=stick.getBoundingClientRect(),dx=e.clientX-r.left-r.width/2,dy=e.clientY-r.top-r.height/2;
  const d=Math.max(29,Math.hypot(dx,dy));
  stickVector=[dx/d,dy/d];
  stick.querySelector('i').style.transform='translate('+29*dx/d+'px,'+29*dy/d+'px)';
}
stick.onpointerdown=e=>{if(pointer!==null)return;pointer=e.pointerId;stick.setPointerCapture(pointer);steer(e)};
stick.onpointermove=e=>{if(pointer===e.pointerId)steer(e)};
stick.onpointerup=stick.onpointercancel=stick.onlostpointercapture=e=>{if(pointer===e.pointerId)resetStick()};

function setupRsvp() {
  const form=content.querySelector('#rsvp');
  form.elements.nama.value=guest==='Tamu Undangan'?'':guest;
  const key='ruang-janji-motion-rsvp';
  const read=()=>JSON.parse(localStorage.getItem(key)||'[]');
  function render(rows) {
    const list=content.querySelector('#wishes');list.replaceChildren();
    rows.filter(row=>row.ucapan).slice(-5).reverse().forEach(row=>{
      const li=document.createElement('li');li.textContent=row.nama+' · '+row.ucapan;list.append(li);
    });
  }
  try{render(read())}catch{}
  form.onsubmit=e=>{
    e.preventDefault();
    const row=Object.fromEntries(new FormData(form));
    row.nama=row.nama.trim();row.ucapan=row.ucapan.trim();
    const status=form.querySelector('[role=status]');
    if(!row.nama){status.textContent='Isi nama terlebih dahulu.';return}
    try{
      const rows=[...read().filter(item=>item.nama.toLowerCase()!==row.nama.toLowerCase()),row].slice(-100);
      localStorage.setItem(key,JSON.stringify(rows));render(rows);status.textContent='Ucapan tersimpan di browser ini.';
    }catch{status.textContent='Penyimpanan browser tidak tersedia.'}
  };
}
function note(frequency,length=.48) {
  try {
    audio ??= new AudioContext();
    if(audio.state==='suspended')audio.resume().catch(()=>{});
    const o=audio.createOscillator(),g=audio.createGain(),t=audio.currentTime;
    o.frequency.value=frequency;g.gain.setValueAtTime(.04,t);g.gain.exponentialRampToValueAtTime(.001,t+length);
    o.connect(g).connect(audio.destination);o.start();o.stop(t+length);
  }catch{}
}
music.onclick=()=>{
  if(musicLoop){clearInterval(musicLoop);musicLoop=undefined;music.setAttribute('aria-pressed','false');return}
  const notes=[293.66,349.23,440,523.25,440,392,349.23,293.66];
  let i=0;note(notes[i++]);musicLoop=setInterval(()=>note(notes[i++%notes.length]),570);
  music.setAttribute('aria-pressed','true');
};
document.querySelector('#effects').onclick=e=>{effects=!effects;e.currentTarget.setAttribute('aria-pressed',String(effects))};
