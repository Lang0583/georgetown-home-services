import JsonLd from "./JsonLd";
import { buildBlogHowToJsonLd } from "../lib/howto-schema";

type Props = {
  slug: string;
  pageUrl: string;
  /** Post title — fallback HowTo name when steps are inferred from HTML. */
  title?: string;
  /** Deck / meta description — HowTo description for HTML-extracted steps. */
  description?: string;
  /**
   * Generated article HTML (same source as on-page body). Enables HowTo extraction when
   * the post is not in `BLOG_HOWTO` but has a step-style H2 + list in markup.
   */
  html?: string | null;
};

/**
 * HowTo JSON-LD for instructional blog posts: curated slugs in `lib/howto-schema.ts`, or
 * auto-detected step lists (e.g. “How to winterize…”) from `html` when provided.
 */
export default function HowToSchema({ slug, pageUrl, title, description, html }: Props) {
  const data = buildBlogHowToJsonLd({ slug, pageUrl, title, description, html });
  if (!data) return null;
  return <JsonLd data={data} />;
}
