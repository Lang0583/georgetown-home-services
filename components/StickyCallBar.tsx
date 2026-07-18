"use client";

import { useEffect, useRef } from "react";
import { trackPhoneClick } from "@/lib/analytics";
import { businessPhoneTel } from "@/lib/phone";

const STICKY_CALL_VAR = "--sticky-call-bar-h";

/**
 * Mobile-only fixed bottom bar with a primary provider “Call now” CTA.
 * Visible below 768px; hidden when no usable phone. Sets `--sticky-call-bar-h`
 * so other bottom bars / body padding can clear it.
 */
export default function StickyCallBar({
  providerName,
  phone,
  category,
}: {
  providerName: string;
  phone?: string;
  category?: string;
}) {
  const barRef = useRef<HTMLDivElement>(null);
  const tel = businessPhoneTel(phone);

  useEffect(() => {
    if (!tel || !barRef.current) return;
    const el = barRef.current;
    const apply = () => {
      document.documentElement.style.setProperty(STICKY_CALL_VAR, `${el.offsetHeight}px`);
      document.body.classList.add("has-sticky-call-bar");
    };
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(el);
    return () => {
      ro.disconnect();
      document.documentElement.style.removeProperty(STICKY_CALL_VAR);
      document.body.classList.remove("has-sticky-call-bar");
    };
  }, [tel]);

  if (!tel) return null;

  return (
    <div
      ref={barRef}
      role="region"
      aria-label={`Call ${providerName}`}
      className="fixed inset-x-0 bottom-0 z-[55] border-t border-ink/10 bg-surface px-4 py-3 shadow-[0_-4px_14px_rgba(0,0,0,0.12)] md:hidden"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-2">
        <p className="truncate text-center text-sm font-semibold text-ink">{providerName}</p>
        <a
          href={tel.href}
          onClick={() => trackPhoneClick(providerName, category)}
          className="inline-flex w-full items-center justify-center rounded-lg bg-accent px-5 py-3 text-base font-semibold text-white transition-colors hover:bg-accent-hover"
        >
          Call now
        </a>
      </div>
    </div>
  );
}
