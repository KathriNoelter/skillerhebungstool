import type { Role } from "../types";
import { RUMP_DIGITALE, RUMP_VERBAL } from "./rumpSkills";

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
