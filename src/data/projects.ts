import type { CheckResult, Project } from '../types'

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

export const PROJECTS: Project[] = [devineProject, combatProject, histoireProject]
