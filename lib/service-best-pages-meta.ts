import { SITE_URL } from "./page-seo";

/**
 * Shared "last updated" for all `/services/*` and `/best/*` pages.
 * Edit here only — no layout changes needed.
 */
export const SERVICE_BEST_LAST_UPDATED_DISPLAY = "April 2026";

/** ISO 8601 date for schema.org `WebPage` `dateModified` on `/services/*` and `/best/*`. */
export const SERVICE_BEST_LAST_UPDATED_ISO = "2026-04-13";

/** className for the visible “Last updated” line directly under the main H1. */
export const SERVICE_BEST_LAST_UPDATED_LINE_CLASS = "mt-2 text-sm text-gray-500";

export function webPageWithDateModifiedJsonLd(opts: {
  pathname: string;
  name: string;
  description?: string;
  /** Optional editorial / community aggregate rating for rich-result eligibility when guidelines are met. */
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
    bestRating: number;
    worstRating?: number;
  };
}): Record<string, unknown> {
  const path = opts.pathname.startsWith("/") ? opts.pathname : `/${opts.pathname}`;
  const url = new URL(path, SITE_URL).href;
  const ar = opts.aggregateRating;
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url,
    url,
    name: opts.name,
    ...(opts.description ? { description: opts.description } : {}),
    dateModified: SERVICE_BEST_LAST_UPDATED_ISO,
    ...(ar
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: ar.ratingValue,
            reviewCount: ar.reviewCount,
            bestRating: ar.bestRating,
            worstRating: ar.worstRating ?? 1,
          },
        }
      : {}),
  };
}
