import fs from 'node:fs/promises';
import path from 'node:path';
const dir='recipes';
const files=(await fs.readdir(dir)).filter(f=>f.endsWith('.html'));
let changed=0;
for(const file of files){
 const p=path.join(dir,file);
 let html=await fs.readFile(p,'utf8');
 if(!html.includes('../assets/js/pronunciation.js')) continue;
 const next=html.replace(/\.\.\/assets\/js\/pronunciation\.js\?v=[^"']+/g,'../assets/js/pronunciation.js?v=20260903a');
 if(next!==html){await fs.writeFile(p,next);changed++;}
}
console.log(JSON.stringify({changed},null,2));
