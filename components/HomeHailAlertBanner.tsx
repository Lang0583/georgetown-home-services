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

  const inspectionHref = SEVERE_WEATHER_LINKS.roofingShortUrl;
  const roofingHubHref = SEVERE_WEATHER_LINKS.roofingHub;
  const hailPillarHref = SEVERE_WEATHER_LINKS.hailGuideBlog;
  const alertLabel = getHailBannerAlertLabel();

  const linkClass =
    "font-bold underline decoration-amber-900/50 underline-offset-2 hover:decoration-amber-950";

  return (
    <div
      className="w-full border-b border-amber-600/30"
      style={{ backgroundColor: bannerBg, color: bannerText }}
      role="region"
      aria-label="Severe weather alert"
    >
      <div className="mx-auto flex max-w-5xl items-center gap-3 px-3 py-2.5 sm:px-4 sm:py-3">
        <p
          className="min-w-0 flex-1 text-center text-sm font-semibold leading-snug sm:text-left sm:text-base"
          style={{ color: bannerText }}
        >
          <span aria-hidden>⚠️</span> {alertLabel}: The past few evenings have unloaded wind-coupled hail,
          broken branches, and roof punctures tree-to-shingle across Georgetown and Williamson pockets—more rounds
          are possible while the ridge stays unsettled. If you heard impacts or see granules in gutters, prioritize
          date-stamped wide shots of soft metals, drip edge/rakes, ridge cap, skylights/storm collars, vents, fascia,
          and any interior watermark trail—coverage and repair paths depend on documentation, not instant promises.
          Start with{" "}
          <Link href={hailPillarHref} className={linkClass} style={{ color: bannerText }}>
            the Williamson hail playbook (May 2026)
          </Link>
          , use the{" "}
          <Link href={roofingHubHref} className={linkClass} style={{ color: bannerText }}>
            Georgetown roofing service hub
          </Link>
          {" "}for tarp vs monitor decisions and HOA pacing, then line up{" "}
          <Link href={inspectionHref} className={linkClass} style={{ color: bannerText }}>
            written roof inspections from verified local roofers
          </Link>
          —compare any insurer worksheet carefully to ladder findings on ridges and flashings.
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
