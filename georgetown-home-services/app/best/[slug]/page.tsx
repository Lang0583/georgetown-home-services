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
  getLocations,
  getBestSlugs,
  getServices,
} from "../../../lib/site-content";

export function generateStaticParams() {
  return getBestSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const best = getBestBySlug(params.slug);
  if (!best) return {};
  return { title: best.title, description: best.description };
}

export default function BestPage({ params }: { params: { slug: string } }) {
  const best = getBestBySlug(params.slug);
  if (!best) notFound();

  const locationTitle = getLocations().find((l) => l.slug === best.locationSlug)?.title ?? "Georgetown, TX";
  const services = getServices();
  const recommended = best.recommendedServiceSlugs
    .map((s) => services.find((x) => x.slug === s))
    .filter((s): s is (typeof services)[number] => Boolean(s));

  return (
    <div className="bg-zinc-50">
      <Container>
        <section className="py-8 md:py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:items-start">
            <div className="md:col-span-2">
              <div className="text-sm font-semibold uppercase tracking-wide text-zinc-600">Best Of</div>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-zinc-900">{best.h1}</h1>
              <p className="mt-4 max-w-2xl text-lg text-zinc-700">{best.description}</p>

              <div className="mt-8">
                <RichText blocks={best.content} />
              </div>

              {recommended.length ? (
                <section className="mt-10">
                  <h2 className="text-2xl font-semibold text-zinc-900">Recommended Services</h2>
                  <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
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

            <aside className="md:col-span-1">
              <div className="sticky top-[82px]">
                <LeadForm
                  formId="lead"
                  defaultLocation={locationTitle}
                  defaultService="Service request"
                />
              </div>

              <div className="mt-8">
                <CTASection
                  eyebrow="Need a recommendation?"
                  title="Get Free Quotes"
                  description="Submit the form to request service options and free quotes."
                  primaryHref={`/locations/${best.locationSlug}`}
                  primaryLabel={`View ${locationTitle}`}
                  secondary={
                    <div className="text-sm text-zinc-600">
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

