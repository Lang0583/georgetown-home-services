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
  "inline-flex items-center gap-2 text-sm leading-snug text-gray-600 underline md:no-underline hover:text-gray-900 focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#01696F]/35";

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}

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
          if (providerName) trackPhoneClick(providerName);
        }}
      >
        <PhoneIcon className="h-4 w-4 shrink-0 text-gray-500" />
        {tel.display}
      </a>
    </div>
  );
}
