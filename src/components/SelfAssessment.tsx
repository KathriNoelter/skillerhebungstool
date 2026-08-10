import { useCallback, useMemo, useRef, useState } from "react";
import type {
  DreyfusLevel,
  Participant,
  SkillCategory,
} from "../types";
import { stageLabelsFor } from "../types";
import {
  exportAssessmentTemplate,
  importAssessmentResults,
  importAssessmentResultsFromJson,
} from "../lib/excel";
import { exportAssessmentTemplateHtml } from "../lib/htmlExport";

interface Props {
  departmentName: string;
  groupName?: string;
  categories: SkillCategory[];
  participants: Participant[];
  /** Spezialisierungsnamen aus den geladenen Katalogen (leer = keine Spezialisierung). */
  availableSpecializations: string[];
  onSetParticipantName: (index: number, name: string) => void;
  onSetParticipantRoles: (index: number, roles: string[]) => void;
  onAddParticipant: () => void;
  onRemoveParticipant: (index: number) => void;
  onSetRatings: (index: number, ratings: Record<string, DreyfusLevel>) => void;
  onNext: () => void;
  onBack: () => void;
}

interface ImportMessage {
  kind: "ok" | "warn" | "error";
  text: string;
}

export function SelfAssessment({
  departmentName,
  groupName = "",
  categories,
  participants,
  availableSpecializations,
  onSetParticipantName,
  onSetParticipantRoles,
  onAddParticipant,
  onRemoveParticipant,
  onSetRatings,
  onNext,
  onBack,
}: Props) {
  const [messages, setMessages] = useState<ImportMessage[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const allSkillNames = useMemo(() => {
    const set = new Set<string>();
    for (const cat of categories) {
      for (const skill of cat.skills) set.add(skill.name);
    }
    return set;
  }, [categories]);

  /**
   * Filtert Kategorien auf die fuer einen Teilnehmer relevanten Skills:
   * Core-Skills (kein sourceLabel oder sourceLabel === departmentName) sind immer
   * dabei; Spezialisierungs-Skills nur wenn die Rolle gewaehlt wurde.
   */
  const participantCategories = useCallback(
    (p: Participant): SkillCategory[] => {
      if (availableSpecializations.length === 0) return categories;
      const roles = p.specializationRoles ?? [];
      return categories
        .map((cat) => ({
          name: cat.name,
          skills: cat.skills.filter((s) => {
            if (!s.sourceLabel || s.sourceLabel === departmentName) return true;
            return roles.includes(s.sourceLabel);
          }),
        }))
        .filter((cat) => cat.skills.length > 0);
    },
    [categories, availableSpecializations, departmentName],
  );

  const ratingCounts = participants.map(
    (p) => Object.keys(p.ratings).length,
  );
  const fullyRated = ratingCounts.filter((n) => n > 0).length;
  const canProceed = fullyRated > 0;

  const pushMessage = (msg: ImportMessage) =>
    setMessages((prev) => [...prev.slice(-4), msg]);

  const handleExport = (index: number) => {
    const participant = participants[index];
    if (!participant.name.trim()) {
      pushMessage({
        kind: "warn",
        text: `Person ${index + 1}: Bitte zuerst den Namen eintragen.`,
      });
      return;
    }
    exportAssessmentTemplate(
      participantCategories(participant),
      participant,
      departmentName,
      groupName,
    );
    pushMessage({
      kind: "ok",
      text: `Excel-Vorlage fuer ${participant.name} heruntergeladen.`,
    });
  };

  const handleExportHtml = (index: number) => {
    const participant = participants[index];
    if (!participant.name.trim()) {
      pushMessage({
        kind: "warn",
        text: `Person ${index + 1}: Bitte zuerst den Namen eintragen.`,
      });
      return;
    }
    exportAssessmentTemplateHtml(
      participantCategories(participant),
      participant,
      departmentName,
      groupName,
    );
    pushMessage({
      kind: "ok",
      text: `HTML-Umfrage fuer ${participant.name} heruntergeladen.`,
    });
  };

  const handleImport = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const newMessages: ImportMessage[] = [];

    for (const file of Array.from(files)) {
      try {
        const result = file.name.toLowerCase().endsWith(".json")
          ? await importAssessmentResultsFromJson(file, allSkillNames)
          : await importAssessmentResults(file, allSkillNames);
        const name = result.participantName.trim();
        if (!name) {
          newMessages.push({
            kind: "error",
            text: `${file.name}: Kein Teilnehmer-Name im Metadaten-Sheet gefunden.`,
          });
          continue;
        }

        const idx = participants.findIndex(
          (p) => p.name.trim().toLowerCase() === name.toLowerCase(),
        );
        if (idx < 0) {
          newMessages.push({
            kind: "error",
            text: `${file.name}: Teilnehmer "${name}" nicht in der Liste. Namen anlegen und erneut importieren.`,
          });
          continue;
        }

        onSetRatings(idx, result.ratings);
        const ratedCount = Object.keys(result.ratings).length;
        const pSkillCount = participantCategories(participants[idx]).reduce(
          (sum, cat) => sum + cat.skills.length,
          0,
        );
        const unknownNote =
          result.unknownSkills.length > 0
            ? ` (${result.unknownSkills.length} unbekannte Skills ignoriert)`
            : "";
        newMessages.push({
          kind: result.unknownSkills.length > 0 ? "warn" : "ok",
          text: `${name}: ${ratedCount}/${pSkillCount} Bewertungen importiert${unknownNote}.`,
        });
      } catch (e) {
        newMessages.push({
          kind: "error",
          text: `${file.name}: ${e instanceof Error ? e.message : String(e)}`,
        });
      }
    }

    setMessages((prev) => [...prev, ...newMessages].slice(-8));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="mx-auto max-w-4xl py-8 px-4">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-800">
          Selbsteinschaetzung
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Erstelle fuer jeden Teilnehmer eine Vorlage (Excel oder HTML), versende sie per
          Mail und importiere die ausgefuellten Dateien anschliessend wieder.
          Die HTML-Vorlage laeuft direkt im Browser — kein Excel noetig.
        </p>
      </div>

      {/* Participants */}
      <div className="mb-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-700">
            1. Teilnehmer ({participants.length})
          </h3>
          {participants.length < 10 && (
            <button
              onClick={onAddParticipant}
              className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-600 transition hover:bg-gray-50"
            >
              + Teilnehmer hinzufuegen
            </button>
          )}
        </div>
        <p className="mb-3 text-xs text-gray-500">
          Trage die Namen aller Teilnehmer ein. Die Namen werden in die
          jeweilige Vorlage eingebettet und beim Import zur Zuordnung genutzt.
          Waehle pro Teilnehmer zwischen Excel (.xlsx) oder HTML-Umfrage (.html).
        </p>
        <div className="divide-y divide-gray-100">
          {participants.map((p, i) => {
            const rated = ratingCounts[i];
            const imported = rated > 0;
            const pCats = participantCategories(p);
            const pSkillCount = pCats.reduce(
              (sum, cat) => sum + cat.skills.length,
              0,
            );
            return (
              <div key={i} className="py-2.5">
                <div className="flex flex-wrap items-center gap-3">
                  <input
                    type="text"
                    value={p.name}
                    onChange={(e) => onSetParticipantName(i, e.target.value)}
                    placeholder={`Person ${i + 1}`}
                    className="w-52 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-200"
                  />
                  <button
                    onClick={() => handleExport(i)}
                    disabled={!p.name.trim()}
                    className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-40"
                    title="Excel-Vorlage (.xlsx)"
                  >
                    Excel
                  </button>
                  <button
                    onClick={() => handleExportHtml(i)}
                    disabled={!p.name.trim()}
                    className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-40"
                    title="HTML-Umfrage (.html) — im Browser ausfüllbar, kein Excel nötig"
                  >
                    HTML
                  </button>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ${
                      imported
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        imported ? "bg-emerald-500" : "bg-gray-400"
                      }`}
                    />
                    {imported
                      ? `${rated}/${pSkillCount} importiert`
                      : "noch nicht importiert"}
                  </span>
                  {participants.length > 1 && (
                    <button
                      onClick={() => onRemoveParticipant(i)}
                      className="ml-auto text-gray-400 transition hover:text-red-500"
                      title="Teilnehmer entfernen"
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
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  )}
                </div>
                {availableSpecializations.length > 0 && (
                  <div className="mt-1.5 flex flex-wrap items-center gap-1.5 pl-0.5">
                    <span className="text-[10px] uppercase tracking-wide text-gray-400">
                      Spezialisierung:
                    </span>
                    {availableSpecializations.map((spec) => {
                      const isActive = (p.specializationRoles ?? []).includes(
                        spec,
                      );
                      return (
                        <button
                          key={spec}
                          onClick={() => {
                            const current = p.specializationRoles ?? [];
                            const next = isActive
                              ? current.filter((r) => r !== spec)
                              : [...current, spec];
                            onSetParticipantRoles(i, next);
                          }}
                          className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium transition ${
                            isActive
                              ? "border-violet-300 bg-violet-100 text-violet-800"
                              : "border-gray-200 bg-gray-50 text-gray-500 hover:border-gray-300 hover:bg-gray-100"
                          }`}
                        >
                          {spec}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Import */}
      <div className="mb-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-700">
          2. Ausgefuellte Vorlagen importieren
        </h3>
        <p className="mt-1 mb-3 text-xs text-gray-500">
          Waehle ausgefuellte <code>.xlsx</code>- oder <code>.json</code>-Dateien.
          Die Zuordnung zum Teilnehmer erfolgt automatisch ueber den eingebetteten Namen.
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept=".xlsx,.json"
          multiple
          onChange={(e) => handleImport(e.target.files)}
          className="block w-full text-sm file:mr-4 file:rounded-lg file:border-0 file:bg-slate-800 file:px-4 file:py-2 file:text-xs file:font-semibold file:text-white hover:file:bg-slate-700"
        />

        {messages.length > 0 && (
          <ul className="mt-4 space-y-1.5">
            {messages.map((m, i) => (
              <li
                key={i}
                className={`rounded-lg px-3 py-2 text-xs ${
                  m.kind === "ok"
                    ? "bg-emerald-50 text-emerald-700"
                    : m.kind === "warn"
                      ? "bg-amber-50 text-amber-700"
                      : "bg-red-50 text-red-700"
                }`}
              >
                {m.text}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Skill-Katalog Vorschau (ANF-03 / ANF-07) */}
      <div className="mb-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <button
          onClick={() => setPreviewOpen((v) => !v)}
          className="flex w-full items-center justify-between text-left"
        >
          <div>
            <h3 className="text-sm font-semibold text-slate-700">
              3. Skill-Katalog pruefen (Steckbrief & Verhaltensanker)
            </h3>
            <p className="mt-1 text-xs text-gray-500">
              Vorschau dessen, was Teilnehmende in der Excel-Vorlage sehen —
              Skill-Steckbrief, Zielwert und Verhaltensanker je Stufe.
            </p>
          </div>
          <span
            className={`text-gray-400 transition ${
              previewOpen ? "rotate-90" : ""
            }`}
          >
            <svg
              className="h-4 w-4"
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
          </span>
        </button>
        {previewOpen && (
          <div className="mt-4 space-y-4">
            {categories.map((cat) => (
              <div key={cat.name}>
                <h4 className="text-xs font-bold uppercase tracking-wide text-slate-600">
                  {cat.name}
                </h4>
                <ul className="mt-1 space-y-2">
                  {cat.skills.map((skill) => {
                    const anchors = skill.anchors ?? {};
                    const anchorEntries = ([1, 2, 3, 4, 5] as const)
                      .map((l) => ({ level: l, text: anchors[l] }))
                      .filter((a) => !!a.text);
                    const skillLabels = stageLabelsFor();
                    return (
                      <li
                        key={skill.name}
                        className="rounded-lg border border-gray-100 bg-gray-50 px-3 py-2"
                      >
                        <div className="flex flex-wrap items-baseline gap-2">
                          <span className="text-sm font-medium text-gray-800">
                            {skill.name}
                          </span>
                          {typeof skill.targetLevel === "number" && (
                            <span className="rounded bg-slate-200 px-1.5 py-0.5 text-[10px] font-medium uppercase text-slate-700">
                              Ziel {skill.targetLevel}
                            </span>
                          )}
                        </div>
                        {skill.description && (
                          <p className="mt-1 text-xs leading-snug text-gray-600">
                            {skill.description}
                          </p>
                        )}
                        {anchorEntries.length > 0 && (
                          <ul className="mt-2 space-y-0.5">
                            {anchorEntries.map((a) => (
                              <li
                                key={a.level}
                                className="text-[11px] text-gray-600"
                              >
                                <span className="font-semibold text-gray-700">
                                  {a.level} ({skillLabels[a.level]}):
                                </span>{" "}
                                {a.text}
                              </li>
                            ))}
                          </ul>
                        )}
                        {!skill.description && anchorEntries.length === 0 && (
                          <p className="mt-1 text-[11px] italic text-gray-400">
                            Noch kein Steckbrief / Anker hinterlegt.
                          </p>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>

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
              Mindestens eine ausgefuellte Vorlage importieren, um fortzufahren.
            </p>
          )}
          <button
            onClick={onNext}
            disabled={!canProceed}
            className="rounded-lg bg-slate-800 px-8 py-3 font-semibold text-white shadow transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Weiter zur Auswertung &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
