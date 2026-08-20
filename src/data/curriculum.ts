import type { Lesson, Module, CheckResult } from '../types'

// ---------- small helpers for checking user output ----------
const lines = (s: string) =>
  s
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)

const hasLine = (stdout: string, target: string) =>
  lines(stdout).some((l) => l === target)

const hasSubstring = (stdout: string, needle: string) =>
  stdout.toLowerCase().includes(needle.toLowerCase())

const ok = (message: string): CheckResult => ({ ok: true, message })
const fail = (message: string): CheckResult => ({ ok: false, message })

export const MODULES: Module[] = [
  {
    id: 'premiers-pas',
    title: 'Premiers pas',
    emoji: '🐣',
    description: 'Variables, print et compagnie',
    color: 'from-emerald-400 to-teal-500',
  },
  {
    id: 'maths',
    title: 'Maths malignes',
    emoji: '🔢',
    description: 'Calculs et opérateurs',
    color: 'from-sky-400 to-blue-500',
  },
  {
    id: 'texte',
    title: 'Texte & mots',
    emoji: '🔤',
    description: 'Chaînes de caractères',
    color: 'from-violet-400 to-purple-500',
  },
  {
    id: 'conditions',
    title: 'Choix & conditions',
    emoji: '🤔',
    description: 'if, elif, else',
    color: 'from-amber-400 to-orange-500',
  },
  {
    id: 'boucles',
    title: 'Boucles infinies (ou pas)',
    emoji: '🔁',
    description: 'for et while',
    color: 'from-pink-400 to-rose-500',
  },
  {
    id: 'listes',
    title: 'Listes de sortilèges',
    emoji: '📦',
    description: 'Collections de données',
    color: 'from-lime-400 to-green-500',
  },
  {
    id: 'dictionnaires',
    title: 'Grimoire de clés',
    emoji: '🗂️',
    description: 'Dictionnaires',
    color: 'from-cyan-400 to-sky-500',
  },
  {
    id: 'fonctions',
    title: 'Sorts réutilisables',
    emoji: '🛠️',
    description: 'Fonctions',
    color: 'from-fuchsia-400 to-pink-500',
  },
  {
    id: 'boss',
    title: 'Boss final',
    emoji: '🐉',
    description: 'Tout combiner !',
    color: 'from-red-500 to-orange-600',
  },
  {
    id: 'jeu',
    title: 'Crée ton jeu',
    emoji: '🎮',
    description: 'Un jeu de combat, étape par étape',
    color: 'from-indigo-500 to-purple-600',
  },
]

