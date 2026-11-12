# Elevation readability — first slice

2026-11-12 · [#20](https://github.com/jschell/beaverbrook/issues/20) · roadmap M0 world trust / M1 physical feedback.

## Player purpose

Distinguish an untouched bank, a cut shoulder and its bed; notice whether water is shallow enough to expose the bed or deep enough for hauling. Reading those differences should support a choice between channel work and retaining a deeper pond.

## Implemented

- Terrain uses a shared half-unit lattice (16 subdivisions per 8-unit patch) in both renderers. Adjacent patches sample the same boundary coordinates. This replaces 12 WebGL / 6 compatibility subdivisions. Vertex heights still come from the existing ground-height function; triangles remain an approximation between vertices.
- Slopes have a soil treatment and a restrained darkening derived from the actual local gradient. Excavated ground gets exposed soil rather than the normal grass palette. There is no decorative wall pretending to be solid terrain.
- Current shoreline vertices use dark wet soil within 0.16 height units above nearby water; submerged beds distinguish shallow/deeper ground. Nearby means the current cell or its four adjacent cells, so this is a surface cue, not a simulated water table or persistent wetness model.
- Three shared water materials retain the existing normal/preview tint. Opacity is 0.48 below 0.25 depth, 0.68 below 0.65, and 0.85 deeper. This exposes more bed in shallows. Preview uses its prior uniform 0.6 opacity. These are authored visual thresholds, not scientific calibration.
- Terrain color refreshes when actual hydrology changes. Geometry/normals refresh only after actual excavation; water-stage shading does not move ground. Cached hydrology is reused while shading vertices.

Movement, dig depths, supplies, water levels, dam rules and camera controls are unchanged. No new UI is required and existing saves use the updated appearance on reload. App/scene version URLs refresh changed code.

## Verification and limits

121 tests and build pass. The new regression checks cut sampling, vertex heights against the existing rules, exposed-bed color changes, shoulder lowering, wet-edge recoloring after a low-water day, stable geometry across weather changes, shallow/deep opacity and unchanged game state. Existing regression tests for terrain opacity, player marker, mud caps and loose supplies still pass.

A compatibility-browser fixture exercises untouched, first-cut, deeper-cut and low-water conditions. It shows stronger soil/shore contrast. It does not establish iPad WebGL readability, frame rate or final art quality. Terrain triangles rise from roughly 10,368 to 18,432 in WebGL, and from 2,592 to 18,432 in compatibility mode; native tablet performance and slower fallback rendering require observation. There is no claim of exact pixel equivalence between modes or exact analytical height between mesh vertices.

Native acceptance: revisit Willow and Aspen cuts at both depths, compare normal and low water, orbit across patch boundaries, inspect floating supplies and dam mud edges, then check touch responsiveness on iPad. Confirm that bank/bed differences are apparent without reading status text. #20 remains open until that evidence exists.

## Next slices

1. Make the starting lodge's underwater entrance and approach visibly connected, coordinating #8 and #15. Keep bank-lodge relocation decisions explicit.
2. Add an optional survey view for sparse contours, actual/target crests and predicted shoreline; normal local play retains the fixed-height camera.
3. Review hauling/building balance and dam collision in the M1 queue before expanding colony or procedural systems.

This slice adds no plant succession, wetness persistence, survey overlay or new construction mechanics.
