# Technical SEO audit

**Date:** 2026-07-18  
**Scope:** Static analysis of the Georgetown Home Services Next.js codebase (`SITE_URL` default `https://www.georgetownhomeservices.com`).  
**Method:** Code inspection of metadata helpers, `app/robots.ts` / `public/robots.txt`, `lib/sitemap-entries.ts`, content corpora for neighborhood / ZIP / service pages (Jaccard token similarity ≥ 0.80), internal-link BFS from `/` to `/providers/*`, grep for layout/overflow risks at ~375px, and inventory of `<img>` / `next/image` usage.  
**Status:** Report only — no product code changes in this commit.

---

## 1. Canonicals

### Standardization

| Signal | Value |
|--------|--------|
| Intended origin | **https + www** via `lib/page-seo.ts` → `SITE_URL` default `https://www.georgetownhomeservices.com` |
| Root `metadataBase` | Same (`app/layout.tsx`) |
| Path normalization | Leading `/`, **no trailing slash** (except `/`), query/hash stripped (`normalizeSeoPathname`) |

### Is there a canonical on every page?

**Yes for all App Router `page.tsx` routes inventoried (43 files):**

- **41** pages use `pageSeoMetadata()`, which always sets `alternates.canonical` to `absolutePageUrl(pathname)` (absolute https://www… URL).
- **2** pages set `alternates.canonical` manually to the same www https origin:
  - `/sun-city/plumber`
  - `/plumbing/water-heater-replacement-cost-georgetown-tx`

Root layout does **not** emit a per-URL canonical; page-level metadata supplies it.

`components/CanonicalFromPathname.tsx` exists but is **not imported anywhere**. It is unused client-side code that would hardcode `https://www.georgetownhomeservices.com${pathname}` without the shared normalizer.

### Canonical vs request URL mismatches

| Case | Finding |
|------|---------|
| Visit on **non-www** or **http** | Canonical still points at **https://www…** (intentional apex preference). Not a self-mismatch in the generator; depends on host redirects at the edge/CDN. |
| Trailing-slash request | Next `trailingSlash: false` + path normalizer → canonical without trailing slash. |
| Hardcoded legacy pages | Canonicals match their routes under www https — **no mismatch** vs own path. |
| Generator bugs found | **None** where a page’s canonical path ≠ its route pathname under `SITE_URL`. |

### Host inconsistency (related — robots, not HTML canonical)

`public/robots.txt` advertises **non-www** `Host` and sitemap URL while HTML canonicals / `app/robots.ts` prefer **www**. See §2.

---

## 2. Robots + sitemap

### Current `public/robots.txt` (static file in repo)

```txt
# *
User-agent: *
Allow: /

# Host
Host: https://georgetownhomeservices.com

# Sitemaps
Sitemap: https://georgetownhomeservices.com/sitemap.xml
```

### Current `app/robots.ts` (Next metadata route)

- `User-agent: *`
- `Allow: /`
- `Disallow: /api/`
- `Sitemap: ${SITE_URL}/sitemap.xml` → with default env:  
  `https://www.georgetownhomeservices.com/sitemap.xml`

**Conflict:** Static `public/robots.txt` (non-www, no `/api/` disallow) vs dynamic `app/robots.ts` (www, disallows `/api/`). Whichever wins in production hosting must be verified; they disagree on host and API disallow. HTML canonicals follow **www**.

### Sitemap inventory (`app/sitemap.ts` → `buildSitemapEntries()`)

Included families (when not filtered by noindex / redirect / extended-flag rules):

| Family | Included |
|--------|----------|
| Hubs | `/`, `/services`, `/best`, `/blog`, `/compare`, `/costs`, `/zip`, `/pricing`, `/seasonal`, trust pages, `/for-contractors`, `/search`, etc. |
| Core + other services | `/services/[slug]` (skips redirected + noindex + gated extended) |
| Best Of | `/best/[slug]` |
| Providers | `/providers/[slug]` for verified directory providers |
| Cost guides | `/costs/[slug]` |
| Sub-services | `/[service]/[slug]` |
| Blog | `/blog/[slug]` (+ optional `data/blog-paths.json`) |
| Locations | `/locations/[slug]` (skips redirected/noindex) |
| Neighborhoods | `/neighborhoods/*/home-services`, `/neighborhoods/*/hail-damage` |
| ZIP | `/zip/78626`, `78628`, `78633`, `78634` |
| Compare | `/compare/[slug]` for all comparison slugs |
| Seasonal | `/seasonal/{spring,summer,fall,winter}` |
| One-offs | `/sun-city/plumber`, `/plumbing/water-heater-replacement-cost-georgetown-tx` |
| Deduping | Final pass removes duplicate absolute URLs |

**Exclusions (by design):** redirected service/location slugs, `isNoindexSlug` routes, extended-only content when `showExtendedHomeServices()` is false, `/api/*`.

### Sitemap 404s / redirects

| Check | Result |
|-------|--------|
| Alias paths like `/home`, `/index`, `/privacy`, `/roofing`, `/hvac` | **Not** emitted by sitemap builder (they are 301 sources in `next.config.ts`) |
| Redirected `/services/{legacy}` slugs | **Filtered** via `isRedirectedServiceSlug` before push |
| Query-only redirects (`/blog?page=1` → `/blog`) | Path `/blog` remains valid; not a sitemap 404 risk |
| Live HTTP probe of every sitemap URL | **Not run** in this audit (static analysis only) |

**Recommendation for a follow-up fix (not done here):** Resolve `public/robots.txt` vs `app/robots.ts` so Host + Sitemap match the www https canonical host, and keep `/api/` disallowed.

---

## 3. Duplicate clusters (neighborhood × ZIP × service)

**Metric:** Jaccard similarity on tokenized plain text (HTML stripped; tokens length > 2). Threshold: **≥ 0.80**.

**Corpora:**

- Neighborhood home-services hubs (`introHtml` + meta) — 5 pages  
- Neighborhood hail pages (`bodyHtml` + meta) — 4 pages  
- ZIP pages (intros + FAQs + meta) — 4 pages  
- Core service pages (description, bullets, content, html) — 8 pages  

### Pairs ≥ 80% identical

**None found** (0 pairs across within-cluster and cross-cluster comparisons).

### Highest similarities observed (all well below threshold)

| Cluster | Highest pair | Similarity |
|---------|--------------|------------|
| ZIP | `/zip/78628` vs `/zip/78633` | **0.218** |
| Neighborhood home-services | `/neighborhoods/sun-city/home-services` vs `/neighborhoods/berry-creek/home-services` | **0.194** |
| Neighborhood hail | `/neighborhoods/sun-city/hail-damage` vs `/neighborhoods/teravista/hail-damage` | **0.229** |
| Core services | `/services/plumber-georgetown-tx` vs `/services/roofer-georgetown-tx` | **0.219** |

**Conclusion:** No deletion candidates under the 80% rule. Pages share topical vocabulary (Georgetown, trades, clay soil, etc.) but body corpora are distinct.

---

## 4. Internal link depth (homepage → provider detail)

**Graph construction (crawlable approximation):**

- Global nav / footer / homepage links  
- `/` → `/best` → `/best/[category]` → `/providers/[slug]` (all verified providers)  
- `/` → homepage “Verified providers” compact cards (6 providers at depth **1**)  
- `/` → `/zip` → `/zip/[code]` → top providers per category via `ProviderCard`  
- `/` → `/services` → service hubs → related Best Of  

**Provider population:** 39 verified providers from `data/ghs-verified-providers.json`.

### Depth distribution

| Min clicks from `/` | Provider count |
|---------------------|----------------|
| 1 | 6 (homepage verified module) |
| 2 | 33 (via Best Of / ZIP / service→best paths) |
| ≥ 4 | **0** |
| Unreachable in model | **0** |

### Providers at depth ≥ 4

**None.** Every provider detail URL is reachable in at most **2** clicks under this link model.

---

## 5. Responsive breakpoints (~375px)

`body { overflow-x: hidden }` in `app/globals.css` can **mask** horizontal overflow visually; issues below may still affect usability (scroll trapped in nested containers, clipped focus, etc.).

### High-risk: fixed min-widths wider than 375px (inside scroll regions)

| Location | Pattern | Notes |
|----------|---------|--------|
| `app/for-contractors/page.tsx` | `min-w-[28rem]` (448px) + `overflow-x-auto` | Pricing table forces horizontal scroll at 375px |
| `app/reports/williamson-county-license-check/page.tsx` | `min-w-[36rem]` (576px) + `overflow-x-auto` | Data table horizontal scroll at 375px |

### Medium / contained

| Location | Pattern | Notes |
|----------|---------|--------|
| Several tables / pricing UIs | `overflow-x-auto` | `CostGuidePriceTable`, `ServicePricingCostTable`, `BlogCostSupplement`, `SubServicePageTemplate`, service slug page — intentional scroll wrappers |
| `components/SiteNav.tsx` | `min-w-[12.5rem]` | Dropdown panel only |
| `components/VerifiedProfileCard.tsx` | `sm:min-w-[16rem]` | Full-width on small screens (`w-full`); min-width from `sm` up |
| `components/BestAlsoCompareBar.tsx` | `min-w-[44px]` / icon button | Touch target; not a page-width issue |
| `components/ExitInterstitial.tsx` | `max-w-[400px]` + `w-full` | Caps width; fits 375px |
| `components/ComparisonTable.tsx` | Mobile card stack; desktop `table-fixed` | No `overflow-x-auto` (by design after recent work) |

### Not flagged as page-breaking fixed widths

Percentage widths (`w-[22%]`), `max-w-*` / `max-w-[70ch]` prose caps, and sticky bars using `inset-x-0`.

---

## 6. Image alt text

### Inventory

| Kind | Count | Notes |
|------|-------|-------|
| `next/image` (`<Image>`) | **1** call site | `app/blog/[slug]/page.tsx` — `alt={hero.alt}` |
| Raw `<img>` | **0** in `app/` + `components/` | — |

### Meaningful alt?

Blog heroes resolve through `getBlogHeroImage(slug)` (`lib/blog-hero-images.ts`):

- Per-slug descriptive alts (e.g. “Air conditioning repair in Georgetown TX home”)  
- Fallback: `"Home services in Georgetown TX"`  

**No `<img>` / `next/image` instances found with missing or empty alt attributes.**

Open Graph / Twitter images are metadata (`DEFAULT_OG_IMAGE.alt = "Georgetown Home Services"`), not DOM `<img>` tags.

---

## Summary checklist

| Area | Verdict |
|------|---------|
| Canonicals on pages | Present on all page routes; standardized to https://www via `pageSeoMetadata` |
| Canonical self-mismatch | None detected for path vs generator |
| Robots host | **Conflict:** `public/robots.txt` non-www vs app/canonical www |
| Sitemap coverage | Broad inventory; redirects/noindex filtered; live 404 crawl not performed |
| Duplicate ≥80% | **None** among neighborhood / ZIP / service corpora |
| Provider depth ≥4 | **None** (max depth 2 in model) |
| 375px overflow risks | Contractor + license-report tables (`min-w-[28rem]` / `min-w-[36rem]`) |
| Missing image alts | **None** found |

---

## Suggested follow-ups (awaiting approval — not implemented)

1. Align or remove `public/robots.txt` so Host + Sitemap match www https (and keep `/api/` disallowed).  
2. Optionally delete or wire `CanonicalFromPathname` so it cannot diverge from `pageSeoMetadata`.  
3. Soften `min-w-[28rem]` / `min-w-[36rem]` tables for 375px if horizontal scroll is unacceptable.  
4. Optional live crawl: fetch production `robots.txt` + every sitemap `<loc>` for status codes.
