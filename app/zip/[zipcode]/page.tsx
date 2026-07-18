import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "../../../components/Breadcrumbs";
import FAQList from "../../../components/FAQList";
import JsonLd from "../../../components/JsonLd";
import LinkCard from "../../../components/LinkCard";
import ProviderCard from "../../../components/ProviderCard";
import AffiliateCTA from "../../../components/AffiliateCTA";
import LicenseVerificationMethodology from "../../../components/LicenseVerificationMethodology";
import PageShell from "../../../components/templates/PageShell";
import { costGuidePages } from "../../../data/cost-guides";
import {
  GEORGETOWN_ZIP_CODES,
  ZIP_SERVICE_LINKS,
  getZipCodePage,
  zipPageH1,
  zipPageTitle,
  zipServiceHref,
} from "../../../data/zip-codes";
import {
  PROVIDER_CATEGORY_LABELS,
  PROVIDER_CATEGORY_ORDER,
  PROVIDER_DISCLAIMER,
  PROVIDERS,
  PROVIDERS_LAST_VERIFIED,
  getTopProvidersByCategory,
} from "../../../data/providers";
import { pageSeoMetadata, absolutePageUrl } from "../../../lib/page-seo";
import { buildFaqPageJsonLd } from "../../../lib/faq-schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return GEORGETOWN_ZIP_CODES.map((zipcode) => ({ zipcode }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ zipcode: string }>;
}): Promise<Metadata> {
  const { zipcode } = await params;
  const page = getZipCodePage(zipcode);
  if (!page) return {};

  return pageSeoMetadata({
    titleSegment: zipPageTitle(page.zip),
    description: page.metaDescription,
    pathname: `/zip/${page.zip}`,
    ogType: "website",
  });
}

function breadcrumbJsonLd(siteUrl: string, zip: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Browse by ZIP", item: `${siteUrl}/zip` },
      { "@type": "ListItem", position: 3, name: `Georgetown TX ${zip}`, item: `${siteUrl}/zip/${zip}` },
    ],
  };
}

export default async function ZipCodePage({ params }: { params: Promise<{ zipcode: string }> }) {
  const { zipcode } = await params;
  const page = getZipCodePage(zipcode);
  if (!page) notFound();

  const siteUrl = process.env.SITE_URL ?? "https://www.georgetownhomeservices.com";

  const costGuides = page.costGuideSlugs
    .map((slug) => costGuidePages.find((g) => g.slug === slug))
    .filter((g): g is (typeof costGuidePages)[number] => Boolean(g));

  const zipFaqSchema = buildFaqPageJsonLd({
    pageUrl: absolutePageUrl(`/zip/${page.zip}`),
    name: `Georgetown TX ${page.zip} — FAQ`,
    faqs: page.faqs,
  });

  return (
    <PageShell>
      <section className="py-8 md:py-12">
        <JsonLd data={breadcrumbJsonLd(siteUrl, page.zip)} />
        {zipFaqSchema ? <JsonLd data={zipFaqSchema} /> : null}

        <div className="mx-auto max-w-5xl px-4">
          <Breadcrumbs
            items={[
              { href: "/", label: "Home" },
              { href: "/zip", label: "Browse by ZIP" },
              { href: `/zip/${page.zip}`, label: `Georgetown TX ${page.zip}` },
            ]}
          />

          <header className="mt-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand">Georgetown, Texas</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink md:text-4xl">
              {zipPageH1(page.zip)}
            </h1>
            <p className="mt-3 text-lg text-muted">{page.neighborhoods}</p>
          </header>

          <div className="prose prose-gray mt-8 max-w-none">
            {page.introParagraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 48)} className="text-base leading-relaxed text-muted">
                {paragraph}
              </p>
            ))}
          </div>

          <section className="mt-12 scroll-mt-24" aria-labelledby="zip-services-heading">
            <h2 id="zip-services-heading" className="text-2xl font-semibold tracking-tight text-ink">
              Services in This Area
            </h2>
            <p className="mt-2 max-w-3xl text-sm text-muted">
              Service guides for Georgetown homeowners in ZIP {page.zip}. Links include your ZIP for reference when
              you compare providers.
            </p>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {ZIP_SERVICE_LINKS.map((service) => (
                <LinkCard
                  key={service.slug}
                  href={zipServiceHref(service.slug, page.zip)}
                  title={service.label}
                  description={service.description}
                  badge={`ZIP ${page.zip}`}
                  categoryTopHover
                />
              ))}
            </div>
          </section>

          <section className="mt-12 scroll-mt-24" aria-labelledby="zip-providers-heading">
            <h2 id="zip-providers-heading" className="text-2xl font-semibold tracking-tight text-ink">
              Top Providers Serving {page.zip}
            </h2>
            <div className="mt-3 rounded-lg border border-ink/10 bg-surface-alt px-4 py-3 text-sm text-muted">
              <p>
                <span className="font-semibold text-ink">Last verified:</span> {PROVIDERS_LAST_VERIFIED}
              </p>
              <p className="mt-1 text-muted">{PROVIDER_DISCLAIMER}</p>
              <p className="mt-2 text-muted">
                Serving Georgetown and surrounding areas — confirm current availability for your {page.zip} address
                directly with each company.
              </p>
            </div>

            <div className="mt-8 space-y-10">
              <LicenseVerificationMethodology providers={PROVIDERS} />
              {PROVIDER_CATEGORY_ORDER.map((category) => {
                const providers = getTopProvidersByCategory(category, 3);
                if (!providers.length) return null;
                return (
                  <div key={category}>
                    <h3 className="text-lg font-semibold text-ink">
                      {PROVIDER_CATEGORY_LABELS[category]}
                    </h3>
                    <div className="mt-4 space-y-5">
                      {providers.map((provider) => (
                        <ProviderCard key={`${category}-${provider.name}`} provider={provider} />
                      ))}
                    </div>
                  </div>
                );
              })}
              <AffiliateCTA
                heading={`Partner network quotes for ${page.zip}`}
                serviceLabel={`${page.zip} home services`}
              />
            </div>
          </section>

          <section className="mt-12 scroll-mt-24" aria-labelledby="zip-costs-heading">
            <h2 id="zip-costs-heading" className="text-2xl font-semibold tracking-tight text-ink">
              Cost Guides for {page.zip} Homeowners
            </h2>
            <p className="mt-2 max-w-3xl text-sm text-muted">
              Planning ranges for common projects in {page.shortLabel} ({page.housingProfile}).
            </p>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {costGuides.map((guide) => (
                <LinkCard
                  key={guide.slug}
                  href={`/costs/${guide.slug}`}
                  title={guide.shortName}
                  description={guide.indexBlurb}
                  badge="Cost guide"
                />
              ))}
            </div>
            <p className="mt-4 text-sm text-muted">
              More ranges:{" "}
              <Link href="/costs" className="font-semibold text-brand hover:underline">
                browse all Georgetown cost guides
              </Link>
              .
            </p>
          </section>

          <section className="mt-12">
            <FAQList faqs={page.faqs} title={`FAQ: Georgetown TX ${page.zip}`} />
          </section>
        </div>
      </section>
    </PageShell>
  );
}
