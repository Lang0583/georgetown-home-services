/** Build a Google Maps embed iframe URL from a Maps search link or fallback query. */
export function googleMapsEmbedUrl(mapsSearchUrl: string, fallbackQuery: string): string {
  let query = fallbackQuery;
  try {
    const url = new URL(mapsSearchUrl);
    query = url.searchParams.get("query") || fallbackQuery;
  } catch {
    /* use fallback */
  }
  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&t=&z=14&ie=UTF8&iwloc=&output=embed`;
}
