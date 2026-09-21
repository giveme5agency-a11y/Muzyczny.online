# Handoff: Muzyczny.online — Homepage + Landing artykułu

## Overview
Redesign SEO content huba muzyczny.online (siostra sklepu muzyczny.pl). Stack docelowy: **Astro 5 + Cloudflare Pages**, statyczne HTML, zero JS runtime, CSS scopowany per komponent + globalne tokeny w `src/styles/global.css`.

Pakiet zawiera 4 makiety HTML: dwa ekrany "stan obecny" (do porównania) i dwa ekrany docelowe (v2) — plus katalog wariantów.

## About the Design Files
Pliki `.dc.html` w tym pakiecie to **referencje wizualne w HTML** — prototypy pokazujące zamierzony wygląd i zachowanie, **nie kod produkcyjny do skopiowania 1:1**. Zadanie: **odtworzyć te makiety w istniejącym środowisku Astro** (`src/components/*.astro`, `src/layouts/*.astro`, `src/pages/*.astro`) używając wzorców i tokenów, które już są w repo. Wszystkie style są inline w makietach (wymóg środowiska), w Astro przenieś je do `<style>` scopowanego per komponent zgodnie z istniejącą konwencją.

## Fidelity
**High-fidelity.** Kolory, typografia, spacing i interakcje są docelowe — odtwarzaj piksel-w-piksel. Tokeny są zgodne z istniejącym `src/styles/global.css` z repo `giveme5agency-a11y/Muzyczny.online`.

## Design Tokens (bez zmian względem repo)

```
--orange: #F58F00       --ink: #1A1A1A          --white: #FFFFFF
--orange-hover: #D97A00 --ink-soft: #2C2C2C     --cream: #F7F5F0
--orange-dark: #B36400  --text: #2C2C2C         --cream-strong: #EFEBE0
--orange-tint: #FDF3E0  --text-muted: #6B6B6B
                        --text-quiet: #9A9A9A
                        --line: #E8E6E1
                        --line-soft: #F0EEE9

--font-ui: 'Inter', -apple-system, 'Segoe UI', Roboto, sans-serif
--font-serif: 'Source Serif 4', Charter, Georgia, serif   (uwaga: repo ma "Source Serif Pro" — patrz Uwagi)
--font-mono: 'JetBrains Mono', ui-monospace, monospace

--container: 1240px
--container-narrow: 760px
--radius: 6px
--radius-lg: 10px
--ease-out: cubic-bezier(0.2, 0.7, 0.3, 1)
```

## Screens

### 1. Homepage — plik: `Muzyczny Online - Homepage v2.dc.html` → `src/pages/index.astro`

Layout:
- Sticky header 66px (białe tło, border-bottom `--line`)
- Hero grid 2-kol `minmax(340px, 1fr)`, gap 48px, padding 64px 0 66px
  - Lewa: eyebrow mono 11px w `--orange-dark`; H1 48px/1.05 waga 700 letter-spacing −1.5px; lead serif 19px/1.6 w `#4A4238`; CTA `btn-ink` + `btn-outline`
  - Prawa: placeholder 4:3, tło `--cream-strong` z pasami repeating-linear-gradient(135deg, rgba(26,26,26,0.06) 0 12px, transparent 12px 24px), radius 10px, 1px border `--line`
- Featured card (najnowszy poradnik): grid 2-kol `minmax(300px, 1fr)`; obraz min-height 300px; chip "Najnowszy" w `--orange-tint`; H3 28px/1.18 waga 600 letter-spacing −0.7px; lead serif 17px w `#4A4238`; CTA `btn-ink` 13px 22px
- Standard grid: `repeat(auto-fill, minmax(320px, 1fr))`, gap 22px; aspect-ratio 16/9; hover: box-shadow + translateY(-3px), transition 0.18s
- Newsletter: sekcja `--ink` z radial-gradient glow (rgba(245,143,0,0.16) 520×260 at 18% 40%, i 0.10 420×220 at 72% 80%); input focus → border `--orange`; checkbox accent-color `--orange`
- Footer: grid `1.5fr + 3×1fr`, gap 40px, tło `--ink`, tekst `#B8B8B8`

### 2. Landing artykułu — plik: `Muzyczny Online - Landing artykułu v2.dc.html` → `src/layouts/LandingLayout.astro`

Layout (kolumna narrow 760px):
1. Header
2. Breadcrumbs — 14px pad, font 12px `--text-muted`
3. Meta (kategoria | reading time | `<time datetime>` aktualizacja) — 11px uppercase 0.09em letter-spacing
4. H1 40px/1.12 waga 700 letter-spacing −1.1px
5. Lead paragraf — serif 20px/1.6 waga 600 w `--ink` (bezpośrednia odpowiedź dla AI Overview)
6. Author bio — flex, avatar 44px round, tło `--cream`, radius 8px
7. TOC `<nav aria-label="Spis treści">` — border-top+bottom `--line`, grid `minmax(240px, 1fr)` gap 10px/28px, numeracja mono
8. Prose — serif 17px/1.65 w `#2C2C2C`
   - H2: 25px waga 600 letter-spacing −0.4px, margin 52px 0 14px, padding-top 24px, border-top `--line`, scroll-margin-top 80px, formułowane jako pytania
   - Tabela w `<figure>` z `<figcaption>`, `<th scope="col">` + `<th scope="row">`, wyróżniony wiersz w `--orange-tint`, `overflow-x: auto`, min-width 560px
