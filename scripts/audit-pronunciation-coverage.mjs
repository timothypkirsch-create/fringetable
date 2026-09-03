import fs from 'node:fs/promises';
import path from 'node:path';

const norm=s=>String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,' ').trim();
const js=await fs.readFile('assets/js/pronunciation.js','utf8');
const terms=[...js.matchAll(/\['([^']+)','([^']+)'/g)].map(m=>({term:m[1],pron:m[2]}));
const files=(await fs.readdir('recipes')).filter(f=>f.endsWith('.html')&&f!=='index.html');
const rows=[];
for(const file of files){
  const html=await fs.readFile(path.join('recipes',file),'utf8');
  const m=html.match(/<h1>(.*?)<\/h1>/i);
  if(!m) continue;
  const title=m[1].replace(/<[^>]+>/g,'').replace(/&amp;/g,'&').trim();
  const n=norm(title);
  const hit=[...terms].sort((a,b)=>norm(b.term).length-norm(a.term).length).find(e=>n.includes(norm(e.term)));
  rows.push({file,title,covered:!!hit,term:hit?.term||'',pron:hit?.pron||''});
}
console.log(JSON.stringify({total:rows.length,covered:rows.filter(r=>r.covered).length,missing:rows.filter(r=>!r.covered)},null,2));
