import type { Metadata } from "next";
import Breadcrumbs from "../../../components/Breadcrumbs";
import PricingEstimatorInteractive from "../../../components/PricingEstimatorInteractive";
import PageShell from "../../../components/templates/PageShell";
import { pageSeoMetadata } from "../../../lib/page-seo";
import { PRICING_LAST_REVIEWED_MONTH, PRICING_YEAR } from "../../../lib/pricing-data";

export const metadata: Metadata = pageSeoMetadata({
  titleSegment: `Interactive Home Service Cost Estimator (${PRICING_YEAR})`,
  description: `Sum editorial Georgetown, TX price ranges by trade and job type for planning. Ranges reviewed ${PRICING_LAST_REVIEWED_MONTH} — not quotes.`,
  pathname: "/pricing/calculator",
  ogType: "website",
});

export default function PricingCalculatorPage() {
  return (
    <PageShell>
      <section className="py-10 md:py-12">
        <div className="mx-auto max-w-3xl">
          <Breadcrumbs
            items={[
              { href: "/", label: "Home" },
              { href: "/pricing", label: "Pricing" },
              { href: "/pricing/calculator", label: "Calculator" },
            ]}
          />
          <div className="mt-2 text-sm font-semibold uppercase tracking-wide text-brand">
            Planning tool
          </div>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-ink md:text-5xl">
            Home service cost estimator — Georgetown, TX
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            Pick a trade, then select the jobs you are comparing bids on. We add the low and high ends of our
            editorial ranges so you can sanity-check contractor quotes — not replace them.
          </p>

          <aside className="mt-8 rounded-xl border border-rating/25 bg-rating/10 p-5 text-sm leading-relaxed text-rating">
            <div className="font-semibold">Not a quote</div>
            <p className="mt-2">
              Real projects bundle labor, discovery, and code upgrades. Summing line items double-counts
              trip charges if you select everything; use this as a rough bracket for one or a few scopes at a time.
            </p>
          </aside>

          <div className="mt-10">
            <PricingEstimatorInteractive />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
