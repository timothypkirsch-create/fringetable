(()=>{
const current=document.currentScript;
const base=current&&current.src?current.src.replace(/site\.js(?:\?.*)?$/,''):new URL('assets/js/',location.href).href;
const AMAZON_TAG='fringetable-20';
const ADSENSE_CLIENT='ca-pub-5498764120207111';
const DAILY_RECIPES=[{"name":"Azerbaijani Suzme Plov","region":"Azerbaijan / South Caucasus","slug":"azerbaijani-suzme-plov","group":"caucasus-central-west-asia","type":"Rice / Main","time":"2 hrs","image":"https://commons.wikimedia.org/wiki/Special:FilePath/Azerbaijani%20plov.JPG?width=1400","summary":"Azerbaijani suzme plov with partially boiled saffron rice steamed over a crisp lavash crust and served with lamb, chestnuts and dried fruit.","story":"Azerbaijan’s official tourism site calls plov one of the crowning dishes of Azerbaijani cuisine and distinguishes dashma, suzme and dosheme methods. Its published suzme recipe specifically describes partially cooked rice drained and steamed over flatbread, saffron poured over the rice and a separate lamb accompaniment with chestnuts, dried apricots, plums and onions. The separation of rice from garnish is one of the features that distinguishes many Azerbaijani plovs from mixed pilafs.","shop":[{"label":"Azerbaijani saffron","url":"https://www.amazon.com/s?k=Azerbaijani%20saffron"},{"label":"peeled cooked chestnuts","url":"https://www.amazon.com/s?k=peeled%20cooked%20chestnuts"}]},{"name":"Sri Lankan Parippu Curry","region":"Sri Lanka / South Asia","slug":"sri-lankan-parippu-curry","group":"himalayas-south-asia","type":"Curry / Side","time":"35 min","image":"https://commons.wikimedia.org/wiki/Special:FilePath/Parippu%20Curry.jpg?width=1400","summary":"Sri Lankan red lentil parippu simmered with turmeric and coconut milk, then finished with a sizzling temper of mustard seed, curry leaf, onion and dried chile.","story":"Sri Lanka Tourism describes dhal as one of the country’s most commonly consumed staple dishes and notes that it appears in milky, spicy and tempered forms, usually from red masoor lentils cooked with spices and coconut milk. The finishing temper is a defining household technique: hot flavored oil is poured or stirred into soft lentils at the end, giving an inexpensive everyday dish a fresh burst of aroma.","shop":[{"label":"fresh curry leaves","url":"https://www.amazon.com/s?k=fresh%20curry%20leaves"},{"label":"Sri Lankan red lentils masoor dal","url":"https://www.amazon.com/s?k=Sri%20Lankan%20red%20lentils%20masoor%20dal"}]},{"name":"Northern Thai Khao Soi Gai","region":"Northern Thailand / Chiang Mai / Southeast Asia","slug":"northern-thai-khao-soi-gai","group":"southeast-asia","type":"Noodles / Main","time":"1 hr 20 min","image":"https://commons.wikimedia.org/wiki/Special:FilePath/Khao%20soi%20Chiang%20Mai.jpg?width=1400","summary":"Chiang Mai-style chicken khao soi with egg noodles in a coconut curry broth, topped with crisp noodles and served with pickled mustard greens, shallot and lime.","story":"The Tourism Authority of Thailand describes khao soi as a standard and representative Northern Thai curry noodle dish, built from egg noodles and a mild coconut-milk curry with tender meat. The dish also reflects northern Thailand’s long connections with neighboring Myanmar and Muslim trading communities, and historical narratives around its development vary. Rather than choosing one disputed origin story, this page focuses on the Chiang Mai preparation and its characteristic combination of curry broth, two noodle textures and sharp condiments.","shop":[{"label":"pickled mustard greens","url":"https://www.amazon.com/s?k=pickled%20mustard%20greens"},{"label":"Thai curry paste","url":"https://www.amazon.com/s?k=Thai%20curry%20paste"},{"label":"fresh Chinese egg noodles","url":"https://www.amazon.com/s?k=fresh%20Chinese%20egg%20noodles"}]}];
const RECOVERED_RECIPES=[
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
  'nepali-momos':['Nepali timur pepper']
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
function cardMarkup(x){return `<article class="recipe-card" data-recipe-name="${esc(x.name)}" data-name="${esc(x.name.toLowerCase())}" data-region="${esc(x.region.toLowerCase())}" data-type="${esc(x.type.toLowerCase())}" data-group="${esc(x.group)}" data-recipe-slug="${esc(x.slug)}"><a class="card-image" href="${recipeHref(x.slug)}" aria-label="View ${esc(x.name)}"><img src="${esc(x.image)}" alt="${esc(x.name)}" width="900" height="675" loading="lazy" decoding="async" referrerpolicy="no-referrer"></a><div class="card-body"><p class="card-meta">${esc(x.type)} · ${esc(x.time)}</p><h3>${esc(x.name)}</h3><p class="origin">${esc(x.region)}</p><p>${esc(x.summary)}</p><a class="card-link" href="${recipeHref(x.slug)}">View recipe <span>→</span></a></div></article>`}
function mergeDailyCatalogAndRender(){
  const catalog=window.FringeTableCatalog||[];const known=new Set(catalog.map(x=>x.slug));const additions=[...DAILY_RECIPES,...RECOVERED_RECIPES];for(let i=additions.length-1;i>=0;i--){const x=additions[i];if(!known.has(x.slug)){catalog.unshift(x);known.add(x.slug)}}window.FringeTableCatalog=catalog;
  document.querySelectorAll('[data-recipe-count]').forEach(el=>el.textContent=String(catalog.length));
  const latest=document.querySelector('[data-latest-recipes]');if(latest)latest.innerHTML=DAILY_RECIPES.map(cardMarkup).join('');
  const archive=document.querySelector('[data-recipe-catalog]');if(archive&&!archive.querySelector('[data-recipe-slug="myanmar-mohinga"]'))archive.insertAdjacentHTML('afterbegin',additions.map(cardMarkup).join(''));
  document.querySelectorAll('[data-region-grid]').forEach(grid=>{const group=grid.dataset.regionGrid;const add=additions.filter(x=>x.group===group);if(add.length&&!grid.querySelector(`[data-recipe-slug="${add[0].slug}"]`))grid.insertAdjacentHTML('afterbegin',add.map(cardMarkup).join(''))});
}
function enhanceArchiveFilters(){
  const catalog=window.FringeTableCatalog||[];const byName=new Map(catalog.map(x=>[x.name,x]));document.querySelectorAll('.recipe-card').forEach(c=>{const x=byName.get(c.dataset.recipeName||'');if(x)c.dataset.group=x.group||''});
  const groups={africa:new Set(['maghreb-west-africa','horn-northeast-africa']),asia:new Set(['caucasus-central-west-asia','himalayas-south-asia','southeast-asia']),caribbean:new Set(['caribbean-lowcountry']),indigenous:new Set(['indigenous-americas'])};
  document.querySelectorAll('.filter').forEach(btn=>{const key=(btn.dataset.filter||'').toLowerCase();if(!groups[key])return;btn.addEventListener('click',()=>{document.querySelectorAll('.recipe-card').forEach(c=>c.hidden=!groups[key].has(c.dataset.group||''))})});
}
function addAccessibility(){
  if(!document.querySelector('.skip-link')){const a=document.createElement('a');a.className='skip-link';a.href='#main-content';a.textContent='Skip to content';document.body.prepend(a)}
  const main=document.querySelector('main');if(main&&!main.id)main.id='main-content';
  document.querySelectorAll('img').forEach((img,i)=>{if(i>0&&!img.closest('.recipe-hero'))img.loading=img.loading||'lazy';img.decoding='async'});
  document.querySelectorAll('a[target="_blank"]').forEach(a=>{const rel=new Set((a.rel||'').split(/\s+/).filter(Boolean));rel.add('noopener');a.rel=[...rel].join(' ')})
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
function finalize(){mergeDailyCatalogAndRender();setupAdsense();fixAffiliateDisclosureState();tagAmazonLinks();addAffiliateDisclosuresAndCookware();enhanceArchiveFilters();addAccessibility();addArchiveSearch();addSitePolish();if(!document.querySelector('script[data-traffic-layer]')){const t=document.createElement('script');t.src=base+'traffic.js?v=20260830d';t.dataset.trafficLayer='true';document.body.appendChild(t)}setTimeout(()=>{fixAffiliateDisclosureState();tagAmazonLinks();addArchiveSearch()},0)}
const core=document.createElement('script');core.src=base+'site-core.js?v=20260829c';core.onload=finalize;core.onerror=()=>{console.error('Fringe Table core script failed to load')};document.body.appendChild(core);
})();