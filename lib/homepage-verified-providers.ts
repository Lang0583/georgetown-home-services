import { PROVIDERS, type Provider } from "@/data/providers";
import { verifiedLicenseInfo } from "@/lib/verified-license";

function isLicenseVerified(provider: Provider): boolean {
  return verifiedLicenseInfo(provider) != null;
}

/**
 * Deterministic homepage shortlist from existing verified provider data.
 * Order: license-verified first, then rating (desc), then name (asc).
 * No invented “top rated this week” or other recency signal.
 */
export function getHomepageVerifiedProviders(limit = 6): Provider[] {
  const sorted = [...PROVIDERS].sort((a, b) => {
    const aLicensed = isLicenseVerified(a) ? 1 : 0;
    const bLicensed = isLicenseVerified(b) ? 1 : 0;
    if (bLicensed !== aLicensed) return bLicensed - aLicensed;

    const aRating = typeof a.rating === "number" && Number.isFinite(a.rating) ? a.rating : -1;
    const bRating = typeof b.rating === "number" && Number.isFinite(b.rating) ? b.rating : -1;
    if (bRating !== aRating) return bRating - aRating;

    return a.name.localeCompare(b.name, "en");
  });

  return sorted.slice(0, Math.max(0, limit));
}
