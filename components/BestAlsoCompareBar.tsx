"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import type { AlsoCompareLink } from "../lib/best-also-compare-links";

const SCROLL_SHOW_PX = 300;
const STORAGE_PREFIX = "gths:best-compare-dismissed:";

export default function BestAlsoCompareBar({ links }: { links: AlsoCompareLink[] }) {
  const pathname = usePathname() ?? "";
  const storageKey = `${STORAGE_PREFIX}${pathname}`;
  const barRef = useRef<HTMLDivElement>(null);
  const [dismissed, setDismissed] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [scrollOk, setScrollOk] = useState(false);

  useEffect(() => {
    setHydrated(true);
    try {
      if (sessionStorage.getItem(storageKey) === "1") setDismissed(true);
    } catch {
      /* private mode / quota */
    }
  }, [storageKey]);

  const updateScroll = useCallback(() => {
    const y = window.scrollY || document.documentElement.scrollTop;
    setScrollOk(y >= SCROLL_SHOW_PX);
  }, []);

  useEffect(() => {
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateScroll);
  }, [updateScroll]);

  const visible = hydrated && !dismissed && scrollOk && links.length > 0;

  useEffect(() => {
    if (!visible || !barRef.current) {
      document.body.style.paddingBottom = "";
      return;
    }
    const el = barRef.current;
    const apply = () => {
      document.body.style.paddingBottom = `${el.offsetHeight}px`;
    };
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(el);
    return () => {
      ro.disconnect();
      document.body.style.paddingBottom = "";
    };
  }, [visible]);

  const dismiss = useCallback(() => {
    setDismissed(true);
    document.body.style.paddingBottom = "";
    try {
      sessionStorage.setItem(storageKey, "1");
    } catch {
      /* ignore */
    }
  }, [storageKey]);

  if (!visible) return null;

  return (
    <div
      ref={barRef}
      role="region"
      aria-label="Also compare with other guides"
      className="fixed bottom-0 left-0 right-0 z-[60] w-full bg-white px-6 py-4 shadow-[0_-4px_6px_-1px_rgb(0_0_0_/_.1)] md:py-3"
    >
      <div className="mx-auto flex max-w-5xl items-center gap-3">
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-2 gap-y-2 md:gap-x-1 md:gap-y-1">
          <span className="shrink-0 text-sm font-semibold text-gray-900">Also compare:</span>
          <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-2 md:gap-x-1">
            {links.flatMap((l, i) => [
              i > 0 ? (
                <span key={`sep-${l.href}`} className="text-gray-300" aria-hidden>
                  ·
                </span>
              ) : null,
              <Link
                key={l.href}
                href={l.href}
                className="inline-flex min-h-11 items-center rounded-md px-1 text-base font-semibold text-[#01696F] underline-offset-2 hover:underline md:min-h-0 md:text-sm"
              >
                {l.label}
              </Link>,
            ])}
          </div>
        </div>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss also compare bar"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 md:h-9 md:w-9"
        >
          <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
            <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
