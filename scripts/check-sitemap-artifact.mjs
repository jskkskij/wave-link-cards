#!/usr/bin/env node
/**
 * CI: confirms dist/sitemap.xml exists after build (replaces committed-file drift check).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const artifact = path.join(__dirname, "..", "dist", "sitemap.xml");

if (!fs.existsSync(artifact)) {
  console.error(
    "[sitemap-artifact] missing dist/sitemap.xml — run full `npm run build` (generates sitemap after Vite)."
  );
  process.exit(1);
}

const size = fs.statSync(artifact).size;
if (size < 100) {
  console.error("[sitemap-artifact] dist/sitemap.xml looks empty.");
  process.exit(1);
}

console.log(`[sitemap-artifact] OK (${size} bytes)`);
