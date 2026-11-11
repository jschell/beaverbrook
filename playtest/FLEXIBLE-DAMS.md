# Flexible dam placement demo

Implemented in [Creekside](explore.html), with a separate [placement lab](explore.html?mode=dam-lab) for quick testing. Stable terrain, one new player dam plus the established family dam, adjustable section crests, local construction and an arbitrary-barrier water model. No erosion, sediment, bank collapse or fluid simulation.

## Quick test

1. Open the placement lab. It starts with surveyed terrain, 24 wood in physical piles beside the beaver and 12 food at the lodge. These are explicit test supplies, tracked in the same resource ledger as harvested supplies. The ordinary Creekside save receives no free wood or map reveal.
2. Resume and open **Plan dam / B**. The default span crosses nearby, from (-6,-3) to (6,-3). Change coordinates or click bank A and B on the survey. Different endpoint z values create an angled span.
3. Compare low, medium and high targets. Gold cells become wetter/deeper; rust cells become shallower/dry. High targets can be capped by a lower escape around the banks. The 3D view temporarily shows target water and target dam geometry while the planner is open. Uncheck the preview or close the planner to return to actual water.
4. **Place stakes** creates an unbuilt project, without spending wood or retaining water. Close the planner, pick up nearby timber and approach a numbered section. Deliver wood locally, then build it. E prioritizes delivery/building over recovering deposits or picking up more timber.
5. Continue across the stream, leaving a gap to compare retention. Build the missing section and observe the pond. Some high-bank portions may already contain water naturally; the water model uses terrain and built sections together.
6. Reopen the planner to change individual target heights or extend either end by two units. Existing construction and deposits stay where they were. Raising still needs another local wood and effort per step. Setting a target never builds or lowers anything automatically.
7. Notch or remove a section explicitly from its local work panel. Water responds; spent materials are not refunded. Recover unspent deposits locally. An empty, unbuilt project can be cleared and placed elsewhere.
8. Reload to check the committed span, targets, built heights, deposits and remaining timber. Start fresh resets only the current lab or sandbox save.

Resting at the family lodge advances weather and resource growth using Creekside's existing rules. A high complete span can require more than one day of work.

## Placement and construction contract

- Initial endpoints snap to integer grid nodes inside x/z ±18, with z at most 16. Both banks must be at least 0.25 above the height reference; the span must intersect the stream or an excavated route.
- Initial length: 3–16 game units. Extensions preserve the existing line and add a two-unit section, up to an 18-unit total. Extension endpoints can be fractional because they follow the existing angle.
- A clearance band around the family dam at z=10 prevents intersecting projects. Ordinary play requires explored endpoint banks; the lab explicitly reveals the test area.
- One active player project. Initial spans divide into sections at most two units long. There are no predefined crossing slots.
- Section levels: gap, 0.40, 0.68 and 1.05. These are absolute crest elevations, not heights above each local bed. A ground bank higher than a crest already contains water at that elevation.
- Every upward step costs one wood deposited at that section plus one effort. Unspent wood at one section cannot finance another remotely. The preview credits local deposits in its additional wood estimate and counts lowering effort separately from wood.
- Notching drops one level; removal opens that section. Both cost one effort and return no built wood. Lower targets require explicit notching; material deposits remain recoverable.
- Staking, target changes, surveying and extending unbuilt stakes cost no materials. Construction consumes wood only on a successful local work action.

## Stable terrain and water

The solver represents the map as neighboring ground cells. Built spans cross edges between those cells. Each crossed edge carries its section's crest elevation; an unbuilt section adds no barrier.

A minimum-escape calculation finds the lowest route from each cell to downstream/lateral map exits, accounting for both ground elevation and barrier crests. Thus a low section, gap, bank saddle or path around an endpoint can limit the retained surface. A second connectivity pass grows wet coverage from the supplied natural stream, avoiding automatic filling of isolated low depressions. The upstream map edge is the inlet, not a drain.

The family dam participates in this same edge model. A new downstream dam can back water toward it; a new upstream dam can retain a separate pool. This replaces the former fixed upstream flood-fill cutoff for the Creekside UI. Old rule fixtures retain their original model for historical regression checks.

The supplied natural stream remains downstream. Dry flow reduces modeled retained surfaces by 0.25 as a compressed seasonal abstraction. This is not a water-volume, discharge, velocity or pressure simulation. Changes settle immediately. Overflow is represented by the limiting escape level, without animated currents or material wear.

Placing, raising, extending and removing dams do not change ground elevation. Existing channel/entrance excavation changes the shared bed and triggers a new water calculation. Digging a route around an endpoint can therefore reduce retention. There is no autonomous erosion or terrain migration.

The same committed water state drives visible water tiles, swimming/wading, channel usability, stand flooding and lodge approach depth. Preview calculations use a cloned state and never grant supplies, change discoveries or commit construction.

## Persistence and information

Ordinary Creekside keeps its existing habitat save key and adopts the new solver without removing supplies or projects. The lab has its own `beaverbrook-dam-lab-v1` save. Legacy saves without a placed project load as before; new saves validate connected section geometry and include section deposits in the material balance.

Committed geometry, section targets/heights, materials and world progress persist. An unstaked draft and preview checkbox do not. Known map terrain remains masked outside explored ground in ordinary play. The preview is a test aid calculated against the full authored terrain; uncertainty in environmental assessment is deferred.

## Verification and limits

90 repository tests pass. Added checks cover horizontal and diagonal spans, open gaps, mixed crests, bank bypasses, an excavated outlet, isolated depressions, unchanged ground elevations, different placements, dry flow, preview immutability/equivalence, local material accounting, geometry validation, extension preservation and save/reload. An integrated movement test physically hauls wood to complete an angled crossing, then notches it and checks drainage. A real-Three.js renderer test checks arbitrary section meshes, target preview water, restoration of actual water and the response to opening a gap.

Browser checks used the compatibility renderer: coordinate/angle and height changes, bypass feedback, staking, local pickup/delivery/building, raising/notching, extension and persisted progress. Native GPU transparency/pixels and real phone use remain unverified. The SVG renderer has coarser geometry and slower movement.

This is a one-unit water grid with primitive geometry; small gaps and diagonal contacts are quantized. Preview and construction share those same rules. New dam logs do not yet block character movement or support walking over their crests; they are hydraulic barriers. Terrain remains authored and scenery trees are not cleared by placement. Curved dams, freeform excavation, multiple new projects, mud recipes, strength/failure, sediment and erosion remain outside this demo. No claim of ecological accuracy, balance or enjoyable pacing.
