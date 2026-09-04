import { subServicePages } from "@/data/sub-services";
import type { Provider } from "@/data/providers";
import { CORE_SERVICE_SLUGS } from "@/lib/pageContentRegistry";
import { absolutePageUrl, SITE_URL } from "@/lib/page-seo";
import { providerHasPublishedReviewCount } from "@/lib/provider-card-display";
import { getContact, type Faq } from "@/lib/site-content";
import { faqsForFaqPageSchema } from "@/lib/faq-schema";
import { PUBLISHER_NAME, articleAuthorSchema } from "@/lib/site-author";

export type BreadcrumbItem = { name: string; url: string };

/** JSON-LD object (schema.org graph node or document). */
export type SchemaJsonLd = Record<string, unknown>;

export type SchemaFaq = Faq;

export type SchemaArticleInput = {
  headline: string;
  datePublished: string;
  dateModified: string;
  /** Absolute page URL. */
  url: string;
  description?: string;
  /** Absolute image URL; falls back to site OG image when omitted. */
  imageUrl?: string;
};

export type SchemaHowToStep = { name: string; text: string } | string;

export type SchemaHowToInput = {
  name: string;
  description?: string;
  steps: SchemaHowToStep[];
};

const SERVICE_SLUG_TO_SUB_CATEGORY: Record<string, string> = {
  "plumber-georgetown-tx": "plumbing",
  "hvac-georgetown-tx": "hvac",
  "roofer-georgetown-tx": "roofing",
  "electrician-georgetown-tx": "electrical",
  "landscaping-georgetown-tx": "landscaping",
  "pest-control-georgetown-tx": "pest-control",
  "foundation-repair-georgetown-tx": "foundation",
  "house-cleaning-georgetown-tx": "cleaning",
};

const GEORGETOWN_ZIPS = ["78626", "78628", "78633", "78634"] as const;

/**
 * BreadcrumbList JSON-LD from an ordered trail.
 * Each `url` should be absolute (e.g. from `absolutePageUrl`).
 */
export function buildBreadcrumbList(trail: BreadcrumbItem[]): SchemaJsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** @deprecated Prefer {@link buildBreadcrumbList}. */
export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return buildBreadcrumbList(items);
}

/**
 * FAQPage JSON-LD from visible Q/A pairs already rendered on the page.
 * Returns null when fewer than three non-boilerplate FAQs remain.
 */
export function buildFAQPage(
  faqs: SchemaFaq[],
  opts?: { pageUrl?: string; name?: string },
): SchemaJsonLd | null {
  const eligible = faqsForFaqPageSchema(faqs);
  if (eligible.length < 3) return null;
  const node: SchemaJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: eligible.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  if (opts?.pageUrl?.trim()) node.mainEntityOfPage = opts.pageUrl.trim();
  if (opts?.name?.trim()) node.name = opts.name.trim();
  return node;
}

function trimStr(s: string | undefined): string {
  return (s ?? "").trim();
}

/** PostalAddress only from real provider fields — never invent locality/region. */
function buildProviderAddress(provider: Provider): SchemaJsonLd | undefined {
  const street = trimStr(provider.address);
  const city = trimStr(provider.city);
  const state = trimStr(provider.state);
  const zip = trimStr(provider.postalCode);
  if (!street && !city && !state && !zip) return undefined;

  const addr: SchemaJsonLd = {
    "@type": "PostalAddress",
    addressCountry: "US",
  };
  if (street) addr.streetAddress = street;
  if (city) addr.addressLocality = city;
  if (state) addr.addressRegion = state;
  if (zip) addr.postalCode = zip;
  return addr;
}

/**
 * LocalBusiness JSON-LD for a directory provider.
 * Omits aggregateRating unless both rating and a published reviewCount exist.
 * Omits hasCredential unless both licenseNumber and licenseBody exist.
 */
