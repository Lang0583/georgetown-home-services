import Link from "next/link";
import type { Metadata } from "next";
import Container from "../../components/Container";
import LinkCard from "../../components/LinkCard";
import CTASection from "../../components/CTASection";
import { getServiceBySlug } from "../../lib/site-content";

export const metadata: Metadata = {
  title: "Services in Georgetown, TX",
  description: "Browse plumbing, HVAC, and roofing services for Georgetown homeowners.",
};

const CORE_SERVICE_SLUGS = ["plumber-georgetown-tx", "hvac-georgetown-tx", "roofer-georgetown-tx"] as const;

export default function ServicesIndexPage() {
  const services = CORE_SERVICE_SLUGS.map((slug) => getServiceBySlug(slug)).filter(Boolean);

  return (
    <div className="bg-gray-50">
      <Container>
        <section className="py-10 md:py-12">
          <div className="flex flex-col gap-6">
            <div>
              <div className="text-sm font-semibold uppercase tracking-wide text-gray-600">Services</div>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
                Home Services in Georgetown, TX
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-700">
                Choose a category to view providers, pricing guidance, and next steps.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((s) => (
                <LinkCard
                  key={s!.slug}
                  href={`/services/${s!.slug}`}
                  title={s!.title}
                  description={s!.description}
                  badge={s!.serviceType}
                />
              ))}
            </div>

            <div className="pt-4">
              <CTASection
                eyebrow="Need help fast?"
                title="Get clear options"
                description="Share your email and choose a service to get matched quickly."
                primaryHref="/services/plumber-georgetown-tx"
                primaryLabel="Start with plumbing"
                secondary={
                  <div className="text-sm text-gray-600">
                    Or go back to{" "}
                    <Link href="/" className="font-semibold underline underline-offset-4">
                      the homepage
                    </Link>
                    .
                  </div>
                }
              />
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}

