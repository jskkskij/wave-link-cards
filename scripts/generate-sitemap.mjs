#!/usr/bin/env node
/**
 * Writes sitemap.xml at build time (default: dist/sitemap.xml).
 * Not committed to git — generated on every `npm run build` from seo-canonical-routes.json.
 *
 * Usage:
 *   node scripts/generate-sitemap.mjs
 *   node scripts/generate-sitemap.mjs --out dist/sitemap.xml
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildSitemapXml, loadSitemapConfig } from "./sitemap-builder.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const cfgPath = path.join(__dirname, "seo-canonical-routes.json");

function parseOutArg() {
  const i = process.argv.indexOf("--out");
  if (i !== -1 && process.argv[i + 1]) return path.resolve(process.argv[i + 1]);
  return path.join(repoRoot, "dist", "sitemap.xml");
}

const outPath = parseOutArg();
const cfg = loadSitemapConfig(cfgPath);
const xml = buildSitemapXml(cfg, repoRoot);

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, xml, "utf8");
console.log(`Wrote ${outPath} (${cfg.routes.length} URLs)`);
