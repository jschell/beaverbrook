# Riverbank Refuge — paper candidate v0.1

> Status audit (2026-11-11): historical proposal/review snapshot. Later implementations supersede its repository-wide “not implemented,” “all open,” or default-scope statements. See the [current discussion register and G01–G21 reconciliation](../IMPLEMENTATION-BACKLOG.md) for resolved, partial and superseded items. Original text below is retained for provenance.

**Date:** 2026-11-09. **Status:** concrete proposal for desk review, not approved game rules, implementation scope or validated balance. This document instantiates the [core options](riverbank-refuge-resolution-options.md). Its numbers are fictional game units. The older first-scenario document remains historical baseline; use this rule sheet only when evaluating candidate v0.1.

## Experience and scope

Find a home suitable for high and low water, then provide a usable food route. B offers cheaper settlement with longer later travel; C costs more setup but has a shorter food route. A is an inspectably exposed teaching hazard.

Two optional projects make the timing difference tangible: an early dry resting nook and a later small food reserve. These are **new, explicitly proposed additions** to test the setup-versus-later-work tradeoff, not inherited requirements. The reserve is an acknowledgement of preparation, not a hunger/consumption system. If optional projects feel like arbitrary badges, remove them and reconsider the scenario as a shorter lesson.

No dam, dynamic water, gathering loop, XP, family AI, winter consumption or procedural map. Fixed novice inspection/comparison available immediately. Family scenes provide feedback without scheduling individual animals.

## State and units

Track stage; work W; construction supplies S; active home/slot and condition; optional nook; shortcut; food-route provision; optional reserve; relocation credit; journal observations.

One active home maximum. Every built home is either sound or damaged. Exposure and entrance depth are independent suitability properties. There is no combined “unsafe” condition: the checklist explains the failing property.

Start: preparation, W6, S6, no home, no projects, credit unused. W does not carry between stages; S does. No action generates ordinary W or S except the explicitly bounded salvage refund. No harvesting in this candidate.

## Stage sequence

| Stage | Budget and actions | Advance effect |
|---|---|---|
| Preparation | W6, S6; build, plan optional nook or B shortcut, inspect and compare | Commit ordered plan; one flood occurs; A becomes damaged, B/C remain sound |
| Recovery / low-water preparation | W resets to 3 once; carry remaining S; inspect, provision food route, build reserve, salvage/relocate, repair, adjust entrance, or build B shortcut | Commit plan; set low water and evaluate completion |
| Completion | No more ordinary work or weather events | End if checklist passes; otherwise explain failures and offer revision or restart |

At either planning stage the player edits an ordered draft, starting from the stage-entry snapshot. Each proposed action shows resulting W/S and state. Reject ineligible/unaffordable actions without cost. Removing an earlier action revalidates dependent later actions; an invalid plan cannot commit.

Inspect/compare/preview/hints cost nothing and move no time. Advance costs no W/S itself. Unused W expires only on commitment. No wait or repeat-Advance farming. “Undo” edits the current uncommitted plan; it never silently rewinds the flood.

Require an active home before advancing preparation. Allow A with an explained warning and explicit continue action. No spending for inspection is mandatory.

Final evaluation occurs on a reversible draft of the recovery plan **before commitment**. If it would fail, show the exact failing predicates and keep the player in recovery with their stage-entry budget and draft editable. No additional W is awarded. The flood is not replayed. A stranded player can discard the recovery draft or restart the whole scenario; arbitrary repeated post-flood relocations are not guaranteed recoverable.

## Sites, slots and readable evidence

Stage elevations and entrance thresholds below are authored teaching aids, not measured hydrology. Normal surface 3, flood 5, low surface 2. A submerged entrance passes when surface minus entrance elevation is at least 1.

| Slot | Home | Build W/S | Entrance elevation | Flood suitability | Food provision W/S | Evidence and inference |
|---|---|---|---|---|---|---|
| A | Exposed lodge | 2/2 | 1 | Fails: exposed current | 1/0 | Strong current and debris across footprint warn of flood damage |
| B | Bank den | 2/2 | 1 | Pass: stable bank, chamber elevation 6 | 2/0 | Excavatable firm bank, chamber above debris line; long food route |
| C-deep | Sheltered lodge | 4/3 | 1 | Pass: sheltered | 1/0 | Quiet deep pocket connected at low stage; nearby food |
| C-shallow | Sheltered lodge | 3/3 | 2 | Pass: sheltered | 1/0 | Low-stage band exposes entrance margin; needs adjustment |

Only these authored shelter/entrance slots are buildable. No hidden alternative coordinates, arbitrary rotation or precise dragging. Other inspected tiles explain their ineligibility without cost. Bank den at A/C or lodge at B is unavailable in this authored experiment, not globally impossible in nature.

At low water B/C-deep depth is 1 and passes; C-shallow depth is 0 and fails. Moving the C entrance to the deep slot costs W1/S0 and makes it C-deep. It is allowed in either stage, once per shallow build; no downgrade/refund. It gives the same final cost as choosing deep initially. This is a recoverable placement correction, not a cheaper exploit.

All site facts, stage bands and costs are available through free inspection from arrival. Show physical evidence and named consequences rather than one recommendation score. Exact placement/cost effects are previewable. The flood sequence is authored and announced; this candidate has no random or probability-based forecast.

## Action and cost contract

Costs are W/S. All changes below occur in draft order, then commit on Advance.

