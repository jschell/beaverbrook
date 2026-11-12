# Beaverbrook — core mechanics and simulation contract

> Status audit (2026-11-11): historical proposal/review snapshot. Later implementations supersede its repository-wide “not implemented,” “all open,” or default-scope statements. See the [current discussion register and G01–G21 reconciliation](../IMPLEMENTATION-BACKLOG.md) for resolved, partial and superseded items. Original text below is retained for provenance.

> Imported design material from [Ideas-for-projects](https://github.com/jschell/Ideas-for-projects/blob/2fabfceba1feab90f2ee4a60c13680f2125a8f98/animal-browser-games/beaverbrook/core-mechanics.md) on 2026-11-09. See [source provenance](../sources.md) and the [decision register](../design/decisions.md) for current status and precedence.

**Status:** Proposed implementable rules, subject to playtesting. Reference: [original gameplay spec](../references/beaverbrook-gameplay-spec.md).

## State and turn model
A map has fixed tile elevation, stream connectivity, bank suitability, vegetation, and buildable sites. State also includes current/seasonal water level, construction, resources (branches, mud, food), work actions, observations, family shelter, weather seed and journal. Player may inspect/preview without consuming actions. **Advance** resolves work, water, damage, food and ecology in that order; save the resulting state.

### Player verbs
Inspect tile/clue; survey site; select shelter; preview placement; gather wood/food; build or excavate; repair/reinforce; change dam crest; advance; undo uncommitted action; relocate. Every verb must have explicit eligibility, resource cost, effect, and feedback. No precision timing.

## Minimal water rules
1. The map contains permanent source-connected stream cells and fixed elevations.
2. For dam-eligible reaches only, dam crest and inflow produce a bounded upstream surface level. Fill eligible cells below that surface **only when connected to the source** by the defined adjacency rule.
3. Downstream flow is never deleted; show overflow or bypass as a simplified indicator.
4. Seasonal stage offsets apply to river reaches and can temporarily flood cells; these are distinct from permanent pond cells.
5. Recompute from the same immutable terrain + construction + weather inputs. No random outcome without an explicit saved seed.
6. Preview predicted water footprint before committing a dam. For riverbank-den-only first slice, use authored low/normal/flood stage bands instead of simulating a whole river.

**Non-goals:** fluid dynamics, erosion transport, sediment modeling, realistic groundwater and arbitrary branching hydraulics.

## Shelter assessment model
Evaluate each candidate using:
- **Submerged access at ordinary low stage** (required, or explain the deficit).
- **Chamber/lodge flood and current exposure at high stage.**
- **Bank stability and excavatable substrate** for bank dens.
- **Food and safe travel access** within scenario-defined reach.
- **Materials and work cost**; dam maintenance where relevant.

Represent outcomes as named risks (safe / caution / exposed / unknown), not a single opaque score. Define numeric thresholds per authored scenario in data; never claim those numbers represent real hydrology. A lodge is not automatically safer than a den or vice versa. Relocation is valid.

## Resource and ecology rules
- Branches + mud fund construction; food is a separate winter reserve; work actions limit turns.
- Harvesting removes accessible vegetation; regrowth is slow and conditional. Players can recover from overharvest but at a time/resource cost.
- Wetland indicators (e.g. shallow-water plants, amphibian suitability) depend on water depth/duration and vegetation. They are **not** guaranteed animal populations.
- Existing healthy free-flowing habitat can be a valid outcome; avoid universal “more water = better” scoring.

## Worked resolution example (illustrative game units)
At normal stage, site A mid-channel lodge has safe submerged access, but a high-water debris clue marks flood exposure. Site B stable bank den costs 2 work and 2 food-equivalent travel units, has safe entrance at low stage and chamber above forecast flood stage. The player chooses A. On Advance to spring flood, authored high-stage threshold exceeds A's exposure limit: A suffers 1 damage level, its safety objective fails temporarily; B would remain intact. Repair or relocate next turn. The cause appears in an event log linked to the clue. All thresholds are scenario data, not inferred from the art.

## Invariants and tests
- Identical state/seed/action sequence → identical water, damage and resource outcome.
- No pond tile is wet unless source-connected under the chosen adjacency rules.
- Dam preview equals post-build result if weather is unchanged.
- Failed build consumes no resources; undo restores pre-advance state.
- An unsafe site has an inspectable warning before commitment.
- A bank den can be preferable in one reach and inferior in another.
- No negative resources; no unexplained downstream disappearance.
- Save/load preserves stage, construction, clues, work and journal.
