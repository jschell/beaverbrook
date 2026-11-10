# First Creek · 0.3.0

Open `playtest/creek.html` for **The first dry spell**. The site root opens this scenario. [Construction sandbox](creek.html?mode=sandbox) retains the original building/rain experiment; [Riverbank Refuge](index.html) remains the shelter-choice test.

## First steps

1. Choose Dam, collect Near willow wood, deliver it, and place a framework. Repeat until all three Narrows frameworks are built; use fallen alder when willow runs out.
2. Deliver mud and seal every section. A connected pond forms; downstream water remains.
3. Choose Lodge / Willow Cove. Deliver 4 wood for the shell and 2 mud for the finish.
4. Compare two settlement plans in the scenario panel. The forecast predicts the actual dry-spell water and entrance depth.
5. Either deepen the entrance and establish a feeding route from the Lodge panel, or prepare a food cache and raise the dam crest.
6. Advance to the dry spell. Check the changed landscape and routes, fix any remaining entrance/food problem, then Finish settlement trial.
7. Compare the outcome and try a new creek with another approach.

The low-pond feeding plan requires 2 wood delivered to Lodge for its route, 3 effort to deepen the entrance, and at least 2 shore-brush branches left above water. Preserve that patch when collecting construction wood. The raised-pond plan needs 2 wood + 1 mud delivered to Dam and a finished cache of 2 food branches. Gather shore food before raising, or use upland trees. A repair pile does not replace food in the dry-spell scenario.

The forecast is always free. Advance requires a sealed dam, completed lodge and empty cargo, but allows an unprepared plan so you can diagnose and recover. Weather happens only when you choose Advance. No timer or hunger clock; effort is counted, not capped. All displayed costs/heights are fictional game rules.

## Materials and recipes

Each load carries up to 2 units of one material. Sources are finite. Gathering puts material into cargo; delivering moves it into the selected job's local inventory. Materials at Lodge cannot fund Dam. Living sources share finite wood/food availability; food is separate cargo from construction wood.

| Job | Cost |
|---|---|
| Framework | 2 wood per section |
| Seal | 1 mud per section |
| Lodge | 4 wood shell, then 2 mud finish |
| Raise complete dam | 2 wood + 1 mud total |
| Deepen lodge entrance | 3 effort, once; entrance 0.35 lower |
| Feeding route | 2 wood at Lodge + 2 effort, once; needs 2 dry shore branches |
| Food cache | 2 food branches + completed lodge |
| Lower crest | No refund |
| Remove section | Returns 1 local dam wood once per existing section |
| Reserve repair (sandbox) | 1 wood + 1 mud from Repair pile |

The Narrows has 3 sections; Meadow Bend has 5 and supports the downstream Meadow Edge lodge. Site choices lock after local deliveries/building; undo to revise. The two demonstrated dry-spell plans use Narrows / Willow Cove.

Collection costs 1 effort per load except young trees (2). Delivery displays a rounded round-trip estimate; sufficiently deep connected water is cheaper than land. Routes recompute as the pond changes. The transport solver handles one selected trip, not family AI.

## Water and recovery

Preparation surfaces: low 2.05 / high 2.65. Dry surfaces: low 1.75 / high 2.35. A normal Willow Cove entrance has dry depth 0.30 at the low crest; deepening makes it 0.65. Required depth: 0.40. The high dry pond gives the original entrance 0.90 but covers shore brush. The current Lodge depth and scenario forecast are labeled separately.

A broken barrier releases the pond immediately; a smaller permanent creek remains. Flooding temporarily blocks shore-food collection and its feeding route, without permanently killing vegetation. Deepening adjusts an authored entrance check/marker, not terrain excavation. There is no fluid physics, hunger consumption or ecological accuracy claim.

Undo restores whole action snapshots, including weather/completion. New creek resets the run; reload loses it. Export downloads a local JSON; nothing is uploaded automatically. Finished trials freeze world changes until undo or restart.

## Construction sandbox

Use the header link to gather/build freely without the dry-spell stages. Its checklist accepts cache **or** repair reserve. One optional rain event loosens a dam seal; reseal with mud or use reserve wood/mud. The new entrance and feeding-route projects belong to the dry-spell scenario.

## Verification

34 automated tests pass. Both dry-spell approaches and the unprepared/recovery path were completed through browser controls in the compatibility renderer. Native WebGL pixels and phone interaction/performance remain unverified. Existing successful-renderer tests use real Three.js geometry with a CPU renderer double. Developer walkthroughs do not validate enjoyment or balance.

See [scenario design, exact rules and human-playtest questions](../docs/design/first-dry-spell.md). Run `npm ci`, `npm test`, `npm run build`; serve `dist/` over HTTP.
