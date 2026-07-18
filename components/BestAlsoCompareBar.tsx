"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import type { AlsoCompareLink } from "../lib/best-also-compare-links";

const SCROLL_SHOW_PX = 400;
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
    const stickyCallH = () => {
      const raw = getComputedStyle(document.documentElement).getPropertyValue("--sticky-call-bar-h");
      const n = Number.parseFloat(raw);
      return Number.isFinite(n) ? n : 0;
    };
    const apply = () => {
      document.body.style.paddingBottom = `${el.offsetHeight + stickyCallH()}px`;
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
      className="fixed bottom-[var(--sticky-call-bar-h,0px)] left-0 right-0 z-[60] w-full border-t-[3px] border-brand bg-surface px-6 py-4 shadow-[0_-4px_14px_rgba(0,0,0,0.12)] md:bottom-0 md:py-3"
    >
      <div className="mx-auto flex w-full max-w-5xl items-center gap-3">
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-3 gap-y-3 sm:gap-x-2 sm:gap-y-2">
          <span className="shrink-0 text-sm font-semibold text-ink md:text-sm">Also compare:</span>
          <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-2 sm:gap-x-2">
            {links.flatMap((l, i) => [
              i > 0 ? (
                <span key={`sep-${l.href}`} className="text-muted" aria-hidden>
                  ·
                </span>
              ) : null,
              <Link
                key={l.href}
                href={l.href}
                className="inline-flex min-h-[48px] min-w-[44px] items-center rounded-md px-2 py-2 text-base font-bold leading-tight text-brand underline-offset-2 hover:underline sm:min-h-0 sm:min-w-0 sm:px-1 sm:py-1 sm:text-sm"
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
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface-alt hover:text-ink md:h-10 md:w-10"
        >
          <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
            <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
