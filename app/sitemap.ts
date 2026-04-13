import type { MetadataRoute } from "next";
import { isExtendedBestSlug, isExtendedServiceSlug, showExtendedHomeServices } from "@/lib/public-site-scope";
import {
  getBestSlugs,
  getBlogSlugs,
  getServiceSlugs,
} from "@/lib/site-content";

const SITE_URL = "https://www.georgetownhomeservices.com";

function absoluteUrl(path: string): string {
  if (path === "/") return `${SITE_URL}/`;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Listing indexes: /services, /best, /blog — weekly.
 * Marketing / legal static pages — monthly.
 * Individual service, best-of, and blog URLs — monthly (stable guides).
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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

  for (const slug of getBestSlugs()) {
    if (!showExtendedHomeServices() && isExtendedBestSlug(slug)) continue;
    entries.push({
      url: absoluteUrl(`/best/${slug}`),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
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
