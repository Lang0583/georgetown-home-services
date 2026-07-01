import { staticOgImage } from "../../lib/og-image";

const og = staticOgImage({
  title: "Home Service Cost Guides for Georgetown, TX",
  category: "Cost Guides",
});

export const alt = og.alt;
export const size = og.size;
export const contentType = og.contentType;
export default og.Image;
