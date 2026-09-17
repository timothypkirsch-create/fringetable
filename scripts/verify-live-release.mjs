import fs from 'node:fs';

const listFile=process.argv[2];
if(!listFile)throw new Error('Usage: node scripts/verify-live-release.mjs <batch-list-file>');
const batchFiles=fs.readFileSync(listFile,'utf8').split(/\r?\n/).filter(Boolean);
const recipes=batchFiles.flatMap(file=>JSON.parse(fs.readFileSync(file,'utf8')));
const expectedAds='google.com, pub-5498764120207111, DIRECT, f08c47fec0942fa0';
const protectedSlugs=fs.readFileSync('data/recipe-url-manifest.txt','utf8').split(/\r?\n/).filter(Boolean);
const pause=ms=>new Promise(resolve=>setTimeout(resolve,ms));
const esc=value=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
let lastErrors=[];

const maxAttempts=30;
for(let attempt=1;attempt<=maxAttempts;attempt++){
  const errors=[];
  for(const recipe of recipes){
    const url=`https://fringetable.com/recipes/${recipe.slug}.html`;
    try{
      const response=await fetch(url,{redirect:'follow',signal:AbortSignal.timeout(20000)});
      const html=await response.text();
      if(!response.ok)errors.push(`${recipe.slug}: HTTP ${response.status}`);
      if(!html.includes(`<h1>${esc(recipe.name)}</h1>`))errors.push(`${recipe.slug}: expected title not live`);
      if(!html.includes('assets/js/pronunciation.js'))errors.push(`${recipe.slug}: pronunciation loader not live`);
      const image=html.match(/<section class="recipe-hero">[\s\S]*?<img\b[^>]*src="([^"]+)"/i)?.[1];
      if(!image)errors.push(`${recipe.slug}: live hero image missing`);
      else try{const imageResponse=await fetch(new URL(image,url),{redirect:'follow',signal:AbortSignal.timeout(20000)});if(!imageResponse.ok)errors.push(`${recipe.slug}: image HTTP ${imageResponse.status}`)}catch(error){errors.push(`${recipe.slug}: image check failed: ${error.message}`)}
    }catch(error){errors.push(`${recipe.slug}: ${error.message}`)}
  }
  try{
    const [sitemapResponse,adsResponse,catalogResponse,pronunciationResponse]=await Promise.all([
      fetch('https://fringetable.com/sitemap.xml',{signal:AbortSignal.timeout(20000)}),
      fetch('https://fringetable.com/ads.txt',{signal:AbortSignal.timeout(20000)}),
      fetch('https://fringetable.com/assets/js/site-core.js',{signal:AbortSignal.timeout(20000)}),
      fetch('https://fringetable.com/assets/js/pronunciation.js',{signal:AbortSignal.timeout(20000)})
    ]);
    const [sitemap,ads,catalog]=await Promise.all([sitemapResponse.text(),adsResponse.text(),catalogResponse.text()]);
    for(const recipe of recipes)if(!sitemap.includes(`/recipes/${recipe.slug}.html`))errors.push(`${recipe.slug}: not in live sitemap`);
    for(const slug of protectedSlugs)if(!catalog.includes(`"slug":"${slug}"`))errors.push(`protected recipe missing from live catalog: ${slug}`);
    if(ads.trim()!==expectedAds)errors.push('live ads.txt authorization mismatch');
    if(!pronunciationResponse.ok)errors.push(`live pronunciation asset HTTP ${pronunciationResponse.status}`);
  }catch(error){errors.push(`live support-file check failed: ${error.message}`)}
  if(!errors.length){
    console.log(`Production verification passed for ${recipes.length} recipes on attempt ${attempt}.`);
    process.exit(0);
  }
  lastErrors=errors;
  console.log(`Production not ready on attempt ${attempt}; retrying.`);
  if(attempt<maxAttempts)await pause(10000);
}

for(const error of lastErrors)console.error(`ERROR: ${error}`);
process.exit(1);
