import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AuthorByline from "@/components/AuthorByline";
import AdSenseDisplay from "@/components/AdSenseDisplay";
import Breadcrumbs from "@/components/Breadcrumbs";
import { ButtonLink } from "@/components/Button";
import FAQList from "@/components/FAQList";
import FAQSchema from "@/components/FAQSchema";
import JsonLd from "@/components/JsonLd";
import ProviderCardSection from "@/components/ProviderCardSection";
import LastUpdated from "@/components/LastUpdated";
import PageShell from "@/components/templates/PageShell";
import {
  getNeighborhoodServicePage,
  getNeighborhoodServiceStaticParams,
} from "@/data/neighborhoods";
import { getNeighborhoodTradeContext } from "@/data/neighborhood-trade-context";
import { getCostGuidePage } from "@/data/cost-guides";
import { pageSeoMetadata, absolutePageUrl } from "@/lib/page-seo";
import { buildNeighborhoodGuideFaqs } from "@/lib/georgetown-page-faqs";
import { getNeighborhoodTradeProviders } from "@/lib/neighborhood-providers";
import { neighborhoodTradeH1 } from "@/lib/neighborhood-trade-display";
import { buildProviderItemListJsonLd } from "@/lib/provider-item-list-schema";
import { webPageWithDateModifiedJsonLd } from "@/lib/last-updated";
import { hubArticleJsonLd } from "@/lib/site-author";
import { adsenseNeighborhoodPageInlineSlot } from "@/lib/adsense-config";

function breadcrumbJsonLd({
  siteUrl,
  neighborhoodName,
  serviceName,
  serviceHref,
  pathname,
}: {
  siteUrl: string;
  neighborhoodName: string;
  serviceName: string;
  serviceHref: string;
  pathname: string;
}) {
  const svcPath = serviceHref.startsWith("/") ? serviceHref : `/${serviceHref}`;
  const pagePath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Services", item: `${siteUrl}/services` },
      { "@type": "ListItem", position: 3, name: serviceName, item: `${siteUrl}${svcPath}` },
      { "@type": "ListItem", position: 4, name: neighborhoodName, item: `${siteUrl}${pagePath}` },
    ],
  };
}

