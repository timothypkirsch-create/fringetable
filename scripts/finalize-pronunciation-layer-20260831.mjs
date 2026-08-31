import fs from 'node:fs/promises';

const p='assets/js/pronunciation.js';
let js=await fs.readFile(p,'utf8');
js=js.replace("['phkali','PKHAH-lee'","['pkhali','PKHAH-lee'");
await fs.writeFile(p,js);

const s='sitemap.xml';
let sm=await fs.readFile(s,'utf8');
const url='https://fringetable.com/pronunciation/';
if(!sm.includes(url))sm=sm.replace('</urlset>',`<url><loc>${url}</loc><priority>0.9</priority></url>\n</urlset>`);
await fs.writeFile(s,sm);
console.log('Pronunciation layer finalized.');
