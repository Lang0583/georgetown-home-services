"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  angiGeorgetownContractorsUrl,
  exitInterstitialSessionKey,
} from "../lib/exit-interstitial";
import { affiliateCategoryFromAngiSlug } from "@/lib/affiliate-category";
import { externalBusinessLinkProps } from "../lib/businesses";
import {
  trackAffiliateLinkClick,
  trackAffiliateShown,
  trackOutboundClick,
} from "../lib/analytics";

export type ExitInterstitialModalProps = {
  providerName: string;
  providerUrl: string;
  serviceCategory: string;
  angiCategorySlug: string;
  open: boolean;
  onClose: () => void;
};

/** Centered card modal (Angi option + continue to provider). */
export function ExitInterstitialModal({
  providerName,
  providerUrl,
  serviceCategory,
  angiCategorySlug,
  open,
  onClose,
}: ExitInterstitialModalProps) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("button")?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  const angiHref = angiGeorgetownContractorsUrl(angiCategorySlug);
  const angiCategory = affiliateCategoryFromAngiSlug(angiCategorySlug);

  const openAngi = () => {
    trackAffiliateLinkClick(angiCategory);
    window.open(angiHref, "_blank", "noopener,noreferrer");
    onClose();
  };

  const continueToProvider = () => {
    window.open(providerUrl, "_blank", "noopener,noreferrer");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/50"
        aria-label="Close dialog"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-[101] w-full max-w-[400px] rounded-xl border border-ink/10 bg-surface p-6 shadow-xl"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <h2 id={titleId} className="text-lg font-semibold tracking-tight text-ink">
          Before you go — get a free quote in 60 seconds
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Compare {providerName} with other top-rated {serviceCategory} companies on Angi — free, no obligation. We may
          earn a fee if you hire through this partner link.
        </p>
        <div className="mt-6 flex flex-col gap-3">
          <button
            type="button"
            onClick={openAngi}
            className="inline-flex w-full items-center justify-center rounded-lg bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--accent-hover)]"
          >
            Get a Free Quote on Angi →
          </button>
          <button
            type="button"
            onClick={continueToProvider}
            className="text-center text-sm font-semibold text-muted underline-offset-2 hover:text-ink hover:underline"
          >
            No thanks, continue to {providerName} →
          </button>
        </div>
      </div>
    </div>
  );
}

export type ExitInterstitialVisitWebsiteProps = {
  providerName: string;
  providerUrl: string;
  /** Used in modal copy (e.g. &quot;plumbing&quot;, &quot;HVAC&quot;). */
  serviceCategory: string;
  /** Angi list slug (e.g. plumbing, hvac, pest-control). */
  angiCategorySlug: string;
  className?: string;
  children?: React.ReactNode;
};

/**
 * Visit Website control: optional session-scoped interstitial with Angi CTA, then outbound to provider.
 */
export default function ExitInterstitial({
  providerName,
  providerUrl,
  serviceCategory,
  angiCategorySlug,
  className,
  children = "Visit Website",
}: ExitInterstitialVisitWebsiteProps) {
  const [open, setOpen] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current != null) window.clearTimeout(timerRef.current);
    };
  }, []);

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    trackOutboundClick(providerName, serviceCategory, providerUrl);

    const key = exitInterstitialSessionKey(providerUrl, providerName);
    try {
      if (typeof sessionStorage !== "undefined" && sessionStorage.getItem(key) === "1") {
        window.open(providerUrl, "_blank", "noopener,noreferrer");
        return;
      }
    } catch {
      /* private mode */
    }

    if (timerRef.current != null) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      try {
        if (typeof sessionStorage !== "undefined") sessionStorage.setItem(key, "1");
      } catch {
        /* ignore */
      }
      trackAffiliateShown(providerName, serviceCategory);
      setOpen(true);
    }, 200);
  };

  return (
    <>
      <a href={providerUrl} {...externalBusinessLinkProps} className={className} onClick={onClick}>
        {children}
      </a>
      <ExitInterstitialModal
        providerName={providerName}
        providerUrl={providerUrl}
        serviceCategory={serviceCategory}
        angiCategorySlug={angiCategorySlug}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
