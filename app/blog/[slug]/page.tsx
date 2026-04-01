import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "../../../components/Container";
import LeadForm from "../../../components/LeadForm";
import GeneratedArticleBody from "../../../components/GeneratedArticleBody";
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
import { getGeneratedPage } from "../../../lib/generatedPages";

export function generateStaticParams() {
  return getBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) return {};
  return { title: post.title, description: post.description };
}

export default async function BlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) notFound();

  const generated = getGeneratedPage(slug);
  const location = getLocationBySlug(post.locationSlug);
  const services = getServices();
  const relatedServices = post.relatedServiceSlugs
    .map((s) => services.find((x) => x.slug === s))
    .filter((s): s is (typeof services)[number] => Boolean(s));

  const relatedBest = post.relatedBestSlugs
    .map((s) => getBestBySlug(s))
    .filter((b): b is NonNullable<typeof b> => Boolean(b));

  const topProvidersHref = relatedBest.length > 0 ? `/best/${relatedBest[0]!.slug}` : "/best";

  return (
    <div className="bg-gray-50">
      <Container>
        <section className="py-10 md:py-12">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:items-start lg:gap-12">
            <article className="min-w-0 md:col-span-2">
              <div className="text-sm font-semibold uppercase tracking-wide text-gray-600">
                Blog • {location?.title ?? "Georgetown, TX"}
              </div>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">{post.h1}</h1>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-700">{post.description}</p>
              <div className="mt-2 text-sm text-gray-500">Estimated read time: {post.readTime}</div>

              <div className="mt-8">
                {generated ? <GeneratedArticleBody html={generated.html} /> : <RichText blocks={post.content} />}
              </div>

              <section className="mt-12">
                <h2 className="text-3xl font-semibold tracking-tight text-gray-900">Related Services</h2>
                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
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
                <section className="mt-12">
                  <h2 className="text-3xl font-semibold tracking-tight text-gray-900">Best Of Guides</h2>
                  <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                    {relatedBest.slice(0, 2).map((b) => (
                      <LinkCard key={b.slug} href={`/best/${b.slug}`} title={b.title} description={b.description} />
                    ))}
                  </div>
                </section>
              ) : null}
            </article>

            <aside className="min-w-0 md:col-span-1">
              <LeadForm
                defaultService={relatedServices[0]?.serviceType ?? "Plumbing"}
              />

              <div className="mt-8">
                <CTASection
                  eyebrow="Take action"
                  title="View providers or optional email"
                  description="Open a best-of guide for ranked local companies, or use the email form for informational provider ideas."
                  primaryHref={topProvidersHref}
                  emailFormHref="#email-capture"
                  secondary={
                    relatedServices[0] ? (
                      <div className="text-sm text-gray-600">
                        Related service guide:{" "}
                        <Link
                          href={`/services/${relatedServices[0].slug}`}
                          className="font-semibold underline underline-offset-4"
                        >
                          {relatedServices[0].title}
                        </Link>
                      </div>
                    ) : null
                  }
                  showDisclaimer
                />
              </div>
            </aside>
          </div>
        </section>
      </Container>
    </div>
  );
}

