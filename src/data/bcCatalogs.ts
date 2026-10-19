import type { Role } from "../types";
import { RUMP_DIGITALE, RUMP_DIGITALE_V2, RUMP_VERBAL, RUMP_VERBAL_V2 } from "./rumpSkills";

// =============================================================================
// QA Core
// =============================================================================

export const qaCore: Role = {
  id: "tester",
  name: "Tester",
  description:
    "Gemeinsame Grundkompetenzen aller Tester — systematisches Testen, Defektkommunikation und QA im regulierten Versicherungsumfeld.",
  categories: [
    {
      name: "Fachlich",
      skills: [
        {
          name: "Professionelle Basis-Testkompetenz (GTB/ISTQB)",
          dep: "Durable",
          targetLevel: 3,
          keySkill: true,
          description:
            "»Faehigkeit, den vollstaendigen Testprozess professionell auszufuehren: Testplanung verstehen, Testanalyse durchfuehren, Testbedingungen ableiten, Testfaelle entwerfen, Tests realisieren, Tests durchfuehren, Ergebnisse dokumentieren, Abweichungen melden und Testabschluss unterstuetzen. Basisqualifikation fuer alle QA-Rollen nach GTB/ISTQB. Typische Taetigkeiten: Testfaelle eigenstaendig entwerfen und ausfuehren · Testabdeckung bewerten · Abweichungen nachvollziehbar dokumentieren«",
          anchors: {
            1: "Fuehrt vorgegebene Testfaelle aus, erkennt Abweichungen vom Erwarteten und dokumentiert Ergebnisse nachvollziehbar.",
            2: "Erstellt einfache Testfaelle eigenstaendig aus vorgegebenen Anforderungen; nutzt Testwerkzeuge sicher und wendet grundlegende Testdesigntechniken an.",
            3: "Fuehrt Testanalyse, Testentwurf, Testrealisierung und Testdurchfuehrung in einem abgegrenzten Testfeld eigenstaendig durch.",
            4: "Bewertet Testabdeckung, Risiken, Fehlerlage und Testqualitaet ueber mehrere Anforderungen oder Teststufen hinweg.",
            5: "Gestaltet uebergreifende Standards fuer professionelles Testen, coacht andere und verbessert den Testprozess systematisch.",
          },
        },
        {
          name: "Versicherungsfachlichkeit & Prozessverstaendnis",
          dep: "Durable",
          targetLevel: 3,
          keySkill: true,
          trend: "steigend",
          description:
            "»Verstehen von Versicherungsprozessen, Sparten, Produktlogik sowie Vertrags-, Schaden-, Leistungs-, Vertriebspartner-, Zahlungs- und Kundendatenprozessen. Besonders wichtig fuer Testdesign, E2E-Szenarien, UAT und Fehlerbewertung. Typische Taetigkeiten: Testfaelle und Testdaten aus Fachprozessen ableiten · Fachbegriffe korrekt verwenden · fachliche Pruefpunkte identifizieren«",
          anchors: {
            1: "Kennt Grundbegriffe, Rollen, Systeme und typische Versicherungsprozesse.",
            2: "Erklaert Prozess- und Produktzusammenhaenge fachlich korrekt.",
            3: "Leitet daraus Testfaelle, Testdaten und fachliche Pruefpunkte ab.",
            4: "Erkennt Luecken, Varianten, Sonderfaelle und Risiken in Fachprozessen.",
            5: "Entwickelt fachliche Testmodelle, Referenzszenarien und wiederverwendbare Qualitaetsmuster.",
          },
        },
        {
          name: "Regulatorik, Auditfaehigkeit & Nachweisfuehrung",
          dep: "Evolving",
          targetLevel: 3,
          keySkill: true,
          trend: "steigend",
          description:
            "»Faehigkeit, Testvorgehen, Testfaelle, Ergebnisse, Risiken, Abnahmen und Abweichungen so zu gestalten, dass sie DORA, DSGVO, BFSG, AI Act, FiDA, NIS2 und internen Governance-Vorgaben standhalten. Typische Taetigkeiten: pruefbare Testnachweise erstellen · Abnahmeprotokolle auditfest dokumentieren · Compliance-Luecken im Testvorgehen erkennen«",
          anchors: {
            1: "Kennt zentrale regulatorische Begriffe und Nachweisanforderungen.",
            2: "Erklaert Auswirkungen auf Testumfang, Dokumentation, Risiko und Freigabe.",
            3: "Erstellt pruefbare Testnachweise, Abnahmeprotokolle und Traceability.",
            4: "Erkennt Compliance-Luecken, Dokumentationsrisiken und fehlende Kontrollpunkte.",
            5: "Entwirft auditfaehige Test- und Nachweismodelle fuer Programme oder Produktlinien.",
          },
        },
        {
          name: "ISO 29119 — Software Testing Standards",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Kenntnis der ISO 29119-Normenreihe als international anerkannter Rahmen fuer Softwaretestprozesse, Testdokumentation und Testdesigntechniken. Nicht gemeint: vollstaendige Implementierung aller Normenteile. Typische Taetigkeiten: Testdokumentation auf ISO-Konformitaet pruefen · Normkonzepte bei Kunden erklaeren · Testvorgehen an ISO-Anforderungen ausrichten«",
          anchors: {
            1: "Hat von ISO 29119 gehoert; Inhalte noch nicht vertieft.",
            2: "Kennt Grundstruktur (Prozesse, Dokumentation, Techniken); kann relevante Normteile benennen.",
            3: "Wendet ISO-29119-Konzepte bei Testdokumentation und -prozessen eigenstaendig an.",
            4: "Bewertet Testprozesse auf ISO-Konformitaet; nutzt Norm zur Argumentation bei Kunden.",
            5: "Gilt als Normenexperte; verantwortet ISO-konforme Teststandardisierung im Unternehmen.",
          },
        },
        { ...RUMP_DIGITALE },
        {
          name: "Testdaten- & Testumgebungsmanagement",
          dep: "Evolving",
          targetLevel: 4,
          keySkill: true,
          trend: "steigend",
          description:
            "»Planung, Bereitstellung, Maskierung, Pflege und Steuerung geeigneter Testdaten und stabiler Testumgebungen unter Datenschutz- (DSGVO), Fachlichkeits-, Release- und Automatisierungsanforderungen. Typische Taetigkeiten: Testdaten fuer Testfaelle, Regression und UAT planen · Datenmaskierung und synthetische Daten einsetzen · Umgebungskonflikte und Abhaengigkeiten steuern«",
          anchors: {
            1: "Nutzt bereitgestellte Testdaten und Umgebungen nach Vorgabe.",
            2: "Erkennt einfache Daten- und Umgebungsprobleme; passt Testdaten auf Hinweis an.",
            3: "Plant Testdaten fuer Testfaelle, Regression und UAT; beruecksichtigt Datenschutz und Sonderfaelle.",
            4: "Steuert Datenqualitaet, Datenschutz, Maskierung, Umgebungskonflikte und Abhaengigkeiten eigenstaendig.",
            5: "Etabliert wiederverwendbare Testdaten- und Umgebungsstrategien fuer Programme.",
          },
        },
        {
          name: "Testabdeckungsstrategien & Coverage-Analyse",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Planung und Messung der Testabdeckung auf Anforderungsebene. Begruendete Entscheidung, welche Bereiche wie tief getestet werden — abhaengig von Risiko, Komplexitaet und Ressourcen. Typische Taetigkeiten: Anforderungs-Coverage-Matrix pflegen · Abdeckungsluecken identifizieren und eskalieren · Coverage-Ziele mit Projektleitung abstimmen«",
          anchors: {
            1: "Versteht, was Testabdeckung bedeutet; kann aber noch keine Coverage-Entscheidungen treffen.",
            2: "Fuellt Coverage-Matrizen nach Vorlage aus; meldet Luecken auf Hinweis.",
            3: "Pflegt Anforderungs-Coverage eigenstaendig; erkennt und kommuniziert Abdeckungsluecken proaktiv.",
            4: "Begruendet Coverage-Entscheidungen risikobasiert; stimmt Testtiefe mit Stakeholdern ab.",
            5: "Verantwortet Coverage-Strategie auf Projektebene; definiert Coverage-Standards und Metriken.",
          },
        },
      ],
    },
    {
      name: "Technisch",
      skills: [
        {
          name: "Testmanagement-Tools (Nutzung & Konfiguration)",
          dep: "Evolving",
          targetLevel: 3,
          description:
            "»Bedienung und Einrichtung von Testmanagement-Tools (z. B. TestRail, Xray, Zephyr) zur Verwaltung von Testfaellen, Testlaeufen, Testergebnissen und Traceability. Nicht gemeint: Server-Administration oder Plugin-Entwicklung. Typische Taetigkeiten: Testfaelle anlegen und Testlaeufe durchfuehren · Testsuiten strukturieren und Traceability zu Anforderungen herstellen · Berichte und Dashboards konfigurieren«",
          anchors: {
            1: "Kennt Grundbegriffe des Tools (Testfall, Testplan, Testlauf); kann noch nicht eigenstaendig damit arbeiten.",
            2: "Navigiert sicher im Tool; legt Testfaelle an, fuehrt Testlaeufe durch und dokumentiert Ergebnisse nach Anleitung.",
            3: "Arbeitet eigenstaendig mit dem Tool; richtet Testsuiten mit Traceability-Links ein und konfiguriert Berichtsvorlagen.",
            4: "Definiert Projekt-Teststruktur im Tool; konfiguriert Dashboards und schult Teammitglieder.",
            5: "Administriert das Tool auf Projektebene; bewertet und etabliert Konfigurationsstandards.",
          },
        },
        {
          name: "Versionskontrolle",
          dep: "Durable",
          targetLevel: 2,
          description:
            "»Grundlegendes Verstaendnis von Versionskontrollsystemen (z. B. Git) fuer die Zusammenarbeit in Entwicklungsprojekten: Repositories lesen, Branch-Strukturen nachvollziehen, Aenderungshistorie verstehen. Nicht gemeint: aktive Entwicklung, Git-Flow oder Pipeline-Integration. Typische Taetigkeiten: Aktuellen Branch-Stand nachvollziehen · Testartefakte abrufen und ablegen · Aenderungen im Repository nachverfolgen«",
          anchors: {
            1: "Weiss, was ein Repository, Branch und Commit sind; hat noch keinen eigenstaendigen Zugriff auf ein VCS.",
            2: "Navigiert im Repository; liest Commit-Historien und Branch-Strukturen; ruft Testartefakte ab und legt sie ab.",
            3: "Klont Repositories eigenstaendig; versteht den aktuellen Entwicklungsstand; ordnet Testaufgaben dem richtigen Branch zu.",
            4: "Nutzt VCS aktiv im Testeinsatz; versteht Branching-Strategien und deren Auswirkung auf den Testprozess.",
            5: "Definiert VCS-Konventionen fuer Testartefakte; integriert VCS-Workflows in den QA-Prozess des Teams.",
          },
        },
        {
          name: "API-Testing (z. B. Postman / REST-assured)",
          dep: "Evolving",
          targetLevel: 3,
          description:
            "»Manuelles und semi-automatisiertes Testen von APIs auf korrekte Antworten, Fehlercodes und Datenintegritaet. Nicht gemeint: vollautomatisierte API-Testsuite oder Performance-Tests. Typische Taetigkeiten: API-Requests erstellen und parametrisieren · Response-Validierung durchfuehren · Testdaten fuer API-Szenarien vorbereiten«",
          anchors: {
            1: "Kennt Grundkonzepte von APIs (z. B. bei REST: HTTP-Methoden, Status Codes); hat noch nicht eigenstaendig API-Tests durchgefuehrt.",
            2: "Fuehrt einfache API-Tests durch; importiert und passt bestehende Testsammlungen an.",
            3: "Erstellt eigenstaendig API-Testsequenzen; validiert Responses auf Korrektheit und Datenqualitaet.",
            4: "Strukturiert API-Testsuiten fuer ganze Schnittstellen; setzt Variablen, Environments und Assertions effizient ein.",
            5: "Entwirft API-Teststrategie; integriert API-Tests in CI/CD-Pipelines oder bewertet Automatisierungsansaetze.",
          },
        },
      ],
    },
    {
      name: "Methodisch",
      skills: [
        {
          name: "Testfallanalyse & Testfalldesign",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Systematisches Ableiten von Testfaellen aus Anforderungen, User Stories und Akzeptanzkriterien. Auswahl geeigneter Testdesigntechniken je nach Komplexitaet und Risiko. Nicht gemeint: Teststrategie auf Programmebene oder Automatisierung. Typische Taetigkeiten: Testbasis analysieren · Testfaelle strukturiert dokumentieren · Testabdeckung sicherstellen und Luecken eskalieren«",
          anchors: {
            1: "Versteht, was ein Testfall ist; kann bestehende Testfaelle ausfuehren, aber noch nicht eigenstaendig erstellen.",
            2: "Erstellt einfache Testfaelle nach Vorlage aus User Stories; benoetigt Unterstuetzung bei komplexeren Szenarien.",
            3: "Leitet Testfaelle eigenstaendig aus Anforderungen ab; waehlt Testdesigntechnik situationsgerecht; bewertet Testabdeckung.",
            4: "Entwirft komplexe Testsuiten fuer mehrere Funktionsbereiche; erkennt fehlende Anforderungen beim Testfalldesign.",
            5: "Definiert Testdesign-Standards fuer das Projekt; mentort Kollegen und validiert Testfallqualitaet auf Teamebene.",
          },
        },
        {
          name: "Exploratives Testen",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Strukturiertes Erkunden von Anwendungsfunktionen ohne vordefinierte Testfaelle — mit dem Ziel, unerwartete Fehler und Grenzfaelle aufzudecken. Nicht gemeint: unstrukturiertes Ausprobieren ohne Zielsetzung. Typische Taetigkeiten: Session-Based Testing durchfuehren · Explorationscharter erstellen · Findings strukturiert dokumentieren und priorisieren«",
          anchors: {
            1: "Testet Funktionen mit einer Zielsetzung ohne dediziert definierte Testfaelle; findet offensichtliche Fehler.",
            2: "Fuehrt exploratives Testen mit groben Zielen durch; dokumentiert Findings, aber wenig strukturiert.",
            3: "Erstellt Explorationscharter mit klarer Zielsetzung; dokumentiert Sessions strukturiert; deckt nicht-offensichtliche Fehler auf.",
            4: "Entwickelt Explorationsstrategie fuer ganze Funktionsbereiche; kombiniert exploratives Testen mit risikobasierter Priorisierung.",
            5: "Praegt explorative Testpraxis im Team; definiert Session-Formate und leitet andere Tester an.",
          },
        },
        {
          name: "Risikobasiertes Testen",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Priorisierung von Testaktivitaeten anhand von Eintrittswahrscheinlichkeit und Schadensausmass identifizierter Risiken. Besonders relevant in regulierten Umgebungen mit beschraenkten Testressourcen und Zeitdruck. Typische Taetigkeiten: Testumfang risikoorientiert begrenzen · Prioritaeten transparent kommunizieren und dokumentieren«",
          anchors: {
            1: "Versteht das Konzept risikobasierter Priorisierung; kann Risiken benennen, aber noch nicht eigenstaendig gewichten.",
            2: "Wendet risikobasierte Priorisierung nach Vorgabe an; benoetigt Unterstuetzung bei der Risikobeurteilung.",
            3: "Begruendet Testpriorisierung eigenstaendig auf Basis von Eintrittswahrscheinlichkeit und Auswirkung.",
            4: "Identifiziert Risiken eigenstaendig; kommuniziert priorisierte Testaktivitaeten proaktiv an Projektleitung und Team.",
            5: "Definiert risikobasierte Teststrategien auf Projektebene; verantwortet Risikokommunikation gegenueber Stakeholdern.",
          },
        },
        {
          name: "Aequivalenzklassen & Grenzwertanalyse",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Systematische Reduktion der Testfallmenge durch Aequivalenzklassenbildung und gezielte Pruefung von Grenzwerten. Grundtechnik fuer effiziente Testabdeckung bei eingeschraenkten Ressourcen. Typische Taetigkeiten: Eingabebereiche klassifizieren · Grenzwerte und Sonderfaelle identifizieren · Testfaelle fuer Positiv- und Negativpfade ableiten«",
          anchors: {
            1: "Kennt die Technik aus der Theorie; kann einfache Klassen benennen, aber noch nicht systematisch anwenden.",
            2: "Wendet Aequivalenzklassen auf einfache Eingabefelder an; identifiziert offensichtliche Grenzwerte.",
            3: "Setzt Aequivalenzklassen und Grenzwertanalyse eigenstaendig fuer komplexere Eingabebereiche ein; begruendet Klassenbildung.",
            4: "Kombiniert Aequivalenzklassen mit anderen Techniken (Entscheidungstabellen, Zustandsdiagramme) fuer umfassende Coverage.",
            5: "Schult andere Tester in der Technik; definiert Klassenbildungsstandards fuer das Projekt.",
          },
        },
        {
          name: "Entwicklungs- & Delivery-Prozesse",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Verstaendnis agiler Entwicklungsprozesse, Release-Zyklen und der Zusammenarbeit zwischen Fachbereich, Entwicklung und QA. Nicht gemeint: agiles Coaching oder Prozessverantwortung. Typische Taetigkeiten: Testaktivitaeten mit Sprint- und Release-Rhythmus abstimmen · QA-Rolle im Entwicklungsprozess kennen und ausfuellen · Software-Lifecycle-Konzepte (Sprint, Definition of Done, Deployment) im Testeinsatz beruecksichtigen«",
          anchors: {
            1: "Kennt grundlegende agile Begriffe (Sprint, Backlog, Release); nimmt noch passiv an Prozessen teil.",
            2: "Versteht Sprint-Ablauf, Release-Zyklen und die Rolle von QA im Entwicklungsprozess.",
            3: "Orientiert sich eigenstaendig im Entwicklungsprozess; stimmt Testaktivitaeten mit Release-Zyklen und Team-Rhythmus ab.",
            4: "Gestaltet QA-Einbindung aktiv mit; erkennt Prozessrisiken frueh und schlaegt Verbesserungen vor.",
            5: "Optimiert Zusammenarbeit zwischen QA, Entwicklung und Fachbereich auf Prozessebene; etabliert QA-Standards im Team.",
          },
        },
        {
          name: "Shift-Left Testing im agilen Prozess",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Fruehzeitige Einbindung von QA-Aktivitaeten in den Entwicklungsprozess: Anforderungsreviews, gemeinsame Definition von Akzeptanzkriterien und fruehzeitige Fehlererkennung vor der Implementierung. Nicht gemeint: technische Testautomatisierung. Typische Taetigkeiten: Sprint Planning mit QA-Perspektive begleiten · Anforderungen auf Testbarkeit pruefen · Definition of Done mitgestalten«",
          anchors: {
            1: "Weiss, was Shift-Left bedeutet; nimmt aber noch passiv an Plannings teil.",
            2: "Meldet Unklarheiten in User Stories; prueft Akzeptanzkriterien auf Vollstaendigkeit nach Aufforderung.",
            3: "Bringt QA-Perspektive eigenstaendig in Refinements und Plannings ein; prueft Anforderungen aktiv auf Testbarkeit.",
            4: "Praegt Definition of Done aus QA-Sicht; etabliert Anforderungsreviews als festen Bestandteil des Teamprozesses.",
            5: "Verankert Shift-Left-Kultur im gesamten Team; misst und verbessert Fehlererkennungsrate in fruehen Phasen.",
          },
        },
        {
          name: "Integrations- & E2E-Test",
          dep: "Evolving",
          targetLevel: 3,
          keySkill: true,
          trend: "steigend",
          description:
            "»Systemuebergreifende Absicherung verteilter Versicherungslandschaften: Kernsysteme, Portale, Partner, Zahlungs-, Dokumenten-, Schaden- und Vertriebsschnittstellen. Nicht gemeint: isolierte manuelle API-Tests (siehe API-Testing). Typische Taetigkeiten: Integrations- und E2E-Szenarien ueber mehrere Systeme planen und durchfuehren · systemische Risiken und Datenfluesse pruefen · Schnittstellenfehler reproduzierbar dokumentieren«",
          anchors: {
            1: "Testet einzelne Schnittstellen nach Vorgabe.",
            2: "Versteht einfache Request/Response-Logik und Testdatenabhaengigkeiten.",
            3: "Plant und testet Integrations- und E2E-Szenarien ueber mehrere Systeme.",
            4: "Erkennt systemische Risiken, Datenbrueche, Prozessabbrueche und Abhaengigkeiten.",
            5: "Definiert domaenenweite E2E-Testmodelle fuer komplexe Versicherungsarchitekturen.",
          },
        },
        {
          name: "Negativtests & Fehlerszenarien",
          dep: "Durable",
          targetLevel: 4,
          description:
            "»Systematisches Aufdecken von Fehlerquellen durch Tests mit ungueltigen, unerwarteten oder fehlerhaften Eingaben und Systemzustaenden. Nicht gemeint: Grenzwertanalyse (siehe Aequivalenzklassen & Grenzwertanalyse). Typische Taetigkeiten: Negativszenarien aus Anforderungen ableiten · Fehlermeldungen auf Korrektheit und Verstaendlichkeit pruefen · Verhalten bei Systemausfaellen und Fehlerbehandlung testen«",
          anchors: {
            1: "Testet hauptsaechlich Happy Paths; Negativfaelle werden selten oder unsystematisch geprueft.",
            2: "Prueft offensichtliche Negativfaelle (leere Felder, ungueltiges Format, fehlende Pflichtangaben).",
            3: "Leitet Negativszenarien systematisch aus Anforderungen ab; prueft Fehlermeldungen auf Korrektheit und Verstaendlichkeit.",
            4: "Entwirft umfassende Negativtest-Suiten; deckt Fehlerszenarien auf, die im Happy Path nicht sichtbar sind.",
            5: "Praegt Negativtest-Strategie im Team; definiert Standards fuer Fehlerbehandlungsprueflisten.",
          },
        },
        {
          name: "KI-gestuetzte QS & verantwortungsvoller KI-Einsatz",
          dep: "Evolving",
          targetLevel: 3,
          trend: "steigend",
          description:
            "»Nutzung von generativer KI und LLMs zur Analyse von Anforderungen, Ableitung von Testfaellen, Review von Testkonzepten, Risikoregistern und Tickets sowie zur Anomalieerkennung. Gleichzeitig sichere Bewertung von Datenschutz, Halluzinationen, Fairness, Governance und menschlicher Kontrolle. Typische Taetigkeiten: KI strukturiert fuer Testdesign und Dokumentenreview einsetzen · KI-Outputs auf Grenzen, Risiken und Datenschutz bewerten · Prompting-Strategien fuer QA-Aufgaben entwickeln«",
          anchors: {
            1: "Nutzt KI nur mit klaren Vorgaben und prueft Ergebnisse manuell.",
            2: "Formuliert einfache Prompts fuer Testfaelle, Reviews oder Fehleranalyse.",
            3: "Nutzt KI strukturiert fuer Testdesign, Dokumentenreview und Effizienzsteigerung.",
            4: "Bewertet Grenzen, Risiken, Datenschutz, Nachvollziehbarkeit und Qualitaet der KI-Ergebnisse.",
            5: "Entwickelt sichere KI-gestuetzte QS-Methoden, Guidelines und wiederverwendbare Assistenten.",
          },
        },
        {
          name: "Nichtfunktionale Qualitaet (Security, Resilienz, Performance, Accessibility)",
          dep: "Evolving",
          targetLevel: 3,
          trend: "steigend",
          description:
            "»Einbezug nichtfunktionaler Qualitaetsmerkmale in Teststrategie und Testdesign: IT-Sicherheit, Betriebsstabilitaet, Performance, Barrierefreiheit (BFSG), Nutzererlebnis und regulatorische Resilienz (DORA, NIS2). Typische Taetigkeiten: nichtfunktionale Pruefpunkte in Testfaelle integrieren · Abnahmekriterien um Sicherheits- und Performance-Aspekte ergaenzen · Risiken aus allen Qualitaetsdimensionen bewerten«",
          anchors: {
            1: "Kennt grundlegende nichtfunktionale Qualitaetsmerkmale.",
            2: "Fuehrt einfache nichtfunktionale Checks nach Vorgabe aus.",
            3: "Integriert nichtfunktionale Pruefpunkte in Testfaelle und Abnahmekriterien.",
            4: "Bewertet Risiken ueber Fachlichkeit, Technik, Betrieb und Regulatorik hinweg.",
            5: "Entwickelt ganzheitliche Qualitaetsmodelle fuer resiliente und barrierefreie Versicherungs-IT.",
          },
        },
      ],
    },
    {
      name: "Kommunikation & Zusammenarbeit",
      skills: [
        {
          name: "Defektdokumentation & Fehlerkommunikation",
          dep: "Evolving",
          targetLevel: 3,
          description:
            "»Strukturiertes Erfassen, Dokumentieren und Kommunizieren von Defekten: praezise Beschreibung mit Steps to reproduce, Expected vs. Actual, Schweregrad und Prioritaet — und klare Rueckmeldung an Entwickler. Umfasst sowohl die Qualitaet der Dokumentation als auch den Defekt-Lebenszyklus im Ticketsystem (z. B. Jira). Nicht gemeint: Stakeholder-Statusberichte oder Tool-Administration. Typische Taetigkeiten: Bugs vollstaendig und reproduzierbar dokumentieren · Schweregrad und Prioritaet begruenden · Defektlebenszyklus nachverfolgen · Rueckfragen von Entwicklern klar beantworten«",
          anchors: {
            1: "Meldet Fehler muendlich oder in unvollstaendigen Texten; Tickets oft lueckenhaft.",
            2: "Erstellt strukturierte Bug-Tickets mit Steps to reproduce und Expected/Actual; setzt Schweregrad nach Vorgabe.",
            3: "Verfasst vollstaendige, reproduzierbare Defektberichte; bewertet Schweregrad eigenstaendig; kommuniziert loesungsorientiert mit Entwicklern.",
            4: "Tickets sind Vorbildqualitaet; erkennt Defektmuster; kommuniziert Trends proaktiv ans Team.",
            5: "Definiert Defektdokumentations-Standards; optimiert Defekt-Tracking-Prozesse; schult neue Teammitglieder.",
          },
        },
        {
          name: "Kommunikation mit Entwicklungsteams",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Klare, konstruktive Zusammenarbeit mit Entwicklern zur gemeinsamen Fehlerbehebung und Qualitaetsverbesserung. Nicht gemeint: Fuehrungs- oder Eskalationsverantwortung. Typische Taetigkeiten: Defekte sachlich und loesungsorientiert besprechen · Reproduktionsschritte verstaendlich erklaeren · gemeinsame Testansaetze abstimmen«",
          anchors: {
            1: "Kommuniziert Fehler; Ton oder Inhalt fuehren gelegentlich zu Missverstaendnissen.",
            2: "Beschreibt Defekte verstaendlich; arbeitet auf Nachfrage gut zusammen, aber initiiert selten selbst.",
            3: "Kommuniziert Defekte sachlich, loesungsorientiert und klar; stimmt Testansaetze eigenstaendig mit Entwicklern ab.",
            4: "Foerdert konstruktive QA-Entwickler-Zusammenarbeit; baut Vertrauen durch transparente Kommunikation auf.",
            5: "Gestaltet das Zusammenarbeitsmodell zwischen QA und Entwicklung aktiv; gilt als Brueckenbauer.",
          },
        },
        {
          name: "Requirements-Reviews & Akzeptanzkriterien",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Kritisches Pruefen von User Stories und Anforderungen auf Vollstaendigkeit, Testbarkeit und Widerspruchsfreiheit vor Entwicklungsbeginn — mit dem Ziel, teure Spaetfehler zu vermeiden. Typische Taetigkeiten: Anforderungen auf Testbarkeit bewerten · fehlende Akzeptanzkriterien einfordern · Unklarheiten im Refinement ansprechen und dokumentieren«",
          anchors: {
            1: "Liest Anforderungen, erkennt aber noch nicht systematisch Testbarkeitsluecken.",
            2: "Stellt gezielte Rueckfragen zu unklaren Anforderungen; erkennt fehlende Akzeptanzkriterien auf Hinweis.",
            3: "Prueft Anforderungen eigenstaendig auf Testbarkeit, Vollstaendigkeit und Widerspruchsfreiheit; spricht Luecken proaktiv an.",
            4: "Praegt Refinements durch QA-Perspektive; etabliert Checklisten fuer gute Akzeptanzkriterien im Team.",
            5: "Definiert Requirements-Review-Standards; verantwortet Anforderungsqualitaet aus QA-Sicht auf Projektebene.",
          },
        },
        {
          name: "Qualitaetsverantwortung & Beratungshaltung",
          dep: "Durable",
          targetLevel: 3,
          keySkill: true,
          trend: "steigend",
          description:
            "»Faehigkeit, Qualitaet nicht nur operativ zu pruefen, sondern Verantwortung fuer Qualitaet zu uebernehmen: Risiken ansprechen, Entscheidungen vorbereiten, Kunden beraten, Konflikte moderieren und Qualitaetsbewusstsein im Team staerken. Beratungshaltung statt reiner Ausfuehrung. Typische Taetigkeiten: Qualitaetsrisiken proaktiv kommunizieren · Entscheidungsvorlagen fuer Go/No-Go vorbereiten · Zielkonflikte zwischen Qualitaet und Termin moderieren«",
          anchors: {
            1: "Arbeitet zuverlaessig, dokumentiert sauber und fragt bei Unklarheiten nach.",
            2: "Kommuniziert Risiken, Blocker und Fehler verstaendlich im Team.",
            3: "Uebernimmt Verantwortung fuer ein Testfeld; stimmt sich mit Fachbereich, Entwicklung und Projektleitung eigenstaendig ab.",
            4: "Beraet aktiv, moderiert Zielkonflikte und bereitet belastbare Qualitaetsentscheidungen vor.",
            5: "Praegt Qualitaetskultur, fuehrt schwierige Stakeholder-Situationen und gestaltet organisatorische Qualitaetsstandards.",
          },
        },
        { ...RUMP_VERBAL },
      ],
    },
  ],
};

