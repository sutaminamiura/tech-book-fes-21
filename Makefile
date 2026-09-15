.PHONY: install check preview ebook print-draft print clean

install:
	npm ci

check:
	npm run check

preview:
	npm run preview

ebook:
	npm run build:ebook

print-draft:
	npm run build:print:draft

print:
	npm run build:print

clean:
	rm -rf .vivliostyle dist/*.pdf
