import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const RECIPES_DIR = path.join(ROOT, 'recipes');

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

function stripTags(value = '') {
  return value
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function metaContent(html, name) {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const patterns = [
    new RegExp(`<meta[^>]+name=["']${escaped}["'][^>]+content=["']([^"']+)["'][^>]*>`, 'i'),
    new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+name=["']${escaped}["'][^>]*>`, 'i'),
  ];
  for (const re of patterns) {
    const match = html.match(re);
    if (match) return stripTags(match[1]);
  }
  return '';
}

function canonicalUrl(html, file) {
  const match = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["'][^>]*>/i)
    || html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["'][^>]*>/i);
  if (match) return match[1];
  const rel = path.relative(ROOT, file).split(path.sep).join('/');
  return `https://fringetable.com/${rel}`;
}

function recipeObject(value) {
  if (!value || typeof value !== 'object') return null;
  if (Array.isArray(value)) {
    for (const item of value) {
      const found = recipeObject(item);
      if (found) return found;
    }
    return null;
  }
  const type = value['@type'];
  if (type === 'Recipe' || (Array.isArray(type) && type.includes('Recipe'))) return value;
  if (Array.isArray(value['@graph'])) return recipeObject(value['@graph']);
  return null;
}

function getVisibleStepNames(html) {
  const list = html.match(/<ol[^>]+class=["'][^"']*method-list[^"']*["'][^>]*>([\s\S]*?)<\/ol>/i);
  if (!list) return [];
  const names = [];
  const liRe = /<li\b[^>]*>([\s\S]*?)<\/li>/gi;
  let m;
  while ((m = liRe.exec(list[1]))) {
    const body = m[1];
    const bolds = [...body.matchAll(/<(?:b|strong)\b[^>]*>([\s\S]*?)<\/(?:b|strong)>/gi)]
      .map((x) => stripTags(x[1]))
      .filter(Boolean);
    let name = bolds.find((x) => !/^\d+\.?$/.test(x));
    if (!name) {
      const text = stripTags(body).replace(/^\d+\.?\s*/, '');
      name = text.split(/[.!?]/)[0].trim();
    }
    names.push(name ? name.replace(/[.:;\-\s]+$/, '') : '');
  }
  return names;
}

function ensureStepAnchors(html) {
  const listRe = /(<ol[^>]+class=["'][^"']*method-list[^"']*["'][^>]*>)([\s\S]*?)(<\/ol>)/i;
  const match = html.match(listRe);
  if (!match) return html;
  let i = 0;
  const updated = match[2].replace(/<li\b([^>]*)>/gi, (whole, attrs) => {
    i += 1;
    if (/\bid=["'][^"']+["']/i.test(attrs)) return whole;
    return `<li id="step-${i}"${attrs}>`;
  });
  return html.replace(listRe, `${match[1]}${updated}${match[3]}`);
}

function deriveKeywords(recipe) {
  const parts = [recipe.name, recipe.recipeCuisine, recipe.recipeCategory]
    .flatMap((v) => Array.isArray(v) ? v : [v])
    .map((v) => String(v || '').trim())
    .filter(Boolean);
  const words = new Set();
  for (const part of parts) {
    words.add(part);
    for (const sub of part.split(/\s*\/\s*|\s*,\s*/)) if (sub.trim()) words.add(sub.trim());
  }
  if (recipe.name) words.add(`${recipe.name} recipe`);
  return [...words].slice(0, 12).join(', ');
}

let updatedCount = 0;
for (const file of walk(RECIPES_DIR).filter((f) => f.endsWith('.html'))) {
  let html = fs.readFileSync(file, 'utf8');
  const scriptRe = /<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi;
  const matches = [...html.matchAll(scriptRe)];
  if (!matches.length) continue;

  let changed = false;
  const canonical = canonicalUrl(html, file);
  const stepNames = getVisibleStepNames(html);
  let scriptIndex = 0;

  html = html.replace(scriptRe, (whole, jsonText) => {
    scriptIndex += 1;
    let data;
    try { data = JSON.parse(jsonText); } catch { return whole; }
    const recipe = recipeObject(data);
    if (!recipe) return whole;

    if (!recipe.description || String(recipe.description).trim().length < 20) {
      const meta = metaContent(html, 'description');
      if (meta) {
        recipe.description = meta;
        changed = true;
      }
    }

    if (!recipe.keywords) {
      const keywords = deriveKeywords(recipe);
      if (keywords) {
        recipe.keywords = keywords;
        changed = true;
      }
    }

    if (Array.isArray(recipe.recipeIngredient)) {
      const cleaned = recipe.recipeIngredient
        .map((x) => String(x ?? '').replace(/\s+/g, ' ').trim())
        .filter((x) => x.length >= 2);
      if (JSON.stringify(cleaned) !== JSON.stringify(recipe.recipeIngredient)) {
        recipe.recipeIngredient = cleaned;
        changed = true;
      }
    }

    if (Array.isArray(recipe.recipeInstructions)) {
      recipe.recipeInstructions = recipe.recipeInstructions.map((step, index) => {
        const item = typeof step === 'string' ? { '@type': 'HowToStep', text: step } : { ...step };
        if (!item['@type']) item['@type'] = 'HowToStep';
        if (!item.name) item.name = stepNames[index] || `Step ${index + 1}`;
        if (!item.url) item.url = `${canonical}#step-${index + 1}`;
        return item;
      });
      changed = true;
    }

    if (!recipe.mainEntityOfPage) {
      recipe.mainEntityOfPage = canonical;
      changed = true;
    }

    return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
  });

  const withAnchors = ensureStepAnchors(html);
  if (withAnchors !== html) {
    html = withAnchors;
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, html);
    updatedCount += 1;
  }
}

console.log(`Recipe schema enhancement complete. Updated ${updatedCount} recipe HTML file(s).`);
