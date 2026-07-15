import type { Metadata } from "next";
import Link from "next/link";
import Container from "../../../components/Container";
import LinkCard from "../../../components/LinkCard";
import ServiceHubPricingSection from "../../../components/ServiceHubPricingSection";
import FAQSchema from "../../../components/FAQSchema";
import FAQList from "../../../components/FAQList";
import JsonLd from "../../../components/JsonLd";
import TradeServiceSchema from "../../../components/TradeServiceSchema";
import WhyHireServiceSection from "../../../components/WhyHireServiceSection";
import NeighborhoodHighlightLinks from "../../../components/NeighborhoodHighlightLinks";
import { pageSeoMetadata, absolutePageUrl } from "../../../lib/page-seo";
import { buildTradeHubSeo } from "../../../lib/service-page-seo";
import { LANDSCAPING_TRADE_HUB_FAQS } from "../../../lib/service-trade-hub-faqs";
import {
  SERVICE_BEST_LAST_UPDATED_DISPLAY,
  SERVICE_BEST_LAST_UPDATED_LINE_CLASS,
  breadcrumbListJsonLd,
  webPageWithDateModifiedJsonLd,
} from "../../../lib/service-best-pages-meta";
import { getBlog, getServices } from "../../../lib/site-content";

const hubSeo = buildTradeHubSeo({ label: "Landscaping", pricingKey: "landscaping" });

export const metadata: Metadata = pageSeoMetadata({
  absoluteTitle: hubSeo.absoluteTitle,
  description: hubSeo.description,
  pathname: "/services/landscaping",
  ogType: "website",
});

export default function LandscapingHubPage() {
  const services = getServices();
  const blog = getBlog();

  const core = services.find((s) => s.slug === "landscaping-georgetown-tx") ?? null;
  const supporting = services.filter(
    (s) => s.bestSlugs?.includes("best-landscaping-companies-georgetown-tx") && s.slug !== "landscaping-georgetown-tx"
  );
  const posts = blog.filter((p) => p.relatedBestSlugs?.includes("best-landscaping-companies-georgetown-tx")).slice(0, 10);

  return (
    <div className="bg-gray-50 pb-24 md:pb-0">
      <Container>
        <section className="py-10 md:py-12">
          <FAQSchema
            pageUrl={absolutePageUrl("/services/landscaping")}
            name="Landscaping in Georgetown TX — FAQ"
            faqs={LANDSCAPING_TRADE_HUB_FAQS}
          />
          <TradeServiceSchema categoryKey="landscaping" pageUrl={absolutePageUrl("/services/landscaping")} />
          <JsonLd
            data={webPageWithDateModifiedJsonLd({
              pathname: "/services/landscaping",
              name: "Landscaping & Lawn Care in Georgetown, TX",
              description:
                "Landscaping and lawn care guidance for Georgetown: maintenance, irrigation, seasonal timing, and a directory of local companies to compare.",
            })}
          />
          <JsonLd
            data={breadcrumbListJsonLd({
              pathname: "/services/landscaping",
              name: "Landscaping & Lawn Care in Georgetown, TX",
            })}
          />
          <div className="flex flex-col gap-10">
            <div>
              <div className="text-sm font-semibold uppercase tracking-wide text-gray-600">Services</div>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
                Landscaping &amp; Lawn Care in Georgetown, TX
              </h1>
              <p className={SERVICE_BEST_LAST_UPDATED_LINE_CLASS}>Last updated: {SERVICE_BEST_LAST_UPDATED_DISPLAY}</p>
              <p className="mt-4 max-w-3xl text-lg leading-relaxed text-gray-700">
                Plan maintenance, irrigation, and curb appeal with Williamson County&apos;s expansive clay soil and Central Texas seasons in
                mind. These pages help you define scope, compare visit frequency, and shortlist reputable crews who already know the
                Sun City, Wolf Ranch, Teravista, and historic district design rules you may need to follow.
              </p>
              <div className="mt-4 flex flex-wrap gap-4 text-sm font-semibold">
                <Link href="/best/best-landscaping-companies-georgetown-tx" className="text-primary hover:underline">
                  Best Landscaping Companies in Georgetown, TX
                </Link>
                <span className="text-[#6b7280]" aria-hidden>
                  ·
                </span>
                <Link href="/services" className="text-gray-700 hover:underline">
                  All service guides
                </Link>
              </div>
            </div>

            <WhyHireServiceSection categoryKey="landscaping" />

            <ServiceHubPricingSection categoryKey="landscaping" />

            <NeighborhoodHighlightLinks categoryKey="landscaping" serviceLabel="landscaping" />

            <section className="max-w-3xl">
              <p className="text-sm leading-relaxed text-gray-700">
                This site is a homeowner guide and directory — we do not schedule landscaping crews. The answers below
                reflect common Google &ldquo;People also ask&rdquo; searches for Georgetown / Williamson County: grass
                selection, irrigation, HOA rules, and seasonal timing for fertilization and overseeding.
              </p>
              <FAQList faqs={LANDSCAPING_TRADE_HUB_FAQS} title="Landscaping in Georgetown, TX — quick answers" className="!mt-4" />
            </section>

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
          </div>
        </section>
      </Container>
    </div>
  );
}
