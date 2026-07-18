import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "../../components/Breadcrumbs";
import JsonLd from "../../components/JsonLd";
import ServicePricingCostTable from "../../components/ServicePricingCostTable";
import PageShell from "../../components/templates/PageShell";
import { pageSeoMetadata, SITE_URL } from "../../lib/page-seo";
import {
  PRICING_CATEGORIES,
  PRICING_CATEGORY_RELATED_LINKS,
  PRICING_LAST_REVIEWED_MONTH,
  PRICING_YEAR,
  type PricingCategory,
} from "../../lib/pricing-data";

export const metadata: Metadata = pageSeoMetadata({
  absoluteTitle: `Georgetown TX Home Service Pricing Guide (${PRICING_YEAR}) — Real Cost Ranges`,
  description:
    "Real price ranges for plumbers, HVAC, roofers, electricians, and more in Georgetown TX. Updated 2026. Compare costs before you call. No on-site lead forms. Direct provider contact info first. Any paid partner links are clearly labeled.",
  pathname: "/pricing",
  ogType: "article",
});

function CategorySection({ category }: { category: PricingCategory }) {
  const related = PRICING_CATEGORY_RELATED_LINKS[category.key];
  return (
    <section
      id={category.key}
      aria-label={category.title}
      className="not-prose mt-12 scroll-mt-24 rounded-xl border border-ink/10 bg-surface p-6 shadow-sm"
    >
      <h2 className="text-2xl font-semibold tracking-tight text-ink">{category.title}</h2>
      <div className="mt-5">
        <ServicePricingCostTable rows={category.rows} variant="range" jobHeader="Job type" />
      </div>
      <p className="mt-5 text-sm leading-relaxed text-muted">{category.localContext}</p>
      <p className="mt-4 text-sm leading-relaxed text-muted">
        <span className="font-semibold text-ink">Compare providers: </span>
        <Link href={related.bestHref} className="font-medium text-brand underline-offset-4 hover:underline">
          {related.bestLabel}
        </Link>
      </p>
    </section>
  );
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
      <section className="py-10 md:py-12">
        <div className="mx-auto max-w-4xl">
          <Breadcrumbs
            items={[
              { href: "/", label: "Home" },
              { href: "/pricing", label: "Pricing" },
            ]}
          />
          <div className="mt-2 text-sm font-semibold uppercase tracking-wide text-brand">
            Pricing guide
          </div>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-ink md:text-5xl">
            Home Service Costs in Georgetown TX (2026)
          </h1>

          <aside className="mt-6 rounded-xl border border-rating/25 bg-rating/10 p-5 text-sm leading-relaxed text-rating">
            <p>
              Prices below reflect typical ranges for Georgetown TX as of 2026. Your actual cost will vary based on
              home size, age, job complexity, materials, and provider. Always get 2-3 quotes before committing to any
              project.
            </p>
          </aside>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            This page lists real, planning-friendly price ranges for the home services Georgetown homeowners call most
            often—updated for {PRICING_YEAR} so you can set expectations before you dial. These are not quotes; use them
            to compare written bids line-by-line. Want to add up line items?{" "}
            <Link href="/pricing/calculator" className="font-medium text-brand underline-offset-4 hover:underline">
              Open the interactive estimator
            </Link>
            . Editorial ranges last reviewed {PRICING_LAST_REVIEWED_MONTH}.
          </p>

          <nav aria-label="Pricing categories" className="mt-8">
            <div className="text-xs font-semibold uppercase tracking-wide text-muted">Jump to a category</div>
            <ul className="mt-3 flex flex-wrap gap-2">
              {PRICING_CATEGORIES.map((c) => (
                <li key={c.key}>
                  <Link
                    href={`#${c.key}`}
                    className="inline-flex items-center rounded-full border border-ink/15 bg-surface px-3 py-1 text-sm text-ink hover:bg-surface-alt"
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

          <section className="mt-16 rounded-xl border border-ink/10 bg-surface p-6 shadow-sm">
            <h2 className="text-2xl font-semibold tracking-tight text-ink">Before you hire</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Get two or three written scopes for the same work, ask what permits are included, and confirm how
              discovery during the job (extra decking, slab access, panel capacity) is priced. Your estimate—not this
              page—is the binding number for your home.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Link
                href="/services"
                className="rounded-lg border border-ink/10 p-4 hover:bg-surface-alt"
              >
                <div className="text-sm font-semibold text-ink">Service guides</div>
                <div className="mt-1 text-sm text-muted">Hiring checklists and cost drivers by trade.</div>
              </Link>
              <Link href="/best" className="rounded-lg border border-ink/10 p-4 hover:bg-surface-alt">
                <div className="text-sm font-semibold text-ink">Best-of directory</div>
                <div className="mt-1 text-sm text-muted">Shortlists of reviewed Georgetown providers.</div>
              </Link>
            </div>
          </section>

          <p className="mt-10 text-xs leading-relaxed text-muted">
            Editorial disclosure: Georgetown Home Services is a directory and homeowner guide. We do not perform home
            services or dispatch contractors. Ranges are synthesized for planning in Williamson County; your written
            estimate is the only reliable figure for your project.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
