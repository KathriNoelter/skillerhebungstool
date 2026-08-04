import * as XLSX from "xlsx";
import type {
  DreyfusLevel,
  MarketDriver,
  Participant,
  SkillCategory,
} from "../types";
import {
  DREYFUS_LABELS_DE,
  BLOOM_LABELS_DE,
  evaluationModelFor,
  stageLabelsFor,
} from "../types";
import { CATALOG_VERSION, CATALOG_UPDATED_AT } from "../data/groups";
import type { SkillAnalysis } from "./analysis";

const META_SHEET = "Metadaten";
const ASSESSMENT_SHEET = "Selbsteinschaetzung";
const NAME_KEY = "Teilnehmer";
const GROUP_KEY = "Gruppe";
const ROLE_KEY = "Rolle";

function sanitizeFilename(name: string): string {
  return name.replace(/[^a-zA-Z0-9_\-]+/g, "_").replace(/^_+|_+$/g, "");
}

function downloadWorkbook(wb: XLSX.WorkBook, filename: string) {
  const buffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 0);
}

/**
 * Builds an assessment template for a single participant and triggers a download.
 * The participant's name is baked into the metadata sheet so the file can be
 * round-tripped on import.
 */
export function exportAssessmentTemplate(
  categories: SkillCategory[],
  participant: Participant,
  departmentName: string,
  groupName: string = "",
) {
  const wb = XLSX.utils.book_new();

  // --- Assessment sheet ---
  // Columns: Kategorie | Skill | Haltbarkeit | Skill-Steckbrief | Zielwert |
  //          Verhaltensanker | Dein Level (1-5) | Hinweis
  const rows: (string | number)[][] = [];
  // Teilnehmer-Vorlage: nur Spalten, die zur Selbsteinschaetzung beitragen.
  // Zielwert / Trend / Trendbegruendung / Bewertungsmodell / Schluessel-
  // kompetenz sind interne Steuerungsfelder und werden bewusst nicht an
  // Teilnehmende ausgeliefert (Reduktion sozialer Erwuenschtheit).
  rows.push([
    "Kategorie",
    "Skill",
    "Haltbarkeit",
    "Skill-Steckbrief",
    "Verhaltensanker je Stufe (modellabhaengig)",
    "Dein Level (1-5)",
    "Hinweis",
    "Zuletzt geaendert",
  ]);
  for (const cat of categories) {
    const activeSkills = cat.skills.filter((s) => !s.disabled);
    if (activeSkills.length === 0) continue;
    // Category header row — spans col A, signals section start with skill count.
    rows.push([`${cat.name} (${activeSkills.length} Skills)`, "", "", "", "", "", "", ""]);
    for (const skill of activeSkills) {
      const model = evaluationModelFor(skill, cat.name);
      const labels = stageLabelsFor(model);
      const anchors = skill.anchors ?? {};
      const anchorText = ([1, 2, 3, 4, 5] as const)
        .filter((l) => anchors[l])
        .map((l) => `${l} (${labels[l]}): ${anchors[l]}`)
        .join("\n");
      rows.push([
        cat.name,
        skill.name,
        skill.dep,
        skill.description ?? "",
        anchorText,
        "",
        "",
        skill.lastModified ?? "",
      ]);
    }
  }
  // Legend block — beide Modelle, da pro Skill unterschiedlich
  rows.push([]);
  rows.push([
    "Skala 1–5 — Stufenbezeichnung haengt vom Bewertungsmodell des Skills ab:",
  ]);
  rows.push([]);
  rows.push(["Dreyfus (Handwerksstufen) — fuer Technisch, Methodisch, Kommunikativ"]);
  for (let l = 1; l <= 5; l++) {
    rows.push([`${l} - ${DREYFUS_LABELS_DE[l as DreyfusLevel]}`]);
  }
  rows.push([]);
  rows.push(["Bloom (Wissensentwicklung) — fuer Fachlich"]);
  for (let l = 1; l <= 5; l++) {
    rows.push([`${l} - ${BLOOM_LABELS_DE[l as DreyfusLevel]}`]);
  }
  rows.push([]);
  rows.push(["Hinweis", "Diese Auswertung ist qualitative Orientierung — keine statistisch belastbare Messung."]);

  const ws = XLSX.utils.aoa_to_sheet(rows);
  ws["!cols"] = [
    { wch: 26 },
    { wch: 36 },
    { wch: 12 },
    { wch: 50 },
    { wch: 60 },
    { wch: 18 },
    { wch: 30 },
    { wch: 18 },
  ];

  // Data validation (dropdown) for the "Dein Level" column.
  // xlsx community build does not support data-validation natively;
  // we ship the valid values visibly in the legend block above as a fallback.
  XLSX.utils.book_append_sheet(wb, ws, ASSESSMENT_SHEET);

  // --- Metadata sheet ---
  const meta = [
    [NAME_KEY, participant.name || ""],
    [GROUP_KEY, groupName],
    [ROLE_KEY, departmentName],
    ["Erstellt am", new Date().toISOString().slice(0, 10)],
    ["Skill-Katalog Version", `${CATALOG_VERSION} (${CATALOG_UPDATED_AT})`],
    [],
    [
      "Anleitung",
      "Bitte trage in der Spalte 'Dein Level (1-5)' fuer jeden Skill deine Selbsteinschaetzung ein (Zahl von 1 bis 5). Leer lassen wenn nicht bewertbar. Steckbrief und Verhaltensanker geben dir Orientierung. Datei anschliessend zurueckschicken.",
    ],
    [
      "Hinweis",
      "Die Auswertung liefert qualitative Orientierungsdaten — keine statistisch belastbare Messung.",
    ],
  ];
  const metaWs = XLSX.utils.aoa_to_sheet(meta);
  metaWs["!cols"] = [{ wch: 18 }, { wch: 80 }];
  XLSX.utils.book_append_sheet(wb, metaWs, META_SHEET);

  const base = participant.name
    ? sanitizeFilename(participant.name)
    : "Teilnehmer";
  const filename = `Skill-Selbsteinschaetzung_${sanitizeFilename(departmentName)}_${base}.xlsx`;
  downloadWorkbook(wb, filename);
}

