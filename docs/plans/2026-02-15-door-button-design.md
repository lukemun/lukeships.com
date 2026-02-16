# /door — Brutalist Mechanical Button

## Summary

A standalone page at `/door` featuring a single brutalist button labeled "LET ME IN" centered on a white page. The button simulates a mechanical keyboard keypress using CSS-only depth animation. No click behavior yet — the interaction itself is the experience.

## Page Layout

- Full viewport height (`min-h-screen`), white background
- Button dead center via flexbox
- No nav, no footer — just the button in white space

## Button Design

- **Label:** "LET ME IN", uppercase, JetBrains Mono (monospace), bold, black text
- **Shape:** Rectangular, no border-radius. Padding ~16px vertical, ~48px horizontal. 2px solid black border.
- **Depth:** Solid black `box-shadow` offset 8px down, no blur — hard-edged brutalist keycap

## Interaction States

| State   | translateY | box-shadow offset | Transition                                      |
|---------|-----------|-------------------|------------------------------------------------|
| Rest    | 0         | 0 8px 0 0 black   | —                                              |
| Hover   | 4px       | 0 4px 0 0 black   | 150ms ease-in                                  |
| Active  | 8px       | 0 0px 0 0 black   | 50ms ease-in (fast down-stroke)                |
| Release | 0         | 0 8px 0 0 black   | 200ms cubic-bezier(0.34, 1.56, 0.64, 1) (spring) |

The spring cubic-bezier overshoots slightly on release for mechanical bounce-back feel.

## Technical Approach

- **Approach:** CSS-only with box-shadow depth (no JS animation library)
- **File:** `src/app/door/page.tsx` — single client component
- **Styling:** Tailwind classes + arbitrary values for shadow/translate
- **Dependencies:** None additional
