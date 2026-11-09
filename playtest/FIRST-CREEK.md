# First Creek · 0.2.0

The default test now focuses on gathering, hauling, dam construction and a lodge. Open `/playtest/creek.html`; the site root redirects here. The older shelter experiment remains at `/playtest/index.html`.

## Play a first settlement

1. Keep **Dam** selected as destination. Choose **Near willow**, collect a wood load, then deliver it.
2. Place **1 · Framework**. Repeat for the other frameworks, choosing another source when the willow is depleted.
3. Collect and deliver mud to the dam. Seal every section. The low pond forms only when the barrier is complete.
4. Choose **Lodge**. Willow Cove connects to either pond; Meadow Edge needs the wider Meadow Bend crossing. Site choices are locked once materials/construction are committed; use Undo to revise them.
5. Deliver 4 wood and build the shell; deliver 2 mud and finish the lodge.
6. Prepare a **Food cache** (collect and deliver 2 food branches, then finish it) or a **Repair pile** (deliver at least 1 wood and 1 mud).
7. Optionally preview and raise the crest, lower it again, or test rain and repair the loosened seal.

The checklist marks a ready settlement. There is no time limit or hunger clock; work records effort rather than a failure budget.

## Material and construction rules

Sources are finite. Each load holds up to two wood, mud or food units. Gathering removes units from the source into carried cargo. Delivery moves only that cargo into the chosen job's inventory; supplies at the lodge cannot fund the dam. Delivered materials appear as piles beside the job. Food branches share finite living-source availability but remain separate from construction wood.

- Dam section: 2 wood for framework, then 1 mud for sealing.
- Narrows: three sections; Meadow Bend: five.
- Lodge: 4 wood shell, then 2 mud finish.
- Raise complete crest: 2 wood + 1 mud total.
- Lower crest: no material refund.
- Remove section: return 1 wood at the dam, with no repeated refund on an empty slot.
- Food cache: 2 food branches and a completed lodge.
- Reserve repair: consume 1 wood + 1 mud from the repair pile.

Collecting brush/fallen wood/mud costs 1 work per load; the farther young tree patch costs 2. Delivery costs are a displayed, rounded round-trip estimate. A bounded route solver weights connected, deep-enough water tiles more cheaply than land; it recomputes after construction. This is one selected hauling trip, not autonomous family AI. The fallen wood to Willow Cove costs 3 hauling work before impoundment and 2 after the low pond forms.

## Water and recovery

A 15 × 13 authored elevation grid carries a permanent downstream stream. Complete crossings retain a source-connected upstream basin: low surface 2.05 or raised surface 2.65 in fictional game units. High banks at each crossing prevent modeled lateral bypass. Disconnected low ground stays dry. Crest previews outline newly inundated tiles without spending resources or changing current water.

Willow Cove's entrance is deep enough in either low pond. Meadow Edge is downstream of the Narrows pond and needs Meadow Bend. Raising the crest inundates the food meadow; lowering it reverses that footprint. This does not simulate groundwater, erosion, sediment, conservation of water volume or gradual pond filling/draining. An incomplete/loosened barrier returns immediately to baseline stream coverage.

One optional rain event loosens a seal. Reseal with mud delivered to the dam, or consume the reserve repair materials. Undo restores the whole previous action snapshot, including source stock, cargo, job inventories and effort. No supplies regenerate with waiting. Reloading loses the run; export downloads a local JSON and nothing is uploaded automatically.

## Verification and limits

26 automated tests pass. New coverage checks both successful crossing/lodge layouts, local materials, finite collection, source connectivity, permanent downstream water, crest changes/removal, cheaper pond hauling, food separation, repairs and scene startup/water mesh changes. Renderer-success tests use a CPU renderer double: they verify initialization and real Three.js mesh state, not GPU output.

Browser testing on the compatibility view completed a dam/lodge/cache run, then the final build's dam/lodge/repair-pile run, checked higher-footprint preview, raised/lowered the pond, and restored rain damage. WebGL pixels and real phone touch/performance remain unverified. Primitive visuals, tile-based water and balance are experimental.
