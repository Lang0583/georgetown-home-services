import Link from "next/link";
import type { ReactNode } from "react";

export default function CTASection({
  eyebrow,
  title,
  description,
  primaryHref,
  primaryLabel,
  secondary,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  secondary?: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-black/10 bg-zinc-50 p-6 md:p-8">
      {eyebrow ? <div className="text-xs font-semibold uppercase tracking-wide text-zinc-600">{eyebrow}</div> : null}
      <h2 className="mt-2 text-2xl font-semibold text-zinc-900">{title}</h2>
      <p className="mt-2 text-zinc-700">{description}</p>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Link
          href={primaryHref}
          className="inline-flex h-11 items-center justify-center rounded-full bg-zinc-900 px-5 text-sm font-semibold text-white hover:bg-zinc-800"
        >
          {primaryLabel}
        </Link>
        {secondary ? <div className="sm:ml-3">{secondary}</div> : null}
      </div>
    </section>
  );
}

