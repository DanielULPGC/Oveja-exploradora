'use strict';
/* Lola 3.0 · Un prado para todos
   Arquitectura: cada escena declara un tipo de actividad; cada tipo tiene su renderizador.
   Sin dependencias externas. Estado guardado solo en este navegador (localStorage, con try/catch). */

/* ---------- 1. Contenido ---------- */

const OBJETOS = {
  castillo: { emoji: '🏰', nombre: 'el castillo' },
  dragon:   { emoji: '🐉', nombre: 'el dragón' },
  cohete:   { emoji: '🚀', nombre: 'el cohete' },
  barco:    { emoji: '🏴‍☠️', nombre: 'el barco pirata' }
};

const LIBROS = [
  { color: '#c8423b', nombre: 'rojo' },
  { color: '#2f6fc0', nombre: 'azul' },
  { color: '#3d9a4f', nombre: 'verde' },
  { color: '#e8b42a', nombre: 'amarillo' },
  { color: '#8a55c2', nombre: 'morado' },
  { color: '#e07a2b', nombre: 'naranja' }
];

const SCENES = [
  {
    id: 's1', type: 'emociones',
    title: 'Lola y las preguntas del prado', topic: 'Emociones y pertenencia',
    image: 'assets/escena-1-prado.png', ratio: '844 / 598',
    caption: 'Lola, una oveja de lana oscura con gafas, abraza un libro. Al fondo, otras ovejas blancas ríen y saltan.',
    text: 'En un prado lleno de ovejas blancas vivía Lola. Su lana era oscura, llevaba gafas redondas y le encantaban los libros. Mientras algunas ovejas saltaban, ella imaginaba aventuras entre las páginas. Un día escuchó una risa y se preguntó: «¿Hay algo malo en que me gusten cosas distintas?». Se quedó pensativa junto a su árbol favorito.',
    emotions: ['😢 Triste', '😔 Sola', '😟 Preocupada', '🤔 Curiosa', '😊 Contenta'],
    clues: [
      { id: 'risas-izq', label: 'Ovejas que ríen', x: 0, y: 22, w: 29, h: 42, text: 'Las otras ovejas ríen y saltan juntas.' },
      { id: 'cara', label: 'Cara de Lola', x: 37, y: 26, w: 34, h: 30, text: 'Lola tiene la boca cerrada y mira hacia un lado.' },
      { id: 'libro', label: 'Libro de Lola', x: 42, y: 57, w: 17, h: 29, text: 'Lola abraza su libro con fuerza.' },
      { id: 'risas-der', label: 'Más ovejas que ríen', x: 71, y: 25, w: 29, h: 30, text: 'Las ovejas del fondo juegan lejos de Lola.' }
    ],
    guide: 'No hay una respuesta única. Pregunte «¿cómo lo sabes?» y anime a buscar pistas en la imagen. Termine con la tarjeta «¿Y tú?»: conecte la emoción de Lola con experiencias del grupo, sin forzar a nadie a contar algo personal.',
    indicators: [
      ['s1a', 'Nombra al menos una emoción de Lola', 'A1 crit. 4.2'],
      ['s1b', 'Justifica la emoción con una pista del cuento o de la imagen', 'A3 crit. 2.1'],
      ['s1c', 'Relaciona la emoción con una vivencia propia', 'A1 crit. 2.1']
    ]
  },
  {
    id: 's2', type: 'conteo',
    title: 'El consejo del búho', topic: 'Contar y dialogar',
    image: 'assets/escena-2-buho.webp', ratio: '875 / 630',
    caption: 'Lola, con su mochila roja, habla con el búho Bruno, que está posado en la rama de un árbol lleno de libros.',
    text: 'El búho Bruno escuchó a Lola con atención. «No necesitas ser igual que las demás para formar parte del prado», le dijo. «Cada oveja tiene intereses diferentes y todas merecen respeto». Bruno miró la mochila de Lola. «¿Me enseñas los libros que llevas ahí?». Lola sonrió: alguien quería escucharla.',
    hotspots: [{ id: 'mochila', label: 'Mochila de Lola', x: 10, y: 62, w: 28, h: 27 }],
    target: 4,
    guide: 'Deje que cuente señalando con el dedo cada libro. Si duda en «¿cuántos hay?», pregunte «¿qué número dijiste al tocar el último?». La parte de dar libros a Bruno comprueba el camino inverso, del número a la cantidad. El reto del tercer libro es opcional. En las páginas 2 y 3, Bruno acompaña a Lola y es quien ofrece las pistas y el modelado cuando hacen falta.',
    indicators: [
      ['s2a', 'Cuenta tocando un libro por cada número (correspondencia uno a uno)', 'A2 crit. 1.2'],
      ['s2b', 'Reconoce que el último número dicho indica cuántos hay', 'A2 crit. 1.2'],
      ['s2c', 'Forma una colección con el número pedido', 'A2 crit. 1.2'],
      ['s2d', 'Utiliza el ordinal («el tercero») (reto opcional)', 'A2 saber I.4']
    ]
  },
  {
    id: 's3', type: 'letras',
    title: 'Las letras de una aventura', topic: 'Acercamiento a la lengua escrita',
    image: 'assets/escena-3-letras.webp', ratio: '878 / 603',
    caption: 'Lola, muy contenta, mira las letras de colores que salen volando de un libro abierto.',
    text: 'Lola abrió su libro favorito. En una página había una palabra que le hacía imaginar caminos imposibles: MAGIA. Bruno la leyó despacio y Lola descubrió sus letras. Después inventaron juntos una historia sobre una puerta secreta. No hacía falta saber leer todas las palabras para disfrutar de aquel momento.',
    word: 'MAGIA',
    initialOptions: [
      { letter: 'M', key: 'mano', emoji: '✋' },
      { letter: 'L', key: 'luna', emoji: '🌙' },
      { letter: 'S', key: 'sol', emoji: '☀️' }
    ],
    guide: 'La fase 1 compara sonidos iniciales de palabras (MAGIA, mano, luna, sol); no hace falta nombrar las letras. En MAGIA, la G delante de I suena como la J: no conviene detenerse en ella. La fase 3 es escritura libre: pida al niño o la niña que «lea» lo que ha escrito y valore su hipótesis, sin corregir.',
    indicators: [
      ['s3a', 'Identifica el sonido inicial comparando palabras', 'A3 saber III.5'],
      ['s3b', 'Compone la palabra a partir del modelo', 'A3 crit. 4.1'],
      ['s3c', 'Produce una escritura propia y la interpreta', 'A3 crit. 4.1; saber IV.1']
    ]
  },
  {
    id: 's4', type: 'relato',
    title: 'El libro que reunió al rebaño', topic: 'Imaginar y contar',
    image: 'assets/escena-4-aventuras.webp', ratio: '892 / 576',
    caption: 'Del libro de Lola salen un castillo, un dragón, un cohete y un barco pirata. Un gato duerme a su lado.',
    text: 'Al ver las ilustraciones, otras ovejas se acercaron. Lola les mostró un cohete, un dragón, un castillo y un barco pirata. Cada una imaginó una aventura diferente. Una quería viajar por el espacio; otra, explorar un bosque antiguo. Lola comprendió que compartir sus libros podía abrir muchas conversaciones.',
    hotspots: [
      { id: 'castillo', label: 'El castillo', x: 45, y: 0, w: 20, h: 34 },
      { id: 'dragon', label: 'El dragón', x: 69, y: 11, w: 17, h: 26 },
      { id: 'cohete', label: 'El cohete', x: 86, y: 2, w: 14, h: 22 },
      { id: 'barco', label: 'El barco pirata', x: 84, y: 29, w: 15, h: 26 }
    ],
    guide: 'Los dos objetos elegidos aparecerán al final del cuento. Acompañe el relato con las tres tarjetas, sin exigir un orden rígido. Puede escribir en la pizarra la historia que dicten. En esta página aparece la pequeña exploradora, una de las ovejas blancas, que quiere explorar un bosque antiguo: sirve para mostrar que en el rebaño también hay intereses distintos.',
    indicators: [
      ['s4a', 'Cuenta un relato con inicio, desarrollo y final', 'A3 crit. 3.4'],
      ['s4b', 'Usa palabras de tiempo (primero, después, al final)', 'A3 crit. 3.4'],
      ['s4c', 'Integra en su relato los dos objetos elegidos', 'A3 crit. 3.4; crit. 4.5']
    ]
  },
  {
    id: 's5', type: 'convivencia',
    title: 'Un prado para todos', topic: 'Ordenar la historia y convivir',
    image: 'assets/escena-5-convivencia.webp', ratio: '930 / 609',
    caption: 'Lola lee un libro grande rodeada de ovejas blancas que escuchan sonrientes. A su lado hay una pila de libros.',
    text: 'Desde entonces, las ovejas reservaron un momento para escuchar las historias de Lola y otro para compartir sus propios juegos. No todas disfrutaban de las mismas actividades, y eso estaba bien. Lola seguía siendo Lola: una oveja de lana oscura, gafas redondas y muchos cuentos. Ahora sabía que pertenecía al prado sin tener que dejar de ser ella misma.',
    sequence: [
      { id: 'q1', image: 'assets/escena-1-prado.png', label: 'Lola, pensativa, sola en el prado' },
      { id: 'q2', image: 'assets/escena-2-buho.webp', label: 'Lola habla con el búho Bruno' },
      { id: 'q3', image: 'assets/escena-5-convivencia.webp', label: 'Lola lee con todo el rebaño' }
    ],
    slots: ['Primero', 'Después', 'Al final'],
    options: [
      { id: 'turnos', text: 'Se turnan: un rato saltan y otro rato escuchan cuentos.', result: 'Primero saltaron hasta cansarse y, después, se tumbaron a escuchar a Lola.' },
      { id: 'juntas', text: 'Inventan juntas una historia que se juega saltando.', result: 'Cada salto era un capítulo de la aventura. ¡Nadie se quedó fuera!' },
      { id: 'invitar', text: 'Lola invita a quien quiera a leer con ella, y las demás juegan cerca.', result: 'Algunas ovejas leyeron con Lola y otras saltaron. Al final, se contaron lo que habían hecho.' },
      { id: 'bosque', text: 'Van juntas al bosque: exploran y, a la sombra de un árbol, Lola cuenta su historia.', result: 'La exploradora guio al rebaño con su brújula y, al llegar, todas escucharon a Lola. ¡Y hubo saltos por el camino!' },
      { id: 'otra', text: 'Tengo otra idea…', result: 'Cuéntale tu idea a tu maestra o a tu maestro. ¡Seguro que al prado le gusta!' }
    ],
    guide: 'En el dilema intervienen tres deseos: el de Lola, el de la pequeña exploradora y el del resto del rebaño. Todas las soluciones son válidas: lo importante es argumentar. Pregunte «¿cómo se sentiría Lola?, ¿y las demás?». El cierre propone llevar la idea al aula: organizar juntos un rincón de lectura donde quepan todos los gustos.',
    indicators: [
      ['s5a', 'Ordena la secuencia del cuento y la explica con palabras de tiempo', 'A2 crit. 1.5'],
      ['s5b', 'Propone una solución en la que todas puedan participar', 'A1 crit. 4.3'],
      ['s5c', 'Explica por qué elige esa solución', 'A1 crit. 4.2; A3 crit. 3.1']
    ]
  }
];

