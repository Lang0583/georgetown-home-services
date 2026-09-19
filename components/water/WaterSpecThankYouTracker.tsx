"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

export default function WaterSpecThankYouTracker() {
  useEffect(() => {
    trackEvent("water_spec_thank_you", { event_category: "water" });
  }, []);
  return null;
}
