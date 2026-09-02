import fs from 'node:fs';
import path from 'node:path';

const ROOT=process.cwd();
const SCRIPT='assets/js/analytics.js?v=20260902';

function walk(dir){
  const out=[];
  for(const ent of fs.readdirSync(dir,{withFileTypes:true})){
    if(ent.name==='.git'||ent.name==='node_modules') continue;
    const p=path.join(dir,ent.name);
    if(ent.isDirectory()) out.push(...walk(p));
    else if(ent.isFile()&&ent.name.endsWith('.html')) out.push(p);
  }
  return out;
}

let changed=0;
for(const file of walk(ROOT)){
  let html=fs.readFileSync(file,'utf8');
  if(html.includes('assets/js/analytics.js')) continue;
  const rel=path.relative(path.dirname(file),path.join(ROOT,SCRIPT.split('?')[0])).replaceAll('\\','/');
  const src=(rel.startsWith('.')?rel:`./${rel}`)+`?${SCRIPT.split('?')[1]}`;
  const tag=`<script src="${src}"></script>`;
  if(/<\/body>/i.test(html)) html=html.replace(/<\/body>/i,`${tag}</body>`);
  else html+=tag;
  fs.writeFileSync(file,html);
  changed++;
}
console.log(`Installed analytics events script on ${changed} HTML page(s).`);
