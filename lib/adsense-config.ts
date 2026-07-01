/** @deprecated Import from `lib/adConfig` for page placements; kept for existing imports. */
export {
  ADSENSE_PUBLISHER_ID,
  blogPostAdSlot as adsenseBlogPostSlot,
  bestOfAdSlot as adsenseBestOfSlot,
} from "./adConfig";

/** @deprecated Use `ADSENSE_PUBLISHER_ID` — alias for existing imports. */
export { ADSENSE_PUBLISHER_ID as ADSENSE_CLIENT_ID } from "./adConfig";

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

/** Display unit "GHS - Service Page" (`/services/[slug]`). Override via `NEXT_PUBLIC_ADSENSE_SLOT_SERVICE`. */
export const adsenseServiceMainSlot =
  process.env.NEXT_PUBLIC_ADSENSE_SLOT_SERVICE?.trim() || "9450125974";

/** Display unit "service-page-top" — below H1 on core `/services/[slug]` guides. Override via `NEXT_PUBLIC_ADSENSE_SLOT_SERVICE_PAGE_TOP`. */
export const adsenseServicePageTopSlot =
  process.env.NEXT_PUBLIC_ADSENSE_SLOT_SERVICE_PAGE_TOP?.trim() || "5422703282";

/** @deprecated Mid-post placement removed; blog display unit is inline after first section (`adsenseBlogPostSlot`). */
export const adsenseBlogMidPostSlot =
  process.env.NEXT_PUBLIC_ADSENSE_SLOT_BLOG_MID_POST?.trim() || "";

/** Display unit "neighborhood-page-inline" — mid-page on `/neighborhoods/*`. Override via `NEXT_PUBLIC_ADSENSE_SLOT_NEIGHBORHOOD_INLINE`. */
export const adsenseNeighborhoodPageInlineSlot =
  process.env.NEXT_PUBLIC_ADSENSE_SLOT_NEIGHBORHOOD_INLINE?.trim() || "4109621613";
