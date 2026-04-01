import type { Metadata } from "next";
import Link from "next/link";
import Container from "../../components/Container";
import LinkCard from "../../components/LinkCard";
import CTASection from "../../components/CTASection";
import { getBestBySlug } from "../../lib/site-content";

export const metadata: Metadata = {
  title: "Top Providers in Georgetown, TX",
  description: "Browse best-of guides for plumbers, HVAC companies, and roofers serving Georgetown, TX.",
};

const CORE_BEST_SLUGS = [
  "best-plumbers-georgetown-tx",
  "top-hvac-companies-georgetown-tx",
  "best-roofers-georgetown-tx",
] as const;

export default function BestIndexPage() {
  const bestPages = CORE_BEST_SLUGS.map((slug) => getBestBySlug(slug)).filter(Boolean);

  return (
    <div className="bg-gray-50">
      <Container>
        <section className="py-10 md:py-12">
          <div className="flex flex-col gap-6">
            <div>
              <div className="text-sm font-semibold uppercase tracking-wide text-gray-600">Top Providers</div>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
                Best Home Service Providers in Georgetown, TX
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-700">
                Choose a category to compare real local companies, pricing guidance, and what to ask before you hire.
              </p>
            </div>

            <div id="top-providers" className="scroll-mt-24 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {bestPages.map((b) => (
                <LinkCard
                  key={b!.slug}
                  href={`/best/${b!.slug}`}
                  title={b!.title}
                  description={b!.description}
                  badge="Best Of"
                />
              ))}
            </div>

            <div className="pt-4">
              <CTASection
                eyebrow="More ways to browse"
                title="Service guides and email signup"
                description="Read category guides on the services hub, or use the optional email form on the homepage for provider ideas."
                primaryHref="#top-providers"
                emailFormHref="/#email-capture"
                secondary={
                  <div className="text-sm text-gray-600">
                    Service guides:{" "}
                    <Link href="/services" className="font-semibold underline underline-offset-4">
                      /services
                    </Link>
                    . Or go back to{" "}
                    <Link href="/" className="font-semibold underline underline-offset-4">
                      the homepage
                    </Link>
                    .
                  </div>
                }
                showDisclaimer
              />
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}

