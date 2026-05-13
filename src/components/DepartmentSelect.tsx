import { useState, useEffect } from "react";
import { groups } from "../data/groups";
import type { Department, Group } from "../types";

interface Props {
  selected: Department | null;
  onSelect: (dept: Department) => void;
  onNext: () => void;
}

export function DepartmentSelect({ selected, onSelect, onNext }: Props) {
  // Find the group that contains the currently selected role
  const initialGroup =
    groups.find((g) => g.roles.some((r) => r.id === selected?.id)) ?? null;
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(
    initialGroup,
  );

  // When group changes, clear the role if it doesn't belong to the new group
  useEffect(() => {
    if (
      selectedGroup &&
      selected &&
      !selectedGroup.roles.some((r) => r.id === selected.id)
    ) {
      // no-op: parent keeps the selection until user picks a new role
    }
  }, [selectedGroup, selected]);

  const handleGroupChange = (groupId: string) => {
    const g = groups.find((x) => x.id === groupId) ?? null;
    setSelectedGroup(g);
  };

  const handleRoleChange = (roleId: string) => {
    if (!selectedGroup) return;
    const r = selectedGroup.roles.find((x) => x.id === roleId);
    if (r) onSelect(r);
  };

  const canProceed = !!selected && !!selectedGroup;

  return (
    <div className="mx-auto max-w-2xl py-12 px-4">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-slate-800">
          Willkommen zur red6 Skill-Erhebung
        </h2>
        <p className="mt-2 text-gray-500">
          Fuer die Skillerhebung waehle deine Gruppe und deine Rolle aus.
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        {/* Step 1: Group */}
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

        {/* Step 2: Role */}
        <label
          htmlFor="role-select"
          className={`mt-6 mb-2 block text-sm font-semibold ${selectedGroup ? "text-slate-700" : "text-gray-300"}`}
        >
          2. Rolle / Fachbereich
        </label>
        <select
          id="role-select"
          value={selected?.id ?? ""}
          onChange={(e) => handleRoleChange(e.target.value)}
          disabled={!selectedGroup}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base shadow-sm transition focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400"
        >
          <option value="">
            {selectedGroup ? "— Rolle waehlen —" : "— Erst Gruppe waehlen —"}
          </option>
          {selectedGroup?.roles.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name}
            </option>
          ))}
        </select>

        {selected && selectedGroup?.roles.some((r) => r.id === selected.id) && (
          <div className="mt-4 rounded-lg bg-slate-50 p-4">
            <p className="text-sm text-gray-600">{selected.description}</p>
            <p className="mt-2 text-sm text-gray-400">
              {selected.categories.length} Skill-Bereiche mit insgesamt{" "}
              {selected.categories.reduce(
                (sum, c) => sum + c.skills.length,
                0,
              )}{" "}
              Skills
            </p>
          </div>
        )}
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={onNext}
          disabled={!canProceed}
          className="rounded-lg bg-slate-800 px-8 py-3 font-semibold text-white shadow transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Weiter zur Skill-Auswahl &rarr;
        </button>
      </div>
    </div>
  );
}
