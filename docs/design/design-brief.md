# Beaverbrook — dedicated design brief

> Imported design material from [Ideas-for-projects](https://github.com/jschell/Ideas-for-projects/blob/2fabfceba1feab90f2ee4a60c13680f2125a8f98/animal-browser-games/beaverbrook/design-brief.md) on 2026-11-09. See [source provenance](../sources.md) and the [decision register](../design/decisions.md) for current status and precedence.

**Status:** Proposed baseline, not approved production scope. **Audience:** curious players ~8–10+ and adults. **Platform:** desktop/mobile browser, offline-first.

## Promise
Guide a beaver family to find a safe home by **reading a river, choosing an appropriate shelter, and adapting as seasons change**. Construction transforms the environment, but building a dam is not always the right answer. Success is a safe, provisioned family home, not maximal flooding or a biodiversity score.

## Pillars
1. **Observe before acting:** physical clues make risks discoverable.
2. **Meaningful, reversible tradeoffs:** site, shelter, food, time, water and habitat compete.
3. **Consequences teach:** predict → build → seasonal outcome → adapt; never arbitrary punishment.
4. **Living landscape:** water, plants and habitat visibly respond, with simplified honest ecology.
5. **Approachable strategy:** 5–15-minute scenarios, no precision movement, touch-first controls, optional deeper challenges.

## Core decisions
- Where to settle? Is this reach suitable at all?
- Dam, freestanding lodge, bank den/bank lodge, or relocate?
- How much to harvest versus leave for regrowth?
- What to repair or prepare before the next seasonal event?
- When does a wetland intervention help or harm the existing stream?

## Interaction defaults
2D top-down tile map, select/inspect/preview/confirm, with one **Advance Day/Season** control; animals animate assigned tasks but do not require individual pathfinding. All simulation advances are deterministic. Inspecting and previewing are free; construction and harvesting spend bounded work and materials. Undo before advance, recover after.

## Player experience
A first-time player sees a recognizable river, notices driftwood high on a bank, investigates a candidate shelter, compares a lodge and den, builds, watches a flood, then understands the outcome. No pop quiz or lengthy tutorial. The field journal is optional and separates **In nature** from **In this game**.

## Modes and scope
- **First playable:** one scenario with three shelter sites, two shelter types, three clues and one flood; prove River Sense.
- **Water prototype:** one narrow stream, dam segments and connected basin-fill water preview; prove water legibility.
- **Integrated MVP:** join these only if both slices test well; do not claim all campaign features are MVP.
- **Later:** multiple connected reaches, generations, advanced ecological succession, procedural maps, elaborate family AI, sandbox.

## Success criteria
Player understands objective within 2 minutes; can predict a meaningful consequence; sees two viable strategies; completes/retries within 15 minutes; all interactions work touch/keyboard; no hidden unwinnable state.

## Open decisions
Exact shelter scoring and seasonal thresholds; how much water modeling is necessary for first slice; direct beaver movement versus task-only; whether family growth enters integrated MVP. See [core mechanics](core-mechanics.md), [River Sense](river-sense-and-shelters.md), and [MVP/playtests](mvp-and-playtesting.md).
