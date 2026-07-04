import type { ReactNode } from "react";
import { ButtonLink } from "./Button";
import { PROVIDER_INFO_DISCLAIMER } from "../lib/provider-disclaimer";
import { CTA_EMAIL_PROVIDERS, CTA_NEWSLETTER_SHORT, CTA_VIEW_TOP_PROVIDERS } from "../lib/site-cta";

export { CTA_EMAIL_PROVIDERS, CTA_NEWSLETTER_SHORT, CTA_VIEW_TOP_PROVIDERS } from "../lib/site-cta";

export function SiteCTAButtons({
  primaryHref,
  emailFormHref = "#email-capture",
  className,
}: {
  primaryHref: string;
  /** Hash or path to the page that contains the newsletter signup (e.g. `#email-capture` or `/#email-capture`). */
  emailFormHref?: string;
  className?: string;
}) {
  return (
    <div className={["flex flex-col gap-3 sm:flex-row sm:items-center", className].filter(Boolean).join(" ")}>
      <ButtonLink href={primaryHref} className="text-sm">
        {CTA_VIEW_TOP_PROVIDERS}
      </ButtonLink>
      <ButtonLink href={emailFormHref} variant="secondary" className="text-sm">
        {CTA_NEWSLETTER_SHORT}
      </ButtonLink>
    </div>
  );
}

export default function CTASection({
  eyebrow,
  title,
  description,
  primaryHref,
  emailFormHref = "#email-capture",
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
    <section className="rounded-xl bg-accent p-6 text-white shadow-md md:p-8">
      {eyebrow ? <div className="text-xs font-semibold uppercase tracking-wide text-white/85">{eyebrow}</div> : null}
      <h2 className="mt-2 text-3xl font-bold tracking-tight text-white">{title}</h2>
      <p className="mt-3 text-sm leading-[1.65] text-white/95 md:text-base">{description}</p>
      <div className="mt-6">
        <SiteCTAButtons primaryHref={primaryHref} emailFormHref={emailFormHref} />
      </div>
      {secondary ? <div className="mt-4 text-sm text-white/90 sm:max-w-md">{secondary}</div> : null}
      {showDisclaimer ? (
        <p className="mt-4 text-xs leading-[1.65] text-white/85">{PROVIDER_INFO_DISCLAIMER}</p>
      ) : null}
    </section>
  );
}
