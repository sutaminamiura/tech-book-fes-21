import { access, readFile } from "node:fs/promises";
import { manuscriptPaths } from "./entries.mjs";

const required = [
  "book.config.js",
  "vivliostyle.ebook.config.js",
  "vivliostyle.print.config.js",
  "styles/fonts.css",
  "styles/base.css",
  "styles/ebook.css",
  "styles/print.css",
  "manuscript",
  "images",
  "cover",
  "dist",
];

await Promise.all(required.map((path) => access(path)));

const { book } = await import("../book.config.js");
if (book.title === "BOOK_TITLE" || book.author === "AUTHOR_NAME") {
  console.warn("Notice: edit title and author in book.config.js.");
}

await import("../vivliostyle.ebook.config.js");
await import("../vivliostyle.print.config.js");

const packageJson = JSON.parse(await readFile("package.json", "utf8"));
if (!packageJson.devDependencies?.["@vivliostyle/cli"]) {
  throw new Error("@vivliostyle/cli is not pinned in devDependencies.");
}

const count = manuscriptPaths().length;
console.log(
  count === 0
    ? "Project configuration is valid. Add Markdown files under manuscript/ before building."
    : `Project configuration is valid. Found ${count} manuscript file(s).`,
);
