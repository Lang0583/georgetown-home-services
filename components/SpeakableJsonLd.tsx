import JsonLd from "@/components/JsonLd";
import { buildSpeakableSchema } from "@/lib/schema";

const DEFAULT_SELECTORS = [".speakable-answer", "#key-takeaways-heading"];

/** Emits SpeakableSpecification JSON-LD for pages that render KeyTakeaways with speakable. */
export default function SpeakableJsonLd({
  cssSelectors = DEFAULT_SELECTORS,
}: {
  cssSelectors?: string[];
}) {
  const data = buildSpeakableSchema(cssSelectors);
  if (!data) return null;
  return <JsonLd data={data} />;
}
