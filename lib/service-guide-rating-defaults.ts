/**
 * Placeholder aggregate rating for `/services/[slug]` guides until real review data is wired in.
 * Wire from CMS or analytics and pass through `RatingSchema` / `AggregateRatingBadge`.
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
