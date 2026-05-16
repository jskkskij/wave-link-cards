#!/usr/bin/env node
/**
 * Ensures seo-canonical-routes.json matches sitemap <loc> entries.
 * Default: builds XML in memory (no file required). Use --file dist/sitemap.xml after build.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildSitemapXml, loadSitemapConfig } from "./sitemap-builder.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const cfgPath = path.join(__dirname, "seo-canonical-routes.json");

const fileArgIdx = process.argv.indexOf("--file");
const cfg = loadSitemapConfig(cfgPath);
const xml =
  fileArgIdx !== -1 && process.argv[fileArgIdx + 1]
    ? fs.readFileSync(path.resolve(process.argv[fileArgIdx + 1]), "utf8")
    : buildSitemapXml(cfg, repoRoot);

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
