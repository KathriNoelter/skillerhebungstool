import type { Group, MarketDriver, Role } from "../types";
import { swGroup } from "./swCatalogs";
import { qaCore, testManager, testAutomation } from "./bcCatalogs";
import { RUMP_DIGITALE, RUMP_VERBAL } from "./rumpSkills";

// -----------------------------------------------------------------------------
// Catalog meta (ANF-12)
// -----------------------------------------------------------------------------

/** Skill-Katalog Version. Erhoehen, wenn Strukturen, Steckbriefe oder Anker
 *  geaendert werden. CHANGELOG.md fuehrt die Historie. */
export const CATALOG_VERSION = "0.6.0";
export const CATALOG_UPDATED_AT = "2026-06-04";

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
      name: "Fachkompetenz",
      skills: [
        { name: "Versicherungsprodukte & Kundenreisen", dep: "Durable" },
        { name: "Regulatorische UI-Anforderungen (DSGVO, BFSG)", dep: "Evolving" },
        { name: "Branchen-Patterns (Insurance, FinTech)", dep: "Evolving" },
        { ...RUMP_DIGITALE },
      ],
    },
    {
      name: "Handwerklich-Technisch",
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
      name: "Kommunikation",
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
      name: "Fachkompetenz",
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
      name: "Handwerklich-Technisch",
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
      name: "Kommunikation",
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
  name: "Projektassistenz",
  description:
    "Operative Unterstuetzung der Projektleitung — Organisation, Koordination und Dokumentation.",
  categories: [
    {
      name: "Fachkompetenz",
      skills: [
        { name: "Versicherungs-Projektkontext", dep: "Durable" },
        { name: "Compliance-Vorgaben fuer Dokumentation", dep: "Evolving" },
        { name: "Branchen-spezifische Vorlagen & Standards", dep: "Durable" },
        { ...RUMP_DIGITALE },
      ],
    },
    {
      name: "Handwerklich-Technisch",
      skills: [
        { name: "MS Office (Word, Excel, PowerPoint)", dep: "Durable" },
        { name: "Jira & Confluence", dep: "Evolving" },
        { name: "Outlook & Kalendermanagement", dep: "Durable" },
        { name: "Projektmanagement-Tools (MS Project, Smartsheet)", dep: "Evolving" },
        { name: "KI-Tools fuer Zusammenfassungen", dep: "Perishable" },
      ],
    },
    {
      name: "Methodisch",
      skills: [
        { name: "Terminkoordination & Meeting-Management", dep: "Durable" },
        { name: "Reise- und Veranstaltungsorganisation", dep: "Durable" },
        { name: "Protokollfuehrung & Dokumentation", dep: "Durable" },
        { name: "Dokumentenmanagement & Ablage", dep: "Durable" },
        { name: "Budget- und Kostenverfolgung", dep: "Durable" },
      ],
    },
    {
      name: "Kommunikation",
      skills: [
        { name: "Interne Abstimmung & Priorisierung", dep: "Durable" },
        { name: "Externe Kommunikation & Korrespondenz", dep: "Durable" },
        { name: "Diskretion & Vertraulichkeit", dep: "Durable" },
        { name: "Serviceorientierung", dep: "Durable" },
        { ...RUMP_VERBAL },
      ],
    },
  ],
};

