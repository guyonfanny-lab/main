import type { CheckResult, FarmCell, Project } from '../types'
import { allSegmentsColor, allSegmentsLength, angleBetween, pathCloses, segmentLength } from '../lib/turtleChecks'
import { allHarvested, tractorAt } from '../lib/farmChecks'

const lines = (s: string) =>
  s
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)

const hasLine = (stdout: string, target: string) => lines(stdout).some((l) => l === target)

const ok = (message: string): CheckResult => ({ ok: true, message })
const fail = (message: string): CheckResult => ({ ok: false, message })

// ============================================================
// PROJET 1 — Combat de donjon (Intermédiaire)
// ============================================================
const PERSONNAGES = ['Un chevalier', 'Une sorcière', 'Un robot']
const LIEUX = ['dans une forêt enchantée', 'sur la lune', "au fond de l'océan"]
const ACTIONS = ['combat un dragon', 'danse avec des fantômes', 'répare une fusée']

const combatProject: Project = {
  id: 'combat',
  title: 'Combat de donjon',
  emoji: '⚔️',
  description: 'Construis un jeu de combat texte, étape par étape.',
  difficulty: 'Intermédiaire',
  color: 'from-indigo-500 to-purple-600',
  steps: [
    {
      id: 'jeu-1',
      projectId: 'combat',
      title: 'Ton héros et son monstre',
      emoji: '🧙',
      xp: 15,
      intro:
        "On va construire un jeu de combat texte petit bout par petit bout — et tu pourras le tester à chaque étape en appuyant sur Lancer.",
      task:
        'Crée deux variables : `pv_heros = 30` et `pv_monstre = 20` (PV = points de vie). Affiche deux lignes avec des f-strings : "Héros : 30 PV" puis "Monstre : 20 PV".',
      starterCode: '# Ton code ici\n',
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
      projectId: 'combat',
      title: 'La fonction attaque',
      emoji: '⚔️',
      xp: 20,
      intro:
        'Une attaque enlève des PV. Écrivons une fonction réutilisable pour ça : le cœur de ton moteur de jeu.',
      task:
        'Écris une fonction `attaquer(pv, degats)` qui retourne `pv - degats`, sans jamais descendre sous 0 (utilise max()). Fais attaquer `pv_heros = 30` avec 7 dégâts, stocke le résultat dans `pv_heros`, puis affiche-le.',
      starterCode:
        'def attaquer(pv, degats):\n    # complète ici\n    pass\n\npv_heros = 30\npv_heros = attaquer(pv_heros, 7)\nprint(pv_heros)\n',
      hints: [
        "Le résultat ne doit jamais être négatif : max(0, ...) te donne le plus grand des deux.",
        'return max(0, pv - degats)',
      ],
      check: (stdout) =>
        hasLine(stdout, '23')
          ? ok('Premier coup porté, ton moteur de combat fonctionne ! ⚔️')
          : fail('attaquer(30, 7) doit retourner 23.'),
    },
    {
      id: 'jeu-3',
      projectId: 'combat',
      title: 'Qui a gagné ?',
      emoji: '🏳️',
      xp: 15,
      intro: 'Un combat se termine quand un des deux PV atteint 0. Utilisons des conditions pour le détecter.',
      task:
        'Les variables `pv_heros = 0` et `pv_monstre = 12` existent. Affiche "Le monstre gagne !" si pv_heros est à 0 ou moins, "Le héros gagne !" si pv_monstre est à 0 ou moins, sinon "Le combat continue...".',
      starterCode: 'pv_heros = 0\npv_monstre = 12\n\n# Ton code ici\n',
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
      projectId: 'combat',
      title: 'Plusieurs assauts',
      emoji: '🔁',
      xp: 20,
      intro:
        'Un vrai combat a plusieurs tours. La liste `assauts` contient les dégâts infligés au monstre à chaque tour : parcours-la avec une boucle.',
      task:
        'Les variables `pv_monstre = 20`, `assauts = [5, 8, 4, 6]` et la fonction `attaquer` existent déjà. Pour chaque valeur de `assauts`, applique-la à pv_monstre avec attaquer(), et affiche les PV restants après chaque coup.',
      starterCode:
        'def attaquer(pv, degats):\n    return max(0, pv - degats)\n\npv_monstre = 20\nassauts = [5, 8, 4, 6]\n\n# Ton code ici\n',
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
      projectId: 'combat',
      title: 'Stop dès la victoire',
      emoji: '🛑',
      xp: 20,
      intro:
        "Pas la peine de continuer à frapper un monstre déjà vaincu ! Utilise break pour arrêter le combat dès que pv_monstre atteint 0.",
      task:
        'Avec `pv_monstre = 20` et `assauts = [5, 8, 4, 6, 9, 3]`, arrête la boucle avec break dès que pv_monstre atteint 0 (les coups suivants ne doivent jamais être appliqués), puis affiche "Monstre vaincu !" juste après la boucle.',
      starterCode:
        'def attaquer(pv, degats):\n    return max(0, pv - degats)\n\npv_monstre = 20\nassauts = [5, 8, 4, 6, 9, 3]\n\n# Ton code ici\n',
      hints: [
        "Reprends ta boucle de l'étape précédente, et ajoute une condition à l'intérieur.",
        'if pv_monstre <= 0:\n    break',
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
      projectId: 'combat',
      title: 'Ton jeu complet',
      emoji: '🏆',
      xp: 40,
      intro:
        "Tu as tous les morceaux : PV, attaque, conditions, boucle avec arrêt. Assemble-les dans une seule fonction combat() qui simule le combat en entier — ton propre jeu, prêt à jouer !",
      task:
        'Écris la fonction `combat(pv_heros, pv_monstre, assauts)` : elle doit appliquer chaque attaque de `assauts` à pv_monstre en affichant les PV restants à chaque tour, arrêter la boucle (break) dès que pv_monstre atteint 0, puis retourner "Victoire !" si pv_monstre est à 0, sinon "Combat inachevé". Teste-la avec print(combat(30, 20, [5, 8, 4, 6, 9, 3])).',
      starterCode:
        'def attaquer(pv, degats):\n    return max(0, pv - degats)\n\ndef combat(pv_heros, pv_monstre, assauts):\n    # complète ici\n    pass\n\nprint(combat(30, 20, [5, 8, 4, 6, 9, 3]))\n',
      hints: [
        'Reprends la boucle avec break de la leçon précédente, à l\'intérieur de la fonction.',
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
  ],
}

// ============================================================
// PROJET 2 — Devine le nombre (Débutant)
// ============================================================
const devineProject: Project = {
  id: 'devine',
  title: 'Devine le nombre',
  emoji: '🔢',
  description: "Un jeu où l'ordinateur te dit si tu es trop haut ou trop bas.",
  difficulty: 'Débutant',
  color: 'from-sky-400 to-blue-500',
  steps: [
    {
      id: 'devine-1',
      projectId: 'devine',
      title: 'Le nombre secret',
      emoji: '🤫',
      xp: 10,
      intro:
        "On va construire un jeu où l'ordinateur choisit un nombre secret et te dit si ta proposition est trop haute ou trop basse.",
      task: 'Crée deux variables : `nombre_secret = 42` et `proposition = 30`. Affiche "Proposition : 30" avec un f-string.',
      starterCode: '# Ton code ici\n',
      hints: ['nombre_secret = 42\nproposition = 30', 'print(f"Proposition : {proposition}")'],
      check: (stdout) =>
        hasLine(stdout, 'Proposition : 30')
          ? ok('Le jeu est amorcé ! 🎲')
          : fail('Affiche "Proposition : 30".'),
    },
    {
      id: 'devine-2',
      projectId: 'devine',
      title: 'Trop haut, trop bas',
      emoji: '🌡️',
      xp: 15,
      intro: 'Comparons la proposition au nombre secret avec des conditions.',
      task:
        'Avec `nombre_secret = 42` et `proposition = 30`, affiche "Trop bas !" si proposition < nombre_secret, "Trop haut !" si proposition > nombre_secret, sinon "Trouvé !".',
      starterCode: 'nombre_secret = 42\nproposition = 30\n\n# Ton code ici\n',
      hints: [
        'if proposition < nombre_secret:\n    print("Trop bas !")\nelif proposition > nombre_secret:\n    print("Trop haut !")\nelse:\n    print("Trouvé !")',
      ],
      check: (stdout) =>
        hasLine(stdout, 'Trop bas !')
          ? ok('Bien vu, 30 est trop bas pour 42 ! 🌡️')
          : fail('Avec proposition = 30 et nombre_secret = 42, le programme doit afficher "Trop bas !".'),
    },
    {
      id: 'devine-3',
      projectId: 'devine',
      title: 'Plusieurs essais',
      emoji: '🔁',
      xp: 20,
      intro: "Un vrai joueur essaie plusieurs fois. La liste `essais` contient les propositions faites, dans l'ordre.",
      task:
        'Avec `nombre_secret = 42` et `essais = [10, 60, 35, 42, 50]`, parcours essais avec une boucle et affiche pour chacun "Trop bas !", "Trop haut !" ou "Trouvé !".',
      starterCode: 'nombre_secret = 42\nessais = [10, 60, 35, 42, 50]\n\n# Ton code ici\n',
      hints: [
        'for proposition in essais:\n    if proposition < nombre_secret:\n        print("Trop bas !")\n    elif proposition > nombre_secret:\n        print("Trop haut !")\n    else:\n        print("Trouvé !")',
      ],
      check: (stdout) => {
        const ls = lines(stdout)
        const expected = ['Trop bas !', 'Trop haut !', 'Trop bas !', 'Trouvé !', 'Trop haut !']
        const matches = ls.length === expected.length && expected.every((v, i) => ls[i] === v)
        return matches
          ? ok('Cinq essais, cinq verdicts corrects ! 🔁')
          : fail('Avec ces essais, il faut afficher : Trop bas !, Trop haut !, Trop bas !, Trouvé !, Trop haut !')
      },
    },
    {
      id: 'devine-4',
      projectId: 'devine',
      title: 'Arrête-toi en cas de victoire',
      emoji: '🏆',
      xp: 25,
      intro: "Inutile de continuer après avoir trouvé ! Compte les essais utilisés et arrête-toi dès que c'est trouvé.",
      task:
        'Complète la fonction `deviner(nombre_secret, essais)` : elle parcourt essais, affiche pour chacun le résultat (Trop bas !/Trop haut !/Trouvé !), compte les essais utilisés, s\'arrête (break) dès que trouvé, puis retourne ce nombre d\'essais. Teste avec print(deviner(42, [10, 60, 35, 42, 50])).',
      starterCode:
        'def deviner(nombre_secret, essais):\n    # complète ici\n    pass\n\nprint(deviner(42, [10, 60, 35, 42, 50]))\n',
      hints: [
        "Utilise une variable compteur = 0, et ajoute 1 à chaque essai (compteur += 1).",
        'Reprends la boucle if/elif/else de la leçon précédente, avec un break dans le cas "Trouvé !".',
      ],
      check: (stdout) => {
        const ls = lines(stdout)
        const expected = ['Trop bas !', 'Trop haut !', 'Trop bas !', 'Trouvé !', '4']
        const matches = ls.length === expected.length && expected.every((v, i) => ls[i] === v)
        return matches
          ? ok('Trouvé en 4 essais, et ton jeu le sait tout seul ! 🏆')
          : fail('Il faut afficher Trop bas !, Trop haut !, Trop bas !, Trouvé ! puis 4.')
      },
    },
  ],
}

// ============================================================
// PROJET 3 — Histoires aléatoires (Avancé)
// ============================================================
const contientUnDe = (text: string, options: string[]) => options.some((o) => text.includes(o))

const histoireProject: Project = {
  id: 'histoire',
  title: 'Histoires aléatoires',
  emoji: '📖',
  description: 'Une machine à générer des histoires absurdes, avec le module random.',
  difficulty: 'Avancé',
  color: 'from-fuchsia-500 to-pink-600',
  steps: [
    {
      id: 'histoire-1',
      projectId: 'histoire',
      title: 'Le hasard',
      emoji: '🎲',
      xp: 15,
      intro:
        "Le module random permet de choisir au hasard. `import random` puis `random.choice(liste)` renvoie un élément pris au hasard dans la liste. Comme c'est aléatoire, la vérification checke juste que ton choix fait bien partie de la liste (pas un résultat exact).",
      task:
        'Importe random. La liste `animaux = ["dragon", "licorne", "zombie", "robot"]` existe. Choisis-en un au hasard avec random.choice() et affiche-le.',
      starterCode: 'animaux = ["dragon", "licorne", "zombie", "robot"]\n\n# Ton code ici\n',
      hints: ['import random', 'print(random.choice(animaux))'],
      check: (stdout) => {
        const ls = lines(stdout)
        const animaux = ['dragon', 'licorne', 'zombie', 'robot']
        return ls.length === 1 && animaux.includes(ls[0])
          ? ok('Le hasard a parlé ! 🎲')
          : fail('Affiche un seul animal, choisi au hasard dans la liste animaux.')
      },
    },
    {
      id: 'histoire-2',
      projectId: 'histoire',
      title: 'Assemble une phrase',
      emoji: '🧩',
      xp: 20,
      intro: 'Avec plusieurs random.choice(), on peut combiner des mots au hasard dans une phrase avec un f-string.',
      task:
        'Les listes `personnages` et `lieux` existent. Choisis un élément au hasard dans chacune, puis affiche-les assemblés dans une seule phrase avec un f-string, par exemple : "Un robot dans une forêt enchantée".',
      starterCode: `import random\n\npersonnages = ${JSON.stringify(PERSONNAGES)}\nlieux = ${JSON.stringify(LIEUX)}\n\n# Ton code ici\n`,
      hints: ['print(f"{random.choice(personnages)} {random.choice(lieux)}")'],
      check: (stdout) => {
        const ls = lines(stdout)
        return ls.length === 1 && contientUnDe(ls[0], PERSONNAGES) && contientUnDe(ls[0], LIEUX)
          ? ok('Une phrase absurde et unique à chaque fois ! 🧩')
          : fail('La ligne doit contenir un personnage suivi d\'un lieu, chacun choisi dans sa liste.')
      },
    },
    {
      id: 'histoire-3',
      projectId: 'histoire',
      title: 'La fonction générateur',
      emoji: '🛠️',
      xp: 20,
      intro: 'Transformons ça en fonction réutilisable, pour générer une nouvelle histoire à chaque appel.',
      task:
        'Complète la fonction `generer_histoire(personnages, lieux)` : elle doit retourner une phrase assemblée aléatoirement (comme à l\'étape précédente). Affiche ensuite generer_histoire(personnages, lieux).',
      starterCode: `import random\n\npersonnages = ${JSON.stringify(PERSONNAGES)}\nlieux = ${JSON.stringify(LIEUX)}\n\ndef generer_histoire(personnages, lieux):\n    # complète ici\n    pass\n\nprint(generer_histoire(personnages, lieux))\n`,
      hints: ['return f"{random.choice(personnages)} {random.choice(lieux)}"'],
      check: (stdout) => {
        const ls = lines(stdout)
        return ls.length === 1 && contientUnDe(ls[0], PERSONNAGES) && contientUnDe(ls[0], LIEUX)
          ? ok('Ta fonction génère des histoires à la demande ! 🛠️')
          : fail('La fonction doit retourner un personnage suivi d\'un lieu.')
      },
    },
    {
      id: 'histoire-4',
      projectId: 'histoire',
      title: "Encore plus d'ingrédients",
      emoji: '📖',
      xp: 20,
      intro: 'Ajoutons une troisième liste pour une histoire plus riche : une action !',
      task:
        'La liste `actions` existe en plus de personnages et lieux. Modifie generer_histoire pour qu\'elle prenne aussi actions en paramètre et l\'intègre dans la phrase, par exemple "Un robot dans une forêt enchantée combat un dragon".',
      starterCode: `import random\n\npersonnages = ${JSON.stringify(PERSONNAGES)}\nlieux = ${JSON.stringify(LIEUX)}\nactions = ${JSON.stringify(ACTIONS)}\n\ndef generer_histoire(personnages, lieux, actions):\n    # complète ici\n    pass\n\nprint(generer_histoire(personnages, lieux, actions))\n`,
      hints: ['return f"{random.choice(personnages)} {random.choice(lieux)} {random.choice(actions)}"'],
      check: (stdout) => {
        const ls = lines(stdout)
        return ls.length === 1 &&
          contientUnDe(ls[0], PERSONNAGES) &&
          contientUnDe(ls[0], LIEUX) &&
          contientUnDe(ls[0], ACTIONS)
          ? ok('Une histoire complète, personnage + lieu + action ! 📖')
          : fail('La phrase doit contenir un personnage, un lieu et une action.')
      },
    },
    {
      id: 'histoire-5',
      projectId: 'histoire',
      title: 'Ta machine à histoires',
      emoji: '🎉',
      xp: 35,
      intro: 'Dernière étape : génère plusieurs histoires d\'un coup, pour ne jamais s\'ennuyer !',
      task:
        'Complète la fonction `generer_plusieurs(n, personnages, lieux, actions)` : elle doit afficher n histoires différentes (une par ligne) en appelant generer_histoire n fois dans une boucle, puis retourner le nombre d\'histoires générées. Teste avec print(generer_plusieurs(3, personnages, lieux, actions)).',
      starterCode: `import random\n\npersonnages = ${JSON.stringify(PERSONNAGES)}\nlieux = ${JSON.stringify(LIEUX)}\nactions = ${JSON.stringify(ACTIONS)}\n\ndef generer_histoire(personnages, lieux, actions):\n    return f"{random.choice(personnages)} {random.choice(lieux)} {random.choice(actions)}"\n\ndef generer_plusieurs(n, personnages, lieux, actions):\n    # complète ici\n    pass\n\nprint(generer_plusieurs(3, personnages, lieux, actions))\n`,
      hints: [
        'Utilise for _ in range(n): pour répéter n fois.',
        'À chaque tour, affiche generer_histoire(...), et compte au fur et à mesure pour le retour final.',
      ],
      check: (stdout) => {
        const ls = lines(stdout)
        if (ls.length !== 4) return fail('Il faut 3 histoires (une par ligne) puis le nombre 3.')
        const stories = ls.slice(0, 3)
        const allValid = stories.every(
          (s) => contientUnDe(s, PERSONNAGES) && contientUnDe(s, LIEUX) && contientUnDe(s, ACTIONS),
        )
        return allValid && ls[3] === '3'
          ? ok('Ta machine à histoires est prête, elle ne s\'arrêtera jamais de créer ! 🎉📖')
          : fail('Il faut 3 histoires complètes (une par ligne) puis le nombre 3.')
      },
    },
  ],
}

// ============================================================
// PROJET 4 — Traducteur emoji (Débutant)
// ============================================================
const EMOJI_DICT_CODE = '{"chat": "🐱", "chien": "🐶", "pizza": "🍕", "fusée": "🚀"}'

const emojiProject: Project = {
  id: 'emoji',
  title: 'Traducteur emoji',
  emoji: '🐱',
  description: 'Transforme des mots en emojis avec un dictionnaire.',
  difficulty: 'Débutant',
  color: 'from-amber-400 to-orange-500',
  steps: [
    {
      id: 'emoji-1',
      projectId: 'emoji',
      title: 'Le dictionnaire magique',
      emoji: '📖',
      xp: 10,
      intro: 'Un dictionnaire peut associer un mot à un emoji, comme mots_emoji["chat"] qui renvoie "🐱".',
      task: `Le dictionnaire \`mots_emoji = ${EMOJI_DICT_CODE}\` existe. Affiche l'emoji correspondant à "pizza".`,
      starterCode: `mots_emoji = ${EMOJI_DICT_CODE}\n\n# Ton code ici\n`,
      hints: ['print(mots_emoji["pizza"])'],
      check: (stdout) =>
        hasLine(stdout, '🍕') ? ok('Traduction réussie ! 🍕') : fail('Affiche mots_emoji["pizza"].'),
    },
    {
      id: 'emoji-2',
      projectId: 'emoji',
      title: 'Mot inconnu',
      emoji: '❓',
      xp: 15,
      intro: "Si un mot n'est pas dans le dictionnaire, .get() évite le plantage en renvoyant une valeur par défaut.",
      task: `Avec le même dictionnaire mots_emoji, affiche l'emoji pour "licorne" (absent du dictionnaire) en utilisant .get() avec "❓" comme valeur par défaut.`,
      starterCode: `mots_emoji = ${EMOJI_DICT_CODE}\n\n# Ton code ici\n`,
      hints: ['print(mots_emoji.get("licorne", "❓"))'],
      check: (stdout) =>
        hasLine(stdout, '❓') ? ok('Aucun crash, juste un point d\'interrogation ! ❓') : fail('Affiche mots_emoji.get("licorne", "❓").'),
    },
    {
      id: 'emoji-3',
      projectId: 'emoji',
      title: 'Traduis une phrase',
      emoji: '🧩',
      xp: 20,
      intro: 'On peut découper une phrase en mots avec .split(), puis traduire chaque mot un par un.',
      task:
        'La variable `phrase = "chat pizza fusée"` existe. Découpe-la en mots, traduis chaque mot avec mots_emoji (utilise .get() avec "❓" par défaut), et affiche chaque emoji sur sa propre ligne.',
      starterCode: `mots_emoji = ${EMOJI_DICT_CODE}\nphrase = "chat pizza fusée"\n\n# Ton code ici\n`,
      hints: ['mots = phrase.split()', 'for mot in mots:\n    print(mots_emoji.get(mot, "❓"))'],
      check: (stdout) => {
        const ls = lines(stdout)
        const expected = ['🐱', '🍕', '🚀']
        const matches = ls.length === expected.length && expected.every((v, i) => ls[i] === v)
        return matches ? ok('Trois mots, trois emojis ! 🧩') : fail('Il faut afficher 🐱, 🍕 puis 🚀, un par ligne.')
      },
    },
    {
      id: 'emoji-4',
      projectId: 'emoji',
      title: 'La fonction traductrice',
      emoji: '🛠️',
      xp: 25,
      intro: "Transforme tout ça en fonction réutilisable qui traduit n'importe quelle phrase, emojis collés ensemble.",
      task:
        'Complète `traduire(phrase, dico)` : elle découpe phrase en mots, traduit chacun (avec .get() et "❓" par défaut), et retourne le tout collé en une seule chaîne (sans espace). Teste avec print(traduire("chien chat fusée", mots_emoji)).',
      starterCode: `mots_emoji = ${EMOJI_DICT_CODE}\n\ndef traduire(phrase, dico):\n    # complète ici\n    pass\n\nprint(traduire("chien chat fusée", mots_emoji))\n`,
      hints: [
        'Utilise une variable resultat = "" puis ajoute chaque traduction dedans au fil de la boucle.',
        'resultat = resultat + dico.get(mot, "❓")',
      ],
      check: (stdout) =>
        hasLine(stdout, '🐶🐱🚀')
          ? ok('Ta machine à traduire fonctionne à la perfection ! 🛠️🐱')
          : fail('traduire("chien chat fusée", mots_emoji) doit afficher 🐶🐱🚀.'),
    },
  ],
}

// ============================================================
// PROJET 5 — Message secret : chiffrement de César (Intermédiaire)
// ============================================================
const cesarProject: Project = {
  id: 'cesar',
  title: 'Message secret',
  emoji: '🔐',
  description: "Invente ton propre code secret avec le chiffrement de César.",
  difficulty: 'Intermédiaire',
  color: 'from-slate-500 to-zinc-700',
  steps: [
    {
      id: 'cesar-1',
      projectId: 'cesar',
      title: 'Nombres secrets',
      emoji: '🔡',
      xp: 15,
      intro: 'Chaque lettre a un code numérique caché : ord("a") vaut 97, et chr(97) redonne "a". C\'est la base du chiffrement.',
      task: 'Affiche ord("a") puis chr(98).',
      starterCode: '# Ton code ici\n',
      hints: ['print(ord("a"))', 'print(chr(98))'],
      check: (stdout) => {
        const ls = lines(stdout)
        return ls.includes('97') && ls.includes('b')
          ? ok('97 et "b" : les codes secrets se dévoilent ! 🔡')
          : fail('Il faut afficher 97 (ord("a")) puis b (chr(98)).')
      },
    },
    {
      id: 'cesar-2',
      projectId: 'cesar',
      title: 'Décaler une lettre',
      emoji: '➡️',
      xp: 15,
      intro: 'Pour chiffrer une lettre, on décale son code numérique : chr(ord(lettre) + decalage).',
      task: 'Les variables `lettre = "a"` et `decalage = 3` existent. Calcule et affiche la lettre décalée.',
      starterCode: 'lettre = "a"\ndecalage = 3\n\n# Ton code ici\n',
      hints: ['print(chr(ord(lettre) + decalage))'],
      check: (stdout) => (hasLine(stdout, 'd') ? ok('"a" décalé de 3 devient "d" ! ➡️') : fail('Affiche chr(ord(lettre) + decalage), qui doit valoir "d".')),
    },
    {
      id: 'cesar-3',
      projectId: 'cesar',
      title: 'Chiffrer un mot',
      emoji: '🔐',
      xp: 20,
      intro: 'Pour chiffrer un mot entier, décale chaque lettre une par une et recolle le résultat.',
      task: 'Les variables `mot = "chat"` et `decalage = 1` existent. Chiffre le mot lettre par lettre et affiche le résultat.',
      starterCode: 'mot = "chat"\ndecalage = 1\n\n# Ton code ici\n',
      hints: [
        'resultat = ""',
        'for c in mot:\n    resultat = resultat + chr(ord(c) + decalage)\nprint(resultat)',
      ],
      check: (stdout) => (hasLine(stdout, 'dibu') ? ok('"chat" devient "dibu" ! 🔐') : fail('Le mot chiffré doit être "dibu".')),
    },
    {
      id: 'cesar-4',
      projectId: 'cesar',
      title: 'Gère les espaces',
      emoji: '🕳️',
      xp: 20,
      intro: "Un message a des espaces — il ne faut pas les décaler, sinon ils deviennent des caractères bizarres ! Garde-les tels quels.",
      task:
        'Les variables `message = "un chat"` et `decalage = 2` existent. Chiffre chaque caractère, SAUF les espaces qui doivent rester des espaces. Affiche le résultat.',
      starterCode: 'message = "un chat"\ndecalage = 2\n\n# Ton code ici\n',
      hints: [
        'for c in message:\n    if c == " ":\n        ...\n    else:\n        ...',
        'Le résultat attendu est "wp ejcv".',
      ],
      check: (stdout) => (hasLine(stdout, 'wp ejcv') ? ok('Les espaces survivent au chiffrement ! 🕳️') : fail('Le résultat doit être "wp ejcv".')),
    },
    {
      id: 'cesar-5',
      projectId: 'cesar',
      title: 'Ta machine à messages secrets',
      emoji: '🔓',
      xp: 35,
      intro: 'Transforme tout en fonction réutilisable, capable de chiffrer ET déchiffrer (le déchiffrement, c\'est juste décaler dans l\'autre sens, avec un décalage négatif !).',
      task:
        'Complète `chiffrer(message, decalage)` : chiffre chaque lettre (espaces inchangés) et retourne le résultat. Teste avec print(chiffrer("un chat", 2)), puis déchiffre en appelant print(chiffrer("wp ejcv", -2)).',
      starterCode:
        'def chiffrer(message, decalage):\n    # complète ici\n    pass\n\nprint(chiffrer("un chat", 2))\nprint(chiffrer("wp ejcv", -2))\n',
      hints: [
        'Reprends ta logique de la leçon précédente (espaces inchangés, sinon chr(ord(c) + decalage)), à l\'intérieur de la fonction.',
        'Un décalage négatif fait automatiquement le chemin inverse.',
      ],
      check: (stdout) => {
        const ls = lines(stdout)
        return ls.length === 2 && ls[0] === 'wp ejcv' && ls[1] === 'un chat'
          ? ok('Chiffré, puis déchiffré : ta machine à messages secrets fonctionne ! 🔓')
          : fail('La première ligne doit être "wp ejcv", la seconde "un chat".')
      },
    },
  ],
}

// ============================================================
// PROJET 6 — Quiz de personnalité (Avancé)
// ============================================================
const quizProject: Project = {
  id: 'quiz',
  title: 'Quiz de personnalité',
  emoji: '🧭',
  description: 'Un quiz "Quel type de héros es-tu ?" qui calcule ton profil.',
  difficulty: 'Avancé',
  color: 'from-teal-500 to-cyan-600',
  steps: [
    {
      id: 'quiz-1',
      projectId: 'quiz',
      title: 'Le tableau des scores',
      emoji: '📊',
      xp: 15,
      intro: 'Un quiz de personnalité garde un score pour chaque profil possible. On démarre avec un dictionnaire à zéro partout.',
      task: 'Crée `scores = {"Guerrier": 0, "Mage": 0, "Voleur": 0}`, puis affiche-le avec print(scores).',
      starterCode: '# Ton code ici\n',
      hints: ['scores = {"Guerrier": 0, "Mage": 0, "Voleur": 0}\nprint(scores)'],
      check: (stdout) =>
        hasLine(stdout, "{'Guerrier': 0, 'Mage': 0, 'Voleur': 0}")
          ? ok('Le tableau de scores est prêt ! 📊')
          : fail("Affiche le dictionnaire {'Guerrier': 0, 'Mage': 0, 'Voleur': 0}."),
    },
    {
      id: 'quiz-2',
      projectId: 'quiz',
      title: 'Ajouter un point',
      emoji: '➕',
      xp: 15,
      intro: 'Répondre à une question ajoute un point au profil correspondant : scores["Mage"] += 1.',
      task: 'Avec `scores = {"Guerrier": 0, "Mage": 0, "Voleur": 0}`, ajoute 1 point à "Mage", puis affiche scores["Mage"].',
      starterCode: 'scores = {"Guerrier": 0, "Mage": 0, "Voleur": 0}\n\n# Ton code ici\n',
      hints: ['scores["Mage"] += 1\nprint(scores["Mage"])'],
      check: (stdout) => (hasLine(stdout, '1') ? ok('Premier point pour les Mages ! ➕') : fail('scores["Mage"] doit valoir 1.')),
    },
    {
      id: 'quiz-3',
      projectId: 'quiz',
      title: 'Plusieurs réponses',
      emoji: '🔁',
      xp: 20,
      intro: 'Un vrai quiz pose plusieurs questions. La liste `reponses` contient le profil choisi à chaque question.',
      task:
        'Avec `scores = {"Guerrier": 0, "Mage": 0, "Voleur": 0}` et `reponses = ["Mage", "Guerrier", "Mage", "Mage", "Voleur"]`, parcours reponses et ajoute 1 point au bon profil à chaque tour, puis affiche scores.',
      starterCode:
        'scores = {"Guerrier": 0, "Mage": 0, "Voleur": 0}\nreponses = ["Mage", "Guerrier", "Mage", "Mage", "Voleur"]\n\n# Ton code ici\n\nprint(scores)\n',
      hints: ['for profil in reponses:\n    scores[profil] += 1'],
      check: (stdout) =>
        hasLine(stdout, "{'Guerrier': 1, 'Mage': 3, 'Voleur': 1}")
          ? ok('Cinq réponses comptabilisées, Mage prend la tête ! 🔁')
          : fail("Le score final doit être {'Guerrier': 1, 'Mage': 3, 'Voleur': 1}."),
    },
    {
      id: 'quiz-4',
      projectId: 'quiz',
      title: 'Qui a gagné ?',
      emoji: '🏅',
      xp: 20,
      intro: 'Pour trouver le profil gagnant, on cherche la clé avec la plus grande valeur : max(dico, key=dico.get).',
      task: 'Avec `scores = {"Guerrier": 1, "Mage": 3, "Voleur": 1}`, trouve et affiche le profil qui a le score le plus élevé.',
      starterCode: 'scores = {"Guerrier": 1, "Mage": 3, "Voleur": 1}\n\n# Ton code ici\n',
      hints: ['print(max(scores, key=scores.get))'],
      check: (stdout) => (hasLine(stdout, 'Mage') ? ok('Et le gagnant est... Mage ! 🏅') : fail('Le profil gagnant doit être "Mage".')),
    },
    {
      id: 'quiz-5',
      projectId: 'quiz',
      title: 'Ton quiz complet',
      emoji: '🎉',
      xp: 35,
      intro: 'Assemble tout : questions, score, gagnant — un vrai quiz de personnalité prêt à jouer !',
      task:
        'Complète `resultat_quiz(reponses)` : elle crée un dictionnaire scores à zéro pour "Guerrier", "Mage" et "Voleur", ajoute 1 point au bon profil pour chaque réponse de la liste reponses, puis retourne le profil gagnant. Teste avec print(resultat_quiz(["Mage", "Guerrier", "Mage", "Mage", "Voleur"])).',
      starterCode:
        'def resultat_quiz(reponses):\n    # complète ici\n    pass\n\nprint(resultat_quiz(["Mage", "Guerrier", "Mage", "Mage", "Voleur"]))\n',
      hints: [
        'Recrée le dictionnaire scores à zéro à l\'intérieur de la fonction, puis reprends ta boucle de la leçon précédente.',
        'Termine par return max(scores, key=scores.get).',
      ],
      check: (stdout) =>
        hasLine(stdout, 'Mage')
          ? ok('Ton quiz de personnalité est complet et fonctionnel ! 🎉🧭')
          : fail('resultat_quiz([...]) doit retourner "Mage".'),
    },
  ],
}

// ============================================================
// PROJET 7 — Tortue magique (Intermédiaire) — dessin visuel
// ============================================================
const tortueProject: Project = {
  id: 'tortue',
  title: 'Tortue magique',
  emoji: '🐢',
  description: 'Dessine des formes et des motifs avec du code, comme un pinceau magique.',
  difficulty: 'Intermédiaire',
  color: 'from-lime-400 to-emerald-500',
  steps: [
    {
      id: 'tortue-1',
      projectId: 'tortue',
      visual: true,
      title: 'Réveille la tortue',
      emoji: '🐢',
      xp: 10,
      intro:
        "Une tortue invisible se tient au centre de l'écran, prête à dessiner. avancer(distance) la fait avancer en traçant une ligne derrière elle. Regarde le dessin apparaître au-dessus de la console après avoir lancé ton code !",
      task: 'Fais avancer la tortue de 80 pixels avec avancer(80).',
      starterCode: '# Ton code ici\n',
      hints: ['avancer(80)'],
      check: (_stdout, _get, commands) => {
        const ok1 = commands.length === 1 && Math.abs(segmentLength(commands[0]) - 80) <= 4
        return ok1
          ? { ok: true, message: 'La tortue avance, ton premier trait est tracé ! 🐢' }
          : { ok: false, message: 'Utilise avancer(80) — un seul trait de 80 pixels.' }
      },
    },
    {
      id: 'tortue-2',
      projectId: 'tortue',
      visual: true,
      title: 'Tourner',
      emoji: '↩️',
      xp: 15,
      intro: 'tourner_droite(angle) fait pivoter la tortue de "angle" degrés vers la droite, sans dessiner.',
      task: 'Avance de 60, tourne à droite de 90 degrés, puis avance encore de 60. Tu dois voir un angle droit se dessiner.',
      starterCode: '# Ton code ici\n',
      hints: ['avancer(60)\ntourner_droite(90)\navancer(60)'],
      check: (_stdout, _get, commands) => {
        const lengthsOk = allSegmentsLength(commands, 60)
        const rightAngle = commands.length === 2 && Math.abs(angleBetween(commands[0], commands[1]) - 90) <= 5
        return commands.length === 2 && lengthsOk && rightAngle
          ? { ok: true, message: 'Un bel angle droit ! ↩️' }
          : { ok: false, message: 'Il faut deux traits de 60 pixels formant un angle droit (90°).' }
      },
    },
    {
      id: 'tortue-3',
      projectId: 'tortue',
      visual: true,
      title: 'Dessine un carré',
      emoji: '⬛',
      xp: 20,
      intro: 'En répétant 4 fois "avancer + tourner de 90°" avec une boucle, on ferme complètement un carré !',
      task: 'Utilise une boucle for pour dessiner un carré de côté 70 (répète 4 fois : avancer(70) puis tourner_droite(90)).',
      starterCode: '# Ton code ici\n',
      hints: ['for _ in range(4):\n    avancer(70)\n    tourner_droite(90)'],
      check: (_stdout, _get, commands) => {
        const ok = commands.length === 4 && allSegmentsLength(commands, 70) && pathCloses(commands)
        return ok
          ? { ok: true, message: 'Un carré parfaitement fermé ! ⬛' }
          : { ok: false, message: 'Il faut 4 côtés de 70 pixels qui referment la forme (un carré complet).' }
      },
    },
    {
      id: 'tortue-4',
      projectId: 'tortue',
      visual: true,
      title: 'Ajoute de la couleur',
      emoji: '🎨',
      xp: 20,
      intro: 'couleur("violet") change la couleur du trait. Essaie une autre couleur pour ton carré magique !',
      task: 'Dessine un carré de côté 70 (comme avant) mais en couleur "violet" (utilise couleur("violet") avant de dessiner).',
      starterCode: '# Ton code ici\n',
      hints: ['couleur("violet")\nfor _ in range(4):\n    avancer(70)\n    tourner_droite(90)'],
      check: (_stdout, _get, commands) => {
        const ok =
          commands.length === 4 &&
          allSegmentsLength(commands, 70) &&
          pathCloses(commands) &&
          allSegmentsColor(commands, '#a855f7')
        return ok
          ? { ok: true, message: 'Un carré violet du plus bel effet ! 🎨' }
          : { ok: false, message: 'Il faut un carré (4 côtés de 70) entièrement en couleur "violet".' }
      },
    },
    {
      id: 'tortue-5',
      projectId: 'tortue',
      visual: true,
      title: 'Motif en étoile',
      emoji: '✨',
      xp: 25,
      intro:
        "En changeant l'angle de rotation, une simple boucle peut dessiner des étoiles magnifiques. Avec un angle de 144°, la forme devient une étoile à 5 branches !",
      task: 'Dessine une étoile à 5 branches : répète 5 fois avancer(100) puis tourner_droite(144).',
      starterCode: '# Ton code ici\n',
      hints: ['for _ in range(5):\n    avancer(100)\n    tourner_droite(144)'],
      check: (_stdout, _get, commands) => {
        const ok = commands.length === 5 && allSegmentsLength(commands, 100) && pathCloses(commands)
        return ok
          ? { ok: true, message: 'Une étoile magique à 5 branches ! ✨' }
          : { ok: false, message: 'Il faut 5 traits de 100 pixels avec un angle de 144° (une étoile complète).' }
      },
    },
    {
      id: 'tortue-6',
      projectId: 'tortue',
      visual: true,
      title: 'Ta fonction magique',
      emoji: '🌀',
      xp: 35,
      intro:
        "Transforme ta boucle en fonction réutilisable qui dessine n'importe quel polygone régulier (triangle, carré, pentagone, étoile...) selon les paramètres qu'on lui donne.",
      task:
        'Complète `dessiner_polygone(nb_cotes, longueur, angle)` : elle répète nb_cotes fois avancer(longueur) puis tourner_droite(angle). Teste avec dessiner_polygone(6, 50, 60) pour dessiner un hexagone.',
      starterCode: 'def dessiner_polygone(nb_cotes, longueur, angle):\n    # complète ici\n    pass\n\ndessiner_polygone(6, 50, 60)\n',
      hints: ['for _ in range(nb_cotes):\n        avancer(longueur)\n        tourner_droite(angle)'],
      check: (_stdout, _get, commands) => {
        const ok = commands.length === 6 && allSegmentsLength(commands, 50) && pathCloses(commands)
        return ok
          ? { ok: true, message: 'Ta fonction magique dessine un hexagone parfait ! 🌀🐢' }
          : { ok: false, message: 'dessiner_polygone(6, 50, 60) doit tracer un hexagone fermé à 6 côtés de 50 pixels.' }
      },
    },
  ],
}

// ============================================================
// PROJET 8 — Le Fermier Remplacé (Avancé)
// ============================================================
const row = (...cells: FarmCell[]): FarmCell[][] => [cells]

const fermeProject: Project = {
  id: 'ferme',
  title: 'Le Fermier Remplacé',
  emoji: '🚜',
  description: "Programme un tracteur autonome qui récolte tout un champ à ta place.",
  difficulty: 'Avancé',
  color: 'from-amber-600 to-yellow-500',
  steps: [
    {
      id: 'ferme-1',
      projectId: 'ferme',
      title: 'Le tracteur avance',
      emoji: '🚜',
      xp: 10,
      intro:
        "Un petit champ t'attend, et un tracteur robot prêt à travailler. deplacer() fait avancer le tracteur d'une case dans la direction où il regarde. Regarde-le bouger case par case après avoir lancé ton code !",
      task: 'Fais avancer le tracteur de 3 cases (appelle deplacer() trois fois).',
      starterCode: '# Ton code ici\n',
      farmConfig: { width: 5, height: 1, cells: row('vide', 'vide', 'vide', 'vide', 'vide'), startX: 0, startY: 0, startFacing: 90 },
      hints: ['deplacer()\ndeplacer()\ndeplacer()'],
      check: (_stdout, _get, _commands, frames) =>
        tractorAt(frames, 3, 0)
          ? ok('Le tracteur roule tout seul ! 🚜')
          : fail('Il faut avancer de 3 cases (deplacer() trois fois).'),
    },
    {
      id: 'ferme-2',
      projectId: 'ferme',
      title: 'Récolter une case',
      emoji: '🌾',
      xp: 15,
      intro: 'recolter() récolte la culture sur la case où se trouve le tracteur, si elle est prête.',
      task: 'Une récolte prête se trouve juste devant le tracteur. Avance d\'une case avec deplacer(), puis récolte avec recolter().',
      starterCode: '# Ton code ici\n',
      farmConfig: { width: 3, height: 1, cells: row('vide', 'recolte', 'vide'), startX: 0, startY: 0, startFacing: 90 },
      hints: ['deplacer()\nrecolter()'],
      check: (_stdout, _get, _commands, frames) =>
        allHarvested(frames) && tractorAt(frames, 1, 0)
          ? ok('Première récolte engrangée ! 🌾')
          : fail("Il faut avancer d'une case puis récolter (deplacer() puis recolter())."),
    },
    {
      id: 'ferme-3',
      projectId: 'ferme',
      title: 'Est-ce prêt ?',
      emoji: '🔍',
      xp: 15,
      intro:
        'case_recoltable() te dit (True ou False) si la case actuelle contient une récolte prête, avant même de la récolter.',
      task:
        'Le champ contient une case vide puis une case avec une récolte. Affiche case_recoltable() sur la case de départ, avance une fois avec deplacer(), puis affiche case_recoltable() à nouveau.',
      starterCode: '# Ton code ici\n',
      farmConfig: { width: 3, height: 1, cells: row('vide', 'recolte', 'vide'), startX: 0, startY: 0, startFacing: 90 },
      hints: ['print(case_recoltable())\ndeplacer()\nprint(case_recoltable())'],
      check: (stdout) => {
        const ls = lines(stdout)
        return ls.length === 2 && ls[0] === 'False' && ls[1] === 'True'
          ? ok('Le capteur ne se trompe jamais : False puis True ! 🔍')
          : fail('Il faut afficher False, puis True après avoir avancé.')
      },
    },
    {
      id: 'ferme-4',
      projectId: 'ferme',
      title: 'Récolte toute la ligne',
      emoji: '🌾🌾🌾',
      xp: 25,
      intro:
        "Combine boucle, capteur et récolte pour tout ramasser automatiquement, sans savoir à l'avance où sont les récoltes.",
      task:
        'Le champ (5 cases) contient des récoltes à des endroits que tu ne connais pas à l\'avance. Écris une boucle qui, pour chacune des 5 cases (en avançant à chaque tour) : récolte si case_recoltable() est vrai.',
      starterCode: '# Ton code ici\n',
      farmConfig: {
        width: 5,
        height: 1,
        cells: row('recolte', 'vide', 'recolte', 'recolte', 'vide'),
        startX: 0,
        startY: 0,
        startFacing: 90,
      },
      hints: ['for _ in range(5):\n    if case_recoltable():\n        recolter()\n    deplacer()'],
      check: (_stdout, _get, _commands, frames) =>
        allHarvested(frames)
          ? ok('Champ nettoyé du premier au dernier grain ! 🌾')
          : fail('Il faut récolter toutes les cases du champ (utilise une boucle + case_recoltable()).'),
    },
    {
      id: 'ferme-5',
      projectId: 'ferme',
      title: 'Ta fonction récolteuse',
      emoji: '🤖',
      xp: 35,
      intro:
        "Transforme ta boucle en fonction réutilisable, capable de récolter une ligne de n'importe quelle taille — ton tracteur est maintenant totalement autonome.",
      task:
        'Complète `recolter_ligne(nb_cases)` : pour chacune des nb_cases cases, récolte si case_recoltable() est vrai, puis avance. Teste avec recolter_ligne(6) sur un champ de 6 cases.',
      starterCode: 'def recolter_ligne(nb_cases):\n    # complète ici\n    pass\n\nrecolter_ligne(6)\n',
      farmConfig: {
        width: 6,
        height: 1,
        cells: row('recolte', 'recolte', 'vide', 'recolte', 'vide', 'recolte'),
        startX: 0,
        startY: 0,
        startFacing: 90,
      },
      hints: ['for _ in range(nb_cases):\n        if case_recoltable():\n            recolter()\n        deplacer()'],
      check: (_stdout, _get, _commands, frames) =>
        allHarvested(frames)
          ? ok('Le fermier peut partir en vacances, ton tracteur gère tout ! 🤖🚜')
          : fail('recolter_ligne(6) doit récolter toutes les cases du champ.'),
    },
  ],
}

export const PROJECTS: Project[] = [
  devineProject,
  emojiProject,
  combatProject,
  cesarProject,
  tortueProject,
  fermeProject,
  histoireProject,
  quizProject,
]
