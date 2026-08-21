import { GAME_LEVELS } from '../data/games'
import type { Progress } from '../types'

interface GamesScreenProps {
  progress: Progress
  onSelectLevel: (levelId: string) => void
}

type LevelState = 'locked' | 'unlocked' | 'done'

function stateFor(progress: Progress, index: number): LevelState {
  const level = GAME_LEVELS[index]
  if (progress.completedLessons[level.id]) return 'done'
  if (index === 0) return 'unlocked'
  const previous = GAME_LEVELS[index - 1]
  return progress.completedLessons[previous.id] ? 'unlocked' : 'locked'
}

export default function GamesScreen({ progress, onSelectLevel }: GamesScreenProps) {
  const doneCount = GAME_LEVELS.filter((l) => progress.completedLessons[l.id]).length

  const showChapterAt = GAME_LEVELS.map(
    (level, index) => index === 0 || level.chapter !== GAME_LEVELS[index - 1].chapter,
  )

  return (
    <div className="mx-auto max-w-md px-4 pb-10 pt-5">
      <div className="mb-6">
        <h1 className="text-xl font-extrabold text-white">Les Jeux 🎮</h1>
        <p className="mt-0.5 text-sm text-white/50">
          {doneCount} / {GAME_LEVELS.length} niveaux terminés — JavaScript + Canvas, testé en direct.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        {GAME_LEVELS.map((level, index) => {
          const state = stateFor(progress, index)
          const showChapter = showChapterAt[index]
          return (
            <div key={level.id}>
              {showChapter && (
                <p className="mb-2 mt-5 first:mt-0 text-xs font-bold uppercase tracking-wide text-sky-300/70">
                  {level.chapter}
                </p>
              )}
              <button
                type="button"
                disabled={state === 'locked'}
                onClick={() => onSelectLevel(level.id)}
                className="flex w-full items-center gap-3 rounded-xl bg-white/5 p-3 text-left disabled:opacity-40"
              >
                <div
                  className={[
                    'flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-lg',
                    state === 'done'
                      ? 'bg-gradient-to-br from-emerald-400 to-teal-500'
                      : state === 'unlocked'
                        ? 'bg-gradient-to-br from-sky-400 to-cyan-500'
                        : 'bg-white/10',
                  ].join(' ')}
                >
                  {state === 'done' ? '✅' : state === 'locked' ? '🔒' : level.emoji}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-white">
                    Niveau {index + 1} · {level.title}
                  </p>
                  <p className="text-xs text-white/40">+{level.xp} XP</p>
                </div>
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
