import type { CheckResult, GameLevel } from '../types'

// JavaScript game levels are validated by reading the source the learner wrote (`code`),
// not by inspecting a run trace — the point is to see the game actually move and respond
// to input live, in GameCanvas, rather than replay a deterministic script like the Python
// turtle/farm/donjon bridges do.
const ok = (message: string): CheckResult => ({ ok: true, message })
const fail = (message: string): CheckResult => ({ ok: false, message })

function has(code: string | undefined, pattern: RegExp): boolean {
  return !!code && pattern.test(code)
}

export const GAME_LEVELS: GameLevel[] = [
  {
    id: 'game-1',
    title: 'Dessiner un carré',
    emoji: '🟪',
    xp: 15,
    chapter: 'Chapitre 1 · Dessiner et animer',
    intro:
      "Bienvenue dans l'atelier de jeux vidéo ! `canvas` et `ctx` sont déjà prêts pour toi : ctx est ton pinceau, canvas est ta feuille (300 x 400 pixels, coin en haut à gauche = (0, 0).",
    task:
      "Dessine un carré violet de 50x50 pixels à la position (125, 175) : choisis la couleur avec `ctx.fillStyle = 'violet'`, puis dessine avec `ctx.fillRect(x, y, largeur, hauteur)`.",
    starterCode: '// canvas et ctx sont déjà prêts pour toi (300 x 400 pixels)\n\n// Ton code ici\n',
    hints: ["ctx.fillStyle = 'violet'", 'ctx.fillRect(125, 175, 50, 50)'],
    check: (_stdout, _get, _c, _f, _d, code) =>
      has(code, /ctx\.fillStyle/) && has(code, /ctx\.fillRect\s*\(/)
        ? ok('Ton premier dessin sur le canvas ! 🎨')
        : fail("Utilise ctx.fillStyle pour choisir une couleur, puis ctx.fillRect(x, y, largeur, hauteur)."),
  },
  {
    id: 'game-2',
    title: 'Ça bouge tout seul',
    emoji: '🔵',
    xp: 20,
    chapter: 'Chapitre 1 · Dessiner et animer',
    intro:
      "Un jeu, c'est une image qui se répète très vite. La fonction `boucle()` s'appelle elle-même à chaque image grâce à `requestAnimationFrame(boucle)` — c'est le cœur battant de tout jeu vidéo. `ctx.clearRect(0, 0, canvas.width, canvas.height)` efface l'écran avant de tout redessiner.",
    task:
      "Complète la boucle : augmente `x` de 3 à chaque image, puis dessine un cercle cyan de rayon 15 à la position (x, 200) avec `ctx.beginPath()`, `ctx.arc(x, 200, 15, 0, Math.PI * 2)` et `ctx.fill()`.",
    starterCode:
      "let x = 20\n\nfunction boucle() {\n  ctx.clearRect(0, 0, canvas.width, canvas.height)\n\n  // Ton code ici : incrémente x, puis dessine le cercle\n\n  requestAnimationFrame(boucle)\n}\n\nboucle()\n",
    hints: [
      'x = x + 3',
      "ctx.beginPath()\nctx.arc(x, 200, 15, 0, Math.PI * 2)\nctx.fillStyle = 'cyan'\nctx.fill()",
    ],
    check: (_stdout, _get, _c, _f, _d, code) =>
      has(code, /requestAnimationFrame\s*\(/) && has(code, /ctx\.arc\s*\(/) && has(code, /clearRect/)
        ? ok('Ta première animation ! Le cercle glisse tout seul. 🌀')
        : fail('Il faut requestAnimationFrame, clearRect, et ctx.arc pour dessiner et animer le cercle.'),
  },
  {
    id: 'game-3',
    title: 'Contrôle au clavier',
    emoji: '🎮',
    xp: 20,
    chapter: 'Chapitre 2 · Bouger et interagir',
    intro:
      "`estAppuyee('ArrowLeft')` renvoie `true` si la touche est actuellement appuyée (flèches du clavier, ou les boutons tactiles à l'écran — les deux marchent pareil).",
    task:
      "Fais bouger le carré avec les flèches : si `estAppuyee('ArrowLeft')`, diminue `x` ; si `estAppuyee('ArrowRight')`, augmente `x`.",
    starterCode:
      "let x = 125\n\nfunction boucle() {\n  ctx.clearRect(0, 0, canvas.width, canvas.height)\n\n  // Ton code ici : bouge x selon les touches\n\n  ctx.fillStyle = 'orange'\n  ctx.fillRect(x, 350, 50, 30)\n\n  requestAnimationFrame(boucle)\n}\n\nboucle()\n",
    hints: [
      "if (estAppuyee('ArrowLeft')) {\n  x = x - 4\n}\nif (estAppuyee('ArrowRight')) {\n  x = x + 4\n}",
    ],
    check: (_stdout, _get, _c, _f, _d, code) =>
      has(code, /estAppuyee\s*\(\s*['"]ArrowLeft['"]/) && has(code, /estAppuyee\s*\(\s*['"]ArrowRight['"]/)
        ? ok('Un vrai personnage jouable ! 🕹️')
        : fail("Utilise estAppuyee('ArrowLeft') et estAppuyee('ArrowRight') pour bouger le carré."),
  },
  {
    id: 'game-4',
    title: 'Ça tombe !',
    emoji: '🍎',
    xp: 20,
    chapter: 'Chapitre 2 · Bouger et interagir',
    intro:
      "Une variable `y` qui augmente à chaque image simule la gravité. Quand l'objet touche le bas de l'écran, remets-le en haut avec une nouvelle position aléatoire : `hasard(min, max)` te donne un nombre entier au hasard.",
    task:
      "Fais tomber une pomme (un cercle) : augmente `y` à chaque image ; quand `y` dépasse 400 (le bas de l'écran), remets `y` à 0 et choisis un nouveau `x` avec `hasard(0, 270)`.",
    starterCode:
      "let x = 150\nlet y = 0\n\nfunction boucle() {\n  ctx.clearRect(0, 0, canvas.width, canvas.height)\n\n  // Ton code ici : fais tomber y, et réinitialise-le en bas de l'écran\n\n  ctx.beginPath()\n  ctx.arc(x, y, 12, 0, Math.PI * 2)\n  ctx.fillStyle = 'red'\n  ctx.fill()\n\n  requestAnimationFrame(boucle)\n}\n\nboucle()\n",
    hints: [
      'y = y + 3',
      'if (y > 400) {\n  y = 0\n  x = hasard(0, 270)\n}',
    ],
    check: (_stdout, _get, _c, _f, _d, code) =>
      has(code, /hasard\s*\(/) && has(code, /y\s*(\+=|=\s*y\s*\+)/)
        ? ok('La pomme tombe et recommence à l\'infini ! 🍎')
        : fail('Il faut augmenter y à chaque image, et utiliser hasard() pour la repositionner en haut.'),
  },
  {
    id: 'game-5',
    title: 'Détecter les collisions',
    emoji: '💥',
    xp: 25,
    chapter: 'Chapitre 2 · Bouger et interagir',
    intro:
      "`collision(x1, y1, l1, h1, x2, y2, l2, h2)` renvoie `true` si deux rectangles se touchent — exactement ce qu'il faut pour savoir si ton panier attrape la pomme.",
    task:
      "Utilise `collision()` pour savoir si le panier touche la pomme. Si oui, affiche \"Attrapé !\" avec `console.log` et fais réapparaître la pomme en haut (y = 0, x aléatoire).",
    starterCode:
      "let panierX = 125\nlet pommeX = 150\nlet pommeY = 0\n\nfunction boucle() {\n  ctx.clearRect(0, 0, canvas.width, canvas.height)\n\n  if (estAppuyee('ArrowLeft')) panierX -= 4\n  if (estAppuyee('ArrowRight')) panierX += 4\n\n  pommeY += 3\n\n  // Ton code ici : détecte la collision avec collision(), affiche \"Attrapé !\", et fais retomber la pomme\n\n  ctx.fillStyle = 'orange'\n  ctx.fillRect(panierX, 360, 50, 20)\n  ctx.beginPath()\n  ctx.arc(pommeX, pommeY, 12, 0, Math.PI * 2)\n  ctx.fillStyle = 'red'\n  ctx.fill()\n\n  requestAnimationFrame(boucle)\n}\n\nboucle()\n",
    hints: [
      'if (collision(panierX, 360, 50, 20, pommeX - 12, pommeY - 12, 24, 24)) {\n  console.log("Attrapé !")\n  pommeY = 0\n  pommeX = hasard(0, 270)\n}',
    ],
    check: (_stdout, _get, _c, _f, _d, code) =>
      has(code, /collision\s*\(/) && has(code, /console\.log/)
        ? ok('Premier attrapé, ton jeu réagit vraiment ! 💥')
        : fail('Utilise collision() pour détecter le contact, et console.log() pour afficher "Attrapé !".'),
  },
  {
    id: 'game-6',
    title: 'Afficher le score',
    emoji: '🔤',
    xp: 20,
    chapter: 'Chapitre 2 · Bouger et interagir',
    intro:
      "`ctx.fillText(texte, x, y)` écrit du texte directement sur le canvas — bien plus pratique qu'un console.log pour un score affiché en jeu.",
    task:
      'Ajoute une variable `score` qui commence à 0 et augmente de 1 à chaque pomme attrapée, puis affiche-la avec `ctx.fillText(`Score : ${score}`, 10, 20)`.',
    starterCode:
      "let panierX = 125\nlet pommeX = 150\nlet pommeY = 0\nlet score = 0\n\nfunction boucle() {\n  ctx.clearRect(0, 0, canvas.width, canvas.height)\n\n  if (estAppuyee('ArrowLeft')) panierX -= 4\n  if (estAppuyee('ArrowRight')) panierX += 4\n\n  pommeY += 3\n  if (collision(panierX, 360, 50, 20, pommeX - 12, pommeY - 12, 24, 24)) {\n    // Ton code ici : augmente le score, et fais retomber la pomme\n  }\n\n  ctx.fillStyle = 'orange'\n  ctx.fillRect(panierX, 360, 50, 20)\n  ctx.beginPath()\n  ctx.arc(pommeX, pommeY, 12, 0, Math.PI * 2)\n  ctx.fillStyle = 'red'\n  ctx.fill()\n\n  // Ton code ici : affiche le score avec ctx.fillText\n\n  requestAnimationFrame(boucle)\n}\n\nboucle()\n",
    hints: [
      'score = score + 1\npommeY = 0\npommeX = hasard(0, 270)',
      "ctx.fillStyle = 'white'\nctx.font = '20px sans-serif'\nctx.fillText(`Score : ${score}`, 10, 20)",
    ],
    check: (_stdout, _get, _c, _f, _d, code) =>
      has(code, /ctx\.fillText\s*\(/) && has(code, /score/)
        ? ok('Le score est bien à l\'écran, comme dans un vrai jeu ! 🏅')
        : fail('Utilise ctx.fillText() pour afficher la variable score sur le canvas.'),
  },
  {
    id: 'game-7',
    title: 'Ton jeu complet : Attrape-pommes',
    emoji: '🏆',
    xp: 45,
    chapter: 'Chapitre 3 · Ton jeu complet',
    intro:
      "Tu as tous les morceaux : boucle d'animation, contrôle au clavier, chute, collision, score. Assemble-les dans un seul jeu complet, prêt à jouer — et à retester autant de fois que tu veux.",
    task:
      "Complète le jeu : détecte la collision entre le panier et la pomme avec collision(), augmente le score et fais retomber la pomme en cas d'attrapé, et affiche le score avec ctx.fillText.",
    starterCode:
      "let panierX = 125\nlet pommeX = hasard(0, 270)\nlet pommeY = 0\nlet score = 0\n\nfunction boucle() {\n  ctx.clearRect(0, 0, canvas.width, canvas.height)\n\n  if (estAppuyee('ArrowLeft')) panierX -= 5\n  if (estAppuyee('ArrowRight')) panierX += 5\n  panierX = Math.max(0, Math.min(250, panierX))\n\n  pommeY += 3\n  if (pommeY > 400) {\n    pommeY = 0\n    pommeX = hasard(0, 270)\n  }\n\n  // Ton code ici : détecte la collision, augmente le score, fais retomber la pomme\n\n  ctx.fillStyle = 'orange'\n  ctx.fillRect(panierX, 360, 50, 20)\n  ctx.beginPath()\n  ctx.arc(pommeX, pommeY, 12, 0, Math.PI * 2)\n  ctx.fillStyle = 'red'\n  ctx.fill()\n\n  // Ton code ici : affiche le score avec ctx.fillText\n\n  requestAnimationFrame(boucle)\n}\n\nboucle()\n",
    hints: [
      'if (collision(panierX, 360, 50, 20, pommeX - 12, pommeY - 12, 24, 24)) {\n  score = score + 1\n  pommeY = 0\n  pommeX = hasard(0, 270)\n}',
      "ctx.fillStyle = 'white'\nctx.font = '20px sans-serif'\nctx.fillText(`Score : ${score}`, 10, 20)",
    ],
    check: (_stdout, _get, _c, _f, _d, code) =>
      has(code, /requestAnimationFrame\s*\(/) &&
      has(code, /estAppuyee\s*\(/) &&
      has(code, /hasard\s*\(/) &&
      has(code, /collision\s*\(/) &&
      has(code, /ctx\.fillText\s*\(/)
        ? ok('Attrape-pommes est terminé — un vrai petit jeu, codé et testé par toi ! 🏆')
        : fail(
            'Il manque un ingrédient : vérifie que tu utilises collision(), le score qui augmente, et ctx.fillText() pour l\'afficher.',
          ),
  },
  // ============================================================
  // CASSE-BRIQUES — vitesse en deux directions (rebond) + tableau d'objets
  // ============================================================
  {
    id: 'breakout-1',
    title: 'Une balle qui rebondit',
    emoji: '⚪',
    xp: 20,
    chapter: 'Chapitre 4 · Casse-briques',
    intro:
      "Dans Casse-briques, la balle avance en ligne droite : dx et dy sont sa vitesse horizontale et verticale. À chaque image, x += dx et y += dy. Quand elle touche un bord, on inverse le signe de la vitesse correspondante : dx = -dx.",
    task:
      "Fais rebondir une balle sur les murs : avance-la avec dx/dy, puis inverse dx si elle touche un bord gauche/droit (x < 0 ou x > canvas.width), et inverse dy si elle touche le haut (y < 0).",
    starterCode:
      "let x = 150\nlet y = 200\nlet dx = 3\nlet dy = 3\n\nfunction boucle() {\n  ctx.clearRect(0, 0, canvas.width, canvas.height)\n\n  x += dx\n  y += dy\n\n  // Ton code ici : inverse dx si la balle touche un bord gauche/droit,\n  // et dy si elle touche le haut\n\n  ctx.beginPath()\n  ctx.arc(x, y, 8, 0, Math.PI * 2)\n  ctx.fillStyle = 'white'\n  ctx.fill()\n\n  requestAnimationFrame(boucle)\n}\n\nboucle()\n",
    hints: ["if (x < 0 || x > canvas.width) {\n  dx = -dx\n}\nif (y < 0) {\n  dy = -dy\n}"],
    check: (_stdout, _get, _c, _f, _d, code) =>
      has(code, /dx\s*=\s*-\s*dx/) && has(code, /dy\s*=\s*-\s*dy/)
        ? ok('La balle rebondit sur les murs comme un vrai Casse-briques ! ⚪')
        : fail('Inverse dx (dx = -dx) sur un bord gauche/droit, et dy (dy = -dy) en haut.'),
  },
  {
    id: 'breakout-2',
    title: 'La raquette qui rattrape',
    emoji: '🏓',
    xp: 20,
    chapter: 'Chapitre 4 · Casse-briques',
    intro:
      "Ajoute une raquette contrôlée au clavier. Si la balle la touche (avec collision()), fais-la remonter en inversant dy — sinon elle tombe dans le vide, comme au vrai Casse-briques.",
    task:
      "Bouge une raquette avec estAppuyee('ArrowLeft'/'ArrowRight'), et utilise collision() pour faire rebondir la balle dessus.",
    starterCode:
      "let x = 150\nlet y = 200\nlet dx = 3\nlet dy = 3\nlet raquetteX = 125\n\nfunction boucle() {\n  ctx.clearRect(0, 0, canvas.width, canvas.height)\n\n  // Ton code ici : bouge raquetteX avec estAppuyee\n\n  x += dx\n  y += dy\n  if (x < 0 || x > canvas.width) dx = -dx\n  if (y < 0) dy = -dy\n\n  // Ton code ici : si collision() entre la balle et la raquette, inverse dy\n\n  ctx.fillStyle = 'orange'\n  ctx.fillRect(raquetteX, 380, 60, 12)\n  ctx.beginPath()\n  ctx.arc(x, y, 8, 0, Math.PI * 2)\n  ctx.fillStyle = 'white'\n  ctx.fill()\n\n  requestAnimationFrame(boucle)\n}\n\nboucle()\n",
    hints: [
      "if (estAppuyee('ArrowLeft')) raquetteX -= 5\nif (estAppuyee('ArrowRight')) raquetteX += 5",
      'if (collision(raquetteX, 380, 60, 12, x - 8, y - 8, 16, 16)) {\n  dy = -dy\n}',
    ],
    check: (_stdout, _get, _c, _f, _d, code) =>
      has(code, /estAppuyee\s*\(/) && has(code, /collision\s*\(/)
        ? ok('Une vraie raquette jouable, la balle ne tombe plus ! 🏓')
        : fail('Utilise estAppuyee() pour bouger la raquette, et collision() pour la faire rebondir dessus.'),
  },
  {
    id: 'breakout-3',
    title: 'Une grille de briques qui se cassent',
    emoji: '🧱',
    xp: 25,
    chapter: 'Chapitre 4 · Casse-briques',
    intro:
      "Pour gérer plusieurs briques à la fois, on les stocke dans un tableau (array). Chaque brique est un objet { x, y, cassee: false }. On les dessine toutes avec une boucle for...of, et on vérifie la collision avec chacune.",
    task:
      'Complète la double boucle qui remplit le tableau briques (5 colonnes, 3 lignes) avec briques.push({...}), puis dans la boucle de jeu, dessine chaque brique non cassée et marque-la cassée (cassee = true) si la balle la touche.',
    starterCode:
      "let briques = []\nfor (let col = 0; col < 5; col++) {\n  for (let ligne = 0; ligne < 3; ligne++) {\n    // Ton code ici : ajoute { x: col * 55 + 10, y: ligne * 20 + 10, cassee: false } à briques\n  }\n}\n\nlet x = 150, y = 200, dx = 3, dy = 3, raquetteX = 125\n\nfunction boucle() {\n  ctx.clearRect(0, 0, canvas.width, canvas.height)\n\n  if (estAppuyee('ArrowLeft')) raquetteX -= 5\n  if (estAppuyee('ArrowRight')) raquetteX += 5\n\n  x += dx\n  y += dy\n  if (x < 0 || x > canvas.width) dx = -dx\n  if (y < 0) dy = -dy\n  if (collision(raquetteX, 380, 60, 12, x - 8, y - 8, 16, 16)) dy = -dy\n\n  for (const brique of briques) {\n    if (!brique.cassee) {\n      // Ton code ici : dessine la brique avec ctx.fillRect, et si collision()\n      // avec la balle, casse-la (cassee = true) et inverse dy\n    }\n  }\n\n  ctx.fillStyle = 'orange'\n  ctx.fillRect(raquetteX, 380, 60, 12)\n  ctx.beginPath()\n  ctx.arc(x, y, 8, 0, Math.PI * 2)\n  ctx.fillStyle = 'white'\n  ctx.fill()\n\n  requestAnimationFrame(boucle)\n}\n\nboucle()\n",
    hints: [
      'briques.push({ x: col * 55 + 10, y: ligne * 20 + 10, cassee: false })',
      "ctx.fillStyle = 'skyblue'\nctx.fillRect(brique.x, brique.y, 45, 15)\nif (collision(brique.x, brique.y, 45, 15, x - 8, y - 8, 16, 16)) {\n  brique.cassee = true\n  dy = -dy\n}",
    ],
    check: (_stdout, _get, _c, _f, _d, code) =>
      has(code, /briques\.push\s*\(/) && has(code, /cassee\s*=\s*true/)
        ? ok('Premières briques cassées — tout un tableau qui réagit au jeu ! 🧱')
        : fail('Remplis briques avec briques.push({...}), et marque cassee = true au contact de la balle.'),
  },
  {
    id: 'breakout-4',
    title: 'Ton Casse-briques complet',
    emoji: '🏆',
    xp: 40,
    chapter: 'Chapitre 4 · Casse-briques',
    intro:
      "Ajoute un score qui augmente à chaque brique cassée, affiche-le avec ctx.fillText, et vérifie la victoire avec briques.every(b => b.cassee) — vrai si TOUTES les briques du tableau sont cassées.",
    task:
      "Augmente score de 1 à chaque brique cassée, affiche-le avec ctx.fillText, et affiche \"Gagné !\" quand briques.every(b => b.cassee) est vrai.",
    starterCode:
      "let briques = []\nfor (let col = 0; col < 5; col++) {\n  for (let ligne = 0; ligne < 3; ligne++) {\n    briques.push({ x: col * 55 + 10, y: ligne * 20 + 10, cassee: false })\n  }\n}\n\nlet x = 150, y = 200, dx = 3, dy = 3, raquetteX = 125, score = 0\n\nfunction boucle() {\n  ctx.clearRect(0, 0, canvas.width, canvas.height)\n\n  if (estAppuyee('ArrowLeft')) raquetteX -= 5\n  if (estAppuyee('ArrowRight')) raquetteX += 5\n\n  x += dx\n  y += dy\n  if (x < 0 || x > canvas.width) dx = -dx\n  if (y < 0) dy = -dy\n  if (collision(raquetteX, 380, 60, 12, x - 8, y - 8, 16, 16)) dy = -dy\n\n  for (const brique of briques) {\n    if (!brique.cassee) {\n      ctx.fillStyle = 'skyblue'\n      ctx.fillRect(brique.x, brique.y, 45, 15)\n      if (collision(brique.x, brique.y, 45, 15, x - 8, y - 8, 16, 16)) {\n        brique.cassee = true\n        dy = -dy\n        // Ton code ici : augmente le score\n      }\n    }\n  }\n\n  ctx.fillStyle = 'orange'\n  ctx.fillRect(raquetteX, 380, 60, 12)\n  ctx.beginPath()\n  ctx.arc(x, y, 8, 0, Math.PI * 2)\n  ctx.fillStyle = 'white'\n  ctx.fill()\n\n  // Ton code ici : affiche le score avec ctx.fillText, et \"Gagné !\" si briques.every(b => b.cassee)\n\n  requestAnimationFrame(boucle)\n}\n\nboucle()\n",
    hints: [
      'score = score + 1',
      "ctx.fillStyle = 'white'\nctx.font = '16px sans-serif'\nctx.fillText(`Score : ${score}`, 10, 20)\nif (briques.every((b) => b.cassee)) {\n  ctx.fillText('Gagné !', 120, 200)\n}",
    ],
    check: (_stdout, _get, _c, _f, _d, code) =>
      has(code, /score/) && has(code, /ctx\.fillText\s*\(/) && has(code, /every\s*\(/)
        ? ok('Casse-briques terminé — score, victoire, tout y est ! 🏆')
        : fail("Il faut un score affiché avec ctx.fillText, et une victoire détectée avec briques.every()."),
  },
  // ============================================================
  // SERPENT — mouvement par cases, tableau comme file du corps
  // ============================================================
  {
    id: 'snake-1',
    title: 'Bouger case par case',
    emoji: '🟩',
    xp: 20,
    chapter: 'Chapitre 5 · Serpent',
    intro:
      "Le serpent avance sur une grille de cases de 20 pixels. Pour qu'il n'aille pas trop vite (le jeu tourne à ~60 images par seconde), on n'avance qu'une fois toutes les 8 images grâce à un compteur qui augmente à chaque image.",
    task: "Fais avancer un carré vert case par case vers la droite (x += 20), mais seulement quand compteur % 8 === 0.",
    starterCode:
      "let x = 20\nlet y = 200\nlet compteur = 0\n\nfunction boucle() {\n  ctx.clearRect(0, 0, canvas.width, canvas.height)\n  compteur++\n\n  // Ton code ici : si compteur % 8 === 0, avance x de 20\n\n  ctx.fillStyle = 'limegreen'\n  ctx.fillRect(x, y, 20, 20)\n\n  requestAnimationFrame(boucle)\n}\n\nboucle()\n",
    hints: ['if (compteur % 8 === 0) {\n  x = x + 20\n}'],
    check: (_stdout, _get, _c, _f, _d, code) =>
      has(code, /compteur/) && has(code, /%\s*8/)
        ? ok('Un mouvement case par case, la base du serpent ! 🟩')
        : fail('Utilise compteur % 8 === 0 pour avancer x seulement de temps en temps.'),
  },
  {
    id: 'snake-2',
    title: 'Changer de direction',
    emoji: '🕹️',
    xp: 20,
    chapter: 'Chapitre 5 · Serpent',
    intro:
      "dx et dy représentent la direction actuelle, en pas de 20 pixels (dx = 20 pour aller à droite, dx = -20 pour aller à gauche, etc). Les flèches changent dx/dy ; le déplacement lui-même reste au rythme du compteur.",
    task:
      "Utilise les flèches pour changer dx/dy par pas de 20 (une seule direction à la fois), puis avance x += dx et y += dy seulement quand compteur % 8 === 0.",
    starterCode:
      "let x = 100\nlet y = 200\nlet dx = 20\nlet dy = 0\nlet compteur = 0\n\nfunction boucle() {\n  ctx.clearRect(0, 0, canvas.width, canvas.height)\n  compteur++\n\n  // Ton code ici : change dx/dy selon les flèches\n\n  if (compteur % 8 === 0) {\n    // Ton code ici : avance x et y avec dx et dy\n  }\n\n  ctx.fillStyle = 'limegreen'\n  ctx.fillRect(x, y, 20, 20)\n\n  requestAnimationFrame(boucle)\n}\n\nboucle()\n",
    hints: [
      "if (estAppuyee('ArrowLeft')) { dx = -20; dy = 0 }\nif (estAppuyee('ArrowRight')) { dx = 20; dy = 0 }\nif (estAppuyee('ArrowUp')) { dx = 0; dy = -20 }\nif (estAppuyee('ArrowDown')) { dx = 0; dy = 20 }",
      'x += dx\ny += dy',
    ],
    check: (_stdout, _get, _c, _f, _d, code) =>
      has(code, /estAppuyee\s*\(/) && has(code, /dx\s*=/) && has(code, /dy\s*=/)
        ? ok('Un serpent qui tourne dans les quatre directions ! 🕹️')
        : fail('Change dx et dy selon les flèches (estAppuyee), puis avance x/y avec ces valeurs.'),
  },
  {
    id: 'snake-3',
    title: 'Le corps qui grandit en mangeant',
    emoji: '🍏',
    xp: 25,
    chapter: 'Chapitre 5 · Serpent',
    intro:
      "Le corps du serpent est un tableau de segments { x, y }. À chaque déplacement, on ajoute une nouvelle tête au début avec unshift, et on retire la queue avec pop — sauf quand la tête vient de manger la pomme : là, on garde la queue (le serpent grandit), et hasard() replace la pomme ailleurs.",
    task:
      "À chaque tick, ajoute { x, y } au début de serpent avec unshift. Si la tête est sur la pomme, ne retire pas la queue et replace la pomme avec hasard() ; sinon, retire la queue avec pop().",
    starterCode:
      "let serpent = [{ x: 100, y: 200 }]\nlet dx = 20\nlet dy = 0\nlet compteur = 0\nlet pomme = { x: hasard(0, 14) * 20, y: hasard(0, 19) * 20 }\n\nfunction boucle() {\n  ctx.clearRect(0, 0, canvas.width, canvas.height)\n  compteur++\n\n  if (estAppuyee('ArrowLeft')) { dx = -20; dy = 0 }\n  if (estAppuyee('ArrowRight')) { dx = 20; dy = 0 }\n  if (estAppuyee('ArrowUp')) { dx = 0; dy = -20 }\n  if (estAppuyee('ArrowDown')) { dx = 0; dy = 20 }\n\n  if (compteur % 8 === 0) {\n    const x = serpent[0].x + dx\n    const y = serpent[0].y + dy\n\n    // Ton code ici : unshift la nouvelle tête, gère la pomme mangée, sinon pop() la queue\n  }\n\n  ctx.fillStyle = 'red'\n  ctx.fillRect(pomme.x, pomme.y, 20, 20)\n  ctx.fillStyle = 'limegreen'\n  for (const segment of serpent) {\n    ctx.fillRect(segment.x, segment.y, 20, 20)\n  }\n\n  requestAnimationFrame(boucle)\n}\n\nboucle()\n",
    hints: [
      'serpent.unshift({ x, y })\nif (x === pomme.x && y === pomme.y) {\n  pomme.x = hasard(0, 14) * 20\n  pomme.y = hasard(0, 19) * 20\n} else {\n  serpent.pop()\n}',
    ],
    check: (_stdout, _get, _c, _f, _d, code) =>
      has(code, /unshift\s*\(/) && has(code, /pop\s*\(\)/) && has(code, /hasard\s*\(/)
        ? ok('Le serpent grandit à chaque pomme mangée ! 🍏')
        : fail('Utilise serpent.unshift() pour la tête, serpent.pop() pour la queue, et hasard() pour la nouvelle pomme.'),
  },
  {
    id: 'snake-4',
    title: 'Ton Serpent complet',
    emoji: '🏆',
    xp: 40,
    chapter: 'Chapitre 5 · Serpent',
    intro:
      "Termine le jeu : si la tête touche un autre segment du corps, le serpent s'est mordu la queue — affiche \"Perdu !\" avec ctx.fillText. Affiche aussi serpent.length comme score, bien visible à l'écran.",
    task:
      'Vérifie si la nouvelle tête (x, y) touche un segment déjà présent dans serpent (avec serpent.some(...) par exemple) ; si oui, affiche "Perdu !". Affiche aussi le score (serpent.length) avec ctx.fillText.',
    starterCode:
      "let serpent = [{ x: 100, y: 200 }]\nlet dx = 20\nlet dy = 0\nlet compteur = 0\nlet pomme = { x: hasard(0, 14) * 20, y: hasard(0, 19) * 20 }\nlet perdu = false\n\nfunction boucle() {\n  ctx.clearRect(0, 0, canvas.width, canvas.height)\n  compteur++\n\n  if (!perdu) {\n    if (estAppuyee('ArrowLeft')) { dx = -20; dy = 0 }\n    if (estAppuyee('ArrowRight')) { dx = 20; dy = 0 }\n    if (estAppuyee('ArrowUp')) { dx = 0; dy = -20 }\n    if (estAppuyee('ArrowDown')) { dx = 0; dy = 20 }\n\n    if (compteur % 8 === 0) {\n      const x = serpent[0].x + dx\n      const y = serpent[0].y + dy\n\n      // Ton code ici : si (x, y) touche un segment de serpent, perdu = true\n\n      serpent.unshift({ x, y })\n      if (x === pomme.x && y === pomme.y) {\n        pomme.x = hasard(0, 14) * 20\n        pomme.y = hasard(0, 19) * 20\n      } else {\n        serpent.pop()\n      }\n    }\n  }\n\n  ctx.fillStyle = 'red'\n  ctx.fillRect(pomme.x, pomme.y, 20, 20)\n  ctx.fillStyle = 'limegreen'\n  for (const segment of serpent) {\n    ctx.fillRect(segment.x, segment.y, 20, 20)\n  }\n\n  ctx.fillStyle = 'white'\n  ctx.font = '16px sans-serif'\n  ctx.fillText(`Score : ${serpent.length}`, 10, 20)\n  // Ton code ici : si perdu, affiche \"Perdu !\" avec ctx.fillText\n\n  requestAnimationFrame(boucle)\n}\n\nboucle()\n",
    hints: [
      'if (serpent.some((s) => s.x === x && s.y === y)) {\n  perdu = true\n}',
      "if (perdu) {\n  ctx.fillText('Perdu !', 120, 200)\n}",
    ],
    check: (_stdout, _get, _c, _f, _d, code) =>
      has(code, /some\s*\(/) && has(code, /perdu/) && has(code, /ctx\.fillText\s*\(/)
        ? ok('Serpent terminé — score, croissance, game over, un vrai jeu complet ! 🏆')
        : fail('Détecte la collision avec serpent.some(), passe perdu à true, et affiche "Perdu !" avec ctx.fillText.'),
  },
  {
    id: 'game-8',
    title: 'Bac à sable',
    emoji: '🧪',
    xp: 15,
    chapter: 'Bonus',
    intro:
      "Plus de mission imposée : c'est ton terrain de jeu. canvas, ctx, estAppuyee(), hasard() et collision() sont toujours là. Invente ton propre mini-jeu, ou remixe Attrape-pommes, Casse-briques ou Serpent.",
    task: 'Code ce que tu veux, teste-le, recommence. Amuse-toi !',
    starterCode:
      "// Tout est permis ici : canvas, ctx, estAppuyee('ArrowLeft'|'ArrowRight'|'ArrowUp'|'ArrowDown'|' '),\n// hasard(min, max), collision(x1,y1,l1,h1,x2,y2,l2,h2), requestAnimationFrame(boucle)\n\n// Ton code ici\n",
    hints: ["Recopie et modifie le code d'Attrape-pommes, Casse-briques ou Serpent pour t'entraîner : change les couleurs, la vitesse, les règles..."],
    check: () => ok('Tu as testé ta création — bravo pour tout ce chemin parcouru ! 🎉'),
  },
]
