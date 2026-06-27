"use client";

import { useEffect, useState } from "react";
import { formatUpdatedMonthYear } from "../lib/updated-month-year";

type Props = {
  className?: string;
};

/**
 * Renders "Updated [Month] [Year]" from the visitor's current date (client-side)
 * so static homepage builds do not bake in a stale month.
 */
export default function UpdatedMonthYear({ className }: Props) {
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    setLabel(formatUpdatedMonthYear());
  }, []);

  return <span className={className}>{label ?? "Updated …"}</span>;
}