// =============================================================================
// Test Manager
// =============================================================================

export const testManager: Role = {
  id: "test-manager",
  name: "Test Manager",
  description:
    "Strategisches Testmanagement — Teststrategie entwickeln, Testteams fuehren, Qualitaet auf Programmebene verantworten und Stakeholder sicher berichten.",
  isSpecialization: true,
  categories: [
    {
      name: "Fachlich",
      skills: [
        {
          name: "Testmanagement",
          dep: "Durable",
          targetLevel: 4,
          description:
            "»Planung, Steuerung und Verantwortung fuer Testaktivitaeten auf Projekt- oder Programmebene: Ressourcenmanagement, Team-Koordination, Metriken, Berichtswesen und Testprozessverbesserung. Nicht gemeint: technische Testautomatisierung. Typische Taetigkeiten: Metriken und KPIs definieren und erheben · Ressourcen und Budget planen · Testteam koordinieren und regelmaessig berichten«",
          anchors: {
            1: "Kennt Testmanagement-Grundkonzepte; hat noch keine eigenstaendige Testmanagement-Verantwortung uebernommen.",
            2: "Unterstuetzt bei Testplanung und -reporting; wendet einzelne Testmanagement-Konzepte an.",
            3: "Wendet Testmanagement-Konzepte eigenstaendig an; plant Ressourcen und erstellt KPI-Berichte.",
            4: "Steuert Testteam und Ressourcen eigenstaendig; definiert Metriken und verantwortet QA-Reporting auf Projektebene.",
            5: "Gilt als Testmanagement-Experte; repraesentiert Test-Standards gegenueber Kunden und Fuehrungsebene; etabliert Testmanagement-Governance auf Programmebene.",
          },
        },
        {
          name: "TPI Next / Test Process Improvement",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Kenntnis des TPI Next Reifegradmodells zur Bewertung und Verbesserung von Testprozessen in Organisationen. Nicht gemeint: vollstaendige TPI-Next-Implementierung im Alleingang. Typische Taetigkeiten: Testprozessreifegrad einschaetzen · Verbesserungsbedarfe identifizieren · Massnahmen priorisieren und begleiten«",
          anchors: {
            1: "Kennt den Begriff Testprozessverbesserung; hat noch keine Reifegradmodelle angewendet.",
            2: "Kann einzelne TPI-Next-Schluesselbereiche bewerten; benoetigt Unterstuetzung bei vollstaendiger Bewertung.",
            3: "Bewertet Testprozessreifegrad eigenstaendig; identifiziert prioritaere Verbesserungsfelder und leitet Massnahmen ein.",
            4: "Fuehrt TPI-Next-Assessments durch; praesentiert Ergebnisse an Fuehrungsebene und leitet Roadmaps ab.",
            5: "Verantwortet kontinuierliche Testprozessverbesserung; etabliert TPI-Next als Steuerungsinstrument im Unternehmen.",
          },
        },
        {
          name: "Versicherungs-IT-Architekturen & Systemlandschaften",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Verstaendnis typischer IT-Architekturen in Versicherungsunternehmen: Kernsystemlandschaften (Antrag, Bestand, Schaden), Integrationsarchitekturen und Cloud-Hybrid-Setups. Relevant fuer Teststrategie und Schnittstellentests. Typische Taetigkeiten: Systemlandschaft bei Testplanung beruecksichtigen · Schnittstellenrisiken einschaetzen · Testtiefe je System begruenden«",
          anchors: {
            1: "Kennt grundlegende IT-Architekturen (Frontend, Backend, Datenbank); Versicherungsarchitekturen noch unbekannt.",
            2: "Versteht typische Systemlandschaften auf Ueberblicksebene; kann Systemgrenzen grob beschreiben.",
            3: "Nutzt Architekturwissen eigenstaendig fuer Teststrategie; bewertet Schnittstellenrisiken bei der Testplanung.",
            4: "Kennt konkrete Versicherungskernsysteme (msg.Life, KAIROS, SAP FS-CD); leitet daraus spezifische Testanforderungen ab.",
            5: "Gilt als Architektur-Experte im QA-Kontext; beraet Kunden bei Teststrategien fuer komplexe Systemlandschaften.",
          },
        },
      ],
    },
    {
      name: "Technisch",
      skills: [
        {
          name: "Testmanagement-Tools administrieren",
          dep: "Evolving",
          targetLevel: 3,
          description:
            "»Projektweite Administration von Testmanagement-Tools: Benutzer- und Berechtigungsverwaltung, Workflow-Konfiguration, Integrationen mit Jira und CI/CD-Systemen. Nicht gemeint: einfache Testfallerstellung. Typische Taetigkeiten: Tool-Struktur fuer Projekte einrichten · Berichte und Dashboards fuer Management konfigurieren · Integrationen zu Jira und CI aktivieren«",
          anchors: {
            1: "Nutzt Testmanagement-Tools als Anwender; keine Administrationserfahrung.",
            2: "Konfiguriert grundlegende Projekteinstellungen; richtet Benutzer und Berechtigungen ein.",
            3: "Administriert Tools vollstaendig; konfiguriert Workflows, Berichte und einfache Integrationen.",
            4: "Richtet komplexe Integrationen (Jira, CI/CD) ein; optimiert Tool-Konfiguration fuer grosse Teams.",
            5: "Verantwortet Tool-Strategie auf Programm- oder Projektebene; evaluiert und migriert zwischen Testmanagement-Loesungen.",
          },
        },
        {
          name: "Continuous Testing & CI/CD-Integration",
          dep: "Evolving",
          targetLevel: 3,
          description:
            "»Verankerung von Testaktivitaeten in CI/CD-Pipelines: automatisierte Testausfuehrung bei jedem Build, Quality Gates und Test-Reporting-Integration. Nicht gemeint: eigenhaendige Implementierung der Pipeline. Typische Taetigkeiten: Quality Gates fuer Deployments definieren · Testergebnisse aus Pipelines interpretieren · Continuous Testing als Prozess im Team etablieren«",
          anchors: {
            1: "Weiss, was CI/CD ist; hat noch keine Testergebnisse aus Pipelines ausgewertet.",
            2: "Liest Pipeline-Testergebnisse aus; versteht Quality Gates auf Konzeptebene.",
            3: "Definiert Quality Gates fuer Deployments; interpretiert CI/CD-Testergebnisse und leitet Massnahmen ab.",
            4: "Etabliert Continuous Testing als Teamprozess; stimmt Quality Gates mit Entwicklung und PO ab.",
            5: "Verantwortet Continuous Testing Strategie; optimiert Pipeline-Integration fuer maximalen Qualitaetsgewinn.",
          },
        },
      ],
    },
    {
      name: "Methodisch",
      skills: [
        {
          name: "Teststrategie entwickeln",
          dep: "Durable",
          targetLevel: 5,
          description:
            "»Entwicklung einer projektweiten Teststrategie: Testumfang, Testebenen, Eintrittskriterien, Ausstiegskriterien, Testwerkzeuge und Verantwortlichkeiten. Nicht gemeint: operative Testfallerstellung oder Testkonzept auf Ticketebene. Typische Taetigkeiten: Teststrategie-Dokument erstellen und abstimmen · Strategie an Projektkontext und Risiken anpassen · Testverantwortlichkeiten klaeren«",
          anchors: {
            1: "Versteht den Begriff Teststrategie; hat noch keine erstellt.",
            2: "Unterstuetzt bei der Erstellung einer Teststrategie nach Vorlage.",
            3: "Erstellt eigenstaendig eine Teststrategie fuer ein Projekt; deckt Testebenen, -arten und Verantwortlichkeiten ab.",
            4: "Entwickelt komplexe Teststrategien fuer grosse Releases; stimmt auf Programmebene mit mehreren Teams ab.",
            5: "Verantwortet Test-Strategie fuer das gesamte Programm; passt Strategie adaptiv an Projekterfahrungen an.",
          },
        },
        {
          name: "Testrisikoanalyse & -priorisierung",
          dep: "Durable",
          targetLevel: 4,
          description:
            "»Systematische Identifikation und Bewertung von Testrisiken auf Projektebene: fachliche, technische und regulatorische Risiken. Grundlage fuer risikobasierte Testpriorisierung und Ressourcenallokation. Typische Taetigkeiten: Risikoregister auf Projektebene erstellen · Testprioritaeten begruendet festlegen · Risikoentscheidungen mit Stakeholdern abstimmen«",
          anchors: {
            1: "Kennt das Konzept Testrisikoanalyse; hat es noch nicht eigenstaendig angewendet.",
            2: "Fuehrt einfache Risikoanalysen nach Vorgabe durch; Gewichtung oft unbegruendet.",
            3: "Erstellt Risikoregister eigenstaendig; leitet priorisierte Testaktivitaeten aus Risikobewertung ab.",
            4: "Fuehrt Testrisikoanalyse auf Projektebene durch; stimmt Risikobewertung mit Fachbereich und IT ab.",
            5: "Verantwortet Risikomanagement im QA-Kontext; kommuniziert Risiken auf Fuehrungsebene und begruendet Testentscheidungen.",
          },
        },
        {
          name: "Testplanung & Meilensteinkontrolle",
          dep: "Durable",
          targetLevel: 4,
          description:
            "»Detaillierte Planung von Testphasen mit Meilensteinen, Ressourcenbedarf und Abhaengigkeiten zum Projektplan. Kontinuierliches Monitoring und Anpassen bei Abweichungen. Typische Taetigkeiten: Testphasen mit Meilensteinen und Puffern planen · Fortschritt gegenueber Plan verfolgen · Planabweichungen eskalieren und Massnahmen einleiten«",
          anchors: {
            1: "Versteht Testphasen-Konzept; hat noch keine eigenstaendig geplant.",
            2: "Erstellt einfache Testplaene nach Vorlage; Abhaengigkeiten zum Projektplan werden nicht beruecksichtigt.",
            3: "Plant Testphasen mit Meilensteinen und Ressourcen; verfolgt Fortschritt und eskaliert Abweichungen.",
            4: "Plant Testphasen fuer komplexe Releases mit mehreren Teams; integriert Abhaengigkeiten zum Gesamtprojektplan.",
            5: "Verantwortet Testplannung auf Programmebene; adaptiert Plaene dynamisch bei Projektveraenderungen.",
          },
        },
        {
          name: "Testmetriken, KPIs & Qualitaetskennzahlen",
          dep: "Durable",
          targetLevel: 4,
          description:
            "»Definition und Erhebung relevanter Qualitaetskennzahlen: Defektdichte, Testabdeckung, Fehlerfindungsrate, Escaped Defects. Nutzung zur Steuerung und Verbesserung des Testprozesses. Typische Taetigkeiten: Metriken definieren und erheben · Trends erkennen und interpretieren · KPIs fuer Management-Berichte aufbereiten«",
          anchors: {
            1: "Kennt gaengige Testmetriken; hat sie noch nicht eigenstaendig definiert oder ausgewertet.",
            2: "Erhebt vorgegebene Metriken korrekt; Interpretation und Ableitung von Massnahmen noch unvollstaendig.",
            3: "Definiert, erhebt und interpretiert Testmetriken eigenstaendig; leitet Verbesserungsmassnahmen ab.",
            4: "Gestaltet Metrik-Dashboard fuer Management; nutzt Metriken zur proaktiven Qualitaetssteuerung.",
            5: "Verantwortet Metrik-Framework; benchmarkt Qualitaetskennzahlen mit Industrie-Standards.",
          },
        },
        {
          name: "Release-Readiness bewerten & vertreten",
          dep: "Durable",
          targetLevel: 5,
          description:
            "»Bewertung der Deployment-Reife auf Basis von Testergebnissen, offenen Defekten und Restrisiken — und Vertreten dieser Entscheidung gegenueber Fuehrungsebene und Kunden. Nicht gemeint: rein technische Go/No-Go-Checklisten. Typische Taetigkeiten: Release-Readiness-Bericht erstellen · Go/No-Go-Entscheidung begruendet empfehlen · Restrisiken transparent kommunizieren«",
          anchors: {
            1: "Versteht, was Release-Readiness bedeutet; trifft keine eigenstaendigen Einschaetzungen.",
            2: "Unterstuetzt Release-Readiness-Bewertung; benennt offene Punkte, bewertet Risiken aber noch nicht selbst.",
            3: "Erstellt eigenstaendig Release-Readiness-Berichte; empfiehlt Go/No-Go mit Begruendung.",
            4: "Vertritt Release-Readiness-Einschaetzung gegenueber Stakeholdern; managt Erwartungen bei unklarer Lage.",
            5: "Verantwortet Release-Entscheidung auf Programmebene; kommuniziert Restrisiken klar und gibt fundierte Empfehlungen.",
          },
        },
        {
          name: "Budget- & Ressourcenplanung im Testbereich",
          dep: "Durable",
          targetLevel: 4,
          description:
            "»Schaetzung, Planung und Kontrolle von Budget und Personalressourcen fuer Testaktivitaeten. Begruendete Ressourcenzuteilung auf Basis von Risikoanalyse und Projektplan. Typische Taetigkeiten: Testaufwand schaetzen · Ressourcenbedarf gegenueber Projektleitung vertreten · Budgetverbrauch verfolgen und berichten«",
          anchors: {
            1: "Hat noch keine eigenstaendige Budget- oder Ressourcenplanung durchgefuehrt.",
            2: "Unterstuetzt bei Aufwandschaetzungen; benoetigt Orientierung bei Ressourcenentscheidungen.",
            3: "Schaetzt Testaufwand begruendet; plant Ressourcen fuer einzelne Testphasen eigenstaendig.",
            4: "Plant Budget und Ressourcen fuer das gesamte Testprogramm; vertritt Entscheidungen gegenueber Projektleitung.",
            5: "Verantwortet Testbudget auf Unternehmensebene; optimiert Ressourceneinsatz ueber Projekte hinweg.",
          },
        },
      ],
    },
    {
      name: "Kommunikation & Zusammenarbeit",
      skills: [
        {
          name: "User Akzeptanztest (UAT)",
          dep: "Durable",
          targetLevel: 4,
          description:
            "»Planung und Durchfuehrung von User Acceptance Tests gemeinsam mit Fachbereichen des Kunden — inklusive Testdatenvorbereitung, Moderation und Abnahmeprotokoll. Typische Taetigkeiten: UAT-Sitzungen vorbereiten und moderieren · Fachbereich in Testdurchfuehrung einweisen · Abnahmeentscheidung strukturiert dokumentieren«",
          anchors: {
            1: "Nimmt an UAT-Sitzungen teil; moderiert noch nicht.",
            2: "Bereitet UAT-Unterlagen nach Vorlage vor; moderiert einfache Sitzungen mit Unterstuetzung.",
            3: "Plant und moderiert UAT-Sitzungen eigenstaendig; dokumentiert Abnahmeentscheidungen revisionssicher.",
            4: "Koordiniert UAT fuer ganze Releases; managt Fachbereichserwartungen und eskaliert Blocker strukturiert.",
            5: "Verantwortet UAT-Prozess auf Programmebene; definiert Standards fuer Abnahmedokumentation.",
          },
        },
        {
          name: "Teststatusreporting & Fortschrittsdokumentation",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Regelmaessige, adressatengerechte Kommunikation des Teststatus an Projektleitung und Team: Fortschritt, offene Punkte, Risiken und Resttest-Abschaetzung. Nicht gemeint: strategisches Management-Reporting oder C-Level-Kommunikation (siehe Stakeholder-Management & Executive Reporting). Typische Taetigkeiten: Testfortschritt in Statusberichten aufbereiten · Blocker und Risiken sichtbar machen · Resttest-Abschaetzungen fundiert begruenden«",
          anchors: {
            1: "Gibt Teststatus auf Nachfrage muendlich weiter; keine strukturierten Berichte.",
            2: "Erstellt einfache Statusberichte nach Vorlage; Inhalte sind korrekt aber wenig adressatengerecht.",
            3: "Erstellt eigenstaendig adressatengerechte Statusberichte; kommuniziert Risiken und Blocker proaktiv.",
            4: "Antizipiert Informationsbedarfe der Stakeholder; passt Berichtsformat und -tiefe situationsgerecht an.",
            5: "Verantwortet QA-Reporting auf Projektebene; definiert Reporting-Standards und -frequenz.",
          },
        },
        {
          name: "Abnahme-Protokollierung & Freigabe-Dokumentation",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Revisionssichere Dokumentation von Testergebnissen und Abnahmeentscheidungen — besonders relevant fuer regulierte Kundensysteme im Versicherungsumfeld. Typische Taetigkeiten: Testergebnisse vollstaendig und nachvollziehbar archivieren · Abnahmeprotokoll erstellen · Freigabeentscheidung nachvollziehbar begruenden und dokumentieren«",
          anchors: {
            1: "Dokumentiert Testergebnisse informell; Revisionssicherheit nicht gewaehrleistet.",
            2: "Nutzt vorgegebene Dokumentationsvorlagen korrekt; Vollstaendigkeit gelegentlich lueckenhaft.",
            3: "Erstellt revisionssichere Abnahmeprotokolle eigenstaendig; Dokumentation haelt Audit-Anforderungen stand.",
            4: "Optimiert Dokumentationsprozesse; stellt sicher, dass Freigabeentscheidungen vollstaendig nachvollziehbar sind.",
            5: "Definiert Dokumentationsstandards fuer das Projekt; verantwortet Auditfestigkeit der gesamten Testdokumentation.",
          },
        },
        {
          name: "Team-Koordination & Skill-Entwicklung",
          dep: "Durable",
          targetLevel: 4,
          description:
            "»Operative Fuehrung von Testteams: Aufgabenverteilung, Fortschrittsmonitoring und gezielte Foerderung der Testkompetenzen im Team. Nicht gemeint: disziplinarische Personalfuehrung. Typische Taetigkeiten: Aufgaben situationsgerecht verteilen · Testkompetenzen des Teams beobachten und foerdern · Wissenstransfer im Team sicherstellen«",
          anchors: {
            1: "Arbeitet gut im Team; koordiniert noch keine anderen.",
            2: "Koordiniert kleinere Testgruppen; Foerderung und Feedback noch wenig strukturiert.",
            3: "Koordiniert Testteam eigenstaendig; foerdert Kompetenzen gezielt und gibt regelmaessig Feedback.",
            4: "Entwickelt Testteam strategisch; erkennt Kompetenzluecken frueh und leitet Entwicklungsmassnahmen ein.",
            5: "Fuehrt grosse, verteilte Testteams; praegt Teamkultur und Kompetenzentwicklung auf Programmebene.",
          },
        },
        {
          name: "Stakeholder-Management & Executive Reporting",
          dep: "Durable",
          targetLevel: 5,
          description:
            "»Proaktive Kommunikation mit Kunden und Fuehrungsebene (Management, C-Level): Qualitaetsstatus, Risiken und Empfehlungen strategisch aufbereiten und vertreten. Nicht gemeint: operatives Status-Reporting an Projektleitung oder Team (siehe Teststatusreporting & Fortschrittsdokumentation). Typische Taetigkeiten: Management-Summary zu Testqualitaet erstellen · Risiken und Empfehlungen an Fuehrungsebene kommunizieren · Stakeholder-Erwartungen aktiv managen«",
          anchors: {
            1: "Kommuniziert Teststatus auf Nachfrage; kein eigenstaendiges Stakeholder-Management.",
            2: "Erstellt einfache Statusberichte; passt Kommunikation noch wenig an Zielgruppe an.",
            3: "Erstellt adressatengerechte Managementberichte; informiert Stakeholder proaktiv ueber Qualitaetslage.",
            4: "Managt Stakeholder-Erwartungen aktiv; navigiert Konflikte zwischen Qualitaet und Termindruck.",
            5: "Verantwortet Qualitaetskommunikation auf C-Level; praesentiert Testentscheidungen souveraen und begruendet.",
          },
        },
        {
          name: "Konfliktloesung & Eskalationsmanagement",
          dep: "Durable",
          targetLevel: 4,
          description:
            "»Konstruktiver Umgang mit Konflikten im Testprozess: Qualitaet vs. Termin, QA vs. Entwicklung, Team vs. Kunde. Strukturierte Eskalation, wenn Konflikte die Qualitaet gefaehrden. Typische Taetigkeiten: Interessenkonflikte frueh erkennen · Loesungsoptionen begruendet einbringen · Unloesbare Konflikte transparent und sachlich eskalieren«",
          anchors: {
            1: "Vermeidet Konflikte oder eskaliert sofort; keine eigenstaendige Loesungsfindung.",
            2: "Spricht Konflikte an; Loesungsansaetze meist reaktiv und wenig strukturiert.",
            3: "Erkennt Konflikte frueh; erarbeitet Loesungsoptionen und moderiert Einigung sachlich.",
            4: "Navigiert komplexe Interessenkonflikte zwischen Qualitaet, Termin und Kundenerwartung.",
            5: "Definiert Eskalationsprozesse fuer das Programm; gilt als Konfliktloesungsinstanz auf Fuehrungsebene.",
          },
        },
      ],
    },
  ],
};

