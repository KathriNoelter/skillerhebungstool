import { useMemo, useState } from "react";
import type {
  DreyfusLevel,
  DreyfusAnchorLevel,
  EvaluationModel,
  MarketDriver,
  Participant,
  SkillCategory,
} from "../types";
import {
  DREYFUS_COLORS,
  evaluationModelFor,
  stageLabelsFor,
} from "../types";
import {
  computeAnalysis,
  filterByTrend,
  topDevelopmentAreas,
  topStrengths,
  type SkillAnalysis,
} from "../lib/analysis";
import { exportAssessmentResults } from "../lib/excel";

function GapBadge({ gap }: { gap: number | null }) {
  if (gap === null) return <span className="text-xs text-gray-400">—</span>;
  const rounded = Math.round(gap * 10) / 10;
  // gap > 0 = unter Ziel (rot); gap < 0 = ueber Ziel (gruen); 0 = passt
  const color =
    gap >= 1.5
      ? "bg-red-500 text-white"
      : gap >= 0.5
        ? "bg-amber-400 text-gray-900"
        : gap > -0.5
          ? "bg-emerald-500 text-white"
          : "bg-blue-500 text-white";
  const sign = rounded > 0 ? "+" : "";
  return (
    <span
      className={`inline-flex h-7 min-w-[2.4rem] items-center justify-center rounded px-1.5 text-xs font-semibold ${color}`}
      title={
        gap > 0
          ? `${rounded} Punkte unter Zielwert`
          : gap < 0
            ? `${-rounded} Punkte ueber Zielwert`
            : "Zielwert erreicht"
      }
    >
      {sign}
      {rounded.toFixed(1)}
    </span>
  );
}

function TargetCell({ level }: { level?: number }) {
  if (typeof level !== "number")
    return <span className="text-xs text-gray-400">—</span>;
  return (
    <span className="inline-flex h-7 min-w-[2rem] items-center justify-center rounded bg-slate-100 px-1.5 text-xs font-semibold text-slate-700">
      {level}
    </span>
  );
}

/**
 * ANF-06: Editable target cell — sichtbares Eingabefeld direkt in der
 * Auswertungs-Tabelle. Modellabhaengige Stufenbezeichnungen.
 */
function EditableTargetCell({
  level,
  model,
  onChange,
}: {
  level: number | undefined;
  model: EvaluationModel;
  onChange: (v: DreyfusAnchorLevel | null) => void;
}) {
  const labels = stageLabelsFor(model);
  const isSet = typeof level === "number";
  return (
    <select
      value={isSet ? level : ""}
      onChange={(e) => {
        const v = e.target.value;
        onChange(v ? (Number(v) as DreyfusAnchorLevel) : null);
      }}
      title={
        isSet
          ? `Zielwert: ${level} — ${labels[level as DreyfusAnchorLevel]} (${model} 1–5)`
          : `Zielwert setzen (${model} 1–5)`
      }
      className={`inline-flex h-7 min-w-[3rem] items-center justify-center rounded px-1.5 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-slate-400 ${
        isSet
          ? "bg-slate-100 text-slate-700"
          : "border border-dashed border-gray-300 bg-white text-gray-400"
      }`}
    >
      <option value="">—</option>
      {([1, 2, 3, 4, 5] as DreyfusAnchorLevel[]).map((l) => (
        <option key={l} value={l}>
          {l} — {labels[l]}
        </option>
      ))}
    </select>
  );
}

interface Props {
  departmentName: string;
  groupName: string;
  categories: SkillCategory[];
  participants: Participant[];
  drivers: MarketDriver[];
  onEditSkillTarget: (
    skillName: string,
    target: DreyfusAnchorLevel | null,
  ) => void;
  onBack: () => void;
}

function LevelBadge({ level }: { level: DreyfusLevel }) {
  return (
    <span
      className={`inline-flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold ${DREYFUS_COLORS[level]}`}
    >
      {level === 0 ? "—" : level}
    </span>
  );
}

