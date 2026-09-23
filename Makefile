.PHONY: help serve server build clean install test pdf

BUNDLE := /opt/homebrew/opt/ruby/bin/bundle

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

pdf:
	python3 scripts/cv_pdf.py index.md cv.pdf

clean:
	rm -rf _site .jekyll-cache .jekyll-metadata

install:
	gem install jekyll bundler
	bundle install

test: serve
