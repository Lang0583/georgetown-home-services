export type HowToStepInput = { name: string; text: string };

type HowToDefinition = {
  name: string;
  description: string;
  steps: HowToStepInput[];
  /** ISO 8601 duration, e.g. PT45M */
  totalTime?: string;
};

function stripHowToHtml(s: string): string {
  return s
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function stepNameAndText(plain: string): HowToStepInput {
  const dot = plain.indexOf(". ");
  if (dot >= 12 && dot <= 120) {
    return { name: plain.slice(0, dot).trim(), text: plain };
  }
  const em = plain.indexOf("—");
  if (em >= 12 && em <= 100) {
    return { name: plain.slice(0, em).trim(), text: plain };
  }
  const maxName = 88;
  if (plain.length <= maxName) return { name: plain, text: plain };
  return { name: `${plain.slice(0, maxName - 1).trim()}…`, text: plain };
}

/**
 * When a post is not in {@link BLOG_HOWTO}, detect an instructional block:
 * `<h2>` whose text suggests steps, immediately followed by `<ol>` or `<ul>` with 3+ items.
 */
export function extractHowToFromArticleHtml(
  html: string,
  fallbackName: string,
  fallbackDescription: string,
): HowToDefinition | null {
  if (!html) return null;
  const re = /<h2\b[^>]*>([\s\S]*?)<\/h2>\s*<(ol|ul)\b[^>]*>([\s\S]*?)<\/\2>/gi;
  const headingSignals =
    /step|checklist|how to|winteriz|first checks|safe homeowner|after a hail|what to do|take after/i;

  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    const headingText = stripHowToHtml(m[1]);
    if (!headingSignals.test(headingText)) continue;
    const listInner = m[3];
    const liRe = /<li\b[^>]*>([\s\S]*?)<\/li>/gi;
    const steps: HowToStepInput[] = [];
    let lm: RegExpExecArray | null;
    while ((lm = liRe.exec(listInner)) !== null) {
      const plain = stripHowToHtml(lm[1]);
      if (plain.length < 12) continue;
      steps.push(stepNameAndText(plain));
    }
    if (steps.length >= 3) {
      return {
        name: headingText.slice(0, 140) || fallbackName.slice(0, 140),
        description: (fallbackDescription || headingText).slice(0, 600),
        steps,
      };
    }
  }
  return null;
}

function howToToJsonLd(def: HowToDefinition, pageUrl: string): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: def.name,
    description: def.description,
    ...(def.totalTime ? { totalTime: def.totalTime } : {}),
    mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
    step: def.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