// =============================================================================
// Test Automation Engineer
// =============================================================================

export const testAutomation: Role = {
  id: "test-automation",
  name: "Test Automation Engineer",
  description:
    "Automatisierte Tests konzipieren, entwickeln, pflegen und in CI/CD-Pipelines integrieren — mit Fokus auf Wartbarkeit, Stabilitaet und Wertbeitrag fuer das Team.",
  isSpecialization: true,
  categories: [
    {
      name: "Fachlich",
      skills: [
        {
          name: "Versicherungssysteme (Antrag, Bestand, Schaden)",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Verstaendnis typischer Versicherungskernsysteme als Testobjekte: Antragsverwaltung, Bestandssysteme, Schadensabwicklung. Relevant fuer realitaetsnahe Testszenarien und stabile Testdaten. Typische Taetigkeiten: Testdaten fuer Versicherungsprozesse entwerfen · Systemverhalten bei Kernprozessen pruefen · Abhaengigkeiten zwischen Systemen bei Automatisierung beruecksichtigen«",
          anchors: {
            1: "Weiss grob, was Versicherungskernsysteme sind; noch keine Erfahrung als Testobjekt.",
            2: "Testet einfache Versicherungsprozesse nach Anleitung; Systemzusammenhaenge noch wenig bekannt.",
            3: "Entwirft realitaetsnahe Testszenarien fuer Versicherungsprozesse; beruecksichtigt Systemabhaengigkeiten eigenstaendig.",
            4: "Kennt konkrete Kernsysteme tiefgehend; leitet daraus spezifische Automatisierungsstrategien ab.",
            5: "Gilt als Fachdomaenen-Experte fuer Test Automation in Versicherungssystemen.",
          },
        },
        {
          name: "Testarchitektur & Quality Enablement",
          dep: "Durable",
          targetLevel: 4,
          keySkill: true,
          trend: "steigend",
          description:
            "»Faehigkeit, Teststrategie, Testkonzept, Testumgebungen, Testdaten, Testautomatisierung, Werkzeuge, Schnittstellen, Stubs, Mocks, Virtual Services und CI/CD so zusammenzufuehren, dass Tests effizient, wiederholbar und skalierbar durchgefuehrt werden koennen. Typische Taetigkeiten: Test-Pyramide und Automatisierungsumfang begruendet festlegen · Testarchitektur mit Entwicklung abstimmen · Quality-Enablement-Standards fuer Teams definieren«",
          anchors: {
            1: "Nutzt vorhandene Testumgebungen, Testwerkzeuge und Testzugaenge nach Vorgabe.",
            2: "Erkennt Abhaengigkeiten zwischen Testfaellen, Testdaten, Testumgebungen und Schnittstellen.",
            3: "Plant Testzugaenge, Testdaten, Toolnutzung und Automatisierung fuer ein Projekt oder Teilprojekt.",
            4: "Entwirft tragfaehige Testarchitekturen fuer komplexe Systemlandschaften, inklusive Schnittstellen, Testdaten, Mocking und CI/CD.",
            5: "Etabliert Quality-Enablement-Standards, Testarchitektur-Governance und CoC-Strukturen ueber Programme oder Organisationseinheiten hinweg.",
          },
        },
      ],
    },
    {
      name: "Technisch",
      skills: [
        {
          name: "Playwright / Cypress",
          dep: "Evolving",
          targetLevel: 4,
          description:
            "»Entwicklung stabiler UI-End-to-End-Testautomatisierung mit modernen Frameworks (Playwright bevorzugt). Nicht gemeint: Selenium-basierte Automatisierung oder Performance-Testing. Typische Taetigkeiten: E2E-Tests fuer kritische User Flows entwickeln · Flaky Tests identifizieren und stabilisieren · Testsuiten in CI/CD integrieren«",
          anchors: {
            1: "Hat Playwright/Cypress noch nicht eingesetzt.",
            2: "Fuehrt bestehende Tests aus; erstellt einfache Tests nach Vorlage.",
            3: "Entwickelt stabile E2E-Tests eigenstaendig; nutzt Fixtures, Assertions und Selektoren professionell.",
            4: "Entwirft Testarchitektur fuer E2E-Suiten; behebt Flakiness systematisch; integriert in CI/CD.",
            5: "Definiert Best Practices und Standards fuer E2E-Automatisierung; mentort andere in Playwright/Cypress.",
          },
        },
        {
          name: "Selenium WebDriver",
          dep: "Evolving",
          targetLevel: 3,
          description:
            "»Browser-Automatisierung mit Selenium WebDriver fuer Legacy-Projekte oder browseruebergreifende Tests. Nicht gemeint: Selenium Grid Administration oder Performance-Tests. Typische Taetigkeiten: Selenium-Tests schreiben und pflegen · Cross-Browser-Kompatibilitaet sicherstellen · bestehende Selenium-Suiten warten«",
          anchors: {
            1: "Hat Selenium noch nicht eigenstaendig eingesetzt.",
            2: "Fuehrt bestehende Selenium-Tests aus; erstellt einfache Tests nach Anleitung.",
            3: "Entwickelt Selenium-Tests eigenstaendig; nutzt Page Object Model und Wartekondizionen korrekt.",
            4: "Pflegt und refactort grosse Selenium-Suiten; behebt Stabilitaetsprobleme eigenstaendig.",
            5: "Migriert Selenium-Suiten auf moderne Frameworks; beraet bei Technologiewechsel.",
          },
        },
        {
          name: "REST-API-Testautomatisierung",
          dep: "Evolving",
          targetLevel: 4,
          description:
            "»Automatisierte API-Tests fuer verschiedene API-Typen (z. B. REST, gRPC) mit Tools wie REST-assured, Supertest oder Playwright API-Testing. Nicht gemeint: manuelle API-Tests. Typische Taetigkeiten: API-Testsuiten entwickeln · Response-Validierung automatisieren · API-Tests in CI/CD-Pipeline integrieren«",
          anchors: {
            1: "Kennt REST-Grundkonzepte; noch keine automatisierten API-Tests entwickelt.",
            2: "Schreibt einfache automatisierte API-Tests nach Vorlage.",
            3: "Entwickelt API-Testsuiten eigenstaendig; validiert Status Codes, Response Bodies und Schemas automatisiert.",
            4: "Entwirft umfassende API-Teststrategien; integriert Contract Testing und Schema-Validierung.",
            5: "Definiert API-Teststandards; beraet bei API-First-Entwicklung aus Testperspektive.",
          },
        },
        {
          name: "JavaScript / TypeScript fuer Testautomatisierung",
          dep: "Durable",
          targetLevel: 4,
          description:
            "»Solide Programmierkenntnisse in JavaScript/TypeScript als Basis fuer moderne Testautomatisierung (Playwright, Cypress, Jest). Nicht gemeint: Frontend-Entwicklung oder Node.js-Backend-Entwicklung. Typische Taetigkeiten: Testcode sauber und wartbar schreiben · Hilfsfunktionen und Fixtures entwickeln · Code Reviews fuer Testautomatisierung durchfuehren«",
          anchors: {
            1: "Grundlegende JS-Kenntnisse; TypeScript noch nicht verwendet.",
            2: "Schreibt einfachen TypeScript-Testcode nach Vorlage; Typen und Interfaces noch unvertraut.",
            3: "Entwickelt wartbaren TypeScript-Testcode eigenstaendig; nutzt Typen, Interfaces und Async/Await sicher.",
            4: "Schreibt professionellen, wartbaren Testcode nach Clean-Code-Prinzipien; fuehrt Code Reviews durch.",
            5: "Definiert Coding-Standards fuer Testautomatisierung; mentort andere in TypeScript-Testentwicklung.",
          },
        },
        {
          name: "Java / Python fuer Testautomatisierung",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Testautomatisierung in Java (REST-assured, JUnit, TestNG) oder Python (pytest, requests) fuer Projekte ausserhalb des JavaScript-Oekosystems. Nicht gemeint: Backend-Entwicklung. Typische Taetigkeiten: Bestehende Java/Python-Testsuiten pflegen · einfache Tests erweitetrn · Testcode reviewen«",
          anchors: {
            1: "Grundlegende OOP-Kenntnisse; Java oder Python fuer Tests noch nicht eingesetzt.",
            2: "Erweitert bestehende Java/Python-Tests nach Vorlage.",
            3: "Entwickelt eigenstaendig Tests in Java oder Python; kennt gaengige Frameworks (JUnit, pytest).",
            4: "Pflegt und refactort komplexe Testsuiten; fuehrt Code Reviews in Java/Python durch.",
            5: "Entscheidet ueber Sprach- und Framework-Wahl; mentort in Java/Python-Testentwicklung.",
          },
        },
        {
          name: "Jenkins / GitHub Actions / GitLab CI",
          dep: "Evolving",
          targetLevel: 3,
          description:
            "»Integration von automatisierten Tests in CI/CD-Pipelines: Testausfuehrung bei jedem Build, Quality Gates und Test-Reporting. Nicht gemeint: vollstaendige DevOps-Pipeline-Entwicklung. Typische Taetigkeiten: Tests in Pipeline-Konfiguration einbinden · Testergebnisse aus Pipeline-Artefakten auswerten · Quality Gates fuer Deployments konfigurieren«",
          anchors: {
            1: "Weiss, was eine CI/CD-Pipeline ist; hat noch keine Tests darin integriert.",
            2: "Fuehrt bestehende Pipeline-Konfigurationen aus; versteht Grundaufbau.",
            3: "Integriert Tests eigenstaendig in Pipelines; konfiguriert Quality Gates und Reporting.",
            4: "Optimiert Pipeline-Performance; konfiguriert Parallelausfuehrung und selektive Testlaeufe.",
            5: "Verantwortet CI/CD-Integration der gesamten Test-Automation; beraet bei Pipeline-Architektur.",
          },
        },
        {
          name: "Docker & Container-Testing",
          dep: "Evolving",
          targetLevel: 3,
          description:
            "»Nutzung von Docker fuer reproduzierbare Testumgebungen und isolierte Testausfuehrung. Nicht gemeint: Kubernetes-Administration oder komplexe Orchestrierung. Typische Taetigkeiten: Testumgebungen als Docker-Container definieren · Integrationstests gegen containerisierte Services ausfuehren · Docker Compose fuer lokale Testinfrastruktur einsetzen«",
          anchors: {
            1: "Weiss, was Docker ist; noch keine Testumgebungen damit aufgesetzt.",
            2: "Startet vorhandene Docker-Umgebungen; versteht Grundkonzepte (Image, Container, Volume).",
            3: "Erstellt eigenstaendig Docker-Konfigurationen fuer Testumgebungen; nutzt Docker Compose fuer Integrationstests.",
            4: "Optimiert containerisierte Testinfrastruktur; reduziert Startup-Zeiten und verbessert Isolation.",
            5: "Entwirft skalierbare Container-Test-Infrastruktur; integriert Container-Tests in Enterprise-CI/CD.",
          },
        },
        {
          name: "Test-Reporting (Allure / ExtentReports)",
          dep: "Evolving",
          targetLevel: 3,
          description:
            "»Erstellung aussagekraeftiger Testberichte fuer verschiedene Zielgruppen: technische Details fuer Entwickler, Zusammenfassungen fuer Management. Nicht gemeint: manuelle Berichtserstellung. Typische Taetigkeiten: Reporting-Framework in Automatisierung integrieren · Berichte anpassen und verteilen · Testergebnisse fuer Stakeholder aufbereiten«",
          anchors: {
            1: "Liest generierte Berichte; hat noch kein Reporting-Framework selbst integriert.",
            2: "Integriert vorhandene Reporting-Konfiguration; passt einfache Einstellungen an.",
            3: "Integriert Allure/ExtentReports eigenstaendig; konfiguriert Berichte fuer verschiedene Zielgruppen.",
            4: "Erstellt Custom-Reports; integriert Reporting in CI/CD-Dashboards.",
            5: "Definiert Reporting-Standards fuer das Programm; evaluiert und einfuehrt neue Reporting-Loesungen.",
          },
        },
      ],
    },
    {
      name: "Methodisch",
      skills: [
        {
          name: "BDD / Cucumber / Gherkin",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Behaviour-Driven Development als Kommunikationsbruecke zwischen Business und Technik: Testszenarien in Gherkin (Given/When/Then) formulieren und mit Cucumber oder aequivalenten Frameworks implementieren. Typische Taetigkeiten: Gherkin-Szenarien aus Akzeptanzkriterien schreiben · Step Definitions implementieren · BDD-Prozess mit Product Owner und BA abstimmen«",
          anchors: {
            1: "Kennt BDD-Konzept; hat noch keine Gherkin-Szenarien geschrieben.",
            2: "Schreibt einfache Gherkin-Szenarien nach Vorlage; Step Definitions noch mit Hilfe.",
            3: "Formuliert aussagekraeftige Gherkin-Szenarien eigenstaendig; implementiert Step Definitions sauber.",
            4: "Etabliert BDD-Prozess im Team; schult PO und BA in Gherkin-Formulierung.",
            5: "Verantwortet BDD-Strategie; definiert Feature-File-Standards und Living Documentation.",
          },
        },
        {
          name: "Page Object Model & Test-Design-Patterns",
          dep: "Durable",
          targetLevel: 4,
          description:
            "»Anwendung bewaehrter Design-Patterns fuer wartbare Testautomatisierung: Page Object Model, Screen Play Pattern, Builder fuer Testdaten. Nicht gemeint: allgemeine Software-Architektur-Patterns. Typische Taetigkeiten: Page Objects fuer Anwendungsseiten erstellen · Test-Code nach Separation-of-Concerns strukturieren · bestehenden Code refactorn«",
          anchors: {
            1: "Weiss, was Page Object Model ist; hat es noch nicht eigenstaendig angewendet.",
            2: "Erweitert bestehende Page Objects; versteht das Trennung-von-Belangen-Prinzip.",
            3: "Entwirft eigenstaendig Page Objects und Test-Suiten nach Design-Patterns; Code ist wartbar und lesbar.",
            4: "Refactort komplexe Test-Codebasen; fuehrt Pattern-Reviews durch; waehlt Patterns situationsgerecht.",
            5: "Definiert Test-Architektur-Standards; mentort in Test-Design-Patterns; evaluiert neue Patterns.",
          },
        },
        {
          name: "KI-gestuetzte Testautomatisierung & verantwortungsvoller Einsatz",
          dep: "Evolving",
          targetLevel: 3,
          trend: "steigend",
          description:
            "»Nutzung von KI und LLMs zur Beschleunigung der Testautomatisierung: Code-Generierung, Testfall-Ableitung, Anomalieerkennung. Gleichzeitig sichere Bewertung von Datenschutz, Halluzinationen, Wartbarkeit und Governance — kein unkritisches Uebernehmen von KI-Output. Typische Taetigkeiten: KI-generierten Testcode auf Korrektheit und Wartbarkeit pruefen · Prompting-Strategien fuer Testautomatisierung entwickeln · KI-Tools auf Datenschutz- und Qualitaetsgrenzen bewerten«",
          anchors: {
            1: "Nutzt KI fuer Testautomatisierung nur mit klaren Vorgaben und prueft Ergebnisse manuell.",
            2: "Formuliert einfache Prompts fuer Code-Generierung oder Testfall-Vorschlaege.",
            3: "Setzt KI-Tools eigenstaendig und kritisch ein; bewertet Qualitaet und Wartbarkeit von KI-generiertem Code.",
            4: "Bewertet Grenzen, Risiken, Datenschutz und Nachvollziehbarkeit der KI-Outputs; schult andere.",
            5: "Entwickelt sichere KI-gestuetzte Automatisierungsstrategien; definiert Qualitaetsstandards und Guidelines.",
          },
        },
      ],
    },
    {
      name: "Kommunikation & Zusammenarbeit",
      skills: [
        {
          name: "Code Reviews & Automatisierungsqualitaet",
          dep: "Durable",
          targetLevel: 3,
          description:
            "»Kritisches Pruefen von Testautomatisierungscode auf Wartbarkeit, Stabilitaet und Lesbarkeit. Konstruktives Feedback im Pull-Request-Prozess. Nicht gemeint: funktionale Code-Reviews von Produktionscode. Typische Taetigkeiten: Test-Code-Reviews durchfuehren · Feedback klar und konstruktiv formulieren · Automatisierungsstandards im Team vertreten«",
          anchors: {
            1: "Nimmt an Code Reviews teil; gibt noch kein eigenstaendiges strukturiertes Feedback.",
            2: "Gibt einfaches Feedback zu offensichtlichen Problemen; Kommentare nicht immer konstruktiv.",
            3: "Fuehrt Code Reviews strukturiert durch; Feedback ist klar, begruendet und konstruktiv.",
            4: "Praegt Automatisierungsqualitaet durch Reviews; etabliert Reviewstandards im Team.",
            5: "Verantwortet Code-Qualitaet der Testautomatisierung; definiert Reviewprozesse und -checklisten.",
          },
        },
      ],
    },
  ],
};

