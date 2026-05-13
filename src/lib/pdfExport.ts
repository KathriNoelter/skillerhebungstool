import type { MarketDriver, Skill, SkillCategory } from "../types";
import { evaluationModelFor, stageLabelsFor } from "../types";

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const TREND_LABEL: Record<string, string> = {
  "stark steigend": "↑↑ stark steigend",
  steigend: "↑ steigend",
  stabil: "→ stabil",
  sinkend: "↓ sinkend",
};

const TREND_COLOR: Record<string, string> = {
  "stark steigend": "background:#d1fae5;color:#065f46",
  steigend: "background:#dbeafe;color:#1e40af",
  stabil: "background:#f1f5f9;color:#334155",
  sinkend: "background:#fef3c7;color:#92400e",
};

const DEP_COLOR: Record<string, string> = {
  Durable: "background:#d1fae5;color:#065f46",
  Evolving: "background:#dbeafe;color:#1e40af",
  Perishable: "background:#fef3c7;color:#92400e",
};

function badge(text: string, style: string): string {
  return `<span style="display:inline-block;font-size:10px;font-weight:700;padding:2px 8px;border-radius:20px;letter-spacing:.04em;text-transform:uppercase;${style}">${esc(text)}</span>`;
}

function skillCard(skill: Skill, catName: string): string {
  const model = evaluationModelFor(skill, catName);
  const labels = stageLabelsFor(model);
  const anchors = skill.anchors ?? {};
  const anchorEntries = ([1, 2, 3, 4, 5] as const).filter((l) => anchors[l]);

  let html = `<div style="border:1px solid #e2e8f0;border-radius:8px;padding:14px 16px;margin-bottom:10px;page-break-inside:avoid">`;

  // Header row
  html += `<div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:6px">`;
  html += `<span style="font-size:14px;font-weight:700;color:#1e293b">${esc(skill.name)}`;
  if (skill.keySkill) html += ` <span style="color:#d97706;font-size:12px">★ Schlüssel</span>`;
  html += `</span>`;

  html += `<span style="display:flex;gap:5px;flex-wrap:wrap;justify-content:flex-end;flex-shrink:0">`;
  html += badge(skill.dep, DEP_COLOR[skill.dep] ?? "");
  html += badge(model, "background:#f1f5f9;color:#334155");
  if (skill.trend) html += badge(TREND_LABEL[skill.trend] ?? skill.trend, TREND_COLOR[skill.trend] ?? "");
  if (typeof skill.targetLevel === "number") {
    html += badge(`Ziel ${skill.targetLevel} – ${labels[skill.targetLevel]}`, "background:#e0e7ff;color:#3730a3");
  }
  html += `</span>`;
  html += `</div>`;

  if (skill.description) {
    html += `<p style="font-size:12px;color:#475569;line-height:1.6;margin-bottom:8px">${esc(skill.description)}</p>`;
  }

  if (skill.trendgrund) {
    html += `<p style="font-size:11px;color:#64748b;font-style:italic;margin-bottom:8px"><strong>Trendeinschaetzung:</strong> ${esc(skill.trendgrund)}</p>`;
  }

  if (anchorEntries.length > 0) {
    html += `<table style="width:100%;border-collapse:collapse;font-size:11px;margin-top:6px">`;
    for (const l of anchorEntries) {
      html += `<tr style="vertical-align:top">`;
      html += `<td style="width:130px;padding:4px 8px 4px 0;font-weight:600;color:#334155;white-space:nowrap">${l} – ${esc(labels[l])}</td>`;
      html += `<td style="padding:4px 0;color:#475569;line-height:1.5">${esc(anchors[l] ?? "")}</td>`;
      html += `</tr>`;
    }
    html += `</table>`;
  }

  html += `</div>`;
  return html;
}

const HORIZON_COLOR: Record<string, string> = {
  "0–2 Jahre": "background:#fef3c7;color:#92400e",
  "2–5 Jahre": "background:#dbeafe;color:#1e40af",
  "5+ Jahre": "background:#f1f5f9;color:#334155",
};

