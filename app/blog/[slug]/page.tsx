import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AdSenseDisplay from "../../../components/AdSenseDisplay";
import EmailCaptureSitewide from "../../../components/EmailCaptureSitewide";
import BlogArticleBodyWithMidEmail from "../../../components/BlogArticleBodyWithMidEmail";
import LinkCard from "../../../components/LinkCard";
import JsonLd from "../../../components/JsonLd";
import Breadcrumbs from "../../../components/Breadcrumbs";
import PageShell from "../../../components/templates/PageShell";
import TwoColumnPage from "../../../components/templates/TwoColumnPage";
import {
  getBlogBySlug,
  getBestBySlug,
  getBlogSlugs,
  getLocationBySlug,
  getServices,
} from "../../../lib/site-content";
import { adsenseSidebarSlot } from "../../../lib/adsense-config";
import { pageSeoMetadata } from "../../../lib/page-seo";
import { isNoindexSlug } from "../../../lib/public-site-scope";
import { getGeneratedPage } from "../../../lib/generatedPages";
import { blogPageInternalLinks } from "../../../lib/internal-links";
import { getBlogHeroImage } from "../../../lib/blog-hero-images";
import { extractFaqPairs, faqPageJsonLd } from "../../../lib/extract-faq-schema";
import { PRICING_YEAR } from "../../../lib/pricing-data";
import { AUTHOR_NAME, AUTHOR_PROFILE_PATH, authorPersonSchema } from "../../../lib/site-author";

/** Posts with Amazon affiliate links in body copy — disclosure shown below byline. */
const AFFILIATE_DISCLOSURE_SLUGS = new Set([
  "cost-to-replace-hvac-georgetown",
  "signs-you-need-hvac-repair-georgetown-tx",
  "how-to-choose-a-reliable-plumber-georgetown-tx",
  "signs-you-may-need-a-new-roof-georgetown-tx",
]);

const AFFILIATE_DISCLOSURE_TEXT =
  "Disclosure: This post contains affiliate links. If you purchase through our links, we may earn a small commission at no extra cost to you.";

