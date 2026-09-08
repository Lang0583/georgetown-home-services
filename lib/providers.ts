/**
 * Typed loader for data/providers.json (TSBPE Responsible Master Plumber file).
 * Fail the build loudly if the file is missing or malformed.
 */
import rawProvidersFile from "../data/providers.json";

export type ProviderPlaces = {
  name: string;
  address: string;
  phone: string;
  website: string;
  rating: string;
  reviews: string;
  refreshed: string;
};

export type LicensedProvider = {
  slug: string;
  trade: string;
  company: string;
  companyRaw: string;
  licenseNumber: string;
  licenseRank: string;
  licenseStatus: string;
  licenseExpires: string;
  licenseeName: string;
  city: string;
  county: string;
  zip: string;
  statePhone: string;
  insuranceCarrier: string;
  insuranceExpires: string;
  insuranceCurrent: boolean;
  endorsements: string[];
  verified: boolean;
  verifiedOn: string;
  sourceRegistry: string;
  sourceUrl: string;
  listingStatus: string;
  places: ProviderPlaces;
};

export type ProvidersFileSource = {
  registry: string;
  file: string;
  url: string;
  refresh: string;
};

export type ProvidersFileCounts = {
  total: number;
  verified: number;
  insuranceExpired: number;
  enriched: number;
  byCity: Record<string, number>;
  byCounty: Record<string, number>;
};

