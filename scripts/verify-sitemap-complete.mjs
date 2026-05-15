#!/usr/bin/env node
/**
 * Ensures every route in seo-canonical-routes.json appears as <loc> in public/sitemap.xml
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");

const cfg = JSON.parse(fs.readFileSync(path.join(__dirname, "seo-canonical-routes.json"), "utf8"));
const xml = fs.readFileSync(path.join(repoRoot, "public", "sitemap.xml"), "utf8");
const origin = cfg.origin.replace(/\/$/, "");

const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());

function norm(u) {
  try {
    const x = new URL(u);
    let p = x.pathname;
    if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
    return `${x.origin}${p === "/" ? "/" : p}`;
  } catch {
    return u;
  }
}

const locSet = new Set(locs.map(norm));

const missing = [];
for (const r of cfg.routes) {
  const expected = r.path === "/" ? `${origin}/` : `${origin}${r.path}`;
  if (!locSet.has(norm(expected))) missing.push(r.path);
}

if (missing.length) {
  console.error("Sitemap missing canonical routes:", missing.join(", "));
  process.exit(1);
}
console.log("Sitemap completeness OK:", cfg.routes.length, "routes");
