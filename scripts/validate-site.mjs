import fs from 'node:fs';
import path from 'node:path';

const fail=[];
const warn=[];
const read=file=>fs.readFileSync(file,'utf8');
const recipeDir='recipes';
const recipeFiles=fs.readdirSync(recipeDir)
  .filter(file=>file.endsWith('.html')&&file!=='index.html')
  .sort();
const recipeSlugs=recipeFiles.map(file=>file.replace(/\.html$/,''));
const recipeSet=new Set(recipeSlugs);

const core=read('assets/js/site-core.js');
const catalogSlugs=[...core.matchAll(/"slug":"([^"]+)"/g)].map(match=>match[1]);
const catalogCounts=new Map();
for(const slug of catalogSlugs)catalogCounts.set(slug,(catalogCounts.get(slug)||0)+1);
for(const [slug,count] of catalogCounts)if(count!==1)fail.push(`catalog duplicate: ${slug} appears ${count} times`);
for(const slug of recipeSlugs)if(!catalogCounts.has(slug))fail.push(`recipe missing from catalog: ${slug}`);
for(const slug of catalogCounts.keys())if(!recipeSet.has(slug))fail.push(`catalog entry missing recipe page: ${slug}`);

const sitemap=read('sitemap.xml');
for(const slug of recipeSlugs){
  const file=path.join(recipeDir,`${slug}.html`);
  const html=read(file);
  const canonical=`https://fringetable.com/recipes/${slug}.html`;
  if(!html.includes(`<link rel="canonical" href="${canonical}">`))fail.push(`${slug}: missing or incorrect canonical URL`);
  if(!html.includes('assets/js/pronunciation.js'))fail.push(`${slug}: pronunciation script not loaded`);
  if(!/<h1>[^<]+<\/h1>/i.test(html))fail.push(`${slug}: missing recipe h1`);
  if(!/<img\b[^>]*\balt="[^"]+"/i.test(html))fail.push(`${slug}: missing descriptive image alt text`);
  if(!sitemap.includes(`<loc>${canonical}</loc>`))fail.push(`${slug}: missing from sitemap`);
  const jsonLd=[...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
  let hasRecipeSchema=false;
  for(const match of jsonLd){
    try{
      const value=JSON.parse(match[1]);
      if(value?.['@type']==='Recipe')hasRecipeSchema=true;
    }catch{fail.push(`${slug}: invalid JSON-LD`)}
  }
  if(!hasRecipeSchema)fail.push(`${slug}: missing Recipe JSON-LD`);
  if(!/Story &amp; history|Story & history/i.test(html))warn.push(`${slug}: no standard Story & History label`);
}

const pronunciation=read('assets/js/pronunciation.js');
const terms=[...pronunciation.matchAll(/\['((?:\\'|[^'])+)'\s*,\s*'([^']+)'/g)]
  .map(match=>match[1].replace(/\\'/g,"'"));
const normalize=value=>String(value||'').toLowerCase().normalize('NFD')
  .replace(/[\u0300-\u036f]/g,'').replace(/&amp;/g,'&')
  .replace(/&#39;|&apos;/g,"'").replace(/[^a-z0-9]+/g,' ').trim();
for(const file of recipeFiles){
  const html=read(path.join(recipeDir,file));
  const title=html.match(/<h1>(.*?)<\/h1>/i)?.[1]?.replace(/<[^>]+>/g,'')||'';
  const normalized=normalize(title);
  if(!terms.some(term=>normalized.includes(normalize(term))))fail.push(`${file}: no matching pronunciation entry`);
}

const home=read('index.html');
const visibleCount=Number(home.match(/<span data-recipe-count>(\d+)<\/span>/)?.[1]);
const metaCount=Number(home.match(/content="Explore (\d+) lesser-known dishes/)?.[1]);
if(visibleCount!==recipeFiles.length)fail.push(`homepage visible count is ${visibleCount}; expected ${recipeFiles.length}`);
if(metaCount!==recipeFiles.length)fail.push(`homepage meta count is ${metaCount}; expected ${recipeFiles.length}`);

const ads=read('ads.txt').trim();
const expectedAds='google.com, pub-5498764120207111, DIRECT, f08c47fec0942fa0';
if(ads!==expectedAds)fail.push('ads.txt does not match the authorized AdSense record');
if(!read('robots.txt').includes('https://fringetable.com/sitemap.xml'))fail.push('robots.txt does not advertise the primary sitemap');

console.log(`Validated ${recipeFiles.length} recipe pages and ${catalogCounts.size} catalog entries.`);
for(const message of warn.slice(0,20))console.warn(`WARNING: ${message}`);
if(warn.length>20)console.warn(`WARNING: ${warn.length-20} additional warnings omitted.`);
if(fail.length){
  for(const message of fail)console.error(`ERROR: ${message}`);
  process.exit(1);
}
console.log('Site quality gate passed.');
