# Riverbank Refuge — test area

Version 0.1.0. Three.js 0.187.0 plus native HTML/CSS/JavaScript. No UI framework, backend, accounts or automatic telemetry.

## Run locally

1. Install Node.js 22 or newer.
2. Run `npm ci`.
3. Run `npm test` and `npm run build`.
4. Serve `dist/` with an HTTP server, for example `python -m http.server 8000 --directory dist`.
5. Open `http://localhost:8000/playtest/`.

## What to try

- Build at Willow Bank, add a nook, advance through the flood, provide food, finish.
- Try the deep and shallow side-channel entrances; observe the low-water requirement.
- Build at Current Crossing despite the warning, then salvage and move to Willow Bank.
- Compare the shortcut, reserve and reed-preservation outcomes.
- Use Undo before stage advancement. Restart begins a new run.

Test export is a local JSON download with actions and budgets; nothing is uploaded. Reloading loses the current run. No persistent save or offline PWA yet.

## Deployment

The included GitHub Actions workflow checks changes, builds static files, and deploys `dist/` to GitHub Pages on main-branch playtest changes. Pull requests run checks only. A repository owner may need to set Settings → Pages → Source → GitHub Actions once. Until the deployment succeeds, do not treat a guessed Pages URL as live.

The initial private test is also hosted as a separate browser-accessible test site. That preview and GitHub Pages use the same source files; future private-site updates need their own publication step. GitHub Pages is a public test area for this public repo.

## Included and deferred

Included: authored shelter slots, evidence panels, work/supply budgets, flood/low-water stages, entrance adjustment, optional projects, salvage/relocation and completion checklist.

Deferred: collecting materials, building dams, connected basin-fill water, family AI, procedural terrain, campaign and persistent saves. Supplies start at six; the water stages are illustrative rather than hydrology.

## Validation

Eight rule tests cover both successful shelter paths, reserve/shortcut outcomes, low-stage correction, exposed-site repair failure, salvage recovery, resource rejection and salvage limits. A browser run completed the Willow Bank/nook/food path. The cloud test browser disables WebGL, so visual/browser verification used an SVG compatibility renderer that projects the same Three.js scene. The normal WebGL path needs verification on a WebGL-capable browser. Real phone interaction remains unverified.

## Known simplifications

Water levels change immediately rather than using fluid simulation. Scene heights and visual footprint are illustrative; authored site properties decide outcomes. Feedback panels show all essential evidence. The compatibility renderer favors broad device support over exact GPU shading. Primitive beavers and shelters are placeholders.

## Water clarity update

Low water now stays above the visible bed/terrain instead of disappearing underneath it. A blue channel and pond persist at every stage; tan margins show exposed bank. Labeled low/normal/high water stakes and free preview controls support comparison without changing work, supplies or the game stage. Entrance text distinguishes shallow and deep placements. These are authored visual reference levels, not measured river elevations. Eleven tests pass, including regression checks for visible low-water placement. Browser checks used the compatibility view; GPU rendering remains unverified in this environment.
