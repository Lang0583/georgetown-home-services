import type { Faq } from "../lib/site-content";

type FAQListProps = {
  faqs: Faq[];
  /** Bordered cards (default) or compact plain list (e.g. homepage). */
  variant?: "bordered" | "plain";
  /** Overrides default "Frequently Asked Questions" heading. */
  title?: string;
  /** Omit outer top margin when embedding inside a parent section. */
  className?: string;
};

export default function FAQList({ faqs, variant = "bordered", title, className = "" }: FAQListProps) {
  if (!faqs.length) return null;

  const heading = title ?? "Frequently Asked Questions";

  if (variant === "plain") {
    return (
      <div className={className}>
        <h2 className="text-3xl font-semibold tracking-tight text-ink">{heading}</h2>
        <div className="mt-6 flex flex-col gap-5">
          {faqs.map((faq, idx) => (
            <div key={idx}>
              <h3 className="text-base font-bold leading-snug text-ink">{faq.q}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={["mt-12 rounded-xl border border-ink/10 bg-surface p-6 shadow-md md:p-8", className].filter(Boolean).join(" ")}>
      <h2 className="text-2xl font-semibold tracking-tight text-ink">{heading}</h2>
      <div className="mt-8 flex flex-col gap-6">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="rounded-lg border border-ink/10 bg-surface-alt p-5 md:p-6"
          >
            <div className="text-base font-semibold leading-snug text-ink">{faq.q}</div>
            <div className="mt-4 text-sm leading-relaxed text-muted">{faq.a}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

