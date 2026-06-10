"use client";

import { useState } from "react";
import ChecklistLeadMagnetIcon from "./ChecklistLeadMagnetIcon";
import { trackNewsletterSubmit } from "@/lib/analytics";
import { PDF_LEAD_ASSETS, type PdfLeadKey } from "@/lib/pdf-lead-assets";

type Variant = "primary" | "secondary" | "link";

type Props = {
  pdfKey: PdfLeadKey;
  source: string;
  /** Button or link label before expand. */
  label?: string;
  variant?: Variant;
  className?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export default function PdfEmailDownload({
  pdfKey,
  source,
  label,
  variant = "primary",
  className = "",
}: Props) {
  const asset = PDF_LEAD_ASSETS[pdfKey];
  const defaultLabel = label ?? `Get ${asset.title} (PDF)`;

  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const canSubmit = status !== "submitting" && isValidEmail(email);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit) return;

    setStatus("submitting");
    setError(null);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          leadMagnet: asset.leadMagnet,
          pdfKey,
          source,
        }),
      });

      const data = (await res.json().catch(() => null)) as {
        error?: string;
        downloadUrl?: string;
      } | null;

      if (!res.ok) {
        throw new Error(data?.error ?? "Something went wrong");
      }

      trackNewsletterSubmit(source, { leadMagnet: asset.leadMagnet });
      setStatus("success");
      setEmail("");

      if (data?.downloadUrl) {
        window.location.assign(data.downloadUrl);
      }
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  const triggerClass =
    variant === "primary"
      ? "inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-dark"
      : variant === "secondary"
        ? "inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50"
        : "text-gray-800 hover:text-primary hover:underline";

  if (status === "success" && !open) {
    return (
      <p className={`text-sm text-emerald-800 ${className}`}>
        Thanks — your PDF is downloading. Check your inbox for a copy too.
      </p>
    );
  }

  if (!open) {
    if (variant === "link") {
      return (
        <button type="button" onClick={() => setOpen(true)} className={`${triggerClass} ${className}`}>
          PDF
        </button>
      );
    }

    return (
      <button type="button" onClick={() => setOpen(true)} className={`${triggerClass} ${className}`}>
        {variant === "primary" ? <ChecklistLeadMagnetIcon className="h-5 w-5 text-white" /> : null}
        {defaultLabel}
      </button>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className={`rounded-lg border border-gray-200 bg-gray-50 p-4 ${className}`}
      aria-label={`Email form for ${asset.title}`}
    >
      <p className="text-sm font-semibold text-gray-900">Enter your email to download the PDF</p>
      <p className="mt-1 text-xs text-gray-600">We&apos;ll send a copy to your inbox. Unsubscribe anytime.</p>
      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
        <input
          className="min-w-0 flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary-light"
          type="email"
          name="email"
          placeholder="you@example.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          inputMode="email"
        />
        <button
          type="submit"
          disabled={!canSubmit}
          className="shrink-0 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Download PDF"}
        </button>
      </div>
      {status === "error" && error ? (
        <p className="mt-2 text-xs text-rose-700">{error}</p>
      ) : null}
      <button
        type="button"
        onClick={() => {
          setOpen(false);
          setStatus("idle");
          setError(null);
        }}
        className="mt-2 text-xs text-gray-600 hover:text-gray-900"
      >
        Cancel
      </button>
    </form>
  );
}
