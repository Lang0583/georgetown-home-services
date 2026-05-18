/**
 * Google AdSense — publisher ID from env, or the live default in production only.
 *
 * - **Production** (e.g. Vercel `VERCEL_ENV=production`): uses env if set, otherwise
 *   `ca-pub-2692091044925789` (same as `public/ads.txt`). Preview deployments stay off unless
 *   you set `NEXT_PUBLIC_ADSENSE_ID`.
 * - **Local dev** (`next dev`): ads stay off unless you set `NEXT_PUBLIC_ADSENSE_ID` in `.env.local`.
 */

const ADSENSE_PUBLISHER_ID_PRODUCTION_DEFAULT = "ca-pub-2692091044925789";

function resolveAdsensePublisherId(): string {
  const fromEnv =
    process.env.NEXT_PUBLIC_ADSENSE_ID?.trim() ||
    process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID?.trim() ||
    process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.trim() ||
    "";
  if (fromEnv) return fromEnv;
  if (process.env.NODE_ENV !== "production") return "";
  // Vercel: only inject default on the production domain, not preview deployments.
  const vercelEnv = process.env.VERCEL_ENV;
  if (vercelEnv && vercelEnv !== "production") return "";
  return ADSENSE_PUBLISHER_ID_PRODUCTION_DEFAULT;
}

export const ADSENSE_PUBLISHER_ID = resolveAdsensePublisherId();

/** True when a publisher ID is resolved — controls `<head>` script + meta. */
export const ADSENSE_ACTIVE = Boolean(ADSENSE_PUBLISHER_ID);

/**
 * Display units (`<AdUnit>` / `AdSenseDisplay`) only when this env is set — keeps ads off
 * local dev, preview deploys, and staging unless you explicitly opt in.
 */
export const ADSENSE_UNITS_ENABLED = Boolean(process.env.NEXT_PUBLIC_ADSENSE_ID?.trim());

/** @deprecated Use `ADSENSE_PUBLISHER_ID` (from `NEXT_PUBLIC_ADSENSE_ID`). */
export const ADSENSE_CLIENT_ID = ADSENSE_PUBLISHER_ID;

/**
 * Create display ad units in AdSense, then set either a shared slot or separate slots.
 * If unset, ad wrappers still render nothing when `ADSENSE_UNITS_ENABLED` is false or slots are empty.
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
  process.env.NEXT_PUBLIC_ADSENSE_SLOT_BLOG_POST?.trim() || "1763207646";

/** Display unit "GHS - Best Of Page" (`/best/[slug]`). Override via `NEXT_PUBLIC_ADSENSE_SLOT_BEST_OF`. */
export const adsenseBestOfSlot =
  process.env.NEXT_PUBLIC_ADSENSE_SLOT_BEST_OF?.trim() || "7971086444";

/** Display unit "GHS - Service Page" (`/services/[slug]`). Override via `NEXT_PUBLIC_ADSENSE_SLOT_SERVICE`. */
export const adsenseServiceMainSlot =
  process.env.NEXT_PUBLIC_ADSENSE_SLOT_SERVICE?.trim() || "9450125974";
