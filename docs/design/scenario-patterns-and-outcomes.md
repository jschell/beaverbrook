# Scenario patterns and outcome rules

> Status audit (2026-11-11): this broader design remains proposed. Some bounded experiments now exist; see the [current discussion register](../IMPLEMENTATION-BACKLOG.md) before treating any part as implemented or scheduling work. Current experiment records govern their own rules.

Design proposal. Builds on vegetation-and-resource-succession.md and willow-cove-tutorial.md. These contracts define future generated scenarios. They are not implemented generator behavior or verified balance. Numerical values are trial game units. Ecological encounter rules require regional evidence.

See [environment and resource parameters](environment-and-resource-parameters.md) for proposed reach families, bounded variation, material roles and generation dependencies; see [roadmap M4](../ROADMAP.md) for its implementation gate.

## Scenario contract

Each instance records an ID, seed, generator/content/rules versions, initial state, permitted actions, objective predicates, evaluation times, announced changes, bounded surprises, feasibility witnesses, and a local event log. Saves retain the instantiated world and random state. A seed alone is insufficient after content changes.

Success tests outcomes. Example: retain an occupied viable shelter, meet food demand, and finish with two days of accessible reserve after a forecast low-water period. The player can improve water, deepen an entrance, relocate, manage forage or use reserves. Each response must operate through shared simulation rules.

Classify goals as all-of, any-of and optional. List thresholds, units, spatial scope, time windows and boundary inclusivity. Shelter viability and accessible food must call the same calculations used by normal play and preview. Optional habitat achievements cannot silently become mandatory.

## Evaluation semantics

Check irreversible loss conditions after each committed simulation step. Check sustained conditions over their declared intervals. Check final reserve after the final interval's consumption and events. Store elapsed valid duration for hold goals. Never award success from a single favorable frame.

Use occupied viable shelter, not ownership of a building. A supply is accessible only through a valid route under current water and movement rules. Reserve can be usable forage plus stored food if explicitly declared, with conservative yield and access assumptions and no double counting. A cohort may yield different components only through a declared harvest/processing action.

A shortage can be recoverable while reserve is consumed. Define when a run becomes unrecoverable and what retreat/restart means. State weather at the evaluation boundary explicitly. Pause, camera position and rendering frame rate do not affect evaluation.

## Pattern catalog

| Pattern | Eligibility and generated variation | Outcome criterion | Candidate responses to validate |
| --- | --- | --- | --- |
| Falling water | Viable home, forecast decline, several shelter/water opportunities | Sustain a viable occupied shelter through the decline and meet food needs | Retain more water, alter entrance, relocate to existing deep water |
| Distant supply | Required material and an accessible source, alternative route opportunities | Complete a useful structure while preserving declared food reserve by the deadline | Choose nearby stock, excavate a shortcut, stage deliveries, change site |
| Young wetland | Suitable ground, propagule availability, adequate ecological time | Sustain a minimum area of specified functional habitat for a full season | Preserve spread source, protect seedlings, adjust water, open light |
| Shared forage | Valid consumer diet/access and bounded population pressure | Meet family demand while a declared viable feeding patch persists | Change harvest mix, shift cache/site, expand supply, tolerate budgeted loss |
| Flood pulse | Known affected area, shelter alternatives, announced peak | Retain or re-establish viable shelter within a declared recovery window | Bank shelter, different site, route adjustment, reinforcement if modeled |
| Uneven recovery | Harvested patches with different reserves or conditions | Meet seasonal demand and retain a minimum productive population | Rotate harvest, clip eligible stems, protect a recruit patch, supplement elsewhere |
| Linked pools | Connected authored reaches and validated hydrology | Maintain specified passage and occupied shelter conditions through seasonal change | Several small works, alternate shelter, one suitable impoundment, channel link |

Candidate responses are hypotheses until witnessed by legal action sequences. Do not expose a pattern as multi-solution merely because its description lists alternatives. Each pattern names the missing mechanics that must exist before it is eligible for generation. For example, relocation cannot witness solvability while shelter relocation is unavailable.

## Composition and difficulty

Start with one primary pressure and at most one secondary pressure. Combine an exposed doorway with distant food only after checking their shared work budget. Two individually feasible problems can be jointly impossible.

