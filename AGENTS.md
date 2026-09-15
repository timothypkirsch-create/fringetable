# Fringe Table Working Instructions

These instructions apply to the entire repository and to every future coding or content session.

## Start here

1. Read `PROJECT_CONTEXT.md` before making changes.
2. Read `CONTENT_EXPANSION.md` for recipe and cultural/editorial standards.
3. Inspect the current `main` branch and recent relevant commits.
4. Treat repository files and verified live behavior as more authoritative than remembered chat details.
5. If the repository and a request conflict, follow the explicit current request and document the resulting durable decision.

## Repository constraints

- This is a static site deployed through Cloudflare Workers.
- Keep the website root structure intact. Do not relocate `index.html`, `assets/`, `recipes/`, or `subrecipes/` without an explicit migration plan.
- Preserve existing URLs and canonical paths whenever possible.
- Do not overwrite unrelated changes.
- Avoid broad automated rewrites unless the complete diff is reviewed.
- Keep new generated or temporary files out of the public site root unless they are intended for production.

## Content changes

- Match the existing Fringe Table voice and page structure.
- Verify cultural and historical claims against reliable sources.
- Never invent citations, image licenses, product data, ratings, prices, or availability.
- Keep recipe measurements and methods realistic for a home kitchen.
- Preserve accessibility: descriptive alternative text, semantic headings, keyboard-usable controls, sufficient contrast, and responsive layouts.
- Update all affected discovery surfaces when publishing recipes: catalog data, region hubs, collections/guides, internal links, image credits, and sitemaps.
- Preserve the recipe-name pronunciation guide on every recipe page. New batches must include pronunciation metadata, update `assets/js/pronunciation.js`, load that script on the generated page, and pass `scripts/audit-pronunciation-coverage.mjs` with no missing titles.

## Advertising and monetization

- Keep the root `ads.txt` authorization intact unless the publisher ID is explicitly changed.
- Preserve clear separation between editorial content and advertisements.
- Keep affiliate disclosures visible and use appropriate `sponsored`, `nofollow`, and `noopener` attributes.
- Use Amazon tracking ID `fringetable-20` only as documented in `PROJECT_CONTEXT.md`.

## Automations and external services

- Facebook and Kit actions are mediated by GitHub Actions workflows.
- Never print, read back, commit, or request the values of repository secrets.
- Before altering a workflow, inspect its trigger conditions, permissions, concurrency behavior, external side effects, and write-back behavior.
- A file change can cause an external action. Pay special attention to `.github/workflows/` and `kit/commands/`.
- Do not trigger a manual social post, newsletter, campaign, or other external publication without an explicit request.
- After automation changes, verify the applicable workflow result before declaring success.

## Verification checklist

Use the portions relevant to the change:

- Review `git diff` before committing.
- Check internal links and referenced assets.
- Validate HTML/JSON/JSON-LD syntax where touched.
- Confirm catalog counts and sitemap coverage after content changes.
- Check the affected page at desktop and mobile widths after layout changes.
- Verify `https://fringetable.com/ads.txt` after advertising/deployment changes.
- Confirm GitHub Actions evidence after workflow changes.
- Confirm the live production page after deployment-sensitive changes.

## Documentation

- Add meaningful completed milestones to `CHANGELOG.md`.
- Update `PROJECT_CONTEXT.md` whenever an identifier, integration, deployment method, schedule, security rule, or durable project decision changes.
- Never document secret values.
