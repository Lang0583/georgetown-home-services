import Link from "next/link";
import CTASection from "../components/CTASection";
import Container from "../components/Container";
import LeadForm from "../components/LeadForm";
import LinkCard from "../components/LinkCard";
import { getBlog, getBest, getBrandName, getLocationBySlug, getLocations, getServices } from "../lib/site-content";

export default function Home() {
  const brand = getBrandName();
  const services = getServices();
  const locations = getLocations();
  const best = getBest();
  const blog = getBlog();
  const defaultServiceSlug = services[0]?.slug ?? "plumber-georgetown-tx";
  const defaultLocationSlug = locations[0]?.slug ?? "georgetown-tx";

  return (
    <div className="bg-zinc-50">
      <Container>
        <section className="py-10 md:py-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-start">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-semibold text-zinc-700">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Local plumbing, HVAC, and roofing
              </div>

              <h1 className="mt-5 text-4xl font-bold tracking-tight text-zinc-900 md:text-5xl">
                {brand} in Georgetown, TX
              </h1>

              <p className="mt-4 max-w-xl text-lg text-zinc-700">
                Need help with a plumbing leak, AC not cooling, or a roof leak? Submit the form to request service options and free quotes.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="#lead"
                  className="inline-flex h-11 items-center justify-center rounded-full bg-zinc-900 px-6 text-sm font-semibold text-white hover:bg-zinc-800"
                >
                  Get Free Quotes
                </a>
                <Link
                  href={`/services/${defaultServiceSlug}`}
                  className="inline-flex h-11 items-center justify-center rounded-full border border-black/10 bg-white px-6 text-sm font-semibold text-zinc-900 hover:border-black/20"
                >
                  Request Service
                </Link>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-black/10 bg-white p-4">
                  <div className="text-sm font-semibold text-zinc-900">Fast scheduling</div>
                  <div className="mt-1 text-sm text-zinc-700">Submit the form to get clear next steps.</div>
                </div>
                <div className="rounded-2xl border border-black/10 bg-white p-4">
                  <div className="text-sm font-semibold text-zinc-900">Clear estimates</div>
                  <div className="mt-1 text-sm text-zinc-700">Upfront pricing before work begins.</div>
                </div>
                <div className="rounded-2xl border border-black/10 bg-white p-4">
                  <div className="text-sm font-semibold text-zinc-900">Quality repairs</div>
                  <div className="mt-1 text-sm text-zinc-700">Fix the root cause, not just symptoms.</div>
                </div>
              </div>
            </div>

            <div className="md:sticky md:top-[82px]">
              <LeadForm
                formId="lead"
                defaultService={services[0]?.title}
                defaultLocation={getLocationBySlug("georgetown-tx")?.title}
              />
            </div>
          </div>
        </section>

        <section className="pb-12 md:pb-16">
          <div className="flex items-end justify-between gap-6">
            <h2 className="text-2xl font-semibold text-zinc-900">Services</h2>
            <Link href={`/services/${defaultServiceSlug}`} className="text-sm font-semibold text-zinc-700 underline-offset-4 hover:underline">
              Explore all service pages
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 6).map((s) => (
              <LinkCard
                key={s.slug}
                href={`/services/${s.slug}`}
                title={s.title}
                description={s.description}
                badge={s.serviceType}
              />
            ))}
          </div>
        </section>

        <section className="pb-12 md:pb-16">
          <div className="flex items-end justify-between gap-6">
            <h2 className="text-2xl font-semibold text-zinc-900">Locations</h2>
            <Link href={`/locations/${defaultLocationSlug}`} className="text-sm font-semibold text-zinc-700 underline-offset-4 hover:underline">
              See locations
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {locations.map((l) => (
              <LinkCard key={l.slug} href={`/locations/${l.slug}`} title={l.title} description={l.description} />
            ))}
          </div>
        </section>

        <section className="pb-12 md:pb-16">
          <h2 className="text-2xl font-semibold text-zinc-900">Best Of</h2>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {best.map((b) => (
              <LinkCard
                key={b.slug}
                href={`/best/${b.slug}`}
                title={b.title}
                description={b.description}
                badge={l10nLocation(b.locationSlug, locations)}
              />
            ))}
          </div>
        </section>

        <section className="pb-12 md:pb-16">
          <h2 className="text-2xl font-semibold text-zinc-900">From the Blog</h2>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {blog.map((p) => (
              <LinkCard
                key={p.slug}
                href={`/blog/${p.slug}`}
                title={p.title}
                description={p.description}
                badge={p.readTime}
              />
            ))}
          </div>
        </section>

        <section className="pb-16">
          <CTASection
            eyebrow="Need help today?"
            title="Get a quote and next steps"
            description="Tell us what you need and we’ll follow up with clear service options."
            primaryHref={`/services/${defaultServiceSlug}`}
            primaryLabel="View service options"
            secondary={
              <div className="text-sm text-zinc-600">
                Prefer to start online? Use the form above and we’ll respond with next steps.
              </div>
            }
          />
        </section>
      </Container>
    </div>
  );
}

function l10nLocation(locationSlug: string, locations: ReturnType<typeof getLocations>) {
  return locations.find((l) => l.slug === locationSlug)?.title ?? locationSlug;
}
