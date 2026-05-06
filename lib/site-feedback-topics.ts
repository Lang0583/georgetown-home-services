/** Allowed `topic` values for POST `/api/site-feedback` — keep in sync with `SiteFeedbackForm`. */
export const SITE_FEEDBACK_TOPICS = [
  { value: "correction", label: "Correct outdated or wrong information" },
  { value: "improvement", label: "Suggest how we can improve the site" },
  { value: "listing", label: "Question about a provider or listing" },
  { value: "partnership-other", label: "Partnership, press, or something else" },
] as const;

export type SiteFeedbackTopicValue = (typeof SITE_FEEDBACK_TOPICS)[number]["value"];

const TOPIC_SET: ReadonlySet<string> = new Set(SITE_FEEDBACK_TOPICS.map((t) => t.value));

export function isSiteFeedbackTopic(value: string): value is SiteFeedbackTopicValue {
  return TOPIC_SET.has(value);
}
