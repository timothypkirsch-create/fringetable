(()=>{
const current=document.currentScript;
const base=current&&current.src?current.src.replace(/site\.js(?:\?.*)?$/,''):new URL('assets/js/',location.href).href;
const AMAZON_TAG='fringetable-20';
const ADSENSE_CLIENT='ca-pub-5498764120207111';
if(!document.querySelector('link[href*="difficulty.css"]')){const l=document.createElement('link');l.rel='stylesheet';l.href=base.replace('/js/','/css/')+'difficulty.css?v=20260916';document.head.appendChild(l)}
const DAILY_RECIPES=[{"name":"Ghanaian Kenkey (Ga-Style Fermented Maize Dumplings)","region":"Greater Accra, Ghana / Ga foodways","slug":"ghanaian-ga-kenkey","group":"maghreb-west-africa","type":"Fermented Maize Dumplings / Staple","time":"2 days 2 hrs 30 min, including fermentation","image":"https://commons.wikimedia.org/wiki/Special:FilePath/Kenkey.jpg?width=1400","summary":"Ga-style Ghanaian kenkey ferments white maize dough until pleasantly sour, cooks part of it into aflata, then wraps and boils the blended dough into firm, tender dumplings.","story":"The UN Food and Agriculture Organization documents kenkey among West Africa's lactic-fermented cereal foods and explains how natural acidification creates its sour flavor. University of Ghana research continues to study the relationship between fermentation time, acidity, texture and traditional processing. Kenkey is not merely a side dish: in Ga and Fante communities it is daily sustenance, a street-vended food and a livelihood for processors and sellers. Fish, shito or a fresh tomato-pepper sauce commonly completes the meal, but those accompaniments vary independently of the dumpling itself.","shop":[{"label":"fine white cornmeal for kenkey","url":"https://www.amazon.com/s?k=fine%20white%20cornmeal%20for%20kenkey"},{"label":"dried corn husks","url":"https://www.amazon.com/s?k=dried%20corn%20husks"}]},{"name":"Armenian Harisa (Wheat and Chicken Porridge)","region":"Armenia and Armenian diaspora","slug":"armenian-harisa","group":"caucasus-central-west-asia","type":"Slow-Cooked Wheat and Chicken Porridge / Main","time":"5 hrs 30 min, plus overnight soaking","image":"https://commons.wikimedia.org/wiki/Special:FilePath/Armenian_Harisa.JPG?width=1400","summary":"Armenian harisa slowly cooks hulled wheat and chicken until both surrender their shape, then beats them into a thick, glossy porridge finished with hot butter and cumin.","story":"Harisa is everyday nourishment with ceremonial and communal weight. Armenian accounts connect large cauldrons of the dish to religious observances, charity meals and the annual commemoration of the 1915 defense of Musa Dagh. That history should not be collapsed into a tidy origin legend: wheat-and-meat porridges have long circulated across Western Asia, and Armenian harisa is one culturally specific member of that wider family. What distinguishes the Armenian practice is not only its ingredients but the hours of shared cooking and the final act of beating the pot to a homogeneous texture.","shop":[{"label":"Armenian korkot or harees wheat","url":"https://www.amazon.com/s?k=Armenian%20korkot%20or%20harees%20wheat"}]},{"name":"Pakistani Beef Nihari (Slow-Cooked Shank Stew)","region":"Karachi and Lahore, Pakistan / North Indian Muslim culinary lineage","slug":"pakistani-beef-nihari","group":"himalayas-south-asia","type":"Slow-Cooked Beef Shank Stew / Main","time":"6 hrs 45 min","image":"https://commons.wikimedia.org/wiki/Special:FilePath/Beef_Nihari.JPG?width=1400","summary":"Pakistani beef nihari simmers shank and marrow slowly with fennel, cardamom, mace and warm spices, then finishes the glossy gravy with roasted wheat flour, ginger and lemon.","story":"SOCH Outreach Foundation's Google Arts & Culture history traces nihari from breakfast associated with Muslim elite kitchens in Delhi and Lucknow to food for workers, then follows cooks and recipes to Pakistan after Partition in 1947. In Karachi, family-run nihari houses made the dish a public institution and an all-day national favorite. The name is connected to nahar, daytime or morning, recalling its dawn service after an overnight cook. Restaurant traditions may carry a little previous gravy, called taar, into the next pot; this home version does not simulate that lineage and builds depth through shank, marrow, toasted spices and time.","shop":[{"label":"whole black cardamom","url":"https://www.amazon.com/s?k=whole%20black%20cardamom"},{"label":"whole-wheat atta flour","url":"https://www.amazon.com/s?k=whole-wheat%20atta%20flour"},{"label":"Kashmiri chile powder","url":"https://www.amazon.com/s?k=Kashmiri%20chile%20powder"}]}];
const RECOVERED_RECIPES=[
  {name:'Ethiopian Chechebsa (Kita Firfir)',region:'Ethiopia / Horn of Africa',slug:'ethiopian-chechebsa-kita-firfir',group:'horn-northeast-africa',type:'Breakfast / Bread',time:'55 min',image:'https://commons.wikimedia.org/wiki/Special:FilePath/Kitcha%20fit%20fit.png?width=1400',summary:'Ethiopian chechebsa, also called kita firfir: skillet-cooked wheat flatbread torn and tossed while warm with niter kibbeh and berbere, with yogurt or honey optional at the table.',story:'Chechebsa belongs to a wider Ethiopian and Eritrean family of torn-bread breakfasts, but names and breads matter. Ethiopian sources use chechebsa for kita firfir, built from a pan-cooked flatbread rather than leftover sour injera. In some regions teff is important; in others wheat flour is common. Niter kibbeh supplies aromatic fat and berbere gives chile warmth, while yogurt or honey may soften or sweeten the plate according to household preference.',shop:[{label:'niter kibbeh Ethiopian spiced butter',url:'https://www.amazon.com/s?k=niter%20kibbeh%20Ethiopian%20spiced%20butter'},{label:'Ethiopian berbere spice',url:'https://www.amazon.com/s?k=Ethiopian%20berbere%20spice'}]},
  {name:'Myanmar Lahpet Thoke',region:'Myanmar / Southeast Asia',slug:'myanmar-lahpet-thoke',group:'southeast-asia',type:'Salad / Snack',time:'30 min',image:'https://commons.wikimedia.org/wiki/Special:FilePath/Pickled%20tea%20leaves%20salad%2C%20Myanmar.jpg?width=1400',summary:'Fermented tea leaves, crisp cabbage, tomato, peanuts, sesame, fried garlic and crunchy legumes in Myanmar’s intensely textured tea leaf salad.',story:'Lahpet thoke centers fermented tea leaves and is closely tied to hospitality and social eating in Myanmar; the salad depends on contrast between soft, savory tea leaves and crisp toppings.',shop:[{label:'fermented tea leaves lahpet',url:'https://www.amazon.com/s?k=fermented+tea+leaves+lahpet'},{label:'fried yellow split peas',url:'https://www.amazon.com/s?k=fried+yellow+split+peas+burmese'}]}
];

function amazonUrl(query){return `https://www.amazon.com/s?k=${encodeURIComponent(query)}&tag=${AMAZON_TAG}`}
function setupAdsense(){
  if(document.querySelector(`script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}"]`))return;
  const s=document.createElement('script');s.async=true;s.crossOrigin='anonymous';s.src=`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;document.head.appendChild(s);
}
function tagAmazonLinks(){
  document.querySelectorAll('a[href*="amazon.com"]').forEach(a=>{
    try{const u=new URL(a.href,location.href);if(!/(^|\.)amazon\.com$/i.test(u.hostname))return;u.searchParams.set('tag',AMAZON_TAG);a.href=u.toString();a.target='_blank';const rel=new Set((a.rel||'').split(/\s+/).filter(Boolean));['sponsored','nofollow','noopener'].forEach(x=>rel.add(x));a.rel=[...rel].join(' ');a.dataset.affiliateReady='true'}catch(e){}
  });
}
const affiliateIngredients={
  'myanmar-mohinga':['banana stem canned','rice vermicelli noodles'],
  'myanmar-lahpet-thoke':['fermented tea leaves lahpet','fried yellow split peas Burmese'],
  'uzbek-palov':['devzira rice','dried barberries'],
  'ethiopian-doro-wat':['Ethiopian berbere spice','niter kibbeh'],
  'shiro-wot':['Ethiopian shiro powder','Ethiopian berbere spice','niter kibbeh'],
  'zigni':['Ethiopian Eritrean berbere spice','niter kibbeh'],
  'amazigh-vegetable-couscous':['medium grain couscous','ras el hanout spice'],
  'georgian-lobio':['khmeli suneli spice','blue fenugreek utskho suneli'],
  'moroccan-rfissa':['ras el hanout spice','fenugreek seeds'],
  'tunisian-lablabi':['Tunisian harissa paste'],
  'newari-yomari':['Nepali chaku molasses'],
  'senegalese-thiakry':['millet couscous thiakry'],
  'ghanaian-waakye':['dried sorghum leaves waakye'],
  'nigerian-egusi-soup':['ground egusi melon seeds','West African red palm oil'],
  'nigerian-moi-moi':['peeled black eyed peas'],
  'sri-lankan-kiribath':['Sri Lankan samba rice'],
  'nepali-momos':['Nepali timur pepper'],
  'jamaican-brown-stew-chicken':['Jamaican browning sauce'],
  'hanoi-bun-cha':['Vietnamese fish sauce','Vietnamese rice vermicelli bun']
};
const cookware={
  'amazigh-vegetable-couscous':['couscoussier steamer'],
  'nepali-momos':['dumpling momo steamer basket'],
  'afghan-ashak':['dumpling steamer basket'],
  'georgian-lobio':['Georgian clay bean pot lobio'],
  'newari-yomari':['dumpling steamer basket'],
  'nigerian-moi-moi':['moi moi aluminum cups steamer'],
  'uzbek-palov':['traditional kazan qozon cast iron cauldron']
};
function disclosureText(){return 'As an Amazon Associate I earn from qualifying purchases. Some links below are affiliate links; if you buy through them, Fringe Table may earn a commission at no additional cost to you.'}
function fixAffiliateDisclosureState(){document.querySelectorAll('.ingredient-sourcing p').forEach(p=>{if(/Affiliate tracking is not active yet/i.test(p.textContent||''))p.textContent='These shopping links use Fringe Table’s Amazon Associates tracking where eligible. '+disclosureText()})}
function ensureIngredientAffiliateSection(slug){
  const items=affiliateIngredients[slug];if(!items||!items.length)return;
  let sec=document.querySelector('.ingredient-sourcing:not(.cookware-sourcing)');
  if(!sec){sec=document.createElement('section');sec.className='recipe-section ingredient-sourcing';sec.innerHTML='<span class="eyebrow">Ingredient sourcing</span><h2>Hard-to-find ingredients</h2><p>These search links are included only where specialty ingredients can make the recipe easier to reproduce at home.</p><div class="shop-links"></div>';const cols=document.querySelector('.recipe-columns');(cols?.closest('.recipe-section')||document.querySelector('.recipe-section:last-of-type'))?.after(sec)}
  if(!sec.querySelector('.affiliate-inline-disclosure')){const p=document.createElement('p');p.className='affiliate-inline-disclosure';p.textContent=disclosureText();const h=sec.querySelector('h2');(h||sec.firstChild)?.after(p)}
  let links=sec.querySelector('.shop-links');if(!links){links=document.createElement('div');links.className='shop-links';sec.appendChild(links)}
  const existing=new Set([...links.querySelectorAll('a')].map(a=>(a.dataset.shopLabel||a.textContent||'').toLowerCase()));
  items.forEach(q=>{if([...existing].some(x=>x.includes(q.toLowerCase())))return;const a=document.createElement('a');a.href=amazonUrl(q);a.target='_blank';a.rel='sponsored nofollow noopener';a.dataset.affiliateReady='true';a.dataset.shopKind='ingredient';a.dataset.shopLabel=q;a.innerHTML=`Find ${q} on Amazon <span>↗</span>`;links.appendChild(a)})
}
function addAffiliateDisclosuresAndCookware(){
  const recipePage=document.querySelector('.recipe-page');if(!recipePage)return;
  const slug=(location.pathname.split('/').pop()||'').replace('.html','');
  ensureIngredientAffiliateSection(slug);
  const source=document.querySelector('.ingredient-sourcing:not(.cookware-sourcing)');
  if(source&&!source.querySelector('.affiliate-inline-disclosure')){const p=document.createElement('p');p.className='affiliate-inline-disclosure';p.textContent=disclosureText();const h=source.querySelector('h2');(h||source.firstChild)?.after(p)}
  const items=cookware[slug];if(items&&!document.querySelector('.cookware-sourcing')){const sec=document.createElement('section');sec.className='recipe-section ingredient-sourcing cookware-sourcing';sec.innerHTML=`<span class="eyebrow">Useful cookware</span><h2>Specialty tools that genuinely help</h2><p class="affiliate-inline-disclosure">${disclosureText()}</p><p>These links are limited to cookware that meaningfully supports this specific cooking method or serving tradition, rather than generic kitchen equipment.</p><div class="shop-links">${items.map(q=>`<a href="${amazonUrl(q)}" target="_blank" rel="sponsored nofollow noopener" data-affiliate-ready="true" data-shop-kind="cookware" data-shop-label="${q}">Find ${q} on Amazon <span>↗</span></a>`).join('')}</div>`;const ingredient=document.querySelector('.ingredient-sourcing:not(.cookware-sourcing)');if(ingredient)ingredient.after(sec);else{const cols=document.querySelector('.recipe-columns');(cols?.closest('.recipe-section')||document.querySelector('.recipe-section:last-of-type'))?.after(sec)}}
  const footer=document.querySelector('.footer-inner');if(footer&&!footer.querySelector('.amazon-footer-disclosure')){const p=document.createElement('p');p.className='amazon-footer-disclosure';p.textContent='As an Amazon Associate I earn from qualifying purchases.';footer.appendChild(p)}
}
function recipeHref(slug){const p=location.pathname;if(p.includes('/recipes/regions/'))return `../../${slug}.html`;if(/\/recipes\/?(?:index\.html)?$/.test(p))return `${slug}.html`;return `recipes/${slug}.html`}
function esc(s){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot',"'":'&#39;'}[m]))}
function difficultyFor(slug){return window.FringeTableDifficulty?.[slug]||null}
function difficultyBadge(slug){const item=difficultyFor(slug);return item?`<span class="difficulty-badge difficulty-${item.level.toLowerCase()}" title="${esc(item.reason)}" aria-label="Difficulty: ${esc(item.level)}. ${esc(item.reason)}">${esc(item.level)}</span>`:''}
function cardMarkup(x){const difficulty=difficultyFor(x.slug);return `<article class="recipe-card" data-recipe-name="${esc(x.name)}" data-name="${esc(x.name.toLowerCase())}" data-region="${esc(x.region.toLowerCase())}" data-type="${esc(x.type.toLowerCase())}" data-group="${esc(x.group)}" data-recipe-slug="${esc(x.slug)}" data-difficulty="${esc(difficulty?.level.toLowerCase()||'')}"><a class="card-image" href="${recipeHref(x.slug)}" aria-label="View ${esc(x.name)}"><img src="${esc(x.image)}" alt="${esc(x.name)}" width="900" height="675" loading="lazy" decoding="async" referrerpolicy="no-referrer"></a><div class="card-body"><p class="card-meta">${esc(x.type)} · ${esc(x.time)} ${difficultyBadge(x.slug)}</p><h3>${esc(x.name)}</h3><p class="origin">${esc(x.region)}</p><p>${esc(x.summary)}</p><a class="card-link" href="${recipeHref(x.slug)}">View recipe <span>→</span></a></div></article>`}
function mergeDailyCatalogAndRender(){
  const catalog=window.FringeTableCatalog||[];const known=new Set(catalog.map(x=>x.slug));const additions=[...DAILY_RECIPES,...RECOVERED_RECIPES];for(let i=additions.length-1;i>=0;i--){const x=additions[i];if(!known.has(x.slug)){catalog.unshift(x);known.add(x.slug)}}window.FringeTableCatalog=catalog;
  document.querySelectorAll('[data-recipe-count]').forEach(el=>el.textContent=String(catalog.length));
  const latest=document.querySelector('[data-latest-recipes]');if(latest)latest.innerHTML=DAILY_RECIPES.map(cardMarkup).join('');
  const archive=document.querySelector('[data-recipe-catalog]');if(archive&&!archive.querySelector('[data-recipe-slug="myanmar-mohinga"]'))archive.insertAdjacentHTML('afterbegin',additions.map(cardMarkup).join(''));
  document.querySelectorAll('[data-region-grid]').forEach(grid=>{const group=grid.dataset.regionGrid;const add=additions.filter(x=>x.group===group);if(add.length&&!grid.querySelector(`[data-recipe-slug="${add[0].slug}"]`))grid.insertAdjacentHTML('afterbegin',add.map(cardMarkup).join(''))});
}
function enhanceArchiveFilters(){
  const catalog=window.FringeTableCatalog||[];const byName=new Map(catalog.map(x=>[x.name,x]));document.querySelectorAll('.recipe-card').forEach(c=>{const x=byName.get(c.dataset.recipeName||'');if(x){c.dataset.group=x.group||'';const item=difficultyFor(x.slug);c.dataset.difficulty=item?.level.toLowerCase()||'';const meta=c.querySelector('.card-meta');if(item&&meta&&!meta.querySelector('.difficulty-badge'))meta.insertAdjacentHTML('beforeend',` ${difficultyBadge(x.slug)}`)}});
  const groups={africa:new Set(['maghreb-west-africa','horn-northeast-africa']),asia:new Set(['caucasus-central-west-asia','himalayas-south-asia','southeast-asia']),caribbean:new Set(['caribbean-lowcountry']),indigenous:new Set(['indigenous-americas'])};
  document.querySelectorAll('.filter').forEach(btn=>{const key=(btn.dataset.filter||'').toLowerCase();if(!groups[key])return;btn.addEventListener('click',()=>{document.querySelectorAll('.recipe-card').forEach(c=>c.hidden=!groups[key].has(c.dataset.group||''))})});
}
function addDifficultyExperience(){
  const slug=(location.pathname.split('/').pop()||'').replace('.html','');
  const item=difficultyFor(slug);
  if(item&&document.querySelector('.recipe-page')){const meta=document.querySelector('.recipe-meta');if(meta&&!meta.querySelector('.difficulty-badge'))meta.insertAdjacentHTML('beforeend',` ${difficultyBadge(slug)}`);if(meta&&!document.querySelector('.difficulty-explanation')){const note=document.createElement('p');note.className='difficulty-explanation';note.innerHTML=`<strong>${esc(item.level)}:</strong> ${esc(item.reason)}`;meta.after(note)}}
  if(!/\/recipes\/?(?:index\.html)?$/.test(location.pathname))return;
  const toolbar=document.querySelector('.toolbar');
  if(toolbar&&!document.querySelector('#difficultyFilter')){const wrap=document.createElement('div');wrap.className='difficulty-filter';wrap.innerHTML='<label for="difficultyFilter">Difficulty</label><select id="difficultyFilter"><option value="all">All levels</option><option value="easy">Easy</option><option value="moderate">Moderate</option><option value="advanced">Advanced</option></select>';toolbar.after(wrap)}
  const select=document.querySelector('#difficultyFilter'),input=document.querySelector('#archiveSearch');let category='all';
  const groups={africa:new Set(['maghreb-west-africa','horn-northeast-africa']),asia:new Set(['caucasus-central-west-asia','himalayas-south-asia','southeast-asia']),caribbean:new Set(['caribbean-lowcountry']),indigenous:new Set(['indigenous-americas'])};
  const apply=()=>{const query=(input?.value||'').trim().toLowerCase(),difficulty=select?.value||'all';let shown=0;document.querySelectorAll('.recipe-card').forEach(card=>{const hay=`${card.dataset.name||''} ${card.dataset.region||''} ${card.dataset.type||''} ${card.dataset.group||''}`.toLowerCase();const categoryMatch=category==='all'||(groups[category]?groups[category].has(card.dataset.group||''):hay.includes(category));const ok=categoryMatch&&(difficulty==='all'||card.dataset.difficulty===difficulty)&&(!query||hay.includes(query));card.hidden=!ok;if(ok)shown++});const status=document.querySelector('.archive-search-status');if(status)status.textContent=(query||difficulty!=='all'||category!=='all')?`${shown} recipe${shown===1?'':'s'} match the selected filters.`:''};
  document.querySelectorAll('.filter').forEach(button=>button.addEventListener('click',()=>{category=(button.dataset.filter||'all').toLowerCase();setTimeout(apply,0)}));select?.addEventListener('change',()=>{track('recipe_difficulty_filter',{difficulty:select.value,page_path:location.pathname});apply()});input?.addEventListener('input',()=>setTimeout(apply,0));document.querySelector('#archiveSearchClear')?.addEventListener('click',()=>setTimeout(apply,0));
}
function addAccessibility(){
  if(!document.querySelector('.skip-link')){const a=document.createElement('a');a.className='skip-link';a.href='#main-content';a.textContent='Skip to content';document.body.prepend(a)}
  const main=document.querySelector('main');if(main&&!main.id)main.id='main-content';
  document.querySelectorAll('img').forEach((img,i)=>{if(i>0&&!img.closest('.recipe-hero'))img.loading=img.loading||'lazy';img.decoding='async'});
  document.querySelectorAll('a[target="_blank"]').forEach(a=>{const rel=new Set((a.rel||'').split(/\s+/).filter(Boolean));rel.add('noopener');a.rel=[...rel].join(' ')})
}
function guardRecipeImages(){
  const fallback=new URL('../images/hero-preparation.jpg',base).href;
  const protect=img=>{
    if(!(img instanceof HTMLImageElement)||img.dataset.ftImageGuard==='1')return;
    img.dataset.ftImageGuard='1';
    img.addEventListener('error',()=>{
      if(img.dataset.ftFallbackApplied==='1')return;
      img.dataset.ftFallbackApplied='1';
      img.dataset.ftBrokenSrc=img.currentSrc||img.src||'';
      img.removeAttribute('srcset');
      img.src=fallback;
      img.alt='Fringe Table cooking image shown because the original image is temporarily unavailable';
    },{once:true});
  };
  document.querySelectorAll('img').forEach(protect);
  new MutationObserver(records=>records.forEach(record=>record.addedNodes.forEach(node=>{
    if(node.nodeType!==1)return;
    if(node.matches?.('img'))protect(node);
    node.querySelectorAll?.('img').forEach(protect);
  }))).observe(document.documentElement,{childList:true,subtree:true});
}
function addArchiveSearch(){
  if(!/\/recipes\/?(?:index\.html)?$/.test(location.pathname))return;
  const section=document.querySelector('.section');if(!section)return;
  if(!document.querySelector('.archive-search')){const wrap=document.createElement('div');wrap.className='archive-search';wrap.innerHTML='<label for="archiveSearch">Search recipes</label><div><input id="archiveSearch" type="search" placeholder="Search dish, region, or type…" autocomplete="off"><button type="button" id="archiveSearchClear">Clear</button></div><p class="archive-search-status" aria-live="polite"></p>';const note=document.querySelector('.catalog-note');note?.after(wrap)}
  const input=document.querySelector('#archiveSearch'),status=document.querySelector('.archive-search-status');
  const apply=()=>{const q=(input?.value||'').trim().toLowerCase();let shown=0;document.querySelectorAll('.recipe-card').forEach(c=>{const hay=`${c.dataset.name||''} ${c.dataset.region||''} ${c.dataset.type||''} ${c.dataset.group||''}`.toLowerCase();const ok=!q||hay.includes(q);c.hidden=!ok;if(ok)shown++});if(status)status.textContent=q?`${shown} recipe${shown===1?'':'s'} found for “${input.value.trim()}”.`:''};
  if(input&&!input.dataset.searchBound){input.dataset.searchBound='true';input.addEventListener('input',apply);document.querySelector('#archiveSearchClear')?.addEventListener('click',()=>{input.value='';apply();input.focus()})}
  const q=new URLSearchParams(location.search).get('q');if(q&&input){input.value=q;apply();input.scrollIntoView({block:'center'})}
}
function addSitePolish(){
  document.documentElement.classList.add('js');
  const theme=document.querySelector('meta[name="theme-color"]')||document.createElement('meta');theme.name='theme-color';theme.content='#0b2118';if(!theme.parentNode)document.head.appendChild(theme);
  document.querySelectorAll('.recipe-card a,.related-grid a,.region-card').forEach(a=>{if(!a.getAttribute('aria-label')){const card=a.closest('.recipe-card');const name=card?.dataset.recipeName||a.querySelector('h3,strong')?.textContent?.trim();if(name)a.setAttribute('aria-label',`View ${name}`)}});
}
function finalize(){mergeDailyCatalogAndRender();guardRecipeImages();setupAdsense();fixAffiliateDisclosureState();tagAmazonLinks();addAffiliateDisclosuresAndCookware();enhanceArchiveFilters();addAccessibility();addArchiveSearch();addDifficultyExperience();addSitePolish();if(!document.querySelector('script[data-traffic-layer]')){const t=document.createElement('script');t.src=base+'traffic.js?v=20260830d';t.dataset.trafficLayer='true';document.body.appendChild(t)}setTimeout(()=>{fixAffiliateDisclosureState();tagAmazonLinks();addArchiveSearch()},0)}
function loadCore(){const core=document.createElement('script');core.src=base+'site-core.js?v=20260915a';core.onload=finalize;core.onerror=()=>{console.error('Fringe Table core script failed to load')};document.body.appendChild(core)}
if(window.FringeTableDifficulty)loadCore();else{const difficulty=document.createElement('script');difficulty.src=base+'recipe-difficulty.js?v=20260916';difficulty.onload=loadCore;difficulty.onerror=()=>{console.error('Fringe Table difficulty data failed to load');loadCore()};document.body.appendChild(difficulty)}
})();
