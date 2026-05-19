"use client";

import Link from "next/link";
import { useLayoutEffect, useState } from "react";
import {
  getHailBannerAlertLabel,
  getHailBannerDismissStorageKey,
  isHailAlertBannerExpired,
  isHailBannerGloballyDisabled,
} from "../lib/hail-alert-banner-config";
import { SEVERE_WEATHER_LINKS } from "../lib/severe-weather-links";

const STORAGE_VALUE = "true";

const bannerBg = "#F59E0B";
const bannerText = "#1F2937";

export default function HomeHailAlertBanner() {
  const [show, setShow] = useState<boolean | null>(null);

  useLayoutEffect(() => {
    if (isHailBannerGloballyDisabled() || isHailAlertBannerExpired()) {
      setShow(false);
      return;
    }
    const storageKey = getHailBannerDismissStorageKey();
    try {
      const dismissed = localStorage.getItem(storageKey) === STORAGE_VALUE;
      setShow(!dismissed);
    } catch {
      setShow(true);
    }
  }, []);

  if (show !== true) return null;

  function dismiss() {
    try {
      localStorage.setItem(getHailBannerDismissStorageKey(), STORAGE_VALUE);
    } catch {
      /* ignore */
    }
    setShow(false);
  }

  const roofingHref = SEVERE_WEATHER_LINKS.roofingShortUrl;
  const alertLabel = getHailBannerAlertLabel();

  return (
    <div
      className="w-full border-b border-amber-600/30"
      style={{ backgroundColor: bannerBg, color: bannerText }}
      role="region"
      aria-label="Severe weather alert"
    >
      <div className="mx-auto flex max-w-5xl items-center gap-3 px-3 py-2.5 sm:px-4 sm:py-3">
        <p
          className="min-w-0 flex-1 text-center text-sm font-bold leading-snug sm:text-left sm:text-base"
          style={{ color: bannerText }}
        >
          <span aria-hidden>⚠️</span> {alertLabel}: Protect your home. Get a{" "}
          <Link
            href={roofingHref}
            className="font-bold underline decoration-amber-900/50 underline-offset-2 hover:decoration-amber-950"
            style={{ color: bannerText }}
          >
            free roof inspection
          </Link>{" "}
          from a{" "}
          <Link
            href={roofingHref}
            className="font-bold underline decoration-amber-900/50 underline-offset-2 hover:decoration-amber-950"
            style={{ color: bannerText }}
          >
            Georgetown roofing pro
          </Link>
          .
        </p>
        <button
          type="button"
          onClick={dismiss}
          className="grid size-9 shrink-0 place-items-center rounded-md text-xl font-bold leading-none hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-950"
          style={{ color: bannerText }}
          aria-label="Dismiss severe weather alert"
        >
          <span aria-hidden>×</span>
        </button>
      </div>
    </div>
  );
}
