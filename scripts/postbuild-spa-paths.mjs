#!/usr/bin/env node
/**
 * Ensures /m (and other SPA entry paths) exist as real files in dist so Cloudflare
 * does not 308-redirect /m → / before the SPA loads.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(__dirname, "..", "dist");
const indexHtml = path.join(dist, "index.html");

if (!fs.existsSync(indexHtml)) {
  console.error("[postbuild-spa-paths] dist/index.html missing — run vite build first.");
  process.exit(1);
}

const html = fs.readFileSync(indexHtml, "utf8");

/** Paths that must resolve to a physical index.html on Pages (avoids edge 308 to /). */
const spaDirs = ["m"];

for (const dir of spaDirs) {
  const dirPath = path.join(dist, dir);
  fs.mkdirSync(dirPath, { recursive: true });
  fs.writeFileSync(path.join(dirPath, "index.html"), html, "utf8");
  console.log(`[postbuild-spa-paths] wrote dist/${dir}/index.html`);
}
