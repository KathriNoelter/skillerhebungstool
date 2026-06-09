#!/usr/bin/env node
/**
 * Converts JSON catalogs (German field names) into a TypeScript source file
 * that exports a Group for direct inclusion in groups.ts.
 *
 * Run: node scripts/convert-catalogs.mjs
 */

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const CATALOG_DIR = resolve(ROOT, "Vorgaben/Kataloge");
const OUT = resolve(ROOT, "src/data/swCatalogs.ts");

const CATALOGS = [
  "Software-Entwicklung-Core.json",
  "Frontend-Entwickler.json",
  "Backend-Entwickler.json",
  "Full-Stack-Entwickler.json",
  "Software-Architekt.json",
  "DevOps-Engineer.json",
  "Tech-Lead.json",
];

// Map German JSON field name → internal TypeScript field name
function mapField(k) {
  return (
    { haltbarkeit: "dep", steckbrief: "description", zielwert: "targetLevel",
      schluessel: "keySkill", trendbegruendung: "trendgrund", zuletzt: "lastModified",
      anker: "anchors" }[k] ?? k
  );
}

function escape(s) {
  return s.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\${/g, "\\${");
}

function serializeSkill(s) {
  const lines = [];
  const add = (k, v) => lines.push(`      ${k}: ${v}`);

  add("name", `\`${escape(s.name)}\``);

  const dep = s.dep ?? s.haltbarkeit;
  add("dep", `"${dep}"`);

  const desc = s.description ?? s.steckbrief;
  if (desc) add("description", `\`${escape(desc)}\``);

  const target = s.targetLevel ?? s.zielwert;
  if (target != null) add("targetLevel", String(target));

  if (s.trend) add("trend", `"${s.trend}"`);

  const trendgrund = s.trendgrund ?? s.trendbegruendung;
  if (trendgrund) add("trendgrund", `\`${escape(trendgrund)}\``);

  const keySkill = s.keySkill ?? s.schluessel;
  if (keySkill != null) add("keySkill", String(keySkill));

  if (s.bewertungsmodell) add("bewertungsmodell", `"${s.bewertungsmodell}"`);

  const lastMod = s.lastModified ?? s.zuletzt;
  if (lastMod) add("lastModified", `"${lastMod}"`);

  const anchors = s.anchors ?? s.anker;
  if (anchors && typeof anchors === "object") {
    const anchorLines = [];
    for (let i = 1; i <= 5; i++) {
      const v = anchors[String(i)] ?? anchors[i];
      if (v) anchorLines.push(`        ${i}: \`${escape(v)}\``);
    }
    if (anchorLines.length) {
      add("anchors", `{\n${anchorLines.join(",\n")},\n      }`);
    }
  }

  return `    {\n${lines.join(",\n")},\n    }`;
}

function serializeCategory(cat) {
  const skills = cat.skills.map(serializeSkill).join(",\n");
  return `  {\n    name: \`${escape(cat.name)}\`,\n    skills: [\n${skills},\n    ],\n  }`;
}

function serializeRole(role, varName) {
  const cats = role.categories.map(serializeCategory).join(",\n");
  const id = role.id
    ? `"${role.id}"`
    : `"sw-${role.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}"`;
  return (
    `const ${varName}: Role = {\n` +
    `  id: ${id},\n` +
    `  name: \`${escape(role.name)}\`,\n` +
    `  description: \`${escape(role.description ?? "")}\`,\n` +
    `  categories: [\n${cats},\n  ],\n` +
    `};\n`
  );
}

const varNames = CATALOGS.map((f) => {
  const parts = f.replace(".json", "").split("-");
  return parts
    .map((p, i) =>
      i === 0 ? p.toLowerCase() : p.charAt(0).toUpperCase() + p.slice(1).toLowerCase()
    )
    .join("");
});

const roles = CATALOGS.map((f, i) => {
  const raw = JSON.parse(readFileSync(resolve(CATALOG_DIR, f), "utf-8"));
  return serializeRole(raw, varNames[i]);
});

const output =
  `// AUTO-GENERATED — do not edit manually.\n` +
  `// Source: Vorgaben/Kataloge/*.json — regenerate with: node scripts/convert-catalogs.mjs\n\n` +
  `import type { Group, Role } from "../types";\n\n` +
  roles.join("\n") +
  `\nexport const swGroup: Group = {\n` +
  `  id: "software-entwicklung",\n` +
  `  name: "Software-Entwicklung",\n` +
  `  description: "Core-Kompetenzen und Spezialisierungskataloge fuer alle Software-Entwicklungsrollen (Option B).",\n` +
  `  roles: [${varNames.join(", ")}],\n` +
  `};\n`;

writeFileSync(OUT, output, "utf-8");
console.log(`Written: ${OUT}`);
console.log(`Roles:   ${varNames.join(", ")}`);
