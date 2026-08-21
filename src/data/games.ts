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
  {
    id: 'game-8',
    title: 'Bac à sable',
    emoji: '🧪',
    xp: 15,
    chapter: 'Bonus',
    intro:
      "Plus de mission imposée : c'est ton terrain de jeu. canvas, ctx, estAppuyee(), hasard() et collision() sont toujours là. Invente ton propre mini-jeu, ou remixe Attrape-pommes.",
    task: 'Code ce que tu veux, teste-le, recommence. Amuse-toi !',
    starterCode:
      "// Tout est permis ici : canvas, ctx, estAppuyee('ArrowLeft'|'ArrowRight'|'ArrowUp'|'ArrowDown'|' '),\n// hasard(min, max), collision(x1,y1,l1,h1,x2,y2,l2,h2), requestAnimationFrame(boucle)\n\n// Ton code ici\n",
    hints: ["Recopie et modifie le code d'Attrape-pommes pour t'entraîner : change les couleurs, la vitesse, ajoute une deuxième pomme..."],
    check: () => ok('Tu as testé ta création — direction le prochain module pour continuer à apprendre !'),
  },
]
