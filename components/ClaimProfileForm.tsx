"use client";

import { useId, useState } from "react";
import {
  CLAIM_CATEGORY_OPTIONS,
  CLAIM_TIERS,
  type ClaimTierValue,
} from "@/lib/claim-form";
import type { ProviderCategory } from "@/data/providers";

const inputClass =
  "mt-1 w-full rounded-lg border border-ink/10 bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-brand focus:ring-2 focus:ring-brand/20";

export default function ClaimProfileForm() {
  const baseId = useId();
  const [businessName, setBusinessName] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState<ProviderCategory | "">(
    CLAIM_CATEGORY_OPTIONS[0]?.value ?? "",
  );
  const [licenseNumber, setLicenseNumber] = useState("");
  const [tier, setTier] = useState<ClaimTierValue>("claimed");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const canSubmit =
    status !== "submitting" &&
    businessName.trim().length >= 2 &&
    contactName.trim().length >= 2 &&
    email.trim().length > 3 &&
    phone.replace(/\D/g, "").length >= 10 &&
    Boolean(category) &&
    licenseNumber.trim().length >= 2 &&
    Boolean(tier);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit || !category) return;

    setStatus("submitting");
    setError(null);

    try {
      const res = await fetch("/api/claim", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          businessName: businessName.trim(),
          contactName: contactName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          category,
          licenseNumber: licenseNumber.trim(),
          tier,
          website: website.trim(),
        }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? "Something went wrong");
      }

      setStatus("success");
      setBusinessName("");
      setContactName("");
      setEmail("");
      setPhone("");
      setLicenseNumber("");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "success") {
    return (
      <div
        id="claim"
        className="scroll-mt-28 rounded-2xl border border-verified/25 bg-verified/10 p-6 shadow-sm md:p-8"
      >
        <div className="text-sm font-semibold text-verified">Request received</div>
        <p className="mt-2 text-sm leading-relaxed text-verified">
          Thanks — we&apos;ll review your claim against the public license record and reply by email.
        </p>
      </div>
    );
  }

  return (
    <div
      id="claim"
      className="scroll-mt-28 rounded-2xl border border-ink/10 bg-surface p-6 shadow-sm md:p-8"
    >
      <h2 className="text-2xl font-semibold tracking-tight text-ink">Claim or request a listing</h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
        Tell us about your business. We verify the license number against the applicable Texas board before any
        claimed or featured profile goes live.
      </p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
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

        <div>
          <label htmlFor={`${baseId}-business`} className="block text-sm font-medium text-ink">
            Business name <span className="text-rose-600">*</span>
          </label>
          <input
            id={`${baseId}-business`}
            name="businessName"
            required
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            autoComplete="organization"
            className={inputClass}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor={`${baseId}-contact`} className="block text-sm font-medium text-ink">
              Contact name <span className="text-rose-600">*</span>
            </label>
            <input
              id={`${baseId}-contact`}
              name="contactName"
              required
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              autoComplete="name"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor={`${baseId}-email`} className="block text-sm font-medium text-ink">
              Email <span className="text-rose-600">*</span>
            </label>
            <input
              id={`${baseId}-email`}
              type="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              inputMode="email"
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor={`${baseId}-phone`} className="block text-sm font-medium text-ink">
              Phone <span className="text-rose-600">*</span>
            </label>
            <input
              id={`${baseId}-phone`}
              type="tel"
              name="phone"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              autoComplete="tel"
              inputMode="tel"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor={`${baseId}-category`} className="block text-sm font-medium text-ink">
              Trade category <span className="text-rose-600">*</span>
            </label>
            <select
              id={`${baseId}-category`}
              name="category"
              required
              value={category}
              onChange={(e) => setCategory(e.target.value as ProviderCategory)}
              className={inputClass}
            >
              {CLAIM_CATEGORY_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor={`${baseId}-license`} className="block text-sm font-medium text-ink">
              License number <span className="text-rose-600">*</span>
            </label>
            <input
              id={`${baseId}-license`}
              name="licenseNumber"
              required
              value={licenseNumber}
              onChange={(e) => setLicenseNumber(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor={`${baseId}-tier`} className="block text-sm font-medium text-ink">
              Tier of interest <span className="text-rose-600">*</span>
            </label>
            <select
              id={`${baseId}-tier`}
              name="tier"
              required
              value={tier}
              onChange={(e) => setTier(e.target.value as ClaimTierValue)}
              className={inputClass}
            >
              {CLAIM_TIERS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {error ? (
          <p className="text-sm text-rose-700" role="alert">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={!canSubmit}
          className="inline-flex w-full items-center justify-center rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {status === "submitting" ? "Sending…" : "Submit claim request"}
        </button>
      </form>
    </div>
  );
}
