"use client";

import type { ComponentProps } from "react";
import { buttonStyles } from "./Button";
import { trackAffiliatePartnerClick } from "../lib/analytics";

type AffiliateId = "angi" | "thumbtack";

type Props = Omit<ComponentProps<"a">, "href" | "rel" | "target" | "onClick"> & {
  href: string;
  affiliate: AffiliateId;
  /** GA4 `placement` param (optional). */
  placement?: string;
  /** Use shared primary/secondary button styling for prominent CTAs. */
  buttonVariant?: keyof typeof buttonStyles;
  /** Runs after GA4 `affiliate_click` (e.g. close a modal). */
  onClick?: ComponentProps<"a">["onClick"];
};

/**
 * Outbound affiliate link: `nofollow sponsored`, GA4 `affiliate_click` with `affiliate` dimension.
 */
export default function AffiliateTrackedAnchor({
  href,
  affiliate,
  placement,
  buttonVariant,
  className = "",
  children,
  onClick,
  ...rest
}: Props) {
  const btn = buttonVariant ? buttonStyles[buttonVariant] : "";
  return (
    <a
      {...rest}
      href={href}
      target="_blank"
      rel="nofollow sponsored noopener noreferrer"
      className={[btn, className].filter(Boolean).join(" ")}
      onClick={(e) => {
        onClick?.(e);
        trackAffiliatePartnerClick(affiliate, { placement });
      }}
    >
      {children}
    </a>
  );
}
