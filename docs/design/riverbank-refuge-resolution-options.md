# Riverbank Refuge — options for closing the core gameplay gaps

> Status audit (2026-11-11): historical proposal/review snapshot. Later implementations supersede its repository-wide “not implemented,” “all open,” or default-scope statements. See the [current discussion register and G01–G21 reconciliation](../IMPLEMENTATION-BACKLOG.md) for resolved, partial and superseded items. Original text below is retained for provenance.

**Date:** 2026-11-09. **Status:** options and recommended candidate package, not selected rules or tested balance. Addresses G01–G10 and G15 from the [gameplay review](../reviews/gameplay-design-review.md). All findings remain open until the required artifacts are completed and reviewed.

## What needs to be documented

A coherent paper scenario needs a finite sequence of decisions, two attractive successful strategies, a bounded work/material economy, visible evidence for every required goal, an observable victory check, and a failure path that can recover in the same run.

The recommendation is a **small staged strategy scenario**. The simpler tutorial alternative remains valid if the additional decisions feel contrived. Do not assume more turns are better.

## 1. Shape of the scenario — G01

| Option | Player experience | Benefit | Cost / risk |
|---|---|---|---|
| A. Single settlement lesson | Inspect → choose → build → see consequence | Smallest scope; clear River Sense demonstration | Tests one choice, not the sustained strategy loop; shorten duration accordingly |
| B. Settlement plus preparation and response | Choose home → allocate preparation → event → choose next preparation/recovery | Successful players retain agency; connects initial site to later needs | Requires useful competing actions and explicit time rules |
| C. Open seasonal builder | Repeated gathering, construction and family tasks across days | Stronger ownership and broader simulation | Large economy/content scope; can bury observation under chores |

**Recommend B for the paper candidate.** Use three meaningful commitments: home/location, use of remaining preparation work, and post-flood response to the low-water requirement. A player whose home survived still chooses how to maintain access or prepare the food route. Do not force a needless repair. If those later decisions reduce to obvious mandatory clicks, fall back to A rather than pad the scenario.

**Required artifact:** action sequence for successful B-site and C-site runs, naming what is given up at every commitment.

## 2. Why choose either shelter? — G02

Here B/C mean the existing **sites**, not the scenario options above.

| Option | Bank site B | Side-channel site C | Design consequence |
|---|---|---|---|
| A. Setup versus recurring effort | Lower setup work, longer food route | Higher setup work, shorter food route | Clean time tradeoff; route effort must matter during the scenario |
| B. Materials versus work | Fewer branches, more excavation work | More branches, less excavation work | Two currencies can create distinct plans; starting budget can accidentally force one answer |
| C. Safety versus optional habitat goal | Reliable baseline with modest landscape change | Equally safe when correctly placed, preserves a useful patch | Strong ecology connection; adds an objective and needs real causal rules |

**Recommend testing A first.** B buys early flexibility; C buys later flexibility. This is a proposal for relative costs, not a claim about real shelter construction or a revision to the current map. Existing notes say B has a longer food route but do not establish comparative setup costs.

The comparison must include setup, maintenance, route effort, low/high-stage access and reserve remaining. Neither option should be strictly worse across every goal. The player need not optimize a score: choosing where to retain spare work can be enough if that spare work funds a useful choice.

**Required artifact:** two complete affordable plans and a counterexample showing when each is preferable. If C's advantage occurs after the scenario ends, it cannot justify C within this experiment.

## 3. Work and seasonal time — G03

| Option | Time rule | Benefit | Risk |
|---|---|---|---|
| A. Fixed work per authored stage | Spend work in a preparation window; explicitly advance to next stage | Clear event boundary, no real-time pressure, finite preparation | Must explain unused work, recovery allowance and queued actions |
| B. Work on daily turns | A known number of days before a forecast event | More granular choices | More repetitive turns and scheduling rules |
| C. Continuous time with pause | Work runs while river changes | Lively presentation | Timing and interruptions complicate approachable planning |

**Recommend A:** preparation → flood resolution → recovery/low-water preparation → low-water evaluation → completion. Flood resolution is an event, not another resource-farming window. Inspection and previews are free. A stage does not regenerate unlimited work when the player waits.

Proposed interaction: actions change a reversible plan; confirm/Advance commits the plan and resolves the announced event. Show work/material totals and resulting construction before confirmation. Animation can portray work without making the player wait for a real-time timer.

**Required artifact:** stage table specifying entry state, work budget, permitted actions, event, unused-work handling, undo boundary and exit conditions. Work refresh and recovery aid must be explicit, not facilitator improvisation.

## 4. Resources and food — G04

| Option | Tracked quantities | Benefit | Risk |
|---|---|---|---|
| A. Work + construction supply; food as route condition | Two budgets, accessible food required | Small enough to reason about; clear distinct jobs | Abstracts branches/mud and winter stores |
| B. Work + branches + mud; food route | Preserves more existing resource vocabulary | More construction differentiation | Mud may be a redundant counter |
| C. Work + branches + mud + food reserve | Gathering and consumption compete with building | Supports a later winter game | Requires harvest, consumption, shortage and season rules |

**Recommend A for the first paper candidate**, retaining B as fallback if branch/mud choices create an actual tradeoff. This would narrow A's resources; broader integrated-MVP resources remain separate.

Route effort would consume work once per defined preparation stage, not food and work simultaneously unless justified. Food access is required, but no hunger clock or winter cache is needed in A. Every tracked quantity needs at least two competing uses or a clear limiting purpose.

**Required artifact:** resource sources/sinks, starting amounts, costs, refund/salvage rules and recovery reserve. Values must be fictional game units. None are selected by this options document.

