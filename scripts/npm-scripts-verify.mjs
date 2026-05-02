/**
 * Verifies package.json uses the JS Vite launcher (not a bare `vite` on PATH).
 */
import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const phase = process.argv[2] || "verify";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pkgPath = path.join(root, "package.json");

let pkg;
try {
  pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
} catch (e) {
  console.warn("[npm-scripts-verify] could not read package.json:", pkgPath, e?.message ?? e);
  process.exit(0);
}

const build = pkg.scripts?.build;
const ok = typeof build === "string" && build.includes("with-vite.mjs");

if (phase === "ci") {
  if (!ok) {
    console.error(
      `[ci] scripts.build must use scripts/with-vite.mjs (Debian/Ubuntu /usr/bin/vite is a different program). Got: ${JSON.stringify(build)}`
    );
    process.exit(1);
  }
  console.log(`[ci] scripts.build OK: ${build}`);
  process.exit(0);
}

if (!ok) {
  console.warn(
    `\n[wavelink-cards] (${phase}) package.json scripts.build does NOT use scripts/with-vite.mjs:\n`,
    `  got: ${JSON.stringify(build)}\n`,
    `  WSL/Ubuntu may run Debian /usr/bin/vite (Qt) and crash with Core.cpp / "Opening the file: build".\n`,
    `  Fix: sync this repo (git pull / save package.json), then npm install.\n`
  );
} else if (phase === "prebuild") {
  console.log(`[npm prebuild] using launcher: ${build}`);
}
