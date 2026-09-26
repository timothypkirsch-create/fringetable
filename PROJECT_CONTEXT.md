# Fringe Table Project Context

Last verified: 2026-09-26

This document is the durable operational record for FringeTable.com. Update it whenever a project-wide decision, external service, publishing process, or important identifier changes. Chat history and memory are useful context, but this repository is the source of truth.

## Project identity

- Site: https://fringetable.com
- Brand: Fringe Table
- Tagline: Recipes from the Culinary Margins
- Purpose: Publish practical recipes, food histories, ingredient guidance, and regional collections centered on culinary traditions that are often underrepresented in mainstream food media.
- Public presentation: The site is organization-led. Do not add personal owner information unless explicitly requested.
- Contact address currently used in the site and automations: `hello@fringetable.com`

## Repository and deployment

- GitHub repository: `timothypkirsch-create/fringetable`
- Default and production branch: `main`
- Site type: Static HTML, CSS, and JavaScript.
- Production platform: Cloudflare Workers static assets.
- Worker name: `fringetable-v2`
- Deployment command: `npx wrangler deploy`
- Build command: None.
- Configuration: `wrangler.jsonc`
- The repository root is the public site root. Keep `index.html`, `assets/`, `recipes/`, and `subrecipes/` at the top level.

Do not treat a successful GitHub commit as proof that production is healthy. For deployment-sensitive changes, verify both the live URL and the expected response/content after deployment.

Extensionless legacy recipe, subrecipe, and nested-guide URLs are permanently redirected by `_redirects` to canonical HTTPS `.html` URLs. Preserve these rules to avoid splitting search signals across duplicate URL variants.
Cloudflare Workers must retain `"html_handling": "none"` in `wrangler.jsonc`; the default automatic HTML handling redirects canonical `.html` URLs back to extensionless paths and creates a loop with these canonicalization rules.
Because automatic HTML handling is disabled, `_redirects` must also retain explicit internal rewrites for `/` and every directory index, plus exact redirects for root-level extensionless pages. Generate and validate the complete set with `scripts/build-canonical-redirects.mjs`.

The repository-wide static quality gate is `node scripts/validate-site.mjs`. Every Recipe JSON-LD object must include an absolute HTTPS image URL and ISO 8601 `prepTime`, `cookTime`, and `totalTime` values. Recipe batch publishing runs the gate before committing generated files and then uses `scripts/verify-live-release.mjs` to confirm the production pages, sitemap, pronunciation loader, and `ads.txt`. `.github/workflows/site-quality.yml` also runs the static gate on relevant pushes and pull requests.

## Current site architecture

As of the verification date, the repository contains:

- 180 individual recipe pages in `recipes/`
- 18 individual Essentials/subrecipe pages in `subrecipes/`
- 41 guide pages below `guides/`
- Regional hubs, collections, ingredient guidance, pronunciation content, saved recipes, legal/disclosure pages, and image credits
- Catalog/search behavior primarily driven by `assets/js/site.js` and `assets/js/site-core.js`
- Recipe difficulty metadata is maintained in `data/recipe-difficulty.json`, rendered through `assets/js/recipe-difficulty.js`, and enforced by the site quality gate. Levels reflect technique and coordination, never cultural unfamiliarity or ingredient rarity.
- Primary sitemap: `sitemap.xml`
- Additional recipe sitemap: `sitemap-recipes-20260830.xml`
- Crawler rules: `robots.txt`

When adding or removing a recipe, reconcile the recipe page, catalog source, region hub, relevant collections/guides, internal links, image credits, and sitemap entries.

## Editorial and design principles

- Preserve the polished editorial recipe-site presentation and the existing green visual system.
- Keep the site accessible, responsive, searchable, and usable on mobile.
- Give recipes specific country, community, or regional framing; do not flatten broad regions into a single cuisine.
- Clearly distinguish documented history from household variation or adaptation.
- Use credible cultural, institutional, government, museum, university, or established culinary sources.
- Use legally reusable, correctly attributed images. Never guess an image license or attribution.
- Preserve detailed methods with practical doneness, texture, aroma, or visual checkpoints.
- Modernize the thinnest legacy pages in small, source-reviewed batches; preserve URLs and design while expanding cultural context, preparation guidance, structured recipe data, and sitemap modification dates.
- Image auditing defaults to deterministic local-file and source-reuse checks; run `node scripts/audit-recipe-images.mjs --network` only where outbound image-host access is reliable.
- Do not publish culturally sensitive ceremonial material as a generic home recipe without reliable public culinary documentation.
- Follow the full recipe standards in `CONTENT_EXPANSION.md`.
- Every recipe page must load `assets/js/pronunciation.js` and resolve its title to a researched phonetic pronunciation and cultural/language context. Validate complete coverage with `node scripts/audit-pronunciation-coverage.mjs` after recipe publishing.

