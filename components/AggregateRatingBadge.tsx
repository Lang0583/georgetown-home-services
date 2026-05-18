import {
  resolveServiceGuideAggregateRating,
  type ServiceGuideAggregateRatingProps,
} from "../lib/service-guide-rating-defaults";

export type AggregateRatingBadgeProps = {
  className?: string;
  /** Shorthand — merged with `rating` (explicit props win). */
  ratingValue?: number;
  reviewCount?: number;
  bestRating?: number;
  worstRating?: number;
  /** Partial override of defaults; use until CMS/real reviews are wired. */
  rating?: Partial<ServiceGuideAggregateRatingProps>;
};

/** Visible stars badge aligned with `RatingSchema` / Article `aggregateRating` JSON-LD. */
export default function AggregateRatingBadge({
  rating: ratingPartial,
  ratingValue,
  reviewCount,
  bestRating,
  worstRating,
  className = "",
}: AggregateRatingBadgeProps) {
  const { ratingValue: rv, reviewCount: rc, bestRating: br } = resolveServiceGuideAggregateRating({
    ...ratingPartial,
    ...(ratingValue != null ? { ratingValue } : {}),
    ...(reviewCount != null ? { reviewCount } : {}),
    ...(bestRating != null ? { bestRating } : {}),
    ...(worstRating != null ? { worstRating } : {}),
  });
  const label = `${rv.toFixed(1)} out of ${br} stars from ${rc} reviews`;
  const display = `${rv.toFixed(1)} ★ (${rc} reviews)`;
  return (
    <p
      className={`inline-flex max-w-prose items-center rounded-lg border border-amber-200/90 bg-amber-50/90 px-2.5 py-1 text-sm tabular-nums text-gray-800 shadow-sm ${className}`.trim()}
      aria-label={label}
    >
      {display}
    </p>
  );
}
