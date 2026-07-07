import verifiedSource from "./ghs-verified-providers.json";

export type ProviderCategory =
  | "plumbing"
  | "hvac"
  | "roofing"
  | "electrical"
  | "landscaping"
  | "pest-control"
  | "foundation"
  | "cleaning";

export type Provider = {
  name: string;
  phone: string;
  googleMapsUrl: string;
  rating: number;
  reviewCount: number;
  /** Omitted when not published in public business records. */
  yearsInBusiness?: number;
  serviceArea: string;
  specialties: string[];
  featured: boolean;
  category: ProviderCategory;
  /** Short profile for schema.org description. */
  description: string;
  address?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  /** Texas trade license number when verified via public lookup (TSBPE, TDLR, TDA SPCS). */
  licenseNumber?: string;
  /** Human-readable license class, e.g. "TSBPE Responsible Master Plumber". */
  licenseType?: string;
  /** ISO 8601 calendar date (YYYY-MM-DD) of the public-registry verification pass. */
  licenseVerifiedDate?: string;
  /** Subdivisions explicitly named in public profiles or service-area copy. */
  neighborhoodsServed?: string[];
};

/** Single source: `data/ghs-verified-providers.json` (Google-verified batch). */
export type VerifiedProviderRecord = {
  name: string;
  category: ProviderCategory;
  rating: number;
  reviewCount: number;
  phone: string;
  address: string;
  licenseType?: string;
  licenseNumber?: string;
  googleMapsUrl?: string;
  serviceArea?: string;
  specialties?: string[];
  description?: string;
  yearsInBusiness?: number | null;
  neighborhoodsServed?: string[];
  licenseVerifiedDate?: string;
};

type VerifiedProvidersFile = {
  lastVerified: string;
  providers: VerifiedProviderRecord[];
};

const verifiedData = verifiedSource as VerifiedProvidersFile;

export const PROVIDERS_LAST_VERIFIED = verifiedData.lastVerified;

export const PROVIDER_DISCLAIMER =
  "Ratings and review counts sourced from Google Business Profile at time of last verification. Always confirm current licensing and availability directly.";

const BEST_SLUG_TO_CATEGORY: Record<string, ProviderCategory> = {
  "best-plumbers-georgetown-tx": "plumbing",
  "top-hvac-companies-georgetown-tx": "hvac",
  "best-roofers-georgetown-tx": "roofing",
  "best-electricians-georgetown-tx": "electrical",
  "best-landscaping-companies-georgetown-tx": "landscaping",
  "best-pest-control-georgetown-tx": "pest-control",
  "best-foundation-repair-georgetown-tx": "foundation",
  "best-house-cleaning-services-georgetown-tx": "cleaning",
};

/** Angi list slug keys — must match `lib/affiliates.ts`. */
export const PROVIDER_CATEGORY_ANGI_SLUG: Record<ProviderCategory, string> = {
  plumbing: "plumbing",
  hvac: "hvac",
  roofing: "roofing",
  electrical: "electrical",
  landscaping: "landscaping",
  "pest-control": "pest-control",
  foundation: "foundation-repair",
  cleaning: "house-cleaning",
};

