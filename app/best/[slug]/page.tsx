import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CTASection from "../../../components/CTASection";
import Container from "../../../components/Container";
import LeadForm from "../../../components/LeadForm";
import LinkCard from "../../../components/LinkCard";
import GeneratedArticleBody from "../../../components/GeneratedArticleBody";
import RichText from "../../../components/RichText";
import ProviderList from "../../../components/ProviderList";
import ComparisonSection from "../../../components/ComparisonSection";
import {
  getBestBySlug,
  getLocations,
  getBestSlugs,
  getServiceBySlug,
  getServices,
} from "../../../lib/site-content";
import { getGeneratedPage } from "../../../lib/generatedPages";
import { getProvidersForBestSlug } from "../../../lib/providers";
import {
  BUSINESS_LISTINGS_LAST_UPDATED,
  getBusinessCategoryForBestSlug,
  getBusinessesByCategory,
  getRelatedServiceSlugForBestSlug,
} from "../../../lib/businesses";
import BestBusinessesSection from "../../../components/BestBusinessesSection";
import businessSource from "@/lib/businesses.json";

export function generateStaticParams() {
  return getBestSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const best = getBestBySlug(slug);
  if (!best) return {};
  return { title: best.title, description: best.description };
}

export default async function BestPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const best = getBestBySlug(slug);
  if (!best) notFound();

  const generated = getGeneratedPage(slug);
  const providerData = getProvidersForBestSlug(slug);
  const businessCategory = getBusinessCategoryForBestSlug(slug);
  const businessesForPage =
    businessCategory !== null ? getBusinessesByCategory(businessCategory) : null;
  const relatedServiceSlug = getRelatedServiceSlugForBestSlug(slug);
  const relatedService = relatedServiceSlug ? getServiceBySlug(relatedServiceSlug) : null;
  const locationTitle = getLocations().find((l) => l.slug === best.locationSlug)?.title ?? "Georgetown, TX";
  const services = getServices();
  const recommended = best.recommendedServiceSlugs
    .map((s) => services.find((x) => x.slug === s))
    .filter((s): s is (typeof services)[number] => Boolean(s));

  return (
    <div className="bg-gray-50">
      <Container>
        <section className="py-10 md:py-12">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:items-start lg:gap-12">
            <div className="min-w-0 md:col-span-2">
              <div className="text-sm font-semibold uppercase tracking-wide text-gray-600">Best Of</div>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">{best.h1}</h1>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-700">{best.description}</p>

              <div className="mt-8">
                {generated ? <GeneratedArticleBody html={generated.html} /> : <RichText blocks={best.content} />}
              </div>

              {providerData ? (
                <section className="mt-12">
                  <h2 className="text-3xl font-semibold tracking-tight text-gray-900">Top Providers in Georgetown</h2>

                  {businessesForPage !== null ? (
                    <>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                        These listings are compiled from publicly available local business information (for example, names, ratings, review counts,
                        and addresses or official websites where published online). They are provided for research and comparison—confirm details
                        directly with any company before hiring.
                      </p>
                      <p className="mt-2 text-sm text-gray-600">
                        Last updated: {BUSINESS_LISTINGS_LAST_UPDATED}. Source:{" "}
                        <code className="rounded bg-gray-100 px-1 py-0.5 text-xs text-gray-800">@/lib/businesses.json</code> ({businessSource.length}{" "}
                        records in file).
                      </p>
                      <p className="mt-3 text-sm text-gray-700">
                        <Link href="/" className="font-semibold text-blue-600 hover:text-blue-700">
                          Home
                        </Link>
                        {relatedServiceSlug ? (
                          <>
                            {" "}
                            ·{" "}
                            <Link href={`/services/${relatedServiceSlug}`} className="font-semibold text-blue-600 hover:text-blue-700">
                              {relatedService?.title ?? "Related service"}
                            </Link>
                          </>
                        ) : null}
                      </p>
                      <BestBusinessesSection businesses={businessesForPage} />
                    </>
                  ) : (
                    <>
                      <p className="mt-3 text-sm text-gray-700">{providerData.evaluatedIntro}</p>
                      {providerData.providers.length ? (
                        <ProviderList providers={providerData.providers} />
                      ) : (
                        <div className="mt-5 rounded-xl border border-gray-200 bg-white p-6 text-sm text-gray-700 shadow-md">
                          Provider listings haven’t been added yet for this guide.
                        </div>
                      )}
                    </>
                  )}

                  <ComparisonSection comparison={providerData.comparison} />
                </section>
              ) : null}

              {recommended.length ? (
                <section className="mt-12">
                  <h2 className="text-3xl font-semibold tracking-tight text-gray-900">Recommended Services</h2>
                  <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                    {recommended.map((s) => (
                      <LinkCard
                        key={s.slug}
                        href={`/services/${s.slug}`}
                        title={s.title}
                        description={s.description}
                        badge={s.serviceType}
                      />
                    ))}
                  </div>
                </section>
              ) : null}
            </div>

            <aside className="min-w-0 md:col-span-1">
              <LeadForm
                formId="lead"
                defaultLocation={locationTitle}
                defaultService="Service request"
              />

              <div className="mt-8">
                <CTASection
                  eyebrow="Need a recommendation?"
                  title="Get Free Quotes"
                  description="Submit the form to request service options and free quotes."
                  primaryHref={`/services/${recommended[0]?.slug ?? relatedServiceSlug ?? "plumber-georgetown-tx"}`}
                  primaryLabel={recommended[0] ? `View ${recommended[0].serviceType} services` : "Browse services"}
                  secondary={
                    <div className="text-sm text-gray-600">
                      Or browse services directly:{" "}
                      {recommended[0] ? (
                        <Link
                          href={`/services/${recommended[0]?.slug}`}
                          className="font-semibold underline underline-offset-4"
                        >
                          {recommended[0]?.serviceType}
                        </Link>
                      ) : (
                        <span className="font-semibold">Services</span>
                      )}
                    </div>
                  }
                />
              </div>
            </aside>
          </div>
        </section>
      </Container>
    </div>
  );
}

