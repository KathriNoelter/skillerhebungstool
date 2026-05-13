import { useState } from "react";

const PRIO = {
  kritisch: { label: "Kritisch", bg: "#fef2f2", fg: "#991b1b", border: "#fecaca", dot: "#ef4444" },
  hoch:     { label: "Hoch",     bg: "#fff7ed", fg: "#9a3412", border: "#fed7aa", dot: "#f97316" },
  mittel:   { label: "Mittel",   bg: "#fefce8", fg: "#854d0e", border: "#fef08a", dot: "#eab308" },
  niedrig:  { label: "Niedrig",  bg: "#f9fafb", fg: "#4b5563", border: "#e5e7eb", dot: "#9ca3af" },
};

const STATUS = {
  offen:       { label: "Offen",        bg: "#f3f4f6", fg: "#4b5563" },
  in_arbeit:   { label: "In Arbeit",    bg: "#dbeafe", fg: "#1e40af" },
  umgesetzt:   { label: "Umgesetzt",    bg: "#dcfce7", fg: "#166534" },
  neu:         { label: "Neu",          bg: "#fef9c3", fg: "#854d0e" },
};

const KATEGORIEN = [
  { id: "struktur",     label: "Struktur & Dimensionen" },
  { id: "skillpflege",  label: "Skill-Pflege" },
  { id: "bewertung",    label: "Bewertung & Zielwerte" },
  { id: "auswertung",   label: "Auswertung & Export" },
  { id: "infrastruktur",label: "Infrastruktur & Betrieb" },
];

