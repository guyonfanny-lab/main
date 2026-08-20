import type { Badge, Progress } from '../types'
import { LESSONS } from './curriculum'
import { PROJECTS } from './projects'

export const BADGES: Badge[] = [
  {
    id: 'premier-pas',
    title: 'Premier pas',
    emoji: '🐣',
    description: 'Termine ta toute première leçon.',
  },
  {
    id: 'trio',
    title: 'Sur ta lancée',
    emoji: '🔥',
    description: 'Termine 3 leçons.',
  },
  {
    id: 'serie-3',
    title: 'Série de 3',
    emoji: '📅',
    description: '3 jours actifs consécutifs.',
  },
  {
    id: 'serie-7',
    title: 'Semaine légendaire',
    emoji: '🏆',
    description: '7 jours actifs consécutifs.',
  },
  {
    id: 'mi-parcours',
    title: 'Mi-parcours',
    emoji: '🗺️',
    description: 'Termine la moitié des leçons.',
  },
  {
    id: 'dragon-vaincu',
    title: 'Dragon vaincu',
    emoji: '🐉',
    description: 'Termine le boss final.',
  },
  {
    id: 'createur-de-jeux',
    title: 'Créateur·rice de jeux',
    emoji: '🎮',
    description: 'Termine le projet Combat de donjon.',
  },
  {
    id: 'devine-champion',
    title: 'Devin·e',
    emoji: '🔢',
    description: 'Termine le projet Devine le nombre.',
  },
  {
    id: 'conteur',
    title: 'Conteur·euse',
    emoji: '📖',
    description: 'Termine le projet Histoires aléatoires.',
  },
  {
    id: 'traducteur',
    title: 'Traducteur·rice',
    emoji: '🐱',
    description: 'Termine le projet Traducteur emoji.',
  },
  {
    id: 'espion',
    title: 'Espion·ne',
    emoji: '🔐',
    description: 'Termine le projet Message secret.',
  },
  {
    id: 'oracle',
    title: 'Oracle',
    emoji: '🧭',
    description: 'Termine le projet Quiz de personnalité.',
  },
  {
    id: 'artiste',
    title: 'Artiste',
    emoji: '🐢',
    description: 'Termine le projet Tortue magique.',
  },
  {
    id: 'fermier-remplace',
    title: 'Fermier remplacé',
    emoji: '🚜',
    description: 'Termine le projet Le Fermier Remplacé.',
  },
  {
    id: 'maitre-python',
    title: 'Maître·sse Python',
    emoji: '👑',
    description: 'Termine toutes les leçons de PyQuest.',
  },
  {
    id: 'grand-createur',
    title: 'Grand·e créateur·rice',
    emoji: '🏗️',
    description: 'Termine tous les projets.',
  },
]

export function evaluateBadges(progress: Progress): string[] {
  const completedCount = Object.keys(progress.completedLessons).length
  const earned = new Set(progress.earnedBadges)
  const newly: string[] = []

  const grant = (id: string, condition: boolean) => {
    if (condition && !earned.has(id)) {
      earned.add(id)
      newly.push(id)
    }
  }

  grant('premier-pas', completedCount >= 1)
  grant('trio', completedCount >= 3)
  grant('serie-3', progress.streak >= 3)
  grant('serie-7', progress.streak >= 7)
  grant('mi-parcours', completedCount >= Math.ceil(LESSONS.length / 2))
  grant('dragon-vaincu', !!progress.completedLessons['boss-1'])
  grant('createur-de-jeux', !!progress.completedLessons['jeu-6'])
  grant('devine-champion', !!progress.completedLessons['devine-4'])
  grant('conteur', !!progress.completedLessons['histoire-5'])
  grant('traducteur', !!progress.completedLessons['emoji-4'])
  grant('espion', !!progress.completedLessons['cesar-5'])
  grant('oracle', !!progress.completedLessons['quiz-5'])
  grant('artiste', !!progress.completedLessons['tortue-6'])
  grant('fermier-remplace', !!progress.completedLessons['ferme-8'])
  grant('maitre-python', completedCount >= LESSONS.length)
  grant(
    'grand-createur',
    PROJECTS.every((project) => project.steps.every((step) => !!progress.completedLessons[step.id])),
  )

  return newly
}
