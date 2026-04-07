"use client";

import { useMemo, useState } from "react";
import { CTA_EMAIL_PROVIDERS } from "../lib/site-cta";
import { LEAD_MAGNETS, type LeadMagnetKey } from "../lib/lead-magnets";

type Props = {
  /** Anchor id for CTAs (default `email-capture`). */
  formId?: string;
  compact?: boolean;
  source?: string;
  /** Offer one or two lead magnets (default: two). */
  offers?: LeadMagnetKey[];
  /** Default selected offer (must be in offers). */
  defaultOffer?: LeadMagnetKey;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export default function EmailCaptureSitewide({
  formId = "email-capture",
  compact = false,
  source = "site",
  offers = ["seasonal_checklist", "monthly_reminder"],
  defaultOffer,
}: Props) {
  const allowedOffers = useMemo(() => {
    const uniq = Array.from(new Set(offers)).filter((k) => Boolean(LEAD_MAGNETS[k]));
    return uniq.length ? uniq : (["seasonal_checklist", "monthly_reminder"] as LeadMagnetKey[]);
  }, [offers]);

  const initialOffer = useMemo<LeadMagnetKey>(() => {
    if (defaultOffer && allowedOffers.includes(defaultOffer)) return defaultOffer;
    return allowedOffers[0]!;
  }, [allowedOffers, defaultOffer]);

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [offer, setOffer] = useState<LeadMagnetKey>(initialOffer);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const canSubmit = status !== "submitting" && isValidEmail(email);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit) return;

    setStatus("submitting");
    setError(null);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          firstName: firstName.trim() || undefined,
          leadMagnet: offer,
          source,
        }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? "Something went wrong");
      }

      setStatus("success");
      setEmail("");
      setFirstName("");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  const boxClass = compact
    ? "mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
    : "mt-12 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm";

  return (
    <section id={formId} className={boxClass}>
      <h2 className="text-2xl font-bold text-gray-900">{CTA_EMAIL_PROVIDERS}</h2>
      <p className="mt-2 text-slate-700">
        Low-frequency newsletter for Georgetown homeowners. No phone, no addresses, no service intake—just practical guides.
      </p>

      <form onSubmit={onSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
        <input
          className="rounded-lg border border-gray-200 p-3 text-gray-900 outline-none ring-0 placeholder:text-gray-400 focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
          type="text"
          name="firstName"
          placeholder="First name (optional)"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          autoComplete="given-name"
        />
        <input
          className="rounded-lg border border-gray-200 p-3 text-gray-900 outline-none ring-0 placeholder:text-gray-400 focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
          type="email"
          name="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          inputMode="email"
        />

        <div className="md:col-span-2">
          <div className="text-sm font-semibold text-gray-900">Choose your free guide</div>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {allowedOffers.map((k) => {
              const m = LEAD_MAGNETS[k];
              const checked = offer === k;
              return (
                <label
                  key={k}
                  className={[
                    "flex cursor-pointer gap-3 rounded-xl border p-4 shadow-sm transition",
                    checked ? "border-blue-300 bg-blue-50/40" : "border-gray-200 bg-white hover:bg-gray-50",
                  ].join(" ")}
                >
                  <input
                    type="radio"
                    name="leadMagnet"
                    value={k}
                    checked={checked}
                    onChange={() => setOffer(k)}
                    className="mt-1"
                  />
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-gray-900">{m.title}</div>
                    <div className="mt-1 text-sm text-gray-700">{m.description}</div>
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        {status === "success" ? (
          <div className="rounded-lg border border-emerald-500/30 bg-emerald-50 p-4 text-sm text-emerald-900 md:col-span-2">
            Thanks{firstName.trim() ? `, ${firstName.trim()}` : ""} — check your inbox for the guide.
          </div>
        ) : null}
        {status === "error" && error ? (
          <div className="rounded-lg border border-rose-500/30 bg-rose-50 p-4 text-sm text-rose-900 md:col-span-2">{error}</div>
        ) : null}

        <button
          type="submit"
          disabled={!canSubmit}
          className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 md:col-span-2"
        >
          {status === "submitting" ? "Signing up..." : "Send me the guide"}
        </button>
      </form>

      <p className="mt-4 text-xs leading-relaxed text-slate-600">We’ll send occasional emails. Unsubscribe anytime.</p>
    </section>
  );
}

