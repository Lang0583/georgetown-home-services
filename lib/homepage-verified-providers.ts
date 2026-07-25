import { PROVIDERS, type Provider } from "@/data/providers";
import { verifiedLicenseInfo } from "@/lib/verified-license";

function isLicenseVerified(provider: Provider): boolean {
  return verifiedLicenseInfo(provider) != null;
}

/**
 * Homepage shortlist: only providers that can show a license line
 * (licenseNumber + licenseVerifiedDate both present). Sorted by rating desc, then name.
 */
export function getHomepageVerifiedProviders(limit = 6): Provider[] {
  const licensed = PROVIDERS.filter(isLicenseVerified);
  const sorted = [...licensed].sort((a, b) => {
    const aRating = typeof a.rating === "number" && Number.isFinite(a.rating) ? a.rating : -1;
    const bRating = typeof b.rating === "number" && Number.isFinite(b.rating) ? b.rating : -1;
    if (bRating !== aRating) return bRating - aRating;

    return a.name.localeCompare(b.name, "en");
  });

  return sorted.slice(0, Math.max(0, limit));
}
