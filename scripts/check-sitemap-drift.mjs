#!/usr/bin/env node
/**
 * Fails if public/sitemap.xml differs from generator output (run before CI build).
 * Restores the committed file after comparison so the working tree stays clean.
 */
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const xmlPath = path.join(repoRoot, "public", "sitemap.xml");

const committed = fs.readFileSync(xmlPath, "utf8");
execSync("node scripts/generate-sitemap.mjs", { cwd: repoRoot, stdio: "inherit" });
const regenerated = fs.readFileSync(xmlPath, "utf8");
fs.writeFileSync(xmlPath, committed, "utf8");

if (committed !== regenerated) {
  console.error("[sitemap-drift] public/sitemap.xml is out of date. Run: node scripts/generate-sitemap.mjs && git add public/sitemap.xml");
  process.exit(1);
}
console.log("[sitemap-drift] public/sitemap.xml matches generator.");
