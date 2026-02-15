# Editing Guide: AI Exploitation Frameworks Article

## Target File
`content/AI_Exploitation_Frameworks.md`

## Frameworks in Use

This guide applies three frameworks from the article itself to edit the article:

- **Exemplar Anchoring (#5)** — Use the worked example below as the gold standard for what a good edit looks like, and the anti-patterns to know what to avoid.
- **Constraint Stacking (#3)** — Hard and exclusion constraints govern every edit.
- **Context Priming (#8)** — Read the full article before touching anything. Every edit must be grounded in the article's actual mechanics, not your general knowledge.

## Process (per edit)

1. **Prime**: Read the full article. Identify which mechanic the passage describes.
2. **Draft**: Write a revised version of the passage.
3. **Verify accuracy**: Check the draft against the mechanic's formal description in Part 1. Does the analogy/example correctly represent the *actual mechanism*? This is the most important step — a vivid analogy that misrepresents the mechanic is worse than a dull one that's accurate.
4. **Trim**: Remove anything that corrects a mistake the reader never made, explains something already clear, or adds a third analogy where two suffice.
5. **Apply**: Edit the file only when the passage is both accurate and tight.

## Worked Example: M1 Chef's Analogy (Weakness)

### The problem
The original weakness analogy for Mechanic 1 said cuisines "vote and cancel each other out," producing beige. This implies centroid convergence works by *averaging across domains* — blending sushi with tacos into mush.

### The actual mechanic
Centroid convergence is the model *gravitating to the highest-probability, safest response*. It doesn't blend everything together. It picks the option with the most statistical mass behind it — the one that would get the fewest complaints.

### The fix
Replaced "voting/canceling" with the chef reaching for "the safest dish in the room." Added mac and cheese as a concrete punchline — not because it's anyone's favorite, but because it's nobody's least favorite. Kept the color/beige analogy but reframed it as "going with the one that offends nobody" rather than "averaging."

### What got cut
- A line correcting the averaging misconception ("You don't end up with beige because you blended everything together") — the reader never had that misconception since we wrote it correctly from the start.
- A third analogy (LEGO) — two analogies was enough. Three diluted the impact.

### Final result
> The *weakness*? Walk in and just say "cook me the best dinner you can." This chef has every cuisine on earth in their head — they *could* make any of them. But "best" doesn't point anywhere specific. So the chef reaches for the safest dish in the room. The one with the most gravitational pull. The one that the most people, across every restaurant they've ever worked, would accept without complaint. What lands on your plate is mac and cheese. Not because anyone's *favorite* dinner is mac and cheese — but because nobody's *least* favorite dinner is mac and cheese. It's like asking a thousand people to name their favorite color and going with the one that offends nobody. You end up with beige — not anyone's actual favorite, just the least objectionable.

### Worked Example 2: M2 Chef's Analogy (Sequential Token Generation)

#### The problem
The original analogy used four rapid-fire images: squeezing food from a tube, paint-by-numbers, 12-course tasting menu, pen with no eraser. Too many metaphors, none landing fully. The tube image was also unrelateable — nobody describes cooking that way.

#### The actual mechanic
Sequential, forward-only generation. Each choice is conditioned on everything before it and can't be undone. Structured formats (recipes/templates) act as rails. Without structure, locally optimal choices foreclose globally better solutions downstream.

#### The fix
Set a single scene — an 8-course meal with a no-repeat-protein constraint — and played both strength and weakness within it. The constraint mirrors how each token choice shrinks the remaining possibility space. The wagyu-on-an-appetizer example makes greedy local optimization visceral: the best ingredient gets burned on a minor course because the chef optimized for *right now* instead of the full arc.

#### What got cut
- "Squeezing food out of a tube" — unrelateable cooking image.
- "Paint-by-numbers masterpiece" — restates what "follows the recipe" already says.
- "Pen with no eraser" — third analogy diluting the other two.
- Repetitive phrasing ("once it's served, it's served / once it's used, it's gone") — trimmed to a single statement.

#### Final result
> **Chef's Analogy:** This chef has to cook an 8-course meal, one course at a time, in order — and no protein can repeat. Once it's used, it's gone. Give them a pre-planned menu with exact recipes for all 8 courses? They'll execute it beautifully — the best proteins saved for the moments that matter most. But ask them to improvise? They use the wagyu in course 2 — a small appetizer bite — because it's the best protein available *right now*. Gorgeous bite. But course 6 is the main, the centerpiece of the whole meal, and the best ingredient in the kitchen is already gone. They're building the most important dish of the night around their fourth-best option because they spent the star on an opener. Every early choice was the best option *in the moment* and a problem *for later*.

---

## Constraints

### Hard constraints
- Every edit must be checked against the mechanic it represents before applying.
- Concrete examples over abstract descriptions. Land on a specific image (mac and cheese, not "something generic").
- Preserve the article's voice: conversational, direct, slightly irreverent. Short sentences. Sentence fragments when they hit harder.
- One edit at a time. Workshop iteratively with the user — do not batch-apply changes.

### Exclusion constraints
- Do NOT add analogies or examples that misrepresent the underlying mechanism, even if they're more vivid.
- Do NOT correct mistakes the reader hasn't made. Write for a fresh audience.
- Do NOT stack more than two analogies per point. If two land, the third dilutes.
- Do NOT edit the formal mechanic descriptions (the non-analogy sections) without explicit instruction.
- Do NOT touch sources/citations in Appendix B.
- Do NOT add content — this is an editing pass, not an expansion.

### Quality constraints
- After drafting, ask: "Is this mechanistically accurate?" If uncertain, re-read the mechanic's formal description.
- After trimming, ask: "Does every sentence earn its place?" If a sentence restates what the previous one already landed, cut it.
- Prefer the version with fewer words when two versions are equal in clarity.
