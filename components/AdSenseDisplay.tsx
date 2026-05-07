"use client";

import AdUnit from "./AdUnit";

type Props = {
  /** Ad unit slot from AdSense; when empty, nothing renders. */
  slot: string;
  className?: string;
};

/**
 * Responsive display unit with labeled wrapper. One mount = one `(adsbygoogle).push({})`.
 */
export default function AdSenseDisplay({ slot, className = "" }: Props) {
  if (!slot) return null;

  return (
    <div
      className={["rounded-xl border border-gray-200 bg-white p-4 shadow-sm", className].filter(Boolean).join(" ")}
      role="complementary"
      aria-label="Advertisement"
    >
      <p className="mb-3 text-center text-[10px] font-semibold uppercase tracking-wider text-gray-400">Advertisement</p>
      <AdUnit slot={slot} format="auto" responsive />
    </div>
  );
}