export interface ImportResult {
  participantName: string;
  groupName: string;
  roleName: string;
  ratings: Record<string, DreyfusLevel>;
  unknownSkills: string[];
}

/** Parses a JSON result file produced by the HTML survey and returns an ImportResult. */
export async function importAssessmentResultsFromJson(
  file: File,
  knownSkillNames: Set<string>,
): Promise<ImportResult> {
  const text = await file.text();
  let data: unknown;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error(`${file.name}: Ungültiges JSON.`);
  }

  if (
    typeof data !== "object" ||
    data === null ||
    typeof (data as Record<string, unknown>)["teilnehmer"] !== "string" ||
    typeof (data as Record<string, unknown>)["bewertungen"] !== "object"
  ) {
    throw new Error(`${file.name}: Dateiformat nicht erkannt (kein HTML-Umfrage-Export).`);
  }

  const d = data as {
    teilnehmer: string;
    rolle?: string;
    gruppe?: string;
    bewertungen: Record<string, unknown>;
  };

  const ratings: Record<string, DreyfusLevel> = {};
  const unknownSkills: string[] = [];

  for (const [skillName, rawLevel] of Object.entries(d.bewertungen)) {
    const level = Number(rawLevel);
    if (!Number.isFinite(level)) continue;
    const rounded = Math.round(level);
    if (rounded < 1 || rounded > 5) continue;
    if (!knownSkillNames.has(skillName)) {
      unknownSkills.push(skillName);
      continue;
    }
    ratings[skillName] = rounded as DreyfusLevel;
  }

  return {
    participantName: d.teilnehmer,
    groupName: d.gruppe ?? "",
    roleName: d.rolle ?? "",
    ratings,
    unknownSkills,
  };
}

/**
 * Parses a filled template and returns the participant name and ratings.
 * Unknown skills (not in the current categories) are collected so the UI can
 * warn the operator.
 */
