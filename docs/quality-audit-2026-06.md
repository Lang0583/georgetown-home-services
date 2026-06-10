# Site quality audit — June 2026

Full pass prioritizing **AI slop removal**, **editorial depth**, and **measurable quality signals**.

## Executive summary

| Area | Finding | Action taken |
|------|---------|--------------|
| Hail blog posts | Legacy `generatedPages.json` HTML overrode cleaner CMS bodies; urgency metas and lead form copy | CMS body priority; removed 5 hail generated entries; fixed metas + storm form |
| `generatedPages.json` | First-person contractor voice (“We help”, “free quotes”) on core service pages | `scripts/de-slop-generated-pages.mjs` editorial rewrites |
| Sub-service pages (×64) | Identical boilerplate on every URL | Hash-varied hiring/HOA/DIY lines + trade-specific scope paragraph |
| Cost guides (×16) | Duplicate FAQ skeleton + “People also ask” heading | Trade-specific FAQs, season copy, neutral FAQ title |
| SEO audit tooling | Blind to `/plumbing/*` and `/costs/*` | Extended `seo:audit` to 151 pages |
| Provider intros | Same opening sentence on 4 categories | Distinct intros per trade in `data/providers.json` |

## Remaining work (not blocking deploy)

1. **CMS service pages** — 34 redirected or neighborhood-specific service slugs still flag under 800w in `seo:audit`; hubs (`plumber-georgetown-tx`, etc.) are the canonical depth targets.
2. **Blog posts** — 8 posts under 800w (mostly cost adjuncts with injected pricing at render time).
3. **Neighborhood × service (×42)** — Not in automated audit yet; spot-check `data/neighborhoods.ts` for formulaic `whyLocal` blocks.
4. **AdSense** — Manual dashboard check for Auto Ads vs manual unit overlap.
5. **Production link crawl** — `BASE_URL=https://www.georgetownhomeservices.com node scripts/audit-links.mjs` (June 10, 2026: fixed `/services/plumbing-georgetown-tx` 404 on seasonal pages; added 301 to plumber hub).

## June 10 follow-up audit

| Area | Finding | Action |
|------|---------|--------|
| Broken internal links | `/services/plumbing-georgetown-tx` linked from seasonal guides (404) | Fixed to `plumber-georgetown-tx`; 301 redirect added |
| Roofing sub-services | Identical “non-optional on many slopes” line on 8 pages | Varied `TYPICAL_SCOPE` in generator; regenerated `sub-services.ts` |
| PDF lead magnets | Welcome email sent only 3 of 6 PDFs | Welcome email now attaches **all six** gated PDFs + signed links |
| Signup paths | Service-request seasonal opt-in skipped welcome email | Now calls `sendLeadMagnetWelcomeEmail` after list signup |
| Thin generated pages | 45 pages under 800w in `seo:audit` | Hubs OK; sub-service stubs remain backlog (no deletes) |

## Commands

```bash
npm run seo:audit          # 151 pages → .reports/content-health.json
node scripts/de-slop-generated-pages.mjs
node scripts/generate-sub-services-data.mjs
node scripts/generate-cost-guides-data.mjs
npm run build
```

## Slop patterns removed

- `Act before your insurance window closes` (blog metas, storm form)
- `People also ask:` (cost guide FAQ heading)
- `Ask for two itemized estimates listing parts, labor, permits…` (×64 sub-services)
- `Georgetown Home Services helps homeowners…` (generated HTML)
- Inline “free inspection” CTA buttons duplicated in generated hail HTML (entries removed)

## Quality bar going forward

- **Hail / storm content**: CMS (`site-content.json`) is source of truth; do not re-add `generatedPages` hail entries.
- **Generators**: Run `de-slop` + human pass before bulk regen; generators are scaffolding, not final copy.
- **PR gate** (recommended): grep for `Georgetown Home Services helps`, `People also ask`, `insurance window closes` on `data/` and `lib/generatedPages.json`.
