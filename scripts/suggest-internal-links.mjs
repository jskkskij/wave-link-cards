#!/usr/bin/env node
/**
 * Orphan internal-link report + pillar-aware suggestions.
 * Reads docs/seo/content-inventory.json and docs/seo/pillar-hubs.json.
 *
 * Usage:
 *   node scripts/suggest-internal-links.mjs
 *   STRICT_INTERNAL_LINKS=1 node scripts/suggest-internal-links.mjs
 *
 * STRICT_* exits non-zero if any non-whitelisted route lacks inbound links from other src files.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");

const inventoryPath = path.join(repoRoot, "docs", "seo", "content-inventory.json");
const pillarPath = path.join(repoRoot, "docs", "seo", "pillar-hubs.json");

const strict =
  process.env.STRICT_INTERNAL_LINKS === "1" || process.argv.includes("--strict");

/** @param {string} dir */
function walkTs(dir, acc = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walkTs(p, acc);
    else if (/\.(tsx|ts|jsx|js)$/.test(ent.name)) acc.push(p);
  }
  return acc;
}

/** Normalize pathname from captured link target */
function normalizePath(raw) {
  if (!raw || raw.startsWith("http")) return null;
  let p = raw.split("#")[0].split("?")[0];
  if (!p.startsWith("/")) return null;
  if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
  return p === "" ? "/" : p;
}

/** Extract internal paths from source text */
function pathsInSource(text) {
  const out = new Set();
  const patterns = [
    /(?:to|href)\s*=\s*{?["']([^"'{}]+)["']}?/g,
    /\bnavigate\s*\(\s*["']([^"']+)["']/g,
    /** Footer/nav arrays: `{ path: "/shop", ... }`, `{ href: "/investor-deck", ... }` */
    /(?:path|href)\s*:\s*["'](\/[^"']*)["']/g,
    /** Absolute marketing URLs to same origin */
    /https:\/\/getwaved\.ai(\/[^"'?\s#]*)/g,
  ];
  for (const re of patterns) {
    let m;
    while ((m = re.exec(text))) {
      const n = normalizePath(m[1].trim());
      if (n) out.add(n);
    }
  }
  return out;
}

function main() {
  const inventory = JSON.parse(fs.readFileSync(inventoryPath, "utf8"));
  const pillars = JSON.parse(fs.readFileSync(pillarPath, "utf8"));
  const pages = inventory.pages;
  const routeSet = new Set(pages.map((p) => p.path));

  const srcFiles = walkTs(path.join(repoRoot, "src"));

  /** @type {Map<string, Set<string>>} path -> files linking TO it */
  const inboundFiles = new Map();
  for (const p of routeSet) inboundFiles.set(p, new Set());

  for (const file of srcFiles) {
    const text = fs.readFileSync(file, "utf8");
    const paths = pathsInSource(text);
    const rel = path.relative(repoRoot, file).replace(/\\/g, "/");

    for (const target of paths) {
      if (!routeSet.has(target)) continue;

      const page = pages.find((x) => x.sourceFile === rel);
      const skipSelf = page && page.path === target;
      if (skipSelf) continue;

      inboundFiles.get(target)?.add(rel);
    }
  }

  const orphans = [];
  const warnings = [];

  for (const page of pages) {
    const inbound = inboundFiles.get(page.path);
    const count = inbound.size;
    const okWhitelisted = page.allowOrphanInbound;

    if (count === 0 && !okWhitelisted) orphans.push(page);
    if (count === 0 && okWhitelisted) {
      warnings.push(`[allowlisted orphan] ${page.path} (${page.sourceFile})`);
    }
    if (count > 0) {
      console.log(`OK ${page.path} ← ${count} file(s): ${[...inbound].join(", ")}`);
    }
  }

  console.log("\n--- Orphans (need inbound internal links) ---");
  if (!orphans.length) console.log("None.");
  else {
    for (const o of orphans) {
      console.log(`ORPHAN ${o.path} (${o.pillarId}) source:${o.sourceFile}`);
      const pillar = pillars.pillars.find((x) => x.id === o.pillarId);
      if (pillar) {
        console.log(
          `  suggest outbound→ pillar hubs: ${pillar.hubPaths.join(", ")} | money: ${pillar.moneyTargets.join(", ")}`
        );
        console.log(`  suggest sideways→ examples: ${pillar.satelliteExamples.join(", ")}`);
      }
    }
  }

  if (warnings.length) {
    console.log("\n--- Allowed orphans ---");
    warnings.forEach((w) => console.log(w));
  }

  if (strict && orphans.length) {
    console.error(`\n[strict] ${orphans.length} route(s) lack inbound internal links.`);
    process.exit(1);
  }
}

main();
