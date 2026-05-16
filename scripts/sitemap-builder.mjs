/**
 * Shared sitemap XML builder (used at build time and for route verification).
 */
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

export function loadSitemapConfig(cfgPath) {
  return JSON.parse(fs.readFileSync(cfgPath, "utf8"));
}

export function gitLastIso(repoRoot, relPath) {
  try {
    const out = execSync(`git log -1 --format=%cI -- "${relPath}"`, {
      cwd: repoRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    if (out) return out;
  } catch {
    /* shallow clone or no git */
  }
  return new Date().toISOString().slice(0, 10);
}

function escapeXml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * @param {object} cfg - seo-canonical-routes.json
 * @param {string} repoRoot
 */
export function buildSitemapXml(cfg, repoRoot) {
  const origin = cfg.origin.replace(/\/$/, "");
  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ];

  for (const r of cfg.routes) {
    const loc = `${origin}${r.path === "/" ? "/" : r.path}`;
    const lastmod = r.lastmod || gitLastIso(repoRoot, r.gitPath);
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
  return lines.join("\n") + "\n";
}
