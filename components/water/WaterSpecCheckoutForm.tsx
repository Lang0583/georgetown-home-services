"use client";

import { useEffect, useId, useState } from "react";
import { Button } from "@/components/Button";
import {
  PLANTS,
  SIZING_EXAMPLES,
  WATER_SPEC,
  formatToRange,
  formatUsd,
} from "@/data/water";
import { trackEvent } from "@/lib/analytics";
import {
  WATER_SPEC_ADDRESS_MAX,
  WATER_SPEC_NAME_MAX,
  WATER_SPEC_PEOPLE_MAX,
  WATER_SPEC_PEOPLE_MIN,
  WATER_SPEC_PLANT_BANDS,
  WATER_SPEC_PRODUCT,
  WATER_SPEC_REGEN_DAYS,
  type WaterSpecPlantBand,
  type WaterSpecRegenDays,
} from "@/lib/water-spec-checkout";

const inputClass =
  "mt-1 w-full rounded-lg border border-ink/10 bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-brand focus:ring-2 focus:ring-brand/20";

const DRAFT_KEY = "ghs_water_spec_draft";

type Draft = {
  customer_name: string;
  customer_email: string;
  people: string;
  plant_band: string;
  regen_days: WaterSpecRegenDays;
  address_or_zip: string;
};

const emptyDraft: Draft = {
  customer_name: "",
  customer_email: "",
  people: "",
  plant_band: "",
  regen_days: "3_and_4",
  address_or_zip: "",
};

function plantBandLabel(band: WaterSpecPlantBand): string {
  const south = PLANTS.southlake;
  const park = PLANTS.park;
  if (band === "southlake") {
    return `Plant: Southlake / Lake Georgetown (about ${formatToRange(south.gpgLow, south.gpgHigh)} gpg)`;
  }
  if (band === "park") {
    return `Plant: Park / Southside (about ${formatToRange(park.gpgLow, park.gpgHigh)} gpg)`;
  }
  return "Plant: Not sure. Size both bands.";
}

function regenLabel(value: WaterSpecRegenDays): string {
  if (value === "3") return `Regen: Plan for ${SIZING_EXAMPLES.regenDaysLow} days`;
  if (value === "4") return `Regen: Plan for ${SIZING_EXAMPLES.regenDaysHigh} days`;
  return `Regen: Show both ${SIZING_EXAMPLES.regenDaysLow} and ${SIZING_EXAMPLES.regenDaysHigh} day targets (recommended)`;
}

