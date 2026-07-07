import type { ReactNode } from "react";
import { formatRatingOneDecimal, RatingStarsRow } from "./BusinessRatingStars";
import { providerVerifiedCaption } from "@/lib/provider-rating-display";
import type { ComparisonProvider } from "../data/comparisons";

function formatWrittenEstimates(value: boolean) {
  return value ? "Yes — written estimates offered" : "Contact for details";
}

export default function ComparisonTable({
  providerA,
  providerB,
}: {
  providerA: ComparisonProvider;
  providerB: ComparisonProvider;
}) {
  const rows: { label: string; a: ReactNode; b: ReactNode }[] = [
    {
      label: "Star rating",
      a: <RatingCell rating={providerA.rating} />,
      b: <RatingCell rating={providerB.rating} />,
    },
    {
      label: "Years in business",
      a: `${providerA.yearsInBusiness} years`,
      b: `${providerB.yearsInBusiness} years`,
    },
    {
      label: "Service area",
      a: providerA.serviceArea,
      b: providerB.serviceArea,
    },
    {
      label: "Specialties",
      a: <BulletList items={providerA.specialties} />,
      b: <BulletList items={providerB.specialties} />,
    },
    {
      label: "Response time",
      a: providerA.responseTime,
      b: providerB.responseTime,
    },
    {
      label: "Pricing transparency",
      a: formatWrittenEstimates(providerA.writtenEstimates),
      b: formatWrittenEstimates(providerB.writtenEstimates),
    },
    {
      label: "Emergency availability",
      a: providerA.emergencyAvailability,
      b: providerB.emergencyAvailability,
    },
  ];

  return (
    <div className="mt-6 overflow-x-auto rounded-xl border border-ink/10 bg-surface shadow-md">
      <table className="min-w-full text-left text-sm">
        <thead>
          <tr className="border-b border-ink/10 bg-surface-alt">
            <th scope="col" className="px-4 py-3 font-semibold text-ink">
              Compare
            </th>
            <th scope="col" className="px-4 py-3 font-semibold text-ink">
              {providerA.name}
            </th>
            <th scope="col" className="px-4 py-3 font-semibold text-ink">
              {providerB.name}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-b border-ink/10 align-top last:border-b-0">
              <th scope="row" className="px-4 py-3 font-medium text-muted">
                {row.label}
              </th>
              <td className="px-4 py-3 text-muted">{row.a}</td>
              <td className="px-4 py-3 text-muted">{row.b}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RatingCell({ rating }: { rating: number }) {
  return (
    <div className="space-y-1">
      <RatingStarsRow rating={rating} />
      <div className="font-semibold text-ink">
        {formatRatingOneDecimal(rating)} ★ · {providerVerifiedCaption()}
      </div>
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-1 pl-4">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
