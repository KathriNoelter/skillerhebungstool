import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import type {
  Role,
  Group,
  Skill,
  DepClassification,
  DreyfusAnchorLevel,
  SkillAnchors,
  RelevanceTrend,
  MarketDriver,
  EvaluationModel,
} from "../types";
import {
  TREND_LABELS,
  TREND_VALUES,
  TREND_COLORS,
  evaluationModelFor,
  stageLabelsFor,
} from "../types";
import { exportSkillInventoryPdf } from "../lib/pdfExport";

interface Props {
  department: Role;

  customSkills: Record<string, Skill[]>;
  disabledBaseSkills: Set<string>;
  renamedBaseSkills: Set<string>;
  baseSkillOverrides: Record<string, DepClassification>;
  baseSkillCategoryOverrides: Record<string, string>;
  skillDescriptionOverrides: Record<string, string>;
  skillTargetOverrides: Record<string, DreyfusAnchorLevel | null>;
  skillAnchorsOverrides: Record<string, SkillAnchors>;
  skillTrendOverrides: Record<string, RelevanceTrend | null>;
  skillTrendgrundOverrides: Record<string, string>;
  skillModelOverrides: Record<string, EvaluationModel | null>;
  skillKeyOverrides: Record<string, boolean | null>;
  skillLastModifiedOverrides: Record<string, string>;

  onAddCustomSkill: (category: string, skill: Skill) => void;
  onToggleDisableSkill: (
    category: string,
    skillName: string,
    isCustom: boolean,
  ) => void;
  onDeleteSkill: (
    category: string,
    skillName: string,
    isCustom: boolean,
  ) => void;
  onRenameSkill: (oldName: string, newName: string) => void;
  onChangeBaseSkillDep: (skillName: string, dep: DepClassification) => void;
  onChangeCustomSkillDep: (
    category: string,
    skillName: string,
    dep: DepClassification,
  ) => void;
  onMoveBaseSkill: (skillName: string, toCategory: string) => void;
  onMoveCustomSkill: (
    fromCategory: string,
    skillName: string,
    toCategory: string,
  ) => void;
  onEditSkillDescription: (skillName: string, description: string) => void;
  onEditSkillTarget: (
    skillName: string,
    target: DreyfusAnchorLevel | null,
  ) => void;
  onEditSkillAnchor: (
    skillName: string,
    level: DreyfusAnchorLevel,
    text: string,
  ) => void;
  onEditSkillTrend: (skillName: string, trend: RelevanceTrend | null) => void;
  onEditSkillTrendgrund: (skillName: string, trendgrund: string) => void;
  onEditSkillModel: (
    skillName: string,
    model: EvaluationModel | null,
  ) => void;
  onEditSkillKey: (skillName: string, isKey: boolean) => void;

  // ANF-15 — Markt- & Kundentreiber je Rollengruppe.
  currentGroup: Group | null;
  groupDrivers: MarketDriver[];
  onSetGroupDrivers: (groupId: string, drivers: MarketDriver[]) => void;

  onProceed: () => void;
  onBack: () => void;
}

const ANCHOR_LEVELS: DreyfusAnchorLevel[] = [1, 2, 3, 4, 5];

type TabId = "skills" | "drivers";

/**
 * ANF-17: Trend-Filter — alle Skills sind nach Trend filterbar.
 * "all" = keine Filterung; "none" = Skills ohne Trend.
 */
type TrendFilter = "all" | RelevanceTrend | "none";

