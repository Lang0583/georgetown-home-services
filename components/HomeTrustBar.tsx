import UpdatedMonthYear from "./UpdatedMonthYear";

function IconShieldCheck({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path
        d="m9 12 2 2 4-4"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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

function IconClock({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.75" />
      <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const SIGNALS = [
  {
    Icon: IconShieldCheck,
    title: "Verified local providers",
    subtext: "Georgetown-area businesses only",
  },
  {
    Icon: IconStar,
    title: "Ratings from Google Reviews",
    subtext: "Real customer feedback",
  },
] as const;

/**
 * Compact homepage credibility strip (NerdWallet / editorial-style).
 */
export default function HomeTrustBar() {
  return (
    <div
      className="mt-6 rounded-lg bg-[#F3F4F6] px-4 py-3 md:h-20 md:max-h-20 md:py-0"
      role="region"
      aria-label="Trust and credibility"
    >
      <ul className="flex flex-col divide-y divide-gray-300/70 md:h-full md:flex-row md:items-center md:divide-y-0">
        {SIGNALS.map(({ Icon, title, subtext }, index) => (
          <li
            key={title}
            className={[
              "flex min-w-0 flex-1 items-center gap-3 py-3 first:pt-0 last:pb-0 md:h-full md:py-0 md:pl-4 md:pr-4 lg:pl-5 lg:pr-5",
              index > 0 ? "md:border-l md:border-gray-300/80" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <Icon className="h-6 w-6 shrink-0 text-gray-600" />
            <div className="min-w-0 leading-tight">
              <p className="text-sm font-semibold text-gray-800">{title}</p>
              <p className="mt-0.5 text-xs text-gray-500">{subtext}</p>
            </div>
          </li>
        ))}
        <li className="flex min-w-0 flex-1 items-center gap-3 border-t border-gray-300/70 py-3 last:pb-0 md:h-full md:border-l md:border-t-0 md:border-gray-300/80 md:py-0 md:pl-4 md:pr-4 lg:pl-5 lg:pr-5">
          <IconClock className="h-6 w-6 shrink-0 text-gray-600" />
          <div className="min-w-0 leading-tight">
            <p className="text-sm font-semibold text-gray-800">
              <UpdatedMonthYear />
            </p>
            <p className="mt-0.5 text-xs text-gray-500">Actively maintained directory</p>
          </div>
        </li>
      </ul>
    </div>
  );
}
