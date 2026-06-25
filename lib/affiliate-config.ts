/** Affiliate landing pages (outbound CTAs). Use with `rel="nofollow sponsored"` and GA4 `affiliate_click`. */
export const AFFILIATE_ANGI_URL = "https://www.angi.com";
export const AFFILIATE_THUMBTACK_URL = "https://www.thumbtack.com";
export const AFFILIATE_HOMEADVISOR_URL = "https://www.homeadvisor.com/";

/**
 * Georgetown-localized affiliate URLs for the multi-partner CTA card.
 * These deep-link into each partner's Georgetown TX directory page when
 * available so the outbound experience matches the on-page promise.
 */
export const AFFILIATE_GEORGETOWN_URLS = {
  angi: "https://www.angi.com/companylist/us/tx/georgetown/home-services-contractors.htm",
  thumbtack: "https://www.thumbtack.com/tx/georgetown/",
  homeadvisor: AFFILIATE_HOMEADVISOR_URL,
} as const;
