import type { CheckResult, GameTrack } from '../types'

// JavaScript game levels are validated by reading the source the learner wrote (`code`),
// not by inspecting a run trace — the point is to see the game actually move and respond
// to input live, in GameCanvas, rather than replay a deterministic script like the Python
// turtle/farm/donjon bridges do.
const ok = (message: string): CheckResult => ({ ok: true, message })
const fail = (message: string): CheckResult => ({ ok: false, message })

function has(code: string | undefined, pattern: RegExp): boolean {
  return !!code && pattern.test(code)
}

// Fundamentals lessons (visual: false) grade on the real console.log output the code
// produced, like the Python curriculum does — not just on source-code patterns.
const lines = (s: string) =>
  s
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)

const hasLine = (stdout: string, target: string) => lines(stdout).some((l) => l === target)
const hasSubstring = (stdout: string, needle: string) => stdout.toLowerCase().includes(needle.toLowerCase())

export const GAME_TRACKS: GameTrack[] = [
  // ============================================================
  // BASES DE JAVASCRIPT — le langage lui-même, sans canvas : console.log, variables,
  // conditions, boucles, tableaux, fonctions, objets. Chaque check lit la vraie sortie
  // console (comme le parcours Python), en plus de quelques patterns de code essentiels.
  // ============================================================
  {
    id: 'bases-js',
    title: 'Bases de JavaScript',
    emoji: '📗',
    description: "Le langage lui-même, sans jeu ni canvas : variables, conditions, boucles, fonctions.",
    difficulty: 'Débutant',
    color: 'from-indigo-400 to-violet-500',
    steps: [
      {
        id: 'jsfond-1',
        trackId: 'bases-js',
        title: 'Afficher du texte',
        emoji: '💬',
        xp: 10,
        visual: false,
        controls: 'none',
        intro:
          "console.log(...) affiche quelque chose dans la console du navigateur — l'équivalent de print() en Python. C'est le tout premier outil pour voir ce que fait ton code.",
        task: 'Affiche le texte "Bonjour" dans la console.',
        starterCode: '// Ton code ici\n',
        hints: ['console.log("Bonjour")'],
        check: (stdout) =>
          hasLine(stdout, 'Bonjour') ? ok('Ton premier affichage ! 💬') : fail('Utilise console.log("Bonjour").'),
      },
      {
        id: 'jsfond-2',
        trackId: 'bases-js',
        title: 'Une variable',
        emoji: '📦',
        xp: 15,
        visual: false,
        controls: 'none',
        intro:
          "`let nom = valeur` crée une variable : une boîte étiquetée qui contient une valeur, réutilisable partout ensuite dans le code.",
        task: 'Crée une variable prenom contenant ton prénom, puis affiche-la avec console.log.',
        starterCode: '// Ton code ici\n',
        hints: ['let prenom = "Ada"\nconsole.log(prenom)'],
        check: (stdout, _get, _c, _f, _d, code) =>
          has(code, /let\s+prenom\s*=/) && stdout.trim().length > 0
            ? ok('Une variable créée, puis affichée ! 📦')
            : fail('Crée `let prenom = ...`, puis affiche-la avec console.log(prenom).'),
      },
      {
        id: 'jsfond-3',
        trackId: 'bases-js',
        title: 'Calculs',
        emoji: '🔢',
        xp: 15,
        visual: false,
        controls: 'none',
        intro: 'JS calcule comme une calculatrice : +, -, *, / (division), % (le reste d\'une division).',
        task: 'Calcule 7 * 6 et affiche le résultat.',
        starterCode: '// Ton code ici\n',
        hints: ['console.log(7 * 6)'],
        check: (stdout, _get, _c, _f, _d, code) =>
          has(code, /\*/) && hasLine(stdout, '42')
            ? ok('42, le calcul est bon ! 🔢')
            : fail('Utilise * pour multiplier, et affiche le résultat avec console.log.'),
      },
      {
        id: 'jsfond-4',
        trackId: 'bases-js',
        title: 'Du texte avec des variables dedans',
        emoji: '🔤',
        xp: 15,
        visual: false,
        controls: 'none',
        intro:
          'Avec des backticks `...` (pas des guillemets), tu peux glisser une variable directement dans du texte grâce à ${variable} — un template literal.',
        task: 'Crée une variable prenom, puis affiche `Bonjour ${prenom} !` avec un template literal.',
        starterCode: '// Ton code ici\n',
        hints: ['let prenom = "Ada"\nconsole.log(`Bonjour ${prenom} !`)'],
        check: (stdout, _get, _c, _f, _d, code) =>
          has(code, /\$\{/) && hasSubstring(stdout, 'bonjour') && hasSubstring(stdout, '!')
            ? ok('Un vrai message personnalisé ! 🔤')
            : fail('Utilise un template literal `Bonjour ${prenom} !` (avec des backticks).'),
      },
      {
        id: 'jsfond-5',
        trackId: 'bases-js',
        title: 'Comparer des valeurs',
        emoji: '⚖️',
        xp: 15,
        visual: false,
        controls: 'none',
        intro:
          '=== compare deux valeurs (toujours === en JS, pas =, qui sert à autre chose). < et > comparent des nombres. Le résultat est true ou false.',
        task: 'Affiche le résultat de la comparaison 10 > 3.',
        starterCode: '// Ton code ici\n',
        hints: ['console.log(10 > 3)'],
        check: (stdout, _get, _c, _f, _d, code) =>
          has(code, />/) && hasLine(stdout, 'true')
            ? ok('true — la comparaison fonctionne ! ⚖️')
            : fail('Compare deux nombres avec > et affiche le résultat avec console.log.'),
      },
      {
        id: 'jsfond-6',
        trackId: 'bases-js',
        title: 'Conditions',
        emoji: '🤔',
        xp: 20,
        visual: false,
        controls: 'none',
        intro:
          'if (condition) { ... } else { ... } exécute un bloc de code seulement si la condition est vraie, et l\'autre bloc sinon.',
        task: 'Crée une variable age ; si elle est supérieure ou égale à 18, affiche "Majeur", sinon affiche "Mineur".',
        starterCode: '// Ton code ici\n',
        hints: ['let age = 20\nif (age >= 18) {\n  console.log("Majeur")\n} else {\n  console.log("Mineur")\n}'],
        check: (stdout, _get, _c, _f, _d, code) =>
          has(code, /if\s*\(/) && has(code, /else/) && (hasLine(stdout, 'Majeur') || hasLine(stdout, 'Mineur'))
            ? ok('Une vraie décision prise par ton code ! 🤔')
            : fail('Utilise if/else, et affiche "Majeur" ou "Mineur" selon age.'),
      },
      {
        id: 'jsfond-7',
        trackId: 'bases-js',
        title: 'Un tableau',
        emoji: '📋',
        xp: 20,
        visual: false,
        controls: 'none',
        intro:
          'Un tableau [valeur1, valeur2, ...] range plusieurs valeurs dans l\'ordre. fruits[0] accède au premier élément — les indices commencent à 0.',
        task: 'Crée un tableau fruits avec 3 fruits, puis affiche le premier avec fruits[0].',
        starterCode: '// Ton code ici\n',
        hints: ['let fruits = ["pomme", "banane", "kiwi"]\nconsole.log(fruits[0])'],
        check: (stdout, _get, _c, _f, _d, code) =>
          has(code, /\[.+\]/) && has(code, /\[0\]/) && stdout.trim().length > 0
            ? ok('Un tableau, et son premier élément affiché ! 📋')
            : fail('Crée un tableau avec [valeur1, valeur2, ...], puis affiche fruits[0].'),
      },
      {
        id: 'jsfond-8',
        trackId: 'bases-js',
        title: 'Boucle for',
        emoji: '🔁',
        xp: 20,
        visual: false,
        controls: 'none',
        intro:
          'for (let i = 0; i < 5; i++) { ... } répète un bloc de code plusieurs fois : i vaut 0, puis 1, puis 2... jusqu\'à ne plus être < 5.',
        task: 'Affiche les nombres de 1 à 5 avec une boucle for.',
        starterCode: '// Ton code ici\n',
        hints: ['for (let i = 1; i <= 5; i++) {\n  console.log(i)\n}'],
        check: (stdout, _get, _c, _f, _d, code) =>
          has(code, /for\s*\(/) && hasLine(stdout, '1') && hasLine(stdout, '5')
            ? ok('Cinq lignes affichées avec seulement trois lignes de code ! 🔁')
            : fail('Utilise une boucle for pour afficher les nombres de 1 à 5.'),
      },
      {
        id: 'jsfond-9',
        trackId: 'bases-js',
        title: 'Parcourir un tableau',
        emoji: '🧺',
        xp: 20,
        visual: false,
        controls: 'none',
        intro:
          'for (const élément of tableau) { ... } parcourt chaque élément d\'un tableau un par un — pas besoin de gérer les indices toi-même.',
        task: 'Crée un tableau de 3 nombres, puis affiche chacun avec une boucle for...of.',
        starterCode: '// Ton code ici\n',
        hints: ['let nombres = [4, 8, 15]\nfor (const n of nombres) {\n  console.log(n)\n}'],
        check: (stdout, _get, _c, _f, _d, code) =>
          has(code, /for\s*\(\s*(const|let)\s+\w+\s+of\s+/) && stdout.trim().length > 0
            ? ok('Un tableau entier parcouru en trois lignes ! 🧺')
            : fail('Utilise for (const élément of tonTableau) { ... }.'),
      },
      {
        id: 'jsfond-10',
        trackId: 'bases-js',
        title: 'Une fonction',
        emoji: '🛠️',
        xp: 20,
        visual: false,
        controls: 'none',
        intro: 'function nom() { ... } regroupe du code réutilisable sous un nom. On l\'exécute avec nom().',
        task: 'Crée une fonction saluer() qui affiche "Salut !", puis appelle-la.',
        starterCode: '// Ton code ici\n',
        hints: ['function saluer() {\n  console.log("Salut !")\n}\n\nsaluer()'],
        check: (stdout, _get, _c, _f, _d, code) =>
          has(code, /function\s+saluer\s*\(/) && has(code, /saluer\s*\(\s*\)/g) && hasLine(stdout, 'Salut !')
            ? ok('Une fonction définie, puis appelée ! 🛠️')
            : fail('Crée function saluer() { ... }, puis appelle-la avec saluer().'),
      },
      {
        id: 'jsfond-11',
        trackId: 'bases-js',
        title: 'Paramètres et retour',
        emoji: '🔄',
        xp: 25,
        visual: false,
        controls: 'none',
        intro:
          'Une fonction peut recevoir des informations entre parenthèses (des paramètres), et renvoyer un résultat avec return au lieu de l\'afficher directement.',
        task: 'Crée une fonction carre(n) qui renvoie n * n avec return, puis affiche console.log(carre(4)).',
        starterCode: '// Ton code ici\n',
        hints: ['function carre(n) {\n  return n * n\n}\n\nconsole.log(carre(4))'],
        check: (stdout, _get, _c, _f, _d, code) =>
          has(code, /function\s+carre\s*\(/) && has(code, /return/) && hasLine(stdout, '16')
            ? ok('Une fonction qui calcule ET renvoie un résultat ! 🔄')
            : fail('Utilise return dans carre(n), et affiche console.log(carre(4)).'),
      },
      {
        id: 'jsfond-12',
        trackId: 'bases-js',
        title: 'Un objet',
        emoji: '🗂️',
        xp: 25,
        visual: false,
        controls: 'none',
        intro:
          'Un objet { clé: valeur, ... } range des informations liées entre elles, chacune sous un nom. joueur.nom accède à la propriété nom de l\'objet joueur.',
        task: 'Crée un objet joueur avec une propriété nom, puis affiche-la avec joueur.nom.',
        starterCode: '// Ton code ici\n',
        hints: ['let joueur = { nom: "Ada", score: 0 }\nconsole.log(joueur.nom)'],
        check: (stdout, _get, _c, _f, _d, code) =>
          has(code, /\{[^{}]*:[^{}]*\}/) && has(code, /\.\w+/) && stdout.trim().length > 0
            ? ok('Un objet créé, une propriété lue — tu es prêt pour les jeux ! 🗂️')
            : fail('Crée un objet { nom: ... }, puis affiche-le avec joueur.nom.'),
      },
    ],
  },
  // ============================================================
  // ATTRAPE-POMMES — le premier jeu : dessiner, animer, clavier, chute, collision, score
  // ============================================================
  {
    id: 'attrape-pommes',
    title: 'Attrape-pommes',
    emoji: '🍎',
    description: 'Un panier, des pommes qui tombent, et un score à faire grimper.',
    difficulty: 'Débutant',
    color: 'from-sky-400 to-cyan-500',
    steps: [
      {
        id: 'game-1',
        trackId: 'attrape-pommes',
        title: 'Dessiner un carré',
        emoji: '🟪',
        xp: 15,
        intro:
          "Bienvenue dans l'atelier de jeux vidéo ! `canvas` et `ctx` sont déjà prêts pour toi : ctx est ton pinceau, canvas est ta feuille (300 x 400 pixels, coin en haut à gauche = (0, 0).",
        task: 'Dessine un carré violet de 50x50 pixels, quelque part sur le canvas.',
        starterCode: '// canvas et ctx sont déjà prêts pour toi (300 x 400 pixels)\n\n// Ton code ici\n',
        hints: ["ctx.fillStyle = 'violet'", 'ctx.fillRect(125, 175, 50, 50)'],
        check: (_stdout, _get, _c, _f, _d, code) =>
          has(code, /ctx\.fillStyle/) && has(code, /ctx\.fillRect\s*\(/)
            ? ok('Ton premier dessin sur le canvas ! 🎨')
            : fail("Utilise ctx.fillStyle pour choisir une couleur, puis ctx.fillRect(x, y, largeur, hauteur)."),
      },
      {
        id: 'game-2',
        trackId: 'attrape-pommes',
        title: 'Ça bouge tout seul',
        emoji: '🔵',
        xp: 20,
        intro:
          "Un jeu, c'est une image qui se répète très vite. La fonction `boucle()` s'appelle elle-même à chaque image grâce à `requestAnimationFrame(boucle)` — c'est le cœur battant de tout jeu vidéo. `ctx.clearRect(0, 0, canvas.width, canvas.height)` efface l'écran avant de tout redessiner.",
        task: "Complète la boucle : fais avancer x à chaque image, et dessine un cercle cyan qui le suit.",
        starterCode:
          "let x = 20\n\nfunction boucle() {\n  ctx.clearRect(0, 0, canvas.width, canvas.height)\n\n  // Ton code ici : incrémente x, puis dessine le cercle\n\n  requestAnimationFrame(boucle)\n}\n\nboucle()\n",
        hints: [
          'x = x + 3',
          "ctx.beginPath()\nctx.arc(x, 200, 15, 0, Math.PI * 2)\nctx.fillStyle = 'cyan'\nctx.fill()",
        ],
        check: (_stdout, _get, _c, _f, _d, code) =>
          has(code, /requestAnimationFrame\s*\(/) &&
          has(code, /ctx\.arc\s*\(/) &&
          has(code, /clearRect/) &&
          has(code, /ctx\.beginPath\s*\(\s*\)/)
            ? ok('Ta première animation ! Le cercle glisse tout seul. 🌀')
            : fail(
                'Il faut requestAnimationFrame, clearRect, ctx.beginPath() (avec ses parenthèses !) et ctx.arc pour dessiner et animer le cercle.',
              ),
      },
      {
        id: 'game-3',
        trackId: 'attrape-pommes',
        title: 'Contrôle au clavier',
        emoji: '🎮',
        xp: 20,
        intro:
          "`estAppuyee('ArrowLeft')` renvoie `true` si la touche est actuellement appuyée (flèches du clavier, ou les boutons tactiles à l'écran — les deux marchent pareil).",
        task: 'Fais bouger le carré vers la gauche et la droite avec les flèches du clavier.',
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
        trackId: 'attrape-pommes',
        title: 'Ça tombe !',
        emoji: '🍎',
        xp: 20,
        intro:
          "Une variable `y` qui augmente à chaque image simule la gravité. Quand l'objet touche le bas de l'écran, remets-le en haut avec une nouvelle position aléatoire : `hasard(min, max)` te donne un nombre entier au hasard.",
        task:
          "Fais tomber une pomme depuis le haut de l'écran ; quand elle atteint le bas, fais-la réapparaître en haut, à une position horizontale différente.",
        starterCode:
          "let x = 150\nlet y = 0\n\nfunction boucle() {\n  ctx.clearRect(0, 0, canvas.width, canvas.height)\n\n  // Ton code ici : fais tomber y, et réinitialise-le en bas de l'écran\n\n  ctx.beginPath()\n  ctx.arc(x, y, 12, 0, Math.PI * 2)\n  ctx.fillStyle = 'red'\n  ctx.fill()\n\n  requestAnimationFrame(boucle)\n}\n\nboucle()\n",
        hints: ['y = y + 3', 'if (y > 400) {\n  y = 0\n  x = hasard(0, 270)\n}'],
        check: (_stdout, _get, _c, _f, _d, code) =>
          has(code, /hasard\s*\(/) && has(code, /y\s*(\+=|=\s*y\s*\+)/)
            ? ok("La pomme tombe et recommence à l'infini ! 🍎")
            : fail('Il faut augmenter y à chaque image, et utiliser hasard() pour la repositionner en haut.'),
      },
      {
        id: 'game-5',
        trackId: 'attrape-pommes',
        title: 'Détecter les collisions',
        emoji: '💥',
        xp: 25,
        intro:
          "`collision(x1, y1, l1, h1, x2, y2, l2, h2)` renvoie `true` si deux rectangles se touchent — exactement ce qu'il faut pour savoir si ton panier attrape la pomme.",
        task:
          'Détecte si le panier touche la pomme. Si oui, affiche un message dans la console, et fais réapparaître la pomme en haut.',
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
        trackId: 'attrape-pommes',
        title: 'Afficher le score',
        emoji: '🔤',
        xp: 20,
        intro:
          "`ctx.fillText(texte, x, y)` écrit du texte directement sur le canvas — bien plus pratique qu'un console.log pour un score affiché en jeu.",
        task: 'Ajoute un score qui augmente à chaque pomme attrapée, et affiche-le directement sur le canvas.',
        starterCode:
          "let panierX = 125\nlet pommeX = 150\nlet pommeY = 0\nlet score = 0\n\nfunction boucle() {\n  ctx.clearRect(0, 0, canvas.width, canvas.height)\n\n  if (estAppuyee('ArrowLeft')) panierX -= 4\n  if (estAppuyee('ArrowRight')) panierX += 4\n\n  pommeY += 3\n  if (collision(panierX, 360, 50, 20, pommeX - 12, pommeY - 12, 24, 24)) {\n    // Ton code ici : augmente le score, et fais retomber la pomme\n  }\n\n  ctx.fillStyle = 'orange'\n  ctx.fillRect(panierX, 360, 50, 20)\n  ctx.beginPath()\n  ctx.arc(pommeX, pommeY, 12, 0, Math.PI * 2)\n  ctx.fillStyle = 'red'\n  ctx.fill()\n\n  // Ton code ici : affiche le score avec ctx.fillText\n\n  requestAnimationFrame(boucle)\n}\n\nboucle()\n",
        hints: [
          'score = score + 1\npommeY = 0\npommeX = hasard(0, 270)',
          "ctx.fillStyle = 'white'\nctx.font = '20px sans-serif'\nctx.fillText(`Score : ${score}`, 10, 20)",
        ],
        check: (_stdout, _get, _c, _f, _d, code) =>
          has(code, /ctx\.fillText\s*\(/) && has(code, /score/)
            ? ok("Le score est bien à l'écran, comme dans un vrai jeu ! 🏅")
            : fail('Utilise ctx.fillText() pour afficher la variable score sur le canvas.'),
      },
      {
        id: 'game-7',
        trackId: 'attrape-pommes',
        title: 'Ton jeu complet',
        emoji: '🏆',
        xp: 45,
        intro:
          "Tu as tous les morceaux : boucle d'animation, contrôle au clavier, chute, collision, score. Assemble-les dans un seul jeu complet, prêt à jouer — et à retester autant de fois que tu veux.",
        task:
          'Assemble le jeu complet : détection du contact, score qui augmente, pomme qui retombe, score affiché.',
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
                "Il manque un ingrédient : vérifie que tu utilises collision(), le score qui augmente, et ctx.fillText() pour l'afficher.",
              ),
      },
    ],
  },
  // ============================================================
  // PONG — rebond sur 4 murs, deux joueurs sur un même écran
  // ============================================================
  {
    id: 'pong',
    title: 'Pong à deux',
    emoji: '🏓',
    description: 'Le classique en un contre un, sur le même écran.',
    difficulty: 'Débutant',
    color: 'from-emerald-400 to-teal-500',
    steps: [
      {
        id: 'pong-1',
        trackId: 'pong',
        title: 'Une balle qui rebondit partout',
        emoji: '⚪',
        xp: 20,
        intro:
          "Contrairement à Attrape-pommes où seule la gravité comptait, dans Pong la balle rebondit sur les 4 bords : gauche, droite, haut ET bas. Les joueurs, eux, la rattraperont avec leur raquette plus tard.",
        task: 'Fais rebondir une balle sur les 4 bords du canvas.',
        starterCode:
          "let x = 150\nlet y = 200\nlet dx = 3\nlet dy = 2\n\nfunction boucle() {\n  ctx.clearRect(0, 0, canvas.width, canvas.height)\n\n  x += dx\n  y += dy\n\n  // Ton code ici : inverse dx sur les bords gauche/droit, dy sur les bords haut/bas\n\n  ctx.beginPath()\n  ctx.arc(x, y, 8, 0, Math.PI * 2)\n  ctx.fillStyle = 'white'\n  ctx.fill()\n\n  requestAnimationFrame(boucle)\n}\n\nboucle()\n",
        hints: [
          'if (x < 0 || x > canvas.width) {\n  dx = -dx\n}\nif (y < 0 || y > canvas.height) {\n  dy = -dy\n}',
        ],
        check: (_stdout, _get, _c, _f, _d, code) =>
          has(code, /dx\s*=\s*-\s*dx/) && has(code, /dy\s*=\s*-\s*dy/)
            ? ok('La balle rebondit sur les 4 bords ! ⚪')
            : fail('Inverse dx (dx = -dx) sur les bords gauche/droit, et dy (dy = -dy) en haut/bas.'),
      },
      {
        id: 'pong-2',
        trackId: 'pong',
        title: 'Deux raquettes, deux joueurs',
        emoji: '🕹️',
        xp: 20,
        intro:
          "Pong se joue à deux, sur le même écran. Le joueur de gauche utilise W (monter) et S (descendre), le joueur de droite utilise les flèches ↑ et ↓ : `estAppuyee('w')` fonctionne exactement comme pour les flèches.",
        task: 'Ajoute deux raquettes verticales : la gauche au clavier W/S, la droite aux flèches haut/bas.',
        starterCode:
          "let raquetteGaucheY = 160\nlet raquetteDroiteY = 160\n\nfunction boucle() {\n  ctx.clearRect(0, 0, canvas.width, canvas.height)\n\n  // Ton code ici : bouge raquetteGaucheY avec w/s, raquetteDroiteY avec les flèches haut/bas\n\n  ctx.fillStyle = 'white'\n  ctx.fillRect(10, raquetteGaucheY, 10, 60)\n  ctx.fillRect(280, raquetteDroiteY, 10, 60)\n\n  requestAnimationFrame(boucle)\n}\n\nboucle()\n",
        hints: [
          "if (estAppuyee('w')) raquetteGaucheY -= 5\nif (estAppuyee('s')) raquetteGaucheY += 5\nif (estAppuyee('ArrowUp')) raquetteDroiteY -= 5\nif (estAppuyee('ArrowDown')) raquetteDroiteY += 5",
        ],
        check: (_stdout, _get, _c, _f, _d, code) =>
          has(code, /estAppuyee\s*\(\s*['"]w['"]/) && has(code, /estAppuyee\s*\(\s*['"]ArrowUp['"]/)
            ? ok('Deux joueurs, deux raquettes, sur le même clavier ! 🕹️')
            : fail("Utilise estAppuyee('w')/estAppuyee('s') pour la gauche, et les flèches pour la droite."),
      },
      {
        id: 'pong-3',
        trackId: 'pong',
        title: 'Rebond sur les raquettes et score',
        emoji: '💥',
        xp: 25,
        intro:
          "Utilise collision() pour faire rebondir la balle sur chaque raquette (inverse dx). Si elle sort complètement à gauche ou à droite sans être rattrapée, l'autre joueur marque un point et la balle revient au centre.",
        task:
          'Fais rebondir la balle sur les deux raquettes ; si elle sort à gauche ou à droite, marque un point pour l\'autre joueur et remets la balle au centre.',
        starterCode:
          "let x = 150, y = 200, dx = 3, dy = 2\nlet raquetteGaucheY = 160\nlet raquetteDroiteY = 160\nlet scoreGauche = 0\nlet scoreDroite = 0\n\nfunction boucle() {\n  ctx.clearRect(0, 0, canvas.width, canvas.height)\n\n  if (estAppuyee('w')) raquetteGaucheY -= 5\n  if (estAppuyee('s')) raquetteGaucheY += 5\n  if (estAppuyee('ArrowUp')) raquetteDroiteY -= 5\n  if (estAppuyee('ArrowDown')) raquetteDroiteY += 5\n\n  x += dx\n  y += dy\n  if (y < 0 || y > canvas.height) dy = -dy\n\n  // Ton code ici : rebond sur les raquettes avec collision(), et point marqué si la balle sort\n\n  ctx.fillStyle = 'white'\n  ctx.fillRect(10, raquetteGaucheY, 10, 60)\n  ctx.fillRect(280, raquetteDroiteY, 10, 60)\n  ctx.beginPath()\n  ctx.arc(x, y, 8, 0, Math.PI * 2)\n  ctx.fill()\n\n  requestAnimationFrame(boucle)\n}\n\nboucle()\n",
        hints: [
          'if (collision(10, raquetteGaucheY, 10, 60, x - 8, y - 8, 16, 16)) dx = -dx\nif (collision(280, raquetteDroiteY, 10, 60, x - 8, y - 8, 16, 16)) dx = -dx',
          'if (x < 0) {\n  scoreDroite++\n  x = 150\n  y = 200\n}\nif (x > canvas.width) {\n  scoreGauche++\n  x = 150\n  y = 200\n}',
        ],
        check: (_stdout, _get, _c, _f, _d, code) =>
          has(code, /collision\s*\(/) && has(code, /score(Gauche|Droite)\s*(\+\+|\+=|=\s*score)/)
            ? ok('La balle rebondit sur les raquettes, et les points tombent ! 💥')
            : fail('Utilise collision() pour rebondir sur les raquettes, et incrémente scoreGauche/scoreDroite.'),
      },
      {
        id: 'pong-4',
        trackId: 'pong',
        title: 'Ton Pong complet',
        emoji: '🏆',
        xp: 40,
        intro: "Affiche le score des deux joueurs avec ctx.fillText, bien visible en haut de l'écran.",
        task: "Affiche le score des deux joueurs en haut de l'écran.",
        starterCode:
          "let x = 150, y = 200, dx = 3, dy = 2\nlet raquetteGaucheY = 160\nlet raquetteDroiteY = 160\nlet scoreGauche = 0\nlet scoreDroite = 0\n\nfunction boucle() {\n  ctx.clearRect(0, 0, canvas.width, canvas.height)\n\n  if (estAppuyee('w')) raquetteGaucheY -= 5\n  if (estAppuyee('s')) raquetteGaucheY += 5\n  if (estAppuyee('ArrowUp')) raquetteDroiteY -= 5\n  if (estAppuyee('ArrowDown')) raquetteDroiteY += 5\n\n  x += dx\n  y += dy\n  if (y < 0 || y > canvas.height) dy = -dy\n  if (collision(10, raquetteGaucheY, 10, 60, x - 8, y - 8, 16, 16)) dx = -dx\n  if (collision(280, raquetteDroiteY, 10, 60, x - 8, y - 8, 16, 16)) dx = -dx\n  if (x < 0) {\n    scoreDroite++\n    x = 150\n    y = 200\n  }\n  if (x > canvas.width) {\n    scoreGauche++\n    x = 150\n    y = 200\n  }\n\n  ctx.fillStyle = 'white'\n  ctx.fillRect(10, raquetteGaucheY, 10, 60)\n  ctx.fillRect(280, raquetteDroiteY, 10, 60)\n  ctx.beginPath()\n  ctx.arc(x, y, 8, 0, Math.PI * 2)\n  ctx.fill()\n\n  // Ton code ici : affiche le score avec ctx.fillText\n\n  requestAnimationFrame(boucle)\n}\n\nboucle()\n",
        hints: [
          "ctx.font = '20px sans-serif'\nctx.fillText(`${scoreGauche} - ${scoreDroite}`, 130, 30)",
        ],
        check: (_stdout, _get, _c, _f, _d, code) =>
          has(code, /ctx\.fillText\s*\(/) && has(code, /collision\s*\(/) && has(code, /score/)
            ? ok('Pong est complet — deux joueurs, un seul clavier, que la partie commence ! 🏆')
            : fail("Il manque ctx.fillText() pour afficher scoreGauche et scoreDroite."),
      },
    ],
  },
  // ============================================================
  // CASSE-BRIQUES — vitesse en deux directions (rebond) + tableau d'objets
  // ============================================================
  {
    id: 'casse-briques',
    title: 'Casse-briques',
    emoji: '🧱',
    description: 'Une balle, une raquette, un mur de briques à détruire.',
    difficulty: 'Intermédiaire',
    color: 'from-orange-400 to-amber-500',
    steps: [
      {
        id: 'breakout-1',
        trackId: 'casse-briques',
        title: 'Une balle qui rebondit',
        emoji: '⚪',
        xp: 20,
        intro:
          "Dans Casse-briques, la balle avance en ligne droite : dx et dy sont sa vitesse horizontale et verticale. À chaque image, x += dx et y += dy. Quand elle touche un bord, on inverse le signe de la vitesse correspondante : dx = -dx.",
        task: 'Fais rebondir une balle sur les murs gauche, droit et haut du canvas.',
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
        trackId: 'casse-briques',
        title: 'La raquette qui rattrape',
        emoji: '🏓',
        xp: 20,
        intro:
          "Ajoute une raquette contrôlée au clavier. Si la balle la touche (avec collision()), fais-la remonter en inversant dy — sinon elle tombe dans le vide, comme au vrai Casse-briques.",
        task: 'Ajoute une raquette contrôlée au clavier, et fais rebondir la balle dessus.',
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
        trackId: 'casse-briques',
        title: 'Une grille de briques qui se cassent',
        emoji: '🧱',
        xp: 25,
        intro:
          "Pour gérer plusieurs briques à la fois, on les stocke dans un tableau (array). Chaque brique est un objet { x, y, cassee: false }. On les dessine toutes avec une boucle for...of, et on vérifie la collision avec chacune.",
        task:
          'Crée une grille de 5x3 briques, dessine celles qui ne sont pas cassées, et casse une brique quand la balle la touche.',
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
        trackId: 'casse-briques',
        title: 'Ton Casse-briques complet',
        emoji: '🏆',
        xp: 40,
        intro:
          "Ajoute un score qui augmente à chaque brique cassée, affiche-le avec ctx.fillText, et vérifie la victoire avec briques.every(b => b.cassee) — vrai si TOUTES les briques du tableau sont cassées.",
        task: "Ajoute un score qui augmente à chaque brique cassée, affiche-le, et affiche un message de victoire quand toutes les briques sont cassées.",
        starterCode:
          "let briques = []\nfor (let col = 0; col < 5; col++) {\n  for (let ligne = 0; ligne < 3; ligne++) {\n    briques.push({ x: col * 55 + 10, y: ligne * 20 + 10, cassee: false })\n  }\n}\n\nlet x = 150, y = 200, dx = 3, dy = 3, raquetteX = 125, score = 0\n\nfunction boucle() {\n  ctx.clearRect(0, 0, canvas.width, canvas.height)\n\n  if (estAppuyee('ArrowLeft')) raquetteX -= 5\n  if (estAppuyee('ArrowRight')) raquetteX += 5\n\n  x += dx\n  y += dy\n  if (x < 0 || x > canvas.width) dx = -dx\n  if (y < 0) dy = -dy\n  if (collision(raquetteX, 380, 60, 12, x - 8, y - 8, 16, 16)) dy = -dy\n\n  for (const brique of briques) {\n    if (!brique.cassee) {\n      ctx.fillStyle = 'skyblue'\n      ctx.fillRect(brique.x, brique.y, 45, 15)\n      if (collision(brique.x, brique.y, 45, 15, x - 8, y - 8, 16, 16)) {\n        brique.cassee = true\n        dy = -dy\n        // Ton code ici : augmente le score\n      }\n    }\n  }\n\n  ctx.fillStyle = 'orange'\n  ctx.fillRect(raquetteX, 380, 60, 12)\n  ctx.beginPath()\n  ctx.arc(x, y, 8, 0, Math.PI * 2)\n  ctx.fillStyle = 'white'\n  ctx.fill()\n\n  // Ton code ici : affiche le score avec ctx.fillText, et \"Gagné !\" si briques.every(b => b.cassee)\n\n  requestAnimationFrame(boucle)\n}\n\nboucle()\n",
        hints: [
          'score = score + 1',
          "ctx.fillStyle = 'white'\nctx.font = '16px sans-serif'\nctx.fillText(`Score : ${score}`, 10, 20)\nif (briques.every((b) => b.cassee)) {\n  ctx.fillText('Gagné !', 120, 200)\n}",
        ],
        check: (_stdout, _get, _c, _f, _d, code) =>
          has(code, /score/) && has(code, /ctx\.fillText\s*\(/) && has(code, /every\s*\(/)
            ? ok('Casse-briques terminé — score, victoire, tout y est ! 🏆')
            : fail('Il faut un score affiché avec ctx.fillText, et une victoire détectée avec briques.every().'),
      },
    ],
  },
  // ============================================================
  // MORPION — pas de boucle temps réel : clics souris/tactile, tableau 2D, victoire
  // ============================================================
  {
    id: 'morpion',
    title: 'Morpion',
    emoji: '⭕',
    description: 'Le morpion classique, en tour par tour, avec détection de victoire.',
    difficulty: 'Débutant',
    color: 'from-violet-400 to-purple-500',
    steps: [
      {
        id: 'morpion-1',
        trackId: 'morpion',
        title: 'Dessiner la grille et détecter les clics',
        emoji: '📐',
        xp: 20,
        controls: 'none',
        intro:
          "Morpion n'a pas de boucle d'animation : le plateau ne change que quand on clique. `canvas.addEventListener('click', fonction)` appelle ta fonction à chaque clic (ou tape à l'écran), avec `e.offsetX` / `e.offsetY` comme coordonnées du clic.",
        task: 'Dessine une grille 3x3, puis affiche dans la console la colonne et la ligne sur lesquelles on clique.',
        starterCode:
          "for (let col = 0; col < 3; col++) {\n  for (let ligne = 0; ligne < 3; ligne++) {\n    ctx.strokeStyle = 'white'\n    ctx.lineWidth = 2\n    ctx.strokeRect(col * 100, ligne * 100, 100, 100)\n  }\n}\n\ncanvas.addEventListener('click', function (e) {\n  // Ton code ici : calcule colonne et ligne à partir de e.offsetX / e.offsetY, et affiche-les\n})\n",
        hints: ['const colonne = Math.floor(e.offsetX / 100)\nconst ligne = Math.floor(e.offsetY / 100)\nconsole.log(colonne, ligne)'],
        check: (_stdout, _get, _c, _f, _d, code) =>
          has(code, /addEventListener\s*\(\s*['"]click['"]/) && has(code, /offsetX/)
            ? ok('La grille est là, et elle sait où tu cliques ! 📐')
            : fail("Utilise canvas.addEventListener('click', ...) et e.offsetX/e.offsetY pour repérer le clic."),
      },
      {
        id: 'morpion-2',
        trackId: 'morpion',
        title: 'Jouer un tour',
        emoji: '❌',
        xp: 20,
        controls: 'none',
        intro:
          "grille est un tableau 3x3 (un tableau de tableaux) qui contient null, 'X' ou 'O'. joueurActuel alterne entre 'X' et 'O' après chaque coup valide.",
        task: "Au clic sur une case vide, place-y le joueur actuel, puis passe la main à l'autre joueur.",
        starterCode:
          "let grille = [\n  [null, null, null],\n  [null, null, null],\n  [null, null, null],\n]\nlet joueurActuel = 'X'\n\nfunction dessiner() {\n  ctx.clearRect(0, 0, canvas.width, canvas.height)\n  for (let col = 0; col < 3; col++) {\n    for (let ligne = 0; ligne < 3; ligne++) {\n      ctx.strokeStyle = 'white'\n      ctx.lineWidth = 2\n      ctx.strokeRect(col * 100, ligne * 100, 100, 100)\n      if (grille[ligne][col]) {\n        ctx.fillStyle = 'white'\n        ctx.font = '48px sans-serif'\n        ctx.fillText(grille[ligne][col], col * 100 + 35, ligne * 100 + 65)\n      }\n    }\n  }\n}\n\ncanvas.addEventListener('click', function (e) {\n  const col = Math.floor(e.offsetX / 100)\n  const ligne = Math.floor(e.offsetY / 100)\n\n  // Ton code ici : si grille[ligne][col] est vide, joue joueurActuel dedans et change de joueur\n\n  dessiner()\n})\n\ndessiner()\n",
        hints: [
          "if (grille[ligne][col] === null) {\n  grille[ligne][col] = joueurActuel\n  joueurActuel = joueurActuel === 'X' ? 'O' : 'X'\n}",
        ],
        check: (_stdout, _get, _c, _f, _d, code) =>
          has(code, /grille\[ligne\]\[col\]\s*=\s*joueurActuel/) && has(code, /joueurActuel\s*=/)
            ? ok('X et O apparaissent chacun leur tour, un vrai morpion jouable ! ❌')
            : fail('Place joueurActuel dans grille[ligne][col] si la case est vide, puis change de joueur.'),
      },
      {
        id: 'morpion-3',
        trackId: 'morpion',
        title: 'Détecter la victoire',
        emoji: '🏁',
        xp: 25,
        controls: 'none',
        intro:
          "La fonction verifierVictoire(grille) (déjà écrite pour toi ci-dessous) renvoie 'X', 'O' ou null selon qui a gagné, en vérifiant les 3 lignes, 3 colonnes et 2 diagonales. Utilise-la après chaque coup.",
        task: "Après chaque coup, vérifie s'il y a un gagnant, et empêche de jouer une fois la partie terminée.",
        starterCode:
          "let grille = [\n  [null, null, null],\n  [null, null, null],\n  [null, null, null],\n]\nlet joueurActuel = 'X'\nlet gagnant = null\n\nfunction verifierVictoire(g) {\n  const lignes = [\n    [g[0][0], g[0][1], g[0][2]], [g[1][0], g[1][1], g[1][2]], [g[2][0], g[2][1], g[2][2]],\n    [g[0][0], g[1][0], g[2][0]], [g[0][1], g[1][1], g[2][1]], [g[0][2], g[1][2], g[2][2]],\n    [g[0][0], g[1][1], g[2][2]], [g[0][2], g[1][1], g[2][0]],\n  ]\n  for (const ligne of lignes) {\n    if (ligne[0] && ligne[0] === ligne[1] && ligne[1] === ligne[2]) return ligne[0]\n  }\n  return null\n}\n\nfunction dessiner() {\n  ctx.clearRect(0, 0, canvas.width, canvas.height)\n  for (let col = 0; col < 3; col++) {\n    for (let ligne = 0; ligne < 3; ligne++) {\n      ctx.strokeStyle = 'white'\n      ctx.lineWidth = 2\n      ctx.strokeRect(col * 100, ligne * 100, 100, 100)\n      if (grille[ligne][col]) {\n        ctx.fillStyle = 'white'\n        ctx.font = '48px sans-serif'\n        ctx.fillText(grille[ligne][col], col * 100 + 35, ligne * 100 + 65)\n      }\n    }\n  }\n}\n\ncanvas.addEventListener('click', function (e) {\n  // Ton code ici : ne fais rien si gagnant est déjà défini\n\n  const col = Math.floor(e.offsetX / 100)\n  const ligne = Math.floor(e.offsetY / 100)\n  if (grille[ligne][col] === null) {\n    grille[ligne][col] = joueurActuel\n\n    // Ton code ici : vérifie la victoire avec verifierVictoire(grille) et mémorise-la dans gagnant\n\n    joueurActuel = joueurActuel === 'X' ? 'O' : 'X'\n  }\n  dessiner()\n})\n\ndessiner()\n",
        hints: ['if (gagnant) return', 'gagnant = verifierVictoire(grille)'],
        check: (_stdout, _get, _c, _f, _d, code) =>
          has(code, /verifierVictoire\s*\(/) && has(code, /gagnant\s*=/)
            ? ok('Le morpion sait maintenant reconnaître un vainqueur ! 🏁')
            : fail('Appelle verifierVictoire(grille) après chaque coup et stocke le résultat dans gagnant.'),
      },
      {
        id: 'morpion-4',
        trackId: 'morpion',
        title: 'Ton Morpion complet',
        emoji: '🏆',
        xp: 40,
        controls: 'none',
        intro: "Affiche \"X a gagné !\" ou \"O a gagné !\" avec ctx.fillText quand gagnant est défini.",
        task: 'Affiche un message de victoire quand la partie est gagnée.',
        starterCode:
          "let grille = [\n  [null, null, null],\n  [null, null, null],\n  [null, null, null],\n]\nlet joueurActuel = 'X'\nlet gagnant = null\n\nfunction verifierVictoire(g) {\n  const lignes = [\n    [g[0][0], g[0][1], g[0][2]], [g[1][0], g[1][1], g[1][2]], [g[2][0], g[2][1], g[2][2]],\n    [g[0][0], g[1][0], g[2][0]], [g[0][1], g[1][1], g[2][1]], [g[0][2], g[1][2], g[2][2]],\n    [g[0][0], g[1][1], g[2][2]], [g[0][2], g[1][1], g[2][0]],\n  ]\n  for (const ligne of lignes) {\n    if (ligne[0] && ligne[0] === ligne[1] && ligne[1] === ligne[2]) return ligne[0]\n  }\n  return null\n}\n\nfunction dessiner() {\n  ctx.clearRect(0, 0, canvas.width, canvas.height)\n  for (let col = 0; col < 3; col++) {\n    for (let ligne = 0; ligne < 3; ligne++) {\n      ctx.strokeStyle = 'white'\n      ctx.lineWidth = 2\n      ctx.strokeRect(col * 100, ligne * 100, 100, 100)\n      if (grille[ligne][col]) {\n        ctx.fillStyle = 'white'\n        ctx.font = '48px sans-serif'\n        ctx.fillText(grille[ligne][col], col * 100 + 35, ligne * 100 + 65)\n      }\n    }\n  }\n\n  // Ton code ici : si gagnant est défini, affiche un message avec ctx.fillText\n}\n\ncanvas.addEventListener('click', function (e) {\n  if (gagnant) return\n  const col = Math.floor(e.offsetX / 100)\n  const ligne = Math.floor(e.offsetY / 100)\n  if (grille[ligne][col] === null) {\n    grille[ligne][col] = joueurActuel\n    gagnant = verifierVictoire(grille)\n    joueurActuel = joueurActuel === 'X' ? 'O' : 'X'\n  }\n  dessiner()\n})\n\ndessiner()\n",
        hints: [
          "ctx.fillStyle = 'yellow'\nctx.font = '24px sans-serif'\nctx.fillText(`${gagnant} a gagné !`, 60, 350)",
        ],
        check: (_stdout, _get, _c, _f, _d, code) =>
          has(code, /verifierVictoire\s*\(/) && has(code, /ctx\.fillText\s*\(/) && has(code, /gagnant/)
            ? ok('Morpion terminé — deux joueurs, une grille, un vainqueur annoncé ! 🏆')
            : fail('Affiche un message avec ctx.fillText quand gagnant est défini.'),
      },
    ],
  },
  // ============================================================
  // CHRONO-RÉFLEXES — viser à la souris/au doigt, contre la montre
  // ============================================================
  {
    id: 'chrono-reflexes',
    title: 'Chrono-réflexes',
    emoji: '🎯',
    description: 'Vise juste, vite : une cible aléatoire contre la montre.',
    difficulty: 'Débutant',
    color: 'from-rose-400 to-pink-500',
    steps: [
      {
        id: 'chrono-1',
        trackId: 'chrono-reflexes',
        title: 'Une cible qui apparaît au hasard',
        emoji: '🔴',
        xp: 15,
        controls: 'none',
        intro: "Une cible est un simple cercle positionné au hasard sur l'écran avec hasard().",
        task: 'Choisis une position aléatoire pour la cible, puis dessine-la (un cercle rouge).',
        starterCode:
          '// Choisis une position aléatoire pour la cible avec hasard(), puis dessine-la\n\nlet cibleX = 0 // Ton code ici\nlet cibleY = 0 // Ton code ici\n\nctx.beginPath()\nctx.arc(cibleX, cibleY, 20, 0, Math.PI * 2)\nctx.fillStyle = \'red\'\nctx.fill()\n',
        hints: ['let cibleX = hasard(20, 280)\nlet cibleY = hasard(20, 380)'],
        check: (_stdout, _get, _c, _f, _d, code) =>
          has(code, /hasard\s*\(/) && has(code, /ctx\.arc\s*\(/)
            ? ok('Une cible qui apparaît à un endroit différent à chaque fois ! 🔴')
            : fail('Utilise hasard() pour choisir cibleX/cibleY, puis ctx.arc() pour dessiner la cible.'),
      },
      {
        id: 'chrono-2',
        trackId: 'chrono-reflexes',
        title: 'Cliquer dessus',
        emoji: '👆',
        xp: 20,
        controls: 'none',
        intro:
          "Au clic, `Math.hypot(e.offsetX - cibleX, e.offsetY - cibleY)` calcule la distance entre le clic et le centre de la cible. Si elle est inférieure au rayon (20), c'est touché !",
        task: 'Détecte si le clic touche la cible ; si oui, augmente le score et replace la cible ailleurs.',
        starterCode:
          "let cibleX = hasard(20, 280)\nlet cibleY = hasard(20, 380)\nlet score = 0\n\nfunction dessiner() {\n  ctx.clearRect(0, 0, canvas.width, canvas.height)\n  ctx.beginPath()\n  ctx.arc(cibleX, cibleY, 20, 0, Math.PI * 2)\n  ctx.fillStyle = 'red'\n  ctx.fill()\n}\n\ncanvas.addEventListener('click', function (e) {\n  // Ton code ici : calcule la distance avec Math.hypot, et si < 20, touché !\n\n  dessiner()\n})\n\ndessiner()\n",
        hints: [
          'const distance = Math.hypot(e.offsetX - cibleX, e.offsetY - cibleY)\nif (distance < 20) {\n  score++\n  cibleX = hasard(20, 280)\n  cibleY = hasard(20, 380)\n}',
        ],
        check: (_stdout, _get, _c, _f, _d, code) =>
          has(code, /hypot\s*\(/) && has(code, /score\s*(\+\+|\+=)/)
            ? ok('Premier tir dans le mille — la cible réagit vraiment ! 👆')
            : fail('Utilise Math.hypot() pour mesurer la distance, et augmente score quand elle est < 20.'),
      },
      {
        id: 'chrono-3',
        trackId: 'chrono-reflexes',
        title: 'Un temps limité',
        emoji: '⏱️',
        xp: 20,
        controls: 'none',
        intro:
          "Une boucle boucle() (avec requestAnimationFrame) décompte tempsRestant à chaque image, à partir d'environ 15 secondes (15 * 60 images, le jeu tournant à ~60 images par seconde).",
        task: "Fais décompter le temps restant, et arrête le jeu (plus de clics) quand il atteint 0.",
        starterCode:
          "let cibleX = hasard(20, 280)\nlet cibleY = hasard(20, 380)\nlet score = 0\nlet tempsRestant = 15 * 60\n\nfunction dessiner() {\n  ctx.clearRect(0, 0, canvas.width, canvas.height)\n  ctx.beginPath()\n  ctx.arc(cibleX, cibleY, 20, 0, Math.PI * 2)\n  ctx.fillStyle = 'red'\n  ctx.fill()\n}\n\ncanvas.addEventListener('click', function (e) {\n  if (tempsRestant <= 0) return\n  const distance = Math.hypot(e.offsetX - cibleX, e.offsetY - cibleY)\n  if (distance < 20) {\n    score++\n    cibleX = hasard(20, 280)\n    cibleY = hasard(20, 380)\n  }\n  dessiner()\n})\n\nfunction boucle() {\n  // Ton code ici : décrémente tempsRestant tant qu'il est > 0\n\n  requestAnimationFrame(boucle)\n}\n\ndessiner()\nboucle()\n",
        hints: ['if (tempsRestant > 0) {\n  tempsRestant--\n}'],
        check: (_stdout, _get, _c, _f, _d, code) =>
          has(code, /requestAnimationFrame\s*\(/) && has(code, /tempsRestant/)
            ? ok('Le chrono tourne — plus une seconde à perdre ! ⏱️')
            : fail("Décrémente tempsRestant à chaque image dans une boucle avec requestAnimationFrame."),
      },
      {
        id: 'chrono-4',
        trackId: 'chrono-reflexes',
        title: 'Ton jeu de réflexes complet',
        emoji: '🏆',
        xp: 35,
        controls: 'none',
        intro: "Affiche le score et le temps restant en haut de l'écran, et un message \"Terminé !\" à la fin.",
        task: 'Affiche le score et le temps restant à l\'écran, et un message de fin quand le temps est écoulé.',
        starterCode:
          "let cibleX = hasard(20, 280)\nlet cibleY = hasard(20, 380)\nlet score = 0\nlet tempsRestant = 15 * 60\n\nfunction dessiner() {\n  ctx.clearRect(0, 0, canvas.width, canvas.height)\n  ctx.beginPath()\n  ctx.arc(cibleX, cibleY, 20, 0, Math.PI * 2)\n  ctx.fillStyle = 'red'\n  ctx.fill()\n\n  ctx.fillStyle = 'white'\n  ctx.font = '16px sans-serif'\n  // Ton code ici : affiche score et le temps restant (Math.ceil(tempsRestant / 60)) avec ctx.fillText\n\n  if (tempsRestant <= 0) {\n    // Ton code ici : affiche \"Terminé !\" avec ctx.fillText\n  }\n}\n\ncanvas.addEventListener('click', function (e) {\n  if (tempsRestant <= 0) return\n  const distance = Math.hypot(e.offsetX - cibleX, e.offsetY - cibleY)\n  if (distance < 20) {\n    score++\n    cibleX = hasard(20, 280)\n    cibleY = hasard(20, 380)\n  }\n  dessiner()\n})\n\nfunction boucle() {\n  if (tempsRestant > 0) {\n    tempsRestant--\n    dessiner()\n  }\n  requestAnimationFrame(boucle)\n}\n\ndessiner()\nboucle()\n",
        hints: [
          "ctx.fillText(`Score : ${score}`, 10, 20)\nctx.fillText(`Temps : ${Math.ceil(tempsRestant / 60)}`, 200, 20)",
          "ctx.font = '28px sans-serif'\nctx.fillText('Terminé !', 90, 200)",
        ],
        check: (_stdout, _get, _c, _f, _d, code) =>
          has(code, /ctx\.fillText\s*\(/) && has(code, /score/) && has(code, /tempsRestant/)
            ? ok('Un vrai jeu de réflexes, chrono et score compris ! 🏆')
            : fail('Affiche score et tempsRestant avec ctx.fillText.'),
      },
    ],
  },
  // ============================================================
  // SERPENT — mouvement par cases, tableau comme file du corps
  // ============================================================
  {
    id: 'serpent',
    title: 'Serpent',
    emoji: '🐍',
    description: 'Un serpent qui grandit à chaque pomme mangée — jusqu\'à l\'erreur fatale.',
    difficulty: 'Intermédiaire',
    color: 'from-lime-400 to-green-500',
    steps: [
      {
        id: 'snake-1',
        trackId: 'serpent',
        title: 'Bouger case par case',
        emoji: '🟩',
        xp: 20,
        intro:
          "Le serpent avance sur une grille de cases de 20 pixels. Pour qu'il n'aille pas trop vite (le jeu tourne à ~60 images par seconde), on n'avance qu'une fois toutes les 8 images grâce à un compteur qui augmente à chaque image.",
        task: 'Fais avancer un carré vert case par case vers la droite, mais pas à chaque image.',
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
        trackId: 'serpent',
        title: 'Changer de direction',
        emoji: '🕹️',
        xp: 20,
        intro:
          "dx et dy représentent la direction actuelle, en pas de 20 pixels (dx = 20 pour aller à droite, dx = -20 pour aller à gauche, etc). Les flèches changent dx/dy ; le déplacement lui-même reste au rythme du compteur.",
        task: 'Utilise les flèches pour changer de direction, puis avance dans cette direction à chaque tick.',
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
        trackId: 'serpent',
        title: 'Le corps qui grandit en mangeant',
        emoji: '🍏',
        xp: 25,
        intro:
          "Le corps du serpent est un tableau de segments { x, y }. À chaque déplacement, on ajoute une nouvelle tête au début avec unshift, et on retire la queue avec pop — sauf quand la tête vient de manger la pomme : là, on garde la queue (le serpent grandit), et hasard() replace la pomme ailleurs.",
        task: "À chaque tick, avance la tête du serpent. S'il mange la pomme, fais-le grandir et replace la pomme ; sinon, avance normalement.",
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
        trackId: 'serpent',
        title: 'Ton Serpent complet',
        emoji: '🏆',
        xp: 40,
        intro:
          "Termine le jeu : si la tête touche un autre segment du corps, le serpent s'est mordu la queue — affiche \"Perdu !\" avec ctx.fillText. Affiche aussi serpent.length comme score, bien visible à l'écran.",
        task: 'Détecte si le serpent se mord la queue et affiche "Perdu !" le cas échéant. Affiche aussi le score.',
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
    ],
  },
  // ============================================================
  // ENVAHISSEURS DE L'ESPACE — tableau d'ennemis + tableau de balles + cooldown de tir
  // ============================================================
  {
    id: 'envahisseurs',
    title: "Envahisseurs de l'espace",
    emoji: '👾',
    description: "Une flotte ennemie à canarder avant qu'elle n'arrive.",
    difficulty: 'Intermédiaire',
    color: 'from-indigo-500 to-blue-600',
    steps: [
      {
        id: 'env-1',
        trackId: 'envahisseurs',
        title: 'Ton vaisseau et la flotte ennemie',
        emoji: '👾',
        xp: 25,
        intro:
          "Comme pour Casse-briques, les ennemis sont un tableau d'objets { x, y, vivant: true } rangés en grille avec une double boucle. En bas, ton vaisseau bouge avec les flèches.",
        task: 'Crée une grille de 5x3 ennemis, et fais bouger le vaisseau au clavier.',
        starterCode:
          "let ennemis = []\nfor (let col = 0; col < 5; col++) {\n  for (let ligne = 0; ligne < 3; ligne++) {\n    // Ton code ici : ajoute { x: col * 55 + 15, y: ligne * 30 + 20, vivant: true } à ennemis\n  }\n}\n\nlet vaisseauX = 140\n\nfunction boucle() {\n  ctx.clearRect(0, 0, canvas.width, canvas.height)\n\n  // Ton code ici : bouge vaisseauX avec estAppuyee\n\n  for (const e of ennemis) {\n    if (e.vivant) {\n      ctx.fillStyle = 'orangered'\n      ctx.fillRect(e.x, e.y, 40, 20)\n    }\n  }\n\n  ctx.fillStyle = 'lime'\n  ctx.fillRect(vaisseauX, 370, 20, 20)\n\n  requestAnimationFrame(boucle)\n}\n\nboucle()\n",
        hints: [
          'ennemis.push({ x: col * 55 + 15, y: ligne * 30 + 20, vivant: true })',
          "if (estAppuyee('ArrowLeft')) vaisseauX -= 4\nif (estAppuyee('ArrowRight')) vaisseauX += 4",
        ],
        check: (_stdout, _get, _c, _f, _d, code) =>
          has(code, /ennemis\.push\s*\(/) && has(code, /estAppuyee\s*\(/)
            ? ok('Une flotte entière face à ton vaisseau ! 👾')
            : fail('Remplis ennemis avec ennemis.push({...}), et bouge vaisseauX avec estAppuyee().'),
      },
      {
        id: 'env-2',
        trackId: 'envahisseurs',
        title: 'Tirer avec une cooldown',
        emoji: '🔫',
        xp: 25,
        intro:
          "Si on tirait à chaque image, ça ferait 60 balles par seconde ! On utilise un compteur coolDown qui empêche de retirer trop vite : coolDown-- à chaque image, et on ne peut tirer que quand coolDown <= 0.",
        task: "Tire une balle sur espace (avec la cooldown pour ne pas mitrailler), et fais-la monter à l'écran.",
        starterCode:
          "let ennemis = []\nfor (let col = 0; col < 5; col++) {\n  for (let ligne = 0; ligne < 3; ligne++) {\n    ennemis.push({ x: col * 55 + 15, y: ligne * 30 + 20, vivant: true })\n  }\n}\n\nlet vaisseauX = 140\nlet balles = []\nlet coolDown = 0\n\nfunction boucle() {\n  ctx.clearRect(0, 0, canvas.width, canvas.height)\n\n  if (estAppuyee('ArrowLeft')) vaisseauX -= 4\n  if (estAppuyee('ArrowRight')) vaisseauX += 4\n  if (coolDown > 0) coolDown--\n\n  // Ton code ici : si espace et coolDown <= 0, tire une balle et remets coolDown à 15\n\n  for (const balle of balles) {\n    balle.y -= 6\n    ctx.fillStyle = 'yellow'\n    ctx.fillRect(balle.x, balle.y, 4, 10)\n  }\n\n  for (const e of ennemis) {\n    if (e.vivant) {\n      ctx.fillStyle = 'orangered'\n      ctx.fillRect(e.x, e.y, 40, 20)\n    }\n  }\n\n  ctx.fillStyle = 'lime'\n  ctx.fillRect(vaisseauX, 370, 20, 20)\n\n  requestAnimationFrame(boucle)\n}\n\nboucle()\n",
        hints: [
          "if (estAppuyee(' ') && coolDown <= 0) {\n  balles.push({ x: vaisseauX + 8, y: 370 })\n  coolDown = 15\n}",
        ],
        check: (_stdout, _get, _c, _f, _d, code) =>
          has(code, /coolDown/) && has(code, /balles\.push\s*\(/)
            ? ok('Ton vaisseau tire, sans mitraillage à 60 balles par seconde ! 🔫')
            : fail("Utilise un compteur coolDown, et balles.push() pour tirer quand il atteint 0."),
      },
      {
        id: 'env-3',
        trackId: 'envahisseurs',
        title: 'Toucher un ennemi',
        emoji: '💥',
        xp: 25,
        intro:
          "Pour chaque balle, vérifie la collision avec chaque ennemi vivant. Deux boucles imbriquées (une sur balles, une sur ennemis) suffisent.",
        task: 'Détecte quand une balle touche un ennemi vivant ; élimine-le, et augmente le score.',
        starterCode:
          "let ennemis = []\nfor (let col = 0; col < 5; col++) {\n  for (let ligne = 0; ligne < 3; ligne++) {\n    ennemis.push({ x: col * 55 + 15, y: ligne * 30 + 20, vivant: true })\n  }\n}\n\nlet vaisseauX = 140\nlet balles = []\nlet coolDown = 0\nlet score = 0\n\nfunction boucle() {\n  ctx.clearRect(0, 0, canvas.width, canvas.height)\n\n  if (estAppuyee('ArrowLeft')) vaisseauX -= 4\n  if (estAppuyee('ArrowRight')) vaisseauX += 4\n  if (coolDown > 0) coolDown--\n  if (estAppuyee(' ') && coolDown <= 0) {\n    balles.push({ x: vaisseauX + 8, y: 370 })\n    coolDown = 15\n  }\n\n  for (const balle of balles) {\n    balle.y -= 6\n  }\n\n  // Ton code ici : pour chaque balle et chaque ennemi vivant, vérifie collision() ;\n  // si touché, ennemi.vivant = false et augmente score\n\n  for (const balle of balles) {\n    ctx.fillStyle = 'yellow'\n    ctx.fillRect(balle.x, balle.y, 4, 10)\n  }\n  for (const e of ennemis) {\n    if (e.vivant) {\n      ctx.fillStyle = 'orangered'\n      ctx.fillRect(e.x, e.y, 40, 20)\n    }\n  }\n\n  ctx.fillStyle = 'lime'\n  ctx.fillRect(vaisseauX, 370, 20, 20)\n\n  requestAnimationFrame(boucle)\n}\n\nboucle()\n",
        hints: [
          'for (const balle of balles) {\n  for (const e of ennemis) {\n    if (e.vivant && collision(e.x, e.y, 40, 20, balle.x, balle.y, 4, 10)) {\n      e.vivant = false\n      score++\n    }\n  }\n}',
        ],
        check: (_stdout, _get, _c, _f, _d, code) =>
          has(code, /collision\s*\(/) && has(code, /vivant\s*=\s*false/) && has(code, /score/)
            ? ok('Premiers ennemis abattus ! 💥')
            : fail("Vérifie collision() entre chaque balle et chaque ennemi vivant, et marque vivant = false."),
      },
      {
        id: 'env-4',
        trackId: 'envahisseurs',
        title: 'Ton jeu complet',
        emoji: '🏆',
        xp: 40,
        intro: "Affiche le score, et \"Gagné !\" quand ennemis.every(e => !e.vivant).",
        task: 'Affiche le score, et un message de victoire quand tous les ennemis sont vaincus.',
        starterCode:
          "let ennemis = []\nfor (let col = 0; col < 5; col++) {\n  for (let ligne = 0; ligne < 3; ligne++) {\n    ennemis.push({ x: col * 55 + 15, y: ligne * 30 + 20, vivant: true })\n  }\n}\n\nlet vaisseauX = 140\nlet balles = []\nlet coolDown = 0\nlet score = 0\n\nfunction boucle() {\n  ctx.clearRect(0, 0, canvas.width, canvas.height)\n\n  if (estAppuyee('ArrowLeft')) vaisseauX -= 4\n  if (estAppuyee('ArrowRight')) vaisseauX += 4\n  if (coolDown > 0) coolDown--\n  if (estAppuyee(' ') && coolDown <= 0) {\n    balles.push({ x: vaisseauX + 8, y: 370 })\n    coolDown = 15\n  }\n\n  for (const balle of balles) {\n    balle.y -= 6\n  }\n  for (const balle of balles) {\n    for (const e of ennemis) {\n      if (e.vivant && collision(e.x, e.y, 40, 20, balle.x, balle.y, 4, 10)) {\n        e.vivant = false\n        score++\n      }\n    }\n  }\n\n  for (const balle of balles) {\n    ctx.fillStyle = 'yellow'\n    ctx.fillRect(balle.x, balle.y, 4, 10)\n  }\n  for (const e of ennemis) {\n    if (e.vivant) {\n      ctx.fillStyle = 'orangered'\n      ctx.fillRect(e.x, e.y, 40, 20)\n    }\n  }\n\n  ctx.fillStyle = 'lime'\n  ctx.fillRect(vaisseauX, 370, 20, 20)\n\n  ctx.fillStyle = 'white'\n  ctx.font = '16px sans-serif'\n  // Ton code ici : affiche le score, et \"Gagné !\" si ennemis.every(e => !e.vivant)\n\n  requestAnimationFrame(boucle)\n}\n\nboucle()\n",
        hints: [
          "ctx.fillText(`Score : ${score}`, 10, 20)\nif (ennemis.every((e) => !e.vivant)) {\n  ctx.fillText('Gagné !', 120, 200)\n}",
        ],
        check: (_stdout, _get, _c, _f, _d, code) =>
          has(code, /every\s*\(/) && has(code, /ctx\.fillText\s*\(/)
            ? ok('La flotte est vaincue — ton propre Envahisseurs de l\'espace ! 🏆')
            : fail('Affiche le score avec ctx.fillText, et vérifie la victoire avec ennemis.every().'),
      },
    ],
  },
  // ============================================================
  // SIMON — séquence qui s'allonge, tableau + mémorisation
  // ============================================================
  {
    id: 'simon',
    title: 'Simon',
    emoji: '🔴',
    description: 'Mémorise et reproduis une séquence de couleurs qui s\'allonge à chaque manche.',
    difficulty: 'Avancé',
    color: 'from-fuchsia-500 to-pink-600',
    steps: [
      {
        id: 'simon-1',
        trackId: 'simon',
        title: 'Quatre zones cliquables',
        emoji: '🟥',
        xp: 20,
        controls: 'none',
        intro:
          "Le plateau est divisé en 4 zones colorées (2 colonnes x 2 lignes de 150x200 chacune). Au clic, on calcule quelle zone a été touchée à partir de e.offsetX / e.offsetY.",
        task: 'Dessine 4 zones colorées, et détecte au clic laquelle a été touchée.',
        starterCode:
          "const couleurs = ['red', 'dodgerblue', 'limegreen', 'gold']\nconst zones = [\n  { x: 0, y: 0 }, { x: 150, y: 0 },\n  { x: 0, y: 200 }, { x: 150, y: 200 },\n]\n\nfunction dessiner() {\n  ctx.clearRect(0, 0, canvas.width, canvas.height)\n  for (let i = 0; i < 4; i++) {\n    ctx.fillStyle = couleurs[i]\n    ctx.fillRect(zones[i].x, zones[i].y, 150, 200)\n  }\n}\n\ncanvas.addEventListener('click', function (e) {\n  // Ton code ici : calcule la zone cliquée (0 à 3) à partir de e.offsetX/e.offsetY, et affiche-la\n})\n\ndessiner()\n",
        hints: [
          'const col = e.offsetX < 150 ? 0 : 1\nconst ligne = e.offsetY < 200 ? 0 : 1\nconst zone = ligne * 2 + col\nconsole.log(zone)',
        ],
        check: (_stdout, _get, _c, _f, _d, code) =>
          has(code, /addEventListener\s*\(\s*['"]click['"]/) && has(code, /offsetX/)
            ? ok('Quatre zones qui savent reconnaître un clic ! 🟥')
            : fail("Utilise e.offsetX/e.offsetY dans le click listener pour calculer la zone touchée."),
      },
      {
        id: 'simon-2',
        trackId: 'simon',
        title: "Une séquence qui s'allonge",
        emoji: '🔢',
        xp: 25,
        controls: 'none',
        intro:
          "sequence est un tableau de zones (0 à 3) à répéter. hasard(0, 3) choisit la prochaine zone à ajouter à chaque nouvelle manche.",
        task: "Complète nouvelleManche() pour qu'elle ajoute une nouvelle zone aléatoire à la séquence.",
        starterCode:
          "const couleurs = ['red', 'dodgerblue', 'limegreen', 'gold']\nconst zones = [\n  { x: 0, y: 0 }, { x: 150, y: 0 },\n  { x: 0, y: 200 }, { x: 150, y: 200 },\n]\nlet sequence = []\n\nfunction nouvelleManche() {\n  // Ton code ici : ajoute une zone aléatoire (hasard(0, 3)) à sequence\n}\n\nfunction dessiner() {\n  ctx.clearRect(0, 0, canvas.width, canvas.height)\n  for (let i = 0; i < 4; i++) {\n    ctx.fillStyle = couleurs[i]\n    ctx.fillRect(zones[i].x, zones[i].y, 150, 200)\n  }\n  ctx.fillStyle = 'white'\n  ctx.font = '16px sans-serif'\n  ctx.fillText(`Longueur de la séquence : ${sequence.length}`, 10, 20)\n}\n\nnouvelleManche()\ndessiner()\n",
        hints: ['sequence.push(hasard(0, 3))'],
        check: (_stdout, _get, _c, _f, _d, code) =>
          has(code, /sequence\.push\s*\(/) && has(code, /hasard\s*\(/)
            ? ok('La séquence à mémoriser commence à grandir ! 🔢')
            : fail('Utilise sequence.push(hasard(0, 3)) pour ajouter une zone aléatoire.'),
      },
      {
        id: 'simon-3',
        trackId: 'simon',
        title: 'Reproduire la séquence',
        emoji: '🧠',
        xp: 25,
        controls: 'none',
        intro:
          "Pendant la phase d'écoute, compare chaque clic du joueur à sequence[positionJoueur] : si ça correspond, avance ; si la séquence entière est reproduite, lance une nouvelle manche ; sinon, perdu = true.",
        task: 'Compare chaque clic à la séquence attendue : si ça correspond, avance ; sinon, le joueur a perdu.',
        starterCode:
          "const couleurs = ['red', 'dodgerblue', 'limegreen', 'gold']\nconst zones = [\n  { x: 0, y: 0 }, { x: 150, y: 0 },\n  { x: 0, y: 200 }, { x: 150, y: 200 },\n]\nlet sequence = []\nlet positionJoueur = 0\nlet perdu = false\n\nfunction nouvelleManche() {\n  sequence.push(hasard(0, 3))\n  positionJoueur = 0\n}\n\nfunction dessiner() {\n  ctx.clearRect(0, 0, canvas.width, canvas.height)\n  for (let i = 0; i < 4; i++) {\n    ctx.fillStyle = couleurs[i]\n    ctx.fillRect(zones[i].x, zones[i].y, 150, 200)\n  }\n  ctx.fillStyle = 'white'\n  ctx.font = '16px sans-serif'\n  ctx.fillText(`Longueur de la séquence : ${sequence.length}`, 10, 20)\n}\n\ncanvas.addEventListener('click', function (e) {\n  if (perdu) return\n  const col = e.offsetX < 150 ? 0 : 1\n  const ligne = e.offsetY < 200 ? 0 : 1\n  const zone = ligne * 2 + col\n\n  // Ton code ici : compare zone à sequence[positionJoueur], avance ou perdu = true\n\n  dessiner()\n})\n\nnouvelleManche()\ndessiner()\n",
        hints: [
          'if (zone === sequence[positionJoueur]) {\n  positionJoueur++\n  if (positionJoueur === sequence.length) {\n    nouvelleManche()\n  }\n} else {\n  perdu = true\n}',
        ],
        check: (_stdout, _get, _c, _f, _d, code) =>
          has(code, /positionJoueur/) && has(code, /perdu\s*=\s*true/)
            ? ok('Le jeu se souvient — et sanctionne les erreurs ! 🧠')
            : fail('Compare la zone cliquée à sequence[positionJoueur], avance-le ou passe perdu à true.'),
      },
      {
        id: 'simon-4',
        trackId: 'simon',
        title: 'Ton Simon complet',
        emoji: '🏆',
        xp: 40,
        controls: 'none',
        intro: 'Affiche le score (sequence.length - 1) et "Perdu !" si perdu, avec ctx.fillText.',
        task: 'Affiche le score, et un message quand la partie est perdue.',
        starterCode:
          "const couleurs = ['red', 'dodgerblue', 'limegreen', 'gold']\nconst zones = [\n  { x: 0, y: 0 }, { x: 150, y: 0 },\n  { x: 0, y: 200 }, { x: 150, y: 200 },\n]\nlet sequence = []\nlet positionJoueur = 0\nlet perdu = false\n\nfunction nouvelleManche() {\n  sequence.push(hasard(0, 3))\n  positionJoueur = 0\n}\n\nfunction dessiner() {\n  ctx.clearRect(0, 0, canvas.width, canvas.height)\n  for (let i = 0; i < 4; i++) {\n    ctx.fillStyle = couleurs[i]\n    ctx.fillRect(zones[i].x, zones[i].y, 150, 200)\n  }\n  ctx.fillStyle = 'white'\n  ctx.font = '16px sans-serif'\n  // Ton code ici : affiche le score (sequence.length - 1), et \"Perdu !\" si perdu\n}\n\ncanvas.addEventListener('click', function (e) {\n  if (perdu) return\n  const col = e.offsetX < 150 ? 0 : 1\n  const ligne = e.offsetY < 200 ? 0 : 1\n  const zone = ligne * 2 + col\n  if (zone === sequence[positionJoueur]) {\n    positionJoueur++\n    if (positionJoueur === sequence.length) {\n      nouvelleManche()\n    }\n  } else {\n    perdu = true\n  }\n  dessiner()\n})\n\nnouvelleManche()\ndessiner()\n",
        hints: [
          "ctx.fillText(`Score : ${sequence.length - 1}`, 10, 20)\nif (perdu) {\n  ctx.fillText('Perdu !', 110, 210)\n}",
        ],
        check: (_stdout, _get, _c, _f, _d, code) =>
          has(code, /ctx\.fillText\s*\(/) && has(code, /perdu/) && has(code, /sequence/)
            ? ok('Simon terminé — mémoire, séquences, un vrai jeu complet ! 🏆')
            : fail('Affiche le score avec ctx.fillText, et un message quand perdu est vrai.'),
      },
    ],
  },
  // ============================================================
  // FLAPPY — gravité + impulsion de saut, obstacles qui défilent
  // ============================================================
  {
    id: 'flappy',
    title: 'Flappy',
    emoji: '🐦',
    description: "Un battement d'aile contre la gravité, entre des tuyaux qui défilent.",
    difficulty: 'Intermédiaire',
    color: 'from-amber-400 to-orange-500',
    steps: [
      {
        id: 'flappy-1',
        trackId: 'flappy',
        title: 'Gravité et saut',
        emoji: '🪽',
        xp: 20,
        intro:
          "vitesseY augmente à chaque image (la gravité) et s'ajoute à y : c'est ce qui fait tomber l'oiseau. Un appui sur espace lui donne une impulsion vers le haut en remettant vitesseY à une valeur négative.",
        task: "Fais tomber un cercle avec la gravité, et donne-lui une impulsion vers le haut sur espace.",
        starterCode:
          "let y = 200\nlet vitesseY = 0\n\nfunction boucle() {\n  ctx.clearRect(0, 0, canvas.width, canvas.height)\n\n  // Ton code ici : applique la gravité à vitesseY et y, et le saut sur espace\n\n  ctx.beginPath()\n  ctx.arc(60, y, 12, 0, Math.PI * 2)\n  ctx.fillStyle = 'gold'\n  ctx.fill()\n\n  requestAnimationFrame(boucle)\n}\n\nboucle()\n",
        hints: [
          "vitesseY += 0.4\ny += vitesseY\nif (estAppuyee(' ')) {\n  vitesseY = -8\n}",
        ],
        check: (_stdout, _get, _c, _f, _d, code) =>
          has(code, /vitesseY/) && has(code, /estAppuyee\s*\(\s*['"] ['"]/)
            ? ok('Il tombe, il saute — les bases du vol sont là ! 🪽')
            : fail("Utilise vitesseY pour la gravité (vitesseY += ...), et estAppuyee(' ') pour sauter."),
      },
      {
        id: 'flappy-2',
        trackId: 'flappy',
        title: 'Un tuyau qui défile',
        emoji: '🟩',
        xp: 20,
        intro:
          "Un obstacle qui avance vers la gauche (tuyauX -= 2 à chaque image) donne l'impression que le monde défile. Quand il sort complètement de l'écran, remets-le à droite avec une nouvelle hauteur de trou aléatoire (hasard()).",
        task: "Fais défiler le tuyau vers la gauche ; quand il sort de l'écran, remets-le à droite avec un nouveau trou.",
        starterCode:
          "let tuyauX = 300\nlet trouY = 200\n\nfunction boucle() {\n  ctx.clearRect(0, 0, canvas.width, canvas.height)\n\n  // Ton code ici : fais défiler tuyauX, et réinitialise-le à droite avec un nouveau trouY\n\n  ctx.fillStyle = 'limegreen'\n  ctx.fillRect(tuyauX, 0, 40, trouY - 60)\n  ctx.fillRect(tuyauX, trouY + 60, 40, canvas.height - trouY - 60)\n\n  requestAnimationFrame(boucle)\n}\n\nboucle()\n",
        hints: [
          'tuyauX -= 2\nif (tuyauX < -40) {\n  tuyauX = 300\n  trouY = hasard(50, 300)\n}',
        ],
        check: (_stdout, _get, _c, _f, _d, code) =>
          has(code, /hasard\s*\(/) && has(code, /tuyauX\s*(-=|=\s*tuyauX)/)
            ? ok('Un tuyau qui défile et se renouvelle à l\'infini ! 🟩')
            : fail("Fais avancer tuyauX vers la gauche, et remets-le à droite avec hasard() pour trouY."),
      },
      {
        id: 'flappy-3',
        trackId: 'flappy',
        title: 'Collision avec le tuyau',
        emoji: '💥',
        xp: 25,
        intro:
          "Le tuyau est en réalité deux rectangles : celui du haut (de y=0 jusqu'au trou) et celui du bas (du bas du trou jusqu'en bas de l'écran). Vérifie collision() avec les deux.",
        task: "Détecte si l'oiseau touche le tuyau (haut ou bas) ; si oui, le jeu s'arrête.",
        starterCode:
          "let y = 200\nlet vitesseY = 0\nlet tuyauX = 300\nlet trouY = 200\nlet perdu = false\n\nfunction boucle() {\n  ctx.clearRect(0, 0, canvas.width, canvas.height)\n\n  if (!perdu) {\n    vitesseY += 0.4\n    y += vitesseY\n    if (estAppuyee(' ')) vitesseY = -8\n\n    tuyauX -= 2\n    if (tuyauX < -40) {\n      tuyauX = 300\n      trouY = hasard(50, 300)\n    }\n\n    // Ton code ici : détecte la collision avec le tuyau du haut et du bas, et passe perdu à true\n  }\n\n  ctx.fillStyle = 'limegreen'\n  ctx.fillRect(tuyauX, 0, 40, trouY - 60)\n  ctx.fillRect(tuyauX, trouY + 60, 40, canvas.height - trouY - 60)\n  ctx.beginPath()\n  ctx.arc(60, y, 12, 0, Math.PI * 2)\n  ctx.fillStyle = 'gold'\n  ctx.fill()\n\n  requestAnimationFrame(boucle)\n}\n\nboucle()\n",
        hints: [
          'if (collision(tuyauX, 0, 40, trouY - 60, 48, y - 12, 24, 24)) perdu = true\nif (collision(tuyauX, trouY + 60, 40, canvas.height - trouY - 60, 48, y - 12, 24, 24)) perdu = true',
        ],
        check: (_stdout, _get, _c, _f, _d, code) =>
          has(code, /collision\s*\(/) && has(code, /perdu\s*=\s*true/)
            ? ok('Premier crash détecté — le jeu sait maintenant punir une erreur ! 💥')
            : fail('Utilise collision() avec les deux morceaux du tuyau, et passe perdu à true au contact.'),
      },
      {
        id: 'flappy-4',
        trackId: 'flappy',
        title: 'Ton Flappy complet',
        emoji: '🏆',
        xp: 40,
        intro:
          'Ajoute un score qui augmente d\'un point à chaque fois que le tuyau passe l\'oiseau (quand tuyauX passe sous 60 par exemple), et affiche-le avec ctx.fillText.',
        task: 'Augmente le score une fois par tuyau passé, et affiche-le à l\'écran.',
        starterCode:
          "let y = 200\nlet vitesseY = 0\nlet tuyauX = 300\nlet trouY = 200\nlet perdu = false\nlet score = 0\nlet compte = false\n\nfunction boucle() {\n  ctx.clearRect(0, 0, canvas.width, canvas.height)\n\n  if (!perdu) {\n    vitesseY += 0.4\n    y += vitesseY\n    if (estAppuyee(' ')) vitesseY = -8\n\n    tuyauX -= 2\n    if (tuyauX < 60 && !compte) {\n      // Ton code ici : augmente le score, et passe compte à true (pour ne compter qu'une fois)\n    }\n    if (tuyauX < -40) {\n      tuyauX = 300\n      trouY = hasard(50, 300)\n      compte = false\n    }\n\n    if (collision(tuyauX, 0, 40, trouY - 60, 48, y - 12, 24, 24)) perdu = true\n    if (collision(tuyauX, trouY + 60, 40, canvas.height - trouY - 60, 48, y - 12, 24, 24)) perdu = true\n  }\n\n  ctx.fillStyle = 'limegreen'\n  ctx.fillRect(tuyauX, 0, 40, trouY - 60)\n  ctx.fillRect(tuyauX, trouY + 60, 40, canvas.height - trouY - 60)\n  ctx.beginPath()\n  ctx.arc(60, y, 12, 0, Math.PI * 2)\n  ctx.fillStyle = 'gold'\n  ctx.fill()\n\n  ctx.fillStyle = 'white'\n  ctx.font = '20px sans-serif'\n  // Ton code ici : affiche le score avec ctx.fillText\n\n  requestAnimationFrame(boucle)\n}\n\nboucle()\n",
        hints: [
          'score++\ncompte = true',
          "ctx.fillText(`Score : ${score}`, 10, 30)",
        ],
        check: (_stdout, _get, _c, _f, _d, code) =>
          has(code, /score/) && has(code, /ctx\.fillText\s*\(/) && has(code, /collision\s*\(/)
            ? ok('Flappy est complet — gravité, tuyaux, score, tout y est ! 🏆')
            : fail('Augmente score au passage du tuyau, et affiche-le avec ctx.fillText.'),
      },
    ],
  },
  // ============================================================
  // PLATEFORME — physique de saut + atterrissage sur des plateformes
  // ============================================================
  {
    id: 'plateforme',
    title: 'Plateforme',
    emoji: '🟠',
    description: 'Saute de plateforme en plateforme sans tomber dans le vide.',
    difficulty: 'Intermédiaire',
    color: 'from-cyan-400 to-blue-500',
    steps: [
      {
        id: 'plat-1',
        trackId: 'plateforme',
        title: 'Sauter et retomber',
        emoji: '🦘',
        xp: 20,
        intro:
          "Comme dans Flappy, vitesseY simule la gravité. Ici, le joueur ne peut sauter (vitesseY = -9) que quand il touche le sol (y >= 360), sinon il resterait collé en l'air à chaque pression.",
        task: 'Applique la gravité, empêche de traverser le sol, et saute avec espace seulement quand tu es au sol.',
        starterCode:
          "let x = 50\nlet y = 360\nlet vitesseY = 0\n\nfunction boucle() {\n  ctx.clearRect(0, 0, canvas.width, canvas.height)\n\n  // Ton code ici : applique la gravité, bloque au sol (y = 360), et saute sur espace si au sol\n\n  ctx.fillStyle = 'orange'\n  ctx.fillRect(x, y - 20, 20, 20)\n\n  requestAnimationFrame(boucle)\n}\n\nboucle()\n",
        hints: [
          'vitesseY += 0.5\ny += vitesseY\nif (y > 360) {\n  y = 360\n  vitesseY = 0\n}\nif (estAppuyee(\' \') && y >= 360) {\n  vitesseY = -9\n}',
        ],
        check: (_stdout, _get, _c, _f, _d, code) =>
          has(code, /vitesseY/) && has(code, /estAppuyee\s*\(\s*['"] ['"]/)
            ? ok('Un saut qui retombe bien au sol, jamais bloqué en l\'air ! 🦘')
            : fail('Applique la gravité à vitesseY/y, bloque au sol, et ne saute que si y >= 360.'),
      },
      {
        id: 'plat-2',
        trackId: 'plateforme',
        title: 'Une plateforme fixe',
        emoji: '🧱',
        xp: 20,
        intro:
          "Pour atterrir sur une plateforme en l'air (pas seulement le sol), vérifie collision() avec elle : si le joueur tombe dessus, pose-le sur son sommet (y = plateforme.y) et arrête sa chute (vitesseY = 0).",
        task: "Ajoute une plateforme en l'air. Si le joueur tombe dessus, fais-le atterrir au lieu de la traverser.",
        starterCode:
          "let x = 50\nlet y = 360\nlet vitesseY = 0\nconst plateforme = { x: 100, y: 280, largeur: 100 }\n\nfunction boucle() {\n  ctx.clearRect(0, 0, canvas.width, canvas.height)\n\n  if (estAppuyee('ArrowLeft')) x -= 3\n  if (estAppuyee('ArrowRight')) x += 3\n\n  vitesseY += 0.5\n  y += vitesseY\n  if (y > 360) {\n    y = 360\n    vitesseY = 0\n  }\n  if (estAppuyee(' ') && y >= 360) vitesseY = -9\n\n  // Ton code ici : si collision() avec la plateforme et vitesseY > 0, pose le joueur dessus\n\n  ctx.fillStyle = 'skyblue'\n  ctx.fillRect(plateforme.x, plateforme.y, plateforme.largeur, 10)\n  ctx.fillStyle = 'orange'\n  ctx.fillRect(x, y - 20, 20, 20)\n\n  requestAnimationFrame(boucle)\n}\n\nboucle()\n",
        hints: [
          'if (vitesseY > 0 && collision(plateforme.x, plateforme.y, plateforme.largeur, 10, x, y - 20, 20, 20)) {\n  y = plateforme.y\n  vitesseY = 0\n}',
        ],
        check: (_stdout, _get, _c, _f, _d, code) =>
          has(code, /collision\s*\(/) && has(code, /vitesseY\s*=\s*0/)
            ? ok('Un atterrissage tout en douceur sur la plateforme ! 🧱')
            : fail('Utilise collision() avec la plateforme, et remets vitesseY à 0 en atterrissant dessus.'),
      },
      {
        id: 'plat-3',
        trackId: 'plateforme',
        title: 'Plusieurs plateformes',
        emoji: '🪜',
        xp: 25,
        intro:
          "Comme pour les briques ou les ennemis, un tableau de plateformes permet d'en avoir plusieurs : parcours-les toutes avec for...of pour vérifier l'atterrissage sur chacune.",
        task: 'Crée 3 plateformes à des hauteurs différentes, dessine-les, et permets d\'atterrir sur chacune.',
        starterCode:
          "let x = 50\nlet y = 360\nlet vitesseY = 0\nlet plateformes = [\n  // Ton code ici : ajoute 3 objets { x, y, largeur } à ce tableau\n]\n\nfunction boucle() {\n  ctx.clearRect(0, 0, canvas.width, canvas.height)\n\n  if (estAppuyee('ArrowLeft')) x -= 3\n  if (estAppuyee('ArrowRight')) x += 3\n\n  vitesseY += 0.5\n  y += vitesseY\n  if (y > 360) {\n    y = 360\n    vitesseY = 0\n  }\n  if (estAppuyee(' ') && y >= 360) vitesseY = -9\n\n  for (const p of plateformes) {\n    if (vitesseY > 0 && collision(p.x, p.y, p.largeur, 10, x, y - 20, 20, 20)) {\n      y = p.y\n      vitesseY = 0\n    }\n    ctx.fillStyle = 'skyblue'\n    ctx.fillRect(p.x, p.y, p.largeur, 10)\n  }\n\n  ctx.fillStyle = 'orange'\n  ctx.fillRect(x, y - 20, 20, 20)\n\n  requestAnimationFrame(boucle)\n}\n\nboucle()\n",
        hints: [
          '{ x: 20, y: 300, largeur: 80 },\n{ x: 150, y: 240, largeur: 80 },\n{ x: 60, y: 180, largeur: 80 },',
        ],
        check: (_stdout, _get, _c, _f, _d, code) =>
          has(code, /plateformes\s*=\s*\[/) && has(code, /for\s*\(/) && has(code, /collision\s*\(/)
            ? ok('Un vrai parcours de plateformes à escalader ! 🪜')
            : fail('Remplis le tableau plateformes avec 3 objets { x, y, largeur }.'),
      },
      {
        id: 'plat-4',
        trackId: 'plateforme',
        title: 'Ton jeu de plateforme complet',
        emoji: '🏆',
        xp: 40,
        intro:
          "Ajoute un drapeau d'arrivée : un rectangle en haut de la dernière plateforme. Si le joueur le touche avec collision(), affiche \"Gagné !\" avec ctx.fillText.",
        task: 'Ajoute un drapeau d\'arrivée : quand le joueur le touche, affiche un message de victoire.',
        starterCode:
          "let x = 50\nlet y = 360\nlet vitesseY = 0\nlet plateformes = [\n  { x: 20, y: 300, largeur: 80 },\n  { x: 150, y: 240, largeur: 80 },\n  { x: 60, y: 180, largeur: 80 },\n]\nlet drapeau = { x: 90, y: 150, largeur: 20, hauteur: 30 }\nlet gagne = false\n\nfunction boucle() {\n  ctx.clearRect(0, 0, canvas.width, canvas.height)\n\n  if (!gagne) {\n    if (estAppuyee('ArrowLeft')) x -= 3\n    if (estAppuyee('ArrowRight')) x += 3\n\n    vitesseY += 0.5\n    y += vitesseY\n    if (y > 360) {\n      y = 360\n      vitesseY = 0\n    }\n    if (estAppuyee(' ') && y >= 360) vitesseY = -9\n\n    for (const p of plateformes) {\n      if (vitesseY > 0 && collision(p.x, p.y, p.largeur, 10, x, y - 20, 20, 20)) {\n        y = p.y\n        vitesseY = 0\n      }\n    }\n\n    // Ton code ici : si collision() avec le drapeau, passe gagne à true\n  }\n\n  for (const p of plateformes) {\n    ctx.fillStyle = 'skyblue'\n    ctx.fillRect(p.x, p.y, p.largeur, 10)\n  }\n  ctx.fillStyle = 'gold'\n  ctx.fillRect(drapeau.x, drapeau.y, drapeau.largeur, drapeau.hauteur)\n  ctx.fillStyle = 'orange'\n  ctx.fillRect(x, y - 20, 20, 20)\n\n  if (gagne) {\n    // Ton code ici : affiche \"Gagné !\" avec ctx.fillText\n  }\n\n  requestAnimationFrame(boucle)\n}\n\nboucle()\n",
        hints: [
          'if (collision(drapeau.x, drapeau.y, drapeau.largeur, drapeau.hauteur, x, y - 20, 20, 20)) {\n  gagne = true\n}',
          "ctx.fillStyle = 'white'\nctx.font = '24px sans-serif'\nctx.fillText('Gagné !', 100, 200)",
        ],
        check: (_stdout, _get, _c, _f, _d, code) =>
          has(code, /collision\s*\(/) && has(code, /gagne/) && has(code, /ctx\.fillText\s*\(/)
            ? ok('Sommet atteint — ton parcours de plateforme est complet ! 🏆')
            : fail('Détecte le contact avec le drapeau (collision), et affiche "Gagné !" avec ctx.fillText.'),
      },
    ],
  },
  // ============================================================
  // LABYRINTHE — une carte 2D comme donnée de niveau
  // ============================================================
  {
    id: 'labyrinthe',
    title: 'Labyrinthe',
    emoji: '🌀',
    description: 'Une carte à lire comme un plan, un chemin à trouver jusqu\'à la sortie.',
    difficulty: 'Intermédiaire',
    color: 'from-teal-400 to-emerald-600',
    steps: [
      {
        id: 'laby-1',
        trackId: 'labyrinthe',
        title: 'Lire la carte',
        emoji: '🗺️',
        xp: 20,
        intro:
          "carte est un tableau 2D : 1 pour un mur, 0 pour une case libre. Chaque case fait 30 pixels. Parcours carte avec une double boucle et dessine un mur (fillRect) partout où il vaut 1.",
        task: 'Dessine tous les murs du labyrinthe à partir des 1 dans la carte.',
        starterCode:
          "const carte = [\n  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],\n  [1, 0, 0, 0, 1, 0, 0, 0, 0, 1],\n  [1, 0, 1, 0, 1, 0, 1, 1, 0, 1],\n  [1, 0, 1, 0, 0, 0, 0, 1, 0, 1],\n  [1, 0, 1, 1, 1, 1, 0, 1, 0, 1],\n  [1, 0, 0, 0, 0, 1, 0, 0, 0, 1],\n  [1, 1, 1, 1, 0, 1, 1, 1, 0, 1],\n  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],\n  [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],\n  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],\n]\n\n// Ton code ici : parcours carte avec une double boucle, dessine un mur (fillRect) où c'est un 1\n",
        hints: [
          "ctx.fillStyle = 'slategray'\nfor (let ligne = 0; ligne < carte.length; ligne++) {\n  for (let col = 0; col < carte[ligne].length; col++) {\n    if (carte[ligne][col] === 1) {\n      ctx.fillRect(col * 30, ligne * 30, 30, 30)\n    }\n  }\n}",
        ],
        check: (_stdout, _get, _c, _f, _d, code) =>
          has(code, /carte\[/) && has(code, /ctx\.fillRect\s*\(/)
            ? ok("Le plan du labyrinthe prend forme sur l'écran ! 🗺️")
            : fail('Parcours le tableau carte avec deux boucles, et dessine un mur où la valeur est 1.'),
      },
      {
        id: 'laby-2',
        trackId: 'labyrinthe',
        title: 'Bouger sans traverser les murs',
        emoji: '🚶',
        xp: 25,
        intro:
          "Comme le serpent, le joueur avance case par case (tick-based avec un compteur). Avant de bouger, vérifie que la case de destination dans carte n'est pas un mur (carte[ligne][col] === 0).",
        task: "Sur les flèches, déplace le joueur d'une case, mais uniquement si ce n'est pas un mur.",
        starterCode:
          "const carte = [\n  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],\n  [1, 0, 0, 0, 1, 0, 0, 0, 0, 1],\n  [1, 0, 1, 0, 1, 0, 1, 1, 0, 1],\n  [1, 0, 1, 0, 0, 0, 0, 1, 0, 1],\n  [1, 0, 1, 1, 1, 1, 0, 1, 0, 1],\n  [1, 0, 0, 0, 0, 1, 0, 0, 0, 1],\n  [1, 1, 1, 1, 0, 1, 1, 1, 0, 1],\n  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],\n  [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],\n  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],\n]\nlet joueurCol = 1\nlet joueurLigne = 1\nlet compteur = 0\n\nfunction boucle() {\n  ctx.clearRect(0, 0, canvas.width, canvas.height)\n  compteur++\n\n  if (compteur % 8 === 0) {\n    let col = joueurCol\n    let ligne = joueurLigne\n    if (estAppuyee('ArrowLeft')) col--\n    if (estAppuyee('ArrowRight')) col++\n    if (estAppuyee('ArrowUp')) ligne--\n    if (estAppuyee('ArrowDown')) ligne++\n\n    // Ton code ici : si carte[ligne][col] === 0, déplace joueurCol/joueurLigne\n  }\n\n  ctx.fillStyle = 'slategray'\n  for (let ligne = 0; ligne < carte.length; ligne++) {\n    for (let col = 0; col < carte[ligne].length; col++) {\n      if (carte[ligne][col] === 1) ctx.fillRect(col * 30, ligne * 30, 30, 30)\n    }\n  }\n  ctx.fillStyle = 'gold'\n  ctx.fillRect(joueurCol * 30 + 5, joueurLigne * 30 + 5, 20, 20)\n\n  requestAnimationFrame(boucle)\n}\n\nboucle()\n",
        hints: [
          'if (carte[ligne][col] === 0) {\n  joueurCol = col\n  joueurLigne = ligne\n}',
        ],
        check: (_stdout, _get, _c, _f, _d, code) =>
          has(code, /carte\[ligne\]\[col\]\s*===\s*0/) && has(code, /estAppuyee\s*\(/)
            ? ok('Un joueur qui respecte les murs du labyrinthe ! 🚶')
            : fail('Vérifie carte[ligne][col] === 0 avant de déplacer joueurCol/joueurLigne.'),
      },
      {
        id: 'laby-3',
        trackId: 'labyrinthe',
        title: 'Arriver à la sortie',
        emoji: '🏁',
        xp: 25,
        intro:
          'La sortie est une case précise (col 8, ligne 8 dans cette carte). Si le joueur y arrive, passe gagne à true.',
        task: 'Détecte quand le joueur atteint la case de sortie.',
        starterCode:
          "const carte = [\n  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],\n  [1, 0, 0, 0, 1, 0, 0, 0, 0, 1],\n  [1, 0, 1, 0, 1, 0, 1, 1, 0, 1],\n  [1, 0, 1, 0, 0, 0, 0, 1, 0, 1],\n  [1, 0, 1, 1, 1, 1, 0, 1, 0, 1],\n  [1, 0, 0, 0, 0, 1, 0, 0, 0, 1],\n  [1, 1, 1, 1, 0, 1, 1, 1, 0, 1],\n  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],\n  [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],\n  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],\n]\nlet joueurCol = 1\nlet joueurLigne = 1\nlet compteur = 0\nlet gagne = false\n\nfunction boucle() {\n  ctx.clearRect(0, 0, canvas.width, canvas.height)\n  compteur++\n\n  if (!gagne && compteur % 8 === 0) {\n    let col = joueurCol\n    let ligne = joueurLigne\n    if (estAppuyee('ArrowLeft')) col--\n    if (estAppuyee('ArrowRight')) col++\n    if (estAppuyee('ArrowUp')) ligne--\n    if (estAppuyee('ArrowDown')) ligne++\n\n    if (carte[ligne][col] === 0) {\n      joueurCol = col\n      joueurLigne = ligne\n    }\n\n    // Ton code ici : si joueurCol === 8 et joueurLigne === 8, passe gagne à true\n  }\n\n  ctx.fillStyle = 'slategray'\n  for (let ligne = 0; ligne < carte.length; ligne++) {\n    for (let col = 0; col < carte[ligne].length; col++) {\n      if (carte[ligne][col] === 1) ctx.fillRect(col * 30, ligne * 30, 30, 30)\n    }\n  }\n  ctx.fillStyle = 'limegreen'\n  ctx.fillRect(8 * 30 + 5, 8 * 30 + 5, 20, 20)\n  ctx.fillStyle = 'gold'\n  ctx.fillRect(joueurCol * 30 + 5, joueurLigne * 30 + 5, 20, 20)\n\n  requestAnimationFrame(boucle)\n}\n\nboucle()\n",
        hints: [
          'if (joueurCol === 8 && joueurLigne === 8) {\n  gagne = true\n}',
        ],
        check: (_stdout, _get, _c, _f, _d, code) =>
          has(code, /joueurCol\s*===\s*8/) && has(code, /gagne\s*=\s*true/)
            ? ok('La sortie est détectée — plus qu\'à afficher la victoire ! 🏁')
            : fail('Vérifie joueurCol === 8 et joueurLigne === 8, et passe gagne à true.'),
      },
      {
        id: 'laby-4',
        trackId: 'labyrinthe',
        title: 'Ton labyrinthe complet',
        emoji: '🏆',
        xp: 40,
        intro: 'Affiche "Sorti !" avec ctx.fillText quand gagne est vrai.',
        task: 'Affiche un message de victoire quand le joueur trouve la sortie.',
        starterCode:
          "const carte = [\n  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],\n  [1, 0, 0, 0, 1, 0, 0, 0, 0, 1],\n  [1, 0, 1, 0, 1, 0, 1, 1, 0, 1],\n  [1, 0, 1, 0, 0, 0, 0, 1, 0, 1],\n  [1, 0, 1, 1, 1, 1, 0, 1, 0, 1],\n  [1, 0, 0, 0, 0, 1, 0, 0, 0, 1],\n  [1, 1, 1, 1, 0, 1, 1, 1, 0, 1],\n  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],\n  [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],\n  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],\n]\nlet joueurCol = 1\nlet joueurLigne = 1\nlet compteur = 0\nlet gagne = false\n\nfunction boucle() {\n  ctx.clearRect(0, 0, canvas.width, canvas.height)\n  compteur++\n\n  if (!gagne && compteur % 8 === 0) {\n    let col = joueurCol\n    let ligne = joueurLigne\n    if (estAppuyee('ArrowLeft')) col--\n    if (estAppuyee('ArrowRight')) col++\n    if (estAppuyee('ArrowUp')) ligne--\n    if (estAppuyee('ArrowDown')) ligne++\n\n    if (carte[ligne][col] === 0) {\n      joueurCol = col\n      joueurLigne = ligne\n    }\n    if (joueurCol === 8 && joueurLigne === 8) {\n      gagne = true\n    }\n  }\n\n  ctx.fillStyle = 'slategray'\n  for (let ligne = 0; ligne < carte.length; ligne++) {\n    for (let col = 0; col < carte[ligne].length; col++) {\n      if (carte[ligne][col] === 1) ctx.fillRect(col * 30, ligne * 30, 30, 30)\n    }\n  }\n  ctx.fillStyle = 'limegreen'\n  ctx.fillRect(8 * 30 + 5, 8 * 30 + 5, 20, 20)\n  ctx.fillStyle = 'gold'\n  ctx.fillRect(joueurCol * 30 + 5, joueurLigne * 30 + 5, 20, 20)\n\n  if (gagne) {\n    // Ton code ici : affiche \"Sorti !\" avec ctx.fillText\n  }\n\n  requestAnimationFrame(boucle)\n}\n\nboucle()\n",
        hints: [
          "ctx.fillStyle = 'white'\nctx.font = '28px sans-serif'\nctx.fillText('Sorti !', 90, 150)",
        ],
        check: (_stdout, _get, _c, _f, _d, code) =>
          has(code, /gagne/) && has(code, /ctx\.fillText\s*\(/) && has(code, /carte\[/)
            ? ok('Labyrinthe résolu — carte lue, chemin trouvé, sortie atteinte ! 🏆')
            : fail('Affiche un message avec ctx.fillText quand gagne est vrai.'),
      },
    ],
  },
  // ============================================================
  // CLICKER — clic, économie et revenu automatique (jeu incrémental)
  // ============================================================
  {
    id: 'clicker',
    title: 'Clicker',
    emoji: '💰',
    description: 'Clique, gagne des points, investis pour que ça rapporte tout seul.',
    difficulty: 'Débutant',
    color: 'from-yellow-400 to-amber-600',
    steps: [
      {
        id: 'clicker-1',
        trackId: 'clicker',
        title: 'Cliquer pour gagner des points',
        emoji: '👆',
        xp: 15,
        controls: 'none',
        intro:
          "Un jeu incrémental (\"clicker\") repose sur une seule idée : chaque clic rapporte des points. Détecte le clic sur le bouton doré, et augmente points.",
        task: 'Au clic sur le bouton, augmente les points, et affiche-les à l\'écran.',
        starterCode:
          "let points = 0\n\nfunction dessiner() {\n  ctx.clearRect(0, 0, canvas.width, canvas.height)\n  ctx.fillStyle = 'gold'\n  ctx.beginPath()\n  ctx.arc(150, 200, 60, 0, Math.PI * 2)\n  ctx.fill()\n\n  ctx.fillStyle = 'white'\n  ctx.font = '20px sans-serif'\n  // Ton code ici : affiche points avec ctx.fillText\n}\n\ncanvas.addEventListener('click', function (e) {\n  const distance = Math.hypot(e.offsetX - 150, e.offsetY - 200)\n  if (distance < 60) {\n    // Ton code ici : augmente points\n  }\n  dessiner()\n})\n\ndessiner()\n",
        hints: ['points++', "ctx.fillText(`Points : ${points}`, 10, 30)"],
        check: (_stdout, _get, _c, _f, _d, code) =>
          has(code, /points\s*(\+\+|\+=)/) && has(code, /ctx\.fillText\s*\(/)
            ? ok('Premiers points gagnés au clic ! 👆')
            : fail('Augmente points au clic sur le bouton, et affiche-le avec ctx.fillText.'),
      },
      {
        id: 'clicker-2',
        trackId: 'clicker',
        title: 'Un générateur automatique',
        emoji: '⚙️',
        xp: 20,
        controls: 'none',
        intro:
          "autoParSeconde représente les points gagnés automatiquement chaque seconde. Avec un compteur d'images (le jeu tourne à ~60 images/seconde), ajoute autoParSeconde à points une fois toutes les 60 images.",
        task: 'Fais gagner des points automatiquement, une fois par seconde, sans avoir besoin de cliquer.',
        starterCode:
          "let points = 0\nlet autoParSeconde = 1\nlet compteur = 0\n\nfunction dessiner() {\n  ctx.clearRect(0, 0, canvas.width, canvas.height)\n  ctx.fillStyle = 'gold'\n  ctx.beginPath()\n  ctx.arc(150, 200, 60, 0, Math.PI * 2)\n  ctx.fill()\n\n  ctx.fillStyle = 'white'\n  ctx.font = '20px sans-serif'\n  ctx.fillText(`Points : ${Math.floor(points)}`, 10, 30)\n}\n\ncanvas.addEventListener('click', function (e) {\n  const distance = Math.hypot(e.offsetX - 150, e.offsetY - 200)\n  if (distance < 60) points++\n  dessiner()\n})\n\nfunction boucle() {\n  compteur++\n\n  // Ton code ici : toutes les 60 images, ajoute autoParSeconde à points\n\n  dessiner()\n  requestAnimationFrame(boucle)\n}\n\nboucle()\n",
        hints: [
          'if (compteur % 60 === 0) {\n  points += autoParSeconde\n}',
        ],
        check: (_stdout, _get, _c, _f, _d, code) =>
          has(code, /autoParSeconde/) && has(code, /%\s*60/)
            ? ok('Ça rapporte même sans cliquer, un vrai clicker ! ⚙️')
            : fail('Ajoute autoParSeconde à points une fois par seconde (compteur % 60 === 0).'),
      },
      {
        id: 'clicker-3',
        trackId: 'clicker',
        title: 'Une boutique pour améliorer',
        emoji: '🏪',
        xp: 25,
        controls: 'none',
        intro:
          "Un deuxième bouton (la boutique) coûte prix points. Si le joueur clique dessus et a assez de points, retire prix de points, augmente autoParSeconde, et augmente prix pour le prochain achat.",
        task: "Au clic sur la boutique, si le joueur a assez de points, améliore son revenu automatique — et augmente le prix pour la prochaine fois.",
        starterCode:
          "let points = 0\nlet autoParSeconde = 1\nlet prix = 10\nlet compteur = 0\n\nfunction dessiner() {\n  ctx.clearRect(0, 0, canvas.width, canvas.height)\n  ctx.fillStyle = 'gold'\n  ctx.beginPath()\n  ctx.arc(150, 150, 50, 0, Math.PI * 2)\n  ctx.fill()\n\n  ctx.fillStyle = 'mediumseagreen'\n  ctx.fillRect(75, 280, 150, 60)\n\n  ctx.fillStyle = 'white'\n  ctx.font = '16px sans-serif'\n  ctx.fillText(`Points : ${Math.floor(points)}`, 10, 30)\n  ctx.fillText(`Boutique : ${prix} pts`, 90, 315)\n}\n\ncanvas.addEventListener('click', function (e) {\n  const distanceBouton = Math.hypot(e.offsetX - 150, e.offsetY - 150)\n  if (distanceBouton < 50) points++\n\n  const dansBoutique = e.offsetX > 75 && e.offsetX < 225 && e.offsetY > 280 && e.offsetY < 340\n  if (dansBoutique) {\n    // Ton code ici : si points >= prix, achète (points -= prix, autoParSeconde++, prix *= 2)\n  }\n\n  dessiner()\n})\n\nfunction boucle() {\n  compteur++\n  if (compteur % 60 === 0) points += autoParSeconde\n  dessiner()\n  requestAnimationFrame(boucle)\n}\n\nboucle()\n",
        hints: [
          'if (points >= prix) {\n  points -= prix\n  autoParSeconde++\n  prix *= 2\n}',
        ],
        check: (_stdout, _get, _c, _f, _d, code) =>
          has(code, /prix/) && has(code, /autoParSeconde\s*(\+\+|\+=)/) && has(code, /points\s*-=/)
            ? ok('Une vraie petite économie qui s\'auto-alimente ! 🏪')
            : fail('Si points >= prix, retire prix, augmente autoParSeconde, et augmente prix.'),
      },
      {
        id: 'clicker-4',
        trackId: 'clicker',
        title: 'Ton Clicker complet',
        emoji: '🏆',
        xp: 40,
        controls: 'none',
        intro: "Affiche aussi autoParSeconde à l'écran, pour voir sa petite économie grandir.",
        task: "Affiche aussi le revenu automatique par seconde, en plus du score et du prix de la boutique.",
        starterCode:
          "let points = 0\nlet autoParSeconde = 1\nlet prix = 10\nlet compteur = 0\n\nfunction dessiner() {\n  ctx.clearRect(0, 0, canvas.width, canvas.height)\n  ctx.fillStyle = 'gold'\n  ctx.beginPath()\n  ctx.arc(150, 150, 50, 0, Math.PI * 2)\n  ctx.fill()\n\n  ctx.fillStyle = 'mediumseagreen'\n  ctx.fillRect(75, 280, 150, 60)\n\n  ctx.fillStyle = 'white'\n  ctx.font = '16px sans-serif'\n  ctx.fillText(`Points : ${Math.floor(points)}`, 10, 30)\n  ctx.fillText(`Boutique : ${prix} pts`, 90, 315)\n  // Ton code ici : affiche `${autoParSeconde} pts/seconde` avec ctx.fillText\n}\n\ncanvas.addEventListener('click', function (e) {\n  const distanceBouton = Math.hypot(e.offsetX - 150, e.offsetY - 150)\n  if (distanceBouton < 50) points++\n\n  const dansBoutique = e.offsetX > 75 && e.offsetX < 225 && e.offsetY > 280 && e.offsetY < 340\n  if (dansBoutique && points >= prix) {\n    points -= prix\n    autoParSeconde++\n    prix *= 2\n  }\n\n  dessiner()\n})\n\nfunction boucle() {\n  compteur++\n  if (compteur % 60 === 0) points += autoParSeconde\n  dessiner()\n  requestAnimationFrame(boucle)\n}\n\nboucle()\n",
        hints: ["ctx.fillText(`${autoParSeconde} pts/seconde`, 10, 55)"],
        check: (_stdout, _get, _c, _f, _d, code) =>
          has(code, /autoParSeconde/) && has(code, /ctx\.fillText\s*\(/) && has(code, /prix/)
            ? ok('Ton Clicker est complet — clique, investis, regarde ça grandir ! 🏆')
            : fail("Affiche autoParSeconde avec ctx.fillText, en plus du score et du prix."),
      },
    ],
  },
  // ============================================================
  // BAC À SABLE — aucune mission, code libre
  // ============================================================
  {
    id: 'bac-a-sable',
    title: 'Bac à sable',
    emoji: '🧪',
    description: 'Aucune mission imposée : ton terrain de jeu.',
    difficulty: 'Débutant',
    color: 'from-slate-500 to-slate-600',
    steps: [
      {
        id: 'game-8',
        trackId: 'bac-a-sable',
        title: 'Bac à sable',
        emoji: '🧪',
        xp: 15,
        intro:
          "Plus de mission imposée : c'est ton terrain de jeu. canvas, ctx, estAppuyee(), hasard() et collision() sont toujours là. Invente ton propre mini-jeu, ou remixe n'importe lequel des jeux précédents.",
        task: 'Code ce que tu veux, teste-le, recommence. Amuse-toi !',
        starterCode:
          "// Tout est permis ici : canvas, ctx, estAppuyee('ArrowLeft'|'ArrowRight'|'ArrowUp'|'ArrowDown'|' '|...),\n// hasard(min, max), collision(x1,y1,l1,h1,x2,y2,l2,h2), requestAnimationFrame(boucle),\n// canvas.addEventListener('click', fonction) pour les jeux au clic\n\n// Ton code ici\n",
        hints: [
          "Recopie et modifie le code d'un des jeux précédents pour t'entraîner : change les couleurs, la vitesse, les règles...",
        ],
        check: () => ok('Tu as testé ta création — bravo pour tout ce chemin parcouru ! 🎉'),
      },
    ],
  },
]
