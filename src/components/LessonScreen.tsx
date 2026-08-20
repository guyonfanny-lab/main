import { useEffect, useState } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { python } from '@codemirror/lang-python'
import confetti from 'canvas-confetti'
import type { Lesson } from '../types'
import { getPyodide, runPython } from '../lib/pyodide'
import { playError, playSuccess, playTap } from '../lib/sound'
import type { CompleteLessonResult } from '../lib/storage'
import { LESSONS } from '../data/curriculum'
import SuccessModal from './SuccessModal'

interface LessonScreenProps {
  lesson: Lesson
  soundOn: boolean
  onBack: () => void
  onComplete: (lesson: Lesson) => CompleteLessonResult
  onNextLesson: (lessonId: string) => void
}

function fireConfetti() {
  confetti({
    particleCount: 90,
    spread: 75,
    origin: { y: 0.35 },
    colors: ['#c084fc', '#f472b6', '#fbbf24', '#34d399'],
  })
}

export default function LessonScreen({
  lesson,
  soundOn,
  onBack,
  onComplete,
  onNextLesson,
}: LessonScreenProps) {
  const [code, setCode] = useState(lesson.starterCode)
  const [running, setRunning] = useState(false)
  const [pyodideReady, setPyodideReady] = useState(false)
  const [output, setOutput] = useState<{ stdout: string; error: string | null } | null>(null)
  const [feedback, setFeedback] = useState<{ ok: boolean; message: string } | null>(null)
  const [hintsShown, setHintsShown] = useState(0)
  const [successData, setSuccessData] = useState<CompleteLessonResult | null>(null)

  // Parent remounts this component (via a `key={lesson.id}` prop) whenever
  // the lesson changes, so state above is naturally fresh — no reset effect needed.

  useEffect(() => {
    window.scrollTo({ top: 0 })
    getPyodide()
      .then(() => setPyodideReady(true))
      .catch(() => setPyodideReady(false))
  }, [])

  async function handleRun() {
    setRunning(true)
    setFeedback(null)
    playTap(soundOn)
    try {
      const result = await runPython(code)
      setOutput({ stdout: result.stdout, error: result.error })
      setPyodideReady(true)

      if (result.error) {
        setFeedback({ ok: false, message: `Erreur Python : ${result.error}` })
        playError(soundOn)
        return
      }

      const check = lesson.check(result.stdout, result.get)
      setFeedback(check)

      if (check.ok) {
        playSuccess(soundOn)
        fireConfetti()
        const completion = onComplete(lesson)
        setSuccessData(completion)
      } else {
        playError(soundOn)
      }
    } catch {
      setOutput({ stdout: '', error: "Le moteur Python n'a pas pu démarrer. Vérifie ta connexion." })
    } finally {
      setRunning(false)
    }
  }

  const currentIndex = LESSONS.findIndex((l) => l.id === lesson.id)
  const nextLesson = LESSONS[currentIndex + 1]
  const isLastLesson = !nextLesson

  return (
    <div className="mx-auto flex max-w-md flex-col px-4 pb-8 pt-4">
      <button
        type="button"
        onClick={onBack}
        className="mb-3 flex w-fit items-center gap-1 text-sm font-medium text-white/50 active:text-white/80"
      >
        ← Retour au parcours
      </button>

      <div className="mb-4 flex items-center gap-3">
        <span className="text-3xl">{lesson.emoji}</span>
        <div>
          <h1 className="text-lg font-extrabold text-white">{lesson.title}</h1>
          <p className="text-xs font-semibold text-amber-300/80">+{lesson.xp} XP</p>
        </div>
      </div>

      <p className="mb-3 rounded-xl bg-white/5 p-3 text-sm leading-relaxed text-white/70">
        {lesson.intro}
      </p>
      <p className="mb-4 rounded-xl border border-violet-400/20 bg-violet-400/10 p-3 text-sm leading-relaxed text-violet-100">
        <span className="font-bold">🎯 Ta mission : </span>
        {lesson.task}
      </p>

      <div className="mb-3 overflow-hidden rounded-xl border border-white/10">
        <CodeMirror
          value={code}
          height="200px"
          theme="dark"
          extensions={[python()]}
          onChange={(value) => setCode(value)}
          basicSetup={{ autocompletion: false }}
        />
      </div>

      <button
        type="button"
        onClick={handleRun}
        disabled={running}
        className="mb-3 w-full rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-500 py-3.5 text-center text-sm font-bold text-white shadow-lg shadow-emerald-500/20 active:scale-[0.98] disabled:opacity-60"
      >
        {running ? (pyodideReady ? 'Ça tourne...' : '🐍 Préparation de Python...') : '▶ Lancer le code'}
      </button>

      {output && (
        <div className="mb-3 rounded-xl bg-black/40 p-3 font-mono text-xs text-white/80">
          <p className="mb-1 font-sans text-[10px] font-bold uppercase tracking-wide text-white/30">
            Console
          </p>
          <pre className="whitespace-pre-wrap break-words">
            {output.stdout || (output.error ? '' : '(pas de texte affiché)')}
          </pre>
          {output.error && <pre className="whitespace-pre-wrap break-words text-rose-400">{output.error}</pre>}
        </div>
      )}

      {feedback && (
        <div
          className={`mb-3 rounded-xl p-3 text-sm font-medium ${
            feedback.ok
              ? 'bg-emerald-500/15 text-emerald-300'
              : 'bg-rose-500/15 text-rose-300'
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
