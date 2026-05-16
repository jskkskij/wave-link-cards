# Sitemap (automated — do not commit `public/sitemap.xml`)

## Source of truth

[`scripts/seo-canonical-routes.json`](../../scripts/seo-canonical-routes.json) — add/remove routes here.

## What runs automatically

| When | What |
|------|------|
| `npm run build` | Writes fresh **`dist/sitemap.xml`** (git `lastmod` per route file) |
| `npm run prebuild` | Verifies route list in memory (no file commit needed) |
| GitHub Deploy workflow | Builds, checks `dist/sitemap.xml` exists, deploys `dist/` to Cloudflare |
| Weekly SEO health | Fetches live `https://getwaved.ai/sitemap.xml` from production |

You **do not** need:

```bash
node scripts/generate-sitemap.mjs && git add public/sitemap.xml
```

## Local dev (optional)

`public/sitemap.xml` is gitignored. For `npm run dev` only:

```bash
npm run seo:generate-sitemap
```

( writes to `dist/` by default; use `--out public/sitemap.xml` if you want it under Vite dev server )

## Adding a new public route

1. Add route in `src/App.tsx`
2. Add entry in `seo-canonical-routes.json`
3. Push — CI build generates sitemap on deploy