export const LESSONS: Lesson[] = [
  // ---------------- PREMIERS PAS ----------------
  {
    id: 'pp-1',
    moduleId: 'premiers-pas',
    title: 'Bonjour le monde',
    emoji: '👋',
    xp: 10,
    intro:
      "Bienvenue dans PyQuest ! ✨ Ton premier sort s'appelle `print()`. Il affiche du texte à l'écran.",
    task: 'Utilise `print()` pour afficher exactement : Bonjour, Python !',
    starterCode: '# Écris ton code ici\n',
    hints: [
      "N'oublie pas les guillemets autour du texte : print(\"...\")",
      'Le texte doit être exactement `Bonjour, Python !` (avec la majuscule et le point d\'exclamation).',
    ],
    check: (stdout) =>
      hasLine(stdout, 'Bonjour, Python !')
        ? ok('Le monde te salue en retour ! 🎉')
        : fail('Il manque (ou il y a une erreur dans) la ligne "Bonjour, Python !".'),
  },
  {
    id: 'pp-2',
    moduleId: 'premiers-pas',
    title: 'Ta première variable',
    emoji: '🏷️',
    xp: 10,
    intro:
      'Une variable, c\'est une boîte étiquetée qui garde une valeur en mémoire. `prenom = "Ada"` range "Ada" dans la boîte `prenom`.',
    task:
      'Crée une variable `prenom` contenant ton prénom (ou celui d\'un·e héros·ïne de ton choix), puis affiche : Je m\'appelle suivi du prénom, avec un f-string comme `print(f"Je m\'appelle {prenom}")`.',
    starterCode: 'prenom = "Ada"\n\n# Affiche "Je m\'appelle ..." ici\n',
    hints: [
      'Un f-string se construit avec `f"...{variable}..."`.',
      'Exemple exact attendu : print(f"Je m\'appelle {prenom}")',
    ],
    check: (stdout, get) => {
      const prenom = get('prenom')
      if (typeof prenom !== 'string' || prenom.length === 0) {
        return fail('La variable `prenom` doit être une chaîne de caractères non vide.')
      }
      return hasSubstring(stdout, "je m'appelle") && hasSubstring(stdout, prenom)
        ? ok(`Enchanté, ${prenom} ! 🧙`)
        : fail('Affiche une phrase contenant "Je m\'appelle" suivie de ta variable prenom.')
    },
  },
  {
    id: 'pp-3',
    moduleId: 'premiers-pas',
    title: 'Voyage dans le temps',
    emoji: '⏳',
    xp: 15,
    intro:
      'Les variables peuvent être des nombres. On peut faire des calculs avec, comme `age + 10`.',
    task:
      'La variable `age` vaut 15. Calcule l\'âge dans 10 ans dans une nouvelle variable `age_futur`, puis affiche uniquement ce nombre avec `print(age_futur)`.',
    starterCode: 'age = 15\n\n# Calcule age_futur puis affiche-le\n',
    hints: [
      'age_futur = age + 10',
      'La dernière ligne doit être : print(age_futur)',
    ],
    check: (stdout) =>
      hasLine(stdout, '25')
        ? ok('Le voyage temporel est réussi : 25 ans ! 🚀')
        : fail('Le programme doit afficher 25 (age + 10).'),
  },

  // ---------------- MATHS ----------------
  {
    id: 'math-1',
    moduleId: 'maths',
    title: 'La calculette magique',
    emoji: '➕',
    xp: 10,
    intro: 'Python sait faire +, -, *, / comme une calculatrice surpuissante.',
    task: 'Calcule 7 * 6 et affiche uniquement le résultat avec print().',
    starterCode: '# Affiche le résultat de 7 * 6\n',
    hints: ['print(7 * 6)', 'Le résultat attendu est 42.'],
    check: (stdout) =>
      hasLine(stdout, '42')
        ? ok('42, la réponse à peu près à tout ! 🌌')
        : fail('Le programme doit afficher 42.'),
  },
  {
    id: 'math-2',
    moduleId: 'maths',
    title: 'Pair ou impair ?',
    emoji: '🪙',
    xp: 15,
    intro:
      "L'opérateur `%` (modulo) donne le reste d'une division. `10 % 2` vaut 0 car 10 est pair.",
    task:
      "La variable `nombre` vaut 17. Calcule `nombre % 2` dans une variable `reste` et affiche-la avec print(reste).",
    starterCode: 'nombre = 17\n\n# Calcule reste = nombre % 2 puis affiche-le\n',
    hints: ['reste = nombre % 2', 'print(reste) doit afficher 1 (17 est impair).'],
    check: (stdout) =>
      hasLine(stdout, '1')
        ? ok('1 = impair, tu maîtrises le modulo ! 🎯')
        : fail('reste doit valoir 17 % 2, soit 1.'),
  },
  {
    id: 'math-3',
    moduleId: 'maths',
    title: 'Priorité des opérations',
    emoji: '🧮',
    xp: 15,
    intro:
      'Comme en maths, `*` est calculé avant `+`. Les parenthèses permettent de forcer un ordre.',
    task:
      'Ce code doit calculer (3 + 4) * 2 et afficher 14, mais il y a un bug (il manque des parenthèses). Corrige-le.',
    starterCode: 'resultat = 3 + 4 * 2\nprint(resultat)\n',
    hints: [
      'Sans parenthèses, Python calcule 4 * 2 en premier.',
      'Écris : resultat = (3 + 4) * 2',
    ],
    check: (stdout) =>
      hasLine(stdout, '14')
        ? ok('Bien vu, les parenthèses changent tout ! 🔧')
        : fail('Le résultat affiché doit être 14.'),
  },

  // ---------------- TEXTE ----------------
  {
    id: 'txt-1',
    moduleId: 'texte',
    title: 'Coller des mots',
    emoji: '🧵',
    xp: 10,
    intro: "On peut coller deux chaînes avec `+`, ou utiliser un f-string, plus lisible.",
    task:
      'Les variables `mot1 = "Py"` et `mot2 = "thon"` existent déjà. Affiche leur concaténation : Python.',
    starterCode: 'mot1 = "Py"\nmot2 = "thon"\n\n# Affiche "Python"\n',
    hints: ['print(mot1 + mot2)', 'Ou : print(f"{mot1}{mot2}")'],
    check: (stdout) =>
      hasLine(stdout, 'Python')
        ? ok('Fusion réussie ! 🐍')
        : fail('Le programme doit afficher exactement "Python".'),
  },
  {
    id: 'txt-2',
    moduleId: 'texte',
    title: 'Cris et chuchotements',
    emoji: '📣',
    xp: 15,
    intro:
      'Les chaînes ont des méthodes intégrées : `.upper()` met en MAJUSCULES, `.lower()` en minuscules.',
    task:
      'La variable `phrase = "python c\'est genial"` existe. Affiche-la entièrement en majuscules.',
    starterCode: "phrase = \"python c'est genial\"\n\n# Affiche la version en majuscules\n",
    hints: ['print(phrase.upper())'],
    check: (stdout) =>
      hasSubstring(stdout, "PYTHON C'EST GENIAL")
        ? ok("Ça crie 'PYTHON' jusqu'au bout de l'écran ! 📢")
        : fail('Utilise .upper() sur la variable phrase et affiche le résultat.'),
  },
  {
    id: 'txt-3',
    moduleId: 'texte',
    title: 'Découper le texte',
    emoji: '✂️',
    xp: 15,
    intro:
      'On peut découper une chaîne avec `[debut:fin]` (slicing) et connaître sa longueur avec `len()`.',
    task:
      'La variable `mot = "PYTHONISTE"` existe. Affiche les 6 premières lettres, puis sur une autre ligne la longueur totale du mot avec len().',
    starterCode: 'mot = "PYTHONISTE"\n\n# 1) affiche mot[0:6]\n# 2) affiche len(mot)\n',
    hints: ['print(mot[0:6]) affiche "PYTHON"', 'print(len(mot)) affiche 10'],
    check: (stdout) => {
      const ls = lines(stdout)
      const hasSlice = ls.includes('PYTHON')
      const hasLen = ls.includes('10')
      return hasSlice && hasLen
        ? ok('Découpage laser parfaitement calibré ! ⚡')
        : fail('Il faut afficher "PYTHON" (mot[0:6]) puis 10 (len(mot)), chacun sur une ligne.')
    },
  },

  {
    id: 'txt-4',
    moduleId: 'texte',
    title: 'Découper la phrase',
    emoji: '🍞',
    xp: 15,
    intro:
      '.split() sépare une chaîne en liste de mots (par défaut sur les espaces). " - ".join(liste) fait l\'inverse : elle recolle une liste en une chaîne.',
    task:
      'La variable `phrase = "le chat noir dort"` existe. Sépare-la en mots avec .split() dans une variable `mots`, affiche le nombre de mots avec len(), puis affiche les mots recollés avec " - " entre eux grâce à " - ".join(mots).',
    starterCode: 'phrase = "le chat noir dort"\nmots = phrase.split()\n\n# 1) affiche len(mots)\n# 2) affiche " - ".join(mots)\n',
    hints: [
      'print(len(mots)) doit afficher 4.',
      'print(" - ".join(mots)) doit afficher "le - chat - noir - dort".',
    ],
    check: (stdout) => {
      const ls = lines(stdout)
      return ls.includes('4') && ls.includes('le - chat - noir - dort')
        ? ok('Phrase découpée puis recollée à la perfection ! 🧵')
        : fail('Il faut afficher 4 (le nombre de mots) puis "le - chat - noir - dort".')
    },
  },

  // ---------------- CONDITIONS ----------------
  {
    id: 'cond-1',
    moduleId: 'conditions',
    title: 'La porte magique',
    emoji: '🚪',
    xp: 15,
    intro:
      "`if condition:` exécute un bloc seulement si la condition est vraie. `else:` gère le cas contraire.",
    task:
      'La variable `age = 20` existe. Si `age >= 18`, affiche "Accès autorisé", sinon affiche "Accès refusé".',
    starterCode: 'age = 20\n\n# Écris ton if / else ici\n',
    hints: [
      'if age >= 18:\n    print("Accès autorisé")\nelse:\n    print("Accès refusé")',
      "Attention à l'indentation (4 espaces) après les deux-points !",
    ],
    check: (stdout) =>
      hasLine(stdout, 'Accès autorisé')
        ? ok('La porte magique s\'ouvre en grand ! 🔓')
        : fail('Avec age = 20, le programme doit afficher "Accès autorisé".'),
  },
  {
    id: 'cond-2',
    moduleId: 'conditions',
    title: 'Le juge des notes',
    emoji: '⚖️',
    xp: 15,
    intro: 'Avec `elif`, on peut enchaîner plusieurs conditions les unes après les autres.',
    task:
      'La variable `note = 14` existe. Affiche "Mention Bien" si note >= 14, "Mention Assez Bien" si note >= 12, sinon "Admis".',
    starterCode: 'note = 14\n\n# if / elif / else\n',
    hints: [
      'if note >= 14:\n    print("Mention Bien")\nelif note >= 12:\n    print("Mention Assez Bien")\nelse:\n    print("Admis")',
    ],
    check: (stdout) =>
      hasLine(stdout, 'Mention Bien')
        ? ok('Le jury est unanime : Mention Bien ! 🏅')
        : fail('Avec note = 14, le programme doit afficher "Mention Bien".'),
  },
  {
    id: 'cond-3',
    moduleId: 'conditions',
    title: 'Le videur de la soirée',
    emoji: '🕶️',
    xp: 20,
    intro: 'On combine des conditions avec `and` (et), `or` (ou) et `not` (non).',
    task:
      'Les variables `age = 25` et `a_invitation = False` existent. Affiche "Bienvenue" si (age >= 18 et a_invitation) OU si age >= 21. Sinon affiche "Reste dehors".',
    starterCode: 'age = 25\na_invitation = False\n\n# Combine les conditions avec and / or\n',
    hints: [
      'if (age >= 18 and a_invitation) or age >= 21:',
      'Avec ces valeurs, age >= 21 est vrai donc le résultat est "Bienvenue".',
    ],
    check: (stdout) =>
      hasLine(stdout, 'Bienvenue')
        ? ok("Le videur te laisse passer, tu géres les booléens ! 🎉")
        : fail('Avec age = 25 et a_invitation = False, le programme doit afficher "Bienvenue".'),
  },

  // ---------------- BOUCLES ----------------
  {
    id: 'loop-1',
    moduleId: 'boucles',
    title: 'Le compte à rebours',
    emoji: '🚀',
    xp: 15,
    intro: '`for i in range(n):` répète un bloc n fois, avec i qui prend les valeurs 0, 1, 2...',
    task: 'Affiche les nombres de 1 à 5 (un par ligne) en utilisant une boucle for et range().',
    starterCode: '# Utilise for ... in range(...)\n',
    hints: [
      'range(1, 6) donne 1, 2, 3, 4, 5.',
      'for i in range(1, 6):\n    print(i)',
    ],
    check: (stdout) => {
      const ls = lines(stdout)
      const expected = ['1', '2', '3', '4', '5']
      const okAll = expected.every((v) => ls.includes(v))
      return okAll
        ? ok('Décollage réussi, 1 à 5 affichés ! 🛸')
        : fail('Il faut afficher les nombres 1, 2, 3, 4 et 5, chacun sur sa ligne.')
    },
  },
  {
    id: 'loop-2',
    moduleId: 'boucles',
    title: 'La potion qui déborde',
    emoji: '🧪',
    xp: 15,
    intro: '`while condition:` répète tant que la condition reste vraie. Attention à bien la faire évoluer, sinon boucle infinie !',
    task:
      'La variable `niveau = 0` existe. Tant que `niveau < 3`, affiche "Remplissage..." puis augmente niveau de 1. À la fin (hors boucle), affiche "Débordement !".',
    starterCode: 'niveau = 0\n\n# while niveau < 3: ...\n\n# puis print("Débordement !")\n',
    hints: [
      'while niveau < 3:\n    print("Remplissage...")\n    niveau = niveau + 1',
      "N'oublie pas print(\"Débordement !\") après la boucle (même indentation que while).",
    ],
    check: (stdout) => {
      const ls = lines(stdout)
      const fillCount = ls.filter((l) => l === 'Remplissage...').length
      const hasOverflow = ls.includes('Débordement !')
      return fillCount === 3 && hasOverflow
        ? ok('Trois remplissages puis... Débordement ! 💥')
        : fail('Il faut afficher "Remplissage..." exactement 3 fois, puis "Débordement !".')
    },
  },
  {
    id: 'loop-3',
    moduleId: 'boucles',
    title: "L'accumulateur de pièces",
    emoji: '🪙',
    xp: 20,
    intro: 'On peut accumuler une valeur au fil d\'une boucle grâce à une variable "total".',
    task:
      'La liste `pieces = [2, 5, 1, 8, 3]` existe. Calcule la somme de toutes les pièces avec une boucle for et une variable `total`, puis affiche `total`.',
    starterCode: 'pieces = [2, 5, 1, 8, 3]\ntotal = 0\n\n# for piece in pieces: ...\n\nprint(total)\n',
    hints: [
      'for piece in pieces:\n    total = total + piece',
      'La somme de 2+5+1+8+3 vaut 19.',
    ],
    check: (stdout) =>
      hasLine(stdout, '19')
        ? ok('Trésor amassé : 19 pièces ! 💰')
        : fail('total doit afficher la somme des pièces, soit 19.'),
  },

  {
    id: 'loop-4',
    moduleId: 'boucles',
    title: 'Le frein d\'urgence',
    emoji: '🛑',
    xp: 20,
    intro: '`break` arrête complètement une boucle, immédiatement, dès qu\'on le rencontre.',
    task:
      'La liste `nombres = [3, 7, 2, 9, 4, 12, 1]` existe. Parcours-la avec un for, affiche chaque nombre, mais arrête la boucle avec break juste après avoir affiché un nombre strictement supérieur à 10 (donc le programme ne doit jamais afficher le 1 final).',
    starterCode: 'nombres = [3, 7, 2, 9, 4, 12, 1]\n\nfor n in nombres:\n    print(n)\n    # arrête la boucle ici si n > 10\n',
    hints: [
      'if n > 10:\n        break',
      'Le dernier nombre affiché doit être 12 (le 1 ne doit jamais apparaître).',
    ],
    check: (stdout) => {
      const ls = lines(stdout)
      const expected = ['3', '7', '2', '9', '4', '12']
      const matches = ls.length === expected.length && expected.every((v, i) => ls[i] === v)
      return matches
        ? ok('Freinage parfait, pile au bon moment ! 🛑')
        : fail('Il faut afficher 3, 7, 2, 9, 4 puis 12 (dans cet ordre), et rien après.')
    },
  },

  // ---------------- LISTES ----------------
  {
    id: 'list-1',
    moduleId: 'listes',
    title: 'Ton sac à dos',
    emoji: '🎒',
    xp: 15,
    intro: "Une liste range plusieurs valeurs, dans l'ordre : `sac = [\"corde\", \"pain\"]`. On accède à un élément avec `sac[0]`.",
    task:
      'La liste `sac = ["epee", "bouclier", "potion"]` existe. Ajoute "carte" à la fin avec `.append()`, puis affiche le sac entier avec print(sac).',
    starterCode: 'sac = ["epee", "bouclier", "potion"]\n\n# Ajoute "carte" puis affiche le sac\n',
    hints: ['sac.append("carte")', 'print(sac)'],
    check: (stdout) =>
      hasSubstring(stdout, 'carte') && hasSubstring(stdout, 'epee')
        ? ok('Ton sac est prêt pour l\'aventure ! 🗺️')
        : fail('Le sac affiché doit contenir "carte" en plus des objets initiaux.'),
  },
  {
    id: 'list-2',
    moduleId: 'listes',
    title: 'Inventaire complet',
    emoji: '📋',
    xp: 15,
    intro: 'On peut parcourir une liste avec `for element in liste:` pour traiter chaque valeur une par une.',
    task:
      'La liste `monstres = ["gobelin", "dragon", "troll"]` existe. Affiche chaque monstre précédé de "- " (un par ligne), par exemple "- gobelin".',
    starterCode: 'monstres = ["gobelin", "dragon", "troll"]\n\n# for monstre in monstres: ...\n',
    hints: [
      'for monstre in monstres:\n    print(f"- {monstre}")',
    ],
    check: (stdout) => {
      const ls = lines(stdout)
      const expected = ['- gobelin', '- dragon', '- troll']
      return expected.every((e) => ls.includes(e))
        ? ok('Bestiaire recensé au complet ! 📖')
        : fail('Chaque monstre doit être affiché sous la forme "- nom".')
    },
  },
  {
    id: 'list-3',
    moduleId: 'listes',
    title: 'Le tri des potions',
    emoji: '🧙‍♀️',
    xp: 20,
    intro: 'On peut filtrer une liste en ne gardant que les éléments qui respectent une condition.',
    task:
      'La liste `scores = [12, 45, 8, 30, 3, 50]` existe. Affiche uniquement les scores strictement supérieurs à 10, un par ligne, en parcourant la liste avec un for + if.',
    starterCode: 'scores = [12, 45, 8, 30, 3, 50]\n\n# for score in scores: if score > 10: ...\n',
    hints: [
      'for score in scores:\n    if score > 10:\n        print(score)',
    ],
    check: (stdout) => {
      const ls = lines(stdout)
      const expected = ['12', '45', '30', '50']
      const forbidden = ['8', '3']
      const hasAllExpected = expected.every((e) => ls.includes(e))
      const hasNoneForbidden = !forbidden.some((f) => ls.includes(f))
      return hasAllExpected && hasNoneForbidden
        ? ok('Seules les meilleures potions ont survécu au tri ! ⚗️')
        : fail('Il faut afficher uniquement 12, 45, 30 et 50 (les scores > 10).')
    },
  },

  {
    id: 'list-4',
    moduleId: 'listes',
    title: 'Le classement',
    emoji: '🏅',
    xp: 20,
    intro:
      'sorted(liste) renvoie une NOUVELLE liste triée (la liste d\'origine ne change pas). Ajoute reverse=True pour trier du plus grand au plus petit.',
    task:
      'La liste `scores = [42, 17, 99, 8, 63]` existe. Affiche-la triée du plus grand au plus petit avec sorted(scores, reverse=True).',
    starterCode: 'scores = [42, 17, 99, 8, 63]\n\n# Affiche scores triés du plus grand au plus petit\n',
    hints: ['print(sorted(scores, reverse=True))'],
    check: (stdout) =>
      hasLine(stdout, '[99, 63, 42, 17, 8]')
        ? ok('Podium établi, du meilleur au moins bon ! 🏆')
        : fail('Il faut afficher [99, 63, 42, 17, 8].'),
  },

  // ---------------- DICTIONNAIRES ----------------
  {
    id: 'dict-1',
    moduleId: 'dictionnaires',
    title: 'La fiche de personnage',
    emoji: '🪪',
    xp: 15,
    intro: 'Un dictionnaire associe des clés à des valeurs : `hero = {"nom": "Ada", "pv": 100}`. On lit une valeur avec `hero["nom"]`.',
    task:
      'Le dictionnaire `hero = {"nom": "Ada", "classe": "mage", "pv": 100}` existe. Affiche la valeur associée à la clé "classe".',
    starterCode: 'hero = {"nom": "Ada", "classe": "mage", "pv": 100}\n\n# Affiche hero["classe"]\n',
    hints: ['print(hero["classe"])'],
    check: (stdout) =>
      hasLine(stdout, 'mage')
        ? ok('Une mage redoutable rejoint ton équipe ! 🔮')
        : fail('Le programme doit afficher "mage".'),
  },
  {
    id: 'dict-2',
    moduleId: 'dictionnaires',
    title: 'Le grand recensement',
    emoji: '🧾',
    xp: 15,
    intro: '`.items()` permet de parcourir toutes les paires clé/valeur d\'un dictionnaire.',
    task:
      'Le dictionnaire `inventaire = {"potions": 3, "epees": 1, "boucliers": 2}` existe. Affiche chaque objet avec sa quantité, par exemple "potions : 3", un par ligne.',
    starterCode: 'inventaire = {"potions": 3, "epees": 1, "boucliers": 2}\n\n# for cle, valeur in inventaire.items(): ...\n',
    hints: [
      'for cle, valeur in inventaire.items():\n    print(f"{cle} : {valeur}")',
    ],
    check: (stdout) => {
      const ls = lines(stdout)
      const expected = ['potions : 3', 'epees : 1', 'boucliers : 2']
      return expected.every((e) => ls.includes(e))
        ? ok('Inventaire recensé sans en oublier un ! 📦')
        : fail('Affiche chaque paire sous la forme "cle : valeur".')
    },
  },
  {
    id: 'dict-3',
    moduleId: 'dictionnaires',
    title: 'Mise à jour du grimoire',
    emoji: '📖',
    xp: 20,
    intro: "On ajoute ou modifie une entrée avec `dico[\"cle\"] = valeur`, que la clé existe déjà ou non.",
    task:
      'Le dictionnaire `stats = {"force": 10, "magie": 5}` existe. Augmente "force" de 5 (donc 15) et ajoute une nouvelle clé "agilite" valant 7. Affiche ensuite print(stats).',
    starterCode: 'stats = {"force": 10, "magie": 5}\n\n# Modifie force et ajoute agilite\n\nprint(stats)\n',
    hints: [
      'stats["force"] = stats["force"] + 5',
      'stats["agilite"] = 7',
    ],
    check: (stdout) =>
      hasSubstring(stdout, '15') && hasSubstring(stdout, 'agilite') && hasSubstring(stdout, '7')
        ? ok('Le grimoire est à jour, ton héros est plus fort ! ⚡')
        : fail('stats doit contenir force = 15 et une nouvelle clé agilite = 7.'),
  },

  {
    id: 'dict-4',
    moduleId: 'dictionnaires',
    title: 'La valeur par défaut',
    emoji: '🛡️',
    xp: 20,
    intro:
      'Accéder à une clé qui n\'existe pas avec dico["cle"] plante le programme. .get("cle", valeur_par_defaut) est plus prudent : elle renvoie la valeur par défaut si la clé est absente.',
    task:
      'Le dictionnaire `stock = {"pommes": 10, "bananes": 5}` existe (il n\'y a pas de "poires"). Affiche la quantité de "poires" avec stock.get(), en utilisant 0 comme valeur par défaut.',
    starterCode: 'stock = {"pommes": 10, "bananes": 5}\n\n# Affiche stock.get("poires", ...) ici\n',
    hints: ['print(stock.get("poires", 0))', 'Le résultat doit être 0, sans erreur.'],
    check: (stdout) =>
      hasLine(stdout, '0')
        ? ok('Aucune poire en stock, et aucun crash non plus ! 🛡️')
        : fail('stock.get("poires", 0) doit afficher 0.'),
  },

  // ---------------- FONCTIONS ----------------
  {
    id: 'func-1',
    moduleId: 'fonctions',
    title: 'Ton premier sort',
    emoji: '✨',
    xp: 15,
    intro: 'Une fonction est un sort réutilisable : `def nom(parametre): return resultat`.',
    task:
      'Écris une fonction `double(n)` qui retourne `n * 2`. Puis affiche `double(21)`.',
    starterCode: 'def double(n):\n    # complète ici\n    pass\n\nprint(double(21))\n',
    hints: [
      'Remplace `pass` par `return n * 2`.',
      'print(double(21)) doit afficher 42.',
    ],
    check: (stdout) =>
      hasLine(stdout, '42')
        ? ok('Un sort de duplication parfaitement lancé ! ✨')
        : fail('double(21) doit retourner 42.'),
  },
  {
    id: 'func-2',
    moduleId: 'fonctions',
    title: 'Le sort à plusieurs ingrédients',
    emoji: '🧪',
    xp: 15,
    intro: 'Une fonction peut avoir plusieurs paramètres, et même des valeurs par défaut : `def f(a, b=1):`.',
    task:
      'Écris une fonction `presenter(nom, titre="Aventurier")` qui retourne la chaîne `f"{titre} {nom}"`. Affiche `presenter("Léo")` puis `presenter("Zoé", "Capitaine")`.',
    starterCode:
      'def presenter(nom, titre="Aventurier"):\n    # complète ici\n    pass\n\nprint(presenter("Léo"))\nprint(presenter("Zoé", "Capitaine"))\n',
    hints: [
      'return f"{titre} {nom}"',
      'Résultats attendus : "Aventurier Léo" puis "Capitaine Zoé".',
    ],
    check: (stdout) => {
      const ls = lines(stdout)
      return ls.includes('Aventurier Léo') && ls.includes('Capitaine Zoé')
        ? ok('Deux présentations royales ! 👑')
        : fail('Il faut afficher "Aventurier Léo" puis "Capitaine Zoé".')
    },
  },
  {
    id: 'func-3',
    moduleId: 'fonctions',
    title: 'Le détecteur de nombres premiers',
    emoji: '🔍',
    xp: 25,
    intro: 'On peut combiner fonction, boucle et condition pour créer un vrai outil utile.',
    task:
      "Écris une fonction `est_pair(n)` qui retourne `True` si `n` est pair, `False` sinon (utilise le modulo). Affiche `est_pair(10)` puis `est_pair(7)`.",
    starterCode: 'def est_pair(n):\n    # complète ici\n    pass\n\nprint(est_pair(10))\nprint(est_pair(7))\n',
    hints: [
      'return n % 2 == 0',
      'est_pair(10) doit afficher True, est_pair(7) doit afficher False.',
    ],
    check: (stdout) => {
      const ls = lines(stdout)
      return ls.includes('True') && ls.includes('False')
        ? ok('Détecteur calibré : True puis False ! 🎯')
        : fail('est_pair(10) doit être True et est_pair(7) doit être False.')
    },
  },

  // ---------------- BOSS ----------------
  {
    id: 'boss-1',
    moduleId: 'boss',
    title: 'Le gardien du mot de passe',
    emoji: '🐉',
    xp: 40,
    intro:
      "Un dragon garde le trésor final. Pour passer, tu dois lui écrire une fonction de vérification de mot de passe digne d'un·e vrai·e programmeur·euse. C'est le moment de combiner tout ce que tu as appris : fonctions, conditions, boucles et texte !",
    task:
      "Écris une fonction `mot_de_passe_valide(mdp)` qui retourne True seulement si TOUTES ces conditions sont vraies : (1) len(mdp) >= 8, (2) il contient au moins un chiffre. Indice pour le chiffre : parcours les caractères avec `for c in mdp:` et vérifie `c.isdigit()`. Sinon, retourne False. Affiche ensuite le résultat pour \"dragon7fire\" et pour \"court1\".",
    starterCode:
      'def mot_de_passe_valide(mdp):\n    if len(mdp) < 8:\n        return False\n    a_un_chiffre = False\n    for c in mdp:\n        if c.isdigit():\n            a_un_chiffre = True\n    # complète : que retourner ici ?\n    pass\n\nprint(mot_de_passe_valide("dragon7fire"))\nprint(mot_de_passe_valide("court1"))\n',
    hints: [
      'À la fin de la fonction, remplace `pass` par `return a_un_chiffre`.',
      '"dragon7fire" (11 caractères, contient 7) doit donner True. "court1" (6 caractères) doit donner False.',
    ],
    check: (stdout) => {
      const ls = lines(stdout)
      return ls.includes('True') && ls.includes('False') && ls.indexOf('True') < ls.indexOf('False')
        ? ok('Le dragon s\'incline. Le trésor est à toi ! 🏆🐉')
        : fail('mot_de_passe_valide("dragon7fire") doit être True et mot_de_passe_valide("court1") doit être False.')
    },
  },

  // ---------------- CRÉE TON JEU ----------------
  {
    id: 'jeu-1',
    moduleId: 'jeu',
    title: 'Ton héros et son monstre',
    emoji: '🧙',
    xp: 15,
    intro:
      "Tu as vaincu le dragon : tu es prêt·e à créer un jeu à toi ! On va le construire petit bout par petit bout, sur plusieurs leçons — et tu pourras le tester à chaque étape en appuyant sur Lancer.",
    task:
      'Crée deux variables : `pv_heros = 30` et `pv_monstre = 20` (PV = points de vie). Affiche deux lignes avec des f-strings : "Héros : 30 PV" puis "Monstre : 20 PV".',
    starterCode: '# Crée pv_heros et pv_monstre, puis affiche leurs PV\n',
    hints: [
      'pv_heros = 30\npv_monstre = 20',
      'print(f"Héros : {pv_heros} PV")\nprint(f"Monstre : {pv_monstre} PV")',
    ],
    check: (stdout) => {
      const ls = lines(stdout)
      return ls.includes('Héros : 30 PV') && ls.includes('Monstre : 20 PV')
        ? ok('Ton monde de jeu prend vie ! 🌟')
        : fail('Affiche "Héros : 30 PV" puis "Monstre : 20 PV".')
    },
  },
  {
    id: 'jeu-2',
    moduleId: 'jeu',
    title: 'La fonction attaque',
    emoji: '⚔️',
    xp: 20,
    intro:
      'Une attaque enlève des PV. Écrivons une fonction réutilisable pour ça : le cœur de ton moteur de jeu.',
    task:
      'Écris une fonction `attaquer(pv, degats)` qui retourne `pv - degats`, sans jamais descendre sous 0 (utilise `max(0, pv - degats)`). Fais attaquer `pv_heros = 30` avec 7 dégâts, stocke le résultat dans `pv_heros`, puis affiche-le.',
    starterCode:
      'def attaquer(pv, degats):\n    # complète ici (utilise max(0, ...))\n    pass\n\npv_heros = 30\npv_heros = attaquer(pv_heros, 7)\nprint(pv_heros)\n',
    hints: ['return max(0, pv - degats)', 'Le résultat affiché doit être 23.'],
    check: (stdout) =>
      hasLine(stdout, '23')
        ? ok('Premier coup porté, ton moteur de combat fonctionne ! ⚔️')
        : fail('attaquer(30, 7) doit retourner 23.'),
  },
  {
    id: 'jeu-3',
    moduleId: 'jeu',
    title: 'Qui a gagné ?',
    emoji: '🏳️',
    xp: 15,
    intro: 'Un combat se termine quand un des deux PV atteint 0. Utilisons des conditions pour le détecter.',
    task:
      'Les variables `pv_heros = 0` et `pv_monstre = 12` existent. Affiche "Le monstre gagne !" si pv_heros est à 0 ou moins, "Le héros gagne !" si pv_monstre est à 0 ou moins, sinon "Le combat continue...".',
    starterCode: 'pv_heros = 0\npv_monstre = 12\n\n# if / elif / else\n',
    hints: [
      'if pv_heros <= 0:\n    print("Le monstre gagne !")\nelif pv_monstre <= 0:\n    print("Le héros gagne !")\nelse:\n    print("Le combat continue...")',
    ],
    check: (stdout) =>
      hasLine(stdout, 'Le monstre gagne !')
        ? ok('Verdict rendu : le monstre triomphe (pour cette fois) ! 🏳️')
        : fail('Avec pv_heros = 0, le programme doit afficher "Le monstre gagne !".'),
  },
  {
    id: 'jeu-4',
    moduleId: 'jeu',
    title: 'Plusieurs assauts',
    emoji: '🔁',
    xp: 20,
    intro:
      'Un vrai combat a plusieurs tours. La liste `assauts` contient les dégâts infligés au monstre à chaque tour : parcours-la avec une boucle.',
    task:
      'Les variables `pv_monstre = 20`, `assauts = [5, 8, 4, 6]` et la fonction `attaquer` existent déjà. Pour chaque valeur de `assauts`, applique-la à pv_monstre avec attaquer(), et affiche les PV restants après chaque coup.',
    starterCode:
      'def attaquer(pv, degats):\n    return max(0, pv - degats)\n\npv_monstre = 20\nassauts = [5, 8, 4, 6]\n\n# for degats in assauts: ...\n',
    hints: [
      'for degats in assauts:\n    pv_monstre = attaquer(pv_monstre, degats)\n    print(pv_monstre)',
      'Tu dois voir 4 lignes : 15, 7, 3, puis 0.',
    ],
    check: (stdout) => {
      const ls = lines(stdout)
      const expected = ['15', '7', '3', '0']
      const matches = ls.length === expected.length && expected.every((v, i) => ls[i] === v)
      return matches
        ? ok('Quatre assauts, quatre PV en moins, ton combat prend forme ! 🎯')
        : fail('Il faut afficher 15, 7, 3 puis 0 (un par ligne, dans cet ordre).')
    },
  },
  {
    id: 'jeu-5',
    moduleId: 'jeu',
    title: "Stop dès la victoire",
    emoji: '🛑',
    xp: 20,
    intro:
      "Pas la peine de continuer à frapper un monstre déjà vaincu ! Utilise break pour arrêter le combat dès que pv_monstre atteint 0.",
    task:
      'Avec `pv_monstre = 20` et `assauts = [5, 8, 4, 6, 9, 3]`, arrête la boucle avec break dès que pv_monstre atteint 0 (donc les coups après ne doivent jamais être appliqués), puis affiche "Monstre vaincu !" juste après la boucle.',
    starterCode:
      'def attaquer(pv, degats):\n    return max(0, pv - degats)\n\npv_monstre = 20\nassauts = [5, 8, 4, 6, 9, 3]\n\nfor degats in assauts:\n    pv_monstre = attaquer(pv_monstre, degats)\n    print(pv_monstre)\n    # arrête la boucle ici si pv_monstre atteint 0\n\nprint("Monstre vaincu !")\n',
    hints: [
      'if pv_monstre <= 0:\n        break',
      'Avec ces dégâts, le monstre tombe à 0 pile au 4e coup : tu dois voir 15, 7, 3, 0, puis "Monstre vaincu !" (rien d\'autre).',
    ],
    check: (stdout) => {
      const ls = lines(stdout)
      const expected = ['15', '7', '3', '0', 'Monstre vaincu !']
      const matches = ls.length === expected.length && expected.every((v, i) => ls[i] === v)
      return matches
        ? ok('Combat terminé net, pas un coup de trop ! 🛑')
        : fail('Il faut afficher 15, 7, 3, 0 puis "Monstre vaincu !", et rien après.')
    },
  },
  {
    id: 'jeu-6',
    moduleId: 'jeu',
    title: 'Ton jeu complet',
    emoji: '🏆',
    xp: 40,
    intro:
      "Tu as tous les morceaux : PV, attaque, conditions, boucle avec arrêt. Assemble-les dans une seule fonction combat() qui simule le combat en entier — ton propre jeu, prêt à jouer !",
    task:
      'Complète la fonction `combat(pv_heros, pv_monstre, assauts)` : elle doit arrêter la boucle (break) dès que pv_monstre atteint 0, puis retourner "Victoire !" si pv_monstre est à 0, sinon "Combat inachevé". Teste-la avec print(combat(30, 20, [5, 8, 4, 6, 9, 3])).',
    starterCode:
      'def attaquer(pv, degats):\n    return max(0, pv - degats)\n\ndef combat(pv_heros, pv_monstre, assauts):\n    for degats in assauts:\n        pv_monstre = attaquer(pv_monstre, degats)\n        print(pv_monstre)\n        # arrête la boucle si le monstre est vaincu\n\n    # renvoie "Victoire !" si pv_monstre est à 0, sinon "Combat inachevé"\n\nprint(combat(30, 20, [5, 8, 4, 6, 9, 3]))\n',
    hints: [
      'if pv_monstre <= 0:\n            break',
      'return "Victoire !" if pv_monstre <= 0 else "Combat inachevé"',
    ],
    check: (stdout) => {
      const ls = lines(stdout)
      const expected = ['15', '7', '3', '0', 'Victoire !']
      const matches = ls.length === expected.length && expected.every((v, i) => ls[i] === v)
      return matches
        ? ok('Ton jeu tourne, du début à la fin. Bravo, tu es développeur·euse de jeux ! 🏆🎮')
        : fail('Le combat doit afficher 15, 7, 3, 0 puis "Victoire !".')
    },
  },
]

export function lessonsForModule(moduleId: string): Lesson[] {
  return LESSONS.filter((l) => l.moduleId === moduleId)
}
