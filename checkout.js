const form = document.querySelector('#order');
const theme = document.querySelector('#theme');
const coupon = document.querySelector('#coupon');
const params = new URLSearchParams(location.search);
theme.replaceChildren();
const categoryNames={art:'Art',birthday:'Birthday',deluxe:'Deluxe',minimotion:'MiniMotion',minisite:'Minisite',motion:'Motion',syari:"Syar’i",interaktif:'Interaktif'};
Object.entries(categoryNames).forEach(([key,name])=>{
  const group=document.createElement('optgroup');group.label=name;
  Object.entries(themes).filter(([slug,value])=>value.category===key&&slug!=='minang').forEach(([slug,value])=>{const option=document.createElement('option');option.value=slug;option.textContent=value.name;group.append(option)});
  theme.append(group);
});
const initialTheme = params.get('tema')==='minang'?'art-04':params.get('tema');
if(Object.hasOwn(themes,initialTheme)){
 if(initialTheme==='jawa'){const option=document.createElement('option');option.value='jawa';option.textContent='Motion Jawa';theme.append(option)}
 theme.value=initialTheme;
}
let discountActive=false, draftId=null, createdAt=null;
extras.forEach(extra=>{
  const label=document.createElement('label');label.className='choice';
  const input=document.createElement('input');input.type='checkbox';input.name='extra';input.value=extra.key;
  const name=document.createElement('span');name.textContent=extra.name;
  const price=document.createElement('strong');price.textContent=money(extra.price);
  label.append(input,name,price);document.querySelector('#addons').append(label);
});
function selection(){
  const data=new FormData(form);
  const service=services[data.get('pengerjaan')];
  const domain=domains[data.get('domain')];
  const selectedExtras=extras.filter(extra=>data.getAll('extra').includes(extra.key));
  const packageInfo=themes[theme.value];
  const base=packageInfo.base;
  const isCatalogCoupon=coupon.value.trim().toUpperCase()===packageInfo.coupon;
  const discount=discountActive?(isCatalogCoupon?base-packageInfo.sale:Math.round(base*.5)):0;
  const total=base-discount+service.price+domain.price+selectedExtras.reduce((sum,extra)=>sum+extra.price,0);
  return {theme:theme.value,service,domain,extras:selectedExtras,base,discount,total,coupon:discountActive?coupon.value.trim().toUpperCase():null};
}
function render(){
  const state=selection();
  document.querySelector('#summary-theme').textContent=themes[state.theme].name;
  document.querySelector('#preview').href=themes[state.theme].url;
  document.querySelector('#package-price').textContent=money(state.base);
  const lines=document.querySelector('#lines');lines.replaceChildren();
  const items=[['Paket undangan',money(state.base)]];
  if(state.service.price)items.push([state.service.name,money(state.service.price)]);
  if(state.domain.price)items.push([state.domain.name,money(state.domain.price)]);
  state.extras.forEach(extra=>items.push([extra.name,money(extra.price)]));
  if(state.discount)items.push(['Kupon '+state.coupon,'− '+money(state.discount)]);
  items.forEach(([name,value])=>{
    const line=document.createElement('div');const label=document.createElement('span');const number=document.createElement('strong');
    label.textContent=name;number.textContent=value;line.append(label,number);lines.append(line);
  });
  document.querySelector('#total').textContent=money(state.total);
}
function applyCoupon(){
  const code=coupon.value.trim().toUpperCase();
  coupon.value=code;discountActive=Boolean(code)&&(code===themes[theme.value].coupon||code==='SY50');
  document.querySelector('#coupon-status').textContent=discountActive?coupon.value+' diterapkan pada harga paket.':code?'Kode contoh belum tersedia. Gunakan SY50.':'Kupon dihapus.';
  render();
}
document.querySelector('#apply').onclick=applyCoupon;
coupon.addEventListener('input',()=>{
  if(discountActive){discountActive=false;document.querySelector('#coupon-status').textContent='Terapkan kembali kode kupon.';render()}
});
coupon.addEventListener('keydown',event=>{if(event.key==='Enter'){event.preventDefault();applyCoupon()}});
form.addEventListener('change',render);
theme.addEventListener('change',()=>{coupon.value=themes[theme.value].coupon;applyCoupon()});
if(params.has('coupon')){coupon.value=params.get('coupon').slice(0,24);applyCoupon()}
else{coupon.value=themes[theme.value].coupon;applyCoupon()}
const dateInput=document.querySelector('#date');
dateInput.min=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Jakarta',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
form.onsubmit=event=>{
  event.preventDefault();
  const data=new FormData(form);
  const customer=Object.fromEntries(['nama','email','whatsapp','pasangan','tanggal','catatan','pembayaran'].map(key=>[key,String(data.get(key)||'').trim()]));
  if(!customer.nama||!customer.pasangan){document.querySelector('#submit-status').textContent='Lengkapi nama pemesan dan pasangan.';return}
  draftId??='INV/'+dateInput.min.replaceAll('-','')+'/'+crypto.randomUUID().split('-')[0].toUpperCase();
  createdAt??=new Date().toISOString();
  const draft={id:draftId,status:'draft',createdAt,selection:selection(),customer};
  try{
    localStorage.setItem('ruang-janji-invoice:'+draftId,JSON.stringify(draft));
    location.href='invoice.html?id='+encodeURIComponent(draftId);
  }catch{
    document.querySelector('#submit-status').textContent='Penyimpanan browser tidak tersedia. Pesanan belum disimpan.';
  }
};
const editId=params.get('edit');
if(editId){
  try{
    const saved=JSON.parse(localStorage.getItem('ruang-janji-invoice:'+editId)||'null');
    if(saved&&saved.id===editId&&saved.status==='draft'){
      draftId=saved.id;createdAt=saved.createdAt;
      const restoredTheme=Object.hasOwn(themes,saved.selection.theme)?saved.selection.theme:'art-04';
      if(![...theme.options].some(option=>option.value===restoredTheme)){
        const option=document.createElement('option');option.value=restoredTheme;option.textContent=themes[restoredTheme].name;theme.append(option);
      }
      theme.value=restoredTheme;
      form.elements.pengerjaan.value=Object.entries(services).find(([,v])=>v.name===saved.selection.service.name)?.[0]||'mandiri';
      form.elements.domain.value=Object.entries(domains).find(([,v])=>v.name===saved.selection.domain.name)?.[0]||'bawaan';
      form.querySelectorAll('[name=extra]').forEach(input=>input.checked=saved.selection.extras.some(extra=>extra.key===input.value));
      Object.entries(saved.customer).forEach(([key,value])=>{if(form.elements.namedItem(key))form.elements.namedItem(key).value=value});
      coupon.value=saved.selection.coupon||'';discountActive=Boolean(coupon.value)&&(coupon.value===themes[theme.value].coupon||coupon.value==='SY50');
      document.querySelector('#coupon-status').textContent=discountActive?coupon.value+' diterapkan pada harga paket.':'Kupon belum diterapkan.';
      render();
    }
  }catch{}
}
