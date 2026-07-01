import { staticOgImage } from "../../lib/og-image";

const og = staticOgImage({
  title: "Contact Georgetown Home Services",
  category: "Contact",
});

export const alt = og.alt;
export const size = og.size;
export const contentType = og.contentType;
export default og.Image;
