"use client";

import { useId, useState } from "react";
import { trackContactFormSubmit } from "../lib/analytics";

const SERVICE_OPTIONS = [
  "Roof Inspection",
  "Roof Repair",
  "Full Roof Replacement",
  "HVAC Inspection",
  "Other",
] as const;

type Props = {
  /** e.g. hub:services-roofing, blog:hail-damage-… */
  source: string;
};

export default function StormInspectionLeadForm({ source }: Props) {
  const baseId = useId();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [serviceNeeded, setServiceNeeded] = useState<string>("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const canSubmit =
    status !== "submitting" &&
    fullName.trim().length >= 2 &&
    phone.replace(/\D/g, "").length >= 10 &&
    company.trim() === "" &&
    SERVICE_OPTIONS.includes(serviceNeeded as (typeof SERVICE_OPTIONS)[number]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit) return;

    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          phone: phone.trim(),
          neighborhood: neighborhood.trim(),
          serviceNeeded,
          source,
          company: company.trim(),
        }),
      });

      if (!res.ok) {
        throw new Error("request_failed");
      }

      const data = (await res.json()) as { ok?: boolean; ignored?: boolean };
      if (!data.ok) {
        throw new Error("request_failed");
      }

      trackContactFormSubmit(source);
      setStatus("success");
      setFullName("");
      setPhone("");
      setNeighborhood("");
      setServiceNeeded("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        className="not-prose rounded-2xl border-2 border-amber-400 bg-amber-50 p-6 shadow-sm"
        role="status"
      >
        <p className="text-sm font-semibold text-amber-950">
          Thanks! A local contractor will follow up within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <div className="not-prose relative rounded-2xl border-2 border-amber-400 bg-amber-50/90 p-6 shadow-md">
      <h2 className="text-lg font-semibold tracking-tight text-gray-900 md:text-xl">
        Request a storm damage inspection
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-gray-800">
        Georgetown and Williamson County homeowners: note the storm date, photograph damage from the ground, and file
        timely notice with your carrier if you plan to claim. We pass your request to local contractors for follow-up.
      </p>

      <form onSubmit={onSubmit} className="mt-5 space-y-4">
        <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
          <label htmlFor={`${baseId}-co`}>Company</label>
          <input
            id={`${baseId}-co`}
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor={`${baseId}-name`} className="block text-sm font-medium text-gray-800">
            Full Name <span className="text-rose-600">*</span>
          </label>
          <input
            id={`${baseId}-name`}
            type="text"
            name="fullName"
            autoComplete="name"
            required
            minLength={2}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="mt-1 w-full rounded-lg border border-amber-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary-light"
          />
        </div>

        <div>
          <label htmlFor={`${baseId}-phone`} className="block text-sm font-medium text-gray-800">
            Phone Number <span className="text-rose-600">*</span>
          </label>
          <input
            id={`${baseId}-phone`}
            type="tel"
            name="phone"
            autoComplete="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="512-555-0100"
            className="mt-1 w-full rounded-lg border border-amber-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary-light"
          />
        </div>

        <div>
          <label htmlFor={`${baseId}-area`} className="block text-sm font-medium text-gray-800">
            Neighborhood / Area
          </label>
          <input
            id={`${baseId}-area`}
            type="text"
            name="neighborhood"
            autoComplete="address-level2"
            value={neighborhood}
            onChange={(e) => setNeighborhood(e.target.value)}
            placeholder="e.g. Sun City, Teravista"
            className="mt-1 w-full rounded-lg border border-amber-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary-light"
          />
        </div>

        <div>
          <label htmlFor={`${baseId}-svc`} className="block text-sm font-medium text-gray-800">
            Service Needed <span className="text-rose-600">*</span>
          </label>
          <select
            id={`${baseId}-svc`}
            name="serviceNeeded"
            required
            value={serviceNeeded}
            onChange={(e) => setServiceNeeded(e.target.value)}
            className="mt-1 w-full rounded-lg border border-amber-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary-light"
          >
            <option value="" disabled>
              Select a service
            </option>
            {SERVICE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {status === "error" ? (
          <p className="text-sm text-rose-700">Something went wrong. Please call us directly.</p>
        ) : null}

        <button
          type="submit"
          disabled={!canSubmit}
          className="inline-flex min-h-11 items-center justify-center rounded-lg bg-primary px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Request Free Inspection"}
        </button>
      </form>
    </div>
  );
}
