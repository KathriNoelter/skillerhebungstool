import { useState } from "react";

// -------------------- Data --------------------

interface HelpSection {
  title: string;
  content: string;
}

interface StepHelp {
  heading: string;
  intro: string;
  sections: HelpSection[];
}

const STEP_HELP: Record<number, StepHelp> = {
  1: {
    heading: "Gruppe & Rolle waehlen",
    intro:
      "Im ersten Schritt legst du fest, welche Rolle im Workshop analysiert werden soll. Die Auswahl bestimmt, welche Skills in den folgenden Schritten zur Verfuegung stehen.",
    sections: [
      {
        title: "Was muss ich tun?",
        content:
          "Waehle zuerst deine Gruppe (z.B. Business Consulting, Software Development) und dann deine konkrete Rolle innerhalb dieser Gruppe. Du siehst eine Vorschau der Rollenbeschreibung und der zugehoerigen Skill-Kategorien.",
      },
      {
        title: "Warum ist das wichtig?",
        content:
          "Jede Rolle hat ein kuratiertes Skill-Profil mit 3-4 Kategorien und 12-20 Skills. Die richtige Auswahl stellt sicher, dass die Analyse auf deine tatsaechliche Taetigkeit zugeschnitten ist.",
      },
      {
        title: "Tipp",
        content:
          "Wenn deine exakte Rolle nicht vorhanden ist, waehle die naechstliegende — du kannst im naechsten Schritt Skills anpassen, hinzufuegen oder entfernen.",
      },
    ],
  },
  2: {
    heading: "Skill-Inventur",
    intro:
      "Alle Skills der Rolle in einem Tab — geordnet nach den Dimensionen deiner Rolle (z.B. Fachlich, Technisch, Methodisch und ein bis zwei soziale/kommunikative Dimensionen). Die Zukunftsperspektive je Skill wird ueber den Relevanztrend abgebildet, nicht ueber eine separate Liste.",
    sections: [
      {
        title: "Skills-Tab",
        content:
          "Zeigt alle Skills deiner Rolle gruppiert nach ihren Dimensionen. Du kannst Skills ergaenzen, in andere Dimensionen verschieben und pro Skill Steckbrief, Zielwert, Verhaltensanker, Bewertungsmodell sowie Trend pflegen.",
      },
      {
        title: "Skills redaktionell pflegen (ohne Code-Eingriff)",
        content:
          "Alle Pflege-Aktionen sind direkt in der UI moeglich:\n• Skill hinzufuegen / umbenennen (Stift-Icon neben dem Namen)\n• Skill in andere Dimension verschieben\n• DEP-Klasse, Bewertungsmodell, Zielwert, Verhaltensanker setzen\n• Trend & Trendbegruendung pflegen\n• Schluesselkompetenz-Badge (★) im Detail-Editor toggeln\n• Skill deaktivieren statt loeschen (Bewertungen bleiben erhalten — Reaktivierung jederzeit moeglich)\n• Datum der letzten Aenderung wird automatisch je Skill gesetzt und angezeigt.",
      },
      {
        title: "Zukunftsrelevante Skills per KI vorschlagen",
        content:
          "Claude analysiert den aktuellen Katalog und schlaegt 8-12 zukunftsrelevante Skills vor (API Key noetig). Vorschlaege werden direkt in die passende Dimension eingefuegt — mit Trend stark steigend und einer kurzen KI-Begruendung.\n\nLeitfrage: Welche Skills muessen wir ergaenzen, damit unsere Rolle in 2026-2028 zukunftsfaehig bleibt?",
      },
      {
        title: "Trend-Filter",
        content:
          "Ueber die Filter-Pillen oben kannst du die Skill-Liste nach Relevanztrend einschraenken (↑↑ stark steigend / ↑ steigend / → stabil / ↓ sinkend / ohne Trend). Skills bleiben in ihrer Dimension — nur die Sichtbarkeit aendert sich.",
      },
      {
        title: "Markttreiber-Tab",
        content:
          "Erfasse externe Entwicklungen (Technologie, Regulatorik, Kundenbedarfe), die die Skill-Anforderungen der Rollengruppe veraendern. Markttreiber gelten gruppenweit — sie persistieren beim Wechsel der Rolle.",
      },
      {
        title: "Halbwertszeit (DEP) vs. Trend",
        content:
          "DEP — Durable (>7 Jahre): zeitlose Skills wie Kommunikation, kritisches Denken. Evolving (2,5–7 Jahre): wandelbare Skills wie Agile Methoden, Cloud. Perishable (<2,5 Jahre): kurzlebige Skills wie Tool-Versionen.\n\nTrend — ↑↑/↑/→/↓ beschreibt die Marktrelevanzentwicklung der naechsten 0–5 Jahre. Beide Achsen sind unabhaengig: ein Durable-Skill kann stark steigend sein (Geschaeftsprozessverstaendnis), ein Perishable-Skill kann kurzfristig hoch relevant sein.",
      },
    ],
  },
  3: {
    heading: "Selbsteinschaetzung per Excel",
    intro:
      "Jeder Teilnehmer bewertet seine eigenen Skills in einer vorbereiteten Excel-Datei. Kathrin verschickt die Vorlagen und importiert die Antworten zurueck in das Tool.",
    sections: [
      {
        title: "Ablauf",
        content:
          "1. Teilnehmer-Namen eintragen.\n2. Pro Teilnehmer 'Vorlage herunterladen' klicken und die Datei per Mail versenden.\n3. Teilnehmer fuellt die Spalte 'Dein Level (0-5)' aus und schickt die Datei zurueck.\n4. Ueber 'Ausgefuellte Vorlagen importieren' eine oder mehrere Dateien auswaehlen - die Zuordnung erfolgt automatisch ueber den Namen.",
      },
      {
        title: "Die 6 Kompetenzstufen",
        content:
          "0 — Unkenntnis: Hat noch keine Beruehrung mit dem Skill.\n1 — Grundwissen: Kennt die Grundbegriffe, braucht enge Anleitung.\n2 — Anwendungswissen: Wendet es in einfachen Faellen mit Unterstuetzung an.\n3 — Selbststaendigkeit: Wendet es selbststaendig im Alltag an.\n4 — Souveraenitaet: Meistert auch komplexe Situationen, beraet andere.\n5 — Meisterschaft: Entwickelt neue Loesungen, gibt Wissen strukturiert weiter.",
      },
      {
        title: "Tipps",
        content:
          "Die Excel-Vorlage enthaelt einen Hinweis zur Skala und ein Metadaten-Sheet mit Teilnehmer-Name, Rolle und Datum. Name nicht aendern — er dient der Zuordnung beim Import. Unbekannte oder veraltete Skill-Namen werden beim Import gemeldet.",
      },
    ],
  },
  4: {
    heading: "Auswertung",
    intro:
      "Konsolidierte Uebersicht aller Bewertungen mit Gruppen-Durchschnitt, Top 5 Entwicklungsfeldern und Top 5 Staerken.",
    sections: [
      {
        title: "Was sehe ich hier?",
        content:
          "Pro Skill: die Einzelbewertungen aller Teilnehmer (optional ausblendbar) und der Gruppen-Durchschnitt. Farben folgen dem Dreyfus-Modell: Rot (1), Orange (2), Gelb (3), Blau (4), Gruen (5).",
      },
      {
        title: "Einzelantworten ein-/ausblenden",
        content:
          "Ueber die Checkbox 'Einzelantworten anzeigen' werden die Teilnehmer-Spalten ein- oder ausgeblendet. Fuer die Praesentation beim Workshop-Debriefing sind oft nur die Durchschnitte relevant.",
      },
      {
        title: "Download: PDF oder Excel",
        content:
          "Ueber die Buttons rechts oben kannst du die Auswertung als PDF (per Druck-Dialog) oder als Excel-Datei (Matrix + Zusammenfassungsblatt) speichern. Der Toggle 'Einzelantworten anzeigen' beeinflusst das PDF, die Excel-Datei enthaelt stets alle Einzelwerte.",
      },
      {
        title: "Top 5 Entwicklungsfelder & Staerken",
        content:
          "Automatisch aus den Bewertungen berechnet: die 5 Skills mit niedrigstem Durchschnitt (Entwicklungsfelder) und die 5 Skills mit hoechstem Durchschnitt (Staerken). Diskutiert diese als Ausgangspunkt fuer konkrete Entwicklungsmassnahmen.",
      },
    ],
  },
};

