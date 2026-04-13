import type { Metadata } from "next";

export const SITE_URL = process.env.SITE_URL ?? "https://www.georgetownhomeservices.com";

const SITE_NAME = "Georgetown Home Services";

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
 * document title.
 *
 * Canonical URL is set automatically in the root layout using the current request pathname.
 */
export function pageSeoMetadata(opts: {
  titleSegment: string;
  description: string;
  /** Kept for backwards compatibility; canonical is now set globally in root metadata. */
  pathname?: string;
  ogType: "website" | "article";
}): Metadata {
  const ogTitle = documentTitleFromSegment(opts.titleSegment);
  return {
    title: opts.titleSegment,
    description: opts.description,
    openGraph: {
      title: ogTitle,
      description: opts.description,
      type: opts.ogType,
      siteName: SITE_NAME,
      locale: "en_US",
      images: [{ ...DEFAULT_OG_IMAGE }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: opts.description,
      images: [DEFAULT_OG_IMAGE.url],
    },
  };
}
