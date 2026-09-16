import fs from 'node:fs';
import path from 'node:path';

const recipeDir='recipes';
const files=fs.readdirSync(recipeDir).filter(file=>file.endsWith('.html')&&file!=='index.html').sort();

const overrides={
  'afghan-ashak':['Advanced','Requires filling and shaping dumplings, preparing separate sauces, and coordinating the final assembly.'],
  'azerbaijani-badambura':['Advanced','Requires laminated dough, careful shaping, filling, and controlled baking.'],
  'bhutanese-hoentay':['Advanced','Requires making, filling, sealing, and steaming dumplings.'],
  'goan-bebinca':['Advanced','Each thin layer must be cooked separately before the next layer is added.'],
  'georgian-khachapuri':['Advanced','Requires yeast-dough handling, shaping, filling, and careful final baking.'],
  'imeretian-khachapuri':['Advanced','Requires yeast-dough handling, shaping, filling, and careful final baking.'],
  'georgian-khinkali':['Advanced','Requires pleating filled dumplings and cooking them without breaking the wrappers.'],
  'newari-yomari':['Advanced','Requires making a rice-flour dough, shaping filled dumplings, and steaming them carefully.'],
  'nepali-momos':['Advanced','Requires preparing filling, rolling wrappers, pleating dumplings, and steaming in batches.'],
  'nepali-sel-roti':['Advanced','Requires judging fermented rice-batter consistency, shaping rings by hand, and frying at steady heat.'],
  'somali-sambuus-beef-sambusa':['Advanced','Requires preparing filling, folding and sealing pastries, and frying in controlled batches.'],
  'tibetan-shapale':['Advanced','Requires making dough, filling and sealing the pastries, then frying them evenly.'],
  'tibetan-shapale-sha-balep':['Advanced','Requires making dough, filling and sealing the pastries, then frying them evenly.'],
  'trinidad-doubles':['Advanced','Requires yeasted bara, chickpea curry, condiments, and coordinated frying and assembly.'],
  'uzbek-manti':['Advanced','Requires rolling, filling, shaping, and steaming dumplings in batches.'],
  'sri-lankan-egg-hoppers':['Advanced','Requires fermented batter, a specialized pan technique, and precise timing to set the egg without scorching the crisp edge.'],
  'cambodian-fish-amok':['Moderate','Requires building the aromatic curry paste, balancing the custard-like mixture, and steaming it gently.'],
  'malaysian-nasi-lemak':['Moderate','Several components—coconut rice, sambal, garnishes, and accompaniments—must be prepared and assembled together.']
};

const strip=html=>html.replace(/<script[\s\S]*?<\/script>/gi,' ').replace(/<style[\s\S]*?<\/style>/gi,' ').replace(/<[^>]+>/g,' ').replace(/&amp;/g,'&').replace(/&[a-z#0-9]+;/gi,' ').replace(/\s+/g,' ').trim();
const minutesFrom=value=>{
  const text=String(value||'').toLowerCase();
  const hours=[...text.matchAll(/(\d+(?:\.\d+)?)\s*(?:hrs?|hours?)/g)].reduce((n,m)=>n+Number(m[1])*60,0);
  const mins=[...text.matchAll(/(\d+)\s*(?:min|minutes?)/g)].reduce((n,m)=>n+Number(m[1]),0);
  return hours+mins;
};

function classify(slug,html){
  if(overrides[slug])return {level:overrides[slug][0],reason:overrides[slug][1],source:'editorial override'};
  const meta=html.match(/<p class="recipe-meta">([\s\S]*?)<\/p>/i)?.[1]||'';
  const time=minutesFrom(strip(meta));
  const method=html.match(/<ol class="method-list[^>]*>([\s\S]*?)<\/ol>/i)?.[1]||'';
  const steps=(method.match(/<li\b/gi)||[]).length;
  const text=strip(method).toLowerCase();
  const signals=[];
  const checks=[
    ['fermentation or proofing',/ferment|proof|rise until|starter/],
    ['dough shaping',/knead|roll (?:the )?dough|shape (?:the )?dough|pleat|seal (?:the )?(?:dumpling|wrapper|edge)/],
    ['temperature-sensitive cooking',/temper|do not curdle|without curdling|candy thermometer|temperature reaches|deep-fry|deep fry/],
    ['multiple coordinated components',/meanwhile|separately|in batches|assemble|component/]
  ];
  for(const [label,rx] of checks)if(rx.test(text))signals.push(label);
  let score=0;
  if(steps>=7)score++;
  if(steps>=10)score++;
  if(time>=75)score++;
  if(time>=150)score++;
  score+=Math.min(2,signals.length);
  let level=score>=5?'Advanced':score>=2?'Moderate':'Easy';
  let reason;
  if(level==='Easy')reason=steps<=5?'A short, forgiving method with only a few main steps.':'Uses straightforward home-kitchen techniques without tightly coordinated components.';
  else if(level==='Moderate'){
    if(signals.length)reason=`Involves ${signals[0]}${steps>=7?` across ${steps} main steps`:''}.`;
    else if(time>=75)reason=`A longer cook with ${steps||'several'} main steps, but no specialized equipment is required.`;
    else reason=`Requires attention across ${steps||'several'} main steps, using accessible home-kitchen techniques.`;
  }else{
    const detail=signals.slice(0,2).join(' and ')||'several dependent techniques';
    reason=`Requires ${detail}${steps?` across ${steps} main steps`:''}.`;
  }
  return {level,reason,source:'rules v1'};
}

const registry={};
for(const file of files){
  const slug=path.basename(file,'.html');
  registry[slug]=classify(slug,fs.readFileSync(path.join(recipeDir,file),'utf8'));
}

fs.mkdirSync('data',{recursive:true});
fs.writeFileSync('data/recipe-difficulty.json',`${JSON.stringify(registry,null,2)}\n`);
fs.writeFileSync('assets/js/recipe-difficulty.js',`window.FringeTableDifficulty=${JSON.stringify(registry)};\n`);

const counts=Object.values(registry).reduce((out,item)=>{out[item.level]=(out[item.level]||0)+1;return out},{});
console.log(`Wrote difficulty metadata for ${files.length} recipes: ${Object.entries(counts).map(([key,value])=>`${key} ${value}`).join(', ')}`);
