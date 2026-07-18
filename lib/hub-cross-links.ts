/**
 * Thin compatibility layer — trade-cluster linking lives in `lib/internalLinks.ts`.
 */

import { NEIGHBORHOOD_AREAS } from "./neighborhood-redirects";
import { CORE_SERVICE_SLUGS } from "./pageContentRegistry";
import type { InternalLink } from "./internal-links";
import {
  linksForBestOf,
  linksForNeighborhood,
  linksForService,
  routeExists,
} from "./internalLinks";
import { getServiceBySlug } from "./site-content";

export const PRICING_HUB_PATH = "/pricing" as const;

export const PRICING_HUB_LINK: InternalLink = {
  href: PRICING_HUB_PATH,
  label: "Georgetown home services pricing",
  description: "Planning ranges and interactive estimator for plumbing, HVAC, roofing, and more.",
};

/** All five neighborhood home-services hub URLs. */
export function neighborhoodHomeServicesHubLinks(): InternalLink[] {
  return NEIGHBORHOOD_AREAS.map(({ slug, name }) => {
    const href = `/neighborhoods/${slug}/home-services`;
    return {
      href,
      label: `${name} home services`,
      description: `Plumber, HVAC, and roofing context for ${name}—planning ranges, FAQs, and directories.`,
    };
  }).filter((l) => routeExists(l.href));
}

/** Eight core service guide links (for neighborhood hub “all services” row). */
export function coreServiceGuideLinks(): InternalLink[] {
  return CORE_SERVICE_SLUGS.map((slug) => {
    const service = getServiceBySlug(slug);
    return {
      href: `/services/${slug}`,
      label: service?.title ?? slug,
      description: service?.description,
    };
  }).filter((l) => routeExists(l.href));
}

/** Related links for a core `/services/[slug]` page (Best Of + cost guide). */
export function servicePageRelatedHubLinks(serviceSlug: string): InternalLink[] | null {
  const links = linksForService(serviceSlug);
  return links.length ? links : null;
}

/** Related links for a core `/best/[slug]` page (service, cost, compare, neighborhoods). */
export function bestPageRelatedHubLinks(bestSlug: string): InternalLink[] | null {
  const links = linksForBestOf(bestSlug);
  return links.length ? links : null;
}

/** Neighborhood hub: parent service + Best Of for plumbing, HVAC, and roofing. */
export function neighborhoodHubCrossLinks(neighborhoodSlug?: string): InternalLink[] {
  if (neighborhoodSlug) {
    return linksForNeighborhood(neighborhoodSlug, "home-services");
  }
  return [...coreServiceGuideLinks(), PRICING_HUB_LINK].filter((l) => routeExists(l.href));
}