const NUMEROS = ['cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho'];
const LEVELS = [['', '—'], ['proceso', 'En proceso'], ['observado', 'Observado']];

/* Locución grabada (pendiente). Si se añaden archivos, p. ej. LOCUCION.s1 = 'audio/escena-1.mp3',
   se reproducen en lugar de la síntesis de voz del navegador. */
const LOCUCION = {};

/* ---------- 2. Estado y persistencia ---------- */

const STORE_KEY = 'lola30';
const freshActivity = () => ({
  s1: { emotions: [], clues: [], done: false },
  s2: { opened: false, counted: [], cardinal: null, given: [], done: false, ordinal: null },
  s3: { phase: 1, initial: null, placed: 0, free: '', freeDone: false, done: false },
  s4: { chosen: [], step: 0, done: false, met: false },
  s5: { order: [], decision: null, done: false }
});
const freshRecord = () => ({ code: '', levels: {}, notes: {} });

let app = {
  scene: 0,
  act: freshActivity(),
  record: freshRecord(),
  records: [],
  settings: { upper: false, large: false, slow: true, follow: true, sound: true, motion: false, rings: true }
};
const support = {}; // nivel de ayuda por actividad: no se guarda ni se registra

function load() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return;
    const saved = JSON.parse(raw);
    app = { ...app, ...saved, act: { ...freshActivity(), ...saved.act }, settings: { ...app.settings, ...saved.settings } };
  } catch { /* almacenamiento no disponible: se trabaja en memoria */ }
}
function save() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(app)); } catch { /* sin almacenamiento */ }
}

/* ---------- 3. Utilidades ---------- */

