# Beaverbrook

A proposed browser strategy game about guiding a beaver family to a safe home by reading river clues, choosing a suitable shelter, and adapting to seasonal change.

**Current phase: First Creek hauling-channel demo (0.4.0).** The user authorized the first Three.js/vanilla-JS test on 2026-11-09. The working name, rules, scope and technology preferences remain subject to review and playtesting.

The design targets curious players around ages 8–10+ and adults, with short, approachable scenarios and optional depth. Building a dam is one possible response to a river; choosing a bank den, a sheltered lodge or another reach can be the better decision.

## Start here

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

The default First Creek experiment connects gathering, hauling, dam and lodge construction with one forecast dry spell. Choose pond depth, entrance work, food access and hauling-channel investment, then test and adapt the settlement. Flooded branches remain available by water; a cache is optional. See [the channel demo rules and evidence](docs/design/hauling-channels-demo.md). The construction sandbox retains optional rain and repair supplies. See [the scenario rules and playtest questions](docs/design/first-dry-spell.md). Riverbank Refuge remains a separate shelter-choice experiment. Both are trial gameplay, not an approved full-game MVP.

The tests use Three.js and vanilla HTML/CSS/JavaScript, deterministic rule modules and static hosting. Run `npm ci`, `npm test`, and `npm run build`; serve `dist/` over HTTP and open `/playtest/creek.html`. See [First Creek instructions](playtest/FIRST-CREEK.md) and [shelter-test instructions](playtest/README.md). There is no PWA or persistent save yet.

## Origin

The initial documentation was brought over from [Ideas-for-projects / animal-browser-games](https://github.com/jschell/Ideas-for-projects/blob/2fabfceba1feab90f2ee4a60c13680f2125a8f98/animal-browser-games/) on 2026-11-09. Dedicated design notes are the planning baseline; earlier concept documents remain supporting references. The source repository was left unchanged.

[MIT license](LICENSE).

