# Beaverbrook — first playable scenario: Riverbank Refuge

> Imported design material from [Ideas-for-projects](https://github.com/jschell/Ideas-for-projects/blob/2fabfceba1feab90f2ee4a60c13680f2125a8f98/animal-browser-games/beaverbrook/first-scenario.md) on 2026-11-09. See [source provenance](../sources.md) and the [decision register](../design/decisions.md) for current status and precedence.

**Status:** Proposed **River Sense vertical slice**, deliberately independent of full dam hydrology. A separate [First Creek](../references/beaverbrook-gameplay-spec.md) dam/water slice remains useful.

## Goal and time
In 10–15 minutes, establish a shelter with submerged low-water access that survives a spring flood, while retaining enough nearby food. The player should learn that **site suitability beats building the biggest structure**.

## Map and authored conditions
Small ~20×15 tile river reach; no procedural generation. Three clearly visible candidate sites:
- **A: Exposed main-channel lodge:** easy access, moderate cost, adequate normal water depth, but current and high-water debris warn of flood damage.
- **B: Vegetated stable bank:** excavatable den, submerged low-stage entrance, chamber above forecast flood, slightly longer food route.
- **C: Sheltered side channel:** freestanding lodge may be viable, but shallow low-water stage makes entrance reliability a tradeoff; can improve by repositioning or choose B.

At least **two viable strategies**: B safe bank den, or a correctly positioned sheltered lodge at C with a food/time tradeoff. A is a tempting but diagnosably risky choice.

## Starting state
One family, fixed material/work budget sufficient to complete B or C, no previous observations recorded. Three inspectable clue classes: **current**, **high-water debris**, **bank stability**. Optional visible food indicator. River Sense at novice level with readable observation text. Weather sequence is authored: normal stage → spring flood → recovery; optional low-water check for C.

## Play beats
1. **Arrival (1–2 min):** player sees objective and three sites; simple pointer invites inspection.
2. **Survey (2–3 min):** inspect current, driftwood and banks. River Notes distinguish observations, inferences and unknowns.
3. **Compare (2 min):** preview lodge/den at sites, see material cost and named risks; relocation to another site is available.
4. **Commit (1–2 min):** select and build; uncommitted placement can be undone.
5. **Season event (1 min):** advance to spring flood; A takes damage, B remains safe, properly positioned C survives but may face later low water.
6. **Adapt (2–4 min):** repair, relocate or revise. Explain cause by pointing to a prior clue. End with successful shelter and a short journal entry.

## Explicit game rules for prototype
- Each site has authored low/normal/high stage and exposure thresholds; no full fluid simulation.
- A's flood threshold is exceeded in spring. B's bank stability and chamber elevation pass. C's outcome depends on chosen placement, not random luck.
- Shelter has states **unbuilt / sound / damaged / unsafe**; damaged structures can be repaired or replaced.
- Resources are sufficient for a recovery path after an initial bad choice; otherwise allow free scenario restart.
- Inspection and preview cost zero; building spends work/materials; advancing triggers deterministic weather.
- Score is **home safe + food access + player understanding**; optional mastery: fewer repairs, lower resource cost.

## Success and failure
Base success: shelter safe after spring flood, entrance accessible at defined low stage, food route available. Soft failure: damaged/unsafe home with clear repair/relocate options. No kit death or surprise game-over in tutorial.

## UI requirements
Large site selection targets, inspectable clues, comparison panel, stage preview, clear Advance control, event log, accessible labels. No hover-only information, drag-only placement or timed reflex action. Keyboard path and touch-only completion required.

## Acceptance tests
- A first-time player can inspect all three risk indicators before building.
- A is damaged in flood; B survives; a properly positioned C provides a second successful solution.
- Same decisions/weather yield identical outcomes.
- A damaged run can recover without an unwinnable resource deficit.
- Player can explain why A failed and B or C succeeded.
- Scenario completes within 15 minutes for most first-time test players, with no mandatory tutorial reading.

## Open test questions
Do players enjoy inspection more than trial-and-error? Is the correct shelter choice too obvious? Does C provide a meaningful alternative? Is the authored stage model convincing enough without hydrology?
