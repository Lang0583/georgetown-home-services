import type { Metadata } from "next";
import Link from "next/link";
import Container from "../../components/Container";
import LinkCard from "../../components/LinkCard";
import CTASection from "../../components/CTASection";
import JsonLd from "../../components/JsonLd";
import { getBest, getBlog, getServices } from "../../lib/site-content";

export const metadata: Metadata = {
  title: "Provider Directory: Top Home Service Companies in Georgetown, TX",
  description:
    "Browse provider directory and comparison pages for plumbers, HVAC companies, and roofers serving Georgetown, Texas.",
};

const CORE_BEST_SLUGS = [
  "best-plumbers-georgetown-tx",
  "top-hvac-companies-georgetown-tx",
  "best-roofers-georgetown-tx",
] as const;

function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How should I use these best-of guides?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Start with the category you need (plumbing, HVAC, or roofing). Compare providers using scopes, responsiveness, and review patterns—not just the star rating—and then contact a short list for written estimates.",
        },
      },
      {
        "@type": "Question",
        name: "Do these guides include every company in Georgetown?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "No. The goal is to provide a practical shortlist based on publicly available business information. Always confirm licensing, insurance, pricing, and availability directly with any provider before hiring.",
        },
      },
      {
        "@type": "Question",
        name: "Where should I go if I’m not sure what I need?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Start on the Services hub for symptom-based pages (like AC not cooling or roof leak repair), then return here to compare providers for that category.",
        },
      },
    ],
  };
}

export default function BestIndexPage() {
  const bestPages = getBest();
  const services = getServices();
  const blog = getBlog();

  const core = bestPages.filter((b) => (CORE_BEST_SLUGS as readonly string[]).includes(b.slug));
  const other = bestPages.filter((b) => !(CORE_BEST_SLUGS as readonly string[]).includes(b.slug));

  const byCategory = {
    plumbing: core.filter((b) => b.slug.includes("plumber")),
    hvac: core.filter((b) => b.slug.includes("hvac")),
    roofing: core.filter((b) => b.slug.includes("roofer") || b.slug.includes("roof")),
  } as const;

  const featuredServices = services
    .filter((s) => ["plumber-georgetown-tx", "hvac-georgetown-tx", "roofer-georgetown-tx"].includes(s.slug))
    .slice(0, 3);
  const featuredPosts = blog.slice(0, Math.min(4, blog.length));

  return (
    <div className="bg-gray-50">
      <Container>
        <section className="py-10 md:py-12">
          <JsonLd data={faqJsonLd()} />
          <div className="flex flex-col gap-10">
            <div>
              <div className="text-sm font-semibold uppercase tracking-wide text-gray-600">Top Providers</div>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
                Best Home Service Providers in Georgetown, TX
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-700">
                Use these comparison guides to shortlist providers you can contact directly. Each guide includes practical
                criteria (scope clarity, documentation, responsiveness) so you can compare quotes and avoid common mistakes.
              </p>
            </div>

            <section id="top-providers" className="scroll-mt-24">
              <h2 className="text-3xl font-semibold tracking-tight text-gray-900">Compare by category</h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                Pick the trade you need, then open the guide to compare real local companies.
              </p>
              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {core.map((b) => (
                  <LinkCard key={b.slug} href={`/best/${b.slug}`} title={b.title} description={b.description} badge="Best Of" />
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-semibold tracking-tight text-gray-900">Compare by intent</h2>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-gray-700">
                Different projects need different evaluation criteria. Use the category guide, then jump to a service or
                article that matches what’s happening in your home.
              </p>
              <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
                  <div className="text-sm font-semibold text-gray-900">Urgent problems</div>
                  <p className="mt-2 text-sm text-gray-700">
                    Start with symptom pages, then return here to compare providers for the right trade.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-sm font-semibold text-blue-700">
                    <Link href="/services/ac-not-cooling-georgetown-tx" className="hover:underline">
                      AC not cooling
                    </Link>
                    <span className="text-gray-300" aria-hidden>
                      ·
                    </span>
                    <Link href="/services/clogged-drain-georgetown-tx" className="hover:underline">
                      Clogged drain
                    </Link>
                    <span className="text-gray-300" aria-hidden>
                      ·
                    </span>
                    <Link href="/services/roof-leak-repair-georgetown-tx" className="hover:underline">
                      Roof leak repair
                    </Link>
                  </div>
                </div>
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
                  <div className="text-sm font-semibold text-gray-900">Planning & budgeting</div>
                  <p className="mt-2 text-sm text-gray-700">
                    Use cost and replacement guides to set expectations before collecting estimates.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-sm font-semibold text-blue-700">
                    <Link href="/blog/cost-to-replace-hvac-georgetown" className="hover:underline">
                      HVAC replacement cost
                    </Link>
                    <span className="text-gray-300" aria-hidden>
                      ·
                    </span>
                    <Link href="/blog/how-to-find-a-good-plumber-georgetown-tx" className="hover:underline">
                      Hiring checklist (plumber)
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-semibold tracking-tight text-gray-900">Featured service pages</h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                Service guides explain what’s typical, what’s urgent, and what to ask before you hire.
              </p>
              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {featuredServices.map((s) => (
                  <LinkCard key={s.slug} href={`/services/${s.slug}`} title={s.title} description={s.description} badge={s.serviceType} />
                ))}
              </div>
            </section>

            {featuredPosts.length ? (
              <section>
                <h2 className="text-3xl font-semibold tracking-tight text-gray-900">Featured articles</h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
                  Use these to compare quotes more effectively and avoid common traps.
                </p>
                <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
                  {featuredPosts.map((p) => (
                    <LinkCard key={p.slug} href={`/blog/${p.slug}`} title={p.title} description={p.description} badge={p.readTime} />
                  ))}
                </div>
              </section>
            ) : null
            }

            {other.length ? (
              <section>
                <h2 className="text-3xl font-semibold tracking-tight text-gray-900">More comparison guides</h2>
                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {other.map((b) => (
                    <LinkCard key={b.slug} href={`/best/${b.slug}`} title={b.title} description={b.description} badge="Best Of" />
                  ))}
                </div>
              </section>
            ) : null}

            <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
              <h2 className="text-xl font-semibold text-gray-900">FAQ</h2>
              <div className="mt-3 space-y-4 text-sm leading-relaxed text-gray-700">
                <div>
                  <div className="font-semibold text-gray-900">How should I use these guides?</div>
                  <p>
                    Start with the category you need, shortlist providers, then request written scopes you can compare line-by-line.
                  </p>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Do you include every company?</div>
                  <p>
                    No. The goal is a practical shortlist based on publicly available business information. Confirm licensing, insurance, and availability.
                  </p>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">What if I’m not sure what I need?</div>
                  <p>
                    Start on the Services hub for symptom-based pages, then return here to compare providers for that category.
                  </p>
                </div>
              </div>
            </section>

            <div className="pt-4">
              <CTASection
                eyebrow="More ways to browse"
                title="Service guides and email signup"
                description="Read category guides on the services hub, or browse articles by topic on the blog."
                primaryHref="/services"
                emailFormHref="/#email-capture"
                secondary={
                  <div className="text-sm text-gray-600">
                    Explore hubs:{" "}
                    <Link href="/services" className="font-semibold underline underline-offset-4">
                      Services
                    </Link>
                    ,{" "}
                    <Link href="/blog" className="font-semibold underline underline-offset-4">
                      Blog
                    </Link>
                    . Or go back to{" "}
                    <Link href="/" className="font-semibold underline underline-offset-4">
                      the homepage
                    </Link>
                    .
                  </div>
                }
                showDisclaimer
              />
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}

