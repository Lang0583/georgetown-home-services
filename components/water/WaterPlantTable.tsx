import Link from "next/link";
import {
  PLANTS,
  plantGpg,
  plantMgL,
  type WaterPlant,
} from "@/data/water";

function PlantRow({ plant }: { plant: WaterPlant }) {
  return (
    <tr className="border-b border-ink/10 text-ink">
      <td className="py-2.5 pr-3 font-medium">
        <Link href={`/water/${plant.slug}`} className="text-brand hover:underline">
          {plant.label}
        </Link>
      </td>
      <td className="py-2.5 pr-3 tabular-nums">{plantMgL(plant)}</td>
      <td className="py-2.5 pr-3 tabular-nums">{plantGpg(plant)}</td>
      <td className="py-2.5">{plant.usgsClass}</td>
    </tr>
  );
}

export default function WaterPlantTable() {
  return (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-ink/15 text-muted">
            <th className="py-2 pr-3 font-semibold">Treatment plant</th>
            <th className="py-2 pr-3 font-semibold">Hardness</th>
            <th className="py-2 pr-3 font-semibold">Grains per gallon</th>
            <th className="py-2 font-semibold">USGS class</th>
          </tr>
        </thead>
        <tbody>
          <PlantRow plant={PLANTS.southlake} />
          <PlantRow plant={PLANTS.park} />
        </tbody>
      </table>
    </div>
  );
}
