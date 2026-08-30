import fs from 'node:fs/promises';

const recipes = [
  {
    name: 'Haudenosaunee Three Sisters Soup',
    slug: 'haudenosaunee-three-sisters-soup',
    region: 'Haudenosaunee / Indigenous Americas',
    group: 'indigenous-americas',
    type: 'Soup / Main', time: '1 hr', cuisine: 'Haudenosaunee-inspired Indigenous North American', category: 'Soup', yield: '6 servings', prep: 'PT20M', cook: 'PT40M', total: 'PT1H',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/MyPlate%20gov%20Cultural%20Food%20%2820241025-USDA-FNS-UNK-0091%29.jpg?width=1400',
    imageAlt: 'Three Sisters soup with corn, beans and squash',
    summary: 'A practical home adaptation centered on corn, beans and squash, the crops Haudenosaunee communities call the Three Sisters.',
    lead: 'Corn, beans and squash simmered into a nourishing soup that keeps the Three Sisters at the center of the bowl.',
    about: `The Three Sisters—corn, beans and squash—are foundational crops in Haudenosaunee foodways. The National Museum of the American Indian documents the three crops as central to Haudenosaunee agriculture and notes that corn soup and succotash remain important foods. This version is a contemporary home-kitchen soup built around those documented ingredients rather than a claim to reproduce one family’s or nation’s ceremonial recipe.`,
    storyTitle: 'Three crops that work together in the field and at the table',
    story: `Haudenosaunee agricultural knowledge pairs corn, beans and squash because each plant supports the others: corn provides a climbing structure, beans contribute to soil fertility and broad squash leaves help shade the ground. Smithsonian resources also emphasize that the three foods complement one another nutritionally. The phrase “Three Sisters” carries cultural meaning beyond a recipe name, so this page keeps the framing specific and avoids presenting one modern soup as the definitive Haudenosaunee preparation.`,
    caveat: 'Haudenosaunee nations and households have distinct food traditions. This is explicitly a modern home adaptation using documented staple crops, not a ceremonial formula.',
    prepNotes: [
      ['Use cooked beans', 'Cooked or canned beans keep the timing aligned with the squash. Rinse canned beans well before adding.'],
      ['Cut the squash evenly', 'One-inch cubes soften without disappearing. Smaller pieces can dissolve into the broth.'],
      ['Keep the seasoning restrained', 'The corn, beans and squash should remain recognizable. Add salt gradually and let the vegetables carry the bowl.']
    ],
    ingredients: ['2 tbsp sunflower or neutral oil','1 medium yellow onion, diced (a contemporary home-kitchen aromatic)','2 garlic cloves, minced (optional)','4 cups peeled winter squash, cut in 1-inch cubes','2 cups cooked corn kernels or drained hominy','3 cups cooked cranberry, kidney or white beans, drained','6 cups unsalted vegetable stock or water','1 tsp kosher salt, plus more to taste','1/2 tsp black pepper, optional','1 tbsp maple syrup, optional, for a subtle finishing sweetness','2 tbsp chopped scallion or parsley, optional garnish'],
    steps: [
      ['Soften the aromatics.', 'Heat the oil in a heavy soup pot over medium heat. Add onion and cook 5–7 minutes until translucent but not browned. Add garlic, if using, for 30 seconds.'],
      ['Start the squash.', 'Add squash, stock and 1/2 teaspoon salt. Bring just to a boil, then lower to a steady simmer for 12–15 minutes. Checkpoint: a knife should enter the outside of a squash cube but still meet resistance in the center.'],
      ['Add corn and beans.', 'Stir in corn and beans. Return to a gentle simmer and cook 12–15 minutes. Avoid aggressive boiling, which can break the beans and turn the squash ragged.'],
      ['Create a little body.', 'Press about 1 cup of beans and squash against the side of the pot with a spoon, then stir them back in. Checkpoint: the broth should look lightly thickened while most vegetables remain intact.'],
      ['Balance the bowl.', 'Season with the remaining salt and black pepper if using. Add maple syrup only if the squash and corn need a touch of sweetness; it should not make the soup taste sugary.'],
      ['Rest before serving.', 'Turn off the heat and rest 10 minutes. The broth will gain body as the starches settle. Serve warm with optional scallion or parsley.']
    ],
    sources: [
      ['National Museum of the American Indian — Haudenosaunee Guide for Educators','https://americanindian.si.edu/sites/1/files/pdf/education/HaudenosauneeGuide.pdf'],
      ['Smithsonian Folklife — Three Sisters food context','https://festival.si.edu/blog/native-recipe-three-sisters-salad'],
      ['Fringe Table — Indigenous Americas foodways guide','../guides/indigenous-americas-food-guide.html']
    ],
    credit: ['USDA Food and Nutrition Service photograph via Wikimedia Commons (public-domain U.S. government work)','https://commons.wikimedia.org/wiki/File:MyPlate_gov_Cultural_Food_(20241025-USDA-FNS-UNK-0091).jpg'],
    sourcing: null
  },
  {
    name: 'Haitian Griot', slug: 'haitian-griot', region: 'Haiti / Caribbean', group: 'caribbean-lowcountry', type: 'Main', time: '5 hrs 15 min', cuisine: 'Haitian', category: 'Main dish', yield: '6 servings', prep: 'PT4H20M', cook: 'PT55M', total: 'PT5H15M',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Griot%20ha%C3%AFtien.jpg?width=1400', imageAlt: 'Haitian griot fried pork served on a plate',
    summary: 'Citrus- and epis-marinated pork shoulder braised until tender, then fried until the edges turn deeply crisp.',
    lead: 'Tender citrus-seasoned pork with crisp caramelized edges—the double-cooked Haitian favorite made for pikliz and plantains.',
    about: `Griot is a Haitian pork preparation built around contrast: pork shoulder is seasoned with citrus and aromatics, cooked until tender, then fried so the exterior becomes crisp while the center stays juicy. Haitian epis is an especially useful flavor base here, and pikliz—the sharp, chile-hot pickled cabbage condiment—is the classic counterpoint to the rich pork.`,
    storyTitle: 'A celebration dish with a deliberate second cook',
    story: `Haitian cooks commonly serve griot for parties, holidays and fritay spreads. Food Network’s Widza Gustin describes the classic sequence of citrus seasoning, epis, gentle cooking and frying, while Haitian cooking sources likewise document the tender-then-fry method. The final fry is not a shortcut: it is what creates the characteristic browned shell around already-tender pork.`,
    caveat: 'Marinades, citrus choices, epis formulas and frying methods vary among Haitian households and across the diaspora. This version is designed for a repeatable home-kitchen result.',
    prepNotes: [
      ['Use pork shoulder', 'Its fat and connective tissue tolerate the braise-and-fry sequence better than lean pork loin.'],
      ['Marinate ahead', 'Four hours gives the epis and citrus time to season the pork. Overnight is fine; keep it refrigerated.'],
      ['Dry before frying', 'Moist pork spits violently in hot oil and browns poorly. Drain and blot the cooked pieces thoroughly.']
    ],
    ingredients: ['3 lb boneless pork shoulder, cut into 1 1/2-inch cubes','1/2 cup Haitian epis','1/3 cup sour orange juice, or 1/4 cup orange juice plus 2 tbsp lime juice','2 tbsp white or apple cider vinegar','1 tsp kosher salt','1/2 tsp black pepper','3 thyme sprigs','1 Scotch bonnet or habanero pepper, pierced once and left whole, optional','1 1/2 cups water, plus more if needed','Neutral frying oil, about 2 cups for shallow frying','Pikliz, for serving','Fried green plantains or rice and beans, for serving'],
    steps: [
      ['Marinate the pork.', 'Combine pork, epis, citrus juice, vinegar, salt, pepper and thyme. Add the whole Scotch bonnet if using. Cover and refrigerate at least 4 hours or overnight.'],
      ['Begin the braise.', 'Transfer everything to a heavy pot and add 1 1/2 cups water. Bring to a simmer, cover partially and cook 35–45 minutes, stirring occasionally.'],
      ['Cook until truly tender.', 'Continue gently until a fork slides into the pork with little resistance. Add small splashes of water if the pot dries before the meat softens. Checkpoint: the pork should be tender enough to eat before it ever touches frying oil.'],
      ['Reduce the cooking liquid.', 'Lift the pork to a tray. Remove the whole chile. Simmer the remaining liquid 5–10 minutes until concentrated; reserve it as a spoonable sauce if desired.'],
      ['Dry the pork.', 'Blot each piece thoroughly with paper towels and let steam escape for 10 minutes. Checkpoint: the exterior should look dry, not glossy with braising liquid.'],
      ['Fry in batches.', 'Heat 1 to 1 1/2 inches of neutral oil to about 350°F. Fry pork in small batches 2–4 minutes, turning, until deeply golden with crisp edges. Do not crowd the pan.'],
      ['Drain and season.', 'Move fried pork to a rack or paper-lined tray. Taste one piece and add a small pinch of salt only if needed.'],
      ['Serve immediately.', 'Pile griot with pikliz and fried plantains, or add it to a larger fritay-style spread. The acidic, spicy pikliz is part of the balance, not an afterthought.']
    ],
    sources: [
      ['Food Network — Widza Gustin’s Haitian griot context and method','https://www.foodnetwork.com/recipes/food-network-kitchen/griot-20290286'],
      ['HaitianCooking.com — Haitian fried pork (griot)','https://haitiancooking.com/recipe/fried-pork-griot/'],
      ['Fringe Table — Haitian Epis Essential','../subrecipes/haitian-epis.html'],
      ['Fringe Table — Haitian food guide','../guides/caribbean-lowcountry-food-guide.html']
    ],
    credit: ['Lëa-Kim Châteauneuf, Wikimedia Commons, CC BY-SA 4.0','https://commons.wikimedia.org/wiki/File:Griot_ha%C3%AFtien.jpg'],
    sourcing: null
  },
  {
    name: 'Burmese Ohn No Khao Swe', slug: 'burmese-ohn-no-khao-swe', region: 'Myanmar / Southeast Asia', group: 'southeast-asia', type: 'Soup / Noodles', time: '1 hr 20 min', cuisine: 'Burmese / Myanmar', category: 'Noodle soup', yield: '6 servings', prep: 'PT30M', cook: 'PT50M', total: 'PT1H20M',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Ohn%20No%20Khao%20Sw%C3%A8.jpg?width=1400', imageAlt: 'Burmese Ohn No Khao Swe coconut chicken noodle soup',
    summary: 'Wheat noodles in a turmeric-gold coconut chicken broth thickened with chickpea flour and finished with lime, egg and crisp toppings.',
    lead: 'A coconut chicken noodle soup with a silky chickpea-thickened broth and a table full of crunchy, sharp and spicy finishes.',
    about: `Ohn no khao swe literally points to coconut milk and noodles. The Myanmar bowl combines wheat noodles with chicken in a coconut-based broth, commonly thickened with chickpea flour, then relies on toppings such as egg, onion, lime, chile and crisp noodles for contrast. The broth should feel creamy and savory rather than heavy or aggressively spicy.`,
    storyTitle: 'A Myanmar noodle bowl built as much at the table as at the stove',
    story: `Myanmar’s state media describes coconut milk noodles as a traditional dish served at festive gatherings and as a popular breakfast, while Burmese-focused cookbooks and SBS document the same defining structure: wheat noodles, chicken, coconut milk, chickpea flour and a customizable set of toppings. Related coconut-noodle dishes traveled through South and Southeast Asia, but this page keeps the focus on the Myanmar preparation rather than collapsing those cousins into one recipe.`,
    caveat: 'Household versions differ in broth thickness, chicken preparation and toppings. Some use fritters or fish cakes; others are simpler. This version keeps the core bowl practical for a home kitchen.',
    prepNotes: [
      ['Toast the chickpea flour', 'A few minutes in a dry pan removes the raw flour taste and adds a nutty aroma.'],
      ['Keep coconut heat gentle', 'Once coconut milk is in the pot, avoid a hard rolling boil. Gentle heat keeps the broth smoother.'],
      ['Prepare toppings first', 'The noodles and broth wait poorly. Have egg, onion, lime, herbs and crisp noodles ready before assembly.']
    ],
    ingredients: ['1/4 cup chickpea flour (besan)','2 tbsp peanut or neutral oil','1 large yellow onion, finely chopped','5 garlic cloves, minced','1 tbsp grated ginger','1 tsp ground turmeric','1 tsp mild paprika or chile powder','1 1/2 lb boneless skinless chicken thighs, cut bite-size','2 tbsp fish sauce, plus more to taste','5 cups low-sodium chicken stock','1 can (13.5 oz) full-fat coconut milk','1 lb fresh or 12 oz dried wheat egg noodles','3 hard-boiled eggs, halved','1 small red onion, sliced very thin','1 cup cilantro leaves','2 limes, cut in wedges','Chile oil or crushed dried chile, for serving','1 cup crisp fried noodles or crushed chickpea fritters, optional'],
    steps: [
      ['Toast the chickpea flour.', 'Put the flour in a dry skillet over medium-low heat and stir constantly 4–5 minutes until it smells nutty and turns slightly deeper in color. Transfer to a bowl to cool.'],
      ['Build the aromatic base.', 'Heat oil in a soup pot. Cook onion 7–9 minutes until soft and lightly golden. Add garlic, ginger, turmeric and paprika; cook 1 minute until fragrant.'],
      ['Cook the chicken.', 'Add chicken and fish sauce. Stir 3–4 minutes so the pieces lose their raw exterior and become coated in the yellow aromatic base.'],
      ['Add stock and simmer.', 'Pour in 4 cups stock, bring to a gentle simmer and cook 12–15 minutes. Checkpoint: chicken should be cooked through and tender, with no pink center.'],
      ['Make a smooth slurry.', 'Whisk toasted chickpea flour with the remaining 1 cup cool stock until completely smooth, then slowly whisk it into the soup. Simmer 8–10 minutes, stirring along the bottom.'],
      ['Add coconut milk gently.', 'Lower the heat and stir in coconut milk. Warm 5 minutes without a hard boil. Checkpoint: the broth should lightly coat a spoon but still pour easily around noodles.'],
      ['Cook the noodles separately.', 'Boil noodles according to package directions until springy and just tender. Drain well and divide among six bowls.'],
      ['Taste the broth.', 'Adjust with fish sauce and a squeeze of lime if needed. The broth should be savory, lightly sweet from coconut and aromatic, not flat or floury.'],
      ['Assemble immediately.', 'Ladle chicken and broth over noodles. Add egg, sliced red onion, cilantro, chile and crisp noodles or fritter pieces.'],
      ['Finish at the table.', 'Serve lime wedges and extra chile alongside so each person can sharpen and heat the bowl to taste.']
    ],
    sources: [
      ['The Global New Light of Myanmar — traditional coconut milk noodles','https://www.moi.gov.mm/nlm/file-download/download/public/5108'],
      ['SBS Food — Coconut milk noodles (ohn-no khaut swe)','https://www.sbs.com.au/food/recipe/coconut-milk-noodles-ohn-no-khaut-swe/kx1ippkx9'],
      ['Naomi Duguid, Burma — Coconut Sauce Noodles overview','https://app.ckbk.com/recipe/burm54139c10s001r003/coconut-sauce-noodles'],
      ['Fringe Table — Southeast Asia food guide','../guides/southeast-asia-food-guide.html']
    ],
    credit: ['Rajdeep Das, Wikimedia Commons, CC BY-SA 4.0','https://commons.wikimedia.org/wiki/File:Ohn_No_Khao_Sw%C3%A8.jpg'],
    sourcing: ['Burmese-style wheat or egg noodles','chickpea flour besan']
  }
];

