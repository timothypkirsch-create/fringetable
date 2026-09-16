# Recipe Difficulty Standard

Fringe Table uses three reader-facing difficulty levels. Difficulty describes the cooking work—not how familiar a cuisine or ingredient may be to a reader.

## Levels

- **Easy:** A short or forgiving method using straightforward home-kitchen techniques.
- **Moderate:** Several coordinated steps, sustained attention, dough handling, temperature control, or multiple components.
- **Advanced:** Specialized shaping, lamination, layered cooking, fermentation, precision work, or several techniques whose timing depends on one another.

Ingredient rarity, cultural unfamiliarity, chile heat, and total waiting time alone do not make a recipe difficult.

## Required metadata

Every recipe slug must have one entry in `data/recipe-difficulty.json`:

```json
{
  "recipe-slug": {
    "level": "Moderate",
    "reason": "Requires attention across several coordinated steps.",
    "source": "editorial batch"
  }
}
```

New expansion batches must provide `difficulty` and `difficultyReason`. The publisher updates both the durable JSON registry and its browser asset. `scripts/validate-site.mjs` blocks publication when a recipe lacks valid difficulty metadata.

`scripts/build-recipe-difficulty.mjs` documents and can reproduce the initial rules-based classification. Editorial review takes priority over the heuristic when a dish's defining technique needs a more specific assessment.
