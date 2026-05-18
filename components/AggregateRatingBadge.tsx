import type { ServiceGuideAggregateRatingProps } from "../lib/service-guide-rating-defaults";

export type AggregateRatingBadgeProps = {
  className?: string;
} & ServiceGuideAggregateRatingProps;

/** Visible badge aligned with `RatingSchema` / Article `aggregateRating` JSON-LD. */
export default function AggregateRatingBadge({
  ratingValue,
  reviewCount,
  bestRating,
  className = "",
}: AggregateRatingBadgeProps) {
  const label = `${ratingValue.toFixed(1)} out of ${bestRating} stars from ${reviewCount} reviews`;
  return (
    <p
      className={`inline-flex flex-wrap items-baseline gap-x-1 rounded-lg border border-amber-200/90 bg-amber-50/90 px-2.5 py-1 text-sm text-gray-800 shadow-sm ${className}`.trim()}
      aria-label={label}
    >
      <span className="font-semibold tabular-nums text-gray-900">{ratingValue.toFixed(1)}</span>
      <span className="text-amber-600" aria-hidden>
        ★
      </span>
      <span className="text-gray-700">
        ({reviewCount} reviews)
      </span>
    </p>
  );
}
