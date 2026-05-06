"use client";

import { useState } from "react";

export default function FooterEmailCapture() {
  const [email, setEmail] = useState("");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: Connect to email provider when Beehiiv is set up
    const trimmed = email.trim();
    if (trimmed) console.log("footer email capture:", trimmed);
  }

  return (
    <section
      id="email-capture"
      className="border-t border-gray-200 bg-gray-50"
      aria-label="Get Georgetown home tips by email"
    >
      <div className="mx-auto max-w-5xl px-4 py-8">
        <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-stretch sm:gap-3">
          <label htmlFor="footer-email-capture" className="sr-only">
            Email address
          </label>
          <input
            id="footer-email-capture"
            type="email"
            name="email"
            autoComplete="email"
            inputMode="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="min-h-11 w-full flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary-light"
          />
          <button
            type="submit"
            className="min-h-11 shrink-0 rounded-lg bg-[#01696F] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0C4E54]"
          >
            Get Georgetown Home Tips
          </button>
        </form>
        <p className="mt-3 text-sm leading-relaxed text-gray-600">
          Seasonal maintenance reminders for Georgetown homeowners. No spam.
        </p>
      </div>
    </section>
  );
}
