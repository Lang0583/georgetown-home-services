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
import { FOUNDATION_TRADE_HUB_FAQS } from "../../../lib/service-trade-hub-faqs";
import {
  SERVICE_BEST_LAST_UPDATED_DISPLAY,
  SERVICE_BEST_LAST_UPDATED_LINE_CLASS,
  breadcrumbListJsonLd,
  webPageWithDateModifiedJsonLd,
} from "../../../lib/service-best-pages-meta";
import { showExtendedHomeServices } from "../../../lib/public-site-scope";
import { getBlog, getServices } from "../../../lib/site-content";

const hubSeo = buildTradeHubSeo({ label: "Foundation Repair", pricingKey: "foundation" });

export const metadata: Metadata = pageSeoMetadata({
  absoluteTitle: hubSeo.absoluteTitle,
  description: hubSeo.description,
  pathname: "/services/foundation",
  ogType: "website",
});

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
    <div className="bg-gray-50 pb-24 md:pb-0">
      <Container>
        <section className="py-10 md:py-12">
          <FAQSchema
            pageUrl={absolutePageUrl("/services/foundation")}
            name="Foundation repair in Georgetown TX — FAQ"
            faqs={FOUNDATION_TRADE_HUB_FAQS}
          />
          <TradeServiceSchema categoryKey="foundation" pageUrl={absolutePageUrl("/services/foundation")} />
          <JsonLd
            data={webPageWithDateModifiedJsonLd({
              pathname: "/services/foundation",
              name: "Foundation Repair in Georgetown, TX",
              description:
                "Foundation repair guidance for Georgetown, TX: expansive clay soil, drainage, crack patterns, and how to compare foundation contractors.",
            })}
          />
          <JsonLd
            data={breadcrumbListJsonLd({
              pathname: "/services/foundation",
              name: "Foundation Repair in Georgetown, TX",
            })}
          />
          <div className="flex flex-col gap-10">
            <div>
              <div className="text-sm font-semibold uppercase tracking-wide text-gray-600">Services</div>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">Foundation Repair in Georgetown, TX</h1>
              <p className={SERVICE_BEST_LAST_UPDATED_LINE_CLASS}>Last updated: {SERVICE_BEST_LAST_UPDATED_DISPLAY}</p>
              <p className="mt-4 max-w-3xl text-lg leading-relaxed text-gray-700">
                Expansive Houston Black clay around Georgetown means foundation conversations should include moisture swings, drainage,
                and measured movement — not guesswork from a single crack photo. After the 2011 and 2022 droughts, repair calls spiked
                across Sun City, Berry Creek, and Georgetown Village. Use these pages to learn warning signs, then compare contractors
                with clear scopes and warranty terms.
              </p>
              <div className="mt-4 flex flex-wrap gap-4 text-sm font-semibold">
                <Link href="/best/best-foundation-repair-georgetown-tx" className="text-primary hover:underline">
                  Best Foundation Repair in Georgetown, TX
                </Link>
                <span className="text-[#6b7280]" aria-hidden>
                  ·
                </span>
                <Link href="/services" className="text-gray-700 hover:underline">
                  All service guides
                </Link>
              </div>
            </div>

            <WhyHireServiceSection categoryKey="foundation" />

            <ServiceHubPricingSection categoryKey="foundation" />

            <NeighborhoodHighlightLinks categoryKey="foundation" serviceLabel="foundation repair" />

            <section className="max-w-3xl">
              <p className="text-sm leading-relaxed text-gray-700">
                This site is a homeowner guide and directory — we do not perform foundation repairs. The answers below mirror
                common Google &ldquo;People also ask&rdquo; topics for Georgetown / Williamson County, designed to help you
                budget, evaluate independent engineer reports, and compare apples-to-apples contractor bids.
              </p>
              <FAQList faqs={FOUNDATION_TRADE_HUB_FAQS} title="Foundation repair in Georgetown, TX — quick answers" className="!mt-4" />
            </section>

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