9. ShopCTA inline (dark) — tło `--ink`, 88×88 placeholder, eyebrow orange, tytuł `--white` 19px, opis `#B8B8B8`, CTA `--orange` 48px min-height
10. "Kluczowe wnioski" — box `--cream` radius 10px
11. FAQ `<details>` — border-top `--line`, min-height 48px, chevron 13px `--orange` obraca się o 180° w `[open]`, otwarte pytanie ma tło `--cream`, odpowiedź w serif 16px z border-left `--orange-tint`
12. "Kup to, o czym czytasz" — biały box, orange topbar 3px, lista linków 48px touch targety
13. Powiązane poradniki — 3 karty grid `minmax(220px, 1fr)`
14. Footer

### 3. Header — mobile
Referencja: sekcja mobile 390px na dole `Homepage v2`. Hamburger 20×2px bary, touch targety min 48px, lista poradników bez miniaturek.

## Component Mapping
| Makieta | Plik docelowy w repo |
|---|---|
| Homepage v2 | `src/pages/index.astro` |
| Landing artykułu v2 | `src/layouts/LandingLayout.astro` + `src/pages/[slug].astro` |
| Header | `src/components/Header.astro` |
| Footer | `src/components/Footer.astro` |
| LandingCard standard + featured | `src/components/LandingCard.astro` (props: `featured?: boolean`) |
| ShopCTA dark + bridge | `src/components/ShopCTA.astro` (props: `variant: 'dark' \| 'bridge'`) |
| Newsletter | `src/components/Newsletter.astro` |
| TOC | `src/components/TableOfContents.astro` |
| FAQ | `src/components/Faq.astro` |

## Interactions & Behavior
- Hover kart: `box-shadow: 0 14px 30px rgba(26,26,26,0.11); transform: translateY(-3px)`, transition 0.18s `--ease-out`
- FAQ: natywne `<details>`, chevron transition 0.18s
- Newsletter form: input focus → border `--orange`
- Wszystkie CTA: hover na `btn-primary` → `background: --orange-hover; color: --white`
- **Zero client JS** — details/summary, :hover, :focus-within
- Touch targety mobile: min 48px

## State Management
Brak — całość server-rendered w Astro build time.

## Responsive
- Container padding: 20px desktop, 16px mobile (istniejące `.wrap`)
- Wszystkie gridy: `repeat(auto-fit|auto-fill, minmax(N, 1fr))` — bez media queries
- Hero i featured card: 2-kol → 1-kol przez auto-fit
- Tabela: `<figure>` z `overflow-x: auto` + `min-width: 560px` na tabeli

## SEO/A11y (wg briefu — do dodania przy implementacji)
- BreadcrumbList JSON-LD obok istniejącego Article + FAQPage
- Organization JSON-LD na homepage
- WebSite + SearchAction JSON-LD
- HowTo JSON-LD dla artykułów "jak wybrać"
- `<time datetime>` — już w makiecie
- `<figure>` + `<figcaption>` dla tabel — już w makiecie
- `<th scope>` — już w makiecie
- TOC `<nav aria-label>` — już w makiecie
- Author bio — już w makiecie
- Powiązane poradniki — już w makiecie
- Sekcja "Kluczowe wnioski" przed FAQ — już w makiecie
- RSS feed, 404 page, OG images per landing — do dorobienia

## Assets
- `public/heroes/{dzieci,ukulele,uzywane,akustyczne}.svg` — istniejące placeholdery synthwave z repo. **W makietach zastąpione neutralnymi placeholderami pasów** — docelowo do podmiany na fotorealistyczne zdjęcia AI (Ideogram/Midjourney).
- `public/favicon.svg` — bez zmian

## Uwagi implementacyjne
1. **Font `Source Serif Pro`** z repo → makieta używa `Source Serif 4` (aktualna wersja tego samego kroju w Google Fonts). Zaktualizuj `global.css`:
   ```css
   --font-serif: 'Source Serif 4', Charter, Georgia, serif;
   ```
2. **Serif prose:** brief kwestionuje 1.75/18px — makieta używa 17px/1.65. Potwierdź decyzję.
3. **Astro scoped styles:** wszystkie inline style i pseudo-hover z makiet → w `.astro` przenieś do `<style>` (`&:hover { ... }`).
4. **Zero client JS:** FAQ na `<details>`, hamburger mobile — `<details>` albo `:target`, żadnego Alpine/JS.

## Files w pakiecie
- `README.md` (ten plik)
- `Muzyczny Online - Homepage.dc.html` — stan obecny (referencja)
- `Muzyczny Online - Homepage v2.dc.html` — **cel do implementacji**
- `Muzyczny Online - Landing artykulu.dc.html` — stan obecny (referencja)
- `Muzyczny Online - Landing artykulu v2.dc.html` — **cel do implementacji**
- `Muzyczny Online - Warianty.dc.html` — katalog wariantów (kontekst decyzji)
- `brief-muzyczny-online.md` — oryginalny brief
- `github.md` — powiązanie z repo giveme5agency-a11y/Muzyczny.online
- `public/heroes/*.svg`, `public/favicon.svg`