const $ = id => document.getElementById(id);
const el = (tag, attrs = {}, ...children) => {
  const n = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'class') n.className = v;
    else if (k === 'text') n.textContent = v;
    else if (k.startsWith('on')) n.addEventListener(k.slice(2), v);
    else if (v === true) n.setAttribute(k, '');
    else if (v !== false && v != null) n.setAttribute(k, v);
  }
  children.flat().forEach(c => c != null && n.append(c));
  return n;
};
const shuffle = arr => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const say = t => { $('feedback').textContent = ''; requestAnimationFrame(() => { $('feedback').textContent = t; }); };
const cur = () => SCENES[app.scene];
const deArt = n => n.startsWith('el ') ? 'del ' + n.slice(3) : 'de ' + n; // contracción de + el

let audioCtx = null;
function tone(kind) {
  react(kind);
  if (!app.settings.sound) return;
  try {
    audioCtx ??= new (window.AudioContext || window.webkitAudioContext)();
    const o = audioCtx.createOscillator(), g = audioCtx.createGain();
    o.type = 'sine';
    o.frequency.value = kind === 'ok' ? 660 : kind === 'done' ? 880 : 392;
    o.connect(g); g.connect(audioCtx.destination);
    g.gain.setValueAtTime(0.045, audioCtx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.22);
    o.start(); o.stop(audioCtx.currentTime + 0.23);
  } catch { /* sin audio */ }
}

/* Ayuda en tres niveles: 1 nueva oportunidad, 2 pista, 3 modelado. No se registran errores. */
function unexpected(key, hint, modelText) {
  support[key] = Math.min((support[key] || 0) + 1, 3);
  tone('soft');
  const lvl = support[key];
  render(); // los renderizadores consultan support[key] para mostrar apoyos visuales
  const bruno = friendOf() === 'bruno';
  if (lvl === 1) say('Casi. ¡Prueba otra vez!');
  else if (lvl === 2) say((bruno ? 'Bruno te da una pista: ' : 'Una pista: ') + hint);
  else say((bruno ? 'Bruno te ayuda. ' : '') + modelText);
}
const resetSupport = key => { support[key] = 0; };

/* ---------- 3 bis. Lola acompañante ----------
   Poses recortadas de la hoja de personaje. Criterios:
   - Una respuesta no esperada no provoca un gesto negativo: Lola permanece tranquila (pose frontal).
   - En la escena 1 Lola no aparece hasta que se confirma la interpretación, para no sugerir la emoción.
   - Con «Reducir movimiento» solo cambian las poses, sin desplazamientos. */
const POSES = ['frontal', 'alegre', 'sorprendida', 'caminando', 'lateral', 'trasera', 'descansando'];
POSES.forEach(p => { const i = new Image(); i.src = `assets/lola-${p}.webp`; });
let poseTimer = null, idleTimer = null, currentPose = 'frontal';
const lolaVisible = () => !(cur().id === 's1' && !app.act.s1.done);
/* Personajes que acompañan a Lola. Sus poses siguen a las de Lola.
   - Bruno, el búho (páginas 2 y 3): es quien da las pistas de nivel 2 y el modelado de nivel 3.
   - La pequeña exploradora (páginas 4 y 5): oveja blanca del rebaño; muestra que también en el
     grupo mayoritario hay intereses distintos. */
const FRIENDS = { s2: 'bruno', s3: 'bruno', s4: 'exploradora', s5: 'exploradora' };
const FRIEND_POSES = {
  bruno: { frontal: 'frontal', alegre: 'feliz', sorprendida: 'sorprendido', caminando: 'perfil', lateral: 'frontal', trasera: 'perfil', descansando: 'cansado' },
  exploradora: { frontal: 'frontal', alegre: 'alegre', sorprendida: 'brujula', caminando: 'perfil', lateral: 'curiosa', trasera: 'perfil', descansando: 'cansada' }
};
Object.entries(FRIEND_POSES).forEach(([who, map]) => new Set(Object.values(map)).forEach(p => { const i = new Image(); i.src = `assets/${who}-${p}.webp`; }));
const friendOf = () => FRIENDS[cur().id] || null;
function syncFriend() {
  const who = friendOf();
  $('friend-wrap').hidden = !who;
  if (who) {
    const p = FRIEND_POSES[who][currentPose] || 'frontal';
    const f = $('friend-pose');
    f.src = `assets/${who}-${p}.webp`;
    f.dataset.pose = p;
    f.dataset.who = who;
  }
}
function pose(name, ms) {
  const img = $('lola-pose');
  clearTimeout(poseTimer);
  currentPose = name;
  img.src = `assets/lola-${name}.webp`;
  img.dataset.pose = name;
  $('companion').classList.toggle('sleeping', name === 'descansando');
  syncFriend();
  if (ms) poseTimer = setTimeout(() => pose('frontal'), ms);
}
function react(kind) {
  $('companion').classList.toggle('solo', !lolaVisible());
  if (!lolaVisible()) return;
  const img = $('lola-pose');
  if (kind === 'ok') pose('alegre', 1500);
  else if (kind === 'done') pose('alegre', 2800);
  else if (kind === 'wow') pose('sorprendida', 1800);
  else if (kind === 'listen') pose('lateral');
  else if (kind === 'soft') pose('frontal');
  if ((kind === 'ok' || kind === 'done') && !app.settings.motion) {
    [img, $('friend-pose')].forEach(n => { n.classList.remove('hop'); void n.offsetWidth; n.classList.add('hop'); });
  }
}
function enterScene(delta) {
  const img = $('lola-pose');
  $('companion').classList.toggle('solo', !lolaVisible());
  if (!lolaVisible()) return;
  if (app.settings.motion || !delta) { pose('frontal'); return; }
  if (delta < 0) { pose('trasera', 600); return; }
  pose('caminando', 900);
  [img, $('friend-pose')].forEach(n => { n.classList.remove('walk-in'); void n.offsetWidth; n.classList.add('walk-in'); });
  if (cur().id === 's4' && !app.act.s4.met) {
    app.act.s4.met = true; save();
    say('Llega la pequeña exploradora: «¡Yo quiero explorar un bosque antiguo!».');
  }
}
function poke() {
  if (currentPose === 'descansando') pose('frontal');
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => {
    const speaking = 'speechSynthesis' in window && speechSynthesis.speaking;
    if (lolaVisible() && !speaking && !$('teacher').open) pose('descansando');
  }, 45000);
}

/* ---------- 4. Voz ---------- */

