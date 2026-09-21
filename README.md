# instrumentymuzyczne.pl — SEO Content Hub

Astro-based content hub. Sibling site to muzyczny.pl — bounces SEO traffic to
the main shop via long-tail landing pages.

## Stack

- **Astro 5** — static site generator, near-zero JS runtime
- **Content Collections** — typed markdown pipeline
- **@astrojs/sitemap** — auto-generated XML sitemap
- **Google Fonts** (Inter + Source Serif Pro) — self-managed CDN
- **No JS framework, no CMS on start** — add Decap CMS when copywriters need a panel

## Setup

```bash
npm install
npm run dev     # http://localhost:4321
npm run build   # → ./dist
npm run preview # local static preview
```

Deploy `./dist` to Cloudflare Pages / Netlify / any static host.

## Content workflow

Landing pages are markdown files in `src/content/landings/`. Each file becomes a
route at `/{filename}/`. Adding a new landing = new `.md` file, commit, deploy.

Frontmatter schema is enforced in `src/content/config.ts` (typed). Required
fields: `title`, `description`, `keyword`, `category`, `updated`. Optional:
`faq`, `ctaCategories`.

### Sample landing structure

```markdown
---
title: "Instrumenty muzyczne dla początkujących"
description: "Krótki opis pod SERP-a, do 160 znaków."
keyword: "instrumenty muzyczne dla początkujących"
category: "inne"
readingTime: 7
updated: 2026-09-20
faq:
  - q: "Pytanie 1?"
    a: "Odpowiedź 1."
ctaCategories:
  - label: "Nazwa kategorii w sklepie"
    sub: "Krótki opis co tam znajdą"
    url: "https://muzyczny.pl/kategoria/..."
---

Tekst artykułu w markdown. Nagłówki H2 → sekcje.
```

## Design system

Design tokens in `src/styles/global.css` — colors, typography, spacing.
Matched visually to muzyczny.net (same orange `#F58F00`, near-black `#1A1A1A`,
same header/footer identity).

Body of articles uses **Source Serif Pro** (deliberate editorial contrast with
the shop's UI-sans-serif). UI elements (nav, buttons, cards) use **Inter**.

## Adding new landings

1. Create `src/content/landings/<slug>.md` with frontmatter
2. Write body in markdown
3. Commit + push → auto-deploy

Set `published: false` in frontmatter to draft without publishing.

## Next steps (not yet built)

- [ ] Category pages (`/kategoria/{slug}/`)
- [ ] Decap CMS at `/admin/` for non-technical publishers
- [ ] RSS feed at `/rss.xml`
- [ ] OG image generation (Satori)
- [ ] Cloudflare Web Analytics or GA4 integration
