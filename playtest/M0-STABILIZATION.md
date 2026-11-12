# M0 stabilization: terrain fading and family clarity

Implemented 2026-11-11 (Pacific). Tracks [#1](https://github.com/jschell/beaverbrook/issues/1) and [#2](https://github.com/jschell/beaverbrook/issues/2). This is the first bounded roadmap M0 change, not completion of M0.

> 2026-11-12 follow-up below supersedes terrain fading: ground stays opaque and a local player outline handles terrain occlusion. Tree/lodge fading remains.

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


## Follow-up: camera-dependent pale tiles at the deep Willow cut

User screenshot BACBC853-FAEF-4DE6-9E87-D06A94A66C07.jpeg shows the foreground patch in native WebGL. The user subsequently confirmed changing camera position removes it. That establishes view dependence, not a resource/ground-color change.

A real-Three geometry diagnostic reproduced the mechanism at player **x=-7, z=1**, **west channel depth=2**, day 1, yaw **0**, follow distance **6.5**. The camera is about **2.65 units above its local ground**, yet rays toward the beaver intersect the bank beside the deeper cut. The preceding code fades one whole **8×8** terrain patch to **0.14 opacity**, disabling its depth writes. Nearby (-6,1) and (-5,1) show the same result; a camera orbit clears it. This is a different trigger from the earlier false bounding-box case: these are actual terrain triangle intersections. No harvesting action is required. Transparent terrain exposes the pale scene background and can interact with the separately transparent water draw order. Native pixel reproduction of the supplied screenshot is still unavailable; the full extent of any additional GPU-specific sorting defect is unconfirmed.

### Correction

Ground no longer enters the transparent scenery path. It retains opacity 1, depth writes and its original vertex colors at every camera angle. When terrain intersects the player sightlines, a small amber wireframe of the player (and visible load) draws through the bank in WebGL. The compatibility renderer uses a small amber location outline. Clear sightlines remove the indication after a short hold. Trees, lodge and other scenery retain smooth independent fading; camera height, movement/collision, excavation, water rules and saves are unchanged.

This deliberately replaces whole-tile ground fading. A hillside can still cover the player's normal mesh; the outline communicates the player's position rather than exposing pale background through the hillside. Local terrain cutaways can be evaluated later without reopening the whole-tile transparency behavior.

### Evidence and remaining limits

118 tests pass, including the precise deep-cut reproduction, solid terrain/depth writing, outline visibility and clearing after camera rotation, stable vertex colors, unchanged state, real hillside obstruction, and existing tree/lodge fade recovery. The production build passes. A rendered compatibility-browser check shows solid ground at the deep-cut camera angle; it cannot certify WebGL wireframe pixels or iPad GPU behavior. Compatibility terrain uses a coarser mesh, so exact occlusion boundaries differ.

Versioned app/scene URLs ensure a reload requests the correction. #1 remains open for the affected iPad: revisit the deep Willow cut, orbit the camera, walk while carrying wood, and inspect water/terrain edges. Report whether any broad pale rectangle remains. This is a reproduced mechanism and implemented correction, with native device acceptance pending.
