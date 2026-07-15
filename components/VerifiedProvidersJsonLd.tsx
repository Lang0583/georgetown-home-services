import type { Business } from "../lib/businesses";
import { buildVerifiedProvidersItemListJsonLd } from "../lib/verified-license";
import JsonLd from "./JsonLd";

/**
 * Emits a schema.org `ItemList` of `LocalBusiness` entries — each with `hasCredential` populated
 * from the provider's verified state license — for every provider in `businesses` that has a
 * real, populated `licenseNumber` in the data.
 *
 * Providers without a license number, or in categories without a mapped state authority, are
 * silently excluded. When ZERO providers in the input list are verified, this component renders
 * nothing at all (no empty `ItemList`, no stub schema block).
 */
export default function VerifiedProvidersJsonLd({
  businesses,
}: {
  businesses: readonly Business[];
}) {
  const data = buildVerifiedProvidersItemListJsonLd(businesses);
  if (!data) return null;
  return <JsonLd data={data} />;
}
