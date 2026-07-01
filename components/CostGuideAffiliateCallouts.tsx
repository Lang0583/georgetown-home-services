import AffiliateCallout from "./AffiliateCallout";
import { affiliateCalloutsForCostGuide, affiliateOfferById } from "../data/affiliates";

type CostGuideAffiliateCalloutsProps = {
  slug: string;
};

export default function CostGuideAffiliateCallouts({ slug }: CostGuideAffiliateCalloutsProps) {
  const callouts = affiliateCalloutsForCostGuide(slug);
  if (callouts.length === 0) return null;

  return (
    <div className="mt-10 max-w-3xl space-y-6">
      {callouts.map((callout) => {
        const offer = affiliateOfferById(callout.offerId);
        if (!offer) return null;
        return (
          <AffiliateCallout key={callout.offerId} offer={offer} justification={callout.justification} />
        );
      })}
    </div>
  );
}
