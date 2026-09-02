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

  const pageType=(()=>{
    if(isRecipe) return 'recipe';
    if(path.startsWith('/guides/')) return 'guide';
    if(path.startsWith('/collections/')) return 'collection';
    if(path.startsWith('/subrecipes/')) return 'essential';
    if(path==='/'||path.endsWith('/index.html')) return 'home';
    return 'other';
  })();

  const params=new URLSearchParams(location.search);
  const safe=(value,max=120)=>(value||'').toString().trim().slice(0,max);
  const ref=document.referrer||'';
  const refHost=(()=>{try{return new URL(ref).hostname.toLowerCase()}catch{return ''}})();
  const sourceFromRef=()=>{
    if(refHost.includes('google.')) return 'google';
    if(refHost.includes('facebook.com')||refHost.includes('fb.com')) return 'facebook';
    if(refHost.includes('bing.com')) return 'bing';
    if(refHost.includes('pinterest.')) return 'pinterest';
    return refHost||'direct';
  };

  const attributionKey='fringetable_first_touch_v1';
  let attribution={};
  try{
    attribution=JSON.parse(sessionStorage.getItem(attributionKey)||'{}')||{};
    if(!attribution.source){
      attribution={
        source:safe(params.get('utm_source')||sourceFromRef()),
        medium:safe(params.get('utm_medium')||(refHost?'referral':'direct')),
        campaign:safe(params.get('utm_campaign')),
        content:safe(params.get('utm_content')),
        landing_page:safe(path,200)
      };
      sessionStorage.setItem(attributionKey,JSON.stringify(attribution));
    }
  }catch{
    attribution={source:safe(params.get('utm_source')||sourceFromRef()),medium:safe(params.get('utm_medium')||(refHost?'referral':'direct'))};
  }

  const attributionParams=()=>({
    traffic_source:attribution.source||undefined,
    traffic_medium:attribution.medium||undefined,
    traffic_campaign:attribution.campaign||undefined,
    traffic_content:attribution.content||undefined,
    landing_page:attribution.landing_page||undefined,
    page_path:path,
    page_type:pageType,
    recipe_slug:recipeSlug||undefined
  });

  if(isRecipe){
    send('recipe_view',{
      recipe_slug:recipeSlug,
      recipe_name:h1||document.title,
      recipe_region:region||undefined,
      page_path:path
    });
  }

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
      send('newsletter_click',{...common,...attributionParams()});
      return;
    }

    if(host&&host!==location.hostname.toLowerCase()){
      send('outbound_click',{...common,link_domain:host});
    }
  },{capture:true});

  // Kit newsletter funnel. No email address or other form values are sent to GA4.
  const newsletterRoot=document.querySelector('.kit-home-signup,[data-newsletter],[class*="newsletter"]');
  if(newsletterRoot){
    let seen=false,started=false,submitted=false,confirmed=false;
    const eventBase=()=>({
      ...attributionParams(),
      signup_location:newsletterRoot.classList.contains('kit-home-signup')?'home_weekly_dish':'newsletter_embed',
      provider:'kit'
    });

    if('IntersectionObserver' in window){
      const io=new IntersectionObserver(entries=>{
        if(!seen&&entries.some(entry=>entry.isIntersecting&&entry.intersectionRatio>=0.25)){
          seen=true;
          send('newsletter_form_view',eventBase());
          io.disconnect();
        }
      },{threshold:[0.25]});
      io.observe(newsletterRoot);
    }else{
      seen=true;
      send('newsletter_form_view',eventBase());
    }

    const markStarted=()=>{
      if(started) return;
      started=true;
      send('newsletter_form_start',eventBase());
    };

    newsletterRoot.addEventListener('focusin',markStarted,true);
    newsletterRoot.addEventListener('input',markStarted,true);
    newsletterRoot.addEventListener('click',e=>{
      if(e.target.closest('input,button,[role="button"]')) markStarted();
    },true);

    document.addEventListener('submit',e=>{
      const form=e.target;
      const action=(form?.getAttribute?.('action')||'').toLowerCase();
      if(newsletterRoot.contains(form)||action.includes('kit.com')||action.includes('convertkit')){
        markStarted();
        if(!submitted){
          submitted=true;
          send('newsletter_form_submit',eventBase());
        }
      }
    },true);

    const successPattern=/thank you|thanks for subscribing|check your inbox|subscription confirmed|successfully subscribed|you.re subscribed/i;
    const checkSuccess=()=>{
      if(confirmed||!submitted) return;
      const text=(newsletterRoot.textContent||'').replace(/\s+/g,' ').trim();
      if(successPattern.test(text)){
        confirmed=true;
        send('newsletter_signup',{...eventBase(),signup_status:'confirmed_on_page'});
      }
    };
    new MutationObserver(checkSuccess).observe(newsletterRoot,{childList:true,subtree:true,characterData:true});

    // Some embedded providers report completion with postMessage. We only inspect status text,
    // never subscriber data, and require the message to come from Kit/ConvertKit domains.
    addEventListener('message',e=>{
      let host='';
      try{host=new URL(e.origin).hostname.toLowerCase()}catch{return}
      if(!(host.endsWith('kit.com')||host.endsWith('convertkit.com'))) return;
      const message=typeof e.data==='string'?e.data:JSON.stringify(e.data||{});
      if(submitted&&!confirmed&&successPattern.test(message)){
        confirmed=true;
        send('newsletter_signup',{...eventBase(),signup_status:'provider_confirmed'});
      }
    });
  }

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
