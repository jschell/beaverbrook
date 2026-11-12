# Creekside — living creek test

> Survey update: open Plan dam → Survey contours & shorelines for the [optional survey view](SURVEY-VIEW.md). It compares current and completed-target water on explored terrain without spending supplies.

> Lodge access update: [bank lodge, entrance mouth and live section](LODGE-ACCESS.md). Expand Home and creek → How the lodge connects to the creek. Placement and access rules remain unchanged; native/player acceptance is open in #21.

> Elevation update: [terrain, shore and shallow-water readability](ELEVATION-READABILITY.md) is implemented as a first visual slice. Native iPad readability/performance remains open under #20.

> Tablet update (2026-11-12): [hint and overlay layout review](IPAD-LAYOUT-REVIEW.md). Compact home/work disclosures, pinned dismissible nudges and bounded dialogs are implemented; physical iPad Safari validation remains open in #17/#15.

> M1 update: [wood, framework and sealing mud](M1-CONSTRUCTION.md) now governs production Creekside/lab construction. Wood builds a frame; mud packs the effective crest. Older one-wood-per-level costs below describe the preceding experiment. Saves retain paid structures and inventories; ordinary play receives no free stored materials. See the new record for current costs, sources, evidence and limits.

> Tracking audit (2026-11-11): [current discussion dispositions and issue queue](../docs/IMPLEMENTATION-BACKLOG.md). This record describes its named experiment; historical verification counts do not claim current human/device validation.

See the [flexible dam placement demo](FLEXIBLE-DAMS.md) and [quick placement lab](explore.html?mode=dam-lab) for player-chosen spans, section heights and the new stable-terrain water model.

Implemented experiment: third-person movement plus an open-ended, authored harvesting and water-management sandbox. Open [explore.html](explore.html). Three.js and vanilla HTML/CSS/JavaScript; static Pages hosting. First Reach remains a separate settlement experiment. This extends the earlier movement POC rather than attempting the whole colony game.

The default opening is now [Willow Cove](WILLOW-COVE.md): optional guidance, visible family responses and an outcome after a fed low-water night. The placement lab remains available separately.

## Starting situation and purpose

One beaver, an established family lodge, a leaky dam, six stored food and three harvestable stands. Choose food gathering, construction supply, access improvements or exploration in any order. There is no timed death, unlock tree or required construction sequence. A nonmodal opening outcome recognizes one fed low-water night with food left for tomorrow; play continues afterward. Supplies and terrain persist after resting and reloading.

A useful playtest outcome is a family with food and a usable lodge approach, plus an improvement the player chose for a reason. The opening now explicitly recognizes those food/access conditions after an actual low-water night. Compare a modest pond with a deepened entrance against a raised pond; compare direct hauling with channel investment. Enjoyment and balance have not been established.

## Controls

| Input | Action |
|---|---|
| WASD / arrows | Move relative to the camera |
| Drag open view | Orbit horizontally |
| Wheel | Smoothly adjust follow distance; height stays fixed relative to the followed ground/water reference |
| Find home / Find family dam / Find next section | Turn the camera toward work and show its distance; movement remains manual |
| Amber / green work marker | Inspect missing supplies or perform the advertised nearby delivery/build action |
| E / bottom action | Use the displayed nearby action |
| Nearby work buttons | Choose among harvesting, building, digging and resting options |
| X / set down | Release the current load for later recovery |
| M / Map | Pause movement and inspect explored ground |
| C / Recenter | Put the camera behind the beaver |
| Esc / Pause | Pause, resume or start fresh |
| Touch | Left thumbstick moves; drag open view or use turn buttons to orbit |

Actions require physical proximity. Cutting a whole stand and opening a dam notch are explicit work-panel choices, never automatic E actions. Map discovery follows the beaver, not the camera. The lodge and dam are known from the start; nearby stands and cut markers become known as you approach.

## Trial economy

All quantities, growth rates, depths and effort are game abstractions, not measured beaver biology.

| Work | Cost | Result |
|---|---|---|
| Prune | 1 effort, 1 growth | Carry 1 wood + 1 food |
| Browse | 1 effort, 1 growth | Carry 2 food |
| Cut/fell stand | 3 effort, all remaining growth | Ground piles: 2 wood per growth, plus ceil(growth/2) food distributed among piles |
| Carry / recover / deliver | Travel time | One load; no automatic remote delivery |
| Seal established dam | 2 effort + 2 wood delivered at dam | Retention rises from 0.12 to 0.40 |
| Raise sealed dam | 2 effort + 3 wood delivered at dam | Retention rises to 0.68 |
| Open notch | 1 effort | Drops one retention level; no wood refund |
| Dig either hauling cut | 3 effort | Lowers its connected bed to -0.08 |
| Deepen cut | 3 effort | Lowers its bed to -0.50 |
| Deepen lodge approach | 3 effort | Local excavation to -0.60; alternative to raising the whole pond |
| Rest at lodge | 2 food, up to stock available | Advance one day, recover effort, update weather and growth |

