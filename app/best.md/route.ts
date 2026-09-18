import { CATEGORY_TO_BEST_SLUG, PROVIDER_CATEGORY_LABELS, PROVIDER_CATEGORY_ORDER } from "@/data/providers";
import { LISTING_INCLUSION_CRITERIA, LISTING_METHODOLOGY_PATH } from "@/lib/listing-methodology";
import { SITE_URL } from "@/lib/page-seo";

export const dynamic = "force-static";

function bestMarkdown(): string {
  const base = SITE_URL.replace(/\/$/, "");
  const criteria = LISTING_INCLUSION_CRITERIA.map((c) => `- ${c}`).join("\n");
  const links = PROVIDER_CATEGORY_ORDER.map((cat) => {
    const slug = CATEGORY_TO_BEST_SLUG[cat];
    return `- [${PROVIDER_CATEGORY_LABELS[cat]}](${base}/best/${slug})`;
  }).join("\n");

  return `# Best Of — Georgetown Home Services

Publisher: Georgetown Home Services
Canonical: ${base}/best
Methodology: ${base}${LISTING_METHODOLOGY_PATH}

Independent provider shortlists by trade for Georgetown / Williamson County. Directory placement cannot be bought.

## Inclusion criteria

${criteria}

## Trade shortlists

${links}

## Related Markdown

- Methodology: ${base}/methodology.md
- License report: ${base}/reports/williamson-county-license-check.md
- Cost guides index: ${base}/costs.md
`;
}

export function GET() {
  return new Response(bestMarkdown(), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
