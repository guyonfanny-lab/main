import { LESSONS, MODULES, lessonsForModule } from '../data/curriculum'
import type { Progress } from '../types'

interface PathScreenProps {
  progress: Progress
  onSelectLesson: (lessonId: string) => void
}

type LessonState = 'locked' | 'unlocked' | 'done'

function stateFor(progress: Progress, index: number, lessonId: string): LessonState {
  if (progress.completedLessons[lessonId]) return 'done'
  if (index === 0) return 'unlocked'
  const previous = LESSONS[index - 1]
  return progress.completedLessons[previous.id] ? 'unlocked' : 'locked'
}

const ZIGZAG = [0, 44, 64, 44, 0, -44, -64, -44]

export default function PathScreen({ progress, onSelectLesson }: PathScreenProps) {
  const completedCount = Object.keys(progress.completedLessons).length

  return (
    <div className="mx-auto max-w-md px-4 pb-10 pt-5">
      <div className="mb-6">
        <h1 className="text-xl font-extrabold text-white">PyQuest 🐍✨</h1>
        <p className="mt-0.5 text-sm text-white/50">
          {completedCount} / {LESSONS.length} leçons terminées
        </p>
      </div>

      {MODULES.map((mod) => {
        const modLessons = lessonsForModule(mod.id)
        return (
          <section key={mod.id} className="mb-10">
            <div
              className={`mb-6 flex items-center gap-3 rounded-2xl bg-gradient-to-r ${mod.color} px-4 py-3 shadow-lg`}
            >
              <span className="text-2xl">{mod.emoji}</span>
              <div>
                <h2 className="text-base font-bold text-white">{mod.title}</h2>
                <p className="text-xs text-white/80">{mod.description}</p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-5">
              {modLessons.map((lesson) => {
                const idx = LESSONS.indexOf(lesson)
                const state = stateFor(progress, idx, lesson.id)
                const offset = ZIGZAG[idx % ZIGZAG.length]
                return (
                  <button
                    key={lesson.id}
                    type="button"
                    disabled={state === 'locked'}
                    onClick={() => onSelectLesson(lesson.id)}
                    style={{ transform: `translateX(${offset}px)` }}
                    className="group flex flex-col items-center gap-1.5 disabled:cursor-not-allowed"
                  >
                    <div
                      className={[
                        'flex h-16 w-16 items-center justify-center rounded-full text-2xl shadow-lg transition-transform active:scale-95',
                        state === 'done'
                          ? 'bg-gradient-to-br from-emerald-400 to-teal-500 shadow-emerald-500/30'
                          : state === 'unlocked'
                            ? `bg-gradient-to-br ${mod.color} shadow-black/30 group-hover:scale-105`
                            : 'bg-white/10 shadow-none',
                      ].join(' ')}
                    >
                      {state === 'done' ? '✅' : state === 'locked' ? '🔒' : lesson.emoji}
                    </div>
                    <span
                      className={`max-w-[110px] text-center text-[11px] font-medium leading-tight ${
                        state === 'locked' ? 'text-white/30' : 'text-white/80'
                      }`}
                    >
                      {lesson.title}
                    </span>
                  </button>
                )
              })}
            </div>
          </section>
        )
      })}
    </div>
  )
}
