import providers from "../data/providers.json";

export type Provider = {
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
  providers: Provider[];
  comparison: ProviderComparison;
};

const data = providers as Record<string, ProviderPageData>;

export function getProvidersForBestSlug(slug: string): ProviderPageData | null {
  return data[slug] ?? null;
}

