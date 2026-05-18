import type { Metadata } from "next";
import Link from "next/link";
import Container from "../../../components/Container";
import LinkCard from "../../../components/LinkCard";
import ServiceHubPricingSection from "../../../components/ServiceHubPricingSection";
import FlagshipYouTubeEmbed from "../../../components/FlagshipYouTubeEmbed";
import FAQSchema from "../../../components/FAQSchema";
import FAQList from "../../../components/FAQList";
import JsonLd from "../../../components/JsonLd";
import TradeServiceSchema from "../../../components/TradeServiceSchema";
import AffiliateTrackedAnchor from "../../../components/AffiliateTrackedAnchor";
import ServiceAffiliateEngagement from "../../../components/ServiceAffiliateEngagement";
import ServiceCompareQuotesThumbtack from "../../../components/ServiceCompareQuotesThumbtack";
import { AFFILIATE_ANGI_URL } from "../../../lib/affiliate-config";
import { pageSeoMetadata, absolutePageUrl } from "../../../lib/page-seo";
import {
  FLAGSHIP_VIDEO_ROOFING_HUB,
  flagshipVideoObjectJsonLd,
} from "../../../lib/flagship-videos";
import { buildTradeHubSeo } from "../../../lib/service-page-seo";
import { ROOFING_TRADE_HUB_FAQS } from "../../../lib/service-trade-hub-faqs";
import {
  SERVICE_BEST_LAST_UPDATED_DISPLAY,
  SERVICE_BEST_LAST_UPDATED_LINE_CLASS,
  webPageWithDateModifiedJsonLd,
} from "../../../lib/service-best-pages-meta";
import { isNoindexSlug, isRedirectedServiceSlug } from "../../../lib/public-site-scope";
import { getBlog, getServices } from "../../../lib/site-content";
import StormInspectionLeadForm from "../../../components/StormInspectionLeadForm";

const hubSeo = buildTradeHubSeo({ label: "Roofing", pricingKey: "roofing" });

export const metadata: Metadata = pageSeoMetadata({
  absoluteTitle: hubSeo.absoluteTitle,
  description: hubSeo.description,
  pathname: "/services/roofing",
  ogType: "website",
});

