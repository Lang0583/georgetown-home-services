function IconSearch({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.75" />
      <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

function IconStar({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 2l2.4 7.4h7.8l-6.3 4.6 2.4 7.4L12 16.9l-6.3 4.5 2.4-7.4L2 9.4h7.8L12 2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconPhone({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M3 5a2 2 0 0 1 2-2h3.28a1 1 0 0 1 .948.684l1.498 4.493a1 1 0 0 1-.502 1.21l-2.257 1.13a11.042 11.042 0 0 0 5.516 5.516l1.13-2.257a1 1 0 0 1 1.21-.502l4.493 1.498a1 1 0 0 1 .684.949V19a2 2 0 0 1-2 2h-1C9.716 21 3 14.284 3 6V5Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const STEPS = [
  {
    Icon: IconSearch,
    heading: "Step 1 — Find Your Service",
    copy: "Browse by category or neighborhood to find exactly what you need — plumbing, HVAC, roofing, electrical, and more.",
  },
  {
    Icon: IconStar,
    heading: "Step 2 — Compare Local Options",
    copy: "Read verified reviews, check pricing ranges, and see which companies serve your part of Georgetown.",
  },
  {
    Icon: IconPhone,
    heading: "Step 3 — Reach Out Directly",
    copy: "Call or visit providers directly — no middleman, no lead forms, no spam. Just the best local options, already vetted for you.",
  },
] as const;

export default function HomeHowItWorks() {
  return (
    <div
      className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-md sm:p-8"
      aria-labelledby="how-it-works-heading"
    >
      <h2 id="how-it-works-heading" className="text-xl font-semibold tracking-tight text-gray-900">
        How it works
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-700">
        These guides walk you through finding the right trade, comparing local companies with real data, and reaching out when
        you&apos;re ready—no pass-through, no noise.
      </p>
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
        {STEPS.map(({ Icon, heading, copy }) => (
          <div key={heading} className="rounded-lg border border-gray-100 bg-gray-50 p-4">
            <div className="flex gap-3">
              <Icon className="h-6 w-6 shrink-0 text-gray-600" />
              <div className="min-w-0">
                <div className="text-sm font-semibold text-gray-900">{heading}</div>
                <p className="mt-2 text-sm leading-relaxed text-gray-700">{copy}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
