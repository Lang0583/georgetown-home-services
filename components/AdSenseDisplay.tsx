"use client";

import { ADSENSE_ENABLED } from "../lib/adConfig";
import AdUnit from "./AdUnit";

type Props = {
  /** Ad unit slot from AdSense; when empty, nothing renders. */
  slotId: string;
  className?: string;
};

/**
 * Responsive display unit with labeled wrapper. One mount = one `(adsbygoogle).push({})`.
 */
export default function AdSenseDisplay({ slotId, className = "" }: Props) {
  if (!ADSENSE_ENABLED || !slotId) return null;

  return (
    <div
      className={[
        "rounded-xl border border-ink/10 bg-surface p-4",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      role="complementary"
      aria-label="Advertisement"
    >
      <p className="mb-3 text-center text-[10px] font-semibold uppercase tracking-wider text-muted">
        Advertisement
      </p>
      <AdUnit slotId={slotId} format="auto" responsive />
    </div>
  );
}
