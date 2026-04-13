"use client";

import { useState } from "react";
import Link from "next/link";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export default function StickyHomeEmailCapture() {
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
      const res = await fetch("/api/newsletter-embed", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          website: website.trim(),
          source: "home-sticky",
        }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? "Something went wrong");
      }

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
      className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white/95 shadow-[0_-4px_24px_rgba(0,0,0,0.08)] backdrop-blur-sm"
      aria-label="Seasonal tips email signup"
    >
      <div className="mx-auto max-w-5xl px-4 py-4 md:py-5">
        {status === "success" ? (
          <p className="text-center text-sm font-medium text-emerald-800">Thanks — you’re subscribed. Check your inbox to confirm.</p>
        ) : (
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-8">
            <div className="min-w-0 md:max-w-md">
              <h2 className="text-base font-semibold tracking-tight text-gray-900 md:text-lg">
                Get seasonal home tips for Georgetown homeowners.
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-gray-600">
                We send maintenance reminders and local service tips — no spam.
              </p>
            </div>

            <form onSubmit={onSubmit} className="flex w-full flex-col gap-3 sm:flex-row sm:items-end md:w-auto md:min-w-[min(100%,28rem)]">
              {/* Honeypot — leave off-screen; bots often fill this */}
              <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
                <label htmlFor="sticky-newsletter-company">Company</label>
                <input
                  type="text"
                  id="sticky-newsletter-company"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>

              <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-center">
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  inputMode="email"
                  className="min-h-11 w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary-light"
                />
                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="min-h-11 shrink-0 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "submitting" ? "…" : "Subscribe"}
                </button>
              </div>
            </form>
          </div>
        )}

        {status === "error" && error ? (
          <p className="mt-2 text-center text-sm text-rose-700 md:text-right">{error}</p>
        ) : null}

        {status !== "success" ? (
          <p className="mt-3 text-center text-xs text-gray-500 md:text-right">
            <Link href="/privacy-policy" className="underline underline-offset-2 hover:text-gray-700">
              Privacy policy
            </Link>
          </p>
        ) : null}
      </div>
    </aside>
  );
}
