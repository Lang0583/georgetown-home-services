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

/** Optional: slot after provider lists on Best Of pages (falls back to inline slot). */
export const adsenseBestOfSlot =
  process.env.NEXT_PUBLIC_ADSENSE_SLOT_BEST_OF?.trim() || adsenseInlineSlot;

/** Optional: main-column slot on service guide pages after intro (falls back to inline slot). */
export const adsenseServiceMainSlot =
  process.env.NEXT_PUBLIC_ADSENSE_SLOT_SERVICE?.trim() || adsenseInlineSlot;
