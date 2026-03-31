"use client";

import { useMemo, useState } from "react";
import { Button } from "./Button";

type LeadFormProps = {
  defaultService?: string;
  defaultLocation?: string;
  formId?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export default function LeadForm({ defaultService, defaultLocation, formId }: LeadFormProps) {
  const [email, setEmail] = useState("");
  const [serviceType, setServiceType] = useState(defaultService ?? "Plumbing");
  const [honeypot, setHoneypot] = useState("");

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
        location: (defaultLocation ?? "Georgetown, TX").trim(),
        honeypot,
      };

      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? "Request failed");
      }

      setStatus("success");
      e.currentTarget.reset();
      setEmail("");
      setServiceType(normalizedDefaultService ?? "Plumbing");
      setHoneypot("");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Request failed");
    }
  }

  return (
    <form
      id={formId}
      onSubmit={onSubmit}
      className="w-full min-w-0 max-w-full rounded-xl border border-gray-200 bg-white p-6 shadow-md md:p-8"
    >
      <h2 className="text-xl font-semibold text-gray-900">Get Top Local Providers Instantly</h2>
      <p className="mt-2 text-sm text-gray-600">Enter your email and choose a service to get matched quickly.</p>

      <div className="mt-6 grid grid-cols-1 gap-4">
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-gray-800">Email</span>
          <input
            required
            name="email"
            className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none ring-0 placeholder:text-gray-400 focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            inputMode="email"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-gray-800">Service</span>
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

        {/* Honeypot field - bots will fill it, real users won't. */}
        <label className="hidden">
          <span>Leave this field blank</span>
          <input name="honeypot" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
        </label>
      </div>

      {status === "success" ? (
        <div className="mt-6 rounded-xl border border-emerald-500/30 bg-emerald-50 p-4 text-sm text-emerald-900">
          Thank you. Your request has been received.
        </div>
      ) : null}
      {status === "error" && error ? (
        <div className="mt-6 rounded-xl border border-rose-500/30 bg-rose-50 p-4 text-sm text-rose-900">
          {error}
        </div>
      ) : null}

      <Button
        type="submit"
        disabled={!canSubmit}
        className="mt-6 w-full disabled:cursor-not-allowed disabled:bg-gray-400"
      >
        {status === "submitting" ? "Sending..." : "Get Top Local Providers Instantly"}
      </Button>

      <p className="mt-4 text-xs text-gray-500">
        By submitting, you agree to be contacted about your request. We never sell your information.
      </p>
    </form>
  );
}

