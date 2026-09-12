import { plantPageMetadata } from "@/components/water/WaterPlantPage";
import WaterPlantPage from "@/components/water/WaterPlantPage";

const LAST_REVIEWED = "2026-09-12";

export const metadata = plantPageMetadata("southlake");

export default function GeorgetownSouthlakeWaterPage() {
  return <WaterPlantPage plantKey="southlake" lastReviewed={LAST_REVIEWED} />;
}
