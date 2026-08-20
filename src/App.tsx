import { useState } from 'react'
import Header from './components/Header'
import BottomNav, { type Tab } from './components/BottomNav'
import PathScreen from './components/PathScreen'
import LessonScreen from './components/LessonScreen'
import ProfileScreen from './components/ProfileScreen'
import { LESSONS } from './data/curriculum'
import { completeLesson, loadProgress, resetProgress, toggleSound } from './lib/storage'
import type { Lesson } from './types'

function App() {
  const [progress, setProgress] = useState(loadProgress)
  const [tab, setTab] = useState<Tab>('path')
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null)

  const activeLesson: Lesson | null = activeLessonId
    ? (LESSONS.find((l) => l.id === activeLessonId) ?? null)
    : null

  function handleComplete(lesson: Lesson) {
    const result = completeLesson(progress, lesson.id, lesson.xp)
    setProgress(result.progress)
    return result
  }

  function handleReset() {
    if (window.confirm('Réinitialiser toute ta progression ? Cette action est irréversible.')) {
      setProgress(resetProgress())
      setActiveLessonId(null)
      setTab('path')
    }
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col bg-[#0b0b14]">
      {!activeLesson && <Header xp={progress.xp} streak={progress.streak} />}

      <main className="flex-1">
        {activeLesson ? (
          <LessonScreen
            key={activeLesson.id}
            lesson={activeLesson}
            soundOn={progress.soundOn}
            onBack={() => setActiveLessonId(null)}
            onComplete={handleComplete}
            onNextLesson={(id) => setActiveLessonId(id)}
          />
        ) : tab === 'path' ? (
          <PathScreen progress={progress} onSelectLesson={setActiveLessonId} />
        ) : (
          <ProfileScreen
            progress={progress}
            onToggleSound={() => setProgress(toggleSound(progress))}
            onReset={handleReset}
          />
        )}
      </main>

      {!activeLesson && <BottomNav active={tab} onChange={setTab} />}
    </div>
  )
}

export default App
