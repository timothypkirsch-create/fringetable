import fs from 'node:fs/promises';
import path from 'node:path';

const oldImage = 'https://commons.wikimedia.org/wiki/Special:FilePath/Nan-Gyi-Toke.jpg?width=1400';
const newImage = 'https://commons.wikimedia.org/wiki/Special:FilePath/Mandalay%20Monti.jpg?width=1400';
const oldCreditUrl = 'https://commons.wikimedia.org/wiki/File:Nan-Gyi-Toke.jpg';
const newCreditUrl = 'https://commons.wikimedia.org/wiki/File:Mandalay_Monti.jpg';

const roots = ['recipes', 'assets/js'];
let changed = [];

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(full);
    else if (/\.(html|js|mjs)$/i.test(entry.name)) await update(full);
  }
}

async function update(file) {
  let text = await fs.readFile(file, 'utf8');
  const before = text;
  text = text.split(oldImage).join(newImage);
  text = text.split(oldCreditUrl).join(newCreditUrl);
  if (file.endsWith('mandalay-nan-gyi-thoke.html')) {
    text = text.replace('Photo: စာကလေး, Wikimedia Commons, CC0', 'Photo: Zawthet, Wikimedia Commons, CC0');
  }
  if (text !== before) {
    await fs.writeFile(file, text);
    changed.push(file);
  }
}

for (const root of roots) {
  try { await walk(root); } catch (e) { if (e.code !== 'ENOENT') throw e; }
}

console.log(JSON.stringify({ changed }, null, 2));
if (!changed.length) throw new Error('No Nan Gyi Thoke image references were updated.');
