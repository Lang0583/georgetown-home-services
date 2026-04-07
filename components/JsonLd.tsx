import type { ReactElement } from "react";

/**
 * Minimal JSON-LD helper for consistent structured data rendering.
 * Keep data accurate: this site is a directory/editorial resource (not a contractor).
 */
export default function JsonLd({ data }: { data: unknown }): ReactElement {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

