/**
 * Logs which package.json scripts npm will see from this repo root (fixes path-independent of cwd quirks).
 */
// #region agent log
import { appendFileSync, readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const phase = process.argv[2] || "verify";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pkgPath = path.join(root, "package.json");
const logFile = path.join(root, "debug-c718c6.log");

function emit(payload) {
  const line = `${JSON.stringify({ sessionId: "c718c6", timestamp: Date.now(), ...payload })}\n`;
  try {
    appendFileSync(logFile, line);
  } catch {
    /* ignore log write failures (read-only mounts, etc.) */
  }
}
// #endregion

let pkg;
try {
  pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
} catch (e) {
  emit({
    hypothesisId: "H_pkg_read_fail",
    location: "npm-scripts-verify.mjs",
    message: String(phase),
    data: { root, pkgPath, cwd: process.cwd(), error: String(e?.message ?? e) },
  });
  process.exit(0);
}

const build = pkg.scripts?.build;
const ok = typeof build === "string" && build.includes("with-vite.mjs");

// #region agent log evidence
emit({
  hypothesisId: "H_pkg_on_disk",
  location: "npm-scripts-verify.mjs",
  message: String(phase),
  data: {
    root,
    pkgPath,
    cwd: process.cwd(),
    scriptsBuild: build,
    scriptsDev: pkg.scripts?.dev,
    usesWithViteLauncher: ok,
  },
});
// #endregion

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
