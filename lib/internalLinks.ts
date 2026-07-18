/**
 * Trade-keyed internal linking for Best Of → service → cost → neighborhood → provider equity.
 * Only emits links to routes that exist in site data. Gaps accumulate in {@link getInternalLinkGaps}.
 */

import { costGuidePages } from "@/data/cost-guides";
import { COMPARISON_SLUGS, getComparisonsByCategory } from "@/data/comparisons";
import { NEIGHBORHOOD_HOME_SERVICES_HUBS } from "@/data/neighborhood-home-services-hubs";
import { NEIGHBORHOOD_HAIL_PAGES } from "@/data/neighborhood-hail-pages";
import {
  CATEGORY_TO_BEST_SLUG,
  PROVIDERS,
  getBestSlugForCategory,
  getProviderBySlug,
  slugifyProviderName,
  type Provider,
  type ProviderCategory,
} from "@/data/providers";
import { CORE_BEST_SLUGS, CORE_SERVICE_SLUGS } from "@/lib/pageContentRegistry";
import { NEIGHBORHOOD_AREAS } from "@/lib/neighborhood-redirects";
import { getBestBySlug, getServiceBySlug } from "@/lib/site-content";
import type { InternalLink } from "@/lib/internal-links";

export type { InternalLink };

export type InternalLinkGap = {
  context: string;
  target: string;
  reason: string;
};

const gaps: InternalLinkGap[] = [];

function noteGap(context: string, target: string, reason: string) {
  if (gaps.some((g) => g.context === context && g.target === target)) return;
  gaps.push({ context, target, reason });
}

/** Snapshot of missing targets discovered while building link sets. */
export function getInternalLinkGaps(): readonly InternalLinkGap[] {
  return gaps;
}

export function clearInternalLinkGapsForTests() {
  gaps.length = 0;
}

/**
 * Walk every trade cluster surface and return targets that could not be linked.
 * Safe to call from scripts or build-time diagnostics.
 */
export function reportInternalLinkGaps(): InternalLinkGap[] {
  clearInternalLinkGapsForTests();
  for (const slug of CORE_BEST_SLUGS) linksForBestOf(slug);
  for (const slug of CORE_SERVICE_SLUGS) linksForService(slug);
  for (const guide of costGuidePages) linksForCostGuide(guide.slug);
  for (const hub of NEIGHBORHOOD_HOME_SERVICES_HUBS) {
    linksForNeighborhood(hub.neighborhoodSlug, "home-services");
  }
  for (const page of NEIGHBORHOOD_HAIL_PAGES) {
    linksForNeighborhood(page.neighborhoodSlug, "hail-damage");
  }
  return [...gaps];
}

/** Known indexable pathnames (no trailing slash except `/`). */
const EXISTING_ROUTES: ReadonlySet<string> = (() => {
  const routes = new Set<string>(["/", "/best", "/services", "/costs", "/compare", "/pricing"]);

  for (const slug of CORE_SERVICE_SLUGS) routes.add(`/services/${slug}`);
  for (const slug of CORE_BEST_SLUGS) routes.add(`/best/${slug}`);
  for (const hub of ["/services/plumbing", "/services/hvac", "/services/roofing", "/services/electrical", "/services/landscaping", "/services/pest-control", "/services/foundation", "/services/house-cleaning"]) {
    routes.add(hub);
  }
  for (const g of costGuidePages) routes.add(`/costs/${g.slug}`);
  for (const slug of COMPARISON_SLUGS) routes.add(`/compare/${slug}`);
  for (const hub of NEIGHBORHOOD_HOME_SERVICES_HUBS) {
    routes.add(`/neighborhoods/${hub.neighborhoodSlug}/home-services`);
  }
  for (const p of NEIGHBORHOOD_HAIL_PAGES) {
    routes.add(`/neighborhoods/${p.neighborhoodSlug}/hail-damage`);
  }
  for (const p of PROVIDERS) {
    routes.add(`/providers/${slugifyProviderName(p.name)}`);
  }
  return routes;
})();

