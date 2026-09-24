import fs from 'node:fs';

const date = '2026-09-24';

const pages = [
  {
    slug: 'senegalese-chicken-yassa',
    description: 'Senegalese chicken yassa with lemon-mustard marinated chicken, browned over high heat and finished in a deeply softened onion sauce.',
    lead: 'Lemon-mustard marinated chicken is browned over fierce heat, then nestled into a generous sauce of slowly softened onions.',
    meta: 'Main · 5 hrs 30 min · 6 servings',
    prepTime: 'PT4H20M',
    cookTime: 'PT1H10M',
    totalTime: 'PT5H30M',
    catalogTime: '5 hrs 30 min, including marinating',
    catalogStory: 'Yassa is closely associated with Senegal and is often traced to Casamance, where fish and chicken versions both belong to the living tradition. The dish is defined less by a rigid ingredient list than by a sequence: citrus-and-onion marination, high-heat browning, and patient cooking that turns a large volume of onions into a sharp-sweet sauce. Mustard, olives, carrots, chile and sweetness vary by cook and occasion.',
    about: `<p>Chicken yassa is built from a short list of ingredients used in distinct stages. Chicken first marinates with lemon, mustard, garlic and some of the onions; high heat then gives the meat the browned flavor that a gentle braise cannot; finally, a large volume of onions cooks down into the sauce.</p><p>The onions should become supple and glossy rather than deeply caramelized. Their sweetness balances the lemon, but the finished sauce should remain savory and distinctly tart. White rice is the usual practical partner because it absorbs that sauce.</p>`,
    story: `<p>Yassa is closely associated with Senegal and is often traced to the southern Casamance region. Senegalese sources describe both fish and chicken versions, with citrus, mustard and abundant onions forming the recognizable structure. The dish now appears at family tables, restaurants and gatherings throughout Senegal and across the diaspora.</p><p>Food historian Jessica B. Harris has written about encountering chicken yassa in Senegal and emphasizes the combination of lemon, onion, chile and browned chicken. What looks like a simple onion braise depends on timing: marination seasons the meat, grilling or broiling adds smoke and color, and the onions need patience to lose their raw edge without becoming jammy-sweet.</p><p class="story-caveat">There is no single fixed yassa formula. Mustard quantity, olives, carrots, chile and whether the chicken is grilled, fried or browned in a pan vary by region and household. This is a practical home version that preserves the marinate-brown-braise sequence.</p>`,
    notes: [
      ['Slice onions evenly', 'A mandoline is useful, but use its guard. Even slices soften at the same rate and make a cohesive sauce.'],
      ['Marinate under refrigeration', 'Citrus adds flavor but does not make raw chicken safe. Keep the chicken cold and cook every drop of reserved marinade.'],
      ['Brown before braising', 'A grill or broiler supplies the charred notes associated with yassa without requiring the onions to scorch.'],
      ['Control the chile', 'Leave the Scotch bonnet whole for fragrance and mild heat, or slit it carefully for a hotter sauce.']
    ],
    ingredients: [
      '1 whole chicken (3 1/2–4 pounds), cut into 8 bone-in pieces',
      '6 large yellow onions (about 3 pounds), thinly sliced',
      '1/2 cup fresh lemon juice (from 4–5 lemons)',
      '2 tablespoons Dijon mustard',
      '4 garlic cloves, finely grated or minced',
      '1 Scotch bonnet or habanero chile, left whole or slit, optional',
      '2 teaspoons kosher salt, plus more to taste',
      '1 teaspoon freshly ground black pepper',
      '1 bay leaf',
      '1/4 cup neutral oil, divided',
      '1/2 cup unsalted chicken stock or water, plus more if needed',
      '1/2 cup pitted green olives, optional',
      'Steamed white rice, for serving'
    ],
    steps: [
      'Whisk the lemon juice, mustard, garlic, salt and black pepper in a nonreactive bowl. Add the chicken, half of the sliced onions, the bay leaf and the optional chile; turn everything until evenly coated.',
      'Cover and refrigerate for at least 4 hours and up to 12 hours, turning once if convenient. Do not marinate at room temperature.',
      'Lift out the chicken and scrape the onions back into the bowl. Transfer the chicken to a rack and drain the onions in a colander set over the marinade; keep both the onions and marinade refrigerated until needed.',
      'Heat a grill for two-zone cooking or set a broiler rack 6 inches from the element. Pat excess marinade from the chicken, brush with 1 tablespoon oil and brown 6–8 minutes per side. The pieces need strong color but do not have to be cooked through yet.',
      'Checkpoint: the chicken skin should have dark golden patches without a burnt lemon coating. Move flare-ups away from direct heat, or lower the broiler rack if the surface blackens too quickly.',
      'Heat the remaining 3 tablespoons oil in a wide Dutch oven over medium heat. Add all drained and fresh onions and cook 25–35 minutes, stirring often, until collapsed, translucent and pale gold.',
      'Pour in the reserved marinade and 1/2 cup stock. Bring to a full boil for 2 minutes, scraping the bottom, then lower to a steady simmer for 5 minutes.',
      'Nestle the browned chicken into the onions, skin side up. Cover and simmer gently for 20 minutes, then uncover and cook 10–20 minutes more, turning the pieces once if necessary.',
      'Checkpoint: the thickest part of each piece should register at least 165°F / 74°C, the joints should move easily and the onion sauce should mound softly on a spoon. Transfer any finished breast pieces out early while legs continue cooking.',
      'Add the optional olives for the final 5 minutes. If the sauce is watery, remove the chicken and simmer the onions uncovered; if it catches, add stock 1 tablespoon at a time.',
      'Remove the bay leaf and whole chile. Taste for salt and lemon—the sauce should be savory, onion-sweet and clearly tart—then rest the chicken in the sauce for 10 minutes.',
      'Serve over steamed white rice with plenty of onions and sauce spooned around each piece.'
    ],
    related: `<section class="recipe-section"><span class="eyebrow">Keep exploring Senegal</span><h2>Build a Senegalese table</h2><div class="essential-grid"><a class="essential-card" href="senegalese-ceebu-jen-thieboudienne.html"><strong>Ceebu Jën</strong><span>Rice, fish and vegetables in Senegal’s landmark one-pot dish.</span><b>Cook next →</b></a><a class="essential-card" href="senegalese-mafe.html"><strong>Senegalese Mafé</strong><span>A peanut-enriched stew with a different kind of slow-built depth.</span><b>Cook next →</b></a></div></section>`,
    sources: [
      `<li><a href="https://www.heritage.sn/articles/le-yassa-histoire-recette-et-secrets-du-plat-marine-de-casamance" target="_blank" rel="noopener">Heritage Sénégal — yassa history, Casamance context and technique</a></li>`,
      `<li><a href="https://www.foodnetwork.com/recipes/senegalese-chicken-yassa-recipe-1964241" target="_blank" rel="noopener">Food Network — Senegalese Chicken Yassa by Jessica B. Harris</a></li>`,
      `<li><a href="https://www.washingtonpost.com/recipes/senegalese-chicken-yassa/" target="_blank" rel="noopener">The Washington Post — Senegalese Chicken Yassa by Jessica B. Harris</a></li>`,
      `<li><a href="../guides/maghreb-west-africa-food-guide.html">Fringe Table — Maghreb &amp; West Africa food guide</a></li>`,
      `<li><a href="https://commons.wikimedia.org/wiki/File:Senegalese_Yassa.JPG" target="_blank" rel="noopener">Photo: Kinesira, Wikimedia Commons, CC BY-SA 4.0</a></li>`
    ]
  },
  {
    slug: 'nigerian-jollof-rice',
    description: 'Nigerian jollof rice steamed in a reduced red-pepper tomato stew, with separate grains, deep color and an optional party-style smoky finish.',
    lead: 'Parboiled long-grain rice steams in a concentrated red-pepper and tomato stew until every grain carries color, spice and savory depth.',
    meta: 'Rice / Main · 1 hr 55 min · 6–8 servings',
    prepTime: 'PT25M',
    cookTime: 'PT1H30M',
    totalTime: 'PT1H55M',
    recipeYield: '6–8 servings',
    catalogTime: '1 hr 55 min',
    catalogStory: 'Jollof belongs to a wider West African family whose name is linked to the historic Jolof/Wolof world, while Nigerian jollof has its own techniques, seasonings and social life. Pan-Atlantic University’s Centenary Project describes party jollof as a celebration staple across Nigerian communities and identifies wood-fire smoke as a defining quality. This home method pursues depth through a fully reduced pepper base, a tightly sealed steam and an optional controlled toast on the stove.',
    about: `<p>Nigerian jollof begins with a blended base of red pepper, tomato, onion and chile cooked until its raw wateriness is gone. Tomato paste is fried separately for concentration, then thyme, Nigerian-style curry powder and bay build the stew in which parboiled long-grain rice steams.</p><p>The amount of stock is a starting point rather than an absolute: tomatoes and peppers hold different amounts of water, and brands of parboiled rice absorb differently. The useful visual target is liquid that sits level with—not far above—the rice before the pot is sealed.</p>`,
    story: `<p>Jollof is a West African rice family with important Senegalese, Gambian, Ghanaian, Nigerian and other national and regional expressions. Its name is commonly linked to the historic Jolof Empire, but that shared lineage does not make the modern styles interchangeable.</p><p>Pan-Atlantic University’s Centenary Project describes Nigerian party jollof as a dish that crosses ethnic groups and anchors celebrations, especially in Lagos. The smoke from large wood-fired pots is part of that version’s appeal. At home, reduction and steam matter more than trying to burn the rice: a concentrated stew gives depth, while a short, controlled toast at the end can add a gentle smoky edge.</p><p class="story-caveat">Nigerian cooks disagree productively about fresh tomato, stock cubes, butter, ginger, curry blends and the desired bottom crust. This recipe is one party-style home method, not a single national standard or a verdict in the familiar “jollof wars.”</p>`,
    notes: [
      ['Reduce the blend first', 'Separately reducing the watery pepper-tomato purée shortens the final fry and prevents pale, soupy rice.'],
      ['Choose parboiled long-grain rice', 'It tolerates the long covered steam and stays more separate than softer varieties. Do not substitute instant rice.'],
      ['Seal the pot tightly', 'A sheet of foil or parchment under the lid traps steam; opening repeatedly makes the top grains cook unevenly.'],
      ['Treat smoke as optional', 'Wood-fire party jollof has a character a home stovetop cannot exactly reproduce. Concentration matters more than scorching.']
    ],
    ingredients: [
      '2 large red bell peppers, seeded and roughly chopped',
      '4 plum tomatoes, cored and roughly chopped',
      '2 medium yellow onions, divided',
      '1 Scotch bonnet or habanero chile, stemmed, optional',
      '4 garlic cloves',
      '1-inch piece fresh ginger, peeled',
      '1/3 cup neutral oil',
      '3 tablespoons tomato paste',
      '1 teaspoon dried thyme',
      '1 teaspoon Nigerian-style curry powder',
      '1 teaspoon sweet or smoked paprika, optional',
      '2 bay leaves',
      '3 cups long-grain parboiled rice, rinsed until the water is nearly clear and drained',
      '2 1/2 cups hot low-sodium chicken or vegetable stock, plus up to 1/2 cup more if needed',
      '1 1/2 teaspoons kosher salt, plus more to taste',
      '1 tablespoon unsalted butter, optional'
    ],
    steps: [
      'Blend the bell peppers, tomatoes, one onion, Scotch bonnet, garlic and ginger until smooth. Work in batches if necessary rather than adding water.',
      'Pour the blend into a wide saucepan and bring to a lively simmer. Cook uncovered 20–30 minutes, stirring more often as it thickens, until reduced by about half.',
      'Checkpoint: dragging a spoon across the pan should leave a path for a moment, and the mixture should smell sweet and peppery rather than raw or grassy.',
      'Meanwhile, thinly slice the remaining onion. Heat the oil in a heavy 5- to 6-quart pot over medium heat; cook the onion 5–7 minutes until soft and lightly gold.',
      'Add the tomato paste and fry 4–5 minutes, stirring and scraping, until it darkens to brick red and the oil takes on its color. Do not let the paste turn black.',
      'Stir in the reduced pepper base, thyme, curry powder, optional paprika, bay leaves and salt. Fry 10–15 minutes, stirring frequently, until the stew is thick and small beads of oil appear at the edges.',
      'Stir in the well-drained rice until every grain is coated. Add 2 1/2 cups hot stock and bring to a strong simmer, scraping once to release any rice stuck to the bottom.',
      'Checkpoint: the liquid should sit approximately level with the rice. Add extra hot stock only if the rice projects well above it; too much liquid produces soft, clumped grains.',
      'Cover the pot with foil or parchment, then the lid. Reduce the heat to the lowest setting and steam without opening for 30 minutes.',
      'Open once and taste grains from the top and center. If they are firm and the pot is dry, sprinkle in 1/4 cup hot stock, reseal and steam 10–15 minutes more.',
      'Checkpoint: the rice should be tender and separate, with no wet sauce at the bottom. For an optional party-style toasted note, leave the sealed pot over medium-low heat for 3–5 minutes, stopping when it smells nutty, not acrid.',
      'Turn off the heat. Dot with optional butter, reseal and rest 10 minutes; remove the bay leaves, then fluff from the sides toward the center without mashing the grains.',
      'Serve with fried plantain, salad, moi moi, grilled meat or fish. Cool leftovers promptly in shallow containers and refrigerate.'
    ],
    related: `<section class="recipe-section"><span class="eyebrow">Nigerian table</span><h2>Pair and compare</h2><div class="essential-grid"><a class="essential-card" href="nigerian-moi-moi.html"><strong>Nigerian Moi Moi</strong><span>Steamed bean pudding that often shares a celebration plate with jollof.</span><b>Cook next →</b></a><a class="essential-card" href="nigerian-beef-suya.html"><strong>Nigerian Beef Suya</strong><span>Yaji-spiced grilled beef for a smoky companion dish.</span><b>Cook next →</b></a><a class="essential-card" href="../collections/rice-recipes.html"><strong>Rice Recipes</strong><span>Compare grain techniques across the Fringe Table collection.</span><b>Explore collection →</b></a></div></section>`,
    sources: [
      `<li><a href="https://artsandculture.google.com/story/nigerian-party-jollof-the-king-of-rice-pan-atlantic-university/FgVBNgJDD3KMJg?hl=en" target="_blank" rel="noopener">Pan-Atlantic University / The Centenary Project — Nigerian Party Jollof</a></li>`,
      `<li><a href="https://www.foodnetwork.com/recipes/food-network-kitchen/nigerian-jollof-rice-19493519" target="_blank" rel="noopener">Food Network — Nigerian Jollof Rice by Gabi Odebode</a></li>`,
      `<li><a href="../guides/maghreb-west-africa-food-guide.html">Fringe Table — Maghreb &amp; West Africa food guide</a></li>`,
      `<li><a href="../collections/rice-recipes.html">Fringe Table — Rice recipes collection</a></li>`,
      `<li><a href="https://commons.wikimedia.org/wiki/File:Nigerian_jollof_rice.jpg" target="_blank" rel="noopener">Photo: Halima Waziri, Wikimedia Commons, CC BY-SA 4.0</a></li>`
    ]
  },
  {
    slug: 'haitian-griot',
    description: 'Haitian griot (griyo): epis- and citrus-marinated pork braised until tender, dried carefully, then fried for crisp caramelized edges.',
    lead: 'Epis and sour citrus season pork shoulder all the way through before a gentle braise and final fry create the defining tender-crisp contrast.',
    meta: 'Main · 5 hrs 45 min · 6 servings',
    prepTime: 'PT4H30M',
    cookTime: 'PT1H15M',
    totalTime: 'PT5H45M',
    catalogTime: '5 hrs 45 min, including marinating',
    catalogStory: 'Griot—griyo in Haitian Kreyòl—is central to Haitian fritay and celebration tables. Smithsonian’s Cooking Up History program describes it as Haiti’s national dish and documents the same structural technique used here: epis and sour-orange seasoning, a covered cook until tender, and a 350°F final fry. Pikliz is not decorative; its sharp chile-vinegar crunch balances the pork’s richness.',
    about: `<p>Griot, or griyo in Haitian Kreyòl, turns pork shoulder into pieces that are tender inside and deeply crisp at the edges. The pork marinates in epis and sour citrus, cooks gently with its aromatics until fork-tender, then is drained and fried only long enough to brown the exterior.</p><p>Sour orange gives the most characteristic citrus profile. When it is unavailable, equal parts fresh orange and lime juice provide sweetness, fragrance and acidity without pretending to be identical. Pikliz and fried plantains make a classic counterpoint to the rich pork.</p>`,
    story: `<p>Griot is a defining dish of Haitian celebration food and of fritay—the family of fried foods sold by vendors and served at gatherings. The Smithsonian’s National Museum of American History has presented griot as Haiti’s national dish in its Cooking Up History program, pairing it with pikliz and documenting epis as the seasoning base.</p><p>The two-stage cook is functional as well as flavorful. Moist heat tenderizes pork shoulder and carries the epis into the meat; draining and drying prepare the surface for a brief fry that creates crisp, caramelized edges without toughening the center. The hot, acidic crunch of pikliz then cuts through the fat.</p><p class="story-caveat">Households vary the citrus, epis, cut size and cooking liquid, and some modern cooks roast or air-fry instead of deep-frying. This method keeps the traditional braise-then-fry structure while offering an oven finish as a clearly labeled alternative.</p>`,
    notes: [
      ['Use pork shoulder', 'Its connective tissue becomes tender during the covered cook and protects the meat during the final high heat.'],
      ['Marinate under refrigeration', 'Sour citrus seasons raw pork but does not sanitize it. Wash hands and surfaces; do not rinse meat in the sink.'],
      ['Dry before frying', 'Wet pork makes hot oil spit and prevents fast browning. A rack and paper towels are worth the extra few minutes.'],
      ['Make pikliz ahead', 'The vinegar-bright cabbage and chile pickle needs time to season and is the essential balance for rich griot.']
    ],
    ingredients: [
      '3 pounds boneless pork shoulder, cut into 1 1/2-inch pieces',
      '3/4 cup Haitian epis',
      '1/2 cup sour orange juice, or 1/4 cup fresh orange juice plus 1/4 cup fresh lime juice',
      '1 small yellow onion, thinly sliced',
      '4 scallions, cut into 2-inch pieces',
      '6 sprigs fresh thyme',
      '1 Scotch bonnet chile, left whole, optional',
      '2 teaspoons kosher salt',
      '1/2 teaspoon freshly ground black pepper',
      '1 cup water, plus more if needed',
      'Neutral high-heat oil, for frying',
      'Haitian pikliz, fried plantains and lime wedges, for serving'
    ],
    steps: [
      'Trim only thick exterior fat from the pork and cut the meat into even 1 1/2-inch pieces so they become tender at the same rate.',
      'Combine the pork, epis, sour orange juice, onion, scallions, thyme, whole chile, salt and black pepper in a nonreactive container. Cover and refrigerate for at least 4 hours and up to 12 hours.',
      'Transfer the pork and all marinade to a wide Dutch oven. Add 1 cup water and bring to a boil, then immediately lower to a gentle simmer.',
      'Cover and cook 45–60 minutes, stirring every 15 minutes. Add a small splash of water if the bottom threatens to dry before the pork is tender.',
      'Checkpoint: a fork should enter easily and the meat should be tender but still hold as cubes. If it resists, continue covered in 10-minute intervals rather than relying on the fryer to tenderize it.',
      'Lift the pork onto a wire rack set over a sheet pan. Remove clinging onion and herbs so they do not burn, blot the pieces thoroughly, and let the surface air-dry for 15 minutes.',
      'Strain the braising liquid into a small saucepan and skim excess fat. Boil 5–10 minutes until slightly concentrated; keep it as a spoonable sauce rather than reducing it to saltiness.',
      'Pour 2 inches of oil into a deep heavy pot, leaving ample headroom, and heat to 350°F / 175°C. Keep the pot uncovered and never add wet pork.',
      'Fry the pork in small batches for 3–5 minutes, turning once, and allow the oil to return to 350°F between batches. Do not crowd the pot.',
      'Checkpoint: the exterior should be mahogany-brown and crisp at the corners while the center remains moist. Transfer to a clean rack, not back to the raw-pork tray.',
      'For an oven alternative, toss the dried pork with 2 tablespoons oil and roast at 450°F / 230°C for 15–20 minutes, turning once, then broil briefly. The surface will be less uniformly crisp than fried griot.',
      'Serve immediately with pikliz, fried plantains and a little reduced cooking liquid. Offer lime only after tasting because the pork is already citrus-seasoned.'
    ],
    related: `<section class="recipe-section"><span class="eyebrow">Build the Haitian plate</span><h2>Essential accompaniments</h2><div class="essential-grid"><a class="essential-card" href="haitian-pikliz.html"><strong>Haitian Pikliz</strong><span>Vinegar-bright cabbage and chile pickle for cutting through the rich pork.</span><b>Make ahead →</b></a><a class="essential-card" href="../subrecipes/haitian-epis.html"><strong>Haitian Epis</strong><span>The fresh herb, pepper and garlic base used in the marinade.</span><b>Open essential →</b></a><a class="essential-card" href="haitian-diri-kole-pwa-rouj.html"><strong>Diri Kole ak Pwa Rouj</strong><span>Haitian red beans and rice for a fuller plate.</span><b>Cook next →</b></a></div></section>`,
    sources: [
      `<li><a href="https://americanhistory.si.edu/sites/default/files/file-uploader/CUH%20Feb%2010%202018%20Griot%20Eggrolls_0.pdf" target="_blank" rel="noopener">Smithsonian National Museum of American History — Cooking Up History: Griot/Griyo</a></li>`,
      `<li><a href="https://www.foodnetwork.com/recipes/food-network-kitchen/griot-20290286" target="_blank" rel="noopener">Food Network — Widza Gustin’s Haitian griot context and method</a></li>`,
      `<li><a href="https://haitiancooking.com/recipe/fried-pork-griot/" target="_blank" rel="noopener">HaitianCooking.com — Haitian fried pork (griot)</a></li>`,
      `<li><a href="../guides/caribbean-lowcountry-food-guide.html">Fringe Table — Caribbean &amp; Lowcountry food guide</a></li>`,
      `<li><a href="https://commons.wikimedia.org/wiki/File:Griot_ha%C3%AFtien.jpg" target="_blank" rel="noopener">Photo: Lëa-Kim Châteauneuf, Wikimedia Commons, CC BY-SA 4.0</a></li>`
    ]
  }
];

