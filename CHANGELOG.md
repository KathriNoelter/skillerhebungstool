# Changelog

Alle wesentlichen Aenderungen an diesem Projekt werden hier dokumentiert.

Das Format basiert auf [Keep a Changelog](https://keepachangelog.com/de/1.1.0/)
und das Projekt folgt [Semantic Versioning](https://semver.org/lang/de/).

## [Unreleased]

### Geaendert

- **Gruppe Produktmanagement nach Workshop (Okt. 2026)**: Entscheidungen aus Workshop und Antwortdokument der Gruppe umgesetzt. Ausrichtung auf B2B/SaaS fuer die PKV-Rechnungspruefung statt Versicherungsprodukte; neue Branchen-Skills je Rolle, gemeinsamer Skill Domain-Erschliessung, Regulatorik fuer Software, Daten & KI. Neu in mehreren Rollen: Technisches Produktverstaendnis, Agile Prinzipien, Job-Mapping, Domain Storytelling, Experteninterviews/Contextual Inquiry/Shadowing. PM: Geschaeftsmodell, Pricing & Business Case (Ziel 5) und Portfolio-Management; Rollenabgrenzung PM/PO/UX/BD in den Steckbriefen. Markttreiber der Gruppe auf acht B2B/SaaS-Treiber umgestellt.
- **Katalog-Version**: `CATALOG_VERSION` auf `0.8.0`, `CATALOG_UPDATED_AT` auf `2026-10-23`.
- **Gruppe Produktmanagement nach Team-Review (Okt. 2026)**: Kommentare zu Product Manager, Product Owner, UX und Business Developer eingearbeitet, soweit sie widerspruchsfrei sind und keine Workshop-Frage beruehren (Zielwerte, Schluesselkompetenzen, zusammengefuehrte und gestrichene Skills, toolneutrale Titel, geschaerfte Steckbriefe). Grundsatzfragen (Zielmarkt, Rollenabgrenzung, Markttreiber) bleiben fuer den Workshop offen.
- **Geschaerfte Rump-Skills nur fuer Produktmanagement**: `RUMP_DIGITALE_V2` (vier Elemente nach Rump, Tool-Bedienung explizit ausgegrenzt) und `RUMP_VERBAL_V2` (Strukturierung und Verbalisierung inkl. Prompting). Die uebrigen Gruppen nutzen weiter die bisherigen Fassungen, mit denen ihre Selbsteinschaetzungen durchgefuehrt wurden.
- **Katalog-Version**: `CATALOG_VERSION` auf `0.7.0`, `CATALOG_UPDATED_AT` auf `2026-10-15`. In der App bearbeitete Markttreiber werden dadurch einmalig auf den Katalogstand zurueckgesetzt.

## [0.5.2-beta] - 2026-05-06

### Geaendert

- **Teilnehmer-Excel-Vorlage verschlankt**: Die Spalten Zielwert, Trend, Trendbegruendung, Bewertungsmodell und Schluesselkompetenz sind aus der Vorlage entfernt. Diese Felder sind interne Steuerungsfelder (FK-Sicht) und gehoeren nicht in das Selbsteinschaetzungs-Material — Reduktion sozialer Erwuenschtheit. Auswertungs-Export an die Fuehrungskraft bleibt unveraendert.
- **Robuster Import**: `importAssessmentResults` erkennt die Rating-Spalte jetzt per Header-Detektion ("Dein Level…"). Vorlagen aus 0.5.0/0.5.1 (Spaltenindex 6) und aus pre-0.5.0 (Index 3) werden via Fallback weiterhin gelesen — kein Bruch beim Reimport bestehender Antworten.

## [0.5.1-beta] - 2026-05-05

### Hinzugefuegt

- **Hard-Delete fuer Skills (Override zu ANF-18 (9))**: Neben dem Deaktivieren-Knopf gibt es jetzt einen Muelleimer-Button, der Base- und Custom-Skills endgueltig aus der Inventur entfernt — inkl. Bewertungen, Overrides und Driver-Verlinkungen. Confirm-Dialog mit Hinweis, dass die Aktion irreversibel ist und „Deaktivieren" als reversible Alternative empfohlen wird. Reaktivierung ist nur bei deaktivierten (nicht geloeschten) Skills moeglich.

## [0.5.0-beta] - 2026-05-05

### Geaendert

- **ANF-17: Ein Skill-Tab statt zwei**. IST- und Zukunfts-Tab in der Skill-Inventur sind zusammengefuehrt — alle Skills liegen direkt in den vier Dimensionen. Die Zukunftsperspektive bildet der Relevanztrend (↑↑/↑/→/↓) am Skill ab. Trend-Filter-Pillen + Toggle „Deaktivierte einblenden". KI-Generator schreibt Vorschlaege direkt als Custom-Skills mit Trend „stark steigend" + KI-Begruendung in die jeweilige Dimension. Auswertung zeigt einen Trend-Block (Top Entwicklungsfelder / Top Staerken fuer Skills mit positivem Trend) statt der frueheren Zukunfts-Skill-Sektion.
- **ANF-18: Vollstaendige Editierbarkeit des Skill-Katalogs**. L&D kann ohne Code-Eingriff: Skills hinzufuegen, umbenennen (Stift-Icon → Inline-Input), Beschreibungen / Verhaltensanker / Zielwerte / DEP / Bewertungsmodell / Trend pflegen, zwischen Dimensionen verschieben, deaktivieren statt loeschen (Bewertungen bleiben erhalten, Reaktivierung jederzeit moeglich), Schluesselkompetenz-Badge (★) toggeln. „Zuletzt geaendert"-Datum wird automatisch je Skill gefuehrt und im Header sowie in beiden Excel-Exporten als Spalte gefuehrt.
- **Skill-Modell erweitert** um `disabled`, `keySkill`, `lastModified` (alle optional). `Group.defaultDrivers` als optionale Vorbelegung fuer den Markttreiber-State.
- **BA-Katalog v2.0 (Mai 2026, FK-validiert Diemo Gresch)**: Business Analyst neu aufgesetzt mit 24 Skills auf 4 Dimensionen — alle mit Steckbrief, Beispieltaetigkeiten, vollstaendigen Verhaltensankern (Bloom fuer Fachkompetenz, Dreyfus sonst), Zielwerten und Relevanztrend. 3 Schluesselkompetenzen markiert (Versicherungsfachwissen, Digitale Anwendungskompetenz, Verbalisierung & Strukturierung).
- **5 Default-Markttreiber** fuer die Gruppe Business Consulting (KI-Transformation, EU AI Act, Digitalisierung Kernprozesse, SAFe, Hybrid-Komplexitaet) inkl. verlinkter Skills.
- **Katalog-Version**: `CATALOG_VERSION` auf `0.5.0`, `CATALOG_UPDATED_AT` auf `2026-05-05`.

## [0.3.0-beta] - 2026-05-04

### Geaendert

- **ANF-04 "Digitale Anwendungskompetenz" verschoben nach Fachkompetenz**: Der Rump-Pflichtskill liegt nicht mehr in Handwerklich-Technisch, sondern in Fachkompetenz — er bildet drei Ebenen ab (Verstehen, Anwenden, Mitgestalten) und ist damit eine Wissens-, keine Tool-Kompetenz. Steckbrief verweist explizit auf Bloom's Taxonomy (1-5) als Bewertungsmodell. Verhaltensanker fuer alle 5 Stufen (Erinnern/Verstehen → Anwenden → Analysieren → Evaluieren → Mitgestalten) hinterlegt. Gilt fuer alle 25 Rollen.
- **Katalog-Version**: `CATALOG_VERSION` auf `0.4.0`, `CATALOG_UPDATED_AT` auf `2026-05-04`.

## [0.2.2-beta] - 2026-04-30

### Behoben

- **Fenster nicht greifbar / verschiebbar**: Die CSS-Regel `.app-drag *` setzte den gesamten Header auf `no-drag`, womit nichts mehr ziehbar war. Drag wird jetzt nur noch fuer interaktive Elemente (input, button, select, textarea, a) deaktiviert.
- **Ueberlappung mit macOS Traffic-Lights**: Header bekommt einen 80px-Spacer in der nativen App, damit Titel und Versionszeile nicht hinter den Schliessen-/Minimieren-/Maximieren-Buttons liegen. Title truncatet wenn das Fenster zu schmal ist.
- **Versionsnummer im Header war hardcodiert** (`v0.1.0-beta`). Wird jetzt via Vite-`define` aus `package.json` injiziert (`__APP_VERSION__`) und bleibt beim naechsten Bump automatisch korrekt.

## [0.2.1-beta] - 2026-04-30

### Geaendert

- **Zukunfts-Skill-Generierung neu gefasst**: Der Prompt fuer "Neu generieren" ist jetzt ein zwei-phasiger, IST-grounded Analyse-Prompt (Persona "HR-Strategieberater Versicherungs-IT", `<analysis>` + `<json>` Bloecke). IST-Skills werden inklusive Steckbrief, Zielwert und DEP pro Dimension uebergeben, plus expliziter Trend-Katalog (KI/LLM, Cloud, Regulatorik DACH, Daten-Standards, Arbeitswelt). Jeder Vorschlag liefert `description` (Steckbrief) und `rationale` (IST-Bezug).
- **Variations-Fokus rotiert pro Klick**: Wiederholtes "Neu generieren" liefert bewusst andere Blickwinkel (ausgewogen, KI/GenAI, Regulatorik, Cloud/Plattform, Daten/Standards).
- **Dublettenschutz**: Case-insensitive Normalisierung verwirft Vorschlaege, die bereits in IST oder bestehender Future-Liste stehen.
- **Robustes Parsing**: `<json>`-Tag bevorzugt, Fallback auf Code-Fence und erstes `{…}`-Cluster; Post-Validation auf Name-Laenge, DEP-Enum und Dubletten.
- **`callClaude`-API**: Akzeptiert jetzt `{ model, maxTokens, temperature }`. Future-Skills laufen auf Sonnet 4.5 mit `max_tokens=4096` und `temperature=0.4`. Sowohl Browser-Fetch als auch Electron-IPC durchgaengig parametrisiert.

## [0.2.0-beta] - 2026-04-30

### Hinzugefuegt

- **ANF-01 Vierte Skill-Dimension Fachkompetenz**: Skill-Kataloge in vier kanonischen Dimensionen strukturiert (Fachkompetenz / Handwerklich-Technisch / Methodisch / Kommunikation & Consulting). Alle 24 Rollen restrukturiert; Reihenfolge in IST und Zukuenftigen Skills konsistent.
- **ANF-02 Skills zwischen Dimensionen verschiebbar**: Pro Skill-Zeile ein "Verschieben…"-Dropdown — funktioniert fuer IST- und Zukunfts-Skills, ohne Datenverlust.
- **ANF-03 Skill-Steckbrief**: Jeder Skill kann eine kurze Scope-Beschreibung erhalten. Sichtbar in der Skill-Inventur (expandable Editor), im Vorschau-Panel der Selbsteinschaetzung und in der Excel-Vorlage.
- **ANF-04 Rump-Pflichtskill "Digitale Anwendungskompetenz"**: bei jeder Rolle in Handwerklich-Technisch (Evolving) mit Steckbrief.
- **ANF-05 Rump-Pflichtskill "Verbalisierung & Strukturierung"**: bei jeder Rolle in Kommunikation & Consulting (Durable) mit Steckbrief.
- **ANF-06 Rollenspezifischer Zielwert je Skill**: Dreyfus-Zielwert (1-5) pro Skill konfigurierbar; fliesst in Excel-Vorlage und Auswertung.
- **ANF-07 Verhaltensanker je Dreyfus-Stufe**: 5 Anker-Textareas pro Skill im Editor, sichtbar fuer Teilnehmende in der Excel-Vorlage und im Vorschau-Panel der Selbsteinschaetzung.
- **ANF-08 Soll-Ist-Gap in der Auswertung**: Neue Spalten "Ziel" und "Gap" (farbcodierte Gap-Badge). Top-5-Entwicklungsfelder werden primaer nach groesstem Gap sortiert. Excel-Matrix und Zusammenfassung enthalten Gap-Spalte.
- **ANF-09 Auswertungskommunikation**: Banner "qualitative Orientierungsdaten — keine statistisch belastbare Messung" in der Auswertung, im Excel-Metadaten-Sheet und in der Zusammenfassung. Einzelwerte bleiben dauerhaft sichtbar.
- **ANF-12 Kalibrierungsprotokoll / Katalog-Versionierung**: `CATALOG_VERSION` und `CATALOG_UPDATED_AT` im Excel-Metadaten-Sheet und in der Zusammenfassung.
- **Zukuenftige Skills in 4 Dimensionen**: Future-Tab rendert vier CategoryBlocks; KI-Generierung gibt JSON mit Dimension-Schluesseln zurueck.

### Geaendert

- **Excel-Vorlage erweitert**: Neue Spalten "Skill-Steckbrief", "Zielwert" und "Verhaltensanker je Dreyfus-Stufe". "Dein Level"-Spalte ist von Index 3 auf Index 6 gewandert; der Import liest beide Layouts (rueckwaertskompatibel).
- **`SkillAnalysis`** enthaelt jetzt `gap` (target − avg, oder null); `topDevelopmentAreas` sortiert primaer nach Gap.

## [0.1.0-beta] - 2026-04-21

### Geaendert

- **Zukunfts-Skill-Horizont**: Zeitfenster auf 0-2 Jahre verkuerzt (vorher 3-5 Jahre) — sowohl in der UI-Beschreibung als auch im KI-Prompt.
- **Leitfrage ergaenzt**: Die Leitfrage „Sind die aktuellen Skills unserer Gruppe noch zukunftsfaehig, oder muessen sie angesichts der sich veraendernden Anforderungen in der Versicherungs-IT – gepraegt durch KI, Cloud und regulatorischen Wandel – weiterentwickelt oder ersetzt werden?" wird jetzt sowohl im Zukunfts-Skills-Tab als Zitat angezeigt als auch Claude als Leitfrage beim Generieren uebergeben.

## [0.0.7-alpha] - 2026-04-19

### Geaendert

- **Workflow auf 4 Schritte reduziert**: Zukunftsanalyse und Entwicklungsvorschlag entfernt. Der neue Ablauf ist Gruppe/Rolle → Skill-Inventur → Selbsteinschaetzung → Auswertung.
- **Skill-Inventur auf zwei Tabs verschlankt** (IST + Zukuenftig). Die KI-Text-Tabs "Rollenentwicklung" und "Fokus & Zukunftsskills" sowie die Checkbox-Matrix nach Halbwertszeit sind entfallen. Zukunfts-Skills werden in derselben Listen-UI wie die IST-Skills erhoben.
- **Haltbarkeit editierbar**: Die DEP-Klassifikation (Durable / Evolving / Perishable) laesst sich jetzt auch fuer Basis-Skills per Dropdown aendern.
- **Merge-Button**: "Skill-Listen zusammenfuehren & Selbsteinschaetzung starten" fuehrt IST- und Zukunfts-Skills zusammen (Duplikate werden entfernt) und wechselt direkt in die Selbsteinschaetzung.

### Hinzugefuegt

- **Excel-basierte Selbsteinschaetzung**: Kathrin generiert pro Teilnehmer eine Excel-Vorlage (Name im Metadaten-Sheet), versendet sie per Mail und importiert die ausgefuellten Dateien wieder. Zuordnung erfolgt automatisch ueber den Namen.
- **Auswertung**: Toggle zum Ein-/Ausblenden der Einzelantworten, Top 5 Entwicklungsfelder und Top 5 Staerken, zusaetzlicher Zukunfts-Skills-Block (Top Entwicklungsfelder und Staerken aus der Zukunfts-Kategorie).
- **PDF- und Excel-Download** der Auswertung: PDF via Druck-Dialog, Excel mit Matrix-Sheet und Zusammenfassung (inkl. Zukunfts-Skills-Block).

### Entfernt

- Komponenten `FutureAnalysis` und `DevelopmentPlan` samt zugehoeriger State (importantNow, importantFuture, roleEvolutionText, focusShiftText).

## [0.0.6-alpha] - 2026-04-16

### Hinzugefuegt

- **Interaktive Hilfe / Handbuch**: Slide-over Panel mit kontextsensitiver Hilfe pro Workshop-Schritt
  - **Schritt-bezogene Hilfe**: Erklaert fuer jeden der 6 Schritte was zu tun ist, warum die Daten benoetigt werden, und gibt praktische Tipps
  - **Allgemeine Hilfe**: Erklaerung des Dreyfus-Modells, DEP-Klassifikation, API Key Info, Workshop-Ablauf auf einen Blick
  - **Tastaturkuerzel**: `?` oder `h` oeffnet/schliesst die Hilfe, `Esc` schliesst sie
  - **Help-Button** im Header (Fragezeichen-Icon) — sichtbar in Browser- und Native-App-Modus
  - Hilfe-Panel wird beim Drucken automatisch ausgeblendet
- **Intel-Mac Support**: DMG-Build jetzt fuer ARM (arm64) und Intel (x64) verfuegbar
- **Detaillierte Projektdokumentation** (`DOKUMENTATION.md`): 18-Kapitel Referenz mit Architektur, Datenmodell, Komponenten, Styling und Deployment

## [0.0.5-beta] - 2026-04-15

### Geaendert

- **Branding-Update** auf Step 1 (Gruppen- und Rollenauswahl):
  - Titel: "Willkommen zur red6 Skill-Erhebung"
  - Untertitel: "Fuer die Skillerhebung waehle deine Gruppe und deine Rolle aus."
- Letzte verbleibende "Abteilung"-Referenzen im Quellcode durch "Gruppe" ersetzt (AI-Prompt in Zukunftsanalyse, Rollenbeschreibung Gruppenleitung)

## [0.0.4-beta] - 2026-04-15

### Geaendert

- **Step 2 komplett neu gestaltet**: Aus der Kategorie-Auswahl wurde eine 4-Tab Skill-Inventur
  - **Tab 1 — Ist-Analyse**: Alle Skills aller Bereiche sind immer aktiv. Keine Haekchen mehr. Skills koennen hinzugefuegt und entfernt werden (auch die Standardskills).
  - **Tab 2 — Rollenentwicklung 1-5 Jahre**: KI-Analyse wie sich die Rolle durch Automatisierung, KI und gesellschaftliche Trends in 1, 3, 5 Jahren veraendert
  - **Tab 3 — Fokus & Zukunftsskills**: KI-Analyse welche Skills an Bedeutung gewinnen/verlieren, was zukunftssicher bleibt
  - **Tab 4 — Skill-Typen & finale Auswahl**: Alle Skills aus Ist- und Zukunftsanalyse gruppiert nach Halbwertszeit (Durable / Evolving / Perishable). Teilnehmer koennen hier Zukunfts-Skills per KI ergaenzen und markieren, welche Skills JETZT und welche in ZUKUNFT wichtig sind.
- Erklaer-Kacheln zu Langlebigen Power Skills, Evolutionaeren Skills und Vergaenglichen Skills in Tab 4
- Disclaimer auf KI-Tabs: "Daten basieren auf Claude-Trainingswissen, dienen als Diskussionsgrundlage"

### Hinzugefuegt

- Zwei separate Auswahlsets: "Jetzt wichtig" und "Zukuenftig wichtig" — beide fliessen in die Selbsteinschaetzung ein
- Custom Skills mit DEP-Klassifikation hinzufuegbar pro Kategorie
- KI-Generierung strukturierter Zukunfts-Skills (JSON-parsed, mit Rationale)

### Entfernt

- Alte `SkillSelection.tsx` (ersetzt durch `SkillInventory.tsx`)
- Kategorie-Auswahl-Haekchen — Bereiche sind jetzt immer aktiv

## [0.0.3-beta] - 2026-04-15

### Hinzugefuegt

- **Gruppen-Struktur**: Workshop beginnt jetzt mit Gruppe + Rolle (kaskadierende Auswahl)
- **6 Gruppen mit 24 Rollen** und umfassenden Skill-Profilen:
  - **Business Consulting** (6 Rollen): UX/UI Design, Requirements Engineering & Management, Business Analyst, QS Spezialist, Test Manager, Test Automation Engineer
  - **Software Development** (2 Rollen): Frontend Entwickler, Backend Entwickler
  - **Projektmanagement** (3 Rollen): Projektassistenz, Scrum Master, Projektleitung
  - **Backoffice** (6 Rollen): Geschaeftsfuehrungsassistenz, Teamassistenz, HR Generalistin, Recruiting, Controlling, IT-Admin
  - **P.O.C.** (6 Rollen): Learning & Development Expert, Personalentwicklung, Agile Coach, Teamentwicklung, Changebegleitung, Beratung OE & Change
  - **Leadership Team** (2 Rollen): operative Geschaeftsfuehrung, Gruppenleitung fachlich & disziplinarisch
- Jede Rolle hat 3-4 Skill-Kategorien mit 4-7 kuratierten Skills (DEP-klassifiziert)

### Geaendert

- `data/departments.ts` entfernt, durch `data/groups.ts` ersetzt
- Stepper-Label 1 von "Abteilung" zu "Gruppe & Rolle" geaendert
- DepartmentSelect zeigt jetzt kaskadierende Dropdowns fuer Gruppe und Rolle

## [0.0.2-beta] - 2026-04-13

### Hinzugefuegt

- **KI-gestuetzte Zukunftsanalyse** (Step 5): Claude analysiert das Team-Skill-Profil und liefert strategische Empfehlungen zu Rollenentwicklung, Skill-Trends, Wissenstransfer-Chancen
- **KI-gestuetzter Entwicklungs-Fahrplan** (Step 6): Claude generiert einen personalisierten 90-Tage-Plan mit konkreten Lernressourcen, Team-Lernformaten, Quick Wins und Erfolgsmessung
- **Browser API Key Eingabe**: Optionales API-Key-Feld in der Header-Leiste fuer KI-Features im Browser-Modus
- **Electron IPC fuer Claude API**: Sichere API-Aufrufe ueber den Main Process ohne CORS-Einschraenkungen

### Geaendert

- Versionsnummer auf 0.0.2-beta gesetzt (Start der Beta-Phase)
- Vite `base: "./"` fuer korrekte Asset-Pfade in der nativen App

## [0.0.1] - 2026-04-12

### Hinzugefuegt

- Workshop-Flow mit 6 Schritten: Abteilungswahl, Skill-Bereiche, Selbsteinschaetzung, Skill-Profil, Zukunftsanalyse, Entwicklungsvorschlag
- 10 Abteilungen mit kuratierten Skills: UX/UI Design, Frontend, Backend, DevOps/Cloud, QA, Data Science, Projektmanagement, Product Management, IT-Security, Mobile-Entwicklung
- Dreyfus-Modell basierte Selbsteinschaetzung (5 Stufen: Novice bis Expert)
- DEP-Klassifikation fuer alle Skills (Durable, Evolving, Perishable)
- Automatische Zukunftsanalyse: Staerken, Luecken, Teamstreuung, Perishable-Warnung, Prioritaeten
- Entwicklungsvorschlag: Dreyfus-basierte Massnahmen, Zeitrahmen, Lernformate, Fuehrungskraft-Zusammenfassung
- Druckfunktion fuer Ergebnisse
- Native macOS App (Electron): Teilnehmer-Setup mit Name und Claude API Key
- Browser-Version direkt nutzbar auf Port 3055
- Responsive Design mit Tailwind CSS und Inter Font
