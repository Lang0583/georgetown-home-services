export default function AffiliateDisclosure({ className }: { className?: string }) {
  return (
    <p
      className={["text-xs leading-relaxed text-muted", className].filter(Boolean).join(" ")}
    >
      Some links on this page are affiliate links. If you request quotes through them, we may earn a
      commission at no additional cost to you. This does not affect our rankings or recommendations.
    </p>
  );
}
