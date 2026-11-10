import './map-template-media.mjs';
import {cpSync,existsSync,mkdirSync,readdirSync,statSync,copyFileSync} from 'node:fs';
import {join,dirname} from 'node:path';
const output='dist';mkdirSync(output,{recursive:true});
const entries = [
  'index.html',
  'privacy.html',
  'brand.svg',
  'catalog.js',
  'catalog.css',
  'catalog-data.js',
  'brand-palette.css',
  'theme-preview.html',
  'theme-preview.js',
  'template-runtime.js',
  'template-runtime.css',
  'photo-empty.svg',
  'checkout.css',
  'checkout.html',
  'checkout.js',
  'invoice.html',
  'invoice.js',
  'invoice.css',
  'minang.html',
  'minang.css',
  'minang.js',
  'minang-assets',
  'petualangan.html',
  'petualangan.js',
  'motion-jawa.html',
  'motion-jawa.css',
  'motion-jawa.js',
  'motion-batik.svg',
  'motion-flower.svg',
  'motion-gunungan.svg',
  'motion-closing.jpg',
  'motion-cover.jpg',
  'pendopo.svg',
  'taman.svg',
  'catalog-assets',
  'motion.mp4',
  'reports',
  'invitation.html',
  'invitation.js',
  'apps',
  'packages',
  'templates',
  'demo',
  'favicon.ico',
  'robots.txt'
];
let copied=0,skipped=0;
function copy(src,dst){if(!existsSync(src))return;const stat=statSync(src);if(stat.isDirectory()){for(const name of readdirSync(src))copy(join(src,name),join(dst,name));return;}if(stat.size>25*1024*1024){console.warn('SKIPPED oversized asset:',src,stat.size);skipped++;return;}mkdirSync(dirname(dst),{recursive:true});copyFileSync(src,dst);copied++;}
for(const entry of entries)copy(entry,join(output,entry));
if(!existsSync(join(output,'index.html')))throw new Error('Website index.html missing');
console.log('Public build complete:',copied,'files copied,',skipped,'oversized assets skipped');
