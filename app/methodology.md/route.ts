import { LISTING_DATA_SOURCES, LISTING_INCLUSION_CRITERIA, LISTING_METHODOLOGY_PATH } from "@/lib/listing-methodology";
import { AUTHOR_BYLINE, PUBLISHER_NAME } from "@/lib/site-author";
import { SITE_URL } from "@/lib/page-seo";

export const dynamic = "force-static";

function methodologyMarkdown(): string {
  const base = SITE_URL.replace(/\/$/, "");
  const sources = LISTING_DATA_SOURCES.map((s) => `- **${s.name}:** ${s.description}`).join("\n");
  const criteria = LISTING_INCLUSION_CRITERIA.map((c) => `- ${c}`).join("\n");

  return `# How We Build Provider Listings

Publisher: ${PUBLISHER_NAME}
Author: ${AUTHOR_BYLINE}
Canonical: ${base}${LISTING_METHODOLOGY_PATH}

Georgetown Home Services is a comparison and education site—not a contractor or dispatch desk. Directory placement cannot be bought.

## Inclusion criteria

${criteria}

## Data sources

${sources}

## Independence

Affiliate links, sponsored modules, and display advertising do not affect directory rankings or the order of organic provider cards.

## Related

- License report: ${base}/reports/williamson-county-license-check
- License report (Markdown): ${base}/reports/williamson-county-license-check.md
- Best Of index: ${base}/best
`;
}

export function GET() {
  return new Response(methodologyMarkdown(), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
