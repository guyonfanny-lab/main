import { useCallback, useState } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import confetti from 'canvas-confetti'
import type { Exercise } from '../types'
import { playError, playSuccess, playTap } from '../lib/sound'
import type { CompleteLessonResult } from '../lib/storage'
import { loadSavedCode, saveCode } from '../lib/codeStorage'
import GameCanvas, { type ConsoleLine } from './GameCanvas'
import SuccessModal from './SuccessModal'

interface GameLessonScreenProps {
  lesson: Exercise
  siblings: Exercise[]
  backLabel: string
  finaleHeading: string
  soundOn: boolean
  onBack: () => void
  onComplete: (lesson: Exercise) => CompleteLessonResult
  onNextLesson: (lessonId: string) => void
}

function fireConfetti() {
  confetti({
    particleCount: 90,
    spread: 75,
    origin: { y: 0.35 },
    colors: ['#38bdf8', '#34d399', '#fbbf24', '#f472b6'],
  })
}

const MAX_CONSOLE_LINES = 60

export default function GameLessonScreen({
  lesson,
  siblings,
  backLabel,
  finaleHeading,
  soundOn,
  onBack,
  onComplete,
  onNextLesson,
}: GameLessonScreenProps) {
  const [code, setCode] = useState(() => loadSavedCode(lesson.id) ?? lesson.starterCode)
  const [testedCode, setTestedCode] = useState<string | null>(null)
  const [runId, setRunId] = useState(0)
  const [consoleLines, setConsoleLines] = useState<ConsoleLine[]>([])
  const [feedback, setFeedback] = useState<{ ok: boolean; message: string } | null>(null)
  const [hintsShown, setHintsShown] = useState(0)
  const [successData, setSuccessData] = useState<CompleteLessonResult | null>(null)

  function handleCodeChange(value: string) {
    setCode(value)
    saveCode(lesson.id, value)
  }

  const handleConsoleLine = useCallback((line: ConsoleLine) => {
    setConsoleLines((prev) => [...prev.slice(-(MAX_CONSOLE_LINES - 1)), line])
  }, [])

  function handleRun() {
    playTap(soundOn)
    setConsoleLines([])
    setFeedback(null)
    setTestedCode(code)
    setRunId((n) => n + 1)

    const check = lesson.check('', () => undefined, [], [], [], code)
    setFeedback(check)

    if (check.ok) {
      playSuccess(soundOn)
      fireConfetti()
      const completion = onComplete(lesson)
      window.setTimeout(() => setSuccessData(completion), 900)
    } else {
      playError(soundOn)
    }
  }

  const currentIndex = siblings.findIndex((l) => l.id === lesson.id)
  const nextLesson = siblings[currentIndex + 1]
  const isLastLesson = !nextLesson

  return (
    <div
      className="mx-auto flex max-w-md flex-col px-4"
      style={{
        paddingTop: 'calc(var(--safe-top) + 16px)',
        paddingBottom: 'calc(var(--safe-bottom) + 32px)',
      }}
    >
      <button
        type="button"
        onClick={onBack}
        className="mb-3 flex w-fit items-center gap-1 text-sm font-medium text-white/50 active:text-white/80"
      >
        ← {backLabel}
      </button>

      <div className="mb-4 flex items-center gap-3">
        <span className="text-3xl">{lesson.emoji}</span>
        <div>
          <h1 className="text-lg font-extrabold text-white">{lesson.title}</h1>
          <p className="text-xs font-semibold text-amber-300/80">+{lesson.xp} XP</p>
        </div>
      </div>

      <p className="mb-3 rounded-xl bg-white/5 p-3 text-sm leading-relaxed text-white/70">{lesson.intro}</p>
      <p className="mb-4 rounded-xl border border-sky-400/20 bg-sky-400/10 p-3 text-sm leading-relaxed text-sky-100">
        <span className="font-bold">🎯 Ta mission : </span>
        {lesson.task}
      </p>

      <div className="mb-3 overflow-hidden rounded-xl border border-white/10">
        <CodeMirror
          value={code}
          height="220px"
          theme="dark"
          extensions={[javascript()]}
          onChange={handleCodeChange}
          basicSetup={{ autocompletion: false, closeBrackets: false }}
        />
      </div>

      <button
        type="button"
        onClick={handleRun}
        className="mb-3 w-full rounded-2xl bg-gradient-to-r from-sky-400 to-cyan-500 py-3.5 text-center text-sm font-bold text-white shadow-lg shadow-sky-500/20 active:scale-[0.98]"
      >
        ▶ Tester mon jeu
      </button>

      {testedCode !== null && (
        <GameCanvas code={testedCode} runId={runId} onConsoleLine={handleConsoleLine} />
      )}

      {consoleLines.length > 0 && (
        <div className="mb-3 max-h-32 overflow-y-auto rounded-xl bg-black/40 p-3 font-mono text-xs">
          <p className="mb-1 font-sans text-[10px] font-bold uppercase tracking-wide text-white/30">Console</p>
          {consoleLines.map((line, i) => (
            <p key={i} className={line.type === 'error' ? 'text-rose-400' : 'text-white/80'}>
              {line.text}
            </p>
          ))}
        </div>
      )}

      {feedback && (
        <div
          className={`mb-3 rounded-xl p-3 text-sm font-medium ${
            feedback.ok ? 'bg-emerald-500/15 text-emerald-300' : 'bg-rose-500/15 text-rose-300'
          }`}
        >
          {feedback.ok ? '✅ ' : '❌ '}
          {feedback.message}
        </div>
      )}

      <div className="mt-1">
        {hintsShown < lesson.hints.length && (
          <button
            type="button"
            onClick={() => setHintsShown((n) => n + 1)}
            className="text-xs font-semibold text-white/40 underline decoration-dotted underline-offset-4 active:text-white/70"
          >
            💡 Besoin d'un indice ? ({hintsShown}/{lesson.hints.length})
          </button>
        )}
        {lesson.hints.slice(0, hintsShown).map((hint, i) => (
          <p
            key={i}
            className="mt-2 rounded-lg border border-amber-300/20 bg-amber-300/10 p-2.5 font-mono text-xs text-amber-200"
          >
            {hint}
          </p>
        ))}
      </div>

      {successData && (
        <SuccessModal
          message={feedback?.message ?? ''}
          xpGained={successData.xpGained}
          newBadgeIds={successData.newlyEarnedBadges}
          isLastLesson={isLastLesson}
          finaleHeading={finaleHeading}
          onContinue={() => {
            if (nextLesson) {
              onNextLesson(nextLesson.id)
            } else {
              onBack()
            }
          }}
        />
      )}
    </div>
  )
}
