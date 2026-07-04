import { subServicePages } from "@/data/sub-services";
import { CORE_SERVICE_SLUGS } from "@/lib/pageContentRegistry";
import { absolutePageUrl, SITE_URL } from "@/lib/page-seo";
import { getContact } from "@/lib/site-content";

export type BreadcrumbItem = { name: string; url: string };

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

/** BreadcrumbList JSON-LD from ordered `{ name, url }` items (urls should be absolute). */
export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

function siteRoot(): string {
  return SITE_URL.replace(/\/$/, "");
}

/** Home → Services → [service] */
export function breadcrumbSchemaForService(serviceTitle: string, serviceSlug: string) {
  const root = siteRoot();
  return generateBreadcrumbSchema([
    { name: "Home", url: `${root}/` },
    { name: "Services", url: `${root}/services` },
    { name: serviceTitle, url: `${root}/services/${serviceSlug}` },
  ]);
}

/** Home → Provider Directory → [category] */
export function breadcrumbSchemaForBestOf(bestTitle: string, bestSlug: string) {
  const root = siteRoot();
  return generateBreadcrumbSchema([
    { name: "Home", url: `${root}/` },
    { name: "Provider Directory", url: `${root}/best` },
    { name: bestTitle, url: `${root}/best/${bestSlug}` },
  ]);
}

/** Home → Cost Guides → [guide] */
export function breadcrumbSchemaForCostGuide(guideTitle: string, pathname: string) {
  const root = siteRoot();
  return generateBreadcrumbSchema([
    { name: "Home", url: `${root}/` },
    { name: "Cost Guides", url: `${root}/costs` },
    { name: guideTitle, url: `${root}${pathname.startsWith("/") ? pathname : `/${pathname}`}` },
  ]);
}

/** Home → Blog → [post] */
export function breadcrumbSchemaForBlog(postTitle: string, slug: string) {
  const root = siteRoot();
  return generateBreadcrumbSchema([
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
  return generateBreadcrumbSchema([
    { name: "Home", url: `${root}/` },
    { name: "Services", url: `${root}/services` },
    { name: serviceLabel, url: `${root}${parentHubPath.startsWith("/") ? parentHubPath : `/${parentHubPath}`}` },
    { name: subServiceName, url: `${root}${pathname.startsWith("/") ? pathname : `/${pathname}`}` },
  ]);
}

/** Home → Browse by Area → [ZIP] */
export function breadcrumbSchemaForZip(zipLabel: string, zipcode: string) {
  const root = siteRoot();
  return generateBreadcrumbSchema([
    { name: "Home", url: `${root}/` },
    { name: "Browse by Area", url: `${root}/zip` },
    { name: zipLabel, url: `${root}/zip/${zipcode}` },
  ]);
}

/** Home → Compare Providers → [comparison] */
export function breadcrumbSchemaForComparison(comparisonTitle: string, slug: string) {
  const root = siteRoot();
  return generateBreadcrumbSchema([
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
  return generateBreadcrumbSchema([
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
  for (const raw of [gbp, facebook]) {
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
