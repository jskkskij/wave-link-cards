# AI-assisted internal links (human-governed)

This repo does **not** auto-merge machine-written links into production without review.

## Pipeline

1. **Inventory** — `docs/seo/content-inventory.json` lists public routes, pillar IDs, and primary source files.
2. **Suggestions** — Run `npm run seo:suggest-internal-links`. The script prints orphan detection (no inbound internal links from other `src` files) and rule-based outbound ideas using [`pillar-hubs.json`](pillar-hubs.json).
3. **Optional ChatGPT / Claude pass** — Paste the JSON inventory + script output; ask for **3 outbound + 2 inbound** ideas per page with **descriptive anchors** (no stuffing). Treat output as a draft only.
4. **Human PR** — Implement links in TSX/MDX; second reviewer checks anchors and graph logic against [`internal-linking-rules.md`](internal-linking-rules.md).
5. **CI** — Weekly orphan job (warn-only). Set job env `STRICT_INTERNAL_LINKS=1` later if you want failures on unresolved orphans.

## Canonical URLs

Marketing structured data and absolute URLs must align with `CONFIG.SITE_CANONICAL_ORIGIN` in [`src/lib/config.ts`](../../src/lib/config.ts).
