import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AdSenseDisplay from "../../../components/AdSenseDisplay";
import FAQList from "../../../components/FAQList";
import FAQSchema from "../../../components/FAQSchema";
import { ButtonLink } from "../../../components/Button";
import Container from "../../../components/Container";
import LinkCard from "../../../components/LinkCard";
import GeneratedArticleBodyWithLeadAd from "../../../components/GeneratedArticleBodyWithLeadAd";
import RichText from "../../../components/RichText";
import JsonLd from "../../../components/JsonLd";
import RatingSchema from "../../../components/RatingSchema";
import AggregateRatingBadge from "../../../components/AggregateRatingBadge";
import Breadcrumbs from "../../../components/Breadcrumbs";
import PageShell from "../../../components/templates/PageShell";
import TwoColumnPage from "../../../components/templates/TwoColumnPage";
import {
  getBestBySlug,
  getBlogsForServiceSlug,
  getLocationBySlug,
  getServiceBySlug,
  getServices,
  getServiceSlugs,
} from "../../../lib/site-content";
import { adsenseServiceMainSlot, adsenseSidebarSlot, ADSENSE_UNITS_ENABLED } from "../../../lib/adsense-config";
import { pageSeoMetadata, absolutePageUrl } from "../../../lib/page-seo";
import {
  SERVICE_BEST_LAST_UPDATED_DISPLAY,
  SERVICE_BEST_LAST_UPDATED_ISO,
  SERVICE_BEST_LAST_UPDATED_LINE_CLASS,
} from "../../../lib/service-best-pages-meta";
import AuthorByline from "../../../components/AuthorByline";
import { CORE_SERVICE_SLUGS, resolveServicePage } from "../../../lib/pageContentRegistry";
import {
  isExtendedServiceSlug,
  isNoindexSlug,
  isRedirectedBlogSlug,
  isRedirectedServiceSlug,
  showExtendedHomeServices,
} from "../../../lib/public-site-scope";
import ServiceRequestForm from "../../../components/ServiceRequestForm";
import ServiceTopProvidersSection from "../../../components/ServiceTopProvidersSection";
import {
  BEST_CTA_LABEL_BY_GROUP,
  PROVIDER_GROUP_LINKS,
  PROVIDER_SECTION_HEADING,
  getBusinessCategoryForServiceSlug,
  getBusinessesByCategory,
} from "../../../lib/businesses";
import { servicePageInternalLinks } from "../../../lib/internal-links";
import { resolveServiceGuideFaqs } from "../../../lib/georgetown-page-faqs";
import { buildServicePageSeo } from "../../../lib/service-page-seo";
import { SERVICE_GUIDE_AGGREGATE_RATING_DEFAULTS } from "../../../lib/service-guide-rating-defaults";
import CoreServiceGuideDecisionFramework from "../../../components/CoreServiceGuideDecisionFramework";

function breadcrumbJsonLd({
  siteUrl,
  serviceTitle,
  serviceSlug,
}: {
  siteUrl: string;
  serviceTitle: string;
  serviceSlug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Services", item: `${siteUrl}/services` },
      { "@type": "ListItem", position: 3, name: serviceTitle, item: `${siteUrl}/services/${serviceSlug}` },
    ],
  };
}

/**
 * Allow runtime resolution for `[slug]` so `getServiceBySlug` + `notFound()` control 404s.
 * (With `false`, Next can 404 before the page runs if static params are out of sync.)
 */
export const dynamicParams = true;

