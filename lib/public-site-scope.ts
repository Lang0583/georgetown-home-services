import type { ProviderGroup } from "./businesses";

/**
 * Extended trades beyond plumbing / HVAC / roofing.
 *
 * Enabled by default so every best-of page in the sitemap has matching service pages,
 * internal links, and directory listings — avoiding the "Discovered – currently not
 * indexed" pattern that results when sitemap entries are orphaned from the main nav.
 *
 * Set `NEXT_PUBLIC_SHOW_EXTENDED_HOME_SERVICES=false` to revert to a core-3 layout.
 */
export const EXTENDED_PROVIDER_GROUPS: readonly ProviderGroup[] = [
  "electrician",
  "landscaping",
  "pest_control",
  "foundation_repair",
  "house_cleaning",
] as const;

const EXTENDED_SERVICE_SLUGS = new Set([
  "electrician-georgetown-tx",
  "landscaping-georgetown-tx",
  "pest-control-georgetown-tx",
  "foundation-repair-georgetown-tx",
  "house-cleaning-georgetown-tx",
]);

const EXTENDED_BEST_SLUGS = new Set([
  "best-electricians-georgetown-tx",
  "best-landscaping-companies-georgetown-tx",
  "best-pest-control-georgetown-tx",
  "best-foundation-repair-georgetown-tx",
  "best-house-cleaning-services-georgetown-tx",
]);

/**
 * Service slugs that 308 to a canonical hub in `next.config.ts`.
 * Listed here so sitemap/internal-link/static-params code can exclude them
 * and not ship orphan/redirecting URLs to crawlers.
 *
 * Two reasons a service slug ends up here:
 *
 *   1. Neighborhood-specific near-duplicate of a parent service
 *      (e.g. `plumber-sun-city-georgetown-tx` → `/services/plumber-georgetown-tx`).
 *   2. Thin-content consolidation (Phase 1 of AdSense / "Discovered – currently
 *      not indexed" remediation): multiple under-200-word service variants
 *      collapsed into the trade hub. See `scripts/seo/propose-consolidation.ts`
 *      and `docs/seo-pipeline.md` for the rationale.
 */
export const REDIRECTED_SERVICE_SLUGS = new Set([
  // Neighborhood near-duplicates (predates the AdSense work):
  "plumber-sun-city-georgetown-tx",
  "hvac-wolf-ranch-georgetown-tx",
  "roofer-berry-creek-georgetown-tx",

  // Roofing thin-content consolidation → /services/roofer-georgetown-tx
  "roof-repair-georgetown-tx",
  "roof-replacement-georgetown-tx",
  "shingle-roof-repair-georgetown-tx",
  "flashing-repair-georgetown-tx",
  "gutter-installation-georgetown-tx",
  "storm-damage-roof-repair-georgetown-tx",
  "hail-damage-roof-repair-georgetown-tx",
  "emergency-roof-tarping-georgetown-tx",

  // HVAC thin-content consolidation → /services/hvac-georgetown-tx
  "ac-repair-georgetown-tx",
  "ac-replacement-georgetown-tx",
  "furnace-repair-georgetown-tx",
  "heater-repair-georgetown-tx",
  "hvac-maintenance-georgetown-tx",
  "ductwork-repair-georgetown-tx",
  "thermostat-repair-georgetown-tx",
  "indoor-air-quality-georgetown-tx",

  // Plumbing thin-content consolidation → /services/plumber-georgetown-tx
  "water-heater-replacement-georgetown-tx",
  "leak-detection-georgetown-tx",
  "toilet-repair-georgetown-tx",
  "garbage-disposal-repair-georgetown-tx",
  "sewer-line-repair-georgetown-tx",
  "emergency-plumber-georgetown-tx",
]);

export const REDIRECTED_LOCATION_SLUGS = new Set([
  "sun-city-georgetown-tx",
  "wolf-ranch-georgetown-tx",
  "berry-creek-georgetown-tx",
]);

export function isRedirectedServiceSlug(slug: string): boolean {
  return REDIRECTED_SERVICE_SLUGS.has(slug);
}

export function isRedirectedLocationSlug(slug: string): boolean {
  return REDIRECTED_LOCATION_SLUGS.has(slug);
}

/**
 * Slugs that should render with `<meta name="robots" content="noindex">`.
 *
 * Phase 2 of AdSense / indexation remediation: pages flagged thin in the
 * weekly content-health audit that have no consolidation target. We hide them
 * from Google until they are substantively rewritten.
 *
 * Rules used to populate this list (see `scripts/seo/audit-content-health.ts`):
 *   - The slug appears in `.reports/content-health.json` with a `thin:` flag.
 *   - The slug is NOT in `REDIRECTED_SERVICE_SLUGS` (a redirect supersedes
 *     noindex).
 *   - The slug is NOT a consolidation HUB (`roofer-georgetown-tx`,
 *     `hvac-georgetown-tx`, `plumber-georgetown-tx`, `georgetown-tx` location).
 *     Those pages must remain indexable as the redirect destinations.
 *   - The slug is NOT a cost guide that gets a `BlogCostSupplement` injected
 *     at render time (see `lib/pricing-data.ts` `COST_POST_SUPPLEMENTS`) —
 *     those have real pricing the audit's static word-count cannot see.
 *
 * Remove a slug from this set the moment its content is rewritten to clear
 * the thin-content threshold (~800 words for blog/service, ~500 for best/
 * location). Then resubmit the URL via Search Console URL Inspection.
 *
 * Regenerating: run `npm run seo:audit` and reconcile against the audit
 * output. There is no auto-update script — this file is the human-curated
 * source of truth.
 */
export const NOINDEX_SLUGS = new Set([
  // Blog posts (thin, no consolidation target, not in COST_POST_SUPPLEMENTS):
  "ac-not-cooling-georgetown-tx",
  "how-to-find-a-good-plumber-georgetown-tx",

  // Service pages (thin, not in any cluster, not a hub):
  "house-cleaning-georgetown-tx",
  "pest-control-georgetown-tx",
  "landscaping-georgetown-tx",
  "foundation-repair-georgetown-tx",
  "electrician-georgetown-tx",
  "clogged-drain-georgetown-tx",
  "roof-leak-repair-georgetown-tx",
  "slab-leak-repair-georgetown-tx",
  "emergency-hvac-georgetown-tx",
  "drain-cleaning-georgetown-tx",

  // Best-of pages (thin, no consolidation target available):
  "best-pest-control-georgetown-tx",
  "best-house-cleaning-services-georgetown-tx",
  "best-landscaping-companies-georgetown-tx",
  "best-foundation-repair-georgetown-tx",
  "best-electricians-georgetown-tx",
  "best-roofers-georgetown-tx",
  "top-hvac-companies-georgetown-tx",
]);

export function isNoindexSlug(slug: string): boolean {
  return NOINDEX_SLUGS.has(slug);
}

export function showExtendedHomeServices(): boolean {
  return process.env.NEXT_PUBLIC_SHOW_EXTENDED_HOME_SERVICES !== "false";
}

export function isExtendedProviderGroup(group: ProviderGroup): boolean {
  return (EXTENDED_PROVIDER_GROUPS as readonly string[]).includes(group);
}

export function isExtendedServiceSlug(slug: string): boolean {
  return EXTENDED_SERVICE_SLUGS.has(slug);
}

export function isExtendedBestSlug(slug: string): boolean {
  return EXTENDED_BEST_SLUGS.has(slug);
}

/** Hide placeholder directory rows + ItemList schema for extended categories until you opt in. */
export function shouldShowExtendedDirectoryListings(): boolean {
  return showExtendedHomeServices();
}
