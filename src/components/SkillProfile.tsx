import { useMemo, useState } from "react";
import type {
  DepClassification,
  DreyfusLevel,
  DreyfusAnchorLevel,
  MarketDriver,
  Participant,
  SkillCategory,
} from "../types";
import {
  DREYFUS_COLORS,
  DEP_COLORS,
  stageLabelsFor,
  UNIFIED_LEVEL_DESCRIPTIONS_DE,
} from "../types";
import {
  categoryAverages,
  computeAnalysis,
  filterByDep,
  filterByTrend,
  shareBelowThreshold,
  topDevelopmentAreas,
  topSpread,
  topStrengths,
  type CategoryAverage,
  type SkillAnalysis,
  type ThresholdShare,
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
 * Auswertungs-Tabelle.
 */
function EditableTargetCell({
  level,
  onChange,
}: {
  level: number | undefined;
  onChange: (v: DreyfusAnchorLevel | null) => void;
}) {
  const labels = stageLabelsFor();
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
          ? `Zielwert: ${level} — ${labels[level as DreyfusAnchorLevel]}: ${UNIFIED_LEVEL_DESCRIPTIONS_DE[level as DreyfusAnchorLevel]}`
          : `Zielwert setzen`
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

function LevelBadge({ level }: { level: DreyfusLevel | undefined }) {
  if (level === undefined) {
    return (
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold bg-gray-100 text-gray-400">
        —
      </span>
    );
  }
  return (
    <span
      className={`inline-flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold ${DREYFUS_COLORS[level]}`}
    >
      {level}
    </span>
  );
}

function AverageBadge({ avg, hasData }: { avg: number; hasData: boolean }) {
  if (!hasData) return <span className="text-xs text-gray-400">—</span>;
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

/**
 * Zeigt Skills mit der groessten Uneinigkeit zwischen Teilnehmenden
 * (max - min). Nennt die staerkste und schwaechste Person je Skill, damit
 * im Workshop direkt sichtbar wird, wer sich bei wem Unterstuetzung holen
 * koennte.
 */
function SpreadList({
  items,
  participants,
  emptyText,
  showNames,
}: {
  items: SkillAnalysis[];
  participants: Participant[];
  emptyText: string;
  showNames: boolean;
}) {
  return (
    <div className="rounded-xl border border-violet-200 bg-violet-50 p-5">
      <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-violet-900">
        Top 5 größte Uneinigkeit
      </h4>
      {items.length === 0 ? (
        <p className="text-sm text-gray-500">{emptyText}</p>
      ) : (
        <ol className="space-y-3">
          {items.map((item, i) => {
            const named = participants
              .map((p) => ({
                name: p.name || "?",
                level: p.ratings[item.skill.name],
              }))
              .filter(
                (r): r is { name: string; level: DreyfusLevel } =>
                  r.level !== undefined,
              )
              .sort((a, b) => a.level - b.level);
            const lowest = named[0];
            const highest = named[named.length - 1];
            return (
              <li
                key={item.skill.name}
                className="flex items-start justify-between gap-3"
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-xs font-bold text-slate-700">
                    {i + 1}
                  </span>
                  <div>
                    <span className="text-sm font-medium">
                      {item.skill.name}
                    </span>
                    <span className="ml-2 text-xs text-gray-500">
                      {item.category}
                    </span>
                    {showNames && lowest && highest && (
                      <p className="mt-0.5 text-xs text-violet-700">
                        {highest.name} ({highest.level}) &rarr; {lowest.name}{" "}
                        ({lowest.level})
                      </p>
                    )}
                  </div>
                </div>
                <span
                  className="shrink-0 rounded bg-white/70 px-1.5 py-0.5 text-[10px] font-semibold text-violet-800"
                  title="Differenz zwischen hoechster und niedrigster Bewertung"
                >
                  Δ {item.spread}
                </span>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}

const THRESHOLD_STYLES: {
  test: (share: number) => boolean;
  label: string;
  className: string;
}[] = [
  { test: (s) => s >= 1, label: "Team-Blindstelle", className: "bg-red-500 text-white" },
  { test: (s) => s >= 0.7, label: "Mehrheits-Lücke", className: "bg-orange-400 text-white" },
  { test: (s) => s >= 0.5, label: "Geteiltes Bild", className: "bg-yellow-300 text-gray-900" },
];

/**
 * Anteil der Gruppe unterhalb einer Schwelle, relativ statt absolut — damit
 * "alle" bei 3 von 3 genauso funktioniert wie bei 9 von 9. Beantwortet "wo
 * haben alle (oder fast alle) ein niedriges Level?" praeziser als der reine
 * Gruppendurchschnitt, der einzelne starke Auesreisser verschleiern kann.
 */
function ThresholdList({
  items,
  threshold,
  emptyText,
}: {
  items: ThresholdShare[];
  threshold: number;
  emptyText: string;
}) {
  const labels = stageLabelsFor();
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <h4 className="mb-1 text-sm font-bold uppercase tracking-wide text-slate-700">
        Team-Blindstellen &amp; Mehrheits-Lücken
      </h4>
      <p className="mb-3 text-xs text-gray-500">
        Anteil der Gruppe bei Stufe {threshold} ({labels[threshold as DreyfusLevel]}
        ) oder darunter — unabhängig von der Gruppengröße.
      </p>
      {items.length === 0 ? (
        <p className="text-sm text-gray-500">{emptyText}</p>
      ) : (
        <ul className="space-y-2">
          {items.map((x) => {
            const style =
              THRESHOLD_STYLES.find((s) => s.test(x.shareBelow)) ??
              THRESHOLD_STYLES[THRESHOLD_STYLES.length - 1];
            const pct = Math.round(x.shareBelow * 100);
            return (
              <li
                key={x.analysis.skill.name}
                className="flex items-center justify-between gap-3"
              >
                <div>
                  <span className="text-sm font-medium">
                    {x.analysis.skill.name}
                  </span>
                  <span className="ml-2 text-xs text-gray-500">
                    {x.analysis.category}
                  </span>
                </div>
                <span
                  className={`shrink-0 rounded px-2 py-0.5 text-[10px] font-semibold ${style.className}`}
                  title={`${pct}% der Bewertungen bei Stufe ${threshold} oder darunter`}
                >
                  {pct}% · {style.label}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

/**
 * Aggregierter Vergleich der Dimensionen (Kategorien) — ein Balken pro
 * Dimension statt pro Einzelskill, fuer den "was faellt als erstes auf"
 * Einstieg ins Auswertungsgespraech.
 */
function CategoryBarChart({ items }: { items: CategoryAverage[] }) {
  if (items.length === 0) return null;
  const scaleMax = 5;
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-700">
        Dimensionen im Vergleich
      </h4>
      <ul className="space-y-3">
        {items.map((c) => {
          const level = Math.round(c.avg) as DreyfusLevel;
          const fillClass = DREYFUS_COLORS[level].split(" ")[0];
          return (
            <li key={c.category}>
              <div className="mb-1 flex items-center justify-between text-xs">
                <span className="font-medium text-slate-700">
                  {c.category}
                </span>
                <span className="font-semibold text-slate-600">
                  {c.avg.toFixed(1)}
                </span>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-gray-100">
                <div
                  className={`h-full rounded-full ${fillClass}`}
                  style={{ width: `${(c.avg / scaleMax) * 100}%` }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const DEP_HEX: Record<DepClassification, string> = {
  Durable: "#10b981",
  Evolving: "#3b82f6",
  Perishable: "#f59e0b",
};

/**
 * Ist-Soll-Streudiagramm: X = Zielwert der Rolle (Relevanz-Proxy),
 * Y = aktuelles Gruppen-Niveau. Zeigt Prioritaet statt nur Bestandsaufnahme
 * — der Quadrant unten rechts (hoher Zielwert, niedriges Niveau) ist der
 * Handlungsdruck-Bereich. Nur Skills mit gesetztem Zielwert UND mindestens
 * einer Bewertung koennen eingezeichnet werden.
 */
function IstSollMatrix({ items }: { items: SkillAnalysis[] }) {
  const [hoveredName, setHoveredName] = useState<string | null>(null);
  const plottable = items.filter(
    (a) => typeof a.skill.targetLevel === "number" && a.ratings.length > 0,
  );

  if (plottable.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <h4 className="mb-2 text-sm font-bold uppercase tracking-wide text-slate-700">
          Ist-Soll-Matrix
        </h4>
        <p className="text-sm text-gray-500">
          Für diese Ansicht braucht es Skills mit Zielwert und mindestens
          einer Bewertung — aktuell keine vorhanden.
        </p>
      </div>
    );
  }

  const W = 560;
  const H = 400;
  const PAD = { top: 16, right: 16, bottom: 36, left: 36 };
  const plotW = W - PAD.left - PAD.right;
  const plotH = H - PAD.top - PAD.bottom;
  const xMin = 1;
  const xMax = 5;
  const yMin = 0;
  const yMax = 5;
  const xScale = (v: number) =>
    PAD.left + ((v - xMin) / (xMax - xMin)) * plotW;
  const yScale = (v: number) =>
    PAD.top + plotH - ((v - yMin) / (yMax - yMin)) * plotH;
  const xMid = 3;
  const yMid = 2.5;
  const hovered = plottable.find((a) => a.skill.name === hoveredName);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <h4 className="mb-1 text-sm font-bold uppercase tracking-wide text-slate-700">
        Ist-Soll-Matrix
      </h4>
      <p className="mb-3 text-xs text-gray-500">
        X: Zielwert der Rolle (Relevanz-Proxy) · Y: aktuelles Gruppen-Niveau ·
        Farbe: Haltbarkeit · Rand: Schlüsselkompetenz
      </p>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label="Ist-Soll-Matrix je Skill: Zielwert gegen aktuelles Niveau"
      >
        {/* Quadrant-Hintergruende */}
        <rect
          x={xScale(xMid)}
          y={PAD.top}
          width={xScale(xMax) - xScale(xMid)}
          height={yScale(yMid) - PAD.top}
          fill="#fef2f2"
        />
        <rect
          x={xScale(xMid)}
          y={yScale(yMid)}
          width={xScale(xMax) - xScale(xMid)}
          height={PAD.top + plotH - yScale(yMid)}
          fill="#ecfdf5"
        />
        <rect
          x={PAD.left}
          y={PAD.top}
          width={xScale(xMid) - PAD.left}
          height={plotH}
          fill="#f8fafc"
        />
        {/* Quadrant-Beschriftung */}
        <text
          x={xScale(xMax) - 6}
          y={PAD.top + 14}
          textAnchor="end"
          className="fill-red-700"
          fontSize="11"
          fontWeight="600"
        >
          Handlungsdruck
        </text>
        <text
          x={xScale(xMax) - 6}
          y={PAD.top + plotH - 8}
          textAnchor="end"
          className="fill-emerald-700"
          fontSize="11"
          fontWeight="600"
        >
          Stärke genutzt
        </text>
        <text
          x={xScale(xMin) + 6}
          y={PAD.top + 14}
          textAnchor="start"
          className="fill-slate-400"
          fontSize="11"
        >
          unkritisch
        </text>
        <text
          x={xScale(xMin) + 6}
          y={PAD.top + plotH - 8}
          textAnchor="start"
          className="fill-slate-500"
          fontSize="11"
        >
          ungenutztes Potenzial
        </text>
        {/* Divider */}
        <line
          x1={xScale(xMid)}
          y1={PAD.top}
          x2={xScale(xMid)}
          y2={PAD.top + plotH}
          stroke="#cbd5e1"
          strokeDasharray="3,3"
        />
        <line
          x1={PAD.left}
          y1={yScale(yMid)}
          x2={PAD.left + plotW}
          y2={yScale(yMid)}
          stroke="#cbd5e1"
          strokeDasharray="3,3"
        />
        {/* Achsen */}
        <line
          x1={PAD.left}
          y1={PAD.top + plotH}
          x2={PAD.left + plotW}
          y2={PAD.top + plotH}
          stroke="#94a3b8"
        />
        <line
          x1={PAD.left}
          y1={PAD.top}
          x2={PAD.left}
          y2={PAD.top + plotH}
          stroke="#94a3b8"
        />
        {[1, 2, 3, 4, 5].map((v) => (
          <text
            key={`x${v}`}
            x={xScale(v)}
            y={PAD.top + plotH + 16}
            textAnchor="middle"
            fontSize="10"
            className="fill-slate-500"
          >
            {v}
          </text>
        ))}
        {[0, 1, 2, 3, 4, 5].map((v) => (
          <text
            key={`y${v}`}
            x={PAD.left - 8}
            y={yScale(v) + 3}
            textAnchor="end"
            fontSize="10"
            className="fill-slate-500"
          >
            {v}
          </text>
        ))}
        <text
          x={PAD.left + plotW / 2}
          y={H - 4}
          textAnchor="middle"
          fontSize="10"
          className="fill-slate-500"
        >
          Zielwert (Relevanz)
        </text>
        <text
          x={12}
          y={PAD.top + plotH / 2}
          textAnchor="middle"
          fontSize="10"
          className="fill-slate-500"
          transform={`rotate(-90 12 ${PAD.top + plotH / 2})`}
        >
          Ø Gruppen-Niveau
        </text>
        {/* Punkte */}
        {plottable.map((a) => {
          const isHovered = a.skill.name === hoveredName;
          return (
            <circle
              key={a.skill.name}
              cx={xScale(a.skill.targetLevel as number)}
              cy={yScale(a.avg)}
              r={a.skill.keySkill ? 7 : 5}
              fill={DEP_HEX[a.skill.dep]}
              stroke={a.skill.keySkill ? "#1e293b" : "#ffffff"}
              strokeWidth={a.skill.keySkill ? 2 : 1}
              opacity={hoveredName && !isHovered ? 0.35 : 0.9}
              tabIndex={0}
              onMouseEnter={() => setHoveredName(a.skill.name)}
              onMouseLeave={() => setHoveredName(null)}
              onFocus={() => setHoveredName(a.skill.name)}
              onBlur={() => setHoveredName(null)}
              style={{ cursor: "pointer" }}
            >
              <title>
                {a.skill.name}: Ziel {a.skill.targetLevel}, Ø{" "}
                {a.avg.toFixed(1)}
              </title>
            </circle>
          );
        })}
      </svg>
      <div className="mt-2 min-h-[2.25rem] rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs">
        {hovered ? (
          <>
            <span className="font-semibold">{hovered.skill.name}</span> —
            Ziel {hovered.skill.targetLevel}, Ø {hovered.avg.toFixed(1)}
            {hovered.skill.keySkill && (
              <span className="ml-1 text-amber-600">★ Schlüssel</span>
            )}
          </>
        ) : (
          <span className="text-slate-400">
            Punkt auswählen für Details.
          </span>
        )}
      </div>
      <div className="mt-3 flex flex-wrap gap-3 text-xs text-gray-600">
        {(["Durable", "Evolving", "Perishable"] as const).map((d) => (
          <span key={d} className="flex items-center gap-1.5">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ background: DEP_HEX[d] }}
            />
            {d}
          </span>
        ))}
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full border-2 border-slate-800 bg-white" />
          ★ Schlüsselkompetenz
        </span>
      </div>
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
  const [depFilter, setDepFilter] = useState<DepClassification | "all">(
    "all",
  );
  // Bewusst standardmaessig aus: eine kuratierte "wer ist unten"-Liste ist
  // zugespitzter als die ohnehin sichtbare Matrix-Tabelle und sollte nur
  // gezeigt werden, wenn im Team eine entsprechende Vertrauensbasis da ist.
  const [showSpreadNames, setShowSpreadNames] = useState(false);

  const analysis = useMemo(
    () => computeAnalysis(categories, participants),
    [categories, participants],
  );
  // DEP-Filter wirkt nur auf die Live-Ansicht (Tabelle + Top-Listen), nicht
  // auf PDF-/Excel-Export — der Export bleibt bewusst vollstaendig.
  const filteredAnalysis = useMemo(
    () => (depFilter === "all" ? analysis : filterByDep(analysis, depFilter)),
    [analysis, depFilter],
  );
  const topDev = useMemo(
    () => topDevelopmentAreas(filteredAnalysis, 5),
    [filteredAnalysis],
  );
  const topStr = useMemo(
    () => topStrengths(filteredAnalysis, 5),
    [filteredAnalysis],
  );
  const topSpreadItems = useMemo(
    () => topSpread(filteredAnalysis, 5),
    [filteredAnalysis],
  );
  const blindspotItems = useMemo(
    () => shareBelowThreshold(filteredAnalysis, 2, 0.5),
    [filteredAnalysis],
  );
  const categoryAvgItems = useMemo(
    () => categoryAverages(filteredAnalysis),
    [filteredAnalysis],
  );

  // ANF-17: Zukunftsperspektive wird ueber den Skill-Trend abgebildet, nicht
  // ueber eine separate Kategorie. Wir zeigen einen Auswertungs-Block fuer
  // Skills mit Trend "stark steigend" oder "steigend".
  const trendingAnalysis = useMemo(
    () => filterByTrend(filteredAnalysis, ["stark steigend", "steigend"]),
    [filteredAnalysis],
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
            {([0, 1, 2, 3, 4, 5] as const).map((l) => (
              <span
                key={l}
                className={`rounded px-2 py-0.5 ${DREYFUS_COLORS[l]}`}
              >
                {l} {stageLabelsFor()[l]}
              </span>
            ))}
          </div>
        </div>

        <div className="no-print flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 rounded-lg border border-gray-300 bg-white p-1 text-xs font-medium">
            {(["all", "Durable", "Evolving", "Perishable"] as const).map(
              (d) => (
                <button
                  key={d}
                  onClick={() => setDepFilter(d)}
                  className={`rounded px-2 py-1.5 transition ${
                    depFilter === d
                      ? "bg-slate-800 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                  title={
                    d === "all"
                      ? "Alle Haltbarkeitsklassen anzeigen"
                      : `Nur ${d}-Skills anzeigen`
                  }
                >
                  {d === "all" ? "Alle" : d}
                </button>
              ),
            )}
          </div>
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

      {/* Einstieg: Ueberblick vor dem Detail — "was faellt als erstes auf" */}
      <div className="mb-8 grid gap-6 lg:grid-cols-2">
        <CategoryBarChart items={categoryAvgItems} />
        <IstSollMatrix items={filteredAnalysis} />
      </div>

      {categories
        .filter(
          (cat) =>
            depFilter === "all" ||
            cat.skills.some((s) => s.dep === depFilter),
        )
        .map((cat) => (
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
                  if (depFilter !== "all" && skill.dep !== depFilter)
                    return null;
                  const ratings = participants.map(
                    (p) => p.ratings[skill.name],
                  );
                  const rated = ratings.filter(
                    (r): r is DreyfusLevel => r !== undefined,
                  );
                  const avg =
                    rated.length > 0
                      ? rated.reduce((a: number, b) => a + b, 0) / rated.length
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
                        <span
                          className={`ml-2 rounded border px-1.5 py-0.5 text-[10px] font-medium ${DEP_COLORS[skill.dep]}`}
                        >
                          {skill.dep}
                        </span>
                      </td>
                      {showIndividual &&
                        ratings.map((r, i) => (
                          <td key={i} className="px-2 py-2 text-center">
                            <LevelBadge level={r} />
                          </td>
                        ))}
                      <td className="px-2 py-2 text-center">
                        <AverageBadge avg={avg} hasData={rated.length > 0} />
                      </td>
                      <td className="px-2 py-2 text-center">
                        <span className="print:hidden">
                          <EditableTargetCell
                            level={target}
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

      <div className="mb-8 grid gap-6 lg:grid-cols-2">
        <div>
          <label className="no-print mb-2 flex items-center gap-2 text-xs font-medium text-gray-600">
            <input
              type="checkbox"
              checked={showSpreadNames}
              onChange={(e) => setShowSpreadNames(e.target.checked)}
              className="h-3.5 w-3.5 rounded border-gray-300 text-violet-700 focus:ring-violet-400"
            />
            Namen zeigen (nur mit Vertrauensbasis im Team einsetzen)
          </label>
          <SpreadList
            items={topSpreadItems}
            participants={participants}
            emptyText="Keine Skills mit unterschiedlichen Bewertungen zwischen den Teilnehmenden."
            showNames={showSpreadNames}
          />
        </div>
        <ThresholdList
          items={blindspotItems}
          threshold={2}
          emptyText="Keine Skills, bei denen mindestens die Haelfte der Gruppe bei Stufe 2 oder darunter liegt."
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
