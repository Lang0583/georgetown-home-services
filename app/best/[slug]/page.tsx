import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import BestAlsoCompareBar from "../../../components/BestAlsoCompareBar";
import { notFound } from "next/navigation";
import LinkCard from "../../../components/LinkCard";
import GeneratedArticleBody from "../../../components/GeneratedArticleBody";
import RichText from "../../../components/RichText";
import ProviderList from "../../../components/ProviderList";
import ComparisonSection from "../../../components/ComparisonSection";
import JsonLd from "../../../components/JsonLd";
import Breadcrumbs from "../../../components/Breadcrumbs";
import PageShell from "../../../components/templates/PageShell";
import TwoColumnPage from "../../../components/templates/TwoColumnPage";
import {
  getBestBySlug,
  getBlogsForBestSlug,
  getBestSlugs,
  getServiceBySlug,
  getServices,
} from "../../../lib/site-content";
import { pageSeoMetadata } from "../../../lib/page-seo";
import {
  SERVICE_BEST_LAST_UPDATED_DISPLAY,
  SERVICE_BEST_LAST_UPDATED_LINE_CLASS,
  webPageWithDateModifiedJsonLd,
} from "../../../lib/service-best-pages-meta";
import { CORE_BEST_SLUGS, resolveBestPage } from "../../../lib/pageContentRegistry";
import { getProvidersForBestSlug } from "../../../lib/providers";
import {
  BUSINESS_LISTINGS_LAST_UPDATED,
  getBusinessCategoryForBestSlug,
  getBusinessesByCategory,
  getDefaultBestDirectoryListing,
  getRelatedServiceSlugForBestSlug,
} from "../../../lib/businesses";
import { getAlsoCompareLinksForBestSlug } from "../../../lib/best-also-compare-links";
import { buildBestDirectoryItemListJsonLd } from "../../../lib/best-directory-item-list-schema";
import { bestPageInternalLinks } from "../../../lib/internal-links";
import { getBestOfPageFaqs } from "../../../lib/best-of-page-faqs";
import {
  isExtendedBestSlug,
  isNoindexSlug,
  isRedirectedBlogSlug,
  isRedirectedServiceSlug,
  showExtendedHomeServices,
} from "../../../lib/public-site-scope";
import BestBusinessesDirectory from "../../../components/BestBusinessesDirectory";
import BestProvidersMethodologyCallout from "../../../components/BestProvidersMethodologyCallout";
import AdSenseDisplay from "../../../components/AdSenseDisplay";
import { adsenseBestOfSlot } from "../../../lib/adsense-config";

/** Hero images for core `/best/[slug]` pages (Unsplash — permitted use per Unsplash License). */
const CORE_BEST_HERO: Record<string, { src: string; alt: string }> = {
  "best-plumbers-georgetown-tx": {
    src: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=1200&q=80",
    alt: "Licensed plumber working on pipes in Georgetown TX home",
  },
  "top-hvac-companies-georgetown-tx": {
    src: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1200&q=80",
    alt: "HVAC technician servicing air conditioning unit in Georgetown TX",
  },
  "best-roofers-georgetown-tx": {
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
    alt: "Roofer installing shingles on Georgetown TX residential home",
  },
  "best-electricians-georgetown-tx": {
    src: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&q=80",
    alt: "Electrician inspecting electrical panel in Georgetown TX home",
  },
  "best-landscaping-companies-georgetown-tx": {
    src: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&q=80",
    alt: "Landscaper maintaining lawn and flower beds in Georgetown TX",
  },
  "best-pest-control-georgetown-tx": {
    src: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200&q=80",
    alt: "Pest control technician treating home exterior in Georgetown TX",
  },
  "best-foundation-repair-georgetown-tx": {
    src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80",
    alt: "Foundation repair specialist evaluating a Georgetown TX home",
  },
  "best-house-cleaning-services-georgetown-tx": {
    src: "https://images.unsplash.com/photo-1581578731548-c64695db6952?w=1200&q=80",
    alt: "House cleaning team working in a Georgetown TX residence",
  },
};

function breadcrumbJsonLd({
  siteUrl,
  bestTitle,
  bestSlug,
}: {
  siteUrl: string;
  bestTitle: string;
  bestSlug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Best Of", item: `${siteUrl}/best` },
      { "@type": "ListItem", position: 3, name: bestTitle, item: `${siteUrl}/best/${bestSlug}` },
    ],
  };
}

function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

