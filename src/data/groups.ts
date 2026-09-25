import type { Group, MarketDriver, Role } from "../types";
import { swGroup } from "./swCatalogs";
import { qaCore, testManager, testAutomation } from "./bcCatalogs";
import { RUMP_DIGITALE, RUMP_VERBAL } from "./rumpSkills";

// -----------------------------------------------------------------------------
// Catalog meta (ANF-12)
// -----------------------------------------------------------------------------

/** Skill-Katalog Version. Erhoehen, wenn Strukturen, Steckbriefe oder Anker
 *  geaendert werden. CHANGELOG.md fuehrt die Historie. */
export const CATALOG_VERSION = "0.6.2";
export const CATALOG_UPDATED_AT = "2026-06-17";

// -----------------------------------------------------------------------------
// Rump-Pflichtskills (ANF-04, ANF-05) — gelten fuer alle Rollengruppen
// (defined in rumpSkills.ts, re-exported here for backwards compatibility)
// -----------------------------------------------------------------------------
export { RUMP_DIGITALE, RUMP_VERBAL };

// -----------------------------------------------------------------------------
// Business Consulting
// -----------------------------------------------------------------------------

const uxuiDesign: Role = {
  id: "uxui-design",
  name: "UX/UI Design und Consulting",
  description:
    "User Experience und Interface Design — von Research ueber Prototyping bis zur visuellen Gestaltung und strategischen Beratung.",
  categories: [
    {
      name: "Fachlich",
      skills: [
        {
          name: "Versicherungsprodukte & User Journeys",
          dep: "Durable",
          targetLevel: 3,
          trend: "stabil",
          trendgrund: "Produkt- und Prozessverstaendnis bleibt Grundlage nutzerzentrierten Designs; KI veraendert die Produktlogik der Versicherung kaum.",
          description:
            "»Verstaendnis der Versicherungsprodukte, Vertriebswege und typischen Kundenreisen (Abschluss, Schadensfall, Vertragsaenderung) als Grundlage fuer nutzerzentriertes Design im Versicherungskontext. Typische Taetigkeiten: Nutzerbeduerfnisse entlang der Kundenreise einordnen · Produktlogik in Interface-Entscheidungen uebersetzen · Mit Fachbereichen auf Augenhoehe ueber Versicherungsprozesse sprechen«",
          anchors: {
            1: "Kennt grundlegende Versicherungsbegriffe; braucht Erklaerung bei Fachfragen.",
            2: "Versteht typische Kundenreisen und Produktarten; ordnet Screens grob ein.",
            3: "Gestaltet eigenstaendig fuer versicherungsspezifische Prozesse; stellt gezielte Fachfragen.",
            4: "Erkennt Optimierungspotenzial in Kundenreisen; beraet Fachbereiche zu UX-Implikationen.",
            5: "Gilt als Schnittstelle zwischen Design und Versicherungsfachlichkeit; praegt Produktentscheidungen mit.",
          },
        },
        {
          name: "Regulatorische UI-Anforderungen (DSGVO, BFSG)",
          dep: "Evolving",
          targetLevel: 3,
          trend: "steigend",
          trendgrund: "Das BFSG gilt seit Juni 2025; der EU AI Act verlangt zusaetzlich Transparenzhinweise in KI-gestuetzten Oberflaechen.",
          description:
            "»Kenntnis der regulatorischen Anforderungen an digitale Oberflaechen — Barrierefreiheit (BFSG) und Datenschutz (DSGVO) — als Design-Constraint. Nicht gemeint: juristische Bewertung von Grenzfaellen. Typische Taetigkeiten: Einwilligungs- und Consent-Flows datenschutzkonform gestalten · Barrierefreiheits-Anforderungen in Designs beruecksichtigen · Bei Unsicherheit Compliance/Recht einbeziehen«",
          anchors: {
            1: "Kennt die Begriffe DSGVO und BFSG; braucht Unterstuetzung bei der Umsetzung.",
            2: "Setzt Standard-Anforderungen (Consent-Banner, Kontrastwerte) mit Vorlage um.",
            3: "Gestaltet eigenstaendig konform zu DSGVO und BFSG; erkennt Risikofaelle.",
            4: "Bewertet neue Design-Patterns auf Regulatorik-Konformitaet; klaert Grenzfaelle mit Fachstellen.",
            5: "Definiert interne Design-Standards fuer Barrierefreiheit und Datenschutz.",
          },
        },
        {
          name: "Branchen-Patterns (Insurance, FinTech)",
          dep: "Evolving",
          targetLevel: 3,
          trend: "steigend",
          trendgrund: "Mit KI-Chat- und Assistenz-Oberflaechen entstehen neue Interface-Patterns im Versicherungs- und FinTech-Umfeld.",
          description:
            "»Kenntnis etablierter UX-Patterns und Interface-Konventionen aus Versicherung und FinTech (z. B. Antragsstrecken, Vertragsuebersichten, Zahlungsfluesse). Typische Taetigkeiten: Bestehende Branchenloesungen fuer Inspiration und Benchmarking einordnen · Bewaehrte Patterns gezielt uebernehmen oder bewusst abweichen · Wettbewerbsanalysen im Versicherungs-/FinTech-Umfeld durchfuehren«",
          anchors: {
            1: "Kennt einzelne bekannte Beispiele; braucht Anleitung bei der Einordnung.",
            2: "Erkennt gaengige Branchen-Patterns; wendet sie mit Unterstuetzung an.",
            3: "Waehlt eigenstaendig passende Patterns aus; begruendet Abweichungen.",
            4: "Bewertet Patterns kritisch auf Uebertragbarkeit; entwickelt eigene Varianten.",
            5: "Gilt als Referenz fuer Branchen-Patterns; praegt Design-Sprache des Unternehmens.",
          },
        },
        { ...RUMP_DIGITALE, trend: "stark steigend" },
      ],
    },
    {
      name: "Technisch",
      skills: [
        {
          name: "Typografie und visuelle Hierarchie",
          dep: "Durable",
          targetLevel: 3,
          trend: "stabil",
          trendgrund: "Gestalterisches Grundhandwerk, das von KI-Tools kaum ersetzt wird.",
          description:
            "»Gestaltung von Textelementen und visueller Ordnung, sodass Nutzer:innen Inhalte muehelos erfassen und priorisieren koennen. Typische Taetigkeiten: Schriftgroessen, -gewichte und Zeilenabstaende gezielt einsetzen · Visuelle Hierarchien fuer komplexe Screens aufbauen · Typografie-Systeme konsistent ueber Produkte hinweg anwenden«",
          anchors: {
            1: "Nutzt vorgegebene Textstile; erstellt selten eigene Hierarchien.",
            2: "Setzt Standard-Typografie-Regeln eigenstaendig um.",
            3: "Baut eigenstaendig klare visuelle Hierarchien fuer neue Screens auf.",
            4: "Optimiert Typografie-Systeme uebergreifend; loest komplexe Lesbarkeitsprobleme.",
            5: "Definiert Typografie-Standards fuer das Unternehmen; schult andere.",
          },
        },
        {
          name: "Figma (Gestaltung & Prototyping)",
          dep: "Perishable",
          targetLevel: 3,
          trend: "stabil",
          trendgrund: "Figma bleibt etabliertes Standardwerkzeug fuer Gestaltung und Prototyping.",
          description:
            "»Sicherer Umgang mit Figma fuer Gestaltung, interaktive Prototypen und Auto-Layout-Strukturen. Typische Taetigkeiten: Komponenten und Auto-Layout-Frames strukturiert aufbauen · Interaktive Prototypen fuer Testing und Reviews erstellen · Mit Entwicklerteams via Dev Mode/Inspect zusammenarbeiten«",
          anchors: {
            1: "Bedient Figma grundlegend; braucht Anleitung bei Auto Layout.",
            2: "Erstellt einfache Komponenten und Prototypen eigenstaendig.",
            3: "Nutzt Auto Layout und Prototyping-Funktionen vollstaendig und effizient.",
            4: "Optimiert komplexe Figma-Dateien; etabliert Best Practices im Team.",
            5: "Gilt als Figma-Expertin; entwickelt Team-weite Nutzungsstandards.",
          },
        },
        {
          name: "Accessibility (WCAG-Konformitaet)",
          dep: "Evolving",
          targetLevel: 3,
          trend: "steigend",
          trendgrund: "Das BFSG macht Barrierefreiheit digitaler Angebote fuer Versicherer verpflichtend.",
          description:
            "»Gestaltung barrierefreier Interfaces gemaess WCAG-Richtlinien — Kontraste, Tastaturbedienung, Screenreader-Kompatibilitaet. Nicht gemeint: automatisierte Accessibility-Audits durchfuehren (Aufgabe QA/Entwicklung). Typische Taetigkeiten: Kontrastwerte und Fokuszustaende pruefen · Designs fuer Tastatur- und Screenreader-Nutzung gestalten · Accessibility-Anforderungen in Reviews einbringen«",
          anchors: {
            1: "Kennt WCAG-Grundprinzipien; braucht Unterstuetzung bei der Umsetzung.",
            2: "Setzt Standard-Anforderungen (Kontrast, Alt-Texte) eigenstaendig um.",
            3: "Gestaltet eigenstaendig WCAG-konform; erkennt haeufige Barrieren.",
            4: "Bewertet komplexe Interaktionsmuster auf Barrierefreiheit; beraet das Team.",
            5: "Definiert Accessibility-Standards; gilt als interne Referenz.",
          },
        },
        {
          name: "Responsive & Adaptive Design",
          dep: "Durable",
          targetLevel: 3,
          trend: "stabil",
          trendgrund: "Etablierter Gestaltungsstandard ohne grundlegende Verschiebung.",
          description:
            "»Gestaltung von Interfaces, die sich konsistent an unterschiedliche Bildschirmgroessen und Geraete anpassen. Typische Taetigkeiten: Breakpoints und Grid-Systeme definieren · Layouts fuer Mobile, Tablet und Desktop konsistent gestalten · Adaptive Komponenten fuer wechselnde Kontexte entwerfen«",
          anchors: {
            1: "Passt vorgegebene Layouts fuer andere Bildschirmgroessen mit Anleitung an.",
            2: "Gestaltet Standard-Breakpoints eigenstaendig.",
            3: "Entwirft eigenstaendig responsive Layouts fuer neue Features.",
            4: "Loest komplexe Adaptionsprobleme; definiert Grid-Systeme fuer Produkte.",
            5: "Setzt Responsive-Design-Standards fuer das Unternehmen.",
          },
        },
        {
          name: "Design Systems aufbauen und pflegen",
          dep: "Evolving",
          targetLevel: 3,
          trend: "steigend",
          trendgrund: "Tokens und Komponenten werden zur Grundlage KI-gestuetzter Design-to-Code-Workflows.",
          description:
            "»Aufbau, Pflege und Weiterentwicklung eines konsistenten Design Systems (Komponenten, Tokens, Richtlinien) fuer skalierbares Produktdesign. Typische Taetigkeiten: Neue Komponenten ins Design System integrieren · Konsistenz zwischen Design und Entwicklung sicherstellen · Dokumentation fuer Design-System-Nutzung pflegen«",
          anchors: {
            1: "Nutzt bestehende Design-System-Komponenten nach Vorgabe.",
            2: "Passt Komponenten innerhalb des Systems eigenstaendig an.",
            3: "Erweitert das Design System eigenstaendig um neue Komponenten.",
            4: "Verantwortet Konsistenz und Governance des Design Systems.",
            5: "Entwickelt die Design-System-Strategie; skaliert es ueber Teams hinweg.",
          },
        },
        {
          name: "Interaction Design & Micro-Animations",
          dep: "Durable",
          targetLevel: 3,
          trend: "steigend",
          trendgrund: "KI-Interfaces erfordern neue Interaktionszustaende wie Laden, Streaming und Unsicherheitsanzeigen.",
          description:
            "»Gestaltung von Interaktionsmustern und feingranularen Animationen, die Nutzerfuehrung und Feedback verstaendlich machen. Typische Taetigkeiten: Uebergaenge und Zustandswechsel gestalten · Micro-Animations fuer Feedback und Orientierung einsetzen · Interaktionskonzepte mit Entwicklung technisch abstimmen«",
          anchors: {
            1: "Nutzt vorgegebene Interaktionsmuster; braucht Anleitung bei Animationen.",
            2: "Gestaltet Standard-Interaktionen und einfache Animationen eigenstaendig.",
            3: "Entwirft eigenstaendig durchdachte Interaktions- und Animationskonzepte.",
            4: "Loest komplexe Interaktionsprobleme; stimmt Machbarkeit mit Entwicklung ab.",
            5: "Setzt Interaction-Design-Standards; praegt die Produktsprache.",
          },
        },
        {
          name: "Grundlagen HTML und CSS",
          dep: "Evolving",
          targetLevel: 2,
          trend: "steigend",
          trendgrund: "KI-Code-Tools ermoeglichen Designer:innen, Prototypen selbst in Code umzusetzen (Rump 2025: Technikverstaendnis).",
          description:
            "»Grundverstaendnis von HTML-Struktur und CSS-Styling, um mit Entwicklung auf Augenhoehe zu kommunizieren und Umsetzbarkeit einzuschaetzen. Nicht gemeint: eigenstaendige Frontend-Entwicklung. Typische Taetigkeiten: Technische Machbarkeit von Designs grob einschaetzen · Mit Entwicklung in gemeinsamer Sprache ueber Umsetzung sprechen · Einfache CSS-Anpassungen selbst nachvollziehen«",
          anchors: {
            1: "Kennt HTML/CSS-Grundbegriffe; kann Code nicht selbststaendig lesen.",
            2: "Liest einfachen HTML/CSS-Code und versteht grundlegende Struktur.",
            3: "Schaetzt Umsetzbarkeit von Designs technisch fundiert ein.",
            4: "Diskutiert komplexe CSS-Fragestellungen (Layout, Responsive) mit Entwicklung.",
            5: "Gilt als technische Ansprechpartnerin zwischen Design und Entwicklung.",
          },
        },
        {
          name: "Prompt Engineering",
          dep: "Evolving",
          targetLevel: 2,
          trend: "stark steigend",
          trendgrund: "Rump 2025 und WEF Future of Jobs 2025: KI-Kompetenz ist die am staerksten wachsende Faehigkeit.",
          description:
            "»Effektive Formulierung von Prompts fuer KI-Tools im Designprozess (Text-, Bild- und Codegenerierung). Typische Taetigkeiten: Prompts fuer Design- und Recherche-Aufgaben praezise formulieren · Prompts iterativ verfeinern und Ergebnisse kritisch pruefen · Wiederverwendbare Prompt-Vorlagen fuer haeufige Aufgaben entwickeln«",
          anchors: {
            1: "Nutzt vorgegebene Prompts; braucht Unterstuetzung bei der Formulierung.",
            2: "Formuliert einfache Prompts eigenstaendig fuer Standardaufgaben.",
            3: "Verfeinert Prompts gezielt und prueft Ergebnisse kritisch.",
            4: "Entwickelt wiederverwendbare Prompt-Vorlagen fuer das Team.",
            5: "Gilt als Prompt-Expertin; schult andere im Umgang mit KI-Tools.",
          },
        },
        {
          name: "KI-gestuetztes Design & generative Tools (z. B. Figma AI, Miro AI, Claude)",
          dep: "Perishable",
          targetLevel: 2,
          trend: "stark steigend",
          trendgrund: "Generative KI beschleunigt Ideation und Variantenbildung im Designprozess erheblich (WEF Future of Jobs 2025).",
          description:
            "»Einsatz generativer KI-Tools zur Ideation und schnellen Visualisierung von Loesungsvarianten — etwa verschiedener Design Patterns zur Abbildung einer Funktion — innerhalb eines vorgegebenen visuellen Stils. Nicht gemeint: generierte Designs ohne Nachbearbeitung uebernehmen. Typische Taetigkeiten: Alternative Design Patterns und Interaktionsvarianten fuer eine Funktion per KI generieren · Generierte Varianten kritisch pruefen, auswaehlen und weiterverarbeiten · Rechtliche und ethische Grenzen von KI-generierten Inhalten beachten«",
          anchors: {
            1: "Kennt gaengige generative Design-Tools und ihre Einsatzmoeglichkeiten.",
            2: "Generiert mit Unterstuetzung erste Loesungsvarianten fuer einfache Funktionen.",
            3: "Setzt generative Tools gezielt zur Ideation von Design Patterns ein; bewertet Varianten kritisch.",
            4: "Kombiniert mehrere Tools effizient; etabliert Workflows im Team.",
            5: "Definiert Nutzungsstandards fuer generative KI-Tools im Designprozess.",
          },
        },
      ],
    },
    {
      name: "Methodisch",
      skills: [
        {
          name: "Qualitative Interviews",
          dep: "Durable",
          targetLevel: 3,
          trend: "stabil",
          trendgrund: "Empathie und Gespraechsfuehrung bleiben menschliche Kernkompetenzen (WEF Future of Jobs 2025).",
          description:
            "»Planung und Durchfuehrung qualitativer Nutzerinterviews zur Erhebung von Beduerfnissen, Motivationen und Schmerzpunkten. Typische Taetigkeiten: Interviewleitfaeden entwickeln · Interviews neutral und ergebnisoffen fuehren · Erkenntnisse strukturiert auswerten und dokumentieren«",
          anchors: {
            1: "Fuehrt Interviews nach vorgegebenem Leitfaden; braucht Coaching.",
            2: "Entwickelt einfache Leitfaeden und fuehrt Standardinterviews eigenstaendig.",
            3: "Fuehrt Interviews souveraen und ergebnisoffen; leitet Erkenntnisse ab.",
            4: "Passt Interviewmethodik an komplexe Fragestellungen an; coacht andere.",
            5: "Gilt als Referenz fuer qualitative Forschung; entwickelt Methodik weiter.",
          },
        },
        {
          name: "Usability Testing (moderated & unmoderated)",
          dep: "Durable",
          targetLevel: 3,
          trend: "stabil",
          trendgrund: "Etablierte Validierungsmethode; KI unterstuetzt die Auswertung, ersetzt aber nicht die Durchfuehrung.",
          description:
            "»Planung und Durchfuehrung moderierter und unmoderierter Usability-Tests zur Validierung von Designs. Typische Taetigkeiten: Testszenarien und Aufgaben entwickeln · Tests moderieren oder unmoderierte Testsettings aufsetzen · Ergebnisse in konkrete Design-Empfehlungen uebersetzen«",
          anchors: {
            1: "Unterstuetzt bei Usability-Tests nach Anleitung.",
            2: "Fuehrt einfache moderierte Tests eigenstaendig durch.",
            3: "Plant und fuehrt moderierte und unmoderierte Tests eigenstaendig durch.",
            4: "Waehlt Testmethodik passend zur Fragestellung; loest methodische Probleme.",
            5: "Entwickelt Testing-Standards; schult andere in Usability-Testing.",
          },
        },
        {
          name: "Jobs-to-be-Done Framework",
          dep: "Durable",
          targetLevel: 2,
          trend: "stabil",
          trendgrund: "Etabliertes Framework ohne grundlegende Verschiebung.",
          description:
            "»Anwendung des Jobs-to-be-Done-Frameworks, um die eigentliche Aufgabe hinter Nutzerverhalten zu verstehen und Loesungen daran auszurichten. Typische Taetigkeiten: Job Stories aus Nutzerforschung ableiten · Feature-Entscheidungen anhand des \"Jobs\" priorisieren · Team fuer die JTBD-Denkweise sensibilisieren«",
          anchors: {
            1: "Kennt das Konzept; braucht Unterstuetzung bei der Anwendung.",
            2: "Formuliert einfache Job Stories mit Anleitung.",
            3: "Wendet JTBD eigenstaendig zur Priorisierung von Features an.",
            4: "Vermittelt JTBD-Denkweise im Team; loest komplexe Priorisierungsfragen.",
            5: "Etabliert JTBD als festen Bestandteil des Produktprozesses.",
          },
        },
        {
          name: "UX-Writing & Microcopy",
          dep: "Durable",
          targetLevel: 3,
          trend: "steigend",
          trendgrund: "Dialoge von KI-Bots und Conversational UIs erfordern gezieltes, nutzerzentriertes Schreiben.",
          description:
            "»Verfassen klarer, nutzerfreundlicher Texte fuer Interfaces — Buttons, Fehlermeldungen, Onboarding-Texte. Typische Taetigkeiten: Microcopy fuer neue Features verfassen · Tonalitaet und Terminologie konsistent halten · Texte anhand von Nutzerfeedback iterieren«",
          anchors: {
            1: "Uebernimmt vorgegebene Texte; braucht Unterstuetzung beim Formulieren.",
            2: "Verfasst einfache Standardtexte eigenstaendig.",
            3: "Formuliert eigenstaendig klare, konsistente Microcopy fuer neue Features.",
            4: "Entwickelt Tonalitaets- und Terminologie-Richtlinien; loest knifflige Formulierungen.",
            5: "Gilt als UX-Writing-Referenz; praegt die Sprache des Produkts.",
          },
        },
        {
          name: "Service Blueprint & Journey Mapping",
          dep: "Durable",
          targetLevel: 3,
          trend: "steigend",
          trendgrund: "Macht sichtbar, wo KI und Automatisierung in Front- und Backstage-Prozesse eingreifen.",
          description:
            "»Visualisierung von Nutzerreisen und dahinterliegenden Serviceprozessen, um Beruehrungspunkte und Bruchstellen zu identifizieren. Typische Taetigkeiten: Journey Maps aus Nutzerforschung erstellen · Service Blueprints mit Front- und Backstage-Prozessen entwickeln · Bruchstellen priorisiert an Stakeholder kommunizieren«",
          anchors: {
            1: "Unterstuetzt bei der Erstellung von Journey Maps nach Vorlage.",
            2: "Erstellt einfache Journey Maps eigenstaendig.",
            3: "Entwickelt eigenstaendig Journey Maps und Service Blueprints fuer komplexe Prozesse.",
            4: "Identifiziert kritische Bruchstellen proaktiv; beraet Stakeholder zu Priorisierung.",
            5: "Etabliert Journey Mapping als Standardmethode im Unternehmen.",
          },
        },
        {
          name: "UX-Audit",
          dep: "Durable",
          targetLevel: 3,
          trend: "stabil",
          trendgrund: "KI beschleunigt Heuristik-Checks; die fachliche Bewertung bleibt beim Menschen.",
          description:
            "»Systematische Analyse bestehender Interfaces und Nutzungsdaten (Heuristiken, Nutzerflows, Funnel-Daten) zur Identifikation von Verbesserungspotenzial. Typische Taetigkeiten: Heuristische Evaluationen durchfuehren · Nutzungsdaten und Funnels auf Auffaelligkeiten pruefen · Verbesserungspotenzial priorisiert aufbereiten«",
          anchors: {
            1: "Fuehrt einfache Analysen nach Vorlage durch.",
            2: "Wendet Standard-Heuristiken eigenstaendig an.",
            3: "Fuehrt eigenstaendig UX-Analysen durch; leitet priorisierte Empfehlungen ab.",
            4: "Kombiniert qualitative und quantitative Analysemethoden; loest komplexe Fragestellungen.",
            5: "Etabliert UX-Analyse-Standards; entwickelt neue Analyseansaetze.",
          },
        },
        {
          name: "Information Architecture & Navigation",
          dep: "Durable",
          targetLevel: 3,
          trend: "stabil",
          trendgrund: "Etablierte Methode ohne grundlegende Verschiebung.",
          description:
            "»Strukturierung von Inhalten und Navigation, sodass Nutzer:innen Informationen intuitiv finden. Typische Taetigkeiten: Sitemaps und Navigationsstrukturen entwickeln · Card Sorting/Tree Testing zur Validierung einsetzen · Informationsarchitektur bei wachsendem Produktumfang weiterentwickeln«",
          anchors: {
            1: "Nutzt vorgegebene Strukturen; braucht Anleitung bei eigener Gestaltung.",
            2: "Entwickelt einfache Sitemaps und Navigationsstrukturen eigenstaendig.",
            3: "Strukturiert eigenstaendig komplexe Informationsarchitekturen; validiert mit Testing.",
            4: "Loest Architekturprobleme bei stark wachsendem Produktumfang.",
            5: "Definiert IA-Standards fuer das gesamte Produktportfolio.",
          },
        },
        {
          name: "Online-Befragung",
          dep: "Durable",
          targetLevel: 2,
          trend: "stabil",
          trendgrund: "KI unterstuetzt Erstellung und Auswertung; die methodische Kompetenz bleibt gefragt.",
          description:
            "»Konzeption und Durchfuehrung quantitativer Online-Befragungen zur Validierung von Hypothesen an einer groesseren Nutzerbasis. Typische Taetigkeiten: Fragebogen methodisch sauber aufbauen · Befragungen aussenden und Ruecklauf steuern · Ergebnisse statistisch auswerten und einordnen«",
          anchors: {
            1: "Unterstuetzt bei der Erstellung von Befragungen nach Vorlage.",
            2: "Erstellt einfache Befragungen mit Standardfragetypen eigenstaendig.",
            3: "Konzipiert eigenstaendig methodisch saubere Befragungen; wertet Ergebnisse aus.",
            4: "Vermeidet haeufige methodische Fehler (Bias, Fragestellung); beraet andere.",
            5: "Gilt als Referenz fuer quantitative Nutzerforschung im Unternehmen.",
          },
        },
        {
          name: "Prototyping",
          dep: "Durable",
          targetLevel: 3,
          trend: "stabil",
          trendgrund: "Etablierte Kernmethode im Designprozess.",
          description:
            "»Konzeption von Prototypen unterschiedlicher Wirklichkeitsnaehe (Paper, Klick-Dummy, High-Fidelity) passend zur jeweiligen Testfrage. Typische Taetigkeiten: Fidelity-Level passend zur Fragestellung waehlen · Prototypen fuer Testing und Stakeholder-Reviews aufbauen · Feedback aus Tests in naechste Prototyp-Iteration einarbeiten«",
          anchors: {
            1: "Baut einfache Prototypen nach Anleitung.",
            2: "Erstellt Standard-Prototypen (Klick-Dummys) eigenstaendig.",
            3: "Waehlt eigenstaendig passendes Fidelity-Level; iteriert Prototypen zielgerichtet.",
            4: "Entwickelt komplexe interaktive Prototypen fuer anspruchsvolle Testfragen.",
            5: "Definiert Prototyping-Standards; schult andere in Methodenwahl.",
          },
        },
      ],
    },
    {
      name: "Kommunikation & Zusammenarbeit",
      skills: [
        {
          name: "Stakeholder-Management",
          dep: "Durable",
          targetLevel: 3,
          trend: "steigend",
          trendgrund: "KI-Projekte bringen neue Stakeholder und politisch sensiblere Entscheidungssituationen.",
          description:
            "»Erwartungen, Interessen und Einfluss relevanter Stakeholder identifizieren und ueber den Designprozess hinweg aktiv steuern. Typische Taetigkeiten: Stakeholder-Map pflegen · Reviews vorbereiten · Eskalationen einordnen«",
          anchors: {
            1: "Erkennt einzelne Stakeholder, ist aber stark angeleitet.",
            2: "Fuehrt Standardabstimmungen mit Hilfe einer Vorlage.",
            3: "Steuert Stakeholder eines Projekts eigenstaendig und konsistent.",
            4: "Antizipiert Konflikte, navigiert mehrere Interessen, coacht andere.",
            5: "Setzt Standards fuer Stakeholder-Arbeit auf Bereichsebene.",
          },
        },
        {
          name: "Praesentation von Design-Entscheidungen",
          dep: "Durable",
          targetLevel: 3,
          trend: "steigend",
          trendgrund: "Der Beratungsanteil der Rolle rueckt die Ueberzeugungsarbeit gegenueber Fachbereich und Management in den Vordergrund.",
          description:
            "»Ueberzeugende Praesentation von Design-Entscheidungen gegenueber Stakeholdern, inkl. Herleitung aus Nutzerforschung. Typische Taetigkeiten: Design-Rationale nachvollziehbar aufbereiten · Praesentationen fuer unterschiedliche Zielgruppen (Fachbereich, GF) anpassen · Kritische Rueckfragen souveraen beantworten«",
          anchors: {
            1: "Praesentiert Designs nach Vorlage; braucht Unterstuetzung bei Rueckfragen.",
            2: "Bereitet einfache Praesentationen eigenstaendig vor.",
            3: "Praesentiert Design-Entscheidungen souveraen und nachvollziehbar.",
            4: "Passt Praesentationen zielgruppengerecht an; navigiert kritische Diskussionen.",
            5: "Gilt als Vorbild fuer Design-Praesentationen; coacht andere.",
          },
        },
        {
          name: "Anforderungserhebung",
          dep: "Durable",
          targetLevel: 3,
          trend: "steigend",
          trendgrund: "KI-Projekte erzeugen neue Anforderungstypen. Erhebungskompetenz wird komplexer und wichtiger.",
          description:
            "»Systematische Erhebung von Anforderungen aus Fachbereich und Stakeholdern als Grundlage fuer den Designprozess. Typische Taetigkeiten: Kick-off-Gespraeche mit Fachbereichen fuehren · Anforderungen strukturiert dokumentieren · Widerspruechliche Anforderungen erkennen und klaeren«",
          anchors: {
            1: "Nimmt Anforderungen entgegen, wie sie formuliert werden.",
            2: "Erhebt Standard-Anforderungen eigenstaendig mit Leitfaden.",
            3: "Erhebt eigenstaendig vollstaendige Anforderungen; erkennt Widersprueche.",
            4: "Hinterfragt Anforderungen kritisch; klaert komplexe Zielkonflikte.",
            5: "Gilt als Referenz fuer Anforderungserhebung; entwickelt Vorgehen weiter.",
          },
        },
        {
          name: "UX-Metriken und ROI-Argumentation",
          dep: "Evolving",
          targetLevel: 2,
          trend: "steigend",
          trendgrund: "Budgetdruck und geforderte Wirksamkeitsnachweise fuer KI-Investitionen erhoehen den Bedarf an belastbaren UX-Metriken.",
          description:
            "»Definition und Interpretation von UX-Metriken (z. B. Task Success Rate, SUS-Score) sowie Argumentation des Geschaeftswerts von UX-Investitionen. Typische Taetigkeiten: Passende UX-Metriken fuer ein Projekt auswaehlen · Metriken erheben und interpretieren · UX-Verbesserungen in Geschaeftswert (ROI) uebersetzen«",
          anchors: {
            1: "Kennt gaengige UX-Metriken; braucht Unterstuetzung bei der Interpretation.",
            2: "Erhebt Standard-Metriken eigenstaendig.",
            3: "Waehlt passende Metriken aus; interpretiert Ergebnisse eigenstaendig.",
            4: "Uebersetzt UX-Verbesserungen ueberzeugend in Geschaeftswert; beraet Stakeholder.",
            5: "Etabliert UX-Metriken-Standards; verankert ROI-Denken im Unternehmen.",
          },
        },
        {
          name: "Cross-funktionale Teamkollaboration (agil)",
          dep: "Evolving",
          targetLevel: 3,
          trend: "steigend",
          trendgrund: "KI-Projekte erfordern Zusammenarbeit mit neuen Rollen (Data Engineers, KI-Spezialisten).",
          description:
            "»Effektive Zusammenarbeit mit Product, Entwicklung und anderen Disziplinen in agilen Teams. Typische Taetigkeiten: An Sprint-Planung und Refinements aktiv teilnehmen · Design-Entscheidungen im Team transparent kommunizieren · Abhaengigkeiten mit anderen Disziplinen fruehzeitig klaeren«",
          anchors: {
            1: "Nimmt an Teamformaten teil; braucht Unterstuetzung bei Abstimmung.",
            2: "Arbeitet in Standardformaten (Sprint-Planung, Refinement) eigenstaendig mit.",
            3: "Kollaboriert eigenstaendig und proaktiv mit allen Disziplinen im Team.",
            4: "Loest komplexe cross-funktionale Abhaengigkeiten; verbessert Teamprozesse.",
            5: "Gilt als Vorbild fuer agile Zusammenarbeit; praegt Teamkultur.",
          },
        },
        { ...RUMP_VERBAL, trend: "stabil" },
      ],
    },
  ],
};

const businessAnalyst: Role = {
  id: "business-analyst",
  name: "Business Analyst",
  description:
    "Bruecke zwischen Business und IT — analysiert Prozesse, erhebt Anforderungen, gestaltet fachliche Loesungen und begleitet Umsetzung bis Go-Live. Katalog v2.0 (Mai 2026, FK-validiert Diemo Gresch).",
  categories: [
    {
      name: "Fachlich",
      skills: [
      {
        name: "Versicherungsfachwissen",
        dep: "Durable",
        bewertungsmodell: "Bloom",
        targetLevel: 3,
        trend: "steigend",
        trendgrund: "Wer kein fundiertes Fachwissen hat, kann KI-Outputs nicht einordnen — Fachlichkeit wird zur Voraussetzung für kritisches Urteilen.",
        description: "Kenntnis relevanter Versicherungsprodukte (Leben, Sach, Kranken), Kernprozesse (Antrag, Police, Schaden) und regulatorischer Rahmenbedingungen (VAG, Solvency II, DSGVO). Nicht gemeint: Aktuarielle Berechnungen. Typische Taetigkeiten: Kundenanforderungen in Versicherungskontext einordnen · Regulatorische Constraints bei Lösungsdesign berücksichtigen · Fachjargon in IT-Sprache übersetzen.",
        keySkill: true,
        anchors: {
          1: "Kennt grundlegende Versicherungsprodukte und Fachbegriffe. Braucht Unterstützung bei der Einordnung.",
          2: "Erklärt Zusammenhänge zwischen Versicherungsprodukten, Kernprozessen und regulatorischen Anforderungen.",
          3: "Ordnet Kundenanforderungen selbstständig ein. Berücksichtigt regulatorische Rahmenbedingungen im Projektalltag.",
          4: "Erkennt regulatorische Implikationen proaktiv. Prüft Lösungen auf Versicherungskonformität und bewertet Zielkonflikte.",
          5: "Gilt als Domänenexperte. Berät zu regulatorischen Entwicklungen. Befähigt andere.",
        },
      },
      {
        name: "Geschäftsprozessverständnis",
        dep: "Durable",
        bewertungsmodell: "Bloom",
        targetLevel: 4,
        trend: "stark steigend",
        trendgrund: "KI-Automatisierung erfordert tiefes Prozessverständnis — wer nicht weiß wie Prozesse funktionieren, kann KI-Optimierungen nicht gestalten.",
        description: "Analyse und Dokumentation von Ende-zu-Ende Geschäftsprozessen (BPMN, Ist/Soll). Nicht gemeint: IT-Systemarchitektur. Typische Taetigkeiten: Ist-Prozesse aufnehmen und in BPMN dokumentieren · Soll-Prozesse definieren und mit Fachbereich abstimmen · Prozesslücken und Medienbrüche identifizieren.",
        anchors: {
          1: "Kennt grundlegende Prozessschritte des betreuten Fachbereichs. Braucht Unterstützung bei der Einordnung.",
          2: "Erklärt Prozessabläufe und Abhängigkeiten. Versteht Unterschiede zwischen Ist- und Soll-Zustand.",
          3: "Dokumentiert Prozesse eigenständig in BPMN. Identifiziert Lücken und Medienbrüche.",
          4: "Analysiert Prozesse systemübergreifend. Bewertet Optimierungspotenziale und leitet Handlungsempfehlungen ab.",
          5: "Entwirft Soll-Prozesse neu. Definiert Standards für Prozessdokumentation. Befähigt andere.",
        },
      },
      {
        name: "Regulatorische Umsetzungskompetenz",
        dep: "Durable",
        bewertungsmodell: "Bloom",
        targetLevel: 3,
        trend: "stark steigend",
        trendgrund: "EU AI Act und DSGVO verlangen nachweisbare regulatorische Konformität in IT-Projekten.",
        description: "Regulatorische Anforderungen in konkrete Projektanforderungen übersetzen. Abgrenzung: Nicht das Wissen über Regulatorik, sondern die operative Umsetzung im Projekt. Typische Taetigkeiten: Regulatorische Anforderungen in Fachkonzepte übersetzen · Auditierbarkeit und Dokumentationspflichten im Lösungsdesign berücksichtigen · Compliance-Implikationen gegenüber Fachbereich kommunizieren.",
        anchors: {
          1: "Kennt relevante Regulatoriken dem Namen nach. Braucht Unterstützung beim Verstehen von Auswirkungen.",
          2: "Erklärt welche regulatorischen Anforderungen für das betreute Projekt gelten. Leitet einfache Implikationen ab.",
          3: "Übersetzt regulatorische Anforderungen eigenständig in Projektanforderungen. Erkennt Umsetzungslücken.",
          4: "Bewertet Lösungsoptionen auf regulatorische Konformität. Erkennt Zielkonflikte zwischen Regulatorik und Projektzielen.",
          5: "Entwickelt regulatorische Anforderungsframeworks. Berät Fachbereich und Entwicklung. Gilt als Compliance-Ansprechpartner.",
        },
      },
      {
        name: "Versicherungsgeschäftsmodelle",
        dep: "Durable",
        bewertungsmodell: "Bloom",
        targetLevel: 3,
        trend: "steigend",
        trendgrund: "Versicherungskunden erwarten ganzheitliche Beratung — Geschäftsmodellverständnis macht BAs wertvoller.",
        description: "Verständnis von Versicherungsgeschäftsmodellen: Vertrieb, Abschluss, Bestandssysteme, Schadenprozesse, Kundenerlebnis. Nicht gemeint: Aktuarielle Modelle. Typische Taetigkeiten: Wert einer IT-Lösung für Vertrieb oder Kundenerlebnis einschätzen · Spartenspezifische Anforderungen im Geschäftsmodell einordnen · Priorisierungen mit Geschäftswert begründen.",
        anchors: {
          1: "Kennt grundlegende Versicherungssparten und Kernprozesse. Braucht Unterstützung beim Einordnen von Geschäftswert.",
          2: "Erklärt Zusammenhänge zwischen IT-Lösung und Geschäftsprozess. Versteht Bestandssysteme und Kundenbeziehungslogik.",
          3: "Schätzt den Geschäftswert von Anforderungen eigenständig ein. Begründet Priorisierungen mit Wertbeitrag.",
          4: "Analysiert Auswirkungen von IT-Entscheidungen auf Vertrieb, Bestand und Kundenerlebnis.",
          5: "Entwickelt Lösungsideen die das Geschäftsmodell aktiv verbessern. Gilt als strategischer Sparringspartner.",
        },
      },
      {
        name: "IT-Systemverständnis",
        dep: "Evolving",
        bewertungsmodell: "Bloom",
        targetLevel: 4,
        trend: "steigend",
        trendgrund: "Hybrid-Architekturen und steigende Schnittstellenkomplexität erfordern tieferes Systemverständnis.",
        description: "Konzeptionelles Verständnis von IT-Architekturen, Schnittstellen (APIs, Datenformate) und Datenflüssen. Nicht gemeint: Programmierung. Typische Taetigkeiten: Datenflüsse zwischen Systemen analysieren und beschreiben · API-Schnittstellen auf konzeptioneller Ebene definieren · Auswirkungen von Anforderungen auf Nachbarsysteme antizipieren.",
        anchors: {
          1: "Kennt grundlegende IT-Begriffe (Frontend, Backend, API). Braucht Unterstützung beim Einordnen technischer Zusammenhänge.",
          2: "Erklärt wie Systeme kommunizieren. Versteht Schnittstellen, Datenflüsse und Datenbankstrukturen konzeptionell.",
          3: "Beschreibt Systemgrenzen, Datenflüsse und Schnittstellen in Anforderungen. Schätzt technische Machbarkeit ein.",
          4: "Antizipiert Auswirkungen auf Nachbarsysteme. Definiert APIs konzeptionell. Bewertet technische Lösungsoptionen.",
          5: "Entwickelt Systemkonzepte eigenständig. Führt Diskussionen mit Architekten auf Augenhöhe.",
        },
      },
      {
        name: "Digitale Anwendungskompetenz",
        dep: "Evolving",
        bewertungsmodell: "Bloom",
        targetLevel: 3,
        trend: "stark steigend",
        trendgrund: "KI-gestützte Arbeit wird Standard. Verantwortung für KI-Output-Qualität steigt.",
        description: "Grundlegendes Verständnis digitaler Systeme und KI-gestützter Tools. Daten kritisch analysieren, KI-Outputs bewerten, digitale Werkzeuge verantwortungsvoll einsetzen. Nicht gemeint: Programmierung. (Quelle: Prof. Dr. Jutta Rump, 2025) Typische Taetigkeiten: KI-Outputs fachlich einordnen und bewerten · Datenauswertungen mit digitalen Tools kritisch interpretieren · KI-gestützte Analysen verantwortungsvoll im Projektkontext einsetzen.",
        keySkill: true,
        anchors: {
          1: "Kennt grundlegende digitale Tools und KI-Begriffe. Prüft Outputs noch nicht kritisch.",
          2: "Erklärt wie digitale Systeme und KI-Tools grundlegend funktionieren. Erkennt wann Ergebnisse hinterfragt werden müssen.",
          3: "Setzt digitale und KI-Tools gezielt ein. Bewertet Outputs fachlich und handelt als Mitgestaltender.",
          4: "Erkennt systemische Implikationen digitaler Lösungen. Kommuniziert Grenzen und Risiken von KI-Outputs.",
          5: "Definiert neue Einsatzszenarien für digitale Werkzeuge. Befähigt andere. Gestaltet digitale Arbeitsprozesse.",
        },
      },
      ],
    },
    {
      name: "Technisch",
      skills: [
      {
        name: "Requirements-Tools (Jira / Confluence)",
        dep: "Evolving",
        bewertungsmodell: "Dreyfus",
        targetLevel: 4,
        trend: "stabil",
        trendgrund: "Jira und Confluence bleiben Industriestandard.",
        description: "Sicherer Umgang mit Anforderungsmanagement- und Dokumentationstools inkl. projektspezifischem Customizing (Boards, Ticketprozesse, Confluence-Vorlagen). Nicht gemeint: technische Tool-Administration. Typische Taetigkeiten: User Stories, Epics und Sprintboards in Jira konfigurieren · Spezifikationen in Confluence strukturieren und vorlagenseitig pflegen · Backlogs filtern, priorisieren und mit dem Team synchronisieren.",
        anchors: {
          1: "Kennt die Oberfläche. Legt einfache Tickets an, sucht vorhandene Inhalte mit Unterstützung.",
          2: "Legt eigenständig User Stories und Epics an. Pflegt Confluence nach vorhandenen Strukturen.",
          3: "Nutzt Jira und Confluence sicher. Strukturiert Backlogs, Filter und Dashboards eigenständig.",
          4: "Konfiguriert Boards, definiert Ticketprozesse und legt Confluence-Vorlagen projektspezifisch an.",
          5: "Definiert team- oder projektweite Standards. Setzt neue Strukturen auf. Ist Anlaufstelle.",
        },
      },
      {
        name: "Prozessmodellierung (BPMN / DMN)",
        dep: "Durable",
        bewertungsmodell: "Dreyfus",
        targetLevel: 4,
        trend: "stabil",
        trendgrund: "BPMN bleibt Kommunikationsstandard. DMN gewinnt als Ergänzung für Regelmodellierung an Bedeutung.",
        description: "Erstellung von Geschäftsprozessmodellen (BPMN 2.0) sowie Regelmodellierung mit DMN (Decision Management Notation). Nicht gemeint: Workflow-Automatisierung. Typische Taetigkeiten: Ist- und Soll-Prozesse in BPMN modellieren · Entscheidungsregeln mit DMN-Diagrammen beschreiben · Komplexität in Teilprozesse und Subprozesse gliedern.",
        anchors: {
          1: "Kann einfache Prozessdiagramme lesen. Erstellt grundlegende Flussdiagramme mit Unterstützung.",
          2: "Modelliert einfache Ist-Prozesse eigenständig. Kennt DMN-Grundkonzepte.",
          3: "Modelliert Ist- und Soll-Prozesse vollständig. Erstellt einfache DMN-Entscheidungstabellen.",
          4: "Modelliert systemübergreifende Prozesse mit Ausnahmeflüssen. Erstellt komplexe DMN-Modelle.",
          5: "Setzt BPMN/DMN-Standards. Modelliert komplexeste Versicherungsprozesse. Befähigt andere.",
        },
      },
      {
        name: "Datenkompetenz und Analyse",
        dep: "Evolving",
        bewertungsmodell: "Dreyfus",
        targetLevel: 3,
        trend: "steigend",
        trendgrund: "Datenkompetenz wird zur Grundanforderung. Excel wird durch SQL und weitere Tools ergänzt.",
        description: "Daten mit geeigneten Werkzeugen (Excel, einfache SQL-Abfragen) strukturieren, auswerten und darstellen. Nicht gemeint: BI-Tools oder Programmierung. Typische Taetigkeiten: Anforderungslisten und Priorisierungsmatrizen in Excel pflegen · Einfache SQL-Abfragen zur Datenanalyse nutzen · Auswertungsergebnisse übersichtlich für Entscheider aufbereiten.",
        anchors: {
          1: "Pflegt bestehende Listen. Nutzt einfache Formeln. Braucht Unterstützung bei strukturierter Auswertung.",
          2: "Erstellt eigene Tabellen mit Filtern. Bereitet Daten übersichtlich auf.",
          3: "Analysiert eigenständig mit Filtern, Pivot-Tabellen und einfachen SQL-Abfragen.",
          4: "Kombiniert Datenquellen. Erstellt komplexere Analysen. Visualisiert Ergebnisse für Entscheider.",
          5: "Entwickelt wiederverwendbare Analysevorlagen. Ist Ansprechpartner für datenbasierte Auswertungen.",
        },
      },
      {
        name: "KI und Automatisierungsanforderungen",
        dep: "Perishable",
        bewertungsmodell: "Dreyfus",
        targetLevel: 3,
        trend: "stark steigend",
        trendgrund: "Automatisierung und KI-Projekte nehmen zu. BAs müssen Anforderungen für KI und RPA erheben können.",
        description: "Anforderungen für KI-, RPA- und Automatisierungsprojekte identifizieren und beschreiben. Abgrenzung zur Digitalen Anwendungskompetenz: Hier geht es um Anforderungserhebung für KI-Projekte, nicht allgemeinen KI-Tool-Einsatz. Typische Taetigkeiten: Unterscheiden wann RPA oder KI die geeignetere Lösung ist · Human-in-the-Loop-Anforderungen und Kontrollpunkte beschreiben · Datenqualitätsanforderungen für KI-Modelle erheben.",
        anchors: {
          1: "Kennt grundlegende Automatisierungskonzepte dem Namen nach. Braucht Unterstützung bei der Einordnung.",
          2: "Erkennt einfache Automatisierungspotenziale. Beschreibt grundlegende Anforderungen mit Unterstützung.",
          3: "Bewertet eigenständig ob RPA oder KI geeignet ist. Beschreibt Human-in-the-Loop-Anforderungen.",
          4: "Erhebt vollständige Anforderungen für komplexe KI/RPA-Projekte inkl. Risikobewertung.",
          5: "Definiert Anforderungsstandards für Automatisierungsprojekte. Gilt als Experte im Team.",
        },
      },
      {
        name: "UX-nahe Fachkonzeption und Barrierefreiheit",
        dep: "Evolving",
        bewertungsmodell: "Dreyfus",
        targetLevel: 3,
        trend: "steigend",
        trendgrund: "BFSG und steigende UX-Erwartungen machen Usability-Bewusstsein zur Pflichtanforderung.",
        description: "Anforderungen unter Berücksichtigung von Customer Journey, Usability und Barrierefreiheit (BFSG) konzipieren. Nicht gemeint: eigenständige UX-Designarbeit. Typische Taetigkeiten: Anforderungen aus Perspektive des Endnutzers formulieren · Barrierefreiheitsanforderungen (BFSG) im Konzept berücksichtigen · UX-Experten gezielt einbinden und deren Ergebnisse übersetzen.",
        anchors: {
          1: "Kennt grundlegende Usability-Begriffe. Berücksichtigt Endnutzerperspektive nur auf Nachfrage.",
          2: "Formuliert Anforderungen mit Blick auf die Nutzerseite. Kennt BFSG-Grundanforderungen.",
          3: "Berücksichtigt Customer Journey und Barrierefreiheit eigenständig. Erkennt wann UX-Expertise nötig ist.",
          4: "Bewertet Lösungen systematisch auf Usability. Moderiert UX-BA-Zusammenarbeit effektiv.",
          5: "Definiert Standards für nutzerorientierte Anforderungserhebung. Ist Ansprechpartner für UX-Schnittstelle.",
        },
      },
      ],
    },
    {
      name: "Methodisch",
      skills: [
      {
        name: "Anforderungserhebung & -dokumentation",
        dep: "Durable",
        bewertungsmodell: "Dreyfus",
        targetLevel: 4,
        trend: "steigend",
        trendgrund: "KI-Projekte erzeugen neue Anforderungstypen. Erhebungskompetenz wird komplexer und wichtiger.",
        description: "Strukturierte Erhebung, Analyse, Dokumentation und Validierung von Anforderungen. Interviewführung, Workshop-Moderation, Spezifikationserstellung. Nicht gemeint: technisches Design. Typische Taetigkeiten: Anforderungsworkshops mit Fachbereich leiten · Widersprüche und Lücken in Anforderungen identifizieren · Anforderungsdokumente (SRS, BRD) erstellen und abstimmen.",
        anchors: {
          1: "Nimmt Anforderungen auf, die Stakeholder direkt nennen. Dokumentiert nach Vorlage.",
          2: "Stellt gezielte Rückfragen, erkennt offensichtliche Lücken. Erstellt strukturierte Dokumente mit Unterstützung.",
          3: "Leitet eigenständig Anforderungsworkshops. Erkennt implizite Anforderungen und Widersprüche.",
          4: "Entwickelt Anforderungsarchitekturen für komplexe Systeme. Moderiert Konflikte.",
          5: "Definiert Anforderungsprozesse für das Team. Löst eskalierende Konflikte auf Managementebene.",
        },
      },
      {
        name: "User Stories & Akzeptanzkriterien",
        dep: "Evolving",
        bewertungsmodell: "Dreyfus",
        targetLevel: 4,
        trend: "stabil",
        trendgrund: "Agile bleibt Standard. KI kann Stories generieren — BA-Kompetenz zur Qualitätssicherung bleibt notwendig.",
        description: "Präzise, testbare User Stories und vollständige Akzeptanzkriterien im agilen Kontext. Story-Splitting und Backlog-Strukturierung. Typische Taetigkeiten: User Stories nach INVEST-Kriterien schreiben · Akzeptanzkriterien mit Given-When-Then formulieren · Epics in umsetzbare Stories aufbrechen.",
        anchors: {
          1: "Schreibt User Stories nach Vorlage. Formuliert einfache Akzeptanzkriterien mit Unterstützung.",
          2: "Schreibt eigenständig User Stories. Akzeptanzkriterien testbar, aber noch nicht vollständig.",
          3: "User Stories präzise und auf Sprint-Level geschnitten. Akzeptanzkriterien decken Happy Path ab.",
          4: "Erkennt und löst Story-Abhängigkeiten. Akzeptanzkriterien direkt als Testfälle nutzbar.",
          5: "Definiert Story-Standards für das Projekt. Coacht andere. Verhindert unvollständige Backlogs.",
        },
      },
      {
        name: "Agile und klassische Projektmanagement-Methoden",
        dep: "Evolving",
        bewertungsmodell: "Dreyfus",
        targetLevel: 3,
        trend: "steigend",
        trendgrund: "Mischformen aus agilen und klassischen Methoden sind heute die Realität. SAFe-Einführungen nehmen zu.",
        description: "Verständnis und Anwendung agiler (Scrum, SAFe) und klassischer Methoden. In der Praxis überwiegen Mischformen. Nicht gemeint: Agile Coaching. Typische Taetigkeiten: Aktive Mitarbeit in Sprint Planning, Review und Retrospektive · Backlog Refinement vorbereiten und moderieren · Klassische und agile Planungselemente situativ kombinieren.",
        anchors: {
          1: "Kennt Scrum-Begriffe und Grundablauf. Nimmt an Events teil.",
          2: "Arbeitet eigenständig in agilen und klassischen Teams mit. Versteht Rollen und Verantwortlichkeiten.",
          3: "Moderiert Refinements. Trägt aktiv zu Planning und Review bei. Kombiniert Methoden situativ.",
          4: "Navigiert in SAFe-Umgebungen. Erkennt Abhängigkeiten im PI Planning.",
          5: "Gilt als Methodenexperte. Gestaltet hybride Projektorganisationen mit.",
        },
      },
      {
        name: "Systemanalyse & Lösungsdesign",
        dep: "Durable",
        bewertungsmodell: "Dreyfus",
        targetLevel: 3,
        trend: "steigend",
        trendgrund: "Steigende Systemkomplexität erhöht den Bedarf an konzeptioneller Analysefähigkeit.",
        description: "Analyse bestehender Systeme und Ableitung von Lösungsoptionen auf konzeptioneller Ebene (Big Picture). Abgrenzung zur Fachkonzeption: Big Picture, nicht vollständige Ausarbeitung. Nicht gemeint: Coding. Typische Taetigkeiten: Gap-Analysen zwischen Ist-System und Anforderungen durchführen · Use Cases und Systemkontextdiagramme erstellen · Lösungsoptionen bewerten und empfehlen.",
        anchors: {
          1: "Beschreibt Ist-Systeme anhand vorhandener Dokumentation. Braucht Anleitung bei der Lösungsableitung.",
          2: "Führt einfache Gap-Analysen durch. Erstellt Use-Case-Diagramme nach Vorlage.",
          3: "Analysiert Systeme eigenständig, identifiziert Gaps. Bewertet und empfiehlt Lösungsoptionen.",
          4: "Analysiert komplexe Systemlandschaften. Entwirft Lösungsarchitekturen auf konzeptioneller Ebene.",
          5: "Gilt als konzeptionelle Autorität. Entwickelt Analyse-Frameworks für das Projektteam.",
        },
      },
      {
        name: "Fachkonzeption und fachliches Lösungsdesign",
        dep: "Durable",
        bewertungsmodell: "Dreyfus",
        targetLevel: 4,
        trend: "stark steigend",
        trendgrund: "Steigende Komplexität erfordert vollständige, testbare und abnahmefähige Fachkonzepte als Kernleistung.",
        description: "Vollständige Fachkonzepte mit Lösungsoptionen, Regeln, Rollenmodellen erstellen. Eigenständige QS: Konzepte auf Vollständigkeit, Testbarkeit und Abnahmefähigkeit prüfen. Abgrenzung: Vollständige Ausarbeitung, nicht Big Picture. Typische Taetigkeiten: Vollständige Fachkonzepte mit Regeln und Rollenmodellen erstellen · Fachliche QS: Konzepte auf Testbarkeit und Vollständigkeit prüfen · Lösungsoptionen mit Vor- und Nachteilen ausarbeiten und empfehlen.",
        anchors: {
          1: "Erstellt einfache Fachkonzepte nach Vorlage. Braucht Unterstützung bei Vollständigkeitsprüfung.",
          2: "Erstellt eigenständige Fachkonzepte für einfache Themen. Prüft auf offensichtliche Lücken.",
          3: "Erstellt vollständige Fachkonzepte mit Regeln und Testbarkeit. Führt eigenständige QS durch.",
          4: "Erstellt komplexe Fachkonzepte systemübergreifend. Erkennt Lücken proaktiv. Reviewt Konzepte anderer.",
          5: "Gilt als fachliche Referenz. Definiert Konzeptstandards. Befähigt andere.",
        },
      },
      {
        name: "Nicht-funktionale Anforderungen und Resilienz",
        dep: "Evolving",
        bewertungsmodell: "Dreyfus",
        targetLevel: 3,
        trend: "stark steigend",
        trendgrund: "EU AI Act und Auditierbarkeit machen nicht-funktionale Anforderungen zur strategischen Pflichtaufgabe.",
        description: "Erhebung und Beschreibung nicht-funktionaler Anforderungen mit Fokus auf regulatorische Implikationen (Auditierbarkeit, Berichterstattung, Logging). Abgrenzung zur Regulatorischen Umsetzungskompetenz: Hier technische Ableitung von NFAs. Typische Taetigkeiten: Nicht-funktionale Anforderungen aus regulatorischen Vorgaben ableiten · Auditierbarkeitsanforderungen (Logging, Protokollierung) beschreiben · Resilienz- und Wiederherstellungsanforderungen berücksichtigen.",
        anchors: {
          1: "Kennt den Begriff nicht-funktionale Anforderungen. Erhebt NFAs nur auf direkte Nachfrage.",
          2: "Erhebt grundlegende NFAs mit Unterstützung. Versteht Zusammenhang zur Regulatorik.",
          3: "Erhebt NFAs eigenständig inkl. Auditierbarkeit. Leitet NFAs aus regulatorischen Anforderungen ab.",
          4: "Erkennt komplexe NFA-Abhängigkeiten. Bewertet Lösungsoptionen auf NFA-Konformität.",
          5: "Definiert NFA-Standards für Projekte. Gilt als Experte für regulatorisch motivierte NFAs.",
        },
      },
      {
        name: "Abnahme und Go-Live-Vorbereitung",
        dep: "Durable",
        bewertungsmodell: "Dreyfus",
        targetLevel: 3,
        trend: "steigend",
        trendgrund: "Zunehmende Systemkomplexität und kürzere Release-Zyklen erhöhen Bedeutung strukturierter Abnahme- und Go-Live-Prozesse.",
        description: "UAT planen, koordinieren und begleiten. Risikoabwägung bei bekannten Defekten, Defect Triage und Go-Live-Empfehlung vorbereiten. Nicht gemeint: technisches Testmanagement. Typische Taetigkeiten: UAT mit Fachbereich planen und begleiten · Defekte klassifizieren und Risikoabwägung für Go-Live vorbereiten · Go-Live-Empfehlung mit Begründung an Stakeholder kommunizieren.",
        anchors: {
          1: "Nimmt an UAT-Sessions teil. Protokolliert Fehler nach Vorlage.",
          2: "Leitet einfache Testfälle ab. Koordiniert UAT-Termine. Klassifiziert offensichtliche Fehler.",
          3: "Plant und begleitet UAT eigenständig. Führt Defect Triage durch. Bereitet Go-Live-Empfehlung vor.",
          4: "Koordiniert komplexe UATs. Bewertet Risiken bekannter Defekte. Trifft fundierte Go-Live-Empfehlungen.",
          5: "Definiert UAT- und Go-Live-Standards. Entwickelt Teststrategien. Ist Eskalationsinstanz.",
        },
      },
      ],
    },
    {
      name: "Kommunikation & Zusammenarbeit",
      skills: [
      {
        name: "Stakeholder-Management",
        dep: "Durable",
        bewertungsmodell: "Dreyfus",
        targetLevel: 4,
        trend: "steigend",
        trendgrund: "KI-Projekte bringen neue Stakeholder und politisch sensiblere Entscheidungssituationen.",
        description: "Identifikation und aktive Steuerung von Stakeholder-Erwartungen und -beziehungen. Nicht gemeint: Vertragsverhandlung oder Akquise. Typische Taetigkeiten: Stakeholder-Map für Projekte erstellen und pflegen · Proaktiv Status und Entscheidungsbedarfe kommunizieren · Konflikte zwischen Stakeholder-Gruppen moderieren.",
        anchors: {
          1: "Kommuniziert reaktiv auf direkte Anfragen. Hält Termine ein.",
          2: "Kommuniziert proaktiv Status und Fortschritt. Erkennt unterschiedliche Interessen.",
          3: "Kennt Einfluss und Erwartungen aller Stakeholder. Steuert aktiv und eskaliert bei Bedarf.",
          4: "Navigiert politisch sensible Situationen souverän. Baut belastbare Beziehungen auf.",
          5: "Gilt als vertrauenswürdiger Berater auf Entscheider-Ebene. Positioniert das Team als Partner.",
        },
      },
      {
        name: "Präsentation von Analyseergebnissen",
        dep: "Durable",
        bewertungsmodell: "Dreyfus",
        targetLevel: 3,
        trend: "stabil",
        trendgrund: "Präsentationskompetenz bleibt gefragt. Überzeugungskraft bleibt menschlich.",
        description: "Adressatengerechte Aufbereitung und Präsentation für Fach- und Führungsebene. Nicht gemeint: Sales-Präsentationen. Typische Taetigkeiten: Anforderungsworkshop-Ergebnisse für Entscheider aufbereiten · Komplexe Systemzusammenhänge visuell vereinfachen · Empfehlungen mit Begründung und Entscheidungsoptionen präsentieren.",
        anchors: {
          1: "Präsentiert vorbereitete Inhalte mit Unterstützung. Reagiert unsicher auf unerwartete Fragen.",
          2: "Bereitet Ergebnisse eigenständig auf. Passt Detailtiefe grob an die Zielgruppe an.",
          3: "Präsentiert zielgruppengerecht. Visualisiert Komplexität verständlich.",
          4: "Überzeugt auch kritische Stakeholder. Antizipiert Einwände. Moderiert kontroverse Diskussionen.",
          5: "Gilt als vertrauenswürdiger Berater. Setzt Kommunikationsstandards. Coacht andere.",
        },
      },
      {
        name: "Anforderungsverhandlung & Priorisierung",
        dep: "Durable",
        bewertungsmodell: "Dreyfus",
        targetLevel: 4,
        trend: "steigend",
        trendgrund: "Mehr Stakeholder und Anforderungskomplexität erfordern Business-Impact-Bewertung und -Kommunikation.",
        description: "Moderation von Priorisierungsprozessen und Anforderungskonflikten. Business-Impact bewerten und kommunizieren. BA als neutraler Vermittler. Nicht gemeint: kommerzielle Vertragsverhandlung. Typische Taetigkeiten: Priorisierungsworkshops mit MoSCoW oder Kano moderieren · Business-Impact von Anforderungen bewerten und kommunizieren · Scope-Konflikte zwischen Fachbereich und Entwicklung sachlich lösen.",
        anchors: {
          1: "Dokumentiert Anforderungskonflikte. Leitet Priorisierungsentscheidungen weiter.",
          2: "Moderiert einfache Priorisierungen. Beschreibt Business-Impact mit Unterstützung.",
          3: "Leitet Priorisierungsworkshops eigenständig. Bewertet und kommuniziert Business-Impact.",
          4: "Navigiert komplexe Mehrparteien-Verhandlungen. Löst Konflikte zwischen Fachbereich und Entwicklung.",
          5: "Definiert Priorisierungsprozesse. Löst eskalierte Situationen auf Managementebene.",
        },
      },
      {
        name: "Verbalisierung & Strukturierung",
        dep: "Durable",
        bewertungsmodell: "Dreyfus",
        targetLevel: 4,
        trend: "stark steigend",
        trendgrund: "Präzise Formulierung wird zum Wettbewerbsvorteil — für Prompting, Spezifikationen und neue Stakeholder.",
        description: "Gedanken ordnen, Inhalte klar formulieren, Komplexität reduzieren. Relevant für Spezifikationen, Konzepte und Prompting. (Quelle: Prof. Dr. Jutta Rump, 2025) Typische Taetigkeiten: Technische Sachverhalte für Nicht-Techniker verständlich formulieren · Anforderungsdokumente klar strukturieren und auf Wesentliches reduzieren · Präzise Prompts für KI-gestützte BA-Aufgaben formulieren.",
        keySkill: true,
        anchors: {
          1: "Formuliert verständlich wenn Inhalt klar ist. Struktur entsteht intuitiv. Texte manchmal zu lang.",
          2: "Strukturiert Inhalte nach Vorlagen. Formuliert einfache Sachverhalte klar.",
          3: "Formuliert präzise und adressatengerecht. Reduziert Komplexität aktiv.",
          4: "Bringt schwierige Inhalte auf den Punkt. Formuliert Prompts mit hoher Treffsicherheit.",
          5: "Setzt Kommunikationsstandards. Befähigt andere. Gilt als Referenz für klare Texte und Prompts.",
        },
      },
      {
        name: "Cross-funktionale Teamkollaboration",
        dep: "Evolving",
        bewertungsmodell: "Dreyfus",
        targetLevel: 3,
        trend: "steigend",
        trendgrund: "KI-Projekte erfordern Zusammenarbeit mit neuen Rollen (Data Engineers, KI-Spezialisten).",
        description: "Effektive Zusammenarbeit mit Entwicklung, QA, UX, PM und Kundenseite. Nicht gemeint: Führung oder Teammanagement. Typische Taetigkeiten: Als Bindeglied zwischen Fachbereich und Entwicklung agieren · Anforderungen in gemeinsamen Refinement-Sessions klären · Feedback aus Entwicklung und QA in Anforderungen zurückspielen.",
        anchors: {
          1: "Arbeitet in der eigenen Rolle. Kommuniziert mit anderen Disziplinen reaktiv.",
          2: "Beteiligt sich aktiv in cross-funktionalen Meetings. Versteht Perspektiven von Entwicklung und QA.",
          3: "Agiert als verlässliches Bindeglied. Klärt Anforderungen proaktiv im Team.",
          4: "Navigiert in komplexen Konstellationen mit neuen Rollen. Moderiert fachübergreifende Klärungen.",
          5: "Definiert Kollaborationsstandards. Befähigt das Team. Ist Ansprechpartner bei Reibungsverlusten.",
        },
      },
      {
        name: "Changebegleitung und Wissenstransfer",
        dep: "Durable",
        bewertungsmodell: "Dreyfus",
        targetLevel: 3,
        trend: "steigend",
        trendgrund: "Jedes IT-Projekt ist ein Veränderungsprojekt. Ohne Wissenstransfer scheitern Lösungen in der Praxis.",
        description: "Veränderungsprozesse durch Kommunikation, Enablement, Schulung, Dokumentation und Übergabe unterstützen. Nicht gemeint: Change Management auf Unternehmensebene. Typische Taetigkeiten: Übergabedokumentationen und Schulungsunterlagen erstellen · Key User bei der Einführung neuer Systeme begleiten und befähigen · Wissenstransfer zwischen Projektteam und Betrieb strukturiert gestalten.",
        anchors: {
          1: "Erstellt einfache Dokumentationen zur Übergabe. Unterstützt bei Schulungen mit Anleitung.",
          2: "Erstellt eigenständig Übergabedokumentationen. Begleitet Key User bei einfachen Einführungen.",
          3: "Plant und gestaltet Wissenstransfer strukturiert. Befähigt Fachbereiche. Erkennt Change-Widerstände.",
          4: "Entwickelt Schulungskonzepte. Begleitet komplexe Veränderungsprozesse. Steuert proaktiv.",
          5: "Definiert Wissenstransfer-Standards. Gilt als Experte. Coacht andere.",
        },
      },
      ],
    },
  ],
};

// -----------------------------------------------------------------------------
// Projektmanagement
// -----------------------------------------------------------------------------

const projektassistenz: Role = {
  id: "projektassistenz",
  name: "Projektassistenz (operativ)",
  description:
    "Operative Unterstützung des Projektteams und/oder der Projektleitung — Übernahme von projektspezifischen Aufgaben sowie Koordination, Dokumentation und Kommunikation im laufenden Projektalltag im Versicherungsumfeld.",
  categories: [
    {
      name: "Fachlich",
      skills: [
        {
          name: "Versicherungs-Projektkontext",
          dep: "Durable",
          targetLevel: 2,
          description:
            "»Grundlegendes Verständnis typischer IT-Projekte im Versicherungsumfeld: Kernprozesse (z. B. Antrag, Police, Schaden), Projekttypen (z. B. Migrations-, Regulatorik-, Digitalisierungsprojekte), beteiligte Rollen und Governance-Strukturen. Typische Tätigkeiten: Aufgaben fachlich korrekt einordnen · Statusberichte inhaltlich verstehen · Abkürzungen und Fachbegriffe kennen«",
          anchors: {
            1: "Kennt grundlegende Versicherungsbegriffe; braucht Unterstützung bei fachlicher Einordnung.",
            2: "Erklärt Zusammenhänge zwischen Projektauftrag, IT-Lösung und Versicherungsprozessen.",
            3: "Ordnet Aufgaben und Risiken selbstständig in den Versicherungskontext ein.",
            4: "Bewertet Projektentscheidungen auf fachliche Stimmigkeit im Versicherungsumfeld.",
            5: "Gilt als fachlicher Ansprechpartner für Projektkontext; befähigt neue Teammitglieder.",
          },
        },
        {
          name: "Projektmanagement-Standards",
          dep: "Evolving",
          targetLevel: 4,
          keySkill: true,
          description:
            "»Kenntnis der wesentlichen Projektmanagement-Frameworks oder agilen Methoden wie Scrum und Kanban. Typische Tätigkeiten: Pflege des Projektstrukturplans · Aktualisierung der Ressourcenplanung · Nachverfolgung von Projektaufgaben«",
          anchors: {
            1: "Kennt Begriffe des Projektmanagements, Projektphasen sowie agile Methoden.",
            2: "Interpretiert die Anforderungen eines Projekts und ordnet sie den entsprechenden Projektphasen oder Standards zu.",
            3: "Unterstützt das Projekt bei der praktischen Umsetzung von Standards, in der Planung, Dokumentation oder der Nachverfolgung von Aufgaben.",
            4: "Bewertet die Einhaltung von Projektmanagementstandards und empfiehlt Verbesserungen; ist Sparringpartner für die Projektleitung, um den Projekterfolg zu sichern.",
            5: "Definiert Projektmanagementstandards für das Projektbüro.",
          },
        },
        {
          name: "Compliance-Vorgaben für Projektdokumentation",
          dep: "Evolving",
          targetLevel: 3,
          description:
            "»Kenntnis der wesentlichen Dokumentations- und Revisionspflichten in IT-Projekten im regulierten Umfeld (z. B. DSGVO, VAIT, interne Governance). Typische Tätigkeiten: Schutzbedarf von Dokumenten einschätzen · Ablageregeln und Zugriffssicherung einhalten · Dokumentationspflicht bei Verträgen und Protokollen beachten«",
          anchors: {
            1: "Kennt Begriffe wie Revisionssicherheit und DSGVO; hält Vorgaben auf Hinweis ein.",
            2: "Erklärt relevante Dokumentations- und Ablageregeln.",
            3: "Wendet die relevanten Dokumentationsregeln im Projektalltag an.",
            4: "Erkennt Lücken in der Dokumentation, spricht Handlungsbedarf proaktiv an und empfiehlt Verbesserungen.",
            5: "Definiert Dokumentationsstandards für das Projektbüro.",
          },
        },
        { ...RUMP_DIGITALE, targetLevel: 2 },
      ],
    },
    {
      name: "Technisch",
      skills: [
        {
          name: "MS Office Suite (z. B. Word, Excel, PowerPoint)",
          dep: "Durable",
          targetLevel: 3,
          keySkill: true,
          description:
            "»Professioneller Umgang mit Word (Vorlagen, Formatierung), Excel (Listen, Tabellen, Formeln, Diagramme) und PowerPoint (Präsentation, Vorlagenarbeit). Typische Tätigkeiten: Statusberichte und Protokolle in Word erstellen · Projektlisten und Budgetübersichten in Excel pflegen · Management-Präsentationen in PowerPoint aufbereiten«",
          anchors: {
            1: "Bedient alle drei Programme grundlegend; erstellt Dokumente nach Vorlage.",
            2: "Nutzt Standardfunktionen sicher; erstellt strukturierte Dokumente eigenständig.",
            3: "Setzt komplexere Funktionen gezielt ein (Formeln, Querverweise, Folienmaster); arbeitet effizient.",
            4: "Erstellt projektweite Vorlagen; automatisiert wiederkehrende Aufgaben mit Excel-Formeln.",
            5: "Optimiert Office-Prozesse; gilt als Ansprechpartner für Tool-Nutzung im Team.",
          },
        },
        {
          name: "Jira & Confluence",
          dep: "Evolving",
          targetLevel: 3,
          description:
            "»Pflege von Aufgaben, Tickets und Wissensdokumenten in Jira und Confluence im Rahmen des Projektbürobetriebs. Typische Tätigkeiten: Aufgaben und Meilensteine in Jira erfassen und aktualisieren · Protokolle und Besprechungsnotizen in Confluence ablegen · Einfache Dashboards und Filter nutzen«",
          anchors: {
            1: "Legt einfache Tickets an und sucht Dokumente mit Unterstützung.",
            2: "Pflegt Tickets und Confluence-Seiten eigenständig nach vorhandenen Strukturen.",
            3: "Konfiguriert einfache Dashboards und Filter; strukturiert Confluence-Bereiche.",
            4: "Setzt projektspezifische Jira-Boards und Confluence-Vorlagen auf.",
            5: "Definiert Nutzungsstandards; berät andere bei der Tool-Strukturierung.",
          },
        },
        {
          name: "Projektmanagement-Tools (z. B. MS Project, SeaTable oder vergleichbare Tools)",
          dep: "Evolving",
          targetLevel: 2,
          description:
            "»Grundlegende Nutzung von Planungs- und Tracking-Tools zur Unterstützung der Projektleitung. Typische Tätigkeiten: Projektpläne lesen und aktualisieren · Meilensteine und Abhängigkeiten nachtragen · Berichte und Exportvorlagen pflegen«",
          anchors: {
            1: "Liest vorhandene Projektpläne; aktualisiert einfache Felder mit Anleitung.",
            2: "Pflegt Pläne, Meilensteine und Status eigenständig nach Vorgabe.",
            3: "Erstellt einfache Projektpläne und Reports; konfiguriert Standardansichten.",
            4: "Erstellt komplexe Pläne mit Abhängigkeiten und Ressourcen.",
            5: "Definiert Tool-Standards für das Projektbüro; schult andere.",
          },
        },
      ],
    },
    {
      name: "Methodisch",
      skills: [
        {
          name: "Meeting Management",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Organisation von Projektmeetings, Vorbereitung von Unterlagen sowie strukturierte Erstellung von Sitzungsprotokollen, Entscheidungsnotizen und Besprechungsergebnissen — nachvollziehbar, vollständig und empfängergerecht. Typische Tätigkeiten: Projekttermine koordinieren und Agenden vorbereiten · Protokolle während oder nach Besprechungen erstellen · Aufgaben, Verantwortlichkeiten und Fristen festhalten«",
          anchors: {
            1: "Erstellt Projekttermine und einfache Protokolle nach Vorlage; hält wesentliche Ergebnisse fest.",
            2: "Protokolliert eigenständig; erfasst Entscheidungen, Aufgaben und offene Punkte vollständig.",
            3: "Bereitet Unterlagen und Agenda vor, passt Protokolltiefe und -format zielgruppengerecht an, trennt relevante von irrelevanten Inhalten und verfolgt Aufgaben aus den Terminen nach.",
            4: "Erstellt revisionssichere Protokolle für Steuerungskreise; bewertet Qualität anderer Protokolle.",
            5: "Definiert Protokollstandards für das Projektbüro; coacht andere.",
          },
        },
        {
          name: "Reporting und Monitoring",
          dep: "Evolving",
          targetLevel: 4,
          keySkill: true,
          bewertungsmodell: "Bloom",
          description:
            "»Erstellung von Berichten zur Auswertung des Projektstatus sowie zur Analyse und Vorbereitung von Projektaufgaben. Typische Tätigkeiten: Plan-Ist-Vergleiche aus Zeitmanagementsystemen erstellen · Projektbudget überwachen · Statusberichte erstellen«",
          anchors: {
            1: "Kann die grundlegenden Begriffe und Definitionen im Zusammenhang mit Reporting und Monitoring (z. B. KPIs, Meilensteine, Statusberichte) korrekt wiedergeben.",
            2: "Versteht die Zusammenhänge zwischen Projektzielen, KPIs und den im Reporting dargestellten Daten.",
            3: "Erstellt eigenständig regelmäßige Statusberichte basierend auf den vorgegebenen Projektmanagement-Standards; nutzt Tools, um Daten visuell darzustellen.",
            4: "Analysiert Berichte und identifiziert kritische Abweichungen oder Risiken, die den Projektfortschritt gefährden könnten.",
            5: "Unterstützt die Projektleitung bei der Einführung neuer Monitoring-Methoden oder -Tools und schult Teammitglieder in deren Anwendung.",
          },
        },
        {
          name: "Dokumentenmanagement & Ablage",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Strukturiertes Ablegen, Versionieren und Sicherstellen der Auffindbarkeit von Projektdokumenten in Fileshares, SharePoint oder Confluence. Typische Tätigkeiten: Ablagestruktur einhalten und weiterentwickeln · Versions- und Freigabestatus von Dokumenten pflegen · Recherche in Projektunterlagen durchführen«",
          anchors: {
            1: "Legt Dokumente nach vorgegebener Struktur ab.",
            2: "Pflegt Ablagestruktur eigenständig; hält Versionierung ein.",
            3: "Optimiert Ablagestruktur; stellt Auffindbarkeit aktiv sicher; schützt aktiv sensible Informationen.",
            4: "Entwirft Dokumentenmanagement-Konzepte für große Projekte.",
            5: "Definiert unternehmensweite Ablagestandards für Projekte.",
          },
        },
      ],
    },
    {
      name: "Kommunikation & Zusammenarbeit",
      skills: [
        {
          name: "Serviceorientierung & Verlässlichkeit",
          dep: "Durable",
          targetLevel: 3,
          keySkill: true,
          bewertungsmodell: "Dreyfus",
          description:
            "»Proaktive Unterstützungshaltung und konsequente Verlässlichkeit als Grundprinzip der Assistenzrolle: Aufgaben zuverlässig und termingerecht erfüllen, Bedarfe des Projekts antizipieren und ohne Erinnerung handeln. Typische Tätigkeiten: Zugesagte Aufgaben fristgerecht liefern · Bedarfe proaktiv erkennen und ansprechen · Qualität der eigenen Arbeit eigenständig sicherstellen«",
          anchors: {
            1: "Erledigt übertragene Aufgaben termingerecht; braucht klare Anweisung.",
            2: "Handelt zuverlässig ohne Erinnerung; meldet proaktiv, wenn Fristen gefährdet sind.",
            3: "Antizipiert Bedarfe im Projekt; liefert Arbeitsergebnisse proaktiv und in hoher Qualität.",
            4: "Entlastet die Projektleitung spürbar durch vorausschauendes Handeln; wird als verlässliche Konstante wahrgenommen.",
            5: "Gilt als unverzichtbare Stütze im Projektbüro; prägt Servicekultur und befähigt andere.",
          },
        },
        {
          name: "Interne und externe Kommunikation & Nachverfolgung",
          dep: "Durable",
          targetLevel: 3,
          keySkill: true,
          description:
            "»Professionelle Kommunikation mit externen Partnern und im Projektteam; aktive Unterstützung der Projektleitung bei der internen Koordination: Informationsfluss sicherstellen, Prioritäten kommunizieren, Aufgaben nachverfolgen. Typische Tätigkeiten: Offene Punkte und Aufgaben nachverfolgen · Zuständige eigenständig kontaktieren · Projektstatus intern kommunizieren«",
          anchors: {
            1: "Gibt Informationen weiter wenn gebeten; verfolgt Aufgaben auf Anweisung nach.",
            2: "Stellt Informationsfluss im Team sicher; verfolgt eigenständig nach.",
            3: "Formuliert empfängergerecht; koordiniert Abstimmungsbedarfe proaktiv; eskaliert rechtzeitig.",
            4: "Moderiert einfache Abstimmungsrunden; erkennt Priorisierungskonflikte.",
            5: "Gilt als Dreh- und Angelpunkt für interne Koordination; entwickelt Standards.",
          },
        },
        { ...RUMP_VERBAL, targetLevel: 3 },
      ],
    },
  ],
};

const anforderungsmanager: Role = {
  id: "anforderungsmanager",
  name: "Anforderungsmanager",
  description:
    "Schnittstelle zwischen Stakeholdern, Fachabteilungen und Entwicklungsteams — erhebt, dokumentiert, validiert und priorisiert Anforderungen, moderiert Workshops und löst Konflikte im Versicherungsumfeld.",
  categories: [
    {
      name: "Fachlich",
      skills: [
        {
          name: "Anforderungserhebung",
          dep: "Evolving",
          targetLevel: 4,
          keySkill: true,
          description:
            "»Systematische Erhebung und Strukturierung von Anforderungen für IT-/Softwaresysteme. Typische Tätigkeiten: Anforderungen von Stakeholdern aufnehmen · Geschäftsprozesse analysieren · Funktionale und nicht-funktionale Anforderungen dokumentieren · Rückfragen mit Fachexperten klären«",
          anchors: {
            1: "Nimmt Anforderungen auf, die Stakeholder direkt nennen, und dokumentiert sie.",
            2: "Stellt gezielte Rückfragen; erstellt strukturierte Anforderungsdokumente mit Unterstützung.",
            3: "Führt Interviews oder Workshops durch; dokumentiert Anforderungen in Form von User Stories oder anderen geeigneten Formaten.",
            4: "Analysiert widersprüchliche Anforderungen und identifiziert Ursachen.",
            5: "Entwickelt einen neuen Ansatz zur Anforderungsanalyse für ein spezifisches Projekt.",
          },
        },
        {
          name: "Anforderungsdokumentation",
          dep: "Evolving",
          targetLevel: 4,
          description:
            "»Erstellung und Pflege klarer, vollständiger und nachvollziehbarer Anforderungsdokumente. Typische Tätigkeiten: Lasten-/Pflichtenhefte verfassen und aktualisieren · Dokumentationsstandards einhalten · Versionierung und Nachverfolgbarkeit sicherstellen · Modellsprachen wie BPMN ergänzend einsetzen«",
          anchors: {
            1: "Benennt die Bestandteile eines Anforderungsdokuments.",
            2: "Beschreibt, warum Nachverfolgbarkeit in der Dokumentation wichtig ist.",
            3: "Nutzt ein RM-Tool zur strukturierten Dokumentation.",
            4: "Prüft ein Dokument auf Inkonsistenzen und Lücken.",
            5: "Erstellt eine neue Dokumentationsvorlage für das Projekt.",
          },
        },
        {
          name: "Anforderungsvalidierung",
          dep: "Evolving",
          targetLevel: 2,
          keySkill: true,
          description:
            "»Sicherstellung, dass Anforderungen eindeutig, realisierbar und testbar sind. Typische Tätigkeiten: Reviews und Walkthroughs durchführen · Anforderungen mit Stakeholdern abstimmen · Konflikte identifizieren und lösen«",
          anchors: {
            1: "Listet Validierungsmethoden auf.",
            2: "Erklärt, warum Validierung für den Projekterfolg entscheidend ist.",
            3: "Führt eine Validierungssitzung mit Stakeholdern durch.",
            4: "Untersucht Anforderungen auf Widersprüche und Unklarheiten.",
            5: "Entwickelt ein neues Validierungskonzept für komplexe Projekte.",
          },
        },
        {
          name: "Priorisieren von Anforderungen",
          dep: "Evolving",
          targetLevel: 2,
          keySkill: true,
          description:
            "»Bewertung und Priorisierung von Anforderungen nach Geschäftswert und Umsetzbarkeit. Typische Tätigkeiten: Priorisierungstechniken anwenden (z. B. MoSCoW, Kano) · Priorisierungsworkshops moderieren · Prioritäten dokumentieren und kommunizieren«",
          anchors: {
            1: "Nennt gängige Priorisierungsmethoden.",
            2: "Erklärt, warum Priorisierung für das Projektmanagement wichtig ist.",
            3: "Setzt eine Priorisierungsmethode im Projekt ein.",
            4: "Bewertet Auswirkungen von Priorisierungsentscheidungen.",
            5: "Entwickelt ein individuelles Priorisierungskonzept für das Projekt.",
          },
        },
        { ...RUMP_DIGITALE, targetLevel: 3 },
      ],
    },
    {
      name: "Technisch",
      skills: [
        {
          name: "Toolkompetenz Anforderungsmanagement (Jira, Confluence)",
          dep: "Durable",
          targetLevel: 3,
          keySkill: true,
          description:
            "»Sicherer Umgang mit Anforderungsmanagement- und Dokumentationstools inkl. projektspezifischem Customizing (Boards, Ticketprozesse, Confluence-Vorlagen). Nicht gemeint: technische Tool-Administration. Typische Tätigkeiten: RM-Tools konfigurieren und pflegen · Backlogs filtern, priorisieren und mit dem Team synchronisieren · Teammitglieder schulen«",
          anchors: {
            1: "Nutzt das Tool nach Anleitung für einfache Aufgaben.",
            2: "Erfasst Anforderungen selbstständig, legt eigenständig User Stories und Epics an und pflegt Confluence nach vorhandenen Strukturen.",
            3: "Nutzt Jira und Confluence sicher; strukturiert Backlogs, Filter und Dashboards eigenständig.",
            4: "Konfiguriert Boards, definiert Ticketprozesse und legt Confluence-Vorlagen projektspezifisch an.",
            5: "Definiert team- oder projektweite Standards, setzt neue Strukturen auf und ist Anlaufstelle für andere.",
          },
        },
        {
          name: "IT-Systemverständnis",
          dep: "Evolving",
          targetLevel: 3,
          description:
            "»Verständnis für IT-Architekturen, Schnittstellen und Systemabhängigkeiten, um deren Auswirkungen auf Anforderungen einzuschätzen. Nicht gemeint: eigenverantwortliche Architekturgestaltung oder Systementwicklung. Typische Tätigkeiten: Systemlandschaften analysieren · Technische Machbarkeit bewerten · Austausch mit Architekten und Entwicklern«",
          anchors: {
            1: "Erkennt grundlegende Systemkomponenten.",
            2: "Versteht einfache Zusammenhänge zwischen Systemen.",
            3: "Analysiert Schnittstellen und bewertet technische Risiken.",
            4: "Antizipiert Auswirkungen von Anforderungen auf Nachbarsysteme und bewertet technische Lösungsoptionen.",
            5: "Führt Diskussionen mit Architekten und Entwicklern auf Augenhöhe und bewertet Auswirkungen komplexer Systemänderungen auf Anforderungen.",
          },
        },
      ],
    },
    {
      name: "Methodisch",
      skills: [
        {
          name: "Requirements Engineering Methoden",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Methoden zur Erhebung, Modellierung, Validierung und Verwaltung von Anforderungen situationsgerecht einsetzen. Typische Tätigkeiten: Interviews, Workshops, Beobachtungen durchführen · Validierungs- und Verifikationsmethoden zur Bewertung nutzen (z. B. Kano, MoSCoW)«",
          anchors: {
            1: "Wendet Methoden nach Anleitung an.",
            2: "Nutzt Methoden eigenständig für Standardfälle.",
            3: "Wählt passende Methoden situationsgerecht aus.",
            4: "Kombiniert Methoden flexibel und passt sie an Projekterfordernisse an.",
            5: "Entwickelt neue Methoden und schult andere darin.",
          },
        },
        {
          name: "Konfliktlösungstechniken",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Methoden zur Identifikation und Lösung von Anforderungskonflikten. Typische Tätigkeiten: Konfliktgespräche moderieren · Verhandlungstechniken anwenden · Lösungen dokumentieren«",
          anchors: {
            1: "Erkennt Konflikte und informiert Vorgesetzte.",
            2: "Unterstützt bei der Konfliktlösung nach Anleitung.",
            3: "Moderiert Konfliktgespräche eigenständig.",
            4: "Löst komplexe Konflikte und erzielt nachhaltige Einigungen.",
            5: "Entwickelt neue Konfliktlösungsstrategien und coacht andere.",
          },
        },
        {
          name: "Versions- und Änderungsmanagement",
          dep: "Evolving",
          targetLevel: 3,
          description:
            "»Verwaltung von Anforderungsänderungen und Versionen über den gesamten Projektlebenszyklus. Typische Tätigkeiten: Änderungen nachverfolgen und dokumentieren · Änderungsanträge koordinieren · Stakeholder über Änderungen informieren«",
          anchors: {
            1: "Dokumentiert Änderungen nach Vorgabe.",
            2: "Erkennt Änderungsbedarf und meldet diesen weiter.",
            3: "Koordiniert Änderungsprozesse und informiert alle Beteiligten.",
            4: "Optimiert das Änderungsmanagement und minimiert Auswirkungen auf das Projekt.",
            5: "Entwickelt unternehmensweite Change-Management-Strategien.",
          },
        },
      ],
    },
    {
      name: "Kommunikation & Zusammenarbeit",
      skills: [
        {
          name: "Kommunikationsfähigkeit",
          dep: "Durable",
          targetLevel: 3,
          keySkill: true,
          description:
            "»Identifikation und Management aller relevanten Stakeholder und ihrer Interessen; zielgruppengerechte, klare Kommunikation auf allen Ebenen. Typische Tätigkeiten: Workshops moderieren · Anforderungen und Lösungen präsentieren · Feedbackschleifen gestalten«",
          anchors: {
            1: "Kommuniziert nach Vorgabe, meist schriftlich.",
            2: "Kommuniziert sicher in Standardsituationen.",
            3: "Passt Kommunikation an Zielgruppen an.",
            4: "Moderiert anspruchsvolle Diskussionen und vermittelt zwischen Parteien.",
            5: "Setzt Kommunikationsstandards, coacht andere und entwickelt eine neue Strategie zur Stakeholder-Einbindung.",
          },
        },
        {
          name: "Teamarbeit & Kollaboration",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Effektive Zusammenarbeit in interdisziplinären Teams. Typische Tätigkeiten: Abstimmung mit Entwicklern, Testern, Business-Analysten · Teamentscheidungen unterstützen · Konstruktive Zusammenarbeit fördern«",
          anchors: {
            1: "Arbeitet im Team nach klaren Anweisungen.",
            2: "Bringt sich aktiv in Teammeetings ein.",
            3: "Fördert die Zusammenarbeit und unterstützt Kollegen.",
            4: "Löst Teamkonflikte und fördert Synergien.",
            5: "Entwickelt die Teamkultur mit und coacht Teams.",
          },
        },
        { ...RUMP_VERBAL, targetLevel: 3 },
      ],
    },
  ],
};

const scrumMaster: Role = {
  id: "scrum-master",
  name: "Scrum Master",
  description:
    "Servant Leader für Scrum-Teams — schützt das Team, beseitigt Hindernisse, fördert Selbstorganisation und begleitet agile Reife im Versicherungsumfeld.",
  categories: [
    {
      name: "Fachlich",
      skills: [
        {
          name: "Scrum Guide & Professional Scrum",
          dep: "Durable",
          targetLevel: 4,
          keySkill: true,
          description:
            "»Tiefes Verständnis des Scrum Guides: drei Verantwortlichkeiten, fünf Events, drei Artefakte und zugehörige Commitments. Grundlage für alle anderen Scrum-Master-Kompetenzen. Typische Tätigkeiten: Scrum korrekt und vollständig erklären · Missverständnisse im Team aufklären · Guide als Referenz für Diskussionen nutzen«",
          anchors: {
            1: "Kennt grundlegende Scrum-Begriffe; hat Scrum Guide gelesen.",
            2: "Erklärt Events, Artefakte und Rollen korrekt; versteht Inspektion und Adaptation.",
            3: "Wendet Scrum-Konzepte situativ an; erkennt Abweichungen vom Guide und deren Auswirkungen.",
            4: "Begründet Scrum-Entscheidungen aus dem Guide; coacht Team und PO bei Missverständnissen.",
            5: "Gilt als Scrum-Experte; verantwortet Scrum-Qualität über mehrere Teams.",
          },
        },
        {
          name: "Versicherungs-IT-Domäne",
          dep: "Durable",
          targetLevel: 2,
          description:
            "»Grundverständnis für Versicherungsprozesse, -systeme und typische IT-Projekte im Kundenumfeld — Basis für fachliche Einordnung, Stakeholder-Kommunikation und kontextgerechte Entscheidungen. Typische Tätigkeiten: Aufgaben und Risiken im Versicherungskontext einordnen · Stakeholder-Sprache verstehen · Branchentypische Priorisierungen und Entscheidungsprozesse nachvollziehen«",
          anchors: {
            1: "Kennt grundlegende Versicherungsbegriffe und typische Prozesse; ordnet Projekte grob ein.",
            2: "Erklärt Zusammenhänge zwischen Versicherungsprozessen, IT-Systemen und Projektzielen; versteht Kundenperspektive.",
            3: "Setzt Domänenwissen aktiv ein: ordnet Risiken und Entscheidungen in den Fachkontext ein; kommuniziert auf Augenhöhe mit dem Fachbereich.",
            4: "Navigiert mit Fachkenntnis in komplexen Kundensituationen; antizipiert spartenspezifische Anforderungen.",
            5: "Gilt als Domänenexperte; befähigt andere in der Branchenorientierung.",
          },
        },
        {
          name: "Agilität in regulierten Branchen",
          dep: "Evolving",
          targetLevel: 3,
          trend: "steigend",
          description:
            "»Verständnis der spezifischen Herausforderungen agiler Arbeitsweisen im regulierten Versicherungsumfeld: Auditierbarkeit, Compliance, Governance, Genehmigungsprozesse. Typische Tätigkeiten: Compliance-Anforderungen mit agilen Werten verbinden · Governance-Prozesse agil gestalten · Regulatorische Einschränkungen als Impediments einordnen«",
          anchors: {
            1: "Weiß, dass Regulatorik und Agilität in Spannung stehen; kann z. B. erklären, warum ein Change-Freeze Sprints beeinflusst.",
            2: "Erklärt gängige Spannungsfelder (z. B. Auditpflicht vs. Liefergeschwindigkeit) und gibt erste Lösungsansätze wie leichtgewichtige Dokumentation im Sprint.",
            3: "Gestaltet Prozesse, die Compliance erfüllen und agile Werte wahren — z. B. verankert DORA-konforme Testdokumentation in der Definition of Done oder gestaltet Sprint Reviews als formale Abnahme-Events für regulatorische Meilensteine.",
            4: "Entwickelt Governance-Modelle für agile Teams in regulierten Umgebungen — z. B. entwirft einen Change-Advisory-Board-Prozess, der innerhalb von Sprint-Zyklen funktioniert.",
            5: "Gilt als Experte für regulierungskonforme Agilität; entwickelt unternehmensweite Compliance-Richtlinien für agile Liefermodelle und schult andere Scrum Master.",
          },
        },
        { ...RUMP_DIGITALE, targetLevel: 3 },
      ],
    },
    {
      name: "Technisch",
      skills: [
        {
          name: "Jira & agile Board-Konfiguration",
          dep: "Evolving",
          targetLevel: 3,
          description:
            "»Konfiguration und Pflege agiler Boards in Jira als Transparenz- und Steuerungswerkzeug für das Scrum-Team. Typische Tätigkeiten: Sprint-Boards und Backlogs konfigurieren · Workflows und Statusübergänge definieren · Velocity und Burndown in Jira-Reports nutzen«",
          anchors: {
            1: "Bedient Jira als Nutzer; erstellt Tickets.",
            2: "Pflegt Boards und Backlogs eigenständig; konfiguriert einfache Workflows.",
            3: "Konfiguriert Sprint-Boards, Reports und Dashboards für das Team.",
            4: "Passt Jira projektspezifisch an; automatisiert wiederkehrende Schritte.",
            5: "Definiert Jira-Standards für mehrere Teams; berät andere.",
          },
        },
        {
          name: "KI-Tools im agilen Kontext",
          dep: "Perishable",
          targetLevel: 2,
          trend: "stark steigend",
          description:
            "»Einsatz von KI-Assistenten zur Unterstützung agiler Praktiken: Retrospektiven-Auswertungen, Sprint-Zusammenfassungen, Impediment-Tracking. Typische Tätigkeiten: KI für Retro-Zusammenfassungen nutzen · Story-Formulierungen mit KI unterstützen · KI-generierte Inhalte kritisch prüfen«",
          anchors: {
            1: "Kennt Einsatzmöglichkeiten von KI im agilen Umfeld.",
            2: "Nutzt KI-Tools für Standardaufgaben (Zusammenfassungen, Vorlagen).",
            3: "Setzt KI gezielt für Metriken und Retro-Analyse ein.",
            4: "Etabliert KI-gestützte agile Praktiken im Team.",
            5: "Definiert KI-Nutzungsstandards für agile Teams.",
          },
        },
      ],
    },
    {
      name: "Methodisch",
      skills: [
        {
          name: "Agile Metriken (z. B. Velocity, Burndown, CFD)",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Erhebung, Interpretation und Nutzung agiler Metriken zur Teamsteuerung: Sprint Velocity, Burndown/Burnup-Charts, Cumulative Flow Diagram, Cycle Time. Typische Tätigkeiten: Metriken im Sprint Review visualisieren · Engpässe aus CFD ablesen · Vorhersagen auf Basis von Velocity erstellen«",
          anchors: {
            1: "Kennt gängige Metriken dem Namen nach.",
            2: "Erstellt und liest Burndown-Charts und Velocity-Diagramme.",
            3: "Interpretiert Metriken im Kontext; leitet Handlungsempfehlungen ab.",
            4: "Kombiniert mehrere Metriken zur Diagnose von Engpässen.",
            5: "Etabliert Metriken-Frameworks für mehrere Teams; coacht andere.",
          },
        },
        {
          name: "Scrum Events durchführen",
          dep: "Durable",
          targetLevel: 4,
          keySkill: true,
          description:
            "»Professionelle Durchführung aller fünf Scrum Events: Sprint Planning, Daily Scrum, Sprint Review, Sprint Retrospektive, Backlog Refinement. Timeboxing, Zielorientierung und Teameinbindung sicherstellen. Typische Tätigkeiten: Events strukturiert vorbereiten und leiten · Sprint-Ziel im Planning schützen · Review-Format zielgruppengerecht gestalten«",
          anchors: {
            1: "Moderiert einfache Events nach Vorlage.",
            2: "Führt alle Events eigenständig durch; hält Timeboxen ein.",
            3: "Gestaltet Events variabel und situativ; steigert Engagement und Ergebnisqualität.",
            4: "Optimiert Event-Formate kontinuierlich.",
            5: "Gilt als Scrum-Experte; entwickelt Event-Formate für besondere Situationen.",
          },
        },
        {
          name: "Impediment Management",
          dep: "Durable",
          targetLevel: 4,
          keySkill: true,
          description:
            "»Systematische Identifikation, Priorisierung und Beseitigung von Hindernissen, die das Team an der Lieferung hindern — auf Team-, Organisations- und Kundenebene. Typische Tätigkeiten: Impediment-Backlog pflegen · Hindernisse auf richtiger Ebene eskalieren · Systemische Ursachen erkennen und adressieren«",
          anchors: {
            1: "Erfasst genannte Impediments; leitet auf Anweisung weiter.",
            2: "Pflegt Impediment-Backlog; löst einfache Hindernisse eigenständig.",
            3: "Priorisiert und eskaliert Impediments auf der richtigen Ebene; berichtet transparent.",
            4: "Erkennt systemische Impedimentmuster; adressiert diese strukturell.",
            5: "Eliminiert Impediment-Ursachen auf Organisationsebene; coacht andere Scrum Master.",
          },
        },
        {
          name: "Skalierungsframeworks (z. B. SAFe / LeSS)",
          dep: "Evolving",
          targetLevel: 2,
          description:
            "»Grundverständnis agiler Skalierungsframeworks für die Arbeit in Mehrtteamumgebungen — besonders relevant bei SAFe-Einführungen beim Kunden. Typische Tätigkeiten: Eigene Rolle im SAFe-Kontext einordnen · An PI-Planning teilnehmen · Abhängigkeiten über Teams hinweg koordinieren«",
          anchors: {
            1: "Kennt SAFe und LeSS dem Namen nach.",
            2: "Erklärt Kernkonzepte (ART, PI Planning, RTE); nimmt eigenständig an Events teil.",
            3: "Arbeitet effektiv in SAFe-Umgebungen; koordiniert Team-Abhängigkeiten.",
            4: "Unterstützt SAFe-Einführung beim Kunden; coacht andere Teams.",
            5: "Gilt als Skalierungsexperte; berät Kunden bei Framework-Wahl.",
          },
        },
        {
          name: "Estimation-Techniken",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Etablierung von Schätzgrößen im agilen Team — Story Points, T-Shirt-Sizing. Nicht gemeint: inhaltliche Fachschätzung. Typische Tätigkeiten: Planning Poker durchführen · Team für relative Schätzung sensibilisieren · Konsens bei großen Differenzen herbeiführen«",
          anchors: {
            1: "Kennt Planning Poker; erklärt Story Points.",
            2: "Führt Estimation-Sessions nach Vorlage durch.",
            3: "Wählt Methode situativ; erklärt Relativschätzung verständlich.",
            4: "Verbessert Schätzqualität durch Coaching; erkennt und adressiert Biases.",
            5: "Etabliert Schätzstandards im Team; coacht POs bei Story-Vorbereitung.",
          },
        },
        {
          name: "Agile Transformation begleiten",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Aktive Unterstützung beim Aufbau agiler Arbeitsweisen in neuen Teams oder Organisationseinheiten. Typische Tätigkeiten: Team beim Scrum-Einstieg begleiten · Agile Mindset-Workshops durchführen · Impediments in der Transformation systematisch eskalieren«",
          anchors: {
            1: "Erklärt agile Grundprinzipien; unterstützt auf Aufforderung.",
            2: "Begleitet Teams beim Scrum-Einstieg; gibt regelmäßig Coaching-Impulse.",
            3: "Gestaltet Transformationspfade eigenständig; fördert agile Kultur.",
            4: "Begleitet komplexe Transformationen; coacht Führungskräfte.",
            5: "Verantwortet agile Transformation auf Kundenebene; entwickelt Strategien.",
          },
        },
      ],
    },
    {
      name: "Kommunikation & Zusammenarbeit",
      skills: [
        {
          name: "Stakeholder-Management (PO & Management)",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Aktive Kommunikation mit Product Owner, Management und Kunden, um das Team zu schützen und Zusammenarbeit zu fördern. Typische Tätigkeiten: Team gegenüber Management vertreten · Erwartungen von PO und Stakeholdern managen · Transparenz über Teamfortschritt herstellen«",
          anchors: {
            1: "Kommuniziert auf Anfrage; leitet Informationen weiter.",
            2: "Kommuniziert proaktiv mit PO und direktem Management.",
            3: "Steuert Stakeholder-Erwartungen aktiv; schützt das Team vor übermäßigem Einfluss.",
            4: "Navigiert in politisch komplexen Situationen; coacht Führungskräfte.",
            5: "Prägt Stakeholder-Kultur; etabliert Standards für Team-Schutz.",
          },
        },
        { ...RUMP_VERBAL, targetLevel: 3 },
      ],
    },
    {
      name: "Führung & Coaching",
      skills: [
        {
          name: "Empathie & aktives Zuhören",
          dep: "Durable",
          targetLevel: 3,
          bewertungsmodell: "Dreyfus",
          description:
            "»Fähigkeit, Teammitglieder und Stakeholder wirklich zu verstehen — nicht nur zu hören, was gesagt wird, sondern auch was dahintersteht. Grundlage für effektives Coaching, Impediment-Erkennung und psychologische Sicherheit. Typische Tätigkeiten: Aktiv zuhören ohne vorschnelles Problemlösen · Unausgesprochene Bedenken erkennen und ansprechen · Emotionale Zustände im Team wahrnehmen und berücksichtigen«",
          anchors: {
            1: "Hört zu; reagiert auf Aussagen ohne zu unterbrechen.",
            2: "Stellt Verständnisfragen; fasst Gesagtes zusammen; erkennt offensichtliche emotionale Signale.",
            3: "Hört aktiv zu; erkennt auch unausgesprochene Bedenken; schafft Raum für ehrlichen Dialog.",
            4: "Liest Teamdynamiken intuitiv; antizipiert Widerstände und Bedürfnisse; coacht aus Empathie heraus.",
            5: "Gilt als empathische Führungspersönlichkeit; prägt psychologische Sicherheit im Team nachhaltig.",
          },
        },
        {
          name: "Servant Leadership",
          dep: "Durable",
          targetLevel: 4,
          keySkill: true,
          description:
            "»Den Scrum-Team-Mitgliedern und dem PO dienen: Hindernisse beseitigen, das Team schützen, Entscheidungen ans Team zurückgeben, Vertrauen aufbauen. Typische Tätigkeiten: Team vor externem Druck schützen · Entscheidungsraum öffnen statt Lösungen vorgeben · Vertrauen durch Verlässlichkeit aufbauen«",
          anchors: {
            1: "Kennt den Begriff Servant Leadership; versucht ihn anzuwenden.",
            2: "Handelt regelmäßig als dienende Führungskraft; stellt Teambedürfnisse voran.",
            3: "Lebt Servant Leadership konsistent; baut Vertrauen und psychologische Sicherheit auf.",
            4: "Begründet eigene Entscheidungen aus Servant-Leadership-Perspektive; coacht andere.",
            5: "Gilt als Vorbild; prägt Führungskultur in der Organisation.",
          },
        },
        {
          name: "Konfliktmoderation im Team",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Erkennen und professionelles Ansprechen von Konflikten und Spannungen im Team — konstruktiv, neutral und lösungsorientiert. Typische Tätigkeiten: Konflikte frühzeitig erkennen · Gespräche zwischen Konfliktparteien moderieren · Eskalation klar erkennen und entsprechend handeln«",
          anchors: {
            1: "Erkennt Konflikte; eskaliert auf Hinweis.",
            2: "Spricht Konflikte eigenständig an; moderiert einfache Spannungen.",
            3: "Moderiert Konflikte neutral und lösungsorientiert; schützt das Team.",
            4: "Begleitet eskalierte Konflikte; zieht externe Ressourcen bei Bedarf hinzu.",
            5: "Präventiv: fördert psychologische Sicherheit; entwickelt Team-Agreements.",
          },
        },
      ],
    },
  ],
};

const projektleitung: Role = {
  id: "projektmanager",
  name: "Projektmanager",
  description:
    "Ganzheitliche Verantwortung für IT-Projekte im Finanzdienstleistungsumfeld — souveräner Einsatz klassischer und agiler Methoden je nach Projektkontext, kombiniert mit Planung, Steuerung, Budgetverantwortung, Teamführung und Stakeholder-Management von der Initiierung bis zum Abschluss.",
  categories: [
    {
      name: "Fachlich",
      skills: [
        {
          name: "Projektmanagement-Standards (klassisch & agil)",
          dep: "Durable",
          targetLevel: 4,
          keySkill: true,
          description:
            "»Fundiertes Wissen über anerkannte PM-Standards als methodische Grundlage: klassische Frameworks (z. B. PMI/PMBOK, PRINCE2, IPMA) sowie agile Ansätze (z. B. Scrum, Kanban). Nicht gemeint: schematische Anwendung aller Prozesse eines Frameworks. Typische Tätigkeiten: Projekte nach geeignetem Standard initiieren und strukturieren · Methodik situativ am Kundenbedarf ausrichten und begründen können · Zertifizierungsnachweis oder echte Praxiserfahrung als Qualitätssignal nutzen«",
          anchors: {
            1: "Kennt mindestens einen klassischen und einen agilen PM-Standard; hat Grundbegriffe verinnerlicht.",
            2: "Erklärt Kernkonzepte beider Welten (Phasen, Prozessgruppen, Sprints, Backlogs); leitet daraus Projektvorgehen ab.",
            3: "Wendet klassische und agile Standards situativ an; wählt den Ansatz anhand von Projektkomplexität und Kundenkontext.",
            4: "Begründet Methodik-Entscheidungen gegenüber Kunden; kombiniert Standards zu einem passgenauen Vorgehen.",
            5: "Gilt als PM-Experte; entwickelt unternehmenseigene hybride Projektmethodik weiter.",
          },
        },
        {
          name: "Versicherungs-IT-Domäne",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Grundverständnis für Versicherungsprozesse, -systeme und typische IT-Projekte im jeweiligen fachlichen Einsatzbereich – Basis für fachliche Einordnung, Stakeholder-Kommunikation und kontextgerechte Entscheidungen. Die Bewertung erfolgt bezogen auf den fachlichen Schwerpunkt bzw. Haupteinsatzbereich des Mitarbeitenden. Eine hohe Ausprägung setzt fundierte Domänenkenntnisse im eigenen Projekt- und Fachkontext voraus, nicht über die gesamte Versicherungs-IT. Typische Tätigkeiten: Aufgaben, Risiken und Anforderungen im eigenen Versicherungskontext einordnen · Fachliche Sprache und Erwartungen der relevanten Stakeholder verstehen und adressieren · Branchentypische Prioritäten und Entscheidungsprozesse im eigenen Einsatzbereich nachvollziehen · Fachliche und technische Zusammenhänge im jeweiligen Projektkontext berücksichtigen. Bewertungsleitlinie: Die Einstufung erfolgt immer bezogen auf den fachlichen Schwerpunkt des Mitarbeitenden. Eine Person muss nicht in allen Bereichen der Versicherungs-IT (z. B. Vertrieb, Bestand, Schaden, IAM/Berechtigungen, DORA oder Systemmodernisierung) gleichermaßen Expertise besitzen. Entscheidend ist die Fähigkeit, im jeweiligen Einsatzkontext fachlich kompetent zu agieren und Mehrwert zu schaffen.«",
          anchors: {
            1: "Kennt grundlegende Versicherungsbegriffe sowie die wesentlichen Prozesse und Systeme des eigenen Einsatzbereichs; kann Projekte grob fachlich einordnen.",
            2: "Erklärt Zusammenhänge zwischen Versicherungsprozessen, IT-Systemen und Projektzielen im eigenen Fachkontext; versteht die Perspektive der relevanten Fachbereiche und Stakeholder.",
            3: "Nutzt Domänenwissen sicher im eigenen fachlichen Schwerpunkt, ordnet Risiken und Entscheidungen fachlich ein und kommuniziert auf Augenhöhe mit dem Fachbereich.",
            4: "Bewertet komplexe fachliche Zusammenhänge und antizipiert Anforderungen im eigenen Domänenbereich; berät Kunden und Projektbeteiligte bei fachlichen Fragestellungen.",
            5: "Gilt im eigenen fachlichen Schwerpunkt als Domänenexperte, gestaltet Lösungen aktiv mit und befähigt andere im Aufbau von Domänen- und Branchenwissen.",
          },
        },
        {
          name: "Projektkontext & Komplexität im VU-Umfeld einschätzen",
          dep: "Durable",
          targetLevel: 3,
          bewertungsmodell: "Dreyfus",
          description:
            "»Fähigkeit, spezifische Projektkontexte bei Versicherungskunden schnell zu lesen und den Planungsansatz entsprechend anzupassen: Welche Stakeholder-Dynamiken, regulatorischen Constraints und technischen Risiken prägen dieses Vorhaben? Typische Kontexte: Kernsystem-Migrationen, Legacy-Ablösungen, regulatorisch getriebene Vorhaben (z. B. DORA, VAIT), Digitalisierungsprojekte und Plattformablösungen. Typische Tätigkeiten: Scope und Rahmenbedingungen eines neuen Projekts erfassen · Planungsansatz an Kontext und Komplexität ausrichten · Entscheidungsprozesse beim Kunden einschätzen und navigieren«",
          anchors: {
            1: "Orientiert sich in bekannten VU-IT-Projektkontexten mit Unterstützung; benötigt Einarbeitung in Kundenspezifika.",
            2: "Erkennt Grundmuster typischer Projektkontexte; schätzt offensichtliche Risiken und Constraints mit Anleitung ein.",
            3: "Liest Projektkontexte selbstständig; leitet Planungsansatz und Risikoschwerpunkte aus Scope und Stakeholder-Landschaft ab.",
            4: "Erkennt auch in unbekannten oder hybriden Kontexten schnell die wesentlichen Steuerungsanforderungen; antizipiert Komplexitätstreiber.",
            5: "Befähigt andere PMs, Projektkontexte im VU-Umfeld einzuschätzen; entwickelt Orientierungsrahmen für neue Vorhaben.",
          },
        },
        {
          name: "Projektsteuerung in regulierten Umfeldern",
          dep: "Evolving",
          targetLevel: 3,
          trend: "stark steigend",
          bewertungsmodell: "Dreyfus",
          description:
            "»PM in Vorhaben mit hohem externem Normdruck: harte regulatorische Meilensteine, auditfeste Prozessführung und enge Abstimmung zwischen technischen Teams und Compliance-Experten. Typische Tätigkeiten: Externe Fristen als nicht verhandelbare Constraints in Planung integrieren · Auditfähige Projektdokumentation sicherstellen · Eskalationswege zwischen Fachbereich, IT und Regulatorik koordinieren«",
          anchors: {
            1: "Kennt die Besonderheiten regulierter Projektumfelder; hält Dokumentationspflichten ein.",
            2: "Plant regulatorische Meilensteine als harte Constraints; koordiniert Abstimmungen mit Compliance.",
            3: "Steuert Projekte in regulierten Umfeldern selbstständig; sichert auditfähige Prozessführung.",
            4: "Verantwortet Compliance-Nachweis gegenüber Auditoren; gestaltet robuste Governance für das Gesamtprojekt.",
            5: "Entwickelt Projektstandards für regulierte Großvorhaben; befähigt andere PMs im Umgang mit Normdruck.",
          },
        },
        {
          name: "Digitale Anwendungskompetenz",
          dep: "Evolving",
          targetLevel: 3,
          keySkill: true,
          description:
            "»Digitale Systeme, KI-Werkzeuge und moderne Arbeitsplattformen verstehen, kritisch bewerten und im Projektkontext zielgerichtet einsetzen. Dazu gehören KI-Modelle und -Agenten, Kollaborationsplattformen, datenbasierte Auswertungen sowie digitale Arbeitsprozesse. Ziel ist nicht die Beherrschung einzelner Tools, sondern die Fähigkeit, deren Mehrwert, Grenzen und Risiken für den jeweiligen Anwendungsfall zu beurteilen und den verantwortungsvollen Einsatz zu begleiten. Typische Tätigkeiten: Digitale Werkzeuge und KI-Lösungen hinsichtlich Nutzen, Grenzen und Wirtschaftlichkeit bewerten · Geeignete Werkzeuge und KI-Modelle kennen und die Auswahl für unterschiedliche Anwendungsfälle und deren Einsatz begleiten · KI-Outputs kritisch auf Qualität, Plausibilität, Bias und Datenschutz prüfen · Optimierungspotenziale von Prozessen durch KI und Automatisierung identifizieren · Datenschutz-, Informationssicherheits- und Compliance-Vorgaben beim Einsatz digitaler Werkzeuge berücksichtigen · Stakeholder zu Chancen, Risiken, Kosten und Grenzen digitaler Lösungen beraten«",
          anchors: {
            1: "Kennt grundlegende Begriffe digitaler Systeme, KI, LLMs und moderner Arbeitsplattformen; versteht typische Einsatzmöglichkeiten sowie grundlegende Datenschutz- und Sicherheitsanforderungen.",
            2: "Nutzt digitale Werkzeuge und KI-Assistenten sicher im Arbeitsalltag; versteht deren Stärken, Grenzen und typische Einsatzszenarien und berücksichtigt Datenschutz- und Compliance-Vorgaben.",
            3: "Bewertet digitale Werkzeuge und KI-Lösungen im Projektkontext hinsichtlich Eignung, Nutzen und Risiken. Prüft KI-Ergebnisse kritisch, erkennt ungeeignete Anwendungsfälle und unterstützt Teams bei der Auswahl geeigneter Werkzeuge und Modelle.",
            4: "Analysiert Geschäftsprozesse hinsichtlich ihres Potenzials für KI und Automatisierung. Wägt Nutzen, Kosten, Risiken sowie Datenschutz- und Compliance-Anforderungen ab und berät Stakeholder fundiert zu geeigneten Lösungsansätzen und Werkzeugen.",
            5: "Gestaltet den verantwortungsvollen Einsatz digitaler Systeme und KI im Projekt- und Unternehmenskontext aktiv mit. Entwickelt Leitlinien und Best Practices, etabliert Entscheidungskriterien für Werkzeug- und Modellauswahl und befähigt Teams und Stakeholder zum effektiven und wirtschaftlichen Einsatz digitaler Lösungen.",
          },
        },
      ],
    },
    {
      name: "Technisch",
      skills: [
        {
          name: "Projektmanagement-Tools (z. B. Confluence, Jira, MS Office Suite, MS-Project, SeaTable oder vergleichbar Tools)",
          dep: "Evolving",
          targetLevel: 3,
          description:
            "»Sicherer Umgang mit PM-Tools zur Planung, Steuerung und Berichterstattung. Typische Tätigkeiten: Projektpläne erstellen und aktualisieren · Ressourcenzuteilungen pflegen · Berichte und Dashboards für Steuerungskreise aufbereiten«",
          anchors: {
            1: "Bedient gängige Tools grundlegend; erstellt einfache Pläne.",
            2: "Erstellt eigenständig strukturierte Projektpläne; pflegt Fortschritt.",
            3: "Nutzt Tools für Ressourcen-, Risiko- und Kostensteuerung; erstellt Berichte.",
            4: "Konfiguriert Tools projektspezifisch; automatisiert Reportings.",
            5: "Definiert Tool-Standards für die PM-Praxis; schult andere.",
          },
        },
        {
          name: "KI-gestützte Projektsteuerung",
          dep: "Perishable",
          targetLevel: 3,
          trend: "stark steigend",
          description:
            "»PMs nutzen KI-Werkzeuge, um Routineaufgaben im Projektalltag zu beschleunigen und Steuerungsinformationen schneller aufzubereiten. Typische Tätigkeiten: Meeting-Protokolle und Action Items KI-gestützt erstellen · Statusbericht-Drafts generieren und redaktionell finalisieren · Abweichungsanalysen und Forecasts KI-gestützt vorbereiten · KI-Outputs kritisch prüfen und verantwortungsvoll einsetzen«",
          anchors: {
            1: "Kennt grundlegende KI-Tools (z. B. ChatGPT); hat erste Berührungspunkte im PM-Alltag.",
            2: "Nutzt KI für PM-Routinen: Protokollerstellung, Statusbericht-Drafts, einfache Zusammenfassungen.",
            3: "Setzt KI strukturiert für Abweichungsanalysen, Forecast-Vorbereitung und Steuerungsunterlagen ein; prüft Outputs kritisch.",
            4: "Etabliert KI-gestützte PM-Praktiken im Team; entwickelt Prompts und Workflows für wiederkehrende PM-Aufgaben.",
            5: "Definiert KI-Standards für die PM-Praxis; bewertet neue Tools und integriert sie in bestehende PM-Prozesse.",
          },
        },
      ],
    },
    {
      name: "Methodisch",
      skills: [
        {
          name: "Projektinitialisierung & Auftragsklärung",
          dep: "Durable",
          targetLevel: 5,
          bewertungsmodell: "Dreyfus",
          description:
            "»Strukturierte Initialisierung neuer Projekte: Auftragsklärung mit dem Kunden, Definition von Scope, Zielen und Erfolgskriterien sowie Vorbereitung und Durchführung des Kick-offs. Typische Tätigkeiten: Projektauftrag/-charter mit Kunden erarbeiten und abstimmen · Scope, Ziele und Nicht-Ziele klar definieren · Kick-off-Veranstaltung vorbereiten und durchführen und dokumentieren · Rahmenbedingungen und Constraints zu Projektbeginn erfassen«",
          anchors: {
            1: "Bereitet Kick-off nach Vorlage vor; hält Standardinhalte eines Projektauftrags ein.",
            2: "Erarbeitet eigenständig einen Projektauftrag; führt strukturierte Auftragsklärung mit Unterstützung durch.",
            3: "Klärt Scope, Ziele und Rahmenbedingungen selbstständig mit dem Kunden; moderiert Kick-off souverän.",
            4: "Gestaltet komplexe Initialisierungsprozesse mit mehreren Stakeholdern; erkennt und adressiert Zielkonflikte früh.",
            5: "Entwickelt Initialisierungsstandards; befähigt andere PMs in der Auftragsklärung.",
          },
        },
        {
          name: "Reporting & Forecasting",
          dep: "Durable",
          targetLevel: 4,
          description:
            "»Reporting & Forecasting ist die primäre Steuerungs- und Kommunikationsschnittstelle zum Kunden — nicht PM-Hygiene, sondern explizite Kundenleistung. Typische Tätigkeiten: Aussagekräftige Statusberichte und Forecasts erstellen · Budget-Abweichungen erklären und Handlungsoptionen ableiten · Earned-Value-Analysen für Steuerungskreise aufbereiten«",
          anchors: {
            1: "Erstellt Berichte nach Vorlage; hält Berichtsrhythmus ein.",
            2: "Erstellt eigenständig Statusberichte; aktualisiert Forecasts und Budgetstände.",
            3: "Analysiert Abweichungen, leitet Handlungsempfehlungen ab und kommuniziert diese adressatengerecht.",
            4: "Erstellt komplexe Management-Reports mit strategischen Aussagen; gestaltet Steuerungsformate für Kunden.",
            5: "Entwickelt Reporting-Frameworks und -Standards; berät Kunden bei Projektsteuerungsstrukturen.",
          },
        },
        {
          name: "Projektplanung & Meilensteinsteuerung",
          dep: "Durable",
          targetLevel: 3,
          keySkill: true,
          description:
            "»Strukturierte Planung von Projektphasen, Arbeitspaketen, Meilensteinen und Abhängigkeiten — realistisch, kommunizierbar und steuerbar. Typische Tätigkeiten: Projektstrukturplan erstellen · Meilensteine mit Stakeholdern abstimmen · Pläne regelmäßig aktualisieren und Abweichungen erklären«",
          anchors: {
            1: "Erstellt einfache Projektpläne; hält Standardphasen ein.",
            2: "Plant eigenständig mit Arbeitspaketen und Meilensteinen; erkennt einfache Abhängigkeiten.",
            3: "Plant detailliert mit kritischem Pfad; passt Pläne bei Abweichungen schnell an.",
            4: "Plant komplexe Projekte mit Ressourcen- und Abhängigkeitsmanagement.",
            5: "Entwickelt Planungsstandards; coacht PMs bei schwierigen Plänen.",
          },
        },
        {
          name: "Ressourcen- & Budgetplanung",
          dep: "Durable",
          targetLevel: 3,
          keySkill: true,
          description:
            "»Planung, Allokation und Überwachung von Personal, Sachkosten und externen Leistungen im Projektverlauf. Budgetkontrolle und Forecasting. Typische Tätigkeiten: Ressourcenbedarf pro Phase abschätzen · Budget aufstellen und verfolgen · Abweichungen gegenüber Steuerungskreis begründen«",
          anchors: {
            1: "Verfolgt Budget und Ressourcen nach Vorlage.",
            2: "Erstellt eigenständig einfache Ressourcenpläne und Budgets.",
            3: "Steuert Ressourcen und Budget aktiv; erkennt und meldet Abweichungen.",
            4: "Optimiert Ressourceneinsatz über Projektphasen; führt komplexe Budgetverhandlungen.",
            5: "Entwickelt Planungsmodelle; gilt als Experte für Großbudget-Projekte.",
          },
        },
        {
          name: "Risikomanagement",
          dep: "Durable",
          targetLevel: 3,
          keySkill: true,
          description:
            "»Systematische Identifikation, Bewertung, Steuerung und Nachverfolgung von Projektrisiken und Chancen. Typische Tätigkeiten: Risikoregister führen und regelmäßig aktualisieren · Maßnahmen für Hoch-Risiken definieren · Risikostatus im Steuerungskreis berichten«",
          anchors: {
            1: "Erfasst genannte Risiken; führt einfaches Risikoregister.",
            2: "Identifiziert und bewertet Risiken eigenständig; schlägt Maßnahmen vor.",
            3: "Steuert Risiken aktiv; passt Maßnahmen bei Veränderungen an.",
            4: "Entwickelt Risikostrategien für komplexe Projekte; moderiert Risikoworkshops.",
            5: "Etabliert Risikomanagement-Standards; gilt als Experte.",
          },
        },
        {
          name: "Agile & Hybride Methoden",
          dep: "Evolving",
          targetLevel: 3,
          description:
            "»Flexible Kombination klassischer und agiler Projektmethoden abhängig von Projektsituation, Kundenreife und Regulatorik. Typische Tätigkeiten: Vorgehensmodell zu Projektbeginn mit Kunden festlegen · Agile und klassische Elemente situativ kombinieren · Steuerungsgremien und Governance für hybride Projekte aufsetzen · Scrum-, Kanban- und Wasserfall-Elemente sinnvoll verknüpfen«",
          anchors: {
            1: "Kennt beide Welten; wendet sie noch getrennt an.",
            2: "Kombiniert Methoden auf Anweisung; erklärt Unterschiede und Anwendungsfälle.",
            3: "Wählt Methoden situativ; gestaltet hybride Projekte eigenständig; richtet Governance danach aus.",
            4: "Navigiert in komplexen hybriden Setups; coacht Teams in der Methodenanwendung.",
            5: "Entwickelt hybride PM-Frameworks für die Organisation; gilt als Methodenexperte.",
          },
        },
        {
          name: "Agile Release-Planung & Sprint-Koordination",
          dep: "Evolving",
          targetLevel: 3,
          trend: "steigend",
          description:
            "»Planung und Steuerung von Releases über mehrere agile Teams hinweg aus Projektmanagement-Perspektive. Umfasst die Erstellung belastbarer Lieferprognosen auf Basis empirischer Daten, die Abstimmung von Prioritäten, die Koordination teamübergreifender Abhängigkeiten sowie die Integration agiler Lieferplanung in die Projektsteuerung. Der Skill ist unabhängig vom eingesetzten Skalierungsframework (z. B. SAFe, LeSS, Nexus oder organisationsspezifische Modelle). Abgrenzung zum Scrum Master: Fokus liegt auf übergreifender Release- und Lieferplanung sowie Stakeholder- und Projektkoordination, nicht auf der Moderation agiler Events. Typische Tätigkeiten: Release- und Lieferpläne auf Basis von Velocity, Kapazitäten und Backlog-Entwicklung erstellen · Features, Epics und Meilensteine mit den Sprint- und Release-Zielen abstimmen · Teamübergreifende Abhängigkeiten identifizieren und koordinieren · Liefertermine und Forecasts transparent gegenüber Stakeholdern kommunizieren · Inhalte und Abhängigkeiten für agile Programm- und Release-Planungen (z. B. PI Planning oder vergleichbare Planungsformate) vorbereiten und abstimmen · Agile Lieferplanung mit klassischer Projektsteuerung, Budget- und Terminplanung verbinden«",
          anchors: {
            1: "Versteht agile Planungszyklen, Sprint- und Release-Konzepte sowie die Bedeutung von Velocity und anderen Planungskennzahlen.",
            2: "Erstellt einfache Release- und Lieferpläne auf Basis vorhandener Planungsdaten und stimmt diese mit den beteiligten Teams ab.",
            3: "Erstellt belastbare Forecasts, koordiniert Releases über mehrere Teams hinweg, steuert Abhängigkeiten und kommuniziert Lieferprognosen gegenüber Stakeholdern.",
            4: "Integriert agile Release- und Lieferplanung in die Gesamtprojektsteuerung, unterstützt teamübergreifende Programmplanungen (z. B. PI Planning) und steuert Risiken sowie Auswirkungen auf Termine und Meilensteine.",
            5: "Gestaltet Release- und Lieferplanungsprozesse in komplexen skalierten agilen Organisationen, entwickelt Vorgehensweisen weiter und berät Projekte und Stakeholder bei der Optimierung der übergreifenden Lieferplanung.",
          },
        },
        {
          name: "Change Request Management",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Strukturierter Umgang mit Scope-Änderungen: Bewertung, Verhandlung, Dokumentation und Integration in Projektplan und -budget. Typische Tätigkeiten: Change Requests bewerten und priorisieren · Aufwand- und Kostenfolgen schätzen · Änderungen mit Kunden und intern verhandeln«",
          anchors: {
            1: "Dokumentiert Änderungsbedarfe; leitet an Projektleitung weiter.",
            2: "Bewertet CRs eigenständig; schätzt Aufwand und Kosten.",
            3: "Verhandelt CRs mit Kunden; integriert Änderungen in Pläne.",
            4: "Steuert komplexes CR-Portfolio; verhindert Scope Creep.",
            5: "Entwickelt CR-Prozessstandards; coacht andere PMs.",
          },
        },
        {
          name: "Anforderungsmanagement-Grundlagen",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Grundlegende Kompetenz in der Erhebung, Strukturierung und Dokumentation von Anforderungen — als projektleitende Rolle, nicht als dedizierter BA. Nicht gemeint: vollständige BA-Tätigkeit. Typische Tätigkeiten: Anforderungen mit Fachbereich strukturiert erheben und dokumentieren · User Stories und Akzeptanzkriterien formulieren · Anforderungsworkshops leiten · Scope gegen Anforderungen prüfen und abstimmen«",
          anchors: {
            1: "Kennt grundlegende Methoden der Anforderungserhebung (Interviews, Workshops).",
            2: "Erhebt und dokumentiert Anforderungen strukturiert; formuliert User Stories nach Vorlage.",
            3: "Leitet eigenständig Anforderungsworkshops; erkennt Widersprüche und Lücken; übersetzt Anforderungen in Projektscope.",
            4: "Konzipiert Anforderungsprozesse für Projekte; vermittelt zwischen Fachbereich und Entwicklung.",
            5: "Gilt als Ansprechpartner für Anforderungsmanagement; entwickelt Standards für das Team.",
          },
        },
        {
          name: "Projektabschluss & nachhaltiger Transfer",
          dep: "Durable",
          targetLevel: 4,
          bewertungsmodell: "Dreyfus",
          description:
            "»Strukturierter Projektabschluss mit Fokus auf nachhaltige Wirkung: formale Abnahme und Übergabe, Wissenssicherung für Folgeprojekte und aktive Sicherstellung, dass Projektergebnisse in den Betrieb übergehen und genutzt werden. Typische Tätigkeiten: Abnahmedokumente erstellen und unterzeichnen lassen · Übergabe an Betrieb und Kundenmitarbeiter strukturiert gestalten · Lessons-Learned-Workshop moderieren · Wissenstransfer für Folgeprojekte sichern«",
          anchors: {
            1: "Erstellt Abschlussdokumente nach Vorlage; bereitet Übergabe mit Unterstützung vor.",
            2: "Führt eigenständig Projektabschluss durch; dokumentiert Ergebnisse und Erkenntnisse.",
            3: "Gestaltet Übergabe an Betrieb und Kunde strukturiert; moderiert Lessons-Learned-Workshop; sichert Wissen für Folgeprojekte.",
            4: "Verankert Projektergebnisse nachhaltig in der Kundenorganisation; entwickelt Übergabe- und Transferkonzepte.",
            5: "Gilt als Experte für PM-Wissensmanagement und nachhaltige Projektübergaben; entwickelt Standards für das Team.",
          },
        },
      ],
    },
    {
      name: "Kommunikation & Zusammenarbeit",
      skills: [
        {
          name: "Stakeholder-Steuerung & -Kommunikation",
          dep: "Durable",
          targetLevel: 4,
          keySkill: true,
          description:
            "»Aktive Identifikation, Analyse und Steuerung von Stakeholder-Interessen und -Erwartungen — vom Sponsor bis zum Endnutzer. Typische Tätigkeiten: Stakeholder-Map anlegen und aktualisieren · Steuerungskreis-Präsentation vorbereiten · Konflikte zwischen Interessengruppen moderieren«",
          anchors: {
            1: "Kommuniziert auf Anfrage; hält offizielle Stakeholder informiert.",
            2: "Kommuniziert proaktiv Status und Entscheidungsbedarfe.",
            3: "Steuert Erwartungen aktiv; erkennt Spannungsfelder frühzeitig.",
            4: "Navigiert politisch sensible Situationen; positioniert Projekt strategisch.",
            5: "Gilt als vertrauenswürdiger Berater auf C-Level; prägt PM-Kultur.",
          },
        },
        {
          name: "Verhandlungsführung",
          dep: "Durable",
          targetLevel: 4,
          description:
            "»Interessen- und sachbezogene Verhandlung mit Kunden, Lieferanten und intern bei Scope, Ressourcen, Budget und Fristen. Typische Tätigkeiten: Verhandlungspositionen vorbereiten · Zielkonflikte zwischen Parteien ausgleichen · Verhandlungsergebnisse verbindlich dokumentieren«",
          anchors: {
            1: "Nimmt an Verhandlungen teil; bereitet Unterlagen vor.",
            2: "Führt einfache Verhandlungen eigenständig; findet Kompromisse.",
            3: "Verhandelt Scope, Budget und Fristen professionell; nutzt Verhandlungstechniken.",
            4: "Führt komplexe Mehrparteiverhandlungen; sichert Projektziele.",
            5: "Gilt als Verhandlungsexperte; coacht andere PMs.",
          },
        },
        {
          name: "Verbalisierung & Strukturierung",
          dep: "Durable",
          targetLevel: 4,
          keySkill: true,
          description:
            "»Komplexe Sachverhalte analysieren, strukturieren und adressatengerecht kommunizieren – schriftlich und mündlich. Die Kompetenz umfasst die Fähigkeit, Informationen zielgruppengerecht aufzubereiten, Komplexität zu reduzieren, überzeugend zu argumentieren und unterschiedliche Kommunikationssituationen professionell zu gestalten. Sie basiert auf methodischem Wissen zu Kommunikation, Präsentation und Moderation und wird im Projektalltag sicher angewendet. Typische Tätigkeiten: Komplexe Sachverhalte für Management, Fachbereiche und Entwicklung zielgruppengerecht aufbereiten · Anforderungen, Risiken und Entscheidungen verständlich zusammenfassen und kommunizieren · Workshops, Statusberichte, Konzepte und Entscheidungsvorlagen klar strukturieren · Unterschiedliche Stakeholder adressatengerecht informieren und argumentativ überzeugen · Konflikt- und Abstimmungsgespräche professionell führen · Kommunikationsmethoden (z. B. Fragetechniken, aktives Zuhören, Storylining, Pyramidenprinzip, Visualisierung) situationsgerecht einsetzen«",
          anchors: {
            1: "Formuliert verständlich, wenn Inhalt und Zielsetzung klar sind. Nutzt einfache Strukturen und berücksichtigt grundlegende Kommunikationsregeln.",
            2: "Strukturiert Inhalte mithilfe etablierter Methoden oder Vorlagen. Kommuniziert einfache Sachverhalte nachvollziehbar und orientiert sich an der jeweiligen Zielgruppe.",
            3: "Bereitet komplexe Inhalte adressatengerecht auf, reduziert Komplexität auf das Wesentliche und kommuniziert auch in anspruchsvollen Projektsituationen klar, nachvollziehbar und überzeugend. Nutzt Kommunikationsmethoden bewusst und situationsgerecht.",
            4: "Steuert Kommunikation bewusst in unterschiedlichen Stakeholder-Konstellationen. Erklärt komplexe fachliche und technische Zusammenhänge verständlich, entwickelt überzeugende Argumentationslinien und passt Kommunikation sicher an Management, Fachbereiche, Entwicklung oder Kunden an. Verfügt über fundiertes methodisches Wissen in Kommunikation und setzt dieses gezielt ein.",
            5: "Prägt Kommunikationsstandards im Unternehmen oder Projektumfeld. Coacht andere in strukturierter Kommunikation, Moderation und adressatengerechter Darstellung komplexer Inhalte. Gilt als Referenz für wirkungsvolle Kommunikation und überzeugende Entscheidungsunterlagen.",
          },
        },
      ],
    },
    {
      name: "Führung & Coaching",
      skills: [
        {
          name: "Belastbarkeit & Ambiguitätstoleranz",
          dep: "Durable",
          targetLevel: 3,
          bewertungsmodell: "Dreyfus",
          description:
            "»Fähigkeit, unter Druck, Unsicherheit und widersprüchlichen Anforderungen handlungsfähig zu bleiben. PM-Rollen navigieren regelmäßig in Projekten ohne vollständige Information, mit konkurrierenden Stakeholder-Interessen und unter Zeitdruck. Typische Tätigkeiten: Fundierte Entscheidungen auch bei unvollständigen Informationen ermöglichen · Eigene Belastbarkeit im Projektalltag erhalten · Unsicherheit im Team transparent und konstruktiv kommunizieren«",
          anchors: {
            1: "Erkennt Stresssituationen; holt sich bei Bedarf Unterstützung.",
            2: "Bleibt in bekannten Drucksituationen handlungsfähig; kommuniziert Unsicherheit offen.",
            3: "Trifft Entscheidungen bei unvollständiger Datenlage; hält Team trotz Ambiguität auf Kurs.",
            4: "Navigiert komplexe Krisen ruhig und strukturiert; schützt das Team vor übermäßigem Druck.",
            5: "Gilt als Vorbild in Belastbarkeit; befähigt andere im Umgang mit Unsicherheit.",
          },
        },
        {
          name: "Teamführung & Motivation",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Fachliche Führung und Motivation verteilter Projektteams ohne disziplinarische Weisungsbefugnis — durch Klarheit, Vertrauen und Zielorientierung. Typische Tätigkeiten: Teamrollen und Verantwortlichkeiten klar definieren · Engagement und Motivation aktiv fördern · Feedback regelmäßig und konstruktiv geben«",
          anchors: {
            1: "Delegiert Aufgaben; gibt Feedback auf Anfrage.",
            2: "Fördert Zusammenarbeit im Team; kommuniziert Ziele klar.",
            3: "Motiviert und entwickelt das Team aktiv; löst Konflikte konstruktiv.",
            4: "Führt virtuelle und verteilte Teams sicher; entwickelt Teamkultur.",
            5: "Gilt als inspirierender Leader; prägt Projektkultur.",
          },
        },
        {
          name: "Eskalationsmanagement",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Professioneller Umgang mit Eskalationen — eigene Eskalation nach oben und Deeskalation bei Konflikten im Projekt. Typische Tätigkeiten: Eskalationsbedarf frühzeitig erkennen · sachbezogen und lösungsorientiert eskalieren · Deeskalation bei Kundenkonflikten moderieren«",
          anchors: {
            1: "Meldet Probleme; eskaliert auf Anweisung.",
            2: "Eskaliert eigenständig, wenn Probleme unlösbar; hält Format ein.",
            3: "Eskaliert lösungsorientiert; deeskaliert aktiv Spannungen.",
            4: "Navigiert auch emotional aufgeladene Eskalationen; schützt Projektbeziehungen.",
            5: "Entwickelt Eskalations-Frameworks; coacht andere PMs.",
          },
        },
      ],
    },
  ],
};

// -----------------------------------------------------------------------------
// Produktmanagement
// -----------------------------------------------------------------------------

const productManager: Role = {
  id: "product-manager",
  name: "Product Manager",
  description:
    "Strategische Verantwortung fuer ein Produkt — von Vision und Marktanalyse bis Roadmap und Erfolgsmessung.",
  categories: [
    {
      name: "Fachlich",
      skills: [
        { name: "Versicherungsprodukte & Marktstruktur", dep: "Durable" },
        { name: "Vertriebskanaele & Kundensegmente", dep: "Durable" },
        { name: "Regulatorik fuer Versicherungsprodukte (VVG, BaFin)", dep: "Evolving" },
        { name: "Geschaeftsmodelle der Versicherungsbranche", dep: "Durable" },
        { ...RUMP_DIGITALE },
      ],
    },
    {
      name: "Technisch",
      skills: [
        { name: "Produkt-Analytics (GA, Mixpanel, Amplitude)", dep: "Evolving" },
        { name: "Roadmap-Tools (Productboard, Aha!)", dep: "Evolving" },
        { name: "A/B-Testing-Plattformen", dep: "Evolving" },
        { name: "Jira & Confluence", dep: "Evolving" },
        { name: "KI-Tools fuer Produktanalyse", dep: "Perishable" },
      ],
    },
    {
      name: "Methodisch",
      skills: [
        { name: "Produktstrategie & Vision", dep: "Durable" },
        { name: "Markt- und Wettbewerbsanalyse", dep: "Durable" },
        { name: "Discovery & Validation", dep: "Durable" },
        { name: "Jobs-to-be-Done Framework", dep: "Durable" },
        { name: "OKRs & Produkt-KPIs", dep: "Durable" },
        { name: "Pricing & Monetarisierung", dep: "Durable" },
        { name: "Roadmap-Priorisierung (RICE, MoSCoW)", dep: "Durable" },
        { name: "Customer Lifecycle Management", dep: "Durable" },
        { name: "Go-to-Market Planung", dep: "Durable" },
      ],
    },
    {
      name: "Kommunikation & Zusammenarbeit",
      skills: [
        { name: "Stakeholder-Management", dep: "Durable" },
        { name: "Praesentation auf Management-Ebene", dep: "Durable" },
        { name: "Cross-funktionale Teamfuehrung", dep: "Durable" },
        { name: "Storytelling & Pitch", dep: "Durable" },
        { ...RUMP_VERBAL },
      ],
    },
  ],
};

const productOwner: Role = {
  id: "product-owner",
  name: "Product Owner",
  description:
    "Backlog-Verantwortung im Scrum-Team — uebersetzt Produktvision in priorisierte Anforderungen und liefert Wert iterativ aus.",
  categories: [
    {
      name: "Fachlich",
      skills: [
        {
          name: "Scrum Guide & Professional Scrum",
          dep: "Durable",
          targetLevel: 3,
          keySkill: true,
          description:
            "»Kenntnis des Scrum Guides und der Professional-Scrum-Prinzipien als gemeinsame Basis fuer die Zusammenarbeit im Team. Typische Taetigkeiten: Scrum-Rollen, -Events und -Artefakte korrekt anwenden · Abweichungen vom Scrum Guide bewusst und begruendet vornehmen · Neue Teammitglieder in Scrum einfuehren«",
          anchors: {
            1: "Kennt Scrum-Grundbegriffe; wendet Events nach Anleitung an.",
            2: "Versteht Sinn und Zweck von Rollen, Events und Artefakten.",
            3: "Wendet Scrum im Team-Alltag sicher und eigenstaendig an.",
            4: "Bewertet Abweichungen vom Scrum Guide kritisch; passt Vorgehen begruendet an.",
            5: "Gilt als Scrum-Referenz; entwickelt das Vorgehen im Team konzeptionell weiter.",
          },
        },
        {
          name: "Versicherungsprozesse (Vertrag, Schaden, Bestand)",
          dep: "Durable",
          targetLevel: 3,
          keySkill: true,
          description:
            "»Verstaendnis zentraler Versicherungsprozesse — Vertragsabschluss, Schadenbearbeitung, Bestandsfuehrung — als fachliche Grundlage fuer Priorisierungsentscheidungen im Produkt. Typische Taetigkeiten: Anforderungen im Kontext der Versicherungsprozesse einordnen · Mit Fachbereichen auf Augenhoehe ueber Prozessdetails sprechen · Auswirkungen von Produktentscheidungen auf Bestands- und Schadenprozesse einschaetzen«",
          anchors: {
            1: "Kennt die Grundbegriffe; braucht Erklaerung bei Prozessdetails.",
            2: "Versteht die zentralen Prozesse und deren Zusammenhaenge.",
            3: "Ordnet Anforderungen eigenstaendig in die Versicherungsprozesse ein.",
            4: "Erkennt Prozessabhaengigkeiten fruehzeitig; beraet Fachbereiche zu Auswirkungen.",
            5: "Gilt als fachliche Referenz zwischen Produkt und Versicherungsfachlichkeit.",
          },
        },
        {
          name: "Regulatorische Anforderungen (BaFin, VVG)",
          dep: "Evolving",
          targetLevel: 3,
          description:
            "»Kenntnis regulatorischer Rahmenbedingungen (BaFin-Vorgaben, VVG) mit Auswirkung auf Produktentscheidungen. Nicht gemeint: eigenstaendige juristische Bewertung. Typische Taetigkeiten: Regulatorische Constraints in Anforderungen beruecksichtigen · Bei Unsicherheit Compliance/Recht einbeziehen · Auswirkungen neuer Regulatorik auf das Produkt einschaetzen«",
          anchors: {
            1: "Kennt die Begriffe BaFin und VVG; braucht Unterstuetzung bei der Einordnung.",
            2: "Erkennt gaengige regulatorische Anforderungen in Standardfaellen.",
            3: "Beruecksichtigt regulatorische Vorgaben eigenstaendig in der Priorisierung.",
            4: "Bewertet neue Regulatorik auf Produktauswirkung; klaert Grenzfaelle mit Fachstellen.",
            5: "Gilt als Ansprechpartner fuer regulatorische Produktfragen.",
          },
        },
        { ...RUMP_DIGITALE },
      ],
    },
    {
      name: "Technisch",
      skills: [
        {
          name: "Jira & Confluence",
          dep: "Evolving",
          targetLevel: 3,
          description:
            "»Sicherer Umgang mit Jira und Confluence fuer Backlog-Pflege, Sprint-Planung und Dokumentation. Typische Taetigkeiten: Backlog-Items und Epics strukturiert anlegen und pflegen · Boards und Filter fuer Team-Transparenz konfigurieren · Produktdokumentation in Confluence aktuell halten«",
          anchors: {
            1: "Bedient Jira/Confluence grundlegend; braucht Anleitung bei Konfiguration.",
            2: "Pflegt Backlog und Dokumentation eigenstaendig fuer Standardfaelle.",
            3: "Nutzt Jira/Confluence vollstaendig fuer den Produktalltag; konfiguriert Boards.",
            4: "Optimiert Workflows und Strukturen fuer das Team.",
            5: "Gilt als Key User; entwickelt Team-weite Nutzungsstandards.",
          },
        },
        {
          name: "Story Mapping Tools",
          dep: "Evolving",
          targetLevel: 2,
          description:
            "»Nutzung digitaler Story-Mapping-Werkzeuge (z. B. Miro, Mural) zur visuellen Strukturierung von Nutzerfluessen und Backlog. Typische Taetigkeiten: Story Maps digital aufbauen und pflegen · Workshops mit Story-Mapping-Tools moderieren · Ergebnisse in den Backlog ueberfuehren«",
          anchors: {
            1: "Nutzt vorgegebene Story Maps; braucht Anleitung beim Aufbau.",
            2: "Erstellt einfache Story Maps eigenstaendig.",
            3: "Baut und pflegt Story Maps eigenstaendig fuer laufende Produktarbeit.",
            4: "Moderiert Story-Mapping-Workshops; ueberfuehrt Ergebnisse strukturiert in den Backlog.",
            5: "Etabliert Story Mapping als festen Bestandteil der Produktarbeit im Team.",
          },
        },
        {
          name: "Prototyping (Figma)",
          dep: "Evolving",
          targetLevel: 2,
          description:
            "»Grundlegender Umgang mit Figma, um Ideen zu visualisieren und mit Design/Entwicklung abzustimmen. Nicht gemeint: eigenstaendiges visuelles Design. Typische Taetigkeiten: Einfache Wireframes fuer Abstimmungen erstellen · Bestehende Figma-Prototypen nachvollziehen und kommentieren · Mit Design gemeinsam an Anforderungen arbeiten«",
          anchors: {
            1: "Kann Figma-Prototypen ansehen und kommentieren.",
            2: "Erstellt einfache Wireframes mit Anleitung.",
            3: "Erstellt eigenstaendig einfache Wireframes fuer Abstimmungszwecke.",
            4: "Nutzt Figma gezielt zur Anforderungsklaerung mit Design.",
            5: "Gestaltet gemeinsam mit Design komplexe Interaktionskonzepte.",
          },
        },
        {
          name: "Analytics-Grundlagen",
          dep: "Evolving",
          targetLevel: 2,
          description:
            "»Grundverstaendnis produktrelevanter Kennzahlen und Analyse-Tools zur datenbasierten Priorisierung. Typische Taetigkeiten: Produkt-KPIs (Nutzung, Conversion) auslesen und interpretieren · Hypothesen anhand von Daten pruefen · Datenbasis fuer Priorisierungsentscheidungen einbeziehen«",
          anchors: {
            1: "Kennt gaengige Produkt-Kennzahlen; braucht Unterstuetzung bei der Interpretation.",
            2: "Liest Standard-Dashboards eigenstaendig.",
            3: "Nutzt Daten eigenstaendig zur Absicherung von Priorisierungsentscheidungen.",
            4: "Entwickelt eigene Analysen fuer komplexe Fragestellungen.",
            5: "Etabliert eine datengetriebene Priorisierungskultur im Team.",
          },
        },
        {
          name: "KI-Tools im Produktkontext",
          dep: "Perishable",
          targetLevel: 2,
          trend: "stark steigend",
          description:
            "»Einsatz von KI-Assistenten fuer Produktarbeit: Anforderungen strukturieren, Recherche beschleunigen, Texte fuer User Stories vorformulieren. Nicht gemeint: autonome Priorisierungsentscheidungen per KI treffen. Typische Taetigkeiten: User Stories und Akzeptanzkriterien per KI vorformulieren und pruefen · Wettbewerbs- und Marktrecherche mit KI-Unterstuetzung beschleunigen · KI-Outputs kritisch auf Praxistauglichkeit pruefen«",
          anchors: {
            1: "Kennt KI-Tools dem Namen nach.",
            2: "Nutzt KI fuer einfache Texte (Stories, Recherche); prueft Outputs auf Korrektheit.",
            3: "Setzt KI gezielt fuer verschiedene Produktarbeit-Aufgaben ein; optimiert Prompts.",
            4: "Etabliert KI-gestuetzte Vorlagen und Workflows fuer das Team.",
            5: "Definiert KI-Nutzungsstandards fuer die Produktarbeit.",
          },
        },
      ],
    },
    {
      name: "Methodisch",
      skills: [
        {
          name: "Backlog-Management & Refinement",
          dep: "Durable",
          targetLevel: 3,
          keySkill: true,
          description:
            "»Kontinuierliche Pflege, Priorisierung und Verfeinerung des Produkt-Backlogs, sodass das Team stets an den wichtigsten Themen arbeitet. Typische Taetigkeiten: Backlog laufend priorisieren und aufraeumen · Refinement-Sessions mit dem Team vorbereiten und durchfuehren · Backlog-Items auf Umsetzungsreife bringen«",
          anchors: {
            1: "Pflegt den Backlog nach Anleitung; braucht Unterstuetzung bei Priorisierung.",
            2: "Priorisiert Standardfaelle eigenstaendig; bereitet einfache Refinements vor.",
            3: "Steuert Backlog-Pflege und Refinement eigenstaendig und kontinuierlich.",
            4: "Optimiert Refinement-Prozesse; loest komplexe Priorisierungskonflikte.",
            5: "Gilt als Referenz fuer Backlog-Management; entwickelt Standards im Unternehmen.",
          },
        },
        {
          name: "User Stories schreiben (INVEST)",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Formulierung von User Stories nach dem INVEST-Prinzip (Independent, Negotiable, Valuable, Estimable, Small, Testable). Typische Taetigkeiten: User Stories aus Anforderungen ableiten · Stories auf INVEST-Kriterien pruefen und nachschaerfen · Team beim Verstaendnis von Stories unterstuetzen«",
          anchors: {
            1: "Schreibt einfache Stories nach Vorlage; braucht Feedback.",
            2: "Formuliert Standard-Stories eigenstaendig nach INVEST.",
            3: "Schreibt eigenstaendig gut geschnittene, klare Stories fuer das Team.",
            4: "Coacht andere im Schreiben von Stories; loest schwierige Schnitte.",
            5: "Gilt als Referenz fuer Story-Qualitaet im Unternehmen.",
          },
        },
        {
          name: "Akzeptanzkriterien definieren",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Formulierung klarer, testbarer Akzeptanzkriterien, die eindeutig festlegen, wann eine Story fertig ist. Typische Taetigkeiten: Akzeptanzkriterien gemeinsam mit dem Team ableiten · Kriterien testbar und eindeutig formulieren · Kriterien bei Aenderungen aktuell halten«",
          anchors: {
            1: "Uebernimmt vorgegebene Kriterien; braucht Unterstuetzung beim Formulieren.",
            2: "Formuliert einfache Akzeptanzkriterien eigenstaendig.",
            3: "Definiert eigenstaendig klare, testbare Kriterien fuer komplexe Stories.",
            4: "Erkennt Luecken in Kriterien proaktiv; schult das Team.",
            5: "Setzt Standards fuer Akzeptanzkriterien im Unternehmen.",
          },
        },
        {
          name: "Story Mapping",
          dep: "Durable",
          targetLevel: 2,
          description:
            "»Visuelle Strukturierung von Nutzerfluessen und Backlog-Items entlang der Nutzerreise zur besseren Priorisierung und Release-Planung. Typische Taetigkeiten: Story Maps mit dem Team erarbeiten · Releases anhand der Story Map schneiden · Luecken in der Nutzerreise identifizieren«",
          anchors: {
            1: "Nimmt an Story-Mapping-Sessions teil; braucht Anleitung.",
            2: "Erstellt einfache Story Maps mit Unterstuetzung.",
            3: "Erarbeitet eigenstaendig Story Maps und schneidet Releases sinnvoll.",
            4: "Nutzt Story Mapping zur strategischen Priorisierung komplexer Produkte.",
            5: "Etabliert Story Mapping als Standardmethode im Team.",
          },
        },
        {
          name: "Priorisierungstechniken (WSJF, MoSCoW)",
          dep: "Durable",
          targetLevel: 3,
          keySkill: true,
          description:
            "»Anwendung strukturierter Priorisierungsmethoden (WSJF, MoSCoW u. a.), um Backlog-Entscheidungen nachvollziehbar zu treffen. Typische Taetigkeiten: Passende Priorisierungsmethode fuer die Situation waehlen · Priorisierung transparent gegenueber Stakeholdern begruenden · Prioritaeten bei neuen Erkenntnissen anpassen«",
          anchors: {
            1: "Kennt die Methoden; braucht Unterstuetzung bei der Anwendung.",
            2: "Wendet eine Standardmethode mit Anleitung an.",
            3: "Waehlt und wendet Priorisierungsmethoden eigenstaendig an.",
            4: "Kombiniert Methoden situativ; begruendet Priorisierung ueberzeugend.",
            5: "Entwickelt eigene Priorisierungsrahmen fuer das Unternehmen.",
          },
        },
        {
          name: "MVP-Definition",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Abgrenzung eines Minimum Viable Products, das mit minimalem Aufwand maximalen Lernwert oder Kundennutzen liefert. Typische Taetigkeiten: Scope eines MVP gemeinsam mit Stakeholdern abgrenzen · Kernhypothesen des MVP explizit machen · Lernergebnisse aus dem MVP in die Weiterentwicklung einspeisen«",
          anchors: {
            1: "Kennt das Konzept; braucht Unterstuetzung bei der Abgrenzung.",
            2: "Grenzt einfache MVPs mit Anleitung ab.",
            3: "Definiert eigenstaendig MVPs mit klaren Kernhypothesen.",
            4: "Verteidigt MVP-Scope gegenueber Stakeholdern; leitet Lernergebnisse strukturiert ab.",
            5: "Etabliert MVP-Denken als festen Bestandteil der Produktkultur.",
          },
        },
        {
          name: "Sprint- & Release-Planung",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Planung von Sprints und Releases, sodass Team-Kapazitaet und Produktziele zusammenpassen. Typische Taetigkeiten: Sprint-Ziele gemeinsam mit dem Team festlegen · Release-Umfang und -Termine mit Stakeholdern abstimmen · Planung bei Aenderungen anpassen«",
          anchors: {
            1: "Nimmt an der Planung teil; braucht Unterstuetzung bei eigener Planung.",
            2: "Plant einfache Sprints eigenstaendig mit dem Team.",
            3: "Plant Sprints und Releases eigenstaendig und realistisch.",
            4: "Steuert komplexe Releases ueber mehrere Teams/Abhaengigkeiten hinweg.",
            5: "Entwickelt Planungsstandards fuer das Produktteam.",
          },
        },
        {
          name: "Definition of Ready / Done",
          dep: "Durable",
          targetLevel: 2,
          description:
            "»Etablierung und Einhaltung klarer Kriterien, wann ein Item bereit fuer die Umsetzung ist (Ready) und wann es als fertig gilt (Done). Typische Taetigkeiten: DoR/DoD gemeinsam mit dem Team definieren · Einhaltung im Alltag konsequent einfordern · Kriterien bei Bedarf weiterentwickeln«",
          anchors: {
            1: "Kennt DoR/DoD des Teams; wendet sie mit Erinnerung an.",
            2: "Wendet DoR/DoD im Alltag eigenstaendig an.",
            3: "Foerdert konsequente Einhaltung von DoR/DoD im Team.",
            4: "Passt DoR/DoD begruendet an veraenderte Anforderungen an.",
            5: "Etabliert DoR/DoD-Standards ueber mehrere Teams hinweg.",
          },
        },
        {
          name: "Discovery & Delivery",
          dep: "Durable",
          targetLevel: 2,
          description:
            "»Bewusste Trennung und Verzahnung von Produkt-Discovery (Problem-/Loesungsvalidierung) und Delivery (Umsetzung), um das richtige Produkt richtig zu bauen. Typische Taetigkeiten: Discovery-Aktivitaeten (Interviews, Tests) parallel zur Delivery einplanen · Erkenntnisse aus der Discovery in den Backlog einspeisen · Balance zwischen Lernen und Liefern aktiv steuern«",
          anchors: {
            1: "Kennt das Konzept; Discovery und Delivery laufen unstrukturiert nebeneinander.",
            2: "Plant einzelne Discovery-Aktivitaeten mit Unterstuetzung ein.",
            3: "Verzahnt Discovery und Delivery eigenstaendig im laufenden Betrieb.",
            4: "Steuert die Balance zwischen Discovery und Delivery bewusst und situativ.",
            5: "Etabliert einen strukturierten Discovery-Delivery-Prozess im Team.",
          },
        },
        {
          name: "Velocity & Forecasting",
          dep: "Durable",
          targetLevel: 2,
          description:
            "»Nutzung von Velocity-Daten zur realistischen Vorhersage von Liefermengen und -terminen. Typische Taetigkeiten: Velocity-Trends beobachten und einordnen · Forecasts fuer Releases auf Datenbasis erstellen · Abweichungen zwischen Forecast und Realitaet erklaeren«",
          anchors: {
            1: "Kennt den Begriff Velocity; braucht Unterstuetzung bei der Interpretation.",
            2: "Liest Velocity-Daten und leitet einfache Forecasts ab.",
            3: "Erstellt eigenstaendig belastbare Forecasts auf Basis von Velocity-Daten.",
            4: "Erklaert Abweichungen fundiert; passt Planung entsprechend an.",
            5: "Entwickelt Forecasting-Standards fuer mehrere Teams.",
          },
        },
      ],
    },
    {
      name: "Kommunikation & Zusammenarbeit",
      skills: [
        {
          name: "Sprint Reviews moderieren",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Vorbereitung und Moderation von Sprint Reviews, sodass Stakeholder den erzielten Fortschritt nachvollziehen und Feedback geben koennen. Typische Taetigkeiten: Sprint Reviews strukturiert vorbereiten · Ergebnisse verstaendlich praesentieren · Feedback aktiv einholen und in den Backlog ueberfuehren«",
          anchors: {
            1: "Nimmt an Sprint Reviews teil; moderiert mit Unterstuetzung.",
            2: "Moderiert einfache Sprint Reviews eigenstaendig.",
            3: "Bereitet Sprint Reviews eigenstaendig vor und moderiert sie souveraen.",
            4: "Passt Reviews zielgruppengerecht an; navigiert kritisches Stakeholder-Feedback.",
            5: "Gilt als Vorbild fuer Sprint-Review-Moderation; coacht andere Product Owner.",
          },
        },
        {
          name: "Stakeholder-Abstimmung",
          dep: "Durable",
          targetLevel: 3,
          keySkill: true,
          description:
            "»Aktive Abstimmung mit relevanten Stakeholdern, um Erwartungen, Prioritaeten und Zielkonflikte transparent zu managen. Typische Taetigkeiten: Stakeholder-Erwartungen aktiv einholen und abgleichen · Zielkonflikte zwischen Stakeholdern transparent machen und aufloesen · Regelmaessige Abstimmungsformate etablieren«",
          anchors: {
            1: "Nimmt Stakeholder-Wuensche entgegen; braucht Unterstuetzung bei der Abstimmung.",
            2: "Fuehrt Standardabstimmungen eigenstaendig durch.",
            3: "Steuert Stakeholder-Beziehungen eigenstaendig und konsistent.",
            4: "Navigiert komplexe Zielkonflikte zwischen mehreren Stakeholdern.",
            5: "Setzt Standards fuer Stakeholder-Arbeit im Produktbereich.",
          },
        },
        {
          name: "Anforderungserhebung",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Systematische Erhebung von Anforderungen aus Fachbereich, Kunden und Stakeholdern als Grundlage fuer den Backlog. Typische Taetigkeiten: Anforderungsgespraeche strukturiert fuehren · Anforderungen praezise dokumentieren · Widerspruechliche Anforderungen erkennen und klaeren«",
          anchors: {
            1: "Nimmt Anforderungen entgegen, wie sie formuliert werden.",
            2: "Erhebt Standard-Anforderungen eigenstaendig mit Leitfaden.",
            3: "Erhebt eigenstaendig vollstaendige Anforderungen; erkennt Widersprueche.",
            4: "Hinterfragt Anforderungen kritisch; klaert komplexe Zielkonflikte.",
            5: "Gilt als Referenz fuer Anforderungserhebung im Produktbereich.",
          },
        },
        {
          name: "Teamarbeit mit Entwicklung & UX",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Enge, vertrauensvolle Zusammenarbeit mit Entwicklung und UX/UI Design als gleichwertige Partner im Produktteam. Typische Taetigkeiten: Anforderungen gemeinsam mit Entwicklung und UX schaerfen · Technische und gestalterische Constraints fruehzeitig einbeziehen · Konflikte zwischen Anforderung und Umsetzbarkeit konstruktiv loesen«",
          anchors: {
            1: "Arbeitet mit Entwicklung/UX zusammen; braucht Unterstuetzung bei Abstimmung.",
            2: "Stimmt sich in Standardformaten eigenstaendig mit dem Team ab.",
            3: "Arbeitet eigenstaendig und partnerschaftlich mit Entwicklung und UX zusammen.",
            4: "Loest komplexe Zielkonflikte zwischen Anforderung, Design und Machbarkeit.",
            5: "Gilt als Vorbild fuer funktionsuebergreifende Teamarbeit.",
          },
        },
        { ...RUMP_VERBAL },
      ],
    },
  ],
};

const ux: Role = {
  id: "ux",
  name: "UX",
  description:
    "Nutzerzentrierte Gestaltung im Produktteam — von Nutzerverstaendnis ueber Design und Prototyping bis zur Einarbeitung von Feedback, eng verzahnt mit Product Management und Entwicklung.",
  categories: [
    {
      name: "Fachlich",
      skills: [
        {
          name: "Versicherungsprodukte & Kundenreisen",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Verstaendnis der Versicherungsprodukte, Vertriebswege und typischen Kundenreisen (Abschluss, Schadensfall, Vertragsaenderung) als Grundlage fuer nutzerzentrierte Design-Entscheidungen im Produktteam. Typische Taetigkeiten: Nutzerbeduerfnisse entlang der Kundenreise einordnen · Produktlogik in Design-Entscheidungen uebersetzen · Mit Product Management auf Augenhoehe ueber Versicherungsprozesse sprechen«",
          anchors: {
            1: "Kennt grundlegende Versicherungsbegriffe; braucht Erklaerung bei Fachfragen.",
            2: "Versteht typische Kundenreisen und Produktarten; ordnet Screens grob ein.",
            3: "Gestaltet eigenstaendig fuer versicherungsspezifische Prozesse; stellt gezielte Fachfragen.",
            4: "Erkennt Optimierungspotenzial in Kundenreisen; beraet Product Management zu Nutzerimplikationen.",
            5: "Gilt als Schnittstelle zwischen Design und Versicherungsfachlichkeit im Produktteam.",
          },
        },
        { ...RUMP_DIGITALE },
      ],
    },
    {
      name: "Technisch",
      skills: [
        {
          name: "Figma (Design & Prototyping)",
          dep: "Evolving",
          targetLevel: 3,
          keySkill: true,
          description:
            "»Sicherer Umgang mit Figma zur Gestaltung von Screens und interaktiven Prototypen im Produktalltag. Typische Taetigkeiten: Screens und einfache Komponenten in Figma gestalten · Klickbare Prototypen fuer Tests und Reviews erstellen · Mit Entwicklung ueber Figma (Dev Mode/Inspect) abstimmen«",
          anchors: {
            1: "Bedient Figma grundlegend; braucht Anleitung bei der Gestaltung.",
            2: "Erstellt einfache Screens und Prototypen eigenstaendig.",
            3: "Gestaltet Screens und klickbare Prototypen fuer den Produktalltag selbststaendig.",
            4: "Nutzt Figma gezielt zur Anforderungsklaerung und Abstimmung mit Entwicklung.",
            5: "Gilt als Figma-Ansprechpartnerin im Produktteam; etabliert Nutzungsstandards.",
          },
        },
        {
          name: "UI-Gestaltung & visuelle Grundlagen",
          dep: "Durable",
          targetLevel: 2,
          description:
            "»Grundlagen der visuellen Gestaltung — Typografie, Layout, visuelle Hierarchie und responsive Darstellung — fuer verstaendliche, konsistente Oberflaechen. Typische Taetigkeiten: Bestehende Design-Vorgaben und Komponenten korrekt anwenden · Visuelle Hierarchien fuer einfache Screens aufbauen · Layouts fuer verschiedene Bildschirmgroessen anpassen«",
          anchors: {
            1: "Nutzt vorgegebene Textstile und Layouts; erstellt selten eigene Hierarchien.",
            2: "Setzt Standard-Gestaltungsregeln eigenstaendig um.",
            3: "Baut eigenstaendig klare visuelle Hierarchien fuer neue Screens auf.",
            4: "Passt Layouts fuer unterschiedliche Bildschirmgroessen souveraen an; loest einfache Gestaltungsprobleme.",
            5: "Gilt als gestalterische Referenz im Produktteam.",
          },
        },
        {
          name: "KI-Tools im Designprozess",
          dep: "Perishable",
          targetLevel: 2,
          trend: "stark steigend",
          description:
            "»Einsatz von KI-Tools zur Ideenfindung, Recherche und Beschleunigung typischer Design-Aufgaben. Typische Taetigkeiten: Moodboards und erste Entwuerfe per KI generieren · Prompts fuer Design- und Rechercheaufgaben formulieren · Generierte Ergebnisse kritisch pruefen und weiterverarbeiten«",
          anchors: {
            1: "Kennt gaengige KI-Tools dem Namen nach.",
            2: "Nutzt KI-Tools fuer einfache Aufgaben (Moodboards, Recherche) mit Unterstuetzung.",
            3: "Setzt KI-Tools gezielt fuer Ideenfindung und erste Entwuerfe ein; prueft Ergebnisse kritisch.",
            4: "Entwickelt wiederverwendbare Prompts und Workflows fuer das Team.",
            5: "Definiert Nutzungsstandards fuer KI-Tools im Designprozess.",
          },
        },
      ],
    },
    {
      name: "Methodisch",
      skills: [
        {
          name: "Nutzerforschung & Interviews",
          dep: "Durable",
          targetLevel: 3,
          keySkill: true,
          description:
            "»Planung und Durchfuehrung einfacher qualitativer Interviews zur Erhebung von Nutzerbeduerfnissen und Schmerzpunkten. Typische Taetigkeiten: Interviewleitfaeden mit Unterstuetzung entwickeln · Interviews ergebnisoffen fuehren · Erkenntnisse strukturiert festhalten und teilen«",
          anchors: {
            1: "Fuehrt Interviews nach vorgegebenem Leitfaden; braucht Coaching.",
            2: "Entwickelt einfache Leitfaeden und fuehrt Standardinterviews eigenstaendig.",
            3: "Fuehrt Interviews souveraen und ergebnisoffen; leitet Erkenntnisse ab.",
            4: "Passt Interviewmethodik an komplexere Fragestellungen an.",
            5: "Gilt als Ansprechpartnerin fuer Nutzerforschung im Produktteam.",
          },
        },
        {
          name: "Personas & Nutzerbeduerfnisse",
          dep: "Durable",
          targetLevel: 2,
          description:
            "»Verdichtung von Nutzerforschung zu Personas und klar formulierten Nutzerbeduerfnissen als gemeinsame Grundlage fuer Produktentscheidungen. Typische Taetigkeiten: Personas aus Nutzerforschung ableiten und aktuell halten · Nutzerbeduerfnisse fuer Feature-Entscheidungen einordnen · Team fuer Nutzerperspektive sensibilisieren«",
          anchors: {
            1: "Kennt bestehende Personas; wendet sie mit Anleitung an.",
            2: "Aktualisiert Personas eigenstaendig anhand neuer Erkenntnisse.",
            3: "Leitet eigenstaendig Personas und Beduerfnisse aus Nutzerforschung ab.",
            4: "Nutzt Personas gezielt zur Priorisierung; vermittelt Nutzerperspektive im Team.",
            5: "Etabliert Personas als festen Bestandteil der Produktarbeit.",
          },
        },
        {
          name: "Usability Testing",
          dep: "Durable",
          targetLevel: 3,
          keySkill: true,
          description:
            "»Planung und Durchfuehrung einfacher moderierter Usability-Tests zur Validierung von Designs. Typische Taetigkeiten: Testszenarien und Aufgaben entwickeln · Tests moderieren und Beobachtungen dokumentieren · Ergebnisse in konkrete Design-Anpassungen uebersetzen«",
          anchors: {
            1: "Unterstuetzt bei Usability-Tests nach Anleitung.",
            2: "Fuehrt einfache moderierte Tests eigenstaendig durch.",
            3: "Plant und fuehrt Usability-Tests eigenstaendig durch; leitet Anpassungen ab.",
            4: "Waehlt Testmethodik passend zur Fragestellung; loest methodische Probleme.",
            5: "Gilt als Referenz fuer Usability Testing im Produktteam.",
          },
        },
        {
          name: "Prototyping (Fidelity-Wahl)",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Konzeption von Prototypen unterschiedlicher Wirklichkeitsnaehe (Wireframe, Klick-Dummy, High-Fidelity) passend zur jeweiligen Fragestellung. Typische Taetigkeiten: Passendes Fidelity-Level fuer die Testfrage waehlen · Prototypen fuer Tests und Stakeholder-Reviews aufbauen · Feedback aus Tests in die naechste Iteration einarbeiten«",
          anchors: {
            1: "Baut einfache Prototypen nach Anleitung.",
            2: "Erstellt Standard-Prototypen (Klick-Dummys) eigenstaendig.",
            3: "Waehlt eigenstaendig passendes Fidelity-Level; iteriert Prototypen zielgerichtet.",
            4: "Entwickelt Prototypen fuer anspruchsvollere Testfragen; beraet zur Methodenwahl.",
            5: "Gilt als Referenz fuer Prototyping im Produktteam.",
          },
        },
        {
          name: "Nutzerfeedback einholen & einarbeiten",
          dep: "Durable",
          targetLevel: 3,
          keySkill: true,
          description:
            "»Systematisches Einholen, Buendeln und Einarbeiten von Nutzerfeedback aus Tests, Support und Produktnutzung in die Designarbeit. Typische Taetigkeiten: Feedback aus verschiedenen Quellen (Tests, Support, Analytics) buendeln · Feedback priorisiert in Design-Iterationen einspeisen · Rueckmeldung an Nutzer und Stakeholder zu umgesetztem Feedback geben«",
          anchors: {
            1: "Nimmt Feedback entgegen; braucht Unterstuetzung bei der Einordnung.",
            2: "Sammelt Feedback aus Standardquellen eigenstaendig.",
            3: "Buendelt Feedback systematisch und arbeitet es priorisiert in die Designarbeit ein.",
            4: "Verknuepft Feedback aus mehreren Quellen zu belastbaren Erkenntnissen; schliesst den Feedback-Kreislauf aktiv.",
            5: "Etabliert einen strukturierten Feedback-Prozess im Produktteam.",
          },
        },
      ],
    },
    {
      name: "Kommunikation & Zusammenarbeit",
      skills: [
        {
          name: "Zusammenarbeit mit Product Management & Entwicklung",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Enge, partnerschaftliche Zusammenarbeit mit Product Management und Entwicklung im Produktteam. Typische Taetigkeiten: Anforderungen gemeinsam mit Product Management schaerfen · Design-Entscheidungen mit Entwicklung auf Machbarkeit abstimmen · Konflikte zwischen Anforderung, Design und Umsetzbarkeit konstruktiv loesen«",
          anchors: {
            1: "Arbeitet mit Product Management/Entwicklung zusammen; braucht Unterstuetzung bei Abstimmung.",
            2: "Stimmt sich in Standardformaten eigenstaendig mit dem Team ab.",
            3: "Arbeitet eigenstaendig und partnerschaftlich mit Product Management und Entwicklung zusammen.",
            4: "Loest Zielkonflikte zwischen Anforderung, Design und Machbarkeit eigenstaendig.",
            5: "Gilt als Vorbild fuer funktionsuebergreifende Teamarbeit.",
          },
        },
        {
          name: "Praesentation von Design-Entscheidungen",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Nachvollziehbare Praesentation von Design-Entscheidungen gegenueber Product Management und Stakeholdern, inkl. Herleitung aus Nutzerforschung. Typische Taetigkeiten: Design-Rationale verstaendlich aufbereiten · Praesentationen auf die jeweilige Zielgruppe zuschneiden · Rueckfragen souveraen beantworten«",
          anchors: {
            1: "Praesentiert Designs nach Vorlage; braucht Unterstuetzung bei Rueckfragen.",
            2: "Bereitet einfache Praesentationen eigenstaendig vor.",
            3: "Praesentiert Design-Entscheidungen souveraen und nachvollziehbar.",
            4: "Passt Praesentationen zielgruppengerecht an; navigiert kritische Rueckfragen.",
            5: "Gilt als Vorbild fuer Design-Praesentationen im Produktteam.",
          },
        },
        { ...RUMP_VERBAL },
      ],
    },
  ],
};

const businessDeveloper: Role = {
  id: "business-developer",
  name: "Business Developer",
  description:
    "Kommerzielle Weiterentwicklung des Produkts — Pricing, Vertrags- und Accountmanagement sowie Aufbau strategischer Kooperationen und Partnerschaften.",
  categories: [
    {
      name: "Fachlich",
      skills: [
        {
          name: "Versicherungsmarkt & Wettbewerbslandschaft",
          dep: "Durable",
          targetLevel: 3,
          keySkill: true,
          description:
            "»Kenntnis des Versicherungsmarktes, relevanter Wettbewerber und Marktentwicklungen als Grundlage fuer Preis-, Account- und Partnerschaftsentscheidungen. Typische Taetigkeiten: Markt- und Wettbewerbsentwicklungen laufend verfolgen · Positionierung des eigenen Produkts im Markt einordnen · Marktchancen fuer neue Kooperationen identifizieren«",
          anchors: {
            1: "Kennt die wichtigsten Marktteilnehmer; braucht Unterstuetzung bei der Einordnung.",
            2: "Verfolgt Marktentwicklungen und ordnet sie grundlegend ein.",
            3: "Ordnet Markt- und Wettbewerbsentwicklungen eigenstaendig in Geschaeftsentscheidungen ein.",
            4: "Erkennt Marktchancen fruehzeitig; leitet strategische Empfehlungen ab.",
            5: "Gilt als Marktexpertin; praegt die Positionierung des Unternehmens im Markt.",
          },
        },
        {
          name: "Vertragsrecht & Konditionengestaltung (Grundlagen)",
          dep: "Evolving",
          targetLevel: 3,
          description:
            "»Grundlegende Kenntnisse im Vertragsrecht und in der Gestaltung kommerzieller Konditionen fuer Kunden- und Partnervertraege. Nicht gemeint: eigenstaendige juristische Bewertung komplexer Vertragswerke. Typische Taetigkeiten: Standardvertragsklauseln verstehen und anwenden · Konditionen im vorgegebenen Rahmen gestalten · Bei rechtlichen Unsicherheiten Recht/Compliance einbeziehen«",
          anchors: {
            1: "Kennt vertragliche Grundbegriffe; braucht Unterstuetzung bei der Einordnung.",
            2: "Versteht Standardvertragsklauseln; wendet Vorlagen eigenstaendig an.",
            3: "Gestaltet Konditionen im vorgegebenen Rahmen eigenstaendig; erkennt Grenzfaelle.",
            4: "Verhandelt komplexere Vertragsklauseln; klaert Grenzfaelle proaktiv mit Recht/Compliance.",
            5: "Gilt als Ansprechpartnerin fuer Vertragsgestaltung im Geschaeftsbereich.",
          },
        },
        {
          name: "Pricing- & Geschaeftsmodelle",
          dep: "Durable",
          targetLevel: 3,
          keySkill: true,
          description:
            "»Verstaendnis der Geschaefts- und Preismodelle des eigenen Produkts sowie gaengiger Modelle im Versicherungs- und Softwaregeschaeft. Typische Taetigkeiten: Auswirkungen von Preisentscheidungen auf das Geschaeftsmodell einschaetzen · Geschaeftsmodell gegenueber Kunden und Partnern erklaeren · Preismodelle im Vergleich zum Wettbewerb einordnen«",
          anchors: {
            1: "Kennt das eigene Geschaeftsmodell in Grundzuegen.",
            2: "Erklaert das Geschaeftsmodell und gaengige Preismodelle nachvollziehbar.",
            3: "Ordnet Preisentscheidungen eigenstaendig in das Geschaeftsmodell ein.",
            4: "Bewertet alternative Preis- und Geschaeftsmodelle fundiert; beraet dazu.",
            5: "Entwickelt das Geschaefts- und Preismodell aktiv mit.",
          },
        },
        { ...RUMP_DIGITALE },
      ],
    },
    {
      name: "Technisch",
      skills: [
        {
          name: "CRM-Systeme (z. B. Salesforce, HubSpot)",
          dep: "Evolving",
          targetLevel: 3,
          keySkill: true,
          description:
            "»Sicherer Umgang mit CRM-Systemen zur Pflege von Kunden- und Partnerbeziehungen, Opportunities und Vertragsdaten. Typische Taetigkeiten: Kunden- und Partnerdaten strukturiert im CRM pflegen · Opportunities und Vertragsstatus nachhalten · Berichte und Auswertungen aus dem CRM aufbereiten«",
          anchors: {
            1: "Bedient das CRM grundlegend; pflegt einfache Datensaetze.",
            2: "Pflegt Kunden- und Partnerdaten eigenstaendig nach vorgegebener Struktur.",
            3: "Nutzt das CRM vollstaendig fuer Account- und Vertragssteuerung; erstellt Berichte.",
            4: "Konfiguriert Ansichten und Automatisierungen fuer den eigenen Bereich.",
            5: "Gilt als Key User; entwickelt Nutzungsstandards fuer das Team.",
          },
        },
        {
          name: "Vertrags- & Angebotsmanagement-Tools",
          dep: "Evolving",
          targetLevel: 2,
          description:
            "»Nutzung von Tools zur Erstellung, Ablage und Nachverfolgung von Angeboten und Vertraegen. Typische Taetigkeiten: Angebote und Vertraege aus Vorlagen erstellen · Frist- und Verlaengerungstermine nachhalten · Vertragsversionen und Freigabestatus pflegen«",
          anchors: {
            1: "Erstellt Angebote/Vertraege nach Vorlage mit Anleitung.",
            2: "Erstellt und pflegt Angebote und Vertraege eigenstaendig.",
            3: "Nutzt Tools vollstaendig zur Fristueberwachung und Versionspflege.",
            4: "Optimiert Vorlagen und Ablaeufe fuer wiederkehrende Vertragsarten.",
            5: "Definiert Tool-Standards fuer Angebots- und Vertragsmanagement.",
          },
        },
        {
          name: "KI-Tools fuer Vertriebs-/Accountarbeit",
          dep: "Perishable",
          targetLevel: 2,
          trend: "stark steigend",
          description:
            "»Einsatz von KI-Assistenten zur Effizienzsteigerung bei Account- und Vertriebsaufgaben: Recherche, Angebotsentwuerfe, Gespraechsvorbereitung. Typische Taetigkeiten: Kunden- und Marktrecherche mit KI-Unterstuetzung beschleunigen · Angebots- und Praesentationstexte per KI vorformulieren · KI-Outputs kritisch auf Richtigkeit und Ton pruefen«",
          anchors: {
            1: "Kennt gaengige KI-Tools dem Namen nach.",
            2: "Nutzt KI-Tools fuer einfache Recherche- und Textaufgaben; prueft Outputs.",
            3: "Setzt KI gezielt fuer Vertriebs- und Accountaufgaben ein; optimiert Prompts.",
            4: "Etabliert wiederverwendbare Prompt-Vorlagen fuer das Team.",
            5: "Definiert KI-Nutzungsstandards fuer den Geschaeftsbereich.",
          },
        },
      ],
    },
    {
      name: "Methodisch",
      skills: [
        {
          name: "Preisentwicklung & Pricing-Strategie",
          dep: "Durable",
          targetLevel: 3,
          keySkill: true,
          description:
            "»Weiterentwicklung von Preisen und Preismodellen auf Basis von Markt-, Wettbewerbs- und Kundendaten. Typische Taetigkeiten: Preisanpassungen datenbasiert vorbereiten und begruenden · Preismodelle gegen Markt- und Wettbewerbsentwicklung pruefen · Auswirkungen von Preisaenderungen auf Umsatz und Kundenbindung einschaetzen«",
          anchors: {
            1: "Setzt vorgegebene Preise um; braucht Unterstuetzung bei Anpassungen.",
            2: "Bereitet einfache Preisanpassungen mit Anleitung vor.",
            3: "Bereitet Preisanpassungen eigenstaendig datenbasiert vor und begruendet sie.",
            4: "Entwickelt Preismodelle eigenstaendig weiter; bewertet komplexe Auswirkungen.",
            5: "Verantwortet die Pricing-Strategie fuer den Geschaeftsbereich.",
          },
        },
        {
          name: "Account-Planung & -Steuerung",
          dep: "Durable",
          targetLevel: 3,
          keySkill: true,
          description:
            "»Systematische Planung und Steuerung von Kundenaccounts — Potenziale erkennen, Ziele setzen, Entwicklung nachhalten. Typische Taetigkeiten: Account-Plaene fuer Schluesselkunden erstellen · Umsatz- und Entwicklungspotenziale je Account bewerten · Account-Status regelmaessig nachhalten und anpassen«",
          anchors: {
            1: "Pflegt Account-Informationen nach Vorgabe.",
            2: "Erstellt einfache Account-Plaene eigenstaendig.",
            3: "Plant und steuert Accounts eigenstaendig; erkennt Potenziale.",
            4: "Entwickelt Account-Strategien fuer komplexe Schluesselkunden.",
            5: "Etabliert Account-Planungsstandards fuer den Geschaeftsbereich.",
          },
        },
        {
          name: "Vertragsverhandlung & Vertragsmanagement",
          dep: "Durable",
          targetLevel: 3,
          keySkill: true,
          description:
            "»Verhandlung, Abschluss und laufende Betreuung von Kunden- und Partnervertraegen. Typische Taetigkeiten: Vertragsverhandlungen vorbereiten und fuehren · Vertragsinhalte mit internen Stellen (Recht, Finance) abstimmen · Laufende Vertraege auf Erfuellung und Anpassungsbedarf pruefen«",
          anchors: {
            1: "Nimmt an Verhandlungen teil; bereitet Unterlagen vor.",
            2: "Fuehrt einfache Vertragsverhandlungen eigenstaendig.",
            3: "Verhandelt und betreut Vertraege eigenstaendig; stimmt sich intern ab.",
            4: "Fuehrt komplexe Mehrparteienverhandlungen; loest Vertragskonflikte.",
            5: "Gilt als Verhandlungsexpertin; entwickelt Vertragsstandards.",
          },
        },
        {
          name: "Kooperations- & Partnerschaftsentwicklung",
          dep: "Durable",
          targetLevel: 3,
          keySkill: true,
          trend: "steigend",
          description:
            "»Identifikation, Aufbau und Pflege strategischer Kooperationen und Partnerschaften zur Erweiterung von Produkt- und Marktreichweite. Typische Taetigkeiten: Potenzielle Partner identifizieren und ansprechen · Kooperationsmodelle gemeinsam mit Partnern entwickeln · Bestehende Partnerschaften aktiv weiterentwickeln«",
          anchors: {
            1: "Unterstuetzt bei der Pflege bestehender Partnerschaften.",
            2: "Pflegt bestehende Partnerschaften eigenstaendig.",
            3: "Identifiziert und entwickelt neue Kooperationen eigenstaendig.",
            4: "Baut strategisch wichtige Partnerschaften aktiv auf; loest Konflikte in der Zusammenarbeit.",
            5: "Praegt die Partnerschaftsstrategie des Unternehmens.",
          },
        },
        {
          name: "Markt- & Partnerschaftsanalyse",
          dep: "Durable",
          targetLevel: 2,
          description:
            "»Systematische Analyse von Markt, Wettbewerb und potenziellen Partnern zur Identifikation neuer Geschaeftschancen. Typische Taetigkeiten: Markt- und Partnerlandschaft strukturiert erfassen · Chancen und Risiken potenzieller Kooperationen bewerten · Ergebnisse fuer Entscheidungen aufbereiten«",
          anchors: {
            1: "Sammelt Marktinformationen nach Vorgabe.",
            2: "Erstellt einfache Markt- und Partneranalysen eigenstaendig.",
            3: "Analysiert Markt und potenzielle Partner eigenstaendig; leitet Chancen ab.",
            4: "Bewertet komplexe Marktkonstellationen fundiert; beraet zu strategischen Optionen.",
            5: "Gilt als Referenz fuer Markt- und Partnerschaftsanalyse.",
          },
        },
        {
          name: "Cross- & Upselling-Potenzialidentifikation",
          dep: "Durable",
          targetLevel: 2,
          description:
            "»Erkennen und Erschliessen von Cross- und Upselling-Potenzialen in bestehenden Kundenbeziehungen. Typische Taetigkeiten: Kundenbedarfe ueber das Kernprodukt hinaus erkennen · Zusatzangebote passend zum Kundenbedarf vorschlagen · Erfolg von Cross-/Upselling-Massnahmen nachhalten«",
          anchors: {
            1: "Erkennt offensichtliche Zusatzbedarfe mit Unterstuetzung.",
            2: "Identifiziert Cross-/Upselling-Potenziale bei Standardkunden eigenstaendig.",
            3: "Erschliesst Potenziale eigenstaendig und systematisch; spricht Zusatzangebote proaktiv an.",
            4: "Entwickelt zielgerichtete Cross-/Upselling-Ansaetze fuer komplexe Accounts.",
            5: "Etabliert eine systematische Cross-/Upselling-Praxis im Team.",
          },
        },
        {
          name: "Business-Case-Bewertung fuer Kooperationen",
          dep: "Evolving",
          targetLevel: 2,
          description:
            "»Bewertung des wirtschaftlichen Nutzens geplanter Kooperationen und Partnerschaften anhand belastbarer Business Cases. Typische Taetigkeiten: Kosten und Nutzen einer Kooperation gegenueberstellen · Annahmen fuer den Business Case transparent machen · Business Case gegenueber internen Entscheidern vertreten«",
          anchors: {
            1: "Traegt Zahlen fuer einen Business Case nach Vorlage zusammen.",
            2: "Erstellt einfache Business Cases eigenstaendig.",
            3: "Erstellt eigenstaendig belastbare Business Cases fuer Kooperationsentscheidungen.",
            4: "Bewertet komplexe Business Cases kritisch; vertritt sie ueberzeugend gegenueber Entscheidern.",
            5: "Definiert Standards fuer die Business-Case-Bewertung im Geschaeftsbereich.",
          },
        },
      ],
    },
    {
      name: "Kommunikation & Zusammenarbeit",
      skills: [
        {
          name: "Kundenbeziehungsmanagement & Kundenpflege",
          dep: "Durable",
          targetLevel: 4,
          keySkill: true,
          description:
            "»Aufbau und Pflege vertrauensvoller, langfristiger Kundenbeziehungen als Grundlage fuer Kundenbindung und Geschaeftswachstum. Typische Taetigkeiten: Regelmaessigen Kontakt zu Schluesselkunden pflegen · Kundenzufriedenheit aktiv erfragen und sichern · Bei Unzufriedenheit fruehzeitig gegensteuern«",
          anchors: {
            1: "Haelt Kundenkontakt auf Anfrage; braucht Unterstuetzung bei der Pflege.",
            2: "Pflegt Kundenkontakt regelmaessig und zuverlaessig.",
            3: "Baut vertrauensvolle Kundenbeziehungen eigenstaendig auf und pflegt sie aktiv.",
            4: "Erkennt Unzufriedenheit fruehzeitig; steuert proaktiv gegen und staerkt die Bindung.",
            5: "Gilt als vertrauenswuerdige Ansprechpartnerin fuer Schluesselkunden; praegt die Kundenkultur.",
          },
        },
        {
          name: "Verhandlungsfuehrung",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Interessen- und sachbezogene Verhandlung mit Kunden und Partnern bei Preisen, Konditionen und Vertragsinhalten. Typische Taetigkeiten: Verhandlungspositionen vorbereiten · Zielkonflikte zwischen Parteien ausgleichen · Verhandlungsergebnisse verbindlich dokumentieren«",
          anchors: {
            1: "Nimmt an Verhandlungen teil; bereitet Unterlagen vor.",
            2: "Fuehrt einfache Verhandlungen eigenstaendig; findet Kompromisse.",
            3: "Verhandelt Preise und Konditionen professionell; nutzt Verhandlungstechniken.",
            4: "Fuehrt komplexe Mehrparteienverhandlungen; sichert Geschaeftsziele.",
            5: "Gilt als Verhandlungsexpertin; coacht andere.",
          },
        },
        {
          name: "Stakeholder- & Partnermanagement",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Abstimmung mit internen Stakeholdern (Product, Finance, Recht) und externen Partnern, um Kooperationen und Accounts erfolgreich zu steuern. Typische Taetigkeiten: Interne Stakeholder frueh in Kooperationsvorhaben einbinden · Erwartungen zwischen internen und externen Partnern ausgleichen · Regelmaessige Abstimmungsformate etablieren«",
          anchors: {
            1: "Nimmt Abstimmungsbedarfe entgegen; braucht Unterstuetzung.",
            2: "Fuehrt Standardabstimmungen eigenstaendig durch.",
            3: "Steuert Stakeholder- und Partnerbeziehungen eigenstaendig und konsistent.",
            4: "Navigiert komplexe Zielkonflikte zwischen mehreren Parteien.",
            5: "Setzt Standards fuer Stakeholder- und Partnerarbeit im Geschaeftsbereich.",
          },
        },
        {
          name: "Praesentation & Angebotskommunikation",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Ueberzeugende Praesentation von Angeboten, Kooperationsmodellen und Geschaeftsergebnissen gegenueber Kunden, Partnern und intern. Typische Taetigkeiten: Angebote und Kooperationsvorschlaege verstaendlich aufbereiten · Praesentationen auf die jeweilige Zielgruppe zuschneiden · Kritische Rueckfragen souveraen beantworten«",
          anchors: {
            1: "Praesentiert nach Vorlage; braucht Unterstuetzung bei Rueckfragen.",
            2: "Bereitet einfache Praesentationen eigenstaendig vor.",
            3: "Praesentiert Angebote und Ergebnisse souveraen und ueberzeugend.",
            4: "Passt Praesentationen zielgruppengerecht an; navigiert kritische Diskussionen.",
            5: "Gilt als Vorbild fuer Angebots- und Geschaeftspraesentationen.",
          },
        },
        { ...RUMP_VERBAL },
      ],
    },
  ],
};

// -----------------------------------------------------------------------------
// Backoffice
// -----------------------------------------------------------------------------

const gfAssistenz: Role = {
  id: "gf-assistenz",
  name: "Geschaeftsfuehrungsassistenz",
  description:
    "Direkte Unterstuetzung der Geschaeftsfuehrung — Terminorganisation, vertrauliche Korrespondenz und Repraesentantion im Aussenkontakt.",
  categories: [
    {
      name: "Fachlich",
      skills: [
        {
          name: "Unternehmens- und Branchenkontext",
          dep: "Durable",
          targetLevel: 2,
          description:
            "»Grundlegendes Verstaendnis der Geschaeftstaetigkeit, Kunden, Partner und des regulatorischen Rahmens des Unternehmens. Nicht gemeint: technisches Fachwissen. Typische Taetigkeiten: Auftraege und Gespraechspartner einordnen · Fachbegriffe in Meetings verstehen · Vertraulichkeitsstufen korrekt zuordnen«",
          anchors: {
            1: "Kennt Grundstruktur und Kernprodukte des Unternehmens; braucht Unterstuetzung beim Einordnen.",
            2: "Erklaert Geschaeftsmodell, wichtige Kunden und Partner; versteht regulatorischen Rahmen grundlegend.",
            3: "Ordnet Termine, Themen und Gespraechspartner eigenstaendig in den Unternehmenskontext ein.",
            4: "Erkennt strategisch relevante Kontexte; bereitet GF-Termine inhaltlich kompetent vor.",
            5: "Gilt als Wissenstraeger fuer Unternehmenskontext; brieft neue Teammitglieder.",
          },
        },
        {
          name: "Datenschutz & Vertraulichkeit (DSGVO)",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Umgang mit personenbezogenen und vertraulichen Daten gemaess DSGVO und internen Geheimhaltungsrichtlinien im Assistenzkontext. Nicht gemeint: rechtliche Beratung. Typische Taetigkeiten: Schutzbedarf von Dokumenten einschaetzen · Datenweitergabe nur an Berechtigte · Loeschverpflichtungen und Archivierungsfristen einhalten«",
          anchors: {
            1: "Haelt Vertraulichkeit ein wenn explizit darauf hingewiesen.",
            2: "Erkennt vertrauliche Informationen eigenstaendig; haelt DSGVO-Grundregeln ein.",
            3: "Handelt diskret ohne Erinnerung; beurteilt Schutzbedarf und schuetzt Daten aktiv.",
            4: "Erkennt Risiken fruehzeitig; empfiehlt Schutzmassnahmen und klaert Unklarheiten.",
            5: "Praegt Vertraulichkeitskultur im Buero; gilt als Ansprechperson fuer Datenschutzfragen.",
          },
        },
        { ...RUMP_DIGITALE, targetLevel: 3 },
      ],
    },
    {
      name: "Technisch",
      skills: [
        {
          name: "MS Office 365 (Outlook, Teams, SharePoint)",
          dep: "Evolving",
          targetLevel: 4,
          keySkill: true,
          description:
            "»Professioneller Einsatz von Outlook (Kalender, Aufgaben, Regeln), Teams (Meetings, Kanaele, Dateien) und SharePoint (Dokumentenbibliotheken, Berechtigungen) fuer den GF-Bereich. Typische Taetigkeiten: GF-Kalender und Wiedervorlagen managen · Teams-Raeume und Meetings einrichten · Dokumente in SharePoint strukturieren und Zugriff steuern«",
          anchors: {
            1: "Bedient die Tools grundlegend; verwaltet einfache Kalendereintraege und E-Mails.",
            2: "Nutzt Standardfunktionen sicher; verwaltet Kalender und Dateien eigenstaendig.",
            3: "Setzt fortgeschrittene Funktionen ein (Regeln, Delegierter Kalender, SharePoint-Berechtigungen).",
            4: "Optimiert GF-Workflows mit Tool-Automatisierungen; konfiguriert SharePoint-Strukturen.",
            5: "Gilt als Tool-Expertin; entwickelt Standards und schult Kolleginnen.",
          },
        },
        {
          name: "Praesentations- & Dokumentensoftware (Word, PowerPoint, Excel)",
          dep: "Evolving",
          targetLevel: 3,
          description:
            "»Professionelle Erstellung und Formatierung von Praesentationen (PowerPoint), Dokumenten (Word) und Tabellen (Excel) im Corporate Design. Typische Taetigkeiten: Board-Praesentationen und Briefings erstellen · Berichte und Vorlagen CI-konform formatieren · Einfache Datenauswertungen und Diagramme aufbereiten«",
          anchors: {
            1: "Erstellt Dokumente nach Vorlage; Formatierung grundlegend.",
            2: "Erstellt und formatiert eigenstaendig; haelt CI ein.",
            3: "Erstellt professionelle Praesentationen und Berichte; passt Inhalte zielgruppengerecht an.",
            4: "Entwickelt Vorlagen und Masterfolien; automatisiert mit Excel-Formeln.",
            5: "Definiert Corporate-Design-Standards; beraet andere.",
          },
        },
        {
          name: "KI-Tools fuer Assistenzaufgaben",
          dep: "Perishable",
          targetLevel: 2,
          trend: "stark steigend",
          description:
            "»Einsatz von KI-Assistenten fuer typische GF-Assistenzaufgaben: Texte formulieren, Meetings transkribieren, Zusammenfassungen erstellen. Nicht gemeint: autonome Nutzung ohne Qualitaetskontrolle. Typische Taetigkeiten: Korrespondenzvorlagen per KI formulieren · Gespraechsmitschriften automatisch aufbereiten · Outputs auf Korrektheit und Ton pruefen«",
          anchors: {
            1: "Kennt KI-Tools dem Namen nach.",
            2: "Nutzt KI-Tools fuer einfache Aufgaben (Texte, Zusammenfassungen); prueft Outputs.",
            3: "Setzt KI gezielt und prompt-optimiert ein; erkennt Qualitaetsmaengel.",
            4: "Etabliert wiederverwendbare Prompt-Vorlagen fuer den GF-Bereich.",
            5: "Definiert KI-Nutzungsstandards im Assistenzbereich.",
          },
        },
      ],
    },
    {
      name: "Methodisch",
      skills: [
        {
          name: "GF-Terminkoordination & Kalendersteuerung",
          dep: "Durable",
          targetLevel: 4,
          keySkill: true,
          description:
            "»Komplexe Terminorganisation fuer die Geschaeftsfuehrung: Priorisierung, Pufferplanung, Koordination mit internen und externen Teilnehmern. Typische Taetigkeiten: GF-Kalender proaktiv steuern · Terminabstimmungen mit mehreren Parteien koordinieren · Puffer, Vor- und Nachbereitungszeiten einplanen«",
          anchors: {
            1: "Pflegt einfache Kalendereintraege; verschickt Einladungen auf Anweisung.",
            2: "Koordiniert Termine eigenstaendig; klaert Verfuegbarkeiten und versendet Einladungen.",
            3: "Steuert komplexe Terminlagen; plant Puffer und Priorisierungen proaktiv.",
            4: "Antizipiert Konfliktpotenziale im Kalender; schuetzt GF-Kapazitaeten strategisch.",
            5: "Gilt als Benchmark fuer GF-Kalendersteuerung; entwickelt Standards.",
          },
        },
        {
          name: "Reisemanagement (national & international)",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Planung und Buchung von Dienstreisen inkl. Reisekostenabrechnung und Reiserichtlinien-Einhaltung. Typische Taetigkeiten: Fluege, Hotels und Transfers buchen · Reisekostenabrechnungen gemaess Richtlinie erstellen · Visa-Anforderungen und Sicherheitshinweise pruefen«",
          anchors: {
            1: "Bucht einfache Inlandsreisen mit Anleitung.",
            2: "Plant und bucht Reisen eigenstaendig; erstellt einfache Abrechnungen.",
            3: "Koordiniert komplexe internationale Reisen; haelt Visa- und Sicherheitsanforderungen ein.",
            4: "Optimiert Reiseprozesse; beraet zu Reiserichtlinien und Ausnahmen.",
            5: "Entwickelt Reisemanagement-Standards; verwaltet Rahmenvertraege mit Dienstleistern.",
          },
        },
        {
          name: "Vor- & Nachbereitung von GF-Terminen",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Inhaltliche und organisatorische Vor- und Nachbereitung von GF-Terminen: Agenda, Unterlagen, Briefings, Protokoll und Aufgaben-Nachverfolgung. Typische Taetigkeiten: Agenden vorbereiten und abstimmen · Praesentationen und Briefings zusammenstellen · Aufgaben und Beschluesse aus Meetings nachverfolgen«",
          anchors: {
            1: "Versieht vorbereitete Materialien; protokolliert nach Vorlage.",
            2: "Bereitet Standardtermine vor; erstellt einfache Protokolle eigenstaendig.",
            3: "Bereitet GF-Termine vollstaendig vor und nach; verfolgt Aufgaben proaktiv nach.",
            4: "Antizipiert Informationsbedarf der GF; erstellt Briefings mit eigenstaendiger Recherche.",
            5: "Entwickelt Vorbereitungsstandards; brieft Vertreterinnen situationsgenau.",
          },
        },
        {
          name: "Dokumentenmanagement & Archivierung",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Strukturiertes Ablegen, Versionieren und Sicherstellen der Auffindbarkeit von GF-Dokumenten (Vertraege, Protokolle) mit korrekter Vertraulichkeitsstufe. Typische Taetigkeiten: Ablagestruktur fuer GF-Dokumente pflegen · Vertragsdokumente korrekt versionieren · Aufbewahrungsfristen einhalten«",
          anchors: {
            1: "Legt Dokumente nach vorgegebener Struktur ab.",
            2: "Pflegt Ablagestruktur eigenstaendig; haelt Versionierung und Fristen ein.",
            3: "Optimiert Ablagestruktur proaktiv; stellt Vertraulichkeit und Auffindbarkeit sicher.",
            4: "Entwirft Dokumentenkonzepte fuer den GF-Bereich; leitet Revision.",
            5: "Definiert Archivierungsstandards; verantwortet Einhaltung der Aufbewahrungspflichten.",
          },
        },
        {
          name: "Veranstaltungsorganisation",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Organisation von internen und externen Veranstaltungen: Kick-offs, Kundenevents, Teamevents. Typische Taetigkeiten: Locations recherchieren und buchen · Einladungsmanagement und Agenda koordinieren · Vor-Ort-Betreuung und Catering organisieren«",
          anchors: {
            1: "Unterstuetzt bei vorbereiteten Veranstaltungen mit Anleitung.",
            2: "Organisiert einfache Teamveranstaltungen eigenstaendig.",
            3: "Plant und fuehrt komplexe Veranstaltungen eigenstaendig durch.",
            4: "Koordiniert hochkaeretige Events mit externen Partnern; managt Budget und Risiken.",
            5: "Entwickelt Veranstaltungsstandards; managt Event-Dienstleister langfristig.",
          },
        },
        {
          name: "Interne Projektkoordination",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Eigenstaendiges Vorantreiben kleinerer interner Projekte und Initiativen — Planung, Aufgabenverteilung, Fortschrittsverfolgung und Ergebnissicherung ohne vollstaendige PM-Rolle. Abgrenzung zur GF-Terminkoordination: Hier geht es um zielorientierte Steuerung ueber laengere Zeitraeume. Typische Taetigkeiten: Aufgaben und Verantwortlichkeiten festlegen und nachverfolgen · Projektfortschritt an GF berichten · Zuarbeiten auf Qualitaet und Vollstaendigkeit pruefen«",
          anchors: {
            1: "Unterstuetzt laufende Projekte; erledigt zugewiesene Aufgaben zuverlaessig.",
            2: "Koordiniert einfache Vorhaben eigenstaendig; haelt Deadlines und Aufgaben nach.",
            3: "Steuert kleinere interne Projekte eigenverantwortlich; eskaliert Hindernisse rechtzeitig.",
            4: "Strukturiert komplexere Vorhaben; prueft Zuarbeiten; berichtet GF entscheidungsreif.",
            5: "Entwickelt Standards fuer interne Projektkoordination; coacht Kolleginnen.",
          },
        },
        {
          name: "Budget-, Rechnungs- & Kostentracking",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Verfolgung von GF-Budget, Reisekosten und Bewirtungsaufwendungen gemaess Richtlinien sowie Bearbeitung von Eingangsrechnungen als Schnittstelle zur Buchhaltung und zum Controlling. Typische Taetigkeiten: Reisekostenabrechnungen pruefen und einreichen · Eingangsrechnungen pruefen, kontieren und zur Freigabe vorbereiten · Budgetuebersichten fuer GF pflegen · Belege revisionssicher ablegen · Rueckfragen der Buchhaltung klaeren«",
          anchors: {
            1: "Reicht vorbereitete Abrechnungen ein; traegt Daten nach Vorlage ein.",
            2: "Erstellt Reisekostenabrechnungen eigenstaendig; prueft Eingangsrechnungen auf formale Richtigkeit.",
            3: "Pflegt GF-Budgetuebersichten; bearbeitet Eingangsrechnungen eigenstaendig; fungiert als Schnittstelle zur Buchhaltung.",
            4: "Analysiert Kostenentwicklung; bereitet Entscheidungsgrundlagen fuer GF vor; klaert Abweichungen mit Controlling.",
            5: "Entwickelt Tracking-Standards; optimiert Abrechnungs- und Rechnungsprozesse.",
          },
        },
      ],
    },
    {
      name: "Kommunikation & Zusammenarbeit",
      skills: [
        {
          name: "Korrespondenz",
          dep: "Durable",
          targetLevel: 4,
          keySkill: true,
          description:
            "»Professionelle schriftliche Kommunikation auf GF-Ebene — intern und extern, in verschiedenen Formaten (E-Mail, Schreiben, kurze Statements). Nicht gemeint: Rechtstexte oder Vertragskorrespondenz. Typische Taetigkeiten: GF-E-Mails formulieren und im Auftrag versenden · Schreiben an Kunden, Partner, Behoerden aufsetzen · Ton und Formalitaet situationsgerecht anpassen«",
          anchors: {
            1: "Formuliert einfache E-Mails; benoetigt Korrekturen.",
            2: "Erstellt professionelle Standardkorrespondenz; haelt Ton und Form ein.",
            3: "Formuliert sicher; passt Ton zielgruppengerecht an.",
            4: "Uebernimmt GF-Korrespondenz eigenstaendig; antizipiert Rueckfragen.",
            5: "Gilt als Sprachvorbild; entwickelt Korrespondenzstandards fuer den GF-Bereich.",
          },
        },
        {
          name: "Praesentationen & Board-Unterlagen",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Aufbereitung von Informationen als Entscheidungsgrundlage fuer GF oder Gesellschafter: Praesentationen, One-Pager, Briefings. Nicht gemeint: inhaltliche Analyse. Typische Taetigkeiten: Praesentationen CI-konform erstellen · Inhalte fuer Nicht-Experten aufbereiten · Daten und Grafiken verstaendlich einbinden«",
          anchors: {
            1: "Befuellt Vorlagen; grundlegende Formatierung.",
            2: "Erstellt eigenstaendig Praesentationen nach CI; Inhalte werden vorgegeben.",
            3: "Strukturiert Inhalte zielgruppengerecht; erstellt ueberzeugende Board-Unterlagen.",
            4: "Reduziert Komplexitaet souveraen; formuliert Handlungsempfehlungen auf Folie.",
            5: "Entwickelt Board-Unterlagen-Standards; coacht andere.",
          },
        },
        {
          name: "Stakeholder-Kontakte (intern & extern)",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Professioneller Umgang mit internen Fuehrungskraeften, externen Partnern und Kunden im Auftrag der GF. Typische Taetigkeiten: Erstkontakt fuer GF-Anfragen herstellen · Weiterleitung und Priorisierung eingehender Anfragen · Repraesentantion des GF-Bueros nach innen und aussen«",
          anchors: {
            1: "Leitet Anfragen auf Anweisung weiter.",
            2: "Kommuniziert eigenstaendig mit internen und einfachen externen Kontakten.",
            3: "Vertritt das GF-Buero souveraen; priorisiert Anfragen eigenstaendig.",
            4: "Navigiert in komplexen Stakeholder-Konstellationen; entlastet GF proaktiv.",
            5: "Gilt als Vertrauensperson fuer interne und externe Schluesselkontakte.",
          },
        },
        {
          name: "Protokollfuehrung auf GF-Ebene",
          dep: "Durable",
          targetLevel: 3,
          keySkill: true,
          description:
            "»Erstellung von Beschluss- und Ergebnisprotokollen fuer GF-Meetings und Gesellschaftersitzungen — revisionssicher, vollstaendig und rechtlich korrekt. Typische Taetigkeiten: Protokolle waehrend oder nach Sitzungen erstellen · Beschluesse eindeutig formulieren und Verantwortlichkeiten festhalten · Protokolle freigeben und revisionssicher ablegen«",
          anchors: {
            1: "Erstellt einfache Gespraechsnotizen nach Vorlage.",
            2: "Protokolliert eigenstaendig; haelt Ergebnisse und Aufgaben fest.",
            3: "Erstellt Beschlussprotokolle; Formulierungen praezise und revisionssicher.",
            4: "Protokolliert Gesellschafterversammlungen; beachtet Rechtspflichten.",
            5: "Gilt als Referenz; entwickelt Protokollstandards fuer GF-Bereich.",
          },
        },
        {
          name: "Diskretion & Integritaet",
          dep: "Durable",
          targetLevel: 4,
          keySkill: true,
          description:
            "»Verantwortungsvoller Umgang mit hochvertraulichen GF-Informationen: Personalentscheidungen, strategische Plaene, Finanzdaten. Aktiver Schutz sensibler Daten im Arbeitsalltag. Typische Taetigkeiten: Vertraulichkeitsgrenzen konsequent einhalten · Sensible Informationen nicht weitergeben · Unklarheiten zu Vertraulichkeit proaktiv klaeren«",
          anchors: {
            1: "Haelt Vertraulichkeit ein wenn explizit angewiesen.",
            2: "Erkennt vertrauliche Themen eigenstaendig; handelt entsprechend.",
            3: "Schuetzt GF-Informationen ohne Erinnerung; lebt Diskretion aktiv vor.",
            4: "Antizipiert Risiken; schuetzt GF-Reputation proaktiv.",
            5: "Gilt als absolute Vertrauensperson; praegt Kultur der Diskretion im Buero.",
          },
        },
        { ...RUMP_VERBAL, targetLevel: 3 },
      ],
    },
  ],
};

const teamassistenz: Role = {
  id: "teamassistenz",
  name: "Teamassistenz",
  description:
    "Zentrale Office-Management-Rolle fuer das gesamte Unternehmen — Bueroinfrastruktur, Terminkoordination, Beschaffung und reibungsloser Bueroalltag.",
  categories: [
    {
      name: "Fachlich",
      skills: [
        {
          name: "Unternehmenskontext & Bueroprozesse",
          dep: "Durable",
          targetLevel: 2,
          description:
            "»Grundlegendes Verstaendnis der Unternehmensstruktur, internen Ablaeufe und Ansprechpartner fuer typische Office-Management-Aufgaben. Nicht gemeint: fachliche oder technische Tiefe. Typische Taetigkeiten: Anfragen an die richtigen Stellen weiterleiten · Interne Prozesse und Zustaendigkeiten kennen · Prioritaeten und Dringlichkeiten einschaetzen«",
          anchors: {
            1: "Kennt grundlegende Unternehmensstruktur; braucht Anleitung beim Einordnen von Anfragen.",
            2: "Kennt interne Ablaeufe, Zustaendigkeiten und Ansprechpartner eigenstaendig.",
            3: "Erkennt Optimierungspotenziale in Bueroprozessen; bringt Verbesserungsvorschlaege ein.",
            4: "Gestaltet interne Prozesse aktiv mit; ist Anlaufstelle fuer organisatorische Fragen.",
            5: "Gilt als Wissensstraeger fuer Unternehmensorganisation; schult neue Mitarbeitende.",
          },
        },
        {
          name: "Datenschutz & Compliance-Grundlagen",
          dep: "Evolving",
          targetLevel: 2,
          description:
            "»Grundlegende Kenntnisse zu DSGVO und internen Compliance-Vorgaben im Office-Alltag: Dokumentenscbutz, Ablageregeln, Datenweitergabe. Nicht gemeint: rechtliche Beratung oder HR-Compliance. Typische Taetigkeiten: Schutzbedarf von Dokumenten einschaetzen · Druckerzeugnisse und physische Post vertraulich behandeln · Neue Mitarbeitende zu Grundregeln informieren«",
          anchors: {
            1: "Haelt Vorgaben ein wenn explizit darauf hingewiesen.",
            2: "Erkennt vertrauliche Informationen eigenstaendig; haelt DSGVO-Grundregeln im Bueroalltag ein.",
            3: "Erklaert Grundregeln anderen; erkennt Luecken und spricht sie an.",
            4: "Bewertet Compliance-Fragen im Buerokontext; empfiehlt Verbesserungen.",
            5: "Definiert Compliance-Standards fuer den Office-Bereich.",
          },
        },
        { ...RUMP_DIGITALE, targetLevel: 2 },
      ],
    },
    {
      name: "Technisch",
      skills: [
        {
          name: "MS Office (Word, Excel, PowerPoint)",
          dep: "Durable",
          targetLevel: 3,
          keySkill: true,
          description:
            "»Sicherer Umgang mit Word (Vorlagen, Formatierung), Excel (Listen, Tabellen, einfache Formeln) und PowerPoint (Praesentationen nach Vorlage). Typische Taetigkeiten: Protokolle und Rundschreiben in Word erstellen · Bestelllisten und Uebersichten in Excel fuehren · Einfache Praesentationen fuer interne Meetings aufbereiten«",
          anchors: {
            1: "Bedient alle drei Programme grundlegend; erstellt Dokumente nach Vorlage.",
            2: "Nutzt Standardfunktionen sicher; erstellt strukturierte Dokumente eigenstaendig.",
            3: "Setzt komplexere Funktionen gezielt ein (Formeln, Querverweise, Vorlagen); arbeitet effizient.",
            4: "Erstellt bueroweite Vorlagen; automatisiert wiederkehrende Aufgaben.",
            5: "Gilt als Ansprechperson fuer Office-Tool-Nutzung; optimiert Arbeitsprozesse.",
          },
        },
        {
          name: "Outlook & Kalendermanagement",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Professioneller Umgang mit Outlook fuer E-Mail-Verwaltung, Terminkoordination und Aufgaben-Tracking. Typische Taetigkeiten: Mehrere Teamkalender pflegen und Termine koordinieren · Wiedervorlagen und Aufgaben in Outlook verwalten · Shared-Mailboxen und Verteiler pflegen«",
          anchors: {
            1: "Liest und versendet E-Mails; legt einfache Termine an.",
            2: "Verwaltet eigene und einfache Teamkalender eigenstaendig; nutzt Standardfunktionen.",
            3: "Koordiniert komplexe Terminlagen; pflegt Shared-Mailboxen und Verteiler.",
            4: "Konfiguriert Outlook-Regeln und Automatisierungen; optimiert Postfach-Workflows.",
            5: "Definiert Outlook-Standards fuer das Unternehmen; schult andere.",
          },
        },
        {
          name: "Microsoft Teams & Kollaborationstools",
          dep: "Evolving",
          targetLevel: 3,
          description:
            "»Sicherer Einsatz von Microsoft Teams fuer Kommunikation, Meetings und Dateiablage im unternehmensweiten Office-Management. Typische Taetigkeiten: Teams-Kanaele und Meetingeinladungen einrichten · Dateien und Informationen in Teams strukturieren · Technische Einstiegshilfe fuer neue Mitarbeitende geben«",
          anchors: {
            1: "Bedient Teams grundlegend; nimmt an Meetings teil.",
            2: "Richtet Meetings ein; teilt Dateien und kommuniziert in Kanaelen eigenstaendig.",
            3: "Verwaltet Kanaele und Dateibereiche; unterstuetzt andere bei der Tool-Nutzung.",
            4: "Konfiguriert Teams-Strukturen unternehmeweit; integriert Teams in Bueroprozesse.",
            5: "Definiert Nutzungsstandards; beraet bei Tool-Entscheidungen.",
          },
        },
        {
          name: "KI-Tools fuer Bueroaufgaben",
          dep: "Perishable",
          targetLevel: 2,
          trend: "stark steigend",
          description:
            "»Einsatz von KI-Assistenten fuer typische Office-Aufgaben: Texte formulieren, Zusammenfassungen erstellen, Anfragen bearbeiten. Nicht gemeint: autonome Nutzung ohne Pruefung. Typische Taetigkeiten: Rundschreiben und Ankuendigungen per KI formulieren · Besprechungsnotizen automatisch aufbereiten · Outputs auf Korrektheit pruefen«",
          anchors: {
            1: "Kennt KI-Tools dem Namen nach.",
            2: "Nutzt KI fuer einfache Texte und Zusammenfassungen; prueft Outputs.",
            3: "Setzt KI gezielt fuer Bueroaufgaben ein; optimiert Prompts situativ.",
            4: "Etabliert wiederverwendbare Prompt-Vorlagen fuer Office-Aufgaben.",
            5: "Definiert KI-Nutzungsstandards im Office-Bereich.",
          },
        },
      ],
    },
    {
      name: "Methodisch",
      skills: [
        {
          name: "Bueroorganisation & Office Management",
          dep: "Durable",
          targetLevel: 3,
          keySkill: true,
          description:
            "»Sicherstellung eines reibungslosen Bueroalltags fuer das gesamte Unternehmen: Infrastruktur, Ausstattung, Ablaeufe und Anlaufstelle fuer organisatorische Fragen. Typische Taetigkeiten: Bueroinfrastruktur pflegen und Maengel melden · Arbeitsplaetze fuer neue Mitarbeitende vorbereiten · Regelmaessige Bueroaufgaben koordinieren und delegieren«",
          anchors: {
            1: "Erledigt vorgegebene Bueroaufgaben; braucht Anleitung bei Priorisierung.",
            2: "Haelt den Bueroalltag eigenstaendig am Laufen; erkennt offensichtliche Maengel.",
            3: "Organisiert Bueroinfrastruktur proaktiv; ist zuverlaessige Anlaufstelle fuer das Team.",
            4: "Optimiert Bueroprozesse; antizipiert Bedarfe bevor sie zum Problem werden.",
            5: "Entwickelt Office-Management-Standards; gilt als Dreh- und Angelpunkt des Unternehmens.",
          },
        },
        {
          name: "Terminkoordination & Raumplanung",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Koordination von Terminen, Meetingraeumen und Veranstaltungsinfrastruktur fuer das gesamte Unternehmen. Typische Taetigkeiten: Raeume und Ressourcen fuer Meetings buchen · Interne Terminabstimmungen unterstuetzen · Raumkalender pflegen und Konflikte loesen«",
          anchors: {
            1: "Pflegt einfache Raumkalender; bucht Raeume auf Anweisung.",
            2: "Koordiniert Raeume und Termineinladungen eigenstaendig.",
            3: "Steuert Raumplanung unternehmeweit; loest Konflikte proaktiv.",
            4: "Optimiert Raum- und Ressourcennutzung; plant Kapazitaeten vorausschauend.",
            5: "Entwickelt Standards fuer Raum- und Terminmanagement.",
          },
        },
        {
          name: "Beschaffung & Bestellwesen",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Beschaffung von Bueromaterial, IT-Verbrauchsmaterial und sonstigen Betriebsmitteln — von der Bedarfserfassung bis zur Lieferantenkoordination. Typische Taetigkeiten: Materialbestaende pruefen und Bestellungen ausloesen · Lieferanten kontaktieren und Lieferungen verfolgen · Rechnungen pruefen und zur Freigabe weiterleiten«",
          anchors: {
            1: "Loest Bestellungen auf Anweisung aus; traegt Lieferungen ein.",
            2: "Bestellt eigenstaendig nach Vorgabe; koordiniert einfache Lieferantenrueckfragen.",
            3: "Bewertet Bedarfe proaktiv; steuert Beschaffungsprozesse von A bis Z.",
            4: "Optimiert Beschaffungsprozesse; verwaltet Lieferantenbeziehungen und Konditionen.",
            5: "Entwickelt Beschaffungsstandards; bewertet Lieferanten strategisch.",
          },
        },
        {
          name: "Onboarding-Unterstuetzung",
          dep: "Durable",
          targetLevel: 2,
          description:
            "»Organisatorische Unterstuetzung beim Onboarding neuer Mitarbeitender: Arbeitsplatz, Ausstattung, Zugaenge und erste Orientierung. Nicht gemeint: HR-fachliches Onboarding. Typische Taetigkeiten: Arbeitsplaetze einrichten und Ausstattung bereitstellen · Neue Mitarbeitende zu Bueroinfrastruktur einfuehren · Checklisten fuer Onboarding-Tag koordinieren«",
          anchors: {
            1: "Bereitet vorgegebene Onboarding-Aufgaben vor; braucht Anleitung.",
            2: "Richtet Arbeitsplaetze eigenstaendig ein; fuehrt Onboarding-Checklisten durch.",
            3: "Koordiniert Onboarding-Tag vollstaendig; ist erste Anlaufstelle fuer neue Mitarbeitende.",
            4: "Optimiert Onboarding-Prozesse; stimmt sich proaktiv mit HR und IT ab.",
            5: "Entwickelt Onboarding-Standards; schult andere bei der Durchfuehrung.",
          },
        },
        {
          name: "Reise- & Spesensupport",
          dep: "Durable",
          targetLevel: 2,
          description:
            "»Unterstuetzung des Teams bei Dienstreisebuchungen und Spesenabrechnungen. Nicht gemeint: GF-seitiges Reisemanagement oder strategische Reiserichtlinien. Typische Taetigkeiten: Hotel- und Bahnbuchungen fuer Teammitglieder durchfuehren · Spesenabrechnungen aufnehmen und weiterleiten · Reisekostenbelege zusammenstellen und pruefen«",
          anchors: {
            1: "Fuehrt Buchungen und Abrechnungen auf Anweisung durch.",
            2: "Unterstuetzt das Team eigenstaendig bei Buchungen und Spesenbelegen.",
            3: "Steuert Reise- und Spesenprozess fuer das gesamte Team; erklaert Vorgaben.",
            4: "Optimiert Buchungsprozesse; prueft und verbessert Abrechnungsvorlagen.",
            5: "Entwickelt Reiseprozess-Standards; verhandelt mit Reiseanbietern.",
          },
        },
        {
          name: "Ablage, Archivierung & Postbearbeitung",
          dep: "Durable",
          targetLevel: 2,
          description:
            "»Strukturiertes Ablegen, Auffindbarhalten und Weiterleiten von Dokumenten sowie Bearbeitung eingehender und ausgehender Post. Typische Taetigkeiten: Dokumente physisch und digital nach Ablagestruktur einordnen · Archivierungsfristen und Versionierung einhalten · Eingehende Post sichten und weiterleiten«",
          anchors: {
            1: "Legt Dokumente nach Vorgabe ab; nimmt Post entgegen und leitet auf Anweisung weiter.",
            2: "Pflegt Ablagestruktur und Postfluss eigenstaendig; haelt Fristen und Versionierung ein.",
            3: "Optimiert Ablage- und Postprozesse; erkennt eilige oder vertrauliche Vorgaenge.",
            4: "Entwirft Ablagekonzepte; entwickelt Regeln fuer vertrauliche Sendungen.",
            5: "Definiert Standards fuer Dokumentenmanagement und Postverwaltung.",
          },
        },
        {
          name: "Protokollierung",
          dep: "Durable",
          targetLevel: 2,
          description:
            "»Erstellung strukturierter Protokolle fuer interne Meetings und Besprechungen. Nicht gemeint: Beschlussprotokolle auf GF- oder Gremienebene. Typische Taetigkeiten: Ergebnisse und Aufgaben in Meetings festhalten · Protokoll nach vorgegebener Vorlage erstellen und verteilen · Offene Punkte nachverfolgen«",
          anchors: {
            1: "Notiert Stichpunkte; braucht Unterstuetzung beim Strukturieren.",
            2: "Protokolliert eigenstaendig; erfasst Ergebnisse und Aufgaben vollstaendig.",
            3: "Erstellt zielgruppengerechte Protokolle; unterscheidet relevante von irrelevanten Inhalten.",
            4: "Erstellt strukturierte Protokolle fuer komplexere Meetings; bewertet Qualitaet anderer Protokolle.",
            5: "Definiert Protokollstandards fuer den Office-Bereich.",
          },
        },
      ],
    },
    {
      name: "Kommunikation & Zusammenarbeit",
      skills: [
        {
          name: "Dienstleister- & Lieferantenkoordination",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Kommunikation und Koordination mit externen Dienstleistern, Lieferanten und Handwerkern im Rahmen des Office Managements. Typische Taetigkeiten: Dienstleister bei Stoerungen und Wartungen kontaktieren · Angebote einholen und weiterleiten · Termine mit externen Partnern koordinieren«",
          anchors: {
            1: "Kontaktiert Dienstleister auf Anweisung; leitet Informationen weiter.",
            2: "Kommuniziert mit Standarddienstleistern eigenstaendig; klaert einfache Rueckfragen.",
            3: "Koordiniert mehrere Dienstleister parallel; klaert Stoerungen proaktiv.",
            4: "Bewertet Dienstleisterleistungen; handelt einfache Konditionen nach.",
            5: "Verwaltet Dienstleisterbeziehungen strategisch; entwickelt Auswahlkriterien.",
          },
        },
        {
          name: "Interne Kommunikation & Informationsfluss",
          dep: "Durable",
          targetLevel: 2,
          description:
            "»Sicherstellen, dass relevante Informationen zuverlaessig und zeitnah an die richtigen Personen gelangen. Typische Taetigkeiten: Ankuendigungen und Rundinformationen verteilen · Weiterleitung von Anfragen an zustaendige Stellen · Kurze interne Updates formulieren und versenden«",
          anchors: {
            1: "Gibt Informationen auf Anweisung weiter.",
            2: "Sorgt eigenstaendig fuer Informationsfluss im Unternehmen; formuliert kurze Updates.",
            3: "Antizipiert Informationsbedarf; kommuniziert proaktiv und adressatengerecht.",
            4: "Gestaltet interne Kommunikationskanaele aktiv mit; verbessert Informationsfluss.",
            5: "Entwickelt Standards fuer interne Kommunikation im Office-Bereich.",
          },
        },
        { ...RUMP_VERBAL, targetLevel: 2 },
      ],
    },
  ],
};

const hrGeneralist: Role = {
  id: "hr-generalist",
  name: "HR Generalistin",
  description:
    "Ganzheitliche HR-Betreuung fuer red6-interne Mitarbeitende — Administration, Arbeitsrecht, Mitarbeiter-Lifecycle und Anlaufstelle fuer alle HR-Fragen.",
  categories: [
    {
      name: "Fachlich",
      skills: [
        {
          name: "Arbeitsrecht (DE)",
          dep: "Durable",
          targetLevel: 3,
          keySkill: true,
          description:
            "»Kenntnisse des deutschen Arbeitsrechts fuer den HR-Alltagsbetrieb: Vertragsrecht, Kuendigungsschutz, Arbeitszeit, Urlaub. Nicht gemeint: anwaltliche Beratung oder Gerichtsverfahren. Typische Taetigkeiten: Arbeitsvertraege auf Rechtskonformitaet pruefen · Rechtliche Einordnung bei Sonderfaellen (Kuendigung, Abmahnung) · Externe Rechtsberatung zuziehen wenn noetig«",
          anchors: {
            1: "Kennt arbeitsrechtliche Grundbegriffe; braucht Unterstuetzung bei der Einordnung.",
            2: "Erklaert gaengige arbeitsrechtliche Regelungen; bearbeitet Standardfaelle mit Unterstuetzung.",
            3: "Bewertet Standard-HR-Faelle eigenstaendig; erkennt wann externe Beratung erforderlich ist.",
            4: "Loest komplexere Faelle sicher; beraet Fuehrungskraefte zu arbeitsrechtlichen Fragen.",
            5: "Gilt als arbeitsrechtliche Referenz im Unternehmen; schuetzt das Unternehmen proaktiv vor Risiken.",
          },
        },
        {
          name: "Tarifvertrag & Betriebsvereinbarungen",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Kenntnis geltender Tarifvertraege und Betriebsvereinbarungen sowie deren Anwendung im HR-Alltag. Nicht gemeint: Verhandlung von Tarifvertraegen. Typische Taetigkeiten: Relevante Regelungen fuer konkrete Faelle nachschlagen · Mitarbeitende zu geltenden Regelungen informieren · Abweichungen und Ausnahmen korrekt dokumentieren«",
          anchors: {
            1: "Kennt Existenz von Tarifvertraegen; braucht Hilfe bei der Anwendung.",
            2: "Schlaegt relevante Regelungen eigenstaendig nach; beantwortet Standardfragen.",
            3: "Wendet Tarifvertrag und Betriebsvereinbarungen sicher an; erkennt Grenzfaelle.",
            4: "Bewertet Einzelfaelle im Lichte mehrerer Regelwerke; beraet Fuehrungskraefte.",
            5: "Gilt als Expertin fuer Tarifrecht; unterstuetzt bei Aushandlung von Betriebsvereinbarungen.",
          },
        },
        {
          name: "Sozialversicherungs- und Lohnsteuerrecht",
          dep: "Evolving",
          targetLevel: 4,
          keySkill: true,
          description:
            "»Tiefgehende und anwendungsorientierte Kenntnisse im Sozialversicherungs-, Lohnsteuer- und Entgeltrecht — Grundlage fuer die rechtssichere Beurteilung von Sonderfaellen und die Beratung von Fuehrungskraeften zu abrechnungsrelevanten Fragestellungen. Nicht gemeint: die operative Durchfuehrung der Abrechnung selbst (siehe Gehaltsabrechnung). Typische Taetigkeiten: Steuer- und sozialversicherungsrechtliche Sachverhalte beurteilen · Sonderfaelle und Einmalzahlungen rechtlich einordnen · gesetzliche Aenderungen auf ihre Abrechnungsrelevanz pruefen · Fuehrungskraefte und Mitarbeitende zu abrechnungsrelevanten Fragestellungen beraten«",
          anchors: {
            1: "Kennt Grundbegriffe (SV-Pflicht, Beitragsgruppen, Steuerklassen); braucht Unterstuetzung bei der rechtlichen Einordnung.",
            2: "Versteht die wesentlichen Regelungen; erkennt Standardfaelle und weiss, wann eine fachliche Pruefung erforderlich ist.",
            3: "Beurteilt gaengige Sonderfaelle und Einmalzahlungen rechtlich sicher; leitet Konsequenzen fuer die Abrechnung korrekt ab.",
            4: "Analysiert steuer- und sozialversicherungsrechtliche Auswirkungen komplexer Faelle; erkennt Risiken und beraet Fuehrungskraefte fundiert; setzt gesetzliche Aenderungen eigenstaendig in Bewertungsregeln um.",
            5: "Definiert rechtssichere Beurteilungsstandards fuer Sonderfaelle; vertritt das Unternehmen bei sozialversicherungs- und steuerrechtlichen Grundsatzfragen gegenueber Behoerden.",
          },
        },
        {
          name: "DSGVO im HR-Kontext",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Datenschutzkonforme Verarbeitung von Mitarbeiterdaten im gesamten Mitarbeiter-Lifecycle: Bewerbung, Beschaeftigung, Austritt. Typische Taetigkeiten: Personalakten datenschutzkonform fuehren und archivieren · Mitarbeitende ueber ihre Datenschutzrechte informieren · Loeschfristen und Zugriffsrechte einhalten«",
          anchors: {
            1: "Haelt DSGVO-Vorgaben ein wenn explizit darauf hingewiesen.",
            2: "Verarbeitet Mitarbeiterdaten grundsaetzlich DSGVO-konform; kennt Grundpflichten.",
            3: "Setzt DSGVO-Anforderungen im HR-Alltag eigenstaendig um; erkennt Verstossrisiken.",
            4: "Bewertet neue HR-Prozesse auf Datenschutzkonformitaet; klaert Grauzonen.",
            5: "Gilt als Datenschutzexpertin fuer den HR-Bereich; entwickelt datenschutzkonforme Prozesse.",
          },
        },
        {
          name: "Mutterschutz & Elternzeit",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Kenntnisse des Mutterschutzgesetzes und BEEG fuer die operative Begleitung von Schwangerschaft, Mutterschutz und Elternzeit im Unternehmen. Typische Taetigkeiten: Mutterschutzfristen berechnen und Behoerden informieren · Elternzeitantraege pruefen und Wiedereinstieg begleiten · Beschaeftigungsverbote korrekt umsetzen«",
          anchors: {
            1: "Kennt gesetzliche Grundlagen; braucht Unterstuetzung bei der Umsetzung.",
            2: "Begleitet einfache Faelle eigenstaendig; kennt Fristen und Meldepflichten.",
            3: "Steuert Mutterschutz- und Elternzeitprozesse vollstaendig; beraet Mitarbeitende sicher.",
            4: "Loest Sonderfaelle (Kuendigung waehrend Elternzeit, Teilzeit-Elternzeit) eigenstaendig.",
            5: "Gilt als Expertin; beraet Fuehrungskraefte proaktiv zu Planungsimplikationen.",
          },
        },
        {
          name: "Arbeitsschutz",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Koordination und operative Umsetzung von Arbeitsschutzpflichten im Unternehmen — als Schnittstelle zwischen Mitarbeitenden, Sicherheitsbeauftragtem und Betriebsaerztin. Nicht gemeint: fachliche Gefaehrdungsbeurteilung selbst durchfuehren (Aufgabe des Sicherheitsbeauftragten). Typische Taetigkeiten: Arbeitsunfaelle an die VBG und den Sicherheitsbeauftragten melden · ASA-Sitzungen mit Sicherheitsbeauftragtem und Betriebsaerztin koordinieren · Regelmaessige Sicherheitsschulungen sicherstellen und neue Mitarbeitende einweisen«",
          anchors: {
            1: "Meldet Arbeitsunfaelle nach Anleitung; braucht Unterstuetzung bei Ablaeufen.",
            2: "Koordiniert Standard-Meldungen und Schulungstermine eigenstaendig.",
            3: "Steuert Arbeitsschutzprozesse vollstaendig; ist zentrale Ansprechpartnerin fuer Sicherheitsbeauftragten und Betriebsaerztin.",
            4: "Erkennt Optimierungsbedarf in Praeventionsmassnahmen; beraet Fuehrungskraefte proaktiv.",
            5: "Entwickelt Arbeitsschutzstandards; vertritt das Unternehmen bei Audits und Behoerdenkontakten.",
          },
        },
        { ...RUMP_DIGITALE, targetLevel: 2 },
      ],
    },
    {
      name: "Technisch",
      skills: [
        {
          name: "HR-Software (HRIS)",
          dep: "Evolving",
          targetLevel: 3,
          keySkill: true,
          description:
            "»Sicherer Umgang mit HR-Informationssystemen fuer Personaladministration, Zeiterfassung und Dokumentenmanagement (z. B. Personio, Workday, SAP HCM) — inkl. Mitwirkung bei System-Auswahl und -Einführung. Typische Taetigkeiten: Stammdaten pflegen und Aenderungen einpflegen · Berichte und Auswertungen erstellen · Neue Mitarbeitende im System anlegen und Austritte verarbeiten · Anforderungen an ein neues HRIS erheben und Einfuehrungsprozess begleiten«",
          anchors: {
            1: "Bedient das HRIS grundlegend; legt Stammdaten mit Anleitung an.",
            2: "Pflegt Stammdaten und fuehrt Standardprozesse eigenstaendig durch.",
            3: "Nutzt HRIS vollstaendig fuer den HR-Lifecycle; erstellt Berichte und Auswertungen.",
            4: "Konfiguriert Workflows und Berechtigungen; begleitet System-Einfuehrungen als Key User.",
            5: "Ist System-Admin; bewertet und verantwortet HRIS-Auswahl, -Einfuehrung und -Qualitaet.",
          },
        },
        {
          name: "KI-Tools im HR-Kontext",
          dep: "Perishable",
          targetLevel: 2,
          trend: "stark steigend",
          description:
            "»Einsatz von KI-Assistenten fuer HR-Aufgaben: Stellenanzeigen formulieren, Zeugnisse erstellen, HR-Texte strukturieren. Nicht gemeint: autonome Entscheidungen per KI treffen. Typische Taetigkeiten: Zeugnistexte per KI vorformulieren und pruefen · Stellenausschreibungen mit KI-Unterstuetzung erstellen · HR-Kommunikation (Absagen, Angebote) per KI formulieren«",
          anchors: {
            1: "Kennt KI-Tools dem Namen nach.",
            2: "Nutzt KI fuer HR-Texte und Standarddokumente; prueft Outputs auf Korrektheit.",
            3: "Setzt KI gezielt fuer verschiedene HR-Dokumenttypen ein; optimiert Prompts.",
            4: "Etabliert KI-gestuetzte Vorlagen fuer gaengige HR-Dokumente.",
            5: "Definiert KI-Nutzungsstandards fuer den HR-Bereich.",
          },
        },
      ],
    },
    {
      name: "Methodisch",
      skills: [
        {
          name: "Vertragsmanagement & HR-Dokumente",
          dep: "Durable",
          targetLevel: 3,
          keySkill: true,
          description:
            "»Erstellung, Pruefung und Verwaltung von Arbeitsvertraegen, Zusatzvereinbarungen, Abmahnungen und sonstigen HR-Dokumenten. Typische Taetigkeiten: Vertraege nach Vorlage erstellen und an Sonderfaelle anpassen · Dokumente auf rechtliche Korrektheit pruefen · Unterzeichnete Originale revisionssicher ablegen«",
          anchors: {
            1: "Erstellt einfache Dokumente nach Vorlage; braucht Pruefung.",
            2: "Erstellt Standardvertraege und -dokumente eigenstaendig.",
            3: "Passt Vertraege an Sonderfaelle an; prueft eigenstaendig auf Vollstaendigkeit und Rechtssicherheit.",
            4: "Erstellt komplexe Vertragswerke; erkennt rechtliche Risiken proaktiv.",
            5: "Entwickelt Vertragsvorlagen und -standards; gilt als Referenz fuer Vertragsfragen.",
          },
        },
        {
          name: "Personalaktenfuehrung",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Fuehrung vollstaendiger, revisionssicherer Personalakten — physisch und digital — gemaess gesetzlichen und internen Anforderungen. Typische Taetigkeiten: Personalakten anlegen, ergaenzen und archivieren · Vollstaendigkeit und Aktualitaet sicherstellen · Aufbewahrungsfristen einhalten und Loeschung dokumentieren«",
          anchors: {
            1: "Legt Dokumente nach Vorgabe ab; braucht Anleitung bei Struktur.",
            2: "Fuehrt Personalakten eigenstaendig; haelt Fristen und Ablagestruktur ein.",
            3: "Sichert Vollstaendigkeit und Aktualitaet proaktiv; erkennt fehlende Dokumente.",
            4: "Entwickelt Strukturen fuer digitale Personalakten; stellt Revision sicher.",
            5: "Definiert Aktenstandards; verantwortet Einhaltung gesetzlicher Anforderungen.",
          },
        },
        {
          name: "Zeiterfassung & Urlaubsverwaltung",
          dep: "Durable",
          targetLevel: 3,
          keySkill: true,
          description:
            "»Administration von Arbeitszeitkonten, Urlaubsanspruechen und Abwesenheiten im HRIS. Typische Taetigkeiten: Urlaubsantraege pruefen und genehmigen · Zeitkonten auf Korrektheit pruefen · Abwesenheitstypen (Krankheit, Sonderurlaub) korrekt erfassen · Wiedereingliederungsverfahren (BEM) nach laengerer Krankheit begleiten«",
          anchors: {
            1: "Erfasst Abwesenheiten nach Vorgabe; braucht Unterstuetzung bei Sonderfaellen.",
            2: "Verwaltet Urlaubs- und Zeitkonten eigenstaendig fuer Standardfaelle.",
            3: "Loest Sonderfaelle (Uebertrag, Teilzeit, Krankheit) eigenstaendig; begleitet BEM-Verfahren; prueft Konten proaktiv.",
            4: "Erkennt systemische Fehler und Optimierungspotenziale; beraet Fuehrungskraefte.",
            5: "Entwickelt Prozessstandards fuer Zeiterfassung; schult andere.",
          },
        },
        {
          name: "Gehaltsabrechnung",
          dep: "Durable",
          targetLevel: 3,
          keySkill: true,
          description:
            "»Eigenstaendige Durchfuehrung der monatlichen Gehaltsabrechnung inkl. Pflege der Personal- und Abrechnungssysteme. Typische Taetigkeiten: Gehaltsanpassungen und Arbeitszeitveraenderungen (z. B. Stundenreduzierung, -erhoehung) im Personal- und Rechnungssystem umsetzen · Mit der Abrechnungsstelle, Aemtern, Sozialversicherungstraegern und Finanzaemtern kommunizieren · Abrechnungsergebnisse auf Plausibilitaet pruefen«",
          anchors: {
            1: "Fuehrt einzelne Abrechnungsschritte nach Anleitung durch; braucht Pruefung.",
            2: "Bearbeitet Standardfaelle (Gehaltsanpassungen, Arbeitszeitaenderungen) eigenstaendig.",
            3: "Fuehrt die monatliche Gehaltsabrechnung vollstaendig und eigenstaendig durch; klaert Ruecksprachen mit Aemtern und Sozialversicherungstraegern.",
            4: "Loest komplexe Abrechnungsfaelle eigenstaendig; optimiert Abrechnungsprozesse.",
            5: "Gilt als Abrechnungsexpertin; entwickelt Abrechnungsstandards und vertritt das Unternehmen gegenueber Behoerden bei Grundsatzfragen.",
          },
        },
        {
          name: "Onboarding-Prozesse",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Planung und Durchfuehrung des HR-seitigen Onboardings: Vertragsunterlagen, Systemzugaenge, Willkommensprozess und erste Begleitung. Nicht gemeint: fachliches Einarbeiten (Aufgabe der Fuehrungskraft). Typische Taetigkeiten: Onboarding-Checklisten fuer neue Mitarbeitende vorbereiten · Ersten Arbeitstag organisieren und begleiten · Vertragsunterlagen und Nachweise vollstaendig einsammeln«",
          anchors: {
            1: "Bereitet vorgegebene Onboarding-Aufgaben vor; braucht Anleitung.",
            2: "Fuehrt Onboarding-Checklisten eigenstaendig durch.",
            3: "Gestaltet Onboarding vollstaendig und proaktiv; passt Prozess an Sonderfaelle an.",
            4: "Optimiert Onboarding-Erlebnis; stimmt sich proaktiv mit IT, Fuehrungskraft und Office ab.",
            5: "Entwickelt Onboarding-Standards; misst und verbessert Onboarding-Qualitaet.",
          },
        },
        {
          name: "Offboarding & Zeugniserstellung",
          dep: "Durable",
          targetLevel: 3,
          keySkill: true,
          description:
            "»Strukturierter Abschlussprozess beim Austritt: Kuendigungsbearbeitung, Resturlaubsberechnung, Zeugniserstellung und Systemabmeldung. Typische Taetigkeiten: Austrittsprozesse fristgerecht einleiten · Qualifizierte Arbeitszeugnisse verfassen · Systemzugaenge koordiniert deaktivieren lassen«",
          anchors: {
            1: "Unterstuetzt beim Offboarding mit Anleitung; braucht Pruefung.",
            2: "Fuehrt Offboarding-Checklisten eigenstaendig durch; erstellt einfache Zeugnisse.",
            3: "Steuert Offboarding vollstaendig; erstellt qualifizierte Zeugnisse eigenstaendig.",
            4: "Koordiniert komplexe Abgaengerfaelle (Kuendigung durch AG, Aufhebung) eng mit externer Rechtsberatung; beraet Fuehrungskraefte.",
            5: "Gilt als Referenz fuer den Offboarding-Prozess; entwickelt Offboarding-Standards.",
          },
        },
        {
          name: "HR-Reporting & People Analytics",
          dep: "Evolving",
          targetLevel: 3,
          description:
            "»Aufbereitung, Interpretation und Kommunikation von HR-Kennzahlen als Grundlage fuer Managemententscheidungen. Typische Taetigkeiten: Regelmaessige HR-Berichte erstellen (Fluktuation, Krankenquote, Headcount) · Kennzahlen interpretieren und Auffaelligkeiten erklaeren · Massnahmen auf Basis von Daten vorschlagen und Wirkung messen«",
          anchors: {
            1: "Erstellt einfache Auswertungen aus dem HRIS nach Vorlage.",
            2: "Erstellt HR-Berichte eigenstaendig; erkennt offensichtliche Auffaelligkeiten.",
            3: "Interpretiert Kennzahlen ursaechengenau; leitet Massnahmenempfehlungen ab.",
            4: "Entwickelt HR-Kennzahlensystem; beraet Fuehrungskraefte auf Datenbasis.",
            5: "Definiert People-Analytics-Standards; verankert datenbasierte HR-Steuerung im Unternehmen.",
          },
        },
        {
          name: "HR-Prozessgestaltung & Projektarbeit",
          dep: "Evolving",
          targetLevel: 2,
          description:
            "»Aktive Mitgestaltung und Optimierung von HR-Prozessen sowie Mitarbeit in HR-Projekten (z. B. Tool-Einfuehrungen, Benefits-Weiterentwicklung). Nicht gemeint: strategische HR-Planung. Typische Taetigkeiten: Optimierungspotenziale in bestehenden HR-Ablaeufen erkennen und vorschlagen · Anforderungen fuer neue HR-Tools erheben und testen · Umsetzung von HR-Initiativen koordinieren«",
          anchors: {
            1: "Fuehrt definierte Prozesse aus; gibt Verbesserungsideen auf Nachfrage.",
            2: "Erkennt Optimierungspotenziale eigenstaendig; bringt sich aktiv in HR-Projekte ein.",
            3: "Gestaltet HR-Prozesse eigenverantwortlich mit; koordiniert kleinere HR-Projekte.",
            4: "Leitet HR-Projekte (z. B. Tool-Einfuehrung); setzt Prozessveraenderungen strukturiert um.",
            5: "Entwickelt HR-Prozessstandards; positioniert HR als internen Treiber von Verbesserungen.",
          },
        },
      ],
    },
    {
      name: "Kommunikation & Zusammenarbeit",
      skills: [
        {
          name: "Mitbestimmung & Gremienarbeit",
          dep: "Durable",
          targetLevel: 2,
          description:
            "»Kenntnisse zu Mitbestimmungsrechten und die Faehigkeit, mit internen Gremien und Mitarbeitendenvertretungen professionell zusammenzuarbeiten. Nicht gemeint: Verhandlungsfuehrung oder Rechtsvertretung. Typische Taetigkeiten: Mitbestimmungspflichtige Massnahmen erkennen · Beteiligungsprozesse fristgerecht einleiten · Ergebnisse und Vereinbarungen dokumentieren«",
          anchors: {
            1: "Kennt Grundzuege der Mitbestimmung; braucht Unterstuetzung bei der Anwendung.",
            2: "Erkennt mitbestimmungspflichtige Sachverhalte; leitet Prozesse korrekt ein.",
            3: "Begleitet Abstimmungsprozesse eigenstaendig; kommuniziert sachlich und loesungsorientiert.",
            4: "Navigiert in komplexen Mitbestimmungsfragen; erarbeitet konsentierte Loesungen.",
            5: "Gilt als Expertin fuer Mitbestimmungsrecht; gestaltet Gremienbeziehungen strategisch.",
          },
        },
        {
          name: "Mitarbeitergespraeche fuehren",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Fachliche Begleitung und eigenstaendige Fuehrung von HR-Gespraechen: Onboarding-Gespraeche, Rueckkehrgespraeche, Klaargespraeche und HR-Beratungsgespraeche. Nicht gemeint: Jahresmitarbeitergespraeche (Aufgabe der Fuehrungskraft). Typische Taetigkeiten: Mitarbeitende zu HR-Fragen beraten · Rueckkehrgespraeche nach laengerer Abwesenheit fuehren · Sensible Themen diskret und sachlich ansprechen«",
          anchors: {
            1: "Fuehrt einfache Gespraeche nach Leitfaden; braucht Coaching.",
            2: "Fuehrt Standardgespraeche eigenstaendig; haelt Ergebnisse fest.",
            3: "Fuehrt auch schwierige Gespraeche sicher; bleibt sachlich und empathisch.",
            4: "Begleitet Fuehrungskraefte bei herausfordernden HR-Gespraechen; coacht situativ.",
            5: "Gilt als Gespraechsexpertin; entwickelt Gespraechsleitfaeden und schult andere.",
          },
        },
        { ...RUMP_VERBAL, targetLevel: 3 },
      ],
    },
  ],
};

const hrBusinessPartner: Role = {
  id: "hr-business-partner",
  name: "HR Business Partner",
  description:
    "Strategische HR-Partnerin fuer Geschaeftsfuehrung und Leads — verantwortet Personalplanung, Verguetungsgestaltung und Recruiting-Strategie ueber den gesamten Employee Lifecycle.",
  categories: [
    {
      name: "Fachlich",
      skills: [
        {
          name: "Strategische Personalplanung & Workforce Planning",
          dep: "Durable",
          targetLevel: 4,
          keySkill: true,
          description:
            "»Vorausschauende Planung des Personalbedarfs auf Basis von Unternehmenszielen, Wachstumsplaenen und Markttrends — als Grundlage fuer Recruiting-Priorisierung und HR-Budgetplanung. Typische Taetigkeiten: Personalbedarfsplanung fuer alle Bereiche mit GF und Leads abstimmen · Stellenprofile fuer kuenftige Bedarfe entwickeln · Wachstumsszenarien auf Personalkosten und -verfuegbarkeit hin bewerten«",
          anchors: {
            1: "Kennt Grundbegriffe der Personalplanung; unterstuetzt auf Anfrage.",
            2: "Erstellt einfache Personalbedarfsuebersichten; stimmt sich reaktiv mit GF ab.",
            3: "Plant Personalbedarfe systematisch; leitet Priorisierungen fuer Recruiting ab.",
            4: "Entwickelt eigenstaendig Workforce-Szenarien; beraet GF bei strategischen Personalentscheidungen.",
            5: "Definiert Planungsmethodik; gilt als strategische Sparringspartnerin auf Unternehmensebene.",
          },
        },
        {
          name: "Verguetungsmanagement & Gehaltsbandentwicklung",
          dep: "Durable",
          targetLevel: 4,
          keySkill: true,
          description:
            "»Entwicklung, Pflege und Weiterentwicklung transparenter Gehaltsbaender und Verguetungsstrukturen je Rolle und Expertisestufe — als Grundlage fuer faire und marktgerechte Entgeltentscheidungen. Nicht gemeint: operative Vertragsabwicklung. Typische Taetigkeiten: Gehaltsbaender fuer alle Rollen regelmaessig auf Marktkonformitaet pruefen · Gehaltsverhandlungen mit Rahmen und Argumenten unterstuetzen · Entgeltentscheidungen transparent begruenden«",
          anchors: {
            1: "Kennt Grundprinzipien der Verguetung; kann einfache Gehaltsvergleiche ziehen.",
            2: "Pflegt Gehaltsbaender nach Vorgabe; nutzt Marktdaten zur Einordnung.",
            3: "Entwickelt und aktualisiert Gehaltsbaender eigenstaendig; beraet bei Gehaltsverhandlungen.",
            4: "Gestaltet Verguetungsstruktur strategisch; justiert Baender auf Basis von Markt und Unternehmenszielen.",
            5: "Definiert Verguetungsphilosophie; verantwortet Gesamtstrategie der Entgeltgestaltung.",
          },
        },
        {
          name: "Entgelttransparenzgesetz (ETG)",
          dep: "Evolving",
          targetLevel: 3,
          description:
            "»Kenntnisse der Anforderungen des Entgelttransparenzgesetzes und deren Umsetzung im Unternehmen: Auskunftsansprueche, Berichtspflichten, Dokumentation. Typische Taetigkeiten: Auskunftsansprueche von Mitarbeitenden korrekt bearbeiten · Prozesse zur ETG-Konformitaet etablieren und dokumentieren · Fuehrungskraefte zu ETG-Anforderungen informieren«",
          anchors: {
            1: "Kennt das ETG dem Namen nach; braucht Unterstuetzung bei der Anwendung.",
            2: "Bearbeitet Auskunftsansprueche nach Vorlage; kennt Grundpflichten des Unternehmens.",
            3: "Setzt ETG-Anforderungen eigenstaendig um; beraet Fuehrungskraefte bei Grenzfaellen.",
            4: "Entwickelt ETG-Prozesse; prueft Gehaltsstrukturen auf Konformitaet.",
            5: "Gilt als ETG-Expertin; definiert Standards und schult andere.",
          },
        },
        {
          name: "Arbeitsrecht (beratend & strategisch)",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Fundierte arbeitsrechtliche Kenntnisse als Grundlage fuer strategische Beratung von Fuehrungskraeften und GF — insbesondere bei Kuendigungen, Aufhebungsvertraegen und strukturellen HR-Entscheidungen. Nicht gemeint: operative Vertragsabwicklung oder juristische Beratung. Typische Taetigkeiten: Fuehrungskraefte zu arbeitsrechtlichen Risiken beraten · Kuendigungs- und Aufhebungsprozesse strategisch begleiten · Externe Rechtsberatung einschaetzen und koordinieren«",
          anchors: {
            1: "Kennt Grundzuege des Arbeitsrechts; eskaliert bei komplexen Faellen.",
            2: "Beantwortet gaengige arbeitsrechtliche Fragen eigenstaendig; erkennt Risiken.",
            3: "Beraet GF und Fuehrungskraefte proaktiv zu arbeitsrechtlichen Entscheidungen.",
            4: "Bewertet komplexe Faelle; koordiniert externe Rechtsberatung zielgerichtet.",
            5: "Gilt als interne Arbeitsrechts-Referenz; gestaltet Prozesse zur Risikominimierung.",
          },
        },
        { ...RUMP_DIGITALE, targetLevel: 2 },
      ],
    },
    {
      name: "Technisch",
      skills: [
        {
          name: "HR-Analytics & Recruiting-Reporting",
          dep: "Evolving",
          targetLevel: 3,
          keySkill: true,
          description:
            "»Systematische Auswertung von HR- und Recruiting-Kennzahlen zur Steuerung von Personalentscheidungen und Prozessoptimierung. Typische Taetigkeiten: Recruiting-KPIs aufbereiten und interpretieren (Time-to-Hire, Source of Hire, Offer Acceptance Rate) · HR-Kennzahlen fuer GF-Reporting aufbereiten · Daten aus HRIS und ATS auswerten und visualisieren«",
          anchors: {
            1: "Liest vorgefertigte Berichte; interpretiert Kennzahlen auf Nachfrage.",
            2: "Erstellt einfache HR-Reports eigenstaendig; kennt gaengige KPIs.",
            3: "Entwickelt Recruiting- und HR-Dashboards; leitet Handlungsempfehlungen aus Daten ab.",
            4: "Analysiert Trends und Korrelationen; beraet GF auf Basis quantitativer Erkenntnisse.",
            5: "Definiert HR-Analytics-Strategie; etabliert datenbasierte Entscheidungskultur.",
          },
        },
        {
          name: "HRIS-Strategie & Tool-Auswahl",
          dep: "Evolving",
          targetLevel: 3,
          description:
            "»Strategische Auswahl, Einfuehrung und Weiterentwicklung des HR-Informationssystems und weiterer HR-Tools auf Basis von Unternehmensbedarfen. Nicht gemeint: operative HRIS-Bedienung (HR-Generalistin). Typische Taetigkeiten: Anforderungen an HR-Tools erheben und Anbieter evaluieren · Tool-Einfuehrungen projektieren und koordinieren · HR-Systemlandschaft auf Skalierungsbedarfe pruefen«",
          anchors: {
            1: "Kennt gaengige HR-Systeme; formuliert einfache Anforderungen.",
            2: "Vergleicht Tools nach Kriterien; begleitet Evaluierungen.",
            3: "Leitet Tool-Auswahl und -Einfuehrung eigenstaendig; definiert Anforderungskatalog.",
            4: "Entwickelt HR-Systemstrategie; verantwortet Implementierungsprojekte.",
            5: "Definiert HR-IT-Architektur; gilt als Expertin fuer HR-Digitalisierung.",
          },
        },
        {
          name: "KI-Tools im HRBP-Kontext",
          dep: "Perishable",
          targetLevel: 2,
          trend: "stark steigend",
          description:
            "»Einsatz von KI-Assistenten fuer strategische HR-Aufgaben: Marktanalysen, Reportings, Gespraechsvorbereitung, Dokumentation. Nicht gemeint: autonome Entscheidungen ohne menschliche Pruefung. Typische Taetigkeiten: HR-Berichte und Praesentationen per KI vorbereiten · Marktdaten fuer Gehaltsbandanalysen aufbereiten · Gespraechsleitfaeden fuer schwierige Situationen per KI entwickeln«",
          anchors: {
            1: "Kennt KI-Tools dem Namen nach.",
            2: "Nutzt KI fuer Texte, Zusammenfassungen und Reports; prueft Outputs kritisch.",
            3: "Setzt KI gezielt fuer strategische HR-Aufgaben ein; optimiert Prompts situativ.",
            4: "Etabliert KI-gestuetzte Prozesse im HRBP-Kontext; schult andere.",
            5: "Definiert KI-Nutzungsstandards fuer den HR-Bereich.",
          },
        },
      ],
    },
    {
      name: "Methodisch",
      skills: [
        {
          name: "HR-Budgetplanung & Kostenstellensteuerung",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Planung, Ueberwachung und Steuerung des HR-Budgets und der Personalkostenstellenstruktur in Abstimmung mit Controlling und GF. Typische Taetigkeiten: Personalkostenbudget planen und mit GF abstimmen · Budgetabweichungen analysieren und Anpassungen vorschlagen · Kostenstellenstruktur fuer Personalkosten pflegen«",
          anchors: {
            1: "Kennt Grundbegriffe der Budgetplanung; unterstuetzt auf Anweisung.",
            2: "Erstellt einfache Personalbudgets nach Vorgabe; haelt Budgetrahmen ein.",
            3: "Plant HR-Budget eigenstaendig; erkennt Abweichungen und leitet Gegenmassnahmen ein.",
            4: "Entwickelt Budgetszenarien; fuehrt Budgetverhandlungen mit GF und Controlling.",
            5: "Verantwortet HR-Budgetstrategie; definiert Planungsstandards.",
          },
        },
        {
          name: "Provisionsmodelle & Incentivegestaltung",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Entwicklung, Abstimmung und Pflege von Provisionsmodellen und variablen Verguetungskomponenten fuer relevante Rollen. Typische Taetigkeiten: Provisionsmodelle mit GF und Leads konzipieren und abstimmen · Modelle auf Fairness, Marktkonformitaet und Motivationswirkung pruefen · Aenderungen kommunizieren und dokumentieren«",
          anchors: {
            1: "Kennt grundlegende Provisionslogiken; formuliert einfache Rechenbeispiele.",
            2: "Versteht bestehende Modelle; identifiziert offensichtliche Schwaechen.",
            3: "Entwickelt Provisionsmodelle eigenstaendig; prueft auf Fairness und Anreizwirkung.",
            4: "Gestaltet komplexe Incentivestrukturen; moderiert Abstimmungen mit GF und Leads.",
            5: "Definiert Verguetungsphilosophie fuer variable Anteile; gilt als Referenz.",
          },
        },
        {
          name: "Personaldienstleister-Steuerung",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Strategische Steuerung und operative Koordination externer Personaldienstleister und Headhunter fuer Recruiting-Bedarfe. Typische Taetigkeiten: Geeignete Dienstleister identifizieren und evaluieren · Briefings erstellen und eingereichte Kandidatenprofile pruefen · Vertragskonditionen verhandeln und Leistung bewerten«",
          anchors: {
            1: "Nimmt Dienstleisterkontakt auf Anweisung auf; leitet Informationen weiter.",
            2: "Koordiniert Standarddienstleister eigenstaendig; prueft eingereichte Profile.",
            3: "Steuert mehrere Dienstleister parallel; bewertet Qualitaet und Konditionen.",
            4: "Verhandelt Rahmenvertraege; entwickelt Auswahlkriterien und Bewertungsrahmen.",
            5: "Managt Dienstleisterportfolio strategisch; definiert Beschaffungsstandards fuer externes Recruiting.",
          },
        },
        {
          name: "Werkstudierenden-Management",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Ganzheitliche Betreuung von Werkstudierenden — von der Bedarfsplanung ueber das Einstellungsverfahren bis zu Verlaengerung, Uebernahme oder Abschluss. Typische Taetigkeiten: Bedarfe mit Leads planen und Ausschreibungen koordinieren · Einstellungsverfahren durchfuehren und Vertraege vorbereiten · Stundensatzanpassungen, Verlaengerungen und Uebernahmegespraeche begleiten«",
          anchors: {
            1: "Begleitet einzelne Schritte auf Anweisung.",
            2: "Fuehrt Standardprozesse (Ausschreibung, Einstellung) eigenstaendig durch.",
            3: "Managt gesamten Werkstudierenden-Lifecycle eigenstaendig; ist zentrale Ansprechpartnerin.",
            4: "Optimiert Prozesse; entwickelt Standards fuer Betreuung und Uebernahme.",
            5: "Gilt als Referenz fuer Werkstudierendenmanagement; schult Fuehrungskraefte.",
          },
        },
        {
          name: "Employee Relations & disziplinarische Begleitung",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Begleitung und Moderation schwieriger Mitarbeitendensituationen: Konflikte, Leistungsthemen, disziplinarische Massnahmen und Kuendigungsprozesse. Nicht gemeint: alltaegliche Fuehrungskommunikation. Typische Taetigkeiten: Fuehrungskraefte bei disziplinarischen Massnahmen beraten und begleiten · Disziplinarische Gespraeche vorbereiten und ggf. durchfuehren · Kuendigungs- und Aufhebungsprozesse strukturiert begleiten«",
          anchors: {
            1: "Kennt rechtliche Grundlagen; eskaliert bei Konflikten.",
            2: "Unterstuetzt Fuehrungskraefte bei einfachen Faellen; bereitet Gespraeche vor.",
            3: "Begleitet disziplinarische Gespraeche eigenstaendig; steuert Prozesse strukturiert.",
            4: "Loest komplexe Employee-Relations-Faelle; beraet proaktiv zur Eskalationsvermeidung.",
            5: "Entwickelt Employee-Relations-Standards; schult Fuehrungskraefte.",
          },
        },
      ],
    },
    {
      name: "Kommunikation & Zusammenarbeit",
      skills: [
        {
          name: "Employer Branding & externe Positionierung",
          dep: "Evolving",
          targetLevel: 2,
          description:
            "»Mitgestaltung der externen Arbeitgeberpositionierung auf Karriereplattformen und sozialen Medien — im Schnittpunkt von HR und Marketing. Nicht gemeint: professionelles Social-Media-Management. Typische Taetigkeiten: Firmenprofile auf Karriereplattformen erstellen und pflegen · Entwuerfe fuer arbeitgeberbezogene Social-Media-Inhalte erstellen · Bewertungen auf Kununu beobachten und einordnen«",
          anchors: {
            1: "Veroeffentlicht Inhalte nach Vorgabe.",
            2: "Pflegt Profile eigenstaendig; formuliert einfache Beitraege zur Arbeitgeberattraktivitaet.",
            3: "Entwickelt Employer-Branding-Inhalte strategisch; koordiniert mit Marketing.",
            4: "Konzipiert Kampagnen; bewertet Plattformen nach Zielgruppenpassung.",
            5: "Entwickelt Employer-Branding-Strategie; definiert Positionierung und Kanalstrategie.",
          },
        },
        { ...RUMP_VERBAL, targetLevel: 4 },
      ],
    },
    {
      name: "Führung & Coaching",
      skills: [
        {
          name: "Beratung & Sparring fuer GF und Leads",
          dep: "Durable",
          targetLevel: 4,
          keySkill: true,
          description:
            "»Vertrauensvolle, gleichwertige Beratungsbeziehung zur Geschaeftsfuehrung und zu Fuehrungskraeften in strategischen Personalfragen. Typische Taetigkeiten: GF und Leads in Personalentscheidungen proaktiv beraten · Unbequeme Einschaetzungen klar und konstruktiv kommunizieren · Strategische HR-Themen initiieren und auf die Agenda bringen«",
          anchors: {
            1: "Beantwortet HR-Fragen reaktiv; gibt Informationen ohne Einordnung weiter.",
            2: "Beraet zu Standardthemen; gibt eigene Einschaetzung auf Nachfrage.",
            3: "Beraet proaktiv; spricht Risiken an und schlaegt Loesungen vor.",
            4: "Ist vertrauenswuerdiger Sparringspartner fuer GF; bringt strategische HR-Themen eigenstaendig ein.",
            5: "Praegt HR-Kultur; gilt als strategische Partnerin auf Unternehmensebene.",
          },
        },
        {
          name: "Schwierige Gespraeche fuehren (Kuendigung, Disziplinar)",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Strukturierte Vorbereitung und Durchfuehrung schwieriger Gespraeche: Kuendigungen, Aufhebungsvertraege, disziplinarische Massnahmen und Feedbackgespraeche bei Leistungsthemen. Typische Taetigkeiten: Gespraeche strukturiert vorbereiten (Botschaft, Reaktionen, rechtlicher Rahmen) · Gespraeche klar, wertschaetzend und rechtssicher fuehren · Fuehrungskraefte bei eigenen schwierigen Gespraechen coachen«",
          anchors: {
            1: "Fuehrt schwierige Gespraeche auf Anweisung; braucht inhaltliche Unterstuetzung.",
            2: "Bereitet Gespraeche selbstaendig vor; fuehrt sie mit Unterstuetzung durch.",
            3: "Fuehrt schwierige Gespraeche sicher und souveraen; bewaeltigt Reaktionen professionell.",
            4: "Coacht Fuehrungskraefte fuer eigene schwierige Gespraeche; entwickelt Gespraechsleitfaeden.",
            5: "Gilt als Referenz; trainiert Fuehrungskraefte systematisch.",
          },
        },
      ],
    },
  ],
};

const recruiting: Role = {
  id: "recruiting",
  name: "Recruiting",
  description:
    "Talent Acquisition fuer IT-, Tech- und Engineering-Profile — Active Sourcing, strukturierte Interviews und Candidate Experience.",
  categories: [
    {
      name: "Fachlich",
      skills: [
        {
          name: "Berufsbilder & Karrierepfade (IT/Tech)",
          dep: "Durable",
          targetLevel: 3,
          keySkill: true,
          description:
            "»Verstaendnis der relevanten Berufsbilder, Karrierepfade und Kompetenzprofile im IT-, Tech- und Engineering-Umfeld als Grundlage fuer treffsicheres Recruiting. Typische Taetigkeiten: Anforderungsprofile mit Fuehrungskraeften schaerfen · Kandidatenprofile auf Eignung einschaetzen · Unterschiede zwischen Berufsbildern erklaeren und einordnen«",
          anchors: {
            1: "Kennt gaengige Jobtitel; braucht Erklaerung bei spezifischen Anforderungen.",
            2: "Erklaert gaengige IT-Berufsbilder und typische Karrierestufen eigenstaendig.",
            3: "Beurteilt Kandidatenprofile sicher auf Passung; klaert Anforderungen mit Fuehrungskraeften.",
            4: "Erkennt auch latente Eignung; beraet Fuehrungskraefte bei unklaren Anforderungen.",
            5: "Gilt als Marktexpertin; entwickelt Kompetenzrahmen fuer neue Berufsbilder.",
          },
        },
        {
          name: "Eignungsdiagnostik (Grundlagen & DIN 33430)",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Kenntnisse eignungsdiagnostischer Grundprinzipien und der Norm DIN 33430 als Grundlage fuer valide Auswahlentscheidungen. Nicht gemeint: psychologische Testverfahren oder Assessment Center. Typische Taetigkeiten: Auswahlverfahren nach diagnostischen Guetekriterien gestalten · Strukturierte Interviews auf Basis von Kompetenzmodellen entwickeln · Auswahlentscheidungen nachvollziehbar begruenden«",
          anchors: {
            1: "Kennt den Begriff Eignungsdiagnostik; fuehrt Interviews nach Vorlage.",
            2: "Erklaert Guetekriterien (Validitaet, Reliabilitaet); gestaltet einfache Auswahlverfahren.",
            3: "Entwickelt eigenstaendig valide Auswahlprozesse; begruendet Entscheidungen nachvollziehbar.",
            4: "Beraet Fuehrungskraefte zu Auswahlverfahren; prueft Prozesse auf DIN-Konformitaet.",
            5: "Definiert Auswahlstandards; gilt als eignungsdiagnostische Referenz.",
          },
        },
        {
          name: "Arbeitsmarkt IT & Engineering",
          dep: "Evolving",
          targetLevel: 2,
          description:
            "»Ueberblick ueber Angebot, Nachfrage, Gehaltsbaender und Trends im IT- und Engineering-Arbeitsmarkt. Typische Taetigkeiten: Gehaltsvorstellungen von Kandidaten realistisch einordnen · Suchstrategien an Marktverfuegbarkeit anpassen · Fuehrungskraefte zu Marktlage informieren«",
          anchors: {
            1: "Hat allgemeines Bild vom IT-Arbeitsmarkt; braucht Unterstuetzung bei Einordnung.",
            2: "Erklaert Marktlage fuer relevante Profile; schatzt Gehaltsbaender grob ein.",
            3: "Bewertet Suchschwierigkeit und passt Strategie an; informiert Stakeholder proaktiv.",
            4: "Analysiert Marktveraenderungen; leitet Anpassungen von Recruiting-Strategie ab.",
            5: "Gilt als Marktexpertin; entwickelt datenbasierte Recruiting-Strategien.",
          },
        },
        {
          name: "DSGVO im Recruiting-Kontext",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Datenschutzkonforme Verarbeitung von Bewerberdaten im gesamten Recruiting-Prozess: Speicherung, Weitergabe, Loeschung. Typische Taetigkeiten: Bewerberdaten nur so lange speichern wie erlaubt · Kandidaten ueber Datenschutz informieren · ATS auf DSGVO-Konformitaet pruefen«",
          anchors: {
            1: "Haelt DSGVO-Vorgaben ein wenn explizit darauf hingewiesen.",
            2: "Verarbeitet Bewerberdaten grundsaetzlich DSGVO-konform; kennt Loeschfristen.",
            3: "Setzt DSGVO-Anforderungen im Recruiting-Alltag eigenstaendig um; erkennt Risiken.",
            4: "Prueft Prozesse und Tools auf Datenschutzkonformitaet; klaert Grenzfaelle.",
            5: "Entwickelt datenschutzkonforme Recruiting-Prozesse; schult andere.",
          },
        },
        { ...RUMP_DIGITALE, targetLevel: 2 },
      ],
    },
    {
      name: "Technisch",
      skills: [
        {
          name: "LinkedIn Recruiter & Boolean Search",
          dep: "Evolving",
          targetLevel: 3,
          keySkill: true,
          description:
            "»Professionelle Nutzung von LinkedIn Recruiter fuer Active Sourcing: Suche, Ansprache und Pipeline-Management. Nicht gemeint: allgemeine LinkedIn-Nutzung. Typische Taetigkeiten: Komplexe Boolean-Suchanfragen fuer spezifische Profile formulieren · Kandidaten ueber LinkedIn InMail ansprechen · Talentpools in LinkedIn Recruiter aufbauen und pflegen«",
          anchors: {
            1: "Sucht Profile ueber einfache Stichwortsuche; kennt Grundfunktionen.",
            2: "Erstellt einfache Boolean-Anfragen; spricht Kandidaten nach Vorlage an.",
            3: "Formuliert komplexe Suchanfragen; fuehrt eigenstaendig Sourcing-Kampagnen durch.",
            4: "Optimiert Suchanfragen iterativ; nutzt erweiterte Recruiter-Funktionen vollstaendig.",
            5: "Gilt als Boolean-Expertin; entwickelt Sourcing-Strategien fuer schwer zu findende Profile.",
          },
        },
        {
          name: "Bewerbermanagement-System (ATS)",
          dep: "Evolving",
          targetLevel: 3,
          keySkill: true,
          description:
            "»Sicherer Umgang mit dem Applicant Tracking System als zentrales Werkzeug fuer Bewerberprozesse — von der Ausschreibung bis zur Absage. Typische Taetigkeiten: Stellen anlegen und Bewerberpipeline pflegen · Status und Kommunikation im ATS dokumentieren · Auswertungen und Berichte erstellen«",
          anchors: {
            1: "Bedient das ATS grundlegend; traegt Bewerberinformationen ein.",
            2: "Pflegt Pipeline und Kommunikation eigenstaendig; nutzt Standardfunktionen.",
            3: "Nutzt ATS vollstaendig fuer den gesamten Prozess; erstellt Berichte.",
            4: "Konfiguriert Workflows und optimiert Prozesse im ATS; schult andere.",
            5: "Ist System-Admin; bewertet und entwickelt ATS-Nutzungsstandards.",
          },
        },
        {
          name: "Employer Branding & Social Media Recruiting",
          dep: "Evolving",
          targetLevel: 2,
          description:
            "»Grundlegende Nutzung von Social-Media-Kanaelen und Karriere-Plattformen zur Sichtbarkeit als Arbeitgeber. Nicht gemeint: professionelles Social-Media-Management. Typische Taetigkeiten: Stellenanzeigen auf relevanten Plattformen veroeffentlichen · Einfache Beitraege zur Arbeitgeberattraktivitaet teilen · Bewertungsplattformen (Kununu) beobachten«",
          anchors: {
            1: "Veroeffentlicht Stellen auf vorgegebenen Plattformen.",
            2: "Bespielt gaengige Kanaele eigenstaendig; erstellt einfache Beitraege.",
            3: "Entwickelt Posting-Routinen; wertet Reichweite und Bewerbungsquellen aus.",
            4: "Gestaltet Employer-Branding-Kampagnen; stimmt Inhalte mit Marketing ab.",
            5: "Entwickelt Employer-Branding-Strategie; definiert Kanalstrategie.",
          },
        },
        {
          name: "KI-Tools im Recruiting",
          dep: "Perishable",
          targetLevel: 2,
          trend: "stark steigend",
          description:
            "»Einsatz von KI-Assistenten im Recruiting: Stellenanzeigen formulieren, Kandidatenprofile zusammenfassen, Interview-Fragen generieren. Nicht gemeint: automatisierte Vorauswahl ohne menschliche Pruefung. Typische Taetigkeiten: Stellenanzeigen per KI formulieren und verfeinern · Sourcing-Nachrichten per KI personalisieren · Interviewleitfaeden mit KI-Unterstuetzung entwickeln«",
          anchors: {
            1: "Kennt KI-Tools dem Namen nach.",
            2: "Nutzt KI fuer Standardtexte (Anzeigen, Ansprachen); prueft Outputs.",
            3: "Setzt KI gezielt im Recruiting-Prozess ein; erkennt Qualitaetsmaengel.",
            4: "Etabliert KI-gestuetzte Vorlagen fuer gaengige Recruiting-Dokumente.",
            5: "Definiert KI-Nutzungsstandards im Recruiting; bewertet neue Tools.",
          },
        },
      ],
    },
    {
      name: "Methodisch",
      skills: [
        {
          name: "Active Sourcing & Talent Pipelines",
          dep: "Durable",
          targetLevel: 3,
          keySkill: true,
          description:
            "»Proaktive Ansprache und langfristige Beziehungspflege zu passiven Kandidaten fuer aktuelle und kuenftige Bedarfe. Typische Taetigkeiten: Zielgruppen definieren und gezielt ansprechen · Talentpools fuer wiederkehrende Profile aufbauen · Kandidaten langfristig im Blick behalten und zum richtigen Zeitpunkt reaktivieren«",
          anchors: {
            1: "Sucht auf Anfrage; reagiert auf eingehende Bewerbungen.",
            2: "Betreibt Active Sourcing nach Vorgabe; spricht Kandidaten eigenstaendig an.",
            3: "Entwickelt eigenstaendig Sourcing-Kampagnen; baut Pipelines fuer Schluesspositionen auf.",
            4: "Antizipiert Bedarfe; pflegt strategische Talentpools proaktiv.",
            5: "Entwickelt Sourcing-Strategie; etabliert Talentpool-Management als Standard.",
          },
        },
        {
          name: "Research & Market Mapping",
          dep: "Durable",
          targetLevel: 2,
          description:
            "»Systematische Recherche zu Zielunternehmen, Kandidatenpopulationen und Wettbewerbsumfeld als Grundlage fuer Sourcing-Kampagnen. Typische Taetigkeiten: Relevante Unternehmen und Hochschulen als Sourcing-Quellen identifizieren · Kandidatenpopulation fuer eine Position schatzen · Ergebnisse strukturiert aufbereiten«",
          anchors: {
            1: "Fuehrt einfache Recherchen durch; braucht Anleitung bei Methodik.",
            2: "Erstellt einfache Market Maps eigenstaendig; wertet gaengige Quellen aus.",
            3: "Fuehrt systematisches Market Mapping durch; leitet Sourcing-Strategie ab.",
            4: "Kombiniert Quellen kreativ; quantifiziert Kandidatenpopulationen.",
            5: "Entwickelt Research-Methodik; schult andere.",
          },
        },
        {
          name: "Strukturierte Interviews fuehren",
          dep: "Durable",
          targetLevel: 4,
          keySkill: true,
          description:
            "»Planung, Durchfuehrung und Auswertung strukturierter, kompetenzbasierter Interviews als zentrales Auswahlverfahren. Typische Taetigkeiten: Interviewleitfaeden auf Basis des Anforderungsprofils entwickeln · Behavioural- und situative Fragen stellen und Antworten skalieren · Beurteilungen nachvollziehbar dokumentieren und im Hiring-Team kalibrieren«",
          anchors: {
            1: "Fuehrt Gespraeche nach Leitfaden; bewertet intuitiv.",
            2: "Stellt Standardfragen; dokumentiert Eindrucke eigenstaendig.",
            3: "Fuehrt kompetenzbasierte Interviews sicher durch; skaliert Antworten valide.",
            4: "Entwickelt Interviewleitfaeden; kalibriert Urteile im Hiring-Team.",
            5: "Definiert Interview-Standards; coacht Fuehrungskraefte bei der Interviewfuehrung.",
          },
        },
        {
          name: "Kompetenz- und Verhaltensbewertung",
          dep: "Durable",
          targetLevel: 3,
          keySkill: true,
          description:
            "»Systematische Bewertung von Kandidaten anhand definierter Kompetenzen — unabhaengig von Sympathie und erster Wirkung. Typische Taetigkeiten: Kandidatenbeurteilungen anhand von Kriterien strukturieren · Beobachtungen von Interpretationen trennen · Hiring-Entscheidungen begruendet und nachvollziehbar vertreten«",
          anchors: {
            1: "Bewertet Kandidaten intuitiv; Begruendungen bleiben oberflaeachlich.",
            2: "Trennt Beobachtung und Interpretation grundsaetzlich; bewertet nach vorgegebenen Kriterien.",
            3: "Beurteilt eigenstaendig valide; erkennt kognitive Verzerrungen im Prozess.",
            4: "Kalibriert Urteile im Team; erkennt und benennt Bias konstruktiv.",
            5: "Entwickelt Bewertungsstandards; schult Fuehrungskraefte in Urteilsqualitaet.",
          },
        },
        {
          name: "Stellenanzeigen & Anforderungsprofile",
          dep: "Durable",
          targetLevel: 3,
          keySkill: true,
          description:
            "»Erstellung treffender, attraktiver Stellenanzeigen und praeziser Anforderungsprofile in Zusammenarbeit mit Fuehrungskraeften. Typische Taetigkeiten: Anforderungen mit Fuehrungskraefte schaerfen und Must-haves von Nice-to-haves trennen · Zielgruppengerechte Anzeigen formulieren · Anforderungen auf Marktrelevanz pruefen«",
          anchors: {
            1: "Befuellt Anzeigenvorlagen; uebernimmt Anforderungen unveraendert.",
            2: "Formuliert eigenstaendig Anzeigen; stellt Rueckfragen zu Anforderungen.",
            3: "Erstellt praezise Anzeigen und Anforderungsprofile; hinterfragt unrealistische Anforderungen.",
            4: "Reduziert und schaerft Anforderungsprofile; beraat Fuehrungskraefte bei Positionierung.",
            5: "Entwickelt Anzeigenstandards; gilt als Expertin fuer zielgruppengerechte Texte.",
          },
        },
        {
          name: "Candidate Experience",
          dep: "Durable",
          targetLevel: 3,
          keySkill: true,
          description:
            "»Sicherstellung einer professionellen, wertschaetzenden Erfahrung fuer alle Kandidaten — vom Erstkontakt bis zur Entscheidung. Typische Taetigkeiten: Rueckmeldungen zeitnah und individuell geben · Kandidaten transparent ueber Prozessschritte informieren · Feedback-Qualitaet bei Absagen sicherstellen«",
          anchors: {
            1: "Haelt Kandidaten auf Nachfrage auf dem Laufenden.",
            2: "Kommuniziert proaktiv; haelt Rueckmeldungszeiten grundsaetzlich ein.",
            3: "Stellt professionelle Candidate Experience im gesamten Prozess sicher.",
            4: "Analysiert Schwachstellen im Prozess; optimiert Candidate Journey systematisch.",
            5: "Entwickelt Candidate-Experience-Standards; misst NPS und leitet Verbesserungen ab.",
          },
        },
        {
          name: "Recruiting-Messen & Events",
          dep: "Durable",
          targetLevel: 2,
          description:
            "»Vorbereitung und Teilnahme an Recruiting-Veranstaltungen, Hochschulmessen und Karriereetagen. Typische Taetigkeiten: Messeauftritte vorbereiten und Materialien bereitstellen · Gespraeche auf Messen eigenstaendig fuehren · Kontakte nachfassen und in den Recruiting-Prozess ueberfuehren«",
          anchors: {
            1: "Nimmt an Messen teil; braucht Anleitung bei Gespraechen.",
            2: "Fuehrt eigenstaendig Gespraeche; bereitet Materialien vor.",
            3: "Plant und fuehrt Messeauftritte eigenstaendig durch; konvertiert Kontakte.",
            4: "Bewertet Messen nach ROI; empfiehlt Teilnahme strategisch.",
            5: "Entwickelt Messe- und Event-Strategie; baut Hochschulpartnerschaften auf.",
          },
        },
        {
          name: "Offer Management & Vertragskoordination",
          dep: "Durable",
          targetLevel: 3,
          keySkill: true,
          description:
            "»Steuerung des Angebots- und Vertragsprozesses vom positiven Auswahlentscheid bis zum unterzeichneten Arbeitsvertrag. Typische Taetigkeiten: Gehaltsverhandlungen begleiten und Rahmen mit Fuehrungskraft abstimmen · Angebote koordinieren und Rueckmeldungen einholen · Abstimmung mit HR zur Vertragserstellung und Starttermin«",
          anchors: {
            1: "Leitet Angebotsprozess auf Anweisung weiter; koordiniert auf Rueckfrage.",
            2: "Koordiniert Angebotsprozess eigenstaendig; stimmt Rahmendaten mit HR ab.",
            3: "Steuert den Prozess von Auswahlentscheid bis Vertragsunterschrift sicher.",
            4: "Begleitet Gehaltsverhandlungen gemeinsam mit Fuehrungskraeften; steuert schwierige Verhandlungen.",
            5: "Entwickelt Offer-Management-Standards; verkuerzt Time-to-Offer systematisch.",
          },
        },
        {
          name: "Onboarding-Prozesse",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Steuerung des Onboarding-Prozesses vom angenommenen Angebot bis zum ersten Arbeitstag — Koordination mit HR-Generalin, IT und Fuehrungskraft. Nicht gemeint: fachliches Einarbeiten (Aufgabe der Fuehrungskraft). Typische Taetigkeiten: Onboarding-Aufgaben anstoßen und verteilen · Neü Mitarbeitende bis Tag 1 begleiten und betreuen · Probezeit-Check-ins initiieren und nachhalten«",
          anchors: {
            1: "Fuehrt vorgegebene Onboarding-Schritte aus; braucht Anleitung bei Koordination.",
            2: "Koordiniert Onboarding-Prozess eigenstaendig fuer Standardfaelle.",
            3: "Steuert den gesamten Prozess von Zusage bis Arbeitsbeginn; koordiniert alle Beteiligten proaktiv.",
            4: "Optimiert Onboarding-Erlebnis; erkennt Reibungspunkte und passt den Prozess an.",
            5: "Entwickelt Onboarding-Standards; misst und verbessert Onboarding-Qualitaet systematisch.",
          },
        },
      ],
    },
    {
      name: "Kommunikation & Zusammenarbeit",
      skills: [
        {
          name: "Direktansprache & Kandidatenkommunikation",
          dep: "Durable",
          targetLevel: 3,
          keySkill: true,
          description:
            "»Persoenliche, empathische Ansprache von Kandidaten und professionelle Kommunikation im gesamten Recruiting-Prozess. Typische Taetigkeiten: Individuelle InMails formulieren die Interesse wecken · Telefonscreenings strukturiert fuehren · Absagen wertschaetzend formulieren«",
          anchors: {
            1: "Kontaktiert Kandidaten nach Vorlage; Ansprache bleibt generisch.",
            2: "Formuliert eigenstaendig Ansprachen; passt Ton an Zielgruppe an.",
            3: "Spricht Kandidaten individuell und ueberzeugend an; fuehrt Screenings souveraen.",
            4: "Gewinnt auch schwer erreichbare Kandidaten; baut Rapport schnell auf.",
            5: "Gilt als Vorbild fuer Kandidatenkommunikation; coacht andere.",
          },
        },
        {
          name: "Anforderungserhebung mit Fuehrungskraeften",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Strukturierte Erhebung und kritische Reflexion von Stellenanforderungen gemeinsam mit Hiring Managern — als Grundlage fuer eine treffsichere Suche. Typische Taetigkeiten: Kick-off-Gespraeche mit Hiring Managern fuehren · Anforderungen hinterfragen und auf Realisierbarkeit pruefen · Erwartungen zu Prozess und Timeline abstimmen«",
          anchors: {
            1: "Nimmt Anforderungen auf wie gegeben; stellt wenig Rueckfragen.",
            2: "Stellt strukturierte Rueckfragen; klaert offensichtliche Luecken.",
            3: "Fuehrt Kick-offs eigenstaendig; hinterfragt Anforderungen konstruktiv.",
            4: "Beraet Fuehrungskraefte zu realistischen Erwartungen; gestaltet Suchstrategie gemeinsam.",
            5: "Gilt als strategischer Partner fuer Fuehrungskraefte; praegt den Hiring-Prozess.",
          },
        },
        { ...RUMP_VERBAL, targetLevel: 3 },
      ],
    },
  ],
};

const controlling: Role = {
  id: "controlling",
  name: "Controlling",
  description:
    "Unternehmens- und Projektcontrolling — Planung, Reporting, Analyse und kaufmaennische Steuerung fuer Management und Projektleitungen.",
  categories: [
    {
      name: "Fachlich",
      skills: [
        {
          name: "Grundlagen Rechnungswesen & Bilanzierung (HGB)",
          dep: "Durable",
          targetLevel: 2,
          description:
            "»Grundlegende Kenntnisse des deutschen Rechnungswesens (internes und externes) und der Bilanzierungslogik nach HGB als Basis fuer Controlling-Aufgaben — bewusst auf Grundlagenniveau, ohne fachliche Tiefe. Vertiefte Rechnungswesen- und Bilanzierungsaufgaben liegen perspektivisch bei einer eigenen Rolle. Nicht gemeint: steuerrechtliche Gestaltung oder Jahresabschlusserstellung. Typische Taetigkeiten: Buchungen und Konten im Controlling-Kontext einordnen · GuV und Bilanz fuer Steuerungszwecke lesen · Schnittstelle zur Buchhaltung fachlich begleiten«",
          anchors: {
            1: "Kennt Grundbegriffe (Aktiva, Passiva, GuV); braucht Erklaerung bei der Einordnung.",
            2: "Liest GuV und Bilanz eigenstaendig; versteht Zusammenhaenge zwischen Buchung und Ausweis.",
            3: "Interpretiert Abschluesse fuer Steuerungszwecke; erkennt buchhalterische Implikationen von Entscheidungen.",
            4: "Bewertet Bilanzierungsentscheidungen auf Controlling-Relevanz; beraet Fuehrungskraefte.",
            5: "Gilt als Referenz an der Schnittstelle Rechnungswesen/Controlling; entwickelt Standards.",
          },
        },
        {
          name: "Projektcontrolling-Grundlagen",
          dep: "Durable",
          targetLevel: 5,
          description:
            "»Kenntnisse der Methoden und Logiken des Projektcontrollings: Earned Value, Meilensteinplanung, Stundenerfassung und Deckungsbeitragsrechnung auf Projektebene. Typische Taetigkeiten: Projektbudgets strukturieren und verfolgen · Abweichungen zwischen geplantem und verbrauchtem Budget analysieren · Stundennachweise und Ressourceneinsatz je Projekt auswerten«",
          anchors: {
            1: "Kennt Grundbegriffe (Budget, Ist-Kosten, Abweichung); braucht Anleitung bei der Auswertung.",
            2: "Erstellt einfache Projektkostenberichte eigenstaendig.",
            3: "Steuert Projektcontrolling-Prozess vollstaendig; erkennt Risiken fruehzeitig.",
            4: "Analysiert Abweichungen mehrdimensional; beraet Projektleitungen zur Gegensteuerung.",
            5: "Definiert Anforderungen an Dashboards und Berichtsformate als fachliche Vorgabe fuer die Umsetzung (nicht Software-Entwicklung); entwickelt Projektcontrolling-Standards und KPIs.",
          },
        },
        { ...RUMP_DIGITALE, targetLevel: 3 },
      ],
    },
    {
      name: "Technisch",
      skills: [
        {
          name: "Excel (fortgeschritten, Power Query, VBA)",
          dep: "Evolving",
          targetLevel: 4,
          keySkill: true,
          description:
            "»Professioneller Einsatz von Excel fuer Controlling-Aufgaben: komplexe Formeln, Pivot-Tabellen, Power Query fuer Datenimport und -transformation, Szenariomodelle sowie VBA-/Makro-Programmierung zur Automatisierung. Typische Taetigkeiten: Planungsmodelle und Forecast-Tabellen bauen · Daten aus verschiedenen Quellen per Power Query zusammenfuehren · Berichte und Dashboards per Excel automatisieren · wiederkehrende Auswertungen per Makro automatisieren«",
          anchors: {
            1: "Nutzt Grundfunktionen; erstellt einfache Tabellen und Diagramme.",
            2: "Setzt Pivot-Tabellen und SVERWEIS sicher ein; erstellt strukturierte Reports.",
            3: "Baut komplexe Modelle mit verschachtelten Formeln; nutzt Power Query fuer Datentransformation.",
            4: "Automatisiert Reports per VBA/Makro; erstellt skalierbare Planungsmodelle und Szenario-Analysen.",
            5: "Gilt als Excel-Expertin; entwickelt Controlling-Vorlagen fuer das gesamte Unternehmen.",
          },
        },
        {
          name: "ERP- & Projektsteuerungssystem (Zistemo, SAP, Board, Loga)",
          dep: "Evolving",
          targetLevel: 3,
          description:
            "»Sicherer Umgang mit dem unternehmensinternen ERP-System (SAP) sowie den projektbezogenen Steuerungstools (Zistemo, Board, teilweise Loga) fuer buchhalterische Auswertungen, Rechnungsstellung, Kostenstellen-Reporting und Datenexporte ins Controlling — inklusive Betreuung und Weiterentwicklung des Projektmanagement-Tools. Typische Taetigkeiten: Kosten- und Erloesdaten aus ERP extrahieren · Ausgangsrechnungen vorbereiten und pruefen · Ist-Stunden und Projektfortschritt aus Zistemo fuer Controlling-Auswertungen auslesen · Buchungen auf Plausibilitaet pruefen · Projektmanagement-Tool betreuen und weiterentwickeln«",
          anchors: {
            1: "Navigiert im ERP; extrahiert einfache Berichte mit Anleitung.",
            2: "Extrahiert Daten eigenstaendig; versteht Buchungslogik; liest Projektdaten aus PM-Tools.",
            3: "Nutzt ERP und PM-Tools vollstaendig fuer Controlling-Auswertungen; bereitet Rechnungen vor.",
            4: "Konfiguriert Berichte und Kostenstellen; optimiert Datenfluesse zwischen PM-Tools und ERP.",
            5: "Ist Key User; schult andere und begleitet Systemweiterentwicklung.",
          },
        },
        {
          name: "BI-Tools (z. B. Power BI)",
          dep: "Evolving",
          targetLevel: 3,
          description:
            "»Einsatz von Business-Intelligence-Tools fuer interaktive Dashboards und Datenvisualisierung fuer Management und Projektleitungen. Typische Taetigkeiten: Controlling-Dashboards aufbauen und pflegen · Daten aus ERP und Excel in BI-Tool einbinden · Reports fuer Fuehrungskraefte visualisieren«",
          anchors: {
            1: "Liest vorhandene Dashboards; braucht Anleitung beim Erstellen.",
            2: "Erstellt einfache Reports und Diagramme eigenstaendig.",
            3: "Baut interaktive Dashboards; verbindet mehrere Datenquellen.",
            4: "Entwickelt komplexe Datenmodelle; automatisiert Datenaktualisierung.",
            5: "Gilt als BI-Expertin; entwickelt Reporting-Standards fuer das Unternehmen.",
          },
        },
        {
          name: "Datenqualitaetssicherung",
          dep: "Evolving",
          targetLevel: 3,
          description:
            "»Sicherstellen, dass operative Daten in Zistemo, SAP und im Board-Dashboard korrekt und vollstaendig sind, als Voraussetzung fuer valide Controlling-Auswertungen. Typische Taetigkeiten: Zeiterfassung auf Vollstaendigkeit und Plausibilitaet pruefen · Projekt-Start- und Enddaten sowie PT-Budgets in Zistemo kontrollieren · Datenabweichungen mit Projektleitungen klaeren und korrigieren lassen«",
          anchors: {
            1: "Erkennt offensichtliche Datenfehler; meldet sie nach Vorgabe.",
            2: "Prueft Zeiterfassung und Projektdaten eigenstaendig auf Plausibilitaet.",
            3: "Stellt Datenqualitaet in Zistemo, SAP und Dashboard systematisch sicher; klaert Abweichungen mit Projektleitungen.",
            4: "Entwickelt Pruefroutinen zur Datenqualitaetssicherung; reduziert Fehlerquellen strukturell.",
            5: "Definiert Datenqualitaetsstandards fuer alle Controlling-relevanten Systeme.",
          },
        },
        {
          name: "KI-gestuetzte Finanzanalyse",
          dep: "Perishable",
          targetLevel: 3,
          trend: "stark steigend",
          description:
            "»Einsatz von KI-Assistenten fuer Controlling-Aufgaben: Kommentare zu Abweichungen formulieren, Forecasts plausibilisieren, Berichte strukturieren. Nicht gemeint: automatisierte Entscheidungen ohne Pruefung. Typische Taetigkeiten: Managementkommentare per KI vorformulieren · Abweichungserklaerungen mit KI strukturieren · Forecast-Annahmen per KI hinterfragen lassen«",
          anchors: {
            1: "Kennt KI-Tools dem Namen nach.",
            2: "Nutzt KI fuer Standardtexte im Controlling; prueft Outputs fachlich.",
            3: "Setzt KI gezielt fuer Kommentierung und Analyse ein; optimiert Prompts.",
            4: "Etabliert KI-gestuetzte Vorlagen fuer Reporting-Zyklen.",
            5: "Definiert KI-Nutzungsstandards im Controlling; bewertet neue Anwendungsfaelle.",
          },
        },
      ],
    },
    {
      name: "Methodisch",
      skills: [
        {
          name: "Budgetplanung & -koordination",
          dep: "Durable",
          targetLevel: 4,
          description:
            "»Koordination des unternehmensweiten Budgetprozesses: Planung, Abstimmung mit Fachbereichen, Konsolidierung und Verabschiedung. Typische Taetigkeiten: Planungsunterlagen vorbereiten und Fachbereiche begleiten · Teilplaene konsolidieren und Gesamtbudget ableiten · Budgetzusagen und -freigaben dokumentieren«",
          anchors: {
            1: "Unterstuetzt Budgetprozess mit vorbereiteten Vorlagen; braucht Anleitung.",
            2: "Fuehrt Teilbereiche des Budgetprozesses eigenstaendig durch.",
            3: "Steuert Budgetprozess vollstaendig; koordiniert Fachbereiche und konsolidiert.",
            4: "Optimiert Budgetprozess; beraet Fuehrungskraefte zu Planungsannahmen.",
            5: "Entwickelt Budgetierungsstandards; verantwortet Planungsguete.",
          },
        },
        {
          name: "Projektbudgetierung & Kostenverfolgung",
          dep: "Durable",
          targetLevel: 4,
          keySkill: true,
          description:
            "»Aufbau und Pflege von Projektbudgets sowie laufende Kostenverfolgung auf Projektebene: Stunden, externe Kosten, Deckungsbeitrag. Typische Taetigkeiten: Projektkosten- und Erloesplanung strukturieren · Ist-Kosten monatlich mit Plan abgleichen und Abweichungen erklaeren · Projektleitungen mit belastbaren Zahlen unterstuetzen«",
          anchors: {
            1: "Tragt Ist-Kosten in Vorlagen ein; braucht Anleitung bei Auswertung.",
            2: "Verfolgt Projektkosten eigenstaendig; meldet Abweichungen.",
            3: "Steuert Projektkostentracking vollstaendig; erklaert Abweichungen ursaechengenau.",
            4: "Antizipiert Budgetueberschreitungen; beraet Projektleitungen zur Gegensteuerung.",
            5: "Entwickelt Projektcontrolling-Standards; definiert KPIs und Berichtsformate.",
          },
        },
        {
          name: "Forecasting & Rolling Forecasts",
          dep: "Durable",
          targetLevel: 4,
          description:
            "»Erstellung und Pflege von Forecasts auf Unternehmens- und Projektebene — rollierend und anlassbezogen. Typische Taetigkeiten: Forecast-Modelle aufbauen und Annahmen dokumentieren · Fachbereiche zur Forecast-Guete beraten · Abweichungen zwischen Forecast und Plan erklaeren«",
          anchors: {
            1: "Fuellt Forecast-Vorlagen aus; braucht Anleitung bei Annahmen.",
            2: "Erstellt einfache Forecasts eigenstaendig; dokumentiert Annahmen.",
            3: "Baut rollierende Forecasts auf; hinterfragt Annahmen kritisch.",
            4: "Entwickelt Forecast-Methodik; integriert Szenarien und Sensitivitaeten.",
            5: "Gilt als Forecast-Expertin; entwickelt unternehmensweite Forecast-Standards.",
          },
        },
        {
          name: "Liquiditaetsplanung",
          dep: "Durable",
          targetLevel: 4,
          description:
            "»Kurz- und mittelfristige Planung von Zahlungsein- und -ausgaengen zur Sicherung der Zahlungsfaehigkeit. Typische Taetigkeiten: Liquiditaetsplan woechentlich aktualisieren · Zahlungsfluesse aus ERP und Projekten zusammenfuehren · Engpaesse fruehzeitig erkennen und kommunizieren«",
          anchors: {
            1: "Tragt Zahlungsdaten in Vorlagen ein; braucht Unterstuetzung bei Prognosen.",
            2: "Pflegt Liquiditaetsplan eigenstaendig; meldest Abweichungen.",
            3: "Erstellt und pflegt Liquiditaetsplanung vollstaendig; erkennt Engpaesse fruehzeitig.",
            4: "Bewertet Liquiditaetsrisiken; leitet Massnahmen zur Optimierung ab.",
            5: "Entwickelt Liquiditaetssteuerungskonzepte; optimiert Working Capital.",
          },
        },
        {
          name: "Monats- & Jahresreporting inkl. Abweichungsanalyse",
          dep: "Durable",
          targetLevel: 3,
          keySkill: true,
          description:
            "»Erstellung regelmaessiger Berichte fuer Management und Gesellschafter — mit Plan-Ist-Vergleich, Erklaerungen und Handlungsempfehlungen. Typische Taetigkeiten: Monatliche Berichte fristgerecht erstellen · Abweichungen ursaechengenau erklaeren und kommentieren · Jahresabschluss-Unterlagen fuer Controlling-Sicht aufbereiten«",
          anchors: {
            1: "Fuellt Berichtsvorlagen aus; braucht Unterstuetzung bei Kommentierung.",
            2: "Erstellt Standardberichte eigenstaendig; Kommentierung noch oberflaeachlich.",
            3: "Erstellt vollstaendige Berichte mit Abweichungsanalyse; Kommentierungen ursaechengenau.",
            4: "Entwickelt Berichtsformate weiter; praesentiert Ergebnisse Management-gerecht.",
            5: "Definiert Reporting-Standards; verantwortet Berichtsqualitaet und -timeliness.",
          },
        },
        {
          name: "KPI-Tracking & Dashboards",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Aufbau und Pflege von KPI-Systemen und Management-Dashboards fuer Unternehmens- und Projektsteuerung. Typische Taetigkeiten: Relevante KPIs je Bereich und Projekt definieren · Dashboards aufbauen und aktuell halten · Kennzahlen interpretieren und bei Bedarf eskalieren«",
          anchors: {
            1: "Pflegt vorhandene Dashboards; meldet Datenfehler.",
            2: "Aktualisiert KPIs und Dashboards eigenstaendig nach Vorgabe.",
            3: "Entwickelt KPI-Systeme; baut Dashboards und leitet Massnahmen aus Kennzahlen ab.",
            4: "Definiert KPI-Logiken; sichert Konsistenz ueber Bereiche und Projekte.",
            5: "Entwickelt unternehmensweites KPI-Framework; beraet Fuehrungskraefte.",
          },
        },
        {
          name: "Einsatzplanung & Auslastungssteuerung",
          dep: "Durable",
          targetLevel: 4,
          description:
            "»Unterstuetzung der uebergreifenden Einsatzplanung im Projektgeschaeft: Auslastungsauswertungen erstellen, Planungsabgleiche bereitstellen und Kapazitaetsengpaesse fruehzeitig sichtbar machen. Typische Taetigkeiten: Auslastungsquoten je Mitarbeiterin und Projekt auswerten · Soll-Ist-Vergleiche der Ressourcenplanung aufbereiten · Planungsluecken und Ueberlasten an Fuehrungskraefte kommunizieren«",
          anchors: {
            1: "Tragt Planungsdaten in Vorlagen ein; braucht Anleitung bei Auswertung.",
            2: "Erstellt einfache Auslastungsberichte eigenstaendig; erkennt offensichtliche Abweichungen.",
            3: "Steuert Einsatzplanungs-Reporting vollstaendig; bereitet Planungsabgleiche entscheidungsreif auf.",
            4: "Entwickelt Auslastungsmodelle; beraet Fuehrungskraefte proaktiv zu Kapazitaetsrisiken.",
            5: "Definiert Standards fuer Einsatzplanung und Auslastungsreporting im Unternehmen.",
          },
        },
        {
          name: "Investitionsrechnung & Business Cases",
          dep: "Durable",
          targetLevel: 3,
          trend: "steigend",
          description:
            "»Unterstuetzung des Business-Case-Prozesses durch Bewertung von Investitionen und Projekten anhand betriebswirtschaftlicher Kennzahlen (ROI, NPV, Amortisation) als Entscheidungsgrundlage — Controlling rechnet und begleitet, die Investitionsentscheidung liegt bei der Geschaeftsfuehrung. Typische Taetigkeiten: Business Cases strukturieren und berechnen · Sensitivitaetsanalysen zu Annahmen durchfuehren · Ergebnisse fuer Entscheider aufbereiten«",
          anchors: {
            1: "Kennt Grundbegriffe (ROI, Amortisation); braucht Anleitung bei der Berechnung.",
            2: "Erstellt einfache Business Cases nach Vorlage eigenstaendig.",
            3: "Erstellt vollstaendige Business Cases mit Sensitivitaetsanalyse.",
            4: "Hinterfragt Annahmen kritisch; beraet Fuehrungskraefte zu Investitionsentscheidungen.",
            5: "Entwickelt Business-Case-Methodik; gilt als betriebswirtschaftliche Referenz.",
          },
        },
        {
          name: "Budget- und Reporting",
          dep: "Durable",
          targetLevel: 4,
          description:
            "»Erstellung von Monats- und Quartalsberichten sowie laufender Plan-Ist-Abgleich fuer Personal-, Umsatz- und Kostencontrolling auf Unternehmensebene. Typische Taetigkeiten: Monats- und Quartalsberichte fristgerecht erstellen · Plan-, Prognose- und Ist-Werte gegen Ziele abgleichen · Zahlen im Board-Tool der HM und in Zistemo pflegen und plausibilisieren«",
          anchors: {
            1: "Traegt Zahlen in Vorlagen ein; braucht Anleitung beim Plan-Ist-Abgleich.",
            2: "Erstellt einfache Monatsberichte eigenstaendig; gleicht Ist-Werte mit Plan ab.",
            3: "Erstellt vollstaendige Monats- und Quartalsberichte; erklaert Abweichungen ursaechengenau.",
            4: "Pflegt und plausibilisiert Zahlen im Board-Tool und in Zistemo eigenverantwortlich; antizipiert Planabweichungen.",
            5: "Entwickelt Standards fuer Budget- und Reportingprozesse; verantwortet Berichtsqualitaet unternehmensweit.",
          },
        },
      ],
    },
    {
      name: "Kommunikation & Zusammenarbeit",
      skills: [
        {
          name: "Management-Reporting & Ergebniskommunikation",
          dep: "Durable",
          targetLevel: 3,
          keySkill: true,
          description:
            "»Adressatengerechte Aufbereitung und Kommunikation von Controlling-Ergebnissen fuer Management, Gesellschafter und Projektleitungen. Typische Taetigkeiten: Berichte und Kommentare Management-gerecht formulieren · Zahlen verstaendlich erklaeren ohne Detailverlust · Handlungsempfehlungen klar und nachvollziehbar ableiten«",
          anchors: {
            1: "Praesentiert Zahlen; Erklaerungen bleiben technisch und schwer verstaendlich.",
            2: "Bereitet Ergebnisse fuer definierte Zielgruppen auf; Kommentierungen verstaendlich.",
            3: "Kommuniziert Controlling-Ergebnisse sicher und adressatengerecht; leitet Empfehlungen ab.",
            4: "Ueberzeugt auch kritische Stakeholder; moderiert Budgetdiskussionen souveraen.",
            5: "Gilt als vertrauenswuerdiger Sparringspartner; setzt Kommunikationsstandards.",
          },
        },
        {
          name: "Beratung von Fuehrungskraeften & Projektleitungen",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Proaktive kaufmaennische Beratung von Fuehrungskraeften und Projektleitungen auf Basis von Controlling-Daten. Typische Taetigkeiten: Abweichungen und Risiken eigenstaendig ansprechen · Handlungsoptionen mit Zahlen unterstuetzen · Als kaufmaennisches Gewissen im Projektgeschaeft wirken«",
          anchors: {
            1: "Beantwortet Fragen reaktiv; gibt Zahlen ohne Einordnung weiter.",
            2: "Bereitet Zahlen mit Kontext auf; gibt einfache Einschaetzungen.",
            3: "Beraet proaktiv; spricht Risiken eigenstaendig an und empfiehlt Massnahmen.",
            4: "Ist vertrauenswuerdiger Berater; antizipiert Informationsbedarf.",
            5: "Gilt als strategischer Business Partner; praegte kaufmaennische Entscheidungskultur.",
          },
        },
        { ...RUMP_VERBAL, targetLevel: 3 },
      ],
    },
  ],
};

const inhouseProjektSupport: Role = {
  id: "inhouse-projekt-support",
  name: "Inhouse Projekt Support",
  description:
    "Administrative und operative Unterstuetzung laufender Kundenprojekte — Einsatzplanung, Projektabrechnung und Koordination an der Schnittstelle von Projektleitung, Controlling und Kunden.",
  categories: [
    {
      name: "Fachlich",
      skills: [
        {
          name: "Beratungsprojekte & Abrechnungsmodelle",
          dep: "Durable",
          targetLevel: 2,
          trend: "stabil",
          description:
            "»Grundverstaendnis der typischen Projektstrukturen und Vertragsmodelle (Time & Material, Festpreis, Rahmenvertrag) als Basis fuer Abrechnungs- und Koordinationsaufgaben. Nicht gemeint: kaufmaennische Vertragsgestaltung. Typische Taetigkeiten: Projektstruktur und Abrechnungsmodell eines Auftrags einordnen · Stundennachweise den richtigen Positionen zuordnen · Rechnungsgrundlagen auf Plausibilitaet pruefen«",
          anchors: {
            1: "Kennt grundlegende Projektbegriffe; braucht Erklaerung bei Abrechnungsdetails.",
            2: "Ordnet Projekte und Stunden den richtigen Abrechnungsmodellen eigenstaendig zu.",
            3: "Erkennt Inkonsistenzen in Stundenberichten und Vertragsdaten; klaert proaktiv.",
            4: "Beurteilt Abrechnungsgrundlagen; schlaegt Optimierungen im Prozess vor.",
            5: "Gilt als Wissensstraeger fuer Vertragsmodelle; schult andere.",
          },
        },
        {
          name: "Datenschutz im Projektkontext",
          dep: "Durable",
          targetLevel: 2,
          trend: "stabil",
          description:
            "»Grundkenntnisse zu DSGVO-Anforderungen bei der Verarbeitung von Kundendaten und Projektdokumenten. Nicht gemeint: rechtliche Beratung oder DSGVO-Beauftragung. Typische Taetigkeiten: Projektdokumente schutzbedarfsgerecht ablegen und weiterleiten · Kundendaten nur zweckgebunden verarbeiten · Loeschfristen fuer Projektakten einhalten«",
          anchors: {
            1: "Haelt Vorgaben ein wenn explizit darauf hingewiesen.",
            2: "Verarbeitet Projektdaten grundsaetzlich DSGVO-konform; kennt Grundregeln.",
            3: "Erkennt datenschutzrelevante Situationen eigenstaendig; eskaliert bei Unklarheiten.",
            4: "Bewertet Prozesse auf Datenschutzkonformitaet; empfiehlt Verbesserungen.",
            5: "Definiert Datenschutzstandards fuer die Projektadministration.",
          },
        },
        { ...RUMP_DIGITALE, targetLevel: 2, trend: "stark steigend" },
      ],
    },
    {
      name: "Technisch",
      skills: [
        {
          name: "Projektmanagement-Tool (Jira / Planner)",
          dep: "Evolving",
          targetLevel: 3,
          keySkill: true,
          trend: "stabil",
          description:
            "»Operative Nutzung des Projektmanagement-Tools zur Aufgabenverfolgung, Zeiterfassung und Statusdokumentation. Nicht gemeint: Projektkonfiguration oder agile Steuerung. Typische Taetigkeiten: Aufgaben und Meilensteine im Tool neu anlegen, pflegen und aktuell halten · offene ToDo's pruefen und nachhalten · Statusberichte aus dem Tool aufbereiten«",
          anchors: {
            1: "Bedient das Tool grundlegend; traegt Daten nach Anweisung ein.",
            2: "Pflegt Aufgaben und Zeitbuchungen eigenstaendig; haelt Status aktuell.",
            3: "Nutzt das Tool vollstaendig fuer Tracking und Reporting; unterstuetzt andere bei der Bedienung.",
            4: "Konfiguriert Views und Berichte; optimiert Nutzung fuer das Projektteam.",
            5: "Definiert Tool-Nutzungsstandards; schult andere.",
          },
        },
        {
          name: "Zeiterfassung & ERP-System",
          dep: "Evolving",
          targetLevel: 5,
          keySkill: true,
          trend: "steigend",
          trendgrund:
            "Systemo ist Herzstueck-Tool der Organisation (Abrechnung, Buchungen); ab 2027 kommt die gesetzliche E-Rechnungspflicht als weiterer Entwicklungstreiber hinzu.",
          description:
            "»Sicherer Umgang mit dem Zeiterfassungs- und ERP-System fuer Projektbuchungen, Auslastungsuebersichten und Abrechnungsgrundlagen. Typische Taetigkeiten: Stundenbuchungen auf Projekte pruefen und klaeren · Auslastungsberichte aus dem System aufbereiten · Abrechnungslaeufe vorbereiten und Daten auf Vollstaendigkeit pruefen«",
          anchors: {
            1: "Bedient das System grundlegend; traegt Buchungen auf Anweisung ein.",
            2: "Pflegt Buchungen und Auslastungsdaten eigenstaendig.",
            3: "Nutzt das System vollstaendig fuer Abrechnung und Reporting; erkennt Buchungsfehler.",
            4: "Optimiert Systemprozesse; konfiguriert Berichte und Workflows.",
            5: "Gilt als System-Expertin; schult andere und pflegt Stammdaten.",
          },
        },
        {
          name: "MS Office (Excel, Word, PowerPoint)",
          dep: "Durable",
          targetLevel: 3,
          trend: "stabil",
          description:
            "»Sicherer Umgang mit MS Office fuer Projektverfolgung, Angebotsvorbereitung und Statusberichte. Typische Taetigkeiten: Auslastungs- und Projektverfolgungslisten in Excel fuehren · Angebote und Statusberichte nach Vorlage aufbereiten«",
          anchors: {
            1: "Bedient alle drei Programme grundlegend; erstellt Dokumente nach Vorlage.",
            2: "Nutzt Standardfunktionen sicher; fuehrt Listen und Tabellen eigenstaendig.",
            3: "Setzt Excel-Funktionen fuer Projektverfolgung gezielt ein; erstellt Berichte effizient.",
            4: "Automatisiert wiederkehrende Auswertungen; erstellt unternehmensweite Vorlagen.",
            5: "Gilt als Office-Expertin im Projektkontext; optimiert Reportingprozesse.",
          },
        },
        {
          name: "KI-Tools fuer Projektdokumentation",
          dep: "Perishable",
          targetLevel: 4,
          trend: "stark steigend",
          description:
            "»Einsatz von KI-Assistenten fuer Dokumentationsaufgaben im Projektumfeld: Berichte formulieren, Besprechungsnotizen strukturieren, Angebote vorbereiten. Typische Taetigkeiten: Projektberichte per KI formulieren und verfeinern · Besprechungsprotokolle automatisch aufbereiten · Outputs pruefen und anpassen«",
          anchors: {
            1: "Kennt KI-Tools dem Namen nach.",
            2: "Nutzt KI fuer Standardtexte und Zusammenfassungen; prueft Outputs.",
            3: "Setzt KI gezielt fuer Projektdokumentation ein; optimiert Prompts situativ.",
            4: "Etabliert wiederverwendbare KI-Vorlagen fuer Projektberichte und Angebote.",
            5: "Definiert KI-Nutzungsstandards fuer den Projekt-Support-Bereich.",
          },
        },
      ],
    },
    {
      name: "Methodisch",
      skills: [
        {
          name: "Einsatzplanung & Ressourcenverfolgung",
          dep: "Durable",
          targetLevel: 3,
          keySkill: true,
          trend: "stabil",
          description:
            "»Operative Pflege der Einsatz- und Auslastungsplanung: Wer arbeitet in welchem Projekt, in welchem Umfang — als Grundlage fuer Abrechnung. Nicht gemeint: strategische Ressourcenplanung oder Kapazitaetsentscheidungen. Typische Taetigkeiten: Projektzuordnungen erfassen und aktuell halten · Auslastungsuebersichten fuer Projektleitungen aufbereiten · Abweichungen zwischen Planung und Ist erkennen und melden«",
          anchors: {
            1: "Traegt Zuordnungen auf Anweisung ein; braucht Unterstuetzung bei der Auswertung.",
            2: "Pflegt Einsatzplanung eigenstaendig; erstellt einfache Auslastungsuebersichten.",
            3: "Haelt Ressourcenverfolgung vollstaendig aktuell; erkennt Luecken und Konflikte proaktiv.",
            4: "Analysiert Auslastungsmuster; bereitet Entscheidungsgrundlagen fuer Fuehrungskraefte auf.",
            5: "Entwickelt Standards fuer Einsatzplanung; optimiert Prozesse und Tools.",
          },
        },
        {
          name: "Projektabrechnung & Rechnungsvorbereitung",
          dep: "Durable",
          targetLevel: 5,
          keySkill: true,
          trend: "steigend",
          trendgrund:
            "Die Rolle traegt diesen Prozess end-to-end allein; mit wachsendem externem Geschaeft nimmt Volumen und Komplexitaet der Abrechnung weiter zu.",
          description:
            "»Vorbereitung von Projektabrechnungen: Stundennachweise pruefen, Abrechnungsunterlagen zusammenstellen und Rechnungen fuer den Kunden erstellen. Nicht gemeint: Buchungsvorgaenge in der Finanzbuchhaltung. Typische Taetigkeiten: Stundennachweise auf Vollstaendigkeit und Richtigkeit pruefen · Abrechnungsunterlagen fuer den Kunden zusammenstellen · Rechnungsdaten an Buchhaltung uebergeben«",
          anchors: {
            1: "Sammelt Unterlagen auf Anweisung; braucht Unterstuetzung bei der Pruefung.",
            2: "Prueft Stundennachweise eigenstaendig; stellt Abrechnungsunterlagen zusammen.",
            3: "Steuert den Abrechnungsprozess von A bis Z; klaert Unstimmigkeiten proaktiv.",
            4: "Optimiert Abrechnungsprozesse; reduziert Fehlerquote und Klaerrunden.",
            5: "Entwickelt Abrechnungsstandards; gilt als Referenz fuer den Rechnungsprozess.",
          },
        },
        {
          name: "Angebots- & Auftragsadministration",
          dep: "Durable",
          targetLevel: 3,
          trend: "stabil",
          description:
            "»Administrative Unterstuetzung bei der Vorbereitung und Anlage von Angeboten und Auftraegen. Nicht gemeint: kaufmaennische Verhandlung oder Angebotsstrategie. Typische Taetigkeiten: Angebotsvorlagen aufbereiten und Inhalte einpflegen · Auftraege im System anlegen · Unterlagen fuer Angebotsprozesse zusammenstellen, Unterschriftsprozess begleiten und Unterlagen verschicken, nachhalten und ablegen«",
          anchors: {
            1: "Pflegt Vorlagen auf Anweisung; traegt Inhalte ein.",
            2: "Bereitet Angebote und Auftraege eigenstaendig nach Vorlage vor.",
            3: "Koordiniert Angebotsprozess administrativ vollstaendig; prueft Vollstaendigkeit.",
            4: "Optimiert Angebotsvorlagen und -prozesse; verkuerzt Durchlaufzeiten.",
            5: "Entwickelt Standards fuer Angebots- und Auftragsadministration.",
          },
        },
        {
          name: "Projektdokumentation & Ablage",
          dep: "Durable",
          targetLevel: 2,
          trend: "stabil",
          description:
            "»Strukturiertes Fuehren und Aktualisieren von Projektakten, Vertraegen und Dokumenten ueber den gesamten Projektlebenszyklus. Typische Taetigkeiten: Projektordner anlegen und Dokumente strukturiert ablegen · Versionierung und Aktualitaet sicherstellen · Archivierung abgeschlossener Projekte koordinieren«",
          anchors: {
            1: "Legt Dokumente nach vorgegebener Struktur ab.",
            2: "Fuehrt Projektablage eigenstaendig; haelt Versionierung ein.",
            3: "Stellt Aktualitaet und Auffindbarkeit proaktiv sicher; koordiniert Ablage ueber mehrere Projekte.",
            4: "Entwirft Ablagekonzepte fuer neue Projekttypen; optimiert Dokumentenfluss.",
            5: "Definiert Dokumentationsstandards fuer alle Projekte.",
          },
        },
      ],
    },
    {
      name: "Kommunikation & Zusammenarbeit",
      skills: [
        {
          name: "Schnittstelle PM, Controlling & Kunde",
          dep: "Durable",
          targetLevel: 3,
          keySkill: true,
          trend: "steigend",
          trendgrund:
            "Wenn Routineaufgaben zunehmend an KI abgegeben werden, gewinnt die menschliche Schnittstelle zum Kunden an Gewicht.",
          description:
            "»Koordination des Informationsflusses zwischen Projektleitungen, Controlling und Kunden auf operativer Ebene — zuverlaessig, klar und ohne Informationsverlust. Typische Taetigkeiten: Rueckfragen zu Stunden und Rechnungen klaeren · Status-Updates an Projektleitungen weiterleiten · Offene Punkte nachverfolgen und eskalieren«",
          anchors: {
            1: "Leitet Informationen auf Anweisung weiter.",
            2: "Beantwortet Standardrueckfragen eigenstaendig; leitet komplexe Faelle weiter.",
            3: "Koordiniert Informationsfluss sicher zwischen allen Beteiligten; eskaliert proaktiv.",
            4: "Antizipiert Informationsbedarf; gestaltet Kommunikationsprozesse aktiv mit.",
            5: "Entwickelt Standards fuer die Schnittstellenkommunikation im Projektbereich.",
          },
        },
        {
          name: "Operative Kundenkommunikation",
          dep: "Durable",
          targetLevel: 3,
          trend: "steigend",
          trendgrund:
            "Wenn Routineaufgaben zunehmend an KI abgegeben werden, gewinnt die menschliche Schnittstelle zum Kunden an Gewicht.",
          description:
            "»Professionelle schriftliche Kommunikation mit Kunden zu operativen Projektthemen: Rechnungsrueckfragen, Lieferbestaetigung, Terminkoordination. Nicht gemeint: strategische Kundenbeziehung oder Vertrieb. Typische Taetigkeiten: Rueckfragen zu Rechnungen und Lieferungen klaeren · Terminerinnerungen und Statusinfos versenden · Anfragen an zustaendige Projektleitungen weiterleiten«",
          anchors: {
            1: "Kommuniziert nach Vorlage; leitet Rueckfragen weiter.",
            2: "Beantwortet operative Kundenanfragen eigenstaendig; haelt Ton professionell.",
            3: "Klaert auch komplexere Rueckfragen eigenstaendig; repraesentiert das Unternehmen sicher.",
            4: "Bewaeltigt schwierige Situationen souveraen; kommuniziert auch bei Konflikten deeskalierend.",
            5: "Gilt als Vorbild fuer operative Kundenkommunikation; schult andere.",
          },
        },
        {
          ...RUMP_VERBAL,
          targetLevel: 3,
          trend: "steigend",
          trendgrund:
            "Traegt die Qualitaet der Schnittstellen- und Kundenkommunikation, die im selben Zug an Bedeutung gewinnt.",
        },
      ],
    },
  ],
};

const itAdmin: Role = {
  id: "it-admin",
  name: "IT-Admin",
  description:
    "Interner IT-Generalist — verantwortet Enduser-Support, Infrastruktur, Sicherheit und alle IT-Betriebsaufgaben in einer gemischten Windows/macOS-Umgebung.",
  categories: [
    {
      name: "Fachlich",
      skills: [
        {
          name: "ITIL / IT Service Management",
          dep: "Durable",
          targetLevel: 2,
          description:
            "»Grundkenntnisse der ITIL-Konzepte als Rahmen fuer strukturierten IT-Betrieb: Incident, Problem, Change und Service Request Management. Nicht gemeint: ITIL-Zertifizierung oder formales ITSM-Tool-Rollout. Typische Taetigkeiten: Anfragen und Stoerungen nach Typ kategorisieren · Loesungen in Wissensdatenbank dokumentieren · Aenderungen am System strukturiert durchfuehren und kommunizieren«",
          anchors: {
            1: "Kennt ITIL-Begriffe; handelt intuitiv ohne formalen Rahmen.",
            2: "Wendet ITIL-Konzepte fuer Incident und Change grundlegend an.",
            3: "Strukturiert IT-Betrieb nach ITIL-Prinzipien eigenstaendig; dokumentiert systematisch.",
            4: "Entwickelt Service-Prozesse weiter; misst und verbessert Service-Qualitaet.",
            5: "Definiert ITSM-Framework fuer das Unternehmen; einfuehren strukturierter Prozesse.",
          },
        },
        {
          name: "IT-Sicherheit & Informationssicherheit",
          dep: "Evolving",
          targetLevel: 3,
          keySkill: true,
          description:
            "»Grundlegendes Verstaendnis von IT-Sicherheitsprinzipien und -bedrohungen sowie deren Umsetzung im IT-Betrieb: Zugriffsschutz, Endpoint-Security, Datensicherung, Phishing-Praevention. Nicht gemeint: Penetration Testing oder SOC-Betrieb. Typische Taetigkeiten: Sicherheitsupdates und Patches zeitnah einspielen · Sicherheitsvorfaelle erkennen und melden · Mitarbeitende zu Sicherheitsrisiken sensibilisieren«",
          anchors: {
            1: "Kennt gaengige Bedrohungen dem Namen nach; haelt Grundregeln ein.",
            2: "Erklaert Sicherheitsprinzipien; setzt Basisschutz eigenstaendig um.",
            3: "Bewertet Sicherheitsrisiken im IT-Betrieb eigenstaendig; haertet Systeme proaktiv.",
            4: "Entwickelt Sicherheitskonzepte; reagiert strukturiert auf Sicherheitsvorfaelle.",
            5: "Definiert Informationssicherheits-Standards; gestaltet Security-Kultur im Unternehmen.",
          },
        },
        {
          name: "Datenschutz & IT-Compliance (DSGVO/TOM)",
          dep: "Durable",
          targetLevel: 2,
          description:
            "»Kenntnisse der technischen und organisatorischen Massnahmen (TOM) gemaess DSGVO aus IT-Sicht: Zugriffsrechte, Verschluesselung, Loeschkonzepte. Nicht gemeint: Datenschutzrecht im juristischen Sinne. Typische Taetigkeiten: Berechtigungskonzepte DSGVO-konform umsetzen · Loeschfristen technisch unterstuetzen · IT-relevante Aspekte im Verarbeitungsverzeichnis zuarbeiten«",
          anchors: {
            1: "Kennt DSGVO-Grundbegriffe; haelt Vorgaben auf Hinweis ein.",
            2: "Setzt technische Datenschutzmassnahmen eigenstaendig um; kennt TOM-Anforderungen.",
            3: "Bewertet IT-Systeme auf Datenschutzkonformitaet; empfiehlt Massnahmen.",
            4: "Gestaltet Berechtigungs- und Loeschkonzepte; unterstuetzt Datenschutzbeauftragte.",
            5: "Definiert IT-seitige Datenschutzstandards; verantwortet technische Compliance.",
          },
        },
        {
          name: "Incident Response Grundlagen",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Strukturiertes Vorgehen bei IT-Sicherheitsvorfaellen: Erkennung, Eindaemmung, Analyse und Wiederherstellung. Nicht gemeint: forensische Analyse oder professioneller SOC-Betrieb. Typische Taetigkeiten: Sicherheitsvorfaelle klassifizieren und erste Massnahmen einleiten · Betroffene Systeme isolieren · Vorfaelle dokumentieren und Eskalation ausloesen«",
          anchors: {
            1: "Erkennt offensichtliche Vorfaelle; meldet auf Anweisung.",
            2: "Reagiert auf gaengige Vorfaelle nach Playbook eigenstaendig.",
            3: "Leitet Incident-Response strukturiert ein; dokumentiert und kommuniziert sicher.",
            4: "Analysiert Vorfaelle ursaechengenau; entwickelt Praevention daraus.",
            5: "Definiert Incident-Response-Prozesse; schult andere.",
          },
        },
        { ...RUMP_DIGITALE, targetLevel: 3 },
      ],
    },
    {
      name: "Technisch",
      skills: [
        {
          name: "Windows & macOS Administration",
          dep: "Durable",
          targetLevel: 4,
          keySkill: true,
          description:
            "»Administration von Windows- und macOS-Endgeraeten in einer gemischten Unternehmensumgebung: Einrichtung, Konfiguration, Fehlerbehebung und Pflege. Typische Taetigkeiten: Neue Geraete einrichten und provisionieren · Betriebssystemprobleme diagnostizieren und loesen · Updates und Konfigurationsrichtlinien ausrollen«",
          anchors: {
            1: "Bedient beide Systeme; loest einfache Probleme mit Anleitung.",
            2: "Richtet Geraete eigenstaendig ein; loest gaengige Probleme.",
            3: "Administriert beide Systeme sicher; automatisiert wiederkehrende Aufgaben.",
            4: "Optimiert Geraetekonfiguration und Provisionierung; definiert Systemstandards.",
            5: "Gilt als Referenz fuer beide Plattformen; entwickelt Device-Management-Konzepte.",
          },
        },
        {
          name: "Linux-Administration",
          dep: "Durable",
          targetLevel: 4,
          keySkill: true,
          description:
            "»Administration von Linux-Servern und -Systemen als primaere Infrastrukturplattform: Installation, Konfiguration, Dienstverwaltung und Fehlerbehebung. Typische Taetigkeiten: Linux-Server aufsetzen und konfigurieren · Dienste und Prozesse verwalten (systemd, Cronjobs) · Probleme mit Logs und CLI-Tools diagnostizieren und beheben«",
          anchors: {
            1: "Navigiert in der Linux-Shell; loest einfache Aufgaben mit Anleitung.",
            2: "Richtet Linux-Systeme eigenstaendig ein; behebt gaengige Probleme.",
            3: "Administriert Linux-Server vollstaendig; automatisiert Aufgaben mit Shell-Skripten.",
            4: "Entwirft und betreibt Linux-basierte Infrastruktur eigenverantwortlich; optimiert Systemkonfigurationen.",
            5: "Definiert Linux-Standards und -Architektur; gilt als Plattform-Referenz.",
          },
        },
        {
          name: "Server-Infrastrukturbetrieb",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Aufbau, Betrieb und Verwaltung physischer und virtueller Server fuer interne IT-Dienste. Typische Taetigkeiten: Server provisionieren und in Betrieb nehmen · Interne Dienste (Dateifreigaben, interne Plattformen) konfigurieren und betreiben · Serverauslastung und -gesundheit ueberwachen und auf Auffaelligkeiten reagieren«",
          anchors: {
            1: "Bedient vorhandene Server nach Anleitung; kennt grundlegende Konzepte.",
            2: "Betreibt und wartet Standardserver eigenstaendig; behebt gaengige Probleme.",
            3: "Richtet Server und Dienste eigenverantwortlich ein; betreibt Infrastruktur zuverlaessig.",
            4: "Plant und optimiert Serverinfrastruktur; entwickelt Betriebskonzepte und Redundanzloesungen.",
            5: "Definiert Infrastruktur-Architektur; verantwortet Betriebsstabilitaet und Kapazitaetsplanung.",
          },
        },
        {
          name: "Microsoft 365 Administration",
          dep: "Evolving",
          targetLevel: 4,
          keySkill: true,
          description:
            "»Administration des Microsoft 365 Tenants: Benutzer- und Lizenzverwaltung, Exchange Online, SharePoint, Teams und Sicherheitsrichtlinien im Admin Center. Typische Taetigkeiten: Benutzer anlegen, aendern und deprovisionieren · Lizenzen zuweisen und optimieren · Sicherheitsrichtlinien und Conditional Access konfigurieren«",
          anchors: {
            1: "Legt Benutzer an; fuehrt einfache Aufgaben im Admin Center mit Anleitung durch.",
            2: "Verwaltet Benutzer und Lizenzen eigenstaendig; loest gaengige Probleme.",
            3: "Administriert M365 vollstaendig; konfiguriert Sicherheitsrichtlinien und Dienste.",
            4: "Optimiert Tenant-Konfiguration; entwickelt Richtlinien und automatisiert mit PowerShell.",
            5: "Verantwortet M365-Strategie; gilt als Plattform-Expertin.",
          },
        },
        {
          name: "Active Directory / Entra ID (Azure AD)",
          dep: "Evolving",
          targetLevel: 3,
          description:
            "»Verwaltung von Identitaeten, Gruppen und Berechtigungen in Active Directory und/oder Entra ID als zentrales Zugangssystem. Typische Taetigkeiten: Benutzer und Gruppen verwalten · Berechtigungen vergeben und entziehen · Synchronisation zwischen on-premise AD und Entra ID ueberwachen«",
          anchors: {
            1: "Kennt Grundkonzepte; legt Benutzer mit Anleitung an.",
            2: "Verwaltet Benutzer und Gruppen eigenstaendig; vergibt Standardberechtigungen.",
            3: "Administriert AD/Entra ID vollstaendig; gestaltet Berechtigungsstruktur.",
            4: "Entwickelt Berechtigungskonzepte; konfiguriert Hybrid-Umgebungen.",
            5: "Definiert Identity-Management-Standards; verantwortet Zugriffsarchitektur.",
          },
        },
        {
          name: "Netzwerk (LAN, WLAN, Firewall, VPN, DHCP/DNS)",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Administration und Fehlerdiagnose von Unternehmensnetzen: kabelgebundene und kabellose Infrastruktur, Firewall-Regeln, VPN-Zugaenge sowie DHCP- und DNS-Dienste. Typische Taetigkeiten: Netzwerkprobleme diagnostizieren und beheben · DHCP- und DNS-Server konfigurieren und verwalten · VPN-Zugaenge einrichten und WLAN-Infrastruktur pflegen«",
          anchors: {
            1: "Kennt Netzwerkgrundlagen; loest einfache Verbindungsprobleme.",
            2: "Diagnostiziert gaengige Netzwerkprobleme eigenstaendig; konfiguriert WLAN und DHCP.",
            3: "Administriert Netzwerkinfrastruktur vollstaendig inkl. DNS/DHCP; konfiguriert Firewall-Grundregeln.",
            4: "Optimiert Netzwerkarchitektur; entwickelt Segmentierungskonzepte.",
            5: "Definiert Netzwerkstandards; plant Infrastrukturausbau.",
          },
        },
        {
          name: "Backup & Disaster Recovery",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Konzeption, Betrieb und regelmaessige Ueberpruefung von Datensicherungs- und Wiederherstellungsprozessen. Typische Taetigkeiten: Backup-Jobs konfigurieren und ueberwachen · Wiederherstellungen durchfuehren und testen · Recovery-Ziele (RPO, RTO) kennen und einhalten«",
          anchors: {
            1: "Kennt Backup-Grundkonzepte; ueberwacht vorhandene Jobs.",
            2: "Konfiguriert und ueberwacht Backups eigenstaendig; fuehrt einfache Restores durch.",
            3: "Betreibt Backup vollstaendig; testet Wiederherstellung regelmaessig.",
            4: "Entwickelt DR-Konzept; stellt RPO/RTO-Einhaltung sicher.",
            5: "Verantwortet Business-Continuity-Planung; prueft DR-Konzept regelmaessig.",
          },
        },
        {
          name: "Endpoint Security & Antivirus",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Betrieb und Ueberwachung von Endpoint-Protection-Loesungen auf allen Endgeraeten. Typische Taetigkeiten: Endpoint-Protection-Software ausrollen und aktuell halten · Alerts pruefen und Massnahmen einleiten · Quarantaene-Ereignisse bewerten«",
          anchors: {
            1: "Kennt den eingesetzten Endpoint-Schutz; eskaliert Alerts.",
            2: "Ueberwacht Endpoint-Schutz eigenstaendig; behebt gaengige Erkennungen.",
            3: "Administriert Endpoint-Security vollstaendig; bewertet Alerts und leitet Massnahmen ein.",
            4: "Optimiert Erkennungsregeln; integriert Endpoint-Security in Sicherheitsprozesse.",
            5: "Definiert Endpoint-Security-Standard; bewertet und waehlt Loesungen.",
          },
        },
        {
          name: "Mobile Device Management (MDM)",
          dep: "Evolving",
          targetLevel: 3,
          description:
            "»Verwaltung und Absicherung von mobilen Endgeraeten (Smartphones, Tablets) und Laptops ueber eine MDM-Loesung (z. B. Intune). Typische Taetigkeiten: Geraete einschreiben und konfigurieren · Compliance-Richtlinien ausrollen · Geraete bei Verlust remote loeschen · Updates auf verwalteten Geraeten forcieren«",
          anchors: {
            1: "Kennt MDM-Grundkonzepte; schreibt Geraete mit Anleitung ein.",
            2: "Schreibt Geraete eigenstaendig ein; rollt Standardrichtlinien aus.",
            3: "Administriert MDM vollstaendig; entwickelt Compliance-Richtlinien.",
            4: "Optimiert MDM-Konfiguration; integriert mit M365 und Conditional Access.",
            5: "Definiert Device-Management-Strategie; waehlt und einfuehrt MDM-Loesungen.",
          },
        },
        {
          name: "MFA & SSO Konfiguration",
          dep: "Evolving",
          targetLevel: 3,
          description:
            "»Konfiguration und Betrieb von Multi-Faktor-Authentifizierung und Single Sign-On als Basis fuer sicheren Identitaetsschutz. Typische Taetigkeiten: MFA fuer alle Mitarbeitenden ausrollen und Ausnahmen verwalten · SSO fuer Unternehmensanwendungen konfigurieren · Authentifizierungsprobleme der Nutzer loesen«",
          anchors: {
            1: "Kennt MFA und SSO; loest einfache Probleme mit Anleitung.",
            2: "Richtet MFA eigenstaendig ein; unterstuetzt Nutzer bei Problemen.",
            3: "Konfiguriert MFA und SSO vollstaendig; entwickelt Richtlinien.",
            4: "Implementiert Conditional Access; optimiert Authentifizierungsfluss.",
            5: "Definiert Identity-Security-Standards; prueft und verbessert regelmaessig.",
          },
        },
        {
          name: "Cloud-Grundlagen (Azure / AWS)",
          dep: "Evolving",
          targetLevel: 2,
          description:
            "»Grundlegendes Verstaendnis von Cloud-Diensten und deren Administration fuer typische IT-Admin-Aufgaben: virtuelle Maschinen, Speicher, Netzwerk. Nicht gemeint: Cloud-Entwicklung oder Cloud-Architektur. Typische Taetigkeiten: Einfache Cloud-Ressourcen einrichten und ueberwachen · Kosten und Nutzung ueberblicken · Cloud-Dienste in bestehende Infrastruktur integrieren«",
          anchors: {
            1: "Kennt Cloud-Grundbegriffe; navigiert in Cloud-Portalen.",
            2: "Richtet einfache Cloud-Ressourcen eigenstaendig ein; ueberwacht Nutzung.",
            3: "Administriert Cloud-Dienste fuer den IT-Betrieb; integriert mit on-premise.",
            4: "Optimiert Cloud-Kosten; entwickelt Cloud-Nutzungskonzepte.",
            5: "Definiert Cloud-Strategie; plant Migration und Hybridinfrastruktur.",
          },
        },
        {
          name: "KI-Tools im IT-Admin-Kontext",
          dep: "Perishable",
          targetLevel: 2,
          trend: "stark steigend",
          description:
            "»Einsatz von KI-Assistenten fuer IT-Admin-Aufgaben: Skripte generieren, Fehler diagnostizieren, Dokumentation erstellen. Nicht gemeint: KI-basierte Sicherheitsloesungen. Typische Taetigkeiten: PowerShell-Skripte per KI vorformulieren · Fehlermeldungen per KI analysieren und loesen · Technische Dokumentation per KI strukturieren«",
          anchors: {
            1: "Kennt KI-Tools dem Namen nach.",
            2: "Nutzt KI fuer Standardaufgaben (Skripte, Fehlerrecherche); prueft Outputs.",
            3: "Setzt KI gezielt fuer Diagnose und Automatisierung ein.",
            4: "Etabliert KI-gestuetzte Prozesse im IT-Betrieb.",
            5: "Definiert KI-Nutzungsstandards im IT-Admin-Bereich.",
          },
        },
        {
          name: "Scripting & Automatisierung (PowerShell / Bash)",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Erstellung und Pflege von Skripten zur Automatisierung wiederkehrender IT-Admin-Aufgaben: Benutzerverwaltung, Systemkonfiguration, Reporting. Typische Taetigkeiten: PowerShell-Skripte fuer Benutzerverwaltung und Reporting schreiben · Bash-Skripte fuer macOS-Aufgaben erstellen · Bestehende Skripte warten und anpassen«",
          anchors: {
            1: "Fuehrt vorhandene Skripte aus; versteht grundlegende Syntax.",
            2: "Passt bestehende Skripte an; erstellt einfache Kurzskripte eigenstaendig.",
            3: "Schreibt eigenstaendig Skripte fuer typische Admin-Aufgaben; testet und dokumentiert.",
            4: "Entwickelt modulare, wiederverwendbare Skripte; automatisiert komplexe Workflows.",
            5: "Definiert Scripting-Standards; baut Automatisierungs-Bibliothek fuer den IT-Betrieb auf.",
          },
        },
      ],
    },
    {
      name: "Methodisch",
      skills: [
        {
          name: "User Support & Helpdesk",
          dep: "Durable",
          targetLevel: 4,
          keySkill: true,
          description:
            "»Erstanlaufstelle fuer alle IT-Anfragen und -Stoerungen im Unternehmen — von einfachen Passwortzuruecksetzungen bis zu komplexen Systemfehlern. Typische Taetigkeiten: Anfragen per Ticket, Telefon oder persoenlich entgegennehmen und loesen · Probleme priorisieren und eskalieren · Loesungen dokumentieren und Nutzer befaehigen«",
          anchors: {
            1: "Loest einfache Anfragen nach Anleitung; eskaliert schnell.",
            2: "Loest gaengige Anfragen eigenstaendig; erkennt wann Eskalation noetig ist.",
            3: "Loest den Grossteil aller Anfragen eigenstaendig; priorisiert sicher.",
            4: "Loest auch komplexe Anfragen; antizipiert wiederkehrende Probleme und beseitigt Ursachen.",
            5: "Entwickelt Helpdesk-Prozesse; reduziert Ticketvolumen durch Selbsthilfe-Angebote.",
          },
        },
        {
          name: "Patch- & Update-Management",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Systematisches Einspielen von Betriebssystem- und Softwareupdates auf allen Endgeraeten und Servern — zeitnah und kontrolliert. Typische Taetigkeiten: Patch-Zyklen planen und kommunizieren · Updates testen und ausrollen · Patch-Status dokumentieren und nicht-konforme Systeme nachverfolgen«",
          anchors: {
            1: "Spielt Updates manuell auf Einzelgeraeten ein.",
            2: "Rollt Updates nach Vorgabe aus; dokumentiert Patch-Status.",
            3: "Steuert Patch-Management fuer alle Systeme; erkennt und behandelt Ausnahmen.",
            4: "Automatisiert Patch-Rollout; bewertet kritische Patches und priorisiert.",
            5: "Definiert Patch-Management-Prozess; verantwortet Systemsicherheit.",
          },
        },
        {
          name: "IT-Asset-Management",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Erfassung und Verwaltung aller IT-Geraete, Software-Lizenzen und Peripherie im Unternehmen. Typische Taetigkeiten: Geraeteinventar aktuell halten · Lizenzen verwalten und Compliance sicherstellen · Geraete bei Onboarding ausgeben und bei Offboarding einziehen«",
          anchors: {
            1: "Traegt Geraete in Listen ein; braucht Anleitung bei Lizenzen.",
            2: "Fuehrt Inventar eigenstaendig; verwaltet Standardlizenzen.",
            3: "Verwaltet Assets vollstaendig; stellt Lizenz-Compliance sicher.",
            4: "Optimiert Lizenzportfolio; plant Geraetezyklen vorausschauend.",
            5: "Entwickelt Asset-Management-Konzept; definiert Standards und Prozesse.",
          },
        },
        {
          name: "IT-seitiges Onboarding & Offboarding",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Bereitstellung und Entzug von IT-Zugaengen, Geraeten und Accounts bei Eintritt und Austritt von Mitarbeitenden — zuverlaessig und zeitgerecht. Typische Taetigkeiten: Neue Mitarbeitende vollstaendig mit Geraet, Accounts und Zugaengen ausstatten · Bei Austritt alle Zugaenge konsequent und vollstaendig entziehen · Checklisten fuehren und Uebergaben dokumentieren«",
          anchors: {
            1: "Fuehrt Onboarding-Schritte nach Checkliste mit Anleitung durch.",
            2: "Fuehrt IT-Onboarding und -Offboarding eigenstaendig durch.",
            3: "Steuert On-/Offboarding vollstaendig; antizipiert Bedarfe und koordiniert mit HR.",
            4: "Optimiert Prozess; automatisiert wiederkehrende Schritte.",
            5: "Entwickelt On-/Offboarding-Standards; verantwortet Prozessqualitaet.",
          },
        },
        {
          name: "Dokumentation & Wissensdatenbank",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Erstellung und Pflege technischer Dokumentation: Systemkonfigurationen, Netzwerkplaene, Loesungsanleitungen und Self-Service-Artikel fuer Nutzer. Typische Taetigkeiten: IT-Systeme und -Konfigurationen dokumentieren · Haeufige Loesungen als Knowledgebase-Artikel aufbereiten · Dokumentation bei Aenderungen aktuell halten«",
          anchors: {
            1: "Dokumentiert auf Anweisung; Qualitaet schwankend.",
            2: "Dokumentiert eigenstaendig nach Vorlage; Knowledgebase-Artikel verstaendlich.",
            3: "Haelt Dokumentation proaktiv aktuell; Nutzerartikel reduzieren Ticket-Aufkommen.",
            4: "Entwickelt Dokumentationsstruktur; schult andere bei der Pflege.",
            5: "Definiert Dokumentationsstandards; etabliert Self-Service-Kultur.",
          },
        },
      ],
    },
    {
      name: "Kommunikation & Zusammenarbeit",
      skills: [
        {
          name: "Anwenderberatung & -schulung",
          dep: "Durable",
          targetLevel: 3,
          keySkill: true,
          description:
            "»Verstaendliche Erklaerung technischer Sachverhalte fuer nicht-technische Mitarbeitende und Begleitung bei der Nutzung neuer Tools und Systeme. Typische Taetigkeiten: Mitarbeitende zu IT-Themen beraten und schulen · Anleitungen und Tutorials erstellen · Bei Tool-Einfuehrungen Nutzende befaehigen«",
          anchors: {
            1: "Erklaert technische Sachverhalte; Sprache noch zu technisch fuer Laien.",
            2: "Erklaert verstaendlich; passt Detailtiefe grob an Zielgruppe an.",
            3: "Schult sicher und empfaengergerecht; befaehigt Nutzer zur Selbsthilfe.",
            4: "Entwickelt Schulungskonzepte; reduziert durch Befaehigung das Ticket-Aufkommen.",
            5: "Gilt als IT-Trainer; entwickelt Self-Service-Angebote fuer das Unternehmen.",
          },
        },
        {
          name: "Incident- & Stoerungskommunikation",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Proaktive und transparente Kommunikation bei IT-Stoerungen und Sicherheitsvorfaellen — an Nutzende, Fuehrungskraefte und externe Dienstleister. Typische Taetigkeiten: Stoerungen zeitnah und verstaendlich kommunizieren · Nutzende ueber Status und Massnahmen informieren · Postmortems dokumentieren und Learnings teilen«",
          anchors: {
            1: "Informiert reaktiv auf Rueckfragen.",
            2: "Kommuniziert Stoerungen proaktiv an Betroffene.",
            3: "Steuert Incident-Kommunikation strukturiert; haelt Nutzende regelmaessig auf dem Laufenden.",
            4: "Entwickelt Kommunikationsvorlagen; moderiert Incident-Calls souveraen.",
            5: "Definiert Kommunikationsstandards fuer Stoerungsmanagement.",
          },
        },
        {
          name: "IT-Dienstleister- & Lieferantenkoordination",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Koordination externer IT-Dienstleister, Hardware-Lieferanten und Software-Anbieter im laufenden Betrieb — inkl. Vertragserfuellung und Budgeteinhaltung. Typische Taetigkeiten: Dienstleister bei Stoerungen kontaktieren und eskalieren · Vertragserfuellung und Budgeteinhaltung ueberwachen · Support-Tickets bei Herstellern eroeffnen und nachverfolgen«",
          anchors: {
            1: "Kontaktiert Dienstleister auf Anweisung; leitet Informationen weiter.",
            2: "Koordiniert Standarddienstleister eigenstaendig; klaert einfache Rueckfragen.",
            3: "Steuert mehrere Dienstleister parallel; ueberwacht Vertragserfuellung und haelt Budget im Blick.",
            4: "Bewertet Dienstleisterleistungen; verhandelt Konditionen und meldet Budgetabweichungen.",
            5: "Managt Dienstleisterportfolio strategisch; verantwortet IT-Budget und Rahmenvertraege.",
          },
        },
        { ...RUMP_VERBAL, targetLevel: 3 },
      ],
    },
  ],
};

// -----------------------------------------------------------------------------
// P.O.C. (People & Organizational Change)
// -----------------------------------------------------------------------------

const ldExpert: Role = {
  id: "ld-expert",
  name: "Learning & Development Expert",
  description:
    "Konzipiert, begleitet und evaluiert Lernloesungen fuer Mitarbeiterentwicklung in einem IT-Beratungshaus mit Schwerpunkt Versicherungs-IT. Verbindet didaktisches Handwerk mit Plattform-Kompetenz und Coaching-Haltung.",
  categories: [
    {
      name: "Fachlich",
      skills: [
        {
          name: "Lerntheorien & Erwachsenenbildung",
          dep: "Durable",
          description:
            "»Anwendung lerntheoretischer Grundlagen (Konstruktivismus, Kognitivismus, Erfahrungslernen nach Kolb) fuer die Konzeption wirksamer Lernmassnahmen fuer Erwachsene. Nicht gemeint: schulpaedagogische oder Kinderbildung. Typische Taetigkeiten: Lerntheorien bei der Konzeptentscheidung begruenden · Erwachsene als selbstgesteuerte Lerner adressieren · Lernhemmnisse erkennen und konzeptionell beruecksichtigen«",
          targetLevel: 4,
          keySkill: true,
          trend: "stabil",
          trendgrund:
            "Rump 2025 (S. 5): Lernfaehigkeit als kritisches Kompetenzfeld — L&D-Profis muessen Lernprozesse bei Erwachsenen fundiert gestalten koennen.",
          bewertungsmodell: "Bloom",
          anchors: {
            1: "Kennt grundlegende Lerntheorien (Behaviorismus, Kognitivismus, Konstruktivismus) und kann sie benennen.",
            2: "Erklaert Implikationen der Erwachsenenbildung (Andragogik) fuer die Konzeption und wendet Kolbs Lernzyklus an.",
            3: "Begruendet Konzeptionsentscheidungen mit passenden Lerntheorien und passt Massnahmen an typische Lernhemmnisse Erwachsener an.",
            4: "Analysiert Lernbedarfe tiefgreifend, waehlt theoretisch fundierte Methoden-Kombinationen und evaluiert deren Wirksamkeit.",
            5: "Entwickelt neue Lernkonzepte auf Basis eigener theoretischer Synthesen und beraet andere L&D-Profis.",
          },
        },
        {
          name: "Compliance-Schulungspflichten",
          dep: "Evolving",
          description:
            "»Kenntnis regulatorisch vorgeschriebener Schulungen in der Versicherungs- und Finanz-IT (z. B. IDD, MiFID II, DSGVO, NIS2) und deren Abbildung in Lernloesungen. Nicht gemeint: eigenstaendige Rechtsberatung oder Compliance-Audit. Typische Taetigkeiten: Schulungspflichten mit Fachbereichen klaeren · Nachweispflichten und Dokumentation sicherstellen · Revisionszyklen fuer Pflichtschulungen planen«",
          targetLevel: 3,
          trend: "steigend",
          trendgrund:
            "DORA (2025) und NIS2 erfordern nachweisbare IT-Security-Schulungen; IDD-Anforderungen steigen durch neue Produktkategorien — Compliance-Schulungsbedarf im Versicherungsumfeld waechst kontinuierlich.",
          bewertungsmodell: "Bloom",
          anchors: {
            1: "Weiss, dass es Pflichtschulungen gibt und kennt einige Beispiele.",
            2: "Erklaert relevante Schulungspflichten (IDD, DSGVO) und deren Nachweisanforderungen.",
            3: "Plant und koordiniert Pflichtschulungen, stellt Dokumentation sicher und aktualisiert Inhalte bei regulatorischen Aenderungen.",
            4: "Analysiert neue Regulierungen auf Schulungsrelevanz, entwickelt vorausschauend Loesungen und beraet Fuehrungskraefte zu Pflichten.",
            5: "Entwickelt ein Compliance-Schulungskonzept fuer das gesamte Unternehmen und begleitet externe Audits.",
          },
        },
        {
          name: "Versicherungs-Karrierebilder",
          dep: "Durable",
          description:
            "»Verstaendnis der typischen Rollenprofile, Laufbahnpfade und Kompetenzanforderungen in der Versicherungs-IT-Beratung als Grundlage fuer bedarfsgerechte Lernmassnahmen. Nicht gemeint: HR-Stellenbewertung oder Gehaltsbandsysteme. Typische Taetigkeiten: Lernmassnahmen auf konkrete Rollenkontexte ausrichten · Zielgruppenspezifische Lernpfade ableiten · Karrieregespraeche mit Lernangeboten verknuepfen«",
          targetLevel: 2,
          trend: "stabil",
          trendgrund:
            "Stabile Domainkenntnis — ermoegliche zielgruppengenaue Konzeption; Rump 2025 (S. 3): Fachkompetenz als Voraussetzung fuer wirksame Lernfoerderung.",
          bewertungsmodell: "Bloom",
          anchors: {
            1: "Kennt die wichtigsten Rollen im Unternehmen (z. B. Entwickler, PM, BA, Berater).",
            2: "Erklaert typische Karrierepfade und Kompetenzanforderungen; richtet Lernmassnahmen grob an Zielgruppen aus.",
            3: "Leitet zielgruppenspezifische Lernpfade aus Rollenprofilen ab und verknuepft Lernangebote mit Karrieregespraechen.",
            4: "Beraet zu Lernpfaden fuer seltene oder neue Rollen; entwickelt Lernstrategien entlang der gesamten Employee Journey.",
            5: "Entwickelt ein Lernpfad-Konzept fuer alle Rollen und beraet Fuehrungskraefte zur kompetenzbasierten Personalentwicklung.",
          },
        },
        { ...RUMP_DIGITALE, targetLevel: 3 },
      ],
    },
    {
      name: "Technisch",
      skills: [
        {
          name: "LMS (Moodle, SAP SuccessFactors)",
          dep: "Evolving",
          description:
            "»Administration und Nutzung eines Learning Management Systems fuer die Verwaltung, Auslieferung und Nachverfolgung von Lernmassnahmen. Nicht gemeint: technische LMS-Implementierung oder Serverwartung. Typische Taetigkeiten: Kurse anlegen und pflegen · Lernpfade und Zertifizierungen konfigurieren · Abschlussquoten und Teilnahmen auswerten«",
          targetLevel: 3,
          trend: "stabil",
          trendgrund:
            "LMS bleiben zentrales Infrastrukturwerkzeug; Anbietervielfalt erhoehe aber die Notwendigkeit plattformunabhaengiger Kompetenz.",
          anchors: {
            1: "Navigiert im LMS und ruft bestehende Kurse und Berichte auf.",
            2: "Legt Kurse an, konfiguriert Zertifizierungsregeln und wertet Teilnahmedaten aus.",
            3: "Gestaltet Lernpfade und automatisierte Workflows im LMS und loest Nutzerprobleme eigenstaendig.",
            4: "Evaluiert LMS-Loesungen und begleitet Migrationen; entwickelt LMS-Nutzungskonzepte fuer das Unternehmen.",
            5: "Etabliert LMS-Governance, befaehigt andere Administratoren und fuehrt systemweite Optimierungen durch.",
          },
        },
        {
          name: "Autorentools (Articulate, Rise)",
          dep: "Evolving",
          description:
            "»Erstellung interaktiver E-Learning-Module mit Autorentools wie Articulate Storyline oder Rise 360. Nicht gemeint: Videoproduktion oder Webentwicklung. Typische Taetigkeiten: Interaktive Szenarien und Quiz-Formate entwickeln · SCORM-Pakete erstellen und im LMS publizieren · Barrierefreiheit und Mobile-Darstellung sicherstellen«",
          targetLevel: 3,
          trend: "stabil",
          trendgrund:
            "Autorentools sind Standard im E-Learning; KI-Integration in Articulate/Rise erhoehe den Effizienzgewinn bei Inhaltsproduktion.",
          anchors: {
            1: "Kennt das Tool und kann einfache Folien-basierte Module nach Vorlage erstellen.",
            2: "Entwickelt eigenstaendig interaktive Module mit Quizzen und Verzweigungen; publiziert als SCORM.",
            3: "Konzipiert und produziert professionelle E-Learning-Module mit realitaetsnahen Szenarien, Animationen und Accessibility.",
            4: "Entwirft Template-Bibliotheken und Wiederverwendungskonzepte; befaehigt andere im Tool-Einsatz.",
            5: "Entwickelt Produktionsstandards und -Workflows fuer das gesamte L&D-Team.",
          },
        },
        {
          name: "Video- & Screencast-Tools",
          dep: "Evolving",
          description:
            "»Erstellung erklaerungsstarker Lernvideos und Screencasts als ergaenzende Lernformate. Nicht gemeint: professionelle Videoproduktion oder Live-Streaming. Typische Taetigkeiten: Screencasts fuer Software-Schulungen aufzeichnen · Erklaervideos schneiden und vertonen · Videos im LMS einbinden«",
          targetLevel: 2,
          trend: "stabil",
          trendgrund:
            "Video bleibt wichtiges Lernformat; KI-gestuetzte Produktion (Synthesia, Descript) senkt Einstiegshuerde und veraendert den Workflow.",
          anchors: {
            1: "Kann einfache Screencasts aufnehmen.",
            2: "Produziert und schneidet Videos eigenstaendig; baut sie in Lerneinheiten ein.",
            3: "Entwickelt Konzept und Skript fuer strukturierte Erklaervideos; setzt multimediale Formate professionell um.",
            4: "Etabliert Video-Produktionsstandards und -Workflows; befaehigt andere.",
            5: "Entwickelt ein Medienkonzept fuer das gesamte L&D-Portfolio.",
          },
        },
        {
          name: "Learning Analytics",
          dep: "Evolving",
          description:
            "»Analyse von Lernverhaltensdaten zur Bewertung der Wirksamkeit von Massnahmen und Ableitung von Optimierungen. Nicht gemeint: umfassende People-Analytics oder HR-Reporting. Typische Taetigkeiten: Abschlussquoten und Lernzeiten interpretieren · Abbruchmuster identifizieren · Daten fuer Managementberichte aufbereiten«",
          targetLevel: 3,
          trend: "steigend",
          trendgrund:
            "WEF Future of Jobs 2025: Datengesteuertes Entscheiden als wachsende Kompetenz; datenbasierte Rechtfertigung von L&D-Investitionen steigt in Bedeutung.",
          anchors: {
            1: "Kann Standardberichte im LMS abrufen und lesen.",
            2: "Wertet Teilnahme- und Abschlussdaten aus; identifiziert offensichtliche Muster.",
            3: "Fuehrt tiefergehende Analysen zu Lernwirksamkeit und -abbruechen durch; leitet Optimierungsmassnahmen ab.",
            4: "Entwickelt ein Kennzahlen-Framework fuer L&D-Massnahmen; berichtet an Fuehrungskraefte evidenzbasiert.",
            5: "Baut ein L&D-Analytics-System auf; beraet zu datengesteuerter Lernkultur.",
          },
        },
        {
          name: "KI-gestuetzte Content-Erstellung",
          dep: "Perishable",
          description:
            "»Einsatz von KI-Werkzeugen (z. B. ChatGPT, Claude, Synthesia, Descript) zur Beschleunigung der Lerninhaltsentwicklung. Nicht gemeint: KI-Strategieentscheidung oder -Governance. Typische Taetigkeiten: Lernskripte und Quiz-Fragen mit KI-Unterstuetzung erstellen · KI-generierte Inhalte auf didaktische Qualitaet pruefen · Workflows fuer KI-unterstuetzte Produktion aufbauen«",
          targetLevel: 2,
          trend: "stark steigend",
          trendgrund:
            "WEF Future of Jobs 2025: KI-Literacy unter Top-Kompetenzen; Rump 2025 (S. 7): Digitale Anwendungskompetenz — KI veraendert L&D-Content-Produktion fundamental.",
          anchors: {
            1: "Kennt KI-Tools fuer Content-Erstellung und hat erste Erfahrungen gemacht.",
            2: "Nutzt KI-Assistenten zur Entwurfserstellung und prueft Ergebnisse kritisch auf didaktische Qualitaet.",
            3: "Entwickelt eigene Prompting-Strategien fuer L&D-spezifische Content-Typen; baut wiederverwendbare Workflows.",
            4: "Bewertet KI-Tools systematisch fuer den L&D-Kontext und etabliert Qualitaetssicherungsprozesse.",
            5: "Entwickelt Richtlinien fuer KI-Einsatz in der Lerninhaltsentwicklung und befaehigt das L&D-Team.",
          },
        },
      ],
    },
    {
      name: "Methodisch",
      skills: [
        {
          name: "Didaktische Konzeption (ADDIE, SAM)",
          dep: "Durable",
          description:
            "»Systematisches Vorgehen bei der Entwicklung von Lernmassnahmen nach etablierten Instruktionsdesign-Modellen (ADDIE, SAM, Blooms Lernzieltaxonomie). Nicht gemeint: agiles Projektmanagement oder UX-Design. Typische Taetigkeiten: Lernbedarfsanalyse strukturiert durchfuehren · Lernziele nach Bloom formulieren · Massnahmen von Analyse bis Evaluation durchgaengig konzipieren«",
          targetLevel: 4,
          keySkill: true,
          trend: "stabil",
          trendgrund:
            "Rump 2025 (S. 4): Strukturierungskompetenz als Kernkompetenz — didaktische Methodik bleibt Fundament wirksamer Lernentwicklung, unabhaengig von Digitalisierung.",
          anchors: {
            1: "Kennt ADDIE-Phasen und kann sie benennen.",
            2: "Fuehrt Bedarfsanalyse und Lernzieldefinition nach Vorlage durch; wendet ADDIE-Schritte an.",
            3: "Konzipiert Lernmassnahmen eigenstaendig nach ADDIE; formuliert SMART-Lernziele und plant Evaluierung.",
            4: "Analysiert komplexe Lernbedarfe aus mehreren Perspektiven; waehlt Methoden-Mix begruendet und iteriert mit SAM-Ansatz.",
            5: "Entwickelt eigene Konzeptionsmethoden; befaehigt andere L&D-Profis und beraet zur didaktischen Qualitaetssicherung.",
          },
        },
        {
          name: "Blended Learning Architekturen",
          dep: "Evolving",
          description:
            "»Konzeption hybrider Lernloesungen, die Praesenz-, Online- und Selbstlernphasen sinnvoll miteinander verbinden. Nicht gemeint: reine Online-Kurse oder reine Praesenztrainings. Typische Taetigkeiten: Lernreise ueber mehrere Formate hinweg gestalten · Praesenz- und Online-Anteile sinnvoll verzahnen · Transferphasen konzipieren und begleiten«",
          targetLevel: 3,
          trend: "steigend",
          trendgrund:
            "Hybrides Arbeiten erfordert hybride Lernloesungen; WEF 2025 nennt Flexibilitaet als Kernkompetenz des Lernens.",
          anchors: {
            1: "Kennt den Begriff Blended Learning und kann Beispiele nennen.",
            2: "Entwickelt einfache Blended-Learning-Konzepte mit Praesenz- und E-Learning-Anteilen.",
            3: "Konzipiert mehrstufige Lernreisen mit sinnvoller Verzahnung aller Phasen inklusive Transferbegleitung.",
            4: "Entwirft komplexe Blended-Architekturen fuer groessere Zielgruppen; optimiert auf Basis von Wirksamkeitsdaten.",
            5: "Entwickelt Blended-Learning-Standards fuer das Unternehmen und befaehigt andere Konzepteure.",
          },
        },
        {
          name: "E-Learning / Microlearning Konzepte",
          dep: "Evolving",
          description:
            "»Konzeption kurzer, fokussierter digitaler Lerneinheiten fuer den Einsatz im Workflow (Learning in the Flow of Work). Nicht gemeint: Autoren-Tool-Bedienung oder LMS-Administration. Typische Taetigkeiten: Microlearning-Sequenzen fuer Compliance-Themen entwickeln · Push-Formate fuer mobiles Lernen konzipieren · Lernrhythmen und Wiederholungsintervalle planen«",
          targetLevel: 3,
          trend: "steigend",
          trendgrund:
            "WEF 2025: Lernformate muessen in den Arbeitsfluss integriert werden — Microlearning ist Standardformat fuer kontinuierliche Kompetenzentwicklung.",
          anchors: {
            1: "Kennt das Microlearning-Konzept und kann Beispiele benennen.",
            2: "Entwickelt einzelne Microlearning-Einheiten nach Vorlage.",
            3: "Konzipiert eine Microlearning-Sequenz von der Lernzielanalyse bis zur Auslieferung.",
            4: "Entwickelt ein Microlearning-Konzept fuer eine Kompetenzdomaene; bewertet Formate nach Wirksamkeit.",
            5: "Entwickelt Standards fuer Microlearning im Unternehmen; beraet zu Learning-in-the-Flow-of-Work-Strategien.",
          },
        },
        {
          name: "Lernpfade & Lernreisen gestalten",
          dep: "Durable",
          description:
            "»Entwicklung strukturierter Lernpfade, die Mitarbeitende von einem definierten Ausgangs- zu einem Zielkompetenzniveau begleiten. Nicht gemeint: operative Schulungsplanung oder Terminmanagement. Typische Taetigkeiten: Kompetenzniveaus entlang eines Pfads definieren · Inhalte in eine sinnvolle Lernsequenz bringen · Meilensteine und Fortschrittsanzeiger gestalten«",
          targetLevel: 3,
          trend: "steigend",
          trendgrund:
            "Rump 2025 (S. 5): Lernfaehigkeit als individuelles Kompetenzfeld — strukturierte Pfade helfen Mitarbeitenden beim eigengesteuerten Lernen.",
          anchors: {
            1: "Kennt Beispiele fuer Lernpfade.",
            2: "Strukturiert vorhandene Inhalte in eine logische Lernsequenz.",
            3: "Entwickelt eigenstaendig einen Lernpfad von der Kompetenzanalyse bis zur Inhaltssequenzierung.",
            4: "Gestaltet personalisierbare Lernpfade fuer unterschiedliche Vorkenntnisse; integriert Fortschrittsmessung.",
            5: "Entwickelt ein Lernpfad-Framework fuer alle Rollen und Karrierestufen im Unternehmen.",
          },
        },
        {
          name: "Lernziel- und Kompetenzdefinition",
          dep: "Durable",
          description:
            "»Praezise Formulierung von Lernzielen nach Blooms Taxonomie und Ableitung von Kompetenzanforderungen aus Rollenbildern. Nicht gemeint: strategische Kompetenzmodellierung (PE-Aufgabe). Typische Taetigkeiten: Lernziele auf den drei Taxonomieebenen (Wissen, Koennen, Haltung) formulieren · Lernziele mit Evaluationsmassnahmen verknuepfen · Kompetenzanforderungen aus Jobprofilen in Lernziele uebersetzen«",
          targetLevel: 4,
          trend: "stabil",
          trendgrund:
            "Rump 2025 (S. 4): Strukturierungskompetenz — klare Lernziele sind Grundvoraussetzung fuer wirksame und evaluierbare Massnahmen.",
          anchors: {
            1: "Kennt die drei Ebenen von Lernzielen (Wissen, Koennen, Haltung).",
            2: "Formuliert Lernziele nach Bloom mit messbaren Verben eigenstaendig.",
            3: "Leitet Lernziele aus Kompetenzanforderungen ab; verknuepft sie mit passenden Evaluationsmassnahmen.",
            4: "Analysiert komplexe Rollenanforderungen und uebersetzt sie in praezise, mehrstufige Lernzielarchitekturen.",
            5: "Entwickelt Lernziel-Standards und schult andere L&D-Profis und Trainer.",
          },
        },
        {
          name: "Peer Learning & Lerngruppen",
          dep: "Durable",
          description:
            "»Initiierung und Begleitung von Peer-Learning-Formaten (Lerngruppen, Learning Circles, Peer Coaching) als Ergaenzung zu formal gestalteten Massnahmen. Nicht gemeint: Community-Management oder Wissensmanagement. Typische Taetigkeiten: Peer-Learning-Gruppen gruenden und begleiten · Peer-Coaching-Tandems vermitteln · Lerngruppen-Rituale und Inhalte bereitstellen«",
          targetLevel: 3,
          trend: "steigend",
          trendgrund:
            "WEF 2025: Kollaborative Lernformen gewinnen durch hybrides Arbeiten an Bedeutung; Rump 2025 (S. 5): Soziale Lernkomponente staerkt Transferwirkung.",
          anchors: {
            1: "Kennt das Konzept Peer Learning und kann Beispiele nennen.",
            2: "Unterstuetzt bestehende Peer-Gruppen organisatorisch.",
            3: "Gruendet und begleitet Peer-Learning-Gruppen eigenstaendig; stellt Strukturen und Materialien bereit.",
            4: "Entwickelt ein Peer-Learning-Konzept fuer das Unternehmen; skaliert auf mehrere Gruppen.",
            5: "Etabliert Peer Learning als Lernkultur-Element; befaehigt interne Multiplikatoren.",
          },
        },
        {
          name: "Workshop-Design & Facilitation",
          dep: "Durable",
          description:
            "»Konzeption und Moderation von Praesenz- und Online-Workshops zu Kompetenzentwicklungs- und Lernthemen. Nicht gemeint: Teamentwicklungs-Facilitation oder Change-Workshops (OE-Bereich). Typische Taetigkeiten: Workshop-Design von Ziel bis Agenda · Aktivierende Methoden (World Cafe, Fishbowl) einsetzen · Gruppen durch Lernprozesse fuehren«",
          targetLevel: 4,
          keySkill: true,
          trend: "steigend",
          trendgrund:
            "Rump 2025 (S. 5-6): Empathie und Facilitationskompetenz als dauerhaft menschliche Staerke; virtuelle Facilitation gewinnt durch hybrides Arbeiten an Bedeutung.",
          anchors: {
            1: "Kann einfache Workshops nach vorgegebener Agenda moderieren.",
            2: "Entwirft und moderiert einfache Workshop-Formate eigenstaendig.",
            3: "Konzipiert komplexe, mehrstufige Workshop-Architekturen; setzt aktivierende Methoden sicher ein.",
            4: "Facilitiert anspruchsvolle Gruppen (heterogen, gross, widerstaendig) souveraen; passt Design situativ an.",
            5: "Entwickelt Facilitations-Standards und -Ausbildungen; befaehigt andere Moderatoren.",
          },
        },
        {
          name: "Evaluierung (Kirkpatrick)",
          dep: "Durable",
          description:
            "»Systematische Bewertung der Wirksamkeit von Lernmassnahmen auf allen vier Kirkpatrick-Ebenen (Reaktion, Lernen, Verhalten, Ergebnis). Nicht gemeint: allgemeines Projektcontrolling. Typische Taetigkeiten: Evaluationskonzept fuer neue Massnahmen entwickeln · Feedback und Tests auswerten · Transfererfolg im Arbeitsalltag erheben«",
          targetLevel: 3,
          trend: "steigend",
          trendgrund:
            "WEF 2025: Evidenzbasiertes L&D-Management steigt in Bedeutung — Investitionen muessen nachweisbar wirksam sein.",
          anchors: {
            1: "Kennt die vier Kirkpatrick-Ebenen.",
            2: "Erstellt Feedback-Fragebogen und einfache Wissenstests fuer Level 1-2.",
            3: "Entwickelt ein vollstaendiges Evaluationskonzept ueber alle vier Ebenen; wertet Daten aus und leitet Massnahmen ab.",
            4: "Gestaltet ROI-orientierte Evaluationsstrategien; berichtet evidenzbasiert an Fuehrungskraefte.",
            5: "Entwickelt ein unternehmensweites L&D-Evaluationsframework und befaehigt andere.",
          },
        },
      ],
    },
    {
      name: "Führung & Coaching",
      skills: [
        {
          name: "Train-the-Trainer",
          dep: "Durable",
          description:
            "»Befaehigung interner Wissenstrae ger und Fuehrungskraefte zu wirksamer Wissensvermittlung und Trainingsgestaltung. Nicht gemeint: eigene Trainingsdurchfuehrung fuer Fachinhalte. Typische Taetigkeiten: Train-the-Trainer-Programme konzipieren und durchfuehren · Feedback zu Trainingsauftritten geben · Interne Trainer begleiten und entwickeln«",
          targetLevel: 4,
          keySkill: true,
          trend: "steigend",
          trendgrund:
            "WEF 2025: Mentoring und Wissenstransfer als Fuehrungskompetenz; Rump 2025 (S. 5): Befaehigung anderer als menschliche Kernstaerke.",
          anchors: {
            1: "Hat selbst an einem Train-the-Trainer-Programm teilgenommen.",
            2: "Gibt strukturiertes Feedback zu Trainingsauftritten und unterstuetzt interne Trainer operativ.",
            3: "Konzipiert und fuehrt Train-the-Trainer-Programme durch; entwickelt interne Trainer aktiv weiter.",
            4: "Baut ein systematisches internes Trainer-Netzwerk auf; misst Trainingsqualitaet und entwickelt Standards.",
            5: "Etabliert eine interne Trainingskultur als strategischen Wettbewerbsvorteil; befaehigt L&D-Profis.",
          },
        },
        {
          name: "Coaching-Grundlagen",
          dep: "Durable",
          description:
            "»Grundlegende Coaching-Kompetenz zur unterstuetzenden Begleitung von Lernenden und Fuehrungskraeften in Entwicklungsprozessen. Nicht gemeint: professionelles Business-Coaching als Haupttaetigkeit (PE-Rolle). Typische Taetigkeiten: Lernende mit Coaching-Haltung begleiten · Fragetechniken einsetzen · Lernhindernisse im Gespraech klaeren«",
          targetLevel: 3,
          trend: "steigend",
          trendgrund:
            "Rump 2025 (S. 5-6): Empathie und soziale Unterstuetzungskompetenz als dauerhaft menschliche Staerke — Coaching-Haltung ist Grundprinzip modernen L&D.",
          anchors: {
            1: "Kennt den Unterschied zwischen Coaching, Mentoring und Training.",
            2: "Setzt grundlegende Fragetechniken (offene Fragen, Hypothesen) in Begleitgespraechen ein.",
            3: "Fuehrt entwicklungsfoerdernde Gespraeche mit Coaching-Haltung; unterstuetzt Lernende bei der Ueberwindung von Lernhindernissen.",
            4: "Befaehigt Lernende zur Selbstreflexion und eigengesteuerten Entwicklung; integriert Coaching in L&D-Formate.",
            5: "Entwickelt eine Coaching-Kultur im L&D-Bereich; befaehigt interne Trainer zu Coaching-Kompetenzen.",
          },
        },
        { ...RUMP_VERBAL, targetLevel: 3 },
      ],
    },
  ],
};

const personalentwicklung: Role = {
  id: "personalentwicklung",
  name: "Personalentwicklung",
  description:
    "Strategische und operative Entwicklung von Mitarbeitenden und Fuehrungskraeften — von Kompetenzmodellierung ueber Talent Management bis zum systemischen Coaching. Sichert die langfristige Handlungsfaehigkeit des Unternehmens durch gezielte Investitionen in menschliche Ressourcen.",
  categories: [
    {
      name: "Fachlich",
      skills: [
        {
          name: "Eignungsdiagnostik (DIN 33430)",
          dep: "Durable",
          description:
            "»Systematische Anwendung eignungsdiagnostischer Prinzipien zur Beurteilung der Eignung von Personen fuer Aufgaben oder Positionen, mit dem Ziel wachsender Orientierung an DIN 33430. Nicht gemeint: freie HR-Gespraeche ohne Anforderungsbezug. Typische Taetigkeiten: Anforderungs- und Skill-Profile erstellen · Verfahren auswaehlen und schrittweise standardisieren · Diagnostische Ergebnisse verstaendlich und kriteriengerecht rueckmelden«",
          targetLevel: 3,
          trend: "stabil",
          trendgrund:
            "DIN 33430 bleibt Standard; KI-gestuetzte Assessments erhoehen die Anforderungen an kritische Einordnung diagnostischer Ergebnisse.",
          bewertungsmodell: "Bloom",
          anchors: {
            1: "Kennt DIN 33430 und grundlegende eignungsdiagnostische Prinzipien.",
            2: "Erklaert Guetekriterien (Validitaet, Reliabilitaet, Objektivitaet) und kann gaengige Verfahren benennen.",
            3: "Fuehrt strukturierte Interviews und Feedbackprozesse eigenstaendig auf Basis vorhandener Anforderungs-/Skill-Profile durch; meldet Ergebnisse nachvollziehbar zurueck.",
            4: "Standardisiert Verfahren (Auswertungsraster, feste Kriterien), prueft erste Guetekriterien, naehert Prozesse schrittweise an DIN 33430 an; beraet andere in komplexen Faellen.",
            5: "Setzt normkonforme Verfahren um, dokumentiert Guetekriterien, etabliert unternehmensweite Standards; gibt Wissen strukturiert weiter.",
          },
        },
        {
          name: "Kompetenz- und Karrieretheorien",
          dep: "Durable",
          description:
            "»Anwendung anerkannter Kompetenz- und Karrieretheorien (z. B. Dreyfus-Modell, Schein Career Anchors, McClelland) als theoretisches Fundament fuer PE-Instrumente und Entwicklungsgespraeche. Nicht gemeint: allgemeine Personalverwaltung. Typische Taetigkeiten: Kompetenzmodelle auf Theorien aufbauen · Karrieregespraeche theoretisch fundiert fuehren · PE-Instrumente auf theoretischer Basis entwickeln«",
          targetLevel: 4,
          keySkill: true,
          trend: "stabil",
          trendgrund:
            "Rump 2025 (S. 5): Lernfaehigkeit und Karrierebegleitung — PE-Profis muessen Menschen in Entwicklungsprozessen fundiert begleiten koennen.",
          bewertungsmodell: "Bloom",
          anchors: {
            1: "Kennt gaengige Kompetenzmodelle und kann sie benennen.",
            2: "Erklaert Kernaussagen und Anwendungsfelder verschiedener Karriere- und Kompetenztheorien.",
            3: "Wendet Theorien auf konkrete PE-Instrumente und Gespraeche an; begruendet Entscheidungen theoretisch.",
            4: "Analysiert Entwicklungsbedarfe tiefgreifend unter Einsatz mehrerer Theorien; entwickelt darauf aufbauend massgeschneiderte Instrumente.",
            5: "Entwickelt neue PE-Konzepte auf eigener theoretischer Synthese; beraet und befaehigt andere PE-Profis.",
          },
        },
        {
          name: "Versicherungs-Rollenbilder",
          dep: "Durable",
          description:
            "»Kenntnis der typischen Rollenprofile, Anforderungsfelder und regulatorischen Kompetenzpflichten in der Versicherungs-IT-Beratung als Grundlage fuer PE-Massnahmen. Nicht gemeint: operative Stellenbewertung. Typische Taetigkeiten: PE-Massnahmen auf Rollenanforderungen ausrichten · Kompetenzluecken im Versicherungskontext einordnen · Fuehrungskraefte zu Entwicklungsbedarfen ihrer Rollen beraten«",
          targetLevel: 3,
          trend: "stabil",
          trendgrund:
            "Stabile Domainkenntnis als Kontext fuer passende PE-Massnahmen; neue Rollen durch KI und Regulatorik erhoehen die Anforderungen.",
          bewertungsmodell: "Bloom",
          anchors: {
            1: "Kennt die wichtigsten Rollen in der Versicherungs-IT.",
            2: "Erklaert die typischen Kompetenzanforderungen und Entwicklungspfade je Rolle.",
            3: "Richtet PE-Massnahmen zielgenau an Rollenanforderungen aus; beraet zu rollenspezifischen Luecken.",
            4: "Analysiert Verschiebungen in Rollenanforderungen durch Markt- und Regulierungstrends; entwickelt PE-Strategien vorausschauend.",
            5: "Entwickelt ein Rollenbild-Konzept und begleitet die Einfuehrung neuer Rollen aus PE-Perspektive.",
          },
        },
        { ...RUMP_DIGITALE, targetLevel: 3 },
      ],
    },
    {
      name: "Technisch",
      skills: [
        {
          name: "HR-Analytics & People Data",
          dep: "Evolving",
          description:
            "»Nutzung datenbasierter Methoden zur Analyse von Personalentwicklungstrends, Fluktuation, Skill-Gaps und Massnahmen-Wirksamkeit. Nicht gemeint: allgemeines HR-Reporting oder Lohnabrechnung. Typische Taetigkeiten: Entwicklungsdaten auswerten und Muster identifizieren · Skill-Gap-Analysen auf Datenbasis erstellen · Managementberichte zu PE-Investitionen erstellen«",
          targetLevel: 3,
          trend: "steigend",
          trendgrund:
            "WEF Future of Jobs 2025: Analytisches Denken als Top-Kompetenz; datenbasierte Personalentscheidungen werden zum Standard.",
          anchors: {
            1: "Kann Standardberichte aus HR-Systemen abrufen und lesen.",
            2: "Wertet Entwicklungsdaten eigenstaendig aus und identifiziert offensichtliche Muster.",
            3: "Fuehrt tiefergehende Analysen durch, leitet Handlungsempfehlungen ab und bereitet Ergebnisse fuer Fuehrungskraefte auf.",
            4: "Entwickelt ein People-Analytics-Konzept fuer PE; baut Kennzahlen-Dashboards auf und beraet strategisch.",
            5: "Etabliert HR-Analytics als Steuerungsinstrument; befaehigt andere und begleitet Datenstrategie-Entscheidungen.",
          },
        },
        {
          name: "HR-Systeme (SuccessFactors, Workday)",
          dep: "Evolving",
          description:
            "»Nutzung von HR-Softwareplattformen fuer die Verwaltung und Nachverfolgung von PE-Massnahmen, Talent-Reviews und Entwicklungsplaenen. Nicht gemeint: technische Systemadministration oder Implementierung. Typische Taetigkeiten: Talent-Profile und Entwicklungsplaene pflegen · Performance- und Entwicklungszyklen im System abbilden · Berichte und Auswertungen erstellen«",
          targetLevel: 3,
          trend: "stabil",
          trendgrund:
            "HR-Systeme sind Standard-Infrastruktur; Anbieter integrieren zunehmend KI-Features, die neue Kompetenzen erfordern.",
          anchors: {
            1: "Navigiert im System und kann Grunddaten einsehen.",
            2: "Pflegt Talent-Profile, Entwicklungsplaene und Schulungsnachweise eigenstaendig.",
            3: "Bildet PE-Prozesse (Talent-Reviews, Entwicklungsgespraeche) vollstaendig im System ab; erstellt aussagekraeftige Auswertungen.",
            4: "Konfiguriert und optimiert PE-Prozesse im System; begleitet Roll-outs neuer Funktionen.",
            5: "Bewertet HR-System-Loesungen strategisch; befaehigt andere und entwickelt systemgestuetzte PE-Konzepte.",
          },
        },
        {
          name: "KI im Talent Management",
          dep: "Perishable",
          description:
            "»Kritischer und verantwortungsvoller Einsatz KI-gestuetzter Tools fuer Talenterkennung, Potenzialanalyse und personalisierte Entwicklungsempfehlungen. Nicht gemeint: KI-Systemarchitektur oder -Entwicklung. Typische Taetigkeiten: KI-Empfehlungen in Talent-Reviews kritisch bewerten · Bias in KI-gestuetzter Diagnostik erkennen · KI-Tools auf ethische Anforderungen pruefen«",
          targetLevel: 2,
          trend: "stark steigend",
          trendgrund:
            "WEF Future of Jobs 2025: KI-Literacy als Top-Kompetenz; EU AI Act (2026) stellt spezifische Anforderungen an KI-Einsatz in HR-Entscheidungen.",
          anchors: {
            1: "Kennt KI-Anwendungen im HR-Kontext und typische Risiken (Bias, Datenschutz).",
            2: "Bewertet KI-gestuetzte Empfehlungen kritisch; erkennt moegliche Biases und bezieht sie in Entscheidungen ein.",
            3: "Prueft KI-Tools systematisch auf ethische und rechtliche Anforderungen; entwickelt Nutzungsrichtlinien.",
            4: "Gestaltet KI-verantwortungsvolle Talent-Prozesse; beraet Fuehrungskraefte und HR zu Einsatzgrenzen.",
            5: "Entwickelt unternehmensweite KI-Governance fuer HR; befaehigt andere und begleitet regulatorische Anforderungen.",
          },
        },
      ],
    },
    {
      name: "Methodisch",
      skills: [
        {
          name: "Kompetenzmodelle entwickeln",
          dep: "Durable",
          description:
            "»Entwicklung und Pflege von Kompetenzrahmenwerken als Grundlage fuer Stellenprofile, Personalauswahl, Entwicklung und Leistungsbeurteilung. Nicht gemeint: operative Stellenbewertung oder Gehaltsbanddefinition. Typische Taetigkeiten: Kompetenzmodell-Architektur entwickeln · Verhaltensanker je Kompetenzstufe definieren · Kompetenzmodell mit Stakeholdern abstimmen und validieren«",
          targetLevel: 4,
          keySkill: true,
          trend: "steigend",
          trendgrund:
            "WEF Future of Jobs 2025: Skills-based Organizations gewinnen an Bedeutung; Kompetenzmodelle bilden die Grundlage fuer kompetenzbasierte PE-Strategien.",
          anchors: {
            1: "Kennt gaengige Kompetenzmodell-Strukturen und kann Beispiele nennen.",
            2: "Passt bestehende Kompetenzmodelle an; ergaenzt fehlende Verhaltensanker.",
            3: "Entwickelt eigenstaendig ein Kompetenzmodell fuer eine Zielgruppe; stimmt es mit Stakeholdern ab.",
            4: "Entwickelt ein rollenuebergreifendes Kompetenzrahmenwerk; leitet daraus PE-Instrumente und Karrierepfade ab.",
            5: "Entwirft die strategische Kompetenzarchitektur des Unternehmens; beraet zum Aufbau skills-basierter Organisationsstrukturen.",
          },
        },
        {
          name: "Karrierepfade & Laufbahnmodelle",
          dep: "Durable",
          description:
            "»Design strukturierter Karrierepfade und Laufbahnmodelle (Fach- und Fuehrungslaufbahn) als Orientierungsrahmen fuer Mitarbeitende und Fuehrungskraefte. Nicht gemeint: operative Befoerderungsentscheidungen. Typische Taetigkeiten: Laufbahnmodelle fuer Fach- und Fuehrungsrollen entwickeln · Transitionspunkte und Anforderungen je Stufe definieren · Modelle kommunizieren und in Entwicklungsgespraechen einsetzen«",
          targetLevel: 4,
          trend: "stabil",
          trendgrund:
            "Rump 2025 (S. 5): Karrierewege muessen transparent sein — Mitarbeitende brauchen Orientierung in einer sich schnell veraendernden Arbeitswelt.",
          anchors: {
            1: "Kennt das Konzept der Fach- und Fuehrungslaufbahn.",
            2: "Erklaert bestehende Laufbahnmodelle und kann typische Transitionspunkte benennen.",
            3: "Entwickelt eigenstaendig ein Laufbahnmodell fuer eine Karrieredimension mit definierten Stufen und Anforderungen.",
            4: "Entwirft ein rollenuebergreifendes Laufbahnmodell fuer das Unternehmen; verknuepft es mit PE-Instrumenten.",
            5: "Entwickelt zukunftsgerichtete Karrierekonzepte fuer ein sich veraenderndes Unternehmen; befaehigt Fuehrungskraefte.",
          },
        },
        {
          name: "Nachfolgeplanung",
          dep: "Durable",
          description:
            "»Systematische Identifikation und Entwicklung von Nachfolgekandidaten fuer Schluessel- und Fuehrungspositionen. Nicht gemeint: operative Urlaubsvertretungsplanung. Typische Taetigkeiten: Nachfolger fuer kritische Positionen identifizieren und bewerten · Entwicklungsplaene fuer Nachfolgekandidaten erstellen · Nachfolge-Reviews mit Fuehrungskraeften moderieren«",
          targetLevel: 3,
          trend: "stabil",
          trendgrund:
            "Demographischer Wandel macht Nachfolgeplanung strategisch wichtiger; WEF 2025: Talentbindung ist Wettbewerbsfaktor.",
          anchors: {
            1: "Kennt das Konzept der Nachfolgeplanung und gaengige Prozessschritte.",
            2: "Unterstuetzt Nachfolge-Reviews operativ und pflegt Nachfolgedaten.",
            3: "Moderiert Nachfolge-Reviews eigenstaendig; entwickelt Foerderplaene fuer Kandidaten.",
            4: "Gestaltet einen strategischen Nachfolgeplanungsprozess fuer das Unternehmen; beraet GF und Fuehrungsebene.",
            5: "Entwickelt eine Talent-Pipeline-Strategie fuer kritische Rollen; befaehigt Fuehrungskraefte zur eigenstaendigen Nachfolgesicherung.",
          },
        },
        {
          name: "Talent Management Prozesse",
          dep: "Durable",
          description:
            "»Design und Steuerung jaehrlicher Talent-Management-Zyklen (Performance Review, Talent Review, Entwicklungsgespraeche) als integriertes System. Nicht gemeint: operative Gehaltsabrechnung oder Administrationsaufgaben. Typische Taetigkeiten: Talent-Review-Prozess entwickeln und steuern · Fuehrungskraefte im Umgang mit PE-Instrumenten befaehigen · Zyklische Massnahmen koordinieren und evaluieren«",
          targetLevel: 4,
          trend: "steigend",
          trendgrund:
            "WEF 2025: Continuous Learning und Talent-Entwicklung als strategischer Wettbewerbsvorteil; PE-Prozesse muessen sich an dynamische Arbeitswelt anpassen.",
          anchors: {
            1: "Kennt gaengige Talent-Management-Instrumente.",
            2: "Unterstuetzt Talent-Reviews und Entwicklungsgespraeche operativ.",
            3: "Steuert den Talent-Management-Zyklus eigenstaendig; befaehigt Fuehrungskraefte zur Nutzung der Instrumente.",
            4: "Entwickelt ein integriertes Talent-Management-System; verknuepft Instrumente miteinander und misst Wirksamkeit.",
            5: "Entwirft eine zukunftsgerichtete Talent-Management-Strategie; beraet GF und begleitet systemischen Wandel.",
          },
        },
        {
          name: "High Potential Programme",
          dep: "Durable",
          description:
            "»Konzeption und Steuerung von Entwicklungsprogrammen fuer besonders leistungsstarke und entwicklungsfaehige Mitarbeitende. Nicht gemeint: allgemeine Onboarding-Programme. Typische Taetigkeiten: High-Potential-Kriterien definieren und Auswahl begleiten · Programm-Curriculum entwickeln (Mentoring, Stretch Assignments, Weiterbildung) · Programmwirksamkeit evaluieren«",
          targetLevel: 3,
          trend: "stabil",
          trendgrund:
            "Talentbindung und gezielte Entwicklung von Top-Performern bleibt strategisch relevant; Programmformate werden hybrider.",
          anchors: {
            1: "Kennt das Konzept von HiPo-Programmen und gaengige Formate.",
            2: "Unterstuetzt HiPo-Programme operativ und koordiniert Massnahmen.",
            3: "Konzipiert und steuert ein HiPo-Programm eigenstaendig; begleitet Teilnehmende und berichtet an Stakeholder.",
            4: "Entwickelt ein strategisch ausgerichtetes HiPo-Programm-Portfolio; verknuepft mit Nachfolgeplanung und Kulturzielen.",
            5: "Gestaltet eine unternehmerische Talent-Strategie fuer Leistungs- und Potenzialtraeger; befaehigt Fuehrungskraefte.",
          },
        },
        {
          name: "Talent-Reviews & Kalibrierung",
          dep: "Durable",
          description:
            "»Moderation und Steuerung von Talent-Review-Konferenzen und Kalibrierungsgespraechen zur einheitlichen Beurteilung von Leistung und Potenzial. Nicht gemeint: individuelle Mitarbeiterbeurteilungen. Typische Taetigkeiten: Talent-Review-Meetings moderieren · 9-Box-Grid-Kalibrierungen begleiten · Beurteilungsfehler und Biases im Review-Prozess adressieren«",
          targetLevel: 3,
          trend: "stabil",
          trendgrund:
            "Kalibrierung von Leistungs- und Potenzialbeurteilungen bleibt notwendig fuer faire PE-Entscheidungen.",
          anchors: {
            1: "Kennt das 9-Box-Grid und typische Kalibrierungsformate.",
            2: "Unterstuetzt Talent-Reviews operativ und protokolliert Ergebnisse.",
            3: "Moderiert Talent-Reviews eigenstaendig; adressiert Biases und foerdert konsistente Beurteilungen.",
            4: "Entwickelt Kalibrierungsstandards und befaehigt Fuehrungskraefte zu fairen Beurteilungsprozessen.",
            5: "Gestaltet ein unternehmensweites Talent-Review-System; beraet GF zu strategischen Talententscheidungen.",
          },
        },
        {
          name: "Skill-Gap-Analysen (Dreyfus, 9-Box)",
          dep: "Durable",
          description:
            "»Systematische Erfassung und Analyse von Kompetenzluecken auf Individual-, Team- und Unternehmensebene als Grundlage fuer PE-Massnahmen. Nicht gemeint: jaehrliche Mitarbeiterbefragungen ohne PE-Fokus. Typische Taetigkeiten: Skill-Inventuren konzipieren und durchfuehren · Kompetenzluecken aus Daten ableiten · Massnahmenempfehlungen aus Gap-Analysen entwickeln«",
          targetLevel: 4,
          trend: "steigend",
          trendgrund:
            "WEF Future of Jobs 2025: Skills-based Organizations — systematische Skill-Gap-Analysen sind Grundlage strategischer Workforce-Planung.",
          anchors: {
            1: "Kennt gaengige Methoden zur Skill-Erfassung (z. B. Selbsteinschaetzung, Dreyfus).",
            2: "Fuehrt einfache Skill-Inventuren durch und visualisiert Ergebnisse.",
            3: "Konzipiert und steuert Skill-Gap-Analysen fuer Teams oder Bereiche; leitet Massnahmenempfehlungen ab.",
            4: "Entwickelt ein strategisches Skill-Gap-Analyse-Framework fuer das Unternehmen; verknuepft Ergebnisse mit PE-Planung und Recruiting.",
            5: "Begleitet den Aufbau einer skills-basierten Organisation; befaehigt Fuehrungskraefte zur eigenstaendigen Gap-Analyse.",
          },
        },
      ],
    },
    {
      name: "Führung & Coaching",
      skills: [
        {
          name: "Systemisches Coaching",
          dep: "Durable",
          description:
            "»Professionelle Einzelbegleitung von Mitarbeitenden und Fuehrungskraeften in beruflichen Entwicklungs- und Veraenderungssituationen mit systemisch-konstruktivistischer Haltung. Nicht gemeint: psychotherapeutische Begleitung oder Krisenintervention. Typische Taetigkeiten: Coachingprozesse eigenstaendig steuern · Systemische Fragen und Interventionen einsetzen · Ressourcen und Loesungen beim Coachee entwickeln«",
          targetLevel: 4,
          keySkill: true,
          trend: "steigend",
          trendgrund:
            "WEF Future of Jobs 2025: Coaching und Mentoring als Fuehrungskompetenz; Rump 2025 (S. 5-6): Empathie als dauerhaft menschliche Kernstaerke.",
          anchors: {
            1: "Kennt den Unterschied zwischen systemischem Coaching und Beratung.",
            2: "Fuehrt angeleitete Coaching-Einheiten durch; setzt grundlegende systemische Fragen ein.",
            3: "Steuert eigenstaendig vollstaendige Coaching-Prozesse; waehlt Interventionen situationsgerecht.",
            4: "Begleitet Fuehrungskraefte in anspruchsvollen Entwicklungs- und Veraenderungssituationen souveraen; reflektiert den eigenen Coaching-Prozess.",
            5: "Gilt als Coaching-Experte; entwickelt andere Coaches und beraet zur Coaching-Kultur.",
          },
        },
        {
          name: "Entwicklungs- und Beratungsgespraeche",
          dep: "Durable",
          description:
            "»Strukturierte Fuehrung von Entwicklungsgespraechen mit Mitarbeitenden und Fuehrungskraeften zur Foerderung von Selbstreflexion, Zielklarheit und Wachstum. Nicht gemeint: disziplinarische Gespraeche oder Performance-Improvement-Plaene. Typische Taetigkeiten: Entwicklungsgespraeche vorbereiten und strukturieren · Feedback und Beobachtungen klar und wertschaetzend kommunizieren · Entwicklungsziele gemeinsam erarbeiten«",
          targetLevel: 4,
          trend: "stabil",
          trendgrund:
            "Rump 2025 (S. 5): Empathie und Foerderung anderer als menschliche Kernstaerke; gute Entwicklungsgespraeche bleiben Kerninstrument der PE.",
          anchors: {
            1: "Kennt die Struktur und den Zweck von Entwicklungsgespraechen.",
            2: "Fuehrt einfache Entwicklungsgespraeche nach Leitfaden; gibt konstruktives Feedback.",
            3: "Begleitet Entwicklungsgespraeche eigenstaendig; foerdert Selbstreflexion und leitet konkrete Ziele ab.",
            4: "Fuehrt auch schwierige Entwicklungsgespraeche souveraen; befaehigt Fuehrungskraefte zu wirkungsvollen Gespraechen.",
            5: "Entwickelt Gespraechsfuehrungs-Standards und befaehigt andere; beraet zu Gespraechskultur im Unternehmen.",
          },
        },
        {
          name: "360°-Feedback moderieren",
          dep: "Durable",
          description:
            "»Konzeption, Durchfuehrung und Nachbereitung von 360°-Feedback-Prozessen zur Entwicklung von Selbst- und Fremdwahrnehmung. Nicht gemeint: allgemeine Mitarbeiterbefragungen. Typische Taetigkeiten: 360°-Feedback-Design (Fragebogen, Prozess) entwickeln · Auswertungsgespraeche professionell fuehren · Entwicklungsmassnahmen aus Feedback ableiten«",
          targetLevel: 3,
          trend: "stabil",
          trendgrund:
            "360°-Feedback bleibt wichtiges PE-Instrument; digitale Tools erhoehen Effizienz und Reichweite.",
          anchors: {
            1: "Kennt das Konzept und gaengige Formate von 360°-Feedback.",
            2: "Unterstuetzt 360°-Prozesse operativ; bereitet Auswertungsgespraeche vor.",
            3: "Konzipiert und steuert 360°-Feedback-Prozesse eigenstaendig; fuehrt Auswertungsgespraeche professionell.",
            4: "Entwickelt ein massgeschneidertes 360°-System; befaehigt Fuehrungskraefte zur Annahme und Nutzung von Feedback.",
            5: "Etabliert 360°-Feedback als Entwicklungskultur; befaehigt andere PE-Profis und beraet zum Design.",
          },
        },
        {
          name: "Individuelle Entwicklungsplaene",
          dep: "Durable",
          description:
            "»Gemeinsame Entwicklung und Begleitung individueller Entwicklungsplaene (IDP) als Instrument zur zielgerichteten Kompetenzentwicklung. Nicht gemeint: allgemeine Weiterbildungsadministration. Typische Taetigkeiten: IDPs gemeinsam mit Mitarbeitenden und Fuehrungskraeften erarbeiten · Massnahmen und Meilensteine realistisch planen · Fortschritt regelmaessig reflektieren und Plaene anpassen«",
          targetLevel: 3,
          trend: "stabil",
          trendgrund:
            "Individuelle Foerderung bleibt Kerninstrument der PE; digitale Tools erleichtern Pflege und Nachverfolgung.",
          anchors: {
            1: "Kennt die Komponenten eines IDP und gaengige Vorlagen.",
            2: "Unterstuetzt Mitarbeitende bei der IDP-Erstellung; pflegt IDPs im HR-System.",
            3: "Begleitet IDP-Prozesse eigenstaendig; verbindet individuelle Ziele mit Unternehmensbedarfen.",
            4: "Entwickelt ein IDP-Framework fuer das Unternehmen; befaehigt Fuehrungskraefte zur IDP-Nutzung.",
            5: "Gestaltet den IDP-Prozess als strategisches PE-Instrument; beraet GF zu individueller Foerderkultur.",
          },
        },
        {
          name: "Fuehrungskraefte-Beratung",
          dep: "Durable",
          description:
            "»Beratende Begleitung von Fuehrungskraeften zu Fragen der Teamentwicklung, Mitarbeiterfoerderung und PE-relevanter Entscheidungen. Nicht gemeint: Coaching oder Beratung zu persoenlichen Lebensfragen. Typische Taetigkeiten: Fuehrungskraefte zu Entwicklungsbedarfen ihrer Teams beraten · PE-Instrumente und deren Einsatz erklaeren und begleiten · Fuehrungskraefte in schwierigen Personalentwicklungssituationen unterstuetzen«",
          targetLevel: 4,
          trend: "steigend",
          trendgrund:
            "Rump 2025 (S. 5-6): Beratungskompetenz und Empathie als dauerhaft menschliche Staerke; Fuehrungskraefte brauchen PE-Unterstuetzung in einem sich schnell veraendernden Umfeld.",
          anchors: {
            1: "Beantwortet PE-Fragen von Fuehrungskraeften auf Nachfrage.",
            2: "Beraet Fuehrungskraefte eigenstaendig zu gaengigen PE-Instrumenten und deren Einsatz.",
            3: "Begleitet Fuehrungskraefte proaktiv bei Teamentwicklungs- und Personalentscheidungen; bringt PE-Perspektive ein.",
            4: "Wird von Fuehrungskraeften als strategischer Sparringspartner gesucht; begleitet Transformation und PE-Strategieentscheidungen.",
            5: "Beraet auf GF-Ebene zur PE-Strategie; entwickelt die Beratungskompetenz anderer PE-Profis.",
          },
        },
        {
          name: "Vertrauliche Konflikt- & Beschwerdebegleitung",
          dep: "Durable",
          description:
            "»Vertrauliches Entgegennehmen und Begleiten individueller Konflikte und Beschwerden zwischen Mitarbeitenden oder zwischen Mitarbeitenden und Fuehrungskraeften, ausserhalb der offiziellen HR-Administration. Nicht gemeint: Team- oder Gruppenkonflikte (siehe Konflikt-Moderation bei Teamentwicklung/Changebegleitung) oder disziplinarische bzw. arbeitsrechtliche Beschwerdebearbeitung durch HR. Typische Taetigkeiten: Vertrauliche Erstgespraeche fuehren und Anliegen einordnen · Zwischen den Konfliktparteien vermitteln oder an die passende Stelle verweisen · Eskalationsrisiken einschaetzen und Handlungsoptionen aufzeigen«",
          targetLevel: 4,
          trend: "steigend",
          trendgrund:
            "Vertrauliche interne Anlaufstellen fuer Konflikte und Beschwerden gewinnen an Bedeutung (u. a. im Kontext des Hinweisgeberschutzgesetzes); Mitarbeitende erwarten zunehmend niedrigschwellige, vertrauliche Ansprechpartner abseits der offiziellen HR-Administration.",
          anchors: {
            1: "Kennt den Unterschied zwischen vertraulicher Konfliktbegleitung und offizieller HR-Beschwerdebearbeitung.",
            2: "Nimmt einfache Anliegen vertraulich entgegen und ordnet sie ein; zieht bei Unsicherheit erfahrene Kolleg:innen hinzu.",
            3: "Fuehrt vertrauliche Erstgespraeche eigenstaendig; vermittelt bei klar abgrenzbaren Zweier-Konflikten zwischen Mitarbeitenden oder mit Fuehrungskraeften.",
            4: "Begleitet auch sensible oder eskalierte Einzelkonflikte souveraen; schaetzt Risiken ein und waehlt zwischen Vermittlung, Weiterverweisung oder Einbindung weiterer Stellen.",
            5: "Etabliert vertrauliche Konflikt- und Beschwerdewege als Teil der PE-Struktur; befaehigt und beraet andere in schwierigen Faellen.",
          },
        },
        { ...RUMP_VERBAL, targetLevel: 4 },
      ],
    },
  ],
};

const agileCoach: Role = {
  id: "agile-coach",
  name: "Agile Coach",
  description:
    "Agile Transformation auf Team-, Portfolio- und Organisationsebene begleiten — im Versicherungsumfeld als Brücke zwischen Agilität und regulatorischer Realität.",
  categories: [
    {
      name: "Fachlich",
      skills: [
        {
          name: "Agile Manifesto, Werte & Prinzipien",
          dep: "Durable",
          targetLevel: 5,
          keySkill: true,
          description:
            "»Tiefes Verständnis und gelebte Anwendung der 4 Werte und 12 Prinzipien des Agile Manifesto als Grundlage aller Coaching-Arbeit. Typische Tätigkeiten: Werte und Prinzipien korrekt und kontextreich erklären · Abweichungen vom Manifest zu den Wurzeln zurückführen · Agiles Mindset gegenüber skeptischen Führungskräften vermitteln«",
          anchors: {
            1: "Kennt Manifest und Prinzipien; kann sie wiedergeben.",
            2: "Erklärt Konsequenzen der Prinzipien für Alltag und Team.",
            3: "Wendet Manifest als Beurteilungsmaßstab an; leitet konkrete Implikationen ab.",
            4: "Vermittelt agile Grundwerte überzeugend an skeptische Führungskräfte.",
            5: "Lebt Manifest als Identität; prägt Unternehmenskultur.",
          },
        },
        {
          name: "ICF Coaching-Standards & Ethik",
          dep: "Durable",
          targetLevel: 4,
          description:
            "»Kenntnis und Anwendung der ICF-Kernkompetenzen (Presence, Active Listening, Powerful Questions) und Ethikrichtlinien als professioneller Rahmen für agiles Coaching. Typische Tätigkeiten: ICF-Kernkompetenzen im Coachingprozess aktiv anwenden · Coaching von Beratung und Training klar abgrenzen · Ethische Grenzsituationen erkennen und professionell handeln«",
          anchors: {
            1: "Kennt ICF-Kompetenzrahmen und Ethikregeln.",
            2: "Erklärt Unterschied zwischen Coaching, Mentoring und Beratung.",
            3: "Wendet ICF-Kernkompetenzen eigenständig und reflektiert an.",
            4: "Erkennt ethische Dilemmata; agiert professionell und transparent.",
            5: "Gilt als Coaching-Experte; bildet andere Coaches aus.",
          },
        },
        {
          name: "Agilität in regulierten Branchen",
          dep: "Evolving",
          targetLevel: 3,
          trend: "steigend",
          description:
            "»Tiefer Einblick in die spezifischen Herausforderungen agiler Transformation im Versicherungsumfeld: Regulatorik, Compliance, Aufsicht, Governance. Typische Tätigkeiten: Spannungsfeld Compliance/Agilität überbrücken · Agile Governance-Modelle für regulierte Kontexte entwickeln · Kunden bei BaFin-konformem agilem Arbeiten beraten«",
          anchors: {
            1: "Weiß, dass Regulatorik agile Arbeit beeinflusst.",
            2: "Erklärt gängige Spannungsfelder; gibt erste Lösungsansätze.",
            3: "Entwickelt Lösungen, die Compliance und Agilität verbinden.",
            4: "Berät Kunden beim Aufbau regulierungskonformer agiler Strukturen.",
            5: "Gilt als Experte für Agilität in der Versicherungsbranche.",
          },
        },
        {
          name: "Organisationstheorien & Systemdenken",
          dep: "Durable",
          targetLevel: 4,
          description:
            "»Verständnis von Organisationen als komplexe soziale Systeme — Grundlage für nachhaltige Transformationsbegleitung jenseits von Framework-Adoption. Typische Tätigkeiten: Organisationssymptome systemisch interpretieren · Interventionen auf systemischer Ebene gestalten · Widerstand als systemisches Phänomen einordnen«",
          anchors: {
            1: "Kennt grundlegende Organisationstheorien.",
            2: "Erklärt Systemdenken im Unternehmenskontext.",
            3: "Wendet systemisches Denken in Diagnose und Intervention an.",
            4: "Begreift Transformation als systemischen Prozess; gestaltet nachhaltige Veränderungen.",
            5: "Gilt als Organisationsexperte; entwickelt systemische Beratungsansätze.",
          },
        },
        {
          name: "Versicherungs-IT-Domäne",
          dep: "Durable",
          targetLevel: 1,
          description:
            "»Grundverständnis für Versicherungsprozesse, -systeme und typische IT-Projekte im Kundenumfeld — Basis für fachliche Einordnung, Stakeholder-Kommunikation und kontextgerechte Entscheidungen. Typische Tätigkeiten: Aufgaben und Risiken im Versicherungskontext einordnen · Stakeholder-Sprache verstehen · Branchentypische Priorisierungen und Entscheidungsprozesse nachvollziehen«",
          anchors: {
            1: "Kennt grundlegende Versicherungsbegriffe und typische Prozesse; ordnet Projekte grob ein.",
            2: "Erklärt Zusammenhänge zwischen Versicherungsprozessen, IT-Systemen und Projektzielen; versteht Kundenperspektive.",
            3: "Setzt Domänenwissen aktiv ein: ordnet Risiken und Entscheidungen in den Fachkontext ein; kommuniziert auf Augenhöhe mit dem Fachbereich.",
            4: "Navigiert mit Fachkenntnis in komplexen Kundensituationen; antizipiert spartenspezifische Anforderungen.",
            5: "Gilt als Domänenexperte; befähigt andere in der Branchenorientierung.",
          },
        },
        { ...RUMP_DIGITALE, targetLevel: 3 },
      ],
    },
    {
      name: "Methodisch",
      skills: [
        {
          name: "Agile Frameworks beherrschen (z. B. Scrum / Kanban / XP)",
          dep: "Durable",
          targetLevel: 5,
          keySkill: true,
          description:
            "»Meisterhaftes Verständnis und situative Anwendung von Scrum, Kanban und XP — als Werkzeugkasten für unterschiedlichste Teamkontexte. Typische Tätigkeiten: Teams in Framework-Auswahl beraten · Scrum korrekt und situativ faciliten · Kanban-Systeme auf Teambedarfe anpassen«",
          anchors: {
            1: "Kennt alle drei Frameworks grundlegend.",
            2: "Kann alle drei Frameworks erklären und faciliten.",
            3: "Wählt Frameworks situativ; kombiniert Elemente sinnvoll.",
            4: "Berät Kunden bei Auswahl und Anpassung; coacht andere Scrum Master und POs.",
            5: "Gilt als Framework-Experte; entwickelt eigene Adaptierungen.",
          },
        },
        {
          name: "Skalierungsframeworks (z. B. SAFe / LeSS / Spotify)",
          dep: "Evolving",
          targetLevel: 4,
          description:
            "»Tiefes Verständnis und praktische Erfahrung mit agilen Skalierungsframeworks für große Organisationen. Typische Tätigkeiten: Kunden bei Framework-Wahl beraten · SAFe-Einführung planen und begleiten · PI-Planning-Events faciliten«",
          anchors: {
            1: "Kennt SAFe/LeSS/Spotify dem Namen nach.",
            2: "Erklärt Kernkonzepte und Unterschiede der Frameworks.",
            3: "Begleitet Teams in skalierten Setups; nimmt an PI-Plannings teil.",
            4: "Berät Kunden bei Auswahl und Einführung von Skalierungsframeworks.",
            5: "Gilt als Skalierungsexperte; entwickelt maßgeschneiderte Frameworks.",
          },
        },
        {
          name: "Lean Thinking & Systems Thinking",
          dep: "Durable",
          targetLevel: 4,
          description:
            "»Lean-Prinzipien (Waste, Flow, Pull) und systemisches Denken als Grundlage für nachhaltige Prozessverbesserung und Organisationsgestaltung. Typische Tätigkeiten: Wertstromanalysen durchführen · Waste-Typen im IT-Projekt identifizieren · Systemische Hebel für Verbesserung finden«",
          anchors: {
            1: "Kennt Lean-Grundprinzipien.",
            2: "Erklärt Lean und systemisches Denken; gibt Beispiele.",
            3: "Identifiziert Waste und systemische Engpässe; leitet Maßnahmen ab.",
            4: "Gestaltet Wertstromanalysen und systemische Interventionen.",
            5: "Gilt als Lean/Systems-Experte; coacht andere.",
          },
        },
        {
          name: "Change Management (z. B. ADKAR, Kotter)",
          dep: "Durable",
          targetLevel: 4,
          description:
            "»Veränderungsmodelle als Grundlage für strukturierte Transformationsbegleitung — Widerstände erkennen, Akteure befähigen, Fortschritt messen. Typische Tätigkeiten: Change-Readiness-Assessment durchführen · ADKAR-Analyse für Einzelne und Gruppen erstellen · Change-Kommunikationsplan entwickeln«",
          anchors: {
            1: "Kennt ADKAR und Kotter.",
            2: "Erklärt Phasen und Maßnahmen; gibt Beispiele.",
            3: "Wendet Change-Modelle diagnostisch und interventiv an.",
            4: "Entwickelt maßgeschneiderte Change-Strategien für komplexe Transformationen.",
            5: "Gilt als Change-Experte; coacht andere Coaches.",
          },
        },
        {
          name: "Kulturentwicklung & -Diagnose",
          dep: "Durable",
          targetLevel: 4,
          description:
            "»Diagnose bestehender Kultur und gezielte Intervention zur Entwicklung einer lern- und feedbackorientierten Zusammenarbeit. Typische Tätigkeiten: Kulturdiagnose-Workshops moderieren · Werte und Verhaltensmuster sichtbar machen · Maßnahmen für Kulturwandel ableiten«",
          anchors: {
            1: "Weiß, dass Kultur Transformation beeinflusst.",
            2: "Erkennt Kulturmuster; gibt erste Diagnosen.",
            3: "Führt Kulturdiagnosen durch; leitet gezielte Maßnahmen ab.",
            4: "Begleitet langfristigen Kulturwandel; coacht Führungskräfte.",
            5: "Gilt als Kulturexperte; entwickelt Kulturentwicklungsmodelle.",
          },
        },
        {
          name: "Transformation Roadmap & Governance",
          dep: "Durable",
          targetLevel: 4,
          description:
            "»Entwicklung und Steuerung einer strukturierten Roadmap für agile Transformation — inkl. Meilensteine, Erfolgsmessung und Governance. Typische Tätigkeiten: Transformations-Roadmap gemeinsam mit Kunden entwickeln · Messbare Erfolgskriterien definieren · Transformations-Governance aufsetzen«",
          anchors: {
            1: "Kennt den Begriff Transformations-Roadmap.",
            2: "Erklärt typische Phasen einer Transformation.",
            3: "Entwickelt Roadmaps mit Kunden; definiert Meilensteine.",
            4: "Steuert komplexe Transformationen über längere Zeiträume.",
            5: "Gilt als Experte für agile Transformationsstrategie.",
          },
        },
        {
          name: "Community of Practice aufbauen",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Gründung, Begleitung und Skalierung von Communities of Practice als Wissensaustausch- und Entwicklungsformat für agile Rollen. Typische Tätigkeiten: CoP-Konzept und Format entwickeln · Regelmäßige CoP-Treffen moderieren · Engagement und Wachstum der CoP fördern«",
          anchors: {
            1: "Kennt das Konzept Community of Practice.",
            2: "Nimmt aktiv an CoPs teil; gibt Impulse.",
            3: "Gründet und moderiert eine CoP eigenständig.",
            4: "Skaliert CoPs; vernetzt mehrere CoPs untereinander.",
            5: "Etabliert CoP-Kultur in der Organisation.",
          },
        },
        {
          name: "Metriken & Evidenz für Agilität",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Nutzung von Metriken und Evidenz, um agile Reife, Lieferperformance und Geschäftswert zu belegen und Verbesserungen zu stützen. Typische Tätigkeiten: Agile Reife-Assessment durchführen · Outcome-Metriken definieren · Fortschritt der Transformation messbar machen«",
          anchors: {
            1: "Kennt gängige agile Metriken.",
            2: "Erhebt und visualisiert Metriken; erklärt deren Bedeutung.",
            3: "Wählt und interpretiert Metriken situativ; leitet Maßnahmen ab.",
            4: "Entwirft Metriken-Frameworks für Transformationen.",
            5: "Gilt als Experte für agile Performance-Messung.",
          },
        },
      ],
    },
    {
      name: "Führung & Coaching",
      skills: [
        {
          name: "Selbstreflexion & Präsenz",
          dep: "Durable",
          targetLevel: 4,
          bewertungsmodell: "Dreyfus",
          description:
            "»Fähigkeit, die eigene Wirkung als Coach kontinuierlich zu reflektieren und in Coaching-Situationen vollständig präsent zu sein — ohne ablenkende Gedanken, Urteile oder eigene Agenda. Grundlage für alle Coaching-Qualität: Wer sich selbst nicht kennt, kann andere nicht wirksam begleiten. Typische Tätigkeiten: Eigene Reaktionsmuster im Coaching erkennen und regulieren · Vollständige Präsenz in Gesprächen herstellen · Regelmäßige Supervision oder Peer-Coaching nutzen«",
          anchors: {
            1: "Kennt die Bedeutung von Selbstreflexion im Coaching.",
            2: "Reflektiert Coaching-Situationen im Nachgang; erkennt eigene Muster mit Unterstützung.",
            3: "Reflektiert eigene Wirkung regelmäßig; nutzt Supervision oder Peer-Coaching; ist in Gesprächen präsent.",
            4: "Erkennt eigene Trigger in Echtzeit; reguliert Reaktionen bewusst; coacht aus vollständiger Präsenz.",
            5: "Lebt Selbstreflexion als professionelle Haltung; befähigt andere Coaches in ihrer Entwicklung.",
          },
        },
        {
          name: "Individuelles Coaching (ICF-Standards)",
          dep: "Durable",
          targetLevel: 4,
          keySkill: true,
          description:
            "»Professionelles 1:1-Coaching von Führungskräften, Scrum Mastern und Product Ownern nach ICF-Kernkompetenzen: Zuhören, Fragetechnik, Presence. Typische Tätigkeiten: Coaching-Gespräche strukturiert führen · Coachee zur eigenen Lösung führen statt zu beraten · Fortschritt regelmäßig reflektieren«",
          anchors: {
            1: "Führt strukturierte Gespräche; gibt viele Ratschläge.",
            2: "Stellt offene Fragen; beginnt Coaching-Haltung zu leben.",
            3: "Führt ICF-orientierte Coaching-Gespräche eigenständig.",
            4: "Coacht Führungskräfte in komplexen Situationen; nutzt Presence und systemische Fragetechnik.",
            5: "Gilt als Executive Coach; bildet andere Coaches aus.",
          },
        },
        {
          name: "Team-Coaching (systemisch)",
          dep: "Durable",
          targetLevel: 4,
          description:
            "»Begleitung von Teams in Zusammenarbeit, Konfliktdynamik und Selbstorganisation — mit systemischen Coaching-Ansätzen. Typische Tätigkeiten: Teamdynamiken diagnostizieren und intervenieren · Selbstorganisation fördern · Teams durch schwierige Phasen begleiten«",
          anchors: {
            1: "Facilitiert Teamgespräche; löst einfache Konflikte.",
            2: "Erkennt Teamdynamiken; interveniert mit einfachen Methoden.",
            3: "Begleitet Teams systemisch; fördert Autonomie und Selbstreflexion.",
            4: "Coacht Teams in Hochspannungssituationen; gestaltet tiefgreifende Interventionen.",
            5: "Gilt als Team-Coach-Experte; entwickelt Methoden weiter.",
          },
        },
        {
          name: "Gruppendynamik erkennen & navigieren",
          dep: "Durable",
          targetLevel: 4,
          description:
            "»Wahrnehmung und produktiver Umgang mit Gruppendynamiken, Machtspielen und Kollektivphänomenen in Transformationsprozessen. Typische Tätigkeiten: Dynamiken im Workshop oder Meeting erkennen und benennen · Interventionen situativ einsetzen · Eskalation und Blockaden navigieren«",
          anchors: {
            1: "Nimmt Gruppenklima wahr.",
            2: "Benennt einfache Dynamiken; reagiert konstruktiv.",
            3: "Navigiert Dynamiken eigenständig; setzt Interventionstechniken ein.",
            4: "Liest Gruppen schnell; interveniert präzise auch in schwierigen Situationen.",
            5: "Gilt als Experte für Gruppenprozesse; supervisiert andere Coaches.",
          },
        },
        {
          name: "Mentoring & Teaching",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Weitergabe von Erfahrungen und Wissen als Mentor und Trainer — ergänzend zum Coaching. Typische Tätigkeiten: Scrum Master und POs im Alltag mentoren · Agile Grundlagen-Trainings halten · Wissen strukturiert für das Team aufbereiten«",
          anchors: {
            1: "Gibt Ratschläge auf Nachfrage.",
            2: "Teilt Erfahrungen strukturiert; hält einfache Trainings.",
            3: "Mentoret eigenständig; entwickelt Trainingsformate.",
            4: "Kombiniert Coaching, Mentoring und Training situativ.",
            5: "Gilt als Trainer und Mentor; entwickelt Ausbildungsformate für agile Rollen.",
          },
        },
        {
          name: "Powerful Questions",
          dep: "Durable",
          targetLevel: 4,
          description:
            "»Gezielte Nutzung kraftvoller, offener Fragen zur Förderung von Reflexion, Klarheit und eigenständiger Lösungsfindung bei Coachees und Teams. Typische Tätigkeiten: Fragen formulieren, die Denkraum öffnen · Annahmen hinterfragen · Stille als Wirkraum nutzen«",
          anchors: {
            1: "Stellt offene Fragen auf Anweisung.",
            2: "Stellt eigenständig W-Fragen; vermeidet Suggestivfragen.",
            3: "Formuliert Fragen, die echte Reflexion auslösen.",
            4: "Setzt Fragen gezielt zur Tiefenreflexion ein; nutzt Paradoxien.",
            5: "Gilt als Meister der Fragetechnik; bildet andere aus.",
          },
        },
        { ...RUMP_VERBAL, targetLevel: 4 },
      ],
    },
  ],
};

const teamentwicklung: Role = {
  id: "teamentwicklung",
  name: "Teamentwicklung",
  description:
    "Teams in ihrer Zusammenarbeit und Leistungsfaehigkeit staerken.",
  categories: [
    {
      name: "Fachlich",
      skills: [
        { name: "Gruppendynamik (Theorie)", dep: "Durable" },
        { name: "Organisationspsychologie", dep: "Durable" },
        { name: "Versicherungskontext & Teamtypen", dep: "Durable" },
        { ...RUMP_DIGITALE },
      ],
    },
    {
      name: "Technisch",
      skills: [
        { name: "Visualisierung & Flipchart", dep: "Durable" },
      ],
    },
    {
      name: "Methodisch",
      skills: [
        { name: "Teamphasen (Tuckman)", dep: "Durable" },
        { name: "Rollen-Modelle (Belbin, Riemann-Thomann)", dep: "Durable" },
        { name: "Konfliktdynamiken erkennen", dep: "Durable" },
        { name: "Psychologische Sicherheit foerdern", dep: "Durable" },
        { name: "Team-Purpose & -Identitaet", dep: "Durable" },
        { name: "Team-Workshops & Kickoffs gestalten", dep: "Durable" },
        { name: "Retrospektiven (vielfaeltige Formate)", dep: "Durable" },
        { name: "Teambuilding-Aktivitaeten", dep: "Durable" },
        { name: "Diagnoseverfahren (Teamchecks)", dep: "Durable" },
        { name: "Outdoor / Experiential Learning", dep: "Durable" },
        { name: "Moderationstechniken", dep: "Durable" },
        { name: "Grossgruppen-Methoden (World Cafe, OST)", dep: "Durable" },
      ],
    },
    {
      name: "Führung & Coaching",
      skills: [
        { name: "Konflikt-Moderation", dep: "Durable" },
        { ...RUMP_VERBAL },
      ],
    },
  ],
};

const changebegleitung: Role = {
  id: "changebegleitung",
  name: "Changebegleitung",
  description:
    "Veraenderungsprozesse in Organisationen begleiten und Widerstaende adressieren.",
  categories: [
    {
      name: "Fachlich",
      skills: [
        { name: "Change-Management-Theorie", dep: "Durable" },
        { name: "Organisationspsychologie", dep: "Durable" },
        { name: "Versicherungs-Transformation", dep: "Evolving" },
        { ...RUMP_DIGITALE },
      ],
    },
    {
      name: "Methodisch",
      skills: [
        { name: "Kotter's 8 Steps", dep: "Durable" },
        { name: "ADKAR Modell", dep: "Durable" },
        { name: "Lewin's 3-Phasen-Modell", dep: "Durable" },
        { name: "Stakeholder-Mapping", dep: "Durable" },
        { name: "Change-Architektur entwerfen", dep: "Durable" },
        { name: "Change-Kommunikationsplan", dep: "Durable" },
        { name: "Multiplikatoren-Netzwerke", dep: "Durable" },
        { name: "Interventionsgestaltung", dep: "Durable" },
        { name: "Change-Readiness Assessment", dep: "Durable" },
      ],
    },
    {
      name: "Kommunikation & Zusammenarbeit",
      skills: [
        { name: "Storytelling fuer Veraenderung", dep: "Durable" },
        { name: "Townhalls & Dialogformate", dep: "Durable" },
        { ...RUMP_VERBAL },
      ],
    },
    {
      name: "Führung & Coaching",
      skills: [
        { name: "Widerstand erkennen & adressieren", dep: "Durable" },
        { name: "Fuehrungskraefte-Coaching im Change", dep: "Durable" },
        { name: "Konflikt-Moderation", dep: "Durable" },
      ],
    },
  ],
};

const oeBeratung: Role = {
  id: "oe-beratung",
  name: "Beratung Organisationsentwicklung & Change",
  description:
    "Systemische Beratung fuer strategische Transformation und Kulturentwicklung.",
  categories: [
    {
      name: "Fachlich",
      skills: [
        { name: "Systemtheorie & Organisationstheorie", dep: "Durable" },
        { name: "Versicherungs-Geschaeftsmodelle", dep: "Durable" },
        { name: "Wandel in regulierten Branchen", dep: "Evolving" },
        { ...RUMP_DIGITALE },
      ],
    },
    {
      name: "Technisch",
      skills: [
        { name: "Soziogramme & Netzwerkanalysen", dep: "Durable" },
        { name: "KI-gestuetzte Org-Analyse", dep: "Perishable" },
      ],
    },
    {
      name: "Methodisch",
      skills: [
        { name: "Systemtheorie & -denken", dep: "Durable" },
        { name: "Auftragsklaerung & Kontraktbildung", dep: "Durable" },
        { name: "Hypothesenbildung", dep: "Durable" },
        { name: "Interventionsgestaltung", dep: "Durable" },
        { name: "Transformation Design", dep: "Durable" },
        { name: "Organisationsdiagnose", dep: "Durable" },
        { name: "Kulturentwicklung & -Wandel", dep: "Durable" },
        { name: "Strategieberatung", dep: "Durable" },
        { name: "Change-Governance aufsetzen", dep: "Durable" },
        { name: "Grossgruppen-Interventionen", dep: "Durable" },
        { name: "OE-Workshops moderieren", dep: "Durable" },
        { name: "Evaluierung & Wirkungsmessung", dep: "Durable" },
      ],
    },
    {
      name: "Führung & Coaching",
      skills: [
        { name: "Systemische Fragetechniken", dep: "Durable" },
        { ...RUMP_VERBAL },
      ],
    },
  ],
};

// -----------------------------------------------------------------------------
// Leadership Team
// -----------------------------------------------------------------------------

const operativeGF: Role = {
  id: "operative-gf",
  name: "operative Geschaeftsfuehrung",
  description:
    "Operative Verantwortung fuer das Unternehmen — Strategie, Finanzen, Fuehrung, Governance.",
  categories: [
    {
      name: "Fachlich",
      skills: [
        { name: "Wirtschafts- & Gesellschaftsrecht", dep: "Durable" },
        { name: "Versicherungsaufsichtsrecht (VAG)", dep: "Evolving" },
        { name: "Branchenstrategie & Marktstruktur", dep: "Durable" },
        { name: "Gesellschaftsrecht-Grundlagen", dep: "Durable" },
        { name: "Compliance & Governance", dep: "Durable" },
        { ...RUMP_DIGITALE },
      ],
    },
    {
      name: "Technisch",
      skills: [
        { name: "Unternehmenskennzahlen (GuV, Bilanz)", dep: "Durable" },
      ],
    },
    {
      name: "Methodisch",
      skills: [
        { name: "Unternehmensstrategie entwickeln", dep: "Durable" },
        { name: "Geschaeftsmodell-Innovation", dep: "Durable" },
        { name: "Markt- & Wettbewerbsanalyse", dep: "Durable" },
        { name: "Innovationsmanagement", dep: "Durable" },
        { name: "Jahresplanung & Budgetierung", dep: "Durable" },
        { name: "Investitionsentscheidungen", dep: "Durable" },
        { name: "Cash-Management", dep: "Durable" },
        { name: "Risikomanagement auf Unternehmensebene", dep: "Durable" },
        { name: "Vertragswesen (strategisch)", dep: "Durable" },
      ],
    },
    {
      name: "Kommunikation & Zusammenarbeit",
      skills: [
        { name: "Stakeholder-Management (Gesellschafter, Kunden)", dep: "Durable" },
        { name: "Interne & externe Kommunikation", dep: "Durable" },
        { name: "Gremienarbeit & Reporting", dep: "Durable" },
        { ...RUMP_VERBAL },
      ],
    },
    {
      name: "Führung & Coaching",
      skills: [
        { name: "Vision & Purpose kommunizieren", dep: "Durable" },
        { name: "Senior Leadership", dep: "Durable" },
        { name: "Kulturentwicklung", dep: "Durable" },
        { name: "Krisenmanagement", dep: "Durable" },
      ],
    },
  ],
};

const gruppenleitung: Role = {
  id: "gruppenleitung",
  name: "Gruppenleitung fachlich & disziplinarisch",
  description:
    "Fuehrung einer Gruppe mit fachlicher Verantwortung und Personalfuehrung.",
  categories: [
    {
      name: "Fachlich",
      skills: [
        { name: "Fuehrungstheorien & -modelle", dep: "Durable" },
        { name: "Bereichsspezifische Fachexpertise", dep: "Durable" },
        { name: "Versicherungs-IT-Strategie", dep: "Evolving" },
        { ...RUMP_DIGITALE },
      ],
    },
    {
      name: "Technisch",
      skills: [
        { name: "Technologie-Entscheidungen treffen", dep: "Evolving" },
      ],
    },
    {
      name: "Methodisch",
      skills: [
        { name: "Disziplinarische Fuehrung", dep: "Durable" },
        { name: "Zielvereinbarungen (OKR, SMART)", dep: "Durable" },
        { name: "Performance Management", dep: "Durable" },
        { name: "Fachliche Richtungsentscheidungen", dep: "Durable" },
        { name: "Qualitaetssicherung der Arbeit", dep: "Durable" },
        { name: "Standards & Best Practices", dep: "Durable" },
        { name: "Wissenstransfer organisieren", dep: "Durable" },
        { name: "Skill-Gap-Analyse im Team", dep: "Durable" },
        { name: "Team-Aufbau & -Skalierung", dep: "Durable" },
        { name: "Ressourcenplanung", dep: "Durable" },
        { name: "Prozessoptimierung im Bereich", dep: "Durable" },
        { name: "Schnittstellen-Management", dep: "Durable" },
      ],
    },
    {
      name: "Kommunikation & Zusammenarbeit",
      skills: [
        { name: "Recruiting-Verantwortung", dep: "Durable" },
        { name: "Reporting nach oben & zur Seite", dep: "Durable" },
        { ...RUMP_VERBAL },
      ],
    },
    {
      name: "Führung & Coaching",
      skills: [
        { name: "Feedback geben (wirksam, regelmaessig)", dep: "Durable" },
        { name: "Konfliktmanagement im Team", dep: "Durable" },
        { name: "Entwicklungsgespraeche fuehren", dep: "Durable" },
        { name: "Karriereplanung begleiten", dep: "Durable" },
        { name: "Mentoring", dep: "Durable" },
      ],
    },
  ],
};

// -----------------------------------------------------------------------------
// Default-Markttreiber je Gruppe (ANF-15)
// -----------------------------------------------------------------------------

/** Markttreiber Projektmanagement (Juni 2026). */
const projektmanagementDrivers: MarketDriver[] = [
  {
    id: "drv-pm-regulatorik",
    title: "Regulatorischer Druck auf IT-Projekte (DORA, VAIT, AI Act)",
    horizon: "0–3 Jahre",
    description:
      "Steigende regulatorische Anforderungen verlangen auditfähige Projektgovernance. PM-Rollen müssen Compliance-Anforderungen aktiv in Planung, Steuerung und Dokumentation integrieren.",
    affectedSkillNames: [
      "Projektsteuerung in regulierten Umfeldern",
      "Risikomanagement",
      "Reporting & Forecasting",
    ],
  },
  {
    id: "drv-pm-legacy-abloesung",
    title: "Legacy-Ablösung & Systemmodernisierung",
    horizon: "0–3 Jahre",
    description:
      "Versicherungsunternehmen modernisieren großflächig ihre Kernsysteme — von monolithischen Bestandssystemen zu modularen Cloud-Plattformen. Diese Großprojekte prägen das PM-Tätigkeitsfeld: hohe Komplexität, lange Laufzeiten, starker Regulierungsdruck und unternehmensweite Stakeholder-Landschaften.",
    affectedSkillNames: [
      "Projektkontext & Komplexität im VU-Umfeld einschätzen",
      "Projektsteuerung in regulierten Umfeldern",
      "Projektplanung & Meilensteinsteuerung",
    ],
  },
  {
    id: "drv-pm-automatisierung-ai",
    title: "Automatisierung & Agentic AI in Versicherungs-Kernprozessen",
    horizon: "1–3 Jahre",
    description:
      "Versicherungsunternehmen automatisieren ihre Kernprozesse — Schadenbearbeitung, Underwriting und Kundenservice — mit KI und autonomen Agenten. PM-Rollen steuern und verantworten diese komplexen Transformationsvorhaben: Sie initiieren, überwachen und qualitätssichern KI-gestützte Prozesse auf Kundenseite.",
    affectedSkillNames: [
      "KI-gestützte Projektsteuerung",
      "Anforderungsmanagement-Grundlagen",
      "Projektkontext & Komplexität im VU-Umfeld einschätzen",
    ],
  },
];

/** Markttreiber Business Consulting — gelten fuer alle Rollen der Gruppe (UX/UI, Business Analyse, Test) (Sept. 2026). */
const businessConsultingDrivers: MarketDriver[] = [
  {
    id: "drv-bc-ki-transformation",
    title: "KI-Transformation in der Versicherungsbranche",
    horizon: "0–2 Jahre",
    description:
      "Versicherungskunden integrieren KI in Kernprozesse (Schadenbearbeitung, Underwriting, Kundenservice) und in kundennahe Oberflaechen wie Chat- und Assistenz-Bots. Business Consulting begleitet diese Vorhaben ueber alle Rollen hinweg: UX/UI gestaltet KI-Interaktionen, Business Analyse formuliert KI- und Automatisierungsanforderungen, Test und Testautomatisierung pruefen KI-gestuetzte Systeme — jeweils mit Verstaendnis fuer KI-Outputs und Datenschutzgrenzen.",
    affectedSkillNames: [
      "Digitale Anwendungskompetenz",
      "KI und Automatisierungsanforderungen",
      "KI-gestuetztes Design & generative Tools (z. B. Figma AI, Miro AI, Claude)",
      "KI-gestuetzte QS & verantwortungsvoller KI-Einsatz",
      "KI-gestuetzte Testautomatisierung & verantwortungsvoller Einsatz",
    ],
  },
  {
    id: "drv-bc-eu-ai-act",
    title: "EU AI Act, Regulatorik & Governance",
    horizon: "0–3 Jahre",
    description:
      "Der EU AI Act, DORA sowie Vorgaben zu Barrierefreiheit und Datenschutz (BFSG, DSGVO) schaffen neue Anforderungen an Transparenz, Nachweisfuehrung und Konformitaet. Business Analyse uebersetzt Regulatorik in Anforderungen, UX/UI gestaltet konforme Oberflaechen, QA und Testmanagement stellen compliance-konforme Testprozesse und auditfeste Nachweise sicher.",
    affectedSkillNames: [
      "Regulatorische Umsetzungskompetenz",
      "Regulatorische UI-Anforderungen (DSGVO, BFSG)",
      "Regulatorik, Auditfaehigkeit & Nachweisfuehrung",
      "Nichtfunktionale Qualitaet (Security, Resilienz, Performance, Accessibility)",
      "Verbalisierung & Strukturierung",
    ],
  },
  {
    id: "drv-bc-digitalisierung-kernprozesse",
    title: "Digitalisierung von Versicherungskernprozessen",
    horizon: "1–3 Jahre",
    description:
      "Antrag, Police, Schaden und Vertragsverwaltung werden durchgaengig digitalisiert. Gefragt ist tiefes Prozessverstaendnis in allen Rollen: Business Analyse modelliert Soll-Prozesse, UX/UI gestaltet durchgaengige User Journeys, Test entwirft realistische End-to-End-Szenarien und sichert Schnittstellen gezielt ab.",
    affectedSkillNames: [
      "Geschäftsprozessverständnis",
      "Versicherungsprodukte & User Journeys",
      "Service Blueprint & Journey Mapping",
      "Versicherungsfachlichkeit & Prozessverstaendnis",
      "Integrations- & E2E-Test",
    ],
  },
  {
    id: "drv-bc-agile-skalierung",
    title: "Agile Skalierung und SAFe-Einfuehrung bei Kunden",
    horizon: "1–3 Jahre",
    description:
      "Versicherungsunternehmen skalieren agile Methoden auf Unternehmensebene. Alle Beratungsrollen binden sich fruehzeitig in Anforderungs- und Planungsprozesse ein: Anforderungen und Akzeptanzkriterien entstehen gemeinsam, Design und Qualitaetssicherung wirken von Beginn an mit (Shift-Left) und tragen zur Definition of Done bei.",
    affectedSkillNames: [
      "User Stories & Akzeptanzkriterien",
      "Cross-funktionale Teamkollaboration",
      "Cross-funktionale Teamkollaboration (agil)",
      "Shift-Left Testing im agilen Prozess",
      "Teststrategie entwickeln",
    ],
  },
  {
    id: "drv-bc-systemkomplexitaet",
    title: "Wachsende Systemkomplexitaet (Legacy + Cloud + KI)",
    horizon: "2–5 Jahre",
    description:
      "Hybrid-Architekturen aus Altsystemen, Cloud-Loesungen und KI-Komponenten erhoehen die Schnittstellenkomplexitaet erheblich. Business Analyse braucht fundiertes System- und Loesungsverstaendnis, UX/UI sichert Konsistenz ueber heterogene Systeme, Integrationstest- und Testarchitektur-Kompetenz gewinnen stark an Bedeutung.",
    affectedSkillNames: [
      "IT-Systemverständnis",
      "Systemanalyse & Lösungsdesign",
      "Design Systems aufbauen und pflegen",
      "Integrations- & E2E-Test",
      "Testarchitektur & Quality Enablement",
    ],
  },
];

/** Markttreiber Backoffice (Juli 2026). */
const backofficeDrivers: MarketDriver[] = [
  {
    id: "drv-bo-ki-rollenwandel",
    title: "KI-Transformation & Rollenwandel im Backoffice",
    horizon: "0–3 Jahre",
    description:
      "KI-Assistenten (Copilot, ChatGPT) uebernehmen Routinetaetigkeiten wie Korrespondenz, Protokolle, Standardauswertungen und Stellenanzeigen. Backoffice-Rollen verschieben sich von Ausfuehrung zu Qualitaetsurteil, Kontextsensitivitaet und Koordination. Wer KI-Outputs nicht kritisch prueft, produziert Fehler — wer nicht upskilled, verliert Relevanz.",
    affectedSkillNames: [
      "KI-Tools fuer Assistenzaufgaben",
      "KI-Tools fuer Bueroaufgaben",
      "KI-Tools im HR-Kontext",
      "KI-Tools im Recruiting",
      "KI-gestuetzte Finanzanalyse",
      "KI-Tools im IT-Admin-Kontext",
    ],
  },
  {
    id: "drv-bo-effizienzdrucklage",
    title: "Wirtschaftliche Konsolidierung & Effizienzdrucklage",
    horizon: "0–2 Jahre",
    description:
      "Angespannte Wirtschaftslage und Einstellungsruckhalt erhoehen den internen Kostendruck. Backoffice-Rollen muessen mehr mit weniger leisten, Prozesse verschlanken und — gerade in kleinen Teams — breitere Verantwortung tragen. Die Faehigkeit, Ausgaben transparent zu steuern und zu begruenden, gewinnt an Bedeutung.",
    affectedSkillNames: [
      "Budgetplanung & -koordination",
      "Kostenrechnung (Kostenstellen & -traeger)",
      "Budget- & Reisekostentracking",
      "IT-Asset-Management",
      "Beschaffung & Bestellwesen",
    ],
  },
  {
    id: "drv-bo-demografischer-wandel",
    title: "Demografischer Wandel — Boomer-Verrentung ab 2028",
    horizon: "2028–2037",
    description:
      "Die Boomer-Generation verlasst den Arbeitsmarkt in Wellen — strukturell und unumkehrbar. Der Fachkraeftemangel kehrt zurueck, diesmal demografisch bedingt, nicht konjunkturell. Recruiting muss sich jetzt vorbereiten (Prozesse, Netzwerke, Employer Brand aufbauen). HR und IT-Admin tragen die Aufgabe, Wissen zu sichern und Nachfolge zu planen, bevor erfahrene Kraefte gehen.",
    affectedSkillNames: [
      "Active Sourcing & Talent Pipelines",
      "Employer Branding & Social Media Recruiting",
      "Onboarding-Prozesse",
      "Dokumentation & Wissensdatenbank",
      "Anforderungserhebung mit Fuehrungskraeften",
    ],
  },
  {
    id: "drv-bo-regulatorik",
    title: "Regulatorische Verdichtung (DSGVO, GoBD, ArbZG, EU AI Act)",
    horizon: "laufend, verschaerfend",
    description:
      "DSGVO, GoBD, Arbeitszeiterfassungspflicht und KI-Regulatorik (EU AI Act) erzeugen kontinuierlich neue Compliance-Anforderungen. Interne Funktionen sind der Ort, wo diese operativ umgesetzt werden — nicht die Beratungsseite, sondern HR, Controlling und IT-Admin. Fehler haben direkte rechtliche und finanzielle Konsequenzen.",
    affectedSkillNames: [
      "DSGVO im HR-Kontext",
      "Arbeitsrecht (DE)",
      "Compliance & internes Kontrollsystem",
      "Datenschutz & IT-Compliance (DSGVO/TOM)",
      "Zeiterfassung & Urlaubsverwaltung",
    ],
  },
];

/** Markttreiber Produktmanagement (August 2026). */
const produktmanagementDrivers: MarketDriver[] = [
  {
    id: "drv-pdm-ki-transformation",
    title: "KI-Transformation der Produktarbeit",
    horizon: "0–2 Jahre",
    description:
      "KI-Tools veraendern die Produktarbeit ueber alle Rollen hinweg — von Anforderungstexten und Recherche (Product Manager/Owner) ueber Design-Ideation (UX) bis zur Vertriebsvorbereitung (Business Developer). Wer KI-Outputs nicht kritisch pruefen und gezielt einsetzen kann, verliert Tempo und Qualitaet gegenueber schnelleren Wettbewerbern.",
    affectedSkillNames: [
      "Digitale Anwendungskompetenz",
      "KI-Tools im Produktkontext",
      "KI-Tools im Designprozess",
      "KI-Tools fuer Vertriebs-/Accountarbeit",
    ],
  },
  {
    id: "drv-pdm-regulatorik-produkte",
    title: "Regulatorischer Druck auf Versicherungsprodukte (VVG, BaFin, DORA, EU AI Act)",
    horizon: "0–3 Jahre",
    description:
      "Versicherungsprodukte und die zugrundeliegende Software unterliegen wachsendem regulatorischem Druck — von Produktaufsicht (VVG/BaFin) ueber operationale Resilienz (DORA) bis zu KI-spezifischen Vorgaben (EU AI Act). Produktverantwortliche muessen Regulatorik fruehzeitig in Anforderungen, Vertraege und Priorisierung einpreisen.",
    affectedSkillNames: [
      "Regulatorik fuer Versicherungsprodukte (VVG, BaFin)",
      "Regulatorische Anforderungen (BaFin, VVG)",
      "Vertragsrecht & Konditionengestaltung (Grundlagen)",
    ],
  },
  {
    id: "drv-pdm-insurtech-oekosysteme",
    title: "Insurtech-Wettbewerb & Plattform-Oekosysteme",
    horizon: "1–3 Jahre",
    description:
      "Insurtechs, Vergleichsportale und Embedded-Insurance-Modelle erhoehen den Preis- und Innovationsdruck. Erfolg haengt zunehmend von strategischen Kooperationen, differenziertem Pricing und schneller Marktbeobachtung ab — statt von isolierter Produktentwicklung.",
    affectedSkillNames: [
      "Pricing- & Geschaeftsmodelle",
      "Preisentwicklung & Pricing-Strategie",
      "Kooperations- & Partnerschaftsentwicklung",
      "Markt- und Wettbewerbsanalyse",
      "Markt- & Partnerschaftsanalyse",
    ],
  },
  {
    id: "drv-pdm-nutzerzentrierung",
    title: "Nutzerzentrierte, digitale Kundenerlebnisse",
    horizon: "1–3 Jahre",
    description:
      "Kundinnen und Kunden erwarten durchgaengig digitale, einfache Abschluss- und Schadenprozesse, wie sie es aus anderen Branchen gewohnt sind. Produkt- und UX-Rollen muessen Nutzerbeduerfnisse kontinuierlich erheben und schnell in validierte, priorisierte Verbesserungen uebersetzen.",
    affectedSkillNames: [
      "Nutzerforschung & Interviews",
      "Nutzerfeedback einholen & einarbeiten",
      "Jobs-to-be-Done Framework",
      "Customer Lifecycle Management",
    ],
  },
];

// -----------------------------------------------------------------------------
// Export: all groups
// -----------------------------------------------------------------------------

export const groups: Group[] = [
  {
    id: "business-consulting",
    name: "Business Consulting",
    description:
      "Beratung an der Schnittstelle zwischen Business und IT — von UX ueber Business Analyse bis Test.",
    roles: [
      uxuiDesign,
      businessAnalyst,
      qaCore,
      testManager,
      testAutomation,
    ],
    defaultDrivers: businessConsultingDrivers,
  },
  swGroup,
  {
    id: "projektmanagement",
    name: "Projektmanagement",
    description:
      "Projekte planen, steuern und erfolgreich zum Abschluss bringen.",
    roles: [
      projektleitung,
      scrumMaster,
      agileCoach,
      projektassistenz,
      anforderungsmanager,
    ],
    defaultDrivers: projektmanagementDrivers,
  },
  {
    id: "produktmanagement",
    name: "Produktmanagement",
    description:
      "Produktverantwortung von Strategie und Marktbearbeitung bis Backlog und Auslieferung.",
    roles: [productManager, productOwner, ux, businessDeveloper],
    defaultDrivers: produktmanagementDrivers,
  },
  {
    id: "backoffice",
    name: "Backoffice",
    description:
      "Unternehmensinterne Funktionen — Organisation, HR, Finanzen und IT.",
    roles: [gfAssistenz, teamassistenz, hrGeneralist, hrBusinessPartner, recruiting, controlling, inhouseProjektSupport, itAdmin],
    defaultDrivers: backofficeDrivers,
  },
  {
    id: "poc",
    name: "P.O.C. — People & Organizational Change",
    description:
      "Personalentwicklung, Organisationsentwicklung und Transformation.",
    roles: [
      ldExpert,
      personalentwicklung,
      teamentwicklung,
      changebegleitung,
      oeBeratung,
    ],
  },
  {
    id: "leadership",
    name: "Leadership Team",
    description:
      "Fuehrungsverantwortung auf Unternehmens- und Bereichsebene.",
    roles: [operativeGF, gruppenleitung],
  },
];
