import LinkCard from "./LinkCard";
import type { InternalLink } from "../lib/internal-links";

type HubRelatedLinksProps = {
  title?: string;
  description?: string;
  links: InternalLink[];
  className?: string;
};

/**
 * Compact “Related” link grid used on service, best-of, and neighborhood hub pages.
 */
export default function HubRelatedLinks({
  title = "Related",
  description = "Continue with directories, pricing, and neighborhood guides.",
  links,
  className = "",
}: HubRelatedLinksProps) {
  if (!links.length) return null;

  return (
    <section className={`mt-12 ${className}`.trim()}>
      <h2 className="text-3xl font-semibold tracking-tight text-ink">{title}</h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">{description}</p>
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {links.map((link) => (
          <LinkCard
            key={link.href}
            href={link.href}
            title={link.label}
            description={link.description ?? "Georgetown homeowner resource."}
            badge={
              link.href.startsWith("/best/")
                ? "Best Of"
                : link.href.startsWith("/services/")
                  ? "Service"
                  : link.href.startsWith("/neighborhoods/")
                    ? "Neighborhood"
                    : link.href === "/pricing"
                      ? "Pricing"
                      : "Guide"
            }
          />
        ))}
      </div>
    </section>
  );
}
