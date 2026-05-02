/**
 * Launcher: avoids Debian/Ubuntu /usr/bin/vite (Qt); always runs npm's Vite CLI.
 */
import { existsSync } from "fs";
import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const viteBin = path.join(root, "node_modules", "vite", "bin", "vite.js");

if (!existsSync(viteBin)) {
  console.error(
    `[with-vite] Missing ${viteBin}. Run npm install in this directory (not only on Windows).`
  );
  process.exit(1);
}

const args = process.argv.slice(2);
const child = spawn(process.execPath, [viteBin, ...args], {
  stdio: "inherit",
  cwd: root,
  env: process.env,
  shell: false,
});

child.on("exit", (code) => {
  process.exit(code ?? 1);
});
