import Link from "next/link";
import type { ReactNode } from "react";

export default function LinkCard({
  href,
  title,
  description,
  badge,
  children,
  categoryTopHover = false,
}: {
  href: string;
  title: string;
  description: string;
  badge?: string;
  children?: ReactNode;
  /** 3px teal top accent on hover (homepage-style category tiles). */
  categoryTopHover?: boolean;
}) {
  const base =
    "group block rounded-xl border border-ink/10 bg-surface p-6 shadow-md transition hover:bg-surface-alt";
  const hoverBorder = categoryTopHover
    ? "border-t-[3px] border-t-transparent hover:border-x-brand/25 hover:border-b-brand/25 hover:border-t-brand"
    : "hover:border-ink/15";

  return (
    <Link href={href} className={[base, hoverBorder].join(" ")}>
      <div className="flex items-start justify-between gap-4">
        <div>
          {badge ? <div className="text-xs font-semibold text-muted">{badge}</div> : null}
          <div className="mt-1 text-base font-semibold text-ink group-hover:underline">{title}</div>
          <div className="mt-2 text-sm text-muted">{description}</div>
        </div>
        <div className="text-sm text-muted group-hover:text-ink" aria-hidden>
          →
        </div>
      </div>
      {children ? <div className="mt-4">{children}</div> : null}
    </Link>
  );
}

