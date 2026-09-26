.PHONY: help serve server build clean install test pdf

BUNDLE := /opt/homebrew/opt/ruby/bin/bundle
CHROME ?= $(shell command -v google-chrome || command -v chromium || echo "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome")

help:
	@echo "Available commands:"
	@echo "  make serve    - Serve the site locally with live reload"
	@echo "  make server   - Serve the site locally (alias for serve)"
	@echo "  make build    - Build the site for production"
	@echo "  make pdf      - Render index.md to cv.pdf"
	@echo "  make clean    - Clean build artifacts"
	@echo "  make install  - Install Jekyll dependencies"
	@echo "  make test     - Serve site locally (alias for serve)"

serve:
	$(BUNDLE) exec jekyll serve --livereload

server: serve

build:
	$(BUNDLE) exec jekyll build

# Needs pandoc and Chrome/Chromium on PATH (override with CHROME=/path/to/chrome)
pdf:
	@command -v pandoc >/dev/null || { echo "make pdf needs pandoc: https://pandoc.org/installing.html"; exit 1; }
	LC_ALL=C.UTF-8 pandoc index.md -f commonmark_x -s -o cv-print.html --css cv-print.css \
		-M title="Craig T. Russell, PhD" \
		-M subtitle="$$(sed -n 's/^title: //p' index.md)"
	"$(CHROME)" --headless --no-sandbox --disable-gpu --no-pdf-header-footer \
		--print-to-pdf=cv.pdf "file://$(CURDIR)/cv-print.html"
	rm -f cv-print.html

clean:
	rm -rf _site .jekyll-cache .jekyll-metadata cv.pdf cv-print.html

install:
	gem install jekyll bundler
	bundle install

test: serve
