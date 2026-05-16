#!/usr/bin/env node
/**
 * Removes legacy dist/m/ directory if present (causes 308 /m → /m/ on Cloudflare).
 * /m is served via public/_redirects → /index.html (same SPA, URL stays /m).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const legacyDir = path.join(__dirname, "..", "dist", "m");

if (fs.existsSync(legacyDir)) {
  fs.rmSync(legacyDir, { recursive: true, force: true });
  console.log("[postbuild-spa-paths] removed dist/m/ (prevents trailing-slash 308)");
} else {
  console.log("[postbuild-spa-paths] OK (no dist/m/ directory)");
}
