"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { LicensedProvider } from "@/lib/providers";
import { slugifyCityName } from "@/lib/providers";

function labelCity(city: string): string {
  return city.trim() || "City not listed";
}

export default function ProvidersDirectoryFilters({
  providers,
  trades,
  cities,
  counties,
  cityPageSlugs,
  initialTrade = "",
  initialCity = "",
  initialCounty = "",
}: {
  providers: LicensedProvider[];
  trades: string[];
  cities: string[];
  counties: string[];
  cityPageSlugs: string[];
  initialTrade?: string;
  initialCity?: string;
  initialCounty?: string;
}) {
  const [trade, setTrade] = useState(initialTrade);
  const [city, setCity] = useState(initialCity);
  const [county, setCounty] = useState(initialCounty);
  const cityPageSet = useMemo(() => new Set(cityPageSlugs), [cityPageSlugs]);

  const filtered = useMemo(() => {
    return providers.filter((p) => {
      if (trade && p.trade.toLowerCase() !== trade.toLowerCase()) return false;
      if (city && p.city.trim().toLowerCase() !== city.toLowerCase()) return false;
      if (county && p.county.trim().toLowerCase() !== county.toLowerCase()) return false;
      return true;
    });
  }, [providers, trade, city, county]);

  return (
    <div>
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <label className="block text-sm">
          <span className="font-medium text-ink">Trade</span>
          <select
            className="mt-1 w-full rounded-lg border border-ink/15 bg-surface px-3 py-2 text-sm text-ink"
            value={trade}
            onChange={(e) => setTrade(e.target.value)}
          >
            <option value="">All trades</option>
            {trades.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="font-medium text-ink">City</span>
          <select
            className="mt-1 w-full rounded-lg border border-ink/15 bg-surface px-3 py-2 text-sm text-ink"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          >
            <option value="">All cities</option>
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="font-medium text-ink">County</span>
          <select
            className="mt-1 w-full rounded-lg border border-ink/15 bg-surface px-3 py-2 text-sm text-ink"
            value={county}
            onChange={(e) => setCounty(e.target.value)}
          >
            <option value="">All counties</option>
            {counties.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className="mt-4 text-sm text-muted">
        Showing {filtered.length} of {providers.length} licensed providers.
      </p>

      <ul className="mt-6 divide-y divide-ink/10 rounded-xl border border-ink/10 bg-surface">
        {filtered.map((p) => {
          const cityLabel = labelCity(p.city);
          const citySlug = p.city.trim() ? slugifyCityName(p.city) : null;
          const cityHasPage = Boolean(citySlug && cityPageSet.has(citySlug));
          return (
            <li key={p.slug} className="flex flex-col gap-1 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <Link
                  href={`/providers/${p.slug}`}
                  className="font-semibold text-ink hover:text-brand hover:underline"
                >
                  {p.company}
                </Link>
                <p className="mt-1 text-sm text-muted">
                  {p.trade}
                  {" · "}
                  {cityHasPage && citySlug ? (
                    <Link href={`/providers/city/${citySlug}`} className="hover:underline">
                      {cityLabel}
                    </Link>
                  ) : (
                    cityLabel
                  )}
                  {p.county.trim() ? ` · ${p.county} County` : ""}
                  {p.verified ? " · License verified" : " · Insurance expired on state file"}
                </p>
              </div>
              <Link
                href={`/providers/${p.slug}`}
                className="mt-2 shrink-0 text-sm font-semibold text-brand hover:underline sm:mt-0"
              >
                View profile
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
