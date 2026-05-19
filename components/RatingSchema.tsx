import JsonLd from "./JsonLd";
import { hubArticleJsonLd } from "../lib/site-author";
import type { ServiceGuideAggregateRatingProps } from "../lib/service-guide-rating-defaults";

export type RatingSchemaProps = {
  pathname: string;
  /** Article `headline` — typically the same as the visible H1. */
  headline: string;
  description: string;
  datePublished: string;
  dateModified: string;
  publisherName?: string;
  siteUrl?: string;
  /** Shorthand — merged with `aggregateRating` (explicit props win). */
  ratingValue?: number;
  reviewCount?: number;
  bestRating?: number;
  worstRating?: number;
  /** Verifiable CMS/review data only — both `ratingValue` and `reviewCount` must end up set or schema omits ratings. */
  aggregateRating?: Partial<ServiceGuideAggregateRatingProps>;
};

/**
 * Service guide **Article** JSON-LD. **`aggregateRating`** is emitted only when `ratingValue` and `reviewCount`
 * are explicitly supplied (no silent defaults).
 */
export default function RatingSchema({
  pathname,
  headline,
  description,
  datePublished,
  dateModified,
  publisherName,
  siteUrl,
  ratingValue,
  reviewCount,
  bestRating,
  worstRating,
  aggregateRating: aggregateRatingPartial,
}: RatingSchemaProps) {
  const rv = ratingValue ?? aggregateRatingPartial?.ratingValue;
  const rc = reviewCount ?? aggregateRatingPartial?.reviewCount;
  const hasCore = typeof rv === "number" && typeof rc === "number";
  const br = bestRating ?? aggregateRatingPartial?.bestRating ?? 5;
  const wr = worstRating ?? aggregateRatingPartial?.worstRating ?? 1;

  return (
    <JsonLd
      data={hubArticleJsonLd({
        pathname,
        headline,
        description,
        datePublished,
        dateModified,
        publisherName,
        siteUrl,
        ...(hasCore
          ? { aggregateRating: { ratingValue: rv, reviewCount: rc, bestRating: br, worstRating: wr } }
          : {}),
      })}
    />
  );
}
