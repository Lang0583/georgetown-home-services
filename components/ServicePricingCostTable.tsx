import type { PricingRow } from "../lib/pricing-data";
import {
  formatPricingHigh,
  formatPricingLow,
  formatPricingRange,
  formatPricingTypical,
} from "../lib/pricing-data";

type ServicePricingCostTableProps = {
  rows: PricingRow[];
  /** When `range`, show a single combined range column (pricing hub). Default: low / typical / high. */
  variant?: "bands" | "range";
  jobHeader?: string;
};

/**
 * Shared cost table for `/pricing`, core service guides, and trade hubs.
 * Data always comes from `lib/pricing-data.ts`.
 */
export default function ServicePricingCostTable({
  rows,
  variant = "bands",
  jobHeader = "Common job",
}: ServicePricingCostTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-sm">
        <thead>
          <tr className="border-b border-ink/10 text-xs font-semibold uppercase tracking-wide text-muted">
            <th scope="col" className="py-2 pr-4">
              {jobHeader}
            </th>
            {variant === "bands" ? (
              <>
                <th scope="col" className="py-2 pr-4">
                  Low
                </th>
                <th scope="col" className="py-2 pr-4">
                  Typical
                </th>
                <th scope="col" className="py-2">
                  High
                </th>
              </>
            ) : (
              <th scope="col" className="py-2">
                Typical cost range
              </th>
            )}
          </tr>
        </thead>
        <tbody className="text-ink">
          {rows.map((row) => (
            <tr key={row.job} className="border-b border-ink/10 last:border-0">
              <td className="py-3 pr-4 align-top font-medium text-ink">{row.job}</td>
              {variant === "bands" ? (
                <>
                  <td className="py-3 pr-4 align-top tabular-nums text-ink">{formatPricingLow(row)}</td>
                  <td className="py-3 pr-4 align-top tabular-nums font-semibold text-ink">
                    {formatPricingTypical(row)}
                  </td>
                  <td className="py-3 align-top tabular-nums text-ink">{formatPricingHigh(row)}</td>
                </>
              ) : (
                <td className="py-3 align-top tabular-nums font-semibold text-ink">
                  {formatPricingRange(row)}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