## Advertising, analytics, and affiliate configuration

### Google AdSense

- Publisher ID: `pub-5498764120207111`
- Root authorization file: `ads.txt`
- Required live content:
  `google.com, pub-5498764120207111, DIRECT, f08c47fec0942fa0`
- `_headers` currently gives `/ads.txt` a five-minute public cache.
- Always verify `https://fringetable.com/ads.txt` returns HTTP 200, `text/plain`, and the exact authorized line after a deployment change.
- AdSense may continue showing a stale status while Google recrawls the site. Do not change a correct live file solely because the dashboard has not refreshed.

### Google Analytics

- GA4 measurement ID: `G-WZDVZ4NW8V`
- Shared event behavior: `assets/js/analytics.js`
- Installation/support scripts include `scripts/install-ga4.mjs` and `scripts/install-analytics-events.mjs`.

### Amazon Associates

- Tracking ID: `fringetable-20`
- Preserve affiliate disclosures and sponsored/nofollow link treatment.
- Only use affiliate links for genuinely useful specialty ingredients or culturally/methodologically relevant cookware.
- Never invent product ratings, prices, availability, or claims.

## Facebook bridge

Facebook publishing is intentionally mediated by GitHub Actions. It is not dependent on a direct Facebook connector in ChatGPT.

### Automated posting

- Workflow: `.github/workflows/facebook-auto.yml`
- Script: `scripts/facebook-auto.mjs`
- History: `data/facebook-post-history.json`
- Schedule is stored in UTC in the workflow and currently has three daily trigger windows.
- Scheduled runs add a randomized delay before publishing.
- Successful posts update the history file and commit it back to `main`.
- The history-push step includes retry/rebase handling for concurrent updates.

### Manual posting

- Workflow: `.github/workflows/meta-facebook-post.yml`
- Script: `scripts/meta-facebook-post.mjs`
- Manual inputs: message and optional Fringe Table link.

### Required GitHub Actions secrets

- `META_PAGE_ID`
- `META_PAGE_ACCESS_TOKEN`

Never place secret values in source files, project documentation, chat summaries, issues, or logs. The latest verified Facebook history commit before this document was created was recorded on 2026-09-15, confirming that the scheduled bridge had recently completed successfully.

## Kit email bridge

- Command bridge workflow: `.github/workflows/kit-bridge.yml`
- Bridge script: `scripts/kit-bridge.mjs`
- Command directory: `kit/commands/`
- Setup documentation: `kit/README.md`
- Weekly workflow: `.github/workflows/weekly-dish.yml`
- Required GitHub Actions secret: `KIT_API_KEY`

Do not commit the Kit API key or other credentials. Review command JSON carefully before pushing because changes under `kit/commands/*.json` can trigger external actions.

## Important workflow inventory

The maintained active/historical classification and safe-run notes live in `docs/WORKFLOWS.md`.

- `facebook-auto.yml`: Scheduled Facebook publishing.
- `meta-facebook-post.yml`: Manually dispatched Facebook page post.
- `kit-bridge.yml`: Executes changed Kit command files.
- `weekly-dish.yml`: Weekly Kit newsletter workflow.
- `region-audit.yml`: Regional catalog audit.
- `publish-expansion-batch.yml`: Publishes queued expansion content.
- `run-expansion-batch-*.yml`: Historical/targeted expansion batches.
- Date-stamped repair and audit workflows: Preserved for provenance with manual triggers removed; do not reactivate without reviewing their dated scripts against current `main`.

## Security and privacy rules

- Never expose GitHub Actions secrets, access tokens, API keys, account recovery information, or private credentials.
- Refer to secrets only by variable name.
- Do not add personal owner-identifying information to public pages or repository documentation without explicit approval.
- Preserve `privacy.html`, `terms.html`, `affiliate-disclosure.html`, and `image-credits.html` when features affecting data collection, advertising, affiliate links, or imagery change.
- Review generated content and automation inputs before allowing them to publish externally.

## Operating procedure for future chats

At the start of every Fringe Table task:

1. Read `AGENTS.md` and this file.
2. Pull or inspect the latest `main` branch; do not rely on an old local checkout.
3. Review the relevant files and recent commits before proposing or making changes.
4. Preserve unrelated existing work.
5. Test locally where practical.
6. For production or automation issues, inspect the live result or latest run evidence.
7. Update this document and `CHANGELOG.md` when a durable project fact changes.

## Recovery note

Some earlier ChatGPT conversations were accidentally deleted and cannot be restored. This record was reconstructed on 2026-09-15 from the live repository, its commit history, current project context, and observed automation evidence. Where an old conversational preference was not preserved in code, documentation, or memory, it should be treated as unknown rather than guessed.
