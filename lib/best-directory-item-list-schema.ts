import type { Business } from "./businesses";
import { getBusinessWebsiteUrl, hasBusinessRatingData } from "./businesses";

function trimStr(s: string | undefined) {
  return (s ?? "").trim();
}

function homeAndConstructionBusinessJsonLd(b: Business): Record<string, unknown> {
  const locality = trimStr(b.city) || "Georgetown";
  const region = trimStr(b.state) || "TX";
  const addr: Record<string, unknown> = {
    "@type": "PostalAddress",
    addressLocality: locality,
    addressRegion: region,
    addressCountry: "US",
  };
  const street = trimStr(b.address);
  if (street) addr.streetAddress = street;
  const zip = trimStr(b.postal_code);
  if (zip) addr.postalCode = zip;

  const item: Record<string, unknown> = {
    "@type": "HomeAndConstructionBusiness",
    name: b.name,
    address: addr,
  };

  const web = getBusinessWebsiteUrl(b);
  if (web) item.url = web;

  const phone = trimStr(b.phone);
  if (phone) item.telephone = phone;

  if (hasBusinessRatingData(b)) {
    item.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: b.rating.toFixed(1),
      reviewCount: String(b.reviews),
    };
  }

  return item;
}

/** ItemList JSON-LD for /best/[slug] directory pages (matches on-page listing data). */
export function buildBestDirectoryItemListJsonLd(listName: string, businesses: Business[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: listName,
    itemListElement: businesses.map((b, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: homeAndConstructionBusinessJsonLd(b),
    })),
  };
}
