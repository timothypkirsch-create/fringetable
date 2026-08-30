import fs from 'node:fs/promises';

const batchPath=process.argv[2];
if(!batchPath)throw new Error('Usage: node scripts/publish-expansion-batch.mjs <batch.json>');
const recipes=JSON.parse(await fs.readFile(batchPath,'utf8'));
if(!Array.isArray(recipes)||!recipes.length)throw new Error('Batch must be a non-empty JSON array.');

const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const amazon=q=>`https://www.amazon.com/s?k=${encodeURIComponent(q)}&tag=fringetable-20`;
const external=u=>/^https?:\/\//i.test(u);
function renderPage(r){
 const required=['name','slug','region','group','type','time','yield','prepTime','cookTime','totalTime','cuisine','category','image','imageAlt','imageCredit','imageCreditUrl','summary','lead','about','story','caveat','ingredients','steps','sources'];
 for(const k of required)if(r[k]==null)throw new Error(`${r.slug||r.name||'recipe'} missing ${k}`);
 const ld={"@context":"https://schema.org","@type":"Recipe",name:r.name,description:r.summary,image:[r.image],recipeCuisine:r.cuisine,recipeCategory:r.category,recipeYield:r.yield,prepTime:r.prepTime,cookTime:r.cookTime,totalTime:r.totalTime,recipeIngredient:r.ingredients,recipeInstructions:r.steps.map(text=>({"@type":"HowToStep",text})),author:{"@type":"Organization",name:'Fringe Table'},datePublished:'2026-08-30',dateModified:'2026-08-30',mainEntityOfPage:`https://fringetable.com/recipes/${r.slug}.html`};
 const prep=(r.prepNotes||[]).map(([a,b])=>`<div><strong>${esc(a)}</strong><p>${esc(b)}</p></div>`).join('');
 const ing=r.ingredients.map(x=>`<li>${esc(x)}</li>`).join('');
 const method=r.steps.map((x,i)=>`<li><strong>${i+1}.</strong><span>${esc(x)}</span></li>`).join('');
 const shop=(r.shop||[]).length?`<section class="recipe-section ingredient-sourcing"><span class="eyebrow">Ingredient sourcing</span><h2>Worth finding before you cook</h2><p class="affiliate-inline-disclosure">As an Amazon Associate I earn from qualifying purchases. Some links below are affiliate links; if you buy through them, Fringe Table may earn a commission at no additional cost to you.</p><p>These links are included only for ingredients that can be meaningfully harder to find in a standard supermarket.</p><div class="shop-links">${r.shop.map(q=>`<a href="${amazon(q)}" target="_blank" rel="sponsored nofollow noopener">Find ${esc(q)} on Amazon <span>↗</span></a>`).join('')}</div></section>`:'';
 const src=[...r.sources,[r.imageCredit,r.imageCreditUrl]].map(([n,u])=>`<li><a href="${u}"${external(u)?' target="_blank" rel="noopener"':''}>${esc(n)}</a></li>`).join('');
 return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(r.name)} Recipe | Fringe Table</title><meta name="description" content="${esc(r.summary)}"><meta name="robots" content="index,follow,max-image-preview:large"><link rel="canonical" href="https://fringetable.com/recipes/${r.slug}.html"><meta property="og:title" content="${esc(r.name)} — Fringe Table"><meta property="og:description" content="${esc(r.summary)}"><meta property="og:type" content="article"><meta property="og:url" content="https://fringetable.com/recipes/${r.slug}.html"><meta property="og:image" content="${r.image}"><meta name="twitter:card" content="summary_large_image"><link rel="stylesheet" href="../assets/css/styles.css?v=20260830"><link rel="stylesheet" href="../assets/css/rebuild.css?v=20260830"><script type="application/ld+json">${JSON.stringify(ld)}</script></head><body><header class="site-header"><div class="nav-container"><a class="logo" href="../index.html"><span class="logo-mark">✦</span><span>Fringe</span><b>Table</b><small>RECIPES FROM THE CULINARY MARGINS</small></a><button class="menu-toggle" type="button" aria-label="Open navigation" aria-expanded="false">Menu</button><nav><ul><li><a href="../index.html#regions">Regions</a></li><li><a href="../recipes/index.html">Recipes</a></li><li><a href="../subrecipes/index.html">Essentials</a></li><li><a href="../about.html">About</a></li></ul></nav><button class="search-trigger" type="button">⌕ Search</button><a class="nav-surprise" data-surprise href="../recipes/grape-dumplings.html">Surprise me</a></div></header><main class="recipe-page"><a class="back-link" href="../recipes/index.html">← All recipes</a><section class="recipe-hero"><div><span class="eyebrow">${esc(r.region)}</span><h1>${esc(r.name)}</h1><p class="recipe-meta">${esc(r.type)} · ${esc(r.time)} · ${esc(r.yield)}</p><p class="recipe-lead">${esc(r.lead)}</p></div><img src="${r.image}" alt="${esc(r.imageAlt)}" width="1200" height="900" referrerpolicy="no-referrer"></section><section class="recipe-section"><span class="eyebrow">Fringe Table adaptation</span><h2>About this dish</h2><p>${esc(r.about)}</p></section><section class="recipe-section story-note"><span class="eyebrow">Story & history</span><h2>${esc(r.storyHeading||'Why this dish matters')}</h2><p>${esc(r.story)}</p><p class="story-caveat">${esc(r.caveat)}</p></section>${prep?`<section class="recipe-section"><span class="eyebrow">Before you begin</span><h2>Preparation notes</h2><div class="prep-grid">${prep}</div></section>`:''}<section class="recipe-section"><span class="eyebrow">Cook it</span><h2>Ingredients &amp; detailed method</h2><div class="recipe-columns"><div><h3>Ingredients</h3><ul>${ing}</ul></div><div><h3>Method</h3><ol class="method-list detailed-static">${method}</ol></div></div></section>${shop}<section class="recipe-section source-note"><span class="eyebrow">Sources &amp; context</span><h2>Read further</h2><ul>${src}</ul></section></main><footer class="footer"><div class="footer-inner"><div><a class="logo" href="../index.html"><span>Fringe</span><b>Table</b></a><p>Cook with curiosity.</p></div><div class="footer-links"><a href="../recipes/index.html">Recipes</a><a href="../subrecipes/index.html">Essentials</a><a href="../about.html">About</a><a href="../privacy.html">Privacy</a><a href="../affiliate-disclosure.html">Affiliate Disclosure</a></div></div></footer><div class="modal" aria-hidden="true"><div class="modal-panel"><button class="close" type="button">×</button><span class="eyebrow">Search the collection</span><h2>Find a dish.</h2><input id="siteSearch" type="search" placeholder="Search recipes, regions, ingredients…"><div class="search-results"><p>Start typing a dish or region.</p></div></div></div><script src="../assets/js/site.js?v=20260830a"></script></body></html>`;
}

let core=await fs.readFile('assets/js/site-core.js','utf8');
const added=[];
for(const r of recipes){
 if(core.includes(`"slug":"${r.slug}"`))continue;
 await fs.writeFile(`recipes/${r.slug}.html`,renderPage(r));
 const card={name:r.name,region:r.region,slug:r.slug,group:r.group,type:r.type,time:r.time,image:r.image,summary:r.summary,story:r.story,shop:(r.shop||[]).map(label=>({label,url:`https://www.amazon.com/s?k=${encodeURIComponent(label)}`}))};
 core=core.replace('const catalog=[','const catalog=['+JSON.stringify(card)+',');
 added.push(r);
}
if(!added.length){console.log('No new recipes in batch.');process.exit(0)}
await fs.writeFile('assets/js/site-core.js',core);
let site=await fs.readFile('assets/js/site.js','utf8');
const cards=added.slice(-3).map(r=>({name:r.name,region:r.region,slug:r.slug,group:r.group,type:r.type,time:r.time,image:r.image,summary:r.summary,story:r.story,shop:(r.shop||[]).map(label=>({label,url:`https://www.amazon.com/s?k=${encodeURIComponent(label)}`}))}));
site=site.replace(/const DAILY_RECIPES=\[[\s\S]*?\];\nconst RECOVERED_RECIPES=/,`const DAILY_RECIPES=${JSON.stringify(cards)};\nconst RECOVERED_RECIPES=`);
await fs.writeFile('assets/js/site.js',site);
let sm=await fs.readFile('sitemap.xml','utf8');for(const r of added){const u=`https://fringetable.com/recipes/${r.slug}.html`;if(!sm.includes(u))sm=sm.replace('</urlset>',`<url><loc>${u}</loc><lastmod>2026-08-30</lastmod></url>\n</urlset>`)}await fs.writeFile('sitemap.xml',sm);
const groupToRegion={'indigenous-americas':'Indigenous Americas','horn-northeast-africa':'Horn & Northeast Africa','maghreb-west-africa':'Maghreb & West Africa','caribbean-lowcountry':'Caribbean & Lowcountry','caucasus-central-west-asia':'Caucasus, Central & West Asia','himalayas-south-asia':'Himalayas & South Asia','southeast-asia':'Southeast Asia'};
let plan=await fs.readFile('CONTENT_EXPANSION.md','utf8');
const increments={};for(const r of added)increments[r.group]=(increments[r.group]||0)+1;
let totalNeeded=0;
for(const [group,label] of Object.entries(groupToRegion)){
 const rx=new RegExp(`\\| ${label.replace(/[.*+?^${}()|[\\]\\]/g,'\\$&')} \\| (\\d+) \\| 20 \\| (\\d+) \\|`);
 const m=plan.match(rx);if(!m)continue;const current=Number(m[1])+(increments[group]||0);const needed=Math.max(0,20-current);totalNeeded+=needed;plan=plan.replace(rx,`| ${label} | ${current} | 20 | ${needed} |`);
}
plan=plan.replace(/Total expansion needed: \*\*\d+ recipes\*\*\./,`Total expansion needed: **${totalNeeded} recipes**.`);
await fs.writeFile('CONTENT_EXPANSION.md',plan);
console.log(`Published ${added.length} recipes: ${added.map(r=>r.name).join(', ')}`);
