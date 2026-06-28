import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/page-seo";

/** Crawlers: allow all pages; disallow `/api/`; sitemap via native `app/sitemap.ts`. */
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