const escapeHtml = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

for (const recipe of pages) {
  const file = `recipes/${recipe.slug}.html`;
  let html = fs.readFileSync(file, 'utf8');
  const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  if (!match) throw new Error(`${file}: missing Recipe JSON-LD`);
  const data = JSON.parse(match[1]);
  data.description = recipe.description;
  data.prepTime = recipe.prepTime;
  data.cookTime = recipe.cookTime;
  data.totalTime = recipe.totalTime;
  if (recipe.recipeYield) data.recipeYield = recipe.recipeYield;
  data.recipeIngredient = recipe.ingredients;
  data.recipeInstructions = recipe.steps.map((step, index) => ({
    '@type': 'HowToStep',
    text: step,
    name: step.replace(/[.]$/, ''),
    url: `https://fringetable.com/recipes/${recipe.slug}.html#step-${index + 1}`
  }));
  data.dateModified = date;

  html = html
    .replace(match[0], `<script type="application/ld+json">${JSON.stringify(data)}</script>`)
    .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${recipe.description}">`)
    .replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${recipe.description}">`)
    .replace(/<p class="recipe-meta">[\s\S]*?<\/p>/, `<p class="recipe-meta">${recipe.meta}</p>`)
    .replace(/<p class="recipe-lead">[\s\S]*?<\/p>/, `<p class="recipe-lead">${recipe.lead}</p>`);

  const core = `<section class="recipe-section"><span class="eyebrow">Fringe Table adaptation</span><h2>About this dish</h2>${recipe.about}</section><section class="recipe-section story-note"><span class="eyebrow">Story &amp; history</span><h2>Why this dish matters</h2>${recipe.story}</section><section class="recipe-section"><span class="eyebrow">Before you begin</span><h2>Preparation notes</h2><div class="prep-grid">${recipe.notes.map(([title, body]) => `<div><strong>${title}</strong><p>${body}</p></div>`).join('')}</div></section><section class="recipe-section"><span class="eyebrow">Cook it</span><h2>Ingredients &amp; detailed method</h2><div class="recipe-columns"><div><h3>Ingredients</h3><ul>${recipe.ingredients.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul></div><div><h3>Method</h3><ol class="method-list detailed-static">${recipe.steps.map((step, index) => `<li id="step-${index + 1}"><strong>${index + 1}.</strong><span>${escapeHtml(step)}</span></li>`).join('')}</ol></div></div></section>${recipe.related}`;

  html = html
    .replace(/<section class="recipe-section"><span class="eyebrow">Fringe Table adaptation[\s\S]*?(?=<section class="recipe-section ingredient-sourcing">|<section class="recipe-section source-note">)/, core)
    .replace(/<section class="recipe-section source-note">[\s\S]*?<\/section>(?=<\/main>)/, `<section class="recipe-section source-note"><span class="eyebrow">Sources &amp; context</span><h2>Read further</h2><ul>${recipe.sources.join('')}</ul></section>`);

  fs.writeFileSync(file, html);
}

