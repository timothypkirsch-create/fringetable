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

function normalize(text = '') {
  return text.replace(/\s+/g, ' ').replace(/\s+([,.;!?])/g, '$1').trim();
}

function firstSentence(text = '') {
  const normalized = normalize(text);
  const match = normalized.match(/^(.+?[.!?])(?:\s|$)/);
  return (match ? match[1] : normalized).trim();
}

function firstTwoSentences(text = '') {
  const normalized = normalize(text);
  const matches = normalized.match(/[^.!?]+[.!?]+/g);
  if (!matches?.length) return normalized;
  return normalize(matches.slice(0, 2).join(' '));
}

function trimAtWord(text, max = 360) {
  const value = normalize(text);
  if (value.length <= max) return value;
  const clipped = value.slice(0, max - 1);
  const lastSpace = clipped.lastIndexOf(' ');
  return `${clipped.slice(0, Math.max(lastSpace, 1)).replace(/[,:;\-\s]+$/, '')}…`;
}

function hash(text) {
  let h = 2166136261;
  for (const ch of text) {
    h ^= ch.charCodeAt(0);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function choose(items, key) {
  return items[hash(key) % items.length];
}

function buildTrackedUrl(slug, slotName) {
  const url = new URL(`https://fringetable.com/recipes/${slug}.html`);
  url.searchParams.set('utm_source', 'facebook');
  url.searchParams.set('utm_medium', 'social');
  url.searchParams.set('utm_campaign', 'fringetable_organic');
  url.searchParams.set('utm_content', slotName || 'scheduled');
  return url.toString();
}

function buildMessage(recipe, style, seed) {
  const title = normalize(recipe.name);
  const region = normalize(recipe.region || 'its home region');
  const summary = trimAtWord(recipe.summary || '', 330);
  const story1 = trimAtWord(firstSentence(recipe.story || ''), 300);
  const story2 = trimAtWord(firstTwoSentences(recipe.story || ''), 390);
  const type = normalize(recipe.type || 'recipe');
  const time = normalize(recipe.time || '');
  const detail = story1 || summary;

  const hooks = [
    `A dish worth knowing: ${title}.`,
    `Meet ${title} — one of the dishes that deserves a wider table.`,
    `${title} is the kind of recipe that makes a region's foodways click into focus.`,
    `If ${title} is new to you, this is a good place to start.`,
    `There is more going on in ${title} than the ingredient list first suggests.`,
  ];

  const closers = [
    `Read the history, technique, and full recipe on Fringe Table.`,
    `The full recipe includes the method, context, and the details that make the dish itself—not a generic approximation.`,
    `Explore the full recipe and the story behind it on Fringe Table.`,
    `Get the full method and the cultural context on Fringe Table.`,
  ];

  const questions = [
    `Would this be new to your table, or is it already familiar?`,
    `Have you cooked or eaten this before?`,
    `Is this one you would make at home?`,
    `What part of this dish catches your attention first?`,
  ];

  if (style === 'story') {
    return [
      choose(hooks, `${seed}|hook`),
      '',
      story2 || summary,
      '',
      `From ${region}. ${choose(closers, `${seed}|close`)}`,
      '',
      choose(questions, `${seed}|question`),
    ].join('\n');
  }

  if (style === 'table') {
    const meta = [type, time].filter(Boolean).join(' · ');
    return [
      choose([
        `${title} belongs on the shortlist of dishes to try from ${region}.`,
        `Tonight's Fringe Table pick: ${title}.`,
        `Put ${title} on your cooking radar.`,
        `${title}: a closer look at a dish from ${region}.`,
      ], `${seed}|table-hook`),
      '',
      summary,
      '',
      meta ? `${meta}.` : '',
      choose(closers, `${seed}|table-close`),
    ].filter((line, i, arr) => line !== '' || (i > 0 && arr[i - 1] !== '')).join('\n');
  }

  return [
    choose([
      `Today's food discovery: ${title}.`,
      `One more reason to look beyond the usual recipe rotation: ${title}.`,
      `Save this one for later: ${title}.`,
      `${title} is today's Fringe Table find.`,
    ], `${seed}|discovery-hook`),
    '',
    summary,
    '',
    detail && detail !== summary ? detail : `From ${region}, with the dish's identity and context kept front and center.`,
    '',
    choose(closers, `${seed}|discovery-close`),
  ].join('\n');
}

function qualityCheck(message) {
  const cleaned = message.trim();
  if (cleaned.length < 120) throw new Error('Generated Facebook copy is unexpectedly short.');
  if (cleaned.length > 1100) throw new Error('Generated Facebook copy is unexpectedly long.');
  if (/undefined|null|\[object Object\]/i.test(cleaned)) throw new Error('Generated Facebook copy contains invalid content.');
  if ((cleaned.match(/Fringe Table/g) || []).length > 2) throw new Error('Generated Facebook copy repeats the brand name too often.');
  return cleaned;
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
const styles = slot === 'morning'
  ? ['discovery', 'story', 'discovery']
  : slot === 'afternoon'
    ? ['story', 'table', 'story']
    : ['table', 'discovery', 'story'];
const style = styles[hash(`${seed}|style`) % styles.length];
const recipeUrl = buildTrackedUrl(recipe.slug, slot);
const message = qualityCheck(buildMessage(recipe, style, seed));

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
  tracked_url: recipeUrl,
});
history.posts = history.posts.slice(-120);
fs.writeFileSync(historyPath, `${JSON.stringify(history, null, 2)}\n`);
console.log(`Published Facebook post: ${recipe.name} (${publishMode}) ${postId || 'success'}`);
console.log(`Tracked URL: ${recipeUrl}`);
