# First Creek — gathering, hauling, dam and lodge gameplay

**Direction recorded:** 2026-11-09. The user wants initial gameplay centered on building a dam, its associated lodge and useful supporting items. **Status:** next-slice design proposal; the current Riverbank Refuge implementation remains unchanged. Costs, source traits and formulas below are trial game rules, not verified biology or balanced numbers.

## Player loop and goal

Inspect a small dam-suitable creek → choose nearby or bulk material sources → gather and haul → place the first dam sections → see a connected pond develop → establish a lodge with submerged access → stock a food cache or prepare repair supplies → test the settlement.

Use First Creek as a separate scenario on the same Three.js/vanilla-JS foundation. Retain Riverbank Refuge as the shelter-assessment test; its work budgets and scripted water stages do not govern First Creek.

Start with gathering and a visible construction change, rather than a long comparison panel. River Sense supports the building loop: clues indicate an efficient crossing, flood exposure, food and transport routes. The first creek is deliberately suitable for a dam; later river scenarios can favor a den or relocation.

## Source choice: trees are places with properties

| Source | Proposed game role | Tradeoff |
|---|---|---|
| Willow/brush patch beside shore | Quick small bundles; nearby food resource | Efficient initial collection; limited supply and a reason to retain some food vegetation |
| Young deciduous tree farther upstream | More wood from a longer cutting job | Bulk supply, but felling removes that standing food source |
| Fallen wood near the opposite bank | Construction wood without cutting a living food tree | No felling task, but awkward land access until water connects the route |
| Mud patch on a quiet bank | Sealing material shared by dam and lodge | Easy collection where accessible; requires its own delivery trips |

Do not make “willow = weak” or “aspen = strong” universal quality tiers. For the first version, sources differ in yield, collection effort, location and food consequence; collected wood is one inventory type. Source size/condition should explain effort. Species can provide readable identity without adding species-specific crafting recipes.

Willow, aspen, alder and related deciduous trees are documented food sources. Exact yield, regrowth speed and structural bonuses are game decisions needing separate justification.

## Transport creates the construction puzzle

Material location should matter to the selected job, not merely distance from the beaver's spawn.

1. Select a source and a construction destination or visible shoreline stockpile.
2. Preview the route, number of loads and estimated work before confirming.
3. Gather finite bundles at the source.
4. Haul them visibly to the destination. A short animation represents work; it does not require watching repeated long walks.
5. Apply delivered supplies to the job. No remote global wood consumption.
6. Recompute eligible routes when the pond footprint changes.

The first version uses authored land/water routes between source and destination nodes, not free-roaming colony pathfinding. A route needs uninterrupted traversable land or sufficiently deep connected water. A new pond can shorten hauling, but it can also cut off a land path. Never treat all blue tiles as traversable regardless of connectivity or depth.

**Candidate work calculation:**

- Carry capacity: 2 wood units or 2 mud units per trip; no mixed load in the first version.
- Trips = ceiling(required quantity / capacity).
- Trip work = max(1, ceiling(round-trip land distance / 4 + round-trip water distance / 8)).
- Job effort = collection work + trips × trip work + construction work.
- Distance is measured in fictional route units, not meters. Both travel directions are included.
- The water discount represents easier transport in this game; the ratio is not a measured biological rate.

**Illustrative comparison:** a source yielding 4 wood with 2 collection work and a 16-unit round trip costs 10 work over land: 2 + 2 loads × 4. If a completed pond enables an all-water route of the same length, it costs 6 work: 2 + 2 × 2. Nearby finite brush remains useful for starting the dam, while bulk wood becomes more attractive afterward.

This is a reason to choose construction order. It is not a promise that every distant source becomes economical. Route costs, source depletion and alternative plans must be reviewed together.

## Materials: keep the first economy small

**Track wood and mud initially.** Both are delivered locally and used by the dam and lodge. Food is a separate optional cache task, not construction currency.

Later, split wood into branches and heavier pieces only if choosing between them improves construction decisions. Do not start with wood hardness, moisture, durability tiers, stone, rope, crafted tools or recipe chains.

Candidate source yields for paper review:
- Near brush: 2 wood, 1 collection work; finite patch.
- Fallen wood: 4 wood, 2 collection work.
- Young tree: 6 wood, 3 collection work; standing source is removed.
- Mud patch: 2 mud, 1 collection work per collection; scenario-defined finite stock.

Harvesting and delivery are distinct. Record collected-but-undelivered and delivered quantities, so canceling a job cannot duplicate supplies. A partial load only delivers its actual quantity. First-run work can be a displayed effort total rather than a hard failure budget; introduce limited days only after the basic collection/build loop is enjoyable.

## Construction jobs and visible stages

