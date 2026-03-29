import raw from "./businesses.json";

export type ProviderGroup = "plumber" | "hvac" | "roofer";

export type Business = {
  name: string;
  category: string;
  type: string;
  phone: string;
  website: string;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  rating: number;
  reviews: number;
  location_link: string;
};

const businesses: Business[] = raw as Business[];

const BEST_SLUG_MAP: Record<string, ProviderGroup> = {
  "best-plumbers-georgetown-tx": "plumber",
  "top-hvac-companies-georgetown-tx": "hvac",
  "best-roofers-georgetown-tx": "roofer",
};

const SERVICE_SLUG_MAP: Record<string, ProviderGroup> = {
  "plumber-georgetown-tx": "plumber",
  "hvac-georgetown-tx": "hvac",
  "roofer-georgetown-tx": "roofer",
};

const PROVIDER_GROUP_TO_SERVICE_SLUG: Record<ProviderGroup, string> = {
  plumber: "plumber-georgetown-tx",
  hvac: "hvac-georgetown-tx",
  roofer: "roofer-georgetown-tx",
};

/** Map the category field (substring match) to plumber | hvac | roofer — same rules as the homepage. */
export function normalizeBusinessGroup(b: Business): ProviderGroup | null {
  const s = b.category.toLowerCase();
  if (s.includes("plumb")) return "plumber";
  if (s.includes("hvac") || s.includes("air") || s.includes("heating")) return "hvac";
  if (s.includes("roof")) return "roofer";
  return null;
}

/** Shown on best-of pages next to business listings. */
export const BUSINESS_LISTINGS_LAST_UPDATED = "March 29, 2026";

function trimStr(s: string | undefined): string {
  return (s ?? "").trim();
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

/** Valid company website URL (https added if needed), or null if missing/invalid or maps listing URL. */
export function getBusinessWebsiteUrl(b: Business): string | null {
  const n = normalizeOutboundHref(b.website);
  if (!n || isLikelyMapsListingUrl(n)) return null;
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

export function getBusinessesByCategory(category: string): Business[] {
  const target = category.toLowerCase();
  if (target !== "plumber" && target !== "hvac" && target !== "roofer") return [];
  return businesses
    .filter((b) => normalizeBusinessGroup(b) === target)
    .sort((a, b) => {
      if (b.rating !== a.rating) return b.rating - a.rating;
      return b.reviews - a.reviews;
    });
}

export function hasBusinessRatingData(b: Business): boolean {
  return b.rating > 0 || b.reviews > 0;
}

export function generateBusinessDescription(b: Business): string {
  const g = normalizeBusinessGroup(b);
  const service =
    g === "plumber" ? "plumbing" : g === "hvac" ? "heating and cooling" : g === "roofer" ? "roofing" : "home services";
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
