/**
 * License verification helpers for Georgetown Home Services provider listings.
 *
 * DATA CONTRACT (see `lib/businesses.ts` `Business` type):
 * - `licenseNumber?: string | null` — literal, verifiable license number as issued by the state board.
 *   NEVER fabricated. NEVER "pending". If absent/null/blank, no badge and no credential JSON-LD is emitted.
 * - `licenseType?: string | null`   — optional per-provider override for the issuing authority string
 *   (default is derived from `category`). Use only when a provider carries a credential outside
 *   the default state board for its trade.
 * - `licenseVerifiedDate?: string | null` — optional. When set (ISO `YYYY-MM-DD` or freeform display
 *   text like "Jul 2026"), rendered next to the license number. When absent, badge shows authority
 *   + license number only. NEVER fabricated.
 *
 * Categories with a mapped state authority (badge-eligible):
 *   plumbing        → TSBPE   (Texas State Board of Plumbing Examiners)
 *   electrical      → TDLR    (Texas Department of Licensing and Regulation)
 *   hvac            → TDLR    (Texas Department of Licensing and Regulation)
 *   pest control    → TDA SPCS (Texas Department of Agriculture, Structural Pest Control Service)
 *
 * Categories WITHOUT a mapped state authority (roofing, landscaping, foundation repair,
 * house cleaning) do not receive a badge even if `licenseNumber` is populated — because Texas
 * does not license those residential trades at the state level, so we have nothing verifiable
 * to attribute the number to. Set `licenseType` explicitly on the provider record to override.
 */

import type { Business } from "./businesses";

/** Default mapping from business `category` (lowercased) → issuing state authority acronym. */
export const CATEGORY_TO_AUTHORITY: Readonly<Record<string, string>> = {
  plumbing: "TSBPE",
  electrical: "TDLR",
  hvac: "TDLR",
  "pest control": "TDA SPCS",
};

/** Long-form name + official state URL for each mapped authority. */
export const AUTHORITY_DETAILS: Readonly<Record<string, { name: string; url: string }>> = {
  TSBPE: {
    name: "Texas State Board of Plumbing Examiners",
    url: "https://www.tsbpe.texas.gov/",
  },
  TDLR: {
    name: "Texas Department of Licensing and Regulation",
    url: "https://www.tdlr.texas.gov/",
  },
  "TDA SPCS": {
    name: "Texas Department of Agriculture — Structural Pest Control Service",
    url: "https://www.texasagriculture.gov/",
  },
};

export type VerifiedLicenseInfo = {
  number: string;
  authority: string;
  authorityLongName: string;
  authorityUrl?: string;
  date: string | null;
};

/**
 * Returns a normalized {@link VerifiedLicenseInfo} for the given provider, or `null` when the
 * provider has no license number, or has a category without a mapped state authority.
 *
 * NEVER returns invented data. Both consumers (visible badge and JSON-LD credential) rely on
 * `null` to short-circuit rendering.
 */
export function verifiedLicense(business: Business): VerifiedLicenseInfo | null {
  const num = business.licenseNumber?.trim();
  if (!num) return null;

  const categoryKey = (business.category ?? "").toLowerCase().trim();
  const explicitAuthority = business.licenseType?.trim();
  const authority = explicitAuthority || CATEGORY_TO_AUTHORITY[categoryKey];
  if (!authority) return null;

  const details = AUTHORITY_DETAILS[authority];
  const date = business.licenseVerifiedDate?.trim() || null;

  return {
    number: num,
    authority,
    authorityLongName: details?.name ?? authority,
    authorityUrl: details?.url,
    date,
  };
}

/**
 * Filter helper: return only providers with a valid `verifiedLicense()` result. Used by JSON-LD
 * builders and the methodology callout so both can short-circuit rendering when the input list
 * contains no verified providers.
 */
export function withVerifiedLicense(businesses: readonly Business[]): Business[] {
  return businesses.filter((b) => verifiedLicense(b) !== null);
}

/**
 * Build an `ItemList` of `LocalBusiness` entries — each with `hasCredential` populated from
 * the provider's `verifiedLicense()`. Returns `null` when no providers in the input list have a
 * verified license, so callers can render nothing at all.
 *
 * @see https://schema.org/hasCredential
 * @see https://schema.org/EducationalOccupationalCredential
 */
export function buildVerifiedProvidersItemListJsonLd(
  businesses: readonly Business[],
): Record<string, unknown> | null {
  const verified = withVerifiedLicense(businesses);
  if (!verified.length) return null;

  const itemListElement = verified.map((b, idx) => {
    const info = verifiedLicense(b)!;
    return {
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "LocalBusiness",
        name: b.name,
        ...(b.website ? { url: b.website } : {}),
        ...(b.phone ? { telephone: b.phone } : {}),
        address: {
          "@type": "PostalAddress",
          streetAddress: b.address,
          addressLocality: b.city || "Georgetown",
          addressRegion: b.state || "TX",
          postalCode: b.postal_code,
          addressCountry: "US",
        },
        hasCredential: {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: `${info.authority} License`,
          identifier: info.number,
          recognizedBy: {
            "@type": "Organization",
            name: info.authorityLongName,
            ...(info.authorityUrl ? { url: info.authorityUrl } : {}),
          },
          ...(info.date ? { dateCreated: info.date } : {}),
        },
      },
    };
  });

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListOrder: "https://schema.org/ItemListOrderDescending",
    numberOfItems: verified.length,
    itemListElement,
  };
}
