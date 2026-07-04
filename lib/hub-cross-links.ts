/**
 * Canonical cross-links between core service guides, best-of directories,
 * neighborhood home-services hubs, and the pricing hub.
 */

import { NEIGHBORHOOD_AREAS } from "./neighborhood-redirects";
import { CORE_BEST_SLUGS, CORE_SERVICE_SLUGS } from "./pageContentRegistry";
import type { InternalLink } from "./internal-links";
import { getBestBySlug, getServiceBySlug } from "./site-content";

export const PRICING_HUB_PATH = "/pricing" as const;

export const PRICING_HUB_LINK: InternalLink = {
  href: PRICING_HUB_PATH,
  label: "Georgetown home services pricing",
  description: "Planning ranges and interactive estimator for plumbing, HVAC, roofing, and more.",
};

/** All five neighborhood home-services hub URLs. */
export function neighborhoodHomeServicesHubLinks(): InternalLink[] {
  return NEIGHBORHOOD_AREAS.map(({ slug, name }) => ({
    href: `/neighborhoods/${slug}/home-services`,
    label: `${name} home services`,
    description: `Plumber, HVAC, and roofing context for ${name}—planning ranges, FAQs, and directories.`,
  }));
}

const SERVICE_TO_BEST: Record<(typeof CORE_SERVICE_SLUGS)[number], (typeof CORE_BEST_SLUGS)[number]> = {
  "plumber-georgetown-tx": "best-plumbers-georgetown-tx",
  "hvac-georgetown-tx": "top-hvac-companies-georgetown-tx",
  "roofer-georgetown-tx": "best-roofers-georgetown-tx",
  "electrician-georgetown-tx": "best-electricians-georgetown-tx",
  "landscaping-georgetown-tx": "best-landscaping-companies-georgetown-tx",
  "pest-control-georgetown-tx": "best-pest-control-georgetown-tx",
  "foundation-repair-georgetown-tx": "best-foundation-repair-georgetown-tx",
  "house-cleaning-georgetown-tx": "best-house-cleaning-services-georgetown-tx",
};

/** Eight core service guide links (for neighborhood hub “all services” row). */
export function coreServiceGuideLinks(): InternalLink[] {
  return CORE_SERVICE_SLUGS.map((slug) => {
    const service = getServiceBySlug(slug);
    return {
      href: `/services/${slug}`,
      label: service?.title ?? slug,
      description: service?.description,
    };
  });
}

/** Related links for a core `/services/[slug]` page. */
export function servicePageRelatedHubLinks(serviceSlug: string): InternalLink[] | null {
  if (!(CORE_SERVICE_SLUGS as readonly string[]).includes(serviceSlug)) return null;

  const bestSlug = SERVICE_TO_BEST[serviceSlug as (typeof CORE_SERVICE_SLUGS)[number]];
  const best = getBestBySlug(bestSlug);
  const links: InternalLink[] = [];

  if (best) {
    links.push({
      href: `/best/${best.slug}`,
      label: best.title,
      description: best.description,
    });
  }

  links.push(PRICING_HUB_LINK);
  links.push(...neighborhoodHomeServicesHubLinks());

  return links;
}

/** Related links for a core `/best/[slug]` page. */
export function bestPageRelatedHubLinks(bestSlug: string): InternalLink[] | null {
  if (!(CORE_BEST_SLUGS as readonly string[]).includes(bestSlug)) return null;

  const serviceSlug = Object.entries(SERVICE_TO_BEST).find(([, b]) => b === bestSlug)?.[0];
  if (!serviceSlug) return null;

  const service = getServiceBySlug(serviceSlug);
  const links: InternalLink[] = [];

  if (service) {
    links.push({
      href: `/services/${service.slug}`,
      label: service.title,
      description: service.description,
    });
  }

  links.push(PRICING_HUB_LINK);

  return links;
}

/** Neighborhood hub: all eight service guides + pricing. */
export function neighborhoodHubCrossLinks(): InternalLink[] {
  return [...coreServiceGuideLinks(), PRICING_HUB_LINK];
}
