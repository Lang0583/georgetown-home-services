import type { MetadataRoute } from "next";
import { costGuidePages } from "@/data/cost-guides";
import { subServicePages } from "@/data/sub-services";
import { neighborhoodServicePages } from "@/data/neighborhoods";
import { NEIGHBORHOOD_HOME_SERVICES_HUBS } from "@/data/neighborhood-home-services-hubs";
import { NEIGHBORHOOD_HAIL_PAGES } from "@/data/neighborhood-hail-pages";
import {
  isExtendedBestSlug,
  isExtendedServiceSlug,
  isNoindexSlug,
  isRedirectedLocationSlug,
  isRedirectedServiceSlug,
  showExtendedHomeServices,
} from "@/lib/public-site-scope";
import { SITE_URL } from "@/lib/page-seo";
import { CORE_BEST_SLUGS, CORE_SERVICE_SLUGS } from "@/lib/pageContentRegistry";
import { AUTHOR_PROFILE_PATH } from "@/lib/site-author";
import {
  getBestSlugs,
  getBlogSlugs,
  getLocationSlugs,
  getServiceSlugs,
} from "@/lib/site-content";
import { TEXAS_SEASON_ORDER } from "@/lib/texas-seasons";
import { COMPARISON_SLUGS } from "@/data/comparisons";

