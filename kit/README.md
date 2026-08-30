# Fringe Table Kit Bridge

This bridge lets GitHub Actions securely call the Kit API without exposing the API key in the public website.

## One-time setup

1. In Kit, create/copy an API V4 key.
2. In GitHub, open this repository and go to **Settings → Secrets and variables → Actions**.
3. Create a new repository secret named exactly `KIT_API_KEY`.
4. Paste the Kit API key as the value and save it.

Never place the API key in a tracked file, issue, commit, website JavaScript, or command JSON.

## Commands

Commands live in `kit/commands/` and trigger the **Kit Bridge** GitHub Actions workflow when committed to `main`.

### Verify connection

```json
{
  "operation": "verify"
}
```

### Create a Weekly Dish draft from a Fringe Table recipe

```json
{
  "operation": "create_weekly_dish_draft",
  "source_url": "https://fringetable.com/path/to/recipe.html"
}
```

Optional fields: `subject`, `preview_text`, `intro`, `description`, and `email_address`.

### Schedule a Weekly Dish

```json
{
  "operation": "schedule_weekly_dish",
  "source_url": "https://fringetable.com/path/to/recipe.html",
  "send_at": "2026-09-05T10:00:00-04:00"
}
```

The bridge fetches the recipe's Recipe JSON-LD from Fringe Table, builds the branded Weekly Dish email, and creates the broadcast in Kit. Drafts use `send_at: null`; scheduled commands require an ISO-8601 `send_at` timestamp.

The default sender is `hello@fringetable.com`.