function driversSection(drivers: MarketDriver[]): string {
  if (drivers.length === 0) return "";

  let html = `<section style="margin-bottom:40px;page-break-before:always">`;
  html += `<h2 style="font-size:11px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;`;
  html += `color:#94a3b8;margin-bottom:16px;padding-bottom:8px;border-bottom:1.5px solid #e2e8f0">`;
  html += `Markt- &amp; Kundentreiber <span style="font-weight:400">(${drivers.length})</span></h2>`;

  for (const d of drivers) {
    const horizonStyle = HORIZON_COLOR[d.horizon] ?? "background:#f1f5f9;color:#334155";
    html += `<div style="border:1px solid #e2e8f0;border-radius:8px;padding:14px 16px;margin-bottom:10px;page-break-inside:avoid">`;

    html += `<div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:8px">`;
    html += `<span style="font-size:14px;font-weight:700;color:#1e293b">${esc(d.title)}</span>`;
    if (d.horizon) html += badge(d.horizon, horizonStyle);
    html += `</div>`;

    if (d.description) {
      html += `<p style="font-size:12px;color:#475569;line-height:1.6;margin-bottom:8px">${esc(d.description)}</p>`;
    }

    if (d.affectedSkillNames.length > 0) {
      html += `<div style="font-size:11px;color:#64748b;margin-top:6px">`;
      html += `<span style="font-weight:600;color:#334155">Betroffene Skills:</span> `;
      html += d.affectedSkillNames.map(esc).join(", ");
      html += `</div>`;
    }

    html += `</div>`;
  }

  html += `</section>`;
  return html;
}

/**
 * Opens a print-optimized HTML page in a new window and triggers the browser
 * print dialog. The user can then save the result as PDF.
 * Includes all skills (disabled skills are excluded), all descriptions, trend
 * information, behavioral anchors, and market drivers — nothing collapsed.
 */
export function exportSkillInventoryPdf(
  categories: SkillCategory[],
  departmentName: string,
  groupName: string = "",
  drivers: MarketDriver[] = [],
) {
  const date = new Date().toLocaleDateString("de-DE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  let body = "";
  let totalSkills = 0;

  for (const cat of categories) {
    const active = cat.skills.filter((s) => !s.disabled);
    if (active.length === 0) continue;
    totalSkills += active.length;

    body += `<section style="margin-bottom:32px">`;
    body += `<h2 style="font-size:11px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;`;
    body += `color:#94a3b8;margin-bottom:12px;padding-bottom:8px;border-bottom:1.5px solid #e2e8f0">`;
    body += `${esc(cat.name)} <span style="font-weight:400">(${active.length} Skills)</span></h2>`;
    for (const skill of active) {
      body += skillCard(skill, cat.name);
    }
    body += `</section>`;
  }

  const subtitleParts = [departmentName];
  if (groupName) subtitleParts.push(groupName);

  const driverHtml = driversSection(drivers);
  const metaParts = [`${totalSkills} Skills`];
  if (drivers.length > 0) metaParts.push(`${drivers.length} Markttreiber`);

  const html = `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<title>Skill-Inventur — ${esc(departmentName)}</title>
<style>
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  body{
    font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",system-ui,sans-serif;
    color:#1e293b;font-size:13px;line-height:1.5;
    padding:0;
  }
  .page-header{
    background:#1e293b;color:#fff;padding:20px 32px;
    display:flex;align-items:flex-start;justify-content:space-between;
    margin-bottom:32px;
  }
  .page-header h1{font-size:20px;font-weight:700;margin-bottom:4px}
  .page-header .sub{font-size:13px;color:rgba(255,255,255,.6)}
  .page-header .meta{text-align:right;font-size:12px;color:rgba(255,255,255,.5)}
  .content{max-width:900px;margin:0 auto;padding:0 32px 48px}
  @media print{
    .page-header{-webkit-print-color-adjust:exact;print-color-adjust:exact;background:#1e293b!important}
    span[style*="background"]{-webkit-print-color-adjust:exact;print-color-adjust:exact}
    @page{margin:1cm 1.5cm}
  }
</style>
</head>
<body>
<div class="page-header">
  <div>
    <h1>Skill-Inventur: ${esc(departmentName)}</h1>
    <div class="sub">${subtitleParts.map(esc).join(" · ")}</div>
  </div>
  <div class="meta">
    ${esc(date)}<br>
    ${metaParts.join(" · ")}
  </div>
</div>
<div class="content">
${body}
${driverHtml}
</div>
<script>
  window.onload = function() { window.print(); };
<\/script>
</body>
</html>`;

  const win = window.open("", "_blank");
  if (!win) {
    alert("Popup blockiert. Bitte Popups fuer diese Seite erlauben und erneut versuchen.");
    return;
  }
  win.document.write(html);
  win.document.close();
}
