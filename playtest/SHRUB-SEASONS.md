# Shrub seasons

Implemented resource experiment, accessed from the family tutorial header or patches.html. Three authored shrub patches share an established lodge and a deepened entrance. These are fictional yields and seasonal game rules, not a calibrated biological model.

Each season gives 10 daylight. Harvest carries at most 2 food branches through the existing gather/deliver rules. The upstream patch uses the existing larger-source cutting cost (2 daylight), the other patches use 1, plus route work. Visiting alone spends route work. A trip commits atomically. Failed unaffordable actions spend nothing. An empty arrival spends travel/collection budget and refreshes the record.

The lodge starts with 4 food branches. At each season end it needs 4. Success means feeding 3 seasons and retaining at least 4 food branches after final consumption. A shortage ends the trial and can be undone. There is no shelter-building requirement in this resource experiment.

All sources are persistent patches with age, biomass, root reserve and a harvest flag. Capacity is bounded by type and age. Harvest removes biomass and reduces root reserve. Recovery is limited by remaining capacity, moisture, light and roots. Uncut roots recover gradually. The low-reserve nearby patch starts with poor recovery. The young patch begins with a small age-based capacity. The upstream patch begins with more biomass.

Soil moisture is an authored approximation using distance from connected water, site retention and a dry-season penalty. Depth greater than 0.45 prevents recovery in this trial. Light and sheltered flow are authored site fields. Flow is recorded for inspection but does not yet alter shrub growth. Root reserves and biomass do not model plant death, seeds, recruitment or plant succession. Positive recovery from zero branches represents surviving roots.

Growth at season end uses the conditions during the season ending. Then the next season's water is applied: normal in season 1, dry in season 2, normal in season 3. These are compressed seasonal steps, not overnight tree maturation.

All three patches start surveyed. Lodge shrubs update continuously from local observation. Distant records refresh only on visit or harvest, including after seasonal growth. The map and details use remembered biomass, roots, age and conditions. Unknown terrain and line-of-sight fog are future work. Water and known terrain remain live. Growth estimates use the observed conditions and explicitly stay provisional when stale.

The run autosaves under the separate versioned local key beaverbrook-shrub-seasons-v1. Reload resumes without growth or food creation. Undo is an in-memory history and autosaves the restored state. New run replaces this experiment's saved run. Existing tutorial and construction modes retain their own rules. Export downloads the full run locally. There is no import control or telemetry.

Rules are in patch-rules.mjs, UI in patch-app.mjs, with the existing Three.js creek scene used for rendering and delivery animation. Vegetation rendering uses observed patch stock and suppresses unrelated source markers. This is partial information about resources, not full fog of war.

Rule witnesses include front-loading all three patches then harvesting upstream in the last season, and leaving the lodge shrubs alone while rotating shore/upstream stock. The test suite checks material accounting, recovery pressure, hidden growth, refreshed observations, shortage, terminal guards and round-trip saves. Human enjoyment and biological fidelity remain unverified.