const GENERAL_HELP: HelpSection[] = [
  {
    title: "Was ist der Skill-Workshop?",
    content:
      "Ein strukturierter Prozess zur Erhebung und Analyse von Team-Kompetenzen. In 4 Schritten erfasst ihr den Ist-Stand, holt die Selbsteinschaetzungen per Excel ein und erhaltet eine datenbasierte Auswertung.",
  },
  {
    title: "Das Dreyfus-Modell",
    content:
      "Das Dreyfus-Modell beschreibt 5 Kompetenzstufen:\n\n1 — Anfaenger: Befolgt Regeln, braucht Anleitung\n2 — Fortgeschr. Anfaenger: Erkennt Situationen, braucht Orientierung\n3 — Kompetent: Plant eigenstaendig, setzt Prioritaeten\n4 — Gewandt: Ganzheitliches Verstaendnis, intuitives Handeln\n5 — Experte: Innoviert, mentort, meistert das Unerwartete",
  },
  {
    title: "Skill-Halbwertszeit (DEP)",
    content:
      "Jeder Skill hat eine Halbwertszeit-Klassifikation:\n\nDurable (> 7 Jahre): Zeitlose Skills wie Kommunikation, kritisches Denken, Problemloesung. Investitionen zahlen sich langfristig aus.\n\nEvolving (2,5-7 Jahre): Skills die sich weiterentwickeln — Agile Methoden, Cloud-Technologien, KI-Tools. Regelmaessiges Update noetig.\n\nPerishable (< 2,5 Jahre): Kurzlebige Skills wie spezifische Tool-Versionen oder APIs. Schnell veraltet, gezielt investieren.",
  },
  {
    title: "Brauche ich einen API Key?",
    content:
      "Der Workshop funktioniert vollstaendig ohne API Key. Der Key wird nur fuer die KI-gestuetzte Generierung von Vorschlaegen fuer zukunftsrelevante Skills in Schritt 2 benoetigt. Alle anderen Schritte (inkl. Auswertung) laufen lokal.",
  },
  {
    title: "Workshop-Ablauf auf einen Blick",
    content:
      "1. Gruppe & Rolle — Kontext festlegen\n2. Skill-Inventur — alle Skills in einem Tab pflegen (Dimensionen je Rolle, Trend statt separater Zukunfts-Liste)\n3. Selbsteinschaetzung — Excel-Vorlagen versenden und Antworten importieren\n4. Auswertung — Skill-Profil, Top 5 Felder, PDF/Excel-Export",
  },
];

