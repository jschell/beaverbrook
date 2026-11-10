# First Creek · 0.4.0

Open `playtest/creek.html` for **The first dry spell**. The site root opens this scenario. [Construction sandbox](creek.html?mode=sandbox) retains the original building/rain experiment; [Riverbank Refuge](index.html) remains the shelter-choice test.

## Quick channel demo

Use **Channel demo** in the header, or open `creek.html?mode=channels`. It starts with a legally built dam/lodge and finite remaining materials; setup effort is counted.

1. Preview East feeding channel with Young tree patch → Lodge selected: hauling changes from 2.9 to 2.3 effort/load. Dig for 3 effort.
2. Gather and haul food to Food cache, finish it, and deepen the lodge entrance if keeping a low pond. A live feeding route is another food option.
3. Advance to the dry spell: the shallow cut loses swimming depth and hauling returns to 2.9. Deepen the channel for 2 effort to restore 2.3 hauling.
4. Finish when the scenario checks pass. Compare Alder-side cut, another destination or another construction order on a new run.

Previews show digging cost, source loads remaining, and before/after costs now and in dry conditions. Inspect whether enough useful trips remain to repay the investment. Channels are optional, not victory requirements.

## First steps

1. Choose Dam, collect Near willow wood, deliver it, and place a framework. Repeat until all three Narrows frameworks are built; use fallen alder when willow runs out.
2. Deliver mud and seal every section. A connected pond forms; downstream water remains.
3. Choose Lodge / Willow Cove. Deliver 4 wood for the shell and 2 mud for the finish.
4. Compare two settlement plans in the scenario panel. The forecast predicts the actual dry-spell water and entrance depth.
5. Choose a low pond with a deeper lodge entrance or raise the dam crest. Either can use a feeding route or food cache.
6. Advance to the dry spell. Check the changed landscape and routes, fix any remaining entrance/food problem, then Finish settlement trial.
7. Compare the outcome and try a new creek with another approach.

The low pond needs a deepened lodge entrance (3 effort) for the forecast drop. The raised pond requires 2 wood + 1 mud at Dam. Either plan can establish a feeding route for 2 effort (leave at least 2 shore-brush units), or finish a cache of 2 food. Branches remain available through a water approach after flooding. A repair pile does not replace food in this scenario.

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
| Feeding route | 2 effort, once; needs 2 remaining shore branches and a route |
| Food cache | 2 food branches + completed lodge |
| Dig channel | Alder-side 2 effort; East 3 effort |
| Deepen channel | 2 effort, once per dug cut |
| Lower crest | No refund |
| Remove section | Returns 1 local dam wood once per existing section |
| Reserve repair (sandbox) | 1 wood + 1 mud from Repair pile |

The Narrows has 3 sections; Meadow Bend has 5 and supports the downstream Meadow Edge lodge. Site choices lock after local deliveries/building; undo to revise. The two demonstrated dry-spell plans use Narrows / Willow Cove.

Collection costs 1 effort per load except young trees (2). Delivery displays a round-trip estimate rounded to tenths of effort; sufficiently deep connected water is cheaper than land. Routes recompute as the pond changes. The transport solver handles one selected trip, not family AI.

## Water and recovery

Preparation surfaces: low 2.05 / high 2.65. Dry surfaces: low 1.75 / high 2.35. A normal Willow Cove entrance has dry depth 0.30 at the low crest; deepening makes it 0.65. Required depth: 0.40. The high dry pond gives the original entrance 0.90 and covers shore brush without deleting food access. The current Lodge depth and scenario forecast are labeled separately.

A broken barrier releases the pond immediately; a smaller permanent creek remains. Flooded shore-food branches remain collectible. A live feeding route needs remaining branches and a usable approach, by bank or water. Channel excavation lowers real grid terrain; only connected terrain fills, and a shallow cut can lose its swimming benefit during falling water. Deepening adjusts an authored entrance check/marker, not terrain excavation. There is no fluid physics, hunger consumption or ecological accuracy claim.

Undo restores whole action snapshots, including weather/completion. New creek resets the run; reload loses it. Export downloads a local JSON; nothing is uploaded automatically. Finished trials freeze world changes until undo or restart.

## Construction sandbox

Use the header link to gather/build freely without the dry-spell stages. Its checklist accepts cache **or** repair reserve. One optional rain event loosens a dam seal; reseal with mud or use reserve wood/mud. The new entrance and feeding-route projects belong to the dry-spell scenario.

## Verification

42 automated tests pass. Browser checks in the compatibility renderer completed the channel dig/haul/dry/deepen/finish flow and a high-pond live-feeding path with food gathered after flooding. Native WebGL pixels and phone interaction/performance remain unverified. Existing successful-renderer tests use real Three.js geometry with a CPU renderer double. Developer walkthroughs do not validate enjoyment or balance.

See [current channel/food rules and evidence](../docs/design/hauling-channels-demo.md), plus the earlier [0.3.0 scenario design](../docs/design/first-dry-spell.md). Run `npm ci`, `npm test`, `npm run build`; serve `dist/` over HTTP.
