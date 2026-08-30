import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const force = process.argv.includes('--force');
const now = new Date();
const parts = new Intl.DateTimeFormat('en-US', {
  timeZone: 'America/New_York',
  weekday: 'short',
  hour: '2-digit',
  hour12: false
}).formatToParts(now);
const weekday = parts.find(p => p.type === 'weekday')?.value;
const hour = Number(parts.find(p => p.type === 'hour')?.value);

if (!force && (weekday !== 'Thu' || hour !== 10)) {
  console.log(`Not the Thursday 10 AM Eastern send window (${weekday} ${hour}:00 ET). Skipping.`);
  process.exit(0);
}

const rotation = [
  'uzbek-palov',
  'myanmar-mohinga',
  'nepali-momos',
  'nigerian-egusi-soup',
  'georgian-lobio',
  'tunisian-lablabi',
  'afghan-ashak',
  'west-african-groundnut-stew',
  'myanmar-lahpet-thoke',
  'persian-kuku-sabzi',
  'moroccan-rfissa',
  'ghanaian-waakye',
  'haitian-diri-kole-pwa-rouj',
  'assamese-masor-tenga',
  'bhutanese-ema-datshi',
  'lao-khao-piak-sen',
  'azerbaijani-dovga',
  'soupe-joumou',
  'cherokee-bean-bread',
  'sudanese-ful-medames',
  'nigerian-moi-moi',
  'newari-yomari',
  'gullah-red-rice',
  'borani-banjan',
  'circassian-chicken',
  'harcha',
  'lao-or-lam',
  'senegalese-thiakry',
  'shiro-wot',
  'sri-lankan-kiribath',
  'zigni',
  'fossolia',
  'grape-dumplings',
  'hopi-piki-bread',
  'amazigh-vegetable-couscous',
  'ethiopian-doro-wat'
];

const start = Date.UTC(2026, 8, 3); // Thu Sep 3, 2026
const easternDateText = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'America/New_York',
  year: 'numeric', month: '2-digit', day: '2-digit'
}).format(now);
const [year, month, day] = easternDateText.split('-').map(Number);
const today = Date.UTC(year, month - 1, day);
const weekIndex = Math.max(0, Math.floor((today - start) / (7 * 24 * 60 * 60 * 1000)));
const slug = rotation[weekIndex % rotation.length];

const sendAt = new Date(Date.now() + 2 * 60 * 1000).toISOString();
const command = {
  operation: 'schedule_weekly_dish',
  source_url: `https://fringetable.com/recipes/${slug}.html`,
  send_at: sendAt,
  description: `Fringe Table automated Weekly Dish: ${slug}`
};

const commandPath = path.join(os.tmpdir(), `fringe-table-weekly-${Date.now()}.json`);
await fs.writeFile(commandPath, JSON.stringify(command, null, 2));
console.log(`Scheduling weekly dish ${slug} for ${sendAt}`);

const result = spawnSync(process.execPath, ['scripts/kit-bridge.mjs', commandPath], {
  stdio: 'inherit',
  env: process.env
});

if (result.status !== 0) process.exit(result.status ?? 1);
