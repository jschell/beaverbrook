# Building materials and physical realism plan

> Implementation update (2026-11-12): [M1 construction slice](../../playtest/M1-CONSTRUCTION.md) adopts the candidate depth/span cost model, local structural wood and sealing mud, framework/packing and save migration. These bounded rules now exist; collision, lodge recipes, strength, stones/bedding and actual flow/storage remain proposed. M1 and human/device validation are not complete.

Planning deliverable: complete for review, 2026-11-11 (Pacific). Implementation remains open in [#3](https://github.com/jschell/beaverbrook/issues/3), [#4](https://github.com/jschell/beaverbrook/issues/4), [#5](https://github.com/jschell/beaverbrook/issues/5) and [#6](https://github.com/jschell/beaverbrook/issues/6). Maps to roadmap M0–M2. This plan defines a bounded candidate, not a claim that new recipes or physics already exist.

## Experience and guardrails

Players see why a crossing costs more, why water escapes and how their work helps access. Wood, packing, route choice and site geometry should create alternatives rather than a compulsory ingredient checklist.

Keep terrain stable apart from player excavation. No routine erosion, sediment transport or detailed fluid/structural engineering is required. The existing barrier solver is the initial foundation. Do not gate basic work behind skill XP, require every material everywhere or turn reinforcement into constant chores.

## Evidence basis and limits

The [parameter catalog's material evidence](environment-and-resource-parameters.md#construction-materials-evidence-and-proposed-abstraction) links WDFW, Alaska ADF&G and SUNY ESF. These sources support locally variable wood, mud, plant matter and stones, plus soft lodge bedding. They do not establish game recipes, substitution ratios, carrying capacities, strength constants or a universal mandatory stone requirement.

Lodge-on-bank versus in-water is a site/shelter choice, not inherently an error. The current issue is unclear shelter identity and separation between its drawn mound and modeled entrance. Select a coherent representation and make chamber, entry and tunnel/approach relationship legible.

## Initial resource model

| Resource class | Source / property | Initial use | Initial scope |
|---|---|---|---|
| Structural wood | Logs/branches/brush, location, size class, edible components | Dam framework, raised section bulk, lodge shell | Required external-construction class |
| Sealing material | Suitable local mud/fine sediment; eligible organic filler under a declared rule | Packing a framework, lodge exterior work | One inventory class; do not model each sediment fraction initially |
| Soft bedding | Shredded woody material or suitable soft plants | Prepare dry lodge interior | One task; no separate moss/grass/leaves inventories |
| Movable stone | Bounded local deposits or existing support | Later site-specific construction contribution | Optional; no required quarrying chain |
| Food | Eligible bark/foliage/shoots/forage | Household intake and reserve | Separate component from structural wood |

Material size affects cutting, carrying and bulk, not an invented universal good/bad wood ladder. Plant food preference and structural suitability are separate traits; use functional types until regional evidence supports species claims.

An existing stump/boulder can be a site support condition without becoming a harvestable rock inventory. Decoration must not imply usable stock.

## Harvest, processing and accounting

A source record declares available structural and edible components, reserve/regrowth state and harvestable actions. Pruning, browsing and felling have different yields and impacts. Dead/peeled wood has no automatic food yield.

For a bark-bearing branch, either preserve the existing explicit mixed food/wood yield or introduce a processing action that transfers the declared edible portion and leaves the declared wood. Never award another whole branch when bark is removed. Bedding processing consumes a declared woody/soft component; it is not free output from the same item used structurally.

Loads retain source/type/component IDs and destination. Local deposits belong to a construction section or shelter job. Only committed local work consumes them. Invalid actions spend nothing. Dropped stock remains recoverable; spent material refunds follow an explicit salvage rule.

Current ledger measures fictional resource units, not biological mass. If detailed components replace them, define conversion and opening balances before migration.

## Dam construction candidate

1. Survey: inspect span, bed depth, end-bank elevations, likely bypasses and available supply. Preview uses a cloned state and the same costs/water rules as building.
2. Place stakes: no physical barrier or material consumption.
3. Gather/deliver: deposit actual materials locally; keep their identity/counts visible.
4. Build framework: consume structural wood and show logs rising from the local bed.
5. Pack: consume sealing material and show the packed surface; provide the initial effective barrier.
6. Raise: add required structural and sealing work up to the target crest.
7. Notch/remove: explicit local action; recalculate water and collision, preserve unspent deposits.

For the first material-aware slice, an unpacked frame does not supply full target retention. Use the last completed packed crest in the existing solver. This is a discrete gameplay abstraction, not simulated permeability. Partial leakage, rising storage and structural condition are separate later increments. Existing legacy completed dams are not suddenly made unpacked.

## Depth/length cost rule

Use the shared vertical datum and target crest elevation. Cost depends on bed-to-crest bulk, not just an upgrade number. Proposed calculation per section:

- Split into short samples; for each sample, H = max(0, target crest minus local bed).
- Candidate base width W = w0 + kH; this makes taller sections consume more bulk.
- Bulk B = sum(sample length × H × W).
- Structural requirement = ceiling(B / structural-unit capacity).
- Packing requirement = ceiling(sum(sample length × H) / packing-unit coverage).
- Add only the delta above previously completed requirements and credit compatible deposits. Terrain already above the target contributes no new barrier bulk.
- Store completed paid requirements with the section; lowering does not create negative debt or refund built stock.

Sample constants for a desk comparison only: w0 = 0.5, k = 0.4, structural capacity = 1 bulk unit, packing coverage = 2 area units. All are fictional game units pending legal replay and pacing tests.

A level 2-unit section with H = 0.5 has B = 0.7, requiring 1 structural and 1 packing unit. With H = 1.2, B = 2.352, requiring 3 structural and 2 packing units. This shows why a shorter deep crossing can cost more than an apparently broader shallow choice. Sum costs per section, not by rounding the entire dam once.

Compute incremental cost from cumulative requirements so repeated small raises cannot exploit rounding. Changing targets does not build or consume. Raising a whole dam must credit completed sections and deposits consistently. Version constants; do not silently rebalance old saves.

## Material scarcity and substitution

First slice supports structural wood plus sealing material; use local material suitability as a site choice. If a site lacks necessary sealing supply, provide a discoverable alternative source, a smaller different project, or an already supported shelter/relocation path. Do not claim a solution that is not implemented.

Organic packing and stone substitution require explicit bounded equivalence tables before activation. Do not silently let grass substitute for all structural wood or stones satisfy every seal requirement. Stone is optional unless a deliberately selected later scenario defines another supported construction method.

Transport remains part of the decision: heavy/bulky loads on land versus water, short mixed food loads versus distant structural supply, and channel setup versus repeated trips.

## Lodge and bank shelter candidate

| Shelter | Work categories | Conditions shown to player |
|---|---|---|
| Freestanding lodge | Structural shell, exterior packing, dry chamber preparation/bedding, submerged access | Entrance depth, chamber elevation, supporting bed and approach |
| Bank-associated lodge | Suitable bank/excavation plus external woody structure/packing and chamber preparation | Site eligibility, bank/chamber relationship and underwater entry |
| Bank den | Suitable bank excavation, chamber and entry; external reinforcement only if modeled | Excavatable substrate, dry chamber and reliable access |

Do not force identical recipes on all shelter forms. Exact lodge geometry/costs belong to M2 founding; the opening first needs a clearly represented existing home. Bedding can be one visible completion task, not a survival meter. Winter storage is food reserve, not a building ingredient.

## Water, collision and feedback

Initial hydraulic rule: completed packed sections are crest barriers; gaps, lower crests, low banks and excavated bypasses limit retention. Show the limiting route. Maintain a supplied downstream creek; do not imply that building deletes all water downstream.

Decide actual water storage/inflow before using timed filling for success/access. A cosmetic transition must be labeled internally as presentation and must not contradict swimming, plant flooding or entrance depth.

Collision follows committed structure, not preview. Define gap access, safe climb/cross points and recovery if building intersects the player. Use coarse stable collision rather than every branch.

Presentation: local deposited piles, progressive framework, packed faces, retained water and visible overflow/leak cues. Fixed-height camera and obstacle fading remain; reproduce the white ground flash separately rather than attributing it to construction. More detailed art/rigs remain deferred evaluation.

## Optional later strength

If tests show a useful decision, add a small condition model based on supported height/water-difference exposure and reinforcement. Telegraph loosening and permit repair, notching or lower retention. No unexplained random collapse or mandatory maintenance spiral. Pressure/strength formulas require a separate selected rule and fixtures; they are not prerequisites for this first slice.

## State, migration and verification

Add versioned material definitions, component/deposit records, paid cumulative requirements and completion/packing state. Keep rendering derived from these records. Existing wood counts retain their declared value; do not grant free inventories. Preserve completed legacy structures as paid legacy construction and charge only explicitly new work. Reconcile current inventories/deposits and save positions before migration; never retroactively strand the household.

| Check | Acceptance evidence |
|---|---|
| Cost geometry | Shallow/deep, long/short, sloping beds and mixed crests yield explained costs |
| Incremental work | One large raise and equivalent smaller raises have the same total; deposits credited once |
| Materials | Source → load → deposit → completed structure/food/bedding balances reconcile |
| Preview | Unchanged inputs produce matching quoted and committed costs/water |
| Stages | Stakes/frame/packed crest have declared visible and hydraulic effects |
| Shelter | Visible entry/chamber and the rule probes describe the same structure at normal/low water |
| Access | No walking through finished logs, preview collision or unavoidable construction trap |
| Recovery | Notch/remove/salvage preserve declared costs and recoverable deposits |
| Migration | Old complete projects/stock stay valid; reload cannot create supplies or charge old work twice |
| Experience | Players explain a site/material/route choice and see its payoff without a recipe checklist |

## Sequence and decisions

BR0: confirm source/component and legacy accounting; illustrate depth-aware cost alternatives.
BR1: implement local structural/packing stages and visible quantities in a bounded dam slice.
BR2: add committed collision/crossing and outlet feedback.
BR3: test supply alternatives and pacing, then choose M2 shelter recipes/placement.
BR4: only if useful, evaluate substitution, actual storage and warned strength.

Engineering review can tune fictional bulk/carry/cutting values against legal traces. User review is needed before committing broad failure/maintenance pressure, shelter/control direction or new asset production. Research can refine regional material/plant eligibility independently. Planning is complete; implementation and player/device validation remain open.