export function routeExists(pathname: string): boolean {
  let p = pathname.trim();
  if (!p.startsWith("/")) p = `/${p}`;
  if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
  return EXISTING_ROUTES.has(p);
}

function pushLink(
  out: InternalLink[],
  context: string,
  href: string,
  label: string,
  description: string | undefined,
  required: boolean,
) {
  if (routeExists(href)) {
    if (!out.some((l) => l.href === href)) {
      out.push({ href, label, description });
    }
    return;
  }
  if (required) noteGap(context, href, "route not in site inventory");
}

/** Primary (featured) cost guide per trade — one hub link for equity. */
const PRIMARY_COST_GUIDE_BY_CATEGORY: Record<ProviderCategory, string> = {
  plumbing: "plumber-cost-georgetown-tx",
  hvac: "hvac-repair-cost-georgetown-tx",
  roofing: "roof-replacement-cost-georgetown-tx",
  electrical: "electrician-cost-georgetown-tx",
  landscaping: "landscaping-cost-georgetown-tx",
  "pest-control": "pest-control-cost-georgetown-tx",
  foundation: "foundation-repair-cost-georgetown-tx",
  cleaning: "house-cleaning-cost-georgetown-tx",
};

const SERVICE_SLUG_BY_CATEGORY: Record<ProviderCategory, (typeof CORE_SERVICE_SLUGS)[number]> = {
  plumbing: "plumber-georgetown-tx",
  hvac: "hvac-georgetown-tx",
  roofing: "roofer-georgetown-tx",
  electrical: "electrician-georgetown-tx",
  landscaping: "landscaping-georgetown-tx",
  "pest-control": "pest-control-georgetown-tx",
  foundation: "foundation-repair-georgetown-tx",
  cleaning: "house-cleaning-georgetown-tx",
};

const CATEGORY_BY_SERVICE_SLUG: Record<string, ProviderCategory> = Object.fromEntries(
  Object.entries(SERVICE_SLUG_BY_CATEGORY).map(([cat, slug]) => [slug, cat as ProviderCategory]),
) as Record<string, ProviderCategory>;

const CATEGORY_BY_BEST_SLUG: Record<string, ProviderCategory> = Object.fromEntries(
  Object.entries(CATEGORY_TO_BEST_SLUG).map(([cat, slug]) => [slug, cat as ProviderCategory]),
) as Record<string, ProviderCategory>;

const CATEGORY_BY_COST_SLUG: Record<string, ProviderCategory> = (() => {
  const map: Record<string, ProviderCategory> = {};
  for (const [cat, slug] of Object.entries(PRIMARY_COST_GUIDE_BY_CATEGORY)) {
    map[slug] = cat as ProviderCategory;
  }
  // Secondary guides → same trade
  const extras: Record<string, ProviderCategory> = {
    "ac-installation-cost-georgetown-tx": "hvac",
    "hvac-maintenance-cost-georgetown-tx": "hvac",
    "roof-repair-cost-georgetown-tx": "roofing",
    "panel-upgrade-cost-georgetown-tx": "electrical",
    "lawn-care-cost-georgetown-tx": "landscaping",
    "termite-treatment-cost-georgetown-tx": "pest-control",
    "water-heater-installation-cost-georgetown-tx": "plumbing",
    "drain-cleaning-cost-georgetown-tx": "plumbing",
  };
  return { ...map, ...extras };
})();

export type TradeCluster = {
  category: ProviderCategory;
  serviceSlug: string;
  bestSlug: string;
  primaryCostGuideSlug: string;
};

export function tradeClusterForCategory(category: ProviderCategory): TradeCluster {
  return {
    category,
    serviceSlug: SERVICE_SLUG_BY_CATEGORY[category],
    bestSlug: getBestSlugForCategory(category),
    primaryCostGuideSlug: PRIMARY_COST_GUIDE_BY_CATEGORY[category],
  };
}

export function tradeClusterForBestSlug(bestSlug: string): TradeCluster | null {
  const category = CATEGORY_BY_BEST_SLUG[bestSlug];
  return category ? tradeClusterForCategory(category) : null;
}

