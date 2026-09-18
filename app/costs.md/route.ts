import { costGuidePages } from "@/data/cost-guides";
import { SITE_URL } from "@/lib/page-seo";

export const dynamic = "force-static";

function costsMarkdown(): string {
  const base = SITE_URL.replace(/\/$/, "");
  const links = costGuidePages
    .map((p) => `- [${p.h1}](${base}/costs/${p.slug})`)
    .join("\n");

  return `# Cost Guides — Georgetown / Williamson County

Publisher: Georgetown Home Services
Canonical: ${base}/costs

Planning bands for homeowners—not contractor quotes. Compare two written scopes before you hire.

## Guides

${links}

## Related

- Best Of index: ${base}/best.md
- Methodology: ${base}/methodology.md
- Water hardness (affects plumbing / softener sizing): ${base}/water.md
`;
}

export function GET() {
  return new Response(costsMarkdown(), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
