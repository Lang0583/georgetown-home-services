import { staticOgImage } from "../../../lib/og-image";

const og = staticOgImage({
  title: "Interactive Home Service Cost Estimator",
  category: "Pricing",
});

export const alt = og.alt;
export const size = og.size;
export const contentType = og.contentType;
export default og.Image;