// =============================================================================
// Data Science Consultant
// =============================================================================

export const dataScienceConsultant: Role = {
  id: "data-science-consultant",
  name: "Data Science Consultant",
  description:
    "Setzt in Kundenprojekten hands-on Data-Analytics-, ML- und LLM-Loesungen um und begleitet Projekte von der Idee bis zum Livegang — von Ideation und Daten- und KI-Roadmap ueber Anforderungen und Umsetzung bis zu Abnahme und Uebergabe in den Betrieb, in enger Abstimmung mit Data Engineering, Data Science und Fachbereichen im Versicherungsumfeld. Entwurf (Okt. 2026) auf Basis der Stellenausschreibung, noch nicht mit der Gruppe validiert.",
  categories: [
    {
      name: "Fachlich",
      skills: [
        {
          name: "Daten- & KI-Roadmaps aus Business-Zielen",
          dep: "Evolving",
          targetLevel: 4,
          keySkill: true,
          trend: "stark steigend",
          trendgrund: "Versicherer wollen datengetriebene Geschaeftsmodelle und KI gezielt einsetzen — ohne Roadmap bleiben Datenprojekte Einzelloesungen.",
          description:
            "»Business-Ziele von Kunden in umsetzbare Daten- und KI-Roadmaps uebersetzen und Kunden bei der Umsetzung datengetriebener Geschaeftsmodelle begleiten: Welche Daten liegen vor, welchen Wert koennen sie stiften, und in welcher Reihenfolge lohnt sich die Umsetzung. Nicht gemeint: die technische Umsetzung der Datenplattform durch Data Engineering. Typische Taetigkeiten: Business-Ziele und Datenpotenziale gemeinsam mit dem Kunden erfassen · Vorhaben nach Nutzen, Aufwand und Reife priorisieren · Roadmap mit Meilensteinen ableiten und abstimmen«",
          anchors: {
            1: "Kennt die Bausteine einer Daten- und KI-Roadmap (Ziele, Datenbestaende, Vorhaben, Meilensteine) dem Namen nach.",
            2: "Erklaert, wie Daten in Geschaeftsprozessen entstehen und genutzt werden und wo typische Potenziale fuer datengetriebene Geschaeftsmodelle liegen.",
            3: "Leitet fuer ein abgegrenztes Ziel eigenstaendig Datenpotenziale und konkrete Vorhaben ab.",
            4: "Uebersetzt Business-Ziele bereichsuebergreifend in eine priorisierte, tragfaehige Daten- und KI-Roadmap.",
            5: "Gestaltet Daten- und KI-Strategien auf Kundenebene mit; gilt als strategischer Sparringspartner fuer datengetriebene Geschaeftsmodelle.",
          },
        },
        {
          name: "Bewertung von AI- & ML-Potenzialen",
          dep: "Perishable",
          targetLevel: 4,
          trend: "stark steigend",
          trendgrund: "Kunden fragen zunehmend, wo KI sich lohnt — die Bewertung von Use Cases entscheidet ueber Erfolg und Risiko von KI-Vorhaben.",
          description:
            "»AI- und ML-Anwendungsfaelle identifizieren und nach Nutzen, Machbarkeit, Datenlage, Aufwand und Risiko bewerten — von klassischem ML bis zu LLMs und generativer KI. Nicht gemeint: die eigene Nutzung von KI-Tools im Arbeitsalltag (siehe Digitale Anwendungskompetenz und KI-Tools in der Datenarbeit). Typische Taetigkeiten: Use Cases mit Fachbereichen sammeln und strukturieren · Datenverfuegbarkeit fuer einen Use Case einschaetzen · Business Case und Risiken (z. B. EU AI Act) fuer KI-Vorhaben bewerten«",
          anchors: {
            1: "Kennt typische AI- und ML-Anwendungsfelder in der Versicherungsbranche.",
            2: "Erklaert, welche Voraussetzungen (Daten, Prozesse, Ziele) ein AI/ML-Use-Case braucht.",
            3: "Bewertet einzelne Use Cases eigenstaendig nach Nutzen, Machbarkeit und Datenlage.",
            4: "Priorisiert mehrere AI/ML-Use-Cases inkl. Business Case und Risikoeinschaetzung; beraet Entscheider fundiert.",
            5: "Entwickelt Bewertungsmethoden und Vorgehen fuer AI/ML-Potenzialanalysen; gilt als Ansprechpartner fuer KI-Strategie.",
          },
        },
        {
          name: "Statistik & Machine-Learning-Methoden",
          dep: "Durable",
          targetLevel: 4,
          trend: "steigend",
          trendgrund: "Methodisches Verstaendnis bleibt auch bei automatisierten ML-Werkzeugen die Grundlage fuer belastbare Ergebnisse.",
          description:
            "»Fundiertes Methodenwissen in Statistik und Machine Learning: beschreibende und schliessende Statistik, Hypothesenpruefung, ueberwachtes und unueberwachtes Lernen, Grundlagen von Deep Learning und Sprachmodellen sowie Kennzahlen zur Modellguete. Nicht gemeint: die praktische Umsetzung von Modellen in Code (siehe Technisch). Typische Taetigkeiten: Passendes Verfahren fuer eine Fragestellung auswaehlen · Hypothesen statistisch pruefen · Modellguete und Signifikanz von Ergebnissen beurteilen«",
          anchors: {
            1: "Kennt statistische Grundbegriffe und die wichtigsten ML-Verfahren dem Namen nach.",
            2: "Erklaert, wie gaengige Verfahren (z. B. Regression, Klassifikation, Clustering) funktionieren und wofuer sie sich eignen.",
            3: "Waehlt fuer eine Fragestellung ein passendes Verfahren aus, prueft Hypothesen und interpretiert Ergebnisse und Guetemasse korrekt.",
            4: "Beurteilt Verfahren kritisch nach Annahmen, Datenlage, Bias und Erklaerbarkeit; erkennt methodische Fehler in Analysen anderer.",
            5: "Entwickelt methodische Standards fuer den Bereich; gilt als Referenz fuer statistische und ML-Fragen.",
          },
        },
        {
          name: "Datenarchitektur-Konzepte",
          dep: "Evolving",
          targetLevel: 2,
          trend: "steigend",
          trendgrund: "Data Warehouse, Data Lake und Lakehouse wachsen in Cloud-Umgebungen zusammen — Grundverstaendnis erleichtert die Abstimmung mit Data Engineering.",
          description:
            "»Konzeptionelles Verstaendnis von Datenarchitekturen (z. B. Data Warehouse, Data Lake, Lakehouse), Schichtenmodellen und Datenfluessen, um sich mit Data Engineering und IT-Architektur fundiert abzustimmen. Nicht gemeint: Entwurf, Aufbau und Betrieb der Plattform selbst. Typische Taetigkeiten: Herkunft und Weg von Daten in der Kundenlandschaft nachvollziehen · Anforderungen an Datenhaltung und Datenfluesse formulieren · Architekturentscheidungen auf Auswirkungen fuer Analyse und KI pruefen«",
          anchors: {
            1: "Kennt gaengige Architekturbegriffe wie Data Warehouse, Data Lake und ETL.",
            2: "Erklaert Unterschiede zwischen Architekturmustern und deren typische Einsatzzwecke.",
            3: "Beschreibt fuer einen Anwendungsfall eigenstaendig die Anforderungen an eine passende Zielarchitektur.",
            4: "Bewertet Architekturvarianten nach Skalierbarkeit, Kosten und Governance; beraet aus Datensicht.",
            5: "Diskutiert mit Architekt:innen auf Augenhoehe ueber die Weiterentwicklung der Datenlandschaft.",
          },
        },
        {
          name: "Versicherungsfachlichkeit & Datenlandschaft",
          dep: "Durable",
          targetLevel: 3,
          trend: "steigend",
          trendgrund: "Ohne Fachverstaendnis lassen sich Daten und KI-Ergebnisse nicht sinnvoll interpretieren.",
          description:
            "»Kenntnis der Kernprozesse im Versicherungs- und Finanzumfeld (Antrag, Bestand, Schaden), der dabei entstehenden Daten und typischer Kennzahlen sowie der gewachsenen Systemlandschaften bei Versicherern. Nicht gemeint: aktuarielle Berechnungen. Typische Taetigkeiten: Daten den fachlichen Prozessen zuordnen · Fachliche Plausibilitaet von Auswertungen pruefen · Kennzahlen mit Domaenenexpert:innen abstimmen«",
          anchors: {
            1: "Kennt die Kernprozesse Antrag, Bestand und Schaden in Grundzuegen.",
            2: "Erklaert, welche Daten in den Kernprozessen entstehen und in welchen Systemen sie typischerweise liegen.",
            3: "Ordnet Daten und Kennzahlen eigenstaendig fachlich ein und prueft Auswertungen auf fachliche Plausibilitaet.",
            4: "Erkennt fachliche Zusammenhaenge ueber Sparten und Systeme hinweg und leitet daraus Analysefragen ab.",
            5: "Gilt als Experte fuer Versicherungsdaten; beraet Fachbereiche zu datenbasierten Steuerungsfragen.",
          },
        },
        {
          name: "Datenschutz & Regulatorik fuer Daten und KI",
          dep: "Evolving",
          targetLevel: 3,
          trend: "stark steigend",
          trendgrund: "EU AI Act, DSGVO und aufsichtsrechtliche Vorgaben (z. B. DORA) stellen neue Anforderungen an Datennutzung und KI-Loesungen.",
          description:
            "»Kenntnis der rechtlichen und regulatorischen Rahmenbedingungen fuer Datennutzung und KI (DSGVO, EU AI Act, aufsichtsrechtliche Vorgaben fuer Versicherer) und ihrer Auswirkungen auf Datenprojekte. Nicht gemeint: Rechtsberatung und die technische Umsetzung von Guardrails (siehe LLM- & GenAI-Loesungen). Typische Taetigkeiten: Zulaessigkeit einer Datennutzung einschaetzen und mit Datenschutz abstimmen · Risikoklasse eines KI-Systems nach EU AI Act einordnen · Anforderungen an Dokumentation und Nachvollziehbarkeit beruecksichtigen«",
          anchors: {
            1: "Kennt DSGVO und EU AI Act dem Namen nach und weiss, dass sie Datenprojekte betreffen.",
            2: "Erklaert die fuer Datenprojekte wichtigsten Grundsaetze (z. B. Zweckbindung, Datenminimierung, Risikoklassen).",
            3: "Prueft eigene Vorhaben auf regulatorische Anforderungen und bindet Datenschutz und Compliance rechtzeitig ein.",
            4: "Bewertet regulatorische Risiken von Daten- und KI-Vorhaben und leitet konkrete Massnahmen ab.",
            5: "Entwickelt Leitlinien fuer regelkonforme Daten- und KI-Projekte; beraet Kunden und Team.",
          },
        },
        { ...RUMP_DIGITALE_V2, targetLevel: 4, trend: "stark steigend" },
      ],
    },
    {
      name: "Technisch",
      skills: [
        {
          name: "LLM- & GenAI-Loesungen",
          dep: "Perishable",
          targetLevel: 3,
          keySkill: true,
          trend: "stark steigend",
          trendgrund: "LLM-basierte Loesungen wandern bei Versicherern vom Experiment in produktive Anwendungsfaelle; Methoden und Werkzeuge aendern sich schnell.",
          description:
            "»Loesungen auf Basis von LLMs und generativer KI operativ umsetzen: Prompt-Design (z. B. Prompt-Strategien, System-Prompts), Evaluierung der Ergebnisqualitaet, Entwicklung von Guardrails (Bias, Safety, Policy) und Integration in produktive Anwendungsfaelle. Nicht gemeint: die eigene Nutzung von KI-Tools im Arbeitsalltag (siehe KI-Tools in der Datenarbeit) und das Training eigener Sprachmodelle. Typische Taetigkeiten: System-Prompts und Prompt-Strategien fuer einen Anwendungsfall entwerfen · Ergebnisse mit Testdaten und Metriken systematisch evaluieren · Guardrails definieren und mit der Entwicklung in die Anwendung integrieren«",
          anchors: {
            1: "Kennt Grundbegriffe von LLMs und generativer KI (z. B. Prompt, Kontext, Halluzination).",
            2: "Entwirft Prompts fuer einfache Anwendungsfaelle und prueft Ergebnisse stichprobenartig.",
            3: "Setzt einen LLM-Anwendungsfall eigenstaendig um: Prompt-Design, systematische Evaluierung und grundlegende Guardrails.",
            4: "Entwickelt robuste LLM-Loesungen fuer komplexe Anwendungsfaelle inkl. Bias-, Safety- und Policy-Guardrails und begleitet die Integration in den Betrieb.",
            5: "Definiert Standards fuer Entwicklung, Evaluierung und Absicherung von GenAI-Loesungen; beraet bei anspruchsvollen Vorhaben.",
          },
        },
        {
          name: "ML-Modellentwicklung & -bereitstellung",
          dep: "Perishable",
          targetLevel: 3,
          trend: "stark steigend",
          trendgrund: "Neben klassischem ML gewinnen der Einsatz vortrainierter Modelle und der Betrieb (MLOps) schnell an Bedeutung.",
          description:
            "»Machine-Learning-Modelle praktisch entwickeln, trainieren, evaluieren und fuer den Einsatz vorbereiten — einschliesslich der Nutzung vortrainierter Modelle und Grundlagen des Modellbetriebs (MLOps). Nicht gemeint: das Methodenwissen selbst (siehe Fachlich) und LLM-basierte Loesungen (siehe LLM- & GenAI-Loesungen). Typische Taetigkeiten: Features aufbereiten und Modelle trainieren · Modelle mit geeigneten Metriken evaluieren und vergleichen · Modelle dokumentieren und an die Entwicklung uebergeben«",
          anchors: {
            1: "Trainiert einfache Modelle nach Anleitung mit Standardbibliotheken.",
            2: "Entwickelt und evaluiert einfache Modelle fuer klar umrissene Fragestellungen eigenstaendig.",
            3: "Setzt ML-Projekte von der Datenaufbereitung bis zur evaluierten, dokumentierten Loesung um.",
            4: "Entwickelt robuste Modelle fuer komplexe Fragestellungen; plant Uebergabe, Monitoring und Nachtraining mit.",
            5: "Definiert Standards fuer Modellentwicklung und -betrieb im Bereich; beraet bei anspruchsvollen Modellierungsfragen.",
          },
        },
        {
          name: "Programmierung fuer Datenanalyse",
          dep: "Evolving",
          targetLevel: 4,
          keySkill: true,
          trend: "stabil",
          trendgrund: "Python bleibt Standard in Data Science; KI-Assistenten beschleunigen das Schreiben, ersetzen aber nicht das Verstaendnis des Codes.",
          description:
            "»Datenanalysen, Auswertungen und Modelle in einer Programmiersprache umsetzen (z. B. Python mit pandas, scikit-learn; vergleichbar R) — sauber, nachvollziehbar und wiederverwendbar. Nicht gemeint: Anwendungsentwicklung oder Softwarearchitektur. Typische Taetigkeiten: Analyse-Notebooks und Skripte schreiben · Wiederverwendbare Funktionen fuer das Team bereitstellen · Code versionieren und reviewen«",
          anchors: {
            1: "Liest einfache Skripte und passt sie mit Unterstuetzung an.",
            2: "Schreibt eigenstaendig einfache Auswertungen mit gaengigen Bibliotheken.",
            3: "Setzt Analysen und Modelle sicher um; strukturiert Code nachvollziehbar und versioniert ihn.",
            4: "Entwickelt wiederverwendbare, getestete Analysebausteine; reviewt Code anderer und verbessert dessen Qualitaet.",
            5: "Definiert Coding-Standards und Projektstrukturen fuer den Bereich; ist Anlaufstelle bei schwierigen Umsetzungsfragen.",
          },
        },
        {
          name: "SQL & Datenbankabfragen",
          dep: "Durable",
          targetLevel: 4,
          trend: "stabil",
          trendgrund: "SQL bleibt die gemeinsame Sprache fuer Datenzugriff ueber alle Plattformen hinweg.",
          description:
            "»Daten aus relationalen Datenbanken und Cloud-Data-Warehouses mit SQL abfragen, verknuepfen und aggregieren — auch in grossen und historisch gewachsenen Datenbestaenden. Nicht gemeint: Datenbankadministration. Typische Taetigkeiten: Komplexe Abfragen mit Joins, Window Functions und CTEs schreiben · Abfragen auf Performance pruefen · Views fuer Auswertungen bereitstellen«",
          anchors: {
            1: "Schreibt einfache Abfragen auf einzelne Tabellen mit Unterstuetzung.",
            2: "Verknuepft mehrere Tabellen und aggregiert Daten eigenstaendig.",
            3: "Schreibt komplexe Abfragen (z. B. Window Functions, CTEs) sicher und korrekt.",
            4: "Optimiert Abfragen fuer grosse Datenmengen; stellt wiederverwendbare Views fuer Auswertungen bereit.",
            5: "Setzt Standards fuer Datenzugriff und Abfragequalitaet; beraet andere bei schwierigen Datenfragen.",
          },
        },
        {
          name: "Datenaufbereitung & -integration",
          dep: "Evolving",
          targetLevel: 4,
          trend: "steigend",
          trendgrund: "Daten aus Altsystemen, Cloud und Fachanwendungen muessen zusammengefuehrt werden — die Aufbereitung bleibt der groesste Aufwandstreiber.",
          description:
            "»Daten aus verschiedenen Quellsystemen extrahieren, bereinigen, transformieren und zusammenfuehren (ETL/ELT), sodass sie fuer Analyse und Modelle nutzbar sind. Nicht gemeint: Aufbau und Betrieb produktiver Datenpipelines durch Data Engineering. Typische Taetigkeiten: Daten aus komplexen Systemlandschaften zusammenfuehren · Fehlende, doppelte und widerspruechliche Daten bereinigen · Transformationsschritte dokumentieren und reproduzierbar machen«",
          anchors: {
            1: "Bereitet einzelne, gut strukturierte Datensaetze mit Anleitung auf.",
            2: "Bereinigt und transformiert Daten aus einer Quelle eigenstaendig.",
            3: "Fuehrt Daten aus mehreren Quellen reproduzierbar zusammen und prueft Ergebnisse auf Vollstaendigkeit.",
            4: "Konzipiert Aufbereitungsstrecken fuer heterogene Systemlandschaften; erkennt und loest Datenprobleme an der Quelle.",
            5: "Definiert Standards und wiederverwendbare Bausteine fuer Datenintegration; ist Anlaufstelle fuer schwierige Datenlagen.",
          },
        },
        {
          name: "Datenvisualisierung, Dashboards & Reporting",
          dep: "Evolving",
          targetLevel: 4,
          trend: "stabil",
          trendgrund: "Entscheider brauchen weiterhin verdichtete, verlaessliche Sichten auf Daten; Self-Service-BI veraendert die Werkzeuge, nicht den Bedarf.",
          description:
            "»Daten mit marktueblichen Tools zielgruppengerecht visualisieren und operative Dashboards sowie aussagekraeftige Reports zur Entscheidungsunterstuetzung entwickeln (z. B. Power BI, Tableau oder Python-Bibliotheken). Nicht gemeint: die muendliche Vermittlung und Praesentation von Ergebnissen (siehe Kommunikation & Zusammenarbeit). Typische Taetigkeiten: Passende Diagrammform fuer eine Fragestellung waehlen · Operative Dashboards mit Kennzahlen und Filtern aufbauen · Reports mit Fachbereichen abstimmen und pflegen«",
          anchors: {
            1: "Erstellt einfache Diagramme aus vorbereiteten Daten.",
            2: "Waehlt passende Diagrammformen und baut einfache Berichte eigenstaendig.",
            3: "Entwickelt Dashboards mit Kennzahlen, Filtern und Drilldowns fuer einen Fachbereich.",
            4: "Konzipiert Dashboards und Reports fuer unterschiedliche Zielgruppen; achtet auf Lesbarkeit, Performance und Datenkonsistenz.",
            5: "Setzt Visualisierungs- und Reporting-Standards fuer den Bereich; befaehigt andere.",
          },
        },
        {
          name: "Cloud-Datenplattformen",
          dep: "Perishable",
          targetLevel: 2,
          trend: "stark steigend",
          trendgrund: "Versicherer verlagern Datenhaltung und Analyse zunehmend in Cloud-Plattformen.",
          description:
            "»Datenhaltung, Abfrage und Analyse auf Cloud-Plattformen (z. B. Snowflake, Azure) nutzen und deren Grundkonzepte (Speicher, Rechenressourcen, Zugriffsrechte, Kosten) verstehen. Nicht gemeint: Plattformadministration und Infrastrukturbetrieb. Typische Taetigkeiten: Daten in einer Cloud-Plattform abfragen und bereitstellen · Rechenressourcen kostenbewusst nutzen · Zugriffsrechte mit dem Plattformteam abstimmen«",
          anchors: {
            1: "Kennt gaengige Cloud-Datenplattformen und ihren Zweck.",
            2: "Arbeitet in einer bestehenden Cloud-Umgebung mit Daten und Abfragen.",
            3: "Richtet Arbeitsbereiche und Datenbereitstellungen eigenstaendig ein; achtet auf Kosten und Rechte.",
            4: "Gestaltet die Nutzung einer Cloud-Plattform fuer Analyse und ML mit; beraet zu Plattformentscheidungen.",
            5: "Verantwortet die fachliche Ausrichtung der Datenplattform; definiert Nutzungsstandards.",
          },
        },
        {
          name: "KI-Tools in der Datenarbeit",
          dep: "Perishable",
          targetLevel: 3,
          trend: "stark steigend",
          trendgrund: "Code-Assistenten und KI-gestuetzte Analysewerkzeuge veraendern den Arbeitsalltag in Data Science schnell.",
          description:
            "»KI-Werkzeuge im eigenen Arbeitsalltag gezielt einsetzen, z. B. Code-Assistenten, KI-gestuetzte Funktionen in Analyse- und BI-Tools oder Sprachmodelle fuer Recherche und Dokumentation. Nicht gemeint: KI-Loesungen fuer Kunden bauen (siehe LLM- & GenAI-Loesungen und ML-Modellentwicklung) oder die werkzeugunabhaengige Metakompetenz (siehe Digitale Anwendungskompetenz). Typische Taetigkeiten: Code und Abfragen mit KI-Unterstuetzung schreiben und pruefen · Analysen und Dokumentation mit KI beschleunigen · Freigegebene Werkzeuge fuer vertrauliche Daten auswaehlen«",
          anchors: {
            1: "Kennt KI-Werkzeuge fuer die Datenarbeit dem Namen nach.",
            2: "Nutzt KI-Werkzeuge fuer einfache Aufgaben und prueft Ergebnisse auf offensichtliche Fehler.",
            3: "Setzt KI-Werkzeuge gezielt fuer Code, Analyse und Dokumentation ein und prueft Ergebnisse systematisch.",
            4: "Etabliert KI-gestuetzte Arbeitsablaeufe im Team; kennt Staerken und Grenzen der Werkzeuge genau.",
            5: "Definiert Standards fuer den KI-Werkzeugeinsatz im Bereich Data Science.",
          },
        },
      ],
    },
    {
      name: "Methodisch",
      skills: [
        {
          name: "Anforderungsanalyse & Priorisierung fuer Daten- und KI-Loesungen",
          dep: "Durable",
          targetLevel: 4,
          keySkill: true,
          trend: "steigend",
          trendgrund: "Daten- und KI-Vorhaben scheitern haeufig an unklaren Anforderungen und fehlenden Erfolgskriterien.",
          description:
            "»Gemeinsam mit Kunden fachliche und technische Anforderungen an Daten- und KI-Loesungen ableiten, strukturieren und priorisieren sowie die relevanten Umsetzungs- und Erfolgskriterien definieren. Nicht gemeint: allgemeines Requirements Engineering fuer Softwareprojekte. Typische Taetigkeiten: Anforderungen mit Fachbereich und Technik erheben · Anforderungen strukturieren und nach Wert und Machbarkeit priorisieren · Messbare Umsetzungs- und Abnahmekriterien festlegen«",
          anchors: {
            1: "Nimmt Anforderungen auf, die Kunden direkt nennen, und dokumentiert sie nach Vorlage.",
            2: "Stellt gezielte Rueckfragen und strukturiert Anforderungen fuer einfache Vorhaben.",
            3: "Leitet fachliche und technische Anforderungen eigenstaendig ab, priorisiert sie und definiert Umsetzungskriterien.",
            4: "Strukturiert und priorisiert Anforderungen fuer komplexe Vorhaben mit vielen Beteiligten; loest Zielkonflikte.",
            5: "Definiert das Vorgehen zur Anforderungsanalyse fuer Daten- und KI-Projekte; befaehigt andere.",
          },
        },
        {
          name: "Ideation & Workshop-Moderation",
          dep: "Durable",
          targetLevel: 4,
          trend: "steigend",
          trendgrund: "Kunden suchen Begleitung dabei, aus Daten und KI konkrete Ideen und Geschaeftsmodelle zu entwickeln.",
          description:
            "»Ideenfindung fuer datengetriebene Geschaeftsmodelle und KI-Anwendungsfaelle methodisch gestalten und Workshops mit Kunden moderieren (z. B. mit Design-Thinking- oder Use-Case-Canvas-Formaten). Nicht gemeint: allgemeine Meeting-Organisation. Typische Taetigkeiten: Ideation-Workshops konzipieren und moderieren · Ideen strukturieren, clustern und bewerten · Ergebnisse in naechste Schritte ueberfuehren«",
          anchors: {
            1: "Nimmt an Workshops teil und bringt Ideen ein.",
            2: "Bereitet Workshops nach Vorlage vor und moderiert einzelne Abschnitte.",
            3: "Konzipiert und moderiert Ideation-Workshops eigenstaendig und fuehrt Ergebnisse zu naechsten Schritten.",
            4: "Moderiert auch kontroverse Workshops mit vielen Beteiligten souveraen; waehlt Methoden passend zur Situation.",
            5: "Entwickelt Workshop-Formate fuer Daten- und KI-Ideation; befaehigt andere zur Moderation.",
          },
        },
        {
          name: "Bewertung von Datenquellen & Datenqualitaet",
          dep: "Durable",
          targetLevel: 4,
          trend: "stark steigend",
          trendgrund: "KI-Vorhaben und Regulatorik machen verlaessliche, nachvollziehbare Daten zur Voraussetzung.",
          description:
            "»Datenquellen auf Eignung, Herkunft und Qualitaet bewerten (z. B. Vollstaendigkeit, Korrektheit, Aktualitaet, Konsistenz) und Ergebnisse mit den relevanten Stakeholdern abstimmen. Schliesst Grundlagen von Data Governance wie Verantwortlichkeiten und Qualitaetsregeln ein. Nicht gemeint: die rechtliche Bewertung (siehe Datenschutz & Regulatorik). Typische Taetigkeiten: Datenquellen fuer ein Vorhaben sichten und bewerten · Qualitaetspruefungen definieren und durchfuehren · Qualitaetsmaengel mit Datenverantwortlichen klaeren«",
          anchors: {
            1: "Kennt Grundbegriffe der Datenqualitaet.",
            2: "Prueft Datenquellen anhand vorgegebener Kriterien und meldet Auffaelligkeiten strukturiert.",
            3: "Bewertet Datenquellen eigenstaendig nach Eignung und Qualitaet und stimmt Ergebnisse mit Stakeholdern ab.",
            4: "Bewertet die Datenlage ueber mehrere Quellen hinweg und leitet Massnahmen und Qualitaetsregeln ab.",
            5: "Baut Data-Governance- und Qualitaetsprozesse fuer Kunden auf; befaehigt andere zur Umsetzung.",
          },
        },
        {
          name: "Datenmodellierung",
          dep: "Durable",
          targetLevel: 4,
          trend: "stabil",
          trendgrund: "Saubere Datenmodelle bleiben die Grundlage fuer Analyse, Reporting und KI.",
          description:
            "»Fachliche Sachverhalte in konzeptionelle, logische und analytische Datenmodelle uebersetzen (z. B. Entity-Relationship-Modelle, dimensionale Modellierung mit Fakten und Dimensionen). Nicht gemeint: physisches Datenbanktuning. Typische Taetigkeiten: Fachbegriffe und Beziehungen mit dem Fachbereich klaeren · Analytische Modelle fuer Reporting entwerfen · Modelle dokumentieren und weiterentwickeln«",
          anchors: {
            1: "Liest einfache Datenmodelle und versteht Tabellenbeziehungen.",
            2: "Erstellt einfache Datenmodelle fuer klar umrissene Fragestellungen.",
            3: "Entwirft konzeptionelle und analytische Modelle eigenstaendig und stimmt sie mit dem Fachbereich ab.",
            4: "Modelliert komplexe, systemuebergreifende Datenbestaende; bewertet Modellvarianten nach Nutzen und Wartbarkeit.",
            5: "Setzt Modellierungsstandards fuer den Bereich; gilt als Referenz fuer schwierige Modellierungsfragen.",
          },
        },
        {
          name: "Vorgehen in Data-Science-Projekten",
          dep: "Durable",
          targetLevel: 4,
          trend: "steigend",
          trendgrund: "Mit wachsender Zahl an Datenprojekten wird ein strukturiertes, wiederholbares Vorgehen zum Qualitaetsfaktor.",
          description:
            "»Datenprojekte ueber alle Phasen strukturiert durchfuehren — vom Geschaeftsverstaendnis ueber Datenaufbereitung und Modellierung bis zu Bewertung und umsetzbaren Ergebnissen (z. B. nach CRISP-DM), iterativ und hypothesengeleitet. Nicht gemeint: allgemeines Projektmanagement. Typische Taetigkeiten: Fragestellung und Erfolgskriterien mit dem Fachbereich schaerfen · Hypothesen bilden und iterativ pruefen · Ergebnisse gegen die Ausgangsfrage bewerten«",
          anchors: {
            1: "Kennt die Phasen eines Datenprojekts in Grundzuegen.",
            2: "Arbeitet in einem strukturierten Datenprojekt mit und haelt die Phasen ein.",
            3: "Plant und steuert eigene Datenprojekte strukturiert von der Fragestellung bis zum umsetzbaren Ergebnis.",
            4: "Passt das Vorgehen an komplexe Ausgangslagen an; erkennt fruehzeitig, wann Fragestellung oder Datenlage nicht tragen.",
            5: "Entwickelt das Vorgehensmodell fuer Datenprojekte im Bereich; befaehigt andere zur Anwendung.",
          },
        },
        {
          name: "Abnahme, Betriebsuebergabe & kontinuierliche Verbesserung",
          dep: "Durable",
          targetLevel: 3,
          trend: "steigend",
          trendgrund: "Daten- und KI-Loesungen muessen nach dem Livegang beobachtet und nachgeschaerft werden — die Uebergabe in den Betrieb wird zur Daueraufgabe.",
          description:
            "»Abnahmen von Arbeitsergebnissen steuern, fertige Daten- und KI-Loesungen reibungslos in den Betrieb uebergeben und deren kontinuierliche Verbesserung unterstuetzen. Nicht gemeint: den Betrieb selbst verantworten. Typische Taetigkeiten: Abnahmen gegen vereinbarte Kriterien vorbereiten und durchfuehren · Dokumentation und Uebergabe an Betrieb und Fachbereich organisieren · Rueckmeldungen aus dem Betrieb in Verbesserungen ueberfuehren«",
          anchors: {
            1: "Wirkt an Abnahmen mit und dokumentiert Ergebnisse nach Vorlage.",
            2: "Bereitet Abnahmen fuer einfache Ergebnisse eigenstaendig vor.",
            3: "Steuert Abnahmen und Uebergaben eigenstaendig und stellt eine vollstaendige Dokumentation sicher.",
            4: "Steuert Abnahme und Betriebsuebergabe komplexer Loesungen; etabliert Feedbackschleifen fuer die Weiterentwicklung.",
            5: "Definiert Standards fuer Abnahme, Uebergabe und Weiterentwicklung von Daten- und KI-Loesungen.",
          },
        },
      ],
    },
    {
      name: "Kommunikation & Zusammenarbeit",
      skills: [
        {
          name: "Beratung & Stakeholder-Management in Datenprojekten",
          dep: "Durable",
          targetLevel: 4,
          trend: "steigend",
          trendgrund: "Datenprojekte beruehren viele Bereiche gleichzeitig — Erwartungsmanagement wird anspruchsvoller.",
          description:
            "»Kunden und Stakeholder zu Datenthemen beraten, souveraen auftreten, Erwartungen klaeren und steuern sowie Entscheidungen vorbereiten. Nicht gemeint: Vertrieb und Akquise. Typische Taetigkeiten: Ziele und Erwartungen zu Beginn eines Datenprojekts klaeren · Realistische Einschaetzungen zu Machbarkeit und Aufwand geben · Entscheidungsvorlagen mit Optionen vorbereiten«",
          anchors: {
            1: "Kommuniziert reaktiv auf Anfragen von Stakeholdern.",
            2: "Klaert Anforderungen und Erwartungen in einfachen Konstellationen eigenstaendig.",
            3: "Tritt beim Kunden souveraen auf und steuert Erwartungen aktiv, auch wenn Daten oder Machbarkeit Grenzen setzen.",
            4: "Beraet Entscheider souveraen in komplexen Konstellationen; positioniert Datenthemen als Geschaeftsthemen.",
            5: "Gilt als vertrauenswuerdiger Berater fuer Datenthemen auf Entscheider-Ebene.",
          },
        },
        {
          name: "Erkenntnisse adressatengerecht vermitteln",
          dep: "Durable",
          targetLevel: 4,
          trend: "steigend",
          trendgrund: "Je komplexer Modelle werden, desto wichtiger ist es, Ergebnisse und deren Grenzen verstaendlich zu machen.",
          description:
            "»Komplexe Analyse- und Modellergebnisse fuer Fach- und Fuehrungsebene verstaendlich aufbereiten und in praegnanten Entscheidungspraesentationen vermitteln — inklusive Unsicherheiten und Grenzen (Data Storytelling). Nicht gemeint: das technische Erstellen von Dashboards und Reports (siehe Technisch). Typische Taetigkeiten: Kernaussagen aus Analysen herausarbeiten · Ergebnisse mit Unsicherheiten ehrlich einordnen · Handlungsempfehlungen in Entscheidungspraesentationen vermitteln«",
          anchors: {
            1: "Praesentiert vorbereitete Ergebnisse mit Unterstuetzung.",
            2: "Bereitet Ergebnisse eigenstaendig auf und passt die Detailtiefe grob an die Zielgruppe an.",
            3: "Vermittelt komplexe Ergebnisse zielgruppengerecht inkl. Unsicherheiten und Grenzen.",
            4: "Ueberzeugt auch kritische Stakeholder mit klaren Kernaussagen und Handlungsempfehlungen.",
            5: "Setzt Standards fuer die Vermittlung von Datenergebnissen; coacht andere.",
          },
        },
        {
          name: "Interdisziplinaere Zusammenarbeit im Kundenprojekt",
          dep: "Durable",
          targetLevel: 4,
          trend: "steigend",
          trendgrund: "Daten- und KI-Loesungen entstehen nur im Zusammenspiel von Fachbereich, Data Engineering, Data Science und Projektmanagement.",
          description:
            "»Ueber alle Projektphasen hinweg eng mit Projektmanagement, Data Engineering, Data Science, IT-Architektur, Entwicklung und Domaenenexpert:innen beim Kunden zusammenarbeiten. Nicht gemeint: Projektleitung oder eigene Architekturverantwortung. Typische Taetigkeiten: Anforderungen an Daten und Schnittstellen mit Data Engineering abstimmen · Fachliche Fragen mit Domaenenexpert:innen klaeren · Ergebnisse an Entwicklung und Betrieb uebergeben«",
          anchors: {
            1: "Arbeitet in der eigenen Rolle und kommuniziert reaktiv mit anderen Disziplinen.",
            2: "Stimmt sich bei Bedarf eigenstaendig mit anderen Disziplinen ab.",
            3: "Bindet die relevanten Disziplinen frueh ein und klaert Schnittstellen proaktiv.",
            4: "Verbindet Fach-, Daten- und Technikperspektive in komplexen Kundenprojekten; moderiert fachuebergreifende Klaerungen.",
            5: "Gestaltet die Zusammenarbeit zwischen Data Science, IT und Fachbereichen bereichsuebergreifend.",
          },
        },
        { ...RUMP_VERBAL_V2, targetLevel: 4, trend: "stabil" },
      ],
    },
  ],
};
