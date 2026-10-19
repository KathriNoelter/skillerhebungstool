import * as XLSX from "xlsx";
import type { Group, MarketDriver } from "../types";

const DEP_LABEL: Record<string, string> = {
  Durable: "Dauerhaft",
  Evolving: "Wandelnd",
  Perishable: "Kurzlebig",
};

const TREND_LABEL: Record<string, string> = {
  Rising: "Steigend",
  Stable: "Stabil",
  Declining: "Sinkend",
};

function stripQuotes(text: string | undefined): string {
  if (!text) return "";
  return text.replace(/^»/, "").replace(/«$/, "").trim();
}

export function exportGroupCatalogExcel(
  group: Group,
  drivers: MarketDriver[],
  selectedRoleIds?: string[],
): void {
  const rolesToExport = selectedRoleIds
    ? group.roles.filter((r) => selectedRoleIds.includes(r.id))
    : group.roles;

  const wb = XLSX.utils.book_new();

  // --- Sheet: Markttreiber ---
  const driverRows = drivers.map((d) => ({
    Titel: d.title,
    Zeithorizont: d.horizon,
    Beschreibung: d.description,
    "Betroffene Skills": d.affectedSkillNames.join(", "),
  }));
  const driversSheet = XLSX.utils.json_to_sheet(
    driverRows.length > 0
      ? driverRows
      : [{ Titel: "", Zeithorizont: "", Beschreibung: "", "Betroffene Skills": "" }],
  );
  setColumnWidths(driversSheet, [40, 20, 80, 60]);
  XLSX.utils.book_append_sheet(wb, driversSheet, "Markttreiber");

  // --- One sheet per role ---
  for (const role of rolesToExport) {
    const rows: Record<string, string>[] = [];
    for (const cat of role.categories) {
      for (const skill of cat.skills) {
        rows.push({
          Skill: skill.name,
          Dimension: cat.name,
          Abhängigkeit: DEP_LABEL[skill.dep] ?? skill.dep,
          Zielniveau: skill.targetLevel != null ? String(skill.targetLevel) : "",
          Schlüsselkompetenz: skill.keySkill ? "Ja" : "",
          Trend: skill.trend ? (TREND_LABEL[skill.trend] ?? skill.trend) : "",
          Beschreibung: stripQuotes(skill.description),
          "Anker Stufe 1": skill.anchors?.[1] ?? "",
          "Anker Stufe 2": skill.anchors?.[2] ?? "",
          "Anker Stufe 3": skill.anchors?.[3] ?? "",
          "Anker Stufe 4": skill.anchors?.[4] ?? "",
          "Anker Stufe 5": skill.anchors?.[5] ?? "",
        });
      }
    }
    const sheet = XLSX.utils.json_to_sheet(rows.length > 0 ? rows : [{}]);
    setColumnWidths(sheet, [35, 30, 15, 12, 18, 12, 60, 50, 50, 50, 50, 50]);
    XLSX.utils.book_append_sheet(wb, sheet, toSheetName(role.name, wb.SheetNames));
  }

  XLSX.writeFile(wb, `Skill-Katalog_${group.name.replace(/\s+/g, "-")}.xlsx`);
}

/**
 * Excel-taugliches Tabellenblatt-Label: verbotene Zeichen (: \ / ? * [ ])
 * werden durch "-" ersetzt (z. B. "UX/UI" → "UX-UI"), max. 31 Zeichen,
 * eindeutig innerhalb der Mappe.
 */
function toSheetName(name: string, existing: string[]): string {
  const base = name.replace(/[:\\/?*[\]]/g, "-").replace(/^'+|'+$/g, "").trim().slice(0, 31) || "Rolle";
  let candidate = base;
  for (let i = 2; existing.includes(candidate); i++) {
    const suffix = ` (${i})`;
    candidate = base.slice(0, 31 - suffix.length) + suffix;
  }
  return candidate;
}

function setColumnWidths(sheet: XLSX.WorkSheet, widths: number[]): void {
  sheet["!cols"] = widths.map((w) => ({ wch: w }));
}
