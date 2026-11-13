# Content removed or changed, and why

**Removed — unverifiable claims**
- Reviews page statistics: "4.9★ average", "312+ reviews", "98% would recommend", "12,000+ Barolls rolled" (also removed the matching `aggregateRating` from the structured data).
- Reviews page headline "Join hundreds of happy customers" and "consistently five-star wraps".
- Home-page quote and the six testimonials below (names and wording could not be verified; one referred to a "Spicy Baroll" that is not on the menu). Restore only with each customer's permission:
  - "The best Barolls in Arua." — Simon Droti
  - "Fresh, tasty, and incredibly fast." — Abuk
  - "My breakfast stop every morning." — Pearl
  - "Great value and excellent customer service." — Emmanuel W.
  - "Ordering on WhatsApp is so easy — my Baroll was ready before I even arrived." — Juma S.
  - "The Spicy Baroll is unmatched. Nothing else compares in town." — Patience P.
- "Vegetables and proteins sourced daily" (spotlight), "Premium wraps made with real ingredients… priced fair", "worth queuing for", "has grown into a daily stop for breakfast, lunch and dinner" (achievement claims), "ready when you arrive" promise, "soothing" (Dawa Tea), "Fresh" badge on the hero.
- Placeholder email `hello@barolls.example.com`; four social icons that linked to `#`.
- Old placeholder canonical / `og:url` on a fake domain (earlier audit).

**Removed — unnecessary effects and files**
- Scroll-reveal animations and counters (also hid content when JavaScript failed), ambient spiral/drift animations, hero auto-rotation (accessibility: moving content with no pause), unused CSS (59 rules) and 4 stylesheets merged into one.
- Unused images (`fries.jpeg`, duplicate WhatsApp photo, "chicken and fries" copy, JPEG originals). Photos are now WebP; filenames fixed (`signiture` → `signature`, etc.).

**Changed**
- `reviews.html` is now a short **Feedback** page (WhatsApp button), set to `noindex`, linked from the footer only.
- Menu heading levels fixed (H1 → H2 → H3). Home page H1 now names BAROLLS and Arua.
- Nav button "Order Now" goes to the order builder; the floating button opens a WhatsApp chat.
- The logo file was cropped (no redesign): the **B emblem** is used in the header/favicon and the full wordmark in the footer.
