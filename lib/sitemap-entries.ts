import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import type { MetadataRoute } from "next";
import { costGuidePages } from "@/data/cost-guides";
import { subServicePages } from "@/data/sub-services";
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
import { GEORGETOWN_ZIP_CODES } from "@/data/zip-codes";
import {
  CATEGORY_TO_BEST_SLUG,
  getAllProviderSlugs,
  getProviderBySlug,
  type ProviderCategory,
} from "@/data/providers";

function absoluteUrl(path: string): string {
  if (path === "/") return `${SITE_URL}/`;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

const CORE_SERVICE_SET: ReadonlySet<string> = new Set(CORE_SERVICE_SLUGS);
const CORE_BEST_SET: ReadonlySet<string> = new Set(CORE_BEST_SLUGS);

type SitemapOpts = {
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
};

function push(
  entries: MetadataRoute.Sitemap,
  path: string,
  { changeFrequency, priority }: SitemapOpts,
  lastModified = new Date(),
) {
  entries.push({ url: absoluteUrl(path), lastModified, changeFrequency, priority });
}

/** Optional expansion routes (zip / compare / blog batch) — empty when JSON file absent. */
function optionalJsonPaths(filename: string): string[] {
  const filePath = join(process.cwd(), "data", filename);
  if (!existsSync(filePath)) return [];
  try {
    const data = JSON.parse(readFileSync(filePath, "utf8")) as unknown;
    return Array.isArray(data) ? (data as string[]) : [];
  } catch {
    return [];
  }
}

/**
 * Sitemap URL list for `app/sitemap.ts` (and legacy XML helper).
 *
 * Priority tiers (per technical SEO spec):
 *   1.0  homepage (weekly)
 *   0.9  core service pages (weekly)
 *   0.8  Best Of + cost guides (monthly)
 *   0.7  sub-service, zip, comparison, hubs (monthly)
 *   0.6  blog posts (monthly)
 */
export function buildSitemapEntries(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = [];

  push(entries, "/", { changeFrequency: "weekly", priority: 1 }, lastModified);
  push(entries, "/search", { changeFrequency: "monthly", priority: 0.5 }, lastModified);

  for (const { path, priority } of [
    { path: "/pricing", priority: 0.7 },
    { path: "/costs", priority: 0.85 },
    { path: "/seasonal", priority: 0.8 },
    { path: "/about", priority: 0.5 },
    { path: AUTHOR_PROFILE_PATH, priority: 0.5 },
    { path: "/methodology", priority: 0.5 },
    { path: "/editorial-policy", priority: 0.5 },
    { path: "/service-areas", priority: 0.5 },
    { path: "/zip", priority: 0.7 },
    { path: "/contact", priority: 0.5 },
    { path: "/privacy-policy", priority: 0.3 },
    { path: "/terms", priority: 0.3 },
  ]) {
    push(entries, path, { changeFrequency: "monthly", priority }, lastModified);
  }

  for (const { path, priority } of [
    { path: "/services", priority: 0.9 },
    { path: "/best", priority: 0.9 },
    { path: "/compare", priority: 0.75 },
    { path: "/blog", priority: 0.7 },
    { path: "/pricing/calculator", priority: 0.85 },
  ]) {
    push(entries, path, { changeFrequency: "weekly", priority }, lastModified);
  }

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
  for (const path of serviceHubMonthly) {
    push(entries, path, { changeFrequency: "weekly", priority: 0.7 }, lastModified);
  }

  for (const slug of getServiceSlugs()) {
    if (!showExtendedHomeServices() && isExtendedServiceSlug(slug)) continue;
    if (isRedirectedServiceSlug(slug)) continue;
    if (isNoindexSlug(slug)) continue;
    const isCore = CORE_SERVICE_SET.has(slug);
    push(
      entries,
      `/services/${slug}`,
      {
        changeFrequency: isCore ? "weekly" : "monthly",
        priority: isCore ? 0.9 : 0.7,
      },
      lastModified,
    );
  }

  for (const slug of getBestSlugs()) {
    if (!showExtendedHomeServices() && isExtendedBestSlug(slug)) continue;
    if (isNoindexSlug(slug)) continue;
    push(entries, `/best/${slug}`, { changeFrequency: "monthly", priority: 0.8 }, lastModified);
  }

  for (const slug of getAllProviderSlugs()) {
    const provider = getProviderBySlug(slug);
    if (!provider) continue;
    const bestSlug = CATEGORY_TO_BEST_SLUG[provider.category as ProviderCategory];
    if (!showExtendedHomeServices() && isExtendedBestSlug(bestSlug)) continue;
    push(entries, `/providers/${slug}`, { changeFrequency: "monthly", priority: 0.75 }, lastModified);
  }

  for (const p of costGuidePages) {
    if (!showExtendedHomeServices() && p.extended) continue;
    push(entries, `/costs/${p.slug}`, { changeFrequency: "monthly", priority: 0.8 }, lastModified);
  }

  for (const p of subServicePages) {
    if (!showExtendedHomeServices() && p.extended) continue;
    push(entries, `/${p.serviceSlug}/${p.slug}`, { changeFrequency: "monthly", priority: 0.7 }, lastModified);
  }

  for (const path of optionalJsonPaths("blog-paths.json")) {
    push(entries, path, { changeFrequency: "monthly", priority: 0.6 }, lastModified);
  }

  for (const path of optionalJsonPaths("comparison-paths.json")) {
    push(entries, path, { changeFrequency: "monthly", priority: 0.7 }, lastModified);
  }
  push(entries, "/compare", { changeFrequency: "monthly", priority: 0.7 }, lastModified);

  for (const path of optionalJsonPaths("zip-paths.json")) {
    push(entries, path, { changeFrequency: "monthly", priority: 0.7 }, lastModified);
  }
  push(entries, "/zip", { changeFrequency: "monthly", priority: 0.7 }, lastModified);

  for (const slug of getBlogSlugs()) {
    if (isNoindexSlug(slug)) continue;
    push(entries, `/blog/${slug}`, { changeFrequency: "monthly", priority: 0.6 }, lastModified);
  }

  for (const slug of getLocationSlugs()) {
    if (isRedirectedLocationSlug(slug)) continue;
    if (isNoindexSlug(slug)) continue;
    push(entries, `/locations/${slug}`, { changeFrequency: "monthly", priority: 0.7 }, lastModified);
  }

  for (const hub of NEIGHBORHOOD_HOME_SERVICES_HUBS) {
    push(
      entries,
      `/neighborhoods/${hub.neighborhoodSlug}/home-services`,
      { changeFrequency: "monthly", priority: 0.65 },
      lastModified,
    );
  }

  for (const p of NEIGHBORHOOD_HAIL_PAGES) {
    push(
      entries,
      `/neighborhoods/${p.neighborhoodSlug}/hail-damage`,
      { changeFrequency: "monthly", priority: 0.65 },
      lastModified,
    );
  }

  for (const season of TEXAS_SEASON_ORDER) {
    push(entries, `/seasonal/${season}`, { changeFrequency: "monthly", priority: 0.7 }, lastModified);
  }

  // Provider head-to-head comparison pages (`/compare/[slug]`).
  for (const slug of COMPARISON_SLUGS) {
    push(entries, `/compare/${slug}`, { changeFrequency: "monthly", priority: 0.72 }, lastModified);
  }

  for (const zip of GEORGETOWN_ZIP_CODES) {
    push(entries, `/zip/${zip}`, { changeFrequency: "monthly", priority: 0.7 }, lastModified);
  }

  // Standalone static service/cost pages that don't have a matching entry in the
  // dynamic emitters above. Add new one-off routes here so they ship in the sitemap.
  push(entries, "/sun-city/plumber", { changeFrequency: "monthly", priority: 0.7 }, lastModified);
  push(
    entries,
    "/plumbing/water-heater-replacement-cost-georgetown-tx",
    { changeFrequency: "monthly", priority: 0.8 },
    lastModified,
  );

  const seen = new Set<string>();
  return entries.filter((entry) => {
    if (seen.has(entry.url)) return false;
    seen.add(entry.url);
    return true;
  });
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

/** sitemap.org XML for crawlers (legacy `/api/sitemap-xml` route). */
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
