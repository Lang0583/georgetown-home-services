import type { Provider as DirectoryProvider } from "../data/providers";
import type { Provider as LegacyProvider } from "./providers";
import { assertNoHostedReviewSchema, validateItemListSchema } from "./structured-data-validate";

export type RankedProviderListItem = {
  name: string;
  url: string;
};

function trimStr(s: string | undefined) {
  return (s ?? "").trim();
}

/** Map on-page provider rows to ranked list items (position follows array order). */
export function rankedProvidersFromDirectory(providers: DirectoryProvider[]): RankedProviderListItem[] {
  return providers
    .map((p) => ({ name: trimStr(p.name), url: trimStr(p.googleMapsUrl) }))
    .filter((p) => p.name && p.url);
}

export function rankedProvidersFromLegacy(providers: LegacyProvider[]): RankedProviderListItem[] {
  return providers
    .map((p) => ({ name: trimStr(p.name), url: trimStr(p.websiteUrl) }))
    .filter((p) => p.name && p.url);
}

/**
 * ItemList JSON-LD for `/best/[slug]` ranked providers.
 * Uses position, name, and url only — no Review or third-party aggregateRating.
 */
export function buildProviderItemListJsonLd(listName: string, providers: RankedProviderListItem[]) {
  const data = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: listName,
    itemListElement: providers.map((provider, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: provider.name,
      item: {
        "@type": "Thing",
        name: provider.name,
        url: provider.url,
      },
    })),
  };
  validateItemListSchema(data);
  assertNoHostedReviewSchema(data);
  return data;
}
