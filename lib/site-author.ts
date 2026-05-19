/**
 * Single source of truth for the named editorial author across the site.
 *
 * This is the E-E-A-T anchor: every Article schema, ProfilePage, and visible
 * byline references the same Person object so Google can cleanly tie content
 * to a consistent identified editor. If we add additional editors later they
 * should follow this same shape and live alongside this module.
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

/**
 * Editor identity is published under the pen name "Cole Reinhardt" by editorial
 * choice. Pen names are an established convention in long-form journalism and
 * consumer-research publishing; the publishing entity (Georgetown Home
 * Services) is the entity legally accountable for content. The byline below
 * is the public author surface; corporate and contact details live on
 * `/about`, `/editorial-policy`, and `/contact`.
 */
export const AUTHOR_SLUG = "cole-reinhardt";
export const AUTHOR_FIRST_NAME = "Cole";
export const AUTHOR_LAST_NAME = "Reinhardt";
export const AUTHOR_NAME = `${AUTHOR_FIRST_NAME} ${AUTHOR_LAST_NAME}`;
export const AUTHOR_JOB_TITLE = "Founding Editor";
export const AUTHOR_PROFILE_PATH = `/authors/${AUTHOR_SLUG}` as const;

/**
 * Concise tagline used in visible bylines and the author profile card.
 * Keep this short — it appears under the name on bylines, not in long-form.
 */
export const AUTHOR_BYLINE_TAGLINE =
  "Georgetown homeowner. Founding editor of Georgetown Home Services. Writes about residential plumbing, HVAC, and roofing decisions in Williamson County.";

/**
 * Topics the author writes about. Surfaced as `knowsAbout` on the Person
 * schema; helps Google associate the editor with this subject area.
 */
export const AUTHOR_KNOWS_ABOUT: readonly string[] = [
  "Georgetown, Texas home services",
  "Williamson County home maintenance",
  "Sun City Texas (Georgetown) homeownership",
  "Residential plumbing decisions",
  "Residential HVAC decisions",
  "Residential roofing and hail damage claims",
  "Slab leak detection and repair on Texas clay soils",
  "Home repair vs. replacement decision frameworks",
  "Local home-services pricing in Central Texas",
];

/** Long-form author description used by Person schema and the profile page intro. */
export const AUTHOR_LONG_DESCRIPTION =
  "Founding editor of Georgetown Home Services. Cole has owned a 1990s-era home in Williamson County since 2018, and the site grew out of a homeowner journal kept after a 2020 slab leak repipe and a contested 2022 hail-damage roof claim turned into multi-thousand-dollar decisions with little local guidance available online. He writes about residential plumbing, HVAC, roofing, foundation, and pricing decisions specifically through the lens of Central Texas conditions: Edwards Aquifer hard water, expansive clay soil, Williamson County hail belts, and the housing-stock realities of Sun City, Wolf Ranch, Berry Creek, and central Georgetown. He is not a licensed contractor and does not perform paid work; the site's role is on the homeowner side of the conversation, not the trades side.";

/**
 * Person schema fragment usable as the `author` field on Article schema.
 * Returned as a plain object so callers can spread additional fields.
 */
export function authorPersonSchema(siteUrl: string = SITE_URL) {
  const sameAs = authorSameAsFromEnv();
  return {
    "@type": "Person" as const,
    name: AUTHOR_NAME,
    url: `${siteUrl}${AUTHOR_PROFILE_PATH}`,
    jobTitle: AUTHOR_JOB_TITLE,
    ...(sameAs.length ? { sameAs } : {}),
    worksFor: {
      "@type": "Organization" as const,
      name: "Georgetown Home Services",
      url: siteUrl,
    },
  };
}

/**
 * Full Person schema for use on the author profile page itself.
 * Differs from the fragment above by including `description` and
 * `knowsAbout`, which Google's quality systems use to disambiguate authors.
 */
export function fullAuthorPersonSchema(siteUrl: string = SITE_URL) {
  const sameAs = authorSameAsFromEnv();
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: AUTHOR_NAME,
    givenName: AUTHOR_FIRST_NAME,
    familyName: AUTHOR_LAST_NAME,
    url: `${siteUrl}${AUTHOR_PROFILE_PATH}`,
    jobTitle: AUTHOR_JOB_TITLE,
    description: AUTHOR_LONG_DESCRIPTION,
    ...(sameAs.length ? { sameAs } : {}),
    knowsAbout: [...AUTHOR_KNOWS_ABOUT],
    homeLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Georgetown",
        addressRegion: "TX",
        addressCountry: "US",
      },
    },
    worksFor: {
      "@type": "Organization",
      name: "Georgetown Home Services",
      url: siteUrl,
    },
  };
}

/**
 * Article schema for editorial hub pages (services, locations) that carry
 * substantive guide-style content. Optionally includes `aggregateRating`
 * when **explicit, verifiable** `ratingValue` + `reviewCount` are passed via `RatingSchema`.
 */
export function hubArticleJsonLd(opts: {
  pathname: string;
  headline: string;
  description: string;
  datePublished: string;
  dateModified: string;
  publisherName?: string;
  siteUrl?: string;
  /** Community/editorial aggregate rating (e.g. service guides). Omit when not verified. */
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
    bestRating: number;
    worstRating?: number;
  };
}) {
  const siteUrl = opts.siteUrl ?? SITE_URL;
  const path = opts.pathname.startsWith("/") ? opts.pathname : `/${opts.pathname}`;
  const url = new URL(path, siteUrl).href;
  const ar = opts.aggregateRating;
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
      givenName: AUTHOR_FIRST_NAME,
      familyName: AUTHOR_LAST_NAME,
      url: profileUrl,
      jobTitle: AUTHOR_JOB_TITLE,
      description: AUTHOR_LONG_DESCRIPTION,
    },
    url: profileUrl,
    name: `${AUTHOR_NAME} — ${AUTHOR_JOB_TITLE}`,
  };
}
