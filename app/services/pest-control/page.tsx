import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import Container from "../../../components/Container";
import LinkCard from "../../../components/LinkCard";
import JsonLd from "../../../components/JsonLd";
import { pageSeoMetadata } from "../../../lib/page-seo";
import { buildTradeHubSeo } from "../../../lib/service-page-seo";
import LastUpdated from "../../../components/LastUpdated";
import { webPageWithDateModifiedJsonLd } from "../../../lib/last-updated";
import { getStaticPageLastUpdated } from "../../../lib/static-pages-last-updated";
import { showExtendedHomeServices } from "../../../lib/public-site-scope";
import { getBlog, getServices } from "../../../lib/site-content";

const hubSeo = buildTradeHubSeo({ label: "Pest Control", pricingKey: "pest" });

export const metadata: Metadata = pageSeoMetadata({
  absoluteTitle: hubSeo.absoluteTitle,
  description: hubSeo.description,
  pathname: "/services/pest-control",
  ogType: "website",
});

function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Do you schedule pest treatments?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. This site is a directory and homeowner guide. Use the Best Of page to compare pest control companies and contact providers directly.",
        },
      },
      {
        "@type": "Question",
        name: "Where should I start?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Start with the pest control service guide for Georgetown, then open the Best Pest Control directory when you want plans and pricing.",
        },
      },
    ],
  };
}

export default function PestControlHubPage() {
  const lastUpdated = getStaticPageLastUpdated("/services/pest-control");
  if (!showExtendedHomeServices()) redirect("/services");

  const services = getServices();
  const blog = getBlog();

  const core = services.find((s) => s.slug === "pest-control-georgetown-tx") ?? null;
  const supporting = services.filter(
    (s) => s.bestSlugs?.includes("best-pest-control-georgetown-tx") && s.slug !== "pest-control-georgetown-tx"
  );
  const posts = blog.filter((p) => p.relatedBestSlugs?.includes("best-pest-control-georgetown-tx")).slice(0, 10);

  return (
    <div className="bg-gray-50">
      <Container>
        <section className="py-10 md:py-12">
          <JsonLd data={faqJsonLd()} />
          <JsonLd
            data={webPageWithDateModifiedJsonLd({
              pathname: "/services/pest-control",
              name: "Pest Control in Georgetown, TX",
              description:
                "Pest control planning for Georgetown homeowners: inspections, treatment plans, warranties, and a directory of local providers to compare.",
              lastUpdated,
            })}
          />
          <div className="flex flex-col gap-10">
            <div>
              <div className="text-sm font-semibold uppercase tracking-wide text-gray-600">Services</div>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">Pest Control in Georgetown, TX</h1>
              <LastUpdated lastUpdated={lastUpdated} />
              <p className="mt-4 max-w-3xl text-lg leading-relaxed text-gray-700">
                Compare inspection quality, treatment scope, and re-service policies before you commit to a plan. These pages help you ask better
                questions for ants, roaches, rodents, and seasonal pests common around Georgetown.
              </p>
              <div className="mt-4 flex flex-wrap gap-4 text-sm font-semibold">
                <Link href="/best/best-pest-control-georgetown-tx" className="text-primary hover:underline">
                  Best Pest Control in Georgetown, TX
                </Link>
                <span className="text-gray-300" aria-hidden>
                  ·
                </span>
                <Link href="/services" className="text-gray-700 hover:underline">
                  All service guides
                </Link>
              </div>
            </div>

            {core ? (
              <section>
                <h2 className="text-3xl font-semibold tracking-tight text-gray-900">Start here</h2>
                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <LinkCard href={`/services/${core.slug}`} title={core.title} description={core.description} badge={core.serviceType} />
                  <LinkCard
                    href="/best/best-pest-control-georgetown-tx"
                    title="Best Pest Control in Georgetown, TX"
                    description="Directory with provider cards, warranty questions, and plan comparison tips."
                    badge="Provider directory"
                  />
                </div>
              </section>
            ) : null}

            {supporting.length ? (
              <section>
                <h2 className="text-3xl font-semibold tracking-tight text-gray-900">Supporting pest control pages</h2>
                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {supporting.map((s) => (
                    <LinkCard key={s.slug} href={`/services/${s.slug}`} title={s.title} description={s.description} badge={s.serviceType} />
                  ))}
                </div>
              </section>
            ) : null}

            {posts.length ? (
              <section>
                <h2 className="text-3xl font-semibold tracking-tight text-gray-900">Homeowner guides</h2>
                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {posts.map((p) => (
                    <LinkCard key={p.slug} href={`/blog/${p.slug}`} title={p.title} description={p.description} badge={p.readTime} />
                  ))}
                </div>
              </section>
            ) : null}
          </div>
        </section>
      </Container>
    </div>
  );
}
