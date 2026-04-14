"use client";

import { useId, useState } from "react";

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
      const res = await fetch("/api/newsletter-embed", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          website: website.trim(),
          source,
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
              placeholder="Your email"
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
            {status === "submitting" ? "…" : "Get Georgetown homeowner tips."}
          </button>
        </form>
      )}
      {status === "error" && error ? <p className="mt-2 text-sm font-medium text-rose-100">{error}</p> : null}
    </aside>
  );
}
