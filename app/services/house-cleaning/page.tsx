import type { Metadata } from "next";
import Link from "next/link";
import Container from "../../../components/Container";
import LinkCard from "../../../components/LinkCard";
import JsonLd from "../../../components/JsonLd";
import { pageSeoMetadata } from "../../../lib/page-seo";
import {
  SERVICE_BEST_LAST_UPDATED_DISPLAY,
  webPageWithDateModifiedJsonLd,
} from "../../../lib/service-best-pages-meta";
import { getBlog, getServices } from "../../../lib/site-content";

export const metadata: Metadata = pageSeoMetadata({
  titleSegment: "House Cleaning Guides for Georgetown, TX",
  description:
    "House cleaning guidance for Georgetown: recurring service, deep cleans, move-out work, and a directory of local cleaners to compare.",
  pathname: "/services/house-cleaning",
  ogType: "website",
});

function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Do you schedule cleaning appointments?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. This site is a directory and homeowner guide. Use the Best Of page to compare house cleaning services and contact providers directly.",
        },
      },
      {
        "@type": "Question",
        name: "Where should I start?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Start with the house cleaning service guide for Georgetown, then open the Best House Cleaning Services directory when you want quotes.",
        },
      },
    ],
  };
}

export default function HouseCleaningHubPage() {
  const services = getServices();
  const blog = getBlog();

  const core = services.find((s) => s.slug === "house-cleaning-georgetown-tx") ?? null;
  const supporting = services.filter(
    (s) => s.bestSlugs?.includes("best-house-cleaning-services-georgetown-tx") && s.slug !== "house-cleaning-georgetown-tx"
  );
  const posts = blog.filter((p) => p.relatedBestSlugs?.includes("best-house-cleaning-services-georgetown-tx")).slice(0, 10);

  return (
    <div className="bg-gray-50">
      <Container>
        <section className="py-10 md:py-12">
          <JsonLd data={faqJsonLd()} />
          <JsonLd
            data={webPageWithDateModifiedJsonLd({
              pathname: "/services/house-cleaning",
              name: "House Cleaning in Georgetown, TX",
              description:
                "House cleaning guidance for Georgetown: recurring service, deep cleans, move-out work, and a directory of local cleaners to compare.",
            })}
          />
          <div className="flex flex-col gap-10">
            <div>
              <div className="text-sm font-semibold uppercase tracking-wide text-gray-600">Services</div>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">House Cleaning in Georgetown, TX</h1>
              <p className="mt-2 text-sm text-gray-600">Last updated: {SERVICE_BEST_LAST_UPDATED_DISPLAY}</p>
              <p className="mt-4 max-w-3xl text-lg leading-relaxed text-gray-700">
                Clear checklists prevent surprises: which rooms, how often, who supplies products, and what happens for skips or cancellations. These
                pages help you scope work, then compare reputable cleaners serving Georgetown.
              </p>
              <div className="mt-4 flex flex-wrap gap-4 text-sm font-semibold">
                <Link href="/best/best-house-cleaning-services-georgetown-tx" className="text-blue-700 hover:underline">
                  Best House Cleaning Services in Georgetown, TX
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
                    href="/best/best-house-cleaning-services-georgetown-tx"
                    title="Best House Cleaning Services in Georgetown, TX"
                    description="Directory with provider cards and questions about insurance, supplies, and recurring schedules."
                    badge="Provider directory"
                  />
                </div>
              </section>
            ) : null}

            {supporting.length ? (
              <section>
                <h2 className="text-3xl font-semibold tracking-tight text-gray-900">Supporting house cleaning pages</h2>
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
