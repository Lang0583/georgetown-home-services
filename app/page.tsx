import Container from "../components/Container";
import LinkCard from "../components/LinkCard";
import { ButtonLink } from "../components/Button";
import Link from "next/link";
import type { Metadata } from "next";
import HomeTopProvidersColumn from "../components/HomeTopProvidersColumn";
import HomeTrustBar from "../components/HomeTrustBar";
import HomeHowItWorks from "../components/HomeHowItWorks";
import FAQList from "../components/FAQList";
import FAQSchema from "../components/FAQSchema";
import JsonLd from "../components/JsonLd";
import LocalBusinessSchema from "../components/LocalBusinessSchema";
import { pageSeoMetadata, SITE_URL, absolutePageUrl } from "../lib/page-seo";
import { CORE_SERVICE_SLUGS } from "../lib/pageContentRegistry";
import { EXTENDED_PROVIDER_GROUPS, isNoindexSlug } from "../lib/public-site-scope";
import type { Faq } from "../lib/site-content";
import { getBlog, getServices } from "../lib/site-content";
import businesses from "../lib/businesses.json";
import {
  normalizeBusinessGroup,
  type Business,
  type ProviderGroup,
} from "../lib/businesses";

function sortedProvidersForGroup(list: Business[], group: ProviderGroup) {
  return list
    .filter((b) => normalizeBusinessGroup(b) === group)
    .sort((a, b) => (b.rating !== a.rating ? b.rating - a.rating : b.reviews - a.reviews));
}

function homeWebPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Georgetown TX Home Services Directory (2026) | Compare Local Providers",
    url: SITE_URL,
    description:
      "Compare top-rated plumbers, HVAC companies, roofers, electricians, and more in Georgetown TX. Verified local providers, real Google ratings, and honest cost guides. No lead forms.",
    dateModified: "2026-04-13",
  };
}

/** Homepage FAQ copy + FAQPage JSON-LD (single source; must match visible FAQ section). */
const HOME_PAGE_FAQS: Faq[] = [
  {
    q: "What home services are available in Georgetown, TX?",
    a: "Georgetown has active local providers for plumbing, HVAC, roofing, electrical, landscaping, pest control, foundation repair, and house cleaning. Georgetown Home Services maintains a directory of top-rated local companies for each category.",
  },
  {
    q: "How do I find a reliable home service company in Georgetown, TX?",
    a: "Start by checking reviews on Google and comparing at least 3 companies. Look for businesses with consistent ratings above 4.5 stars, verified licenses, and written estimates. Georgetown Home Services lists pre-screened providers across all major home service categories.",
  },
  {
    q: "How much does it cost to hire a plumber in Georgetown, TX?",
    a: "Most plumbing jobs in Georgetown range from $150 to $500 for common repairs. Emergency calls and larger jobs like slab leak repair can run $1,000 or more. See our plumbing cost guides for detailed breakdowns.",
  },
  {
    q: "Is Georgetown, TX a good area for foundation issues?",
    a: "Yes - Central Texas clay soil expands and contracts with moisture, making foundation movement common in Georgetown. Hairline cracks are often cosmetic, but horizontal or stair-step cracks warrant a professional inspection.",
  },
  {
    q: "How do I know if I need a new HVAC system in Georgetown?",
    a: "Key signs include a system older than 15 years, frequent repairs, uneven cooling, or energy bills rising without explanation. Georgetown summers regularly exceed 100 degrees, making a functioning HVAC essential.",
  },
];

export const metadata: Metadata = pageSeoMetadata({
  absoluteTitle: "Georgetown TX Home Services Directory (2026) | Compare Local Providers",
  description:
    "Compare top-rated plumbers, HVAC companies, roofers, electricians, and more in Georgetown TX. Verified local providers, real Google ratings, and honest cost guides. No lead forms.",
  pathname: "/",
  ogType: "website",
});

