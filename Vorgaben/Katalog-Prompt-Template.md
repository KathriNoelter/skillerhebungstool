# Prompt-Template: Skill-Katalog für neue Rolle generieren

Kopiere den gesamten Prompt-Block unten in Claude. Ersetze die Platzhalter in `[…]`.

---

## Prompt (in Claude einfügen)

```
Du erstellst einen Skill-Katalog für die Rolle **[ROLLENNAME]** in einem IT-Beratungshaus.

### Unternehmenskontext
Das Beratungshaus erbringt Software-Entwicklungs-Dienstleistungen vorrangig für Versicherungs- und Finanzunternehmen im deutschsprachigen Raum. Alle Skills und Trendeinschätzungen müssen die aktuellen und zukünftigen Anforderungen dieser Branchen widerspiegeln — KI, Automation, Cloud, Regulatorik (DORA, EU AI Act, NIS2) sind verpflichtend zu berücksichtigen.

### Rollenbeschreibung
[2–4 Sätze zur Rolle und ihrem Schwerpunkt im Beratungskontext]

### Pflichtquellen für Trendeinschätzungen
Jeder Trend und jede Trendbegruendung muss sich auf mindestens eine dieser Quellen stützen:
- Prof. Dr. Jutta Rump, IBE Ludwigshafen (2025): „Kompetenzeffekte der Digitalisierung und KI"
- WEF Future of Jobs Report 2025
- Regulatorischer Kontext: DORA, EU AI Act, NIS2 (für Versicherungs-IT verpflichtend ab 2025)

### Schlüsselkompetenzen (schluessel: true)
Rump 2025 identifiziert 7 Kompetenzfelder. Die drei kritischsten — lt. Zusammenfassung des Papers — erhalten schluessel: true durch je einen repräsentativen Skill der Rolle:

1. **Digitale Anwendungskompetenz** — „Basiskompetenz für alle Beschäftigtengruppen, situationsspezifisch in der Tiefe" (Rump 2025, S. 7). Wähle den Skill der Rolle, der digitale Handlungsfähigkeit im Arbeitskontext repräsentiert.
2. **Verbalisierungs- & Strukturierungskompetenz** — „Metakognitive Kernkompetenz; Risiko kognitiver Entwöhnung durch KI-gestützte Entlastung" (Rump 2025, S. 3–4). Wähle den Skill der Rolle, der eigenständiges Denken, Strukturieren und präzises Formulieren abbildet.
3. **Fachkompetenz** (als Dimension) — „Zentrales Fundament; Voraussetzung zur kritischen Kontrolle und Bewertung von KI-Ergebnissen" (Rump 2025, S. 3). Wähle den wichtigsten fachlichen Kernkompetenz-Skill der Rolle.

Die weiteren 4 Rump-Felder (Lernfähigkeit, Empathie, Kreativität, Optimismus/Frustrationstoleranz) fließen als Haltungen in die Kategorie „Kommunikation & Leadership" ein — dort kein gesondertes schluessel: true erforderlich, es sei denn, sie sind für die Rolle absolut rollenspezifisch kritisch.

### Zielwerte (zielwert 1–5)
- Kerntechnische Skills (z. B. Backend, Testing, Technisches Design): zielwert 4
- Querschnittskompetenzen (z. B. Cloud, CI/CD, Kommunikation): zielwert 3
- Einstiegsrelevante Consulting-Skills (z. B. Changebegleitung, Moderationstechnik): zielwert 2
Dreyfus (alle Kategorien außer Fachkompetenz): 1=Anfänger · 2=Fortg. Anfänger · 3=Kompetent · 4=Gewandt · 5=Experte
Bloom (nur Fachkompetenz): 1=Erinnern · 2=Verstehen · 3=Anwenden · 4=Analysieren & Evaluieren · 5=Erschaffen & Gestalten

### Steckbrief-Format
»[Was der Skill umfasst]. Nicht gemeint: [Abgrenzung]. Typische Tätigkeiten: [Beispiel 1] · [Beispiel 2] · [Beispiel 3]«

### Verhaltensanker-Format (Felder anker.1 bis anker.5)
- Jede Stufe: ein eigenständiger, konkreter Satz mit beobachtbarem Verhalten
- Keine Wiederholungen aus anderen Stufen
- Keine Fließtexte oder Aufzählungen innerhalb einer Stufe
- Formulierung einheitlich in dritter Person: „Setzt selbstständig…", „Erkennt und löst…"

### Ausgabeformat
Gib **ausschließlich** ein JSON-Objekt zurück — kein Text davor oder danach.

{
  "name": "[ROLLENNAME]",
  "description": "2–3 Sätze zur Rolle.",
  "categories": [
    {
      "name": "Fachkompetenz",
      "skills": [
        {
          "name": "Skill-Name",
          "haltbarkeit": "Durable",
          "steckbrief": "»…«",
          "trend": "steigend",
          "trendbegruendung": "Quelle + Begründung.",
          "bewertungsmodell": "Bloom",
          "zielwert": 3,
          "schluessel": false,
          "anker": {
            "1": "Satz Stufe 1.",
            "2": "Satz Stufe 2.",
            "3": "Satz Stufe 3.",
            "4": "Satz Stufe 4.",
            "5": "Satz Stufe 5."
          },
          "zuletzt": "2025-05-13"
        }
      ]
    },
    {
      "name": "Handwerklich-Technisch",
      "skills": [ ... ]
    },
    {
      "name": "Methodisch",
      "skills": [ ... ]
    },
    {
      "name": "Kommunikation & Leadership",
      "skills": [ ... ]
    }
  ]
}

### Feldwerte
- haltbarkeit: genau "Durable", "Evolving" oder "Perishable"
  - Durable = zeitlos (Grundlagen, Methoden, Kommunikation)
  - Evolving = im Wandel, langfristig relevant (aktuelle Technologien, Frameworks)
  - Perishable = kurzlebig, veraltet schnell (spezifische Tool-Versionen, proprietäre Systeme)
- bewertungsmodell: "Bloom" nur für Kategorie "Fachkompetenz", sonst "Dreyfus"
- trend: "stark steigend" | "steigend" | "stabil" | "sinkend"
- zuletzt: heutiges Datum im Format YYYY-MM-DD

### Umfang
- Fachkompetenz: 5–8 Skills
- Handwerklich-Technisch: 4–7 Skills
- Methodisch: 4–6 Skills
- Kommunikation & Leadership: 3–5 Skills
- Gesamt: 18–28 Skills
```

