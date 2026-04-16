"use client";

import { useEffect } from "react";
import { ADSENSE_CLIENT_ID } from "../lib/adsense-config";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

type Props = {
  /** Ad unit slot from AdSense; when empty, nothing renders. */
  slot: string;
  className?: string;
};

/**
 * Responsive display unit. One instance = one `(adsbygoogle).push({})` after mount.
 */
export default function AdSenseDisplay({ slot, className = "" }: Props) {
  useEffect(() => {
    if (!slot) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      /* ignore */
    }
  }, [slot]);

  if (!slot) return null;

  return (
    <div
      className={["rounded-xl border border-gray-200 bg-white p-4 shadow-sm", className].filter(Boolean).join(" ")}
      role="complementary"
      aria-label="Advertisement"
    >
      <p className="mb-3 text-center text-[10px] font-semibold uppercase tracking-wider text-gray-400">Advertisement</p>
      <ins
        className="adsbygoogle block"
        style={{ display: "block", textAlign: "center" }}
        data-ad-client={ADSENSE_CLIENT_ID}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