const anforderungen = [
  // ── Struktur & Dimensionen ──────────────────────────────────────────────
  {
    id: "ANF-01",
    kat: "struktur",
    prio: "kritisch",
    status: "offen",
    titel: "Vierte Skill-Dimension: Fachkompetenz",
    beschreibung: "Das Tool muss eine vierte Skill-Dimension \"Fachkompetenz\" unterstützen. Bisher existieren nur drei Dimensionen (Handwerklich-Technisch, Methodisch, Consulting & Kommunikation). Fachkompetenz ist konzeptionell eigenständig: Sie fragt \"Was weiß ich über mein Fachgebiet?\" — z. B. Versicherungsprozesse, Domänenwissen — nicht \"Wie gut beherrsche ich ein Tool?\"",
    herkunft: "Fehlendes Feld im Konzept identifiziert — Fachkompetenz würde sonst unter Handwerklich-Technisch verschwinden.",
    akzeptanzkriterium: "Skill-Kataloge können in vier Dimensionen strukturiert werden. Auswertung zeigt alle vier Dimensionen.",
  },
  {
    id: "ANF-02",
    kat: "struktur",
    prio: "hoch",
    status: "offen",
    titel: "Skills zwischen Dimensionen verschiebbar",
    beschreibung: "Innerhalb der Skill-Inventur (Schritt 2) muss ein Skill per Drag-and-Drop oder Dropdown von einer Dimension in eine andere verschoben werden können — für den Fall, dass ein Skill bei der initialen Zuordnung falsch klassifiziert wurde.",
    herkunft: "Direktes Feedback aus der Tool-Evaluation.",
    akzeptanzkriterium: "Verschiebung ist ohne Datenverlust möglich. Geänderte Zuordnung wird in der Auswertung korrekt reflektiert.",
  },

  // ── Skill-Pflege ─────────────────────────────────────────────────────────
  {
    id: "ANF-03",
    kat: "skillpflege",
    prio: "kritisch",
    status: "offen",
    titel: "Skill-Steckbrief: Scope-Beschreibung je Skill",
    beschreibung: "Jeder Skill muss eine kurze Scope-Beschreibung erhalten, die zwei Dinge klärt: (1) Was umfasst der Skill — und was explizit nicht? (2) 2–3 typische Tätigkeiten für diese Rolle in diesem Unternehmenskontext. Zweck: gemeinsames Verständnis vor der Selbsteinschätzung herstellen, Selbsteinschätzungsverzerrungen reduzieren. Ersetzt Sub-Skills — keine bewertbare Sub-Skill-Ebene.",
    herkunft: "Feedback: Skills existieren nur als Namen ohne Beschreibung. \"Stakeholder-Management\" bedeutet für jede Rolle etwas anderes.",
    akzeptanzkriterium: "Skill-Steckbrief ist in der Skill-Inventur und in der Excel-Vorlage für Teilnehmende sichtbar.",
  },
  {
    id: "ANF-04",
    kat: "skillpflege",
    prio: "hoch",
    status: "offen",
    titel: "Rump-Pflichtskills: Digitale Anwendungskompetenz",
    beschreibung: "Der Skill \"Digitale Anwendungskompetenz\" muss in der Dimension Fachkompetenz als expliziter, bewertbarer Skill verfügbar sein. Begründung: Der Skill umfasst drei Ebenen — Verstehen (wie funktionieren digitale Systeme?), Anwenden (Daten kritisch analysieren, Tools produktiv nutzen) und Mitgestalten (Grenzen erkennen, Outputs verantworten). Das macht ihn zu einer Wissenskompetenz, nicht zu einer Tool-Beherrschung — daher Fachkompetenz, nicht Handwerklich-Technisch. Bewertung nach Bloom's Taxonomy (1–5). Gilt als Querschnittskompetenz nach Prof. Dr. Jutta Rump (2025). Muss für alle Rollengruppen im Katalog vorgesehen sein.",
    herkunft: "Abgleich mit Prof. Dr. Jutta Rump: Digitale Anwendungskompetenz hat im aktuellen Modell keine eigene Sichtbarkeit. Design-Entscheidung April 2026: Verschiebung von Handwerklich-Technisch nach Fachkompetenz, da der Skill Domänenwissen (Verstehen + Mitgestalten) abbildet, nicht reine Tool-Beherrschung.",
    akzeptanzkriterium: "Skill ist in der Dimension Fachkompetenz verfügbar (nicht Handwerklich-Technisch). DEP-Klassifizierung: Evolving. Bewertungsmodell: Bloom. Skill-Steckbrief vorhanden. Verhaltensanker für alle 5 Bloom-Stufen hinterlegt.",
  },
  {
    id: "ANF-05",
    kat: "skillpflege",
    prio: "hoch",
    status: "offen",
    titel: "Rump-Pflichtskills: Verbalisierung & Strukturierung",
    beschreibung: "Der Skill \"Verbalisierung & Strukturierung\" muss in der Dimension Consulting & Kommunikation als expliziter, bewertbarer Skill verfügbar sein. Beschreibung: Gedanken ordnen, Inhalte klar formulieren, Komplexität reduzieren — schriftlich und mündlich. Besonders relevant für Spezifikationen, Konzeptdokumentationen und Prompting. Skill darf nicht auf Kommunikation und Methodisch aufgeteilt werden.",
    herkunft: "Abgleich mit Prof. Dr. Jutta Rump: Verbalisierung & Strukturierung fällt aktuell zwischen zwei Dimensionen und verliert Sichtbarkeit.",
    akzeptanzkriterium: "Skill ist als zusammenhängende Kompetenz in Consulting & Kommunikation verfügbar, inkl. Prompting als Beispieltätigkeit.",
  },

  // ── Bewertung & Zielwerte ─────────────────────────────────────────────────
  {
    id: "ANF-06",
    kat: "bewertung",
    prio: "kritisch",
    status: "offen",
    titel: "Rollenspezifischer Zielwert je Skill — explizites Eingabefeld",
    beschreibung: "In der Skill-Inventur (Schritt 2) muss pro Skill ein sichtbares, dediziertes Eingabefeld für den Zielwert vorhanden sein. Das Eingabefeld zeigt eine Zahl (1–5) oder ein Dropdown mit den Dreyfus-Stufen (bzw. Bloom-Stufen für Fachkompetenz). Es muss direkt neben oder unter dem Skill-Namen sichtbar sein — nicht versteckt, nicht nur in einer Detailansicht. Begründung: Der Zielwert ist die zentrale Referenz für den Soll-Ist-Gap. Wenn er nicht sichtbar und direkt editierbar ist, wird er in der Praxis nicht gepflegt. Nicht jede Rolle braucht Level 5 bei jedem Skill — Beispiel: Stakeholder-Management: PM Zielwert 5, Tester Zielwert 2. Zielwerte werden vor dem Workshop von der Führungskraft bestätigt und sind danach im Workshop für alle Teilnehmenden sichtbar.",
    herkunft: "Feedback aus erster Tool-Version: Zielwert nicht erkennbar als individuell eingebbar. ANF-06 ursprünglich zu abstrakt formuliert — 'konfigurierbar' wurde als Hintergrundkonfiguration interpretiert, nicht als sichtbares UI-Element.",
    akzeptanzkriterium: "Jeder Skill in der Skill-Inventur zeigt ein sichtbares Eingabefeld (Zahl 1–5 oder Dropdown) für den Zielwert. Feld ist direkt in der Skill-Liste editierbar — ohne weitere Navigation. Zielwert wird gespeichert und bleibt nach Neustart des Tools erhalten. In der Auswertung ist der Zielwert je Skill als Referenzlinie oder Wert sichtbar.",
  },
  {
    id: "ANF-07",
    kat: "bewertung",
    prio: "kritisch",
    status: "offen",
    titel: "Dreyfus-Verhaltensanker je Skill (Kernkompetenzen)",
    beschreibung: "Für mindestens 3–5 Kernkompetenzen je Rollengruppe müssen Verhaltensanker hinterlegt werden können: Bloom-Anker (Erinnern bis Erschaffen) für Fachkompetenz-Skills, Dreyfus-Anker (Novice bis Expert) für alle anderen Dimensionen. Zweck: Kalibrierungshilfe für Teilnehmende bei der Selbsteinschätzung — reduziert Dunning-Kruger-Effekt, Impostor-Syndrom und soziale Erwünschtheit. Verhaltensanker müssen in der Excel-Vorlage und im Tool selbst sichtbar sein.",
    herkunft: "Kritisches Risiko: Selbsteinschätzung ohne Verhaltensanker macht Gruppenvergleiche methodisch schwach.",
    akzeptanzkriterium: "Verhaltensanker sind je Skill und Dreyfus-Stufe hinterlegbar. Teilnehmende sehen Anker während der Selbsteinschätzung.",
  },
  {
    id: "ANF-16",
    kat: "bewertung",
    prio: "kritisch",
    status: "neu",
    neu: true,
    titel: "Hybrides Bewertungsmodell: Bloom (Fachkompetenz) + Dreyfus (alle anderen Dimensionen)",
    beschreibung: "Das Tool muss zwei Bewertungsmodelle auf einer einheitlichen 1–5-Skala unterstützen. Fachkompetenz-Skills werden nach Bloom's Taxonomy bewertet (1 Erinnern / 2 Verstehen / 3 Anwenden / 4 Analysieren & Evaluieren / 5 Erschaffen & Gestalten). Alle anderen Dimensionen (Handwerklich-Technisch, Methodisch, Consulting & Kommunikation) nutzen das Dreyfus-Modell (1 Novice / 2 Adv. Beginner / 3 Competent / 4 Proficient / 5 Expert). Das Bewertungsmodell ist pro Skill im Datenmodell als Feld 'bewertungsmodell' (Enum: Bloom | Dreyfus) gespeichert. Das Tool muss beim Anzeigen von Stufenbezeichnungen, Verhaltensankern und Legende automatisch zwischen beiden Modellen unterscheiden. Die Skala bleibt einheitlich 1–5 — die Auswertung und der Export funktionieren modellübergreifend identisch. Begründung für Bloom bei Fachkompetenz: Domänenwissen entwickelt sich wie Wissen (Erinnern → Erschaffen), nicht wie eine Handwerkstakeit (Novice → Expert). Ein 'Experte' für Versicherungsfachwissen erschafft neues Domänenwissen und befähigt andere — das bildet Bloom präziser ab als Dreyfus.",
    herkunft: "Design-Entscheidung April 2026: Dreyfus allein ist für Fachkompetenz-Skills methodisch ungeeignet. Bloom trifft die Entwicklungslogik von Domänenwissen besser. Beide Modelle auf 1–5 normiert für einheitliche Tool-Auswertung.",
    akzeptanzkriterium: "Feld 'bewertungsmodell' (Bloom | Dreyfus) ist je Skill speicherbar. Stufenbezeichnungen im Tool, in der Excel-Vorlage und im Export zeigen automatisch das korrekte Modell. Verhaltensanker-Anzeige unterscheidet Bloom- und Dreyfus-Anker. Auswertung und Gruppenscoring funktionieren modellübergreifend auf Basis der 1–5-Skala.",
  },

  // ── Auswertung & Export ───────────────────────────────────────────────────
  {
    id: "ANF-08",
    kat: "auswertung",
    prio: "kritisch",
    status: "offen",
    titel: "Soll-Ist-Gap in der Auswertung",
    beschreibung: "Die Auswertung (Schritt 4) muss den Abstand zwischen dem Selbsteinschätzungs-Score und dem konfigurierten Zielwert je Skill visualisieren — sowohl individuell als auch im Gruppendurchschnitt. Entwicklungsfelder sollen nicht mehr nur nach niedrigstem Score sortiert werden, sondern nach größtem Gap zum Zielwert. Der Gap muss auch im PDF- und Excel-Export enthalten sein.",
    herkunft: "Feedback: Kein rollenspezifischer Zielwert sichtbar — Entwicklungsfelder bleiben unscharf.",
    akzeptanzkriterium: "Gap wird farblich in der Auswertung dargestellt. Export enthält Gap-Spalte. Top-5-Entwicklungsfelder basieren auf Gap, nicht auf absolutem Score.",
  },
  {
    id: "ANF-09",
    kat: "auswertung",
    prio: "hoch",
    status: "offen",
    titel: "Auswertungskommunikation: Orientierung, nicht Messung",
    beschreibung: "Die Auswertungsansicht muss einen expliziten Hinweis enthalten, dass die Ergebnisse qualitative Orientierungsdaten darstellen — keine statistisch belastbaren Messwerte. Besonders relevant bei Gruppengrößen von n=3–4, wo ein Ausreißer den Durchschnitt erheblich verzerrt. Einzelwerte müssen in der Führungskräfte-Ansicht immer sichtbar sein, nicht nur Durchschnitte.",
    herkunft: "Kritische Schwäche: Gruppengröße n=3–4 macht statistische Belastbarkeit unmöglich. Transparenz gegenüber Führungskräften notwendig.",
    akzeptanzkriterium: "Hinweis auf Orientierungscharakter ist in der Auswertung sichtbar. Einzelwerte sind in FK-Zusammenfassung nicht ausgeblendet.",
  },
  {
    id: "ANF-10",
    kat: "auswertung",
    prio: "kritisch",
    status: "offen",
    titel: "Robuste T0-Datensicherung nach dem Workshop",
    beschreibung: "Nach Abschluss des Workshops muss das Tool einen expliziten Schritt zur Datensicherung anbieten: automatischer Export der T0-Basisdaten (alle Selbsteinschätzungen, Zielwerte, Gruppenauswertung) als Excel und PDF mit Zeitstempel und Rollengruppen-Label. Ohne diese Daten ist der T0–T3-Messzyklus hinfällig. Datenverlust ist das höchste operative Risiko der gesamten Wirkungsmessung.",
    herkunft: "Kritisches Risiko: Datenpersistenz ungeklärt. T0-Daten sind Grundlage der gesamten Wirkungsmessung.",
    akzeptanzkriterium: "Export erfolgt mit einem Klick nach Abschluss des Workshops. Dateiname enthält Rollengruppe und Datum automatisch.",
  },

  // ── Infrastruktur & Betrieb ───────────────────────────────────────────────
  {
    id: "ANF-11",
    kat: "infrastruktur",
    prio: "hoch",
    status: "offen",
    titel: "API-Key-Management: Zentralisierung",
    beschreibung: "Der Claude API-Key darf nicht von jedem Teilnehmenden individuell beim Start eingegeben werden müssen. Der Key muss zentral vom IT-Admin verwaltet und im Tool hinterlegt werden — transparent für Teilnehmende, ohne dass sie den Key kennen oder eingeben müssen. Aktueller Setup-Screen mit API-Key-Feld für Endnutzer ist eine technische Hürde und ein Sicherheitsrisiko.",
    herkunft: "Setup-Screen des Tools erfordert API-Key-Eingabe durch Teilnehmende. Nicht skalierbar und nicht sicher für den Workshop-Einsatz.",
    akzeptanzkriterium: "Teilnehmende starten den Workshop ohne API-Key-Eingabe. Key wird einmalig durch IT-Admin konfiguriert.",
  },
  {
    id: "ANF-12",
    kat: "infrastruktur",
    prio: "mittel",
    status: "offen",
    titel: "Kalibrierungsprotokoll: Konsistenz über Rollengruppen",
    beschreibung: "Das Tool muss sicherstellen, dass Skill-Beschreibungen, Verhaltensanker und Dreyfus-Definitionen über alle Rollengruppen hinweg konsistent sind — damit Gruppenvergleiche und eine unternehmensweite Skill-Landschaft valide sind. Änderungen am Katalog müssen versioniert werden (Versionshistorie mit Datum).",
    herkunft: "Risiko: Unterschiedliche Workshops ohne Kalibrierungsmaßnahmen machen rollenübergreifende Vergleiche invalide.",
    akzeptanzkriterium: "Skill-Katalog-Versionen werden mit Datum gespeichert. Änderungen am Katalog sind nachvollziehbar.",
  },
  {
    id: "ANF-13",
    kat: "infrastruktur",
    prio: "mittel",
    status: "offen",
    titel: "Skill-Katalog vorab an Teilnehmende exportierbar",
    beschreibung: "Es muss möglich sein, den Skill-Katalog (inkl. Steckbriefen und Verhaltensankern) 2–3 Tage vor dem Workshop als lesbares Dokument (PDF oder übersichtliche Excel-Ansicht) zu exportieren und an Teilnehmende zu versenden. Zweck: Teilnehmende kommen vorbereitet, die T0-Baseline ist eine reflektierte Einschätzung — keine Erstreaktion.",
    herkunft: "Methodische Schwäche: T0-Baseline im Workshop, wenn Teilnehmende den Katalog zum ersten Mal sehen, ist methodisch fragwürdig.",
    akzeptanzkriterium: "Export des Katalogs als lesbare Vorab-Version ist mit einem Klick möglich, getrennt vom vollständigen Workshop-Export.",
  },

  // ── Neu hinzugefügt: April 2026 — Zukunftsperspektive & Marktkontext ─────
  {
    id: "ANF-14",
    kat: "skillpflege",
    prio: "hoch",
    status: "neu",
    neu: true,
    titel: "Relevanztrend je Skill: Marktperspektive 0–5 Jahre",
    beschreibung: "Jeder Skill muss einen Relevanztrend speichern und anzeigen: 'stark steigend', 'steigend', 'stabil' oder 'sinkend' — bezogen auf die Marktrelevanz in den nächsten 0–5 Jahren. Zusätzlich ein optionales Freitextfeld für eine kurze Begründung des Trends. Wichtig: Der Relevanztrend ist konzeptionell getrennt von der DEP-Klassifizierung. DEP beschreibt die Halbwertzeit eines Skills (wie schnell er veraltet), der Trend beschreibt die Marktrelevanzentwicklung (wie gefragt er wird). Ein Durable-Skill kann stark steigend sein (z. B. Geschäftsprozessverständnis), ein Perishable-Skill kann kurzfristig hoch relevant sein.",
    herkunft: "Konzeptionelle Erweiterung April 2026: Skill-Katalog soll nicht nur Ist-Zustand abbilden, sondern auch Zukunftsperspektive. Trendinformation fließt in die Skill-Landschaft und ermöglicht strategische Steuerung.",
    akzeptanzkriterium: "Trend-Feld (Enum) und Trendbegründung (Freitext, optional) sind je Skill konfigurierbar. Trend wird im Tool und im Excel-Export angezeigt. Datenmodell-Feld: 'trend' (Enum) + 'trendgrund' (String).",
  },
  {
    id: "ANF-15",
    kat: "skillpflege",
    prio: "hoch",
    status: "neu",
    neu: true,
    titel: "Markt- & Kundentreiber-Block je Rollengruppe",
    beschreibung: "Das Tool muss pro Rollengruppe einen strukturierten Markt- & Kundentreiber-Block speichern und anzeigen können. Jeder Treiber enthält: Titel, Zeithorizont (z. B. '0–2 Jahre'), Beschreibung der externen Entwicklung und eine Liste betroffener Skills aus dem Katalog. Der Block beantwortet: Welche externen Entwicklungen (Technologie, Regulatorik, Kundenbedarfe) verändern die Skill-Anforderungen dieser Rolle? Konzeptionelle Abgrenzung: Markt-Treiber sind nicht identisch mit zukünftig relevanten Skills — sie erklären die strategische Richtung, nicht die konkreten Kompetenzantworten. Beide Perspektiven werden getrennt geführt.",
    herkunft: "Konzeptionelle Erweiterung April 2026: Skill-Entwicklung bei red6 ist ein strategisches Steuerungsinstrument. Der Marktkontext muss explizit sichtbar sein — als Legitimation des Katalogs gegenüber Führungskräften und als Input für die Skill-Landschaft.",
    akzeptanzkriterium: "Mindestens ein Treiber-Block pro Rollengruppe erfassbar. Treiber werden im Tool angezeigt (separater Tab oder Bereich im Katalog). Export enthält Treiber-Block als separates Sheet oder JSON. Verlinkung zu betroffenen Skills funktioniert.",
  },

  // ── Neu Mai 2026 — Katalog-Integration & Flexibilität ───────────────────
  {
    id: "ANF-17",
    kat: "struktur",
    prio: "kritisch",
    status: "neu",
    neu: true,
    titel: "Ein Skill-Tab statt zwei (IST + Zukunft zusammengeführt)",
    beschreibung: "Das Tool darf keine getrennten Tabs für IST-Skills und Zukunfts-Skills haben. Alle Skills werden in einem einzigen Tab geführt, geordnet nach den vier Dimensionen. Die Zukunftsperspektive wird pro Skill durch den Relevanztrend (stark steigend / steigend / stabil / sinkend) und den Trendgrund abgebildet — nicht durch eine separate Liste. Begründung: Der BA Skill Katalog enthält sowohl heutige als auch zukunftsrelevante Skills. Eine klare Grenze zwischen 'heute' und 'morgen' ist bei vielen Skills nicht sinnvoll ziehbar. Der Relevanztrend übernimmt diese Funktion differenzierter. Der Markt- & Kundentreiber-Block (ANF-15) liefert den strategischen Zukunftsrahmen.",
    herkunft: "Design-Entscheidung Mai 2026: Kein erkennbarer Mehrwert durch zwei getrennte Tabs. Relevanztrend und Trendgrund ersetzen die Zukunfts-Tab-Funktion.",
    akzeptanzkriterium: "Das Tool zeigt alle Skills in einem einzigen Tab, geordnet nach vier Dimensionen. Kein separater Zukunfts-Tab mehr. Relevanztrend und Trendgrund sind je Skill sichtbar und filterbar.",
  },
  {
    id: "ANF-18",
    kat: "skillpflege",
    prio: "kritisch",
    status: "neu",
    neu: true,
    titel: "Vollständige Editierbarkeit und Erweiterbarkeit des Skill-Katalogs",
    beschreibung: "Der Skill-Katalog muss jederzeit anpassbar bleiben — ohne Entwicklereingriff. Konkret muss die verantwortliche L&D-Person (Kathrin Nölter) folgende Aktionen selbstständig durchführen können: (1) Neue Skills hinzufügen, (2) Bestehende Skills umbenennen, (3) Skill-Beschreibungen, Steckbriefe und Beispieltätigkeiten editieren, (4) Verhaltensanker je Stufe anpassen, (5) Zielwerte ändern, (6) DEP-Klassifizierung und Bewertungsmodell (Bloom/Dreyfus) ändern, (7) Relevanztrend und Trendgrund aktualisieren, (8) Skills zwischen Dimensionen verschieben, (9) Skills deaktivieren (nicht löschen — für historische Datenintegrität), (10) Schlüsselkompetenz-Badge setzen oder entfernen. Hintergrund: Der Skill-Katalog ist ein lebendes Dokument. Nach jedem Workshop-Zyklus werden Anpassungen notwendig sein.",
    herkunft: "Explizite Anforderung Mai 2026: Skill-Katalog ist ein lebendes Dokument. Langfristige Nutzbarkeit erfordert vollständige redaktionelle Kontrolle durch L&D ohne technische Abhängigkeit.",
    akzeptanzkriterium: "Alle zehn genannten Aktionen sind über die Benutzeroberfläche des Tools ausführbar — ohne Code-Eingriff. Skills können deaktiviert (nicht gelöscht) werden. Datum der letzten Änderung je Skill sichtbar.",
  },
];

