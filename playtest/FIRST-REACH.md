# First Reach

Implemented settlement experiment. Open reach.html (the default root entry). Start at an inherited Willow lodge beside a leaking narrows dam. A lower meadow crossing and a naturally deep bend offer other settlement opportunities on the same authored map.

## Playing

Select a shelter or dam on the map. Choose construction wood, then queue a project. Use **Let the family work** to execute queued jobs in order. Beavers collect material, deliver it locally and construct successive stages. A job stops when complete, blocked, or unable to afford another step before dusk. Work continues next season when requested. Removing a job keeps its delivered resources at that site. Requeue it to resume. A paused source can be changed by removing and requeuing with another source. Mud comes from the cheaper available bank according to the current route.

Supplies exposes food orders (at least 4 branches in loads of up to 2) and inspection visits. Living branches used for construction and food consume the same persistent patch. Fallen wood supplies construction only. Channel orders dig once; deepening is a separate order. A completed narrows pond is required for these hauling-channel actions.

Completed shelters can be occupied using Move household (3 daylight, including moving the common food reserve). Existing structures persist. Only one household and its occupied home are simulated. Additional completed shelters are available destinations, not autonomous colonies.

Each season grants 36 fictional work units and consumes 2 food. Two normal seasons precede each dry season. Weather repeats every three seasons, vegetation recovers at the transition, and the world remains playable after a successful challenge. The first dry period is season 3. End it in a completed occupied shelter with at least 0.40 entrance depth and either 4 stored food after consumption or a modeled renewable 2-branch food supply. The latter checks accessible patch biomass and recovery after a hypothetical 2-branch cut. It is an immediate productivity proxy, not a proven indefinitely sustainable ecosystem.

Insufficient food or an exposed occupied entrance during dry weather holds the season open and explains the recovery requirement. Undo is available within the session. This forgiving experiment has no hunger death timer. Initial food (8) provides time to explore and build; feeding demand becomes more relevant as settlement development continues.

## Three verified strategies

- Restore the leaking narrows and deepen Willow's doorway. Uses inherited shelter and a small repair.
- Build the Deep Bend bank shelter and move the household. Both dams can remain incomplete. Its entrance uses a connected deep-water pocket that persists during dry weather.
- Complete the five-section meadow dam, build and deepen Meadow Lodge, and move. This larger construction can span preparation seasons and produces a different pond and supply geometry.

The same household can later build the other structures. Tests replay all three strategies through low water and into season 4. They also cover simultaneous dams, local deposits, interruption/resumption, shared resource depletion, save/reload and observed-stock accounting.

## Rules and scope

This is an authored reach with two dam alignments, three shelter sites and two channel routes. Arbitrary placement, a separate side-channel settlement, procedural maps, full fog of war, predators and family AI remain future work. Selection pins remain the prototype's interaction method. The map has selectable layers to reduce label density. Offset labels use leaders to retain their connection to locations.

Construction and routing reuse creek-rules.mjs. World state now supports optional terrain overrides, simultaneous dam state and multiple shelter records. Legacy experiments use their original single-dam state. Water uses connected grid inundation with instantaneous equilibrium. It does not simulate flow conservation, sediment or hydraulic forces. Either incomplete dam releases its modeled impoundment; the other completed dam continues retaining its own modeled water.

Natural deep water is authored beside the bank-den site. It is connected to the base creek rather than created by a shelter. Two ordinary water levels and the dry decrement drive shelter depth and growth. Enlarged ponds affect both hauling and patch moisture. Their outcome can be previewed without committing resources.

Living sources use the prior root-reserve, age, biomass and environmental recovery model. This retains fictional types and costs; species fidelity is not verified. Terrain and water are visible. Living-source counts retain last observations outside a three-cell Manhattan radius around the occupied home; harvest and inspection update them. Automatic trips currently update their source records, not full sight footprints along a route. Remote vegetation still advances. Scouting has limited value while offscreen changes only add growth. No improvement in scouting gameplay is claimed.

## State and verification

Run state autosaves locally under beaverbrook-first-reach-v1. It is independent of earlier experiments. Local undo lasts for the session, including work and weather. Export downloads JSON, with no automatic uploads. Undo restores both project deposits and patch observations. Autosave uses the committed state after a work batch, so a page closed during animation resumes from before that batch.

Materials are counted at sources and delivered depots. A batch consists of atomic affordable gathering/delivery and building steps. Unaffordable steps cannot consume stock. Source preference is explicit per order. Deposited materials remain reusable only by that project's site/type when requeued. There is no salvage/transfer UI yet.

The project queue uses one work budget and sequential deliveries rather than simulating concurrent workers. Each delivered load is animated, followed by the committed world update. This verifies autonomous task execution but does not yet depict construction advancing after every load during a batch. Moving uses an authored fixed work cost.

Browser checks used the Three.js compatibility view because native WebGL was unavailable in the cloud browser. Bank shelter construction, occupation, low-water success, continuation, undo and reload were exercised. Native GPU rendering and phone performance are unverified. Tests establish feasibility, not player enjoyment or balanced strategic incentives.
