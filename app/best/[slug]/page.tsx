import type { Metadata } from "next";
import Link from "next/link";
import BestAlsoCompareBar from "../../../components/BestAlsoCompareBar";
import { notFound } from "next/navigation";
import LinkCard from "../../../components/LinkCard";
import GeneratedArticleBody from "../../../components/GeneratedArticleBody";
import RichText from "../../../components/RichText";
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
import { pageSeoMetadata, absolutePageUrl } from "../../../lib/page-seo";
import { webPageWithDateModifiedJsonLd } from "../../../lib/last-updated";
import LastUpdated from "../../../components/LastUpdated";
import { CORE_BEST_SLUGS, resolveBestPage } from "../../../lib/pageContentRegistry";
import { getAlsoCompareLinksForBestSlug } from "../../../lib/best-also-compare-links";
import { getRelatedServiceSlugForBestSlug } from "../../../lib/businesses";
import { buildProviderItemListJsonLd } from "../../../lib/provider-item-list-schema";
import { getDirectoryProvidersForBestSlug, getCategoryForBestSlug } from "../../../data/providers";
import { getComparisonsForBestSlug } from "../../../data/comparisons";
import ProviderCardSection from "../../../components/ProviderCardSection";
import AdUnit from "../../../components/AdUnit";
import StickyCallBar from "../../../components/StickyCallBar";
import KeyTakeaways from "../../../components/KeyTakeaways";
import SourcesVerificationStrip from "../../../components/SourcesVerificationStrip";
import { bestPageInternalLinks } from "../../../lib/internal-links";
import { getBestOfPageFaqs } from "../../../lib/best-of-page-faqs";
import { businessPhoneTel } from "../../../lib/phone";
import { bestOfAdSlot } from "../../../lib/adConfig";
import { bestOfTakeaways } from "../../../lib/ai-seo-takeaways";
import {
  isExtendedBestSlug,
  isNoindexSlug,
  isRedirectedServiceSlug,
  showExtendedHomeServices,
} from "../../../lib/public-site-scope";
import FlagshipYouTubeEmbed from "../../../components/FlagshipYouTubeEmbed";
import BestOfRooferEditorialDepth from "../../../components/BestOfRooferEditorialDepth";
import BestOfPlumberEditorialDepth from "../../../components/BestOfPlumberEditorialDepth";
import BestOfHvacEditorialDepth from "../../../components/BestOfHvacEditorialDepth";
import BestOfExtendedTradeEditorialDepth from "../../../components/BestOfExtendedTradeEditorialDepth";
import {
  FLAGSHIP_VIDEO_BEST_ROOFERS,
  flagshipVideoObjectJsonLd,
} from "../../../lib/flagship-videos";
import HubRelatedLinks from "../../../components/HubRelatedLinks";
import { bestPageRelatedHubLinks } from "../../../lib/hub-cross-links";
import { canonicalServicePathForLinks } from "../../../lib/public-site-scope";
import { buildFAQPage } from "../../../lib/schema";

