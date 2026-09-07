/**
 * Plain-text llms.txt — curated map of highest-authority GHS URLs for AI agents.
 * Not a ranking signal; keep short and honest (no thin sub-service sprawl).
 */
import { SITE_URL } from "@/lib/page-seo";

export function buildLlmsTxt(): string {
  const base = SITE_URL.replace(/\/$/, "");
  return `# Georgetown Home Services

> Independent Georgetown, TX home-services directory and homeowner guides. Compare plumbers, HVAC, roofers, and more using public ratings, Texas license checks where required, and local cost bands. Rankings are not sold.

Site: ${base}/
Methodology: ${base}/methodology
License report: ${base}/reports/williamson-county-license-check
Author: ${base}/authors/matt
Markdown mirrors: ${base}/methodology.md · ${base}/reports/williamson-county-license-check.md

## Primary hubs

- [Home](${base}/): Directory overview and license-verified providers
- [Best Of](${base}/best): Provider shortlists by trade
- [Cost guides](${base}/costs): Williamson County price planning bands
- [Seasonal maintenance](${base}/seasonal): Central Texas seasonal checklists
- [Compare](${base}/compare): Head-to-head provider comparisons
- [Services](${base}/services): Trade hubs and hiring guides

## Flagship Best Of

- [Best plumbers](${base}/best/best-plumbers-georgetown-tx)
- [Top HVAC companies](${base}/best/top-hvac-companies-georgetown-tx)
- [Best roofers](${base}/best/best-roofers-georgetown-tx)

## Flagship cost guides

- [Plumber cost](${base}/costs/plumber-cost-georgetown-tx)
- [HVAC repair cost](${base}/costs/hvac-repair-cost-georgetown-tx)
- [Roof replacement cost](${base}/costs/roof-replacement-cost-georgetown-tx)

## Flagship guides

- [Drought home maintenance](${base}/blog/drought-home-maintenance-georgetown-tx): Watering rules, clay-soil foundations, lawn survival (links to city + AgriLife sources)
- [After-hail roof checklist](${base}/blog/after-hail-roof-checklist-georgetown-tx)

## Trust

- [Editorial policy](${base}/editorial-policy)
- [About](${base}/about)
- [Contact](${base}/contact)

## Optional

- [Sitemap](${base}/sitemap.xml)
- [Robots](${base}/robots.txt)
`;
}
