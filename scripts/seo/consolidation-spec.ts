/**
 * Consolidation spec — operator fills this in after reviewing
 * `.reports/consolidation-proposal.md`.
 *
 * Each `Merge` declares one or more source URLs that should 308 to a target
 * URL. The `apply-consolidation.ts` script uses this list to generate exact
 * diffs against `next.config.ts` and `lib/public-site-scope.ts`. Nothing in
 * the codebase is mutated until the operator copies the diff in.
 *
 * The default export is intentionally empty so a stale spec never silently
 * applies redirects you didn't approve. Edit before running
 * `npm run seo:consolidate:patch`.
 *
 * Notes:
 *   - URLs must be paths (e.g. "/services/foo"), not absolute URLs.
 *   - Sources currently supported: `/services/*` and `/locations/*`. Other
 *     paths are accepted but won't get auto-added to the slug-set helpers in
 *     `public-site-scope.ts` (you'd need to extend that file).
 *   - The target URL must already resolve (i.e. the hub page exists).
 *   - Targets and sources must not collide with existing redirects.
 */

export type Merge = {
  /** Short identifier for this merge group, used in the patch headings. */
  id: string;
  /** Human-readable trade or topic, e.g. "Roofing services". */
  trade: string;
  /** Absolute path to the hub. Must already exist on the site. */
  target: string;
  /** Absolute path of each source URL to redirect. */
  sources: string[];
  /** Optional reviewer note explaining the merge rationale. */
  note?: string;
};

/**
 * Phase 1 thin-content consolidation — applied in response to:
 *   - AdSense "Low value content" policy violation
 *   - GSC "Discovered – currently not indexed" on ~67 URLs
 *
 * 22 service URLs (87–142 words each) collapsed into 3 trade hubs. Hubs
 * `roofer-georgetown-tx` (617w), `hvac-georgetown-tx` (643w), and
 * `plumber-georgetown-tx` (767w) are below the desired ~1,500-word
 * threshold and are scheduled for substantive Phase 3 rewrite.
 *
 * The redirects and slug-set entries from these merges are already wired
 * into `next.config.ts` and `lib/public-site-scope.ts`. This spec is kept
 * as the documented record of what was applied; running
 * `npm run seo:consolidate:patch` against it will print the same diffs
 * (no-op against the current code).
 *
 * To consolidate additional clusters: append a new `Merge` entry, run the
 * patch generator, review `.reports/consolidation-patch.md`, then apply.
 */
const merges: Merge[] = [
  {
    id: "roofing",
    trade: "Roofing services",
    target: "/services/roofer-georgetown-tx",
    sources: [
      "/services/roof-repair-georgetown-tx",
      "/services/roof-replacement-georgetown-tx",
      "/services/shingle-roof-repair-georgetown-tx",
      "/services/flashing-repair-georgetown-tx",
      "/services/gutter-installation-georgetown-tx",
      "/services/storm-damage-roof-repair-georgetown-tx",
      "/services/hail-damage-roof-repair-georgetown-tx",
      "/services/emergency-roof-tarping-georgetown-tx",
    ],
    note: "Hub roofer-georgetown-tx is also flagged thin (617w). Phase 3 rewrite to ~1,500w required to absorb the consolidated topical signal.",
  },
  {
    id: "hvac",
    trade: "HVAC services",
    target: "/services/hvac-georgetown-tx",
    sources: [
      "/services/ac-repair-georgetown-tx",
      "/services/ac-replacement-georgetown-tx",
      "/services/furnace-repair-georgetown-tx",
      "/services/heater-repair-georgetown-tx",
      "/services/hvac-maintenance-georgetown-tx",
      "/services/ductwork-repair-georgetown-tx",
      "/services/thermostat-repair-georgetown-tx",
      "/services/indoor-air-quality-georgetown-tx",
    ],
    note: "Hub hvac-georgetown-tx is also flagged thin (643w). Phase 3 rewrite to ~1,500w required.",
  },
  {
    id: "plumbing",
    trade: "Plumbing services",
    target: "/services/plumber-georgetown-tx",
    sources: [
      "/services/water-heater-replacement-georgetown-tx",
      "/services/leak-detection-georgetown-tx",
      "/services/toilet-repair-georgetown-tx",
      "/services/garbage-disposal-repair-georgetown-tx",
      "/services/sewer-line-repair-georgetown-tx",
      "/services/emergency-plumber-georgetown-tx",
    ],
    note: "Hub plumber-georgetown-tx is at 767w (closest to 1,500w threshold of the three hubs). Still needs Phase 3 expansion.",
  },
];

export default merges;