function AverageBadge({ avg }: { avg: number }) {
  if (avg === 0) return <span className="text-xs text-gray-400">—</span>;
  const rounded = Math.round(avg * 10) / 10;
  const level = Math.round(avg) as DreyfusLevel;
  const colorClass = DREYFUS_COLORS[level] || DREYFUS_COLORS[0];
  return (
    <span
      className={`inline-flex h-8 min-w-[2rem] items-center justify-center rounded-lg px-1 text-sm font-bold ${colorClass}`}
    >
      {rounded}
    </span>
  );
}

function SummaryList({
  title,
  items,
  emptyText,
  colorClass,
  showGap = false,
  footer,
}: {
  title: string;
  items: SkillAnalysis[];
  emptyText: string;
  colorClass: string;
  showGap?: boolean;
  footer?: string;
}) {
  return (
    <div className={`rounded-xl border p-5 ${colorClass}`}>
      <h4 className="mb-3 text-sm font-bold uppercase tracking-wide">
        {title}
      </h4>
      {items.length === 0 ? (
        <p className="text-sm text-gray-500">{emptyText}</p>
      ) : (
        <ol className="space-y-2">
          {items.map((item, i) => {
            const level = Math.round(item.avg) as DreyfusLevel;
            return (
              <li
                key={item.skill.name}
                className="flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-bold text-slate-700">
                    {i + 1}
                  </span>
                  <div>
                    <span className="text-sm font-medium">
                      {item.skill.name}
                    </span>
                    <span className="ml-2 text-xs text-gray-500">
                      {item.category}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {showGap && item.gap !== null && (
                    <span
                      className="rounded bg-white/70 px-1.5 py-0.5 text-[10px] font-semibold text-slate-700"
                      title="Gap zum Zielwert"
                    >
                      Gap {item.gap > 0 ? "+" : ""}
                      {(Math.round(item.gap * 10) / 10).toFixed(1)}
                    </span>
                  )}
                  <span
                    className={`inline-flex h-6 min-w-[2rem] items-center justify-center rounded px-1 text-xs font-bold ${DREYFUS_COLORS[level]}`}
                  >
                    {(Math.round(item.avg * 10) / 10).toFixed(1)}
                  </span>
                </div>
              </li>
            );
          })}
        </ol>
      )}
      {footer && (
        <p className="mt-3 text-[11px] italic text-gray-500">{footer}</p>
      )}
    </div>
  );
}

