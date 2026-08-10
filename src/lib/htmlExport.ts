import type { DreyfusLevel, SkillCategory, Participant } from "../types";
import { stageLabelsFor } from "../types";

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function sanitizeId(s: string): string {
  return s.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase();
}

function sanitizeFilename(s: string): string {
  return s.replace(/[^a-zA-Z0-9_\-]+/g, "_").replace(/^_+|_+$/g, "");
}

interface AnchorEntry {
  level: number;
  label: string;
  text: string;
}

interface SkillJsonEntry {
  id: string;
  name: string;
  category: string;
  dep: string;
  source: string;
  anchors: AnchorEntry[];
}

const CSS = `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --s50:#f8fafc;--s100:#f1f5f9;--s200:#e2e8f0;--s300:#cbd5e1;
  --s400:#94a3b8;--s500:#64748b;--s600:#475569;--s700:#334155;
  --s800:#1e293b;--em600:#059669;--em50:#ecfdf5;
}
body{
  font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",system-ui,sans-serif;
  background:var(--s100);color:var(--s800);line-height:1.5;font-size:15px;
}
.site-header{background:var(--s800);color:#fff;box-shadow:0 2px 8px rgba(0,0,0,.2)}
.header-inner{
  max-width:860px;margin:0 auto;padding:20px 24px;
  display:flex;align-items:flex-start;justify-content:space-between;gap:20px;
}
.header-title{font-size:17px;font-weight:700;letter-spacing:-.01em}
.header-sub{font-size:13px;color:rgba(255,255,255,.55);margin-top:3px}
.header-meta{font-size:11px;color:rgba(255,255,255,.35);margin-top:5px;letter-spacing:.01em}
.participant-chip{
  font-size:13px;font-weight:600;
  background:rgba(255,255,255,.15);padding:4px 12px;
  border-radius:20px;display:inline-block;
}
.created{font-size:11px;color:rgba(255,255,255,.45);margin-top:4px;text-align:right}
.main{max-width:860px;margin:0 auto;padding:28px 24px}
.instructions{
  background:#fff;border:1px solid var(--s200);border-radius:12px;
  padding:16px 20px;margin-bottom:32px;font-size:13px;
  color:var(--s600);line-height:1.7;
}
.category{margin-bottom:40px}
.category-title{
  font-size:10px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;
  color:var(--s400);margin-bottom:12px;padding-bottom:10px;
  border-bottom:1.5px solid var(--s200);
  display:flex;align-items:center;gap:8px;
}
.cat-count{
  font-size:10px;font-weight:700;background:var(--s200);color:var(--s500);
  border-radius:20px;padding:1px 7px;letter-spacing:0;text-transform:none;
  flex-shrink:0;
}
.skill-card{
  background:#fff;border:1.5px solid var(--s200);border-radius:12px;
  padding:20px 22px;margin-bottom:10px;
}
.skill-header{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:8px}
.skill-name{font-size:15px;font-weight:600;color:var(--s800)}
.badge{
  font-size:10px;font-weight:700;padding:2px 9px;border-radius:20px;
  text-transform:uppercase;letter-spacing:.04em;flex-shrink:0;
}
.badge-d{background:#d1fae5;color:#065f46}
.badge-e{background:#dbeafe;color:#1e40af}
.badge-p{background:#fef3c7;color:#92400e}
.badge-core{background:#f1f5f9;color:#475569}
.badge-spec{background:#ede9fe;color:#5b21b6}
.skill-badges{display:flex;align-items:center;gap:6px;flex-shrink:0;flex-wrap:wrap;justify-content:flex-end}
.skill-desc{font-size:13px;color:var(--s500);line-height:1.65;margin-bottom:12px}
.rating-row{display:flex;flex-direction:column;gap:8px;margin-top:14px}
.rating-status{font-size:11px;color:var(--s400);font-weight:500}
.rating-status.ok{color:var(--em600);font-weight:600}
.rating-options{display:flex;flex-direction:column;gap:6px}
.ro{
  display:flex;align-items:flex-start;gap:10px;width:100%;text-align:left;
  border:1.5px solid var(--s200);border-radius:8px;background:#fff;
  padding:9px 12px;cursor:pointer;font-family:inherit;
  transition:border-color .1s,background .1s;
}
.ro:hover{border-color:var(--s300);background:var(--s50)}
.ro.sel{background:var(--s800);border-color:var(--s800)}
.ro.sel .ro-num{background:#fff;color:var(--s800)}
.ro.sel .ro-label{color:#fff}
.ro.sel .ro-text{color:rgba(255,255,255,.75)}
.ro-num{
  flex-shrink:0;width:26px;height:26px;border-radius:6px;background:var(--s100);
  color:var(--s600);display:flex;align-items:center;justify-content:center;
  font-size:13px;font-weight:700;
}
.ro-body{font-size:12.5px;line-height:1.5}
.ro-label{font-weight:700;color:var(--s700)}
.ro-text{color:var(--s500)}
.action-bar{
  background:#fff;border:1px solid var(--s200);border-radius:12px;
  padding:14px 20px;margin-bottom:32px;
  display:flex;align-items:center;flex-wrap:wrap;gap:12px;
}
.progress{font-size:13px;color:var(--s500);font-weight:500;margin-right:auto}
.btn-save{
  background:var(--s800);color:#fff;border:none;padding:10px 22px;
  border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;
  transition:background .15s;font-family:inherit;
}
.btn-save:hover{background:var(--s700)}
.btn-secondary{
  background:#fff;color:var(--s700);border:1.5px solid var(--s300);
  padding:9px 18px;border-radius:8px;font-size:13px;font-weight:500;cursor:pointer;
  transition:background .15s,border-color .15s;font-family:inherit;
}
.btn-secondary:hover{background:var(--s50);border-color:var(--s400)}
@media(max-width:640px){
  .header-inner{padding:14px 16px}
  .main{padding:20px 14px}
  .action-bar{gap:8px}
  .ro-num{width:22px;height:22px;font-size:12px}
}
@media print{
  @page{size:A4;margin:normal}
  *{-webkit-print-color-adjust:exact;print-color-adjust:exact}
  body{background:#fff;font-size:11px;margin:0;padding:0}
  .site-header{box-shadow:none;page-break-after:avoid;break-after:avoid}
  .header-inner{padding:12px 16px}
  .header-title{font-size:14px}
  .header-sub{font-size:11px}
  .header-meta{font-size:10px}
  .main{padding:12px 16px}
  .action-bar{display:none!important}
  .instructions{display:none!important}
  .ro-body{display:none!important}
  .rating-options{display:flex!important;flex-direction:row!important;gap:4px!important}
  .ro{width:22px;height:22px;padding:0;border-width:1px;border-color:#cbd5e1;border-radius:5px;justify-content:center}
  .ro .ro-num{background:transparent;color:#94a3b8;font-size:11px}
  .ro.sel{background:#1e293b!important;border-color:#1e293b!important}
  .ro.sel .ro-num{color:#fff!important}
  .ro:not(.sel){opacity:0.3}
  .rating-status{font-size:10px;font-weight:600;color:#059669}
  .rating-status:not(.ok){display:none}
  .skill-card{break-inside:avoid;page-break-inside:avoid;border-color:#e2e8f0;margin-bottom:6px;padding:10px 14px}
  .category{margin-bottom:16px}
  .category-title{break-after:avoid;page-break-after:avoid}
  .skill-name{font-size:12px}
  .skill-desc{font-size:11px;margin-bottom:6px}
  .badge{font-size:9px;padding:1px 6px}
  .category-title{font-size:9px;margin-bottom:8px;padding-bottom:6px}
}
`;