function BestOfFaqSection({ faqs }: { faqs: readonly { q: string; a: string }[] }) {
  if (!faqs.length) return null;
  return (
    <section className="mt-12 rounded-xl border border-gray-200 bg-white p-6 shadow-md md:p-8">
      <h2 className="text-3xl font-semibold tracking-tight text-gray-900">FAQ</h2>
      <div className="mt-6 space-y-3">
        {faqs.map((f) => (
          <details key={f.q} className="group rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
            <summary className="flex cursor-pointer list-none items-start gap-2 text-sm font-semibold text-gray-900 [&::-webkit-details-marker]:hidden">
              <span
                className="mt-0.5 inline-flex w-5 shrink-0 justify-center font-mono text-base font-normal leading-none text-gray-500 group-open:hidden"
                aria-hidden
              >
                +
              </span>
              <span
                className="mt-0.5 hidden w-5 shrink-0 justify-center font-mono text-base font-normal leading-none text-gray-500 group-open:inline"
                aria-hidden
              >
                −
              </span>
              <span>{f.q}</span>
            </summary>
            <p className="mt-2 border-t border-gray-200 pt-2 pl-7 text-sm leading-relaxed text-gray-700">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function FeaturedPartnerCard({
  partner,
}: {
  partner: NonNullable<
    NonNullable<Awaited<ReturnType<typeof resolveBestPage>>>["record"]["featuredPartner"]
  >;
}) {
  const disclosure = partner.disclosureLabel?.trim() || "Featured Listing (Sponsored)";
  const cta = partner.ctaLabel?.trim() || "Visit partner";

  return (
    <section className="mt-6 rounded-xl border border-amber-200 bg-amber-50/40 p-5 shadow-sm">
      <div className="text-xs font-semibold uppercase tracking-wide text-amber-900">{disclosure}</div>
      <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="text-lg font-semibold text-gray-900">{partner.name}</div>
          <p className="mt-1 text-sm leading-relaxed text-gray-700">{partner.description}</p>
        </div>
        <a
          href={partner.href}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded-lg border border-amber-300 bg-white px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-amber-50"
        >
          {cta}
        </a>
      </div>
    </section>
  );
}

function FeaturedListingReservedSlot() {
  return (
    <section className="mt-6 rounded-xl border border-amber-200 bg-amber-50/40 p-5 shadow-sm">
      <div className="text-xs font-semibold uppercase tracking-wide text-amber-900">Featured Listing (Reserved)</div>
      <div className="mt-2 text-sm leading-relaxed text-gray-700">
        This top slot is reserved for a clearly labeled featured listing in the future. Today, the directory below is ordered by public signals
        like rating, review volume, and listing documentation.
      </div>
    </section>
  );
}

/**
 * Allow runtime resolution for `[slug]` so `getBestBySlug` + `notFound()` control 404s.
 * (With `false`, Next can 404 before the page runs if static params are out of sync.)
 */
export const dynamicParams = true;

export function generateStaticParams() {
  return getBestSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const best = getBestBySlug(slug);
  if (!best) return {};

  const overrides: Record<string, { title?: string; absoluteTitle?: string; description: string }> = {
    "best-plumbers-georgetown-tx": {
      absoluteTitle: "Best Plumbers Georgetown TX (2026) — Verified Local Picks",
      description:
        "The top-rated plumbers in Georgetown TX ranked by reviews, local presence, and service focus. Compare options for leaks, drains, slab repair, and emergency calls.",
    },
    "top-hvac-companies-georgetown-tx": {
      absoluteTitle: "Best HVAC Companies Georgetown TX (2026) — AC & Heating Repair",
      description:
        "Georgetown TX's top-rated HVAC companies compared by response speed, service scope, and local reputation. Picks vetted for Central Texas summer heat.",
    },
    "best-roofers-georgetown-tx": {
      absoluteTitle: "Best Roofers Georgetown TX (2026) — Storm, Repair & Replacement",
      description:
        "Top Georgetown TX roofing contractors ranked by reviews, storm damage experience, and transparency. Includes what to ask before signing any roofing contract.",
    },
    "best-electricians-georgetown-tx": {
      absoluteTitle: "Best Electricians Georgetown TX (2026) — Licensed & Verified",
      description:
        "Top-rated electricians in Georgetown TX for panel upgrades, circuit work, and EV charger installation. Compare by licensing, reviews, and residential specialty.",
    },
    "best-landscaping-companies-georgetown-tx": {
      absoluteTitle: "Best Landscaping Companies Georgetown TX (2026) — Local Picks",
      description:
        "Top Georgetown TX landscaping companies for lawn care, beds, mulch, and irrigation. Ranked by local reviews, service range, and Central Texas experience.",
    },
    "best-pest-control-georgetown-tx": {
      absoluteTitle: "Best Pest Control Georgetown TX (2026) — Ranked & Reviewed",
      description:
        "Georgetown TX's top pest control providers compared for perimeter plans, termite monitoring, and rodent exclusion. Local picks with verified ratings.",
    },
    "best-foundation-repair-georgetown-tx": {
      absoluteTitle: "Best Foundation Repair Georgetown TX (2026) — Clay Soil Experts",
      description:
        "Top foundation repair contractors in Georgetown TX ranked by reviews, engineering credentials, and experience with Williamson County's expansive clay soil.",
    },
    "best-house-cleaning-services-georgetown-tx": {
      absoluteTitle: "Best House Cleaning Services Georgetown TX (2026) — Reviewed",
      description:
        "Georgetown TX's top-rated cleaning services for recurring maid service, deep cleans, and move-out cleans. Compare local picks by ratings and reliability.",
    },
  };

  const o = overrides[slug];
  const description = o?.description ?? best.description;
  if (o?.absoluteTitle) {
    return pageSeoMetadata({
      absoluteTitle: o.absoluteTitle,
      description,
      pathname: `/best/${slug}`,
      ogType: "website",
      noindex: isNoindexSlug(slug),
    });
  }
  const titleSegment = o?.title ?? best.title;
  return pageSeoMetadata({
    titleSegment,
    description,
    pathname: `/best/${slug}`,
    ogType: "website",
    noindex: isNoindexSlug(slug),
  });
}

export default async function BestPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const resolved = resolveBestPage(slug);
  if (!resolved) notFound();
  const best = resolved.record;
  const articleHtml = resolved.html;
  const siteUrl = process.env.SITE_URL ?? "https://www.georgetownhomeservices.com";

  const isPlumbersGeorgetown = slug === "best-plumbers-georgetown-tx";
  const isHvacGeorgetown = slug === "top-hvac-companies-georgetown-tx";
  const isRoofersGeorgetown = slug === "best-roofers-georgetown-tx";

  const providerData = getProvidersForBestSlug(slug);
  const businessCategory = getBusinessCategoryForBestSlug(slug);
  const businessesForPage =
    businessCategory !== null ? getBusinessesByCategory(businessCategory) : null;
  const relatedServiceSlug = getRelatedServiceSlugForBestSlug(slug);
  const relatedService = relatedServiceSlug ? getServiceBySlug(relatedServiceSlug) : null;
  const services = getServices();
  const recommended = best.recommendedServiceSlugs
    .filter((s) => !isRedirectedServiceSlug(s) && !isNoindexSlug(s))
    .map((s) => services.find((x) => x.slug === s))
    .filter((s): s is (typeof services)[number] => Boolean(s));
  const helpfulGuides = getBlogsForBestSlug(best.slug).filter(
    (b) => !isRedirectedBlogSlug(b.slug) && !isNoindexSlug(b.slug),
  );

  const CORE_BEST = (CORE_BEST_SLUGS as readonly string[])
    .map((bestSlug) => {
      const p = getBestBySlug(bestSlug);
      const svc = getRelatedServiceSlugForBestSlug(bestSlug);
      if (!p || !svc) return null;
      return { label: p.title.replace(/ in Georgetown, TX$/, ""), slug: p.slug, service: svc };
    })
    .filter((b): b is { label: string; slug: string; service: string } => Boolean(b));
  const explore = CORE_BEST.filter((b) => b.slug !== best.slug).filter(
    (b) => showExtendedHomeServices() || !isExtendedBestSlug(b.slug),
  );
  const ruleLinks = bestPageInternalLinks(best.slug);
  const hero = CORE_BEST_HERO[best.slug];

  /** FAQPage JSON-LD + visible FAQ (must match). Per Next.js, `next/script` `beforeInteractive` is root-layout-only; `<JsonLd />` emits the same `application/ld+json` as elsewhere. */
  const bestOfPageFaqs = getBestOfPageFaqs(best.slug);

  const editorialMethodology = {
    title: "Methodology and editorial notes",
    points: [
      "We use publicly available business information (ratings, review volume, and listing details) to help you compare options.",
      "We do not schedule work or route service requests. Contact providers directly for availability and written estimates.",
      "Lower-signal providers (for example, few reviews or map-only documentation) are de-emphasized by default.",
    ],
  };

  const coreAlsoCompareSlugs = new Set([
    "best-plumbers-georgetown-tx",
    "top-hvac-companies-georgetown-tx",
    "best-roofers-georgetown-tx",
  ]);

  return (
    <>
    <PageShell>
      <section className="py-10 md:py-12">
          <JsonLd data={breadcrumbJsonLd({ siteUrl, bestTitle: best.title, bestSlug: best.slug })} />
          <JsonLd
            data={webPageWithDateModifiedJsonLd({
              pathname: `/best/${best.slug}`,
              name: best.title,
              description: best.description,
            })}
          />
          {bestOfPageFaqs.length ? (
            <JsonLd data={faqJsonLd(bestOfPageFaqs)} />
          ) : null}
          {businessesForPage?.length ? (
            <JsonLd
              data={buildBestDirectoryItemListJsonLd(
                best.title,
                getDefaultBestDirectoryListing(businessesForPage),
              )}
            />
          ) : null}
          <TwoColumnPage
            main={
              <div className="min-w-0">
              <Breadcrumbs
                items={[
                  { href: "/", label: "Home" },
                  { href: "/best", label: "Best Of" },
                  { href: `/best/${best.slug}`, label: best.title },
                ]}
              />
              <div className="text-sm font-semibold uppercase tracking-wide text-primary">Best Of</div>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">{best.h1}</h1>
              <p className={SERVICE_BEST_LAST_UPDATED_LINE_CLASS}>Last updated: {SERVICE_BEST_LAST_UPDATED_DISPLAY}</p>
              {hero ? (
                <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                  <Image
                    src={hero.src}
                    alt={hero.alt}
                    width={1200}
                    height={400}
                    loading="lazy"
                    className="h-auto w-full"
                  />
                </div>
              ) : null}
              {isPlumbersGeorgetown ? (
                <>
                  <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-700">
                    If you own a home in Georgetown, TX, you do not think about plumbers when everything is working—you
                    think about them when a toilet overflows, a slab leak shows up as a hot spot on the floor, or a
                    main line backs up right before company arrives. This guide is written for Georgetown homeowners who
                    want to choose a plumber with clear eyes: someone who understands local neighborhoods, explains
                    options without pressure, and shows up when the problem cannot wait until next week.
                  </p>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-700">
                    We continuously update our rankings based on customer reviews, service availability, and verified
                    local presence in Georgetown and surrounding areas.
                  </p>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                    <span className="font-semibold text-gray-900">Last updated:</span> {BUSINESS_LISTINGS_LAST_UPDATED} using publicly available provider data.
                  </p>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-700">
                    We update this list regularly based on verified reviews and service availability in Georgetown.
                  </p>
                  <p className="mt-1 max-w-2xl text-sm leading-relaxed text-gray-700">
                    This matters more than most people realize.
                  </p>
                </>
              ) : isHvacGeorgetown ? (
                <>
                  <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-700">
                    Summers in Georgetown, TX come with long stretches of heat and humidity, which makes a reliable HVAC
                    company nearly as important as the equipment itself. This guide highlights local providers that keep
                    Georgetown homes livable when systems struggle on 100° days, from emergency AC repairs to full
                    replacements and maintenance plans sized for Central Texas weather.
                  </p>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                    <span className="font-semibold text-gray-900">Last updated:</span> {BUSINESS_LISTINGS_LAST_UPDATED} using publicly available provider data.
                  </p>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-700">
                    We update this page regularly based on verified reviews and service availability in Georgetown.
                  </p>
                </>
              ) : isRoofersGeorgetown ? (
                <>
                  <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-700">
                    Georgetown, TX roofs take a beating from heat, UV exposure, spring hail, and sudden downpours that
                    show you exactly where flashing, vents, and valleys were installed well (or not). A “good roofer” in
                    this area is not just someone who can nail down shingles—it is a company that can diagnose the real
                    failure point, document what they found, and explain whether you need a targeted repair, storm
                    restoration help, or a full replacement.
                  </p>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                    If you want the fundamentals before you compare companies, start with{" "}
                    <Link href="/services/roofer-georgetown-tx" className="font-semibold text-primary">
                      our roofing guide for Georgetown, TX
                    </Link>
                    . This page focuses on helping you compare real roofing companies serving Georgetown—especially for
                    leak repairs, wind/hail damage, and replacement planning.
                  </p>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                    <span className="font-semibold text-gray-900">Last updated:</span> {BUSINESS_LISTINGS_LAST_UPDATED} using publicly available provider data.
                  </p>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-700">
                    We update this page regularly based on verified reviews and service availability in Georgetown.
                  </p>
                </>
              ) : (
                <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-700">{best.description}</p>
              )}

              <div className="mt-8">
                {isPlumbersGeorgetown ? (
                  <div className="space-y-10 text-gray-800">
                    <section>
                      <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
                        How to compare plumbers in Georgetown
                      </h2>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                        The plumbers listed below are based in, or clearly serve, Georgetown, TX and the immediate
                        surrounding area. They show up in public data with real addresses or service areas tied to
                        Georgetown, publish working phone numbers and websites, and have visible customer feedback on
                        responsiveness and communication. This section explains how we treat “top rated” as more than a
                        single star number.
                      </p>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                        We start from public ratings and review counts, then look at whether the company appears to do
                        steady day-in, day-out plumbing work—not just one or two categories. From there, it is up to
                        you to confirm licensing, insurance, current pricing, and fit for your specific job. If you
                        prefer to start with the basics, read{" "}
                        <Link href="/services/plumber-georgetown-tx" className="font-semibold text-primary">
                          our plumbing guide for Georgetown, TX
                        </Link>
                        .
                      </p>
                      <div className="mt-5 rounded-xl border border-gray-200 bg-white p-4 text-sm text-gray-700 shadow-sm">
                        <div className="font-semibold text-gray-900">Quick takeaways for Georgetown homeowners</div>
                        <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
                          <li>
                            A plumber’s <span className="font-semibold text-gray-900">diagnosis process</span> matters
                            more than their sales pitch—especially for recurring clogs and leak tracing.
                          </li>
                          <li>
                            In Georgetown, <span className="font-semibold text-gray-900">slab foundations</span> and
                            hard water make shutoffs, cartridges, and water heaters fail in predictable ways.
                          </li>
                          <li>
                            When water is actively damaging your home, the right question is often{" "}
                            <span className="font-semibold text-gray-900">“How do we stop damage safely first?”</span>{" "}
                            and then “What is the permanent fix?”
                          </li>
                        </ul>
                      </div>
                    </section>

                    <section>
                      <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
                        How We Selected These Companies
                      </h2>
                      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-gray-700">
                        <li>
                          <span className="font-semibold text-gray-900">Local presence:</span> the business address,
                          map pin, or stated service area includes Georgetown, TX or nearby communities where Georgetown
                          homeowners commonly live and work.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Public ratings data:</span> we reference star
                          ratings and review counts where available from public business listings to sort and compare
                          companies by track record.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Service focus:</span> the company describes core
                          plumbing work—leaks, drains, water heaters, repipes, and emergency calls—rather than only
                          selling equipment or doing unrelated trades.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Reachability:</span> working phone numbers,
                          websites, or maps listings that make it realistic for a Georgetown homeowner to reach the
                          company quickly when something fails.
                        </li>
                      </ul>
                      <p className="mt-3 text-sm leading-relaxed text-gray-700">
                        We rely strictly on publicly available information. Listings here are not endorsements or
                        guarantees. Before you hire anyone, verify current licensing, insurance, availability, and
                        pricing directly with the company.
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-gray-700">
                        “Local” in practice means the company can actually service Georgetown neighborhoods such as Sun
                        City, Berry Creek, Wolf Ranch, and areas closer to the Square without treating it as an
                        afterthought. Availability is part of quality: a great plumber who cannot schedule you for two
                        weeks is not helpful when you have a leaking shutoff or a main line backing up.
                      </p>
                    </section>

                    <section>
                      <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
                        What to Look for in a Plumber
                      </h2>
                      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-gray-700">
                        <li>
                          <span className="font-semibold text-gray-900">Texas license and insurance:</span> confirm the
                          plumber holds an active state license and carries appropriate liability coverage. This matters
                          for any work that touches water heaters, gas lines, or major piping.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Clear diagnosis and options:</span> a good
                          plumber explains what they think is happening, how they will confirm it, and what your repair
                          and replacement paths look like—in plain language.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Written estimates:</span> ask how pricing works
                          (flat-rate vs time-and-materials) and request a written scope before larger jobs start so
                          there are no surprises.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Local experience:</span> Georgetown homes sit on
                          slabs, see hard water, and often have irrigation tie-ins. Look for companies that sound
                          comfortable with slab leaks, main-line work, and water heater issues common in the area.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Communication and follow-through:</span> notice
                          how quickly they respond, whether they keep appointment windows, and how clearly they explain
                          what was done and what to watch for next.
                        </li>
                      </ul>
                      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="rounded-xl border border-gray-200 bg-white p-4 text-sm text-gray-700 shadow-sm">
                          <div className="font-semibold text-gray-900">What “good diagnosis” looks like</div>
                          <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
                            <li>
                              For drains: “Is it one fixture or multiple?” and “Does it worsen after laundry or
                              showers?”
                            </li>
                            <li>
                              For leaks: confirming the source (supply vs drain) instead of assuming the nearest wet
                              spot is the cause.
                            </li>
                            <li>
                              For slab leaks: explaining how they will locate the leak and what repair options exist
                              (not just “we’ll break concrete”).
                            </li>
                          </ul>
                        </div>
                        <div className="rounded-xl border border-gray-200 bg-white p-4 text-sm text-gray-700 shadow-sm">
                          <div className="font-semibold text-gray-900">Georgetown-specific realities</div>
                          <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
                            <li>
                              <span className="font-semibold text-gray-900">Hard water:</span> faster wear on cartridges
                              and valves; periodic maintenance can prevent “mystery drips.”
                            </li>
                            <li>
                              <span className="font-semibold text-gray-900">Slabs:</span> leaks are often hidden; early
                              signs matter (hot spots, sound of water, bill spikes).
                            </li>
                            <li>
                              <span className="font-semibold text-gray-900">Irrigation tie-ins:</span> yard leaks can
                              mimic main line issues; good plumbers isolate before digging.
                            </li>
                          </ul>
                        </div>
                      </div>
                    </section>

                    <section>
                      <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
                        Average Plumbing Costs in Georgetown TX
                      </h2>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                        No two jobs are identical, and every company has its own pricing structure, but homeowners in
                        and around Georgetown, TX tend to see similar patterns. Think in ranges rather than a single
                        number and always get a written estimate for your exact project.
                      </p>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                        Two notes that matter locally: first, after-hours and weekend calls can change the base service
                        fee; second, repairs that involve drywall, flooring, or concrete often have a plumbing cost and a
                        separate restoration cost. Ask which parts of the job the plumber is responsible for and what
                        will be handled by other trades.
                      </p>
                      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-gray-700">
                        <li>
                          <span className="font-semibold text-gray-900">Standard service call:</span> many plumbers
                          charge a diagnostic or service-call fee in the low-to-mid hundreds of dollars, sometimes
                          credited toward approved repairs on the same visit.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Minor repairs:</span> addressing a leaking
                          shutoff, replacing a supply line, swapping a trap, or clearing a straightforward clog
                          typically lands in the lower hundreds depending on access, parts, and scheduling.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Water heater replacements:</span> full tank or
                          tankless replacements are commonly quoted in the many-thousands once you include equipment,
                          labor, haul-away, and any code-related adjustments.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Sewer and drain work:</span> cabling or jetting
                          a main line is often a few hundred dollars; camera inspections, spot repairs, or more
                          extensive sewer work are significantly higher and depend on layout and access.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Slab leaks and repipes:</span> locating and
                          repairing leaks under a slab, or replacing larger sections of pipe, can run into the
                          many-thousands once you account for plumbing, restoration, and finish work.
                        </li>
                      </ul>
                        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                          For deeper cost context on specific problems, you can also read focused articles such as our{" "}
                          <Link
                            href="/blog/emergency-plumber-cost-georgetown-tx"
                            className="font-semibold text-primary"
                          >
                            emergency plumber cost guide for Georgetown
                          </Link>
                          . For a step-by-step hiring checklist, see{" "}
                          <Link
                            href="/blog/how-to-choose-a-reliable-plumber-georgetown-tx"
                            className="font-semibold text-primary"
                          >
                            how to choose a reliable plumber in Georgetown TX
                          </Link>
                          . If you are planning broader system work, you may also find it helpful to compare{" "}
                          <Link
                            href="/best/top-hvac-companies-georgetown-tx"
                            className="font-semibold text-primary"
                          >
                            top HVAC companies in Georgetown
                          </Link>{" "}
                          and{" "}
                          <Link href="/best/best-roofers-georgetown-tx" className="font-semibold text-primary">
                            leading roofers in Georgetown
                          </Link>
                          .
                        </p>
                    </section>

                    <section>
                      <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
                        Emergency Plumbing Services in Georgetown
                      </h2>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                        Not every plumbing issue is an emergency, but some clearly are. In Georgetown, TX, the main
                        triggers for true emergency service are active water damage, sewage backing up into fixtures, or
                        safety concerns around gas and water heaters.
                      </p>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                        If you have active leaking right now, stop the damage first: shut off the nearest fixture valve
                        if it works, then the main shutoff if it does not. If you are unsure where the main shutoff is,
                        take a minute to locate it on a calm day—Georgetown emergencies are easier when you are not
                        hunting for a valve while water spreads across flooring.
                      </p>
                      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-gray-700">
                        <li>
                          <span className="font-semibold text-gray-900">Active leaks you cannot contain:</span> water
                          coming through ceilings, soaking floors, or flowing from a burst line where shutoffs are not
                          working should be addressed quickly.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Sewer and main-line backups:</span> multiple
                          fixtures backing up at once, or wastewater returning through tubs and floor drains, calls for
                          prompt professional help.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">No water to the home:</span> a main break or
                          failed shutoff that leaves you without water is usually treated as urgent.
                        </li>
                      </ul>
                      <div className="mt-5 rounded-xl border border-gray-200 bg-white p-4 text-sm text-gray-700 shadow-sm">
                        <div className="font-semibold text-gray-900">What to ask on an emergency call</div>
                        <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
                          <li>Is this visit for stabilization, a permanent repair, or both?</li>
                          <li>Is there an after-hours fee or minimum service charge?</li>
                          <li>Will you document findings (photos/video) for insurance or landlord records?</li>
                          <li>What should we avoid using until the repair is complete (toilets, laundry, dishwasher)?</li>
                        </ul>
                      </div>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                        If you are facing that kind of issue, start by shutting off water if you can do so safely, then
                        contact a plumber who clearly describes how they handle after-hours or emergency calls. For
                        perspective on what that visit might cost, refer to the emergency pricing guide mentioned above,
                        and use it alongside quotes from the companies listed on this page.
                      </p>
                    </section>

                  </div>
                ) : isHvacGeorgetown ? (
                  <div className="space-y-10 text-gray-800">
                    <section>
                      <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
                        How to compare HVAC companies in Georgetown
                      </h2>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                        Georgetown homeowners rely on HVAC more than most people realize. From May through September,
                        Central Texas heat can push systems to run long hours, and small issues (weak airflow, a
                        struggling outdoor unit, a clogged drain line) can turn into a no-cool call fast. In winter,
                        short cold snaps expose maintenance gaps just as quickly—especially in homes where the heater
                        sits idle for weeks at a time.
                      </p>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                        Georgetown also has a mix of home types that change what “good HVAC” looks like in practice:
                        two-story layouts with hot upstairs rooms, newer open floorplans that need balanced airflow, and
                        older homes where insulation, returns, and duct paths may not match modern comfort expectations.
                        The best HVAC companies do not jump straight to replacement—they explain what they observed, what
                        the fix accomplishes, and what you should monitor afterward.
                      </p>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                        This page is built to help you compare <strong>real HVAC companies serving Georgetown, TX</strong>
                        using practical criteria: reachability, evidence of actual residential heating/cooling work,
                        transparent service offerings, and the ability to explain options without pressure. If you want
                        the fundamentals before you compare companies, start with{" "}
                        <Link href="/services/hvac-georgetown-tx" className="font-semibold text-primary">
                          our HVAC guide for Georgetown, TX
                        </Link>
                        .
                      </p>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                        If you’re troubleshooting a no-cool situation, read{" "}
                        <Link href="/blog/why-your-ac-is-not-cooling-georgetown-tx" className="font-semibold text-primary">
                          why your AC is not cooling in Georgetown TX
                        </Link>
                        . For pricing expectations, see{" "}
                        <Link href="/blog/ac-repair-cost-georgetown-tx" className="font-semibold text-primary">
                          AC repair cost in Georgetown TX
                        </Link>
                        . For early warning signs, review{" "}
                        <Link href="/blog/signs-you-need-hvac-repair-georgetown-tx" className="font-semibold text-primary">
                          signs you need HVAC repair
                        </Link>
                        .
                      </p>
                      <div className="mt-5 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                        <div className="text-sm font-semibold text-gray-900">Quick takeaways for Georgetown homeowners</div>
                        <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-gray-700">
                          <li>
                            If the AC is running but the house is warming up, describe the symptom clearly (no-cool vs
                            weak airflow vs certain rooms hot) and ask what they will check first.
                          </li>
                          <li>
                            For replacements, insist on written equipment model numbers and a scope that mentions airflow
                            and ductwork, not just “new unit.”
                          </li>
                          <li>
                            If schedules are full, good companies still give you triage steps and realistic ETAs—watch
                            for clear communication, not vague promises.
                          </li>
                        </ul>
                      </div>
                    </section>

                    <section>
                      <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
                        How We Evaluated Providers
                      </h2>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                        Ratings alone are not enough. Georgetown has a mix of older neighborhoods near the Square and
                        fast-growing areas with newer construction, and the “right” HVAC provider depends on whether
                        you need diagnostics, comfort improvements, or replacement planning. We use the criteria below
                        to filter for companies that appear equipped to serve real homeowners, not just generate leads.
                      </p>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                        In other words: we prioritize companies that look reachable, service-focused, and specific about
                        HVAC work. For your final decision, you should still confirm the details that matter most for
                        your home: licensing/insurance, warranty terms, whether a permit is required for certain work,
                        and whether the quote includes any needed duct or electrical corrections.
                      </p>
                      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-gray-700">
                        <li>
                          <span className="font-semibold text-gray-900">Local service footprint:</span> a Georgetown,
                          TX address, service area, or marketing that explicitly includes Georgetown or nearby
                          corridors.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Public ratings and reviews:</span> star ratings
                          and review counts where available from public business listings, used for relative ranking
                          only.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Documented HVAC work:</span> clear mention of AC
                          and heating repair, maintenance, or installation—not just generic home services.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Reachability:</span> working phone numbers,
                          websites, or map listings so Georgetown homeowners can actually book service.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Clarity of scope:</span> providers that describe
                          what a visit includes (diagnosis first, options second) rather than pushing replacement by
                          default.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Fit for Texas heat:</span> evidence they handle
                          the common Central Texas realities: peak-load no-cool calls, airflow imbalance in two-story
                          homes, and drain/condensate issues that show up in humid stretches.
                        </li>
                      </ul>
                      <p className="mt-3 text-sm leading-relaxed text-gray-700">
                        We rely solely on publicly available information and do not receive compensation for
                        placement. Always confirm current licensing, insurance, pricing, and availability directly with
                        any HVAC company before hiring.
                      </p>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                        A practical way to compare two providers is to ask both for the same thing: a written scope that
                        includes what they will diagnose, what they will replace, and what the warranty covers. Clarity
                        now usually means fewer surprises later.
                      </p>
                    </section>

                    <section>
                      <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
                        Common HVAC Services in Georgetown
                      </h2>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                        Most Georgetown, TX HVAC calls fall into three buckets: restore cooling/heating quickly,
                        stabilize comfort across rooms, or plan a replacement that actually fits the home. Here are the
                        most common service categories and what they typically include.
                      </p>
                      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-gray-700">
                        <li>
                          <span className="font-semibold text-gray-900">AC repair and diagnostics:</span> capacitors,
                          contactors, refrigerant issues, sensor problems, and thermostat troubleshooting when the house
                          will not cool.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Preventive maintenance:</span> seasonal tune-ups
                          that include coil cleaning, filter changes, basic electrical checks, and drain line checks to
                          reduce mid-summer breakdowns.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">System replacement:</span> swapping out older
                          equipment for newer, more efficient systems sized for Georgetown’s mix of heat, humidity, and
                          winter cold snaps.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Duct and airflow work:</span> correcting
                          comfort issues between floors, sealing or modifying duct runs, and addressing hot rooms that
                          never quite cool down.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Indoor air quality add-ons:</span> filtration
                          upgrades, dehumidification, and other accessories installed alongside existing HVAC systems.
                        </li>
                      </ul>
                      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                          <div className="text-sm font-semibold text-gray-900">AC repair (no-cool / weak airflow)</div>
                          <p className="mt-2 text-sm leading-relaxed text-gray-700">
                            Best providers start with a diagnosis you can follow: what they measured, what failed, and
                            what would happen if you do nothing. If your issue is comfort-related (one room always
                            hotter), ask whether airflow balancing or duct fixes are part of the plan.
                          </p>
                          <p className="mt-2 text-sm leading-relaxed text-gray-700">
                            In Georgetown summers, it is common for failures to show up during peak afternoon load. A
                            good company will ask about timing (only hottest hours vs all day), thermostat behavior, and
                            whether airflow feels weak at multiple vents.
                          </p>
                        </div>
                        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                          <div className="text-sm font-semibold text-gray-900">Installation / replacement</div>
                          <p className="mt-2 text-sm leading-relaxed text-gray-700">
                            Replacement is a project, not a product. Compare written scopes that include equipment
                            model numbers, efficiency ratings, warranty terms, and any ductwork or electrical items
                            included. If a quote is vague, it is hard to compare fairly.
                          </p>
                          <p className="mt-2 text-sm leading-relaxed text-gray-700">
                            If you are replacing because of comfort (hot rooms, humidity, noisy operation), ask how the
                            new plan addresses airflow and return placement. New equipment without airflow fixes often
                            leaves the original comfort problem intact.
                          </p>
                        </div>
                      </div>
                      <div className="mt-5 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                        <div className="text-sm font-semibold text-gray-900">Maintenance (what a useful tune-up includes)</div>
                        <p className="mt-2 text-sm leading-relaxed text-gray-700">
                          “Maintenance” should produce something measurable: improved reliability, better comfort, or
                          fewer emergency calls. For Georgetown homeowners, a useful maintenance visit typically includes
                          coil and drain checks, basic electrical inspection, filter guidance, and a short summary of
                          anything you should watch over the next 30–60 days.
                        </p>
                      </div>
                    </section>

                    <section>
                      <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
                        Typical HVAC Costs in Georgetown TX
                      </h2>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                        Actual pricing in Georgetown, TX depends on the brand, size, and age of your equipment, access
                        to the unit, and when you schedule service. The ranges below are based on common scenarios
                        reported in Central Texas; always ask for a written quote for your specific system.
                      </p>
                      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-gray-700">
                        <li>
                          <span className="font-semibold text-gray-900">Service call and basic diagnosis:</span> often a
                          fee in the low-to-mid hundreds, which may be applied to approved repairs on the same visit.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Typical repairs:</span> components like
                          capacitors, contactors, or simple drain line clears can fall in the lower hundreds, depending
                          on parts and access.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Major repairs:</span> compressor issues, coil
                          replacements, or extensive refrigerant problems are significantly more and can approach or
                          exceed the cost of replacement on older systems.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Full system replacement:</span> replacing both
                          indoor and outdoor units, especially with higher-efficiency equipment, is commonly quoted in
                          the many-thousands depending on tonnage and scope of duct work.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Maintenance plans:</span> annual or biannual
                          maintenance memberships are usually priced to cover one or two tune-ups per year at a modest
                          discount compared to one-off visits.
                        </li>
                      </ul>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                        Two pricing details that trip up Georgetown homeowners: after-hours minimums (which can change
                        the base fee) and “scope gaps” (for example, an HVAC quote that excludes ductwork, electrical
                        corrections, or thermostat changes). When comparing bids, confirm what is included and what is
                        explicitly excluded.
                      </p>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                        If you are specifically researching replacement budgets, see{" "}
                        <Link href="/blog/cost-to-replace-hvac-georgetown" className="font-semibold text-primary">
                          cost to replace HVAC in Georgetown, TX
                        </Link>{" "}
                        for a breakdown of the major pricing drivers.
                      </p>
                    </section>

                    <section>
                      <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
                        Emergency HVAC Service in Georgetown
                      </h2>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                        In Georgetown, “emergency HVAC” usually means one of two things: <strong>no cooling during peak
                        heat</strong> or a system doing something that makes you uncomfortable running it (repeated
                        failed starts, tripping breakers, or unusual burning smell). When schedules are full, good
                        companies still give you clear triage guidance and realistic ETAs.
                      </p>
                      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-gray-700">
                        <li>
                          <span className="font-semibold text-gray-900">Before you call:</span> replace an overdue
                          filter, confirm breakers are not tripped, and note thermostat behavior (error codes, short
                          cycling, warm air).
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">What to say on the phone:</span> describe the
                          symptom clearly (no cool vs weak airflow vs uneven rooms) and whether vulnerable occupants are
                          in the home.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">What to avoid:</span> do not open sealed system
                          components or attempt refrigerant work. If you smell burning or see smoke, shut the system off
                          and request urgent service.
                        </li>
                      </ul>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                        If you need a same-day option, it helps to be specific: “system runs but blows warm,” “outdoor
                        unit not spinning,” “thermostat shows error code,” or “water near the indoor unit.” Those details
                        help the company schedule the right type of visit and reduce wasted time on arrival.
                      </p>
                    </section>

                  </div>
                ) : isRoofersGeorgetown ? (
                  <div className="space-y-10 text-gray-800">
                    <section>
                      <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
                        How to compare roofers in Georgetown
                      </h2>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                        The roofers listed below are based in, or clearly serve, Georgetown, TX and nearby communities.
                        “Top” on this page is not a marketing claim—it is a practical filter using public business data
                        (ratings, review counts, reachability, and published websites/phones) plus the signals that matter
                        for roofing work: clear service scope, realistic timelines, and documentation.
                      </p>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                        Roof problems often show up at the worst moment: a slow leak that finally stains a ceiling after a
                        heavy rain, hail damage you did not notice until an inspection, or shingles that start lifting in
                        wind. A strong roofing company explains what is urgent (stop active water intrusion) versus what
                        can be planned (replacement, upgrades, ventilation improvements), and they put the scope in
                        writing so you can compare apples-to-apples.
                      </p>
                      <div className="mt-5 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                        <div className="text-sm font-semibold text-gray-900">Quick takeaways for Georgetown homeowners</div>
                        <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-gray-700">
                          <li>
                            A leak is rarely “just a shingle.” In Georgetown storms, failures often involve flashing,
                            pipe boots, valleys, skylights, or roof-to-wall transitions.
                          </li>
                          <li>
                            Documentation matters: photos, a written scope, and clear exclusions reduce disputes and make
                            insurance conversations easier after wind or hail.
                          </li>
                          <li>
                            If a bid jumps straight to full replacement without explaining the failure point, slow down
                            and ask for the specific reason replacement is necessary.
                          </li>
                        </ul>
                      </div>
                    </section>

                    <section>
                      <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
                        How We Evaluated Roofing Companies
                      </h2>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                        Roofing is one of the highest-stakes home projects because the roof protects every other system in
                        the house. We use a simple approach: start with publicly available business data, then prioritize
                        roofing-specific signals that reduce the odds of a bad experience—unreachable companies, vague
                        scopes, and “price-only” quotes that ignore ventilation, decking condition, and flashing details.
                      </p>
                      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-gray-700">
                        <li>
                          <span className="font-semibold text-gray-900">Local service footprint:</span> Georgetown, TX is
                          explicitly served (address, service area, or reliable local presence).
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Reachability:</span> working phone numbers and
                          websites that make it realistic to get answers quickly when you have active leaking or storm
                          damage.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Public ratings and reviews:</span> star ratings
                          and review counts where available are used for comparison, not as guarantees.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Service clarity:</span> the company describes
                          roofing work (repairs, replacement, storm restoration, inspections) rather than unrelated trades
                          with a “roofing” page tacked on.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Professional process:</span> signs of a real
                          roofing process such as inspections, photos, written scopes, and warranty language you can
                          review before signing.
                        </li>
                      </ul>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                        We rely strictly on public information. Listings on this page are not endorsements. Before you
                        hire anyone, verify current insurance coverage, warranty terms, permit requirements (if any), and
                        the exact scope of work for your roof.
                      </p>
                    </section>

                    <section>
                      <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
                        Common Roofing Services in Georgetown
                      </h2>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                        Georgetown roofs fail in predictable ways. Summer heat accelerates aging, wind lifts edges, and
                        hail can bruise shingles or damage vents and caps. The services below cover what most homeowners
                        actually need—especially after storms or when a leak appears.
                      </p>
                      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-gray-700">
                        <li>
                          <span className="font-semibold text-gray-900">Leak diagnosis and roof repair:</span> tracing the
                          entry point and repairing shingles, flashing, valleys, vents, pipe boots, chimney transitions,
                          and penetrations.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Storm inspection and documentation:</span> post
                          wind/hail inspections with photos and a written summary you can use for planning or insurance.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Roof replacement:</span> tear-off, underlayment,
                          flashing, ventilation, drip edge, and new roofing materials installed to manufacturer specs.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Ventilation and attic heat management:</span>
                          adjustments to intake/exhaust ventilation to reduce trapped heat that shortens shingle life and
                          stresses HVAC performance.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Gutter and drainage coordination:</span> repairing
                          or replacing gutters and downspouts where water management contributes to fascia/edge damage.
                        </li>
                      </ul>
                      <div className="mt-5 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                        <div className="text-sm font-semibold text-gray-900">What to ask during a roof inspection</div>
                        <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-gray-700">
                          <li>Where is the leak entering, and how do you know?</li>
                          <li>Is the damage isolated, or are there multiple failure points?</li>
                          <li>What parts will be replaced (flashing/boots/underlayment), not just “shingles”?</li>
                          <li>Can you provide photos and a written scope before I commit?</li>
                        </ul>
                      </div>
                    </section>

                    <section>
                      <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
                        Roof Repair vs Roof Replacement
                      </h2>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                        The decision is usually about <strong>scope</strong> and <strong>risk</strong>. A good repair is
                        targeted, documented, and addresses the real failure point. Replacement is appropriate when the
                        roof is near end-of-life, has widespread damage, or when repeated repairs are turning into a
                        pattern.
                      </p>
                      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                          <div className="text-sm font-semibold text-gray-900">When repair often makes sense</div>
                          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-gray-700">
                            <li>Leak traced to a specific flashing/boot/valley issue</li>
                            <li>Wind lifted a small section but the field shingles are sound</li>
                            <li>Limited hail damage with minimal granule loss and no widespread bruising</li>
                            <li>Roof is otherwise in good condition and not near end-of-life</li>
                          </ul>
                        </div>
                        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                          <div className="text-sm font-semibold text-gray-900">When replacement is often smarter</div>
                          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-gray-700">
                            <li>Multiple leaks or recurring repairs across seasons</li>
                            <li>Widespread hail/wind damage or brittle shingles throughout</li>
                            <li>Underlayment/decking issues discovered during inspection</li>
                            <li>You need an integrated plan for ventilation, flashing, and edge details</li>
                          </ul>
                        </div>
                      </div>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                        The most expensive mistake is replacing a roof that could have been repaired—or repairing a roof
                        that is already failing broadly. Ask for photos, ask for the specific failure point, and ask what
                        will happen if you choose repair now (expected life, risk of recurrence, and what to watch for).
                      </p>
                    </section>

                    <section>
                      <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
                        Typical Roofing Costs in Georgetown TX
                      </h2>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                        Roofing prices vary widely because every roof is different: pitch, height, material, number of
                        penetrations, decking condition, and how much of the job is repair versus full replacement. Use
                        the ranges below as budgeting guidance, then get a written estimate for your specific home.
                      </p>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                        In Georgetown, two cost drivers show up repeatedly: <strong>storm volume</strong> (high demand can
                        tighten schedules) and <strong>scope details</strong> (flashing/vents/ventilation/decking). A bid
                        that looks “cheap” may be missing critical components that matter long-term.
                      </p>
                      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-gray-700">
                        <li>
                          <span className="font-semibold text-gray-900">Roof inspection / diagnostic visit:</span> often
                          free for estimates, or a modest fee if it includes detailed leak tracing or documentation.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Small roof repairs:</span> many common repairs
                          land in the low-to-mid hundreds, depending on access, steepness, and materials.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Flashing/vent/boot repairs:</span> typically
                          several hundred dollars when replacement of components is required.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Storm-related repairs:</span> can range from a few
                          hundred to a few thousand depending on how widespread the damage is.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Full roof replacement:</span> commonly lands in
                          the many-thousands, and can go much higher for large roofs, steep pitches, premium materials,
                          or significant decking/ventilation work.
                        </li>
                      </ul>
                      <div className="mt-5 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                        <div className="text-sm font-semibold text-gray-900">How to compare quotes cleanly</div>
                        <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-gray-700">
                          <li>Confirm material type, brand/model, and underlayment details in writing</li>
                          <li>Ask about flashing, drip edge, vents, and pipe boots (include vs exclude)</li>
                          <li>Ask who handles decking replacement if it’s discovered during tear-off</li>
                          <li>Review warranty terms (workmanship + manufacturer)</li>
                        </ul>
                      </div>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                        For Georgetown-specific planning, you can also start with{" "}
                        <Link href="/services/roofer-georgetown-tx" className="font-semibold text-primary">
                          roofing service in Georgetown, TX
                        </Link>{" "}
                        or read our guides on{" "}
                        <Link href="/blog/roof-repair-cost-georgetown-tx" className="font-semibold text-primary">
                          roof repair cost in Georgetown
                        </Link>{" "}
                        and{" "}
                        <Link href="/blog/signs-you-may-need-a-new-roof-georgetown-tx" className="font-semibold text-primary">
                          signs you may need a new roof
                        </Link>
                        .
                      </p>
                    </section>

                  </div>
                ) : articleHtml ? (
                  <GeneratedArticleBody html={articleHtml} />
                ) : (
                  <RichText blocks={best.content} />
                )}
              </div>

              {providerData ? (
                <section className="mt-12">
                  <h2 className="text-3xl font-semibold tracking-tight text-gray-900">Top provider cards</h2>

                  {businessesForPage !== null ? (
                    <>
                      <section className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-6 shadow-md">
                        <div className="text-xs font-semibold uppercase tracking-wide text-gray-600">Intro and methodology</div>
                        <h3 className="mt-2 text-lg font-semibold text-gray-900">{editorialMethodology.title}</h3>
                        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-gray-700">
                          {editorialMethodology.points.map((p) => (
                            <li key={p}>{p}</li>
                          ))}
                        </ul>
                        <p className="mt-3 text-sm text-gray-700">
                          Read more:{" "}
                          <Link href="/methodology" className="font-semibold text-primary hover:underline">
                            How we review and rank providers
                          </Link>
                          .
                        </p>
                      </section>

                      <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                          <div className="text-xs font-semibold uppercase tracking-wide text-gray-600">Who this page is for</div>
                          <p className="mt-2 text-sm leading-relaxed text-gray-700">
                            Georgetown homeowners who want to shortlist providers quickly and compare written scopes without guessing.
                          </p>
                        </div>
                        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                          <div className="text-xs font-semibold uppercase tracking-wide text-gray-600">How to compare options</div>
                          <p className="mt-2 text-sm leading-relaxed text-gray-700">
                            Compare scope clarity, documentation, responsiveness, and total cost drivers—not just the star rating.
                          </p>
                        </div>
                      </section>

                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                        These listings are compiled from publicly available local business information (for example, names, ratings, review counts,
                        and addresses or official websites where published online). They are provided for research and comparison—confirm details
                        directly with any company before hiring.
                      </p>
                      <p className="mt-2 text-sm text-gray-600">
                        Last updated {BUSINESS_LISTINGS_LAST_UPDATED} using publicly available provider data ({businessesForPage.length.toLocaleString()} providers in this category).
                      </p>
                      {best.featuredPartner ? <FeaturedPartnerCard partner={best.featuredPartner} /> : <FeaturedListingReservedSlot />}
                      <div className="mt-3 space-y-1 text-sm text-gray-700">
                        <p>
                          <Link href="/" className="font-semibold text-primary hover:text-primary-hover">
                            Home
                          </Link>
                          {relatedServiceSlug ? (
                            <>
                              {" "}
                              ·{" "}
                              <Link
                                href={`/services/${relatedServiceSlug}`}
                                className="font-semibold text-primary hover:text-primary-hover"
                              >
                                {relatedService?.title ?? "Related service"}
                              </Link>
                            </>
                          ) : null}
                        </p>
                        {isPlumbersGeorgetown ? (
                          <p>
                            Looking for a step-by-step checklist? Read{" "}
                            <Link href="/blog/how-to-choose-a-reliable-plumber-georgetown-tx" className="font-semibold text-primary hover:text-primary-hover">
                              how to choose a reliable plumber in Georgetown
                            </Link>
                            .
                          </p>
                        ) : null}
                        {isHvacGeorgetown ? (
                          <p>
                            If you are planning ahead on equipment, see{" "}
                            <Link
                              href="/blog/cost-to-replace-hvac-georgetown"
                              className="font-semibold text-primary hover:text-primary-hover"
                            >
                              typical costs to replace HVAC in Georgetown
                            </Link>
                            .
                          </p>
                        ) : null}
                        {isRoofersGeorgetown ? (
                          <p>
                            Prefer the fundamentals before you compare companies? Start with{" "}
                            <Link href="/services/roofer-georgetown-tx" className="font-semibold text-primary hover:text-primary-hover">
                              our roofing guide for Georgetown, TX
                            </Link>
                            .
                          </p>
                        ) : null}
                      </div>
                      <div className="mt-4">
                        <BestProvidersMethodologyCallout />
                      </div>
                      <div id="providers" className="scroll-mt-24">
                        <BestBusinessesDirectory
                          businesses={businessesForPage}
                          guideHref={relatedServiceSlug ? `/services/${relatedServiceSlug}` : null}
                          guideLabel={
                            relatedServiceSlug
                              ? isPlumbersGeorgetown
                                ? "Read our plumbing guide"
                                : isHvacGeorgetown
                                ? "Read our HVAC guide"
                                : isRoofersGeorgetown
                                ? "Read our roofing guide"
                                : "Read our service guide"
                              : "Read our guide"
                          }
                        />
                      </div>

                      {adsenseBestOfSlot ? (
                        <div className="mt-10 max-w-4xl">
                          <AdSenseDisplay slot={adsenseBestOfSlot} />
                        </div>
                      ) : null}

                      <BestOfFaqSection faqs={bestOfPageFaqs} />

                      <section className="mt-10 rounded-xl border border-gray-200 bg-white p-6 shadow-md">
                        <h3 className="text-xl font-semibold text-gray-900">Who this is best for</h3>
                        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-gray-700">
                          <li>Homeowners who want a shortlist of providers with stronger documentation and review signal.</li>
                          <li>People comparing repair-focused vs replacement-focused providers for the same project.</li>
                          <li>Anyone who wants to request multiple written estimates and compare scopes line-by-line.</li>
                        </ul>
                      </section>
                    </>
                  ) : (
                    <>
                      <p className="mt-3 text-sm text-gray-700">{providerData.evaluatedIntro}</p>
                      <div className="mt-4">
                        <BestProvidersMethodologyCallout />
                      </div>
                      {providerData.providers.length ? (
                        <ProviderList providers={providerData.providers} providerGroup={businessCategory} />
                      ) : (
                        <div className="mt-5 rounded-xl border border-gray-200 bg-white p-6 text-sm text-gray-700 shadow-md">
                          Provider listings haven’t been added yet for this guide.
                        </div>
                      )}
                      {adsenseBestOfSlot ? (
                        <div className="mt-10 max-w-4xl">
                          <AdSenseDisplay slot={adsenseBestOfSlot} />
                        </div>
                      ) : null}

                      <BestOfFaqSection faqs={bestOfPageFaqs} />
                    </>
                  )}

                  <section aria-label="Comparison notes">
                    <ComparisonSection comparison={providerData.comparison} />
                  </section>
                </section>
              ) : null}

              {recommended.length ? (
                <section className="mt-12">
                  <h2 className="text-3xl font-semibold tracking-tight text-gray-900">Recommended Services</h2>
                  <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                    {recommended.map((s) => (
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
              ) : null}

              {ruleLinks ? (
                <section className="mt-12">
                  <h2 className="text-3xl font-semibold tracking-tight text-gray-900">More ways to compare</h2>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                    Use core service guides to understand scope and cost drivers, and review our methodology for how we build these comparisons.
                  </p>
                  <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                    {ruleLinks.twoCoreServices.map((l) => (
                      <LinkCard
                        key={l.href}
                        href={l.href}
                        title={l.label}
                        description={l.description ?? "Core service guide."}
                        badge="Service"
                      />
                    ))}
                    <LinkCard
                      href={ruleLinks.methodology.href}
                      title={ruleLinks.methodology.label}
                      description={ruleLinks.methodology.description ?? "Methodology for rankings."}
                      badge="Methodology"
                    />
                  </div>
                </section>
              ) : null}

              <section className="mt-12">
                <h2 className="text-3xl font-semibold tracking-tight text-gray-900">Related guides and neighborhoods</h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                  Continue with service fundamentals, nearby neighborhood pages, and related homeowner guides.
                </p>
                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {relatedServiceSlug ? (
                    <LinkCard
                      href={`/services/${relatedServiceSlug}`}
                      title={relatedService?.title ?? "Service guide"}
                      description={relatedService?.description ?? "Service guide and homeowner checklist."}
                      badge="Service guide"
                    />
                  ) : null}
                  <LinkCard
                    href="/locations/georgetown-tx"
                    title="Georgetown, TX guide"
                    description="Local context: neighborhoods (Sun City, Wolf Ranch, Berry Creek), climate, and what changes home services here."
                    badge="Neighborhood"
                  />
                </div>
              </section>

              <section className="mt-12">
                <h2 className="text-3xl font-semibold tracking-tight text-gray-900">Explore Other Categories</h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                  Browse our full set of best-of categories for Georgetown, TX.
                </p>
                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {explore.map((b) => (
                    <LinkCard
                      key={b.slug}
                      href={`/best/${b.slug}`}
                      title={`${b.label} in Georgetown, TX`}
                      description="Compare top providers, pricing expectations, and what to ask."
                      badge="Top Providers"
                    />
                  ))}
                </div>
              </section>

              {helpfulGuides.length ? (
                <section className="mt-12">
                  <h2 className="text-3xl font-semibold tracking-tight text-gray-900">Helpful Guides</h2>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                    Related articles for Georgetown homeowners.
                  </p>
                  <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                    {helpfulGuides.slice(0, 4).map((p) => (
                      <LinkCard
                        key={p.slug}
                        href={`/blog/${p.slug}`}
                        title={p.title}
                        description={p.description}
                        badge={p.readTime}
                      />
                    ))}
                  </div>
                </section>
              ) : null}
              </div>
            }
            aside={
              <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                <div className="bg-primary px-6 py-3.5 text-xs font-semibold uppercase tracking-wide text-white">
                  Directory navigation
                </div>
                <div className="space-y-3 px-6 pb-6 pt-4 text-sm">
                  <Link href="#providers" className="block font-semibold text-gray-900 hover:underline">
                    Jump to provider cards
                  </Link>
                  <Link href="/methodology" className="block font-semibold text-gray-900 hover:underline">
                    Read our methodology
                  </Link>
                  {relatedServiceSlug ? (
                    <Link href={`/services/${relatedServiceSlug}`} className="block font-semibold text-gray-900 hover:underline">
                      {relatedService ? `Read: ${relatedService.title}` : "Read our service guide"}
                    </Link>
                  ) : null}
                  <p className="pt-1 text-xs leading-relaxed text-slate-600">
                    We don’t take service requests or route jobs. Use the outbound links on each card to contact providers directly.
                  </p>
                </div>
              </div>
            }
          />
      </section>
    </PageShell>
    {coreAlsoCompareSlugs.has(best.slug) ? (
      <BestAlsoCompareBar links={getAlsoCompareLinksForBestSlug(best.slug)} />
    ) : null}
    </>
  );
}

