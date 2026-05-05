import raw from "./businesses.json";
import providerOverridesRaw from "../data/provider-overrides.json";
import directoryConfigRaw from "../data/directory-config.json";

export type ProviderGroup =
  | "plumber"
  | "hvac"
  | "roofer"
  | "electrician"
  | "landscaping"
  | "pest_control"
  | "foundation_repair"
  | "house_cleaning";

export type Business = {
  name: string;
  category: string;
  type: string;
  /** Display format, e.g. "(512) 555-1234" (not stripped). Omit when unknown. */
  phone?: string;
  website: string;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  rating: number;
  reviews: number;
  location_link: string;
  description?: string;
  /**
   * Optional overlay fields to support future monetization and expanded profiles
   * without altering the core provider dataset.
   */
  directory?: DirectoryListingMeta;
};

const businesses: Business[] = raw as Business[];

const BEST_SLUG_MAP: Record<string, ProviderGroup> = {
  "best-plumbers-georgetown-tx": "plumber",
  "top-hvac-companies-georgetown-tx": "hvac",
  "best-roofers-georgetown-tx": "roofer",
  "best-electricians-georgetown-tx": "electrician",
  "best-landscaping-companies-georgetown-tx": "landscaping",
  "best-pest-control-georgetown-tx": "pest_control",
  "best-foundation-repair-georgetown-tx": "foundation_repair",
  "best-house-cleaning-services-georgetown-tx": "house_cleaning",
};

const SERVICE_SLUG_MAP: Record<string, ProviderGroup> = {
  "plumber-georgetown-tx": "plumber",
  "hvac-georgetown-tx": "hvac",
  "roofer-georgetown-tx": "roofer",
  "electrician-georgetown-tx": "electrician",
  "landscaping-georgetown-tx": "landscaping",
  "pest-control-georgetown-tx": "pest_control",
  "foundation-repair-georgetown-tx": "foundation_repair",
  "house-cleaning-georgetown-tx": "house_cleaning",
};

const PROVIDER_GROUP_TO_SERVICE_SLUG: Record<ProviderGroup, string> = {
  plumber: "plumber-georgetown-tx",
  hvac: "hvac-georgetown-tx",
  roofer: "roofer-georgetown-tx",
  electrician: "electrician-georgetown-tx",
  landscaping: "landscaping-georgetown-tx",
  pest_control: "pest-control-georgetown-tx",
  foundation_repair: "foundation-repair-georgetown-tx",
  house_cleaning: "house-cleaning-georgetown-tx",
};

/** Section heading on service pages when listing JSON providers. */
export const PROVIDER_SECTION_HEADING: Record<ProviderGroup, string> = {
  plumber: "Top Plumbers Serving Georgetown TX",
  hvac: "Top HVAC Companies Serving Georgetown TX",
  roofer: "Top Roofers Serving Georgetown TX",
  electrician: "Top Electricians Serving Georgetown TX",
  landscaping: "Top Landscaping & Lawn Care Companies Serving Georgetown TX",
  pest_control: "Top Pest Control Companies Serving Georgetown TX",
  foundation_repair: "Top Foundation Repair Companies Serving Georgetown TX",
  house_cleaning: "Top House Cleaning Services Serving Georgetown TX",
};

/** Primary CTA label on service pages → best-of directory. */
export const BEST_CTA_LABEL_BY_GROUP: Record<ProviderGroup, string> = {
  plumber: "Compare Georgetown Plumbers",
  hvac: "See Top HVAC Companies",
  roofer: "Browse Roof Repair Options",
  electrician: "Compare Georgetown Electricians",
  landscaping: "Compare Landscaping Companies",
  pest_control: "Compare Pest Control Providers",
  foundation_repair: "Compare Foundation Repair Companies",
  house_cleaning: "Compare House Cleaning Services",
};

