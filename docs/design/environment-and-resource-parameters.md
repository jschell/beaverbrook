# Environment and resource parameters

Design proposal, 2026-11-11. Supports [roadmap M4](../ROADMAP.md) and [scenario patterns](scenario-patterns-and-outcomes.md); it does not implement a generator or turn ecological examples into calibrated rules.

Implementation planning is now separated into the [procedural generation plan](procedural-generation-plan.md) and [building materials/realism plan](building-materials-and-realism-plan.md). This catalog supplies parameter/evidence context; those plans define work packages and acceptance.

## Generate situations before generating every landform

Keep simulation rules consistent. Choose an authored reach family, then vary geometry within safe bounds, resource distribution, existing works, seasonal pressure, information and outcome criteria. Validate legal solutions before accepting an instance. A cosmetic biome change is not a different gameplay challenge unless it changes a meaningful decision.

Initial reach families could include a broad shallow valley, a narrow wooded creek, a seasonally low stream, a deep stable channel and an inherited pond with depleted nearby supplies. These are design roles, not claims that every real site behaves the same way.

## Parameter catalog

| Group | Candidate parameters | Gameplay consequence | Support / dependency |
|---|---|---|---|
| Channel geometry | Width profile, bed elevation, slope, bends, side channels, shallow crossings | Dam cost, bypasses, swimming access, route choices | Authored terrain and barriers exist; generated geometry needs connectivity validation |
| Valley and banks | Bank height/slope, floodplain width, low saddles, diggable depth, obstacles | Pond footprint, outlet location, shelter eligibility, channel work | Height exists; substrate/diggability traits need rules |
| Water supply | Normal/dry/high boundary conditions, seasonal amplitude, timing, duration; later inflow/storage | Preparation versus adaptation and pond reliability | Creekside uses simplified normal/dry levels; high-water exists separately in First Reach; no discharge model |
| Flow exposure | Sheltered/moderate/swift class, direction, peak window | Proposed dam suitability, plant establishment and safe routes | Current water solver does not calculate velocity; do not invent current forces from appearance |
| Shelter sites | Chamber/entrance elevations, bank suitability, footprint, existing condition | Deepen, raise chamber, relocate or retain water | Separate experiments support subsets; main-mode founding is M2 |
| Supply layout | Distance, route access, patch size, construction/food composition, deadwood | Quick small loads versus larger distant supply and channel investment | Harvest/hauling foundation exists; richer material roles proposed below |
| Vegetation condition | Biomass, root reserve, cohort age, flood/dry history, moisture, light | Harvest rotation, deferred yields, recovery | Richer patches exist separately; full shared model is #10 |
| Recruitment | Seed/fragment source, arrival interval, substrate, establishment window, spread | New habitat becomes supply only after eligible establishment | Proposed; no automatic trees on every flooded cell |
| Groundwater/soil | Moisture class, water-table response, substrate and saturation history | Forage beyond the visible pond and variable recovery | Proposed approximation, not uniform groundwater rise |
| Existing settlement | Dam height/gaps, local deposits, lodge type, food reserve, remembered routes | Repair an inherited system versus founding elsewhere | Starting assets must be explicit and accounted for |
| Weather pressure | Warning margin, event amplitude, duration, recovery window | Drought/flood preparation and reserve tradeoffs | Use supported weather only; storm damage/ice need separate rules |
| Wildlife pressure | Eligible diet/access, intake cap, timing, cooldown, signs | Share forage, protect stores, change route/site | Proposed, regionally supported species only; no unverified moose-raid claim |
| Knowledge | Initially explored area, home observation, stale age, clue locations, forecast bounds | Scout versus commit; robust versus information-dependent plans | Full knowledge-view integration is #9 |
| Household/work | Population/demand, load limits, work budget, allowed helpers | Capacity and food tradeoffs | Abstract budgets exist; independent workers/households are not implemented |
| Objectives | Viable occupied home, reserve, deadline/hold interval, optional habitat outcomes | Many actions can satisfy one outcome | Shared predicates/witnesses needed; never require one fixed construction sequence |
| Presentation | Palette, vegetation meshes, weather cues, sound, shoreline evidence | Distinct atmosphere and readable causes | Visual variation must agree with state and stay readable/accessibly labeled |

Use explicit units and shared elevation datum. Parameters governing physical behavior must not secretly change with skill or difficulty.

## Vary correlated conditions, not independent sliders

A shallow broad floodplain can offer long low barriers and a large inundation footprint; a narrow deep crossing can require less span but more material from bed to crest. Neither is automatically easier. An existing deep-water site may need no dam. A gravelly margin should not supply unlimited mud; a mature forest must not become a guaranteed source of edible forage. These are generation hypotheses to test, not universal ecological laws.

Sample compatible packages, then calculate actual routes, water and costs. Do not independently roll width, food, deadline and starting reserves and assume the result is playable.

Difficulty should primarily alter preparation margin, transport investment and number of interacting pressures. Preserve clue meanings, understandable costs and recovery. Begin with one main pressure and at most one secondary pressure.

## Example challenge families