const scrumMaster: Role = {
  id: "scrum-master",
  name: "Scrum Master",
  description:
    "Servant Leader fuer Scrum-Teams — Coaching, Moderation und Impediment Management.",
  categories: [
    {
      name: "Fachkompetenz",
      skills: [
        { name: "Scrum Guide & Professional Scrum", dep: "Durable" },
        { name: "Versicherungs-IT-Domaene", dep: "Durable" },
        { name: "Agilitaet in regulierten Branchen", dep: "Evolving" },
        { ...RUMP_DIGITALE },
      ],
    },
    {
      name: "Handwerklich-Technisch",
      skills: [
        { name: "Metriken (Velocity, Burndown, CFD)", dep: "Durable" },
        { name: "KI-Tools im agilen Kontext", dep: "Perishable" },
      ],
    },
    {
      name: "Methodisch",
      skills: [
        { name: "Scrum Framework (Rollen, Events, Artefakte)", dep: "Durable" },
        { name: "Kanban & Flow-Metriken", dep: "Durable" },
        { name: "SAFe / LeSS Grundlagen", dep: "Evolving" },
        { name: "Estimation Techniken", dep: "Durable" },
        { name: "Retrospektiven-Formate", dep: "Durable" },
        { name: "Facilitation & Workshop-Design", dep: "Durable" },
        { name: "Impediment Management", dep: "Durable" },
        { name: "Agile Transformation begleiten", dep: "Durable" },
        { name: "Community of Practice aufbauen", dep: "Durable" },
      ],
    },
    {
      name: "Kommunikation",
      skills: [
        { name: "Team-Coaching (systemisch)", dep: "Durable" },
        { name: "Konflikt-Moderation", dep: "Durable" },
        { name: "Servant Leadership", dep: "Durable" },
        { name: "Stakeholder-Management", dep: "Durable" },
        { ...RUMP_VERBAL },
      ],
    },
  ],
};

