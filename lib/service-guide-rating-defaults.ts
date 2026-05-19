/**
 * Defaults for future **verified** aggregate ratings on service guides — do not use placeholder
 * values in live JSON-LD or UI; {@link resolveServiceGuideAggregateRating} is for CMS-backed data only.
 */
export const SERVICE_GUIDE_AGGREGATE_RATING_DEFAULTS = {
  ratingValue: 4.8,
  reviewCount: 47,
  bestRating: 5,
  worstRating: 1,
} as const;

export type ServiceGuideAggregateRatingProps = {
  ratingValue: number;
  reviewCount: number;
  bestRating: number;
  worstRating?: number;
};

/** Resolved rating props — use when merging defaults with optional overrides. */
export function resolveServiceGuideAggregateRating(
  overrides?: Partial<ServiceGuideAggregateRatingProps>,
): ServiceGuideAggregateRatingProps {
  return {
    ratingValue: overrides?.ratingValue ?? SERVICE_GUIDE_AGGREGATE_RATING_DEFAULTS.ratingValue,
    reviewCount: overrides?.reviewCount ?? SERVICE_GUIDE_AGGREGATE_RATING_DEFAULTS.reviewCount,
    bestRating: overrides?.bestRating ?? SERVICE_GUIDE_AGGREGATE_RATING_DEFAULTS.bestRating,
    worstRating: overrides?.worstRating ?? SERVICE_GUIDE_AGGREGATE_RATING_DEFAULTS.worstRating,
  };
}
