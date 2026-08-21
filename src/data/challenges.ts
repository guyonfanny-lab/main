import type { Challenge } from '../types'

const lines = (s: string) =>
  s
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)

const ok = (message: string) => ({ ok: true, message })
const fail = (message: string) => ({ ok: false, message })

export const CHALLENGES: Challenge[] = [
  {
    id: 'defi-1',
    title: 'FizzBuzz',
    emoji: '🔢',
    xp: 20,
    difficulty: 'Débutant',
    intro:
      "Le grand classique des entretiens de code. Un excellent test pour muscler tes boucles et tes conditions.",
    task:
      'Affiche les nombres de 1 à 15, un par ligne. Remplace les multiples de 3 par "Fizz", les multiples de 5 par "Buzz", et les multiples de 3 ET 5 par "FizzBuzz".',
    starterCode: '# Ton code ici\n',
    hints: [
      'for i in range(1, 16):\n    if i % 15 == 0:\n        print("FizzBuzz")\n    elif i % 3 == 0:\n        print("Fizz")\n    elif i % 5 == 0:\n        print("Buzz")\n    else:\n        print(i)',
    ],
    check: (stdout) => {
      const expected = [
        '1','2','Fizz','4','Buzz','Fizz','7','8','Fizz','Buzz','11','Fizz','13','14','FizzBuzz',
      ]
      const ls = lines(stdout)
      return ls.length === expected.length && ls.every((l, i) => l === expected[i])
        ? ok('FizzBuzz maîtrisé, le classique est coché ! 🔢')
        : fail('Il faut afficher les nombres 1 à 15, avec Fizz/Buzz/FizzBuzz au bon endroit.')
    },
  },
  {
    id: 'defi-2',
    title: 'Somme des nombres pairs',
    emoji: '➕',
    xp: 15,
    difficulty: 'Débutant',
    intro: "Une boucle, un test de parité, un total qui grandit. Les bases, mais bien utiles.",
    task: 'Calcule la somme de tous les nombres pairs de 1 à 50 (inclus), et affiche le résultat.',
    starterCode: '# Ton code ici\n',
    hints: ['total = 0\nfor i in range(1, 51):\n    if i % 2 == 0:\n        total = total + i\nprint(total)'],
    check: (stdout) =>
      lines(stdout).length === 1 && lines(stdout)[0] === '650'
        ? ok('650, exactement le bon compte ! ➕')
        : fail('Il faut afficher la somme des nombres pairs de 1 à 50 (la réponse est un seul nombre).'),
  },
  {
    id: 'defi-3',
    title: 'Palindrome',
    emoji: '🔁',
    xp: 15,
    difficulty: 'Débutant',
    intro: 'Un palindrome se lit pareil à l’endroit et à l’envers, comme "radar" ou "kayak".',
    task:
      'La variable `mot = "radar"` existe. Affiche True si mot est un palindrome, False sinon (indice : mot == mot[::-1]).',
    starterCode: 'mot = "radar"\n\n# Ton code ici\n',
    hints: ['print(mot == mot[::-1])'],
    check: (stdout) =>
      lines(stdout).length === 1 && lines(stdout)[0] === 'True'
        ? ok('"radar" se lit pareil dans les deux sens ! 🔁')
        : fail('Il faut afficher True (car "radar" est un palindrome).'),
  },
  {
    id: 'defi-4',
    title: 'Compter les voyelles',
    emoji: '🔤',
    xp: 20,
    difficulty: 'Débutant',
    intro: "Parcourir une chaîne caractère par caractère, et compter ceux qui t'intéressent.",
    task:
      'La variable `phrase = "Bonjour tout le monde"` existe. Compte et affiche le nombre de voyelles (a, e, i, o, u, majuscules ou minuscules).',
    starterCode: 'phrase = "Bonjour tout le monde"\n\n# Ton code ici\n',
    hints: [
      'compteur = 0\nfor c in phrase:\n    if c.lower() in "aeiou":\n        compteur = compteur + 1\nprint(compteur)',
    ],
    check: (stdout) =>
      lines(stdout).length === 1 && lines(stdout)[0] === '8'
        ? ok('8 voyelles, bien compté ! 🔤')
        : fail('Il faut afficher le nombre de voyelles dans la phrase (la réponse est 8).'),
  },
  {
    id: 'defi-5',
    title: 'Le plus grand nombre',
    emoji: '📈',
    xp: 20,
    difficulty: 'Débutant',
    intro: 'Retrouve le plus grand élément d’une liste sans utiliser la fonction max().',
    task:
      'La variable `nombres = [23, 88, 45, 12, 91, 34, 67]` existe. Trouve et affiche le plus grand nombre, sans utiliser max().',
    starterCode: 'nombres = [23, 88, 45, 12, 91, 34, 67]\n\n# Ton code ici\n',
    hints: [
      'plus_grand = nombres[0]\nfor n in nombres:\n    if n > plus_grand:\n        plus_grand = n\nprint(plus_grand)',
    ],
    check: (stdout) =>
      lines(stdout).length === 1 && lines(stdout)[0] === '91'
        ? ok('91, le champion de la liste ! 📈')
        : fail('Il faut afficher le plus grand nombre de la liste (la réponse est 91).'),
  },
  {
    id: 'defi-6',
    title: 'Inverser une liste',
    emoji: '🔄',
    xp: 20,
    difficulty: 'Débutant',
    intro: 'Construis une nouvelle liste en partant de la fin de l’originale.',
    task:
      'La variable `nombres = [1, 2, 3, 4, 5, 6, 7]` existe. Affiche une nouvelle liste avec les éléments dans l’ordre inverse, sans utiliser [::-1] ni reversed().',
    starterCode: 'nombres = [1, 2, 3, 4, 5, 6, 7]\n\n# Ton code ici\n',
    hints: [
      'inversee = []\nfor n in nombres:\n    inversee = [n] + inversee\nprint(inversee)',
    ],
    check: (stdout) =>
      lines(stdout).length === 1 && lines(stdout)[0] === '[7, 6, 5, 4, 3, 2, 1]'
        ? ok('Liste inversée sans raccourci ! 🔄')
        : fail('Il faut afficher [7, 6, 5, 4, 3, 2, 1].'),
  },
  {
    id: 'defi-7',
    title: 'Nombres premiers',
    emoji: '🧮',
    xp: 30,
    difficulty: 'Intermédiaire',
    intro: 'Un nombre premier n’a que deux diviseurs : 1 et lui-même. Teste chaque diviseur possible.',
    task: 'Affiche la liste de tous les nombres premiers de 2 à 30 (inclus), sous forme de liste.',
    starterCode: '# Ton code ici\n',
    hints: [
      'premiers = []\nfor n in range(2, 31):\n    est_premier = True\n    for d in range(2, n):\n        if n % d == 0:\n            est_premier = False\n    if est_premier:\n        premiers.append(n)\nprint(premiers)',
    ],
    check: (stdout) =>
      lines(stdout).length === 1 && lines(stdout)[0] === '[2, 3, 5, 7, 11, 13, 17, 19, 23, 29]'
        ? ok('Tous les nombres premiers jusqu’à 30, trouvés ! 🧮')
        : fail('Il faut afficher [2, 3, 5, 7, 11, 13, 17, 19, 23, 29].'),
  },
  {
    id: 'defi-8',
    title: 'Suite de Fibonacci',
    emoji: '🐚',
    xp: 25,
    difficulty: 'Intermédiaire',
    intro: 'Chaque nombre de la suite est la somme des deux précédents : 0, 1, 1, 2, 3, 5, 8...',
    task: 'Affiche les 15 premiers nombres de la suite de Fibonacci (en commençant par 0 et 1), sous forme de liste.',
    starterCode: '# Ton code ici\n',
    hints: [
      'fib = [0, 1]\nwhile len(fib) < 15:\n    fib.append(fib[-1] + fib[-2])\nprint(fib)',
    ],
    check: (stdout) =>
      lines(stdout).length === 1 &&
      lines(stdout)[0] === '[0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377]'
        ? ok('15 nombres de Fibonacci, parfait ! 🐚')
        : fail('Il faut afficher [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377].'),
  },
  {
    id: 'defi-9',
    title: 'Anagramme',
    emoji: '🔀',
    xp: 25,
    difficulty: 'Intermédiaire',
    intro: 'Deux mots sont des anagrammes s’ils contiennent exactement les mêmes lettres, réarrangées.',
    task:
      'Les variables `mot1 = "chien"` et `mot2 = "niche"` existent. Affiche True si ce sont des anagrammes, False sinon (indice : compare les lettres triées).',
    starterCode: 'mot1 = "chien"\nmot2 = "niche"\n\n# Ton code ici\n',
    hints: ['print(sorted(mot1) == sorted(mot2))'],
    check: (stdout) =>
      lines(stdout).length === 1 && lines(stdout)[0] === 'True'
        ? ok('"chien" et "niche" sont bien des anagrammes ! 🔀')
        : fail('Il faut afficher True (chien et niche sont des anagrammes).'),
  },
  {
    id: 'defi-10',
    title: 'Tri à bulle',
    emoji: '🫧',
    xp: 35,
    difficulty: 'Intermédiaire',
    intro:
      'Le tri à bulle compare les voisins deux par deux et les échange s’ils sont dans le mauvais ordre, encore et encore.',
    task:
      'La variable `nombres = [64, 34, 25, 12, 22, 11, 90]` existe. Trie-la du plus petit au plus grand avec un tri à bulle (deux boucles imbriquées), sans utiliser sorted() ni .sort(). Affiche le résultat.',
    starterCode: 'nombres = [64, 34, 25, 12, 22, 11, 90]\n\n# Ton code ici\n',
    hints: [
      'n = len(nombres)\nfor i in range(n):\n    for j in range(n - 1 - i):\n        if nombres[j] > nombres[j + 1]:\n            nombres[j], nombres[j + 1] = nombres[j + 1], nombres[j]\nprint(nombres)',
    ],
    check: (stdout) =>
      lines(stdout).length === 1 && lines(stdout)[0] === '[11, 12, 22, 25, 34, 64, 90]'
        ? ok('Liste triée à la main, bulle par bulle ! 🫧')
        : fail('Il faut afficher [11, 12, 22, 25, 34, 64, 90].'),
  },
  {
    id: 'defi-11',
    title: 'Recherche binaire',
    emoji: '🎯',
    xp: 35,
    difficulty: 'Intermédiaire',
    intro:
      'Dans une liste déjà triée, la recherche binaire trouve un élément en divisant la zone de recherche par deux à chaque tour.',
    task:
      'La variable `nombres = [2, 5, 8, 12, 16, 23, 38, 45, 56, 72, 91]` (déjà triée) et `cible = 23` existent. Affiche l’index de cible dans la liste avec une recherche binaire (borne basse/haute, milieu), ou -1 si absent.',
    starterCode: 'nombres = [2, 5, 8, 12, 16, 23, 38, 45, 56, 72, 91]\ncible = 23\n\n# Ton code ici\n',
    hints: [
      'bas = 0\nhaut = len(nombres) - 1\nresultat = -1\nwhile bas <= haut:\n    milieu = (bas + haut) // 2\n    if nombres[milieu] == cible:\n        resultat = milieu\n        haut = bas - 1\n    elif nombres[milieu] < cible:\n        bas = milieu + 1\n    else:\n        haut = milieu - 1\nprint(resultat)',
    ],
    check: (stdout) =>
      lines(stdout).length === 1 && lines(stdout)[0] === '5'
        ? ok('Trouvé en divisant la zone de recherche à chaque tour ! 🎯')
        : fail('Il faut afficher 5 (l’index de 23 dans la liste).'),
  },
  {
    id: 'defi-12',
    title: 'Compter les mots',
    emoji: '📝',
    xp: 30,
    difficulty: 'Intermédiaire',
    intro: 'Un dictionnaire est parfait pour compter les occurrences de chaque mot d’une phrase.',
    task:
      'La variable `phrase = "le chat le chien et le chat"` existe. Affiche un dictionnaire donnant, pour chaque mot, son nombre d’occurrences.',
    starterCode: 'phrase = "le chat le chien et le chat"\n\n# Ton code ici\n',
    hints: [
      'compteurs = {}\nfor mot in phrase.split():\n    compteurs[mot] = compteurs.get(mot, 0) + 1\nprint(compteurs)',
    ],
    check: (stdout) => {
      const ls = lines(stdout)
      if (ls.length !== 1) return fail('Il faut afficher un seul dictionnaire.')
      try {
        const normalized = ls[0].replace(/'/g, '"')
        const parsed = JSON.parse(normalized)
        const expected = { le: 3, chat: 2, chien: 1, et: 1 }
        const match = Object.keys(expected).every(
          (k) => parsed[k] === (expected as Record<string, number>)[k],
        )
        return match && Object.keys(parsed).length === 4
          ? ok('Un dictionnaire qui compte tout seul ! 📝')
          : fail('Le dictionnaire doit contenir : le:3, chat:2, chien:1, et:1.')
      } catch {
        return fail('Le dictionnaire doit contenir : le:3, chat:2, chien:1, et:1.')
      }
    },
  },
  {
    id: 'defi-13',
    title: 'Plus grand facteur premier',
    emoji: '🔍',
    xp: 40,
    difficulty: 'Avancé',
    intro: 'Décompose un nombre en facteurs premiers en divisant par 2, puis 3, puis 4... tant que possible.',
    task:
      'La variable `n = 13195` existe. Trouve et affiche son plus grand facteur premier, en divisant n par des diviseurs croissants tant que c’est possible.',
    starterCode: 'n = 13195\n\n# Ton code ici\n',
    hints: [
      'diviseur = 2\ndernier = 1\nwhile diviseur * diviseur <= n:\n    while n % diviseur == 0:\n        dernier = diviseur\n        n = n // diviseur\n    diviseur = diviseur + 1\nif n > 1:\n    dernier = n\nprint(dernier)',
    ],
    check: (stdout) =>
      lines(stdout).length === 1 && lines(stdout)[0] === '29'
        ? ok('29 est bien le plus grand facteur premier de 13195 ! 🔍')
        : fail('Il faut afficher 29.'),
  },
  {
    id: 'defi-14',
    title: 'Suite de Syracuse',
    emoji: '🌀',
    xp: 35,
    difficulty: 'Avancé',
    intro:
      'Règle de Syracuse (conjecture de Collatz) : si n est pair, divise par 2 ; sinon, fais 3n+1. Répète jusqu’à atteindre 1.',
    task:
      'La variable `n = 27` existe. Compte et affiche le nombre d’étapes nécessaires pour que n atteigne 1 en appliquant la règle de Syracuse.',
    starterCode: 'n = 27\n\n# Ton code ici\n',
    hints: [
      'etapes = 0\nwhile n != 1:\n    if n % 2 == 0:\n        n = n // 2\n    else:\n        n = 3 * n + 1\n    etapes = etapes + 1\nprint(etapes)',
    ],
    check: (stdout) =>
      lines(stdout).length === 1 && lines(stdout)[0] === '111'
        ? ok('111 étapes pour que 27 atteigne 1, bien vu ! 🌀')
        : fail('Il faut afficher 111.'),
  },
  {
    id: 'defi-15',
    title: 'Transposer une matrice',
    emoji: '🔲',
    xp: 35,
    difficulty: 'Avancé',
    intro: 'Transposer une matrice échange ses lignes et ses colonnes : la case (i, j) devient la case (j, i).',
    task:
      'La variable `matrice = [[1, 2, 3], [4, 5, 6]]` existe. Affiche sa transposée (une liste de listes où les colonnes deviennent des lignes).',
    starterCode: 'matrice = [[1, 2, 3], [4, 5, 6]]\n\n# Ton code ici\n',
    hints: [
      'transposee = []\nfor colonne in range(len(matrice[0])):\n    nouvelle_ligne = []\n    for ligne in range(len(matrice)):\n        nouvelle_ligne.append(matrice[ligne][colonne])\n    transposee.append(nouvelle_ligne)\nprint(transposee)',
    ],
    check: (stdout) =>
      lines(stdout).length === 1 && lines(stdout)[0] === '[[1, 4], [2, 5], [3, 6]]'
        ? ok('Lignes et colonnes échangées comme il faut ! 🔲')
        : fail('Il faut afficher [[1, 4], [2, 5], [3, 6]].'),
  },
  {
    id: 'defi-16',
    title: 'Chiffrement de Vigenère',
    emoji: '🗝️',
    xp: 45,
    difficulty: 'Avancé',
    intro:
      'Comme le chiffre de César, mais avec un décalage différent à chaque lettre, donné par un mot-clé qui se répète.',
    task:
      'Les variables `texte = "attaque a l aube"` et `cle = "cle"` existent. Chiffre texte lettre par lettre : décale chaque lettre alphabétique selon la lettre correspondante de cle (répétée en boucle), en laissant les espaces inchangés. Affiche le résultat.',
    starterCode: 'texte = "attaque a l aube"\ncle = "cle"\n\n# Ton code ici\n',
    hints: [
      'resultat = ""\nindex_cle = 0\nfor c in texte:\n    if c.isalpha():\n        decalage = ord(cle[index_cle % len(cle)]) - ord("a")\n        resultat = resultat + chr((ord(c) - ord("a") + decalage) % 26 + ord("a"))\n        index_cle = index_cle + 1\n    else:\n        resultat = resultat + c\nprint(resultat)',
    ],
    check: (stdout) =>
      lines(stdout).length === 1 && lines(stdout)[0] === 'cexcbyg l p cffg'
        ? ok('Message chiffré avec un décalage qui change à chaque lettre ! 🗝️')
        : fail('Il faut afficher "cexcbyg l p cffg".'),
  },
  {
    id: 'defi-17',
    title: 'Grille valide',
    emoji: '🔢',
    xp: 40,
    difficulty: 'Avancé',
    intro: 'Comme dans un sudoku : chaque ligne et chaque colonne d’une grille 4x4 ne doit contenir aucun doublon.',
    task:
      'La variable `grille = [[1, 2, 3, 4], [3, 4, 1, 2], [2, 1, 4, 3], [4, 3, 2, 1]]` existe. Affiche True si aucune ligne et aucune colonne ne contient de doublon, False sinon.',
    starterCode: 'grille = [[1, 2, 3, 4], [3, 4, 1, 2], [2, 1, 4, 3], [4, 3, 2, 1]]\n\n# Ton code ici\n',
    hints: [
      'valide = True\nfor ligne in grille:\n    if len(set(ligne)) != len(ligne):\n        valide = False\nfor c in range(4):\n    colonne = [grille[l][c] for l in range(4)]\n    if len(set(colonne)) != len(colonne):\n        valide = False\nprint(valide)',
    ],
    check: (stdout) =>
      lines(stdout).length === 1 && lines(stdout)[0] === 'True'
        ? ok('Grille validée, aucun doublon en vue ! 🔢')
        : fail('Il faut afficher True (la grille donnée est valide).'),
  },
  {
    id: 'defi-18',
    title: 'Plus longue sous-chaîne sans répétition',
    emoji: '📏',
    xp: 45,
    difficulty: 'Avancé',
    intro:
      'Fais glisser une fenêtre le long du texte : dès qu’une lettre se répète dans la fenêtre, réduis-la par la gauche.',
    task:
      'La variable `texte = "abcabcbb"` existe. Trouve et affiche la longueur de la plus longue sous-chaîne sans caractère répété.',
    starterCode: 'texte = "abcabcbb"\n\n# Ton code ici\n',
    hints: [
      'derniere_position = {}\ndebut = 0\nmeilleure = 0\nfor i in range(len(texte)):\n    c = texte[i]\n    if c in derniere_position and derniere_position[c] >= debut:\n        debut = derniere_position[c] + 1\n    derniere_position[c] = i\n    longueur = i - debut + 1\n    if longueur > meilleure:\n        meilleure = longueur\nprint(meilleure)',
    ],
    check: (stdout) =>
      lines(stdout).length === 1 && lines(stdout)[0] === '3'
        ? ok('"abc" : 3 caractères, la meilleure fenêtre possible ! 📏')
        : fail('Il faut afficher 3.'),
  },
  {
    id: 'defi-19',
    title: 'Distance de Manhattan',
    emoji: '🗺️',
    xp: 20,
    difficulty: 'Intermédiaire',
    intro: 'Sur une grille où l’on ne peut se déplacer qu’horizontalement ou verticalement, la distance de Manhattan compte le nombre minimum de pas.',
    task:
      'Les variables `x1, y1 = 2, 3` et `x2, y2 = 7, 1` existent. Calcule et affiche la distance de Manhattan entre les deux points : |x1-x2| + |y1-y2|.',
    starterCode: 'x1, y1 = 2, 3\nx2, y2 = 7, 1\n\n# Ton code ici\n',
    hints: ['print(abs(x1 - x2) + abs(y1 - y2))'],
    check: (stdout) =>
      lines(stdout).length === 1 && lines(stdout)[0] === '7'
        ? ok('7 pas pour relier les deux points ! 🗺️')
        : fail('Il faut afficher 7.'),
  },
  {
    id: 'defi-20',
    title: 'Nombres parfaits',
    emoji: '👑',
    xp: 45,
    difficulty: 'Avancé',
    intro:
      'Un nombre parfait est égal à la somme de tous ses diviseurs (sauf lui-même). 6 = 1 + 2 + 3, par exemple.',
    task: 'Trouve et affiche tous les nombres parfaits de 1 à 1000 (inclus), sous forme de liste.',
    starterCode: '# Ton code ici\n',
    hints: [
      'parfaits = []\nfor n in range(1, 1001):\n    somme = 0\n    for d in range(1, n):\n        if n % d == 0:\n            somme = somme + d\n    if somme == n:\n        parfaits.append(n)\nprint(parfaits)',
    ],
    check: (stdout) =>
      lines(stdout).length === 1 && lines(stdout)[0] === '[6, 28, 496]'
        ? ok('6, 28 et 496 : les trois nombres parfaits jusqu’à 1000 ! 👑')
        : fail('Il faut afficher [6, 28, 496].'),
  },
]
