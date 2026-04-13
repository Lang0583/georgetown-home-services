import { SITE_URL } from "./page-seo";

/**
 * Shared "last updated" for all `/services/*` and `/best/*` pages.
 * Edit here only — no layout changes needed.
 */
export const SERVICE_BEST_LAST_UPDATED_DISPLAY = "April 2026";

/** ISO 8601 date for schema.org `dateModified` (month precision → first of month). */
export const SERVICE_BEST_LAST_UPDATED_ISO = "2026-04-01";

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
