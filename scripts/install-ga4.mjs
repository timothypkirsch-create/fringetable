import fs from 'node:fs';
import path from 'node:path';

const MEASUREMENT_ID = 'G-WZDVZ4NW8V';
const START = '<!-- Fringe Table GA4 -->';
const END = '<!-- /Fringe Table GA4 -->';
const snippet = `${START}\n<script async src="https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}"></script>\n<script>\n  window.dataLayer = window.dataLayer || [];\n  function gtag(){dataLayer.push(arguments);}\n  gtag('js', new Date());\n  gtag('config', '${MEASUREMENT_ID}');\n</script>\n${END}`;

const skipDirs = new Set(['.git', 'node_modules']);
let changed = 0;
let scanned = 0;

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (skipDirs.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.isFile() && entry.name.toLowerCase().endsWith('.html')) patch(full);
  }
}

function patch(file) {
  scanned++;
  let html = fs.readFileSync(file, 'utf8');
  const existing = new RegExp(`${START}[\\s\\S]*?${END}\\n?`, 'g');
  html = html.replace(existing, '');
  if (!/<\/head>/i.test(html)) {
    console.warn(`Skipping ${file}: no </head>`);
    return;
  }
  html = html.replace(/<\/head>/i, `${snippet}\n</head>`);
  fs.writeFileSync(file, html);
  changed++;
}

walk('.');
console.log(`GA4 ${MEASUREMENT_ID}: updated ${changed} of ${scanned} HTML files.`);