function breadcrumbJsonLd({
  siteUrl,
  slug,
  title,
}: {
  siteUrl: string;
  slug: string;
  title: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog` },
      { "@type": "ListItem", position: 3, name: title, item: `${siteUrl}/blog/${slug}` },
    ],
  };
}

function articleJsonLd({
  siteUrl,
  headline,
  description,
  url,
  publisherName,
  datePublished,
  dateModified,
}: {
  siteUrl: string;
  headline: string;
  description: string;
  url: string;
  publisherName: string;
  datePublished: string;
  dateModified: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    image: {
      "@type": "ImageObject",
      url: `${siteUrl}/og-image.jpg`,
      width: 1200,
      height: 630,
    },
    description,
    mainEntityOfPage: url,
    author: authorPersonSchema(siteUrl),
    publisher: { "@type": "Organization", name: publisherName, url: siteUrl },
    datePublished,
    dateModified,
  };
}

const DEFAULT_BLOG_PUBLISH_DATE_ISO = "2026-04-12";

function formatPublishDateLabel(isoDate: string) {
  // Use a stable date-only ISO string as canonical storage.
  const d = new Date(`${isoDate}T00:00:00.000Z`);
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(d);
}

function NativeInlineCta({
  title,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: {
  title: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
}) {
  return (
    <section className="mt-10 rounded-xl border border-gray-200 bg-white p-6 shadow-md">
      <div className="text-xs font-semibold uppercase tracking-wide text-gray-600">Next step</div>
      <h2 className="mt-2 text-xl font-semibold tracking-tight text-gray-900">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-gray-700">{description}</p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Link
          href={primaryHref}
          className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-hover"
        >
          {primaryLabel}
        </Link>
        <Link
          href={secondaryHref}
          className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50"
        >
          {secondaryLabel}
        </Link>
      </div>
    </section>
  );
}

function PracticalTakeaway({
  bullets,
}: {
  bullets: string[];
}) {
  if (!bullets.length) return null;
  return (
    <section className="mt-10 rounded-xl border border-gray-200 bg-white p-6 shadow-md">
      <div className="text-xs font-semibold uppercase tracking-wide text-gray-600">Practical takeaway</div>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-gray-700">
        {bullets.slice(0, 4).map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
    </section>
  );
}

type RecurringPostType =
  | "monthly_maintenance"
  | "seasonal_checklist"
  | "cost_guide"
  | "after_storm_checklist"
  | "choose_contractor"
  | "warning_signs"
  | "general";

function detectRecurringType(slug: string, title: string): RecurringPostType {
  const s = slug.toLowerCase();
  const t = title.toLowerCase();
  if (s.includes("monthly") && (s.includes("maintenance") || t.includes("maintenance"))) return "monthly_maintenance";
  if (s.includes("season") || t.includes("seasonal") || t.includes("checklist")) return "seasonal_checklist";
  if (s.includes("cost") || t.includes("cost") || t.includes("price")) return "cost_guide";
  if (s.includes("storm") || s.includes("hail") || t.includes("after storm") || t.includes("hail")) return "after_storm_checklist";
  if (s.includes("how-to-choose") || s.includes("how-to-find") || t.includes("how to choose") || t.includes("how to find")) return "choose_contractor";
  if (s.includes("signs") || t.includes("warning") || t.includes("signs")) return "warning_signs";
  return "general";
}

function takeawayBullets(type: RecurringPostType, serviceLabel: string) {
  if (type === "monthly_maintenance") {
    return [
      "Set a calendar reminder: do one small check monthly instead of waiting for a breakdown.",
      `Keep notes (photos + dates) for ${serviceLabel} issues so providers can diagnose faster.`,
      "If you see active leaks, burning smells, breaker trips, or water near electrical fixtures, treat it as urgent and contact a provider directly.",
    ];
  }
  if (type === "seasonal_checklist") {
    return [
      "Before peak season, do a quick visual inspection and note anything new (stains, odors, unusual noises).",
      "Document conditions with photos so you can compare changes month-to-month.",
      `If a checklist item points to a likely failure, use the ${serviceLabel} guide for next-step questions before you call.`,
    ];
  }
  if (type === "after_storm_checklist") {
    return [
      "Take photos immediately (wide shots + close-ups) before temporary fixes change the evidence.",
      "Prioritize stopping damage first, then ask for a written scope that explains the permanent fix.",
      "Compare at least two providers and ask what is excluded from the scope (not just what is included).",
    ];
  }
  if (type === "choose_contractor") {
    return [
      "Ask for a written scope in plain language and confirm what can change the price.",
      "Compare responsiveness and clarity, not only star ratings.",
      "Choose the provider you can reach and who documents the work clearly—especially when problems reappear after the first visit.",
    ];
  }
  if (type === "warning_signs") {
    return [
      "Don’t wait for a total failure—early symptoms usually cost less to address.",
      "When you call, describe the symptom clearly (what changed, when it happens, and any safety concerns).",
      "Use the directory to shortlist providers, then request written estimates you can compare line-by-line.",
    ];
  }
  if (type === "cost_guide") {
    return [
      "Use cost ranges to plan, then request written estimates for your exact situation.",
      "Compare scopes line-by-line (materials, labor assumptions, and what is excluded).",
      "Shortlist providers from the directory first so you’re comparing like-for-like.",
    ];
  }
  return [
    "Skim this guide, then use the related service and Best Of pages below for your next step.",
    "Request written scopes when possible so you can compare options cleanly.",
  ];
}

/** Only slugs returned by `generateStaticParams` resolve; unknown slugs 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return getBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) return {};

  const overrides: Record<string, { title?: string; absoluteTitle?: string; description: string }> = {
    "ac-not-cooling-georgetown-tx": {
      absoluteTitle: "AC Not Cooling in Georgetown TX? Do This First (2026 Guide)",
      description:
        "Georgetown TX AC not working? Follow this homeowner checklist to diagnose the issue fast — common causes, safe DIY checks, and when to call an HVAC company. Updated May 2026.",
    },
    "why-your-ac-is-not-cooling-georgetown-tx": {
      absoluteTitle: "Why Is My AC Not Cooling in Georgetown TX? 8 Common Causes",
      description:
        "Georgetown homeowners: find out why your AC is blowing warm air. From dirty filters to low refrigerant to failed capacitors — what to check and when to call a technician.",
    },
    "ac-repair-cost-georgetown-tx": {
      absoluteTitle: "AC Repair Cost Georgetown TX (2026) — Real Price Ranges",
      description:
        "How much does AC repair cost in Georgetown TX? Realistic price ranges by repair type, what drives cost in Central Texas, and when repair makes more sense than replacement.",
    },
    "cost-to-replace-hvac-georgetown": {
      absoluteTitle: "HVAC Replacement Cost Georgetown TX (2026) — What to Expect",
      description:
        "HVAC replacement costs in Georgetown TX range from $5,000–$14,000+. See what affects your price, what to include in quotes, and how Central Texas heat impacts equipment selection.",
    },
    "signs-you-need-hvac-repair-georgetown-tx": {
      absoluteTitle: "9 Signs You Need HVAC Repair in Georgetown TX (2026)",
      description:
        "Spot HVAC trouble before it becomes a no-cool emergency. Georgetown homeowners: these are the warning signs that mean call now vs. wait — and what each symptom usually costs to fix.",
    },
    "emergency-plumber-cost-georgetown-tx": {
      absoluteTitle: "Emergency Plumber Cost Georgetown TX (2026) — Honest Ranges",
      description:
        "Emergency plumber in Georgetown TX costs $150–$500+ for most calls. See real price ranges by issue type, what triggers after-hours fees, and how to avoid overpaying in a crisis.",
    },
    "water-heater-not-working-georgetown-tx": {
      absoluteTitle: "Water Heater Not Working in Georgetown TX? Do This First (2026)",
      description:
        "Georgetown TX water heater stopped working? Check these causes before calling a plumber — pilot light, thermostat, sediment buildup — and when it's time to replace vs. repair.",
    },
    "how-to-choose-a-reliable-plumber-georgetown-tx": {
      absoluteTitle: "How to Choose a Plumber in Georgetown TX (2026 Checklist)",
      description:
        "Don't hire the first plumber you find. This Georgetown TX checklist covers licensing, insurance, what to ask before they start, and red flags to watch for on the first call.",
    },
    "roof-replacement-cost-georgetown-tx": {
      absoluteTitle: "Roof Replacement Cost Georgetown TX (2026) — Price Ranges",
      description:
        "Roof replacement in Georgetown TX typically costs $9,000–$20,000+. See what drives your price, how Williamson County weather affects material choices, and how to compare bids.",
    },
    "roof-repair-cost-georgetown-tx": {
      absoluteTitle: "Roof Repair Cost Georgetown TX (2026) — Repair vs. Replace",
      description:
        "Georgetown TX roof repair costs $300–$1,500 for most jobs. See real price ranges by repair type, what hail damage typically costs, and when repair is enough vs. full replacement.",
    },
    "signs-you-may-need-a-new-roof-georgetown-tx": {
      absoluteTitle: "8 Signs You Need a New Roof in Georgetown TX (2026)",
      description:
        "Georgetown homeowners: these roof warning signs mean it's time to call. Check for storm damage, shingle wear, and age indicators before the next Texas hail season hits.",
    },
    "foundation-crack-georgetown-tx": {
      absoluteTitle: "Foundation Crack Georgetown TX — When to Worry (2026 Guide)",
      description:
        "Not all foundation cracks are serious — but some are. Georgetown TX homeowners: here's how to tell the difference, what causes cracking in clay soil, and when to call a contractor.",
    },
    "hvac-making-noise-georgetown-tx": {
      absoluteTitle: "HVAC Making Noise Georgetown TX? What Each Sound Means (2026)",
      description:
        "Banging, squealing, clicking, or rattling from your Georgetown TX HVAC? Here's what each noise usually means, whether it's urgent, and what a repair typically costs to fix.",
    },
    "after-hail-roof-checklist-georgetown-tx": {
      title: "Georgetown Roof Storm Checklist: After Hail or Wind Damage",
      description:
        "Safe ground-level inspection steps, photos to take for claims, when tarping helps, and how to compare roofer scopes in Williamson County.",
    },
  };

  const o = overrides[slug];
  const description = o?.description ?? post.description;
  if (o?.absoluteTitle) {
    return pageSeoMetadata({
      absoluteTitle: o.absoluteTitle,
      description,
      pathname: `/blog/${slug}`,
      ogType: "article",
      noindex: isNoindexSlug(slug),
    });
  }
  const rawTitleSegment = o?.title ?? post.title;
  // Recency signal: for cost guides and hiring/how-to guides, append "(2026 Guide)"
  // to the `<title>` tag if not already year-stamped. Visible H1 stays unchanged
  // (see `post.h1` below) so the on-page heading doesn't pick up editorial chrome.
  const titleSegment = appendYearSignalIfApplicable(rawTitleSegment, slug);
  return pageSeoMetadata({
    titleSegment,
    description,
    pathname: `/blog/${slug}`,
    ogType: "article",
    noindex: isNoindexSlug(slug),
  });
}

/**
 * Append " (YEAR Guide)" to titles for cost and how-to posts that don't already
 * carry a year. Skips titles already containing a 4-digit year so we never
 * double-stamp. Pure string function — safe to call at build time.
 */
function appendYearSignalIfApplicable(title: string, slug: string): string {
  if (/\b20\d{2}\b/.test(title)) return title;
  const isCost = /cost|price|how[- ]much/i.test(slug) || /cost|price|how much/i.test(title);
  const isHowTo = /how[- ]to|guide|checklist|signs/i.test(slug);
  if (!isCost && !isHowTo) return title;
  const suffix = isCost ? `${PRICING_YEAR} Guide` : `${PRICING_YEAR}`;
  return `${title} (${suffix})`;
}

export default async function BlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) notFound();

  const siteUrl = process.env.SITE_URL ?? "https://www.georgetownhomeservices.com";
  const publisherName = "Georgetown Home Services";

  const generated = getGeneratedPage(slug);
  const location = getLocationBySlug(post.locationSlug);
  const datePublished = post.datePublished ?? DEFAULT_BLOG_PUBLISH_DATE_ISO;
  const dateModified = post.dateModified ?? post.datePublished ?? DEFAULT_BLOG_PUBLISH_DATE_ISO;
  const publishedLabel = formatPublishDateLabel(datePublished);
  const modifiedLabel = formatPublishDateLabel(dateModified);
  const services = getServices();
  const relatedServices = post.relatedServiceSlugs
    .map((s) => services.find((x) => x.slug === s))
    .filter((s): s is (typeof services)[number] => Boolean(s));

  const relatedBest = post.relatedBestSlugs
    .map((s) => getBestBySlug(s))
    .filter((b): b is NonNullable<typeof b> => Boolean(b));

  const topProvidersHref =
    relatedBest.length > 0 ? `/best/${relatedBest[0]!.slug}` : "/best/best-plumbers-georgetown-tx";

  const isCostPost = post.slug.includes("cost") || post.title.toLowerCase().includes("cost");
  const serviceGuideHref = relatedServices[0] ? `/services/${relatedServices[0].slug}` : "/services";
  const ruleLinks = blogPageInternalLinks(post.slug);
  const recurringType = detectRecurringType(post.slug, post.title);
  const serviceLabel =
    relatedServices[0]?.serviceType?.toLowerCase().includes("hvac")
      ? "HVAC"
      : relatedServices[0]?.serviceType?.toLowerCase().includes("roof")
        ? "roofing"
        : relatedServices[0]?.serviceType?.toLowerCase().includes("foundation")
          ? "foundation"
          : "plumbing";
  const takeaway = takeawayBullets(recurringType, serviceLabel);
  const hero = getBlogHeroImage(post.slug);
  // Auto-extract FAQPage JSON-LD from generated article HTML. Posts with no
  // `?`-terminated H3s (e.g. pure listicles) simply emit no FAQ schema.
  const faqPairs = generated ? extractFaqPairs(generated.html) : [];

  return (
    <PageShell>
      <section className="py-10 md:py-12">
          <JsonLd data={breadcrumbJsonLd({ siteUrl, slug: post.slug, title: post.title })} />
          <JsonLd
            data={articleJsonLd({
              siteUrl,
              publisherName,
              headline: post.title,
              description: post.description,
              url: `${siteUrl}/blog/${post.slug}`,
              datePublished,
              dateModified,
            })}
          />
          {faqPairs.length > 0 ? <JsonLd data={faqPageJsonLd(faqPairs)} /> : null}
          <TwoColumnPage
            main={
              <article className="min-w-0">
              <Breadcrumbs
                items={[
                  { href: "/", label: "Home" },
                  { href: "/blog", label: "Blog" },
                  { href: `/blog/${post.slug}`, label: post.title },
                ]}
              />
              <div className="text-sm font-semibold uppercase tracking-wide text-primary">
                Blog • {location?.title ?? "Georgetown, TX"}
              </div>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">{post.h1}</h1>
              <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-gray-100 shadow-sm">
                <Image
                  src={hero.src}
                  alt={hero.alt}
                  width={1200}
                  height={630}
                  loading="lazy"
                  className="h-auto w-full object-cover"
                  sizes="(max-width: 768px) 100vw, min(1200px, 100vw)"
                />
              </div>
              <p className="mt-2 text-sm text-gray-600">
                By{" "}
                <Link href={AUTHOR_PROFILE_PATH} className="font-medium text-gray-900 underline-offset-4 hover:underline">
                  {AUTHOR_NAME}
                </Link>
                <span className="text-gray-500"> · Founder and Editor</span>
              </p>
              <div className="mt-2 text-sm text-gray-600">
                <div>
                  <span className="font-semibold text-gray-900">Published:</span> {publishedLabel}
                </div>
                <div className="mt-1">
                  <span className="font-semibold text-gray-900">Last Updated:</span> {modifiedLabel}
                </div>
              </div>
              {AFFILIATE_DISCLOSURE_SLUGS.has(post.slug) ? (
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-gray-700">{AFFILIATE_DISCLOSURE_TEXT}</p>
              ) : null}
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-700">{post.description}</p>
              <div className="mt-2 text-sm text-gray-500">Estimated read time: {post.readTime}</div>

              <div className="mt-8">
                <BlogArticleBodyWithMidEmail slug={post.slug} generated={generated} blocks={post.content} />
              </div>

              <PracticalTakeaway bullets={takeaway} />

              <NativeInlineCta
                title={isCostPost ? "Compare local quotes" : "See top Georgetown providers"}
                description={
                  isCostPost
                    ? "Use the best-of guide to shortlist providers, then request written estimates you can compare line-by-line."
                    : "Shortlist providers by category, then use service guides to understand symptoms, likely causes, and what affects price."
                }
                primaryHref={topProvidersHref}
                primaryLabel={isCostPost ? "Compare local quotes" : "See top providers"}
                secondaryHref={serviceGuideHref}
                secondaryLabel="Explore service guide"
              />

              {ruleLinks ? (
                <section className="mt-12">
                  <h2 className="text-3xl font-semibold tracking-tight text-gray-900">Related reading and next steps</h2>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                    Continue with the relevant service guide, compare providers, or read another related post.
                  </p>
                  <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                    {ruleLinks.service ? (
                      <LinkCard
                        href={ruleLinks.service.href}
                        title={ruleLinks.service.label}
                        description={ruleLinks.service.description ?? "Related service guide."}
                        badge="Service"
                      />
                    ) : null}
                    {ruleLinks.bestOf ? (
                      <LinkCard
                        href={ruleLinks.bestOf.href}
                        title={ruleLinks.bestOf.label}
                        description={ruleLinks.bestOf.description ?? "Compare local providers."}
                        badge="Best Of"
                      />
                    ) : null}
                    {ruleLinks.relatedPosts.map((l) => (
                      <LinkCard
                        key={l.href}
                        href={l.href}
                        title={l.label}
                        description={l.description ?? "Related article."}
                        badge="Related post"
                      />
                    ))}
                  </div>
                </section>
              ) : null}

              <section className="mt-12">
                <h2 className="text-3xl font-semibold tracking-tight text-gray-900">Related Services</h2>
                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {relatedServices.slice(0, 4).map((s) => (
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

              {relatedBest.length ? (
                <section className="mt-12">
                  <h2 className="text-3xl font-semibold tracking-tight text-gray-900">Best Of Guides</h2>
                  <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                    {relatedBest.slice(0, 2).map((b) => (
                      <LinkCard key={b.slug} href={`/best/${b.slug}`} title={b.title} description={b.description} />
                    ))}
                  </div>
                </section>
              ) : null}
              </article>
            }
            aside={
              <>
                <EmailCaptureSitewide
                  variant="blog-sidebar"
                  source={`blog-sidebar:${post.slug}`}
                  offers={["seasonal_checklist", "monthly_reminder"]}
                  defaultOffer="seasonal_checklist"
                  blogSidebarSecondaryHref={topProvidersHref}
                />
                {adsenseSidebarSlot ? <AdSenseDisplay slot={adsenseSidebarSlot} className="mt-8" /> : null}
              </>
            }
          />
      </section>
    </PageShell>
  );
}

