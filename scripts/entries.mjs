import { existsSync, readdirSync } from "node:fs";
import { relative, resolve, sep } from "node:path";

const manuscriptRoot = resolve("manuscript");

function walk(directory) {
  if (!existsSync(directory)) return [];

  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) return walk(path);
    if (!entry.isFile() || !entry.name.toLowerCase().endsWith(".md")) return [];
    return [relative(manuscriptRoot, path).split(sep).join("/")];
  });
}

export function manuscriptPaths() {
  return walk(manuscriptRoot).sort((a, b) =>
    a.localeCompare(b, "ja", { numeric: true }),
  );
}

export function manuscriptEntries({ startOnRecto = false } = {}) {
  return manuscriptPaths().map((path) =>
    startOnRecto ? { path, pageBreakBefore: "recto" } : path,
  );
}