function newDriverId(): string {
  return `drv-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function DepSelect({
  value,
  disabled,
  onChange,
}: {
  value: DepClassification;
  disabled?: boolean;
  onChange: (v: DepClassification) => void;
}) {
  const classes =
    value === "Durable"
      ? "border-emerald-200 bg-emerald-50 text-emerald-800"
      : value === "Evolving"
        ? "border-blue-200 bg-blue-50 text-blue-800"
        : "border-amber-200 bg-amber-50 text-amber-800";
  return (
    <select
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value as DepClassification)}
      className={`rounded-full border px-2.5 py-0.5 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-slate-300 disabled:opacity-50 ${classes}`}
    >
      <option value="Durable">Durable</option>
      <option value="Evolving">Evolving</option>
      <option value="Perishable">Perishable</option>
    </select>
  );
}

function TargetSelect({
  value,
  model,
  disabled,
  onChange,
}: {
  value: DreyfusAnchorLevel | undefined;
  model: EvaluationModel;
  disabled?: boolean;
  onChange: (v: DreyfusAnchorLevel | null) => void;
}) {
  const labels = stageLabelsFor(model);
  const setClass = typeof value === "number"
    ? "border-slate-300 bg-slate-50 text-slate-800 font-semibold"
    : "border-dashed border-gray-300 bg-white text-gray-400";
  return (
    <select
      value={value ?? ""}
      disabled={disabled}
      onChange={(e) => {
        const v = e.target.value;
        onChange(v ? (Number(v) as DreyfusAnchorLevel) : null);
      }}
      onClick={(e) => e.stopPropagation()}
      title={
        typeof value === "number"
          ? `Zielwert: ${value} — ${labels[value]} (${model} 1–5)`
          : `Zielwert setzen (${model} 1–5)`
      }
      className={`rounded border px-1.5 py-0.5 text-xs focus:outline-none focus:ring-1 focus:ring-slate-300 disabled:opacity-50 ${setClass}`}
    >
      <option value="">— Ziel</option>
      {ANCHOR_LEVELS.map((l) => (
        <option key={l} value={l}>
          Ziel {l} — {labels[l]}
        </option>
      ))}
    </select>
  );
}

function MoveSelect({
  current,
  targets,
  disabled,
  onMove,
}: {
  current: string;
  targets: string[];
  disabled?: boolean;
  onMove: (target: string) => void;
}) {
  const others = targets.filter((t) => t !== current);
  if (others.length === 0) return null;
  return (
    <select
      value=""
      disabled={disabled}
      onChange={(e) => {
        const v = e.target.value;
        if (!v) return;
        onMove(v);
        e.currentTarget.value = "";
      }}
      title="In andere Dimension verschieben"
      className="max-w-[9rem] truncate rounded border border-gray-200 bg-white px-1.5 py-0.5 text-xs text-gray-500 hover:border-slate-300 hover:text-slate-700 focus:outline-none focus:ring-1 focus:ring-slate-300 disabled:opacity-50"
    >
      <option value="">↗ Verschieben…</option>
      {others.map((t) => (
        <option key={t} value={t}>
          → {t}
        </option>
      ))}
    </select>
  );
}

/** Inline-Rename-Editor: zeigt Skill-Namen oder ein Input mit Save / Cancel. */
function RenameableSkillName({
  skill,
  onRename,
  isDisabled,
}: {
  skill: Skill;
  onRename: (oldName: string, newName: string) => void;
  isDisabled: boolean;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(skill.name);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  const start = () => {
    setDraft(skill.name);
    setEditing(true);
  };
  const cancel = () => {
    setDraft(skill.name);
    setEditing(false);
  };
  const save = () => {
    const next = draft.trim();
    if (!next || next === skill.name) {
      cancel();
      return;
    }
    onRename(skill.name, next);
    setEditing(false);
  };

  if (editing) {
    return (
      <div className="flex items-center gap-1">
        <input
          ref={inputRef}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") save();
            if (e.key === "Escape") cancel();
          }}
          onClick={(e) => e.stopPropagation()}
          className="rounded border border-slate-400 bg-white px-2 py-0.5 text-sm focus:border-slate-600 focus:outline-none focus:ring-1 focus:ring-slate-300"
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            save();
          }}
          className="rounded bg-slate-800 px-2 py-0.5 text-[11px] font-medium text-white hover:bg-slate-700"
          title="Speichern"
        >
          ✓
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            cancel();
          }}
          className="rounded border border-gray-300 bg-white px-2 py-0.5 text-[11px] font-medium text-gray-600 hover:bg-gray-50"
          title="Abbrechen"
        >
          ✕
        </button>
      </div>
    );
  }
  return (
    <span className="flex items-center gap-1.5">
      <span
        className={`truncate text-sm ${
          isDisabled ? "text-gray-400 line-through" : "text-gray-700"
        }`}
      >
        {skill.name}
      </span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          start();
        }}
        className="text-gray-300 transition hover:text-slate-600"
        title="Skill umbenennen"
      >
        <svg
          className="h-3.5 w-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
      </button>
    </span>
  );
}

function SkillDetailEditor({
  skill,
  categoryName,
  onEditDescription,
  onEditTarget,
  onEditAnchor,
  onEditTrend,
  onEditTrendgrund,
  onEditModel,
  onEditKey,
}: {
  skill: Skill;
  categoryName: string;
  onEditDescription: (text: string) => void;
  onEditTarget: (level: DreyfusAnchorLevel | null) => void;
  onEditAnchor: (level: DreyfusAnchorLevel, text: string) => void;
  onEditTrend: (trend: RelevanceTrend | null) => void;
  onEditTrendgrund: (text: string) => void;
  onEditModel: (model: EvaluationModel | null) => void;
  onEditKey: (isKey: boolean) => void;
}) {
  const effectiveModel = evaluationModelFor(skill, categoryName);
  const labels = stageLabelsFor(effectiveModel);
  const isAuto = !skill.bewertungsmodell;
  const defaultModel: EvaluationModel =
    categoryName === "Fachkompetenz" ? "Bloom" : "Dreyfus";

  // Local draft state prevents textarea content from being cleared by re-renders
  // that are triggered by unrelated state updates (e.g. bumpLastModified).
  const [descDraft, setDescDraft] = useState(skill.description ?? "");
  const [trendgrundDraft, setTrendgrundDraft] = useState(
    skill.trendgrund ?? "",
  );
  const [anchorDrafts, setAnchorDrafts] = useState<Record<number, string>>(
    () => {
      const init: Record<number, string> = {};
      for (const l of ANCHOR_LEVELS) init[l] = skill.anchors?.[l] ?? "";
      return init;
    },
  );

  // Sync local drafts when the external value changes from outside this component
  // (e.g. AI fill-in or opening a different skill's panel).
  useEffect(() => {
    setDescDraft(skill.description ?? "");
  }, [skill.description]);

  useEffect(() => {
    setTrendgrundDraft(skill.trendgrund ?? "");
  }, [skill.trendgrund]);

  // skill.anchors is the exact object reference from skillAnchorsOverrides — it
  // only changes when anchors are updated, so this effect only fires then.
  const anchors = skill.anchors;
  useEffect(() => {
    setAnchorDrafts((prev) => {
      const next = { ...prev };
      let changed = false;
      for (const l of ANCHOR_LEVELS) {
        const ext = anchors?.[l] ?? "";
        if (ext !== prev[l]) {
          next[l] = ext;
          changed = true;
        }
      }
      return changed ? next : prev;
    });
  }, [anchors]);

  return (
    <div className="space-y-4 border-t border-gray-100 bg-gray-50/70 px-4 py-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <label className="flex cursor-pointer items-center gap-2 text-xs font-medium text-slate-700">
          <input
            type="checkbox"
            checked={!!skill.keySkill}
            onChange={(e) => onEditKey(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-amber-500 focus:ring-amber-300"
          />
          <span className="inline-flex items-center gap-1">
            <span className="text-amber-500">★</span>
            Schluesselkompetenz fuer diese Rolle
          </span>
        </label>
        {skill.lastModified && (
          <span className="text-[10px] text-gray-400">
            Zuletzt geaendert: {skill.lastModified}
          </span>
        )}
      </div>
      <div>
        <label className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">
          Skill-Steckbrief
        </label>
        <textarea
          value={descDraft}
          onChange={(e) => {
            setDescDraft(e.target.value);
            onEditDescription(e.target.value);
          }}
          rows={3}
          placeholder="Was umfasst der Skill — und was explizit nicht? 2–3 typische Taetigkeiten fuer diese Rolle."
          className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-200"
        />
        <p className="mt-1 text-[10px] text-gray-400">
          Zweck: gemeinsames Verstaendnis vor der Selbsteinschaetzung.
        </p>
      </div>
      <div>
        <label className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">
          Relevanztrend (Marktperspektive 0–5 Jahre)
        </label>
        <select
          value={skill.trend ?? ""}
          onChange={(e) => {
            const v = e.target.value;
            onEditTrend(v ? (v as RelevanceTrend) : null);
          }}
          className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-1.5 text-sm focus:border-slate-500 focus:outline-none"
        >
          <option value="">— kein Trend —</option>
          {TREND_VALUES.map((t) => (
            <option key={t} value={t}>
              {TREND_LABELS[t]}
            </option>
          ))}
        </select>
        <textarea
          value={trendgrundDraft}
          onChange={(e) => {
            setTrendgrundDraft(e.target.value);
            onEditTrendgrund(e.target.value);
          }}
          rows={2}
          placeholder='Optionale Begruendung des Trends (z. B. "getrieben durch GenAI-Adoption" oder "regulatorisch verpflichtend ab 2027").'
          className="mt-2 w-full rounded border border-gray-300 bg-white px-3 py-2 text-xs focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-200"
        />
        <p className="mt-1 text-[10px] text-gray-400">
          Trend ist konzeptionell getrennt von DEP — DEP = Halbwertszeit, Trend = Marktrelevanz.
        </p>
      </div>
      <div>
        <label className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">
          Bewertungsmodell
        </label>
        <select
          value={skill.bewertungsmodell ?? ""}
          onChange={(e) => {
            const v = e.target.value;
            onEditModel(v ? (v as EvaluationModel) : null);
          }}
          className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-1.5 text-sm focus:border-slate-500 focus:outline-none"
        >
          <option value="">
            Auto ({defaultModel} — Default fuer „{categoryName}")
          </option>
          <option value="Bloom">Bloom (Wissensentwicklung)</option>
          <option value="Dreyfus">Dreyfus (Handwerksstufen)</option>
        </select>
        <p className="mt-1 text-[10px] text-gray-400">
          {isAuto
            ? `Automatisch: ${effectiveModel}. Fachkompetenz nutzt Bloom (Erinnern → Erschaffen), alle anderen Dimensionen Dreyfus (Novice → Expert).`
            : `Modell explizit auf ${effectiveModel} gesetzt — Stufenbezeichnungen, Anker und Legende richten sich danach.`}
        </p>
      </div>
      <div>
        <label className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">
          Rollenspezifischer Zielwert ({effectiveModel} 1–5)
        </label>
        <select
          value={skill.targetLevel ?? ""}
          onChange={(e) => {
            const v = e.target.value;
            onEditTarget(v ? (Number(v) as DreyfusAnchorLevel) : null);
          }}
          className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-1.5 text-sm focus:border-slate-500 focus:outline-none"
        >
          <option value="">— kein Zielwert —</option>
          {ANCHOR_LEVELS.map((l) => (
            <option key={l} value={l}>
              {l} — {labels[l]}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">
          Verhaltensanker je Stufe ({effectiveModel}) — Kalibrierung fuer Teilnehmende
        </label>
        <div className="mt-1 space-y-1.5">
          {ANCHOR_LEVELS.map((level) => (
            <div key={level} className="flex items-start gap-2">
              <span className="mt-2 w-40 shrink-0 text-[11px] font-semibold text-gray-600">
                {level} — {labels[level]}
              </span>
              <textarea
                value={anchorDrafts[level] ?? ""}
                onChange={(e) => {
                  const val = e.target.value;
                  setAnchorDrafts((prev) => ({ ...prev, [level]: val }));
                  onEditAnchor(level, val);
                }}
                rows={2}
                placeholder={`Kurzes Verhalten auf Stufe ${level} (1–2 Saetze).`}
                className="flex-1 rounded border border-gray-300 bg-white px-2 py-1 text-xs focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-200"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface CategoryBlockSkillItem {
  skill: Skill;
  isCustom: boolean;
  isDisabled: boolean;
  onChangeDep: (dep: DepClassification) => void;
  onMove?: (target: string) => void;
  onRename: (oldName: string, newName: string) => void;
  onToggleDisable: () => void;
  onDelete: () => void;
  onEditDescription?: (text: string) => void;
  onEditTarget?: (level: DreyfusAnchorLevel | null) => void;
  onEditAnchor?: (level: DreyfusAnchorLevel, text: string) => void;
  onEditTrend?: (trend: RelevanceTrend | null) => void;
  onEditTrendgrund?: (text: string) => void;
  onEditModel?: (model: EvaluationModel | null) => void;
  onEditKey?: (isKey: boolean) => void;
}

interface CategoryBlockProps {
  name: string;
  skills: CategoryBlockSkillItem[];
  /** Total before trend filter — shown next to the header. */
  totalCount: number;
  onAddSkill: (skill: Skill) => void;
  emptyText?: string;
  customLabel?: string;
  targetCategories?: string[];
  filterActive?: boolean;
}

function CategoryBlock(props: CategoryBlockProps) {
  const {
    name,
    skills,
    totalCount,
    onAddSkill,
    emptyText = "Keine Skills in dieser Kategorie.",
    customLabel = "custom",
    targetCategories,
    filterActive = false,
  } = props;
  const [newName, setNewName] = useState("");
  const [newDep, setNewDep] = useState<DepClassification>("Durable");
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const toggleExpanded = (skillName: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(skillName)) next.delete(skillName);
      else next.add(skillName);
      return next;
    });
  };

  const handleAdd = () => {
    const trimmed = newName.trim();
    if (trimmed.length < 2) return;
    onAddSkill({ name: trimmed, dep: newDep });
    setNewName("");
    setNewDep("Durable");
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-100 px-6 py-3">
        <span className="text-sm font-bold uppercase tracking-wide text-slate-600">
          {name}
        </span>
        <span className="ml-2 text-xs text-gray-400">
          ({filterActive
            ? `${skills.length}/${totalCount} sichtbar`
            : `${totalCount} Skills`})
        </span>
      </div>
      <div className="divide-y divide-gray-50 px-6">
        {skills.length === 0 && (
          <p className="py-3 text-xs italic text-gray-400">
            {filterActive
              ? "Kein Skill in dieser Dimension passt zum aktiven Filter."
              : emptyText}
          </p>
        )}
        {skills.map((item) => {
          const {
            skill,
            isCustom,
            isDisabled,
            onChangeDep,
            onMove,
            onRename,
            onToggleDisable,
            onDelete,
            onEditDescription,
            onEditTarget,
            onEditAnchor,
            onEditTrend,
            onEditTrendgrund,
            onEditModel,
            onEditKey,
          } = item;
          const isOpen = expanded.has(skill.name);
          const canEdit = !!(
            onEditDescription &&
            onEditTarget &&
            onEditAnchor &&
            onEditTrend &&
            onEditTrendgrund &&
            onEditModel &&
            onEditKey
          );
          const hasData = !!(
            skill.description ||
            skill.targetLevel ||
            (skill.anchors && Object.keys(skill.anchors).length > 0) ||
            skill.trend ||
            skill.bewertungsmodell ||
            skill.keySkill
          );
          const effectiveModel = evaluationModelFor(skill, name);
          return (
            <div
              key={skill.name}
              className={isDisabled ? "opacity-60" : undefined}
            >
              <div className="flex items-center justify-between gap-2 py-2">
                <div className="flex min-w-0 flex-1 items-center gap-2">
                  {canEdit && (
                    <button
                      onClick={() => toggleExpanded(skill.name)}
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded text-gray-400 transition hover:bg-gray-100 hover:text-slate-700 ${
                        isOpen ? "rotate-90" : ""
                      }`}
                      title={
                        isOpen
                          ? "Steckbrief schliessen"
                          : "Steckbrief / Ziel / Anker bearbeiten"
                      }
                    >
                      <svg
                        className="h-3 w-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  )}
                  <div className="min-w-0 flex-1 text-sm">
                    <RenameableSkillName
                      skill={skill}
                      onRename={onRename}
                      isDisabled={isDisabled}
                    />
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {skill.keySkill && (
                      <span
                        className="rounded border border-amber-200 bg-amber-50 px-1.5 py-0.5 text-[10px] font-semibold text-amber-700"
                        title="Schluesselkompetenz fuer diese Rolle"
                      >
                        ★ Schluessel
                      </span>
                    )}
                    {isDisabled && (
                      <span
                        className="rounded border border-gray-300 bg-gray-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-gray-600"
                        title="In Selbsteinschaetzung & Auswertung ausgeblendet — Bewertungen bleiben erhalten."
                      >
                        deaktiviert
                      </span>
                    )}
                    {isCustom && (
                      <span className="rounded bg-indigo-100 px-1.5 py-0.5 text-[10px] font-medium uppercase text-indigo-700">
                        {customLabel}
                      </span>
                    )}
                    {canEdit && hasData && !isOpen && (
                      <span
                        className="rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] font-medium uppercase text-emerald-700"
                        title="Steckbrief / Ziel / Anker hinterlegt"
                      >
                        ✓ Steckbrief
                      </span>
                    )}
                    {canEdit && skill.trend && (
                      <span
                        className={`rounded border px-1.5 py-0.5 text-[10px] font-medium ${TREND_COLORS[skill.trend]}`}
                        title={
                          skill.trendgrund
                            ? `Relevanztrend: ${TREND_LABELS[skill.trend]} — ${skill.trendgrund}`
                            : `Relevanztrend: ${TREND_LABELS[skill.trend]}`
                        }
                      >
                        {TREND_LABELS[skill.trend]}
                      </span>
                    )}
                    {canEdit && (
                      <span
                        className={`rounded border px-1.5 py-0.5 text-[10px] font-medium ${
                          effectiveModel === "Bloom"
                            ? "border-purple-200 bg-purple-50 text-purple-800"
                            : "border-slate-200 bg-slate-50 text-slate-700"
                        }`}
                        title={
                          skill.bewertungsmodell
                            ? `Bewertungsmodell: ${effectiveModel} (explizit gesetzt)`
                            : `Bewertungsmodell: ${effectiveModel} (Default fuer „${name}")`
                        }
                      >
                        {effectiveModel}
                        {!skill.bewertungsmodell && (
                          <span className="ml-0.5 text-gray-400">·auto</span>
                        )}
                      </span>
                    )}
                    {skill.lastModified && (
                      <span
                        className="text-[10px] text-gray-400"
                        title="Datum der letzten redaktionellen Aenderung"
                      >
                        {skill.lastModified}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {canEdit && onEditTarget && (
                    <TargetSelect
                      value={skill.targetLevel}
                      model={effectiveModel}
                      disabled={isDisabled}
                      onChange={onEditTarget}
                    />
                  )}
                  <DepSelect
                    value={skill.dep}
                    disabled={isDisabled}
                    onChange={onChangeDep}
                  />
                  {onMove &&
                    targetCategories &&
                    targetCategories.length > 1 && (
                      <MoveSelect
                        current={name}
                        targets={targetCategories}
                        disabled={isDisabled}
                        onMove={onMove}
                      />
                    )}
                  <button
                    onClick={onToggleDisable}
                    className={`text-gray-300 transition ${
                      isDisabled
                        ? "hover:text-emerald-500"
                        : "hover:text-amber-500"
                    }`}
                    title={
                      isDisabled
                        ? "Skill reaktivieren"
                        : "Skill deaktivieren (Bewertungen bleiben erhalten)"
                    }
                  >
                    {isDisabled ? (
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 12a8 8 0 1116 0 8 8 0 01-16 0z M9 12l2 2 4-4"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728A9 9 0 015.636 5.636"
                        />
                      </svg>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      const ok = window.confirm(
                        `"${skill.name}" endgueltig entfernen?\n\nBewertungen, Verhaltensanker und Driver-Verlinkungen werden mitgeloescht. Diese Aktion ist nicht rueckgaengig zu machen — verwende stattdessen "Deaktivieren", wenn du den Skill spaeter wiederherstellen moechtest.`,
                      );
                      if (ok) onDelete();
                    }}
                    className="text-gray-300 transition hover:text-red-600"
                    title="Skill endgueltig loeschen"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M9 7V4a2 2 0 012-2h2a2 2 0 012 2v3"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              {isOpen && canEdit && (
                <SkillDetailEditor
                  skill={skill}
                  categoryName={name}
                  onEditDescription={onEditDescription!}
                  onEditTarget={onEditTarget!}
                  onEditAnchor={onEditAnchor!}
                  onEditTrend={onEditTrend!}
                  onEditTrendgrund={onEditTrendgrund!}
                  onEditModel={onEditModel!}
                  onEditKey={onEditKey!}
                />
              )}
            </div>
          );
        })}
      </div>
      <div className="border-t border-gray-100 bg-gray-50 px-6 py-3">
        <div className="flex items-center gap-2">
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAdd();
            }}
            placeholder="Neuen Skill hinzufuegen..."
            className="flex-1 rounded border border-gray-300 px-3 py-1.5 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-200"
          />
          <select
            value={newDep}
            onChange={(e) => setNewDep(e.target.value as DepClassification)}
            className="rounded border border-gray-300 px-2 py-1.5 text-sm focus:border-slate-500 focus:outline-none"
          >
            <option value="Durable">Durable</option>
            <option value="Evolving">Evolving</option>
            <option value="Perishable">Perishable</option>
          </select>
          <button
            onClick={handleAdd}
            disabled={newName.trim().length < 2}
            className="rounded bg-slate-800 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-slate-700 disabled:opacity-40"
          >
            + Hinzufuegen
          </button>
        </div>
      </div>
    </div>
  );
}

