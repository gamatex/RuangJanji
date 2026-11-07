const themes = Object.fromEntries(invitationCatalog.map(theme => [theme.slug, {
  name:theme.name,url:theme.demo,base:theme.original,sale:theme.price,coupon:theme.coupon,category:theme.category
}]));
Object.assign(themes,{
  jawa:{name:'Motion Jawa',url:'motion-jawa.html',base:158000,sale:79000,coupon:'SY50',category:'legacy'},
  minang:{name:'Art – 04',url:'templates/art-04.html',base:298000,sale:149000,coupon:'ART50',category:'art'},
  petualangan:{name:'Petualangan Interaktif',url:'petualangan.html',base:158000,sale:79000,coupon:'SY50',category:'interaktif'}
});
const extras = [
  {key:'qr',name:'QR check-in',price:150000},
  {key:'lifetime',name:'Masa aktif selamanya',price:100000},
  {key:'blast',name:'WhatsApp Blast',price:150000}
];
const services = {mandiri:{name:'Isi sendiri',price:0},reguler:{name:'Terima beres',price:30000},express:{name:'Terima beres express',price:50000}};
const domains = {bawaan:{name:'Tautan bawaan',price:0},myid:{name:'Domain .my.id',price:100000},com:{name:'Domain .com',price:250000}};
const money = value => new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:0}).format(value);
