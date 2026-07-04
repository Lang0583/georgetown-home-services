/**
 * Permanent 301 sources for consolidated neighborhood URLs.
 * `next.config.ts` builds redirects from these lists — keep in sync with internal links.
 */

export const NEIGHBORHOOD_AREA_SLUGS = [
  "sun-city",
  "teravista",
  "wolf-ranch",
  "berry-creek",
  "georgetown-village",
] as const;

export type NeighborhoodAreaSlug = (typeof NEIGHBORHOOD_AREA_SLUGS)[number];

/** Route segment under `/neighborhoods/[area]/[service]` (retired — redirects to home-services hub). */
export const NEIGHBORHOOD_SERVICE_SLUGS = [
  "plumber",
  "hvac",
  "roofer",
  "electrician",
  "landscaping",
  "pest-control",
  "foundation-repair",
  "house-cleaning",
] as const;

export type NeighborhoodServiceSlug = (typeof NEIGHBORHOOD_SERVICE_SLUGS)[number];

export const NEIGHBORHOOD_AREAS: ReadonlyArray<{ slug: NeighborhoodAreaSlug; name: string }> = [
  { slug: "sun-city", name: "Sun City" },
  { slug: "teravista", name: "Teravista" },
  { slug: "wolf-ranch", name: "Wolf Ranch" },
  { slug: "berry-creek", name: "Berry Creek" },
  { slug: "georgetown-village", name: "Georgetown Village" },
];

/** Merged neighborhood hail blogs → county pillar (optional hash for in-page section). */
export const REDIRECTED_HAIL_BLOG_TO_PILLAR: Readonly<
  Record<string, { slug: string; hash?: string }>
> = {
  "hail-damage-sun-city-georgetown-tx": { slug: "hail-damage-georgetown-williamson-may-2026", hash: "sun-city" },
  "hail-damage-teravista-georgetown-tx": {
    slug: "hail-damage-georgetown-williamson-may-2026",
    hash: "teravista",
  },
  "hail-damage-wolf-ranch-georgetown-tx": {
    slug: "hail-damage-georgetown-williamson-may-2026",
    hash: "wolf-ranch",
  },
  "hail-damage-georgetown-village-tx": {
    slug: "hail-damage-georgetown-williamson-may-2026",
    hash: "georgetown-village",
  },
};

export function neighborhoodServiceToHubRedirects(): {
  source: string;
  destination: string;
  permanent: true;
}[] {
  return NEIGHBORHOOD_AREA_SLUGS.flatMap((neighborhood) =>
    NEIGHBORHOOD_SERVICE_SLUGS.map((service) => ({
      source: `/neighborhoods/${neighborhood}/${service}`,
      destination: `/neighborhoods/${neighborhood}/home-services`,
      permanent: true as const,
    })),
  );
}

export function hailBlogToPillarRedirects(): {
  source: string;
  destination: string;
  permanent: true;
}[] {
  return Object.entries(REDIRECTED_HAIL_BLOG_TO_PILLAR).map(([from, { slug, hash }]) => ({
    source: `/blog/${from}`,
    destination: `/blog/${slug}${hash ? `#${hash}` : ""}`,
    permanent: true as const,
  }));
}

/** Full redirect list for audits and release notes. */
export function allNeighborhoodConsolidationRedirects(): { source: string; destination: string }[] {
  return [...neighborhoodServiceToHubRedirects(), ...hailBlogToPillarRedirects()].map(
    ({ source, destination }) => ({ source, destination }),
  );
}