export function buildLocalBusiness(provider: Provider, pageUrl?: string): SchemaJsonLd {
  const node: SchemaJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: provider.name,
  };

  const phone = trimStr(provider.phone);
  if (phone) node.telephone = phone;

  const address = buildProviderAddress(provider);
  if (address) node.address = address;

  const url = trimStr(pageUrl) || trimStr(provider.googleMapsUrl);
  if (url) node.url = url;

  const areaServed = trimStr(provider.serviceArea);
  if (areaServed) node.areaServed = areaServed;

  const description = trimStr(provider.description);
  if (description) node.description = description;

  if (
    typeof provider.rating === "number" &&
    Number.isFinite(provider.rating) &&
    providerHasPublishedReviewCount(provider)
  ) {
    node.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: provider.rating.toFixed(1),
      reviewCount: String(provider.reviewCount),
    };
  }

  const licenseNumber = trimStr(provider.licenseNumber);
  const licenseBody = provider.licenseBody;
  if (licenseNumber && licenseBody) {
    const credential: SchemaJsonLd = {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "ProfessionalLicense",
      identifier: licenseNumber,
      recognizedBy: {
        "@type": "Organization",
        name: licenseBody,
      },
    };
    const licenseType = trimStr(provider.licenseType);
    if (licenseType) credential.name = licenseType;
    const verified = trimStr(provider.licenseVerifiedDate);
    if (verified) credential.dateCreated = verified;
    node.hasCredential = credential;
  }

  return node;
}

/** LocalBusiness node without `@context` (for nesting inside ItemList). */
export function buildLocalBusinessNode(provider: Provider, pageUrl?: string): SchemaJsonLd {
  const full = buildLocalBusiness(provider, pageUrl);
  const { ["@context"]: _ctx, ...rest } = full;
  return rest;
}

/**
 * Article JSON-LD — author is always Person "Matt"; publisher is the site Organization.
 */
