const fs = require('fs');
const vm = require('vm');
const assert = require('assert');
const html = fs.readFileSync('index.html', 'utf8');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && f !== 'generateur-projet.html');
for (const file of files) {
  const source = fs.readFileSync(file, 'utf8');
  for (const script of source.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)) new vm.Script(script[1], {filename: file});
  for (const match of source.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const value = match[1];
    if (/^(https?:|data:|mailto:|tel:)/.test(value) || value === '#') continue;
    const [relative, id] = value.split('#');
    const path = decodeURIComponent(relative || file);
    assert(fs.existsSync(path), `${file}: missing ${path}`);
    if (id && path.endsWith('.html')) assert(fs.readFileSync(path, 'utf8').includes(`id="${id}"`), `${file}: missing #${id}`);
  }
}
assert.deepEqual([...html.matchAll(/data-group="([^"]+)"/g)].map(m=>m[1]), ['dev','design','data']);
assert(!/class="proj-link[^"]*todo-link/.test(html));
for (const url of ['https://housalstudio.vercel.app/','https://rz-concept-website.vercel.app/','https://www.tamraghtscooter.com/']) assert(html.includes(url));
const types = [...html.matchAll(/class="proj-card[^>]+data-type="([^"]+)"/g)].map(m=>m[1]);
assert.equal(types.length,23);
assert.deepEqual(types.slice(0,3),['dev','dev','dev']);
const groups=['dev','design','data'].map(type=>({dataset:{group:type},hidden:false}));
const buttons=['all','dev','design','data'].map(type=>({dataset:{filter:type},classList:{toggle(){}},setAttribute(){}}));
const cards=types.map(type=>({dataset:{type},classList:{add(){}}}));
const status={};
const context={document:{querySelectorAll:s=>s==='.filt-btn'?buttons:s==='.project-group'?groups:cards,getElementById:()=>status}};
const filter=html.slice(html.indexOf('function filterProjects(type)'),html.indexOf("document.querySelectorAll('.filt-btn').forEach(btn=>btn.addEventListener"));
vm.createContext(context);vm.runInContext(filter,context);
for (const type of ['data','dev','design','all','dev','all']) {
  context.filterProjects(type);
  groups.forEach(g=>assert.equal(g.hidden,type!=='all'&&g.dataset.group!==type));
  assert(status.textContent.startsWith(String(type==='all'?23:types.filter(t=>t===type).length)));
}
let submit;
const fields=[{value:'Nour'},{value:'nour@example.com'},{value:'Projet & détails'},{value:'Bonjour\nMon projet'}];
const formContext={document:{getElementById:id=>id==='contact-form'?{addEventListener:(event,fn)=>submit=fn}:status},window:{location:{}}};
const form=html.slice(html.indexOf("document.getElementById('contact-form').addEventListener"),html.indexOf('/* ══ HOVER'));
vm.runInNewContext(form,formContext);submit.call({querySelectorAll:()=>fields},{preventDefault(){}});
assert(formContext.window.location.href.startsWith('mailto:sarakhinourelhouda@gmail.com?'));
assert(formContext.window.location.href.includes(encodeURIComponent('Projet & détails')));
assert(!status.textContent.includes('Envoyé'));
console.log('PASS: local files/anchors, JavaScript syntax, project order, repeated filtering and honest email handoff.');
