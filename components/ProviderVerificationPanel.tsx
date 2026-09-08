import Link from "next/link";
import type { LicensedProvider } from "@/lib/providers";
import {
  ENDORSEMENT_PLAIN,
  displayableEndorsements,
  formatVerifiedOnPlain,
  licenseRankLabel,
  nonEmpty,
} from "@/lib/providers";

/**
 * License and insurance verification panel for TSBPE backed provider pages.
 * Renders only facts present on the record. No badge when insurance is expired.
 */
export default function ProviderVerificationPanel({ provider }: { provider: LicensedProvider }) {
  const verifiedOnLabel = formatVerifiedOnPlain(provider.verifiedOn);
  const rankLabel = licenseRankLabel(provider.licenseRank);
  const carrier = nonEmpty(provider.insuranceCarrier);
  const registryName = nonEmpty(provider.sourceRegistry) ?? "Texas State Board of Plumbing Examiners";
  const sourceUrl = nonEmpty(provider.sourceUrl);
  const licenseCurrent = provider.licenseStatus.trim().toLowerCase() === "current";

  const registryLink = sourceUrl ? (
    <a
      href={sourceUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="font-semibold text-brand underline underline-offset-2 hover:text-brand"
    >
      {registryName}
    </a>
  ) : (
    <span className="font-semibold text-ink">{registryName}</span>
  );

  if (provider.verified && provider.insuranceCurrent) {
    return (
      <section
        className="mt-8 rounded-xl border border-brand/25 bg-brand/5 p-5"
        aria-labelledby="verification-heading"
      >
        <h2 id="verification-heading" className="font-display text-lg font-semibold text-ink">
          License verification
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          License {provider.licenseNumber} is listed as {rankLabel} rank and current with the{" "}
          {registryLink}.
          {carrier ? (
            <>
              {" "}
              Insurance on file is with {carrier} and that coverage is current.
            </>
          ) : null}{" "}
          Checked {verifiedOnLabel}.
        </p>
        <ul className="mt-4 space-y-1 text-sm text-ink">
          <li>
            <span className="text-muted">License number:</span> {provider.licenseNumber}
          </li>
          <li>
            <span className="text-muted">License rank:</span> {rankLabel}
          </li>
          <li>
            <span className="text-muted">License status:</span>{" "}
            {licenseCurrent ? "Current" : provider.licenseStatus}
          </li>
          {carrier ? (
            <li>
              <span className="text-muted">Insurance carrier:</span> {carrier} (current)
            </li>
          ) : null}
          <li>
            <span className="text-muted">Checked:</span> {verifiedOnLabel}
          </li>
        </ul>
      </section>
    );
  }

  // Insurance expired: list the provider, keep license facts, no badge language.
  return (
    <section
      className="mt-8 rounded-xl border border-ink/15 bg-surface p-5"
      aria-labelledby="verification-heading"
    >
      <h2 id="verification-heading" className="font-display text-lg font-semibold text-ink">
        License verification
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        License {provider.licenseNumber} is listed as {rankLabel} rank and{" "}
        {licenseCurrent ? "current" : provider.licenseStatus.toLowerCase()} with the {registryLink}.
        The insurance certificate on file with the state has expired
        {nonEmpty(provider.insuranceExpires) ? ` (listed expiration ${provider.insuranceExpires})` : ""}.
        Checked {verifiedOnLabel}.
      </p>
      <ul className="mt-4 space-y-1 text-sm text-ink">
        <li>
          <span className="text-muted">License number:</span> {provider.licenseNumber}
        </li>
        <li>
          <span className="text-muted">License rank:</span> {rankLabel}
        </li>
        <li>
          <span className="text-muted">License status:</span>{" "}
          {licenseCurrent ? "Current" : provider.licenseStatus}
        </li>
        <li>
          <span className="text-muted">Insurance:</span> Certificate on file with the state has expired
        </li>
        <li>
          <span className="text-muted">Checked:</span> {verifiedOnLabel}
        </li>
      </ul>
    </section>
  );
}

export function ProviderEndorsementsList({ provider }: { provider: LicensedProvider }) {
  const items = displayableEndorsements(provider).map((raw) => ({
    raw,
    ...(ENDORSEMENT_PLAIN[raw] ?? {
      label: raw,
      meaning: "This is a specialty endorsement listed on the state plumbing license record.",
    }),
  }));

  if (!items.length) return null;

  return (
    <section className="mt-8" aria-labelledby="endorsements-heading">
      <h2 id="endorsements-heading" className="font-display text-lg font-semibold text-ink">
        License endorsements
      </h2>
      <ul className="mt-4 space-y-4">
        {items.map((item) => (
          <li key={item.raw} className="rounded-xl border border-ink/10 bg-surface p-4">
            <p className="text-sm font-semibold text-ink">{item.label}</p>
            <p className="mt-1 text-sm leading-relaxed text-muted">{item.meaning}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ProviderDirectoryLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className="font-semibold text-brand hover:underline">
      {children}
    </Link>
  );
}
