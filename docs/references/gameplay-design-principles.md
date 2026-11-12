# Gameplay design principles — ages 8–10+

> Status audit (2026-11-11): retained reference/research material. Examples do not add implementation requirements or establish biological accuracy. See the [current discussion register](../IMPLEMENTATION-BACKLOG.md), especially RESEARCH-01.

> Imported design material from [Ideas-for-projects](https://github.com/jschell/Ideas-for-projects/blob/2fabfceba1feab90f2ee4a60c13680f2125a8f98/animal-browser-games/gameplay-design-principles.md) on 2026-11-09. See [source provenance](../sources.md) and the [decision register](../design/decisions.md) for current status and precedence.

**Status:** Draft design guidance, not proven playtest findings.

## Target experience
Readable to an eight-year-old, strategically interesting to older children and adults. Simple rules and controls; depth from combinations, not menus. Aim for an enjoyable first action within 60 seconds, an understood objective within two minutes, and a satisfying stopping point in 10–20 minutes. These are targets to test, not guarantees.

## Lessons from other games
| Reference | Transferable pattern | Caution |
|---|---|---|
| Kingdomino | One placement affects future opportunity | Avoid opaque scoring |
| Cascadia | Overlapping spatial goals create depth | Avoid too many simultaneous goals |
| Ticket to Ride | Limited resources, contested routes, visible objectives | Don't force direct conflict |
| Sushi Go! | Fast drafting and combinations | Avoid excessive card reading |
| Forbidden Island | Recoverable shared crisis and changing map | Avoid runaway failure |
| Dorfromantik | Satisfying placement and layered objectives | Avoid repetitive low-stakes turns |
| Portal 2 | Teach rules separately, then combine them | Avoid pixel hunting |
| Into the Breach | Preview consequences before commitment | Don't conceal essential state |
| Minecraft | Self-directed experimentation and projects | Provide optional goals |
| Stardew Valley | Short actions contribute to seasonal progress | Avoid mandatory chores |
| Slay the Spire | Small sets of synergistic mechanics | Avoid randomness overwhelming strategy |

These are mechanical inspirations, not proposals to reproduce another game's content.

## Design rules
1. **Meaningful choice:** at least two reasonable options with situational advantages; no permanent dominant strategy.
2. **Readable feedback:** action, cause and consequence are visible; allow preview/undo for planning where feasible.
3. **Discoverable systems:** teach one rule in safety, then combine it with another in a new situation.
4. **Player agency:** experiment, choose approaches, recover from mistakes; no arbitrary instant game-over in standard mode.
5. **Progression:** immediate goal (1–3 min), session goal (10–20 min), longer-term goal (chapters/seasons).
6. **Variety:** new combinations of established rules before introducing more mechanics.
7. **Character and delight:** expressive reactions and small surprises, without hiding the rules.
8. **Science as cause-and-effect:** observations and experiments drive the fun; optional journal distinguishes observation, interpretation, and fiction.
9. **Accessibility:** touch targets, keyboard access, scalable text, non-color-only indicators, optional hints, reduced motion and no reflex requirements for critical progress.
10. **Respect time:** offline play, autosave, suspend/resume, no daily-login pressure.

## Playtest protocol
Observe first-time players without coaching. Record: time to first successful action, whether they can state the goal, misunderstood controls, attempts per challenge, perceived fairness of setbacks, voluntary experimentation, and whether they want another round. After each playtest ask: “What choice did you make?”, “What happened because of it?”, “What would you try differently?” Avoid leading science questions.

## Decision gates
Do not add a subsystem until the core action is enjoyable repeatedly. Prefer one action + two constraints + two interacting systems to an elaborate simulation. Validate on desktop and phone; check save/load and offline use before calling a vertical slice complete.
