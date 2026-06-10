import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AuthorByline from "@/components/AuthorByline";
import Breadcrumbs from "@/components/Breadcrumbs";
import { ButtonLink } from "@/components/Button";
import FAQList from "@/components/FAQList";
import FAQSchema from "@/components/FAQSchema";
import JsonLd from "@/components/JsonLd";
import PageShell from "@/components/templates/PageShell";
import {
  getNeighborhoodHailPage,
  neighborhoodHailDamageStaticParams,
} from "@/data/neighborhood-hail-pages";
import { absolutePageUrl, pageSeoMetadata } from "@/lib/page-seo";
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
  pathname,
  homeServicesPath,
}: {
  siteUrl: string;
  neighborhoodName: string;
  pathname: string;
  homeServicesPath: string;
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
        item: `${siteUrl}${homeServicesPath}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: `${neighborhoodName} hail damage`,
        item: `${siteUrl}${pagePath}`,
      },
    ],
  };
}

/** Static `hail-damage` resolves before `[service]` dynamic slug. */
export const dynamicParams = false;

export function generateStaticParams() {
  return neighborhoodHailDamageStaticParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ neighborhood: string }>;
}): Promise<Metadata> {
  const { neighborhood } = await params;
  const page = getNeighborhoodHailPage(neighborhood);
  if (!page) return {};

  return pageSeoMetadata({
    titleSegment: page.metaTitle,
    description: page.metaDescription,
    pathname: `/neighborhoods/${neighborhood}/hail-damage`,
    ogType: "website",
  });
}

export default async function NeighborhoodHailDamagePage({
  params,
}: {
  params: Promise<{ neighborhood: string }>;
}) {
  const { neighborhood } = await params;
  const page = getNeighborhoodHailPage(neighborhood);
  if (!page) notFound();

  const siteUrl = process.env.SITE_URL ?? "https://www.georgetownhomeservices.com";
  const pathname = `/neighborhoods/${neighborhood}/hail-damage`;
  const homeServicesPath = `/neighborhoods/${neighborhood}/home-services`;

  return (
    <PageShell>
      <section className="py-8 md:py-12">
        <JsonLd
          data={breadcrumbJsonLd({
            siteUrl,
            neighborhoodName: page.neighborhoodName,
            pathname,
            homeServicesPath,
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
        <FAQSchema
          pageUrl={absolutePageUrl(pathname)}
          name={`${page.neighborhoodName} hail damage — FAQ`}
          faqs={page.faqs}
        />

        <Breadcrumbs
          items={[
            { href: "/", label: "Home" },
            { href: "/services", label: "Services" },
            { href: homeServicesPath, label: `${page.neighborhoodName} home services` },
            { href: pathname, label: "Hail damage" },
          ]}
        />

        <p className="text-sm font-semibold uppercase tracking-wide text-gray-600">
          Storm guide • {page.neighborhoodName} • Georgetown, TX
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">{page.h1}</h1>
        <p className={SERVICE_BEST_LAST_UPDATED_LINE_CLASS}>Last updated: {SERVICE_BEST_LAST_UPDATED_DISPLAY}</p>
        <AuthorByline className="mt-3" compact />

        <div
          className="prose prose-slate prose-lg mt-6 max-w-3xl text-gray-700 prose-p:leading-relaxed prose-strong:text-gray-900 prose-headings:tracking-tight prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
          dangerouslySetInnerHTML={{ __html: page.bodyHtml }}
        />

        <section className="mt-12 max-w-3xl">
          <p className="text-sm leading-relaxed text-gray-700">
            Quick answers for {page.neighborhoodName} neighbors after hail—not a replacement for an on-site inspection.
          </p>
          <FAQList
            faqs={page.faqs}
            variant="bordered"
            title={`FAQ — ${page.neighborhoodName} hail damage`}
            className="!mt-4"
          />
        </section>

        <div className="mt-10 flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-md sm:flex-row sm:flex-wrap sm:items-center">
          <ButtonLink href="/roofing">Georgetown roofing hub →</ButtonLink>
          <ButtonLink href="/best/best-roofers-georgetown-tx" variant="secondary">
            Best roofers directory →
          </ButtonLink>
        </div>

        <p className="mt-8 text-sm text-gray-600">
          <Link href="/blog/hail-damage-georgetown-williamson-may-2026" className="font-medium text-primary hover:underline">
            Read the full May 2026 Williamson County hail guide →
          </Link>
        </p>
      </section>
    </PageShell>
  );
}
