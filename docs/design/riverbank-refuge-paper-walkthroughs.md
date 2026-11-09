# Riverbank Refuge v0.1 — walkthroughs and desk checks

**Status:** authored walkthroughs of the [candidate rules](riverbank-refuge-paper-candidate.md), 2026-11-09. Arithmetic and stated eligibility reviewed at the desk; no human playtesting, prototype or simulation implementation. Numbers and rules remain proposals.

W = ordinary work, S = construction supply, R = relocation-only work credit. The preparation W remainder expires; recovery starts at W3 once.

## 1. B succeeds with early comfort

Inspect bank stability, flood line, entrance band and long food route. The player prefers an early resting nook and undisturbed reeds to a reserve.

| Step | W after | S after | State / consequence |
|---|---|---|---|
| Start | 6 | 6 | No home |
| Build B, cost 2/2 | 4 | 4 | Sound, flood-suitable, low-stage depth 1 |
| Nook, cost 3/2 | 1 | 2 | Optional nook; cannot also afford shortcut W2 |
| Commit preparation / flood | 3 | 2 | B survives; recovery W replaces remainder |
| Provision long route, cost 2/0 | 1 | 2 | Food condition passes |
| Evaluate and commit | 1 | 2 | Base success, nook, undisturbed reeds |

Reserve requires W2, so it cannot be added after the food trip. Alternative: skip nook and build shortcut during preparation; then food W1 + reserve W2 fits recovery, but reeds are disturbed. This is a choice between outcomes, not a requirement to buy both.

## 2. C-deep succeeds with later preparation

Inspect the quiet pocket, low-stage band and nearby food. The player prefers a reserve while retaining reeds.

| Step | W after | S after | State / consequence |
|---|---|---|---|
| Start | 6 | 6 | No home |
| Build C-deep, cost 4/3 | 2 | 3 | Sound; flood-suitable; low depth 1 |
| Preview nook W3 | 2 | 3 | Unaffordable; no cost |
| Commit preparation / flood | 3 | 3 | C survives; no assistance |
| Provision short route, cost 1/0 | 2 | 3 | Food condition passes |
| Reserve, cost 2/1 | 0 | 2 | Optional reserve present |
| Evaluate and commit | 0 | 2 | Base success, reserve, undisturbed reeds |

C cannot achieve the preparation-only nook. B cannot obtain both reserve and undisturbed reeds: ordinary B food W2 + reserve W2 exceeds recovery W3; shortcut reduces food work but disturbs reeds. This establishes different feasible optional outcomes, not equal player preference.

## 3. A fails and recovers in the same run

The player inspected current/debris but took the tempting easy site. No optional preparation projects are eligible at A.

| Step | W after | S after | R after | State / consequence |
|---|---|---|---|---|
| Start | 6 | 6 | 0 | No home |
| Build A, cost 2/2 | 4 | 4 | Sound initially, exposed |
| Commit / flood | 3 | 4 | 2 offered | A damaged; relocation assistance explained |
| Enable credit and salvage | 3 | 5 | 1 | Spend R1; remove A, recover S1 |
| Build B | 2 | 3 | 0 | Cost W2 paid R1 + ordinary W1; S2 |
| Provision route | 0 | 3 | 0 | Cost ordinary W2 |
| Evaluate and commit | 0 | 3 | 0 | Sound B, flood-suitable, low depth 1, food provided |

No new flood is simulated. B passes the same disclosed flood-envelope suitability check. The original A failure remains in the journal; it does not prevent completion.

Credit cannot fund reserve/nook or generate supplies. In this path the player ends with S3, versus a direct B run without optional projects ending S4. Recovery is possible but offers no supply profit. Extra unused assistance cannot be converted into ordinary work.

Alternative from A to C-deep is not affordable: after salvage R1 remains, C needs ordinary W3, leaving W0 for food W1. Offer B as the guaranteed affordable destination; do not imply every move is funded.

## 4. Invalid advance and correction