function absoluteUrl(path: string): string {
  if (path === "/") return `${SITE_URL}/`;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

const CORE_SERVICE_SET: ReadonlySet<string> = new Set(CORE_SERVICE_SLUGS);
const CORE_BEST_SET: ReadonlySet<string> = new Set(CORE_BEST_SLUGS);

/**
 * Sitemap URL list (used by `/sitemap.xml` → `/api/sitemap-xml` rewrite).
 *
 * Priority tiering (sitemap.org priority is relative within the site):
 *   1.0    homepage
 *   0.9    core hubs, core service pages, core best-of pages
 *   0.7    /pricing, supporting sub-service pages, blog posts, /locations/georgetown-tx
 *   0.65    neighborhood home-services hubs (plumber+HVAC+roofer tri-trade); neighborhood hail guides
 *   0.6    neighborhood × service landings (/neighborhoods/[slug]/[service])
 *   0.5    static pages (about/contact/policies), low-signal pages
 *
 * Location slugs that 308 elsewhere — keep in sync with `next.config.ts`.
 * (Empty when all neighborhood location pages are indexable.)
 */
export function buildSitemapEntries(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticMonthlyPaths: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/pricing", priority: 0.7 },
    { path: "/costs", priority: 0.85 },
    { path: "/seasonal", priority: 0.8 },
    { path: "/about", priority: 0.5 },
    { path: AUTHOR_PROFILE_PATH, priority: 0.5 },
    { path: "/methodology", priority: 0.5 },
    { path: "/editorial-policy", priority: 0.5 },
    { path: "/service-areas", priority: 0.5 },
    { path: "/contact", priority: 0.5 },
    { path: "/privacy-policy", priority: 0.3 },
    { path: "/terms", priority: 0.3 },
  ];

  const listingWeekly: { path: string; priority: number }[] = [
    { path: "/services", priority: 0.9 },
    { path: "/best", priority: 0.9 },
    { path: "/compare", priority: 0.75 },
    { path: "/blog", priority: 0.7 },
    { path: "/pricing/calculator", priority: 0.85 },
  ];

  const serviceHubMonthly: string[] = [
    "/services/plumbing",
    "/services/hvac",
    "/services/roofing",
    ...(showExtendedHomeServices()
      ? [
          "/services/electrical",
          "/services/landscaping",
          "/services/pest-control",
          "/services/foundation",
          "/services/house-cleaning",
        ]
      : []),
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const { path, priority } of staticMonthlyPaths) {
    entries.push({
      url: absoluteUrl(path),
      lastModified,
      changeFrequency: "monthly",
      priority,
    });
  }

  for (const { path, priority } of listingWeekly) {
    entries.push({
      url: absoluteUrl(path),
      lastModified,
      changeFrequency: "weekly",
      priority,
    });
  }

  for (const path of serviceHubMonthly) {
    entries.push({
      url: absoluteUrl(path),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    });
  }

  for (const slug of getServiceSlugs()) {
    if (!showExtendedHomeServices() && isExtendedServiceSlug(slug)) continue;
    if (isRedirectedServiceSlug(slug)) continue;
    if (isNoindexSlug(slug)) continue;
    const isCore = CORE_SERVICE_SET.has(slug);
    entries.push({
      url: absoluteUrl(`/services/${slug}`),
      lastModified,
      changeFrequency: isCore ? "monthly" : "yearly",
      priority: isCore ? 0.9 : 0.6,
    });
  }

  for (const slug of getLocationSlugs()) {
    if (isRedirectedLocationSlug(slug)) continue;
    if (isNoindexSlug(slug)) continue;
    entries.push({
      url: absoluteUrl(`/locations/${slug}`),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  for (const slug of getBestSlugs()) {
    if (!showExtendedHomeServices() && isExtendedBestSlug(slug)) continue;
    if (isNoindexSlug(slug)) continue;
    const isCore = CORE_BEST_SET.has(slug);
    entries.push({
      url: absoluteUrl(`/best/${slug}`),
      lastModified,
      changeFrequency: "monthly",
      priority: isCore ? 0.9 : 0.7,
    });
  }

  for (const slug of getBlogSlugs()) {
    if (isNoindexSlug(slug)) continue;
    entries.push({
      url: absoluteUrl(`/blog/${slug}`),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  for (const p of neighborhoodServicePages) {
    entries.push({
      url: absoluteUrl(`/neighborhoods/${p.neighborhoodSlug}/${p.serviceSlug}`),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  for (const hub of NEIGHBORHOOD_HOME_SERVICES_HUBS) {
    entries.push({
      url: absoluteUrl(`/neighborhoods/${hub.neighborhoodSlug}/home-services`),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.65,
    });
  }

  for (const p of NEIGHBORHOOD_HAIL_PAGES) {
    entries.push({
      url: absoluteUrl(`/neighborhoods/${p.neighborhoodSlug}/hail-damage`),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.65,
    });
  }
  // Source lists: `data/neighborhoods.ts` (40 × service pages) + `data/neighborhood-home-services-hubs.ts` (5 hubs) + `data/neighborhood-hail-pages.ts`.

  for (const p of subServicePages) {
    if (!showExtendedHomeServices() && p.extended) continue;
    entries.push({
      url: absoluteUrl(`/${p.serviceSlug}/${p.slug}`),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  for (const p of costGuidePages) {
    if (!showExtendedHomeServices() && p.extended) continue;
    entries.push({
      url: absoluteUrl(`/costs/${p.slug}`),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  for (const season of TEXAS_SEASON_ORDER) {
    entries.push({
      url: absoluteUrl(`/seasonal/${season}`),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    });
  }

  for (const slug of COMPARISON_SLUGS) {
    entries.push({
      url: absoluteUrl(`/compare/${slug}`),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.72,
    });
  }

  return entries;
}

function escapeXml(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function lastModIso(entry: MetadataRoute.Sitemap[number]): string {
  const d = entry.lastModified;
  if (d instanceof Date) return d.toISOString();
  if (typeof d === "string") return new Date(d).toISOString();
  return new Date().toISOString();
}

/** sitemap.org XML for crawlers (explicit `Content-Type`, no RSC/HTML shell). */
export function sitemapEntriesToXml(entries: MetadataRoute.Sitemap): string {
  const urls = entries
    .map((e) => {
      const loc = escapeXml(e.url);
      const lastmod = lastModIso(e);
      const changefreq = e.changeFrequency ?? "monthly";
      const priority = e.priority ?? 0.5;
      return `<url><loc>${loc}</loc><lastmod>${lastmod}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;
}
