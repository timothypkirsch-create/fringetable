import fs from 'node:fs/promises';
import path from 'node:path';

const root='recipes';
const files=[];
async function walk(dir){for(const e of await fs.readdir(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory())await walk(p);else if(e.isFile()&&e.name.endsWith('.html'))files.push(p)}}
await walk(root);
let updated=0, already=0;
for(const file of files){
  let html=await fs.readFile(file,'utf8');
  if(!html.includes('class="recipe-page"')) continue;
  if(/assets\/js\/pronunciation\.js/.test(html)){already++;continue;}
  const rel=file.split(path.sep).length===2?'../assets/js/pronunciation.js':'../../assets/js/pronunciation.js';
  const tag=`<script src="${rel}?v=20260902b"></script>`;
  if(html.includes('</body>')) html=html.replace('</body>',`${tag}</body>`);
  else html+=tag;
  await fs.writeFile(file,html);
  updated++;
}
console.log(JSON.stringify({recipeHtml:files.length,updated,already},null,2));
