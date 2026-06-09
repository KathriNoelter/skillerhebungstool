export type DepClassification = "Durable" | "Evolving" | "Perishable";

export type DreyfusLevel = 0 | 1 | 2 | 3 | 4 | 5;

export const DREYFUS_LABELS: Record<DreyfusLevel, string> = {
  0: "—",
  1: "Novice",
  2: "Adv. Beginner",
  3: "Competent",
  4: "Proficient",
  5: "Expert",
};

export const DREYFUS_LABELS_DE: Record<DreyfusLevel, string> = {
  0: "Nicht bewertet",
  1: "Anfaenger",
  2: "Fortgeschr. Anfaenger",
  3: "Kompetent",
  4: "Gewandt",
  5: "Experte",
};

/**
 * ANF-16: Hybrides Bewertungsmodell.
 * Fachkompetenz nutzt Bloom's Taxonomy (Wissensentwicklung), alle anderen
 * Dimensionen bleiben bei Dreyfus (Handwerksstufen). Beide normiert auf 1–5.
 */
export type EvaluationModel = "Bloom" | "Dreyfus";

export const BLOOM_LABELS: Record<DreyfusLevel, string> = {
  0: "—",
  1: "Remember",
  2: "Understand",
  3: "Apply",
  4: "Analyze & Evaluate",
  5: "Create & Design",
};

export const BLOOM_LABELS_DE: Record<DreyfusLevel, string> = {
  0: "Nicht bewertet",
  1: "Erinnern",
  2: "Verstehen",
  3: "Anwenden",
  4: "Analysieren & Evaluieren",
  5: "Erschaffen & Gestalten",
};

export const DREYFUS_COLORS: Record<DreyfusLevel, string> = {
  0: "bg-gray-200 text-gray-500",
  1: "bg-red-500 text-white",
  2: "bg-orange-400 text-white",
  3: "bg-yellow-400 text-gray-900",
  4: "bg-blue-500 text-white",
  5: "bg-emerald-500 text-white",
};

export const DEP_COLORS: Record<DepClassification, string> = {
  Durable: "text-emerald-700 bg-emerald-50 border-emerald-200",
  Evolving: "text-blue-700 bg-blue-50 border-blue-200",
  Perishable: "text-amber-700 bg-amber-50 border-amber-200",
};

/**
 * ANF-14: Relevanztrend je Skill — Marktperspektive 0–5 Jahre.
 * Konzeptionell getrennt von DEP: DEP beschreibt die Halbwertszeit
 * (wie schnell der Skill veraltet), der Trend beschreibt die
 * Marktrelevanzentwicklung (wie gefragt der Skill wird).
 */
export type RelevanceTrend =
  | "stark steigend"
  | "steigend"
  | "stabil"
  | "sinkend";

export const TREND_VALUES: RelevanceTrend[] = [
  "stark steigend",
  "steigend",
  "stabil",
  "sinkend",
];

export const TREND_LABELS: Record<RelevanceTrend, string> = {
  "stark steigend": "↑↑ stark steigend",
  steigend: "↑ steigend",
  stabil: "→ stabil",
  sinkend: "↓ sinkend",
};

export const TREND_COLORS: Record<RelevanceTrend, string> = {
  "stark steigend": "border-emerald-200 bg-emerald-50 text-emerald-800",
  steigend: "border-blue-200 bg-blue-50 text-blue-800",
  stabil: "border-slate-200 bg-slate-50 text-slate-700",
  sinkend: "border-amber-200 bg-amber-50 text-amber-800",
};

/** Dreyfus levels that can carry a behavioral anchor (level 0 = nicht bewertet). */
export type DreyfusAnchorLevel = 1 | 2 | 3 | 4 | 5;

export type SkillAnchors = Partial<Record<DreyfusAnchorLevel, string>>;

