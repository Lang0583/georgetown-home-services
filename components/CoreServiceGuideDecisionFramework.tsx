import type { ReactNode } from "react";
import Link from "next/link";

type Trade = "plumber" | "hvac" | "roofer";

const copy: Record<
  Trade,
  {
    title: string;
    paragraphs: ReactNode[];
  }
> = {
  plumber: {
    title: "Decision framework: repair vs. escalate (Georgetown plumbing)",
    paragraphs: [
      <>
        Use this section as a <strong>conversation prep</strong>, not a DIY manual. If you smell gas, see raw sewage
        backing into living space, or cannot stop water at the meter, treat it as urgent and call a licensed pro or
        emergency services as appropriate. For everything else, the goal is to describe <strong>what changed</strong> (flow
        rate, temperature, sound, duration) so your shortlist from{" "}
        <Link href="/best/best-plumbers-georgetown-tx" className="font-semibold text-primary hover:underline">
          Best Plumbers in Georgetown, TX
        </Link>{" "}
        can quote responsibly.
      </>,
      <>
        <strong>Slab and yard-line leaks</strong> often show up as unexplained water bills, warm floor zones, or soggy
        landscaping—not dramatic gushers. If multiple fixtures behave oddly at once, think <strong>main line or PRV</strong>{" "}
        issues before chasing individual traps. Note whether your meter “creeps” with everything off; that observation
        saves a trip charge when you schedule.
      </>,
      <>
        <strong>Water heater decisions</strong> usually hinge on age, warranty, and leak location. Tank leaks from the
        base typically mean replacement; nipple or relief valve drips may be repairable if caught early. Always ask how
        disposal, pan drains, and expansion tank code compliance are handled—Georgetown inspections expect work to meet
        current standards when a unit is swapped.
      </>,
    ],
  },
  hvac: {
    title: "Decision framework: when to repair, when to replace (Georgetown HVAC)",
    paragraphs: [
      <>
        Start with <strong>mode and pattern</strong>: does the symptom appear only in cooling, only in heating, or only
        when airflow is high? Noises that track fan speed differ from refrigerant-era hissing or electrical humming.
        Short-cycling (rapid start/stop) increases wear—donate that detail to every company you call from the{" "}
        <Link href="/best/top-hvac-companies-georgetown-tx" className="font-semibold text-primary hover:underline">
          top HVAC shortlist
        </Link>
        .
      </>,
      <>
        <strong>Repair-first</strong> is sensible when equipment is mid-life, refrigerant circuit tests are stable, and
        the failure is localized (failed capacitor, sticky contactor, clogged drain). <strong>Replacement</strong>{" "}
        conversations make sense when repair quotes approach a meaningful fraction of new efficiency-class equipment,
        especially if your ducts are leaking badly or you are still on R-22-era gear with costly refrigerant.
      </>,
      <>
        After <Link href="/blog/hail-damage-georgetown-williamson-may-2026" className="font-semibold text-primary hover:underline">
          hail season
        </Link>
        , outdoor coils may look “a little bent” but still lose capacity. If cooling recovered poorly after storms, ask
        for <strong>coil inspection photos</strong> and measurable performance data—not only a refrigerant top-off.
      </>,
    ],
  },
  roofer: {
    title: "Decision framework: repair, stabilize, or replace (Georgetown roofing)",
    paragraphs: [
      <>
        Georgetown roofs usually fail at <strong>transitions</strong>—wall-to-roof, pipe boots, valleys, low-slope
        crickets—before the open field looks bad after a storm. When you see interior staining, note whether the spot
        moves with wind direction; blow‑in leaks often implicate flashings more than shingle brand.
      </>,
      <>
        <strong>Stabilize first</strong> if active dripping threatens ceilings; tarping and bucket lines are temporary.
        Photograph everything before and after mitigation—insurance conversations go smoother with timestamps. Then collect
        written scopes from companies on{" "}
        <Link href="/best/best-roofers-georgetown-tx" className="font-semibold text-primary hover:underline">
          Best Roofers in Georgetown, TX
        </Link>{" "}
        that itemize decking allowance, underlayment class, and ventilation balance.
      </>,
      <>
        <strong>Full replacement</strong> is not only about shingle age; widespread hail bruising, repeated wind loss of
        tabs, or mismatched repairs across slopes can justify it when documented. Ask how crews protect landscaping,
        dumpsters, and HOA rules in neighborhoods like Wolf Ranch or Teravista—logistics affect total project success,
        not only per-square pricing.
      </>,
    ],
  },
};

export default function CoreServiceGuideDecisionFramework({ trade }: { trade: Trade }) {
  const block = copy[trade];
  return (
    <section
      className="mt-6 rounded-xl border border-gray-200 border-l-[3px] border-l-primary bg-slate-50 p-6 shadow-sm ring-1 ring-gray-950/[0.04]"
      aria-labelledby={`framework-${trade}`}
    >
      <h2 id={`framework-${trade}`} className="text-xl font-semibold tracking-tight text-gray-900">
        {block.title}
      </h2>
      <div className="mt-4 space-y-3 text-sm leading-relaxed text-gray-800">
        {block.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </section>
  );
}
