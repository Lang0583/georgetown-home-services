import { googleMapsEmbedUrl } from "@/lib/google-maps-embed";

type Props = {
  mapsSearchUrl: string;
  query: string;
  title: string;
};

/** Responsive Google Maps iframe for provider profiles. */
export default function ProviderMapEmbed({ mapsSearchUrl, query, title }: Props) {
  const src = googleMapsEmbedUrl(mapsSearchUrl, query);
  return (
    <div className="overflow-hidden rounded-xl border border-ink/10 bg-surface-alt">
      <iframe
        title={`Map: ${title}`}
        src={src}
        className="h-64 w-full border-0 md:h-80"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
