(()=>{
const KEY='fringetable-saved-recipes';
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const read=()=>{try{return JSON.parse(localStorage.getItem(KEY)||'[]')}catch{return[]}};
const write=items=>localStorage.setItem(KEY,JSON.stringify(items));
function recipeHref(slug){return `recipes/${slug}.html`}
function card(x){return `<article class="recipe-card" data-saved-slug="${esc(x.slug)}"><a class="card-image" href="${recipeHref(x.slug)}" aria-label="View ${esc(x.name)}"><img src="${esc(x.image||'assets/images/hero-preparation.jpg')}" alt="${esc(x.name)}" width="900" height="675" loading="lazy" decoding="async" referrerpolicy="no-referrer"></a><div class="card-body"><p class="card-meta">${esc(x.type||'Recipe')} · ${esc(x.time||'')}</p><h3>${esc(x.name)}</h3><p class="origin">${esc(x.region||'')}</p><p>${esc(x.summary||'')}</p><div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;"><a class="card-link" href="${recipeHref(x.slug)}">View recipe <span>→</span></a><button type="button" data-remove-saved="${esc(x.slug)}" style="border:0;background:none;padding:0;text-decoration:underline;cursor:pointer;">Remove</button></div></div></article>`}
function render(){
 const saved=read();const grid=document.querySelector('#savedRecipeGrid');const status=document.querySelector('#savedRecipeStatus');const empty=document.querySelector('#savedRecipeEmpty');if(!grid)return;
 const catalog=window.FringeTableCatalog||[];const bySlug=new Map(catalog.map(x=>[x.slug,x]));const items=saved.map(slug=>bySlug.get(slug)).filter(Boolean);
 grid.innerHTML=items.map(card).join('');empty.hidden=items.length>0;status.textContent=items.length?`${items.length} saved recipe${items.length===1?'':'s'} on this device.`:'Your saved list is empty.';
 grid.querySelectorAll('[data-remove-saved]').forEach(btn=>btn.addEventListener('click',()=>{write(read().filter(x=>x!==btn.dataset.removeSaved));render()}));
}
let tries=0;const wait=()=>{if((window.FringeTableCatalog||[]).length||tries>20)render();else{tries++;setTimeout(wait,100)}};wait();
})();