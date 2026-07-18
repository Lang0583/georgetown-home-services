import { AFFILIATE_SPONSORED_DISCLOSURE } from "@/lib/affiliate-disclosure";

export default function AffiliateDisclosure({ className }: { className?: string }) {
  return (
    <p
      className={["text-xs leading-relaxed text-muted", className].filter(Boolean).join(" ")}
    >
      {AFFILIATE_SPONSORED_DISCLOSURE}
    </p>
  );
}
