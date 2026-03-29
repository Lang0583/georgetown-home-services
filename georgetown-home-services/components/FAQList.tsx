import type { Faq } from "../lib/site-content";

export default function FAQList({ faqs }: { faqs: Faq[] }) {
  if (!faqs.length) return null;

  return (
    <div className="mt-12 rounded-xl border border-gray-200 bg-white p-6 shadow-md md:p-8">
      <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Frequently Asked Questions</h2>
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

