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

let total=0;
for(const group of groups){
  const count=[...bySlug.values()].filter(value=>value===group).length;
  total+=count;
  console.log(`${group}: ${count}`);
}
console.log(`total: ${total}`);
