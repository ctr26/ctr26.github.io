# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Jekyll-based personal portfolio website for Craig T. Russell, PhD - a Machine Learning Scientist. The site uses the Minima theme and is designed to be hosted on GitHub Pages. The repository contains a professional academic/industry portfolio with CV, publications, and project information.

## Architecture

### Site Structure
- **Jekyll Configuration**: `_config.yml` defines site metadata, theme settings, and social links
- **Main Content**: `index.md` contains the full portfolio content in Markdown with Jekyll front matter
- **CV File**: `cv.txt` contains a plain text version of the CV
- **Static Assets**: Located in `assets/` directory with CSS, JavaScript, fonts, and images
- **Images**: Portfolio images in `images/` with both full-size (`fulls/`) and thumbnail (`thumbs/`) versions

### Theme and Styling
- Uses Jekyll's Minima theme with auto dark/light mode switching
- Custom CSS styling in `assets/css/main.css` and `assets/sass/main.scss`
- Font Awesome icons for social links and UI elements
- Responsive design with jQuery-based interactions

### Key Features
- Professional biography and employment history
- Academic publications with DOI links
- Technical skills and open source project listings
- Social media integration (GitHub, LinkedIn, Google Scholar)
- Responsive image gallery for project showcases

## Development Commands

### Local Development
```bash
# Install Jekyll and dependencies (if not already installed)
gem install jekyll bundler

# Serve the site locally with auto-regeneration
jekyll serve --livereload

# Build the site for production
jekyll build

# Serve with draft posts included
jekyll serve --drafts
```

### Content Management
- Edit `index.md` for main portfolio content
- Update `_config.yml` for site settings and social links
- Modify `cv.txt` for plain text CV version
- Add images to `images/fulls/` and corresponding thumbnails to `images/thumbs/`

## Content Guidelines

### Social Links Configuration
Social links are configured in `_config.yml` under `minima.social_links` with Font Awesome icons. Current links include email, GitHub, LinkedIn, and Google Scholar.

### Publication Management
Publications in `index.md` should include:
- Full citation with journal/conference
- DOI or arXiv links where available
- Proper academic formatting

### Image Management
- Full-size images go in `images/fulls/` 
- Corresponding thumbnails in `images/thumbs/`
- Maintain consistent naming (01.jpg, 02.jpg, etc.)

## Deployment

This site is designed for GitHub Pages deployment. Changes pushed to the main branch will automatically deploy if GitHub Pages is configured for the repository.