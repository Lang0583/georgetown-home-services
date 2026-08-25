import EmailCaptureSitewide from "./EmailCaptureSitewide";

/** Above-the-fold-adjacent email band for the homepage (distinct from sitewide footer capture). */
export default function HomeEmailCaptureBand() {
  return (
    <section
      id="email-capture-home"
      className="scroll-mt-28 border-y border-ink/10 bg-surface py-2"
      aria-label="Free Georgetown home maintenance checklist"
    >
      <div className="mx-auto max-w-5xl px-4">
        <EmailCaptureSitewide
          formId="email-capture-home-form"
          source="homepage-hero"
          compact
          offers={["seasonal_checklist", "monthly_reminder"]}
          defaultOffer="seasonal_checklist"
        />
      </div>
    </section>
  );
}
