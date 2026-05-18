"use client";

import { useId, useState } from "react";

export default function ContactGeneralForm() {
  const baseId = useId();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const canSubmit =
    status !== "submitting" && name.trim().length >= 2 && email.includes("@") && message.trim().length >= 12;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit) return;

    setStatus("submitting");
    setError(null);

    try {
      const res = await fetch("/api/contact-general", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          company: company.trim(),
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
        <div className="text-sm font-semibold text-emerald-900">Message sent</div>
        <p className="mt-2 text-sm leading-relaxed text-emerald-900">
          Thank you. We&apos;ll get back to you by email when we can. This inbox is for site questions only—not
          for scheduling repairs.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900">Send us a message</h2>
      <p className="mt-2 text-sm leading-relaxed text-gray-700">
        Questions about the directory, privacy, or corrections? Use this form. For urgent home emergencies, call a
        licensed professional or 911.
      </p>

      <form onSubmit={onSubmit} className="mt-5 space-y-4">
        <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
          <label htmlFor={`${baseId}-hp`}>Company</label>
          <input
            id={`${baseId}-hp`}
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor={`${baseId}-name`} className="block text-sm font-medium text-gray-800">
            Name <span className="text-rose-600">*</span>
          </label>
          <input
            id={`${baseId}-name`}
            name="name"
            type="text"
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary-light"
          />
        </div>

        <div>
          <label htmlFor={`${baseId}-email`} className="block text-sm font-medium text-gray-800">
            Email <span className="text-rose-600">*</span>
          </label>
          <input
            id={`${baseId}-email`}
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            inputMode="email"
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
            rows={6}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="How can we help?"
            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary-light"
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
          {status === "submitting" ? "Sending…" : "Send message"}
        </button>
      </form>
    </div>
  );
}
