# First Creek: the first dry spell — 0.3.0

Status: implemented trial scenario, authorized by the user's request to continue making the building loop interesting. This record governs the new scenario; the original 0.2.0 construction sandbox remains separately accessible. Numbers are fictional game units, not ecological predictions. Successful developer walkthroughs do not establish that the game is enjoyable.

## The question this slice tests

Can changing the creek create a decision players want to revisit? The player builds a home, sees the pond change transport, then chooses how to protect entrance access and food through one announced dry spell. Completion describes the resulting settlement rather than awarding points for exhausting a construction checklist.

The intended interest is the interaction: raising the pond protects entrance depth and improves some hauling routes, but covers the shore feeding patch; preserving a lower pond requires a deeper entrance and leaves that patch available. Cutting this patch for construction can invalidate the feeding plan. Cached food provides another recovery option.

## Trial progression

1. Preparation: gather finite wood/mud; build a sealed dam and completed lodge. Exact forecast, free hints and plan comparison are visible from arrival.
2. Prepare an approach, or deliberately advance unprepared. Advance requires a sealed dam, completed lodge, and empty carried cargo, but does not require a passing forecast. No countdown or hidden event.
3. Dry spell: pond surface falls by 0.30 immediately; downstream flow remains visible at 0.85. Routes and footprints recompute. Diagnose the named entrance/food checks and adapt with the same finite remaining sources.
4. Finish when all checks pass. Show crest, entrance, food approach, remaining shore branches and effort; offer another run. Ordinary world actions stop after finishing. Undo can reopen the run.

Undo restores entire action snapshots, including weather and completion. This is intentionally a reversible experiment, not an irreversible season simulation. New creek resets all state; reload loses the run. JSON export is local only. No automatic telemetry, XP, hunger clock, regrowth, new family AI or campaign.

## Two demonstrated approaches at the Narrows / Willow Cove

Common setup: near willow supplies 4 dam wood, fallen alder supplies the other 2 dam wood and 4 lodge wood; west mud supplies dam seals and east mud supplies lodge finish. This leaves 2 fallen wood for either upgrade. Use all three frameworks and seals, then finish the lodge. Authoring this economy makes both routes reachable without invented resources.

| Choice | Additional preparation | Dry result | Consequence |
|---|---|---|---|
| Low pond + feeding route | Deepen entrance: 3 effort, 0.35 lower. Deliver 2 wood to Lodge, establish feeding route: 2 effort | Surface 1.75, entrance depth 0.65, shore brush dry | Requires at least 2 shore-brush branches remaining; no cache required |
| High pond + cache | Deliver 2 wood + 1 mud to Dam, raise crest. Gather/deliver 2 food and finish cache | Surface 2.35, original entrance depth 0.90 | Shore feeding patch remains flooded; cached food supplies this short scenario |

Measured developer browser runs: low-pond recovery after weather used 44 effort and preserved 4 shore branches; high-pond/cache plan used 45 effort and left 2 shore branches. These are example paths, not optimality or balance claims. Timing matters: gathering/hauling after water falls can cost more.

A low pond with an original Willow Cove entrance has dry depth 0.30, below required 0.40. Deepening or raising recovers it. A feeding route needs a completed lodge, 2 locally delivered wood, at least 2 remaining shore-brush units, and an unflooded brush tile. The route is unavailable when the patch is flooded or depleted. A finished cache satisfies food readiness independently. This is an authored provision check, not ongoing animal nutrition.

The high pond blocks food harvesting from shore brush; upland living trees remain a cache fallback. Construction wood retains the sandbox collection rules. This selective availability rule is a trial abstraction, not a claim about what real beavers can eat underwater. Lowering exposes the patch again; inundation does not permanently kill it in this slice.

## Outcomes and information

All essential facts are available immediately. The scenario panel shows forecast/current dry entrance depth, threshold, brush availability, food readiness and event stage. Lodge panel distinguishes current depth from forecast depth. Pond caption shows actual surface and wet tile count. Raising/lowering, deepening, cache and route actions have explicit costs. A ready forecast is not a completed scenario; the player must advance and finish.

Water uses the existing connected upstream fill and high authored banks. Dry low/high surfaces are 1.75/2.35; preparation low/high are 2.05/2.65. Incomplete dam returns to a flowing baseline creek (normal 1.00, dry 0.85). No water-volume conservation, gradual flow, erosion or groundwater. Deepening lowers an authored entrance marker/check, not terrain excavation or a new water tile. The lodge chamber's elevation is not simulated.

Meadow Bend / Meadow Edge remain selectable; this release's two complete browser comparisons use the Narrows and Willow Cove. Wrong downstream site selection still fails entrance access. Use undo/restart to revise committed site choices. A guarantee of recovery after arbitrary depletion or repeated removal/rebuilding is outside this trial.

## Validation and next decision

34 automated tests pass. Added scenario tests exercise both finite-source plans, failed preparation with recovery, flooded/depleted feeding routes, cache fallback, one-time upgrades/weather, completion freeze, immutable forecasts and permanent downstream water. An app regression test checks controls, forecast, scene updates, finish and undo with a completed lodge. Existing renderer-success tests check real Three.js mesh state using a CPU renderer double, not GPU output.

Browser verification on the compatibility renderer completed the low-pond unprepared/recovery path, rewound the run, and completed the raised-pond/cache path. Actual water surface/coverage and food/entrance readouts changed. Native WebGL pixels and real phone testing remain unverified.

Human playtest questions remain open:

- Can a first-time player explain why their chosen plan will work before advancing?
- Does the first visible pond arrive before repeated gathering feels tedious?
- Does the player notice the changed hauling cost and feeding patch availability?
- Do they voluntarily try another plan, and can they explain what they would change?
- Are the two approaches interesting, or does the comparison panel merely give away two recipes?

Do not add more buildings or a campaign to substitute for those observations. If repetition dominates, reduce or batch delivery clicks before expanding scope. If every player chooses the same plan, revise consequences rather than hiding safety information. The claim being tested is player agency and replay interest; neither is yet validated.
