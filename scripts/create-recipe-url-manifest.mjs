import fs from 'node:fs';
const slugs=fs.readdirSync('recipes').filter(file=>file.endsWith('.html')&&file!=='index.html').map(file=>file.replace(/\.html$/,'')).sort();
fs.writeFileSync('data/recipe-url-manifest.txt',`${slugs.join('\n')}\n`);
console.log(`Recorded ${slugs.length} protected recipe URLs.`);
