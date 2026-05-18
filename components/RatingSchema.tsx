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
} & ServiceGuideAggregateRatingProps;

/**
 * Service guide Article JSON-LD including `aggregateRating` for star-rich-result eligibility
 * when guidelines are met. Pass live `ratingValue` / `reviewCount` when you wire real data.
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
  worstRating = 1,
}: RatingSchemaProps) {
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
        aggregateRating: { ratingValue, reviewCount, bestRating, worstRating },
      })}
    />
  );
}
