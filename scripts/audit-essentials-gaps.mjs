import fs from 'node:fs';
import path from 'node:path';

const recipeDir='recipes';
const files=fs.readdirSync(recipeDir).filter(f=>f.endsWith('.html'));
const candidates=[
 ['berbere',/\bberbere\b/gi],
 ['shito',/\bshito\b/gi],
 ['lunu miris',/\blunu\s+miris\b/gi],
 ['sofrito',/\bsofrito\b/gi],
 ['tkemali',/\btkemali\b/gi],
 ['nuoc cham',/\bnuoc\s+cham\b|nước\s+chấm/gi],
 ['chermoula',/\bchermoula\b/gi],
 ['garlic oil',/\bgarlic\s+oil\b/gi],
 ['chile oil',/\bchili\s+oil\b|\bchile\s+oil\b/gi],
 ['tomato stew',/\btomato\s+stew\b/gi],
 ['sambol',/\bsambol\b/gi],
 ['achar',/\bachar\b|\bachaar\b/gi],
 ['green seasoning',/\bgreen\s+seasoning\b/gi],
 ['browning sauce',/\bbrowning\s+sauce\b/gi],
 ['peanut sauce',/\bpeanut\s+sauce\b/gi],
 ['yogurt sauce',/\byogurt\s+sauce\b|\byoghurt\s+sauce\b/gi],
 ['flatbread',/\bflatbread\b/gi],
 ['stock',/\bstock\b/gi],
 ['broth',/\bbroth\b/gi],
 ['chutney',/\bchutney\b/gi],
 ['salsa',/\bsalsa\b/gi]
];

const rows=[];
for(const [name,re] of candidates){
 const hits=[]; let total=0;
 for(const file of files){
  const text=fs.readFileSync(path.join(recipeDir,file),'utf8');
  const matches=text.match(re);
  if(matches?.length){ total+=matches.length; hits.push(file.replace(/\.html$/,'')); }
 }
 rows.push({name,total,pages:hits.length,slugs:hits});
}
rows.sort((a,b)=>b.pages-a.pages||b.total-a.total);
console.log(JSON.stringify({recipeFiles:files.length,rows},null,2));
