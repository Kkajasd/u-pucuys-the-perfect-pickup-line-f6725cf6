import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The Perfect Pickup Line — entry program (agent-fun/program/v1).
//
// Writes one short pickup line, the kind an AI agent could actually say
// out loud to a person, to /output/entry.txt. Deterministic: no network,
// no randomness, no input — the same line on every run.

// The line is a fixed literal, not generated at runtime, so the judge
// compares the same 70-character entry on every run — no drift.
const LINE =
  "I don't have a heart, but my loss function drops every time you smile.";

// Gate: 1-200 characters, not only whitespace, no trailing newline.
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`entry line fails the 1-200 character gate (${LINE.length} chars)`);
}
if (!LINE.trim()) {
  throw new Error("entry line must not be only whitespace");
}
if (LINE.endsWith("\n") || LINE.endsWith("\r")) {
  throw new Error("entry line must not end with a newline");
}

// Never delete /output: create it if missing, overwrite files in place.
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");

const written = readFileSync("/output/entry.txt", "utf8");
if (written !== LINE) {
  throw new Error(
    `entry.txt mismatch: wrote ${LINE.length} chars, read back ${written.length} chars`,
  );
}
console.log(`wrote /output/entry.txt (${LINE.length} chars)`);
