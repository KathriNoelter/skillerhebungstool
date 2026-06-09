#!/usr/bin/env tsx
/**
 * Exports the SW role catalogs from swCatalogs.ts to JSON files in
 * Vorgaben/Kataloge/. Run after editing swCatalogs.ts directly so the
 * JSON files stay in sync as human-readable reference documents.
 *
 * Run: npx tsx scripts/export-catalogs.ts
 *
 * Note: market drivers and the swGroup definition live only in swCatalogs.ts
 * and are NOT written to the per-role JSON files — that is intentional.
 */

import { writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { swGroup } from "../src/data/swCatalogs";


const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = resolve(__dirname, "..", "Vorgaben", "Kataloge");

// Derive filename from role name
function toFilename(name: string): string {
  return name.replace(/\s+/g, "-") + ".json";
}

for (const role of swGroup.roles) {
  const filename = toFilename(role.name);
  // Strip runtime-only fields before writing
  const clean = {
    id: role.id,
    name: role.name,
    description: role.description,
    categories: role.categories.map((cat) => ({
      name: cat.name,
      skills: cat.skills.map(({ sourceLabel: _sl, disabled: _d, ...rest }) => rest),
    })),
  };
  const path = resolve(OUT_DIR, filename);
  writeFileSync(path, JSON.stringify(clean, null, 2) + "\n", "utf-8");
  const skillCount = clean.categories.reduce((n, c) => n + c.skills.length, 0);
  console.log(`Written: ${filename}  (${clean.categories.length} categories, ${skillCount} skills)`);
}

// Export market drivers
if (swGroup.defaultDrivers && swGroup.defaultDrivers.length > 0) {
  const driversPath = resolve(OUT_DIR, "Markttreiber.json");
  writeFileSync(driversPath, JSON.stringify(swGroup.defaultDrivers, null, 2) + "\n", "utf-8");
  console.log(`Written: Markttreiber.json  (${swGroup.defaultDrivers.length} Treiber)`);
}

console.log(`\nDone — ${swGroup.roles.length} Rollen + Markttreiber aktualisiert in Vorgaben/Kataloge/`);