export default function RoofingHubPage() {
  const services = getServices();
  const blog = getBlog();
  const siteUrl = process.env.SITE_URL ?? "https://www.georgetownhomeservices.com";

  const core = services.find((s) => s.slug === "roofer-georgetown-tx") ?? null;
  const supporting = services.filter(
    (s) =>
      s.bestSlugs?.includes("best-roofers-georgetown-tx") &&
      s.slug !== "roofer-georgetown-tx" &&
      !isRedirectedServiceSlug(s.slug) &&
      !isNoindexSlug(s.slug),
  );
  const posts = blog.filter((p) => p.relatedBestSlugs?.includes("best-roofers-georgetown-tx")).slice(0, 10);

  return (
    <div className="bg-gray-50 pb-24 md:pb-0">
      <Container>
        <section className="py-10 md:py-12">
          <FAQSchema
            pageUrl={absolutePageUrl("/services/roofing")}
            name="Roofing in Georgetown TX — FAQ"
            faqs={ROOFING_TRADE_HUB_FAQS}
          />
          <TradeServiceSchema categoryKey="roofing" pageUrl={absolutePageUrl("/services/roofing")} />
          <JsonLd
            data={webPageWithDateModifiedJsonLd({
              pathname: "/services/roofing",
              name: "Roofing in Georgetown, TX",
              description:
                "Practical roofing guides for Georgetown homeowners: roof leaks, storm damage checklists, replacement cost drivers, and how to compare roofers.",
            })}
          />
          <JsonLd
            data={flagshipVideoObjectJsonLd(
              siteUrl,
              absolutePageUrl("/services/roofing"),
              FLAGSHIP_VIDEO_ROOFING_HUB,
            )}
          />
          <div className="flex flex-col gap-10">
            <div>
              <div className="text-sm font-semibold uppercase tracking-wide text-gray-600">Services</div>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">Roofing in Georgetown, TX</h1>
              <p className={SERVICE_BEST_LAST_UPDATED_LINE_CLASS}>Last updated: {SERVICE_BEST_LAST_UPDATED_DISPLAY}</p>
              <p className="mt-4 max-w-3xl text-lg leading-relaxed text-gray-700">
                Use these pages to understand roof leaks, storm damage, when to stabilize vs repair, and what changes replacement costs in Georgetown.
                When you’re ready, compare roofers in the directory and contact providers directly.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <AffiliateTrackedAnchor
                  href={AFFILIATE_ANGI_URL}
                  affiliate="angi"
                  placement="hub-roofing-hero"
                  buttonVariant="primary"
                >
                  Get 3 Free Quotes
                </AffiliateTrackedAnchor>
                <span className="max-w-xl text-xs leading-relaxed text-gray-500">
                  Sponsored — compare local pros on Angi. We may earn a commission when you request quotes.
                </span>
              </div>
              <div className="mt-6 max-w-xl">
                <StormInspectionLeadForm source="hub:services-roofing" />
              </div>
              <div className="mt-6 flex flex-wrap gap-4 text-sm font-semibold">
                <Link href="/best/best-roofers-georgetown-tx" className="text-primary hover:underline">
                  Browse Roof Repair Options
                </Link>
                <span className="text-gray-300" aria-hidden>
                  ·
                </span>
                <Link href="/services" className="text-gray-700 hover:underline">
                  All service guides
                </Link>
              </div>
            </div>

            <ServiceHubPricingSection categoryKey="roofing" />

            <ServiceCompareQuotesThumbtack />

            <section className="max-w-3xl">
              <p className="text-sm leading-relaxed text-gray-700">
                This site is a homeowner guide and directory—we do not send roofing crews. These answers track frequent Google
                “People also ask” queries for Georgetown / Williamson County. Pair them with the storm checklist posts and itemized
                bids from local contractors—never skip independent inspections after hail.
              </p>
              <FAQList faqs={ROOFING_TRADE_HUB_FAQS} title="Roofing in Georgetown, TX — quick answers" className="!mt-4" />
            </section>

            <div className="not-prose mt-10">
            <FlagshipYouTubeEmbed
              id="flagship-video-roofing-hub"
              heading="Video: inspecting a roof after hail"
              summary="How inspectors often think about hail hits, collateral metal denting, and what belongs in photo documentation before you compare Georgetown bids."
              youtubeId={FLAGSHIP_VIDEO_ROOFING_HUB.youtubeId}
              iframeTitle="YouTube video: how to inspect a roof for hail damage"
            />
            </div>

            {core ? (
              <section>
                <h2 className="text-3xl font-semibold tracking-tight text-gray-900">Start here</h2>
                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <LinkCard href={`/services/${core.slug}`} title={core.title} description={core.description} badge={core.serviceType} />
                  <LinkCard
                    href="/best/best-roofers-georgetown-tx"
                    title="Best Roofers in Georgetown, TX"
                    description="Directory landing page with provider cards, red flags, and how to compare scopes."
                    badge="Provider directory"
                  />
                </div>
              </section>
            ) : null}

            {supporting.length ? (
              <section>
                <h2 className="text-3xl font-semibold tracking-tight text-gray-900">Supporting roofing pages</h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                  Symptom and scenario pages for leaks, storm response, and stabilization decisions.
                </p>
                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {supporting.map((s) => (
                    <LinkCard key={s.slug} href={`/services/${s.slug}`} title={s.title} description={s.description} badge={s.serviceType} />
                  ))}
                </div>
              </section>
            ) : null}

            {posts.length ? (
              <section>
                <h2 className="text-3xl font-semibold tracking-tight text-gray-900">Cost and homeowner guides</h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                  Repeat-use content: after-storm steps, cost drivers, and hiring guidance. Each post links back to service guides and the provider directory.
                </p>
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
      <ServiceAffiliateEngagement />
    </div>
  );
}

