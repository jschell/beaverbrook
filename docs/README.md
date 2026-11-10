# Documentation guide

**Phase:** first basic playable experiment, authorized on 2026-11-09. The [playtest](../playtest/README.md) implements the Riverbank Refuge candidate for testing. Other design documents remain proposals, not a finished implementation specification.

## Implemented settlement experiment

[First Reach](../playtest/FIRST-REACH.md) connects simultaneous dams, three shelter sites, queued construction and supply, living resources, seasonal objectives and continued play. Sites remain authored. See the implementation record for verified strategies and limits.

## Implemented resource experiment

[Shrub seasons](../playtest/SHRUB-SEASONS.md) implements persistent shrub patches, root reserves, environmental recovery, seasonal demand, remembered resource observations and local autosave. Terrain remains visible and the ecological values are trial rules.

## Exploration and information

[Exploration, visibility and remembered conditions](design/exploration-and-remembered-conditions.md) proposes home observation, family sight, stale map information and fair scenarios under incomplete knowledge.

## Repeatable gameplay scenarios

[Scenario patterns and outcome rules](design/scenario-patterns-and-outcomes.md) defines outcome predicates, pattern composition, strategic alternatives, feasibility witnesses and story triggers. This remains a design proposal.

## Environment and resource regeneration

[Vegetation, materials and wetland succession](design/vegetation-and-resource-succession.md) proposes environmental fields, plant traits, recruitment, recovery, succession and scalable state artifacts. This remains a design proposal.

## Proposed opening chapter

[Learning at Willow Cove](design/willow-cove-tutorial.md) describes the family-lodge tutorial and its handoff to founding a home.

## First Creek implementation

Version 0.4.0 adds [hauling channels and corrected food access](design/hauling-channels-demo.md). The header **Channel demo** opens a prebuilt finite-source settlement for quick digging/hauling/weather tests. This record supersedes the earlier food-flooding restriction and integer effort totals.


Version 0.3.0 adds one forecast dry spell, a deepened entrance, feeding route, and an explicit outcome to the gathering → hauling → dam → pond → lodge loop. [Scenario rules and human-playtest questions](design/first-dry-spell.md) explain the two demonstrated approaches. See [controls, recipes and verification](../playtest/FIRST-CREEK.md). Earlier cost/route proposals below remain historical context; the implementation record names the adopted trial choices and limitations.

## Earlier building proposal

[First Creek: gathering, hauling, dam and lodge](design/first-creek-gathering-and-building.md) records the user's requested building-first direction. Riverbank Refuge remains the existing shelter test. Its illustrative values remain historical proposals; the implementation guide records the adopted trial rules.

## Read in this order

| Document | Purpose |
|---|---|
| [Decision register](design/decisions.md) | Current interpretation of inherited choices and scope |
| [Design brief](design/design-brief.md) | Player promise and pillars |
| [River Sense and shelters](design/river-sense-and-shelters.md) | Evidence, maturity and site-dependent shelter selection |
| [First scenario](design/first-scenario.md) | Riverbank Refuge beats and acceptance criteria |
| [Core mechanics](design/core-mechanics.md) | Proposed state, resolution order and simulation constraints |
| [Progression and ecology](design/progression-and-ecology.md) | Expertise, journal, habitat and later campaign |
| [MVP and playtesting](design/mvp-and-playtesting.md) | Separate experiments and integration gates |
| [Open decisions](design/open-decisions.md) | Unresolved rules and next design work |

## Gameplay review

The [2026-11-09 gameplay design review](reviews/gameplay-design-review.md) audits the imported baseline and records 21 open findings. Its [design work plan](reviews/gameplay-design-work-plan.md) groups the proposed follow-up into five documentation packets.

These are review findings and recommendations; they do not replace the baseline rules or claim player-test evidence. Start with G01–G07 before treating Riverbank Refuge as a coherent paper-playable scenario.

## Resolving the gaps

- [Core scenario options](design/riverbank-refuge-resolution-options.md) — G01–G10 and G15: choices, economy, evidence, victory and recovery.
- [Supporting gameplay options](design/supporting-gameplay-options.md) — G11–G14 and G16–G21: opening, family, transfer, difficulty, ecology and later modes.

Each includes alternatives, tradeoffs, a recommended candidate and required follow-up artifacts. Recommendations remain unselected; the imported baseline is unchanged.

## Concrete paper candidate

[Riverbank Refuge v0.1](design/riverbank-refuge-paper-candidate.md) instantiates the recommended options with trial rules, site/evidence tables, stage budgets and action costs. [Walkthroughs and desk checks](design/riverbank-refuge-paper-walkthroughs.md) document B/C success, A recovery, C entrance correction and invalid advances.

This is a named proposal for review, not adopted production rules. It includes explicitly new optional nook/reserve outcomes to test the timing tradeoff. Existing alternatives remain available; no player testing has occurred.

## Supporting material

| Document | Status and use |
|---|---|
| [Original concept](references/beaverbrook.md) | Historical exploration; contains broader scope and speculative estimates |
| [Earlier gameplay specification](references/beaverbrook-gameplay-spec.md) | Water-first proposal; useful for First Creek, not a finalized MVP |
| [Earlier River Sense exploration](references/beaverbrook-river-sense.md) | Detailed clues, alternative shelters and assessment UI |
| [Gameplay principles](references/gameplay-design-principles.md) | Shared ages 8–10+ design guidance, not measured findings |
| [Research-to-mechanics register](references/research-to-mechanics.md) | Imported mixed animal research leads; beaver rows are relevant here |
| [Prior art and transferable patterns](references/prior-art-and-transferable-patterns.md) | Focused review of neighboring concepts and cited games |
| [Beaver evidence backlog](research/beaver-evidence-backlog.md) | Claims needing verification before educational copy |
| [Source provenance](sources.md) | Pinned source links and adaptation record |

## Status and precedence

The decision register records how this import reconciles the sources. The six dedicated design documents provide the proposed baseline. Earlier references preserve alternatives and background; they do not add requirements to the first experiment.

“Proposed” is not “approved.” Illustrative game units are not balance values. Acceptance criteria describe future verification; no playtests or simulation checks have been performed. Research links are leads, not claims newly verified by this import.

