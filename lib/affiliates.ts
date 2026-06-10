/**
 * Outbound partner URLs for Georgetown, TX (non-affiliate Angi directory lists + HomeAdvisor).
 * Used by exit interstitial and future CTAs.
 */

// TODO: Replace with Impact affiliate tracking URL once approved
// Apply at: https://app.impact.com — search "Angi" in marketplace
const ANGI_GEORGETOWN_PLUMBING = "https://www.angi.com/companylist/us/tx/georgetown/plumbing.htm";

// TODO: Replace with Impact affiliate tracking URL once approved
// Apply at: https://app.impact.com — search "Angi" in marketplace
const ANGI_GEORGETOWN_HVAC = "https://www.angi.com/companylist/us/tx/georgetown/hvac-contractors.htm";

// TODO: Replace with Impact affiliate tracking URL once approved
// Apply at: https://app.impact.com — search "Angi" in marketplace
const ANGI_GEORGETOWN_ROOFING = "https://www.angi.com/companylist/us/tx/georgetown/roofing.htm";

// TODO: Replace with Impact affiliate tracking URL once approved
// Apply at: https://app.impact.com — search "Angi" in marketplace
const ANGI_GEORGETOWN_ELECTRICAL = "https://www.angi.com/companylist/us/tx/georgetown/electricians.htm";

// TODO: Replace with Impact affiliate tracking URL once approved
// Apply at: https://app.impact.com — search "Angi" in marketplace
const ANGI_GEORGETOWN_LANDSCAPING = "https://www.angi.com/companylist/us/tx/georgetown/landscaping.htm";

// TODO: Replace with Impact affiliate tracking URL once approved
// Apply at: https://app.impact.com — search "Angi" in marketplace
const ANGI_GEORGETOWN_PEST = "https://www.angi.com/companylist/us/tx/georgetown/pest-control.htm";

// TODO: Replace with Impact affiliate tracking URL once approved
// Apply at: https://app.impact.com — search "Angi" in marketplace
const ANGI_GEORGETOWN_FOUNDATION = "https://www.angi.com/companylist/us/tx/georgetown/foundation-repair.htm";

// TODO: Replace with Impact affiliate tracking URL once approved
// Apply at: https://app.impact.com — search "Angi" in marketplace
const ANGI_GEORGETOWN_CLEANING = "https://www.angi.com/companylist/us/tx/georgetown/house-cleaning.htm";

// TODO: Replace with Impact affiliate tracking URL once approved
// Apply at: https://app.impact.com — search "Angi" in marketplace
const ANGI_GEORGETOWN_GENERAL = "https://www.angi.com/companylist/us/tx/georgetown/home-improvement.htm";

/**
 * Maps {@link import("./exit-interstitial").EXIT_INTERSTITIAL_ANGI_SLUG | Angi category slug} → live list URL.
 * Unknown slugs fall back to the general Georgetown home-improvement list.
 */
const ANGI_GEORGETOWN_BY_CATEGORY_SLUG: Record<string, string> = {
  plumbing: ANGI_GEORGETOWN_PLUMBING,
  hvac: ANGI_GEORGETOWN_HVAC,
  roofing: ANGI_GEORGETOWN_ROOFING,
  electrical: ANGI_GEORGETOWN_ELECTRICAL,
  landscaping: ANGI_GEORGETOWN_LANDSCAPING,
  "pest-control": ANGI_GEORGETOWN_PEST,
  "foundation-repair": ANGI_GEORGETOWN_FOUNDATION,
  "house-cleaning": ANGI_GEORGETOWN_CLEANING,
  home: ANGI_GEORGETOWN_GENERAL,
};

/** Resolved Angi company-list URL for interstitial / CTAs (Georgetown, TX). */
export function angiGeorgetownListUrl(angiCategorySlug: string): string {
  const key = angiCategorySlug.trim().toLowerCase();
  return ANGI_GEORGETOWN_BY_CATEGORY_SLUG[key] ?? ANGI_GEORGETOWN_GENERAL;
}

// TODO: Replace with Impact affiliate tracking URL once approved
// Apply at: https://app.impact.com — search "Angi" or partner name in marketplace
export const HOMEADVISOR_GEORGETOWN_URL =
  "https://www.homeadvisor.com/c.html?state=TX&city=Georgetown";

/** Thumbtack category pages for Georgetown, TX (non-affiliate until Impact tag is live). */
export function thumbtackGeorgetownUrl(categoryPath: string): string {
  const segment = categoryPath.trim().replace(/^\/+|\/+$/g, "");
  return `https://www.thumbtack.com/tx/georgetown/${segment}/`;
}
