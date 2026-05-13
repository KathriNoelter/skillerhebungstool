# Skill-Workshop v0.0.5-beta — Dokumentation

> Dreyfus-Modell basierte Kompetenzanalyse & Entwicklungsplanung fuer Teams

---

## Inhaltsverzeichnis

1. [Ueberblick](#1-ueberblick)
2. [Installation & Start](#2-installation--start)
3. [Architektur](#3-architektur)
4. [Der 6-Schritte-Workshop-Flow](#4-der-6-schritte-workshop-flow)
5. [Datenmodell](#5-datenmodell)
6. [Gruppen & Rollen](#6-gruppen--rollen)
7. [KI-Integration (Claude API)](#7-ki-integration-claude-api)
8. [Electron (Native macOS App)](#8-electron-native-macos-app)
9. [Browser-Modus (Localhost)](#9-browser-modus-localhost)
10. [Komponenten-Referenz](#10-komponenten-referenz)
11. [State-Management](#11-state-management)
12. [Styling & Design-System](#12-styling--design-system)
13. [Build & Deployment](#13-build--deployment)
14. [Sicherheit](#14-sicherheit)
15. [Konfiguration](#15-konfiguration)
16. [Druckfunktion](#16-druckfunktion)
17. [Bekannte Einschraenkungen](#17-bekannte-einschraenkungen)
18. [Entwickler-Richtlinien](#18-entwickler-richtlinien)

---

## 1. Ueberblick

Der **Skill-Workshop** ist ein interaktives Tool zur Erhebung, Analyse und Entwicklungsplanung von Team-Kompetenzen. Es basiert auf dem Dreyfus-Modell (5 Kompetenzstufen) und klassifiziert Skills nach ihrer Halbwertszeit (DEP: Durable, Evolving, Perishable).

### Kernfunktionen

- **Kaskadierende Gruppen- & Rollenauswahl** aus 6 Gruppen mit 24 Rollen
- **4-Tab Skill-Inventur** mit KI-gestuetzter Rollenentwicklungsanalyse
- **Dreyfus-Selbsteinschaetzung** fuer bis zu 6 Teilnehmer pro Workshop
- **Automatische Zukunftsanalyse** mit Luecken, Staerken & Prioritaeten
- **KI-generierter 90-Tage Entwicklungsplan** mit konkreten Ressourcen
- **Zwei Betriebsmodi**: Native macOS App (.dmg) und Browser (localhost)

### Technologie-Stack

| Komponente       | Technologie                |
|------------------|----------------------------|
| Frontend         | React 18.3 + TypeScript 5.6 (strict) |
| Styling          | Tailwind CSS 3.4           |
| Bundler          | Vite 6.0                   |
| Desktop          | Electron 41.2              |
| KI               | Claude API (Sonnet)        |
| Paketmanager     | pnpm                       |
| Target           | Node.js 20+ / ES2022+      |

---

## 2. Installation & Start

### Voraussetzungen

- Node.js >= 20
- pnpm (nicht npm oder yarn)

### Erstinstallation

```bash
cd skillworkshop
pnpm install
```

### Browser-Modus (Entwicklung)

```bash
pnpm dev
```

Oeffnet auf **http://localhost:3055**. Im Browser-Modus wird ein optionales API-Key-Feld im Header angezeigt — dieses wird fuer die KI-Analyse-Features (Tabs 2-3, Steps 5-6) benoetigt.

### Electron-Modus (Entwicklung)

```bash
pnpm electron:dev
```

Startet gleichzeitig den Vite-Dev-Server und die Electron-App. Die App laedt `http://localhost:3055` und zeigt einen Setup-Screen fuer Name und API Key.

### Produktion (macOS DMG)

```bash
pnpm electron:build:dmg
```

Erstellt eine signierte `.dmg`-Datei in `.INSTALL/`. Die fertige App laedt die gebundelte `dist/index.html`.

### Alle Scripts

| Script                  | Beschreibung                                      |
|-------------------------|---------------------------------------------------|
| `pnpm dev`              | Vite Dev-Server auf Port 3055                     |
| `pnpm build`            | TypeScript-Check + Vite Production Build          |
| `pnpm preview`          | Vorschau des Production Builds auf Port 3055      |
| `pnpm typecheck`        | Nur TypeScript-Pruefung (`tsc --noEmit`)          |
| `pnpm electron:dev`     | Electron + Vite parallel starten                  |
| `pnpm electron:build`   | Build + Electron-Builder (macOS)                  |
| `pnpm electron:build:dmg` | Build + DMG-Installer erstellen                 |

---

## 3. Architektur

### Projektstruktur

```
skillworkshop/
├── src/
│   ├── App.tsx                 # Haupt-App: State-Orchestrierung, 6-Schritte-Flow
│   ├── types.ts                # Datenmodell: Dreyfus, DEP, Skill, Participant
│   ├── main.tsx                # React-Einstiegspunkt
│   ├── index.css               # Tailwind-Direktiven + Druck-Styles
│   ├── electron.d.ts           # TypeScript-Definitionen fuer Electron IPC
│   ├── lib/
│   │   └── claude.ts           # Claude API Client (Dual-Modus: Electron/Browser)
│   ├── data/
│   │   └── groups.ts           # 6 Gruppen, 24 Rollen, 100+ Skills
│   └── components/
│       ├── Stepper.tsx          # Visuelle Fortschrittsanzeige (6 Schritte)
│       ├── DepartmentSelect.tsx # Step 1: Gruppen- & Rollenauswahl
│       ├── SkillInventory.tsx   # Step 2: 4-Tab Skill-Inventur
│       ├── SelfAssessment.tsx   # Step 3: Dreyfus-Bewertungsmatrix
│       ├── SkillProfile.tsx     # Step 4: Skill-Profil Visualisierung
│       ├── FutureAnalysis.tsx   # Step 5: Zukunftsanalyse + KI
│       ├── DevelopmentPlan.tsx  # Step 6: Entwicklungsvorschlag + KI
│       └── NativeSetup.tsx      # Electron Startup-Screen
├── electron/
│   ├── main.cjs                # Electron Main Process (Fenster, IPC, Config)
│   └── preload.cjs             # IPC-Bridge zum Frontend
├── dist/                       # Gebauter Output
├── .INSTALL/                   # Fertige DMG-Installer
├── vite.config.ts              # Vite-Konfiguration (Port 3055)
├── tailwind.config.js          # Tailwind mit Brand-Farben
├── tsconfig.json               # TypeScript strict mode
└── package.json                # Dependencies & Scripts
```

### Komponentenbaum

```
App.tsx (State-Zentrale)
├── NativeSetup          (nur Electron, erster Render)
├── Stepper              (immer sichtbar)
└── Step-Inhalte:
    ├── DepartmentSelect (Step 1)
    │   └── liest: groups.ts
    ├── SkillInventory   (Step 2)
    │   ├── Tab 1: Ist-Analyse
    │   ├── Tab 2: Rollenentwicklung (Claude)
    │   ├── Tab 3: Fokus & Zukunft (Claude)
    │   └── Tab 4: Skill-Typen & Auswahl (Claude)
    ├── SelfAssessment   (Step 3)
    ├── SkillProfile     (Step 4, read-only)
    ├── FutureAnalysis   (Step 5, Claude optional)
    └── DevelopmentPlan  (Step 6, Claude optional)
```

---

## 4. Der 6-Schritte-Workshop-Flow

### Step 1 — Gruppe & Rolle

**Komponente:** `DepartmentSelect.tsx`

Der Workshop beginnt mit einer kaskadierenden Auswahl:

1. **Gruppe waehlen** — Dropdown mit 6 Gruppen (Business Consulting, Software Development, usw.)
2. **Rolle waehlen** — Dropdown zeigt nur Rollen der gewaehlten Gruppe
3. **Vorschau** — Rollenbeschreibung und Skill-Anzahl werden angezeigt

**Datenfluss:** Ausgewaehlte Rolle wird als `department`-Objekt gespeichert und bestimmt alle verfuegbaren Skills fuer die folgenden Schritte.

Bei Rollenwechsel werden alle nachgelagerten Daten zurueckgesetzt (Custom Skills, Bewertungen, KI-Texte).

---

### Step 2 — Skill-Inventur

**Komponente:** `SkillInventory.tsx` (4 Tabs)

Die Skill-Inventur ist der umfangreichste Schritt mit 4 Untertabs:

#### Tab 1: Ist-Analyse

- Zeigt alle Skills der gewaehlten Rolle, gruppiert nach Kategorie
- Jeder Skill hat ein farbiges DEP-Badge (Durable/Evolving/Perishable)
- **Skills hinzufuegen**: Name + DEP-Klassifikation pro Kategorie
- **Skills entfernen**: Sowohl Basis- als auch Custom-Skills loeschbar
- Alle angezeigten Skills fliessen automatisch in die weiteren Schritte ein

#### Tab 2: Rollenentwicklung 1-5 Jahre (KI)

- **Benoetigt Claude API Key**
- Fragestellung: "Wie veraendert sich die Rolle durch KI, Automatisierung und gesellschaftliche Trends?"
- Claude analysiert die Rolle in 1-, 3- und 5-Jahres-Horizonten
- Ergebnis wird als formatierter Text angezeigt
- Disclaimer: "Daten basieren auf dem Trainingswissen von Claude — dienen als Diskussionsgrundlage"

#### Tab 3: Fokus & Zukunftsskills (KI)

- **Benoetigt Claude API Key**
- Fragestellung: "Welche Skills gewinnen an Bedeutung, welche verlieren? Wohin verschiebt sich der Rollen-Fokus?"
- Analyse welche Skills zukunftssicher sind vs. welche veralten

#### Tab 4: Skill-Typen & finale Auswahl

- Alle Skills (Ist + von KI generierte Zukunfts-Skills) gruppiert nach Halbwertszeit:
  - **Langlebige Power Skills** (Durable, > 7 Jahre): z.B. Kommunikation, Kritisches Denken
  - **Evolutionaere Skills** (Evolving, 2,5-7 Jahre): z.B. Agile Methoden, Figma
  - **Vergaengliche Skills** (Perishable, < 2,5 Jahre): z.B. spezifische Framework-Versionen
- Erklaer-Kacheln zu jeder Kategorie
- **Zwei Checkboxen pro Skill**: "Jetzt wichtig" und "Zukuenftig wichtig"
- **KI-Zukunfts-Skills generieren**: Button erzeugt strukturierte Skill-Vorschlaege (JSON-parsed) mit Begruendung
- Mindestens 3 Skills muessen markiert werden, bevor es weitergeht

**Ausgabe:** `importantNow` (Set), `importantFuture` (Set), `futureSkills` (Array), Custom Skills

---

### Step 3 — Selbsteinschaetzung

**Komponente:** `SelfAssessment.tsx`

- **Matrix**: Zeilen = markierte Skills, Spalten = Teilnehmer
- **Teilnehmer**: Namensvergabe, hinzufuegen (max. 6), entfernen
- **Bewertung**: Dropdown pro Skill/Teilnehmer mit Dreyfus-Stufe (0-5)
- Alle als "Jetzt wichtig" oder "Zukuenftig wichtig" markierten Skills erscheinen hier

#### Dreyfus-Stufen

| Stufe | Label                   | Beschreibung                              |
|-------|-------------------------|-------------------------------------------|
| 0     | Nicht bewertet          | Keine Einschaetzung abgegeben             |
| 1     | Anfaenger (Novice)      | Braucht klare Regeln, kein Kontext        |
| 2     | Fortgeschr. Anfaenger   | Erkennt Muster, braucht Anleitung         |
| 3     | Kompetent               | Plant eigenstaendig, priorisiert           |
| 4     | Gewandt (Proficient)    | Sieht Gesamtbild, handelt intuitiv        |
| 5     | Experte                 | Meistert Ausnahmen, innoviert              |

---

### Step 4 — Skill-Profil

**Komponente:** `SkillProfile.tsx`

- **Read-Only Ansicht** der Bewertungsmatrix
- Zeigt individuelle Bewertungen als farbcodierte Badges
- Berechnet und zeigt **Gruppendurchschnitt** (ø Gruppe) pro Skill
- Farben: Rot (1) → Orange (2) → Gelb (3) → Blau (4) → Gruen (5)

---

### Step 5 — Zukunftsanalyse

**Komponente:** `FutureAnalysis.tsx`

#### Automatische Analyse (ohne KI)

Berechnet fuer jeden Skill:

- **Durchschnitt, Min, Max, Streuung** (Varianz zwischen Teilnehmern)
- Identifiziert:
  - **Staerken**: Durchschnitt >= 4
  - **Luecken**: Durchschnitt <= 2
  - **Hohe Streuung**: Spread >= 2 (Wissenstransfer-Chance)
  - **Perishable-Warnung**: Vergaengliche Skills mit niedrigem Level
  - **Evolving Gaps**: Evolutionaere Skills unter "Kompetent"
- **Top-7-Prioritaeten**: Die dringendsten Handlungsfelder

#### Metriken-Dashboard

- Gesamtdurchschnitt ueber alle Skills
- Anzahl Staerken, Luecken, Skills mit hoher Streuung
- Durchschnitte pro Kategorie

#### KI-Analyse (optional)

- Button: "KI-Analyse starten"
- Claude erstellt strategische Analyse mit:
  1. Rollenentwicklung (2-3 Jahre)
  2. Skill-Bewertung (Zukunftsrelevanz)
  3. Strategische Empfehlungen (3-5 Massnahmen)
  4. Wissenstransfer-Chancen

---

### Step 6 — Entwicklungsvorschlag

**Komponente:** `DevelopmentPlan.tsx`

#### Automatische Empfehlungen (ohne KI)

Fuer jeden Skill unter Level 5:

| Aktuelles Level | Massnahme                                          | Zeitrahmen  |
|-----------------|------------------------------------------------------|-------------|
| 0-1             | Strukturierte Schulung + Mentoring                  | 2-3 Monate  |
| 2               | Eigenstaendige Aufgaben + Pair-Working              | 3-4 Monate  |
| 3               | Projektverantwortung + Community of Practice        | 4-6 Monate  |
| 4               | Strategische Ownership + Mentoring geben            | 6-12 Monate |

- **Top 5 Prioritaeten** als detaillierte Karten (Aktuell → Ziel, Zeitrahmen, Format, Massnahmen)
- **Weitere Skills** als kompakte Tabelle

#### KI-Entwicklungs-Fahrplan (optional)

Claude generiert einen personalisierten 90-Tage-Plan:

- Wochenweise Meilensteine
- Konkrete Ressourcen (Kurse, Buecher, Plattformen, Communities)
- Team-Lernformate (Pair-Learning, Book Clubs, Lightning Talks, Coding Dojos)
- Quick Wins (3-5 sofort umsetzbare Aktionen)
- Erfolgsmessung & Follow-up-Timing

#### Fuehrungskraft-Zusammenfassung

Dunkle Karte mit:

- Prioritaets-Skills
- Durchschnittslevel der Prioritaets-Skills
- Empfohlene Formate
- Benoetigte Unterstuetzung durch Fuehrungskraft
- Teilnehmerliste

#### Druckfunktion

Button zum Drucken — alle Navigations-Elemente werden ausgeblendet (`.no-print`).

---

## 5. Datenmodell

### Kern-Typen (`src/types.ts`)

```typescript
// Dreyfus-Kompetenzstufen
type DreyfusLevel = 0 | 1 | 2 | 3 | 4 | 5;

// Skill-Halbwertszeit (Dependency Classification)
type DepClassification = "Durable" | "Evolving" | "Perishable";
// Durable:    > 7 Jahre   (Soft Skills, Design Thinking, Kommunikation)
// Evolving:   2,5-7 Jahre (Agile Methoden, AI-Tools, Frameworks)
// Perishable: < 2,5 Jahre (Spezifische Framework-Versionen, Tool-APIs)

// Hierarchie
interface Group {
  id: string;
  name: string;
  description: string;
  roles: Role[];
}

interface Role {       // = Department (Kompatibilitaetstyp)
  id: string;
  name: string;
  description: string;
  categories: SkillCategory[];
}

interface SkillCategory {
  name: string;
  skills: Skill[];
}

interface Skill {
  name: string;
  dep: DepClassification;
}

interface Participant {
  name: string;
  ratings: Record<string, DreyfusLevel>;  // skillName → Level
}
```

### DEP-Klassifikation erklaert

| Typ        | Halbwertszeit | Beispiele                                    | Farbe   |
|------------|---------------|----------------------------------------------|---------|
| Durable    | > 7 Jahre     | User Research, Stakeholder Mgmt, Kommunikation | Gruen   |
| Evolving   | 2,5-7 Jahre   | Figma, Agile PM, BI-Tools, Prompt Engineering | Blau    |
| Perishable | < 2,5 Jahre   | Spezifische APIs, Framework-Versionen         | Gelb    |

---

## 6. Gruppen & Rollen

Die App enthaelt **6 Gruppen** mit insgesamt **24 Rollen** (`src/data/groups.ts`):

### Business Consulting (6 Rollen)

| Rolle                              | Kategorien                                           |
|------------------------------------|------------------------------------------------------|
| UX/UI Design                       | Handwerklich-Technisch, Methodisch, Consulting       |
| Requirements Engineering & Mgmt    | Anforderungserhebung, Modellierung, Management       |
| Business Analyst                   | Business Analysis, Datenanalyse, Modellierung        |
| QS Spezialist                      | Testmethodik, Tools, Kollaboration                   |
| Test Manager                       | Teststrategie, Teamfuehrung, Reporting               |
| Test Automation Engineer           | Frameworks, Programmierung, CI/CD                    |

### Software Development (2 Rollen)

| Rolle                 | Kategorien                                              |
|-----------------------|---------------------------------------------------------|
| Frontend Entwickler   | Web-Technologien, Frameworks, UX-Integration            |
| Backend Entwickler    | Server-Technologien, Datenbanken, API-Design            |

### Projektmanagement (3 Rollen)

| Rolle              | Kategorien                                                |
|--------------------|-----------------------------------------------------------|
| Projektassistenz   | Organisation, Dokumentation, Kommunikation                |
| Scrum Master       | Agile Methoden, Facilitation, Team-Coaching               |
| Projektleitung     | Planung, Stakeholder Mgmt, Risikomanagement               |

### Backoffice (6 Rollen)

| Rolle                         | Kategorien                                          |
|-------------------------------|-----------------------------------------------------|
| Geschaeftsfuehrungsassistenz  | Organisation, Kommunikation, Vertraulichkeit        |
| Teamassistenz                 | Administration, Koordination, Tools                 |
| HR Generalistin               | Personaladmin, Arbeitsrecht, HR-Prozesse            |
| Recruiting                    | Sourcing, Bewerbermanagement, Employer Branding     |
| Controlling                   | Finanzplanung, Reporting, Analyse                   |
| IT-Admin                      | Infrastruktur, Security, Support                    |

### P.O.C. — People, Organization, Change (6 Rollen)

| Rolle                       | Kategorien                                            |
|-----------------------------|-------------------------------------------------------|
| Learning & Development      | Lerndesign, Didaktik, Evaluation                      |
| Personalentwicklung         | Kompetenzmodelle, Karrierepfade, Talentmanagement     |
| Agile Coach                 | Agile Frameworks, Coaching, Transformation            |
| Teamentwicklung             | Teamdynamik, Moderation, Konfliktloesung              |
| Changebegleitung            | Change-Management, Kommunikation, Stakeholder         |
| Beratung OE & Change        | Organisationsdesign, Strategieberatung, Diagnostik    |

### Leadership Team (2 Rollen)

| Rolle                                       | Kategorien                                 |
|---------------------------------------------|--------------------------------------------|
| Operative Geschaeftsfuehrung                | Strategie, Finanzen, Organisation          |
| Gruppenleitung (fachlich & disziplinarisch) | Fuehrung, Personalentwicklung, Fachexpertise |

Jede Rolle hat 3-4 Kategorien mit je 4-7 kuratierten Skills (gesamt: 100+ Skills). Alle Skills sind mit einer DEP-Klassifikation versehen.

---

## 7. KI-Integration (Claude API)

### Technischer Aufbau (`src/lib/claude.ts`)

- **Modell**: `claude-sonnet-4-20250514`
- **Max Tokens**: 2048

#### Dual-Modus Architektur

```
Browser-Modus:
  Frontend → fetch() → api.anthropic.com
  (Header: anthropic-dangerous-direct-browser-access: true)

Electron-Modus:
  Frontend → IPC → Main Process → net.request() → api.anthropic.com
  (Kein CORS, kein Browser-Exposure)
```

### Einsatzpunkte der KI

| Schritt    | Funktion                                  | Erforderlich? |
|------------|-------------------------------------------|---------------|
| Step 2, Tab 2 | Rollenentwicklung 1-5 Jahre            | Optional       |
| Step 2, Tab 3 | Fokus-Verschiebung & Zukunftsskills    | Optional       |
| Step 2, Tab 4 | Generierung strukturierter Zukunfts-Skills | Optional   |
| Step 5     | Strategische Zukunftsanalyse              | Optional       |
| Step 6     | 90-Tage Entwicklungs-Fahrplan             | Optional       |

Alle KI-Features sind optional — die App funktioniert auch vollstaendig ohne API Key (Steps 1-4 komplett, Steps 5-6 mit automatischen Empfehlungen ohne KI).

### API Key Eingabe

- **Browser**: Eingabefeld im Header (rechts oben)
- **Electron**: Setup-Screen beim ersten Start, wird in `~/Library/Application Support/SkillWorkshop/config.json` gespeichert

### Fehlerbehandlung

- Prueft Key-Format (`sk-` Prefix)
- Netzwerk-Fehler → deutschsprachige Fehlermeldung
- Parse-Fehler → Retry-Button
- Ladezustand mit Spinner-Animation

---

## 8. Electron (Native macOS App)

### Architektur

```
electron/main.cjs     — Hauptprozess: Fenster, IPC-Handler, Config
electron/preload.cjs  — Bridge: exponiert window.electronAPI
src/electron.d.ts     — TypeScript-Typen fuer die Bridge
```

### Fenster-Konfiguration

- **Groesse**: 1400 x 900 (Minimum: 1024 x 700)
- **macOS Style**: Versteckte Titelleiste (`hiddenInset`), Traffic Lights bei (16, 16)
- **Security**: Context Isolation aktiviert, Node Integration deaktiviert

### IPC-Kanaele

| Kanal           | Richtung          | Funktion                                    |
|-----------------|--------------------|---------------------------------------------|
| `config:read`   | Renderer → Main   | Config aus `config.json` laden               |
| `config:write`  | Renderer → Main   | Config in `config.json` speichern            |
| `claude:call`   | Renderer → Main   | Claude API Aufruf ueber Node.js (kein CORS) |

### Config-Datei

Pfad: `~/Library/Application Support/SkillWorkshop/config.json`

Speichert:
- Teilnehmer-Name
- API Key

### NativeSetup-Screen

Wird nur angezeigt, wenn `window.electronAPI` existiert:

1. Laedt gespeicherte Config beim Mounten
2. Eingabe: Name (min. 2 Zeichen) + API Key (muss mit `sk-` beginnen)
3. Speichert in config.json
4. Uebergibt Name als ersten Teilnehmer + API Key an App

---

## 9. Browser-Modus (Localhost)

### Unterschiede zum Electron-Modus

| Merkmal               | Browser (localhost)                           | Electron (.dmg)                          |
|------------------------|-----------------------------------------------|-------------------------------------------|
| Start                  | `pnpm dev` → http://localhost:3055            | App oeffnen                               |
| API Key Eingabe        | Header-Feld (rechts oben)                     | Setup-Screen (persistent)                 |
| API Key Persistenz     | Session-only (React State)                    | `config.json` (dauerhaft)                 |
| Claude API Aufruf      | Direkter `fetch()` mit CORS-Header            | IPC → Node.js `net.request()`             |
| Setup-Screen           | Wird uebersprungen                            | Erforderlich                              |
| Header-Anzeige         | "Skill Workshop v0.0.5-beta"                  | "Skill Workshop — Native App v0.0.5-beta" |
| Erkennung              | `window.electronAPI` ist `undefined`           | `window.electronAPI` ist definiert        |

### Hinweis

Im Browser-Modus wird der API Key ueber den Header `anthropic-dangerous-direct-browser-access: true` direkt an die Anthropic API gesendet. Dies ist fuer lokale Entwicklung vorgesehen. In einer Produktivumgebung sollte ein Server-seitiger Proxy verwendet werden.

---

## 10. Komponenten-Referenz

### `App.tsx`

Zentrale Komponente — verwaltet den gesamten Application State und orchestriert den 6-Schritte-Flow. Rendert Step-Komponenten bedingt basierend auf `step` State.

### `Stepper.tsx`

Visuelle Fortschrittsanzeige mit 6 nummerierten Schritten. Aktiver Schritt ist hervorgehoben, abgeschlossene Schritte zeigen einen gruenen Haken.

### `DepartmentSelect.tsx` (Step 1)

Kaskadierende Dropdowns fuer Gruppe → Rolle. Zeigt Rollenbeschreibung und Skill-Vorschau. "Weiter"-Button nur aktiv wenn Rolle gewaehlt.

### `SkillInventory.tsx` (Step 2)

Groesste Komponente (~967 Zeilen) mit 4 Tabs. Verwaltet eigenen Tab-State und delegiert KI-Aufrufe. Enthaelt Unterkomponenten:
- `IstAnalyse` — Skill-Liste mit Add/Remove
- `AITextTab` — Wiederverwendbare KI-Analyse-Ansicht (Tabs 2 + 3)
- `SkillTypesTab` — DEP-Gruppierung, Checkboxen, KI-Skill-Generierung

### `SelfAssessment.tsx` (Step 3)

Bewertungsmatrix mit Dreyfus-Dropdowns. Teilnehmer-Management (hinzufuegen, entfernen, benennen). Scrollbar bei vielen Skills.

### `SkillProfile.tsx` (Step 4)

Read-Only Matrix mit farbcodierten Badges und Gruppendurchschnitt. Keine Interaktion ausser Navigation.

### `FutureAnalysis.tsx` (Step 5)

Metriken-Dashboard + automatische Analyse + optionale KI-Analyse. Enthalt `computeAnalysis()` fuer Luecken/Staerken/Streuung.

### `DevelopmentPlan.tsx` (Step 6)

Top-5-Karten + Resttabelle + KI-Fahrplan + Fuehrungskraft-Zusammenfassung + Druckfunktion. Enthaelt `computeRecommendations()`.

### `NativeSetup.tsx`

Electron-only Setup-Screen. Laedt/Speichert Config. Validiert Eingaben. Wird nur einmal beim Start angezeigt.

---

## 11. State-Management

Alle State-Variablen leben in `App.tsx` und werden per Props an Kindkomponenten weitergegeben:

```
State-Variablen in App.tsx:

nativeReady          boolean              Electron-Setup abgeschlossen?
apiKey               string               Claude API Key
step                 number (1-6)         Aktueller Schritt

--- Step 2: Skill-Inventur ---
customSkills         Record<string, Skill[]>   Hinzugefuegte Skills pro Kategorie
deletedBaseSkills    Set<string>              Entfernte Basis-Skills
futureSkills         Skill[]                  KI-generierte Zukunfts-Skills
importantNow         Set<string>              "Jetzt wichtig" markierte Skills
importantFuture      Set<string>              "Zukuenftig wichtig" markierte Skills
roleEvolutionText    string                   KI-Text Rollenentwicklung
focusShiftText       string                   KI-Text Fokus-Verschiebung

--- Step 3+: Teilnehmer ---
participants         Participant[]            Array mit {name, ratings}

--- Abgeleitet (useMemo) ---
activeCategories     SkillCategory[]          Gefiltert auf markierte Skills
```

Es wird kein externer State-Manager (Redux, Zustand, etc.) verwendet — reines React `useState` + `useCallback` + `useMemo`.

---

## 12. Styling & Design-System

### Framework

Tailwind CSS 3.4 mit der Inter-Schriftart (via Google Fonts).

### Farbsystem

#### Dreyfus-Stufen

| Stufe | Farbe     | Tailwind-Klasse |
|-------|-----------|-----------------|
| 1     | Rot       | `bg-red-*`      |
| 2     | Orange    | `bg-orange-*`   |
| 3     | Gelb      | `bg-yellow-*`   |
| 4     | Blau      | `bg-blue-*`     |
| 5     | Gruen     | `bg-emerald-*`  |

#### DEP-Klassifikation

| Typ        | Farbe     | Badge                            |
|------------|-----------|----------------------------------|
| Durable    | Gruen     | `bg-emerald-50 text-emerald-700` |
| Evolving   | Blau      | `bg-blue-50 text-blue-700`       |
| Perishable | Bernstein | `bg-amber-50 text-amber-700`     |

#### UI-Akzentfarben

- **Primaer**: Slate (Header, Buttons, Texte)
- **KI-Features**: Indigo (Buttons, Loading, Highlights)
- **Fehler**: Red (Alerts, Error-States)
- **Erfolg**: Emerald (Bestaetigungen)

### Responsive Design

- Mobile-first Ansatz
- Versteckte Elemente auf kleinen Screens (`md:` Prefix)
- Scrollbare Tabellen bei schmalen Viewports
- Touch-freundliche Buttons (>= 32px Hoehe)

### Druck-Styles

- `.no-print` Klasse blendet Elemente beim Drucken aus
- `.print-break` erzwingt Seitenumbruch
- Optimiert fuer A4/Letter

---

## 13. Build & Deployment

### Browser-Build

```bash
pnpm build
```

1. `tsc --noEmit` — TypeScript-Pruefung
2. `vite build` — Bundelt nach `dist/`
3. Vorschau mit `pnpm preview`

### Electron DMG-Build

```bash
pnpm electron:build:dmg
```

1. Fuehrt `pnpm build` aus
2. `electron-builder --mac dmg` erstellt:
   - `.INSTALL/mac-arm64/Skill-Workshop.app`
   - `.INSTALL/Skill-Workshop-{version}.dmg`

### electron-builder Konfiguration

| Feld             | Wert                               |
|------------------|------------------------------------|
| App-ID           | `com.red6.skillworkshop`           |
| Produktname      | Skill-Workshop                     |
| Kategorie        | `public.app-category.education`    |
| Output-Ordner    | `.INSTALL/`                        |
| Enthaelt         | `dist/**/*`, `electron/**/*`       |

---

## 14. Sicherheit

### API Key Handling

| Aspekt                 | Browser                                      | Electron                            |
|------------------------|----------------------------------------------|--------------------------------------|
| Speicherort            | React State (fluechtig)                      | `config.json` (persistent)          |
| Uebertragung           | Direkt an Anthropic API (CORS-Header)        | Via Main Process (kein Browser-Exposure) |
| Persistenz             | Verloren bei Page Reload                     | Bleibt zwischen Sessions            |

### Electron Security

- **Context Isolation**: Aktiviert — Renderer hat keinen Zugriff auf Node.js
- **Node Integration**: Deaktiviert
- **Preload Script**: Exponiert nur definierte APIs (`readConfig`, `writeConfig`, `callClaude`)
- **API Aufrufe**: Laufen im Main Process via `net.request()` — kein CORS-Exposure

### Datenhaltung

- **Keine Datenbank** — alle Workshop-Daten sind session-basiert
- Teilnehmer koennen Ergebnisse ausdrucken
- Bei Seiten-Reload gehen alle Daten verloren (ausser Electron-Config)

---

## 15. Konfiguration

### Vite (`vite.config.ts`)

```typescript
{
  plugins: [react()],
  base: "./",           // Relative Pfade fuer Electron
  server: { port: 3055 }
}
```

### TypeScript (`tsconfig.json`)

- **Strict Mode** aktiviert
- Target: ES2022
- Keine `any` Types erlaubt

### Tailwind (`tailwind.config.js`)

- Scannt: `index.html`, `src/**/*.{js,ts,jsx,tsx}`
- Erweitert mit Custom Brand-Farben (Teal-Palette)

---

## 16. Druckfunktion

Die Druckfunktion ist in Step 6 (Entwicklungsvorschlag) verfuegbar:

- Button ruft `window.print()` auf
- Klassen `.no-print` blenden Header, Footer, Navigation, Buttons aus
- Klasse `.print-break` erzwingt Seitenumbrueche zwischen Abschnitten
- CSS Media Queries optimieren fuer A4/Letter
- `.app-drag` Bereiche werden im Druck nicht dargestellt

---

## 17. Bekannte Einschraenkungen

1. **Keine Datenpersistenz im Browser** — Workshop-Daten gehen bei Reload verloren
2. **Nur macOS** — Electron-Build ist derzeit nur fuer macOS konfiguriert
3. **Nur Deutsch** — Keine Mehrsprachigkeit implementiert
4. **Keine Export-Funktion** — Ausser Drucken kein PDF/CSV-Export
5. **Keine Zusammenarbeit** — Kein Multi-User oder Echtzeit-Kollaboration
6. **KI-Limit** — Max. 2048 Tokens pro Antwort; bei sehr komplexen Rollen kann die Analyse abgeschnitten werden
7. **Kein Offline-KI** — KI-Features benoetigen Internetverbindung + API Key
8. **Session-basiert** — Kein Speichern und Laden von Workshops

---

## 18. Entwickler-Richtlinien

Siehe auch `CLAUDE.md` fuer die vollstaendige Entwickler-Policy.

### Code-Standards

- TypeScript im Strict Mode — keine `any` Types, `unknown` + Type Guards verwenden
- Named Exports bevorzugen (kein `export default`)
- Absolute Imports via Path Aliases (`@/lib`, `@/components`)
- Bestehende Patterns im Codebase befolgen

### Git-Konventionen

- **Conventional Commits**: `<type>(<scope>): <summary>`
  - Types: `feat`, `fix`, `refactor`, `docs`, `style`, `test`, `chore`
- Kein Force-Push auf `main` oder `develop`
- Keine Secrets/`.env`/Credentials committen
- Linting + Type-Check vor jedem Commit

### Architektur-Prinzipien

- Business-Logik gehoert in Service-Layer, nicht in Route-Handler
- Komposition vor Vererbung
- Schema-Aenderungen nur ueber Migrationen

### Testing

- Jede neue Funktion muss Tests enthalten
- Bestehende Test-Suite vor Aenderungen ausfuehren

---

*Dokumentation erstellt fuer Skill-Workshop v0.0.5-beta — Stand: April 2026*