const coreFile = 'assets/js/site-core.js';
let core = fs.readFileSync(coreFile, 'utf8');
const catalogMatch = core.match(/const catalog=(\[[\s\S]*?\]);/);
if (!catalogMatch) throw new Error('Catalog array not found in site-core.js');
const catalog = JSON.parse(catalogMatch[1]);
for (const recipe of pages) {
  const entry = catalog.find(item => item.slug === recipe.slug);
  if (!entry) throw new Error(`Catalog entry not found: ${recipe.slug}`);
  entry.time = recipe.catalogTime;
  entry.summary = recipe.description;
  entry.story = recipe.catalogStory;
}
core = core.replace(catalogMatch[0], `const catalog=${JSON.stringify(catalog)};`);
fs.writeFileSync(coreFile, core);

const difficultyFile = 'data/recipe-difficulty.json';
const difficulty = JSON.parse(fs.readFileSync(difficultyFile, 'utf8'));
Object.assign(difficulty['senegalese-chicken-yassa'], {
  reason: 'Requires coordinating a citrus marinade, high-heat browning, patient onion softening and a final covered braise without overcooking the breast meat.',
  source: 'editorial legacy upgrade'
});
Object.assign(difficulty['nigerian-jollof-rice'], {
  reason: 'Requires fully reducing the pepper-tomato base, judging the stock level and steaming the rice in a tightly sealed pot without turning the grains soft.',
  source: 'editorial legacy upgrade'
});
Object.assign(difficulty['haitian-griot'], {
  reason: 'Requires braising pork until tender, drying it thoroughly and controlling 350°F frying oil to crisp the exterior without drying the center.',
  source: 'editorial legacy upgrade'
});
fs.writeFileSync(difficultyFile, `${JSON.stringify(difficulty, null, 2)}\n`);
fs.writeFileSync('assets/js/recipe-difficulty.js', `window.FringeTableDifficulty=${JSON.stringify(difficulty)};\n`);

