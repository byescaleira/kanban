/* THE PRINTED SKY.

   This was a dot grid filled with a hardcoded #3e3e3e — a fixed dark
   value on a background that flips with the theme, so it printed as
   near-ink specks on bone paper and as invisible dots on black. The
   dots themselves were right: a press builds tone from dots, and the
   halftone dot is the one mark that is both space and print. Only the
   ink was wrong.

   Two pitches, both in --ink-3, both masked so the field opens toward
   the light rather than tiling edge to edge. Nothing here glows. */
const PatternedBackground = () => (
  <div className="sky" aria-hidden="true">
    <div className="sky-scatter" />
    <div className="sky-disc" />
  </div>
);

export default PatternedBackground;
