import { PLANTS, WATER_SOURCE, plantGpg, plantMgL } from "@/data/water";
import { waterHubTakeaways } from "@/lib/ai-seo-takeaways";
import { SITE_URL } from "@/lib/page-seo";

export const dynamic = "force-static";

function waterMarkdown(): string {
  const base = SITE_URL.replace(/\/$/, "");
  const south = PLANTS.southlake;
  const park = PLANTS.park;
  const takeaways = waterHubTakeaways()
    .map((t) => `- ${t}`)
    .join("\n");

  return `# Georgetown Water Hardness by Plant

Publisher: Georgetown Home Services
Canonical: ${base}/water
Source article: ${WATER_SOURCE.articleUrl} (updated ${WATER_SOURCE.updated})
Utility reports: ${WATER_SOURCE.reportsUrl}

Georgetown treats water at more than one plant. Finished hardness is not the same across town.

## Key takeaways

${takeaways}

## Published plant bands

| Plant | Hardness (mg/L as CaCO₃) | Grains per gallon | USGS class |
| --- | --- | --- | --- |
| ${south.label} | ${plantMgL(south)} | ${plantGpg(south)} | ${south.usgsClass} |
| ${park.label} | ${plantMgL(park)} | ${plantGpg(park)} | ${park.usgsClass} |

## Plant pages

- Southlake / Lake Georgetown: ${base}/water/${south.slug}
- Park / Southside: ${base}/water/${park.slug}
- How we source: ${base}/water/how-we-source
- Chloramine and resin: ${base}/water/chloramine-and-resin

## Related

- Plumbing hub: ${base}/services/plumbing
- Best plumbers: ${base}/best/best-plumbers-georgetown-tx
- Methodology: ${base}/methodology.md
`;
}

export function GET() {
  return new Response(waterMarkdown(), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
