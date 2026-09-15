import fs from 'node:fs';

const listFile=process.argv[2];
if(!listFile)throw new Error('Usage: node scripts/verify-live-release.mjs <batch-list-file>');
const batchFiles=fs.readFileSync(listFile,'utf8').split(/\r?\n/).filter(Boolean);
const recipes=batchFiles.flatMap(file=>JSON.parse(fs.readFileSync(file,'utf8')));
const expectedAds='google.com, pub-5498764120207111, DIRECT, f08c47fec0942fa0';
const pause=ms=>new Promise(resolve=>setTimeout(resolve,ms));
const esc=value=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
let lastErrors=[];

for(let attempt=1;attempt<=12;attempt++){
  const errors=[];
  for(const recipe of recipes){
    const url=`https://fringetable.com/recipes/${recipe.slug}.html`;
    try{
      const response=await fetch(url,{redirect:'follow',signal:AbortSignal.timeout(20000)});
      const html=await response.text();
      if(!response.ok)errors.push(`${recipe.slug}: HTTP ${response.status}`);
      if(!html.includes(`<h1>${esc(recipe.name)}</h1>`))errors.push(`${recipe.slug}: expected title not live`);
      if(!html.includes('assets/js/pronunciation.js'))errors.push(`${recipe.slug}: pronunciation loader not live`);
    }catch(error){errors.push(`${recipe.slug}: ${error.message}`)}
  }
  try{
    const [sitemapResponse,adsResponse]=await Promise.all([
      fetch('https://fringetable.com/sitemap.xml',{signal:AbortSignal.timeout(20000)}),
      fetch('https://fringetable.com/ads.txt',{signal:AbortSignal.timeout(20000)})
    ]);
    const [sitemap,ads]=await Promise.all([sitemapResponse.text(),adsResponse.text()]);
    for(const recipe of recipes)if(!sitemap.includes(`/recipes/${recipe.slug}.html`))errors.push(`${recipe.slug}: not in live sitemap`);
    if(!ads.includes(expectedAds))errors.push('live ads.txt authorization mismatch');
  }catch(error){errors.push(`live support-file check failed: ${error.message}`)}
  if(!errors.length){
    console.log(`Production verification passed for ${recipes.length} recipes on attempt ${attempt}.`);
    process.exit(0);
  }
  lastErrors=errors;
  console.log(`Production not ready on attempt ${attempt}; retrying.`);
  if(attempt<12)await pause(10000);
}

for(const error of lastErrors)console.error(`ERROR: ${error}`);
process.exit(1);
