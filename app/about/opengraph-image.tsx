import { staticOgImage } from "../../lib/og-image";

const og = staticOgImage({
  title: "About Georgetown Home Services",
  category: "About",
});

export const alt = og.alt;
export const size = og.size;
export const contentType = og.contentType;
export default og.Image;
