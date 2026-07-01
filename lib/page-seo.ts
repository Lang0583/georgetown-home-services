import type { Metadata } from "next";
import { openGraphImagePathname } from "./og-image-path";

export const SITE_URL = process.env.SITE_URL ?? "https://www.georgetownhomeservices.com";

const SITE_NAME = "Georgetown Home Services";

/**
 * Absolute URL for a route's file-based Open Graph image (`opengraph-image.tsx`).
 * Next.js serves these at `{pathname}/opengraph-image`.
 */
export function openGraphImageUrl(pathname: string): string {
  const path = openGraphImagePathname(normalizeSeoPathname(pathname));
  return absolutePageUrl(path);
}

/**
 * Single canonical pathname for metadata and JSON-LD: leading slash, no trailing slash (except `/`),
 * no query or hash (duplicate URLs like `/foo?page=1` still canonicalize to `/foo`).
 */
export function normalizeSeoPathname(pathname: string): string {
  let p = pathname.trim();
  if (!p.startsWith("/")) p = `/${p}`;
  const q = p.indexOf("?");
  const h = p.indexOf("#");
  const end = Math.min(q === -1 ? p.length : q, h === -1 ? p.length : h);
  p = p.slice(0, end);
  if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
  return p || "/";
}

/** Absolute page URL for the configured origin (same base as canonical tags). */
export function absolutePageUrl(pathname: string): string {
  const path = normalizeSeoPathname(pathname);
  const base = SITE_URL.replace(/\/$/, "");
  if (path === "" || path === "/") {
    return `${base}/`;
  }
  const pathPart = path.startsWith("/") ? path : `/${path}`;
  return new URL(pathPart, `${base}/`).href;
}

/** Full `<title>` / `og:title` text (includes brand suffix). */
export function documentTitleFromSegment(titleSegment: string): string {
  return `${titleSegment} | ${SITE_NAME}`;
}

/**
 * Page-level SEO: `title` uses the root layout template; `openGraph.title` is the resolved
 * document title. `openGraph.url` is the full canonical URL for the route (`SITE_URL` + pathname).
 *
 * Open Graph images are generated per route segment via colocated `opengraph-image.tsx` files;
 * do not set `openGraph.images` here so Next.js file-based metadata is used.
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
  const path = normalizeSeoPathname(opts.pathname);
  const pageUrl = absolutePageUrl(path);
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
    },
    twitter: {
      card: "summary_large_image",
      title: documentTitle,
      description: opts.description,
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
