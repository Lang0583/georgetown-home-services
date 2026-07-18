/**
 * Side-by-side provider comparison from existing Provider records only.
 * Rows are omitted when no compared provider has data for that field.
 * Never infers response times, warranties, or prices.
 */

import type { ReactNode } from "react";
import Link from "next/link";
import type { Provider } from "@/data/providers";
import { providerDetailHref } from "@/lib/internalLinks";
import { formatLicenseLookupDate } from "@/lib/provider-license";
import { providerHasPublishedReviewCount } from "@/lib/provider-card-display";
import { formatRatingOneDecimal, RatingStarsRow } from "./BusinessRatingStars";
import { BusinessPhoneRow } from "./BusinessPhoneRow";

function ProviderHeading({ provider }: { provider: Provider }) {
  const href = providerDetailHref(provider.name);
  if (!href) return <>{provider.name}</>;
  return (
    <Link href={href} className="hover:text-brand hover:underline">
      {provider.name}
    </Link>
  );
}

const INSURANCE_STATUS_LABEL: Record<
  NonNullable<Provider["insuranceStatus"]>,
  string
> = {
  verified: "Insurance verified",
  "self-attested": "Insurance self-attested",
  "not-verified": "Insurance not verified",
};

type ComparisonRow = {
  label: string;
  cells: ReactNode[];
};

function hasLicenseData(p: Provider): boolean {
  return Boolean(p.licenseNumber?.trim());
}

function licenseCell(p: Provider): ReactNode {
  if (!hasLicenseData(p)) return <span className="text-muted">—</span>;
  const body = p.licenseBody?.trim();
  const number = p.licenseNumber!.trim();
  const date = p.licenseVerifiedDate?.trim()
    ? formatLicenseLookupDate(p.licenseVerifiedDate.trim())
    : null;
  return (
    <div className="space-y-0.5">
      {body ? <div className="font-semibold text-ink">{body}</div> : null}
      <div className="font-mono text-sm text-ink">{number}</div>
      {date ? <div className="text-xs text-muted">Verified {date}</div> : null}
    </div>
  );
}

function hasInsuranceData(p: Provider): boolean {
  return p.insuranceStatus != null;
}

function insuranceCell(p: Provider): ReactNode {
  if (!hasInsuranceData(p)) return <span className="text-muted">—</span>;
  return INSURANCE_STATUS_LABEL[p.insuranceStatus!];
}

function hasSpecialtiesData(p: Provider): boolean {
  return Array.isArray(p.specialties) && p.specialties.some((s) => s.trim().length > 0);
}

