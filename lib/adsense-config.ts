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
    process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID?.trim() ||
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
 *
 * Accepts any of the supported publisher-ID env names so a single opt-in flag
 * controls both the bootstrap script and per-page ad units.
 */
export const ADSENSE_UNITS_ENABLED = Boolean(
  process.env.NEXT_PUBLIC_ADSENSE_ID?.trim() ||
    process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID?.trim() ||
    process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID?.trim() ||
    process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.trim(),
);

/**
 * Sentinel value used in slot getters before real AdSense unit IDs are minted.
 * `<AdUnit>` short-circuits on this value so the placeholder never reaches
 * `adsbygoogle.push()`. Swap with the real numeric slot from the AdSense
 * dashboard (Ad units → Display ads → copy the `data-ad-slot` value).
 */
export const ADSENSE_SLOT_PLACEHOLDER = "SLOT_ID_PLACEHOLDER";

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

/**
 * Below-H1 horizontal banner on every service page.
 * Real AdSense slot id: 5729200328.
 * Override via `NEXT_PUBLIC_ADSENSE_SLOT_SERVICE_HERO`.
 */
export const adsenseServiceHeroSlot =
  process.env.NEXT_PUBLIC_ADSENSE_SLOT_SERVICE_HERO?.trim() || "5729200328";

/**
 * Rectangle between the AffiliateCTA and the provider listings on service
 * pages. Real AdSense slot id: 8458892759 (in-content rectangle).
 * Override via `NEXT_PUBLIC_ADSENSE_SLOT_SERVICE_INTERSTITIAL`.
 */
export const adsenseServiceAffiliateInterstitialSlot =
  process.env.NEXT_PUBLIC_ADSENSE_SLOT_SERVICE_INTERSTITIAL?.trim() || "8458892759";

/**
 * Horizontal banner on the homepage between "Browse by Category" and
 * "Top Local Providers". Real AdSense slot id: 8872001893.
 * Override via `NEXT_PUBLIC_ADSENSE_SLOT_HOME_MID`.
 */
export const adsenseHomeMidSlot =
  process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME_MID?.trim() || "8872001893";

/**
 * Rectangle between the intro / methodology callout and the provider list on
 * Best Of pages. Reuses the in-content rectangle slot (8458892759) until a
 * dedicated slot is minted. Override via `NEXT_PUBLIC_ADSENSE_SLOT_BEST_OF_INTRO`.
 */
export const adsenseBestOfIntroSlot =
  process.env.NEXT_PUBLIC_ADSENSE_SLOT_BEST_OF_INTRO?.trim() || "8458892759";
