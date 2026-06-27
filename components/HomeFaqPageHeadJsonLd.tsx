import { headers } from "next/headers";
import { homeFaqPageJsonLd } from "../lib/home-page-faqs";

/** Homepage-only FAQPage JSON-LD in document `<head>`. */
export default async function HomeFaqPageHeadJsonLd() {
  const pathname = (await headers()).get("x-pathname") ?? "";
  if (pathname !== "/") return null;

  const data = homeFaqPageJsonLd();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
