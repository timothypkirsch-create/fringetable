import fs from 'node:fs';

const files=['assets/js/site-core.js','assets/js/site.js'];
const text=files.map(file=>fs.readFileSync(file,'utf8')).join('\n');
const groups=['indigenous-americas','horn-northeast-africa','maghreb-west-africa','caribbean-lowcountry','caucasus-central-west-asia','himalayas-south-asia','southeast-asia'];

// Both catalog files intentionally overlap (site.js contains daily/recovered cards), so
// audit unique recipe slugs rather than raw group-string occurrences.
const bySlug=new Map();
const patterns=[
  /["']slug["']\s*:\s*["']([^"']+)["'][^{}]{0,1200}?["']group["']\s*:\s*["']([^"']+)["']/g,
  /\bslug\s*:\s*["']([^"']+)["'][^{}]{0,1200}?\bgroup\s*:\s*["']([^"']+)["']/g
];
for(const rx of patterns){
  for(const match of text.matchAll(rx)){
    const [,slug,group]=match;
    if(groups.includes(group))bySlug.set(slug,group);
  }
}

console.log('catalog-audit-version: 2026-08-31');
let total=0;
for(const group of groups){
  const count=[...bySlug.values()].filter(value=>value===group).length;
  total+=count;
  console.log(`${group}: ${count}`);
}
console.log(`total: ${total}`);

// Surface recipe HTML pages that are not discoverable from the live catalog. This does
// not change regional counts; it is an integration warning for future maintenance.
const recipeFiles=fs.readdirSync('recipes',{withFileTypes:true})
  .filter(entry=>entry.isFile()&&entry.name.endsWith('.html')&&entry.name!=='index.html')
  .map(entry=>entry.name.replace(/\.html$/,''));
const missing=recipeFiles.filter(slug=>!bySlug.has(slug)).sort();
console.log(`recipe-pages-not-in-catalog: ${missing.length}`);
if(missing.length)console.log(`missing-catalog-slugs: ${missing.join(', ')}`);
