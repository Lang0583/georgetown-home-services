/**
 * Shared provider phone display for directory cards (Best Of, homepage columns, etc.).
 * tel: href strips non-digits; US 10-digit numbers get +1 prefix.
 */

"use client";

import { trackPhoneClick } from "../lib/analytics";

function trim(s: string | undefined) {
  return (s ?? "").trim();
}

/** Build E.164-style tel href from stored display string; returns null if empty / no digits. */
export function businessPhoneTel(phoneRaw: string | undefined): { href: string; display: string } | null {
  const display = trim(phoneRaw);
  if (!display) return null;
  const digits = display.replace(/\D/g, "");
  if (!digits) return null;
  if (digits.length === 10) return { href: `tel:+1${digits}`, display };
  if (digits.length === 11 && digits.startsWith("1")) return { href: `tel:+${digits}`, display };
  return { href: `tel:+${digits}`, display };
}

const linkClassName =
  "text-sm leading-snug text-muted underline md:no-underline hover:text-ink focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/35";

export function BusinessPhoneRow({
  phone,
  providerName,
  wrapperClassName = "mt-2",
}: {
  phone?: string;
  /** When set, GA4 `phone_click` is sent with this label. */
  providerName?: string;
  /** Extra margin wrapper; omit spacing by passing "" if the parent provides gap. */
  wrapperClassName?: string;
}) {
  const tel = businessPhoneTel(phone);
  if (!tel) return null;
  return (
    <div className={wrapperClassName || undefined}>
      <a
        href={tel.href}
        className={linkClassName}
        onClick={() => {
          trackPhoneClick(providerName?.trim() || "unknown_provider");
        }}
      >
        {tel.display}
      </a>
    </div>
  );
}
