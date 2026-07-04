import { SITE_URL } from "./page-seo";

/** ISO 8601 calendar date (YYYY-MM-DD). */
export type LastUpdatedIso = `${number}-${number}-${number}`;

/** Default freshness date for directory, service, and best-of pages. */
export const DIRECTORY_PAGES_LAST_UPDATED: LastUpdatedIso = "2026-07-01";

export const LAST_UPDATED_STALE_DAYS = 90;

/** className for the visible “Last updated” line directly under the main H1. */
export const LAST_UPDATED_LINE_CLASS = "mt-2 text-sm text-muted";

export function formatLastUpdatedDisplay(iso: string): string {
  const d = parseIsoDate(iso);
  if (!d) return iso;
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(d);
}

export function formatLastUpdatedMonthYear(iso: string): string {
  const d = parseIsoDate(iso);
  if (!d) return iso;
  const month = d.toLocaleString("en-US", { month: "long", timeZone: "UTC" });
  return `Updated ${month} ${d.getUTCFullYear()}`;
}

export function parseIsoDate(iso: string): Date | null {
  const d = new Date(`${iso}T00:00:00.000Z`);
  return Number.isNaN(d.getTime()) ? null : d;
}

export function daysSinceLastUpdated(iso: string, now = new Date()): number | null {
  const d = parseIsoDate(iso);
  if (!d) return null;
  return Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
}

export function isLastUpdatedStale(iso: string, now = new Date()): boolean {
  const days = daysSinceLastUpdated(iso, now);
  return days !== null && days > LAST_UPDATED_STALE_DAYS;
}

export function webPageWithDateModifiedJsonLd(opts: {
  pathname: string;
  name: string;
  description?: string;
  lastUpdated: string;
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
    dateModified: opts.lastUpdated,
  };
}