function mapsSearchUrl(name: string, address: string): string {
  const q = encodeURIComponent(`${name} ${address}`.trim());
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

function parseAddressFields(address: string): Pick<Provider, "address" | "city" | "state" | "postalCode"> {
  const trimmed = address.trim();
  if (!trimmed) return {};
  const m = trimmed.match(/^(.+),\s*([^,]+),\s*([A-Z]{2})(?:\s+(\d{5}(?:-\d{4})?))?$/);
  if (m) {
    return {
      address: m[1].trim(),
      city: m[2].trim(),
      state: m[3].trim(),
      postalCode: m[4]?.trim(),
    };
  }
  return { address: trimmed };
}

function mapVerifiedRecord(row: VerifiedProviderRecord): Provider {
  const licenseType = row.licenseType?.trim() || undefined;
  const licenseNumber = row.licenseNumber?.trim() || undefined;
  const fullAddress = row.address.trim();
  const addrFields = parseAddressFields(fullAddress);
  const serviceArea = row.serviceArea?.trim() || "Georgetown, TX area";
  const specialties = row.specialties?.filter(Boolean) ?? [];

  return {
    name: row.name.trim(),
    phone: row.phone.trim(),
    googleMapsUrl: row.googleMapsUrl?.trim() || mapsSearchUrl(row.name, fullAddress),
    rating: row.rating,
    reviewCount: row.reviewCount,
    yearsInBusiness: row.yearsInBusiness ?? undefined,
    serviceArea,
    specialties,
    featured: false,
    category: row.category,
    description:
      row.description?.trim() ||
      `${row.name} serves homeowners in Georgetown and Williamson County.`,
    address: fullAddress || addrFields.address,
    city: addrFields.city,
    state: addrFields.state,
    postalCode: addrFields.postalCode,
    licenseType,
    licenseNumber,
    licenseVerifiedDate: row.licenseVerifiedDate?.trim() || undefined,
    neighborhoodsServed: row.neighborhoodsServed?.filter(Boolean).length
      ? row.neighborhoodsServed.filter(Boolean)
      : undefined,
  };
}

export const PROVIDERS: Provider[] = verifiedData.providers.map(mapVerifiedRecord);

export function getProvidersByCategory(category: ProviderCategory): Provider[] {
  return PROVIDERS.filter((p) => p.category === category).sort(
    (a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount,
  );
}

/** Top N providers for a category (sorted by review volume, then rating). */
export function getTopProvidersByCategory(category: ProviderCategory, limit = 3): Provider[] {
  return getProvidersByCategory(category).slice(0, limit);
}

export const PROVIDER_CATEGORY_ORDER: ProviderCategory[] = [
  "plumbing",
  "hvac",
  "roofing",
  "electrical",
  "landscaping",
  "pest-control",
  "foundation",
  "cleaning",
];

export const PROVIDER_CATEGORY_LABELS: Record<ProviderCategory, string> = {
  plumbing: "Plumbing",
  hvac: "HVAC",
  roofing: "Roofing",
  electrical: "Electrical",
  landscaping: "Landscaping",
  "pest-control": "Pest Control",
  foundation: "Foundation Repair",
  cleaning: "House Cleaning",
};

/** Note for categories with a shorter verified Georgetown shortlist. */
export const SHORT_VERIFIED_LIST_NOTES: Partial<Record<ProviderCategory, string>> = {
  landscaping:
    "These are the Georgetown-based landscaping providers currently meeting our criteria; additional companies serve the area from the greater Austin metro.",
  foundation:
    "These are the Georgetown-based foundation repair providers currently meeting our criteria; additional companies serve the area from the greater Austin metro.",
};

export function getCategoryForBestSlug(slug: string): ProviderCategory | null {
  return BEST_SLUG_TO_CATEGORY[slug] ?? null;
}

export function getDirectoryProvidersForBestSlug(slug: string): Provider[] {
  const category = getCategoryForBestSlug(slug);
  if (!category) return [];
  return getProvidersByCategory(category);
}

export const CATEGORY_TO_BEST_SLUG: Record<ProviderCategory, string> = {
  plumbing: "best-plumbers-georgetown-tx",
  hvac: "top-hvac-companies-georgetown-tx",
  roofing: "best-roofers-georgetown-tx",
  electrical: "best-electricians-georgetown-tx",
  landscaping: "best-landscaping-companies-georgetown-tx",
  "pest-control": "best-pest-control-georgetown-tx",
  foundation: "best-foundation-repair-georgetown-tx",
  cleaning: "best-house-cleaning-services-georgetown-tx",
};

export function getBestSlugForCategory(category: ProviderCategory): string {
  return CATEGORY_TO_BEST_SLUG[category];
}

/** URL-safe slug from a provider business name (e.g. "Atech Plumbing" → "atech-plumbing"). */
export function slugifyProviderName(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[''`]/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const PROVIDER_BY_SLUG = new Map<string, Provider>();

for (const provider of PROVIDERS) {
  const slug = slugifyProviderName(provider.name);
  if (PROVIDER_BY_SLUG.has(slug)) {
    throw new Error(`Duplicate provider slug: ${slug}`);
  }
  PROVIDER_BY_SLUG.set(slug, provider);
}

export function getProviderSlug(provider: Provider): string {
  return slugifyProviderName(provider.name);
}

export function getProviderBySlug(slug: string): Provider | null {
  return PROVIDER_BY_SLUG.get(slug) ?? null;
}

export function getAllProviderSlugs(): string[] {
  return [...PROVIDER_BY_SLUG.keys()];
}
