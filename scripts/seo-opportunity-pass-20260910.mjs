import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const today = '2026-09-10';

function read(rel){ return fs.readFileSync(path.join(root, rel), 'utf8'); }
function write(rel, txt){ fs.writeFileSync(path.join(root, rel), txt); }
function replaceMeta(html, name, value){
  const re = new RegExp(`<meta name="${name}" content="[^"]*">`, 'i');
  return re.test(html) ? html.replace(re, `<meta name="${name}" content="${value}">`) : html;
}
function replaceTitle(html, value){
  return html.replace(/<title>[^<]*<\/title>/i, `<title>${value}</title>`);
}
function replaceOg(html, prop, value){
  const re = new RegExp(`<meta property="${prop}" content="[^"]*">`, 'i');
  return re.test(html) ? html.replace(re, `<meta property="${prop}" content="${value}">`) : html;
}
function bumpModified(html){
  return html.replace(/"dateModified":"\d{4}-\d{2}-\d{2}"/, `"dateModified":"${today}"`);
}
function appendBeforeMainEnd(html, marker, block){
  if (html.includes(marker)) return html;
  return html.replace('</main>', `${block}</main>`);
}

const pageUpdates = {
  'recipes/uzbek-palov.html': {
    title: 'Uzbek Palov Recipe (Plov/Osh) — Lamb, Carrots & Rice | Fringe Table',
    description: 'Make Uzbek palov (plov/osh) with lamb, carrots, cumin, garlic and rice. Step-by-step zirvak method, rice checkpoints, serving ideas and cultural context.',
    ogTitle: 'Uzbek Palov (Plov/Osh) — Lamb, Carrots & Rice | Fringe Table',
    ogDescription: 'A step-by-step Uzbek palov with lamb, carrots, cumin and rice cooked over a rich zirvak.',
    related: '<section class="recipe-section seo-related" data-seo-pass="20260910"><span class="eyebrow">Go deeper</span><h2>More on Uzbek palov</h2><p>For the rice itself, see <a href="../guides/ingredients/what-is-devzira-rice.html">what devzira rice is</a> and <a href="../guides/substitutions/devzira-rice-substitute.html">the best devzira substitutes</a>. If your grains tend to clump, use our <a href="../guides/techniques/how-to-keep-palov-rice-separate.html">palov rice technique guide</a>. For the full meal, see <a href="../guides/serve-with/what-to-serve-with-uzbek-palov.html">what to serve with Uzbek palov</a>.</p></section>'
  },
  'recipes/burmese-tofu-nway.html': {
    title: 'Burmese Tofu Nway Recipe — Warm Chickpea Tofu Breakfast | Fringe Table',
    description: 'Make Burmese tofu nway, the warm Shan chickpea-tofu breakfast served soft and savory with garlic oil, chile, herbs and crisp toppings.',
    ogTitle: 'Burmese Tofu Nway — Warm Chickpea Tofu Breakfast | Fringe Table',
    ogDescription: 'A warm Shan-style chickpea tofu bowl with savory toppings, chile and garlic.',
    related: '<section class="recipe-section seo-related" data-seo-pass="20260910"><span class="eyebrow">Explore Myanmar</span><h2>Keep cooking</h2><p>Pair tofu nway with our <a href="../subrecipes/burmese-chile-oil.html">Burmese chile oil</a>, then explore <a href="burmese-shan-noodles.html">Shan noodles</a> and the <a href="../guides/southeast-asia-food-guide.html">Southeast Asia food guide</a>.</p></section>'
  },
  'recipes/eritrean-zebhi-hamli.html': {
    related: '<section class="recipe-section seo-related" data-seo-pass="20260910"><span class="eyebrow">Eritrean table</span><h2>Build the meal</h2><p>Serve Zebhi Hamli with <a href="eritrean-taita-fit-fit.html">Taita Fit-Fit</a> or <a href="zigni.html">Zigni</a>, and browse more dishes in the <a href="regions/horn-northeast-africa/">Horn &amp; Northeast Africa collection</a>.</p></section>'
  },
  'recipes/seminole-rice-sofkee.html': {
    title: 'Seminole Rice Sofkee Recipe — Traditional Rice Drink/Porridge | Fringe Table',
    description: 'Learn a home-kitchen Seminole rice sofkee recipe, with cultural context, texture checkpoints and a simple method for this traditional rice preparation.',
    ogTitle: 'Seminole Rice Sofkee Recipe | Fringe Table',
    ogDescription: 'A simple Seminole rice sofkee with traditional context and clear texture checkpoints.',
    related: '<section class="recipe-section seo-related" data-seo-pass="20260910"><span class="eyebrow">Indigenous foodways</span><h2>Related recipes</h2><p>Continue with <a href="cherokee-bean-bread.html">Cherokee Bean Bread</a>, <a href="wampanoag-nasaump.html">Wampanoag Nasaump</a>, or browse the <a href="../guides/indigenous-americas-food-guide.html">Indigenous Americas food guide</a>.</p></section>'
  },
  'recipes/bhutanese-jasha-maroo.html': {
    title: 'Jasha Maroo Recipe — Bhutanese Spicy Chicken Stew | Fringe Table',
    description: 'Make Jasha Maroo, Bhutanese spicy chicken stew with ginger, garlic, tomato and chile. Includes cultural context, prep notes and doneness checkpoints.',
    ogTitle: 'Jasha Maroo — Bhutanese Spicy Chicken Stew | Fringe Table',
    ogDescription: 'A Bhutanese chicken stew bright with ginger, garlic, tomato and chile.',
    related: '<section class="recipe-section seo-related" data-seo-pass="20260910"><span class="eyebrow">Bhutanese cooking</span><h2>Cook another Bhutanese dish</h2><p>Try <a href="bhutanese-ema-datshi.html">Ema Datshi</a>, <a href="bhutanese-kewa-datshi.html">Kewa Datshi</a> or <a href="bhutanese-hoentay.html">Hoentay</a>, then browse the <a href="../guides/himalayas-south-asia-food-guide.html">Himalayas &amp; South Asia food guide</a>.</p></section>'
  },
  'subrecipes/afghan-tomato-sauce.html': {
    title: 'Afghan Tomato Sauce Recipe — Simple Spiced Tomato Chutney | Fringe Table',
    description: 'Make Afghan tomato sauce for ashak, mantu and rice dishes with tomato, garlic and warm spices. Simple method, serving ideas and Afghan food context.',
    ogTitle: 'Afghan Tomato Sauce — Simple Spiced Tomato Chutney | Fringe Table',
    ogDescription: 'A simple Afghan tomato sauce for dumplings, rice and everyday meals.',
    related: '<section class="recipe-section seo-related" data-seo-pass="20260910"><span class="eyebrow">Use it with</span><h2>Afghan recipes</h2><p>Spoon this sauce over <a href="../recipes/afghan-ashak.html">Afghan Ashak</a> or serve it alongside <a href="../recipes/borani-banjan.html">Borani Banjan</a>.</p></section>'
  }
};

