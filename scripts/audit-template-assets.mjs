import {existsSync,readdirSync,readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {join,dirname,resolve} from 'node:path';
const root=process.cwd(),templateDir=join(root,'templates');
const names=readdirSync(templateDir).filter(x=>/^(art|birthday|deluxe|minisite|syari)-\\d+\\.html$/.test(x)).sort();
const report=[];
for(const name of names){
 const source=join(templateDir,name),html=readFileSync(source,'utf8');
 const links=[...html.matchAll(/(?:src|href)=["']([^"']+)["']/g)].map(m=>m[1]);
 const css=links.filter(x=>x.endsWith('.css'));
 const missing=[];
 for(const link of links){
  if(/^(?:https?:|data:|#|mailto:|tel:|javascript:)/i.test(link)||link.includes('?'))continue;
  const file=resolve(dirname(source),decodeURIComponent(link));
  if(!existsSync(file))missing.push(link);
 }
 for(const stylesheet of css){
  const cssPath=resolve(dirname(source),stylesheet);
  if(!existsSync(cssPath))continue;
  const text=readFileSync(cssPath,'utf8');
  for(const m of text.matchAll(/url\\(\\s*['"]?([^)'"\\s]+)['"]?\\s*\\)/g)){
   const url=m[1];if(/^(?:https?:|data:|#|blob:)/i.test(url))continue;
   const file=resolve(dirname(cssPath),decodeURIComponent(url.split('?')[0]));
   if(!existsSync(file))missing.push(stylesheet+' -> '+url);
  }
 }
 report.push({template:name.replace('.html',''),imageTags:(html.match(/<img\\b/g)||[]).length,photoSlots:(html.match(/data-photo-slot=/g)||[]).length,entrances:(html.match(/data-enter/g)||[]).length,videoTags:(html.match(/<video\\b/g)||[]).length,motionOrnaments:(html.match(/data-rj-motion=/g)||[]).length,missing:[...new Set(missing)]});
}
mkdirSync(join(root,'reports'),{recursive:true});
writeFileSync(join(root,'reports/template-assets.json'),JSON.stringify(report,null,2)+'\\n');
console.table(report.map(({template,imageTags,photoSlots,entrances,motionOrnaments,missing})=>({template,imageTags,photoSlots,entrances,motionOrnaments,missing:missing.length})));
console.log('Report: reports/template-assets.json');
if(report.some(x=>x.missing.length))process.exitCode=1;
