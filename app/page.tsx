import { BusinessListingDescription } from "../components/BusinessListingDescription";
import CTASection from "../components/CTASection";
import Container from "../components/Container";
import EmailCaptureSitewide from "../components/EmailCaptureSitewide";
import StickyHomeEmailCapture from "../components/StickyHomeEmailCapture";
import LinkCard from "../components/LinkCard";
import { ButtonLink } from "../components/Button";
import Link from "next/link";
import type { Metadata } from "next";
import { pageSeoMetadata } from "../lib/page-seo";
import { CORE_BEST_SLUGS, CORE_SERVICE_SLUGS } from "../lib/pageContentRegistry";
import {
  EXTENDED_PROVIDER_GROUPS,
  isExtendedBestSlug,
  isExtendedServiceSlug,
  showExtendedHomeServices,
} from "../lib/public-site-scope";
import { getBlog, getBest, getLocations, getServices } from "../lib/site-content";
import businesses from "../lib/businesses.json";
import {
  BUSINESS_LINK_VIEW_ON_GOOGLE_MAPS,
  BUSINESS_LINK_VISIT_WEBSITE,
  PROVIDER_GROUP_LINKS,
  externalBusinessLinkProps,
  getBusinessMapsUrl,
  getBusinessOutboundUrl,
  getBusinessWebsiteUrl,
  normalizeBusinessGroup,
  type Business,
  type ProviderGroup,
} from "../lib/businesses";

function topProvidersForGroup(list: Business[], group: ProviderGroup, limit: number) {
  return list
    .filter((b) => normalizeBusinessGroup(b) === group)
    .sort((a, b) => (b.rating !== a.rating ? b.rating - a.rating : b.reviews - a.reviews))
    .slice(0, limit);
}

export const metadata: Metadata = pageSeoMetadata({
  titleSegment: "Find Trusted Home Service Companies in Georgetown, Texas",
  description:
    "Compare local electricians, landscapers, pest control, foundation repair, house cleaners, plumbers, HVAC companies, and roofers in Georgetown, TX with directory highlights, best-of guides, and homeowner tips.",
  pathname: "/",
  ogType: "website",
});

