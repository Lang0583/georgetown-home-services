import type { ReactNode } from "react";
import { formatRatingOneDecimal, RatingStarsRow } from "./BusinessRatingStars";
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
      label: "Star rating + reviews",
      a: (
        <RatingCell rating={providerA.rating} reviewCount={providerA.reviewCount} />
      ),
      b: (
        <RatingCell rating={providerB.rating} reviewCount={providerB.reviewCount} />
      ),
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
    <div className="mt-6 overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-md">
      <table className="min-w-full text-left text-sm">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th scope="col" className="px-4 py-3 font-semibold text-gray-900">
              Compare
            </th>
            <th scope="col" className="px-4 py-3 font-semibold text-gray-900">
              {providerA.name}
            </th>
            <th scope="col" className="px-4 py-3 font-semibold text-gray-900">
              {providerB.name}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-b border-gray-100 align-top last:border-b-0">
              <th scope="row" className="px-4 py-3 font-medium text-gray-700">
                {row.label}
              </th>
              <td className="px-4 py-3 text-gray-700">{row.a}</td>
              <td className="px-4 py-3 text-gray-700">{row.b}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RatingCell({ rating, reviewCount }: { rating: number; reviewCount: number }) {
  return (
    <div className="space-y-1">
      <RatingStarsRow rating={rating} />
      <div className="font-semibold text-gray-900">
        {formatRatingOneDecimal(rating)} ★ · {reviewCount.toLocaleString()} Google reviews
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
