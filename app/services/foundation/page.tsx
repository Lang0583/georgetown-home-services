import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import Container from "../../../components/Container";
import LinkCard from "../../../components/LinkCard";
import JsonLd from "../../../components/JsonLd";
import { pageSeoMetadata } from "../../../lib/page-seo";
import {
  SERVICE_BEST_LAST_UPDATED_DISPLAY,
  SERVICE_BEST_LAST_UPDATED_LINE_CLASS,
  webPageWithDateModifiedJsonLd,
} from "../../../lib/service-best-pages-meta";
import { showExtendedHomeServices } from "../../../lib/public-site-scope";
import { getBlog, getServices } from "../../../lib/site-content";

export const metadata: Metadata = pageSeoMetadata({
  titleSegment: "Foundation Repair Guides for Georgetown, TX",
  description:
    "Foundation repair guidance for Georgetown, TX: expansive clay soil, drainage, crack patterns, and how to compare foundation contractors.",
  pathname: "/services/foundation",
  ogType: "website",
});

function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Do you perform foundation repairs?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. This site is a directory and homeowner guide. Use the Best Of page to compare foundation repair companies and contact providers directly.",
        },
      },
      {
        "@type": "Question",
        name: "Why is clay soil mentioned so often?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Central Texas expansive clay swells when wet and shrinks in drought, which stresses slabs and footings. Good contractors pair repairs with moisture and drainage planning.",
        },
      },
    ],
  };
}

export default function FoundationHubPage() {
  if (!showExtendedHomeServices()) redirect("/services");

  const services = getServices();
  const blog = getBlog();

  const core = services.find((s) => s.slug === "foundation-repair-georgetown-tx") ?? null;
  const supporting = services.filter(
    (s) => s.bestSlugs?.includes("best-foundation-repair-georgetown-tx") && s.slug !== "foundation-repair-georgetown-tx"
  );
  const posts = blog.filter((p) => p.relatedBestSlugs?.includes("best-foundation-repair-georgetown-tx")).slice(0, 10);

  return (
    <div className="bg-gray-50">
      <Container>
        <section className="py-10 md:py-12">
          <JsonLd data={faqJsonLd()} />
          <JsonLd
            data={webPageWithDateModifiedJsonLd({
              pathname: "/services/foundation",
              name: "Foundation Repair in Georgetown, TX",
              description:
                "Foundation repair guidance for Georgetown, TX: expansive clay soil, drainage, crack patterns, and how to compare foundation contractors.",
            })}
          />
          <div className="flex flex-col gap-10">
            <div>
              <div className="text-sm font-semibold uppercase tracking-wide text-gray-600">Services</div>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">Foundation Repair in Georgetown, TX</h1>
              <p className={SERVICE_BEST_LAST_UPDATED_LINE_CLASS}>Last updated: {SERVICE_BEST_LAST_UPDATED_DISPLAY}</p>
              <p className="mt-4 max-w-3xl text-lg leading-relaxed text-gray-700">
                Expansive clay around Georgetown means foundation conversations should include moisture swings, drainage, and measured movement—not
                guesswork from a single crack photo. Use these pages to learn warning signs, then compare contractors with clear scopes and warranty
                terms.
              </p>
              <div className="mt-4 flex flex-wrap gap-4 text-sm font-semibold">
                <Link href="/best/best-foundation-repair-georgetown-tx" className="text-primary hover:underline">
                  Best Foundation Repair in Georgetown, TX
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
                    href="/best/best-foundation-repair-georgetown-tx"
                    title="Best Foundation Repair in Georgetown, TX"
                    description="Directory with provider cards, clay-soil context, and questions to ask about drainage and warranties."
                    badge="Provider directory"
                  />
                </div>
              </section>
            ) : null}

            {supporting.length ? (
              <section>
                <h2 className="text-3xl font-semibold tracking-tight text-gray-900">Supporting foundation pages</h2>
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
