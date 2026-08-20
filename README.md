# PyQuest 🐍✨

Apprends Python directement sur ton iPhone, en t'éclatant. PyQuest est une app
web (PWA) : ouvre le lien dans Safari, fais "Ajouter à l'écran d'accueil", et
tu as une vraie appli — icône, plein écran, utilisable hors-ligne après le
premier chargement.

## Le concept

- 25 mini-leçons façon jeu (parcours en chemin, comme Duolingo) : variables,
  texte, maths, conditions, boucles, listes, dictionnaires, fonctions, et un
  boss final qui combine tout.
- Le code Python que tu écris **s'exécute vraiment**, dans le navigateur,
  grâce à [Pyodide](https://pyodide.org) (Python compilé en WebAssembly). Pas
  de serveur, pas de compte, tout tourne en local sur ton téléphone.
- XP, niveaux, série de jours (streak), badges à débloquer, confettis à
  chaque réussite.
- Indices progressifs si tu bloques sur un exercice.
- Progression sauvegardée sur l'appareil (`localStorage`).

## Développement

```bash
npm install
npm run dev      # serveur de dev
npm run build    # build de production dans dist/
npm run lint     # oxlint
```

Stack : React + TypeScript + Vite + Tailwind CSS + CodeMirror (éditeur de
code) + Pyodide (self-hébergé dans `public/pyodide/`, donc pas de dépendance
à un CDN externe) + `canvas-confetti`.

## Ajouter des leçons

Le contenu du cours vit dans `src/data/curriculum.ts` (modules + leçons) et
`src/data/badges.ts` (badges). Chaque leçon a un `starterCode`, des `hints`
progressifs, et une fonction `check(stdout, get)` qui vérifie ce que le code
de l'utilisateur affiche (et, si besoin, la valeur de ses variables via
`get("nom_variable")`).

## Déploiement

C'est une app statique : `npm run build` puis héberge le contenu de `dist/`
n'importe où (GitHub Pages, Vercel, Netlify, Cloudflare Pages...). Aucune
variable d'environnement ni backend requis.
