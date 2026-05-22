import { SITE_URL } from "./page-seo";

/**
 * LocalBusiness JSON-LD for Georgetown Home Services (publisher / directory).
 * Uses the same origin as page canonicals (`SITE_URL`, typically `www`).
 */
export const GEORGETOWN_HOME_SERVICES_BUSINESS_URL = SITE_URL.replace(/\/$/, "");

export function buildGeorgetownHomeServicesLocalBusinessJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Georgetown Home Services",
    url: GEORGETOWN_HOME_SERVICES_BUSINESS_URL,
    description:
      "Georgetown TX homeowner guide and directory for plumbing, HVAC, roofing, and related trades—cost context and vetted local company shortlists.",
    /** City + ZIP line as published on-site; full `PostalAddress` for parsers. */
    address: {
      "@type": "PostalAddress",
      streetAddress: "Georgetown, TX 78626",
      addressLocality: "Georgetown",
      addressRegion: "TX",
      postalCode: "78626",
      addressCountry: "US",
    },
    /**
     * Text form of service area (plus structured `areaServed` for clarity).
     * @see https://schema.org/areaServed
     */
    areaServed: [
      "Georgetown TX and surrounding Williamson County",
      {
        "@type": "AdministrativeArea",
        name: "Williamson County",
        containedInPlace: { "@type": "State", name: "Texas" },
      },
    ],
    serviceType: ["Plumbing", "HVAC", "Roofing"],
  };
}
