# Beaverbrook

A proposed browser strategy game about guiding a beaver family to a safe home by reading river clues, choosing a suitable shelter, and adapting to seasonal change.

**Current phase: a playable Willow Cove opening in Creekside, with separate settlement and placement experiments.** The user authorized the first Three.js/vanilla-JS test on 2026-11-09. The working name, rules, scope and technology preferences remain subject to review and playtesting.

The design targets curious players around ages 8–10+ and adults, with short, approachable scenarios and optional depth. Building a dam is one possible response to a river; choosing a bank den, a sheltered lodge or another reach can be the better decision.

## Improvement tracking

Completed planning package: [roadmap](docs/ROADMAP.md), [procedural generation](docs/design/procedural-generation-plan.md), [building materials and realism](docs/design/building-materials-and-realism-plan.md), and [discussion coverage review](docs/PLAN-COMPLETION-REVIEW.md). Planning status is separate from implemented features.

[Roadmap](docs/ROADMAP.md) defines the stages, dependencies and completion gates from helping the family to founding a home, connected settlements and varied scenarios.

[Discussion and implementation backlog](docs/IMPLEMENTATION-BACKLOG.md) is the current status index, including resolved/superseded discussions and G01–G21. [GitHub issues](https://github.com/jschell/beaverbrook/issues) track actionable work and acceptance evidence.

## Start here

- [Play Willow Cove](playtest/explore.html) — help the family through a low-water night, choose how to protect access and gather food, then keep exploring; [implemented opening and remaining gaps](playtest/WILLOW-COVE.md). This is the default Pages entry.

- [Flexible dam placement lab](playtest/explore.html?mode=dam-lab) — choose bank endpoints, span and section heights; preview water, haul nearby timber and build locally. Stable terrain with no erosion; [controls, rules and limits](playtest/FLEXIBLE-DAMS.md).

- [Creekside living creek test](playtest/explore.html) — steer a beaver, harvest food and wood, supply the family, improve the dam and dig useful hauling cuts in an open-ended persistent area; [controls and limits](playtest/CREEKSIDE.md).

- [First Reach](playtest/reach.html) — restore the inherited home, establish a meadow pond or settle a natural deep bend. Queue work and continue after low water; [rules and limits](playtest/FIRST-REACH.md).

- [Shrub seasons](playtest/patches.html) — balance three renewable patches, refresh remembered supplies and feed the lodge across a dry season; [rules and limits](playtest/SHRUB-SEASONS.md).

- [Quick channel demo](playtest/creek.html?mode=channels) — preview and dig hauling cuts, then test falling water.
- [First Creek playtest](playtest/creek.html) — gather, build a home, choose a food/water plan, and adapt to a dry spell; [instructions](playtest/FIRST-CREEK.md).
- [Documentation guide](docs/README.md) — reading order and document status.
- [Design brief](docs/design/design-brief.md) — promise, pillars and proposed format.
- [Decision register](docs/design/decisions.md) — inherited direction, scope boundaries and conflicts resolved for planning.
- [Riverbank Refuge](docs/design/first-scenario.md) — original first-scenario design.
- [Gameplay design review](docs/reviews/gameplay-design-review.md) — gaps in choices, pacing, recovery and progression.
- [Open decisions](docs/design/open-decisions.md) — what still needs design work.
- [Source provenance](docs/sources.md) — import mapping and pinned source revision.

## Design direction

Observe environmental clues → compare sites and shelters → preview a choice → build or relocate → advance the season → understand and recover from the outcome.

River Sense improves interpretation and forecasting; it does not change physical rules or hide essential safety clues behind experience levels. Shelter safety depends on the site. Ecology creates tradeoffs, and a healthy undammed stream can already be a good outcome.

## Scope

The earlier First Creek experiment connects gathering, hauling, dam and lodge construction with one forecast dry spell. Choose pond depth, entrance work, food access and hauling-channel investment, then test and adapt the settlement. Flooded branches remain available by water; a cache is optional. See [the channel demo rules and evidence](docs/design/hauling-channels-demo.md). The construction sandbox retains optional rain and repair supplies. See [the scenario rules and playtest questions](docs/design/first-dry-spell.md). Riverbank Refuge remains a separate shelter-choice experiment. Both are trial gameplay, not an approved full-game MVP.

The tests use Three.js and vanilla HTML/CSS/JavaScript, deterministic rule modules and static hosting. Run `npm ci`, `npm test`, and `npm run build`; serve `dist/` over HTTP and open `/playtest/explore.html`. See [First Creek instructions](playtest/FIRST-CREEK.md) and [shelter-test instructions](playtest/README.md). There is no PWA. Creekside and First Reach use local browser saves; earlier experiments have their own persistence limits.

## Origin

The initial documentation was brought over from [Ideas-for-projects / animal-browser-games](https://github.com/jschell/Ideas-for-projects/blob/2fabfceba1feab90f2ee4a60c13680f2125a8f98/animal-browser-games/) on 2026-11-09. Dedicated design notes are the planning baseline; earlier concept documents remain supporting references. The source repository was left unchanged.

[MIT license](LICENSE).

