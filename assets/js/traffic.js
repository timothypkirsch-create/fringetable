(()=>{
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
const cluster=clusters[current.group];
if(!cluster)return;
const esc=s=>String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const related=catalog.filter(x=>x.group===current.group&&x.slug!==slug).slice(0,3);
const sec=document.createElement('section');
sec.className='recipe-section traffic-discovery';
sec.innerHTML=`<span class="eyebrow">Keep exploring</span><h2>More from ${esc(cluster.title)}</h2><p>Use the regional guides to understand the ingredients and foodways around this dish, then continue into another recipe from the same part of the collection.</p><div class="essential-grid traffic-guide-grid"><a class="essential-card" href="${cluster.guide}"><strong>Food & culture guide</strong><span>Context, techniques and a guided path through the collection.</span><b>Read guide →</b></a><a class="essential-card" href="${cluster.pantry}"><strong>Pantry guide</strong><span>Ingredients worth keeping, sourcing notes and practical substitutions.</span><b>Open pantry →</b></a><a class="essential-card" href="${cluster.hub}"><strong>Regional hub</strong><span>Browse every recipe and Essential currently connected to this region.</span><b>Explore region →</b></a></div>${related.length?`<h3>Cook next</h3><div class="related-grid traffic-related-grid">${related.map(x=>`<a href="${esc(x.slug)}.html"><strong>${esc(x.name)}</strong><span>${esc(x.summary||x.region||'Continue exploring the collection.')}</span><b>View recipe →</b></a>`).join('')}</div>`:''}`;
const source=page.querySelector('.source-note');
if(source)source.before(sec);else page.appendChild(sec);
})();