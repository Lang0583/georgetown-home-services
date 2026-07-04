import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AuthorByline from "@/components/AuthorByline";
import AdSenseDisplay from "@/components/AdSenseDisplay";
import Breadcrumbs from "@/components/Breadcrumbs";
import { ButtonLink } from "@/components/Button";
import FAQList from "@/components/FAQList";
import FAQSchema from "@/components/FAQSchema";
import JsonLd from "@/components/JsonLd";
import LastUpdated from "@/components/LastUpdated";
import NeighborhoodHomeServicesAngiRow from "@/components/NeighborhoodHomeServicesAngiRow";
import PageShell from "@/components/templates/PageShell";
import PricingEstimatorInteractive from "@/components/PricingEstimatorInteractive";
import {
  getNeighborhoodHomeServicesHub,
  neighborhoodHomeServicesHubStaticParams,
} from "@/data/neighborhood-home-services-hubs";
import { buildNeighborhoodHomeServicesHubFaqs } from "@/lib/georgetown-page-faqs";
import { adsenseNeighborhoodPageInlineSlot } from "@/lib/adsense-config";
import { absolutePageUrl, pageSeoMetadata } from "@/lib/page-seo";
import { webPageWithDateModifiedJsonLd } from "@/lib/last-updated";
import { hubArticleJsonLd } from "@/lib/site-author";

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

function breadcrumbJsonLd({
  siteUrl,
  neighborhoodName,
  pathname,
}: {
  siteUrl: string;
  neighborhoodName: string;
  pathname: string;
}) {
  const pagePath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Services", item: `${siteUrl}/services` },
      {
        "@type": "ListItem",
        position: 3,
        name: `${neighborhoodName} home services`,
        item: `${siteUrl}${pagePath}`,
      },
    ],
  };
}

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

  const siteUrl = process.env.SITE_URL ?? "https://www.georgetownhomeservices.com";
  const pathname = `/neighborhoods/${neighborhood}/home-services`;
  const faqs = buildNeighborhoodHomeServicesHubFaqs(hub);

  return (
    <PageShell>
      <section className="py-8 md:py-12">
        <JsonLd
          data={breadcrumbJsonLd({
            siteUrl,
            neighborhoodName: hub.neighborhoodName,
            pathname,
          })}
        />
        <JsonLd
          data={webPageWithDateModifiedJsonLd({
            pathname,
            name: hub.h1,
            description: hub.metaDescription,
            lastUpdated: hub.lastUpdated,
          })}
        />
        <JsonLd
          data={hubArticleJsonLd({
            pathname,
            headline: hub.h1,
            description: hub.metaDescription,
            datePublished: hub.lastUpdated,
            dateModified: hub.lastUpdated,
          })}
        />
        <FAQSchema
          pageUrl={absolutePageUrl(pathname)}
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

        <p className="text-sm font-semibold uppercase tracking-wide text-gray-600">
          Georgetown TX • {hub.neighborhoodName}
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">{hub.h1}</h1>
        <LastUpdated lastUpdated={hub.lastUpdated} />
        <AuthorByline className="mt-3" compact />

        <div
          className="prose prose-slate prose-lg mt-6 max-w-3xl text-gray-700 prose-p:leading-relaxed prose-strong:text-gray-900"
          dangerouslySetInnerHTML={{ __html: hub.introHtml }}
        />

        <section className="mt-12 max-w-3xl">
          <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
            Planning ranges: plumbing, HVAC & roofing
          </h2>
          <p className="mt-3 text-base leading-relaxed text-gray-700">
            Toggle trade categories and select line items to see editorial low–high planning totals for Georgetown-area
            work. Figures are for budgeting and education—not quotes.
          </p>
          <div className="not-prose mt-6">
            <PricingEstimatorInteractive />
          </div>
        </section>

        {adsenseNeighborhoodPageInlineSlot ? (
          <div className="my-10">
            <AdSenseDisplay slotId={adsenseNeighborhoodPageInlineSlot} className="mx-auto max-w-3xl" />
          </div>
        ) : null}

        <section className="mt-12 rounded-xl border border-gray-200 bg-white p-6 shadow-md">
          <h2 className="text-lg font-semibold text-gray-900">Compare Georgetown companies (directories)</h2>
          <p className="mt-2 text-sm leading-relaxed text-gray-700">
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

        <section className="mt-12 max-w-3xl">
          <p className="text-sm leading-relaxed text-gray-700">
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
