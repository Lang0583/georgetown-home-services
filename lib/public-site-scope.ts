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
 * Service slugs that 308 to a trade hub. This map is the single source of truth:
 * `next.config.ts` builds redirects from it so definitions and internal links
 * cannot drift. Use {@link canonicalServicePathForLinks} in components when
 * emitting `/services/...` URLs so crawlers see one hop to the hub.
 */
export const REDIRECTED_SERVICE_TO_HUB: Readonly<Record<string, string>> = {
  // Neighborhood near-duplicates
  "plumber-sun-city-georgetown-tx": "plumber-georgetown-tx",
  "hvac-wolf-ranch-georgetown-tx": "hvac-georgetown-tx",
  "roofer-berry-creek-georgetown-tx": "roofer-georgetown-tx",

  // Roofing → hub
  "roof-repair-georgetown-tx": "roofer-georgetown-tx",
  "roof-replacement-georgetown-tx": "roofer-georgetown-tx",
  "shingle-roof-repair-georgetown-tx": "roofer-georgetown-tx",
  "flashing-repair-georgetown-tx": "roofer-georgetown-tx",
  "gutter-installation-georgetown-tx": "roofer-georgetown-tx",
  "storm-damage-roof-repair-georgetown-tx": "roofer-georgetown-tx",
  "hail-damage-roof-repair-georgetown-tx": "roofer-georgetown-tx",
  "emergency-roof-tarping-georgetown-tx": "roofer-georgetown-tx",
  "roof-leak-repair-georgetown-tx": "roofer-georgetown-tx",

  // HVAC → hub
  "ac-repair-georgetown-tx": "hvac-georgetown-tx",
  "ac-replacement-georgetown-tx": "hvac-georgetown-tx",
  "furnace-repair-georgetown-tx": "hvac-georgetown-tx",
  "heater-repair-georgetown-tx": "hvac-georgetown-tx",
  "hvac-maintenance-georgetown-tx": "hvac-georgetown-tx",
  "ductwork-repair-georgetown-tx": "hvac-georgetown-tx",
  "thermostat-repair-georgetown-tx": "hvac-georgetown-tx",
  "indoor-air-quality-georgetown-tx": "hvac-georgetown-tx",
  "ac-not-cooling-georgetown-tx": "hvac-georgetown-tx",
  "emergency-hvac-georgetown-tx": "hvac-georgetown-tx",

  // Plumbing → hub
  "water-heater-replacement-georgetown-tx": "plumber-georgetown-tx",
  "leak-detection-georgetown-tx": "plumber-georgetown-tx",
  "toilet-repair-georgetown-tx": "plumber-georgetown-tx",
  "garbage-disposal-repair-georgetown-tx": "plumber-georgetown-tx",
  "sewer-line-repair-georgetown-tx": "plumber-georgetown-tx",
  "emergency-plumber-georgetown-tx": "plumber-georgetown-tx",
  "clogged-drain-georgetown-tx": "plumber-georgetown-tx",
  "drain-cleaning-georgetown-tx": "plumber-georgetown-tx",
  "slab-leak-repair-georgetown-tx": "plumber-georgetown-tx",
};

export const REDIRECTED_SERVICE_SLUGS = new Set(Object.keys(REDIRECTED_SERVICE_TO_HUB));

export function canonicalServiceSlugForLinks(slug: string): string {
  return REDIRECTED_SERVICE_TO_HUB[slug] ?? slug;
}

/** Rewrite `/services/{slug}` to the hub when this slug only exists to 308. */
export function canonicalServicePathForLinks(href: string): string {
  if (!href.startsWith("/services/")) return href;
  const pathOnly = href.split("?")[0]?.split("#")[0] ?? href;
  const rest = pathOnly.slice("/services/".length);
  const slug = rest.split("/")[0] ?? "";
  if (!slug) return href;
  const canon = canonicalServiceSlugForLinks(slug);
  if (canon === slug) return href;
  return href.replace(`/services/${slug}`, `/services/${canon}`);
}

/** Location slugs that 308 elsewhere — keep in sync with `next.config.ts`. */
export const REDIRECTED_LOCATION_SLUGS = new Set<string>([]);

/**
 * Blog slugs removed from CMS that still 308 in `next.config.ts`. Empty when
 * every post lives only at its canonical URL in `site-content.json`.
 */
export const REDIRECTED_BLOG_SLUGS = new Set<string>([]);

export function isRedirectedServiceSlug(slug: string): boolean {
  return REDIRECTED_SERVICE_SLUGS.has(slug);
}

export function isRedirectedLocationSlug(slug: string): boolean {
  return REDIRECTED_LOCATION_SLUGS.has(slug);
}

export function isRedirectedBlogSlug(slug: string): boolean {
  return REDIRECTED_BLOG_SLUGS.has(slug);
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
export const NOINDEX_SLUGS = new Set<string>();

export function isNoindexSlug(slug: string): boolean {
  return NOINDEX_SLUGS.has(slug);
}

export function showExtendedHomeServices(): boolean {
  return process.env.NEXT_PUBLIC_SHOW_EXTENDED_HOME_SERVICES !== "false";
}

export function isExtendedServiceSlug(slug: string): boolean {
  return EXTENDED_SERVICE_SLUGS.has(slug);
}

export function isExtendedBestSlug(slug: string): boolean {
  return EXTENDED_BEST_SLUGS.has(slug);
}
