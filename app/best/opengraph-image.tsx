import { staticOgImage } from "../../lib/og-image";

const og = staticOgImage({
  title: "Top Home Service Companies in Georgetown, TX",
  category: "Best Of",
});

export const alt = og.alt;
export const size = og.size;
export const contentType = og.contentType;
export default og.Image;