/** Homepage / nav: service and best-of paths per trade. */
export const PROVIDER_GROUP_LINKS: Record<ProviderGroup, { service: string; best: string }> = {
  plumber: { service: "/services/plumber-georgetown-tx", best: "/best/best-plumbers-georgetown-tx" },
  hvac: { service: "/services/hvac-georgetown-tx", best: "/best/top-hvac-companies-georgetown-tx" },
  roofer: { service: "/services/roofer-georgetown-tx", best: "/best/best-roofers-georgetown-tx" },
  electrician: { service: "/services/electrician-georgetown-tx", best: "/best/best-electricians-georgetown-tx" },
  landscaping: { service: "/services/landscaping-georgetown-tx", best: "/best/best-landscaping-companies-georgetown-tx" },
  pest_control: { service: "/services/pest-control-georgetown-tx", best: "/best/best-pest-control-georgetown-tx" },
  foundation_repair: { service: "/services/foundation-repair-georgetown-tx", best: "/best/best-foundation-repair-georgetown-tx" },
  house_cleaning: { service: "/services/house-cleaning-georgetown-tx", best: "/best/best-house-cleaning-services-georgetown-tx" },
};

/** Map the category field (substring match) to a provider group — same rules as the homepage. */
export function normalizeBusinessGroup(b: Business): ProviderGroup | null {
  const s = b.category.toLowerCase();
  if (s.includes("plumb")) return "plumber";
  if (s.includes("hvac") || s.includes("air conditioning") || s.includes("heating")) return "hvac";
  if (s.includes("roof")) return "roofer";
  if (s.includes("electric")) return "electrician";
  if (s.includes("landscape") || s.includes("lawn")) return "landscaping";
  if (s.includes("pest")) return "pest_control";
  if (s.includes("foundation")) return "foundation_repair";
  if (s.includes("clean")) return "house_cleaning";
  return null;
}

/** Shown on best-of pages next to business listings. */
/**
 * Listings sourced from publicly available business profiles (each provider's
 * own website plus public profiles on Google Maps, Yelp, BBB, and the
 * Georgetown Chamber of Commerce). Names, addresses, phone numbers, and
 * websites were verified directly against the provider's listing on the
 * date below. Ratings and review counts are public-snapshot approximations
 * and should be re-verified periodically — refresh by re-running the
 * verification pass and bumping this constant.
 */
export const BUSINESS_LISTINGS_LAST_UPDATED = "April 28, 2026";

/**
 * Provider listing quality thresholds.
 *
 * Goal: avoid presenting low-signal providers (few reviews or minimal documentation)
 * as equal to well-documented, established companies.
 */
/** Public GBP snapshots: treat 20+ reviews as sufficient to list as an “established” pick (re-verify periodically). */
export const PROVIDER_MIN_ESTABLISHED_REVIEWS = 20;
export const PROVIDER_HIGH_REVIEW_VOLUME = 200;

export type ProviderQualityTier = "established" | "lower_signal";

export type ExpandedProviderProfile = {
  /** One-line editorial summary override. */
  shortDescription?: string;
  /** Longer profile notes for future expanded views. */
  profileSummary?: string;
  specialties?: string[];
  serviceAreas?: string[];
  licenseNote?: string;
  insuranceNote?: string;
  hoursNote?: string;
  financingNote?: string;
};

export type DirectoryListingMeta = {
  /** True when this listing is paid placement. Must be labeled on the frontend. */
  sponsored?: boolean;
  /** True when this listing is featured placement (paid or editorial). Must be labeled on the frontend. */
  featured?: boolean;
  /** Badge label shown on the card (e.g., "Sponsored", "Featured"). */
  sponsorBadgeLabel?: string;
  /** Optional disclosure line for future dedicated blocks. */
  sponsorDisclosureText?: string;
  /** Expanded profile fields (safe to add over time). */
  profile?: ExpandedProviderProfile;
  /**
   * Organic ordering hint within a category (lower is earlier).
   * Separate from sponsorship logic.
   */
  organicPriority?: number;
};

type ProviderOverridesFile = Record<
  string,
  {
    directory?: DirectoryListingMeta;
    profile?: ExpandedProviderProfile; // convenience alias for directory.profile
  }
>;

type DirectoryConfigFile = {
  categoryPriorityOrdering?: Partial<Record<ProviderGroup, string[]>>;
};

const providerOverrides = providerOverridesRaw as ProviderOverridesFile;
const directoryConfig = directoryConfigRaw as DirectoryConfigFile;

