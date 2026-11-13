#!/usr/bin/env python3
"""Pre-launch checks (standard library only). Run:  python3 tools/check-site.py
Checks: menu.html and order.html prices match, internal links/images/scripts exist,
no href="#" left, no placeholder emails, and whether {{SITE_URL}} has been replaced."""
import re, pathlib, sys
root = pathlib.Path(__file__).resolve().parent.parent
problems = []
pages = sorted(root.glob('*.html'))
def prices(f, pat):
    return dict(re.findall(pat, (root / f).read_text(encoding='utf8'), re.S))
m = prices('menu.html', r'<h3>([^<]+)</h3><span class="price">UGX ([\d,]+)</span>')
o = prices('order.html', r'data-name="([^"]+)" data-price="(\d+)"')
m = {k: v.replace(',', '') for k, v in m.items()}
for k in sorted(set(m) | set(o)):
    if m.get(k) != o.get(k): problems.append(f'Price/name mismatch for {k!r}: menu.html={m.get(k)} order.html={o.get(k)}')
for f in pages:
    s = f.read_text(encoding='utf8')
    if 'href="#"' in s: problems.append(f'{f.name}: contains href="#"')
    if re.search(r'example\.(com|org)|mailto:', s): problems.append(f'{f.name}: placeholder/mailto address found')
    for ref in re.findall(r'(?:src|href)="([^"#?:]+\.[a-z0-9]+)"', s):
        if not ref.startswith(('http', '//', '{{')) and not (root / ref.lstrip('/')).exists(): problems.append(f'{f.name}: missing file {ref}')
    for tag in re.findall(r'<img[^>]*>', s):
        if 'alt=' not in tag: problems.append(f'{f.name}: image without alt: {tag[:60]}')
        if 'width=' not in tag or 'height=' not in tag: problems.append(f'{f.name}: image without width/height: {tag[:60]}')
left = [f.name for f in list(pages) + [root / 'sitemap.xml', root / 'robots.txt'] if '{{SITE_URL}}' in f.read_text(encoding='utf8')]
if left: problems.append('{{SITE_URL}} not replaced yet in: ' + ', '.join(left) + '  -> run tools/set-domain.py')
print('\n'.join(problems) if problems else 'All checks passed.')
sys.exit(1 if problems else 0)
