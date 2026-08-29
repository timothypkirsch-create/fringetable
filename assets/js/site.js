(()=>{
const current=document.currentScript;
const base=current&&current.src?current.src.replace(/site\.js(?:\?.*)?$/,''):new URL('assets/js/',location.href).href;
const AMAZON_TAG='fringetable-20';
const ADSENSE_CLIENT='ca-pub-5498764120207111';

function amazonUrl(query){return `https://www.amazon.com/s?k=${encodeURIComponent(query)}&tag=${AMAZON_TAG}`}
function setupAdsense(){
  if(document.querySelector(`script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}"]`))return;
  const s=document.createElement('script');
  s.async=true;s.crossOrigin='anonymous';
  s.src=`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;
  document.head.appendChild(s);
}
function tagAmazonLinks(){
  document.querySelectorAll('a[href*="amazon.com"]').forEach(a=>{
    try{
      const u=new URL(a.href,location.href);
      if(!/(^|\.)amazon\.com$/i.test(u.hostname))return;
      u.searchParams.set('tag',AMAZON_TAG);
      a.href=u.toString();
      a.target='_blank';
      const rel=new Set((a.rel||'').split(/\s+/).filter(Boolean));
      ['sponsored','nofollow','noopener'].forEach(x=>rel.add(x));a.rel=[...rel].join(' ');
      a.dataset.affiliateReady='true';
    }catch(e){}
  });
}
const cookware={
'nigerian-egusi-soup':['heavy Dutch oven','stockpot'],
'lao-khao-piak-sen':['large stockpot','wooden rolling pin'],
'ghanaian-waakye':['heavy bottom cooking pot'],
'nigerian-moi-moi':['large steamer pot'],
'persian-kuku-sabzi':['oven safe nonstick skillet'],
'grape-dumplings':['heavy saucepan'],
'fossolia':['large saute pan'],
'borani-banjan':['large skillet'],
'soupe-joumou':['large stockpot'],
'harcha':['cast iron griddle'],
'circassian-chicken':['food processor'],
'gullah-red-rice':['enameled Dutch oven'],
'amazigh-vegetable-couscous':['couscoussier steamer'],
'nepali-momos':['dumpling steamer basket'],
'west-african-groundnut-stew':['enameled Dutch oven'],
'assamese-masor-tenga':['deep saute pan'],
'afghan-ashak':['dumpling steamer basket'],
'cherokee-bean-bread':['large steamer pot'],
'shiro-wot':['heavy saucepan'],
'zigni':['enameled Dutch oven'],
'georgian-lobio':['clay cooking pot'],
'moroccan-rfissa':['large steamer pot'],
'tunisian-lablabi':['heavy saucepan'],
'newari-yomari':['dumpling steamer basket'],
'senegalese-thiakry':['fine mesh sieve'],
'sudanese-ful-medames':['heavy saucepan'],
'lao-or-lam':['enameled Dutch oven'],
'hopi-piki-bread':['cast iron griddle'],
'haitian-diri-kole-pwa-rouj':['heavy bottom cooking pot'],
'bhutanese-ema-datshi':['heavy saucepan'],
'azerbaijani-dovga':['heavy saucepan'],
'sri-lankan-kiribath':['heavy bottom cooking pot']
};
function disclosureText(){return 'As an Amazon Associate I earn from qualifying purchases. Some links below are affiliate links; if you buy through them, Fringe Table may earn a commission at no additional cost to you.'}
function addAffiliateDisclosuresAndCookware(){
  const recipePage=document.querySelector('.recipe-page');
  if(!recipePage)return;
  const slug=(location.pathname.split('/').pop()||'').replace('.html','');
  const source=document.querySelector('.ingredient-sourcing');
  if(source&&!source.querySelector('.affiliate-inline-disclosure')){
    const p=document.createElement('p');p.className='affiliate-inline-disclosure';p.textContent=disclosureText();
    const h=source.querySelector('h2');(h||source.firstChild)?.after(p);
  }
  const items=cookware[slug];
  if(items&&!document.querySelector('.cookware-sourcing')){
    const sec=document.createElement('section');sec.className='recipe-section ingredient-sourcing cookware-sourcing';
    sec.innerHTML=`<span class="eyebrow">Useful cookware</span><h2>Tools that make this recipe easier</h2><p class="affiliate-inline-disclosure">${disclosureText()}</p><p>These are practical search links for equipment suited to this recipe. Choose the size, material and seller that fit your kitchen and budget.</p><div class="shop-links">${items.map(q=>`<a href="${amazonUrl(q)}" target="_blank" rel="sponsored nofollow noopener" data-affiliate-ready="true" data-shop-kind="cookware" data-shop-label="${q}">Shop ${q} on Amazon <span>↗</span></a>`).join('')}</div>`;
    const ingredient=document.querySelector('.ingredient-sourcing:not(.cookware-sourcing)');
    if(ingredient)ingredient.after(sec);else{
      const cols=document.querySelector('.recipe-columns');
      (cols?.closest('.recipe-section')||document.querySelector('.recipe-section:last-of-type'))?.after(sec);
    }
  }
  const footer=document.querySelector('.footer-inner');
  if(footer&&!footer.querySelector('.amazon-footer-disclosure')){
    const p=document.createElement('p');p.className='amazon-footer-disclosure';p.textContent='As an Amazon Associate I earn from qualifying purchases.';footer.appendChild(p);
  }
}
function enhanceArchiveFilters(){
  const catalog=window.FringeTableCatalog||[];
  const byName=new Map(catalog.map(x=>[x.name,x]));
  document.querySelectorAll('.recipe-card').forEach(c=>{const x=byName.get(c.dataset.recipeName||'');if(x)c.dataset.group=x.group||''});
  const groups={africa:new Set(['maghreb-west-africa','horn-northeast-africa']),asia:new Set(['caucasus-central-west-asia','himalayas-south-asia','southeast-asia']),caribbean:new Set(['caribbean-lowcountry']),indigenous:new Set(['indigenous-americas'])};
  document.querySelectorAll('.filter').forEach(btn=>{
    const key=(btn.dataset.filter||'').toLowerCase();if(!groups[key])return;
    btn.addEventListener('click',()=>{document.querySelectorAll('.recipe-card').forEach(c=>c.hidden=!groups[key].has(c.dataset.group||''))});
  });
}
function finalize(){setupAdsense();tagAmazonLinks();addAffiliateDisclosuresAndCookware();enhanceArchiveFilters();setTimeout(tagAmazonLinks,0)}
const core=document.createElement('script');core.src=base+'site-core.js?v=20260829c';core.onload=finalize;core.onerror=()=>{console.error('Fringe Table core script failed to load')};document.body.appendChild(core);
})();
