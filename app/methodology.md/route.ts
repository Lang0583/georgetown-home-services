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

Georgetown Home Services is a comparison and education site. It is not a contractor or dispatch desk. Directory placement cannot be bought.

## Inclusion criteria

${criteria}

## Data sources

${sources}

## How we verify licenses

- Plumbing: Texas State Board of Plumbing Examiners public Responsible Master Plumber licensee file.
- Electrical and HVAC: Texas Department of Licensing and Regulation public records where a license number is shown.
- Pest control: Texas Department of Agriculture Structural Pest Control Service records where a license number is shown.
- The plumbing source file refreshes from the board daily. On site records are stamped with a batch check date.
- A verification badge requires a current license and current insurance on the state file.
- Expired insurance on the state file removes the badge. The company can still appear with that fact stated plainly.
- Texas does not license roofers at the state level, so roofing listings cannot carry a state license number.
- Specialty endorsements only appear when endorsement sets differ across companies in the source file.

## Independence

Affiliate links, sponsored modules, and display advertising do not affect directory rankings or the order of organic provider cards.

## Related

- Licensed providers index: ${base}/providers
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
