#!/usr/bin/env node
/**
 * Lightweight production reachability check (cron-friendly).
 * Usage: BASE_URL=https://getwaved.ai node scripts/check-production-health.mjs
 */
const BASE = (process.env.BASE_URL || "https://getwaved.ai").replace(/\/$/, "");

const PATHS = ["/", "/robots.txt", "/sitemap.xml", "/shop"];

async function check(pathname) {
  const url = `${BASE}${pathname}`;
  const res = await fetch(url, { redirect: "follow", headers: { "user-agent": "WavelinkSEOHealth/1.0" } });
  const ok = res.ok;
  console.log(`${ok ? "OK" : "FAIL"} ${res.status} ${url}`);
  return ok;
}

async function main() {
  let allOk = true;
  for (const p of PATHS) {
    const ok = await check(p);
    if (!ok) allOk = false;
  }
  if (!allOk) {
    console.error("Production health check failed.");
    process.exit(1);
  }
  console.log("Production health check passed.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
