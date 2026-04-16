import { NextResponse } from "next/server";
import { buildSitemapEntries, sitemapEntriesToXml } from "@/lib/sitemap-entries";

export const dynamic = "force-static";

/**
 * Raw XML sitemap. Served publicly as `/sitemap.xml` via `next.config.ts` rewrite so crawlers never receive an HTML/RSC document from the metadata sitemap pipeline.
 */
export function GET() {
  const xml = sitemapEntriesToXml(buildSitemapEntries());
  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400",
    },
  });
}
