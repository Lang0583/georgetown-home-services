import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AuthorByline from "@/components/AuthorByline";
import Breadcrumbs from "@/components/Breadcrumbs";
import { ButtonLink } from "@/components/Button";
import FAQList from "@/components/FAQList";
import FAQSchema from "@/components/FAQSchema";
import JsonLd from "@/components/JsonLd";
import LastUpdated from "@/components/LastUpdated";
import PageShell from "@/components/templates/PageShell";
import {
  getNeighborhoodHailPage,
  neighborhoodHailDamageStaticParams,
} from "@/data/neighborhood-hail-pages";
import { absolutePageUrl, pageSeoMetadata } from "@/lib/page-seo";
import { webPageWithDateModifiedJsonLd } from "@/lib/last-updated";
import { buildArticle } from "@/lib/schema";

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

  const pathname = `/neighborhoods/${neighborhood}/hail-damage`;
  const homeServicesPath = `/neighborhoods/${neighborhood}/home-services`;
  const pageUrl = absolutePageUrl(pathname);

  return (
    <PageShell>
      <section className="py-8 md:py-12">
        <JsonLd
          data={webPageWithDateModifiedJsonLd({
            pathname,
            name: page.h1,
            description: page.metaDescription,
            lastUpdated: page.lastUpdated,
          })}
        />
        <JsonLd
          data={buildArticle({
            headline: page.h1,
            description: page.metaDescription,
            url: pageUrl,
            datePublished: page.lastUpdated,
            dateModified: page.lastUpdated,
          })}
        />
        <FAQSchema
          pageUrl={pageUrl}
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

        <p className="text-sm font-semibold uppercase tracking-wide text-muted">
          Storm guide • {page.neighborhoodName} • Georgetown, TX
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-ink md:text-5xl">{page.h1}</h1>
        <LastUpdated lastUpdated={page.lastUpdated} />
        <AuthorByline className="mt-3" compact />

        <div
          className="prose prose-lg mt-6 max-w-[70ch] text-ink leading-[1.65] prose-p:leading-[1.65] prose-strong:text-ink prose-headings:font-bold prose-headings:text-ink prose-headings:tracking-tight prose-a:text-brand prose-a:underline hover:prose-a:text-brand"
          dangerouslySetInnerHTML={{ __html: page.bodyHtml }}
        />

        <section className="mt-12 max-w-3xl">
          <p className="text-sm leading-relaxed text-muted">
            Quick answers for {page.neighborhoodName} neighbors after hail—not a replacement for an on-site inspection.
          </p>
          <FAQList
            faqs={page.faqs}
            variant="bordered"
            title={`FAQ — ${page.neighborhoodName} hail damage`}
            className="!mt-4"
          />
        </section>

        <div className="mt-10 flex flex-col gap-4 rounded-xl border border-ink/10 bg-surface p-6 shadow-md sm:flex-row sm:flex-wrap sm:items-center">
          <ButtonLink href="/services/roofing">Georgetown roofing hub →</ButtonLink>
          <ButtonLink href="/best/best-roofers-georgetown-tx" variant="secondary">
            Best roofers directory →
          </ButtonLink>
        </div>

        <p className="mt-8 text-sm text-muted">
          <Link href="/blog/hail-damage-georgetown-williamson-may-2026" className="font-medium text-brand hover:underline">
            Read the full May 2026 Williamson County hail guide →
          </Link>
        </p>
      </section>
    </PageShell>
  );
}
