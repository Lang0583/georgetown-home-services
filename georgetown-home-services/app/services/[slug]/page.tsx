import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import FAQList from "../../../components/FAQList";
import CTASection from "../../../components/CTASection";
import Container from "../../../components/Container";
import LeadForm from "../../../components/LeadForm";
import LinkCard from "../../../components/LinkCard";
import RichText from "../../../components/RichText";
import {
  getBestBySlug,
  getLocationBySlug,
  getServiceBySlug,
  getServices,
  getServiceSlugs,
} from "../../../lib/site-content";

export function generateStaticParams() {
  return getServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const service = getServiceBySlug(params.slug);
  if (!service) return {};

  return {
    title: service.title,
    description: service.description,
  };
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = getServiceBySlug(params.slug);
  if (!service) notFound();

  const location = getLocationBySlug(service.locationSlug);
  const relatedServices = service.relatedServiceSlugs
    .map((s) => getServiceBySlug(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
  const bestPages = service.bestSlugs
    .map((s) => getBestBySlug(s))
    .filter((b): b is NonNullable<typeof b> => Boolean(b));

  return (
    <div className="bg-zinc-50">
      <Container>
        <section className="py-8 md:py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:items-start">
            <div className="md:col-span-2">
              <div className="text-sm font-semibold uppercase tracking-wide text-zinc-600">
                {service.serviceType} • {location?.title ?? "Georgetown, TX"}
              </div>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-zinc-900">{service.h1}</h1>
              <p className="mt-4 text-lg text-zinc-700">{service.description}</p>

              <div className="mt-6 rounded-2xl border border-black/10 bg-white p-6">
                <div className="text-sm font-semibold text-zinc-900">What we’ll handle</div>
                <ul className="mt-3 list-disc space-y-2 pl-6 text-sm text-zinc-700">
                  {service.heroBullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <RichText blocks={service.content} />
              </div>

              <div className="mt-10">
                <FAQList faqs={service.faqs} />
              </div>

              {relatedServices.length ? (
                <section className="mt-10">
                  <h2 className="text-2xl font-semibold text-zinc-900">Related Services</h2>
                  <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
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

            <aside className="md:col-span-1">
              <div className="sticky top-[82px]">
                <LeadForm
                  defaultService={service.serviceType}
                  defaultLocation={location?.title ?? "Georgetown, TX"}
                  formId="lead"
                />
              </div>
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
              <div className="mt-8 rounded-2xl border border-black/10 bg-white p-6">
                <div className="text-sm font-semibold text-zinc-900">Service area</div>
                <div className="mt-2 text-sm text-zinc-700">
                  {location?.title ?? "Georgetown, TX"} •{" "}
                  <Link className="underline underline-offset-4" href={`/locations/${service.locationSlug}`}>
                    View locations
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="pb-14">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-black/10 bg-white p-6">
              <h2 className="text-xl font-semibold text-zinc-900">Get help fast</h2>
              <p className="mt-2 text-sm text-zinc-700">
                Submit the form and we’ll follow up with next steps for your plumbing, HVAC, or roofing need.
              </p>
              <div className="mt-4">
                <Link
                  href="#lead"
                  className="inline-flex h-10 items-center justify-center rounded-full bg-zinc-900 px-5 text-sm font-semibold text-white"
                >
                  Get Free Quotes
                </Link>
              </div>
            </div>
            <div className="rounded-2xl border border-black/10 bg-white p-6">
              <h2 className="text-xl font-semibold text-zinc-900">Popular guides</h2>
              <p className="mt-2 text-sm text-zinc-700">
                Learn what to look for and how to avoid common service mistakes.
              </p>
              <div className="mt-4 grid grid-cols-1 gap-3">
                {service.bestSlugs.slice(0, 1).map((bSlug) => {
                  const b = getBestBySlug(bSlug);
                  if (!b) return null;
                  return (
                    <Link key={b.slug} href={`/best/${b.slug}`} className="text-sm font-semibold text-zinc-900 hover:underline">
                      {b.title}
                    </Link>
                  );
                })}
                {service.relatedServiceSlugs.slice(0, 2).map((sSlug) => {
                  const s = getServices().find((x) => x.slug === sSlug);
                  if (!s) return null;
                  return (
                    <Link key={s.slug} href={`/services/${s.slug}`} className="text-sm font-semibold text-zinc-900 hover:underline">
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

