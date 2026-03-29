import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import FAQList from "../../../components/FAQList";
import CTASection from "../../../components/CTASection";
import Container from "../../../components/Container";
import LeadForm from "../../../components/LeadForm";
import LinkCard from "../../../components/LinkCard";
import GeneratedArticleBody from "../../../components/GeneratedArticleBody";
import RichText from "../../../components/RichText";
import { ButtonLink } from "../../../components/Button";
import {
  getBestBySlug,
  getLocationBySlug,
  getServiceBySlug,
  getServices,
  getServiceSlugs,
} from "../../../lib/site-content";
import { getGeneratedPage } from "../../../lib/generatedPages";
import ServiceTopProvidersSection from "../../../components/ServiceTopProvidersSection";
import { getBusinessCategoryForServiceSlug, getBusinessesByCategory } from "../../../lib/businesses";

export function generateStaticParams() {
  return getServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return {
    title: service.title,
    description: service.description,
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const generated = getGeneratedPage(slug);
  const location = getLocationBySlug(service.locationSlug);
  const relatedServices = service.relatedServiceSlugs
    .map((s) => getServiceBySlug(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
  const bestPages = service.bestSlugs
    .map((s) => getBestBySlug(s))
    .filter((b): b is NonNullable<typeof b> => Boolean(b));
  const businessCategory = getBusinessCategoryForServiceSlug(service.slug);
  const providersFromJson =
    businessCategory !== null ? getBusinessesByCategory(businessCategory) : [];

  return (
    <div className="bg-gray-50">
      <Container>
        <section className="py-10 md:py-12">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:items-start lg:gap-12">
            <div className="min-w-0 md:col-span-2">
              <div className="text-sm font-semibold uppercase tracking-wide text-gray-600">
                {service.serviceType} • {location?.title ?? "Georgetown, TX"}
              </div>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">{service.h1}</h1>
              <p className="mt-4 text-lg leading-relaxed text-gray-700">{service.description}</p>

              <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-md">
                <div className="text-sm font-semibold text-gray-900">What we’ll handle</div>
                <ul className="mt-3 list-disc space-y-2.5 pl-6 text-sm leading-relaxed text-gray-700">
                  {service.heroBullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                {generated ? <GeneratedArticleBody html={generated.html} /> : <RichText blocks={service.content} />}
              </div>

              {providersFromJson.length ? <ServiceTopProvidersSection businesses={providersFromJson} /> : null}

              <div>
                <FAQList faqs={service.faqs} />
              </div>

              {relatedServices.length ? (
                <section className="mt-12">
                  <h2 className="text-3xl font-semibold tracking-tight text-gray-900">Related Services</h2>
                  <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                    {relatedServices.map((s) => (
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
                defaultService={service.serviceType}
                defaultLocation={location?.title ?? "Georgetown, TX"}
                formId="lead"
              />
              {bestPages.length ? (
                <div className="mt-8">
                  <CTASection
                    eyebrow="Best Of"
                    title="Explore trusted recommendations"
                    description="Read guides that explain what to look for and why it matters."
                    primaryHref={`/best/${bestPages[0]!.slug}`}
                    primaryLabel="View Best Of"
                  />
                </div>
              ) : null}
              <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-md">
                <div className="text-sm font-semibold text-gray-900">Service area</div>
                <div className="mt-2 text-sm leading-relaxed text-gray-700">{location?.title ?? "Georgetown, TX"}</div>
              </div>
            </aside>
          </div>
        </section>

        <section className="py-10 md:py-12">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
              <h2 className="text-xl font-semibold text-gray-900">Get help fast</h2>
              <p className="mt-2 text-sm text-gray-700">
                Submit the form and we’ll follow up with next steps for your plumbing, HVAC, or roofing need.
              </p>
              <div className="mt-4">
                <ButtonLink href="#lead" className="rounded-full px-5 py-2.5 text-sm">
                  Get Free Quotes
                </ButtonLink>
              </div>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
              <h2 className="text-xl font-semibold text-gray-900">Popular guides</h2>
              <p className="mt-2 text-sm text-gray-700">
                Learn what to look for and how to avoid common service mistakes.
              </p>
              <div className="mt-4 grid grid-cols-1 gap-3">
                {service.bestSlugs.slice(0, 1).map((bSlug) => {
                  const b = getBestBySlug(bSlug);
                  if (!b) return null;
                  return (
                    <Link key={b.slug} href={`/best/${b.slug}`} className="text-sm font-semibold text-gray-900 hover:underline">
                      {b.title}
                    </Link>
                  );
                })}
                {service.relatedServiceSlugs.slice(0, 2).map((sSlug) => {
                  const s = getServices().find((x) => x.slug === sSlug);
                  if (!s) return null;
                  return (
                    <Link key={s.slug} href={`/services/${s.slug}`} className="text-sm font-semibold text-gray-900 hover:underline">
                      {s.title}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}