function specialtiesCell(p: Provider): ReactNode {
  if (!hasSpecialtiesData(p)) return <span className="text-muted">—</span>;
  const items = p.specialties.map((s) => s.trim()).filter(Boolean);
  return (
    <ul className="list-disc space-y-1 pl-4">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function hasEmergencyData(p: Provider): boolean {
  return typeof p.emergencyAvailable === "boolean";
}

function emergencyCell(p: Provider): ReactNode {
  if (!hasEmergencyData(p)) return <span className="text-muted">—</span>;
  return p.emergencyAvailable
    ? "Emergency / after-hours available"
    : "Not listed as available";
}

function hasServiceAreaData(p: Provider): boolean {
  const neighborhoods = Array.isArray(p.neighborhoodsServed)
    ? p.neighborhoodsServed.filter((n) => n.trim())
    : [];
  const zips = Array.isArray(p.zipsServed) ? p.zipsServed.filter((z) => z.trim()) : [];
  return neighborhoods.length > 0 || zips.length > 0;
}

function serviceAreaCell(p: Provider): ReactNode {
  if (!hasServiceAreaData(p)) return <span className="text-muted">—</span>;
  const neighborhoods = (p.neighborhoodsServed ?? []).map((n) => n.trim()).filter(Boolean);
  const zips = (p.zipsServed ?? []).map((z) => z.trim()).filter(Boolean);
  return (
    <div className="space-y-2">
      {neighborhoods.length > 0 ? (
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-muted">Neighborhoods</div>
          <p className="mt-0.5 text-ink">{neighborhoods.join(", ")}</p>
        </div>
      ) : null}
      {zips.length > 0 ? (
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-muted">ZIP codes</div>
          <p className="mt-0.5 text-ink">{zips.join(", ")}</p>
        </div>
      ) : null}
    </div>
  );
}

function hasRatingData(p: Provider): boolean {
  return typeof p.rating === "number" && Number.isFinite(p.rating);
}

function ratingCell(p: Provider): ReactNode {
  if (!hasRatingData(p)) return <span className="text-muted">—</span>;
  const reviewLabel = providerHasPublishedReviewCount(p)
    ? `${p.reviewCount.toLocaleString()} Google reviews`
    : null;
  return (
    <div className="space-y-1">
      <RatingStarsRow rating={p.rating} />
      <div className="font-semibold text-ink">
        {formatRatingOneDecimal(p.rating)} ★
        {reviewLabel ? <span className="font-normal text-muted"> · {reviewLabel}</span> : null}
      </div>
    </div>
  );
}

function hasPhoneData(p: Provider): boolean {
  return Boolean(p.phone?.trim());
}

function phoneCell(p: Provider): ReactNode {
  if (!hasPhoneData(p)) return <span className="text-muted">—</span>;
  return (
    <BusinessPhoneRow
      phone={p.phone}
      providerName={p.name}
      category={p.category}
      wrapperClassName={null}
      className="font-semibold text-brand hover:underline"
    />
  );
}

function buildRows(providers: Provider[]): ComparisonRow[] {
  const candidates: {
    label: string;
    hasData: (p: Provider) => boolean;
    cell: (p: Provider) => ReactNode;
  }[] = [
    { label: "License status", hasData: hasLicenseData, cell: licenseCell },
    { label: "Insurance status", hasData: hasInsuranceData, cell: insuranceCell },
    { label: "Specialties", hasData: hasSpecialtiesData, cell: specialtiesCell },
    {
      label: "Emergency / after-hours availability",
      hasData: hasEmergencyData,
      cell: emergencyCell,
    },
    {
      label: "Service area (neighborhoods + ZIPs)",
      hasData: hasServiceAreaData,
      cell: serviceAreaCell,
    },
    { label: "Rating and review count", hasData: hasRatingData, cell: ratingCell },
    { label: "Phone", hasData: hasPhoneData, cell: phoneCell },
  ];

  return candidates
    .filter((row) => providers.some((p) => row.hasData(p)))
    .map((row) => ({
      label: row.label,
      cells: providers.map((p) => row.cell(p)),
    }));
}

export default function ComparisonTable({ providers }: { providers: Provider[] }) {
  const list = providers.slice(0, 3);
  if (list.length < 2) return null;

  const rows = buildRows(list);
  if (!rows.length) return null;

  return (
    <div className="mt-6">
      {/* Mobile: stacked cards — no horizontal scroll */}
      <div className="space-y-4 md:hidden">
        {list.map((provider, index) => (
          <article
            key={`${provider.category}-${provider.name}`}
            className="rounded-xl border border-ink/10 bg-surface p-4 shadow-sm"
          >
            <h3 className="text-base font-semibold tracking-tight text-ink">
              <ProviderHeading provider={provider} />
            </h3>
            <dl className="mt-4 space-y-3">
              {rows.map((row) => (
                <div key={row.label}>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-muted">
                    {row.label}
                  </dt>
                  <dd className="mt-1 text-sm text-muted">{row.cells[index]}</dd>
                </div>
              ))}
            </dl>
          </article>
        ))}
      </div>

      {/* Desktop / tablet: column table */}
      <div className="hidden overflow-hidden rounded-xl border border-ink/10 bg-surface shadow-md md:block">
        <table className="w-full table-fixed text-left text-sm">
          <thead>
            <tr className="border-b border-ink/10 bg-surface-alt">
              <th scope="col" className="w-[22%] px-4 py-3 font-semibold text-ink">
                Compare
              </th>
              {list.map((provider) => (
                <th
                  key={`${provider.category}-${provider.name}`}
                  scope="col"
                  className="px-4 py-3 font-semibold text-ink"
                >
                  <ProviderHeading provider={provider} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-b border-ink/10 align-top last:border-b-0">
                <th scope="row" className="px-4 py-3 font-medium text-muted">
                  {row.label}
                </th>
                {row.cells.map((cell, i) => (
                  <td key={`${row.label}-${i}`} className="px-4 py-3 text-muted">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
