"use client";

import type { ReactNode } from "react";
import { trackAffiliateLinkClick } from "@/lib/analytics";

export default function AffiliateLink({
  href,
  category,
  className,
  children,
}: {
  href: string;
  category: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="sponsored nofollow"
      className={className}
      onClick={() => trackAffiliateLinkClick(category)}
    >
      {children}
    </a>
  );
}
