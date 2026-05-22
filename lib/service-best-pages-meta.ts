import { SITE_URL } from "./page-seo";

/**
 * Shared "last updated" for all `/services/*` and `/best/*` pages.
 * Edit here only — no layout changes needed.
 */
export const SERVICE_BEST_LAST_UPDATED_DISPLAY = "Early June 2026";

/** ISO 8601 date for schema.org `WebPage` `dateModified` on `/services/*` and `/best/*`. */
export const SERVICE_BEST_LAST_UPDATED_ISO = "2026-06-02";

/** className for the visible “Last updated” line directly under the main H1. */
export const SERVICE_BEST_LAST_UPDATED_LINE_CLASS = "mt-2 text-sm text-gray-500";

export function webPageWithDateModifiedJsonLd(opts: {
  pathname: string;
  name: string;
  description?: string;
}): Record<string, unknown> {
  const path = opts.pathname.startsWith("/") ? opts.pathname : `/${opts.pathname}`;
  const url = new URL(path, SITE_URL).href;
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url,
    url,
    name: opts.name,
    ...(opts.description ? { description: opts.description } : {}),
    dateModified: SERVICE_BEST_LAST_UPDATED_ISO,
  };
}
