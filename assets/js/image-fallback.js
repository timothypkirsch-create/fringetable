(()=>{
const FALLBACKS={
  'indigenous-americas':'/assets/images/cherokee-bean-bread.jpg',
  'horn-northeast-africa':'/assets/images/fossolia.jpg',
  'maghreb-west-africa':'/assets/images/west-african-groundnut-stew.jpg',
  'caribbean-lowcountry':'/assets/images/soupe-joumou.jpg',
  'caucasus-central-west-asia':'/assets/images/circassian-chicken.jpg',
  'himalayas-south-asia':'/assets/images/nepali-momos.jpg',
  'southeast-asia':'/assets/images/hero-preparation.jpg'
};
const DEFAULT='/assets/images/hero-preparation.jpg';
const catalog=()=>window.FringeTableCatalog||[];
const slugFromHref=href=>{
  if(!href)return'';
  const m=String(href).match(/\/recipes\/([^/?#]+?)(?:\.html)?(?:[?#]|$)/i)||String(href).match(/(?:^|\/)recipes\/([^/?#]+?)(?:\.html)?(?:[?#]|$)/i);
  return m?decodeURIComponent(m[1]).replace(/\.html$/,''):'';
};
const slugFor=img=>{
  const card=img.closest('a[href],article,.recipe-card,.card,[data-recipe]');
  if(card){
    const link=card.matches?.('a[href]')?card:card.querySelector?.('a[href*="recipes/"]');
    const found=slugFromHref(link?.getAttribute('href')||link?.href||'');
    if(found)return found;
  }
  if(/\/recipes\//.test(location.pathname))return(location.pathname.split('/').pop()||'').replace(/\.html$/,'');
  return'';
};
const fallbackFor=img=>{
  const slug=slugFor(img);
  const item=catalog().find(x=>x.slug===slug);
  return FALLBACKS[item?.group]||DEFAULT;
};
const replace=img=>{
  if(!(img instanceof HTMLImageElement)||img.dataset.ftFallbackApplied==='1')return;
  img.dataset.ftFallbackApplied='1';
  const prior=img.currentSrc||img.src||'';
  img.src=fallbackFor(img);
  img.removeAttribute('srcset');
  if(!img.alt||/image|photo/i.test(img.alt))img.alt='Fringe Table recipe image';
  img.dataset.ftBrokenSrc=prior;
};
const guard=img=>{
  if(!(img instanceof HTMLImageElement)||img.dataset.ftImageGuard==='1')return;
  img.dataset.ftImageGuard='1';
  img.addEventListener('error',()=>replace(img),{once:true});
  if(img.complete&&img.naturalWidth===0)replace(img);
};
const scan=root=>{
  if(root instanceof HTMLImageElement)guard(root);
  root.querySelectorAll?.('img').forEach(guard);
};
scan(document);
new MutationObserver(records=>records.forEach(r=>r.addedNodes.forEach(n=>{if(n.nodeType===1)scan(n)}))).observe(document.documentElement,{childList:true,subtree:true});
})();
