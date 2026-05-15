#!/usr/bin/env node
/**
 * Generates public/sitemap.xml from scripts/seo-canonical-routes.json using git last-modified when available.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const cfgPath = path.join(__dirname, "seo-canonical-routes.json");
const outPath = path.join(repoRoot, "public", "sitemap.xml");

function gitLastIso(relPath) {
  try {
    const out = execSync(`git log -1 --format=%cI -- "${relPath}"`, {
      cwd: repoRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    if (out) return out;
  } catch {
    /* ignore */
  }
  return new Date().toISOString();
}

function escapeXml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function main() {
  const cfg = JSON.parse(fs.readFileSync(cfgPath, "utf8"));
  const origin = cfg.origin.replace(/\/$/, "");
  const lines = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'];

  for (const r of cfg.routes) {
    const loc = `${origin}${r.path === "/" ? "/" : r.path}`;
    const lastmod = gitLastIso(r.gitPath);
    const prio = r.priority || "0.5";
    const cf = r.changefreq || "weekly";
    lines.push("  <url>");
    lines.push(`    <loc>${escapeXml(loc)}</loc>`);
    lines.push(`    <lastmod>${escapeXml(lastmod)}</lastmod>`);
    lines.push(`    <changefreq>${escapeXml(cf)}</changefreq>`);
    lines.push(`    <priority>${escapeXml(prio)}</priority>`);
    lines.push("  </url>");
  }

  lines.push("</urlset>");
  fs.writeFileSync(outPath, lines.join("\n") + "\n", "utf8");
  console.log(`Wrote ${outPath} (${cfg.routes.length} URLs)`);
}

main();
