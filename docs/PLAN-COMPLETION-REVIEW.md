# Two-day request coverage and plan completion review

Reviewed 2026-11-11 (Pacific), against repository head 524dab0 and the visible Beaverbrook thread through the request to complete all three plans. This report records planning coverage, not new gameplay implementation.

## Result

| Deliverable | Before this review | After this review |
|---|---|---|
| Overall roadmap | Dedicated staged roadmap existed | Complete planning baseline: M0–M4, dependencies, issue mapping, MVP boundary, completion gates and decision register |
| Procedural-generation plan | Scenario contract and broad parameter catalog existed | Dedicated implementation plan: packages, capability adapter, initial reaches, data contracts, generation/rejection, witnesses, persistence and acceptance |
| Building-material realism plan | Sourced material roles existed inside the environment catalog | Dedicated implementation plan: resources, component accounting, stages, depth-aware candidate costs, shelter distinctions, hydraulics/collision, migration and acceptance |

All three plans are complete **as reviewable planning deliverables**. They do not imply that the generator, new recipes, new shelters or physical improvements are implemented. Trial coefficients and later control/pressure choices remain explicitly revisable. No open runtime issue is closed merely because its plan is written.

## Review method and limits

Compared the current roadmap, parameter catalog, scenario contract, discussion backlog and all 16 issue bodies with the visible thread and retrieved prior-discussion summaries for the last two days. The thread's older prompts were also checked for carried-forward requirements. Repeated “continue/build next slice” prompts are grouped under their actual feature. Full transcripts not returned by retrieval cannot be exhaustively certified, and visible messages do not all carry individual timestamps.

The earlier [39-document / 11-upstream audit](IMPLEMENTATION-BACKLOG.md) remains the broader inventory snapshot. This follow-up adds explicit implementation planning and traceability for later discussion, rather than claiming to repeat human playtesting or a fresh ecological literature review.

## Request-by-request coverage

Status here describes implementation separately from capture. Every row is captured; proposed/deferred/open rows remain work.

