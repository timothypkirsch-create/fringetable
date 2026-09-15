# Fringe Table Workflow Inventory

Last reviewed: 2026-09-15

Use this inventory before manually running or editing a GitHub Actions workflow. A workflow's presence in the repository does not mean it is part of current operations.

## Active operations

| Workflow | Trigger | Purpose | Mutation risk |
|---|---|---|---|
| `facebook-auto.yml` | Three daily schedules; manual slot | Publishes scheduled Facebook posts and records history | External Facebook post; writes history to `main` |
| `meta-facebook-post.yml` | Manual only | Publishes user-supplied Facebook copy | External Facebook post |
| `publish-expansion-batch.yml` | New/changed batch JSON; manual latest batch | Generates recipe pages and discovery data, validates, commits, then verifies production | Writes generated site files to `main` |
| `kit-bridge.yml` | Changed Kit command JSON; manual | Executes explicit Kit commands | External newsletter/account action |
| `weekly-dish.yml` | Thursday schedules; manual | Creates the weekly Kit send | External newsletter action |
| `site-quality.yml` | Relevant pushes and pull requests | Runs the deterministic site quality gate | Read-only |
| `region-audit.yml` | Catalog/audit-script changes; manual | Reports region counts and deterministic image-source checks | Read-only |

Never test an external-posting workflow casually. Inspect inputs and target files first, and refer to secrets only by variable name.

## Historical one-off workflows

These remain for provenance but are not current publishing paths. Their manual triggers are intentionally removed so they cannot be rerun accidentally.

- `audit-snapshot-20260910.yml`
- `catalog-repair-20260831.yml`
- `finalize-pronunciation-layer-20260831.yml`
- `fix-verified-recipe-images-20260831.yml`
- `run-expansion-batch-20260830.yml`
- `run-expansion-batch-2.yml`
- `run-expansion-batch-3.yml`
- `run-expansion-batch-4.yml`

The path-specific push triggers on these files preserve their historical definitions but remain dormant unless the corresponding dated repair script or trigger file is deliberately changed. New recipe publishing must use `publish-expansion-batch.yml`.

## Before changing automation

1. Pull or inspect the latest `main` branch.
2. Confirm whether the workflow posts externally or writes to `main`.
3. Preserve concurrency and retry protections on Facebook history updates.
4. Run `node scripts/validate-site.mjs` for site-generating changes.
5. Verify the resulting GitHub Actions run and production pages.
6. Update this inventory when a workflow's trigger or responsibility changes.
