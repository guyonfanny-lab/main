import type { Difficulty, GameTrack, Progress } from '../types'

interface GameTrackStepsScreenProps {
  track: GameTrack
  progress: Progress
  onSelectStep: (stepId: string) => void
  onBack: () => void
}

type StepState = 'locked' | 'unlocked' | 'done'

const DIFFICULTY_STYLE: Record<Difficulty, string> = {
  Débutant: 'bg-emerald-400/15 text-emerald-300',
  Intermédiaire: 'bg-amber-400/15 text-amber-300',
  Avancé: 'bg-rose-400/15 text-rose-300',
}

function stateFor(progress: Progress, track: GameTrack, index: number): StepState {
  const step = track.steps[index]
  if (progress.completedLessons[step.id]) return 'done'
  if (index === 0) return 'unlocked'
  const previous = track.steps[index - 1]
  return progress.completedLessons[previous.id] ? 'unlocked' : 'locked'
}

export default function GameTrackStepsScreen({
  track,
  progress,
  onSelectStep,
  onBack,
}: GameTrackStepsScreenProps) {
  const doneCount = track.steps.filter((s) => progress.completedLessons[s.id]).length

  return (
    <div className="mx-auto max-w-md px-4 pb-10 pt-5">
      <button
        type="button"
        onClick={onBack}
        className="mb-4 flex w-fit items-center gap-1 text-sm font-medium text-white/50 active:text-white/80"
      >
        ← Tous les jeux
      </button>

      <div className={`mb-6 rounded-2xl bg-gradient-to-r ${track.color} p-4 shadow-lg`}>
        <div className="mb-1 flex items-center justify-between">
          <span className="text-3xl">{track.emoji}</span>
          <span
            className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${DIFFICULTY_STYLE[track.difficulty]}`}
          >
            {track.difficulty}
          </span>
        </div>
        <h1 className="text-lg font-bold text-white">{track.title}</h1>
        <p className="text-xs text-white/80">{track.description}</p>
        <p className="mt-2 text-xs font-semibold text-white/70">
          {doneCount} / {track.steps.length} étapes terminées
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {track.steps.map((step, index) => {
          const state = stateFor(progress, track, index)
          return (
            <button
              key={step.id}
              type="button"
              disabled={state === 'locked'}
              onClick={() => onSelectStep(step.id)}
              className="flex items-center gap-3 rounded-xl bg-white/5 p-3 text-left disabled:opacity-40"
            >
              <div
                className={[
                  'flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-lg',
                  state === 'done'
                    ? 'bg-gradient-to-br from-emerald-400 to-teal-500'
                    : state === 'unlocked'
                      ? `bg-gradient-to-br ${track.color}`
                      : 'bg-white/10',
                ].join(' ')}
              >
                {state === 'done' ? '✅' : state === 'locked' ? '🔒' : step.emoji}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-white">
                  Étape {index + 1} · {step.title}
                </p>
                <p className="text-xs text-white/40">+{step.xp} XP</p>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
