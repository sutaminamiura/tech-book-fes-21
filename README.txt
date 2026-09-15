TECHBOOK VIVLIOSTYLE PROJECT

Purpose
  Build an A5 Japanese technical book as an ebook PDF and a print-ready body PDF.
  The print cover is managed separately because its spine width depends on the
  final page count, paper, and printer template.

First setup
  1. Install Node.js 22.12.0 or later and Docker.
  2. Run: npm ci
  3. Edit the title and author in book.config.js.
  4. Add manuscript files under manuscript/ using numeric filename prefixes.
  5. Add referenced images under images/.

Commands
  npm run check
  npm run preview
  npm run build:ebook
  npm run build:print:draft
  npm run build:print

Outputs
  dist/book-ebook.pdf
  dist/book-print-draft.pdf
  dist/book-print.pdf

Release flow
  Pull requests build ebook and print-layout preview artifacts.
  A v-prefixed Git tag builds and verifies both final PDFs and uploads them to
  the matching GitHub Release.

Before print submission
  Confirm the printer's trim size, bleed, color, font, total-page, paper, and
  binding requirements. Then update styles/print.css and cover/cover-spec.example.json.
  The body PDF and cover PDF are submitted as separate files unless the printer
  explicitly says otherwise.