| Thread request or correction | Implementation disposition | Planning location / issue |
|---|---|---|
| Import ideas; dedicated design choices/supporting docs | Implemented documentation | Backlog/source provenance; roadmap baseline |
| Initial documentation only, later explicit build requests | Earlier restriction superseded for authorized demos | Backlog supersessions; AGENTS |
| Gameplay gaps/options and assessment against updated goals | Partial, human validation open | Roadmap M1; #7; original G01–G21 crosswalk |
| Three.js / vanilla JS basic test and test area | Implemented authored experiments | Roadmap baseline; no framework switch required |
| Materials collection and dam/lodge/supporting work | Partial across separate modes | Building plan BR0–BR3; roadmap M1–M2; #3/#6/#8 |
| Automatic Pages / Actions deployment | Implemented | Backlog; existing workflow |
| Water marks/readability; low/normal/high actually change water; creek not entirely gone | Earlier corrections implemented; current feedback partial | Building plan water/feedback; #5/#15; normal/dry main-mode distinction retained |
| Different trees/materials/distances affect construction | Partial | Building plan resources/transport; #6 |
| Game should be compelling, not a checklist | Open human evidence; improved opening exists | Outcome-based generation, roadmap M1 and #7 |
| More open harvesting and multiple paths | Basic verbs implemented, depth partial | Building plan harvest/accounting; generator witnesses; #6/#12 |
| Established family tutorial | Bounded opening implemented | Roadmap M1; Willow Cove record |
| Established lodge → new home → colony | Main-mode integration open | Roadmap M2–M3; #8 |
| Tutorial should lead into founding | Handoff open | Roadmap M2 gate; #8 |
| Static selection is acceptable for iterations, less immersive long-term | Direct control implemented; explicit buttons remain | Roadmap M1/M2; #2/#6/#7 |
| Similar animal/beaver games, interactions and skill trees | Source-backed comparative work still open | #16; roadmap parallel research |
| Broader computer/board-game perspectives, avoid overfitting | Captured, research open | #16 acceptance; no claim the review is completed |
| Camera perspective choices and management-simulation tradeoffs | Third-person POC selected; scale decision open | Roadmap decision D1; #8/#13 |
| Third-person beaver movement and local discovery POC | Implemented | Roadmap baseline; #9 for fuller information |
| Fixed-height camera, fade obstacles instead of clipping/zoom changes | Implemented foundation; device checks open | Building plan feedback; #1/#15 |
| Brief white ground flash, not ordinary soil color change | Open reported bug, cause unconfirmed | #1; roadmap M0; not treated as construction feedback |
| Two extra beavers: purpose and role | Authored feedback implemented, explanation open | #2; roadmap M0; no worker-AI claim |
| Finer geometry/detail evaluated, not immediate implementation | Deferred evaluation | #14; roadmap parallel work; no new art production |
| Trees supply food and structural materials | Basic mixed components implemented; realism partial | Building plan component accounting; #3/#6 |
| Dig channels after retaining water | Two authored cuts implemented; freeform/network scope open | Roadmap M1/M3; #6/#8 |
| Dam variable heights/lengths and terrain response | Bounded flexible placement implemented | Building plan cost/stages; #3/#5 |
| Flexible dam placement | Implemented one new span plus inherited dam | Roadmap baseline; existing limits retained |
| Presume little/no erosion | Adopted constraint | Both dedicated plans; terrain changes only by supported excavation |
| Commence existing/new dam work clearly | Markers/staking handoff implemented; player clarity still testable | Backlog; #7; building stages preserve local work |
| Initial POC versus MVP rating | POC exists; MVP gates not passed | Roadmap M0–M2; behavior/human/device gates separate |
| Realistic-enough dam physics without perfect tuning | Partial barrier model; structural/filling additions open | Building plan BR0–BR4; #3/#4/#5 |
| Foundation depth, width, height and construction costs | New plan complete; runtime absent | Building plan formulas/worked examples/incremental accounting |
| Gradual filling, leakage, overflow and downstream water | Plan complete; runtime partial | Building plan discrete packed crest then separate storage decision; #5 |
| Physical dam contact/crossings | Plan complete; runtime absent | Building plan collision/recovery; #4 |
| Lodge on bank versus in water | Open design clarification | Building plan shelter types; roadmap M0; #8 update |
| Visual lodge, submerged entrance and dry chamber must agree | Open implementation | Building plan shelter/access acceptance; #8/#13 |
| Actual construction resources beyond sticks/mud | Evidence captured; proposed runtime grouping | Building plan evidence/resource classes; #3/#16 |
| Stones optional, not universal requirement | Proposed rule grounded in variable materials | Building plan scarcity/substitution; no mandatory quarry |
| Bedding separate from shell, food and dam sealing | Plan complete; runtime absent | Building plan lodge/resource categories |
| Food stripping leaves construction wood without duplication | Explicit accounting contract; current mixed yield separate | Building plan harvest/migration acceptance |
| Regeneration, shrubs/trees in newly flooded areas | Simple recovery exists, recruitment absent | Generator capability gate; vegetation design; #10 |
| Aquatic establishment, fast-water limitations | Proposed, evidence/regional rules pending | Environment catalog and generator parameters; #10 |
| Water table/depth/speed, moisture/light/substrate fields | Parameter plan complete; shared simulation absent | Environment catalog; generator capability/data contract |
| Scalable ecological artifacts, offscreen consistency | Data direction captured; implementation partial | Generator state contracts; vegetation cohorts; #10 |
| Useful early stock, richer mature habitat without universal quality ladder | Proposed | Building plan plant/material distinctions; vegetation design; #10 |
| Secondary/tertiary consumers, moose/winter-store example | Proposed, biological claim not verified | #11; scenario contract; no assumed raid mechanic |
| Ecology enriches quests/story with alternative resolutions | Proposed | Scenario contract state-driven events; #11/#12 |
| Repeatable procedural scenarios with defined success and many paths | Dedicated plan complete; generator absent | PG0–PG6; #12 |
| Differing generated environments and parameterizable challenges | Catalog and dedicated plan complete | Initial reaches, bounded profiles and correlated sampling |
| Fog: incomplete area, stable home view, stale remote state | Partial across modes | Generator fairness/knowledge; existing observation design; #9 |
| River clues and maturity aid interpretation without hiding safety | Partial clues, progression absent | Roadmap M2/D1; #13 |
| Winter reserves, persistent ownership, later generations | Storage exists; broader scope deferred | Roadmap M2–M3; #8/#11 |
| Save/migration, local accounting and no automatic logs | Partial across modes; contracts specified | Both plans' persistence/validation; #8/#15 |
| Clear backlog, resolved versus superseded discussion status | Implemented documentation and 16 issues | Backlog; this coverage matrix |
| Items requiring input versus research/review | Classified | Roadmap decision register; implementation-plan final sections |
| Create roadmap | Complete planning artifact | ROADMAP.md |
| Complete roadmap + generation + material realism plans | Completed by this follow-up | Three linked deliverables above; runtime issues remain open |

## Gaps found and corrected

1. The procedural plan lacked a dedicated implementation sequence and concrete state/rejection contract; added PG0–PG6, capability checks, profile obligations, witnesses, fallback and acceptance.
2. Material realism was a small section of a broader catalog; added a standalone construction plan with local stages, component conservation, bed-to-crest cost candidate, shelter differences, collision, migration and build order.
3. The starting-home clarification was only in issue #8 plus brief roadmap text; made it an explicit shelter/access requirement in the building plan and coverage matrix.
4. “Complete” could be confused with built/tested; separated planning deliverables, unresolved design decisions, runtime implementation and human/device evidence.
5. Added a stable roadmap decision register so research can proceed without hiding which product choices remain.

## Next action and closure

Proceed through roadmap M0, then select the bounded M1 construction/hauling slice. Planning work for M2 can proceed alongside testing. Procedural profiles must not reference absent main-mode actions.

For future requests, add a coverage row or link an existing row, assign an issue, and update the roadmap only when scope/dependencies change. When implementation lands, link its commit, tests and observed limitations before changing disposition. This review closes the planning-capture task; it does not close #1–#16.
