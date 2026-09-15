import fs from 'node:fs';
import {execFileSync} from 'node:child_process';

const files=process.argv.slice(2);
let restored=0;
for(const file of files){
  let current=fs.readFileSync(file,'utf8');
  if(current.includes('ingredient-sourcing')) continue;
  const original=execFileSync('git',['show',`HEAD:${file}`],{encoding:'utf8'});
  const section=original.match(/<section class="recipe-section ingredient-sourcing">[\s\S]*?<\/section>/)?.[0];
  if(!section) continue;
  current=current.replace(/(?=<section class="recipe-section source-note">)/,section);
  fs.writeFileSync(file,current);
  restored++;
}
console.log(`Restored ${restored} ingredient-sourcing sections.`);
