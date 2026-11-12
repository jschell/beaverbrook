# Discussion and implementation backlog

Audited 2026-11-11 (America/Los_Angeles), against implementation commit `bad2de50bc8e30d85d82ac60b8e4c6390aa39375`.

This is the current status index. GitHub issues track actionable work; linked design documents retain rationale and alternatives. Earlier documents are historical snapshots unless their named experiment is still being tested. Their phrases “all findings open,” “no implementation” and “recommended first” are not current repository-wide status.

## Roadmap and subsequent planning

[Roadmap](ROADMAP.md) maps the issue queue to M0 stabilization, M1 established-family play, M2 founding, M3 settlement networks and M4 environmental scenarios, with separate behavior/player/device gates. [Environment and resource parameters](design/environment-and-resource-parameters.md) records candidate procedural variation and construction-material roles with wildlife sources. These additions are planning, not implemented features; the 39-document inventory below remains the original audit snapshot.

Starting-lodge placement and its visually disconnected entrance were explicitly opened under [PROG-01 / #8](https://github.com/jschell/beaverbrook/issues/8), coordinated with UX-01/SENSE-01/ART-01. Pond-edge integration remains an option. The bounded [bank-lodge clarity slice](../playtest/LODGE-ACCESS.md) now retains the current placement, identifies its type, and explains the entrance relationship under [#21](https://github.com/jschell/beaverbrook/issues/21); native/player acceptance remains open.

## Completed planning package

The [roadmap](ROADMAP.md), [procedural generation plan](design/procedural-generation-plan.md), and [building materials/realism plan](design/building-materials-and-realism-plan.md) are complete as reviewable planning deliverables. [Two-day request coverage and gap corrections](PLAN-COMPLETION-REVIEW.md) records what was checked and the distinction between captured, implemented, superseded and still unverified. New plans do not close runtime issues or change the original audit inventory.

## M0 implementation update

[Terrain fading and family clarity](../playtest/M0-STABILIZATION.md): corrected false terrain occlusion from sloped tile bounding boxes; added family introduction and state-based optional notes. BUG-01 remains open for confirmation of the exact native white flash. UX-01 explanation is implemented, with fresh-player validation still open. 105 tests pass; compatibility-browser verification only. This update does not close all of M0.

## Camera-dependent terrain follow-up

[Deep Willow cut reproduction and correction](../playtest/M0-STABILIZATION.md#follow-up-camera-dependent-pale-tiles-at-the-deep-willow-cut) records native screenshot/camera-motion evidence and a real-Three geometry reproduction: legitimate bank intersections faded an entire tile. Ground now stays opaque; the initially added wireframe duplicate has been removed after native-device feedback. Terrain occlusion shows only a thin player-feet ring; normal character materials stay solid. Trees/lodge retain fading. 118 tests and build pass; compatibility-browser evidence only. #1 remains open for affected-iPad confirmation, coordinated with #15.

## M1 construction update

[Wood, framework and sealing mud](../playtest/M1-CONSTRUCTION.md) implements a bounded #3/#6 slice and discrete packed-crest behavior for #5. New section costs depend on surveyed depth/span; mud sources, local transfers and visible stages are accounted and saved. Existing completed structures remain paid. 116 tests pass; compatibility-browser evidence only. #3/#5/#6 remain partial; #4 collision, full flow/storage and player/device validation remain open. M0 white-flash confirmation is still pending independently.

## Tablet layout update

[Tablet layout review](../playtest/IPAD-LAYOUT-REVIEW.md) addresses hint clipping and overlay bounds under [#17](https://github.com/jschell/beaverbrook/issues/17), linked to PLATFORM-01/#15. Nudge/hint have reserved space above controls; home/work details scroll independently; map/planner/menu remain reachable. Fifteen representative usable CSS viewports pass layout checks. Dam-planner follow-up keeps operation results/errors and preview summary inside the active dialog above independently scrolling controls; post-staking instructions persist. Existing-project extension, target change and refused removal were browser-checked, with routing regression assertions. Native iPad Safari touch, safe areas and WebGL remain unverified; #17 stays open for those checks.

## Loose supply support correction

[Supply support follow-up](../playtest/M1-CONSTRUCTION.md#loose-supply-support-after-excavation-2026-11-12) tracks [#18](https://github.com/jschell/beaverbrook/issues/18) and fixes unchanged loose logs hanging at their cached height after digging. Support follows current terrain and actual water independently of inventory geometry; mud-only loads settle on the bed. 119 tests and build pass; affected-device visual acceptance remains open.

## Packed mud and water rendering

[#19](https://github.com/jschell/beaverbrook/issues/19) and the [M1 rendering follow-up](../playtest/M1-CONSTRUCTION.md#packed-mud--water-rendering-correction-2026-11-12) track comb-like mud/water edges. Visual mud caps are separated from retained water, adjacent water tiles no longer overlap, and family mud/logs share fading. 120 tests and build pass. Native iPad pixel confirmation remains open; hydraulic crest and inventory are unchanged.

## Elevation readability slice

[#20](https://github.com/jschell/beaverbrook/issues/20) and [implementation record](../playtest/ELEVATION-READABILITY.md): half-unit terrain sampling, slope/exposed-soil cues, current wet shoreline and more transparent shallows. Existing simulation/save rules remain. 121 tests/build pass; compatibility-browser evidence only. Native iPad readability and performance remain open. Next: lodge entrance connection, then optional survey overlays.

## Bank lodge access clarity

[#21](https://github.com/jschell/beaverbrook/issues/21) and [implementation record](../playtest/LODGE-ACCESS.md): creek-facing mouth anchored to the shared depth/excavation probe, plus optional live section of chamber, bank, schematic passage and actual entrance water. Current placement/access/save rules remain. 123 tests/build pass; compatibility and three tablet viewport checks only. Native/player acceptance remains open; this does not close broad #8 progression.

## Optional survey slice

[#22](https://github.com/jschell/beaverbrook/issues/22) and [implementation record](../playtest/SURVEY-VIEW.md): Plan dam now offers explored-ground contours, solid current/dashed completed-target shorelines and a lodge water comparison. Default off; no state/cost/camera changes. 126 tests/build and 15 rendered tablet viewport bounds checks pass. Native iPad and player comprehension remain open. Next: validate planning with hauling/building choices, then M1 collision/route feedback.

## Status and maintenance

- **Resolved — implemented:** the bounded request exists with code/test evidence. This does not establish enjoyment, biological accuracy or device performance.
- **Partial:** a subset exists, or exists only in a separate experiment. Keep the remaining issue open.
- **Open:** reported defect, missing decision or missing validation. A suspected bug cause is not a diagnosis.
- **Proposed / deferred:** retained for evaluation, not an instruction to build every option.
- **Superseded:** replaced for a stated scope by a later choice; retain the old document for provenance.

For a change, update its issue, this index and its implementation record together. Close an issue only with evidence against its acceptance criteria or an explicit superseding decision. Link the replacement when superseding. Separate behavior verification from human validation. Split a broad issue into linked children when selected for implementation. P1 is the recommended next iteration, P2 is subsequent design/integration, P3 is deferred evaluation; these are priorities, not delivery promises.

## Coverage and limits

Reviewed all 39 Markdown files in the current Beaverbrook tree (including repository guidance), the 11 relevant current source documents in Ideas-for-projects, the visible Beaverbrook conversation and retrieved prior-discussion summaries. The document inventory below accounts for every reviewed repository file. Source material is read-only; Ideas-for-projects was not changed. Repeated conversation prompts such as “continue” are grouped with the subject they advance rather than treated as separate features. Unavailable full conversation transcripts cannot be exhaustively certified; no missing evidence is assumed resolved.

Current implementation evidence includes `playtest/explore-*.mjs`, `habitat-rules.mjs`, `journey-rules.mjs`, `dam-{placement,planner,water,work}.mjs`, earlier `creek-*`, `reach-*`, `patch-*`, and their tests. Latest recorded suite: 103 passing tests and successful Pages deployment. Browser evidence used the compatibility renderer; native WebGL/phone and fresh-player claims remain open.

## Actionable issue queue

| ID | Priority/status | Issue |
|---|---|---|
| BUG-01 | P1 / partial: deep-cut camera trigger reproduced; terrain made opaque; wireframe overlay replaced with feet marker; native acceptance open | [#1 White ground flash](https://github.com/jschell/beaverbrook/issues/1) |
| UX-01 | P1 / partial | [#2 Explain adult and kit](https://github.com/jschell/beaverbrook/issues/2) |
| DAM-01 | P1 / partial: depth-aware wood/packing implemented; strength deferred | [#3 Foundations, depth-aware costs, reinforcement options](https://github.com/jschell/beaverbrook/issues/3) |
| DAM-02 | P1 / open | [#4 Dam collision and crossings](https://github.com/jschell/beaverbrook/issues/4) |
| WATER-01 | P1 / partial | [#5 Filling, leakage and overflow feedback](https://github.com/jschell/beaverbrook/issues/5) |
| LOOP-01 | P1 / partial | [#6 Source choice and hauling](https://github.com/jschell/beaverbrook/issues/6) |
| TEST-01 | P1 / unverified | [#7 Comprehension, pacing, recovery and strategic appeal](https://github.com/jschell/beaverbrook/issues/7) |
| PROG-01 | P2 / open | [#8 Inherited home → founding → colony](https://github.com/jschell/beaverbrook/issues/8) |
| FOG-01 | P2 / partial | [#9 Live, remembered and unknown information](https://github.com/jschell/beaverbrook/issues/9) |
| ECO-01 | P2 / partial | [#10 Regeneration, recruitment and succession](https://github.com/jschell/beaverbrook/issues/10) |
| ANIMAL-01 | P3 / proposed | [#11 Consumers and ecology-driven encounters](https://github.com/jschell/beaverbrook/issues/11) |
| SCEN-01 | P3 / proposed | [#12 Validated multi-solution scenario patterns](https://github.com/jschell/beaverbrook/issues/12) |
| SENSE-01 | P2 / partial | [#13 River Sense, shelter clues and progression](https://github.com/jschell/beaverbrook/issues/13) |
| ART-01 | P3 / deferred | [#14 Finer visuals and animation plan](https://github.com/jschell/beaverbrook/issues/14) |
| PLATFORM-01 | P1 / partial, device checks open | [#15 WebGL, mobile, accessibility and offline scope](https://github.com/jschell/beaverbrook/issues/15) |
| RESEARCH-01 | P2 / open | [#16 Comparable games and ecological evidence](https://github.com/jschell/beaverbrook/issues/16) |

Suggested execution order: reproduce #1; improve #2 and run #7/#15 alongside changes; select a bounded #6/#3/#4/#5 slice. #3 precedes cost/strength tuning; #5 must choose cosmetic interpolation versus actual storage before claiming filling physics. #8 establishes the integration boundary before porting #9/#10/#13. #11/#12 depend on supported ecology, information and outcome rules. #14 remains evaluation only at the user's request.

## Discussion disposition

| Discussion/request | Disposition | Evidence or remaining work |
|---|---|---|
| Import ideas and create dedicated design notes | Resolved — documentation | [Sources](sources.md), design/reference inventory below; dedicated repo owns subsequent work. |
| Initial “do not build” boundary | Superseded for requested demos | Later explicit build requests and [repository guidance](../AGENTS.md); broader features are not blanket approved. |
| Basic Three.js / vanilla JS test area | Resolved — implemented | Authored maps and separate experiments; [Creekside](../playtest/CREEKSIDE.md). Procedural terrain is deferred. |
| Automatic GitHub Pages deployment / switch to Actions | Resolved — implemented | [Workflow](../.github/workflows/playtest-pages.yml); `bad2de50` deployment succeeded. |
| What should be visible / actionable in the playtest? | Partial | [Willow Cove](../playtest/WILLOW-COVE.md) documents current opening; clarity and engagement remain UX-01/TEST-01. |
| Water remains present; low/normal/high controls change actual water | Resolved for earlier test behavior; presentation partial | [Shelter-test corrections](../playtest/README.md), `tests/water.test.mjs`, `tests/reach.test.mjs`; Creekside intentionally has normal/dry, not three manual stage buttons. WATER-01/PLATFORM-01 cover current readability. |
| Tree types, source distances and construction supply | Partial | Three Creekside stands and harvest verbs; larger route/resource systems in First Reach. LOOP-01: better material roles and meaningful source tradeoffs. |
| Collect materials, build dam, lodge and supporting items | Partial across modes | First Creek/First Reach build shelters; Creekside improves an inherited lodge and places one new dam. New lodge construction is not available in the default mode: PROG-01. |
| “Feels like a checklist,” fun and interesting forward movement | Partial, human evidence open | Willow Cove uses outcome recognition and continued play, optional hints, multiple tested paths. This does not resolve enjoyment: LOOP-01/TEST-01/PROG-01. |
| Helping established family as tutorial | Resolved — bounded implementation | `journey-rules.mjs`, `tests/journey.test.mjs`, [Willow Cove](../playtest/WILLOW-COVE.md). Handoff to founding remains PROG-01. |
| Established home → new lodge/dam → colony | Open | First Reach permits one household to move among built shelters, not autonomous colonies. PROG-01. |
| Static selection versus immersive interaction | Partial; superseded as main control | Creekside uses direct third-person movement and nearby actions; explicit work buttons remain. First Reach queues are retained as a separate experiment. UX-01/LOOP-01/TEST-01. |
| Similar animal/building/board games; fresh broader perspectives | Open research gap | Reference synthesis exists; a complete source-backed comparative study is not established. RESEARCH-01. |
| Perspective options for resource/building simulation | Resolved for current POC; long-term choice open | Third-person default requested and implemented; map/queue experiments retained. No evidence that one perspective is universally best: TEST-01/PROG-01. |
| Third-person character movement and local discovery POC | Resolved — implemented | `explore-rules.mjs`, `explore-app.mjs`, `tests/explore.test.mjs`; full information model remains FOG-01. |
| Zoom clipping; fixed height and fading obstacles | Partial | Fixed-height follow boom and scenery fading implemented; device verification and the white-flash report prevent declaring presentation finished. BUG-01/PLATFORM-01. |
| Ground briefly turns white | Open reported defect | BUG-01. Terrain transparency/depth sorting is only a hypothesis; digging soil and preview colors do not explain the clarified report. |
| Two extra beavers: purpose and behavior | Partial | Adult/kit authored response exists, no autonomous labor. Explanation/readability remains UX-01; do not count this as family AI. |
| Finer geometry / detail later, evaluation only now | Deferred | ART-01 preserves evaluation scope; prioritize silhouette/material/action readability over indiscriminate polygons. |
| Food/structure from trees, felling and branch harvesting | Resolved — basic verbs; depth partial | Browse/prune/fell, carried loads and stock accounting in `habitat-rules.mjs`; universal edible/structural species assumptions not validated. LOOP-01/RESEARCH-01. |
| Dig channels after establishing water, improve transport | Partial | Two authored cuts, deepening and actual depth-dependent movement; arbitrary excavation and a broader channel network are absent. LOOP-01/WATER-01. |
| Dam height/length and terrain response | Resolved — bounded demo | Per-section absolute crests, span/extension and excavation-driven terrain in [Flexible dams](../playtest/FLEXIBLE-DAMS.md). Structural cost realism remains DAM-01. |
| Flexible player-chosen dam placement | Resolved — bounded demo | One new grid-snapped straight/angled span plus family dam; tests cover gaps, mixed heights, bypasses and extension. Curves/multiple new projects remain PROG-01/design scope. |
| Little or no erosion | Resolved — adopted demo constraint | Stable terrain; construction changes barriers, excavation changes bed. Do not introduce erosion as an implicit requirement. DAM-01/WATER-01 retain this boundary. |
| How to commence existing/new dam work | Resolved — implemented fix | Stakes exit preview; projected work markers, find controls, local material prompts and delivery/build priority. `dam-work.mjs`, `tests/dam-work.test.mjs`; comprehension still TEST-01. |
| Basic dam physics / realistic intuitive response | Partial | Terrain-edge barriers, low crests/gaps/bypasses and connected wet coverage exist. No volume/current/pressure/strength model. DAM-01/DAM-02/WATER-01. |
| Reinforcement, loose construction, sealing/mud, warned damage | Proposed | DAM-01; earlier First Creek mud recipe does not mean structural leakage/strength exists in Creekside. |
| Less desirable starter plants improving with maturity | Proposed, with partial age/root experiment | ECO-01; avoid a universal quality ladder or replacing all starter stock with superior stock. |
| Trees/shrubs propagating into newly wet land | Proposed | ECO-01: establishment requires suitable history and arrival; flooding is not automatic tree propagation. |
| Aquatic plants: arrival, depth and fast-water limits | Proposed | ECO-01 and [vegetation design](design/vegetation-and-resource-succession.md); not implemented by decorative reeds. |
| Water table, moisture, speed, light, substrate, scalable artifacts | Partial specification; implementation open | Rich environmental/cohort contract exists; current patches use simpler approximations. ECO-01; add fields only when rules use them. |
| Regeneration / renewable resources | Partial across modes | Creekside stock recovery; Shrub Seasons/First Reach roots/age/biomass. No shared full succession/recruitment system. ECO-01. |
| Moose, secondary/tertiary consumers, winter-store raids | Proposed, evidence required | ANIMAL-01; examples are not confirmed biological claims. No consumer population or raid system exists. |
| Ecology-driven quests/story, many resolutions | Proposed | ANIMAL-01/SCEN-01; state-driven signs/events, bounded intake and recorded actual resolution before quest scripting. |
| Repeatable generated scenarios, defined success, many paths | Proposed generator; partial predicates | SCEN-01. Scripted legal witnesses and Willow Cove outcome do not constitute a generator or verified strategic balance. |
| Fog of war, stable home view, stale remote observations | Partial across modes | Local map exploration and resource memories exist separately; full knowledge/observer policy and preview leaks remain FOG-01. |
| River clues, unsuitable rivers, lodge/den alternatives | Partial across modes | Riverbank Refuge/First Reach test shelter alternatives; default Creekside lacks relocation/new shelter. SENSE-01/PROG-01. |
| Skill trees, maturity, family expertise and journal | Proposed | SENSE-01/PROG-01; essential danger clues must never require grind. No implemented skill tree. |
| Persistent ownership, rewards, winter stores, generations | Partial storage; later scope open | Per-mode food/structures/saves exist; campaign journal, generations and colony ownership are not implemented. PROG-01/ANIMAL-01. |
| Initial POC versus MVP assessment | Open validation gate | Technical POC exists; unified main-mode progression, human testing and device validation remain. TEST-01/PROG-01/PLATFORM-01. |
| Save/reload, material accounting and local exports | Partial across modes | Creekside save validation/migration and separate experiment exports exist; no unified save/import/export/undo contract. PLATFORM-01/PROG-01. |
| Accessibility, offline-first and mobile | Partial / unverified | Keyboard/touch/reduced-motion support and local saves do not equal verified accessible mobile/offline product. PLATFORM-01. |

## Explicit supersessions

| Older assumption | Current replacement and scope |
|---|---|
| Documentation-only project | Explicitly requested playable experiments; future proposals remain proposals. |
| Riverbank Refuge or First Reach is the default root page | Willow Cove/Creekside `explore.html`; legacy pages remain available. |
| Main play must use fixed sites/static selections | Direct local control and flexible dam placement in Creekside; older tests preserve their own rules. |
| Fixed upstream flood-fill cutoff governs Creekside | Shared terrain-edge barrier solver; older rule fixtures remain historical regressions. |
| Flooded forage is universally unusable / high pond requires cache | First Creek channel correction allows reachable flooded forage and live feeding; no universal ecological claim. |
| All resources are finite / no regrowth exists anywhere | Finite original tests coexist with renewable patch experiments and simpler Creekside recovery. |
| Every gameplay audit finding remains wholly untouched | G01–G21 crosswalk below records implementation progress without closing human evidence gaps. |
| All design documents jointly define one finished ruleset | Each experiment's implementation record governs that experiment; the main-mode integration remains PROG-01. |
| Success means the entire proposed low-water interval was survived | Current Willow Cove recognizes one fed low-water night with reserve, earliest day 5; SCEN-01's three-day example remains a separate proposal. |
| Family presence means autonomous workers / additional colonies | Current adult and kit are authored feedback; First Reach queue is sequential shared-budget work for one household. |

## Original G01–G21 finding reconciliation

The [original review](reviews/gameplay-design-review.md) remains a historical documentation audit. “Resolved” below is limited to specifying/implementing the named rule, not validating the game as a whole.

| Finding | Current disposition | Evidence / remaining issue |
|---|---|---|
| G01 Successful-path choices | Partial | Multiple scripted solutions exist; their interesting decisions require TEST-01/LOOP-01. |
| G02 Strategy payoff | Partial | First Reach has inherited, deep-bank and meadow strategies; comparative appeal/balance remains TEST-01. |
| G03 Work versus season timing | Resolved for named experiments | Creekside commits local work then explicit rest; First Reach queues bounded work then explicit season. Integration is PROG-01. |
| G04 Resource purposes/costs | Resolved at trial-rule level | Per-mode material, food, effort and deposit contracts/tests exist; realistic material differences remain DAM-01/LOOP-01. |
| G05 Goal evidence | Partial | Depth, food, forecasts and outcome checks exist; novice interpretation/unknown-state consistency remains TEST-01/FOG-01. |
| G06 Observable victory | Resolved for implemented scenarios | Pure state predicates and actual consumption in `journey-rules.mjs`/`tests/journey.test.mjs`; understanding is a separate observation. |
| G07 Recoverable mistakes | Partial | Legal recovery traces exist; clarity/fairness and new-home recovery in main mode remain TEST-01/PROG-01. |
| G08 Construction agency | Resolved for current POC | Direct local work, arbitrary bank endpoints and section heights in bounded Creekside demo; not all buildings freely placeable. |
| G09 Information disclosure | Partial | Forecast/preview/local clues exist; full terrain preview and stale-state consistency remain FOG-01/SENSE-01. |
| G10 Maturity and baseline usability | Partial | Current basic controls are ungated; proposed progression has no adopted trigger model. SENSE-01. |
| G11 Opening and help | Partial | First haul, optional hints and fading guidance implemented; comprehension/pacing remains TEST-01. |
| G12 Family presence | Partial | Visible adult/kit implemented, but user confusion proves explanation still open. UX-01. |
| G13 Transfer versus replay | Open validation | Several experiments are not evidence of player knowledge transfer. TEST-01/SENSE-01. |
| G14 Difficulty/accessibility | Partial | Forgiving budgets/recovery and controls exist; age/difficulty/device evidence remains TEST-01/PLATFORM-01. |
| G15 Relocation/restraint | Partial | First Reach household moves and no-dam deep bend exist; default-mode integration remains PROG-01. |
| G16 Ecology as choices | Partial | Shared stock, recovery and water/harvest tradeoffs in experiments; ECO-01/TEST-01 remain. |
| G17 Experiment integration | Partial | First Reach integrates some settlement systems; it is separate from Creekside. PROG-01. |
| G18 Engagement evidence | Open | TEST-01; test counts and developer completions cannot close it. |
| G19 Campaign/mastery sequence | Proposed / deferred | Tutorial-to-founding-to-colony direction, no adopted full curriculum. PROG-01/SENSE-01. |
| G20 Rewards/persistence | Partial | Local world persistence exists; journal, campaign rewards and generations remain PROG-01. |
| G21 Sandbox purpose | Partial | Continued Creekside experimentation is implemented; restorative/free-play balance remains TEST-01/PROG-01. |

## Document inventory

Every document below was reviewed. Historical status banners redirect to this register; their original text is retained as dated evidence, not silently rewritten as a current claim.

| Document | Current disposition | Scope / follow-up |
|---|---|---|
| [AGENTS.md](../AGENTS.md) | Active repository guidance | Authorization boundaries; preserve proposal/implementation distinction. |
| [README.md](../README.md) | Current navigation | Default Willow Cove; all work tracked here and in issues. |
| [docs/README.md](README.md) | Current navigation | Index, precedence and experiment boundaries. |
| [docs/design/core-mechanics.md](design/core-mechanics.md) | Historical; partly implemented or superseded | Retain alternatives/costs for named legacy experiment; current dispositions above. |
| [docs/design/decisions.md](design/decisions.md) | Historical; partly implemented or superseded | Retain alternatives/costs for named legacy experiment; current dispositions above. |
| [docs/design/design-brief.md](design/design-brief.md) | Historical; partly implemented or superseded | Retain alternatives/costs for named legacy experiment; current dispositions above. |
| [docs/design/exploration-and-remembered-conditions.md](design/exploration-and-remembered-conditions.md) | Proposal; partially represented by experiments | FOG-01; full observer/knowledge model absent. |
| [docs/design/first-creek-gathering-and-building.md](design/first-creek-gathering-and-building.md) | Historical; partly implemented or superseded | Retain alternatives/costs for named legacy experiment; current dispositions above. |
| [docs/design/first-dry-spell.md](design/first-dry-spell.md) | Implemented separate/legacy experiment | Preserve experiment-specific behavior; not the default main mode. |
| [docs/design/first-scenario.md](design/first-scenario.md) | Historical; partly implemented or superseded | Retain alternatives/costs for named legacy experiment; current dispositions above. |
| [docs/design/hauling-channels-demo.md](design/hauling-channels-demo.md) | Implemented separate/legacy experiment | Preserve experiment-specific behavior; not the default main mode. |
| [docs/design/mvp-and-playtesting.md](design/mvp-and-playtesting.md) | Historical; partly implemented or superseded | Retain alternatives/costs for named legacy experiment; current dispositions above. |
| [docs/design/open-decisions.md](design/open-decisions.md) | Historical; partly implemented or superseded | Retain alternatives/costs for named legacy experiment; current dispositions above. |
| [docs/design/progression-and-ecology.md](design/progression-and-ecology.md) | Proposal; partially represented by experiments | PROG-01/ECO-01; colony/skill scope deferred. |
| [docs/design/river-sense-and-shelters.md](design/river-sense-and-shelters.md) | Proposal; partially represented by experiments | SENSE-01; maturity/journal not implemented. |
| [docs/design/riverbank-refuge-paper-candidate.md](design/riverbank-refuge-paper-candidate.md) | Historical; partly implemented or superseded | Retain alternatives/costs for named legacy experiment; current dispositions above. |
| [docs/design/riverbank-refuge-paper-walkthroughs.md](design/riverbank-refuge-paper-walkthroughs.md) | Historical; partly implemented or superseded | Retain alternatives/costs for named legacy experiment; current dispositions above. |
| [docs/design/riverbank-refuge-resolution-options.md](design/riverbank-refuge-resolution-options.md) | Historical; partly implemented or superseded | Retain alternatives/costs for named legacy experiment; current dispositions above. |
| [docs/design/scenario-patterns-and-outcomes.md](design/scenario-patterns-and-outcomes.md) | Proposal; partially represented by experiments | SCEN-01; no generator. |
| [docs/design/supporting-gameplay-options.md](design/supporting-gameplay-options.md) | Historical; partly implemented or superseded | Retain alternatives/costs for named legacy experiment; current dispositions above. |
| [docs/design/vegetation-and-resource-succession.md](design/vegetation-and-resource-succession.md) | Proposal; partially represented by experiments | ECO-01; full recruitment/succession absent. |
| [docs/design/willow-cove-tutorial.md](design/willow-cove-tutorial.md) | Proposal; partially represented by experiments | Opening implemented; founding handoff PROG-01. |
| [docs/references/beaverbrook-gameplay-spec.md](references/beaverbrook-gameplay-spec.md) | Reference / evidence leads; not approved implementation | RESEARCH-01; verify source claims and transfer limits. |
| [docs/references/beaverbrook-river-sense.md](references/beaverbrook-river-sense.md) | Reference / evidence leads; not approved implementation | RESEARCH-01; verify source claims and transfer limits. |
| [docs/references/beaverbrook.md](references/beaverbrook.md) | Reference / evidence leads; not approved implementation | RESEARCH-01; verify source claims and transfer limits. |
| [docs/references/gameplay-design-principles.md](references/gameplay-design-principles.md) | Reference / evidence leads; not approved implementation | RESEARCH-01; verify source claims and transfer limits. |
| [docs/references/prior-art-and-transferable-patterns.md](references/prior-art-and-transferable-patterns.md) | Reference / evidence leads; not approved implementation | RESEARCH-01; verify source claims and transfer limits. |
| [docs/references/research-to-mechanics.md](references/research-to-mechanics.md) | Reference / evidence leads; not approved implementation | RESEARCH-01; verify source claims and transfer limits. |
| [docs/research/beaver-evidence-backlog.md](research/beaver-evidence-backlog.md) | Reference / evidence leads; not approved implementation | RESEARCH-01; verify source claims and transfer limits. |
| [docs/reviews/gameplay-design-review.md](reviews/gameplay-design-review.md) | Historical; partly implemented or superseded | G01–G21 reconciled individually above. |
| [docs/reviews/gameplay-design-work-plan.md](reviews/gameplay-design-work-plan.md) | Historical; partly implemented or superseded | G01–G21 reconciled individually above. |
| [docs/sources.md](sources.md) | Historical provenance plus current audit pointer | Read-only upstream origins; current status belongs to this register. |
| [playtest/CREEKSIDE.md](../playtest/CREEKSIDE.md) | Current bounded implementation record | LOOP-01/ECO-01/PLATFORM-01; main direct-control mode. |
| [playtest/FIRST-CREEK.md](../playtest/FIRST-CREEK.md) | Implemented separate/legacy experiment | Preserve experiment-specific behavior; not the default main mode. |
| [playtest/FIRST-REACH.md](../playtest/FIRST-REACH.md) | Implemented separate/legacy experiment | PROG-01/FOG-01; one household, separate engine/save. |
| [playtest/FLEXIBLE-DAMS.md](../playtest/FLEXIBLE-DAMS.md) | Current bounded implementation record | DAM-01/DAM-02/WATER-01; historical test counts are dated evidence. |
| [playtest/README.md](../playtest/README.md) | Implemented separate/legacy experiment | Preserve experiment-specific behavior; not the default main mode. |
| [playtest/SHRUB-SEASONS.md](../playtest/SHRUB-SEASONS.md) | Implemented separate/legacy experiment | ECO-01/FOG-01; no recruitment/succession. |
| [playtest/WILLOW-COVE.md](../playtest/WILLOW-COVE.md) | Current bounded implementation record | UX-01/TEST-01/PROG-01; one-night outcome only. |

## Upstream and discussion provenance

The 11 reviewed upstream files were `animal-browser-games/beaverbrook.md`, `beaverbrook-gameplay-spec.md`, `beaverbrook-river-sense.md`, the six dedicated `beaverbrook/` design files, `gameplay-design-principles.md`, and `research-to-mechanics.md` in [Ideas-for-projects](https://github.com/jschell/Ideas-for-projects/tree/main/animal-browser-games). They remain reference material with the same dispositions as the corresponding imported documents above. No upstream file was edited.

Conversation evidence is grouped by subject in the disposition table. In particular, the user corrected the symptom to a white ground flash, explicitly deferred finer-visual implementation, requested realistic-enough dam behavior, and presumed little/no erosion. Those qualifiers are preserved in BUG-01, ART-01 and DAM-01/WATER-01 rather than replaced by earlier assistant interpretations. Retrieved prior discussion confirms the documentation-first origin, later build requests, and continuing validation gaps; it does not supply independent playtest evidence.


