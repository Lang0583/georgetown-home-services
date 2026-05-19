"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  COOKIE_CONSENT_ALL,
  COOKIE_CONSENT_ESSENTIAL,
  COOKIE_CONSENT_STORAGE_KEY,
} from "../lib/cookie-consent";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function applyConsentMode(all: boolean) {
  if (typeof window === "undefined") return;
  const v = all ? "granted" : "denied";
  window.gtag?.("consent", "update", {
    ad_storage: v,
    ad_user_data: v,
    ad_personalization: v,
    analytics_storage: v,
    personalization_storage: v,
  });
}

/**
 * GDPR/CCPA-friendly notice + Consent Mode updates for GA4 / AdSense.
 * Choices persist in localStorage; bootstrap script in layout reads the same key.
 */
export default function CookieConsentBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const v = localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
      if (v === COOKIE_CONSENT_ALL || v === COOKIE_CONSENT_ESSENTIAL) {
        setVisible(false);
        return;
      }
    } catch {
      /* ignore */
    }
    setVisible(true);
  }, []);

  const acceptAll = () => {
    try {
      localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, COOKIE_CONSENT_ALL);
    } catch {
      /* ignore */
    }
    applyConsentMode(true);
    setVisible(false);
  };

  const essentialOnly = () => {
    try {
      localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, COOKIE_CONSENT_ESSENTIAL);
    } catch {
      /* ignore */
    }
    applyConsentMode(false);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie preferences"
      aria-live="polite"
      className="fixed bottom-0 left-0 right-0 z-[60] border-t border-gray-200 bg-white p-4 shadow-[0_-4px_24px_rgba(0,0,0,0.12)] md:left-auto md:right-4 md:bottom-4 md:max-w-lg md:rounded-xl md:border"
      style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
    >
      <p className="text-sm leading-relaxed text-gray-800">
        We use cookies for analytics and, with your consent, advertising (Google AdSense). Read{" "}
        <Link href="/privacy-policy" className="font-semibold text-primary underline underline-offset-2">
          Privacy Policy
        </Link>
        .
      </p>
      <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-end">
        <button
          type="button"
          onClick={essentialOnly}
          className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50"
        >
          Essential only
        </button>
        <button
          type="button"
          onClick={acceptAll}
          className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-hover"
        >
          Accept analytics &amp; ads
        </button>
      </div>
    </div>
  );
}
