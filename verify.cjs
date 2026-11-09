// Contrôle rapide du site : node verify.cjs
const fs = require('fs');
const vm = require('vm');
const assert = require('assert');

const html = fs.readFileSync('index.html', 'utf8');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && f !== 'generateur-projet.html');

// 1. Fichiers locaux, ancres et syntaxe JavaScript de chaque page
for (const file of files) {
  const source = fs.readFileSync(file, 'utf8');
  for (const script of source.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)) new vm.Script(script[1], {filename: file});
  for (const match of source.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const value = match[1];
    if (/^(https?:|data:|mailto:|tel:)/.test(value) || value === '#') continue;
    const [relative, id] = value.split('#');
    const path = decodeURIComponent((relative || file).split('?')[0]);
    assert(fs.existsSync(path), `${file}: fichier manquant ${path}`);
    if (id) assert(fs.readFileSync(path, 'utf8').includes(`id="${id}"`), `${file}: ancre manquante #${id}`);
  }
}

// 2. Sites publics et projets attendus sur la page d'accueil
for (const url of ['https://housalstudio.vercel.app/', 'https://rz-concept-website.vercel.app/', 'https://www.tamraghtscooter.com/']) assert(html.includes(url), `lien manquant ${url}`);
for (const page of ['exportauto.html', 'oceanpalace.html','rz-concept.html', 'ecokephyra.html', 'housal.html', 'dar-limon.html']) assert(html.includes(`href="${page}"`), `projet manquant ${page}`);
assert(!/todo-link|lien à venir/.test(html), 'bouton « à venir » restant');
assert(!/freelance/i.test(html), 'mention freelance restante');

// 3. Les compteurs des filtres correspondent aux cartes
const types = [...html.matchAll(/<article class="proj[^"]*" data-type="([^"]+)"/g)].map(m => m[1]);
const count = t => types.filter(x => x === t).length;
const sup = f => +(html.match(new RegExp(`data-filter="${f}">[^<]*<sup>(\\d+)</sup>`)) || [])[1];
assert.equal(sup('all'), types.length, 'compteur Tous');
assert.equal(sup('web'), count('web'), 'compteur Web');
assert.equal(sup('mobile'), count('mobile'), 'compteur Mobile');

// 4. Le formulaire prépare un e-mail, sans fausse confirmation d'envoi
const formCode = html.slice(html.indexOf("document.getElementById('contact-form')"), html.lastIndexOf('</script>'));
let submit;
const btn = {innerHTML: ''};
const location = {};
const form = {addEventListener: (e, fn) => (submit = fn)};
vm.runInNewContext(formCode, {document: {getElementById: () => form}, location, encodeURIComponent, setTimeout: () => {}});
submit.call({elements: {name: {value: 'Nour'}, email: {value: 'nour@example.com'}, subject: {value: 'Projet & détails'}, message: {value: 'Bonjour'}}, querySelector: () => btn}, {preventDefault() {}});
assert(location.href.startsWith('mailto:sarakhinourelhouda@gmail.com?'));
assert(location.href.includes(encodeURIComponent('Projet & détails')));
assert(!/Envoyé/.test(btn.innerHTML));

console.log(`OK : ${files.length} pages, fichiers et ancres, JavaScript, ${types.length} projets, filtres et formulaire.`);
