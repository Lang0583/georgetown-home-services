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
      className="not-prose my-10 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
          {supplement.heading}
        </h2>
        <div className="shrink-0 text-xs font-medium uppercase tracking-wide text-gray-500">
          Reviewed {PRICING_LAST_REVIEWED_MONTH}
        </div>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-gray-700">{supplement.lede}</p>
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
            {rows.map((row) => (
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
          What moves the number in Georgetown
        </div>
        <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-gray-700">
          {category.priceDrivers.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      </div>
      <p className="mt-5 text-xs leading-relaxed text-gray-500">
        These are editorial ranges for planning, not quotes. Compare at least two
        written estimates before committing. Full category tables live on the{" "}
        <Link href="/pricing" className="font-medium text-primary underline-offset-4 hover:underline">
          Georgetown home-service pricing guide
        </Link>{" "}
        ({PRICING_YEAR}).
      </p>
    </section>
  );
}