export function generateStaticParams() {
  return getServiceSlugs()
    .filter((slug) => !isRedirectedServiceSlug(slug))
    .map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  const { absoluteTitle, description } = buildServicePageSeo(service);
  return pageSeoMetadata({
    absoluteTitle,
    description,
    pathname: `/services/${slug}`,
    ogType: "website",
    noindex: isNoindexSlug(slug),
  });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const resolved = resolveServicePage(slug);
  if (!resolved) notFound();
  const service = resolved.record;
  const articleHtml = resolved.html;

  const siteUrl = process.env.SITE_URL ?? "https://www.georgetownhomeservices.com";

  const isPlumberService = service.slug === "plumber-georgetown-tx";
  const isHvacService = service.slug === "hvac-georgetown-tx";
  const isRooferService = service.slug === "roofer-georgetown-tx";

  const location = getLocationBySlug(service.locationSlug);
  const relatedServices = service.relatedServiceSlugs
    .filter((s) => !isRedirectedServiceSlug(s) && !isNoindexSlug(s))
    .map((s) => getServiceBySlug(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
  const bestPages = service.bestSlugs
    .map((s) => getBestBySlug(s))
    .filter((b): b is NonNullable<typeof b> => Boolean(b));
  const helpfulGuides = getBlogsForServiceSlug(service.slug).filter(
    (b) => !isRedirectedBlogSlug(b.slug) && !isNoindexSlug(b.slug),
  );
  const businessCategory = getBusinessCategoryForServiceSlug(service.slug);
  const providersFromJson =
    businessCategory !== null ? getBusinessesByCategory(businessCategory) : [];

  const bestHref =
    bestPages.length > 0
      ? `/best/${bestPages[0]!.slug}`
      : businessCategory
        ? PROVIDER_GROUP_LINKS[businessCategory].best
        : "/best";

  const bestCtaLabel = businessCategory
    ? BEST_CTA_LABEL_BY_GROUP[businessCategory]
    : "Browse provider directory";

  const visibleCoreSlugs = (CORE_SERVICE_SLUGS as readonly string[]).filter(
    (slug) => showExtendedHomeServices() || !isExtendedServiceSlug(slug),
  );
  const CORE_SERVICES = visibleCoreSlugs
    .map((slug) => {
      const s = getServiceBySlug(slug);
      const b0 = s?.bestSlugs?.[0];
      if (!s || !b0) return null;
      return { label: s.serviceType, slug: s.slug, best: b0 };
    })
    .filter((s): s is { label: string; slug: string; best: string } => Boolean(s));
  const explore = CORE_SERVICES.filter((s) => s.slug !== service.slug);
  const ruleLinks = servicePageInternalLinks(service.slug);
  const serviceFaqs = resolveServiceGuideFaqs(service);
  const guideRating = SERVICE_GUIDE_AGGREGATE_RATING_DEFAULTS;

  return (
    <PageShell>
        <section className="py-10 md:py-12">
          <JsonLd data={breadcrumbJsonLd({ siteUrl, serviceTitle: service.title, serviceSlug: service.slug })} />
          <RatingSchema
            pathname={`/services/${service.slug}`}
            headline={service.h1 ?? service.title}
            description={service.description}
            datePublished={SERVICE_BEST_LAST_UPDATED_ISO}
            dateModified={SERVICE_BEST_LAST_UPDATED_ISO}
            ratingValue={guideRating.ratingValue}
            reviewCount={guideRating.reviewCount}
            bestRating={guideRating.bestRating}
            worstRating={guideRating.worstRating}
          />
          <FAQSchema
            pageUrl={absolutePageUrl(`/services/${service.slug}`)}
            name={`${service.title} — FAQ`}
            faqs={serviceFaqs}
          />
          <TwoColumnPage
            main={
              <>
              <Breadcrumbs
                items={[
                  { href: "/", label: "Home" },
                  { href: "/services", label: "Services" },
                  { href: `/services/${service.slug}`, label: service.title },
                ]}
              />
              <div className="text-sm font-semibold uppercase tracking-wide text-gray-600">
                {service.serviceType} • {location?.title ?? "Georgetown, TX"}
              </div>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">{service.h1}</h1>
              <AggregateRatingBadge
                className="mt-2"
                ratingValue={guideRating.ratingValue}
                reviewCount={guideRating.reviewCount}
                bestRating={guideRating.bestRating}
              />
              <p className={SERVICE_BEST_LAST_UPDATED_LINE_CLASS}>Last updated: {SERVICE_BEST_LAST_UPDATED_DISPLAY}</p>
              <AuthorByline className="mt-3" compact />

              {isPlumberService ? (
                <p className="mt-4 text-lg leading-relaxed text-gray-700">
                  Plumbing issues in Georgetown, TX rarely happen at a convenient time. From slab leaks and aging water
                  heaters to main-line clogs and failing shutoff valves, this page is built to help Georgetown
                  homeowners understand their options, set realistic price expectations, and decide when it is time to
                  bring in a licensed plumber.
                </p>
              ) : isHvacService ? (
                <p className="mt-4 text-lg leading-relaxed text-gray-700">
                  In Georgetown, TX, long stretches of triple-digit heat mean your AC and heating system cannot be an
                  afterthought. This HVAC page focuses on the most common cooling and heating problems in local homes,
                  what repairs and replacements typically involve, and when to call a professional before a small issue
                  becomes a no-cool emergency.
                </p>
              ) : isRooferService ? (
                <p className="mt-4 text-lg leading-relaxed text-gray-700">
                  In Georgetown, TX, roofing problems tend to show up the same way: a ceiling stain after a heavy rain,
                  missing or lifted shingles after wind, granules in gutters after hail, or a slow drip that only appears
                  when storms hit at the right angle. This page is written for Georgetown homeowners who want clarity—what
                  is urgent, what can be scheduled, and how to choose a roofer who documents the real failure point
                  (flashing, vents, valleys, transitions), not just the symptom.
                </p>
              ) : (
                <p className="mt-4 text-lg leading-relaxed text-gray-700">{service.description}</p>
              )}

              {isPlumberService ? <CoreServiceGuideDecisionFramework trade="plumber" /> : null}
              {isHvacService ? <CoreServiceGuideDecisionFramework trade="hvac" /> : null}
              {isRooferService ? <CoreServiceGuideDecisionFramework trade="roofer" /> : null}

              <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-md">
                <div className="text-sm font-semibold text-gray-900">What this guide covers</div>
                <ul className="mt-3 list-disc space-y-2.5 pl-6 text-sm leading-relaxed text-gray-700">
                  {service.heroBullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <ButtonLink href={bestHref} variant="primary">
                    {bestCtaLabel}
                  </ButtonLink>
                  <ButtonLink href="/best" variant="secondary">
                    Browse all categories
                  </ButtonLink>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-slate-600">
                  We publish educational guides and a provider directory. We don’t take service requests or schedule jobs.
                </p>
              </div>

              <div className="mt-8">
                {isPlumberService ? (
                  <div className="space-y-10 text-gray-800">
                    <section>
                      <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
                        Common Plumbing Problems in Georgetown Homes
                      </h2>
                      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-gray-700">
                        <li>
                          <span className="font-semibold text-gray-900">Slab leaks and hidden pipe damage:</span> small
                          hot spots on the floor, unexpected water bills, or damp carpet along interior walls.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Water heater failures:</span> lukewarm water,
                          noisy tanks, or slow leaks around the base—especially on older units working hard in Texas
                          heat.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Main line and sewer clogs:</span> multiple
                          fixtures backing up at once, gurgling drains, or sewage odors near cleanouts or tubs.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">High water pressure and failing shutoffs:</span>{" "}
                          hammering pipes, stuck angle stops, and outdoor hose bibs that leak at the wall.
                        </li>
                      </ul>
                    </section>

                    {ADSENSE_UNITS_ENABLED && adsenseServiceMainSlot ? (
                      <div className="not-prose flex justify-center">
                        <AdSenseDisplay slot={adsenseServiceMainSlot} className="mx-auto w-full max-w-2xl" />
                      </div>
                    ) : null}

                    <section>
                      <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
                        Plumbing Pricing Expectations in Georgetown TX
                      </h2>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                        Every company prices work differently, but homeowners around Georgetown, TX commonly see:
                      </p>
                      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-gray-700">
                        <li>
                          <span className="font-semibold text-gray-900">Standard service calls:</span> a diagnostic fee
                          in the low-to-mid hundreds, sometimes credited toward approved repairs on the same visit.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Smaller repairs:</span> fixing a leaking
                          shutoff, swapping a supply line, or clearing a simple clog often lands in the lower hundreds
                          depending on access and parts.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Water heater replacements:</span> full
                          replacements—especially for larger or tankless units—are typically quoted in the
                          many-thousands, including labor and haul-away.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Sewer and drain work:</span> cabling or jetting
                          a main line is usually a few hundred dollars; repairs that require digging or pipe
                          replacement are significantly more.
                        </li>
                      </ul>
                      <p className="mt-3 text-sm leading-relaxed text-gray-700">
                        These are not quotes—always request a written estimate for your specific situation and ask what
                        could change the price.
                      </p>
                    </section>

                    <section>
                      <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
                        When to Call a Professional Plumber
                      </h2>
                      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-gray-700">
                        <li>
                          <span className="font-semibold text-gray-900">Active water damage:</span> wet ceilings,
                          buckling floors, or water near electrical fixtures should be addressed immediately by a
                          licensed plumber.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Sewer backups or strong odors:</span> multiple
                          drains backing up or sewage smells inside usually indicate a main-line issue, not just a
                          simple clog.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Gas lines or major piping changes:</span> any
                          work involving gas, slab penetrations, or large sections of pipe is not a DIY project.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Repeated “temporary” fixes:</span> if the same
                          problem keeps returning, it is often cheaper long-term to have a professional diagnose the
                          root cause.
                        </li>
                      </ul>
                    </section>

                    <section>
                      <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
                        Guides for Georgetown Homeowners
                      </h2>
                      <p className="mt-3 text-sm leading-relaxed text-gray-700">
                        For deeper research, many Georgetown, TX homeowners start with:
                      </p>
                      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-primary">
                        <li>
                          <Link href="/best/best-plumbers-georgetown-tx" className="font-semibold hover:underline">
                            Best Plumbers in Georgetown TX
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/blog/how-to-choose-reliable-plumber-georgetown-tx"
                            className="font-semibold hover:underline"
                          >
                            How to Choose a Reliable Plumber in Georgetown
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/blog/emergency-plumber-cost-georgetown-tx"
                            className="font-semibold hover:underline"
                          >
                            Emergency plumber cost in Georgetown TX
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/blog/how-to-choose-reliable-plumber-georgetown-tx"
                            className="font-semibold hover:underline"
                          >
                            How to choose a reliable plumber in Georgetown TX
                          </Link>
                        </li>
                      </ul>
                    </section>
                  </div>
                ) : isHvacService ? (
                  <div className="space-y-10 text-gray-800">
                    <section>
                      <h2 className="text-2xl font-semibold tracking-tight text-gray-900">HVAC Services in Georgetown TX</h2>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                        Georgetown homes see long cooling seasons, hot afternoons that push systems under peak load, and
                        quick weather swings that expose weak airflow, drain line, and control issues. This page breaks
                        down the core HVAC services most homeowners need—what they include, when they matter, and how to
                        describe the problem so you get the right appointment.
                      </p>
                    </section>

                    <section>
                      <h2 className="text-2xl font-semibold tracking-tight text-gray-900">AC repair in Georgetown</h2>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                        Most summer calls are some version of “it’s running but not cooling.” In Georgetown, that often
                        shows up during the hottest hours, in upstairs bedrooms, or in one wing of the house that never
                        seems to catch up. A useful repair visit starts with diagnosis (what failed and why), then
                        options (repair now vs monitor vs plan replacement if the system is at end of life).
                      </p>
                      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-gray-700">
                        <li>
                          <span className="font-semibold text-gray-900">No-cool / warm air:</span> electrical components
                          failing under load, control issues, or performance problems that require confirmation.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Weak airflow:</span> filters, returns, duct
                          restrictions, or blower-related issues—often mistaken for “needs refrigerant.”
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Condensate and drain line issues:</span> backed up
                          drains that trip safety switches or cause water near the indoor unit.
                        </li>
                      </ul>
                    </section>

                    <section>
                      <h2 className="text-2xl font-semibold tracking-tight text-gray-900">AC replacement in Georgetown</h2>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                        Replacement is worth discussing when repairs are frequent, comfort is inconsistent, or a major
                        repair is a large fraction of the cost of a new system. In Georgetown, homeowners also replace
                        to solve comfort problems (hot rooms, humidity, noisy run cycles) that are partly equipment and
                        partly airflow.
                      </p>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                        When comparing bids, ask for written equipment model numbers, efficiency ratings, warranty terms,
                        and whether any ductwork or electrical corrections are included.
                      </p>
                    </section>

                    <section>
                      <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Heating service in Georgetown</h2>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                        Georgetown’s heating season is shorter, but cold snaps still make “no heat” urgent. Heating
                        service typically includes troubleshooting failed starts, short cycling, thermostat/control
                        issues, and verifying safe operation. If the heater hasn’t run in a while, the first cold front
                        is when problems usually show up.
                      </p>
                    </section>

                    <section>
                      <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Maintenance (tune-ups)</h2>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                        Maintenance is most valuable before peak summer. A useful tune-up is not a checkbox—it should
                        reduce breakdown risk by checking airflow basics, cleaning where appropriate, and confirming the
                        condensate drain is clear. If your home has persistent hot rooms (common in two-story layouts),
                        ask for airflow observations instead of only equipment notes.
                      </p>
                    </section>

                    {ADSENSE_UNITS_ENABLED && adsenseServiceMainSlot ? (
                      <div className="not-prose flex justify-center">
                        <AdSenseDisplay slot={adsenseServiceMainSlot} className="mx-auto w-full max-w-2xl" />
                      </div>
                    ) : null}

                    <section>
                      <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
                        Typical HVAC Costs in Georgetown TX
                      </h2>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                        Pricing depends on equipment brand/age, access, and timing, but Georgetown, TX homeowners often
                        see:
                      </p>
                      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-gray-700">
                        <li>
                          <span className="font-semibold text-gray-900">Service call and diagnosis:</span> commonly a fee
                          in the low-to-mid hundreds, sometimes credited toward approved repairs.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Typical repairs:</span> smaller parts and drain
                          clears often in the lower hundreds depending on access and brand.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Major repairs:</span> coils, compressors, or
                          control boards can be significantly more and may approach replacement-level pricing on older
                          systems.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Replacement:</span> full system swaps are quoted
                          in the many-thousands depending on tonnage, efficiency, and ductwork scope.
                        </li>
                      </ul>
                      <p className="mt-3 text-sm leading-relaxed text-gray-700">
                        For a deeper replacement budget breakdown, read{" "}
                        <Link href="/blog/cost-to-replace-hvac-georgetown" className="font-semibold hover:underline">
                          cost to replace HVAC in Georgetown
                        </Link>
                        .
                      </p>
                    </section>

                    <section>
                      <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
                        When to Call an HVAC Professional
                      </h2>
                      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-gray-700">
                        <li>
                          <span className="font-semibold text-gray-900">No cooling or no heat:</span> if your system is
                          not running or only blows room-temperature air during extreme weather, call a licensed HVAC
                          technician quickly.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Repeated breaker trips:</span> electrical issues
                          or hard-starting equipment can be a safety concern and should be evaluated professionally.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Water around the air handler:</span> water in a
                          closet, attic, or garage near your HVAC equipment usually warrants prompt attention to prevent
                          damage and mold.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Persistent comfort problems:</span> hot rooms,
                          short cycling, or very high bills can signal sizing, duct, or control issues an HVAC company
                          can diagnose.
                        </li>
                      </ul>
                    </section>

                    <section>
                      <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
                        Guides for Georgetown Homeowners
                      </h2>
                      <p className="mt-3 text-sm leading-relaxed text-gray-700">
                        For more background before you schedule service, you can also read:
                      </p>
                      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-primary">
                        <li>
                          <Link
                            href="/best/top-hvac-companies-georgetown-tx"
                            className="font-semibold hover:underline"
                          >
                            Top HVAC Companies in Georgetown TX
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/blog/why-your-ac-is-not-cooling-georgetown-tx"
                            className="font-semibold hover:underline"
                          >
                            Why your AC is not cooling in Georgetown TX
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/blog/ac-repair-cost-georgetown-tx"
                            className="font-semibold hover:underline"
                          >
                            AC repair cost in Georgetown TX
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/blog/signs-you-need-hvac-repair-georgetown-tx"
                            className="font-semibold hover:underline"
                          >
                            Signs you need HVAC repair in Georgetown TX
                          </Link>
                        </li>
                        <li>
                          <Link href="/blog/cost-to-replace-hvac-georgetown" className="font-semibold hover:underline">
                            Cost to Replace HVAC in Georgetown
                          </Link>
                        </li>
                      </ul>
                    </section>
                  </div>
                ) : isRooferService ? (
                  <div className="space-y-10 text-gray-800">
                    <section>
                      <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Common roofing issues in Georgetown</h2>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                        Georgetown’s mix of UV-heavy summers and sudden storm bursts tends to reveal weak points at
                        transitions—places where water concentrates or where materials meet. These are the most common
                        patterns homeowners report before calling a roofer.
                      </p>
                      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-gray-700">
                        <li>
                          <span className="font-semibold text-gray-900">Hail and wind damage:</span> bruised shingles,
                          granule loss, lifted edges, and missing tabs after storms moving through Williamson County.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Flashing / valley leaks:</span> leaks around
                          chimneys, roof-to-wall areas, and valleys where water channels during downpours.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Vent and penetration failures:</span> cracked pipe
                          boots, loose vents, and seal degradation that lets water track into the attic over time.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Age and heat wear:</span> brittle shingles,
                          curling edges, and failing seals on older roofs exposed to years of Georgetown sun.
                        </li>
                      </ul>
                      <div className="mt-5 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                        <div className="text-sm font-semibold text-gray-900">Start here if you see a ceiling stain</div>
                        <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-gray-700">
                          <li>Take photos of the stain and note which direction the storm came from.</li>
                          <li>Check the attic (if safe) for wet decking, drips, or daylight near penetrations.</li>
                          <li>Avoid climbing the roof—request an inspection with photos and a written scope.</li>
                        </ul>
                      </div>
                    </section>

                    {ADSENSE_UNITS_ENABLED && adsenseServiceMainSlot ? (
                      <div className="not-prose flex justify-center">
                        <AdSenseDisplay slot={adsenseServiceMainSlot} className="mx-auto w-full max-w-2xl" />
                      </div>
                    ) : null}

                    <section>
                      <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Roof repair in Georgetown</h2>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                        Most Georgetown roofing calls start as “there’s a leak.” The most useful repair visit does two
                        things: it stabilizes the problem (stop water intrusion) and it documents the cause so you can
                        make a durable decision rather than chasing the leak every time it rains.
                      </p>
                      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-gray-700">
                        <li>
                          <span className="font-semibold text-gray-900">Leak diagnosis:</span> tracing the entry point
                          (often flashing, vents, valleys, or transitions) instead of only patching where the stain shows
                          up.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Targeted repairs:</span> replacing damaged shingles,
                          repairing flashing, resealing penetrations, and addressing specific weak points.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">What good looks like:</span> photos, clear scope,
                          and guidance on what to monitor after the next storm.
                        </li>
                      </ul>
                      <p className="mt-3 text-sm leading-relaxed text-gray-700">
                        If you are budgeting, see{" "}
                        <Link
                          href="/blog/roof-repair-cost-georgetown-tx"
                          className="font-semibold text-primary hover:underline"
                        >
                          roof repair cost in Georgetown
                        </Link>{" "}
                        for a breakdown of what typically drives pricing.
                      </p>
                    </section>

                    <section>
                      <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Roof replacement in Georgetown</h2>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                        Replacement becomes the better option when the roof is near end-of-life, damage is widespread, or
                        you are dealing with repeated repairs that keep returning. In Georgetown, good replacement planning
                        includes more than shingles—it includes underlayment, flashing, ventilation, and any decking that
                        needs attention once tear-off begins.
                      </p>
                      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-gray-700">
                        <li>
                          <span className="font-semibold text-gray-900">Scope clarity:</span> written materials, edge and
                          flashing details, ventilation plan, and disposal/cleanup expectations.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Decking plan:</span> how rotten or damaged decking
                          is handled and priced if discovered during tear-off.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Warranty terms:</span> workmanship + manufacturer
                          warranty details you can review before signing.
                        </li>
                      </ul>
                      <p className="mt-3 text-sm leading-relaxed text-gray-700">
                        For a cost-focused breakdown, read{" "}
                        <Link
                          href="/blog/roof-replacement-cost-georgetown-tx"
                          className="font-semibold text-primary hover:underline"
                        >
                          roof replacement cost in Georgetown, TX
                        </Link>
                        .
                      </p>
                    </section>

                    <section>
                      <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Storm damage in Georgetown</h2>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                        After hail or wind, the most helpful next step is documentation and a clear plan—especially if you
                        may involve insurance. A reputable roofer can show you what is damaged, what is cosmetic, and what
                        impacts water shedding and lifespan.
                      </p>
                      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-gray-700">
                        <li>
                          <span className="font-semibold text-gray-900">What to document:</span> photos of missing shingles,
                          dented vents, exposed flashing, granules in downspouts, and interior staining that appears after
                          rain.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">What to avoid:</span> climbing the roof or letting
                          anyone pressure you into signing before you have a written scope and timeline.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">What to ask:</span> which items are repairable now,
                          which indicate end-of-life, and how they’ll prevent leaks during the next heavy Georgetown
                          downpour.
                        </li>
                        <li>
                          <span className="font-semibold text-gray-900">Timing:</span> if water is actively entering, ask
                          whether they can provide temporary stabilization while you decide on the long-term scope.
                        </li>
                      </ul>
                    </section>

                    <section>
                      <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Roof inspections in Georgetown</h2>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                        Inspections are most valuable when they are specific. The goal is not “yes/no replacement”—it’s a
                        clear understanding of the failure points, remaining life, and what a repair would actually
                        accomplish. Ask for photos and a written summary so you can compare providers.
                      </p>
                      <div className="mt-5 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                        <div className="text-sm font-semibold text-gray-900">A good inspection should cover</div>
                        <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-gray-700">
                          <li>Flashing, valleys, vents, and penetrations (common leak sources)</li>
                          <li>Shingle condition, granule loss, and any storm impacts</li>
                          <li>Ventilation basics (intake/exhaust balance) and obvious heat issues</li>
                          <li>Evidence of moisture in the attic or on decking</li>
                        </ul>
                      </div>
                    </section>

                    <section>
                      <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Guides for Georgetown homeowners</h2>
                      <p className="mt-3 text-sm leading-relaxed text-gray-700">
                        If you are gathering information before you talk with a roofer, you may also want to review:
                      </p>
                      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-primary">
                        <li>
                          <Link href="/best/best-roofers-georgetown-tx" className="font-semibold hover:underline">
                            Best Roofers in Georgetown TX
                          </Link>
                        </li>
                        <li>
                          <Link href="/blog/roof-replacement-cost-georgetown-tx" className="font-semibold hover:underline">
                            Roof replacement cost in Georgetown, TX
                          </Link>
                        </li>
                        <li>
                          <Link href="/blog/roof-repair-cost-georgetown-tx" className="font-semibold hover:underline">
                            Roof repair cost in Georgetown
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/blog/signs-you-may-need-new-roof-georgetown-tx"
                            className="font-semibold hover:underline"
                          >
                            Signs you may need a new roof in Georgetown TX
                          </Link>
                        </li>
                      </ul>
                    </section>
                  </div>
                ) : articleHtml ? (
                  <GeneratedArticleBodyWithLeadAd html={articleHtml} />
                ) : (
                  <RichText blocks={service.content} />
                )}
              </div>

              {providersFromJson.length ? (
                <section id="providers" className="mt-12 scroll-mt-24">
                  <h2 className="text-3xl font-semibold tracking-tight text-gray-900">
                    {businessCategory ? PROVIDER_SECTION_HEADING[businessCategory] : "Top Providers Serving Georgetown"}
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                    These listings are compiled from public business information for companies that serve Georgetown, TX.
                    They are provided to help you compare options; confirm current licensing, insurance, pricing, and
                    availability with any provider before hiring.
                  </p>
                  <div className="mt-6">
                    <ServiceTopProvidersSection businesses={providersFromJson} />
                  </div>
                </section>
              ) : null}

              <section className="mt-12">
                <h2 className="text-3xl font-semibold tracking-tight text-gray-900">Explore Other Services</h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                  Browse the other core service categories in Georgetown, TX.
                </p>
                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {explore.map((s) => (
                    <LinkCard
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      title={`${s.label} in Georgetown, TX`}
                      description={`Compare ${s.label.toLowerCase()} listings and guides for Georgetown.`}
                      badge="Service"
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

              <div>
                <section className="mt-12">
                  <h2 className="text-3xl font-semibold tracking-tight text-gray-900">
                    {isPlumberService
                      ? "Plumbing FAQ for Georgetown TX Homeowners"
                      : isHvacService
                      ? "HVAC FAQ for Georgetown TX Homeowners"
                      : isRooferService
                      ? "Roofing FAQ for Georgetown TX Homeowners"
                      : "Frequently Asked Questions"}
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                    These answers summarize common questions we hear from homeowners in and around Georgetown, TX. Use
                    them as a starting point, then confirm details with any professional you choose to work with.
                  </p>
                  <div className="mt-6">
                    <FAQList faqs={serviceFaqs} />
                  </div>
                </section>
              </div>

              {relatedServices.length ? (
                <section className="mt-12">
                  <h2 className="text-3xl font-semibold tracking-tight text-gray-900">Related Services</h2>
                  <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                    {relatedServices.map((s) => (
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
                  <h2 className="text-3xl font-semibold tracking-tight text-gray-900">Next internal links</h2>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                    Use these pages to navigate the directory and compare providers without starting over.
                  </p>
                  <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <LinkCard
                      href={ruleLinks.parentHub.href}
                      title={ruleLinks.parentHub.label}
                      description={ruleLinks.parentHub.description ?? "Browse related service guides."}
                      badge="Hub"
                    />
                    {ruleLinks.bestOf ? (
                      <LinkCard
                        href={ruleLinks.bestOf.href}
                        title={ruleLinks.bestOf.label}
                        description={ruleLinks.bestOf.description ?? "Compare top providers."}
                        badge="Best Of"
                      />
                    ) : null}
                    {ruleLinks.neighborhood ? (
                      <LinkCard
                        href={ruleLinks.neighborhood.href}
                        title={ruleLinks.neighborhood.label}
                        description={ruleLinks.neighborhood.description ?? "Neighborhood service area page."}
                        badge="Neighborhood"
                      />
                    ) : null}
                    {ruleLinks.siblings.map((l) => (
                      <LinkCard
                        key={l.href}
                        href={l.href}
                        title={l.label}
                        description={l.description ?? "Sibling service category."}
                        badge="Sibling service"
                      />
                    ))}
                    {ruleLinks.blogs.map((l) => (
                      <LinkCard
                        key={l.href}
                        href={l.href}
                        title={l.label}
                        description={l.description ?? "Related homeowner guide."}
                        badge="Blog"
                      />
                    ))}
                  </div>
                </section>
              ) : null}
              </>
            }
            aside={
              <>
              <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                <div className="bg-primary px-6 py-3.5 text-xs font-semibold uppercase tracking-wide text-white">
                  Directory navigation
                </div>
                <div className="px-6 pb-6 pt-4">
                  <div className="text-lg font-semibold text-gray-900">Browse the provider directory</div>
                  <p className="mt-2 text-sm leading-relaxed text-gray-700">
                    When you’re ready, compare companies in Georgetown and contact providers directly.
                  </p>
                  <div className="mt-4">
                    <ButtonLink href={bestHref} variant="primary">
                      {bestCtaLabel}
                    </ButtonLink>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <ServiceRequestForm serviceSlug={service.slug} />
              </div>

              <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-md">
                <div className="text-sm font-semibold text-gray-900">Service area</div>
                <div className="mt-2 text-sm leading-relaxed text-gray-700">{location?.title ?? "Georgetown, TX"}</div>
              </div>

              {ADSENSE_UNITS_ENABLED && adsenseSidebarSlot ? (
                <AdSenseDisplay slot={adsenseSidebarSlot} className="mt-8" />
              ) : null}
              </>
            }
          />
        </section>

        <section className="py-10 md:py-12">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
              <h2 className="text-xl font-semibold text-gray-900">Compare local providers</h2>
              <p className="mt-2 text-sm text-gray-700">
                Your next step is browsing the directory page for this category. Use it to shortlist providers, then request written estimates
                directly from the companies you choose.
              </p>
              <div className="mt-4">
                <ButtonLink href={bestHref} variant="primary">
                  {bestCtaLabel}
                </ButtonLink>
              </div>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
              <h2 className="text-xl font-semibold text-gray-900">Popular guides</h2>
              <p className="mt-2 text-sm text-gray-700">
                Learn what to look for and how to avoid common service mistakes.
              </p>
              <div className="mt-4 grid grid-cols-1 gap-3">
                {service.bestSlugs.slice(0, 1).map((bSlug) => {
                  const b = getBestBySlug(bSlug);
                  if (!b) return null;
                  return (
                    <Link key={b.slug} href={`/best/${b.slug}`} className="text-sm font-semibold text-gray-900 hover:underline">
                      {b.title}
                    </Link>
                  );
                })}
                {service.relatedServiceSlugs
                  .filter((s) => !isRedirectedServiceSlug(s) && !isNoindexSlug(s))
                  .slice(0, 2)
                  .map((sSlug) => {
                    const s = getServices().find((x) => x.slug === sSlug);
                    if (!s) return null;
                    return (
                      <Link key={s.slug} href={`/services/${s.slug}`} className="text-sm font-semibold text-gray-900 hover:underline">
                        {s.title}
                      </Link>
                    );
                  })}
              </div>
            </div>
          </div>
        </section>
    </PageShell>
  );
}

