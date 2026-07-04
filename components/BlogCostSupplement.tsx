import Link from "next/link";
import {
  COST_POST_SUPPLEMENTS,
  findCategory,
  formatPricingRange,
  PRICING_LAST_REVIEWED_MONTH,
  PRICING_YEAR,
  type CostPostSupplement,
} from "../lib/pricing-data";

/**
 * Renders an editorial pricing-range block inside cost-guide blog posts.
 *
 * Blog cost posts historically lacked concrete dollar figures; Google's
 * helpful-content signals penalize pages that promise cost info in the title
 * but don't deliver it in the body. This component injects real Georgetown
 * price ranges sourced from `lib/pricing-data.ts` so there is one place to
 * update ranges when they refresh quarterly.
 *
 * Returns `null` (renders nothing) for any slug without a supplement entry.
 */
export default function BlogCostSupplement({ slug }: { slug: string }) {
  const supplement: CostPostSupplement | undefined = COST_POST_SUPPLEMENTS[slug];
  if (!supplement) return null;

  const category = findCategory(supplement.category);
  const rows = supplement.rowJobs
    .map((job) => category.rows.find((r) => r.job === job))
    .filter((r): r is (typeof category.rows)[number] => Boolean(r));

  if (rows.length === 0) return null;

  return (
    <section
      aria-label={supplement.heading}
      className="not-prose my-10 rounded-xl border border-ink/10 bg-surface p-6 shadow-sm"
    >
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="text-2xl font-semibold tracking-tight text-ink">
          {supplement.heading}
        </h2>
        <div className="shrink-0 text-xs font-medium uppercase tracking-wide text-muted">
          Reviewed {PRICING_LAST_REVIEWED_MONTH}
        </div>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted">{supplement.lede}</p>
      <div className="mt-5 overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-ink/10 text-xs font-semibold uppercase tracking-wide text-muted">
            <tr>
              <th scope="col" className="py-2 pr-4">
                Job type
              </th>
              <th scope="col" className="py-2 pr-4">
                Typical cost range
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink/10 text-ink">
            {rows.map((row) => (
              <tr key={row.job}>
                <td className="py-3 pr-4 align-top font-medium text-ink">{row.job}</td>
                <td className="py-3 pr-4 align-top font-semibold tabular-nums">
                  {formatPricingRange(row)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-5 text-sm leading-relaxed text-muted">{category.localContext}</p>
      <p className="mt-5 text-xs leading-relaxed text-muted">
        These are editorial ranges for planning, not quotes. Compare at least two
        written estimates before committing. Full category tables live on the{" "}
        <Link href="/pricing" className="font-medium text-brand underline-offset-4 hover:underline">
          Georgetown home-service pricing guide
        </Link>{" "}
        ({PRICING_YEAR}).
      </p>
    </section>
  );
}
