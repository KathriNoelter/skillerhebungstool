import { useRef, useState, useEffect } from "react";
import { groups } from "../data/groups";
import type { Department, Group, Role } from "../types";
import { importCatalogFromFile } from "../lib/catalogImport";

interface Props {
  selected: Department | null;
  onSelect: (dept: Department) => void;
  onNext: () => void;
  customRoles: Role[];
  onImportRole: (role: Role) => void;
  onDeleteCustomRole: (id: string) => void;
}

export function DepartmentSelect({
  selected,
  onSelect,
  onNext,
  customRoles,
  onImportRole,
  onDeleteCustomRole,
}: Props) {
  const initialGroup =
    groups.find((g) => g.roles.some((r) => r.id === selected?.id)) ?? null;
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(initialGroup);
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (importSuccess) {
      const t = setTimeout(() => setImportSuccess(null), 3000);
      return () => clearTimeout(t);
    }
  }, [importSuccess]);

  const handleGroupChange = (groupId: string) => {
    setSelectedGroup(groups.find((x) => x.id === groupId) ?? null);
  };

  const handleRoleChange = (roleId: string) => {
    if (!selectedGroup) return;
    const r = selectedGroup.roles.find((x) => x.id === roleId);
    if (r) onSelect(r);
  };

  const handleImportFile = async (file: File | null | undefined) => {
    if (!file) return;
    setImportError(null);
    try {
      const role = await importCatalogFromFile(file);
      onImportRole(role);
      onSelect(role);
      setImportSuccess(
        `"${role.name}" importiert — ${role.categories.reduce((s, c) => s + c.skills.length, 0)} Skills.`,
      );
    } catch (e) {
      setImportError(e instanceof Error ? e.message : String(e));
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const isCustomSelected = customRoles.some((r) => r.id === selected?.id);
  const isBuiltinSelected = !isCustomSelected && !!selected;
  const canProceed = !!selected;

  return (
    <div className="mx-auto max-w-2xl py-12 px-4">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-slate-800">
          Willkommen zur red6 Skill-Erhebung
        </h2>
        <p className="mt-2 text-gray-500">
          Waehle eine bestehende Rolle oder importiere einen eigenen Katalog.
        </p>
      </div>

      {/* Built-in roles */}
      <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-gray-400">
          Integrierte Rollen
        </p>

        <label
          htmlFor="group-select"
          className="mb-2 block text-sm font-semibold text-slate-700"
        >
          1. Gruppe
        </label>
        <select
          id="group-select"
          value={selectedGroup?.id ?? ""}
          onChange={(e) => handleGroupChange(e.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base shadow-sm transition focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200"
        >
          <option value="">— Gruppe waehlen —</option>
          {groups.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>

        {selectedGroup && (
          <p className="mt-2 text-xs text-gray-500">{selectedGroup.description}</p>
        )}

        <label
          htmlFor="role-select"
          className={`mt-6 mb-2 block text-sm font-semibold ${selectedGroup ? "text-slate-700" : "text-gray-300"}`}
        >
          2. Rolle / Fachbereich
        </label>
        <select
          id="role-select"
          value={isBuiltinSelected ? (selected?.id ?? "") : ""}
          onChange={(e) => handleRoleChange(e.target.value)}
          disabled={!selectedGroup}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base shadow-sm transition focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400"
        >
          <option value="">
            {selectedGroup ? "— Rolle waehlen —" : "— Erst Gruppe waehlen —"}
          </option>
          {selectedGroup?.roles.filter((r) => !r.isSpecialization).map((r) => (
            <option key={r.id} value={r.id}>
              {r.name}
            </option>
          ))}
        </select>

        {isBuiltinSelected && selectedGroup?.roles.some((r) => r.id === selected?.id) && (
          <div className="mt-4 rounded-lg bg-slate-50 p-4">
            <p className="text-sm text-gray-600">{selected!.description}</p>
            <p className="mt-2 text-sm text-gray-400">
              {selected!.categories.length} Skill-Bereiche ·{" "}
              {selected!.categories.reduce((s, c) => s + c.skills.length, 0)} Skills
            </p>
          </div>
        )}
      </div>

      {/* Imported roles */}
      <div className="mt-6 rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
            Importierte Rollen {customRoles.length > 0 && `(${customRoles.length})`}
          </p>
          <label
            className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-50"
            title="JSON-Katalog importieren"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Katalog importieren (.json)
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              className="sr-only"
              onChange={(e) => handleImportFile(e.target.files?.[0])}
            />
          </label>
        </div>

        {importError && (
          <div className="mb-3 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700">
            {importError}
          </div>
        )}
        {importSuccess && (
          <div className="mb-3 rounded-lg bg-emerald-50 px-3 py-2 text-xs text-emerald-700">
            ✓ {importSuccess}
          </div>
        )}

        {customRoles.length === 0 ? (
          <p className="text-sm text-gray-400">
            Noch keine importierten Rollen. Nutze „Katalog importieren" um eine
            JSON-Datei zu laden.
          </p>
        ) : (
          <div className="space-y-2">
            {customRoles.map((role) => {
              const totalSkills = role.categories.reduce(
                (s, c) => s + c.skills.length,
                0,
              );
              const isActive = selected?.id === role.id;
              return (
                <div
                  key={role.id}
                  className={`flex items-start justify-between gap-3 rounded-lg border p-4 transition ${
                    isActive
                      ? "border-slate-700 bg-slate-50 ring-1 ring-slate-700"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <button
                    className="min-w-0 flex-1 text-left"
                    onClick={() => onSelect(role)}
                  >
                    <p className="font-semibold text-slate-800">{role.name}</p>
                    {role.description && (
                      <p className="mt-0.5 text-xs text-gray-500 line-clamp-2">
                        {role.description}
                      </p>
                    )}
                    <p className="mt-1 text-xs text-gray-400">
                      {role.categories.length} Bereiche · {totalSkills} Skills
                    </p>
                  </button>
                  <button
                    onClick={() => onDeleteCustomRole(role.id)}
                    className="shrink-0 rounded p-1 text-gray-400 transition hover:text-red-500"
                    title="Katalog entfernen"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={onNext}
          disabled={!canProceed}
          className="rounded-lg bg-slate-800 px-8 py-3 font-semibold text-white shadow transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Weiter zur Skill-Inventur &rarr;
        </button>
      </div>
    </div>
  );
}
