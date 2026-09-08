import { absolutePageUrl } from "@/lib/page-seo";
import type { SchemaJsonLd } from "@/lib/schema";
import type { LicensedProvider } from "@/lib/providers";
import {
  formatVerifiedOnPlain,
  licenseRankLabel,
  nonEmpty,
  placesAddress,
  placesPhone,
  placesRating,
  placesReviewCount,
  placesWebsite,
} from "@/lib/providers";

/** Plumber / LocalBusiness JSON-LD for a TSBPE licensed provider page. */
export function buildLicensedPlumberJsonLd(
  provider: LicensedProvider,
  pageUrl: string,
): SchemaJsonLd {
  const node: SchemaJsonLd = {
    "@context": "https://schema.org",
    "@type": "Plumber",
    name: provider.company,
    url: pageUrl,
  };

  const phone = placesPhone(provider);
  if (phone) node.telephone = phone;

  const website = placesWebsite(provider);
  if (website) node.sameAs = [website];

  const addressLine = placesAddress(provider);
  const city = nonEmpty(provider.city);
  const zip = nonEmpty(provider.zip);
  if (addressLine || city || zip) {
    const address: SchemaJsonLd = {
      "@type": "PostalAddress",
      addressCountry: "US",
      addressRegion: "TX",
    };
    if (addressLine) address.streetAddress = addressLine;
    if (city) address.addressLocality = city;
    if (zip) address.postalCode = zip;
    node.address = address;
  }

  const areaParts = [
    city,
    nonEmpty(provider.county) ? `${provider.county.trim()} County` : null,
    "Texas",
  ].filter(Boolean) as string[];
  if (areaParts.length) {
    node.areaServed = areaParts.map((name) => ({ "@type": "AdministrativeArea", name }));
  }

  const rating = placesRating(provider);
  const reviewCount = placesReviewCount(provider);
  if (rating != null && reviewCount != null) {
    node.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: rating.toFixed(1),
      reviewCount: String(reviewCount),
    };
  }

  const licenseNumber = nonEmpty(provider.licenseNumber);
  if (licenseNumber) {
    node.hasCredential = {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "ProfessionalLicense",
      identifier: licenseNumber,
      name: `${licenseRankLabel(provider.licenseRank)} plumber license`,
      recognizedBy: {
        "@type": "Organization",
        name: provider.sourceRegistry || "Texas State Board of Plumbing Examiners",
        url: nonEmpty(provider.sourceUrl) ?? undefined,
      },
      dateCreated: provider.verifiedOn,
    };
  }

  node.description = `${provider.company} is a licensed plumbing contractor listed from the Texas State Board of Plumbing Examiners public licensee file. Checked ${formatVerifiedOnPlain(provider.verifiedOn)}.`;

  return node;
}

export function buildProviderBreadcrumbJsonLd(providerName: string, pageUrl: string): SchemaJsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absolutePageUrl("/") },
      { "@type": "ListItem", position: 2, name: "Providers", item: absolutePageUrl("/providers") },
      { "@type": "ListItem", position: 3, name: providerName, item: pageUrl },
    ],
  };
}

export function buildLicensedProviderItemListJsonLd(
  providers: LicensedProvider[],
  opts: { name: string },
): SchemaJsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: opts.name,
    numberOfItems: providers.length,
    itemListElement: providers.map((provider, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absolutePageUrl(`/providers/${provider.slug}`),
      name: provider.company,
    })),
  };
}
