import type { MetadataRoute } from "next";
import { isExtendedBestSlug, isExtendedServiceSlug, showExtendedHomeServices } from "@/lib/public-site-scope";
import { SITE_URL } from "@/lib/page-seo";
import {
  getBestSlugs,
  getBlogSlugs,
  getLocationSlugs,
  getServiceSlugs,
} from "@/lib/site-content";

function absoluteUrl(path: string): string {
  if (path === "/") return `${SITE_URL}/`;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Sitemap URL list (used by `/sitemap.xml` → `/api/sitemap-xml` rewrite).
 */
export function buildSitemapEntries(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticMonthlyPaths: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/about", priority: 0.6 },
    { path: "/methodology", priority: 0.6 },
    { path: "/editorial-policy", priority: 0.6 },
    { path: "/service-areas", priority: 0.6 },
    { path: "/contact", priority: 0.6 },
    { path: "/privacy-policy", priority: 0.6 },
    { path: "/terms", priority: 0.6 },
  ];

  const listingWeekly: { path: string; priority: number }[] = [
    { path: "/services", priority: 0.8 },
    { path: "/best", priority: 0.9 },
    { path: "/blog", priority: 0.7 },
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
      priority: 0.8,
    });
  }

  for (const slug of getServiceSlugs()) {
    if (!showExtendedHomeServices() && isExtendedServiceSlug(slug)) continue;
    entries.push({
      url: absoluteUrl(`/services/${slug}`),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  for (const slug of getLocationSlugs()) {
    entries.push({
      url: absoluteUrl(`/locations/${slug}`),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  for (const slug of getBestSlugs()) {
    const pausedExtendedBest = isExtendedBestSlug(slug);
    entries.push({
      url: absoluteUrl(`/best/${slug}`),
      lastModified,
      changeFrequency: "monthly",
      priority: pausedExtendedBest ? 0.7 : 0.9,
    });
  }

  for (const slug of getBlogSlugs()) {
    entries.push({
      url: absoluteUrl(`/blog/${slug}`),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
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
