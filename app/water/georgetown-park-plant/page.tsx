import { plantPageMetadata } from "@/components/water/WaterPlantPage";
import WaterPlantPage from "@/components/water/WaterPlantPage";

const LAST_REVIEWED = "2026-09-12";

export const metadata = plantPageMetadata("park");

export default function GeorgetownParkPlantWaterPage() {
  return <WaterPlantPage plantKey="park" lastReviewed={LAST_REVIEWED} />;
}
