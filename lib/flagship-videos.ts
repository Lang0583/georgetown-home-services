/**
 * Curated third-party YouTube embeds for flagship pages + matching VideoObject JSON-LD.
 * Replace `youtubeId` / `uploadDate` if you swap videos; keep titles aligned with the actual clip.
 */
export type FlagshipVideoDef = {
  youtubeId: string;
  title: string;
  description: string;
  /** ISO 8601 — approximate to the source publish date when known. */
  uploadDate: string;
};

export const FLAGSHIP_VIDEO_HAIL_WILLIAMSON_BLOG: FlagshipVideoDef = {
  youtubeId: "6FJhbgcmFCI",
  title: "How to spot hail damage on your roof (homeowner tips)",
  description:
    "Educational overview of common hail signatures on shingles and soft metals—useful context for Georgetown-area homeowners after spring storms. Video is embedded from YouTube for convenience; always prioritize safety and a licensed inspection for claim or repair decisions.",
  uploadDate: "2023-05-18T12:00:00+00:00",
};

export const FLAGSHIP_VIDEO_ROOFING_HUB: FlagshipVideoDef = {
  youtubeId: "IXhXa4e-pVQ",
  title: "How to inspect a roof for hail damage (walkthrough-style checklist)",
  description:
    "Practical hail-inspection concepts homeowners can use from the ladder or ground when documenting damage—pairs with Georgetown Home Services roofing guides and directory pages.",
  uploadDate: "2021-06-08T12:00:00+00:00",
};

export const FLAGSHIP_VIDEO_BEST_ROOFERS: FlagshipVideoDef = {
  youtubeId: "plWgBm8aQo8",
  title: "What roof hail damage can look like (examples before you call a roofer)",
  description:
    "Visual examples of hail-related roof wear—helpful before you shortlist Georgetown roofers or read written scopes. Third-party YouTube embed for homeowner education only.",
  uploadDate: "2023-08-22T12:00:00+00:00",
};

const SITE_PUBLISHER = "Georgetown Home Services";

/** Schema.org VideoObject for rich-result eligibility (not guaranteed). */
export function flagshipVideoObjectJsonLd(
  siteUrl: string,
  pageCanonicalUrl: string,
  def: FlagshipVideoDef,
): Record<string, unknown> {
  const embedUrl = `https://www.youtube-nocookie.com/embed/${def.youtubeId}`;
  const thumbnailUrl = `https://i.ytimg.com/vi/${def.youtubeId}/hqdefault.jpg`;

  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: def.title,
    description: def.description,
    thumbnailUrl: [thumbnailUrl],
    uploadDate: def.uploadDate,
    embedUrl,
    url: pageCanonicalUrl,
    publisher: {
      "@type": "Organization",
      name: SITE_PUBLISHER,
      url: siteUrl.replace(/\/$/, ""),
    },
  };
}