export type ProvidersFile = {
  generatedOn: string;
  source: ProvidersFileSource;
  counties: string[];
  counts: ProvidersFileCounts;
  providers: LicensedProvider[];
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function requireString(value: unknown, path: string): string {
  if (typeof value !== "string") {
    throw new Error(`[providers.json] Expected string at ${path}`);
  }
  return value;
}

function requireBoolean(value: unknown, path: string): boolean {
  if (typeof value !== "boolean") {
    throw new Error(`[providers.json] Expected boolean at ${path}`);
  }
  return value;
}

function requireStringArray(value: unknown, path: string): string[] {
  if (!Array.isArray(value) || value.some((item) => typeof item !== "string")) {
    throw new Error(`[providers.json] Expected string[] at ${path}`);
  }
  return value;
}

function parsePlaces(value: unknown, path: string): ProviderPlaces {
  if (!isRecord(value)) {
    throw new Error(`[providers.json] Expected places object at ${path}`);
  }
  return {
    name: requireString(value.name, `${path}.name`),
    address: requireString(value.address, `${path}.address`),
    phone: requireString(value.phone, `${path}.phone`),
    website: requireString(value.website, `${path}.website`),
    rating: requireString(value.rating, `${path}.rating`),
    reviews: requireString(value.reviews, `${path}.reviews`),
    refreshed: requireString(value.refreshed, `${path}.refreshed`),
  };
}

function parseProvider(value: unknown, index: number): LicensedProvider {
  const path = `providers[${index}]`;
  if (!isRecord(value)) {
    throw new Error(`[providers.json] Expected object at ${path}`);
  }
  return {
    slug: requireString(value.slug, `${path}.slug`),
    trade: requireString(value.trade, `${path}.trade`),
    company: requireString(value.company, `${path}.company`),
    companyRaw: requireString(value.companyRaw, `${path}.companyRaw`),
    licenseNumber: requireString(value.licenseNumber, `${path}.licenseNumber`),
    licenseRank: requireString(value.licenseRank, `${path}.licenseRank`),
    licenseStatus: requireString(value.licenseStatus, `${path}.licenseStatus`),
    licenseExpires: requireString(value.licenseExpires, `${path}.licenseExpires`),
    licenseeName: requireString(value.licenseeName, `${path}.licenseeName`),
    city: requireString(value.city, `${path}.city`),
    county: requireString(value.county, `${path}.county`),
    zip: requireString(value.zip, `${path}.zip`),
    statePhone: requireString(value.statePhone, `${path}.statePhone`),
    insuranceCarrier: requireString(value.insuranceCarrier, `${path}.insuranceCarrier`),
    insuranceExpires: requireString(value.insuranceExpires, `${path}.insuranceExpires`),
    insuranceCurrent: requireBoolean(value.insuranceCurrent, `${path}.insuranceCurrent`),
    endorsements: requireStringArray(value.endorsements, `${path}.endorsements`),
    verified: requireBoolean(value.verified, `${path}.verified`),
    verifiedOn: requireString(value.verifiedOn, `${path}.verifiedOn`),
    sourceRegistry: requireString(value.sourceRegistry, `${path}.sourceRegistry`),
    sourceUrl: requireString(value.sourceUrl, `${path}.sourceUrl`),
    listingStatus: requireString(value.listingStatus, `${path}.listingStatus`),
    places: parsePlaces(value.places, `${path}.places`),
  };
}

function parseProvidersFile(raw: unknown): ProvidersFile {
  if (!isRecord(raw)) {
    throw new Error("[providers.json] Root value must be an object");
  }
  if (!isRecord(raw.source)) {
    throw new Error("[providers.json] Missing source object");
  }
  if (!isRecord(raw.counts)) {
    throw new Error("[providers.json] Missing counts object");
  }
  if (!Array.isArray(raw.providers)) {
    throw new Error("[providers.json] Missing providers array");
  }
  if (raw.providers.length === 0) {
    throw new Error("[providers.json] providers array is empty");
  }

  const counties = requireStringArray(raw.counties, "counties");
  const byCityRaw = raw.counts.byCity;
  const byCountyRaw = raw.counts.byCounty;
  if (!isRecord(byCityRaw) || !isRecord(byCountyRaw)) {
    throw new Error("[providers.json] counts.byCity and counts.byCounty must be objects");
  }

  const byCity: Record<string, number> = {};
  for (const [key, value] of Object.entries(byCityRaw)) {
    if (typeof value !== "number") {
      throw new Error(`[providers.json] counts.byCity.${key} must be a number`);
    }
    byCity[key] = value;
  }
  const byCounty: Record<string, number> = {};
  for (const [key, value] of Object.entries(byCountyRaw)) {
    if (typeof value !== "number") {
      throw new Error(`[providers.json] counts.byCounty.${key} must be a number`);
    }
    byCounty[key] = value;
  }

  const providers = raw.providers.map((row, index) => parseProvider(row, index));
  const seen = new Set<string>();
  for (const provider of providers) {
    if (!provider.slug.trim()) {
      throw new Error("[providers.json] Provider slug cannot be empty");
    }
    if (seen.has(provider.slug)) {
      throw new Error(`[providers.json] Duplicate provider slug: ${provider.slug}`);
    }
    seen.add(provider.slug);
  }

  return {
    generatedOn: requireString(raw.generatedOn, "generatedOn"),
    source: {
      registry: requireString(raw.source.registry, "source.registry"),
      file: requireString(raw.source.file, "source.file"),
      url: requireString(raw.source.url, "source.url"),
      refresh: requireString(raw.source.refresh, "source.refresh"),
    },
    counties,
    counts: {
      total: typeof raw.counts.total === "number" ? raw.counts.total : providers.length,
      verified: typeof raw.counts.verified === "number" ? raw.counts.verified : 0,
      insuranceExpired:
        typeof raw.counts.insuranceExpired === "number" ? raw.counts.insuranceExpired : 0,
      enriched: typeof raw.counts.enriched === "number" ? raw.counts.enriched : 0,
      byCity,
      byCounty,
    },
    providers,
  };
}

const providersFile = parseProvidersFile(rawProvidersFile);

export const PROVIDERS_GENERATED_ON = providersFile.generatedOn;
export const PROVIDERS_SOURCE = providersFile.source;
export const PROVIDERS_COUNTS = providersFile.counts;
export const PROVIDERS_COUNTIES = providersFile.counties;

const BY_SLUG = new Map<string, LicensedProvider>();
for (const provider of providersFile.providers) {
  BY_SLUG.set(provider.slug, provider);
}

export function getAllProviders(): LicensedProvider[] {
  return providersFile.providers;
}

export function getProviderBySlug(slug: string): LicensedProvider | null {
  return BY_SLUG.get(slug) ?? null;
}

export function getProvidersByCity(city: string): LicensedProvider[] {
  const needle = city.trim().toLowerCase();
  if (!needle) return [];
  return providersFile.providers.filter((p) => p.city.trim().toLowerCase() === needle);
}

export function getProvidersByTrade(trade: string): LicensedProvider[] {
  const needle = trade.trim().toLowerCase();
  if (!needle) return [];
  return providersFile.providers.filter((p) => p.trade.trim().toLowerCase() === needle);
}

export function getProvidersByCounty(county: string): LicensedProvider[] {
  const needle = county.trim().toLowerCase();
  if (!needle) return [];
  return providersFile.providers.filter((p) => p.county.trim().toLowerCase() === needle);
}

export function getAllLicensedProviderSlugs(): string[] {
  return providersFile.providers.map((p) => p.slug);
}

export function slugifyCityName(city: string): string {
  return city
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Cities with at least three licensed providers (for city index pages). */
export function getCitiesWithMinProviders(min = 3): { city: string; slug: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const provider of providersFile.providers) {
    const city = provider.city.trim();
    if (!city) continue;
    counts.set(city, (counts.get(city) ?? 0) + 1);
  }
  return [...counts.entries()]
    .filter(([, count]) => count >= min)
    .map(([city, count]) => ({ city, slug: slugifyCityName(city), count }))
    .sort((a, b) => b.count - a.count || a.city.localeCompare(b.city));
}

export function getCityBySlug(citySlug: string): { city: string; slug: string; count: number } | null {
  return getCitiesWithMinProviders(3).find((c) => c.slug === citySlug) ?? null;
}

export function formatVerifiedOnPlain(isoDate: string): string {
  const d = new Date(`${isoDate}T00:00:00.000Z`);
  if (Number.isNaN(d.getTime())) return isoDate;
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(d);
}

export function licenseRankLabel(rank: string): string {
  const key = rank.trim().toUpperCase();
  if (key === "M") return "Master";
  if (key === "J") return "Journeyman";
  if (key === "T") return "Tradesman";
  return rank.trim();
}

export function nonEmpty(value: string | undefined | null): string | null {
  const trimmed = value?.trim() ?? "";
  return trimmed ? trimmed : null;
}

export function placesPhone(provider: LicensedProvider): string | null {
  return nonEmpty(provider.places.phone) ?? nonEmpty(provider.statePhone);
}

export function placesWebsite(provider: LicensedProvider): string | null {
  return nonEmpty(provider.places.website);
}

export function placesAddress(provider: LicensedProvider): string | null {
  return nonEmpty(provider.places.address);
}

export function placesRating(provider: LicensedProvider): number | null {
  const raw = nonEmpty(provider.places.rating);
  if (!raw) return null;
  const n = Number(raw);
  return Number.isFinite(n) ? n : null;
}

export function placesReviewCount(provider: LicensedProvider): number | null {
  const raw = nonEmpty(provider.places.reviews);
  if (!raw) return null;
  const n = Number(raw);
  return Number.isFinite(n) && n > 0 ? n : null;
}

export const ENDORSEMENT_PLAIN: Record<string, { label: string; meaning: string }> = {
  "Medical Gas": {
    label: "Medical Gas",
    meaning:
      "This plumber is endorsed to work on medical gas piping used in clinics and similar facilities, not only standard home water and drain lines.",
  },
  "Residential Fire Sprinkler": {
    label: "Residential Fire Sprinkler",
    meaning:
      "This plumber is endorsed to install or service fire sprinkler systems inside homes where local code allows that work.",
  },
  "Water Supply Protection": {
    label: "Water Supply Protection",
    meaning:
      "This plumber is endorsed for backflow and water supply protection devices that keep contaminated water from entering the public supply.",
  },
};

function endorsementSignature(endorsements: string[]): string {
  return [...endorsements.map((e) => e.trim()).filter(Boolean)].sort().join("|");
}

/**
 * True when every provider in the file shares the exact same endorsement list.
 * That pattern is treated as bad source data, so pages hide the endorsements block.
 */
export function endorsementsAreUniversalInFile(): boolean {
  const providers = providersFile.providers;
  if (providers.length < 2) return false;
  const first = endorsementSignature(providers[0]!.endorsements);
  if (!first) return false;
  return providers.every((p) => endorsementSignature(p.endorsements) === first);
}

/** Endorsements safe to show for one provider (empty when the file looks corrupted). */
export function displayableEndorsements(provider: LicensedProvider): string[] {
  if (endorsementsAreUniversalInFile()) return [];
  return (provider.endorsements ?? []).map((e) => e.trim()).filter(Boolean);
}

