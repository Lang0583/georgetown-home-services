"use client";

import { trackAffiliateCtaClick } from "../lib/analytics";

function affiliateLabelFromHref(href: string): string {
  try {
    const host = new URL(href).hostname.toLowerCase();
    if (host.includes("amazon.")) return "Amazon";
    if (host.includes("angi.com")) return "Angi";
    if (host.includes("homeadvisor.com")) return "HomeAdvisor";
    return new URL(href).hostname.replace(/^www\./, "") || "Partner";
  } catch {
    return "Partner";
  }
}

function shouldTrackAffiliateClick(href: string, rel?: string): boolean {
  if (!href.startsWith("http")) return false;
  if (rel?.includes("sponsored")) return true;
  try {
    const h = new URL(href).hostname.toLowerCase();
    if (h.includes("amazon.") || h.includes("angi.com") || h.includes("homeadvisor.com")) return true;
  } catch {
    return false;
  }
  return false;
}

/** Inline prose link: tracks sponsored / known affiliate hosts on click. */
export function TrackableProseLink({
  href,
  rel,
  className,
  children,
}: {
  href: string;
  rel?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      rel={rel}
      className={className}
      onClick={() => {
        if (shouldTrackAffiliateClick(href, rel)) {
          trackAffiliateCtaClick(affiliateLabelFromHref(href));
        }
      }}
    >
      {children}
    </a>
  );
}
