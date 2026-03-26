import Link from "next/link";
import type { ReactNode } from "react";

export default function LinkCard({
  href,
  title,
  description,
  badge,
  children,
}: {
  href: string;
  title: string;
  description: string;
  badge?: string;
  children?: ReactNode;
}) {
  return (
    <Link href={href} className="group block rounded-2xl border border-black/10 bg-white p-5 transition hover:border-black/20 hover:bg-zinc-50">
      <div className="flex items-start justify-between gap-4">
        <div>
          {badge ? <div className="text-xs font-semibold text-zinc-600">{badge}</div> : null}
          <div className="mt-1 text-base font-semibold text-zinc-900 group-hover:underline">{title}</div>
          <div className="mt-2 text-sm text-zinc-700">{description}</div>
        </div>
        <div className="text-sm text-zinc-500 group-hover:text-zinc-800">→</div>
      </div>
      {children ? <div className="mt-4">{children}</div> : null}
    </Link>
  );
}

