# Beaverbrook — MVP boundary, experiments and playtest plan

> Status audit (2026-11-11): historical proposal/review snapshot. Later implementations supersede its repository-wide “not implemented,” “all open,” or default-scope statements. See the [current discussion register and G01–G21 reconciliation](../IMPLEMENTATION-BACKLOG.md) for resolved, partial and superseded items. Original text below is retained for provenance.

> Imported design material from [Ideas-for-projects](https://github.com/jschell/Ideas-for-projects/blob/2fabfceba1feab90f2ee4a60c13680f2125a8f98/animal-browser-games/beaverbrook/mvp-and-playtesting.md) on 2026-11-09. See [source provenance](../sources.md) and the [decision register](../design/decisions.md) for current status and precedence.

**Status:** Proposed decision gates; no implementation authorization implied.

## Two independent experiments before integrated MVP
**Experiment A — River Sense (recommended first):** authored river stage, three sites, three clues, bank den vs freestanding lodge, one flood and recovery. No dynamic dam simulation, wildlife system or family AI. See [first scenario](first-scenario.md).

**Experiment B — Dam/water:** 20×15 terrain, one stream, dam segments, source-connected basin-fill preview, lodge-depth condition and one vegetation tradeoff. See [core mechanics](core-mechanics.md) and [original gameplay spec](../references/beaverbrook-gameplay-spec.md).

**Integration gate:** combine only if A produces interesting decisions and B's water consequences are legible. Do not force both into a first playable.

## MVP proposed after experiments
One or two handcrafted scenarios, one unified inspection/preview UI, two shelter types, basic dam on suitable stream, branches/mud/food, one seasonal event per scenario, basic regrowth/habitat indicator, save/reload, offline PWA, mouse/touch/keyboard. **Defer** bank-lodge third type, procedural terrain, connected river network, complex ecology, generations, autonomous AI, real erosion, advanced weather and online accounts.

## Playtest protocol
Recruit 5–8 first-time players including some in the intended 8–10+ range with appropriate consent. Observe silently for first attempt; ask afterward:
- What were you trying to achieve?
- Which clues mattered and why?
- Why did you choose that shelter?
- What did the flood teach you?
- What would you try differently next time?

Capture task completion, time to first meaningful choice, inspect actions, wrong-site selection, recovery rate, whether clues were understood, touch/keyboard failures, and voluntary replay. Avoid leading questions and quiz-like scoring.

## Decision gates
| Gate | Evidence sought | Response if not met |
|---|---|---|
| Understandable | Most testers explain goal within ~2 minutes | Improve framing and UI |
| Meaningful choice | Testers articulate two options and a tradeoff | Rebalance site costs/risks |
| Fair consequence | Players can connect flood outcome to prior clue | Improve clue visibility/forecast |
| Recoverable | Mistakes can be corrected without dead-end | Add materials, repair or reset |
| Enjoyable | Players want another site/season after first run | Revisit core loop before adding content |
| Accessible | All critical actions via touch and keyboard | Fix interaction before expanding |

Thresholds are provisional; record observations, not just pass/fail.

## Engineering constraints
Vanilla HTML/CSS/JS; small deterministic pure simulation module; authored JSON scenario data; local save with versioned schema; static deployment, offline-first; responsive touch targets and readable text; no external runtime service. Unit-test water connectivity, stage/shelter outcomes, resource invariants, and save round-trips.

## Open issues to resolve before implementation
- Pick A or B as first coded prototype (A recommended because new distinctive hook).
- Confirm work/material costs and stage thresholds in scenario data.
- Choose SVG/Canvas/DOM rendering after simple UI sketch.
- Decide whether player directs individual beaver or issues family tasks (task assignment recommended initially).
- Confirm scope and factual wording of optional science journal.
