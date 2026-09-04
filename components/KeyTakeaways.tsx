type KeyTakeawaysProps = {
  title?: string;
  items: string[];
  className?: string;
  /** Adds speakable CSS hook for SpeakableSpecification experiments. */
  speakable?: boolean;
};

/**
 * Quotable summary block for AI citation / GEO — visible HTML above long prose.
 */
export default function KeyTakeaways({
  title = "Key takeaways",
  items,
  className = "",
  speakable = false,
}: KeyTakeawaysProps) {
  if (!items.length) return null;

  return (
    <section
      className={[
        "mt-6 max-w-3xl rounded-xl border border-brand/20 bg-brand/5 p-5 md:p-6",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-labelledby="key-takeaways-heading"
    >
      <h2 id="key-takeaways-heading" className="font-display text-lg font-semibold tracking-tight text-ink">
        {title}
      </h2>
      <ul
        className={[
          "mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-ink",
          speakable ? "speakable-answer" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {items.map((item) => (
          <li key={item.slice(0, 64)}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
