/**
 * Single source of truth for public author attribution across the site.
 *
 * Georgetown Home Services is built and maintained by Matt (first name only).
 * Article schema, ProfilePage, and visible bylines reference the same Person.
 */

import { SITE_URL } from "./page-seo";

function authorSameAsFromEnv(): string[] {
  const raw = process.env.NEXT_PUBLIC_AUTHOR_SAME_AS;
  if (!raw?.trim()) return [];
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter((s) => {
      try {
        return Boolean(s && new URL(s).protocol.startsWith("http"));
      } catch {
        return false;
      }
    });
}

export const PUBLISHER_NAME = "Georgetown Home Services";

/** First-name-only public attribution — no last name in copy or schema. */
export const AUTHOR_FIRST_NAME = "Matt";

/** @deprecated Use AUTHOR_FIRST_NAME; kept for imports that expect AUTHOR_NAME. */
export const AUTHOR_NAME = AUTHOR_FIRST_NAME;

/** URL segment under `/authors/[slug]`. */
export const AUTHOR_SLUG = "matt";

export const AUTHOR_PROFILE_PATH = `/authors/${AUTHOR_SLUG}` as const;

/** Visible byline suffix after the author link: `By Matt | Georgetown Home Services`. */
export const AUTHOR_BYLINE_PUBLISHER = PUBLISHER_NAME;

/**
 * Optional short line under full bylines. Keep factual — no credentials or tenure claims.
 */
export const AUTHOR_BYLINE_TAGLINE =
  "Provider research uses public business listings, license lookups, and review platforms—not paid placement.";

/** Long-form description for Person schema and the author profile page. */
export const AUTHOR_LONG_DESCRIPTION =
  "Matt is a Georgetown, Texas homeowner who builds and maintains Georgetown Home Services—an independent local directory and homeowner guide for Williamson County. He researches providers using public business data, Texas licensing registries where trades are licensed, and review platforms. He is not a licensed contractor, does not dispatch tradespeople, and does not accept payment for directory rankings.";

/**
 * Person schema fragment for the `author` field on Article schema.
 */
export function authorPersonSchema(siteUrl: string = SITE_URL) {
  return articleAuthorSchema(siteUrl);
}

export function articleAuthorSchema(siteUrl: string = SITE_URL) {
  const sameAs = authorSameAsFromEnv();
  return {
    "@type": "Person" as const,
    name: AUTHOR_FIRST_NAME,
    url: `${siteUrl}${AUTHOR_PROFILE_PATH}`,
    ...(sameAs.length ? { sameAs } : {}),
    worksFor: {
      "@type": "Organization" as const,
      name: PUBLISHER_NAME,
      url: siteUrl,
    },
  };
}

/** Full Person schema for the author profile page. */
export function fullAuthorPersonSchema(siteUrl: string = SITE_URL) {
  const sameAs = authorSameAsFromEnv();
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: AUTHOR_FIRST_NAME,
    url: `${siteUrl}${AUTHOR_PROFILE_PATH}`,
    description: AUTHOR_LONG_DESCRIPTION,
    ...(sameAs.length ? { sameAs } : {}),
    worksFor: {
      "@type": "Organization",
      name: PUBLISHER_NAME,
      url: siteUrl,
    },
    homeLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Georgetown",
        addressRegion: "TX",
        addressCountry: "US",
      },
    },
  };
}

/**
 * Article schema for editorial hub pages (services, locations) that carry
 * substantive guide-style content.
 */
export function hubArticleJsonLd(opts: {
  pathname: string;
  headline: string;
  description: string;
  datePublished: string;
  dateModified: string;
  publisherName?: string;
  siteUrl?: string;
}) {
  const siteUrl = opts.siteUrl ?? SITE_URL;
  const path = opts.pathname.startsWith("/") ? opts.pathname : `/${opts.pathname}`;
  const url = new URL(path, siteUrl).href;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.headline,
    description: opts.description,
    mainEntityOfPage: url,
    url,
    image: {
      "@type": "ImageObject",
      url: `${siteUrl}/og-image.jpg`,
      width: 1200,
      height: 630,
    },
    author: articleAuthorSchema(siteUrl),
    publisher: {
      "@type": "Organization",
      name: opts.publisherName ?? PUBLISHER_NAME,
      url: siteUrl,
    },
    datePublished: opts.datePublished,
    dateModified: opts.dateModified,
  };
}

/** ProfilePage schema for the author profile URL. */
export function authorProfilePageSchema(siteUrl: string = SITE_URL) {
  const profileUrl = `${siteUrl}${AUTHOR_PROFILE_PATH}`;
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: AUTHOR_FIRST_NAME,
      url: profileUrl,
      description: AUTHOR_LONG_DESCRIPTION,
    },
    url: profileUrl,
    name: `${AUTHOR_FIRST_NAME} — ${PUBLISHER_NAME}`,
  };
}