let voice = null;
function pickVoice() {
  if (!('speechSynthesis' in window)) return;
  const vs = speechSynthesis.getVoices().filter(v => v.lang && v.lang.toLowerCase().startsWith('es'));
  voice = vs.find(v => v.lang.toLowerCase() === 'es-es') || vs[0] || null;
  $('voice-info').textContent = voice
    ? `Voz del dispositivo en uso: ${voice.name} (${voice.lang}). Es una voz sintética; se recomienda sustituirla por una locución grabada con variedad canaria.`
    : 'Este dispositivo no ofrece voces en español: la lectura en voz alta puede no funcionar.';
}
function speak(text, { onWord, onEnd } = {}) {
  if (!('speechSynthesis' in window)) { say('La lectura en voz alta no está disponible en este navegador.'); onEnd?.(); return; }
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = voice?.lang || 'es-ES';
  if (voice) u.voice = voice;
  u.rate = app.settings.slow ? 0.8 : 0.95;
  if (onWord) u.onboundary = e => { if (e.name === 'word' || e.name === undefined) onWord(e.charIndex); };
  u.onend = u.onerror = () => onEnd?.();
  speechSynthesis.speak(u);
}
function stopSpeech() {
  if ('speechSynthesis' in window) speechSynthesis.cancel();
  if (currentAudio) { currentAudio.pause(); currentAudio = null; }
  clearHighlight(); $('stop').hidden = true; $('listen').hidden = false;
  if (currentPose === 'lateral') pose('frontal');
}
let currentAudio = null;
function readScene() {
  const s = cur();
  stopSpeech();
  $('listen').hidden = true; $('stop').hidden = false;
  react('listen');
  const done = () => { clearHighlight(); $('stop').hidden = true; $('listen').hidden = false; if (currentPose === 'lateral') pose('frontal'); };
  if (LOCUCION[s.id]) {
    currentAudio = new Audio(LOCUCION[s.id]);
    currentAudio.onended = currentAudio.onerror = done;
    currentAudio.play().catch(done);
    return;
  }
  const full = s.title + '. ' + s.text;
  const offset = s.title.length + 2;
  speak(full, { onWord: app.settings.follow ? i => highlightAt(i - offset) : null, onEnd: done });
}
function highlightAt(index) {
  clearHighlight();
  if (index < 0) return;
  const spans = $('narrative').querySelectorAll('span[data-i]');
  let target = null;
  for (const sp of spans) { if (+sp.dataset.i <= index) target = sp; else break; }
  target?.classList.add('reading-now');
}
function clearHighlight() { $('narrative').querySelectorAll('.reading-now').forEach(n => n.classList.remove('reading-now')); }

/* ---------- 5. Renderizado general ---------- */

function render(focusHeading = false) {
  const s = cur();
  document.body.classList.toggle('uppercase', app.settings.upper);
  document.body.classList.toggle('large', app.settings.large);
  document.body.classList.toggle('no-motion', app.settings.motion);
  document.body.classList.toggle('no-rings', !app.settings.rings);

  $('page-number').textContent = `Página ${app.scene + 1} de ${SCENES.length}`;
  $('topic').textContent = s.topic;
  $('heading').textContent = s.title;
  $('art').style.aspectRatio = s.ratio;
  $('bg').src = s.image;
  $('caption').textContent = s.caption;

  // Texto con palabras marcables para el seguimiento de la lectura
  const narr = $('narrative'); narr.replaceChildren();
  let i = 0;
  s.text.split(/(\s+)/).forEach(part => {
    if (/^\s+$/.test(part)) narr.append(part);
    else if (part) narr.append(el('span', { 'data-i': i, text: part }));
    i += part.length;
  });

  $('hotspots').replaceChildren();
  $('activity').replaceChildren();
  $('feedback').textContent = '';
  RENDERERS[s.type](s, app.act[s.id]);

  $('previous').disabled = app.scene === 0;
  $('next').textContent = app.scene === SCENES.length - 1 ? 'Volver al inicio ↺' : 'Siguiente →';
  const dots = $('dots'); dots.replaceChildren();
  SCENES.forEach((sc, k) => dots.append(el('li', {
    class: (app.act[sc.id].done ? 'done ' : '') + (k === app.scene ? 'here' : ''),
    'aria-label': `Página ${k + 1}${app.act[sc.id].done ? ', actividad terminada' : ''}${k === app.scene ? ', página actual' : ''}`
  })));
  $('companion').classList.toggle('solo', !lolaVisible());
  syncFriend();
  save();
  if (focusHeading) $('heading').focus();
}

function hotspot(h, { pressed = false, disabled = false, onclick }) {
  const b = el('button', {
    type: 'button', class: 'hs' + (pressed ? ' on' : ''), 'aria-label': h.label,
    'aria-pressed': String(pressed), disabled, onclick
  });
  Object.assign(b.style, { left: h.x + '%', top: h.y + '%', width: h.w + '%', height: h.h + '%' });
  $('hotspots').append(b);
  return b;
}
const mission = (text, extra) => el('h2', { id: 'mission' }, text, extra ? el('small', { text: extra }) : null);
const doneBanner = text => el('p', { class: 'done-banner' }, '⭐ ', text);

/* ---------- 6. Actividades ---------- */

