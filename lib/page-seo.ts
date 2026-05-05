import type { Metadata } from "next";

export const SITE_URL = process.env.SITE_URL ?? "https://www.georgetownhomeservices.com";

const SITE_NAME = "Georgetown Home Services";

/** Absolute page URL for the configured origin (same base as canonical tags). */
export function absolutePageUrl(pathname: string): string {
  const base = SITE_URL.replace(/\/$/, "");
  if (pathname === "" || pathname === "/") {
    return `${base}/`;
  }
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return new URL(path, `${base}/`).href;
}

/** Full `<title>` / `og:title` text (includes brand suffix). */
export function documentTitleFromSegment(titleSegment: string): string {
  return `${titleSegment} | ${SITE_NAME}`;
}

export const DEFAULT_OG_IMAGE = {
  url: "/og-image.jpg",
  width: 1200,
  height: 630,
  alt: SITE_NAME,
} as const;

/**
 * Page-level SEO: `title` uses the root layout template; `openGraph.title` is the resolved
 * document title. `openGraph.url` is the full canonical URL for the route (`SITE_URL` + pathname).
 *
 * Pass `noindex: true` to emit `<meta name="robots" content="noindex,follow">`. We keep
 * `follow` so internal links from the page still pass crawl signal to indexable hubs;
 * the goal is to remove the page from the index, not to orphan the rest of the site.
 */
export function pageSeoMetadata(opts: {
  /** Used with root layout `template: "%s | Georgetown Home Services"` when `absoluteTitle` is not set. */
  titleSegment?: string;
  /** Full `<title>` / social titles; overrides the layout template (no extra brand suffix). */
  absoluteTitle?: string;
  description: string;
  pathname: string;
  ogType: "website" | "article";
  noindex?: boolean;
}): Metadata {
  if (!opts.titleSegment && !opts.absoluteTitle) {
    throw new Error("pageSeoMetadata: set titleSegment or absoluteTitle");
  }
  const documentTitle = opts.absoluteTitle ?? documentTitleFromSegment(opts.titleSegment!);
  const pageUrl = absolutePageUrl(opts.pathname);
  const meta: Metadata = {
    title: opts.absoluteTitle ? { absolute: opts.absoluteTitle } : opts.titleSegment!,
    description: opts.description,
    alternates: { canonical: pageUrl },
    openGraph: {
      url: pageUrl,
      title: documentTitle,
      description: opts.description,
      type: opts.ogType,
      siteName: SITE_NAME,
      locale: "en_US",
      images: [{ ...DEFAULT_OG_IMAGE }],
    },
    twitter: {
      card: "summary_large_image",
      title: documentTitle,
      description: opts.description,
      images: [DEFAULT_OG_IMAGE.url],
    },
  };
  if (opts.noindex) {
    meta.robots = {
      index: false,
      follow: true,
      googleBot: { index: false, follow: true },
    };
  }
  return meta;
}