| Job | Candidate ingredients | Visible progress | Purpose |
|---|---|---|---|
| Low dam section | 2 wood + 1 mud | Open gap → woody framework → sealed section | Contributes to an effective cross-channel barrier |
| Raise existing section | Additional wood/mud, exact recipe open | Higher crest and footprint preview | More retained water, more inundation |
| Lodge | 4 wood + 2 mud | Material pile → shell → finished shelter/entrance | Habitable home once entrance/chamber conditions pass |
| Food cache | Gather food-bearing branches from an eligible source | Visible cache beside the home | First useful preparation project; no detailed hunger clock yet |
| Repair reserve | Delivered wood/mud allocated to a visible pile | Stored bundles, depleted when used | Makes response to a small leak affordable |

These are proposed jobs, not a final cost table. Lodge ingredients and dam costs deliberately compete for the same source stock. Construction work, exact upgrade/repair quantities and cache targets remain open.

A dam and a lodge are different structures. The family does not live in the dam. Show a partial framework as construction, not a completed dam that already grants full water retention.

## Water behavior needed for this slice

Replace scripted high/low footprint changes for First Creek with a small deterministic, source-connected basin model. Keep authored seasonal inflow as a separate later input.

- The base stream retains flowing water downstream.
- A gap in the dam prevents the intended full impoundment.
- Completed barrier and crest determine a bounded upstream water surface.
- Flood only connected terrain below that surface.
- Preview inundation before confirming a raise.
- Show a stable overflow/bypass route; do not erase downstream water.
- Lowering/removing construction produces an explainable change.
- Water access and hauling routes use the resulting water state.

The 0.1.1 water controls remain visual stage comparisons for Riverbank Refuge. They are not a construction simulation and should not be reused as if placing a segment physically changes the river.

## First playable map

One compact authored creek with:
- Two candidate dam crossings: narrow and convenient versus longer but better positioned for food/lodge access.
- Two nearby finite brush sources, one bulk source, one farther young-tree patch and two mud locations.
- Two lodge placements with different entrance depth and transport distance.
- A low meadow/food patch that a higher pond can inundate.
- Authored hauling routes with one opportunity for a pond-enabled improvement.

Show source identity, remaining yield and travel effort on selection. Show delivered/required materials directly on each job. Let the player redirect remaining loads rather than rebuild an entire plan after every click.

## Suggested first-session beats

1. Collect nearby wood and deliver the first bundle to a chosen crossing.
2. Place framework; see the remaining channel gap.
3. Bring mud and complete a low barrier; see upstream water spread.
4. Compare raising the pond with keeping the food patch accessible.
5. Choose a lodge position, haul supplies and finish its entrance.
6. Use remaining accessible material for a cache or repair reserve.
7. Optionally advance a small, telegraphed weather event.

The optional event should not be needed to make ordinary construction satisfying. Remove extra preparation chores if gathering, shaping water and building a home already make a good short session.

## Acceptance and design checks

- A first-time player makes a visible collection/delivery/construction change early.
- Source choice changes total work through yield, depletion or route length.
- Materials reach their destination before construction consumes them.
- A partial dam does not grant the full effect of a completed barrier.
- At least two settlement plans succeed with different hauling/inundation tradeoffs.
- Building water access can improve one route without globally teleporting resources.
- Dam and lodge compete for material; one “buy everything” choice does not erase planning.
- Removing/raising a section gives a consistent, previewable water change.
- The downstream channel remains present.
- A player can correct placement or recover useful material without duplication exploits.
- Essential source and construction actions work by keyboard and touch.
- Browser checks must cover renderer startup and the visible water response; CPU rule checks alone are insufficient.

## Decisions needed before implementation

Choose authored route-node geometry, cutting/hauling/building time model, material storage/refund rules, dam connectivity/crest rules, lodge safety conditions, and a complete source budget. Work through two successful builds and one overflooding recovery.

The numbers here support discussion, not a claim of implementation readiness. Prioritize collection → dam response → lodge over new optional comfort menus.

## Evidence and abstraction

Research leads checked for this design:
- [Washington Department of Fish & Wildlife — Beaver](https://wdfw.wa.gov/species-habitats/species/castor-canadensis): woody food species and food storage.
- [National Park Service — Build a Beaver Dam](https://www.nps.gov/articles/buildabeaverdam.htm): wood/branches and mud in dam construction.
- [National Park Service — Beavers, Rocky Mountain](https://www.nps.gov/romo/learn/nature/beavers.htm): lodges made of sticks/branches/mud, in ponds or on banks.
- [USFWS Beaver Restoration Guidebook](https://www.fws.gov/sites/default/files/documents/The-Beaver-Restoration-Guidebook-v2.02.pdf): further verification lead on material selection and foraging.

Agency summaries support broad inspiration. Carry capacity, distance formula, work rates, source yield, food penalties and compressed construction stages are proposed game abstractions. Do not present them as established beaver engineering behavior.