const esc = s => String(s).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const amazon = q => `https://www.amazon.com/s?k=${encodeURIComponent(q)}&tag=fringetable-20`;
function recipeHtml(r){
  const schema={"@context":"https://schema.org","@type":"Recipe",name:r.name,description:r.summary,image:[r.image],recipeCuisine:r.cuisine,recipeCategory:r.category,recipeYield:r.yield,prepTime:r.prep,cookTime:r.cook,totalTime:r.total,recipeIngredient:r.ingredients,recipeInstructions:r.steps.map(x=>({"@type":"HowToStep",text:`${x[0]} ${x[1]}`})),author:{"@type":"Organization",name:"Fringe Table"},datePublished:"2026-08-30",dateModified:"2026-08-30",mainEntityOfPage:`https://fringetable.com/recipes/${r.slug}.html`};
  const sourcing=r.sourcing?`<section class="recipe-section ingredient-sourcing"><span class="eyebrow">Ingredient sourcing</span><h2>Worth finding before you cook</h2><p class="affiliate-inline-disclosure">As an Amazon Associate I earn from qualifying purchases. Some links below are affiliate links; if you buy through them, Fringe Table may earn a commission at no additional cost to you.</p><p>These are included only because they can be harder to find in a standard supermarket.</p><div class="shop-links">${r.sourcing.map(q=>`<a href="${amazon(q)}" target="_blank" rel="sponsored nofollow noopener">Find ${esc(q)} on Amazon <span>↗</span></a>`).join('')}</div></section>`:'';
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(r.name)} Recipe | Fringe Table</title><meta name="description" content="${esc(r.summary)}"><meta name="robots" content="index,follow,max-image-preview:large"><link rel="canonical" href="https://fringetable.com/recipes/${r.slug}.html"><meta property="og:title" content="${esc(r.name)} — Fringe Table"><meta property="og:description" content="${esc(r.summary)}"><meta property="og:type" content="article"><meta property="og:url" content="https://fringetable.com/recipes/${r.slug}.html"><meta property="og:image" content="${r.image}"><link rel="stylesheet" href="../assets/css/styles.css?v=20260830"><link rel="stylesheet" href="../assets/css/rebuild.css?v=20260830"><script type="application/ld+json">${JSON.stringify(schema)}</script></head><body><header class="site-header"><div class="nav-container"><a class="logo" href="../index.html"><span class="logo-mark">✦</span><span>Fringe</span><b>Table</b><small>RECIPES FROM THE CULINARY MARGINS</small></a><button class="menu-toggle" type="button" aria-label="Open navigation" aria-expanded="false">Menu</button><nav><ul><li><a href="../index.html#regions">Regions</a></li><li><a href="../recipes/index.html">Recipes</a></li><li><a href="../subrecipes/index.html">Essentials</a></li><li><a href="../about.html">About</a></li></ul></nav><button class="search-trigger" type="button">⌕ Search</button><a class="nav-surprise" data-surprise href="../recipes/grape-dumplings.html">Surprise me</a></div></header><main class="recipe-page"><a class="back-link" href="../recipes/index.html">← All recipes</a><section class="recipe-hero"><div><span class="eyebrow">${esc(r.region)}</span><h1>${esc(r.name)}</h1><p class="recipe-meta">${esc(r.type)} · ${esc(r.time)} · ${esc(r.yield)}</p><p class="recipe-lead">${esc(r.lead)}</p></div><img src="${r.image}" alt="${esc(r.imageAlt)}" width="1200" height="900" referrerpolicy="no-referrer"></section><section class="recipe-section"><span class="eyebrow">Fringe Table adaptation</span><h2>About this dish</h2><p>${esc(r.about)}</p></section><section class="recipe-section story-note"><span class="eyebrow">Story & history</span><h2>${esc(r.storyTitle)}</h2><p>${esc(r.story)}</p><p class="story-caveat">${esc(r.caveat)}</p></section><section class="recipe-section"><span class="eyebrow">Before you begin</span><h2>Preparation notes</h2><div class="prep-grid">${r.prepNotes.map(([h,p])=>`<div><strong>${esc(h)}</strong><p>${esc(p)}</p></div>`).join('')}</div></section><section class="recipe-section"><span class="eyebrow">Cook it</span><h2>Ingredients &amp; detailed method</h2><div class="recipe-columns"><div><h3>Ingredients</h3><ul>${r.ingredients.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div><div><h3>Method</h3><ol class="method-list detailed-static">${r.steps.map(([h,p],i)=>`<li><strong>${i+1}.</strong><span><b>${esc(h)}</b> ${esc(p)}</span></li>`).join('')}</ol></div></div></section>${sourcing}<section class="recipe-section source-note"><span class="eyebrow">Sources &amp; context</span><h2>Read further</h2><ul>${r.sources.map(([t,u])=>`<li><a href="${u}"${u.startsWith('http')?' target="_blank" rel="noopener"':''}>${esc(t)}</a></li>`).join('')}<li><a href="${r.credit[1]}" target="_blank" rel="noopener">Photo: ${esc(r.credit[0])}</a></li></ul></section></main><footer class="footer"><div class="footer-inner"><div><a class="logo" href="../index.html"><span>Fringe</span><b>Table</b></a><p>Cook with curiosity.</p></div><div class="footer-links"><a href="../recipes/index.html">Recipes</a><a href="../about.html">About</a><a href="../privacy.html">Privacy</a><a href="../affiliate-disclosure.html">Affiliate Disclosure</a></div></div></footer><div class="modal" aria-hidden="true"><div class="modal-panel"><button class="close" type="button">×</button><span class="eyebrow">Search the collection</span><h2>Find a dish.</h2><input id="siteSearch" type="search" placeholder="Search recipes, regions, ingredients…"><div class="search-results"><p>Start typing a dish or region.</p></div></div></div><script src="../assets/js/site.js?v=20260830a"></script></body></html>`;
}

for (const r of recipes) await fs.writeFile(`recipes/${r.slug}.html`, recipeHtml(r));

const cards=recipes.map(r=>({name:r.name,region:r.region,slug:r.slug,group:r.group,type:r.type,time:r.time,image:r.image,summary:r.summary,story:r.story,sourcing:r.sourcing||[]}));
let core=await fs.readFile('assets/js/site-core.js','utf8');
for(const r of cards){if(!core.includes(`slug:\"${r.slug}\"`)&&!core.includes(`\"slug\":\"${r.slug}\"`)){core=core.replace('const catalog=[',`const catalog=[${JSON.stringify(r)},`)}}
await fs.writeFile('assets/js/site-core.js',core);

let site=await fs.readFile('assets/js/site.js','utf8');
const daily=`const DAILY_RECIPES=${JSON.stringify(cards)};`;
if(/const DAILY_RECIPES=\[[\s\S]*?\];\s*const RECOVERED_RECIPES=/.test(site)) site=site.replace(/const DAILY_RECIPES=\[[\s\S]*?\];\s*const RECOVERED_RECIPES=/,`${daily}\nconst RECOVERED_RECIPES=`);
await fs.writeFile('assets/js/site.js',site);

let sitemap=await fs.readFile('sitemap.xml','utf8');
for(const r of recipes){const u=`https://fringetable.com/recipes/${r.slug}.html`;if(!sitemap.includes(u))sitemap=sitemap.replace('</urlset>',`  <url><loc>${u}</loc><lastmod>2026-08-30</lastmod></url>\n</urlset>`)}
await fs.writeFile('sitemap.xml',sitemap);

for(const path of ['index.html','recipes/index.html']){let t=await fs.readFile(path,'utf8');t=t.replace(/36 lesser-known/g,'39 lesser-known').replace(/all 36 Fringe Table recipes/g,'all 39 Fringe Table recipes').replace(/<span data-recipe-count>36<\/span>/g,'<span data-recipe-count>39</span>');await fs.writeFile(path,t)}

let expansion=await fs.readFile('CONTENT_EXPANSION.md','utf8');
expansion=expansion.replace('| Indigenous Americas | 3 | 20 | 17 |','| Indigenous Americas | 4 | 20 | 16 |').replace('| Caribbean & Lowcountry | 3 | 20 | 17 |','| Caribbean & Lowcountry | 4 | 20 | 16 |').replace('| Southeast Asia | 4 | 20 | 16 |','| Southeast Asia | 5 | 20 | 15 |').replace('Total expansion needed: **104 recipes**.','Total expansion needed: **101 recipes**.');
await fs.writeFile('CONTENT_EXPANSION.md',expansion);

console.log('Expansion batch published:', recipes.map(r=>r.slug).join(', '));
