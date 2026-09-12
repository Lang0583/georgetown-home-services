import Link from "next/link";

/** Directory CTA for /water pages — never a booking or outbound contractor link. */
export default function WaterPlumberCta() {
  return (
    <p className="mt-6 text-sm leading-relaxed">
      <Link href="/plumbing" className="font-semibold text-brand hover:underline">
        See license verified plumbers
      </Link>
    </p>
  );
}
