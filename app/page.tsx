import Container from "../components/Container";
import LinkCard from "../components/LinkCard";
import Link from "next/link";
import type { Metadata } from "next";
import HomeHero from "../components/HomeHero";
import HomeEmailCaptureBand from "../components/HomeEmailCaptureBand";
import HomeTopProvidersColumn from "../components/HomeTopProvidersColumn";
import HomeTrustBar from "../components/HomeTrustBar";
import HomeHowItWorks from "../components/HomeHowItWorks";
import HomeCostGuidesSection from "../components/HomeCostGuidesSection";
import SeasonalHomeSection from "../components/SeasonalHomeSection";
import FAQList from "../components/FAQList";
import JsonLd from "../components/JsonLd";
import VerifiedProfileCard from "../components/VerifiedProfileCard";
import { pageSeoMetadata, SITE_URL } from "../lib/page-seo";
import { organizationSameAsUrls } from "../lib/schema";
import { getStaticPageLastUpdated } from "../lib/static-pages-last-updated";
import { CORE_SERVICE_SLUGS } from "../lib/pageContentRegistry";
import { EXTENDED_PROVIDER_GROUPS, isNoindexSlug, showExtendedHomeServices } from "../lib/public-site-scope";
import { getBlog, getServices } from "../lib/site-content";
import { HOME_PAGE_FAQS } from "../lib/home-page-faqs";
import type { ProviderGroup } from "../lib/businesses";
import { HOME_CATEGORY_CARD_DESCRIPTIONS } from "../lib/home-category-card-descriptions";
import { getHomepageVerifiedProviders } from "../lib/homepage-verified-providers";
import {
  getProvidersByCategory,
  type ProviderCategory,
} from "../data/providers";

const GROUP_TO_CATEGORY: Record<ProviderGroup, ProviderCategory> = {
  plumber: "plumbing",
  hvac: "hvac",
  roofer: "roofing",
  electrician: "electrical",
  landscaping: "landscaping",
  pest_control: "pest-control",
  foundation_repair: "foundation",
  house_cleaning: "cleaning",
};

function homeLocalBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Georgetown Home Services",
    url: SITE_URL,
    description:
      "Compare top-rated plumbers, HVAC companies, roofers, electricians, and more in Georgetown TX. Listings compiled from public business data, real Google ratings, and honest cost guides.",
    areaServed: [
      { "@type": "City", name: "Georgetown", containedInPlace: { "@type": "State", name: "Texas" } },
      { "@type": "City", name: "Round Rock", containedInPlace: { "@type": "State", name: "Texas" } },
      { "@type": "City", name: "Cedar Park", containedInPlace: { "@type": "State", name: "Texas" } },
      { "@type": "City", name: "Leander", containedInPlace: { "@type": "State", name: "Texas" } },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Georgetown",
      addressRegion: "TX",
      addressCountry: "US",
    },
    sameAs: organizationSameAsUrls(),
  };
}

function homeWebPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Georgetown TX Home Services Directory (2026) | Compare Local Providers",
    url: SITE_URL,
    description:
      "Compare top-rated plumbers, HVAC companies, roofers, electricians, and more in Georgetown TX. Listings compiled from public business data, real Google ratings, and honest cost guides. Direct provider contact info first. Any paid partner links are clearly labeled.",
    dateModified: getStaticPageLastUpdated("/"),
  };
}

export const metadata: Metadata = pageSeoMetadata({
  absoluteTitle: "Georgetown TX Home Services: Compare Local Pros, Reviews & Costs",
  description:
    "Compare Georgetown's top plumbers, HVAC, roofers, electricians & more — real Google ratings, honest cost guides, and license-checked providers where Texas requires them.",
  pathname: "/",
  ogType: "website",
});

