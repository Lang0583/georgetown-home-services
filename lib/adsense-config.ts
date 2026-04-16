/** Matches `app/layout.tsx` AdSense loader; override per env in production if needed. */
export const ADSENSE_CLIENT_ID =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.trim() || "ca-pub-2692091044925789";

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
