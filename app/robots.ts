import type { MetadataRoute } from "next";

const SITE_URL = "https://www.georgetownhomeservices.com";

/** Replaces generated `robots.txt` from the former next-sitemap postbuild. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