const RENDERERS = {

  /* Escena 1: emociones + pistas en la imagen + «¿Y tú?» */
  emociones(s, st) {
    const box = $('activity');
    s.clues.forEach(c => hotspot(c, {
      pressed: st.clues.includes(c.id),
      onclick: () => {
        if (!st.clues.includes(c.id)) st.clues.push(c.id);
        tone('ok'); render(); say('Pista: ' + c.text);
      }
    }));
    box.append(mission('¿Cómo crees que se siente Lola?', 'Puedes elegir más de una emoción.'));
    const grid = el('div', { class: 'choices', role: 'group', 'aria-label': 'Emociones' });
    s.emotions.forEach((e, k) => grid.append(el('button', {
      type: 'button', class: 'chip', 'aria-pressed': String(st.emotions.includes(k)), disabled: st.done,
      text: e, onclick: () => {
        st.emotions = st.emotions.includes(k) ? st.emotions.filter(v => v !== k) : [...st.emotions, k];
        tone('ok'); render();
      }
    })));
    box.append(grid);
    box.append(el('p', { class: 'tip' }, '🔍 ¿Cómo lo sabes? Toca la imagen para buscar pistas.'));
    if (st.clues.length) {
      box.append(el('ul', { class: 'clues', 'aria-label': 'Pistas encontradas' },
        s.clues.filter(c => st.clues.includes(c.id)).map(c => el('li', { text: c.text }))));
    }
    if (!st.done) {
      box.append(el('button', {
        type: 'button', class: 'primary', disabled: st.emotions.length === 0,
        text: 'Ya lo he pensado', onclick: () => { st.done = true; tone('done'); render(); say('¡Muy bien! Ahora, la pregunta para ti.'); }
      }));
    } else {
      box.append(el('div', { class: 'card you' },
        el('strong', { text: '¿Y tú?' }),
        el('p', { text: '¿Te has sentido así alguna vez? Cuéntaselo a tu maestra o a tu maestro.' })));
      box.append(el('button', { type: 'button', class: 'link', text: 'Cambiar mis emociones', onclick: () => { st.done = false; render(); } }));
    }
  },

  /* Escena 2: contar libros sin número, cardinal y colección dada */
  conteo(s, st) {
    const box = $('activity');
    hotspot(s.hotspots[0], {
      pressed: st.opened,
      onclick: () => { if (!st.opened) { st.opened = true; tone('ok'); render(); react('wow'); say('Lola abre su mochila. ¡Mira cuántos libros!'); } }
    });

    if (!st.opened) {
      box.append(mission('¿Qué lleva Lola en la mochila?', 'Toca la mochila roja en la imagen.'));
      box.append(el('button', { type: 'button', class: 'primary', text: '🎒 Abrir la mochila', onclick: () => { st.opened = true; tone('ok'); render(); react('wow'); say('Lola abre su mochila. ¡Mira cuántos libros!'); } }));
      return;
    }

    const phase = st.counted.length < LIBROS.length ? 'contar' : st.cardinal == null ? 'cuantos' : !st.done ? 'dar' : 'fin';
    const shelf = el('div', { class: 'books', role: 'group', 'aria-label': 'Libros de la mochila' });

    LIBROS.forEach((b, k) => {
      const counted = st.counted.indexOf(k);
      const given = st.given.includes(k);
      const btn = el('button', {
        type: 'button', class: 'book-btn' + (given ? ' given' : ''),
        'aria-label': phase === 'contar'
          ? (counted >= 0 ? `Libro ${b.nombre}, ya contado: ${NUMEROS[counted + 1]}` : `Libro ${b.nombre}, sin contar`)
          : `Libro ${b.nombre}${given ? ', en la estantería de Bruno' : ''}`,
        'aria-pressed': phase === 'dar' ? String(given) : null,
        disabled: phase === 'cuantos' || phase === 'fin' || (phase === 'contar' && counted >= 0),
        onclick: () => {
          if (phase === 'contar') {
            st.counted.push(k); const n = st.counted.length;
            tone('ok'); speak(NUMEROS[n]); render(); say(NUMEROS[n][0].toUpperCase() + NUMEROS[n].slice(1) + '…');
          } else if (phase === 'dar') {
            st.given = given ? st.given.filter(v => v !== k) : [...st.given, k];
            tone('ok'); render(); say(`Has dado ${NUMEROS[st.given.length]} ${st.given.length === 1 ? 'libro' : 'libros'}.`);
          }
        }
      }, bookSVG(b.color), counted >= 0 && phase === 'contar' ? el('span', { class: 'count', 'aria-hidden': 'true', text: counted + 1 }) : null);
      shelf.append(btn);
    });

    if (phase === 'contar') {
      box.append(mission('Cuenta los libros de Lola.', 'Toca cada libro una vez y di el número en voz alta.'));
      box.append(shelf);
      box.append(el('p', { class: 'placeholder', text: 'Ilustración provisional de la mochila (pendiente de la versión ilustrada).' }));
      if (st.counted.length) box.append(el('button', { type: 'button', class: 'link', text: '↺ Volver a contar', onclick: () => { st.counted = []; render(); } }));
    }

    if (phase === 'cuantos') {
      box.append(mission('Bruno pregunta: «¿Cuántos libros hay?»'));
      box.append(shelf);
      const opts = el('div', { class: 'choices numbers', role: 'group', 'aria-label': 'Números' });
      const values = (st._opts ??= shuffle([4, 6, 8]));
      values.forEach(v => {
        const b = el('button', {
          type: 'button', class: 'chip num' + (support.s2c >= 3 && v === LIBROS.length ? ' hint' : ''), 'aria-label': NUMEROS[v],
          onclick: () => {
            if (v === LIBROS.length) { st.cardinal = v; delete st._opts; resetSupport('s2c'); tone('done'); render(); say('¡Sí! Hay seis libros. El último número que dijiste nos dice cuántos hay.'); }
            else unexpected('s2c', '¿qué número dijiste al tocar el último libro?', 'Mira: uno, dos, tres, cuatro, cinco, seis. Hay seis libros.');
          }
        }, el('span', { class: 'digit', text: v }), support.s2c >= 2 ? el('span', { class: 'dots-pattern', 'aria-hidden': 'true', text: '●'.repeat(v) }) : null);
        opts.append(b);
      });
      box.append(opts);
    }

    if (phase === 'dar') {
      box.append(mission(`Bruno quiere ${NUMEROS[s.target]} libros para su estantería.`, `Toca los libros para dárselos. Luego pulsa «¡Listo!».`));
      box.append(shelf);
      const brunoShelf = el('div', { class: 'bruno-shelf', 'aria-label': 'Estantería de Bruno' },
        el('img', { src: 'assets/bruno-frontal.webp', alt: '', 'aria-hidden': 'true', class: 'shelf-bruno' }),
        ...st.given.map(k => el('span', { class: 'mini-book', style: `background:${LIBROS[k].color}` })));
      box.append(brunoShelf);
      box.append(el('button', {
        type: 'button', class: 'primary', text: '¡Listo!', onclick: () => {
          if (st.given.length === s.target) { st.done = true; resetSupport('s2d'); tone('done'); render(); say('¡Gracias! Bruno ya tiene cuatro libros.'); }
          else unexpected('s2d', st.given.length > s.target ? 'tienes más de los que pide Bruno. ¿Cuál le quitamos?' : 'cuenta los libros que tiene Bruno. ¿Faltan?',
            `Bruno tiene ${NUMEROS[st.given.length]}. Contamos juntos hasta cuatro: uno, dos, tres, cuatro.`);
        }
      }));
    }

    if (phase === 'fin') {
      box.append(mission('¡Bruno ya tiene sus libros!'));
      box.append(doneBanner('Has contado seis libros y le has dado cuatro a Bruno.'));
      const extra = el('div', { class: 'card' }, el('strong', { text: 'Reto extra: ' }), '¿De qué color es el tercer libro de la mochila?');
      const row = el('div', { class: 'choices' });
      const third = LIBROS[2];
      shuffle([LIBROS[1], LIBROS[2], LIBROS[4]]).forEach(b => row.append(el('button', {
        type: 'button', class: 'chip', 'aria-pressed': String(st.ordinal === b.nombre),
        onclick: () => {
          st.ordinal = b.nombre;
          if (b === third) { tone('done'); say('¡Sí! El tercero es el verde: primero, segundo, tercero.'); }
          else { tone('soft'); say('Cuenta desde el principio: primero, segundo, tercero…'); }
          save();
        }
      }, el('span', { class: 'swatch', style: `background:${b.color}`, 'aria-hidden': 'true' }), ' ' + b.nombre)));
      extra.append(row);
      const ordered = el('div', { class: 'books small', 'aria-hidden': 'true' }, LIBROS.map(b => bookSVG(b.color)));
      box.append(ordered, extra);
      box.append(el('button', { type: 'button', class: 'link', text: '↺ Repetir la actividad', onclick: () => { app.act.s2 = freshActivity().s2; app.act.s2.opened = true; render(); } }));
    }
  },

  /* Escena 3: sonido inicial, componer con modelo, escritura libre */
  letras(s, st) {
    const box = $('activity');
    const steps = el('ol', { class: 'steps', 'aria-label': 'Fases' },
      ['Escucha', 'Forma la palabra', 'Tu palabra mágica'].map((t, k) =>
        el('li', { class: st.phase === k + 1 ? 'here' : st.phase > k + 1 ? 'past' : '', text: t })));
    box.append(steps);

    if (st.phase === 1) {
      box.append(mission('¿Con qué palabra empieza igual que MAGIA?', 'Toca cada dibujo para escuchar la palabra.'));
      box.append(el('button', { type: 'button', class: 'listen-word', text: '🔊 Escuchar «MAGIA»', onclick: () => speak('magia') }));
      const row = el('div', { class: 'choices', role: 'group', 'aria-label': 'Palabras' });
      s.initialOptions.forEach(o => {
        row.append(el('div', { class: 'word-card' },
          el('button', { type: 'button', class: 'chip big-emoji', 'aria-label': 'Escuchar ' + o.key, onclick: () => speak(o.key) }, o.emoji),
          el('button', {
            type: 'button', class: 'chip choose' + (support.s3a >= 3 && o.letter === 'M' ? ' hint' : ''), text: 'Elegir',
            'aria-label': `Elegir ${o.key}`,
            onclick: () => {
              if (o.letter === 'M') {
                st.initial = 'M'; st.phase = 2; resetSupport('s3a'); tone('done'); render();
                say('¡Sí! MAGIA y mano empiezan igual. Las dos empiezan con la letra M.');
              } else unexpected('s3a', 'di despacio «mmmagia». ¿Qué palabra suena igual al principio?', 'Escucha: mmmagia, mmmano. Empiezan igual.');
            }
          })));
      });
      box.append(row);
      return;
    }

    if (st.phase === 2) {
      const word = s.word;
      box.append(mission('Forma la palabra MAGIA.', 'Mira el modelo y toca las letras en orden.'));
      const model = el('p', { class: 'model', 'aria-label': 'Modelo: MAGIA' },
        [...word].map((c, k) => el('span', { class: (support.s3b >= 3 && k === st.placed) ? 'next' : '', text: c })));
      const slots = el('div', { class: 'slots', 'aria-label': `Llevas ${st.placed} de ${word.length} letras` },
        [...word].map((c, k) => el('span', { class: 'slot' + (k < st.placed ? ' filled' : ''), text: k < st.placed ? c : '' })));
      const pool = el('div', { class: 'choices letters', role: 'group', 'aria-label': 'Letras' });
      const tiles = (st._tiles ??= shuffle([...word].map((c, k) => ({ c, k }))));
      const used = st._used ??= [];
      tiles.forEach(t => {
        const b = el('button', {
          type: 'button', class: 'chip letter', text: t.c, disabled: used.includes(t.k),
          onclick: () => {
            if (t.c === word[st.placed]) {
              used.push(t.k); st.placed++; resetSupport('s3b'); tone('ok');
              if (st.placed === word.length) { st.phase = 3; st.done = true; delete st._tiles; delete st._used; tone('done'); render(); speak('magia'); say('¡Has formado MAGIA! Ahora puedes escribir tu propia palabra mágica.'); }
              else { render(); say(`¡Bien! Llevas ${NUMEROS[st.placed]}.`); }
            } else {
              unexpected('s3b', `busca en el modelo la letra que va en el hueco ${NUMEROS[st.placed + 1]}.`, 'Mira el modelo: la letra que toca ahora está marcada.');
            }
          }
        });
        pool.append(b);
      });
      box.append(model, slots, pool);
      return;
    }

    // Fase 3: escritura libre, sin validación
    box.append(mission('Tu palabra mágica', 'Escribe la palabra que quieras, como tú sepas. Después, léesela a tu maestra o a tu maestro.'));
    box.append(el('p', { class: 'free', 'aria-live': 'polite', 'aria-label': 'Tu escritura' }, st.free || ' '));
    const kb = el('div', { class: 'keyboard', role: 'group', 'aria-label': 'Letras para escribir' });
    'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('').forEach(c => kb.append(el('button', {
      type: 'button', class: 'key', text: c, onclick: () => { if (st.free.length < 14) { st.free += c; tone('ok'); render(); } }
    })));
    box.append(kb);
    box.append(el('div', { class: 'row' },
      el('button', { type: 'button', text: '⌫ Borrar una', disabled: !st.free, onclick: () => { st.free = st.free.slice(0, -1); render(); } }),
      el('button', { type: 'button', class: 'primary', text: 'Ya la he escrito', disabled: !st.free, onclick: () => { st.freeDone = true; tone('done'); save(); say('¡Qué bien! Léesela a tu maestra o a tu maestro. ¿Qué dice tu palabra?'); } })));
    box.append(doneBanner('Has formado la palabra MAGIA.'));
    box.append(el('button', { type: 'button', class: 'link', text: '↺ Repetir desde el principio', onclick: () => { app.act.s3 = freshActivity().s3; render(); } }));
  },

  /* Escena 4: elección narrativa + andamiaje del relato oral */
  relato(s, st) {
    const box = $('activity');
    const toggle = id => {
      if (st.step > 0) return;
      if (st.chosen.includes(id)) st.chosen = st.chosen.filter(v => v !== id);
      else if (st.chosen.length < 2) st.chosen.push(id);
      else { say('Ya tienes dos. Si quieres cambiar, toca uno de los que elegiste para quitarlo.'); return; }
      tone('ok'); render();
      if (st.chosen.length === 2) react('wow');
      if (st.chosen.length === 2) say(`Has elegido ${OBJETOS[st.chosen[0]].nombre} y ${OBJETOS[st.chosen[1]].nombre}.`);
    };
    s.hotspots.forEach(h => hotspot(h, { pressed: st.chosen.includes(h.id), disabled: st.step > 0, onclick: () => toggle(h.id) }));

    if (st.step === 0) {
      box.append(mission('Elige dos cosas del libro de Lola para tu historia.', 'Tócalas en la imagen o aquí debajo.'));
      const row = el('div', { class: 'choices', role: 'group', 'aria-label': 'Elementos para la historia' });
      Object.entries(OBJETOS).forEach(([id, o]) => row.append(el('button', {
        type: 'button', class: 'chip', 'aria-pressed': String(st.chosen.includes(id)), onclick: () => toggle(id)
      }, o.emoji + ' ' + o.nombre.replace(/^el /, ''))));
      box.append(row);
      box.append(el('button', { type: 'button', class: 'primary', disabled: st.chosen.length !== 2, text: 'Empezar la historia', onclick: () => { st.step = 1; tone('ok'); render(); } }));
      return;
    }

    const [a, b] = st.chosen.map(id => OBJETOS[id]);
    const cards = [
      ['¿Quién aparece?', 'Había una vez… ¿Quién es el personaje de tu historia?'],
      ['¿Qué pasó?', `En tu historia están ${a.nombre} y ${b.nombre}. Un día…`],
      ['¿Cómo acabó?', 'Al final…']
    ];
    box.append(mission('Cuenta tu historia.', 'Tu maestra o tu maestro te ayuda.'));
    box.append(el('p', { class: 'chosen', 'aria-label': 'Elementos elegidos' }, `${a.emoji} ${b.emoji}`));
    const list = el('ol', { class: 'story-cards' });
    cards.forEach(([h, p], k) => list.append(el('li', { class: k + 1 === st.step ? 'here' : k + 1 < st.step ? 'past' : 'later' },
      el('strong', { text: h }), el('span', { text: k + 1 <= st.step ? p : '…' }))));
    box.append(list);
    if (st.step < 3) box.append(el('button', { type: 'button', class: 'primary', text: 'Siguiente parte →', onclick: () => { st.step++; tone('ok'); render(); } }));
    else if (!st.done) box.append(el('button', { type: 'button', class: 'primary', text: 'Hemos contado la historia', onclick: () => { st.done = true; tone('done'); render(); say('¡Qué historia tan bonita! Lola la recordará al final del cuento.'); } }));
    else box.append(doneBanner('Historia contada. ¡Aparecerá al final del cuento!'));
    box.append(el('button', { type: 'button', class: 'link', text: '↺ Elegir otras cosas', onclick: () => { app.act.s4 = freshActivity().s4; render(); } }));
  },

  /* Escena 5: ordenar la secuencia, dilema de convivencia y cierre */
  convivencia(s, st) {
    const box = $('activity');
    if (st.order.length < s.sequence.length) {
      box.append(mission('¿Qué pasó primero, después y al final?', 'Toca los dibujos en orden.'));
      const slots = el('ol', { class: 'seq-slots' }, s.slots.map((label, k) => {
        const item = s.sequence.find(q => q.id === st.order[k]);
        return el('li', { class: item ? 'filled' : '' }, el('span', { text: label }), item ? el('img', { src: item.image, alt: item.label }) : null);
      }));
      const pool = el('div', { class: 'seq-pool', role: 'group', 'aria-label': 'Dibujos del cuento' });
      (st._pool ??= shuffle(s.sequence.map(q => q.id))).forEach(id => {
        const q = s.sequence.find(x => x.id === id);
        if (st.order.includes(id)) return;
        const expected = s.sequence[st.order.length].id;
        const b = el('button', {
          type: 'button', class: 'thumb' + (support.s5a >= 3 && id === expected ? ' hint' : ''), 'aria-label': q.label,
          onclick: () => {
            if (id === expected) {
              st.order.push(id); resetSupport('s5a'); tone('ok');
              if (st.order.length === s.sequence.length) { delete st._pool; tone('done'); }
              render(); say(st.order.length === s.sequence.length ? '¡Muy bien! Has ordenado la historia de Lola.' : `¡Bien! ${s.slots[st.order.length - 1]}: ${q.label.toLowerCase()}.`);
            } else {
              unexpected('s5a', '¿qué le pasó a Lola al principio del cuento, antes de hablar con Bruno?', 'Mira el dibujo marcado: es el que va ahora.');
            }
          }
        }, el('img', { src: q.image, alt: '' }));
        pool.append(b);
      });
      box.append(slots, pool);
      return;
    }

    const story = app.act.s4.chosen.length === 2
      ? `la historia ${deArt(OBJETOS[app.act.s4.chosen[0]].nombre)} y ${deArt(OBJETOS[app.act.s4.chosen[1]].nombre)}`
      : 'una historia nueva';
    box.append(el('ol', { class: 'seq-slots compact', 'aria-label': 'Historia ordenada' },
      s.sequence.map((q, k) => el('li', { class: 'filled' }, el('span', { text: s.slots[k] }), el('img', { src: q.image, alt: q.label })))));

    box.append(mission('¿Qué pueden hacer?'));
    box.append(el('p', { class: 'dilemma', text: `Lola quiere contar ${story}. La pequeña exploradora quiere ir al bosque antiguo. Y el resto del rebaño quiere jugar a saltar. ¿Cómo lo pueden hacer para que todas estén a gusto?` }));
    const opts = el('div', { class: 'options', role: 'group', 'aria-label': 'Ideas' });
    s.options.forEach(o => opts.append(el('button', {
      type: 'button', class: 'option', 'aria-pressed': String(st.decision === o.id), text: o.text,
      onclick: () => { st.decision = o.id; st.done = true; tone('done'); render(); say(o.result); }
    })));
    box.append(opts);

    if (st.decision) {
      const o = s.options.find(x => x.id === st.decision);
      box.append(el('div', { class: 'card you' }, el('strong', { text: 'Y entonces… ' }), o.result));
      box.append(el('div', { class: 'card closing' },
        el('strong', { text: '🌼 Un prado para todos' }),
        el('p', { text: 'No hace falta ser iguales para estar juntos.' }),
        el('p', { class: 'for-class', text: 'Para hablar en clase: ¿cómo podemos preparar un rincón de lectura donde quepan los gustos de todas y de todos?' })));
    }
  }
};

