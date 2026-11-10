# Vegetation, materials and wetland succession

Design proposal, 2026-11-09. This describes a future simulation and content model. The current playtest uses finite authored sources. Parameters and species behaviors below need regional ecological review before educational claims or numerical calibration. External research retrieval was unavailable during this design pass.

## Player experience

The player changes water and access, observes new vegetation, and chooses when and where to harvest. Early colonizers provide modest usable stock. Established patches can produce larger yields, better food or specialized material. Repeated heavy harvest can hold a patch at an early stage. Favorable habitat without seed arrival can remain empty.

Maturity creates opportunities. It does not guarantee an upgrade through one fixed sequence. Open water, emergent marsh, wet meadow, shrub margin and woodland are viable outcomes under different conditions. Preserve useful early patches while establishing slower supplies elsewhere. Starter plants and mature yields need separate definitions for food, binding material and structural wood. A plant useful for habitat or soil cover need not be edible or usable in a dam.

## Regeneration processes

| Process | Persistent state | Gameplay consequence |
| --- | --- | --- |
| Surviving plant regrowth | Root reserves, remaining stem, damage, season | Cutting living wood differs from uprooting. Repeated cuts can exhaust recovery. |
| Recruitment | Seeds/fragments, viable substrate, establishment time | New habitat needs an arrival opportunity and a successful establishment window. |
| Clonal spread | Neighboring roots/rhizomes and available space | Some candidate types spread from an existing patch into suitable adjoining ground. |
| Dead material production | Mortality, fallen mass, decay | Inundation can create deadwood while reducing living forage. Fallen wood has a separate supply history. |
| Seasonal replenishment | Leaf state, production, dormancy | A living patch may remain on the map while its harvestable food changes. |
| Succession | Cohort age, canopy, substrate and competition | Early vegetation can facilitate some later recruits and compete with others. |

Avoid a countdown that refills every harvested source. Tree recruitment and tree maturation are distinct. Branch clipping, felling, uprooting and collecting fallen wood produce different state changes. Coppice or root resprouting is a trait of an eligible type, not a universal rule.

## Environmental fields

Use declared physical units for environmental values and explicitly named game units for fictional yields. Absolute elevations share a vertical datum. Surface depth is max(0, surface elevation minus ground elevation); depth to groundwater is ground elevation minus groundwater elevation and may be negative.

| Field | History to retain | Potential effects |
| --- | --- | --- |
| Surface water depth | Current, mean, range and extremes | Exposure, drowning, light at submerged leaves, access |
| Hydroperiod | Consecutive wet/dry time and fraction inundated | Establishment, root stress and habitat class |
| Flow velocity | Direction, local speed, peak exposure | Dispersal, settling, bending and uprooting |
| Bed disturbance | Shear proxy, erosion and burial events | Root survival and seedbed stability |
| Groundwater | Root-zone saturation and seasonal range | Growth on banks beyond visible floodwater |
| Soil moisture | Root-zone available moisture and drought duration | Germination, growth and drought stress |
| Substrate | Mud/sand/gravel/organic fractions, rooting depth | Anchorage and recruitment |
| Sediment | Suspended load, deposition and scour | Turbidity, new seedbeds and burial |
| Light | Sun exposure, canopy shade, underwater attenuation | Photosynthesis and competition |
| Temperature and season | Growing degree proxy, frost/dormancy | Growth, seed release and establishment windows |
| Nutrients and organic matter | Available pool, additions and uptake | Productivity, decomposition and competition |
| Crowding | Ground cover, canopy, root occupancy | Space and resource competition |
| Disturbance | Harvest, trampling, fire or flood as supported events | Damage, openings and reset opportunities |
| Propagule access | Local viable pool and incoming sources | Which types can arrive |
| Root-zone oxygen proxy | Sustained saturation or habitat class | Distinguish wet-tolerant margins from stressed woodland |

Do not require all fields for a first implementation. Start with depth, wet/dry history, a flow class, moisture, light and substrate. Derive other fields only when an implemented rule uses them. A coarse groundwater relaxation model can supply moisture beyond the pond edge. Label it as a gameplay approximation; a dam does not raise groundwater uniformly everywhere.

## Plant type definitions

Each type has a stable ID, regional scope, display names and evidence notes. Define establishment tolerances separately from adult survival tolerances. A mature plant can persist where a seedling cannot establish.

Trait groups:
- Habitat response curves for depth, saturation, flow, light, moisture, temperature and substrate. Use a hard exclusion only for a real design requirement; use gradual suitability within viable ranges.
- Reproduction mode, seed/fragment release season, dispersal distance or transport method, viability, clonal spread and minimum establishment period.
- Growth season, growth rate, maximum cover/biomass, maturation milestones, root reserves and stress recovery.
- Flood/drought tolerance durations, disturbance resistance, uprooting susceptibility and mortality response.
- Canopy contribution, litter, sediment trapping and other supported habitat feedbacks.
- Food yield, preference, accessible season, woody yield, structural size, flexibility and decay. Keep food desirability separate from energy and collection effort.
- Compatible substrates, competition priorities and any facilitation of later recruitment.
- Evidence record with source, region, supported claim, uncertainty and parameter status. Research pending and playtest balance are distinct statuses.

Use functional groups for initial content: fast margin colonizer, persistent wetland cover, resprouting shrub, young woody cohort, mature woody cohort, emergent aquatic and submerged aquatic. These are content roles. Assign actual species after validating their regional traits.

