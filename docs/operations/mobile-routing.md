# Mobile routing policy (getwaved.ai)

## Problem we fixed

Automatic **mobile UA → `/m`** redirects broke shared links (WhatsApp, Messenger) and caused **redirect chains** when combined with cookies and `/shop` client redirects.

## Current policy

| Visitor | Path | Server behavior |
|---------|------|-----------------|
| Any phone browser | `/` | **No redirect** — full homepage loads (safe for shared links) |
| Opt-in `?view=mobile` or `wl_view=mobile` | `/` | One redirect to `/m` |
| Opt-in `?view=desktop` or `wl_view=desktop` | `/m` | One redirect to `/` |
| Desktop | `/m` (no opt-in) | One redirect to `/` |
| Link preview bots (WhatsApp, etc.) | any | **No redirect** |
| `/shop`, `/company-profile`, … | any | **No redirect** (SPA handles navigation) |

Rules live in [`functions/_shared/view-routing.mjs`](../../functions/_shared/view-routing.mjs).

## Verification

```bash
npm run verify:mobile-routing          # unit + chain (CI / prebuild)
npm run verify:mobile-routing:live     # production redirect trace
```

## After deploying routing changes

1. **Purge Cloudflare cache** for `getwaved.ai` (Caching → Configuration → Purge Everything), or the homepage may stay `cf-cache-status: HIT` and ignore `wl_view` cookies.
2. Run `npm run verify:mobile-routing:live` — desktop `/m` should **302 → /**, cookie `/` + `wl_view=mobile` should **302 → /m**.

## Share links

Prefer **`https://getwaved.ai/`** for marketing. Lightweight mobile UI: **`https://getwaved.ai/?view=mobile`** (sets opt-in cookie).

## Facebook / Messenger in-app browser returns 403

That is usually **Cloudflare Bot Fight Mode or WAF**, not the view-routing function (our code never returns 403).

In **Cloudflare Dashboard** → **Security** → **WAF** (or Bot Fight Mode):

- Add a **skip** rule for URI Path equals `/` when User Agent contains `FBAN` or `FBAV`, **or**
- Lower bot sensitivity for `getwaved.ai`

Link **previews** use `facebookexternalhit` (allowed in our bot list). In-app browsers use a full WebKit UA and may be blocked.

## If live test shows `308` from `/m` → `/`

1. **Deploy latest `main`** — build must run `postbuild-spa-paths.mjs` (creates `dist/m/index.html`).
2. **Cloudflare dashboard** → **Rules** → **Redirect Rules** — remove any rule that sends `/m` to `/` (308 is almost always a zone rule, not our 302 function).
3. Re-run: `npm run verify:mobile-routing:live`
