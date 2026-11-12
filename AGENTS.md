# Beaverbrook repository guidance

The user authorized the first basic Three.js/vanilla JavaScript playtest on 2026-11-09, superseding the earlier documentation-only boundary for this experiment.

- Scope: Riverbank Refuge shelter choice, clues, authored water-stage changes, work/supplies, recovery and local test export.
- Keep gameplay rules separate from rendering and HTML controls.
- The user now targets gathering/hauling, a functional dam, its lodge and supporting items as the next gameplay slice. Read docs/design/first-creek-gathering-and-building.md; its specific costs/formulas remain proposals. Procedural maps, family AI and a broader game remain deferred.
- Start with README.md, playtest/README.md and docs/design/riverbank-refuge-paper-candidate.md.
- Preserve the distinction between proposals, implemented test behavior and verified findings. No claim of enjoyable gameplay or biological fidelity without evidence.
- Run npm test and npm run build for relevant changes. Browser verification must disclose WebGL/compatibility limits.
- Keep Pages deployment limited to static playtest output. Do not upload player logs automatically.

- Track actionable improvements in GitHub issues and docs/IMPLEMENTATION-BACKLOG.md. Update the affected issue, discussion disposition and experiment implementation record together. Keep completed behavior separate from human/device validation; superseded items must identify their replacement.
