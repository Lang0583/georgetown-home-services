import Link from "next/link";
import {
  AUTHOR_BYLINE_PUBLISHER,
  AUTHOR_BYLINE_TAGLINE,
  AUTHOR_FIRST_NAME,
  AUTHOR_PROFILE_PATH,
} from "../lib/site-author";

type AuthorBylineProps = {
  /**
   * Optional ISO date strings. When provided, displayed alongside the byline
   * (e.g. "Updated April 26, 2026"). The visible date helps human readers
   * gauge freshness and complements the dateModified in Article schema.
   */
  datePublished?: string;
  dateModified?: string;
  /** Compact one-line variant (no tagline). Default false. */
  compact?: boolean;
  className?: string;
};

function formatLongDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00.000Z`);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(d);
}

function BylineAttribution() {
  return (
    <>
      By{" "}
      <Link
        href={AUTHOR_PROFILE_PATH}
        className="font-semibold text-ink underline-offset-4 hover:underline"
      >
        {AUTHOR_FIRST_NAME}
      </Link>
      {" | "}
      {AUTHOR_BYLINE_PUBLISHER}
    </>
  );
}

/**
 * Visible author byline rendered above article-style content. Pairs with the
 * Person schema in the page's JSON-LD; the visible byline is what Google's
 * quality system actually verifies, so a schema-only attribution is weaker.
 */
export default function AuthorByline({
  datePublished,
  dateModified,
  compact = false,
  className = "",
}: AuthorBylineProps) {
  const showUpdated = dateModified && dateModified !== datePublished;

  if (compact) {
    return (
      <p className={`text-sm text-muted ${className}`.trim()}>
        <BylineAttribution />
        {datePublished ? <> · {formatLongDate(datePublished)}</> : null}
        {showUpdated ? <> · Updated {formatLongDate(dateModified!)}</> : null}
      </p>
    );
  }

  return (
    <div className={`flex flex-col gap-1 text-sm text-muted ${className}`.trim()}>
      <p>
        <BylineAttribution />
        {datePublished ? <> · {formatLongDate(datePublished)}</> : null}
        {showUpdated ? <> · Updated {formatLongDate(dateModified!)}</> : null}
      </p>
      <p className="text-xs text-muted">{AUTHOR_BYLINE_TAGLINE}</p>
    </div>
  );
}