| Reach | Primary question | Candidate alternative responses | Required checks |
|---|---|---|---|
| Broad shallow valley | How much pond is useful for its construction cost? | Low long barrier, smaller side-channel pond, suitable bank home | Every offered shelter/action must exist; no impossible span or unbounded flooding |
| Wooded narrow creek | Is nearby forage worth preserving while gathering structure? | Prune nearby and haul fallen wood, fell farther stock, improve transport | Food and structure accounting; depth-aware material costs |
| Seasonal low stream | Prepare access or move toward reliable water? | Retain water, deepen entrance, relocate | Announced decline, real dry-night intake, reachable recovery |
| Stable deep channel | Can a home work without damming the main river? | Suitable bank shelter, sheltered side site | Do not require an unavailable no-dam shelter or simulated flow rule |
| Depleted inherited pond | Restore supply or invest in a new location? | Rotate existing patches, open a useful hauling route, establish another home | Regrowth timescale, travel budget and persistence |
| Maturing wetland | Which patch should be protected for future supply? | Retain early forage, support eligible recruits, adjust water locally | Arrival/establishment, real ecological time, optional habitat versus mandatory food |

A row with unimplemented dependencies is an authored design candidate, not an eligible generated scenario.

## Construction materials: evidence and proposed abstraction

Wildlife sources describe flexible use of locally available materials, not a fixed recipe requiring every ingredient at every site.

- [Washington Department of Fish & Wildlife](https://wdfw.wa.gov/species-habitats/species/castor-canadensis) describes dams made from available wood, stones, mud and plant parts, and lodges as branches/logs with mud. It also distinguishes bank dens from freestanding lodges and notes construction plants need not be food.
- [Alaska Department of Fish and Game](https://www.adfg.alaska.gov/index.cfm?adfg=beaver.main) describes logs/trees, mud, plant masses, rocks and sticks, and smaller tree material cut into transportable pieces.
- [SUNY ESF, Adirondack Ecological Center](https://www.esf.edu/aec/adks/mammals/beaver.php) describes dam trunks/limbs/twigs with mud and rocks; lodge additions include peeled branches, mud and stones. Chamber bedding can include shredded wood, leaves, moss or grass. Regional examples do not establish universal ingredient requirements.

| Material/feature | Proposed game role | Keep separate from |
|---|---|---|
| Logs, substantial branches and woody brush | Structural bulk/framework; piece size changes load/work, not an arbitrary wood tier | Edible bark/foliage quantity and preference |
| Fine branches and leafy/herbaceous plant material | Packing/filler where allowed by the model | Automatic high-strength structural wood |
| Mud / suitable fine sediment | Pack and reduce leakage; lodge exterior work | Treating every gravel/rock bank as unlimited sealing supply |
| Movable stones | Optional local construction/foundation contribution | Mandatory quarrying chain or universal stone requirement |
| Shredded wood and soft plant bedding | Lodge interior preparation/comfort if that system is selected | Dam sealing, structural bulk and food |
| Bank shape, substrate and existing support | Site condition affecting excavation/support | Inventory item that must always be harvested |
| Food-bearing bark, shoots and aquatic forage | Household food and stored reserves | Assuming any construction plant is edible |

Recommended initial abstraction: structural wood and sealing material, with bedding as one simple lodge task rather than many inventory types. Stones can be a local substitution or site advantage later; do not make them obligatory without a gameplay reason. Exact substitution ratios, strength and recipe quantities remain balance proposals.

Where a branch supplies food and structure, explicitly define edible stripping and the remaining woody piece. Removing bark must not grant a second complete branch or duplicate mass. Already-peeled wood may be construction stock with no food yield.

This creates environmental variation without a shopping list: good wood but poor sealing supply; nearby filler but distant large wood; a bank-den site requiring excavation rather than a freestanding mound. Distinct stock should change a choice, not merely add collection clicks.

## Instance generation and validation

1. Select a pattern and reach with implemented capabilities.
2. Sample compatible parameters and initialize accounted stock/history.
3. Recompute terrain, drainage, buildable sites and current routes.
4. Place discoverable clues and disclose outcome/weather rules.
5. Replay at least two strategically distinct legal plans, including scouting, food consumption, hauling, growth and weather.
6. Test allowed event extremes and a recoverable setback; reject invalid budgets, unavailable actions and unavoidable hidden failure.
7. Check that every seed does not reduce to the same dominant plan.
8. Save seed, generator/content/rules versions, instantiated terrain/stock/knowledge, random state and diagnostic witnesses.

Validation uses the same rules as play, not a cheaper optimistic substitute. With dynamic water, verify paths over time rather than only at start/end. With unknown terrain, solution witnesses must include actual information acquisition.

## Build order and boundaries

First specify small parameter sets over authored maps and manually prove alternatives. Next automate sampling and witness replay. Only then consider procedural channel/valley geometry, and only after hydrology, navigation and site validation can reject bad worlds.

Start with geometry, supply layout, patch condition, dry-event timing and reserve goals. Add richer ecology, wildlife, ice or structural damage only when they create a tested decision. No erosion is required.

Tracked in #3/#5/#6/#8/#9/#10/#11/#12/#13/#16; see the roadmap and GitHub issue queue. No runtime changes are introduced by this document.
