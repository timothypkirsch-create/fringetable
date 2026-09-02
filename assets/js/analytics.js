(()=>{
  const send=(name,params={})=>{
    if(typeof window.gtag!=='function') return;
    window.gtag('event',name,{...params,transport_type:'beacon'});
  };

  const path=location.pathname;
  const recipeMatch=path.match(/\/recipes\/([^/]+)\.html$/i);
  const isRecipe=Boolean(recipeMatch);
  const recipeSlug=recipeMatch?recipeMatch[1]:'';
  const h1=(document.querySelector('h1')?.textContent||'').trim();
  const region=(document.querySelector('.recipe-origin,.origin,[data-region]')?.textContent||'').trim();

  if(isRecipe){
    send('recipe_view',{
      recipe_slug:recipeSlug,
      recipe_name:h1||document.title,
      recipe_region:region||undefined,
      page_path:path
    });
  }

  const ref=document.referrer||'';
  const refHost=(()=>{try{return new URL(ref).hostname.toLowerCase()}catch{return ''}})();
  if(refHost.includes('facebook.com')||refHost.includes('fb.com')||refHost.includes('l.facebook.com')||refHost.includes('m.facebook.com')){
    send('facebook_referral_visit',{
      page_path:path,
      landing_page:location.href,
      referrer:ref
    });
  }

  document.addEventListener('click',e=>{
    const a=e.target.closest('a[href]');
    if(!a) return;
    let url;
    try{url=new URL(a.href,location.href)}catch{return}
    const host=url.hostname.toLowerCase();
    const text=(a.textContent||'').trim().replace(/\s+/g,' ').slice(0,120);
    const common={link_url:url.href,link_text:text,page_path:path};

    if(/(^|\.)amazon\.com$/.test(host)){
      send('affiliate_click',{
        ...common,
        affiliate_network:'amazon',
        recipe_slug:recipeSlug||undefined,
        link_kind:a.dataset.shopKind||'affiliate'
      });
      return;
    }

    const newsletterHint=`${a.href} ${a.className||''} ${a.id||''} ${text}`.toLowerCase();
    if(newsletterHint.includes('newsletter')||newsletterHint.includes('subscribe')||newsletterHint.includes('kit.com')||newsletterHint.includes('convertkit')){
      send('newsletter_click',common);
      return;
    }

    if(host&&host!==location.hostname.toLowerCase()){
      send('outbound_click',{...common,link_domain:host});
    }
  },{capture:true});

  const depthMarks=new Set();
  const checkDepth=()=>{
    const doc=document.documentElement;
    const max=Math.max(doc.scrollHeight-window.innerHeight,1);
    const pct=Math.round((window.scrollY/max)*100);
    [50,90].forEach(mark=>{
      if(pct>=mark&&!depthMarks.has(mark)){
        depthMarks.add(mark);
        send('scroll_depth',{percent_scrolled:mark,page_path:path,recipe_slug:recipeSlug||undefined});
      }
    });
  };
  addEventListener('scroll',checkDepth,{passive:true});
})();
