import {readdirSync,readFileSync,writeFileSync,existsSync,mkdirSync} from 'node:fs';
import {join,resolve,dirname,extname} from 'node:path';
const root=new URL("..", import.meta.url).pathname.replace(/\/$/, ""),dir=join(root,'templates');
const templates=readdirSync(dir).filter(n=>/^(art|birthday|deluxe|minisite|syari)-\d+\.html$/.test(n)).sort();
const mediaFiles=readdirSync(join(root,'catalog-assets'));
const records={};
for(const file of templates){
 const slug=file.slice(0,-5),html=readFileSync(join(dir,file),'utf8');
 const paths=[...html.matchAll(/(?:src|href)=["']([^"'?#]+)(?:[?#][^"']*)?["']/g)].map(m=>m[1]);
 const stylesheets=paths.filter(p=>p.endsWith('.css')&&existsSync(resolve(dir,p)));
 const cssUrls=[];
 for(const style of stylesheets){
   const content=readFileSync(resolve(dir,style),'utf8');
   for(const match of content.matchAll(/url\(\s*['"]?([^)'"]+)['"]?\s*\)/g)){
     const path=match[1].trim();
     if(path&&!/^(data:|https?:|#|blob:)/i.test(path))cssUrls.push({css:style,url:path});
   }
 }
 const cssMissing=cssUrls.filter(x=>!existsSync(resolve(dirname(resolve(dir,x.css)),decodeURIComponent(x.url.split(/[?#]/)[0]))));
 const imagePaths=paths.filter(p=>/\.(png|jpe?g|webp|svg|gif)$/i.test(p));
 const audioPaths=paths.filter(p=>/\.(mp3|ogg|wav|m4a)$/i.test(p));
 const videoPaths=paths.filter(p=>/\.(mp4|webm|mov)$/i.test(p));
 const missingHtml=paths.filter(p=>p.startsWith('../')&&!existsSync(resolve(dir,p)));
 const animations=[...new Set([...html.matchAll(/class=["']([^"']+)["']/g)].flatMap(m=>m[1].split(/\s+/)).filter(c=>/^(?:fadeIn|zoomIn|bounceIn|slideIn|rotateIn|flipIn|backIn|lightSpeed|pulse|swing|tada|wobble)/.test(c)))];
 records[slug]={category:slug.split('-')[0],stylesheet:stylesheets[0]||null,images:[...new Set(imagePaths)],audio:[...new Set(audioPaths)],videos:[...new Set(videoPaths)],animations,photoSlots:(html.match(/data-photo-slot=/g)||[]).length,entranceElements:(html.match(/data-enter/g)||[]).length,missingHtml:[...new Set(missingHtml)],missingCss:[...new Set(cssMissing.map(x=>x.css+' -> '+x.url))]};
}
const videoLibrary=['motion.mp4'].filter(f=>existsSync(join(root,f)));
const summary={generatedBy:'scripts/map-template-media.mjs',templateCount:templates.length,videoLibrary,videoAssignment:'Only explicitly referenced video files are assigned; root motion.mp4 is unassigned.',templates:records};
mkdirSync(join(root,'reports'),{recursive:true});
writeFileSync(join(root,'reports/template-media-map.json'),JSON.stringify(summary,null,2)+'\n');
const missing=Object.entries(records).filter(([_,v])=>v.missingHtml.length||v.missingCss.length);
console.log('Mapped',templates.length,'templates. CSS/HTML missing references:',missing.length,'templates. Unassigned videos:',videoLibrary.join(', ')||'none');
if(templates.length<27)throw Error('Expected exactly 27 templates');
