/**
 * Plain-text llms.txt — curated map of highest-authority GHS URLs for AI agents.
 * Not a ranking signal; keep honest (no thin sub-service sprawl).
 */
import { costGuidePages } from "@/data/cost-guides";
import { WATER_SITEMAP_PATHS } from "@/data/water";
import { SITE_URL } from "@/lib/page-seo";

const BEST_OF = [
  { path: "/best/best-plumbers-georgetown-tx", label: "Best plumbers" },
  { path: "/best/top-hvac-companies-georgetown-tx", label: "Top HVAC companies" },
  { path: "/best/best-roofers-georgetown-tx", label: "Best roofers" },
  { path: "/best/best-electricians-georgetown-tx", label: "Best electricians" },
  { path: "/best/best-landscaping-companies-georgetown-tx", label: "Best landscaping companies" },
  { path: "/best/best-pest-control-georgetown-tx", label: "Best pest control" },
  { path: "/best/best-foundation-repair-georgetown-tx", label: "Best foundation repair" },
  { path: "/best/best-house-cleaning-services-georgetown-tx", label: "Best house cleaning" },
] as const;

const TRADE_HUBS = [
  { path: "/services/plumbing", label: "Plumbing hub" },
  { path: "/services/hvac", label: "HVAC hub" },
  { path: "/services/roofing", label: "Roofing hub" },
  { path: "/services/electrical", label: "Electrical hub" },
  { path: "/services/landscaping", label: "Landscaping hub" },
  { path: "/services/pest-control", label: "Pest control hub" },
  { path: "/services/foundation", label: "Foundation hub" },
  { path: "/services/house-cleaning", label: "House cleaning hub" },
] as const;

const CORE_GUIDES = [
  { path: "/services/plumber-georgetown-tx", label: "Plumbing hiring guide" },
  { path: "/services/hvac-georgetown-tx", label: "HVAC hiring guide" },
  { path: "/services/roofer-georgetown-tx", label: "Roofing hiring guide" },
  { path: "/services/electrician-georgetown-tx", label: "Electrical hiring guide" },
  { path: "/services/landscaping-georgetown-tx", label: "Landscaping hiring guide" },
  { path: "/services/pest-control-georgetown-tx", label: "Pest control hiring guide" },
  { path: "/services/foundation-repair-georgetown-tx", label: "Foundation hiring guide" },
  { path: "/services/house-cleaning-georgetown-tx", label: "House cleaning hiring guide" },
] as const;

function costLabel(slug: string): string {
  return slug
    .replace(/-georgetown-tx$/, "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function buildLlmsTxt(): string {
  const base = SITE_URL.replace(/\/$/, "");
  const costLines = costGuidePages
    .map((p) => `- [${costLabel(p.slug)}](${base}/costs/${p.slug})`)
    .join("\n");
  const waterLines = WATER_SITEMAP_PATHS.map((path) => {
    const label =
      path === "/water"
        ? "Water hardness hub"
        : path
            .replace(/^\/water\//, "")
            .replace(/-/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase());
    return `- [${label}](${base}${path})`;
  }).join("\n");

  return `# Georgetown Home Services

> Independent Georgetown, TX home-services directory and homeowner guides. Compare plumbers, HVAC, roofers, and more using public ratings, Texas license checks where required, and local cost bands. Rankings are not sold.

Site: ${base}/
Methodology: ${base}/methodology
License report: ${base}/reports/williamson-county-license-check
Author: ${base}/authors/matt
Markdown mirrors: ${base}/methodology.md · ${base}/reports/williamson-county-license-check.md · ${base}/water.md · ${base}/best.md · ${base}/costs.md

## Primary hubs

- [Home](${base}/): Directory overview and license-verified providers
- [Best Of](${base}/best): Provider shortlists by trade
- [Cost guides](${base}/costs): Williamson County price planning bands
- [Seasonal maintenance](${base}/seasonal): Central Texas seasonal checklists
- [Compare](${base}/compare): Head-to-head provider comparisons
- [Services](${base}/services): Trade hubs and hiring guides
- [Water hardness](${base}/water): Georgetown Utility Systems hardness by treatment plant
- [ZIP guides](${base}/zip): Georgetown ZIP-level home-service context

## Best Of (all trades)

${BEST_OF.map((b) => `- [${b.label}](${base}${b.path})`).join("\n")}

## Cost guides (all)

${costLines}

## Trade hubs

${TRADE_HUBS.map((t) => `- [${t.label}](${base}${t.path})`).join("\n")}

## Core hiring guides

${CORE_GUIDES.map((g) => `- [${g.label}](${base}${g.path})`).join("\n")}

## Water (city-sourced)

${waterLines}

## Flagship editorial

- [Drought home maintenance](${base}/blog/drought-home-maintenance-georgetown-tx): Watering rules, clay-soil foundations, lawn survival (city + AgriLife sources)
- [After-hail roof checklist](${base}/blog/after-hail-roof-checklist-georgetown-tx)
- [How to choose a reliable plumber](${base}/blog/how-to-choose-a-reliable-plumber-georgetown-tx)
- [Signs you need HVAC repair](${base}/blog/signs-you-need-hvac-repair-georgetown-tx)
- [Signs you may need a new roof](${base}/blog/signs-you-may-need-a-new-roof-georgetown-tx)

## Neighborhood hubs

- [Sun City home services](${base}/neighborhoods/sun-city/home-services)
- [Teravista home services](${base}/neighborhoods/teravista/home-services)
- [Wolf Ranch home services](${base}/neighborhoods/wolf-ranch/home-services)
- [Berry Creek home services](${base}/neighborhoods/berry-creek/home-services)
- [Georgetown Village home services](${base}/neighborhoods/georgetown-village/home-services)

## Trust

- [Editorial policy](${base}/editorial-policy)
- [About](${base}/about)
- [Contact](${base}/contact)
- [Listing methodology](${base}/methodology)
- [Williamson County license check](${base}/reports/williamson-county-license-check)

## Optional

- [Sitemap](${base}/sitemap.xml)
- [Robots](${base}/robots.txt)
`;
}
