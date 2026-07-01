import type { Provider } from "../data/providers";

function trimStr(s: string | undefined) {
  return (s ?? "").trim();
}

/** LocalBusiness JSON-LD for a single provider profile page. */
export function buildProviderLocalBusinessJsonLd(
  provider: Provider,
  pageUrl?: string,
): Record<string, unknown> {
  const item = localBusinessJsonLd(provider);
  if (pageUrl) item.url = pageUrl;
  return {
    "@context": "https://schema.org",
    ...item,
  };
}

function localBusinessJsonLd(provider: Provider): Record<string, unknown> {
  const locality = trimStr(provider.city) || "Georgetown";
  const region = trimStr(provider.state) || "TX";

  const addr: Record<string, unknown> = {
    "@type": "PostalAddress",
    addressLocality: locality,
    addressRegion: region,
    addressCountry: "US",
  };
  const street = trimStr(provider.address);
  if (street) addr.streetAddress = street;
  const zip = trimStr(provider.postalCode);
  if (zip) addr.postalCode = zip;

  const item: Record<string, unknown> = {
    "@type": "LocalBusiness",
    name: provider.name,
    telephone: provider.phone,
    address: addr,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: provider.rating.toFixed(1),
      reviewCount: String(provider.reviewCount),
    },
    areaServed: provider.serviceArea,
    description: provider.description,
  };

  if (provider.googleMapsUrl) item.url = provider.googleMapsUrl;

  return item;
}

/** ItemList JSON-LD with LocalBusiness entries for /best/[slug] provider cards. */
export function buildProviderItemListJsonLd(listName: string, providers: Provider[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: listName,
    itemListElement: providers.map((provider, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: localBusinessJsonLd(provider),
    })),
  };
}
