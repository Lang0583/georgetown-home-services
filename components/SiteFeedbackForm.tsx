"use client";

import { useId, useState } from "react";
import { SITE_FEEDBACK_TOPICS } from "../lib/site-feedback-topics";

export default function SiteFeedbackForm() {
  const baseId = useId();
  const [topic, setTopic] = useState<string>(SITE_FEEDBACK_TOPICS[0].value);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const canSubmit = status !== "submitting" && email.trim().length > 3 && message.trim().length >= 12;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit) return;

    setStatus("submitting");
    setError(null);

    try {
      const res = await fetch("/api/site-feedback", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          topic,
          email: email.trim(),
          message: message.trim(),
          website: website.trim(),
        }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? "Something went wrong");
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
        <div className="text-sm font-semibold text-emerald-900">Thanks for the feedback</div>
        <p className="mt-2 text-sm leading-relaxed text-emerald-900">
          We read every message. If we need more detail, we&apos;ll reply by email.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="text-xs font-semibold uppercase tracking-wide text-gray-600">Feedback</div>
      <h2 className="mt-2 text-lg font-semibold text-gray-900">Help us improve</h2>
      <p className="mt-2 text-sm leading-relaxed text-gray-700">
        Tell us what&apos;s on your mind—corrections, ideas, or listing questions. We use this to prioritize updates
        (not for booking contractors; use service guides or Best Of for that).
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
          <label htmlFor={`${baseId}-topic`} className="block text-sm font-medium text-gray-800">
            Topic <span className="text-rose-600">*</span>
          </label>
          <select
            id={`${baseId}-topic`}
            name="topic"
            required
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary-light"
          >
            {SITE_FEEDBACK_TOPICS.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
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
          <p className="mt-1 text-xs text-gray-500">We only use this if we need to follow up.</p>
        </div>

        <div>
          <label htmlFor={`${baseId}-message`} className="block text-sm font-medium text-gray-800">
            Details <span className="text-rose-600">*</span>
          </label>
          <textarea
            id={`${baseId}-message`}
            name="message"
            required
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="What page, provider, or idea should we look at?"
            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none placeholder:text-[#6b7280] focus:border-primary focus:ring-2 focus:ring-primary-light"
          />
        </div>

        {error ? (
          <p className="text-sm text-rose-700" role="alert">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={!canSubmit}
          className="inline-flex w-full items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {status === "submitting" ? "Sending…" : "Send feedback"}
        </button>
      </form>
    </div>
  );
}
