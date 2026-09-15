import fs from 'node:fs/promises';

const missing=[
  {name:'Ethiopian Doro Wat',region:'Ethiopia / Horn of Africa',slug:'ethiopian-doro-wat',group:'horn-northeast-africa',type:'Main',time:'2 hrs 30 min',image:'https://commons.wikimedia.org/wiki/Special:FilePath/Ethiopian%20wat.jpg?width=1400',summary:'A detailed Ethiopian doro wat recipe with chicken, eggs, berbere, niter kibbeh, deeply cooked onions, cultural context, sourcing notes and doneness checkpoints.',story:'Doro wat is one of Ethiopia\'s most recognized dishes and is strongly associated with holidays, gatherings and patient communal cooking.'},
  {name:'Myanmar Lahpet Thoke',region:'Myanmar / Southeast Asia',slug:'myanmar-lahpet-thoke',group:'southeast-asia',type:'Salad / Snack',time:'30 min',image:'https://commons.wikimedia.org/wiki/Special:FilePath/Pickled%20tea%20leaves%20salad%2C%20Myanmar.jpg?width=1400',summary:'A practical Myanmar lahpet thoke recipe with fermented tea leaves, cabbage, tomato, peanuts, sesame, fried garlic and crisp legumes, plus cultural context and clear checkpoints.',story:'Lahpet thoke centers fermented tea leaves and is closely tied to hospitality and social eating in Myanmar; the salad depends on contrast between soft, savory tea leaves and crisp toppings.'},
  {name:'Myanmar Mohinga',region:'Myanmar / Southeast Asia',slug:'myanmar-mohinga',group:'southeast-asia',type:'Soup',time:'1 hr 20 min',image:'https://commons.wikimedia.org/wiki/Special:FilePath/Myanmar%E2%80%99s%20Traditional%20Food%20-%20Mohinga.jpg?width=1400',summary:'A detailed Myanmar mohinga recipe with fish, rice noodles, lemongrass, ginger, toasted rice flour, garnishes, cultural context, sourcing notes and visual checkpoints.',story:'Mohinga is widely described as Myanmar\'s national dish, with abundant regional variations and a strong association with breakfast, markets and street vendors.'},
  {name:'Uzbek Palov',region:'Uzbekistan / Central Asia',slug:'uzbek-palov',group:'caucasus-central-west-asia',type:'Rice / Main',time:'2 hrs',image:'https://commons.wikimedia.org/wiki/Special:FilePath/Urazmat-Plov.jpg?width=1400',summary:'Make Uzbek palov with lamb, carrots, cumin, garlic and rice using a step-by-step zirvak method, rice checkpoints and cultural context.',story:'UNESCO recognizes Uzbekistan\'s palov culture as living heritage tied to hospitality, weddings, celebrations, remembrance and knowledge passed through families and communities.'}
];

let core=await fs.readFile('assets/js/site-core.js','utf8');
for(const card of missing){
  if(!core.includes(`"slug":"${card.slug}"`))core=core.replace('const catalog=[',`const catalog=[${JSON.stringify(card)},`);
}
await fs.writeFile('assets/js/site-core.js',core);

let sitemap=await fs.readFile('sitemap.xml','utf8');
for(const slug of ['georgian-chakhokhbili','hanoi-bun-cha','jamaican-brown-stew-chicken']){
  const url=`https://fringetable.com/recipes/${slug}.html`;
  if(!sitemap.includes(`<loc>${url}</loc>`))sitemap=sitemap.replace('</urlset>',`<url><loc>${url}</loc><lastmod>2026-09-15</lastmod></url>\n</urlset>`);
}
await fs.writeFile('sitemap.xml',sitemap);
console.log('Repaired catalog and sitemap discovery gaps.');
