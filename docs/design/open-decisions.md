# Open decisions and next design work

> Status audit (2026-11-11): historical proposal/review snapshot. Later implementations supersede its repository-wide “not implemented,” “all open,” or default-scope statements. See the [current discussion register and G01–G21 reconciliation](../IMPLEMENTATION-BACKLOG.md) for resolved, partial and superseded items. Original text below is retained for provenance.

**Status:** unresolved. Completing these documents does not authorize implementation.

## Gameplay review priorities

The [gameplay design review](../reviews/gameplay-design-review.md) adds G01–G21 as stable finding IDs. The [work plan](../reviews/gameplay-design-work-plan.md) is the detailed follow-up; all findings remain open.

Resolve G01–G07 first: successful-path decision sequence, B/C strategy payoff, work and seasonal timing, resource purpose, required goal evidence, observable victory, and a complete recovery path. The existing tables below remain useful rule questions, but answering numerical costs alone will not establish engaging choices.

## Resolution options now available

The [core scenario options](riverbank-refuge-resolution-options.md) and [supporting gameplay options](supporting-gameplay-options.md) cover all G01–G21 findings with alternatives, tradeoffs, recommendations and required evidence. They provide the next decision material; all findings remain open.

Recommended candidate: fixed preparation/event stages, free inspection, authored placement slots, setup-versus-route effort at B/C, minimal resources, checklist victory and an explicit salvage/relocation recovery path. This package is proposed, not selected. A shorter single-decision tutorial is the fallback if extra choices feel forced.

## Concrete candidate now available

The [v0.1 rule sheet](riverbank-refuge-paper-candidate.md) and [walkthroughs](riverbank-refuge-paper-walkthroughs.md) supply a proposed cost/stage/site contract and concrete success/recovery paths. Previously listed questions now have trial answers within this candidate; these are not final decisions.

Next priorities: examine whether nook/reserve outcomes justify the timing tradeoff, storyboard actual choices and feedback, create a contrasting reach, and review novice understanding. Do not close gaps based on arithmetic alone.

## Resolve before a playable experiment

| Question | Current proposal | Needed design output |
|---|---|---|
| Which experiment first? | A: River Sense / Riverbank Refuge | Explicit scope choice; B remains separate |
| What does Advance mean? | Discrete authored stages for A | Ordered normal → flood → recovery/low-water checks; define whether work and stage advancement are separate |
| What makes B and C viable? | B safe bank den; correctly positioned C sheltered lodge | Authored site/placement table with low/normal/high stage, access and exposure thresholds |
| What are build and repair costs? | Branches, mud, food reserve and bounded work | Cost/eligibility/effect/feedback table for each included verb; starting and recovery budgets |
| How does food access work? | Reachable safe route is required | Distinguish travel effort from food reserve; choose rule for blocked routes |
| How does damage resolve? | Unbuilt / sound / damaged / unsafe | State definitions, transition conditions, repair effects and event ordering |
| When can the player undo? | Before advance | Define queued work, committed changes, refunds and saved pending state |
| How are setbacks recoverable? | Repair, relocate or restart | Paper walkthrough proving recovery after A with remaining budget |
| What does maturity change in A? | Novice clues suffice; interpretation can improve | Decide whether progression is even needed within this short experiment |
| How much uncertainty is shown? | Observed / likely / unknown | Separate exact construction effects from uncertain future weather; no false precision |
| How is relocation presented? | Another site is a legitimate option | Define local move versus leaving an unsuitable reach; no hidden softlock |
| How does the player interact? | Family tasks recommended | Paper UI flow for select, inspect, compare, preview, build, advance, repair and reset |

## Resolve before integration

- Choose four-way or another explicit connectivity rule for water and define dam crest, inflow, bypass and stage interactions.
- Specify how preview and committed water outcomes agree under unchanged inputs.
- Decide whether winter stores, vegetation regrowth, habitat indicators or family growth belong in the integrated MVP.
- Choose rendering only after a readable phone/keyboard UI sketch; Canvas/SVG/DOM remain open.
- Define save fields, version migration, interrupted-save behavior and offline update behavior in a later technical design.
- Set measurable playtest gates and a factual review process for optional journal copy.

## Next documentation pass

1. Write a Riverbank Refuge scenario table using clearly fictional game units.
2. Walk through B success, C success, A failure and recovery on paper.
3. Draft River Notes and event-log wording tied to actual clues.
4. Sketch interaction states and keyboard/touch paths.
5. Review the evidence backlog before writing factual educational passages.

Do not turn illustrative costs into final balance values or mark the design implementation-ready until the missing rules and edge cases are resolved.