export type ProviderBadgeKey =
  | "high_review_volume"
  | "georgetown_office"
  | "repair_focused"
  | "replacement_focused"
  | "emergency_availability"
  | "map_only_profile"
  | "featured"
  | "sponsored";

export type ProviderBadge = { key: ProviderBadgeKey; label: string };

function includesAny(haystack: string, needles: string[]) {
  const h = haystack.toLowerCase();
  return needles.some((n) => h.includes(n));
}

function trimStr(s: string | undefined): string {
  return (s ?? "").trim();
}

function toAsciiKey(input: string) {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s.-]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function safeHostFromUrl(rawUrl: string | undefined): string | null {
  const u = normalizeOutboundHref(rawUrl);
  if (!u) return null;
  try {
    return new URL(u).hostname.toLowerCase();
  } catch {
    return null;
  }
}

/**
 * Stable identifier used to attach overlay metadata (sponsored flags, expanded profiles, ordering).
 * Key format: name|city|host
 */
export function getBusinessId(b: Business): string {
  const host = safeHostFromUrl(b.website) ?? safeHostFromUrl(b.location_link) ?? "";
  return `${toAsciiKey(b.name)}|${toAsciiKey(b.city)}|${toAsciiKey(host)}`;
}

function applyDirectoryOverlay(b: Business, group: ProviderGroup): Business {
  const id = getBusinessId(b);
  const o = providerOverrides[id];
  const categoryOrder = directoryConfig.categoryPriorityOrdering?.[group] ?? [];
  const orderIdx = categoryOrder.indexOf(id);
  const organicPriorityFromCategory = orderIdx >= 0 ? orderIdx : undefined;

  const meta: DirectoryListingMeta | undefined =
    o?.directory || o?.profile || organicPriorityFromCategory !== undefined
      ? {
          ...(o?.directory ?? {}),
          profile: { ...(o?.directory?.profile ?? {}), ...(o?.profile ?? {}) },
          organicPriority:
            typeof o?.directory?.organicPriority === "number"
              ? o.directory.organicPriority
              : typeof organicPriorityFromCategory === "number"
                ? organicPriorityFromCategory
                : undefined,
        }
      : undefined;

  if (!meta) return b;
  return { ...b, directory: { ...(b.directory ?? {}), ...meta } };
}

export function hasGeorgetownOfficeSignal(b: Business): boolean {
  const city = trimStr(b.city).toLowerCase();
  if (city === "georgetown") return true;
  const addr = trimStr(b.address).toLowerCase();
  return addr.includes("georgetown") && addr.includes("tx");
}

/**
 * Parse a raw URL string into a safe http(s) href, or null if invalid.
 * Adds https:// when the scheme is missing (for hostnames like www.example.com).
 */
