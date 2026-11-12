# Optional dam survey view

2026-11-12 · [#22](https://github.com/jschell/beaverbrook/issues/22), follow-up to #20/#21.

## Use and player decision

Open Plan dam, then enable **Survey contours & shorelines** above its map. Contours help compare bank height and a potential escape route; solid current shoreline and dashed completed-target shoreline distinguish the pond now from the result of finished work. The known lodge is marked so a pond upstream of the new dam is not mistaken for an improvement to a downstream home. The text compares actual and predicted water at the lodge approach.

Survey starts off. Toggling it or changing target heights spends nothing and does not build/pack sections. The existing quote and per-section current/target controls still govern the plan. Closing returns to the same local camera. The separate completed-target 3D preview toggle remains independent of the 2D survey.

## Rules and representation

Contours use the current ground-height function, sampling half-unit squares split into triangles, at 0.50 elevation intervals from -1.0 through 6.0. This is a sampled approximation, not an analytical terrain solver. Labels are sparse to avoid overlap. All heights are game units.

Only explored cells are sampled/drawn. Shoreline edges appear between known wet/dry cells or known cells at different surface levels; a boundary against unknown terrain is not labeled a shore. The actual shoreline uses current hydrology; dashed target shoreline uses the existing completed-target preview. An invalid span has no target shoreline and explains why prediction is unavailable. Home water text is permitted because the established lodge is already known/constantly reported.

The current family crest and actual→completed-target lodge water are text, alongside existing section crest/target settings. Shapes and line styles distinguish the views without depending entirely on color. Existing gold/rust fill still indicates deeper/shallower target cells. Canvas labels and the live text legend are available with 44px toggle/standard planner controls.

This preserves the existing explored-cell knowledge model. It does not implement per-clan observation or stale remembered terrain. It adds no new physics, free camera, fog reveal, material costs or save format.

## Verification and limits

126 tests and build pass. New tests use a known slope to check contour locations, flat terrain to reject spurious lines, hidden cells to prevent sampling/shore leakage, wet/dry boundaries, actual/target differences and unchanged source/preview state.

Browser checks exercised unavailable prediction in ordinary unsurveyed play, the surveyed lab, target-height change and survey off/on. Fifteen representative CSS tablet viewports from the existing iPad audit passed planner/close/feedback bounds and no horizontal scroll overflow with survey enabled. These are browser content viewports, not native device certification. Map/legend content scrolls within the bounded planner on shorter screens.

The surrounding world used the compatibility renderer; the survey itself is 2D canvas. Physical iPad touch scrolling, label readability and player understanding remain open in #22/#15. In particular, verify that a player recognizes when a new upstream pond does not change lodge water downstream. Tests cannot establish that comprehension.

## Next work

Validate the survey alongside gathering, hauling and nearby building choices, then continue M1 dam collision and route feedback. Broader founding/procedural progression remains on the roadmap. Additional world overlays are not required to use this first survey slice.
