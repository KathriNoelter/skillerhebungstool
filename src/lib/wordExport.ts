import {
  AlignmentType,
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  ShadingType,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
  type IBorderOptions,
} from "docx";

import type { Group, MarketDriver, Role, Skill, SkillCategory } from "../types";
import { stageLabelsFor } from "../types";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const TREND_LABEL: Record<string, string> = {
  "stark steigend": "↑↑ stark steigend",
  steigend: "↑ steigend",
  stabil: "→ stabil",
  sinkend: "↓ sinkend",
};

function thinBorder(): { top: IBorderOptions; bottom: IBorderOptions; left: IBorderOptions; right: IBorderOptions } {
  const b: IBorderOptions = { style: "single", size: 4, color: "E2E8F0" };
  return { top: b, bottom: b, left: b, right: b };
}

function metaText(skill: Skill): string {
  const labels = stageLabelsFor();
  const parts: string[] = [skill.dep];
  if (typeof skill.targetLevel === "number") {
    parts.push(`Ziel ${skill.targetLevel} – ${labels[skill.targetLevel]}`);
  }
  if (skill.trend) parts.push(TREND_LABEL[skill.trend] ?? skill.trend);
  return parts.join("  ·  ");
}

// ---------------------------------------------------------------------------
// Block builders
// ---------------------------------------------------------------------------

function skillBlock(skill: Skill): (Paragraph | Table)[] {
  const anchors = skill.anchors ?? {};
  const anchorEntries = ([1, 2, 3, 4, 5] as const).filter((l) => anchors[l]);
  const items: (Paragraph | Table)[] = [];

  items.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_3,
      spacing: { before: 240, after: 60 },
      children: [
        new TextRun({ text: skill.name }),
        ...(skill.keySkill
          ? [new TextRun({ text: "  ★ Schlüssel", color: "D97706", size: 22 })]
          : []),
      ],
    }),
  );

  items.push(
    new Paragraph({
      spacing: { before: 0, after: 80 },
      children: [
        new TextRun({ text: metaText(skill), color: "64748B", size: 18 }),
      ],
    }),
  );

  if (skill.description) {
    items.push(
      new Paragraph({
        spacing: { before: 0, after: 120 },
        children: [new TextRun({ text: skill.description, size: 20, color: "475569" })],
      }),
    );
  }

  if (anchorEntries.length > 0) {
    const labels = stageLabelsFor();
    const rows = anchorEntries.map((l) => {
      return new TableRow({
        children: [
          new TableCell({
            width: { size: 2200, type: WidthType.DXA },
            borders: thinBorder(),
            shading: { type: ShadingType.CLEAR, fill: "F8FAFC", color: "auto" },
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: `${l} – ${labels[l]}`,
                    bold: true,
                    size: 18,
                    color: "334155",
                  }),
                ],
              }),
            ],
          }),
          new TableCell({
            borders: thinBorder(),
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: anchors[l] ?? "", size: 18, color: "475569" }),
                ],
              }),
            ],
          }),
        ],
      });
    });

    items.push(
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows,
      }),
    );
  }

  items.push(new Paragraph({ spacing: { after: 160 }, children: [] }));
  return items;
}

function categorySection(cat: SkillCategory): (Paragraph | Table)[] {
  const active = cat.skills.filter((s) => !s.disabled);
  if (active.length === 0) return [];

  const items: (Paragraph | Table)[] = [
    new Paragraph({
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 360, after: 120 },
      children: [new TextRun({ text: `${cat.name} (${active.length} Skills)` })],
    }),
  ];

  for (const skill of active) {
    items.push(...skillBlock(skill));
  }

  return items;
}

function roleSection(role: Role): (Paragraph | Table)[] {
  const activeCategories = role.categories
    .map((cat) => ({ ...cat, skills: cat.skills.filter((s) => !s.disabled) }))
    .filter((cat) => cat.skills.length > 0);
  if (activeCategories.length === 0) return [];

  const totalSkills = activeCategories.reduce((n, c) => n + c.skills.length, 0);

  const items: (Paragraph | Table)[] = [
    new Paragraph({
      heading: HeadingLevel.HEADING_1,
      pageBreakBefore: true,
      spacing: { before: 0, after: 120 },
      children: [new TextRun({ text: role.name })],
    }),
  ];

  if (role.description) {
    items.push(
      new Paragraph({
        spacing: { before: 0, after: 80 },
        children: [new TextRun({ text: role.description, color: "64748B", size: 20 })],
      }),
    );
  }

  items.push(
    new Paragraph({
      spacing: { before: 0, after: 240 },
      children: [
        new TextRun({
          text: `${totalSkills} Skills  ·  ${activeCategories.length} Bereiche`,
          color: "94A3B8",
          size: 18,
        }),
      ],
    }),
  );

  for (const cat of activeCategories) {
    items.push(...categorySection(cat));
  }

  return items;
}

function driversSection(drivers: MarketDriver[]): (Paragraph | Table)[] {
  if (drivers.length === 0) return [];

  const items: (Paragraph | Table)[] = [
    new Paragraph({
      heading: HeadingLevel.HEADING_1,
      pageBreakBefore: true,
      spacing: { before: 0, after: 200 },
      children: [new TextRun({ text: `Markt- & Kundentreiber (${drivers.length})` })],
    }),
  ];

  for (const d of drivers) {
    items.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 240, after: 80 },
        children: [
          new TextRun({ text: d.title }),
          ...(d.horizon
            ? [new TextRun({ text: `  · ${d.horizon}`, color: "64748B", size: 22 })]
            : []),
        ],
      }),
    );

    if (d.description) {
      items.push(
        new Paragraph({
          spacing: { before: 0, after: 100 },
          children: [new TextRun({ text: d.description, size: 20, color: "475569" })],
        }),
      );
    }

    if (d.affectedSkillNames.length > 0) {
      items.push(
        new Paragraph({
          spacing: { before: 0, after: 160 },
          children: [
            new TextRun({ text: "Betroffene Skills: ", bold: true, size: 18, color: "334155" }),
            new TextRun({
              text: d.affectedSkillNames.join(" · "),
              size: 18,
              color: "64748B",
            }),
          ],
        }),
      );
    }
  }

  return items;
}