// -------------------- Component --------------------

function SectionBlock({ section }: { section: HelpSection }) {
  const lines = section.content.split("\n");
  return (
    <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
      <h4 className="text-sm font-semibold text-slate-800">{section.title}</h4>
      <div className="mt-2 space-y-1">
        {lines.map((line, i) => {
          if (line.trim() === "") return <div key={i} className="h-1" />;
          return (
            <p key={i} className="text-sm leading-relaxed text-gray-600">
              {line}
            </p>
          );
        })}
      </div>
    </div>
  );
}

export function HelpPanel({
  open,
  onClose,
  currentStep,
}: {
  open: boolean;
  onClose: () => void;
  currentStep: number;
}) {
  const [tab, setTab] = useState<"step" | "general">("step");

  const stepHelp = STEP_HELP[currentStep];

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/20 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Panel */}
      <div
        className={`no-print fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-gray-200 bg-white shadow-xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 bg-slate-900 px-5 py-4">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-gray-400">
              Workshop-Hilfe
            </p>
            <h2 className="text-base font-bold text-white">
              Handbuch & Anleitung
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-gray-400 transition hover:bg-slate-800 hover:text-white"
            title="Schliessen"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 bg-white">
          <button
            onClick={() => setTab("step")}
            className={`flex-1 px-4 py-2.5 text-sm font-medium transition ${
              tab === "step"
                ? "border-b-2 border-slate-800 text-slate-800"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Schritt {currentStep}
          </button>
          <button
            onClick={() => setTab("general")}
            className={`flex-1 px-4 py-2.5 text-sm font-medium transition ${
              tab === "general"
                ? "border-b-2 border-slate-800 text-slate-800"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Allgemein
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 py-5">
          {tab === "step" && stepHelp && (
            <div className="space-y-4">
              {/* Step indicator */}
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-sm font-bold text-white">
                  {currentStep}
                </span>
                <h3 className="text-base font-bold text-slate-800">
                  {stepHelp.heading}
                </h3>
              </div>

              {/* Intro */}
              <p className="text-sm leading-relaxed text-gray-600">
                {stepHelp.intro}
              </p>

              {/* Sections */}
              {stepHelp.sections.map((section, i) => (
                <SectionBlock key={i} section={section} />
              ))}
            </div>
          )}

          {tab === "general" && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-800">
                Allgemeine Informationen
              </h3>
              {GENERAL_HELP.map((section, i) => (
                <SectionBlock key={i} section={section} />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 bg-gray-50 px-5 py-3">
          <p className="text-center text-xs text-gray-400">
            Druecke{" "}
            <kbd className="rounded border border-gray-300 bg-white px-1.5 py-0.5 font-mono text-[10px]">
              ?
            </kbd>{" "}
            oder klicke den Hilfe-Button um dieses Panel zu oeffnen.
          </p>
        </div>
      </div>
    </>
  );
}

// -------------------- Help Button --------------------

export function HelpButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-600 text-sm font-bold text-gray-300 transition hover:border-gray-400 hover:bg-slate-800 hover:text-white"
      title="Hilfe & Handbuch oeffnen"
    >
      ?
    </button>
  );
}
