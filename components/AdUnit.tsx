"use client";

import { useEffect } from "react";
import { ADSENSE_ENABLED, ADSENSE_PUBLISHER_ID } from "../lib/adConfig";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

type Props = {
  slotId: string;
  /** AdSense `data-ad-format` (default `auto`). */
  format?: string;
  /** Sets `data-full-width-responsive` when true (default true). */
  responsive?: boolean;
  className?: string;
};

/**
 * Single AdSense display slot (`ins.adsbygoogle`). Create ad units in AdSense
 * (Ads → By ad unit) and pass the numeric slot ID here.
 */
export default function AdUnit({
  slotId,
  format = "auto",
  responsive = true,
  className = "block",
}: Props) {
  const active = ADSENSE_ENABLED && Boolean(slotId && ADSENSE_PUBLISHER_ID);

  useEffect(() => {
    if (!active) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      /* ignore */
    }
  }, [active, slotId]);

  if (!active) return null;

  return (
    <ins
      className={["adsbygoogle", className].filter(Boolean).join(" ")}
      style={{ display: "block", textAlign: "center" }}
      data-ad-client={ADSENSE_PUBLISHER_ID}
      data-ad-slot={slotId}
      data-ad-format={format}
      data-full-width-responsive={responsive ? "true" : "false"}
    />
  );
}
