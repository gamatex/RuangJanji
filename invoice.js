const invoiceId=new URLSearchParams(location.search).get('id');
let draft;
try{
  if(invoiceId)draft=JSON.parse(localStorage.getItem('ruang-janji-invoice:'+invoiceId)||'null');
}catch{}
function valid(value){
  return value&&value.id===invoiceId&&value.customer&&value.selection&&Object.hasOwn(themes,value.selection.theme)&&Number.isFinite(value.selection.total)&&value.createdAt&&!Number.isNaN(Date.parse(value.createdAt));
}
function fill(id,value){document.getElementById(id).textContent=value}
if(!valid(draft)){
  document.querySelector('#empty').hidden=false;
}else{
  const state=draft.selection;
  const format=new Intl.DateTimeFormat('id-ID',{timeZone:'Asia/Jakarta',day:'2-digit',month:'long',year:'numeric',hour:'2-digit',minute:'2-digit',hour12:false});
  const issued=new Date(draft.createdAt);
  const due=new Date(issued.getTime()+3*86400000);
  fill('number','Invoice #'+draft.id);
  fill('issued',format.format(issued)+' WIB');fill('due',format.format(due)+' WIB');
  fill('customer',draft.customer.nama);fill('email',draft.customer.email);
  fill('product',themes[state.theme].name);fill('base',money(state.base));fill('subtotal',money(state.base));
  document.querySelector('#discount-row').hidden=!state.discount;
  fill('discount','− '+money(state.discount));fill('discount-label','Diskon '+(state.coupon||''));
  fill('addon-total','+ '+money(state.total-state.base+state.discount));fill('total',money(state.total));
  const rows=[
    ['Nama pasangan',draft.customer.pasangan],
    ['Tanggal acara',draft.customer.tanggal],
    ['Masa aktif',state.extras.some(extra=>extra.key==='lifetime')?'Selamanya':'1 tahun'],
    ['Kuota undangan','1 acara'],
    ['Pengerjaan',state.service.name],
    ['Domain',state.domain.name],
    ['Tambahan',state.extras.map(extra=>extra.name).join(', ')||'—'],
    ['Harga perpanjang contoh',money(79000)+' / tahun']
  ];
  const details=document.querySelector('#details');
  rows.forEach(([label,value])=>{
    const row=document.createElement('div'),dt=document.createElement('dt'),dd=document.createElement('dd');
    dt.textContent=label;dd.textContent=value;row.append(dt,dd);details.append(row);
  });
  fill('payment',draft.customer.pembayaran==='qris'?'QRIS':'Transfer bank');
  const message=[
    'Halo Admin Ruang Janji,',
    'Saya ingin mengonfirmasi pembayaran pesanan undangan.',
    '',
    'Invoice: '+draft.id,
    'Nama: '+draft.customer.nama,
    'Tema: '+themes[state.theme].name,
    'Total: '+money(state.total),
    '',
    'Saya akan melampirkan bukti pembayaran untuk diperiksa.',
    'Terima kasih.'
  ].join('\n');
  document.querySelector('#whatsapp').href='https://wa.me/62817610343?text='+encodeURIComponent(message);
  document.querySelector('#edit').href='checkout.html?edit='+encodeURIComponent(draft.id);
  document.querySelector('#invoice').hidden=false;
}
document.querySelector('#print').onclick=()=>window.print();
