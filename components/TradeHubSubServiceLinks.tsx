import LinkCard from "./LinkCard";
import { getSubServicesForParentHub } from "@/data/sub-services";
import { showExtendedHomeServices } from "@/lib/public-site-scope";

type TradeHubSubServiceLinksProps = {
  parentHubPath: string;
  title?: string;
};

/**
 * Lists `/[trade]/[slug]` pages from a trade hub (e.g. `/services/plumbing` → `/plumbing/*`).
 */
export default function TradeHubSubServiceLinks({
  parentHubPath,
  title = "Browse by job type",
}: TradeHubSubServiceLinksProps) {
  const pages = getSubServicesForParentHub(parentHubPath).filter(
    (p) => showExtendedHomeServices() || !p.extended,
  );
  if (!pages.length) return null;

  return (
    <section>
      <h2 className="text-3xl font-semibold tracking-tight text-gray-900">{title}</h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-700">
        Narrow to a specific job type—each page links back to Georgetown service guides and directories.
      </p>
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {pages.map((p) => (
          <LinkCard
            key={`${p.serviceSlug}/${p.slug}`}
            href={`/${p.serviceSlug}/${p.slug}`}
            title={p.h1}
            description={p.metaDescription}
            badge={p.serviceLabel}
          />
        ))}
      </div>
    </section>
  );
}
