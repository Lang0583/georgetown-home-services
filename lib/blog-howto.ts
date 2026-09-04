/**
 * Curated HowTo steps for how-to / checklist blog posts.
 * Only emit HowTo JSON-LD when these steps are also summarized on-page.
 */

export type BlogHowTo = {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
};

const BLOG_HOWTOS: Record<string, BlogHowTo> = {
  "after-hail-roof-checklist-georgetown-tx": {
    name: "After-hail roof checklist for Georgetown, TX homeowners",
    description:
      "Ground-level safety checks, insurance photos, and how to compare roofer scopes after Williamson County hail.",
    steps: [
      {
        name: "Wait for safe conditions",
        text: "Stay off the roof until lightning risk drops and surfaces are no longer slick. Do a ground-level walk first.",
      },
      {
        name: "Document from the ground",
        text: "Photograph elevations, gutters, window screens, and outdoor HVAC coils with timestamps for insurance.",
      },
      {
        name: "Book a documented inspection",
        text: "Schedule a licensed local roofer for photos and a written scope before the next heavy rain.",
      },
      {
        name: "Compare written scopes",
        text: "Line-item squares, underlayment, vents/boots, and dumpster fees—keep each company’s gallery separate.",
      },
    ],
  },
  "how-to-choose-a-reliable-plumber-georgetown-tx": {
    name: "How to choose a reliable plumber in Georgetown, TX",
    description:
      "License, insurance, written scopes, and local slab/hard-water checks before you authorize plumbing work.",
    steps: [
      {
        name: "Verify the Responsible Master Plumber",
        text: "Ask for the TSBPE RMP license number and confirm it on the public TSBPE search before work starts.",
      },
      {
        name: "Get two written estimates",
        text: "Require line items for trip/diagnostic fees, labor, parts, permits, and what restoration is excluded.",
      },
      {
        name: "Ask about local failure modes",
        text: "Discuss hard-water scale, slab leaks, and camera inspections for recurring backups in Georgetown subdivisions.",
      },
      {
        name: "Confirm insurance and after-hours terms",
        text: "Request proof of liability insurance and clarify emergency premiums before an after-hours dispatch.",
      },
    ],
  },
  "signs-you-need-hvac-repair-georgetown-tx": {
    name: "Signs you need HVAC repair in Georgetown, TX",
    description:
      "What Georgetown homeowners should check before calling for AC repair in Central Texas heat.",
    steps: [
      {
        name: "Check airflow and filters",
        text: "Replace dirty filters and confirm vents are open before assuming a compressor failure.",
      },
      {
        name: "Note the symptom pattern",
        text: "Record whether the issue is no-cool, short-cycling, ice on lines, or unusual noise—and when it started.",
      },
      {
        name: "Call for diagnosis on peak heat days",
        text: "If the home cannot hold setpoint in triple-digit weather, schedule a licensed TDLR HVAC tech promptly.",
      },
      {
        name: "Get a written repair vs replace recommendation",
        text: "Ask for refrigerant type, part costs, and whether repair is economical given system age.",
      },
    ],
  },
  "signs-you-may-need-a-new-roof-georgetown-tx": {
    name: "Signs you may need a new roof in Georgetown, TX",
    description:
      "Storm and wear indicators Williamson County homeowners should document before replacement bids.",
    steps: [
      {
        name: "Inspect from the ground after storms",
        text: "Look for missing tabs, granule piles in gutters, and dented soft metals after hail.",
      },
      {
        name: "Check interior clues",
        text: "Note ceiling stains, attic daylight, or musty smells that suggest moisture entry.",
      },
      {
        name: "Hire a documented inspection",
        text: "Get photos and a written scope—not a verbal “you need a new roof” with no evidence.",
      },
      {
        name: "Compare repair vs replacement scopes",
        text: "Ask whether damage is isolated or widespread enough that replacement is the clearer path.",
      },
    ],
  },
};

export function blogHowToForSlug(slug: string): BlogHowTo | null {
  return BLOG_HOWTOS[slug] ?? null;
}
