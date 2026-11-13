# Deployment (free static hosting)

Any of these work with this folder as-is (publish directory = the project root, no build command):

| Host | Notes |
|---|---|
| **Cloudflare Pages** (recommended) | Free, fast in East Africa, free HTTPS. Reads `_headers` (security headers, caching). |
| **Netlify** | Free tier is enough. Reads `_headers`. `404.html` is used automatically. |
| **GitHub Pages** | Free, but **ignores `_headers`** (no custom headers). The page-level Content-Security-Policy and referrer meta tags still apply. If the site is served from a sub-path (`user.github.io/repo/`), `404.html` styling needs root-relative paths changed. Prefer a custom domain at the root. |

## Steps (Cloudflare Pages example)
1. Create a free Cloudflare account → Workers & Pages → Create → Pages → "Upload assets" (or connect a GitHub repo).
2. Upload the project folder. Build command: none. Output directory: `/` (project root).
3. You get a `*.pages.dev` address. Use it for testing; run `tools/set-domain.py` with the final address before the public launch.

## Custom domain, DNS and HTTPS
1. Buy a domain (a `.ug` domain is bought through a Uganda registrar; any registrar works).
2. In the host's dashboard add the custom domain and follow the DNS instructions it shows (usually a CNAME record for `www`, plus an apex/ALIAS or nameserver change). DNS changes can take minutes to a few hours.
3. HTTPS certificates are issued automatically by Cloudflare/Netlify/GitHub once DNS points correctly. Turn on "Enforce HTTPS" if offered.
4. Pick one address (with or without `www`), redirect the other to it, and use that exact address in `tools/set-domain.py`.
5. Re-run `tools/set-domain.py` only on a fresh copy of the files (it replaces the marker once).

## After launch
1. **Google Search Console** → add property → verify with the DNS TXT record (easiest, no code changes) → Sitemaps → submit `sitemap.xml`.
2. **Google Business Profile**: claim/verify the BAROLLS listing, keep name, address and phone identical to the website, add the website link, and add the profile's share link to `contact.html` (replace the generic map embed if you like).
3. Test: open the site on an Android phone and an iPhone, place a test order, check the message arrives in WhatsApp.
4. Check headers at securityheaders.com after deployment (only works on hosts that read `_headers`).

## Analytics
None is installed (no cookies, no consent banner needed). If you want visitor counts later, Cloudflare Web Analytics is free and cookie-free; update the Privacy Policy if you add any tracker.