export default function Home() {
  const services = getServices();
  const blog = getBlog();
  const verifiedProviders = getHomepageVerifiedProviders(6);
  const homepageTradeOrder: ProviderGroup[] = [
    "plumber",
    "hvac",
    "roofer",
    ...(showExtendedHomeServices() ? EXTENDED_PROVIDER_GROUPS : []),
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
  const topLocalGroups = homepageTradeOrder
    .map((key) => {
      const category = GROUP_TO_CATEGORY[key];
      const providers = getProvidersByCategory(category)
        .slice()
        .sort((a, b) => {
          const ar = typeof a.rating === "number" ? a.rating : -1;
          const br = typeof b.rating === "number" ? b.rating : -1;
          if (br !== ar) return br - ar;
          return a.name.localeCompare(b.name, "en");
        });
      return {
        title: tradeHomepageTitle[key],
        key,
        providers,
      };
    })
    .filter(({ providers }) => providers.length > 0);

  const browseCategoryServices = (CORE_SERVICE_SLUGS as readonly string[])
    .filter((slug) => !isNoindexSlug(slug))
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <div className="bg-surface-alt pb-40 md:pb-44">
      <JsonLd data={homeLocalBusinessJsonLd()} />
      <JsonLd data={homeWebPageJsonLd()} />

      <HomeHero />
      <HomeEmailCaptureBand />

      <Container>
        <section className="py-10 md:py-12">
          <div className="min-w-0">
            <HomeTrustBar />

            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted">
              New:{" "}
              <Link
                href="/reports/williamson-county-license-check"
                className="font-semibold text-brand underline hover:text-brand"
              >
                Williamson County license check report
              </Link>{" "}
              — how many directory contractors have Texas license numbers we primary-source confirmed
              against TSBPE, TDLR, and TDA SPCS.
            </p>

            {verifiedProviders.length > 0 ? (
              <section
                id="verified-providers"
                className="mt-10 scroll-mt-28 rounded-xl border border-ink/10 bg-surface p-6 sm:p-8"
                aria-labelledby="verified-providers-heading"
              >
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <h2
                      id="verified-providers-heading"
                      className="font-display text-xl font-semibold tracking-tight text-ink"
                    >
                      License-verified providers
                    </h2>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                      Providers with a Texas license number and verification date in our directory data, sorted by
                      rating then name—not an invented weekly ranking.
                    </p>
                  </div>
                  <Link
                    href="/best"
                    className="text-sm font-semibold text-brand underline-offset-2 hover:underline"
                  >
                    See all providers
                  </Link>
                </div>
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {verifiedProviders.map((provider) => (
                    <VerifiedProfileCard
                      key={`${provider.category}-${provider.name}`}
                      provider={provider}
                      variant="compact"
                      headingLevel="h3"
                    />
                  ))}
                </div>
              </section>
            ) : null}

            <section
              id="browse-categories"
              className="mt-10 scroll-mt-28 rounded-xl border border-ink/10 bg-surface p-6 sm:p-8"
              aria-labelledby="browse-categories-heading"
            >
              <h2
                id="browse-categories-heading"
                className="font-display text-xl font-semibold tracking-tight text-ink"
              >
                Browse by Category
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                Eight core trade hubs for Georgetown: guides, typical issues, and links to compare local companies.
              </p>
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {browseCategoryServices.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className="rounded-lg border border-ink/10 border-t-[3px] border-t-transparent bg-surface-alt p-4 transition hover:border-x-brand/25 hover:border-b-brand/25 hover:border-t-brand hover:bg-surface"
                  >
                    <div className="text-sm font-semibold text-ink">{s.serviceType}</div>
                    <p className="mt-1 text-sm leading-relaxed text-muted">
                      {HOME_CATEGORY_CARD_DESCRIPTIONS[s.slug] ?? s.description}
                    </p>
                    <div className="mt-2 text-xs font-semibold text-brand">
                      View {s.serviceType.toLowerCase()} guide →
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            <HomeCostGuidesSection />

            <SeasonalHomeSection />

            <HomeHowItWorks />
          </div>
        </section>

        <section
          id="providers"
          className="scroll-mt-28 rounded-xl border border-ink/10 bg-surface p-6 sm:p-8 md:-mt-4"
        >
          <h2 className="font-display text-xl font-semibold tracking-tight text-ink">Top Local Providers</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted">
            Same verified directory used on Best Of and provider profiles—sorted by Google rating within each trade,
            then use each hub for cost guides and deeper comparisons.
          </p>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {topLocalGroups.map(({ title, key, providers }) => (
              <HomeTopProvidersColumn
                key={key}
                title={title}
                providerGroupKey={key}
                providers={providers}
              />
            ))}
          </div>
        </section>

        {blog.length > 0 ? (
          <section className="py-10 md:py-12">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-ink">From the Blog</h2>
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
        ) : null}

        <section className="py-10 md:py-12">
          <FAQList faqs={HOME_PAGE_FAQS} variant="plain" speakable />
        </section>
      </Container>
    </div>
  );
}
