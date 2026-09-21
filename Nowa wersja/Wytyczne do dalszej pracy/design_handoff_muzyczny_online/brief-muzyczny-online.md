# Design Brief — muzyczny.online

## Kontekst projektu

**muzyczny.online** to SEO content hub — serwis z poradnikami zakupowymi o instrumentach muzycznych. Serwis siostrzany sklepu muzyczny.pl (sklep e-commerce na platformie IdoSell). Cel: zbieranie ruchu organicznego na długoogonowe frazy (np. „instrumenty muzyczne dla dzieci", „jak wybrać pierwsze ukulele") i przekierowywanie go do sklepu przez CTA.

**Stack techniczny:** Astro 5 (statyczne HTML, zero JS runtime), Cloudflare Pages, markdown content collections. Żadnego frameworka JS po stronie klienta — wszystko renderowane server-side. CSS scopowany per komponent + jeden globalny plik tokenów.

**Docelowy użytkownik:** rodzic szukający instrumentu dla dziecka, początkujący muzyk, osoba kupująca prezent. Wiek 25-50, polski rynek, mobile-first (60-70% ruchu z Google będzie mobilne).

---

## Stan obecny — co jest zbudowane

### Strony
- **Homepage** (`/`) — hero ciemny + grid kart poradników (max 6) + newsletter
- **Lista poradników** (`/poradniki/`) — pełna lista kart
- **4 landingi artykułowe:**
  - `/instrumenty-muzyczne-dla-dzieci/`
  - `/instrumenty-muzyczne-uzywane/`
  - `/instrumenty-muzyczne-akustyczne/`
  - `/jak-wybrac-pierwsze-ukulele/`

### Komponenty
- `Header.astro` — sticky, wordmark „muzyczny.online" + tag „poradniki" + 3 linki nav + przycisk „Sklep muzyczny.pl"
- `Footer.astro` — ciemny, 3-kolumnowy, linki + branding + legal
- `LandingCard.astro` — karta poradnika z miniaturką hero, kategoria, czas czytania, opis, CTA
- `ShopCTA.astro` — inline CTA w treści artykułu kierujący do kategorii sklepu
- `Newsletter.astro` — sekcja newsletter z formularzem email
- `FeatureBar.astro` — pasek z ikonami (obecnie nieużywany, wyłączony z homepage)
- `LandingLayout.astro` — layout artykułu: hero image → breadcrumbs → nagłówek z metą → treść prose → CTA blok → FAQ accordion → footer CTA
- `BaseLayout.astro` — HTML skeleton, meta OG/Twitter, fonty, header + footer

### Design tokens (global.css)
```
Palette:
--orange: #F58F00 (brand primary)
--orange-hover: #D97A00
--orange-dark: #B36400
--orange-tint: #FDF3E0
--ink: #1A1A1A (headlines, header bg)
--text: #2C2C2C (body)
--text-muted: #6B6B6B
--cream: #F7F5F0 (section bg)
--line: #E8E6E1 (borders)

Typography:
--font-ui: Inter (nagłówki, nav, UI)
--font-serif: Source Serif Pro (body artykułu)
--font-mono: JetBrains Mono (nieużywany)

Layout:
--container: 1240px
--container-narrow: 760px (szerokość kolumny artykułu)
--radius: 6px / --radius-lg: 10px
```

### Grafiki
4 × hero SVG w estetyce synthwave/retrowave 80s — słońce z chromowymi paskami, grid perspektywiczny, sylwetki instrumentów. Tymczasowe placeholdery — docelowo będą zamienione na AI-generowane (Ideogram/Midjourney) fotorealistyczne obrazy z zachowaniem spójnego stylu.

### SEO/structured data już na miejscu
- JSON-LD Article schema na każdym landingu
- JSON-LD FAQPage schema (accordion FAQ)
- Breadcrumbs z aria-label
- Canonical, OG, Twitter Card meta
- Auto-generowany sitemap-index.xml
- robots.txt
- Semantyczny HTML (`<article>`, `<nav>`, `<main>`, `<header>`)
- `<html lang="pl">`

---

## Co trzeba poprawić — wizualnie

### 1. Homepage hero
**Problem:** hero wygląda generycznie — ciemne tło + tekst po lewej + SVG po prawej to layout, który ma każdy SaaS template. Nie komunikuje „instrumenty muzyczne" ani „poradnik, któremu zaufam".