Vary geometry, source location, patch condition, water history, weather amplitude and consumer timing. Use authored reach shapes initially. Procedural scenarios do not require procedural terrain. Keep clue meaning, action effects and success semantics consistent across seeds.

Difficulty can change preparation margin, route length, demand, resilience, recovery opportunities and interacting pressures. Forecast uncertainty has explicit bounds. Introduce new clue types in a safe context before making them decisive. Player forecasts distinguish known observations, assumptions and uncertain outcomes.

## Construct and validate a seed

1. Choose a pattern whose mechanics and content are supported.
2. Choose an authored reach and sample parameters from bounded ranges.
3. Create real resources, history and populations with legal initial accounting.
4. Place legible evidence of the primary pressure and announce evaluation criteria.
5. Produce at least two legal successful action sequences with different strategic mechanisms.
6. Replay both against the same final rule evaluator, including travel, growth, intake and weather.
7. Reject samples that break budgets, rely on impossible maturation, require unimplemented actions, or become unwinnable through allowed mandatory events.
8. Measure whether one strategy dominates every other without a meaningful cost. Retune or reject.
9. Save witnesses as diagnostic evidence, separate from player guidance.

A different source selection or action order alone does not establish strategic diversity. Witnesses should change site, water intervention, supply system or use of reserves. Players can discover successful strategies beyond the stored witnesses.

For bounded randomness, test witnesses against declared extreme conditions or enumerate a small event set. Checking one random trajectory establishes possibility only. Recovery paths should remain under normal variation. Intentional high-risk optional choices can have disclosed failure risk.

## Trial instance

Name: A Home Through Low Water.
Duration: two preparation days and three low-water days.
Starting population: one household with demand of 2 food units/day.
Initial reserve: 4 accessible food units.
Final reserve: at least 4 accessible food units after day 3 consumption.
Required intake over low water: 6. Therefore the minimum additional supply over the scenario is 6 units before losses; preparation-day intake must also be budgeted if simulated.
Required shelter: occupied and viable throughout the low-water interval, after a declared moving grace period if relocation is allowed.
Forecast: water drops by an announced amount; current creek water persists.

Candidate strategies: retain an appropriate pond, deepen an eligible entrance, or move to an existing suitable bank site. Each must also solve food. These options require shelter and hydrology support absent from some current modes. Select depth and cost values only after replaying the witnesses. No consumer raid in this first instance.

## Animal events and story

An encounter is eligible only when diet, habitat, access and population state permit it. Consumption removes actual biomass. Cap visitor intake and visit frequency so scarcity cannot create an uncontrolled attraction-loss loop.

Story triggers observe shared state: repeated feeding visits, a new refuge used, a recovered patch, or an old route abandoned. Show tracks or damage before requiring a response. The event has cooldown, active-instance limit, evidence and resolution conditions. It records the player's actual resolution.

A food competitor is not automatically an enemy. Visiting wildlife can create tradeoffs, discoveries and optional stories. Define which effects influence required success before the event begins. Predator presence is not an automatic universal habitat score.

## Data artifacts

Scenario templates reference shared predicates and simulation definitions. Instances store sampled parameters and world state. Evidence definitions map world causes to observable signs. Outcome records store satisfied predicates, margins, strategy-relevant state and event history. A witness record stores a legal action sequence and expected result.

Suggested structure when implementation is authorized:
- content/scenarios/patterns.json for pattern IDs, required capabilities and parameter ranges.
- content/scenarios/objectives.json for declarative goal composition referencing implemented predicates.
- content/encounters/ for regionally supported animal definitions and event limits.
- rules/scenario-evaluator.mjs for pure outcome evaluation.
- rules/scenario-generator.mjs for sampling and feasibility checks.
- fixtures/scenario-witnesses/ for reproducible seeds and solution traces.

These are proposed paths, not added runtime files. Avoid free-form executable expressions in content. Use a small versioned predicate vocabulary. JSON Schema can validate shape; replay verifies behavior.

## Acceptance questions

Can a player explain why success occurred? Can they predict a shortage before it is irreversible? Are two different strategic approaches executable on the same seed? Does undo restore demand, reserves, events and random state? Do saving, reloading and different rendering rates preserve results? Does each loss have an observable cause? Are winning conditions stable after a content migration?

Begin with the low-water pattern on three authored maps, with manually proven alternatives. Validate understanding and replay interest with people before adding combinatorial generation.