function BestOfFaqSection({ faqs }: { faqs: readonly { q: string; a: string }[] }) {
  if (!faqs.length) return null;
  return (
    <section className="mt-12 rounded-xl border border-ink/10 bg-surface p-6 shadow-md md:p-8">
      <h2 className="text-3xl font-semibold tracking-tight text-ink">FAQ</h2>
      <div className="mt-6 space-y-3">
        {faqs.map((f) => (
          <details key={f.q} className="group rounded-lg border border-ink/10 bg-surface-alt px-4 py-3">
            <summary className="flex cursor-pointer list-none items-start gap-2 text-sm font-semibold text-ink [&::-webkit-details-marker]:hidden">
              <span
                className="mt-0.5 inline-flex w-5 shrink-0 justify-center font-mono text-base font-normal leading-none text-muted group-open:hidden"
                aria-hidden
              >
                +
              </span>
              <span
                className="mt-0.5 hidden w-5 shrink-0 justify-center font-mono text-base font-normal leading-none text-muted group-open:inline"
                aria-hidden
              >
                −
              </span>
              <span>{f.q}</span>
            </summary>
            <p className="mt-2 border-t border-ink/10 pt-2 pl-7 text-sm leading-relaxed text-muted">{f.a}</p>
          </details>
        ))}
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
      absoluteTitle: "Best Plumbers Georgetown TX (2026) — Local Picks",
      description:
        "The top-rated plumbers in Georgetown TX ranked by reviews, local presence, and service focus. Compare options for leaks, drains, slab repair, and emergency calls.",
    },
    "top-hvac-companies-georgetown-tx": {
      absoluteTitle: "Best HVAC Companies Georgetown TX (2026) — AC & Heating Repair",
      description:
        "Georgetown TX's top-rated HVAC companies compared by response speed, service scope, and local reputation. Picks compiled from public business data for Central Texas summer heat.",
    },
    "best-roofers-georgetown-tx": {
      absoluteTitle:
        "Best Roofers Georgetown TX (2026) — Reviews, Documentation & Local Focus",
      description:
        "Top Georgetown TX roofing contractors ranked by reviews, storm damage experience, and transparency. Includes what to ask before signing any roofing contract.",
    },
    "best-electricians-georgetown-tx": {
      absoluteTitle:
        "Best Electricians Georgetown TX (2026) — Reviews, Documentation & Local Focus",
      description:
        "Top-rated electricians in Georgetown TX for panel upgrades, circuit work, and EV charger installation. Compare by licensing, reviews, and residential specialty.",
    },
    "best-landscaping-companies-georgetown-tx": {
      absoluteTitle:
        "Best Landscaping Companies Georgetown TX (2026) — Reviews, Documentation & Local Focus",
      description:
        "Top Georgetown TX landscaping companies for lawn care, beds, mulch, and irrigation. Ranked by local reviews, service range, and Central Texas experience.",
    },
    "best-pest-control-georgetown-tx": {
      absoluteTitle: "Best Pest Control Georgetown TX (2026) — Ranked & Reviewed",
      description:
        "Georgetown TX's top pest control providers compared for perimeter plans, termite monitoring, and rodent exclusion. Local picks with public Google ratings.",
    },
    "best-foundation-repair-georgetown-tx": {
      absoluteTitle:
        "Best Foundation Repair Georgetown TX (2026) — Reviews, Documentation & Local Focus",
      description:
        "Top foundation repair contractors in Georgetown TX ranked by reviews, engineering credentials, and experience with Williamson County's expansive clay soil.",
    },
    "best-house-cleaning-services-georgetown-tx": {
      absoluteTitle:
        "Best House Cleaning Services Georgetown TX (2026) — Reviews, Documentation & Local Focus",
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

  const directoryProviders = getDirectoryProvidersForBestSlug(slug);
  const bestCategory = getCategoryForBestSlug(slug);
  const takeaways =
    bestCategory && directoryProviders.length
      ? bestOfTakeaways(bestCategory, directoryProviders)
      : [];
  const primaryCallProvider =
    directoryProviders.find((p) => businessPhoneTel(p.phone)) ?? null;
  const headToHeadComparisons = getComparisonsForBestSlug(best.slug);
  const relatedServiceSlug = getRelatedServiceSlugForBestSlug(slug);
  const relatedService = relatedServiceSlug ? getServiceBySlug(relatedServiceSlug) : null;
  const services = getServices();
  const recommended = best.recommendedServiceSlugs
    .filter((s) => !isRedirectedServiceSlug(s) && !isNoindexSlug(s))
    .map((s) => services.find((x) => x.slug === s))
    .filter((s): s is (typeof services)[number] => Boolean(s));
  const helpfulGuides = getBlogsForBestSlug(best.slug).filter(
    (b) => !isNoindexSlug(b.slug),
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
  const relatedHubLinks = bestPageRelatedHubLinks(best.slug);

  /** FAQPage JSON-LD + visible FAQ (must match). */
  const bestOfPageFaqs = getBestOfPageFaqs(best.slug);
  const bestFaqSchema =
    bestOfPageFaqs.length > 0
      ? buildFAQPage(bestOfPageFaqs, {
          pageUrl: absolutePageUrl(`/best/${best.slug}`),
          name: `${best.title} — FAQ`,
        })
      : null;

  const coreAlsoCompareSlugs = new Set([
    "best-plumbers-georgetown-tx",
    "top-hvac-companies-georgetown-tx",
    "best-roofers-georgetown-tx",
  ]);

  return (
    <>
    <PageShell variant="best">
      <section
        className={
          primaryCallProvider ? "py-10 pb-24 md:py-12 md:pb-12" : "py-10 md:py-12"
        }
      >
          <JsonLd
            data={webPageWithDateModifiedJsonLd({
              pathname: `/best/${best.slug}`,
              name: best.title,
              description: best.description,
              lastUpdated: best.lastUpdated,
            })}
          />
          {bestFaqSchema ? <JsonLd data={bestFaqSchema} /> : null}
          {directoryProviders.length ? (
            <JsonLd data={buildProviderItemListJsonLd(best.title, directoryProviders)} />
          ) : null}
          {isRoofersGeorgetown ? (
            <JsonLd
              data={flagshipVideoObjectJsonLd(
                siteUrl,
                absolutePageUrl(`/best/${best.slug}`),
                FLAGSHIP_VIDEO_BEST_ROOFERS,
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
              <div className="text-sm font-semibold uppercase tracking-wide text-brand">Best Of</div>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-ink md:text-5xl">{best.h1}</h1>
              <LastUpdated lastUpdated={best.lastUpdated} />
              {takeaways.length ? <KeyTakeaways items={takeaways} speakable /> : null}
              {isPlumbersGeorgetown ? (
                <>
                  <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
                    This shortlist covers Georgetown-area plumbers that meet published inclusion criteria—active local
                    service, working phone, and Google rating/review thresholds. License numbers shown on cards were
                    checked against TSBPE public records where available. Placement is not sold. Common local jobs
                    include slab leaks on clay soils, hard-water heater failures, and after-hours backups.
                  </p>
                </>
              ) : isHvacGeorgetown ? (
                <>
                  <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
                    Georgetown cooling seasons run long, attic decks run hot, and peak-heat no-cool calls stack across
                    Williamson County. This shortlist lists HVAC companies that meet published inclusion criteria for
                    the Georgetown area. Where Texas licenses the trade, license fields were checked against TDLR
                    records. Placement is not sold.
                  </p>
                </>
              ) : isRoofersGeorgetown ? (
                <>
                  <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
                    Georgetown roofs face heat, UV, spring hail, and fast rain that exposes weak flashing, vents, and
                    valleys. Texas does not issue a statewide roofing license, so this shortlist emphasizes public
                    ratings, local service evidence, and written-scope discipline—not a paid ranking.
                  </p>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                    Trade fundamentals and storm documentation notes live on the{" "}
                    <Link href="/services/roofer-georgetown-tx" className="font-semibold text-brand">
                      Georgetown roofing guide
                    </Link>
                    . This page is the provider shortlist for leak repair, wind/hail work, and replacement planning.
                  </p>
                </>
              ) : (
                <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{best.description}</p>
              )}

              {isPlumbersGeorgetown ? <BestOfPlumberEditorialDepth /> : null}
              {isHvacGeorgetown ? <BestOfHvacEditorialDepth /> : null}
              {showExtendedHomeServices() && isExtendedBestSlug(slug) ? (
                <BestOfExtendedTradeEditorialDepth slug={slug} />
              ) : null}

              {isRoofersGeorgetown ? (
                <div className="not-prose mt-10">
                  <FlagshipYouTubeEmbed
                    id="flagship-video-best-roofers"
                    heading="Video: what hail damage can look like"
                    summary="Examples of hail marks and collateral metal damage that belong in photo sets before insurance or cash-pay scopes are compared."
                    youtubeId={FLAGSHIP_VIDEO_BEST_ROOFERS.youtubeId}
                    iframeTitle="YouTube video: examples of roof hail damage"
                  />
                </div>
              ) : null}

              {isRoofersGeorgetown ? <BestOfRooferEditorialDepth /> : null}

              <div className="mt-8">
                {isPlumbersGeorgetown ? (
                  <div className="space-y-10 text-ink">
                    <section>
                      <h2 className="text-2xl font-semibold tracking-tight text-ink">
                        How to compare plumbers in Georgetown
                      </h2>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                        The plumbers listed below are based in, or clearly serve, Georgetown, TX and the immediate
                        surrounding area. They show up in public data with real addresses or service areas tied to
                        Georgetown, publish working phone numbers and websites, and have visible customer feedback on
                        responsiveness and communication. This section explains how we treat “top rated” as more than a
                        single star number.
                      </p>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                        We start from public ratings and review counts, then look at whether the company appears to do
                        steady day-in, day-out plumbing work—not just one or two categories. Licensing, insurance,
                        current pricing, and job fit still need independent confirmation. Trade fundamentals live on{" "}
                        <Link href="/services/plumber-georgetown-tx" className="font-semibold text-brand">
                          the Georgetown plumbing guide
                        </Link>
                        .
                      </p>
                      <div className="mt-5 rounded-xl border border-ink/10 bg-surface p-4 text-sm text-muted shadow-sm">
                        <div className="font-semibold text-ink">Quick takeaways for Georgetown homeowners</div>
                        <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
                          <li>
                            A plumber’s <span className="font-semibold text-ink">diagnosis process</span> matters
                            more than their sales pitch—especially for recurring clogs and leak tracing.
                          </li>
                          <li>
                            In Georgetown, <span className="font-semibold text-ink">slab foundations</span> and
                            hard water make shutoffs, cartridges, and water heaters fail in predictable ways.
                          </li>
                          <li>
                            When water is actively damaging a home, the first question is usually{" "}
                            <span className="font-semibold text-ink">“How do we stop damage safely first?”</span>{" "}
                            and then “What is the permanent fix?”
                          </li>
                        </ul>
                      </div>
                    </section>

                    <section>
                      <h2 className="text-2xl font-semibold tracking-tight text-ink">
                        What to Look for in a Plumber
                      </h2>
                      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
                        <li>
                          <span className="font-semibold text-ink">Texas license and insurance:</span> confirm the
                          plumber holds an active state license and carries appropriate liability coverage. This matters
                          for any work that touches water heaters, gas lines, or major piping.
                        </li>
                        <li>
                          <span className="font-semibold text-ink">Clear diagnosis and options:</span> a good
                          plumber explains what they think is happening, how they will confirm it, and what the repair
                          and replacement paths look like—in plain language.
                        </li>
                        <li>
                          <span className="font-semibold text-ink">Written estimates:</span> ask how pricing works
                          (flat-rate vs time-and-materials) and request a written scope before larger jobs start so
                          there are no surprises.
                        </li>
                        <li>
                          <span className="font-semibold text-ink">Local experience:</span> Georgetown homes sit on
                          slabs, see hard water, and often have irrigation tie-ins. Look for companies that sound
                          comfortable with slab leaks, main-line work, and water heater issues common in the area.
                        </li>
                        <li>
                          <span className="font-semibold text-ink">Communication and follow-through:</span> notice
                          how quickly they respond, whether they keep appointment windows, and how clearly they explain
                          what was done and what to watch for next.
                        </li>
                      </ul>
                      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="rounded-xl border border-ink/10 bg-surface p-4 text-sm text-muted shadow-sm">
                          <div className="font-semibold text-ink">What “good diagnosis” looks like</div>
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
                        <div className="rounded-xl border border-ink/10 bg-surface p-4 text-sm text-muted shadow-sm">
                          <div className="font-semibold text-ink">Georgetown-specific realities</div>
                          <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
                            <li>
                              <span className="font-semibold text-ink">Hard water:</span> faster wear on cartridges
                              and valves; periodic maintenance can prevent “mystery drips.”
                            </li>
                            <li>
                              <span className="font-semibold text-ink">Slabs:</span> leaks are often hidden; early
                              signs matter (hot spots, sound of water, bill spikes).
                            </li>
                            <li>
                              <span className="font-semibold text-ink">Irrigation tie-ins:</span> yard leaks can
                              mimic main line issues; good plumbers isolate before digging.
                            </li>
                          </ul>
                        </div>
                      </div>
                    </section>

                    <section>
                      <h2 className="text-2xl font-semibold tracking-tight text-ink">
                        Average Plumbing Costs in Georgetown TX
                      </h2>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                        No two jobs are identical, and every company has its own pricing structure, but Georgetown-area
                        plumbing work tends to fall into recognizable planning bands. Treat published ranges as
                        budgeting guidance; written estimates for the specific scope are the decision document.
                      </p>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                        Two notes that matter locally: first, after-hours and weekend calls can change the base service
                        fee; second, repairs that involve drywall, flooring, or concrete often have a plumbing cost and a
                        separate restoration cost. Clear scopes name which parts of the job the plumber owns and what
                        other trades handle.
                      </p>
                      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
                        <li>
                          <span className="font-semibold text-ink">Standard service call:</span> many plumbers
                          charge a diagnostic or service-call fee in the low-to-mid hundreds of dollars, sometimes
                          credited toward approved repairs on the same visit.
                        </li>
                        <li>
                          <span className="font-semibold text-ink">Minor repairs:</span> addressing a leaking
                          shutoff, replacing a supply line, swapping a trap, or clearing a straightforward clog
                          typically lands in the lower hundreds depending on access, parts, and scheduling.
                        </li>
                        <li>
                          <span className="font-semibold text-ink">Water heater replacements:</span> full tank or
                          tankless replacements are commonly quoted in the many-thousands once equipment, labor,
                          haul-away, and code-related adjustments are included.
                        </li>
                        <li>
                          <span className="font-semibold text-ink">Sewer and drain work:</span> cabling or jetting
                          a main line is often a few hundred dollars; camera inspections, spot repairs, or more
                          extensive sewer work are significantly higher and depend on layout and access.
                        </li>
                        <li>
                          <span className="font-semibold text-ink">Slab leaks and repipes:</span> locating and
                          repairing leaks under a slab, or replacing larger sections of pipe, can run into the
                          many-thousands once plumbing, restoration, and finish work are accounted for.
                        </li>
                      </ul>
                        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                          Deeper cost context for specific problems lives in focused articles such as the{" "}
                          <Link
                            href="/blog/emergency-plumber-cost-georgetown-tx"
                            className="font-semibold text-brand"
                          >
                            emergency plumber cost guide for Georgetown
                          </Link>
                          . For a step-by-step hiring checklist, see{" "}
                          <Link
                            href="/blog/how-to-choose-a-reliable-plumber-georgetown-tx"
                            className="font-semibold text-brand"
                          >
                            how to choose a reliable plumber in Georgetown TX
                          </Link>
                          . Broader system work often sits next to{" "}
                          <Link
                            href="/best/top-hvac-companies-georgetown-tx"
                            className="font-semibold text-brand"
                          >
                            top HVAC companies in Georgetown
                          </Link>{" "}
                          and{" "}
                          <Link href="/best/best-roofers-georgetown-tx" className="font-semibold text-brand">
                            leading roofers in Georgetown
                          </Link>
                          .
                        </p>
                    </section>

                    <section>
                      <h2 className="text-2xl font-semibold tracking-tight text-ink">
                        Emergency Plumbing Services in Georgetown
                      </h2>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                        Not every plumbing issue is an emergency, but some clearly are. In Georgetown, TX, the main
                        triggers for true emergency service are active water damage, sewage backing up into fixtures, or
                        safety concerns around gas and water heaters.
                      </p>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                        Active leaking: stop damage first—nearest fixture valve if it works, then the main shutoff.
                        Locating the main on a calm day matters in Georgetown; after-hours emergencies go worse when the
                        valve is still a mystery while water spreads across flooring.
                      </p>
                      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
                        <li>
                          <span className="font-semibold text-ink">Active leaks that cannot be contained:</span> water
                          coming through ceilings, soaking floors, or flowing from a burst line where shutoffs are not
                          working should be addressed quickly.
                        </li>
                        <li>
                          <span className="font-semibold text-ink">Sewer and main-line backups:</span> multiple
                          fixtures backing up at once, or wastewater returning through tubs and floor drains, calls for
                          prompt professional help.
                        </li>
                        <li>
                          <span className="font-semibold text-ink">No water to the home:</span> a main break or
                          failed shutoff that leaves the house without water is usually treated as urgent.
                        </li>
                      </ul>
                      <div className="mt-5 rounded-xl border border-ink/10 bg-surface p-4 text-sm text-muted shadow-sm">
                        <div className="font-semibold text-ink">What to ask on an emergency call</div>
                        <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
                          <li>Is this visit for stabilization, a permanent repair, or both?</li>
                          <li>Is there an after-hours fee or minimum service charge?</li>
                          <li>Will findings be documented (photos/video) for insurance or landlord records?</li>
                          <li>What should be avoided until the repair is complete (toilets, laundry, dishwasher)?</li>
                        </ul>
                      </div>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                        For those scenarios, shut water off when it can be done safely, then contact a plumber who
                        clearly describes after-hours or emergency handling. Cost perspective lives in the emergency
                        pricing guide above; use it alongside quotes from the companies listed on this page.
                      </p>
                    </section>

                  </div>
                ) : isHvacGeorgetown ? (
                  <div className="space-y-10 text-ink">
                    <section>
                      <h2 className="text-2xl font-semibold tracking-tight text-ink">
                        How to compare HVAC companies in Georgetown
                      </h2>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                        Georgetown homeowners depend on HVAC through long Central Texas summers and short winter cold
                        snaps. Small issues—weak airflow, a struggling outdoor unit, a clogged drain line—can turn into
                        a no-cool call fast when heat pushes systems to run long hours.
                      </p>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                        Georgetown also has a mix of home types that change what “good HVAC” looks like in practice:
                        two-story layouts with hot upstairs rooms, newer open floorplans that need balanced airflow, and
                        older homes where insulation, returns, and duct paths may not match modern comfort expectations.
                        Stronger companies explain what they observed, what the fix accomplishes, and what to monitor
                        afterward—rather than jumping straight to replacement.
                      </p>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                        This shortlist is for comparing <strong>HVAC companies that serve Georgetown, TX</strong> on
                        practical criteria: reachability, evidence of residential heating/cooling work, transparent
                        service offerings, and options explained without pressure. Trade fundamentals live on{" "}
                        <Link href="/services/hvac-georgetown-tx" className="font-semibold text-brand">
                          the Georgetown HVAC guide
                        </Link>
                        .
                      </p>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                        No-cool troubleshooting notes:{" "}
                        <Link href="/blog/why-your-ac-is-not-cooling-georgetown-tx" className="font-semibold text-brand">
                          why AC stops cooling in Georgetown TX
                        </Link>
                        . Pricing expectations:{" "}
                        <Link href="/blog/ac-repair-cost-georgetown-tx" className="font-semibold text-brand">
                          AC repair cost in Georgetown TX
                        </Link>
                        . Early warning signs:{" "}
                        <Link href="/blog/signs-you-need-hvac-repair-georgetown-tx" className="font-semibold text-brand">
                          signs HVAC repair is due
                        </Link>
                        .
                      </p>
                      <div className="mt-5 rounded-xl border border-ink/10 bg-surface p-5 shadow-sm">
                        <div className="text-sm font-semibold text-ink">Quick takeaways for Georgetown homeowners</div>
                        <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted">
                          <li>
                            When the AC runs but the house warms up, clear symptom labels (no-cool vs weak airflow vs
                            certain rooms hot) and a first-check plan shorten the visit.
                          </li>
                          <li>
                            Replacement scopes should name equipment model numbers and mention airflow and ductwork, not
                            just “new unit.”
                          </li>
                          <li>
                            When schedules are full, stronger companies still offer triage steps and realistic ETAs—
                            clear communication beats vague promises.
                          </li>
                        </ul>
                      </div>
                    </section>

                    <section>
                      <h2 className="text-2xl font-semibold tracking-tight text-ink">
                        Common HVAC Services in Georgetown
                      </h2>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                        Most Georgetown, TX HVAC calls fall into three buckets: restore cooling/heating quickly,
                        stabilize comfort across rooms, or plan a replacement that actually fits the home. Here are the
                        most common service categories and what they typically include.
                      </p>
                      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
                        <li>
                          <span className="font-semibold text-ink">AC repair and diagnostics:</span> capacitors,
                          contactors, refrigerant issues, sensor problems, and thermostat troubleshooting when the house
                          will not cool.
                        </li>
                        <li>
                          <span className="font-semibold text-ink">Preventive maintenance:</span> seasonal tune-ups
                          that include coil cleaning, filter changes, basic electrical checks, and drain line checks to
                          reduce mid-summer breakdowns.
                        </li>
                        <li>
                          <span className="font-semibold text-ink">System replacement:</span> swapping out older
                          equipment for newer, more efficient systems sized for Georgetown’s mix of heat, humidity, and
                          winter cold snaps.
                        </li>
                        <li>
                          <span className="font-semibold text-ink">Duct and airflow work:</span> correcting
                          comfort issues between floors, sealing or modifying duct runs, and addressing hot rooms that
                          never quite cool down.
                        </li>
                        <li>
                          <span className="font-semibold text-ink">Indoor air quality add-ons:</span> filtration
                          upgrades, dehumidification, and other accessories installed alongside existing HVAC systems.
                        </li>
                      </ul>
                      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="rounded-xl border border-ink/10 bg-surface p-5 shadow-sm">
                          <div className="text-sm font-semibold text-ink">AC repair (no-cool / weak airflow)</div>
                          <p className="mt-2 text-sm leading-relaxed text-muted">
                            Stronger providers start with a diagnosis that can be followed: what was measured, what
                            failed, and what happens if nothing changes. Comfort issues (one room always hotter) often
                            need airflow balancing or duct work in the plan, not only a part swap.
                          </p>
                          <p className="mt-2 text-sm leading-relaxed text-muted">
                            In Georgetown summers, it is common for failures to show up during peak afternoon load. A
                            good company will ask about timing (only hottest hours vs all day), thermostat behavior, and
                            whether airflow feels weak at multiple vents.
                          </p>
                        </div>
                        <div className="rounded-xl border border-ink/10 bg-surface p-5 shadow-sm">
                          <div className="text-sm font-semibold text-ink">Installation / replacement</div>
                          <p className="mt-2 text-sm leading-relaxed text-muted">
                            Replacement is a project, not a product. Compare written scopes that include equipment
                            model numbers, efficiency ratings, warranty terms, and any ductwork or electrical items
                            included. If a quote is vague, it is hard to compare fairly.
                          </p>
                          <p className="mt-2 text-sm leading-relaxed text-muted">
                            When replacement is driven by comfort (hot rooms, humidity, noisy operation), written plans
                            should address airflow and return placement. New equipment without airflow fixes often
                            leaves the original comfort problem intact.
                          </p>
                        </div>
                      </div>
                      <div className="mt-5 rounded-xl border border-ink/10 bg-surface p-5 shadow-sm">
                        <div className="text-sm font-semibold text-ink">Maintenance (what a useful tune-up includes)</div>
                        <p className="mt-2 text-sm leading-relaxed text-muted">
                          “Maintenance” should produce something measurable: improved reliability, better comfort, or
                          fewer emergency calls. For Georgetown homeowners, a useful maintenance visit typically includes
                          coil and drain checks, basic electrical inspection, filter guidance, and a short summary of
                          what to monitor over the next 30–60 days.
                        </p>
                      </div>
                    </section>

                    <section>
                      <h2 className="text-2xl font-semibold tracking-tight text-ink">
                        Typical HVAC Costs in Georgetown TX
                      </h2>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                        Georgetown pricing moves with brand, equipment size and age, access to the unit, and scheduling
                        window. The ranges below reflect common Central Texas scenarios; written quotes for the specific
                        system are the decision document.
                      </p>
                      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
                        <li>
                          <span className="font-semibold text-ink">Service call and basic diagnosis:</span> often a
                          fee in the low-to-mid hundreds, which may be applied to approved repairs on the same visit.
                        </li>
                        <li>
                          <span className="font-semibold text-ink">Typical repairs:</span> components like
                          capacitors, contactors, or simple drain line clears can fall in the lower hundreds, depending
                          on parts and access.
                        </li>
                        <li>
                          <span className="font-semibold text-ink">Major repairs:</span> compressor issues, coil
                          replacements, or extensive refrigerant problems are significantly more and can approach or
                          exceed the cost of replacement on older systems.
                        </li>
                        <li>
                          <span className="font-semibold text-ink">Full system replacement:</span> replacing both
                          indoor and outdoor units, especially with higher-efficiency equipment, is commonly quoted in
                          the many-thousands depending on tonnage and scope of duct work.
                        </li>
                        <li>
                          <span className="font-semibold text-ink">Maintenance plans:</span> annual or biannual
                          maintenance memberships are usually priced to cover one or two tune-ups per year at a modest
                          discount compared to one-off visits.
                        </li>
                      </ul>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                        Two pricing details that trip up Georgetown homeowners: after-hours minimums (which can change
                        the base fee) and “scope gaps” (for example, an HVAC quote that excludes ductwork, electrical
                        corrections, or thermostat changes). When comparing bids, confirm what is included and what is
                        explicitly excluded.
                      </p>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                        Replacement budget drivers are covered in{" "}
                        <Link href="/blog/cost-to-replace-hvac-georgetown" className="font-semibold text-brand">
                          cost to replace HVAC in Georgetown, TX
                        </Link>
                        .
                      </p>
                    </section>

                    <section>
                      <h2 className="text-2xl font-semibold tracking-tight text-ink">
                        Emergency HVAC Service in Georgetown
                      </h2>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                        In Georgetown, “emergency HVAC” usually means one of two things: <strong>no cooling during peak
                        heat</strong> or a system that is unsafe to keep running (repeated failed starts, tripping
                        breakers, or unusual burning smell). When schedules are full, stronger companies still offer
                        clear triage guidance and realistic ETAs.
                      </p>
                      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
                        <li>
                          <span className="font-semibold text-ink">Before calling:</span> replace an overdue
                          filter, confirm breakers are not tripped, and note thermostat behavior (error codes, short
                          cycling, warm air).
                        </li>
                        <li>
                          <span className="font-semibold text-ink">What to say on the phone:</span> describe the
                          symptom clearly (no cool vs weak airflow vs uneven rooms) and whether vulnerable occupants are
                          in the home.
                        </li>
                        <li>
                          <span className="font-semibold text-ink">What to avoid:</span> do not open sealed system
                          components or attempt refrigerant work. Burning smell or smoke: shut the system off and
                          request urgent service.
                        </li>
                      </ul>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                        Same-day scheduling works better with specific symptom language: “system runs but blows warm,”
                        “outdoor unit not spinning,” “thermostat shows error code,” or “water near the indoor unit.”
                        Those details help the company schedule the right visit type and reduce wasted time on arrival.
                      </p>
                    </section>

                  </div>
                ) : isRoofersGeorgetown ? (
                  <div className="space-y-10 text-ink">
                    <section>
                      <h2 className="text-2xl font-semibold tracking-tight text-ink">
                        How to compare roofers in Georgetown
                      </h2>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                        The roofers listed below are based in, or clearly serve, Georgetown, TX and nearby communities.
                        “Top” on this page is not a marketing claim—it is a practical filter using public business data
                        (ratings, review counts, reachability, and published websites/phones) plus the signals that matter
                        for roofing work: clear service scope, realistic timelines, and documentation.
                      </p>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                        Roof problems often show up at the worst moment: a slow leak that finally stains a ceiling after a
                        heavy rain, hail damage missed until an inspection, or shingles that start lifting in wind. A
                        strong roofing company explains what is urgent (stop active water intrusion) versus what can be
                        planned (replacement, upgrades, ventilation improvements), and puts the scope in writing for
                        apples-to-apples comparison.
                      </p>
                      <div className="mt-5 rounded-xl border border-ink/10 bg-surface p-5 shadow-sm">
                        <div className="text-sm font-semibold text-ink">Quick takeaways for Georgetown homeowners</div>
                        <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted">
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
                      <h2 className="text-2xl font-semibold tracking-tight text-ink">
                        Common Roofing Services in Georgetown
                      </h2>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                        Georgetown roofs fail in predictable ways. Summer heat accelerates aging, wind lifts edges, and
                        hail can bruise shingles or damage vents and caps. The services below cover what most homeowners
                        actually need—especially after storms or when a leak appears.
                      </p>
                      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
                        <li>
                          <span className="font-semibold text-ink">Leak diagnosis and roof repair:</span> tracing the
                          entry point and repairing shingles, flashing, valleys, vents, pipe boots, chimney transitions,
                          and penetrations.
                        </li>
                        <li>
                          <span className="font-semibold text-ink">Storm inspection and documentation:</span> post
                          wind/hail inspections with photos and a written summary usable for planning or insurance.
                        </li>
                        <li>
                          <span className="font-semibold text-ink">Roof replacement:</span> tear-off, underlayment,
                          flashing, ventilation, drip edge, and new roofing materials installed to manufacturer specs.
                        </li>
                        <li>
                          <span className="font-semibold text-ink">Ventilation and attic heat management:</span>
                          adjustments to intake/exhaust ventilation to reduce trapped heat that shortens shingle life and
                          stresses HVAC performance.
                        </li>
                        <li>
                          <span className="font-semibold text-ink">Gutter and drainage coordination:</span> repairing
                          or replacing gutters and downspouts where water management contributes to fascia/edge damage.
                        </li>
                      </ul>
                      <div className="mt-5 rounded-xl border border-ink/10 bg-surface p-5 shadow-sm">
                        <div className="text-sm font-semibold text-ink">What to ask during a roof inspection</div>
                        <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted">
                          <li>Where is the leak entering, and how was that confirmed?</li>
                          <li>Is the damage isolated, or are there multiple failure points?</li>
                          <li>What parts will be replaced (flashing/boots/underlayment), not just “shingles”?</li>
                          <li>Can photos and a written scope be provided before work is approved?</li>
                        </ul>
                      </div>
                    </section>

                    <section>
                      <h2 className="text-2xl font-semibold tracking-tight text-ink">
                        Roof Repair vs Roof Replacement
                      </h2>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                        The decision is usually about <strong>scope</strong> and <strong>risk</strong>. A good repair is
                        targeted, documented, and addresses the real failure point. Replacement is appropriate when the
                        roof is near end-of-life, has widespread damage, or when repeated repairs are turning into a
                        pattern.
                      </p>
                      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="rounded-xl border border-ink/10 bg-surface p-5 shadow-sm">
                          <div className="text-sm font-semibold text-ink">When repair often makes sense</div>
                          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted">
                            <li>Leak traced to a specific flashing/boot/valley issue</li>
                            <li>Wind lifted a small section but the field shingles are sound</li>
                            <li>Limited hail damage with minimal granule loss and no widespread bruising</li>
                            <li>Roof is otherwise in good condition and not near end-of-life</li>
                          </ul>
                        </div>
                        <div className="rounded-xl border border-ink/10 bg-surface p-5 shadow-sm">
                          <div className="text-sm font-semibold text-ink">When replacement is often smarter</div>
                          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted">
                            <li>Multiple leaks or recurring repairs across seasons</li>
                            <li>Widespread hail/wind damage or brittle shingles throughout</li>
                            <li>Underlayment/decking issues discovered during inspection</li>
                            <li>An integrated plan for ventilation, flashing, and edge details is required</li>
                          </ul>
                        </div>
                      </div>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                        The most expensive mistake is replacing a roof that could have been repaired—or repairing a roof
                        that is already failing broadly. Stronger scopes include photos, the specific failure point, and
                        expected life / recurrence risk if repair is chosen now.
                      </p>
                    </section>

                    <section>
                      <h2 className="text-2xl font-semibold tracking-tight text-ink">
                        Typical Roofing Costs in Georgetown TX
                      </h2>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                        Roofing prices vary widely because every roof is different: pitch, height, material, number of
                        penetrations, decking condition, and how much of the job is repair versus full replacement. The
                        ranges below are budgeting guidance; a written estimate for the specific home is the decision
                        document.
                      </p>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                        In Georgetown, two cost drivers show up repeatedly: <strong>storm volume</strong> (high demand can
                        tighten schedules) and <strong>scope details</strong> (flashing/vents/ventilation/decking). A bid
                        that looks “cheap” may be missing critical components that matter long-term.
                      </p>
                      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
                        <li>
                          <span className="font-semibold text-ink">Roof inspection / diagnostic visit:</span> often
                          free for estimates, or a modest fee if it includes detailed leak tracing or documentation.
                        </li>
                        <li>
                          <span className="font-semibold text-ink">Small roof repairs:</span> many common repairs
                          land in the low-to-mid hundreds, depending on access, steepness, and materials.
                        </li>
                        <li>
                          <span className="font-semibold text-ink">Flashing/vent/boot repairs:</span> typically
                          several hundred dollars when replacement of components is required.
                        </li>
                        <li>
                          <span className="font-semibold text-ink">Storm-related repairs:</span> can range from a few
                          hundred to a few thousand depending on how widespread the damage is.
                        </li>
                        <li>
                          <span className="font-semibold text-ink">Full roof replacement:</span> commonly lands in
                          the many-thousands, and can go much higher for large roofs, steep pitches, premium materials,
                          or significant decking/ventilation work.
                        </li>
                      </ul>
                      <div className="mt-5 rounded-xl border border-ink/10 bg-surface p-5 shadow-sm">
                        <div className="text-sm font-semibold text-ink">How to compare quotes cleanly</div>
                        <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted">
                          <li>Confirm material type, brand/model, and underlayment details in writing</li>
                          <li>Ask about flashing, drip edge, vents, and pipe boots (include vs exclude)</li>
                          <li>Ask who handles decking replacement if it’s discovered during tear-off</li>
                          <li>Review warranty terms (workmanship + manufacturer)</li>
                        </ul>
                      </div>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                        Georgetown planning context starts on{" "}
                        <Link href="/services/roofer-georgetown-tx" className="font-semibold text-brand">
                          roofing service in Georgetown, TX
                        </Link>
                        , with cost notes in{" "}
                        <Link href="/blog/roof-repair-cost-georgetown-tx" className="font-semibold text-brand">
                          roof repair cost in Georgetown
                        </Link>{" "}
                        and replacement timing signals in{" "}
                        <Link href="/blog/signs-you-may-need-a-new-roof-georgetown-tx" className="font-semibold text-brand">
                          signs a new roof may be due
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

              {directoryProviders.length ? (
                <>
                  <ProviderCardSection providers={directoryProviders} />
                  {bestOfAdSlot ? (
                    <div className="mt-8">
                      <AdUnit slotId={bestOfAdSlot} />
                    </div>
                  ) : null}
                  {headToHeadComparisons.length ? (
                    <p className="mt-5 text-sm text-muted">
                      <Link href="/compare" className="font-semibold text-brand hover:underline">
                        See head-to-head comparisons →
                      </Link>
                      {" "}
                      ({headToHeadComparisons.map((c) => `${c.providerA.name} vs ${c.providerB.name}`).join("; ")})
                    </p>
                  ) : null}
                  <BestOfFaqSection faqs={bestOfPageFaqs} />
                  <SourcesVerificationStrip />
                </>
              ) : null}

              {recommended.length ? (
                <section className="mt-12">
                  <h2 className="text-3xl font-semibold tracking-tight text-ink">Recommended Services</h2>
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
                  <h2 className="text-3xl font-semibold tracking-tight text-ink">More ways to compare</h2>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                    Core service guides cover scope and cost drivers before written estimates are requested.
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
                  </div>
                </section>
              ) : null}

              {relatedHubLinks ? (
                <HubRelatedLinks
                  title="Related for this trade"
                  links={relatedHubLinks}
                  description="Service guide, cost guide, provider comparisons, and neighborhood hubs for this category."
                />
              ) : null}

              <section className="mt-12">
                <h2 className="text-3xl font-semibold tracking-tight text-ink">Related guides and neighborhoods</h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                  Continue with service fundamentals, nearby neighborhood pages, and related homeowner guides.
                </p>
                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {relatedServiceSlug ? (
                    <LinkCard
                      href={canonicalServicePathForLinks(`/services/${relatedServiceSlug}`)}
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
                <h2 className="text-3xl font-semibold tracking-tight text-ink">Explore Other Categories</h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
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
                  <h2 className="text-3xl font-semibold tracking-tight text-ink">Helpful Guides</h2>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
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
              <div className="overflow-hidden rounded-2xl border border-ink/10 bg-surface shadow-sm">
                <div className="bg-accent px-6 py-3.5 text-xs font-semibold uppercase tracking-wide text-white">
                  Directory navigation
                </div>
                <div className="space-y-3 px-6 pb-6 pt-4 text-sm">
                  <Link href="#providers" className="block font-semibold text-ink hover:underline">
                    Jump to provider cards
                  </Link>
                  <Link href="/methodology" className="block font-semibold text-ink hover:underline">
                    Read our methodology
                  </Link>
                  {relatedServiceSlug ? (
                    <Link href={canonicalServicePathForLinks(`/services/${relatedServiceSlug}`)} className="block font-semibold text-ink hover:underline">
                      {relatedService ? `Read: ${relatedService.title}` : "Read our service guide"}
                    </Link>
                  ) : null}
                  <p className="pt-1 text-xs leading-relaxed text-muted">
                    We don’t take service requests or route jobs. Use the outbound links on each card to contact providers directly.
                  </p>
                </div>
              </div>
            }
          />
      </section>
      {primaryCallProvider ? (
        <StickyCallBar
          providerName={primaryCallProvider.name}
          phone={primaryCallProvider.phone}
          category={primaryCallProvider.category}
        />
      ) : null}
    </PageShell>
    {coreAlsoCompareSlugs.has(best.slug) ? (
      <BestAlsoCompareBar links={getAlsoCompareLinksForBestSlug(best.slug)} />
    ) : null}
    </>
  );
}