export function buildArticle(post: SchemaArticleInput): SchemaJsonLd {
  const siteUrl = siteRoot();
  const imageUrl = trimStr(post.imageUrl) || `${siteUrl}/og-image.jpg`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.headline,
    ...(trimStr(post.description) ? { description: trimStr(post.description) } : {}),
    mainEntityOfPage: post.url,
    url: post.url,
    image: {
      "@type": "ImageObject",
      url: imageUrl,
      width: 1200,
      height: 630,
    },
    author: articleAuthorSchema(siteUrl),
    publisher: {
      "@type": "Organization",
      name: PUBLISHER_NAME,
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.png`,
      },
    },
    datePublished: post.datePublished,
    dateModified: post.dateModified,
  };
}

/**
 * HowTo JSON-LD for pages that visibly render ordered steps.
 * Returns null when fewer than two real steps are provided.
 */
export function buildHowTo(guide: SchemaHowToInput): SchemaJsonLd | null {
  const steps = guide.steps
    .map((step) => {
      if (typeof step === "string") {
        const text = step.trim();
        if (!text) return null;
        return { "@type": "HowToStep" as const, name: text.slice(0, 120), text };
      }
      const name = step.name.trim();
      const text = step.text.trim();
      if (!name || !text) return null;
      return { "@type": "HowToStep" as const, name, text };
    })
    .filter((s): s is { "@type": "HowToStep"; name: string; text: string } => s != null);

  if (steps.length < 2) return null;

  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: guide.name,
    ...(trimStr(guide.description) ? { description: trimStr(guide.description) } : {}),
    step: steps,
  };
}

function siteRoot(): string {
  return SITE_URL.replace(/\/$/, "");
}

/** Home → Services → [service] */
export function breadcrumbSchemaForService(serviceTitle: string, serviceSlug: string) {
  const root = siteRoot();
  return buildBreadcrumbList([
    { name: "Home", url: `${root}/` },
    { name: "Services", url: `${root}/services` },
    { name: serviceTitle, url: `${root}/services/${serviceSlug}` },
  ]);
}

/** Home → Provider Directory → [category] */
export function breadcrumbSchemaForBestOf(bestTitle: string, bestSlug: string) {
  const root = siteRoot();
  return buildBreadcrumbList([
    { name: "Home", url: `${root}/` },
    { name: "Provider Directory", url: `${root}/best` },
    { name: bestTitle, url: `${root}/best/${bestSlug}` },
  ]);
}

/** Home → Cost Guides → [guide] */
export function breadcrumbSchemaForCostGuide(guideTitle: string, pathname: string) {
  const root = siteRoot();
  return buildBreadcrumbList([
    { name: "Home", url: `${root}/` },
    { name: "Cost Guides", url: `${root}/costs` },
    { name: guideTitle, url: `${root}${pathname.startsWith("/") ? pathname : `/${pathname}`}` },
  ]);
}

/** Home → Blog → [post] */
export function breadcrumbSchemaForBlog(postTitle: string, slug: string) {
  const root = siteRoot();
  return buildBreadcrumbList([
    { name: "Home", url: `${root}/` },
    { name: "Blog", url: `${root}/blog` },
    { name: postTitle, url: `${root}/blog/${slug}` },
  ]);
}

/** Home → Services → [service] → [sub-service] */
export function breadcrumbSchemaForSubService(
  serviceLabel: string,
  parentHubPath: string,
  subServiceName: string,
  pathname: string,
) {
  const root = siteRoot();
  return buildBreadcrumbList([
    { name: "Home", url: `${root}/` },
    { name: "Services", url: `${root}/services` },
    { name: serviceLabel, url: `${root}${parentHubPath.startsWith("/") ? parentHubPath : `/${parentHubPath}`}` },
    { name: subServiceName, url: `${root}${pathname.startsWith("/") ? pathname : `/${pathname}`}` },
  ]);
}

/** Home → Browse by Area → [ZIP] */
export function breadcrumbSchemaForZip(zipLabel: string, zipcode: string) {
  const root = siteRoot();
  return buildBreadcrumbList([
    { name: "Home", url: `${root}/` },
    { name: "Browse by Area", url: `${root}/zip` },
    { name: zipLabel, url: `${root}/zip/${zipcode}` },
  ]);
}

/** Home → Compare Providers → [comparison] */
export function breadcrumbSchemaForComparison(comparisonTitle: string, slug: string) {
  const root = siteRoot();
  return buildBreadcrumbList([
    { name: "Home", url: `${root}/` },
    { name: "Compare Providers", url: `${root}/compare` },
    { name: comparisonTitle, url: `${root}/compare/${slug}` },
  ]);
}

/** Home → Provider Directory → [category] → [provider] */
export function breadcrumbSchemaForProvider(
  bestTitle: string,
  bestSlug: string,
  providerName: string,
  providerSlug: string,
) {
  const root = siteRoot();
  return buildBreadcrumbList([
    { name: "Home", url: `${root}/` },
    { name: "Provider Directory", url: `${root}/best` },
    { name: bestTitle, url: `${root}/best/${bestSlug}` },
    { name: providerName, url: `${root}/providers/${providerSlug}` },
  ]);
}

function organizationSameAsFromEnv(): string[] {
  const urls: string[] = [];
  const gbp = process.env.NEXT_PUBLIC_GOOGLE_BUSINESS_PROFILE_URL?.trim();
  const facebook = process.env.NEXT_PUBLIC_FACEBOOK_PAGE_URL?.trim();
  const linkedin = process.env.NEXT_PUBLIC_LINKEDIN_COMPANY_URL?.trim();
  const youtube = process.env.NEXT_PUBLIC_YOUTUBE_URL?.trim();
  for (const raw of [gbp, facebook, linkedin, youtube]) {
    if (!raw) continue;
    try {
      const u = new URL(raw).href;
      urls.push(u);
    } catch {
      /* skip invalid */
    }
  }
  return urls;
}

/** Public sameAs URLs for Organization / home LocalBusiness schema. */
export function organizationSameAsUrls(): string[] {
  return organizationSameAsFromEnv();
}

/** Sitewide Organization JSON-LD (root layout). */
export function organizationSchema() {
  const { email: orgEmail } = getContact();
  const root = siteRoot();
  const sameAs = organizationSameAsFromEnv();

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Georgetown Home Services",
    url: root,
    logo: `${root}/logo.png`,
    description:
      "Georgetown TX home services directory and homeowner guide—compare plumbers, HVAC, roofers, electricians, landscapers, pest control, foundation repair, and house cleaning with local cost guides.",
    areaServed: {
      "@type": "City",
      name: "Georgetown",
      addressRegion: "TX",
      addressCountry: "US",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: orgEmail,
      areaServed: "US",
      availableLanguage: ["English", "en-US"],
    },
    knowsAbout: [
      "Plumbing",
      "HVAC",
      "Roofing",
      "Electrical",
      "Landscaping",
      "Pest control",
      "Foundation repair",
      "House cleaning",
    ],
    ...(sameAs.length ? { sameAs } : {}),
  };
}

/**
 * Cost-guide price bands as AggregateOffer JSON-LD.
 * Mirrors the visible price table — never invents numbers.
 */
export function buildCostGuideOfferCatalog(opts: {
  serviceName: string;
  pageUrl: string;
  year: string;
  priceRows: ReadonlyArray<{
    serviceType: string;
    low: number;
    average: number;
    high: number;
    unit?: string;
  }>;
}): SchemaJsonLd | null {
  if (!opts.priceRows.length) return null;
  const validThrough = `${opts.year}-12-31`;

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${opts.serviceName} cost ranges in Georgetown, TX (${opts.year})`,
    url: opts.pageUrl,
    numberOfItems: opts.priceRows.length,
    itemListElement: opts.priceRows.map((row, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "AggregateOffer",
        name: row.serviceType,
        priceCurrency: "USD",
        lowPrice: String(row.low),
        highPrice: String(row.high),
        offerCount: 1,
        ...(row.unit?.trim() ? { unitText: row.unit.trim() } : {}),
        priceSpecification: {
          "@type": "PriceSpecification",
          price: String(row.average),
          priceCurrency: "USD",
          validThrough,
        },
        areaServed: {
          "@type": "City",
          name: "Georgetown",
          addressRegion: "TX",
          addressCountry: "US",
        },
        description: `Planning estimate for ${row.serviceType} in Georgetown / Williamson County, TX (${opts.year}). Midpoint ${row.average}. Not a quote.`,
      },
    })),
  };
}

