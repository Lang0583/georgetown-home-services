import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AuthorByline from "@/components/AuthorByline";
import Breadcrumbs from "@/components/Breadcrumbs";
import { ButtonLink } from "@/components/Button";
import JsonLd from "@/components/JsonLd";
import PageShell from "@/components/templates/PageShell";
import {
  getNeighborhoodServicePage,
  getNeighborhoodServiceStaticParams,
} from "@/data/neighborhoods";
import { pageSeoMetadata } from "@/lib/page-seo";
import {
  SERVICE_BEST_LAST_UPDATED_DISPLAY,
  SERVICE_BEST_LAST_UPDATED_ISO,
  SERVICE_BEST_LAST_UPDATED_LINE_CLASS,
  webPageWithDateModifiedJsonLd,
} from "@/lib/service-best-pages-meta";
import { hubArticleJsonLd } from "@/lib/site-author";

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
            name: page.h1,
            description: page.metaDescription,
          })}
        />
        <JsonLd
          data={hubArticleJsonLd({
            pathname,
            headline: page.h1,
            description: page.metaDescription,
            datePublished: SERVICE_BEST_LAST_UPDATED_ISO,
            dateModified: SERVICE_BEST_LAST_UPDATED_ISO,
          })}
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
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">{page.h1}</h1>
        <p className={SERVICE_BEST_LAST_UPDATED_LINE_CLASS}>Last updated: {SERVICE_BEST_LAST_UPDATED_DISPLAY}</p>
        <AuthorByline className="mt-3" compact />

        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-gray-700">{page.intro}</p>

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

        <section className="mt-10">
          <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Why Local Experience Matters</h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-gray-700">{page.whyLocal}</p>
        </section>

        <div className="mt-10 rounded-xl border border-gray-200 bg-white p-6 shadow-md">
          <h2 className="text-lg font-semibold text-gray-900">Compare top-rated pros</h2>
          <p className="mt-2 text-sm leading-relaxed text-gray-700">
            Shortlist companies with public reviews, clear contact paths, and Georgetown-area service—then request
            written scopes you can compare line-by-line.
          </p>
          <div className="mt-5">
            <ButtonLink href={page.bestOfHref}>
              Compare Top {page.serviceName} in Georgetown TX →
            </ButtonLink>
          </div>
        </div>

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
