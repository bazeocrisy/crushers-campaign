# GA Elite Crushers — Player Development Campaign (Mock Concept)

A static, mobile-first homepage built for GitHub Pages. This is a **proposed campaign concept for leadership review** — not an active fundraising site. No live payments, no fake form submissions.

## File structure
```
index.html
css/styles.css
js/main.js
assets/
  images/   <- add real team photos + og image here
  logos/    <- add a local logo copy + favicon.ico here
```

## Preview locally
Any static server works. For example:
```
cd crushers-campaign
python3 -m http.server 8000
# open http://localhost:8000
```
Or just open `index.html` directly in a browser.

## Publish on GitHub Pages
1. Create a repo and push these files to the repository **root** (keep `index.html` at the top level).
2. In the repo: **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **Deploy from a branch**.
4. Select branch `main` and folder `/ (root)`, then **Save**.
5. The site publishes at `https://<user>.github.io/<repo>/` in a minute or two.
6. To update, commit and push again — Pages redeploys automatically.

No build step is required.

## Assets / placeholders that still need approval
- **Logo:** the header/footer currently load the live logo from `gaelitecrushers.com` and fall back to `assets/logos/ga-elite-crushers-logo.webp`. Drop an approved local copy there to be self-contained.
- **Favicon:** add `assets/logos/favicon.ico`.
- **Photos:** every image is a labeled placeholder. Replace with authentic team photos (add descriptive `alt` text; keep files compressed and responsive).
- **OG image:** add an approved `assets/images/og-campaign-placeholder.jpg` (1200×630).
- **Canonical URL:** set the real domain in the `<link rel="canonical">` tag.
- **Contact details & social links:** marked "To Be Confirmed" until approved.
- **Form routing:** the interest form is a mock — connect it to an approved channel post-approval.
