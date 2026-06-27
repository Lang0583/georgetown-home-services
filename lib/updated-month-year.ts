/** Visible freshness label: "Updated June 2026" */
export function formatUpdatedMonthYear(date: Date = new Date()): string {
  const month = date.toLocaleString("en-US", { month: "long" });
  return `Updated ${month} ${date.getFullYear()}`;
}
