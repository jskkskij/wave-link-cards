# Enterprise firewall allowlist and global reachability

This document replaces any notion of **circumventing** corporate or national filters. The goal is **legitimate maximum availability**, accurate classification, and fast escalation when a network wrongly blocks the property.

## Primary endpoints (customer allowlist)

Share these with IT / security teams for **HTTPS outbound** (TCP 443):

| Purpose | Hostname | Notes |
|---------|----------|--------|
| Production site | `getwaved.ai` | Apex + `www` if configured |
| Cloudflare CDN | `*.pages.dev` | Only if you serve Pages preview URLs |
| Cloudflare challenge | `challenges.cloudflare.com` | Needed if Turnstile / bot checks enabled |

Also allow **DNS resolution** to authoritative nameservers used by your registrar / Cloudflare.

## TLS and DNS checklist (quarterly)

- [ ] TLS certificate valid chain (no mixed content on marketing pages).
- [ ] HSTS and security headers match [`public/_headers`](../../public/_headers) on production.
- [ ] No expired CAA records blocking issuance.
- [ ] SPF / DKIM / DMARC documented for any mail-from domain used in lifecycle email.

## Reputation monitoring loop (weekly – assign owner)

These reduce **false-positive** blocks from SWGs and antivirus categories:

1. [Google Safe Browsing transparency](https://transparencyreport.google.com/safe-browsing/search) – search `getwaved.ai`.
2. **Cloudflare Dashboard** → Security → Events (spikes, geo anomalies).
3. **Search Console** → Manual actions / Security issues.
4. Optional: VirusTotal domain report for the apex domain.

If blocked at a specific enterprise: ask for **block category** (phishing, malware, policy, geo) and **PAC/SWG vendor**. Provide this doc + TLS cert transparency logs.

## Policy statement (external comms)

Do **not** promise “firewall bypass.” Position as: **TLS-first marketing site**, clear privacy posture, and **allowlist pack** above.
