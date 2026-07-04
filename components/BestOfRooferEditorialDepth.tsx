import Link from "next/link";

/**
 * Original, page-specific analysis for `/best/best-roofers-georgetown-tx` — AdSense-friendly depth
 * beyond directory cards (how to use the page, local hiring context, red flags).
 */
export default function BestOfRooferEditorialDepth() {
  return (
    <section className="mt-10 space-y-8 rounded-xl border border-ink/10 bg-surface p-6 shadow-sm md:p-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-ink">How to use this directory (before you call anyone)</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Treat this page as a <strong>shortlist generator</strong>, not a scoreboard. Georgetown and Williamson County
          roofs fail in predictable ways—wind-driven hail on west- and south-facing slopes, flashing pulled loose at
          second-story transitions, and slow leaks that only show up after the{" "}
          <em>next</em> hard rain. Your job is to translate what you see (water spots, drip lines, gutter grit after a
          storm) into <strong>clear questions</strong> for two or three companies, then compare{" "}
          <strong>written scopes</strong> line by line.
        </p>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-muted">
          <li>
            <strong>Pick 3–5 companies</strong> that match your situation: emergency tarping, leak isolation, hail
            documentation, or full replacement planning—not “who has the prettiest website.”
          </li>
          <li>
            <strong>Request estimates in writing</strong> that name materials (underlayment class, starter, valley
            metal), nail pattern assumptions, and what happens if decking is soft when shingles come off.
          </li>
          <li>
            <strong>Ask how photos are delivered</strong> (labeled, dated) and whether someone senior reviews scopes
            before you sign—not just a door-knocker’s tablet sketch.
          </li>
          <li>
            <strong>Compare apples to apples</strong>: if one quote assumes full synthetic underlayment and another
            “includes underlayment” without a product name, stop and clarify before you choose on price alone.
          </li>
          <li>
            <strong>Confirm insurance alignment</strong> if you are filing: who attends the adjuster walk, how change
            orders are handled, and how emergency tarping is documented.
          </li>
        </ol>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-ink">Georgetown-specific hiring context</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Central Texas heat and spring hail trains mean many “small” repairs are actually{" "}
          <strong>symptoms of a pattern</strong>—for example, repeated granule dump at downspouts after multiple storms,
          or ridge cap tabs that lift after wind plus hail on an aging laminate. In master-planned neighborhoods (Sun
          City, Teravista, Wolf Ranch, Georgetown Village), <strong>HOA packets</strong>, parking for large crews, and
          dumpster placement can change scheduling as much as the roof pitch does—ask contractors how they&apos;ve
          handled your neighborhood before, not only whether they serve “the Austin area.”
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          If you are coming off a <strong>county-wide watch</strong>, expect longer callbacks. That is normal; what
          matters is whether the company returns with a coherent plan—photos, timeline, written scope—and avoids
          high-pressure “sign today” framing. Use our{" "}
          <Link href="/blog/hail-damage-georgetown-williamson-may-2026" className="font-semibold text-brand hover:underline">
            county hail guide
          </Link>{" "}
          and{" "}
          <Link href="/services/roofing" className="font-semibold text-brand hover:underline">
            roofing hub
          </Link>{" "}
          to prep questions before you pay a deposit.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-ink">Red flags (not exhaustive, but common)</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted">
          <li>
            <strong>Storm-chaser behavior:</strong> out-of-state plates, vanishing crews, or refusal to put warranties
            and license numbers on the contract.
          </li>
          <li>
            <strong>Scope vagueness:</strong> “replace bad decking as needed” without a price band or photo trigger, or
            mystery line items like “admin fee” with no definition.
          </li>
          <li>
            <strong>Insurance-only framing:</strong> promising a “free roof” or implying adjuster decisions they cannot
            control—get clarity in writing.
          </li>
          <li>
            <strong>Cash-only pressure:</strong> especially right after damage; legitimate companies invoice normally.
          </li>
          <li>
            <strong>No local reference footprint:</strong> impossible to verify an address, inconsistent phone numbers
            across listings, or only a map pin with stock photos.
          </li>
        </ul>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          Our{" "}
          <Link href="/methodology" className="font-semibold text-brand hover:underline">
            methodology
          </Link>{" "}
          explains how we assemble these shortlists from public data; it does not replace your own diligence. When in
          doubt, pause, compare another estimate, and use{" "}
          <Link href="/contact" className="font-semibold text-brand hover:underline">
            contact
          </Link>{" "}
          to tell us about confusing directory info—we correct factual listing errors when we can verify them.
        </p>
      </div>
    </section>
  );
}