const projektleitung: Role = {
  id: "projektleitung",
  name: "Projektleitung",
  description:
    "Ganzheitliche Verantwortung fuer Projekte — Planung, Steuerung, Team und Stakeholder.",
  categories: [
    {
      name: "Fachkompetenz",
      skills: [
        { name: "PMI / IPMA / PRINCE2 Body of Knowledge", dep: "Durable" },
        { name: "Versicherungsbranche & Projekttypen", dep: "Durable" },
        { name: "Regulatorische Grossprojekte (Solvency II, IFRS 17)", dep: "Evolving" },
        { ...RUMP_DIGITALE },
      ],
    },
    {
      name: "Handwerklich-Technisch",
      skills: [
        { name: "Reporting & Forecasting", dep: "Durable" },
      ],
    },
    {
      name: "Methodisch",
      skills: [
        { name: "Projektplanung & Meilensteine", dep: "Durable" },
        { name: "Ressourcen- & Budgetplanung", dep: "Durable" },
        { name: "Kritischer Pfad & Abhaengigkeiten", dep: "Durable" },
        { name: "Agile & Hybrid Methoden", dep: "Evolving" },
        { name: "Risikomanagement", dep: "Durable" },
        { name: "Change Request Management", dep: "Durable" },
        { name: "Vertragsmanagement-Grundlagen", dep: "Durable" },
      ],
    },
    {
      name: "Kommunikation",
      skills: [
        { name: "Teamaufbau & Motivation", dep: "Durable" },
        { name: "Delegation & Coaching", dep: "Durable" },
        { name: "Konfliktloesung", dep: "Durable" },
        { name: "Verteilte Teams fuehren (Remote)", dep: "Evolving" },
        { name: "Entscheidungen unter Unsicherheit", dep: "Durable" },
        { name: "Stakeholder-Kommunikation & -Steuerung", dep: "Durable" },
        { name: "Eskalationsmanagement", dep: "Durable" },
        { ...RUMP_VERBAL },
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
      name: "Fachkompetenz",
      skills: [
        { name: "Versicherungsprodukte & Marktstruktur", dep: "Durable" },
        { name: "Vertriebskanaele & Kundensegmente", dep: "Durable" },
        { name: "Regulatorik fuer Versicherungsprodukte (VVG, BaFin)", dep: "Evolving" },
        { name: "Geschaeftsmodelle der Versicherungsbranche", dep: "Durable" },
        { ...RUMP_DIGITALE },
      ],
    },
    {
      name: "Handwerklich-Technisch",
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
      name: "Kommunikation",
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
      name: "Fachkompetenz",
      skills: [
        { name: "Scrum Guide & Professional Scrum", dep: "Durable" },
        { name: "Versicherungsprozesse (Vertrag, Schaden, Bestand)", dep: "Durable" },
        { name: "Regulatorische Anforderungen (BaFin, VVG)", dep: "Evolving" },
        { ...RUMP_DIGITALE },
      ],
    },
    {
      name: "Handwerklich-Technisch",
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
      name: "Kommunikation",
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
    "Direkte Unterstuetzung der Geschaeftsfuehrung — Organisation, Kommunikation und Vertraulichkeit.",
  categories: [
    {
      name: "Fachkompetenz",
      skills: [
        { name: "Versicherungsbranche & Marktstruktur", dep: "Durable" },
        { name: "Regulatorik (BaFin, MaRisk, VAG)", dep: "Evolving" },
        { name: "Vorstands- und Gremienthemen", dep: "Durable" },
        { ...RUMP_DIGITALE },
      ],
    },
    {
      name: "Handwerklich-Technisch",
      skills: [
        { name: "MS Office 365 (Outlook, Teams, SharePoint)", dep: "Evolving" },
        { name: "CRM-Systeme", dep: "Evolving" },
        { name: "KI-Tools fuer Effizienz", dep: "Perishable" },
      ],
    },
    {
      name: "Methodisch",
      skills: [
        { name: "Terminkoordination Geschaeftsfuehrung", dep: "Durable" },
        { name: "Reisemanagement (international)", dep: "Durable" },
        { name: "Vor- & Nachbereitung von Terminen", dep: "Durable" },
        { name: "Dokumentenmanagement & Archivierung", dep: "Durable" },
        { name: "Veranstaltungsorganisation", dep: "Durable" },
        { name: "Budget- & Reise-Tracking", dep: "Durable" },
      ],
    },
    {
      name: "Kommunikation",
      skills: [
        { name: "Korrespondenz (DE/EN)", dep: "Durable" },
        { name: "Praesentationen & Board-Unterlagen", dep: "Durable" },
        { name: "Interne & externe Stakeholder-Kontakte", dep: "Durable" },
        { name: "Protokollfuehrung auf C-Level", dep: "Durable" },
        { name: "Vertraulichkeit & Integritaet", dep: "Durable" },
        { ...RUMP_VERBAL },
      ],
    },
  ],
};

const teamassistenz: Role = {
  id: "teamassistenz",
  name: "Teamassistenz",
  description:
    "Unterstuetzung fuer ein Team oder einen Bereich — Koordination und Office Management.",
  categories: [
    {
      name: "Fachkompetenz",
      skills: [
        { name: "Bueroorganisation in der Versicherung", dep: "Durable" },
        { name: "Branchen-spezifische Standards", dep: "Durable" },
        { name: "Compliance-Grundlagen", dep: "Evolving" },
        { ...RUMP_DIGITALE },
      ],
    },
    {
      name: "Handwerklich-Technisch",
      skills: [
        { name: "MS Office Standard", dep: "Durable" },
        { name: "Slack / Teams / Kollaborationstools", dep: "Evolving" },
      ],
    },
    {
      name: "Methodisch",
      skills: [
        { name: "Terminkoordination fuer das Team", dep: "Durable" },
        { name: "Onboarding-Unterstuetzung", dep: "Durable" },
        { name: "Raumplanung & Meetingorganisation", dep: "Durable" },
        { name: "Bestellwesen & Beschaffung", dep: "Durable" },
        { name: "Ablage & Archivierung", dep: "Durable" },
        { name: "Materialbeschaffung", dep: "Durable" },
        { name: "Bueroorganisation", dep: "Durable" },
        { name: "Postbearbeitung & Dokumentenfluss", dep: "Durable" },
        { name: "Protokollierung", dep: "Durable" },
      ],
    },
    {
      name: "Kommunikation",
      skills: [
        { name: "Dienstleister-Kontakte", dep: "Durable" },
        { name: "Informations-Sharing im Team", dep: "Durable" },
        { ...RUMP_VERBAL },
      ],
    },
  ],
};

const hrGeneralist: Role = {
  id: "hr-generalist",
  name: "HR Generalistin",
  description:
    "Ganzheitliche HR-Betreuung — Administration, Arbeitsrecht und Mitarbeiter-Lifecycle.",
  categories: [
    {
      name: "Fachkompetenz",
      skills: [
        { name: "Arbeitsrecht (DE)", dep: "Durable" },
        { name: "Tarifvertrag fuer Versicherungen", dep: "Durable" },
        { name: "Sozial- und Lohnsteuerrecht", dep: "Evolving" },
        { name: "DSGVO im HR-Kontext", dep: "Durable" },
        { name: "Mutterschutz & Elternzeit", dep: "Durable" },
        { name: "Tarifwesen / Betriebsvereinbarungen", dep: "Durable" },
        { ...RUMP_DIGITALE },
      ],
    },
    {
      name: "Handwerklich-Technisch",
      skills: [
        { name: "HR-Software (Personio, Workday)", dep: "Evolving" },
      ],
    },
    {
      name: "Methodisch",
      skills: [
        { name: "Vertragsmanagement & Dokumente", dep: "Durable" },
        { name: "Personalaktenfuehrung", dep: "Durable" },
        { name: "Zeiterfassung & Urlaubsverwaltung", dep: "Durable" },
        { name: "Schnittstelle zur Gehaltsabrechnung", dep: "Durable" },
        { name: "Onboarding-Prozesse", dep: "Durable" },
        { name: "Offboarding & Zeugniserstellung", dep: "Durable" },
        { name: "Health & Wellbeing Initiativen", dep: "Evolving" },
      ],
    },
    {
      name: "Kommunikation",
      skills: [
        { name: "Betriebsrats-Zusammenarbeit", dep: "Durable" },
        { name: "Mitarbeitergespraeche fuehren", dep: "Durable" },
        { name: "Konflikt- & Beschwerdemanagement", dep: "Durable" },
        { ...RUMP_VERBAL },
      ],
    },
  ],
};

const recruiting: Role = {
  id: "recruiting",
  name: "Recruiting",
  description:
    "Talent Acquisition — Active Sourcing, Interview-Fuehrung und Employer Branding.",
  categories: [
    {
      name: "Fachkompetenz",
      skills: [
        { name: "Versicherungs-Berufsbilder & Karrierepfade", dep: "Durable" },
        { name: "Eignungsdiagnostik (DIN 33430)", dep: "Durable" },
        { name: "Eignungsdiagnostik-Grundlagen", dep: "Durable" },
        { name: "Arbeitsmarkt Versicherungsbranche", dep: "Evolving" },
        { ...RUMP_DIGITALE },
      ],
    },
    {
      name: "Handwerklich-Technisch",
      skills: [
        { name: "LinkedIn Recruiter & Boolean Search", dep: "Evolving" },
        { name: "Bewerbermanagement-Systeme (ATS)", dep: "Evolving" },
        { name: "Karriere-Website & Content", dep: "Evolving" },
        { name: "Social Media Recruiting", dep: "Evolving" },
        { name: "KI-Tools im Recruiting", dep: "Perishable" },
      ],
    },
    {
      name: "Methodisch",
      skills: [
        { name: "Talent Pipelines aufbauen", dep: "Durable" },
        { name: "Research & Market Mapping", dep: "Durable" },
        { name: "Strukturierte Interviews fuehren", dep: "Durable" },
        { name: "Kompetenz- und Verhaltensbewertung", dep: "Durable" },
        { name: "Assessment Center moderieren", dep: "Durable" },
        { name: "Stellenanzeigen schreiben (attraktiv)", dep: "Durable" },
        { name: "Recruiting-Messen & Events", dep: "Durable" },
        { name: "Candidate Experience optimieren", dep: "Durable" },
      ],
    },
    {
      name: "Kommunikation",
      skills: [
        { name: "Direktansprache (Personal, empathisch)", dep: "Durable" },
        { ...RUMP_VERBAL },
      ],
    },
  ],
};

const controlling: Role = {
  id: "controlling",
  name: "Controlling",
  description:
    "Finanz- und Unternehmenssteuerung — Planung, Reporting und Analyse.",
  categories: [
    {
      name: "Fachkompetenz",
      skills: [
        { name: "Bilanzierung Versicherer (HGB, IFRS 17)", dep: "Evolving" },
        { name: "Solvency II — Quantitative Anforderungen", dep: "Evolving" },
        { name: "Versicherungstechnische Rueckstellungen", dep: "Durable" },
        { ...RUMP_DIGITALE },
      ],
    },
    {
      name: "Handwerklich-Technisch",
      skills: [
        { name: "Excel (fortgeschritten, PowerQuery)", dep: "Evolving" },
        { name: "ERP-Systeme (SAP, DATEV)", dep: "Evolving" },
        { name: "BI-Tools (Power BI, Tableau)", dep: "Evolving" },
        { name: "SQL-Grundlagen", dep: "Durable" },
        { name: "KI-gestuetzte Finanzanalyse", dep: "Perishable" },
      ],
    },
    {
      name: "Methodisch",
      skills: [
        { name: "Budgetplanung & -koordination", dep: "Durable" },
        { name: "Forecasting & Rolling Forecasts", dep: "Durable" },
        { name: "Liquiditaetsplanung", dep: "Durable" },
        { name: "Kostenrechnung (Kostenstellen, -traeger)", dep: "Durable" },
        { name: "Investitionsrechnung & Business Cases", dep: "Durable" },
        { name: "Monats- & Jahresreporting", dep: "Durable" },
        { name: "KPI-Tracking & Dashboards", dep: "Durable" },
        { name: "Abweichungsanalyse (Plan-Ist)", dep: "Durable" },
        { name: "Adhoc-Analysen", dep: "Durable" },
      ],
    },
    {
      name: "Kommunikation",
      skills: [
        { name: "Management-Reports fuer Stakeholder", dep: "Durable" },
        { ...RUMP_VERBAL },
      ],
    },
  ],
};

const itAdmin: Role = {
  id: "it-admin",
  name: "IT-Admin",
  description:
    "Interne IT-Administration — Systeme, Netzwerk, Sicherheit und User-Support.",
  categories: [
    {
      name: "Fachkompetenz",
      skills: [
        { name: "ITIL / IT Service Management", dep: "Durable" },
        { name: "VAIT / BAIT (Aufsichtsanforderungen IT)", dep: "Evolving" },
        { name: "IT-Sicherheit in regulierten Branchen", dep: "Evolving" },
        { name: "Incident Response Grundlagen", dep: "Durable" },
        { ...RUMP_DIGITALE },
      ],
    },
    {
      name: "Handwerklich-Technisch",
      skills: [
        { name: "Windows / macOS / Linux Administration", dep: "Durable" },
        { name: "Active Directory / Azure AD / Entra ID", dep: "Evolving" },
        { name: "Backup & Disaster Recovery", dep: "Durable" },
        { name: "Virtualisierung (Hyper-V, VMware)", dep: "Evolving" },
        { name: "LAN / WLAN Administration", dep: "Durable" },
        { name: "Firewall- & VPN-Grundlagen", dep: "Durable" },
        { name: "Microsoft 365 Administration", dep: "Evolving" },
        { name: "Cloud-Grundlagen (Azure / AWS)", dep: "Evolving" },
        { name: "Mobile Device Management (MDM)", dep: "Evolving" },
        { name: "Endpoint Security & Antivirus", dep: "Durable" },
        { name: "MFA / SSO Konfiguration", dep: "Evolving" },
      ],
    },
    {
      name: "Methodisch",
      skills: [
        { name: "Patch- und Update-Management", dep: "Durable" },
        { name: "User Support & Ticketing (Jira SM)", dep: "Evolving" },
        { name: "Dokumentation & Wissensdatenbank", dep: "Durable" },
      ],
    },
    {
      name: "Kommunikation",
      skills: [
        { ...RUMP_VERBAL },
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
      name: "Fachkompetenz",
      skills: [
        { name: "Lerntheorien & Erwachsenenbildung", dep: "Durable" },
        { name: "Compliance-Schulungspflichten", dep: "Evolving" },
        { name: "Versicherungs-Karrierebilder", dep: "Durable" },
        { ...RUMP_DIGITALE },
      ],
    },
    {
      name: "Handwerklich-Technisch",
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
      name: "Kommunikation",
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
      name: "Fachkompetenz",
      skills: [
        { name: "Eignungsdiagnostik (DIN 33430)", dep: "Durable" },
        { name: "Kompetenz- und Karrieretheorien", dep: "Durable" },
        { name: "Versicherungs-Rollenbilder", dep: "Durable" },
        { ...RUMP_DIGITALE },
      ],
    },
    {
      name: "Handwerklich-Technisch",
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
      name: "Kommunikation",
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
    "Agile Transformation auf Team-, Portfolio- und Organisationsebene begleiten.",
  categories: [
    {
      name: "Fachkompetenz",
      skills: [
        { name: "Agile Manifesto & Theorie", dep: "Durable" },
        { name: "ICF Coaching-Standards", dep: "Durable" },
        { name: "Agilitaet in regulierten Branchen", dep: "Evolving" },
        { ...RUMP_DIGITALE },
      ],
    },
    {
      name: "Methodisch",
      skills: [
        { name: "Scrum / Kanban / XP", dep: "Durable" },
        { name: "SAFe / LeSS / Spotify Model", dep: "Evolving" },
        { name: "Agile Leadership Principles", dep: "Durable" },
        { name: "Lean Thinking & Systems Thinking", dep: "Durable" },
        { name: "Design Thinking", dep: "Durable" },
        { name: "Change Management (ADKAR, Kotter)", dep: "Durable" },
        { name: "Kulturentwicklung & -Diagnose", dep: "Durable" },
        { name: "Transformation Roadmap", dep: "Durable" },
        { name: "Community of Practice Building", dep: "Durable" },
        { name: "Metriken & Evidenz fuer Agilitaet", dep: "Durable" },
      ],
    },
    {
      name: "Kommunikation",
      skills: [
        { name: "Individuelles Coaching (ICF-Standards)", dep: "Durable" },
        { name: "Team-Coaching (systemisch)", dep: "Durable" },
        { name: "Gruppendynamik erkennen", dep: "Durable" },
        { name: "Mentoring & Teaching", dep: "Durable" },
        { name: "Powerful Questions", dep: "Durable" },
        { ...RUMP_VERBAL },
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
      name: "Fachkompetenz",
      skills: [
        { name: "Gruppendynamik (Theorie)", dep: "Durable" },
        { name: "Organisationspsychologie", dep: "Durable" },
        { name: "Versicherungskontext & Teamtypen", dep: "Durable" },
        { ...RUMP_DIGITALE },
      ],
    },
    {
      name: "Handwerklich-Technisch",
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
      name: "Kommunikation",
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
      name: "Fachkompetenz",
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
      name: "Kommunikation",
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
      name: "Fachkompetenz",
      skills: [
        { name: "Systemtheorie & Organisationstheorie", dep: "Durable" },
        { name: "Versicherungs-Geschaeftsmodelle", dep: "Durable" },
        { name: "Wandel in regulierten Branchen", dep: "Evolving" },
        { ...RUMP_DIGITALE },
      ],
    },
    {
      name: "Handwerklich-Technisch",
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
      name: "Kommunikation",
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
      name: "Fachkompetenz",
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
      name: "Handwerklich-Technisch",
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
      name: "Kommunikation",
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
      name: "Fachkompetenz",
      skills: [
        { name: "Fuehrungstheorien & -modelle", dep: "Durable" },
        { name: "Bereichsspezifische Fachexpertise", dep: "Durable" },
        { name: "Versicherungs-IT-Strategie", dep: "Evolving" },
        { ...RUMP_DIGITALE },
      ],
    },
    {
      name: "Handwerklich-Technisch",
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
      name: "Kommunikation",
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
    roles: [projektassistenz, scrumMaster, projektleitung],
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
    roles: [gfAssistenz, teamassistenz, hrGeneralist, recruiting, controlling, itAdmin],
  },
  {
    id: "poc",
    name: "P.O.C. — People & Organizational Change",
    description:
      "Personalentwicklung, Organisationsentwicklung und Transformation.",
    roles: [
      ldExpert,
      personalentwicklung,
      agileCoach,
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
