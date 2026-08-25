# Georgetown Home Services

Independent Georgetown, TX home-services directory and editorial site: compare local plumbers, HVAC, roofers, and more with Google ratings, primary-source license checks where Texas requires them, cost guides, and seasonal checklists.

**Stack:** Next.js 16 (App Router) · React 19 · Tailwind v4 · TypeScript · Node 22 · Vercel

## Quick start

```bash
cp .env.example .env.local   # optional integrations
npm install
npm run dev                  # http://localhost:3000
```

Production check:

```bash
npm run build && npm start
npm run smoke                # needs a running server (BASE_URL optional)
```

## Product map

| Area | Routes | Data |
|------|--------|------|
| Home / directory | `/`, `/providers/[slug]` | `data/ghs-verified-providers.json` |
| Best Of | `/best`, `/best/[slug]` | verified providers + `data/providers.json` intros |
| Service hubs | `/services/...` | `data/site-content.json` |
| Cost guides | `/costs/...` | `data/cost-guides.ts` + `data/affiliates.ts` |
| Seasonal / PDFs | `/seasonal` | `data/seasonal-guides.ts`, `private/lead-magnets/` |
| Contractor claims | `/for-contractors`, `/admin/claims` | `data/claim-requests.jsonl` |

Editorial CMS content lives primarily in `data/site-content.json`. Generators under `scripts/` exist for corpora; prefer deepening hubs over adding thin URLs (`lib/public-site-scope.ts` + redirects).

## Key conventions

- **Providers:** One source of truth — `ghs-verified-providers.json` via `data/providers.ts`. Homepage trade columns and Best Of use the same set.
- **Licenses:** Badges render only when `licenseNumber` + `licenseVerifiedDate` exist (TSBPE / TDLR / TDA). State-exempt trades (roofing, landscaping, foundation, cleaning) show a confirmation badge when `licenseType` says no state license is required and a confirmation date is set.
- **SEO:** `lib/page-seo.ts`, `app/sitemap.ts`, IndexNow postbuild, weekly GSC digest under `scripts/seo/`.
- **Ads:** `ADSENSE_ENABLED` defaults on; set `NEXT_PUBLIC_ADSENSE_ENABLED=false` to disable. Slots in `lib/adConfig.ts`.
- **Affiliates:** Impact env overrides (`IMPACT_AFFILIATE_*`) in `data/affiliates.ts`; Angi click URLs in `lib/affiliateLinks.ts`.
- **Claim CRM:** Set `ADMIN_CLAIMS_SECRET`, then open `/api/admin/claims-session?key=…` once to cookie-auth `/admin/claims`.

## Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Turbopack dev server |
| `npm run build` | Production build (primary CI gate) |
| `npm run lint` | ESLint (eslint-config-next) |
| `npm run smoke` | Route + feedback API smoke check |
| `npm run generate:lead-pdfs` | Rebuild gated checklist PDFs |
| `npm run seo:all` | GSC pull → audit → freshness → digest |

## Environment

See `.env.example` for Resend, Beehiiv, AdSense, GA4, IndexNow, Impact, and `ADMIN_CLAIMS_SECRET`. The site runs without `.env.local`; forms append to `data/*.jsonl` and succeed without Resend configured.

## Editing content

1. **Provider licenses / phones / ratings** → `data/ghs-verified-providers.json`
2. **Best Of intros** → `data/providers.json` `evaluatedIntro`
3. **Long-form service/blog copy** → `data/site-content.json`
4. **Sub-service local depth** → `lib/sub-service-local-depth.ts` (appended on thin pages)
5. **Cost guides** → `data/cost-guides.ts`

Do not invent license numbers. Prefer primary-source board lookups and document notes on the row.
