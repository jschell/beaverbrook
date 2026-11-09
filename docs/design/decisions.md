# Design decision register

**Reviewed:** 2026-11-09. **Status:** documentation baseline imported for review, not production approval.

“Inherited direction” means carried from the dedicated source notes. “Recommended” means a proposal still awaiting selection and later testing. This register reconciles the documents without claiming that playtests have occurred.

## Inherited design direction

| Area | Direction | Reason / source |
|---|---|---|
| Player promise | Establish a safe, provisioned family home through observation and adaptation | [Brief](design-brief.md); construction is a means to that goal |
| Audience and format | Ages ~8–10+ and adults; desktop/mobile browser; short scenarios | Brief; accessibility and depth come from interacting rules |
| Defining hook | Read the river before building | [River Sense](river-sense-and-shelters.md) |
| Shelter choice | Freestanding lodge, bank den, or relocate; dam only where suitable | No global “middle is safer” or “bank is weaker” rule |
| Fair information | All essential danger clues inspectable at novice level | Expertise adds interpretation, never permission to avoid disaster |
| Progression | Observation and reviewed outcomes improve support | No generic XP grind; physical rules stay consistent |
| Interaction | Proposed top-down map, inspect/preview/confirm, bounded work, explicit advance | Task assignment preferred; exact control model remains open |
| Outcome model | Deterministic actions/weather; explain causes; recover after mistakes | [Core mechanics](core-mechanics.md) |
| Ecology | Site-specific tradeoffs; healthy undammed reaches need no automatic intervention | [Progression and ecology](progression-and-ecology.md) |
| Science communication | Optional journal separates nature, interpretation and game abstraction | Claims need species/site verification before publication |
| Platform preference | Offline-first, local saves, simple static browser stack | Preference inherited; no framework or rendering selection made |

## Experiment and scope choices

| Scope | Proposed contents | Status |
|---|---|---|
| Experiment A: River Sense | Riverbank Refuge; three candidate sites, three clue classes, den/lodge, authored flood, recovery | Recommended first; not yet selected for implementation |
| Experiment B: dam/water | First Creek; small fixed terrain, dam segments, connected water preview, depth and vegetation tradeoff | Separate experiment |
| Integrated MVP | One or two authored scenarios, unified UI, basic shelter/dam/resource systems, save/offline/accessibility | Conditional on both experiments; not committed scope |
| Later | Generations, bank lodge as third type, procedural maps, river networks, complex ecology and autonomous family AI | Deferred |

## Reconciliation of older and newer notes

| Tension | Interpretation used here |
|---|---|
| Original concept starts with a dam and wetland | Newer brief expands the goal to appropriate shelter, including no dam or relocation |
| Earlier gameplay spec calls First Creek the first scenario | Keep First Creek for water experiment B; Riverbank Refuge is the recommended River Sense experiment A |
| Earlier MVP includes family/seasons and several events | Use the newer split-experiment boundary; do not import all early MVP items |
| Concept suggests 3–4 wildlife indicators; gameplay spec uses two | No wildlife system in A. Integrated indicator count remains open |
| Collection mentions 5–15-minute sessions; shared guidance uses 10–20 | Treat Riverbank Refuge's 10–15-minute target as the scenario target, to validate |
| Campaign order differs among explorations | Campaign is later; no chapter order is committed |
| Worked example spends “food-equivalent travel units” | Illustrative only; food is a separate reserve. Decide travel cost before defining scenario budgets |
| Authored seasonal stage versus basin-fill water | Different models for separate experiments; integration requires an explicit boundary and consistency rules |
| Mature beavers interpret clues better, yet tutorial needs fair warnings | Baseline clues and essential risk feedback remain available; advanced support must not solve the whole choice |
| Side-channel success has an “optional” low-water check | Low-water access is a base success requirement; its evaluation cannot be optional if claiming success. Exact placement/stage rules remain open |

## Gameplay audit status — 2026-11-09

The [gameplay design review](../reviews/gameplay-design-review.md) records 21 open gaps in the imported baseline. It finds that the intended B/C tradeoff, successful-path decision sequence, turn economy and recovery rules are not specified sufficiently to evaluate gameplay. This is a documentation assessment, not a playtest result.

No new gameplay mechanics have been selected by the review. The [five-packet design work plan](../reviews/gameplay-design-work-plan.md) is recommended follow-up. Inherited directions and the A/B experiment split above remain proposed.

## Resolution options — 2026-11-09

Added [core scenario options](riverbank-refuge-resolution-options.md) and [supporting gameplay options](supporting-gameplay-options.md). They document candidate packages rather than changing the baseline. In particular, fewer resources, fixed novice capability and staged time are recommendations that would require reconciliation with the inherited rules if selected.

Status: alternatives documented for G01–G21; selection, scenario specification and paper walkthroughs pending. No gap is closed and no additional gameplay subsystem is committed.

## Paper candidate v0.1 — 2026-11-09

Created [concrete candidate rules](riverbank-refuge-paper-candidate.md) and [walkthroughs](riverbank-refuge-paper-walkthroughs.md). This instantiates the recommended package for design evaluation; it does not assert user selection or production approval.

Within this candidate only: finite preparation/recovery stages; W/S resource abstraction; fixed novice; authored entrance slots; checklist victory; bounded relocation-only tutorial aid. New optional early nook/later reserve outcomes make timing matter and remain especially provisional.

The candidate rule sheet governs its named walkthroughs. Earlier baseline and options remain available for comparison. G01–G10/G15 now have candidate specification evidence; all findings remain open pending review and appropriate testing.

## Current direction and authorization

The user authorized the basic playable experiment on 2026-11-09; Riverbank Refuge is implemented. The earlier documentation-only boundary is superseded for that experiment.

The user subsequently directed initial gameplay toward material collection, dam building, an associated lodge and useful supporting items. [First Creek gathering/building design](first-creek-gathering-and-building.md) develops this next-slice direction. Treat source yields, transport formulas and recipes as proposals; the existing playtest is unchanged by this design update. River Sense supports the building loop, and unsuitable-river/no-dam scenarios remain later content.
