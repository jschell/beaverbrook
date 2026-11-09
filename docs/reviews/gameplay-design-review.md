# Gameplay and game design review

**Date:** 2026-11-09  
**Reviewed baseline:** [89c067b](https://github.com/jschell/beaverbrook/commit/89c067b51598f9a280a90e7fe212d559cec2d3cf)  
**Status:** documentation audit and design hypotheses. No player tests, external comparative research, game implementation or balance simulation were conducted. Recommendations are proposals, not adopted mechanics.

## Assessment

Beaverbrook has a coherent promise: read the river, choose an appropriate home and adapt to seasonal consequences. The documents are strongest on fairness, ecological restraint, recoverable mistakes and separating two experiments.

The main missing layer is **a sequence of consequential player decisions**. The first scenario currently specifies a teaching sequence more fully than a repeatable game loop. It explains what the player should learn, but does not establish why two successful approaches are attractive, what a careful player does after settling, or how resource allocation creates tension.

This does not show that the game would be dull. It shows that the documentation does not yet give us enough rules to judge whether it would be engaging. More systems would not automatically solve that problem.

## Review scope and method

Read the repository guidance, README and documentation guide; all eight existing design documents; all six reference documents; the evidence backlog and source record. Reviewed their proposed choices, feedback, incentives, pacing, failure paths and scope together. Source documents are linked below at their current paths; the commit above pins the audited version.

For each gap, ask:
- What can the player choose?
- What information supports the choice?
- What is given up?
- What changes because of the choice?
- What later decision becomes different?
- What would show the design works?

A statement such as “two viable strategies” is an intention until complete successful paths and their differences are documented. Missing documentation is not proof a mechanic is absent from the designer's intent.

## Strengths to preserve

| Strength | Where documented | Why it helps the design |
|---|---|---|
| Strong central question | [Brief](../design/design-brief.md), Promise | “What home fits this river?” can connect observation, construction and adaptation |
| Site-dependent shelter tradeoffs | [River Sense](../design/river-sense-and-shelters.md), Shelter alternatives | Supports reasoning instead of a fixed upgrade ladder |
| Fair novice information | River Sense, Maturity stages | Avoids losing solely because a safety clue was locked |
| Deterministic, explained outcomes | [Core mechanics](../design/core-mechanics.md), Invariants | Makes experiments and learning possible |
| Recoverable setbacks | [First scenario](../design/first-scenario.md), Success and failure | Supports experimentation and a forgiving tone |
| Ecology without universal improvement score | [Progression](../design/progression-and-ecology.md), Habitat consequences | Allows intervention, restraint and relocation to matter |
| Independent experiments | [MVP plan](../design/mvp-and-playtesting.md), Two independent experiments | Avoids requiring a large simulator to examine the distinctive hook |

## Priority and finding index

P0: resolve for a coherent paper-playable River Sense scenario. P1: resolve before calling a later playable experiment representative of the intended game. P2: later design work; not a reason to expand the first experiment. These are design-work priorities, not implementation tasks. All findings below remain open.

| ID | Priority | Gap | Evidence in current documents | Required design output |
|---|---|---|---|---|
| G01 | P0 | Successful path may have only one substantial choice | First scenario, Play beats: inspect, compare, build, flood; adaptation mainly follows damage | Decision sequence for successful B and C runs |
| G02 | P0 | Second strategy lacks a defined advantage | First scenario, Map: B is safe; C needs placement correction; both mention food/time tradeoffs without costs | Complete B/C comparison and successful paths |
| G03 | P0 | Turn, work and seasonal commitment are undefined | Brief says Advance Day/Season; core says Advance resolves work and water | Separate planning, work resolution and seasonal advancement rules |
| G04 | P0 | Resources have names without strategic jobs | Core, Resources: branches, mud, food, work; costs are missing | Budget and opportunity-cost table |
| G05 | P0 | Required low-water/food evidence is incomplete | First scenario requires low-stage entrance and food route; low-water check and food indicator described as optional | Goal-to-clue-to-action-to-outcome map |
| G06 | P0 | Victory mixes world state with player understanding | First scenario, Explicit rules: “home safe + food access + player understanding” | Observable game victory separated from research observations |
| G07 | P0 | Recovery cannot yet be followed through to resilient success | First scenario permits repair/replace; core uses damage and exposure; budget/event recurrence undefined | A failure → repair/relocate → valid success trace |
| G08 | P1 | Construction agency is unresolved | Fixed three sites plus tile-map wording and “correctly positioned” C | Choose site/slot/tile placement for each verb |
| G09 | P1 | Information may either solve the game or feel misleading | Exact water preview, qualitative forecast, unknowns, maturity and site comparisons coexist | Information disclosure table with example UI copy |
| G10 | P1 | Maturity may gate baseline usability or reward repeated clicks | River Sense maturity unlocks inspection and side-by-side comparison; first scenario expects novice comparison | Baseline capabilities and meaningful progression triggers |
| G11 | P1 | Opening may front-load inspection without a satisfying action | First scenario allocates arrival, survey and comparison before commitment; shared principles target first enjoyable action in 60 seconds | First-minute storyboard and optional onboarding/hints |
| G12 | P1 | Family fantasy is scarcely expressed in the first experiment | Brief promises family home; A excludes family AI; scenario only says “one family” | Minimal visible family presence and action feedback |
| G13 | P1 | Replay and knowledge transfer are not distinguished | Fixed sites and authored flood; acceptance emphasizes repeated explanation | One contrasting paper scenario using the same rules |
| G14 | P1 | Difficulty has no concrete tuning model | Broad 8–10+ and adult audience; later expert constraints suggested | Small set of difficulty levers and fixed fairness rules |
| G15 | P1 | Relocation and restraint lack bounded playable consequences | Brief and ecology favor moving/no dam; first scenario only provides local candidates | Scope/cost/result rules for moving and leaving a reach |
| G16 | P1 | Ecology often reads as decoration rather than decisions | Harvest/regrowth and indicators described without delays or competing goals | Causal chain and delayed consequence example for integration |
| G17 | P1 | Separate experiments may miss each other's appeal | A has observation without dam transformation; B has water without shelter comparison | Separate learning questions plus later integration hypothesis |
| G18 | P1 | Playtest gates emphasize comprehension more than engagement | MVP plan measures explanations, fairness and desire for another run | Decision-quality, pacing and transfer observation plan |
| G19 | P2 | Campaign structure names settings without a mastery sequence | Progression, Campaign outline; no chapter-to-chapter skill map | Introduce/practice/recombine/transfer curriculum for gameplay |
| G20 | P2 | Long-term rewards and ownership remain unspecified | Journal, mastery and family continuity are mentioned, mostly deferred | Reward purpose and persistence boundaries |
| G21 | P2 | Sandbox has no intended experience yet | Brief defers sandbox; earlier concept suggests restorative play | Later mode brief or explicit decision to omit |

## G01–G02: prove that the player is making choices

### Current shortest successful path

Inspect relevant clues → choose B → build den → advance through flood → confirm low-stage access and food route → finish.

Nothing in the current rules clearly requires an additional allocation decision on this path. A player who chooses well may simply wait for confirmation, while a player who chooses A receives most of the adaptation gameplay.

That is a useful introductory lesson, but not yet evidence of a 10–15-minute strategy scenario. The intended duration should emerge from worthwhile actions. Do not extend it with mandatory waiting, repeated inspection or a required mistake.

### Two valid locations do not establish two attractive strategies

B has explicit low-water access, high-water chamber safety and suitable banks. Its longer food route has no defined work cost. C has an unresolved low-water drawback and needs repositioning, while the specific advantage that compensates the player is not stated.

This is a **dominant-strategy risk**, not a proven balance failure: budgets and payoffs are too incomplete to demonstrate dominance.

Document both complete paths, including:
- Safe shelter and reachable food under all required stages.
- Initial work/material costs, recurring costs and remaining reserve.
- What B does better, what C does better and which preference each serves.
- A later decision changed by the initial choice.
- Whether leftover resources matter to success, optional goals or simply player expression.

A possible design direction is “lower initial setup versus lower later travel cost.” This is a proposal, not current canon. It must change an actual allocation; a longer animated trip alone is cosmetic.

Do not invent a third subsystem to justify each site. Two existing constraints can be enough. A can remain a clearly signaled teaching hazard; not every candidate needs to be an equally viable strategy.

**Closure evidence:** two complete successful paper runs with different reasons to choose them, plus a successful run containing a later decision. If the scenario intentionally remains a single-decision tutorial, label it accordingly and test the repeated loop elsewhere.

## G03–G04: define what a turn asks of the player

There are several incompatible readings of the present notes:
1. Build immediately, then Advance changes the weather.
2. Queue work, then Advance performs work and changes weather.
3. Spend daily work across several turns before choosing a seasonal transition.

All could be designed coherently, but they create different games. In option 2 a player might flood before construction finishes; in option 3 unlimited days might trivialize seasonal preparation. The documents do not establish which consequences apply.

Define what each action consumes, when it becomes real and what moves time forward. Specify what happens when the player advances with unused work, queues an unaffordable action, has no shelter, or simply waits.

Keep free observation unless testing identifies a real problem. Charging for clue reading or adding a real-time countdown would undermine the approachable premise. Strategic pressure can come from limited work before a clearly announced event.

For each resource, give it a distinct gameplay job:
- **Work:** competing preparation tasks, if time allocation is in scope.
- **Branches/mud:** construction alternatives only if their costs genuinely differ.
- **Food:** choose access, reserve, or both explicitly; Riverbank Refuge currently requires access while the general design invokes winter stores.
- **Travel:** decide whether it uses work, food or no strategic resource. Remove “food-equivalent travel” from current rules once chosen.

If mud is abundant everywhere and no action competes for it, it may not need to be a tracked resource in A. Likewise, do not add winter consumption merely because the broader game has winter.

**Closure evidence:** one action table and a finite event sequence that can be resolved by hand without facilitator invention.

## G05–G07: make success, information and recovery agree

### Low water and food cannot be optional if they determine victory

The first scenario's clue classes are current, high-water debris and bank stability. These clearly support flood/den reasoning, but no explicit clue/action establishes C's safe low-stage placement. Food visibility is optional despite food access being a base objective.

Define the evidence for every mandatory criterion. It may be visible terrain rather than another collectible clue. A player needs a readable relationship between entrance position and low water, plus a way to compare food access before committing. Essential information must also work without relying solely on color or hover.

The mandatory low-water evaluation need not require a second dramatic weather event: it could be an authored stage test. The design must say whether the player experiences it, previews it, or has it checked at completion.

### A game's victory check cannot inspect understanding

Keep “the player can explain the clue” as a playtest observation. The game can check shelter condition, entrance access and a usable food route. It should not require a quiz, spoken explanation or opening every journal entry.

Separate:
- **Base completion:** explicit world-state predicates at specified stages.
- **Optional mastery:** feasible achievements that do not punish accessibility supports.
- **Research observations:** player reasoning, confidence and voluntary experimentation.

### Repair is different from making a bad site suitable

If A is repaired after the only flood, can the player win because the danger has already passed? If so, repair may satisfy a short scenario while leaving the stated seasonal-safety lesson unresolved. If the flood repeats every Advance, repair might become an unwinnable loop.

Decide what “safe after flood” means: survived the event, currently habitable, or resilient to the defined stage envelope. Damage, habitability, low-stage access and exposure may need separate descriptions; “sound” does not automatically mean well sited.

Work through A → flood damage → new choice → recovery with exact remaining resources and known weather. Restart is useful, but it is not equivalent to recovering within the same run. The documents currently promise both.

**Closure evidence:** explicit victory checklist and one complete recoverable failure path with no permanent resource deficit, repeated-flood trap or post-event safety loophole.

## G08–G10: decide how much the player reasons and constructs

### Site selection versus spatial construction

A 20×15 map does not inherently create spatial gameplay. If only three buttons matter, the map is a visual setting. That can be appropriate for A, but should be intentional.

“Correctly positioned C” needs a placement vocabulary. Can the player move an entrance, select between authored slots, orient the shelter, or build on arbitrary tiles? What feedback helps find a better position without guessing? Do material gathering and routes depend on the map?

Recommend examining authored sublocations for A before arbitrary geometry. This preserves spatial reasoning without making full placement simulation a prerequisite. It remains a proposal.

### Preview accuracy versus deduction

Do not equate determinism with complete player knowledge. Authored weather can produce deterministic outcomes while the player sees qualitative ranges. Conversely, exact current-water previews can coexist with uncertain future stages.

Specify each information type:
- Visible observation.
- Inference available immediately.
- Current-build effect preview.
- Seasonal forecast and its limits.
- Optional hint.
- Outcome explanation.

If every site receives a simple safe/unsafe verdict before choice, the player may only follow the panel. If verdicts hide mandatory evidence, failure may feel unfair. Show reasons and costs so a choice remains after risk is understood.

### Expertise that automates away the interesting reasoning

Maturity currently unlocks investigating banks and comparison support, but novice Riverbank Refuge already expects inspection and comparison. This needs reconciliation beyond “essential clues remain fair.”

Consider holding novice capability fixed during A. Test the observation-and-choice loop before adding character progression. Later maturity could organize observations or compare known facts without withholding baseline controls. Repeat-click inspection should not earn progress, and experienced support should not collapse the game to “choose highest recommendation.”

**Closure evidence:** paper UI examples for the same site as novice and experienced beaver, with the remaining player decision named in each.

## G11–G12: make the experience inviting and recognizably Beaverbrook

The current beats can put several minutes of arrival, survey and comparison before building. Inspection might itself be satisfying; the documents do not describe the immediate response that makes it so.

Storyboard the first minute: what the player sees, touches, changes, and notices. Consider a small harmless preview or shelter-placement adjustment early, followed by contextual clues. This is an alternative to test, not a requirement to abandon observation.

Specify an optional hint ladder: point to an overlooked feature → connect feature to risk → suggest an action. Record whether a player discovered, inferred or followed a full solution. Avoid making broad “no tutorial reading” claims the only usability goal.

The family promise also needs some visible expression without adding family AI. A family resting at the chosen shelter, carrying a branch, reacting to rising water or using a safe route could make decisions feel personal. Decide which short responses serve feedback and which serve delight. They should be skippable/reduced-motion compatible and never hide state.

This is not a request for breeding, personality statistics, individual hunger or pathfinding. It is a gap between the emotional promise and the described player experience.

**Closure evidence:** first-minute paper storyboard and a small action → world response → family response table.

## G13–G15: test reasoning beyond one fixed answer

Replay of the same authored flood may demonstrate memory rather than River Sense. That is acceptable for a tutorial, but transfer needs a new situation.

Create one paper-only contrasting reach using the same rules. A stable sheltered lodge can be preferable while a tempting bank is unsuitable. Change visible evidence with conditions; do not secretly change familiar physics or randomize warning meanings.

A single authored scenario does not need endless replay. Test whether players can use the principle elsewhere before commissioning procedural maps.

Difficulty should change a small number of things: competing uses of work, proximity of the tradeoff, optional goals or number of conditions combined. Keep clue accessibility, undo boundaries and physical rules stable. “More uncertainty” should not mean hiding the information needed to avoid an introductory disaster.

Relocation also needs an actual scope:
- Moving among A/B/C.
- Leaving an unsuitable reach.
- Restarting the scenario.

These are different actions. An unlimited free move after every forecast could remove commitment; a costly move without a destination could trap the player. Define safe destination handling, carried resources and when the old shelter stops counting.

“No dam” can still involve active play: suitable shelter placement, food access and retaining vegetation. Do not require a dam for a reward if restraint is supposed to be valid.

**Closure evidence:** one transfer scenario, a short difficulty table and explicit movement outcomes. No campaign or procedural generator required.

## G16–G17: connect systems only where they create a choice

Ecology currently has plausible directions but few specified causal chains. For integration, write one example:
harvest a useful patch → enough building material now → reduced reachable food later → choose another route or less construction.

Define when the delayed effect occurs and how the player sees it coming. If regrowth happens only after the scenario ends, it is background context rather than an active constraint in that scenario. A habitat indicator with no competing outcome may be a progress display, which is fine if labeled as such.

Do not force ecology into A just to honor the full concept. Keep the integration question explicit.

A can answer “is reading evidence and choosing shelter interesting?” It cannot establish that water engineering is satisfying. B can answer “are water-placement effects understandable and enjoyable?” It cannot establish that River Sense sustains play.

Even if both pass independently, their combination might overload the player or weaken each. Define a later integration hypothesis such as “a shelter constraint gives water manipulation a meaningful purpose while keeping evidence readable.” Test that relationship before adding campaign content.

**Closure evidence:** one integrated causal example, one competing player goal and a clearly stated experiment question for A, B and their potential combination.

## G18: observe whether choices are engaging, not only understood

The existing plan has useful comprehension and fairness questions. Add observations that distinguish game design problems:

| Observation | What it may reveal | Caution |
|---|---|---|
| Did the player consider B and C for different reasons? | Whether the tradeoff exists in practice | Do not insist every tester chooses differently |
| What did a successful player do after building? | Whether adaptation exists without a mistake | Do not force damage to create content |
| Did reading, travel or waiting dominate the session? | Possible pacing/interaction friction | Slow consideration can be enjoyable; ask afterward |
| Did a preview change a plan? | Whether feedback supports decisions | Clicking every option is not automatically engagement |
| Did the player identify the cause before reading the explanation? | Strength of world feedback | Understanding after feedback also has value |
| Did they recover within the same run? | Whether recovery is real | Restart completion is a separate result |
| Did the same inference work on the contrasting reach? | Transfer rather than memorization | A paper facilitator must not supply the answer |
| Did they choose another attempt without prompting? | Voluntary curiosity | One choice does not establish long-term retention |

Use counts and brief observations for small playtest groups; do not turn five testers into precise audience percentages. Separate child/adult reading and interaction observations. Paper tests can assess choice coherence and wording, but cannot establish animation feel, phone interaction quality or actual session pacing.

## G19–G21: leave later content later, but give it a purpose

Campaign: map what the player already knows, what new situation challenges it and what combination is mastered. Naming six river settings does not yet produce a learning or difficulty curve.

Rewards: decide whether the journal celebrates discovery, records useful evidence or unlocks content. Avoid making required journal clicks a completion checklist. Fewer repairs alone can discourage experimentation; optional mastery should not make a curious first attempt feel like a poor result. Do not score hint use unless a later opt-in challenge explicitly asks for it.

Sandbox: eventually choose whether its pleasure is landscape transformation, family continuity, experimentation or a mix. It is currently deferred, so no new sandbox specification is required for A.

These gaps do not justify skill trees, daily goals, crafting tiers, collection grinds or colony systems in the first experiment.

## Recommended order

1. Define A's repeatable decision structure and B/C tradeoff.
2. Define work, time, information and victory together.
3. Write successful B/C runs and a recoverable A run.
4. Storyboard the opening, comparison, feedback and ending.
5. Paper-test choice quality and transfer with a contrasting reach.
6. Revise the recommendation for A versus B using the evidence.
7. Only after separate authorization, consider implementation.

See the [design work plan](gameplay-design-work-plan.md) for concrete document deliverables and paper-review questions.