export default function WaterSpecCheckoutForm() {
  const baseId = useId();
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [affiliateAck, setAffiliateAck] = useState(false);
  const [cityAck, setCityAck] = useState(false);
  const [website, setWebsite] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(DRAFT_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Partial<Draft>;
      setDraft({
        ...emptyDraft,
        ...parsed,
        regen_days: WATER_SPEC_REGEN_DAYS.includes(parsed.regen_days as WaterSpecRegenDays)
          ? (parsed.regen_days as WaterSpecRegenDays)
          : "3_and_4",
      });
    } catch {
      // ignore bad draft
    }
  }, []);

  function update<K extends keyof Draft>(key: K, value: Draft[K]) {
    setDraft((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    try {
      sessionStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    } catch {
      // ignore
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/water/create-checkout-session", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          customer_name: draft.customer_name,
          customer_email: draft.customer_email,
          people: Number(draft.people),
          plant_band: draft.plant_band,
          regen_days: draft.regen_days,
          address_or_zip: draft.address_or_zip,
          product: WATER_SPEC_PRODUCT,
          affiliate_disclosure_ack: affiliateAck,
          city_disclosure_ack: cityAck,
          website,
        }),
      });
      const data = (await res.json().catch(() => null)) as { ok?: boolean; url?: string; error?: string } | null;
      if (!res.ok || !data?.url) {
        setError(data?.error ?? "Check the required fields and try again.");
        return;
      }
      trackEvent("water_spec_checkout_start", {
        event_category: "water",
        plant_band: draft.plant_band,
        product: WATER_SPEC_PRODUCT,
      });
      window.location.assign(data.url);
    } catch {
      setError("Check the required fields and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-4" noValidate>
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor={`${baseId}-hp`}>Website</label>
        <input
          id={`${baseId}-hp`}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <input type="hidden" name="product" value={WATER_SPEC_PRODUCT} />

      <div>
        <label htmlFor={`${baseId}-name`} className="block text-sm font-medium text-ink">
          Your name <span className="text-rose-600">*</span>
        </label>
        <input
          id={`${baseId}-name`}
          name="customer_name"
          required
          maxLength={WATER_SPEC_NAME_MAX}
          autoComplete="name"
          value={draft.customer_name}
          onChange={(e) => update("customer_name", e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor={`${baseId}-email`} className="block text-sm font-medium text-ink">
          Email for the PDF <span className="text-rose-600">*</span>
        </label>
        <input
          id={`${baseId}-email`}
          type="email"
          name="customer_email"
          required
          autoComplete="email"
          inputMode="email"
          value={draft.customer_email}
          onChange={(e) => update("customer_email", e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor={`${baseId}-people`} className="block text-sm font-medium text-ink">
          People in the home (for sizing) <span className="text-rose-600">*</span>
        </label>
        <input
          id={`${baseId}-people`}
          type="number"
          name="people"
          required
          min={WATER_SPEC_PEOPLE_MIN}
          max={WATER_SPEC_PEOPLE_MAX}
          step={1}
          inputMode="numeric"
          value={draft.people}
          onChange={(e) => update("people", e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor={`${baseId}-band`} className="block text-sm font-medium text-ink">
          Which plant band should we use? <span className="text-rose-600">*</span>
        </label>
        <select
          id={`${baseId}-band`}
          name="plant_band"
          required
          value={draft.plant_band}
          onChange={(e) => update("plant_band", e.target.value)}
          className={inputClass}
        >
          <option value="">Select one</option>
          {WATER_SPEC_PLANT_BANDS.map((band) => (
            <option key={band} value={band}>
              {plantBandLabel(band)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor={`${baseId}-regen`} className="block text-sm font-medium text-ink">
          Days between regenerations to plan for <span className="text-rose-600">*</span>
        </label>
        <select
          id={`${baseId}-regen`}
          name="regen_days"
          required
          value={draft.regen_days}
          onChange={(e) => update("regen_days", e.target.value as WaterSpecRegenDays)}
          className={inputClass}
        >
          {WATER_SPEC_REGEN_DAYS.map((value) => (
            <option key={value} value={value}>
              {regenLabel(value)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor={`${baseId}-address`} className="block text-sm font-medium text-ink">
          Street address or ZIP (optional, printed on the PDF)
        </label>
        <input
          id={`${baseId}-address`}
          name="address_or_zip"
          maxLength={WATER_SPEC_ADDRESS_MAX}
          autoComplete="street-address"
          value={draft.address_or_zip}
          onChange={(e) => update("address_or_zip", e.target.value)}
          className={inputClass}
        />
      </div>

      <fieldset className="space-y-3">
        <legend className="text-sm font-medium text-ink">Required disclosures</legend>
        <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-muted">
          <input
            type="checkbox"
            name="affiliate_disclosure_ack"
            checked={affiliateAck}
            onChange={(e) => setAffiliateAck(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-ink/20 text-brand focus:ring-brand/20"
          />
          <span>
            I understand Georgetown Home Services does not install and may earn affiliate commissions on
            some product links.
          </span>
        </label>
        <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-muted">
          <input
            type="checkbox"
            name="city_disclosure_ack"
            checked={cityAck}
            onChange={(e) => setCityAck(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-ink/20 text-brand focus:ring-brand/20"
          />
          <span>I understand Georgetown Home Services is not the City of Georgetown Water Utility.</span>
        </label>
      </fieldset>

      {error ? (
        <p className="text-sm text-rose-700" role="alert">
          {error}
        </p>
      ) : null}

      <Button type="submit" className="text-sm" disabled={submitting}>
        {submitting
          ? "Starting checkout"
          : `Pay ${formatUsd(WATER_SPEC.priceUsd)} for the written spec`}
      </Button>
    </form>
  );
}