/** SpeakableSpecification pointing at on-page CSS selectors. */
export function buildSpeakableSchema(cssSelectors: string[]): SchemaJsonLd | null {
  const selectors = cssSelectors.map((s) => s.trim()).filter(Boolean);
  if (!selectors.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: selectors,
    },
  };
}

/** Sitewide WebSite JSON-LD with SearchAction (root layout). */
export function websiteSchema() {
  const root = siteRoot();
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Georgetown Home Services",
    url: root,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${root}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function subServiceNamesForCoreService(serviceSlug: string): string[] {
  const category = SERVICE_SLUG_TO_SUB_CATEGORY[serviceSlug];
  if (!category) return [];
  return subServicePages.filter((p) => p.serviceSlug === category).map((p) => p.subServiceName);
}

/** LocalBusiness directory schema for core `/services/[slug]` pages. */
export function serviceDirectoryLocalBusinessSchema(opts: {
  serviceSlug: string;
  serviceType: string;
  serviceTitle: string;
}) {
  if (!(CORE_SERVICE_SLUGS as readonly string[]).includes(opts.serviceSlug)) {
    return null;
  }

  const pageUrl = absolutePageUrl(`/services/${opts.serviceSlug}`);
  const subNames = subServiceNamesForCoreService(opts.serviceSlug);

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `Georgetown Home Services - ${opts.serviceType}`,
    url: pageUrl,
    description: `${opts.serviceTitle} — Georgetown TX directory, cost guides, and provider comparisons compiled from public business data.`,
    areaServed: ["Georgetown TX", ...GEORGETOWN_ZIPS],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${opts.serviceType} in Georgetown TX`,
      itemListElement: subNames.map((name, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name,
            areaServed: "Georgetown TX",
          },
        },
      })),
    },
  };
}