export default function Home() {
  const services = getServices();
  const locations = getLocations();
  const best = getBest();
  const blog = getBlog();
  const coreHomeServices = (CORE_SERVICE_SLUGS as readonly string[])
    .filter((slug) => showExtendedHomeServices() || !isExtendedServiceSlug(slug))
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
  const coreHomeBest = (CORE_BEST_SLUGS as readonly string[])
    .filter((slug) => showExtendedHomeServices() || !isExtendedBestSlug(slug))
    .map((slug) => best.find((b) => b.slug === slug))
    .filter((b): b is NonNullable<typeof b> => Boolean(b));
  const allBusinesses = businesses as Business[];
  const homepageTradeOrder: ProviderGroup[] = showExtendedHomeServices()
    ? (["plumber", "hvac", "roofer", ...EXTENDED_PROVIDER_GROUPS] as ProviderGroup[])
    : ["plumber", "hvac", "roofer"];
  const tradeHomepageTitle: Record<ProviderGroup, string> = {
    plumber: "Plumbers",
    hvac: "HVAC",
    roofer: "Roofers",
    electrician: "Electricians",
    landscaping: "Landscaping",
    pest_control: "Pest control",
    foundation_repair: "Foundation",
    house_cleaning: "Cleaning",
  };
  const topLocalGroups: { title: string; key: ProviderGroup }[] = homepageTradeOrder.map((key) => ({
    title: tradeHomepageTitle[key],
    key,
  }));

  return (
    <div className="bg-gray-50 pb-40 md:pb-44">
      <Container>
        <section className="py-10 md:py-12">
          <div className="flex flex-col gap-10 md:gap-12">
            <div className="min-w-0">
              <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-700">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Georgetown home services directory + homeowner guides
              </div>

              <h1 className="mt-5 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
                Find Trusted Home Service Companies in Georgetown, Texas
              </h1>

              <p className="mt-4 max-w-xl text-lg leading-relaxed text-gray-700">
                Compare local home service companies—electrical, landscaping, pest control, foundation repair, cleaning, plumbing, HVAC, and roofing—with practical guides and directory pages.
              </p>

              <div className="mt-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <ButtonLink href="#providers" className="text-sm">
                    Browse Top Providers
                  </ButtonLink>
                  <ButtonLink href="/services" variant="secondary" className="text-sm">
                    Explore Service Guides
                  </ButtonLink>
                </div>
              </div>

              <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-md">
                <div className="text-sm font-semibold text-gray-900">Browse by category</div>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-700">
                  Choose a category to see comparison guides, service pages, and common local issues (like clogged drains, AC not cooling, and roof leaks after storms).
                </p>
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  <Link
                    href="/services/plumber-georgetown-tx"
                    className="rounded-lg border border-gray-200 bg-gray-50 p-4 transition hover:border-gray-300 hover:bg-white"
                  >
                    <div className="text-sm font-semibold text-gray-900">Plumbing</div>
                    <div className="mt-1 text-sm text-gray-700">Clogged drain, leak detection, emergency plumber.</div>
                    <div className="mt-2 text-xs font-semibold text-blue-700">Explore plumbing →</div>
                  </Link>
                  <Link
                    href="/services/hvac-georgetown-tx"
                    className="rounded-lg border border-gray-200 bg-gray-50 p-4 transition hover:border-gray-300 hover:bg-white"
                  >
                    <div className="text-sm font-semibold text-gray-900">HVAC</div>
                    <div className="mt-1 text-sm text-gray-700">AC not cooling, uneven cooling, repairs vs replacement.</div>
                    <div className="mt-2 text-xs font-semibold text-blue-700">Explore HVAC →</div>
                  </Link>
                  <Link
                    href="/services/roofer-georgetown-tx"
                    className="rounded-lg border border-gray-200 bg-gray-50 p-4 transition hover:border-gray-300 hover:bg-white"
                  >
                    <div className="text-sm font-semibold text-gray-900">Roofing</div>
                    <div className="mt-1 text-sm text-gray-700">Roof leak, storm damage, shingle repair, estimates.</div>
                    <div className="mt-2 text-xs font-semibold text-blue-700">Explore roofing →</div>
                  </Link>
                  {showExtendedHomeServices() ? (
                    <>
                      <Link
                        href="/services/electrician-georgetown-tx"
                        className="rounded-lg border border-gray-200 bg-gray-50 p-4 transition hover:border-gray-300 hover:bg-white"
                      >
                        <div className="text-sm font-semibold text-gray-900">Electrical</div>
                        <div className="mt-1 text-sm text-gray-700">Panels, circuits, outlets, EV charger prep.</div>
                        <div className="mt-2 text-xs font-semibold text-blue-700">Explore electrical →</div>
                      </Link>
                      <Link
                        href="/services/landscaping-georgetown-tx"
                        className="rounded-lg border border-gray-200 bg-gray-50 p-4 transition hover:border-gray-300 hover:bg-white"
                      >
                        <div className="text-sm font-semibold text-gray-900">Landscaping</div>
                        <div className="mt-1 text-sm text-gray-700">Lawn care, beds, mulch, irrigation tuning.</div>
                        <div className="mt-2 text-xs font-semibold text-blue-700">Explore landscaping →</div>
                      </Link>
                      <Link
                        href="/services/pest-control-georgetown-tx"
                        className="rounded-lg border border-gray-200 bg-gray-50 p-4 transition hover:border-gray-300 hover:bg-white"
                      >
                        <div className="text-sm font-semibold text-gray-900">Pest control</div>
                        <div className="mt-1 text-sm text-gray-700">Ants, roaches, rodents, perimeter plans.</div>
                        <div className="mt-2 text-xs font-semibold text-blue-700">Explore pest control →</div>
                      </Link>
                      <Link
                        href="/services/foundation-repair-georgetown-tx"
                        className="rounded-lg border border-gray-200 bg-gray-50 p-4 transition hover:border-gray-300 hover:bg-white"
                      >
                        <div className="text-sm font-semibold text-gray-900">Foundation</div>
                        <div className="mt-1 text-sm text-gray-700">Clay soil cracks, drainage, pier and slab.</div>
                        <div className="mt-2 text-xs font-semibold text-blue-700">Explore foundation →</div>
                      </Link>
                      <Link
                        href="/services/house-cleaning-georgetown-tx"
                        className="rounded-lg border border-gray-200 bg-gray-50 p-4 transition hover:border-gray-300 hover:bg-white"
                      >
                        <div className="text-sm font-semibold text-gray-900">House cleaning</div>
                        <div className="mt-1 text-sm text-gray-700">Recurring maid service, deep and move-out cleans.</div>
                        <div className="mt-2 text-xs font-semibold text-blue-700">Explore cleaning →</div>
                      </Link>
                    </>
                  ) : null}
                </div>
              </div>

              <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-md">
                <div className="text-sm font-semibold text-gray-900">Quick links</div>
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <ButtonLink href="/services/ac-not-cooling-georgetown-tx" variant="secondary" className="w-full justify-center px-4 py-2.5 text-sm sm:w-auto">
                    AC not cooling
                  </ButtonLink>
                  <ButtonLink href="/services/clogged-drain-georgetown-tx" variant="secondary" className="w-full justify-center px-4 py-2.5 text-sm sm:w-auto">
                    Clogged drain
                  </ButtonLink>
                  <ButtonLink href="/services/roof-leak-repair-georgetown-tx" variant="secondary" className="w-full justify-center px-4 py-2.5 text-sm sm:w-auto">
                    Roof leak repair
                  </ButtonLink>
                  <ButtonLink href="/blog/how-to-find-a-good-plumber-georgetown-tx" variant="secondary" className="w-full justify-center px-4 py-2.5 text-sm sm:w-auto">
                    How to find a good plumber
                  </ButtonLink>
                </div>
              </div>

              <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-md">
                <div className="text-sm font-semibold text-gray-900">How it works</div>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-700">
                  This site is a directory and guide—browse categories, compare listings on Best Of pages, then contact companies yourself.
                </p>
                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
                  <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                    <div className="text-sm font-semibold text-gray-900">1. Pick a category</div>
                    <p className="mt-2 text-sm leading-relaxed text-gray-700">
                      Start with core trade guides—from electrical and landscaping to plumbing, HVAC, and roofing.
                    </p>
                  </div>
                  <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                    <div className="text-sm font-semibold text-gray-900">2. Compare on Best Of</div>
                    <p className="mt-2 text-sm leading-relaxed text-gray-700">
                      Use methodology, comparisons, and FAQs to shortlist providers.
                    </p>
                  </div>
                  <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                    <div className="text-sm font-semibold text-gray-900">3. Contact providers</div>
                    <p className="mt-2 text-sm leading-relaxed text-gray-700">
                      Open websites or maps from listings—no quote requests through us.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div id="providers" className="scroll-mt-28 rounded-xl border border-gray-200 bg-white p-6 shadow-md sm:p-8">
              <h2 className="text-xl font-semibold tracking-tight text-gray-900">Top Local Providers</h2>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-700">
                Directory highlights from public listing data. Use these as a starting point for comparison, then open the best-of guides for deeper decision support.
              </p>
              <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {topLocalGroups.map(({ title, key }) => (
                  <div key={key} className="rounded-lg bg-gray-50 p-4">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-900">{title}</h3>
                      <Link href={PROVIDER_GROUP_LINKS[key].best} className="text-xs font-semibold text-blue-700 hover:underline">
                        Top Providers
                      </Link>
                    </div>
                    <ul className="mt-3 space-y-3">
                      {topProvidersForGroup(allBusinesses, key, 3).map((business) => {
                        const outbound = getBusinessOutboundUrl(business);
                        const website = getBusinessWebsiteUrl(business);
                        const maps = getBusinessMapsUrl(business);
                        return (
                          <li key={`${key}-${business.name}`} className="text-sm text-gray-700">
                            <div className="font-medium text-gray-900">
                              {outbound ? (
                                <a
                                  href={outbound}
                                  {...externalBusinessLinkProps}
                                  className="text-gray-900 hover:text-blue-700 hover:underline"
                                >
                                  {business.name}
                                </a>
                              ) : (
                                business.name
                              )}
                            </div>
                            <BusinessListingDescription text={business.description} className="mt-1" />
                            <div className="mt-1">
                              {business.rating.toFixed(1)} stars • {business.reviews.toLocaleString()} reviews
                            </div>
                            {website || maps ? (
                              <div className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5">
                                {website ? (
                                  <a
                                    href={website}
                                    {...externalBusinessLinkProps}
                                    className="text-blue-600 hover:text-blue-700"
                                  >
                                    {BUSINESS_LINK_VISIT_WEBSITE}
                                  </a>
                                ) : null}
                                {maps ? (
                                  <a
                                    href={maps}
                                    {...externalBusinessLinkProps}
                                    className="text-blue-600 hover:text-blue-700"
                                  >
                                    {BUSINESS_LINK_VIEW_ON_GOOGLE_MAPS}
                                  </a>
                                ) : null}
                              </div>
                            ) : null}
                          </li>
                        );
                      })}
                    </ul>
                    <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs">
                      <Link href={PROVIDER_GROUP_LINKS[key].service} className="font-semibold text-gray-900 hover:underline">
                        View service page
                      </Link>
                      <span className="text-gray-400">·</span>
                      <Link href={PROVIDER_GROUP_LINKS[key].best} className="font-semibold text-gray-900 hover:underline">
                        Compare top providers
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-10 md:py-12">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
            <h2 className="text-3xl font-semibold tracking-tight text-gray-900">Popular Services</h2>
            <nav
              className="flex shrink-0 flex-wrap items-center gap-x-4 gap-y-1 text-sm font-medium text-gray-700"
              aria-label="Core service pages"
            >
              {coreHomeServices.map((s, i) => (
                <span key={s.slug} className="flex flex-wrap items-center gap-x-4 gap-y-1">
                  {i > 0 ? (
                    <span className="text-gray-300" aria-hidden>
                      ·
                    </span>
                  ) : null}
                  <Link href={`/services/${s.slug}`} className="hover:text-gray-900 hover:underline">
                    {s.serviceType}
                  </Link>
                </span>
              ))}
            </nav>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {coreHomeServices.map((s) => (
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

        <section className="py-10 md:py-12">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
            <h2 className="text-3xl font-semibold tracking-tight text-gray-900">Top Rated Services</h2>
            <nav
              className="flex shrink-0 flex-wrap items-center gap-x-4 gap-y-1 text-sm font-medium text-gray-700"
              aria-label="Best-of guides"
            >
              {coreHomeBest.map((b, i) => (
                <span key={b.slug} className="flex flex-wrap items-center gap-x-4 gap-y-1">
                  {i > 0 ? (
                    <span className="text-gray-300" aria-hidden>
                      ·
                    </span>
                  ) : null}
                  <Link href={`/best/${b.slug}`} className="hover:text-gray-900 hover:underline">
                    {b.title.replace(/ in Georgetown, TX$/, "")}
                  </Link>
                </span>
              ))}
            </nav>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {coreHomeBest.map((b) => (
              <LinkCard
                key={b.slug}
                href={`/best/${b.slug}`}
                title={b.title}
                description={b.description}
                badge="Best Of"
              />
            ))}
          </div>
        </section>

        <section className="py-10 md:py-12">
          <h2 className="text-3xl font-semibold tracking-tight text-gray-900">Best Of</h2>
          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
            {best
              .filter((b) => showExtendedHomeServices() || !isExtendedBestSlug(b.slug))
              .map((b) => (
                <LinkCard
                  key={b.slug}
                  href={`/best/${b.slug}`}
                  title={b.title}
                  description={b.description}
                  badge={l10nLocation(b.locationSlug, locations)}
                />
              ))}
          </div>
        </section>

        <section className="py-10 md:py-12">
          <h2 className="text-3xl font-semibold tracking-tight text-gray-900">From the Blog</h2>
          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
            {blog.map((p) => (
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

        <section className="py-10 md:py-12">
          <EmailCaptureSitewide source="home" offers={["seasonal_checklist", "monthly_reminder"]} defaultOffer="seasonal_checklist" />
        </section>

        <section className="py-10 md:py-12">
          <CTASection
            eyebrow="Find providers"
            title="Browse the directory by category"
            description="Start with top providers, then use service pages and guides to compare options with clearer expectations."
            primaryHref="/best"
            emailFormHref="/#email-capture"
            showDisclaimer
          />
        </section>
      </Container>

      <StickyHomeEmailCapture />
    </div>
  );
}

function l10nLocation(locationSlug: string, locations: ReturnType<typeof getLocations>) {
  return locations.find((l) => l.slug === locationSlug)?.title ?? locationSlug;
}
