import type {
  Participant,
  RelevanceTrend,
  Skill,
  SkillCategory,
} from "../types";

export interface SkillAnalysis {
  skill: Skill;
  category: string;
  ratings: number[];
  avg: number;
  min: number;
  max: number;
  spread: number;
  /** ANF-08: target − avg, positiv = unter Ziel. null wenn kein Zielwert. */
  gap: number | null;
}

export function computeAnalysis(
  categories: SkillCategory[],
  participants: Participant[],
): SkillAnalysis[] {
  return categories.flatMap((cat) =>
    cat.skills.map((skill) => {
      const ratings = participants
        .map((p) => (p.ratings[skill.name] ?? 0) as number)
        .filter((r) => r > 0);
      const avg =
        ratings.length > 0
          ? ratings.reduce((a, b) => a + b, 0) / ratings.length
          : 0;
      const target =
        typeof skill.targetLevel === "number" ? skill.targetLevel : null;
      const gap = target !== null && ratings.length > 0 ? target - avg : null;
      return {
        skill,
        category: cat.name,
        ratings,
        avg,
        min: ratings.length > 0 ? Math.min(...ratings) : 0,
        max: ratings.length > 0 ? Math.max(...ratings) : 0,
        spread:
          ratings.length > 0 ? Math.max(...ratings) - Math.min(...ratings) : 0,
        gap,
      };
    }),
  );
}

/**
 * ANF-08: Top-Entwicklungsfelder primaer nach Gap (groesster Abstand zum Ziel),
 * Fallback auf niedrigsten Score wenn kein Zielwert hinterlegt ist.
 */
export function topDevelopmentAreas(
  analysis: SkillAnalysis[],
  n = 5,
): SkillAnalysis[] {
  const rated = analysis.filter((a) => a.avg > 0);
  return [...rated]
    .sort((a, b) => {
      const aGap = a.gap ?? -Infinity;
      const bGap = b.gap ?? -Infinity;
      if (aGap !== bGap) return bGap - aGap;
      return a.avg - b.avg;
    })
    .slice(0, n);
}

export function topStrengths(
  analysis: SkillAnalysis[],
  n = 5,
): SkillAnalysis[] {
  return analysis
    .filter((a) => a.avg > 0)
    .sort((a, b) => b.avg - a.avg)
    .slice(0, n);
}

export function filterByCategory(
  analysis: SkillAnalysis[],
  categoryName: string,
): SkillAnalysis[] {
  return analysis.filter((a) => a.category === categoryName);
}

/**
 * The four canonical Skill-Dimensions. Order is intentional and reflected 1:1
 * in the UI (Inventur, Auswertung, Excel). Mit ANF-17 ist dies die einzige
 * Gliederungsebene — alle Skills (heutige wie zukunftsrelevante) liegen
 * direkt in einer dieser Dimensionen; die Zukunftsperspektive bildet der
 * Relevanztrend am Skill ab.
 */
export const SKILL_DIMENSIONS = [
  "Fachkompetenz",
  "Handwerklich-Technisch",
  "Methodisch",
  "Kommunikation & Consulting",
] as const;

export type SkillDimension = (typeof SKILL_DIMENSIONS)[number];

/**
 * ANF-14 / ANF-17: Filtert Auswertungs-Items nach Relevanztrend.
 * Skills ohne Trend werden ausgeschlossen, sofern sie nicht explizit in der
 * Trend-Liste enthalten sind.
 */
export function filterByTrend(
  analysis: SkillAnalysis[],
  trends: RelevanceTrend[],
): SkillAnalysis[] {
  const set = new Set(trends);
  return analysis.filter((a) => a.skill.trend && set.has(a.skill.trend));
}
