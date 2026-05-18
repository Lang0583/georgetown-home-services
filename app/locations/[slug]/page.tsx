import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CTASection from "../../../components/CTASection";
import FAQList from "../../../components/FAQList";
import LinkCard from "../../../components/LinkCard";
import RichText from "../../../components/RichText";
import JsonLd from "../../../components/JsonLd";
import FAQSchema from "../../../components/FAQSchema";
import PageShell from "../../../components/templates/PageShell";
import TwoColumnPage from "../../../components/templates/TwoColumnPage";
import {
  isExtendedBestSlug,
  isExtendedServiceSlug,
  isNoindexSlug,
  isRedirectedLocationSlug,
  showExtendedHomeServices,
} from "../../../lib/public-site-scope";
import { absolutePageUrl, pageSeoMetadata } from "../../../lib/page-seo";
import {
  getBestBySlug,
  getLocationBySlug,
  getLocations,
  getServices,
} from "../../../lib/site-content";
import AuthorByline from "../../../components/AuthorByline";
import { hubArticleJsonLd } from "../../../lib/site-author";
import {
  SERVICE_BEST_LAST_UPDATED_DISPLAY,
  SERVICE_BEST_LAST_UPDATED_ISO,
  SERVICE_BEST_LAST_UPDATED_LINE_CLASS,
} from "../../../lib/service-best-pages-meta";

function breadcrumbJsonLd({
  siteUrl,
  locationTitle,
  locationSlug,
}: {
  siteUrl: string;
  locationTitle: string;
  locationSlug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Service areas", item: `${siteUrl}/service-areas` },
      { "@type": "ListItem", position: 3, name: locationTitle, item: `${siteUrl}/locations/${locationSlug}` },
    ],
  };
}

/** Only slugs returned by `generateStaticParams` resolve; unknown slugs 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return getLocations()
    .filter((l) => !isRedirectedLocationSlug(l.slug))
    .map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const location = getLocationBySlug(slug);
  if (!location) return {};

  const titleSegment = `${location.title}: Service Guides and Local Provider Lists`;
  const description =
    `${location.description} Browse service guides and best-of comparisons for this area, then contact providers directly for availability and estimates.`;
  return pageSeoMetadata({
    titleSegment,
    description,
    pathname: `/locations/${slug}`,
    ogType: "website",
    noindex: isNoindexSlug(slug),
  });
}

export default async function LocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const location = getLocationBySlug(slug);
  if (!location) notFound();

  const siteUrl = process.env.SITE_URL ?? "https://www.georgetownhomeservices.com";

  const services = getServices();
  const servicePages = location.serviceSlugs
    .filter((s) => showExtendedHomeServices() || !isExtendedServiceSlug(s))
    .map((s) => services.find((x) => x.slug === s))
    .filter((s): s is (typeof services)[number] => Boolean(s));
  const bestPages = location.bestSlugs
    .filter((s) => showExtendedHomeServices() || !isExtendedBestSlug(s))
    .map((s) => getBestBySlug(s))
    .filter((b): b is NonNullable<typeof b> => Boolean(b));

  return (
    <PageShell>
      <section className="py-8 md:py-12">
          <JsonLd data={breadcrumbJsonLd({ siteUrl, locationTitle: location.title, locationSlug: location.slug })} />
          <JsonLd
            data={hubArticleJsonLd({
              pathname: `/locations/${location.slug}`,
              headline: location.h1 ?? location.title,
              description: location.description,
              datePublished: SERVICE_BEST_LAST_UPDATED_ISO,
              dateModified: SERVICE_BEST_LAST_UPDATED_ISO,
            })}
          />
          {location.faqs?.length ? (
            <FAQSchema
              pageUrl={absolutePageUrl(`/locations/${location.slug}`)}
              name={`${location.title} FAQ`}
              faqs={location.faqs}
            />
          ) : null}
          <TwoColumnPage
            gapClassName="gap-8"
            main={
              <>
              <div className="text-sm font-semibold uppercase tracking-wide text-gray-600">Service locations</div>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">{location.h1}</h1>
              <p className={SERVICE_BEST_LAST_UPDATED_LINE_CLASS}>Last updated: {SERVICE_BEST_LAST_UPDATED_DISPLAY}</p>
              <AuthorByline className="mt-3" compact />
              <p className="mt-4 max-w-2xl text-lg text-gray-700">{location.description}</p>

              <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-md">
                <div className="text-sm font-semibold text-gray-900">Highlights</div>
                <ul className="mt-3 list-disc space-y-2 pl-6 text-sm text-gray-700">
                  {location.heroBullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <RichText blocks={location.content} />
              </div>

              {servicePages.length ? (
                <section className="mt-12">
                  <h2 className="text-3xl font-semibold tracking-tight text-gray-900">Services in {location.title}</h2>
                  <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {servicePages.map((s) => (
                      <LinkCard key={s.slug} href={`/services/${s.slug}`} title={s.title} description={s.description} badge={s.serviceType} />
                    ))}
                  </div>
                </section>
              ) : null}

              {bestPages.length ? (
                <section className="mt-12">
                  <h2 className="text-3xl font-semibold tracking-tight text-gray-900">Best Of for {location.title}</h2>
                  <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {bestPages.map((b) => (
                      <LinkCard key={b.slug} href={`/best/${b.slug}`} title={b.title} description={b.description} />
                    ))}
                  </div>
                </section>
              ) : null}

              {location.faqs?.length ? (
                <section className="mt-12">
                  <h2 className="text-3xl font-semibold tracking-tight text-gray-900">Frequently asked questions</h2>
                  <div className="mt-6">
                    <FAQList faqs={location.faqs} />
                  </div>
                </section>
              ) : null}
              </>
            }
            aside={
              <>
              <div className="mt-8">
                <CTASection
                  eyebrow="Local guides"
                  title="Find providers you can contact"
                  description="Browse best-of rankings and service pages for Georgetown—then reach out to businesses directly."
                  primaryHref="/best/best-plumbers-georgetown-tx"
                  emailFormHref="/#email-capture"
                  showDisclaimer
                />
              </div>
              <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-md">
                <div className="text-sm font-semibold text-gray-900">Internal links</div>
                <div className="mt-2 text-sm text-gray-700">
                  <Link className="underline underline-offset-4" href="/">
                    Home
                  </Link>
                </div>
                <div className="mt-2 text-sm text-gray-700">
                  <Link className="underline underline-offset-4" href={`/locations/${location.slug}`}>
                    This location
                  </Link>
                </div>
              </div>
              </>
            }
          />
      </section>
    </PageShell>
  );
}

