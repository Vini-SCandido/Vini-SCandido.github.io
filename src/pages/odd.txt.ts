// src/pages/api/random-character.txt.ts
import type { APIRoute } from "astro";

// Roll 3d6
function roll3d6(): number {
  return Math.floor(Math.random() * 6 + 1) +
         Math.floor(Math.random() * 6 + 1) +
         Math.floor(Math.random() * 6 + 1);
}

// B/X-style modifier: +1 for 15+, -1 for 6 or less, else +0
function bxModifier(score: number): string {
  if (score >= 15) return "+1";
  if (score <= 6) return "-1";
  return "+0";
}

export const GET: APIRoute = async () => {
  const races = ["Human", "Elf", "Dwarf", "Halfling"];
  const classes = ["Fighter", "Cleric", "Magic-User", "Thief"];

  const race = races[Math.floor(Math.random() * races.length)];
  const charClass = classes[Math.floor(Math.random() * classes.length)];

  const STR = roll3d6();
  const DEX = roll3d6();
  const CON = roll3d6();
  const INT = roll3d6();
  const WIS = roll3d6();
  const CHA = roll3d6();

  const output = `
Race:  ${race}
Class: ${charClass}
Level: 1

STR: ${STR} (${bxModifier(STR)})
DEX: ${DEX} (${bxModifier(DEX)})
CON: ${CON} (${bxModifier(CON)})
INT: ${INT} (${bxModifier(INT)})
WIS: ${WIS} (${bxModifier(WIS)})
CHA: ${CHA} (${bxModifier(CHA)})
`.trim();

  return new Response(output, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};