**Kierunek:** hero powinien komunikować autorytet i praktyczność. Rozważ:
- Zmianę layoutu hero na pełną szerokość z gradientem/overlay na zdjęciu w tle (kiedy będą AI-generowane grafiki)
- Dodanie social proof pod CTA (np. „Ponad 15 lat w branży", „Tysiące sprzedanych instrumentów" — ale w subtelny sposób, nie jako pasek ikon)
- Lepszą hierarchię typograficzną: headline powinien być mocniejszy (bold 700 zamiast 600), opis cieplejszy (ciepły szary zamiast zimnego #B8B8B8)

### 2. Karty poradników (LandingCard)
**Problem:** karty są czyste, ale nudne — wyglądają jak każdy blog. Brak wizualnego rozróżnienia między kategoriami. Hover to delikatne podniesienie i zmiana border — za mało „nagrody" za interakcję.

**Kierunek:**
- Silniejszy hover (np. subtelny gradient w tle lub cień)
- Rozważ kolorowe akcenty per kategoria (pasek boczny lub topbar na karcie w kolorze kategorii)
- Lepsza proporcja miniaturki do tekstu (aspect-ratio 16:9 zamiast 5:2?)
- Rozważ wariant „featured" dla pierwszego/najnowszego poradnika (większa karta, 2-kolumnowa)

### 3. Typografia artykułu
**Problem:** serif (Source Serif Pro) w body artykułu to świadomy wybór odróżniający treść od UI, ale wymaga dopracowania:
- Line-height 1.75 na 18px to dużo — tekst jest „rozstrzelony"
- Nagłówki H2/H3 potrzebują lepszego oddzielenia wizualnego od body (np. subtelna linia nad H2 lub dodatkowy spacing)
- Tabele wyglądają flat — potrzebują lepszej czytelności na mobile (horizontal scroll albo responsive cards)

**Kierunek:**
- Rozważ czy serif naprawdę działa — albo go dopracuj (line-height 1.65, font-size 17px), albo przejdź na sans-serif z lepszym formatowaniem akapitów
- Dodaj `text-wrap: pretty` na paragrafach (native browser orphan control)
- Rozważ drop caps albo wyróżniony pierwszy paragraf (większy font, inny kolor)

### 4. CTA do sklepu (ShopCTA)
**Problem:** wygląda jak notyfikacja, nie jak zaproszenie. Border-left pomarańczowy + cream bg to zbyt podobne do „info box". Użytkownik może to zignorować.

**Kierunek:**
- Silniejszy wizualny kontrast (np. ciemne tło z pomarańczowym akcentem — odwrotność obecnego)
- Rozważ miniaturkę produktu/kategorii (placeholder icon lub docelowo zdjęcie z IdoSell)
- Przycisk „Zobacz w sklepie" potrzebuje więcej vizualnego ciężaru

### 5. FAQ accordion
**Problem:** działa, ale wygląda banalnie. Plus/minus to najprostsza możliwa ikonka.

**Kierunek:**
- Chevron zamiast +/− (obraca się o 180° przy otwarciu — smooth transition)
- Rozważ lekki background na otwartym pytaniu
- Odpowiedzi mogą mieć inny bg albo indentation żeby odróżnić się od pytań

### 6. Newsletter sekcja
**Problem:** ciemne tło z pomarańczowymi glow spotami — wygląda jak landing page z 2019. Forma (email input + przycisk) jest OK funkcjonalnie, ale wizualnie flat.

**Kierunek:**
- Prostsze podejście — może kremowe tło zamiast ciemnego (odwróć kontrast)
- Albo: zachowaj ciemne, ale z subtelnym pattern (siatka perspektywiczna nawiązująca do synthwave hero?)
- Input i przycisk potrzebują większego kontrastu między sobą

### 7. Mobile experience
**Problem:** wszystko działa responsywnie (gridy się składają), ale to minimum. Nie ma celowego mobile-first designu.

**Kierunek:**
- Header na mobile ukrywa nav i zostawia tylko ikonę + link do sklepu — rozważ hamburger menu albo bottom navigation
- Karty poradników na mobile powinny mieć mniejsze miniaturki (albo żadnych — sam tekst ze strzałką)
- Tabele w artykułach muszą mieć overflow-x: auto albo alternatywny układ (stacked cards)
- FAQ na mobile powinno mieć większe touch targets (min 48px)

### 8. Spójność z marką sklepu
**Problem:** serwis powinien być wizualnie „rodzeństwem" sklepu muzyczny.net/pl, nie jego klonem. Obecny design idzie w dobrym kierunku (ta sama pomarańcz, ta sama czarno-biała baza), ale brakuje:
- Spójnego traktowania linków do sklepu (teraz wyglądają jak zwykłe przyciski — powinny wyglądać jak „most" do drugiego serwisu)
- Wspólnego elementu brandowego (np. subtelna linia pomarańczowa w nagłówku/stopce identyczna z tą ze sklepu)

---

## Co trzeba poprawić / dodać — SEO i AI

### 1. Brakujące structured data
- **BreadcrumbList schema** — breadcrumbs są w HTML, ale nie mają JSON-LD. Dodać `@type: BreadcrumbList` schema obok Article i FAQPage.
- **Organization schema** — brak globalnego schema na homepage opisującego muzyczny.online jako organizację (name, url, logo, sameAs do social media)
- **WebSite schema z SearchAction** — sygnał dla Google o wewnętrznej wyszukiwarce (nawet jeśli jeszcze nie istnieje — przygotowuje grunt)
- **HowTo schema** — artykuły typu „jak wybrać" kwalifikują się do HowTo rich snippet. Rozważ dodanie jako alternatywę/uzupełnienie do Article schema na artykułach poradnikowych.

### 2. Semantyka HTML do poprawienia
- **Table of Contents (TOC)** — artykuły mają spis treści w mockupie, ale nie w implementacji. Dodać automatycznie generowany TOC z `<nav aria-label="Spis treści">` + anchor linkami do H2. Google używa TOC do generowania sitelinks w SERP.
- **`<time datetime="">` na dacie aktualizacji** — obecnie „Aktualizacja: wrzesień 2026" to plain text. Powinno być `<time datetime="2026-09-20">wrzesień 2026</time>`.
- **`<figure>` + `<figcaption>`** — tabele i obrazki w artykułach powinny być w `<figure>` z opisowym `<figcaption>`. Pomaga zarówno screen readerom jak i AI.
- **Heading hierarchy** — sprawdzić czy na żadnej stronie nie ma skoku z H1 do H3 (pominięty H2).
- **`role="article"` nie jest potrzebne** (już mamy `<article>`), ale `itemscope itemtype="https://schema.org/Article"` w HTML może być dodatkowym sygnałem (microdata oprócz JSON-LD — belt and suspenders).

### 3. Performance / Core Web Vitals
- **Font loading** — Google Fonts ładowane przez `<link>` blokują render. Zmienić na `font-display: swap` (już jest w URL) + rozważyć `<link rel="preload" as="font">` dla krytycznych wag Inter 400/600.
- **Hero image** — SVG hero ładowane jako `<img>` wymuszają dodatkowe żądanie HTTP. Rozważyć inline SVG w HTML dla above-the-fold hero (eliminuje render-blocking request).
- **CSS extraction** — Astro już robi scope, ale sprawdzić czy nie ładuje CSS komponentów, które nie są na danej stronie (np. Newsletter CSS na landing page gdzie nie ma newslettera).
- **OG image** — `og-default.png` jest zadeklarowane w meta, ale plik nie istnieje. Wygenerować dynamiczne OG images per landing (np. Satori/sharp w Astro build pipeline — tytuł + branding na pomarańczowym tle).

### 4. Optymalizacja pod AI Overview / SGE / Perplexity
- **Jednoznaczne odpowiedzi w pierwszym paragrafie** — AI wyszukiwarki wyciągają „answer snippet" z pierwszych 2-3 zdań. Każdy landing powinien zaczynać się od bezpośredniej odpowiedzi na pytanie z title, nie od opisu problemu.
- **Wyraźne pytania jako H2** — zamiast „4 rodzaje ukulele" lepiej „Jakie są 4 rodzaje ukulele?" (fraza pytająca = wyższa szansa na featured snippet / AI citation).
- **Tabelki porównawcze z wyraźnymi nagłówkami** — AI modele i Google łatwiej parsują tabele z `<th>` scope="col" niż zwykłe boldy w pierwszym wierszu.
- **Sekcja „Podsumowanie / Kluczowe wnioski"** na końcu artykułu (przed FAQ) — AI wyszukiwarki często cytują podsumowania.
- **Author/expertise signals** — dodać author bio na dole artykułu albo na stronie „O nas" z linkiem z każdego artykułu. EEAT sygnał (Experience, Expertise, Authoritativeness, Trustworthiness).

### 5. Internal linking
- **Linki między poradnikami w treści** — artykuły powinny linkować do siebie nawzajem w naturalnych miejscach (np. „jak wybrać ukulele" → link do „instrumenty muzyczne dla dzieci" w sekcji o ukulele dla dzieci). Buduje topical authority.
- **Sidebar / Related articles** — na landing page, pod FAQ albo w sidebarze: „Powiązane poradniki" z linkami do 2-3 innych artykułów. Obniża bounce rate i wydłuża czas na stronie.

### 6. Rzeczy techniczne do dodania
- **RSS feed** (`/rss.xml`) — sygnał aktywności serwisu, ułatwia indeksowanie
- **404 page** — nie istnieje; soft 404 z linkami do homepage i poradników
- **Trailing slash consistency** — sprawdzić czy Astro config + Cloudflare Pages spójnie obsługują trailing slash (niektóre konfiguracje powodują duplicate content)
- **Hreflang** — nie potrzebny teraz (site jest po polsku), ale zostawić hook w BaseLayout na przyszłość
- **Service Worker / offline** — nie priorytet, ale Cloudflare Workers pozwala na precaching critical assets

---

## Ograniczenia techniczne

- **Zero JS frameworks na kliencie** — cały interaktywny UI musi działać na native HTML/CSS (details/summary, :hover, :focus-within, scroll-driven animations). Żadnego Reacta, żadnego Alpine.
- **Astro scoped styles** — każdy komponent ma własne `<style>`, CSS nie wycieka do sąsiadów. Globalne tokeny w `src/styles/global.css`.
- **Static output** — Astro buduje statyczne HTML. Żadnych server-side fetch, żadnych API calls w runtime. Wszystko musi być znane w build time.
- **Google Fonts via CDN** — fonty ładowane z fonts.googleapis.com. Self-hosting fontów jest opcją ale wymaga dodatkowej pracy.
- **SVG hero images** — tymczasowe. Layout musi obsługiwać zarówno SVG jak i rasterowe obrazy (JPG/WebP) po podmianie.
- **Content w markdown** — artykuły napisane w markdown, renderowane przez Astro. Struktura HTML wynikowa nie jest w pełni kontrolowalna (nagłówki, paragrafy, tabele, listy — standard markdown).

---

## Priorytetyzacja

1. **Typografia i czytelność artykułu** — to jest produkt; 80% czasu użytkownika będzie w artykule
2. **CTA do sklepu** — to jest monetyzacja; muszą być zauważalne ale nie agresywne
3. **Mobile experience** — 60-70% ruchu
4. **Karty poradników na homepage** — first impression
5. **SEO / structured data gaps** — łatwe quick wins z dużym ROI
6. **Newsletter** — ważny ale drugorzędny wobec powyższych
7. **Hero homepage** — najmniej pilny, bo zmieni się z grafikami

---

## Inspiracje i kierunek wizualny

Strony, które robią dobrze to, co my chcemy osiągnąć:
- **Wirecutter** (nytimes.com/wirecutter) — czytelność, zaufanie, jasne CTA na produkty
- **Thomann blog** (blog.thomann.de) — branżowy content hub, dobry mobile
- **Sweetwater** (sweetwater.com/insync) — poradniki muzyczne z autorytetem
- **RTings** (rtings.com) — tabelki porównawcze, czytelna hierarchia, featured snippets

**Nie chcemy wyglądać jak:**
- typowy blog na WordPressie z defaultowym motywem
- SaaS landing page z gradientami i mockupami
- sklep e-commerce (to jest poradnik, nie katalog)

**Estetyka marki:** nowoczesna, profesjonalna, ciepła (pomarańcz + czerń). Odrobina charakteru z synthwave 80s (nawiązanie do retro-muzycznego klimatu), ale subtelna — nie theme park. Czytelność zawsze wygrywa z efektownością.