/** Curated HowTo steps for instructional posts (visible article stays source of truth). */
const BLOG_HOWTO: Record<string, HowToDefinition> = {
  "how-to-choose-reliable-plumber-georgetown-tx": {
    name: "How to choose a reliable plumber in Georgetown, TX",
    description:
      "Homeowner checklist: verify credentials, compare written scopes, and shortlist licensed Georgetown-area plumbers before you hire.",
    totalTime: "PT45M",
    steps: [
      {
        name: "Confirm Texas licensing and insurance",
        text: "Ask for license numbers and proof of liability coverage before anyone starts work, and verify plumbers are active for residential service in your area.",
      },
      {
        name: "Describe the symptom clearly",
        text: "Note what changed, when it happens, and any safety concerns (sparks, gas odor, major active leak). Photos and dates help providers quote accurately.",
      },
      {
        name: "Request written estimates from multiple companies",
        text: "Compare at least two or three Georgetown plumbers from a trusted directory; align scopes line-by-line instead of chasing the lowest phone quote.",
      },
      {
        name: "Ask how they price and what voids the quote",
        text: "Clarify trip or diagnostic fees, after-hours rules, and what assumptions could change price once a wall or slab is opened.",
      },
      {
        name: "Watch for red flags",
        text: "Be cautious with all-cash-only demands, refusal to put scope in writing, pressure to skip permits when code requires them, or bids far below peers with no explanation.",
      },
    ],
  },
  "after-hail-roof-checklist-georgetown-tx": {
    name: "After-hail roof checklist for Georgetown, TX homeowners",
    description:
      "Ground-level-first documentation and next steps after Williamson County hail—before you climb or sign a door-knocker contract.",
    totalTime: "PT30M",
    steps: [
      {
        name: "Stay off wet or steep roofs",
        text: "Use binoculars and safe angles from the ground until storms pass and a licensed roofer can walk the slope with proper fall protection.",
      },
      {
        name: "Photograph soft metals and gutters",
        text: "Capture mailboxes, painted flashing, gutter faces, and downspout grit piles—date-stamped wide shots plus close-ups help carriers and roofers align timing.",
      },
      {
        name: "Log interior changes after the next rain",
        text: "Note new ceiling spots, closet drips, or bathroom vent moisture with dates; HVAC condensate issues can mimic roof leaks.",
      },
      {
        name: "Get two independent written scopes",
        text: "Shortlist Georgetown roofers from a vetted directory and compare line items (flashing, valleys, decking allowances) before you commit.",
      },
      {
        name: "File timely insurance notice if appropriate",
        text: "Read your wind/hail deductible, photograph damage before temporary tarping when safe, and keep adjuster communications organized.",
      },
    ],
  },
  "water-heater-not-working-georgetown-tx": {
    name: "What to check if your water heater stops working (Georgetown, TX)",
    description:
      "Safe homeowner sequence before you call a plumber—power, pilot or ignition, reset, and obvious leak checks in hard-water conditions.",
    totalTime: "PT20M",
    steps: [
      {
        name: "Check power, gas, and breaker",
        text: "Confirm the water heater breaker is on, the disconnect is seated, and—for gas units—that supply valves are on and you’re not smelling gas.",
      },
      {
        name: "Verify thermostat setpoints and vacation modes",
        text: "Make sure the thermostat wasn’t turned down, bumped to pilot-only, or left in an efficiency mode after guest weeks.",
      },
      {
        name: "Reset according to manufacturer guidance",
        text: "Use the printed reset procedure for your tank or tankless model; avoid repeated resets if you smell combustion issues.",
      },
      {
        name: "Look for active leaks or pooled water",
        text: "Scan the pan, T&P discharge, and connections; active leaks or scalding risk mean it’s time to stop DIY and call a licensed plumber.",
      },
      {
        name: "Call a pro if symptoms persist",
        text: "Persistent no-hot, error codes, rumbling with rust, or age past typical service life often need diagnosis—not another DIY part swap.",
      },
    ],
  },
  "ac-not-cooling-georgetown-tx": {
    name: "AC not cooling: first checks for Georgetown, TX homes",
    description:
      "Safe homeowner checks—filter, airflow, thermostat, and condenser clearance—before you call HVAC for a no-cool day.",
    totalTime: "PT25M",
    steps: [
      {
        name: "Confirm thermostat mode and setpoint",
        text: "Verify cool mode, fan behavior, schedules, and that the target temperature is truly below room temperature.",
      },
      {
        name: "Replace or clean a loaded filter",
        text: "Heavy pollen weeks in Central Texas choke low returns fast; restore airflow before assuming low refrigerant.",
      },
      {
        name: "Walk supply registers and major returns",
        text: "Feel for weak airflow, hot rooms on long duct runs, or dampers accidentally closed after attic work.",
      },
      {
        name: "Clear debris around the outdoor unit",
        text: "Remove mulch, cottonwood, or furniture blocking the condenser; keep several feet of clearance for airflow.",
      },
      {
        name: "Call HVAC if ice, burning smell, or warm air persists",
        text: "Frozen coils, electrical odors, or water from unexpected places warrant a licensed diagnostic—don’t force the system to run.",
      },
    ],
  },
  "why-your-ac-is-not-cooling-georgetown-tx": {
    name: "Why your AC may not be cooling in Georgetown, TX",
    description:
      "Narrow common causes—airflow, charge, controls, and component wear—in Central Texas heat.",
    totalTime: "PT25M",
    steps: [
      {
        name: "Rule out airflow restrictions first",
        text: "Dirty filters, collapsed flex, or closed returns mimic low-charge symptoms but are cheaper to fix.",
      },
      {
        name: "Listen for start-up failures",
        text: "Clicking hums without compressor start can indicate capacitor or contactor issues common after heat waves.",
      },
      {
        name: "Check for ice on the indoor coil line set",
        text: "Visible ice often means airflow or metering problems—turn the system off to thaw and avoid liquid slugging.",
      },
      {
        name: "Note thermostat wiring and sensor placement",
        text: "Sensors in unusually cool halls can satisfy the stat while western rooms bake.",
      },
      {
        name: "Schedule measured diagnostics if problems continue",
        text: "Ask for temperature splits and static pressure readings, not only a refrigerant top-off.",
      },
    ],
  },
};

export function buildBlogHowToJsonLd(opts: {
  slug: string;
  pageUrl: string;
  /** Post title — used as fallback HowTo name for HTML-extracted steps. */
  title?: string;
  /** Meta / deck — used as HowTo description when extracting from HTML. */
  description?: string;
  /** Generated article HTML (enables auto HowTo for step lists not in `BLOG_HOWTO`). */
  html?: string | null;
}): Record<string, unknown> | null {
  const curated = BLOG_HOWTO[opts.slug];
  if (curated) return howToToJsonLd(curated, opts.pageUrl);

  const extracted =
    opts.html != null && opts.html.length > 0
      ? extractHowToFromArticleHtml(opts.html, opts.title ?? "How-to guide", opts.description ?? "")
      : null;
  if (extracted) return howToToJsonLd(extracted, opts.pageUrl);
  return null;
}
