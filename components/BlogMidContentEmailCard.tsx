"use client";

import { useId, useState } from "react";
import ChecklistLeadMagnetIcon from "./ChecklistLeadMagnetIcon";
import {
  EMAIL_CAPTURE_CTA_CHECKLIST,
  EMAIL_CAPTURE_EMAIL_PLACEHOLDER,
  EMAIL_CAPTURE_HEADLINE,
  EMAIL_CAPTURE_SUBTEXT,
  EMAIL_CAPTURE_TRUST_LINE,
} from "../lib/site-cta";
import { trackEmailSignup } from "../lib/analytics";

type Props = {
  /** e.g. `blog-mid:slug` or `blog-index-mid` */
  source: string;
  className?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export default function BlogMidContentEmailCard({ source, className }: Props) {
  const id = useId();
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const canSubmit = status !== "submitting" && isValidEmail(email);

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
          website: website.trim(),
          source,
          leadMagnet: "seasonal_checklist",
        }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? "Something went wrong");
      }

      trackEmailSignup();
      setStatus("success");
      setEmail("");
      setWebsite("");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <aside
      className={[
        "not-prose mx-auto max-w-3xl rounded-xl border border-white/20 bg-[#01696F] p-5 shadow-sm sm:p-6",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-label="Email tips signup"
    >
      {status === "success" ? (
        <p className="text-center text-sm font-medium text-white">You’re in — thanks for subscribing.</p>
      ) : (
        <>
          <div className="mb-4 flex gap-3 sm:mb-5">
            <ChecklistLeadMagnetIcon className="mt-0.5 h-9 w-9 shrink-0 text-white" />
            <div className="min-w-0">
              <h2 className="text-lg font-bold leading-snug text-white sm:text-xl">{EMAIL_CAPTURE_HEADLINE}</h2>
              <p className="mt-2 text-sm leading-relaxed text-white/90">{EMAIL_CAPTURE_SUBTEXT}</p>
            </div>
          </div>
          <form onSubmit={onSubmit} className="flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-4">
            <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
              <label htmlFor={`${id}-hp`}>Website</label>
              <input
                type="text"
                id={`${id}-hp`}
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>
            <div className="min-w-0 flex-1">
              <label htmlFor={`${id}-email`} className="sr-only">
                Email address
              </label>
              <input
                id={`${id}-email`}
                type="email"
                name="email"
                required
                placeholder={EMAIL_CAPTURE_EMAIL_PLACEHOLDER}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                inputMode="email"
                className="w-full rounded-lg border border-primary/25 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary-light"
              />
            </div>
            <button
              type="submit"
              disabled={!canSubmit}
              className="shrink-0 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-[#01696F] shadow-sm transition-colors hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "submitting" ? "…" : EMAIL_CAPTURE_CTA_CHECKLIST}
            </button>
          </form>
          <p className="mt-3 text-center text-xs text-white/85 sm:text-left">{EMAIL_CAPTURE_TRUST_LINE}</p>
        </>
      )}
      {status === "error" && error ? <p className="mt-2 text-sm font-medium text-rose-100">{error}</p> : null}
    </aside>
  );
}