---

## Workflow nach der Generierung

1. Claude gibt JSON aus → in Texteditor als `[Rollenname].json` speichern
2. In der App: **Rollenauswahl → „Katalog importieren (.json)"** → Datei auswählen
3. Rolle erscheint sofort unter „Importierte Rollen" und ist direkt wählbar
4. In der Skill-Inventur verfeinern (Steckbriefe, Anker, Zielwerte anpassen)

---

## Beispiel-Skill (Referenz)

```json
{
  "name": "Anforderungsanalyse",
  "haltbarkeit": "Durable",
  "steckbrief": "»Erhebung, Strukturierung und Dokumentation fachlicher und technischer Anforderungen für Versicherungs-IT-Projekte. Nicht gemeint: technische Umsetzung oder Architekturentscheidungen. Typische Tätigkeiten: Stakeholder-Interviews führen · Anforderungen in User Stories überführen · Widersprüche und Lücken identifizieren«",
  "trend": "stabil",
  "trendbegruendung": "Kernkompetenz des Business Analysten — bleibt laut WEF Future of Jobs 2025 trotz KI-Unterstützung bei Anforderungserhebung essentiell für Versicherungsprojekte.",
  "bewertungsmodell": "Dreyfus",
  "zielwert": 4,
  "schluessel": true,
  "anker": {
    "1": "Füllt vorgegebene Anforderungsvorlagen aus und dokumentiert einfache Sachverhalte nach Anweisung.",
    "2": "Führt strukturierte Interviews und überführt Ergebnisse eigenständig in User Stories.",
    "3": "Leitet Anforderungsworkshops, erkennt Widersprüche und schlägt Lösungen vor.",
    "4": "Moderiert komplexe Stakeholder-Konflikte und konsolidiert divergierende Anforderungen zu einem konsistenten Anforderungsbild.",
    "5": "Etabliert Anforderungsprozesse im Projekt oder Unternehmen und entwickelt Standards für das Team."
  },
  "zuletzt": "2025-05-13"
}
```
