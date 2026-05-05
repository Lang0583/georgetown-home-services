import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "../../components/Breadcrumbs";
import JsonLd from "../../components/JsonLd";
import PageShell from "../../components/templates/PageShell";
import { pageSeoMetadata, SITE_URL } from "../../lib/page-seo";
import {
  PRICING_CATEGORIES,
  PRICING_CATEGORY_RELATED_LINKS,
  PRICING_LAST_REVIEWED_MONTH,
  PRICING_YEAR,
  formatPricingRange,
  type PricingCategory,
} from "../../lib/pricing-data";

export const metadata: Metadata = pageSeoMetadata({
  absoluteTitle: `Georgetown TX Home Service Pricing Guide (${PRICING_YEAR}) — Real Cost Ranges`,
  description:
    "Real price ranges for plumbers, HVAC, roofers, electricians, and more in Georgetown TX. Updated 2026. Compare costs before you call — no lead forms, no spam.",
  pathname: "/pricing",
  ogType: "article",
});

function CategorySection({ category }: { category: PricingCategory }) {
  const related = PRICING_CATEGORY_RELATED_LINKS[category.key];
  return (
    <section
      id={category.key}
      aria-label={category.title}
      className="not-prose mt-12 scroll-mt-24 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      <h2 className="text-2xl font-semibold tracking-tight text-gray-900">{category.title}</h2>
      <p className="mt-3 text-sm leading-relaxed text-gray-700">{category.intro}</p>
      <div className="mt-5 overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-gray-200 text-xs font-semibold uppercase tracking-wide text-gray-600">
            <tr>
              <th scope="col" className="py-2 pr-4">
                Job
              </th>
              <th scope="col" className="py-2 pr-4">
                Typical Georgetown range
              </th>
              <th scope="col" className="py-2">
                Notes
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-800">
            {category.rows.map((row) => (
              <tr key={row.job}>
                <td className="py-3 pr-4 align-top font-medium text-gray-900">{row.job}</td>
                <td className="py-3 pr-4 align-top font-semibold tabular-nums">
                  {formatPricingRange(row)}
                </td>
                <td className="py-3 align-top text-gray-600">{row.notes ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-5">
        <div className="text-xs font-semibold uppercase tracking-wide text-gray-600">
          What affects your final price in Georgetown
        </div>
        <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-gray-700">
          {category.priceDrivers.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      </div>
      <div className="mt-6 border-t border-gray-100 pt-5 text-sm leading-relaxed text-gray-700">
        <span className="font-semibold text-gray-900">Keep reading: </span>
        <Link href={related.bestHref} className="font-medium text-primary underline-offset-4 hover:underline">
          {related.bestLabel}
        </Link>
        {" · "}
        <Link href={related.guideHref} className="font-medium text-primary underline-offset-4 hover:underline">
          {related.guideLabel}
        </Link>
      </div>
    </section>
  );
}

const FAQS: { question: string; answer: string }[] = [
  {
    question: "How much does a plumber cost in Georgetown, TX?",
    answer:
      "A standard Georgetown plumber service call runs about $100–$175 for diagnosis, with typical drain clearing landing $150–$350. Straightforward tank water heater swaps often quote $900–$1,800, though many 40–50 gal installs with permits land $1,650–$3,200+. Slab leak repairs with a typical scope often fall $500–$2,500 before major re-routes. Emergency and after-hours calls add $250–$650 on top of the repair.",
  },
  {
    question: "How much does HVAC replacement cost in Georgetown, TX?",
    answer:
      "Most Georgetown AC-only replacements at a standard efficiency tier land around $5,000–$8,500 for a 2–3 ton system. Full-system replacements (AC plus furnace or air handler) for 3–5 ton homes typically run $5,000–$14,000 depending on equipment and ductwork. High-efficiency or zoned systems can reach $16,000 or more.",
  },
  {
    question: "How much does roof replacement cost in Georgetown, TX?",
    answer:
      "Full roof replacement in Georgetown often runs about $9,000–$20,000 for a typical ~2,000 sqft home with architectural shingle. Larger homes with mid-tier shingle and ventilation upgrades land at $13,000–$22,000. Insurance-scope roofs after hail or wind events follow a different pricing path than cash-pay jobs.",
  },
  {
    question: "Are these Georgetown price ranges quotes?",
    answer:
      "No. These are editorial ranges for planning, reviewed quarterly based on public Central Texas contractor pricing and local market conditions. Your actual quote depends on scope, discovery during work, and the provider. Always get two written estimates before committing.",
  },
  {
    question: "Why are some Georgetown home-service prices higher than national averages?",
    answer:
      "Central Texas clay soil, Edwards Aquifer hard water, and a long cooling season all shorten equipment life and increase labor complexity for plumbing, HVAC, and foundation work. Williamson County permit requirements on panel, gas, and water-heater jobs also add $75–$250 relative to jurisdictions without similar rules.",
  },
  {
    question: "How often do you update these Georgetown pricing ranges?",
    answer: `We review every range on this page quarterly. The current revision is dated ${PRICING_LAST_REVIEWED_MONTH}. If a category (like roofing after a hail event) is moving fast, we refresh that section early and note the review date on the table.`,
  },
];

function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

function breadcrumbJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Pricing", item: `${SITE_URL}/pricing` },
    ],
  };
}

export default function PricingPage() {
  return (
    <PageShell>
      <JsonLd data={breadcrumbJsonLd()} />
      <JsonLd data={faqJsonLd()} />
      <section className="py-10 md:py-12">
        <div className="mx-auto max-w-4xl">
          <Breadcrumbs
            items={[
              { href: "/", label: "Home" },
              { href: "/pricing", label: "Pricing" },
            ]}
          />
          <div className="mt-2 text-sm font-semibold uppercase tracking-wide text-primary">
            Pricing guide
          </div>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            Home service costs in Georgetown, TX ({PRICING_YEAR} price guide)
          </h1>
          <aside className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm leading-relaxed text-amber-900">
            <p>
              Prices below reflect typical ranges for Georgetown TX as of {PRICING_YEAR}. Your
              actual cost will vary based on home size, job complexity, and provider. Always get
              2–3 quotes before committing.
            </p>
          </aside>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-700">
            Typical Georgetown price ranges for the home services homeowners in
            Williamson County ask about most. Use these as a sanity-check on written
            bids — not as quotes. Ranges reviewed {PRICING_LAST_REVIEWED_MONTH}.{" "}
            <Link
              href="/pricing/calculator"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Open the interactive estimator
            </Link>{" "}
            to sum ranges for the jobs you are planning.
          </p>

          <nav aria-label="Pricing categories" className="mt-8">
            <div className="text-xs font-semibold uppercase tracking-wide text-gray-600">
              Jump to a category
            </div>
            <ul className="mt-3 flex flex-wrap gap-2">
              {PRICING_CATEGORIES.map((c) => (
                <li key={c.key}>
                  <Link
                    href={`#${c.key}`}
                    className="inline-flex items-center rounded-full border border-gray-300 bg-white px-3 py-1 text-sm text-gray-800 hover:bg-gray-50"
                  >
                    {c.title.replace(/ Costs in Georgetown TX$/i, "")}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {PRICING_CATEGORIES.map((c) => (
            <CategorySection key={c.key} category={c} />
          ))}

          <section className="mt-16">
            <h2 className="text-3xl font-semibold tracking-tight text-gray-900">
              Frequently asked questions
            </h2>
            <div className="mt-6 divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white">
              {FAQS.map((f) => (
                <details key={f.question} className="group px-5 py-4 open:bg-gray-50">
                  <summary className="cursor-pointer list-none text-base font-semibold text-gray-900 marker:hidden">
                    <span className="inline-flex items-center gap-2">
                      <span
                        aria-hidden
                        className="text-primary transition-transform group-open:rotate-45"
                      >
                        +
                      </span>
                      {f.question}
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-gray-700">{f.answer}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
              Before you commit: a 3-step comparison checklist
            </h2>
            <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-relaxed text-gray-700">
              <li>
                <span className="font-semibold text-gray-900">Get two written estimates</span>{" "}
                for the same scope. Verbal numbers drift; written scopes let you compare
                line-by-line.
              </li>
              <li>
                <span className="font-semibold text-gray-900">Ask what is excluded.</span>{" "}
                Permits, decking replacement on roofs, slab access on plumbing, and
                electrical breaker upgrades are the usual &quot;added on discovery&quot; items.
              </li>
              <li>
                <span className="font-semibold text-gray-900">Confirm timeline and warranty in writing.</span>{" "}
                A 1-year labor warranty is standard for most jobs; equipment manufacturer
                warranties are separate and usually longer.
              </li>
            </ol>
          </section>

          <section className="mt-12 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
              Where to go next
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Link
                href="/services"
                className="rounded-lg border border-gray-200 p-4 hover:bg-gray-50"
              >
                <div className="text-sm font-semibold text-gray-900">Service guides</div>
                <div className="mt-1 text-sm text-gray-600">
                  Plumbing, HVAC, roofing, and more — with neighborhood context.
                </div>
              </Link>
              <Link
                href="/best"
                className="rounded-lg border border-gray-200 p-4 hover:bg-gray-50"
              >
                <div className="text-sm font-semibold text-gray-900">Best-of comparisons</div>
                <div className="mt-1 text-sm text-gray-600">
                  Ranked Georgetown providers by service category.
                </div>
              </Link>
              <Link
                href="/blog/emergency-plumber-cost-georgetown-tx"
                className="rounded-lg border border-gray-200 p-4 hover:bg-gray-50"
              >
                <div className="text-sm font-semibold text-gray-900">Emergency plumber cost guide</div>
                <div className="mt-1 text-sm text-gray-600">
                  When a $250 service call is reasonable vs. when it isn&apos;t.
                </div>
              </Link>
              <Link
                href="/blog/cost-to-replace-hvac-georgetown"
                className="rounded-lg border border-gray-200 p-4 hover:bg-gray-50"
              >
                <div className="text-sm font-semibold text-gray-900">HVAC replacement cost guide</div>
                <div className="mt-1 text-sm text-gray-600">
                  How to read a replacement quote before you sign.
                </div>
              </Link>
            </div>
          </section>

          <p className="mt-10 text-xs leading-relaxed text-gray-500">
            Editorial disclosure: Georgetown Home Services is a directory and homeowner
            guide. We do not perform home services, take service requests, or dispatch
            providers. Price ranges are synthesized from public Central Texas contractor
            pricing and national labor/material benchmarks, localized for Williamson
            County conditions, and reviewed quarterly. Your written estimate is the only
            source of truth for your job.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