function parseHttpUrl(raw: string): URL | null {
  const t = trimStr(raw);
  if (!t) return null;
  let candidate = t;
  if (!/^https?:\/\//i.test(candidate)) {
    candidate = candidate.replace(/^\/\//, "");
    if (/^[a-z][a-z0-9+.-]*:\/\//i.test(candidate)) return null;
    candidate = `https://${candidate}`;
  }
  try {
    const u = new URL(candidate);
    if (u.protocol !== "http:" && u.protocol !== "https:") return null;
    if (!u.hostname) return null;
    const h = u.hostname;
    if (h !== "localhost" && !h.includes(".")) return null;
    return u;
  } catch {
    return null;
  }
}

/** Normalized https/http href, or null if missing or not a usable outbound URL. */
export function normalizeOutboundHref(raw: string | undefined): string | null {
  const u = parseHttpUrl(trimStr(raw));
  return u ? u.href : null;
}

/**
 * True when the URL is almost certainly a Google Maps / Places listing, not a company homepage.
 * Used so we never label a maps URL as “Visit Website” or prefer it over a proper location_link.
 */
export function isLikelyMapsListingUrl(href: string): boolean {
  try {
    const u = new URL(href);
    const h = u.hostname.toLowerCase();
    const p = u.pathname.toLowerCase();
    if (h === "maps.app.goo.gl" || h.endsWith(".goo.gl")) return true;
    if (h === "g.page" || h.endsWith(".g.page")) return true;
    if (h.includes("google.") && (p.includes("/maps") || p.includes("/local/"))) return true;
    if (h === "maps.google.com") return true;
    return false;
  } catch {
    return false;
  }
}

/**
 * Generic Yelp category search (not a specific business profile). Never treat as the company homepage.
 */
export function isGenericYelpSearchUrl(href: string): boolean {
  try {
    const u = new URL(href);
    const h = u.hostname.toLowerCase().replace(/^www\./, "");
    if (h !== "yelp.com" && !h.endsWith(".yelp.com")) return false;
    return u.pathname.toLowerCase().includes("/search");
  } catch {
    return false;
  }
}

/** Valid company website URL (https added if needed), or null if missing/invalid or maps listing URL. */
export function getBusinessWebsiteUrl(b: Business): string | null {
  const n = normalizeOutboundHref(b.website);
  if (!n || isLikelyMapsListingUrl(n) || isGenericYelpSearchUrl(n)) return null;
  return n;
}

/**
 * Valid maps / Google listing URL: prefers `location_link`, otherwise a maps-style URL mistakenly stored in `website`.
 */
export function getBusinessMapsUrl(b: Business): string | null {
  const loc = normalizeOutboundHref(b.location_link);
  if (loc) return loc;
  const web = normalizeOutboundHref(b.website);
  if (web && isLikelyMapsListingUrl(web)) return web;
  return null;
}

/**
 * Best single outbound link: prefer a valid website, else a valid location/map link.
 * Use for primary “open external resource” actions (e.g. linked business name).
 */
export function getBusinessOutboundUrl(b: Business): string | null {
  return getBusinessWebsiteUrl(b) ?? getBusinessMapsUrl(b);
}

/** User-facing label for outbound links to a company website. */
export const BUSINESS_LINK_VISIT_WEBSITE = "Visit Website";

/** User-facing label for outbound links to a Google Maps listing (or other map URL). */
export const BUSINESS_LINK_VIEW_ON_GOOGLE_MAPS = "View on Google Maps";

/** Spread onto `<a>` for every outbound business website or Google Maps link. */
export const externalBusinessLinkProps = {
  target: "_blank" as const,
  rel: "noopener noreferrer",
} as const;

/** @deprecated Prefer getBusinessOutboundUrl for links; kept for non-link keys. */
export function businessPrimaryUrl(b: Business): string {
  return getBusinessOutboundUrl(b) ?? "";
}

const VALID_PROVIDER_GROUPS = new Set<string>([
  "plumber",
  "hvac",
  "roofer",
  "electrician",
  "landscaping",
  "pest_control",
  "foundation_repair",
  "house_cleaning",
]);

export function getBusinessesByCategory(category: string): Business[] {
  const target = category.toLowerCase();
  if (!VALID_PROVIDER_GROUPS.has(target)) return [];
  const group = target as ProviderGroup;
  const merged = businesses
    .filter((b) => normalizeBusinessGroup(b) === group)
    .map((b) => applyDirectoryOverlay(b, group));

  // Organic ordering: optional category ordering hint, then rating/reviews.
  merged.sort((a, b) => {
    const ap = a.directory?.organicPriority;
    const bp = b.directory?.organicPriority;
    if (typeof ap === "number" || typeof bp === "number") {
      const aVal = typeof ap === "number" ? ap : Number.POSITIVE_INFINITY;
      const bVal = typeof bp === "number" ? bp : Number.POSITIVE_INFINITY;
      if (aVal !== bVal) return aVal - bVal;
    }
    if (b.rating !== a.rating) return b.rating - a.rating;
    return b.reviews - a.reviews;
  });

  return merged;
}

export function hasBusinessRatingData(b: Business): boolean {
  return b.rating > 0 || b.reviews > 0;
}

export function isMapOnlyProviderProfile(b: Business): boolean {
  const website = getBusinessWebsiteUrl(b);
  const maps = getBusinessMapsUrl(b);
  // "Map-only" means they have a listing link but no distinct company website.
  return Boolean(maps) && !website;
}

export function getProviderQualityTier(b: Business): ProviderQualityTier {
  // Treat map-only profiles as lower-signal even with high reviews.
  // (Requirement: do not present map-only providers as equal to better documented providers.)
  if (isMapOnlyProviderProfile(b)) return "lower_signal";

  if (!hasBusinessRatingData(b)) return "lower_signal";
  if (b.reviews < PROVIDER_MIN_ESTABLISHED_REVIEWS) return "lower_signal";

  return "established";
}

export function getProviderBadges(b: Business): ProviderBadge[] {
  const badges: ProviderBadge[] = [];

  if (b.directory?.sponsored) {
    badges.push({ key: "sponsored", label: b.directory.sponsorBadgeLabel?.trim() || "Sponsored" });
  } else if (b.directory?.featured) {
    badges.push({ key: "featured", label: b.directory.sponsorBadgeLabel?.trim() || "Featured" });
  }

  if (b.reviews >= PROVIDER_HIGH_REVIEW_VOLUME) {
    badges.push({ key: "high_review_volume", label: "High review volume" });
  }
  if (hasGeorgetownOfficeSignal(b)) {
    badges.push({ key: "georgetown_office", label: "Georgetown office" });
  }

  const desc = trimStr(b.description);
  if (desc) {
    if (includesAny(desc, ["emergency", "24/7", "after-hours", "same-day"])) {
      badges.push({ key: "emergency_availability", label: "Emergency availability" });
    }
    if (includesAny(desc, ["repair", "leak", "clog", "diagnos", "fix", "tarp", "patch", "service call"])) {
      badges.push({ key: "repair_focused", label: "Repair-focused" });
    }
    if (includesAny(desc, ["replace", "replacement", "install", "change-out", "re-roof", "tear-off", "new system"])) {
      badges.push({ key: "replacement_focused", label: "Replacement-focused" });
    }
  }

  if (isMapOnlyProviderProfile(b)) {
    badges.push({ key: "map_only_profile", label: "Map listing only" });
  }

  return badges;
}

export function generateBusinessDescription(b: Business): string {
  const g = normalizeBusinessGroup(b);
  const service =
    g === "plumber"
      ? "plumbing"
      : g === "hvac"
        ? "heating and cooling"
        : g === "roofer"
          ? "roofing"
          : g === "electrician"
            ? "electrical work"
            : g === "landscaping"
              ? "landscaping and lawn care"
              : g === "pest_control"
                ? "pest control"
                : g === "foundation_repair"
                  ? "foundation repair"
                  : g === "house_cleaning"
                    ? "house cleaning"
                    : "home services";
  return `${b.name} focuses on ${service} for homes and businesses around Georgetown and nearby communities. Listings are provided for research; confirm licensing, availability, and scope of work before hiring.`;
}

export function getBusinessCategoryForBestSlug(slug: string): ProviderGroup | null {
  return BEST_SLUG_MAP[slug] ?? null;
}

export function getBusinessCategoryForServiceSlug(slug: string): ProviderGroup | null {
  return SERVICE_SLUG_MAP[slug] ?? null;
}

/** Service page slug for internal links from a best-of guide slug. */
export function getRelatedServiceSlugForBestSlug(slug: string): string | null {
  const g = getBusinessCategoryForBestSlug(slug);
  if (!g) return null;
  return PROVIDER_GROUP_TO_SERVICE_SLUG[g];
}

/**
 * Businesses shown in the default BestBusinessesDirectory view (before expanding lower-signal
 * listings): sponsored/featured first in source order, then established picks sorted by rating
 * then review count — matching the initial client render.
 */
export function getDefaultBestDirectoryListing(businesses: Business[]): Business[] {
  const sponsored: Business[] = [];
  const established: Business[] = [];
  for (const b of businesses) {
    if (b.directory?.sponsored || b.directory?.featured) {
      sponsored.push(b);
      continue;
    }
    if (getProviderQualityTier(b) === "established") {
      established.push(b);
    }
  }
  established.sort((a, b) => {
    if (b.rating !== a.rating) return b.rating - a.rating;
    return b.reviews - a.reviews;
  });
  return [...sponsored, ...established];
}
