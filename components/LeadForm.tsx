"use client";

import { useMemo, useState } from "react";
import { Button } from "./Button";
import { PROVIDER_INFO_DISCLAIMER } from "../lib/provider-disclaimer";
import { CTA_EMAIL_PROVIDERS } from "../lib/site-cta";

type LeadFormProps = {
  defaultService?: string;
  formId?: string;
  title?: string;
  description?: string;
  compact?: boolean;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export default function LeadForm({
  defaultService,
  formId = "lead",
  title = "Email capture",
  description = "Optional: we may email you curated Georgetown providers to contact on your own.",
  compact = false,
}: LeadFormProps) {
  const [email, setEmail] = useState("");
  const [serviceType, setServiceType] = useState(defaultService ?? "Plumbing");

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const serviceOptions = useMemo(() => {
    return ["Plumbing", "HVAC", "Roofing", "Other"] as const;
  }, []);

  const normalizedDefaultService = useMemo(() => {
    const raw = (defaultService ?? "").toLowerCase();
    if (raw.includes("roof")) return "Roofing";
    if (raw.includes("hvac") || raw.includes("ac") || raw.includes("heating")) return "HVAC";
    if (raw.includes("plumb") || raw.includes("drain") || raw.includes("sewer")) return "Plumbing";
    return null;
  }, [defaultService]);

  const canSubmit = useMemo(() => {
    if (status === "submitting") return false;
    if (!isValidEmail(email)) return false;
    if (!serviceType.trim()) return false;
    return true;
  }, [email, serviceType, status]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit) return;

    setStatus("submitting");
    setError(null);

    try {
      const payload = {
        email: email.trim(),
        serviceType: serviceType.trim(),
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
      e.currentTarget.reset();
      setEmail("");
      setServiceType(normalizedDefaultService ?? "Plumbing");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <form
      id={formId}
      onSubmit={onSubmit}
      className={`w-full min-w-0 max-w-full rounded-xl border border-gray-200 bg-white shadow-md ${
        compact ? "p-5 md:p-6" : "p-6 md:p-8"
      }`}
    >
      <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      <p className="mt-2 text-sm text-gray-600">{description}</p>
      <p className="mt-3 border-t border-gray-100 pt-3 text-xs leading-relaxed text-gray-600">{PROVIDER_INFO_DISCLAIMER}</p>

      <div className={`grid grid-cols-1 gap-4 ${compact ? "mt-4" : "mt-6"}`}>
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-gray-800">Email</span>
          <input
            required
            name="email"
            type="email"
            className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none ring-0 placeholder:text-gray-400 focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            inputMode="email"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-gray-800">Service type</span>
          <select
            required
            name="serviceType"
            className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none ring-0 focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
          >
            {serviceOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </label>
      </div>

      {status === "success" ? (
        <div
          className={`rounded-xl border border-emerald-500/30 bg-emerald-50 p-4 text-sm text-emerald-900 ${compact ? "mt-4" : "mt-6"}`}
        >
          Thanks — check your inbox for provider information when it arrives.
        </div>
      ) : null}
      {status === "error" && error ? (
        <div
          className={`rounded-xl border border-rose-500/30 bg-rose-50 p-4 text-sm text-rose-900 ${compact ? "mt-4" : "mt-6"}`}
        >
          {error}
        </div>
      ) : null}

      <Button
        type="submit"
        disabled={!canSubmit}
        className={`w-full disabled:cursor-not-allowed disabled:bg-gray-400 ${compact ? "mt-4" : "mt-6"}`}
      >
        {status === "submitting" ? "Sending..." : CTA_EMAIL_PROVIDERS}
      </Button>

      <p className="mt-4 text-xs text-gray-500">
        By submitting, you agree to receive informational emails about local providers. We never sell your information.
      </p>
    </form>
  );
}
