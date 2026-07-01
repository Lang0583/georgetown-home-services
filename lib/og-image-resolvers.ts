import { getCostGuidePage } from "@/data/cost-guides";
import { getComparisonBySlug } from "@/data/comparisons";
import { getNeighborhoodHailPage } from "@/data/neighborhood-hail-pages";
import { getNeighborhoodHomeServicesHub } from "@/data/neighborhood-home-services-hubs";
import { getNeighborhoodServicePage } from "@/data/neighborhoods";
import { getSeasonalGuide } from "@/data/seasonal-guides";
import { getZipCodePage, zipPageTitle } from "@/data/zip-codes";
import { getSubServicePage } from "@/data/sub-services";
import { isTexasSeasonSlug } from "./texas-seasons";
import { showExtendedHomeServices } from "./public-site-scope";
import { buildServicePageSeo, buildTradeHubSeo } from "./service-page-seo";
import type { OgImageContent } from "./og-image";
import { getBestBySlug, getBlogBySlug, getLocationBySlug, getServiceBySlug } from "./site-content";

const TRADE_HUBS: Record<string, { label: string; pricingKey: Parameters<typeof buildTradeHubSeo>[0]["pricingKey"] }> = {
  electrical: { label: "Electrical", pricingKey: "electrical" },
  foundation: { label: "Foundation", pricingKey: "foundation" },
  "house-cleaning": { label: "House Cleaning", pricingKey: "cleaning" },
  hvac: { label: "HVAC", pricingKey: "hvac" },
  landscaping: { label: "Landscaping", pricingKey: "landscaping" },
  "pest-control": { label: "Pest Control", pricingKey: "pest" },
  plumbing: { label: "Plumbing", pricingKey: "plumbing" },
  roofing: { label: "Roofing", pricingKey: "roofing" },
};

export function resolveBestOgImage(slug: string): OgImageContent | null {
  const best = getBestBySlug(slug);
  if (!best) return null;
  return { title: best.title, category: "Best Of" };
}

export function resolveBlogOgImage(slug: string): OgImageContent | null {
  const post = getBlogBySlug(slug);
  if (!post) return null;
  return { title: post.title, category: "Blog" };
}

export function resolveCompareOgImage(slug: string): OgImageContent | null {
  const comparison = getComparisonBySlug(slug);
  if (!comparison) return null;
  return {
    title: `${comparison.providerA.name} vs ${comparison.providerB.name}`,
    category: "Compare",
  };
}

export function resolveCostGuideOgImage(slug: string): OgImageContent | null {
  const page = getCostGuidePage(slug);
  if (!page) return null;
  if (!showExtendedHomeServices() && page.extended) return null;
  return { title: page.absoluteTitle, category: "Cost Guide" };
}

export function resolveServiceOgImage(slug: string): OgImageContent | null {
  const service = getServiceBySlug(slug);
  if (!service) return null;
  const { absoluteTitle } = buildServicePageSeo(service);
  return { title: absoluteTitle, category: "Services" };
}

export function resolveLocationOgImage(slug: string): OgImageContent | null {
  const location = getLocationBySlug(slug);
  if (!location) return null;
  return {
    title: `${location.title}: Service Guides and Local Provider Lists`,
    category: "Locations",
  };
}

export function resolveSubServiceOgImage(service: string, slug: string): OgImageContent | null {
  const page = getSubServicePage(service, slug);
  if (!page) return null;
  return { title: page.metaTitle, category: "Services" };
}

export function resolveNeighborhoodServiceOgImage(
  neighborhood: string,
  service: string,
): OgImageContent | null {
  const page = getNeighborhoodServicePage(neighborhood, service);
  if (!page) return null;
  return { title: page.metaTitle, category: "Neighborhoods" };
}

export function resolveNeighborhoodHailOgImage(neighborhood: string): OgImageContent | null {
  const page = getNeighborhoodHailPage(neighborhood);
  if (!page) return null;
  return { title: page.metaTitle, category: "Neighborhoods" };
}

export function resolveNeighborhoodHubOgImage(neighborhood: string): OgImageContent | null {
  const hub = getNeighborhoodHomeServicesHub(neighborhood);
  if (!hub) return null;
  return { title: hub.metaTitle, category: "Neighborhoods" };
}

export function resolveSeasonalOgImage(season: string): OgImageContent | null {
  if (!isTexasSeasonSlug(season)) return null;
  const guide = getSeasonalGuide(season);
  return {
    title: `${guide.label} Home Checklist Georgetown TX (${guide.monthsLabel})`,
    category: "Seasonal",
  };
}

export function resolveZipOgImage(zipcode: string): OgImageContent | null {
  const page = getZipCodePage(zipcode);
  if (!page) return null;
  return { title: zipPageTitle(page.zip), category: "ZIP Codes" };
}

export function resolveTradeHubOgImage(trade: string): OgImageContent | null {
  const hub = TRADE_HUBS[trade];
  if (!hub) return null;
  const seo = buildTradeHubSeo(hub);
  return { title: seo.absoluteTitle, category: "Services" };
}