export async function importAssessmentResults(
  file: File,
  knownSkillNames: Set<string>,
): Promise<ImportResult> {
  const buffer = await file.arrayBuffer();
  const wb = XLSX.read(buffer, { type: "array" });

  const metaSheet = wb.Sheets[META_SHEET];
  const meta: Record<string, string> = {};
  if (metaSheet) {
    const metaRows = XLSX.utils.sheet_to_json<string[]>(metaSheet, {
      header: 1,
      blankrows: false,
    });
    for (const row of metaRows) {
      if (!Array.isArray(row)) continue;
      const key = String(row[0] ?? "").trim();
      const value = String(row[1] ?? "").trim();
      if (key) meta[key] = value;
    }
  }

  const assessSheet = wb.Sheets[ASSESSMENT_SHEET];
  if (!assessSheet) {
    throw new Error(
      `Sheet '${ASSESSMENT_SHEET}' fehlt in der Datei ${file.name}.`,
    );
  }
  const data = XLSX.utils.sheet_to_json<(string | number)[]>(assessSheet, {
    header: 1,
    blankrows: false,
  });

  const ratings: Record<string, DreyfusLevel> = {};
  const unknownSkills: string[] = [];
  // Layout der Teilnehmer-Vorlage hat sich ueber Versionen geaendert
  // (Spalten-Reduzierung). Deshalb Header-Detektion: wir suchen die Spalte
  // mit "Dein Level" und nutzen sie. Faellt das Header-Matching aus, gehen
  // wir auf bekannte Fallback-Indizes (5 = ab v0.5.2, 6 = v0.5.0–0.5.1,
  // 3 = sehr alte Vorlagen).
  const headerRow = (data[0] ?? []).map((h) =>
    String(h ?? "").trim().toLowerCase(),
  );
  const detectedRatingCol = headerRow.findIndex((h) =>
    h.startsWith("dein level"),
  );
  const FALLBACK_RATING_COLS = [5, 6, 3];
  const readRating = (row: (string | number)[]): unknown => {
    if (detectedRatingCol >= 0) return row[detectedRatingCol];
    for (const c of FALLBACK_RATING_COLS) {
      const v = row[c];
      if (v !== undefined && v !== "" && v !== null) return v;
    }
    return undefined;
  };
  // Skip header row (row 0)
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    if (!row || row.length < 2) continue;
    const skillName = String(row[1] ?? "").trim();
    if (!skillName) continue;
    const category = String(row[0] ?? "").trim();
    // Skip legend / hint blocks below the data rows.
    if (!category) continue;
    const raw = readRating(row);
    if (raw === "" || raw === undefined || raw === null) continue;
    const num = Number(raw);
    if (!Number.isFinite(num)) continue;
    const level = Math.round(num);
    if (level < 1 || level > 5) continue;
    if (!knownSkillNames.has(skillName)) {
      unknownSkills.push(skillName);
      continue;
    }
    ratings[skillName] = level as DreyfusLevel;
  }

  return {
    participantName: meta[NAME_KEY] ?? "",
    groupName: meta[GROUP_KEY] ?? "",
    roleName: meta[ROLE_KEY] ?? "",
    ratings,
    unknownSkills,
  };
}

export interface TrendSection {
  topDev: SkillAnalysis[];
  topStrengths: SkillAnalysis[];
}

/**
 * Builds the analysis results file (per-person matrix + summary) for download
 * from the Skill-Profil view. `trending` adds a second block in the summary
 * sheet with Top 5 development areas and strengths from Skills mit hoher
 * Marktrelevanz (Trend ↑↑ / ↑) — ANF-17.
 */
