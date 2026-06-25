import AffiliateTrackedAnchor from "./AffiliateTrackedAnchor";
import { AFFILIATE_GEORGETOWN_URLS } from "../lib/affiliate-config";

type AffiliateCTAProps = {
  /**
   * GA4 `placement` parameter so each instance is attributable in analytics.
   * Examples: "service-guide-top", "service-guide-bottom", "best-bottom", "home-bottom".
   */
  placement: string;
  /** Optional override for the card heading. */
  heading?: string;
  /** Optional override for the subtext directly under the heading. */
  subtext?: string;
  /** Extra Tailwind classes appended to the outer wrapper. */
  className?: string;
};

type PartnerConfig = {
  id: "angi" | "thumbtack" | "homeadvisor";
  label: string;
  href: string;
  /** Solid background hex — chosen for WCAG AA contrast against white button text. */
  bgClass: string;
  /** Hover background hex — same hue, ~10% darker for tactile feedback. */
  hoverClass: string;
};

/**
 * Three partners shown side-by-side on md+ and stacked on mobile. The hex
 * values are tuned for AA contrast with white button text:
 * - Angi #b91c1c (red-700) → white = 6.07:1
 * - Thumbtack #1e3a8a (blue-800, dark navy) → white = 10.36:1
 * - HomeAdvisor #15803d (green-700) → white = 5.14:1
 */
const PARTNERS: readonly PartnerConfig[] = [
  {
    id: "angi",
    label: "Get Quotes on Angi",
    href: AFFILIATE_GEORGETOWN_URLS.angi,
    bgClass: "bg-[#b91c1c]",
    hoverClass: "hover:bg-[#991b1b]",
  },
  {
    id: "thumbtack",
    label: "Get Quotes on Thumbtack",
    href: AFFILIATE_GEORGETOWN_URLS.thumbtack,
    bgClass: "bg-[#1e3a8a]",
    hoverClass: "hover:bg-[#172554]",
  },
  {
    id: "homeadvisor",
    label: "Get Quotes on HomeAdvisor",
    href: AFFILIATE_GEORGETOWN_URLS.homeadvisor,
    bgClass: "bg-[#15803d]",
    hoverClass: "hover:bg-[#166534]",
  },
];

const DEFAULT_HEADING = "Get Free Quotes from Georgetown Contractors";
const DEFAULT_SUBTEXT = "Compare bids from local pros — no obligation, no spam.";
const DISCLAIMER =
  "These are affiliate links. We may earn a commission if you request a quote.";

/**
 * Three-partner quote-request CTA card. Renders one heading, one subtext,
 * three brand-colored buttons (stacked on mobile, side-by-side at sm+),
 * and one affiliate disclaimer. All outbound links are nofollow + sponsored
 * and open in a new tab.
 *
 * Per-button GA4 `affiliate_click` events fire via `AffiliateTrackedAnchor`
 * so placement attribution works automatically — pass a unique `placement`
 * for each instance (e.g. "service-guide-top" vs "service-guide-bottom").
 */
export default function AffiliateCTA({
  placement,
  heading = DEFAULT_HEADING,
  subtext = DEFAULT_SUBTEXT,
  className = "",
}: AffiliateCTAProps) {
  return (
    <aside
      className={[
        "rounded-2xl border border-gray-200 bg-white p-6 shadow-md md:p-8",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-label="Get free quotes from Georgetown contractors"
    >
      <h2 className="text-2xl font-semibold tracking-tight text-gray-900 md:text-3xl">
        {heading}
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#4b5563] md:text-base">
        {subtext}
      </p>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        {PARTNERS.map((p) => (
          <AffiliateTrackedAnchor
            key={p.id}
            href={p.href}
            affiliate={p.id}
            placement={placement}
            className={[
              "inline-flex flex-1 items-center justify-center rounded-lg px-5 py-3",
              "min-h-12 text-sm font-semibold text-white shadow-sm transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
              "focus-visible:ring-[#374151]",
              p.bgClass,
              p.hoverClass,
              "sm:min-w-[12rem]",
            ].join(" ")}
          >
            {p.label}
          </AffiliateTrackedAnchor>
        ))}
      </div>

      <p className="mt-4 text-xs leading-relaxed text-[#6b7280]">{DISCLAIMER}</p>
    </aside>
  );
}
