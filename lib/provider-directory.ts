import type { Provider } from "@/data/providers";

/** Matches `lib/businesses.ts` established-pick threshold for directory cards. */
export const PROVIDER_MIN_ESTABLISHED_REVIEWS = 20;

export type ProviderDirectoryTier = "established" | "lower_signal";

export function getProviderDirectoryTier(provider: Provider): ProviderDirectoryTier {
  if (provider.reviewCount >= PROVIDER_MIN_ESTABLISHED_REVIEWS) return "established";
  return "lower_signal";
}

export function partitionDirectoryProviders(providers: Provider[]): {
  established: Provider[];
  lowerSignal: Provider[];
} {
  const established: Provider[] = [];
  const lowerSignal: Provider[] = [];
  for (const p of providers) {
    (getProviderDirectoryTier(p) === "established" ? established : lowerSignal).push(p);
  }
  const bySignal = (a: Provider, b: Provider) =>
    b.rating !== a.rating ? b.rating - a.rating : b.reviewCount - a.reviewCount;
  established.sort(bySignal);
  lowerSignal.sort(bySignal);
  return { established, lowerSignal };
}
