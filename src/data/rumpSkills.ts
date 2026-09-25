import type { Skill } from "../types";

export const RUMP_DIGITALE: Skill = {
  name: "Digitale Anwendungskompetenz",
  dep: "Evolving",
  keySkill: true,
  description:
    "Digitale Systeme und KI-Werkzeuge verstehen, kritisch anwenden und mitgestalten. Digitale Systeme umfasst dabei KI-Tools, Kollaborationsplattformen, datenbasierte Auswertungen und digitale Arbeitsprozesse. Wissenskompetenz, nicht Tool-Beherrschung — daher Fachkompetenz. Querschnittskompetenz nach Prof. Dr. Jutta Rump (2025). Bewertung nach Bloom's Taxonomy (1-5). Typische Taetigkeit: KI-Vorschlaege kritisch pruefen, Daten- und Datenschutzgrenzen einhalten, digitale Werkzeuge situationsgerecht einsetzen.",
  anchors: {
    1: "Kennt grundlegende Begriffe digitaler Systeme und KI; kann erklaeren, wofuer typische Tools eingesetzt werden.",
    2: "Nutzt digitale Tools und KI-Assistenten in bekannten Standardsituationen produktiv; haelt Daten- und Datenschutzregeln ein.",
    3: "Bewertet KI-Outputs kritisch auf Plausibilitaet, Bias und Quellenlage; erkennt, wann ein Tool ungeeignet ist.",
    4: "Wiegt Nutzen, Risiken und Grenzen digitaler Loesungen ab; trifft fundierte Tool- und Prompting-Entscheidungen im Arbeitskontext.",
    5: "Verantwortet Outputs, definiert Leitplanken fuer Team und Prozess, gestaltet den verantwortungsvollen Einsatz digitaler Systeme aktiv mit.",
  },
};

export const RUMP_VERBAL: Skill = {
  name: "Verbalisierung & Strukturierung",
  dep: "Durable",
  keySkill: true,
  description:
    "Gedanken ordnen, Inhalte klar formulieren, Komplexitaet reduzieren — schriftlich und muendlich. Relevant fuer Spezifikationen, Konzeptdokumentationen, Berichte und die Kommunikation mit Stakeholdern. Typische Taetigkeit: einen unscharfen Sachverhalt in eine klare Zusammenfassung uebersetzen, Argumente strukturiert vortragen, Texte praezise verdichten.",
  anchors: {
    1: "Formuliert verstaendlich, wenn der Inhalt klar ist; Struktur entsteht intuitiv; Texte manchmal zu lang.",
    2: "Strukturiert Inhalte nach Vorlagen; formuliert einfache Sachverhalte klar und nachvollziehbar.",
    3: "Formuliert praezise und adressatengerecht; reduziert Komplexitaet aktiv; Texte sind auf das Wesentliche fokussiert.",
    4: "Bringt schwierige Inhalte auf den Punkt; formuliert Prompts und Konzepte mit hoher Treffsicherheit.",
    5: "Setzt Kommunikationsstandards; befaehigt andere; gilt als Referenz fuer klare Texte und strukturierte Inhalte.",
  },
};
