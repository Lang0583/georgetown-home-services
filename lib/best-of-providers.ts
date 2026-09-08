import bestOfProviders from "../data/best-of-providers.json";

/** Best Of shortlist card shape (separate from licensed TSBPE provider records). */
export type BestOfProviderCard = {
  name: string;
  rating: number;
  reviewCount: number;
  description: string;
  websiteUrl: string;
  /** Display format, e.g. "(512) 555-1234" (not stripped). */
  phone?: string;
};

export type ProviderComparison = {
  pricingExpectations: string[];
  responseTime: string[];
  servicesOffered: string[];
};

export type ProviderPageData = {
  evaluatedIntro: string;
  providers: BestOfProviderCard[];
  comparison: ProviderComparison;
};

const data = bestOfProviders as Record<string, ProviderPageData>;

export function getProvidersForBestSlug(slug: string): ProviderPageData | null {
  return data[slug] ?? null;
}

/** @deprecated Prefer {@link BestOfProviderCard}. Kept for existing imports. */
export type Provider = BestOfProviderCard;
