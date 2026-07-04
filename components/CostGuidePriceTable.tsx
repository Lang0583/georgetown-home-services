import type { CostGuidePriceRow } from "../data/cost-guides";

function formatUsd(amount: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(
    amount,
  );
}

function formatCell(row: CostGuidePriceRow, field: "low" | "average" | "high"): string {
  const amount = row[field];
  const base = formatUsd(amount);
  return row.unit ? `${base} ${row.unit}` : base;
}

type CostGuidePriceTableProps = {
  rows: CostGuidePriceRow[];
  year: string;
  caption?: string;
};

export default function CostGuidePriceTable({ rows, year, caption }: CostGuidePriceTableProps) {
  return (
    <div className="mt-6 overflow-x-auto">
      <table className="min-w-full text-left text-sm">
        <caption className="sr-only">{caption ?? `Georgetown TX price ranges ${year}`}</caption>
        <thead>
          <tr className="border-b border-ink/10 text-xs font-semibold uppercase tracking-wide text-muted">
            <th className="py-2 pr-4">Service type</th>
            <th className="py-2 pr-4">Low</th>
            <th className="py-2 pr-4">Average</th>
            <th className="py-2">High</th>
          </tr>
        </thead>
        <tbody className="text-ink">
          {rows.map((row) => (
            <tr key={row.serviceType} className="border-b border-ink/10 last:border-0">
              <td className="py-3 pr-4 align-top font-medium">{row.serviceType}</td>
              <td className="py-3 pr-4 align-top tabular-nums">{formatCell(row, "low")}</td>
              <td className="py-3 pr-4 align-top tabular-nums font-semibold text-ink">
                {formatCell(row, "average")}
              </td>
              <td className="py-3 align-top tabular-nums">{formatCell(row, "high")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
