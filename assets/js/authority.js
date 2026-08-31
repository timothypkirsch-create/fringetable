(()=>{
if(!document.querySelector('script[data-image-fallback]')){const f=document.createElement('script');f.src='/assets/js/image-fallback.js?v=20260831a';f.dataset.imageFallback='true';document.body.appendChild(f)}
const path=location.pathname;
const slug=(path.split('/').pop()||'').replace('.html','');
const countryByRecipe={
 'ethiopian-doro-wat':['Ethiopia','/ethiopia/'],
 'shiro-wot':['Ethiopia','/ethiopia/'],
 'fossolia':['Ethiopia','/ethiopia/'],
 'soupe-joumou':['Haiti','/haiti/'],
 'haitian-diri-kole-pwa-rouj':['Haiti','/haiti/'],
 'myanmar-mohinga':['Myanmar','/myanmar/'],
 'myanmar-lahpet-thoke':['Myanmar','/myanmar/'],
 'nepali-momos':['Nepal','/nepal/'],
 'newari-yomari':['Nepal','/nepal/'],
 'georgian-lobio':['Georgia','/georgia/']
};
const problemGuides={
 'ethiopian-doro-wat':[['Can I make Doro Wat without niter kibbeh?','/guides/substitutions/doro-wat-without-niter-kibbeh.html']],
 'myanmar-mohinga':[['Banana stem substitutes for Mohinga','/guides/substitutions/banana-stem-substitute-for-mohinga.html']],
 'nigerian-egusi-soup':[['Egusi seed substitutes','/guides/substitutions/egusi-seed-substitute.html']],
 'uzbek-palov':[['What rice can replace devzira?','/guides/substitutions/devzira-rice-substitute.html']],
 'nepali-momos':[['Can I make momos without a steamer?','/guides/substitutions/momos-without-steamer.html']]
};
const page=document.querySelector('.recipe-page');
if(page&&!document.querySelector('.authority-discovery')){
 const country=countryByRecipe[slug];const problems=problemGuides[slug]||[];
 const sec=document.createElement('section');sec.className='recipe-section authority-discovery';
 const countryCard=country?`<a class="essential-card" href="${country[1]}"><strong>${country[0]} food hub</strong><span>Explore recipes, Essentials and guides specifically connected to ${country[0]}.</span><b>Explore country →</b></a>`:'';
 const problemCards=problems.map(([name,href])=>`<a class="essential-card" href="${href}"><strong>${name}</strong><span>Practical help when an ingredient or piece of equipment is difficult to source.</span><b>Read solution →</b></a>`).join('');
 sec.innerHTML=`<span class="eyebrow">Go deeper</span><h2>Country, ingredients & practical help</h2><div class="essential-grid">${countryCard}<a class="essential-card" href="/ingredients/"><strong>Specialty Ingredient Glossary</strong><span>Definitions and links for the less-familiar ingredients used across Fringe Table.</span><b>Browse ingredients →</b></a>${problemCards}</div>`;
 const existing=page.querySelector('.traffic-discovery');if(existing)existing.after(sec);else{const source=page.querySelector('.source-note');if(source)source.before(sec);else page.appendChild(sec)}
}
if(/^\/guides\/?(?:index\.html)?$/.test(path)&&!document.querySelector('.authority-guide-index')){
 const main=document.querySelector('main');if(main){const sec=document.createElement('section');sec.className='recipe-section authority-guide-index';sec.innerHTML=`<span class="eyebrow">Country authority</span><h2>Explore by country</h2><div class="essential-grid"><a class="essential-card" href="/ethiopia/"><strong>Ethiopia</strong><span>Doro Wat, Shiro Wot, Injera, Niter Kibbeh and berbere.</span><b>Explore →</b></a><a class="essential-card" href="/haiti/"><strong>Haiti</strong><span>Soup Joumou, Diri Kole ak Pwa Rouj and Epis.</span><b>Explore →</b></a><a class="essential-card" href="/myanmar/"><strong>Myanmar</strong><span>Mohinga, Lahpet Thoke and fermented tea leaves.</span><b>Explore →</b></a><a class="essential-card" href="/nepal/"><strong>Nepal</strong><span>Momos, Yomari, chutney and timur pepper.</span><b>Explore →</b></a><a class="essential-card" href="/georgia/"><strong>Georgia</strong><span>Lobio, mchadi and Georgian pantry flavors.</span><b>Explore →</b></a></div><span class="eyebrow">Problem-solving searches</span><h2>Substitution & equipment guides</h2><div class="essential-grid"><a class="essential-card" href="substitutions/banana-stem-substitute-for-mohinga.html"><strong>Banana Stem Substitute</strong><span>Practical options for Mohinga.</span><b>Read →</b></a><a class="essential-card" href="substitutions/doro-wat-without-niter-kibbeh.html"><strong>Doro Wat Without Niter Kibbeh</strong><span>What works and what changes.</span><b>Read →</b></a><a class="essential-card" href="substitutions/egusi-seed-substitute.html"><strong>Egusi Seed Substitute</strong><span>Seed-based alternatives and their limitations.</span><b>Read →</b></a><a class="essential-card" href="substitutions/devzira-rice-substitute.html"><strong>Devzira Rice Substitute</strong><span>Practical rice choices for palov.</span><b>Read →</b></a><a class="essential-card" href="substitutions/momos-without-steamer.html"><strong>Momos Without a Steamer</strong><span>Safe home-kitchen steaming setups.</span><b>Read →</b></a><a class="essential-card" href="/ingredients/"><strong>Ingredient Glossary</strong><span>A growing reference connecting unfamiliar ingredients to recipes and guides.</span><b>Browse →</b></a></div>`;main.appendChild(sec)}
}
})();