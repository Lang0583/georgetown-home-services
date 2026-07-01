import {
  PROVIDERS,
  type Provider,
  type ProviderCategory,
} from "@/data/providers";

/** URL segment under `/neighborhoods/[neighborhood]/[service]` → directory category. */
const SERVICE_SLUG_TO_CATEGORY: Record<string, ProviderCategory> = {
  plumber: "plumbing",
  hvac: "hvac",
  roofer: "roofing",
  electrician: "electrical",
  landscaping: "landscaping",
  "pest-control": "pest-control",
  "foundation-repair": "foundation",
  "house-cleaning": "cleaning",
};

/**
 * Terms that signal a provider explicitly serves a subdivision.
 * Georgetown Village omits bare "Georgetown" so we do not match every listing.
 */
const NEIGHBORHOOD_MATCH_TERMS: Record<string, string[]> = {
  "sun-city": ["sun city", "55+", "retirement", "active-adult", "active adult"],
  "wolf-ranch": ["wolf ranch"],
  teravista: ["teravista"],
  "berry-creek": ["berry creek"],
  "georgetown-village": ["georgetown village", "downtown georgetown", "near downtown"],
};

function providerHaystack(provider: Provider): string {
  return [provider.serviceArea, provider.description, ...provider.specialties]
    .join(" ")
    .toLowerCase();
}

function neighborhoodMatchScore(provider: Provider, neighborhoodSlug: string): number {
  const terms = NEIGHBORHOOD_MATCH_TERMS[neighborhoodSlug] ?? [];
  const haystack = providerHaystack(provider);
  let score = 0;
  for (const term of terms) {
    if (haystack.includes(term)) score += 10;
  }
  if (provider.featured) score += 3;
  return score;
}

export function getCategoryForNeighborhoodService(serviceSlug: string): ProviderCategory | null {
  return SERVICE_SLUG_TO_CATEGORY[serviceSlug] ?? null;
}

/**
 * Shortlist providers for a neighborhood × trade page.
 * Prefers listings that mention the subdivision, then fills with top-rated Georgetown pros.
 */
export function getNeighborhoodTradeProviders(
  neighborhoodSlug: string,
  serviceSlug: string,
  limit = 4,
): Provider[] {
  const category = getCategoryForNeighborhoodService(serviceSlug);
  if (!category) return [];

  const pool = PROVIDERS.filter((p) => p.category === category);

  return [...pool]
    .sort((a, b) => {
      const scoreDiff =
        neighborhoodMatchScore(b, neighborhoodSlug) - neighborhoodMatchScore(a, neighborhoodSlug);
      if (scoreDiff !== 0) return scoreDiff;
      return b.reviewCount - a.reviewCount || b.rating - a.rating;
    })
    .slice(0, limit);
}