## Aquatic plant establishment

Aquatic recruitment checks arrival, suitable water/substrate, and enough stable time to root or spread. Candidate pathways include a seeded pond bed that becomes suitable, fragments arriving from upstream, spread from a connected patch, or an explicitly supported restoration action.

Emergent, submerged and floating plants need different rules. A single shallow-water threshold cannot represent all three. Submerged vegetation depends on underwater light and anchorage. Emergent establishment depends on rooting and suitable depth history. Floating material follows surface transport and retention conditions. None should appear automatically across every newly wet cell.

Young plants can wash away before rooting. Adult resistance and regeneration can differ. Preserve a viable seed bank through some adverse periods according to its type. A player sees settling fragments, new shoots or returning growth as the explanation for arrival.

## Succession and improving starting stock

An illustrative branch is exposed wet sediment -> sparse pioneer cover -> established margin with shrub recruitment -> productive shrub mosaic. Another is flooded ground -> aquatic establishment -> emergent marsh. Persistently deep or fast water can retain open water or a scoured channel. Falling water can favor a different recruitment window.

Starter stock should be usable enough to sustain early play. Improvements can mean more biomass per trip, more reliable seasonal food, denser patches or stronger construction stems. Retain at least one reason to value early growth, such as quick renewal, accessible fodder, flexible binding material or recovery after disturbance, where the selected type supports that use.

Avoid a universal quality ladder. Older wood can offer more structure while requiring more cutting and hauling. Young shoots may remain preferable food. A mature shaded patch may suppress nearby growth. Heavy felling can open space and reduce immediate food. Exact ecological interactions require evidence per species.

Separate ecological time from action time. Choose an explicit season transition or coherent accelerated calendar before balancing woody maturation. An overnight tree replacement would erase the incentive to establish future supplies.

## State artifacts and scale

| Artifact | Examples of stored fields | Scope |
| --- | --- | --- |
| Environmental cell | Ground elevation, depth, moisture, flow, substrate, exposure history | Spatial grid, simulation data |
| Plant definition | ID, curves, reproduction, yields, evidence | Shared content catalog |
| Vegetation cohort | ID, type, footprint/cover, age, biomass, root reserve, stress | Patch or cell population |
| Propagule pool | Type, viability, amount, arrival time | Cell or patch |
| Deadwood deposit | Mass, size classes, decay, position and mobility | Resource deposit |
| Harvest event | Source ID, removed components, remaining reserve | Local accounting |
| Reach summary | Habitat areas, supply and demand, recruitment, losses | Inspection and larger-scale display |
| Save metadata | Schema version, type IDs, clock, deterministic seed | Migration and reproducibility |

A rendered tree is a representation of cohort state. Decoration is not harvestable stock. Render fewer representative objects when zoomed out while retaining the same simulation totals.

Use bounded cohorts per cell/type or merged patches rather than one plant object per blade. Merge only compatible cohorts and preserve age structure where it changes yields. Keep hydro updates and biological updates on suitable separate intervals. Recompute dirty areas and their downstream/neighbor dependencies. Dormant offscreen areas must still account for habitat changes, consumption and recruitment. Camera position must not change outcomes.

Saves retain stable IDs, stocks, reserves, seeds and exposure history. Migrations must define how old finite sources become cohorts and preserve the old run's available wood and food. A reset or reload must never create harvestable stock.

## Update and accounting

Each biological step consumes the elapsed interval, environment history and a deterministic random stream. Resolve hydrology and disturbance exposure, dispersal from pre-step sources, candidate establishment, growth/competition, stress/mortality and dead material production in a declared order. Buffer changes before commitment to avoid neighbor iteration bias. Process harvest immediately and use the remaining biomass in the next growth step.

A conceptual growth calculation uses potential seasonal growth, habitat suitability, remaining carrying capacity and resource availability. A limiting-factor minimum can be easier to explain and tune than multiplying many weak penalties. Calibrate functions before selecting one. Establishment and survival need their own calculations.

Track living biomass, harvestable components and material destination to prevent double counting a stem as food and structure. Food removal may leave construction wood only under an explicit processing rule. Dispersal should move bounded propagules or use an explicit reproductive source term. Deadwood is generated from mortality or documented incoming debris. Soil/flow feedbacks should be capped and initially small to avoid unstable overnight transformation.

## Player-facing inspection

Selecting a patch shows available yield, recovery stage, likely next seasonal change and a concrete limiting cause: too shaded, repeated cutting, unrooted in fast water, or suitable ground awaiting seeds. Use local shoots, stumps, deadwood, sediment and waterline changes to show history. Offer forecast ranges for uncertain recruitment and state assumptions. Keep detailed numbers in inspection rather than persistent screen furniture.

## Follow-up verification before implementation

Use one authored bank and one pond margin to compare clipped shrub recovery, uprooted source loss, aquatic arrival and establishment, prolonged flooding of unsuitable woody plants, low-water recruitment and repeated harvest holding back succession. Verify no creation on save/reload, identical outcomes offscreen, stable results across equivalent elapsed-time subdivisions within the model's tolerance, bounded patch counts and meaningful material budgets. Human tests should check whether players can predict where and why new resources appear.

Open choices include regional species set, ecological timescale, player ability to plant/transplant, groundwater approximation, strict material conservation, succession visibility and which habitat outcomes have gameplay value. These are proposals for review.
