import Link from "next/link";

/** Small CTA below provider directories — links to the featured-listing sales page. */
export default function AdvertiseListingLink({ className = "" }: { className?: string }) {
  return (
    <p className={`text-sm text-gray-600 ${className}`.trim()}>
      Want your business here?{" "}
      <Link href="/advertise" className="font-semibold text-primary hover:text-primary-hover hover:underline">
        → /advertise
      </Link>
    </p>
  );
}
