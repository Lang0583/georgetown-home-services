export type LeadMagnetKey = "seasonal_checklist" | "monthly_reminder" | "local_cost_guide";

export const LEAD_MAGNETS: Record<
  LeadMagnetKey,
  { key: LeadMagnetKey; title: string; shortLabel: string; description: string }
> = {
  seasonal_checklist: {
    key: "seasonal_checklist",
    title: "Georgetown Homeowner Seasonal Maintenance Checklist",
    shortLabel: "Seasonal checklist",
    description: "A seasonal checklist for plumbing, HVAC, and roofing in Georgetown, TX.",
  },
  monthly_reminder: {
    key: "monthly_reminder",
    title: "Monthly Georgetown Home Maintenance Reminder",
    shortLabel: "Monthly reminder",
    description: "A low-frequency monthly reminder with simple maintenance actions.",
  },
  local_cost_guide: {
    key: "local_cost_guide",
    title: "Local Cost Guide: Plumbing, HVAC, and Roofing in Georgetown",
    shortLabel: "Local cost guide",
    description: "Cost drivers, common ranges, and what to ask before you compare estimates.",
  },
};