export function tradeClusterForServiceSlug(serviceSlug: string): TradeCluster | null {
  const category = CATEGORY_BY_SERVICE_SLUG[serviceSlug];
  return category ? tradeClusterForCategory(category) : null;
}

export function tradeClusterForCostGuideSlug(costSlug: string): TradeCluster | null {
  const category = CATEGORY_BY_COST_SLUG[costSlug];
  return category ? tradeClusterForCategory(category) : null;
}

function neighborhoodHomeServicesLinks(context: string): InternalLink[] {
  const out: InternalLink[] = [];
  for (const area of NEIGHBORHOOD_AREAS) {
    const href = `/neighborhoods/${area.slug}/home-services`;
    const hub = NEIGHBORHOOD_HOME_SERVICES_HUBS.find((h) => h.neighborhoodSlug === area.slug);
    pushLink(
      out,
      context,
      href,
      `${area.name} home services`,
      hub?.metaDescription ?? `Plumber, HVAC, and roofing context for ${area.name}.`,
      true,
    );
  }
  return out;
}

function compareLinksForCategory(category: ProviderCategory, context: string): InternalLink[] {
  const out: InternalLink[] = [];
  const comparisons = getComparisonsByCategory(category);
  for (const c of comparisons) {
    pushLink(
      out,
      context,
      `/compare/${c.slug}`,
      `${c.providerA.name} vs ${c.providerB.name}`,
      c.metaDescription,
      true,
    );
  }
  if (!comparisons.length) {
    noteGap(context, `/compare/* (${category})`, "no comparison pages for category");
  }
  return out;
}

/**
 * Best Of page: service + primary cost guide + compare pages + neighborhood hubs for the trade.
 */
export function linksForBestOf(bestSlug: string): InternalLink[] {
  const cluster = tradeClusterForBestSlug(bestSlug);
  const context = `best:${bestSlug}`;
  if (!cluster) {
    noteGap(context, bestSlug, "unknown best slug — no trade cluster");
    return [];
  }

  const out: InternalLink[] = [];
  const service = getServiceBySlug(cluster.serviceSlug);
  pushLink(
    out,
    context,
    `/services/${cluster.serviceSlug}`,
    service?.title ?? "Service guide",
    service?.description,
    true,
  );

  const guide = costGuidePages.find((g) => g.slug === cluster.primaryCostGuideSlug);
  pushLink(
    out,
    context,
    `/costs/${cluster.primaryCostGuideSlug}`,
    guide ? `${guide.serviceName} cost guide` : "Cost guide",
    guide?.metaDescription,
    true,
  );

  out.push(...compareLinksForCategory(cluster.category, context));
  out.push(...neighborhoodHomeServicesLinks(context));
  return out;
}

/** Service page: Best Of + primary cost guide. */
export function linksForService(serviceSlug: string): InternalLink[] {
  const cluster = tradeClusterForServiceSlug(serviceSlug);
  const context = `service:${serviceSlug}`;
  if (!cluster) {
    noteGap(context, serviceSlug, "unknown service slug — no trade cluster");
    return [];
  }

  const out: InternalLink[] = [];
  const best = getBestBySlug(cluster.bestSlug);
  pushLink(
    out,
    context,
    `/best/${cluster.bestSlug}`,
    best?.title ?? "Best Of directory",
    best?.description,
    true,
  );

  const guide = costGuidePages.find((g) => g.slug === cluster.primaryCostGuideSlug);
  pushLink(
    out,
    context,
    `/costs/${cluster.primaryCostGuideSlug}`,
    guide ? `${guide.serviceName} cost guide` : "Cost guide",
    guide?.metaDescription,
    true,
  );

  return out;
}

