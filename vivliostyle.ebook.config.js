// @ts-check
import { defineConfig } from "@vivliostyle/cli";
import { book } from "./book.config.js";
import { manuscriptEntries } from "./scripts/entries.mjs";

export default defineConfig({
  title: book.title,
  author: book.author,
  language: book.language,
  readingProgression: book.readingProgression,
  size: book.size,
  entryContext: "manuscript",
  entry: manuscriptEntries(),
  theme: [
    "@vivliostyle/theme-techbook",
    "./styles/fonts.css",
    "./styles/base.css",
    "./styles/ebook.css",
  ],
  toc: { title: "目次" },
  workspaceDir: ".vivliostyle/ebook",
  output: `dist/${book.outputBasename}-ebook.pdf`,
  timeout: 300000,
});
