# Internal linking rules (hub graph)

Authoritative pillar definitions live in [`pillar-hubs.json`](pillar-hubs.json).

## Operating rules

1. **Declare pillar + money targets** when adding or updating any marketing URL (PR description or `docs/seo/content-inventory.json`).
2. **Satellite pages** link **up** to the pillar hub, **sideways** to 2–4 related routes on other pillars where it helps the reader, and **down** to a money surface (`/shop`, `/`, or `#order`).
3. **Pillar hubs** link **only** to money pages and their strongest satellites—avoid turning pillars into generic site maps.
4. **Anchors** on the homepage (`#order`, `#review-stands`, etc.) count as internal graph edges when the narrative intentionally drives conversion or reputation hardware interest.
5. **Governance pages** (`/privacy-policy`, `/terms-of-service`, `/dpa`) stay lightly interlinked; footer coverage is sufficient unless the content references another policy.

## Reviews

Run `npm run seo:suggest-internal-links` locally before large content PRs. Weekly orphan reporting runs in [`.github/workflows/seo-health.yml`](../../.github/workflows/seo-health.yml).

## AI-assisted suggestions + humans

See [`ai-internal-links-workflow.md`](ai-internal-links-workflow.md).
