/**
 * Shared provider phone display for directory cards (Best Of, homepage columns, etc.).
 * tel: href strips non-digits; US 10-digit numbers get +1 prefix.
 */

"use client";

import { trackPhoneClick } from "../lib/analytics";
import { businessPhoneTel } from "../lib/phone";

export { businessPhoneTel } from "../lib/phone";

const linkClassName =
  "text-sm leading-snug text-muted underline md:no-underline hover:text-ink focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/35";

export function BusinessPhoneRow({
  phone,
  providerName,
  category,
  wrapperClassName = "mt-2",
  className,
}: {
  phone?: string;
  /** When set, GA4 `phone_click` is sent with this label. */
  providerName?: string;
  /** Optional service category for GA4 `phone_click`. */
  category?: string;
  /**
   * Extra margin wrapper. Pass `null` to render only the `<a>` (e.g. inside a `<p>`).
   * Pass `""` when the parent already provides gap.
   */
  wrapperClassName?: string | null;
  className?: string;
}) {
  const tel = businessPhoneTel(phone);
  if (!tel) return null;
  const link = (
    <a
      href={tel.href}
      className={className ?? linkClassName}
      onClick={() => {
        trackPhoneClick(providerName?.trim() || "unknown_provider", category);
      }}
    >
      {tel.display}
    </a>
  );
  if (wrapperClassName === null) return link;
  return <div className={wrapperClassName || undefined}>{link}</div>;
}