const riceCollectionFile = 'collections/rice-recipes.html';
let riceCollection = fs.readFileSync(riceCollectionFile, 'utf8');
riceCollection = riceCollection.replace(
  'Explore rice dishes from Uzbekistan, Ghana, Haiti, Sri Lanka, the Gullah Geechee Lowcountry and more.',
  'Explore rice dishes from Nigeria, Uzbekistan, Ghana, Haiti, Sri Lanka, the Gullah Geechee Lowcountry and more.'
);
const jollofCard = '<a class="essential-card" href="../recipes/nigerian-jollof-rice.html"><strong>Nigerian Jollof Rice</strong><span>Parboiled long-grain rice steamed in a deeply reduced red-pepper and tomato stew.</span><b>Cook →</b></a>';
if (!riceCollection.includes('href="../recipes/nigerian-jollof-rice.html"')) {
  riceCollection = riceCollection.replace('<div class="essential-grid">', `<div class="essential-grid">${jollofCard}`);
}
fs.writeFileSync(riceCollectionFile, riceCollection);

let sitemap = fs.readFileSync('sitemap.xml', 'utf8');
for (const recipe of pages) {
  const pattern = new RegExp(`(<loc>https://fringetable\\.com/recipes/${recipe.slug}\\.html</loc><lastmod>)[^<]+`);
  if (!pattern.test(sitemap)) throw new Error(`Sitemap entry not found: ${recipe.slug}`);
  sitemap = sitemap.replace(pattern, `$1${date}`);
}
sitemap = sitemap.replace(
  /<loc>https:\/\/fringetable\.com\/collections\/rice-recipes\.html<\/loc>(?:<lastmod>[^<]+<\/lastmod>)?/,
  `<loc>https://fringetable.com/collections/rice-recipes.html</loc><lastmod>${date}</lastmod>`
);
fs.writeFileSync('sitemap.xml', sitemap);

console.log(`Modernized ${pages.length} recipes and synchronized catalog, topic-cluster, and sitemap metadata.`);
