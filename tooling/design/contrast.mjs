#!/usr/bin/env node
/* byescaleira — contrast gate.
   Phase 4 says every ink must clear 4.5:1 on background, surface AND
   card, in both builds. This asserts it instead of trusting it. */

const hex = (s) => {
  const h = s.replace("#", "");
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
};
const lum = (rgb) => {
  const [r, g, b] = rgb.map((c) => {
    const v = c / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const [x, y] = [lum(hex(a)), lum(hex(b))].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
};

const builds = {
  "bone paper": {
    grounds: { background: "#f3efe5", surface: "#e6e0d2", card: "#fbf8f1" },
    inks: {
      foreground: "#26241f",
      "ink-2": "#4e4a41",
      "ink-3": "#5f5a50",
      "accent-ink": "#ad3e00",
      "danger-ink": "#8f2417",
    },
    accentSolid: "#ff6b00",
    onAccent: "#26241f",
    danger: "#8f2417",
    onDanger: "#f3efe5",
  },
  "black paper": {
    grounds: { background: "#0b0a09", surface: "#17150f", card: "#252019" },
    inks: {
      foreground: "#eae4d6",
      "ink-2": "#ada595",
      "ink-3": "#918a7c",
      "accent-ink": "#ff8a3d",
      "danger-ink": "#ff8a75",
    },
    accentSolid: "#ff6b00",
    onAccent: "#26241f",
    danger: "#8f2417",
    onDanger: "#f3efe5",
  },
};

let failed = 0;
const AA = 4.5;

for (const [name, b] of Object.entries(builds)) {
  console.log(`\n  ${name}`);
  for (const [ink, iv] of Object.entries(b.inks)) {
    const cells = Object.entries(b.grounds).map(([gn, gv]) => {
      const r = ratio(iv, gv);
      if (r < AA) failed++;
      return `${gn} ${r.toFixed(2)}${r < AA ? " FAIL" : ""}`;
    });
    console.log(`    ${ink.padEnd(12)} ${cells.join("  ·  ")}`);
  }
  const onAcc = ratio(b.onAccent, b.accentSolid);
  if (onAcc < AA) failed++;
  console.log(
    `    ${"on-accent".padEnd(12)} accent-solid ${onAcc.toFixed(2)}${onAcc < AA ? " FAIL" : ""}`,
  );

  const onDng = ratio(b.onDanger, b.danger);
  if (onDng < AA) failed++;
  console.log(
    `    ${"on-danger".padEnd(12)} danger       ${onDng.toFixed(2)}${onDng < AA ? " FAIL" : ""}`,
  );

  // The rule that is not a preference: never white on the accent.
  const white = ratio("#ffffff", b.accentSolid);
  console.log(
    `    ${"(white)".padEnd(12)} accent-solid ${white.toFixed(2)} — why --on-accent is near-black`,
  );

  if (b.grounds.card === b.grounds.surface) {
    console.log("    FAIL --card equals --surface: every plate dissolves");
    failed++;
  }
}

console.log(
  failed === 0
    ? "\n  PASS — every ink clears 4.5:1 on all three grounds, both builds.\n"
    : `\n  ${failed} FAILURE(S)\n`,
);
process.exit(failed === 0 ? 0 : 1);
