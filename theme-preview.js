const slug=new URLSearchParams(location.search).get('tema');
const theme=invitationCatalog.find(row=>row.slug===slug);
if(theme){
  document.title=theme.name+' · Ruang Janji';
  document.querySelector('#title').textContent=theme.name;
  document.querySelector('#image').src=theme.thumbnail;
  document.querySelector('#image').alt='Referensi '+theme.name;
  document.querySelector('#state').textContent=theme.status==='assets'?'Aset pendukung tersedia. Halaman referensi untuk tema ini belum tersedia.':'Pratinjau tersedia. Aset demo lengkap belum tersedia dalam paket referensi.';
  document.querySelector('#order').href='checkout.html?tema='+encodeURIComponent(slug);
}else{
  document.querySelector('#state').textContent='Tema belum ditemukan. Pilih melalui koleksi tema.';
  document.querySelector('#image').hidden=true;
}