/** Cost guide: Best Of + service page. */
export function linksForCostGuide(costSlug: string): InternalLink[] {
  const cluster = tradeClusterForCostGuideSlug(costSlug);
  const context = `cost:${costSlug}`;
  if (!cluster) {
    noteGap(context, costSlug, "unknown cost guide slug — no trade cluster");
    return [];
  }

  const out: InternalLink[] = [];
  const best = getBestBySlug(cluster.bestSlug);
  pushLink(
    out,
    context,
    `/best/${cluster.bestSlug}`,
    best?.title ?? "Best Of directory",
    best?.description,
    true,
  );

  const service = getServiceBySlug(cluster.serviceSlug);
  pushLink(
    out,
    context,
    `/services/${cluster.serviceSlug}`,
    service?.title ?? "Service guide",
    service?.description,
    true,
  );

  return out;
}

/**
 * Neighborhood hub (home-services or hail): parent service + Best Of for core trades
 * covered by the hub (plumbing, HVAC, roofing). Hail hubs emphasize roofing first.
 */
export function linksForNeighborhood(
  neighborhoodSlug: string,
  variant: "home-services" | "hail-damage" = "home-services",
): InternalLink[] {
  const context = `neighborhood:${neighborhoodSlug}:${variant}`;
  const hubExists =
    variant === "home-services"
      ? NEIGHBORHOOD_HOME_SERVICES_HUBS.some((h) => h.neighborhoodSlug === neighborhoodSlug)
      : NEIGHBORHOOD_HAIL_PAGES.some((h) => h.neighborhoodSlug === neighborhoodSlug);

  if (!hubExists) {
    noteGap(context, `/neighborhoods/${neighborhoodSlug}/${variant}`, "neighborhood page not in inventory");
  }

  const categories: ProviderCategory[] =
    variant === "hail-damage" ? ["roofing", "plumbing", "hvac"] : ["plumbing", "hvac", "roofing"];

  const out: InternalLink[] = [];
  for (const category of categories) {
    const cluster = tradeClusterForCategory(category);
    const service = getServiceBySlug(cluster.serviceSlug);
    const best = getBestBySlug(cluster.bestSlug);
    pushLink(
      out,
      context,
      `/services/${cluster.serviceSlug}`,
      service?.title ?? cluster.serviceSlug,
      service?.description,
      true,
    );
    pushLink(
      out,
      context,
      `/best/${cluster.bestSlug}`,
      best?.title ?? cluster.bestSlug,
      best?.description,
      true,
    );
  }
  return out;
}

/** Detail path for a verified provider name, or null. */
export function providerDetailHref(name: string): string | null {
  const slug = slugifyProviderName(name);
  const href = `/providers/${slug}`;
  if (!getProviderBySlug(slug) || !routeExists(href)) return null;
  return href;
}

export function getProviderByName(name: string): Provider | null {
  const needle = name.trim().toLowerCase();
  if (!needle) return null;
  return PROVIDERS.find((p) => p.name.trim().toLowerCase() === needle) ?? null;
}

/** Provider names longest-first for safe replacement. */
function providerNamesForLinkify(): string[] {
  return [...PROVIDERS.map((p) => p.name)].sort((a, b) => b.length - a.length);
}

/**
 * Wrap plain-text provider names in HTML with links to detail pages.
 * Skips text already inside `<a>` tags. Only links names that resolve to real routes.
 */
export function linkifyProviderNamesInHtml(html: string): string {
  if (!html) return html;
  const names = providerNamesForLinkify();
  let inAnchor = 0;

  return html.replace(/(<[^>]+>)|([^<]+)/g, (full, tag: string | undefined, text: string | undefined) => {
    if (tag) {
      if (/^<a\b/i.test(tag)) inAnchor += 1;
      if (/^<\/a\b/i.test(tag)) inAnchor = Math.max(0, inAnchor - 1);
      return tag;
    }
    if (!text || inAnchor > 0) return text ?? "";

    let out = text;
    for (const name of names) {
      const href = providerDetailHref(name);
      if (!href) continue;
      const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const re = new RegExp(`(?<!\\w)${escaped}(?!\\w)`, "gi");
      out = out.replace(re, (match) => `<a href="${href}">${match}</a>`);
    }
    return out;
  });
}
