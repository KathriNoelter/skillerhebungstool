import { useState, useCallback, useEffect, useMemo, useRef } from "react";
import type {
  Department,
  Group,
  Participant,
  DreyfusLevel,
  DreyfusAnchorLevel,
  SkillAnchors,
  SkillCategory,
  Skill,
  DepClassification,
  RelevanceTrend,
  MarketDriver,
  EvaluationModel,
  Role,
} from "./types";
import { groups, CATALOG_VERSION } from "./data/groups";
import { Stepper } from "./components/Stepper";
import { DepartmentSelect } from "./components/DepartmentSelect";
import { SkillInventory } from "./components/SkillInventory";
import { SelfAssessment } from "./components/SelfAssessment";
import { SkillProfile } from "./components/SkillProfile";
import { NativeSetup } from "./components/NativeSetup";
import { HelpPanel, HelpButton } from "./components/HelpPanel";

/** Apply description / target / anchors / trend / model / key / lastModified overrides on top of a Skill's defaults. */
function withSkillOverrides(
  skill: Skill,
  descOv: Record<string, string>,
  targetOv: Record<string, DreyfusAnchorLevel | null>,
  anchorsOv: Record<string, SkillAnchors>,
  trendOv: Record<string, RelevanceTrend | null>,
  trendgrundOv: Record<string, string>,
  modelOv: Record<string, EvaluationModel | null>,
  keyOv: Record<string, boolean | null>,
  lastModOv: Record<string, string>,
): Skill {
  const next: Skill = { ...skill };
  if (Object.prototype.hasOwnProperty.call(descOv, skill.name)) {
    next.description = descOv[skill.name];
  }
  if (Object.prototype.hasOwnProperty.call(targetOv, skill.name)) {
    const v = targetOv[skill.name];
    next.targetLevel = v ?? undefined;
  }
  if (Object.prototype.hasOwnProperty.call(anchorsOv, skill.name)) {
    next.anchors = { ...skill.anchors, ...anchorsOv[skill.name] };
  }
  if (Object.prototype.hasOwnProperty.call(trendOv, skill.name)) {
    const v = trendOv[skill.name];
    next.trend = v ?? undefined;
  }
  if (Object.prototype.hasOwnProperty.call(trendgrundOv, skill.name)) {
    next.trendgrund = trendgrundOv[skill.name] || undefined;
  }
  if (Object.prototype.hasOwnProperty.call(modelOv, skill.name)) {
    next.bewertungsmodell = modelOv[skill.name] ?? undefined;
  }
  if (Object.prototype.hasOwnProperty.call(keyOv, skill.name)) {
    const v = keyOv[skill.name];
    next.keySkill = v ?? undefined;
  }
  if (Object.prototype.hasOwnProperty.call(lastModOv, skill.name)) {
    next.lastModified = lastModOv[skill.name];
  }
  return next;
}

const STEPS = [
  { num: 1, label: "Gruppe & Rolle" },
  { num: 2, label: "Skill-Inventur" },
  { num: 3, label: "Selbsteinschaetzung" },
  { num: 4, label: "Auswertung" },
];

function createParticipant(name: string): Participant {
  return { name, ratings: {} };
}

const isNativeApp = !!window.electronAPI;

/** ANF-18: ISO-Datum YYYY-MM-DD fuer lastModified. */
function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

// ---- Session persistence ----

const STORAGE_KEY = "skillworkshop_session";

interface PersistedSession {
  catalogVersion?: string;
  departmentId?: string | null;
  step?: number;
  participants?: Participant[];
  marketDriversByGroup?: Record<string, MarketDriver[]>;
  customSkills?: Record<string, Skill[]>;
  disabledBaseSkills?: string[];
  renamedBaseSkills?: string[];
  removedBaseSkills?: string[];
  baseSkillOverrides?: Record<string, DepClassification>;
  baseSkillCategoryOverrides?: Record<string, string>;
  skillDescriptionOverrides?: Record<string, string>;
  skillTargetOverrides?: Record<string, DreyfusAnchorLevel | null>;
  skillAnchorsOverrides?: Record<string, SkillAnchors>;
  skillTrendOverrides?: Record<string, RelevanceTrend | null>;
  skillTrendgrundOverrides?: Record<string, string>;
  skillModelOverrides?: Record<string, EvaluationModel | null>;
  skillKeyOverrides?: Record<string, boolean | null>;
  skillLastModifiedOverrides?: Record<string, string>;
}

