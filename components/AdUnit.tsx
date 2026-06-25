"use client";

import { useEffect, useRef, useState } from "react";
import {
  ADSENSE_PUBLISHER_ID,
  ADSENSE_SLOT_PLACEHOLDER,
  ADSENSE_UNITS_ENABLED,
} from "../lib/adsense-config";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

/** Constrained format union per AdSense supported values. */
export type AdUnitFormat = "auto" | "rectangle" | "horizontal" | "vertical" | "fluid";

type Props = {
  /** AdSense `data-ad-slot` value. Preferred prop name going forward. */
  slotId?: string;
  /** Back-compat alias for callers that still pass `slot=`. */
  slot?: string;
  /** AdSense `data-ad-format` (default `auto`). */
  format?: AdUnitFormat;
  /** Sets `data-full-width-responsive` when true (default true). */
  responsive?: boolean;
  className?: string;
  /**
   * Optional text shown in place of the unit when AdSense fails to load
   * (typically an ad blocker). Defaults to a quiet single-line notice.
   */
  fallback?: React.ReactNode;
};

/**
 * Responsive AdSense display unit (`ins.adsbygoogle`).
 *
 * - Renders nothing when units are disabled (no `NEXT_PUBLIC_ADSENSE_*` env set).
 * - Renders nothing when the slot is missing or still the literal
 *   `SLOT_ID_PLACEHOLDER` sentinel — so the placeholder never reaches Google.
 * - Pushes `adsbygoogle.push({})` once per mount inside `useEffect`, after
 *   hydration, to avoid SSR/CSR mismatch warnings.
 * - After mount, if the `<ins>` collapses to `clientHeight === 0` (the typical
 *   adblock signature), swaps in `fallback`. This keeps layout from shifting
 *   when the network blocks `pagead2.googlesyndication.com`.
 */
export default function AdUnit({
  slotId,
  slot,
  format = "auto",
  responsive = true,
  className = "block",
  fallback,
}: Props) {
  const resolvedSlot = (slotId || slot || "").trim();
  const isPlaceholder = resolvedSlot === ADSENSE_SLOT_PLACEHOLDER;
  const canRender = ADSENSE_UNITS_ENABLED && !!ADSENSE_PUBLISHER_ID && !!resolvedSlot && !isPlaceholder;

  const insRef = useRef<HTMLModElement | null>(null);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    if (!canRender) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      /* ignore */
    }
    // Detect adblock / failed fetch: after a short delay the AdSense iframe
    // would have populated. If the slot stayed 0×0 we assume the request was
    // blocked and show the fallback.
    const t = window.setTimeout(() => {
      const node = insRef.current;
      if (node && node.clientHeight === 0) setBlocked(true);
    }, 2500);
    return () => window.clearTimeout(t);
  }, [canRender, resolvedSlot]);

  if (!canRender) return null;

  if (blocked && fallback !== null) {
    return (
      <div
        className={["text-center text-xs text-[#6b7280]", className].filter(Boolean).join(" ")}
        role="complementary"
        aria-label="Advertisement placeholder"
      >
        {fallback ?? "Ads help keep Georgetown Home Services free."}
      </div>
    );
  }

  return (
    <ins
      ref={insRef}
      className={["adsbygoogle", className].filter(Boolean).join(" ")}
      style={{ display: "block", textAlign: "center" }}
      data-ad-client={ADSENSE_PUBLISHER_ID}
      data-ad-slot={resolvedSlot}
      data-ad-format={format}
      data-full-width-responsive={responsive ? "true" : "false"}
    />
  );
}
