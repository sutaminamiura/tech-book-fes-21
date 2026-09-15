// @ts-check
import { defineConfig } from "@vivliostyle/cli";
import { book } from "./book.config.js";
import { manuscriptEntries } from "./scripts/entries.mjs";

const pressReady = process.env.PRESS_READY === "1";

export default defineConfig({
  title: book.title,
  author: book.author,
  language: book.language,
  readingProgression: book.readingProgression,
  size: book.size,
  entryContext: "manuscript",
  entry: manuscriptEntries({ startOnRecto: true }),
  theme: [
    "@vivliostyle/theme-techbook",
    "./styles/fonts.css",
    "./styles/base.css",
    "./styles/print.css",
  ],
  toc: { title: "目次" },
  workspaceDir: ".vivliostyle/print",
  output: {
    path: pressReady
      ? `dist/${book.outputBasename}-print.pdf`
      : `dist/${book.outputBasename}-print-draft.pdf`,
    format: "pdf",
    ...(pressReady
      ? {
          pdfPostprocess: {
            preflight: "press-ready",
            preflightOption: [book.print.colorMode],
          },
        }
      : {}),
  },
  timeout: 600000,
});
