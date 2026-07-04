import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AffiliateCTA from "../../../components/AffiliateCTA";
import Breadcrumbs from "../../../components/Breadcrumbs";
import ComparisonTable from "../../../components/ComparisonTable";
import FAQList from "../../../components/FAQList";
import JsonLd from "../../../components/JsonLd";
import ProviderCard from "../../../components/ProviderCard";
import PageShell from "../../../components/templates/PageShell";
import {
  COMPARISON_SLUGS,
  comparisonPageH1,
  comparisonPageTitle,
  getComparisonBySlug,
} from "../../../data/comparisons";
import { pageSeoMetadata, absolutePageUrl } from "../../../lib/page-seo";
import { buildFaqPageJsonLd } from "../../../lib/faq-schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return COMPARISON_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const comparison = getComparisonBySlug(slug);
  if (!comparison) return {};

  return pageSeoMetadata({
    titleSegment: comparisonPageTitle(comparison.providerA.name, comparison.providerB.name),
    description: comparison.metaDescription,
    pathname: `/compare/${comparison.slug}`,
    ogType: "article",
  });
}

function breadcrumbJsonLd(siteUrl: string, title: string, slug: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Compare Providers", item: `${siteUrl}/compare` },
      { "@type": "ListItem", position: 3, name: title, item: `${siteUrl}/compare/${slug}` },
    ],
  };
}

function faqJsonLd(faqs: { q: string; a: string }[], pageUrl: string, name: string) {
  return buildFaqPageJsonLd({ pageUrl, name, faqs });
}

export default async function ComparisonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const comparison = getComparisonBySlug(slug);
  if (!comparison) notFound();

  const siteUrl = process.env.SITE_URL ?? "https://www.georgetownhomeservices.com";
  const h1 = comparisonPageH1(comparison.providerA.name, comparison.providerB.name);
  const breadcrumbTitle = `${comparison.providerA.name} vs ${comparison.providerB.name}`;
  const comparisonFaqSchema = faqJsonLd(
    comparison.faqs,
    absolutePageUrl(`/compare/${comparison.slug}`),
    `${breadcrumbTitle} — FAQ`,
  );

  return (
    <PageShell>
      <section className="py-8 md:py-12">
        <JsonLd data={breadcrumbJsonLd(siteUrl, breadcrumbTitle, comparison.slug)} />
        {comparisonFaqSchema ? <JsonLd data={comparisonFaqSchema} /> : null}

        <div className="mx-auto max-w-5xl px-4">
          <Breadcrumbs
            items={[
              { href: "/", label: "Home" },
              { href: "/compare", label: "Compare Providers" },
              { href: `/compare/${comparison.slug}`, label: breadcrumbTitle },
            ]}
          />

          <header className="mt-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">
              {comparison.categoryLabel} · Georgetown, TX
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl">{h1}</h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-gray-700">
              Side-by-side look at two frequently compared {comparison.categoryLabel.toLowerCase()} companies serving
              Georgetown homeowners. Ratings reflect Google Business Profile data at last verification—confirm licensing,
              pricing, and availability directly with each company.
            </p>
          </header>

          <ComparisonTable providerA={comparison.providerA} providerB={comparison.providerB} />

          <section className="mt-8 rounded-xl border border-gray-200 bg-gray-50 p-6">
            <h2 className="text-lg font-semibold text-gray-900">Bottom line</h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-700">{comparison.bottomLine}</p>
          </section>

          <section className="mt-10" aria-labelledby="provider-cards-heading">
            <h2 id="provider-cards-heading" className="text-2xl font-semibold tracking-tight text-gray-900">
              Provider profiles
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
              <ProviderCard provider={comparison.providerA} />
              <ProviderCard provider={comparison.providerB} />
            </div>
          </section>

          <AffiliateCTA
            angiCategorySlug={comparison.angiCategorySlug}
            thumbtackCategory={comparison.thumbtackCategory}
            serviceLabel={comparison.categoryLabel}
            heading={`Compare more Georgetown ${comparison.categoryLabel.toLowerCase()} pros`}
          />

          <nav
            className="mt-10 flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-6 text-sm shadow-sm sm:flex-row sm:flex-wrap sm:gap-x-6"
            aria-label="Related guides"
          >
            <div>
              <span className="font-semibold text-gray-900">Best Of directory: </span>
              <Link href={`/best/${comparison.bestSlug}`} className="font-semibold text-primary hover:underline">
                Top {comparison.categoryLabel.toLowerCase()} in Georgetown
              </Link>
            </div>
            <div>
              <span className="font-semibold text-gray-900">Service guide: </span>
              <Link
                href={`/services/${comparison.serviceSlug}`}
                className="font-semibold text-primary hover:underline"
              >
                {comparison.categoryLabel} in Georgetown, TX
              </Link>
            </div>
            <div>
              <span className="font-semibold text-gray-900">More comparisons: </span>
              <Link href="/compare" className="font-semibold text-primary hover:underline">
                See all head-to-head matchups
              </Link>
            </div>
          </nav>

          <section className="mt-10">
            <FAQList faqs={comparison.faqs} title="Comparison FAQ" />
          </section>
        </div>
      </section>
    </PageShell>
  );
}
