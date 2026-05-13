import type { DreyfusLevel, SkillCategory, Participant } from "../types";
import { evaluationModelFor, stageLabelsFor } from "../types";

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
  padding-bottom:72px;
}
.site-header{background:var(--s800);color:#fff;box-shadow:0 2px 8px rgba(0,0,0,.2)}
.header-inner{
  max-width:860px;margin:0 auto;padding:20px 24px;
  display:flex;align-items:flex-start;justify-content:space-between;gap:20px;
}
.header-title{font-size:17px;font-weight:700;letter-spacing:-.01em}
.header-sub{font-size:13px;color:rgba(255,255,255,.55);margin-top:3px}
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
.skill-desc{font-size:13px;color:var(--s500);line-height:1.65;margin-bottom:12px}
.anchor-btn{
  display:inline-flex;align-items:center;gap:5px;background:none;border:none;
  font-size:12px;color:var(--s400);cursor:pointer;padding:0;margin-bottom:8px;
  transition:color .15s;font-family:inherit;
}
.anchor-btn:hover{color:var(--s600)}
.anchor-box{
  background:var(--s50);border:1px solid var(--s200);border-radius:8px;
  padding:12px 14px;margin-bottom:14px;
}
.anchor-item{font-size:12px;color:var(--s600);margin-bottom:7px;line-height:1.5}
.anchor-item:last-child{margin-bottom:0}
.anchor-lvl{font-weight:600;color:var(--s700)}
.rating-row{display:flex;flex-direction:column;gap:8px;margin-top:14px}
.rating-status{font-size:11px;color:var(--s400);font-weight:500}
.rating-status.ok{color:var(--em600);font-weight:600}
.rating-btns{display:flex;gap:6px;flex-wrap:wrap}
.rb{
  width:48px;height:44px;border:1.5px solid var(--s200);border-radius:8px;
  background:#fff;cursor:pointer;font-size:17px;font-weight:700;
  color:var(--s600);transition:border-color .1s,background .1s,color .1s;
  font-family:inherit;
}
.rb:hover{border-color:var(--s300);background:var(--s50)}
.rb.sel{background:var(--s800);border-color:var(--s800);color:#fff}
.save-bar{
  position:fixed;bottom:0;left:0;right:0;background:#fff;
  border-top:1px solid var(--s200);padding:12px 24px;
  display:flex;align-items:center;justify-content:center;gap:20px;
  z-index:100;box-shadow:0 -4px 16px rgba(0,0,0,.06);
}
.progress{font-size:13px;color:var(--s500);font-weight:500}
.btn-save{
  background:var(--s800);color:#fff;border:none;padding:11px 28px;
  border-radius:8px;font-size:14px;font-weight:600;cursor:pointer;
  transition:background .15s;font-family:inherit;
}
.btn-save:hover{background:var(--s700)}
@media(max-width:640px){
  .header-inner{padding:14px 16px}
  .main{padding:20px 14px}
  .save-bar{padding:10px 14px;gap:12px}
  .rb{width:42px;height:40px;font-size:15px}
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

  for (const cat of categories) {
    const activeSkills = cat.skills.filter((s) => !s.disabled);
    if (activeSkills.length === 0) continue;

    skillsHtml += `<section class="category">\n<h2 class="category-title">${esc(cat.name)}</h2>\n`;

    for (const skill of activeSkills) {
      const model = evaluationModelFor(skill, cat.name);
      const labels = stageLabelsFor(model);
      const rawAnchors = skill.anchors ?? {};
      const id = sanitizeId(skill.name);

      const anchors: AnchorEntry[] = ([1, 2, 3, 4, 5] as const).map((l) => ({
        level: l,
        label: labels[l as DreyfusLevel],
        text: rawAnchors[l] ?? "",
      }));

      skillEntries.push({ id, name: skill.name, anchors });

      const badgeClass =
        skill.dep === "Durable" ? "badge-d" : skill.dep === "Evolving" ? "badge-e" : "badge-p";
      const hasAnchors = anchors.some((a) => a.text);

      skillsHtml += `<div class="skill-card">\n`;
      skillsHtml += `<div class="skill-header"><span class="skill-name">${esc(skill.name)}</span>`;
      skillsHtml += `<span class="badge ${badgeClass}">${esc(skill.dep)}</span></div>\n`;

      if (skill.description) {
        skillsHtml += `<p class="skill-desc">${esc(skill.description)}</p>\n`;
      }

      if (hasAnchors) {
        skillsHtml += `<button class="anchor-btn" id="atbtn-${id}" onclick="toggleAnchors('${id}')">`;
        skillsHtml += `<span id="aticon-${id}">▶</span> Verhaltensanker anzeigen</button>\n`;
        skillsHtml += `<div class="anchor-box" id="abox-${id}" hidden>\n`;
        for (const a of anchors) {
          if (!a.text) continue;
          skillsHtml += `<div class="anchor-item"><span class="anchor-lvl">${a.level} (${esc(a.label)}):</span> ${esc(a.text)}</div>\n`;
        }
        skillsHtml += `</div>\n`;
      }

      skillsHtml += `<div class="rating-row">\n`;
      skillsHtml += `<span class="rating-status" id="rs-${id}">Noch nicht bewertet</span>\n`;
      skillsHtml += `<div class="rating-btns">`;

      for (const a of anchors) {
        skillsHtml += `<button class="rb" data-skill="${id}" data-level="${a.level}" `;
        skillsHtml += `title="${a.level} – ${esc(a.label)}" onclick="rate('${id}',${a.level})">${a.level}</button>`;
      }

      skillsHtml += `</div>\n</div>\n</div>\n`;
    }

    skillsHtml += `</section>\n`;
  }

  const total = skillEntries.length;
  const createdDate = new Date().toISOString().slice(0, 10);
  const participantSafe = sanitizeFilename(participant.name);
  const roleSafe = sanitizeFilename(departmentName);

  const surveyJson = JSON.stringify({
    teilnehmer: participant.name,
    teilnehmerSafe: participantSafe,
    rolle: departmentName,
    gruppe: groupName,
    skills: skillEntries,
  }).replace(/<\/script>/gi, "<\\/script>");

  const html = `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Skill-Selbsteinschätzung — ${esc(departmentName)} — ${esc(participant.name)}</title>
<style>${CSS}</style>
</head>
<body>
<header class="site-header">
  <div class="header-inner">
    <div>
      <div class="header-title">Skill-Selbsteinschätzung</div>
      <div class="header-sub">${esc(departmentName)}${groupName ? ` · ${esc(groupName)}` : ""}</div>
    </div>
    <div>
      <div class="participant-chip">${esc(participant.name)}</div>
      <div class="created">${createdDate}</div>
    </div>
  </div>
</header>
<main class="main">
  <div class="instructions">
    <strong>Anleitung:</strong> Bewerte jeden Skill auf einer Skala von 1 (Einstieg) bis 5 (Experte).
    Klicke auf die Zahl, die deinem aktuellen Stand entspricht — ein zweiter Klick hebt die Auswahl auf.
    Die Verhaltensanker je Skill helfen dir bei der Einordnung.
    Lasse Skills, die du nicht kennst oder nicht bewerten kannst, frei.
    Klicke am Ende auf <strong>„Ergebnisse speichern"</strong> und schicke die Datei zurück.
  </div>
  ${skillsHtml}
</main>
<div class="save-bar">
  <span class="progress" id="prog">0 / ${total} bewertet</span>
  <button class="btn-save" onclick="save()">Ergebnisse speichern ↓</button>
</div>
<script>
const S = ${surveyJson};

function updateProg() {
  const n = S.skills.filter(s => document.querySelector('[data-skill="'+s.id+'"].sel')).length;
  document.getElementById('prog').textContent = n + ' / ' + S.skills.length + ' bewertet';
}

function rate(skillId, level) {
  const btn = document.querySelector('[data-skill="'+skillId+'"][data-level="'+level+'"]');
  const was = btn.classList.contains('sel');
  document.querySelectorAll('[data-skill="'+skillId+'"]').forEach(b => b.classList.remove('sel'));
  const el = document.getElementById('rs-'+skillId);
  if (!was) {
    btn.classList.add('sel');
    const sk = S.skills.find(s => s.id === skillId);
    const anc = sk && sk.anchors.find(a => a.level === level);
    el.textContent = 'Stufe ' + level + ' – ' + (anc ? anc.label : '');
    el.className = 'rating-status ok';
  } else {
    el.textContent = 'Noch nicht bewertet';
    el.className = 'rating-status';
  }
  updateProg();
}

function toggleAnchors(id) {
  const box = document.getElementById('abox-'+id);
  const icon = document.getElementById('aticon-'+id);
  const btn = document.getElementById('atbtn-'+id);
  const hidden = box.hasAttribute('hidden');
  if (hidden) {
    box.removeAttribute('hidden');
    icon.textContent = '▼';
    btn.childNodes[1].textContent = ' Verhaltensanker ausblenden';
  } else {
    box.setAttribute('hidden','');
    icon.textContent = '▶';
    btn.childNodes[1].textContent = ' Verhaltensanker anzeigen';
  }
}

function save() {
  const ratings = {};
  S.skills.forEach(sk => {
    const sel = document.querySelector('[data-skill="'+sk.id+'"].sel');
    if (sel) ratings[sk.name] = parseInt(sel.getAttribute('data-level'), 10);
  });
  const out = {
    teilnehmer: S.teilnehmer,
    rolle: S.rolle,
    gruppe: S.gruppe,
    datum: new Date().toISOString().slice(0,10),
    bewertungen: ratings
  };
  const blob = new Blob([JSON.stringify(out, null, 2)], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Selbsteinschaetzung_' + S.teilnehmerSafe + '_' + out.datum + '.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 0);
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
