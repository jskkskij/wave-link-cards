/**
 * Launcher: avoids Debian/Ubuntu /usr/bin/vite (Qt); always runs npm's Vite CLI.
 */
import { appendFileSync, existsSync } from "fs";
import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const logFile = path.join(root, "debug-c718c6.log");

// #region agent log helper
function agentLog(payload) {
  try {
    const line = `${JSON.stringify({ sessionId: "c718c6", timestamp: Date.now(), ...payload })}\n`;
    appendFileSync(logFile, line);
  } catch {
    /* ignore logging failures */
  }
}
// #endregion
const viteBin = path.join(root, "node_modules", "vite", "bin", "vite.js");

// #region agent log bootstrap
agentLog({
  hypothesisId: "H_spawn_path",
  location: "scripts/with-vite.mjs:bootstrap",
  message: "resolved_vite_cli",
  data: { root, viteBin, exists: existsSync(viteBin), argv: process.argv.slice(2) },
});
// #endregion

if (!existsSync(viteBin)) {
  console.error(
    `[with-vite] Missing ${viteBin}. Run npm install in this directory (not only on Windows).`
  );
  agentLog({
    hypothesisId: "H_missing_node_modules",
    location: "scripts/with-vite.mjs:exit",
    message: "vite_bin_missing",
    data: { viteBin },
  });
  process.exit(1);
}

const args = process.argv.slice(2);
const child = spawn(process.execPath, [viteBin, ...args], {
  stdio: "inherit",
  cwd: root,
  env: process.env,
  shell: false,
});

child.on("exit", (code, signal) => {
  // #region agent log exit
  agentLog({
    hypothesisId: "H_spawn_path",
    location: "scripts/with-vite.mjs:exit",
    message: "child_exit",
    data: { code, signal },
  });
  // #endregion
  process.exit(code ?? 1);
});
