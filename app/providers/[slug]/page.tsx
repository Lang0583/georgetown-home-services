import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import PageShell from "@/components/templates/PageShell";
import VerifiedProfileCard from "@/components/VerifiedProfileCard";
import {
  PROVIDER_CATEGORY_LABELS,
  getAllProviderSlugs,
  getBestSlugForCategory,
  getProviderBySlug,
} from "@/data/providers";
import { pageSeoMetadata, absolutePageUrl } from "@/lib/page-seo";
import { buildProviderLocalBusinessJsonLd } from "@/lib/provider-item-list-schema";
import { breadcrumbSchemaForProvider } from "@/lib/schema";
import LastUpdated from "@/components/LastUpdated";
import {
  DIRECTORY_PAGES_LAST_UPDATED,
  webPageWithDateModifiedJsonLd,
} from "@/lib/last-updated";
import { getBestBySlug } from "@/lib/site-content";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllProviderSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const provider = getProviderBySlug(slug);
  if (!provider) return {};

  const titleSegment = `${provider.name} — Georgetown, TX`;

  return pageSeoMetadata({
    titleSegment,
    description: provider.description,
    pathname: `/providers/${slug}`,
    ogType: "website",
  });
}

export default async function ProviderDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const provider = getProviderBySlug(slug);
  if (!provider) notFound();

  const bestSlug = getBestSlugForCategory(provider.category);
  const bestPage = getBestBySlug(bestSlug);
  const lastUpdated = bestPage?.lastUpdated ?? DIRECTORY_PAGES_LAST_UPDATED;
  const bestTitle = bestPage?.title ?? `Best ${PROVIDER_CATEGORY_LABELS[provider.category]} in Georgetown, TX`;
  const pathname = `/providers/${slug}`;
  const pageUrl = absolutePageUrl(pathname);
  const h1 = `${provider.name} — Georgetown, TX`;

  return (
    <PageShell>
      <section className="py-8 md:py-12">
        <JsonLd
          data={breadcrumbSchemaForProvider(bestTitle, bestSlug, provider.name, slug)}
        />
        <JsonLd
          data={webPageWithDateModifiedJsonLd({
            pathname,
            name: h1,
            description: provider.description,
            lastUpdated,
          })}
        />
        <JsonLd data={buildProviderLocalBusinessJsonLd(provider, pageUrl)} />

        <div className="mx-auto max-w-3xl px-4">
          <Breadcrumbs
            items={[
              { href: "/", label: "Home" },
              { href: "/best", label: "Best Of" },
              { href: `/best/${bestSlug}`, label: bestTitle },
              { href: pathname, label: provider.name },
            ]}
          />

          <LastUpdated lastUpdated={lastUpdated} />

          <div className="mt-2">
            <VerifiedProfileCard provider={provider} headingLevel="h1" />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
