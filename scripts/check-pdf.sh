#!/usr/bin/env bash
set -euo pipefail

pdf_path="${1:?Usage: check-pdf.sh PDF_PATH ebook|print}"
pdf_kind="${2:?Usage: check-pdf.sh PDF_PATH ebook|print}"

if [[ ! -f "$pdf_path" ]]; then
  echo "PDF not found: $pdf_path" >&2
  exit 1
fi

for command_name in pdfinfo pdffonts qpdf; do
  if ! command -v "$command_name" >/dev/null 2>&1; then
    echo "Required command not found: $command_name" >&2
    exit 1
  fi
done

qpdf --check "$pdf_path"

page_count="$(pdfinfo "$pdf_path" | awk -F: '/^Pages:/ {gsub(/[[:space:]]/, "", $2); print $2}')"
if [[ -z "$page_count" || "$page_count" -lt 1 ]]; then
  echo "Could not determine a valid page count." >&2
  exit 1
fi

if [[ "$pdf_kind" == "print" && $((page_count % 2)) -ne 0 ]]; then
  echo "Print PDF must have an even number of pages; found $page_count." >&2
  exit 1
fi

unembedded="$({ pdffonts "$pdf_path" || true; } | awk 'NR > 2 && $5 == "no" {print}')"
if [[ -n "$unembedded" ]]; then
  echo "Unembedded fonts found:" >&2
  echo "$unembedded" >&2
  exit 1
fi

echo "PDF check passed: $pdf_path ($page_count pages, $pdf_kind)"
