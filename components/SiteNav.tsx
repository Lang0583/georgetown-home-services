"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

const navLinkClass =
  "inline-flex min-h-11 items-center justify-center rounded-md px-2 text-sm font-semibold text-muted underline-offset-4 transition-colors hover:bg-surface-alt hover:text-brand hover:underline hover:decoration-brand sm:min-h-0 sm:justify-start sm:px-0.5 sm:hover:bg-transparent";

const moreItemClass =
  "block w-full px-3 py-2.5 text-left text-sm font-semibold text-muted transition-colors hover:bg-surface-alt hover:text-brand";

export type SiteNavLink = { href: string; label: string };

type SiteNavProps = {
  primary: SiteNavLink[];
  more: SiteNavLink[];
};

export default function SiteNav({ primary, more }: SiteNavProps) {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent | PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <nav
      className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1 sm:gap-x-4 md:flex-1 md:justify-end md:gap-x-5"
      aria-label="Main navigation"
    >
      {primary.map((item) => (
        <Link key={item.href} href={item.href} className={navLinkClass}>
          {item.label}
        </Link>
      ))}

      <div ref={rootRef} className="relative">
        <button
          type="button"
          className={navLinkClass}
          aria-expanded={open}
          aria-controls={menuId}
          aria-haspopup="menu"
          onClick={() => setOpen((v) => !v)}
        >
          More
          <span className="ml-1 inline-block text-[0.65em] leading-none" aria-hidden>
            {open ? "▴" : "▾"}
          </span>
        </button>
        {open ? (
          <div
            id={menuId}
            role="menu"
            className="absolute right-0 top-full z-[70] mt-1 min-w-[12.5rem] rounded-lg border border-ink/10 bg-surface py-1 shadow-lg"
          >
            {more.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                role="menuitem"
                className={moreItemClass}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </nav>
  );
}
