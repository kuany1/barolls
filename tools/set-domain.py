#!/usr/bin/env python3
"""Replace the {{SITE_URL}} marker in every page, sitemap.xml and robots.txt with your real address.
Usage:  python3 tools/set-domain.py https://www.your-domain.ug
(No trailing slash. Run once, before you deploy.)"""
import sys, pathlib, re
if len(sys.argv) != 2 or not re.match(r'^https://[^/\s]+$', sys.argv[1]):
    sys.exit('Usage: python3 tools/set-domain.py https://www.your-domain.ug   (https, no trailing slash)')
root = pathlib.Path(__file__).resolve().parent.parent
n = 0
for f in list(root.glob('*.html')) + [root / 'sitemap.xml', root / 'robots.txt']:
    s = f.read_text(encoding='utf8')
    if '{{SITE_URL}}' in s:
        f.write_text(s.replace('{{SITE_URL}}', sys.argv[1]), encoding='utf8'); n += 1
print(f'Updated {n} files with {sys.argv[1]}')
