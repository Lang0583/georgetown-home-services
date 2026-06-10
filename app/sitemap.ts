import type { MetadataRoute } from "next";
import { buildSitemapEntries } from "@/lib/sitemap-entries";

/** Native Next.js sitemap at `/sitemap.xml` — auto-generated from all indexable routes. */
export default function sitemap(): MetadataRoute.Sitemap {
  return buildSitemapEntries();
}
