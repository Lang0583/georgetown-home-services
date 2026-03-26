import type { Faq } from "../lib/site-content";

export default function FAQList({ faqs }: { faqs: Faq[] }) {
  if (!faqs.length) return null;

  return (
    <div className="mt-10 rounded-2xl border border-black/10 bg-white p-6 md:p-8">
      <h2 className="text-xl font-semibold text-zinc-900">Frequently Asked Questions</h2>
      <div className="mt-5 space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="rounded-xl border border-black/5 p-4">
            <div className="text-sm font-semibold text-zinc-900">{faq.q}</div>
            <div className="mt-2 text-sm text-zinc-700">{faq.a}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

