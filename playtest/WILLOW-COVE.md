# Willow Cove — playable opening

The default Pages entry opens Creekside at the established family home. The goal is to help the family through **one low-water night, with food left for tomorrow**. This is a bounded proof of concept, not the complete founding/colony game.

## Implemented experience

- The first invitation is to bring a leafy branch home. After the first delivery, messages fade after 12 seconds; optional “Need a nudge?” advice responds to current conditions.
- Players can browse for food, prune mixed loads, harvest stands, deepen the lodge approach, improve the family dam, excavate the two authored hauling cuts, explore or place a new dam. No prescribed work sequence or prerequisite skill tree.
- The main HUD describes family access, stored suppers, weather and energy. Exact supplies and river values are available in collapsed notes; local actions remain visible. “Find home” turns the camera without moving the player.
- A family adult and kit respond visibly to food and water access. The adult uses an authored swimming route when the entrance is accessible and waits on the bank otherwise. These are visual responses to real rules, not autonomous workers or a general animal AI simulation. They do not create or consume extra supplies.
- The first observed overnight water drop records the actual previous water height. A pale marker at the creek shows that height during low water. An older save already in low water receives no invented historical measurement.
- An outcome appears only after resting from a dry day with approach depth at least 0.32, the family actually eating two food, and at least two food remaining afterward. Normal-flow rests and merely witnessing the drop do not qualify. Dry flow begins on day 4; the earliest outcome is day 5. It does not certify survival of the entire dry period.
- The outcome card closes with “Keep exploring”; resources, weather and construction continue. Failed nights can be recovered from in the same world.
- Stored wood can be withdrawn in loads of up to two, transferring existing stock rather than granting materials.

## Save compatibility

The existing Creekside save key is retained. Optional journey metadata migrates on load without granting supplies or changing terrain. An old save does not receive an unearned completion. The placement lab retains its separate save. First Reach remains a separate rules engine and experiment.

## Verification

103 automated tests pass, including entrance-plus-food and raised-pond-plus-food strategies, setback recovery, no completion from normal-flow rest, save migration/validation, stock conservation, and family animation/old-water-marker behavior. Production build passes.

Browser verification in the compatibility renderer exercised a fresh start, mixed first delivery, entrance excavation, two food deliveries, the day-4 drop, and the day-5 outcome. Native WebGL performance and phone layouts still need device testing. Automated/browser checks establish behavior, not enjoyment or age suitability.

## Next human playtest

Ask a new player to start without spoken instructions. Observe whether they can identify the family need, choose an improvement, understand the water drop and explain why their plan worked. Record confusion, unwanted repetition and their next self-chosen goal. Compare an entrance strategy with a dam strategy. Do not treat completion alone as evidence that the session was fun.

Remaining limits: authored terrain and two cuts; simplified food, weather and water; no erosion; dam logs are hydraulic barriers rather than movement obstacles; no colony progression, procedural scenario generator or full food web. The HUD still uses explicit local work buttons. Those are subsequent design decisions, not features silently claimed by this opening.
