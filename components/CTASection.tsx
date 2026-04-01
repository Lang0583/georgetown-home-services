import type { ReactNode } from "react";
import { ButtonLink } from "./Button";
import { PROVIDER_INFO_DISCLAIMER } from "../lib/provider-disclaimer";
import { CTA_EMAIL_PROVIDERS, CTA_VIEW_TOP_PROVIDERS } from "../lib/site-cta";

export { CTA_EMAIL_PROVIDERS, CTA_VIEW_TOP_PROVIDERS } from "../lib/site-cta";

export function SiteCTAButtons({
  primaryHref,
  emailFormHref = "#lead",
  className,
}: {
  primaryHref: string;
  /** Hash or path to the page that contains the email form (e.g. `#lead` or `/#lead`). */
  emailFormHref?: string;
  className?: string;
}) {
  return (
    <div className={["flex flex-col gap-3 sm:flex-row sm:items-center", className].filter(Boolean).join(" ")}>
      <ButtonLink href={primaryHref} className="text-sm">
        {CTA_VIEW_TOP_PROVIDERS}
      </ButtonLink>
      <ButtonLink href={emailFormHref} variant="secondary" className="text-sm">
        {CTA_EMAIL_PROVIDERS}
      </ButtonLink>
    </div>
  );
}

export default function CTASection({
  eyebrow,
  title,
  description,
  primaryHref,
  emailFormHref = "#lead",
  secondary,
  showDisclaimer,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  primaryHref: string;
  emailFormHref?: string;
  secondary?: ReactNode;
  showDisclaimer?: boolean;
}) {
  return (
    <section className="rounded-xl border border-gray-200 bg-gray-50 p-6 shadow-md md:p-8">
      {eyebrow ? <div className="text-xs font-semibold uppercase tracking-wide text-gray-600">{eyebrow}</div> : null}
      <h2 className="mt-2 text-3xl font-semibold tracking-tight text-gray-900">{title}</h2>
      <p className="mt-3 text-sm leading-relaxed text-gray-700 md:text-base">{description}</p>
      <div className="mt-6">
        <SiteCTAButtons primaryHref={primaryHref} emailFormHref={emailFormHref} />
      </div>
      {secondary ? <div className="mt-4 text-sm sm:max-w-md">{secondary}</div> : null}
      {showDisclaimer ? (
        <p className="mt-4 text-xs leading-relaxed text-gray-600">{PROVIDER_INFO_DISCLAIMER}</p>
      ) : null}
    </section>
  );
}
