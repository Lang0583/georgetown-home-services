import type { Business } from "../lib/businesses";
import { verifiedLicense } from "../lib/verified-license";

/**
 * Small trust badge shown on provider cards when — and only when — the provider has a real,
 * literal license number in the data (`licenseNumber`) AND belongs to a category with a mapped
 * state authority (plumbing → TSBPE, electrical/HVAC → TDLR, pest control → TDA SPCS).
 *
 * Renders `null` in every other case: no license number, blank license number, category without
 * a mapped state board, etc. This is the guard that keeps the site from ever publishing a
 * verification claim it can't back up in the source data.
 *
 * Design intent: credible, understated. Neutral slate palette + a small check glyph. Deliberately
 * NOT emerald or amber — those colors read like an ad or promo. This is documentation, not sales.
 */
export default function VerifiedLicenseBadge({
  business,
  className = "",
}: {
  business: Business;
  className?: string;
}) {
  const info = verifiedLicense(business);
  if (!info) return null;

  const authorityTitle = info.authorityUrl
    ? `${info.authorityLongName} — ${info.authorityUrl}`
    : info.authorityLongName;

  return (
    <div
      className={[
        "inline-flex items-center gap-2 rounded-md border border-slate-300 bg-slate-50 px-3 py-1.5",
        "text-xs leading-tight text-slate-800",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-label={`${info.authorityLongName} verified license`}
      title={authorityTitle}
    >
      <svg
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
        className="h-3.5 w-3.5 shrink-0 text-slate-700"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.71-9.29a1 1 0 00-1.42-1.42L9 10.59 7.71 9.29a1 1 0 10-1.42 1.42l2 2a1 1 0 001.42 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
      <span>
        <span className="font-semibold">{info.authority}</span>
        <span className="ml-1">License #{info.number}</span>
        {info.date ? <span className="ml-2 text-slate-600">Verified {info.date}</span> : null}
      </span>
    </div>
  );
}