export interface Skill {
  name: string;
  dep: DepClassification;
  /** ANF-03: Skill-Steckbrief — was umfasst der Skill, typische Taetigkeiten. */
  description?: string;
  /** ANF-06: Rollenspezifischer Dreyfus-Zielwert (1-5). */
  targetLevel?: DreyfusAnchorLevel;
  /** ANF-07: Verhaltensanker je Dreyfus-Stufe (1-5). */
  anchors?: SkillAnchors;
  /** ANF-14: Relevanztrend Marktperspektive 0–5 Jahre. */
  trend?: RelevanceTrend;
  /** ANF-14: Optionale Begruendung des Trends. */
  trendgrund?: string;
  /**
   * ANF-16: Bewertungsmodell pro Skill. Wenn nicht gesetzt, gilt Default
   * via {@link evaluationModelFor} (Fachkompetenz → Bloom, sonst Dreyfus).
   */
  bewertungsmodell?: EvaluationModel;
  /**
   * ANF-18 (10): Schluesselkompetenz-Badge — markiert Skills, die fuer die
   * Rolle besonders kritisch sind. Nur visuell relevant (kein Filter / keine
   * Berechnungslogik gekoppelt).
   */
  keySkill?: boolean;
  /**
   * ANF-18 (9): Skills werden deaktiviert (nicht geloescht) — historische
   * Datenintegritaet bleibt erhalten. Deaktivierte Skills bleiben in der
   * Inventur sichtbar, sind aber in Selbsteinschaetzung & Auswertung
   * ausgeblendet.
   */
  disabled?: boolean;
  /**
   * ANF-18: ISO-Datum (YYYY-MM-DD) der letzten redaktionellen Aenderung —
   * wird beim Editieren via UI gesetzt, nicht im Code-Katalog gepflegt.
   */
  lastModified?: string;
  /** Herkunfts-Label für via Spezialisierung geladene Skills (z. B. Rollenname). */
  sourceLabel?: string;
}

/**
 * ANF-16: Effektives Bewertungsmodell fuer einen Skill.
 * Explizites `bewertungsmodell`-Feld hat Vorrang; sonst gilt Bloom fuer alle
 * Skills in der Kategorie "Fachkompetenz", Dreyfus fuer alle anderen.
 */
export function evaluationModelFor(
  skill: Pick<Skill, "bewertungsmodell">,
  categoryName: string,
): EvaluationModel {
  if (skill.bewertungsmodell) return skill.bewertungsmodell;
  return categoryName === "Fachkompetenz" ? "Bloom" : "Dreyfus";
}

/** ANF-16: Stufenbezeichnungen fuer das jeweilige Modell (deutsch). */
export function stageLabelsFor(
  model: EvaluationModel,
): Record<DreyfusLevel, string> {
  return model === "Bloom" ? BLOOM_LABELS_DE : DREYFUS_LABELS_DE;
}

export interface SkillCategory {
  name: string;
  skills: Skill[];
}

export interface Department {
  id: string;
  name: string;
  description: string;
  categories: SkillCategory[];
}

/** A Role within a Group — structurally identical to Department for downstream compatibility. */
export type Role = Department;

export interface Group {
  id: string;
  name: string;
  description: string;
  roles: Role[];
  /**
   * ANF-15: Optionale Default-Markttreiber. Werden beim ersten Aufruf der
   * App in den marketDriversByGroup-State als Vorbelegung uebernommen — der
   * User kann sie editieren oder loeschen.
   */
  defaultDrivers?: MarketDriver[];
}

/**
 * ANF-15: Markt- & Kundentreiber je Rollengruppe.
 * Erklaert die strategische Richtung (welche externen Entwicklungen veraendern
 * die Skill-Anforderungen?), nicht die konkreten Kompetenzantworten.
 * Beide Perspektiven (Treiber vs. Zukunfts-Skills) werden getrennt gefuehrt.
 */
export interface MarketDriver {
  id: string;
  title: string;
  /** Freitext, z. B. "0–2 Jahre", "2–5 Jahre". */
  horizon: string;
  description: string;
  /** Skill-Namen aus dem Katalog der Rollengruppe. */
  affectedSkillNames: string[];
}

export interface Participant {
  name: string;
  ratings: Record<string, DreyfusLevel>;
  /**
   * Spezialisierungsrollen des Teilnehmers (z. B. ["Frontend-Entwickler"]).
   * Bestimmt, welche Skills in der exportierten Vorlage enthalten sind:
   * Core-Skills immer + Skills der gewaehlten Spezialisierungen.
   */
  specializationRoles?: string[];
}

export interface WorkshopState {
  department: Department | null;
  selectedCategories: Set<string>;
  selectedSkills: Skill[];
  participants: Participant[];
  step: number;
}
