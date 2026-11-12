# Gameplay design work plan

> Status audit (2026-11-11): historical proposal/review snapshot. Later implementations supersede its repository-wide “not implemented,” “all open,” or default-scope statements. See the [current discussion register and G01–G21 reconciliation](../IMPLEMENTATION-BACKLOG.md) for resolved, partial and superseded items. Original text below is retained for provenance.

**Status:** recommended documentation work following the [2026-11-09 review](gameplay-design-review.md). No mechanics below are adopted or tested, and no implementation is authorized.

The review's G01–G21 identifiers are the stable finding references. This plan groups the work into five small design packets. Complete the first three before attempting to run Riverbank Refuge on paper. Later packets refine the experience without expanding the first experiment into a simulator.

## Packet 1 — player decisions and strategy comparison

**Addresses:** G01, G02, G04, G08.

Write a proposed player-experience loop with a successful choice at each meaningful commitment, rather than a list of clicks.

| Moment | Required design answer |
|---|---|
| Arrival | What visible family need makes settling matter? |
| Survey | What observation changes the initial plan? |
| Settlement | Why might a reasonable player choose B? Why C? |
| Preparation | Which two useful actions compete for limited work/materials? |
| Event | What changes and what remains dependable? |
| Adaptation | What choice remains for someone whose first shelter survived? |
| Completion | What confirms success and offers a natural stopping point? |

Do not force all seven moments into separate turns. Inspection may be free and events brief. A single-decision tutorial is also a valid outcome if described honestly; the ongoing loop would then need a separate test.

### Candidate tradeoff to examine

**Illustrative only:** B offers lower initial setup but a more costly food route; C requires greater initial placement work but has a cheaper route after settlement. One early improvement and one later preparation compete for the remaining work.

For this to become a rule, decide:
- Whether travel really consumes work and at what stage.
- What useful early/later tasks exist within the current scope.
- Whether each task affects a goal, resilience or expression.
- Whether both successful paths remain affordable.
- Whether one sequence quietly dominates both goals.

Do not add transport upgrades, family job classes or random hunger to make the comparison work. If the existing scope cannot sustain the tradeoff, simplify the scenario or change the experiment question.

**Deliverable:** one strategy table plus complete B/C action sequences. A statement that C is “another valid location” does not close G02.

## Packet 2 — time, actions and information

**Addresses:** G03, G04, G05, G08, G09, G10.

Define planning, work resolution and stage advancement separately, even if one button eventually invokes more than one.

| Verb | Eligibility | Cost | Immediate or queued? | Time effect | Preview/feedback | Undo boundary |
|---|---|---|---|---|---|---|
| Inspect | To define | Recommended free | To define | To define | Observed clue | To define |
| Build/excavate | To define | To define | To define | To define | Placement and resource effects | To define |
| Gather | Include only if useful in A | To define | To define | To define | Availability and remaining vegetation | To define |
| Repair | To define | To define | To define | To define | Condition versus site exposure | To define |
| Relocate | To define | To define | To define | To define | Destination and carried resources | To define |
| Advance | To define | To define | To define | To define | Announced event and result | To define |

Blank cells are design work, not implied defaults.

For each required goal, attach a visible clue or map feature, available inspection, inference, relevant action and resulting feedback. Include C's low-water access and the food route. Specify which information is exact, inferred or forecast.

Keep novice comparison available if the first scenario requires it. Consider omitting within-scenario maturity gains for A; document this as a proposed simplification before changing the baseline.

**Deliverable:** action table, stage sequence and two example River Notes panels. No rendering or code architecture needed.

## Packet 3 — victory and recovery proof

**Addresses:** G05, G06, G07, G15.

Write the world-state conditions for completion and identify when each is checked. Keep player explanations outside the game's victory logic.

Run four paper traces:
1. B succeeds at each required stage.
2. Correctly positioned C succeeds at each required stage.
3. A is damaged, and the player recovers within the same run.
4. The player tries advancing without a viable home or enough remaining work.

Each trace records observations available, action, resources/work before and after, stage, shelter condition, access, food route and remaining options. If a value is missing, record the trace as blocked. Do not invent rules silently while facilitating it.

Explicitly test:
- Repair at A after the flood: does it fix damage, future exposure or neither?
- Moving B → C and C → B: what persists and what is lost?
- Restart: what resets, and is it being used instead of the promised in-run recovery?
- Waiting: can unlimited preparation remove every constraint?

**Deliverable:** four annotated traces and a victory checklist. These are proposed rule walkthroughs, not evidence of player enjoyment.

## Packet 4 — opening, feedback and transfer

**Addresses:** G09–G15.

Storyboard first contact, first satisfying action, comparison, commitment, seasonal consequence, recovery and ending. Write compact clue, hint and event text before specifying art.

Use a small feedback table:
- Action and visible world change.
- Family response communicating the consequence.
- Plain-language cause.
- Reduced-motion/non-audio alternative.

Write a second paper reach with the same physical rules and a different site-dependent best fit. Explain which inference transfers and which superficial cue could mislead. Do not add another shelter type or new resource just to create variety.

**Deliverable:** paper UI sequence, optional hint ladder and contrasting reach. Evaluate phone readability and actual interaction feel later through an authorized playable experiment.

## Packet 5 — experiment questions and next scope decision

**Addresses:** G16–G21.

Keep the questions separate:
- **A:** do observed clues support interesting shelter and preparation choices?
- **B:** do dam changes produce understandable, satisfying water tradeoffs?
- **Possible integration:** does shelter/food need give water manipulation a useful purpose without burying the core decisions?

For each, write the behavior being observed, the failure interpretation and what would be revised. Preserve the existing playtest questions, then add successful-path decisions, B/C preferences, waiting/reading burden, recovery and transfer.

Family generations, detailed skills, sandbox and a full campaign stay deferred. A failed paper tradeoff calls for revising the decision structure, not automatically enlarging the game.

**Deliverable:** revised experiment/playtest plan and a recommendation for the next design step. Coding requires separate authorization.

## Completion record

For each packet, record proposed choices, rejected alternatives with reasons, remaining assumptions and whether findings are still open. Update the decision register only when a proposal is actually selected. Link the relevant finding IDs rather than copying a second competing gap list.

Current state: **options documented; all five packets still require selected rules/artifacts and all G01–G21 findings remain open.**

See [core options](../design/riverbank-refuge-resolution-options.md) and [supporting options](../design/supporting-gameplay-options.md). These supply alternatives and recommendations for the packets; completed rule sheets and verified walkthroughs are still pending.

## Candidate progress — 2026-11-09

Packets 1–3 now have a concrete proposed [rule sheet](../design/riverbank-refuge-paper-candidate.md) and [worked paths](../design/riverbank-refuge-paper-walkthroughs.md). Their budgets were checked at the desk; this is not independent playtesting or confirmation of fun. Rules remain a candidate, not selected production scope.

The earlier completion record describes the options stage. Current status: candidate artifacts drafted for packets 1–3; review/iteration pending. Packets 4–5 still need a full storyboard, contrasting reach and observation/experiment plan. All G findings remain open.
