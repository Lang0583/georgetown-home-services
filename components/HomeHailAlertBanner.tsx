"use client";

import Link from "next/link";
import { useLayoutEffect, useState } from "react";
import { isHailAlertBannerExpired } from "../lib/hail-alert-banner-expiry";

const STORAGE_KEY = "hailBannerDismissed_may2026";
const STORAGE_VALUE = "true";

const bannerBg = "#F59E0B";
const bannerText = "#1F2937";

export default function HomeHailAlertBanner() {
  const [show, setShow] = useState<boolean | null>(null);

  useLayoutEffect(() => {
    if (isHailAlertBannerExpired()) {
      setShow(false);
      return;
    }
    try {
      const dismissed = localStorage.getItem(STORAGE_KEY) === STORAGE_VALUE;
      setShow(!dismissed);
    } catch {
      setShow(true);
    }
  }, []);

  if (show !== true) return null;

  function dismiss() {
    try {
      localStorage.setItem(STORAGE_KEY, STORAGE_VALUE);
    } catch {
      /* ignore */
    }
    setShow(false);
  }

  return (
    <div
      className="w-full border-b border-rating/30"
      style={{ backgroundColor: bannerBg, color: bannerText }}
      role="region"
      aria-label="Hail storm alert"
    >
      <div className="mx-auto flex max-w-5xl items-center gap-3 px-3 py-2.5 sm:px-4 sm:py-3">
        <p
          className="min-w-0 flex-1 text-center text-sm font-bold leading-snug sm:text-left sm:text-base"
          style={{ color: bannerText }}
        >
          <span aria-hidden>⚠️</span> Hail Storm Alert — Williamson County May 2026: Protect your home. Get a{" "}
          <Link
            href="/services/roofing"
            className="font-bold underline decoration-rating/50 underline-offset-2 hover:decoration-rating"
            style={{ color: bannerText }}
          >
            free roof inspection
          </Link>{" "}
          from a{" "}
          <Link
            href="/services/roofing"
            className="font-bold underline decoration-rating/50 underline-offset-2 hover:decoration-rating"
            style={{ color: bannerText }}
          >
            Georgetown roofing pro
          </Link>
          .
        </p>
        <button
          type="button"
          onClick={dismiss}
          className="grid size-9 shrink-0 place-items-center rounded-md text-xl font-bold leading-none hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rating"
          style={{ color: bannerText }}
          aria-label="Dismiss hail storm alert"
        >
          <span aria-hidden>×</span>
        </button>
      </div>
    </div>
  );
}
