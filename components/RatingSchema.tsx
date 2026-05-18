import JsonLd from "./JsonLd";
import { hubArticleJsonLd } from "../lib/site-author";
import {
  resolveServiceGuideAggregateRating,
  type ServiceGuideAggregateRatingProps,
} from "../lib/service-guide-rating-defaults";

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
  /** Partial override; omit to use `SERVICE_GUIDE_AGGREGATE_RATING_DEFAULTS` in `lib/service-guide-rating-defaults`. */
  aggregateRating?: Partial<ServiceGuideAggregateRatingProps>;
};

/**
 * Service guide **Article** JSON-LD with nested **`aggregateRating`** (`@type: AggregateRating`).
 * Stars in Google depend on eligibility and their policies; use real `reviewCount` / `ratingValue` when you have verified data.
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
  const { ratingValue: rv, reviewCount: rc, bestRating: br, worstRating: wr } = resolveServiceGuideAggregateRating({
    ...aggregateRatingPartial,
    ...(ratingValue != null ? { ratingValue } : {}),
    ...(reviewCount != null ? { reviewCount } : {}),
    ...(bestRating != null ? { bestRating } : {}),
    ...(worstRating != null ? { worstRating } : {}),
  });
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
        aggregateRating: { ratingValue: rv, reviewCount: rc, bestRating: br, worstRating: wr },
      })}
    />
  );
}
