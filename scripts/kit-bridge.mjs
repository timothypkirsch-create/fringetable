import fs from 'node:fs/promises';

const API_BASE = 'https://api.kit.com/v4';
const apiKey = process.env.KIT_API_KEY;

if (!apiKey) {
  throw new Error('KIT_API_KEY is not configured. Add it as a GitHub Actions repository secret.');
}

const commandPath = process.argv[2];
if (!commandPath) throw new Error('Usage: node scripts/kit-bridge.mjs <command.json>');

const command = JSON.parse(await fs.readFile(commandPath, 'utf8'));

async function kit(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'X-Kit-Api-Key': apiKey,
      'Content-Type': 'application/json',
      ...(options.headers || {})
    }
  });
  const text = await response.text();
  let data;
  try { data = text ? JSON.parse(text) : {}; } catch { data = { raw: text }; }
  if (!response.ok) {
    throw new Error(`Kit API ${response.status}: ${JSON.stringify(data)}`);
  }
  return data;
}

function decodeEntities(value = '') {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function stripTags(value = '') {
  return decodeEntities(value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim());
}

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function findRecipeJsonLd(html) {
  const blocks = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  for (const match of blocks) {
    try {
      const parsed = JSON.parse(match[1]);
      const candidates = Array.isArray(parsed) ? parsed : parsed['@graph'] ? parsed['@graph'] : [parsed];
      const recipe = candidates.find(item => {
        const type = item?.['@type'];
        return type === 'Recipe' || (Array.isArray(type) && type.includes('Recipe'));
      });
      if (recipe) return recipe;
    } catch {}
  }
  return null;
}

function normalizeInstructions(instructions) {
  if (!instructions) return [];
  if (typeof instructions === 'string') return [stripTags(instructions)];
  if (!Array.isArray(instructions)) return [];
  const out = [];
  for (const item of instructions) {
    if (typeof item === 'string') out.push(stripTags(item));
    else if (item?.text) out.push(stripTags(item.text));
    else if (Array.isArray(item?.itemListElement)) out.push(...normalizeInstructions(item.itemListElement));
  }
  return out.filter(Boolean);
}

async function recipeFromUrl(sourceUrl) {
  const url = new URL(sourceUrl);
  if (!['fringetable.com', 'www.fringetable.com'].includes(url.hostname)) {
    throw new Error('For safety, weekly-dish source_url must be on fringetable.com.');
  }
  const response = await fetch(url, { headers: { 'User-Agent': 'FringeTable-KitBridge/1.0' } });
  if (!response.ok) throw new Error(`Could not fetch recipe page: HTTP ${response.status}`);
  const html = await response.text();
  const recipe = findRecipeJsonLd(html);
  if (!recipe) throw new Error('No Recipe JSON-LD found on source page.');

  const metaDescription = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i)?.[1]
    || html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']description["']/i)?.[1]
    || recipe.description
    || '';

  return {
    name: stripTags(recipe.name || 'This week\'s dish'),
    description: stripTags(metaDescription),
    cuisine: stripTags(Array.isArray(recipe.recipeCuisine) ? recipe.recipeCuisine.join(', ') : (recipe.recipeCuisine || '')),
    ingredients: (recipe.recipeIngredient || []).map(stripTags).filter(Boolean),
    instructions: normalizeInstructions(recipe.recipeInstructions),
    sourceUrl: url.toString()
  };
}

function buildWeeklyDish(recipe, overrides = {}) {
  const subject = overrides.subject || `This week’s overlooked dish: ${recipe.name}`;
  const previewText = overrides.preview_text || `The story, ingredients, and technique behind ${recipe.name}.`;
  const intro = overrides.intro || recipe.description || `Discover ${recipe.name}, the story behind it, and the technique that makes it worth cooking.`;
  const ingredients = recipe.ingredients.slice(0, 3);
  const checkpoints = recipe.instructions.slice(0, 2);

  const ingredientHtml = ingredients.length
    ? `<h3 style="color:#0B2118;margin-bottom:8px;">What makes it work</h3><ul>${ingredients.map(x => `<li>${escapeHtml(x)}</li>`).join('')}</ul>`
    : '';

  const techniqueHtml = checkpoints.length
    ? `<h3 style="color:#0B2118;margin-bottom:8px;">Technique to watch</h3><p>${escapeHtml(checkpoints.join(' '))}</p>`
    : '';

  const region = recipe.cuisine ? `<p style="margin-top:0;color:#6b6b62;"><em>${escapeHtml(recipe.cuisine)}</em></p>` : '';

  const content = `
<div style="font-family:Georgia,'Times New Roman',serif;color:#0B2118;line-height:1.65;max-width:640px;margin:0 auto;">
  <div style="background:#0B2118;color:#F6F1E7;padding:24px;text-align:center;">
    <div style="font-size:26px;font-weight:700;letter-spacing:.06em;">FRINGE TABLE</div>
    <div style="font-size:14px;margin-top:4px;">One overlooked dish each week.</div>
  </div>
  <div style="padding:30px 24px;background:#fff;">
    <div style="font-size:12px;text-transform:uppercase;letter-spacing:.12em;color:#C79A3B;font-weight:700;">The Weekly Dish</div>
    <h1 style="font-size:34px;line-height:1.15;margin:10px 0 6px;color:#0B2118;">${escapeHtml(recipe.name)}</h1>
    ${region}
    <p>${escapeHtml(intro)}</p>
    ${ingredientHtml}
    ${techniqueHtml}
    <p style="margin:30px 0;text-align:center;"><a href="${escapeHtml(recipe.sourceUrl)}" style="display:inline-block;background:#0B2118;color:#F6F1E7;text-decoration:none;padding:13px 22px;border-radius:6px;font-weight:700;">View the Full Recipe →</a></p>
    <hr style="border:0;border-top:1px solid #e4ded2;margin:30px 0;">
    <p style="font-style:italic;">Cook with curiosity.<br><strong>Fringe Table</strong></p>
    <p style="font-size:12px;color:#777;">fringetable.com · hello@fringetable.com</p>
  </div>
</div>`.trim();

  return { subject, previewText, content };
}

async function verify() {
  const data = await kit('/broadcasts?per_page=1');
  console.log(`Kit connection verified. Broadcasts accessible: ${Array.isArray(data.broadcasts) ? 'yes' : 'unknown'}.`);
}

async function createWeeklyDish() {
  if (!command.source_url) throw new Error('source_url is required.');
  const recipe = await recipeFromUrl(command.source_url);
  const built = buildWeeklyDish(recipe, command);
  const sendAt = command.operation === 'schedule_weekly_dish' ? command.send_at : null;
  if (command.operation === 'schedule_weekly_dish' && !sendAt) throw new Error('send_at is required when scheduling.');

  const payload = {
    email_address: command.email_address || 'hello@fringetable.com',
    subject: built.subject,
    preview_text: built.previewText,
    description: command.description || `Fringe Table Weekly Dish: ${recipe.name}`,
    content: built.content,
    public: false,
    send_at: sendAt
  };

  const data = await kit('/broadcasts', { method: 'POST', body: JSON.stringify(payload) });
  const broadcast = data.broadcast || {};
  console.log(`Kit broadcast ${broadcast.id || ''} created with status: ${broadcast.status || (sendAt ? 'scheduled' : 'draft')}.`);
}

switch (command.operation) {
  case 'verify':
    await verify();
    break;
  case 'create_weekly_dish_draft':
  case 'schedule_weekly_dish':
    await createWeeklyDish();
    break;
  default:
    throw new Error(`Unsupported operation: ${command.operation}`);
}
