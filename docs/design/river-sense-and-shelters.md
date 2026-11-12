# Beaverbrook — River Sense and shelter decisions

> Status audit (2026-11-11): this broader design remains proposed. Some bounded experiments now exist; see the [current discussion register](../IMPLEMENTATION-BACKLOG.md) before treating any part as implemented or scheduling work. Current experiment records govern their own rules.

> Imported design material from [Ideas-for-projects](https://github.com/jschell/Ideas-for-projects/blob/2fabfceba1feab90f2ee4a60c13680f2125a8f98/animal-browser-games/beaverbrook/river-sense-and-shelters.md) on 2026-11-09. See [source provenance](../sources.md) and the [decision register](../design/decisions.md) for current status and precedence.

**Status:** Dedicated design baseline. Detailed earlier exploration: [River Sense notes](../references/beaverbrook-river-sense.md).

## Learning goal
Beavers and players become better at interpreting environmental clues, **not** at discovering magically hidden facts. The river behaves consistently regardless of skill level.

## Observe → infer → compare → test
**Observed** clues include current, water depth, driftwood high on banks, scoured roots, bank material, side channels and food. **Inferences** connect a clue to plausible consequences. **Unknowns** remain visible until further observation or a seasonal event. **Compare** presents shelter-specific risks, materials, access and uncertainty. **Test** happens when the player advances a season and sees the result.

## Maturity stages
| Stage | New player support | Unlock trigger |
|---|---|---|
| Curious kit: notice | Basic depth, current, food indicators | Starting capability |
| Young explorer: investigate | Inspect bank material and high-water evidence | Complete guided site inspection |
| Experienced builder: interpret | Side-by-side shelter comparisons, risk explanation | Make and review two site decisions |
| Seasoned beaver: anticipate | Better low/high-stage forecast and uncertainty notes | Experience a flood and a low-water period |

Do not gate the ability to avoid a dangerous introductory site behind a progression unlock. Experienced skills add **interpretation**, not immunity to floods. Unlocks are illustrative and need playtest tuning.

## Shelter alternatives
- **Freestanding lodge:** suitable calm pond/reach with submerged access; exposed construction can fail in high flow.
- **Bank den:** chamber excavated into suitable bank, entrance submerged at low stage, chamber above normal high stage; vulnerable to erosion or unstable banks.
- **Bank lodge:** bank-integrated shelter with woody structure; defer as distinct build type until mechanics justify it.
- **Dam + pond:** appropriate only where channel and terrain permit; creates water and vegetation tradeoffs.
- **Relocate:** legitimate choice when neither shelter is suitable.

Avoid universal bonuses like “middle = safer” or “bank = weaker.” Instead compare exposure, access, bank conditions and food on a *per-site* basis.

## River Notes UI contract
Every candidate site shows:
1. **What I saw** (clickable, visually grounded clues).
2. **What it suggests** (one-sentence cause-and-effect with confidence).
3. **What I don't know** (low-water or flood uncertainty).
4. **My options** (shelter alternatives, costs and risks).
5. **What happened** (season outcome linked back to evidence).

A young player can read plain language; expert players may expand details. Never require reading a scientific paragraph to act.

## Worked comparison
At a wide river: driftwood high in branches suggests spring flooding; a strong main-channel current makes an exposed lodge risky; a vegetated, excavatable bank suggests a possible den, but low-water entrance depth remains unknown. Investigating the side channel might uncover a third option. At a different stable pond, the freestanding lodge may be the better protected choice. Neither is globally optimal.

## Learning and persistence
Individual beavers earn maturity through observation and consequences. The **player field journal** persists across scenarios and generations; a newly introduced beaver still needs local site observations. Whether descendants gain a small familiarity bonus is a **later-phase question**, not a current requirement.

## Ecological guardrails
Use real beaver behavior as inspiration without suggesting beavers consciously calculate flood probabilities. Healthy undammed rivers are not automatically deficient. Validate habitat and species-specific claims before shipping optional educational text.
