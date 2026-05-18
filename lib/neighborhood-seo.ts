import type { NeighborhoodServicePage } from "../data/neighborhoods";
import type { NeighborhoodHailPage } from "../data/neighborhood-hail-pages";
import { clipMetaDescription } from "./seo-meta";
import { PRICING_YEAR } from "./pricing-data";

const SERVICE_SLUG_TO_MENU_LABEL: Record<string, string> = {
  plumber: "Plumber",
  hvac: "HVAC",
  roofer: "Roofer",
  electrician: "Electrician",
  landscaping: "Landscaping",
  "pest-control": "Pest Control",
  "foundation-repair": "Foundation Repair",
  "house-cleaning": "House Cleaning",
};

/** One compact price/trust line per trade (planning context, not quotes). */
const NEIGHBORHOOD_DESC_LEAD: Record<string, string> = {
  plumber: "Georgetown plumbers: ~$100-175 service calls, ~$150-350 drain clears.",
  hvac: "Georgetown HVAC: ~$75-150 diagnostics; common repairs ~$150-400 before parts.",
  roofer: "Georgetown roofing: repairs often ~$300-800; many crews offer free inspections.",
  electrician: "Georgetown electricians: ~$100-175 calls; panel upgrades ~$1,500-4,000.",
  landscaping: "Georgetown landscaping: ~$40-80 mows; seasonal bed work ~$200-500.",
  "pest-control": "Georgetown pest control: ~$150-300 initial; quarterly plans ~$75-150.",
  "foundation-repair": "Georgetown foundation: many free contractor checks; repairs ~$4k-15k typical.",
  "house-cleaning": "Georgetown cleaning: ~$120-200 standard visits; deep cleans ~$200-350.",
};

/**
 * `<title>` segment before `| Georgetown Home Services` plus meta description (≤155).
 */
export function buildNeighborhoodServiceListingMeta(
  page: NeighborhoodServicePage,
): { titleSegment: string; description: string } {
  const label = SERVICE_SLUG_TO_MENU_LABEL[page.serviceSlug] ?? page.serviceName;
  const titleSegment = `${page.neighborhoodName} ${label} | Georgetown TX Home Services [${PRICING_YEAR}]`;
  const lead =
    NEIGHBORHOOD_DESC_LEAD[page.serviceSlug] ??
    "Compare planning ranges on the Georgetown service guide—not quotes.";
  const description = clipMetaDescription(
    `${lead} Vetted ${page.neighborhoodName} lists. Request 3 written quotes—no obligation.`,
  );
  return { titleSegment, description };
}

export function buildNeighborhoodHailMeta(page: NeighborhoodHailPage): {
  absoluteTitle: string;
  description: string;
} {
  const absoluteTitle = `${page.neighborhoodName} Hail Damage: What Georgetown TX Homeowners Need to Know in ${PRICING_YEAR}`;
  const description = clipMetaDescription(
    `May 2026 Williamson hail near ${page.neighborhoodName}: doc soft-metal dents, book roof walks early. Vetted Georgetown roofers—3 quotes, no obligation.`,
  );
  return { absoluteTitle, description };
}
