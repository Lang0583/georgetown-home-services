import { ImageResponse } from "next/og";
import { OG_IMAGE_CONTENT_TYPE, OG_IMAGE_SIZE } from "./og-image-path";

export { OG_IMAGE_CONTENT_TYPE, OG_IMAGE_SIZE } from "./og-image-path";

const SITE_NAME = "Georgetown Home Services";
const SITE_DOMAIN = "georgetownhomeservices.com";
const BRAND_COLOR = "#01696F";
const FONT =
  "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

export type OgImageContent = {
  /** Primary headline shown on the card (page title). */
  title: string;
  /** Section label, e.g. "Best Of", "Blog", "Services". */
  category: string;
};

/** Truncate long titles so they fit the 1200×630 template. */
export function truncateOgTitle(title: string, max = 88): string {
  const s = title.trim();
  if (s.length <= max) return s;
  const cut = s.slice(0, max);
  const i = cut.lastIndexOf(" ");
  return `${(i > 40 ? cut.slice(0, i) : cut).trim()}…`;
}

export function ogImageAlt({ title }: Pick<OgImageContent, "title">): string {
  return `${title} | ${SITE_NAME}`;
}

/** Renders the branded social card template. */
export function createOgImageResponse({ title, category }: OgImageContent) {
  const displayTitle = truncateOgTitle(title);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          backgroundColor: BRAND_COLOR,
          color: "#FFFFFF",
          fontFamily: FONT,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 28,
            flex: 1,
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontSize: 26,
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              opacity: 0.9,
            }}
          >
            {category}
          </div>
          <div
            style={{
              fontSize: displayTitle.length > 60 ? 48 : 56,
              fontWeight: 700,
              lineHeight: 1.12,
              maxWidth: "100%",
            }}
          >
            {displayTitle}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            borderTop: "2px solid rgba(255,255,255,0.25)",
            paddingTop: 28,
          }}
        >
          <div style={{ fontSize: 28, fontWeight: 700 }}>{SITE_NAME}</div>
          <div style={{ fontSize: 22, fontWeight: 400, opacity: 0.92 }}>{SITE_DOMAIN}</div>
        </div>
      </div>
    ),
    { ...OG_IMAGE_SIZE },
  );
}

/** Factory for static route `opengraph-image.tsx` files. */
export function staticOgImage(content: OgImageContent) {
  return {
    alt: ogImageAlt(content),
    size: OG_IMAGE_SIZE,
    contentType: OG_IMAGE_CONTENT_TYPE,
    Image: () => createOgImageResponse(content),
  };
}
