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

/** Texas issuing board when a licenseNumber is present in verified data. */
export type LicenseBody = "TSBPE" | "TDLR" | "TDA SPCS";

export type InsuranceStatus = "verified" | "self-attested" | "not-verified";

export type ProviderHours = {
  day: string;
  open: string;
  close: string;
};

export type ProviderReviewExcerpt = {
  text: string;
  author: string;
  sourceUrl: string;
};

export type Provider = {
  name: string;
  phone: string;
  googleMapsUrl: string;
  rating: number;
  /** Omitted in UI when zero or absent in verified JSON. */
  reviewCount: number;
  serviceArea: string;
  /** Always present today (often empty); optional specialty strings must come from verified data only. */
  specialties: string[];
  featured: boolean;
  category: ProviderCategory;
  description: string;
  address?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  licenseNumber?: string;
  /** Longer credential label from verified JSON (kept for existing UI). */
  licenseType?: string;
  licenseBody?: LicenseBody;
  licenseVerifiedDate?: string;
  licenseRegistryUrl?: string;
  insuranceStatus?: InsuranceStatus;
  hours?: ProviderHours[];
  emergencyAvailable?: boolean;
  neighborhoodsServed?: string[];
  zipsServed?: string[];
  websiteUrl?: string;
  reviewExcerpts?: ProviderReviewExcerpt[];
  lastVerified?: string;
  /** Google Place ID for re-verification batches. */
  placeId?: string;
};

export type VerifiedProviderRecord = {
  name: string;
  rating: number;
  reviewCount: number;
  phone: string;
  address: string;
  placeId?: string;
  licenseType?: string;
  licenseNumber?: string;
  licenseBody?: LicenseBody;
  licenseVerifiedDate?: string;
  licenseRegistryUrl?: string;
  insuranceStatus?: InsuranceStatus;
  specialties?: string[];
  hours?: ProviderHours[];
  emergencyAvailable?: boolean;
  neighborhoodsServed?: string[];
  zipsServed?: string[];
  websiteUrl?: string;
  googleMapsUrl?: string;
  reviewExcerpts?: ProviderReviewExcerpt[];
  lastVerified?: string;
};

type VerifiedProvidersMeta = {
  source: string;
  verifiedDate: string;
  criteria: string;
  notes?: string;
};

type VerifiedProvidersFile = {
  _meta: VerifiedProvidersMeta;
  plumbing: VerifiedProviderRecord[];
  hvac: VerifiedProviderRecord[];
  roofing: VerifiedProviderRecord[];
  electrical: VerifiedProviderRecord[];
  landscaping: VerifiedProviderRecord[];
  pest_control: VerifiedProviderRecord[];
  foundation_repair: VerifiedProviderRecord[];
  house_cleaning: VerifiedProviderRecord[];
};

const verifiedData = verifiedSource as VerifiedProvidersFile;

const VERIFIED_CATEGORY_KEYS: ReadonlyArray<{
  key: keyof Omit<VerifiedProvidersFile, "_meta">;
  category: ProviderCategory;
}> = [
  { key: "plumbing", category: "plumbing" },
  { key: "hvac", category: "hvac" },
  { key: "roofing", category: "roofing" },
  { key: "electrical", category: "electrical" },
  { key: "landscaping", category: "landscaping" },
  { key: "pest_control", category: "pest-control" },
  { key: "foundation_repair", category: "foundation" },
  { key: "house_cleaning", category: "cleaning" },
];

function formatVerifiedDisplayDate(isoDate: string): string {
  const d = new Date(`${isoDate}T00:00:00.000Z`);
  if (Number.isNaN(d.getTime())) return isoDate;
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(d);
}

export const PROVIDERS_VERIFIED_ISO_DATE = verifiedData._meta.verifiedDate;
export const PROVIDERS_LAST_VERIFIED = formatVerifiedDisplayDate(verifiedData._meta.verifiedDate);

export const PROVIDER_DISCLAIMER =
  `Ratings and review counts sourced from Google Business Profile (${PROVIDERS_LAST_VERIFIED} pull). Always confirm current licensing and availability directly.`;

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

