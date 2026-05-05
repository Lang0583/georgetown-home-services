"use client";

import { useEffect } from "react";
import { ADSENSE_PUBLISHER_ID } from "../lib/adsense-config";

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
 * Single AdSense display slot (`ins.adsbygoogle`). Create ad units in AdSense
 * (Ads → By ad unit) and pass the numeric slot ID here.
 */
export default function AdUnit({
  slot,
  format = "auto",
  responsive = true,
  className = "block",
}: Props) {
  useEffect(() => {
    if (!slot || !ADSENSE_PUBLISHER_ID) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      /* ignore */
    }
  }, [slot]);

  if (!slot || !ADSENSE_PUBLISHER_ID) return null;

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