export default function Home() {
  const services = getServices();
  const blog = getBlog();
  const allBusinesses = businesses as Business[];
  const homepageTradeOrder: ProviderGroup[] = [
    "plumber",
    "hvac",
    "roofer",
    ...EXTENDED_PROVIDER_GROUPS,
  ] as ProviderGroup[];
  const tradeHomepageTitle: Record<ProviderGroup, string> = {
    plumber: "Plumbers",
    hvac: "HVAC",
    roofer: "Roofers",
    electrician: "Electricians",
    landscaping: "Landscaping",
    pest_control: "Pest control",
    foundation_repair: "Foundation",
    house_cleaning: "Cleaning",
  };
  const topLocalGroups: { title: string; key: ProviderGroup }[] = homepageTradeOrder.map((key) => ({
    title: tradeHomepageTitle[key],
    key,
  }));

  const browseCategoryServices = (CORE_SERVICE_SLUGS as readonly string[])
    .filter((slug) => !isNoindexSlug(slug))
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <div className="bg-gray-50 pb-40 md:pb-44">
      <LocalBusinessSchema />
      <JsonLd data={homeWebPageJsonLd()} />
      <FAQSchema pageUrl={absolutePageUrl("/")} name="Georgetown TX home services — FAQ" faqs={HOME_PAGE_FAQS} />
      <Container>
        <section className="py-10 md:py-12">
          <div className="min-w-0">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
              Georgetown TX Home Services Directory (2026) | Compare Local Providers
            </h1>

            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-700">
              Verified local providers, real ratings, and honest cost guides — no lead forms, no spam.
            </p>

            <div className="mt-6">
              <ButtonLink href="#providers" className="text-sm">
                Browse Local Providers
              </ButtonLink>
            </div>

            <HomeTrustBar />

            <section
              id="browse-categories"
              className="mt-10 scroll-mt-28 rounded-xl border border-gray-200 bg-white p-6 shadow-md sm:p-8"
              aria-labelledby="browse-categories-heading"
            >
              <h2 id="browse-categories-heading" className="text-xl font-semibold tracking-tight text-gray-900">
                Browse by Category
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-700">
                Eight core trade hubs for Georgetown: guides, typical issues, and links to compare local companies.
              </p>
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {browseCategoryServices.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className="rounded-lg border border-gray-200 border-t-[3px] border-t-transparent bg-gray-50 p-4 transition hover:border-x-primary/25 hover:border-b-primary/25 hover:border-t-primary hover:bg-white"
                  >
                    <div className="text-sm font-semibold text-gray-900">{s.serviceType}</div>
                    <p className="mt-1 line-clamp-2 text-sm text-gray-700">{s.description}</p>
                    <div className="mt-2 text-xs font-semibold text-primary">View {s.serviceType.toLowerCase()} guide →</div>
                  </Link>
                ))}
              </div>
            </section>

            <HomeHowItWorks />
          </div>
        </section>

        <section
          id="providers"
          className="mt-10 scroll-mt-28 rounded-xl border border-gray-200 bg-white p-6 shadow-md sm:p-8 md:mt-12 md:-mt-4 md:py-10"
        >
          <h2 className="text-2xl font-semibold tracking-tight text-gray-900 md:text-3xl">Top Local Providers</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-gray-700 md:text-base">
            Top listings from public data by category—shortlist companies here, then use each trade hub for cost guides and
            deeper comparisons.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-x-8 md:gap-y-10 lg:grid-cols-4 lg:gap-x-6">
            {topLocalGroups.map(({ title, key }) => (
              <HomeTopProvidersColumn
                key={key}
                title={title}
                providerGroupKey={key}
                businesses={sortedProvidersForGroup(allBusinesses, key)}
              />
            ))}
          </div>
        </section>

        <section className="mt-12 border-t border-gray-200 py-10 md:mt-14 md:py-12">
          <h2 className="text-3xl font-semibold tracking-tight text-gray-900">From the Blog</h2>
          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
            {blog.map((p) => (
              <LinkCard
                key={p.slug}
                href={`/blog/${p.slug}`}
                title={p.title}
                description={p.description}
                badge={p.readTime}
              />
            ))}
          </div>
        </section>

        <section className="border-t border-gray-200 py-10 md:py-12">
          <FAQList faqs={HOME_PAGE_FAQS} variant="plain" />
        </section>

      </Container>
    </div>
  );
}
