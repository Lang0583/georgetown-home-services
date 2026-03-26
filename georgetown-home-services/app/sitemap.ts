import type { MetadataRoute } from "next";
import { getAllSitemapRoutes } from "../lib/site-content";

const siteUrl = process.env.SITE_URL ?? "https://www.georgetownhomeservices.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = getAllSitemapRoutes();

  const now = new Date();
  const lastModified = now.toISOString();
  const changeFrequencyWeekly = "weekly" as const;
  const changeFrequencyMonthly = "monthly" as const;

  return [
    { url: siteUrl + routes.home, lastModified, changeFrequency: changeFrequencyWeekly, priority: 1 },
    ...routes.services.map((path) => ({ url: siteUrl + path, lastModified, changeFrequency: changeFrequencyWeekly, priority: 0.9 })),
    ...routes.locations.map((path) => ({ url: siteUrl + path, lastModified, changeFrequency: changeFrequencyWeekly, priority: 0.8 })),
    ...routes.best.map((path) => ({ url: siteUrl + path, lastModified, changeFrequency: changeFrequencyWeekly, priority: 0.7 })),
    ...routes.blog.map((path) => ({ url: siteUrl + path, lastModified, changeFrequency: changeFrequencyMonthly, priority: 0.6 }))
  ];
}

