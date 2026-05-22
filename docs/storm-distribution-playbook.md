# Georgetown Home Services — storm season distribution playbook

When you materially update hail/storm pillar content, pairing **technical signals** with **calm off-site amplification** avoids thin URLs and reinforces the evergreen hubs you already invest in.

## Google Search Console (weekly during surge weeks)

1. Add a filter for queries containing **`hail`**, **`storm`**, **`roof inspection`**, **`Georgetown`**, **`Williamson`**, **`insurance`**.
2. Sort by impressions; look for mismatches (**high impressions / low CTR**).
3. Tighten **title + meta description first** on the exact URL seeing volume—`/services/roofing`, `/blog/hail-damage-georgetown-williamson-may-2026`, or a `/neighborhoods/.../hail-damage` page—rather than spawning new URLs.
4. Watch **crawl anomalies** once you tweak metadata; spikes are diagnostic, not always actionable.

## Indexation / recrawl

**Typical high-value paths after an editorial surge** — prefix with canonical `SITE_URL` when firing Indexing API or IndexNow:

- `/`
- `/services/roofing`
- `/blog/hail-damage-georgetown-williamson-may-2026`
- `/neighborhoods/sun-city/hail-damage`
- `/neighborhoods/teravista/hail-damage`
- `/neighborhoods/wolf-ranch/hail-damage`
- `/neighborhoods/georgetown-village/hail-damage`

Workflow:

1. Prefer **focused lists** tied to URLs that genuinely changed (`/services/roofing`, Williamson hail pillar, touched neighborhood hubs).
2. Use whichever production process you maintain:
   - `scripts/submit-to-indexing-api.ts` (Google Indexing API for `URL_UPDATED`) — service account key + verified property.
   - `scripts/submit-indexnow.ts` — IndexNow-compatible endpoints.
3. **Do not shotgun** unchanged URLs; spamming pings adds risk without meaningful crawl budget gains.

## Local surfaces (trust-forward tone)

**Google Business Profile:** one succinct post—“Williamson hail/wind recurrence; doc soft metals + timelines; Georgetown planning hub”—link to `/roofing` or the county hail pillar, **no guarantees** about coverage or timelines.

**Nextdoor / HOA boards:** factual checklists only; cite the same internal guides; avoid solicitation stack.

## Email subscribers (optional)

Reuse restrained framing: documentation order first, HOA/insurance parallelism, anchor links—not fear-led copy.
