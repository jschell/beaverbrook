# Tablet hint and overlay layout review

2026-11-12 · [Issue #17](https://github.com/jschell/beaverbrook/issues/17), related to [platform validation #15](https://github.com/jschell/beaverbrook/issues/15).

## Finding

The supplied Safari landscape screenshot shows the nudge text clipped beneath the home panel, next to the thumbstick. Reproduction at a 1024×620 CSS content viewport placed the hint at y499–573 while its HUD clip ended at y401. The HUD had a fixed height deduction and ignored pointer events outside its cards. Expanded content could therefore hide both nudge and text without a reliable scroll gesture.

Related risks were oversized expanded work panels, map dismissal below the visible region on short screens, controls smaller than 44 CSS pixels, and a vertically centered long menu whose top could become unreachable.

## Implemented behavior

- Measure the actual header, footer and bottom controls; reserve an information lane above the controls. Dynamic viewport units and safe-area padding supplement those measurements.
- Keep nudge and hint outside the independently scrolling home details. A manually requested nudge stays open until dismissed or replaced by another game message. Dismissal returns focus to the nudge button. Long text can scroll within the hint.
- Start home and nearby work details collapsed at widths ≤950px or heights ≤720px. The chapter title and nearby location remain visible; explicit disclosure choices survive resizing during the session.
- Bound nearby work, map, planner and outcome panels. Put map dismissal in a sticky heading; use one outer planner scroll region for long section lists.
- Provide 44px minimum buttons/disclosures and coarse-pointer work markers. Wrap navigation/actions; reserve a separate action row above the thumbstick on narrow screens.
- Center short pause menus; keep tall expanded menus reachable from their top.

No gameplay costs, resources, progression or saves changed.

## Browser layout evidence

These are representative **usable CSS content viewports**, including toolbar-height deductions, not device emulation or exact model specifications. Chrome used the compatibility renderer because WebGL was unavailable in this browser environment.

| Layout group | Viewports checked |
|---|---|
| Landscape | 1024×560, 1024×620, 1024×660, 1080×690, 1133×624, 1180×700, 1194×714, 1366×904 |
| Portrait | 744×960, 768×900, 810×960, 820×1060, 834×1074, 1024×1246 |
| Split view | 512×900 |

At all 15 sizes, expanded home/family/supply/work details remained bounded; nudge and hint stayed above bottom controls with no horizontal document overflow. Map and planner opened and closed through visible buttons and stayed within viewport bounds. Expanded pause menu at 1024×560 starts at y20 and scrolls (684px content / 560px viewport), retaining a reachable top. Manual disclosure choices persisted across the resize matrix. Automated game-rule tests remain separate from these rendered UI checks.

## Required native acceptance checks (still open)

1. On physical iPad Safari, repeat landscape and portrait with browser toolbars expanded/collapsed; rotate while home/work are expanded.
2. Request a nudge, read it beyond 12 seconds, dismiss it, and request it again. Expand all details and touch-scroll each panel without dragging the camera. Test thumbstick and action controls with the hint visible.
3. Verify map and planner dismissal, long section lists, expanded pause controls, and an opening outcome. Check carrying mixed materials so action labels wrap.
4. Repeat with native WebGL, safe-area behavior and the on-screen keyboard for planner number inputs. Inspect for occlusion, frame-rate or visual artifacts; compatibility-renderer layout evidence cannot establish these.
5. Include a smaller iPad, a standard 10–11-inch configuration and a large iPad, plus split view where supported. Record iPadOS/Safari version and actual content viewport with results.

Issue #17 remains open for this device evidence; this review does not close the broader platform gate.
