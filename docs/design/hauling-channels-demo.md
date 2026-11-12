# Hauling channels and food access — demo 0.4.0

> Tracking audit (2026-11-11): [current discussion dispositions and issue queue](../docs/IMPLEMENTATION-BACKLOG.md). This record describes its named experiment; historical verification counts do not claim current human/device validation.

**Implemented trial.** The user requested a demo based on the accuracy review. This slice adds two authored hauling cuts, terrain excavation, connected filling, route previews and one deepening action per cut. It corrects the earlier blanket rule that flooded shore brush becomes unusable food. Earlier 0.3.0 walkthroughs remain historical evidence, not current rules.

## Try it immediately

Open `playtest/creek.html?mode=channels`, or select **Channel demo** in the header. This begins with the Narrows dam and Willow Cove lodge already constructed. The setup replays legal gathering, delivery and construction actions, leaving the same finite sources and local inventories as an ordinary run; it does not create free materials. Setup effort is included in the displayed total (32.0 under the new hauling precision).

1. Keep Young tree patch → Lodge selected. Preview the East feeding channel: the excavation and proposed delivery route appear without changing water, inventory or effort.
2. Dig for 3 effort. Terrain lowers and connected pond water fills the cut. Hauling becomes 2.3 rather than 2.9 effort per load.
3. Gather/deliver food to Food cache and finish it; deepen the lodge entrance if keeping a low crest. Alternatively establish its feeding route and preserve 2 shore-brush units.
4. Advance to the dry spell. The shallow cut still contains water, but minimum depth falls from 0.55 to 0.25, below the game's 0.30 swimming threshold. Hauling uses other approaches and returns to 2.9 effort.
5. Deepen the selected channel for 2 effort. Minimum depth becomes 0.55 at dry low water; hauling returns to 2.3. Finish the trial when its entrance/food checks pass.
6. Compare the alder-side option and other source/destination pairs. A cut need not pay back before its source is depleted.

The standard scenario and construction sandbox retain these channel tools. New creek in quick-demo mode resets to the same prebuilt settlement. Reload loses the run. Full action undo includes excavation, weather and inventories; export remains local with no automatic uploads.

## Trial rules

| Cut | Authored cells | Initial cost | Shallow bed | Deepening |
|---|---|---|---|---|
| Alder-side cut | (5,0) through (5,4) | 2 effort | 1.50 | Once, 2 effort; bed 1.20 |
| East feeding channel | (10,2), (9,2), (8,2) | 3 effort | 1.50 | Once, 2 effort; bed 1.20 |

Excavation uses the lower of the original elevation and specified bed: it never raises ground. Channel cells participate in the same source-connected basin fill as ordinary terrain. Digging does not create a separate water source or raise the pond surface. A dry/disconnected cut grants no water-travel benefit. The dam must be sealed and carried cargo delivered before excavation. Unknown/repeated actions are rejected without cost; completed trials freeze these actions too. No removal refund, arbitrary brush painting, new resource, erosion, or silt timer.

The bounded route solver recalculates each trip over the modified terrain. The water discount applies to connected tiles with at least 0.30 depth; an epsilon handles decimal comparisons. Other traversable tiles use the land rate. The map has no complete cliff, land-inundation, predation or carrying-physics model.

Hauling effort now uses **tenths**, replacing integer ceiling: max(1, round(weighted one-way distance / 2, 1)). Land steps weigh 1, deep-water steps 0.45; the factor represents an abstract round trip. This exposes smaller local improvements instead of hiding them behind whole-number rounding. Action totals are rounded to one decimal after each successful action. No earlier integer effort totals should be compared directly with this release.

## Investment examples

At quick-demo normal low water, Young tree patch → Lodge costs 2.9/load before the east cut and 2.3 after. A 3-effort dig pays back after about 5 such loads; six loads remain at the source. Falling water removes that saving until deepening (another 2 effort), or a higher pond restores sufficient depth. Do not claim that digging plus deepening necessarily pays back within the remaining six loads: total excavation cost and the timing of deliveries matter.

Fallen alder → Lodge costs 1.9/load before the western cut and 1.4 after, paying back a 2-effort dig after four loads at that level. The quick-demo setup leaves just one alder load. That cut is therefore a poor investment for that remaining job, though a different construction order/destination can change the comparison. Preview displays current and dry-trip costs, excavation cost, approximate break-even loads, and remaining source loads. Benefits are recomputed, not global upgrades.

## Food correction

Flooded shore brush retains its remaining branches and can supply food through a water approach. Gathering is no longer blocked merely because its tile is wet. A feeding route needs a completed lodge, 2 effort, at least 2 remaining brush units, and a route to the lodge; it no longer consumes 2 building wood or requires a dry brush tile. Depletion still invalidates live feeding; a completed cache is an alternative for this short scenario. Food/wood remain separate cargo selections sharing source availability; stripping bark then reusing wood is deferred.

This removes the forced high-pond/cache pairing from 0.3.0. High pond + live feeding can now succeed. Raising still costs locally delivered material; deepening a low-pond lodge remains another way to retain access. We have not added a fictitious penalty just to preserve the old fork. The revised tradeoff is effort, source depletion, water access and investment timing. Human testing must assess whether that is sufficiently interesting.

Caches are optional provision abstractions here, not evidence that every beaver population requires a winter cache. No hunger consumption or detailed long-term vegetation response is simulated. Flooding does not instantly kill vegetation in the demo.

## Nature versus abstraction

- [WDFW: Beaver](https://wdfw.wa.gov/species-habitats/species/castor-canadensis), Channels and feeding sections: beavers use excavated channels to move woody food and swim; flooding can support food access. This supports channel/transport inspiration and rejects treating all inundated food as automatically lost.
- [Montana FWP: Living with Beavers](https://fwp.mt.gov/conservation/living-with-wildlife/beavers), Slides and channels: maintenance of access channels is associated with receding summer water.
- Exact routes, bed elevations, effort costs, the 0.30 depth threshold, one-time deepening and instant fill are authored game rules. They are not measured digging rates, biological limits or a hydrology model.

Other accuracy suggestions remain deferred: partial-leak retention, food/construction reuse, seasonal cache specificity, slides, bank-den scenarios and family behavior. This release does not claim to implement those.

## Verification and remaining questions

42 automated tests pass. New tests cover actual terrain/cost changes, immutable previews, dry-spell/deepening response, disconnected cuts, finite setup, repeat/cargo guards, source-specific payback, real local delivery accounting and food access through higher water. App regression checks preview/dig/weather/deepening/undo wiring. The existing renderer-success test now checks excavated mesh heights and water-state changes using real Three.js geometry and a CPU renderer double.

Browser verification used the compatibility renderer: opened the quick demo, previewed/dug the east cut, hauled food, advanced through dry water, deepened the cut, hauled again and finished; then restarted, raised the pond, established a live feeding route, collected flooded shore food and finished using that route. Native WebGL pixels and real phone touch/performance remain unverified. The final text-only clarity changes were covered by regression tests.

Human questions: does the route change look understandable; does a player compare remaining loads against digging cost; do fractional effort values help or distract; does excavation offer a useful choice before resources are depleted; and does the player want to try another construction order? Developer success is not evidence of enjoyment or validated balance.
