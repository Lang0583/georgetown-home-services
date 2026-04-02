import siteContent from "../data/site-content.json";

export type ContentBlock =
  | { kind: "p"; text: string }
  | { kind: "h2"; text: string }
  | { kind: "ul"; items: string[] };

export type Faq = { q: string; a: string };

export type LocationPage = {
  slug: string;
  title: string;
  h1: string;
  description: string;
  heroBullets: string[];
  content: ContentBlock[];
  serviceSlugs: string[];
  bestSlugs: string[];
};

export type ServicePage = {
  slug: string;
  title: string;
  h1: string;
  description: string;
  locationSlug: string;
  serviceType: string;
  heroBullets: string[];
  content: ContentBlock[];
  faqs: Faq[];
  bestSlugs: string[];
  relatedServiceSlugs: string[];
  recommendedServiceSlugs?: string[];
  /** Discriminator for service routes; core pages should set `"service"`. */
  type?: "service";
  /** Optional inline HTML; otherwise merged from `lib/generatedPages.json` by slug. */
  html?: string;
};

export type BestPage = {
  slug: string;
  title: string;
  h1: string;
  description: string;
  locationSlug: string;
  type?: "best";
  content: ContentBlock[];
  recommendedServiceSlugs: string[];
  /** Optional inline HTML; otherwise merged from `lib/generatedPages.json` by slug. */
  html?: string;
};

export type BlogPage = {
  slug: string;
  title: string;
  h1: string;
  description: string;
  locationSlug: string;
  readTime: string;
  content: ContentBlock[];
  relatedServiceSlugs: string[];
  relatedBestSlugs: string[];
};

export type SiteContent = {
  brand: { name: string; domain: string };
  contact: { email: string; phone?: string };
  locations: LocationPage[];
  services: ServicePage[];
  best: BestPage[];
  blog: BlogPage[];
};

const data = siteContent as SiteContent;

export function getBrandName() {
  return data.brand.name;
}

export function getContact() {
  return data.contact;
}

export function getLocations() {
  return data.locations;
}

export function getLocationBySlug(slug: string) {
  return data.locations.find((l) => l.slug === slug) ?? null;
}

export function getServices() {
  return data.services;
}

export function getServiceBySlug(slug: string) {
  return data.services.find((s) => s.slug === slug) ?? null;
}

export function getBest() {
  return data.best;
}

export function getBestBySlug(slug: string) {
  return data.best.find((b) => b.slug === slug) ?? null;
}

export function getBlog() {
  return data.blog;
}

export function getBlogBySlug(slug: string) {
  return data.blog.find((p) => p.slug === slug) ?? null;
}

export function getServiceSlugs() {
  return data.services.map((s) => s.slug);
}

export function getLocationSlugs() {
  return data.locations.map((l) => l.slug);
}

export function getBestSlugs() {
  return data.best.map((b) => b.slug);
}

export function getBlogSlugs() {
  return data.blog.map((b) => b.slug);
}

export function getAllSitemapRoutes() {
  return {
    home: "/",
    services: getServiceSlugs().map((slug) => `/services/${slug}`),
    locations: getLocationSlugs().map((slug) => `/locations/${slug}`),
    best: getBestSlugs().map((slug) => `/best/${slug}`),
    blog: getBlogSlugs().map((slug) => `/blog/${slug}`),
  };
}

export function getRecommendedServicesForSlug(slug: string) {
  const service = getServiceBySlug(slug);
  if (service?.recommendedServiceSlugs?.length) return service.recommendedServiceSlugs;
  if (service?.relatedServiceSlugs?.length) return service.relatedServiceSlugs;
  return [];
}

export function getBlogsForServiceSlug(serviceSlug: string) {
  return data.blog.filter((p) => p.relatedServiceSlugs.includes(serviceSlug));
}

export function getBlogsForBestSlug(bestSlug: string) {
  return data.blog.filter((p) => p.relatedBestSlugs.includes(bestSlug));
}

