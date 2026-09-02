import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const BASE = 'https://fringetable.com';
const skipDirs = new Set(['.git', 'node_modules']);

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    if (skipDirs.has(entry.name)) return [];
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

function canonicalFor(relativePath) {
  const webPath = relativePath.split(path.sep).join('/');
  if (webPath === 'index.html') return `${BASE}/`;
  if (webPath.endsWith('/index.html')) return `${BASE}/${webPath.slice(0, -'index.html'.length)}`;
  return `${BASE}/${webPath}`;
}

let changed = 0;
for (const file of walk(ROOT).filter(f => f.endsWith('.html'))) {
  const rel = path.relative(ROOT, file);
  let html = fs.readFileSync(file, 'utf8');
  if (/<link\s+[^>]*rel=["']canonical["'][^>]*>/i.test(html)) continue;
  const canonical = canonicalFor(rel);
  const tag = `<link rel="canonical" href="${canonical}">`;
  const headMatch = html.match(/<head[^>]*>/i);
  if (!headMatch) {
    console.warn(`Skipping ${rel}: no <head> tag found.`);
    continue;
  }
  html = html.replace(headMatch[0], `${headMatch[0]}${tag}`);
  fs.writeFileSync(file, html);
  changed++;
  console.log(`Added canonical: ${rel} -> ${canonical}`);
}

console.log(`Canonical installation complete. Updated ${changed} HTML file(s).`);
