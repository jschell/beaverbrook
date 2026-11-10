# Exploration, visibility and remembered conditions

Design proposal. Complements scenario-patterns-and-outcomes.md and vegetation-and-resource-succession.md. The current playtest exposes its authored map; this system is not implemented.

## Player rule

Occupied home lodges provide a persistent local observation area. Family members extend live observation as they travel. Explored ground remains on the map when they leave, while changing conditions become remembered observations with a last-seen time. Unexplored ground stays concealed until observed. The world continues changing outside observation.

Information sharing between family members is immediate in the initial proposal. Delayed reports are an alternative requiring a separate communication design.

## Three map states

| State | Player knowledge | Display and actions |
| --- | --- | --- |
| Unexplored | No observed terrain or contents | Concealed terrain, no hidden labels or inventory. Allow an exploration destination at the known frontier. |
| Remembered | Previously seen geography and timestamped changing conditions | Muted terrain; stale stocks, plants and water marked last observed. Route and work estimates are explicitly provisional. |
| Observed now | Current local observations | Live activity, water, accessible stocks and known clues. Detailed inspections require appropriate proximity where designed. |

Discovery and observation are separate. Preserve known bed/bank shapes, but observed erosion or construction can revise that geometry. An old shoreline does not become a current waterline by remaining on the map. Species or material identification can require inspection, without hiding basic immediately visible safety clues.

## Observation sources

Each occupied lodge has a bounded home footprint. It represents ongoing local activity; it does not reveal the full connected pond or every distant supply. An unoccupied outpost retains remembered information. Occupation and abandonment changes follow declared rules visible to the player.

Each family member has a position, observation radius and applicable line-of-sight rules. Merge footprints from all active observers. Moving one beaver away does not stale a cell still covered by another. Start with a readable radius and terrain occlusion model; validate any canopy, darkness or underwater modifiers before adding them. Raised terrain can block sight. A sound can create an uncertain clue area without identifying an unseen creature or revealing exact stock.

Fog is a presentation of knowledge, not a simulation boundary. Animals, growth, visitor feeding, water and consumption continue outside view using the same rules and ecological clock.

## Remembering the right things

Maintain actual world state separately from player observation records:
- Per-cell explored flag and last terrain observation.
- Per-cell or patch last observed water, condition and time.
- Entity observations with stable reference where known, last position, observed stock/health and timestamp.
- Current visibility derived from observer state.
- Known clues and reports with provenance and location precision.
- Schema version, ecological clock and discovery history in saves.

Never store an unseen future entity in the player-facing observation index. A resource depleted offscreen remains its last observed amount until revisited, with a stale marker. If a resource identity can no longer be confirmed on return, update the record accordingly. Weather can suggest a likely change, but a prediction is not a new observation.

Observations update atomically after simulation and observer movement. Undo restores world, observer and knowledge state together for the experimental mode. Reload retains memory. Changing zoom or camera orientation never reveals hidden state.

## Planning with partial information

Allow scouting an unknown frontier, revisiting a remembered location and assigning a provisional job to a previously observed source. Show last seen time and the assumptions behind estimated supply or travel.

On arrival, recompute against real access and stock. If the plan is invalid, pause the job, keep delivered resources accounted for, reveal the observed cause and offer a reachable fallback or return. Never teleport materials, consume guessed stock or send a worker into an endless retry loop.

Automated hauling creates useful information as workers pass. It also exposes the actual route and nearby changes. Scouts can discover alternatives, but routine monitoring must not become mandatory repetitive clicks. A player can use an occupied site or existing worker traffic to maintain observation where strategically useful.

## Example

A scout sees 8 food units in a pond-edge patch. Another family member returns home. The patch becomes remembered: “8 observed, last spring.” Vegetation and visitor feeding continue there. The player later schedules a collection based on that estimate. The arriving beaver observes 3 remaining, updates the map and offers the feasible smaller load. A report can say “Less forage than last visit.” Tracks or direct sight are needed before attributing the loss to a specific animal.

The known bank remains visible throughout. Current plant animation and visitor position remain concealed when unobserved.

## Scenario integration and fairness

The outcome evaluator uses actual world state. Player forecasts and previews use observed information plus disclosed models and bounds. The generator can know the whole world for validation, but must verify that decisive evidence and at least one recovery opportunity can be discovered in time.

Include scouting travel and observation opportunities in solution witnesses. Two omniscient successful action sequences do not prove a fair partial-information scenario. A witness should branch on discoverable evidence, or demonstrate a robust strategy under the allowed uncertainty.

Announce a risk window before a hidden change can cause irreversible failure. Define an observation policy per scenario: initial home visibility, explored start region, visible forecasts, hidden variation limits, and revisit opportunities. Optional dangerous exploration can carry greater disclosed uncertainty.

A forecast boundary or pond overlay must stop at known terrain, or shade unexplored portions as unknown. A perfect inundation outline can leak hidden elevations. Also audit path previews, minimaps, source menus, counts, tooltips, accessibility labels, quest pins and notifications. They must use the same knowledge view. Local single-player simulation can keep actual state client-side; this is gameplay visibility, not a security boundary.

## Presentation

Use concealment for unexplored areas, muted remembered terrain, and normal color for live observation. Show stale status through text/icon treatment as well as color. Mark last observed shoreline distinctly from current water. Keep the home footprint recognizable without persistent radius rings.

Selecting a remembered patch shows “Last seen” and an action to revisit. Selecting an unknown area offers exploration. Distant animal sound markers communicate approximate area and uncertainty. Keep route estimates, known sightings and actual observations distinguishable.

## Scale and checks

Update visibility from changed observers and affected occlusion, using spatial indexing or chunked cells as map size grows. Store compact persistent discovery separately from transient visibility. Render only the relevant knowledge view; offscreen simulation remains independent.

Check overlapping observers, lodge abandonment, hidden stock depletion, changed remembered geometry, sound clues, failed remote jobs, forecast leaks, accessible text leaks, save/reload and undo. Test a scenario from the player's knowledge state and account for scouting effort before claiming multiple fair solutions.

Open decisions are home radius, occlusion detail, time units for last seen, default sharing between reaches, stale stock precision and whether later scenarios introduce incomplete communication.