export function App() {
  // Read persisted session exactly once (initializer only runs on first render).
  // All subsequent useState calls below capture _r via closure.
  const [_r] = useState<PersistedSession | null>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as PersistedSession) : null;
    } catch {
      return null;
    }
  });

  const [savedFlash, setSavedFlash] = useState(false);
  const savedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [nativeReady, setNativeReady] = useState(!isNativeApp);
  const [apiKey, setApiKey] = useState("");
  const [step, setStep] = useState(() => {
    // Restore step only if a department was also saved (avoids blank screen)
    if (_r?.step && _r.step > 1 && _r.departmentId) return _r.step;
    return 1;
  });
  const [helpOpen, setHelpOpen] = useState(false);
  const [department, setDepartment] = useState<Department | null>(() => {
    if (!_r?.departmentId) return null;
    for (const g of groups) {
      const found = g.roles.find((r) => r.id === _r!.departmentId!);
      if (found) return found;
    }
    // Fall back to custom roles (read directly from storage — customRoles state
    // not yet initialized at this point)
    try {
      const raw = localStorage.getItem("skillworkshop_custom_roles");
      const custom = raw ? (JSON.parse(raw) as Role[]) : [];
      return custom.find((r) => r.id === _r!.departmentId!) ?? null;
    } catch {
      return null;
    }
  });

  // Skill inventory state (Step 2) — ANF-17: ein einziger Skill-Bereich, alle
  // Skills (inkl. zukunftsrelevanter) liegen direkt in den 4 Dimensionen.
  const [customSkills, setCustomSkills] = useState<Record<string, Skill[]>>(
    () => _r?.customSkills ?? {},
  );
  // ANF-18 (9): "deaktiviert", nicht "geloescht" — Skills bleiben sichtbar in
  // der Inventur, sind aber in Selbsteinschaetzung & Auswertung ausgeblendet.
  const [disabledBaseSkills, setDisabledBaseSkills] = useState<Set<string>>(
    () => new Set(_r?.disabledBaseSkills ?? []),
  );
  // ANF-18 (2): Beim Umbenennen eines Base-Skills wird dieser komplett aus der
  // Inventur entfernt und durch einen Custom-Skill mit neuem Namen ersetzt.
  const [renamedBaseSkills, setRenamedBaseSkills] = useState<Set<string>>(
    () => new Set(_r?.renamedBaseSkills ?? []),
  );
  // Override zu ANF-18 (9) per User-Wunsch: Base-Skills koennen auch endgueltig
  // entfernt werden (nicht nur deaktiviert). Bewertungen, Driver-Verlinkungen
  // und Overrides werden mitgeloescht. Reaktivierung ist nicht mehr moeglich.
  const [removedBaseSkills, setRemovedBaseSkills] = useState<Set<string>>(
    () => new Set(_r?.removedBaseSkills ?? []),
  );
  const [baseSkillOverrides, setBaseSkillOverrides] = useState<
    Record<string, DepClassification>
  >(() => _r?.baseSkillOverrides ?? {});
  const [baseSkillCategoryOverrides, setBaseSkillCategoryOverrides] = useState<
    Record<string, string>
  >(() => _r?.baseSkillCategoryOverrides ?? {});
  // ANF-03 / ANF-06 / ANF-07 — pro Skill-Name editierbar.
  const [skillDescriptionOverrides, setSkillDescriptionOverrides] = useState<
    Record<string, string>
  >(() => _r?.skillDescriptionOverrides ?? {});
  const [skillTargetOverrides, setSkillTargetOverrides] = useState<
    Record<string, DreyfusAnchorLevel | null>
  >(() => _r?.skillTargetOverrides ?? {});
  const [skillAnchorsOverrides, setSkillAnchorsOverrides] = useState<
    Record<string, SkillAnchors>
  >(() => _r?.skillAnchorsOverrides ?? {});
  // ANF-14 — Relevanztrend (Enum) + optionale Begruendung pro Skill-Name.
  const [skillTrendOverrides, setSkillTrendOverrides] = useState<
    Record<string, RelevanceTrend | null>
  >(() => _r?.skillTrendOverrides ?? {});
  const [skillTrendgrundOverrides, setSkillTrendgrundOverrides] = useState<
    Record<string, string>
  >(() => _r?.skillTrendgrundOverrides ?? {});
  // ANF-16 — Bewertungsmodell pro Skill. null = explizit "Auto" (Default).
  const [skillModelOverrides, setSkillModelOverrides] = useState<
    Record<string, EvaluationModel | null>
  >(() => _r?.skillModelOverrides ?? {});
  // ANF-18 (10) — Schluesselkompetenz-Badge pro Skill.
  const [skillKeyOverrides, setSkillKeyOverrides] = useState<
    Record<string, boolean | null>
  >(() => _r?.skillKeyOverrides ?? {});
  // ANF-18 — Datum der letzten redaktionellen Aenderung je Skill.
  const [skillLastModifiedOverrides, setSkillLastModifiedOverrides] = useState<
    Record<string, string>
  >(() => _r?.skillLastModifiedOverrides ?? {});
  // ANF-15 — Markt- & Kundentreiber je Rollengruppe (groupId -> drivers).
  // Nicht beim Rollenwechsel zuruecksetzen, da Treiber gruppenweit gelten.
  // Initial werden Group.defaultDrivers (sofern vorhanden) als Vorbelegung
  // uebernommen — der User kann sie editieren oder loeschen.
  const [marketDriversByGroup, setMarketDriversByGroup] = useState<
    Record<string, MarketDriver[]>
  >(() => {
    const initial: Record<string, MarketDriver[]> = {};
    for (const g of groups) {
      if (g.defaultDrivers && g.defaultDrivers.length > 0) {
        initial[g.id] = g.defaultDrivers.map((d) => ({ ...d }));
      }
    }
    // User-edited drivers take precedence — but only if from the same catalog version
    if (_r?.marketDriversByGroup && _r.catalogVersion === CATALOG_VERSION) {
      Object.assign(initial, _r.marketDriversByGroup);
    }
    return initial;
  });

  // Importierte Rollen — persisted in localStorage
  const [customRoles, setCustomRoles] = useState<Role[]>(() => {
    try {
      const raw = localStorage.getItem("skillworkshop_custom_roles");
      return raw ? (JSON.parse(raw) as Role[]) : [];
    } catch {
      return [];
    }
  });

  const [participants, setParticipants] = useState<Participant[]>(() => {
    if (_r?.participants && _r.participants.length > 0) return _r.participants;
    return [
      createParticipant(""),
      createParticipant(""),
      createParticipant(""),
    ];
  });

  // Persist custom roles separately (legacy key kept for backwards compatibility)
  useEffect(() => {
    localStorage.setItem(
      "skillworkshop_custom_roles",
      JSON.stringify(customRoles),
    );
  }, [customRoles]);

  // Persist full workshop session on every relevant state change
  useEffect(() => {
    const session: PersistedSession = {
      catalogVersion: CATALOG_VERSION,
      departmentId: department?.id ?? null,
      step,
      participants,
      marketDriversByGroup,
      customSkills,
      disabledBaseSkills: Array.from(disabledBaseSkills),
      renamedBaseSkills: Array.from(renamedBaseSkills),
      removedBaseSkills: Array.from(removedBaseSkills),
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
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    if (department) {
      if (savedTimerRef.current) clearTimeout(savedTimerRef.current);
      setSavedFlash(true);
      savedTimerRef.current = setTimeout(() => setSavedFlash(false), 2000);
    }
  }, [
    department,
    step,
    participants,
    marketDriversByGroup,
    customSkills,
    disabledBaseSkills,
    renamedBaseSkills,
    removedBaseSkills,
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
  ]);

  const handleImportRole = useCallback((role: Role) => {
    setCustomRoles((prev) => [
      ...prev.filter((r) => r.id !== role.id),
      role,
    ]);
  }, []);

  const handleDeleteCustomRole = useCallback(
    (id: string) => {
      setCustomRoles((prev) => prev.filter((r) => r.id !== id));
      if (department?.id === id) setDepartment(null);
    },
    [department],
  );

  const currentGroup: Group | null = useMemo(() => {
    if (!department) return null;
    return (
      groups.find((g) => g.roles.some((r) => r.id === department.id)) ?? null
    );
  }, [department]);

  const groupName = currentGroup?.name ?? "";

  // Custom roles haben keine Gruppe — drivers werden per role.id gespeichert.
  const driversKey = currentGroup?.id ?? department?.id ?? "";

  const currentGroupDrivers: MarketDriver[] = useMemo(() => {
    if (!driversKey) return [];
    return marketDriversByGroup[driversKey] ?? [];
  }, [driversKey, marketDriversByGroup]);

  // -------- Inventory builder --------

  /**
   * Aktuelle Skill-Kategorien (4 Dimensionen) inkl. deaktivierter Skills —
   * Konsumenten (SkillInventory zeigt alle, SelfAssessment / SkillProfile
   * filtern disabled raus). Umbenannte Base-Skills sind unsichtbar; ihr
   * Inhalt lebt als Custom-Skill weiter (siehe handleRenameSkill).
   */
  const skillCategories: SkillCategory[] = useMemo(() => {
    if (!department) return [];
    const validCategoryNames = new Set(
      department.categories.map((c) => c.name),
    );
    const baseByEffectiveCat: Record<string, Skill[]> = {};
    for (const cat of department.categories) baseByEffectiveCat[cat.name] = [];
    for (const cat of department.categories) {
      for (const s of cat.skills) {
        if (renamedBaseSkills.has(s.name)) continue;
        if (removedBaseSkills.has(s.name)) continue;
        const override = baseSkillCategoryOverrides[s.name];
        const target =
          override && validCategoryNames.has(override) ? override : cat.name;
        baseByEffectiveCat[target].push(
          withSkillOverrides(
            {
              ...s,
              dep: baseSkillOverrides[s.name] ?? s.dep,
              disabled: disabledBaseSkills.has(s.name),
            },
            skillDescriptionOverrides,
            skillTargetOverrides,
            skillAnchorsOverrides,
            skillTrendOverrides,
            skillTrendgrundOverrides,
            skillModelOverrides,
            skillKeyOverrides,
            skillLastModifiedOverrides,
          ),
        );
      }
    }
    return department.categories.map((cat) => ({
      name: cat.name,
      skills: [
        ...(baseByEffectiveCat[cat.name] ?? []),
        ...(customSkills[cat.name] ?? []).map((s) =>
          withSkillOverrides(
            s,
            skillDescriptionOverrides,
            skillTargetOverrides,
            skillAnchorsOverrides,
            skillTrendOverrides,
            skillTrendgrundOverrides,
            skillModelOverrides,
            skillKeyOverrides,
            skillLastModifiedOverrides,
          ),
        ),
      ],
    }));
  }, [
    department,
    customSkills,
    disabledBaseSkills,
    renamedBaseSkills,
    removedBaseSkills,
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
  ]);

  /** Aktive Kategorien (ohne deaktivierte Skills) — fuer Step 3 + 4. */
  const activeSkillCategories: SkillCategory[] = useMemo(
    () =>
      skillCategories.map((cat) => ({
        name: cat.name,
        skills: cat.skills.filter((s) => !s.disabled),
      })),
    [skillCategories],
  );

  /** Alle Spezialisierungsnamen in den aktiven Kategorien (sourceLabel != departmentName). */
  const availableSpecializations: string[] = useMemo(() => {
    if (!department) return [];
    const sources = new Set<string>();
    for (const cat of activeSkillCategories) {
      for (const skill of cat.skills) {
        if (skill.sourceLabel && skill.sourceLabel !== department.name) {
          sources.add(skill.sourceLabel);
        }
      }
    }
    return Array.from(sources).sort();
  }, [activeSkillCategories, department]);

  // -------- Helper: removeKey / renameKey for record overrides --------

  const removeOverrideKey = useCallback(
    <T,>(
      setState: React.Dispatch<React.SetStateAction<Record<string, T>>>,
      key: string,
    ) => {
      setState((prev) => {
        if (!Object.prototype.hasOwnProperty.call(prev, key)) return prev;
        const next = { ...prev };
        delete next[key];
        return next;
      });
    },
    [],
  );

  const renameOverrideKey = useCallback(
    <T,>(
      setState: React.Dispatch<React.SetStateAction<Record<string, T>>>,
      oldKey: string,
      newKey: string,
    ) => {
      setState((prev) => {
        if (!Object.prototype.hasOwnProperty.call(prev, oldKey)) return prev;
        const next = { ...prev };
        next[newKey] = next[oldKey];
        delete next[oldKey];
        return next;
      });
    },
    [],
  );

  /** Bumpt das lastModified-Datum eines Skills. */
  const bumpLastModified = useCallback((skillName: string) => {
    setSkillLastModifiedOverrides((prev) => ({
      ...prev,
      [skillName]: todayISO(),
    }));
  }, []);

  // -------- Handlers: native setup --------

  const handleNativeSetupComplete = useCallback(
    (name: string, key: string) => {
      setApiKey(key);
      setParticipants((prev) =>
        prev.map((p, i) => (i === 0 ? { ...p, name } : p)),
      );
      setNativeReady(true);
    },
    [],
  );

  // -------- Handlers: department selection --------

  const handleSelectDepartment = useCallback((dept: Department) => {
    setDepartment(dept);
    setCustomSkills({});
    setDisabledBaseSkills(new Set());
    setRenamedBaseSkills(new Set());
    setRemovedBaseSkills(new Set());
    setBaseSkillOverrides({});
    setBaseSkillCategoryOverrides({});
    setSkillDescriptionOverrides({});
    setSkillTargetOverrides({});
    setSkillAnchorsOverrides({});
    setSkillTrendOverrides({});
    setSkillTrendgrundOverrides({});
    setSkillModelOverrides({});
    setSkillKeyOverrides({});
    setSkillLastModifiedOverrides({});
    setParticipants((prev) => prev.map((p) => ({ ...p, ratings: {} })));
  }, []);

  const handleNewSession = useCallback(() => {
    if (!window.confirm("Neue Sitzung starten? Alle Teilnehmer, Bewertungen und Anpassungen werden gelöscht.")) return;
    localStorage.removeItem(STORAGE_KEY);
    setDepartment(null);
    setStep(1);
    setCustomSkills({});
    setDisabledBaseSkills(new Set());
    setRenamedBaseSkills(new Set());
    setRemovedBaseSkills(new Set());
    setBaseSkillOverrides({});
    setBaseSkillCategoryOverrides({});
    setSkillDescriptionOverrides({});
    setSkillTargetOverrides({});
    setSkillAnchorsOverrides({});
    setSkillTrendOverrides({});
    setSkillTrendgrundOverrides({});
    setSkillModelOverrides({});
    setSkillKeyOverrides({});
    setSkillLastModifiedOverrides({});
    setParticipants([
      createParticipant(""),
      createParticipant(""),
      createParticipant(""),
    ]);
    // Reset market drivers to catalog defaults
    setMarketDriversByGroup(() => {
      const initial: Record<string, MarketDriver[]> = {};
      for (const g of groups) {
        if (g.defaultDrivers && g.defaultDrivers.length > 0) {
          initial[g.id] = g.defaultDrivers.map((d) => ({ ...d }));
        }
      }
      return initial;
    });
  }, []);

  // -------- Handlers: skills --------

  const handleAddCustomSkill = useCallback(
    (category: string, skill: Skill) => {
      setCustomSkills((prev) => {
        const existing = prev[category] ?? [];
        if (existing.some((s) => s.name === skill.name)) return prev;
        return {
          ...prev,
          [category]: [
            ...existing,
            { ...skill, lastModified: skill.lastModified ?? todayISO() },
          ],
        };
      });
      bumpLastModified(skill.name);
    },
    [bumpLastModified],
  );

  const handleLoadSpecialization = useCallback(
    (role: Role) => {
      if (!department) return;
      // Collect all skill names already present (base + custom) to skip duplicates.
      const allCurrentNames = new Set<string>();
      for (const cat of department.categories) {
        for (const s of cat.skills) allCurrentNames.add(s.name);
      }
      for (const skills of Object.values(customSkills)) {
        for (const s of skills) allCurrentNames.add(s.name);
      }
      // Add empty category stubs for categories not yet in the department.
      const existingCatNames = new Set(department.categories.map((c) => c.name));
      const newCatStubs = role.categories
        .filter((c) => !existingCatNames.has(c.name))
        .map((c) => ({ name: c.name, skills: [] as Skill[] }));
      if (newCatStubs.length > 0) {
        setDepartment((prev) =>
          prev ? { ...prev, categories: [...prev.categories, ...newCatStubs] } : prev,
        );
      }
      // Add non-duplicate skills as custom skills (keeps all existing state intact).
      for (const cat of role.categories) {
        for (const skill of cat.skills) {
          if (!allCurrentNames.has(skill.name)) {
            handleAddCustomSkill(cat.name, { ...skill, sourceLabel: role.name });
          }
        }
      }
    },
    [department, customSkills, handleAddCustomSkill],
  );

  /**
   * Endgueltig loeschen (Override zu ANF-18 (9) per User-Wunsch). Anders als
   * Deaktivieren ist das eine destruktive Aktion: Bewertungen, Overrides und
   * Driver-Verlinkungen werden mitgeloescht. Reaktivierung ist nicht moeglich.
   * Confirm-Dialog wird in der UI vorgeschaltet.
   */
  const handleDeleteSkill = useCallback(
    (category: string, skillName: string, isCustom: boolean) => {
      if (isCustom) {
        setCustomSkills((prev) => {
          const existing = prev[category] ?? [];
          return {
            ...prev,
            [category]: existing.filter((s) => s.name !== skillName),
          };
        });
      } else {
        setRemovedBaseSkills((prev) => {
          const next = new Set(prev);
          next.add(skillName);
          return next;
        });
        // Base-spezifische Overrides bereinigen.
        removeOverrideKey(setBaseSkillOverrides, skillName);
        removeOverrideKey(setBaseSkillCategoryOverrides, skillName);
        setDisabledBaseSkills((prev) => {
          if (!prev.has(skillName)) return prev;
          const next = new Set(prev);
          next.delete(skillName);
          return next;
        });
      }
      // Property-Overrides fuer beide Faelle bereinigen.
      removeOverrideKey(setSkillDescriptionOverrides, skillName);
      removeOverrideKey(setSkillTargetOverrides, skillName);
      removeOverrideKey(setSkillAnchorsOverrides, skillName);
      removeOverrideKey(setSkillTrendOverrides, skillName);
      removeOverrideKey(setSkillTrendgrundOverrides, skillName);
      removeOverrideKey(setSkillModelOverrides, skillName);
      removeOverrideKey(setSkillKeyOverrides, skillName);
      removeOverrideKey(setSkillLastModifiedOverrides, skillName);
      // Ratings entfernen — Skill ist endgueltig weg.
      setParticipants((prev) =>
        prev.map((p) => {
          if (!Object.prototype.hasOwnProperty.call(p.ratings, skillName)) {
            return p;
          }
          const next = { ...p.ratings };
          delete next[skillName];
          return { ...p, ratings: next };
        }),
      );
      // Driver-Verlinkungen aufraeumen.
      setMarketDriversByGroup((prev) => {
        const next: Record<string, MarketDriver[]> = {};
        for (const [groupId, drivers] of Object.entries(prev)) {
          next[groupId] = drivers.map((d) => ({
            ...d,
            affectedSkillNames: d.affectedSkillNames.filter(
              (n) => n !== skillName,
            ),
          }));
        }
        return next;
      });
    },
    [removeOverrideKey],
  );

  /**
   * ANF-18 (9): Skill deaktivieren statt loeschen — Bewertungen bleiben
   * erhalten, der Skill kann reaktiviert werden.
   */
  const handleToggleDisableSkill = useCallback(
    (category: string, skillName: string, isCustom: boolean) => {
      if (isCustom) {
        setCustomSkills((prev) => {
          const existing = prev[category] ?? [];
          return {
            ...prev,
            [category]: existing.map((s) =>
              s.name === skillName ? { ...s, disabled: !s.disabled } : s,
            ),
          };
        });
      } else {
        setDisabledBaseSkills((prev) => {
          const next = new Set(prev);
          if (next.has(skillName)) next.delete(skillName);
          else next.add(skillName);
          return next;
        });
      }
      bumpLastModified(skillName);
    },
    [bumpLastModified],
  );

  const handleChangeBaseSkillDep = useCallback(
    (skillName: string, dep: DepClassification) => {
      setBaseSkillOverrides((prev) => ({ ...prev, [skillName]: dep }));
      bumpLastModified(skillName);
    },
    [bumpLastModified],
  );

  const handleChangeCustomSkillDep = useCallback(
    (category: string, skillName: string, dep: DepClassification) => {
      setCustomSkills((prev) => {
        const existing = prev[category] ?? [];
        return {
          ...prev,
          [category]: existing.map((s) =>
            s.name === skillName ? { ...s, dep } : s,
          ),
        };
      });
      bumpLastModified(skillName);
    },
    [bumpLastModified],
  );

  const handleMoveBaseSkill = useCallback(
    (skillName: string, toCategory: string) => {
      setBaseSkillCategoryOverrides((prev) => ({
        ...prev,
        [skillName]: toCategory,
      }));
      bumpLastModified(skillName);
    },
    [bumpLastModified],
  );

  const handleMoveCustomSkill = useCallback(
    (fromCategory: string, skillName: string, toCategory: string) => {
      if (fromCategory === toCategory) return;
      setCustomSkills((prev) => {
        const fromList = prev[fromCategory] ?? [];
        const skill = fromList.find((s) => s.name === skillName);
        if (!skill) return prev;
        const remaining = fromList.filter((s) => s.name !== skillName);
        const toList = prev[toCategory] ?? [];
        if (toList.some((s) => s.name === skillName)) {
          return { ...prev, [fromCategory]: remaining };
        }
        return {
          ...prev,
          [fromCategory]: remaining,
          [toCategory]: [...toList, skill],
        };
      });
      bumpLastModified(skillName);
    },
    [bumpLastModified],
  );

  // -------- Handlers: Steckbrief / Zielwert / Anker (ANF-03/06/07) --------

  const handleEditSkillDescription = useCallback(
    (skillName: string, description: string) => {
      setSkillDescriptionOverrides((prev) => ({
        ...prev,
        [skillName]: description,
      }));
      bumpLastModified(skillName);
    },
    [bumpLastModified],
  );

  const handleEditSkillTarget = useCallback(
    (skillName: string, target: DreyfusAnchorLevel | null) => {
      setSkillTargetOverrides((prev) => ({ ...prev, [skillName]: target }));
      bumpLastModified(skillName);
    },
    [bumpLastModified],
  );

  const handleEditSkillAnchor = useCallback(
    (skillName: string, level: DreyfusAnchorLevel, text: string) => {
      setSkillAnchorsOverrides((prev) => {
        const current = prev[skillName] ?? {};
        const next: SkillAnchors = { ...current, [level]: text };
        if (!text) delete next[level];
        return { ...prev, [skillName]: next };
      });
      bumpLastModified(skillName);
    },
    [bumpLastModified],
  );

  // -------- Handlers: Relevanztrend (ANF-14) --------

  const handleEditSkillTrend = useCallback(
    (skillName: string, trend: RelevanceTrend | null) => {
      setSkillTrendOverrides((prev) => ({ ...prev, [skillName]: trend }));
      bumpLastModified(skillName);
    },
    [bumpLastModified],
  );

  const handleEditSkillTrendgrund = useCallback(
    (skillName: string, trendgrund: string) => {
      setSkillTrendgrundOverrides((prev) => ({
        ...prev,
        [skillName]: trendgrund,
      }));
      bumpLastModified(skillName);
    },
    [bumpLastModified],
  );

  // -------- Handlers: Schluesselkompetenz (ANF-18 / 10) --------

  const handleEditSkillKey = useCallback(
    (skillName: string, isKey: boolean) => {
      setSkillKeyOverrides((prev) => ({ ...prev, [skillName]: isKey }));
      bumpLastModified(skillName);
    },
    [bumpLastModified],
  );

  // -------- Handlers: Markt- & Kundentreiber (ANF-15) --------

  const handleSetGroupDrivers = useCallback(
    (groupId: string, drivers: MarketDriver[]) => {
      setMarketDriversByGroup((prev) => ({ ...prev, [groupId]: drivers }));
    },
    [],
  );

  // -------- Handler: Skill umbenennen (ANF-18 / 2) --------

  /**
   * Umbenennen von Skills:
   * - Custom-Skill: direkt im Array umbenannt; Overrides + ratings + drivers
   *   migrieren von oldName auf newName.
   * - Base-Skill: deaktivieren-und-ersetzen-als-Custom — ein neuer Custom-Skill
   *   uebernimmt alle effektiven Eigenschaften unter dem neuen Namen, der
   *   originale Base-Skill wird als "umbenannt" markiert (aus der Inventur
   *   entfernt). Bewertungen und Driver-Zuordnungen migrieren auf newName.
   */
  const handleRenameSkill = useCallback(
    (oldName: string, newName: string) => {
      const trimmed = newName.trim();
      if (!trimmed || trimmed === oldName) return;
      if (trimmed.length < 2 || trimmed.length > 80) return;

      // Eindeutigkeit pruefen — gegen alle aktuell sichtbaren Skill-Namen.
      const taken = new Set<string>();
      if (department) {
        for (const cat of department.categories) {
          for (const s of cat.skills) {
            if (renamedBaseSkills.has(s.name)) continue;
            if (s.name === oldName) continue;
            taken.add(s.name);
          }
        }
      }
      for (const list of Object.values(customSkills)) {
        for (const s of list) {
          if (s.name === oldName) continue;
          taken.add(s.name);
        }
      }
      if (taken.has(trimmed)) return;

      // Custom-Skill?
      let customCategory: string | null = null;
      for (const [cat, list] of Object.entries(customSkills)) {
        if (list.some((s) => s.name === oldName)) {
          customCategory = cat;
          break;
        }
      }

      if (customCategory) {
        // Direct rename im customSkills-Array.
        setCustomSkills((prev) => {
          const list = prev[customCategory!] ?? [];
          return {
            ...prev,
            [customCategory!]: list.map((s) =>
              s.name === oldName
                ? { ...s, name: trimmed, lastModified: todayISO() }
                : s,
            ),
          };
        });
        // Migriere Overrides oldName → trimmed.
        renameOverrideKey(setSkillDescriptionOverrides, oldName, trimmed);
        renameOverrideKey(setSkillTargetOverrides, oldName, trimmed);
        renameOverrideKey(setSkillAnchorsOverrides, oldName, trimmed);
        renameOverrideKey(setSkillTrendOverrides, oldName, trimmed);
        renameOverrideKey(setSkillTrendgrundOverrides, oldName, trimmed);
        renameOverrideKey(setSkillModelOverrides, oldName, trimmed);
        renameOverrideKey(setSkillKeyOverrides, oldName, trimmed);
        renameOverrideKey(setSkillLastModifiedOverrides, oldName, trimmed);
      } else if (department) {
        // Base-Skill suchen.
        let baseCat: string | null = null;
        let baseSkill: Skill | null = null;
        for (const cat of department.categories) {
          const found = cat.skills.find((s) => s.name === oldName);
          if (found) {
            baseCat = cat.name;
            baseSkill = found;
            break;
          }
        }
        if (!baseSkill || !baseCat) return;
        const effectiveCat =
          baseSkillCategoryOverrides[oldName] ?? baseCat;
        const effective = withSkillOverrides(
          { ...baseSkill, dep: baseSkillOverrides[oldName] ?? baseSkill.dep },
          skillDescriptionOverrides,
          skillTargetOverrides,
          skillAnchorsOverrides,
          skillTrendOverrides,
          skillTrendgrundOverrides,
          skillModelOverrides,
          skillKeyOverrides,
          skillLastModifiedOverrides,
        );
        const newCustom: Skill = {
          ...effective,
          name: trimmed,
          disabled: false,
          lastModified: todayISO(),
        };
        // Markiere Base als umbenannt.
        setRenamedBaseSkills((prev) => {
          const next = new Set(prev);
          next.add(oldName);
          return next;
        });
        // Bereinige base-spezifische Maps fuer oldName.
        removeOverrideKey(setBaseSkillOverrides, oldName);
        removeOverrideKey(setBaseSkillCategoryOverrides, oldName);
        setDisabledBaseSkills((prev) => {
          if (!prev.has(oldName)) return prev;
          const next = new Set(prev);
          next.delete(oldName);
          return next;
        });
        // Lege Custom-Skill an.
        setCustomSkills((prev) => {
          const list = prev[effectiveCat] ?? [];
          if (list.some((s) => s.name === trimmed)) return prev;
          return { ...prev, [effectiveCat]: [...list, newCustom] };
        });
        // Bereinige property-Overrides fuer oldName (Inhalt ist im Custom).
        removeOverrideKey(setSkillDescriptionOverrides, oldName);
        removeOverrideKey(setSkillTargetOverrides, oldName);
        removeOverrideKey(setSkillAnchorsOverrides, oldName);
        removeOverrideKey(setSkillTrendOverrides, oldName);
        removeOverrideKey(setSkillTrendgrundOverrides, oldName);
        removeOverrideKey(setSkillModelOverrides, oldName);
        removeOverrideKey(setSkillKeyOverrides, oldName);
        removeOverrideKey(setSkillLastModifiedOverrides, oldName);
      } else {
        return;
      }

      // Migriere ratings & drivers (egal ob Custom oder Base).
      setParticipants((prev) =>
        prev.map((p) => {
          if (!Object.prototype.hasOwnProperty.call(p.ratings, oldName)) {
            return p;
          }
          const next = { ...p.ratings };
          next[trimmed] = next[oldName];
          delete next[oldName];
          return { ...p, ratings: next };
        }),
      );
      setMarketDriversByGroup((prev) => {
        const next: Record<string, MarketDriver[]> = {};
        for (const [groupId, drivers] of Object.entries(prev)) {
          next[groupId] = drivers.map((d) => ({
            ...d,
            affectedSkillNames: d.affectedSkillNames.map((n) =>
              n === oldName ? trimmed : n,
            ),
          }));
        }
        return next;
      });

      // lastModified am neuen Namen setzen.
      setSkillLastModifiedOverrides((prev) => ({
        ...prev,
        [trimmed]: todayISO(),
      }));
    },
    [
      department,
      customSkills,
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
      removeOverrideKey,
      renameOverrideKey,
    ],
  );

  // -------- Step transition: Inventur → Selbsteinschaetzung --------

  /**
   * Vor dem Wechsel in Schritt 3 werden Bewertungen fuer Skills entfernt, die
   * inzwischen nicht mehr existieren (umbenannt).  Ratings deaktivierter
   * Skills bleiben erhalten — bei Reaktivierung sind sie wieder verfuegbar.
   */
  const handleProceedToAssessment = useCallback(() => {
    const validNames = new Set<string>();
    for (const cat of skillCategories) {
      for (const skill of cat.skills) validNames.add(skill.name);
    }
    setParticipants((prev) =>
      prev.map((p) => {
        const next: Record<string, DreyfusLevel> = {};
        for (const [name, level] of Object.entries(p.ratings)) {
          if (validNames.has(name)) next[name] = level;
        }
        return { ...p, ratings: next };
      }),
    );
    setStep(3);
  }, [skillCategories]);

  // -------- Handlers: participants --------

  const handleSetParticipantName = useCallback(
    (index: number, name: string) => {
      setParticipants((prev) =>
        prev.map((p, i) => (i === index ? { ...p, name } : p)),
      );
    },
    [],
  );

  const handleAddParticipant = useCallback(() => {
    setParticipants((prev) => [...prev, createParticipant("")]);
  }, []);

  const handleRemoveParticipant = useCallback((index: number) => {
    setParticipants((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleSetRatings = useCallback(
    (index: number, ratings: Record<string, DreyfusLevel>) => {
      setParticipants((prev) =>
        prev.map((p, i) => (i === index ? { ...p, ratings } : p)),
      );
    },
    [],
  );

  const handleSetParticipantRoles = useCallback(
    (index: number, roles: string[]) => {
      setParticipants((prev) =>
        prev.map((p, i) =>
          i === index ? { ...p, specializationRoles: roles } : p,
        ),
      );
    },
    [],
  );

  // Keyboard shortcut: "?" toggles help panel
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      if (e.key === "?" || (e.key === "h" && !e.ctrlKey && !e.metaKey)) {
        e.preventDefault();
        setHelpOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setHelpOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!nativeReady) {
    return <NativeSetup onComplete={handleNativeSetupComplete} />;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="app-drag bg-slate-900 px-6 py-3 text-white no-print">
        <div className="flex items-center justify-between">
          {/* Spacer fuer macOS Traffic-Lights, nur in der nativen App. */}
          {isNativeApp && <div className="w-20 shrink-0" aria-hidden />}
          <div className="min-w-0 flex-1">
            <p className="text-[10px] uppercase tracking-widest text-gray-400">
              Skill Workshop{isNativeApp ? " — Native App" : ""} v
              {__APP_VERSION__}
            </p>
            <h1 className="truncate text-lg font-bold">
              {department
                ? `${department.name} — Skill-Inventur`
                : "Skill-Inventur"}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            {!isNativeApp && (
              <div className="flex items-center gap-2">
                <label className="text-[10px] uppercase tracking-wide text-gray-400">
                  API Key
                </label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="sk-ant-..."
                  className="w-44 rounded border border-gray-600 bg-slate-800 px-2 py-1 font-mono text-xs text-gray-300 placeholder-gray-600 focus:border-indigo-400 focus:outline-none"
                />
                {apiKey && (
                  <span
                    className={`h-2 w-2 rounded-full ${apiKey.startsWith("sk-") ? "bg-emerald-400" : "bg-red-400"}`}
                    title={
                      apiKey.startsWith("sk-") ? "Key erkannt" : "Ungueltiger Key"
                    }
                  />
                )}
              </div>
            )}
            {department && (
              <>
                <span
                  className={`flex items-center gap-1 text-xs transition-opacity duration-700 ${savedFlash ? "opacity-100 text-emerald-400" : "opacity-0"}`}
                  aria-live="polite"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Gespeichert
                </span>
                <button
                  onClick={handleNewSession}
                  className="rounded px-2 py-1 text-xs text-gray-400 hover:bg-slate-700 hover:text-gray-200"
                  title="Sitzung verwerfen und neu starten"
                >
                  Neue Sitzung
                </button>
              </>
            )}
            <HelpButton onClick={() => setHelpOpen(true)} />
          </div>
        </div>
      </header>

      <Stepper steps={STEPS} current={step} />

      <main className="flex-1">
        {step === 1 && (
          <DepartmentSelect
            selected={department}
            onSelect={handleSelectDepartment}
            onNext={() => setStep(2)}
            customRoles={customRoles}
            onImportRole={handleImportRole}
            onDeleteCustomRole={handleDeleteCustomRole}
          />
        )}
        {step === 2 && department && (
          <SkillInventory
            department={department}
            customSkills={customSkills}
            disabledBaseSkills={disabledBaseSkills}
            renamedBaseSkills={renamedBaseSkills}
            baseSkillOverrides={baseSkillOverrides}
            baseSkillCategoryOverrides={baseSkillCategoryOverrides}
            skillDescriptionOverrides={skillDescriptionOverrides}
            skillTargetOverrides={skillTargetOverrides}
            skillAnchorsOverrides={skillAnchorsOverrides}
            skillTrendOverrides={skillTrendOverrides}
            skillTrendgrundOverrides={skillTrendgrundOverrides}
            skillModelOverrides={skillModelOverrides}
            skillKeyOverrides={skillKeyOverrides}
            skillLastModifiedOverrides={skillLastModifiedOverrides}
            onAddCustomSkill={handleAddCustomSkill}
            onToggleDisableSkill={handleToggleDisableSkill}
            onDeleteSkill={handleDeleteSkill}
            onRenameSkill={handleRenameSkill}
            onChangeBaseSkillDep={handleChangeBaseSkillDep}
            onChangeCustomSkillDep={handleChangeCustomSkillDep}
            onMoveBaseSkill={handleMoveBaseSkill}
            onMoveCustomSkill={handleMoveCustomSkill}
            onEditSkillDescription={handleEditSkillDescription}
            onEditSkillTarget={handleEditSkillTarget}
            onEditSkillAnchor={handleEditSkillAnchor}
            onEditSkillTrend={handleEditSkillTrend}
            onEditSkillTrendgrund={handleEditSkillTrendgrund}
            onEditSkillKey={handleEditSkillKey}
            currentGroup={currentGroup}
            groupDrivers={currentGroupDrivers}
            onSetGroupDrivers={(key, drivers) =>
              handleSetGroupDrivers(key || driversKey, drivers)
            }
            onLoadSpecialization={handleLoadSpecialization}
            customRoles={customRoles}
            onProceed={handleProceedToAssessment}
            onBack={() => setStep(1)}
          />
        )}
        {step === 3 && department && (
          <SelfAssessment
            departmentName={department.name}
            groupName={groupName}
            categories={activeSkillCategories}
            participants={participants}
            availableSpecializations={availableSpecializations}
            onSetParticipantName={handleSetParticipantName}
            onSetParticipantRoles={handleSetParticipantRoles}
            onAddParticipant={handleAddParticipant}
            onRemoveParticipant={handleRemoveParticipant}
            onSetRatings={handleSetRatings}
            onNext={() => setStep(4)}
            onBack={() => setStep(2)}
          />
        )}
        {step === 4 && department && (
          <SkillProfile
            departmentName={department.name}
            groupName={groupName}
            categories={activeSkillCategories}
            participants={participants}
            drivers={currentGroupDrivers}
            onEditSkillTarget={handleEditSkillTarget}
            onBack={() => setStep(3)}
          />
        )}
      </main>

      <footer className="border-t border-gray-200 bg-white px-6 py-3 text-center text-xs text-gray-400 no-print">
        Skill-Workshop Tool v0.1.0-beta &middot; Dreyfus- & Bloom-basierte
        Kompetenzanalyse &middot; {new Date().getFullYear()}
      </footer>

      <HelpPanel
        open={helpOpen}
        onClose={() => setHelpOpen(false)}
        currentStep={step}
      />
    </div>
  );
}
