/**
 * Google AdSense slot configuration.
 *
 * Units stay hidden until you paste numeric slot IDs from AdSense → Ads → By ad unit
 * into the constants below (or set the matching NEXT_PUBLIC_* env vars).
 */
export const ADSENSE_PUBLISHER_ID =
  process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID?.trim() ||
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.trim() ||
  "ca-pub-2692091044925789";

/** After the first content section on `/blog/[slug]`. */
export const blogPostAdSlot =
  process.env.NEXT_PUBLIC_ADSENSE_SLOT_BLOG_POST?.trim() || "3059695606";

/** Mid-page on `/costs/[slug]`. */
export const costGuideAdSlot =
  process.env.NEXT_PUBLIC_ADSENSE_SLOT_COST_GUIDE?.trim() ||
  process.env.NEXT_PUBLIC_ADSENSE_SLOT_INLINE?.trim() ||
  "";

/** After the provider list on `/best/[slug]`. */
export const bestOfAdSlot =
  process.env.NEXT_PUBLIC_ADSENSE_SLOT_BEST_OF?.trim() || "7971086444";
