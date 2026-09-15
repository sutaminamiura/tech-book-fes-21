import { spawnSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { manuscriptPaths } from "./entries.mjs";

const mode = process.argv[2];
const modes = {
  ebook: {
    config: "vivliostyle.ebook.config.js",
    env: {},
  },
  "print-draft": {
    config: "vivliostyle.print.config.js",
    env: { PRESS_READY: "0" },
  },
  print: {
    config: "vivliostyle.print.config.js",
    env: { PRESS_READY: "1" },
  },
};

if (!(mode in modes)) {
  console.error("Usage: node scripts/build.mjs <ebook|print-draft|print>");
  process.exit(2);
}

const entries = manuscriptPaths();
if (entries.length === 0) {
  console.error("No Markdown manuscripts found under manuscript/.");
  process.exit(1);
}

mkdirSync("dist", { recursive: true });

const selected = modes[mode];
const executable = process.platform === "win32" ? "vivliostyle.cmd" : "vivliostyle";
const command = fileURLToPath(
  new URL(`../node_modules/.bin/${executable}`, import.meta.url),
);
const result = spawnSync(command, ["build", "--config", selected.config], {
  stdio: "inherit",
  env: { ...process.env, ...selected.env },
});

if (result.error) throw result.error;
process.exit(result.status ?? 1);
