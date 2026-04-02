import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CTASection from "../../../components/CTASection";
import Container from "../../../components/Container";
import LeadForm from "../../../components/LeadForm";
import LinkCard from "../../../components/LinkCard";
import RichText from "../../../components/RichText";
import {
  getBestBySlug,
  getLocationBySlug,
  getLocations,
  getServices,
} from "../../../lib/site-content";

/** Only slugs returned by `generateStaticParams` resolve; unknown slugs 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return getLocations().map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const location = getLocationBySlug(slug);
  if (!location) return {};
  return { title: location.title, description: location.description };
}

export default async function LocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const location = getLocationBySlug(slug);
  if (!location) notFound();

  const services = getServices();
  const servicePages = location.serviceSlugs
    .map((s) => services.find((x) => x.slug === s))
    .filter((s): s is (typeof services)[number] => Boolean(s));
  const bestPages = location.bestSlugs
    .map((s) => getBestBySlug(s))
    .filter((b): b is NonNullable<typeof b> => Boolean(b));

  return (
    <div className="bg-gray-50">
      <Container>
        <section className="py-8 md:py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:items-start">
            <div className="md:col-span-2">
              <div className="text-sm font-semibold uppercase tracking-wide text-gray-600">Service locations</div>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">{location.h1}</h1>
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
            </div>

            <aside className="min-w-0 md:col-span-1">
              <LeadForm defaultService="Plumbing" />
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
            </aside>
          </div>
        </section>
      </Container>
    </div>
  );
}

