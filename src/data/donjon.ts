import type { CheckResult, DonjonLevel } from '../types'
import { donjonAt, donjonCleared } from '../lib/donjonChecks'

const lines = (s: string) =>
  s
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)

const ok = (message: string): CheckResult => ({ ok: true, message })
const fail = (message: string): CheckResult => ({ ok: false, message })

export const DONJON_LEVELS: DonjonLevel[] = [
    {
      id: 'donjon-1',
      title: "Premiers pas",
      emoji: '🤖',
      xp: 10,
      chapter: "Chapitre 1 · Le robot avance",
      intro: "Un robot explorateur attend tes ordres dans un donjon. deplacer() le fait avancer d'une case dans la direction où il regarde, exactement comme le tracteur de la ferme.",
      task: "La sortie (🏁) est 3 cases plus loin, en ligne droite. Fais avancer le robot jusqu'à elle.",
      starterCode: "# Ton code ici\n",
      donjonConfig: {
        width: 4,
        height: 1,
        cells: [['vide', 'vide', 'vide', 'sortie']],
        startX: 0,
        startY: 0,
        startFacing: 90,
      },
      hints: [
        "deplacer()\ndeplacer()\ndeplacer()",
      ],
      check: (_stdout, _get, _commands, _farmFrames, frames) =>
        donjonAt(frames, 3, 0)
          ? ok("Premier pas dans le donjon ! 🤖")
          : fail("Il faut avancer de 3 cases (deplacer() trois fois)."),
    },
    {
      id: 'donjon-2',
      title: "Regarder avant d’avancer",
      emoji: '👀',
      xp: 15,
      chapter: "Chapitre 1 · Le robot avance",
      intro: "case_devant() te dit ce qui se trouve juste devant le robot : 'vide', 'mur', 'monstre', 'cle', 'porte', 'coffre' ou 'sortie'.",
      task: "Affiche case_devant(), avance, affiche case_devant(), avance, affiche case_devant(), avance une dernière fois.",
      starterCode: "# Ton code ici\n",
      donjonConfig: {
        width: 4,
        height: 1,
        cells: [['vide', 'vide', 'vide', 'sortie']],
        startX: 0,
        startY: 0,
        startFacing: 90,
      },
      hints: [
        "print(case_devant())\ndeplacer()\nprint(case_devant())\ndeplacer()\nprint(case_devant())\ndeplacer()",
      ],
      check: (stdout, _get, _commands, _farmFrames, frames) => {
        const ls = lines(stdout)
        return ls.length === 3 && ls[0] === 'vide' && ls[1] === 'vide' && ls[2] === 'sortie' && donjonAt(frames, 3, 0)
          ? ok('Le capteur ne ment jamais : vide, vide, sortie ! 👀')
          : fail('Il faut afficher vide, vide, puis sortie, en avançant entre chaque affichage.')
      },
    },
    {
      id: 'donjon-3',
      title: "Un mur bloque le passage",
      emoji: '🧱',
      xp: 20,
      chapter: "Chapitre 1 · Le robot avance",
      intro: "Un mur (🧱) est infranchissable, comme un rocher à la ferme. Contourne-le par la ligne du dessous : descends, avance, remonte.",
      task: "Un mur bloque la case (1, 0). Atteins la sortie en (2, 0) en passant par la ligne du dessous.",
      starterCode: "# Ton code ici\n",
      donjonConfig: {
        width: 3,
        height: 2,
        cells: [
          ['vide', 'mur', 'sortie'],
          ['vide', 'vide', 'vide'],
        ],
        startX: 0,
        startY: 0,
        startFacing: 90,
      },
      hints: [
        "pivoter_droite()\ndeplacer()\npivoter_gauche()\ndeplacer()\ndeplacer()\npivoter_gauche()\ndeplacer()",
      ],
      check: (_stdout, _get, _commands, _farmFrames, frames) =>
        donjonAt(frames, 2, 0)
          ? ok("Mur contourné sans une égratignure ! 🧱")
          : fail("Le robot doit atteindre la case (2, 0) sans passer par le mur."),
    },
    {
      id: 'donjon-4',
      title: "Deux murs sur la route",
      emoji: '🧱',
      xp: 25,
      chapter: "Chapitre 1 · Le robot avance",
      intro: "Même technique, un peu plus long : le détour par la ligne du dessous marche quelle que soit la largeur du passage bloqué.",
      task: "Deux murs bloquent les cases (1, 0) et (2, 0). Atteins la sortie en (3, 0) en passant par la ligne du dessous.",
      starterCode: "# Ton code ici\n",
      donjonConfig: {
        width: 4,
        height: 2,
        cells: [
          ['vide', 'mur', 'mur', 'sortie'],
          ['vide', 'vide', 'vide', 'vide'],
        ],
        startX: 0,
        startY: 0,
        startFacing: 90,
      },
      hints: [
        "pivoter_droite()\ndeplacer()\npivoter_gauche()\ndeplacer()\ndeplacer()\ndeplacer()\npivoter_gauche()\ndeplacer()",
      ],
      check: (_stdout, _get, _commands, _farmFrames, frames) =>
        donjonAt(frames, 3, 0)
          ? ok("Deux murs, toujours pas de problème ! 🧱🧱")
          : fail("Le robot doit atteindre la case (3, 0) sans passer par les murs."),
    },
    {
      id: 'donjon-5',
      title: "Le grand détour",
      emoji: '🏆',
      xp: 30,
      chapter: "Chapitre 1 · Le robot avance",
      intro: "Un dernier détour, sur un passage encore plus large, pour bien ancrer le réflexe avant d'affronter les vrais dangers du donjon.",
      task: "Des murs bloquent les cases (1, 0) et (3, 0). Atteins la sortie en (4, 0) en passant par la ligne du dessous.",
      starterCode: "# Ton code ici\n",
      donjonConfig: {
        width: 5,
        height: 2,
        cells: [
          ['vide', 'mur', 'vide', 'mur', 'sortie'],
          ['vide', 'vide', 'vide', 'vide', 'vide'],
        ],
        startX: 0,
        startY: 0,
        startFacing: 90,
      },
      hints: [
        "pivoter_droite()\ndeplacer()\npivoter_gauche()\ndeplacer()\ndeplacer()\ndeplacer()\ndeplacer()\npivoter_gauche()\ndeplacer()",
      ],
      check: (_stdout, _get, _commands, _farmFrames, frames) =>
        donjonAt(frames, 4, 0)
          ? ok("Chapitre 1 terminé, le robot est prêt pour le combat ! 🏆")
          : fail("Le robot doit atteindre la case (4, 0) sans passer par les murs."),
    },
    {
      id: 'donjon-6',
      title: "Premier combat",
      emoji: '⚔️',
      xp: 20,
      chapter: "Chapitre 2 · Combat",
      intro: "attaquer() attaque le monstre juste devant le robot. pv_ennemi() te dit combien de coups il lui reste à encaisser (0 s'il n'y a pas de monstre).",
      task: "Un monstre (1 point de vie) bloque le passage. Attaque-le une fois avec attaquer(), puis avance jusqu'à la sortie.",
      starterCode: "# Ton code ici\n",
      donjonConfig: {
        width: 3,
        height: 1,
        cells: [['vide', 'monstre1', 'sortie']],
        startX: 0,
        startY: 0,
        startFacing: 90,
      },
      hints: [
        "attaquer()\ndeplacer()\ndeplacer()",
      ],
      check: (_stdout, _get, _commands, _farmFrames, frames) =>
        donjonCleared(frames)
          ? ok("Premier monstre vaincu ! ⚔️")
          : fail("Il faut attaquer le monstre puis atteindre la sortie."),
    },
    {
      id: 'donjon-7',
      title: "Un monstre plus coriace",
      emoji: '👹',
      xp: 20,
      chapter: "Chapitre 2 · Combat",
      intro: "Certains monstres encaissent plusieurs coups. tant que pv_ennemi() > 0 : attaquer() marche quel que soit le nombre de points de vie.",
      task: "Ce monstre a 2 points de vie. Vainc-le, puis avance jusqu'à la sortie.",
      starterCode: "# Ton code ici\n",
      donjonConfig: {
        width: 3,
        height: 1,
        cells: [['vide', 'monstre2', 'sortie']],
        startX: 0,
        startY: 0,
        startFacing: 90,
      },
      hints: [
        "while pv_ennemi() > 0:\n    attaquer()\ndeplacer()\ndeplacer()",
      ],
      check: (_stdout, _get, _commands, _farmFrames, frames) =>
        donjonCleared(frames)
          ? ok("Deux coups bien placés ! 👹")
          : fail("Il faut vider les points de vie du monstre avant d'avancer."),
    },
    {
      id: 'donjon-8',
      title: "Le monstre à 3 points de vie",
      emoji: '👹',
      xp: 20,
      chapter: "Chapitre 2 · Combat",
      intro: "Même technique : la boucle while pv_ennemi() > 0 s'adapte automatiquement à n'importe quel monstre.",
      task: "Ce monstre a 3 points de vie. Vainc-le, puis avance jusqu'à la sortie.",
      starterCode: "# Ton code ici\n",
      donjonConfig: {
        width: 3,
        height: 1,
        cells: [['vide', 'monstre3', 'sortie']],
        startX: 0,
        startY: 0,
        startFacing: 90,
      },
      hints: [
        "while pv_ennemi() > 0:\n    attaquer()\ndeplacer()\ndeplacer()",
      ],
      check: (_stdout, _get, _commands, _farmFrames, frames) =>
        donjonCleared(frames)
          ? ok("Trois coups, zéro souci ! 👹")
          : fail("Il faut vider les points de vie du monstre avant d'avancer."),
    },
    {
      id: 'donjon-9',
      title: "Deux monstres",
      emoji: '👹👹',
      xp: 30,
      chapter: "Chapitre 2 · Combat",
      intro: "Rien n'empêche de répéter la même technique plusieurs fois dans le même donjon.",
      task: "Deux monstres gardent le couloir. Bats-les tous les deux pour atteindre la sortie.",
      starterCode: "# Ton code ici\n",
      donjonConfig: {
        width: 5,
        height: 1,
        cells: [['vide', 'monstre1', 'vide', 'monstre2', 'sortie']],
        startX: 0,
        startY: 0,
        startFacing: 90,
      },
      hints: [
        "while pv_ennemi() > 0:\n    attaquer()\ndeplacer()\ndeplacer()\nwhile pv_ennemi() > 0:\n    attaquer()\ndeplacer()\ndeplacer()",
      ],
      check: (_stdout, _get, _commands, _farmFrames, frames) =>
        donjonCleared(frames)
          ? ok("Un couloir libéré de tout danger ! 👹👹")
          : fail("Il faut vaincre les deux monstres et atteindre la sortie."),
    },
    {
      id: 'donjon-10',
      title: "La garde rapprochée",
      emoji: '🏆',
      xp: 35,
      chapter: "Chapitre 2 · Combat",
      intro: "Le dernier test de ce chapitre : trois monstres de forces différentes, à la file.",
      task: "Trois monstres (2, 1 puis 3 points de vie) gardent le couloir. Bats-les tous pour atteindre la sortie.",
      starterCode: "# Ton code ici\n",
      donjonConfig: {
        width: 7,
        height: 1,
        cells: [['vide', 'monstre2', 'vide', 'monstre1', 'vide', 'monstre3', 'sortie']],
        startX: 0,
        startY: 0,
        startFacing: 90,
      },
      hints: [
        "while pv_ennemi() > 0:\n    attaquer()\ndeplacer()\ndeplacer()\nwhile pv_ennemi() > 0:\n    attaquer()\ndeplacer()\ndeplacer()\nwhile pv_ennemi() > 0:\n    attaquer()\ndeplacer()\ndeplacer()",
      ],
      check: (_stdout, _get, _commands, _farmFrames, frames) =>
        donjonCleared(frames)
          ? ok("Chapitre 2 terminé, le robot est un vrai combattant ! 🏆⚔️")
          : fail("Il faut vaincre les trois monstres et atteindre la sortie."),
    },
    {
      id: 'donjon-11',
      title: "Ramasser une clé",
      emoji: '🔑',
      xp: 20,
      chapter: "Chapitre 3 · Clés et portes",
      intro: "ramasser() ramasse ce qui se trouve sur la case du robot (une clé ou un trésor). a_une_cle() te dit si tu portes au moins une clé.",
      task: "Une clé est sur la case de départ. Ramasse-la, puis avance jusqu'à la sortie.",
      starterCode: "# Ton code ici\n",
      donjonConfig: {
        width: 3,
        height: 1,
        cells: [['cle', 'vide', 'sortie']],
        startX: 0,
        startY: 0,
        startFacing: 90,
      },
      hints: [
        "ramasser()\ndeplacer()\ndeplacer()",
      ],
      check: (_stdout, _get, _commands, _farmFrames, frames) =>
        donjonAt(frames, 2, 0)
          ? ok("Première clé en poche ! 🔑")
          : fail("Il faut ramasser la clé puis atteindre la sortie."),
    },
    {
      id: 'donjon-12',
      title: "Une porte verrouillée",
      emoji: '🚪',
      xp: 25,
      chapter: "Chapitre 3 · Clés et portes",
      intro: "ouvrir() ouvre la porte juste devant le robot, à condition d'avoir une clé (elle est alors consommée).",
      task: "Ramasse la clé, avance jusqu'à la porte, ouvre-la avec ouvrir(), puis avance jusqu'à la sortie.",
      starterCode: "# Ton code ici\n",
      donjonConfig: {
        width: 4,
        height: 1,
        cells: [['cle', 'vide', 'porte', 'sortie']],
        startX: 0,
        startY: 0,
        startFacing: 90,
      },
      hints: [
        "ramasser()\ndeplacer()\nouvrir()\ndeplacer()\ndeplacer()",
      ],
      check: (_stdout, _get, _commands, _farmFrames, frames) =>
        donjonCleared(frames)
          ? ok("Porte déverrouillée avec la clé trouvée ! 🚪🔑")
          : fail("Il faut ramasser la clé, ouvrir la porte, puis atteindre la sortie."),
    },
    {
      id: 'donjon-13',
      title: "La clé un peu plus loin",
      emoji: '🔑',
      xp: 25,
      chapter: "Chapitre 3 · Clés et portes",
      intro: "Cette fois, il faut d'abord marcher jusqu'à la clé avant de pouvoir la ramasser.",
      task: "Avance jusqu'à la clé, ramasse-la, ouvre la porte, puis avance jusqu'à la sortie.",
      starterCode: "# Ton code ici\n",
      donjonConfig: {
        width: 5,
        height: 1,
        cells: [['vide', 'cle', 'vide', 'porte', 'sortie']],
        startX: 0,
        startY: 0,
        startFacing: 90,
      },
      hints: [
        "deplacer()\nramasser()\ndeplacer()\nouvrir()\ndeplacer()\ndeplacer()",
      ],
      check: (_stdout, _get, _commands, _farmFrames, frames) =>
        donjonCleared(frames)
          ? ok("Toujours aussi efficace ! 🔑🚪")
          : fail("Il faut ramasser la clé, ouvrir la porte, puis atteindre la sortie."),
    },
    {
      id: 'donjon-14',
      title: "Monstre, clé et porte",
      emoji: '⚔️',
      xp: 30,
      chapter: "Chapitre 3 · Clés et portes",
      intro: "Combine tout ce que tu sais : combat, clé et porte, dans le même couloir.",
      task: "Un monstre (1 pv) garde la clé. Bats-le, ramasse la clé, ouvre la porte, puis avance jusqu'à la sortie.",
      starterCode: "# Ton code ici\n",
      donjonConfig: {
        width: 5,
        height: 1,
        cells: [['vide', 'monstre1', 'cle', 'porte', 'sortie']],
        startX: 0,
        startY: 0,
        startFacing: 90,
      },
      hints: [
        "while pv_ennemi() > 0:\n    attaquer()\ndeplacer()\ndeplacer()\nramasser()\ndeplacer()\nouvrir()\ndeplacer()\ndeplacer()",
      ],
      check: (_stdout, _get, _commands, _farmFrames, frames) =>
        donjonCleared(frames)
          ? ok("Combat, clé et porte, tout en un ! ⚔️🔑🚪")
          : fail("Il faut vaincre le monstre, ramasser la clé, ouvrir la porte, puis atteindre la sortie."),
    },
    {
      id: 'donjon-15',
      title: "Deux portes, deux clés",
      emoji: '🏆',
      xp: 35,
      chapter: "Chapitre 3 · Clés et portes",
      intro: "Dernier test du chapitre : deux clés, deux portes, dans le même couloir.",
      task: "Ramasse chaque clé et ouvre chaque porte au fur et à mesure, jusqu'à la sortie.",
      starterCode: "# Ton code ici\n",
      donjonConfig: {
        width: 7,
        height: 1,
        cells: [['cle', 'vide', 'porte', 'cle', 'vide', 'porte', 'sortie']],
        startX: 0,
        startY: 0,
        startFacing: 90,
      },
      hints: [
        "ramasser()\ndeplacer()\nouvrir()\ndeplacer()\nramasser()\ndeplacer()\nouvrir()\ndeplacer()\ndeplacer()",
      ],
      check: (_stdout, _get, _commands, _farmFrames, frames) =>
        donjonCleared(frames)
          ? ok("Chapitre 3 terminé, aucune serrure ne résiste au robot ! 🏆🔑")
          : fail("Il faut ramasser les deux clés et ouvrir les deux portes."),
    },
    {
      id: 'donjon-16',
      title: "Un coffre au bout",
      emoji: '💰',
      xp: 20,
      chapter: "Chapitre 4 · Trésors",
      intro: "Un trésor (💰) se ramasse aussi avec ramasser(), exactement comme une clé.",
      task: "Avance jusqu'au coffre et ramasse-le.",
      starterCode: "# Ton code ici\n",
      donjonConfig: {
        width: 3,
        height: 1,
        cells: [['vide', 'vide', 'coffre']],
        startX: 0,
        startY: 0,
        startFacing: 90,
      },
      hints: [
        "deplacer()\ndeplacer()\nramasser()",
      ],
      check: (_stdout, _get, _commands, _farmFrames, frames) =>
        donjonCleared(frames)
          ? ok("Premier trésor du donjon ! 💰")
          : fail("Il faut atteindre le coffre et le ramasser."),
    },
    {
      id: 'donjon-17',
      title: "Un coffre gardé",
      emoji: '👹',
      xp: 25,
      chapter: "Chapitre 4 · Trésors",
      intro: "Beaucoup de trésors sont gardés par des monstres. Rien de nouveau : bats-le d'abord.",
      task: "Un monstre (1 pv) garde le coffre. Bats-le, puis avance jusqu'au coffre et ramasse-le.",
      starterCode: "# Ton code ici\n",
      donjonConfig: {
        width: 4,
        height: 1,
        cells: [['vide', 'monstre1', 'vide', 'coffre']],
        startX: 0,
        startY: 0,
        startFacing: 90,
      },
      hints: [
        "while pv_ennemi() > 0:\n    attaquer()\ndeplacer()\ndeplacer()\ndeplacer()\nramasser()",
      ],
      check: (_stdout, _get, _commands, _farmFrames, frames) =>
        donjonCleared(frames)
          ? ok("Le trésor n'a rien perdu de son éclat ! 👹💰")
          : fail("Il faut vaincre le monstre puis ramasser le coffre."),
    },
    {
      id: 'donjon-18',
      title: "Un coffre derrière une porte",
      emoji: '🚪',
      xp: 25,
      chapter: "Chapitre 4 · Trésors",
      intro: "Combine clé, porte et trésor : trois mécaniques déjà connues, dans un ordre logique.",
      task: "Ramasse la clé, ouvre la porte, puis avance jusqu'au coffre et ramasse-le.",
      starterCode: "# Ton code ici\n",
      donjonConfig: {
        width: 4,
        height: 1,
        cells: [['cle', 'vide', 'porte', 'coffre']],
        startX: 0,
        startY: 0,
        startFacing: 90,
      },
      hints: [
        "ramasser()\ndeplacer()\nouvrir()\ndeplacer()\ndeplacer()\nramasser()",
      ],
      check: (_stdout, _get, _commands, _farmFrames, frames) =>
        donjonCleared(frames)
          ? ok("Un coffre bien mérité ! 🚪💰")
          : fail("Il faut ramasser la clé, ouvrir la porte, puis ramasser le coffre."),
    },
    {
      id: 'donjon-19',
      title: "Le trésor bien gardé",
      emoji: '🏆',
      xp: 30,
      chapter: "Chapitre 4 · Trésors",
      intro: "Monstre, clé, porte et trésor : tout ce que tu as appris, dans un seul couloir.",
      task: "Bats le monstre, ramasse la clé, ouvre la porte, puis avance jusqu'au coffre et ramasse-le.",
      starterCode: "# Ton code ici\n",
      donjonConfig: {
        width: 6,
        height: 1,
        cells: [['cle', 'monstre1', 'vide', 'porte', 'vide', 'coffre']],
        startX: 0,
        startY: 0,
        startFacing: 90,
      },
      hints: [
        "ramasser()\nwhile pv_ennemi() > 0:\n    attaquer()\ndeplacer()\ndeplacer()\nouvrir()\ndeplacer()\ndeplacer()\ndeplacer()\nramasser()",
      ],
      check: (_stdout, _get, _commands, _farmFrames, frames) =>
        donjonCleared(frames)
          ? ok("Aucun obstacle ne résiste plus au robot ! 🏆💰")
          : fail("Il faut ramasser la clé, vaincre le monstre, ouvrir la porte, puis ramasser le coffre."),
    },
    {
      id: 'donjon-20',
      title: "Le couloir aux deux trésors",
      emoji: '🏆',
      xp: 35,
      chapter: "Chapitre 4 · Trésors",
      intro: "Dernier défi du chapitre : deux trésors, un monstre et une porte, dans le même couloir.",
      task: "Ramasse le premier coffre, bats le monstre, ramasse la clé, ouvre la porte, puis ramasse le second coffre.",
      starterCode: "# Ton code ici\n",
      donjonConfig: {
        width: 7,
        height: 1,
        cells: [['vide', 'coffre', 'monstre2', 'cle', 'vide', 'porte', 'coffre']],
        startX: 0,
        startY: 0,
        startFacing: 90,
      },
      hints: [
        "deplacer()\nramasser()\ndeplacer()\nwhile pv_ennemi() > 0:\n    attaquer()\ndeplacer()\ndeplacer()\nramasser()\ndeplacer()\nouvrir()\ndeplacer()\ndeplacer()\nramasser()",
      ],
      check: (_stdout, _get, _commands, _farmFrames, frames) =>
        donjonCleared(frames)
          ? ok("Chapitre 4 terminé, le robot est riche ! 🏆💰")
          : fail("Il faut ramasser les deux coffres, vaincre le monstre et ouvrir la porte."),
    },
    {
      id: 'donjon-21',
      title: "Le robot qui réfléchit",
      emoji: '🧠',
      xp: 30,
      chapter: "Chapitre 5 · Fonctions réutilisables",
      intro: "Plutôt que de gérer chaque cas à la main, écris une fonction qui décide toute seule quoi faire face à n'importe quoi : un monstre, une porte, ou du vide.",
      task: "Complète avancer_intelligent() pour qu'elle réagisse correctement à ce qu'il y a devant elle (monstre, porte, ou case vide). Appelle-la 3 fois pour traverser le couloir.",
      starterCode: "def avancer_intelligent():\n    # complète ici\n    pass\n\n# Ton code ici\n",
      donjonConfig: {
        width: 4,
        height: 1,
        cells: [['vide', 'monstre2', 'vide', 'sortie']],
        startX: 0,
        startY: 0,
        startFacing: 90,
      },
      hints: [
        "devant = case_devant()\n    if devant == 'monstre':\n        while pv_ennemi() > 0:\n            attaquer()\n        deplacer()\n    elif devant == 'porte':\n        ouvrir()\n        deplacer()\n    else:\n        deplacer()",
      ],
      check: (_stdout, _get, _commands, _farmFrames, frames) =>
        donjonAt(frames, 3, 0)
          ? ok("Un robot qui s'adapte à ce qu'il voit ! 🧠")
          : fail("avancer_intelligent() doit gérer le monstre puis avancer, appelée 3 fois."),
    },
    {
      id: 'donjon-22',
      title: "Une fonction qui traverse tout",
      emoji: '🔁',
      xp: 35,
      chapter: "Chapitre 5 · Fonctions réutilisables",
      intro: "Ajoute le ramassage des objets à la décision, et boucle sur toute la longueur du couloir : une seule fonction pour tout traverser.",
      task: "Complète traverser(nb_cases) pour qu'elle ramasse tout ce qui traîne en avançant sur nb_cases cases. Teste avec traverser(5).",
      starterCode: "def avancer_intelligent():\n    devant = case_devant()\n    if devant == 'monstre':\n        while pv_ennemi() > 0:\n            attaquer()\n        deplacer()\n    elif devant == 'porte':\n        ouvrir()\n        deplacer()\n    else:\n        deplacer()\n\ndef traverser(nb_cases):\n    # complète ici\n    pass\n\ntraverser(5)\n",
      donjonConfig: {
        width: 5,
        height: 1,
        cells: [['vide', 'monstre1', 'cle', 'porte', 'coffre']],
        startX: 0,
        startY: 0,
        startFacing: 90,
      },
      hints: [
        "for i in range(nb_cases):\n        ramasser()\n        if i < nb_cases - 1:\n            avancer_intelligent()",
      ],
      check: (_stdout, _get, _commands, _farmFrames, frames) =>
        donjonCleared(frames)
          ? ok("Une fonction qui gère absolument tout ! 🔁")
          : fail("traverser(5) doit vaincre le monstre, ramasser la clé, ouvrir la porte et ramasser le coffre."),
    },
    {
      id: 'donjon-23',
      title: "Un couloir plus long",
      emoji: '🌀',
      xp: 20,
      chapter: "Chapitre 5 · Fonctions réutilisables",
      intro: "La même fonction marche sur un couloir de n'importe quelle longueur.",
      task: "Appelle traverser(6) pour nettoyer tout le couloir.",
      starterCode: "def avancer_intelligent():\n    devant = case_devant()\n    if devant == 'monstre':\n        while pv_ennemi() > 0:\n            attaquer()\n        deplacer()\n    elif devant == 'porte':\n        ouvrir()\n        deplacer()\n    else:\n        deplacer()\n\ndef traverser(nb_cases):\n    for i in range(nb_cases):\n        ramasser()\n        if i < nb_cases - 1:\n            avancer_intelligent()\n\n# Ton code ici\n",
      donjonConfig: {
        width: 6,
        height: 1,
        cells: [['cle', 'vide', 'monstre2', 'vide', 'porte', 'coffre']],
        startX: 0,
        startY: 0,
        startFacing: 90,
      },
      hints: [
        "traverser(6)",
      ],
      check: (_stdout, _get, _commands, _farmFrames, frames) =>
        donjonCleared(frames)
          ? ok("Toujours aussi efficace ! 🌀")
          : fail("Il faut appeler traverser(6)."),
    },
    {
      id: 'donjon-24',
      title: "Encore un peu plus long",
      emoji: '🌀',
      xp: 20,
      chapter: "Chapitre 5 · Fonctions réutilisables",
      intro: "Aucune limite : la fonction s'adapte à la taille donnée.",
      task: "Appelle traverser(7) pour nettoyer tout le couloir.",
      starterCode: "def avancer_intelligent():\n    devant = case_devant()\n    if devant == 'monstre':\n        while pv_ennemi() > 0:\n            attaquer()\n        deplacer()\n    elif devant == 'porte':\n        ouvrir()\n        deplacer()\n    else:\n        deplacer()\n\ndef traverser(nb_cases):\n    for i in range(nb_cases):\n        ramasser()\n        if i < nb_cases - 1:\n            avancer_intelligent()\n\n# Ton code ici\n",
      donjonConfig: {
        width: 7,
        height: 1,
        cells: [['vide', 'monstre1', 'cle', 'vide', 'porte', 'monstre2', 'coffre']],
        startX: 0,
        startY: 0,
        startFacing: 90,
      },
      hints: [
        "traverser(7)",
      ],
      check: (_stdout, _get, _commands, _farmFrames, frames) =>
        donjonCleared(frames)
          ? ok("Rien ne l'arrête ! 🌀")
          : fail("Il faut appeler traverser(7)."),
    },
    {
      id: 'donjon-25',
      title: "Chapitre 5 terminé",
      emoji: '🏆',
      xp: 30,
      chapter: "Chapitre 5 · Fonctions réutilisables",
      intro: "Dernier couloir de ce chapitre, un peu plus dense.",
      task: "Appelle traverser(8) pour nettoyer tout le couloir.",
      starterCode: "def avancer_intelligent():\n    devant = case_devant()\n    if devant == 'monstre':\n        while pv_ennemi() > 0:\n            attaquer()\n        deplacer()\n    elif devant == 'porte':\n        ouvrir()\n        deplacer()\n    else:\n        deplacer()\n\ndef traverser(nb_cases):\n    for i in range(nb_cases):\n        ramasser()\n        if i < nb_cases - 1:\n            avancer_intelligent()\n\n# Ton code ici\n",
      donjonConfig: {
        width: 8,
        height: 1,
        cells: [['cle', 'monstre2', 'vide', 'porte', 'coffre', 'vide', 'monstre1', 'coffre']],
        startX: 0,
        startY: 0,
        startFacing: 90,
      },
      hints: [
        "traverser(8)",
      ],
      check: (_stdout, _get, _commands, _farmFrames, frames) =>
        donjonCleared(frames)
          ? ok("Chapitre 5 terminé : deux fonctions qui font tout le travail ! 🏆")
          : fail("Il faut appeler traverser(8)."),
    },
    {
      id: 'donjon-26',
      title: "Ranger ses outils",
      emoji: '📚',
      xp: 40,
      chapter: "Chapitre 6 · Ma bibliothèque",
      intro: "Tu as écrit avancer_intelligent() et traverser() plusieurs fois déjà. Range-les dans ta bibliothèque (panneau ci-dessus) : elles seront alors disponibles automatiquement dans TOUS les niveaux suivants, sans jamais avoir à les recopier.",
      task: "Colle ce code dans le panneau « Ma bibliothèque » ci-dessus, clique sur Enregistrer, puis appelle simplement traverser(6) ici, dans l'éditeur principal.",
      starterCode: "# Ton code ici\n",
      donjonConfig: {
        width: 6,
        height: 1,
        cells: [['cle', 'monstre1', 'vide', 'porte', 'vide', 'coffre']],
        startX: 0,
        startY: 0,
        startFacing: 90,
      },
      usesLibrary: 'donjon',
      hints: [
        "def avancer_intelligent():\n    devant = case_devant()\n    if devant == 'monstre':\n        while pv_ennemi() > 0:\n            attaquer()\n        deplacer()\n    elif devant == 'porte':\n        ouvrir()\n        deplacer()\n    else:\n        deplacer()\n\ndef traverser(nb_cases):\n    for i in range(nb_cases):\n        ramasser()\n        if i < nb_cases - 1:\n            avancer_intelligent()\n",
      ],
      check: (_stdout, _get, _commands, _farmFrames, frames) =>
        donjonCleared(frames)
          ? ok("Ta bibliothèque est prête ! Elle te suivra partout maintenant. 📚")
          : fail("Il faut enregistrer les fonctions dans la bibliothèque puis appeler traverser(6)."),
    },
    {
      id: 'donjon-27',
      title: "Ça marche tout seul",
      emoji: '📚',
      xp: 20,
      chapter: "Chapitre 6 · Ma bibliothèque",
      intro: "Regarde : traverser() est déjà disponible, sans rien recopier. C'est tout l'intérêt de la bibliothèque.",
      task: "Appelle traverser(6) pour nettoyer ce nouveau couloir.",
      starterCode: "# Ton code ici\n",
      donjonConfig: {
        width: 6,
        height: 1,
        cells: [['vide', 'monstre1', 'vide', 'cle', 'porte', 'sortie']],
        startX: 0,
        startY: 0,
        startFacing: 90,
      },
      usesLibrary: 'donjon',
      hints: [
        "traverser(6)",
      ],
      check: (_stdout, _get, _commands, _farmFrames, frames) =>
        donjonCleared(frames)
          ? ok("La bibliothèque fait tout le travail ! 📚")
          : fail("Il faut appeler traverser(6)."),
    },
    {
      id: 'donjon-28',
      title: "Toujours prête",
      emoji: '📚',
      xp: 20,
      chapter: "Chapitre 6 · Ma bibliothèque",
      intro: "Un nouveau couloir, la même fonction, disponible sans effort.",
      task: "Appelle traverser(6) pour nettoyer ce couloir.",
      starterCode: "# Ton code ici\n",
      donjonConfig: {
        width: 6,
        height: 1,
        cells: [['vide', 'coffre', 'monstre3', 'vide', 'vide', 'sortie']],
        startX: 0,
        startY: 0,
        startFacing: 90,
      },
      usesLibrary: 'donjon',
      hints: [
        "traverser(6)",
      ],
      check: (_stdout, _get, _commands, _farmFrames, frames) =>
        donjonCleared(frames)
          ? ok("Ta bibliothèque ne te laisse jamais tomber ! 📚")
          : fail("Il faut appeler traverser(6)."),
    },
    {
      id: 'donjon-29',
      title: "Un couloir plus dense",
      emoji: '📚',
      xp: 25,
      chapter: "Chapitre 6 · Ma bibliothèque",
      intro: "Un couloir plus chargé, toujours nettoyé par la même fonction.",
      task: "Appelle traverser(7) pour nettoyer ce couloir.",
      starterCode: "# Ton code ici\n",
      donjonConfig: {
        width: 7,
        height: 1,
        cells: [['cle', 'porte', 'monstre1', 'vide', 'coffre', 'monstre2', 'sortie']],
        startX: 0,
        startY: 0,
        startFacing: 90,
      },
      usesLibrary: 'donjon',
      hints: [
        "traverser(7)",
      ],
      check: (_stdout, _get, _commands, _farmFrames, frames) =>
        donjonCleared(frames)
          ? ok("Un outil qui grandit avec le défi ! 📚")
          : fail("Il faut appeler traverser(7)."),
    },
    {
      id: 'donjon-30',
      title: "Chapitre 6 terminé",
      emoji: '🏆',
      xp: 30,
      chapter: "Chapitre 6 · Ma bibliothèque",
      intro: "Dernier couloir de ce chapitre. Ta bibliothèque a fait tout le travail depuis 5 niveaux déjà.",
      task: "Appelle traverser(8) pour nettoyer ce couloir.",
      starterCode: "# Ton code ici\n",
      donjonConfig: {
        width: 8,
        height: 1,
        cells: [['vide', 'monstre3', 'vide', 'cle', 'porte', 'coffre', 'monstre1', 'sortie']],
        startX: 0,
        startY: 0,
        startFacing: 90,
      },
      usesLibrary: 'donjon',
      hints: [
        "traverser(8)",
      ],
      check: (_stdout, _get, _commands, _farmFrames, frames) =>
        donjonCleared(frames)
          ? ok("Chapitre 6 terminé : ta bibliothèque est un vrai coffre à outils ! 🏆📚")
          : fail("Il faut appeler traverser(8)."),
    },
    {
      id: 'donjon-31',
      title: "Changer de salle",
      emoji: '🔃',
      xp: 35,
      chapter: "Chapitre 7 · Salles multiples",
      intro: "Un donjon a plusieurs salles (lignes). Pour passer à la suivante : demi-tour, retour au début (rien à faire, la salle est déjà nettoyée), demi-tour, une case vers le bas.",
      task: "Nettoie la première salle avec traverser(4), puis fais demi-tour, reviens au début (3 deplacer()), redescends d'une salle (comme à la ferme), puis traverser(4) à nouveau.",
      starterCode: "# Ton code ici\n",
      donjonConfig: {
        width: 4,
        height: 2,
        cells: [
          ['vide', 'monstre1', 'cle', 'vide'],
          ['vide', 'porte', 'vide', 'sortie'],
        ],
        startX: 0,
        startY: 0,
        startFacing: 90,
      },
      usesLibrary: 'donjon',
      hints: [
        "traverser(4)\npivoter_droite()\npivoter_droite()\ndeplacer()\ndeplacer()\ndeplacer()\npivoter_droite()\npivoter_droite()\npivoter_droite()\ndeplacer()\npivoter_gauche()\ntraverser(4)",
      ],
      check: (_stdout, _get, _commands, _farmFrames, frames) =>
        donjonCleared(frames)
          ? ok("Deux salles nettoyées avec les mêmes outils ! 🔃")
          : fail("Il faut nettoyer les deux salles du donjon."),
    },
    {
      id: 'donjon-32',
      title: "Un donjon qui s’explore tout seul",
      emoji: '🏆',
      xp: 45,
      chapter: "Chapitre 7 · Salles multiples",
      intro: "Généralise en explorer_donjon(largeur, hauteur), qui répète le motif salle par salle — sur le modèle de travailler_champ à la ferme. Ajoute-la à ta bibliothèque avec ligne_suivante().",
      task: "Termine explorer_donjon(largeur, hauteur) pour qu'elle parcoure chaque salle du donjon, ligne par ligne. Enregistre tes fonctions dans ta bibliothèque, puis appelle explorer_donjon(5, 2).",
      starterCode: "def ligne_suivante(largeur):\n    pivoter_droite()\n    pivoter_droite()\n    for _ in range(largeur - 1):\n        deplacer()\n    pivoter_droite()\n    pivoter_droite()\n    pivoter_droite()\n    deplacer()\n    pivoter_gauche()\n\ndef explorer_donjon(largeur, hauteur):\n    # complète ici\n    pass\n\nexplorer_donjon(5, 2)\n",
      donjonConfig: {
        width: 5,
        height: 2,
        cells: [
          ['cle', 'vide', 'monstre1', 'vide', 'vide'],
          ['vide', 'porte', 'vide', 'coffre', 'sortie'],
        ],
        startX: 0,
        startY: 0,
        startFacing: 90,
      },
      usesLibrary: 'donjon',
      hints: [
        "for ligne in range(hauteur):\n        traverser(largeur)\n        if ligne < hauteur - 1:\n            ligne_suivante(largeur)",
      ],
      check: (_stdout, _get, _commands, _farmFrames, frames) =>
        donjonCleared(frames)
          ? ok("Un donjon entier exploré tout seul ! 🏆🔃")
          : fail("N'oublie pas d'enregistrer tes fonctions, puis appelle explorer_donjon(5, 2)."),
    },
    {
      id: 'donjon-33',
      title: "Trois salles",
      emoji: '🏰',
      xp: 25,
      chapter: "Chapitre 7 · Salles multiples",
      intro: "Ta fonction marche sur un donjon de n'importe quelle hauteur.",
      task: "Appelle explorer_donjon(5, 3) pour explorer tout le donjon.",
      starterCode: "# Ton code ici\n",
      donjonConfig: {
        width: 5,
        height: 3,
        cells: [
          ['vide', 'monstre1', 'cle', 'vide', 'vide'],
          ['coffre', 'vide', 'porte', 'vide', 'monstre2'],
          ['vide', 'vide', 'cle', 'vide', 'sortie'],
        ],
        startX: 0,
        startY: 0,
        startFacing: 90,
      },
      usesLibrary: 'donjon',
      hints: [
        "explorer_donjon(5, 3)",
      ],
      check: (_stdout, _get, _commands, _farmFrames, frames) =>
        donjonCleared(frames)
          ? ok("Trois salles, aucun souci ! 🏰")
          : fail("Il faut appeler explorer_donjon(5, 3)."),
    },
    {
      id: 'donjon-34',
      title: "Un donjon plus large",
      emoji: '🏰',
      xp: 25,
      chapter: "Chapitre 7 · Salles multiples",
      intro: "Un donjon plus large, toujours géré par la même fonction.",
      task: "Appelle explorer_donjon(6, 3) pour explorer tout le donjon.",
      starterCode: "# Ton code ici\n",
      donjonConfig: {
        width: 6,
        height: 3,
        cells: [
          ['vide', 'monstre1', 'vide', 'cle', 'vide', 'vide'],
          ['vide', 'coffre', 'monstre2', 'vide', 'porte', 'vide'],
          ['vide', 'vide', 'cle', 'vide', 'vide', 'sortie'],
        ],
        startX: 0,
        startY: 0,
        startFacing: 90,
      },
      usesLibrary: 'donjon',
      hints: [
        "explorer_donjon(6, 3)",
      ],
      check: (_stdout, _get, _commands, _farmFrames, frames) =>
        donjonCleared(frames)
          ? ok("Un donjon plus vaste, sans effort de plus ! 🏰")
          : fail("Il faut appeler explorer_donjon(6, 3)."),
    },
    {
      id: 'donjon-35',
      title: "Chapitre 7 terminé",
      emoji: '🏆',
      xp: 35,
      chapter: "Chapitre 7 · Salles multiples",
      intro: "Dernier donjon de ce chapitre, un peu plus grand.",
      task: "Appelle explorer_donjon(7, 3) pour explorer tout le donjon.",
      starterCode: "# Ton code ici\n",
      donjonConfig: {
        width: 7,
        height: 3,
        cells: [
          ['vide', 'vide', 'monstre1', 'vide', 'coffre', 'vide', 'vide'],
          ['vide', 'cle', 'vide', 'monstre2', 'vide', 'vide', 'coffre'],
          ['vide', 'vide', 'porte', 'vide', 'cle', 'monstre1', 'vide'],
        ],
        startX: 0,
        startY: 0,
        startFacing: 90,
      },
      usesLibrary: 'donjon',
      hints: [
        "explorer_donjon(7, 3)",
      ],
      check: (_stdout, _get, _commands, _farmFrames, frames) =>
        donjonCleared(frames)
          ? ok("Chapitre 7 terminé : les donjons entiers n'ont plus de secret ! 🏆🏰")
          : fail("Il faut appeler explorer_donjon(7, 3)."),
    },
    {
      id: 'donjon-36',
      title: "La Crypte Nord",
      emoji: '🏰',
      xp: 25,
      chapter: "Chapitre 8 · Défis finaux",
      intro: "Un nouveau donjon t'attend, un peu plus grand que le précédent.",
      task: "Appelle explorer_donjon(5, 3) pour explorer tout le donjon.",
      starterCode: "# Ton code ici\n",
      donjonConfig: {
        width: 5,
        height: 3,
        cells: [
          ['vide', 'coffre', 'cle', 'vide', 'monstre3'],
          ['vide', 'monstre3', 'monstre3', 'cle', 'monstre2'],
          ['vide', 'monstre1', 'vide', 'monstre3', 'monstre1'],
        ],
        startX: 0,
        startY: 0,
        startFacing: 90,
      },
      usesLibrary: 'donjon',
      hints: [
        "explorer_donjon(5, 3)",
      ],
      check: (_stdout, _get, _commands, _farmFrames, frames) =>
        donjonCleared(frames)
          ? ok("La Crypte Nord nettoyé·e ! 🏰")
          : fail("Il faut appeler explorer_donjon(5, 3)."),
    },
    {
      id: 'donjon-37',
      title: "La Crypte Sud",
      emoji: '🏰',
      xp: 25,
      chapter: "Chapitre 8 · Défis finaux",
      intro: "Un nouveau donjon t'attend, un peu plus grand que le précédent.",
      task: "Appelle explorer_donjon(6, 3) pour explorer tout le donjon.",
      starterCode: "# Ton code ici\n",
      donjonConfig: {
        width: 6,
        height: 3,
        cells: [
          ['vide', 'vide', 'vide', 'monstre3', 'coffre', 'vide'],
          ['vide', 'monstre1', 'coffre', 'monstre1', 'vide', 'vide'],
          ['vide', 'vide', 'monstre3', 'vide', 'coffre', 'vide'],
        ],
        startX: 0,
        startY: 0,
        startFacing: 90,
      },
      usesLibrary: 'donjon',
      hints: [
        "explorer_donjon(6, 3)",
      ],
      check: (_stdout, _get, _commands, _farmFrames, frames) =>
        donjonCleared(frames)
          ? ok("La Crypte Sud nettoyé·e ! 🏰")
          : fail("Il faut appeler explorer_donjon(6, 3)."),
    },
    {
      id: 'donjon-38',
      title: "Le Sanctuaire",
      emoji: '⚱️',
      xp: 25,
      chapter: "Chapitre 8 · Défis finaux",
      intro: "Un nouveau donjon t'attend, un peu plus grand que le précédent.",
      task: "Appelle explorer_donjon(6, 3) pour explorer tout le donjon.",
      starterCode: "# Ton code ici\n",
      donjonConfig: {
        width: 6,
        height: 3,
        cells: [
          ['vide', 'monstre1', 'vide', 'vide', 'vide', 'vide'],
          ['vide', 'vide', 'vide', 'coffre', 'cle', 'cle'],
          ['vide', 'vide', 'monstre2', 'vide', 'vide', 'vide'],
        ],
        startX: 0,
        startY: 0,
        startFacing: 90,
      },
      usesLibrary: 'donjon',
      hints: [
        "explorer_donjon(6, 3)",
      ],
      check: (_stdout, _get, _commands, _farmFrames, frames) =>
        donjonCleared(frames)
          ? ok("Le Sanctuaire nettoyé·e ! ⚱️")
          : fail("Il faut appeler explorer_donjon(6, 3)."),
    },
    {
      id: 'donjon-39',
      title: "La Galerie",
      emoji: '🏛️',
      xp: 25,
      chapter: "Chapitre 8 · Défis finaux",
      intro: "Un nouveau donjon t'attend, un peu plus grand que le précédent.",
      task: "Appelle explorer_donjon(7, 3) pour explorer tout le donjon.",
      starterCode: "# Ton code ici\n",
      donjonConfig: {
        width: 7,
        height: 3,
        cells: [
          ['vide', 'coffre', 'vide', 'monstre2', 'cle', 'coffre', 'vide'],
          ['vide', 'vide', 'vide', 'monstre3', 'vide', 'vide', 'coffre'],
          ['vide', 'vide', 'vide', 'vide', 'vide', 'vide', 'vide'],
        ],
        startX: 0,
        startY: 0,
        startFacing: 90,
      },
      usesLibrary: 'donjon',
      hints: [
        "explorer_donjon(7, 3)",
      ],
      check: (_stdout, _get, _commands, _farmFrames, frames) =>
        donjonCleared(frames)
          ? ok("La Galerie nettoyé·e ! 🏛️")
          : fail("Il faut appeler explorer_donjon(7, 3)."),
    },
    {
      id: 'donjon-40',
      title: "Les Souterrains",
      emoji: '🕳️',
      xp: 25,
      chapter: "Chapitre 8 · Défis finaux",
      intro: "Un nouveau donjon t'attend, un peu plus grand que le précédent.",
      task: "Appelle explorer_donjon(6, 5) pour explorer tout le donjon.",
      starterCode: "# Ton code ici\n",
      donjonConfig: {
        width: 6,
        height: 5,
        cells: [
          ['vide', 'vide', 'vide', 'monstre3', 'coffre', 'vide'],
          ['vide', 'vide', 'vide', 'vide', 'vide', 'coffre'],
          ['vide', 'vide', 'coffre', 'vide', 'vide', 'cle'],
          ['vide', 'coffre', 'vide', 'coffre', 'vide', 'vide'],
          ['vide', 'cle', 'coffre', 'porte', 'monstre2', 'vide'],
        ],
        startX: 0,
        startY: 0,
        startFacing: 90,
      },
      usesLibrary: 'donjon',
      hints: [
        "explorer_donjon(6, 5)",
      ],
      check: (_stdout, _get, _commands, _farmFrames, frames) =>
        donjonCleared(frames)
          ? ok("Les Souterrains nettoyé·e ! 🕳️")
          : fail("Il faut appeler explorer_donjon(6, 5)."),
    },
    {
      id: 'donjon-41',
      title: "La Salle des Gardes",
      emoji: '🛡️',
      xp: 30,
      chapter: "Chapitre 8 · Défis finaux",
      intro: "Un nouveau donjon t'attend, un peu plus grand que le précédent.",
      task: "Appelle explorer_donjon(7, 3) pour explorer tout le donjon.",
      starterCode: "# Ton code ici\n",
      donjonConfig: {
        width: 7,
        height: 3,
        cells: [
          ['vide', 'coffre', 'coffre', 'coffre', 'vide', 'vide', 'cle'],
          ['vide', 'cle', 'cle', 'cle', 'vide', 'vide', 'porte'],
          ['vide', 'monstre2', 'vide', 'vide', 'coffre', 'monstre3', 'vide'],
        ],
        startX: 0,
        startY: 0,
        startFacing: 90,
      },
      usesLibrary: 'donjon',
      hints: [
        "explorer_donjon(7, 3)",
      ],
      check: (_stdout, _get, _commands, _farmFrames, frames) =>
        donjonCleared(frames)
          ? ok("La Salle des Gardes nettoyé·e ! 🛡️")
          : fail("Il faut appeler explorer_donjon(7, 3)."),
    },
    {
      id: 'donjon-42',
      title: "Le Repaire",
      emoji: '🐉',
      xp: 30,
      chapter: "Chapitre 8 · Défis finaux",
      intro: "Un nouveau donjon t'attend, un peu plus grand que le précédent.",
      task: "Appelle explorer_donjon(8, 3) pour explorer tout le donjon.",
      starterCode: "# Ton code ici\n",
      donjonConfig: {
        width: 8,
        height: 3,
        cells: [
          ['vide', 'vide', 'vide', 'vide', 'vide', 'vide', 'vide', 'vide'],
          ['vide', 'coffre', 'coffre', 'vide', 'coffre', 'cle', 'vide', 'vide'],
          ['vide', 'monstre3', 'monstre1', 'vide', 'vide', 'vide', 'vide', 'monstre1'],
        ],
        startX: 0,
        startY: 0,
        startFacing: 90,
      },
      usesLibrary: 'donjon',
      hints: [
        "explorer_donjon(8, 3)",
      ],
      check: (_stdout, _get, _commands, _farmFrames, frames) =>
        donjonCleared(frames)
          ? ok("Le Repaire nettoyé·e ! 🐉")
          : fail("Il faut appeler explorer_donjon(8, 3)."),
    },
    {
      id: 'donjon-43',
      title: "Les Oubliettes",
      emoji: '⛓️',
      xp: 30,
      chapter: "Chapitre 8 · Défis finaux",
      intro: "Un nouveau donjon t'attend, un peu plus grand que le précédent.",
      task: "Appelle explorer_donjon(7, 5) pour explorer tout le donjon.",
      starterCode: "# Ton code ici\n",
      donjonConfig: {
        width: 7,
        height: 5,
        cells: [
          ['vide', 'vide', 'monstre2', 'vide', 'vide', 'vide', 'monstre2'],
          ['vide', 'vide', 'vide', 'vide', 'monstre1', 'vide', 'vide'],
          ['vide', 'vide', 'vide', 'vide', 'cle', 'vide', 'coffre'],
          ['vide', 'vide', 'vide', 'vide', 'coffre', 'vide', 'monstre2'],
          ['vide', 'vide', 'vide', 'coffre', 'cle', 'vide', 'vide'],
        ],
        startX: 0,
        startY: 0,
        startFacing: 90,
      },
      usesLibrary: 'donjon',
      hints: [
        "explorer_donjon(7, 5)",
      ],
      check: (_stdout, _get, _commands, _farmFrames, frames) =>
        donjonCleared(frames)
          ? ok("Les Oubliettes nettoyé·e ! ⛓️")
          : fail("Il faut appeler explorer_donjon(7, 5)."),
    },
    {
      id: 'donjon-44',
      title: "La Bibliothèque Interdite",
      emoji: '📖',
      xp: 30,
      chapter: "Chapitre 8 · Défis finaux",
      intro: "Un nouveau donjon t'attend, un peu plus grand que le précédent.",
      task: "Appelle explorer_donjon(8, 3) pour explorer tout le donjon.",
      starterCode: "# Ton code ici\n",
      donjonConfig: {
        width: 8,
        height: 3,
        cells: [
          ['vide', 'vide', 'vide', 'vide', 'vide', 'cle', 'cle', 'coffre'],
          ['vide', 'vide', 'cle', 'vide', 'vide', 'vide', 'vide', 'vide'],
          ['vide', 'cle', 'vide', 'coffre', 'vide', 'vide', 'coffre', 'vide'],
        ],
        startX: 0,
        startY: 0,
        startFacing: 90,
      },
      usesLibrary: 'donjon',
      hints: [
        "explorer_donjon(8, 3)",
      ],
      check: (_stdout, _get, _commands, _farmFrames, frames) =>
        donjonCleared(frames)
          ? ok("La Bibliothèque Interdite nettoyé·e ! 📖")
          : fail("Il faut appeler explorer_donjon(8, 3)."),
    },
    {
      id: 'donjon-45',
      title: "Le Trésor Caché",
      emoji: '💰',
      xp: 30,
      chapter: "Chapitre 8 · Défis finaux",
      intro: "Un nouveau donjon t'attend, un peu plus grand que le précédent.",
      task: "Appelle explorer_donjon(9, 3) pour explorer tout le donjon.",
      starterCode: "# Ton code ici\n",
      donjonConfig: {
        width: 9,
        height: 3,
        cells: [
          ['vide', 'monstre1', 'cle', 'cle', 'cle', 'vide', 'vide', 'vide', 'vide'],
          ['vide', 'vide', 'vide', 'monstre3', 'monstre2', 'vide', 'vide', 'vide', 'cle'],
          ['vide', 'vide', 'coffre', 'vide', 'vide', 'coffre', 'coffre', 'vide', 'vide'],
        ],
        startX: 0,
        startY: 0,
        startFacing: 90,
      },
      usesLibrary: 'donjon',
      hints: [
        "explorer_donjon(9, 3)",
      ],
      check: (_stdout, _get, _commands, _farmFrames, frames) =>
        donjonCleared(frames)
          ? ok("Le Trésor Caché nettoyé·e ! 💰")
          : fail("Il faut appeler explorer_donjon(9, 3)."),
    },
    {
      id: 'donjon-46',
      title: "La Forteresse",
      emoji: '🏯',
      xp: 35,
      chapter: "Chapitre 8 · Défis finaux",
      intro: "Un nouveau donjon t'attend, un peu plus grand que le précédent.",
      task: "Appelle explorer_donjon(8, 5) pour explorer tout le donjon.",
      starterCode: "# Ton code ici\n",
      donjonConfig: {
        width: 8,
        height: 5,
        cells: [
          ['vide', 'cle', 'monstre1', 'vide', 'vide', 'vide', 'vide', 'vide'],
          ['vide', 'vide', 'vide', 'cle', 'vide', 'monstre3', 'vide', 'vide'],
          ['vide', 'vide', 'vide', 'vide', 'vide', 'cle', 'porte', 'coffre'],
          ['vide', 'cle', 'vide', 'porte', 'coffre', 'monstre3', 'coffre', 'vide'],
          ['vide', 'vide', 'vide', 'vide', 'vide', 'vide', 'vide', 'vide'],
        ],
        startX: 0,
        startY: 0,
        startFacing: 90,
      },
      usesLibrary: 'donjon',
      hints: [
        "explorer_donjon(8, 5)",
      ],
      check: (_stdout, _get, _commands, _farmFrames, frames) =>
        donjonCleared(frames)
          ? ok("La Forteresse nettoyé·e ! 🏯")
          : fail("Il faut appeler explorer_donjon(8, 5)."),
    },
    {
      id: 'donjon-47',
      title: "Le Labyrinthe de Pierre",
      emoji: '🧱',
      xp: 35,
      chapter: "Chapitre 8 · Défis finaux",
      intro: "Un nouveau donjon t'attend, un peu plus grand que le précédent.",
      task: "Appelle explorer_donjon(9, 3) pour explorer tout le donjon.",
      starterCode: "# Ton code ici\n",
      donjonConfig: {
        width: 9,
        height: 3,
        cells: [
          ['vide', 'monstre2', 'vide', 'vide', 'vide', 'monstre1', 'vide', 'vide', 'vide'],
          ['vide', 'coffre', 'vide', 'vide', 'vide', 'monstre3', 'monstre1', 'coffre', 'vide'],
          ['vide', 'vide', 'vide', 'vide', 'vide', 'vide', 'vide', 'vide', 'vide'],
        ],
        startX: 0,
        startY: 0,
        startFacing: 90,
      },
      usesLibrary: 'donjon',
      hints: [
        "explorer_donjon(9, 3)",
      ],
      check: (_stdout, _get, _commands, _farmFrames, frames) =>
        donjonCleared(frames)
          ? ok("Le Labyrinthe de Pierre nettoyé·e ! 🧱")
          : fail("Il faut appeler explorer_donjon(9, 3)."),
    },
    {
      id: 'donjon-48',
      title: "La Tour Abandonnée",
      emoji: '🗼',
      xp: 35,
      chapter: "Chapitre 8 · Défis finaux",
      intro: "Un nouveau donjon t'attend, un peu plus grand que le précédent.",
      task: "Appelle explorer_donjon(10, 3) pour explorer tout le donjon.",
      starterCode: "# Ton code ici\n",
      donjonConfig: {
        width: 10,
        height: 3,
        cells: [
          ['vide', 'vide', 'vide', 'vide', 'vide', 'vide', 'vide', 'vide', 'vide', 'coffre'],
          ['vide', 'vide', 'vide', 'vide', 'monstre1', 'coffre', 'coffre', 'vide', 'vide', 'cle'],
          ['vide', 'coffre', 'monstre1', 'vide', 'vide', 'coffre', 'coffre', 'monstre2', 'cle', 'vide'],
        ],
        startX: 0,
        startY: 0,
        startFacing: 90,
      },
      usesLibrary: 'donjon',
      hints: [
        "explorer_donjon(10, 3)",
      ],
      check: (_stdout, _get, _commands, _farmFrames, frames) =>
        donjonCleared(frames)
          ? ok("La Tour Abandonnée nettoyé·e ! 🗼")
          : fail("Il faut appeler explorer_donjon(10, 3)."),
    },
    {
      id: 'donjon-49',
      title: "Le Sanctuaire Perdu",
      emoji: '🕯️',
      xp: 35,
      chapter: "Chapitre 8 · Défis finaux",
      intro: "Un nouveau donjon t'attend, un peu plus grand que le précédent.",
      task: "Appelle explorer_donjon(9, 5) pour explorer tout le donjon.",
      starterCode: "# Ton code ici\n",
      donjonConfig: {
        width: 9,
        height: 5,
        cells: [
          ['vide', 'coffre', 'vide', 'vide', 'vide', 'cle', 'vide', 'vide', 'coffre'],
          ['vide', 'cle', 'porte', 'vide', 'monstre3', 'vide', 'vide', 'coffre', 'vide'],
          ['vide', 'coffre', 'vide', 'monstre1', 'vide', 'monstre2', 'coffre', 'vide', 'cle'],
          ['vide', 'vide', 'vide', 'vide', 'vide', 'vide', 'coffre', 'vide', 'vide'],
          ['vide', 'vide', 'coffre', 'coffre', 'vide', 'cle', 'vide', 'porte', 'monstre1'],
        ],
        startX: 0,
        startY: 0,
        startFacing: 90,
      },
      usesLibrary: 'donjon',
      hints: [
        "explorer_donjon(9, 5)",
      ],
      check: (_stdout, _get, _commands, _farmFrames, frames) =>
        donjonCleared(frames)
          ? ok("Le Sanctuaire Perdu nettoyé·e ! 🕯️")
          : fail("Il faut appeler explorer_donjon(9, 5)."),
    },
    {
      id: 'donjon-50',
      title: "Le Donjon Ultime",
      emoji: '👑',
      xp: 60,
      chapter: "Chapitre 8 · Défis finaux",
      intro: "Un nouveau donjon t'attend, le plus grand de tous.",
      task: "Appelle explorer_donjon(12, 5) pour explorer tout le donjon.",
      starterCode: "# Ton code ici\n",
      donjonConfig: {
        width: 12,
        height: 5,
        cells: [
          ['vide', 'vide', 'monstre1', 'monstre1', 'vide', 'coffre', 'vide', 'vide', 'coffre', 'monstre3', 'vide', 'vide'],
          ['vide', 'vide', 'coffre', 'cle', 'vide', 'vide', 'vide', 'cle', 'vide', 'vide', 'porte', 'vide'],
          ['vide', 'vide', 'monstre1', 'vide', 'vide', 'cle', 'vide', 'vide', 'monstre3', 'vide', 'vide', 'vide'],
          ['vide', 'coffre', 'vide', 'vide', 'vide', 'coffre', 'vide', 'vide', 'vide', 'coffre', 'coffre', 'monstre1'],
          ['vide', 'monstre3', 'vide', 'coffre', 'cle', 'monstre2', 'vide', 'vide', 'porte', 'cle', 'porte', 'vide'],
        ],
        startX: 0,
        startY: 0,
        startFacing: 90,
      },
      usesLibrary: 'donjon',
      hints: [
        "explorer_donjon(12, 5)",
      ],
      check: (_stdout, _get, _commands, _farmFrames, frames) =>
        donjonCleared(frames)
          ? ok("Donjon terminé, tous les niveaux du jeu sont conquis. Bravo, robot explorateur ! 🏆👑")
          : fail("Il faut appeler explorer_donjon(12, 5)."),
    },
]
