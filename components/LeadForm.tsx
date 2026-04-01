"use client";

import { useMemo, useState } from "react";
import { PROVIDER_INFO_DISCLAIMER } from "../lib/provider-disclaimer";
import { CTA_EMAIL_PROVIDERS } from "../lib/site-cta";

type ServiceValue = "plumbing" | "hvac" | "roofing";

type LeadFormProps = {
  defaultService?: string;
  /** Anchor id for CTAs (default `email-capture`). */
  formId?: string;
  compact?: boolean;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function toServiceValue(defaultService: string | undefined): ServiceValue | "" {
  const raw = (defaultService ?? "").toLowerCase();
  if (raw.includes("roof")) return "roofing";
  if (raw.includes("hvac") || raw.includes("ac") || raw.includes("heating")) return "hvac";
  if (raw.includes("plumb") || raw.includes("drain") || raw.includes("sewer")) return "plumbing";
  return "";
}

function toApiServiceType(v: ServiceValue): string {
  if (v === "plumbing") return "Plumbing";
  if (v === "hvac") return "HVAC";
  return "Roofing";
}

export default function LeadForm({ defaultService, formId = "email-capture", compact = false }: LeadFormProps) {
  const initial = useMemo(() => toServiceValue(defaultService), [defaultService]);
  const [email, setEmail] = useState("");
  const [service, setService] = useState<ServiceValue | "">(initial || "");

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const canSubmit = useMemo(() => {
    if (status === "submitting") return false;
    if (!isValidEmail(email)) return false;
    if (!service) return false;
    return true;
  }, [email, service, status]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit || !service) return;

    setStatus("submitting");
    setError(null);

    try {
      const payload = {
        email: email.trim(),
        serviceType: toApiServiceType(service),
      };

      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? "Something went wrong");
      }

      setStatus("success");
      setEmail("");
      setService(initial || "");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <section
      id={formId}
      className={
        compact
          ? "mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
          : "mt-12 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
      }
    >
      <h2 className="text-2xl font-bold text-gray-900">{CTA_EMAIL_PROVIDERS}</h2>
      <p className="mt-2 text-slate-700">Get a short list of top local providers sent to your inbox.</p>

      <form onSubmit={onSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
        <input
          className="rounded-lg border border-gray-200 p-3 text-gray-900 outline-none ring-0 placeholder:text-gray-400 focus:border-blue-300 focus:ring-2 focus:ring-blue-100 md:col-span-2"
          type="email"
          name="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          inputMode="email"
        />
        <select
          className="rounded-lg border border-gray-200 bg-white p-3 text-gray-900 outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100 md:col-span-2"
          name="service"
          required
          value={service}
          onChange={(e) => setService(e.target.value as ServiceValue | "")}
        >
          <option value="" disabled>
            Select a service
          </option>
          <option value="plumbing">Plumbing</option>
          <option value="hvac">HVAC</option>
          <option value="roofing">Roofing</option>
        </select>

        {status === "success" ? (
          <div className="rounded-lg border border-emerald-500/30 bg-emerald-50 p-4 text-sm text-emerald-900 md:col-span-2">
            Thanks — check your inbox for provider information when it arrives.
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
          {status === "submitting" ? "Sending..." : CTA_EMAIL_PROVIDERS}
        </button>
      </form>

      <p className="mt-4 text-sm text-slate-600">{PROVIDER_INFO_DISCLAIMER}</p>
    </section>
  );
}