## 5. Essential evidence and forecast support — G05, G09

| Option | Information shown | Benefit | Risk |
|---|---|---|---|
| A. Exact outcome preview for all stages | Explicit safe/unsafe result before commitment | Very forgiving | Can reduce inference to following green labels |
| B. Exact current plan plus explained seasonal bands | Exact costs/placement; visible low/high-stage evidence; qualitative risk | Preserves reasoning while exposing essential evidence | Requires careful consistency between clue and outcome |
| C. Broad uncertain forecasts | Several possible weather conditions | More robust planning | Harder to distinguish a bad decision from bad luck |

**Recommend B with authored events for A.** No essential evidence is withheld. Unknown means “not yet assessed” or a genuinely bounded uncertainty; it must not conceal an untelegraphed tutorial failure. All information needed for required goals is available through free inspection.

| Required criterion | Proposed evidence | Player response | Outcome feedback |
|---|---|---|---|
| Flood resilience | Debris line, current exposure, bank condition | Avoid exposure or choose suitable shelter | Highlight the exposure that caused damage |
| Low-stage entrance access | Visible stage band and selectable entrance/slot | Select deeper eligible placement | Show entrance relative to low-stage band |
| Food route | Visible food patch and authored reachable route | Budget route effort or choose other home | Show route availability and work cost |
| Stable den | Inspectable bank substrate/stability | Use eligible bank or change site | Explain eligibility before spending |

The stage band is a game aid, not a scientific prediction. Low-water and food evidence may be terrain overlays rather than extra collectible clue types.

**Required artifact:** clue/goal map, two River Notes panels, and a rule for what “unknown” permits the player to conclude.

## 6. Completion and rewards — G06

| Option | Victory definition | Benefit | Risk |
|---|---|---|---|
| A. State checklist | Habitable shelter, required stage resilience/access, usable food route | Observable, no quiz, easy to explain | Needs precise temporal conditions |
| B. Weighted score | Safety, ecology, materials and repairs combine | Supports optional optimization | Can hide whether the family actually has a safe home |
| C. Checklist plus optional distinctions | Base completion plus named optional accomplishments | Supports depth without blocking completion | Distinctions may discourage experimentation if framed as grades |

**Recommend A initially; consider C later.** Player understanding is a playtest observation, not a victory predicate. Optional hints and journal use do not invalidate completion.

Separate current condition from resilience: repaired construction at an exposed site cannot pass a resilience requirement solely because the flood already happened. Define exactly which future/ordinary stage envelope is required.

**Required artifact:** boolean success checklist with evaluation stage, plus ending copy. Do not evaluate by family emotion animation, journal clicks or player explanation.

## 7. Damage and recoverable mistakes — G07

| Option | Recovery | Benefit | Risk |
|---|---|---|---|
| A. Repair in place | Restore condition; reinforcement may address exposure | Retains investment | Needs rules distinguishing damage from site suitability |
| B. Salvage and relocate | Recover stated supplies, spend recovery work on viable destination | Reinforces reading the river; avoids inventing immunity upgrades | Must budget for a real in-run recovery |
| C. Restart with retained player knowledge | Free reset of the whole scenario | Smallest recovery specification | Does not fulfill the current promise of recovery within the same run |

**Recommend B as the guaranteed introductory path**, with repair only where condition is the issue. A's exposure remains after ordinary repair. A bounded, clearly labeled recovery allowance can fund the tutorial move if normal salvage alone is insufficient; it should not become unlimited construction currency or secretly reward deliberate failure.

Describe condition and suitability separately. A sound shelter may be unsafe at high stage; a damaged shelter at a suitable site may become safe after repair.

**Required artifact:** A build → flood damage → salvage → relocate → low-water success trace, including every cost. Also test repeated relocation, zero supplies and deliberate damage farming. Keep restart as a separate option.

## 8. Spatial agency and maturity — G08, G10

| Question | Options | Recommended candidate and tradeoff |
|---|---|---|
| Placement | One button per site; authored entrance/shelter slots; arbitrary tiles | Authored slots: meaningful placement at C without general geometry. Show why a slot works; no pixel hunting |
| Novice tools | Gate inspection/comparison; provide all essential tools; auto-solve sites | Provide essential inspection and comparison from arrival; expertise later organizes reasoning |
| Maturity within A | Earn levels in one run; fixed novice; selectable support mode | Fixed novice for A; short scenario tests choice before progression. Optional help is available independently |
| Relocation scope, G15 | Local move; travel to new reach; restart | Local move among viable authored destinations for A. Leaving a reach belongs in a later scenario; never present a nonfunctional exit |

**Required artifact:** site/slot eligibility map, novice capability list and move-cost rules. Proposed fixed novice changes the earlier maturity proposal only if subsequently selected.

## Candidate package and dependencies

The recommendations above form one package: fixed stages, free evidence gathering, authored placement slots, B/C setup-versus-route effort, minimal resources, checklist victory, and a salvage-funded recovery path. Do not mix in daily consumption or continuous time without revisiting the budgets.

Selection order:
1. Choose single lesson versus staged strategy.
2. Choose B/C tradeoff and time model together.
3. Define resources and placement; then assign trial costs.
4. Define success/evidence; then write recovery.
5. Review all paths on paper before claiming any gap closed.

Required follow-up documents: a scenario rule sheet, action/cost table, site/evidence table and four annotated walkthroughs. The [remaining-gap options](supporting-gameplay-options.md) cover onboarding, feedback, transfer, ecology and later modes.

No option has been selected, no numeric balance has been validated, and G01–G21 remain open. An options document is progress toward a decision, not proof that the design works.