export function SkillProfile({
  departmentName,
  groupName,
  categories,
  participants,
  drivers,
  onEditSkillTarget,
  onBack,
}: Props) {
  const [showIndividual, setShowIndividual] = useState(true);

  const analysis = useMemo(
    () => computeAnalysis(categories, participants),
    [categories, participants],
  );
  const topDev = useMemo(() => topDevelopmentAreas(analysis, 5), [analysis]);
  const topStr = useMemo(() => topStrengths(analysis, 5), [analysis]);

  // ANF-17: Zukunftsperspektive wird ueber den Skill-Trend abgebildet, nicht
  // ueber eine separate Kategorie. Wir zeigen einen Auswertungs-Block fuer
  // Skills mit Trend "stark steigend" oder "steigend".
  const trendingAnalysis = useMemo(
    () => filterByTrend(analysis, ["stark steigend", "steigend"]),
    [analysis],
  );
  const trendingTopDev = useMemo(
    () => topDevelopmentAreas(trendingAnalysis, 5),
    [trendingAnalysis],
  );
  const trendingTopStr = useMemo(
    () => topStrengths(trendingAnalysis, 5),
    [trendingAnalysis],
  );
  const hasTrendingSkills = trendingAnalysis.length > 0;
  const hasTrendingRatings = trendingAnalysis.some((a) => a.avg > 0);

  const handlePrint = () => {
    const prev = document.title;
    document.title = `Skill-Profil ${departmentName}`;
    window.print();
    setTimeout(() => {
      document.title = prev;
    }, 0);
  };

  const handleExcelExport = () => {
    exportAssessmentResults(
      categories,
      participants,
      analysis,
      topDev,
      topStr,
      departmentName,
      hasTrendingSkills
        ? { topDev: trendingTopDev, topStrengths: trendingTopStr }
        : undefined,
      drivers.length > 0
        ? { groupName, items: drivers }
        : undefined,
    );
  };

  return (
    <div className="mx-auto max-w-6xl py-8 px-4">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800">
            Auswertung: {departmentName}
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Konsolidierte Selbsteinschaetzungen mit Gruppen-Durchschnitt sowie
            Top 5 Entwicklungsfelder und Top 5 Staerken.
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded bg-red-500 px-2 py-0.5 text-white">
              1 Novice
            </span>
            <span className="rounded bg-orange-400 px-2 py-0.5 text-white">
              2 Adv. Beginner
            </span>
            <span className="rounded bg-yellow-400 px-2 py-0.5 text-gray-900">
              3 Competent
            </span>
            <span className="rounded bg-blue-500 px-2 py-0.5 text-white">
              4 Proficient
            </span>
            <span className="rounded bg-emerald-500 px-2 py-0.5 text-white">
              5 Expert
            </span>
          </div>
        </div>

        <div className="no-print flex flex-wrap items-center gap-2">
          <label className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-gray-700">
            <input
              type="checkbox"
              checked={showIndividual}
              onChange={(e) => setShowIndividual(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-slate-800 focus:ring-slate-400"
            />
            Einzelantworten anzeigen
          </label>
          <button
            onClick={handlePrint}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Als PDF herunterladen
          </button>
          <button
            onClick={handleExcelExport}
            className="rounded-lg bg-slate-800 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-700"
          >
            Als Excel herunterladen
          </button>
        </div>
      </div>

      {/* ANF-09: Orientation hint */}
      <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4">
        <p className="text-sm font-semibold text-amber-900">
          Hinweis zur Interpretation
        </p>
        <p className="mt-1 text-xs leading-relaxed text-amber-800">
          Diese Auswertung liefert <strong>qualitative Orientierungsdaten</strong> —
          keine statistisch belastbaren Messwerte. Bei Gruppengroessen von n=3–4
          kann ein einzelner Ausreisser den Durchschnitt erheblich verzerren.
          Die <strong>Einzelwerte</strong> bleiben in der Fuehrungskraefte-Ansicht
          deshalb dauerhaft sichtbar.
        </p>
      </div>

      {categories.map((cat) => (
        <div
          key={cat.name}
          className="mb-6 rounded-xl border border-gray-200 bg-white shadow-sm"
        >
          <div className="border-b border-gray-100 px-6 py-3">
            <h3 className="text-sm font-bold uppercase tracking-wide text-slate-600">
              {cat.name}
            </h3>
          </div>
          <div className="overflow-x-auto px-6 pb-4">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-2 text-left text-xs font-semibold text-gray-500">
                    Skill
                  </th>
                  {showIndividual &&
                    participants.map((p, i) => (
                      <th
                        key={i}
                        className="px-2 py-2 text-center text-xs font-semibold text-gray-500"
                      >
                        {p.name || `P${i + 1}`}
                      </th>
                    ))}
                  <th className="px-2 py-2 text-center text-xs font-semibold text-slate-700">
                    ø Gruppe
                  </th>
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-500">
                    Ziel
                  </th>
                  <th className="px-2 py-2 text-center text-xs font-semibold text-gray-500">
                    Gap
                  </th>
                </tr>
              </thead>
              <tbody>
                {cat.skills.map((skill) => {
                  const ratings = participants.map(
                    (p) => p.ratings[skill.name] ?? (0 as DreyfusLevel),
                  );
                  const numRatings = ratings.map((r) => r as number);
                  const rated = numRatings.filter((r) => r > 0);
                  const avg =
                    rated.length > 0
                      ? rated.reduce((a, b) => a + b, 0) / rated.length
                      : 0;
                  const target =
                    typeof skill.targetLevel === "number"
                      ? skill.targetLevel
                      : undefined;
                  const gap =
                    target !== undefined && rated.length > 0
                      ? target - avg
                      : null;
                  return (
                    <tr key={skill.name} className="border-b border-gray-50">
                      <td className="py-2 pr-4 text-sm text-gray-700">
                        {skill.name}
                      </td>
                      {showIndividual &&
                        ratings.map((r, i) => (
                          <td key={i} className="px-2 py-2 text-center">
                            <LevelBadge level={r as DreyfusLevel} />
                          </td>
                        ))}
                      <td className="px-2 py-2 text-center">
                        <AverageBadge avg={avg} />
                      </td>
                      <td className="px-2 py-2 text-center">
                        <span className="print:hidden">
                          <EditableTargetCell
                            level={target}
                            model={evaluationModelFor(skill, cat.name)}
                            onChange={(v) =>
                              onEditSkillTarget(skill.name, v)
                            }
                          />
                        </span>
                        <span className="hidden print:inline">
                          <TargetCell level={target} />
                        </span>
                      </td>
                      <td className="px-2 py-2 text-center">
                        <GapBadge gap={gap} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      {/* Summary block */}
      <div className="mb-8 grid gap-6 lg:grid-cols-2">
        <SummaryList
          title="Top 5 Entwicklungsfelder"
          items={topDev}
          emptyText="Keine Skills mit Bewertungen vorhanden."
          colorClass="border-red-200 bg-red-50"
          showGap
          footer="Sortierung: groesster Gap zum Zielwert (Fallback: niedrigster Score, wenn kein Ziel hinterlegt)."
        />
        <SummaryList
          title="Top 5 Staerken"
          items={topStr}
          emptyText="Noch keine Bewertungen vorhanden."
          colorClass="border-emerald-200 bg-emerald-50"
        />
      </div>

      {/* Trend-relevante Skills (ANF-14 / ANF-17) */}
      {hasTrendingSkills && (
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-2">
            <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-purple-800">
              Trend ↑↑ / ↑
            </span>
            <h3 className="text-sm font-semibold text-slate-700">
              Auswertung der Skills mit hoher Marktrelevanz (steigend / stark
              steigend)
            </h3>
          </div>
          {!hasTrendingRatings ? (
            <div className="rounded-xl border border-purple-200 bg-purple-50 p-5">
              <p className="text-sm text-purple-900">
                Die zukunftsrelevanten Skills wurden noch nicht bewertet.
              </p>
              <p className="mt-2 text-xs text-purple-700">
                Bitte alle Teilnehmenden um eine Bewertung dieser Skills (Stufe
                1–5) in der Excel-Vorlage und importiere die Dateien erneut.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-2">
              <SummaryList
                title="Trend ↑: Top Entwicklungsfelder"
                items={trendingTopDev}
                emptyText="Keine zukunftsrelevanten Skills unterhalb des Durchschnitts."
                colorClass="border-red-200 bg-red-50"
                showGap
              />
              <SummaryList
                title="Trend ↑: Top Staerken"
                items={trendingTopStr}
                emptyText="Keine zukunftsrelevanten Skills bewertet."
                colorClass="border-emerald-200 bg-emerald-50"
              />
            </div>
          )}
        </div>
      )}

      <div className="mt-8 flex items-center justify-between no-print">
        <button
          onClick={onBack}
          className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        >
          &larr; Zurueck
        </button>
        <div className="text-xs text-gray-400">
          Workshop abgeschlossen — speichere die Auswertung per PDF- oder
          Excel-Download.
        </div>
      </div>
    </div>
  );
}