let changed = [];
for (const [rel, cfg] of Object.entries(pageUpdates)) {
  let html = read(rel);
  const before = html;
  if (cfg.title) html = replaceTitle(html, cfg.title);
  if (cfg.description) html = replaceMeta(html, 'description', cfg.description);
  if (cfg.ogTitle) html = replaceOg(html, 'og:title', cfg.ogTitle);
  if (cfg.ogDescription) html = replaceOg(html, 'og:description', cfg.ogDescription);
  html = bumpModified(html);
  if (cfg.related) html = appendBeforeMainEnd(html, 'data-seo-pass="20260910"', cfg.related);
  if (html !== before) { write(rel, html); changed.push(rel); }
}

const supportLinks = {
  'guides/southeast-asia-food-guide.html': '<section class="recipe-section seo-related" data-seo-support="20260910-tofu"><h2>Warm Shan breakfast</h2><p>For a lesser-known Burmese breakfast, try <a href="../recipes/burmese-tofu-nway.html">Burmese Tofu Nway</a>, a soft chickpea preparation served warm with savory toppings.</p></section>',
  'guides/himalayas-south-asia-food-guide.html': '<section class="recipe-section seo-related" data-seo-support="20260910-jasha"><h2>A Bhutanese chicken dish</h2><p>Explore <a href="../recipes/bhutanese-jasha-maroo.html">Jasha Maroo</a>, a ginger-, garlic- and chile-forward Bhutanese chicken stew.</p></section>',
  'guides/indigenous-americas-food-guide.html': '<section class="recipe-section seo-related" data-seo-support="20260910-sofkee"><h2>Seminole rice sofkee</h2><p>Read our <a href="../recipes/seminole-rice-sofkee.html">Seminole Rice Sofkee recipe</a> for a simple rice preparation with cultural context and texture guidance.</p></section>',
  'recipes/nepali-momos.html': '<section class="recipe-section seo-related" data-seo-support="20260910-momos"><span class="eyebrow">Serve the meal</span><h2>What goes with momos?</h2><p>Use our <a href="../guides/serve-with/what-to-serve-with-momos.html">guide to what to serve with momos</a> for chutneys, soups, vegetables and other sides.</p></section>',
  'collections/dumplings-around-the-world.html': '<section class="recipe-section seo-related" data-seo-support="20260910-momos-guide"><h2>Planning a momo meal?</h2><p>See <a href="../guides/serve-with/what-to-serve-with-momos.html">what to serve with momos</a> for side dishes, chutneys and soups that fit the table.</p></section>',
  'recipes/regions/horn-northeast-africa/index.html': '<section class="recipe-section seo-related" data-seo-support="20260910-zebhi"><h2>Eritrean greens</h2><p>Try <a href="../../eritrean-zebhi-hamli.html">Zebhi Hamli</a>, a richly seasoned Eritrean greens dish.</p></section>'
};

for (const [rel, block] of Object.entries(supportLinks)) {
  let html = read(rel);
  const before = html;
  const marker = block.match(/data-seo-support="([^"]+)"/)?.[1];
  if (marker && !html.includes(`data-seo-support="${marker}"`)) html = html.replace('</main>', `${block}</main>`);
  if (html !== before) { write(rel, html); changed.push(rel); }
}

function walk(dir){
  for (const ent of fs.readdirSync(dir, {withFileTypes:true})) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(full);
    else if (/\.(html|xml|js|mjs|txt)$/i.test(ent.name)) {
      let txt = fs.readFileSync(full, 'utf8');
      const before = txt;
      txt = txt.replaceAll('http://www.fringetable.com', 'https://fringetable.com');
      txt = txt.replaceAll('http://fringetable.com', 'https://fringetable.com');
      if (txt !== before) {
        fs.writeFileSync(full, txt);
        const rel = path.relative(root, full).replaceAll('\\','/');
        if (!changed.includes(rel)) changed.push(rel);
      }
    }
  }
}
walk(root);

console.log(JSON.stringify({changedCount: changed.length, changed}, null, 2));
