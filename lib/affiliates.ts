/**
 * Outbound partner URLs for Georgetown, TX quote CTAs.
 * Angi links use tracked CJ affiliate URLs from `lib/affiliateLinks.ts`.
 */

import { affiliateCategoryFromAngiSlug } from "./affiliate-category";
import { getAffiliateLink } from "./affiliateLinks";

/** Resolved tracked affiliate URL for interstitial / provider quote CTAs. */
export function angiGeorgetownListUrl(angiCategorySlug: string): string {
  return getAffiliateLink(affiliateCategoryFromAngiSlug(angiCategorySlug));
}

export const HOMEADVISOR_GEORGETOWN_URL =
  "https://www.homeadvisor.com/c.html?state=TX&city=Georgetown";

/** Generic Georgetown contractor quote partners for sitewide AffiliateCTA blocks. */
export const AFFILIATE_CTA_ANGI_URL = getAffiliateLink("default");
export const AFFILIATE_CTA_THUMBTACK_URL = "https://www.thumbtack.com/tx/georgetown/";
export const AFFILIATE_CTA_HOMEADVISOR_URL =
  "https://www.homeadvisor.com/c.Georgetown.TX.-12046.html";

/** Thumbtack category pages for Georgetown, TX (non-affiliate until Impact tag is live). */
export function thumbtackGeorgetownUrl(categoryPath: string): string {
  const segment = categoryPath.trim().replace(/^\/+|\/+$/g, "");
  return `https://www.thumbtack.com/tx/georgetown/${segment}/`;
}
