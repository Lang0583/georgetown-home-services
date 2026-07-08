import { PROVIDERS_LAST_VERIFIED, PROVIDERS_VERIFIED_ISO_DATE } from "@/data/providers";
import { formatLicenseLookupDate } from "./provider-license";

export const LISTING_METHODOLOGY_PATH = "/methodology" as const;

/** Minimum public Google signals for default Best Of inclusion (see inclusion criteria). */
export const LISTING_MIN_GOOGLE_RATING = 4.5;
export const LISTING_MIN_GOOGLE_REVIEWS = 25;

/**
 * Five inclusion criteria shown on every `/best` directory block and the methodology page.
 * Import this list everywhere — do not duplicate the strings.
 */
export const LISTING_INCLUSION_CRITERIA = [
  `${LISTING_MIN_GOOGLE_RATING}+ Google rating`,
  `${LISTING_MIN_GOOGLE_REVIEWS}+ reviews`,
  "Active Georgetown-area service",
  "Working phone",
  `Licensed trades verified against TSBPE / TDLR / TDA SPCS public databases as of ${PROVIDERS_LAST_VERIFIED}`,
] as const;

export type ListingDataSource = {
  name: string;
  description: string;
};

/** Primary public sources used to build and verify directory listings. */
export const LISTING_DATA_SOURCES: readonly ListingDataSource[] = [
  {
    name: "Google Business profiles",
    description:
      "Business name, phone, website, service-area language, star rating, and review count from public Google Business listings. We use these fields to confirm the company serves Georgetown / Williamson County and meets the review thresholds below.",
  },
  {
    name: "Texas State Board of Plumbing Examiners (TSBPE)",
    description:
      "Public plumbing license lookups for companies where a license number is shown on a provider card.",
  },
  {
    name: "Texas Department of Licensing and Regulation (TDLR)",
    description:
      "Public electrical contractor and HVAC / ACR license lookups where license fields appear on a card.",
  },
  {
    name: "Texas Department of Agriculture — Structural Pest Control Service (TDA SPCS)",
    description:
      "Public pest-control license and business registration lookups where license fields appear on a card.",
  },
] as const;

/** Plain-language independence statements for methodology and trust pages. */
export const LISTING_PLACEMENT_CANNOT_BE_BOUGHT =
  "Directory placement cannot be bought. Companies do not pay to appear, move up, or stay on a Best Of shortlist.";

export const LISTING_AFFILIATE_DOES_NOT_AFFECT_RANKINGS =
  "Affiliate links, sponsored modules, and display advertising do not affect directory rankings or the order of organic provider cards.";

/** How often listings are reviewed (batch cadence + last verified label). */
export const LISTINGS_REVIEW_CADENCE_SUMMARY = `Provider shortlists are batch-reviewed when directory copy changes, after major local weather events, or when readers submit verifiable corrections. Listings were last verified ${PROVIDERS_LAST_VERIFIED}. We do not real-time scrape every profile—confirm phones, licensing, and insurance at booking time.`;

/** License verification note paired with provider cards on `/best` routes. */
export function listingLicenseVerificationNote(): string {
  const verifiedLabel = formatLicenseLookupDate(PROVIDERS_VERIFIED_ISO_DATE);
  return `Where a license number appears on a card, it was checked against public Texas registries—TSBPE for plumbing, TDLR for electrical and HVAC/ACR, and TDA SPCS for pest control—on ${verifiedLabel}. Roofing, landscaping, foundation, and cleaning listings note that Texas does not license those trades at the state level.`;
}
