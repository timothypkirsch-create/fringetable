import fs from 'node:fs';
const text=fs.readFileSync('assets/js/site-core.js','utf8')+fs.readFileSync('assets/js/site.js','utf8');
const groups=['indigenous-americas','horn-northeast-africa','maghreb-west-africa','caribbean-lowcountry','caucasus-central-west-asia','himalayas-south-asia','southeast-asia'];
for(const group of groups){
  const rx=new RegExp(`group:["']${group}["']|"group":"${group}"`,'g');
  const count=(text.match(rx)||[]).length;
  console.log(`${group}: ${count}`);
}
