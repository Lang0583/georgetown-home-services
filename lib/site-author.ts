/**
 * Single source of truth for the named editorial author across the site.
 *
 * This is the E-E-A-T anchor: every Article schema, ProfilePage, and visible
 * byline references the same Person object so Google can cleanly tie content
 * to a consistent identified editor. If we add additional editors later they
 * should follow this same shape and live alongside this module.
 */

import { SITE_URL } from "./page-seo";

export const AUTHOR_SLUG = "matt";
export const AUTHOR_NAME = "Matt";
export const AUTHOR_JOB_TITLE = "Founder and Editor";
export const AUTHOR_PROFILE_PATH = `/authors/${AUTHOR_SLUG}` as const;

/**
 * Concise tagline used in visible bylines and the author profile card.
 * Keep this short — it appears under the name on bylines, not in long-form.
 */
export const AUTHOR_BYLINE_TAGLINE =
  "Georgetown homeowner. Founder and editor of Georgetown Home Services.";

/**
 * Topics the author writes about. Surfaced as `knowsAbout` on the Person
 * schema; helps Google associate the editor with this subject area.
 */
export const AUTHOR_KNOWS_ABOUT: readonly string[] = [
  "Georgetown, Texas home services",
  "Williamson County home maintenance",
  "Residential plumbing decisions",
  "Residential HVAC decisions",
  "Residential roofing and storm damage",
  "Home repair vs. replacement frameworks",
  "Local home-services pricing in Central Texas",
];

/**
 * Person schema fragment usable as the `author` field on Article schema.
 * Returned as a plain object so callers can spread additional fields.
 */
export function authorPersonSchema(siteUrl: string = SITE_URL) {
  return {
    "@type": "Person" as const,
    name: AUTHOR_NAME,
    url: `${siteUrl}${AUTHOR_PROFILE_PATH}`,
    jobTitle: AUTHOR_JOB_TITLE,
    worksFor: {
      "@type": "Organization" as const,
      name: "Georgetown Home Services",
      url: siteUrl,
    },
  };
}

/**
 * Full Person schema for use on the `/authors/matt` profile page itself.
 * Differs from the fragment above by including `description` and
 * `knowsAbout`, which Google's quality systems use to disambiguate authors.
 */
export function fullAuthorPersonSchema(siteUrl: string = SITE_URL) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: AUTHOR_NAME,
    url: `${siteUrl}${AUTHOR_PROFILE_PATH}`,
    jobTitle: AUTHOR_JOB_TITLE,
    description:
      "Founder and editor of Georgetown Home Services, a homeowner research site covering plumbing, HVAC, and roofing decisions in Georgetown, Texas. Georgetown homeowner with a background in building local-market editorial sites; not a licensed contractor.",
    knowsAbout: [...AUTHOR_KNOWS_ABOUT],
    worksFor: {
      "@type": "Organization",
      name: "Georgetown Home Services",
      url: siteUrl,
    },
  };
}

/**
 * Article schema for editorial hub pages (services, locations) that carry
 * substantive guide-style content. Pairs with the existing WebPage schema —
 * WebPage establishes page identity; Article asserts editorial provenance
 * with a named author, which is the E-E-A-T signal Google rewards.
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
    author: authorPersonSchema(siteUrl),
    publisher: {
      "@type": "Organization",
      name: opts.publisherName ?? "Georgetown Home Services",
      url: siteUrl,
    },
    datePublished: opts.datePublished,
    dateModified: opts.dateModified,
  };
}

/**
 * ProfilePage schema (separate from Person) — Google now recognizes
 * ProfilePage as a distinct page type for author/editor profiles, which
 * helps disambiguate "this URL is about a person" from generic about pages.
 */
export function authorProfilePageSchema(siteUrl: string = SITE_URL) {
  const profileUrl = `${siteUrl}${AUTHOR_PROFILE_PATH}`;
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: AUTHOR_NAME,
      url: profileUrl,
      jobTitle: AUTHOR_JOB_TITLE,
    },
    url: profileUrl,
    name: `${AUTHOR_NAME} — ${AUTHOR_JOB_TITLE}`,
  };
}
