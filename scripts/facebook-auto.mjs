import fs from 'node:fs';

const API_VERSION = 'v26.0';
const pageId = process.env.META_PAGE_ID;
const accessToken = process.env.META_PAGE_ACCESS_TOKEN;
const slot = (process.env.FB_SLOT || 'scheduled').toLowerCase();

if (!pageId) throw new Error('Missing META_PAGE_ID.');
if (!accessToken) throw new Error('Missing META_PAGE_ACCESS_TOKEN.');

function extractCatalog(source) {
  const marker = 'const catalog=';
  const startMarker = source.indexOf(marker);
  if (startMarker < 0) throw new Error('Could not find catalog in assets/js/site-core.js.');
  const start = source.indexOf('[', startMarker + marker.length);
  if (start < 0) throw new Error('Could not find catalog array start.');
  let depth = 0;
  let inString = false;
  let escaped = false;
  for (let i = start; i < source.length; i++) {
    const ch = source[i];
    if (inString) {
      if (escaped) escaped = false;
      else if (ch === '\\') escaped = true;
      else if (ch === '"') inString = false;
      continue;
    }
    if (ch === '"') inString = true;
    else if (ch === '[') depth++;
    else if (ch === ']') {
      depth--;
      if (depth === 0) return JSON.parse(source.slice(start, i + 1));
    }
  }
  throw new Error('Could not find catalog array end.');
}

function safeError(data, status) {
  return data?.error ? {
    message: data.error.message,
    type: data.error.type,
    code: data.error.code,
    error_subcode: data.error.error_subcode,
  } : { status };
}

async function metaRequest(path, params, method = 'POST') {
  const body = new URLSearchParams({ ...params, access_token: accessToken });
  const response = await fetch(`https://graph.facebook.com/${API_VERSION}/${path}`, {
    method,
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: method === 'GET' ? undefined : body,
  });
  const data = await response.json();
  if (!response.ok || data.error) throw new Error(JSON.stringify(safeError(data, response.status)));
  return data;
}

async function validatePage() {
  const url = new URL(`https://graph.facebook.com/${API_VERSION}/${encodeURIComponent(pageId)}`);
  url.searchParams.set('fields', 'id,name');
  url.searchParams.set('access_token', accessToken);
  const response = await fetch(url);
  const data = await response.json();
  if (!response.ok || data.error) throw new Error(`Meta token validation failed: ${JSON.stringify(safeError(data, response.status))}`);
  if (String(data.id) !== String(pageId)) throw new Error('Meta token validated against an unexpected Page ID.');
  console.log(`Validated Meta Page: ${data.name || data.id}`);
}

function firstSentence(text = '') {
  const normalized = text.replace(/\s+/g, ' ').trim();
  const match = normalized.match(/^(.+?[.!?])(?:\s|$)/);
  return (match ? match[1] : normalized).trim();
}

function hash(text) {
  let h = 2166136261;
  for (const ch of text) {
    h ^= ch.charCodeAt(0);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function buildMessage(recipe, style) {
  const title = recipe.name;
  const region = recipe.region || 'Fringe Table';
  const summary = (recipe.summary || '').trim();
  const story = firstSentence(recipe.story || '');
  const time = recipe.time ? ` · ${recipe.time}` : '';
  const type = recipe.type ? `${recipe.type}${time}` : `Recipe${time}`;

  if (style === 'story') {
    return `${title}\n\n${story || summary}\n\nFrom ${region}. Read the story, method, and full recipe on Fringe Table.`;
  }
  if (style === 'table') {
    return `${title} — ${type}\n\n${summary}\n\nA dish from ${region}, with the context and technique kept intact.`;
  }
  return `${title}\n\n${summary}\n\nExplore the recipe and its story from ${region} on Fringe Table.`;
}

const source = fs.readFileSync('assets/js/site-core.js', 'utf8');
const catalog = extractCatalog(source).filter(r => r?.slug && r?.name && r?.summary);
if (!catalog.length) throw new Error('Recipe catalog is empty.');

const historyPath = 'data/facebook-post-history.json';
let history = { version: 1, posts: [] };
if (fs.existsSync(historyPath)) {
  try { history = JSON.parse(fs.readFileSync(historyPath, 'utf8')); } catch { /* keep empty history */ }
}
if (!Array.isArray(history.posts)) history.posts = [];

const recent = history.posts.slice(-45);
const recentSlugs = new Set(recent.map(p => p.slug));
let candidates = catalog.filter(r => !recentSlugs.has(r.slug));
if (!candidates.length) candidates = catalog;

const recentGroups = history.posts.slice(-14).reduce((acc, p) => {
  if (p.group) acc[p.group] = (acc[p.group] || 0) + 1;
  return acc;
}, {});
const minGroupCount = Math.min(...candidates.map(r => recentGroups[r.group] || 0));
const balanced = candidates.filter(r => (recentGroups[r.group] || 0) === minGroupCount);

const now = new Date();
const dayKey = now.toISOString().slice(0, 10);
const seed = `${dayKey}|${slot}|${history.posts.length}`;
const recipe = balanced[hash(seed) % balanced.length];
const styles = slot === 'morning' ? ['discovery', 'story'] : slot === 'afternoon' ? ['story', 'table'] : ['table', 'discovery'];
const style = styles[hash(`${seed}|style`) % styles.length];
const recipeUrl = `https://fringetable.com/recipes/${recipe.slug}.html`;
const message = buildMessage(recipe, style);

await validatePage();

let postId = '';
let publishMode = 'link';
if (typeof recipe.image === 'string' && /^https:\/\//i.test(recipe.image)) {
  try {
    const photoData = await metaRequest(`${encodeURIComponent(pageId)}/photos`, {
      url: recipe.image,
      caption: `${message}\n\n${recipeUrl}`,
      published: 'true',
    });
    postId = photoData.post_id || photoData.id || '';
    publishMode = 'photo';
  } catch (error) {
    console.warn(`Photo publish failed; falling back to link post: ${error.message}`);
  }
}

if (!postId) {
  const feedData = await metaRequest(`${encodeURIComponent(pageId)}/feed`, {
    message,
    link: recipeUrl,
  });
  postId = feedData.id || '';
  publishMode = 'link';
}

history.posts.push({
  published_at: now.toISOString(),
  slug: recipe.slug,
  name: recipe.name,
  group: recipe.group || '',
  slot,
  style,
  mode: publishMode,
  post_id: postId,
});
history.posts = history.posts.slice(-120);
fs.writeFileSync(historyPath, `${JSON.stringify(history, null, 2)}\n`);
console.log(`Published Facebook post: ${recipe.name} (${publishMode}) ${postId || 'success'}`);
