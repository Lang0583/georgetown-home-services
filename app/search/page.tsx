import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import LinkCard from "@/components/LinkCard";
import { pageSeoMetadata } from "@/lib/page-seo";
import { getBlog, getBest, getServices } from "@/lib/site-content";

export const metadata: Metadata = pageSeoMetadata({
  titleSegment: "Search Georgetown Home Services",
  description:
    "Search Georgetown TX home service guides, provider directories, cost guides, and blog posts on Georgetown Home Services.",
  pathname: "/search",
  ogType: "website",
});

type Searchable = { href: string; title: string; description: string; kind: string };

function buildSearchIndex(): Searchable[] {
  const items: Searchable[] = [];

  for (const s of getServices()) {
    items.push({
      href: `/services/${s.slug}`,
      title: s.title,
      description: s.description,
      kind: "Service",
    });
  }
  for (const b of getBest()) {
    items.push({
      href: `/best/${b.slug}`,
      title: b.title,
      description: b.description,
      kind: "Provider Directory",
    });
  }
  for (const p of getBlog()) {
    items.push({
      href: `/blog/${p.slug}`,
      title: p.title,
      description: p.description,
      kind: "Blog",
    });
  }

  items.push(
    { href: "/costs", title: "Cost Guides", description: "Georgetown TX repair and replacement pricing.", kind: "Hub" },
    { href: "/pricing", title: "Pricing Hub", description: "Budget planning for Georgetown homeowners.", kind: "Hub" },
    { href: "/seasonal", title: "Seasonal Maintenance", description: "Texas seasonal home maintenance checklists.", kind: "Hub" },
  );

  return items;
}

function matchQuery(items: Searchable[], raw: string): Searchable[] {
  const q = raw.trim().toLowerCase();
  if (!q) return [];

  const terms = q.split(/\s+/).filter(Boolean);
  return items
    .filter((item) => {
      const hay = `${item.title} ${item.description} ${item.kind}`.toLowerCase();
      return terms.every((t) => hay.includes(t));
    })
    .slice(0, 24);
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q: rawQ } = await searchParams;
  const q = (rawQ ?? "").trim();
  const index = buildSearchIndex();
  const results = matchQuery(index, q);

  return (
    <div className="bg-gray-50">
      <Container>
        <section className="py-10 md:py-12">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">Search</h1>
          <p className="mt-3 max-w-2xl text-gray-700">
            Find Georgetown TX service guides, provider directories, and homeowner articles.
          </p>

          <form className="mt-8 max-w-xl" action="/search" method="get" role="search">
            <label htmlFor="site-search" className="sr-only">
              Search Georgetown Home Services
            </label>
            <div className="flex gap-2">
              <input
                id="site-search"
                name="q"
                type="search"
                defaultValue={q}
                placeholder="e.g. plumber cost, AC not cooling, roof hail"
                className="min-h-11 flex-1 rounded-lg border border-gray-300 px-4 py-2 text-gray-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                autoComplete="off"
              />
              <button
                type="submit"
                className="inline-flex min-h-11 items-center justify-center rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-white hover:bg-primary-hover"
              >
                Search
              </button>
            </div>
          </form>

          {q ? (
            <div className="mt-10">
              <h2 className="text-lg font-semibold text-gray-900">
                {results.length > 0
                  ? `${results.length} result${results.length === 1 ? "" : "s"} for “${q}”`
                  : `No results for “${q}”`}
              </h2>
              {results.length > 0 ? (
                <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                  {results.map((r) => (
                    <LinkCard key={r.href} href={r.href} title={r.title} description={r.description} badge={r.kind} />
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-sm text-gray-700">
                  Try broader terms like <Link href="/search?q=plumber" className="font-semibold text-primary hover:underline">plumber</Link>
                  ,{" "}
                  <Link href="/search?q=hvac" className="font-semibold text-primary hover:underline">
                    HVAC
                  </Link>
                  , or browse the{" "}
                  <Link href="/services" className="font-semibold text-primary hover:underline">
                    services hub
                  </Link>
                  .
                </p>
              )}
            </div>
          ) : (
            <p className="mt-8 text-sm text-gray-600">Enter a keyword to search guides and directories.</p>
          )}
        </section>
      </Container>
    </div>
  );
}
