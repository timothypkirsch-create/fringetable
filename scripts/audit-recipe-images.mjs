import fs from 'node:fs';
import path from 'node:path';

const text = fs.readFileSync('assets/js/site-core.js','utf8');
const entries = [];
const rx = /\{"name":"([^"]+)","region":"[^"]*","slug":"([^"]+)","group":"[^"]+","type":"[^"]*","time":"[^"]*","image":"([^"]+)"/g;
for (const m of text.matchAll(rx)) entries.push({name:m[1], slug:m[2], image:m[3]});

console.log(`image-audit catalog entries: ${entries.length}`);

async function check(entry) {
  if (!/^https?:\/\//i.test(entry.image)) {
    const rel = entry.image.replace(/^\//,'');
    const exists = fs.existsSync(path.resolve(rel));
    return { ...entry, ok: exists, status: exists ? 'LOCAL' : 'MISSING_LOCAL', type: exists ? 'local-file' : '', finalUrl: entry.image };
  }
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);
  try {
    const res = await fetch(entry.image, {
      method: 'GET',
      redirect: 'follow',
      signal: controller.signal,
      headers: {
        'User-Agent': 'FringeTableImageAudit/1.0 (+https://fringetable.com)',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
      }
    });
    const type = (res.headers.get('content-type') || '').toLowerCase();
    if (res.body) await res.body.cancel().catch(()=>{});
    return { ...entry, ok: res.ok && type.startsWith('image/'), status: res.status, type, finalUrl: res.url };
  } catch (err) {
    return { ...entry, ok: false, status: 'ERR', type: '', finalUrl: '', error: err?.name || String(err) };
  } finally {
    clearTimeout(timer);
  }
}

const results = [];
const concurrency = 4;
for (let i=0; i<entries.length; i+=concurrency) {
  results.push(...await Promise.all(entries.slice(i,i+concurrency).map(check)));
}

const hardBroken = results.filter(r => r.status===404 || r.status===410 || r.status==='MISSING_LOCAL');
const transient = results.filter(r => !r.ok && !hardBroken.includes(r));
console.log(`image-audit hard-broken: ${hardBroken.length}`);
for (const r of hardBroken) console.log(`BROKEN\t${r.slug}\t${r.name}\tstatus=${r.status}\t${r.image}`);
console.log(`image-audit transient-or-rate-limited: ${transient.length}`);
for (const r of transient.slice(0,20)) console.log(`TRANSIENT\t${r.slug}\tstatus=${r.status}\t${r.image}`);
if (transient.length>20) console.log(`TRANSIENT\t... ${transient.length-20} more omitted`);

const suspicious = results.filter(r => r.ok && /^https?:\/\//i.test(r.image) && !/upload\.wikimedia\.org|thumb\.wikimedia\.org|images\.unsplash\.com|fringetable\.com|raw\.githubusercontent\.com/i.test(r.finalUrl || r.image));
console.log(`image-audit nonstandard-final-host: ${suspicious.length}`);
for (const r of suspicious) console.log(`HOST\t${r.slug}\t${r.finalUrl}`);

// This audit reports image-source problems but does not fail CI. The site carries a
// browser-side fallback so a dead remote image cannot leave a blank recipe card.
