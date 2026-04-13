import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import EmailCaptureSitewide from "../../../components/EmailCaptureSitewide";
import BlogArticleBodyWithMidEmail from "../../../components/BlogArticleBodyWithMidEmail";
import LinkCard from "../../../components/LinkCard";
import CTASection from "../../../components/CTASection";
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
import { pageSeoMetadata } from "../../../lib/page-seo";
import { getGeneratedPage } from "../../../lib/generatedPages";
import { blogPageInternalLinks } from "../../../lib/internal-links";

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

const EDITORIAL_AUTHOR_NAME = "Georgetown Home Services Editorial Team";

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
    description,
    mainEntityOfPage: url,
    author: {
      "@type": "Person",
      name: EDITORIAL_AUTHOR_NAME,
      url: `${siteUrl}/about`,
    },
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

  const overrides: Record<string, { title: string; description: string }> = {
    "cost-to-replace-hvac-georgetown": {
      title: "HVAC Replacement Cost in Georgetown, TX: Price Drivers and How to Compare Quotes",
      description:
        "A practical Georgetown HVAC replacement cost guide: what changes price, what questions to ask, and how to compare written bids before you commit.",
    },
    "emergency-plumber-cost-georgetown-tx": {
      title: "Emergency Plumber Cost in Georgetown, TX: Typical Fees, Scenarios, and Next Steps",
      description:
        "Cost ranges for emergency plumbing in Georgetown, TX—plus what to do first, what to ask on the phone, and how to avoid paying for the wrong fix.",
    },
    "how-to-find-a-good-plumber-georgetown-tx": {
      title: "How to Find a Good Plumber in Georgetown, TX: Checklist and Red Flags",
      description:
        "A Georgetown plumber checklist: licensing, estimates, communication, and what to ask so you can compare providers and avoid common service mistakes.",
    },
    "water-heater-not-working-georgetown-tx": {
      title: "Water Heater Not Working in Georgetown TX? Here's What to Do",
      description:
        "Water heater stopped working in Georgetown TX? This guide walks you through the most common causes, what you can check yourself, and when to call a plumber.",
    },
    "foundation-crack-georgetown-tx": {
      title: "Foundation Crack in Georgetown TX: When to Worry and Who to Call",
      description:
        "Seeing cracks in your Georgetown TX home's foundation or walls? Learn which types of cracks are cosmetic and which signal a serious structural problem.",
    },
    "hvac-making-noise-georgetown-tx": {
      title: "HVAC Making Noise in Georgetown TX? What Each Sound Means",
      description:
        "Banging, squealing, or clicking from your HVAC system in Georgetown TX? This guide explains what each noise likely means and whether you need a technician.",
    },
  };

  const o = overrides[slug];
  const titleSegment = o?.title ?? post.title;
  const description = o?.description ?? post.description;
  return pageSeoMetadata({
    titleSegment,
    description,
    pathname: `/blog/${slug}`,
    ogType: "article",
  });
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
              <p className="mt-2 text-sm text-gray-600">
                By{" "}
                <Link href="/about" className="font-medium text-gray-900 underline-offset-4 hover:underline">
                  {EDITORIAL_AUTHOR_NAME}
                </Link>
              </p>
              <div className="mt-2 text-sm text-gray-600">
                <div>
                  <span className="font-semibold text-gray-900">Published:</span> {publishedLabel}
                </div>
                <div className="mt-1">
                  <span className="font-semibold text-gray-900">Last Updated:</span> {modifiedLabel}
                </div>
              </div>
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
              />

              <div className="mt-8">
                <CTASection
                  eyebrow="Take action"
                  title="Browse providers or get tips by email"
                  description="Open a best-of guide to compare local companies, or sign up for occasional Georgetown homeowner tips."
                  primaryHref={topProvidersHref}
                  emailFormHref="#email-capture"
                  secondary={
                    relatedServices[0] ? (
                      <div className="text-sm text-gray-600">
                        Related service guide:{" "}
                        <Link
                          href={`/services/${relatedServices[0].slug}`}
                          className="font-semibold underline underline-offset-4"
                        >
                          {relatedServices[0].title}
                        </Link>
                      </div>
                    ) : null
                  }
                  showDisclaimer
                />
              </div>
              </>
            }
          />
      </section>
    </PageShell>
  );
}

