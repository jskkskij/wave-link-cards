# GitHub secrets for Cloudflare deploy

Deploy only needs these two secrets:

| Secret | Used for |
|--------|----------|
| `CLOUDFLARE_API_TOKEN` | Wrangler Pages deploy |
| `CLOUDFLARE_ACCOUNT_ID` | Wrangler account |

You do **not** need `CLOUDFLARE_ZONE_ID` in GitHub. The deploy workflow does not call the Zone API.

## If the site looks stale after deploy

Purge once in the dashboard: **Caching → Configuration → Purge Cache → Purge Everything**.

Production routing checks still run on the weekly **SEO health** workflow (optional signal, not required for deploy).
