import type {
  Role,
  Skill,
  SkillCategory,
  DepClassification,
  DreyfusAnchorLevel,
  RelevanceTrend,
  EvaluationModel,
} from "../types";

const VALID_DEP: DepClassification[] = ["Durable", "Evolving", "Perishable"];
const VALID_TREND: RelevanceTrend[] = [
  "stark steigend",
  "steigend",
  "stabil",
  "sinkend",
];
const VALID_MODEL: EvaluationModel[] = ["Bloom", "Dreyfus"];

/** Liest einen Feldwert mit deutschem Alias-Fallback. */
function field(s: Record<string, unknown>, key: string, alias: string): unknown {
  return s[key] !== undefined ? s[key] : s[alias];
}

function parseSkill(raw: unknown, skillIndex: number): Skill {
  if (typeof raw !== "object" || raw === null) {
    throw new Error(`Skill ${skillIndex + 1}: Kein Objekt.`);
  }
  const s = raw as Record<string, unknown>;

  const name = String(s["name"] ?? "").trim();
  if (!name) throw new Error(`Skill ${skillIndex + 1}: Feld "name" fehlt.`);

  // dep  ←  "dep" | "haltbarkeit"
  const rawDep = field(s, "dep", "haltbarkeit");
  const dep = rawDep as DepClassification;
  if (!VALID_DEP.includes(dep)) {
    throw new Error(
      `Skill "${name}": "haltbarkeit" muss "Durable", "Evolving" oder "Perishable" sein (erhalten: "${String(rawDep)}").`,
    );
  }

  const skill: Skill = { name, dep };

  // description  ←  "description" | "steckbrief"
  const desc = field(s, "description", "steckbrief");
  if (typeof desc === "string" && desc.trim()) {
    skill.description = desc.trim();
  }

  // targetLevel  ←  "targetLevel" | "zielwert"
  const rawTarget = field(s, "targetLevel", "zielwert");
  if (rawTarget != null) {
    const tl = Number(rawTarget);
    if (Number.isInteger(tl) && tl >= 1 && tl <= 5) {
      skill.targetLevel = tl as DreyfusAnchorLevel;
    }
  }

  // trend
  const rawTrend = String(s["trend"] ?? "").trim();
  if (VALID_TREND.includes(rawTrend as RelevanceTrend)) {
    skill.trend = rawTrend as RelevanceTrend;
  }

  // trendgrund  ←  "trendgrund" | "trendbegruendung"
  const trendgrund = field(s, "trendgrund", "trendbegruendung");
  if (typeof trendgrund === "string" && trendgrund.trim()) {
    skill.trendgrund = trendgrund.trim();
  }

  // keySkill  ←  "keySkill" | "schluessel"
  const rawKey = field(s, "keySkill", "schluessel");
  if (typeof rawKey === "boolean") {
    skill.keySkill = rawKey;
  }

  // bewertungsmodell  (gleicher Name in beiden Formaten)
  if (
    typeof s["bewertungsmodell"] === "string" &&
    VALID_MODEL.includes(s["bewertungsmodell"] as EvaluationModel)
  ) {
    skill.bewertungsmodell = s["bewertungsmodell"] as EvaluationModel;
  }

  // lastModified  ←  "lastModified" | "zuletzt"
  const lastMod = field(s, "lastModified", "zuletzt");
  if (typeof lastMod === "string" && lastMod.trim()) {
    skill.lastModified = lastMod.trim();
  }

  // anchors  ←  "anchors" | "anker"  — JSON hat immer String-Keys
  const rawAnchors = field(s, "anchors", "anker");
  if (typeof rawAnchors === "object" && rawAnchors !== null) {
    const src = rawAnchors as Record<string, unknown>;
    const anchors: Partial<Record<DreyfusAnchorLevel, string>> = {};
    for (let l = 1; l <= 5; l++) {
      const text = src[String(l)];
      if (typeof text === "string" && text.trim()) {
        anchors[l as DreyfusAnchorLevel] = text.trim();
      }
    }
    if (Object.keys(anchors).length > 0) skill.anchors = anchors;
  }

  return skill;
}

function parseCategory(raw: unknown, catIndex: number): SkillCategory {
  if (typeof raw !== "object" || raw === null) {
    throw new Error(`Kategorie ${catIndex + 1}: Kein Objekt.`);
  }
  const c = raw as Record<string, unknown>;

  const name = String(c["name"] ?? "").trim();
  if (!name) throw new Error(`Kategorie ${catIndex + 1}: Feld "name" fehlt.`);

  if (!Array.isArray(c["skills"])) {
    throw new Error(`Kategorie "${name}": Feld "skills" ist kein Array.`);
  }

  const skills = (c["skills"] as unknown[]).map((s, i) => parseSkill(s, i));
  return { name, skills };
}

/** Parses and validates a JSON catalog file, returns a Role ready for use. */
export function validateAndParseRole(json: unknown): Role {
  if (typeof json !== "object" || json === null) {
    throw new Error("JSON ist kein Objekt.");
  }
  const r = json as Record<string, unknown>;

  const name = String(r["name"] ?? "").trim();
  if (!name) throw new Error('Feld "name" fehlt oder ist leer.');

  const description =
    typeof r["description"] === "string" ? r["description"].trim() : "";

  if (!Array.isArray(r["categories"]) || r["categories"].length === 0) {
    throw new Error('Feld "categories" fehlt, ist kein Array oder ist leer.');
  }

  const categories = (r["categories"] as unknown[]).map((c, i) =>
    parseCategory(c, i),
  );

  const totalSkills = categories.reduce((sum, c) => sum + c.skills.length, 0);
  if (totalSkills === 0) {
    throw new Error("Der Katalog enthält keine Skills.");
  }

  const providedId =
    typeof r["id"] === "string" ? r["id"].trim() : "";
  const id = providedId
    ? providedId
    : `imported-${name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")}-${Date.now().toString(36)}`;

  return { id, name, description, categories };
}

/** Reads and parses a JSON file from a browser File input. */
export async function importCatalogFromFile(file: File): Promise<Role> {
  const text = await file.text();
  let json: unknown;
  try {
    json = JSON.parse(text);
  } catch {
    throw new Error(`${file.name}: Ungültiges JSON.`);
  }
  try {
    return validateAndParseRole(json);
  } catch (e) {
    throw new Error(
      `${file.name}: ${e instanceof Error ? e.message : String(e)}`,
    );
  }
}
