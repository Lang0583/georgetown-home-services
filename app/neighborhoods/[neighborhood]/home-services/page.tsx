import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AuthorByline from "@/components/AuthorByline";
import Breadcrumbs from "@/components/Breadcrumbs";
import { ButtonLink } from "@/components/Button";
import FAQList from "@/components/FAQList";
import FAQSchema from "@/components/FAQSchema";
import JsonLd from "@/components/JsonLd";
import LastUpdated from "@/components/LastUpdated";
import NeighborhoodHomeServicesAngiRow from "@/components/NeighborhoodHomeServicesAngiRow";
import PageShell from "@/components/templates/PageShell";
import PricingEstimatorInteractive from "@/components/PricingEstimatorInteractive";
import HubRelatedLinks from "@/components/HubRelatedLinks";
import {
  getNeighborhoodHomeServicesHub,
  neighborhoodHomeServicesHubStaticParams,
} from "@/data/neighborhood-home-services-hubs";
import { neighborhoodHubCrossLinks } from "@/lib/hub-cross-links";
import { buildNeighborhoodHomeServicesHubFaqs } from "@/lib/georgetown-page-faqs";
import { absolutePageUrl, pageSeoMetadata } from "@/lib/page-seo";
import { webPageWithDateModifiedJsonLd } from "@/lib/last-updated";
import { buildArticle } from "@/lib/schema";

const CORE_TRADES = [
  {
    serviceSlug: "plumber",
    title: "Plumbing",
    serviceGuideHref: "/services/plumber-georgetown-tx",
    bestOfHref: "/best/best-plumbers-georgetown-tx",
  },
  {
    serviceSlug: "hvac",
    title: "HVAC",
    serviceGuideHref: "/services/hvac-georgetown-tx",
    bestOfHref: "/best/top-hvac-companies-georgetown-tx",
  },
  {
    serviceSlug: "roofer",
    title: "Roofing",
    serviceGuideHref: "/services/roofer-georgetown-tx",
    bestOfHref: "/best/best-roofers-georgetown-tx",
  },
] as const;

/** Static `home-services` segment resolves before `[service]` for these slugs only. */
export const dynamicParams = false;

export function generateStaticParams() {
  return neighborhoodHomeServicesHubStaticParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ neighborhood: string }>;
}): Promise<Metadata> {
  const { neighborhood } = await params;
  const hub = getNeighborhoodHomeServicesHub(neighborhood);
  if (!hub) return {};

  return pageSeoMetadata({
    titleSegment: hub.metaTitle,
    description: hub.metaDescription,
    pathname: `/neighborhoods/${neighborhood}/home-services`,
    ogType: "website",
  });
}

export default async function NeighborhoodHomeServicesHubPage({
  params,
}: {
  params: Promise<{ neighborhood: string }>;
}) {
  const { neighborhood } = await params;
  const hub = getNeighborhoodHomeServicesHub(neighborhood);
  if (!hub) notFound();

  const pathname = `/neighborhoods/${neighborhood}/home-services`;
  const pageUrl = absolutePageUrl(pathname);
  const faqs = buildNeighborhoodHomeServicesHubFaqs(hub);

  return (
    <PageShell>
      <section className="py-8 md:py-12">
        <JsonLd
          data={webPageWithDateModifiedJsonLd({
            pathname,
            name: hub.h1,
            description: hub.metaDescription,
            lastUpdated: hub.lastUpdated,
          })}
        />
        <JsonLd
          data={buildArticle({
            headline: hub.h1,
            description: hub.metaDescription,
            url: pageUrl,
            datePublished: hub.lastUpdated,
            dateModified: hub.lastUpdated,
          })}
        />
        <FAQSchema
          pageUrl={pageUrl}
          name={`${hub.neighborhoodName} plumber, HVAC & roofer — FAQ`}
          faqs={faqs}
        />

        <Breadcrumbs
          items={[
            { href: "/", label: "Home" },
            { href: "/services", label: "Services" },
            { href: pathname, label: `${hub.neighborhoodName} home services` },
          ]}
        />

        <p className="text-sm font-semibold uppercase tracking-wide text-muted">
          Georgetown TX • {hub.neighborhoodName}
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-ink md:text-5xl">{hub.h1}</h1>
        <LastUpdated lastUpdated={hub.lastUpdated} />
        <AuthorByline className="mt-3" compact />

        <div
          className="prose prose-lg mt-6 max-w-[70ch] text-ink leading-[1.65] prose-p:leading-[1.65] prose-strong:text-ink prose-headings:font-bold prose-headings:text-ink"
          dangerouslySetInnerHTML={{ __html: hub.introHtml }}
        />

        <section className="mt-12 max-w-3xl">
          <h2 className="text-2xl font-semibold tracking-tight text-ink">
            Planning ranges: plumbing, HVAC & roofing
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted">
            Toggle trade categories and select line items to see editorial low–high planning totals for Georgetown-area
            work. Figures are for budgeting and education—not quotes.
          </p>
          <div className="not-prose mt-6">
            <PricingEstimatorInteractive />
          </div>
        </section>

        <section className="mt-12 rounded-xl border border-ink/10 bg-surface p-6 shadow-md">
          <h2 className="text-lg font-semibold text-ink">Compare Georgetown companies (directories)</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Shortlist licensed pros with clear contact paths and documented reviews—then collect written estimates you
            can compare line by line. Affiliate: explore additional Georgetown lists on Angi.
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {CORE_TRADES.map((t) => (
              <ButtonLink key={t.serviceSlug} href={t.bestOfHref} variant="secondary">
                Best {t.title} in Georgetown →
              </ButtonLink>
            ))}
          </div>
          <NeighborhoodHomeServicesAngiRow neighborhoodName={hub.neighborhoodName} />
        </section>

        <HubRelatedLinks
          title="All Georgetown service guides"
          description="Open any core trade guide or the pricing hub for planning ranges across Williamson County."
          links={neighborhoodHubCrossLinks()}
        />

        <section className="mt-12 max-w-3xl">
          <p className="text-sm leading-relaxed text-muted">
            Common questions about hiring{" "}
            <strong>
              {hub.neighborhoodName} plumber
            </strong>
            , <strong>{hub.neighborhoodName} HVAC</strong>, and{" "}
            <strong>
              {hub.neighborhoodName} roofer
            </strong>{" "}
            support—not a substitute for an on-site inspection.
          </p>
          <FAQList
            faqs={faqs}
            variant="bordered"
            title={`FAQ for ${hub.neighborhoodName} homeowners`}
            className="!mt-4"
          />
        </section>
      </section>
    </PageShell>
  );
}
