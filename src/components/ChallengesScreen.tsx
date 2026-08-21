import { CHALLENGES } from '../data/challenges'
import type { Difficulty, Progress } from '../types'

interface ChallengesScreenProps {
  progress: Progress
  onSelectChallenge: (challengeId: string) => void
}

const DIFFICULTY_STYLE: Record<Difficulty, string> = {
  Débutant: 'bg-emerald-400/15 text-emerald-300',
  Intermédiaire: 'bg-amber-400/15 text-amber-300',
  Avancé: 'bg-rose-400/15 text-rose-300',
}

export default function ChallengesScreen({ progress, onSelectChallenge }: ChallengesScreenProps) {
  const doneCount = CHALLENGES.filter((c) => progress.completedLessons[c.id]).length

  return (
    <div className="mx-auto max-w-md px-4 pb-10 pt-5">
      <div className="mb-6">
        <h1 className="text-xl font-extrabold text-white">Défis 🧩</h1>
        <p className="mt-0.5 text-sm text-white/50">
          {doneCount} / {CHALLENGES.length} défis résolus — des exercices d'algo façon
          compétition, à débloquer dans l'ordre que tu veux.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {CHALLENGES.map((challenge) => {
          const done = !!progress.completedLessons[challenge.id]
          return (
            <button
              key={challenge.id}
              type="button"
              onClick={() => onSelectChallenge(challenge.id)}
              className="flex items-center gap-3 rounded-xl bg-white/5 p-3 text-left active:scale-[0.98]"
            >
              <div
                className={[
                  'flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-lg',
                  done ? 'bg-gradient-to-br from-emerald-400 to-teal-500' : 'bg-gradient-to-br from-sky-500 to-cyan-600',
                ].join(' ')}
              >
                {done ? '✅' : challenge.emoji}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-white">{challenge.title}</p>
                <p className="text-xs text-white/40">+{challenge.xp} XP</p>
              </div>
              <span
                className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold ${DIFFICULTY_STYLE[challenge.difficulty]}`}
              >
                {challenge.difficulty}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
