import type { ReactNode } from "react";
import { ButtonLink } from "./Button";

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
    <section className="rounded-xl border border-gray-200 bg-gray-50 p-6 shadow-md md:p-8">
      {eyebrow ? <div className="text-xs font-semibold uppercase tracking-wide text-gray-600">{eyebrow}</div> : null}
      <h2 className="mt-2 text-3xl font-semibold tracking-tight text-gray-900">{title}</h2>
      <p className="mt-3 text-sm leading-relaxed text-gray-700 md:text-base">{description}</p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <ButtonLink href={primaryHref} className="shrink-0 text-sm">
          {primaryLabel}
        </ButtonLink>
        {secondary ? <div className="text-sm sm:max-w-md">{secondary}</div> : null}
      </div>
    </section>
  );
}

