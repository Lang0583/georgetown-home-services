import Link from "next/link";

/** Substantive directory analysis for `/best/top-hvac-companies-georgetown-tx` (AdSense / quality depth). */
export default function BestOfHvacEditorialDepth() {
  return (
    <section className="mt-10 space-y-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">How to use this HVAC directory</h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          In Georgetown your HVAC system is both <strong>comfort equipment</strong> and <strong>safety infrastructure</strong>
          during heat waves. Directory stars summarize public sentiment—they do not measure whether a company is the right
          fit for <em>your</em> refrigerant system, duct layout, or warranty situation. Use this page to shortlist providers
          who can articulate diagnostics, options, and trade-offs in writing.
        </p>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-gray-700">
          <li>
            <strong>State the symptom + mode:</strong> cooling only, heating only, heat pump, noise pattern, airflow
            imbalance upstairs vs downstairs.
          </li>
          <li>
            <strong>Ask for a written diagnosis</strong> after measurement (superheat/subcool where applicable, static
            pressure discussion, combustion checks on furnaces)—not only a part swap quote.
          </li>
          <li>
            <strong>Replacement quotes</strong> should name AHRI-matched equipment class, line-set assumptions,
            thermostat compatibility, and permit responsibilities.
          </li>
          <li>
            <strong>Compare maintenance plans honestly:</strong> what filters they stock for your cabinet size, whether
            priority scheduling is contractual or marketing.
          </li>
        </ol>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Central Texas climate realities</h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          Long <strong>cooling seasons</strong> stress capacitors, contactors, and condenser coils; hard winter snaps still
          happen—heat exchanger issues and defrost faults show up on the first cold night. Humid days also mask{" "}
          <strong>condensate drain problems</strong> as “mystery leaks.” When you call, mention recent weather swings—it
          shortens diagnostic time. If your home has single-return ducting or long flex runs common in some Georgetown
          build eras, say so; static pressure problems mimic refrigerant faults.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          Pair this directory with the{" "}
          <Link href="/services/hvac-georgetown-tx" className="font-semibold text-primary hover:underline">
            Georgetown HVAC service guide
          </Link>{" "}
          and storm-season notes in{" "}
          <Link href="/blog/hail-damage-georgetown-williamson-may-2026" className="font-semibold text-primary hover:underline">
            our May 2026 hail overview
          </Link>{" "}
          if outdoor coils may have taken hail.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Red flags when hiring HVAC help</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-gray-700">
          <li>
            <strong>Top-off refrigerant</strong> without leak search discussion on a measured low charge.
          </li>
          <li>
            <strong>Equipment swaps quoted from sidewalk</strong> without load discussion or duct sanity checks.
          </li>
          <li>
            <strong>“Free tune-ups”</strong> that always convert to multi-thousand sales with no documented test results.
          </li>
          <li>
            <strong>Breaker trips dismissed</strong> as “just reset it” without investigating electrical integrity.
          </li>
        </ul>
        <p className="mt-4 text-sm leading-relaxed text-gray-700">
          Read{" "}
          <Link href="/methodology" className="font-semibold text-primary hover:underline">
            how we rank providers
          </Link>{" "}
          and send corrections through{" "}
          <Link href="/contact" className="font-semibold text-primary hover:underline">
            Contact
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
