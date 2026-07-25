# SEO signal pipeline

The SEO pipeline is a **read-only, suggestion-only** system. It pulls data,
audits content, and opens a single GitHub issue every Monday with everything
worth triaging that week. It does not auto-generate content, open PRs, or
submit URLs to Google.

## What it does

Every Monday at ~8 AM Central, `.github/workflows/seo-weekly-digest.yml` runs:

1. **`scripts/seo/pull-gsc-data.ts`** — fetches last 28 days of Search Console
   data plus the prior 28 for trend comparison. Flags:
   - pages with impressions ≥ 100, CTR < 1%, and position ≤ 20 (best
     title-rewrite candidates)
   - pages with impressions but zero clicks
2. **`scripts/seo/audit-content-health.ts`** — flags:
   - cost-titled pages with **zero `$` figures** (the "cost guide with no
     costs" pattern that causes "Discovered – currently not indexed")
   - cost pages with fewer than 3 `$` figures
   - thin pages (< 800 words for blog/service, < 500 for best/location)
3. **`scripts/seo/audit-freshness.ts`** — flags:
   - pages whose content source was last committed more than 90 days ago
   - blog posts without an explicit `dateModified` in the `overrides` map in
     `app/blog/[slug]/page.tsx`
4. **`scripts/seo/build-weekly-digest.ts`** — assembles the three reports into
   `.reports/weekly-digest.md`. Includes ready-to-paste Cursor prompts for
   title rewrites (low-CTR pages) and meta-description rewrites (pages with
   impressions but zero clicks).
5. The workflow opens a GitHub issue with that markdown as the body (labels:
   `seo`, `digest`) and uploads the JSON reports as a workflow artifact for
   30 days.
6. **`scripts/seo/email-digest.ts`** _(optional)_ — if `RESEND_API_KEY` and
   `REPORT_EMAIL` are set, also emails the digest. No-ops silently when either
   secret is missing, so the step is always safe to run.

## What it does NOT do (and why)

| Deliberately omitted | Reason |
|---|---|
| Auto-generating new blog posts | AI-generated bulk content is what put Georgetown Home Services into "Discovered – currently not indexed" in the first place. More auto-content makes the problem worse. |
| Calling the Google Indexing API | [Google's Indexing API](https://developers.google.com/search/apis/indexing-api/v3/quickstart) officially supports only `JobPosting` and `BroadcastEvent` schema. Submitting directory URLs returns 200 but Google does not crawl/index them. |
| Auto-opening PRs with title / content rewrites | High blast radius if a change is wrong. The issue lists specific pages + a ready-to-paste Cursor prompt so you can generate the fix, review it, and ship it. |
| Auto-bumping `dateModified` without an actual content change | Google's helpful-content signals include detecting "date-bumping with no real update". Don't do it. |

## Required GitHub secrets

| Secret | Value |
|---|---|
| `GSC_SERVICE_ACCOUNT_KEY` | Full JSON contents of a Google Cloud service-account key with Search Console read access. |
| `GSC_SITE_URL` | Either `sc-domain:georgetownhomeservices.com` (Domain property) or `https://www.georgetownhomeservices.com/` (URL-prefix property). Must match exactly what GSC shows. |

`GITHUB_TOKEN` is provided automatically by Actions.

## Optional GitHub secrets (email delivery)

| Secret | Value |
|---|---|
| `RESEND_API_KEY` | API key from [resend.com](https://resend.com). Free tier is enough. |
| `REPORT_EMAIL` | Destination email address for the weekly digest. |
| `REPORT_FROM` | Sender address. Defaults to `onboarding@resend.dev`, which works without any domain setup. Once you've verified `georgetownhomeservices.com` in Resend, set this to e.g. `seo@georgetownhomeservices.com`. |

When any of these are absent, the email step logs a one-line "skipping" message and exits 0 — it never breaks the workflow.

## One-time GSC service-account setup

1. **Google Cloud Console** → create a new service account (e.g.
   `seo-reader@<project>.iam.gserviceaccount.com`). Skip granting any project
   roles — this account needs no GCP permissions, only GSC access.
2. Enable the **Google Search Console API** for the project: APIs & Services
   → Library → search "Search Console API" → Enable.
3. Service Accounts → your new account → Keys → Add Key → JSON. A JSON file
   downloads. This is the value for `GSC_SERVICE_ACCOUNT_KEY`.
4. **Search Console** → Settings → Users and permissions → Add User → paste
   the service-account email → grant `Full` (or `Restricted` with read-only
   scope). Wait ~1 minute for propagation.
5. Add both secrets in **GitHub → Settings → Secrets and variables → Actions**:
   - `GSC_SERVICE_ACCOUNT_KEY`: paste the entire JSON key file contents,
     including the outer `{ ... }`. GitHub handles multi-line secrets.
   - `GSC_SITE_URL`: the property identifier (see above).

## Running locally

```bash
# Requires the two env vars above — put them in a .env (gitignored) and source it.
export GSC_SERVICE_ACCOUNT_KEY="$(cat path/to/your-key.json)"
export GSC_SITE_URL="sc-domain:georgetownhomeservices.com"

npm run seo:pull      # pull GSC data → .reports/gsc.json
npm run seo:audit     # content health → .reports/content-health.json
npm run seo:freshness # freshness → .reports/freshness.json
npm run seo:digest    # build .reports/weekly-digest.md from the three above
npm run seo:email     # (optional) email the digest via Resend

# Or all four in sequence (email not included — run it separately):
npm run seo:all
```

Open `.reports/weekly-digest.md` to preview the issue body that CI would post.

If you skip `npm run seo:pull` (e.g. no GSC auth set up locally), the digest
still builds — the GSC section shows a "no data" note and the other two
sections work as normal.

## Companion workflow: thin-content consolidation + noindex

The audit only _surfaces_ thin pages. Acting on them is a separate three-phase
workflow, run ad-hoc when GSC indexation or AdSense quality flags require it:

### Phase 1 — Consolidate near-duplicate clusters (308 redirects)

When several thin pages cover the same trade with overlapping content, redirect
them to a single trade hub instead of trying to rewrite each.

```bash
npm run seo:propose            # writes .reports/consolidation-proposal.md
# Review the proposal, decide which clusters to apply, then edit:
#   scripts/seo/consolidation-spec.ts  (one Merge entry per approved cluster)
npm run seo:consolidate:patch  # writes .reports/consolidation-patch.md
# Copy the redirect block into next.config.ts and the slug-set block into
# lib/public-site-scope.ts. The patch generator does not mutate code itself.
```

The Phase 1 application: 22 service URLs (87–142 words each) collapsed
into `/services/{roofer,hvac,plumber}-georgetown-tx`. The applied merges are
recorded in `scripts/seo/consolidation-spec.ts` as the canonical history.

### Phase 2 — Noindex what cannot be consolidated yet

For thin pages with no consolidation target (best-of pages, isolated services,
thin blog posts), add the slug to `NOINDEX_SLUGS` in
`lib/public-site-scope.ts`. Effect:

- the page renders with `<meta name="robots" content="noindex,follow">` via
  `pageSeoMetadata({ noindex: true })`
- the page is omitted from `sitemap.xml`
- Google drops the URL from the "Discovered – currently not indexed" queue
  on the next crawl
- internal links keep flowing crawl signal to indexable hubs (because of
  `follow`), so the rest of the site is unaffected

Inclusion rules (also documented in the doc-comment on `NOINDEX_SLUGS`):

1. The slug appears as `thin:` in `.reports/content-health.json`.
2. The slug is **not** in `REDIRECTED_SERVICE_SLUGS` (a redirect supersedes
   noindex; chaining the two is wasteful).
3. The slug is **not** a consolidation hub (`roofer-georgetown-tx`,
   `hvac-georgetown-tx`, `plumber-georgetown-tx`, `georgetown-tx`).
4. The slug is **not** in `COST_POST_SUPPLEMENTS` (those pages have pricing
   injected at render time that the static word-count audit cannot see).

Remove the slug the moment its content is rewritten past the threshold, then
resubmit via Search Console URL Inspection.

### Phase 3 — Substantively rewrite the surviving hubs

After Phases 1 + 2 the thin-page count drops sharply, but the consolidation
targets now carry the load. They have to earn it: aim for ~1,500 words of
Georgetown-specific content (price ranges from `lib/pricing-data.ts`,
neighborhood considerations, local code references). AI-assisted drafting is
fine; AI-without-edit is what triggered the AdSense rejection in the first
place.

## Extending the pipeline

- **Weekly trends deeper than 28 days**: modify `WINDOW_DAYS` in
  `pull-gsc-data.ts`.
- **Different low-CTR threshold**: update `LOW_CTR_THRESHOLD` and
  `LOW_CTR_MIN_IMPRESSIONS` in the same file.
- **Adding per-slug `dateModified`** so freshness is precise per post: add
  `datePublished`/`dateModified` fields to each blog post in the `overrides`
  map in `app/blog/[slug]/page.tsx`. The freshness audit detects the pattern
  automatically.
- **Claude-drafted title options in the digest**: the digest currently points
  at a Cursor prompt instead of calling the API. If you want to wire it up,
  `@anthropic-ai/sdk` is already installed — add an `ANTHROPIC_API_KEY` secret
  and an optional step to `build-weekly-digest.ts` that calls
  `messages.create` per low-CTR target. Keep it optional so the pipeline stays
  functional when the key is absent.
