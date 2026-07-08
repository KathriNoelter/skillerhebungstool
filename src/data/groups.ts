import type { Group, MarketDriver, Role } from "../types";
import { swGroup } from "./swCatalogs";
import { qaCore, testManager, testAutomation } from "./bcCatalogs";
import { RUMP_DIGITALE, RUMP_VERBAL } from "./rumpSkills";

// -----------------------------------------------------------------------------
// Catalog meta (ANF-12)
// -----------------------------------------------------------------------------

/** Skill-Katalog Version. Erhoehen, wenn Strukturen, Steckbriefe oder Anker
 *  geaendert werden. CHANGELOG.md fuehrt die Historie. */
export const CATALOG_VERSION = "0.6.1";
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
  name: "UX/UI Design",
  description:
    "User Experience und Interface Design — von Research ueber Prototyping bis zur visuellen Gestaltung.",
  categories: [
    {
      name: "Fachlich",
      skills: [
        { name: "Versicherungsprodukte & Kundenreisen", dep: "Durable" },
        { name: "Regulatorische UI-Anforderungen (DSGVO, BFSG)", dep: "Evolving" },
        { name: "Branchen-Patterns (Insurance, FinTech)", dep: "Evolving" },
        { ...RUMP_DIGITALE },
      ],
    },
    {
      name: "Technisch",
      skills: [
        { name: "Typografie und visuelle Hierarchie", dep: "Durable" },
        { name: "Figma (Prototyping & Auto Layout)", dep: "Evolving" },
        { name: "Design Tokens & Theming", dep: "Evolving" },
        { name: "Accessibility (WCAG-Konformitaet)", dep: "Evolving" },
        { name: "Responsive & Adaptive Design", dep: "Durable" },
        { name: "Design Systems aufbauen und pflegen", dep: "Evolving" },
        { name: "Interaction Design & Micro-Animations", dep: "Durable" },
      ],
    },
    {
      name: "Methodisch",
      skills: [
        { name: "User Research & qualitative Interviews", dep: "Durable" },
        { name: "Usability Testing (moderated & unmoderated)", dep: "Durable" },
        { name: "Jobs-to-be-Done Framework", dep: "Durable" },
        { name: "UX-Writing & Microcopy", dep: "Durable" },
        { name: "Service Blueprint & Journey Mapping", dep: "Durable" },
        { name: "KI-gestuetzte UX-Analyse und Generierung", dep: "Perishable" },
        { name: "Information Architecture & Navigation", dep: "Durable" },
      ],
    },
    {
      name: "Kommunikativ",
      skills: [
        {
          name: "Stakeholder-Management",
          dep: "Durable",
          description:
            "Erwartungen, Interessen und Einfluss relevanter Stakeholder identifizieren und ueber den Designprozess hinweg aktiv steuern. Typische Taetigkeit: Stakeholder-Map pflegen, Reviews vorbereiten, Eskalationen einordnen.",
          anchors: {
            1: "Erkennt einzelne Stakeholder, ist aber stark angeleitet.",
            2: "Fuehrt Standardabstimmungen mit Hilfe einer Vorlage.",
            3: "Steuert Stakeholder eines Projekts eigenstaendig und konsistent.",
            4: "Antizipiert Konflikte, navigiert mehrere Interessen, coacht andere.",
            5: "Setzt Standards fuer Stakeholder-Arbeit auf Bereichsebene.",
          },
        },
        { name: "Praesentation von Design-Entscheidungen", dep: "Durable" },
        { name: "Anforderungserhebung und Briefing-Methodik", dep: "Durable" },
        { name: "UX-Metriken und ROI-Argumentation", dep: "Evolving" },
        { name: "Prompt Engineering fuer Design-Tools", dep: "Perishable" },
        { name: "Cross-funktionale Teamkollaboration (agil)", dep: "Evolving" },
        { ...RUMP_VERBAL },
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
      name: "Kommunikativ",
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
  name: "Project Assistance",
  description:
    "Operative Unterstützung der Projektleitung — Koordination, Dokumentation und Kommunikation im laufenden Projektalltag im Versicherungsumfeld.",
  categories: [
    {
      name: "Fachlich",
      skills: [
        {
          name: "Versicherungs-Projektkontext",
          dep: "Durable",
          targetLevel: 2,
          description:
            "»Grundlegendes Verständnis typischer IT-Projekte im Versicherungsumfeld: Kernprozesse (Antrag, Police, Schaden), Projekttypen (Migrations-, Regulatorik-, Digitalisierungsprojekte), beteiligte Rollen und Governance-Strukturen. Typische Tätigkeiten: Aufgaben fachlich korrekt einordnen · Statusberichte inhaltlich verstehen · Abkürzungen und Fachbegriffe kennen«",
          anchors: {
            1: "Kennt grundlegende Versicherungsbegriffe; braucht Unterstützung bei fachlicher Einordnung.",
            2: "Erklärt Zusammenhänge zwischen Projektauftrag, IT-Lösung und Versicherungsprozessen.",
            3: "Ordnet Aufgaben und Risiken selbstständig in den Versicherungskontext ein.",
            4: "Bewertet Projektentscheidungen auf fachliche Stimmigkeit im Versicherungsumfeld.",
            5: "Gilt als fachlicher Ansprechpartner für Projektkontext; befähigt neue Teammitglieder.",
          },
        },
        {
          name: "Compliance-Vorgaben für Projektdokumentation",
          dep: "Evolving",
          targetLevel: 2,
          description:
            "»Kenntnis der wesentlichen Dokumentations- und Revisionspflichten in IT-Projekten im regulierten Umfeld (DSGVO, VAIT, interne Governance). Typische Tätigkeiten: Schutzbedarf von Dokumenten einschätzen · Ablageregeln und Zugriffssicherung einhalten · Dokumentationspflicht bei Verträgen und Protokollen beachten«",
          anchors: {
            1: "Kennt Begriffe wie Revisionssicherheit und DSGVO; hält Vorgaben auf Hinweis ein.",
            2: "Erklärt relevante Dokumentations- und Ablageregeln; wendet sie eigenständig an.",
            3: "Erkennt Lücken in der Dokumentation und spricht Handlungsbedarf proaktiv an.",
            4: "Bewertet Dokumentationsqualität und empfiehlt Verbesserungen.",
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
          name: "MS Office Suite (Word, Excel, PowerPoint)",
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
          name: "Projektmanagement-Tools (MS Project, Smartsheet)",
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
        {
          name: "KI-Tools für Protokolle & Zusammenfassungen",
          dep: "Perishable",
          targetLevel: 2,
          trend: "stark steigend",
          description:
            "»Einsatz von KI-Assistenten zur Effizienzsteigerung bei typischen Assistenzaufgaben: Besprechungen transkribieren, Protokolle strukturieren, Dokumente zusammenfassen. Typische Tätigkeiten: Transkripte aus Besprechungen automatisch aufbereiten · Texte per Prompt verbessern · Ergebnisse kritisch prüfen und freigeben«",
          anchors: {
            1: "Kennt gängige KI-Tools dem Namen nach.",
            2: "Nutzt KI-Tools für Protokolle und Zusammenfassungen mit einfachem Prompting.",
            3: "Optimiert Prompts situativ; prüft Outputs auf Vollständigkeit und Korrektheit.",
            4: "Etabliert wiederverwendbare Prompt-Vorlagen für das Assistenzbüro.",
            5: "Definiert KI-Nutzungsstandards im Assistenzbereich.",
          },
        },
      ],
    },
    {
      name: "Methodisch",
      skills: [
        {
          name: "Protokollführung & Dokumentation",
          dep: "Durable",
          targetLevel: 3,
          keySkill: true,
          description:
            "»Strukturierte Erstellung von Sitzungsprotokollen, Entscheidungsnotizen und Besprechungsergebnissen — nachvollziehbar, vollständig und empfängergerecht. Typische Tätigkeiten: Protokolle während oder nach Besprechungen erstellen · Aufgaben, Verantwortlichkeiten und Fristen festhalten · Protokolle für verschiedene Zielgruppen (Team, Steuerungskreis) aufbereiten«",
          anchors: {
            1: "Erstellt einfache Protokolle nach Vorlage; hält wesentliche Ergebnisse fest.",
            2: "Protokolliert eigenständig; erfasst Entscheidungen, Aufgaben und offene Punkte vollständig.",
            3: "Passt Protokolltiefe und -format zielgruppengerecht an; trennt relevante von irrelevanten Inhalten.",
            4: "Erstellt revisionssichere Protokolle für Steuerungskreise; bewertet Qualität anderer Protokolle.",
            5: "Definiert Protokollstandards für das Projektbüro; coacht andere.",
          },
        },
        {
          name: "Terminkoordination & Meeting-Management",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Planung, Vor- und Nachbereitung von Terminen und Besprechungen — inkl. Einladungen, Agenda, Raumorganisation und Nachverfolgung. Typische Tätigkeiten: Regelmeetings koordinieren und Terminreihen einrichten · Agenden vorbereiten und abstimmen · Offene Punkte aus Besprechungen nachverfolgen«",
          anchors: {
            1: "Plant einfache Termine; verschickt Einladungen mit Anleitung.",
            2: "Koordiniert regelmäßige Meetings eigenständig; erstellt Standardagenden.",
            3: "Organisiert komplexe Terminplanung (mehrere Parteien, Zeitzonen); trackt offene Punkte.",
            4: "Optimiert Meeting-Strukturen; entlastet die Projektleitung proaktiv.",
            5: "Definiert Meeting-Management-Standards für große Projekte.",
          },
        },
        {
          name: "Budget- und Kostenverfolgung",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Unterstützung der Projektleitung bei Budgetverfolgung: Ist-Kosten erfassen, Abweichungen erkennen, Berichtvorlagen pflegen. Typische Tätigkeiten: Kostenübersichten aktualisieren · Rechnungsfreigaben vorbereiten und verfolgen · Abweichungsreports für die Projektleitung aufbereiten«",
          anchors: {
            1: "Trägt Kostendaten nach Vorlage ein; braucht Unterstützung bei Auswertungen.",
            2: "Pflegt Budgetübersichten eigenständig; erkennt einfache Abweichungen.",
            3: "Erstellt Abweichungsberichte; verfolgt Rechnungsfreigaben proaktiv nach.",
            4: "Analysiert Kostenentwicklung und bereitet Handlungsempfehlungen für die Projektleitung vor.",
            5: "Entwickelt Budgetcontrolling-Vorlagen und -Standards für das Projektbüro.",
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
            3: "Optimiert Ablagestruktur; stellt Auffindbarkeit aktiv sicher.",
            4: "Entwirft Dokumentenmanagement-Konzepte für große Projekte.",
            5: "Definiert unternehmensweite Ablagestandards für Projekte.",
          },
        },
      ],
    },
    {
      name: "Kommunikativ",
      skills: [
        {
          name: "Interne Abstimmung & Nachverfolgung",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Aktive Unterstützung der Projektleitung bei der internen Koordination: Informationsfluss sicherstellen, Prioritäten kommunizieren, Aufgaben nachverfolgen. Typische Tätigkeiten: Offene Punkte und Aufgaben nachverfolgen · Zuständige eigenständig kontaktieren · Projektstatus intern kommunizieren«",
          anchors: {
            1: "Gibt Informationen weiter wenn gebeten; verfolgt Aufgaben auf Anweisung nach.",
            2: "Stellt Informationsfluss im Team sicher; verfolgt eigenständig nach.",
            3: "Koordiniert Abstimmungsbedarfe proaktiv; eskaliert rechtzeitig.",
            4: "Moderiert einfache Abstimmungsrunden; erkennt Priorisierungskonflikte.",
            5: "Gilt als Dreh- und Angelpunkt für interne Koordination; entwickelt Standards.",
          },
        },
        {
          name: "Externe Kommunikation & Korrespondenz",
          dep: "Durable",
          targetLevel: 2,
          description:
            "»Professionelle schriftliche Kommunikation mit Kunden, Lieferanten und externen Projektpartnern im Auftrag der Projektleitung. Typische Tätigkeiten: E-Mails und Schreiben formulieren · Antworten auf Rückfragen vorbereiten · Korrespondenz revisionssicher ablegen«",
          anchors: {
            1: "Formuliert einfache E-Mails; braucht Korrekturen.",
            2: "Erstellt professionelle Korrespondenz eigenständig; hält Ton und Form ein.",
            3: "Formuliert auch sensible Nachrichten situationsgerecht; beachtet Vertraulichkeit.",
            4: "Vertritt die Projektleitung in einfachen Abstimmungen schriftlich.",
            5: "Definiert Korrespondenzstandards; berät andere.",
          },
        },
        {
          name: "Diskretion & Vertraulichkeit",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Verantwortungsvoller Umgang mit vertraulichen Projekt- und Personalinformationen. Schutz sensibler Daten im Projektalltag. Typische Tätigkeiten: Zugang zu sensiblen Dokumenten beschränken · Vertraulichkeitsregeln einhalten und vorleben · Unklarheiten zu Vertraulichkeit proaktiv klären«",
          anchors: {
            1: "Hält Vertraulichkeit ein wenn explizit darauf hingewiesen.",
            2: "Erkennt vertrauliche Informationen eigenständig; hält Regeln konsequent ein.",
            3: "Handelt diskret ohne Erinnerung; schützt aktiv sensible Informationen.",
            4: "Erkennt Risiken frühzeitig; empfiehlt Schutzmaßnahmen.",
            5: "Gilt als Vertrauensperson; prägt Vertraulichkeitskultur im Büro.",
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
            "»Grundverständnis für Versicherungsprozesse, -systeme und typische IT-Projekte im Kundenumfeld — ermöglicht besseres Impediment-Handling und Stakeholder-Kommunikation. Typische Tätigkeiten: Aufgaben im fachlichen Kontext einordnen · Stakeholder-Sprache verstehen · Fachliche Hindernisse einschätzen«",
          anchors: {
            1: "Kennt grundlegende Versicherungsbegriffe; ordnet Projekte grob ein.",
            2: "Erklärt typische Versicherungsprozesse und IT-Systeme; versteht Kundenperspektive.",
            3: "Bewertet Impediments und Risiken im Fachkontext eigenständig.",
            4: "Navigiert mit Fachkenntnis in komplexen Kundensituationen.",
            5: "Gilt als Domänenexperte; berät Kunden beim Agilitätseinstieg.",
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
            1: "Weiß, dass Regulatorik und Agilität in Spannung stehen.",
            2: "Erklärt gängige Spannungsfelder und gibt erste Lösungsansätze.",
            3: "Gestaltet Prozesse, die Compliance erfüllen und agile Werte wahren.",
            4: "Entwickelt Governance-Modelle für agile Teams in regulierten Umgebungen.",
            5: "Gilt als Experte; berät Kunden bei regulierungskonformer Agilität.",
          },
        },
        { ...RUMP_DIGITALE, targetLevel: 3 },
      ],
    },
    {
      name: "Technisch",
      skills: [
        {
          name: "Agile Metriken (Velocity, Burndown, CFD)",
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
          name: "Scrum Events faciliten",
          dep: "Durable",
          targetLevel: 4,
          keySkill: true,
          description:
            "»Professionelle Facilitation aller fünf Scrum Events: Sprint Planning, Daily Scrum, Sprint Review, Sprint Retrospektive, Backlog Refinement. Zeitboxing, Zielorientierung und Teameinbindung sicherstellen. Typische Tätigkeiten: Events strukturiert vorbereiten und leiten · Sprint-Ziel im Planning schützen · Review-Format zielgruppengerecht gestalten«",
          anchors: {
            1: "Moderiert einfache Events nach Vorlage.",
            2: "Facilitet alle Events eigenständig; hält Zeitboxen ein.",
            3: "Gestaltet Events variabel und situativ; steigert Engagement und Ergebnisqualität.",
            4: "Optimiert Event-Formate kontinuierlich; coacht PO bei Sprint-Ziel-Definition.",
            5: "Gilt als Facilitation-Experte; entwickelt Event-Formate für besondere Situationen.",
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
          name: "Retrospektiven-Design & -Facilitation",
          dep: "Durable",
          targetLevel: 4,
          description:
            "»Gestaltung und Durchführung wirkungsvoller Retrospektiven — mit variierten Formaten, Fokus auf psychologische Sicherheit und nachverfolgbaren Verbesserungen. Typische Tätigkeiten: Retro-Format variieren (Lean Coffee, 4Ls, Starfish) · Ehrlichen Dialog fördern · Action Items konsequent verfolgen«",
          anchors: {
            1: "Moderiert Standard-Retrospektive nach Vorlage.",
            2: "Variiert Formate; erstellt Action Items mit dem Team.",
            3: "Passt Format an Teamstimmung und -themen an; fördert ehrlichen Dialog.",
            4: "Gestaltet Retros für schwierige Situationen (Konflikte, Rückschläge); coacht Kollegen.",
            5: "Entwickelt neue Retro-Formate; etabliert Retrospektiven-Kultur im Unternehmen.",
          },
        },
        {
          name: "Kanban & Flow-Metriken",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Anwendung von Kanban-Prinzipien (Visualisierung, WIP-Limits, Flow) und zugehörigen Metriken als Ergänzung zu Scrum oder als eigenständige Methode. Typische Tätigkeiten: WIP-Limits definieren · Cycle Time und Throughput messen · Engpässe im Flow erkennen und adressieren«",
          anchors: {
            1: "Kennt Kanban-Grundprinzipien.",
            2: "Setzt Kanban-Boards mit WIP-Limits auf.",
            3: "Nutzt Flow-Metriken zur Teamsteuerung; optimiert Workflow-Design.",
            4: "Kombiniert Scrum und Kanban situativ (Scrumban); coacht Team.",
            5: "Gilt als Kanban-Experte; etabliert Kanban in neuen Teams.",
          },
        },
        {
          name: "Skalierungsframeworks (SAFe / LeSS)",
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
            "»Facilitation von Schätzprozessen im agilen Team — Story Points, T-Shirt-Sizing, Planning Poker. Nicht gemeint: inhaltliche Fachschätzung. Typische Tätigkeiten: Planning Poker faciliten · Team für relative Schätzung sensibilisieren · Konsens bei großen Differenzen herbeiführen«",
          anchors: {
            1: "Kennt Planning Poker; erklärt Story Points.",
            2: "Facilitet Estimation-Sessions nach Vorlage.",
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
      name: "Kommunikativ",
      skills: [
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
          name: "Team-Coaching (systemisch)",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Coaching des Scrum-Teams in Richtung Selbstorganisation, Eigenverantwortung und kontinuierlicher Verbesserung — Einzel- und Gruppencoaching-Ansätze. Typische Tätigkeiten: Powerful Questions stellen statt Lösungen vorgeben · Teamkonflikte moderieren · Einzelne Teammitglieder in ihrer Entwicklung begleiten«",
          anchors: {
            1: "Gibt Ratschläge; reagiert auf Probleme wenn gebeten.",
            2: "Stellt gelegentlich offene Fragen; beginnt Coaching-Haltung zu leben.",
            3: "Coacht eigenständig; fördert Selbstorganisation aktiv; moderiert Dynamiken.",
            4: "Kombiniert systemisches Denken mit Coaching; begleitet komplexe Teamdynamiken.",
            5: "Gilt als erfahrener Team-Coach; entwickelt Coaching-Ansätze weiter.",
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
  ],
};

const projektleitung: Role = {
  id: "hybrider-projektmanager",
  name: "Hybrider Projektmanager",
  description:
    "Ganzheitliche Verantwortung für IT-Projekte im Versicherungsumfeld — souveräner Einsatz klassischer und agiler Methoden je nach Projektkontext, kombiniert mit Planung, Steuerung, Budget, Teamführung und Stakeholder-Management von der Initiierung bis zum Abschluss.",
  categories: [
    {
      name: "Fachlich",
      skills: [
        {
          name: "Projektmanagement-Standards (klassisch & agil)",
          dep: "Durable",
          targetLevel: 3,
          keySkill: true,
          description:
            "»Fundiertes Wissen über anerkannte PM-Standards als methodische Grundlage: klassische Frameworks (PMI/PMBOK, PRINCE2, IPMA) sowie agile Ansätze (Scrum, Kanban). Nicht gemeint: schematische Anwendung aller Prozesse eines Frameworks. Typische Tätigkeiten: Projekte nach geeignetem Standard initiieren und strukturieren · Methodik situativ am Kundenbedarf ausrichten · Zertifizierungsnachweis als Qualitätssignal nutzen«",
          anchors: {
            1: "Kennt mindestens einen klassischen und einen agilen PM-Standard; hat Grundbegriffe verinnerlicht.",
            2: "Erklärt Kernkonzepte beider Welten (Phasen, Prozessgruppen, Sprints, Backlogs); leitet daraus Projektvorgehen ab.",
            3: "Wendet klassische und agile Standards situativ an; wählt den Ansatz anhand von Projektkomplexität und Kundenkontext.",
            4: "Begründet Methodik-Entscheidungen gegenüber Kunden; kombiniert Standards zu einem passgenauen Vorgehen.",
            5: "Gilt als PM-Experte; entwickelt unternehmenseigene hybride Projektmethodik weiter.",
          },
        },
        {
          name: "Versicherungs-Domänenwissen",
          dep: "Durable",
          targetLevel: 2,
          description:
            "»Verständnis der Versicherungsbranche als Projektkontext: Geschäftsmodelle, Kernprodukte (Leben, Schaden, Kranken), Betriebsprozesse (Vertrieb, Bestand, Schaden) und typische IT-Systemlandschaften. Nicht gemeint: aktuarielle Modelle. Typische Tätigkeiten: Projektthemen in Geschäftsprozesse einordnen · Fachbereich auf Augenhöhe ansprechen · Branchentypische Priorisierungen nachvollziehen«",
          anchors: {
            1: "Kennt grundlegende Versicherungsprodukte und -prozesse (Vertrieb, Bestand, Schaden).",
            2: "Erklärt Zusammenhänge zwischen Versicherungsprodukten, Kernprozessen und IT-Systemen; ordnet Projektthemen in Geschäftsprozesse ein.",
            3: "Nutzt Domänenwissen zur Risikoeinschätzung und Prioritätensetzung im Projekt; kommuniziert auf Augenhöhe mit dem Fachbereich.",
            4: "Berät Kunden auf Basis fundierter Branchenkenntnis; antizipiert spartenspezifische Anforderungen.",
            5: "Gilt als Branchenexperte; prägt Positionierung von red6 im Versicherungsmarkt.",
          },
        },
        {
          name: "IT-Projekttypen im Versicherungsumfeld",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Verständnis typischer IT-Projektarten bei Versicherungskunden: Kernsystem-Migrationen, Legacy-Ablösungen, regulatorisch getriebene Projekte (DORA, VAIT), Digitalisierungsvorhaben und Plattformablösungen. Abgrenzung zum Domänenwissen: Hier geht es um Projekttyp-spezifische Planungs- und Steuerungsanforderungen, nicht um Versicherungsfachwissen. Typische Tätigkeiten: Projektkomplexität und -risiken je nach Projekttyp einschätzen · Typspezifische Planungsansätze anpassen · Branchenübliche Entscheidungsprozesse beim Kunden verstehen«",
          anchors: {
            1: "Kennt die wichtigsten IT-Projekttypen im Versicherungsumfeld dem Namen nach.",
            2: "Erklärt Merkmale und besondere Anforderungen typischer Projektarten (Migration, Regulatorik, Digitalisierung).",
            3: "Bewertet Komplexität und Risiken eines Projekts anhand des Projekttyps eigenständig; passt Planungsansatz entsprechend an.",
            4: "Erkennt regulatorische Implikationen des Projekttyps; berät Kunden zum optimalen Vorgehen.",
            5: "Gilt als Experte für IT-Projekttypen im Versicherungsumfeld; positioniert red6 als bevorzugten Partner.",
          },
        },
        {
          name: "Regulatorische Grossprojekte (DORA, VAIT)",
          dep: "Evolving",
          targetLevel: 3,
          trend: "stark steigend",
          description:
            "»Verständnis der PM-spezifischen Anforderungen regulatorisch getriebener Großprojekte: Governance, Dokumentationspflichten, Auditierbarkeit, Nachweisführung. Typische Tätigkeiten: Projektsetup an regulatorischen Vorgaben ausrichten · Auditierbare Projektunterlagen sicherstellen · Regulatorische Milestones in Projektplan integrieren«",
          anchors: {
            1: "Kennt relevante Regulatoriken dem Namen nach.",
            2: "Erklärt PM-Implikationen einzelner Vorschriften; beachtet Grundanforderungen.",
            3: "Richtet Projektstruktur und Dokumentation an regulatorischen Anforderungen aus.",
            4: "Verantwortet Compliance-Nachweis gegenüber Auditoren; gestaltet auditfeste Governance.",
            5: "Entwickelt Projektstandards für regulatorische Großprojekte; gilt als Experte.",
          },
        },
        { ...RUMP_DIGITALE, targetLevel: 3 },
      ],
    },
    {
      name: "Technisch",
      skills: [
        {
          name: "Projektmanagement-Tools (MS Project, Jira, Smartsheet)",
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
          name: "Reporting & Forecasting",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Erstellung aussagekräftiger Statusreports, Forecasts und Steuerkennzahlen für Projektsteuerungskreise, Management und Kundenseite. Typische Tätigkeiten: Wöchentliche Statusberichte erstellen · Budget-Forecasts aktualisieren · Earned-Value-Analysen durchführen«",
          anchors: {
            1: "Erstellt Berichte nach Vorlage.",
            2: "Erstellt eigenständig Statusberichte; aktualisiert Forecasts.",
            3: "Analysiert Abweichungen und leitet Handlungsempfehlungen ab.",
            4: "Erstellt komplexe Management-Reports mit strategischen Aussagen.",
            5: "Entwickelt Reporting-Frameworks; berät Kunden bei Steuerungsstrukturen.",
          },
        },
        {
          name: "KI-gestützte Projektsteuerung",
          dep: "Perishable",
          targetLevel: 2,
          trend: "stark steigend",
          description:
            "»Einsatz von KI-Werkzeugen zur Effizienzsteigerung im PM-Alltag: Risikoprognosen, Dokumentenanalyse, Statusberichterstellung. Typische Tätigkeiten: KI-Tools für Risikobewertung und Dokumentensynthese einsetzen · KI-generierte Reports prüfen und nachbessern · Grenzen von KI-Prognosen einschätzen«",
          anchors: {
            1: "Kennt KI-Einsatzmöglichkeiten im PM.",
            2: "Nutzt KI-Tools für Standardaufgaben (Zusammenfassung, Protokoll).",
            3: "Setzt KI gezielt für Risikoanalyse und Reporting ein.",
            4: "Etabliert KI-gestützte PM-Praktiken im Team.",
            5: "Definiert KI-Standards für die PM-Praxis.",
          },
        },
      ],
    },
    {
      name: "Methodisch",
      skills: [
        {
          name: "Projektplanung & Meilensteinsteuerung",
          dep: "Durable",
          targetLevel: 4,
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
          targetLevel: 4,
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
          targetLevel: 4,
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
            "»Planung und Steuerung von Releases über Scrum-Teams hinweg aus PM-Perspektive — Velocity-basiertes Forecasting, Feature-Priorisierung, Release-Koordination und PI-Planning-Beteiligung. Abgrenzung zum Scrum Master: Nicht Event-Facilitation, sondern übergreifende Release-Verantwortung und Lieferplanung. Typische Tätigkeiten: Release-Pläne auf Basis von Velocity und Epic-Breakdown erstellen · Sprint-Ziele mit Projektmeilensteinen abgleichen · Stakeholder über voraussichtliche Liefertermine informieren · In SAFe-Umgebungen PI-Planning-Beiträge koordinieren«",
          anchors: {
            1: "Versteht Sprint-Zyklen; kann Velocity-Daten lesen.",
            2: "Erstellt einfache Release-Pläne auf Basis von Velocity; stimmt Termine mit Team ab.",
            3: "Leitet Velocity-basierte Forecasts ab; koordiniert Releases über mehrere Teams eigenständig.",
            4: "Integriert agile Lieferplanung in klassische Projektsteuerung; unterstützt PI Planning als PM.",
            5: "Gilt als Experte für agile Release-Koordination in komplexen Programmstrukturen.",
          },
        },
        {
          name: "Vertragsmanagement-Grundlagen",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Grundlegendes Verständnis von Vertragstypen, SLAs und Lieferantensteuerung im Projektkontext. Nicht gemeint: juristische Vertragsgestaltung. Typische Tätigkeiten: Werkverträge und Dienstleistungsverträge inhaltlich prüfen · SLA-Einhaltung bei externen Dienstleistern verfolgen · Vertragsänderungen und -erweiterungen einleiten · Abnahmen vertragskonform dokumentieren«",
          anchors: {
            1: "Liest Verträge; versteht grundlegende Vertragstypen.",
            2: "Prüft Verträge auf projektkritische Klauseln; erkennt SLA-Abweichungen.",
            3: "Steuert Lieferanten auf Basis von Verträgen; leitet Vertragsanpassungen ein.",
            4: "Verhandelt Vertragsergänzungen; steuert multi-vendor Setups souverän.",
            5: "Entwickelt Vertragsmanagement-Standards; gilt als Ansprechpartner für externe Verträge.",
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
          name: "Projektabschluss & Lessons Learned",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Strukturierter Projektabschluss: Abnahme, Übergabe, Dokumentation, Lessons Learned und Wissenssicherung. Typische Tätigkeiten: Abnahmedokumente erstellen und unterzeichnen lassen · Lessons-Learned-Workshop moderieren · Wissen für Folgeprojekte sichern«",
          anchors: {
            1: "Erstellt einfache Abschlussdokumente nach Vorlage.",
            2: "Führt eigenständig Projektabschluss durch; dokumentiert Ergebnisse.",
            3: "Moderiert Lessons-Learned-Workshop; sichert Wissen strukturiert.",
            4: "Entwickelt Abschluss-Frameworks; verankert Lernschleifen in der Organisation.",
            5: "Gilt als Experte für PM-Wissensmanagement.",
          },
        },
      ],
    },
    {
      name: "Kommunikativ",
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
            "»Professioneller Umgang mit Eskalationen — eigene Eskalation nach oben und Deeskalation bei Konflikten im Projekt. Typische Tätigkeiten: Eskalationsbedarf frühzeitig erkennen · Sachbezogen und lösungsorientiert eskalieren · Deeskalation bei Kundenkonflikten moderieren«",
          anchors: {
            1: "Meldet Probleme; eskaliert auf Anweisung.",
            2: "Eskaliert eigenständig wenn Probleme unlösbar; hält Format ein.",
            3: "Eskaliert lösungsorientiert; deeskaliert aktiv Spannungen.",
            4: "Navigiert auch emotional aufgeladene Eskalationen; schützt Projektbeziehungen.",
            5: "Entwickelt Eskalations-Frameworks; coacht andere PMs.",
          },
        },
        {
          name: "Verhandlungsführung",
          dep: "Durable",
          targetLevel: 3,
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
        { ...RUMP_VERBAL, targetLevel: 4 },
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
      name: "Kommunikativ",
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
        { name: "Scrum Guide & Professional Scrum", dep: "Durable" },
        { name: "Versicherungsprozesse (Vertrag, Schaden, Bestand)", dep: "Durable" },
        { name: "Regulatorische Anforderungen (BaFin, VVG)", dep: "Evolving" },
        { ...RUMP_DIGITALE },
      ],
    },
    {
      name: "Technisch",
      skills: [
        { name: "Jira & Confluence", dep: "Evolving" },
        { name: "Story Mapping Tools", dep: "Evolving" },
        { name: "Prototyping (Figma)", dep: "Evolving" },
        { name: "Analytics-Grundlagen", dep: "Evolving" },
        { name: "KI-Tools im Produktkontext", dep: "Perishable" },
      ],
    },
    {
      name: "Methodisch",
      skills: [
        { name: "Backlog-Management & Refinement", dep: "Durable" },
        { name: "User Stories schreiben (INVEST)", dep: "Durable" },
        { name: "Akzeptanzkriterien definieren", dep: "Durable" },
        { name: "Story Mapping", dep: "Durable" },
        { name: "Priorisierungstechniken (WSJF, MoSCoW)", dep: "Durable" },
        { name: "MVP-Definition", dep: "Durable" },
        { name: "Sprint- & Release-Planung", dep: "Durable" },
        { name: "Definition of Ready / Done", dep: "Durable" },
        { name: "Discovery & Delivery", dep: "Durable" },
        { name: "Velocity & Forecasting", dep: "Durable" },
      ],
    },
    {
      name: "Kommunikativ",
      skills: [
        { name: "Sprint Reviews moderieren", dep: "Durable" },
        { name: "Stakeholder-Abstimmung", dep: "Durable" },
        { name: "Anforderungserhebung", dep: "Durable" },
        { name: "Teamarbeit mit Entwicklung & UX", dep: "Durable" },
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
      name: "Kommunikativ",
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
      name: "Kommunikativ",
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
          targetLevel: 2,
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
          name: "Sozial- und Lohnsteuerrecht (Grundlagen)",
          dep: "Evolving",
          targetLevel: 2,
          description:
            "»Grundlegende Kenntnisse zu Sozialversicherungspflicht, Lohnsteuer und Entgeltbestandteilen als Schnittstelle zur externen Gehaltsabrechnung. Nicht gemeint: eigenstaendige Lohnabrechnung. Typische Taetigkeiten: Sozialversicherungspflicht bei Sonderfaellen einordnen · Rueckfragen der Gehaltsabrechnung beantworten · Entgeltaenderungen korrekt dokumentieren und weiterleiten«",
          anchors: {
            1: "Kennt Grundbegriffe (SV-Pflicht, Lohnsteuerklassen); braucht Unterstuetzung.",
            2: "Beantwortet einfache Rueckfragen; leitet komplexe Faelle korrekt weiter.",
            3: "Bewertet gaengige Sonderfaelle eigenstaendig; kommuniziert sicher mit der Gehaltsabrechnung.",
            4: "Erkennt systemische Auswirkungen von Entgeltentscheidungen; beraet Fuehrungskraefte.",
            5: "Definiert Schnittstellen zur Gehaltsabrechnung; entwickelt Prozessstandards.",
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
          description:
            "»Administration von Arbeitszeitkonten, Urlaubsanspruechen und Abwesenheiten im HRIS. Typische Taetigkeiten: Urlaubsantraege pruefen und genehmigen · Zeitkonten auf Korrektheit pruefen · Abwesenheitstypen (Krankheit, Sonderurlaub) korrekt erfassen«",
          anchors: {
            1: "Erfasst Abwesenheiten nach Vorgabe; braucht Unterstuetzung bei Sonderfaellen.",
            2: "Verwaltet Urlaubs- und Zeitkonten eigenstaendig fuer Standardfaelle.",
            3: "Loest Sonderfaelle (Uebertrag, Teilzeit, Krankheit) eigenstaendig; prueft Konten proaktiv.",
            4: "Erkennt systemische Fehler und Optimierungspotenziale; beraet Fuehrungskraefte.",
            5: "Entwickelt Prozessstandards fuer Zeiterfassung; schult andere.",
          },
        },
        {
          name: "Schnittstelle zur Gehaltsabrechnung",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Zuverlaessige Uebermittlung aller abrechnungsrelevanten Informationen an die interne oder externe Lohnabrechnung — termingerecht und vollstaendig. Typische Taetigkeiten: Aenderungslisten fristgerecht zusammenstellen · Rueckfragen der Abrechnung klaeren · Abrechnungsergebnisse auf Plausibilitaet pruefen«",
          anchors: {
            1: "Leitet einzelne Informationen auf Anweisung weiter.",
            2: "Stellt Aenderungslisten nach Vorlage eigenstaendig zusammen.",
            3: "Steuert Schnittstelle vollstaendig; prueft Plausibilitaet und klaert Abweichungen.",
            4: "Optimiert Datenuebermittlungsprozesse; reduziert Fehlerquoten.",
            5: "Entwickelt Schnittstellenstandards; verantwortet Abrechnungsqualitaet.",
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
          description:
            "»Strukturierter Abschlussprozess beim Austritt: Kuendigungsbearbeitung, Resturlaubsberechnung, Zeugniserstellung und Systemabmeldung. Typische Taetigkeiten: Austrittsprozesse fristgerecht einleiten · Qualifizierte Arbeitszeugnisse verfassen · Systemzugaenge koordiniert deaktivieren lassen«",
          anchors: {
            1: "Unterstuetzt beim Offboarding mit Anleitung; braucht Pruefung.",
            2: "Fuehrt Offboarding-Checklisten eigenstaendig durch; erstellt einfache Zeugnisse.",
            3: "Steuert Offboarding vollstaendig; erstellt qualifizierte Zeugnisse eigenstaendig.",
            4: "Bearbeitet komplexe Abgaengerfaelle (Kuendigung durch AG, Aufhebung); beraet Fuehrungskraefte.",
            5: "Gilt als Referenz fuer Zeugnisformulierungen; entwickelt Offboarding-Standards.",
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
        {
          name: "Health & Wellbeing Initiativen",
          dep: "Evolving",
          targetLevel: 2,
          description:
            "»Unterstuetzung und Koordination von Massnahmen zur Mitarbeitergesundheit und zum Wohlbefinden. Nicht gemeint: Betriebsaerztliche Leistungen oder klinische Angebote. Typische Taetigkeiten: Gesundheitsangebote koordinieren und kommunizieren · Betriebliches Eingliederungsmanagement begleiten · Bedarfe im Team erheben und Angebote vorschlagen«",
          anchors: {
            1: "Kommuniziert vorhandene Angebote auf Anweisung.",
            2: "Koordiniert Gesundheitsangebote eigenstaendig; begleitet BEM-Prozesse.",
            3: "Erhebt Bedarfe und schlaegt passende Massnahmen vor; steuert Umsetzung.",
            4: "Entwickelt Wellbeing-Konzepte; bewertet Wirksamkeit von Massnahmen.",
            5: "Definiert betriebliche Gesundheitsstrategie; gilt als interne Expertin.",
          },
        },
      ],
    },
    {
      name: "Kommunikativ",
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
        {
          name: "Konflikt- & Beschwerdemanagement",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Entgegennahme, Bearbeitung und Begleitung von Beschwerden und Konflikten zwischen Mitarbeitenden oder mit der Fuehrungskraft. Nicht gemeint: Rechtsstreitigkeiten oder externe Mediation. Typische Taetigkeiten: Beschwerden vertraulich aufnehmen und einordnen · Betroffene zu weiteren Schritten beraten · Klaerende Gespraeche vorbereiten und begleiten«",
          anchors: {
            1: "Nimmt Beschwerden entgegen; leitet an Vorgesetzte weiter.",
            2: "Bearbeitet einfache Beschwerden eigenstaendig; erkennt wann Eskalation noetig ist.",
            3: "Begleitet Konflikte strukturiert; empfiehlt Loesungsansaetze und bleibt neutral.",
            4: "Moderiert komplexere Konfliktsituationen; schuetzt alle Beteiligten sachgerecht.",
            5: "Gilt als erste Anlaufstelle fuer eskalierte Faelle; entwickelt Konfliktpraevention.",
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
      name: "Kommunikativ",
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
      ],
    },
    {
      name: "Kommunikativ",
      skills: [
        {
          name: "Direktansprache & Kandidatenkommunikation",
          dep: "Durable",
          targetLevel: 3,
          keySkill: true,
          description:
            "»Persoenliche, empathische Ansprache passiver Kandidaten und professionelle Kommunikation im gesamten Recruiting-Prozess. Typische Taetigkeiten: Individuelle InMails formulieren die Interesse wecken · Telefonscreenings strukturiert fuehren · Absagen wertschaetzend formulieren«",
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
          name: "Rechnungswesen & Bilanzierung (HGB)",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Grundlegende Kenntnisse des deutschen Rechnungswesens (internes und externes) und der Bilanzierungslogik nach HGB als Basis fuer Controlling-Aufgaben. Nicht gemeint: steuerrechtliche Gestaltung oder Jahresabschlusserstellung. Typische Taetigkeiten: Buchungen und Konten im Controlling-Kontext interpretieren · GuV und Bilanz fuer Steuerungszwecke lesen · Schnittstelle zur Buchhaltung fachlich begleiten«",
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
          targetLevel: 3,
          description:
            "»Kenntnisse der Methoden und Logiken des Projektcontrollings: Earned Value, Meilensteinplanung, Stundenerfassung und Deckungsbeitragsrechnung auf Projektebene. Typische Taetigkeiten: Projektbudgets strukturieren und verfolgen · Abweichungen zwischen geplantem und verbrauchtem Budget analysieren · Stundennachweise und Ressourceneinsatz je Projekt auswerten«",
          anchors: {
            1: "Kennt Grundbegriffe (Budget, Ist-Kosten, Abweichung); braucht Anleitung bei der Auswertung.",
            2: "Erstellt einfache Projektkostenberichte eigenstaendig.",
            3: "Steuert Projektcontrolling-Prozess vollstaendig; erkennt Risiken fruehzeitig.",
            4: "Analysiert Abweichungen mehrdimensional; beraet Projektleitungen zur Gegensteuerung.",
            5: "Entwickelt Projektcontrolling-Standards; definiert KPIs und Berichtsformate.",
          },
        },
        {
          name: "Compliance & internes Kontrollsystem",
          dep: "Evolving",
          targetLevel: 2,
          description:
            "»Grundkenntnisse zu Compliance-Anforderungen im Finanzbereich (z. B. GoBD, Aufbewahrungsfristen) und zum internen Kontrollsystem (IKS) als Rahmenbedingung fuer Controlling-Prozesse. Typische Taetigkeiten: Revisionssichere Dokumentation sicherstellen · Kontrollen in Prozessen benennen und dokumentieren · Externe Pruefungen unterstuetzen«",
          anchors: {
            1: "Kennt Begriff IKS und GoBD; haelt Vorgaben auf Hinweis ein.",
            2: "Erklaert relevante Compliance-Anforderungen; wendet sie im Arbeitsalltag an.",
            3: "Beurteilt Prozesse auf Compliance-Konformitaet; erkennt Risiken eigenstaendig.",
            4: "Entwickelt und dokumentiert Kontrollen; unterstuetzt externe Pruefungen eigenstaendig.",
            5: "Gestaltet IKS-Rahmen; gilt als Ansprechpartner fuer Revisionen.",
          },
        },
        { ...RUMP_DIGITALE, targetLevel: 3 },
      ],
    },
    {
      name: "Technisch",
      skills: [
        {
          name: "Excel (fortgeschritten, Power Query)",
          dep: "Evolving",
          targetLevel: 4,
          keySkill: true,
          description:
            "»Professioneller Einsatz von Excel fuer Controlling-Aufgaben: komplexe Formeln, Pivot-Tabellen, Power Query fuer Datenimport und -transformation, Szenariomodelle. Typische Taetigkeiten: Planungsmodelle und Forecast-Tabellen bauen · Daten aus verschiedenen Quellen per Power Query zusammenfuehren · Berichte und Dashboards per Excel automatisieren«",
          anchors: {
            1: "Nutzt Grundfunktionen; erstellt einfache Tabellen und Diagramme.",
            2: "Setzt Pivot-Tabellen und SVERWEIS sicher ein; erstellt strukturierte Reports.",
            3: "Baut komplexe Modelle mit verschachtelten Formeln; nutzt Power Query fuer Datentransformation.",
            4: "Automatisiert Reports; erstellt skalierbare Planungsmodelle und Szenario-Analysen.",
            5: "Gilt als Excel-Expertin; entwickelt Controlling-Vorlagen fuer das gesamte Unternehmen.",
          },
        },
        {
          name: "ERP- & Projektsteuerungssystem (inkl. Jira, MS Project)",
          dep: "Evolving",
          targetLevel: 3,
          description:
            "»Sicherer Umgang mit dem unternehmensinternen ERP-System sowie projektbezogenen Steuerungstools (Jira, MS Project) fuer buchhalterische Auswertungen, Rechnungsstellung, Kostenstellen-Reporting und Datenexporte ins Controlling. Typische Taetigkeiten: Kosten- und Erloesdaten aus ERP extrahieren · Ausgangsrechnungen vorbereiten und pruefen · Ist-Stunden und Projektfortschritt aus Jira/MS Project fuer Controlling-Auswertungen auslesen · Buchungen auf Plausibilitaet pruefen«",
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
          name: "SQL-Grundlagen",
          dep: "Durable",
          targetLevel: 2,
          description:
            "»Grundlegende SQL-Kenntnisse fuer eigenstaendige Datenbankabfragen zur Unterstuetzung von Controlling-Analysen. Nicht gemeint: Datenbankadministration. Typische Taetigkeiten: Einfache SELECT-Abfragen fuer Kostenauswertungen formulieren · Daten aus Datenbanken fuer Excel-Analysen exportieren · Ergebnisse von IT-seitigen Abfragen prufen«",
          anchors: {
            1: "Versteht SQL-Grundstruktur; liest einfache Abfragen.",
            2: "Schreibt eigenstaendig einfache SELECT-Abfragen mit WHERE und JOIN.",
            3: "Formuliert komplexere Abfragen mit Aggregation und Unterabfragen.",
            4: "Optimiert Abfragen; versteht Datenbankstruktur des eingesetzten Systems.",
            5: "Entwickelt SQL-Abfragen fuer das gesamte Controlling-Reporting.",
          },
        },
        {
          name: "KI-gestuetzte Finanzanalyse",
          dep: "Perishable",
          targetLevel: 2,
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
          targetLevel: 3,
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
          targetLevel: 3,
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
          targetLevel: 3,
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
          name: "Kostenrechnung (Kostenstellen & -traeger)",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Aufbau und Pflege der internen Kostenrechnung: Kostenstellen, Kostentraeger, Umlagen und Deckungsbeitragsrechnung. Typische Taetigkeiten: Kostenstellenstruktur pflegen und Umbuchungen vornehmen · Deckungsbeitraege je Projekt oder Produkt berechnen · Kostenverteilungslogiken entwickeln und dokumentieren«",
          anchors: {
            1: "Kennt Kostenstellen und -traeger; tragt Daten nach Vorgabe ein.",
            2: "Fuehrt Kostenrechnung fuer definierte Bereiche eigenstaendig durch.",
            3: "Gestaltet Kostenrechnungsstruktur mit; berechnet Deckungsbeitraege eigenstaendig.",
            4: "Entwickelt Umlageschluessel; bewertet Kostenstruktur und empfiehlt Optimierungen.",
            5: "Definiert Kostenrechnungsstandards; verantwortet Methodenguete.",
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
          targetLevel: 3,
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
          name: "Angebots- & Auftragsmanagement",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Eigenstaendige Erstellung, Verwaltung und Nachverfolgung von Kundenangeboten, Projektvereinbarungen und Vertraegen als kaufmaennische Schnittstelle zwischen GF, Projektleitung und Kunden. Typische Taetigkeiten: Angebote kalkulieren und erstellen · Projektvereinbarungen und Vertraege anlegen und versionieren · Vertragsfristen und Verlaengerungen proaktiv nachhalten«",
          anchors: {
            1: "Pflegt bestehende Angebote und Vertraege in Vorlagen; braucht Anleitung bei Kalkulation.",
            2: "Erstellt einfache Angebote eigenstaendig; verwaltet Vertraege strukturiert.",
            3: "Kalkuliert und erstellt Angebote vollstaendig; verwaltet Projektvereinbarungen eigenverantwortlich.",
            4: "Verhandelt kaufmaennische Konditionen vor; beraet GF zu Vertragsrisiken.",
            5: "Entwickelt Angebots- und Vertragsstandards; optimiert den kaufmaennischen Prozess.",
          },
        },
        {
          name: "Investitionsrechnung & Business Cases",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Bewertung von Investitionen und Projekten anhand betriebswirtschaftlicher Kennzahlen (ROI, NPV, Amortisation) als Entscheidungsgrundlage. Typische Taetigkeiten: Business Cases strukturieren und berechnen · Sensitivitaetsanalysen zu Annahmen durchfuehren · Ergebnisse fuer Entscheider aufbereiten«",
          anchors: {
            1: "Kennt Grundbegriffe (ROI, Amortisation); braucht Anleitung bei der Berechnung.",
            2: "Erstellt einfache Business Cases nach Vorlage eigenstaendig.",
            3: "Erstellt vollstaendige Business Cases mit Sensitivitaetsanalyse.",
            4: "Hinterfragt Annahmen kritisch; beraet Fuehrungskraefte zu Investitionsentscheidungen.",
            5: "Entwickelt Business-Case-Methodik; gilt als betriebswirtschaftliche Referenz.",
          },
        },
      ],
    },
    {
      name: "Kommunikativ",
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
        { ...RUMP_DIGITALE, targetLevel: 2 },
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
          description:
            "»Operative Nutzung des Projektmanagement-Tools zur Aufgabenverfolgung, Zeiterfassung und Statusdokumentation. Nicht gemeint: Projektkonfiguration oder agile Steuerung. Typische Taetigkeiten: Aufgaben und Meilensteine im Tool pflegen und aktuell halten · Zeitbuchungen pruefen und nachhalten · Statusberichte aus dem Tool aufbereiten«",
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
          targetLevel: 3,
          keySkill: true,
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
          description:
            "»Sicherer Umgang mit MS Office fuer Projektverfolgung, Angebotsvorbereitung und Statusberichte. Typische Taetigkeiten: Auslastungs- und Projektverfolgungslisten in Excel fuehren · Angebote und Statusberichte nach Vorlage aufbereiten · Stundennachweise und Abrechnungsunterlagen in Word strukturieren«",
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
          targetLevel: 2,
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
          description:
            "»Operative Pflege der Einsatz- und Auslastungsplanung: Wer arbeitet in welchem Projekt, in welchem Umfang — als Grundlage fuer Abrechnung und Kapazitaetsplanung. Nicht gemeint: strategische Ressourcenplanung oder Kapazitaetsentscheidungen. Typische Taetigkeiten: Projektzuordnungen erfassen und aktuell halten · Auslastungsuebersichten fuer Projektleitungen aufbereiten · Abweichungen zwischen Planung und Ist erkennen und melden«",
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
          targetLevel: 3,
          keySkill: true,
          description:
            "»Vorbereitung von Projektabrechnungen: Stundennachweise pruefen, Abrechnungsunterlagen zusammenstellen und Rechnungen fuer die Freigabe vorbereiten. Nicht gemeint: Buchungsvorgaenge in der Finanzbuchhaltung. Typische Taetigkeiten: Stundennachweise auf Vollstaendigkeit und Richtigkeit pruefen · Abrechnungsunterlagen fuer den Kunden zusammenstellen · Rechnungsdaten an Buchhaltung uebergeben«",
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
          targetLevel: 2,
          description:
            "»Administrative Unterstuetzung bei der Vorbereitung und Anlage von Angeboten und Auftraegen. Nicht gemeint: kaufmaennische Verhandlung oder Angebotsstrategie. Typische Taetigkeiten: Angebotsvorlagen aufbereiten und Inhalte einpflegen · Auftraege im System anlegen · Unterlagen fuer Angebotsprozesse zusammenstellen«",
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
      name: "Kommunikativ",
      skills: [
        {
          name: "Schnittstelle PM, Controlling & Kunde",
          dep: "Durable",
          targetLevel: 3,
          keySkill: true,
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
          targetLevel: 2,
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
        { ...RUMP_VERBAL, targetLevel: 3 },
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
            "»Verwaltung und Absicherung von mobilen Endgeraeten (Smartphones, Tablets) und Laptops ueber eine MDM-Loesung (z. B. Intune). Typische Taetigkeiten: Geraete einschreiben und konfigurieren · Compliance-Richtlinien ausrollen · Geraete bei Verlust remote loeschen«",
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
      name: "Kommunikativ",
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
    "Lernarchitekt — konzipiert und evaluiert Lernloesungen fuer Mitarbeiterentwicklung.",
  categories: [
    {
      name: "Fachlich",
      skills: [
        { name: "Lerntheorien & Erwachsenenbildung", dep: "Durable" },
        { name: "Compliance-Schulungspflichten", dep: "Evolving" },
        { name: "Versicherungs-Karrierebilder", dep: "Durable" },
        { ...RUMP_DIGITALE },
      ],
    },
    {
      name: "Technisch",
      skills: [
        { name: "LMS (Moodle, SAP SuccessFactors)", dep: "Evolving" },
        { name: "Autorentools (Articulate, Rise)", dep: "Evolving" },
        { name: "Video- & Screencast-Tools", dep: "Evolving" },
        { name: "Learning Analytics", dep: "Evolving" },
        { name: "KI-gestuetzte Content-Erstellung", dep: "Perishable" },
      ],
    },
    {
      name: "Methodisch",
      skills: [
        { name: "Didaktische Konzeption (ADDIE, SAM)", dep: "Durable" },
        { name: "Blended Learning Architekturen", dep: "Evolving" },
        { name: "E-Learning / Microlearning Konzepte", dep: "Evolving" },
        { name: "Lernpfade & Lernreisen gestalten", dep: "Durable" },
        { name: "Lernziel- und Kompetenzdefinition", dep: "Durable" },
        { name: "Peer Learning & Lerngruppen", dep: "Durable" },
        { name: "Workshop-Design & Facilitation", dep: "Durable" },
        { name: "Evaluierung (Kirkpatrick)", dep: "Durable" },
      ],
    },
    {
      name: "Kommunikativ",
      skills: [
        { name: "Train-the-Trainer", dep: "Durable" },
        { name: "Coaching-Grundlagen", dep: "Durable" },
        { ...RUMP_VERBAL },
      ],
    },
  ],
};

const personalentwicklung: Role = {
  id: "personalentwicklung",
  name: "Personalentwicklung",
  description:
    "Strategische und operative Entwicklung von Mitarbeitern und Fuehrungskraeften.",
  categories: [
    {
      name: "Fachlich",
      skills: [
        { name: "Eignungsdiagnostik (DIN 33430)", dep: "Durable" },
        { name: "Kompetenz- und Karrieretheorien", dep: "Durable" },
        { name: "Versicherungs-Rollenbilder", dep: "Durable" },
        { ...RUMP_DIGITALE },
      ],
    },
    {
      name: "Technisch",
      skills: [
        { name: "HR-Analytics & People Data", dep: "Evolving" },
        { name: "HR-Systeme (SuccessFactors, Workday)", dep: "Evolving" },
        { name: "KI im Talent Management", dep: "Perishable" },
      ],
    },
    {
      name: "Methodisch",
      skills: [
        { name: "Kompetenzmodelle entwickeln", dep: "Durable" },
        { name: "Karrierepfade & Laufbahnmodelle", dep: "Durable" },
        { name: "Nachfolgeplanung", dep: "Durable" },
        { name: "Talent Management Prozesse", dep: "Durable" },
        { name: "High Potential Programme", dep: "Durable" },
        { name: "Talent-Reviews & Kalibrierung", dep: "Durable" },
        { name: "Skill-Gap-Analysen (Dreyfus, 9-Box)", dep: "Durable" },
      ],
    },
    {
      name: "Kommunikativ",
      skills: [
        { name: "Systemisches Coaching", dep: "Durable" },
        { name: "Entwicklungs- und Beratungsgespraeche", dep: "Durable" },
        { name: "360°-Feedback moderieren", dep: "Durable" },
        { name: "Individuelle Entwicklungsplaene", dep: "Durable" },
        { name: "Fuehrungskraefte-Beratung", dep: "Durable" },
        { ...RUMP_VERBAL },
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
        { ...RUMP_DIGITALE, targetLevel: 3 },
      ],
    },
    {
      name: "Methodisch",
      skills: [
        {
          name: "Agile Frameworks beherrschen (Scrum / Kanban / XP)",
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
          name: "Skalierungsframeworks (SAFe / LeSS / Spotify)",
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
          name: "Change Management (ADKAR, Kotter)",
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
      name: "Kommunikativ",
      skills: [
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
      name: "Kommunikativ",
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
      name: "Kommunikativ",
      skills: [
        { name: "Storytelling fuer Veraenderung", dep: "Durable" },
        { name: "Townhalls & Dialogformate", dep: "Durable" },
        { name: "Widerstand erkennen & adressieren", dep: "Durable" },
        { name: "Fuehrungskraefte-Coaching im Change", dep: "Durable" },
        { name: "Konflikt-Moderation", dep: "Durable" },
        { ...RUMP_VERBAL },
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
      name: "Kommunikativ",
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
      name: "Kommunikativ",
      skills: [
        { name: "Vision & Purpose kommunizieren", dep: "Durable" },
        { name: "Senior Leadership", dep: "Durable" },
        { name: "Kulturentwicklung", dep: "Durable" },
        { name: "Stakeholder-Management (Gesellschafter, Kunden)", dep: "Durable" },
        { name: "Interne & externe Kommunikation", dep: "Durable" },
        { name: "Krisenmanagement", dep: "Durable" },
        { name: "Gremienarbeit & Reporting", dep: "Durable" },
        { ...RUMP_VERBAL },
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
      name: "Kommunikativ",
      skills: [
        { name: "Feedback geben (wirksam, regelmaessig)", dep: "Durable" },
        { name: "Konfliktmanagement im Team", dep: "Durable" },
        { name: "Entwicklungsgespraeche fuehren", dep: "Durable" },
        { name: "Karriereplanung begleiten", dep: "Durable" },
        { name: "Mentoring", dep: "Durable" },
        { name: "Recruiting-Verantwortung", dep: "Durable" },
        { name: "Reporting nach oben & zur Seite", dep: "Durable" },
        { ...RUMP_VERBAL },
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
    id: "drv-pm-hybrid-methodik",
    title: "Hybrides Projektmanagement als Standard",
    horizon: "0–2 Jahre",
    description:
      "Kunden erwarten, dass Projektverantwortliche klassische und agile Methoden sicher kombinieren. PM-Standards (PMI, PRINCE2) und Scrum/SAFe verschmelzen zu hybriden Vorgehensmodellen — wer nur eines kann, verliert Relevanz.",
    affectedSkillNames: [
      "Agile & Hybride Methoden",
      "Projektplanung & Meilensteinsteuerung",
      "Scrum Events faciliten",
    ],
  },
  {
    id: "drv-pm-regulatorik",
    title: "Regulatorischer Druck auf IT-Projekte (DORA, VAIT, AI Act)",
    horizon: "0–3 Jahre",
    description:
      "Steigende regulatorische Anforderungen verlangen auditfähige Projektgovernance. PM-Rollen müssen Compliance-Anforderungen aktiv in Planung, Steuerung und Dokumentation integrieren.",
    affectedSkillNames: [
      "Regulatorische Grossprojekte (DORA, VAIT)",
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
      "IT-Projekttypen im Versicherungsumfeld",
      "Regulatorische Grossprojekte (DORA, VAIT)",
      "Projektplanung & Meilensteinsteuerung",
    ],
  },
  {
    id: "drv-pm-automatisierung-ai",
    title: "Automatisierung & Agentic AI im Projektumfeld",
    horizon: "1–3 Jahre",
    description:
      "Autonome KI-Agenten übernehmen zunehmend Routineaufgaben im PM: Statuserfassung, Risikomonitoring, Dokumentenanalyse und Anforderungserhebung. PM-Rollen müssen KI-gestützte Prozesse initiieren, überwachen und qualitätssichern — statt sie selbst auszuführen.",
    affectedSkillNames: [
      "KI-gestützte Projektsteuerung",
      "Anforderungsmanagement-Grundlagen",
      "Agile & Hybride Methoden",
    ],
  },
  {
    id: "drv-pm-ki-unterstuetzung",
    title: "KI-gestützte Projektarbeit",
    horizon: "1–3 Jahre",
    description:
      "KI-Tools verändern PM-Routinen: Statusberichte, Risikoanalysen, Meeting-Protokolle und Forecasts werden KI-gestützt. PM-Rollen müssen KI-Outputs kritisch einordnen und verantwortungsvoll einsetzen.",
    affectedSkillNames: [
      "Digitale Anwendungskompetenz",
      "KI-gestützte Projektsteuerung",
      "KI-Tools im agilen Kontext",
    ],
  },
  {
    id: "drv-pm-verteilte-teams",
    title: "Verteilte und internationale Projektteams",
    horizon: "2–5 Jahre",
    description:
      "Projekte werden zunehmend mit verteilten und internationalen Teams umgesetzt. Kompetenzen in Remote-Führung, asynchroner Kommunikation und virtueller Facilitation gewinnen stark an Bedeutung.",
    affectedSkillNames: [
      "Teamführung & Motivation",
      "Stakeholder-Steuerung & -Kommunikation",
      "Servant Leadership",
    ],
  },
];

/** Markttreiber Business Consulting — Test-Perspektive (Juni 2026, FK-Review Diemo Gresch). */
const businessConsultingDrivers: MarketDriver[] = [
  {
    id: "drv-bc-ki-transformation",
    title: "KI-Transformation in der Versicherungsbranche",
    horizon: "0–2 Jahre",
    description:
      "Versicherungskunden integrieren KI in Kernprozesse (Schadenbearbeitung, Underwriting, Kundenservice). Tester muessen KI-gestuetzte Systeme pruefen — mit Verstaendnis fuer KI-Outputs, neue Testanforderungen und Datenschutzgrenzen.",
    affectedSkillNames: [
      "Digitale Anwendungskompetenz",
      "KI-gestuetzte QS & verantwortungsvoller KI-Einsatz",
      "Versicherungsfachlichkeit & Prozessverstaendnis",
    ],
  },
  {
    id: "drv-bc-eu-ai-act",
    title: "EU AI Act, Regulatorik & Governance",
    horizon: "0–3 Jahre",
    description:
      "Der EU AI Act und bestehende Regulatoriken schaffen neue Anforderungen an Testdokumentation, Nachweisfuehrung und Transparenz. QA-Teams muessen Compliance-konforme Testprozesse und auditfeste Nachweise sicherstellen.",
    affectedSkillNames: [
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
      "Antrag, Police, Schaden und Vertragsverwaltung werden durchgaengig digitalisiert. Tester mit tiefem Prozessverstaendnis und Systemkenntnis koennen realistische End-to-End-Testszenarien entwerfen und Schnittstellen gezielt absichern.",
    affectedSkillNames: [
      "Versicherungsfachlichkeit & Prozessverstaendnis",
      "Integrations- & E2E-Test",
      "Testdaten- & Testumgebungsmanagement",
    ],
  },
  {
    id: "drv-bc-agile-skalierung",
    title: "Agile Skalierung und SAFe-Einfuehrung bei Kunden",
    horizon: "1–3 Jahre",
    description:
      "Versicherungsunternehmen skalieren agile Methoden auf Unternehmensebene. QA-Rollen binden sich fruehzeitig in Anforderungs- und Planungsprozesse ein (Shift-Left) und tragen zur Definition of Done bei.",
    affectedSkillNames: [
      "Shift-Left Testing im agilen Prozess",
      "Requirements-Reviews & Akzeptanzkriterien",
      "Teststrategie entwickeln",
    ],
  },
  {
    id: "drv-bc-systemkomplexitaet",
    title: "Wachsende Systemkomplexitaet (Legacy + Cloud + KI)",
    horizon: "2–5 Jahre",
    description:
      "Hybrid-Architekturen aus Altsystemen, Cloud-Loesungen und KI-Komponenten erhoehen Schnittstellenkomplexitaet erheblich. Integrationstest- und Testarchitektur-Kompetenz gewinnen stark an Bedeutung.",
    affectedSkillNames: [
      "Integrations- & E2E-Test",
      "Testarchitektur & Quality Enablement",
      "Nichtfunktionale Qualitaet (Security, Resilienz, Performance, Accessibility)",
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
    roles: [projektleitung, scrumMaster, agileCoach, projektassistenz],
    defaultDrivers: projektmanagementDrivers,
  },
  {
    id: "produktmanagement",
    name: "Produktmanagement",
    description:
      "Produktverantwortung von Strategie und Marktbearbeitung bis Backlog und Auslieferung.",
    roles: [productManager, productOwner],
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
