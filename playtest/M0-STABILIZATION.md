# M0 stabilization: terrain fading and family clarity

Implemented 2026-11-11 (Pacific). Tracks [#1](https://github.com/jschell/beaverbrook/issues/1) and [#2](https://github.com/jschell/beaverbrook/issues/2). This is the first bounded roadmap M0 change, not completion of M0.

## Reproduction and terrain correction

At beaver x=12, z=5, camera yaw=0 and follow distance=9, the camera is above the actual ground but inside the bounding box of a sloped 8-unit terrain tile. Previously the general object-containment shortcut treated that empty air as solid terrain. It faded an entire unobstructing tile toward opacity 0.14. A synthetic real-Three scene reproduced this without changing inventory or terrain.

Terrain now uses surface ray intersections to decide whether it blocks the beaver. Enclosing trees/lodge/other objects retain containment handling. Actual hillside intersections still fade, and leaving the obstruction restores opacity/depth writing. Orbiting does not change vertex colors. Fixed camera height, collision, excavation, hydrology and saves are unchanged.

This confirms and corrects a broad ground-fading defect. It does not independently establish that the exact brief white flash on the user's native renderer had this single cause. Issue #1 stays open for native WebGL/pixel confirmation, especially around harvesting/digging and water overlap.

## Family introduction and feedback

The opening identifies the adult and kit. Expand “Family at home” to learn who they are, why the adult swims or remains at the bank, and that the player gathers/builds while the household eats stored food on rest.

Dynamic text uses the same entrance-access and food predicates as family animation/status. A hungry household with a deep approach still correctly reports swimming access. No worker AI, extra food production or new household consumption is added. Notes start collapsed to keep optional explanation out of the main view.

## Verification and limits

105 automated tests pass; production build passes. Added regression checks cover misleading terrain-box containment, actual hillside fading, recovery, unchanged vertex colors and camera height, and independent family access/food explanations without state mutation.

Compatibility-browser checks exercised introduction, expandable family notes, movement to the lodge and deepening the entrance; family explanation changed from bank-waiting to swimming access. The HUD remained readable in the desktop view. Native WebGL pixels, real phones and fresh-player comprehension remain unverified.

## Remaining work

- #1: confirm whether the original white flash is gone on the affected native renderer; investigate a separate cause if it persists.
- #2/#7: observe whether a new player understands family roles from this presentation.
- #8: clarify starting lodge geometry/entrance as a separate change; no shelter relocation is included.
- #15: target-device/camera/accessibility verification remains open.