Bank willow at (-7,0) has capacity 5, aspen across the creek at (7,-4) capacity 6, upstream alder at (-7,-11) capacity 5. Light yellow-green clusters are harvestable; darker background trees are scenery/collision landmarks. Felling is a stand-level abstraction, not individual tree targeting. Stems disappear as stock falls; cleared stands show stumps. Felled loads stay on the ground until carried. Food and wood remain distinct portions of a mixed load.

The lodge accepts both resources. Stored wood can be picked up again, one unit at a time. Dam construction uses only wood deposited there. Depositing a mixed load at the dam keeps its food in tow for the lodge. Physical piles are drawn up to a visual cap; the HUD tracks all stored quantities.

There are 12 effort per day. Travel, exploration and carrying remain possible when tired. A lodge approach shallower than 0.32 uses 2 of the next day's effort; retaining water or locally deepening it avoids this recurring cost. A food shortage uses another 4 effort on the next day, leaving enough work to forage and recover; a fed rest clears that penalty. It does not end the test. The family consumes food only when the player chooses to rest.

## Living resources and water

A stand with growth remaining regains one unit per rest, up to capacity. A cleared stand needs three rests before its first new unit, then resumes ordinary recovery. Roots submerged more than 0.25 pause recovery, so a channel ending at a productive stand can trade regeneration for access. There is no plant mortality or recruitment simulation yet.

Days 1–3 have normal flow; days 4–6 are dry, then the six-day cycle repeats. Dry flow subtracts 0.25 from the retained upstream surface. Downstream flowing water remains. A source-connected flood fill over the shared height field determines wet cells. Digging changes the same bed used by movement, water connectivity, terrain rendering and map coloring. Isolated terrain below the surface does not automatically fill. The Creekside UI now uses a terrain-edge barrier model for the family dam and one new player dam; see the flexible placement record. Historical rule fixtures retain the earlier authored-line calculation. Neither is fluid simulation.

The willow cut connects the stream to the west-bank stand; the aspen cut connects to the east stand. Both are authored routes marked with pale stakes and ground dashes. A shallow cut with a sealed dam supports swimming in normal flow, then becomes too shallow during dry flow. Deepening can preserve that access without another dam raise. A deep cut also works with the original leaky dam. Carrying speed is 1.55 on land, 1.15 wading and 2.50 swimming, so route investment changes the actual return trip.

## Camera, map and persistence

The follow camera holds a 3.6-unit vertical offset above a smoothed ground/water reference. Obstructions never shorten its follow distance. Trees, lodge, rocks, vegetation and local terrain patches fade when they block the beaver or enclose the camera, then restore smoothly. Transparency does not remove physical collisions. Both renderers respect fading; overlapping translucent surfaces can still be conspicuous.

Unexplored map ground stays hidden. The map records geography and discovered locations, with nearby ground lighter. It does not yet maintain stale water or resource observations: known water geography reflects current simulation conditions, and supplies are shown only when inspecting a nearby stand. Distant world meshes use distance fog and range culling, rather than strict line-of-sight hiding.

Save key: `beaverbrook-creekside-habitat-v2`. Position, knowledge, day, effort, cargo, ground loads, local stocks, consumed resources, dam, cuts and entrance work persist. Actions save immediately; movement saves approximately every two seconds. Reload opens paused. The older movement save is retained under its own key and is not migrated. Nothing is uploaded. Camera angle/distance reset on reload.

## Verification and remaining limits

96 automated tests pass across the repository. New rule checks cover resource conservation, local delivery, felling/drop/recovery, regrowth, effort, reversible water changes without refunds, dry-weather channel adaptation, two different supported-home approaches, shortage recovery, and an integrated route using normal movement. A Three.js renderer-stub test checks that the actual water meshes and excavated terrain change with the same rules; it does not verify native GPU pixels.

Browser checks in the compatibility renderer covered harvesting, delivering/storing mixed loads, stand cutting and recovery of timber piles, hauling wood to the dam, sealing leaks, opening a visibly flooded hauling cut, entering swimming depth, resting with food consumption, and reload persistence. The native WebGL path, phone gestures, comfort, pacing and enjoyment remain unverified. The CPU renderer is slower and has coarser geometry and transparency sorting.

Deferred: freeform channels, individual tree selection/felling animation, mud/sealing recipes, a newly built lodge, additional new dam projects, colony workers, wildlife consumers, water plants, seasons with realistic durations, procedural terrain and additional settlements. The established lodge approach is an authored shoreline access point, not an excavated tunnel network. Background dam logs are visual geometry rather than movement obstacles. No claim of a complete ecology or colony game.

## Human playtest questions

- Can a new player discover a useful project without following a prescribed task sequence?
- Does browsing versus pruning versus cutting change their decision, or only the number of clicks?
- Does a player voluntarily build a channel because hauling is inconvenient, and notice the improvement?
- Does changing flow invite a new solution rather than feel like lost progress?
- Does flooding a stand make preservation/alternative sources interesting or merely frustrating?
- Is manual hauling pleasant enough to repeat, and when should family assistance take over?
