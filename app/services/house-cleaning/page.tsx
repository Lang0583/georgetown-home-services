import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
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
import { HOUSE_CLEANING_TRADE_HUB_FAQS } from "../../../lib/service-trade-hub-faqs";
import {
  SERVICE_BEST_LAST_UPDATED_DISPLAY,
  SERVICE_BEST_LAST_UPDATED_LINE_CLASS,
  webPageWithDateModifiedJsonLd,
} from "../../../lib/service-best-pages-meta";
import { showExtendedHomeServices } from "../../../lib/public-site-scope";
import { getBlog, getServices } from "../../../lib/site-content";

const hubSeo = buildTradeHubSeo({ label: "House Cleaning", pricingKey: "cleaning" });

export const metadata: Metadata = pageSeoMetadata({
  absoluteTitle: hubSeo.absoluteTitle,
  description: hubSeo.description,
  pathname: "/services/house-cleaning",
  ogType: "website",
});

export default function HouseCleaningHubPage() {
  if (!showExtendedHomeServices()) redirect("/services");

  const services = getServices();
  const blog = getBlog();

  const core = services.find((s) => s.slug === "house-cleaning-georgetown-tx") ?? null;
  const supporting = services.filter(
    (s) => s.bestSlugs?.includes("best-house-cleaning-services-georgetown-tx") && s.slug !== "house-cleaning-georgetown-tx"
  );
  const posts = blog.filter((p) => p.relatedBestSlugs?.includes("best-house-cleaning-services-georgetown-tx")).slice(0, 10);

  return (
    <div className="bg-gray-50 pb-24 md:pb-0">
      <Container>
        <section className="py-10 md:py-12">
          <FAQSchema
            pageUrl={absolutePageUrl("/services/house-cleaning")}
            name="House cleaning in Georgetown TX — FAQ"
            faqs={HOUSE_CLEANING_TRADE_HUB_FAQS}
          />
          <TradeServiceSchema categoryKey="cleaning" pageUrl={absolutePageUrl("/services/house-cleaning")} />
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
              <p className={SERVICE_BEST_LAST_UPDATED_LINE_CLASS}>Last updated: {SERVICE_BEST_LAST_UPDATED_DISPLAY}</p>
              <p className="mt-4 max-w-3xl text-lg leading-relaxed text-gray-700">
                Clear checklists prevent surprises: which rooms, how often, who supplies products, and what happens for skips or cancellations.
                Hard water from the Edwards Aquifer, cedar and cottonwood pollen seasons, and Sun City guest weeks all shape what a good
                Georgetown clean looks like. These pages help you scope work, then compare reputable cleaners serving Wolf Ranch, Teravista,
                the historic district, and beyond.
              </p>
              <div className="mt-4 flex flex-wrap gap-4 text-sm font-semibold">
                <Link href="/best/best-house-cleaning-services-georgetown-tx" className="text-primary hover:underline">
                  Best House Cleaning Services in Georgetown, TX
                </Link>
                <span className="text-[#6b7280]" aria-hidden>
                  ·
                </span>
                <Link href="/services" className="text-gray-700 hover:underline">
                  All service guides
                </Link>
              </div>
            </div>

            <WhyHireServiceSection categoryKey="cleaning" />

            <ServiceHubPricingSection categoryKey="cleaning" />

            <NeighborhoodHighlightLinks categoryKey="cleaning" serviceLabel="house cleaning" />

            <section className="max-w-3xl">
              <p className="text-sm leading-relaxed text-gray-700">
                This site is a homeowner guide and directory — we do not schedule cleaning appointments. The answers below mirror
                common Google &ldquo;People also ask&rdquo; topics for Georgetown / Williamson County, covering hard-water
                descaling, recurring-versus-deep clean differences, insurance requirements, and tipping norms.
              </p>
              <FAQList faqs={HOUSE_CLEANING_TRADE_HUB_FAQS} title="House cleaning in Georgetown, TX — quick answers" className="!mt-4" />
            </section>

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
