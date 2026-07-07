import { PROVIDERS_LAST_VERIFIED } from "@/data/providers";

/** Visible rating suffix when exact Google review counts are not published. */
export function providerVerifiedCaption(): string {
  return `verified ${PROVIDERS_LAST_VERIFIED}`;
}

export function providerRatingVerifiedLine(rating: number): string {
  return `${rating.toFixed(1)} ★ · ${providerVerifiedCaption()}`;
}
