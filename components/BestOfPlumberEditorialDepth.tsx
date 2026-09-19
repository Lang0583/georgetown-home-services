import Link from "next/link";

/** Substantive directory analysis for `/best/best-plumbers-georgetown-tx` (AdSense / quality depth). */
export default function BestOfPlumberEditorialDepth() {
  return (
    <section className="mt-10 space-y-8 rounded-xl border border-ink/10 bg-surface p-6 shadow-sm md:p-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-ink">How to use this plumber directory</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Plumbing is different from many trades: a <strong>slow drip</strong> can sit in a wall for weeks before stains
          appear, while a <strong>main-line backup</strong> needs same-day response. This page is a{" "}
          <strong>shortlist</strong>, not a single winner from stars alone. The practical goal is two or three licensed
          companies ready for clear symptoms, photos, and access details.
        </p>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-muted">
          <li>
            <strong>Classify the job:</strong> emergency shutoff / sewage, scheduled replacement (water heater), leak
            isolation, or whole-house pressure concern.
          </li>
          <li>
            <strong>Ask for a written estimate</strong> that separates trip/diagnostic, parts, labor band, and what voids
            the quote (hidden access, corroded fittings, unknown slab route).
          </li>
          <li>
            <strong>Confirm licensing language</strong> on the estimate and invoice—Texas credentials belong on official
            sources, not a door hanger.
          </li>
          <li>
            <strong>Compare warranties</strong> on parts versus labor; cheap tank installs with thin labor warranties
            often cost more on the second visit.
          </li>
        </ol>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-ink">Georgetown-specific context</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Williamson County&apos;s <strong>shifting clay soils</strong> stress slab plumbing and yard lines differently than
          sandy Gulf-Coast soils. Older Georgetown homes near the Square can have mixed generations of supply line
          materials; newer master-planned sections may still see staple-up or foundation penetration quirks. Build year,{" "}
          <strong>slab versus pier-and-beam</strong> (when known), and whether irrigation or pool lines run near a
          suspected leak change how plumbers scope work and price risk.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Vocabulary for cleanouts, PRV, and hydrostatic tests lives on the{" "}
          <Link href="/services/plumber-georgetown-tx" className="font-semibold text-brand hover:underline">
            Georgetown plumbing service guide
          </Link>
          —useful before jargon shows up on an invoice.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-ink">Red flags when hiring a plumber</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted">
          <li>
            <strong>All-cash “today only” pricing</strong> on large jobs without a written contract.
          </li>
          <li>
            <strong>Camera inspections sold as mandatory</strong> without explaining what decision the video will change.
          </li>
          <li>
            <strong>No local traceability:</strong> only a call center number, no Texas license discussion, no written
            guarantee of who performs the work.
          </li>
          <li>
            <strong>Upsells bundled into panic:</strong> whole-house repipes pitched from a single fixture clog without
            followable diagnostics.
          </li>
        </ul>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          Our{" "}
          <Link href="/methodology" className="font-semibold text-brand hover:underline">
            methodology
          </Link>{" "}
          explains how we assemble shortlists. Report listing errors via{" "}
          <Link href="/contact" className="font-semibold text-brand hover:underline">
            Contact
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
