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
    "group block rounded-xl border border-gray-200 bg-white p-6 shadow-md transition hover:bg-gray-50";
  const hoverBorder = categoryTopHover
    ? "border-t-[3px] border-t-transparent hover:border-x-primary/25 hover:border-b-primary/25 hover:border-t-primary"
    : "hover:border-gray-300";

  return (
    <Link href={href} className={[base, hoverBorder].join(" ")}>
      <div className="flex items-start justify-between gap-4">
        <div>
          {badge ? <div className="text-xs font-semibold text-gray-600">{badge}</div> : null}
          <div className="mt-1 text-base font-semibold text-gray-900 group-hover:underline">{title}</div>
          <div className="mt-2 text-sm text-gray-700">{description}</div>
        </div>
        <div className="text-sm text-gray-500 group-hover:text-gray-800">→</div>
      </div>
      {children ? <div className="mt-4">{children}</div> : null}
    </Link>
  );
}

