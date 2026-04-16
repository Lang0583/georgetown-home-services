import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/page-seo";

/** Replaces generated `robots.txt` from the former next-sitemap postbuild. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
