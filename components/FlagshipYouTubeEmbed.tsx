type Props = {
  id: string;
  heading: string;
  summary: string;
  youtubeId: string;
  iframeTitle: string;
};

/**
 * Responsive lazy-loaded YouTube embed (youtube-nocookie) + editorial disclaimer.
 */
export default function FlagshipYouTubeEmbed({
  id,
  heading,
  summary,
  youtubeId,
  iframeTitle,
}: Props) {
  const src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(youtubeId)}`;
  return (
    <section className="not-prose max-w-3xl" aria-labelledby={id}>
      <h2 id={id} className="text-xl font-semibold tracking-tight text-ink md:text-2xl">
        {heading}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">{summary}</p>
      <div className="mt-4 aspect-video w-full overflow-hidden rounded-xl border border-ink/10 bg-black shadow-sm">
        <iframe
          title={iframeTitle}
          src={src}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
      <p className="mt-3 text-xs leading-snug text-muted">
        Third-party educational video via YouTube. Georgetown Home Services does not produce this clip; we include it
        to illustrate common signs of storm-related roof wear. For your roof, rely on a{" "}
        <span className="font-medium text-muted">licensed local inspector</span> and your policy terms.
      </p>
    </section>
  );
}
