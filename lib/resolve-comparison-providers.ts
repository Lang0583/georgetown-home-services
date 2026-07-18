import type { ProviderComparison } from "@/data/comparisons";
import { PROVIDERS, type Provider } from "@/data/providers";

export type ResolvedComparisonProviders = {
  /** Providers found in verified directory data (2–3 max for the table). */
  providers: Provider[];
  /** Names referenced by the compare page but missing from verified data. */
  missingNames: string[];
};

function findProviderByName(name: string): Provider | null {
  const needle = name.trim().toLowerCase();
  if (!needle) return null;
  return PROVIDERS.find((p) => p.name.trim().toLowerCase() === needle) ?? null;
}

/**
 * Resolve compare-page participants against verified provider records.
 * Does not invent stubs for missing names.
 */
export function resolveComparisonProviders(
  comparison: ProviderComparison,
): ResolvedComparisonProviders {
  const names = [comparison.providerA.name, comparison.providerB.name];
  const providers: Provider[] = [];
  const missingNames: string[] = [];

  for (const name of names) {
    const found = findProviderByName(name);
    if (found) providers.push(found);
    else missingNames.push(name);
  }

  return { providers, missingNames };
}

/** True when both (or all named) providers exist in verified data — enough for a real table. */
export function comparisonHasRealTable(comparison: ProviderComparison): boolean {
  const { providers, missingNames } = resolveComparisonProviders(comparison);
  return providers.length >= 2 && missingNames.length === 0;
}