export default function ToolAnforderungen() {
  const [activeKat, setActiveKat] = useState("alle");
  const [activePrio, setActivePrio] = useState("alle");
  const [expanded, setExpanded] = useState({});

  const toggle = (id) => setExpanded(p => ({ ...p, [id]: !p[id] }));

  const filtered = anforderungen.filter(a =>
    (activeKat === "alle" || a.kat === activeKat) &&
    (activePrio === "alle" || a.prio === activePrio)
  );

  const total = anforderungen.length;
  const byPrio = (p) => anforderungen.filter(a => a.prio === p).length;

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: "1.5rem 1rem", fontFamily: "system-ui, sans-serif" }}>
      {/* Header */}
      <div style={{ borderBottom: "1px solid #e5e7eb", paddingBottom: "1rem", marginBottom: "1.25rem" }}>
        <h1 style={{ fontSize: 19, fontWeight: 600, color: "#111", margin: "0 0 4px" }}>
          Anforderungen: Skill-Erhebungstool
        </h1>
        <p style={{ fontSize: 13, color: "#6b7280", margin: "0 0 12px" }}>
          Extrahiert und aktualisiert aus dem Skill-Entwicklungskonzept · red6 enterprise software GmbH · Stand: Mai 2026
        </p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <span style={{ background: "#f3f4f6", borderRadius: 6, padding: "2px 8px", fontSize: 11, color: "#4b5563" }}>{total + " Anforderungen"}</span>
          <span style={{ background: "#fef9c3", color: "#854d0e", borderRadius: 6, padding: "2px 8px", fontSize: 11, fontWeight: 700 }}>{"5 neu (3× April, 2× Mai 2026)"}</span>
          {Object.entries(PRIO).map(([k, v]) => (
            <span key={k} style={{ background: v.bg, color: v.fg, border: "1px solid " + v.border, borderRadius: 6, padding: "2px 8px", fontSize: 11, fontWeight: 600 }}>
              {byPrio(k) + "× " + v.label}
            </span>
          ))}
        </div>
      </div>

      {/* Filter Kategorie */}
      <div style={{ display: "flex", gap: 5, marginBottom: 8, flexWrap: "wrap" }}>
        {[{ id: "alle", label: "Alle Kategorien" }, ...KATEGORIEN].map((k) => (
          <button key={k.id} onClick={() => setActiveKat(k.id)}
            style={{ background: activeKat === k.id ? "#111" : "#fff", color: activeKat === k.id ? "#fff" : "#6b7280", border: "1px solid " + (activeKat === k.id ? "#111" : "#e5e7eb"), borderRadius: 7, padding: "4px 10px", fontSize: 12, fontWeight: activeKat === k.id ? 600 : 400, cursor: "pointer" }}>
            {k.label}
          </button>
        ))}
      </div>

      {/* Filter Priorität */}
      <div style={{ display: "flex", gap: 5, marginBottom: "1.25rem", flexWrap: "wrap" }}>
        <button onClick={() => setActivePrio("alle")}
          style={{ background: activePrio === "alle" ? "#111" : "#fff", color: activePrio === "alle" ? "#fff" : "#6b7280", border: "1px solid " + (activePrio === "alle" ? "#111" : "#e5e7eb"), borderRadius: 7, padding: "4px 10px", fontSize: 12, fontWeight: activePrio === "alle" ? 600 : 400, cursor: "pointer" }}>
          Alle Prioritäten
        </button>
        {Object.entries(PRIO).map(([k, v]) => (
          <button key={k} onClick={() => setActivePrio(k)}
            style={{ background: activePrio === k ? v.bg : "#fff", color: activePrio === k ? v.fg : "#6b7280", border: "1px solid " + (activePrio === k ? v.border : "#e5e7eb"), borderRadius: 7, padding: "4px 10px", fontSize: 12, fontWeight: activePrio === k ? 600 : 400, cursor: "pointer" }}>
            {v.label}
          </button>
        ))}
      </div>

      {/* Anforderungen */}
      {KATEGORIEN.filter(k => activeKat === "alle" || k.id === activeKat).map((kat) => {
        const katItems = filtered.filter(a => a.kat === kat.id);
        if (katItems.length === 0) return null;
        return (
          <div key={kat.id} style={{ marginBottom: 20 }}>
            <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#9ca3af", margin: "0 0 8px" }}>{kat.label}</p>
            {katItems.map((a) => {
              const pc = PRIO[a.prio];
              const sc = STATUS[a.status];
              const isOpen = expanded[a.id];
              return (
                <div key={a.id} style={{ border: "1px solid " + (a.neu ? "#fde047" : pc.border), borderRadius: 10, background: a.neu ? "#fffbeb" : pc.bg, marginBottom: 8, overflow: "hidden" }}>
                  <button onClick={() => toggle(a.id)}
                    style={{ display: "flex", alignItems: "flex-start", gap: 10, width: "100%", background: "none", border: "none", cursor: "pointer", padding: "12px 14px", textAlign: "left" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 4, flexShrink: 0, paddingTop: 1 }}>
                      <span style={{ background: pc.bg, color: pc.fg, border: "1px solid " + pc.border, borderRadius: 4, padding: "1px 7px", fontSize: 10, fontWeight: 700, textAlign: "center" }}>{pc.label}</span>
                      <span style={{ background: sc.bg, color: sc.fg, borderRadius: 4, padding: "1px 7px", fontSize: 10, fontWeight: 600, textAlign: "center" }}>{sc.label}</span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                        <span style={{ fontSize: 11, color: "#9ca3af", fontWeight: 600, fontFamily: "monospace" }}>{a.id}</span>
                        {a.neu && <span style={{ background: "#fef9c3", color: "#854d0e", border: "1px solid #fde047", borderRadius: 4, padding: "1px 7px", fontSize: 10, fontWeight: 700 }}>NEU — April 2026</span>}
                        <span style={{ fontSize: 14, fontWeight: 600, color: "#111" }}>{a.titel}</span>
                      </div>
                    </div>
                    <span style={{ fontSize: 10, color: "#9ca3af", paddingTop: 2 }}>{isOpen ? "▲" : "▼"}</span>
                  </button>
                  {isOpen && (
                    <div style={{ borderTop: "1px solid " + (a.neu ? "#fde047" : pc.border), padding: "12px 14px", background: "rgba(255,255,255,0.6)" }}>
                      <div style={{ marginBottom: 10 }}>
                        <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#6b7280", margin: "0 0 4px" }}>Beschreibung</p>
                        <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.6, margin: 0 }}>{a.beschreibung}</p>
                      </div>
                      <div style={{ marginBottom: 10 }}>
                        <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#6b7280", margin: "0 0 4px" }}>Herkunft</p>
                        <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.6, margin: 0, fontStyle: "italic" }}>{a.herkunft}</p>
                      </div>
                      <div style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 8, padding: "8px 12px" }}>
                        <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#6b7280" }}>{"Akzeptanzkriterium: "}</span>
                        <span style={{ fontSize: 13, color: "#374151" }}>{a.akzeptanzkriterium}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        );
      })}

      <div style={{ marginTop: "1.5rem", paddingTop: "1rem", borderTop: "1px solid #f3f4f6", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 4 }}>
        <span style={{ fontSize: 11, color: "#9ca3af", fontStyle: "italic" }}>Lebendes Dokument — neue Anforderungen mit "NEU"-Badge gekennzeichnet. Klick zum Aufklappen.</span>
        <span style={{ fontSize: 11, color: "#9ca3af" }}>Stand: Mai 2026 · 18 Anforderungen (ANF-01–ANF-18)</span>
      </div>
    </div>
  );
}
