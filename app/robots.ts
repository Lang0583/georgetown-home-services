import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/page-seo";

/** Crawlers: allow everything; point to the flat sitemap (rewritten to `/api/sitemap-xml`). */
export default function robots(): MetadataRoute.Robots {
  const base = SITE_URL.replace(/\/$/, "");
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
