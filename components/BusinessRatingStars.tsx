/** Filled star path (24×24 viewBox). */
const STAR_PATH =
  "M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.563.563 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.563.563 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z";

function StarCell({ fillFraction }: { fillFraction: number }) {
  const w = Math.min(Math.max(fillFraction, 0), 1) * 100;
  return (
    <div className="relative h-4 w-4 shrink-0">
      <svg className="h-4 w-4 text-gray-200" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d={STAR_PATH} />
      </svg>
      <div className="absolute left-0 top-0 h-full overflow-hidden text-amber-400" style={{ width: `${w}%` }}>
        <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d={STAR_PATH} />
        </svg>
      </div>
    </div>
  );
}

export function RatingStarsRow({ rating }: { rating: number }) {
  const clamped = Math.min(Math.max(rating, 0), 5);
  return (
    <div className="flex items-center gap-0.5" aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => (
        <StarCell key={i} fillFraction={clamped - i} />
      ))}
    </div>
  );
}

export function formatRatingOneDecimal(rating: number) {
  return rating.toFixed(1);
}

/**
 * Five amber stars (partial fill) + “4.8 (241 reviews)” style text.
 */
export function RatingStarsWithCaption({
  rating,
  reviewCount,
  className,
}: {
  rating: number;
  reviewCount: number;
  className?: string;
}) {
  return (
    <div className={["flex flex-wrap items-center gap-2", className].filter(Boolean).join(" ")}>
      <RatingStarsRow rating={rating} />
      <span className="text-sm text-gray-600">
        <span className="font-semibold text-gray-900">{formatRatingOneDecimal(rating)}</span>
        <span className="text-gray-500"> ({reviewCount.toLocaleString()} reviews)</span>
      </span>
    </div>
  );
}
