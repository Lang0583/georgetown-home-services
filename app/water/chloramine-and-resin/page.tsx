import SourceBlock from "@/components/water/SourceBlock";
import WaterCtaRow from "@/components/water/WaterCtaRow";
import WaterPageFrame from "@/components/water/WaterPageFrame";
import { WATER_SPEC, formatUsd } from "@/data/water";
import { pageSeoMetadata } from "@/lib/page-seo";

const LAST_REVIEWED = "2026-09-12";
const PATH = "/water/chloramine-and-resin";

export const metadata = pageSeoMetadata({
  titleSegment: "Chloramines and Softener Resin Life in Georgetown",
  description:
    "Georgetown typically disinfects with chloramines. Here is how that affects ion exchange resin, what a prefilter does and does not do, and what we are not claiming.",
  pathname: PATH,
  ogType: "website",
});

export default function ChloramineAndResinPage() {
  return (
    <WaterPageFrame
      title="Chloramines, and why softener resin does not last forever here"
      lastReviewed={LAST_REVIEWED}
      crumbs={[
        { href: "/", label: "Home" },
        { href: "/water", label: "Water hardness" },
        { href: PATH, label: "Chloramine and resin" },
      ]}
    >
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted">
        Georgetown typically uses chloramines as its disinfectant, and the city describes periodic conversions to free
        chlorine. Both matter if you own a water softener, and almost nobody explains why before they sell you one.
      </p>

      <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">What happens to the resin</h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
        A softener works by running water through a bed of ion exchange resin. The resin is plastic beads. Disinfectants
        oxidize those beads over time, the bead structure breaks down, and the bed slowly loses capacity and starts to
        channel.
      </p>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
        You do not get a warning light. You get a unit that quietly stops doing as much as it used to, and a homeowner
        who assumes softeners just do that.
      </p>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
        Chloramine is more persistent than free chlorine, which is the practical problem. It does not dissipate the way
        chlorine does, so the resin sees it continuously.
      </p>

      <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">What a prefilter does</h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
        Putting carbon ahead of the softener is a common way to reduce what the resin is exposed to. The detail people
        miss is that not all carbon is the same. Standard activated carbon is rated against chlorine. Catalytic carbon,
        or a comparable media specifically rated for chloramines, is what the job actually calls for.
      </p>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
        If a quote lists a carbon prefilter with no mention of chloramines, that is worth one question before you sign.
      </p>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
        Flow rate matters too. Contact time is what does the work, so a filter that is undersized for your house is
        decoration.
      </p>

      <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">What we are not saying</h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
        Consider a prefilter. That is the strength of the claim.
      </p>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
        This is not a lab result for your tap, it is a general note about the disinfectant the city describes using. It
        is not a health warning and it is not medical advice. Chloramines are a standard, approved municipal disinfectant
        used across the country.
      </p>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
        We are also not steering you toward a specific product before you know your hardness band. Sizing comes first.
        Protection comes second.
      </p>

      <h2 className="mt-10 text-2xl font-semibold tracking-tight text-ink">If you want the specifics for your house</h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
        The {formatUsd(WATER_SPEC.priceUsd)} spec includes a consider or skip call on a chloramine rated prefilter based
        on your setup, along with the softener sizing math and the questions to ask a contractor.
      </p>
      <WaterCtaRow showSpec />

      <SourceBlock />
    </WaterPageFrame>
  );
}
