"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Sticky header shell that publishes its height as `--site-header-offset` for main padding. */
export default function StickyHeaderShell({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const apply = () => {
      document.documentElement.style.setProperty("--site-header-offset", `${el.offsetHeight}px`);
    };
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(el);
    return () => {
      ro.disconnect();
      document.documentElement.style.removeProperty("--site-header-offset");
    };
  }, []);

  return (
    <header
      ref={ref}
      className="sticky top-0 z-50 border-b-[3px] border-brand bg-surface shadow-sm"
    >
      {children}
    </header>
  );
}
