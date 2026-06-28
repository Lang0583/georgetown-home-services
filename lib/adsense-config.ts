/** Publisher ID for `adsbygoogle.js` and `data-ad-client` (format `ca-pub-…`). */
export const ADSENSE_PUBLISHER_ID =
  process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID?.trim() ||
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.trim() ||
  "ca-pub-2692091044925789";

/** @deprecated Use `ADSENSE_PUBLISHER_ID` — alias for existing imports. */
export const ADSENSE_CLIENT_ID = ADSENSE_PUBLISHER_ID;

/**
 * Create display ad units in AdSense, then set either a shared slot or separate slots.
 * If unset, ad components render nothing (safe for local dev).
 */
export const adsenseInlineSlot =
  process.env.NEXT_PUBLIC_ADSENSE_SLOT_INLINE?.trim() ||
  process.env.NEXT_PUBLIC_ADSENSE_SLOT?.trim() ||
  "";

export const adsenseSidebarSlot =
  process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR?.trim() ||
  process.env.NEXT_PUBLIC_ADSENSE_SLOT?.trim() ||
  "";

/** Display unit "GHS - Blog Post" (`/blog/[slug]` sidebar). Override via `NEXT_PUBLIC_ADSENSE_SLOT_BLOG_POST`. */
export const adsenseBlogPostSlot =
  process.env.NEXT_PUBLIC_ADSENSE_SLOT_BLOG_POST?.trim() || "3059695606";

/** Display unit "GHS - Best Of Page" (`/best/[slug]`). Override via `NEXT_PUBLIC_ADSENSE_SLOT_BEST_OF`. */
export const adsenseBestOfSlot =
  process.env.NEXT_PUBLIC_ADSENSE_SLOT_BEST_OF?.trim() || "7971086444";

/** Display unit "GHS - Service Page" (`/services/[slug]`). Override via `NEXT_PUBLIC_ADSENSE_SLOT_SERVICE`. */
export const adsenseServiceMainSlot =
  process.env.NEXT_PUBLIC_ADSENSE_SLOT_SERVICE?.trim() || "9450125974";

/** Display unit "service-page-top" — below H1 on core `/services/[slug]` guides. Override via `NEXT_PUBLIC_ADSENSE_SLOT_SERVICE_PAGE_TOP`. */
export const adsenseServicePageTopSlot =
  process.env.NEXT_PUBLIC_ADSENSE_SLOT_SERVICE_PAGE_TOP?.trim() || "5422703282";

/** @deprecated Mid-post placement removed; blog display unit is sidebar-only (`adsenseBlogPostSlot`). */
export const adsenseBlogMidPostSlot =
  process.env.NEXT_PUBLIC_ADSENSE_SLOT_BLOG_MID_POST?.trim() || "";

/** Display unit "neighborhood-page-inline" — mid-page on `/neighborhoods/*`. Override via `NEXT_PUBLIC_ADSENSE_SLOT_NEIGHBORHOOD_INLINE`. */
export const adsenseNeighborhoodPageInlineSlot =
  process.env.NEXT_PUBLIC_ADSENSE_SLOT_NEIGHBORHOOD_INLINE?.trim() || "4109621613";
