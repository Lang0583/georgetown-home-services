import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import { RatingStarsRow, formatRatingOneDecimal } from "@/components/BusinessRatingStars";
import { providerReviewCountLabel } from "@/lib/provider-card-display";
import JsonLd from "@/components/JsonLd";
import PageShell from "@/components/templates/PageShell";
import {
  PROVIDER_CATEGORY_LABELS,
  PROVIDER_DISCLAIMER,
  PROVIDERS_LAST_VERIFIED,
  getAllProviderSlugs,
  getBestSlugForCategory,
  getProviderBySlug,
} from "@/data/providers";
import { googleMapsEmbedUrl } from "@/lib/google-maps-embed";
import { externalBusinessLinkProps } from "@/lib/businesses";
import { pageSeoMetadata, absolutePageUrl } from "@/lib/page-seo";
import { buildProviderLocalBusinessJsonLd } from "@/lib/provider-item-list-schema";
import { getProviderWebsiteUrl } from "@/lib/provider-website";
import { providerLicenseVerifiedLine } from "@/lib/provider-license";
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
  const categoryLabel = PROVIDER_CATEGORY_LABELS[provider.category];
  const pathname = `/providers/${slug}`;
  const pageUrl = absolutePageUrl(pathname);
  const h1 = `${provider.name} — Georgetown, TX`;
  const telHref = `tel:${provider.phone.replace(/\D/g, "")}`;
  const websiteUrl = getProviderWebsiteUrl(provider.name);
  const licenseLine = providerLicenseVerifiedLine(provider);
  const reviewLabel = providerReviewCountLabel(provider);
  const mapsEmbedSrc = googleMapsEmbedUrl(
    provider.googleMapsUrl,
    `${provider.name} Georgetown TX`,
  );

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

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink md:text-4xl">{h1}</h1>

          <p className="mt-3 text-sm font-medium text-[var(--accent)]">
            <Link href={`/best/${bestSlug}`} className="hover:underline">
              {categoryLabel}
            </Link>
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <RatingStarsRow rating={provider.rating} />
            <span className="text-sm font-semibold text-ink">
              {formatRatingOneDecimal(provider.rating)} ★
            </span>
            {reviewLabel ? (
              <span className="text-sm text-muted">{reviewLabel}</span>
            ) : null}
          </div>

          <div className="mt-6 space-y-3 text-sm text-muted">
            <p>
              <span className="font-semibold text-ink">Phone:</span>{" "}
              <a
                href={telHref}
                className="font-semibold text-brand hover:text-brand hover:underline"
              >
                {provider.phone}
              </a>
            </p>
            {provider.address ? (
              <p>
                <span className="font-semibold text-ink">Address:</span> {provider.address}
              </p>
            ) : null}
            {websiteUrl ? (
              <p>
                <span className="font-semibold text-ink">Website:</span>{" "}
                <a
                  href={websiteUrl}
                  {...externalBusinessLinkProps}
                  className="font-semibold text-brand hover:text-brand hover:underline"
                >
                  {websiteUrl.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
                </a>
              </p>
            ) : null}
            <p>
              <span className="font-semibold text-ink">Service area:</span> {provider.serviceArea}
            </p>
            {licenseLine ? (
              <p>
                <span className="font-semibold text-ink">{licenseLine}</span>
              </p>
            ) : null}
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold text-ink">About this provider</h2>
            <p className="mt-2 text-muted">{provider.description}</p>
            {provider.specialties.length > 0 ? (
              <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-muted">
                {provider.specialties.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-semibold text-ink">Location</h2>
            <div className="mt-3 overflow-hidden rounded-xl border border-ink/10">
              <iframe
                title={`Map of ${provider.name} in Georgetown, TX`}
                src={mapsEmbedSrc}
                className="h-72 w-full border-0 sm:h-80"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <p className="mt-3">
              <a
                href={provider.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-brand hover:text-brand hover:underline"
              >
                Open in Google Maps →
              </a>
            </p>
          </div>

          <p className="mt-8 text-sm text-muted">
            Verified {PROVIDERS_LAST_VERIFIED}. {PROVIDER_DISCLAIMER}
          </p>

          <p className="mt-6">
            <Link
              href={`/best/${bestSlug}`}
              className="text-sm font-semibold text-brand hover:text-brand hover:underline"
            >
              Compare other {categoryLabel} providers →
            </Link>
          </p>

          <div className="mt-8 rounded-lg border border-ink/10 bg-surface-alt p-4">
            <p className="text-sm text-muted">
              Is this your business?{" "}
              <Link href="/contact" className="font-semibold text-brand hover:underline">
                Claim or update this listing →
              </Link>
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