| Attempt | Preview/feedback | Result |
|---|---|---|
| Advance preparation without a home | “Choose a home before the flood.” | No stage/budget change |
| Queue build exceeding available W/S | Name missing budget | Action rejected; no cost |
| Finish with C-shallow, food provided | Depth 0 at low stage, required depth 1 | Final commit blocked; recovery draft remains editable |
| Adjust C-shallow then provide food | Adjustment W1 + food W1 fits W3 | Success; no reserve because only W1 remains |
| Repair A then finish | Sound but still exposed | Final commit blocked; explain site risk |
| Wait repeatedly | No wait income or extra stages | No new W/S |
| Relocate from a safe B to another home without enough work for food | Draft final check shows missing food/required work | Undo draft or keep original B; no hidden commitment trap |

### C-shallow correction ledger

Preparation build W3/S3 leaves W3/S3. Flood resets ordinary W to 3. Adjust entrance W1 leaves W2/S3; provision route W1 leaves W1/S3. Completion passes. If the player provisioned before adjusting, the same sum applies. The cost equals direct deep construction plus food overall, but one work unit is shifted into the scarce recovery window.

### Repair-A dead end is reversible

At recovery entry W3/S4, drafting repair W1/S1 leaves W2/S3, but A still fails exposure. Remove repair: W3/S4 and damaged A restored in the draft. Then use the documented salvage/credit/B route. Do not charge for a failed preview or force a restart because the player inspected a bad repair plan.

## Boundary checks and limits

| Check | Desk conclusion |
|---|---|
| Stage reset exploited as income | Impossible under finite forward-only stages; final failure does not reset budget |
| Salvage farming | One refund S1, one salvage per run; each home cost at least S2 |
| Credit farming | One A flood; restricted R2 pays only salvage and viable replacement; no general conversion |
| Two active homes | Build requires vacant home state |
| Undo duplicates assistance | Draft rebuilds from stage entry; credit consumed on commitment only |
| Optional project is required | No; base success checks home/suitability/access/food only |
| C-shallow is cheaper overall | No; adjustment makes home total W4/S3, same as deep |
| Early nook follows relocation for free | No; salvage destroys it; nook is preparation-only |
| Shortcut salvage refund | None; reed disturbance and shortcut state persist |
| Knowledge changes physics | No; fixed novice can inspect every required fact |
| Zero supplies in an arbitrary draft | Invalid costs rejected; remove draft actions or restart; no universal replenishment promised |
| Any sequence can recover | Not promised. Introductory A failure has a guaranteed path; arbitrary detours may require undo/restart |

## What this establishes and what it does not

The written ledgers exhibit two affordable successful strategies, one additional B alternative, C placement recovery, and an affordable A-to-B recovery. The work timing produces different optional outcomes. This is sufficient to discuss a concrete candidate; it does not establish enjoyable choices, equal attractiveness, reliable learning or production readiness.

### Remaining design risks to investigate

- **Optional goals:** nook/reserve could feel bolted on to justify work timing. Ask what the player actually values.
- **One-way timing:** preparation-only nook may feel arbitrary. Explain as a dry-weather task, but do not claim biological necessity.
- **Route abstraction:** a single work payment must read as a short scenario abstraction, not eternal food access.
- **Credit incentive:** assistance may feel like a reward for choosing A despite lower final supplies. Compare player reactions, not only accounting.
- **No in-run ecology model:** retaining reeds is an optional landscape preference; don't present unverified biodiversity results.
- **Successful-path depth:** later route/reserve choices may still be obvious; shorten the scenario if they are chores.
- **Transfer:** a contrasting river is still needed to establish more than memorization.
- **Feel and duration:** paper ledgers cannot validate touch interactions, animation or actual session length.

## Finding progress

| Findings | New evidence | Status |
|---|---|---|
| G01–G04 | Explicit stages, action costs, strategies and resource uses | Candidate specified; decision quality untested |
| G05–G07 | Evidence table, state checklist, stage checks and recovery ledger | Candidate specified; independent review/testing pending |
| G08–G10, G15 | Authored slots, information rules, fixed novice and bounded local move | Candidate specified; UI/transfer unresolved |
| G11–G14 | Sample feedback and ending only | Partial; storyboard, contrasting reach and observations still needed |
| G16–G21 | Scope limits and optional landscape consequence | Still open; later integration/progression work |

No finding is marked fully resolved. Next documentation work should storyboard the player experience and create a contrasting paper reach, while retaining this version as a named candidate.
