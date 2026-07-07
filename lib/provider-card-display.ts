import type { Provider } from "@/data/providers";

/** True when JSON published a positive Google review count for this provider. */
export function providerHasPublishedReviewCount(provider: Provider): boolean {
  return typeof provider.reviewCount === "number" && provider.reviewCount > 0;
}

export function providerReviewCountLabel(provider: Provider): string | null {
  if (!providerHasPublishedReviewCount(provider)) return null;
  return `${provider.reviewCount.toLocaleString()} Google reviews`;
}
