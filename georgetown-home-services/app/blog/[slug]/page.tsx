import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "../../../components/Container";
import LeadForm from "../../../components/LeadForm";
import RichText from "../../../components/RichText";
import LinkCard from "../../../components/LinkCard";
import CTASection from "../../../components/CTASection";
import {
  getBlogBySlug,
  getBestBySlug,
  getBlogSlugs,
  getLocationBySlug,
  getServices,
} from "../../../lib/site-content";

export function generateStaticParams() {
  return getBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getBlogBySlug(params.slug);
  if (!post) return {};
  return { title: post.title, description: post.description };
}

export default function BlogPage({ params }: { params: { slug: string } }) {
  const post = getBlogBySlug(params.slug);
  if (!post) notFound();

  const location = getLocationBySlug(post.locationSlug);
  const services = getServices();
  const relatedServices = post.relatedServiceSlugs
    .map((s) => services.find((x) => x.slug === s))
    .filter((s): s is (typeof services)[number] => Boolean(s));

  const relatedBest = post.relatedBestSlugs
    .map((s) => getBestBySlug(s))
    .filter((b): b is NonNullable<typeof b> => Boolean(b));

  return (
    <div className="bg-zinc-50">
      <Container>
        <section className="py-8 md:py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:items-start">
            <article className="md:col-span-2">
              <div className="text-sm font-semibold uppercase tracking-wide text-zinc-600">
                Blog • {location?.title ?? "Georgetown, TX"}
              </div>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-zinc-900">{post.h1}</h1>
              <p className="mt-4 max-w-2xl text-lg text-zinc-700">{post.description}</p>
              <div className="mt-2 text-sm text-zinc-500">Estimated read time: {post.readTime}</div>

              <div className="mt-8">
                <RichText blocks={post.content} />
              </div>

              <section className="mt-10">
                <h2 className="text-2xl font-semibold text-zinc-900">Related Services</h2>
                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {relatedServices.slice(0, 4).map((s) => (
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

              {relatedBest.length ? (
                <section className="mt-10">
                  <h2 className="text-2xl font-semibold text-zinc-900">Best Of Guides</h2>
                  <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {relatedBest.slice(0, 2).map((b) => (
                      <LinkCard key={b.slug} href={`/best/${b.slug}`} title={b.title} description={b.description} />
                    ))}
                  </div>
                </section>
              ) : null}
            </article>

            <aside className="md:col-span-1">
              <div className="sticky top-[82px]">
                <LeadForm
                  formId="lead"
                  defaultLocation={location?.title ?? "Georgetown, TX"}
                  defaultService="Service request"
                />
              </div>

              <div className="mt-8">
                <CTASection
                  eyebrow="Need a pro?"
                  title="Request Service"
                  description="Submit the form to request service options and free quotes."
                  primaryHref={`/locations/${post.locationSlug}`}
                  primaryLabel="View location services"
                  secondary={
                    <div className="text-sm text-zinc-600">
                      Prefer to browse?{" "}
                      <Link
                        href={`/services/${post.relatedServiceSlugs[0]}`}
                        className="font-semibold underline underline-offset-4"
                      >
                        Start with a service
                      </Link>
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

