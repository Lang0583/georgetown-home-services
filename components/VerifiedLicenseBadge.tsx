import type { Provider } from "@/data/providers";
import {
  formatVerifiedLicenseDateLabel,
  verifiedLicenseInfo,
} from "@/lib/verified-license";

/**
 * Trust badge for a provider with a real license number in verified data.
 * Renders nothing when licenseNumber is empty/missing — never invents or shows "pending".
 */
export default function VerifiedLicenseBadge({
  provider,
  className = "",
}: {
  provider: Provider;
  className?: string;
}) {
  const info = verifiedLicenseInfo(provider);
  if (!info) return null;

  const dateLabel = info.licenseVerifiedDate
    ? formatVerifiedLicenseDateLabel(info.licenseVerifiedDate)
    : null;

  return (
    <div
      className={[
        "inline-flex max-w-full flex-col gap-0.5 rounded-md border border-verified/25 bg-verified/5 px-2.5 py-1.5 text-xs leading-snug text-verified",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      role="status"
      aria-label={`Verified license ${info.licenseNumber} with ${info.authority}`}
    >
      <span className="font-semibold tracking-tight">
        Verified license · {info.authority}
      </span>
      <span className="font-mono text-[11px] text-ink tabular-nums sm:text-xs">
        {info.licenseNumber}
        {info.licenseType ? (
          <span className="font-sans font-normal text-muted"> — {info.licenseType}</span>
        ) : null}
      </span>
      {dateLabel ? (
        <span className="font-normal text-muted">Checked {dateLabel}</span>
      ) : null}
    </div>
  );
}
