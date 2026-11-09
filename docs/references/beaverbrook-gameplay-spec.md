# Beaverbrook — gameplay specification

> Imported design material from [Ideas-for-projects](https://github.com/jschell/Ideas-for-projects/blob/2fabfceba1feab90f2ee4a60c13680f2125a8f98/animal-browser-games/beaverbrook-gameplay-spec.md) on 2026-11-09. See [source provenance](../sources.md) and the [decision register](../design/decisions.md) for current status and precedence.

**Status:** Proposed rules for prototype testing; complements [concept](beaverbrook.md) and [River Sense and shelter selection](beaverbrook-river-sense.md).

## Player fantasy and format
Guide a beaver family to make a safe home while its construction changes a stream into a living wetland. **Proposed perspective:** 2D top-down tile map; pause-to-plan, then advance a day or run a short simulation. Primary action: select a stream-edge location, place/raise/lower a dam section, and watch water respond. Animals can be charming automated workers; avoid micro-managing each movement.

## Core loop and decisions
Survey terrain → choose dam site → collect limited wood/mud → build → advance water → inspect lodge and habitat effects → adapt to weather and vegetation. Decisions:
1. Build at a narrow or wide crossing.
2. Spend branches on height or length.
3. Repair a leak or expand the pond.
4. Harvest nearby willow or preserve regrowth.
5. Place lodge where water is deep enough but food remains reachable.
6. Raise water for safety or lower it to spare a meadow.
7. Work now or save materials for a forecast storm.
8. Choose one of two food-gathering routes.
9. Accept a shallow wetland or build a deeper pond.
10. Maintain a dam or allow water to bypass it.
11. Prepare food for winter or improve construction.
12. Meet a frog habitat objective or protect a dry path.
13. Change a design after seeing upstream/downstream effects.
14. Test a different dam site after reset.
15. Pursue a bonus habitat goal or finish the season safely.

## Minimal simulation model
Grid cells store elevation, terrain, vegetation, and connected-water state. Stream inflow and dam crest determine an upstream water level; fill only cells connected to the source below that level. Use a deterministic basin-fill/connected-component algorithm, not real-time CFD. Downstream flow remains represented and cannot vanish without an explicit rule. Distinguish permanent stream, temporary flood, and damp adjacent ground. Recompute after construction and on seasonal events. Show a before/after overlay and predicted inundation footprint *before* confirming build.

Resources: branches, mud (two construction resources), food reserve (one survival measure). Daily actions are bounded; no detailed individual inventories. Lodge needs an entrance submerged beyond a clearly shown threshold; food cache must reach winter target. Trees are renewable only over multiple seasons; cutting all nearby food sources should carry a cost.

## First scenario: First Creek
Map target ~20×15 cells, one stream, three candidate dam locations, one lodge site, two wood patches. Starting resources permit an initial low dam plus one adjustment.
- **Beat 1:** Inspect elevation and forecast. Predict the likely pond.
- **Beat 2:** Place two sections; observe rising upstream water and a reachable lodge entrance.
- **Beat 3:** Choose between a higher crest (more water, flooded willow) and a lower crest (safer trees, shallower pond).
- **Beat 4:** A small rain event tests the design; player can pause, repair, or lower a section.
- **Beat 5:** Finish when lodge is safe and food reserve meets the modest target; optional bonus for shallow wetland habitat.

No fixed single correct placement: at least two viable solutions with different resource and habitat outcomes.

## Ecology and science guardrails
Dams change local water levels, groundwater and habitat in real ecosystems; the grid is a deliberately simplified approximation. Wildlife indicators (e.g., frogs and wetland birds) are scenario-specific suitability scores, not guarantees that species appear. Do not assume every dam benefits every species. Beavers build primarily for their own needs; biodiversity is an emergent result. Flag fictional time compression (trees regrow and habitat changes faster than in nature).

## Progression
First Creek (water) → Willow Bend (renewal/food) → Meadow Crossing (tradeoffs with a path) → Dry Summer (seasonal planning) → Living Valley (two connected ponds). New scenarios recombine known mechanics before adding one new variable. Optional sandbox and challenge medals; no mandatory high-score optimization.

## Failure and recovery
Leaks, overflooding, and shortages are repairable in standard mode; preview changes and allow reset/undo before day advancement. No catastrophic family loss in tutorial. Optional expert constraints later: tighter material budget, uncertain weather, limited edits.

## MVP boundary
One map, three dam sites, branch/mud/food, lodge depth, two vegetation types, two habitat indicators, one weather event, water preview, pause/advance, autosave, offline/touch/keyboard. Defer dynamic erosion, realistic groundwater physics, autonomous colony pathfinding, multi-stream hydrology, full food webs, and procedural world generation.

## Acceptance and playtest
- Same terrain + dam + weather seed yields identical water coverage.
- Flooded cells connect to a valid water source; raising a crest cannot arbitrarily dry upstream cells under identical conditions.
- Removing or lowering a dam produces explainable and reversible effects.
- At least two dam layouts can satisfy the base objective with different tradeoffs.
- Players can anticipate the water footprint from the preview and explain surprising outcomes.
- A completed scenario has a clear stopping point within a short session.
- Save/reload preserves terrain changes, resources, weather, and goals.
- Touch and keyboard controls support every critical action.
- First-time players identify at least one consequence beyond “more water is better.”
