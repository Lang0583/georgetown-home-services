import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import { RatingStarsRow, formatRatingOneDecimal } from "@/components/BusinessRatingStars";
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
import { breadcrumbSchemaForProvider } from "@/lib/schema";
import {
  SERVICE_BEST_LAST_UPDATED_DISPLAY,
  SERVICE_BEST_LAST_UPDATED_LINE_CLASS,
  webPageWithDateModifiedJsonLd,
} from "@/lib/service-best-pages-meta";
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
  const bestTitle = bestPage?.title ?? `Best ${PROVIDER_CATEGORY_LABELS[provider.category]} in Georgetown, TX`;
  const categoryLabel = PROVIDER_CATEGORY_LABELS[provider.category];
  const pathname = `/providers/${slug}`;
  const pageUrl = absolutePageUrl(pathname);
  const h1 = `${provider.name} — Georgetown, TX`;
  const telHref = `tel:${provider.phone.replace(/\D/g, "")}`;
  const websiteUrl = getProviderWebsiteUrl(provider.name);
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

          <p className={SERVICE_BEST_LAST_UPDATED_LINE_CLASS}>
            Last updated: {SERVICE_BEST_LAST_UPDATED_DISPLAY}
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">{h1}</h1>

          <p className="mt-3 text-sm font-medium text-[#01696F]">
            <Link href={`/best/${bestSlug}`} className="hover:underline">
              {categoryLabel}
            </Link>
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <RatingStarsRow rating={provider.rating} />
            <span className="text-sm font-semibold text-gray-900">
              {formatRatingOneDecimal(provider.rating)} ★
            </span>
            <span className="text-sm text-gray-500">
              {provider.reviewCount.toLocaleString()} Google reviews
            </span>
          </div>

          <div className="mt-6 space-y-3 text-sm text-gray-700">
            <p>
              <span className="font-semibold text-gray-900">Phone:</span>{" "}
              <a
                href={telHref}
                className="font-semibold text-primary hover:text-primary-hover hover:underline"
              >
                {provider.phone}
              </a>
            </p>
            {websiteUrl ? (
              <p>
                <span className="font-semibold text-gray-900">Website:</span>{" "}
                <a
                  href={websiteUrl}
                  {...externalBusinessLinkProps}
                  className="font-semibold text-primary hover:text-primary-hover hover:underline"
                >
                  {websiteUrl.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
                </a>
              </p>
            ) : null}
            <p>
              <span className="font-semibold text-gray-900">Service area:</span> {provider.serviceArea}
            </p>
            <p>
              <span className="font-semibold text-gray-900">Years in business:</span>{" "}
              {provider.yearsInBusiness}
            </p>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-900">About this provider</h2>
            <p className="mt-2 text-gray-700">{provider.description}</p>
            {provider.specialties.length > 0 ? (
              <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-gray-700">
                {provider.specialties.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-900">Location</h2>
            <div className="mt-3 overflow-hidden rounded-xl border border-gray-200">
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
                className="text-sm font-semibold text-primary hover:text-primary-hover hover:underline"
              >
                Open in Google Maps →
              </a>
            </p>
          </div>

          <p className="mt-8 text-sm text-gray-500">
            Verified {PROVIDERS_LAST_VERIFIED}. {PROVIDER_DISCLAIMER}
          </p>

          <p className="mt-6">
            <Link
              href={`/best/${bestSlug}`}
              className="text-sm font-semibold text-primary hover:text-primary-hover hover:underline"
            >
              Compare other {categoryLabel} providers →
            </Link>
          </p>

          <div className="mt-8 rounded-lg border border-gray-200 bg-gray-50 p-4">
            <p className="text-sm text-gray-700">
              Is this your business?{" "}
              <Link href="/contact" className="font-semibold text-primary hover:underline">
                Claim or update this listing →
              </Link>
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