function bookSVG(color) {
  const ns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('viewBox', '0 0 40 56'); svg.setAttribute('aria-hidden', 'true'); svg.setAttribute('focusable', 'false');
  svg.innerHTML = `<rect x="3" y="2" width="34" height="52" rx="4" fill="${color}" stroke="#2b2420" stroke-width="2"/>
    <rect x="3" y="2" width="7" height="52" rx="3" fill="#0003"/>
    <rect x="15" y="12" width="16" height="4" rx="2" fill="#fff9"/><rect x="15" y="20" width="12" height="3" rx="1.5" fill="#fff7"/>`;
  return svg;
}

/* ---------- 7. Menú docente ---------- */

function renderObservation() {
  const wrap = $('obs-table'); wrap.replaceChildren();
  $('code').value = app.record.code;
  SCENES.forEach((s, k) => {
    const fs = el('fieldset', { class: 'obs' }, el('legend', { text: `${k + 1}. ${s.title}${app.act[s.id].done ? ' · actividad terminada' : ''}` }));
    s.indicators.forEach(([id, text, crit]) => {
      const sel = el('select', { id: 'lvl-' + id, onchange: e => { app.record.levels[id] = e.target.value; save(); } },
        LEVELS.map(([v, t]) => el('option', { value: v, text: t, selected: (app.record.levels[id] || '') === v })));
      fs.append(el('div', { class: 'ind' }, el('label', { for: 'lvl-' + id }, text, el('small', { text: crit })), sel));
    });
    const ta = el('textarea', { rows: 2, 'aria-label': `Notas de la escena ${k + 1}`, placeholder: 'Notas de observación (opcional)',
      oninput: e => { app.record.notes[s.id] = e.target.value; save(); } });
    ta.value = app.record.notes[s.id] || '';
    fs.append(ta);
    wrap.append(fs);
  });
  $('records-info').textContent = app.records.length
    ? `Registros guardados en este dispositivo: ${app.records.length} (más el actual).`
    : 'Aún no hay registros guardados además del actual.';
}
function renderGuide() {
  const g = $('guide'); g.replaceChildren();
  g.append(el('p', { class: 'note', text: 'Recurso para la lectura compartida (Decreto 196/2022, A3 crit. 5.8: herramientas digitales en actividades mediadas por la persona adulta). Cada escena admite ayuda en tres niveles: nueva oportunidad, pista y modelado. No se registran errores.' }));
  SCENES.forEach((s, k) => g.append(el('section', { class: 'guide-item' },
    el('h3', { text: `${k + 1}. ${s.title}` }), el('p', { text: s.guide }),
    el('p', { class: 'crit', text: 'Referentes: ' + [...new Set(s.indicators.map(i => i[2]))].join(' · ') }))));
  g.append(el('p', { class: 'note', text: 'Propuesta de transferencia (anexo 3): convertir el cierre del cuento en el reto de una situación de aprendizaje, por ejemplo, organizar entre todos el rincón de lectura del aula.' }));
}
function csvRows() {
  const all = [...app.records, app.record];
  const header = ['Código', 'Escena', 'Indicador', 'Referente', 'Nivel observado', 'Notas de la escena'];
  const rows = [header];
  all.forEach(r => SCENES.forEach((s, k) => s.indicators.forEach(([id, text, crit]) => {
    const lvl = LEVELS.find(l => l[0] === (r.levels[id] || ''))[1];
    rows.push([r.code || '(sin código)', k + 1, text, crit, lvl === '—' ? 'No observado' : lvl, r.notes[s.id] || '']);
  })));
  return rows.map(row => row.map(v => '"' + String(v).replaceAll('"', '""') + '"').join(';')).join('\r\n');
}
function setTab(name) {
  ['obs', 'guide', 'settings'].forEach(t => {
    const on = t === name;
    $('tab-' + t).setAttribute('aria-selected', String(on));
    $('tab-' + t).tabIndex = on ? 0 : -1;
    $('pane-' + t).hidden = !on;
  });
}

