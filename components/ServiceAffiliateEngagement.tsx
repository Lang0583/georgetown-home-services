"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AFFILIATE_ANGI_URL } from "../lib/affiliate-config";
import AffiliateTrackedAnchor from "./AffiliateTrackedAnchor";

const STORAGE_PREFIX = "ghs-service-affiliate-scroll-modal:";
const SUPPRESS_MS = 7 * 24 * 60 * 60 * 1000;
const SCROLL_THRESHOLD = 0.7;

type Props = {
  /** GA4 `placement` on the mobile sticky bar (default: `service-sticky-mobile`). */
  stickyPlacement?: string;
  /** GA4 `placement` on the scroll modal CTA (default: `service-scroll-modal`). */
  scrollModalPlacement?: string;
};

function readDismissedAt(key: string): number | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    const n = Number(raw);
    return Number.isFinite(n) ? n : null;
  } catch {
    return null;
  }
}

function shouldSuppressModal(key: string): boolean {
  const t = readDismissedAt(key);
  if (t === null) return false;
  return Date.now() - t < SUPPRESS_MS;
}

function dismissModal(key: string): void {
  try {
    window.localStorage.setItem(key, String(Date.now()));
  } catch {
    /* ignore quota */
  }
}

/** Scroll depth 0–1: only meaningful when the page actually scrolls (avoids instant modal on short pages). */
function scrollDepth(): number {
  const el = document.documentElement;
  const maxScroll = el.scrollHeight - window.innerHeight;
  if (maxScroll <= 8) return 0;
  return window.scrollY / maxScroll;
}

/**
 * Mobile sticky Angi bar + scroll-depth (70%) Angi modal with per-pathname 7-day localStorage dismissal.
 */
export default function ServiceAffiliateEngagement({
  stickyPlacement = "service-sticky-mobile",
  scrollModalPlacement = "service-scroll-modal",
}: Props = {}) {
  const pathname = usePathname() ?? "";
  const storageKey = `${STORAGE_PREFIX}${pathname}`;

  const [open, setOpen] = useState(false);
  const triggeredRef = useRef(false);

  const close = useCallback(() => {
    dismissModal(storageKey);
    setOpen(false);
  }, [storageKey]);

  const tryOpen = useCallback(() => {
    if (triggeredRef.current || open || shouldSuppressModal(storageKey)) return;
    if (scrollDepth() >= SCROLL_THRESHOLD) {
      triggeredRef.current = true;
      setOpen(true);
    }
  }, [open, storageKey]);

  useEffect(() => {
    const onScroll = () => tryOpen();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    tryOpen();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [tryOpen]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  return (
    <>
      <div
        className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200 bg-white/95 px-3 py-2.5 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] backdrop-blur-sm md:hidden"
        style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
        role="region"
        aria-label="Get estimates"
      >
        <AffiliateTrackedAnchor
          href={AFFILIATE_ANGI_URL}
          affiliate="angi"
          placement={stickyPlacement}
          buttonVariant="primary"
          className="w-full justify-center !py-2.5 text-center text-sm"
        >
          📞 Get Free Estimates Today
        </AffiliateTrackedAnchor>
      </div>

      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="affiliate-exit-modal-title"
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/50"
            aria-label="Close"
            onClick={close}
          />
          <div
            className="relative z-10 w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={close}
              className="absolute right-3 top-3 rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
              aria-label="Dismiss"
            >
              <span className="text-lg leading-none" aria-hidden>
                ×
              </span>
            </button>
            <h2 id="affiliate-exit-modal-title" className="pr-8 text-lg font-semibold tracking-tight text-gray-900">
              Before You Go — Get a Free Quote in 60 Seconds
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              Compare home service pros serving Georgetown, TX—request quotes when you’re ready.
            </p>
            <AffiliateTrackedAnchor
              href={AFFILIATE_ANGI_URL}
              affiliate="angi"
              placement={scrollModalPlacement}
              buttonVariant="primary"
              className="mt-5 w-full justify-center"
              onClick={close}
            >
              Get 3 Free Quotes
            </AffiliateTrackedAnchor>
            <p className="mt-2 text-xs text-gray-500">Sponsored — Angi. We may earn a commission.</p>
            <button
              type="button"
              onClick={close}
              className="mt-3 w-full text-center text-sm font-medium text-gray-600 underline-offset-4 hover:text-gray-900 hover:underline"
            >
              No thanks
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
