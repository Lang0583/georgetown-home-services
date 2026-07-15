import type { Business } from "../lib/businesses";
import { withVerifiedLicense } from "../lib/verified-license";

/**
 * Short editorial line explaining the license verification methodology in Matt's voice.
 *
 * Renders `null` when zero providers in the input list have a verified license — because
 * otherwise the page would claim a verification methodology while displaying no verified
 * providers, which would be a false trust signal. The moment at least one provider has a
 * populated `licenseNumber`, both the badges and this line appear together.
 */
export default function LicenseVerificationMethodology({
  businesses,
  className = "",
}: {
  businesses: readonly Business[];
  className?: string;
}) {
  const verified = withVerifiedLicense(businesses);
  if (!verified.length) return null;

  return (
    <aside
      className={[
        "rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm leading-relaxed text-slate-800",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-label="License verification methodology"
    >
      <p>
        Licenses were checked against the applicable Texas state boards
        {" — "}
        <span className="font-semibold">TSBPE</span> for plumbing,{" "}
        <span className="font-semibold">TDLR</span> for electrical and HVAC, and{" "}
        <span className="font-semibold">TDA SPCS</span> for pest control. Rechecked periodically;
        if you spot an expired or mismatched number, tell me and I&rsquo;ll re-verify.
      </p>
      <p className="mt-2 text-xs text-slate-600">&mdash; Matt, a Georgetown homeowner</p>
    </aside>
  );
}
