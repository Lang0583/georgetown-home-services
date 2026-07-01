import { staticOgImage } from "../../lib/og-image";

const og = staticOgImage({
  title: "Privacy Policy",
  category: "Legal",
});

export const alt = og.alt;
export const size = og.size;
export const contentType = og.contentType;
export default og.Image;
