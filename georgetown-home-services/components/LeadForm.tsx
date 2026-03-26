"use client";

import { useMemo, useState } from "react";

type LeadFormProps = {
  defaultService?: string;
  defaultLocation?: string;
  formId?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export default function LeadForm({ defaultService, defaultLocation, formId }: LeadFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [serviceType, setServiceType] = useState(defaultService ?? "");
  const [location, setLocation] = useState(defaultLocation ?? "");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const canSubmit = useMemo(() => {
    if (status === "submitting") return false;
    if (!name.trim()) return false;
    if (!isValidEmail(email)) return false;
    if (!serviceType.trim()) return false;
    if (!location.trim()) return false;
    return true;
  }, [email, location, name, serviceType, status]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit) return;

    setStatus("submitting");
    setError(null);

    try {
      setStatus("success");
      e.currentTarget.reset();
      setName("");
      setEmail("");
      setPhone("");
      setServiceType(defaultService ?? "");
      setLocation(defaultLocation ?? "");
      setMessage("");
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
      className="rounded-2xl border border-black/10 bg-white p-6 md:p-8"
    >
      <h2 className="text-xl font-semibold text-zinc-900">Request Service</h2>
      <p className="mt-2 text-sm text-zinc-600">Submit the form to request service options and free quotes.</p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-zinc-800">Name</span>
          <input
            required
            name="name"
            className="h-10 rounded-xl border border-black/10 bg-white px-3 text-sm text-zinc-900 outline-none ring-0 placeholder:text-zinc-400 focus:border-zinc-300 focus:ring-2 focus:ring-zinc-200"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            autoComplete="name"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-zinc-800">Email</span>
          <input
            required
            name="email"
            className="h-10 rounded-xl border border-black/10 bg-white px-3 text-sm text-zinc-900 outline-none ring-0 placeholder:text-zinc-400 focus:border-zinc-300 focus:ring-2 focus:ring-zinc-200"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            inputMode="email"
          />
        </label>

        <label className="flex flex-col gap-1 sm:col-span-2">
          <span className="text-sm font-medium text-zinc-800">Phone (optional)</span>
          <input
            name="phone"
            className="h-10 rounded-xl border border-black/10 bg-white px-3 text-sm text-zinc-900 outline-none ring-0 placeholder:text-zinc-400 focus:border-zinc-300 focus:ring-2 focus:ring-zinc-200"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Your phone number"
            autoComplete="tel"
            inputMode="tel"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-zinc-800">Service</span>
          <input
            required
            name="serviceType"
            className="h-10 rounded-xl border border-black/10 bg-white px-3 text-sm text-zinc-900 outline-none ring-0 placeholder:text-zinc-400 focus:border-zinc-300 focus:ring-2 focus:ring-zinc-200"
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            placeholder="Plumbing, HVAC, or Roofing"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-zinc-800">Location</span>
          <input
            required
            name="location"
            className="h-10 rounded-xl border border-black/10 bg-white px-3 text-sm text-zinc-900 outline-none ring-0 placeholder:text-zinc-400 focus:border-zinc-300 focus:ring-2 focus:ring-zinc-200"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Georgetown, TX"
          />
        </label>

        <label className="flex flex-col gap-1 sm:col-span-2">
          <span className="text-sm font-medium text-zinc-800">What’s going on? (optional)</span>
          <textarea
            name="message"
            className="min-h-24 rounded-xl border border-black/10 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-0 placeholder:text-zinc-400 focus:border-zinc-300 focus:ring-2 focus:ring-zinc-200"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Short description, when it started, any relevant details."
          />
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

      <button
        type="submit"
        disabled={!canSubmit}
        className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-full bg-zinc-900 px-5 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-400"
      >
        {status === "submitting" ? "Sending..." : "Get Free Quotes"}
      </button>

      <p className="mt-4 text-xs text-zinc-500">
        By submitting, you agree to be contacted about your request. We never sell your information.
      </p>
    </form>
  );
}

