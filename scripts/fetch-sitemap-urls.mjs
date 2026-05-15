#!/usr/bin/env node
/**
 * HTTP check each URL in public/sitemap.xml (production smoke test).
 * BASE_URL=https://getwaved.ai node scripts/fetch-sitemap-urls.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const xmlPath = path.join(repoRoot, "public", "sitemap.xml");
const OVERRIDE_BASE = process.env.BASE_URL?.replace(/\/$/, "");

const xml = fs.readFileSync(xmlPath, "utf8");
const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());

async function headOk(url) {
  try {
    const res = await fetch(url, {
      method: "GET",
      redirect: "follow",
      headers: { "user-agent": "WavelinkSitemapVerify/1.0" },
    });
    return res.ok;
  } catch {
    return false;
  }
}

async function main() {
  let failed = 0;
  for (const loc of locs) {
    let url = loc;
    if (OVERRIDE_BASE) {
      try {
        const u = new URL(loc);
        const pathQuery = u.pathname + u.search;
        url = `${OVERRIDE_BASE}${pathQuery === "/" ? "/" : pathQuery}`;
      } catch {
        url = loc;
      }
    }
    const ok = await headOk(url);
    console.log(`${ok ? "OK" : "FAIL"} ${url}`);
    if (!ok) failed++;
  }
  if (failed) {
    console.error(`${failed} URL(s) failed`);
    process.exit(1);
  }
}

main();