// -------------------- Markttreiber-Panel (ANF-15) --------------------

interface MarketDriversPanelProps {
  group: Group | null;
  drivers: MarketDriver[];
  onSetDrivers: (drivers: MarketDriver[]) => void;
}

function MarketDriversPanel({
  group,
  drivers,
  onSetDrivers,
}: MarketDriversPanelProps) {
  if (!group) {
    return (
      <p className="text-sm text-gray-500">
        Markttreiber sind an die Rollengruppe gekoppelt — bitte zuerst eine
        Gruppe und Rolle auswaehlen.
      </p>
    );
  }

  const skillOptions = (() => {
    const map = new Map<string, { name: string; roles: Set<string> }>();
    for (const role of group.roles) {
      for (const cat of role.categories) {
        for (const skill of cat.skills) {
          const entry = map.get(skill.name) ?? {
            name: skill.name,
            roles: new Set<string>(),
          };
          entry.roles.add(role.name);
          map.set(skill.name, entry);
        }
      }
    }
    return Array.from(map.values()).sort((a, b) =>
      a.name.localeCompare(b.name, "de"),
    );
  })();

  const updateDriver = (id: string, patch: Partial<MarketDriver>) => {
    onSetDrivers(
      drivers.map((d) => (d.id === id ? { ...d, ...patch } : d)),
    );
  };

  const removeDriver = (id: string) => {
    onSetDrivers(drivers.filter((d) => d.id !== id));
  };

  const addDriver = () => {
    onSetDrivers([
      ...drivers,
      {
        id: newDriverId(),
        title: "",
        horizon: "0–2 Jahre",
        description: "",
        affectedSkillNames: [],
      },
    ]);
  };

  const toggleAffectedSkill = (driverId: string, skillName: string) => {
    const driver = drivers.find((d) => d.id === driverId);
    if (!driver) return;
    const has = driver.affectedSkillNames.includes(skillName);
    updateDriver(driverId, {
      affectedSkillNames: has
        ? driver.affectedSkillNames.filter((n) => n !== skillName)
        : [...driver.affectedSkillNames, skillName],
    });
  };

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
        <p className="text-xs text-blue-900">
          <strong>Hinweis:</strong> Markttreiber gelten fuer die gesamte
          Rollengruppe <strong>{group.name}</strong> — sie sind ueber alle
          Rollen dieser Gruppe hinweg sichtbar und persistieren beim Wechsel
          der Rolle. Markttreiber erklaeren die strategische Richtung
          (Technologie, Regulatorik, Kundenbedarfe), nicht die konkreten
          Kompetenzantworten — diese leben am Skill (Trend) im Skills-Tab.
        </p>
      </div>

      {drivers.length === 0 && (
        <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-6 text-center">
          <p className="text-sm text-gray-600">
            Noch keine Markttreiber fuer <strong>{group.name}</strong> erfasst.
          </p>
          <p className="mt-1 text-xs text-gray-500">
            Erfasse externe Entwicklungen (Technologie, Regulatorik,
            Kundenbedarfe), die die Skill-Anforderungen dieser Rollengruppe
            veraendern.
          </p>
        </div>
      )}

      {drivers.map((driver, index) => (
        <div
          key={driver.id}
          className="rounded-xl border border-gray-200 bg-white shadow-sm"
        >
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-3">
            <span className="text-sm font-bold uppercase tracking-wide text-slate-600">
              Treiber #{index + 1}
            </span>
            <button
              onClick={() => removeDriver(driver.id)}
              className="text-xs text-gray-400 transition hover:text-red-500"
              title="Treiber entfernen"
            >
              Entfernen
            </button>
          </div>
          <div className="space-y-4 px-6 py-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto]">
              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                  Titel
                </label>
                <input
                  value={driver.title}
                  onChange={(e) =>
                    updateDriver(driver.id, { title: e.target.value })
                  }
                  placeholder="z. B. EU AI Act / verpflichtende KI-Governance"
                  className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-1.5 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-200"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                  Zeithorizont
                </label>
                <input
                  value={driver.horizon}
                  onChange={(e) =>
                    updateDriver(driver.id, { horizon: e.target.value })
                  }
                  placeholder="0–2 Jahre"
                  className="mt-1 w-40 rounded border border-gray-300 bg-white px-3 py-1.5 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-200"
                />
              </div>
            </div>
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                Beschreibung der externen Entwicklung
              </label>
              <textarea
                value={driver.description}
                onChange={(e) =>
                  updateDriver(driver.id, { description: e.target.value })
                }
                rows={3}
                placeholder="Welche externe Entwicklung (Technologie, Regulatorik, Kundenbedarf) veraendert die Skill-Anforderungen dieser Rollengruppe?"
                className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-200"
              />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                  Betroffene Skills aus dem Katalog
                </label>
                <span className="text-[11px] text-gray-400">
                  {driver.affectedSkillNames.length} ausgewaehlt
                </span>
              </div>
              {driver.affectedSkillNames.length > 0 && (
                <div className="mt-1 flex flex-wrap gap-1">
                  {driver.affectedSkillNames.map((name) => (
                    <span
                      key={name}
                      className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] text-slate-700"
                    >
                      {name}
                      <button
                        onClick={() => toggleAffectedSkill(driver.id, name)}
                        className="text-slate-400 hover:text-red-500"
                        title="Skill abwaehlen"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
              <div className="mt-2 max-h-56 overflow-y-auto rounded border border-gray-200 bg-white px-3 py-2 text-xs">
                {skillOptions.length === 0 && (
                  <p className="italic text-gray-400">
                    Keine Skills im Katalog dieser Rollengruppe.
                  </p>
                )}
                {skillOptions.map((opt) => {
                  const checked = driver.affectedSkillNames.includes(opt.name);
                  return (
                    <label
                      key={opt.name}
                      className="flex cursor-pointer items-start gap-2 py-0.5 hover:bg-gray-50"
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() =>
                          toggleAffectedSkill(driver.id, opt.name)
                        }
                        className="mt-0.5"
                      />
                      <span>
                        <span className="text-gray-700">{opt.name}</span>
                        <span className="ml-2 text-[10px] text-gray-400">
                          {Array.from(opt.roles).join(", ")}
                        </span>
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ))}

      <div>
        <button
          onClick={addDriver}
          className="rounded-lg bg-slate-800 px-4 py-2 text-xs font-semibold text-white shadow transition hover:bg-slate-700"
        >
          + Markttreiber hinzufuegen
        </button>
      </div>
    </div>
  );
}

// -------------------- Trend-Filter Pillen --------------------

const TREND_FILTER_OPTIONS: {
  value: TrendFilter;
  label: string;
}[] = [
  { value: "all", label: "Alle Trends" },
  { value: "stark steigend", label: TREND_LABELS["stark steigend"] },
  { value: "steigend", label: TREND_LABELS["steigend"] },
  { value: "stabil", label: TREND_LABELS["stabil"] },
  { value: "sinkend", label: TREND_LABELS["sinkend"] },
  { value: "none", label: "ohne Trend" },
];

function TrendFilterBar({
  value,
  onChange,
  trendCounts,
  showDisabled,
  onToggleShowDisabled,
  disabledCount,
}: {
  value: TrendFilter;
  onChange: (v: TrendFilter) => void;
  trendCounts: Record<TrendFilter, number>;
  showDisabled: boolean;
  onToggleShowDisabled: (v: boolean) => void;
  disabledCount: number;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">
        Trend-Filter:
      </span>
      {TREND_FILTER_OPTIONS.map((opt) => {
        const active = opt.value === value;
        const count = trendCounts[opt.value] ?? 0;
        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`rounded-full border px-2.5 py-0.5 text-xs font-medium transition ${
              active
                ? "border-slate-800 bg-slate-800 text-white"
                : "border-gray-300 bg-white text-gray-600 hover:border-slate-400 hover:text-slate-700"
            }`}
          >
            {opt.label}
            <span
              className={`ml-1.5 ${active ? "text-white/70" : "text-gray-400"}`}
            >
              ({count})
            </span>
          </button>
        );
      })}
      <span className="ml-auto" />
      <label className="flex cursor-pointer items-center gap-1.5 text-[11px] font-medium text-gray-600">
        <input
          type="checkbox"
          checked={showDisabled}
          onChange={(e) => onToggleShowDisabled(e.target.checked)}
          className="h-3.5 w-3.5 rounded border-gray-300 text-slate-700 focus:ring-slate-300"
        />
        Deaktivierte einblenden ({disabledCount})
      </label>
    </div>
  );
}

// -------------------- Main Component --------------------

export function SkillInventory(props: Props) {
  const {
    department,
    customSkills,
    disabledBaseSkills,
    renamedBaseSkills,
    baseSkillOverrides,
    baseSkillCategoryOverrides,
    skillDescriptionOverrides,
    skillTargetOverrides,
    skillAnchorsOverrides,
    skillTrendOverrides,
    skillTrendgrundOverrides,
    skillModelOverrides,
    skillKeyOverrides,
    skillLastModifiedOverrides,
    onAddCustomSkill,
    onToggleDisableSkill,
    onDeleteSkill,
    onRenameSkill,
    onChangeBaseSkillDep,
    onChangeCustomSkillDep,
    onMoveBaseSkill,
    onMoveCustomSkill,
    onEditSkillDescription,
    onEditSkillTarget,
    onEditSkillAnchor,
    onEditSkillTrend,
    onEditSkillTrendgrund,
    onEditSkillModel,
    onEditSkillKey,
    currentGroup,
    groupDrivers,
    onSetGroupDrivers,
    onProceed,
    onBack,
  } = props;

  const skillCategoryNames = useMemo(
    () => department.categories.map((c) => c.name),
    [department],
  );

  /** Nicht umbenannte Base-Skills, gruppiert nach effektiver Kategorie. */
  const baseSkillsByEffectiveCategory = useMemo(() => {
    const validNames = new Set(skillCategoryNames);
    const map: Record<string, Skill[]> = {};
    for (const cat of department.categories) map[cat.name] = [];
    for (const cat of department.categories) {
      for (const s of cat.skills) {
        if (renamedBaseSkills.has(s.name)) continue;
        const override = baseSkillCategoryOverrides[s.name];
        const target = override && validNames.has(override) ? override : cat.name;
        map[target].push(s);
      }
    }
    return map;
  }, [
    department,
    renamedBaseSkills,
    baseSkillCategoryOverrides,
    skillCategoryNames,
  ]);

  /** Applies all overrides (description, target, anchors, trend, model, key, lastModified). */
  const applyOverrides = useCallback(
    (s: Skill): Skill => {
      const next: Skill = { ...s };
      if (
        Object.prototype.hasOwnProperty.call(skillDescriptionOverrides, s.name)
      ) {
        next.description = skillDescriptionOverrides[s.name];
      }
      if (Object.prototype.hasOwnProperty.call(skillTargetOverrides, s.name)) {
        next.targetLevel = skillTargetOverrides[s.name] ?? undefined;
      }
      if (Object.prototype.hasOwnProperty.call(skillAnchorsOverrides, s.name)) {
        next.anchors = { ...s.anchors, ...skillAnchorsOverrides[s.name] };
      }
      if (Object.prototype.hasOwnProperty.call(skillTrendOverrides, s.name)) {
        next.trend = skillTrendOverrides[s.name] ?? undefined;
      }
      if (
        Object.prototype.hasOwnProperty.call(skillTrendgrundOverrides, s.name)
      ) {
        next.trendgrund = skillTrendgrundOverrides[s.name] || undefined;
      }
      if (Object.prototype.hasOwnProperty.call(skillModelOverrides, s.name)) {
        next.bewertungsmodell = skillModelOverrides[s.name] ?? undefined;
      }
      if (Object.prototype.hasOwnProperty.call(skillKeyOverrides, s.name)) {
        next.keySkill = skillKeyOverrides[s.name] ?? undefined;
      }
      if (
        Object.prototype.hasOwnProperty.call(skillLastModifiedOverrides, s.name)
      ) {
        next.lastModified = skillLastModifiedOverrides[s.name];
      }
      return next;
    },
    [
      skillDescriptionOverrides,
      skillTargetOverrides,
      skillAnchorsOverrides,
      skillTrendOverrides,
      skillTrendgrundOverrides,
      skillModelOverrides,
      skillKeyOverrides,
      skillLastModifiedOverrides,
    ],
  );

  const [activeTab, setActiveTab] = useState<TabId>("skills");
  const [trendFilter, setTrendFilter] = useState<TrendFilter>("all");
  const [showDisabled, setShowDisabled] = useState(true);

  /** Effective skill list per dimension (base + custom, all overrides applied, disabled-Flag gesetzt). */
  const effectiveByDimension = useMemo(() => {
    const map: Record<string, Skill[]> = {};
    for (const cat of department.categories) {
      const base = (baseSkillsByEffectiveCategory[cat.name] ?? []).map((s) =>
        applyOverrides({
          ...s,
          dep: baseSkillOverrides[s.name] ?? s.dep,
          disabled: disabledBaseSkills.has(s.name),
        }),
      );
      const custom = (customSkills[cat.name] ?? []).map((s) =>
        applyOverrides(s),
      );
      map[cat.name] = [...base, ...custom];
    }
    return map;
  }, [
    department,
    baseSkillsByEffectiveCategory,
    baseSkillOverrides,
    disabledBaseSkills,
    customSkills,
    applyOverrides,
  ]);

  const totalSkills = useMemo(
    () =>
      Object.values(effectiveByDimension).reduce(
        (sum, list) => sum + list.length,
        0,
      ),
    [effectiveByDimension],
  );

  const activeSkillCount = useMemo(
    () =>
      Object.values(effectiveByDimension).reduce(
        (sum, list) => sum + list.filter((s) => !s.disabled).length,
        0,
      ),
    [effectiveByDimension],
  );

  const disabledSkillCount = totalSkills - activeSkillCount;

  const canProceed = activeSkillCount >= 3;

  /** Counts per trend across all dimensions (nur aktive Skills zaehlen). */
  const trendCounts: Record<TrendFilter, number> = useMemo(() => {
    const counts: Record<TrendFilter, number> = {
      all: 0,
      "stark steigend": 0,
      steigend: 0,
      stabil: 0,
      sinkend: 0,
      none: 0,
    };
    for (const list of Object.values(effectiveByDimension)) {
      for (const s of list) {
        if (s.disabled && !showDisabled) continue;
        counts.all += 1;
        if (!s.trend) counts.none += 1;
        else counts[s.trend] += 1;
      }
    }
    return counts;
  }, [effectiveByDimension, showDisabled]);

  const matchesFilter = useCallback(
    (skill: Skill): boolean => {
      if (skill.disabled && !showDisabled) return false;
      if (trendFilter === "all") return true;
      if (trendFilter === "none") return !skill.trend;
      return skill.trend === trendFilter;
    },
    [trendFilter, showDisabled],
  );

  const handlePdfExport = useCallback(() => {
    const cats = department.categories.map((cat) => ({
      name: cat.name,
      skills: effectiveByDimension[cat.name] ?? [],
    }));
    exportSkillInventoryPdf(cats, department.name, currentGroup?.name ?? "", groupDrivers);
  }, [department, effectiveByDimension, currentGroup, groupDrivers]);

  const tabs: { id: TabId; label: string; count: number }[] = [
    { id: "skills", label: "Skills", count: activeSkillCount },
    { id: "drivers", label: "Markttreiber", count: groupDrivers.length },
  ];

  return (
    <div className="mx-auto max-w-6xl py-8 px-4">
      <div className="mb-6">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-xl font-bold text-slate-800">
            Skill-Inventur: {department.name}
          </h2>
          <button
            onClick={handlePdfExport}
            className="flex shrink-0 items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-50"
            title="Alle Skills als PDF speichern (inklusive Steckbriefe und Verhaltensanker)"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h4a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
            PDF
          </button>
        </div>
        <p className="mt-1 text-sm text-gray-500">
          Alle Skills der Rolle in einem Tab — geordnet nach den 4 Dimensionen.
          Skills lassen sich vollstaendig redaktionell pflegen: umbenennen,
          deaktivieren, in andere Dimensionen verschieben, Steckbrief, Trend
          und Schluesselkompetenz pflegen.
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />{" "}
            Durable — zeitlos
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-full bg-blue-500" />{" "}
            Evolving — im Wandel
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-full bg-amber-500" />{" "}
            Perishable — kurzlebig
          </span>
          <span className="flex items-center gap-1 text-amber-700">
            <span>★</span> Schluesselkompetenz
          </span>
        </div>
      </div>

      {/* Tab navigation */}
      <div className="mb-6 flex flex-wrap gap-1 border-b border-gray-200">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`-mb-px border-b-2 px-4 py-2.5 text-sm font-medium transition ${
              activeTab === t.id
                ? "border-slate-800 text-slate-800"
                : "border-transparent text-gray-500 hover:text-slate-700"
            }`}
          >
            {t.label}
            <span className="ml-2 text-xs text-gray-400">({t.count})</span>
          </button>
        ))}
      </div>

      {/* Skills tab — alle 4 Dimensionen in einem Bereich */}
      {activeTab === "skills" && (
        <div className="space-y-4">
          {/* Trend- + Disabled-Filter */}
          <div className="rounded-xl border border-gray-200 bg-white px-4 py-3">
            <TrendFilterBar
              value={trendFilter}
              onChange={setTrendFilter}
              trendCounts={trendCounts}
              showDisabled={showDisabled}
              onToggleShowDisabled={setShowDisabled}
              disabledCount={disabledSkillCount}
            />
          </div>

          {/* 4 Dimensionen */}
          {department.categories.map((cat) => {
            const baseSkills = baseSkillsByEffectiveCategory[cat.name] ?? [];
            const custom = customSkills[cat.name] ?? [];
            const allItems: CategoryBlockSkillItem[] = [
              ...baseSkills.map((skill) => {
                const effective = applyOverrides({
                  ...skill,
                  dep: baseSkillOverrides[skill.name] ?? skill.dep,
                  disabled: disabledBaseSkills.has(skill.name),
                });
                return {
                  skill: effective,
                  isCustom: false,
                  isDisabled: !!effective.disabled,
                  onChangeDep: (dep: DepClassification) =>
                    onChangeBaseSkillDep(skill.name, dep),
                  onMove: (target: string) =>
                    onMoveBaseSkill(skill.name, target),
                  onRename: onRenameSkill,
                  onToggleDisable: () =>
                    onToggleDisableSkill(cat.name, skill.name, false),
                  onDelete: () => onDeleteSkill(cat.name, skill.name, false),
                  onEditDescription: (text: string) =>
                    onEditSkillDescription(skill.name, text),
                  onEditTarget: (level: DreyfusAnchorLevel | null) =>
                    onEditSkillTarget(skill.name, level),
                  onEditAnchor: (level: DreyfusAnchorLevel, text: string) =>
                    onEditSkillAnchor(skill.name, level, text),
                  onEditTrend: (trend: RelevanceTrend | null) =>
                    onEditSkillTrend(skill.name, trend),
                  onEditTrendgrund: (text: string) =>
                    onEditSkillTrendgrund(skill.name, text),
                  onEditModel: (model: EvaluationModel | null) =>
                    onEditSkillModel(skill.name, model),
                  onEditKey: (isKey: boolean) =>
                    onEditSkillKey(skill.name, isKey),
                };
              }),
              ...custom.map((skill) => {
                const effective = applyOverrides(skill);
                return {
                  skill: effective,
                  isCustom: true,
                  isDisabled: !!effective.disabled,
                  onChangeDep: (dep: DepClassification) =>
                    onChangeCustomSkillDep(cat.name, skill.name, dep),
                  onMove: (target: string) =>
                    onMoveCustomSkill(cat.name, skill.name, target),
                  onRename: onRenameSkill,
                  onToggleDisable: () =>
                    onToggleDisableSkill(cat.name, skill.name, true),
                  onDelete: () => onDeleteSkill(cat.name, skill.name, true),
                  onEditDescription: (text: string) =>
                    onEditSkillDescription(skill.name, text),
                  onEditTarget: (level: DreyfusAnchorLevel | null) =>
                    onEditSkillTarget(skill.name, level),
                  onEditAnchor: (level: DreyfusAnchorLevel, text: string) =>
                    onEditSkillAnchor(skill.name, level, text),
                  onEditTrend: (trend: RelevanceTrend | null) =>
                    onEditSkillTrend(skill.name, trend),
                  onEditTrendgrund: (text: string) =>
                    onEditSkillTrendgrund(skill.name, text),
                  onEditModel: (model: EvaluationModel | null) =>
                    onEditSkillModel(skill.name, model),
                  onEditKey: (isKey: boolean) =>
                    onEditSkillKey(skill.name, isKey),
                };
              }),
            ];
            const visibleItems = allItems.filter((item) =>
              matchesFilter(item.skill),
            );
            return (
              <CategoryBlock
                key={cat.name}
                name={cat.name}
                skills={visibleItems}
                totalCount={allItems.length}
                targetCategories={skillCategoryNames}
                filterActive={trendFilter !== "all" || !showDisabled}
                onAddSkill={(skill) => onAddCustomSkill(cat.name, skill)}
                emptyText="Alle Skills in dieser Dimension wurden deaktiviert."
              />
            );
          })}
        </div>
      )}

      {/* Markttreiber tab */}
      {activeTab === "drivers" && (
        <MarketDriversPanel
          group={currentGroup}
          drivers={groupDrivers}
          onSetDrivers={(next) => {
            if (currentGroup) onSetGroupDrivers(currentGroup.id, next);
          }}
        />
      )}

      {/* Navigation */}
      <div className="mt-8 flex items-center justify-between">
        <button
          onClick={onBack}
          className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        >
          &larr; Zurueck
        </button>
        <div className="flex items-center gap-4">
          {!canProceed && (
            <p className="text-xs text-amber-600">
              Mindestens 3 aktive Skills erforderlich ({activeSkillCount}/3).
            </p>
          )}
          <button
            onClick={onProceed}
            disabled={!canProceed}
            className="rounded-lg bg-slate-800 px-8 py-3 font-semibold text-white shadow transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Selbsteinschaetzung starten &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