function roleOverviewTable(roles: Role[]): Table {
  const headerRow = new TableRow({
    tableHeader: true,
    children: [
      new TableCell({
        borders: thinBorder(),
        shading: { type: ShadingType.CLEAR, fill: "1E293B", color: "auto" },
        children: [
          new Paragraph({
            children: [new TextRun({ text: "Rolle", bold: true, color: "FFFFFF", size: 20 })],
          }),
        ],
      }),
      new TableCell({
        borders: thinBorder(),
        shading: { type: ShadingType.CLEAR, fill: "1E293B", color: "auto" },
        children: [
          new Paragraph({
            children: [new TextRun({ text: "Beschreibung", bold: true, color: "FFFFFF", size: 20 })],
          }),
        ],
      }),
      new TableCell({
        width: { size: 1200, type: WidthType.DXA },
        borders: thinBorder(),
        shading: { type: ShadingType.CLEAR, fill: "1E293B", color: "auto" },
        children: [
          new Paragraph({
            alignment: AlignmentType.RIGHT,
            children: [new TextRun({ text: "Skills", bold: true, color: "FFFFFF", size: 20 })],
          }),
        ],
      }),
    ],
  });

  const dataRows = roles.map((role) => {
    const count = role.categories.reduce(
      (n, c) => n + c.skills.filter((s) => !s.disabled).length,
      0,
    );
    return new TableRow({
      children: [
        new TableCell({
          borders: thinBorder(),
          children: [
            new Paragraph({
              children: [new TextRun({ text: role.name, bold: true, size: 20 })],
            }),
          ],
        }),
        new TableCell({
          borders: thinBorder(),
          children: [
            new Paragraph({
              children: [
                new TextRun({ text: role.description ?? "", size: 18, color: "64748B" }),
              ],
            }),
          ],
        }),
        new TableCell({
          width: { size: 1200, type: WidthType.DXA },
          borders: thinBorder(),
          children: [
            new Paragraph({
              alignment: AlignmentType.RIGHT,
              children: [new TextRun({ text: String(count), size: 18, color: "94A3B8" })],
            }),
          ],
        }),
      ],
    });
  });

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [headerRow, ...dataRows],
  });
}

// ---------------------------------------------------------------------------
// Public export
// ---------------------------------------------------------------------------

export function buildGroupCatalogDocument(
  group: Group,
  drivers: MarketDriver[] = [],
  selectedRoleIds?: string[],
): Document {
  const rolesToExport = selectedRoleIds
    ? group.roles.filter((r) => selectedRoleIds.includes(r.id))
    : group.roles;

  const date = new Date().toLocaleDateString("de-DE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const totalSkills = rolesToExport.reduce(
    (n, role) =>
      n + role.categories.reduce((m, c) => m + c.skills.filter((s) => !s.disabled).length, 0),
    0,
  );

  const coverParagraphs: Paragraph[] = [
    new Paragraph({
      heading: HeadingLevel.TITLE,
      spacing: { before: 0, after: 200 },
      children: [new TextRun({ text: "Skill-Katalog" })],
    }),
    new Paragraph({
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 0, after: 400 },
      children: [new TextRun({ text: group.name })],
    }),
    new Paragraph({
      spacing: { before: 0, after: 120 },
      children: [new TextRun({ text: group.description ?? "", size: 24, color: "64748B" })],
    }),
    new Paragraph({
      spacing: { before: 0, after: 600 },
      children: [
        new TextRun({
          text: `${rolesToExport.length} Rollen  ·  ${totalSkills} Skills  ·  ${drivers.length} Markttreiber`,
          size: 22,
          color: "94A3B8",
        }),
      ],
    }),
    new Paragraph({
      spacing: { before: 0, after: 0 },
      children: [new TextRun({ text: `Erstellt am ${date}`, size: 20, color: "94A3B8" })],
    }),
  ];

  const tocHeading = new Paragraph({
    heading: HeadingLevel.HEADING_1,
    pageBreakBefore: true,
    spacing: { before: 0, after: 200 },
    children: [new TextRun({ text: "Rollenübersicht" })],
  });

  const roleSections = rolesToExport.flatMap((role) => roleSection(role));
  const driversSec = driversSection(drivers);

  return new Document({
    styles: {
      default: {
        document: {
          run: { font: "Calibri", size: 22 },
        },
      },
    },
    sections: [
      {
        children: [
          ...coverParagraphs,
          tocHeading,
          roleOverviewTable(rolesToExport),
          ...driversSec,
          ...roleSections,
        ],
      },
    ],
  });
}

export function exportFullGroupCatalogWord(
  group: Group,
  drivers: MarketDriver[] = [],
  selectedRoleIds?: string[],
): void {
  const doc = buildGroupCatalogDocument(group, drivers, selectedRoleIds);

  void Packer.toBlob(doc).then((blob) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Skill-Katalog-${group.name.replace(/\s+/g, "-")}.docx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });
}
