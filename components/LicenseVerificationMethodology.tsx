import type { Provider } from "@/data/providers";
import { AUTHOR_BYLINE } from "@/lib/site-author";
import { verifiedLicenseInfo } from "@/lib/verified-license";

/**
 * Short editorial note near provider lists when at least one card has a real license number.
 * Renders nothing when the list has no license data to surface.
 */
export default function LicenseVerificationMethodology({
  providers,
  className = "",
}: {
  providers: readonly Provider[];
  className?: string;
}) {
  const hasAnyVerified = providers.some((p) => verifiedLicenseInfo(p) != null);
  if (!hasAnyVerified) return null;

  return (
    <p
      className={[
        "max-w-3xl text-sm leading-relaxed text-muted",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      Where a license badge appears, I checked that number against the public Texas boards — TSBPE
      for plumbing, TDLR for electrical and HVAC, and TDA SPCS for pest control. Trades Texas does
      not license at the state level (roofing, landscaping, foundation, cleaning) will not show a
      badge. Always confirm current status yourself before hiring. — {AUTHOR_BYLINE}.
    </p>
  );
}
