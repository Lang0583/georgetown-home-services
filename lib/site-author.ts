/**
 * Single source of truth for the public editorial attribution across the site.
 *
 * Georgetown Home Services publishes under a named editorial team (not an
 * individual pen name). Article schema, ProfilePage, and visible bylines all
 * reference the same Organization object for consistent E-E-A-T signals.
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

/** URL segment under `/authors/[slug]`. */
export const AUTHOR_SLUG = "editorial-team";

export const AUTHOR_NAME = "Georgetown Home Services Editorial Team";

export const AUTHOR_JOB_TITLE = "Editorial team";

export const AUTHOR_PROFILE_PATH = `/authors/${AUTHOR_SLUG}` as const;

/**
 * Concise tagline used in visible bylines and the author profile card.
 * Keep this short — it appears under the name on bylines, not in long-form.
 */
export const AUTHOR_BYLINE_TAGLINE =
  "Researched from public records and Central Texas housing patterns. Drafts are edited for accuracy—not trades advice.";

/**
 * Topics the editorial team covers. Surfaced as `knowsAbout` on Organization
 * schema where applicable.
 */
export const AUTHOR_KNOWS_ABOUT: readonly string[] = [
  "Georgetown, Texas home services",
  "Williamson County home maintenance",
  "Residential plumbing decisions",
  "Residential HVAC decisions",
  "Residential roofing and hail damage documentation",
  "Home repair vs. replacement decision frameworks",
  "Local home-services pricing in Central Texas",
];

/** Long-form description used by Organization schema and the profile page intro. */
export const AUTHOR_LONG_DESCRIPTION =
  "The Georgetown Home Services Editorial Team produces homeowner guides and provider directories for Georgetown, Texas and Williamson County. Content is researched from public business listings, Texas licensing registries (TSBPE, TDLR, TDA SPCS where relevant), insurer and municipal references, and established Central Texas housing patterns. First drafts may use editorial tooling; published pages are human-reviewed for claim discipline and local specificity. Georgetown Home Services is not a licensed contractor, does not dispatch tradespeople, and is owned and operated in Georgetown, Texas.";

/**
 * Organization schema fragment usable as the `author` field on Article schema.
 */
export function authorPersonSchema(siteUrl: string = SITE_URL) {
  return articleAuthorSchema(siteUrl);
}

export function articleAuthorSchema(siteUrl: string = SITE_URL) {
  const sameAs = authorSameAsFromEnv();
  return {
    "@type": "Organization" as const,
    name: AUTHOR_NAME,
    url: `${siteUrl}${AUTHOR_PROFILE_PATH}`,
    ...(sameAs.length ? { sameAs } : {}),
    parentOrganization: {
      "@type": "Organization" as const,
      name: PUBLISHER_NAME,
      url: siteUrl,
    },
  };
}

/**
 * Full Organization schema for the editorial team profile page.
 */
export function fullAuthorPersonSchema(siteUrl: string = SITE_URL) {
  const sameAs = authorSameAsFromEnv();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: AUTHOR_NAME,
    url: `${siteUrl}${AUTHOR_PROFILE_PATH}`,
    description: AUTHOR_LONG_DESCRIPTION,
    ...(sameAs.length ? { sameAs } : {}),
    knowsAbout: [...AUTHOR_KNOWS_ABOUT],
    areaServed: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Georgetown",
        addressRegion: "TX",
        addressCountry: "US",
      },
    },
    parentOrganization: {
      "@type": "Organization",
      name: PUBLISHER_NAME,
      url: siteUrl,
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

/** ProfilePage schema for the editorial team about URL. */
export function authorProfilePageSchema(siteUrl: string = SITE_URL) {
  const profileUrl = `${siteUrl}${AUTHOR_PROFILE_PATH}`;
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Organization",
      name: AUTHOR_NAME,
      url: profileUrl,
      description: AUTHOR_LONG_DESCRIPTION,
    },
    url: profileUrl,
    name: `${AUTHOR_NAME} — ${AUTHOR_JOB_TITLE}`,
  };
}
