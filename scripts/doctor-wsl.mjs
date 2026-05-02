/**
 * One-shot check: proves this checkout's package.json + git tip (WSL vs stale terminal).
 */
import { readFileSync } from "fs";
import { execSync } from "child_process";

try {
  const sha = execSync("git rev-parse --short HEAD", { encoding: "utf8" }).trim();
  console.log("git HEAD (short):", sha);
} catch {
  console.log("git HEAD: unavailable (not a git checkout?)");
}

const p = JSON.parse(readFileSync("./package.json", "utf8"));
const build = p.scripts?.build;
console.log("scripts.build:", build);

if (typeof build !== "string" || !build.includes("with-vite.mjs")) {
  console.error(
    "\nFix: git pull the latest main (expect f38e0b3 / 88f2d95 or newer), then npm ci.\n",
    "Stale checkouts still use bare `vite build` and trigger Debian /usr/bin/vite (Qt crash).\n"
  );
  process.exit(1);
}

console.log("[doctor:wsl] OK — build uses scripts/with-vite.mjs");
