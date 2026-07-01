import { staticOgImage } from "../../../lib/og-image";

const og = staticOgImage({
  title: "Cole Reinhardt, Founding Editor",
  category: "Authors",
});

export const alt = og.alt;
export const size = og.size;
export const contentType = og.contentType;
export default og.Image;
