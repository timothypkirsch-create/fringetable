import fs from 'node:fs/promises';
import path from 'node:path';

const mappings = new Map([
  ['https://commons.wikimedia.org/wiki/Special:FilePath/Sesame%20seeds.jpg?width=1400','https://commons.wikimedia.org/wiki/Special:FilePath/Sesame%20Seeds.jpg?width=1400'],
  ['https://commons.wikimedia.org/wiki/Special:FilePath/Burmese%20tofu.jpg?width=1400','https://commons.wikimedia.org/wiki/Special:FilePath/Tofu%20Nway%20Shan%20Food.jpg?width=1400'],
  ['https://commons.wikimedia.org/wiki/Special:FilePath/Shrimp%20and%20grits.jpg?width=1400','https://commons.wikimedia.org/wiki/Special:FilePath/Commander%27s%20Palace%20shrimp%20%26%20grits.jpg?width=1400'],
  ['https://commons.wikimedia.org/wiki/Special:FilePath/Roasted%20butternut%20squash.jpg?width=1400','https://commons.wikimedia.org/wiki/Special:FilePath/Roasted%20butternut%20squash%20%2841368009070%29.jpg?width=1400'],
  ['https://commons.wikimedia.org/wiki/Special:FilePath/Wild%20rice.jpg?width=1400','https://commons.wikimedia.org/wiki/Special:FilePath/Wild%20rice%20%286213123029%29.jpg?width=1400'],
  ['https://commons.wikimedia.org/wiki/Special:FilePath/Spas%20soup.jpg?width=1400','https://commons.wikimedia.org/wiki/Special:FilePath/%D0%A1%D0%BF%D0%B0%D0%B9%D1%81.jpeg?width=1400'],
  ['https://commons.wikimedia.org/wiki/Special:FilePath/Flatbread.jpg?width=1400','https://commons.wikimedia.org/wiki/Special:FilePath/Gurasa.jpg?width=1400'],
  ['https://commons.wikimedia.org/wiki/Special:FilePath/Blue%20cornmeal.jpg?width=1400','https://commons.wikimedia.org/wiki/Special:FilePath/Traditional%20Foods.jpg?width=1400'],
  ['https://commons.wikimedia.org/wiki/Special:FilePath/Chorba%20frik.jpg?width=1400','https://commons.wikimedia.org/wiki/Special:FilePath/Chorba%20frik%20algerienne.jpg?width=1400'],
  ['https://commons.wikimedia.org/wiki/Special:FilePath/Aloo%20pitika.jpg?width=1400','https://commons.wikimedia.org/wiki/Special:FilePath/Kumol%20Saul%20with%20Aloo%20Pitika.jpg?width=1400'],
  ['https://commons.wikimedia.org/wiki/Special:FilePath/Fish%20amok.jpg?width=1400','https://commons.wikimedia.org/wiki/Special:FilePath/Fish%20Amok.jpg?width=1400'],
  ['https://commons.wikimedia.org/wiki/Special:FilePath/Zaalouk.jpg?width=1400','https://commons.wikimedia.org/wiki/Special:FilePath/Zaaluk.jpg?width=1400'],
  ['https://commons.wikimedia.org/wiki/Special:FilePath/Banh%20xeo.jpg?width=1400','https://commons.wikimedia.org/wiki/Special:FilePath/Thumb%20IMG%200916%201024.jpg?width=1400'],
  ['https://commons.wikimedia.org/wiki/Special:FilePath/Red-red.jpg?width=1400','https://commons.wikimedia.org/wiki/Special:FilePath/Ghanaian%20Red-Red%20cuisine%20dish%20food.jpg?width=1400']
]);

const roots = ['assets/js','recipes','expansion/batches'];
const allowed = new Set(['.js','.html','.json','.mjs']);
let changedFiles = 0;
let replacements = 0;

async function walk(dir){
  let entries=[];
  try{ entries=await fs.readdir(dir,{withFileTypes:true}); } catch { return; }
  for(const entry of entries){
    const p=path.join(dir,entry.name);
    if(entry.isDirectory()) await walk(p);
    else if(allowed.has(path.extname(entry.name))) await patch(p);
  }
}

async function patch(file){
  let text=await fs.readFile(file,'utf8');
  const before=text;
  for(const [from,to] of mappings){
    if(from===to) continue;
    const parts=text.split(from);
    if(parts.length>1){
      replacements += parts.length-1;
      text=parts.join(to);
    }
  }
  if(text!==before){
    await fs.writeFile(file,text);
    changedFiles++;
    console.log(`updated ${file}`);
  }
}

for(const root of roots) await walk(root);
console.log(`verified-image-repair files=${changedFiles} replacements=${replacements}`);
if(!changedFiles) console.log('No stale verified image URLs remained.');
