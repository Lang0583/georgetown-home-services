import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AffiliateCTA from "../../../components/AffiliateCTA";
import Breadcrumbs from "../../../components/Breadcrumbs";
import ComparisonTable from "../../../components/ComparisonTable";
import FAQList from "../../../components/FAQList";
import JsonLd from "../../../components/JsonLd";
import ProviderCard from "../../../components/ProviderCard";
import LicenseVerificationMethodology from "../../../components/LicenseVerificationMethodology";
import PageShell from "../../../components/templates/PageShell";
import {
  COMPARISON_SLUGS,
  comparisonPageH1,
  comparisonPageTitle,
  getComparisonBySlug,
} from "../../../data/comparisons";
import { pageSeoMetadata, absolutePageUrl } from "../../../lib/page-seo";
import { resolveComparisonProviders } from "../../../lib/resolve-comparison-providers";
import { buildFAQPage } from "../../../lib/schema";
import { buildProviderItemListJsonLd } from "../../../lib/provider-item-list-schema";
import SourcesVerificationStrip from "../../../components/SourcesVerificationStrip";
import KeyTakeaways from "../../../components/KeyTakeaways";
import LastUpdated from "../../../components/LastUpdated";
import { PROVIDERS_VERIFIED_ISO_DATE } from "../../../data/providers";

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

export default async function ComparisonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const comparison = getComparisonBySlug(slug);
  if (!comparison) notFound();

  const h1 = comparisonPageH1(comparison.providerA.name, comparison.providerB.name);
  const breadcrumbTitle = `${comparison.providerA.name} vs ${comparison.providerB.name}`;
  const comparisonFaqSchema = buildFAQPage(comparison.faqs, {
    pageUrl: absolutePageUrl(`/compare/${comparison.slug}`),
    name: `${breadcrumbTitle} — FAQ`,
  });
  const { providers: verifiedProviders } = resolveComparisonProviders(comparison);
  const showComparisonTable = verifiedProviders.length >= 2;
  const compareTakeaways = [
    `Side-by-side ${comparison.categoryLabel.toLowerCase()} comparison for Georgetown, TX homeowners—not a paid ranking.`,
    "Ratings reflect Google Business Profile data at last verification; confirm licensing and availability directly.",
    comparison.bottomLine.slice(0, 220) + (comparison.bottomLine.length > 220 ? "…" : ""),
  ];

  return (
    <PageShell>
      <section className="py-8 md:py-12">
        {comparisonFaqSchema ? <JsonLd data={comparisonFaqSchema} /> : null}
        {verifiedProviders.length >= 2 ? (
          <JsonLd
            data={buildProviderItemListJsonLd(
              `${comparison.providerA.name} vs ${comparison.providerB.name}`,
              verifiedProviders,
            )}
          />
        ) : null}

        <div className="mx-auto max-w-5xl px-4">
          <Breadcrumbs
            items={[
              { href: "/", label: "Home" },
              { href: "/compare", label: "Compare Providers" },
              { href: `/compare/${comparison.slug}`, label: breadcrumbTitle },
            ]}
          />

          <header className="mt-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand">
              {comparison.categoryLabel} · Georgetown, TX
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink md:text-4xl">{h1}</h1>
            <LastUpdated lastUpdated={PROVIDERS_VERIFIED_ISO_DATE} />
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted">
              Side-by-side look at two frequently compared {comparison.categoryLabel.toLowerCase()} companies serving
              Georgetown homeowners. Ratings reflect Google Business Profile data at last verification—confirm licensing,
              pricing, and availability directly with each company.
            </p>
          </header>

          <KeyTakeaways items={compareTakeaways} speakable />

          {showComparisonTable ? <ComparisonTable providers={verifiedProviders} /> : null}

          <section className="mt-8 rounded-xl border border-ink/10 bg-surface-alt p-6">
            <h2 className="text-lg font-semibold text-ink">Bottom line</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">{comparison.bottomLine}</p>
          </section>

          {verifiedProviders.length > 0 ? (
            <section className="mt-10" aria-labelledby="provider-cards-heading">
              <h2 id="provider-cards-heading" className="text-2xl font-semibold tracking-tight text-ink">
                Provider profiles
              </h2>
              <LicenseVerificationMethodology
                providers={verifiedProviders}
                className="mt-3"
              />
              <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
                {verifiedProviders.map((provider) => (
                  <ProviderCard
                    key={`${provider.category}-${provider.name}`}
                    provider={provider}
                  />
                ))}
              </div>
            </section>
          ) : null}

          <AffiliateCTA
            angiCategorySlug={comparison.angiCategorySlug}
            thumbtackCategory={comparison.thumbtackCategory}
            serviceLabel={comparison.categoryLabel}
            heading={`Compare more Georgetown ${comparison.categoryLabel.toLowerCase()} pros`}
          />

          <nav
            className="mt-10 flex flex-col gap-3 rounded-xl border border-ink/10 bg-surface p-6 text-sm shadow-sm sm:flex-row sm:flex-wrap sm:gap-x-6"
            aria-label="Related guides"
          >
            <div>
              <span className="font-semibold text-ink">Best Of directory: </span>
              <Link href={`/best/${comparison.bestSlug}`} className="font-semibold text-brand hover:underline">
                Top {comparison.categoryLabel.toLowerCase()} in Georgetown
              </Link>
            </div>
            <div>
              <span className="font-semibold text-ink">Service guide: </span>
              <Link
                href={`/services/${comparison.serviceSlug}`}
                className="font-semibold text-brand hover:underline"
              >
                {comparison.categoryLabel} in Georgetown, TX
              </Link>
            </div>
            <div>
              <span className="font-semibold text-ink">More comparisons: </span>
              <Link href="/compare" className="font-semibold text-brand hover:underline">
                See all head-to-head matchups
              </Link>
            </div>
          </nav>

          <section className="mt-10">
            <FAQList faqs={comparison.faqs} title="Comparison FAQ" speakable />
          </section>

          <SourcesVerificationStrip />
        </div>
      </section>
    </PageShell>
  );
}
