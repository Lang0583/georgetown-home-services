"use client";

import { useState } from "react";
import ChecklistLeadMagnetIcon from "./ChecklistLeadMagnetIcon";
import {
  EMAIL_CAPTURE_CTA_CHECKLIST,
  EMAIL_CAPTURE_EMAIL_PLACEHOLDER,
  EMAIL_CAPTURE_HEADLINE,
  EMAIL_CAPTURE_SUBTEXT,
  EMAIL_CAPTURE_TRUST_LINE,
} from "../lib/site-cta";
import { trackNewsletterSubmit } from "../lib/analytics";
import { LEAD_MAGNETS, type LeadMagnetKey } from "../lib/lead-magnets";

type Props = {
  source?: string;
  /** Blog inline offer is typically one magnet. */
  offer?: LeadMagnetKey;
  headline?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export default function EmailCaptureInlineBlog({
  source = "blog",
  offer = "seasonal_checklist",
  headline = EMAIL_CAPTURE_HEADLINE,
}: Props) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const canSubmit = status !== "submitting" && isValidEmail(email);
  const magnet = LEAD_MAGNETS[offer];

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit) return;

    setStatus("submitting");
    setError(null);

    try {
      // TODO: Connect to Beehiiv API — endpoint: https://api.beehiiv.com/v2/publications/{pub_id}/subscriptions
      // Replace current form action/handler with Beehiiv API call once publication ID is available
      // Beehiiv docs: https://developers.beehiiv.com/
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

      const data = (await res.json().catch(() => null)) as { error?: string; downloadUrl?: string } | null;

      if (!res.ok) {
        throw new Error(data?.error ?? "Something went wrong");
      }

      trackNewsletterSubmit(source, { leadMagnet: offer });
      setStatus("success");
      setEmail("");
      setFirstName("");

      if (data?.downloadUrl) {
        window.location.assign(data.downloadUrl);
      }
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <aside className="my-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
        <ChecklistLeadMagnetIcon className="h-11 w-11 shrink-0 text-primary" />
        <div className="min-w-0 flex-1">
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-600">Free guide</div>
          <h3 className="text-xl font-bold text-gray-900">{headline}</h3>
          <p className="mt-2 text-slate-700">
            {offer === "seasonal_checklist"
              ? EMAIL_CAPTURE_SUBTEXT
              : `${magnet.title}. Low-frequency emails for Georgetown, TX. No service intake.`}
          </p>
        </div>
      </div>

      <form onSubmit={onSubmit} className="mt-5 grid gap-3 sm:grid-cols-2">
        <input
          className="rounded-lg border border-gray-200 p-3 text-gray-900 outline-none ring-0 placeholder:text-gray-400 focus:border-primary/40 focus:ring-2 focus:ring-primary-light"
          type="text"
          name="firstName"
          placeholder="First name (optional)"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          autoComplete="given-name"
        />
        <input
          className="rounded-lg border border-gray-200 p-3 text-gray-900 outline-none ring-0 placeholder:text-gray-400 focus:border-primary/40 focus:ring-2 focus:ring-primary-light"
          type="email"
          name="email"
          placeholder={EMAIL_CAPTURE_EMAIL_PLACEHOLDER}
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          inputMode="email"
        />

        {status === "success" ? (
          <div className="rounded-lg border border-emerald-500/30 bg-emerald-50 p-3 text-sm text-emerald-900 sm:col-span-2">
            You’re in — check your inbox for the guide.
          </div>
        ) : null}
        {status === "error" && error ? (
          <div className="rounded-lg border border-rose-500/30 bg-rose-50 p-3 text-sm text-rose-900 sm:col-span-2">{error}</div>
        ) : null}

        <button
          type="submit"
          disabled={!canSubmit}
          className="rounded-lg bg-primary px-5 py-3 font-semibold text-white hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2"
        >
          {status === "submitting" ? "Sending…" : EMAIL_CAPTURE_CTA_CHECKLIST}
        </button>
      </form>

      <p className="mt-3 text-xs text-slate-600">{EMAIL_CAPTURE_TRUST_LINE}</p>
    </aside>
  );
}

