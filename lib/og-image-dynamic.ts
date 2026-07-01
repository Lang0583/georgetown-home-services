import {
  createOgImageResponse,
  ogImageAlt,
  OG_IMAGE_CONTENT_TYPE,
  OG_IMAGE_SIZE,
  type OgImageContent,
} from "./og-image";

const FALLBACK: OgImageContent = {
  title: "Georgetown TX Home Services Directory",
  category: "Home",
};

/** Shared exports for dynamic `opengraph-image.tsx` route files. */
export function dynamicOgImageExports(
  content: OgImageContent | null,
  fallback: OgImageContent = FALLBACK,
) {
  const resolved = content ?? fallback;
  return {
    alt: ogImageAlt(resolved),
    size: OG_IMAGE_SIZE,
    contentType: OG_IMAGE_CONTENT_TYPE,
    Image: () => createOgImageResponse(resolved),
  };
}
