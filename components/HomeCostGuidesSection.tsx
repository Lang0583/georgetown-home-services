import Link from "next/link";
import { getFeaturedCostGuides } from "@/data/cost-guides";
import { showExtendedHomeServices } from "@/lib/public-site-scope";

export default function HomeCostGuidesSection() {
  const guides = getFeaturedCostGuides().filter((p) => showExtendedHomeServices() || !p.extended);

  return (
    <section
      id="cost-guides"
      className="mt-10 scroll-mt-28 rounded-xl border border-ink/10 bg-surface p-6 shadow-md sm:p-8"
      aria-labelledby="cost-guides-heading"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 id="cost-guides-heading" className="text-xl font-semibold tracking-tight text-ink">
            Cost Guides
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
            How much does it cost in Georgetown, TX? Start with our most-searched price breakdowns—tables, FAQs, and local
            hiring tips.
          </p>
        </div>
        <Link href="/costs" className="text-sm font-semibold text-brand hover:underline">
          View all cost guides →
        </Link>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {guides.map((guide) => (
          <Link
            key={guide.slug}
            href={`/costs/${guide.slug}`}
            className="rounded-lg border border-ink/10 bg-surface-alt p-4 transition hover:border-brand/25 hover:bg-surface"
          >
            <div className="text-sm font-semibold text-ink">{guide.shortName ?? guide.serviceName}</div>
            <p className="mt-1 line-clamp-2 text-xs text-muted">{guide.indexBlurb}</p>
            <div className="mt-2 text-xs font-semibold text-brand">See {guide.year} prices →</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
