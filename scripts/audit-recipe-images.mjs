import fs from 'node:fs';

const text = fs.readFileSync('assets/js/site-core.js','utf8');
const entries = [];
const rx = /\{"name":"([^"]+)","region":"[^"]*","slug":"([^"]+)","group":"[^"]+","type":"[^"]*","time":"[^"]*","image":"([^"]+)"/g;
for (const m of text.matchAll(rx)) entries.push({name:m[1], slug:m[2], image:m[3]});

console.log(`image-audit catalog entries: ${entries.length}`);

async function check(entry) {
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
const concurrency = 6;
for (let i=0; i<entries.length; i+=concurrency) {
  results.push(...await Promise.all(entries.slice(i,i+concurrency).map(check)));
}

const broken = results.filter(r => !r.ok);
console.log(`image-audit broken: ${broken.length}`);
for (const r of broken) {
  console.log(`BROKEN\t${r.slug}\t${r.name}\tstatus=${r.status}\ttype=${r.type || '-'}\t${r.image}${r.error?`\terror=${r.error}`:''}`);
}

const suspicious = results.filter(r => r.ok && !/upload\.wikimedia\.org|images\.unsplash\.com|fringetable\.com|raw\.githubusercontent\.com/i.test(r.finalUrl || r.image));
console.log(`image-audit nonstandard-final-host: ${suspicious.length}`);
for (const r of suspicious) console.log(`HOST\t${r.slug}\t${r.finalUrl}`);

if (broken.length) process.exitCode = 2;
