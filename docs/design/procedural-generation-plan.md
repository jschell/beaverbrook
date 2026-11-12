# Procedural environment and scenario generation plan

Planning deliverable: complete for review, 2026-11-11 (Pacific). Implementation remains open under [#12](https://github.com/jschell/beaverbrook/issues/12). This plan extends the [scenario contract](scenario-patterns-and-outcomes.md), [parameter catalog](environment-and-resource-parameters.md), [vegetation design](vegetation-and-resource-succession.md) and [information design](exploration-and-remembered-conditions.md). [Roadmap](../ROADMAP.md): M4, with design/research available before runtime dependencies are ready.

## Purpose and scope

Generate different problems under consistent rules, not mandatory tasks with shuffled locations. A scenario defines occupied-home viability, food demand/reserve and an evaluation interval; the player chooses interventions. A low-water scenario may be solved by retention, entrance work or relocation only if those actions actually exist in that mode.

First deliverable: bounded variation on three authored reaches. Later: composed patterns, richer ecology/encounters, and finally constrained procedural terrain. Do not generate everything at once. No erosion is required. Fixed-height third-person control and local discovery remain the current main-mode basis.

## Implementation packages

| Package | Output | Dependency / gate |
|---|---|---|
| PG0: shared adapter | Pure state initialization, legal actions, simulation step, observations and outcome queries for the chosen main mode | Avoid a generator combining incompatible First Reach and Creekside rules |
| PG1: authored fixtures | Three reaches; manually selected parameters and two distinct solution traces each | Every action, cost, weather transition and observation in a trace is executable |
| PG2: bounded sampling | Seeded parameter sampler, compatibility rules, bounded retries and safe authored fallback | Same seed/version yields the same instance; reject unsupported combinations |
| PG3: evaluator and witnesses | Sustained/final predicates, budget replay, uncertainty extremes and recovery checks | Same evaluator is used by the game and validation |
| PG4: presentation and persistence | Masked forecasts, evidence, local saves/undo as supported, diagnostic export | No omniscient preview leak or regenerated stock on reload |
| PG5: varied content | Additional ecological/consumer patterns selected from supported capabilities | Recruitment/consumers/households need their own implementations first |
| PG6: terrain generation | Connected channel/valley generation plus navigation, hydrology and site validation | Authored-variation approach has demonstrated useful strategic variety |

These are planning packages, not added runtime modules.

## Initial reach set

1. Broad shallow valley: longer low barriers, shallow approach and a possible low-bank bypass. Compare modest retention plus entrance work with a larger barrier.
2. Narrow wooded creek: constrained crossing and unequal nearby/far supply. Compare supply/route investments; alternatives must change more than source order.
3. Deep bend with seasonal shallows: candidate no-dam shelter versus a constructed pond. Eligible only after founding/relocation exists in the main mode; until then retain it as an authored design fixture, not playable generated content.

For the current Creekside capability set, use only the first two families and supported depth/food strategies. Do not manufacture a third relocation solution by borrowing unintegrated First Reach behavior.

## Parameter ownership and bounds

Use named profiles with declared units, not scattered random calls. The first sampler varies source positions/capacity, initial condition, visible information and permitted weather within validated profiles. Geometry changes begin as authored variants.

| Parameter group | Constraints before sampling | Initial implementation |
|---|---|---|
| Terrain/placement | Connected creek; positive map margins; legal banks/endpoints; gaps/bypasses represented by actual solver | Current dam limit is 3–16 initial span and 18 with extension; keep these until placement changes |
| Water | Declared baseline/decline, event timing/duration and downstream supply; no imaginary velocity | Creekside currently hardcodes normal/dry timing; varying it requires a rule change through PG0 |
| Sources | Reachable patch/deposit, capacity, component yields, distance and local work | No indispensable source behind an impassable or undiscoverable route |
| Construction | Supported material types, actual depth/span costs, deposits, legal heights | Use whichever material contract is implemented, not this plan's future recipes |
| Ecology | Supported recovery model, time interval, root/age history and optional arrival sources | Current stock recovery is not recruitment or aquatic establishment |
| Knowledge | Home observation, reveal radius, stale state, clue placement and forecast bounds | Validate with player's observations, not whole-map knowledge |
| Objectives | Inclusive thresholds, occupied home, final intake/reserve, sustained duration and recovery grace | Announce them before consequential commitment |
| Events | Supported event type, warning, bounded amplitude/frequency and intake | No raids/ice/structural failure until those mechanics exist |

Defaults and numeric sampling ranges belong in versioned content profiles only after fixture replay establishes feasible bounds. Do not randomize physical constants to make a seed harder. The first implementation must commit actual profile ranges and their boundary fixtures together; inventing ranges now without legal replay would not establish balance.

Correlate width, depth, bank height and material budget. Correlate vegetation with suitable environment and source history. A scene palette may change atmosphere but must not imply unsupported soil/flow properties.

## State and content contracts

Proposed records:

- Reach template: ID/version, terrain or authored terrain reference, inlet/outlet boundaries, valid start/home regions and required capabilities.
- Pattern definition: ID/version, compatible reach tags, primary pressure, optional secondary pressure, legal parameter profiles, objective definitions and evidence rules.
- Scenario instance: instance ID, seed, generator/rules/content versions, sampled parameters, instantiated terrain, initial stock/structures/cohorts, weather schedule, knowledge state and deterministic random state.
- Objective: predicate ID, all-of/any-of/optional composition, units, scope, inclusive bounds, start/end steps, sustained duration and grace rules.
- Evidence record: causal world fact, observation location/action, disclosure policy and plain-language clue.
- Witness: legal actions, source of observations, step-by-step costs/intake/events, expected final state and strategy tag.
- Validation report: accepted/rejected, reason codes, witnesses, margins, event cases and version identifiers.

Use a small declarative predicate vocabulary; no executable expressions in content. Validate shape, then semantic constraints, then simulation replay. A valid schema alone does not prove a playable world.

Seed streams are separate for terrain/content/weather/encounters so adding decoration cannot change food or weather. Do not depend on camera position, rendering rate, object iteration order or wall-clock time.

## Generation algorithm and rejection

1. Filter templates by implemented capability flags.
2. Choose one main pressure and at most one secondary pressure.
3. Sample a compatible bounded profile; initialize genuine stocks and history.
4. Calculate actual water, access, construction sites and travel/work budgets.
5. Place clues and announced objectives in reachable observation opportunities.
6. Construct and replay two different strategic witnesses through the same legal-action API as play.
7. Test permitted adverse event bounds and a recoverable setback. Check knowledge acquisition and travel/consumption during preparation as well as the event.
8. Reject impossible, hidden-indispensable, overly dominated or unsupported instances.
9. Persist accepted world plus versions and diagnostic witnesses. After a bounded retry count, return a known-valid authored instance; never loop indefinitely.

Use finite enumerated candidate plans for the first generator. General search can follow if necessary; no proof of all possible solutions is claimed. At least two verified plans are required, but players may find others.

Reason codes should include unsupported-capability, invalid-drainage, unreachable-resource, insufficient-budget, impossible-growth-window, missing-clue, no-recovery, single-strategy and migration-mismatch. Reports remain local; no automatic log upload.

## Success, fairness and replay

- Use actual occupied-home access/chamber conditions and real food consumption. Check reserves after all scheduled consumption.
- Sustained predicates track every declared simulation interval; a favorable final frame cannot hide an earlier violation.
- A cosmetic water-rise animation cannot change outcome timing. If storage is simulated, evaluate time-varying access against the actual water state.
- Relocation has an explicit grace/cost and must not require an unimplemented shelter.
- Keep the lodge's known area observable under the adopted information policy; elsewhere distinguish unknown, remembered and current.
- Forecasts and map/accessibility output use the same knowledge view. No full inundation outline through unknown terrain.
- Mandatory events have discoverable warning and a feasible response. Optional risks may be larger if disclosed.
- Store instantiated worlds, not just seeds. Reload cannot resample stock, weather or clues. Resume interrupted steps atomically; migrate versions explicitly or preserve the old ruleset.

## Validation suite and acceptance

| Check | Required evidence |
|---|---|
| Determinism | Repeat initialization/replay and altered render rates; world, intake and outcomes match |
| Geography | Connected supplied water, valid drains, legal starts/sites, no spawn trap |
| Economy | Sources, deposits, carried loads, uses and losses reconcile; no duplicate food/wood |
| Multiple paths | Two strategy tags with different water/site/supply mechanisms succeed legally |
| Information fairness | Witnesses include needed scouting; hidden mandatory changes have warning |
| Robustness | Boundary parameters and allowed adverse event cases retain intended viability/recovery |
| Ecological timing | No overnight mature trees, growth before arrival or unsupported aquatic recruitment |
| Persistence | Reload/undo/interruption preserve stocks, knowledge, random state and objective interval |
| Experience | Fresh players understand causes and make different plans; completion alone is insufficient |

Acceptance of PG1/PG2 requires stored fixtures and reports, not a claim that listed alternatives sound possible. Human tests evaluate whether different seeds change decisions rather than merely travel length.

## Open decisions and research

Engineering review can choose profile representation, deterministic RNG, finite witness enumeration, bounded retry policy and dirty-region updates within the established architecture. User review is needed for control/household scaling, the founding boundary and substantial wildlife/maintenance pressure. Regional biological research is needed before assigning actual species to functional roles.

The first implementation proposal should name one supported mode, three fixture profiles, exact trial ranges, trace budgets and fallback. This plan is complete as a planning deliverable; generator, balancing and human validation remain open.
