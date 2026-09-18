"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { Button } from "@/components/Button";
import {
  LOOKUP_AREAS,
  PLANTS,
  WATER_SPEC,
  formatUsd,
  plantPublishedHardness,
  plantsForLookupArea,
  type WaterLookupArea,
  type WaterPlantKey,
} from "@/data/water";
import { trackEvent } from "@/lib/analytics";
import { getContact } from "@/lib/site-content";

const inputClass =
  "mt-1 w-full rounded-lg border border-ink/10 bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-brand focus:ring-2 focus:ring-brand/20";

const AREA_OPTIONS: { value: WaterLookupArea; label: string }[] = [
  { value: LOOKUP_AREAS.southlake, label: "Southlake / Lake Georgetown service" },
  { value: LOOKUP_AREAS.park_southside, label: "Park Plant / Southside service" },
  { value: LOOKUP_AREAS.not_sure, label: "Not sure which plant" },
  { value: LOOKUP_AREAS.other, label: "Other / outside these plants" },
];

const BAND_HEADLINE: Record<WaterPlantKey, string> = {
  southlake: "Your area maps to the Southlake / Lake Georgetown band.",
  park: "Your area maps to the Park / Southside band.",
};

const BAND_LIST_LABEL: Record<WaterPlantKey, string> = {
  southlake: "Southlake / Lake Georgetown",
  park: "Park / Southside",
};

function isLookupArea(value: string): value is WaterLookupArea {
  return (Object.values(LOOKUP_AREAS) as string[]).includes(value);
}

export default function WaterPlantLookup() {
  const baseId = useId();
  const contact = getContact();
  const south = PLANTS.southlake;
  const park = PLANTS.park;

  const [area, setArea] = useState("");
  const [zip, setZip] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [resultKeys, setResultKeys] = useState<WaterPlantKey[] | null>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setResultKeys(null);

    const trimmedZip = zip.trim();
    if (trimmedZip && !/^\d{5}$/.test(trimmedZip)) {
      setError("ZIP must be 5 digits if you include one.");
      return;
    }
    if (!isLookupArea(area)) {
      setError(
        `Pick where the home is, then try again. If this keeps failing, email ${contact.email} with your ZIP and we will point you to the plant pages.`,
      );
      return;
    }

    const keys = plantsForLookupArea(area);
    setResultKeys(keys);
    trackEvent("water_lookup_submit", {
      event_category: "water",
      lookup_area: area,
      result: keys.length === 1 ? keys[0] : "both",
      has_zip: trimmedZip ? "yes" : "no",
    });
  }

  return (
    <section
      id="free-lookup"
      className="mt-8 scroll-mt-28 rounded-2xl border border-ink/10 bg-surface p-6 shadow-sm md:p-8"
    >
      <h2 className="text-2xl font-semibold tracking-tight text-ink">Free plant lookup</h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
        {BAND_LIST_LABEL.southlake}: {plantPublishedHardness(south)}. {BAND_LIST_LABEL.park}:{" "}
        {plantPublishedHardness(park)}. If you are not sure, we show both. We will not invent a middle
        number.
      </p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4" noValidate>
        <div>
          <label htmlFor={`${baseId}-area`} className="block text-sm font-medium text-ink">
            Where is the home? <span className="text-rose-600">*</span>
          </label>
          <select
            id={`${baseId}-area`}
            name="lookup_area"
            required
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className={inputClass}
          >
            <option value="">Select one</option>
            {AREA_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor={`${baseId}-zip`} className="block text-sm font-medium text-ink">
            ZIP (optional)
          </label>
          <input
            id={`${baseId}-zip`}
            name="lookup_zip"
            inputMode="numeric"
            maxLength={5}
            autoComplete="postal-code"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            className={inputClass}
          />
        </div>

        {error ? (
          <p className="text-sm text-rose-700" role="alert">
            {error}
          </p>
        ) : null}

        <Button type="submit" className="text-sm">
          Show my hardness band
        </Button>
      </form>

      {resultKeys ? (
        <div
          className="mt-6 rounded-xl border border-ink/10 bg-surface-alt/80 p-5"
          aria-live="polite"
        >
          {resultKeys.length === 1 ? (
            <KnownPlantResult plantKey={resultKeys[0]} />
          ) : (
            <BothBandsResult />
          )}
        </div>
      ) : null}
    </section>
  );
}

function KnownPlantResult({ plantKey }: { plantKey: WaterPlantKey }) {
  const plant = PLANTS[plantKey];
  return (
    <>
      <p className="text-sm font-semibold text-ink">{BAND_HEADLINE[plantKey]}</p>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        Published hardness: {plantPublishedHardness(plant)}.
      </p>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        This is a published plant band, not a lab test of your tap. Georgetown Home Services is not the
        City of Georgetown and we do not install equipment.
      </p>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        Want the numbers written out for your household size? The {formatUsd(WATER_SPEC.priceUsd)} spec
        prints the formula with your people count and capacity targets, plus contractor questions to
        ask.
      </p>
      <LookupCtas bothBands={false} plantHref={`/water/${plant.slug}`} />
    </>
  );
}

function BothBandsResult() {
  const south = PLANTS.southlake;
  const park = PLANTS.park;
  return (
    <>
      <p className="text-sm font-semibold text-ink">
        We do not know which plant feeds this home yet, so here are both published bands. We will not
        average them.
      </p>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted">
        <li>
          {BAND_LIST_LABEL.southlake}: {plantPublishedHardness(south)}
        </li>
        <li>
          {BAND_LIST_LABEL.park}: {plantPublishedHardness(park)}
        </li>
      </ul>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        Ask your utility bill, neighbors on the same main, or the city which plant serves your street.
        Or grab the {formatUsd(WATER_SPEC.priceUsd)} spec and we will size both bands so you can take
        either sheet to a contractor.
      </p>
      <LookupCtas bothBands />
    </>
  );
}

function LookupCtas({ bothBands, plantHref }: { bothBands: boolean; plantHref?: string }) {
  return (
    <div className="mt-5 flex flex-wrap items-center gap-3">
      <Link href="#paid-spec" className="font-semibold text-brand hover:underline">
        Get the {formatUsd(WATER_SPEC.priceUsd)} written sizing spec
        {bothBands ? " (both bands)" : ""}
      </Link>
      {plantHref ? (
        <Link href={plantHref} className="font-semibold text-brand hover:underline">
          Read the plant page
        </Link>
      ) : (
        <>
          <Link href={`/water/${PLANTS.southlake.slug}`} className="font-semibold text-brand hover:underline">
            Southlake plant page
          </Link>
          <Link href={`/water/${PLANTS.park.slug}`} className="font-semibold text-brand hover:underline">
            Park plant page
          </Link>
        </>
      )}
    </div>
  );
}
