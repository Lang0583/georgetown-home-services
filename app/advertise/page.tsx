import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "../../components/JsonLd";
import TrustPage from "../../components/templates/TrustPage";
import { PROVIDER_CATEGORY_LABELS, PROVIDER_CATEGORY_ORDER } from "../../data/providers";
import { pageSeoMetadata } from "../../lib/page-seo";
import { getBrandName } from "../../lib/site-content";
import { webPageTrustJsonLd } from "../../lib/trust-pages-schema";
import { showExtendedHomeServices } from "../../lib/public-site-scope";

export const metadata: Metadata = pageSeoMetadata({
  titleSegment: "Feature Your Business on Georgetown Home Services",
  description:
    "One featured listing per trade category on Georgetown Home Services — $99/month, pinned above organic results with a clear Featured label. Links go straight to your website.",
  pathname: "/advertise",
  ogType: "website",
});

const STRIPE_URL = process.env.NEXT_PUBLIC_FEATURED_STRIPE_URL?.trim() ?? "";

const subscribeBtnClass =
  "inline-flex items-center justify-center rounded-lg bg-[#01696F] px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-[#0C4E54]";

export default function AdvertisePage() {
  const brand = getBrandName();
  const categories = showExtendedHomeServices()
    ? PROVIDER_CATEGORY_ORDER
    : PROVIDER_CATEGORY_ORDER.filter((c) => ["plumbing", "hvac", "roofing"].includes(c));

  return (
    <TrustPage
      topSlot={
        <JsonLd
          data={webPageTrustJsonLd({
            pathname: "/advertise",
            name: "Feature Your Business on Georgetown Home Services",
            description:
              "Paid featured listings for Georgetown-area home service businesses — one slot per category, clearly labeled.",
          })}
        />
      }
      eyebrow="For local businesses"
      title="Feature Your Business on Georgetown Home Services"
      description={
        <>
          {brand} helps Georgetown homeowners shortlist plumbers, HVAC companies, roofers, and other trades. If you
          serve Williamson County, you can claim the <strong>one featured spot</strong> in your category — pinned above
          the regular directory with a clear &quot;Featured&quot; label.
        </>
      }
    >
      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">What you get</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            <strong>Top placement</strong> on your category&apos;s Best Of page — above the organic listings homeowners
            already browse.
          </li>
          <li>
            A clearly labeled <strong>&quot;Featured&quot; badge</strong> so readers know it&apos;s a paid placement
            (we follow FTC disclosure rules — no hiding the relationship).
          </li>
          <li>
            A <strong>direct link to your website</strong>. We don&apos;t put a lead form in front of your listing and
            we don&apos;t sell your clicks to a quote aggregator.
          </li>
          <li>
            <strong>One business per category</strong> — plumbing, HVAC, roofing, and the other trades we cover. When
            your slot is taken, the category is closed until it opens again.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Price</h2>
        <p className="mt-3">
          <strong className="text-lg text-gray-900">$99 per month.</strong> Cancel anytime through Stripe. No setup fee,
          no long contract, no &quot;growth consultant&quot; upsell.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">How it works</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5">
          <li>Pick your category below and subscribe through our secure Stripe checkout.</li>
          <li>
            We&apos;ll email you within one business day to confirm your business name, website URL, phone number, and a
            short description for the listing.
          </li>
          <li>We add your listing to the featured slot and it goes live on the matching Best Of page.</li>
        </ol>
        <p className="mt-3">
          Questions before you subscribe?{" "}
          <Link href="/contact#feedback" className="font-semibold text-primary hover:underline">
            Send us a message
          </Link>{" "}
          — we&apos;re a small local site, not a call center.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Categories</h2>
        <p className="mt-3">One featured slot per trade. First subscriber in a category holds the spot.</p>
        <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {categories.map((category) => (
            <li
              key={category}
              className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-900"
            >
              {PROVIDER_CATEGORY_LABELS[category]}
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Subscribe</h2>
        <p className="mt-3">
          Ready to claim your category? Checkout is handled by Stripe. After payment we&apos;ll reach out to collect your
          listing details.
        </p>
        {STRIPE_URL ? (
          <a
            href={STRIPE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`${subscribeBtnClass} mt-5`}
          >
            Subscribe — $99/month
          </a>
        ) : (
          <p className="mt-5 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">
            Online checkout is being set up.{" "}
            <Link href="/contact#feedback" className="font-semibold text-primary hover:underline">
              Contact us
            </Link>{" "}
            to reserve a featured slot in the meantime.
          </p>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Transparency</h2>
        <p className="mt-3">
          Featured listings are always labeled as paid placements. Organic rankings below them are not for sale. Read our{" "}
          <Link href="/editorial-policy" className="font-semibold text-primary hover:underline">
            editorial policy
          </Link>{" "}
          and{" "}
          <Link href="/methodology" className="font-semibold text-primary hover:underline">
            methodology
          </Link>{" "}
          for how we handle sponsored content.
        </p>
      </section>
    </TrustPage>
  );
}
