"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  PRICING_CATEGORIES,
  PRICING_LAST_REVIEWED_MONTH,
  formatPricingRange,
  type PricingCategory,
} from "../lib/pricing-data";

export default function PricingEstimatorInteractive() {
  const [catKey, setCatKey] = useState<PricingCategory["key"]>("plumbing");
  const [selectedJobs, setSelectedJobs] = useState<Set<string>>(new Set());

  const category = useMemo(
    () => PRICING_CATEGORIES.find((c) => c.key === catKey)!,
    [catKey],
  );

  useEffect(() => {
    setSelectedJobs(new Set());
  }, [catKey]);

  function toggleJob(job: string) {
    setSelectedJobs((prev) => {
      const next = new Set(prev);
      if (next.has(job)) next.delete(job);
      else next.add(job);
      return next;
    });
  }

  const totals = useMemo(() => {
    let low = 0;
    let high = 0;
    for (const row of category.rows) {
      if (!selectedJobs.has(row.job) || row.excludeFromEstimatorSum) continue;
      low += row.low;
      high += row.high;
    }
    return { low, high };
  }, [category.rows, selectedJobs]);

  const hasSelection = selectedJobs.size > 0;

  return (
    <div className="not-prose space-y-8">
      <div className="rounded-xl border border-ink/10 bg-surface p-5 shadow-sm">
        <div className="text-xs font-semibold uppercase tracking-wide text-muted">Trade</div>
        <div className="mt-3 flex flex-wrap gap-2">
          {PRICING_CATEGORIES.map((c) => (
            <button
              key={c.key}
              type="button"
              onClick={() => setCatKey(c.key)}
              className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
                c.key === catKey
                  ? "border-brand bg-accent text-white"
                  : "border-ink/15 bg-surface text-ink hover:bg-surface-alt"
              }`}
            >
              {c.title.replace(/ Costs in Georgetown TX$/i, "")}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-ink/10 bg-surface p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-ink">{category.title}</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">{category.intro}</p>
        <p className="mt-3 text-xs text-muted">
          Select any jobs you are planning — we total the editorial low and high ends of the ranges (
          {PRICING_LAST_REVIEWED_MONTH} review). This is not a quote.
        </p>

        <ul className="mt-4 divide-y divide-ink/10 rounded-lg border border-ink/10">
          {category.rows.map((row) => {
            const on = selectedJobs.has(row.job);
            return (
              <li key={row.job} className="flex gap-3 px-3 py-3 sm:items-center">
                <input
                  id={`job-${catKey}-${row.job}`}
                  type="checkbox"
                  checked={on}
                  onChange={() => toggleJob(row.job)}
                  className="mt-1 h-4 w-4 shrink-0 rounded border-ink/15 text-brand focus:ring-brand/30 sm:mt-0"
                />
                <label
                  htmlFor={`job-${catKey}-${row.job}`}
                  className="min-w-0 flex-1 cursor-pointer text-sm leading-snug text-ink"
                >
                  {row.job}
                </label>
                <span className="shrink-0 text-sm font-semibold tabular-nums text-ink">
                  {formatPricingRange(row)}
                </span>
              </li>
            );
          })}
        </ul>

        <div className="mt-5 rounded-lg bg-surface-alt px-4 py-3 text-sm">
          {hasSelection ? (
            <p className="font-medium text-ink">
              Combined range (sum of selected jobs):{" "}
              <span className="tabular-nums">
                ${totals.low.toLocaleString()} – ${totals.high.toLocaleString()}
              </span>
            </p>
          ) : (
            <p className="text-muted">Select one or more line items to see a combined planning range.</p>
          )}
        </div>
      </div>

      <div>
        <div className="text-xs font-semibold uppercase tracking-wide text-muted">
          Local context (Georgetown)
        </div>
        <p className="mt-2 text-sm leading-relaxed text-muted">{category.localContext}</p>
      </div>

      <p className="text-xs leading-relaxed text-muted">
        Same disclosure as the main pricing guide: Georgetown Home Services does not perform work or dispatch
        contractors. Ranges are editorial. Your written estimates are the only reliable numbers for your home.
      </p>

      <p className="text-sm">
        <Link href="/pricing" className="font-medium text-brand underline-offset-4 hover:underline">
          ← Full pricing tables and FAQs
        </Link>
      </p>
    </div>
  );
}
