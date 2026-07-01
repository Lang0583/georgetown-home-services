import {
  formatLastUpdatedDisplay,
  formatLastUpdatedMonthYear,
  LAST_UPDATED_LINE_CLASS,
} from "../lib/last-updated";

type LastUpdatedProps = {
  /** ISO 8601 calendar date (YYYY-MM-DD). */
  lastUpdated: string;
  className?: string;
  /**
   * `default` — "Last updated: July 1, 2026" under page headings.
   * `trustBar` — "Updated July 2026" for compact homepage credibility strip.
   * `inline` — date only, for embedding in prose.
   */
  variant?: "default" | "trustBar" | "inline";
};

/**
 * Single on-page freshness label. Pass the page's `lastUpdated` ISO date from
 * frontmatter, site content, or a data file — never hardcode display strings.
 */
export default function LastUpdated({
  lastUpdated,
  className,
  variant = "default",
}: LastUpdatedProps) {
  const display =
    variant === "trustBar"
      ? formatLastUpdatedMonthYear(lastUpdated)
      : formatLastUpdatedDisplay(lastUpdated);

  if (variant === "inline") {
    return <span className={className}>{display}</span>;
  }

  if (variant === "trustBar") {
    return <span className={className}>{display}</span>;
  }

  return (
    <p className={className ?? LAST_UPDATED_LINE_CLASS}>
      Last updated: {display}
    </p>
  );
}
