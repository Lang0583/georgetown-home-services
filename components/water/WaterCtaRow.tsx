import { ButtonLink } from "@/components/Button";
import { WATER_SPEC, formatUsd } from "@/data/water";

type Props = {
  showLookup?: boolean;
  showSpec?: boolean;
  showPlumbers?: boolean;
};

export default function WaterCtaRow({ showLookup = false, showSpec = false, showPlumbers = false }: Props) {
  return (
    <div className="mt-6 flex flex-wrap items-center gap-3">
      {showLookup ? (
        <ButtonLink href="/water/spec" className="text-sm">
          Free plant lookup
        </ButtonLink>
      ) : null}
      {showSpec ? (
        <ButtonLink href="/water/spec" className="text-sm">
          Get the {formatUsd(WATER_SPEC.priceUsd)} spec
        </ButtonLink>
      ) : null}
      {showPlumbers ? (
        <ButtonLink href="/plumbing" className="text-sm">
          See license verified plumbers
        </ButtonLink>
      ) : null}
    </div>
  );
}
