.PHONY: help serve server build clean install test

BUNDLE := /opt/homebrew/opt/ruby/bin/bundle

help:
	@echo "Available commands:"
	@echo "  make serve    - Serve the site locally with live reload"
	@echo "  make server   - Serve the site locally (alias for serve)"
	@echo "  make build    - Build the site for production"
	@echo "  make clean    - Clean build artifacts"
	@echo "  make install  - Install Jekyll dependencies"
	@echo "  make test     - Serve site locally (alias for serve)"

serve:
	$(BUNDLE) exec jekyll serve --livereload

server: serve

build:
	$(BUNDLE) exec jekyll build

clean:
	rm -rf _site .jekyll-cache .jekyll-metadata

install:
	gem install jekyll bundler
	bundle install

test: serve
