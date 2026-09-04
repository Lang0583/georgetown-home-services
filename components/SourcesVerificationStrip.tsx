import Link from "next/link";
import {
  LISTING_DATA_SOURCES,
  LISTING_METHODOLOGY_PATH,
  LISTINGS_REVIEW_CADENCE_SUMMARY,
  listingLicenseVerificationNote,
} from "@/lib/listing-methodology";
import { PROVIDERS_LAST_VERIFIED } from "@/data/providers";

const BOARD_LINKS = [
  { name: "TSBPE (plumbing)", href: "https://tsbpe.texas.gov/" },
  { name: "TDLR (electrical / HVAC)", href: "https://www.tdlr.texas.gov/" },
  {
    name: "TDA SPCS (pest control)",
    href: "https://www.texasagriculture.gov/Regulatory-Programs/Pesticides/Structural-Pest-Control-Service",
  },
] as const;

type Props = {
  className?: string;
  /** Show shorter copy on dense directory pages. */
  compact?: boolean;
};

/**
 * Inline sources / verification strip for Best Of, providers, and cost pages.
 * Links primary Texas boards + methodology so AI engines can attribute claims.
 */
export default function SourcesVerificationStrip({ className = "", compact = false }: Props) {
  return (
    <aside
      className={[
        "mt-10 max-w-3xl rounded-xl border border-ink/10 bg-surface-alt p-5 text-sm leading-relaxed text-muted",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-labelledby="sources-verification-heading"
    >
      <h2 id="sources-verification-heading" className="font-display text-base font-semibold text-ink">
        Sources & verification
      </h2>
      <p className="mt-2">
        Directory ratings and review counts come from public Google Business profiles (last batch{" "}
        {PROVIDERS_LAST_VERIFIED}). License numbers shown on cards were checked against public Texas
        registries where the trade is state-licensed.
      </p>
      {!compact ? (
        <p className="mt-2">{listingLicenseVerificationNote()}</p>
      ) : null}
      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
        {BOARD_LINKS.map((b) => (
          <li key={b.href}>
            <a
              href={b.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand hover:underline"
            >
              {b.name}
            </a>
          </li>
        ))}
      </ul>
      {!compact ? (
        <ul className="mt-3 list-disc space-y-1 pl-5">
          {LISTING_DATA_SOURCES.slice(0, 2).map((s) => (
            <li key={s.name}>
              <span className="font-semibold text-ink">{s.name}</span>
            </li>
          ))}
        </ul>
      ) : null}
      <p className="mt-3">
        <Link href={LISTING_METHODOLOGY_PATH} className="font-semibold text-brand hover:underline">
          Full listing methodology
        </Link>
        {" · "}
        <Link
          href="/reports/williamson-county-license-check"
          className="font-semibold text-brand hover:underline"
        >
          Williamson County license check report
        </Link>
      </p>
      {!compact ? <p className="mt-2 text-xs">{LISTINGS_REVIEW_CADENCE_SUMMARY}</p> : null}
    </aside>
  );
}