function mapsPlaceUrl(placeId: string): string {
  return `https://www.google.com/maps/place/?q=place_id:${encodeURIComponent(placeId)}`;
}

function mapsSearchUrl(name: string, address: string): string {
  const q = encodeURIComponent(`${name} ${address}`.trim());
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

function parseAddressFields(address: string): Pick<Provider, "city" | "state" | "postalCode"> {
  const trimmed = address.trim();
  const m = trimmed.match(/,\s*([^,]+),\s*([A-Z]{2})\s+(\d{5}(?:-\d{4})?)/);
  if (!m) return {};
  return { city: m[1].trim(), state: m[2].trim(), postalCode: m[3].trim() };
}

function stripInternalFields(row: Record<string, unknown>): VerifiedProviderRecord {
  const clean: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(row)) {
    if (key.startsWith("_")) continue;
    clean[key] = value;
  }
  return clean as VerifiedProviderRecord;
}

/**
 * Derive licenseBody only from an existing licenseType string when licenseNumber is present.
 * Never invents a board from category alone.
 */
function deriveLicenseBody(
  licenseNumber: string | undefined,
  licenseType: string | undefined,
  explicit: LicenseBody | undefined,
): LicenseBody | undefined {
  if (!licenseNumber) return undefined;
  if (explicit === "TSBPE" || explicit === "TDLR" || explicit === "TDA SPCS") {
    return explicit;
  }
  const t = licenseType?.trim() ?? "";
  if (t.startsWith("TSBPE")) return "TSBPE";
  if (t.startsWith("TDLR")) return "TDLR";
  if (/\bTDA\b/.test(t) && /\bSPCS\b/.test(t)) return "TDA SPCS";
  return undefined;
}

function mapVerifiedRecord(row: VerifiedProviderRecord, category: ProviderCategory): Provider {
  const licenseType = row.licenseType?.trim() || undefined;
  const licenseNumber = row.licenseNumber?.trim() || undefined;
  const licenseBody = deriveLicenseBody(licenseNumber, licenseType, row.licenseBody);
  const fullAddress = row.address.trim();
  const placeId = row.placeId?.trim() || undefined;

  return {
    name: row.name.trim(),
    phone: row.phone.trim(),
    googleMapsUrl: placeId ? mapsPlaceUrl(placeId) : mapsSearchUrl(row.name, fullAddress),
    rating: row.rating,
    reviewCount: typeof row.reviewCount === "number" ? row.reviewCount : 0,
    serviceArea: "Georgetown, TX area",
    specialties: Array.isArray(row.specialties) ? row.specialties : [],
    featured: false,
    category,
    description: `${row.name.trim()} serves homeowners in Georgetown and Williamson County.`,
    address: fullAddress,
    ...parseAddressFields(fullAddress),
    licenseType,
    licenseNumber,
    licenseBody,
    licenseVerifiedDate: row.licenseVerifiedDate?.trim() || undefined,
    // Optional enrichment fields: only pass through when present in verified JSON (never invent).
    licenseRegistryUrl: row.licenseRegistryUrl?.trim() || undefined,
    insuranceStatus: row.insuranceStatus,
    hours: row.hours,
    emergencyAvailable: row.emergencyAvailable,
    neighborhoodsServed: row.neighborhoodsServed,
    zipsServed: row.zipsServed,
    websiteUrl: row.websiteUrl?.trim() || undefined,
    reviewExcerpts: row.reviewExcerpts,
    lastVerified: row.lastVerified?.trim() || undefined,
    placeId,
  };
}

function loadProvidersFromVerifiedFile(data: VerifiedProvidersFile): Provider[] {
  const out: Provider[] = [];
  for (const { key, category } of VERIFIED_CATEGORY_KEYS) {
    const rows = data[key];
    if (!Array.isArray(rows)) continue;
    for (const row of rows) {
      out.push(mapVerifiedRecord(stripInternalFields(row as Record<string, unknown>), category));
    }
  }
  return out;
}

export const PROVIDERS: Provider[] = loadProvidersFromVerifiedFile(verifiedData);

export function getProvidersByCategory(category: ProviderCategory): Provider[] {
  return PROVIDERS.filter((p) => p.category === category);
}

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
