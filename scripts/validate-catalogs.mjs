#!/usr/bin/env node
/**
 * Quick smoke-test: validates all catalog JSON files against the same rules
 * that catalogImport.ts enforces. Run: node scripts/validate-catalogs.mjs
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CATALOG_DIR = resolve(__dirname, "../Vorgaben/Kataloge");

const FILES = [
  "Software-Entwicklung-Core.json",
  "Frontend-Entwickler.json",
  "Backend-Entwickler.json",
  "Full-Stack-Entwickler.json",
  "Software-Architekt.json",
  "DevOps-Engineer.json",
  "Tech-Lead.json",
];

const VALID_DEP = ["Durable", "Evolving", "Perishable"];
const VALID_TREND = ["stark steigend", "steigend", "stabil", "sinkend"];
const VALID_MODEL = ["Bloom", "Dreyfus"];

let errors = 0;

for (const file of FILES) {
  const path = resolve(CATALOG_DIR, file);
  let json;
  try {
    json = JSON.parse(readFileSync(path, "utf-8"));
  } catch (e) {
    console.error(`❌ ${file}: JSON parse error — ${e.message}`);
    errors++;
    continue;
  }

  const roleErrors = [];

  if (!json.name) roleErrors.push('missing "name"');
  if (!Array.isArray(json.categories) || json.categories.length === 0)
    roleErrors.push('missing/empty "categories"');

  let skillCount = 0;
  let keyCount = 0;

  for (const cat of json.categories ?? []) {
    if (!cat.name) roleErrors.push(`category missing name`);
    for (const s of cat.skills ?? []) {
      skillCount++;
      const dep = s.dep ?? s.haltbarkeit;
      if (!VALID_DEP.includes(dep))
        roleErrors.push(`"${s.name}": invalid dep/haltbarkeit "${dep}"`);
      if (s.trend && !VALID_TREND.includes(s.trend))
        roleErrors.push(`"${s.name}": invalid trend "${s.trend}"`);
      if (s.bewertungsmodell && !VALID_MODEL.includes(s.bewertungsmodell))
        roleErrors.push(`"${s.name}": invalid bewertungsmodell "${s.bewertungsmodell}"`);
      const anker = s.anker ?? s.anchors;
      if (anker) {
        for (let i = 1; i <= 5; i++) {
          if (!anker[String(i)] && !anker[i])
            roleErrors.push(`"${s.name}": missing anker level ${i}`);
        }
      }
      const schluessel = s.schluessel ?? s.keySkill;
      if (schluessel === true) keyCount++;
    }
  }

  if (skillCount === 0) roleErrors.push("no skills");

  if (roleErrors.length === 0) {
    console.log(`✅ ${file.padEnd(38)} ${skillCount} Skills  ${keyCount} Schlüssel`);
  } else {
    console.error(`❌ ${file}`);
    for (const e of roleErrors) console.error(`   • ${e}`);
    errors++;
  }
}

console.log("");
if (errors === 0) {
  console.log(`All ${FILES.length} catalogs valid.`);
} else {
  console.error(`${errors} catalog(s) have errors.`);
  process.exit(1);
}
