# M1 construction slice — wood, framework and sealing mud

Implemented trial, 2026-11-12 (Pacific). First bounded M1 slice; M1 is not complete. Tracks #3/#6 and the discrete packed-crest part of #5. Dam collision (#4), actual filling/flow, strength, lodge construction and broader hauling balance remain open.

## Play it

Open [Creekside](explore.html), or [the placement lab](explore.html?mode=dam-lab) for surveyed terrain and local supplies.

1. Plan a span. The quote separates additional wood, sealing mud and effort, crediting material already deposited at each section.
2. Place stakes. Stakes do not retain target water.
3. Gather wood or pick up a timber load. Approach a section and deliver locally.
4. Build its framework. The logs appear, but its completed hydraulic crest has not risen.
5. Gather mud from a brown bank shown on Map, or select “Pick up sealing mud” beside a brown load in the lab. Haul and deliver it.
6. Pack the framework. The packed face appears and that completed crest participates in water retention.
7. Repeat only where useful. Gaps, low sections and paths around endpoints still limit the pond. The goal is a useful home/pond, not checking off every stake.
8. Recover excess unspent wood/mud locally. Notching/removal returns no spent resources.

The two mud banks are near (-4,3), with 20 units, and (4,-7), with 32. Gathering costs 1 effort and carries up to 2 mud. These finite reserves do not refill overnight and collecting them does not excavate terrain. Mud is not food or structural wood. Mud can be stored at the lodge and withdrawn in loads of up to 2.

The lab begins with 48 seeded test wood and 12 mud in physical loads. Its mud is transferred out of the nearby bank's reserve (leaving 8 there), not added on top of the 52-unit source budget. Ordinary Creekside receives no carried/stored gift supplies. Old saved labs keep their existing supplies when upgraded; start fresh only if the new surveyed test setup is wanted.

## Trial cost and stage contract

New dam sections survey eight midpoint samples. At each sample, H is max(0, target absolute crest minus bed elevation), and base width is 0.5 + 0.4H. Structural bulk is the sum of length × H × width; wood is its rounded-up total. Mud is rounded-up section-face area divided by 2. Numbers are fictional game units, not calibrated biology/engineering.

Cumulative requirements for all three crests are stored when a project is surveyed/staked. Their differences determine each raising step. This prevents rounding discounts from multiple small raises. Existing deposits are local credits, not a shared remote stock. The survey budget stays fixed for that project across reload and later excavation; excavation still changes the actual drainage. Future foundation response to excavation is outside this slice.

One framework step and one packing step each cost 1 effort for a new section. A step whose cumulative rounded material budget is already paid reuses existing wood/mud but still requires fitting/packing work. Ground that already contains water to the chosen target is marked “Natural bank” and requires no invisible construction chores. Raising that target can make new work necessary.

The inherited family dam is maintenance, not a completely new 18-unit structure: its existing 2-/3-wood repair/raise steps remain, now followed by 1 local mud to pack each step. Wood work costs 2 effort; packing costs 1. Legacy completed levels remain complete without retroactive charges.

Packed level drives water. Frame height is separately visible. An unsealed raised frame leaves the last packed level active; a frame over a gap does not retain its target pond. This is a discrete approximation of unfinished construction, not a permeability/discharge/storage model.

Lowering a target does not destroy work automatically. Notch an unfinished frame explicitly before packing to a lower target. Unspent deposits remain recoverable; completed structure material stays spent after notching/removal. Stones, bedding and material substitutions remain proposals.

## Implementation and saves

- Pure geometry/material helpers: construction-rules.mjs.
- Eligibility, local collection/transfers, family/custom work and ledgers: habitat-rules.mjs.
- Costs, target previews and extension: dam-placement.mjs / dam-planner.mjs.
- Work-marker guidance and 3D state: dam-work.mjs / explore-scene.mjs.
- Production Creekside and lab enable construction schema 1. Earlier rule fixtures retain their legacy experiment rules.

The existing browser save keys remain. After validated load, enableConstruction adds empty mud inventories, finite source reserves and frame/cost metadata while preserving wood/food, positions, targets, deposits and completed crests. No completed legacy construction is charged again. Existing paid levels form the starting baseline for future work.

