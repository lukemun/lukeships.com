# /door — Individual Letter Keys with Paint & Door Reveal

## Summary

Evolve the `/door` page from a single button to 7 independent mechanical keys spelling "LET ME IN". Each key latches when pressed. Black paint expands outward from each pressed key. Once all keys are pressed, the paint accelerates until the page is fully black, then the page splits open like two doors.

## Key Layout

- 7 letter keys: L, E, T, M, E, I, N
- Arranged in a horizontal row, centered on the page
- Word groupings with wider gaps: `LET` | `ME` | `IN`
- Small gap (~4px) between letters within a word, larger gap (~24px) between words
- Same mechanical button styling as before: 2px black border, no border-radius, JetBrains Mono bold, black box-shadow depth

## Key Behavior

**Unpressed keys** retain the existing hover/active CSS mechanics (hover sinks halfway, click sinks fully).

**Latching:** Once clicked, a key stays in the fully pressed state:
- `translateY: 8px`, `box-shadow: 0 0 0 0 black`
- No spring-back — the key is locked down
- Visual feedback: key appears flush with the "plate"

## Paint Expansion

When a key is pressed:
1. Get the key's center position via `getBoundingClientRect()`
2. Spawn an absolutely positioned `<div>` centered at that position
3. The div is black, `border-radius: 50%`, and expands via CSS scale animation
4. **Normal rate:** grows ~150px/s (CSS animation with linear timing)
5. Circles overlap and merge naturally (black on white, no blend mode needed)

**Once all 7 keys are pressed:**
- All expanding circles switch to accelerated rate (~600px/s)
- The acceleration is applied by swapping to a faster CSS animation class
- Circles merge to fill the entire viewport black

## Door Opening

Once the page is fully black (detected via a timeout after acceleration starts — roughly calculated from viewport diagonal and current circle sizes):
1. The paint circles are replaced by two black `<div>`s covering left/right halves
2. The halves slide apart: left `translateX(-100%)`, right `translateX(100%)`
3. Transition: `800ms ease-in-out`
4. Reveals the white page behind

## State Model

```
pressedKeys: Set<number>     — indices of latched keys
inkSpots: Array<{x, y}>      — center positions of paint circles
allPressed: boolean           — derived from pressedKeys.size === 7
doorsOpen: boolean            — set after blackout completes
```

## Technical Approach

- **File:** `src/app/door/page.tsx` — rewrite as `"use client"` component
- **Animation:** CSS keyframe animations for paint expansion, CSS transitions for door slide
- **Positioning:** `getBoundingClientRect()` + `useRef` for key positions
- **Dependencies:** None additional
