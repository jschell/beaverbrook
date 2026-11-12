# Beaverbrook roadmap

Working roadmap, 2026-11-11 (America/Los_Angeles). Planning order and completion gates, not delivery dates or authorization to implement every later proposal.

Help an established family → found a suitable home → develop connected settlements → replay varied environmental challenges.

## How to use this plan

- This roadmap sets sequence, dependencies and scope. [The discussion register](IMPLEMENTATION-BACKLOG.md) records dispositions; [GitHub issues](https://github.com/jschell/beaverbrook/issues) hold actionable work and closure evidence.
- Each selected slice states its player decision, visible consequence, recovery path and verification before implementation. Update its issue, implementation record and register when behavior changes.
- Passing tests establish behavior. Human observations establish comprehension, pacing and appeal. Device results identify their renderer/hardware. Keep these evidence tracks separate.
- Later stages can receive design/research work early, but their runtime dependencies must exist before implementation claims.
- Historical P1/P2/P3 issue priorities are triage hints. The milestone gates below govern sequencing; no stage requires completing every idea in a broad issue.

## Current baseline

Willow Cove/Creekside is the default direct-control opening: harvesting, local hauling, family supplies, an inherited lodge/dam, two authored channel cuts, one new flexible dam project, repeating normal/dry flow and continued play after one fed low-water night. The adult and kit provide authored feedback, not worker AI.

First Reach separately demonstrates queued work, several built structures, household relocation, alternative settlement strategies and high-water adaptation. Shrub Seasons separately demonstrates richer patch recovery and remembered resources. These do not yet form one unified main game or save.

Recorded baseline: 103 automated tests and compatibility-renderer browser checks. Human enjoyment, age suitability, native WebGL and real-phone results remain unverified.

## Milestone map

| Milestone | Player experience | Status | Gate |
|---|---|---|---|
| M0: Trust the world | Movement, water, home and family communicate consistent state | In progress | Investigate white flash; clarify lodge/entrance and family; verify essential camera/controls on target devices |
| M1: Help the family | Choose how to gather, transport and build through low water | Implemented foundation; depth/validation open | Two meaningful approaches, understandable physical feedback and observed player comprehension/appeal |
| M2: Found a home | Explore, assess and establish another suitable home | Proposed integration | One persistent main-mode founding/recovery path, with viable alternatives and an explicit control model |
| M3: Develop settlements | Link homes, water and supplies at larger scale | Deferred design | Adopt household/control scope; demonstrate useful network choices without overwhelming repetitive labor |
| M4: Varied environmental scenarios | Apply familiar rules in different reaches and conditions | Proposal; research can start now | Supported parameterized content with discoverable clues, legal solution witnesses and recovery |

M2 is the recommended first integrated MVP boundary: helping an inherited household and founding a new home in one coherent game. Colony simulation and procedural generation are expansion gates, not prerequisites for calling that bounded experience complete. This boundary remains subject to user review.

## M0 — stabilize and explain

Work:
- [#1](https://github.com/jschell/beaverbrook/issues/1): reproduce the brief white ground flash; confirm its cause before fixing.
- [#2](https://github.com/jschell/beaverbrook/issues/2): introduce the adult/kit and explain what their behavior does and does not imply.
- Starting-home subtask in [#8](https://github.com/jschell/beaverbrook/issues/8): choose bank den, bank lodge or freestanding lodge representation. Align visible chamber, underwater entrance, delivery position and access probe. Pond-edge integration is a recommendation, not an adopted placement.
- [#15](https://github.com/jschell/beaverbrook/issues/15): camera/transparency, keyboard focus, touch/HUD, reduced motion and non-color cues.

Gate: a player can identify the home and entrance and understand why depth matters; reported rendering faults have a recorded disposition; essential movement/work controls have actual target-device evidence. An unreproduced bug remains open, not silently closed.

## M1 — make gathering and building rewarding

Work:
- [#6](https://github.com/jschell/beaverbrook/issues/6): contrast accessible food with more distant construction stock; compare direct hauling with an optional channel using real route and load costs.
- [#3](https://github.com/jschell/beaverbrook/issues/3): specify construction cost from local bed, span and crest; show work accumulating from foundation upward. Evaluate simple wood/sealing-material roles before adding many inventories.
- [#4](https://github.com/jschell/beaverbrook/issues/4): physical dam collision and readable crossings without trapping the player.
- [#5](https://github.com/jschell/beaverbrook/issues/5): expose low sections, gaps and bank bypasses; decide whether gradual water change is presentation or actual storage simulation.
- [#7](https://github.com/jschell/beaverbrook/issues/7): fresh-player observation of choices, repetition, explanations and recovery.

Gate: at least two legal useful plans have different practical tradeoffs; preview, material accounting and committed outcomes agree; players can explain water/access consequences and choose a next improvement. Do not close the gate on completion rate or developer walkthroughs alone.

Keep stable terrain and little/no erosion. Full fluid dynamics, pressure engineering, catastrophic failure and detailed vegetation are not required here. Strength/maintenance may remain deferred if they add chores rather than decisions.

## M2 — establish a new home

Depends on a readable M0 and a tested M1 loop. [#8](https://github.com/jschell/beaverbrook/issues/8) owns integration and [#13](https://github.com/jschell/beaverbrook/issues/13) owns shelter assessment.

Before building, review a concrete proposal for:
- Direct beaver control, management tasks or a hybrid; what control changes at founding.
- The founding milestone: what makes the shelter occupied, provisioned and viable; how moving and inherited-home ownership work.
- Placement scope for shelters, dams and excavation, including when an undammed deep-water site is valid.
- Shared state/save migration, local deposits, salvage, interruption and recovery.

Select proven First Reach behaviors to port; do not merge engines or saves implicitly. Add local observation and stale information from [#9](https://github.com/jschell/beaverbrook/issues/9) as needed for meaningful exploration.

Gate: help the family, survey an alternative, legally build/occupy a suitable home, sustain its declared conditions, reload and recover from a setback in the same main mode. Several structures for one household must not be described as autonomous colonies.

## M3 — connect settlements

Depends on M2 and an explicit user-reviewed control/household model. Primarily [#8](https://github.com/jschell/beaverbrook/issues/8), with [#9](https://github.com/jschell/beaverbrook/issues/9), [#10](https://github.com/jschell/beaverbrook/issues/10) and [#13](https://github.com/jschell/beaverbrook/issues/13).

Design network purpose before adding more lodges: supply access, connected ponds, specialization, dispersal or another demonstrated benefit. Define population, shared versus local stores, task delegation, travel/observation and maintenance boundaries.

Gate: another settlement offers a meaningful advantage and cost; players can reason about local stocks/access without issuing repetitive individual trips; offscreen outcomes and saves remain consistent. Family AI, generations and campaign rewards need separate adopted scope.

## M4 — vary environments and generate fair challenges

Design can proceed now; generator implementation follows supported rules. [#12](https://github.com/jschell/beaverbrook/issues/12) owns generation, [#10](https://github.com/jschell/beaverbrook/issues/10) vegetation, and [#11](https://github.com/jschell/beaverbrook/issues/11) consumers.

Start with parameterized authored reaches, then combine patterns, then consider procedural terrain. [Environment and resource parameters](design/environment-and-resource-parameters.md) defines candidate variation and material roles. The [scenario contract](design/scenario-patterns-and-outcomes.md) defines evaluation and validation.

Gate: each accepted instance has visible evidence, explicit outcome criteria, at least two strategically distinct legal witnesses and a recovery route within its budgets. Variation must not require unsupported actions, impossible plant maturation or hidden indispensable resources. Seeds retain generator/content/rules versions and instantiated state.

## Parallel work and decisions

| Work | Can proceed independently | User review before commitment |
|---|---|---|
| Bugs and verification, #1/#15 | Reproduce, review, fix within authorized scope; record device limits | Missing reproduction detail only when necessary |
| Player research, #7 | Prepare protocol and record real observations | Player participation; preferred experience if evidence reveals a conflict |
| Reference/evidence review, #16 | Compare primary game material and regional wildlife sources | Which substantial mechanic to adopt |
| Construction/water, #3–5 | Produce bounded alternatives with costs and examples | New maintenance/failure pressure or materially changed scope |
| Progression, #8/#13 | Compare concrete control, founding and persistence proposals | Control scaling, founding boundary and colony scope |
| Ecology/generation, #9–12 | Parameter schemas, evidence, witnesses and experiments | Selected ecology depth, wildlife pressure and scenario scope |
| Visual detail, #14 | Evaluate silhouettes, rigs, materials, budgets and licensing | Art direction before substantial asset production; implementation remains deferred |

## Next selected planning slice

1. Stabilization: reproduce #1, clarify family roles and the starting shelter.
2. Construction proposal: two contrasting supply locations, one optional channel, depth-aware dam construction, collision and readable outlets.
3. Validate the bounded loop with fresh players and target devices.
4. Present the M2 control/founding proposal while M1 testing proceeds.
5. Prototype scenario variation only from capabilities already proven in the chosen main mode.

No new gameplay behavior is introduced by this roadmap.
