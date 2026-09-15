import fs from 'node:fs';
import {execFileSync} from 'node:child_process';

for(const file of process.argv.slice(2)){
  let current=fs.readFileSync(file,'utf8');
  if(/Ingredients &(?:amp;)? detailed method/i.test(current))continue;
  const original=execFileSync('git',['show',`HEAD:${file}`],{encoding:'utf8'});
  const section=original.match(/<section class="recipe-section"><span class="eyebrow">Cook it<\/span>[\s\S]*?<\/section>/i)?.[0];
  if(!section)throw new Error(`${file}: historical cooking section not found`);
  current=current.replace(/(?=<section class="recipe-section (?:ingredient-sourcing|source-note)")/,section);
  fs.writeFileSync(file,current);
  console.log(`Restored ${file}`);
}