/** Only slugs returned by `generateStaticParams` resolve; unknown slugs 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return getNeighborhoodServiceStaticParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ neighborhood: string; service: string }>;
}): Promise<Metadata> {
  const { neighborhood, service } = await params;
  const page = getNeighborhoodServicePage(neighborhood, service);
  if (!page) return {};

  return pageSeoMetadata({
    titleSegment: page.metaTitle,
    description: page.metaDescription,
    pathname: `/neighborhoods/${neighborhood}/${service}`,
    ogType: "website",
  });
}

export default async function NeighborhoodServicePage({
  params,
}: {
  params: Promise<{ neighborhood: string; service: string }>;
}) {
  const { neighborhood, service } = await params;
  const page = getNeighborhoodServicePage(neighborhood, service);
  if (!page) notFound();

  const siteUrl = process.env.SITE_URL ?? "https://www.georgetownhomeservices.com";
  const pathname = `/neighborhoods/${neighborhood}/${service}`;
  const displayH1 = neighborhoodTradeH1(page);
  const contextParagraphs = getNeighborhoodTradeContext(neighborhood, service, page);
  const providers = getNeighborhoodTradeProviders(neighborhood, service, 4);
  const costGuide = getCostGuidePage(page.costGuideHref.replace("/costs/", ""));
  const neighborhoodFaqs = buildNeighborhoodGuideFaqs(page);

  return (
    <PageShell>
      <section className="py-8 md:py-12">
        <JsonLd
          data={breadcrumbJsonLd({
            siteUrl,
            neighborhoodName: page.neighborhoodName,
            serviceName: page.serviceName,
            serviceHref: page.serviceHref,
            pathname,
          })}
        />
        <JsonLd
          data={webPageWithDateModifiedJsonLd({
            pathname,
            name: displayH1,
            description: page.metaDescription,
            lastUpdated: page.lastUpdated,
          })}
        />
        <JsonLd
          data={hubArticleJsonLd({
            pathname,
            headline: displayH1,
            description: page.metaDescription,
            datePublished: page.lastUpdated,
            dateModified: page.lastUpdated,
          })}
        />
        {providers.length > 0 ? (
          <JsonLd
            data={buildProviderItemListJsonLd(
              `${page.serviceName} serving ${page.neighborhoodName}, Georgetown TX`,
              providers,
            )}
          />
        ) : null}
        <FAQSchema
          pageUrl={absolutePageUrl(pathname)}
          name={`${page.serviceName} in ${page.neighborhoodName}, Georgetown TX — FAQ`}
          faqs={neighborhoodFaqs}
        />

        <Breadcrumbs
          items={[
            { href: "/", label: "Home" },
            { href: "/services", label: "Services" },
            { href: page.serviceHref, label: page.serviceName },
            { href: pathname, label: page.neighborhoodName },
          ]}
        />

        <div className="text-sm font-semibold uppercase tracking-wide text-gray-600">
          {page.serviceCategory} • {page.neighborhoodName}
        </div>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">{displayH1}</h1>
        <LastUpdated lastUpdated={page.lastUpdated} />
        <AuthorByline className="mt-3" compact />

        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-gray-700">{page.intro}</p>

        {contextParagraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 48)} className="mt-4 max-w-3xl text-base leading-relaxed text-gray-700">
            {paragraph}
          </p>
        ))}

        <section className="mt-10">
          <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
            Common Issues in {page.neighborhoodName}
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-relaxed text-gray-700">
            {page.commonIssues.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        {adsenseNeighborhoodPageInlineSlot ? (
          <div className="my-10">
            <AdSenseDisplay slotId={adsenseNeighborhoodPageInlineSlot} className="mx-auto max-w-3xl" />
          </div>
        ) : null}

        <section className="mt-10">
          <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Why Local Experience Matters</h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-gray-700">{page.whyLocal}</p>
        </section>

        <section className="mt-12 scroll-mt-24" aria-labelledby="neighborhood-providers-heading">
          <h2 id="neighborhood-providers-heading" className="text-2xl font-semibold tracking-tight text-gray-900">
            Top {page.serviceName.toLowerCase()} serving {page.neighborhoodName}
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-gray-700">
            Shortlist from our Georgetown directory—prioritizing companies that mention {page.neighborhoodName} or
            nearby service areas, sorted by public review volume. Confirm licensing and availability before you hire.
          </p>
          <ProviderCardSection providers={providers} />
          <div className="mt-6">
            <ButtonLink href={page.bestOfHref}>
              See full {page.serviceName.toLowerCase()} directory →
            </ButtonLink>
          </div>
        </section>

        {costGuide ? (
          <div className="mt-10 rounded-xl border border-gray-200 bg-white p-6 shadow-md">
            <h2 className="text-lg font-semibold text-gray-900">Georgetown {page.serviceCategory} cost guide</h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-700">
              Planning numbers for {page.neighborhoodName} homeowners—not a quote. Typical range:{" "}
              <span className="font-semibold text-gray-900">
                ${costGuide.summaryRange.low.toLocaleString()}–${costGuide.summaryRange.high.toLocaleString()}
              </span>.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <ButtonLink href={page.costGuideHref}>Open cost guide →</ButtonLink>
              <ButtonLink href={page.bestOfHref} variant="secondary">
                Compare top {page.serviceName.toLowerCase()}
              </ButtonLink>
            </div>
          </div>
        ) : null}

        <section className="mt-12 max-w-3xl">
          <p className="text-sm leading-relaxed text-gray-700">
            Practical questions we hear from neighbors comparing {page.serviceCategory} work in Georgetown—not a substitute
            for an on-site inspection.
          </p>
          <FAQList
            faqs={neighborhoodFaqs}
            variant="bordered"
            title={`FAQ for ${page.neighborhoodName} homeowners`}
            className="!mt-4"
          />
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Related pages</h2>
          <ul className="mt-4 space-y-2">
            {page.internalLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="font-medium text-primary underline-offset-4 hover:text-primary-hover hover:underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-10 border-t border-gray-200 pt-10">
          <h2 className="text-lg font-semibold text-gray-900">Full service guide</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-700">
            For licensing questions, cost drivers, and hiring checklists that apply across Georgetown—not only{" "}
            {page.neighborhoodName}—start with the main service guide.
          </p>
          <div className="mt-5">
            <ButtonLink href={page.serviceHref} variant="secondary">
              Open the Georgetown {page.serviceName.toLowerCase()} service guide
            </ButtonLink>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
