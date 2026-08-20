import { useState } from 'react'
import Header from './components/Header'
import BottomNav, { type Tab } from './components/BottomNav'
import PathScreen from './components/PathScreen'
import LessonScreen from './components/LessonScreen'
import ProfileScreen from './components/ProfileScreen'
import ProjectsScreen from './components/ProjectsScreen'
import ProjectStepsScreen from './components/ProjectStepsScreen'
import { LESSONS } from './data/curriculum'
import { PROJECTS } from './data/projects'
import { completeLesson, loadProgress, resetProgress, toggleSound } from './lib/storage'
import type { Exercise } from './types'

function App() {
  const [progress, setProgress] = useState(loadProgress)
  const [tab, setTab] = useState<Tab>('path')
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null)
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null)
  const [activeStepId, setActiveStepId] = useState<string | null>(null)

  const activeLesson: Exercise | null = activeLessonId
    ? (LESSONS.find((l) => l.id === activeLessonId) ?? null)
    : null

  const activeProject = activeProjectId ? (PROJECTS.find((p) => p.id === activeProjectId) ?? null) : null
  const activeStep: Exercise | null =
    activeProject && activeStepId ? (activeProject.steps.find((s) => s.id === activeStepId) ?? null) : null

  const inLesson = !!activeLesson || !!activeStep

  function handleComplete(lesson: Exercise) {
    const result = completeLesson(progress, lesson.id, lesson.xp)
    setProgress(result.progress)
    return result
  }

  function handleReset() {
    if (window.confirm('Réinitialiser toute ta progression ? Cette action est irréversible.')) {
      setProgress(resetProgress())
      setActiveLessonId(null)
      setActiveProjectId(null)
      setActiveStepId(null)
      setTab('path')
    }
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col bg-[#0b0b14]">
      {!inLesson && <Header xp={progress.xp} streak={progress.streak} />}

      <main className="flex-1">
        {activeLesson ? (
          <LessonScreen
            key={activeLesson.id}
            lesson={activeLesson}
            siblings={LESSONS}
            backLabel="Retour au parcours"
            finaleHeading="PyQuest terminée !"
            soundOn={progress.soundOn}
            onBack={() => setActiveLessonId(null)}
            onComplete={handleComplete}
            onNextLesson={(id) => setActiveLessonId(id)}
          />
        ) : activeStep && activeProject ? (
          <LessonScreen
            key={activeStep.id}
            lesson={activeStep}
            siblings={activeProject.steps}
            backLabel="Retour au projet"
            finaleHeading="Projet terminé !"
            soundOn={progress.soundOn}
            onBack={() => setActiveStepId(null)}
            onComplete={handleComplete}
            onNextLesson={(id) => setActiveStepId(id)}
          />
        ) : tab === 'path' ? (
          <PathScreen progress={progress} onSelectLesson={setActiveLessonId} />
        ) : tab === 'projects' ? (
          activeProject ? (
            <ProjectStepsScreen
              project={activeProject}
              progress={progress}
              onSelectStep={setActiveStepId}
              onBack={() => setActiveProjectId(null)}
            />
          ) : (
            <ProjectsScreen progress={progress} onSelectProject={setActiveProjectId} />
          )
        ) : (
          <ProfileScreen
            progress={progress}
            onToggleSound={() => setProgress(toggleSound(progress))}
            onReset={handleReset}
          />
        )}
      </main>

      {!inLesson && <BottomNav active={tab} onChange={setTab} />}
    </div>
  )
}

export default App
