"use client";

import { trackAffiliateLinkClick } from "../lib/analytics";

const CJ_AFFILIATE_HOSTS = [
  "anrdoezrs.net",
  "dpbolvw.net",
  "kqzyfj.com",
  "jdoqocy.com",
] as const;

function affiliateCategoryFromHref(href: string): string {
  try {
    const host = new URL(href).hostname.toLowerCase();
    if (host.includes("amazon.")) return "amazon";
    if (host.includes("homeadvisor.com")) return "homeadvisor";
    if (host.includes("thumbtack.com")) return "thumbtack";
    if (CJ_AFFILIATE_HOSTS.some((h) => host.includes(h))) return "cj_angi";
    return host.replace(/^www\./, "") || "partner";
  } catch {
    return "partner";
  }
}

function shouldTrackAffiliateClick(href: string, rel?: string): boolean {
  if (!href.startsWith("http")) return false;
  if (rel?.includes("sponsored")) return true;
  try {
    const h = new URL(href).hostname.toLowerCase();
    if (h.includes("amazon.") || h.includes("homeadvisor.com")) return true;
    if (CJ_AFFILIATE_HOSTS.some((cj) => h.includes(cj))) return true;
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
          trackAffiliateLinkClick(affiliateCategoryFromHref(href));
        }
      }}
    >
      {children}
    </a>
  );
}
