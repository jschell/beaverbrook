# Beaverbrook — River Sense, shelter selection and environmental learning

> Status audit (2026-11-11): retained reference/research material. Examples do not add implementation requirements or establish biological accuracy. See the [current discussion register](../IMPLEMENTATION-BACKLOG.md), especially RESEARCH-01.

> Imported design material from [Ideas-for-projects](https://github.com/jschell/Ideas-for-projects/blob/2fabfceba1feab90f2ee4a60c13680f2125a8f98/animal-browser-games/beaverbrook-river-sense.md) on 2026-11-09. See [source provenance](../sources.md) and the [decision register](../design/decisions.md) for current status and precedence.

**Status:** Proposed design; to validate in prototype and against species/site-specific ecology. See [gameplay specification](beaverbrook-gameplay-spec.md).

## Defining mechanic
**Read the river before building.** The player inspects environmental evidence, forms a hypothesis about seasonal conditions, selects a shelter and site, and learns from outcomes. River Sense is a progression of *interpretation and forecasting*, not magical detection or an arbitrary XP bonus.

Do not classify rivers as universally “good” or “bad.” A free-flowing river may be healthy without needing a dam. The same river may combine deep water, fast current, unstable banks, and seasonal flooding in different reaches.

## Evidence players can inspect
| Observable clue | Possible inference | Caveat |
|---|---|---|
| Driftwood/debris above present waterline | Past high water | One event does not establish frequency |
| Scoured banks, exposed roots | Erosion/high-flow exposure | Could reflect multiple processes |
| Narrow channel and gentle flow | Possible dam location | Check gradient, substrate, flood conditions |
| Fast mid-channel current | Exposed structures may be vulnerable | Flow varies seasonally |
| Deep water at ordinary low stage | Dam may be unnecessary for submerged access | Need seasonal minimum |
| Firm, excavatable vegetated bank | Potential bank den | Check collapse, erosion and chamber elevation |
| Rock or unstable loose bank | Excavation may be difficult | Site-specific |
| Quiet side channel | Potential refuge | May dry or disconnect seasonally |
| Willow/other woody food nearby | Convenient food and building materials | Availability changes after harvest/flooding |

Show clues visually in the world and in optional inspection notes. Do not conceal a required clue behind a skill lock. An inexperienced beaver can observe; experienced beavers better *connect* evidence.

## River Sense progression
1. **Curious kit — Notice:** recognize visible depth, flow, nearby food and basic shelter.
2. **Young explorer — Investigate:** inspect high-water marks, bank material, side channels, vegetation and low-water indicators.
3. **Experienced builder — Interpret:** compare candidate sites and shelter strategies; provide qualitative confidence and risk warnings.
4. **Seasoned beaver — Anticipate:** use prior seasons, flood/drought events and construction results to forecast plausible future conditions.

Progress through meaningful observation, successful/failed site decisions and experience across seasons. No generic XP purchase requirement. The player retains a field journal across chapters; individual beavers do not automatically inherit all experience.

## Shelter strategies and meaningful tradeoffs
| Option | Strengths | Risks |
|---|---|---|
| Freestanding lodge in sheltered pond or calm reach | Water access and separation from shore can aid protection | Exposure to high flow, flooding, ice or structural damage depending on site |
| Bank den / bank lodge | Uses suitable riverbank and may avoid large exposed construction | Bank instability, erosion, chamber flooding, or entrance exposure at low water |
| Dam and pond with lodge | Can increase depth in suitable small streams | Materials, maintenance, flooding of vegetation, failure in unsuitable flow |
| Move to another reach | Avoids committing to unsuitable site | Time, travel and delayed establishment |

**No universal ranking:** a bank den is not always less protective than a freestanding lodge; a mid-channel lodge is not always best. Protection depends on bank stability, access, flow, predators/disturbance, and seasonal water-level range. Some locations support neither shelter: relocating is a valid skillful decision.

For gameplay, an exposed mid-channel lodge can be washed away in a strong flood; a well-sited bank den may survive. Conversely, a vulnerable shoreline den may be less secure than a sheltered pond lodge. Make these **site-specific**, not fixed structure penalties.

## Example scenario — Riverbank Refuge
A wide river has pronounced seasonal water variation. A mid-channel construction location looks appealing in low water, but debris above the banks and strong-current cues warn of spring flood risk. A stable excavatable bank offers a den option; a side channel offers another site but may dry in summer.

Player sequence:
1. Survey candidate locations and inspect high-water marks, current, bank and food.
2. Choose a provisional shelter type and location.
3. View a *qualitative* assessment: known advantages, known risks, unknowns, confidence.
4. Build a lodge or excavate a den, or investigate a different reach.
5. Advance through a forecast season; observe water level and structure response.
6. Repair, reinforce, relocate or revise strategy; record why the initial prediction succeeded or failed.

At least two viable solutions with different resource, safety and food-access outcomes. Include one demonstrably unsuitable location whose danger can be identified in advance. Avoid sudden untelegraphed disasters in introductory difficulty.

## Assessment UI
Selecting a site opens **River Notes**:
- **Observed:** physical clues with clear icons and plain-language labels.
- **Likely:** inferences, linked to specific observations; e.g. “debris high on bank → possible flood exposure.”
- **Unknown:** seasonal minimum water, bank stability, etc.
- **Compare:** dam/pond, freestanding lodge, bank den, alternative reach.
- **Forecast:** range or qualitative risk, never fake precision.

Show evidence and reasoning, not an unexplained single “suitability = 78” score. An expert can get more detailed forecasts, but baseline feedback must remain fair for young players. Preview build footprint, access and exposure where feasible.

## Campaign integration
| Scenario | Setting | New reasoning |
|---|---|---|
| First Creek | Narrow stable stream | Depth, flow and dam feasibility |
| Willow Bend | Existing vegetation | Food supply and habitat tradeoffs |
| Riverbank Refuge | Wide deep river | Bank den versus exposed lodge |
| Spring Flood | Variable river height | High-water evidence and shelter resilience |
| Rocky Gorge | Steep rocky channel | Recognize unsuitable sites; relocate |
| Living Valley | Multiple reaches | Compare sites and compound seasonal tradeoffs |

This expands the game beyond dam construction to shelter selection and ecological site assessment. “Establish a wetland” and “enrich an existing stream” remain scenario types; **do not presume a healthy undammed river needs intervention**.

## Minimal playable experiment
One small map with three candidate sites (sheltered pond, erodible mid-channel reach, suitable bank), three evidence indicators (current, high-water debris, bank stability), two shelter types (freestanding lodge, bank den), and one seasonal flood. A dam option can be represented in the existing water prototype; do not require full hydrology.

### Acceptance tests
- Players can inspect every clue needed to avoid a clearly dangerous site without unlocking a skill.
- Increased River Sense improves explanations or prediction quality, not the physical rules.
- A low-water view alone can mislead, but high-water evidence warns before building.
- Flood outcome is deterministic for identical site/build/weather seed and explained after simulation.
- Mid-channel lodge at exposed site suffers damage; suitable bank den survives the same modeled event, while an unstable bank den can fail in another scenario.
- Bank den is not globally inferior to a lodge; at least two site-dependent viable strategies exist.
- A player can choose to relocate rather than build in an unsuitable reach.
- Errors are recoverable through repair, redesign or moving, without a surprise unwinnable state.
- Touch and keyboard controls expose clues, assessments and alternatives.
- After the event, a first-time player can name the clue that would change their next decision.

## Science communication and cautions
Beavers may occupy bank burrows, bank lodges or freestanding lodges depending on conditions, and may not need dams in already-deep water. Avoid claims that all bank dens are less secure or all mid-channel lodges fail in floods. River Sense is a game abstraction of experience and environmental response, not a claim that beavers consciously perform human-style flood engineering. Verify species- and location-specific assertions before publishing educational journal copy.