export function exportAssessmentResults(
  categories: SkillCategory[],
  participants: Participant[],
  analysis: SkillAnalysis[],
  topDev: SkillAnalysis[],
  topStrengths: SkillAnalysis[],
  departmentName: string,
  trending?: TrendSection,
  drivers?: { groupName: string; items: MarketDriver[] },
) {
  const wb = XLSX.utils.book_new();

  // --- Matrix sheet ---
  const header = [
    "Kategorie",
    "Skill",
    "Haltbarkeit",
    "Bewertungsmodell",
    "Trend",
    "Trendbegruendung",
    "Schluesselkompetenz",
    "Zuletzt geaendert",
    ...participants.map((p, i) => p.name || `Person ${i + 1}`),
    "Durchschnitt",
    "Zielwert",
    "Gap (Ziel - Ø)",
  ];
  const rows: (string | number)[][] = [header];
  for (const cat of categories) {
    for (const skill of cat.skills) {
      if (skill.disabled) continue;
      const a = analysis.find(
        (x) => x.skill.name === skill.name && x.category === cat.name,
      );
      const row: (string | number)[] = [
        cat.name,
        skill.name,
        skill.dep,
        evaluationModelFor(skill, cat.name),
        skill.trend ?? "",
        skill.trendgrund ?? "",
        skill.keySkill ? "ja" : "",
        skill.lastModified ?? "",
      ];
      for (const p of participants) {
        const v = p.ratings[skill.name];
        row.push(v && v > 0 ? v : "");
      }
      row.push(a && a.avg > 0 ? Math.round(a.avg * 10) / 10 : "");
      row.push(typeof skill.targetLevel === "number" ? skill.targetLevel : "");
      row.push(
        a && a.gap !== null ? Math.round(a.gap * 10) / 10 : "",
      );
      rows.push(row);
    }
  }
  const matrixWs = XLSX.utils.aoa_to_sheet(rows);
  matrixWs["!cols"] = [
    { wch: 28 },
    { wch: 42 },
    { wch: 14 },
    { wch: 14 },
    { wch: 16 },
    { wch: 50 },
    { wch: 16 },
    { wch: 18 },
    ...participants.map(() => ({ wch: 14 })),
    { wch: 14 },
    { wch: 10 },
    { wch: 14 },
  ];
  XLSX.utils.book_append_sheet(wb, matrixWs, "Skill-Profil");

  // --- Summary sheet ---
  const summary: (string | number | "")[][] = [];
  summary.push(["Rolle", departmentName]);
  summary.push(["Teilnehmer", participants.length]);
  summary.push(["Skill-Katalog Version", `${CATALOG_VERSION} (${CATALOG_UPDATED_AT})`]);
  summary.push([
    "Hinweis",
    "Qualitative Orientierungsdaten — keine statistisch belastbare Messung.",
  ]);
  summary.push([]);
  summary.push(["Top 5 Entwicklungsfelder (sortiert nach Gap zum Zielwert)"]);
  summary.push(["Skill", "Bereich", "Durchschnitt", "Zielwert", "Gap"]);
  for (const item of topDev) {
    summary.push([
      item.skill.name,
      item.category,
      Math.round(item.avg * 10) / 10,
      typeof item.skill.targetLevel === "number" ? item.skill.targetLevel : "",
      item.gap !== null ? Math.round(item.gap * 10) / 10 : "",
    ]);
  }
  summary.push([]);
  summary.push(["Top 5 Staerken"]);
  summary.push(["Skill", "Bereich", "Durchschnitt"]);
  for (const item of topStrengths) {
    summary.push([
      item.skill.name,
      item.category,
      Math.round(item.avg * 10) / 10,
    ]);
  }
  if (trending) {
    summary.push([]);
    summary.push(["Skills mit hoher Marktrelevanz (Trend ↑↑ / ↑) — Top Entwicklungsfelder"]);
    summary.push(["Skill", "Bereich", "Durchschnitt", "Zielwert", "Gap"]);
    if (trending.topDev.length === 0) {
      summary.push(["(keine Bewertungen vorhanden)"]);
    } else {
      for (const item of trending.topDev) {
        summary.push([
          item.skill.name,
          item.category,
          Math.round(item.avg * 10) / 10,
          typeof item.skill.targetLevel === "number"
            ? item.skill.targetLevel
            : "",
          item.gap !== null ? Math.round(item.gap * 10) / 10 : "",
        ]);
      }
    }
    summary.push([]);
    summary.push(["Skills mit hoher Marktrelevanz (Trend ↑↑ / ↑) — Top Staerken"]);
    summary.push(["Skill", "Bereich", "Durchschnitt"]);
    if (trending.topStrengths.length === 0) {
      summary.push(["(keine Bewertungen vorhanden)"]);
    } else {
      for (const item of trending.topStrengths) {
        summary.push([
          item.skill.name,
          item.category,
          Math.round(item.avg * 10) / 10,
        ]);
      }
    }
  }
  const summaryWs = XLSX.utils.aoa_to_sheet(summary);
  summaryWs["!cols"] = [
    { wch: 42 },
    { wch: 28 },
    { wch: 14 },
    { wch: 10 },
    { wch: 10 },
  ];
  XLSX.utils.book_append_sheet(wb, summaryWs, "Zusammenfassung");

  // --- Markttreiber sheet (ANF-15) ---
  if (drivers && drivers.items.length > 0) {
    const driverRows: (string | number)[][] = [];
    driverRows.push(["Rollengruppe", drivers.groupName]);
    driverRows.push([]);
    driverRows.push([
      "Titel",
      "Zeithorizont",
      "Beschreibung",
      "Betroffene Skills",
    ]);
    for (const d of drivers.items) {
      driverRows.push([
        d.title,
        d.horizon ?? "",
        d.description,
        d.affectedSkillNames.join(", "),
      ]);
    }
    const driverWs = XLSX.utils.aoa_to_sheet(driverRows);
    driverWs["!cols"] = [
      { wch: 40 },
      { wch: 16 },
      { wch: 60 },
      { wch: 60 },
    ];
    XLSX.utils.book_append_sheet(wb, driverWs, "Markttreiber");
  }

  downloadWorkbook(
    wb,
    `Skill-Profil_${sanitizeFilename(departmentName)}_${new Date().toISOString().slice(0, 10)}.xlsx`,
  );
}
