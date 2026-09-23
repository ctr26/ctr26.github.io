"""Render index.md to cv.pdf so the site and the PDF share one source.

Usage: python3 scripts/cv_pdf.py [index.md] [cv.pdf]
Needs: pip install markdown; a Chromium/Chrome binary (CHROME env var).
"""

import os
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

import markdown

NAME = "Craig T. Russell, PhD"

CSS = """
@page { size: A4; margin: 10mm 13mm; }
body { font: 8.8pt/1.28 "Helvetica Neue", Arial, sans-serif; color: #111; }
h1 { font-size: 17pt; margin: 0 0 1mm; }
.role { font-size: 10.5pt; color: #444; margin: 0 0 2mm; }
h2 { font-size: 10.5pt; text-transform: uppercase; letter-spacing: .06em;
     border-bottom: 1px solid #999; margin: 2.6mm 0 1.2mm; padding-bottom: .6mm; }
p { margin: 0 0 1.2mm; }
ul, ol { margin: 0 0 1.2mm; padding-left: 4mm; }
li { margin: 0 0 .3mm; }
a { color: #0b4f8a; text-decoration: none; }
h2, strong { break-after: avoid; }
li { break-inside: avoid; }
"""


def split_front_matter(text):
    match = re.match(r"^---\n(.*?)\n---\n", text, re.S)
    if not match:
        return {}, text
    meta = dict(
        line.split(":", 1) for line in match.group(1).splitlines() if ":" in line
    )
    meta = {k.strip(): v.strip() for k, v in meta.items()}
    return meta, text[match.end():]


def to_html(md_text):
    meta, body = split_front_matter(md_text)
    # drop the self-link to the PDF inside the PDF itself
    body = re.sub(r"\s*•?\s*\[PDF\]\([^)]*\)", "", body)
    # kramdown lets a list follow a paragraph line; Python-Markdown needs a gap
    body = re.sub(r"(?m)^(?!- |\* |\d+\. )(.+)\n(?=- )", r"\1\n\n", body)
    html = markdown.markdown(body, extensions=["extra", "sane_lists"])
    return (
        f"<!doctype html><html><head><meta charset='utf-8'>"
        f"<style>{CSS}</style></head><body>"
        f"<h1>{NAME}</h1><p class='role'>{meta.get('title', '')}</p>"
        f"{html}</body></html>"
    )


def find_chrome():
    candidates = [
        os.environ.get("CHROME"),
        "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
        shutil.which("chromium"),
        shutil.which("google-chrome"),
        shutil.which("chromium-browser"),
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    ]
    for path in candidates:
        if path and Path(path).exists():
            return path
    sys.exit("No Chrome/Chromium found; set CHROME=/path/to/chrome")


def main():
    src = Path(sys.argv[1] if len(sys.argv) > 1 else "index.md")
    out = Path(sys.argv[2] if len(sys.argv) > 2 else "cv.pdf").resolve()
    with tempfile.TemporaryDirectory() as tmp:
        page = Path(tmp) / "cv.html"
        page.write_text(to_html(src.read_text()), encoding="utf-8")
        subprocess.run(
            [
                find_chrome(), "--headless", "--no-sandbox", "--disable-gpu",
                "--no-pdf-header-footer", f"--print-to-pdf={out}", page.as_uri(),
            ],
            check=True,
            capture_output=True,
        )
    print(f"wrote {out}")


if __name__ == "__main__":
    main()
