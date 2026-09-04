import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import PageShell from "@/components/templates/PageShell";
import StickyCallBar from "@/components/StickyCallBar";
import VerifiedProfileCard from "@/components/VerifiedProfileCard";
import ProviderMapEmbed from "@/components/ProviderMapEmbed";
import SourcesVerificationStrip from "@/components/SourcesVerificationStrip";
import {
  PROVIDER_CATEGORY_LABELS,
  getAllProviderSlugs,
  getBestSlugForCategory,
  getProviderBySlug,
} from "@/data/providers";
import { pageSeoMetadata, absolutePageUrl } from "@/lib/page-seo";
import { businessPhoneTel } from "@/lib/phone";
import { buildLocalBusiness } from "@/lib/schema";
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
    ogImagePath: `/providers/${slug}/opengraph-image`,
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
  const showStickyCall = Boolean(businessPhoneTel(provider.phone));
  const mapQuery = [provider.name, provider.address, provider.city || "Georgetown", "TX"]
    .filter(Boolean)
    .join(", ");
  const mapsUrl =
    provider.googleMapsUrl?.trim() ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`;

  return (
    <PageShell>
      <section className={showStickyCall ? "py-8 pb-24 md:py-12 md:pb-12" : "py-8 md:py-12"}>
        <JsonLd
          data={webPageWithDateModifiedJsonLd({
            pathname,
            name: h1,
            description: provider.description,
            lastUpdated,
          })}
        />
        <JsonLd data={buildLocalBusiness(provider, pageUrl)} />

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

          <div className="mt-8">
            <h2 className="font-display text-lg font-semibold text-ink">Location</h2>
            <p className="mt-1 text-sm text-muted">
              {[provider.address, provider.city || "Georgetown", provider.state || "TX", provider.postalCode]
                .filter(Boolean)
                .join(", ")}
            </p>
            <div className="mt-4">
              <ProviderMapEmbed mapsSearchUrl={mapsUrl} query={mapQuery} title={provider.name} />
            </div>
          </div>

          <aside className="mt-10 rounded-xl border border-brand/20 bg-brand/5 p-5">
            <h2 className="font-display text-lg font-semibold text-ink">Own this business?</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Claim or upgrade this profile to confirm licensing details, add hours and photos, and surface a
              clearer contact path for Georgetown homeowners. Free, Claimed ($99), and Featured ($299) tiers
              available—rankings are never sold.
            </p>
            <Link
              href={`/for-contractors#claim`}
              className="mt-4 inline-flex min-h-11 items-center justify-center rounded-lg bg-accent px-5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
            >
              Claim this profile
            </Link>
          </aside>

          <SourcesVerificationStrip compact />
        </div>
      </section>
      {showStickyCall ? (
        <StickyCallBar
          providerName={provider.name}
          phone={provider.phone}
          category={provider.category}
        />
      ) : null}
    </PageShell>
  );
}
