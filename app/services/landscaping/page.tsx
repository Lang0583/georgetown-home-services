import type { Metadata } from "next";
import Link from "next/link";
import Container from "../../../components/Container";
import LinkCard from "../../../components/LinkCard";
import TradeHubSubServiceLinks from "../../../components/TradeHubSubServiceLinks";
import JsonLd from "../../../components/JsonLd";
import { pageSeoMetadata } from "../../../lib/page-seo";
import { buildTradeHubSeo } from "../../../lib/service-page-seo";
import LastUpdated from "../../../components/LastUpdated";
import { webPageWithDateModifiedJsonLd } from "../../../lib/last-updated";
import { getStaticPageLastUpdated } from "../../../lib/static-pages-last-updated";
import { getBlog, getServices } from "../../../lib/site-content";

const hubSeo = buildTradeHubSeo({ label: "Landscaping", pricingKey: "landscaping" });

export const metadata: Metadata = pageSeoMetadata({
  absoluteTitle: hubSeo.absoluteTitle,
  description: hubSeo.description,
  pathname: "/services/landscaping",
  ogType: "website",
});

export default function LandscapingHubPage() {
  const lastUpdated = getStaticPageLastUpdated("/services/landscaping");
  const services = getServices();
  const blog = getBlog();

  const core = services.find((s) => s.slug === "landscaping-georgetown-tx") ?? null;
  const supporting = services.filter(
    (s) => s.bestSlugs?.includes("best-landscaping-companies-georgetown-tx") && s.slug !== "landscaping-georgetown-tx"
  );
  const posts = blog.filter((p) => p.relatedBestSlugs?.includes("best-landscaping-companies-georgetown-tx")).slice(0, 10);

  return (
    <div className="bg-gray-50">
      <Container>
        <section className="py-10 md:py-12">
          <JsonLd
            data={webPageWithDateModifiedJsonLd({
              pathname: "/services/landscaping",
              name: "Landscaping & Lawn Care in Georgetown, TX",
              description:
                "Landscaping and lawn care guidance for Georgetown: maintenance, irrigation, seasonal timing, and a directory of local companies to compare.",
              lastUpdated,
            })}
          />
          <div className="flex flex-col gap-10">
            <div>
              <div className="text-sm font-semibold uppercase tracking-wide text-gray-600">Services</div>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
                Landscaping &amp; Lawn Care in Georgetown, TX
              </h1>
              <LastUpdated lastUpdated={lastUpdated} />
              <p className="mt-4 max-w-3xl text-lg leading-relaxed text-gray-700">
                Plan maintenance, irrigation, and curb appeal with Central Texas seasons in mind. These pages help you define scope, compare visit
                frequency, and shortlist reputable crews serving Georgetown.
              </p>
              <div className="mt-4 flex flex-wrap gap-4 text-sm font-semibold">
                <Link href="/best/best-landscaping-companies-georgetown-tx" className="text-primary hover:underline">
                  Best Landscaping Companies in Georgetown, TX
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
                    href="/best/best-landscaping-companies-georgetown-tx"
                    title="Best Landscaping Companies in Georgetown, TX"
                    description="Directory with provider cards and questions to ask about beds, mulch, and irrigation."
                    badge="Provider directory"
                  />
                </div>
              </section>
            ) : null}

            {supporting.length ? (
              <section>
                <h2 className="text-3xl font-semibold tracking-tight text-gray-900">Supporting landscaping pages</h2>
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

            <TradeHubSubServiceLinks parentHubPath="/services/landscaping" />
          </div>
        </section>
      </Container>
    </div>
  );
}
