# Fringe Table

Static editorial recipe site.

## Cloudflare Workers deployment
- Production branch: `main`
- Build command: leave blank
- Deploy command: `npx wrangler deploy`
- Static assets are configured in `wrangler.jsonc`.

The repository root is the site root. `index.html`, `assets/`, `recipes/`, and `subrecipes/` must stay at the top level.
