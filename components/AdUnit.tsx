"use client";

import { useEffect } from "react";
import { ADSENSE_PUBLISHER_ID, ADSENSE_UNITS_ENABLED } from "../lib/adsense-config";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

type Props = {
  slot: string;
  /** AdSense `data-ad-format` (default `auto`). */
  format?: string;
  /** Sets `data-full-width-responsive` when true (default true). */
  responsive?: boolean;
  className?: string;
};

/**
 * Responsive AdSense display unit (`ins.adsbygoogle`).
 * Renders only when `NEXT_PUBLIC_ADSENSE_ID` is set and `slot` is non-empty.
 */
export default function AdUnit({
  slot,
  format = "auto",
  responsive = true,
  className = "block",
}: Props) {
  useEffect(() => {
    if (!ADSENSE_UNITS_ENABLED || !slot || !ADSENSE_PUBLISHER_ID) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      /* ignore */
    }
  }, [slot]);

  if (!ADSENSE_UNITS_ENABLED || !slot || !ADSENSE_PUBLISHER_ID) return null;

  return (
    <ins
      className={["adsbygoogle", className].filter(Boolean).join(" ")}
      style={{ display: "block", textAlign: "center" }}
      data-ad-client={ADSENSE_PUBLISHER_ID}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive={responsive ? "true" : "false"}
    />
  );
}
