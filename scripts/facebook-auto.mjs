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
  const summary = trimAtWord(recipe.summary || '', 360);
  const story1 = trimAtWord(firstSentence(recipe.story || ''), 320);
  const story2 = trimAtWord(firstTwoSentences(recipe.story || ''), 430);
  const type = normalize(recipe.type || 'recipe');
  const time = normalize(recipe.time || '');
  const context = story2 || summary;

  const intros = [
    `Today’s recipe is ${title}, and it’s exactly the kind of dish Fringe Table was built to find: something with a real story behind it that deserves a little more attention.`,
    `A little food history for your day: ${title}. It’s one of those dishes that makes more sense the more you understand where it comes from.`,
    `If ${title} is unfamiliar, that’s part of the point. Fringe Table is here for the dishes that are easy to miss and very much worth knowing.`,
    `Today I’m sharing ${title}, a dish from ${region} that carries a lot more with it than the ingredient list alone can tell you.`,
  ];

  const bridges = [
    `What I like about this one is that the story and the technique are tied together.`,
    `This is also the kind of recipe where a little context makes the cooking itself more interesting.`,
    `The details matter here, but they’re manageable once you know what to look for.`,
    `There’s a reason this dish has lasted, and it’s worth understanding before you start cooking.`,
  ];

  const reassurance = [
    `If you’ve never made it before, don’t let the unfamiliar name stop you. The recipe walks through the process step by step and tells you what to look for as you go.`,
    `If this is new territory, the full recipe keeps the process practical while still preserving what makes the dish itself.`,
    `The full method is written for someone making it for the first time, with the cultural context kept right alongside the cooking.`,
  ];

  const closers = [
    `If it sounds like your kind of kitchen project, the full recipe and story are on Fringe Table.`,
    `If you want to cook it, the full recipe includes the method, history, and the small details that make a difference.`,
    `Take a look at the full recipe when you have a few minutes. It’s a good one to save for the weekend.`,
    `Read the full story and recipe on Fringe Table when you’re ready to give it a try.`,
  ];

  if (style === 'story') {
    return [
      choose(intros, `${seed}|intro`),
      '',
      context,
      '',
      choose(bridges, `${seed}|bridge`),
      story1 && story1 !== context ? story1 : '',
      '',
      choose(reassurance, `${seed}|reassure`),
      '',
      choose(closers, `${seed}|close`),
    ].filter((line, i, arr) => line !== '' || (i > 0 && arr[i - 1] !== '')).join('\n');
  }

  if (style === 'table') {
    const meta = [region, type, time].filter(Boolean).join(' · ');
    return [
      choose(intros, `${seed}|table-intro`),
      '',
      summary,
      '',
      meta ? meta : '',
      '',
      choose(reassurance, `${seed}|table-reassure`),
      '',
      choose(closers, `${seed}|table-close`),
    ].filter((line, i, arr) => line !== '' || (i > 0 && arr[i - 1] !== '')).join('\n');
  }

  return [
    choose(intros, `${seed}|discovery-intro`),
    '',
    summary,
    '',
    story1 && story1 !== summary ? story1 : choose(bridges, `${seed}|discovery-bridge`),
    '',
    choose(reassurance, `${seed}|discovery-reassure`),
    '',
    choose(closers, `${seed}|discovery-close`),
  ].join('\n');
}

function qualityCheck(message) {
  const cleaned = message.trim();
  if (cleaned.length < 180) throw new Error('Generated Facebook copy is unexpectedly short.');
  if (cleaned.length > 1500) throw new Error('Generated Facebook copy is unexpectedly long.');
  if (/undefined|null|\[object Object\]/i.test(cleaned)) throw new Error('Generated Facebook copy contains invalid content.');
  if ((cleaned.match(/Fringe Table/g) || []).length > 3) throw new Error('Generated Facebook copy repeats the brand name too often.');
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
