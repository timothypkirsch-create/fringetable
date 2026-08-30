(()=>{
const nav=document.querySelector('.site-header nav ul');
if(nav){
  const add=(label,href,beforeRx)=>{if(nav.querySelector(`a[href*="${href.replace(/^\//,'').split('/')[0]}"]`))return;const li=document.createElement('li');li.innerHTML=`<a href="${href}">${label}</a>`;const before=[...nav.children].find(x=>beforeRx&&beforeRx.test(x.textContent||''));if(before)nav.insertBefore(li,before);else nav.appendChild(li)};
  add('Guides','/guides/',/About/i);add('Collections','/collections/',/About/i);add('Start Here','/start-here.html',/About/i);
}
const page=document.querySelector('.recipe-page');
if(!page||document.querySelector('.traffic-discovery'))return;
const slug=(location.pathname.split('/').pop()||'').replace('.html','');
const catalog=window.FringeTableCatalog||[];
const current=catalog.find(x=>x.slug===slug);
if(!current||!current.group)return;
const clusters={
  'indigenous-americas':{title:'Indigenous Americas',guide:'../guides/indigenous-americas-food-guide.html',pantry:'../guides/indigenous-americas-pantry-guide.html',hub:'regions/indigenous-americas/'},
  'horn-northeast-africa':{title:'Horn & Northeast Africa',guide:'../guides/ethiopian-food-guide.html',pantry:'../guides/ethiopian-pantry-guide.html',hub:'regions/horn-northeast-africa/'},
  'maghreb-west-africa':{title:'Maghreb & West Africa',guide:'../guides/maghreb-west-africa-food-guide.html',pantry:'../guides/maghreb-west-africa-pantry-guide.html',hub:'regions/maghreb-west-africa/'},
  'caribbean-lowcountry':{title:'Caribbean & Lowcountry',guide:'../guides/caribbean-lowcountry-food-guide.html',pantry:'../guides/caribbean-lowcountry-pantry-guide.html',hub:'regions/caribbean-lowcountry/'},
  'caucasus-central-west-asia':{title:'Caucasus, Central & West Asia',guide:'../guides/caucasus-central-west-asia-food-guide.html',pantry:'../guides/caucasus-central-west-asia-pantry-guide.html',hub:'regions/caucasus-central-west-asia/'},
  'himalayas-south-asia':{title:'Himalayas & South Asia',guide:'../guides/himalayas-south-asia-food-guide.html',pantry:'../guides/himalayas-south-asia-pantry-guide.html',hub:'regions/himalayas-south-asia/'},
  'southeast-asia':{title:'Southeast Asia',guide:'../guides/southeast-asia-food-guide.html',pantry:'../guides/southeast-asia-pantry-guide.html',hub:'regions/southeast-asia/'}
};
const topicGuides={
 'ethiopian-doro-wat':[
  ['What is berbere?','../guides/ingredients/what-is-berbere.html','Understand the spice blend that drives the stew.'],
  ['Cook with berbere','../guides/techniques/how-to-cook-with-berbere.html','Bloom berbere without scorching it.'],
  ['What to serve with doro wat','../guides/serve-with/what-to-serve-with-doro-wat.html','Build a complete meal around the stew.']],
 'shiro-wot':[['What is berbere?','../guides/ingredients/what-is-berbere.html','Learn the spice blend.'],['What is niter kibbeh?','../guides/ingredients/what-is-niter-kibbeh.html','Understand the spiced clarified butter.']],
 'zigni':[['What is berbere?','../guides/ingredients/what-is-berbere.html','Learn the spice blend used in the stew.'],['Cook with berbere','../guides/techniques/how-to-cook-with-berbere.html','Avoid scorching the spices.']],
 'nigerian-egusi-soup':[['What are egusi seeds?','../guides/ingredients/what-are-egusi-seeds.html','Learn what gives the soup its body.'],['What to serve with egusi soup','../guides/serve-with/what-to-serve-with-egusi-soup.html','Build the rest of the meal.']],
 'myanmar-lahpet-thoke':[['What is lahpet?','../guides/ingredients/what-is-lahpet.html','Learn about fermented tea leaves.'],['Using fermented tea leaves','../guides/techniques/how-fermented-tea-leaves-are-used.html','Balance lahpet with fresh and crunchy ingredients.']],
 'nepali-momos':[['What is timur pepper?','../guides/ingredients/what-is-timur-pepper.html','Learn the citrusy Himalayan spice.'],['Steam dumplings without bamboo','../guides/techniques/how-to-steam-dumplings-without-bamboo-steamer.html','Use common kitchen equipment.'],['What to serve with momos','../guides/serve-with/what-to-serve-with-momos.html','Chutney and lighter sides.']],
 'newari-yomari':[['Steam dumplings without bamboo','../guides/techniques/how-to-steam-dumplings-without-bamboo-steamer.html','A practical home steaming method.'],['Yomari Punhi foods','../guides/occasions/yomari-punhi-foods.html','Explore the festival context.']],
 'uzbek-palov':[['What is devzira rice?','../guides/ingredients/what-is-devzira-rice.html','Learn why the rice matters.'],['Keep palov rice separate','../guides/techniques/how-to-keep-palov-rice-separate.html','Rinse, soak, layer and steam.'],['What to serve with palov','../guides/serve-with/what-to-serve-with-uzbek-palov.html','Fresh sides for a rich rice dish.']],
 'ghanaian-waakye':[['Sorghum leaves in waakye','../guides/ingredients/what-are-sorghum-leaves.html','Why the traditional ingredient matters.']],
 'georgian-lobio':[['What to serve with Georgian lobio','../guides/serve-with/what-to-serve-with-georgian-lobio.html','Mchadi, pickles and herbs.']],
 'tunisian-lablabi':[['What to serve with lablabi','../guides/serve-with/what-to-serve-with-lablabi.html','Harissa, lemon and classic-style toppings.']],
 'amazigh-vegetable-couscous':[['Cook couscous properly','../guides/techniques/how-to-cook-couscous-properly.html','Quick hydration versus traditional steaming.']],
 'soupe-joumou':[['Haitian New Year foods','../guides/occasions/haitian-new-year-foods.html','The January 1 context around Soup Joumou.']],
 'persian-kuku-sabzi':[['Nowruz foods','../guides/occasions/nowruz-foods.html','Explore the Persian New Year context.']]
};
const cluster=clusters[current.group];if(!cluster)return;
const esc=s=>String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const related=catalog.filter(x=>x.group===current.group&&x.slug!==slug).slice(0,3);
const topics=topicGuides[slug]||[];
const topicMarkup=topics.length?`<h3>Learn this dish</h3><div class="essential-grid traffic-topic-grid">${topics.map(([name,href,text])=>`<a class="essential-card" href="${href}"><strong>${esc(name)}</strong><span>${esc(text)}</span><b>Read guide →</b></a>`).join('')}</div>`:'';
const sec=document.createElement('section');sec.className='recipe-section traffic-discovery';
sec.innerHTML=`<span class="eyebrow">Keep exploring</span><h2>More from ${esc(cluster.title)}</h2><p>Use the regional guides to understand the ingredients and foodways around this dish, then continue into another recipe from the same part of the collection.</p><div class="essential-grid traffic-guide-grid"><a class="essential-card" href="${cluster.guide}"><strong>Food & culture guide</strong><span>Context, techniques and a guided path through the collection.</span><b>Read guide →</b></a><a class="essential-card" href="${cluster.pantry}"><strong>Pantry guide</strong><span>Ingredients worth keeping, sourcing notes and practical substitutions.</span><b>Open pantry →</b></a><a class="essential-card" href="${cluster.hub}"><strong>Regional hub</strong><span>Browse every recipe and Essential currently connected to this region.</span><b>Explore region →</b></a></div>${topicMarkup}${related.length?`<h3>Cook next</h3><div class="related-grid traffic-related-grid">${related.map(x=>`<a href="${esc(x.slug)}.html"><strong>${esc(x.name)}</strong><span>${esc(x.summary||x.region||'Continue exploring the collection.')}</span><b>View recipe →</b></a>`).join('')}</div>`:''}<p class="traffic-browse-all"><a href="/collections/">Browse recipe collections by ingredient and technique →</a></p>`;
const source=page.querySelector('.source-note');if(source)source.before(sec);else page.appendChild(sec);
})();