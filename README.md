# BAROLLS website

Static site (HTML, CSS, vanilla JavaScript). No build step, no backend, no database, no paid services.
Orders are sent to WhatsApp (+256 765 068833) through `wa.me` links.

## Folder structure
```
index.html menu.html order.html about.html contact.html reviews.html (feedback) privacy.html terms.html 404.html
css/site.css            all styles (brand colours are at the top, in :root)
js/                     main.js (menu, hours) · whatsapp.js (links + message format) · order.js · menu.js · hero.js
images/ fonts/          WebP photos, self-hosted fonts
_headers                security + caching headers (Netlify / Cloudflare Pages)
robots.txt sitemap.xml  search engines
tools/                  set-domain.py (run once) · check-site.py (pre-launch check)
docs/                   DEPLOYMENT · BUSINESS-CONFIRMATIONS · LEGAL-NOTES · REMOVED-CONTENT
```

## Before you go live
1. `python3 tools/set-domain.py https://your-real-address` — replaces the `{{SITE_URL}}` marker (canonical links, share tags, sitemap, robots.txt, structured data).
2. `python3 tools/check-site.py` — must say "All checks passed."
3. Work through `docs/BUSINESS-CONFIRMATIONS.md`.

## Everyday changes
| Change | Where |
|---|---|
| A price | `menu.html` **and** `order.html` (`data-price`), then run `tools/check-site.py` (it flags mismatches). Also the price in the hero list in `js/hero.js` if it is one of the 4 featured items. |
| Add a menu item | Copy an existing card in `menu.html` and a row in `order.html`. Add the photo to `images/menu/` (WebP, about 900px wide, under 150 KB). |
| Opening hours | `js/main.js` (the `hrs` line), the hours in every page footer, `contact.html`, the "Visit us" card in `index.html`, and `openingHoursSpecification` in `index.html`. |
| WhatsApp number | `js/whatsapp.js` (`WHATSAPP_NUMBER`, format `256…`), every `wa.me` link and `tel:` link (search for `256765068833`). |
| Social links | Add real links to the footer only when the accounts exist. |
