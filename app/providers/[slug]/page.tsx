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
import ProviderVerificationPanel, {
  ProviderEndorsementsList,
} from "@/components/ProviderVerificationPanel";
import {
  PROVIDER_CATEGORY_LABELS,
  getAllProviderSlugs,
  getBestSlugForCategory,
  getProviderBySlug as getLegacyProviderBySlug,
} from "@/data/providers";
import {
  getAllLicensedProviderSlugs,
  getProviderBySlug as getLicensedProviderBySlug,
  nonEmpty,
  placesAddress,
  placesPhone,
  placesRating,
  placesReviewCount,
  placesWebsite,
  formatVerifiedOnPlain,
  getCityBySlug,
  slugifyCityName,
  type LicensedProvider,
} from "@/lib/providers";
import {
  buildLicensedPlumberJsonLd,
  buildProviderBreadcrumbJsonLd,
} from "@/lib/licensed-provider-schema";
import { pageSeoMetadata, absolutePageUrl } from "@/lib/page-seo";
import { businessPhoneTel } from "@/lib/phone";
import { buildLocalBusiness } from "@/lib/schema";
import LastUpdated from "@/components/LastUpdated";
import {
  DIRECTORY_PAGES_LAST_UPDATED,
  webPageWithDateModifiedJsonLd,
} from "@/lib/last-updated";
import { getBestBySlug } from "@/lib/site-content";
import { RatingStarsRow, formatRatingOneDecimal } from "@/components/BusinessRatingStars";

export const dynamicParams = false;

export function generateStaticParams() {
  const licensed = getAllLicensedProviderSlugs();
  const legacy = getAllProviderSlugs().filter((slug) => !getLicensedProviderBySlug(slug));
  return [...new Set([...licensed, ...legacy])].map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const licensed = getLicensedProviderBySlug(slug);
  if (licensed) {
    const city = nonEmpty(licensed.city) ?? "Central Texas";
    return pageSeoMetadata({
      titleSegment: `${licensed.company} in ${city}, TX`,
      description: `${licensed.company} plumbing license ${licensed.licenseNumber} from the Texas State Board of Plumbing Examiners. Checked ${formatVerifiedOnPlain(licensed.verifiedOn)}.`,
      pathname: `/providers/${slug}`,
      ogType: "website",
      ogImagePath: `/providers/${slug}/opengraph-image`,
    });
  }

  const provider = getLegacyProviderBySlug(slug);
  if (!provider) return {};

  return pageSeoMetadata({
    titleSegment: `${provider.name} in Georgetown, TX`,
    description: provider.description,
    pathname: `/providers/${slug}`,
    ogType: "website",
    ogImagePath: `/providers/${slug}/opengraph-image`,
  });
}

