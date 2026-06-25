"use client";

import { useId, useState } from "react";
import { trackNewsletterSubmit } from "../lib/analytics";

type Props = {
  serviceSlug: string;
};

export default function ServiceRequestForm({ serviceSlug }: Props) {
  const baseId = useId();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [seasonalTipsOptIn, setSeasonalTipsOptIn] = useState(true);
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const canSubmit = status !== "submitting" && email.trim().length > 3 && message.trim().length > 3;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit) return;

    setStatus("submitting");
    setError(null);

    try {
      const res = await fetch("/api/service-request", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          message: message.trim(),
          seasonalTipsOptIn,
          website: website.trim(),
          serviceSlug,
        }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? "Something went wrong");
      }

      if (seasonalTipsOptIn) {
        trackNewsletterSubmit(`service-request:${serviceSlug}`, { leadMagnet: "seasonal_opt_in" });
      }
      setStatus("success");
      setMessage("");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/80 p-6 shadow-sm">
        <div className="text-sm font-semibold text-emerald-900">Request received</div>
        <p className="mt-2 text-sm leading-relaxed text-emerald-900">
          Thanks — your request was sent.
          {seasonalTipsOptIn
            ? " If you opted in, you’ll get seasonal Georgetown homeowner tips by email (unsubscribe anytime)."
            : null}
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="text-xs font-semibold uppercase tracking-wide text-gray-600">Request service</div>
      <h2 className="mt-2 text-lg font-semibold text-gray-900">Get Connected with Georgetown Contractors</h2>
      <p className="mt-2 text-sm leading-relaxed text-gray-700">
        Share a short note and your contact details so local Georgetown providers can reach out directly with
        availability and pricing for your project.
      </p>

      <form onSubmit={onSubmit} className="mt-5 space-y-4">
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
          <label htmlFor={`${baseId}-name`} className="block text-sm font-medium text-gray-800">
            Name
          </label>
          <input
            id={`${baseId}-name`}
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary-light"
          />
        </div>

        <div>
          <label htmlFor={`${baseId}-email`} className="block text-sm font-medium text-gray-800">
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
            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary-light"
          />
        </div>

        <div>
          <label htmlFor={`${baseId}-phone`} className="block text-sm font-medium text-gray-800">
            Phone <span className="text-gray-500">(optional)</span>
          </label>
          <input
            id={`${baseId}-phone`}
            type="tel"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            autoComplete="tel"
            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary-light"
          />
        </div>

        <div>
          <label htmlFor={`${baseId}-message`} className="block text-sm font-medium text-gray-800">
            Message <span className="text-rose-600">*</span>
          </label>
          <textarea
            id={`${baseId}-message`}
            name="message"
            required
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="What’s going on at your home? (issue, timeline, location in Georgetown area)"
            className="mt-1 w-full resize-y rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none placeholder:text-[#6b7280] focus:border-primary focus:ring-2 focus:ring-primary-light"
          />
        </div>

        <div className="rounded-lg border border-gray-100 bg-gray-50/80 p-3">
          <label className="flex cursor-pointer gap-3 text-sm leading-snug text-gray-800">
            <input
              type="checkbox"
              name="seasonalTipsOptIn"
              checked={seasonalTipsOptIn}
              onChange={(e) => setSeasonalTipsOptIn(e.target.checked)}
              className="mt-0.5 h-4 w-4 shrink-0 rounded border-gray-300 text-primary focus:ring-primary/50"
            />
            <span>
              ✓ Send me seasonal maintenance tips for Georgetown homeowners (monthly email, unsubscribe anytime).
            </span>
          </label>
        </div>

        {status === "error" && error ? (
          <div className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-900">{error}</div>
        ) : null}

        <button
          type="submit"
          disabled={!canSubmit}
          className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Find Local Providers"}
        </button>

        <p className="text-xs leading-relaxed text-[#4b5563]">
          Submitting connects you with local providers who may follow up directly. Georgetown Home Services does not
          manage the booking process.
        </p>
      </form>
    </div>
  );
}
