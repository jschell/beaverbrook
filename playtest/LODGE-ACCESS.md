# Bank lodge and creek entrance clarity

2026-11-12 · [#21](https://github.com/jschell/beaverbrook/issues/21), bounded starting-home subtask of [#8](https://github.com/jschell/beaverbrook/issues/8), coordinated with #15/#20.

## Implemented choice

Retain the current bank-associated lodge and describe it as a bank lodge: an above-water dry chamber connects beneath the bank to the creek entrance. The mound, delivery/rest location, collision and household access predicate stay where they were. Freestanding lodge relocation and later shelter-site choices remain separate design work. This is a clarity slice, not founding or tunnel traversal.

The former horizontal torus marker is replaced with a dark creek-facing mouth and soil-colored rim. Both are positioned at the shared `LODGE_APPROACH` coordinates (-2.2,6) used by the depth predicate and entrance excavation. Their floor follows actual ground height, so deepening lowers the entrance; its top fits beneath the protected-access depth. The chamber is still at (-7,6). No stock, save keys, costs, player position or family behavior is changed.

Expand **Home and creek → How the lodge connects to the creek** for a side-section. It samples the existing terrain profile and actual water at the entrance's z coordinate; labels the chamber, bank and creek; and draws a dashed schematic underground connection. The passage interior is illustrative rather than a modeled collision/flow system. Text reports depth and protection via `homeStatus`, with the same 0.32 access threshold used by the family. The diagram updates after excavation, water-stage changes and completed dam changes. It describes actual conditions, not target-water previews.

## Evidence and limits

123 tests and build pass. Tests cover the untouched shallow approach, a real deepen action, normal/deepened low-water access, unchanged saved world, shared probe coordinates, lowered entrance geometry and a fully submerged mouth when access is protected. Existing terrain, supplies and mud regressions still pass.

Compatibility-browser fixture verified depth 0.00 initially, 0.72 after deepening and 0.47 at low water. These are game units. The native WebGL pixels remain unverified. Expanded home/section panels were checked at 1024×560, 768×900 and 512×900 CSS viewports: no horizontal overflow, home card ends above nudge, content scrolls and hint stays above the thumbstick. This is not native iPad Safari certification.

The passage is explained in an optional cutaway rather than exposed as a pipe across the ground. The world mouth remains a stylized marker/recess, not an excavated 3D tunnel into the chamber. New-player understanding and affected-iPad mouth/diagram readability remain open under #21. The broader #8 progression task is not closed by this work.

## Next

After reviewing this connection in ordinary play, the next planned visual tool is an optional survey overlay for contours and actual/target water/crest comparisons. Essential M1 collision and hauling/balance checks remain on the roadmap; this record does not imply those are complete.