function LicensedProviderPage({ provider }: { provider: LicensedProvider }) {
  const pathname = `/providers/${provider.slug}`;
  const pageUrl = absolutePageUrl(pathname);
  const phone = placesPhone(provider);
  const website = placesWebsite(provider);
  const address = placesAddress(provider);
  const rating = placesRating(provider);
  const reviewCount = placesReviewCount(provider);
  const city = nonEmpty(provider.city);
  const county = nonEmpty(provider.county);
  const zip = nonEmpty(provider.zip);
  const showStickyCall = Boolean(businessPhoneTel(phone ?? ""));
  const mapQuery = [provider.company, address, city, "TX"].filter(Boolean).join(", ");
  const mapsUrl = mapQuery
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`
    : null;
  const h1 = city ? `${provider.company} in ${city}, TX` : `${provider.company} plumbing contractor`;

  return (
    <PageShell>
      <section className={showStickyCall ? "py-8 pb-24 md:py-12 md:pb-12" : "py-8 md:py-12"}>
        <JsonLd
          data={webPageWithDateModifiedJsonLd({
            pathname,
            name: h1,
            description: `${provider.company} is listed from the Texas State Board of Plumbing Examiners public licensee file.`,
            lastUpdated: provider.verifiedOn,
          })}
        />
        <JsonLd data={buildLicensedPlumberJsonLd(provider, pageUrl)} />
        <JsonLd data={buildProviderBreadcrumbJsonLd(provider.company, pageUrl)} />

        <div className="mx-auto max-w-3xl px-4">
          <Breadcrumbs
            items={[
              { href: "/", label: "Home" },
              { href: "/providers", label: "Providers" },
              { href: pathname, label: provider.company },
            ]}
          />

          <LastUpdated lastUpdated={provider.verifiedOn} />

          <header className="mt-2">
            <p className="text-sm font-medium text-[var(--accent)]">Plumbing</p>
            <h1 className="mt-1 font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
              {h1}
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {provider.company} appears in the Texas State Board of Plumbing Examiners public
              licensee file
              {nonEmpty(provider.licenseeName) ? ` under responsible master ${provider.licenseeName}` : ""}.
              Georgetown Home Services is an independent directory. It does not perform plumbing work and
              it does not sell leads.
            </p>
          </header>

          {rating != null && reviewCount != null ? (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <RatingStarsRow rating={rating} />
              <span className="text-sm font-semibold text-ink">{formatRatingOneDecimal(rating)} ★</span>
              <span className="text-sm text-muted">({reviewCount} reviews)</span>
            </div>
          ) : null}

          <dl className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
            {phone ? (
              <div>
                <dt className="text-muted">Phone</dt>
                <dd className="mt-0.5 font-medium text-ink">
                  <a href={`tel:${businessPhoneTel(phone)}`} className="hover:text-brand hover:underline">
                    {phone}
                  </a>
                </dd>
              </div>
            ) : null}
            {website ? (
              <div>
                <dt className="text-muted">Website</dt>
                <dd className="mt-0.5 font-medium text-ink">
                  <a
                    href={website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-brand hover:underline"
                  >
                    Visit website
                  </a>
                </dd>
              </div>
            ) : null}
            {city ? (
              <div>
                <dt className="text-muted">City</dt>
                <dd className="mt-0.5 font-medium text-ink">
                  {getCityBySlug(slugifyCityName(city)) ? (
                    <Link
                      href={`/providers/city/${slugifyCityName(city)}`}
                      className="hover:text-brand hover:underline"
                    >
                      {city}, TX
                    </Link>
                  ) : (
                    <>{city}, TX</>
                  )}
                </dd>
              </div>
            ) : null}
            {county ? (
              <div>
                <dt className="text-muted">County</dt>
                <dd className="mt-0.5 font-medium text-ink">{county} County</dd>
              </div>
            ) : null}
            {zip ? (
              <div>
                <dt className="text-muted">ZIP</dt>
                <dd className="mt-0.5 font-medium text-ink">{zip}</dd>
              </div>
            ) : null}
          </dl>

          <ProviderVerificationPanel provider={provider} />
          <ProviderEndorsementsList provider={provider} />

          {address ? (
            <div className="mt-8">
              <h2 className="font-display text-lg font-semibold text-ink">Location</h2>
              <p className="mt-1 text-sm text-muted">
                {[address, city, "TX", zip].filter(Boolean).join(", ")}
              </p>
              {mapsUrl ? (
                <div className="mt-4">
                  <ProviderMapEmbed mapsSearchUrl={mapsUrl} query={mapQuery} title={provider.company} />
                </div>
              ) : null}
            </div>
          ) : null}

          <aside className="mt-10 rounded-xl border border-brand/20 bg-brand/5 p-5">
            <h2 className="font-display text-lg font-semibold text-ink">Own this business?</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Claim or upgrade this profile to confirm licensing details, add hours and photos, and
              surface a clearer contact path for Georgetown homeowners. Free, Claimed ($99), and
              Featured ($299) tiers available. Rankings are never sold.
            </p>
            <Link
              href="/for-contractors#claim"
              className="mt-4 inline-flex min-h-11 items-center justify-center rounded-lg bg-accent px-5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
            >
              Claim this profile
            </Link>
          </aside>

          <SourcesVerificationStrip compact />
        </div>
      </section>
      {showStickyCall && phone ? (
        <StickyCallBar providerName={provider.company} phone={phone} category="plumbing" />
      ) : null}
    </PageShell>
  );
}

export default async function ProviderDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const licensed = getLicensedProviderBySlug(slug);
  if (licensed) {
    return <LicensedProviderPage provider={licensed} />;
  }

  const provider = getLegacyProviderBySlug(slug);
  if (!provider) notFound();

  const bestSlug = getBestSlugForCategory(provider.category);
  const bestPage = getBestBySlug(bestSlug);
  const lastUpdated = bestPage?.lastUpdated ?? DIRECTORY_PAGES_LAST_UPDATED;
  const bestTitle =
    bestPage?.title ?? `Best ${PROVIDER_CATEGORY_LABELS[provider.category]} in Georgetown, TX`;
  const pathname = `/providers/${slug}`;
  const pageUrl = absolutePageUrl(pathname);
  const h1 = `${provider.name} in Georgetown, TX`;
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
        <JsonLd data={buildProviderBreadcrumbJsonLd(provider.name, pageUrl)} />

        <div className="mx-auto max-w-3xl px-4">
          <Breadcrumbs
            items={[
              { href: "/", label: "Home" },
              { href: "/providers", label: "Providers" },
              { href: `/best/${bestSlug}`, label: bestTitle },
              { href: pathname, label: provider.name },
            ]}
          />

          <LastUpdated lastUpdated={lastUpdated} />

          <div className="mt-2">
            <VerifiedProfileCard provider={provider} headingLevel="h1" />
          </div>

          {(provider.address || provider.city) && (
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
          )}

          <aside className="mt-10 rounded-xl border border-brand/20 bg-brand/5 p-5">
            <h2 className="font-display text-lg font-semibold text-ink">Own this business?</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Claim or upgrade this profile to confirm licensing details, add hours and photos, and
              surface a clearer contact path for Georgetown homeowners. Free, Claimed ($99), and
              Featured ($299) tiers available. Rankings are never sold.
            </p>
            <Link
              href="/for-contractors#claim"
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
