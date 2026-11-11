# Creekside movement proof of concept

Implemented standalone Three.js and vanilla JavaScript experiment, 2026-11-10. Open explore.html, also linked from First Reach. It uses its own authored height field and saved run so the settlement modes remain available independently.

## Try it

Start beside the family lodge. Walk along the bank, cross the creek, approach the grove, pick up one fallen branch, and bring it home. A pale root marks an inspectable landing. The map starts with nearby ground and the known home location, and expands as you move. Three branches are available. Dropped branches remain recoverable at their release positions.

| Input | Action |
| --- | --- |
| WASD or arrow keys | Camera-relative movement |
| Drag open view, either mouse button | Orbit and tilt the follow camera |
| Mouse wheel | Adjust follow distance within limits |
| E or nearby action button | Pick up, inspect or deliver |
| X or Drop branch | Release a carried branch |
| C or Recenter | Put the view behind the current facing direction |
| M or Map | Open the remembered map and pause movement |
| Esc or Pause | Pause/resume |
| Left touch thumbstick | Move with proportional speed |
| Drag open view on touch | Look around |
| Curved-arrow buttons | Turn the view |

Character facing follows actual travel direction; the camera follows position and can orbit independently. Recenter explicitly places it behind the character. A backwards movement input can therefore turn the beaver toward the camera. Controls clear on blur, pause, pointer cancellation and lost capture.

## Behavior

The smooth height field defines ground, depth and movement mode. Walking, wading and swimming use different speeds. A carried branch slows land travel substantially and swimming less. The avatar changes posture and carries a visible forked limb. Collisions use a horizontal radius against trees, a lodge and a rock, with axis sliding, bounded slopes and map boundaries. Movement advances in small substeps, with a bounded catch-up after a slow frame. It has no jumping or diving.

The follow camera samples terrain and trunk/lodge/rock volumes and shortens its boom when obstructed. It can tighten abruptly near an obstacle. It does not provide a polished spring camera or full canopy collision. Terrain and visual meshes share a height function, while the compatibility mesh is coarser. Branches are attached cargo with no independent collision, buoyancy, current transport or snagging simulation. Released branches stay in place, including on water.

Discovery is radius-based. Nearby ground becomes explored, retains its known geography, and appears darker when distant on the map. The grove and landing are marked after approaching them. The lodge location is known from the start. Discovery follows the animal's position, never the orbit camera. Rendering uses distance fog and nearby objects. There is no ray-based line-of-sight visibility or dynamic offscreen resource history in this static scene.

Map inspection pauses movement. Seasons, daylight budgets, construction orders, gamepads, family workers and the settlement simulation are not integrated. That lets this prototype answer whether local movement, camera and discovery are worth integrating. It does not establish that manual hauling should replace automated delivery.

## Persistence

The local save key is beaverbrook-creekside-v1. Position, facing, explored cells, discovered landmarks, three-branch inventory, dropped branches and basic travel counters persist. Normal movement autosaves about every two seconds. Interactions and pause save immediately. Reload opens the pause/instruction screen at the saved position. Start fresh resets only this experiment. No information is uploaded. Camera angle and zoom reset on reload.

## Verification and limits

Rules tests cover movement modes, normalized speed, collision/boundary behavior, local discovery, camera obstruction, finite-stock conservation and save/reload. An integrated movement test traverses land and water to the grove and returns a branch through the same rules.

Browser checks used ordinary keyboard holds to walk, swim, discover the grove, collect a branch, drop/recover it, return around a tree and deliver it. Reload retained one stored branch and discovered terrain. Map inspection and recenter controls were checked. Cloud WebGL was unavailable, so visual checks used a deliberately reduced-detail compatibility renderer. It is slower than the intended GPU view. Native WebGL performance, touch gestures on a phone, comfort and enjoyment remain unverified.

Next evaluation: can a new player find a landing, distinguish dragging from floating, recover orientation using the remembered map, and complete the trip without continuous coaching? Observe whether they choose a second route voluntarily. Camera proximity around vegetation and the amount of travel are open tuning questions.