export function exportAssessmentTemplateHtml(
  categories: SkillCategory[],
  participant: Participant,
  departmentName: string,
  groupName: string = "",
) {
  const skillEntries: SkillJsonEntry[] = [];
  let skillsHtml = "";

  // Determine whether any specialization skills are present so we know
  // whether to render source badges at all.
  const hasSpecSkills = categories.some((cat) =>
    cat.skills.some(
      (s) => !s.disabled && s.sourceLabel && s.sourceLabel !== departmentName,
    ),
  );

  // Build subtitle: departmentName + selected specialization names.
  const specRoles = participant.specializationRoles ?? [];
  const subtitleParts = [departmentName, ...specRoles];
  const subtitle = subtitleParts.join(" · ");

  for (const cat of categories) {
    const activeSkills = cat.skills.filter((s) => !s.disabled);
    if (activeSkills.length === 0) continue;

    skillsHtml += `<section class="category">\n<h2 class="category-title">${esc(cat.name)}<span class="cat-count">${activeSkills.length}</span></h2>\n`;

    for (const skill of activeSkills) {
      const labels = stageLabelsFor();
      const rawAnchors = skill.anchors ?? {};
      const id = sanitizeId(skill.name);

      const anchors: AnchorEntry[] = ([1, 2, 3, 4, 5] as const).map((l) => ({
        level: l,
        label: labels[l as DreyfusLevel],
        text: rawAnchors[l] ?? "",
      }));

      const source =
        skill.sourceLabel && skill.sourceLabel !== departmentName
          ? skill.sourceLabel
          : "Core";
      skillEntries.push({ id, name: skill.name, category: cat.name, dep: skill.dep, source, anchors });

      const badgeClass =
        skill.dep === "Durable" ? "badge-d" : skill.dep === "Evolving" ? "badge-e" : "badge-p";

      // Source badge: "Core" (gray) or specialization name (violet).
      const isSpec =
        hasSpecSkills &&
        skill.sourceLabel &&
        skill.sourceLabel !== departmentName;
      const sourceLabel = isSpec ? skill.sourceLabel! : "Core";
      const sourceBadgeClass = isSpec ? "badge-spec" : "badge-core";

      skillsHtml += `<div class="skill-card">\n`;
      skillsHtml += `<div class="skill-header"><span class="skill-name">${esc(skill.name)}</span>`;
      skillsHtml += `<div class="skill-badges">`;
      if (hasSpecSkills) {
        skillsHtml += `<span class="badge ${sourceBadgeClass}">${esc(sourceLabel)}</span>`;
      }
      skillsHtml += `<span class="badge ${badgeClass}">${esc(skill.dep)}</span>`;
      skillsHtml += `</div></div>\n`;

      if (skill.description) {
        skillsHtml += `<p class="skill-desc">${esc(skill.description)}</p>\n`;
      }

      skillsHtml += `<div class="rating-row">\n`;
      skillsHtml += `<span class="rating-status" id="rs-${id}">Noch nicht bewertet</span>\n`;
      skillsHtml += `<div class="rating-options">`;

      for (const a of anchors) {
        const body = a.text
          ? `<span class="ro-label">${esc(a.label)}</span><br><span class="ro-text">${esc(a.text)}</span>`
          : `<span class="ro-label">${esc(a.label)}</span>`;
        skillsHtml += `<button class="ro" data-skill="${id}" data-level="${a.level}" onclick="rate('${id}',${a.level})">`;
        skillsHtml += `<span class="ro-num">${a.level}</span><span class="ro-body">${body}</span>`;
        skillsHtml += `</button>`;
      }

      skillsHtml += `</div>\n</div>\n</div>\n`;
    }

    skillsHtml += `</section>\n`;
  }

  const total = skillEntries.length;
  const createdDate = new Date().toISOString().slice(0, 10);
  const participantSafe = sanitizeFilename(participant.name);
  const roleSafe = sanitizeFilename(departmentName);

  // JSON stored in a separate <script type="application/json"> tag so it
  // cannot interfere with the JavaScript parser. Only </ needs escaping to
  // prevent the HTML parser from treating it as a closing </script> tag.
  const surveyJson = JSON.stringify({
    teilnehmer: participant.name,
    teilnehmerSafe: participantSafe,
    rolle: departmentName,
    gruppe: groupName,
    skills: skillEntries,
  }).replace(/<\//g, "<\/");

  const html = `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Skill-Selbsteinschätzung — ${esc(departmentName)} — ${esc(participant.name)}</title>
<style>${CSS}</style>
<script src="https://cdn.sheetjs.com/xlsx-0.20.3/package/dist/xlsx.full.min.js"></script>
</head>
<body>
<header class="site-header">
  <div class="header-inner">
    <div>
      <div class="header-title">Skill-Selbsteinschätzung</div>
      <div class="header-sub">${esc(subtitle)}</div>
      <div class="header-meta">${total} Skills · ${categories.filter((c) => c.skills.some((s) => !s.disabled)).length} Kategorien</div>
    </div>
    <div>
      <div class="participant-chip">${esc(participant.name)}</div>
      <div class="created">${createdDate}</div>
    </div>
  </div>
</header>
<main class="main">
  <div class="instructions">
    <strong>Anleitung:</strong> Waehle bei jedem Skill die Beschreibung, die deinem aktuellen Stand am
    besten entspricht — ein zweiter Klick hebt die Auswahl auf.
    Lasse Skills, die du nicht kennst oder nicht bewerten kannst, frei.
  </div>
  <div class="action-bar">
    <span class="progress" id="prog">0 / ${total} bewertet</span>
    <button class="btn-secondary" onclick="exportPdf()">🖨 PDF</button>
    <button class="btn-secondary" onclick="exportXlsx()">📊 Excel (.xlsx)</button>
    <button class="btn-save" onclick="save()">💾 Ergebnisse speichern</button>
  </div>
  ${skillsHtml}
</main>
<script type="application/json" id="__sd">${surveyJson}</script>
<script>
var S = JSON.parse(document.getElementById('__sd').textContent);

function updateProg() {
  var n = 0;
  S.skills.forEach(function(s) {
    if (document.querySelector('[data-skill="'+s.id+'"].sel')) n++;
  });
  document.getElementById('prog').textContent = n + ' / ' + S.skills.length + ' bewertet';
}

function rate(skillId, level) {
  var btn = document.querySelector('[data-skill="'+skillId+'"][data-level="'+level+'"]');
  var was = btn.classList.contains('sel');
  document.querySelectorAll('[data-skill="'+skillId+'"]').forEach(function(b) { b.classList.remove('sel'); });
  var el = document.getElementById('rs-'+skillId);
  if (!was) {
    btn.classList.add('sel');
    var sk = null;
    for (var i = 0; i < S.skills.length; i++) { if (S.skills[i].id === skillId) { sk = S.skills[i]; break; } }
    var anc = null;
    if (sk) { for (var j = 0; j < sk.anchors.length; j++) { if (sk.anchors[j].level === level) { anc = sk.anchors[j]; break; } } }
    el.textContent = 'Stufe ' + level + ' – ' + (anc ? anc.label : '');
    el.className = 'rating-status ok';
  } else {
    el.textContent = 'Noch nicht bewertet';
    el.className = 'rating-status';
  }
  updateProg();
}

function exportPdf() {
  window.print();
}

function dl(filename, mime, content) {
  var a = document.createElement('a');
  a.setAttribute('href', 'data:' + mime + ',' + encodeURIComponent(content));
  a.setAttribute('download', filename);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function exportXlsx() {
  var date = new Date().toISOString().slice(0, 10);
  var rows = [['Teilnehmer','Rolle','Datum','Kategorie','Quelle','Skill','Haltbarkeit','Bewertung (1-5)']];
  for (var i = 0; i < S.skills.length; i++) {
    var sk = S.skills[i];
    var sel = document.querySelector('[data-skill="'+sk.id+'"].sel');
    var level = sel ? parseInt(sel.getAttribute('data-level'), 10) : '';
    rows.push([S.teilnehmer, S.rolle, date, sk.category, sk.source, sk.name, sk.dep, level]);
  }
  var wb = XLSX.utils.book_new();
  var ws = XLSX.utils.aoa_to_sheet(rows);
  ws['!cols'] = [{wch:20},{wch:22},{wch:12},{wch:25},{wch:22},{wch:40},{wch:12},{wch:15}];
  XLSX.utils.book_append_sheet(wb, ws, 'Selbsteinschaetzung');
  XLSX.writeFile(wb, 'Selbsteinschaetzung_'+S.teilnehmerSafe+'_'+date+'.xlsx');
}

function save() {
  var ratings = {};
  for (var i = 0; i < S.skills.length; i++) {
    var sk = S.skills[i];
    var sel = document.querySelector('[data-skill="'+sk.id+'"].sel');
    if (sel) ratings[sk.name] = parseInt(sel.getAttribute('data-level'), 10);
  }
  var out = {
    teilnehmer: S.teilnehmer,
    rolle: S.rolle,
    gruppe: S.gruppe,
    datum: new Date().toISOString().slice(0, 10),
    bewertungen: ratings
  };
  dl('Selbsteinschaetzung_'+S.teilnehmerSafe+'_'+out.datum+'.json',
     'application/json', JSON.stringify(out, null, 2));
}
</script>
</body>
</html>`;

  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `Skill-Selbsteinschaetzung_${roleSafe}_${participantSafe}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 0);
}