/* ---------- 8. Eventos ---------- */

function go(delta) {
  stopSpeech();
  app.scene = app.scene === SCENES.length - 1 && delta > 0 ? 0 : Math.max(0, Math.min(SCENES.length - 1, app.scene + delta));
  render(true);
  enterScene(delta);
  window.scrollTo({ top: 0, behavior: app.settings.motion ? 'auto' : 'smooth' });
}

function bind() {
  $('listen').onclick = readScene;
  $('stop').onclick = stopSpeech;
  $('previous').onclick = () => go(-1);
  $('next').onclick = () => go(1);

  const dlg = $('teacher');
  $('teacher-btn').onclick = () => { renderObservation(); renderGuide(); setTab('obs'); dlg.showModal(); };
  $('teacher-close').onclick = () => dlg.close();
  dlg.addEventListener('close', () => { render(); $('teacher-btn').focus(); });
  ['obs', 'guide', 'settings'].forEach(t => { $('tab-' + t).onclick = () => setTab(t); });
  dlg.querySelector('[role=tablist]').addEventListener('keydown', e => {
    const order = ['obs', 'guide', 'settings'];
    const i = order.findIndex(t => $('tab-' + t).getAttribute('aria-selected') === 'true');
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      const n = order[(i + (e.key === 'ArrowRight' ? 1 : order.length - 1)) % order.length];
      setTab(n); $('tab-' + n).focus(); e.preventDefault();
    }
  });

  $('code').oninput = e => { app.record.code = e.target.value; save(); };
  $('new-record').onclick = () => {
    app.records.push(app.record); app.record = freshRecord(); app.act = freshActivity(); app.scene = 0;
    save(); renderObservation(); $('code').focus();
  };
  $('export').onclick = () => {
    const blob = new Blob(['﻿' + csvRows()], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = el('a', { href: url, download: 'lola-observacion.csv' });
    document.body.append(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const map = { upper: 'set-upper', large: 'set-large', slow: 'set-slow', follow: 'set-follow', sound: 'set-sound', motion: 'set-motion', rings: 'set-rings' };
  Object.entries(map).forEach(([k, id]) => {
    $(id).checked = app.settings[k];
    $(id).onchange = e => { app.settings[k] = e.target.checked; save(); render(); };
  });
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) { app.settings.motion = true; $('set-motion').checked = true; }

  $('wipe').onclick = () => { $('wipe-confirm').hidden = false; $('wipe-yes').focus(); };
  $('wipe-no').onclick = () => { $('wipe-confirm').hidden = true; $('wipe').focus(); };
  $('wipe-yes').onclick = () => {
    try { localStorage.removeItem(STORE_KEY); } catch { }
    app.act = freshActivity(); app.record = freshRecord(); app.records = []; app.scene = 0;
    $('wipe-confirm').hidden = true; renderObservation(); setTab('obs');
  };

  if ('speechSynthesis' in window) { pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; }
  else $('voice-info').textContent = 'Este navegador no permite la lectura en voz alta.';
}

load();
bind();
render();
pose('frontal');
['pointerdown', 'keydown'].forEach(ev => document.addEventListener(ev, poke, { passive: true }));
poke();
