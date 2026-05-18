import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "../../components/JsonLd";
import LocalBusinessSchema from "../../components/LocalBusinessSchema";
import TrustPage from "../../components/templates/TrustPage";
import { pageSeoMetadata } from "../../lib/page-seo";
import { getBrandName } from "../../lib/site-content";
import { AUTHOR_NAME, AUTHOR_PROFILE_PATH } from "../../lib/site-author";
import { aboutPageJsonLd } from "../../lib/trust-pages-schema";

export const metadata: Metadata = pageSeoMetadata({
  titleSegment: "About Georgetown Home Services",
  description:
    "Locally owned Georgetown TX home services directory—mission, how plumbing/HVAC/roofing listings are vetted, and why Williamson County homeowners use this guide.",
  pathname: "/about",
  ogType: "website",
});

export default function AboutPage() {
  const brand = getBrandName();
  return (
    <TrustPage
      topSlot={
        <>
          <LocalBusinessSchema />
          <JsonLd
            data={aboutPageJsonLd({
            name: `About ${brand}`,
            description:
              "Locally owned Georgetown, Texas home services directory helping homeowners find vetted plumbing, HVAC, and roofing professionals.",
          })}
        />
        </>
      }
      eyebrow="About"
      title={`About ${brand}`}
      description={
        <>
          {brand} is a <strong>locally owned directory and homeowner guide</strong> built for{" "}
          <strong>Georgetown, Texas</strong> and surrounding Williamson County neighborhoods. We help residents cut through
          noisy search results and find <strong>vetted plumbing, HVAC, and roofing</strong> professionals they can call with
          confidence—without acting as a contractor, broker, or dispatch desk.
        </>
      }
    >
      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Our mission</h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          Home repairs are stressful enough. Our mission is simple: give Georgetown homeowners{" "}
          <strong>clear, honest context</strong> about the trades that keep houses safe and comfortable—water lines, attic
          loads, refrigerant circuits, hail-prone roofs—and then point you to <strong>shortlists of reputable local companies</strong>{" "}
          you can interview on your own terms. We believe a small-city market like Georgetown deserves publisher-backed
          curation: fewer &quot;mystery leads,&quot; more transparent signals, and copy that respects Texas weather, soil,
          and building realities instead of recycled national fluff.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Why Georgetown—and why a directory</h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          From the historic Square to fast-growing master-planned communities, Georgetown mixes older pier-and-beam stock,
          tight attic HVAC retrofits, and rooflines that see real Central Texas sun and spring hail. National marketplaces
          rarely explain those nuances; they often optimize for whoever bought the click. We write for neighbors: Sun City,
          Teravista, Wolf Ranch, Georgetown Village, Berry Creek, and the many blocks in between—people who want a{" "}
          <strong>short list of serious pros</strong>, not a firehose of unverified ads. {brand} is editorial-first: guides
          explain how failures show up in local homes, what belongs in a written estimate, and the questions a prudent
          homeowner asks before signing.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">How listings are vetted</h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          We do not take pay-to-play placement for organic directory rankings. When we include a plumbing, HVAC, or roofing
          company in a curated hub, we ground the pick in <strong>verifiable public signals</strong>: consistent business
          identity across official websites and state or local license databases where applicable, longevity and geographic
          service-area fit for Georgetown and Williamson County, documented customer feedback patterns (volume and
          recency—not a single cherry-picked star), and whether stated offerings match what Georgetown homeowners typically
          need (for example slab leak experience, heat-pump sizing conversations, impact-resistant roofing options after
          storms). We also screen for obvious red flags: phantom addresses, wildly mismatched trade names, or patterns that
          suggest lead-churn rather than accountable service.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          <strong>Limitations:</strong> vetting reduces risk; it does not guarantee outcomes. Licensing, insurance, warranties,
          workmanship, and code compliance are between you and the provider you hire. Always verify credentials
          independently and get proposals in writing.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          Methodology details:{" "}
          <Link href="/methodology" className="font-semibold text-primary hover:underline">
            How we review and rank providers
          </Link>
          . Editorial separation from ads:{" "}
          <Link href="/editorial-policy" className="font-semibold text-primary hover:underline">
            Editorial policy
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Who runs this site</h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          {brand} is run by{" "}
          <Link href={AUTHOR_PROFILE_PATH} className="font-semibold text-primary hover:underline">
            {AUTHOR_NAME}
          </Link>
          . {AUTHOR_NAME} is <strong>not</strong> a licensed plumber, electrician, HVAC technician, or roofer. Content is for
          research and comparison—not a substitute for on-site diagnosis, code review, or insurance/legal advice. Corrections
          matter to us: if you see a factual error in a listing, use the{" "}
          <Link href="/contact" className="font-semibold text-primary hover:underline">
            contact page
          </Link>{" "}
          with evidence we can verify.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">How the site is funded</h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          Like many independent publishers, we use <strong>advertising</strong> (including Google AdSense) and may use
          clearly disclosed <strong>affiliate or sponsored modules</strong> on specific pages. Paid placements do not dictate
          who earns an organic spot in our shortlists; they are labeled when they appear.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Start here</h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          New to the site? Browse{" "}
          <Link href="/services" className="font-semibold text-primary hover:underline">
            service guides
          </Link>{" "}
          or jump to the{" "}
          <Link href="/best" className="font-semibold text-primary hover:underline">
            provider directory
          </Link>{" "}
          for plumbing, HVAC, and roofing hubs tailored to Georgetown homeowners.
        </p>
      </section>
    </TrustPage>
  );
}
