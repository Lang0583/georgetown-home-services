"use client";

import { trackAffiliateCtaClick } from "../lib/analytics";
import { AFFILIATE_CTA_HOMEADVISOR_URL } from "../lib/affiliates";

const btnClass =
  "btn-accent inline-flex min-h-11 flex-1 items-center justify-center rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-accent-hover sm:flex-none";

interface AffiliateCTAProps {
  angiCategorySlug?: string;
  thumbtackCategory?: string;
  serviceLabel?: string;
  heading?: string;
}

export default function AffiliateCTA({
  angiCategorySlug,
  thumbtackCategory,
  serviceLabel,
  heading = "Compare Free Quotes from Georgetown Contractors",
}: AffiliateCTAProps = {}) {
  const affiliateLinks = [
    {
      href: angiCategorySlug
        ? `https://www.angi.com/companylist/us/tx/georgetown/${angiCategorySlug}.htm`
        : "https://www.angi.com/companylist/us/tx/georgetown/home-services-contractors.htm",
      label: "Get Quotes on Angi",
      affiliateName: "Angi",
    },
    {
      href: thumbtackCategory
        ? `https://www.thumbtack.com/tx/georgetown/${thumbtackCategory}`
        : "https://www.thumbtack.com/tx/georgetown/",
      label: "Find Pros on Thumbtack",
      affiliateName: "Thumbtack",
    },
    { href: AFFILIATE_CTA_HOMEADVISOR_URL, label: "Browse HomeAdvisor", affiliateName: "HomeAdvisor" },
  ] as const;

  return (
    <section
      className="not-prose mt-12 rounded-2xl border border-ink/10 bg-surface-alt p-6 md:p-8"
      aria-label="Compare free quotes from Georgetown contractors"
    >
      <h2 className="text-xl font-semibold tracking-tight text-ink md:text-2xl">{heading}</h2>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        {affiliateLinks.map(({ href, label, affiliateName }) => (
          <a
            key={affiliateName}
            href={href}
            target="_blank"
            rel="nofollow sponsored"
            className={btnClass}
            onClick={() => trackAffiliateCtaClick(affiliateName)}
          >
            {label}
          </a>
        ))}
      </div>
      <p className="mt-4 text-xs leading-relaxed text-muted">
        These are affiliate links. We may earn a commission if you use them — it doesn&apos;t affect our rankings or
        editorial content.
      </p>
    </section>
  );
}
