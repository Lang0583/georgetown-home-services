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
        <h2 className="text-3xl font-semibold tracking-tight text-gray-900">{heading}</h2>
        <div className="mt-6 flex flex-col gap-5">
          {faqs.map((faq, idx) => (
            <div key={idx}>
              <h3 className="text-base font-bold leading-snug text-gray-900">{faq.q}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={["mt-12 rounded-xl border border-gray-200 bg-white p-6 shadow-md md:p-8", className].filter(Boolean).join(" ")}>
      <h2 className="text-2xl font-semibold tracking-tight text-gray-900">{heading}</h2>
      <div className="mt-8 flex flex-col gap-6">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="rounded-lg border border-gray-200 bg-gray-50 p-5 md:p-6"
          >
            <div className="text-base font-semibold leading-snug text-gray-900">{faq.q}</div>
            <div className="mt-4 text-sm leading-relaxed text-gray-700">{faq.a}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