Mud is accounted for in sources, loads, local deposits, home stock and spent material. Saves validate the 52-unit source/collection budget and gathered-versus-stored/deposited/spent balance. Wood/food retain their existing ledgers. Rendering and previews cannot consume resources. Interrupted work consists of atomic local actions followed by autosave.

## Verification

116 automated tests and production build pass. Coverage includes:
- depth/length/height cost comparisons and cumulative raising;
- two distinct material ledgers, finite collection, local recovery and invalid-save rejection;
- old-save upgrade preserving paid work and inventories;
- framework versus packed water, full crossing versus notch and preview equivalence;
- extension/targets/cancelled frames and deposits;
- real movement-based timber/mud hauling;
- food plus entrance success without any dam/mud work;
- natural-bank sections without unnecessary work;
- renderer stakes/framework/packed faces and visible mud cargo.

Compatibility-browser checks exercised ordinary mud gathering, lab quote (default low span: 10 wood + 8 mud), staking, local delivery, framework then packing, and reload of stage/deposits. Native WebGL/phone performance, original white-flash confirmation, player comprehension, pacing and balance remain unverified.

## Next M1 work

Review whether depth-aware costs and separate packing create useful decisions rather than extra trips. Then add committed collision/crossings, clearer limiting-outlet feedback and targeted source/route tuning. Do not call this complete M1 or a verified fun/realistic ecosystem.


## Loose supply support after excavation (2026-11-12)

[#18](https://github.com/jschell/beaverbrook/issues/18): A user WebGL screenshot shows loose timber at its old elevation beside the newly dug Willow cut. Cause: `inventory()` cached meshes by stock and placed them only when that stock changed. Channels, water stage and dam crest were absent from the cache key. Excavating an unchanged pile therefore left its previous y position cached.

Supply positioning now runs independently of inventory mesh rebuilding. Wood/food loads rest at the higher of their current ground and actual water surface, plus 0.05 visual clearance. Mud-only loads rest on the current bed rather than floating. The family-dam loose supply pile also updates its ground/water support. Mixed wood/food loads keep their contents together. Lodge storage and constructed dam sections remain attached to their structures; no gravity/drifting simulation or material consumption was added. Preview water does not lift actual loose stock.

119 tests and build pass. Regression uses unchanged loads at (-6,0), (-5,0) and (-6,1), deepens the west channel, changes to a low-water day and raises the actual family dam. It checks lower wood placement, water support, sunken mud, unchanged geometry, stable identical frames and unchanged inventory/accounting. A compatibility-browser fixture exercised two real dig actions and a low-water switch with three unchanged loads; timber resettled at the cut water surface. Native iPad WebGL visual acceptance remains open; no source counts or saved coordinates are rewritten by rendering.

## Packed mud / water rendering correction (2026-11-12)

[#19](https://github.com/jschell/beaverbrook/issues/19) tracks the user WebGL screenshot F7CD8685-0DCB-41B3-B30B-9B0DE43F1331.png: comb-like brown/cyan edges at the family dam. The family mud face had a top exactly at 0.40/0.68, matching normal retained water. Placed mud faces also ended exactly at the hydraulic crest. Water tiles were 1.01 units wide on a 1-unit grid, double-covering narrow seams. The family mud and logs belonged to separate fading records. These are confirmed geometry/material conflicts; their precise contribution to the supplied GPU pixels remains unconfirmed without a native reproduction.

Mud caps now finish 0.012 units above the logical crest as a cosmetic clearance; hydrology still uses the original crest. Water tiles meet at shared edges without overlap. Family mud is a child of the log structure and shares its fade opacity. Its transform compensates for the family structure's stage offset, preserving intended crest alignment. Placed geometry refreshes when channels/entrance alter its underlying bed. This changes no work costs, resources, save values or simulation levels. It does not add detailed mud art or change which built/packed stages retain water.

120 tests and build pass. New real-Three assertions cover both family stages, custom packed caps, edge-meeting water geometry, shared log/mud opacity and unchanged world state. Check native WebGL from both sides at normal/low water, especially after increasing framework while retaining an older packed crest. A compatibility-browser fixture opened the packed family dam, orbited to both sides, raised its packed crest and switched to low water. Compatibility rendering cannot certify GPU depth behavior. The general depth-offset mechanism is documented in the [Three.js material reference](https://threejs.org/docs/pages/Material.html); this correction separates actual visual surfaces rather than disabling depth testing.
