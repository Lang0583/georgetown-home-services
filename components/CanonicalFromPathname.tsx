"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";

export default function CanonicalFromPathname() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (pathname == null) return;

    const href = `https://www.georgetownhomeservices.com${pathname}`;
    let link = document.querySelector<HTMLLinkElement>(
      'link[data-canonical-from-pathname="true"]',
    );
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      link.setAttribute("data-canonical-from-pathname", "true");
      document.head.appendChild(link);
    }
    link.href = href;
  }, [pathname]);

  return null;
}
