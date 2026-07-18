import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import ClaimProfileForm from "@/components/ClaimProfileForm";
import JsonLd from "@/components/JsonLd";
import PageShell from "@/components/templates/PageShell";
import { absolutePageUrl, pageSeoMetadata } from "@/lib/page-seo";
import { buildFaqPageJsonLd } from "@/lib/faq-schema";
import type { Faq } from "@/lib/site-content";

const PATHNAME = "/for-contractors";

const FAQS: Faq[] = [
  {
    q: "Can I pay for a better ranking?",
    a: "No. Listing placement is never sold. Paid tiers change how much information your listing displays; they never change your position in any ranked list.",
  },
  {
    q: "What happens if my license lapses?",
    a: "Your listing is removed until the license is reinstated and we can confirm an active public record with the applicable Texas board.",
  },
  {
    q: "Do you sell my leads to other contractors?",
    a: "No. We do not sell contractor leads. Homeowners contact you directly from the public contact details on your listing.",
  },
  {
    q: "How do you verify licenses?",
    a: "We check license numbers against the primary state registries: TSBPE for plumbing, TDLR for electrical and HVAC, and TDA SPCS for pest control. Full details are on our listing methodology page at https://www.georgetownhomeservices.com/methodology.",
  },
];

export const metadata: Metadata = pageSeoMetadata({
  titleSegment: "For Contractors — Get Listed",
  description:
    "Claim or request a Georgetown Home Services listing. Free organic placement is never sold. Claimed and featured tiers add profile controls without buying rank.",
  pathname: PATHNAME,
  ogType: "website",
});

const HOW_IT_WORKS = [
  {
    title: "Free organic listing",
    body: "Every qualifying licensed provider gets one. Placement is never purchased. Always free.",
  },
  {
    title: "Claimed Profile",
    body: "You control specialties, hours, service area, photos, and description. License and insurance badges display prominently, with click and call reporting.",
  },
  {
    title: "Featured Placement",
    body: "A clearly labeled sponsored module shown outside the organic list, capped at one per category per ZIP.",
  },
] as const;

const PRICING = [
  { name: "Free", price: "$0/mo", note: "Organic directory listing" },
  { name: "Claimed Profile", price: "$99/mo", note: "Editable profile + reporting" },
  { name: "Featured Placement", price: "$299/mo", note: "Sponsored module (1 per category/ZIP)" },
] as const;

export default function ForContractorsPage() {
  const pageUrl = absolutePageUrl(PATHNAME);
  const faqJsonLd = buildFaqPageJsonLd({
    pageUrl,
    name: "For Contractors — FAQ",
    faqs: FAQS,
  });

  return (
    <PageShell>
      <section className="py-8 md:py-12">
        {faqJsonLd ? <JsonLd data={faqJsonLd} /> : null}

        <div className="mx-auto max-w-3xl px-4">
          <Breadcrumbs
            items={[
              { href: "/", label: "Home" },
              { href: PATHNAME, label: "For Contractors" },
            ]}
          />

          <header className="mt-4">
            <h1 className="text-3xl font-bold tracking-tight text-ink md:text-4xl">
              Get listed where homeowners check licenses first
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
              Every provider on this site is checked against the primary state registry — TSBPE for plumbing, TDLR for
              electrical and HVAC, and TDA SPCS for pest control. Listing placement is never sold.
            </p>
            <p className="mt-6">
              <a
                href="#claim"
                className="inline-flex items-center justify-center rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white hover:bg-accent-hover"
              >
                Claim or request a listing
              </a>
            </p>
          </header>

          <section className="mt-14" aria-labelledby="how-listings-work">
            <h2 id="how-listings-work" className="text-2xl font-semibold tracking-tight text-ink">
              How listings work
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
              {HOW_IT_WORKS.map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-ink/10 bg-surface p-5 shadow-sm"
                >
                  <h3 className="text-base font-semibold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-14" aria-labelledby="pricing-heading">
            <h2 id="pricing-heading" className="text-2xl font-semibold tracking-tight text-ink">
              Pricing
            </h2>
            <div className="mt-6 overflow-x-auto rounded-xl border border-ink/10 bg-surface shadow-sm">
              <table className="w-full min-w-[28rem] text-left text-sm">
                <thead>
                  <tr className="border-b border-ink/10 bg-surface-alt text-ink">
                    <th className="px-4 py-3 font-semibold">Tier</th>
                    <th className="px-4 py-3 font-semibold">Price</th>
                    <th className="px-4 py-3 font-semibold">Includes</th>
                  </tr>
                </thead>
                <tbody>
                  {PRICING.map((row) => (
                    <tr key={row.name} className="border-b border-ink/5 last:border-0">
                      <td className="px-4 py-3 font-medium text-ink">{row.name}</td>
                      <td className="px-4 py-3 text-ink">{row.price}</td>
                      <td className="px-4 py-3 text-muted">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
              Paid tiers change how much information your listing displays. They never change your position in any
              ranked list.
            </p>
          </section>

          <div className="mt-14">
            <ClaimProfileForm />
          </div>

          <section className="mt-14" aria-labelledby="contractor-faq-heading">
            <h2 id="contractor-faq-heading" className="text-2xl font-semibold tracking-tight text-ink">
              Frequently asked questions
            </h2>
            <div className="mt-6 space-y-4">
              {FAQS.map((faq) => (
                <div
                  key={faq.q}
                  className="rounded-lg border border-ink/10 bg-surface p-5 shadow-sm"
                >
                  <h3 className="text-base font-semibold text-ink">{faq.q}</h3>
                  {faq.q === "How do you verify licenses?" ? (
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      We check license numbers against the primary state registries: TSBPE for plumbing, TDLR for
                      electrical and HVAC, and TDA SPCS for pest control. Full details are on our{" "}
                      <Link href="/methodology" className="font-semibold text-brand hover:underline">
                        listing methodology
                      </Link>{" "}
                      page.
                    </p>
                  ) : (
                    <p className="mt-2 text-sm leading-relaxed text-muted">{faq.a}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
    </PageShell>
  );
}
