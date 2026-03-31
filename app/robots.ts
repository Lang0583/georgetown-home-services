import type { MetadataRoute } from "next";

const siteUrl = process.env.SITE_URL ?? "https://www.georgetownhomeservices.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}

