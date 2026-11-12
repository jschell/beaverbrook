# Beaverbrook — beaver family and wetland builder

> Status audit (2026-11-11): retained reference/research material. Examples do not add implementation requirements or establish biological accuracy. See the [current discussion register](../IMPLEMENTATION-BACKLOG.md), especially RESEARCH-01.

> Imported design material from [Ideas-for-projects](https://github.com/jschell/Ideas-for-projects/blob/2fabfceba1feab90f2ee4a60c13680f2125a8f98/animal-browser-games/beaverbrook.md) on 2026-11-09. See [source provenance](../sources.md) and the [decision register](../design/decisions.md) for current status and precedence.

**Status:** Draft concept; working name.

## Fantasy and tone
Guide a pair of beavers beside a forest stream. Build a lodge and dam, survive seasonal change, raise kits and watch a wetland emerge. Cozy, lightly strategic, with comical beaver personalities. The animals pursue their own survival; biodiversity benefits are emergent, not a deliberate beaver conservation mission.

## Three possible games
1. **Beaver Engineer:** Compact terrain/water puzzles with a lodge-entrance water-depth objective; strongest small MVP.
2. **Wetland Architect:** Change water and vegetation to attract species; visual, restorative sandbox.
3. **A Beaver's Life:** Manage a family across winters and dispersal; strongest emotional progression but highest AI/content cost.
4. **River Puzzle variant:** Tile placement inspired by approachable landscape puzzles.
5. **Living Watershed variant:** More autonomous ecosystem, low direct control and rich feedback.

## Loop
Explore reachable food and wood → gather branches/mud → place/repair dam and lodge → water level and vegetation respond → cache winter food → survive weather → family and habitat progress.

## Whimsical yet educational
- Beavers enthusiastically drag improbably long branches, quarrel over repairs, and react to a satisfying new pond.
- Rainstorms make dams leak or overflow; players learn upstream/downstream tradeoffs.
- Raising pond depth protects underwater lodge entrances but can drown nearby vegetation.
- Selective harvesting versus cutting every tree creates a sustainable food puzzle.
- Ducks, frogs, fish and insects appear when habitat conditions suit them.
- Kits grow and eventually disperse; exaggerated individual traits are explicitly fictional.
- Spring growth, summer gathering, autumn caching, winter survival supply natural chapters.

## Rules to prototype
- Grid terrain has fixed elevation; a simple basin-fill approximation computes pond coverage from dam crest height and inflow, not full fluid dynamics.
- Dam segments consume branches; leakage or storm damage can lower effective crest height.
- Lodge access requires sufficient water depth; winter requires a food reserve.
- Vegetation regenerates slowly and responds to flooding.
- 3–4 wildlife indicators respond to habitat; no full food web in MVP.
- Pause and speed controls; no catastrophic loss during tutorial.

## Prototype acceptance tests
- Placing one segment predictably changes the flooded area; removing it reverses the effect.
- Water never appears disconnected from its source without a defined rule.
- Player sees a visible tradeoff from raising a dam.
- A complete short seasonal challenge can be finished with touch only.
- Reset and save/load reproduce the same state.

## Proposed scope
- **Mechanic prototype (rough 15–30h):** one stream, one dam, visual water levels, branch gathering.
- **Playable MVP (rough 60–100h):** small map, lodge, family, seasons, cache, three events, saves and mobile support.
- **Expanded (rough 150–300+h total):** dispersal, multiple ponds, procedural terrain, wildlife journal and additional scenarios.
All figures are speculative AI-assisted development estimates, not commitments.

## Risks and questions
- Water realism versus legible, deterministic gameplay.
- Avoid resource-management sprawl and pathfinding complexity.
- Decide between puzzle-first and family-first after playtests.
- Validate specific ecological rules against wildlife research before presenting them as facts.

## References
Timberborn; BEAVERDAM; Dam Clan; DAM!; Beavertown; Terra Nil; Dorfromantik; Equilinox. Links in [prior-art review](prior-art-and-transferable-patterns.md).
