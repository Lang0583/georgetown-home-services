/** Path segment for file-based Open Graph images (`opengraph-image.tsx`). */
export function openGraphImagePathname(pagePathname: string): string {
  const normalized =
    pagePathname === "/"
      ? ""
      : pagePathname.endsWith("/")
        ? pagePathname.slice(0, -1)
        : pagePathname;
  return `${normalized}/opengraph-image`;
}

export const OG_IMAGE_SIZE = { width: 1200, height: 630 } as const;
export const OG_IMAGE_CONTENT_TYPE = "image/png";