| Action | Eligibility | Cost | Effect and limits |
|---|---|---|---|
| Build | Vacant active-home state; valid site/slot | Site table | Creates sound home; unavailable if another home exists |
| Adjust C entrance | C-shallow active | 1/0 | Changes entrance to C-deep; optional nook moves with it |
| Dry resting nook | Preparation only; sound B/C home already passing low-stage entrance depth | 3/2 | Visible optional dry resting place; no safety or work bonus; one per home |
| B shortcut | Active B; no shortcut | 2/1 | Cuts B food provision from W2 to W1; visibly disturbs one reed strip; one per run |
| Provision food route | Recovery only; active sound home; route not provisioned | Site table, B shortcut adjustment | One authored trip establishes scenario food access; no food counter/consumption |
| Small food reserve | Recovery only; route provisioned | 2/1 | Optional visible preparedness outcome, no victory or survival bonus |
| Ordinary repair | Damaged active home | 1/1 | Restores condition only; A still fails flood suitability |
| Salvage | Active home, at most once per run, before route provision | 1/0 | Removes home and nook; returns S1 regardless of home cost/condition; clears entrance state |
| Local relocation | After salvage | Destination build cost | Same as Build at B/C; no separate move fee; only local authored destinations |
| Restart | Any stage | Free | Resets all world state, W/S and credit; player learning is naturally retained |
| Inspect / compare / hints | Any planning stage | Free | Adds notes/support; cannot grant W/S or complete goals |

After salvage, shortcut/world reed disturbance persists but is usable only from B; it cannot be salvaged. Food provision and reserve must not precede salvage. A player wishing to move after those actions must remove those actions from the draft first. No second committed relocation or supplies refund.

### Bounded recovery credit

At recovery entry, if the committed preparation home was A and flood damage occurred, offer a single **relocation-only W2 credit**. It is not general W and is offered whether or not the player accepts it. It cannot fund repair, food provision, optional projects, shortcuts or ordinary preparation.

When enabled, it pays first for salvage W1 and then W1 of the replacement build at B/C. General W pays the rest. Both salvage and a B/C replacement must appear in the same draft; otherwise credit spending is invalid. Credit is consumed only on commitment. Undo cannot duplicate it. Restart resets the entire run, including all costs.

This is explicit tutorial assistance. It guarantees recovery from the ordinary A build, not every arbitrary sequence of wasteful moves. It carries no bonus supplies and cannot help earn the preparation-only nook after the flood. Explain the offer rather than presenting it as a natural beaver capability.

## Goals and optional outcomes

Base completion requires all of the following at final evaluation:
1. Active home exists and is sound.
2. Active site passes the authored flood-suitability check, even if the flood already occurred.
3. Low-stage entrance depth is at least 1.
4. Its authored food route is provisioned.
5. All costs and action conditions are valid.

A cannot pass by repairing after the only flood. B/C homes rebuilt during recovery need not physically experience another flood; their eligibility is checked against the same disclosed flood envelope. Do not imply the newly built home already survived an observed second event.

Optional outcome descriptions: resting nook present; reserve present; reed strip undisturbed. No aggregate score, stars or hint penalties. None is required for base completion. A route is “provisioned” after one abstracted trip only for this scenario; it is not a claim that a family is permanently fed.

## Why B and C might appeal

| Successful approach | Preparation | Recovery | Result |
|---|---|---|---|
| B with nook | Build 2W/2S + nook 3W/2S | Food 2W | Early comfort, undisturbed reeds; no remaining W for reserve |
| B with shortcut | Build 2W/2S + shortcut 2W/1S | Food 1W + reserve 2W/1S | Reserve, disturbed reed strip; no nook |
| C-deep | Build 4W/3S | Food 1W + reserve 2W/1S | Reserve and undisturbed reeds; nook unaffordable before flood |

B can achieve an optional preparation outcome C cannot; C can combine reserve and undisturbed reeds, which B cannot within recovery W3. B shortcut is an alternative if the player values reserve more than retaining reeds. These are distinct observable outcomes, not proof that children find them equally attractive.

Unused work by itself is not a reward. The shortcut's reed disturbance is a small optional landscape tradeoff, an explicit addition to this candidate rather than a full wildlife model. Do not describe it as verified habitat damage without later ecological review.

## Sample River Notes and feedback

**B observed:** “The bank is firm, and this chamber is above the old flood line.”  
**B suggests:** “A den fits here. The food route is longer: plan for 2 work after the flood.”  
**C observed:** “This pocket stays connected at the marked low-water level.”  
**C comparison:** “Deep entrance: 4 work to build, 1 work for the later food trip. The shallow slot takes less work now but needs its entrance adjusted.”

Hints for C: highlight low-stage band → explain entrance must remain below that band → suggest C-deep/entrance adjustment. No hidden safety fact requires an unlock.

Flood at A: “The current damaged this exposed lodge. Repairing the sticks would not change the current. You can salvage supplies and move.” Show damage and source evidence.

Opening: family waits at temporary shore staging area; selecting C-shallow previews the entrance and low-stage band without spending. Temporary staging is narrative shelter during this short tutorial, not a buildable safe-home loophole.

Ending: show checklist and optional outcomes in plain language. Family uses the successful home/route; provide static/non-audio equivalents. Player explanation is collected only by a later tester.

## Limits and remaining questions

This candidate supplies the missing rule and budget artifacts but does not validate pleasure, educational accuracy, mobile layout or 10–15-minute pacing. Optional nook/reserve goals might feel artificial. B's habitat tradeoff might be too obvious. Relocation aid might reward deliberate failure psychologically despite no resource advantage. Test those questions before adopting the package.

See [walkthroughs and desk checks](riverbank-refuge-paper-walkthroughs.md). All G findings remain open for review; some now have concrete candidate specifications.
