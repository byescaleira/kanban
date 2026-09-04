# Design

This app is printed, not rendered. Everything below falls out of one
decision — a **two-ink screenprint: safety orange and graphite on bone
paper** — and if a change cannot be explained by how a press actually
works, it does not belong here.

Every rule carries its reason. That is not decoration: a rule stripped
of its reason gets undone by the next person who finds it inconvenient.

> **Fork note.** This is a fork of [kanbn/kan](https://github.com/kanbn/kan)
> (AGPL-3.0). The design system here is byescaleira's and diverges
> deliberately from upstream. Every retokenised call site is a potential
> merge conflict on `git pull upstream`. That cost was accepted knowingly.

---

## Where things live

| File                              | What it holds                                                   |
| --------------------------------- | --------------------------------------------------------------- |
| `apps/web/src/styles/tokens.css`  | The two stocks. Source of truth for colour.                     |
| `apps/web/src/styles/press.css`   | Paper grain, the motion families, the printed sky.              |
| `apps/web/src/styles/globals.css` | Type ramp, plate, section furniture, controls.                  |
| `tooling/tailwind/web.ts`         | The press expressed as Tailwind: ladders, ramp, radii, weights. |
| `tooling/design/contrast.mjs`     | The contrast gate. Run it before shipping colour.               |

```bash
node tooling/design/contrast.mjs
```

---

## Colour — three roles, never mixed

**Ground** is what you paint on. **Ink** is what you read. **Accent** is
what matters right now.

| Token            | Bone paper | Black paper             |
| ---------------- | ---------- | ----------------------- |
| `--background`   | `#f3efe5`  | `#0b0a09`               |
| `--surface`      | `#e6e0d2`  | `#17150f`               |
| `--card`         | `#fbf8f1`  | `#252019`               |
| `--foreground`   | `#26241f`  | `#eae4d6`               |
| `--ink-2`        | `#4e4a41`  | `#ada595`               |
| `--ink-3`        | `#5f5a50`  | `#918a7c`               |
| `--hairline`     | `#4e4a41`  | `rgba(234,228,214,.34)` |
| `--accent-solid` | `#ff6b00`  | `#ff6b00`               |
| `--accent-ink`   | `#ad3e00`  | `#ff8a3d`               |
| `--on-accent`    | `#26241f`  | `#26241f`               |

Measured worst case across all three grounds: foreground 11.78 / 12.75,
ink-2 6.71 / 6.61, ink-3 5.21 / 4.72, accent-ink 4.60 / 6.89, on-accent
on accent-solid 5.43 in both.

### Two rules that are not preferences

**Ink on the accent is near-black, never white.** White on `#ff6b00`
measures **2.86:1** — under AA. Darkening the orange enough to carry
white takes it to roughly `#c75200`, which is brown and no longer the
brand.

**The vibrancy lives in fills, not in type.** No orange bright enough to
feel vibrant clears 4.5:1 as text on a light ground — `#ff6b00` measures
**2.49:1** on the paper. That is physics, not caution. Orange type steps
down to `--accent-ink`; the saturated orange goes into rules, folios,
bands and buttons. A screenprint floods ink; it does not set coloured
type.

**`--card` must never equal `--surface`.** Dark separates plates by fill
lightness. Light cannot, so it separates by fill plus a shadow that is
`none` in dark. Setting them equal dissolves every plate.

### Danger — the one concession

`--danger: #8f2417`, with `--on-danger: #f3efe5` reversed out of it.

A destructive red is a **third ink this press does not carry**, so it is
spent as sparingly as a third plate would be: destructive confirmation
only. It could not follow the accent's pattern — the accent works as a
bright fill under near-black ink because `#ff6b00` is light enough
(5.43:1), and every warm red is darker; the brightest that still reads
as red rather than orange carries near-black at only 3.8:1. So danger
takes the other move this system already owns, the plate band, and
prints as a **solid dark field with the paper reversed out of it**
(7.52:1). The same field works on black paper, because its ink is the
paper and not the page. As type it uses `--danger-ink`, which lifts to
`#ff8a75` on the dark stock.

---

## The two ladders

The app was built on two neutral grey scales (`light-*` / `dark-*`).
They are **repointed** at the two stocks rather than rewritten at ~400
call sites, so every existing `text-light-900 dark:text-dark-900`
resolves to byescaleira ink with no edit — and the pairs that were
failing AA stop failing.

```
50–400    grounds  (paper)
500–600   rules    (dividers)
700–1000  ink      (text)
```

The jump at 600→700 is the ground/ink boundary. It is real, and it is
where the old app already drew it.

**Steps 700, 800 and 900 all resolve to `--ink-3`.** On bone paper there
is no readable step lighter than `--ink-3` (`#6e6960` measures 3.92 on
the surface), so a three-rung ladder of muted greys was always a
fiction. Three inks is the whole system.

**Write new code against the semantic tokens**, not the numbered rungs:
`bg-background`, `bg-surface`, `bg-panel`, `text-foreground`,
`text-ink-2`, `text-ink-3`, `border-hairline`, `bg-accent`,
`text-accent-ink`, `text-on-accent`.

---

## Typography

System stack, **no webfonts** — the print language lives in the layout,
the rules and the ink, not in the type.

**Weights 400, 500, 600 — nothing heavier.** 600 is the ceiling for
headlines. The Tailwind `fontWeight` scale is capped at the source, so
`font-bold` _is_ 600: a utility outranks any base-layer override, so it
has to be 600 rather than be corrected afterwards.

The ramp classes (`t-display`, `t-section`, `t-sub`, `t-card`, `t-lead`,
`t-body`, `t-small`, `t-caption`, `t-eyebrow`) carry **size, weight and
tracking — never colour**. Baking a colour into a ramp class means it
can never be overridden at the use site.

The larger the type, the tighter the tracking. **Body text is never
tracked.** These values are tuned for SF Pro; swapping the family
without retuning leaves the new face cramped or loose.

Uppercase survives in exactly two places, both labels rather than
headings: `.label-mono` and the plate's title band. Both take
**positive** tracking. Uppercase headings with wide tracking are
forbidden.

---

## Shape and material

| Radius                 | Use                    |
| ---------------------- | ---------------------- |
| 8px (`rounded-sm`)     | Icon tiles, chips      |
| 12px (`rounded-md`)    | Inner surfaces, insets |
| 18px (`rounded-lg`)    | Plates — the default   |
| 22px (`rounded-xl`)    | Large panels           |
| 28 / 34px              | Oversized              |
| 980px (`rounded-full`) | Every control          |

Curves belong here — the subject is space, and space is capsules and
domes. What makes a system read as a generic app is not the radius: it
is a generous radius **plus** glass **plus** a shadow **plus** a hover
lift. With a 2px ink border and no shadow, the same curve reads as a
printed label.

**Borders are 2px ink, not 1px grey.** A hairline is a rule on a page.
The `borderWidth` and `ringWidth` defaults are both 2px. A ring is a
rule drawn as a shadow — it takes no space, which is why inputs use one.

**No shadows.** Every `shadow-*` utility resolves to `none`. The one
exception is `shadow-plate` (`--card-shadow`), which exists only because
the light build cannot separate plates by fill alone; it is `none` on
black paper.

**Paper grain** covers the page: static SVG turbulence, no image file,
no request. `multiply` on bone, `screen` on black. It sits at `z-index:
1`, below the app's modals and dropdowns — grain painted over an open
modal reads as dirt on the lens, not as tooth in the paper.

---

## Structure

Retokenising an app-shaped layout produces a repainted app. The layout
itself has to change.

- **Masthead, not hero.** Type is the structure, not a headline sitting
  on one. Ranged left, against the same edge as everything below it.
- **Running head** above each section: the label and the folio on one
  rule (`.running-head`). Numbering is honest — it is pagination, not
  decoration, so only number things that are genuinely a sequence.
- **One heavy rule per page** (`.rule-heavy`, 6px, accent), printed with
  `.o-squeegee` rather than drawn. A second one halves the weight of
  both.
- **Colophon** at the foot (`.colophon`): label/value pairs divided by
  rules. Not a card, never boxed.
- **Plates, not cards.** Nothing floats, blurs, or casts a shadow. Print
  has no depth of field.
- **One dominant thing per screen.**

---

## The plate

The one container. Two fields, not one: a solid title band with the
heading reversed out of it, and a body below on the paper. The band does
the work the heading was doing anyway, so the structure costs no
decoration — which is the answer to "our cards look plain". A box with a
line around it is not a design; a titled plate is.

```html
<div
  class="misreg overflow-hidden rounded-lg border-2 border-hairline bg-panel shadow-plate"
>
  <div class="plate-band">
    <!-- add plate-band--tinted for THE one -->
    <h3 class="plate-band-title">Teams</h3>
    <span class="plate-index">Most popular</span>
    <!-- a status, a year, a number: TRUE -->
  </div>
  <div class="plate-body">…</div>
</div>
```

The **tinted band** is reserved for the one plate on a page that
matters. See `Features.tsx` for the reference implementation.

The **index** must be true: a plate number, a status, a year, a sector.
Never a decorative label.

An **untitled** plate is legitimate where a heading already lives inside
the content — drop the band, keep the border.

**Migration note:** do not add the band everywhere at once. Convert one
section, look at it, then continue. Padding moves into `.plate-body`, so
call sites that set their own `p-6` will double up.

---

## Motion — three families

Anything that fits none does not ship. One rule outranks all three:
**content is never invisible by default.** Every reveal here is pure CSS
with `both` fill, so it runs whether or not JS ever boots.

- **ORBITAL** — continuous, ambient, 15–90s, linear. Nothing orbital
  sits on top of text; **no cycle under 5s**. The only orbital installed
  is the accent ring behind the GitHub badge (`border-spin`, 46s — it
  was 4s, which read as a spinner rather than as atmosphere).
- **REVEAL** — once on entry, 0.7s, 70ms stagger, in reading order
  (`.o-stagger`). Never replays.
- **RESPONSE** — on interaction, borrowed from the press: `.misreg`
  (the plates slip out of register on hover — the ink moves, never the
  block) and `.o-squeegee` (one pass, left to right; a heavy rule is not
  drawn, it is printed).

Three easing curves, no others: `--ease-default` for reveals and hovers,
`--ease-colour` for colour and opacity **only, never position**, and
`linear` for orbits. **Animate transform and opacity only.**

`prefers-reduced-motion` is handled first in `press.css` and is the only
part that is not optional.

**The printed sky** (`.sky`, `.sky-scatter`, `.sky-disc`) is the
halftone dot at two pitches. A press builds tone from dots and a night
sky is dots, so it is the one mark that is both space and print. Reach
for it before reaching for anything that glows.

---

## The name and the mark

The naming rule is: **modules take Apollo navigation stars, products
keep market names, and anything nobody imports or installs gets no name
at all.**

This is a product, so it gets a market name, not a codename: it is
**byescaleira Kanban**, shown as `Kanban` in the header and
`… | byescaleira` in page titles. The house carries the
distinctiveness; the product carries the category — the pattern behind
"Apple Notes". A market name is generic by construction and hard to
register, and that is the trade the rule accepts.

The name lives in exactly one component, `Wordmark.tsx`, so the mark
lands in one file rather than in the eight headers that used to
hardcode it.

**The name is set in ink, never in orange.** No orange bright enough to
feel vibrant clears 4.5:1 as type on bone paper, so the accent goes
where a press actually floods it — into a fill. Here that fill is the
mark.

The current mark is a filled plate with two fields, in `Wordmark.tsx`
and `public/icon.svg`. It is a placeholder for a drawn mark, and it is
deliberately three shapes and one closed silhouette, because a Tier-2
mark has to survive **32px, one colour and a circular crop**. The two
fields are different heights on purpose: two matched shapes side by
side read as eyes.

`.design/mark-prompt.md` carries the generation prompt for the real
mark, and the five reduction tests any candidate has to pass.

**What stays kan.bn on purpose:** `docs.kan.bn`, `support@kan.bn`,
`github.com/kanbn/kan`, the `kan.bn/{workspace}` URL preview, and the
"Powered by kan.bn" badge. Those are live addresses and upstream
attribution — renaming the label while the link still points at the
upstream service would be a lie, not a rebrand.

---

## Voice

Editorial, first person, English.

- **Explain the why, not just the what.** Editorial only pays off if
  there is an argument.
- **No hyperbole.** "Blazing fast", "game-changing", "revolutionary" —
  none survives a positioning built on precision. A real number, or
  nothing.
- **One piece, one idea.**
- Never lorem ipsum. Where a real fact is missing, bracket it as
  `[YOUR PRICE]` rather than inventing one.

---

## Do not

- Uppercase headings with wide tracking, or weights above 600
- White text or glyphs on an orange fill
- Colour baked into a type-ramp class
- `--card` equal to `--surface`
- Glass, blur, or a drop shadow on a plate
- Emoji as icons — inline SVG on a 16/20/24 grid, stroke 1.8–1.9
- Fixed colour values that cannot follow the theme
- Any animation content depends on to be visible
- A motion effect a screenprint could not produce
- Gradient backgrounds, rounded cards with a left accent border,
  Inter/Roboto — the tells of a generic system

## Before shipping

- [ ] `node tooling/design/contrast.mjs` passes
- [ ] Every ink clears 4.5:1 on background, surface AND card, both
      builds (3:1 only at 24px+, or 18.66px bold)
- [ ] Nothing white sits on the accent
- [ ] No colour defined only inside a media query or theme block
- [ ] `body` sets an explicit background token
- [ ] Animations are transform/opacity only and resolve to nothing under
      `prefers-reduced-motion`
- [ ] No content depends on JS to become visible
- [ ] Touch targets 44px minimum on coarse pointers
- [ ] The page reads at 375px: no broken headline wraps, no page-level
      horizontal scroll (wide tables scroll inside their own container)
- [ ] Nothing ships that nothing imports
