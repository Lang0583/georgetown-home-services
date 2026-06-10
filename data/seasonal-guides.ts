import type { TexasSeason } from "@/lib/texas-seasons";

export type SeasonalTaskGroup = {
  trade: string;
  href?: string;
  items: string[];
};

export type SeasonalGuide = {
  season: TexasSeason;
  label: string;
  monthsLabel: string;
  headline: string;
  intro: string;
  tasks: SeasonalTaskGroup[];
  /** Shown on hub + PDF — prep for the season that follows this one */
  prepForNext: {
    nextSeason: TexasSeason;
    heading: string;
    items: string[];
  };
  pdfFilename: string;
  relatedLinks: { label: string; href: string }[];
};

const SEASONAL_GUIDES: SeasonalGuide[] = [
  {
    season: "spring",
    label: "Spring",
    monthsLabel: "March–May",
    headline: "Spring home maintenance in Georgetown, TX",
    intro:
      "Central Texas spring means pollen, first 90°F days, and hail season ramping up. Use this window to test cooling, clear winter debris, and document roof and HVAC condition before summer load hits Sun City and Wolf Ranch hardest.",
    tasks: [
      {
        trade: "HVAC",
        href: "/services/hvac-georgetown-tx",
        items: [
          "Run a cooling cycle before the first heat wave; note weak airflow, odd smells, or warm supply air.",
          "Replace or wash the filter; cedar pollen clogs filters faster than many owners expect.",
          "Clear leaves and pollen from the outdoor condenser—keep 2–3 feet of side clearance.",
        ],
      },
      {
        trade: "Roofing",
        href: "/services/roofer-georgetown-tx",
        items: [
          "Walk the roofline from the ground after storms; look for lifted shingles, dented vents, and gutter overflow.",
          "Check downspouts for granule grit after rain—a sign of shingle wear or recent hail bruising.",
          "Photograph soft metals (mailbox, gutter strip) if hail passes Williamson County.",
        ],
      },
      {
        trade: "Plumbing",
        href: "/services/plumbing-georgetown-tx",
        items: [
          "Exercise the main water shutoff gently; label it if guests or renters are in the home.",
          "Inspect hose bibs and irrigation lines after the last freeze risk—slow leaks often show up first on the bill.",
          "Flush rarely used guest baths in Sun City to keep traps full.",
        ],
      },
      {
        trade: "Landscaping",
        href: "/services/landscaping-georgetown-tx",
        items: [
          "Tune irrigation for spring rains—overwatering on clay soil stresses foundations.",
          "Trim branches away from the roof and siding before summer storms.",
        ],
      },
    ],
    prepForNext: {
      nextSeason: "summer",
      heading: "Prep for Georgetown summer (June–August)",
      items: [
        "Book an AC tune-up if cooling struggled last July—calendars fill before triple-digit weeks.",
        "Stock spare filters and know your filter size before peak season.",
        "Confirm attic insulation and door seals; hot upstairs rooms are often airflow, not just equipment age.",
        "Budget for repairs vs replacement using our HVAC repair cost guide before peak summer pricing.",
      ],
    },
    pdfFilename: "georgetown-spring-home-checklist.pdf",
    relatedLinks: [
      { label: "HVAC repair cost guide", href: "/costs/hvac-repair-cost-georgetown-tx" },
      { label: "After-hail roof checklist", href: "/blog/after-hail-roof-checklist-georgetown-tx" },
      { label: "Full-year seasonal checklists", href: "/seasonal#email-capture" },
    ],
  },
  {
    season: "summer",
    label: "Summer",
    monthsLabel: "June–August",
    headline: "Summer home maintenance in Georgetown, TX",
    intro:
      "Georgetown summers punish HVAC systems and dry out clay soil around slabs. Focus on cooling reliability, moisture control, and foundation perimeter watering—not heroics on the roof during afternoon heat.",
    tasks: [
      {
        trade: "HVAC",
        href: "/services/hvac-georgetown-tx",
        items: [
          "Replace filters on schedule—often monthly when the system runs near continuously.",
          "Clear condensate drain lines; algae clogs cause ceiling stains that look like roof leaks.",
          "If one room never catches up, ask about airflow and duct boots before buying a bigger AC.",
        ],
      },
      {
        trade: "Foundation",
        href: "/services/foundation-repair-georgetown-tx",
        items: [
          "Maintain even soil moisture around the slab—soaker hoses on a timer beat flooding one side.",
          "Note new sticking doors or diagonal cracks after dry spells; document with photos and dates.",
          "Keep gutters flowing so summer downpours do not dump against the foundation.",
        ],
      },
      {
        trade: "Plumbing",
        href: "/services/plumbing-georgetown-tx",
        items: [
          "Watch the water bill for unexplained jumps—irrigation leaks and slab supply lines show here first.",
          "Insulate exposed pipes in hot attics and garages where cold-water lines can sweat heavily.",
        ],
      },
      {
        trade: "Pest control",
        href: "/services/pest-control-georgetown-tx",
        items: [
          "Fire ants and scorpions peak in warm months—check entry gaps at weep holes and garage doors.",
          "Reduce standing water in saucers and drains to limit mosquitoes.",
        ],
      },
    ],
    prepForNext: {
      nextSeason: "fall",
      heading: "Prep for Georgetown fall (September–November)",
      items: [
        "Schedule heating check before the first cold snap—furnace and heat-pump calls stack in October.",
        "Plan gutter cleaning after early leaf drop; clogged valleys cause interior stains in Teravista and Berry Creek.",
        "Trim trees away from the roof before fall storms and inspect flashing at penetrations.",
        "Compare HVAC tune-up pricing in our maintenance cost guide before calendars fill.",
      ],
    },
    pdfFilename: "georgetown-summer-home-checklist.pdf",
    relatedLinks: [
      { label: "AC not cooling guide", href: "/blog/ac-not-cooling-georgetown-tx" },
      { label: "HVAC maintenance costs", href: "/costs/hvac-maintenance-cost-georgetown-tx" },
      { label: "Foundation repair guide", href: "/services/foundation-repair-georgetown-tx" },
    ],
  },
  {
    season: "fall",
    label: "Fall",
    monthsLabel: "September–November",
    headline: "Fall home maintenance in Georgetown, TX",
    intro:
      "Fall is the practical season in Williamson County: cool enough for roof and gutter work, dry enough to address HVAC heating mode, and the right time to prep hose bibs before the first hard freeze.",
    tasks: [
      {
        trade: "HVAC",
        href: "/services/hvac-georgetown-tx",
        items: [
          "Schedule heating mode check—flame sensors and heat exchanger issues show up on the first cold night.",
          "Replace filter after pollen season; vacuum return grilles if dusty.",
        ],
      },
      {
        trade: "Roofing",
        href: "/services/roofer-georgetown-tx",
        items: [
          "Clean gutters and downspouts; verify extensions discharge away from the slab.",
          "From the attic hatch, look for daylight at penetrations or damp insulation after rain.",
          "Compare any hail documentation from spring—fall is a good window for planned replacement.",
        ],
      },
      {
        trade: "Plumbing",
        href: "/services/plumbing-georgetown-tx",
        items: [
          "Drain and shut off hose bibs; insulate exposed lines on pier-and-beam homes.",
          "Flush water heater sediment if your model recommends it—hard water builds scale in Georgetown.",
        ],
      },
      {
        trade: "Electrical",
        href: "/services/electrician-georgetown-tx",
        items: [
          "Test GFCI outlets in kitchens, baths, garage, and exterior.",
          "If you run space heaters, confirm circuits are not overloaded—portable heat is a common trip source.",
        ],
      },
    ],
    prepForNext: {
      nextSeason: "winter",
      heading: "Prep for Georgetown winter (December–February)",
      items: [
        "Locate main water shutoff and hose bib shutoffs before a freeze watch.",
        "Stock pipe insulation, faucet covers, and know which rooms have pipes on exterior walls.",
        "Test smoke and CO detectors; heating season increases carbon monoxide risk.",
        "Review foundation crack warning signs if new gaps appeared after the dry summer soil cycle.",
      ],
    },
    pdfFilename: "georgetown-fall-home-checklist.pdf",
    relatedLinks: [
      { label: "Roof repair costs", href: "/costs/roof-repair-cost-georgetown-tx" },
      { label: "Signs you need a new roof", href: "/blog/signs-you-may-need-a-new-roof-georgetown-tx" },
      { label: "Plumber cost guide", href: "/costs/plumber-cost-georgetown-tx" },
    ],
  },
  {
    season: "winter",
    label: "Winter",
    monthsLabel: "December–February",
    headline: "Winter home maintenance in Georgetown, TX",
    intro:
      "Georgetown winters are mild compared to the north, but freeze events still burst pipes and ice storms still damage roofs. Focus on freeze prep in late winter and safe documentation after wind or ice—not climbing slick slopes.",
    tasks: [
      {
        trade: "Plumbing",
        href: "/services/plumber-georgetown-tx",
        items: [
          "On freeze warnings, drip faucets and open cabinet doors on exterior-wall sinks.",
          "Know where to shut off water at the meter or main—Sun City guests may need labeled instructions.",
          "After a thaw, check for low pressure or stains that suggest a split line.",
        ],
      },
      {
        trade: "HVAC",
        href: "/services/hvac-georgetown-tx",
        items: [
          "If heat pump runs constantly without warming, schedule service—refrigerant and defrost issues are common.",
          "Replace filter after heavy heating weeks; dry air increases static and dust load.",
        ],
      },
      {
        trade: "Roofing",
        href: "/services/roofer-georgetown-tx",
        items: [
          "After ice or wind, scan from the ground for lifted tabs, damaged flashing, or new interior stains.",
          "Keep gutters clear so winter rains do not back up under shingles.",
        ],
      },
      {
        trade: "House cleaning",
        href: "/services/house-cleaning-georgetown-tx",
        items: [
          "Hard-water film on fixtures shows more when heat runs—good time for a deep clean before spring guests.",
        ],
      },
    ],
    prepForNext: {
      nextSeason: "spring",
      heading: "Prep for Georgetown spring (March–May)",
      items: [
        "Test AC before March heat—capacitors often fail on the first hot afternoon.",
        "Clear condenser area and schedule tune-up; hail season returns in spring.",
        "Walk the roofline and photograph baseline condition before storm season.",
        "Download the spring checklist PDF below or subscribe for the full-year seasonal guide.",
      ],
    },
    pdfFilename: "georgetown-winter-home-checklist.pdf",
    relatedLinks: [
      { label: "Emergency plumber costs", href: "/blog/emergency-plumber-cost-georgetown-tx" },
      { label: "HVAC noise guide", href: "/blog/hvac-making-noise-georgetown-tx" },
      { label: "County hail reference", href: "/blog/hail-damage-georgetown-williamson-may-2026" },
    ],
  },
];

const bySeason = new Map(SEASONAL_GUIDES.map((g) => [g.season, g]));

export function getSeasonalGuide(season: TexasSeason): SeasonalGuide {
  const guide = bySeason.get(season);
  if (!guide) throw new Error(`missing seasonal guide: ${season}`);
  return guide;
}

export function getAllSeasonalGuides(): SeasonalGuide[] {
  return SEASONAL_GUIDES;
}

/** PDF sections for generator — keeps site copy and PDFs in sync */
export function seasonalGuidePdfSections(guide: SeasonalGuide) {
  return [
    {
      heading: `${guide.label} (${guide.monthsLabel}) — this season`,
      bullets: guide.tasks.flatMap((g) => g.items.map((item) => `${g.trade}: ${item}`)),
    },
    {
      heading: guide.prepForNext.heading,
      bullets: guide.prepForNext.items,
    },
  ];
}
