import type {
  DepClassification,
  DreyfusLevel,
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
        .map((p) => p.ratings[skill.name])
        .filter((r): r is DreyfusLevel => r !== undefined)
        .map((r) => r as number);
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
  const rated = analysis.filter((a) => a.ratings.length > 0);
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
    .filter((a) => a.ratings.length > 0)
    .sort((a, b) => b.avg - a.avg)
    .slice(0, n);
}

export function filterByCategory(
  analysis: SkillAnalysis[],
  categoryName: string,
): SkillAnalysis[] {
  return analysis.filter((a) => a.category === categoryName);
}

export function filterByDep(
  analysis: SkillAnalysis[],
  dep: DepClassification,
): SkillAnalysis[] {
  return analysis.filter((a) => a.skill.dep === dep);
}

/**
 * Groesste Uneinigkeit in der Gruppe (max - min Bewertung). Braucht
 * mindestens 2 Bewertungen, sonst ist Streuung nicht aussagekraeftig.
 * Hilft bei Fragen wie "wo gibt es grosse Unterschiede zwischen euch?"
 * und "bei welchen Skills koennt ihr euch gegenseitig unterstuetzen?".
 */
export function topSpread(analysis: SkillAnalysis[], n = 5): SkillAnalysis[] {
  return analysis
    .filter((a) => a.ratings.length >= 2 && a.spread > 0)
    .sort((a, b) => b.spread - a.spread)
    .slice(0, n);
}

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

export interface ThresholdShare {
  analysis: SkillAnalysis;
  /** Anteil der Bewertungen <= threshold, 0..1. */
  shareBelow: number;
}

/**
 * Anteil der Gruppe je Skill unterhalb einer Schwelle — bewusst relativ
 * (Anteil, nicht absolute Personenzahl), damit die Kennzahl unabhaengig
 * von der Gruppengroesse funktioniert. shareBelow === 1 ("Team-Blindstelle")
 * heisst: wirklich alle liegen unter der Schwelle, nicht nur ein Teil.
 * Beantwortet "wo haben alle ein niedriges Level?" praeziser als der reine
 * Durchschnitt, der einen Ausreisser verschleiern kann.
 */
export function shareBelowThreshold(
  analysis: SkillAnalysis[],
  threshold: number,
  minShare = 0.5,
): ThresholdShare[] {
  return analysis
    .filter((a) => a.ratings.length > 0)
    .map((a) => ({
      analysis: a,
      shareBelow:
        a.ratings.filter((r) => r <= threshold).length / a.ratings.length,
    }))
    .filter((x) => x.shareBelow >= minShare)
    .sort((a, b) => b.shareBelow - a.shareBelow || b.analysis.ratings.length - a.analysis.ratings.length);
}

export interface CategoryAverage {
  category: string;
  avg: number;
  /** Anzahl bewerteter Skills, die in den Durchschnitt eingeflossen sind. */
  ratedSkillCount: number;
}

/**
 * Aggregierter Durchschnitt je Kategorie (Dimension) — ein Balken pro
 * Dimension statt pro Einzelskill. Nur Skills mit mind. einer Bewertung
 * fliessen ein; Kategorien ganz ohne Bewertungen werden ausgelassen.
 */
export function categoryAverages(analysis: SkillAnalysis[]): CategoryAverage[] {
  const byCategory = new Map<string, SkillAnalysis[]>();
  for (const a of analysis) {
    if (a.ratings.length === 0) continue;
    const list = byCategory.get(a.category) ?? [];
    list.push(a);
    byCategory.set(a.category, list);
  }
  return [...byCategory.entries()]
    .map(([category, items]) => ({
      category,
      avg: items.reduce((sum, a) => sum + a.avg, 0) / items.length,
      ratedSkillCount: items.length,
    }))
    .sort((a, b) => b.avg - a.avg);
}
